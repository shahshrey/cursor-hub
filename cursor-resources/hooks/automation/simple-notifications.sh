#!/bin/bash
# Send simple desktop notifications when Cursor operations complete. Works on macOS and Linux systems.

if command -v osascript >/dev/null 2>&1; then osascript -e 'display notification "Tool: $CLAUDE_TOOL_NAME completed" with title "Cursor"'; elif command -v notify-send >/dev/null 2>&1; then notify-send 'Cursor' "Tool: $CLAUDE_TOOL_NAME completed"; fi
