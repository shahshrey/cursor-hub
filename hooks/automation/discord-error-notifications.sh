#!/bin/bash
# Send Discord notifications when Cursor encounters long-running operations or when tools take significant time. Helps monitor productivity and catch potential issues with rich embeds. Requires DISCORD_WEBHOOK_URL environment variable.

if [[ -n "$DISCORD_WEBHOOK_URL" ]]; then echo "$(date +%s)" >~/.cursor/bash_start.tmp; fi
