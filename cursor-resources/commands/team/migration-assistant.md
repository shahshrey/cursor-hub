<task name="Migration Assistant">

<task_objective>
Execute comprehensive system migrations with planning, analysis, execution, verification, and rollback capabilities. Validate prerequisites, plan migration strategy, analyze risks, manage execution, verify results, and provide rollback procedures to ensure safe and successful system migrations with comprehensive safety measures.
</task_objective>

<detailed_sequence_steps>
# Migration Assistant - Detailed Sequence of Steps

## 1. Current Migration Context Analysis

1. Verify GitHub CLI authentication and API access status
2. Confirm Linear MCP server connectivity and permissions
3. Check available backup storage space and verification
4. Estimate migration scope including data volume and complexity assessment
5. Use $ARGUMENTS to specify: plan, analyze, migrate, verify, or rollback

## 2. Prerequisites Validation

1. Verify GitHub CLI authentication is active
2. Confirm Linear MCP connectivity and functionality
3. Validate permissions for both source and target systems
4. Ensure backup storage availability and accessibility

## 3. Migration Planning

1. Assess data volume and complexity requirements
2. Design migration strategy (phased, big-bang, parallel)
3. Identify dependencies between systems and data
4. Create rollback plan for failure scenarios

## 4. Risk Analysis

1. Evaluate potential failure points in the process
2. Assess data integrity risks during migration
3. Identify system dependencies that could break
4. Plan contingency measures for identified risks

## 5. Execution Management

1. Implement migration in planned phases
2. Monitor progress and system health continuously
3. Handle errors gracefully with proper logging
4. Maintain comprehensive audit trails of all actions

## 6. Verification Process

1. Validate data integrity through checksums and counts
2. Confirm system functionality with smoke tests
3. Test user workflows end-to-end
4. Verify performance metrics meet expectations

## 7. Rollback Procedures

1. Implement safe rollback mechanisms
2. Restore system state from backups
3. Validate recovery completeness
4. Communicate status updates to stakeholders

## 8. Advanced Features

1. Incremental migration support for phased approach
2. Real-time progress monitoring with dashboards
3. Automated health checks during migration
4. Comprehensive logging for debugging
5. Emergency stop mechanisms for critical issues

## 9. Safety Measures

1. Multi-point backups before critical steps
2. Integrity validation at each phase
3. Rollback testing before migration
4. System health monitoring throughout
5. Stakeholder communication protocols

**Allowed Tools**: Read, Write, Edit, Bash
**Model**: sonnet
**Argument Hint**: [action] | --plan | --analyze | --migrate | --verify | --rollback

</detailed_sequence_steps>

</task>
