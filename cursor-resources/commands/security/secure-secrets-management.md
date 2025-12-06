---
name: Secure Secrets Management
description: AI-automated audit and implementation of secret and environment variable security
category: security
tags: [security, secrets, environment-variables, gitignore, encryption, ai-agent]
difficulty: intermediate
ai_optimized: true
---

# Secure Secrets Management (AI Agent Workflow)

<task name="Secure Secrets Management">

<task_objective>
Perform automatically discover, audit, and secure all sensitive data in the codebase by scanning for hard-coded secrets, migrating them to environment variables with validation, configuring proper .gitignore rules, implementing encryption patterns, and establishing secure coding standards. This command helps execute this workflow autonomously using grep, file reading/writing, and code analysis tools.
</task_objective>

<detailed_sequence_steps>

## Phase 1: Automated Secret Discovery

### Step 1: Scan for Hard-coded API Keys and Tokens

**Action**: Use `grep` tool to find potential hard-coded secrets across the codebase.

**Search Pattern 1 - API Keys in TypeScript/JavaScript:**
```
pattern: (api[_-]?key|API[_-]?KEY|apikey|APIKEY)\s*[:=]\s*['\"][^'\"]{15,}['\"]
type: ts
path: (workspace root)
```

**Search Pattern 2 - Common Secret Variables:**
```
pattern: (secret|SECRET|token|TOKEN|password|PASSWORD|credential|CREDENTIAL)\s*[:=]\s*['\"][^'\"]{10,}['\"]
type: ts,tsx,js,jsx
path: (workspace root)
```

**Search Pattern 3 - Known Secret Formats:**
```
pattern: sk-[a-zA-Z0-9]{32,}|ghp_[a-zA-Z0-9]{36}|AIza[a-zA-Z0-9_-]{35}|Bearer [a-zA-Z0-9_-]{20,}
type: ts,tsx,js,jsx,py
path: (workspace root)
```

**For each match found:**
1. Use `read_file` with -B 5 and -A 5 context to examine surrounding code
2. Determine if it's a real secret (not a placeholder like "your_api_key_here")
3. Document the finding: file path, line number, secret type, severity (HIGH/MEDIUM/LOW)
4. Add to remediation list

### Step 2: Map All Environment Variable Usage

**Action**: Identify all existing environment variable references.

**Search Pattern 1 - process.env usage:**
```
pattern: process\.env\.[A-Z0-9_]+
type: ts,tsx,js,jsx
output_mode: content
```

**Search Pattern 2 - Destructured env access:**
```
pattern: const\s+\{[^}]*\}\s*=\s*process\.env
type: ts,tsx,js,jsx
output_mode: content
```

**For each file with env usage:**
1. Use `read_file` to get full file content
2. Identify all unique environment variable names
3. Check if variables have validation or default values
4. Flag unvalidated direct usage as potential risk
5. Create inventory of required environment variables

### Step 3: Check .gitignore Configuration

**Action**: Verify environment files are properly excluded from version control.

**Step 3a**: Use `read_file` to read `.gitignore`

**Step 3b**: Check if it contains:
- `.env`
- `.env.local`
- `.env.*.local`
- `.env.development`
- `.env.production`

**Step 3c**: If missing entries, prepare to update `.gitignore` in next phase

## Phase 2: Environment Configuration Setup

### Step 4: Create .env.example Template

**Action**: Generate `.env.example` file with all discovered environment variables.

**Step 4a**: Compile list of all environment variables from Step 2 inventory

**Step 4b**: Check if `.env.example` exists using `read_file`
- If exists: read current content and merge with new variables
- If not exists: prepare to create new file

**Step 4c**: Use `write` tool to create/update `.env.example`:

```
# API Keys
NEXT_PUBLIC_API_KEY=your_api_key_here
OPENAI_API_KEY=your_openai_key_here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Authentication
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here
NEXTAUTH_SECRET=your_nextauth_secret_here

# Third-party Services
STRIPE_SECRET_KEY=your_stripe_secret_here
SENDGRID_API_KEY=your_sendgrid_key_here

# Deployment
NODE_ENV=development
```

