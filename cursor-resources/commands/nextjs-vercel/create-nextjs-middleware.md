<task name="Create Next.js Middleware">

<task_objective>
Create optimized Next.js middleware with comprehensive functionality for authentication, rate limiting, redirects, and routing logic. Takes middleware type and feature flags (--auth, --rate-limit, --redirect, --rewrite) as input, analyzes existing project middleware and authentication setup, generates complete middleware implementation with modular utility functions (auth verification, rate limiting, CORS handling, security headers, redirects), implements middleware composition for combining multiple concerns, creates comprehensive test suite, and provides production-ready TypeScript code with proper error handling and performance monitoring.
</task_objective>

<detailed_sequence_steps>

## 1. Project Analysis and Requirements Detection

1. Parse middleware type and flags from arguments
   - Extract middleware type from arguments
   - Detect --auth flag for authentication middleware
   - Detect --rate-limit flag for rate limiting functionality
   - Detect --redirect flag for URL redirect rules
   - Detect --rewrite flag for URL rewriting logic
   - Determine if combining multiple features

2. Analyze existing project structure
   - Check for existing middleware.ts or middleware.js at root
   - Review next.config.js for middleware configuration
   - Check app/ directory structure (App Router)
   - Look for authentication setup (NextAuth, Auth0, custom)
   - Identify any existing middleware utilities in lib/middleware/

3. Detect authentication system
   - Check for next-auth configuration
   - Look for custom JWT implementation
   - Check for Auth0 or other providers
   - Identify authentication patterns in use
   - Locate auth configuration files

4. Review project dependencies
   - Check for jose package (JWT verification)
   - Look for authentication libraries
   - Verify Next.js version supports middleware
   - Check for TypeScript configuration

## 2. Create Directory Structure and Base Files

1. Create middleware utilities directory
   - Create lib/middleware/ if doesn't exist
   - Prepare for modular middleware components
   - Setup proper file organization

2. Determine file structure
   - middleware.ts at project root (main entry point)
   - lib/middleware/auth.ts (authentication logic)
   - lib/middleware/rateLimit.ts (rate limiting)
   - lib/middleware/security.ts (security headers)
   - lib/middleware/redirects.ts (redirect rules)
   - lib/middleware/cors.ts (CORS handling)
   - lib/middleware/compose.ts (middleware composition)
   - lib/middleware/types.ts (TypeScript types)

## 3. Generate Main Middleware File

1. Create base middleware.ts at project root
   - Import NextRequest and NextResponse from next/server
   - Import middleware utilities as needed
   - Setup middleware function skeleton
   - Add runtime configuration export

2. Implement middleware orchestration
   - Apply security headers first (always execute)
   - Apply rate limiting (return early if exceeded)
   - Check authentication for protected routes
   - Handle redirects and rewrites
   - Return NextResponse.next() for normal flow

3. Create route protection logic
   - Define isProtectedRoute function
   - List protected path patterns
   - Use pathname matching logic
   - Support wildcard patterns

4. Configure matcher pattern
   - Exclude _next/static (Next.js static files)
   - Exclude _next/image (image optimization)
   - Exclude favicon.ico
   - Exclude image extensions (svg, png, jpg, jpeg, gif, webp)
   - Match all other routes

5. Add error handling
   - Wrap middleware in try-catch
   - Log errors with context
   - Return appropriate error responses
   - Prevent middleware from crashing app

## 4. Implement Authentication Middleware (if --auth)

1. Create lib/middleware/auth.ts
   - Import NextRequest and NextResponse
   - Import jwtVerify from jose library
   - Configure JWT secret from environment

2. Implement token extraction
   - Check for auth-token cookie
   - Check Authorization header for Bearer token
   - Return null if no token found

3. Create JWT verification function
   - Verify token with secret using jwtVerify
   - Extract payload (user ID, email, role, exp)
   - Handle verification errors (invalid signature, expired)
   - Return null for invalid tokens

4. Implement authMiddleware function
   - Call token extraction
   - If no token, redirect to login with callback URL
   - Verify token
   - If invalid, redirect to login
   - If valid, add user info to headers (x-user-id, x-user-role)
   - Return NextResponse.next() with headers

5. Create redirectToLogin helper
   - Build login URL from request URL
   - Add callbackUrl query parameter with current URL
   - Return NextResponse.redirect to login page

6. Implement role-based access control
   - Create requireRole(allowedRoles) function
   - Check user role from request headers
   - Return 403 Forbidden if role not authorized
   - Return NextResponse.next() if authorized

## 5. Implement Rate Limiting Middleware (if --rate-limit)

1. Create lib/middleware/rateLimit.ts
   - Setup in-memory store with Map (note: use Redis in production)
   - Define RateLimitConfig interface
   - Create default rate limit configuration

