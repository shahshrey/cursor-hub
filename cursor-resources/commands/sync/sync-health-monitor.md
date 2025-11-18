<task name="Sync Health Monitor">

<task_objective>
Monitor and diagnose GitHub-Linear sync health with performance analytics and automated troubleshooting. Implement comprehensive sync health monitoring system with API health assessment, sync performance analysis, error pattern detection, webhook diagnostics, data integrity validation, and automated troubleshooting. The output will be complete health assessment with performance metrics, error analysis, recommended optimizations, and automated diagnostic reports.
</task_objective>

<how_to_ask_followup_question>
<question>What aspect of sync health would you like to monitor?</question>
<options>["Complete health report", "GitHub API health only", "Linear connectivity check", "Webhook diagnostics", "Performance analysis"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Sync Health Monitor - Detailed Sequence of Steps

## Prerequisites and Context

**Available Tools**: Read, Write, Edit, Bash

**Argument Options**: [scope] | --github | --linear | --webhooks | --performance | --report

**Model**: sonnet

## Current Sync Environment

- GitHub API status: !`gh api rate_limit -q '.rate | "GitHub: \(.remaining)/\(.limit) requests"' 2>/dev/null || echo "GitHub API check needed"`
- Linear connectivity: Linear MCP server status and authentication validation
- Webhook status: Active webhook configurations and event processing health
- Sync performance: Current throughput, latency metrics, and error rates

## 1. API Health Assessment

Monitor platform API status:

**Monitor GitHub/Linear API Status**:
- Check GitHub API service status
- Verify Linear API availability
- Test API responsiveness
- Monitor API version compatibility

**Rate Limits**:
- Query GitHub rate limit status
- Check Linear rate limit headers
- Calculate rate limit consumption rate
- Predict time until limit reset
- Alert on approaching limits

**Authentication**:
- Verify GitHub token validity
- Validate Linear API key
- Test permission scopes
- Check token expiration dates
- Alert on authentication issues

**Connectivity Issues**:
- Test network connectivity to GitHub
- Test network connectivity to Linear
- Check DNS resolution
- Validate SSL/TLS certificates
- Monitor connection latency

## 2. Sync Performance Analysis

Track synchronization metrics:

**Track Throughput Metrics**:
- Measure items synced per hour
- Calculate sync operations per second
- Track successful sync rate
- Monitor failed sync rate
- Compare to baseline performance

**Latency Patterns**:
- Measure end-to-end sync latency
- Track webhook-to-sync delay
- Monitor API response times
- Identify latency spikes
- Analyze latency distribution (p50, p95, p99)

**Processing Times**:
- Measure individual operation durations
- Track queue processing time
- Monitor data transformation time
- Identify slow operations
- Profile performance bottlenecks

**Queue Depths**:
- Monitor sync queue size
- Track queue growth rate
- Identify queue buildups
- Alert on queue overflow risk
- Measure queue processing velocity

## 3. Error Pattern Detection

Identify and categorize failures:

**Identify Recurring Failures**:
- Aggregate errors by type
- Track error frequency
- Identify problematic entities
- Find systematic failures
- Detect error trends

**Classify Error Types**:
- Network errors (timeouts, connection failures)
- Authentication errors (token expiration, permission denied)
- Rate limit errors
- Data validation errors
- Application logic errors

**Analyze Failure Trends**:
- Track error rates over time
- Identify error spikes
- Correlate errors with events
- Find patterns in failures
- Predict potential issues

## 4. Webhook Diagnostics

Validate webhook operations:

**Validate Webhook Configurations**:
- List all configured webhooks
- Verify webhook URLs
- Check webhook secret configuration
- Validate event subscriptions
- Confirm webhook active status

**Test Event Delivery**:
- Review recent webhook deliveries
- Check delivery success rates
- Identify failed deliveries
- Test webhook endpoint accessibility
- Verify signature validation

**Monitor Processing Latency**:
- Measure webhook receipt time
- Track processing start delay
- Monitor processing duration
- Identify processing bottlenecks
- Calculate end-to-end latency

## 5. Data Integrity Validation

Ensure sync consistency:

**Verify Sync Consistency**:
- Sample random synced items
- Compare GitHub and Linear states
- Verify field accuracy
- Check timestamp consistency
- Validate metadata preservation

**Detect Orphaned Records**:
- Find GitHub issues without Linear tasks
- Find Linear tasks without GitHub issues
- Identify broken bidirectional links
- Locate deleted entity references
- Flag incomplete syncs

**Validate Cross-References**:
- Test GitHub to Linear navigation
- Test Linear to GitHub navigation
- Verify reference format correctness
- Check reference accessibility
- Validate reference metadata

## 6. Automated Troubleshooting

Diagnose and suggest fixes:

**Run Diagnostic Tests**:
- Execute connectivity tests
- Run API health checks
- Test webhook delivery
- Validate data integrity
- Check configuration correctness

**Suggest Fixes**:
- Recommend configuration changes
- Suggest performance optimizations
- Identify required permissions
- Propose infrastructure improvements
- Provide resolution steps

**Implement Automated Recovery Procedures**:
- Retry failed operations automatically
- Refresh expired tokens
- Clear stuck queues
- Repair broken references
- Restart failed sync processes

## Advanced Features

**Real-time Health Dashboards**:
- Live metrics visualization
- Interactive health status display
- Drill-down capabilities
- Historical trend analysis
- Customizable views

**Predictive Failure Detection**:
- Machine learning-based predictions
- Anomaly detection algorithms
- Early warning system
- Proactive alerting
- Risk scoring

**Automated Recovery Workflows**:
- Self-healing capabilities
- Automatic retry mechanisms
- Failover procedures
- Graceful degradation
- Recovery orchestration

**Comprehensive Performance Profiling**:
- Detailed operation tracing
- Bottleneck identification
- Resource utilization analysis
- Optimization recommendations
- Capacity planning insights

## Diagnostic Capabilities

**Deep Error Analysis**:
- Root cause analysis
- Error correlation
- Impact assessment
- Resolution tracking
- Historical error patterns

**Bottleneck Identification**:
- Performance profiling
- Resource contention analysis
- Capacity constraint detection
- Throughput limiting factors
- Optimization opportunities

**Configuration Validation**:
- Schema validation
- Permission verification
- Setting correctness checks
- Best practice compliance
- Security audit

**Automated Testing Suites**:
- Integration tests
- End-to-end sync tests
- Performance benchmarks
- Stress testing
- Chaos engineering tests

## Output

Complete health assessment including:
- Performance metrics with detailed statistics
- Error analysis with categorization and trends
- Recommended optimizations with implementation guidance
- Automated diagnostic reports with actionable insights
- Real-time health status dashboard
- Historical trend analysis
- Capacity and scaling recommendations
- Security and configuration audit results

</detailed_sequence_steps>

</task>
