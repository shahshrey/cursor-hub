<task name="Prevent SQL Injection">

<task_objective>
Perform eliminate SQL injection vulnerabilities by ensuring all database queries use parameterized queries or ORM methods instead of string concatenation. This command helps thi workflow generates secure database query code, audits existing queries for vulnerabilities, and provides detailed remediation guidance with code examples for each database technology used in the project.
</task_objective>

<detailed_sequence_steps>
# Prevent SQL Injection - Detailed Sequence of Steps

## 1. Identify Database Query Locations

### 1.1 Locate All Database Operations
1. Search for database query operations throughout the codebase:
   ```bash
   grep -r "\.query\|\.execute\|\.raw\|sql\`" server/
   grep -r "from.*select\|insert\|update\|delete" server/
   ```

2. Identify files containing database queries:
   - Server Actions in `/server/actions/**/*.ts`
   - Query functions in `/server/queries/**/*.ts`
   - API routes with database access in `/app/api/**/*.ts`
   - Utility functions in `/lib/**/*.ts`

3. Create an inventory of all files with database operations.

### 1.2 Determine Database Technology
1. Identify which database system(s) are in use:
   - Check `package.json` for database libraries
   - Review connection configuration files
   - Look for imports like `@supabase/supabase-js`, `pg`, `mysql2`, `prisma`, etc.

2. Document for each database:
   - Database type (PostgreSQL, MySQL, SQLite, MongoDB, etc.)
   - ORM or query builder being used (Prisma, Drizzle, Supabase, raw drivers)
   - Connection patterns used in the project

## 2. Implement Secure Query Patterns

### 2.1 Understand Parameterized Queries
Parameterized queries work by:
1. Sending the SQL structure separately from the data
2. Binding user input as parameters, not as part of the SQL string
3. Preventing user input from being interpreted as SQL commands

### 2.2 Generate Secure Query Code by Database Type

