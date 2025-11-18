<task name="Perform Comprehensive Security Audit">

<task_objective>
Perform a comprehensive security review of the codebase to identify and fix vulnerabilities across authentication, input validation, data protection, dependencies, API security, and file operations. The output will be a security assessment report with identified vulnerabilities and implemented fixes.
</task_objective>

<detailed_sequence_steps>
# Perform Comprehensive Security Audit - Detailed Sequence of Steps

## 1. Scan Dependencies

1. Run dependency audit tools:
   ```bash
   npm audit
   # or
   pnpm audit
   # or
   yarn audit
   ```

2. Review all reported vulnerabilities:
   - Note severity levels (critical, high, moderate, low)
   - Identify affected packages and versions
   - Check for available patches or updates

3. Research known CVEs for critical dependencies.

4. Update vulnerable packages:
   - Test updates in isolated environment first
   - Verify no breaking changes introduced
   - Document any packages that cannot be updated and why

## 2. Review Authentication & Authorization

1. **Password Storage:**
   - Search for password handling code
   - Verify bcrypt, argon2, or similar hashing is used
   - Check that plain text passwords are never stored
   - Ensure salt rounds are adequate (minimum 10 for bcrypt)

2. **Session Management:**
   - Review session creation and destruction logic
   - Verify secure session storage mechanism
   - Check session timeout implementation
   - Ensure sessions are invalidated on logout

3. **Token Handling:**
   - Review JWT or similar token implementation
   - Verify token expiration is set appropriately
   - Check token refresh mechanism if applicable
   - Ensure tokens are stored securely (HttpOnly cookies, not localStorage for sensitive tokens)

4. **Access Control:**
   - Review role-based access control (RBAC) implementation
   - Test that users cannot access unauthorized resources
   - Verify permission checks at both route and function levels
   - Check for privilege escalation vulnerabilities

## 3. Validate Input Handling

1. **User Input Validation:**
   - Identify all user input points (forms, APIs, query params)
   - Verify input validation is present and comprehensive
   - Check for proper data type validation
   - Ensure length limits are enforced

2. **SQL Injection Prevention:**
   - Search for database queries
   - Verify parameterized queries or ORM usage
   - Flag any string concatenation in SQL queries
   - Test with common SQL injection patterns

3. **XSS Protection:**
   - Review output encoding/escaping
   - Check if framework provides automatic XSS protection
   - Verify user-generated content is sanitized
   - Test with common XSS payloads

4. **CSRF Protection:**
   - Verify CSRF tokens are implemented for state-changing operations
   - Check token validation on the server side
   - Ensure SameSite cookie attribute is set appropriately

## 4. Assess Data Protection

1. **Sensitive Data Encryption:**
   - Identify sensitive data (PII, financial, health, etc.)
   - Verify encryption at rest for sensitive data
   - Check encryption in transit (HTTPS/TLS)
   - Ensure proper key management

2. **Secrets Management:**
   - Search for hardcoded secrets, API keys, passwords
   - Verify secrets are stored in environment variables or secret managers
   - Check that secrets are not logged or exposed in errors
   - Review `.gitignore` to ensure sensitive files are excluded

3. **HTTPS Configuration:**
   - Verify HTTPS is enforced in production
   - Check TLS version (minimum TLS 1.2)
   - Review SSL/TLS certificate configuration
   - Ensure HTTP to HTTPS redirects are in place

4. **Cookie Security:**
   - Verify `Secure` flag is set on cookies in production
   - Check `HttpOnly` flag for session cookies
   - Ensure `SameSite` attribute is configured
   - Review cookie expiration settings

## 5. Review API Security

1. **Rate Limiting:**
   - Check if rate limiting is implemented on endpoints
   - Verify appropriate rate limits for different endpoint types
   - Test rate limiting functionality
   - Ensure rate limit headers are returned

2. **Input Sanitization:**
   - Review API input validation and sanitization
   - Check for proper content-type validation
   - Verify request size limits
   - Test with malformed requests

3. **Error Handling:**
   - Review error messages returned to clients
   - Ensure stack traces are not exposed in production
   - Verify errors don't leak sensitive information
   - Check that appropriate HTTP status codes are used

4. **CORS Configuration:**
   - Review CORS settings
   - Verify allowed origins are properly restricted
   - Check allowed methods and headers
   - Ensure credentials are handled securely

## 6. Examine File Operations

1. **File Upload Validation:**
   - Check file type validation (whitelist, not blacklist)
   - Verify file size limits are enforced
   - Review file content validation (not just extension)
   - Ensure uploaded files are scanned for malware if applicable

2. **Path Traversal Prevention:**
   - Search for file path operations
   - Verify user input in file paths is validated
   - Check for proper path sanitization
   - Test with path traversal attempts (../, etc.)

3. **File Permissions:**
   - Review file system permission settings
   - Ensure uploaded files have restricted permissions
   - Verify sensitive files are not publicly accessible
   - Check that temporary files are cleaned up

4. **File Storage:**
   - Verify files are stored outside web root if possible
   - Check that direct file access is prevented
   - Ensure file names are sanitized
   - Review file serving mechanism for security

## 7. Run Security Tools

1. Run ESLint with security plugins if configured.

2. Consider running OWASP ZAP or similar tools for web application scanning if applicable.

3. Review any existing security testing results.

## 8. Document Findings

1. Create a security audit report with:
   - List of vulnerabilities found (categorized by severity)
   - Vulnerabilities fixed during audit
   - Recommendations for remaining issues
   - Any false positives or accepted risks

2. Prioritize remaining vulnerabilities for future work.

3. Provide actionable recommendations to the user.

</detailed_sequence_steps>

</task>
