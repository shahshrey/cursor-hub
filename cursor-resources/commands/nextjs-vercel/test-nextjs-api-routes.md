<task name="Test Next.js API Routes">

<task_objective>
Test and validate Next.js API routes with comprehensive test scenarios and automated testing tools. Takes route path argument and optional flags (--method, --data, --headers) as input, analyzes API route implementation (App Router vs Pages Router, supported HTTP methods, authentication requirements), generates comprehensive test suite (unit tests, integration tests, authentication tests, validation tests, performance tests, error handling), provides manual testing commands (cURL, HTTPie), creates test data fixtures, and outputs detailed test report with coverage metrics and recommendations.
</task_objective>

<detailed_sequence_steps>

## 1. API Route Discovery and Analysis

1. Parse command arguments
   - Extract route path from arguments
   - Parse --method flag (default: GET)
   - Parse --data flag for request body (JSON string)
   - Parse --headers flag for custom headers (JSON object)

2. Locate API route files
   - Check for App Router API: app/api/[route-path]/route.ts
   - Check for Pages Router API: pages/api/[route-path].ts
   - If not found, search for similar routes
   - Verify route file exists

3. Analyze route implementation
   - Read route file contents
   - Detect supported HTTP methods (GET, POST, PUT, DELETE, PATCH)
   - Identify dynamic route segments ([param], [...slug])
   - Check for middleware usage
   - Detect authentication requirements
   - Identify validation schemas or logic

4. Analyze dependencies and types
   - Check for type definitions in route file or separate types file
   - Identify validation libraries (zod, yup, joi, etc.)
   - Detect database models or ORM usage
   - Check for authentication libraries (NextAuth, custom JWT)
   - Review imported utilities and helpers

## 2. Generate Unit Test Suite

1. Create test file structure
   - Generate test file: __tests__/[route-name].test.ts
   - Import testing libraries (jest, vitest, or detected framework)
   - Import route handlers
   - Setup test environment

2. Generate basic functionality tests for GET requests
   - Test: should return 200 for valid request
   - Test: should return valid JSON response
   - Test: should include expected fields in response
   - Test: should handle query parameters correctly
   - Test: should return correct data structure

3. Generate POST request tests
   - Test: should create resource with valid data (expect 201)
   - Test: should return created resource in response
   - Test: should reject invalid data (expect 400)
   - Test: should validate required fields
   - Test: should handle duplicate entries appropriately

4. Generate PUT/PATCH request tests
   - Test: should update resource with valid ID and data
   - Test: should return 404 for non-existent resource
   - Test: should validate update data
   - Test: should handle partial updates (PATCH)

5. Generate DELETE request tests
   - Test: should delete resource with valid ID
   - Test: should return appropriate status (200 or 204)
   - Test: should return 404 for non-existent resource
   - Test: should handle soft deletes if applicable

## 3. Generate Authentication and Authorization Tests

1. Create authentication test suite
   - Test: should require authentication for protected routes (expect 401)
   - Test: should allow authenticated requests with valid token
   - Test: should reject requests with invalid token (expect 403)
   - Test: should reject requests with expired token (expect 401)
   - Test: should validate JWT token format

2. Create authorization tests
   - Test: should allow access for users with correct role
   - Test: should deny access for users without required role (expect 403)
   - Test: should verify user owns resource before allowing modification
   - Test: should enforce resource-level permissions

3. Create session management tests
   - Test: should maintain session across requests
   - Test: should invalidate session on logout
   - Test: should handle concurrent sessions appropriately

## 4. Generate Input Validation Tests

1. Create validation test matrix
   - Define validation rules for each field (email format, phone format, age range, name length)
   - Generate test cases for valid and invalid values
   - Create boundary condition tests

2. Generate field-specific validation tests
   - For each field with validation:
     - Test with invalid value (expect 400)
     - Test with valid value (expect success)
     - Test with boundary values
     - Test with missing required fields
     - Test with extra unexpected fields

3. Create data type validation tests
   - Test: should reject non-JSON request body
   - Test: should reject wrong data types (string instead of number)
   - Test: should handle null values appropriately
   - Test: should handle undefined values appropriately
   - Test: should reject empty strings for required fields

4. Create sanitization tests
   - Test: should sanitize HTML in text inputs
   - Test: should trim whitespace
   - Test: should handle special characters
   - Test: should prevent XSS attacks

## 5. Generate Error Handling Tests

1. Create malformed request tests
   - Test: should handle malformed JSON with 400 error
   - Test: should handle missing Content-Type header
   - Test: should provide meaningful error messages
   - Test: should not expose internal errors to client

2. Create server error tests
   - Test: should handle database connection errors gracefully (expect 500)
   - Test: should handle timeout errors
   - Test: should handle third-party API failures
   - Test: should return proper error structure

3. Create edge case tests
   - Test: should handle very large request payloads
   - Test: should handle special characters in route parameters
   - Test: should handle concurrent requests to same resource
   - Test: should handle race conditions

## 6. Generate Performance Tests

1. Create response time tests
   - Test: should respond within acceptable time (<1000ms)
   - Measure actual response time
   - Compare against performance baseline

