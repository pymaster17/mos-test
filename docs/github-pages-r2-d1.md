# GitHub Pages + Cloudflare R2 + D1 落地步骤

本文档对应当前仓库中的静态前端、Cloudflare Worker 结果接口和 D1 数据库实现。

## 一、整体架构

- GitHub Pages：托管 `ABTest.html`、`js/`、`css/`、`img/`、`config/`
- Cloudflare R2：托管所有音频文件
- Cloudflare Workers + D1：接收提交结果并存入数据库

当前已在你的 Cloudflare 账号中创建的资源：

- D1 数据库：`mos-results`
- D1 数据库 ID：`c35ad555-f992-4d98-8f29-2d202a708e0d`
- R2 bucket：`mos-audio`
- R2 托管公网域名：`https://pub-a4d493f7583e47ada8a9ff6b681a01fd.r2.dev/`

推荐域名结构：

- 页面：`https://<github-user>.github.io/<repo>/ABTest.html`
- 音频：`https://media.example.com/audio/...`
- 结果接口：`https://mos-results-api.<subdomain>.workers.dev/api/submissions`

## 二、准备 GitHub Pages

1. 将网页相关文件推到 GitHub 仓库：
   - `ABTest.html`
   - `js/`
   - `css/`
   - `img/`
   - `config/ABTest.js`
   - `.nojekyll`
2. 打开 GitHub 仓库的 `Settings -> Pages`
3. 在 `Build and deployment` 里选择 `Deploy from a branch`
4. 选择 `main` 分支和根目录 `/`
5. 等待 GitHub Pages 发布成功

发布地址通常为：

`https://<github-user>.github.io/<repo>/ABTest.html`

## 三、准备 Cloudflare R2 音频存储

1. 在 Cloudflare Dashboard 中进入 `R2`
2. 当前账号里已经创建好 bucket：`mos-audio`
3. 上传音频文件，并保持对象路径与配置文件一致，例如：

```text
audio/aishell3_test_mushra/set1/SSB07020452_hifigan.wav
audio/aishell3_test_mushra/set1/SSB07020452_vocos.wav
```

4. 如果暂时不想绑定自定义域名，可以先直接使用已启用的 R2 托管域名：

`https://pub-a4d493f7583e47ada8a9ff6b681a01fd.r2.dev/`

5. 如果你之后有接入 Cloudflare 的正式域名，再为 bucket 绑定自定义域名，例如 `media.example.com`
6. bucket 已经配置了 GitHub Pages 所需的 CORS。如果你更换 GitHub 用户名或自定义页面域名，请同步更新 CORS：

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

如果您之后给 GitHub Pages 配了自定义域名，例如 `https://ab.example.com`，请把它也加到 `AllowedOrigins` 中。

## 四、部署 Cloudflare D1 + Worker

仓库已经提供好了 Worker 代码，目录在：

- [`cloudflare/results-api/package.json`](/Users/pymaster/projects/mos-test/cloudflare/results-api/package.json)
- [`cloudflare/results-api/wrangler.toml`](/Users/pymaster/projects/mos-test/cloudflare/results-api/wrangler.toml)
- [`cloudflare/results-api/src/index.js`](/Users/pymaster/projects/mos-test/cloudflare/results-api/src/index.js)
- [`cloudflare/results-api/migrations/0001_init.sql`](/Users/pymaster/projects/mos-test/cloudflare/results-api/migrations/0001_init.sql)

### 1. 安装依赖

在本地进入 Worker 目录：

```bash
cd /Users/pymaster/projects/mos-test/cloudflare/results-api
npm install
```

### 2. 登录 Cloudflare

```bash
npx wrangler login
```

### 3. `workers.dev` 子域初始化

当前这个 Cloudflare 账号还没有初始化 `workers.dev` 子域。需要手动完成一次：

1. 打开 [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers/workers-and-pages)
2. 用当前账号进入页面一次
3. Cloudflare 会自动为该账号分配 `*.workers.dev` 子域

这一步完成后，仓库里的 `mos-results-api` Worker 才会有可访问的公网地址。

### 4. 修改 `wrangler.toml`

编辑 [`cloudflare/results-api/wrangler.toml`](/Users/pymaster/projects/mos-test/cloudflare/results-api/wrangler.toml)：

当前仓库已经预填好了真实 D1 信息。你只需要按需修改 `ALLOWED_ORIGINS`。

例如：

```toml
[vars]
ALLOWED_ORIGINS = "https://your-user.github.io"
```

如果你后续同时使用 GitHub Pages 自定义域名，可以写成逗号分隔：

