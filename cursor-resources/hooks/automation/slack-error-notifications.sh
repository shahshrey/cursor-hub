#!/bin/bash
# Send Slack notifications when Cursor encounters long-running operations or when tools take significant time. Helps monitor productivity and catch potential issues. Requires SLACK_WEBHOOK_URL environment variable.

if [[ -n "$SLACK_WEBHOOK_URL" ]]; then echo "$(date +%s)" >~/.cursor/bash_start.tmp; fi
