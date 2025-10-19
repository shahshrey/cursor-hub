<task name="Supabase Data Explorer">

<task_objective>
Explore and analyze Supabase database data with intelligent querying and visualization capabilities. The workflow accepts table names or query specifications (query, export, inspect) and uses Supabase MCP integration for safe read-only data exploration, executing SQL queries, analyzing data patterns, generating insights, and creating data exports. Outputs include query results, data insights, statistical summaries, export files, and performance recommendations.
</task_objective>

<detailed_sequence_steps>
# Supabase Data Explorer - Detailed Sequence of Steps

## Current Data Context

- Supabase MCP: Connected with read-only access for safe data exploration
- Target table: Analysis of $ARGUMENTS for data exploration scope
- Local queries: !`find . -name "*.sql" | head -5` existing SQL files for reference
- Data models: !`find . -name "types" -o -name "models" -type d | head -3` application data structures

## 1. Database Discovery

1. Explore table structures and column definitions
2. Analyze relationships between tables (foreign keys)
3. Identify data patterns and common query patterns
4. Assess data quality metrics (nulls, duplicates, outliers)

## 2. Intelligent Querying

1. Execute read-only queries via Supabase MCP integration
2. Optimize query performance with proper indexing hints
3. Provide result analysis with row counts and data types
4. Suggest query improvements for better performance

## 3. Data Analysis

1. Generate data insights from query results
2. Identify trends and anomalies in data patterns
3. Calculate statistical summaries (min, max, avg, stddev)
4. Analyze data distribution across columns

## 4. Schema Inspection

1. Examine table schemas with column types and constraints
2. Analyze foreign key relationships and cardinality
3. Assess index effectiveness for common queries
4. Review constraint validations and data integrity rules

## 5. Export & Visualization

1. Export data in multiple formats (JSON, CSV, SQL)
2. Create data visualizations for trends and distributions
3. Generate summary reports with key findings
4. Optimize data presentation for stakeholder consumption

## 6. Performance Analysis

1. Analyze query execution plans via EXPLAIN
2. Identify performance bottlenecks in complex queries
3. Suggest optimization strategies (indexes, query rewrites)
4. Monitor resource usage during exploration

## Advanced Features

- Interactive data exploration
- Automated insight generation
- Data quality assessment
- Relationship mapping
- Trend analysis

## Safety Features

- Read-only operations
- Query validation
- Result limiting
- Performance monitoring
- Error handling

</detailed_sequence_steps>

</task>
