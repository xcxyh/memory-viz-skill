---
name: feishu-offline-voice
description: Generate Telegram and Feishu voice messages locally using Edge-TTS. No API tokens required.
---

# feishu-offline-voice 🎙️

Generate voice messages for Telegram and Feishu using Microsoft Edge-TTS. Works offline, zero cost.

## Features

- **🔒 Fully local**: No cloud API tokens (OpenAI/Google/Azure free)
- **🎯 Zero cost**: Free Edge-TTS, unlimited usage
- **🗣️ High-quality voices**: Default to zh-CN-XiaoxiaoNeural
- **📱 Multi-platform**: Supports Telegram OGG format + Feishu audio
- **🇨🇳 Chinese optimized**: Text cleaning for Chinese punctuation and Markdown

## Requirements

```bash
# Edge-TTS
pip install edge-tts

# FFmpeg (Debian/Ubuntu)
apt install ffmpeg

# FFmpeg (Amazon Linux)
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz
tar -xf ffmpeg-release-amd64-static.tar.xz
cd ffmpeg-*-amd64-static
sudo cp ffmpeg /usr/local/bin/

# Pydub (for OGG conversion on Linux servers)
pip install pydub
```

## Usage

### Telegram Voice Messages

```bash
# 1. Generate raw audio
edge-tts --voice zh-CN-XiaoxiaoNeural --rate=+5% --text "你好，这是测试" --write-media raw.mp3

# 2. Convert to Telegram OGG format (Linux/服务器友好)
python3 -c "
from pydub import AudioSegment
audio = AudioSegment.from_mp3('raw.mp3')
audio.export('voice.ogg', format='ogg', codec='libopus', parameters=['-b:a', '48k', '-ar', '48000'])
"
```

### Feishu Audio Messages

Feishu requires a two-step process for voice messages:
1. Upload audio file → get `file_key`
2. Send `audio` type message with `file_key` + `duration`

**Via OpenClaw (recommended):**
```bash
# OpenClaw auto-detects .ogg files and sends as Feishu voice
openclaw message send --channel feishu --target ou_xxx --media voice.ogg
```

**Manual API flow:**
```python
# 1. Upload audio file
file_key = upload_file(
    file_type='opus',      # Feishu uses 'opus' for audio/voice
    file_name='voice.ogg',
    duration=10000         # milliseconds
)

# 2. Send audio message
content = json.dumps({'file_key': file_key, 'duration': 10000})
send_message(
    msg_type='audio',
    content=content,
    receive_id='ou_xxx'
)
```

**Feishu audio requirements:**
- Format: OGG Opus (same as Telegram)
- Max file size: 30MB
- Duration: Must be included in upload and message

## Available Voices

```bash
edge-tts --list-voices | grep zh-CN
```

**Recommended:**
- `zh-CN-XiaoxiaoNeural` — Female, warm (default)
- `zh-CN-YunxiNeural` — Male, professional
- `zh-CN-XiaoyiNeural` — Female, youthful

## Speed Adjustment

```bash
# Speed up 5%
edge-tts --rate=+5% --text "..." --write-media out.mp3

# Slow down 10%
edge-tts --rate=-10% --text "..." --write-media out.mp3
```

## Text Cleaning

Automatically removes Markdown and special characters for cleaner TTS output.

## ⚠️ Rules

- **Maximum duration: 60 seconds** - All generated voice messages must be ≤60s
- If text is too long, split into multiple messages or summarize first
