<task name="Supabase Backup Manager">

<task_objective>
Manage comprehensive Supabase database backups with automated scheduling and recovery procedures. The workflow accepts operation arguments (backup, restore, schedule, validate, cleanup) and uses Supabase MCP integration to execute backup operations, validate backup integrity, configure automated schedules, and implement disaster recovery procedures. Outputs include backup files, recovery validation reports, automated backup schedules, and disaster recovery documentation.
</task_objective>

<detailed_sequence_steps>
# Supabase Backup Manager - Detailed Sequence of Steps

## Current Backup Context

- Supabase project: MCP integration for backup operations and status monitoring
- Backup storage: Current backup configuration and storage capacity
- Recovery testing: Last backup validation and recovery procedure verification
- Automation status: !`find . -name "*.yml" -o -name "*.json" | xargs grep -l "backup\|cron" 2>/dev/null | head -3` scheduled backup configuration

## 1. Backup Strategy

1. Design backup schedules based on data criticality and change frequency
2. Implement retention policies for long-term and short-term backups
3. Configure incremental backups to optimize storage usage
4. Optimize storage usage with compression strategies

## 2. Automated Backup

1. Create database snapshots using Supabase MCP integration
2. Export schema and data with proper formatting
3. Validate backup integrity using checksums and test queries
4. Monitor backup completion and log success/failure status

## 3. Recovery Procedures

1. Test restore processes on non-production environments
2. Validate data integrity after restoration
3. Implement point-in-time recovery capabilities
4. Optimize recovery time objectives (RTO)

## 4. Schedule Management

1. Configure automated backup schedules using cron or workflow automation
2. Implement backup monitoring with health checks
3. Setup failure notifications via email or webhook
4. Optimize backup windows to minimize performance impact

## 5. Storage Optimization

1. Manage backup storage locations and access permissions
2. Implement compression strategies to reduce storage costs
3. Archive old backups according to retention policy
4. Monitor storage costs and usage trends

## 6. Disaster Recovery

1. Plan disaster recovery procedures with clear runbooks
2. Test recovery scenarios regularly (monthly or quarterly)
3. Document recovery processes for team reference
4. Validate business continuity and recovery time objectives

## Advanced Features

- Automated backup validation
- Recovery time optimization
- Cross-region backup replication
- Backup encryption
- Compliance reporting

## Monitoring Integration

- Backup success monitoring
- Failure alerting
- Storage usage tracking
- Recovery time measurement
- Compliance reporting

</detailed_sequence_steps>

</task>
