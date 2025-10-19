<task name="Blue-Green Deployment">

<task_objective>
Implement blue-green deployment strategy with zero-downtime switching, health validation, and automatic rollback. The workflow processes load balancer configuration, current deployment version, container orchestration setup, health endpoints, and DNS configuration to create production-grade blue-green deployment infrastructure with comprehensive validation, monitoring, automated switching, database migration handling, and instant rollback capabilities.
</task_objective>

<detailed_sequence_steps>
# Blue-Green Deployment - Detailed Sequence of Steps

## 1. Infrastructure Setup

Configure load balancer (NGINX or HAProxy) with upstream blocks for blue environment and green environment. Create active upstream that points to current live environment. Set up server block with proxy_pass to active upstream, health check endpoint configuration, retry configuration, and environment indicator endpoint. Configure proper timeouts and connection handling.

## 2. Kubernetes Service Configuration

Create three Kubernetes Services: app-service-blue with selector for environment: blue, app-service-green with selector for environment: green, and app-service-active with selector pointing to currently active environment (switchable between blue and green). Configure ClusterIP type for blue and green services. Configure LoadBalancer type for active service to receive external traffic.

## 3. Kubernetes Deployment Setup

Create Deployment for blue environment (app-blue) with replicas set to desired count, selector for app and environment: blue labels, container spec with blue image version, environment variables including ENVIRONMENT=blue and VERSION, and health probes (liveness, readiness). Create matching Deployment for green environment (app-green) with same structure but green labels and updated image version. Configure resource requests and limits for both.

## 4. Deployment Automation Script Development

Create comprehensive blue-green deployment script (deploy-blue-green.sh) with functions to get current active environment from Kubernetes service, get inactive environment (opposite of current), deploy to inactive environment using kubectl set image, perform health checks using port-forward and curl, run smoke tests on inactive environment, switch traffic by patching active service selector, rollback to previous environment if needed, and monitor deployment health metrics.

## 5. Get Current Environment Function

Implement function to query Kubernetes for app-service-active service selector. Extract environment label value (blue or green) to determine which environment is currently receiving traffic. Default to blue if service doesn't exist yet. Use kubectl get service with jsonpath to extract selector.environment value.

## 6. Deploy to Inactive Environment

Determine current active environment and calculate inactive environment. Log deployment target information. Update inactive deployment with new image version using kubectl set image. Wait for rollout to complete with kubectl rollout status and timeout. Verify all pods reach ready state using kubectl wait for condition=ready. Log successful deployment completion.

## 7. Health Check Implementation

Set up port-forward to inactive environment service for internal testing. Execute health check HTTP requests to /health endpoint using curl. Retry health checks multiple times with delays if initial attempts fail. Validate response status is 200 and response body indicates healthy state. Clean up port-forward process after validation. Return success or failure status.

## 8. Smoke Tests Execution

Port-forward to inactive environment for testing. Run suite of smoke tests including health endpoint test, version endpoint test, main application endpoint test, and database connectivity test. Collect test results with pass/fail indicators. Display formatted test results. Count failed tests and fail deployment if any critical tests failed. Clean up port-forward after tests complete.

## 9. Traffic Switching

Verify target environment is different from current environment. Log traffic switch action from current to target environment. Create backup of current service configuration to /tmp with timestamp. Patch app-service-active to update selector.environment to target environment using kubectl patch. Wait for load balancer to propagate changes (30 seconds). Verify external traffic flows to new environment by checking version endpoint. Log successful traffic switch.

## 10. Rollback Implementation

Determine current active environment that has issues. Calculate previous environment to rollback to. Log rollback initiation. Verify previous environment is healthy using health check function. Switch traffic back to previous environment using traffic switching function. Log successful rollback completion. Send notifications about rollback event.

## 11. Deployment Monitoring

Monitor deployment for specified duration (default 5 minutes). Continuously check health status and version from external endpoints. Display timestamped status updates every 30 seconds. Detect critical issues like unhealthy status. Fail and trigger rollback if application becomes unhealthy. Log successful monitoring completion if stable.

## 12. Full Deployment Process Orchestration

Validate version parameter is provided. Log start of blue-green deployment. Execute deploy to inactive environment function. Perform health check on newly deployed environment. Run smoke tests to validate functionality. Switch traffic from current to inactive environment. Monitor new deployment for stability period (5 minutes). Log successful deployment completion with new active environment and version information.

## 13. Database Migration Strategy

Implement database migration handling based on strategy: forward-only migrations (safe for blue-green), blue-green-safe with compatibility layers using views, separate database per environment, or shared database with backward-compatible migrations. Create database backup before running migrations. Run migrations using Kubernetes job or init container. Verify migration success before proceeding. Handle migration failures with rollback.

## 14. Canary Integration

Implement optional canary phase by configuring ingress with canary annotations. Route small percentage (10%) of traffic to new environment initially. Monitor canary metrics for error rates and performance. Gradually increase traffic percentage if metrics are healthy. Full switch to new environment if canary succeeds. Rollback if canary shows issues.

## 15. Monitoring and Alerting Configuration

Create PrometheusRule resources for blue-green specific alerts. Configure alerts for environment down, high error rate during deployment, and deployment stuck. Set up alert routing to appropriate channels (Slack, email, PagerDuty). Configure Grafana dashboards showing both environments, active environment indicator, traffic distribution, error rates per environment, and deployment events.

## 16. Configuration Management

Create config.sh with application configuration including app name, URL, namespace, container registry and repository, health check timeouts, deployment timeout, monitoring duration, and notification settings (Slack webhook, email). Source configuration in deployment script. Use consistent naming and configuration across all scripts.

## 17. Environment Status Command

Implement status command to display current deployment state. Show current active environment and inactive environment. Display deployment details with kubectl get deployments. Display service details with kubectl get services. Show health status from health endpoint. Format output clearly with sections and headers.

## 18. Setup Command Implementation

Implement setup command to initialize blue-green infrastructure. Apply Kubernetes manifests from k8s/blue-green/ directory. Create both blue and green deployments initially. Create blue, green, and active services. Configure ingress rules if needed. Verify all resources created successfully. Log completion of infrastructure setup.

## 19. Access and Operational Scripts

Generate helper scripts for port-forwarding to each environment. Create monitoring scripts for watching deployment status. Create helper functions for common operations. Document script usage and parameters. Provide examples for typical scenarios (deploy, switch, rollback, status).

## 20. Documentation and Best Practices

Document blue-green architecture components and flow. Create runbooks for deployment procedures, traffic switching, rollback procedures, and troubleshooting common issues. Document database migration strategies and considerations. Provide examples of successful deployments. Include decision matrix for when to rollback vs forward fix. Document zero-downtime verification procedures.

</detailed_sequence_steps>

</task>