**Step 4d**: Add comment header explaining usage:
```
# Environment Variables
# Copy this file to .env.local and fill in actual values
# NEVER commit .env files with real secrets to version control
```

### Step 5: Update .gitignore for Environment Files

**Action**: Ensure all environment files are properly gitignored.

**Step 5a**: Use `read_file` to read `.gitignore` file

**Step 5b**: Check if it contains these patterns:
- `.env`
- `.env.*`
- `.env.local`
- `.env.*.local`
- `!.env.example` (to allow example file)

**Step 5c**: If missing, use `search_replace` to add environment section:

```gitignore
# Environment Variables
.env
.env.*
.env.local
.env.development
.env.test
.env.production
.env.staging

# Allow example files
!.env.example
!.env.template
```

**Step 5d**: If `.gitignore` doesn't exist, use `write` tool to create it with above content

### Step 6: Implement Environment Variable Validation

**Action**: Create or update `lib/env.ts` with Zod validation schema.

**Step 6a**: Check if `lib/env.ts` exists using `read_file`

**Step 6b**: Check if `zod` is in `package.json` dependencies
- Use `grep` with pattern: `"zod":\s*"[^"]+"`
- If not found, note that user needs to install: `npm install zod`

**Step 6c**: Use `write` or `search_replace` to create/update `lib/env.ts`:

```typescript
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  
  DATABASE_URL: z.string().url().optional(),
  
  JWT_SECRET: z.string().min(32).optional(),
  SESSION_SECRET: z.string().min(32).optional(),
  
  OPENAI_API_KEY: z.string().startsWith('sk-').optional(),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional(),
})

export const env = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema>
```

**Step 6d**: Add validation for project-specific variables based on Step 2 inventory

## Phase 3: Automated Code Migration

### Step 7: Replace Hard-coded Secrets with Environment Variables

**Action**: Systematically replace each hard-coded secret found in Phase 1.

**For each secret identified in Step 1:**

**Step 7a**: Extract secret information (variable name, value, file path, line)

**Step 7b**: Determine appropriate environment variable name:
- Follow convention: UPPERCASE_WITH_UNDERSCORES
- Add `NEXT_PUBLIC_` prefix only if needed in client-side code
- Examples: `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `JWT_SECRET`

**Step 7c**: Use `search_replace` tool to replace hard-coded secret:

```typescript
// Find pattern like:
const apiKey = "sk-1234567890abcdef"

// Replace with:
const apiKey = process.env.OPENAI_API_KEY
```

**Search/Replace example:**
```
old_string: const apiKey = "sk-1234567890abcdef"
new_string: const apiKey = process.env.OPENAI_API_KEY
file_path: path/to/file.ts
```

**Step 7d**: Update `.env.example` using `search_replace` to add new variable

**Step 7e**: Repeat for all secrets found in Phase 1

### Step 8: Migrate to Validated Environment Access

**Action**: Replace direct `process.env` access with type-safe validated imports.

**Step 8a**: For each file using `process.env` (from Step 2 inventory):
- Use `read_file` to get full content
- Identify all `process.env.VARIABLE_NAME` usages

**Step 8b**: Use `search_replace` to add import at top of file:

```typescript
// Add after existing imports
import { env } from '@/lib/env'
```

**Step 8c**: Use `search_replace` to replace each instance:

```typescript
// Old pattern:
process.env.API_KEY

// New pattern:
env.API_KEY
```

**Step 8d**: Update function signatures if env is passed as parameter:

```typescript
// Before:
function connectDB(url: string | undefined)

// After:
import type { Env } from '@/lib/env'
function connectDB(url: string)
```

### Step 9: Add Runtime Validation Checks

**Action**: Insert runtime checks for critical environment variables.

**Step 9a**: Identify entry points (e.g., `app/layout.tsx`, `middleware.ts`, server action files)

**Step 9b**: Use `search_replace` to add validation at the top of server files:

```typescript
// Add after imports in server files
import { env } from '@/lib/env'

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

