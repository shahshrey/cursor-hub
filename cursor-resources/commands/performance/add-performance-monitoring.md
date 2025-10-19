<task name="Add Performance Monitoring">

<task_objective>
Setup comprehensive application performance monitoring with metrics, alerting, and observability. This workflow takes the monitoring type preference as input (APM, RUM, or custom), defines key performance indicators and service level objectives, configures monitoring tools and data collection, implements error tracking and alerting systems, and outputs a complete monitoring infrastructure with dashboards and automated analysis.
</task_objective>

<detailed_sequence_steps>
# Add Performance Monitoring - Detailed Sequence of Steps

## 1. Performance Monitoring Strategy

1. Define key performance indicators (KPIs) and service level objectives (SLOs) that align with business goals.

2. Identify critical user journeys and performance bottlenecks to focus monitoring efforts.

3. Plan monitoring architecture and data collection strategy across all system layers.

4. Assess existing monitoring infrastructure and integration points to avoid duplication.

5. Define alerting thresholds and escalation procedures for different severity levels.

## 2. Application Performance Monitoring (APM)

1. Set up comprehensive APM solution using tools like New Relic, Datadog, or AppDynamics as specified in **$ARGUMENTS**.

2. Configure distributed tracing for request lifecycle visibility across microservices.

3. Implement custom metrics and performance tracking for business-specific operations.

4. Set up transaction monitoring and error tracking to capture failed operations.

5. Configure performance profiling and diagnostics for deep-dive analysis.

## 3. Real User Monitoring (RUM)

1. Implement client-side performance tracking and web vitals monitoring in the frontend application.

2. Set up user experience metrics collection for Core Web Vitals (LCP, FID, CLS, TTFB).

3. Configure custom performance metrics for user interactions and critical paths.

4. Monitor page load performance and resource loading times across different pages.

5. Track user journey performance across different devices and network conditions.

## 4. Server Performance Monitoring

1. Monitor system metrics including CPU, memory, disk, and network usage at the operating system level.

2. Set up process and application-level monitoring for application-specific resource consumption.

3. Configure event loop lag and garbage collection monitoring for Node.js applications.

4. Implement custom server performance metrics for application-specific operations.

5. Monitor resource utilization and capacity planning metrics for proactive scaling.

## 5. Database Performance Monitoring

1. Track database query performance and identify slow queries automatically.

2. Monitor database connection pool utilization to prevent connection exhaustion.

3. Set up database performance metrics and alerting for query times and resource usage.

4. Implement query execution plan analysis for optimization opportunities.

5. Monitor database resource usage and identify optimization opportunities.

## 6. Error Tracking and Monitoring

1. Implement comprehensive error tracking using tools like Sentry, Bugsnag, or Rollbar.

2. Configure error categorization and impact analysis to prioritize critical issues.

3. Set up error alerting and notification systems for real-time issue awareness.

4. Track error trends and resolution metrics to measure improvement over time.

5. Implement error context and debugging information capture including stack traces and environment data.

## 7. Custom Metrics and Dashboards

1. Implement business metrics tracking using Prometheus, StatsD, or similar time-series databases.

2. Create performance dashboards and visualizations for different stakeholders.

3. Configure custom alerting rules and thresholds based on business requirements.

4. Set up performance trend analysis and reporting for executive summaries.

5. Implement performance regression detection to catch performance degradation early.

## 8. Alerting and Notification System

1. Configure intelligent alerting based on performance thresholds with statistical anomaly detection.

2. Set up multi-channel notifications including email, Slack, PagerDuty, or other tools.

3. Implement alert escalation and on-call procedures for critical incidents.

4. Configure alert fatigue prevention and noise reduction through intelligent grouping.

5. Set up performance incident management workflows integrated with ticketing systems.

## 9. Performance Testing Integration

1. Integrate monitoring with load testing and performance testing frameworks.

2. Set up continuous performance testing and monitoring in CI/CD pipelines.

3. Configure performance baseline tracking and comparison across releases.

4. Implement performance test result analysis and reporting for stakeholders.

5. Monitor performance under different load scenarios to validate capacity.

## 10. Performance Optimization Recommendations

1. Generate actionable performance insights and recommendations from collected data.

2. Implement automated performance analysis and reporting using machine learning where applicable.

3. Set up performance optimization tracking and measurement to validate improvements.

4. Configure performance improvement validation to ensure changes have positive impact.

5. Create performance optimization prioritization frameworks based on business impact.

</detailed_sequence_steps>

</task>
