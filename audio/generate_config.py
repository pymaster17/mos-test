from __future__ import annotations

import argparse
import json
from pathlib import Path


DEFAULT_SUBMISSION_URL = "/web_service/beaqleJS_Service.php"


def load_manifest(manifest_path: Path) -> dict:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    if manifest.get("schemaVersion") != 1:
        raise ValueError("Unsupported manifest schemaVersion.")
    return manifest


def get_reference_model(manifest: dict, reference_model: str | None) -> str:
    if reference_model:
        return reference_model
    return manifest.get("referenceModel", "gt")


def get_candidate_models(manifest: dict, reference_model: str, requested_models: list[str] | None) -> list[str]:
    if requested_models:
        return requested_models

    return [
        model_name
        for model_name, model_info in manifest["models"].items()
        if model_name != reference_model and model_info.get("role") != "reference"
    ]


def path_for_sample(manifest: dict, model_name: str, sample_id: str) -> str:
    extension = manifest["models"][model_name].get("extension", ".wav")
    audio_base_path = manifest.get("audioBasePath", "audio").rstrip("/")
    return f"{audio_base_path}/{model_name}/{sample_id}{extension}"


def build_ab_testsets(manifest: dict, model_a: str, model_b: str) -> list[dict]:
    testsets = []
    for index, sample in enumerate(manifest["samples"], start=1):
        available = set(sample["availableModels"])
        if model_a not in available or model_b not in available:
            continue

        sample_id = sample["id"]
        testsets.append(
            {
                "Name": f"ID-{index}:{sample_id}",
                "TestID": f"id{index}",
                "Files": {
                    "A": path_for_sample(manifest, model_a, sample_id),
                    "B": path_for_sample(manifest, model_b, sample_id),
                },
                "transcribe": sample.get("transcribe", ""),
            }
        )
    return testsets


def build_mos_like_testsets(
    manifest: dict,
    candidate_models: list[str],
    reference_model: str,
    test_type: str,
    include_reference_in_mos: bool,
) -> list[dict]:
    testsets = []

    for index, sample in enumerate(manifest["samples"], start=1):
        available = set(sample["availableModels"])
        if any(model_name not in available for model_name in candidate_models):
            continue

        sample_id = sample["id"]
        files = {}

        if test_type == "SMOS":
            if reference_model not in available:
                continue
            files["Reference"] = path_for_sample(manifest, reference_model, sample_id)

        slot = 1
        for model_name in candidate_models:
            files[str(slot)] = path_for_sample(manifest, model_name, sample_id)
            slot += 1

        if test_type == "MOS" and include_reference_in_mos and reference_model in available:
            files[str(slot)] = path_for_sample(manifest, reference_model, sample_id)

        testsets.append(
            {
                "Name": f"ID-{index}:{sample_id}",
                "TestID": f"id{index}",
                "Files": files,
                "transcribe": sample.get("transcribe", ""),
            }
        )

    return testsets


def build_config(
    manifest: dict,
    test_type: str,
    audio_root: str,
    submission_url: str,
    candidate_models: list[str],
    reference_model: str,
    model_a_name: str | None,
    model_b_name: str | None,
    include_reference_in_mos: bool,
) -> dict:
    test_type = test_type.upper()

    if test_type == "AB":
        if not model_a_name or not model_b_name:
            raise ValueError("AB test generation requires model_a_name and model_b_name.")
        testsets = build_ab_testsets(manifest, model_a_name, model_b_name)
        test_name = f"AB Preference Test ({model_a_name} vs {model_b_name})"
    elif test_type == "SMOS":
        testsets = build_mos_like_testsets(
            manifest=manifest,
            candidate_models=candidate_models,
            reference_model=reference_model,
            test_type=test_type,
            include_reference_in_mos=include_reference_in_mos,
        )
        test_name = f"SMOS Test ({', '.join(candidate_models)} vs {reference_model})"
    elif test_type == "MOS":
        testsets = build_mos_like_testsets(
            manifest=manifest,
            candidate_models=candidate_models,
            reference_model=reference_model,
            test_type=test_type,
            include_reference_in_mos=include_reference_in_mos,
        )
        test_name = f"MOS Test ({', '.join(candidate_models)})"
    else:
        raise ValueError(f"Unsupported test type: {test_type}")

    config = {
        "TestName": test_name,
        "RateScalePng": "img/scale_abs.png",
        "RateScaleBgPng": "img/scale_abs_background.png",
        "RateMinValue": 0,
        "RateMaxValue": 5,
        "RateDefaultValue": 0,
        "ShowFileIDs": False,
        "ShowResults": True,
        "LoopByDefault": False,
        "EnableABLoop": True,
        "EnableOnlineSubmission": True,
        "BeaqleServiceURL": submission_url,
        "SupervisorContact": "365270117@qq.com",
        "RandomizeTestOrder": True,
        "MaxTestsPerRun": 20,
        "RequireMaxRating": False,
        "AudioRoot": audio_root,
        "Testsets": testsets,
    }

    if test_type == "AB":
        config["RandomizeFileOrder"] = True

    return config


