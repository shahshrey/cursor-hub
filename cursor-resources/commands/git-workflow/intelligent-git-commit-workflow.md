<task name="Intelligent Git Commit Workflow">

<task_objective>
Examine git diffs, logically group changes into cohesive commits, and handle the iterative cycles of linting and testing that occur after each commit. The workflow creates atomic commits using conventional commit format while managing pre-commit hooks (autoflake, isort, black, pytest) and distinguishing between code-related and infrastructure-related test failures. Each commit represents a single, complete change with proper formatting and quality validation.
</task_objective>

<detailed_sequence_steps>
# Intelligent Git Commit Workflow - Detailed Sequence of Steps

## Overview

This workflow provides a systematic approach to create clean, logical, and professional git history while handling automated tooling and testing feedback loops in modern development environments.

## Phase 1: Diff Analysis and Logical Grouping

### 1. Examine Current Changes

1. Check overall state:
   ```bash
   git status
   ```

2. Get statistical overview:
   ```bash
   git diff --cached --stat
   git diff --stat
   ```

3. See detailed changes:
   ```bash
   git diff --cached
   git diff
   ```

4. Analyze changes to understand scope and nature of modifications.

5. Identify logical boundaries between different tasks or features.

### 2. Group Changes by Logical Tasks

Categorize changes into these logical groups:

**Feature Additions:**
- New functionality, components, or capabilities
- New user-facing features

**Bug Fixes:**
- Corrections to existing functionality
- Resolving reported issues

**Refactoring:**
- Code improvements without functional changes
- Architecture improvements

**Documentation:**
- README, comments, or documentation updates
- API documentation

**Configuration:**
- Build scripts, dependencies, or environment setup
- CI/CD configuration

**Tests:**
- New tests or test modifications
- Test infrastructure

**Styling/Formatting:**
- Code style, linting fixes, or formatting changes
- Cosmetic improvements

### 3. Plan Commit Sequence

1. Order commits logically:
   - Core changes before dependent changes
   - Infrastructure before features
   - Database changes before application code

2. Ensure each commit represents a single, cohesive task.

3. Prepare conventional commit messages for each group.

4. Consider that related untracked files may be logically grouped with staged changes.

## Phase 2: Iterative Commit Process

For each logical group of changes:

### 1. Stage the Changes

Choose appropriate staging approach:

**For specific files:**
```bash
git add [specific files for this logical group]
```

**For all changes including untracked files if logically related:**
```bash
git add -A
```

### 2. Create Initial Commit

**Commit Message Format:**
```
<type>([optional scope]): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature for the user
- `fix`: A bug fix
- `refactor`: Code changes that neither fix a bug nor add a feature
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons)
- `test`: Adding or modifying tests
- `chore`: Changes to build process, auxiliary tools, or libraries
- `build`: Changes to build system or external dependencies
- `ci`: Continuous integration changes
- `perf`: Performance improvements

**Requirements:**
- Keep description concise but descriptive (50-72 characters)
- Add body if needed to explain the "why" behind the change
- Use imperative mood ("add feature" not "added feature")

### 3. Handle Post-Commit Linting

**If linting (flake8, black, isort) makes changes:**

1. Review the linting changes to ensure they're appropriate.

2. Stage the linting changes:
   ```bash
   git add .
   # or
   git add -A
   ```

3. Amend the commit:
   ```bash
   git commit --amend --no-edit
   ```

**If linting fails with errors requiring manual fixes:**

1. Fix the linting errors manually.

2. Stage the fixes:
   ```bash
   git add [fixed files]
   ```

3. Amend the commit:
   ```bash
   git commit --amend --no-edit
   ```

### 4. Handle Post-Commit Testing

**For Poetry Monorepos:**

Use project-specific test commands:

1. Check for dedicated test scripts:
   ```bash
   ls scripts/run-pytests.sh
   ```

2. Use Poetry with specific module paths:
   ```bash
   poetry -C libs/python/[module-name] run pytest . -x --tb=short
   ```

3. Or use the project's test script:
   ```bash
   ./scripts/run-pytests.sh
   ```

**Analyze Test Failures:**

**Code-related failures:**
- Fix the code
- Stage fixes
- Amend commit:
  ```bash
  git add [fixed files]
  git commit --amend --no-edit
  ```

**Infrastructure failures:**
- Database connection issues
- External services unavailable
- Environment configuration problems

For infrastructure failures not related to code changes:
```bash
git commit --no-verify -m "your commit message"
```

**New test requirements:**
- Create new tests in separate commit
- Don't mix test creation with feature code

### 5. Repeat for Next Logical Group

Continue with the next group of changes following the same process.

## Project-Specific Considerations

### Poetry Monorepo Structure

**Module Testing:**
Tests run per module using Poetry:
```bash
poetry -C libs/python/ava-integrations run pytest .
poetry -C libs/python/ava-langchain-chains run pytest .
poetry -C libs/python/ava-api run pytest .
```

**Dependencies:**
- Each module has its own `pyproject.toml` and `poetry.lock`
- Modules may depend on other modules in the monorepo

**Test Scripts:**
- Look for `scripts/run-pytests.sh` for coordinated testing
- May test multiple modules in sequence

### Pre-Commit Hook Integration

**Common Hooks:**
- autoflake: Remove unused imports and variables
- isort: Sort imports
- black: Format code
- pytest: Run tests
- npm lint: JavaScript/TypeScript linting
- typescript check: Type checking

**Hook Behavior:**
- Hooks may stash unstaged changes during execution
- Multiple hooks may fail in sequence
- Address linting first, then tests

**Hook Bypass:**
- Use `--no-verify` only for infrastructure-related test failures
- Document why bypass was necessary
- Never bypass for code quality issues

### Git Aliases Recognition

- Projects may have git aliases (e.g., `gst` for `git status`)
- Use full commands in workflow for clarity
- Recognize aliases in terminal output

## Conventional Commit Format Standards

### Commit Message Structure

```
<type>([optional scope]): <description>

