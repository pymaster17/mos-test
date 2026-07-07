"""Generate BeaqleJS configs for the VocalRender subjective experiments.

Scans a ``cloudtest`` directory laid out as::

    cloudtest/
        GT/<song>/<seg>_generated.flac          # reference (PS-CMOS)
        VocalRender/<song>/<seg>_generated.flac  # and the other 5 models
        ...
        score/<song>/<seg>_score.png             # music score (MS-MOS)

and writes three configs into ``experiments/vocalrender/``:

    n_cmos.js   Naturalness   (CmosTest, no reference)   VocalRender vs each competitor
    ps_cmos.js  Prosody sim.  (CmosTest, GT reference)   VocalRender vs each competitor
    ms_mos.js   Music-score   (MsMosTest, score image)   all 6 models, absolute 1-4

Every path stored in a config is percent-encoded per segment because BeaqleJS
concatenates ``AudioRoot + path`` verbatim (no encoding) and the song folders
contain non-ASCII / space / full-width characters. R2 object keys stay UTF-8.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from urllib.parse import quote

DEFAULT_AUDIO_ROOT = "https://pub-a4d493f7583e47ada8a9ff6b681a01fd.r2.dev/"
DEFAULT_SUBMISSION_URL = "https://mos-results-api.pymaster17.workers.dev/api/submissions"
DEFAULT_SUPERVISOR = "365270117@qq.com"

REFERENCE_DIR = "GT"
SCORE_DIR = "score"
AUDIO_EXT = ".flac"
SCORE_EXT = ".png"


def enc_path(*parts: str) -> str:
    """Percent-encode each path segment and join with '/'."""
    return "/".join(quote(part, safe="") for part in parts)


def discover_models(cloudtest_root: Path) -> list[str]:
    """Top-level model directories (everything except GT and score)."""
    models = []
    for child in sorted(cloudtest_root.iterdir()):
        if not child.is_dir():
            continue
        if child.name in (REFERENCE_DIR, SCORE_DIR):
            continue
        models.append(child.name)
    return models


def scan_audio(model_dir: Path, seg_suffix: str) -> dict[tuple[str, str], None]:
    """Return the set of (song, seg) samples available under a model dir."""
    samples: dict[tuple[str, str], None] = {}
    tail = seg_suffix + AUDIO_EXT
    for song_dir in model_dir.iterdir():
        if not song_dir.is_dir():
            continue
        for f in song_dir.iterdir():
            if not f.is_file() or not f.name.endswith(tail):
                continue
            seg = f.name[: -len(tail)]
            samples[(song_dir.name, seg)] = None
    return samples


def scan_scores(score_dir: Path) -> dict[tuple[str, str], None]:
    samples: dict[tuple[str, str], None] = {}
    tail = "_score" + SCORE_EXT
    if not score_dir.is_dir():
        return samples
    for song_dir in score_dir.iterdir():
        if not song_dir.is_dir():
            continue
        for f in song_dir.iterdir():
            if not f.is_file() or not f.name.endswith(tail):
                continue
            seg = f.name[: -len(tail)]
            samples[(song_dir.name, seg)] = None
    return samples


def audio_key(r2_prefix: str, model: str, song: str, seg: str, seg_suffix: str) -> str:
    return enc_path(r2_prefix, model, song, f"{seg}{seg_suffix}{AUDIO_EXT}")


def score_key(r2_prefix: str, song: str, seg: str) -> str:
    return enc_path(r2_prefix, SCORE_DIR, song, f"{seg}_score{SCORE_EXT}")


def base_config(
    test_name: str,
    display_name: str,
    audio_root: str,
    submission_url: str,
    max_tests_per_run: int,
    known_models: list[str],
    rate_min: int,
    rate_max: int,
) -> dict:
    return {
        "TestName": test_name,
        "DisplayTestName": display_name,
        "RateScalePng": "img/scale_abs.png",
        "RateScaleBgPng": "img/scale_abs_background.png",
        "RateMinValue": rate_min,
        "RateMaxValue": rate_max,
        "RateDefaultValue": rate_min,
        "ShowFileIDs": False,
        "ShowResults": True,
        "LoopByDefault": False,
        "EnableABLoop": True,
        "EnableOnlineSubmission": True,
        "BeaqleServiceURL": submission_url,
        "SupervisorContact": DEFAULT_SUPERVISOR,
        "RandomizeTestOrder": True,
        "MaxTestsPerRun": max_tests_per_run,
        "RequireMaxRating": False,
        "AudioRoot": audio_root,
        "KnownModels": known_models,
    }


def build_cmos_config(
    *,
    test_name: str,
    display_name: str,
    baseline: str,
    competitors: list[str],
    model_samples: dict[str, dict],
    reference_samples: dict | None,
    r2_prefix: str,
    seg_suffix: str,
    audio_root: str,
    submission_url: str,
    max_tests_per_run: int,
    known_models: list[str],
) -> dict:
    cfg = base_config(
        test_name, display_name, audio_root, submission_url,
        max_tests_per_run, known_models, rate_min=0, rate_max=5,
    )
    cfg["BaselineModel"] = baseline
    cfg["RandomizeFileOrder"] = True

    testsets = []
    n = 0
    baseline_set = model_samples[baseline]
    for competitor in competitors:
        comp_set = model_samples[competitor]
        for song, seg in sorted(baseline_set.keys() & comp_set.keys()):
            if reference_samples is not None and (song, seg) not in reference_samples:
                continue
            n += 1
            files = {
                "A": audio_key(r2_prefix, baseline, song, seg, seg_suffix),
                "B": audio_key(r2_prefix, competitor, song, seg, seg_suffix),
            }
            if reference_samples is not None:
                files["Reference"] = audio_key(r2_prefix, REFERENCE_DIR, song, seg, seg_suffix)
            testsets.append({
                "Name": f"{song}/{seg}",
                "TestID": f"id{n}",
                "Files": files,
                "transcribe": "",
            })
    cfg["Testsets"] = testsets
    return cfg


def build_msmos_config(
    *,
    test_name: str,
    display_name: str,
    models: list[str],
    model_samples: dict[str, dict],
    score_samples: dict,
    r2_prefix: str,
    seg_suffix: str,
    audio_root: str,
    submission_url: str,
    max_tests_per_run: int,
    known_models: list[str],
) -> dict:
    cfg = base_config(
        test_name, display_name, audio_root, submission_url,
        max_tests_per_run, known_models, rate_min=1, rate_max=4,
    )
    testsets = []
    n = 0
    for model in models:
        for song, seg in sorted(model_samples[model].keys() & score_samples.keys()):
            n += 1
            testsets.append({
                "Name": f"{song}/{seg}",
                "TestID": f"id{n}",
                "Files": {"1": audio_key(r2_prefix, model, song, seg, seg_suffix)},
                "Image": score_key(r2_prefix, song, seg),
                "transcribe": "",
            })
    cfg["Testsets"] = testsets
    return cfg


def write_config(output_file: Path, config: dict) -> None:
    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(
        "// configure the test here\n"
        + f"var TestConfig = {json.dumps(config, indent=2, ensure_ascii=False)}",
        encoding="utf-8",
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--cloudtest-root", required=True, help="Path to the cloudtest directory.")
    parser.add_argument("--output-dir", default="experiments/vocalrender", help="Where to write the .js configs.")
    parser.add_argument("--audio-root", default=DEFAULT_AUDIO_ROOT, help="R2 public base URL (AudioRoot).")
    parser.add_argument("--submission-url", default=DEFAULT_SUBMISSION_URL, help="BeaqleServiceURL endpoint.")
    parser.add_argument("--r2-prefix", default="cloudtest", help="Key prefix under AudioRoot for the uploaded tree.")
    parser.add_argument("--baseline", default="VocalRender", help="CMOS baseline model directory name.")
    parser.add_argument("--seg-suffix", default="_generated", help="Segment filename suffix before the extension.")
    parser.add_argument("--max-tests-per-run", type=int, default=20, help="MaxTestsPerRun sampling per session.")
    parser.add_argument(
        "--tests",
        default="ncmos,pscmos,msmos",
        help="Comma-separated subset of {ncmos,pscmos,msmos} to generate.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    root = Path(args.cloudtest_root)
    if not root.is_dir():
        raise SystemExit(f"cloudtest root not found: {root}")

    models = discover_models(root)
    if args.baseline not in models:
        raise SystemExit(f"baseline {args.baseline!r} not among discovered models {models}")
    competitors = [m for m in models if m != args.baseline]

    model_samples = {m: scan_audio(root / m, args.seg_suffix) for m in models}
    reference_samples = scan_audio(root / REFERENCE_DIR, args.seg_suffix)
    score_samples = scan_scores(root / SCORE_DIR)

    print("Discovered models:", ", ".join(models))
    print("Baseline:", args.baseline, "| Competitors:", ", ".join(competitors))
    for m in models:
        print(f"  {m}: {len(model_samples[m])} segments")
    print(f"  {REFERENCE_DIR} (reference): {len(reference_samples)} segments")
    print(f"  {SCORE_DIR} (scores): {len(score_samples)} segments")

    requested = {t.strip().lower() for t in args.tests.split(",") if t.strip()}
    out_dir = Path(args.output_dir)
    common = dict(
        r2_prefix=args.r2_prefix,
        seg_suffix=args.seg_suffix,
        audio_root=args.audio_root,
        submission_url=args.submission_url,
        max_tests_per_run=args.max_tests_per_run,
        known_models=models,
    )

    if "ncmos" in requested:
        cfg = build_cmos_config(
            test_name="N-CMOS Naturalness (VocalRender vs others)",
            display_name="Naturalness Test",
            baseline=args.baseline,
            competitors=competitors,
            model_samples=model_samples,
            reference_samples=None,
            **common,
        )
        write_config(out_dir / "n_cmos.js", cfg)
        print(f"n_cmos.js: {len(cfg['Testsets'])} testsets")

    if "pscmos" in requested:
        cfg = build_cmos_config(
            test_name="PS-CMOS Prosody Similarity (VocalRender vs others)",
            display_name="Prosody Similarity Test",
            baseline=args.baseline,
            competitors=competitors,
            model_samples=model_samples,
            reference_samples=reference_samples,
            **common,
        )
        write_config(out_dir / "ps_cmos.js", cfg)
        print(f"ps_cmos.js: {len(cfg['Testsets'])} testsets")

    if "msmos" in requested:
        cfg = build_msmos_config(
            test_name="MS-MOS Music-score Consistency (all models)",
            display_name="Music-score Consistency Test",
            models=models,
            model_samples=model_samples,
            score_samples=score_samples,
            **common,
        )
        write_config(out_dir / "ms_mos.js", cfg)
        print(f"ms_mos.js: {len(cfg['Testsets'])} testsets")


if __name__ == "__main__":
    main()
