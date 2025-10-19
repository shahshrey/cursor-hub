<task name="Implement GraphQL API">

<task_objective>
Build production-ready GraphQL API with comprehensive functionality and performance optimization. The input includes framework detection (Apollo, GraphQL Yoga), existing GraphQL files, database integration configurations, and authentication patterns from the codebase. The output will be a complete GraphQL API with optimized resolvers, real-time subscriptions, security controls, and developer documentation.
</task_objective>

<detailed_sequence_steps>
# Implement GraphQL API - Detailed Sequence of Steps

## 1. Current Application Analysis

1. Detect GraphQL framework from @package.json or @requirements.txt (Apollo, GraphQL Yoga, etc.).

2. Analyze existing GraphQL files including schema definitions and resolvers.

3. Review database integration from @prisma/schema.prisma or database connection configurations.

4. Identify authentication patterns by searching for auth, JWT, or context implementations.

5. Determine schema approach from **$ARGUMENTS** (--schema-first | --code-first | --federation).

## 2. Schema Design

1. Define GraphQL type definitions for all domain entities and models.

2. Design query operations for data fetching with appropriate arguments and filters.

3. Create mutation operations for data modification with input validation.

4. Implement subscription types for real-time data updates using WebSockets.

5. Define custom scalar types for specialized data formats (Date, JSON, Upload, etc.).

6. Design input types for complex mutation arguments and filtering criteria.

## 3. Resolver Architecture

1. Implement query resolvers for efficient data fetching from data sources.

2. Create mutation resolvers with proper validation and error handling.

3. Design subscription resolvers with PubSub mechanism for real-time events.

4. Implement field resolvers for computed fields and nested data relationships.

5. Configure resolver context including authentication, database connections, and services.

6. Design error handling strategy with custom error types and error codes.

## 4. DataLoader Integration

1. Implement DataLoader for N+1 query prevention on related entities.

2. Configure batch loading functions for efficient database queries.

3. Design caching strategies per request cycle to optimize performance.

4. Create DataLoader instances for each entity type requiring batch loading.

5. Integrate DataLoader with resolver context for consistent access patterns.

## 5. Real-time Features

1. Configure WebSocket server for subscription support and connection management.

2. Implement PubSub mechanism for publishing events to subscribers.

3. Design subscription resolvers for live data updates and real-time notifications.

4. Implement connection lifecycle management including authentication and heartbeat.

5. Create filtering mechanisms for subscriptions based on user permissions.

## 6. Security & Performance

1. Implement query complexity analysis to prevent resource exhaustion attacks.

2. Configure depth limiting to restrict excessively nested queries.

3. Design rate limiting per user or API key at resolver or operation level.

4. Implement field-level authorization using directives or middleware.

5. Configure query cost analysis for fair resource usage across consumers.

6. Design input validation using schema directives or resolver logic.

## 7. Development Tools Setup

1. Configure GraphQL Playground or GraphiQL for interactive API exploration.

2. Enable schema introspection for development and tooling integration.

3. Implement schema stitching or federation for microservices architecture.

4. Configure schema documentation using descriptions and deprecation notices.

5. Setup GraphQL Code Generator for type-safe client and server code.

## 8. Advanced Features Implementation

1. Implement file upload mutations using GraphQL multipart request specification.

2. Design federated schemas using Apollo Federation for distributed architecture.

3. Create custom schema directives for cross-cutting concerns (auth, validation, formatting).

4. Implement caching strategies using response caching and persisted queries.

5. Configure monitoring integration for query performance and error tracking.

## 9. Production Readiness

1. Implement comprehensive error handling with user-friendly error messages.

2. Configure structured logging for queries, mutations, and resolver execution.

3. Setup performance metrics collection including resolver timing and query complexity.

4. Implement health check endpoints for monitoring and orchestration.

5. Design deployment strategy including schema versioning and backward compatibility.

## 10. Documentation and Testing

1. Generate API documentation from schema definitions and descriptions.

2. Create usage examples for common query and mutation patterns.

3. Document subscription usage including connection setup and event handling.

4. Write integration tests for resolvers and data fetching logic.

5. Create developer onboarding guide with setup instructions and best practices.

6. Document security controls, rate limiting policies, and usage guidelines.

</detailed_sequence_steps>

</task>
