#!/bin/bash
# Prevent direct pushes to protected branches (main, develop). Blocks git push commands targeting main or develop branches to enforce Git Flow workflow. Requires using feature/release/hotfix branches and pull requests instead of direct commits to protected branches.

python3 "$CLAUDE_PROJECT_DIR"/.cursor/hooks/prevent-direct-push.py
