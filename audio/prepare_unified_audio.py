import argparse
import os
import shutil
from pathlib import Path


AUDIO_SUFFIX_RULES = {
    "gt": "_reference",
    "VoxCPM_GM": "_generated",
    "VoxCPM_SC": "_generated",
    "VoxCPM_SC2": "_generated",
}

DEFAULT_SOURCE_MAP = {
    "gt": "reference",
    "VoxCPM_GM": "VoxCPM_GM",
    "VoxCPM_SC": "VoxCPM_SC",
    "VoxCPM_SC2": "VoxCPM_SC2",
}


def normalize_sample_id(path: Path, suffix_to_strip: str) -> str:
    stem = path.stem
    if suffix_to_strip and stem.endswith(suffix_to_strip):
        return stem[: -len(suffix_to_strip)]
    return stem


def materialize_model_dir(
    source_dir: Path,
    target_dir: Path,
    suffix_to_strip: str,
    use_hardlinks: bool,
) -> int:
    if not source_dir.is_dir():
        raise FileNotFoundError(f"Source directory not found: {source_dir}")

    if target_dir.exists():
        shutil.rmtree(target_dir)
    target_dir.mkdir(parents=True, exist_ok=True)

    seen_ids = set()
    count = 0

    for source_path in sorted(source_dir.glob("*.wav")):
        sample_id = normalize_sample_id(source_path, suffix_to_strip)
        if sample_id in seen_ids:
            raise RuntimeError(
                f"Duplicate normalized sample id '{sample_id}' in {source_dir}"
            )
        seen_ids.add(sample_id)

        target_path = target_dir / f"{sample_id}.wav"
        if use_hardlinks:
            os.link(source_path, target_path)
        else:
            shutil.copy2(source_path, target_path)
        count += 1

    return count


def parse_mapping_args(mapping_args: list[str]) -> dict[str, str]:
    if not mapping_args:
        return DEFAULT_SOURCE_MAP.copy()

    mapping = {}
    for item in mapping_args:
        if "=" not in item:
            raise ValueError(
                f"Invalid mapping '{item}'. Expected target_model=source_dir."
            )
        target, source = item.split("=", 1)
        mapping[target.strip()] = source.strip()
    return mapping


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Normalize source audio into audio/<model>/<sample_id>.wav layout."
    )
    parser.add_argument(
        "--project-root",
        default=".",
        help="Project root containing the original model directories.",
    )
    parser.add_argument(
        "--audio-root",
        default="audio",
        help="Target audio root where normalized model directories are created.",
    )
    parser.add_argument(
        "--map",
        action="append",
        default=[],
        help="Mapping in target_model=source_dir format. Can be specified multiple times.",
    )
    parser.add_argument(
        "--copy",
        action="store_true",
        help="Copy files instead of creating hard links.",
    )
    args = parser.parse_args()

    project_root = Path(args.project_root).resolve()
    audio_root = (project_root / args.audio_root).resolve()
    source_map = parse_mapping_args(args.map)

    results = []
    for target_model, source_name in source_map.items():
        suffix = AUDIO_SUFFIX_RULES.get(target_model, "")
        source_dir = project_root / source_name
        target_dir = audio_root / target_model
        count = materialize_model_dir(
            source_dir=source_dir,
            target_dir=target_dir,
            suffix_to_strip=suffix,
            use_hardlinks=not args.copy,
        )
        results.append((target_model, count))

    for target_model, count in results:
        print(f"{target_model}: {count} files")


if __name__ == "__main__":
    main()