```toml
[vars]
ALLOWED_ORIGINS = "https://your-user.github.io,https://ab.example.com"
```

### 5. Worker 当前状态

当前账号里已经上传了 Worker 脚本：

- Worker 名称：`mos-results-api`

但在 `workers.dev` 子域初始化前，你还不能拿到它的公网访问地址。

### 6. 配置 Worker Secrets

设置一个后台导出令牌：

```bash
npx wrangler secret put ADMIN_TOKEN
```

建议再设置一个 IP 哈希盐值，用于生成不可逆的访客 IP 摘要：

```bash
npx wrangler secret put IP_HASH_SALT
```

### 7. 执行数据库迁移

```bash
npm run db:migrate
```

### 8. 部署 Worker

```bash
npm run deploy
```

部署成功后，Cloudflare 会给出一个 URL，通常类似：

`https://mos-results-api.<subdomain>.workers.dev`

结果提交地址就是：

`https://mos-results-api.<subdomain>.workers.dev/api/submissions`

健康检查地址：

`https://mos-results-api.<subdomain>.workers.dev/health`

说明：

- D1 数据库和表结构已经创建好了
- 如果你只是继续沿用仓库当前代码，严格来说这里的迁移可以不再执行一次
- 但如果你之后改了 Worker 或迁移文件，仍然建议用 `wrangler` 再执行一遍正式流程

## 五、上传音频到 R2

当前 bucket 已创建，但对象还需要你上传。

最稳妥的做法是直接在 Cloudflare Dashboard 中上传：

1. 打开 Cloudflare Dashboard
2. 进入 `R2 -> mos-audio`
3. 上传你的音频目录内容
4. 保持对象路径和配置文件中写的一致，例如：

```text
audio/aishell3_test_mushra/set1/SSB07020452_hifigan.wav
audio/aishell3_test_mushra/set1/SSB07020452_vocos.wav
```

如果你后面想批量自动上传，我也可以再帮你补一套 `wrangler r2 object put` 或 S3 兼容上传脚本。

## 六、生成前端配置文件

在项目根目录执行：

```bash
python audio/generate_config.py
```

推荐输入如下：

1. `sets_directory`
   指向你的 `set` 目录
2. `output_file`
   填 `config/ABTest.js`
3. `test_type`
   填 `AB`
4. `model_a_name`
   例如 `hifigan`
5. `model_b_name`
   例如 `vocos`
6. `AudioRoot`
   如果你先用 R2 托管域名，填 `https://pub-a4d493f7583e47ada8a9ff6b681a01fd.r2.dev/`
   如果你后面绑定了自己的音频域名，再改成那个域名根
7. `BeaqleServiceURL`
   在 `workers.dev` 初始化并重新部署后，填 `https://<你的-workers-subdomain>.workers.dev/api/submissions`

注意：

- `AudioRoot` 这里应该填到域名根，例如 `https://pub-a4d493f7583e47ada8a9ff6b681a01fd.r2.dev/`
- 不要填成 `https://media.example.com/audio/`
- 因为配置文件中的每个音频路径本身已经包含 `audio/...`

## 七、检查 `ABTest.html`

确认 [`ABTest.html`](/Users/pymaster/projects/mos-test/ABTest.html#L17) 仍然引用：

```html
<script src="config/ABTest.js" type="text/javascript"></script>
```

如果你的配置文件用了别的名字，请同步改这里。

## 八、联调验证

按下面顺序检查：

1. 直接打开一条音频 URL，确认能公网访问
2. 初始化 `workers.dev` 后，重新部署 Worker
3. 打开 Worker 健康检查地址，确认返回成功 JSON
4. 打开 GitHub Pages 页面，确认音频可播放
5. 完成一次测试并提交
6. 用导出接口检查结果是否入库：

```bash
curl \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  "https://mos-results-api.<subdomain>.workers.dev/api/submissions/export?limit=5"
```

## 九、常见问题

### 1. 页面能打开，但音频播放失败

优先检查：

- R2 对象路径是否和配置文件完全一致
- R2 自定义域名是否已生效
- R2 的 CORS 是否包含 GitHub Pages 的 origin

### 2. 音频能播放，但提交失败

优先检查：

- `config/ABTest.js` 中的 `BeaqleServiceURL` 是否正确
- Worker 的 `ALLOWED_ORIGINS` 是否包含页面 origin
- D1 迁移是否已执行
- Worker secrets 是否已设置

### 3. 想导出更多结果

可以继续调用导出接口，并提高 `limit`，最大支持 `1000`：

```bash
curl \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  "https://mos-results-api.<subdomain>.workers.dev/api/submissions/export?limit=1000"
```
