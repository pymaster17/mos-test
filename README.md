# MOS/SMOS/AB 音频主观测试系统

## 1. 项目简介

本项目基于 [BeaqleJS](https://github.com/HSU-ANT/beaqlejs) 构建，用于开展三类主观听感测试：

- MOS
- SMOS
- AB Preference

当前仓库的主流程已经统一为：

- 单一音频结构：`audio/<model>/<sample_id>.wav`
- 统一 manifest：`config/audio_manifest.json`
- 按测试类型生成配置：`config/ABTest.js`、`config/MOS.js`、`config/SMOS.js`

## 2. 功能特性

- 三种测试模式
  - `MOS`: 对候选音频做质量评分
  - `SMOS`: 相对于参考音频做相似度评分
  - `AB Preference`: 两个模型直接做偏好选择
- 统一音频组织
  - 所有测试共用 `audio/<model>/<sample_id>.wav`
  - 推荐参考音频目录固定为 `gt`
- 统一配置生成
  - [audio/build_audio_manifest.py](/Users/pymaster/projects/mos-test/audio/build_audio_manifest.py)
  - [audio/generate_config.py](/Users/pymaster/projects/mos-test/audio/generate_config.py)
- 两类结果后端
  - PHP: [web_service/beaqleJS_Service.php](/Users/pymaster/projects/mos-test/web_service/beaqleJS_Service.php)
  - Cloudflare: [cloudflare/results-api](/Users/pymaster/projects/mos-test/cloudflare/results-api)

## 3. 目录结构

```text
mos-test/
├── audio/
│   ├── gt/                        # 参考音频: audio/gt/<sample_id>.wav
│   ├── VoxCPM_GM/                 # 候选模型音频
│   ├── VoxCPM_SC/                 # 候选模型音频
│   ├── prepare_unified_audio.py   # 将旧目录规范化到统一结构
│   ├── build_audio_manifest.py    # 从统一结构生成 manifest
│   ├── generate_config.py         # 从 manifest 生成测试配置
│   └── decode_transcripts.py      # 可选文本处理脚本
├── config/
│   ├── audio_manifest.json
│   ├── ABTest.js
│   ├── MOS.js
│   └── SMOS.js
├── cloudflare/results-api/
├── tools/R2/
├── web_service/
├── css/
├── js/
├── ABTest.html
├── MOS.html
└── SMOS.html
```

## 4. 统一音频结构

规则：

- 每个模型一个目录
- 每个样本一个稳定的 `sample_id`
- 所有模型的同一样本必须共享相同的 `sample_id`

例如：

```text
audio/
├── gt/
│   ├── 2001000001.wav
│   └── 2001000002.wav
├── VoxCPM_GM/
│   ├── 2001000001.wav
│   └── 2001000002.wav
└── VoxCPM_SC/
    ├── 2001000001.wav
    └── 2001000002.wav
```

如果原始文件名还带有 `_generated` 或 `_reference`，先运行：

```bash
python3 audio/prepare_unified_audio.py --project-root . --audio-root audio
```

默认映射：

- `reference -> audio/gt`
- `VoxCPM_GM -> audio/VoxCPM_GM`
- `VoxCPM_SC -> audio/VoxCPM_SC`

## 5. 生成 manifest

```bash
python3 audio/build_audio_manifest.py \
  --audio-root audio \
  --output config/audio_manifest.json \
  --reference-model gt
```

输出文件：

- [config/audio_manifest.json](/Users/pymaster/projects/mos-test/config/audio_manifest.json)

manifest 描述：

- 哪些模型存在
- 哪个模型是参考模型
- 每个 `sample_id` 对应哪些模型音频

## 6. 生成测试配置

### AB Preference

```bash
python3 audio/generate_config.py \
  --manifest config/audio_manifest.json \
  --output-file config/ABTest.js \
  --test-type AB \
  --model-a VoxCPM_GM \
  --model-b VoxCPM_SC
```

### MOS

```bash
python3 audio/generate_config.py \
  --manifest config/audio_manifest.json \
  --output-file config/MOS.js \
  --test-type MOS \
  --models VoxCPM_GM,VoxCPM_SC
```

### SMOS

```bash
python3 audio/generate_config.py \
  --manifest config/audio_manifest.json \
  --output-file config/SMOS.js \
  --test-type SMOS \
  --models VoxCPM_GM,VoxCPM_SC \
  --reference-model gt
```

如果音频和提交接口在远端，再补：

- `--audio-root https://your-audio-host/`
- `--submission-url https://your-submit-api/api/submissions`

## 7. 页面入口

- [ABTest.html](/Users/pymaster/projects/mos-test/ABTest.html)
- [MOS.html](/Users/pymaster/projects/mos-test/MOS.html)
- [SMOS.html](/Users/pymaster/projects/mos-test/SMOS.html)

默认对应关系：

- `ABTest.html -> config/ABTest.js`
- `MOS.html -> config/MOS.js`
- `SMOS.html -> config/SMOS.js`

## 8. 部署

### Docker / PHP

```bash
cd tools/Docker
docker-compose up -d
```

### GitHub Pages + Cloudflare R2 + D1

参考：

- [docs/github-pages-r2-d1.md](/Users/pymaster/projects/mos-test/docs/github-pages-r2-d1.md)
- [cloudflare/results-api/README.md](/Users/pymaster/projects/mos-test/cloudflare/results-api/README.md)

### 上传音频到 R2

```bash
export R2_ACCESS_KEY_ID="..."
export R2_SECRET_ACCESS_KEY="..."
./tools/R2/upload_r2_audio.sh
```

该脚本默认读取 [config/audio_manifest.json](/Users/pymaster/projects/mos-test/config/audio_manifest.json)，并上传 manifest 中列出的所有模型目录。

## 9. 说明

- 当前方案不再依赖 `set1/set2/...` 中间目录
- 仓库内只保留统一音频结构方案所需脚本和数据入口
