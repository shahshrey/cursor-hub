<task name="Scan Git Changes with Snyk">

<task_objective>
Perform automatically scan current Git changes (staged, unstaged, and committed) for security vulnerabilities using Snyk Code (SAST), identify issues in modified files, automatically fix security issues where possible using Snyk scan results, and rescan to verify fixes are applied correctly. This command helps us Snyk MCP tools to perform comprehensive security analysis on changed code files and dependencies, ensuring no new security issues are introduced before committing changes.
</task_objective>

<detailed_sequence_steps>

## Step 1: Verify Git Repository and Get Current Working Directory

### Purpose
Confirm we're working in a git repository and get the absolute path required for Snyk scans.

### Actions
1. Verify git repository exists:
   ```bash
   git rev-parse --git-dir
   ```
   - If command fails, inform user and exit gracefully

2. Get absolute path of current directory:
   ```bash
   pwd
   ```
   - Store this as `PROJECT_PATH` for use in Snyk tool calls

3. Verify Snyk authentication:
   - Check if user is authenticated with Snyk (tool will handle this automatically)
   - If authentication is required, use **mcp_Snyk_snyk_auth** tool

### Expected Output
- Confirmation that we're in a git repository
- Absolute path to project directory stored for Snyk scans

---

## Step 2: Identify Changed Files

### Purpose
Get comprehensive list of all changed files (staged, unstaged, and committed) to determine what needs scanning.

### Actions
1. Get staged changes:
   ```bash
   git diff --cached --name-only
   ```

2. Get unstaged changes:
   ```bash
   git diff --name-only
   ```

3. Get committed changes (since last push or compared to default branch):
   ```bash
   # Detect default branch (fallback to main if detection fails)
   DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | cut -d'/' -f4 || echo "main")
   git diff $DEFAULT_BRANCH HEAD --name-only
   ```

4. Combine and deduplicate all changed files:
   ```bash
   # Re-detect branch for subshell context
   DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | cut -d'/' -f4 || echo "main")
   (git diff --cached --name-only; git diff --name-only; git diff $DEFAULT_BRANCH HEAD --name-only) | sort -u
   ```

5. Filter for Snyk-supported file types:
   - TypeScript/JavaScript: `.ts`, `.tsx`, `.js`, `.jsx`
   - Python: `.py`
   - Java: `.java`
   - Go: `.go`
   - And other Snyk-supported languages

6. Store list of changed files that need scanning

### Expected Output
- List of changed files that are Snyk-scannable
- File count and types for reporting

---

## Step 3: Run Snyk Code Scan (SAST)

### Purpose
Scan changed code files for security vulnerabilities using Snyk Code static analysis.

### Actions
1. Use **mcp_Snyk_snyk_code_scan** tool with parameters:
   - `path`: `PROJECT_PATH` (absolute path from Step 1)
   - `severity_threshold`: `low` (scan all severities)
   - `debug`: `false` (unless user requests debug output)

2. Parse scan results:
   - Extract issue count
   - Identify issues in changed files (filter by file paths from Step 2)
   - Categorize by severity: `critical`, `high`, `medium`, `low`
   - Extract CWE codes and rule IDs for each issue

3. Report findings:
   - List all issues found in changed files
   - Show file path, line number, severity, and issue description
   - Highlight issues that match changed files from Step 2

### Expected Output
- Snyk scan results with issue count
- Filtered list of issues in changed files
- Severity breakdown and CWE codes

---

## Step 4: Run Snyk SCA Scan (Dependency Vulnerabilities)

### Purpose
Scan project dependencies for known vulnerabilities if package manifest files were changed.

### Actions
1. Check if dependency files were changed:
   - `package.json`, `package-lock.json` (Node.js)
   - `requirements.txt`, `Pipfile`, `poetry.lock` (Python)
   - `pom.xml`, `build.gradle` (Java)
   - `go.mod`, `go.sum` (Go)
   - Other package manager files

2. If dependency files changed, use **mcp_Snyk_snyk_sca_scan** tool with parameters:
   - `path`: `PROJECT_PATH` (absolute path)
   - `severity_threshold`: `low`
   - `all_projects`: `true` (scan all detected projects)

3. Parse dependency scan results:
   - Extract vulnerable dependencies
   - Identify fixable vulnerabilities
   - Note upgrade paths available

### Expected Output
- Dependency vulnerability report (if applicable)
- List of vulnerable packages and available fixes

---

## Step 5: Run Snyk IaC Scan (Infrastructure as Code)

### Purpose
Scan infrastructure code files if any IaC files were changed.

### Actions
1. Check if IaC files were changed:
   - Terraform: `.tf`, `.tf.json`
   - Kubernetes: `.yaml`, `.yml` (in k8s/ or similar directories)
   - CloudFormation: `.yaml`, `.yml`, `.json`
   - Dockerfile
   - Other IaC formats

