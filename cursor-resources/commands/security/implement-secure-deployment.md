<task name="Implement Secure Deployment">

<task_objective>
Execute pre-deployment security audits and implement production-ready configuration for Next.js applications. This workflow automates scanning for hardcoded secrets, validates environment configurations, generates secure deployment configurations, implements monitoring code, and produces security verification scripts to ensure applications are deployment-ready.
</task_objective>

<detailed_sequence_steps>
# Implement Secure Deployment - Detailed Sequence of Steps

## 1. Scan Codebase for Security Issues

### 1.1 Search for Hardcoded Secrets
1. Use `grep` to scan for exposed secrets across all TypeScript/JavaScript files:
   ```
   pattern: "(api_key|API_KEY|apiKey|secret|SECRET|password|PASSWORD|token|TOKEN|bearer|BEARER)\s*[:=]\s*['\"][a-zA-Z0-9_\-]{16,}"
   type: ts
   output_mode: content
   ```

2. Search for UUID patterns that may be API keys or team IDs:
   ```
   pattern: "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}"
   type: ts
   output_mode: content
   ```

3. Scan for database connection strings with embedded credentials:
   ```
   pattern: "(postgres|mysql|mongodb)://.*:.*@"
   output_mode: content
   ```

4. Check configuration files for secrets:
   - Use `grep` to search `*.config.ts`, `*.config.js`, `*.json` files
   - Look for patterns: `key`, `secret`, `token`, `password`

5. **CRITICAL**: Report all findings to user with file paths and line numbers. Flag as BLOCKING if any secrets found.

### 1.2 Identify Debug Code and Test Routes
1. Search for console statements that shouldn't be in production:
   ```
   pattern: "console\.(log|debug|trace)"
   type: ts
   output_mode: count
   ```

2. Use `codebase_search` to find test and debug routes:
   - Query: "Where are test routes or debug endpoints defined?"
   - Target: ["app/api/", "app/("]

3. Search for development-only code blocks:
   ```
   pattern: "process\.env\.NODE_ENV\s*===\s*['\"]development['\"]"
   type: ts
   output_mode: content
   ```

4. Verify test routes have production guards:
   - For each test route found, read the file
   - Check for `if (process.env.NODE_ENV !== 'production')` guards
   - Report any unguarded test routes as HIGH PRIORITY

### 1.3 Audit Environment Variable Usage
1. Find all files using environment variables:
   ```
   pattern: "process\.env\."
   type: ts
   output_mode: files_with_matches
   ```

2. Read `.env.example` if it exists to compare documented vs actual usage

3. Use `codebase_search` to validate environment variable handling:
   - Query: "How are environment variables validated at startup?"
   - Target: ["lib/"]

4. Check for exposed server-side variables on client:
   ```
   pattern: "process\.env\.(?!NEXT_PUBLIC_)"
   path: "app/**/client"
   type: ts
   ```

## 2. Generate and Validate Production Configuration

### 2.1 Create or Update Environment Validation
1. Check if `lib/env.ts` exists using `read_file`

2. If missing or incomplete, generate environment validation using this prompt:
   ```
   Create a production-ready environment variable validation file at lib/env.ts using Zod. 
   Include schemas for: NODE_ENV (enum), DATABASE_URL (url string), NEXT_PUBLIC_SUPABASE_URL (url string), 
   SUPABASE_SERVICE_ROLE_KEY (string min 32 chars), and any other env vars found in the codebase. 
   Use z.object() with proper validation, parse process.env, and export typed env object. 
   Add helpful error messages for each field.
   ```

3. Write the generated validation to `lib/env.ts`

4. Update imports in key files to use validated env:
   - Search for direct `process.env` usage
   - Replace with imports from `@/lib/env`

### 2.2 Configure Next.js for Production Security
1. Read `next.config.ts` or `next.config.js`

2. Verify or add production security settings:
   - `reactStrictMode: true`
   - `poweredByHeader: false`
   - `productionBrowserSourceMaps: false`

3. If security headers not configured, generate headers configuration:
   ```
   Add a secure headers() async function to next.config.ts that returns security headers for all routes: 
   Strict-Transport-Security (max-age=31536000; includeSubDomains), 
   X-Frame-Options (DENY), 
   X-Content-Type-Options (nosniff), 
   X-XSS-Protection (1; mode=block),
   Referrer-Policy (strict-origin-when-cross-origin),
   Permissions-Policy (camera=(), microphone=(), geolocation=()).
   ```

