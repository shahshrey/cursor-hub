# Auto Review and Apply with CodeRabbit

Review code using CodeRabbit CLI, parse feedback into a structured report, automatically apply all suggested improvements, and verify results.

## Objective

Execute a comprehensive code review workflow for all uncommitted changes using CodeRabbit CLI. Identify issues by severity and category, automatically apply fixable improvements, and generate a detailed report with verification results.

## Workflow Steps

### Step 1: Verify Prerequisites

First, check that CodeRabbit CLI is installed and authenticated:

```bash
coderabbit auth status
```

If not authenticated, instruct user to run:
```bash
coderabbit auth login
```

If CLI not found, provide installation instructions:
```bash
curl -fsSL https://cli.coderabbit.ai/install.sh | sh
```

### Step 2: Execute Review

Run CodeRabbit review on uncommitted changes:

```bash
coderabbit review --plain --type uncommitted
```

**Command flags explained**:
- `--plain`: Output in parseable plain text format (required for automation)
- `--type uncommitted`: Review only staged/unstaged changes from current session

**Alternative for token efficiency**:
```bash
coderabbit review --prompt-only --type uncommitted
```

### Step 3: Parse Review Output

Analyze the review output and categorize issues:

**By Severity**:
- 🔴 **Critical**: Security vulnerabilities, data loss risks, breaking bugs
- 🟠 **High**: Performance issues, major bugs, security concerns
- 🟡 **Medium**: Code quality issues, potential bugs, maintainability
- 🟢 **Low**: Style issues, minor improvements, suggestions

**By Category**:
- 🐛 **Bugs**: Logic errors, null pointer risks, incorrect implementations
- 🔒 **Security**: SQL injection, XSS, exposed secrets, authentication issues
- ⚡ **Performance**: N+1 queries, memory leaks, inefficient algorithms
- 🎨 **Style**: Formatting, naming conventions, code organization
- 📚 **Best Practices**: Missing error handling, improper patterns
- 🧪 **Testing**: Missing tests, test quality issues
- 📝 **Documentation**: Missing or outdated comments/docs

### Step 4: Automatically Apply Fixes

For each identified issue, extract:
- File path and line number(s)
- Issue description and suggested fix
- Code snippet if provided
- Priority level for auto-fixing

Apply fixes automatically starting with highest severity:
1. Critical and High severity issues first
2. Security and bug fixes
3. Performance improvements
4. Style and best practice issues

Use conservative auto-fix approach:
- Only apply fixes with clear, deterministic solutions
- Skip architectural changes requiring human judgment
- Preserve existing functionality

### Step 5: Generate Report

Create a structured markdown report with:

**Executive Summary**:
- Total issues found
- Issues fixed automatically
- Issues requiring manual review

**Severity Breakdown**:
```
🔴 Critical: {count}
🟠 High: {count}
🟡 Medium: {count}
🟢 Low: {count}
```

**Category Breakdown**:
```
🐛 Bugs: {count}
🔒 Security: {count}
⚡ Performance: {count}
🎨 Style: {count}
📚 Best Practices: {count}
🧪 Testing: {count}
📝 Documentation: {count}
```

**Applied Fixes**:
List each fix with:
- File path
- Issue description
- Change made
- Verification status

**Manual Review Required**:
List issues that need human attention with:
- Severity and category
- Description and reasoning
- Suggested approach

### Step 6: Verify Changes

After applying fixes:
1. Run linter to ensure no new errors introduced
2. Check that all auto-fixes compile/parse correctly
3. Confirm no functionality broken

### Step 7: Offer Next Steps

Present user with options:
```
Would you like me to:
1. Address remaining issues manually?
2. Run another review cycle to verify fixes?
3. Proceed with committing changes?
4. Generate a PR description with review results?
```

## Error Handling

**CodeRabbit Not Authenticated**:
- Display: "Please authenticate with `coderabbit auth login`"
- Exit gracefully

**Not a Git Repository**:
- Display: "❌ This workflow requires a git repository. Run from repo root or initialize with `git init`"
- Exit gracefully

**No Changes Detected**:
- Display: "ℹ️ No uncommitted changes found. No review needed."
- Exit gracefully

**CodeRabbit CLI Not Found**:
- Display installation instructions
- Provide: `curl -fsSL https://cli.coderabbit.ai/install.sh | sh`

## Configuration Options

**Review Types**:
- `uncommitted` (default for this command) - Current session changes
- `committed` - Only committed changes
- `all` - Everything (committed + uncommitted)

**Compare Against Branch** (optional):
```bash
coderabbit review --plain --type uncommitted --base main
```

**Custom Config File** (optional):
```bash
coderabbit review --plain --type uncommitted --config CLAUDE.md
```

**Review Strictness Levels**:
- **Conservative** (default): Only fix style and obvious issues
- **Moderate**: Include error handling and type safety
- **Aggressive**: Apply all non-architectural suggestions

**File Exclusions** (if needed):
- Test files (when focusing on implementation)
- Configuration files
- Migration files

## Quick Reference

| Command | Purpose |
|---------|---------|
| `coderabbit auth login` | Authenticate CLI |
| `coderabbit auth status` | Check authentication |
| `coderabbit review --plain --type uncommitted` | Review current work |
| `coderabbit review --prompt-only --type uncommitted` | Token-efficient review |
| `coderabbit review --plain --type all --base main` | PR review |
| `coderabbit update` | Update CLI |

## Expected Behavior

Execute this command to automatically review and improve your uncommitted code changes. The agent will run CodeRabbit, parse results, apply fixes, and provide a comprehensive report with verification. This streamlines code quality checks and reduces manual review time.