[optional body]

[optional footer(s)]
```

### Required Elements

- **type**: MUST be lowercase
- **description**: MUST immediately follow colon and space
- **scope**: OPTIONAL noun in parentheses describing codebase section

### Optional Elements

- **body**: MUST begin one blank line after description
- **footer(s)**: MUST be one blank line after body, follow git trailer format

### Breaking Changes

Indicate in one of two ways:

1. **Footer Format**: `BREAKING CHANGE: <description>`
2. **Type Indicator**: Add `!` before colon (e.g., `feat!: breaking change`)

### Examples of Compliant Commit Messages

```bash
# Simple feature
feat(auth): add JWT token validation middleware

# Bug fix with scope
fix(user-profile): resolve avatar upload sizing issue

# Breaking change
feat!: send an email to the customer when a product is shipped

# Refactor with context
refactor(slack): replace admin_client with slack_admin_bot architecture

# Documentation
docs(readme): update installation instructions for Python 3.11

# Tests
test(auth): add comprehensive JWT validation tests

# Dependencies
chore(deps): upgrade fastapi to version 0.104.1

# With body
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files

# With detailed body and footer
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Reviewed-by: Z
Refs: #123
```

## Handling Common Scenarios

### Scenario 1: Import Order Changes from isort

After commit, if isort reorders imports:
```bash
git add -A
git commit --amend --no-edit
```

### Scenario 2: Code Formatting from Black

After commit, if black reformats code:
```bash
git add -A
git commit --amend --no-edit
```

### Scenario 3: Test Failures (Code-Related)

Fix the failing tests, then:
```bash
git add tests/ [any source files that needed fixing for tests]
git commit --amend --no-edit
```

### Scenario 4: Test Failures (Infrastructure-Related)

If database connection fails, external service unavailable, etc., and the failure is not related to code changes:
```bash
git commit --no-verify -m "your commit message"
```

Document the infrastructure issue for team awareness.

### Scenario 5: Linting Errors Requiring Manual Fixes

Fix linting errors manually, then:
```bash
git add [files with fixes]
git commit --amend --no-edit
```

### Scenario 6: Large Logical Groups

When many files are logically related (e.g., major refactoring):
```bash
git add -A
git commit -m "refactor(module): comprehensive architecture update"
```

## Best Practices

1. **Atomic Commits**: Each commit should represent a single, complete change

2. **Logical Ordering**: Commit changes in an order that maintains a working state

3. **Clear Messages**: Write commit messages that explain the "what" and "why"

4. **Test Integration**: Distinguish between code issues and infrastructure issues

5. **Lint Compliance**: Accept reasonable linting changes, fix actual linting errors

6. **Untracked Files**: Consider if untracked files are logically part of the change

7. **Infrastructure Awareness**: Don't let infrastructure issues block code commits

## Pre-Workflow Checklist

Before starting the commit workflow:

- [ ] All changes are complete and ready for commit
- [ ] You understand the scope of all modifications
- [ ] You have a mental map of logical groupings
- [ ] Development environment is set up for linting/testing feedback
- [ ] Check if infrastructure services (DB, external APIs) are available
- [ ] Identify any untracked files that might be part of logical groups

## Post-Workflow Validation

After completing all commits:

- [ ] Run full test suite to ensure all tests pass (when infrastructure available)
- [ ] Verify commit history tells a clear story
- [ ] Check that each commit message follows conventional format
- [ ] Ensure no linting issues remain
- [ ] Confirm all logical groups were properly committed
- [ ] Document any infrastructure issues that required `--no-verify`

## Troubleshooting Guide

### When Pre-Commit Hooks Fail

1. **Read error output carefully**: Distinguish between linting fixes and actual errors

2. **Let autoflake/isort/black make changes**: Stage and amend them

3. **For pytest failures**: Determine if code-related or infrastructure-related

4. **Infrastructure failures**: Use `--no-verify` and document the issue

### When Commits Are Too Large

1. **Re-examine logical groupings**: Can they be split further?

2. **Check for unintentional inclusions**: Did `git add -A` pick up unrelated files?

3. **Consider the story**: Does the large commit tell a coherent story?

### When Tests Keep Failing

1. **Verify test environment**: Are required services running?

2. **Check test isolation**: Are tests interfering with each other?

3. **Review test relevance**: Are failures related to your changes?

## Success Criteria

The commit workflow is complete when:
- All changes are committed in logical, atomic groups
- Each commit follows conventional commit format
- Commit history tells a clear, coherent story
- All linting issues are resolved
- Tests pass (or infrastructure issues are documented)
- Working directory is clean (`git status` shows no changes)

</detailed_sequence_steps>

</task>