if (env.NODE_ENV === 'production') {
  if (!env.JWT_SECRET || env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters in production')
  }
}
```

**Step 9c**: For Server Actions, add checks at function start:

```typescript
export async function serverAction() {
  if (!env.OPENAI_API_KEY) {
    return { error: 'API key not configured' }
  }
  // ... rest of function
}
```

## Phase 4: Security Hardening (Configuration Files)

### Step 10: Configure Secure Headers in Next.js

**Action**: Add security headers to `next.config.ts` or `next.config.js`.

**Step 10a**: Use `read_file` to read existing Next.js config

**Step 10b**: Check if `headers()` function exists in config

**Step 10c**: Use `search_replace` to add/update security headers:

```typescript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
]

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

### Step 11: Add HTTPS Enforcement Middleware

**Action**: Create or update middleware to enforce HTTPS in production.

**Step 11a**: Check if `middleware.ts` exists using `read_file`

**Step 11b**: Use `search_replace` or `write` to add HTTPS redirect:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    )
  }
  
  return NextResponse.next()
}
```

### Step 12: Create Encryption Utility Module

**Action**: Build reusable encryption/decryption functions for sensitive data.

**Step 12a**: Create `lib/encryption.ts` using `write` tool:

```typescript
import crypto from 'crypto'
import { env } from './env'

const ALGORITHM = 'aes-256-gcm'
const KEY_LENGTH = 32
const IV_LENGTH = 16
const AUTH_TAG_LENGTH = 16

function getEncryptionKey(): Buffer {
  if (!env.ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY environment variable is required')
  }
  
  if (Buffer.from(env.ENCRYPTION_KEY, 'hex').length !== KEY_LENGTH) {
    throw new Error(`ENCRYPTION_KEY must be ${KEY_LENGTH} bytes (64 hex characters)`)
  }
  
  return Buffer.from(env.ENCRYPTION_KEY, 'hex')
}

