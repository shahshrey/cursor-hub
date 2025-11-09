<task name="Implement Rate Limiting">

<task_objective>
Protect API endpoints and server actions from brute-force attacks and DDoS by implementing rate limiting and throttling mechanisms. This workflow helps determine appropriate rate limits for different endpoint types, generates production-ready rate limiting code for both serverful and serverless architectures, and audits existing endpoints to ensure comprehensive protection.
</task_objective>

<detailed_sequence_steps>
# Implement Rate Limiting - Detailed Sequence of Steps

## 1. Determine Rate Limiting Strategy

### 1.1 Identify Critical Endpoints Requiring Protection
1. Categorize endpoints by risk level and create an inventory:

**Critical (Strictest Limits)**:
- Authentication endpoints: `/api/auth/signin`, `/api/auth/signup`
- Password reset: `/api/auth/reset-password`, `/api/auth/forgot-password`
- Account modification: `/api/user/update`, `/api/user/delete`
- Payment processing: `/api/payments/*`

**High Priority (Moderate Limits)**:
- Form submissions: contact forms, feedback, comments
- Search endpoints with database queries
- File upload endpoints
- Email sending endpoints

**Medium Priority (Relaxed Limits)**:
- Public API endpoints
- Data retrieval endpoints with expensive operations
- Report generation endpoints

**Low Priority (Very Relaxed or None)**:
- Static content endpoints
- Simple read-only queries
- Health check endpoints

2. Document each endpoint with:
   - Path and HTTP method
   - Current usage patterns (if available)
   - Risk category

### 1.2 Define Appropriate Rate Limits
For each endpoint category, determine limits based on:

**Authentication Endpoints:**
- Failed login attempts: 5 attempts per 15 minutes per IP
- Successful login: 10 attempts per hour per IP
- Signup: 3 accounts per hour per IP
- Password reset: 3 attempts per hour per email

**API Endpoints:**
- Expensive operations: 10 requests per minute per user
- Standard operations: 100 requests per minute per user
- Read-only endpoints: 200 requests per minute per user

**Public Endpoints:**
- Unauthenticated: 20 requests per minute per IP
- Authenticated users: Higher limits based on plan/tier

### 1.3 Choose Rate Limiting Implementation
Select the appropriate approach based on infrastructure:

**For Traditional Server (Node.js/Express):**
- Use `express-rate-limit` middleware
- Store counts in memory (single server) or Redis (multiple servers)

**For Serverless (Next.js on Vercel/AWS Lambda):**
- Use Edge Middleware with external storage
- Options:
  - Vercel Edge Config
  - Upstash Redis
  - Cloudflare KV
  - Custom solution with database

**For This Project (Next.js + Supabase):**
- Recommended: Vercel Edge Middleware with Upstash Redis
- Alternative: Custom rate limiting with Supabase database

## 2. Implement Rate Limiting Code

### 2.1 Set Up Dependencies
Install required packages based on chosen approach:

**For express-rate-limit (if using Express):**
```bash
npm install express-rate-limit
npm install rate-limit-redis redis  # if using Redis
```

**For serverless with Upstash:**
```bash
npm install @upstash/redis @upstash/ratelimit
```

### 2.2 Implement for Traditional Server
Use this proactive prompt for serverful implementations:

```
Generate production-ready Node.js code for an Express API endpoint that implements rate limiting using `express-rate-limit` to prevent brute-force and DDoS attacks. The endpoint should be a login route that:
- Limits to 5 failed login attempts per 15 minutes per IP address
- Uses different limits for successful vs failed attempts (tiered rate limiting)
- Provides custom error responses when limits are exceeded with appropriate status codes
- Includes inline comments explaining how rate limiting prevents brute-force attacks and mitigates DDoS
- Handles edge cases like proxy forwarding and X-Forwarded-For headers

Include complete working code with proper error handling and security best practices.
```

**Example Implementation:**
```typescript
import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.REDIS_URL
})

const loginLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:login:',
  }),
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.user?.trusted === true,
  keyGenerator: (req) => {
    return req.ip || req.headers['x-forwarded-for'] || 'unknown'
  }
})

app.post('/api/auth/login', loginLimiter, async (req, res) => {
})
```

### 2.3 Implement for Serverless (Next.js)
Use this proactive prompt for serverless implementations:

```
Generate production-ready Next.js Edge Middleware code that implements rate limiting using Upstash Redis to prevent brute-force and DDoS attacks. The middleware should:
- Protect authentication routes (/api/auth/*) with 5 requests per 15 minutes per IP
- Protect API routes (/api/*) with 100 requests per minute per IP
- Use different limits for authenticated vs unauthenticated users
- Extract IP address correctly handling proxies and X-Forwarded-For
- Provide custom error responses with Retry-After headers when limits exceeded
- Include inline comments explaining the security benefits and configuration choices

Include complete working middleware with proper error handling, TypeScript types, and integration with Upstash Redis.
```

**Example Implementation:**
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  prefix: 'rl:auth',
  analytics: true,
})

const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  prefix: 'rl:api',
  analytics: true,
})

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown'
  const path = request.nextUrl.pathname
  
  let limiter = apiLimiter
  if (path.startsWith('/api/auth')) {
    limiter = authLimiter
  }
  
  const { success, limit, reset, remaining } = await limiter.limit(ip)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: reset },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
          'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
        }
      }
    )
  }
  
  const response = NextResponse.next()
  response.headers.set('X-RateLimit-Limit', limit.toString())
  response.headers.set('X-RateLimit-Remaining', remaining.toString())
  
  return response
}

