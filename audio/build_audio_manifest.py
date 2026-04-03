import argparse
import json
from pathlib import Path


def model_dirs_from_audio_root(audio_root: Path) -> list[Path]:
    model_dirs = []
    for path in sorted(audio_root.iterdir()):
        if not path.is_dir() or path.name.startswith("."):
            continue
        if any(path.glob("*.wav")):
            model_dirs.append(path)
    return model_dirs


def build_manifest(audio_root: Path, reference_model: str) -> dict:
    model_dirs = model_dirs_from_audio_root(audio_root)
    if not model_dirs:
        raise RuntimeError(f"No model directories with wav files found in {audio_root}")

    models = {}
    sample_models: dict[str, list[str]] = {}

    for model_dir in model_dirs:
        model_name = model_dir.name
        wav_files = sorted(model_dir.glob("*.wav"))
        if not wav_files:
            continue

        models[model_name] = {
            "role": "reference" if model_name == reference_model else "candidate",
            "extension": ".wav",
            "sampleCount": len(wav_files),
        }

        for wav_path in wav_files:
            sample_id = wav_path.stem
            sample_models.setdefault(sample_id, []).append(model_name)

    samples = []
    for sample_id in sorted(sample_models):
        samples.append(
            {
                "id": sample_id,
                "transcribe": "",
                "availableModels": sorted(sample_models[sample_id]),
            }
        )

    return {
        "schemaVersion": 1,
        "audioBasePath": "audio",
        "referenceModel": reference_model,
        "models": models,
        "samples": samples,
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Build a manifest for audio/<model>/<sample_id>.wav layout."
    )
    parser.add_argument(
        "--audio-root",
        default="audio",
        help="Audio root containing one subdirectory per model.",
    )
    parser.add_argument(
        "--output",
        default="config/audio_manifest.json",
        help="Manifest output path.",
    )
    parser.add_argument(
        "--reference-model",
        default="gt",
        help="Model directory name used as the reference model.",
    )
    args = parser.parse_args()

    audio_root = Path(args.audio_root).resolve()
    output_path = Path(args.output).resolve()

    manifest = build_manifest(audio_root=audio_root, reference_model=args.reference_model)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    print(f"Manifest written to {output_path}")
    print(f"Models: {', '.join(manifest['models'].keys())}")
    print(f"Samples: {len(manifest['samples'])}")


if __name__ == "__main__":
    main()