export function encrypt(plaintext: string): string {
  const key = getEncryptionKey()
  const iv = crypto.randomBytes(IV_LENGTH)
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  
  let encrypted = cipher.update(plaintext, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const authTag = cipher.getAuthTag()
  
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`
}

export function decrypt(ciphertext: string): string {
  const key = getEncryptionKey()
  const [ivHex, authTagHex, encryptedHex] = ciphertext.split(':')
  
  if (!ivHex || !authTagHex || !encryptedHex) {
    throw new Error('Invalid ciphertext format')
  }
  
  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(authTag)
  
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return decrypted
}

export function generateEncryptionKey(): string {
  return crypto.randomBytes(KEY_LENGTH).toString('hex')
}
```

**Step 12b**: Add `ENCRYPTION_KEY` to `.env.example`:
```
# Encryption (generate with: openssl rand -hex 32)
ENCRYPTION_KEY=your_64_character_hex_key_here
```

**Step 12c**: Update `lib/env.ts` validation schema to include `ENCRYPTION_KEY`

## Phase 5: Exposure Prevention

### Step 13: Create Pre-commit Hook for Secret Detection

**Action**: Generate pre-commit hook to prevent accidental secret commits.

**Step 13a**: Check if `.husky` directory exists using `list_dir`

**Step 13b**: If Husky is not set up, create `.git/hooks/pre-commit` directly using `write`:

```bash
#!/bin/sh

echo "🔍 Scanning for potential secrets..."

SECRETS=$(git diff --cached --diff-filter=ACM | grep -E "(api[_-]?key|secret|password|token|credential)" | grep -v ".env.example" | grep -v "your_.*_here")

if [ -n "$SECRETS" ]; then
  echo "❌ ERROR: Potential secrets detected in staged files!"
  echo ""
  echo "$SECRETS"
  echo ""
  echo "Please remove hard-coded secrets and use environment variables instead."
  echo "See .env.example for proper configuration."
  exit 1
fi

HARDCODED_PATTERNS=$(git diff --cached --diff-filter=ACM | grep -E "(sk-[a-zA-Z0-9]{32,}|ghp_[a-zA-Z0-9]{36}|AIza[a-zA-Z0-9_-]{35})")

if [ -n "$HARDCODED_PATTERNS" ]; then
  echo "❌ ERROR: Known secret patterns detected!"
  echo ""
  echo "$HARDCODED_PATTERNS"
  echo ""
  echo "These look like real API keys. Please remove them immediately."
  exit 1
fi

echo "✅ No secrets detected"
exit 0
```

**Step 13c**: Make hook executable (note to user: run `chmod +x .git/hooks/pre-commit`)

### Step 14: Add Secret Safety Comments

**Action**: Add warning comments to files that handle sensitive environment variables.

**Step 14a**: For each file using environment variables, add safety comment at top:

Use `search_replace` to add after imports:

```typescript
/*
 * ⚠️ SECURITY WARNING: This file accesses sensitive environment variables
 * 
 * Before sharing screen, taking screenshots, or live streaming:
 * - Do not display this file's contents
 * - Hide terminal output showing environment values
 * - Redact API keys and tokens from any shared content
 * - Close any .env files before screen sharing
 * 
 * See project security guidelines for more information.
 */
```

**Step 14b**: Add comment to `.env.example`:

```
# ⚠️ SECURITY WARNING
# This is a template file with placeholder values only.
# 
# To use:
# 1. Copy this file to .env.local
# 2. Replace placeholder values with real secrets
# 3. NEVER commit .env files with real secrets
# 4. NEVER share screenshots or streams showing .env contents
#
# If you accidentally expose a secret:
# 1. Immediately revoke/rotate the secret in the service
# 2. Update all environments with new secret
# 3. Check git history and clean if necessary
```

### Step 15: Scan for Secrets in Documentation

**Action**: Check documentation files for exposed secrets.

**Step 15a**: Use `grep` to search markdown files:

```
pattern: [a-f0-9]{32,}|[A-Z0-9_-]{40,}
type: md
output_mode: content
```

**Step 15b**: For each match, use `read_file` to get context

**Step 15c**: If looks like real secret (not placeholder):
- Use `search_replace` to replace with `process.env.VARIABLE_NAME`
- Add to findings report

**Step 15d**: Search for connection strings:

```
pattern: (postgresql|mysql|mongodb):\/\/[^:]+:[^@]+@
type: md,json,yaml,yml
output_mode: content
```

## Phase 6: Validation & Testing

### Step 16: Verify Environment Variable Loading

**Action**: Test that environment validation works correctly.

**Step 16a**: Check if there's a test file for env validation

**Step 16b**: Create `lib/__tests__/env.test.ts` using `write`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'

describe('Environment Variables', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  it('should load required environment variables', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'
    
    const { env } = require('../env')
    
    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe('https://example.supabase.co')
    expect(env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe('test-key')
  })

  it('should throw error for missing required variables', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    
    expect(() => {
      require('../env')
    }).toThrow()
  })

  it('should validate environment variable formats', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'invalid-url'
    
    expect(() => {
      require('../env')
    }).toThrow()
  })
})
```

### Step 17: Verify .gitignore Effectiveness

**Action**: Confirm environment files are excluded from git.

**Step 17a**: Use `read_file` to read `.gitignore`

**Step 17b**: Verify these patterns exist:
- `.env`
- `.env.*`
- `.env.local`
- `!.env.example`

**Step 17c**: Generate verification report listing:
- ✅ Patterns present in `.gitignore`
- ❌ Patterns missing from `.gitignore`
- 📋 Recommended additions

### Step 18: Check for Remaining Hard-coded Secrets

**Action**: Final scan to ensure all secrets have been migrated.

**Step 18a**: Re-run all searches from Phase 1, Step 1

**Step 18b**: Compare results with initial findings

**Step 18c**: Generate report:
- Total secrets found initially
- Secrets successfully migrated
- Remaining issues (if any)
- False positives excluded

## Phase 7: Documentation Generation

### Step 19: Generate Security Documentation

**Action**: Create comprehensive security documentation for the team.

**Step 19a**: Create `SECURITY.md` using `write` tool:

```markdown
# Security Guidelines

## Environment Variables

### Setup Instructions

1. Copy `.env.example` to `.env.local`:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. Fill in actual values (obtain from team lead or secret manager)

3. Never commit `.env` files - they are automatically gitignored

### Required Variables

See `.env.example` for all required environment variables and their purposes.

### Validation

