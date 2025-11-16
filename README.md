# VevDemo - 视频剪辑 Web SDK 演示项目

基于火山引擎视频点播服务的完整视频剪辑 Web 应用示例。

## ✨ 特性

- ✅ **环境变量管理**: 所有配置项统一管理，避免硬编码
- ✅ **前后端分离**: Node.js 后端 + Vite 前端
- ✅ **完整功能**: 视频剪辑、特效、滤镜、转场、文字等
- ✅ **自动配置**: 前端自动从后端获取配置
- ✅ **辅助工具**: 提供创建工程、查询空间等脚本

## 🚀 快速开始

### 前提条件

- Node.js v14+ 
- npm
- 火山引擎账号（已开通视频点播服务）

### 1. 安装依赖

```bash
# 安装后端依赖
cd nodejs
npm install

# 安装前端依赖
cd ../fe
npm install
```

### 2. 配置环境变量

```bash
cd nodejs
cp .env.example .env
# 编辑 .env 文件，填入您的配置
```

必需配置项：
- `VOLC_ACCESS_KEY`: 火山引擎访问密钥
- `VOLC_SECRET_KEY`: 火山引擎密钥
- `ACCOUNT_ID`: 账号ID
- `SPACE_NAME`: 点播空间名称

### 3. 创建剪辑工程

```bash
cd nodejs
node scripts/createProject.js <your_space_name>
```

将输出的 `PROJECT_ID` 和 `GROUP_ID` 添加到 `.env` 文件。

### 4. 启动服务

```bash
# 启动后端（终端1）
cd nodejs
npm run dev

# 启动前端（终端2）
cd fe
npm run dev
```

### 5. 访问应用

打开浏览器访问: http://localhost:8084

## 📁 项目结构

```
vevdemo/
├── nodejs/                 # 后端服务
│   ├── .env               # 环境变量配置（不提交）
│   ├── .env.example       # 环境变量模板
│   ├── controllers/       # 控制器
│   ├── services/          # 业务逻辑
│   ├── utils/             # 工具函数
│   ├── scripts/           # 辅助脚本
│   │   ├── createProject.js   # 创建剪辑工程
│   │   └── listSpaces.js      # 查询空间列表
│   └── index.js           # 服务入口
├── fe/                    # 前端应用
│   ├── index.js           # 应用入口
│   ├── actions.js         # API 封装
│   ├── util.js            # 工具函数
│   └── material.ts        # 素材配置
├── docs/                  # 文档
├── CONFIG_GUIDE.md        # 配置指南
├── PROJECT_INFO.md        # 项目配置信息
└── README.md              # 本文件
```

## 🔧 配置管理

### 架构

```
.env 文件 → 后端服务 → /api/getConfig → 前端应用
```

### 环境变量

所有配置项在 `nodejs/.env` 中管理：

| 变量 | 说明 | 示例 |
|------|------|------|
| VOLC_ACCESS_KEY | 火山引擎 AK | AKLT... |
| VOLC_SECRET_KEY | 火山引擎 SK | base64... |
| ACCOUNT_ID | 账号ID | 2110780953 |
| SPACE_NAME | 空间名称 | space4s4ms6 |
| PROJECT_ID | 项目ID | p028c... |
| GROUP_ID | 组ID | g021... |
| REGION | 区域 | cn-north-1 |

详细说明请查看 [CONFIG_GUIDE.md](./CONFIG_GUIDE.md)

## 🛠️ API 接口

### 后端 API

- `POST /api/createProject` - 创建剪辑工程
- `POST /api/describeProject` - 获取工程信息
- `POST /api/updateProject` - 更新工程
- `POST /api/searchEditMaterial` - 搜索素材
- `POST /api/createEditMaterial` - 创建素材
- `POST /api/deleteEditMaterial` - 删除素材
- `POST /api/getEffectList` - 获取特效列表
- `POST /api/submitEditTaskAsync` - 提交导出任务
- `GET /api/searchVideo` - 搜索视频
- `GET /api/getVideoPlayInfo` - 获取播放信息
- `GET /api/mGetMaterial` - 批量获取素材
- `GET /api/getUploadToken` - 获取上传令牌
- `GET /api/getConfig` - **获取配置（新增）**

## 🎬 功能特性

- ✅ 视频/图片/音频上传
- ✅ 多轨道编辑
- ✅ 视频裁剪、分割
- ✅ 添加特效
- ✅ 添加滤镜
- ✅ 添加转场
- ✅ 添加文字和字幕
- ✅ 实时预览
- ✅ 导出合成视频

## 📝 辅助脚本

### 查询空间列表

```bash
cd nodejs
node scripts/listSpaces.js
```

### 创建剪辑工程

```bash
cd nodejs
node scripts/createProject.js <space_name>
```

## 🔄 更新配置

1. 修改 `nodejs/.env` 文件
2. 重启后端服务
3. 刷新浏览器页面

前端会自动获取最新配置，无需重新构建。

## 📖 文档

- [配置指南](./CONFIG_GUIDE.md) - 详细的配置说明
- [项目信息](./PROJECT_INFO.md) - 当前项目配置
- [集成文档](./docs/集成视频剪辑%20Web%20SDK.md) - SDK 集成文档
- [创建工程 API](./docs/CreateProject%20-%20创建剪辑工程.md) - API 文档

## 🐛 常见问题

### 配置修改后不生效？

需要重启后端服务，前端刷新页面即可。

### 前端白屏？

1. 检查后端服务是否运行
2. 检查浏览器控制台错误
3. 确认 `.env` 配置是否正确
4. 确认 PROJECT_ID 和 GROUP_ID 是否有效

### 上传失败？

1. 检查 ACCOUNT_ID 是否正确
2. 检查 SPACE_NAME 是否存在
3. 检查火山引擎密钥是否有效
4. 检查网络连接

## 🔐 安全建议

### 开发环境

- ✅ 使用 .env 文件管理配置
- ✅ 不要提交 .env 文件到 Git
- ✅ 每个开发者维护自己的配置

### 生产环境

- ✅ 使用服务器环境变量
- ✅ 定期轮换访问密钥
- ✅ 使用 RAM 子账号限制权限
- ✅ 启用 HTTPS
- ✅ 配置 CORS 白名单

## 🌟 技术栈

### 后端

- Node.js
- Koa
- @volcengine/openapi
- dotenv

### 前端

- Vite
- VeVEditor SDK
- TTUploader

## 📞 技术支持

- [火山引擎文档](https://www.volcengine.com/docs/4/)
- [视频点播产品页](https://www.volcengine.com/product/vod)

## 📄 License

本项目仅供学习和参考使用。

---

**最后更新**: 2025-11-16
**版本**: 2.0.0 (环境变量重构版)

