<task name="Generate Vercel Edge Function">

<task_objective>
Generate optimized Vercel Edge Functions with comprehensive features for geolocation-based content delivery, authentication, data transformation, and proxy/caching. Takes function name and type flags (--auth, --geo, --transform, --proxy) as input, analyzes project structure and framework configuration, creates complete edge function implementation with proper file structure (main handler, types, utilities, tests), implements requested features (JWT authentication, geolocation routing, data transformation, caching proxy), and generates production-ready TypeScript code with error handling and performance optimization.
</task_objective>

<detailed_sequence_steps>

## 1. Project Analysis and Setup

1. Analyze current project structure
   - Check for existing vercel.json configuration
   - Review next.config.js for framework settings
   - Detect API routes location (app/api/ or pages/api/)
   - Check for existing middleware.ts
   - Verify TypeScript configuration if present

2. Parse function name and type from arguments
   - Extract function name from arguments
   - Detect --auth flag for authentication functionality
   - Detect --geo flag for geolocation features
   - Detect --transform flag for data transformation
   - Detect --proxy flag for proxy/caching functionality
   - Set default to base edge function if no flags

3. Determine target directory structure
   - For App Router: api/edge/[function-name]/
   - For Pages Router: pages/api/edge/[function-name]/
   - Create directory structure if doesn't exist

4. Check for required dependencies
   - Verify next package version supports edge runtime
   - Check for jose package if --auth flag (JWT handling)
   - Verify types are available (@types/node, etc.)

## 2. Generate Base Edge Function Structure

1. Create main edge function file
   - Generate index.ts or route.ts (depending on router type)
   - Add edge runtime export: export const runtime = 'edge'
   - Import NextRequest and NextResponse from next/server
   - Create basic GET and POST handler skeletons

2. Implement basic request handling
   - Extract geolocation data from request.geo
   - Extract request metadata (IP, user agent, referer)
   - Setup response with appropriate headers
   - Add basic error handling with try-catch

3. Configure response headers
   - Set Cache-Control for edge caching
   - Add Content-Type: application/json
   - Include custom headers (X-Edge-Location, etc.)
   - Configure CORS headers if needed

4. Create utility functions
   - Request validation function
   - Response formatting function
   - Error response generator
   - Logging helper

## 3. Implement Geolocation Features (if --geo flag)

1. Create geolocation-based content configuration
   - Define content config by country code
   - Setup currency, language, and content per region
   - Configure pricing variations by geography
   - Add fallback configuration for unknown regions

2. Implement country detection
   - Extract country from request.geo.country
   - Get city and region information
   - Provide default values for missing geo data

3. Create region-specific response handler
   - Look up configuration based on detected country
   - Apply regional customizations
   - Include edge location in response
   - Add appropriate caching headers

4. Setup geo-based routing logic
   - Implement conditional redirects by country
   - Route to region-specific content
   - Handle regional restrictions if needed
   - Add A/B testing by geography

## 4. Implement Authentication (if --auth flag)

1. Setup JWT verification
   - Import jwtVerify from jose library
   - Configure JWT secret from environment variables
   - Create TextEncoder for secret encoding

2. Implement token extraction
   - Check Authorization header for Bearer token
   - Check auth-token cookie as fallback
   - Return 401 if no token found

3. Create token verification function
   - Verify JWT signature with secret
   - Extract payload (user ID, email, role, expiration)
   - Handle verification errors gracefully
   - Return 401 for invalid tokens

4. Implement authentication response
   - Return user information on successful auth
   - Include location data in response
   - Add user context to headers for downstream use
   - Set x-user-id and x-user-role headers

5. Create login/token generation endpoint (POST)
   - Accept username and password from request body
   - Validate credentials (implement or stub)
   - Generate JWT token with user claims
   - Set secure HTTP-only cookie with token
   - Return user information and success status

6. Implement role-based access control
   - Create requireRole middleware function
   - Check user role from request headers
   - Return 403 if role not authorized
   - Allow request to proceed if authorized

## 5. Implement Data Transformation (if --transform flag)

1. Define transformation configuration interface
   - Format option: json, xml, csv
   - Fields filter for selective output
   - Custom transform functions per field
   - Transformation rules and validators

2. Create transformer functions
   - Currency conversion transformer
   - Date formatting transformer (ISO, US, custom formats)
   - Text case transformation (upper, lower, title)
   - Number formatting transformer

3. Implement data transformation pipeline
   - Accept data and config in POST request body
   - Apply field filtering if specified
   - Execute custom transformations per field
   - Add metadata (transformed timestamp, location, edge region)

4. Implement output formatters
   - JSON formatter (default, pretty-printed)
   - XML converter (simple implementation or library)
   - CSV converter for array data
   - Set appropriate Content-Type headers

5. Create validation and error handling
   - Validate request body structure
   - Check for required fields in config
   - Handle transformation errors gracefully
   - Return meaningful error messages

## 6. Implement Proxy and Caching (if --proxy flag)

1. Define proxy configuration
   - Target URL for proxying
   - Cache time settings (s-maxage)
   - Custom headers to add/forward
   - Response transformation flag