2. Define rate limit configuration
   - windowMs: Time window in milliseconds (default: 15 minutes)
   - maxRequests: Maximum requests per window (default: 100)
   - keyGenerator: Function to generate unique key per client

3. Implement client identification
   - Extract IP from x-forwarded-for header
   - Fallback to x-real-ip header
   - Fallback to request.ip
   - Use "unknown" as last resort

4. Create rate limiting logic
   - Generate client key (IP or custom)
   - Get current time
   - Check if client has existing record
   - If expired or no record, initialize with count: 1
   - If within window, increment count
   - If count exceeds limit, return 429 response

5. Implement rate limit response
   - Return 429 Too Many Requests status
   - Add X-RateLimit-Limit header (max requests)
   - Add X-RateLimit-Remaining header (0)
   - Add X-RateLimit-Reset header (seconds until reset)
   - Add Retry-After header

6. Create API-specific rate limiting
   - Define apiRateLimit function with stricter limits
   - Use custom key generator (api:IP)
   - Shorter window (1 minute)
   - Lower request limit (60 per minute)

## 6. Implement Security Headers Middleware

1. Create lib/middleware/security.ts
   - Import NextRequest and NextResponse
   - Define security headers object

2. Configure comprehensive security headers
   - X-XSS-Protection: '1; mode=block'
   - X-Content-Type-Options: 'nosniff'
   - X-Frame-Options: 'DENY' or 'SAMEORIGIN'
   - Strict-Transport-Security: 'max-age=31536000; includeSubDomains'
   - Referrer-Policy: 'strict-origin-when-cross-origin'
   - Permissions-Policy: Restrict camera, microphone, geolocation

3. Generate Content Security Policy
   - default-src 'self'
   - script-src 'self' 'unsafe-eval' 'unsafe-inline' (adjust as needed)
   - style-src 'self' 'unsafe-inline'
   - img-src 'self' data: https:
   - font-src 'self' data:
   - connect-src 'self'
   - frame-ancestors 'none'

4. Create securityMiddleware function
   - Create NextResponse.next()
   - Iterate through security headers object
   - Set each header on response
   - Return response with all headers

## 7. Implement CORS Middleware

1. Create lib/middleware/cors.ts
   - Define CorsOptions interface
   - Create default CORS configuration

2. Configure CORS options
   - origin: Allow specific origins or '*' for development
   - methods: List allowed HTTP methods
   - allowedHeaders: List allowed request headers
   - credentials: Boolean for credentials support

3. Implement origin validation
   - Create shouldAllowOrigin function
   - Check if origin matches allowed patterns
   - Support string, array, or boolean origin config
   - Return true if origin is allowed

4. Handle preflight requests (OPTIONS)
   - Create handlePreflight function
   - Set Access-Control-Allow-Origin header
   - Set Access-Control-Allow-Methods header
   - Set Access-Control-Allow-Headers header
   - Set Access-Control-Max-Age (24 hours)
   - Return response with 200 status

5. Create corsMiddleware function
   - Return middleware function
   - Check if request is OPTIONS (preflight)
   - Call handlePreflight if OPTIONS
   - Otherwise, set CORS headers on response
   - Set Access-Control-Allow-Credentials if configured

## 8. Implement Redirect and Rewrite Middleware (if --redirect/--rewrite)

1. Create lib/middleware/redirects.ts
   - Define RedirectRule interface
   - Create array of redirect rules

2. Define redirect rule structure
   - source: String or RegExp pattern to match
   - destination: Target URL
   - permanent: Boolean for 301 vs 302 status
   - conditions: Optional function for conditional redirects

3. Create redirect rule examples
   - Legacy URL redirects (/old-page → /new-page, permanent: true)
   - Dynamic redirects with regex (/user/(.+) → /profile/$1)
   - Conditional redirects (admin → dashboard if role=admin)
   - Maintenance mode redirect (all routes → /maintenance if env flag set)

4. Implement shouldApplyRule function
   - Check if pathname matches source pattern
   - Handle string exact match
   - Handle regex pattern match
   - Check additional conditions if provided
   - Return boolean

5. Create resolveDestination function
   - Handle static destination strings
   - Replace dynamic segments ($1, $2 from regex)
   - Support template strings
   - Return resolved destination URL

6. Implement redirectMiddleware function
   - Extract pathname from request
   - Iterate through redirect rules
   - Check if rule should apply
   - Build destination URL
   - Return NextResponse.redirect with appropriate status
   - Return null if no redirect needed

## 9. Implement Advanced Middleware Features

1. Create A/B testing middleware (optional)
   - Define ABTest interface
   - Create list of active tests
   - Implement user bucketing (hash-based)
   - Set variant cookies for consistency
   - Add variant headers for server-side use

2. Create feature flag middleware (optional)
   - Define FeatureFlag interface
   - Create feature flag list
   - Implement percentage rollout logic
   - Check user groups for targeting
   - Check geo regions for regional flags
   - Set feature flags in response headers

