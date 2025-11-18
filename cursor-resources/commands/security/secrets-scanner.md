<task name="Secrets Scanner">

<task_objective>
Scan codebase for exposed secrets, credentials, and sensitive information with comprehensive remediation. Input includes git status for uncommitted files, count of scannable files (*.js, *.py, *.env*, *.yml), recent commits containing sensitive keywords (password, key, secret, token), and environment files. Processing involves detecting API keys & tokens, database credentials, certificates & keys, authentication secrets, and configuration leaks based on scope arguments (--api-keys, --passwords, --certificates, or --fix), then providing remediation actions including secure alternatives and best practices. Output is a detailed security report with risk levels, file locations, line numbers, immediate actions, and long-term security improvements.
</task_objective>

<detailed_sequence_steps>
# Secrets Scanner - Detailed Sequence of Steps

## 1. Current Repository State Assessment

1. Check git status: `git status --porcelain | wc -l` uncommitted files

2. Count scannable files: `find . -name "*.js" -o -name "*.py" -o -name "*.env*" -o -name "*.yml" | wc -l`

3. Review recent commits for sensitive keywords: `git log --oneline --grep="password\|key\|secret\|token" -5`

4. Identify environment files: @.env* or @config/* files

## 2. Scan Scope Determination

1. Parse $ARGUMENTS to determine scan focus:
   - --api-keys: Focus on API keys and tokens
   - --passwords: Focus on passwords and credentials
   - --certificates: Focus on certificates and private keys
   - --fix: Include automated remediation
   - Default: Complete scan

2. Prepare detection patterns for selected scope

3. Configure scan sensitivity and depth

## 3. API Keys & Tokens Detection

1. Scan for GitHub API keys and tokens

2. Identify AWS access keys and secrets

3. Check for Google Cloud credentials

4. Detect Stripe API keys

5. Find third-party service tokens (Slack, Twilio, SendGrid)

6. Document all findings with file locations and line numbers

## 4. Database Credentials Detection

1. Identify database connection strings

2. Find hardcoded database usernames

3. Detect database passwords in configuration

4. Check for MongoDB connection URIs

5. Identify PostgreSQL/MySQL credentials

6. Document credential exposure locations

## 5. Certificates & Keys Detection

1. Scan for private keys (RSA, DSA, ECDSA)

2. Identify SSH private keys

3. Check for SSL/TLS certificates

4. Detect PGP private keys

5. Find certificate authority files

6. Document key exposure with security implications

## 6. Authentication Secrets Detection

1. Identify JWT secret keys

2. Find session secrets and keys

3. Detect OAuth client secrets

4. Check for API authentication tokens

5. Identify cookie signing secrets

6. Document authentication secret exposures

## 7. Configuration Leaks Detection

1. Find hardcoded URLs and endpoints

2. Identify internal service endpoints

3. Check for debug settings in production

4. Detect exposed configuration values

5. Find sensitive application settings

6. Document configuration security issues

## 8. Remediation Actions

1. List all exposed secrets with risk levels (critical, high, medium, low)

2. Provide secure alternatives:
   - Environment variables setup
   - Secret management services (Vault, AWS Secrets Manager)
   - Configuration file encryption

3. Generate .gitignore entries for sensitive files

4. Create secure configuration templates

5. Provide migration steps for each finding

## 9. Secrets Management Best Practices

1. Recommend secrets management tools and services

2. Provide environment variable setup guide

3. Document secret rotation procedures

4. Establish access control recommendations

5. Create monitoring and alerting guidelines

## 10. Report Generation

1. Compile detailed security report with all findings

2. Assign risk levels to each exposed secret

3. Provide immediate action items with priority

4. Include long-term security improvement recommendations

5. Document remediation steps with code examples

6. Create executive summary of secrets exposure status

</detailed_sequence_steps>

</task>
