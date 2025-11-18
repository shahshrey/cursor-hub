<task name="Sync Migration Assistant">

<task_objective>
Execute comprehensive data migration between GitHub and Linear with enterprise-grade capabilities. Implement large-scale data migration system with pre-migration assessment, migration planning, data extraction, transformation engine, migration execution, and post-migration validation. The output will be complete migration system with phased execution, comprehensive validation, detailed reporting, and enterprise-grade reliability for large-scale data transitions.
</task_objective>

<how_to_ask_followup_question>
<question>What type of migration would you like to perform?</question>
<options>["GitHub to Linear migration", "Linear to GitHub migration", "Bidirectional sync setup", "Validation only (dry-run)", "Resume previous migration"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Sync Migration Assistant - Detailed Sequence of Steps

## Prerequisites and Context

**Available Tools**: Read, Write, Edit, Bash

**Argument Options**: [migration-type] | --github-to-linear | --linear-to-github | --bidirectional | --validate

**Model**: sonnet

## Current Migration Environment

- Source system: !`gh --version 2>/dev/null && echo "GitHub CLI available" || echo "GitHub CLI needed"`
- Target system: Linear MCP server connectivity and authentication status
- Migration scope: Analysis of data volume and complexity for planning
- Infrastructure: Database, queue services, and processing capacity assessment

## 1. Pre-Migration Assessment

Analyze and plan migration:

**Data Volume Analysis**:
- Count total items to migrate (issues, tasks, comments)
- Calculate total data size
- Estimate API calls required
- Project migration duration
- Assess resource requirements

**Dependency Mapping**:
- Identify cross-references between entities
- Map parent-child relationships
- Find linked issues and PRs
- Document external dependencies
- Create dependency graph

**Risk Assessment**:
- Identify potential data loss risks
- Evaluate API rate limit constraints
- Assess network reliability
- Consider rollback complexity
- Identify critical failure points

**Resource Planning**:
- Calculate required API quota
- Estimate storage needs
- Determine compute requirements
- Plan network bandwidth
- Allocate time buffers

## 2. Migration Planning

Design migration strategy:

**Phased Approach Design**:
- Define migration phases (preparation, core migration, validation, cleanup)
- Establish phase boundaries and dependencies
- Set phase completion criteria
- Plan phase transitions
- Build phase timeline

**Rollback Strategy**:
- Design rollback procedures for each phase
- Create backup and snapshot points
- Define rollback triggers
- Document rollback steps
- Test rollback procedures

**Validation Checkpoints**:
- Define validation criteria for each phase
- Set quality gates
- Establish success metrics
- Plan validation procedures
- Document expected outcomes

**Timeline Estimation**:
- Calculate time per phase
- Factor in rate limits and delays
- Include validation time
- Add contingency buffers
- Set milestone dates

## 3. Data Extraction

Harvest source data:

**Comprehensive Data Harvesting**:
- Extract all issues/tasks with full metadata
- Fetch all comments and discussions
- Download attachments and media
- Retrieve timeline events
- Capture historical data

**Relationship Preservation**:
- Extract cross-references
- Map parent-child relationships
- Capture issue links
- Document PR associations
- Preserve project structures

**Metadata Capture**:
- Store creation and modification timestamps
- Preserve author information
- Capture state history
- Extract labels and tags
- Save custom fields

**Error Handling**:
- Retry failed extractions
- Handle rate limits
- Manage pagination
- Validate extracted data
- Log extraction issues

## 4. Transformation Engine

Convert data formats:

**Field Mapping**:
- Map source fields to target schema
- Convert field types
- Handle custom fields
- Apply naming conventions
- Preserve field semantics

**Format Conversion**:
- Transform markdown formats
- Convert rich text
- Handle code blocks
- Adjust media references
- Preserve formatting

**Validation Rules**:
- Define required field rules
- Set format constraints
- Validate data integrity
- Check referential integrity
- Enforce business rules

**Data Enrichment**:
- Add migration metadata
- Enhance descriptions
- Supplement missing fields
- Apply default values
- Improve data quality

## 5. Migration Execution

Execute phased migration:

**Batch Processing**:
- Process items in optimized batches
- Manage batch sizes dynamically
- Handle batch failures
- Track batch progress
- Optimize throughput

**Progress Tracking**:
- Display real-time progress
- Show phase completion status
- Report item counts
- Display success/failure rates
- Estimate time remaining

**Error Recovery**:
- Implement automatic retry logic
- Handle transient failures
- Isolate permanent failures
- Log all errors with context
- Enable manual intervention

**Quality Assurance**:
- Validate each migrated item
- Check data consistency
- Verify relationships
- Test functionality
- Confirm completeness

## 6. Post-Migration Validation

Verify migration success:

**Data Integrity Verification**:
- Count items (source vs target)
- Verify field accuracy
- Check content preservation
- Validate timestamps
- Confirm metadata

**Relationship Validation**:
- Test cross-references
- Verify parent-child links
- Check bidirectional references
- Validate external links
- Ensure graph integrity

**Performance Testing**:
- Test query performance
- Measure access latency
- Validate scalability
- Check system load
- Benchmark operations

**Rollback Readiness**:
- Verify backup integrity
- Test restore procedures
- Validate rollback scripts
- Confirm data recovery
- Document rollback process

## Enterprise Features

**Large-scale Batch Processing**:
- Distributed processing
- Parallel execution
- Load balancing
- Resource optimization
- Scalable architecture

**Comprehensive Error Recovery**:
- Multi-level retry logic
- Checkpoint-based recovery
- Transaction management
- State persistence
- Failure isolation

**Detailed Audit Trails**:
- Complete operation logging
- Decision tracking
- Data lineage
- Change history
- Compliance reporting

**Rollback Capabilities**:
- Point-in-time recovery
- Selective rollback
- Automated rollback triggers
- Verification procedures
- Documentation generation

**Performance Optimization**:
- Query optimization
- Caching strategies
- Connection pooling
- Batch optimization
- Resource tuning

## Quality Assurance

**Multi-stage Validation**:
- Pre-migration validation
- In-flight validation
- Post-migration validation
- User acceptance testing
- Production verification

**Data Integrity Checks**:
- Checksum verification
- Field-level validation
- Relationship testing
- Format compliance
- Content verification

**Relationship Verification**:
- Graph traversal testing
- Link validation
- Dependency checking
- Referential integrity
- Cross-reference testing

**Comprehensive Testing**:
- Unit testing
- Integration testing
- End-to-end testing
- Performance testing
- Security testing

**Enterprise Monitoring**:
- Real-time dashboards
- Alert systems
- Performance metrics
- Resource monitoring
- Audit logging

## Output

Complete migration system including:
- Phased execution plan with timeline and milestones
- Comprehensive validation reports at each phase
- Detailed reporting with statistics and metrics
- Enterprise-grade reliability features
- Rollback procedures and documentation
- Performance analytics and optimization recommendations
- Data integrity verification results
- Audit trail for compliance
- User documentation and training materials
- Post-migration support procedures

</detailed_sequence_steps>

</task>