Environment variables are validated at startup using Zod schemas in `lib/env.ts`.
If required variables are missing or invalid, the application will fail fast with clear error messages.

## Secret Management

### Adding New Secrets

1. Add placeholder to `.env.example`
2. Add actual value to `.env.local`
3. Add to validation schema in `lib/env.ts`
4. Update deployment platform environment variables
5. Document purpose and source

### If a Secret is Exposed

**IMMEDIATE ACTIONS:**
1. Revoke/rotate the exposed secret immediately in the service
2. Remove from public view (delete post, make repo private)
3. Alert team lead

**FOLLOW-UP:**
1. Update all environments with new secret
2. Audit logs for unauthorized access
3. Clean git history if committed (see below)
4. Document incident

### Cleaning Git History

If a secret was committed:

\`\`\`bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/file" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
\`\`\`

**⚠️ Coordinate with team before force-pushing**

## Public Sharing Checklist

Before screenshots, streams, or demos:

- [ ] No `.env` files visible in IDE
- [ ] No terminal output showing secrets
- [ ] No browser dev tools with auth tokens
- [ ] No connection strings in view
- [ ] No error messages revealing secrets

## Encryption

Sensitive data at rest should be encrypted using `lib/encryption.ts` utilities.

## Questions?

Contact security team or refer to main project documentation.
```

**Step 19b**: Add security section to README if it exists

Use `read_file` to check for `README.md`, then `search_replace` to add:

```markdown
## Security

See [SECURITY.md](./SECURITY.md) for security guidelines, secret management, and incident response procedures.

**Key Security Practices:**
- All secrets use environment variables
- `.env` files are gitignored
- Environment variables are validated at startup
- HTTPS enforced in production
- Security headers configured
```

### Step 20: Generate Findings Report

**Action**: Create comprehensive report of all findings and actions taken.

**Step 20a**: Compile statistics from all phases:
- Total secrets found (Phase 1)
- Secrets migrated to env vars (Phase 3)
- Files updated (Phases 2-5)
- New files created (list)
- Configuration changes made

**Step 20b**: Create `SECURITY_AUDIT_REPORT.md` (temporary, for user review):

```markdown
# Security Audit Report
Generated: [timestamp]

## Summary

- **Total hard-coded secrets found:** X
- **Secrets successfully migrated:** X
- **Files modified:** X
- **New files created:** X

## Findings

### High Priority
[List any critical secrets found with file paths]

### Medium Priority
[List moderate issues]

### Low Priority / False Positives
[List non-issues]

## Actions Taken

### Phase 1: Discovery
- Scanned X files
- Identified X potential secrets
- Mapped X environment variable usages

### Phase 2: Configuration
- Created/updated .env.example
- Updated .gitignore
- Created lib/env.ts validation

### Phase 3: Migration
- Replaced X hard-coded secrets
- Updated X files to use validated env
- Added runtime checks in X locations

### Phase 4: Security Hardening
- Configured security headers
- Added HTTPS enforcement
- Created encryption utilities

### Phase 5: Exposure Prevention
- Created pre-commit hook
- Added security warnings
- Scanned documentation

### Phase 6: Validation
- Created environment variable tests
- Verified .gitignore effectiveness
- Performed final secret scan

### Phase 7: Documentation
- Created SECURITY.md
- Updated README
- Generated this report

## Recommendations

1. **Immediate:** Review and rotate any secrets that were found
2. **Short-term:** Configure deployment platform with all secrets
3. **Ongoing:** Run pre-commit hooks before all commits
4. **Training:** Review security guidelines with team

## Files Created

- .env.example
- lib/env.ts
- lib/encryption.ts
- .git/hooks/pre-commit
- SECURITY.md
- lib/__tests__/env.test.ts

## Files Modified

[List all files that were modified]

## Next Steps

- [ ] User to add actual secrets to .env.local
- [ ] User to configure deployment platform secrets
- [ ] User to run chmod +x .git/hooks/pre-commit
- [ ] User to review and rotate exposed secrets
- [ ] Team training on new security practices
```

### Step 21: Create Security Checklist

**Action**: Generate actionable checklist for user.

