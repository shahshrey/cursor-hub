<task name="Sync Linear to Issues">

<task_objective>
Sync Linear tasks to GitHub issues with state mapping and attachment handling. Execute comprehensive synchronization of Linear tasks to GitHub issues with task discovery, state mapping, content transformation, GitHub integration, attachment migration, and comment synchronization. The output will be complete synchronization results with created issues, attachment migrations, comment transfers, and comprehensive sync reporting.
</task_objective>

<how_to_ask_followup_question>
<question>What scope of Linear tasks would you like to sync to GitHub?</question>
<options>["All tasks from team", "Tasks from specific project", "Tasks with specific priority", "Tasks in specific states", "Recently updated tasks"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Sync Linear to Issues - Detailed Sequence of Steps

## Prerequisites and Context

**Available Tools**: Read, Write, Edit, Bash

**Argument Options**: [sync-scope] | --team | --project | --priority | --states

**Model**: sonnet

## Current Linear Context

- Linear teams: Available teams and project assignments
- Task count: Linear task query to determine scope
- Target repository: !`gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "No repo context"`
- User mappings: Linear email to GitHub username correspondence

## 1. Task Discovery

Query and filter Linear tasks:

**Query Linear Tasks with Filters**:
- Use Linear API to fetch tasks
- Filter by team specified in $ARGUMENTS
- Filter by project if provided
- Filter by priority levels if specified
- Filter by task states (backlog, todo, in progress, done, canceled)

**Extract Metadata**:
- Retrieve task title, description, identifier
- Fetch state, priority, labels
- Extract assignee and creator information
- Get created, updated, completed timestamps
- Gather project and cycle associations

**Validate Requirements**:
- Check task has required fields
- Verify target repository is accessible
- Confirm user mappings exist
- Check for existing GitHub issues
- Validate sync eligibility

**Prioritize Sync**:
- Order tasks by priority
- Consider task age and updates
- Apply team-specific rules
- Respect dependencies
- Handle batch size limits

## 2. State Mapping

Transform Linear states to GitHub:

**Transform Linear States to GitHub Equivalents**:
- Map Linear backlog/todo to GitHub open state
- Map Linear in progress to GitHub open state
- Map Linear done to GitHub closed state
- Map Linear canceled to GitHub closed state
- Preserve state information in labels

**Handle Priority Conversion**:
- Map Linear priority (No Priority, Low, Medium, High, Urgent) to labels
- Create GitHub priority labels (priority:low, priority:high, etc.)
- Apply color coding for priorities
- Preserve priority in issue body
- Use consistent priority scheme

**Map Project Assignments**:
- Convert Linear projects to GitHub milestones
- Create milestones if they don't exist
- Set milestone due dates from Linear targets
- Apply project-level metadata
- Handle multiple project associations

## 3. Content Transformation

Build GitHub issue content:

**Build GitHub Issue Body**:
- Create issue title from Linear task title
- Transform Linear description to GitHub markdown
- Add Linear task reference header
- Include original Linear task URL
- Structure content with clear sections

**Preserve Formatting**:
- Maintain markdown structure
- Preserve code blocks with syntax highlighting
- Keep lists and checkboxes
- Retain emphasis and styling
- Handle Linear-specific formatting

**Handle Attachments**:
- Identify all attachments in task
- Download from Linear
- Upload to GitHub issue
- Update references in content
- Verify attachment accessibility

**Maintain Structure**:
- Preserve section headers
- Maintain logical flow
- Keep metadata organized
- Format for readability
- Include all relevant context

## 4. GitHub Integration

Create issues in GitHub:

**Create Issues with Proper Labels**:
- Use GitHub API or CLI to create issue
- Apply converted state labels
- Add priority labels
- Apply category labels (bug, feature, etc.)
- Include sync tracking labels

**Assign Users**:
- Map Linear assignee to GitHub user
- Use user mapping table
- Handle unmapped users gracefully
- Support multiple assignees
- Preserve assignee in body if mapping fails

**Set Milestones**:
- Assign to mapped milestone
- Create milestone if needed
- Set due date from Linear
- Apply milestone description
- Handle milestone metadata

**Manage Relationships**:
- Reference related GitHub issues
- Link to associated PRs
- Maintain parent-child relationships
- Create issue dependencies
- Preserve Linear relationships in body

## 5. Attachment Migration

Handle Linear attachments:

**Download Linear Attachments**:
- Enumerate all task attachments
- Download each file using Linear API
- Validate file integrity
- Handle large files appropriately
- Track download progress

**Upload to GitHub**:
- Use GitHub attachment API
- Generate stable URLs
- Maintain file names and types
- Handle size limitations
- Retry failed uploads

**Update References**:
- Replace Linear URLs with GitHub URLs
- Update inline image references
- Fix markdown image syntax
- Update file links
- Verify all references work

**Maintain Accessibility**:
- Test attachment availability
- Verify proper rendering
- Check permissions
- Validate media types
- Ensure mobile compatibility

## 6. Comment Synchronization

Transfer task comments:

**Transfer Comments with Attribution**:
- Fetch all Linear task comments
- Convert to GitHub comment format
- Preserve author information
- Maintain comment order
- Format for GitHub

**Preserve Context**:
- Keep conversation threading
- Maintain reply relationships
- Preserve quoted text
- Include comment context
- Link referenced entities

**Handle Mentions**:
- Convert Linear @mentions to GitHub mentions
- Map users for mentions
- Handle unmapped mentioned users
- Preserve mention context
- Validate mention syntax

**Maintain Threading**:
- Preserve temporal order
- Keep reply chains together
- Maintain conversation flow
- Note discussion participants
- Preserve engagement metrics

## Advanced Features

**Intelligent State Mapping**:
- Context-aware state conversion
- Team-specific mapping rules
- Custom state workflows
- Bidirectional state sync
- State transition tracking

**Attachment Handling**:
- Parallel download/upload
- Automatic retry on failure
- Progress tracking
- Format conversion if needed
- Thumbnail generation

**Comment Threading**:
- Preserve reply structure
- Quote parent comments
- Maintain context
- Thread visualization
- Conversation summarization

**User Mention Translation**:
- Automatic user discovery
- Fuzzy name matching
- Email-based mapping
- Interactive mapping
- Mapping persistence

**Comprehensive Validation**:
- Content verification
- Format validation
- Link integrity checking
- Attachment validation
- Cross-reference testing

## Data Fidelity

**Preserve Linear Formatting**:
- Maintain exact markdown structure
- Keep code highlighting
- Preserve tables
- Retain styling
- Handle special syntax

**Maintain Task Relationships**:
- Document parent tasks
- Reference child tasks
- Note blockers and dependencies
- Preserve project context
- Link related tasks

**Keep Timestamps**:
- Record original creation date
- Preserve update timestamps
- Note completion dates
- Track activity timeline
- Maintain audit trail

**Ensure Reference Integrity**:
- Validate all cross-references
- Test bidirectional links
- Verify external references
- Check URL accessibility
- Maintain reference consistency

## Output

Complete synchronization results including:
- Created issues with issue numbers and URLs
- Attachment migrations with success/failure status
- Comment transfers with attribution preserved
- Comprehensive sync reporting with metrics and statistics
- User mapping results
- Error reports for failed operations
- Bidirectional reference documentation
- Recommendations for future syncs

</detailed_sequence_steps>

</task>
