<task name="Design Database Schema">

<task_objective>
Design optimized database schemas with comprehensive data modeling based on the specified schema type (relational, NoSQL, hybrid, or normalized). The input includes application requirements, existing schema (if any), and performance needs from the codebase. The output will be a complete schema design with DDL scripts, ER diagrams, performance analysis, and migration strategy.
</task_objective>

<detailed_sequence_steps>
# Design Database Schema - Detailed Sequence of Steps

## 1. Requirements Analysis

1. Analyze application type based on **$ARGUMENTS** or codebase structure to understand domain and data needs.

2. Review data requirements from @requirements/ or project documentation to identify business entities.

3. Examine existing schema from @prisma/schema.prisma or @migrations/ or database dumps to understand current state.

4. Assess performance needs including expected scale, query patterns, and data volume requirements.

5. Identify business entities, relationships, data flow patterns, and access patterns for the schema design.

## 2. Entity Modeling

1. Define tables or collections based on the identified business entities and domain model.

2. Specify attributes for each entity with appropriate data types and constraints.

3. Establish primary keys for unique identification and foreign keys for relationship management.

4. Configure constraints including NOT NULL, UNIQUE, CHECK constraints, and default values.

5. Document entity purpose, field meanings, and business rules for each table.

## 3. Relationship Design

1. Map one-to-one relationships between entities where appropriate for data separation.

2. Design one-to-many relationships using foreign keys for hierarchical data structures.

3. Implement many-to-many associations using junction tables with appropriate indexes.

4. Define referential integrity rules including CASCADE, SET NULL, or RESTRICT on delete/update.

5. Optimize relationship queries with proper indexing on foreign key columns.

## 4. Normalization Strategy

1. Determine schema type from **$ARGUMENTS** (--relational | --nosql | --hybrid | --normalize).

2. Apply normalization forms (1NF, 2NF, 3NF) to eliminate data redundancy and improve consistency.

3. Evaluate denormalization opportunities for performance optimization on read-heavy operations.

4. Balance data consistency requirements against performance trade-offs for high-traffic queries.

5. Document normalization decisions and rationale for future schema evolution.

## 5. Performance Optimization

1. Design indexing strategy for frequently queried columns and join conditions.

2. Plan composite indexes for multi-column queries to improve query performance.

3. Consider query optimization techniques including covering indexes and index-only scans.

4. Evaluate partitioning strategies for large tables based on time, range, or hash.

5. Design for scalability including read replicas, sharding strategies, and caching patterns.

## 6. Security Design

1. Implement access control mechanisms at schema level for data security.

2. Design data encryption strategy for sensitive fields and personally identifiable information.

3. Create audit trail tables and triggers for tracking data changes and compliance.

4. Configure row-level security policies where supported by the database system.

5. Document security requirements and compliance considerations for the schema.

## 7. Advanced Patterns Implementation

1. Implement temporal data patterns for history tracking and point-in-time queries.

2. Design soft delete mechanisms using deleted_at timestamps or status flags.

3. Configure JSONB fields for flexible schema sections where appropriate.

4. Implement full-text search capabilities using database-specific features or extensions.

5. Design audit logging tables for comprehensive data change tracking.

6. Plan scalability patterns including read replicas, connection pooling, and query optimization.

## 8. Validation and Testing

1. Validate referential integrity rules across all relationships and constraints.

2. Test data consistency scenarios including concurrent updates and transaction isolation.

3. Analyze query performance using EXPLAIN plans and query optimization tools.

4. Evaluate future extensibility and schema evolution capabilities.

5. Verify security controls and access restrictions are properly configured.

## 9. Output Generation

1. Generate complete DDL scripts for creating all tables, indexes, and constraints.

2. Create entity-relationship diagrams visualizing schema structure and relationships.

3. Document performance analysis including expected query patterns and optimization strategies.

4. Prepare migration strategy for transitioning from existing schema to new design.

5. Compile comprehensive schema documentation including all design decisions and rationale.

</detailed_sequence_steps>

</task>
