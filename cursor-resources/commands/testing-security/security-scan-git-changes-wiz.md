<task name="Security Scan Git Changes with Wiz">

<task_objective>
Perform a security scan of files changed in the current Git working tree using Wiz CLI by authenticating if needed, identifying changed files, running appropriate security scans (code scan for secrets/vulnerabilities and IaC scan for infrastructure files), and interpreting the raw Wiz output to provide natural language feedback with actionable security recommendations.
</task_objective>

<detailed_sequence_steps>
# Security Scan Git Changes with Wiz - Detailed Sequence of Steps

## Overview

Execute commands to scan changed files using Wiz CLI. Interpret the raw output and communicate findings to the user in natural language, focusing on actionable security issues.

## 1. Prerequisites Check

### Check Wiz CLI Installation

1. Verify Wiz CLI is installed:
   ```bash
   command -v wizcli
   ```

2. If not installed:
   - Inform user to install from: https://docs.wiz.io/wiz-docs/docs/wiz-cli-overview
   - Exit gracefully until installation is complete

### Check Git Installation

1. Verify Git is installed:
   ```bash
   command -v git
   ```

2. If not installed:
   - Inform user Git is required
   - Exit gracefully

## 2. Authenticate with Wiz

### Check Authentication Status

1. Check if already authenticated:
   ```bash
   wizcli auth
   ```

2. Expected responses:
   - "Already authenticated" - proceed to next step
   - Authentication error - proceed to authentication

3. Alternative check:
   ```bash
   wizcli dir scan --help
   ```
   - If this fails, authentication is needed

### Authenticate if Needed

1. Use device code authentication:
   ```bash
   wizcli auth --use-device-code
   ```

2. Follow the prompts to complete authentication.

3. ⚠️ **IMPORTANT**: Never use `wizcli auth --print-token` as it exposes sensitive tokens in terminal output.

4. Verify authentication succeeded before proceeding.

## 3. Get Changed Files

### Verify Git Repository

1. Confirm we're in a git repository:
   ```bash
   git rev-parse --git-dir
   ```

2. If not in a git repository:
   - Inform user
   - Exit gracefully

### Identify Changed Files

Get comprehensive list of changed files:

1. Get committed changes:
   ```bash
   git diff --name-only HEAD
   ```

2. Get unstaged changes:
   ```bash
   git diff --name-only
   ```

3. Get staged changes:
   ```bash
   git diff --cached --name-only
   ```

4. Get combined unique list:
   ```bash
   (git diff --name-only HEAD; git diff --name-only; git diff --cached --name-only) | sort -u
   ```

5. Store the list of changed files for analysis.

## 4. Run Security Scans

### Code Scan (Secrets and Vulnerabilities)

Scan changed files for secrets, sensitive data, and vulnerabilities.

**Full directory scan:**
```bash
wizcli dir scan --path . --no-publish --secrets --sensitive-data --show-secret-snippets
```

**Scan specific files:**
```bash
wizcli dir scan --path [file1] [file2] --no-publish --secrets
```

**Key flags:**
- `--no-publish`: Don't publish results to Wiz platform (local scan only)
- `--secrets`: Detect exposed secrets (API keys, passwords, tokens)
- `--sensitive-data`: Detect sensitive data patterns (SSNs, credit cards)
- `--show-secret-snippets`: Show snippets of detected secrets

### IaC Scan (Infrastructure as Code)

Check if IaC files are in the changed files list:

**IaC file extensions to look for:**
- `.tf` (Terraform)
- `.yaml`, `.yml` (Kubernetes, CloudFormation, etc.)
- `Dockerfile` (Docker)
- `.json` (CloudFormation, ARM templates)
- `.bicep` (Azure Bicep)

**If IaC files are present:**
```bash
wizcli iac scan --path . --no-publish --secrets
```

**Key flags:**
- `--path .`: Scan current directory
- `--no-publish`: Local scan only
- `--secrets`: Also check IaC files for secrets

## 5. Interpret Results

Parse and analyze the Wiz CLI output:

### Critical/High Severity Issues

Identify and prioritize:
- Exposed secrets (API keys, passwords, tokens, certificates)
- High/critical severity vulnerabilities
- Security misconfigurations
- Policy violations

### Vulnerabilities

Summarize findings:
- CVE details for known vulnerabilities
- Affected components
- Severity levels
- Available patches or mitigations

