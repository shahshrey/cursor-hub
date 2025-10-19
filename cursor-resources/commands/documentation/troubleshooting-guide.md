<task name="Troubleshooting Guide Generator">

<task_objective>
Generate systematic troubleshooting documentation with diagnostic procedures, common issues, and automated solutions. Input: System architecture, log locations, monitoring setup, error patterns, and health endpoints. Processing: Document system architecture, identify common issues, create diagnostic procedures, document error codes, establish escalation paths, and provide recovery procedures. Output: Comprehensive troubleshooting guide with diagnostic commands, issue categories with solutions, error code references, escalation matrix, and recovery procedures.
</task_objective>

<detailed_sequence_steps>

## 1. Analyze Current System Context

1. Review system architecture from @docker-compose.yml or @k8s/ or detect deployment type

2. Locate log directories: `find . -name "*log*" -type d | head -3`

3. Check monitoring setup: `grep -r "prometheus\|grafana\|datadog" . 2>/dev/null | wc -l`

4. Find error patterns: `find . -name "*.log" | head -3`

5. Identify health endpoints: `grep -r "health\|status" src/ 2>/dev/null | head -3`

## 2. System Overview and Architecture

1. Document the system architecture and components

2. Map out dependencies and integrations

3. Identify critical paths and failure points

4. Create system topology diagrams

5. Document data flow and communication patterns

## 3. Common Issues Identification

1. Collect historical support tickets and issues

2. Interview team members about frequent problems

3. Analyze error logs and monitoring data

4. Review user feedback and complaints

5. Identify patterns in system failures

## 4. Troubleshooting Framework

1. Establish systematic diagnostic procedures

2. Create problem isolation methodologies

3. Document escalation paths and procedures

4. Set up logging and monitoring checkpoints

5. Define severity levels and response times

## 5. Diagnostic Tools and Commands

1. Document essential diagnostic commands:
   ```bash
   top
   df -h
   free -m
   netstat -tuln
   tail -f /var/log/app.log
   journalctl -u service-name -f
   mysql -u user -p -e "SELECT 1"
   psql -h host -U user -d db -c "SELECT 1"
   ```

## 6. Performance Issues Category

1. **Slow Response Times**:
   - **Symptoms**: API responses > 5 seconds, UI freezing, database timeouts
   - **Diagnostic Steps**: Check system resources, review logs, analyze query performance, check network
   - **Common Causes**: Connection pool exhaustion, inefficient queries, memory leaks, bandwidth limitations
   - **Solutions**: Restart services, optimize queries, increase connection pool, scale resources

## 7. Error Code Documentation

1. Document HTTP Status Codes:
   - **500 Internal Server Error**: Check application logs, verify database connectivity, check environment variables
   - **404 Not Found**: Verify URL routing, check resource existence, review API endpoints
   - **503 Service Unavailable**: Check service health, verify load balancer, check maintenance mode

## 8. Environment-Specific Issues

1. Document development environment problems

2. Address staging/testing environment issues

3. Cover production-specific troubleshooting

4. Include local development setup problems

## 9. Database Troubleshooting

1. **Database Connection Issues**:
   - **Symptoms**: "Connection refused" errors, "Too many connections" errors, slow queries
   - **Diagnostic Commands**:
     ```sql
     SHOW PROCESSLIST;
     SELECT table_schema, ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) AS 'DB Size in MB' 
     FROM information_schema.tables GROUP BY table_schema;
     SHOW VARIABLES LIKE 'slow_query_log';
     ```

## 10. Network and Connectivity Issues

1. **Network Troubleshooting**:
   ```bash
   ping example.com
   telnet host port
   curl -v https://api.example.com/health
   nslookup example.com
   dig example.com
   traceroute example.com
   ```

2. **SSL/TLS Issues**:
   ```bash
   openssl s_client -connect example.com:443
   curl -vI https://example.com
   ```

## 11. Application-Specific Troubleshooting

1. **Memory Issues - Java Applications**:
   ```bash
   jstat -gc [PID]
   jmap -dump:format=b,file=heapdump.hprof [PID]
   jhat heapdump.hprof
   ```

2. **Memory Issues - Node.js Applications**:
   ```bash
   node --inspect app.js
   ```

## 12. Security and Authentication Issues

1. **Authentication Failures**:
   - **Symptoms**: 401 Unauthorized responses, token validation errors, session timeouts
   - **Diagnostic Steps**: Verify credentials, check token expiration, validate auth service, review CORS
   - **Common Solutions**: Refresh tokens, clear browser cache, verify CORS headers, check API key permissions

## 13. Deployment and Configuration Issues

1. **Container Issues**:
   ```bash
   docker ps -a
   docker logs container-name
   docker stats
   docker exec -it container-name /bin/bash
   ```

2. **Kubernetes Issues**:
   ```bash
   kubectl get pods
   kubectl describe pod pod-name
   kubectl logs pod-name
   kubectl get svc
   kubectl port-forward pod-name 8080:8080
   ```

## 14. Monitoring and Alerting Setup

1. Configure health checks and monitoring

2. Set up log aggregation and analysis

3. Implement alerting for critical issues

4. Create dashboards for system metrics

5. Document monitoring thresholds

## 15. Escalation Procedures

1. **Escalation Matrix**:
   - **Critical (P1)**: System down, data loss - Immediate response, escalate to on-call, notify management within 30 minutes
   - **High (P2)**: Major functionality impaired - Response within 2 hours, escalate to senior engineer, hourly updates
   - **Medium (P3)**: Minor functionality issues - Response within 8 hours, assign to team member, daily updates

## 16. Recovery Procedures

1. Document system recovery steps

2. Create data backup and restore procedures

3. Establish rollback procedures for deployments

4. Document disaster recovery processes

5. Test recovery procedures regularly

## 17. Preventive Measures

1. Implement monitoring and alerting

2. Set up automated health checks

3. Create deployment validation procedures

4. Establish code review processes

5. Document maintenance procedures

## 18. Knowledge Base Integration

1. Link to relevant documentation

2. Reference API documentation

3. Include links to monitoring dashboards

4. Connect to team communication channels

5. Integrate with ticketing systems

## 19. Team Communication

1. **Communication Channels**:
   - Slack: #incidents channel
   - Phone: On-call rotation
   - Email: alerts@company.com
   - Status page: status.company.com
   - Twitter: @company_status
   - Internal wiki: troubleshooting section

## 20. Documentation Maintenance

1. Regular review and updates

2. Version control for troubleshooting guides

3. Feedback collection from users

4. Integration with incident post-mortems

5. Continuous improvement processes

## 21. Self-Service Tools

1. Create diagnostic scripts and tools

2. Build automated recovery procedures

3. Implement self-healing systems

4. Provide user-friendly diagnostic interfaces

5. Create chatbot integration for common issues

## 22. Advanced Troubleshooting Techniques

1. **Log Analysis**:
   ```bash
   grep -i "error" /var/log/app.log | tail -50
   awk '{print $1}' access.log | sort | uniq -c | sort -nr
   tail -f /var/log/app.log | grep -i "exception"
   ```

2. **Performance Profiling**:
   ```bash
   iostat -x 1
   sar -u 1 10
   vmstat 1 10
   strace -p [PID]
   perf record -p [PID]
   ```

## 23. Best Practices

1. Keep troubleshooting guides up-to-date

2. Test all documented procedures regularly

3. Collect feedback from users and improve guides

4. Include screenshots and visual aids where helpful

5. Make guides searchable and well-organized

</detailed_sequence_steps>

</task>
