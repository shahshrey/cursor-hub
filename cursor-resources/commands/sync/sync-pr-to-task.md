<task name="Sync PR to Task">

<task_objective>
Link GitHub pull requests to Linear tasks with automated state synchronization and workflow integration. Implement comprehensive pull request to Linear task linking system with reference detection, PR analysis, state synchronization, task updates, GitHub enhancement, and workflow automation. The output will be complete PR-task integration with automated synchronization, workflow enhancement, state management, and comprehensive relationship tracking.
</task_objective>

<how_to_ask_followup_question>
<question>How would you like to link PRs to Linear tasks?</question>
<options>["Link specific PR to task", "Auto-detect task from PR content", "Enable automatic linking for all PRs", "Update existing PR-task links", "Configure PR-task automation"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Sync PR to Task - Detailed Sequence of Steps

## Prerequisites and Context

**Available Tools**: Read, Write, Edit, Bash

**Argument Options**: [pr-number] | --task | --auto-detect | --enable-auto | --update-state

**Model**: sonnet

## Current PR Context

- Repository: !`gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "No repo context"`
- PR details: Based on $ARGUMENTS PR number or auto-detection criteria
- Linear references: Detection of task IDs in PR content and branch names
- Webhook status: Current automation configuration for PR-task synchronization

## 1. Reference Detection

Extract Linear task references:

**Extract Linear Task IDs from PR Title**:
- Scan PR title for Linear task identifiers (e.g., ABC-123, DEF-456)
- Use regex patterns to match Linear ID format
- Support team-specific identifier patterns
- Handle multiple task references
- Validate extracted identifiers

**Extract from PR Body**:
- Parse PR description for Linear task links
- Detect Linear task URLs
- Find task ID mentions in text
- Extract from task lists or checklists
- Support various mention formats

**Extract from Branch Names**:
- Analyze branch name patterns
- Look for Linear IDs in branch naming conventions
- Support team-specific branch patterns (e.g., feature/ABC-123-description)
- Handle various delimiters
- Validate branch-based references

**Extract from Commit Messages**:
- Scan commit messages in PR
- Find Linear task references
- Parse conventional commit formats
- Extract from commit bodies
- Aggregate unique task references

## 2. PR Analysis

Fetch comprehensive PR data:

**Fetch Complete PR Data**:
- Retrieve PR using GitHub API or CLI
- Get title, body, number, state
- Fetch labels, reviewers, assignees
- Extract timestamps (created, updated, merged)
- Gather file change statistics

**Analyze State**:
- Determine current PR state (open, closed, merged, draft)
- Check review status (approved, changes requested, pending)
- Analyze CI/CD status
- Check merge eligibility
- Track state changes over time

**Review Status**:
- Count approvals received
- Identify requested changes
- Track pending reviews
- List reviewers and their statuses
- Calculate review completion percentage

**Change Metrics**:
- Count files changed
- Calculate lines added/deleted
- Analyze change complexity
- Identify affected code areas
- Assess review scope

**Timeline**:
- Track PR creation date
- Note review milestones
- Record approval timestamps
- Capture merge time
- Log state transitions

## 3. State Synchronization

Map PR states to Linear:

**Map PR States to Linear Equivalents**:
- Open PR → Linear "In Progress" or "In Review"
- Draft PR → Linear "Todo" or "In Progress"
- Approved PR → Linear "Ready to Deploy" or "Done"
- Merged PR → Linear "Done" or "Completed"
- Closed (not merged) → Linear "Canceled"

**Handle Review Cycles**:
- Track review requests
- Monitor approval status
- Update Linear on review completion
- Handle requested changes
- Reflect review progress in Linear

**Merge Events**:
- Detect PR merge
- Update Linear task status to completed
- Add merge information to task
- Link deployed artifacts
- Close related issues

## 4. Task Updates

Update Linear task:

**Update Linear Task Status**:
- Change task state based on PR state mapping
- Apply workflow-specific state transitions
- Respect team state configurations
- Handle custom workflows
- Validate state changes

**Add PR References**:
- Add GitHub PR URL to Linear task
- Include PR number and title
- Link in task description or custom field
- Create bidirectional reference
- Maintain reference formatting

**Create Comments**:
- Post comment on Linear task with PR details
- Include PR summary and status
- Add review information
- Link to code changes
- Notify task watchers

**Sync Metadata**:
- Update task assignee from PR author
- Sync labels between platforms
- Reflect PR priority in task
- Update due dates if applicable
- Preserve audit trail

## 5. GitHub Enhancement

Enhance PR with Linear context:

**Add Linear Context to PR**:
- Post comment with Linear task details
- Include task title and description
- Show task status and priority
- Link to Linear task
- Display task metadata

**Create Labels**:
- Apply labels indicating Linear sync status
- Create priority labels from task
- Add team or project labels
- Apply workflow stage labels
- Maintain label consistency

**Post Task Summaries**:
- Generate task summary in PR
- Include task requirements
- Show acceptance criteria
- List related tasks
- Display task progress

**Maintain Links**:
- Keep PR body updated with task links
- Update PR description with task context
- Maintain bidirectional navigation
- Validate link integrity
- Handle link updates

## 6. Workflow Automation

Enable real-time integration:

**Configure Webhooks**:
- Set up GitHub webhook for PR events
- Subscribe to PR opened, edited, closed, merged events
- Configure Linear webhook for task updates
- Validate webhook delivery
- Test webhook functionality

**Enable Real-time Sync**:
- Process webhook events immediately
- Update both platforms on changes
- Handle concurrent updates
- Prevent sync loops
- Maintain consistency

**Implement Event Handlers**:
- Handle PR opened events
- Process PR review events
- React to merge events
- Handle PR closure
- Manage label changes

**Maintain Consistency**:
- Ensure both platforms reflect same state
- Resolve conflicts automatically
- Handle race conditions
- Validate sync operations
- Monitor sync health

## Advanced Features

**Smart Branch Detection**:
- Intelligent branch name parsing
- Support for various naming conventions
- Fuzzy matching for task IDs
- Team-specific patterns
- Validation and suggestions

**Automated State Mapping**:
- Context-aware state translation
- Team workflow integration
- Custom mapping rules
- Bidirectional state sync
- State history tracking

**Review Integration**:
- Sync review status to Linear
- Track reviewer feedback
- Reflect approval progress
- Handle review iterations
- Notify stakeholders

**Commit Analysis**:
- Aggregate commit messages
- Extract task references
- Analyze code changes
- Link commits to tasks
- Generate change summaries

**Comprehensive Validation**:
- Validate task ID existence
- Check PR-task compatibility
- Verify permissions
- Ensure data integrity
- Test automation functionality

## Workflow Integration

**Real-time Updates**:
- Instant propagation of changes
- Sub-second sync latency
- Event-driven architecture
- Reliable delivery
- Error recovery

**Bidirectional Sync**:
- GitHub → Linear updates
- Linear → GitHub updates
- Conflict resolution
- Consistency maintenance
- Audit logging

**Event-driven Automation**:
- Webhook-based triggers
- Automatic state transitions
- Smart notifications
- Workflow orchestration
- Integration extensibility

**Comprehensive Monitoring**:
- Sync status tracking
- Performance metrics
- Error rate monitoring
- Integration health checks
- Alert configuration

## Output

Complete PR-task integration including:
- Automated synchronization with real-time updates
- Workflow enhancement with intelligent automations
- State management with bidirectional sync
- Comprehensive relationship tracking and validation
- Performance metrics and sync statistics
- Error reports and resolution recommendations
- Configuration documentation
- User guides for PR-task workflows

</detailed_sequence_steps>

</task>
