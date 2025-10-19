#!/bin/bash
# Track file changes in a simple log. Records which files were modified and when for easy tracking of Cursor activity.

echo "[$(date '+%Y-%m-%d %H:%M:%S')] File modified: $CLAUDE_TOOL_FILE_PATH" >>~/.cursor/changes.log
