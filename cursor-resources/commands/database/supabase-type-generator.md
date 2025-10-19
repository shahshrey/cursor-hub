<task name="Supabase Type Generator">

<task_objective>
Generate comprehensive TypeScript types from Supabase schema with automatic synchronization and validation. The workflow accepts generation scopes (all-tables, specific-table, functions, enums, views) and uses Supabase MCP integration to extract database schema, generate TypeScript interfaces, create utility types, configure import paths, validate type compatibility, and monitor schema changes. Outputs include TypeScript type definition files, application integration code, validation reports, synchronization procedures, and developer documentation.
</task_objective>

<detailed_sequence_steps>
# Supabase Type Generator - Detailed Sequence of Steps

## Current Type Context

- Supabase schema: Database schema accessible via MCP integration
- Type definitions: !`find . -name "types" -type d -o -name "*.d.ts" | head -5` existing TypeScript definitions
- Application usage: !`find . -name "*.ts" -o -name "*.tsx" | xargs grep -l "Database\|Table\|Row" 2>/dev/null | head -3` type usage patterns
- Build configuration: !`find . -name "tsconfig.json" -o -name "*.config.ts" | head -3` TypeScript setup

## 1. Schema Analysis

1. Extract database schema via Supabase MCP
2. Analyze table structures and column types
3. Identify relationships between tables
4. Map database types to TypeScript types

## 2. Type Generation

1. Generate table interfaces with proper TypeScript syntax
2. Create utility types (Row, Insert, Update types)
3. Implement type guards for runtime validation
4. Optimize type definitions for IDE performance

## 3. Integration Setup

1. Configure import paths in tsconfig.json
2. Setup type exports in index files
3. Implement auto-completion for database queries
4. Integrate with build process for validation

## 4. Validation Process

1. Validate generated types with TypeScript compiler
2. Test type compatibility with existing code
3. Verify application integration works correctly
4. Check build success and type errors

## 5. Synchronization

1. Monitor schema changes via Supabase MCP
2. Auto-regenerate types when schema updates
3. Validate breaking changes and notify team
4. Notify development team of type updates

## 6. Developer Experience

1. Implement IDE integration for auto-completion
2. Provide type hints and documentation
3. Create usage examples and best practices
4. Optimize development workflow with tooling

## Advanced Features

- Automatic type updates
- Breaking change detection
- Custom type transformations
- Documentation generation
- IDE plugin integration

## Quality Assurance

- Type accuracy validation
- Application compatibility testing
- Performance impact assessment
- Developer feedback integration

</detailed_sequence_steps>

</task>
