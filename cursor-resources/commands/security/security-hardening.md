<task name="Security Hardening">

<task_objective>
Harden application security configuration and implement comprehensive security controls based on security best practices. Input includes framework detection from package.json, requirements.txt, or Cargo.toml, security headers check via curl on running server, environment configuration from .env* files for security-related variables, and dependency audit status. Processing involves implementing security controls across six areas (authentication & authorization, input validation, secure communication, data protection, security headers, infrastructure security) based on focus arguments (--headers, --auth, --encryption, --infrastructure, or comprehensive hardening). Output is a hardened application with comprehensive security controls, proper configuration, and monitoring capabilities.
</task_objective>

<detailed_sequence_steps>
# Security Hardening - Detailed Sequence of Steps

## 1. Current Security Posture Assessment

1. Detect framework from @package.json or @requirements.txt or @Cargo.toml

2. Check security headers: `curl -I http://localhost:3000 2>/dev/null | grep -i 'x-\|content-security\|strict-transport' || echo "No server running"`

3. Review environment config: @.env* for security-related variables

4. Check dependencies: `npm audit --audit-level=moderate 2>/dev/null || echo "Run dependency audit first"`

## 2. Hardening Focus Determination

1. Parse $ARGUMENTS to determine hardening areas:
   - --headers: Focus on security headers
   - --auth: Focus on authentication & authorization
   - --encryption: Focus on secure communication and data protection
   - --infrastructure: Focus on infrastructure security
   - Default: Comprehensive hardening

2. Prioritize hardening tasks based on focus area

3. Establish baseline security requirements

## 3. Authentication & Authorization Hardening

1. Implement Multi-Factor Authentication (MFA):
   - Configure MFA options (TOTP, SMS, email)
   - Add MFA enrollment flow
   - Implement backup codes

2. Implement Role-Based Access Control (RBAC):
   - Define roles and permissions
   - Create role assignment logic
   - Implement permission checks

3. Enhance session security:
   - Configure secure session storage
   - Implement session timeout
   - Add session fixation protection
   - Enable concurrent session management

4. Strengthen password policies:
   - Enforce minimum password complexity
   - Implement password history
   - Add password expiration policies
   - Configure account lockout mechanisms

## 4. Input Validation Hardening

1. Implement XSS prevention:
   - Add output encoding
   - Configure Content Security Policy
   - Sanitize user input
   - Implement context-aware escaping

2. Add SQL injection protection:
   - Use parameterized queries
   - Implement ORM safely
   - Add input validation
   - Configure database permissions

3. Implement CSRF protection:
   - Add CSRF tokens
   - Configure same-site cookies
   - Implement double-submit cookie pattern
   - Verify referer headers

4. Add general input validation:
   - Validate all user input
   - Implement whitelist validation
   - Add length and format checks
   - Configure file upload restrictions

## 5. Secure Communication Hardening

1. Implement HTTPS/TLS:
   - Configure SSL/TLS certificates
   - Enforce HTTPS redirection
   - Set minimum TLS version (1.2+)
   - Configure cipher suites

2. Add HTTP Strict Transport Security (HSTS):
   - Configure HSTS header
   - Set appropriate max-age
   - Include subdomains
   - Configure preload option

3. Implement certificate management:
   - Configure certificate renewal
   - Implement certificate pinning
   - Add certificate monitoring
   - Set up certificate validation

## 6. Data Protection Hardening

1. Implement encryption at rest:
   - Configure database encryption
   - Encrypt sensitive files
   - Implement field-level encryption
   - Configure encrypted backups

2. Implement encryption in transit:
   - Enforce TLS for all connections
   - Configure API encryption
   - Encrypt internal service communication
   - Add message-level encryption

3. Configure key management:
   - Implement key rotation
   - Use key management service
   - Configure key access controls
   - Add key backup and recovery

4. Add secure storage:
   - Configure secure password storage (bcrypt, Argon2)
   - Implement secure token storage
   - Add secrets management service
   - Configure encrypted configuration

## 7. Security Headers Hardening

1. Implement Content Security Policy (CSP):
   - Define CSP directives
   - Configure allowed sources
   - Add nonce or hash for inline scripts
   - Enable CSP reporting

2. Configure security response headers:
   - X-Frame-Options (DENY or SAMEORIGIN)
   - X-Content-Type-Options (nosniff)
   - X-XSS-Protection (1; mode=block)
   - Referrer-Policy
   - Permissions-Policy

3. Configure CORS properly:
   - Define allowed origins
   - Set allowed methods
   - Configure allowed headers
   - Implement credentials handling

4. Add cookie security attributes:
   - Set httpOnly flag
   - Set secure flag
   - Configure sameSite attribute
   - Implement cookie prefixes

## 8. Infrastructure Security Hardening

1. Implement container hardening:
   - Use minimal base images
   - Remove unnecessary packages
   - Configure resource limits
   - Implement security scanning
   - Run as non-root user

2. Configure network segmentation:
   - Implement VPC configuration
   - Configure security groups
   - Add network ACLs
   - Implement private subnets

3. Add monitoring and logging:
   - Configure security event logging
   - Implement intrusion detection
   - Add anomaly detection
   - Configure alerting system

4. Implement access controls:
   - Configure IAM policies
   - Implement least privilege
   - Add service accounts
   - Configure API rate limiting

## 9. Security Control Validation

1. Test all implemented security controls

2. Verify security headers configuration

3. Test authentication and authorization flows

4. Validate encryption implementation

5. Check monitoring and alerting functionality

6. Document all security control implementations

## 10. Documentation and Monitoring

1. Document all security configurations

2. Create security runbook

3. Configure security monitoring dashboards

4. Implement continuous security validation

5. Establish security review schedule

6. Provide hardened application with comprehensive security controls

</detailed_sequence_steps>

</task>
