#!/usr/bin/env bash

set -euo pipefail

ACCOUNT_ID="b9aaf69bbf6ffe90ed39e2913b5d80a5"
BUCKET_NAME="${BUCKET_NAME:-mos-audio}"
REMOTE_NAME="cf_r2"
ENDPOINT="https://${ACCOUNT_ID}.r2.cloudflarestorage.com"
MODE="${MODE:-copy}"
ROOT_DIR="${ROOT_DIR:-$(pwd)}"
MANIFEST_PATH="${MANIFEST_PATH:-config/audio_manifest.json}"
SOURCE_DIR="${SOURCE_DIR:-}"
REMOTE_PREFIX="${REMOTE_PREFIX:-audio}"
DRY_RUN="${DRY_RUN:-false}"

if [[ -z "${R2_ACCESS_KEY_ID:-}" || -z "${R2_SECRET_ACCESS_KEY:-}" ]]; then
  cat >&2 <<'EOF'
R2_ACCESS_KEY_ID 和 R2_SECRET_ACCESS_KEY 是必填环境变量。

示例：
  export R2_ACCESS_KEY_ID="..."
  export R2_SECRET_ACCESS_KEY="..."
  ./tools/R2/upload_r2_audio.sh

可选环境变量：
  MANIFEST_PATH="config/audio_manifest.json"
  SOURCE_DIR="audio/VoxCPM_GM"
  REMOTE_PREFIX="audio/VoxCPM_GM"
  MODE="copy"  # 或 sync
  DRY_RUN="true"
EOF
  exit 1
fi

if [[ "${MODE}" != "copy" && "${MODE}" != "sync" ]]; then
  echo "MODE 只能是 copy 或 sync，当前值: ${MODE}" >&2
  exit 1
fi

CONFIG_FILE="$(mktemp /tmp/rclone-r2-XXXXXX.conf)"
cleanup() {
  rm -f "${CONFIG_FILE}"
}
trap cleanup EXIT

cat > "${CONFIG_FILE}" <<EOF
[${REMOTE_NAME}]
type = s3
provider = Cloudflare
access_key_id = ${R2_ACCESS_KEY_ID}
secret_access_key = ${R2_SECRET_ACCESS_KEY}
endpoint = ${ENDPOINT}
acl = private
no_check_bucket = true
EOF

COMMON_ARGS=(
  --config "${CONFIG_FILE}"
  --progress
  --checkers 16
  --transfers 16
  --fast-list
  --check-first
  --s3-no-check-bucket
)

if [[ "${DRY_RUN}" == "true" ]]; then
  COMMON_ARGS+=(--dry-run)
fi

upload_one() {
  local source_dir="$1"
  local remote_prefix="$2"
  local source_abs="${ROOT_DIR}/${source_dir}"
  local dest="${REMOTE_NAME}:${BUCKET_NAME}/${remote_prefix}"

  if [[ ! -d "${source_abs}" ]]; then
    echo "Source directory not found: ${source_abs}" >&2
    exit 1
  fi

  echo
  echo "==> ${MODE} ${source_abs} -> ${dest}"
  rclone "${MODE}" "${source_abs}" "${dest}" "${COMMON_ARGS[@]}"
}

echo "Using endpoint: ${ENDPOINT}"
echo "Uploading to bucket: ${BUCKET_NAME}"
echo "Mode: ${MODE}"

if [[ -n "${SOURCE_DIR}" ]]; then
  echo "Single directory mode"
  echo "Source directory: ${ROOT_DIR}/${SOURCE_DIR}"
  echo "Remote prefix: ${REMOTE_PREFIX}"
  upload_one "${SOURCE_DIR}" "${REMOTE_PREFIX}"
else
  echo "Manifest mode"
  echo "Manifest path: ${ROOT_DIR}/${MANIFEST_PATH}"

  MODEL_DIRS=()
  while IFS= read -r model_dir; do
    MODEL_DIRS+=("${model_dir}")
  done < <(
    python3 - "${ROOT_DIR}" "${MANIFEST_PATH}" <<'PY'
import json
import sys
from pathlib import Path

root_dir = Path(sys.argv[1])
manifest_path = root_dir / sys.argv[2]
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

for model_name in sorted(manifest["models"].keys()):
    print(f"audio/{model_name}")
PY
  )

  if [[ "${#MODEL_DIRS[@]}" -eq 0 ]]; then
    echo "No model directories found in manifest: ${MANIFEST_PATH}" >&2
    exit 1
  fi

  echo "Model directories:"
  printf '  %s\n' "${MODEL_DIRS[@]}"

  for model_dir in "${MODEL_DIRS[@]}"; do
    upload_one "${model_dir}" "${model_dir}"
  done
fi

echo
echo "Upload finished."
echo "Quick verification:"
echo "  rclone lsf ${REMOTE_NAME}:${BUCKET_NAME}/audio/VoxCPM_GM --config ${CONFIG_FILE} | head"
