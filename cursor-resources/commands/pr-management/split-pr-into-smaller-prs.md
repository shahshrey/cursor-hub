<task name="Split PR into Smaller PRs">

<task_objective>
Decompose large PRs into smaller, reviewable chunks by analyzing the commit range, detecting dependencies, creating optimal PR structures, and automating GitHub PR creation with AI-generated summaries. The output will be multiple GitHub PRs (ideally 1200 lines each, maximum 2000 lines) with proper dependency chains, Linear ticket integration, and comprehensive PR descriptions. Each PR will be named using Linear ticket format: `proj-XYZ-N-short-description`.
</task_objective>

<how_to_ask_followup_question>
<question>I've created a decomposition plan with X PRs. Would you like me to proceed with creating these PRs on GitHub?</question>
<options>["Yes, create the PRs", "Let me review the plan first", "I'd like to adjust the groupings"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Split PR into Smaller PRs - Detailed Sequence of Steps

## Overview

This is an interactive agent-driven workflow for decomposing large PRs into smaller, reviewable chunks using GitHub MCP tools and intelligent analysis.

**Key Principles:**
1. **Backend-First Deployment**: Database → Services → API → Frontend
2. **Optimal Size**: Ideally 1200 lines per PR (maximum 2000 lines - split further if exceeded)
3. **Tests Must Pass**: Every PR must have passing tests - include all dependencies needed
4. **Tests Included**: Tests MUST be in the same PR as the code they test - never separate
5. **Backwards Compatibility**: Every PR independently deployable
6. **Pre-commit Hooks**: Fix issues, include dependencies; after 3 failures, request guidance

## Required Information from User

You need to provide:
1. **First commit SHA**: The first commit in your PR (exclusive - not included)
2. **Last commit SHA**: The last commit in your PR (inclusive)
3. **Linear ticket number**: Format `proj-[0-9]+` (e.g., proj-929)

**Branch Naming Convention**: `proj-XYZ-N-short-description`
- Example: `proj-929-1-database`, `proj-929-2-backend-services`

## 1. Update Main Branch (Critical First Step)

⚠️ **IMPORTANT**: Always start with updated main branch to prevent merge conflicts.

1. Checkout main branch:
   ```bash
   git checkout main
   ```

2. Pull latest changes from origin:
   ```bash
   git pull origin main
   ```

3. Verify main is up to date.

**Why this matters**: Your decomposition will be integrated into main, so starting with the latest version prevents conflicts and ensures compatibility.

## 2. Gather PR Boundaries & Create Working State

1. Validate the commit range provided by user:
   - First commit SHA (exclusive)
   - Last commit SHA (inclusive)

2. Create a working branch with ALL changes:
```bash
   git checkout -b temp-decompose main
   git diff <first-commit>..<last-commit> | git apply
   ```

3. Execute all analysis operations in parallel for maximum efficiency:
   ```bash
git diff --stat <first-commit>..<last-commit> &
git diff <first-commit>..<last-commit> > full-changes.diff &
git log --oneline <first-commit>..<last-commit> &
git diff --name-only <first-commit>..<last-commit> | head -20 &
   wait
   ```

4. Analyze the complete diff as a whole with focus on:
   - **Coupling detection**: Files that break builds if separated
   - **Deployment boundaries**: Database → backend → frontend order
   - **Size optimization**: Target 1200 lines per PR (max 2000)

## 3. Dependency Detection & Test Requirements

Automatically detect dependencies based on:

### Deployment Order Priority

**Priority 1: Database migrations + ORM models (tightly coupled)**
  - Database migrations and ORM models MUST be in the same PR
  - These are tightly coupled - migrations without ORM updates are incomplete
  - ORM changes without migrations can break the application
  - This ensures database schema and code models stay synchronized

**Priority 2: Backend services (depends on ORM models)**

**Priority 3: API controllers (depends on services)**

**Priority 4: Frontend API clients (depends on API)**

**Priority 5: Frontend state (depends on API client)**

**Priority 6: UI components (depends on state)**

**Priority 10: Docs (independent)**

### Test Dependencies

  - Tests MUST be included in the same PR as the code they test
  - If tests import from other modules, those modules must be in the PR
  - Mock dependencies should be minimized
  - Each PR should run pytest successfully
  - Frontend PRs should pass npm test
  - NEVER create separate test-only PRs - tests go with their code

## 4. Test-Driven Decomposition Analysis

Before creating the plan, verify test dependencies:

1. Check which tests depend on which modules:
   ```bash
   grep -r "from your_api" tests/ | grep -E "(feature1|feature2|feature3)"
   ```

2. Verify import chains:
```bash
python -c "import ast; ..." # Parse imports to understand dependencies
   ```

3. Run tests to identify what breaks when modules are missing:
   ```bash
pytest tests/specific_module/ -v
   ```

4. **Critical**: Ensure each PR can pass tests independently.
   - If tests fail, include ALL necessary dependencies in that PR
   - NEVER skip tests with --no-verify

## 5. Strategy Selection

Choose the optimal strategy:

**PARALLEL**: For independent changes (fastest review)
- Changes don't depend on each other
- Can be merged in any order
- Enables concurrent reviews

**STACKED**: For dependent features (clear chain)
- Changes have dependencies
- Must merge in specific order
- Clear dependency chain

**HYBRID**: Mix of both (recommended default)
- Some changes independent
- Some changes dependent
- Optimizes for speed and safety

## 6. Interactive Plan Review

Present a decomposition plan to the user:

```
📊 Proposed PR Decomposition:

PR 1: Database Infrastructure + ORM Models (650 lines)
  ├─ Independent - Can merge anytime
  └─ Files: migrations/*.sql, orm.py, models/*.py
  └─ Note: Database migrations and ORM MUST be together

PR 2: Backend Services (1,200 lines)
  ├─ Depends on: PR 1
  └─ Files: services/*.py, business logic

PR 3: API Layer (980 lines)
  ├─ Depends on: PR 2
  └─ Files: controllers/*.py, routers.py

PR 4: Frontend (1,400 lines) - NEEDS SPLIT
  ├─ PR 4a: State Management + tests (720 lines)
  └─ PR 4b: UI Components + tests (720 lines)

Total: 4 PRs, ~4,270 lines
Note: Tests are ALWAYS included with their respective code PRs
Note: Database + ORM are atomic - never split them
```

Ask user for approval before proceeding.

## 7. Branch and PR Creation with GitHub Integration

Upon user approval, execute comprehensive PR creation:

### Extract Logical Groups

For each PR:

1. Create branch from main:
   ```bash
   git checkout -b proj-929-1-database main
   ```

2. Get all changes from temp branch:
   ```bash
   git checkout temp-decompose -- .
   ```

3. Reset to unstage everything:
   ```bash
   git reset HEAD
   ```

4. Selectively stage only relevant files:
   ```bash
   git add migrations/*.sql
   git add **/orm.py
   git add **/models.py
   ```

5. Commit as a logical unit:
   ```bash
   git commit -m "feat(database): add feature settings infrastructure"
   ```

### Verify Tests Before Committing

**For Python changes:**
   ```bash
   cd libs/python/your-api
   poetry run pytest tests/relevant_module/ -v
```

**For frontend changes:**
```bash
   cd services/your-web
   npm test
```

**If tests fail:**
- Include minimal additional dependencies
- Fix any code issues
- Re-run tests

### Pre-commit Hook Execution

1. Run commit with pre-commit hooks enabled (default):
   ```bash
   git commit -m "feat(component): description"
   ```

2. When pre-commit hooks report issues:
   - Fix linting and formatting issues identified
   - Include dependencies required for tests to pass
   - Correct any code issues found by hooks
   - Re-run the commit command

3. After 3 unsuccessful attempts:
   - Request user guidance with specific error details
   - Provide exact test failures or linting issues
   - Suggest potential solutions based on errors

**Pre-commit hooks ensure code quality by:**
- Running tests to verify functionality
- Checking code formatting consistency
- Validating linting rules
- Ensuring type safety where applicable

### Create Clean, Logical Commits

Format commit messages with ticket number:
   ```bash
   git commit -m "feat(database): [PROJ-929] add feature settings infrastructure"
```

Organize commits by logical functionality that form complete features.

### Push Branches

Use consistent branch naming format:
   ```bash
   git push origin proj-929-1-database
git push origin proj-929-2-backend-services
   ```

### Generate PR Summaries and Create GitHub PRs

1. For each branch, generate AI-powered summary:
   ```bash
   git checkout proj-929-1-database
   git fetch origin main
   git diff origin/main...HEAD --stat | cat
   git diff origin/main...HEAD | cat
   ```

2. Use the `@generate-pr-summary.md` workflow to create comprehensive description.

3. Use GitHub MCP tools to:
   - Auto-detect repository owner and name from git remote
   - Generate AI-powered summaries for each branch
   - Create all PRs in parallel for maximum efficiency
   - Include in each PR:
     * Title format: `[AVA-929] [X/Y] Component Description`
     * Comprehensive AI-generated body with:
       - Summary of changes
       - Linear ticket link
       - Dependencies and merge order
       - Testing recommendations
       - Deployment notes
     * Proper base branch (main or previous PR for stacked)
     * Draft status for initial review
   - Return links to all created PRs with GitHub URLs

### Set Up PR Dependencies

For stacked PRs, automatically update PR base branches:
- PR 2 will have base set to `proj-929-1-database` instead of `main`
- Creates clear dependency chain

### Clean Up Temporary Branches

```bash
git branch -D temp-working temp-decompose 2>/dev/null || true
```

## 8. Automated PR Body Generation

Each PR will automatically receive a comprehensive body:

```markdown
## 🎯 Linear Ticket
[AVA-929](https://linear.app/ava/issue/AVA-929)

## 📊 PR Position
This is PR **1 of 5** in the decomposition series.

## 🔗 Dependencies
- **Depends on**: None (can merge independently)
- **Blocks**: PR #2 (Backend Services)

## 📝 AI-Generated Summary
<!-- Generated using @generate-pr-summary.md workflow -->

### PR Purpose
This PR introduces database infrastructure for meeting avatar settings.

### Key Changes
- Adds migration for new table structure
- Updates ORM models with MeetingAvatarSettings class
- Implements database constraints for data integrity
- Adds support for multiple bot sessions per meeting URL

### Areas for Reviewer Attention
- Review migration rollback strategy
- Check index performance implications
- Validate foreign key constraints
- Consider NULL meeting_id implications

### Testing
- Migration tested on local database
- Rollback procedure verified
- Performance benchmarked with 100k records

## ✅ Merge Checklist
- [ ] Code review approved
- [ ] CI/CD checks passing
- [ ] Migration reviewed by database team
- [ ] No conflicts with main branch

## 🚀 Deployment Notes
This PR can be deployed independently. Database migration runs automatically.
No feature flags required - infrastructure-only.
```

## 9. Conflict Prediction

Analyze and warn about potential conflicts:

```
⚠️ Potential Conflicts Detected:

PR 2 and PR 3 both modify: services/auth.py
  → Suggestion: Combine into single PR or use feature flags

PR 4a and PR 4b share imports in: components/index.ts
  → Suggestion: Create shared types PR first
```

## 10. Final Summary

Provide complete summary with clear, structured information:

```
✅ PR Decomposition Complete for AVA-929!

Created GitHub PRs:
  #101: [AVA-929] [1/6] Database Infrastructure - Independent ✓
        https://github.com/vivuninc/ava-module-monorepo/pull/101

  #102: [AVA-929] [2/6] Backend Services - Depends on #101 ✓
        https://github.com/vivuninc/ava-module-monorepo/pull/102

  #103: [AVA-929] [3/6] API Layer - Depends on #102 ✓
        https://github.com/vivuninc/ava-module-monorepo/pull/103

Linear Ticket: https://linear.app/ava/issue/AVA-929

Merge Order:
  Parallel: #101 (can merge anytime)
  Sequential: #102 → #103

All PRs created as drafts with AI-generated summaries.
Convert to "Ready for Review" when ready.

Next Steps:
  1. Review AI-generated summaries in each PR
  2. Convert drafts to ready status
  3. Request reviews from appropriate teams
  4. Merge in dependency order
  5. Deploy with confidence!
```

## Agent Commands Reference

### Starting Decomposition
- "Decompose my PR from [first-sha] to [last-sha] for proj-929"
- "Break down commits between abc123 and xyz789 for ticket proj-1234"

### Strategy Control
- "Use parallel strategy"
- "Use stacked strategy"
- "Use hybrid strategy" (default)

### Refinement
- "Split PR 3 further"
- "Combine PR 2 and 3"

### Information
- "Show dependencies"
- "Check for conflicts"
- "Show merge order"

### Execution
- "Create the PRs"
- "Update PR descriptions"

## Error Resolution Strategies

**Cherry-pick conflicts:**
- Apply automatic resolution using git merge strategies
- Provide clear merge instructions when automatic resolution fails

**Size violations (>2000 lines):**
- Create additional smaller PRs
- Split along feature boundaries or architectural layers

**Circular dependencies:**
- Extract shared interfaces
- Create separate foundational PR

**Push failures:**
- Verify GitHub authentication
- Check branch protection rules
- Provide resolution commands

**Test failures:**
- Include minimal necessary dependencies
- Implement general-purpose solutions
- Explain unreasonable requirements and suggest alternatives

## Success Metrics

Track effectiveness:
- **Review Time**: Should decrease 50%+ (target: < 2 hours)
- **PR Size**: Ideally 1200 lines (maximum 2000)
- **Review Iterations**: Fewer rounds of feedback
- **Merge Conflicts**: < 5% of PRs
- **Deployment Failures**: 0% from decomposed PRs
- **Developer Satisfaction**: Improved through focused PRs

## Success Criteria

PR decomposition is complete when:
- All changes from commit range are included in PRs
- Each PR is properly sized (≤2000 lines, ideally ~1200)
- Dependencies are clearly identified and documented
- All PRs created on GitHub with comprehensive descriptions
- Tests pass for each PR independently
- Linear ticket integration is complete
- Merge order is clearly documented
- User has GitHub URLs for all created PRs

</detailed_sequence_steps>

</task>
