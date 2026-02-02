const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const MEMORY_DIR = '/root/clawd/memory';
const WWW_DIR = '/root/clawd/www/memory-viz';

app.use(cors());
app.use(express.json());

// 提供静态文件
app.use(express.static(WWW_DIR));

// 根路径重定向到 index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(WWW_DIR, 'index.html'));
});

// 读取记忆目录
app.get('/api/memory', async (req, res) => {
    try {
        const files = await fs.readdir(MEMORY_DIR);
        const memoryFiles = [];

        for (const file of files) {
            const filePath = path.join(MEMORY_DIR, file);
            const stats = await fs.stat(filePath);

            if (stats.isFile() && (file.endsWith('.md') || file.endsWith('.json'))) {
                const content = await fs.readFile(filePath, 'utf-8');
                memoryFiles.push({
                    name: file,
                    type: file.endsWith('.json') ? 'json' : 'markdown',
                    size: stats.size,
                    modified: stats.mtime,
                    content: content
                });
            }
        }

        // 按修改时间排序
        memoryFiles.sort((a, b) => b.modified - a.modified);

        res.json({ success: true, files: memoryFiles });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 读取单个文件
app.get('/api/memory/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(MEMORY_DIR, filename);

        const content = await fs.readFile(filePath, 'utf-8');
        const stats = await fs.stat(filePath);

        res.json({
            success: true,
            file: {
                name: filename,
                type: filename.endsWith('.json') ? 'json' : 'markdown',
                size: stats.size,
                modified: stats.mtime,
                content: content
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 读取 MEMORY.md
app.get('/api/memory-main', async (req, res) => {
    try {
        const memoryPath = '/root/clawd/MEMORY.md';
        const content = await fs.readFile(memoryPath, 'utf-8');
        const stats = await fs.stat(memoryPath);

        res.json({
            success: true,
            file: {
                name: 'MEMORY.md',
                type: 'markdown',
                size: stats.size,
                modified: stats.mtime,
                content: content
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Memory API server running on port ${PORT} (0.0.0.0)`);
});
