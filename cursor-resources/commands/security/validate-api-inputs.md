<task name="Validate API Inputs">

<task_objective>
Implement robust input validation and sanitization for all API endpoints and server actions using Zod schemas. This workflow generates production-ready validation code that enforces data types, length constraints, format requirements, and sanitization to prevent injection attacks. It also audits existing endpoints to identify validation gaps and provides detailed remediation recommendations.
</task_objective>

<detailed_sequence_steps>
# Validate API Inputs - Detailed Sequence of Steps

## 1. Understand Requirements

### 1.1 Identify Input Sources
1. Locate all API endpoints that accept user input:
   - API routes in `/app/api/**/*.ts`
   - API routes in `/pages/api/**/*.ts`
   - Server Actions in `/server/actions/**/*.ts`

2. For each endpoint, identify all input sources:
   - Request body (JSON payloads)
   - Query parameters
   - Path parameters
   - Headers (if used for input)
   - FormData fields

### 1.2 Define Validation Requirements
1. For each input field, determine:
   - Expected data type (string, number, boolean, object, array)
   - Length constraints (min/max for strings, arrays)
   - Format requirements (email, URL, UUID, date, etc.)
   - Custom business rules (password complexity, age restrictions, etc.)
   - Optional vs required fields
   - Default values if applicable

2. Document special validation needs:
   - Conditional validation (field X required if field Y is present)
   - Cross-field validation (password confirmation matches password)
   - Nested object validation
   - Array item validation

## 2. Implement Zod Validation Schemas

### 2.1 Create Schema Definitions
1. For each endpoint or group of related endpoints, create a Zod schema file:
   - Place in `/lib/validation/` or co-located with endpoint
   - Use descriptive naming: `auth-schemas.ts`, `user-input-schemas.ts`

2. Define schemas with comprehensive validation:
   ```typescript
   import { z } from 'zod'

   export const userSignupSchema = z.object({
     email: z.string().email('Invalid email format').toLowerCase(),
     password: z.string()
       .min(8, 'Password must be at least 8 characters')
       .regex(/[A-Z]/, 'Must contain uppercase letter')
       .regex(/[0-9]/, 'Must contain number'),
     username: z.string()
       .min(3, 'Username too short')
       .max(20, 'Username too long')
       .regex(/^[a-zA-Z0-9_]+$/, 'Only alphanumeric and underscore allowed'),
     age: z.number().int().min(13, 'Must be at least 13 years old').optional()
   })
   ```

3. Export TypeScript types from schemas:
   ```typescript
   export type UserSignupInput = z.infer<typeof userSignupSchema>
   ```

### 2.2 Integrate Validation into Endpoints
1. Import the relevant schema at the top of the endpoint file.

2. Parse and validate incoming data before any processing:
   ```typescript
   export async function POST(request: Request) {
     const body = await request.json()
     
     const result = userSignupSchema.safeParse(body)
     
     if (!result.success) {
       return Response.json(
         { error: 'Validation failed', issues: result.error.format() },
         { status: 400 }
       )
     }
     
     const validatedData = result.data
   }
   ```

3. Use `.safeParse()` for graceful error handling or `.parse()` to throw errors.

### 2.3 Add Sanitization
1. Apply sanitization transformations in schemas:
   - `.trim()` for strings to remove whitespace
   - `.toLowerCase()` for emails
   - Custom `.transform()` for additional sanitization

2. For rich text or HTML inputs, use a sanitization library:
   - Install: `npm install dompurify isomorphic-dompurify`
   - Sanitize after Zod validation but before storage

### 2.4 Generate Production-Ready Code
Use this proactive prompt when implementing new endpoints:

```
Generate a Next.js API endpoint that uses Zod for input validation and sanitization. The endpoint should accept a JSON payload with fields: [email (string, valid email format), password (string, min 8 chars with uppercase and number), username (string, 3-20 chars, alphanumeric only)]. Validate the data types, enforce length and format constraints, and sanitize inputs to prevent injection attacks. Include inline comments explaining each validation step and security best practices.
```

