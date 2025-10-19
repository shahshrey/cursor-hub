#!/bin/bash
# Validate Git Flow branch naming conventions before checkout. Ensures branches follow the pattern: feature/*, release/v*.*.*, hotfix/*. Prevents creation of branches that don't follow Git Flow standards.

python3 "$CLAUDE_PROJECT_DIR"/.cursor/hooks/validate-branch-name.py
