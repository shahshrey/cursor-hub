#!/bin/bash
# Enforce conventional commit message format for all git commits. Validates commit messages follow the pattern: type(scope): description. Supported types: feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert. Ensures consistent commit history for changelog generation and semantic versioning.

python3 "$CLAUDE_PROJECT_DIR"/.cursor/hooks/conventional-commits.py
