#!/bin/bash
# Send Slack notifications when Cursor finishes working. Requires SLACK_WEBHOOK_URL environment variable. Get webhook URL from Slack App settings -> Incoming Webhooks.

if [[ -n "$SLACK_WEBHOOK_URL" ]]; then
  MESSAGE='{"text":"🤖 Cursor finished working at $(date '+%Y-%m-%d %H:%M:%S')"}'
  curl -s -X POST "$SLACK_WEBHOOK_URL" -H "Content-type: application/json" -d "$MESSAGE" >/dev/null 2>&1 || echo "Failed to send Slack notification"
else echo "⚠️ Slack notification skipped: Set SLACK_WEBHOOK_URL environment variable"; fi
