<task name="Implement Secure HTTP Headers">

<task_objective>
Configure and audit secure HTTP headers across the application to protect against common web vulnerabilities including XSS attacks, clickjacking, and MIME-sniffing exploits. This command helps thi workflow ensures that Content-Security-Policy, X-Frame-Options, and X-Content-Type-Options headers are properly implemented on all endpoints, providing a foundational layer of security for the application.
</task_objective>

<detailed_sequence_steps>
# Implement Secure HTTP Headers - Detailed Sequence of Steps

## Overview
This workflow provides both proactive implementation and defensive auditing approaches for secure HTTP headers. Choose the appropriate path based on whether you're adding security headers to a new application or auditing an existing one.

---

## Path A: Proactive Implementation (New Setup)

### 1. Identify Application Framework and Entry Points

1. Determine the web framework being used (Next.js, Express, Django, etc.)
   
2. Locate the main configuration files or middleware setup:
   - Next.js: `next.config.ts` or `middleware.ts`
   - Express: Main app file or middleware directory
   - Django: `settings.py` or middleware configuration
   
3. Identify all entry points where HTTP responses are generated

4. Document the current state of header configuration (if any exists)

### 2. Configure Content-Security-Policy (CSP)

1. Create a CSP configuration that restricts resource loading:
   ```
   Content-Security-Policy: default-src 'self'
   ```

2. Identify legitimate external resources needed (CDNs, APIs, fonts):
   - Review all external script sources
   - List all external stylesheet sources
   - Document image and font sources
   - Identify any iframe requirements

3. Expand CSP directives to allow legitimate resources:
   ```
   Content-Security-Policy: default-src 'self'; 
     script-src 'self' https://trusted-cdn.com; 
     style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
     img-src 'self' data: https:;
     font-src 'self' https://fonts.gstatic.com
   ```

4. Add CSP reporting endpoint (optional but recommended):
   ```
   report-uri /csp-violation-report
   ```

5. Implement CSP header in framework-specific configuration

### 3. Configure X-Frame-Options

1. Determine framing requirements:
   - DENY: No framing allowed (most secure)
   - SAMEORIGIN: Allow framing only from same domain
   - ALLOW-FROM: Specific domain framing (deprecated in most browsers)

2. Set X-Frame-Options header:
   ```
   X-Frame-Options: DENY
   ```
   or
   ```
   X-Frame-Options: SAMEORIGIN
   ```

3. Implement in framework configuration alongside CSP

4. Consider using CSP frame-ancestors directive as modern alternative:
   ```
   Content-Security-Policy: frame-ancestors 'none'
   ```

### 4. Configure X-Content-Type-Options

1. Add the nosniff directive to prevent MIME-sniffing:
   ```
   X-Content-Type-Options: nosniff
   ```

2. Implement in framework configuration

3. Verify that all responses include proper Content-Type headers

### 5. Add Additional Recommended Security Headers

1. Implement Strict-Transport-Security (HSTS) for HTTPS enforcement:
   ```
   Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
   ```

2. Add Referrer-Policy to control referrer information:
   ```
   Referrer-Policy: strict-origin-when-cross-origin
   ```

3. Set Permissions-Policy to restrict browser features:
   ```
   Permissions-Policy: geolocation=(), microphone=(), camera=()
   ```

### 6. Framework-Specific Implementation

**For Next.js 15.3:**
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

**For Express.js:**
```typescript
import helmet from 'helmet'

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  },
  frameguard: { action: 'deny' },
  noSniff: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}))
```

### 7. Test Header Implementation

1. Start the application in development mode

2. Use browser DevTools Network tab to inspect response headers

3. Verify all three critical headers are present:
   - Content-Security-Policy
   - X-Frame-Options
   - X-Content-Type-Options

4. Test multiple endpoints to ensure consistency

5. Use online tools to validate headers:
   - securityheaders.com
   - Mozilla Observatory

---

## Path B: Defensive Audit (Existing Application)

### 1. Inventory All HTTP Endpoints

1. List all application routes and API endpoints

2. Document public vs. authenticated endpoints

3. Identify static asset serving configurations

4. Note any third-party integrations or proxy configurations

### 2. Audit Current Header Configuration

1. Use curl or browser DevTools to inspect headers on sample endpoints:
   ```bash
   curl -I https://your-domain.com
   ```

2. Check for presence of security headers:
   - Content-Security-Policy
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security
   - Referrer-Policy

3. Document which headers are missing or misconfigured

4. Run automated security header scanners:
   - securityheaders.com
   - Mozilla Observatory
   - OWASP ZAP

### 3. Analyze Content-Security-Policy

1. If CSP exists, evaluate its effectiveness:
   - Check for 'unsafe-inline' or 'unsafe-eval' (security risks)
   - Verify allowed sources are necessary and trusted
   - Look for overly permissive wildcards (*)

2. If CSP is missing, document the gap

