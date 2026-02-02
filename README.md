# Memory Viz Skill

街溜子的记忆可视化工具，提供 Web 界面查看记忆文件。

## 功能

- 📊 实时统计记忆文件（数量、字数、大小）
- 📝 查看 Markdown 和 JSON 文件内容
- 🔄 自动刷新（每 30 秒）
- 🎨 深色渐变界面
- 📑 支持 Memory 和 Clawd Core Files 双 tab

## 安装

### 一键安装

```bash
bash <(curl -sL https://raw.githubusercontent.com/xcxyh/memory-viz-skill/main/install.sh)
```

### 手动安装

```bash
cd ~/.clawdbot/skills
git clone https://github.com/xcxyh/memory-viz-skill.git
cd memory-viz-skill
npm install
```

## 使用

```bash
# 启动服务
bash scripts/start.sh

# 查看状态
bash scripts/status.sh

# 停止服务
bash scripts/stop.sh
```

访问：http://localhost:3001

## 项目结构

```
memory-viz-skill/
├── index.html       # 前端界面
├── server.js        # 后端 API 服务器
├── package.json     # Node.js 依赖
├── scripts/
│   ├── start.sh     # 启动脚本
│   ├── stop.sh      # 停止脚本
│   └── status.sh    # 状态检查
├── install.sh       # 一键安装脚本
├── SKILL.md         # Skill 说明文档
└── .gitignore       # 忽略 node_modules
```

## 依赖

- express
- cors
