<task name="Sync Conflict Resolver">

<task_objective>
Resolve synchronization conflicts with intelligent strategies and automated resolution. Implement comprehensive conflict resolution system with detection, intelligent resolution strategies, pattern analysis, configuration management, reporting, and automated prevention. The output will be resolved conflicts with detailed resolution reports, updated sync state, pattern analysis insights, and optimized conflict prevention strategies.
</task_objective>

<how_to_ask_followup_question>
<question>What conflict resolution action would you like to perform?</question>
<options>["Detect and list all current conflicts", "Resolve conflicts using strategy", "Analyze conflict patterns", "Configure resolution rules", "Generate conflict report"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Sync Conflict Resolver - Detailed Sequence of Steps

## Prerequisites and Context

**Available Tools**: Read, Write, Edit, Bash

**Argument Options**: [action] | detect | resolve | analyze | configure | report

**Model**: sonnet

## Current Conflict State

- Sync database: @.sync-state.json or sync state files with potential conflicts
- Conflict history: !`find . -name "*conflict*" -o -name "*sync-errors*" | wc -l` conflict logs
- Resolution rules: @conflict-rules.json or existing resolution configuration
- Active conflicts: Current unresolved synchronization conflicts requiring attention

## 1. Conflict Detection

Identify synchronization conflicts:

**Scan Synchronized Items**:
- Query all entities in sync database
- Identify items with pending sync operations
- Check for items with multiple update sources
- Find items with sync failures or errors

**Compare Field Versions**:
- Fetch GitHub issue current state
- Fetch Linear task current state
- Compare field values (title, description, state, priority, assignee)
- Identify fields with different values between platforms

**Identify Timing Conflicts**:
- Detect simultaneous updates to same entity
- Check for concurrent modifications during sync
- Identify race conditions in update operations
- Find sync loop indicators (ping-pong updates)

**Flag Structural Issues**:
- Detect deleted entities with active references
- Identify broken bidirectional links
- Find orphaned sync records
- Flag schema or format incompatibilities

## 2. Intelligent Resolution

Apply conflict resolution strategies:

**Apply Resolution Strategies**:
- **Latest-wins**: Use most recently modified version
- **GitHub-wins**: Prioritize GitHub as source of truth
- **Linear-wins**: Prioritize Linear as source of truth
- **Field-level merge**: Smart merge of individual fields
- **Manual review**: Flag for human decision

**Handle Field Merging**:
- Merge non-conflicting field changes
- Apply field-specific resolution rules
- Preserve important field updates
- Maintain data consistency

**Preserve Critical Data**:
- Never overwrite without backup
- Preserve historical data in audit log
- Maintain conflict resolution history
- Enable rollback if needed

**Maintain Relationships**:
- Ensure cross-references remain valid
- Update both platforms consistently
- Preserve parent-child relationships
- Maintain linked entity integrity

## 3. Pattern Analysis

Study conflict trends:

**Study Conflict Trends**:
- Aggregate conflicts by type
- Track conflict frequency over time
- Identify peak conflict periods
- Analyze conflict volume trends

**Identify Frequent Issues**:
- Find most common conflict types
- Identify problematic entities or users
- Detect systematic issues
- Find configuration problems

**Suggest Process Improvements**:
- Recommend sync frequency adjustments
- Suggest field locking strategies
- Propose workflow changes
- Identify training needs

**Optimize Strategies**:
- Evaluate resolution strategy effectiveness
- Suggest better default rules
- Identify opportunities for automation
- Propose conflict prevention measures

## 4. Configuration Management

Manage resolution settings:

**Set Resolution Preferences**:
- Configure default resolution strategy
- Set per-team or per-project preferences
- Define user-specific settings
- Apply organizational policies

**Define Field Priorities**:
- Set field importance levels
- Define which fields take precedence
- Configure field-specific strategies
- Establish field merge rules

**Configure Merge Rules**:
- Define field-level merge logic
- Set up automatic merge conditions
- Configure conflict thresholds
- Establish validation rules

**Save Automation Settings**:
- Persist configuration to file
- Version control configuration
- Share configuration across team
- Document configuration decisions

## 5. Reporting & Analytics

Generate insights and reports:

**Generate Conflict Reports**:
- Create comprehensive conflict inventory
- List all detected conflicts with details
- Show resolution status for each
- Provide actionable recommendations

**Track Resolution Success**:
- Measure resolution success rate
- Track time to resolution
- Monitor automated vs manual resolutions
- Calculate conflict resolution efficiency

**Analyze Team Patterns**:
- Identify teams with most conflicts
- Analyze user behavior patterns
- Find collaboration bottlenecks
- Suggest team-specific improvements

**Provide Insights**:
- Generate trend analysis
- Provide predictive insights
- Identify root causes
- Recommend preventive actions

## 6. Automated Prevention

Reduce future conflicts:

**Implement Locking Mechanisms**:
- Lock entity during active sync
- Prevent concurrent modifications
- Queue conflicting updates
- Release locks after completion

**Optimize Sync Timing**:
- Adjust sync frequency based on activity
- Implement smart sync scheduling
- Reduce sync latency
- Balance load across time periods

**Enable Change Notifications**:
- Notify users of ongoing sync operations
- Alert on potential conflicts
- Provide real-time sync status
- Enable user coordination

**Reduce Conflicts**:
- Implement field-level locking
- Provide sync status indicators
- Enable draft/publish workflows
- Implement change queuing

## Resolution Strategies

**Latest-wins**:
- Compare modification timestamps
- Use most recent version
- Apply to all fields uniformly
- Simple and deterministic

**Smart Field-level Merging**:
- Analyze each field independently
- Merge non-conflicting changes
- Apply field-specific rules
- Preserve maximum information

**Manual Interactive Resolution**:
- Present conflict to user
- Show both versions side-by-side
- Allow field-by-field selection
- Enable custom resolution

**System-priority Resolution**:
- Prioritize one platform consistently
- Apply for critical fields
- Maintain source of truth
- Ensure data consistency

**Custom Rule-based Resolution**:
- Apply organization-specific rules
- Use field importance hierarchy
- Consider entity type and context
- Enable flexible resolution logic

## Quality Assurance

**Backup Before Resolution**:
- Create state snapshot before changes
- Store backup with timestamp
- Enable quick restoration
- Maintain backup history

**Validation After Changes**:
- Verify resolution correctness
- Check data consistency
- Validate cross-references
- Test bidirectional sync

**Rollback Capabilities**:
- Enable undo of recent resolutions
- Restore from backup points
- Preserve rollback history
- Document rollback procedures

**Comprehensive Audit Trails**:
- Log all conflict detections
- Record resolution decisions
- Track resolution outcomes
- Maintain complete history

## Output

Resolved conflicts including:
- Detailed resolution reports showing all conflicts and actions taken
- Updated sync state with resolved entity states
- Pattern analysis insights identifying trends and root causes
- Optimized conflict prevention strategies and recommendations
- Configuration updates for improved future handling
- Audit trail of all resolution operations
- Statistics on resolution effectiveness

</detailed_sequence_steps>

</task>