3. Test for CSP bypass vulnerabilities:
   - Attempt to inject inline scripts
   - Try loading resources from unauthorized domains

4. Review CSP violation reports if logging is enabled

### 4. Evaluate X-Frame-Options Configuration

1. Check if X-Frame-Options header is present

2. If present, verify appropriate value (DENY or SAMEORIGIN)

3. Test clickjacking protection:
   - Attempt to embed the application in an iframe
   - Verify browser blocks unauthorized framing

4. Check for conflicts between X-Frame-Options and CSP frame-ancestors

### 5. Verify X-Content-Type-Options

1. Confirm X-Content-Type-Options is set to 'nosniff'

2. Check if all responses have proper Content-Type headers

3. Test MIME-sniffing protection:
   - Serve a text file with script extension
   - Verify browser doesn't execute it as script

### 6. Identify Missing or Weak Configurations

1. Create a comprehensive report of findings:
   - Missing headers by endpoint
   - Misconfigured headers with security implications
   - Inconsistent header application across routes

2. Prioritize findings by severity:
   - Critical: No CSP, no X-Frame-Options
   - High: Weak CSP with 'unsafe-inline'
   - Medium: Missing X-Content-Type-Options
   - Low: Suboptimal CSP directives

3. Document specific endpoints requiring remediation

### 7. Provide Remediation Recommendations

1. For each finding, specify:
   - Current state vs. desired state
   - Configuration changes needed
   - Code examples for implementation

2. Consider application-specific requirements:
   - Third-party integrations
   - Legacy browser support needs
   - Performance implications

3. Recommend implementation approach:
   - Framework-level vs. endpoint-level configuration
   - Use of security middleware packages (e.g., helmet for Express)

4. Suggest monitoring and maintenance practices:
   - Regular header audits
   - CSP violation reporting
   - Header testing in CI/CD pipeline

---

## Verification and Testing

### 1. Automated Testing

1. Add header checks to integration tests:
   ```typescript
   test('security headers are present', async () => {
     const response = await fetch('/api/endpoint')
     expect(response.headers.get('X-Frame-Options')).toBe('DENY')
     expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')
     expect(response.headers.get('Content-Security-Policy')).toContain("default-src 'self'")
   })
   ```

2. Integrate security header validation into CI/CD pipeline

3. Set up monitoring alerts for header configuration drift

### 2. Manual Validation

1. Test application functionality with new headers:
   - Verify all legitimate features work correctly
   - Check for CSP violations in browser console
   - Test embedded content if SAMEORIGIN is used

2. Validate across different browsers:
   - Chrome/Edge
   - Firefox
   - Safari

3. Test with security scanning tools:
   - OWASP ZAP
   - Burp Suite
   - Nmap with http-security-headers script

### 3. Documentation

1. Document the implemented security headers configuration

2. Create runbook for header updates when adding new features

3. Add security headers section to security documentation

4. Document any exceptions or special cases

</detailed_sequence_steps>

<prompts>

## Proactive Prompt

Integrate secure HTTP headers into our codebase to protect against common attacks such as XSS, clickjacking, and MIME sniffing. Update our configuration or middleware so that every HTTP response includes a Content-Security-Policy header (e.g., set to restrict resources to the same origin like `default-src 'self'`), an X-Frame-Options header (set to `DENY` or `SAMEORIGIN`), and an X-Content-Type-Options header (set to `nosniff`). Ensure these settings are consistently applied across all endpoints in the application.

## Defensive Prompt

Audit our codebase to verify that secure HTTP headers are implemented on all endpoints. Specifically, check that every HTTP response includes a Content-Security-Policy header (with restrictions such as `default-src 'self'`), an X-Frame-Options header (set to `DENY` or `SAMEORIGIN`), and an X-Content-Type-Options header (set to `nosniff`). Identify any instances where these headers are missing or misconfigured and provide detailed recommendations for remediation.

</prompts>

<security_headers_reference>

## Essential Security Headers

### Content-Security-Policy (CSP)
Helps prevent XSS attacks by restricting the sources from which content can be loaded.

**Basic Example:**
```
Content-Security-Policy: default-src 'self'
```

**Comprehensive Example:**
```
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' https://trusted-cdn.com; 
  style-src 'self' 'unsafe-inline'; 
  img-src 'self' data: https:; 
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  report-uri /csp-violation-report
```

### X-Frame-Options
Protects against clickjacking by controlling whether your page can be embedded in an iframe.

**Options:**
- `DENY` - Disallow framing entirely (most secure)
- `SAMEORIGIN` - Allow framing only from the same domain

### X-Content-Type-Options
Prevents browsers from MIME-sniffing a response away from the declared content type.

**Value:**
```
X-Content-Type-Options: nosniff
```

### Additional Recommended Headers

**Strict-Transport-Security (HSTS):**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**Referrer-Policy:**
```
Referrer-Policy: strict-origin-when-cross-origin
```

**Permissions-Policy:**
```
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

</security_headers_reference>

</task>