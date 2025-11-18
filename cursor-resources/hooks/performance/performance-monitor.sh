#!/bin/bash
# Monitor system performance during Cursor operations. Tracks CPU, memory usage, and execution time for performance optimization.

echo "$(date +%s.%N),$(ps -o %cpu= -p $$),$(ps -o rss= -p $$),$CLAUDE_TOOL_NAME,start" >>~/.cursor/performance.csv