**Step 21a**: Present final checklist to user:

```markdown
## 🔐 Security Implementation Checklist

### Completed by AI Agent ✅
- [x] Scanned codebase for hard-coded secrets
- [x] Created .env.example template
- [x] Updated .gitignore for environment files
- [x] Created environment validation (lib/env.ts)
- [x] Replaced hard-coded secrets with env vars
- [x] Added security headers configuration
- [x] Created encryption utilities
- [x] Generated pre-commit hook
- [x] Added security warnings
- [x] Created documentation (SECURITY.md)
- [x] Generated audit report

### Required User Actions ⚠️
- [ ] Copy .env.example to .env.local
- [ ] Add actual secret values to .env.local
- [ ] Run: chmod +x .git/hooks/pre-commit
- [ ] Configure deployment platform secrets (Vercel/etc)
- [ ] Review and rotate any exposed secrets
- [ ] Test application with new environment setup
- [ ] Share SECURITY.md with team
- [ ] Set up CI/CD secrets if applicable

### Recommended Follow-ups 📋
- [ ] Schedule regular security audits
- [ ] Implement secret rotation schedule
- [ ] Set up monitoring/alerting for auth failures
- [ ] Enable 2FA on all services
- [ ] Review access logs for suspicious activity
```

## Phase 8: Final Review & Summary

### Step 22: Present Summary to User

**Action**: Generate and display comprehensive summary of all work completed.

**Step 22a**: Count and categorize all modifications:
- Files created
- Files modified
- Secrets migrated
- Security improvements implemented

**Step 22b**: Display summary report:

```
═══════════════════════════════════════════════════════════
           SECURE SECRETS MANAGEMENT - COMPLETE
═══════════════════════════════════════════════════════════

📊 STATISTICS
───────────────────────────────────────────────────────────
✓ Files scanned: [X]
✓ Hard-coded secrets found: [X]
✓ Secrets migrated to env vars: [X]
✓ Files created: [X]
✓ Files modified: [X]
✓ Security configurations added: [X]

🔒 SECURITY IMPROVEMENTS
───────────────────────────────────────────────────────────
✓ Environment variable validation (lib/env.ts)
✓ .env.example template created
✓ .gitignore configured
✓ Security headers added
✓ HTTPS enforcement configured
✓ Encryption utilities created
✓ Pre-commit hook generated
✓ Security documentation written
✓ Test coverage added

⚠️  REQUIRED USER ACTIONS
───────────────────────────────────────────────────────────
1. Copy .env.example to .env.local
2. Fill in actual secret values
3. Run: chmod +x .git/hooks/pre-commit
4. Configure deployment platform secrets
5. Review and rotate any exposed secrets
6. Test application functionality

📚 DOCUMENTATION CREATED
───────────────────────────────────────────────────────────
- SECURITY.md (security guidelines)
- SECURITY_AUDIT_REPORT.md (detailed findings)
- Updated README.md (security section)
- lib/__tests__/env.test.ts (validation tests)

═══════════════════════════════════════════════════════════
```

### Step 23: Cleanup Temporary Files

**Action**: Remove any temporary or working files created during audit.

**Step 23a**: Check for temporary files:
- Backup files (*.bak)
- Test .env files created during validation
- Any temporary audit files

**Step 23b**: Remove using `delete_file` if necessary

**Step 23c**: Verify SECURITY_AUDIT_REPORT.md should remain (user needs to review)

</detailed_sequence_steps>

<expected_output>

## Deliverables

**Automated by AI Agent:**

1. **Configuration Files**
   - `.env.example` - Template with all required variables and placeholders
   - `lib/env.ts` - Zod validation schema for environment variables
   - `.gitignore` - Updated with environment file patterns
   - `next.config.ts` - Security headers configuration
   - `middleware.ts` - HTTPS enforcement (if applicable)
   - `lib/encryption.ts` - Encryption/decryption utilities

2. **Security Infrastructure**
   - `.git/hooks/pre-commit` - Pre-commit hook for secret detection
   - `lib/__tests__/env.test.ts` - Environment variable tests

