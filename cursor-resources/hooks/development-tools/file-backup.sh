#!/bin/bash
# Automatically backup files before editing. Creates timestamped backups in a .backups directory when files are modified.

if [[ -n "$CLAUDE_TOOL_FILE_PATH" && -f "$CLAUDE_TOOL_FILE_PATH" ]]; then mkdir -p .backups && cp "$CLAUDE_TOOL_FILE_PATH" ".backups/$(basename "$CLAUDE_TOOL_FILE_PATH").$(date +%Y%m%d_%H%M%S).bak"; fi
