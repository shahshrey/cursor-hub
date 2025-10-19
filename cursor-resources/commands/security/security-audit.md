<task name="Security Audit">

<task_objective>
Perform comprehensive security assessment and vulnerability analysis following systematic security audit methodologies. Input includes dependency scan results from npm audit, pip check or similar tools, environment files (.env*), security configuration files (.github/workflows/security.yml or security/ directory), and recent security-related commits. Processing involves systematic analysis across ten areas: environment setup, dependency security, authentication & authorization, input validation & sanitization, data protection, secrets management, error handling & logging, infrastructure security, security headers & CORS, with both automated scanning and manual review. Output is a comprehensive security report documenting all findings with severity levels (Critical, High, Medium, Low), specific remediation steps, code examples, file references, and executive summary with key recommendations.
</task_objective>

<detailed_sequence_steps>
# Security Audit - Detailed Sequence of Steps

## 1. Current Environment Assessment

1. Run dependency scan: `npm audit --audit-level=moderate 2>/dev/null || pip check 2>/dev/null || echo "No package manager detected"`

2. Review environment files: @.env* files if they exist

3. Check security configuration: @.github/workflows/security.yml or @security/ directory

4. Review recent commits: `git log --oneline --grep="security\|fix" -10`

## 2. Environment Setup Analysis

1. Identify technology stack and framework versions

2. Check for existing security tools and configurations

3. Review deployment environment setup

4. Assess infrastructure configuration

5. Document current security posture baseline

## 3. Dependency Security Assessment

1. Scan all dependencies for known vulnerabilities

2. Check for outdated packages with security issues

3. Review dependency sources and integrity verification

4. Use appropriate tools: `npm audit`, `pip check`, `cargo audit`

5. Identify critical dependency vulnerabilities requiring immediate action

6. Document dependency security findings with CVE references

## 4. Authentication & Authorization Analysis

1. Review authentication mechanisms and implementation

2. Check session management implementation

3. Verify authorization controls and access restrictions

4. Examine password policies and secure storage

5. Test authentication flow security

6. Check for authentication bypass vulnerabilities

7. Document authentication and authorization findings

## 5. Input Validation & Sanitization Assessment

1. Check all user input validation implementation

2. Look for SQL injection vulnerabilities in database queries

3. Identify potential XSS (Cross-Site Scripting) issues

4. Review file upload security and validation

5. Test input sanitization effectiveness

6. Check for command injection vulnerabilities

7. Document input validation security gaps

## 6. Data Protection Analysis

1. Identify sensitive data handling practices

2. Check encryption implementation for data at rest

3. Verify encryption for data in transit

4. Review data masking and anonymization practices

5. Verify secure communication protocols (HTTPS, TLS)

6. Check certificate configuration and management

7. Document data protection security findings

## 7. Secrets Management Assessment

1. Scan for hardcoded secrets in codebase

2. Check for exposed API keys and tokens

3. Review password storage and handling

4. Check for proper secrets management practices

5. Review environment variable security

6. Identify exposed configuration files

7. Document secrets management vulnerabilities

## 8. Error Handling & Logging Analysis

1. Review error messages for information disclosure

2. Check logging practices for security events

3. Verify sensitive data is not logged

4. Assess error handling robustness

5. Check for stack trace exposure

6. Review log storage and access controls

7. Document error handling and logging security issues

## 9. Infrastructure Security Assessment

1. Review containerization security (Docker configuration)

2. Check CI/CD pipeline security

3. Examine cloud configuration and IAM permissions

4. Assess network security configurations

5. Review firewall rules and network segmentation

6. Check service mesh security if applicable

7. Document infrastructure security vulnerabilities

## 10. Security Headers & CORS Analysis

1. Check security headers implementation:
   - Content-Security-Policy
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security

2. Review CORS configuration and allowed origins

3. Verify CSP (Content Security Policy) settings

4. Examine cookie security attributes (httpOnly, secure, sameSite)

5. Check referrer policy configuration

6. Document security headers and CORS findings

## 11. Automated Security Scanning

1. Run automated security scanning tools available

2. Perform static code analysis

3. Execute dependency vulnerability scans

4. Run configuration security checkers

5. Document automated scan findings

## 12. Manual Security Review

1. Perform manual code review for complex security patterns

2. Review business logic for security flaws

3. Check for race conditions and timing issues

4. Assess cryptographic implementation quality

5. Review access control logic manually

6. Document manual review findings

## 13. Reporting

1. Document all findings with severity levels:
   - Critical: Immediate security threat
   - High: Significant security risk
   - Medium: Moderate security concern
   - Low: Minor security improvement

2. Provide specific remediation steps for each issue

3. Include code examples and file references with line numbers

4. Create prioritized action plan

5. Generate executive summary with key recommendations

6. Present comprehensive security audit report

</detailed_sequence_steps>

</task>
