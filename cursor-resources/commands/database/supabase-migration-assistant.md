<task name="Supabase Migration Assistant">

<task_objective>
Generate and manage Supabase database migrations with comprehensive testing and validation. The workflow accepts migration types (create, alter, seed, rollback) and uses Supabase MCP integration to analyze schema requirements, generate migration SQL files, create TypeScript types, test migrations on development data, and implement rollback procedures. Outputs include migration SQL files, TypeScript type definitions, test validation reports, rollback procedures, and deployment documentation.
</task_objective>

<detailed_sequence_steps>
# Supabase Migration Assistant - Detailed Sequence of Steps

## Current Migration Context

- Supabase project: MCP integration for migration management and validation
- Migration files: !`find . -name "*migrations*" -type d -o -name "*.sql" | head -5` existing migration structure
- Schema version: Current database schema state and migration history
- Local changes: !`git diff --name-only | grep -E "\\.sql$|\\.ts$" | head -3` pending database modifications

## 1. Migration Planning

1. Analyze schema requirements from user specifications
2. Design migration strategy with dependency ordering
3. Identify table and column dependencies
4. Plan rollback procedures for safe recovery

## 2. Code Generation

1. Generate migration SQL files with proper formatting
2. Create TypeScript types for new schema structures
3. Implement safety checks (NOT NULL constraints, foreign keys)
4. Optimize execution order to prevent constraint violations

## 3. Validation Testing

1. Test migration on development database copy
2. Validate schema changes match requirements
3. Verify data integrity after migration
4. Check for constraint violations and errors

## 4. Supabase Integration

1. Apply migrations via Supabase MCP server
2. Monitor execution status and progress
3. Handle error conditions with detailed logging
4. Validate final schema state matches expectations

## 5. Type Generation

1. Generate TypeScript types from updated schema
2. Update application interfaces and models
3. Sync with client-side schema definitions
4. Maintain type safety across application

## 6. Rollback Strategy

1. Create rollback migrations for safe recovery
2. Test rollback procedures on development data
3. Implement data preservation strategies
4. Validate recovery process and data integrity

## Advanced Features

- Automated type generation
- Migration testing
- Performance impact analysis
- Team collaboration
- CI/CD integration

## Safety Measures

- Pre-migration backups
- Dry-run validation
- Rollback testing
- Data integrity checks
- Performance monitoring

</detailed_sequence_steps>

</task>
