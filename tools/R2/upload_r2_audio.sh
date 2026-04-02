#!/usr/bin/env bash

set -euo pipefail

ACCOUNT_ID="b9aaf69bbf6ffe90ed39e2913b5d80a5"
BUCKET_NAME="${BUCKET_NAME:-mos-audio}"
REMOTE_NAME="cf_r2"
ENDPOINT="https://${ACCOUNT_ID}.r2.cloudflarestorage.com"
MODE="${MODE:-copy}"
ROOT_DIR="${ROOT_DIR:-$(pwd)}"
SOURCE_DIR="${SOURCE_DIR:-audio/voxcpm_ab_test_sets}"
REMOTE_PREFIX="${REMOTE_PREFIX:-audio/voxcpm_ab_test_sets}"
DRY_RUN="${DRY_RUN:-false}"

if [[ -z "${R2_ACCESS_KEY_ID:-}" || -z "${R2_SECRET_ACCESS_KEY:-}" ]]; then
  cat >&2 <<'EOF'
R2_ACCESS_KEY_ID 和 R2_SECRET_ACCESS_KEY 是必填环境变量。

示例：
  export R2_ACCESS_KEY_ID="..."
  export R2_SECRET_ACCESS_KEY="..."
  ./tools/R2/upload_r2_audio.sh

可选环境变量：
  SOURCE_DIR="audio/voxcpm_ab_test_sets"
  REMOTE_PREFIX="audio/voxcpm_ab_test_sets"
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

SRC="${ROOT_DIR}/${SOURCE_DIR}"
DEST="${REMOTE_NAME}:${BUCKET_NAME}/${REMOTE_PREFIX}"

if [[ ! -d "${SRC}" ]]; then
  echo "Source directory not found: ${SRC}" >&2
  exit 1
fi

echo "Using endpoint: ${ENDPOINT}"
echo "Uploading to bucket: ${BUCKET_NAME}"
echo "Mode: ${MODE}"
echo "Source directory: ${SRC}"
echo "Remote prefix: ${REMOTE_PREFIX}"

echo
echo "==> ${MODE} ${SRC} -> ${DEST}"

CMD=(
  rclone
  "${MODE}"
  "${SRC}"
  "${DEST}"
  --config "${CONFIG_FILE}"
  --progress
  --checkers 16
  --transfers 16
  --fast-list
  --check-first
  --s3-no-check-bucket
)

if [[ "${DRY_RUN}" == "true" ]]; then
  CMD+=(--dry-run)
fi

"${CMD[@]}"

echo
echo "Upload finished."
echo "Quick verification:"
echo "  rclone lsf ${REMOTE_NAME}:${BUCKET_NAME}/${REMOTE_PREFIX}/set1 --config ${CONFIG_FILE} | head"
