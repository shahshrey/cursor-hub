<task name="Task from PR">

<task_objective>
Create Linear tasks from GitHub pull requests with intelligent content extraction and task sizing. Extract comprehensive PR data, parse description structure, identify key components, analyze changes, and generate properly sized Linear tasks with team assignments. The output will be successfully created Linear tasks with comprehensive PR context, accurate sizing estimates, proper team assignments, and complete bidirectional linking.
</task_objective>

<how_to_ask_followup_question>
<question>How would you like to create Linear tasks from PRs?</question>
<options>["Single PR with manual team assignment", "Single PR with automatic team detection", "Batch process multiple PRs", "Auto-create with size estimation"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Task from PR - Detailed Sequence of Steps

## Prerequisites and Context

**Available Tools**: Read, Write, Edit, Bash

**Argument Options**: [pr-number] | --team | --estimate | --batch-process | --auto-create

**Model**: sonnet

## Current PR Environment

- Repository: !`gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "No repo context"`
- PR status: Based on $ARGUMENTS PR number or batch processing criteria
- Linear teams: Available teams for task assignment
- User mappings: GitHub username to Linear user correspondence

## 1. PR Analysis

Extract comprehensive PR data:

- Fetch complete PR metadata including title, description, labels, reviewers
- Parse PR description structure to identify sections and formatting
- Identify key components such as objectives, technical details, requirements
- Analyze code changes including file count, lines changed, complexity indicators

## 2. Content Extraction

Parse and structure PR content:

- Extract structured sections from PR description (e.g., Description, Testing, Notes)
- Parse checklists and todo items from PR body
- Identify technical details and implementation notes
- Capture acceptance criteria and testing requirements

## 3. Intelligent Sizing

Estimate task complexity and size:

- Analyze code change metrics (files changed, additions, deletions)
- Evaluate file count and scope of modifications
- Consider review comment count and discussion complexity
- Assess testing requirements and validation needs
- Apply sizing algorithm to determine task points or size estimate

## 4. Task Construction

Build Linear task with proper formatting:

- Construct task title from PR title with appropriate context
- Format task description preserving PR structure and sections
- Maintain references to original PR with bidirectional links
- Structure content with proper markdown formatting
- Include code snippets and technical details where relevant

## 5. Team Assignment

Determine appropriate Linear team:

- Map to appropriate Linear team based on repository or codebase area
- Assign based on code areas touched by PR (e.g., frontend, backend, infrastructure)
- Set task priorities inferred from PR labels (e.g., urgent, bug, enhancement)
- Consider assignee mapping from GitHub to Linear users

## 6. Validation & Creation

Ensure quality and create task:

- Check for duplicate Linear tasks linked to the same PR
- Validate task structure and required fields
- Create task in Linear with all extracted metadata
- Establish bidirectional links between PR and Linear task
- Update PR with Linear task reference (comment or description)
- Confirm successful creation and provide task details

## Advanced Features

**Smart Content Parsing**:
- Automatic section detection in PR descriptions
- Checklist extraction and formatting
- Code block preservation
- Link and reference maintenance

**Automated Size Estimation**:
- Machine learning-based complexity analysis
- Historical PR-to-task size correlation
- Team-specific sizing calibration
- Confidence scoring for estimates

**Intelligent Team Mapping**:
- Repository to team mapping rules
- Code path analysis for team determination
- Label-based team routing
- Fallback to default team with notification

**Comprehensive Validation**:
- Duplicate detection across Linear workspace
- Required field validation
- Format and structure checks
- Link integrity verification

**Batch Processing**:
- Process multiple PRs in single operation
- Rate limit management for API calls
- Progress tracking and reporting
- Error handling with partial success reporting

## Quality Assurance

**Duplicate Detection**:
- Search for existing Linear tasks with same PR reference
- Check for similar task titles and descriptions
- Prevent redundant task creation

**Content Validation**:
- Ensure all required fields are populated
- Validate formatting and structure
- Check link and reference integrity

**Proper Formatting**:
- Preserve markdown formatting from PR
- Maintain code blocks and syntax highlighting
- Keep checklist and list structures

**Relationship Maintenance**:
- Establish PR to Linear task reference
- Update PR with Linear task link
- Maintain sync database for bidirectional tracking

**Comprehensive Error Handling**:
- Graceful failure with informative messages
- Rollback capability for partial failures
- Detailed error logging and reporting

## Output

Successfully created Linear tasks with:
- Comprehensive PR context including full description and metadata
- Accurate sizing estimates based on code complexity analysis
- Proper team assignments using intelligent routing
- Complete bidirectional linking between PR and Linear task
- Formatted content preserving structure and readability

</detailed_sequence_steps>

</task>