export const config = {
  matcher: ['/api/:path*'],
}
```

### 2.4 Implement Tiered Rate Limiting
For more sophisticated protection with different limits based on authentication status:

```typescript
export async function middleware(request: NextRequest) {
  const ip = getClientIp(request)
  const userId = await getUserId(request)
  
  const identifier = userId || ip
  
  const limiter = userId 
    ? authenticatedLimiter
    : unauthenticatedLimiter
  
  const { success } = await limiter.limit(identifier)
  
  if (!success) {
    return new NextResponse('Rate limit exceeded', { status: 429 })
  }
  
  return NextResponse.next()
}
```

### 2.5 Handle Edge Cases
Implement proper handling for:

**IP Address Extraction:**
```typescript
function getClientIp(request: NextRequest): string {
  return (
    request.ip ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    'unknown'
  )
}
```

**Bypassing for Trusted Sources:**
```typescript
const TRUSTED_IPS = new Set([
  '127.0.0.1',
])

if (TRUSTED_IPS.has(ip)) {
  return NextResponse.next()
}
```

## 3. Audit Rate Limiting Coverage

### 3.1 Inventory All Endpoints
1. List all API routes and server actions:
   ```bash
   find app/api -name "route.ts" -o -name "*.ts"
   find server/actions -name "*.ts"
   ```

2. Create a spreadsheet or document with:
   - Endpoint path
   - HTTP method
   - Purpose/functionality
   - Current rate limiting status
   - Recommended limits

### 3.2 Verify Rate Limiting Implementation
For each endpoint, check:

1. **Is rate limiting applied?**
   - Middleware covers the route
   - Or endpoint has individual rate limiting

2. **Are limits appropriate?**
   - Matches the risk level
   - Not too strict (blocking legitimate users)
   - Not too lenient (allowing attacks)

3. **Is error handling proper?**
   - Returns 429 status code
   - Provides Retry-After header
   - Logs rate limit violations

4. **Does it handle edge cases?**
   - Proper IP extraction
   - Handles authenticated vs unauthenticated
   - Bypasses health checks if needed

### 3.3 Generate Comprehensive Audit Report
Use this defensive prompt:

```
Audit our entire Next.js application to verify that rate limiting is properly implemented on all API endpoints and server actions, especially authentication and resource-intensive operations. Analyze:
- All routes in /app/api/**/*.ts
- All server actions in /server/actions/**/*.ts
- Middleware configuration in middleware.ts

For each endpoint, verify:
1. Rate limiting is implemented (via middleware or endpoint-level)
2. Limits are appropriate for the endpoint's purpose and risk level
3. Error responses follow best practices (429 status, Retry-After header)
4. IP extraction handles proxies correctly
5. Different limits for authenticated vs unauthenticated users where appropriate

Provide a detailed report with:
- Endpoints lacking rate limiting (prioritized by risk)
- Endpoints with insufficient or excessive limits
- Configuration issues or security gaps
- Specific recommendations for implementing/adjusting rate limits
- Code examples for remediation
- Priority ordering: Critical > High > Medium > Low
```

### 3.4 Analyze Results
Categorize findings:

**Critical Issues:**
- Authentication endpoints without rate limiting
- Payment endpoints without protection
- Password reset without limits

**High Priority:**
- Form submissions without limits
- Search endpoints vulnerable to DoS
- File upload without throttling

**Medium Priority:**
- API endpoints with limits that are too generous
- Missing Retry-After headers
- Incorrect IP extraction

**Low Priority:**
- Rate limiting on low-risk read-only endpoints
- Missing rate limit headers in responses

## 4. Implement Missing Rate Limits

### 4.1 Prioritize Implementation
Fix in this order:
1. Critical authentication/payment endpoints
2. High-risk form submissions and searches
3. Medium-risk API endpoints
4. Low-risk optimizations

### 4.2 Apply Rate Limiting to Gaps
For each endpoint missing rate limiting:

1. Determine appropriate limits based on endpoint type (from Step 1.2)
2. Implement using the chosen approach (middleware or endpoint-level)
3. Add proper error handling and headers
4. Test with various scenarios

### 4.3 Test Rate Limiting
For each protected endpoint, verify:

**Functional Test:**
```bash
for i in {1..6}; do
  curl -i http://localhost:3000/api/auth/login
  echo "Request $i completed"
done
```

**Expected Results:**
- Requests 1-5: Success (200 or appropriate status)
- Request 6: Rate limited (429 status with Retry-After header)

**Load Test:**
Use tools like `ab` (Apache Bench) or `k6`:
```bash
ab -n 100 -c 10 http://localhost:3000/api/endpoint
```

Verify rate limits are enforced correctly under load.

### 4.4 Monitor Rate Limiting
Set up monitoring to track:
- Number of rate limit violations per endpoint
- IPs that frequently hit limits (potential attackers)
- False positives (legitimate users blocked)
- Rate limit effectiveness during actual attacks

## 5. Maintain and Optimize Rate Limiting

### 5.1 Document Rate Limiting Configuration
Create documentation including:
- Which endpoints have rate limiting
- Current limit values and rationale
- How to adjust limits
- How to bypass for testing
- Monitoring and alert setup

### 5.2 Review and Adjust Limits
Schedule regular reviews (quarterly) to:
- Analyze rate limit hit rates
- Identify false positives
- Adjust limits based on usage patterns
- Add new endpoints to protection

### 5.3 Implement Dynamic Rate Limiting
For advanced protection, consider:
- User-based limits (higher for paid users)
- Adaptive limits (tighten during attacks)
- Distributed rate limiting (across regions)
- Rate limiting by API key instead of IP

### 5.4 Establish Response Protocols
Define procedures for:
- Investigating repeated rate limit violations
- Whitelisting legitimate high-volume users
- Temporarily tightening limits during attacks
- Communicating with users affected by rate limits

</detailed_sequence_steps>

</task>

