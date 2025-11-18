<task name="Comprehensive Security Audit for AI-Generated Applications">

<task_objective>
Perform a systematic, multi-layered security audit of an AI-generated full-stack application by analyzing code, dependencies, configurations, and deployment settings. Identify vulnerabilities, hardcoded secrets, insecure patterns, and compliance gaps. Generate actionable remediation steps and verify fixes through automated testing and validation.
</task_objective>

<detailed_sequence_steps>

## Phase 1: Initial Codebase Security Analysis

### Step 1.1: Identify Application Structure and Technology Stack

1. Use `list_dir` on the root directory to understand project structure.

2. Use `read_file` on `package.json`, `requirements.txt`, `go.mod`, or similar dependency files to identify the technology stack.

3. Use `glob_file_search` with patterns like `**/*.env*`, `**/config/**`, `**/*.config.*` to locate configuration files.

4. Use `codebase_search` with query "What authentication system is implemented in this application?" to understand auth architecture.

5. Document findings about application type (Next.js, Express, Django, etc.), database systems, and authentication methods.

### Step 1.2: Scan for Hardcoded Secrets and Credentials

1. Use `grep` with pattern `(api[_-]?key|secret|password|token|bearer|auth[_-]?token|private[_-]?key|jwt[_-]?secret)[\s]*[=:][\s]*['"]\w+` across all source files to find potential secrets.

2. Use `grep` with pattern `[a-f0-9]{32,}|[A-Za-z0-9+/]{40,}={0,2}` to locate hex strings and base64-encoded values that may be tokens.

3. Use `codebase_search` with query "Where are API keys or secrets hardcoded in the codebase?" to find semantic instances.

4. Use `read_file` on any flagged files to verify if values are actual secrets or legitimate constants.

5. For each hardcoded secret found, use `search_replace` to replace with environment variable references like `process.env.SECRET_NAME`.

6. Use `write` to create or update `.env.example` file with placeholder values for required environment variables.

### Step 1.3: Review Debug and Test Configurations

1. Use `grep` with pattern `(debug|DEBUG)[\s]*[=:][\s]*(true|True|1)` to find debug mode configurations.

2. Use `codebase_search` with query "Where is verbose logging or debug output configured?" to identify logging settings.

3. Use `read_file` on any environment or config files to check for development-only settings.

4. Use `search_replace` to change debug flags to use environment variables or remove development-only code paths.

## Phase 2: Static Analysis and Linting

### Step 2.1: Run Automated Security Linters

1. Use `read_file` on `package.json` to check if security tools (ESLint, Snyk, npm-audit) are configured.

2. Use `run_terminal_cmd` with command `npm audit --json` or `npm audit` to identify known vulnerabilities in dependencies.

3. Use `run_terminal_cmd` with command `npx eslint . --ext .js,.jsx,.ts,.tsx` to run linting if ESLint is configured.

4. Use `read_lints` to capture all linter errors and warnings from the workspace.

5. Analyze linter output for security-related issues like unsafe eval usage, innerHTML assignments, or SQL string concatenation.

### Step 2.2: Analyze and Categorize Security Issues

1. Parse linter and audit results to categorize issues by severity (critical, high, medium, low).

2. Use `codebase_search` for each critical vulnerability pattern to understand context and impact.

3. Use `todo_write` to create task items for each security issue requiring remediation, organized by priority.

4. Document findings in structured format with file paths, line numbers, vulnerability types, and recommended fixes.

### Step 2.3: Address Critical Vulnerabilities

1. For each critical issue, use `read_file` to examine the vulnerable code section with context.

2. Use `search_replace` to implement fixes for straightforward issues like upgrading dependency versions in `package.json`.

3. For complex vulnerabilities requiring architectural changes, use `codebase_search` to find all affected areas.

4. Use `run_terminal_cmd` with `npm install` or equivalent to apply dependency updates.

5. Use `read_lints` again to verify that fixes resolved the issues without introducing new errors.

## Phase 3: Dependency Security Verification

### Step 3.1: Audit All Project Dependencies

1. Use `read_file` on `package.json`, `package-lock.json`, or language-specific lock files.

2. Use `run_terminal_cmd` with `npm list --depth=0` to view direct dependencies.

3. Use `run_terminal_cmd` with `npm audit fix --dry-run` to preview automatic fixes.

4. Use `grep` with pattern `"(test|mock|debug|dev-only)"` in dependency names to identify development dependencies that shouldn't be in production.

5. Cross-reference dependencies against known vulnerability databases by using `web_search` for suspicious or outdated packages.

