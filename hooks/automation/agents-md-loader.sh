#!/bin/bash
# Automatically loads AGENTS.md configuration file content at session start to ensure Cursor follows project-specific agent behavior. Only loads if AGENTS.md exists, otherwise passes empty context. Supports the universal AGENTS.md standard for cross-platform AI assistant compatibility.

python3 -c "import json, sys, os; agents_content = open('AGENTS.md', 'r').read() if os.path.exists('AGENTS.md') else ''; output = {'hookSpecificOutput': {'hookEventName': 'SessionStart', 'additionalContext': agents_content}}; print(json.dumps(output))"
