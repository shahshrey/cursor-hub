<task name="Supabase Performance Optimizer">

<task_objective>
Optimize Supabase database performance with intelligent analysis and automated improvements. The workflow accepts optimization types (queries, indexes, storage, rls, functions) and uses Supabase MCP integration to analyze query execution times, recommend index optimizations, review RLS policies, optimize storage patterns, and improve database function performance. Outputs include optimization plans, index recommendations, query optimizations, performance reports, and monitoring setup.
</task_objective>

<detailed_sequence_steps>
# Supabase Performance Optimizer - Detailed Sequence of Steps

## Current Performance Context

- Supabase metrics: Database performance data via MCP integration
- Query patterns: !`find . -name "*.sql" -o -name "*.ts" -o -name "*.js" | xargs grep -l "from\|select\|insert\|update" 2>/dev/null | head -5` application queries
- Schema analysis: Current table structures and relationship complexity
- Performance logs: Recent query execution times and resource usage patterns

## 1. Performance Analysis

1. Analyze query execution times using EXPLAIN ANALYZE
2. Identify slow operations and bottlenecks
3. Assess resource utilization (CPU, memory, I/O)
4. Evaluate performance bottlenecks across application

## 2. Index Optimization

1. Analyze index usage statistics
2. Recommend new indexes for slow queries
3. Identify redundant or unused indexes
4. Optimize index strategies (B-tree, GIN, GIST)

## 3. Query Optimization

1. Review application queries for inefficiencies
2. Suggest query improvements (join optimization, subquery elimination)
3. Implement query caching strategies
4. Optimize join operations and reduce query complexity

## 4. Storage Optimization

1. Analyze storage patterns and data growth
2. Recommend archival strategies for old data
3. Optimize data types for storage efficiency
4. Implement compression where appropriate

## 5. RLS Policy Review

1. Analyze Row Level Security policy performance
2. Optimize policy performance with indexed columns
3. Reduce policy complexity by consolidating rules
4. Improve security efficiency without sacrificing protection

## 6. Function Optimization

1. Review database function implementations
2. Optimize function performance with better algorithms
3. Implement caching strategies for computed results
4. Improve execution plans for complex functions

## Advanced Features

- Automated index recommendations
- Query plan analysis
- Performance trend monitoring
- Cost optimization
- Scaling recommendations

## Monitoring Integration

- Real-time performance tracking
- Alert configuration
- Performance regression detection
- Optimization impact measurement

</detailed_sequence_steps>

</task>
