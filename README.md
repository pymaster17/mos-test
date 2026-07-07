# MOS/SMOS/AB 音频主观测试系统

## 1. 项目简介

本项目基于 [BeaqleJS](https://github.com/HSU-ANT/beaqlejs) 构建，用于开展三类主观听感测试：

- MOS
- SMOS
- AB Preference

当前仓库的主流程已经统一为：

- 单一音频结构：`audio/<model>/<sample_id>.wav`
- 统一 manifest：`config/audio_manifest.json`
- 按实验分组的测试配置：`experiments/<实验>/<name>.js`（如 `experiments/vocalparse/SC_vs_GM.js`）
- 通用页面模板：`MOS.html` / `SMOS.html` / `ABTest.html`，通过 `?config=<实验>/<name>` 选择实例

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
│   └── audio_manifest.json         # 源 manifest（generate_config 的输入）
├── experiments/                    # 每个实验一个目录，内含该实验的测试配置
│   ├── vocalparse/
│   │   ├── SC_vs_GM.js
│   │   └── SC_vs_SC2.js
│   └── vocos/
│       ├── mos_v1.js
│       └── smos_v1.js
├── cloudflare/results-api/
├── tools/R2/
├── web_service/
├── css/
├── js/
├── index.html                      # 入口：列出所有实验与测试
├── MOS.html                        # 通用模板（?config=<实验>/<name>）
├── SMOS.html                       # 通用模板
└── ABTest.html                     # 通用模板
```

## 3.1 通用模板 + 按实验分组

- 三个页面 `MOS.html` / `SMOS.html` / `ABTest.html` 是**通用模板**，本身不含任何实验数据。
- 每个测试实例就是一个配置文件，按实验分组存放在 `experiments/<实验>/<name>.js`。
- 模板通过查询参数选择实例：`ABTest.html?config=vocalparse/SC_vs_GM` 会加载 `experiments/vocalparse/SC_vs_GM.js`。
- 缺省参数时各模板回退到默认实例：MOS→`vocos/mos_v1`、SMOS→`vocos/smos_v1`、AB→`vocalparse/SC_vs_GM`。
- 测试类型（MOS/SMOS/AB）由页面文件名决定（`js/beaqle.js` 的 `getTestMode()`），所以模板文件名必须保持 `MOS.html` / `SMOS.html` / `ABTest.html`。
- **新增一次测试** = 生成一个 `experiments/<实验>/<name>.js`，然后用 `<模板>.html?config=<实验>/<name>` 打开（并可在 `index.html` 加一张卡片）。核心代码（`js/` `css/` 模板）无需改动。

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
  --output-file experiments/vocalparse/SC_vs_GM.js \
  --test-type AB \
  --model-a VoxCPM_GM \
  --model-b VoxCPM_SC
```

如需生成第二组：

```bash
python3 audio/generate_config.py \
  --manifest config/audio_manifest.json \
  --output-file experiments/vocalparse/SC_vs_SC2.js \
  --test-type AB \
  --model-a VoxCPM_SC \
  --model-b VoxCPM_SC2
```

### MOS

```bash
python3 audio/generate_config.py \
  --manifest config/audio_manifest.json \
  --output-file experiments/vocos/mos_v1.js \
  --test-type MOS \
  --models VoxCPM_GM,VoxCPM_SC
```

### SMOS

```bash
python3 audio/generate_config.py \
  --manifest config/audio_manifest.json \
  --output-file experiments/vocos/smos_v1.js \
  --test-type SMOS \
  --models VoxCPM_GM,VoxCPM_SC \
  --reference-model gt
```

如果音频和提交接口在远端，再补：

- `--audio-root https://your-audio-host/`
- `--submission-url https://your-submit-api/api/submissions`

## 6.1 VocalRender 三项实验（N-CMOS / PS-CMOS / MS-MOS）

这三项针对歌声的实验数据布局与上面的统一结构不同（嵌套 `<Model>/<歌>/<seg>_generated.flac`
+ `score/<歌>/<seg>_score.png`），用**专用生成器**一次扫描目录直接产出 3 个配置：

```bash
python3 audio/build_vocalrender_configs.py \
  --cloudtest-root /path/to/cloudtest \
  --audio-root "https://pub-a4d493f7583e47ada8a9ff6b681a01fd.r2.dev/" \
  --submission-url "https://mos-results-api.pymaster17.workers.dev/api/submissions"
```

- 产出 `experiments/vocalrender/{n_cmos,ps_cmos,ms_mos}.js`。
- `--r2-prefix`（默认 `cloudtest`）= 上传到 R2 后的 key 前缀；路径按段 percent-encode。
- `--baseline`（默认 `VocalRender`）= CMOS 基准；其它模型为竞品，结果里算相对值。
- `--max-tests-per-run`（默认 20）、`--tests ncmos,pscmos,msmos` 可选子集。
- `--max-duration 8` / `--min-duration 4` = 只保留 `4s < 时长 < 8s` 的段（边界均为开区间，按 `--duration-model`，默认基准 VocalRender 的时长统一闸门；PS 参考与 MS 各模型都跟随同一批段），控制单题时长、去掉过短/过长样本。任一省略则该侧不设限。

三项测试各自的评分控件由 `js/beaqle.js` 的 `CmosTest`（N/PS，5 档 A+2…B+2，PS 多一个参考播放器）
与 `MsMosTest`（MS，乐谱图 + 4 档 1-4）实现。结果字段：CMOS 存
`CmosValue`(-2..+2, 正=竞品优于基准)/`CompetitorModel`；MS 存 `MsMosScore`(1-4)/`Model`。

## 7. 页面入口

- `index.html` — 入口，列出所有实验与测试
- `ABTest.html?config=<实验>/<name>` — AB 偏好测试模板
- `MOS.html?config=<实验>/<name>` — MOS 测试模板
- `SMOS.html?config=<实验>/<name>` — SMOS 测试模板
- `NCMOS.html?config=<实验>/<name>` — 自然度 N-CMOS 模板
- `PSCMOS.html?config=<实验>/<name>` — 韵律相似度 PS-CMOS 模板
- `MSMOS.html?config=<实验>/<name>` — 乐谱一致性 MS-MOS 模板

当前实例与访问链接：

- `ABTest.html?config=vocalparse/SC_vs_GM`  -> `experiments/vocalparse/SC_vs_GM.js`
- `ABTest.html?config=vocalparse/SC_vs_SC2` -> `experiments/vocalparse/SC_vs_SC2.js`
- `MOS.html?config=vocos/mos_v1`            -> `experiments/vocos/mos_v1.js`
- `SMOS.html?config=vocos/smos_v1`          -> `experiments/vocos/smos_v1.js`
- `NCMOS.html?config=vocalrender/n_cmos`    -> `experiments/vocalrender/n_cmos.js`
- `PSCMOS.html?config=vocalrender/ps_cmos`  -> `experiments/vocalrender/ps_cmos.js`
- `MSMOS.html?config=vocalrender/ms_mos`    -> `experiments/vocalrender/ms_mos.js`

不带 `?config=` 时各模板回退到默认实例（`vocos/mos_v1`、`vocos/smos_v1`、`vocalparse/SC_vs_GM`、
`vocalrender/n_cmos`、`vocalrender/ps_cmos`、`vocalrender/ms_mos`）。

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

VocalRender 三项实验的数据不走 manifest，需把整个 `cloudtest` 目录（各模型 + `GT` + `score`）
同步到 R2，key 前缀与生成器的 `--r2-prefix`（默认 `cloudtest`）一致、且保持 UTF-8 原样：

```bash
# 需先配置指向 R2 S3 endpoint 的 aws CLI（或用 rclone）
aws s3 sync /path/to/cloudtest s3://mos-audio/cloudtest \
  --endpoint-url "https://<account-id>.r2.cloudflarestorage.com" \
  --exclude "*.json" --exclude "*.jsonl"
```

## 9. 说明

- 当前方案不再依赖 `set1/set2/...` 中间目录
- 仓库内只保留统一音频结构方案所需脚本和数据入口
