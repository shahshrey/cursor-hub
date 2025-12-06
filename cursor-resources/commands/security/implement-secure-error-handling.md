<task name="Implement Secure Error Handling">

<task_objective>
Implement production-ready error handling that prevents data leaks by returning generic error messages to clients while securely logging detailed error information on the server. This command helps follow OWASP Exception and Error Handling best practices, establish sustainable log retention policies, and ensure sensitive information is never exposed through error responses or logs.
</task_objective>

<how_to_ask_followup_question>
<question>Would you like to implement proactive error handling (generate new code) or perform a defensive audit (review existing code)?</question>
<options>["Proactive - Generate new error handling code", "Defensive - Audit existing error handling", "Both - Generate code and audit existing implementation"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Implement Secure Error Handling - Detailed Sequence of Steps

## 1. Analyze Current Error Handling Architecture

1. Search the codebase for existing error handling patterns using `codebase_search`:
   - Query: "How are errors currently handled and returned to clients?"
   - Query: "Where are errors being logged in the application?"
   - Query: "What error information is exposed in API responses?"

2. Identify all API endpoints and server actions that handle errors.

3. Review current logging infrastructure and storage solutions.

4. Document any instances where detailed error information may be leaked to clients.

## 2. Design Generic Error Response Structure

1. Create a standardized error response format that exposes no sensitive information:
   ```typescript
   interface GenericErrorResponse {
     success: false
     error: string
     timestamp: string
     requestId?: string
   }
   ```

2. Define error categories with generic client-facing messages:
   - Authentication errors: "Authentication failed"
   - Authorization errors: "Access denied"
   - Validation errors: "Invalid request"
   - Server errors: "An unexpected error occurred"
   - Database errors: "Unable to process request"

3. Create error code mappings that maintain internal detail while showing generic messages externally.

## 3. Implement Secure Server-Side Error Logging

1. Set up structured logging using appropriate logging framework:
   - For Node.js/TypeScript: winston, pino, or structlog equivalent
   - For Python: structlog
   - For other languages: language-appropriate structured logging library

2. Create a secure error logging utility that captures:
   - Full error details (stack trace, error type, error message)
   - Request context (URL, method, headers - sanitized)
   - User context (user ID, not PII)
   - Timestamp and request ID for correlation
   - Environment information

3. Implement log sanitization to strip sensitive data:
   - Remove passwords, tokens, API keys
   - Mask PII (email addresses, phone numbers)
   - Redact sensitive query parameters
   - Filter authorization headers

4. Configure log levels appropriately:
   - ERROR: Application errors requiring attention
   - WARN: Recoverable issues
   - INFO: Significant events (minimal in production)
   - DEBUG: Detailed information (disabled in production)

## 4. Implement OWASP-Compliant Error Handlers

### For API Routes (Next.js App Router)

1. Create a centralized error handler utility:

```typescript
// lib/errors.ts

import { NextResponse } from 'next/server'

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleApiError(error: unknown, requestId: string) {
  const timestamp = new Date().toISOString()
  
  if (error instanceof AppError) {
    logError({
      type: 'AppError',
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
      details: error.details,
      stack: error.stack,
      requestId,
      timestamp,
    })
    
    return NextResponse.json(
      {
        success: false,
        error: getGenericMessage(error.statusCode),
        timestamp,
        requestId,
      },
      { status: error.statusCode }
    )
  }
  
  logError({
    type: 'UnhandledError',
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    requestId,
    timestamp,
  })
  
  return NextResponse.json(
    {
      success: false,
      error: 'An unexpected error occurred',
      timestamp,
      requestId,
    },
    { status: 500 }
  )
}

function getGenericMessage(statusCode: number): string {
  const messages: Record<number, string> = {
    400: 'Invalid request',
    401: 'Authentication required',
    403: 'Access denied',
    404: 'Resource not found',
    409: 'Request conflict',
    422: 'Validation failed',
    429: 'Too many requests',
    500: 'An unexpected error occurred',
    503: 'Service temporarily unavailable',
  }
  return messages[statusCode] || 'An error occurred'
}

function logError(errorData: Record<string, unknown>) {
  console.error('[ERROR]', JSON.stringify(sanitizeLogData(errorData)))
}

function sanitizeLogData(data: Record<string, unknown>): Record<string, unknown> {
  const sensitive = ['password', 'token', 'apiKey', 'secret', 'authorization']
  const sanitized = { ...data }
  
  for (const key in sanitized) {
    if (sensitive.some(s => key.toLowerCase().includes(s))) {
      sanitized[key] = '[REDACTED]'
    }
  }
  
  return sanitized
}
```

2. Apply error handling to all API routes:

```typescript
// app/api/example/route.ts

import { NextRequest } from 'next/server'
import { handleApiError, AppError } from '@/lib/errors'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  const requestId = randomUUID()
  
  try {
    const body = await request.json()
    
    if (!body.requiredField) {
      throw new AppError('Required field missing', 422, 'VALIDATION_ERROR')
    }
    
    const result = await processData(body)
    
    return NextResponse.json({
      success: true,
      data: result,
      requestId,
    })
  } catch (error) {
    return handleApiError(error, requestId)
  }
}
```

### For Server Actions

1. Create server action error wrapper:

```typescript
// server/actions/with-error-handling.ts

'use server'

import { randomUUID } from 'crypto'

export async function withErrorHandling<T>(
  action: () => Promise<T>,
  actionName: string
): Promise<{ success: true; data: T } | { success: false; error: string; requestId: string }> {
  const requestId = randomUUID()
  
  try {
    const data = await action()
    return { success: true, data }
  } catch (error) {
    logError({
      type: 'ServerActionError',
      actionName,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      requestId,
      timestamp: new Date().toISOString(),
    })
    
    return {
      success: false,
      error: 'Unable to complete the requested action',
      requestId,
    }
  }
}
```

2. Wrap all server actions:

```typescript
// server/actions/example.ts

'use server'

import { withErrorHandling } from './with-error-handling'

export async function createResource(formData: FormData) {
  return withErrorHandling(async () => {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('resources')
      .insert({ name: formData.get('name') })
      .select()
      .single()
    
    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }
    
    return data
  }, 'createResource')
}
```

## 5. Implement Log Retention Policy

1. Define retention requirements based on:
   - Regulatory compliance needs (GDPR, HIPAA, etc.)
   - Storage costs and capacity
   - Operational debugging needs (typically 30-90 days)

2. Configure log rotation and archival:

```typescript
// lib/logging/config.ts

export const LOG_RETENTION_POLICY = {
  ERROR_LOGS: {
    retention_days: 90,
    archive_after_days: 30,
    max_size_gb: 50,
  },
  
  WARN_LOGS: {
    retention_days: 30,
    archive_after_days: 7,
    max_size_gb: 20,
  },
  
  INFO_LOGS: {
    retention_days: 7,
    max_size_gb: 10,
  },
}

export function setupLogRotation() {
  // Implementation depends on logging service
  // Examples:
  // - AWS CloudWatch: Set retention policies in log groups
  // - Self-hosted: Use logrotate or equivalent
  // - Third-party (Datadog, New Relic): Configure in service dashboard
}
```

3. Implement automated log cleanup script:

```typescript
// scripts/cleanup-logs.ts

import { LOG_RETENTION_POLICY } from '@/lib/logging/config'

async function cleanupLogs() {
  const now = Date.now()
  const oneDayMs = 24 * 60 * 60 * 1000
  
  for (const [logType, policy] of Object.entries(LOG_RETENTION_POLICY)) {
    const cutoffDate = now - (policy.retention_days * oneDayMs)
    
    await deleteLogsOlderThan(logType, cutoffDate)
    
    if (policy.archive_after_days) {
      const archiveCutoffDate = now - (policy.archive_after_days * oneDayMs)
      await archiveLogsBetween(logType, cutoffDate, archiveCutoffDate)
    }
  }
}

async function deleteLogsOlderThan(logType: string, cutoffDate: number) {
  // Implementation depends on logging backend
}

async function archiveLogsBetween(logType: string, startDate: number, endDate: number) {
  // Implementation depends on logging backend
}
```

## 6. Perform Defensive Audit

1. Search for error leaks using `grep`:
   - Pattern: `error\.message` to find exposed error messages
   - Pattern: `error\.stack` to find exposed stack traces
   - Pattern: `throw new Error.*\$\{` to find dynamic error messages
   - Pattern: `console\.(log|error)\(.*password|token|secret` to find logged secrets

2. Review each API endpoint for proper error handling:
   ```bash
   # Find all API routes
   grep -r "export async function" app/api/
   ```

3. Check for missing try-catch blocks in async operations.

4. Verify all Supabase/database error responses are properly sanitized.

5. Review client-side error handling to ensure no sensitive data in error states.

6. Check error boundaries in React components for appropriate fallbacks.

## 7. Add Monitoring and Alerting

1. Set up error rate monitoring:
   - Track 4xx and 5xx error rates
   - Alert on sudden spikes in error rates
   - Monitor specific error codes (401, 403, 500)

2. Implement structured logging aggregation:
   - Collect logs in centralized service
   - Create dashboards for error trends
   - Set up alerts for critical errors

3. Add request ID correlation:
   - Include request ID in all logs
   - Enable tracing requests across services
   - Make request ID available to support for debugging

## 8. Document Error Handling Standards

1. Create internal documentation covering:
   - How to throw errors correctly
   - What information can be exposed to clients
   - Log level guidelines
   - Sensitive data handling in errors

2. Add code examples to development guidelines.

3. Include error handling in code review checklist.

## 9. Testing and Validation

1. Write tests for error scenarios:
   - Test generic error messages are returned
   - Verify sensitive data is not in responses
   - Confirm detailed errors are logged
   - Test log sanitization functions

2. Perform security testing:
   - Attempt to trigger verbose error messages
   - Try to extract system information from errors
   - Test with malformed inputs
   - Verify error responses don't leak database schema

3. Load test logging system:
   - Ensure logging doesn't impact performance
   - Verify logs don't consume excessive storage
   - Test log rotation and cleanup

## 10. Deploy and Monitor

1. Deploy error handling changes incrementally:
   - Start with non-critical endpoints
   - Monitor for issues
   - Roll out to all endpoints

2. Monitor error logs for first 48 hours:
   - Watch for unexpected error patterns
   - Verify logging is working correctly
   - Check storage usage trends

3. Schedule regular audits:
   - Monthly review of error handling patterns
   - Quarterly security review of error responses
   - Review and update log retention policies

</detailed_sequence_steps>

<proactive_prompt>
Generate a production-ready code example that implements robust error handling and logging following OWASP best practices for exception and error handling. The code should catch errors and return generic error messages to the client while logging detailed error information securely on the server. Additionally, measures should be included to ensure that only necessary log data is stored, and a sustainable log retention policy should be outlined to prevent excessive storage growth. Include inline comments to explain how your implementation mitigates data leaks and protects sensitive information.
</proactive_prompt>

<defensive_prompt>
Audit our code base to verify that error handling and logging adhere to OWASP best practices: ensure all errors are caught, and only generic error messages are returned to the client. In contrast, detailed error information is securely logged without exposing sensitive data. Identify any endpoints or sections where error details might be leaked to users or where log data is stored excessively without a clear retention policy, and provide specific recommendations for remediation.
</defensive_prompt>

<references>
- OWASP Exception and Error Handling: https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html
- OWASP Logging Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
- Next.js Error Handling: https://nextjs.org/docs/app/building-your-application/routing/error-handling
- TypeScript Error Handling Best Practices: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
</references>

</task>