### Step 3.2: Lock Dependency Versions and Remove Unnecessary Packages

1. Use `read_file` on `package.json` to identify packages with loose version ranges (^, ~, *).

2. Use `search_replace` in `package.json` to change version ranges to exact versions.

3. Identify unused dependencies by using `codebase_search` with query "Where is [package-name] imported or used?" for each dependency.

4. Use `search_replace` to remove unused dependencies from `package.json`.

5. Use `run_terminal_cmd` with `npm install` to regenerate lock files with fixed versions.

6. Use `run_terminal_cmd` with `npm dedupe` to optimize dependency tree and reduce duplicate packages.

## Phase 4: Authentication and Authorization Security

### Step 4.1: Review Authentication Implementation

1. Use `codebase_search` with query "How is user authentication handled in this application?" to locate auth logic.

2. Use `grep` with pattern `(password|auth|login|session|token)` across authentication-related files.

3. Use `read_file` on authentication middleware, route handlers, and session management files.

4. Verify password hashing by using `grep` with pattern `(bcrypt|argon2|scrypt|pbkdf2)` to ensure strong algorithms are used.

5. Check for JWT implementation by using `grep` with pattern `(jwt|jsonwebtoken)` and verify signing algorithms are not set to 'none'.

### Step 4.2: Verify Session and Cookie Security

1. Use `codebase_search` with query "Where are cookies configured and what security flags are set?" to find cookie settings.

2. Use `grep` with pattern `(httpOnly|secure|sameSite)` to check if security flags are properly configured.

3. Use `read_file` on middleware or server configuration files to examine session settings.

4. Use `search_replace` to add or fix cookie security flags: `httpOnly: true, secure: true, sameSite: 'strict'`.

5. Verify session timeout configurations by using `grep` with pattern `(maxAge|expires)` in session settings.

### Step 4.3: Audit Access Control and Authorization

1. Use `codebase_search` with query "How are user roles and permissions enforced throughout the application?" to understand RBAC implementation.

2. Use `grep` with pattern `(authorize|permission|role|admin)` to locate authorization checks.

3. Use `read_file` on API route handlers and protected endpoints to verify authorization middleware is applied.

4. Check for insecure direct object references by using `codebase_search` with query "Where do API endpoints accept user IDs or resource IDs as parameters?"

5. Verify that all protected routes have proper authorization checks before accessing resources.

## Phase 5: Input Validation and Sanitization

### Step 5.1: Identify All Input Points

1. Use `codebase_search` with query "Where does the application accept user input from forms, APIs, or query parameters?" to map attack surface.

2. Use `grep` with pattern `(req\.body|req\.query|req\.params|formData|searchParams)` to find input handling in backend code.

3. Use `grep` with pattern `(onChange|onSubmit|value=|input|textarea)` to find input handling in frontend code.

4. Use `list_dir` on API route directories to enumerate all API endpoints.

5. Document all input vectors including HTTP methods, parameters, and expected data types.

### Step 5.2: Verify Input Validation is Present

1. For each input point, use `read_file` to examine validation logic.

2. Use `grep` with pattern `(zod|yup|joi|validator|validate)` to check if validation libraries are used.

3. Use `codebase_search` with query "Where is input validation implemented for API endpoints?" to find validation middleware.

4. Check for SQL injection vulnerabilities by using `grep` with pattern `(\$\{.*\}|concat|execute.*query)` in database query construction.

5. Check for XSS vulnerabilities by using `grep` with pattern `(dangerouslySetInnerHTML|innerHTML|eval)` in frontend code.

### Step 5.3: Implement Missing Validation

1. For endpoints lacking validation, use `codebase_search` to find similar endpoints with proper validation as reference.

2. Use `read_file` on validation schema files or middleware to understand validation patterns.

3. Use `search_replace` to add validation middleware or schema definitions for unprotected endpoints.

4. Ensure all string inputs have length limits by checking for `.max()` or length validation in schemas.

5. Verify numeric inputs have range validation and type checking.

## Phase 6: Vulnerability Testing

### Step 6.1: Test for Common Web Vulnerabilities

1. Use `codebase_search` with query "Where are database queries constructed and executed?" to identify SQL injection risks.

2. Use `grep` with pattern `(SELECT|INSERT|UPDATE|DELETE).*\+.*\$\{` to find string concatenation in queries.

3. Use `codebase_search` with query "Where does the application render user-supplied content in HTML?" to identify XSS risks.

4. Use `grep` with pattern `<form.*method="POST".*>` to locate forms and check for CSRF protection.

5. Use `codebase_search` with query "Is CSRF protection implemented for all POST, PUT, DELETE endpoints?" to verify protection.

