#!/bin/bash

# Memory Viz Skill - 一键安装脚本
# 使用方法: bash <(curl -sL https://raw.githubusercontent.com/xcxyh/memory-viz-skill/main/install.sh)

set -e

echo "🐶 Memory Viz Skill 安装程序"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

SKILL_NAME="memory-viz"
REPO_URL="https://github.com/xcxyh/memory-viz-skill"
INSTALL_DIR="$HOME/.clawdbot/skills/$SKILL_NAME"
TEMP_DIR="/tmp/memory-viz-install-$$"

echo "📋 系统信息:"
echo "   OS: $(uname -s)"
echo "   ARCH: $(uname -m)"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未找到 Node.js"
    echo "   请先安装 Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js: $(node -v)"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 错误：未找到 npm"
    exit 1
fi

echo "✅ npm: $(npm -v)"
echo ""

# 从 GitHub 下载
echo "⬇️  从 GitHub 下载..."
mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR"
curl -fsSL "$REPO_URL/archive/main.tar.gz" | tar -xz --strip-components=1

# 创建安装目录
echo "📁 安装目录: $INSTALL_DIR"
mkdir -p "$INSTALL_DIR"

# 复制文件
echo "📦 安装文件..."
cp -r "$TEMP_DIR"/* "$INSTALL_DIR/"

# 安装依赖
echo "📥 安装依赖..."
cd "$INSTALL_DIR"
npm install

# 清理临时文件
rm -rf "$TEMP_DIR"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 安装完成！"
echo ""
echo "📁 安装位置: $INSTALL_DIR"
echo ""
echo "启动方式:"
echo "  bash $INSTALL_DIR/scripts/start.sh"
echo ""
echo "访问地址: http://localhost:3001"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
