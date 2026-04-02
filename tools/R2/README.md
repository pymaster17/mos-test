# R2 Upload Helper

This helper uploads the final A/B test set directory:

- `audio/voxcpm_ab_test_sets`

It sends them to the existing Cloudflare R2 bucket:

- `mos-audio`

By default the remote object keys will be created under:

- `audio/voxcpm_ab_test_sets/...`

That matches the paths currently referenced by [config/ABTest.js](/Users/pymaster/projects/mos-test/config/ABTest.js).

## Credentials

Create an R2 API token in the Cloudflare dashboard:

1. Open Cloudflare Dashboard
2. Go to `R2`
3. Find `Manage R2 API tokens`
4. Create a token with `Object Read & Write`
5. Scope it to bucket `mos-audio`
6. Copy the two values shown once:
   - `Access Key ID`
   - `Secret Access Key`

## Dry run

```bash
export R2_ACCESS_KEY_ID="your-access-key-id"
export R2_SECRET_ACCESS_KEY="your-secret-access-key"
DRY_RUN=true ./tools/R2/upload_r2_audio.sh
```

## Upload

```bash
export R2_ACCESS_KEY_ID="your-access-key-id"
export R2_SECRET_ACCESS_KEY="your-secret-access-key"
./tools/R2/upload_r2_audio.sh
```

## Custom paths

```bash
export R2_ACCESS_KEY_ID="your-access-key-id"
export R2_SECRET_ACCESS_KEY="your-secret-access-key"
SOURCE_DIR="audio/voxcpm_ab_test_sets" \
REMOTE_PREFIX="audio/voxcpm_ab_test_sets" \
./tools/R2/upload_r2_audio.sh
```

## Notes

- Default mode is `copy`, so it will upload new or changed files without deleting remote files.
- To mirror local state and delete extra remote files, use `MODE=sync`.
- The default upload source is `audio/voxcpm_ab_test_sets`.
- The default remote prefix is `audio/voxcpm_ab_test_sets`.
- After upload, a sample object path should look like:
  - `audio/voxcpm_ab_test_sets/set1/2001000001_VoxCPM_GM.wav`
