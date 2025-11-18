#!/bin/bash
# Send Telegram notifications when Cursor encounters long-running operations or when tools take significant time. Helps monitor productivity and catch potential issues. Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.

if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then echo "$(date +%s)" >~/.cursor/bash_start.tmp; fi
