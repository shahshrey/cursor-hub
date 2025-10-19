<task name="Deployment Monitoring and Observability">

<task_objective>
Setup comprehensive deployment monitoring with observability, alerting, health checks, and performance tracking. The workflow processes current monitoring state and infrastructure setup to generate a complete observability stack with Prometheus, Grafana, Alertmanager, log aggregation, distributed tracing, and automated alerting for deployment health, performance metrics, and business impact assessment.
</task_objective>

<detailed_sequence_steps>
# Deployment Monitoring - Detailed Sequence of Steps

## 1. Core Monitoring Stack Setup

Deploy Prometheus for metrics collection and storage. Configure Prometheus with scrape configs for application metrics, Kubernetes cluster metrics, node exporter for infrastructure metrics, and deployment-specific metrics. Set up ConfigMap with prometheus.yml containing global scrape interval, evaluation interval, rule files, and alerting configuration. Create Prometheus Deployment with proper resource limits, persistent volume claims, and service account with RBAC permissions. Configure retention policies and admin API access.

## 2. Grafana Dashboard Configuration

Deploy Grafana for metrics visualization and alerting. Create ConfigMaps with pre-configured dashboards for deployment monitoring including deployment status panels, request rate graphs, error rate tracking, response time percentiles, pod resource usage charts, and deployment event logs. Configure data sources to connect to Prometheus. Set up admin credentials and access controls. Create dashboards showing real-time deployment health, application performance metrics, infrastructure resource utilization, and business metrics.

## 3. Application Health Monitoring

Implement comprehensive health check system with HealthMonitor class. Register health checks for database connectivity, Redis connectivity, external API availability, and custom service checks. Configure liveness probe for basic application health, readiness probe for traffic acceptance readiness, and startup probe for application initialization. Set up health check endpoints (/health, /ready, /startup) with proper timeouts, critical vs non-critical checks, and detailed status reporting including uptime and version information.

## 4. Custom Metrics and Instrumentation

Integrate Prometheus client library for metrics collection. Implement DeploymentMetrics class with default metrics (CPU, memory, network), custom deployment metrics (deployment info, events, health check status), HTTP metrics (request counts, duration histograms, active connections), and business metrics (active users, transactions, error rates). Configure metric labels for environment, version, and commit SHA. Set up Express.js middleware for automatic HTTP metrics collection. Expose metrics endpoint at /metrics.

## 5. Alert Configuration

Deploy Alertmanager for alert routing and notification. Configure alert routing with group_by, group_wait, group_interval, and repeat_interval. Set up multiple receivers including default Slack notifications, critical alert receiver with email and Slack, deployment-specific alerts, and application monitoring alerts. Configure inhibit rules to suppress lower severity alerts when critical alerts are firing. Set up notification templates for different channels.

## 6. Deployment Alert Rules

Create PrometheusRule resources with alert definitions. Configure deployment health alerts for application down, high error rate, slow response time, high memory usage, and high CPU usage. Set up deployment event alerts for deployment failed, deployment stuck, and pod crash looping. Create business metric alerts for high transaction failure rate and low active user count. Define alert severity levels (critical, warning) with appropriate for durations and runbook URLs.

## 7. Log Aggregation and Analysis

Deploy Fluentd for log collection and forwarding. Configure log tailing from container logs with Kubernetes metadata enrichment. Set up log parsing and transformation including JSON parsing, log level extraction, deployment info tagging, and error log filtering. Configure Elasticsearch as log storage backend with logstash format, automatic index creation, and buffer management. Set up log retention policies and cleanup procedures.

## 8. Performance Monitoring with Distributed Tracing

Implement OpenTelemetry instrumentation for distributed tracing. Configure Jaeger exporter for trace collection. Set up NodeSDK with service name, version, and environment resource attributes. Implement auto-instrumentation for HTTP, database, and external service calls. Create DeploymentTracer class for custom deployment event tracing with span attributes for deployment version, environment, and timestamps. Track deployment events with success/failure status.

## 9. Monitoring Dashboard Setup Script

Create setup-monitoring.sh script to automate full monitoring stack deployment. Implement functions to create monitoring and logging namespaces with proper labels, deploy Prometheus with service account, ClusterRole, ClusterRoleBinding, and PVC, deploy Grafana with admin credentials and dashboard ConfigMaps, deploy Alertmanager with routing configuration, deploy logging stack (Elasticsearch, Fluentd, Kibana), and setup application monitoring with annotations and ServiceMonitor.

## 10. Application Monitoring Configuration

Patch application deployments with Prometheus scrape annotations (prometheus.io/scrape, prometheus.io/port, prometheus.io/path). Create ServiceMonitor resources for Prometheus Operator integration. Configure endpoints with scrape intervals and paths.

## 11. Access Scripts Creation

Generate port-forward-monitoring.sh for local access to Prometheus (port 9090), Grafana (port 3000), and Alertmanager (port 9093). Generate port-forward-logging.sh for local access to Kibana (port 5601) and Elasticsearch (port 9200). Make scripts executable and provide usage instructions.

## 12. Deployment Verification

Verify all monitoring pods are running in monitoring namespace. Verify all logging pods are running in logging namespace. Wait for all pods to reach ready state with proper timeout. Check service accessibility and health. Validate metrics collection is working. Confirm log aggregation is functioning.

## 13. Extended Monitoring Period

Run extended monitoring for deployment validation (1+ hours). Monitor key metrics including response times, error rates, user sessions, and database performance. Check for anomalies and performance degradation. Validate alerting triggers correctly. Ensure dashboards update in real-time.

## 14. Documentation and Runbooks

Document monitoring architecture and setup procedures. Create runbooks for common alerts with troubleshooting steps, escalation procedures, and resolution workflows. Document dashboard usage and metric interpretation. Provide examples of querying Prometheus and Elasticsearch. Create operational procedures for monitoring maintenance.

</detailed_sequence_steps>

</task>