4. Update `next.config.ts` with `search_replace` to add/modify security settings

### 2.3 Add Environment-Specific Guards
1. Use `codebase_search` to find routes that need production guards:
   - Query: "Where are database seed routes or admin test endpoints?"
   - Target: ["app/api/", "server/actions/"]

2. For each unguarded sensitive route, wrap logic with:
   ```typescript
   if (process.env.NODE_ENV === 'production') {
     return Response.json({ error: 'Not available in production' }, { status: 404 })
   }
   ```

3. Use `search_replace` to add guards to identified files

## 3. Implement Deployment Configuration Files

### 3.1 Generate GitHub Actions Security Workflow
1. Check if `.github/workflows/` exists, create if needed

2. Generate secure CI/CD workflow file:
   ```
   Create a GitHub Actions workflow at .github/workflows/security-check.yml that runs on pull requests to main. 
   Include jobs for: npm audit (audit-level=moderate), secret scanning using grep for common patterns, 
   TypeScript type checking, and running tests. Add a deployment job that only runs on main branch push, 
   uses GitHub secrets for deployment tokens, and includes a manual approval step for production.
   ```

3. Write workflow file to `.github/workflows/security-check.yml`

### 3.2 Create Vercel Configuration (if applicable)
1. Check if `vercel.json` exists

2. If deploying to Vercel, generate or update `vercel.json`:
   ```
   Create vercel.json with production-ready configuration including: 
   framework detection, build command, output directory, 
   environment variable requirements list (without values), 
   and security headers matching next.config.ts.
   ```

3. Write configuration to `vercel.json`

### 3.3 Generate Pre-Deployment Checklist
1. Create `.deployment-checklist.md` with automated verification steps:
   - List all environment variables needed (read from env.ts)
   - Security headers verification commands
   - Database migration status check
   - Dependency audit commands

2. Write checklist file (inform user this is for their reference)

## 4. Implement Monitoring and Logging Code

### 4.1 Create Structured Logger
1. Check if `lib/logger.ts` exists

2. If missing, generate structured logger:
   ```
   Create a production-ready structured logger at lib/logger.ts using console with JSON formatting. 
   Include methods: info(message, context), error(message, error, context), warn(message, context). 
   In production (NODE_ENV), format as JSON with timestamp, level, message, context. 
   In development, use readable console output. Never log sensitive fields like password, token, apiKey.
   Export singleton logger instance.
   ```

3. Write logger to `lib/logger.ts`

### 4.2 Add Security Event Logging
1. Use `codebase_search` to find authentication endpoints:
   - Query: "Where are user authentication and login functions implemented?"
   - Target: ["server/actions/auth.ts"]

2. Read authentication files and add security logging:
   - Failed login attempts
   - Account lockouts
   - Password reset requests
   - Suspicious activity

3. Generate logging wrapper using this prompt:
   ```
   Add structured security logging to the authentication function at [file path]. 
   Log failed authentication attempts with: timestamp, email (hashed), IP from headers, reason. 
   Log successful logins with: timestamp, user ID (not email), IP. 
   Use the logger from @/lib/logger. Never log passwords or tokens.
   ```

4. Update auth files with `search_replace` to add logging

### 4.3 Implement Rate Limiting Monitoring
1. Check if `lib/middleware/rate-limit.ts` exists by reading file

2. If rate limiting exists, verify it includes logging:
   - Read the rate-limit file
   - Check for logging on rate limit exceeded
   - If missing, add logging using `search_replace`

3. If rate limiting doesn't exist, generate it:
   ```
   Create a rate limiting middleware at lib/middleware/rate-limit.ts using in-memory Map store. 
   Track requests by IP from headers (x-forwarded-for). 
   Allow 100 requests per 15 minutes per IP. 
   Return success/failure status and remaining count. 
   Log to logger when rate limit exceeded with IP and endpoint. 
   Include cleanup to prevent memory leaks.
   ```

4. Write rate limit middleware and integrate into API routes

## 5. Generate Security Verification Scripts

