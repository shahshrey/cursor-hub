<task name="Create Database Migrations">

<task_objective>
Create comprehensive database migrations with proper versioning and rollback capabilities. The input includes ORM detection, existing migration files, database configuration, and current schema state from the codebase. The output will be production-ready migration files with comprehensive rollback support, proper indexing, and data safety measures.
</task_objective>

<detailed_sequence_steps>
# Create Database Migrations - Detailed Sequence of Steps

## 1. Current Database State Analysis

1. Detect ORM framework from @package.json or @requirements.txt (Sequelize, Prisma, Alembic, etc.).

2. Find existing migration files to understand migration history.

3. Review database configuration from @config/database.* or @prisma/schema.prisma.

4. Count current migrations to determine next migration number.

5. Determine migration type from **$ARGUMENTS** (--create-table | --add-column | --alter-table).

## 2. Migration Planning

1. Analyze schema changes required for the migration.

2. Identify dependencies on other tables or migrations.

3. Assess data impact including potential data loss or transformation.

4. Plan migration order for multiple related changes.

5. Document migration purpose and expected outcomes.

## 3. Migration Generation

1. Create timestamped migration file using ORM migration tool.

2. Implement up method for applying schema changes.

3. Implement down method for rolling back changes.

4. Follow naming conventions for migration files (timestamp + description).

5. Add migration metadata and documentation comments.

## 4. Schema Updates

1. Generate DDL for table creation with all columns and constraints.

2. Create column modification statements for adding or altering columns.

3. Implement index management including creation, modification, and removal.

4. Configure foreign key constraints with referential actions.

5. Add check constraints and default values where appropriate.

## 5. Data Migrations

1. Design safe data transformation logic for existing records.

2. Implement data backfills for new required columns.

3. Configure batch processing for large dataset migrations.

4. Add data validation before and after migration.

5. Handle null values and data type conversions safely.

## 6. Rollback Strategy

1. Implement reliable rollback procedures for schema changes.

2. Create reverse data transformations for data migrations.

3. Test rollback on development database to verify correctness.

4. Document rollback limitations and manual steps if needed.

5. Add transaction wrapping for atomic migration execution.

## 7. Best Practices Implementation

1. Follow database-specific conventions (PostgreSQL, MySQL, SQLite).

2. Maintain referential integrity throughout migration process.

3. Handle large datasets efficiently using batching and pagination.

4. Ensure zero-downtime deployments with backward-compatible changes.

5. Add appropriate indexes for performance optimization.

## 8. Testing and Validation

1. Test migration on local development database.

2. Validate migration in staging environment with production-like data.

3. Verify data integrity after migration execution.

4. Test rollback process to ensure it works correctly.

5. Run application tests to ensure migration doesn't break functionality.

## 9. Performance Optimization

1. Add indexes to optimize query performance on new columns.

2. Analyze query plans for migrations affecting large tables.

3. Consider partitioning strategies for very large tables.

4. Optimize data transformation queries for performance.

5. Plan maintenance windows for long-running migrations.

## 10. Documentation and Deployment

1. Document migration purpose and schema changes clearly.

2. Create rollback documentation with manual steps if needed.

3. Document proper indexing strategy for new tables and columns.

4. Compile data safety measures taken during migration.

5. Create deployment checklist for production migration execution.

</detailed_sequence_steps>

</task>
