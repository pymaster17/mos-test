# R2 Upload Helper

This helper uploads the unified audio layout declared in [config/audio_manifest.json](/Users/pymaster/projects/mos-test/config/audio_manifest.json).

Default local layout:

- `audio/gt/<sample_id>.wav`
- `audio/VoxCPM_GM/<sample_id>.wav`
- `audio/VoxCPM_SC/<sample_id>.wav`
- `audio/VoxCPM_SC2/<sample_id>.wav`

Default remote layout in bucket `mos-audio`:

- `audio/gt/<sample_id>.wav`
- `audio/VoxCPM_GM/<sample_id>.wav`
- `audio/VoxCPM_SC/<sample_id>.wav`
- `audio/VoxCPM_SC2/<sample_id>.wav`

That matches:

- [config/ABTest_SC_vs_GM.js](/Users/pymaster/projects/mos-test/config/ABTest_SC_vs_GM.js)
- [config/ABTest_SC_vs_SC2.js](/Users/pymaster/projects/mos-test/config/ABTest_SC_vs_SC2.js)
- [config/MOS.js](/Users/pymaster/projects/mos-test/config/MOS.js)
- [config/SMOS.js](/Users/pymaster/projects/mos-test/config/SMOS.js)

## Credentials

Create an R2 API token in the Cloudflare dashboard:

1. Open `R2`
2. Open `Manage R2 API tokens`
3. Create a token with `Object Read & Write`
4. Scope it to bucket `mos-audio`
5. Copy:
   - `Access Key ID`
   - `Secret Access Key`

## Dry run

```bash
export R2_ACCESS_KEY_ID="your-access-key-id"
export R2_SECRET_ACCESS_KEY="your-secret-access-key"
DRY_RUN=true ./tools/R2/upload_r2_audio.sh
```

## Upload all model directories from the manifest

```bash
export R2_ACCESS_KEY_ID="your-access-key-id"
export R2_SECRET_ACCESS_KEY="your-secret-access-key"
./tools/R2/upload_r2_audio.sh
```

## Upload one model directory only

```bash
export R2_ACCESS_KEY_ID="your-access-key-id"
export R2_SECRET_ACCESS_KEY="your-secret-access-key"
SOURCE_DIR="audio/VoxCPM_GM" \
REMOTE_PREFIX="audio/VoxCPM_GM" \
./tools/R2/upload_r2_audio.sh
```

## Notes

- Default mode is `copy`, so it uploads new or changed files without deleting remote files.
- To mirror local state and delete extra remote files, use `MODE=sync`.
- Default manifest path is `config/audio_manifest.json`.
- In manifest mode, the script uploads every model directory declared under `models`.
- Sample remote object:
  - `audio/VoxCPM_GM/2001000001.wav`