2. Create proxy endpoint handler
   - Extract proxy type and target path from query params
   - Load appropriate proxy configuration
   - Validate proxy type exists in config

3. Implement request forwarding
   - Build complete target URL
   - Forward relevant headers (X-Forwarded-For, X-Real-IP)
   - Add custom headers from configuration
   - Execute fetch to upstream server

4. Handle upstream responses
   - Check response status
   - Return 502 for upstream errors
   - Parse JSON responses if Content-Type is application/json
   - Pass through binary responses (images, etc.)

5. Implement response transformation
   - Add geo context to JSON responses
   - Include proxy metadata (timestamp, location)
   - Preserve original Content-Type for non-JSON

6. Configure caching strategy
   - Set Cache-Control headers with configured maxAge
   - Set stale-while-revalidate for extended caching
   - Add cache status headers (X-Proxy-Cache: HIT/MISS)
   - Include edge location in headers

## 7. Create Supporting Files

1. Generate types.ts file
   - Define RequestMetadata interface
   - Define ValidationResult interface
   - Define configuration interfaces for each feature
   - Export all types for reusability

2. Create utils.ts file
   - Implement getClientIP function
   - Create generateCacheKey function
   - Implement createCorsResponse helper
   - Add validateGeoRestrictions function
   - Create maskSensitive for secure logging

3. Generate config.ts file
   - Define EdgeFunctionConfig interface
   - Set cache time defaults
   - Configure rate limiting settings
   - Setup geo restrictions
   - Define security settings (CORS origins, require auth)

4. Create __tests__ directory and test file
   - Setup test file structure
   - Create mock request helper functions
   - Write tests for GET requests
   - Write tests for POST requests
   - Add tests for error scenarios
   - Include geo data testing
   - Test authentication flows if --auth

## 8. Implement Performance Optimizations

1. Add response optimization
   - Implement dynamic cache time based on URL patterns
   - Add compression hints in headers
   - Include performance timing headers
   - Setup edge location headers

2. Create error handling wrapper
   - Centralized error response generator
   - Log errors with context (URL, method, country, timestamp)
   - Generate unique request IDs for tracking
   - Return user-friendly error messages

3. Implement rate limiting (optional)
   - Create in-memory rate limit store
   - Track requests per IP or user
   - Return 429 Too Many Requests when exceeded
   - Add rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining)

4. Add monitoring and logging
   - Log function invocations
   - Track execution time
   - Record error rates
   - Monitor cache hit rates

## 9. Generate Documentation and Examples

1. Create inline code documentation
   - Add JSDoc comments to all exported functions
   - Document interfaces and types
   - Include usage examples in comments
   - Add parameter descriptions

2. Generate usage examples
   - Example cURL commands for testing
   - Example fetch calls from client-side
   - Example responses for each endpoint
   - Authentication flow examples if --auth

3. Create README.md for the function
   - Function purpose and features
   - Setup instructions
   - Environment variables required
   - API endpoint documentation
   - Request/response examples
   - Testing instructions

## 10. Validation and Testing Setup

1. Validate generated code
   - Ensure TypeScript compiles without errors
   - Check for import statement completeness
   - Verify edge runtime compatibility
   - Validate no Node.js-specific APIs used

2. Create test scenarios
   - Test basic GET request
   - Test POST with valid data
   - Test authentication flows (if --auth)
   - Test geolocation handling (if --geo)
   - Test data transformation (if --transform)
   - Test proxy functionality (if --proxy)
   - Test error handling

3. Generate integration test helpers
   - Mock NextRequest creation function
   - Mock geo data helper
   - Test data fixtures
   - Response assertion helpers

4. Provide testing commands
   - How to run unit tests
   - How to test locally with curl
   - How to deploy and test on Vercel
   - How to monitor in production

## 11. Deployment Configuration

1. Update vercel.json if needed
   - Add function configuration for new edge function
   - Set runtime to nodejs18.x or later
   - Configure maxDuration (default 30s for edge)
   - Set memory allocation

2. Configure environment variables
   - List required environment variables
   - Provide .env.example entries
   - Document sensitive variables (JWT_SECRET, API_KEYS)
   - Add validation for required variables

3. Create deployment checklist
   - [ ] Environment variables configured in Vercel
   - [ ] Edge function compiles without errors
   - [ ] Tests pass successfully
   - [ ] Documentation is complete
   - [ ] Performance tested under load
   - [ ] Error handling validated
   - [ ] Monitoring configured

## 12. Post-Generation Report

1. Generate summary of created files
   - Main edge function file with path
   - Types file
   - Utils file
   - Config file
   - Test file
   - Documentation files

2. List implemented features
   - Edge runtime enabled
   - Geolocation support (if --geo)
   - Authentication/JWT (if --auth)
   - Data transformation (if --transform)
   - Proxy/caching (if --proxy)
   - Error handling and logging

3. Provide next steps
   - How to test locally
   - Required environment variables to set
   - How to deploy to Vercel
   - How to monitor performance
   - Recommended optimizations

4. Include usage examples
   - cURL command for testing
   - JavaScript fetch example
   - Expected response format
   - Error response examples

</detailed_sequence_steps>

</task>

