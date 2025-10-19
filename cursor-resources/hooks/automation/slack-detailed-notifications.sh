#!/bin/bash
# Send detailed Slack notifications with session information when Cursor finishes. Includes working directory, session duration, and system info. Requires SLACK_WEBHOOK_URL environment variable.

if [[ -n "$SLACK_WEBHOOK_URL" ]]; then
  echo "$(date +%s)" >~/.cursor/session_start.tmp
  PROJECT_DIR="$(basename "$(pwd)")"
  MESSAGE='{"blocks":[{"type":"header","text":{"type":"plain_text","text":"🚀 Cursor Session Started"}},{"type":"section","fields":[{"type":"mrkdwn","text":"*📁 Project:*\n'"$PROJECT_DIR"'"},{"type":"mrkdwn","text":"*⏰ Time:*\n'"$(date '+%H:%M:%S')"'"},{"type":"mrkdwn","text":"*📅 Date:*\n'"$(date '+%Y-%m-%d')"'"}]}]}'
  curl -s -X POST "$SLACK_WEBHOOK_URL" -H "Content-type: application/json" -d "$MESSAGE" >/dev/null 2>&1
fi
