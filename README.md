# My Custom Skills

自定义技能集合 - 为 Clawdbot / Claude AI 提供扩展功能的技能库。

## 简介

本项目包含多个自定义技能，用于扩展 AI 助手的能力，包括记忆可视化、网络搜索、图片生成和视频生成等功能。

## 技能列表

### 🧠 Memory Viz

街溜子记忆可视化插件 - 一个优雅的 Web 界面，用于查看和管理 AI 的记忆文件。

**功能特性：**
- 📁 文件浏览 - 查看 memory 目录下的所有文件
- 📝 内容预览 - 支持 Markdown 和 JSON 格式
- ✏️ 文件编辑 - 可编辑核心配置文件
- 🎨 优雅界面 - 深色主题
- 🔄 实时更新 - 自动刷新显示最新修改时间

**技术栈：** Node.js + Express + HTML5 + Tailwind CSS

**访问地址：** http://localhost:3001

---

### 🔍 Web Search

使用火山引擎融合信息搜索 API 进行网络搜索，支持网页搜索、图片搜索和 AI 总结搜索。

**搜索类型：**
- **Web 搜索** - 返回网页标题、摘要、链接
- **Web 总结搜索** - 提供 AI 总结的搜索结果
- **图片搜索** - 返回图片信息

**API：** https://open.feedcoopapi.com/search_api/web_search

---

### 🖼️ Image Generate

使用内置 Python 脚本生成图片。

**使用方法：**
```bash
python scripts/image_generate.py "一只可爱的猫"
```

**认证：** 支持通过环境变量配置 `MODEL_IMAGE_API_KEY` 或 `ARK_API_KEY`

---

### 🎬 Video Generate

使用 Python 脚本生成视频，支持通过首帧图片控制视频起始画面。

**使用方法：**
```bash
# 纯文本生成
python scripts/video_generate.py "cat.mp4" "一只可爱的猫"

# 带首帧图片生成
python scripts/video_generate.py "dog_run.mp4" "一只小狗在草地上奔跑" "https://example.com/dog_start.png"
```

**认证：** 支持通过环境变量配置 `MODEL_VIDEO_API_KEY` 或 `ARK_API_KEY`

---

## 目录结构

```
my-custom-skills/
├── memory-viz/              # 记忆可视化插件
│   ├── SKILL.md            # 技能说明
│   ├── README.md           # 详细文档
│   ├── scripts/            # 启动/停止脚本
│   └── assets/www/         # Web 界面
├── web-search/             # 网络搜索技能
│   ├── SKILL.md            # 技能说明
│   └── scripts/            # Python 脚本
├── image-generate/         # 图片生成技能
│   ├── SKILL.md            # 技能说明
│   └── scripts/            # Python 脚本
└── video-generate/         # 视频生成技能
    ├── SKILL.md            # 技能说明
    └── scripts/            # Python 脚本
```

## 环境要求

### Memory Viz
- Node.js >= 14
- npm 或 yarn

### 其他技能
- Python >= 3.8
- 相关 API Key 配置

## 快速开始

### Memory Viz

```bash
# 启动服务
cd memory-viz
bash scripts/start.sh

# 访问
# http://localhost:3001
```

### Web Search

配置 API Key 后即可使用，无需额外启动。

### Image Generate / Video Generate

```bash
cd image-generate  # 或 video-generate
python scripts/image_generate.py "prompt"
```

## 配置说明

大多数技能需要配置相应的 API Key：

- **Web Search:** 火山引擎融合信息搜索 API Key
- **Image Generate:** `MODEL_IMAGE_API_KEY` 或 `ARK_API_KEY`
- **Video Generate:** `MODEL_VIDEO_API_KEY` 或 `ARK_API_KEY`

## 许可证

MIT License
