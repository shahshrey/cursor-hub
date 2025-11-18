<task name="Orchestration Log">

<task_objective>
Log work from orchestrated tasks to external project management tools like Linear, Obsidian, Jira, or GitHub Issues. The workflow detects available destination connections from task metadata and MCP integrations, formats work log entries with task details, time spent, progress notes, and code statistics, presents user with destination choice when multiple options exist, and creates or appends structured log entries to selected destinations with bidirectional links and metadata tagging.
</task_objective>

<detailed_sequence_steps>
# Orchestration Log - Detailed Sequence of Steps

## 1. Identify Task to Log

1. Determine target task based on command input:
   - No argument: Find task currently in progress for active agent
   - `TASK-003` specified: Use specified task ID
   - `--eod`: All tasks worked on today
   - `--daily-summary`: Summary of all today's tasks
   - `--weekly`: All tasks from current week

2. Load task metadata from task file:
   - Task ID and title
   - Current status
   - Time spent (from status history timestamps)
   - Implementation notes and progress details
   - Assigned agent
   - Dependencies and relationships

3. Load task status history to calculate:
   - Time in each status
   - Total time spent
   - Status transitions

4. If multiple tasks for summary mode, collect all and aggregate data

## 2. Detect Available Destinations

1. Check for Linear connection:
   - Search task file for Linear issue references (ENG-1234 format)
   - Check git branch name for Linear issue ID pattern
   - Check PR/MR title for Linear issue reference
   - Query Linear MCP if available to verify issue exists

2. Check for Obsidian connection:
   - Verify Obsidian MCP server is connected
   - Check if daily note exists for today
   - Search for project note matching orchestration name
   - Check task file for Obsidian note links

