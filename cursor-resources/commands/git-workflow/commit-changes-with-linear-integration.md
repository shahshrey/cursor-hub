<task name="Commit Changes with Linear Integration">

<task_objective>
Analyze git changes in a monorepo and create appropriate commits with Linear ticket integration. The workflow ensures commits follow conventional commit format, include Linear ticket references, are made on feature branches (not main), exclude sensitive files, and update Linear issue status upon completion. Each commit will be in the format: `<type>(AVA-XXX): <description>`.
</task_objective>

<detailed_sequence_steps>
# Commit Changes with Linear Integration - Detailed Sequence of Steps

## Overview

You are an AI assistant creating conventional commits with Linear ticket integration in a monorepo. Key requirements:
- Never commit directly to `main`
- Always include Linear ticket number in commits
- Use conventional commit format
- Exclude sensitive files (.env)
- Update Linear issue after commits

## 1. Branch Safety Check

1. Determine the current branch:
   ```bash
   git rev-parse --abbrev-ref HEAD
   ```

2. **If on `main`**:
   
   a. Prompt the user to provide the Linear ticket number in format `AVA-XXX`
   
   b. If Linear ticket is unknown:
      - Ask user for ticket number
      - If not provided, **do nothing** and **exit** safely
   
   c. Optionally use `linear_get_issue` to get issue details if more information needed
   
   d. Create and switch to a new feature branch using Linear ticket format:
      ```bash
      git checkout -b AVA-123-add-reset-password
      ```
      Format: `AVA-XXX-description`

3. **If already on a feature branch**: Proceed to next step.

## 2. Check for Excluded Files

Files that should NEVER be staged or committed:
- `.env`
- Any other sensitive configuration files

1. Check current status:
   ```bash
   git status
   ```

2. Verify none of the excluded files are included in changes.

3. **If any excluded files are present**:
   - Inform the user immediately
   - Stop the process
   - Do not proceed with commits

## 3. Review Changes

1. Check the current state of the repository:
   ```bash
   git status
   ```

2. Review modified, added, and deleted files.

3. Identify untracked files that may need to be included.

## 4. Analyze and Plan Commits

Create a logical grouping plan for commits:

### Conventional Commit Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only
- **style**: Code formatting, no logic changes
- **refactor**: Refactoring without behavior change
- **perf**: Performance improvement
- **test**: Adding or fixing tests
- **chore**: Build process or tool updates

### Planning Criteria

For each potential commit, identify:
- **Specific files or changes** that belong together
- **Conventional commit type** and scope
- **Clear and concise description**
- **Linear ticket reference** (AVA-XXX format)

### Logical Groupings

Group changes by:
- **Feature additions**: New functionality, components, or capabilities
- **Bug fixes**: Corrections to existing functionality
- **Refactoring**: Code improvements without functional changes
- **Documentation**: README, comments, or documentation updates
- **Configuration**: Build scripts, dependencies, or environment setup
- **Tests**: New tests or test modifications
- **Styling/Formatting**: Code style, linting fixes, or formatting changes

Present this plan to the user before proceeding.

## 5. Execute Commits One by One

For **EACH** commit in the plan:

### Stage Changes

1. Show current status:
   ```bash
   git status
   ```

2. Stage ONLY the relevant files for this logical group:
   ```bash
   git add <specific-files>
   ```

3. Confirm staging:
   ```bash
   git status
   ```

### Create Commit

1. Ensure the Linear ticket number is known (prompt if needed).

2. Create commit with Linear ticket in format: `<type>(AVA-XXX): <description>`
   ```bash
   git commit -m "feat(AVA-123): add password reset endpoint" -m "Adds backend endpoint and tests" -m "Related to AVA-123"
   ```

3. Include:
   - Type and scope
   - Linear ticket in parentheses
   - Clear description (50-72 characters)
   - Optional body in additional `-m` flags
   - Optional footer with Linear reference

### Verify & Proceed

1. Confirm the commit:
   ```bash
   git status
   ```

2. Verify commit was created successfully.

3. Move to the next commit only after verifying the previous one is complete.

## 6. Update Linear Issue

After all commits are complete:

1. Use `linear_update_issue` tool to:
   - Update issue status to "Done" (or appropriate status)
   - Update issue description with summary of changes made

2. Provide details of:
   - What was implemented
   - Which files were modified
   - Any notable technical decisions

## Example Commit Sequence

```bash
# Example with 3 files: src/auth/login.js, src/auth/signup.js, README.md

# Commit 1: Feature update
git add src/auth/login.js src/auth/signup.js
git status
git commit -m "feat(AVA-123): add password reset support" -m "Includes endpoint and test coverage"
git status

# Commit 2: Documentation
git add README.md
git status
git commit -m "docs(AVA-123): document password reset flow" -m "Updates usage instructions"
git status
```

## Conventional Commit Format Reference

### Structure
```
<type>([scope]): <description>

[optional body]

[optional footer(s)]
```

### Required Elements
- **type**: Must be lowercase (feat, fix, docs, style, refactor, test, chore, perf)
- **scope**: Optional - Linear ticket (AVA-XXX) or component name
- **description**: Immediately after colon and space, short summary (50-72 characters)

### Optional Elements
- **body**: Additional context, begins one blank line after description
- **footer(s)**: References, begins one blank line after body

### Breaking Changes
Indicate with:
1. Footer: `BREAKING CHANGE: <description>`
2. Type indicator: `feat!: breaking change`

### Example Commits

```bash
# Feature with Linear ticket
git commit -m "feat(AVA-123): add JWT token validation middleware"

# Bug fix
git commit -m "fix(AVA-456): resolve avatar upload sizing issue"

# Breaking change
git commit -m "feat(AVA-789)!: send email when product is shipped"

# With body
git commit -m "refactor(AVA-234): replace admin_client with slack_admin_bot" -m "Updates architecture to use new bot pattern"

# Documentation
git commit -m "docs(AVA-567): update installation instructions"

# Tests
git commit -m "test(AVA-890): add comprehensive JWT validation tests"

# Dependencies
git commit -m "chore(AVA-111): upgrade fastapi to version 0.104.1"
```

## Important Reminders

✅ **Never mix unrelated changes** - One logical task per commit
✅ **Always verify excluded files aren't staged** - Check before every commit
✅ **Never commit directly to `main`** - Create feature branch first
✅ **Always include Linear ticket** - Format: AVA-XXX
✅ **Create feature branches from `main`** - Use Linear ticket in branch name
✅ **Use conventional commit format** - Type, scope, description
✅ **Use `linear_get_issue`** - Get issue details when needed
✅ **Use `linear_update_issue`** - Update status and description after commits

## Success Criteria

The commit workflow is complete when:
- All changes are committed in logical groups
- Each commit follows conventional format with Linear ticket
- No excluded files were committed
- All commits are on a feature branch (not main)
- Linear issue is updated with completion status and description
- Git status shows clean working directory

</detailed_sequence_steps>

</task>
