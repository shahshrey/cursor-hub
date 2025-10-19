<task name="Deployment Rollback">

<task_objective>
Rollback deployment to previous version with safety checks, database considerations, and monitoring. The workflow processes current deployment version, available versions from git tags, container status, Kubernetes deployment state, and health status to systematically rollback to a stable previous version with pre-rollback validation, traffic management, database handling, health validation, and post-rollback monitoring.
</task_objective>

<detailed_sequence_steps>
# Deployment Rollback - Detailed Sequence of Steps

## 1. Incident Assessment and Decision

Assess the severity and impact of current deployment issues by checking version using !`curl -s https://api.example.com/version 2>/dev/null` and health status using !`curl -sf https://api.example.com/health 2>/dev/null`. Determine if rollback is necessary or if forward fix is better option. Identify affected systems, users, and business functions through monitoring and error logs. Consider data integrity and consistency implications of rollback. Document the decision rationale and timeline in incident tracking system.

## 2. Emergency Response Setup

Activate incident response team through on-call system. Set up communication channels for coordination (Slack channel, war room). Notify stakeholders immediately about issue and planned rollback. Document incident details including issue description, current version, target rollback version, estimated impact, and ETA for resolution.

## 3. Pre-Rollback Safety Checks

Verify current production version using curl to version endpoint or kubectl get deployments. Check system status using health endpoints and monitoring dashboards. Identify target rollback version from !`git tag --sort=-version:refname | head -5` available versions. Verify rollback target exists and is deployable by checking git show <version> --stat. Ensure rollback version was previously stable in production.

## 4. Database Considerations

Check for database migrations between versions using migration comparison tool. If migrations exist, assess data loss risk and plan database rollback strategy. Create database backup before rollback with timestamped name including "pre-rollback-<date>". Consider if database rollback is safe or if forward-only migration strategy requires forward fix instead. Test database rollback in staging if time permits.

## 5. Traffic Management Preparation

Prepare to redirect traffic away from failing deployment. For maintenance page approach, enable maintenance mode to prevent new requests. For load balancer management, drain traffic gradually from affected instances. For circuit breaker approach, activate circuit breaker to stop requests to failing service. Monitor traffic patterns during transition.

## 6. Container and Kubernetes Rollback

For Kubernetes rollback, check rollout history with kubectl rollout history deployment/<name>, execute undo with kubectl rollout undo deployment/<name> or kubectl rollout undo deployment/<name> --to-revision=<number>, monitor progress with kubectl rollout status, and verify pods are running with kubectl get pods. For Docker Swarm, list service history, execute rollback with docker service update --rollback, or update to specific image with docker service update --image app:v1.2.9. Monitor service status throughout.

## 7. Traditional Deployment Rollback

For blue-green deployment, switch to inactive environment (blue to green or vice versa). For rolling deployment, deploy previous version using rolling deployment script. For symlink-based deployments, update symlink to previous release directory and restart application service.

## 8. Load Balancer and CDN Updates

Update load balancer to point to old version instances. Clear CDN cache if needed to serve old static assets using CloudFront invalidation or equivalent. Update DNS if necessary as last resort (note propagation delay). Verify traffic routing changes are effective.

## 9. Configuration Rollback

Rollback configuration files by checking out version tag config files. Restart services with old configuration (nginx, application services). Restore environment variables from previous version backup. Update feature flags to disable new features if applicable.

## 10. Database Rollback Execution

Execute database rollback only if absolutely necessary and data loss is acceptable. Check migration status in schema_migrations table. Rollback specific migrations using framework-specific commands (Rails rake db:migrate:down, Django python manage.py migrate, Node.js npm run migrate:down). Verify database state after rollback by checking tables and critical data.

## 11. Service Health Validation

Create and execute health check script to verify application health endpoint returns 200 status. Check critical endpoints including authentication, core API endpoints, and data retrieval. Verify each endpoint responds correctly. Monitor response times to ensure acceptable performance.

## 12. Performance and Metrics Validation

Check response times using curl with timing information. Monitor error rates in application logs using tail and grep. Check system resources (CPU, memory, disk) using top, free, and df commands. Validate database connectivity and query performance. Ensure all metrics return to baseline levels.

## 13. Traffic Restoration

Gradually restore traffic to rolled-back version starting with small percentage. Disable maintenance mode once validation complete. Re-enable circuit breakers to allow normal request flow. Monitor traffic patterns using monitoring dashboards and log analysis for 15-30 minutes. Watch for any anomalies or errors.

## 14. Monitoring and Alerting

Enable enhanced monitoring during rollback period. Watch key metrics including response times, error rates, user sessions, database performance, and system resources. Monitor logs in real-time using tail with filtering for errors and warnings. Set up temporary alerts for anomalies during recovery period.

## 15. User Communication

Prepare service update announcement with current status (restored), timestamp, duration of incident, and what happened explanation. Communicate current status showing all services operating normally, performance metrics back to baseline, and no data loss occurred. Document next steps for investigation and prevention.

## 16. Post-Rollback Validation

Run extended monitoring for 1-3 hours post-rollback. Execute integration tests against production environment. Check user-reported issues through support ticket system. Validate business metrics (transactions, user activity) return to normal. Ensure no residual effects from failed deployment.

## 17. Documentation and Reporting

Create rollback incident report documenting incident ID, rollback version details (from and to versions), start and end times, total duration, timeline of events with timestamps for key actions, impact assessment (user impact, duration, data impact), root cause analysis, and lessons learned with prevention measures.

## 18. Cleanup and Follow-up

Clean up failed deployment artifacts (container images, build files). Update deployment status in monitoring systems. Reset feature flags to pre-deployment state. Schedule post-incident review meeting. Document action items for preventing similar incidents.

## 19. Prevention and Improvement

Analyze what went wrong with the deployment through root cause analysis. Improve testing and validation procedures to catch issues earlier. Enhance monitoring and alerting to detect problems faster. Update rollback procedures based on learnings from this incident. Consider implementing canary deployments for safer releases.

</detailed_sequence_steps>

</task>
