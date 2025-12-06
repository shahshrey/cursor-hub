<task name="Secure Next.js SSR/SSG Application">

<task_objective>
Perform secure Next.js server-side rendering (SSR) and static site generation (SSG) applications by preventing data exposure, eliminating XSS vulnerabilities, and implementing Content Security Policy. This command helps execute systematic audits and implement hardening measures across server components, client rendering, and HTTP security headers.
</task_objective>

<detailed_sequence_steps>
# Secure Next.js SSR/SSG Application - Agent Execution Steps

## 1. Audit and Secure Server-Side Data Exposure

1. Use `codebase_search` with query: "Where are server components returning database data to the client in Next.js?" and target_directories: []

2. Use `grep` with pattern `"use server"` and path `server/` to locate all Server Actions

3. Use `grep` with pattern `(getServerSideProps|getStaticProps)` to find legacy data fetching methods

4. Use `grep` with pattern `(supabase\.from|prisma\.|db\.).*\.select` in path `server/` to identify database queries

5. For each file found containing server data functions:
   - Use `read_file` to analyze what data is being returned
   - Check if full database objects with sensitive fields are passed to client
   - Identify fields like: password, token, api_key, secret, private_key, session_id, email (when not needed)

6. Use `grep` with pattern `process\.env` in paths `app/` and `components/` to find exposed environment variables

7. Check if `lib/utils.ts` exists using `read_file`

8. If sanitization utilities don't exist in `lib/utils.ts`, use `search_replace` to add:
   - `sanitizeForClient` function that strips sensitive fields using object destructuring
   - TypeScript type definitions for client-safe data (e.g., `ClientSafeUser`, `ClientSafeProfile`)

9. For each vulnerable server function identified:
   - Use `search_replace` to wrap return data with sanitization function
   - Ensure only explicitly allowlisted fields are sent to client
   - Update TypeScript return types to use client-safe types

10. For any environment variable exposure in client code, use `search_replace` to remove or relocate to server-only code

## 2. Eliminate XSS Vulnerabilities

1. Use `grep` with pattern `dangerouslySetInnerHTML` across entire codebase to locate all occurrences

2. Use `grep` with pattern `\.innerHTML\s*=` to find direct innerHTML manipulation

3. Use `grep` with pattern `insertAdjacentHTML` to find additional DOM injection points

4. Use `grep` with pattern `\$\{[^}]*<[a-z]` to find template literals building HTML strings

5. Use `grep` with pattern `"dompurify"` in `package.json` to check if DOMPurify is installed

6. If DOMPurify not found in package.json, use `run_terminal_cmd` with:
   - command: `npm install dompurify @types/dompurify`
   - required_permissions: ["network"]

7. Use `read_file` on `lib/utils.ts` to check for existing `sanitizeHTML` function

8. If `sanitizeHTML` doesn't exist, use `search_replace` to add it to `lib/utils.ts`:
   - Import DOMPurify
   - Create `sanitizeHTML` function with restricted ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li']
   - Set ALLOWED_ATTR: ['href', 'target', 'rel']

9. For each `dangerouslySetInnerHTML` occurrence found:
   - Use `read_file` to examine surrounding code context
   - Use `search_replace` to wrap the HTML content with `sanitizeHTML()` function
   - Ensure sanitized content is passed to `__html` property

10. For any unsafe template literal HTML found, use `search_replace` to convert to JSX components or sanitized functions

11. Use `grep` with pattern `v-html|ng-bind-html` to check for framework-specific unsafe HTML rendering if other frameworks detected

## 3. Implement Content Security Policy

1. Use `read_file` on `middleware.ts` to check current CSP configuration

2. Use `grep` with pattern `Content-Security-Policy` in `middleware.ts` to verify CSP header existence

3. If CSP is missing, weak, or contains `unsafe-inline`, `unsafe-eval`, or wildcard `*`:
   - Use `search_replace` on `middleware.ts` to add/update CSP header in response
   - Implement strict CSP baseline: `default-src 'self'`
   - Add `script-src 'self' 'nonce-{NONCE}' 'strict-dynamic'` with nonce generation
   - Add `style-src 'self' 'nonce-{NONCE}'`
   - Add `img-src 'self' blob: data: https:`
   - Add `font-src 'self'`
   - Add `object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`
   - Add `upgrade-insecure-requests` directive

4. Use `grep` with pattern `(src=["']https?://[^"']+|href=["']https?://[^"']+)` in paths `app/` and `components/` to find external resources

5. For each unique external domain identified:
   - Determine resource type (script, style, image, font, connect)
   - Use `search_replace` to add domain to appropriate CSP directive
   - Add inline code comment explaining why external source is necessary

6. Use `read_file` on `next.config.ts` to check for headers configuration

7. If headers array exists in `next.config.ts`, verify CSP matches `middleware.ts` using `read_file` comparison

8. If CSP in `next.config.ts` conflicts with `middleware.ts`, use `search_replace` to synchronize them

9. Use `grep` with pattern `<script[^>]*src=["']https?://[^"']+[^>]*>(?!.*integrity=)` to find external scripts missing Subresource Integrity (SRI)

## 4. Verification and Reporting

1. Use `grep` with pattern `dangerouslySetInnerHTML` to verify all occurrences now include `sanitizeHTML` wrapper

2. Use `grep` with pattern `process\.env\.(?!NEXT_PUBLIC_)[A-Z_]+` in paths `app/` and `components/` to catch remaining secret leaks

3. Use `read_file` on `middleware.ts` to confirm final CSP configuration is strict and complete

4. Use `read_lints` on all modified files to identify TypeScript errors or warnings

5. Generate comprehensive security audit report with severity classifications:
   - **Critical**: Sensitive data exposed to client, unsanitized XSS vectors, missing authentication
   - **High**: Missing CSP entirely, weak CSP with unsafe-inline/unsafe-eval, direct innerHTML usage
   - **Medium**: Overly permissive CSP, missing SRI on external scripts, partial data sanitization
   - **Low**: Missing TypeScript types for sanitized data, incomplete CSP documentation

6. List all modified files with descriptions:
   - File path
   - Security issue addressed
   - Changes applied (data sanitization, XSS prevention, CSP configuration)

7. Provide actionable next steps:
   - Run automated security tests using Vitest or Playwright
   - Set up CSP violation reporting endpoint
   - Conduct manual penetration testing with XSS payloads
   - Review and update security documentation
   - Schedule periodic security audits

</detailed_sequence_steps>

</task>

--- End Command ---
