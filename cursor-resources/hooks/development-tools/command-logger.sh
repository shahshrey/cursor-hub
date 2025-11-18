#!/bin/bash
# Log all Cursor commands to a file for audit and debugging purposes. Simple logging that records tool usage with timestamps.

echo "[$(date)] Tool: $CLAUDE_TOOL_NAME | File: $CLAUDE_TOOL_FILE_PATH" >>~/.cursor/command-log.txt
