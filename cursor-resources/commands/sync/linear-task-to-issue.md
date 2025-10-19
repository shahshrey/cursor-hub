<task name="Linear Task to Issue">

<task_objective>
Convert Linear tasks to GitHub issues with relationship preservation and metadata mapping. Execute precise conversion of Linear tasks to GitHub issues with comprehensive content transformation, attachment migration, comment import, and cross-reference setup. The output will be successfully created GitHub issues with complete data migration, accurate field mappings, preserved relationships, and comprehensive conversion report.
</task_objective>

<how_to_ask_followup_question>
<question>How would you like to convert this Linear task to GitHub?</question>
<options>["Convert with automatic repository detection", "Convert to specific repository", "Convert and set milestone", "Convert without attachments", "Full conversion with all data"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Linear Task to Issue - Detailed Sequence of Steps

## Prerequisites and Context

**Available Tools**: Read, Write, Edit, Bash

**Argument Options**: [task-id] | --repo | --milestone | --close-linear | --skip-attachments

**Model**: sonnet

## Current Task Context

- Task details: Based on $ARGUMENTS task identifier or selection criteria
- Target repository: !`gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "No repo context"`
- User mappings: Linear email to GitHub username correspondence
- Attachment handling: Linear attachment access and GitHub upload capabilities

## 1. Task Analysis

Fetch and analyze Linear task data:

**Fetch Complete Linear Task Data**:
- Retrieve task using Linear API with task identifier from $ARGUMENTS
- Fetch all metadata (title, description, state, priority, labels)
- Extract assignee and team information
- Gather timeline and activity data

**Extract Relationships**:
- Identify parent tasks and subtasks
- Extract related tasks and dependencies
- Find associated projects and cycles
- Note team and workspace context

**Analyze Content Structure**:
- Parse description sections and formatting
- Identify checklists and action items
- Extract attachments and embedded media
- Locate code blocks and technical details

**Identify Priorities**:
- Extract Linear priority level
- Consider task state and urgency
- Analyze due dates and SLAs
- Apply priority mapping rules for GitHub

## 2. Content Transformation

Build GitHub issue from Linear data:

**Build GitHub Issue Body**:
- Transform Linear description to GitHub markdown
- Create structured sections (Description, Details, Metadata)
- Add Linear task reference header
- Include original task URL for navigation

**Map Linear Fields**:
- Convert Linear title to GitHub issue title
- Transform priority to GitHub labels
- Map Linear state to GitHub state (open/closed)
- Convert Linear labels to GitHub labels

**Preserve Formatting**:
- Maintain markdown structure and syntax
- Preserve code blocks with syntax highlighting
- Keep emphasis and styling
- Handle Linear-specific formatting

**Handle Rich Content**:
- Convert Linear mentions to GitHub mentions
- Transform embedded links
- Adjust media references
- Preserve document structure

## 3. GitHub Integration

Create issue in GitHub repository:

**Create Issue with Proper Structure**:
- Submit issue to GitHub via API or CLI
- Set title and body content
- Configure initial state
- Apply creation metadata

**Apply Labels**:
- Create labels matching Linear tags if needed
- Apply priority labels
- Add category labels (bug, feature, enhancement)
- Include sync tracking labels

**Assign Users**:
- Map Linear assignee to GitHub user
- Handle unmapped users gracefully
- Set multiple assignees if applicable
- Notify about assignment changes

**Set Milestones**:
- Map Linear project/cycle to GitHub milestone
- Create milestone if specified and missing
- Set due date from Linear target date
- Apply milestone-level metadata

**Manage Relationships**:
- Reference related GitHub issues
- Link to associated PRs if applicable
- Maintain parent-child relationships via references
- Create cross-links in issue body

## 4. Attachment Migration

Handle Linear attachments:

**Download Linear Attachments**:
- Enumerate all attachments in task
- Download each attachment using Linear API
- Validate file integrity
- Handle download errors gracefully

**Upload to GitHub**:
- Upload files using GitHub attachment API
- Generate stable GitHub URLs
- Maintain file names and types
- Handle upload size limits

**Update References**:
- Replace Linear attachment URLs with GitHub URLs
- Update inline image references
- Fix broken links
- Test attachment accessibility

**Maintain Accessibility**:
- Verify all attachments are accessible
- Check file permissions
- Ensure proper rendering
- Validate media types

## 5. Comment Import

Transfer comments to GitHub:

**Transfer Comments with Attribution**:
- Fetch all Linear comments
- Convert each comment to GitHub format
- Preserve original author information
- Maintain comment structure

**Preserve Timestamps**:
- Include original comment timestamps
- Maintain temporal ordering
- Note edit history
- Track activity timeline

**Maintain Context**:
- Preserve conversation threading
- Keep reply relationships
- Maintain discussion context
- Reference commented entities

**Handle Mentions**:
- Convert Linear user mentions to GitHub mentions
- Map user references using mapping table
- Handle unmapped users
- Preserve mention context

## 6. Cross-Reference Setup

Establish bidirectional links:

**Create Bidirectional Links**:
- Add GitHub issue URL to Linear task
- Add Linear task reference to GitHub issue
- Update both platforms simultaneously
- Verify link creation

**Update Linear Task**:
- Post comment with GitHub issue reference
- Update task description if configured
- Add custom field for GitHub URL
- Apply sync status label

**Maintain Sync Database**:
- Record Linear task ID to GitHub issue number mapping
- Store conversion metadata
- Track sync state
- Enable future sync operations

**Enable Navigation**:
- Provide clickable links in both directions
- Test cross-platform navigation
- Include contextual information
- Document relationship

## Advanced Features

**Rich Content Conversion**:
- Advanced markdown transformation
- Embed preservation
- Media optimization
- Format validation

**Attachment Handling**:
- Parallel upload for efficiency
- Automatic retry on failure
- Progress tracking
- Storage optimization

**Relationship Mapping**:
- Complex hierarchy preservation
- Dependency tracking
- Multi-level relationships
- Graph visualization

**User Mention Translation**:
- Intelligent user matching
- Fuzzy name matching
- Multiple mapping strategies
- Fallback handling

**Comprehensive Validation**:
- Content verification
- Link integrity checking
- Attachment validation
- Format compliance testing

## Relationship Management

**Preserve Parent-Child Relationships**:
- Document parent task in issue body
- Reference child tasks
- Maintain hierarchy structure
- Enable traversal

**Maintain Team Context**:
- Include team information in issue
- Apply team-specific labels
- Note team assignments
- Preserve organizational context

**Map Project Associations**:
- Link to GitHub projects if applicable
- Map Linear projects to GitHub milestones
- Preserve project metadata
- Maintain planning context

**Handle Dependencies**:
- Document blocking relationships
- Note dependent tasks
- Create issue references
- Maintain dependency graph

## Output

Successfully created GitHub issue including:
- Complete data migration with all content transferred
- Accurate field mappings preserving task information
- Preserved relationships including references and dependencies
- Comprehensive conversion report with detailed metrics
- Validation results and any warnings
- Navigation instructions for accessing created issue
- Bidirectional link confirmation

</detailed_sequence_steps>

</task>