### Step 6.2: Check for Server-Side Security Issues

1. Use `codebase_search` with query "Where are file uploads handled and validated?" to assess file upload vulnerabilities.

2. Use `grep` with pattern `(upload|multer|formidable|file)` to locate file handling code.

3. Use `read_file` on file upload handlers to check for proper validation of file types, sizes, and names.

4. Use `codebase_search` with query "Where are external URLs or redirects constructed from user input?" to find open redirect vulnerabilities.

5. Use `grep` with pattern `(redirect|location\.href|window\.location)` to verify redirect destinations are validated.

### Step 6.3: Document Testing Results

1. Use `todo_write` to create tasks for each identified vulnerability with severity level and affected files.

2. For each vulnerability, document the attack vector, potential impact, and recommended remediation.

3. Prioritize critical vulnerabilities (SQL injection, authentication bypass, XSS) for immediate remediation.

## Phase 7: Secrets and Configuration Security

### Step 7.1: Verify Environment Variable Usage

1. Use `grep` with pattern `process\.env|import\.meta\.env|os\.environ` to find environment variable usage.

2. Use `read_file` on `.env`, `.env.local`, `.env.example` files to compare required vs. documented variables.

3. Use `grep` with pattern `\.env$` in `.gitignore` to ensure environment files are excluded from version control.

4. Use `run_terminal_cmd` with `git log --all --full-history -- "*.env"` to check if env files were ever committed.

5. If secrets were committed, document the need for secret rotation and git history cleanup.

### Step 7.2: Audit Configuration Files

1. Use `glob_file_search` with pattern `**/config/**/*.{js,json,yaml,yml,toml}` to find all configuration files.

2. Use `read_file` on each configuration file to check for hardcoded production values, credentials, or sensitive URLs.

3. Use `codebase_search` with query "How is application configuration loaded and where are production settings defined?" to understand config architecture.

4. Verify that different environments (dev, staging, prod) use separate configurations and secrets.

5. Use `search_replace` to replace any hardcoded production values with environment variable references.

### Step 7.3: Validate Secret Management Practices

1. Use `web_search` with search term "best practices for secret management in [framework-name]" to get current recommendations.

2. Verify secrets are encrypted at rest if stored in configuration management systems.

3. Check for secret rotation policies by using `codebase_search` with query "How are secrets rotated and updated in this application?"

4. Document recommendations for secret management services (AWS Secrets Manager, Vault, etc.) if not already implemented.

## Phase 8: HTTP Security Headers

### Step 8.1: Identify Current Header Configuration

1. Use `codebase_search` with query "Where are HTTP security headers configured in the application?" to locate header middleware.

2. Use `grep` with pattern `(helmet|header|Content-Security-Policy|X-Frame-Options|Strict-Transport-Security)` to find header-related code.

3. Use `read_file` on server configuration files, middleware files, or Next.js config to examine current headers.

4. Use `run_terminal_cmd` with `curl -I http://localhost:3000` to test actual headers being sent (if server is running).

### Step 8.2: Implement Missing Security Headers

1. Check for Content-Security-Policy by using `grep` with pattern `Content-Security-Policy` and verify it's restrictive enough.

2. Verify X-Frame-Options is set to DENY or SAMEORIGIN by using `grep` with pattern `X-Frame-Options`.

3. Check for Strict-Transport-Security (HSTS) header for HTTPS enforcement.

4. Use `search_replace` to add or update security headers in middleware or configuration files.

5. Implement headers: CSP, X-Content-Type-Options: nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy.

### Step 8.3: Configure Framework-Specific Security

1. For Next.js, use `read_file` on `next.config.js` or `next.config.ts` to check headers configuration.

2. Use `search_replace` to add security headers in the Next.js config's `headers()` function.

3. For Express, verify `helmet` middleware is installed and properly configured.

4. Use `codebase_search` to ensure headers are applied globally, not just on specific routes.

## Phase 9: Deployment Security Configuration

### Step 9.1: Verify Production Environment Settings

1. Use `grep` with pattern `NODE_ENV|ENVIRONMENT|ENV` to find environment detection code.

2. Use `read_file` on deployment configuration files (vercel.json, Dockerfile, docker-compose.yml, etc.).

3. Verify that `NODE_ENV=production` is set in production deployments.

4. Use `codebase_search` with query "What differences exist between development and production configurations?" to identify environment-specific settings.

5. Check that source maps are disabled in production by using `grep` with pattern `(sourcemap|sourceMap)` in build configs.

