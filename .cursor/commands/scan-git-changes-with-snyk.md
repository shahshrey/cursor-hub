<task name="Scan Git Changes with Snyk">

<task_objective>
Analyze current git changes (staged and modified files) for security vulnerabilities by running Snyk Code Scan (SAST) and Snyk SCA scan against only the changed files. The workflow takes the current working directory as input, identifies modified files, executes targeted Snyk scans with appropriate severity thresholds, and outputs a formatted security report identifying code vulnerabilities, dependency issues, and actionable remediation steps.
</task_objective>

<detailed_sequence_steps>
# Scan Git Changes with Snyk - Detailed Sequence of Steps

## Step 1: Get Project Absolute Path

1. Execute `pwd` command in the terminal to retrieve the current working directory.

2. Store the result as the `PROJECT_PATH` variable for use in subsequent Snyk MCP tool calls.

3. Validate that the path exists and is within a git repository by checking for `.git` directory.

**Expected Output:** Absolute path string (e.g., `/Users/username/project`)

**Tools Required:** `run_terminal_cmd`

## Step 2: Identify Git Modified Files

1. Execute `git diff --cached --name-only` to retrieve all staged files.

2. Execute `git diff --name-only` to retrieve all unstaged modified files.

3. Combine both lists to get comprehensive coverage of all changes.

4. Filter the file list by relevant extensions:
   - Include: `.ts`, `.tsx`, `.js`, `.jsx`, `.py`, `.java`, `.go`, `.rb`, `.php`, `.cs`, `.cpp`, `.c`, `.h`
   - Exclude: Files in `node_modules`, `.git`, `dist`, `build`, or other ignored directories

5. Group files by their parent directories for efficient scanning.

6. Check if dependency files are modified:
   - `package.json`, `package-lock.json`
   - `requirements.txt`, `Pipfile`, `Pipfile.lock`
   - `pom.xml`, `build.gradle`, `go.mod`, `Gemfile`, `composer.json`

**Expected Output:** 
- List of modified source code files
- Boolean flag indicating if dependency files were modified

**Tools Required:** `run_terminal_cmd`, `grep` (optional for filtering)

## Step 3: Run Snyk Code Scan (SAST) on Modified Files

1. If no source code files were modified, skip this step and notify the user.

2. For the project directory containing modified files:
   - Call `mcp_Snyk_snyk_code_scan` with the following parameters:
     - `path`: Use the absolute `PROJECT_PATH`
     - `severity_threshold`: Set to `"low"` for comprehensive scanning
   - The scan will analyze all files but we'll focus on issues in modified files

3. Collect all security issues returned by the scan:
   - DOM-based XSS vulnerabilities
   - Hardcoded secrets
   - Path traversal issues
   - SQL injection risks
   - Other SAST findings

4. Filter results to show only issues in the modified files identified in Step 2.

5. Aggregate issues by severity level (High, Medium, Low).

**Expected Output:** 
- List of code security issues with file paths, line numbers, CWEs, and descriptions
- Count of issues by severity level

**Tools Required:** `mcp_Snyk_snyk_code_scan`

## Step 4: Run Snyk SCA Scan (Dependency Analysis)

1. Check if any dependency manifest files were modified (from Step 2).

2. If dependency files were modified OR if user wants comprehensive dependency check:
   - Call `mcp_Snyk_snyk_sca_scan` with the following parameters:
     - `path`: Use the absolute `PROJECT_PATH`
     - `severity_threshold`: Set to `"low"` for comprehensive scanning
     - `all_projects`: Set to `true` if scanning a monorepo

3. Collect all dependency vulnerability issues:
   - Package name and version
   - CVE identifiers
   - CWE classifications
   - Available fix versions
   - Remediation advice

4. Identify which vulnerabilities have direct upgrade paths available.

**Expected Output:**
- List of vulnerable dependencies with CVEs, severity, and fix recommendations
- Upgrade suggestions for package versions

**Tools Required:** `mcp_Snyk_snyk_sca_scan`

## Step 5: Format and Present Results

1. Create a summary section with:
   - Total number of issues found across both scans
   - Breakdown by severity (High, Medium, Low)
   - Count of SAST vs SCA issues

2. For each SAST issue found, format the output:
   ```
   [Severity Icon] [Severity]: [Issue Title]
   - File: [file path]
   - Line: [line number]
   - Issue: [description]
   - CWE: [CWE identifier]
   - Learn more: [Snyk learn URL if available]
   ```

3. For each SCA issue found, format the output:
   ```
   [Severity Icon] [Severity]: [Vulnerability Title]
   - Package: [package name]@[version]
   - CVE: [CVE identifier]
   - Fix: Upgrade to version [fixed version]
   - Learn more: [Snyk learn URL]
   ```

4. Provide a recommendations section with actionable next steps:
   - Prioritize High severity issues
   - Suggest specific code fixes for SAST issues
   - Suggest dependency upgrade commands for SCA issues
   - Offer to auto-fix issues if possible

5. Use appropriate emoji indicators:
   - 🔴 High severity
   - 🟠 Medium severity
   - 🟡 Low severity

**Expected Output:** Formatted security report in the chat

**Tools Required:** Response formatting (built-in)

## Step 6: Optional - Fix Issues (User Confirmation Required)

1. After presenting the results, ask the user if they want to proceed with fixes:
   ```
   Would you like me to fix any of these security issues?
   - Fix all automatically
   - Fix only dependency issues
   - Fix specific issues (I'll ask which ones)
   - No, I'll handle them manually
   ```

2. If user confirms auto-fix for dependency issues:
   - For npm: Generate and suggest `npm update [package]@[version]` commands
   - For pip: Generate and suggest `pip install [package]==[version]` commands
   - For other ecosystems: Provide appropriate upgrade commands
   - Optionally execute the commands with user permission

3. If user confirms auto-fix for code issues:
   - For each fixable SAST issue:
     - Read the affected file
     - Apply recommended code changes (sanitization, validation, etc.)
     - Write the updated file
   - Note: Only fix issues where Snyk provides clear remediation

4. After applying fixes, re-run the appropriate Snyk scan(s) to verify:
   - Issues were resolved
   - No new issues were introduced

5. Present the verification results to the user.

**Expected Output:** 
- Fixed code files (if SAST fixes applied)
- Updated dependency files (if SCA fixes applied)
- Verification scan results

**Tools Required:** 
- `read_file`, `search_replace`, `write` (for code fixes)
- `run_terminal_cmd` (for dependency updates)
- `mcp_Snyk_snyk_code_scan`, `mcp_Snyk_snyk_sca_scan` (for verification)

</detailed_sequence_steps>

<how_to_ask_followup_question>
<question>Would you like me to fix any of these security issues?</question>
<options>["Fix all automatically", "Fix only dependency issues", "Fix specific issues (I'll specify)", "No, I'll handle them manually"]</options>
</how_to_ask_followup_question>

</task>