3. **Documentation**
   - `SECURITY.md` - Comprehensive security guidelines
   - `SECURITY_AUDIT_REPORT.md` - Detailed audit findings and statistics
   - `README.md` - Updated with security section (if exists)

4. **Code Migrations**
   - All hard-coded secrets replaced with `process.env` or validated `env` imports
   - Security warning comments added to sensitive files
   - Runtime validation checks added to critical paths

**Summary Report:**

The AI agent will present a comprehensive summary showing:
- Total files scanned and modified
- Number of secrets found and migrated
- Security configurations implemented
- Test coverage added
- Required user actions (checklist format)

## Success Criteria

**Automated Checks Completed:**
- ✅ Zero hard-coded secrets remaining in codebase
- ✅ All environment variables use proper validation
- ✅ `.env` files properly gitignored
- ✅ Security headers configured
- ✅ Encryption utilities available
- ✅ Pre-commit hook generated
- ✅ Comprehensive documentation created
- ✅ Test coverage for environment validation

**User Action Required:**
- ⚠️ Add actual secrets to `.env.local`
- ⚠️ Configure deployment platform
- ⚠️ Enable pre-commit hook execution
- ⚠️ Rotate any exposed secrets
- ⚠️ Test application with new configuration

</expected_output>

<ai_agent_instructions>

## Execution Notes for AI Agent

When running this workflow:

1. **Phase 1**: Use `grep` tool extensively with appropriate patterns and file types
2. **Phase 2-3**: Use `read_file`, `write`, and `search_replace` for all file modifications
3. **Phase 4-5**: Create new files using `write` tool with complete content
4. **Phase 6-7**: Generate tests and documentation programmatically
5. **Phase 8**: Present comprehensive summary with statistics

**Tool Usage Priority:**
- `grep` for searching patterns in code
- `read_file` for examining file contents
- `search_replace` for targeted code modifications
- `write` for creating new files
- `delete_file` only for cleanup if necessary

**Avoid:**
- Do NOT use `run_terminal_cmd` for file operations
- Do NOT guess secret values (always use placeholders)
- Do NOT modify files without reading them first
- Do NOT skip documentation generation

**Best Practices:**
- Always read existing files before modifying
- Use specific search patterns to minimize false positives
- Maintain existing code style and formatting
- Provide detailed comments in generated code
- Track all modifications for final report

</ai_agent_instructions>

<proactive_prompt>
Audit and secure all secrets in this codebase: scan for hard-coded API keys, database credentials, tokens, and passwords; create environment variable configuration with Zod validation; migrate all secrets to use environment variables; update .gitignore; configure security headers and HTTPS enforcement; create encryption utilities; generate pre-commit hook for secret detection; add comprehensive security documentation; and provide detailed report of all findings and changes made.
</proactive_prompt>

<defensive_prompt>
Perform comprehensive security audit: identify all hard-coded secrets, exposed credentials, and sensitive data in code, documentation, and configuration files; verify environment variable usage patterns; check .gitignore configuration; scan for secrets in git history; validate security configurations; assess risk levels for each finding; provide detailed remediation report with statistics, prioritized action items, and step-by-step migration plan for all discovered issues.
</defensive_prompt>

<critical_warning>
⚠️ **CRITICAL: Secret Exposure Protocol**

If during execution the AI agent discovers hard-coded secrets that appear to be real (not placeholders), it MUST:

1. **Flag immediately** in the findings report with HIGH priority
2. **Recommend immediate rotation** of the compromised secret
3. **Suggest git history audit** if the secret may have been committed
4. **Advise security review** of access logs for potential unauthorized use

**For the User:**

If any hard-coded secret was:
- Committed to version control → Rotate immediately + clean git history
- Processed by AI tools → Treat as compromised, rotate immediately
- Exposed publicly (screenshot/stream) → Rotate immediately + audit logs
- Shared with unauthorized parties → Rotate + review access patterns

**Consequences of Inaction:**
- Unauthorized access to services and data
- Potential data breaches and compliance violations
- Financial losses from service abuse
- Reputation damage
- Legal liability

**DO NOT DELAY** - treat all exposed secrets as actively compromised until proven otherwise.
</critical_warning>

</task>

