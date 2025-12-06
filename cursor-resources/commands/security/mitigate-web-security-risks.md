
<task name="Mitigate Common Web Security Risks">

<task_objective>
Perform scan codebase for XSS, CSRF, SQL/NoSQL injection, CORS misconfigurations, and missing security headers. This command helps fix all vulnerabilities by implementing sanitization, parameterized queries, CSRF tokens, restricted CORS policies, and secure headers.
</task_objective>

<detailed_sequence_steps>
# Agent Execution Steps

## 1. XSS Prevention Audit

1. Use `grep` to find all instances of `dangerouslySetInnerHTML` in `.tsx` and `.jsx` files.

2. For each match, read the file and verify if sanitization is implemented. If not, add DOMPurify sanitization.

3. Search for `next.config.ts` or `next.config.js` to check CSP headers. If missing, add CSP configuration in headers section with restrictive policies.

4. Use `codebase_search` to find "Where are user inputs rendered without escaping?" and fix any direct HTML rendering.

## 2. CSRF Protection Implementation

1. Use `grep` to find all Server Actions (files with `"use server"` directive).

2. For each Server Action that mutates state, verify CSRF token validation exists. Add if missing.

3. Search for cookie configuration in authentication files using `codebase_search` query "How are authentication cookies configured?".

4. Update cookie settings to include `SameSite=Strict`, `HttpOnly=true`, and `Secure=true` flags.

5. Use `grep` to find API route files in `app/api` directory and add origin validation headers.

## 3. SQL/NoSQL Injection Prevention

1. Use `grep` with pattern `\$\{.*\}` in database query files to find string interpolation in queries.

2. Use `codebase_search` to find "Where are database queries constructed with user input?".

3. Replace all string concatenation with parameterized Supabase query builder methods.

4. Search for validation schemas using `grep` pattern `z\.object` to find Zod schemas. Add input validation before all database operations.

5. Check `supabase/migrations` directory for RLS policies. Add if missing.

## 4. CORS Configuration Hardening

1. Use `grep` to search for CORS configuration: patterns `Access-Control-Allow-Origin`, `cors()`, or CORS middleware.

2. Identify any wildcard (`"*"`) origins and replace with explicit whitelist array.

3. Read `middleware.ts` and add/update CORS validation function that checks origin against whitelist.

4. For Next.js API routes, add origin validation in each handler or create shared middleware.

## 5. HTTPS/HSTS Enforcement

1. Read `next.config.ts` and check if security headers exist in `headers()` function.

2. Add HSTS header with `Strict-Transport-Security: max-age=31536000; includeSubDomains` if missing.

3. Use `grep` to find hardcoded `http://` URLs (exclude localhost) and replace with `https://`.

4. Check deployment config files (`vercel.json`, `.platform` files) for HTTPS enforcement.

## 6. Final Validation

1. Use `grep` to search for common vulnerability patterns:
   - `eval(`
   - `innerHTML =`
   - `new Function(`
   - SQL string templates

2. Run `npm audit` via terminal to check dependency vulnerabilities.

3. Generate summary report listing:
   - Files modified
   - Vulnerabilities fixed
   - Remaining manual verification items (deployment configs, external services)

</detailed_sequence_steps>

<proactive_usage_example>
"Implement comprehensive web security: add CSP headers, CSRF tokens on all mutations, parameterize all queries, whitelist CORS origins, and enforce HSTS."
</proactive_usage_example>

<defensive_usage_example>
"Audit codebase for XSS, CSRF, injection, CORS, and HTTPS vulnerabilities. Report all findings with file locations and fix recommendations."
</defensive_usage_example>

</task>

