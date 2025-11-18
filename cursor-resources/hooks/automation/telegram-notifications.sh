#!/bin/bash
# Send Telegram notifications when Cursor finishes working. Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables. Get bot token from @BotFather, get chat ID by messaging the bot and visiting https://api.telegram.org/bot<TOKEN>/getUpdates

if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
  MESSAGE="🤖 Cursor finished working at $(date '+%Y-%m-%d %H:%M:%S')"
  curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" -d "chat_id=$TELEGRAM_CHAT_ID" -d "text=$MESSAGE" -d "parse_mode=HTML" >/dev/null 2>&1 || echo "Failed to send Telegram notification"
else echo "⚠️ Telegram notification skipped: Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables"; fi
