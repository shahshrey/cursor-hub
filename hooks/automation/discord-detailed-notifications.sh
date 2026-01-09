#!/bin/bash
# Send detailed Discord notifications with session information when Cursor finishes. Includes working directory, session duration, and system info with rich embeds. Requires DISCORD_WEBHOOK_URL environment variable.

if [[ -n "$DISCORD_WEBHOOK_URL" ]]; then
  echo "$(date +%s)" >~/.cursor/session_start.tmp
  PROJECT_DIR="$(basename "$(pwd)")"
  MESSAGE='{"embeds":[{"title":"🚀 Cursor Session Started","color":3447003,"fields":[{"name":"📁 Project","value":"'"$PROJECT_DIR"'","inline":true},{"name":"⏰ Time","value":"'"$(date '+%H:%M:%S')"'","inline":true},{"name":"📅 Date","value":"'"$(date '+%Y-%m-%d')"'","inline":true}],"timestamp":"'"$(date -u +%Y-%m-%dT%H:%M:%S.000Z)"'"}]}'
  curl -s -X POST "$DISCORD_WEBHOOK_URL" -H "Content-Type: application/json" -d "$MESSAGE" >/dev/null 2>&1
fi
