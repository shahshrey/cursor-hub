<task name="Bidirectional Sync">

<task_objective>
Enable comprehensive bidirectional GitHub-Linear synchronization with conflict resolution. Implement robust bidirectional synchronization system between GitHub Issues and Linear tasks with sync state management, conflict detection, resolution strategies, transaction management, webhook integration, and data integrity validation. The output will be complete bidirectional sync system with conflict resolution, webhook integration, performance metrics, and comprehensive sync reporting.
</task_objective>

<how_to_ask_followup_question>
<question>What type of bidirectional sync would you like to configure?</question>
<options>["Full sync (initial setup)", "Incremental sync (updates only)", "Dry-run (preview changes)", "Configure conflict strategy", "Resume interrupted sync"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Bidirectional Sync - Detailed Sequence of Steps

## Prerequisites and Context

**Available Tools**: Read, Write, Edit, Bash

**Argument Options**: [sync-mode] | --full | --incremental | --dry-run | --conflict-strategy

**Model**: sonnet

## Current Sync Environment

- GitHub status: !`gh api user 2>/dev/null && echo "✓ Authenticated" || echo "⚠ Not authenticated"`
- Linear MCP: Check if Linear MCP server is available and configured
- Sync state: @.sync-state.json or @sync/ (if exists)
- Webhooks: !`gh api repos/{owner}/{repo}/hooks 2>/dev/null | grep -c linear || echo "0"`

## 1. Sync State Management

Initialize and maintain sync database:

**Initialize Sync Database**:
- Create or load sync state file (.sync-state.json)
- Define schema for entity mappings
- Set up entity version tracking
- Initialize sync metadata
- Create audit log structure

**Track Entity Relationships**:
- Store GitHub issue to Linear task mappings
- Maintain bidirectional reference index
- Track parent-child relationships
- Record linked PRs and commits
- Preserve relationship metadata

**Maintain Sync History**:
- Log all sync operations with timestamps
- Track field-level changes
- Record conflict occurrences and resolutions
- Store performance metrics
- Maintain rollback points

## 2. Conflict Detection

Identify synchronization conflicts:

**Identify Simultaneous Changes**:
- Compare last sync timestamp with entity update times
- Detect modifications on both platforms since last sync
- Identify overlapping update windows
- Flag concurrent edit operations
- Calculate conflict probability

**Field-level Conflicts**:
- Compare each field individually
- Identify specific conflicting fields
- Determine which fields are in conflict
- Preserve non-conflicting changes
- Calculate field-level diff

**Timing Issues**:
- Detect race conditions
- Identify sync loop patterns
- Find update sequences
- Track propagation delays
- Measure sync latency

## 3. Resolution Strategies

Apply conflict resolution:

**NEWER_WINS**:
- Compare modification timestamps
- Use most recently updated version
- Apply uniformly to all fields
- Simple and predictable
- Document decision in audit log

**GITHUB_WINS**:
- Prioritize GitHub as source of truth
- Always prefer GitHub values
- Consistent direction of sync
- Suitable for GitHub-primary workflows
- Override Linear changes

**LINEAR_WINS**:
- Prioritize Linear as source of truth
- Always prefer Linear values
- Consistent direction of sync
- Suitable for Linear-primary workflows
- Override GitHub changes

**Intelligent Field-level Merge**:
- Analyze each field independently
- Merge non-conflicting fields
- Apply field-specific resolution rules
- Preserve maximum information
- Use smart merge algorithms

## 4. Transaction Management

Ensure operation atomicity:

**Atomic Operations**:
- Group related updates together
- Ensure all-or-nothing execution
- Maintain consistency across platforms
- Handle partial failure scenarios
- Implement two-phase commit

**Rollback Capability**:
- Create checkpoint before operations
- Enable undo of failed operations
- Restore previous state on error
- Maintain rollback history
- Test rollback procedures

**Distributed Locking**:
- Lock entity during sync operation
- Prevent concurrent modifications
- Implement timeout mechanisms
- Handle deadlock scenarios
- Queue conflicting operations

## 5. Webhook Integration

Enable real-time synchronization:

**Real-time Event Handling**:
- Process GitHub webhook events
- Process Linear webhook events
- Filter relevant events
- Queue events for processing
- Handle event bursts

**Sync Loop Prevention**:
- Track sync-initiated changes
- Ignore self-generated events
- Implement change attribution
- Break circular update chains
- Use sync markers

**Automated Triggers**:
- Configure automatic sync on entity changes
- Set up scheduled sync jobs
- Implement smart sync scheduling
- Optimize sync frequency
- Balance real-time vs batch sync

## 6. Data Integrity

Ensure consistency and correctness:

**Bidirectional Validation**:
- Verify GitHub → Linear sync
- Verify Linear → GitHub sync
- Test round-trip consistency
- Check field preservation
- Validate state mappings

**Cross-reference Maintenance**:
- Keep bidirectional links updated
- Validate reference integrity
- Repair broken references
- Update reference database
- Test navigation paths

**Audit Trails**:
- Log all sync operations
- Track data transformations
- Record conflict resolutions
- Store decision rationale
- Enable compliance reporting

## Advanced Features

**Field-level Merge Rules**:
- Configurable per-field strategies
- Smart merge algorithms
- Preserve both changes when possible
- Field priority configuration
- Custom merge logic

**Sync Loop Prevention**:
- Change source tracking
- Event fingerprinting
- Circular update detection
- Smart filtering
- Attribution system

**Webhook Automation**:
- Real-time event processing
- Instant propagation
- Event deduplication
- Reliable delivery
- Error recovery

**Performance Optimization**:
- Batch similar operations
- Cache frequently accessed data
- Optimize API calls
- Parallel processing
- Resource management

**Comprehensive Monitoring**:
- Real-time sync status
- Performance metrics
- Error tracking
- Health dashboards
- Alert configuration

## Production Ready

**Transaction Safety**:
- ACID compliance
- Atomic operations
- Rollback capability
- Consistency guarantees
- Isolation levels

**Conflict Resolution**:
- Multiple resolution strategies
- Configurable rules
- Manual override capability
- Resolution history
- Conflict analytics

**Error Recovery**:
- Automatic retry logic
- Graceful degradation
- Partial sync recovery
- Error categorization
- Recovery procedures

**Performance Monitoring**:
- Throughput tracking
- Latency measurement
- Resource utilization
- Bottleneck identification
- Capacity planning

**Comprehensive Logging**:
- Detailed operation logs
- Error and warning tracking
- Performance metrics
- Audit trail
- Debug information

## Output

Complete bidirectional sync system including:
- Conflict resolution with multiple strategies and smart merging
- Webhook integration for real-time synchronization
- Performance metrics with detailed analytics
- Comprehensive sync reporting with statistics and insights
- Transaction management with atomicity guarantees
- Data integrity validation with continuous monitoring
- Error recovery procedures and documentation
- Configuration management and versioning
- User documentation and operation guides
- Monitoring dashboards and alerting

</detailed_sequence_steps>

</task>