def write_config(output_file: Path, config: dict) -> None:
    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(
        "// configure the test here\n" + f"var TestConfig = {json.dumps(config, indent=2, ensure_ascii=False)}",
        encoding="utf-8",
    )


def generate_config_from_manifest(
    manifest_file: str,
    output_file: str,
    test_type: str,
    audio_root: str = "",
    submission_url: str = DEFAULT_SUBMISSION_URL,
    candidate_models: list[str] | None = None,
    reference_model: str | None = None,
    model_a_name: str | None = None,
    model_b_name: str | None = None,
    include_reference_in_mos: bool = False,
) -> dict:
    manifest = load_manifest(Path(manifest_file))
    resolved_reference_model = get_reference_model(manifest, reference_model)

    if test_type.upper() == "AB":
        candidate_models = [model_a_name, model_b_name]
    else:
        candidate_models = get_candidate_models(manifest, resolved_reference_model, candidate_models)

    config = build_config(
        manifest=manifest,
        test_type=test_type,
        audio_root=audio_root,
        submission_url=submission_url,
        candidate_models=[model for model in candidate_models if model],
        reference_model=resolved_reference_model,
        model_a_name=model_a_name,
        model_b_name=model_b_name,
        include_reference_in_mos=include_reference_in_mos,
    )
    write_config(Path(output_file), config)
    return config


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate BeaqleJS config from a unified audio manifest."
    )
    parser.add_argument(
        "--manifest",
        default="config/audio_manifest.json",
        help="Path to the manifest generated from audio/<model>/<sample_id>.wav layout.",
    )
    parser.add_argument("--output-file", help="Output config path, such as config/ABTest.js.")
    parser.add_argument("--test-type", choices=["MOS", "SMOS", "AB"], help="Test type.")
    parser.add_argument(
        "--models",
        help="Comma-separated candidate model names for MOS/SMOS. Defaults to all non-reference models.",
    )
    parser.add_argument("--reference-model", help="Reference model name. Defaults to manifest.referenceModel.")
    parser.add_argument("--model-a", help="Model A for AB tests.")
    parser.add_argument("--model-b", help="Model B for AB tests.")
    parser.add_argument("--audio-root", default="", help="AudioRoot URL prefix.")
    parser.add_argument(
        "--submission-url",
        default=DEFAULT_SUBMISSION_URL,
        help="BeaqleServiceURL submission endpoint.",
    )
    parser.add_argument(
        "--include-reference-in-mos",
        action="store_true",
        help="Include the reference model as an additional MOS item.",
    )
    return parser.parse_args()


def prompt_if_missing(value: str | None, prompt: str, default: str = "") -> str:
    if value:
        return value
    raw_value = input(prompt).strip()
    return raw_value or default


def main() -> None:
    args = parse_args()

    manifest_path = Path(prompt_if_missing(args.manifest, "请输入 manifest 路径: ", "config/audio_manifest.json"))
    manifest = load_manifest(manifest_path)
    reference_model = get_reference_model(manifest, args.reference_model)

    output_file = prompt_if_missing(args.output_file, "请输入输出配置文件路径: ")
    test_type = prompt_if_missing(args.test_type, "请输入测试类型 (MOS / SMOS / AB): ").upper()

    model_a_name = args.model_a
    model_b_name = args.model_b
    candidate_models = None

    if test_type == "AB":
        model_a_name = prompt_if_missing(model_a_name, "请输入模型A名称: ")
        model_b_name = prompt_if_missing(model_b_name, "请输入模型B名称: ")
    else:
        model_input = args.models
        if not model_input:
            default_models = ",".join(get_candidate_models(manifest, reference_model, None))
            model_input = prompt_if_missing(
                None,
                f"请输入候选模型名称（逗号分隔，默认 {default_models}）: ",
                default_models,
            )
        candidate_models = [model.strip() for model in model_input.split(",") if model.strip()]

    audio_root = prompt_if_missing(
        args.audio_root,
        "请输入音频根路径 AudioRoot（本地留空，远程输入 URL）: ",
        "",
    )
    submission_url = prompt_if_missing(
        args.submission_url,
        "请输入结果提交地址 BeaqleServiceURL（本地留空时回车）: ",
        args.submission_url,
    )

    config = generate_config_from_manifest(
        manifest_file=str(manifest_path),
        output_file=output_file,
        test_type=test_type,
        audio_root=audio_root,
        submission_url=submission_url,
        candidate_models=candidate_models,
        reference_model=reference_model,
        model_a_name=model_a_name,
        model_b_name=model_b_name,
        include_reference_in_mos=args.include_reference_in_mos,
    )

    print(f"配置文件已生成: {output_file}")
    print(f"共处理了 {len(config['Testsets'])} 个测试集")


if __name__ == "__main__":
    main()
