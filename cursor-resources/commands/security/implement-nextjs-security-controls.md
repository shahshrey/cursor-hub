<task name="Implement Next.js Security Controls">

<task_objective>
Implement comprehensive security controls for Next.js applications focusing on SSR/SSG data exposure prevention, XSS mitigation, and Content Security Policy configuration. This workflow guides both proactive implementation and defensive auditing of security measures to protect against common web vulnerabilities in server-side rendered and statically generated applications.
</task_objective>

<detailed_sequence_steps>
# Next.js Security Controls Implementation - Detailed Sequence of Steps

## 1. Prevent Accidental Data Exposure in SSR/SSG

### 1.1 Proactive Implementation

1. Review all server-side components and identify data flows from server to client.

2. Integrate safeguards into server-side components and data-handling logic to ensure only non-sensitive data is sent to the client.

3. Update data serialization processes to strip or mask sensitive information before rendering:
   - User credentials
   - Private identifiers
   - Security tokens
   - API keys
   - Internal system identifiers

4. Use the following prompt with Cursor:

```
Integrate safeguards into our server-side components and data-handling logic to ensure that only non-sensitive data is sent to the client. Review and update our data serialization processes so sensitive information—such as user credentials, private identifiers, or security tokens—is stripped or masked before rendering or sending responses.
```

### 1.2 Defensive Audit

1. Audit the codebase to verify all server-side components transmit only non-sensitive data.

2. Identify areas where sensitive information might be unintentionally exposed.

3. Use the following prompt with Cursor:

```
Audit our codebase to verify that all server-side components and API responses only transmit non-sensitive data to the client. Identify any areas where sensitive information might be unintentionally exposed and provide specific remediation recommendations to minimize data exposure.
```

4. Document all findings and create remediation tasks for identified vulnerabilities.

## 2. Implement XSS Prevention Through Output Escaping

### 2.1 Proactive Implementation

1. Verify all dynamic content rendering uses React's default escaping mechanism.

2. Audit all instances of `dangerouslySetInnerHTML` in the codebase.

3. For cases where raw HTML is necessary:
   - Install DOMPurify: `npm install dompurify @types/dompurify`
   - Import and configure DOMPurify in affected components
   - Sanitize all HTML content before rendering

4. Use the following prompt with Cursor:

```
Update our React application codebase to ensure all output is securely escaped to prevent XSS. Confirm that we rely on React's default escaping mechanism and avoid using dangerouslySetInnerHTML with unsanitized content. For cases where raw HTML is necessary, integrate DOMPurify to sanitize the content before rendering and document these changes with inline comments explaining how they mitigate XSS vulnerabilities.
```

5. Add inline documentation explaining XSS mitigation for each sanitization point.

### 2.2 Defensive Audit

1. Scan codebase for all dynamic content rendering points.

2. Verify output escaping is consistently implemented.

3. Check all `dangerouslySetInnerHTML` instances have proper sanitization.

4. Use the following prompt with Cursor:

```
Audit our codebase to verify that output escaping is consistently implemented to prevent XSS. Ensure that all dynamic content is rendered using React's default escaping and that any instance of `dangerouslySetInnerHTML` is accompanied by proper sanitization via `DOMPurify` or an equivalent library. Identify any occurrences where unsanitized HTML might be used and provide detailed recommendations for remediation.
```

5. Create a vulnerability report with specific file locations and remediation steps.

## 3. Configure Content Security Policy (CSP)

### 3.1 Proactive Implementation

1. Determine appropriate CSP directives for the application:
   - `default-src 'self'` as baseline
   - Explicitly allow trusted external resources
   - Configure script-src, style-src, img-src, etc. as needed

2. For Next.js applications, configure CSP in one of the following locations:
   - `next.config.ts` using headers configuration
   - `middleware.ts` for dynamic CSP
   - Server configuration (if using custom server)

3. Document all CSP exceptions with justifications.

4. Use the following prompt with Cursor:

```
Integrate a strict Content Security Policy (CSP) into our project by configuring our server or platform to send CSP headers that restrict content sources to trusted origins (e.g., using `default-src 'self'` and additional directives as needed). Ensure all external resources are explicitly allowed and document exceptions with justifications.
```

5. Test CSP implementation in development environment to identify violations.

### 3.2 Defensive Audit

1. Verify every HTTP response includes CSP headers.

2. Check CSP configuration is not overly permissive.

3. Use the following prompt with Cursor:

```
Audit our codebase to verify that every HTTP response includes a strict CSP header limiting content sources to trusted domains. Identify any endpoints or configurations where the CSP is missing or overly permissive and provide detailed recommendations for tightening the policy.
```

4. Use browser developer tools to monitor CSP violations in production.

5. Document all CSP violations and create tasks to resolve them.

## 4. Validation and Testing

### 4.1 Automated Security Testing

1. Set up automated security scanning tools:
   - ESLint security plugins
   - npm audit for dependency vulnerabilities
   - OWASP ZAP or similar for penetration testing

2. Create test cases for each security control:
   - Data exposure tests
   - XSS injection tests
   - CSP violation tests

3. Integrate security tests into CI/CD pipeline.

### 4.2 Manual Security Review

1. Conduct code review focusing on security controls.

2. Perform manual penetration testing:
   - Attempt XSS injections
   - Inspect network responses for sensitive data
   - Verify CSP headers in browser tools

3. Document findings and create remediation tasks.

## 5. Documentation and Monitoring

### 5.1 Security Documentation

1. Document all implemented security controls.

2. Create runbook for security incident response.

3. Maintain changelog of security updates.

### 5.2 Ongoing Monitoring

1. Set up security monitoring and alerting:
   - CSP violation reporting endpoint
   - Error tracking for security-related issues
   - Regular security audit schedule

2. Review security logs regularly.

3. Keep dependencies updated and monitor security advisories.

</detailed_sequence_steps>

<example_implementation>
## Example: Implementing DOMPurify Sanitization

```typescript
'use client'

import DOMPurify from 'dompurify'

interface ContentDisplayProps {
  htmlContent: string
}

export function ContentDisplay({ htmlContent }: ContentDisplayProps) {
  const sanitizedHTML = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href']
  })

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  )
}
```

## Example: Next.js CSP Configuration

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' blob: data:",
              "font-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

export default nextConfig
```

## Example: Server-Side Data Sanitization

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'

interface PublicUserData {
  id: string
  username: string
  avatarUrl: string
}

export async function getUserPublicData(userId: string): Promise<PublicUserData> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, email, auth_token')
    .eq('id', userId)
    .single()

  if (error) throw error

  return {
    id: data.id,
    username: data.username,
    avatarUrl: data.avatar_url
  }
}
```
</example_implementation>

<security_checklist>
## Pre-Deployment Security Checklist

- [ ] All server-side components only send non-sensitive data to client
- [ ] No instances of unsanitized `dangerouslySetInnerHTML`
- [ ] DOMPurify installed and configured for all raw HTML rendering
- [ ] CSP headers configured and tested
- [ ] All external resources explicitly allowed in CSP
- [ ] Automated security tests passing
- [ ] Manual penetration testing completed
- [ ] Security documentation updated
- [ ] CSP violation reporting configured
- [ ] Security monitoring and alerting active
</security_checklist>

</task>