Customize the field list based on your specific requirements.

## 3. Audit Existing Validation Implementation

### 3.1 Scan Codebase for Endpoints
1. Use grep or codebase search to find all endpoints:
   ```bash
   grep -r "export async function POST\|export async function GET" app/api/
   grep -r "export async function" server/actions/
   ```

2. Create a checklist of all endpoints found with their file paths.

### 3.2 Verify Validation Coverage
For each endpoint in the checklist, verify:

1. **Schema Defined**: Is there a Zod schema for the endpoint's inputs?
2. **All Inputs Validated**: Are request body, query params, and headers validated?
3. **Error Handling**: Are validation errors caught and returned with appropriate status codes?
4. **Sanitization Applied**: Are inputs sanitized (trim, toLowerCase, etc.)?
5. **Type Safety**: Is the validated data typed using `z.infer<typeof schema>`?

3. Mark endpoints as:
   - ✅ Fully validated
   - ⚠️ Partially validated (missing some inputs)
   - ❌ No validation

### 3.3 Generate Audit Report
Use this defensive prompt to get a comprehensive audit:

```
Perform a comprehensive audit of our Next.js codebase to verify that every endpoint handling user input uses Zod for input validation and sanitization. Check all API routes in /app/api/, /pages/api/, and server actions in /server/actions/. Confirm that all incoming data (request bodies, query parameters, headers) are validated for data types, lengths, and formats and that appropriate sanitization is applied to prevent injection attacks. Provide a detailed report highlighting any endpoints or code sections that fall short of these requirements, along with specific code examples and recommendations for remediation.
```

The report should include:
1. **Executive Summary**: Total endpoints, percentage validated, high-priority gaps
2. **Detailed Findings**: For each problematic endpoint:
   - File path and line number
   - What's missing (validation, sanitization, error handling)
   - Severity level (Critical, High, Medium, Low)
   - Example of vulnerable code
3. **Remediation Recommendations**: Specific Zod schemas to implement
4. **Priority Order**: Which endpoints to fix first based on risk

## 4. Implement Fixes for Identified Gaps

### 4.1 Prioritize Remediation
1. Fix endpoints in this order:
   - **Critical**: Authentication, payment, data modification endpoints
   - **High**: User-facing forms, search endpoints
   - **Medium**: Admin endpoints, internal APIs
   - **Low**: Read-only endpoints with minimal risk

### 4.2 Apply Fixes Systematically
For each endpoint needing validation:

1. Define the Zod schema based on requirements from Step 1.2
2. Integrate validation as shown in Step 2.2
3. Add proper error handling and response formatting
4. Test with valid and invalid inputs
5. Update documentation if applicable

### 4.3 Verify Fixes
After implementing fixes:
1. Run the audit again to confirm all gaps are closed
2. Add integration tests for validation logic
3. Document the validation patterns for team reference

## 5. Establish Validation Standards

### 5.1 Create Reusable Validation Utilities
1. Define common validation patterns in `/lib/validation/common.ts`:
   ```typescript
   export const emailSchema = z.string().email().toLowerCase().trim()
   export const uuidSchema = z.string().uuid()
   export const positiveIntSchema = z.number().int().positive()
   ```

2. Create validation helpers for complex patterns:
   ```typescript
   export function createPaginationSchema(maxLimit = 100) {
     return z.object({
       page: z.number().int().positive().default(1),
       limit: z.number().int().positive().max(maxLimit).default(10)
     })
   }
   ```

### 5.2 Document Best Practices
Create a team reference guide covering:
- When to use `.parse()` vs `.safeParse()`
- How to handle validation errors
- Common schema patterns for your domain
- Security considerations for user input

### 5.3 Automate Validation Checks
1. Add linting rules to catch missing validation
2. Set up pre-commit hooks to remind developers
3. Include validation coverage in code review checklist

</detailed_sequence_steps>

</task>

