#!/bin/bash
# Send detailed Telegram notifications with session information when Cursor finishes. Includes working directory, session duration, and system info. Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.

if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
  echo "$(date +%s)" >~/.cursor/session_start.tmp
  PROJECT_DIR="$(basename "$(pwd)")" && MESSAGE="🚀 <b>Cursor Session Started</b>%0A📁 Project: $PROJECT_DIR%0A⏰ Time: $(date '+%H:%M:%S')%0A📅 Date: $(date '+%Y-%m-%d')"
  curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" -d "chat_id=$TELEGRAM_CHAT_ID" -d "text=$MESSAGE" -d "parse_mode=HTML" >/dev/null 2>&1
fi
