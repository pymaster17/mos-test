# GitHub Pages + Cloudflare R2 + D1 落地步骤

本文档对应当前仓库已经落地的结构：

- GitHub Pages 托管网页
- Cloudflare R2 托管音频
- Cloudflare Workers + D1 收集结果
- 音频统一使用 `audio/<model>/<sample_id>.wav`

## 一、当前资源

当前 Cloudflare 账号里已有：

- D1 数据库：`mos-results`
- D1 数据库 ID：`c35ad555-f992-4d98-8f29-2d202a708e0d`
- R2 bucket：`mos-audio`
- R2 公网域名：`https://pub-a4d493f7583e47ada8a9ff6b681a01fd.r2.dev/`
- Worker 提交地址：`https://mos-results-api.pymaster17.workers.dev/api/submissions`

## 二、统一音频结构

本项目现在要求：

```text
audio/
├── gt/2001000001.wav
├── VoxCPM_GM/2001000001.wav
└── VoxCPM_SC/2001000001.wav
```

规则：

- 目录名就是模型名
- 文件名主干就是 `sample_id`
- 参考模型目录推荐固定为 `gt`

## 三、准备 GitHub Pages

1. 推送这些文件到 GitHub 仓库：
   - `ABTest.html`
   - `MOS.html`
   - `SMOS.html`
   - `js/`
   - `css/`
   - `img/`
   - `config/`
   - `.nojekyll`
2. 打开仓库 `Settings -> Pages`
3. 选择 `Deploy from a branch`
4. 选择 `main` 分支和根目录 `/`
5. 等待构建完成

发布后页面类似：

- `https://<github-user>.github.io/<repo>/ABTest.html`

## 四、生成统一 manifest

在项目根目录执行：

```bash
python3 audio/build_audio_manifest.py \
  --audio-root audio \
  --output config/audio_manifest.json \
  --reference-model gt
```

输出：

- [config/audio_manifest.json](/Users/pymaster/projects/mos-test/config/audio_manifest.json)

## 五、生成前端配置

### AB

```bash
python3 audio/generate_config.py \
  --manifest config/audio_manifest.json \
  --output-file config/ABTest.js \
  --test-type AB \
  --model-a VoxCPM_GM \
  --model-b VoxCPM_SC \
  --audio-root "https://pub-a4d493f7583e47ada8a9ff6b681a01fd.r2.dev/" \
  --submission-url "https://mos-results-api.pymaster17.workers.dev/api/submissions"
```

### MOS

```bash
python3 audio/generate_config.py \
  --manifest config/audio_manifest.json \
  --output-file config/MOS.js \
  --test-type MOS \
  --models VoxCPM_GM,VoxCPM_SC \
  --audio-root "https://pub-a4d493f7583e47ada8a9ff6b681a01fd.r2.dev/" \
  --submission-url "https://mos-results-api.pymaster17.workers.dev/api/submissions"
```

### SMOS

```bash
python3 audio/generate_config.py \
  --manifest config/audio_manifest.json \
  --output-file config/SMOS.js \
  --test-type SMOS \
  --models VoxCPM_GM,VoxCPM_SC \
  --reference-model gt \
  --audio-root "https://pub-a4d493f7583e47ada8a9ff6b681a01fd.r2.dev/" \
  --submission-url "https://mos-results-api.pymaster17.workers.dev/api/submissions"
```

说明：

- `AudioRoot` 填到域名根
- 配置内每条音频路径本身已经带 `audio/...`

## 六、上传音频到 R2

推荐直接用仓库内脚本：

```bash
export R2_ACCESS_KEY_ID="..."
export R2_SECRET_ACCESS_KEY="..."
./tools/R2/upload_r2_audio.sh
```

这个脚本会读取 `config/audio_manifest.json`，并上传 manifest 中声明的模型目录。

上传后，公网对象路径应类似：

```text
audio/gt/2001000001.wav
audio/VoxCPM_GM/2001000001.wav
audio/VoxCPM_SC/2001000001.wav
```

## 七、R2 CORS

bucket 需要允许 GitHub Pages origin，例如：

```json
[
  {
    "AllowedOrigins": [
      "https://<github-user>.github.io"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "MaxAgeSeconds": 3600
  }
]
```

如果页面后续换成自定义域名，也要把新 origin 加进去。

## 八、Worker + D1

仓库内代码：

- [cloudflare/results-api/package.json](/Users/pymaster/projects/mos-test/cloudflare/results-api/package.json)
- [cloudflare/results-api/wrangler.toml](/Users/pymaster/projects/mos-test/cloudflare/results-api/wrangler.toml)
- [cloudflare/results-api/src/index.js](/Users/pymaster/projects/mos-test/cloudflare/results-api/src/index.js)

标准流程：

```bash
cd /Users/pymaster/projects/mos-test/cloudflare/results-api
npm install
npx wrangler login
npx wrangler secret put ADMIN_TOKEN
npx wrangler secret put IP_HASH_SALT
npm run db:migrate
npm run deploy
```

当前线上地址已经是：

- `https://mos-results-api.pymaster17.workers.dev/health`
- `https://mos-results-api.pymaster17.workers.dev/api/submissions`

## 九、联调检查

按顺序检查：

1. 打开单条音频 URL，确认 `200 OK`
2. 打开 Worker 健康检查，确认返回成功 JSON
3. 打开 GitHub Pages 页面，确认音频可播放
4. 完成一次测试并提交
5. 用导出接口确认结果已经写入 D1

导出示例：

```bash
curl \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  "https://mos-results-api.pymaster17.workers.dev/api/submissions/export?limit=5"
```

## 十、常见问题

### 1. 页面能打开，但音频播放失败

优先检查：

- R2 对象路径是否仍然是 `audio/<model>/<sample_id>.wav`
- R2 CORS 是否包含页面 origin
- `AudioRoot` 是否填成了域名根

### 2. 音频能播放，但提交失败

优先检查：

- `BeaqleServiceURL` 是否正确
- Worker 的 `ALLOWED_ORIGINS` 是否包含页面 origin
- Worker 是否已公开在 `workers.dev`

### 3. 配置生成后找不到音频

优先检查：

- manifest 中样本是否真的在对应模型目录存在
- 文件名是否已经规范化成相同 `sample_id`
