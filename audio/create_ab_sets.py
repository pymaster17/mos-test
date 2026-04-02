import argparse
import os
import shutil
from pathlib import Path


def collect_shared_basenames(base_dir: Path, models: list[str]) -> list[str]:
    per_model = {}
    for model in models:
        model_dir = base_dir / model
        if not model_dir.is_dir():
            raise FileNotFoundError(f"Model directory not found: {model_dir}")
        basenames = {path.stem for path in model_dir.glob("*.wav")}
        per_model[model] = basenames

    shared = set.intersection(*(per_model[model] for model in models))
    if not shared:
        raise RuntimeError("No shared wav basenames found across the selected models.")
    return sorted(shared)


def materialize_ab_sets(base_dir: Path, output_dir: Path, models: list[str], use_hardlinks: bool) -> int:
    shared_basenames = collect_shared_basenames(base_dir, models)

    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    for index, base_name in enumerate(shared_basenames, start=1):
        set_dir = output_dir / f"set{index}"
        set_dir.mkdir(parents=True, exist_ok=True)

        for model in models:
            src = base_dir / model / f"{base_name}.wav"
            dst = set_dir / f"{base_name}_{model}.wav"
            if use_hardlinks:
                os.link(src, dst)
            else:
                shutil.copy2(src, dst)

    return len(shared_basenames)


def main() -> None:
    parser = argparse.ArgumentParser(description="Create A/B test set folders from normalized model directories.")
    parser.add_argument("base_dir", help="Directory containing one subdirectory per model.")
    parser.add_argument("output_dir", help="Directory where set1/set2/... folders will be created.")
    parser.add_argument(
        "--models",
        default="VoxCPM_GM,VoxCPM_SC",
        help="Comma-separated model directory names to include in each set.",
    )
    parser.add_argument(
        "--copy",
        action="store_true",
        help="Copy files instead of creating hard links.",
    )
    args = parser.parse_args()

    models = [model.strip() for model in args.models.split(",") if model.strip()]
    if len(models) != 2:
        raise ValueError("A/B test set creation expects exactly two model directories.")

    count = materialize_ab_sets(
        base_dir=Path(args.base_dir),
        output_dir=Path(args.output_dir),
        models=models,
        use_hardlinks=not args.copy,
    )

    print(f"Created {count} A/B sets in {args.output_dir}")


if __name__ == "__main__":
    main()
