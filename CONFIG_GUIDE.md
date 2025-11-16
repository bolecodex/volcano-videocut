# VevDemo 配置指南

本 Demo 采用环境变量管理所有配置，避免硬编码，方便维护和部署。

## 📋 配置架构

```
┌─────────────────────────────────────┐
│    nodejs/.env (环境变量文件)        │
│  - 存储所有配置                      │
│  - 不会提交到 Git                    │
│  - 使用 .env.example 作为模板       │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│  后端 API: /api/getConfig           │
│  - 读取环境变量                      │
│  - 提供给前端使用                    │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│  前端应用                            │
│  - 启动时调用 getConfig              │
│  - 动态初始化编辑器                  │
└─────────────────────────────────────┘
```

## 🔧 配置步骤

### 1. 配置后端环境变量

```bash
cd nodejs
cp .env.example .env
# 编辑 .env 文件，填入真实配置
```

### 2. 环境变量说明

#### 必需配置项

| 环境变量 | 说明 | 获取方式 |
|---------|------|---------|
| `VOLC_ACCESS_KEY` | 火山引擎访问密钥 | 控制台 -> API 访问密钥 |
| `VOLC_SECRET_KEY` | 火山引擎密钥 | 控制台 -> API 访问密钥 |
| `ACCOUNT_ID` | 账号ID | 控制台右上角 -> 账号管理 |
| `SPACE_NAME` | 点播空间名称 | 视频点播 -> 空间管理 |
| `PROJECT_ID` | 剪辑项目ID | 运行创建脚本后获得 |
| `GROUP_ID` | 剪辑组ID | 运行创建脚本后获得 |

#### 可选配置项

| 环境变量 | 默认值 | 说明 |
|---------|--------|------|
| `REGION` | cn-north-1 | 服务区域 |
| `UPLOAD_APP_ID` | 0 | 上传应用ID |
| `VIDEO_HOST` | https://vod.volcengineapi.com | VOD API 地址 |

### 3. 创建剪辑工程

首次使用时，需要创建剪辑工程：

```bash
cd nodejs
node scripts/createProject.js <your_space_name>
```

脚本会输出 `PROJECT_ID` 和 `GROUP_ID`，将它们添加到 `.env` 文件中。

### 4. 启动服务

```bash
# 启动后端
cd nodejs
npm run dev

# 新开终端，启动前端
cd fe
npm run dev
```

### 5. 访问应用

打开浏览器访问: http://localhost:8084

## 🔄 配置更新流程

当需要更新配置时：

1. **修改 .env 文件**
   ```bash
   vim nodejs/.env
   # 修改需要更新的配置项
   ```

2. **重启后端服务**
   ```bash
   # 方式1: 在后端服务终端按 Ctrl+C，然后重新运行 npm run dev
   
   # 方式2: 使用命令重启
   lsof -ti :3001 | xargs kill -9
   cd nodejs && npm run dev
   ```

3. **刷新前端页面**
   - 前端会自动从后端获取最新配置
   - 无需重启前端服务

## 🛡️ 安全建议

### 生产环境

1. **不要提交 .env 文件**
   - .env 文件已在 .gitignore 中
   - 仅提交 .env.example 作为模板

2. **使用服务器环境变量**
   ```bash
   # 在服务器上设置环境变量
   export VOLC_ACCESS_KEY="your_key"
   export VOLC_SECRET_KEY="your_secret"
   # ...
   ```

3. **密钥轮换**
   - 定期更换访问密钥
   - 使用 RAM 子账号，限制权限

### 开发环境

1. **个人配置**
   - 每个开发者维护自己的 .env 文件
   - 不要共享密钥

2. **测试配置**
   - 使用独立的测试账号和空间
   - 避免影响生产数据

## 📁 文件清单

### 配置相关文件

```
vevdemo/
├── nodejs/
│   ├── .env                    # 环境变量配置（不提交）
│   ├── .env.example            # 环境变量模板（提交）
│   ├── services/demo.js        # 包含 getConfig 服务
│   ├── controllers/demo.js     # 包含 getConfig 控制器
│   └── scripts/
│       ├── createProject.js    # 创建剪辑工程
│       └── listSpaces.js       # 查询空间列表
├── fe/
│   ├── index.js                # 前端入口，调用 getConfig
│   └── actions.js              # API 封装，包含 getConfig
└── CONFIG_GUIDE.md             # 本文档
```

## 🧪 测试配置

验证配置是否正确：

```bash
# 测试后端配置接口
curl http://localhost:3001/api/getConfig

# 预期输出（JSON 格式）
{
  "Result": {
    "accountId": "your_account_id",
    "spaceName": "your_space_name",
    "projectId": "your_project_id",
    "groupId": "your_group_id",
    "region": "cn-north-1",
    "uploadConfig": {
      "appId": 0,
      "region": "cn-north-1",
      "videoHost": "https://vod.volcengineapi.com"
    }
  }
}
```

## ❓ 常见问题

### Q: 修改配置后不生效？
A: 需要重启后端服务，前端刷新页面即可。

### Q: 提示找不到配置？
A: 检查 .env 文件是否存在，环境变量名是否正确。

### Q: 如何切换到不同的项目？
A: 
1. 使用 `node scripts/createProject.js <space>` 创建新项目
2. 更新 .env 文件中的 PROJECT_ID 和 GROUP_ID
3. 重启后端服务

### Q: 可以在前端直接写配置吗？
A: 不推荐。应该使用环境变量统一管理，便于维护和安全。

## 📞 技术支持

遇到问题请查看：
- [视频点播文档](https://www.volcengine.com/docs/4/)
- [项目配置信息](./PROJECT_INFO.md)

---

**更新时间**: 2025-11-16

