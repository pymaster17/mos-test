# MOS/SMOS 音频主观测试系统

## 1. 项目简介

本项目是一个基于 [BeaqleJS](https://github.com/HSU-ANT/beaqlejs) 框架开发的 MOS (Mean Opinion Score) 和 SMOS (Similarity Mean Opinion Score) 音频主观测试系统。

通过提供自动化的 Python 脚本，本项目极大地简化了测试集的创建和配置过程，并支持使用 Docker 进行一键部署，让研究人员可以快速搭建并开展音频质量的主观评估实验。

## 2. 功能特性

- **两种测试模式**:
  - **MOS**: 对单个音频进行质量评分（1-5分）。
  - **SMOS**: 将待测音频与参考音频进行相似度比较评分（1-5分）。
- **自动化辅助脚本**:
  - `organize_audio_files.py`: 自动筛选指定时长范围的音频，将来自不同模型（文件夹）的同名音频文件整理为独立的测试集（`set` 文件夹）。
  - `generate_config.py`: 扫描 `set` 文件夹，自动生成符合 BeaqleJS 格式的 `TestConfig` 配置文件。
- **Docker 快速部署**: 内置 `docker-compose.yml` 配置，使用 Docker 可实现一键启动 Web 服务，无需手动配置 PHP 环境。
- **在线结果收集**: 后端采用 PHP 服务，可在线收集测试者提交的评分结果，并以 JSON 格式保存在服务器端。

## 3. 目录结构

```
mos/
├── audio/                   # 存放音频文件和处理脚本
│   ├── vocos_mos_set/       # 存放 organize_audio_files.py 生成的 set 文件夹
│   ├── organize_audio_files.py  # 脚本：整理音频文件，生成 set 文件夹
│   └── generate_config.py   # 脚本：根据 set 文件夹生成配置文件
├── config/                  # 存放测试配置文件 (*.js)
├── web_service/             # 存放 PHP 后端服务
│   ├── results/             # (需手动创建或由服务自动创建) 存放收集到的测试结果
│   └── beaqleJS_Service.php # 处理结果提交的后端脚本
├── css/                     # 样式文件
├── js/                      # BeaqleJS 核心脚本
├── MOS.html                 # MOS 测试主页面
├── SMOS.html                # SMOS 测试主页面
└── README.md                # 本文档
```

## 4. 使用指南

### 步骤一：准备原始音频文件

1.  创建一个基目录（例如 `MOS-test-data`）。
2.  在基目录下，为每个需要评测的模型（包括 Ground Truth）创建一个子文件夹。
3.  将各模型生成的音频文件放入对应的子文件夹中，**确保不同文件夹下的对应音频文件名（除后缀外）完全相同**。

例如，目录结构应如下所示：

```
MOS-test-data/
├── gt/                 # Ground Truth 音频
│   ├── audio_001.wav
│   └── audio_002.wav
├── hifigan/            # 模型 A
│   ├── audio_001.wav
│   └── audio_002.wav
└── my_vocoder/         # 模型 B
    ├── audio_001.wav
    └── audio_002.wav
```

### 步骤二：生成测试集 (Set)

此步骤会将原始音频按组整理，并筛选出符合条件的音频。

1.  在终端中运行 `organize_audio_files.py` 脚本：
    ```bash
    python audio/organize_audio_files.py
    ```
2.  根据脚本提示，依次输入：
    - **包含多个模型音频文件夹的基目录路径**: 即步骤一中创建的 `MOS-test-data` 文件夹的绝对路径。
    - **输出目录路径**: 推荐使用默认的 `audio/vocos_mos_set` 路径（相对于项目根目录）。
    - **希望随机选择的音频文件数量**: 您希望最终生成的测试集数量。

脚本会自动筛选出所有模型都存在的、且时长在 2-5 秒之间的音频，然后随机选择指定数量的组，复制并重命名到输出目录下的 `set1`, `set2`, ... 文件夹中。

### 步骤三：生成配置文件

此步骤会根据上一步生成的 `set` 文件夹，自动创建 `MOS.js` 或 `SMOS.js` 配置文件。

1.  运行 `generate_config.py` 脚本：
    ```bash
    python audio/generate_config.py
    ```
2.  根据脚本提示，依次输入：
    - **包含set文件夹的目录路径**: 即上一步的输出目录 `audio/vocos_mos_set` 的绝对路径。
    - **输出配置文件路径**: 例如 `config/my_test_config.js`。
    - **测试类型**: 输入 `MOS` 或 `SMOS`。

脚本将在指定的输出路径生成一个完整的 BeaqleJS 配置文件。

### 步骤四：配置测试页面

将生成的配置文件链接到 HTML 页面。

1.  打开 `MOS.html` (如果生成的是 MOS 配置) 或 `SMOS.html` (如果生成的是 SMOS 配置)。
2.  找到以下代码行：
    ```html
    <script src="config/MOS.js" type="text/javascript"></script>
    ```
3.  将其中的 `src` 属性修改为您在步骤三中生成的配置文件路径，例如：
    ```html
    <script src="config/my_test_config.js" type="text/javascript"></script>
    ```

### 步骤五：部署测试系统

推荐使用 Docker 进行部署，方便快捷。

1.  确保您的系统中已安装并运行 Docker 和 Docker Compose。
2.  进入 `tools/Docker/` 目录：
    ```bash
    cd tools/Docker/
    ```
3.  启动服务：
    ```bash
    docker-compose up -d
    ```
    该命令会以后台模式启动一个 `php:7.0-apache` 容器，并将项目根目录挂载到容器的 `/var/www/html`。
4.  现在，您可以通过浏览器访问 `http://localhost` 或 `http://<服务器IP地址>` 来打开测试页面。

**手动部署**: 如果不使用 Docker，请将整个项目文件夹放置于支持 PHP 的 Web 服务器（如 Apache, Nginx）的网站根目录下，并确保 PHP 版本 >= 5.6。

## 5. 查看测试结果

-   测试者完成测试并提交后，结果将以 JSON 文件的形式保存在 `web_service/results/` 目录下。
-   **重要**: 请确保 Web 服务器对 `web_service/results/` 目录拥有**写入权限**。使用 `docker-compose` 部署时通常无需额外配置。如果手动部署，您可能需要执行 `chmod -R 777 web_service/results` 或配置正确的用户权限。

## 6. 致谢

本项目基于优秀的开源项目 [BeaqleJS](https://github.com/HSU-ANT/beaqlejs) 构建，并对其进行了功能封装和易用性改造。感谢原作者 S. Kraft 和 U. Zölzer 的杰出工作。
