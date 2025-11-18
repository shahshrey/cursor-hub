<task name="Supabase Realtime Monitor">

<task_objective>
Monitor and optimize Supabase realtime connections with comprehensive performance analysis and debugging support. The workflow accepts monitoring types (connections, subscriptions, performance, debug, analytics) and uses Supabase MCP integration to monitor active connections, track subscription performance, analyze message throughput, identify connection issues, and generate usage analytics. Outputs include performance analytics, optimization recommendations, debugging tools, usage reports, and developer documentation.
</task_objective>

<detailed_sequence_steps>
# Supabase Realtime Monitor - Detailed Sequence of Steps

## Current Realtime Context

- Supabase realtime: Connection status and subscription management via MCP
- Application subscriptions: !`find . -name "*.ts" -o -name "*.js" | xargs grep -l "subscribe\|realtime\|channel" 2>/dev/null | head -5` active subscription code
- Performance metrics: Current connection performance and message throughput
- Error patterns: Recent realtime connection issues and debugging information

## 1. Connection Analysis

1. Monitor active connections using Supabase MCP
2. Analyze connection stability and uptime
3. Track connection lifecycle (connect, disconnect, reconnect)
4. Identify connection issues and failure patterns

## 2. Subscription Management

1. Track active subscriptions across channels
2. Analyze subscription performance metrics
3. Optimize subscription patterns for efficiency
4. Manage subscription lifecycle and cleanup

## 3. Performance Optimization

1. Analyze message throughput and latency
2. Optimize payload sizes to reduce bandwidth
3. Reduce connection overhead with batching
4. Improve subscription efficiency with filtering

## 4. Error Monitoring

1. Track connection errors and exceptions
2. Analyze failure patterns and root causes
3. Implement retry strategies for transient failures
4. Provide debugging insights and recommendations

## 5. Analytics Dashboard

1. Generate usage analytics and statistics
2. Track performance trends over time
3. Monitor resource utilization (connections, bandwidth)
4. Provide optimization recommendations based on data

## 6. Developer Tools

1. Provide debugging utilities for development
2. Implement connection testing tools
3. Create performance profiling capabilities
4. Optimize development workflow with tooling

## Advanced Features

- Real-time performance monitoring
- Predictive analytics
- Automated optimization suggestions
- Comprehensive logging
- Alert management

## Integration Support

- Application performance monitoring
- CI/CD integration
- Team collaboration tools
- Documentation generation
- Troubleshooting guides

</detailed_sequence_steps>

</task>