### 5.1 Create Local Security Check Script
1. Generate a pre-deployment security check script:
   ```
   Create a Node.js script at scripts/security-check.js that:
   1. Scans all .ts/.tsx files for hardcoded secrets using regex
   2. Checks if .env is in .gitignore
   3. Verifies all env vars in code are in .env.example
   4. Checks for console.log in production code
   5. Runs npm audit and reports high+ vulnerabilities
   6. Outputs colored results (red=fail, green=pass, yellow=warning)
   Exit code 1 if any critical issues found.
   ```

2. Write script to `scripts/security-check.js`

3. Add script to `package.json`:
   - Read package.json
   - Add `"security:check": "node scripts/security-check.js"` to scripts
   - Update package.json with `search_replace`

### 5.2 Create Post-Deployment Verification Script
1. Generate deployment verification script:
   ```
   Create a Node.js script at scripts/verify-deployment.js that takes a URL argument and:
   1. Makes HEAD request to check HTTPS redirect
   2. Verifies security headers are present (Strict-Transport-Security, X-Frame-Options, etc.)
   3. Checks if /api/health responds with 200 (if health endpoint exists)
   4. Tests that /api/debug or /api/test returns 404 in production
   5. Outputs detailed report with pass/fail for each check
   Color code results and exit 1 if any critical checks fail.
   ```

2. Write script to `scripts/verify-deployment.js`

3. Add to package.json scripts as `"verify:deployment": "node scripts/verify-deployment.js"`

### 5.3 Generate Security Audit Report
1. Run comprehensive security analysis using `codebase_search`:
   - Query: "Where is sensitive data like passwords or tokens processed?"
   - Query: "Where are database queries constructed from user input?"
   - Query: "Where are authentication checks performed?"

2. Compile findings into structured report for user:
   - List all files handling sensitive data
   - Verify each has proper validation/sanitization
   - Check authentication is applied correctly
   - Identify any missing security controls

3. Format report as structured output:
   ```
   ## Pre-Deployment Security Audit Report
   
   ### Critical Issues: [count]
   [List with file:line]
   
   ### Warnings: [count]
   [List with file:line]
   
   ### Recommendations:
   [Actionable items]
   
   ### Security Checklist:
   - [ ] All secrets moved to environment variables
   - [ ] Environment validation implemented
   - [ ] Security headers configured
   - [ ] Rate limiting enabled
   - [ ] Logging infrastructure ready
   - [ ] Pre-deployment scripts passing
   ```

4. Present report to user and offer to fix any issues found

## 6. Execute Pre-Deployment Validation

### 6.1 Run Security Check Script
1. Execute the generated security check script:
   ```
   command: npm run security:check
   ```

2. If script fails, parse output and identify issues

3. Offer to fix each identified issue automatically

### 6.2 Run Dependency Audit
1. Execute npm audit:
   ```
   command: npm audit --audit-level=moderate --json
   ```

2. Parse JSON output for vulnerabilities

3. If fixable vulnerabilities found:
   ```
   command: npm audit fix
   ```

4. Report any remaining vulnerabilities to user

### 6.3 Validate TypeScript Configuration
1. Run TypeScript compiler in check mode:
   ```
   command: npx tsc --noEmit
   ```

2. If errors found, report to user with file locations

3. Verify `strict: true` in tsconfig.json

### 6.4 Final Checklist Confirmation
1. Present complete pre-deployment checklist to user:
   - ✅/❌ No hardcoded secrets found
   - ✅/❌ Environment validation implemented
   - ✅/❌ Production config secured
   - ✅/❌ Security headers configured
   - ✅/❌ Logging infrastructure added
   - ✅/❌ Rate limiting implemented
   - ✅/❌ Security scripts passing
   - ✅/❌ Dependencies audited
   - ✅/❌ TypeScript checks passing

2. Summarize all changes made:
   - Files created
   - Files modified
   - Scripts added
   - Configuration updated

3. Provide next steps for actual deployment:
   - Configure environment variables in deployment platform
   - Set NODE_ENV=production
   - Enable platform security features (DDoS protection, WAF)
   - Set up monitoring/alerting (Sentry, Datadog, etc.)
   - Run post-deployment verification script

</detailed_sequence_steps>

</task>