**For Supabase (Project's Current Stack):**
```typescript
import { createClient } from '@/lib/supabase/server'

export async function getUserByEmail(email: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()
  
  if (error) throw error
  return data
}
```

**For PostgreSQL with pg library:**
```typescript
import { pool } from '@/lib/db'

export async function getUserByEmail(email: string) {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )
  return result.rows[0]
}
```

**For Prisma:**
```typescript
import { prisma } from '@/lib/prisma'

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  })
}
```

### 2.3 Use Proactive Prompt for New Queries
When implementing new database operations, use this prompt:

```
Generate production-ready TypeScript code for a function that [DESCRIBE OPERATION, e.g., "retrieves user records by email and role"] from a [DATABASE TYPE] database using [ORM/METHOD] to ensure secure query construction—do not use string concatenation for user input. The function should accept parameters for [LIST PARAMETERS], use parameterized queries or ORM methods, include proper error handling, and add inline comments explaining how parameter binding prevents SQL injection and why string concatenation is dangerous.
```

Example filled in:
```
Generate production-ready TypeScript code for a function that retrieves user records by email and role from a PostgreSQL database using Supabase to ensure secure query construction—do not use string concatenation for user input. The function should accept parameters for email (string) and role (string), use parameterized queries or ORM methods, include proper error handling, and add inline comments explaining how parameter binding prevents SQL injection and why string concatenation is dangerous.
```

### 2.4 Common Secure Patterns

**Safe: Multiple Parameters**
```typescript
const { data } = await supabase
  .from('posts')
  .select('*')
  .eq('author_id', userId)
  .eq('status', status)
  .gte('created_at', startDate)
```

**Safe: OR Conditions**
```typescript
const { data } = await supabase
  .from('users')
  .select('*')
  .or(`email.eq.${email},username.eq.${username}`)
```

**Safe: Dynamic Filters**
```typescript
let query = supabase.from('products').select('*')

if (category) {
  query = query.eq('category', category)
}
if (minPrice) {
  query = query.gte('price', minPrice)
}

const { data } = await query
```

**Safe: Raw SQL with Parameters (when needed)**
```typescript
const { data } = await supabase.rpc('complex_query', {
  user_id: userId,
  search_term: searchTerm
})
```

## 3. Audit Database Query Security

### 3.1 Identify Vulnerable Patterns
Scan the codebase for these dangerous patterns:

**Pattern 1: String Concatenation**
```typescript
const query = "SELECT * FROM users WHERE email = '" + email + "'"
```

**Pattern 2: Template Literals**
```typescript
const query = `SELECT * FROM users WHERE email = '${email}'`
```

**Pattern 3: String Building**
```typescript
let query = "SELECT * FROM posts WHERE 1=1"
if (category) {
  query += " AND category = '" + category + "'"
}
```

### 3.2 Search for Vulnerable Code
1. Use grep to find potential issues:
   ```bash
   grep -rn "\+ .*\(SELECT\|INSERT\|UPDATE\|DELETE\)" server/
   grep -rn '\${.*}.*\(SELECT\|INSERT\|UPDATE\|DELETE\)' server/
   grep -rn '\.raw\(' server/
   ```

2. Manually review each match to determine if it's vulnerable.

3. Check for SQL injection even in ORM usage:
   - Prisma `.$queryRaw` with string concatenation
   - Supabase `.rpc()` with concatenated parameters

### 3.3 Generate Comprehensive Audit Report
Use this defensive prompt for thorough analysis:

```
Audit our entire Node.js/Next.js codebase to verify that every database query is implemented using parameterized queries or ORM methods, thereby preventing SQL injection. Specifically examine:
- All files in /server/actions/, /server/queries/, /app/api/
- Any usage of .query(), .execute(), .raw(), sql template tags
- String concatenation or template literals that build SQL queries
- Dynamic query building that might concatenate user input

Identify instances where queries are built by concatenating user input and provide a detailed report with:
1. File path and line numbers for each vulnerability
2. Code snippet showing the vulnerable pattern
3. Explanation of how it could be exploited
4. Recommended secure implementation with code example
5. Severity rating (Critical/High/Medium/Low)

Prioritize findings by risk level, with authentication and data modification queries as highest priority.
```

### 3.4 Analyze Audit Results
For each finding, document:

1. **Vulnerability Details**:
   - File path and line number
   - Current vulnerable code
   - Attack vector (how could it be exploited)

2. **Impact Assessment**:
   - What data could be accessed/modified
   - What operations could be performed
   - Severity: Critical (auth, admin), High (user data), Medium (limited scope), Low (read-only, minimal risk)

3. **Remediation**:
   - Secure code replacement
   - Estimated effort to fix
   - Any breaking changes to consider

## 4. Remediate SQL Injection Vulnerabilities

### 4.1 Prioritize Fixes
Fix vulnerabilities in this order:

1. **Critical** (Immediate):
   - Authentication queries
   - User creation/update
   - Admin operations
   - Payment/financial queries

2. **High** (Within 24 hours):
   - User data retrieval
   - Content modification
   - Search with user input

3. **Medium** (Within 1 week):
   - Analytics queries
   - Logging queries
   - Internal tools

4. **Low** (Schedule accordingly):
   - Read-only queries with limited scope
   - Queries with partial sanitization already

### 4.2 Apply Secure Replacements
For each vulnerable query:

**Before (Vulnerable):**
```typescript
const email = req.body.email
const query = `SELECT * FROM users WHERE email = '${email}'`
const result = await db.query(query)
```

**After (Secure):**
```typescript
const email = req.body.email

const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', email)
  .single()

if (error) throw error
```

### 4.3 Handle Complex Queries
For queries that are legitimately complex and need raw SQL:

1. Use stored procedures or RPC functions:
   ```sql
   CREATE FUNCTION search_users(search_term TEXT, user_role TEXT)
   RETURNS TABLE(...) AS $$
     SELECT * FROM users 
     WHERE (username ILIKE '%' || search_term || '%')
     AND role = user_role;
   $$ LANGUAGE sql;
   ```

2. Call safely from application:
   ```typescript
   const { data } = await supabase.rpc('search_users', {
     search_term: searchTerm,
     user_role: role
   })
   ```

### 4.4 Test Remediation
After fixing each vulnerability:

1. **Functional Testing**: Ensure the query still works correctly
2. **Security Testing**: Try injection attacks to verify they're blocked
3. **Performance Testing**: Ensure parameterized queries don't degrade performance

Example injection test:
```typescript
const maliciousInput = "' OR '1'='1"
await getUserByEmail(maliciousInput)
```

## 5. Prevent Future SQL Injection

### 5.1 Establish Secure Query Guidelines
Create team documentation covering:

1. **Never Do**:
   - String concatenation with user input
   - Template literals for SQL queries
   - Building queries with `+` operator

2. **Always Do**:
   - Use ORM methods (Supabase, Prisma, etc.)
   - Use parameterized queries for raw SQL
   - Validate and sanitize input before queries (defense in depth)

3. **Code Examples**: Provide secure patterns for common operations

### 5.2 Add Code Review Checks
Include in pull request review checklist:
- [ ] All database queries use parameterized approach
- [ ] No string concatenation in SQL queries
- [ ] User input is never directly embedded in SQL
- [ ] Raw SQL usage is justified and secured

### 5.3 Implement Automated Detection
1. Add ESLint rules to catch string concatenation in queries
2. Set up pre-commit hooks to scan for dangerous patterns
3. Include SQL injection checks in CI/CD pipeline

### 5.4 Regular Security Audits
Schedule quarterly audits using the defensive prompt from Step 3.3 to catch any regressions or new vulnerabilities introduced over time.

</detailed_sequence_steps>

</task>

