<task name="Issue to Linear Task">

<task_objective>
Convert individual GitHub issues to Linear tasks with comprehensive data preservation. Execute precise conversion of GitHub issues to Linear tasks with complete field mapping, content migration including comments and attachments, bidirectional reference management, and comprehensive validation. The output will be successfully converted Linear tasks with complete data preservation, accurate field mappings, bidirectional references, and comprehensive conversion summary.
</task_objective>

<how_to_ask_followup_question>
<question>How would you like to convert this GitHub issue?</question>
<options>["Convert with automatic team assignment", "Convert and specify Linear team", "Convert and close GitHub issue", "Convert without importing comments", "Full conversion with all data"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Issue to Linear Task - Detailed Sequence of Steps

## Prerequisites and Context

**Available Tools**: Read, Write, Edit, Bash

**Argument Options**: [issue-number] | --team | --project | --close-github | --skip-comments

**Model**: sonnet

## Current Conversion Context

- Repository: !`gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "No repo context"`
- Issue details: Based on $ARGUMENTS issue number or selection criteria
- Linear teams: Available Linear teams and project assignments
- User mappings: @user-mappings.json or GitHub-Linear user correspondence

## 1. Issue Analysis

Fetch and analyze complete issue data:

**Fetch Complete Issue Data**:
- Retrieve issue using GitHub CLI or API with issue number from $ARGUMENTS
- Fetch all metadata (title, body, labels, assignees, milestone, state)
- Extract timestamps (created, updated, closed dates)
- Gather reaction counts and engagement metrics

**Extract Metadata**:
- Parse issue labels and categories
- Identify assignees and participants
- Extract milestone and project associations
- Capture issue state (open, closed) and closure reason

**Analyze Content Structure**:
- Identify sections in issue body (description, steps to reproduce, expected behavior)
- Parse checklists and task lists
- Extract code blocks and technical details
- Identify links and references to other issues or PRs

**Infer Priorities**:
- Analyze labels for priority indicators (urgent, high priority, critical)
- Consider issue age and activity level
- Evaluate comment count and discussion intensity
- Apply team-specific priority mapping rules

## 2. Data Transformation

Transform GitHub data to Linear format:

**Map Fields Accurately**:
- Convert GitHub title to Linear task title
- Transform issue body to Linear description format
- Map GitHub labels to Linear labels or tags
- Convert assignees using user mapping table

**Convert Formats**:
- Transform GitHub markdown to Linear markdown
- Convert emoji reactions to appropriate format
- Adjust code block syntax if needed
- Handle GitHub-specific syntax (task lists, mentions)

**Preserve Relationships**:
- Maintain references to related issues
- Preserve PR associations
- Keep parent-child issue relationships
- Track linked discussions

**Enhance Descriptions**:
- Add metadata section with GitHub issue reference
- Include original issue URL for navigation
- Append GitHub-specific information (issue number, repository)
- Preserve original timestamps and author information

## 3. Linear Integration

Create task in Linear workspace:

**Create Task with Proper Formatting**:
- Construct Linear task with formatted description
- Apply markdown formatting for readability
- Structure content with headers and sections
- Include code blocks and technical details

**Assign Team/Project**:
- Assign to Linear team specified in $ARGUMENTS or determined automatically
- Set project association if milestone mapping exists
- Configure team-specific defaults
- Apply workspace-level settings

**Set Priorities**:
- Map inferred priority to Linear priority levels
- Apply urgency indicators from labels
- Consider SLA and deadline requirements
- Set due dates if milestone has target date

**Manage Labels**:
- Create or assign Linear labels matching GitHub labels
- Apply standard label mappings (bug, feature, enhancement)
- Add sync-specific labels for tracking
- Maintain label consistency across platform

## 4. Content Migration

Import related content:

**Import Comments with Attribution**:
- Fetch all issue comments from GitHub
- Convert each comment to Linear format
- Preserve original author attribution
- Maintain comment timestamps and ordering

**Handle Attachments**:
- Identify images and files in issue body and comments
- Download attachments from GitHub
- Upload to Linear storage
- Update references in migrated content

**Preserve Formatting**:
- Maintain markdown formatting
- Preserve code syntax highlighting
- Keep blockquotes and emphasis
- Handle special characters correctly

**Maintain Threading**:
- Preserve comment order and context
- Maintain reply relationships if supported
- Keep conversation flow intact
- Note discussion participants

## 5. Reference Management

Establish cross-platform links:

**Create Bidirectional Links**:
- Add Linear task URL to GitHub issue (comment or label)
- Add GitHub issue URL to Linear task description
- Update reference mapping database
- Ensure both platforms reference each other

**Update Sync Database**:
- Record GitHub issue number to Linear task ID mapping
- Store conversion metadata (timestamp, user, settings)
- Track conversion status
- Enable future sync operations

**Maintain Cross-References**:
- Preserve links to related GitHub issues
- Maintain PR associations
- Keep external references intact
- Update internal linking systems

**Enable Navigation**:
- Provide clickable links in both directions
- Include context for navigation (issue/task number, title)
- Test link functionality
- Document navigation paths

## 6. Validation & Confirmation

Verify conversion accuracy:

**Verify Conversion Accuracy**:
- Check all fields were mapped correctly
- Validate content preservation
- Confirm attachments were migrated
- Verify comment import if enabled

**Confirm Field Mappings**:
- Review title mapping
- Validate description content
- Check label assignments
- Verify assignee mappings

**Validate Relationships**:
- Confirm cross-references are working
- Verify bidirectional links
- Check related issue connections
- Validate project/milestone associations

**Provide Preview**:
- Display summary of converted task
- Show before/after comparison
- Highlight any mapping issues or warnings
- Request confirmation if needed

## Advanced Features

**Smart Priority Inference**:
- ML-based priority prediction from issue content
- Historical pattern analysis
- Team-specific priority rules
- Confidence scoring for suggestions

**Intelligent User Mapping**:
- Email-based automatic mapping
- Username similarity matching
- Manual mapping with persistence
- Unmapped user handling strategies

**Attachment Handling**:
- Automatic download and upload
- Image optimization for performance
- File type validation
- Storage quota management

**Comment Threading**:
- Preserve reply relationships
- Maintain conversation context
- Thread visualization
- Discussion summary generation

**Comprehensive Validation**:
- Multi-stage validation checks
- Data integrity verification
- Format compliance testing
- Link functionality validation

## Data Fidelity

**Preserve Original Formatting**:
- Maintain exact markdown structure
- Preserve whitespace and indentation
- Keep code block formatting
- Retain special characters

**Maintain All Metadata**:
- Preserve all timestamps
- Keep author information
- Maintain reaction data
- Store historical changes

**Keep Comment Attribution**:
- Preserve original comment authors
- Maintain commenter roles
- Keep comment edit history
- Track comment reactions

**Ensure Relationship Integrity**:
- Validate all cross-references
- Test bidirectional navigation
- Verify related item connections
- Maintain data consistency

## Output

Successfully converted Linear task with:
- Complete data preservation including all issue content
- Accurate field mappings with proper transformations
- Bidirectional references enabling navigation
- Comprehensive conversion summary with statistics and validation results
- Detailed report of any warnings or issues encountered
- Instructions for accessing and managing converted task

</detailed_sequence_steps>

</task>
