# 更新日志

## [2.0.1] - 2025-11-16

### 🏷️ 项目重命名

#### 更名
- **项目名称**: VevDemo → **Volcano VideoCut**
- **文件夹名**: vevdemo → **volcano-videocut**
- **包名称**: 
  - 根目录: volcano-videocut
  - 前端: volcano-videocut-frontend
  - 后端: volcano-videocut-backend

#### 更新
- ✅ 更新所有 package.json 文件
- ✅ 更新 README.md
- ✅ 更新 CONFIG_GUIDE.md
- ✅ 统一项目命名

---

## [2.0.0] - 2025-11-16

### 🎯 重大改进：环境变量重构

将所有硬编码配置迁移到环境变量管理，提升可维护性和安全性。

### ✨ 新增功能

#### 后端

- **新增 API**: `GET /api/getConfig` - 提供配置给前端
- **新增服务**: `getConfig()` - 从环境变量读取配置
- **新增文件**: `.env.example` - 环境变量模板
- **新增脚本**: 
  - `scripts/createProject.js` - 创建剪辑工程
  - `scripts/listSpaces.js` - 查询空间列表

#### 前端

- **动态配置**: 启动时自动从后端获取配置
- **新增函数**: `getConfig()` - 获取配置 API
- **优化上传**: 从配置中获取账号、区域等信息

#### 文档

- **新增**: `README.md` - 项目总览
- **新增**: `CONFIG_GUIDE.md` - 详细配置指南
- **新增**: `CHANGELOG.md` - 本文件
- **更新**: `PROJECT_INFO.md` - 添加配置管理说明

### 🔧 配置项迁移

从硬编码迁移到环境变量的配置项：

| 配置项 | 原位置 | 新位置 |
|--------|--------|--------|
| accountId | `fe/actions.js` | `nodejs/.env` |
| spaceName | 前端硬编码 | `nodejs/.env` |
| projectId | `fe/index.js` | `nodejs/.env` |
| groupId | `fe/index.js` | `nodejs/.env` |
| region | 前端硬编码 | `nodejs/.env` |
| appId | 前端硬编码 | `nodejs/.env` |
| videoHost | 前端硬编码 | `nodejs/.env` |

### 📋 环境变量列表

```bash
# 密钥配置
VOLC_ACCESS_KEY
VOLC_SECRET_KEY

# 业务配置
ACCOUNT_ID
SPACE_NAME
PROJECT_ID
GROUP_ID
REGION

# 上传配置
UPLOAD_APP_ID
VIDEO_HOST
```

### 🏗️ 架构改进

#### 之前的架构
```
前端硬编码配置 → 直接使用
```

#### 现在的架构
```
.env 文件 → 后端服务 → API (/api/getConfig) → 前端动态获取
```

### 🎯 优势

1. **集中管理**: 所有配置在一个地方管理
2. **环境隔离**: 开发/测试/生产环境配置分离
3. **安全性**: 敏感信息不再硬编码
4. **灵活性**: 修改配置无需重新构建前端
5. **可维护性**: 配置清晰，易于理解和修改
6. **团队协作**: 每个开发者维护自己的 .env 文件

### 🔄 迁移步骤

如果您是从旧版本升级：

1. **创建 .env 文件**
   ```bash
   cd nodejs
   cp .env.example .env
   ```

2. **填写配置**
   - 将原来硬编码的值填入 .env
   - 确保所有必需字段已填写

3. **删除硬编码**
   - 前端代码会自动从 API 获取配置
   - 无需手动修改前端代码

4. **重启服务**
   ```bash
   # 重启后端
   cd nodejs && npm run dev
   
   # 刷新前端页面
   ```

### 📝 配置示例

```bash
# nodejs/.env
VOLC_ACCESS_KEY="AKLT..."
VOLC_SECRET_KEY="base64..."
ACCOUNT_ID="2110780953"
SPACE_NAME="space4s4ms6"
PROJECT_ID="p028c00d4cltjmkqidfl3t026pg"
GROUP_ID="g021300d3btskrnpve7vei43170"
REGION="cn-north-1"
UPLOAD_APP_ID="0"
VIDEO_HOST="https://vod.volcengineapi.com"
```

### 🐛 Bug 修复

- 修复 DescribeProject API 参数格式问题（ProjectId 需要数组格式）
- 修复前端白屏问题（缺少必需配置）
- 修复上传失败问题（账号ID不正确）

### 📚 文档改进

- 新增完整的 README
- 新增配置指南
- 新增辅助脚本说明
- 更新项目信息文档

### 🔒 安全改进

- ✅ .env 文件已添加到 .gitignore
- ✅ 提供 .env.example 作为模板
- ✅ 文档中添加安全建议
- ✅ 敏感信息不再出现在代码中

### ⚡ 性能优化

- 前端初始化时并发获取配置和 token
- 减少硬编码，提升代码可读性

### 🎓 最佳实践

- 遵循 12-Factor App 配置管理原则
- 环境变量统一管理
- 前后端配置分离
- 提供完整的文档和示例

---

## [1.0.0] - 初始版本

- 基础的视频剪辑功能
- 前后端示例代码
- 硬编码配置

---

**维护者**: VevDemo Team
**更新日期**: 2025-11-16

