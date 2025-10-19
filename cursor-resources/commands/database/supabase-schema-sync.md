<task name="Supabase Schema Sync">

<task_objective>
Synchronize database schema between local and Supabase with comprehensive validation and conflict resolution. The workflow accepts sync actions (pull, push, diff, validate) and uses Supabase MCP integration to compare local versus remote schemas, execute synchronization operations, apply schema migrations, handle conflict resolution, and validate data integrity. Outputs include schema sync reports, migration scripts, conflict resolution documentation, validation reports, and team collaboration updates.
</task_objective>

<detailed_sequence_steps>
# Supabase Schema Sync - Detailed Sequence of Steps

## Current Supabase Context

- MCP connection: Supabase MCP server with read-only access configured
- Local schema: !`find . -name "schema.sql" -o -name "migrations" -type d | head -3` local database files
- Project config: !`find . -name "supabase" -type d -o -name ".env*" | grep -v node_modules | head -3` configuration files
- Git status: !`git status --porcelain | grep -E "\\.sql$|\\.ts$" | head -5` database-related changes

## 1. MCP Integration

1. Connect to Supabase via MCP server
2. Authenticate with project credentials
3. Validate connection status and permissions
4. Retrieve remote schema information

## 2. Schema Analysis

1. Compare local versus remote schema structures
2. Identify structural differences (tables, columns, constraints)
3. Analyze migration requirements for synchronization
4. Assess breaking changes and impact

## 3. Sync Operations

1. Execute pull operations to fetch remote schema
2. Execute push operations to update remote schema
3. Apply schema migrations in correct order
4. Handle conflict resolution with user guidance

## 4. Validation Process

1. Verify schema consistency after sync
2. Validate foreign key constraints
3. Check index performance and coverage
4. Test query compatibility with new schema

## 5. Migration Management

1. Generate migration scripts for schema changes
2. Track version history of schema changes
3. Implement rollback procedures for safety
4. Optimize execution order to prevent errors

## 6. Safety Checks

1. Backup critical data before sync
2. Validate permissions and access rights
3. Check production impact of changes
4. Implement dry-run mode for testing

## Advanced Features

- Automated conflict resolution
- Schema version control
- Performance impact analysis
- Team collaboration workflows
- CI/CD integration

## Quality Assurance

- Schema validation
- Data integrity checks
- Performance optimization
- Rollback readiness
- Team synchronization

</detailed_sequence_steps>

</task>
