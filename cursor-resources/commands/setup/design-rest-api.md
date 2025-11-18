<task name="Design REST API">

<task_objective>
Design comprehensive RESTful API architecture with industry best practices including endpoints, authentication, authorization, and documentation. The input includes framework detection, existing API routes, authentication components, and documentation from the codebase. The output will be a complete API specification with endpoints, authentication mechanisms, validation rules, OpenAPI documentation, and client SDKs.
</task_objective>

<detailed_sequence_steps>
# Design REST API - Detailed Sequence of Steps

## 1. Current State Analysis

1. Detect framework from @package.json or @requirements.txt (Express, FastAPI, Spring Boot, etc.).

2. Analyze existing API by searching for routes and endpoints in the codebase.

3. Identify authentication components by searching for auth, JWT, or session patterns.

4. Review existing documentation from @swagger.yaml or @openapi.json if present.

5. Determine API version from **$ARGUMENTS** (--v1 | --v2 | --graphql-hybrid | --openapi).

## 2. Resource Design

1. Identify core resources and entities from the application domain model.

2. Design RESTful endpoints following REST conventions (GET, POST, PUT, PATCH, DELETE).

3. Structure URL patterns using hierarchical resource paths and proper nesting.

4. Define resource relationships including parent-child and associated resources.

5. Establish naming conventions for endpoints ensuring consistency and clarity.

## 3. Request/Response Models

1. Design data validation schemas for request bodies using framework-specific validators.

2. Define response serialization formats ensuring consistent data structures.

3. Implement comprehensive error handling with appropriate HTTP status codes.

4. Create standard error response formats with error codes and messages.

5. Design pagination, filtering, and sorting mechanisms for collection endpoints.

## 4. Authentication & Authorization

1. Implement authentication mechanism using JWT, OAuth, or session-based auth.

2. Design authorization rules using role-based access control (RBAC) or attribute-based access control.

3. Configure API key management for third-party integrations and service accounts.

4. Implement rate limiting per user, endpoint, or API key to prevent abuse.

5. Design token refresh mechanisms and session management strategies.

## 5. API Documentation

1. Generate OpenAPI/Swagger specifications from route definitions and schemas.

2. Create interactive documentation using Swagger UI or similar tools.

3. Write comprehensive endpoint descriptions including parameters and responses.

4. Provide code examples for each endpoint in multiple programming languages.

5. Document authentication flows, error codes, and rate limiting policies.

## 6. Versioning Strategy

1. Determine versioning approach from **$ARGUMENTS** (URL, header, or content-type based).

2. Design version migration strategy for backward compatibility and deprecation.

3. Document API version lifecycle including support periods and sunset dates.

4. Implement version-specific routing and request handling logic.

5. Create versioning documentation for API consumers.

## 7. Performance & Security

1. Implement caching strategies using ETags, Cache-Control headers, and Redis.

2. Design pagination mechanisms for large result sets with cursor or offset-based approaches.

3. Configure CORS policies for cross-origin access control.

4. Implement comprehensive input validation to prevent injection attacks.

5. Apply SQL injection prevention using parameterized queries and ORM best practices.

6. Design request/response compression for bandwidth optimization.

## 8. Advanced Features Implementation

1. Design real-time capabilities using WebSockets or Server-Sent Events where needed.

2. Implement file upload endpoints with multipart form data handling.

3. Create batch operation endpoints for efficient bulk data processing.

4. Design webhook systems for event-driven integrations.

5. Integrate monitoring and logging for API usage analytics and debugging.

## 9. Standards Compliance

1. Validate adherence to REST principles and resource-oriented design.

2. Ensure HTTP specification compliance for methods, status codes, and headers.

3. Apply API design best practices including HATEOAS where appropriate.

4. Review security standards including OWASP API Security Top 10.

5. Verify accessibility and usability of API design for consumers.

## 10. Output Generation

1. Create complete OpenAPI specification document with all endpoints and schemas.

2. Generate interactive API documentation accessible to development teams.

3. Implement authentication and authorization middleware in the application.

4. Create validation schemas and error handling across all endpoints.

5. Generate client SDK scaffolding for common programming languages.

6. Compile comprehensive API documentation including usage guides and examples.

</detailed_sequence_steps>

</task>