2. If IaC files changed, use **mcp_Snyk_snyk_iac_scan** tool with parameters:
   - `path`: `PROJECT_PATH` (absolute path)
   - `severity_threshold`: `low`

3. Parse IaC scan results:
   - Extract misconfigurations
   - Identify security issues in infrastructure code

### Expected Output
- IaC security misconfiguration report (if applicable)
- List of infrastructure security issues

---

## Step 6: Analyze and Prioritize Issues

### Purpose
Review all scan results and prioritize issues for fixing, focusing on changed files.

### Actions
1. Consolidate all findings from Steps 3, 4, and 5

2. Filter issues to only those in changed files (from Step 2)

3. Prioritize by severity:
   - Critical and High severity issues first
   - Medium severity issues second
   - Low severity issues last

4. Identify auto-fixable issues:
   - Code issues with clear remediation paths
   - Dependency issues with available upgrades
   - IaC issues with straightforward fixes

5. Present summary to user:
   - Total issues found in changed files
   - Breakdown by severity
   - Number of auto-fixable issues

### Expected Output
- Prioritized list of security issues in changed files
- Summary of fixable vs manual-review issues

---

## Step 7: Automatically Fix Security Issues

### Purpose
Apply automatic fixes to security issues where possible, following Snyk recommendations.

### Actions
1. For each fixable issue identified in Step 6:

   **Code Issues (SAST):**
   - Read the affected file
   - Analyze the issue context from Snyk dataflow
   - Apply recommended fixes:
     - Input validation and sanitization
     - Secure coding patterns
     - Remove hardcoded secrets (move to environment variables)
     - Fix path traversal vulnerabilities
     - Address XSS vulnerabilities
   - Write fixed code back to file

   **Dependency Issues (SCA):**
   - Identify vulnerable packages with available upgrades
   - Update package manifest files (package.json, requirements.txt, etc.)
   - Run specific package manager update commands:
     - **Node.js**: `npm update <package>` or `npm audit fix` (use `--force` only if necessary and safe)
     - **Python**: Update `requirements.txt` and run `pip install -r requirements.txt --upgrade`
     - **Java**: Update version in `pom.xml` (Maven) or `build.gradle` (Gradle)
     - **Go**: `go get -u <package>@<version>` and `go mod tidy`
     - **Rust**: `cargo update -p <package>`
     - **Ruby**: `bundle update <gem>`
   - Verify lockfiles are updated and consistent

   **IaC Issues:**
   - **Auto-fix Restriction**: Only apply automatic fixes to low-risk categories (e.g., linting, formatting, trivial config defaults).
   - **Manual Approval Required**: For any changes to Terraform, Kubernetes, or CloudFormation that could affect production state:
     - Generate a detailed plan/diff of the proposed changes.
     - Require explicit user opt-in/approval before applying.
     - Prefer creating a separate PR or backup rather than direct application.
     - Run validation checks (e.g., `terraform validate`, `kubectl dry-run`) if possible.
   - Apply security best practices (e.g., adding resource tags, enabling encryption flags) only if verified safe.
   - Fix misconfigurations based on Snyk recommendations only after safety check.

2. Document all fixes applied:
   - File path and line numbers
   - Issue type and severity
   - Fix description

### Expected Output
- Modified files with security fixes applied
- Summary of fixes applied per file

---

## Step 8: Rescan to Verify Fixes

### Purpose
Re-run Snyk scans to confirm that fixes resolved the issues and no new issues were introduced.

### Actions
1. Re-run **mcp_Snyk_snyk_code_scan** on fixed files:
   - Use same parameters as Step 3
   - Focus on previously identified files

2. If dependencies were updated, re-run **mcp_Snyk_snyk_sca_scan**:
   - Verify vulnerable packages are updated
   - Check for new vulnerabilities introduced

3. If IaC files were fixed, re-run **mcp_Snyk_snyk_iac_scan**:
   - Verify misconfigurations are resolved

4. Compare results:
   - Confirm original issues are resolved
   - Check for any new issues introduced by fixes
   - If new issues found, return to Step 7

### Expected Output
- Verification that original issues are fixed
- Confirmation no new issues were introduced
- Final security status report

---

## Step 9: Generate Final Report

### Purpose
Provide comprehensive summary of scan results, fixes applied, and remaining issues (if any).

### Actions
1. Compile final report with:
   - Initial scan results summary
   - Issues found in changed files
   - Fixes applied (with file paths and line numbers)
   - Verification scan results
   - Remaining issues requiring manual review (if any)

2. Present report to user:
   - Total issues found
   - Issues fixed automatically
   - Issues requiring manual attention
   - Recommendations for remaining issues

3. If all issues are resolved:
   - Confirm code is secure for commit
   - Provide summary of security improvements

### Expected Output
- Comprehensive security scan and fix report
- Clear status of all security issues
- Action items for any remaining manual fixes

---

</detailed_sequence_steps>

</task>