3. Check for GitHub connection:
   - Search task file for GitHub issue references (#123)
   - Check if current repository has issues enabled
   - Verify GitHub MCP or API access

4. Check for Jira connection:
   - Search task file for Jira ticket references (PROJ-123)
   - Verify Jira MCP or API credentials

5. Build list of available destinations with confidence scores:
   - High confidence: Explicit reference found in task
   - Medium confidence: Pattern match or indirect reference
   - Low confidence: Connection available but no reference

## 3. Determine Destination Selection

1. If `--obsidian-daily` flag specified:
   - Select Obsidian daily note as destination
   - Skip destination prompt

2. If `--obsidian-project "Project Name"` flag specified:
   - Select Obsidian project note as destination
   - Create note if doesn't exist

3. If `--linear-issue ENG-1234` flag specified:
   - Select specific Linear issue as destination

4. If `--multi` flag specified:
   - Show multi-select interface for choosing multiple destinations

5. If `--choose` flag specified or multiple high-confidence destinations found:
   - Display destination selection prompt:
     ```
     Where would you like to log this work?
     
     Available destinations:
     1. Linear (ENG-1234 detected)
     2. Obsidian (Daily Note)
     3. Obsidian (Project: Authentication)
     4. GitHub Issue (#123)
     5. None - Skip logging
     
     Choose destination [1-5]:
     ```

6. If single high-confidence destination found:
   - Suggest destination
   - Prompt: "Use suggestion? [Y/n/choose different]"

7. If no destinations found:
   - Prompt user to choose from:
     - Create Obsidian daily note entry
     - Create Obsidian project note
     - Search for Linear issue
     - Create GitHub issue
     - Skip logging

## 4. Gather Work Log Data

1. Collect task completion details:
   - What was accomplished (from implementation notes)
   - Status transitions (from status history)
   - Time breakdown (time in each status)
   - Progress percentage or completion indicators

2. Gather code statistics if available:
   - Files modified count (from git or task metadata)
   - Lines added/removed (from git diff)
   - Test coverage changes
   - Commit hashes and messages

3. Extract related task references:
   - Tasks this task depends on
   - Tasks blocked by this task
   - Tasks completed next (for "Next Actions")

4. Get commit information if task has git_tracking:
   - Commit hashes
   - Commit messages
   - Commit timestamps
   - PR/MR references

5. If `--interactive` mode:
   - Prompt for custom notes: "Add custom notes? [y/N]:"
   - Allow user to add additional context

## 5. Format Work Log Entry

1. Determine format based on destination:
   - Obsidian: Markdown with specific structure
   - Linear: Formatted comment
   - GitHub: Issue comment markdown
   - Jira: Jira-flavored markdown

2. For Obsidian daily note format:
   ```markdown
   ## Work Log - {time}
   
   ### TASK-003: JWT Implementation ✅
   
   **Time Spent**: 4.5 hours (10:00 - 14:30)
   **Status**: Completed → QA
   
   **What I did:**
   - Implemented JWT token validation middleware
   - Added refresh token logic  
   - Created comprehensive test suite
   - Fixed edge case with token expiration
   
   **Code Stats:**
   - Files: 8 modified
   - Lines: +245 -23
   - Coverage: 95%
   
   **Related Tasks:**
   - Next: [[TASK-005]] - User Profile API
   - Blocked: [[TASK-007]] - Waiting for this
   
   **Commits:**
   - `abc123`: feat(auth): implement JWT validation
   - `def456`: test(auth): add validation tests
   
   #tasks/completed #project/authentication
   ```

3. For Obsidian project note format:
   ```markdown
   ## 📋 Task: TASK-003 - JWT Implementation
   
   ### Summary
   - **Status**: 🟢 Completed  
   - **Duration**: 4h 30m
   - **Date**: 2024-03-15
   
   ### Progress Details
   - [x] Token structure design
   - [x] Validation middleware
   - [x] Refresh mechanism
   - [x] Test coverage
   
   ### Technical Notes
   - Used RS256 algorithm for signing
   - Tokens expire after 15 minutes
   - Refresh tokens last 7 days
   
   ### Links
   - Linear: [ENG-1234](linear://issue/ENG-1234)
   - PR: [#456](github.com/...)
   - Docs: [[JWT Implementation Guide]]
   
   ### Next Actions
   - [ ] Code review feedback
   - [ ] Deploy to staging
   - [ ] Update API documentation
   
   ---
   *Logged via Task Orchestration at 15:30*
   ```

4. For Linear format:
   - Create work log comment with task details, time tracking, progress updates
   - Include code statistics and commit references
   - Add labels or tags if configured

5. Include custom notes from interactive mode if provided

## 6. Create Log Entry in Obsidian

1. If destination is Obsidian daily note:
   - Determine daily note path from Obsidian MCP configuration
   - Check if today's daily note exists
   - If exists, read current content
   - Find insertion point (append to end or specific section based on template config)
   - Insert formatted work log entry
   - Write updated content back to daily note file
   - Add backlinks to task ID using [[TASK-003]] format

2. If destination is Obsidian project note:
   - Determine project note path (from flag or config)
   - Check if project note exists
   - If doesn't exist and `create_if_missing: true`, create new note with template
   - Read current content
   - Find section specified in config (`## Task Progress` or append to end)
   - Insert formatted work log entry
   - Write updated content
   - Create bidirectional links between task and project note

3. Apply Obsidian template configuration from `obsidian_template`:
   - Use configured heading format
   - Include/exclude stats based on `include_stats` setting
   - Add tags based on `add_tags` setting
   - Create task links based on `link_tasks` setting

## 7. Create Log Entry in Linear

1. If destination is Linear issue:
   - Extract Linear issue ID from task metadata or user input
   - Format work log as Linear comment using Linear MCP or API
   - Apply Linear template configuration from `linear_template`:
     - Include time tracking data if `include_time: true`
     - Update issue status if `update_status: true` and task completed
     - Add labels from `add_labels` config
   - Create comment on Linear issue via MCP/API call
   - Capture comment ID for reference

2. Update TASK-STATUS-TRACKER.yaml with Linear reference:
   ```yaml
   external_tracking:
     TASK-003:
       linear:
         issue_id: "ENG-1234"
         logged_at: "2024-03-15T15:30:00Z"
         comment_id: "comment-abc123"
   ```

## 8. Create Log Entry in GitHub

1. If destination is GitHub issue:
   - Determine issue number from task metadata or create new issue
   - Format work log as GitHub issue comment (markdown)
   - Include task details, commits, code changes
   - Create comment via GitHub API or MCP
   - Add labels (e.g., "from-orchestration")
   - Capture comment URL

## 9. Handle Multiple Destinations (--multi flag)

1. For each selected destination:
   - Format work log appropriately for that destination
   - Create log entry using destination-specific logic (steps 6-8)
   - Capture success/failure status

2. Display progress:
   ```
   Logging to 2 destinations...
   ✓ Linear: Comment added to ENG-1234
   ✓ Obsidian: Added to daily note
   ```

3. Update task tracking with all destination references

## 10. Generate Summary Logs (for batch operations)

1. If `--daily-summary` mode:
   - Collect all tasks worked on today
   - Calculate total time spent
   - Group tasks by status (completed, in progress)
   - Format daily summary:
     ```markdown
     ## Work Summary - 2024-03-15
     
     ### Completed Tasks
     - [[TASK-003]]: JWT Implementation (4.5h) ✅
     - [[TASK-008]]: Login UI Updates (2h) ✅
     
     ### In Progress  
     - [[TASK-005]]: User Profile API (1.5h) 🔄
     
     ### Total Time: 8 hours
     
     ### Key Achievements
     - Authentication system core complete
     - All tests passing
     - Ready for code review
     
     ### Tomorrow's Focus
     - Complete user profile endpoints
     - Start OAuth integration
     ```
   - Log summary to selected destination (typically Obsidian daily note)

2. If `--weekly` or `--sprint-review` mode:
   - Aggregate data for specified time period
   - Calculate summary metrics (tasks completed, time spent, velocity)
   - Format sprint review report
   - Log to selected destination (Obsidian weekly note, Linear cycle comment)

3. If `--eod` (end of day) shortcut:
   - Generate end-of-day summary
   - Prompt for destination
   - Create summary log entry

## 11. Confirm and Report

1. Display success message for each destination:
   - "✓ Linear: Comment added to ENG-1234"
   - "✓ Obsidian: Added to daily note"

2. If logging failed for any destination:
   - Display error message
   - Offer retry option
   - Save failed log entry to local file for manual retry

3. If `--interactive` mode, offer to view logs:
   - Prompt: "View logs? [y/N]:"
   - If yes, open Obsidian note or Linear issue in browser

4. Update orchestration audit log with logging operation

5. Return success/failure status

</detailed_sequence_steps>

</task>

