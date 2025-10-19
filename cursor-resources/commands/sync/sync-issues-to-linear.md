<task name="Sync Issues to Linear">

<task_objective>
Sync GitHub issues to Linear workspace with comprehensive field mapping and rate limit management. Execute comprehensive synchronization of GitHub issues to Linear workspace with intelligent field mapping, data validation, Linear integration, rate limit management, and progress tracking. The output will be complete synchronization results with success metrics, error reports, mapping summaries, and comprehensive sync analytics.
</task_objective>

<how_to_ask_followup_question>
<question>What scope of issues would you like to sync to Linear?</question>
<options>["All issues", "Open issues only", "Issues by specific state", "Issues with specific labels", "Issues assigned to someone", "Issues in specific milestone"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Sync Issues to Linear - Detailed Sequence of Steps

## Prerequisites and Context

**Available Tools**: Read, Write, Edit, Bash

**Argument Options**: [sync-scope] | --state | --label | --assignee | --milestone

**Model**: sonnet

## Current Repository Context

- Repository: !`gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "No repo context"`
- Issue count: !`gh issue list --state all --limit 1 --json number | jq length 2>/dev/null || echo "Check manually"`
- Linear teams: Available Linear teams and project assignments
- Rate limits: !`gh api rate_limit -q '.rate | "GitHub: \(.remaining)/\(.limit)"' 2>/dev/null`

## 1. Issue Discovery

Fetch GitHub issues with filters:

**Fetch GitHub Issues with Comprehensive Metadata**:
- Query GitHub issues using CLI or API
- Retrieve title, body, number, state, labels, assignees
- Fetch comments, reactions, timeline events
- Extract created, updated, closed timestamps
- Gather milestone and project associations

**Apply Filters**:
- Filter by state from $ARGUMENTS (open, closed, all)
- Filter by labels specified in arguments
- Filter by assignees if specified
- Filter by milestone if provided
- Apply date range filters if needed

**Validate Requirements**:
- Check for required fields in issues
- Validate issue data completeness
- Verify user mappings exist
- Confirm Linear team assignments
- Check for existing Linear tasks

## 2. Field Mapping

Transform GitHub data to Linear format:

**Transform GitHub Fields to Linear Format**:
- Convert GitHub issue title to Linear task title
- Transform issue body to Linear description markdown
- Map issue number to reference field
- Convert state (open/closed) to Linear state
- Preserve original URLs and metadata

**Map Priorities**:
- Analyze labels for priority keywords
- Consider issue age and activity
- Apply team-specific priority rules
- Map to Linear priority levels (No Priority, Low, Medium, High, Urgent)
- Use intelligent inference when explicit priority absent

**Convert Labels**:
- Map GitHub labels to Linear labels/tags
- Create new Linear labels if needed
- Apply standard label mappings (bug, feature, enhancement)
- Preserve custom labels
- Handle label color and description

**Handle Assignees**:
- Map GitHub usernames to Linear users
- Use user mapping table (@user-mappings.json)
- Handle multiple assignees
- Fallback for unmapped users
- Preserve assignee information in description

## 3. Data Validation

Ensure data quality:

**Check Required Fields**:
- Verify title is present and non-empty
- Ensure description has content
- Validate team assignment
- Check project association if required
- Confirm all mandatory fields populated

**Validate User Mappings**:
- Check all assignees have Linear mappings
- Validate user email addresses
- Confirm user permissions in Linear
- Alert on unmapped users
- Provide mapping suggestions

**Ensure Data Integrity**:
- Verify no data corruption
- Check field length limits
- Validate markdown formatting
- Ensure URL validity
- Check character encoding

**Prevent Duplicates**:
- Search for existing Linear tasks with same GitHub reference
- Check for similar titles
- Verify no recent sync of same issue
- Use sync database for duplicate detection
- Confirm user intent for potential duplicates

## 4. Linear Integration

Create tasks in Linear:

**Create Tasks with Proper Formatting**:
- Use Linear API to create tasks
- Apply markdown formatting
- Structure description with sections
- Include GitHub issue reference prominently
- Add metadata footer

**Apply Team Assignments**:
- Assign to specified or inferred Linear team
- Set project within team if applicable
- Apply team-specific defaults
- Configure team workflows
- Respect team permissions

**Set Projects**:
- Map GitHub milestones to Linear projects
- Assign to appropriate project/cycle
- Set project-specific fields
- Apply project defaults
- Handle multiple project assignments

**Manage Relationships**:
- Create parent-child relationships
- Link related issues
- Maintain issue dependencies
- Preserve GitHub relationships
- Create cross-references

## 5. Rate Limit Management

Handle API constraints:

**Implement Exponential Backoff**:
- Start with short delay on rate limit
- Increase delay exponentially on repeated limits
- Cap maximum delay time
- Track backoff attempts
- Log rate limit encounters

**Batch Operations**:
- Group multiple operations together
- Optimize API call efficiency
- Reduce redundant queries
- Use bulk APIs when available
- Maximize throughput within limits

**Monitor API Limits**:
- Check rate limit before operations
- Track remaining quota
- Calculate safe operation rate
- Predict limit reset time
- Alert on approaching limits

**Optimize Requests**:
- Cache frequently accessed data
- Minimize redundant API calls
- Use GraphQL for complex queries
- Implement request deduplication
- Batch related operations

## 6. Progress Tracking

Monitor sync operation:

**Provide Real-time Updates**:
- Display progress bar or percentage
- Show current item being processed
- Update success/failure counts
- Display estimated time remaining
- Show throughput rate

**Handle Errors Gracefully**:
- Catch and categorize errors
- Continue processing after failures
- Collect failed items for retry
- Log errors with context
- Provide detailed error messages

**Maintain Sync State**:
- Update sync database after each operation
- Track processed items
- Store sync metadata
- Enable resume capability
- Maintain audit trail

**Generate Reports**:
- Compile sync statistics
- List all synced items
- Report failed items with reasons
- Generate mapping documentation
- Provide summary metrics

## Advanced Features

**Smart Priority Inference**:
- Natural language processing of issue content
- Historical pattern analysis
- Team-specific priority rules
- Label-based priority detection
- Confidence scoring

**Intelligent User Mapping**:
- Automatic email-based mapping
- Username similarity matching
- Organization directory lookup
- Interactive mapping prompts
- Persistent mapping storage

**Incremental Sync Capabilities**:
- Track last sync timestamp
- Sync only changed issues
- Detect updates since last sync
- Optimize for large repositories
- Reduce unnecessary operations

**Comprehensive Error Recovery**:
- Automatic retry for transient errors
- Manual retry for specific items
- Partial sync recovery
- Transaction rollback capability
- Error analysis and reporting

## Data Integrity

**Preserve Formatting**:
- Maintain markdown structure
- Preserve code blocks
- Keep lists and tables
- Retain emphasis and styling
- Handle special characters

**Maintain Metadata**:
- Preserve timestamps
- Keep author information
- Maintain issue numbers
- Store original URLs
- Track sync history

**Create Bidirectional References**:
- Add Linear task URL to GitHub issue
- Add GitHub issue URL to Linear task
- Update sync database
- Enable cross-platform navigation
- Test reference functionality

**Ensure Audit Trails**:
- Log all sync operations
- Track data transformations
- Record decisions made
- Store operation metadata
- Enable compliance reporting

## Output

Complete synchronization results including:
- Success metrics (total synced, success rate, duration)
- Error reports (failed items with detailed error messages)
- Mapping summaries (user mappings, label mappings, priority assignments)
- Comprehensive sync analytics (throughput, API usage, performance metrics)
- Bidirectional reference documentation
- Recommendations for future syncs
- Detailed audit trail

</detailed_sequence_steps>

</task>
