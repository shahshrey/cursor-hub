#!/bin/bash
# Send Discord notifications when Cursor finishes working. Requires DISCORD_WEBHOOK_URL environment variable. Get webhook URL from Discord Server Settings -> Integrations -> Webhooks.

if [[ -n "$DISCORD_WEBHOOK_URL" ]]; then
  MESSAGE='{"content":"🤖 Cursor finished working at $(date '+%Y-%m-%d %H:%M:%S')"}'
  curl -s -X POST "$DISCORD_WEBHOOK_URL" -H "Content-Type: application/json" -d "$MESSAGE" >/dev/null 2>&1 || echo "Failed to send Discord notification"
else echo "⚠️ Discord notification skipped: Set DISCORD_WEBHOOK_URL environment variable"; fi