### Exposed Secrets

Detail secret exposures:
- Type of secret (API key, password, token, etc.)
- Location (file and line number)
- Snippet showing context
- Remediation steps

### Policy Violations

Identify policy issues:
- Which policies are violated
- Severity of violations
- Required changes to comply

### Recommendations

Provide actionable recommendations:
- Immediate actions for critical issues
- Steps to remediate vulnerabilities
- Best practices to prevent future issues
- Links to relevant documentation

## 6. Present Findings to User

Communicate results in natural language:

### Summary Format

```markdown
# Security Scan Results

## Summary
Scanned X files with Y findings (Z critical, A high, B medium, C low)

## Critical Issues
[List critical findings with file locations and remediation steps]

## High Priority Issues
[List high priority findings]

## Recommendations
[Provide specific, actionable recommendations]

## Next Steps
[Clear steps user should take to address findings]
```

### Focus Areas

Emphasize:
- Most important security concerns
- Files requiring immediate attention
- Clear remediation steps
- Prevention recommendations

## Advanced Options

### Filter by File Type

**Python files only:**
```bash
git diff --name-only HEAD | grep '\.py$'
```

**JavaScript/TypeScript only:**
```bash
git diff --name-only HEAD | grep -E '\.(js|ts|jsx|tsx)$'
```

**IaC files only:**
```bash
git diff --name-only HEAD | grep -E '\.(tf|yaml|yml)$|Dockerfile'
```

### Additional Scan Flags

**Show vulnerability details:**
```bash
wizcli dir scan --path . --no-publish --secrets --show-vulnerability-details
```

**Enable malware detection:**
```bash
wizcli dir scan --path . --no-publish --secrets --file-hashes-scan
```

**JSON output for parsing:**
```bash
wizcli dir scan --path . --no-publish --secrets --format json
```

**SARIF format for CI/CD:**
```bash
wizcli dir scan --path . --no-publish --secrets --format sarif
```

## Examples

### Example 1: Basic Security Scan

**Scenario:** Scan all changed files for secrets and sensitive data

**Commands:**
```bash
# Check authentication
wizcli auth

# Get changed files
git diff --name-only HEAD

# Run scan
wizcli dir scan --path . --no-publish --secrets --sensitive-data
```

**Interpretation:**
- Parse output for exposed secrets
- Identify severity levels
- Provide remediation steps

### Example 2: IaC-Focused Scan

**Scenario:** Terraform or Kubernetes configuration changes

**Commands:**
```bash
# Identify IaC files
git diff --name-only HEAD | grep -E '\.(tf|yaml|yml)$'

# Run IaC scan
wizcli iac scan --path . --no-publish --secrets
```

**Interpretation:**
- Check for infrastructure misconfigurations
- Identify security policy violations
- Recommend secure configurations

### Example 3: Comprehensive Scan with Details

**Scenario:** Full security analysis with detailed vulnerability information

**Commands:**
```bash
# Run comprehensive scan
wizcli dir scan --path . --no-publish --secrets --sensitive-data --show-secret-snippets --show-vulnerability-details
```

**Interpretation:**
- Provide detailed vulnerability reports with CVEs
- Show secret snippets for context
- Prioritize findings by severity
- Offer specific remediation guidance

## Troubleshooting

### Authentication Fails

**Issue:** `wizcli auth` returns error

**Solution:**
1. Try device code authentication:
   ```bash
   wizcli auth --use-device-code
   ```
2. Follow browser prompts to complete authentication
3. Verify authentication succeeded

### Scan Hangs or Times Out

**Issue:** Scan doesn't complete

**Solution:**
1. Scan specific files instead of entire directory
2. Exclude large binary files
3. Check network connectivity

### Too Many Results

**Issue:** Overwhelming number of findings

**Solution:**
1. Filter by severity (focus on critical/high first)
2. Scan specific file types
3. Use `--format json` for programmatic filtering

## Success Criteria

The security scan is complete when:
- Wiz CLI is installed and authenticated
- All changed files have been identified
- Appropriate scans (code and/or IaC) have been run
- Raw Wiz output has been interpreted
- Findings presented to user in clear, actionable format
- Critical issues are prioritized with remediation steps
- User understands next steps to address security concerns

</detailed_sequence_steps>

</task>