### Step 9.2: Enforce HTTPS and Secure Endpoints

1. Use `read_file` on deployment configurations to verify HTTPS is enforced.

2. Use `grep` with pattern `(http:|protocol.*http)` to find any hardcoded HTTP URLs that should be HTTPS.

3. Use `search_replace` to change HTTP URLs to HTTPS or use protocol-relative URLs.

4. Verify redirect from HTTP to HTTPS is configured at the infrastructure level.

5. Check that sensitive endpoints (auth, payment, admin) are protected by using `codebase_search` with query "Which endpoints handle sensitive operations and how are they protected?"

### Step 9.3: Configure Access Restrictions

1. Use `codebase_search` with query "Are there admin or internal endpoints that need IP whitelisting or additional protection?" to identify privileged routes.

2. Use `read_file` on API routes to check for rate limiting middleware on authentication and sensitive endpoints.

3. Verify CORS configuration by using `grep` with pattern `(cors|Access-Control-Allow-Origin)` to ensure it's not overly permissive.

4. Use `read_file` on server configuration to check if unnecessary HTTP methods are disabled.

5. Document recommendations for infrastructure-level protections (WAF, DDoS protection, etc.).

### Step 9.4: Review Logging and Monitoring Configuration

1. Use `codebase_search` with query "What logging and error tracking systems are configured in production?" to understand observability setup.

2. Use `grep` with pattern `(console\.log|logger|winston|pino)` to find logging implementations.

3. Verify sensitive data (passwords, tokens) is not logged by using `grep` with pattern `log.*password|log.*token|log.*secret`.

4. Use `read_file` on logging configuration to check log levels are appropriate for production (info/warn/error, not debug).

5. Check that error messages don't expose stack traces or internal details to end users.

## Phase 10: Continuous Security Monitoring

### Step 10.1: Set Up Automated Security Checks

1. Use `read_file` on `.github/workflows` or CI/CD config files to check for security scanning in pipelines.

2. Verify `npm audit` or equivalent runs in CI/CD by using `grep` with pattern `npm audit|snyk|dependabot` in workflow files.

3. Use `write` to create or update GitHub Actions workflow for automated security scanning if missing.

4. Document schedule for regular dependency updates and security reviews.

5. Set up automated alerts for new vulnerabilities by configuring Dependabot or Snyk monitoring.

### Step 10.2: Create Security Incident Response Plan

1. Use `codebase_search` with query "What is the rollback or emergency deployment procedure?" to understand existing processes.

2. Document steps for immediate response to security incidents: rollback procedure, hotfix deployment, communication plan.

3. Verify database backup and restore procedures are documented and tested.

4. Use `read_file` on deployment scripts to understand rollback capabilities.

5. Create documentation for security incident triage: how to assess severity, who to notify, and remediation workflows.

### Step 10.3: Generate Security Audit Report

1. Compile all findings from previous phases into a structured report.

2. Categorize issues by severity: Critical (immediate action), High (fix within 48h), Medium (fix within 2 weeks), Low (fix opportunistically).

3. For each issue, provide: description, affected files/lines, potential impact, remediation steps, and references.

4. Use `todo_write` to update task list with all remaining security work items, prioritized by severity.

5. Document completed fixes and verification steps taken during the audit.

## Phase 11: Verification and Final Checks

### Step 11.1: Run Complete Test Suite

1. Use `run_terminal_cmd` with `npm test` or equivalent to run all tests and ensure security fixes didn't break functionality.

2. Use `read_lints` to verify no new linting errors were introduced by security fixes.

3. Use `run_terminal_cmd` with `npm run build` to verify application builds successfully with all security changes.

4. Review test coverage for security-critical code paths by using `run_terminal_cmd` with coverage commands.

### Step 11.2: Perform Final Security Validation

1. Use `grep` with original secret patterns again to confirm no hardcoded secrets remain.

2. Use `run_terminal_cmd` with `npm audit` to confirm all critical and high severity vulnerabilities are resolved.

3. Use `codebase_search` with query "Are there any remaining TODO or FIXME comments related to security?" to find incomplete work.

4. Verify all items in security todo list are marked as completed or scheduled.

5. Use `web_search` to check for any recent security advisories for the frameworks and libraries used.

### Step 11.3: Document Security Posture

1. Summarize the security improvements made during the audit.

2. List all remaining known issues or technical debt with security implications.

3. Provide recommendations for ongoing security practices: code review checklists, security training, penetration testing schedule.

4. Update project documentation to include security guidelines for contributors.

5. Mark the security audit as complete with timestamp and version information.

</detailed_sequence_steps>

</task>