2. Create concurrent request tests
   - Test: should handle 10 concurrent requests successfully
   - Test: should maintain data integrity under load
   - Verify all responses are correct

3. Create rate limiting tests
   - Test: should implement rate limiting for excessive requests
   - Test: should return 429 after exceeding limit
   - Test: should include rate limit headers
   - Test: should reset rate limit after time window

4. Create load testing scenarios
   - Define scenarios for gradual load increase
   - Test database query performance
   - Test caching effectiveness
   - Monitor memory usage

## 7. Generate Manual Testing Commands

1. Create cURL command examples
   - GET request: curl -X GET "http://localhost:3000/api/[route-path]" -H "Accept: application/json"
   - POST request with data: curl -X POST "http://localhost:3000/api/[route-path]" -H "Content-Type: application/json" -d '{"key": "value"}'
   - Authenticated request: curl -X GET "http://localhost:3000/api/protected" -H "Authorization: Bearer TOKEN"
   - File upload: curl -X POST "http://localhost:3000/api/upload" -F "file=@path/to/file.jpg"

2. Create HTTPie command examples
   - GET request: http GET localhost:3000/api/[route-path]
   - POST request: http POST localhost:3000/api/[route-path] key=value
   - Authenticated request: http GET localhost:3000/api/protected Authorization:"Bearer TOKEN"
   - Custom headers: http GET localhost:3000/api/[route-path] X-Custom-Header:value

3. Create JavaScript fetch examples
   - Basic GET request
   - POST with JSON body
   - Request with authentication
   - File upload with FormData

## 8. Generate Test Data and Fixtures

1. Create test data fixtures
   - Define validUserData object with all required valid fields
   - Define invalidUserData object with invalid values
   - Create test data for boundary conditions
   - Generate mock responses

2. Create test data generators
   - Implement generateMockUser() function
   - Create generateBulkTestData(count) function
   - Add randomization for realistic test data
   - Include timestamps and IDs

3. Create test database seeders (if applicable)
   - Setup function to populate test database
   - Teardown function to clean database
   - Reset function between tests

4. Create mock service responses
   - Mock external API responses
   - Mock database query results
   - Mock authentication service responses

## 9. Setup Test Environment and Configuration

1. Configure test framework
   - Create or update jest.config.js or vitest.config.js
   - Set testEnvironment: 'node'
   - Configure setupFilesAfterEnv for global test setup
   - Set test file patterns
   - Configure coverage thresholds (70% minimum)

2. Create global test setup file
   - Setup test database connection
   - Create global test utilities
   - Setup mock functions
   - Configure test timeout limits

3. Create test helper functions
   - createAPITest helper for consistent request creation
   - assertValidResponse helper for response validation
   - mockAuthentication helper
   - createMockRequest helper using node-mocks-http

4. Setup before/after hooks
   - beforeAll: Connect to test database
   - afterAll: Disconnect and cleanup
   - beforeEach: Reset database state
   - afterEach: Clear mocks

## 10. Generate Interactive Testing Collections

1. Create Postman collection
   - Generate JSON collection file
   - Include all API routes as requests
   - Setup environment variables ({{baseUrl}})
   - Add pre-request scripts for authentication
   - Include test assertions

2. Create Thunder Client collection
   - Generate Thunder Client JSON format
   - Include all endpoints
   - Setup collection variables
   - Add request examples

3. Create Insomnia workspace (optional)
   - Export workspace JSON
   - Include all routes
   - Setup environment variables
   - Add request chaining

## 11. Setup Continuous Integration Testing

1. Create GitHub Actions workflow
   - Generate .github/workflows/api-tests.yml
   - Configure triggers (push, pull_request)
   - Setup Node.js environment
   - Install dependencies
   - Run test suite
   - Upload coverage reports

2. Configure test scripts in package.json
   - Add test script: npm test
   - Add test:watch script for development
   - Add test:coverage for coverage reports
   - Add test:api for API-specific tests

3. Setup coverage reporting
   - Configure code coverage collection
   - Setup coverage thresholds
   - Integrate with Codecov or Coveralls
   - Generate coverage badges

## 12. Generate Test Execution Report

1. Run complete test suite
   - Execute all generated tests
   - Capture test results
   - Record pass/fail counts
   - Measure execution time

2. Generate coverage report
   - Calculate line coverage percentage
   - Calculate branch coverage percentage
   - Calculate function coverage percentage
   - Identify uncovered lines

3. Analyze test results
   - Summarize passing tests
   - List failing tests with error details
   - Identify slow tests (>1s execution)
   - Flag flaky tests if detected

4. Create comprehensive test report
   - Test suite summary (total, passed, failed, skipped)
   - Coverage metrics with percentages
   - Performance analysis
   - Security test results
   - Error handling validation
   - Authentication/authorization test results
   - Recommendations for improvement

5. Provide actionable recommendations
   - Areas needing more test coverage
   - Performance optimizations needed
   - Security improvements required
   - API design suggestions
   - Documentation updates needed

</detailed_sequence_steps>

</task>

