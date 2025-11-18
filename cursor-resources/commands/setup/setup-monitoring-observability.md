<task name="Setup Monitoring and Observability">

<task_objective>
Implement production-ready monitoring and observability with comprehensive insights. The input includes application type detection, existing monitoring configurations, infrastructure setup, and logging patterns from the codebase. The output will be a complete observability platform with real-time monitoring, intelligent alerting, and comprehensive analytics dashboards.
</task_objective>

<detailed_sequence_steps>
# Setup Monitoring and Observability - Detailed Sequence of Steps

## 1. Application State Analysis

1. Detect application type from @package.json or @requirements.txt to identify framework.

2. Check for existing monitoring configurations (prometheus, grafana, jaeger files).

3. Review infrastructure setup from @docker-compose.yml or @kubernetes/ or cloud platform.

4. Analyze logging setup by searching for winston, logging, or console.log usage.

5. Determine monitoring type from **$ARGUMENTS** (--metrics | --logging | --tracing | --full-stack).

## 2. Metrics Collection

1. Implement application metrics instrumentation for custom business metrics.

2. Configure infrastructure monitoring for CPU, memory, disk, and network metrics.

3. Define business KPI tracking for key performance indicators.

4. Create custom dashboards for real-time metric visualization.

5. Setup metric aggregation and retention policies for historical analysis.

## 3. Logging Infrastructure

1. Implement centralized logging using ELK Stack, Loki, or cloud logging services.

2. Configure structured logging with consistent log formats (JSON, logfmt).

3. Setup log aggregation from all application instances and services.

4. Implement log search capabilities for debugging and troubleshooting.

5. Configure log levels and filtering for noise reduction.

## 4. Distributed Tracing

1. Implement request tracing using Jaeger, Zipkin, or cloud tracing services.

2. Configure performance analysis with span timing and annotations.

3. Setup bottleneck identification for slow requests and operations.

4. Visualize service dependencies and call graphs.

5. Implement trace sampling strategies for high-volume systems.

## 5. Alerting System

1. Create smart alerts based on metrics, logs, and traces.

2. Configure escalation policies for different severity levels.

3. Setup notification channels (Slack, email, PagerDuty, etc.).

4. Integrate with incident management platforms for response coordination.

5. Implement alert deduplication and grouping to reduce noise.

## 6. Performance Monitoring

1. Integrate APM (Application Performance Monitoring) tools like New Relic or DataDog.

2. Setup real-user monitoring for frontend performance tracking.

3. Configure synthetic monitoring for availability checks and uptime.

4. Define SLA tracking with uptime and performance objectives.

5. Implement transaction tracing for end-to-end request visibility.

## 7. Analytics and Reporting

1. Configure usage analytics for tracking feature adoption and user behavior.

2. Generate performance trend reports showing system health over time.

3. Implement capacity planning tools for resource forecasting.

4. Create business insights dashboards for stakeholder visibility.

5. Setup automated reporting with scheduled dashboard exports.

## 8. Platform Integration

1. Configure Prometheus for metrics collection and storage.

2. Setup Grafana for dashboard creation and visualization.

3. Integrate ELK Stack (Elasticsearch, Logstash, Kibana) for log management.

4. Configure Jaeger for distributed tracing and performance analysis.

5. Integrate with cloud-native solutions (CloudWatch, Azure Monitor, Google Cloud Monitoring).

## 9. Production Features

1. Design high availability architecture for monitoring infrastructure.

2. Configure data retention policies balancing storage costs and query performance.

3. Implement security controls for monitoring data access and privacy.

4. Setup cost optimization strategies for monitoring infrastructure.

5. Configure backup and disaster recovery for monitoring data.

## 10. Documentation and Validation

1. Document complete observability platform architecture and components.

2. Create real-time monitoring guide explaining dashboards and metrics.

3. Document intelligent alerting system including alert definitions and responses.

4. Compile comprehensive analytics dashboard documentation.

5. Create runbooks for common operational scenarios and troubleshooting.

</detailed_sequence_steps>

</task>