3. Create geolocation routing (optional)
   - Access request.geo for location data
   - Route based on country/region
   - Apply country-specific redirects
   - Set geo headers for downstream use

4. Create bot detection middleware (optional)
   - Parse user-agent for bot detection
   - Implement different handling for bots
   - Rate limit bots more strictly
   - Add bot identification headers

## 10. Implement Middleware Composition

1. Create lib/middleware/compose.ts
   - Define MiddlewareFunction type
   - Create composeMiddleware function

2. Implement composition logic
   - Accept array of middleware functions
   - Return composed middleware function
   - Execute middlewares in sequence
   - Pass response through chain

3. Handle early returns
   - Check for redirect responses (3xx status)
   - Return immediately for redirects
   - Check for error responses (4xx, 5xx)
   - Return immediately for errors
   - Continue chain for normal responses

4. Implement response accumulation
   - Merge headers from multiple middlewares
   - Preserve cookies across chain
   - Accumulate any response modifications

## 11. Generate Type Definitions

1. Create lib/middleware/types.ts
   - Export MiddlewareFunction type
   - Export RedirectRule interface
   - Export RateLimitConfig interface
   - Export CorsOptions interface
   - Export all shared types

2. Document types with JSDoc
   - Add descriptions for each interface
   - Document function signatures
   - Include usage examples
   - Explain complex types

## 12. Create Testing Suite

1. Generate __tests__/middleware.test.ts
   - Import testing utilities
   - Import NextRequest for mocking
   - Import middleware functions to test

2. Create request mocking utilities
   - Implement createMockRequest function
   - Mock geo data property
   - Mock headers
   - Mock cookies

3. Write security headers tests
   - Test: should add security headers
   - Test: should include X-Frame-Options
   - Test: should include CSP header
   - Verify all expected headers present

4. Write authentication tests
   - Test: should redirect unauthenticated users from protected routes
   - Test: should allow authenticated users with valid token
   - Test: should reject invalid tokens
   - Test: should add user headers on success

5. Write rate limiting tests
   - Test: should allow requests under limit
   - Test: should return 429 when limit exceeded
   - Test: should reset counter after window expires
   - Test: should include rate limit headers

6. Write redirect tests
   - Test: should redirect legacy URLs
   - Test: should handle dynamic redirects
   - Test: should apply conditional redirects
   - Test: should return null when no redirect needed

## 13. Add Performance Monitoring

1. Create lib/middleware/monitoring.ts
   - Implement performance timing
   - Track middleware execution time
   - Add timing headers to response

2. Implement request logging
   - Log middleware invocations
   - Track request metadata (method, path, IP, timing)
   - Log errors with context
   - Avoid logging sensitive data

3. Create metrics collection
   - Count total requests
   - Track requests by route
   - Monitor authentication success/failure rates
   - Track rate limit hits

## 14. Generate Documentation and Examples

1. Create inline documentation
   - Add JSDoc comments to all functions
   - Document parameters and return values
   - Include usage examples in comments
   - Explain complex logic

2. Create README for middleware
   - Explain middleware purpose and features
   - List all implemented features
   - Document configuration options
   - Provide usage examples

3. Generate example configurations
   - Show how to enable/disable features
   - Demonstrate custom configurations
   - Provide production-ready examples
   - Include environment variable setup

4. Create testing documentation
   - How to run tests
   - How to test middleware locally
   - How to debug middleware issues
   - Common troubleshooting steps

## 15. Deployment and Validation

1. Validate TypeScript compilation
   - Run type check on all middleware files
   - Ensure no type errors
   - Verify all imports resolve

2. Run linting
   - Execute ESLint on middleware files
   - Fix any style issues
   - Ensure consistency with project standards

3. Run test suite
   - Execute all middleware tests
   - Verify 100% test pass rate
   - Check test coverage
   - Ensure edge cases covered

4. Test in development
   - Start development server
   - Test protected routes
   - Verify authentication flow
   - Test redirects and rewrites
   - Check security headers in browser DevTools

## 16. Generate Implementation Report

1. List all created files
   - Main middleware.ts file
   - All utility files in lib/middleware/
   - Test files
   - Type definition files

2. Document implemented features
   - Authentication with JWT verification
   - Rate limiting per IP
   - Security headers (CSP, HSTS, etc.)
   - CORS configuration
   - URL redirects and rewrites
   - Any additional features

3. Provide configuration instructions
   - Required environment variables (JWT_SECRET, etc.)
   - How to customize rate limits
   - How to add new redirect rules
   - How to modify CORS settings

4. Create usage examples
   - How to protect new routes
   - How to add custom middleware
   - How to test middleware
   - How to monitor middleware performance

5. Provide next steps
   - Deploy to production checklist
   - Monitoring recommendations
   - Performance optimization tips
   - Security hardening suggestions

</detailed_sequence_steps>

</task>

