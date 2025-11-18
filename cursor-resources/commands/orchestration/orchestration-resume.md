<task name="Orchestration Resume">

<task_objective>
Resume work on existing task orchestrations after session loss or context switch. The workflow scans for active orchestrations with non-completed tasks, loads complete context including task status, progress metrics, recent git activity, and working state, presents current state summary with in-progress tasks, blocked tasks, and next available tasks, and provides quick actions to continue work seamlessly with task details, file context, and dependency information immediately accessible.
</task_objective>

<detailed_sequence_steps>
# Orchestration Resume - Detailed Sequence of Steps

## 1. Parse Command Options

1. Determine resume mode from command:
   - No options: List all active orchestrations
   - `--latest`: Resume most recently active orchestration
   - `--date MM_DD_YYYY --project PROJECT_NAME`: Resume specific orchestration
   - `--all --summary`: Show summary of all active orchestrations
   - `--since friday`: Show orchestrations worked on since Friday
   - `--incomplete`: Only <50% complete orchestrations
   - `--nearly-done`: Only >80% complete orchestrations

2. Extract context options:
   - `--task TASK-003`: Show specific task context
   - `--show-files`: List files related to active tasks
   - `--deps`: Show dependency graph for active tasks
   - `--with-status`: Include full status report
   - `--commits N`: Show last N commits related to orchestration

3. Extract action options:
   - `--pickup TASK-XXX`: Directly start working on task
   - `--pickup-where-left-off`: Resume last in-progress task
   - `--save-state`: Save current working state before switching
   - `--handoff`: Generate detailed handoff notes

4. Set display mode:
   - List view: Show all active orchestrations
   - Detailed view: Show complete context for one orchestration
   - Interactive mode: Prompt for selection

## 2. Scan for Active Orchestrations

1. Scan `/task-orchestration/` directory recursively

2. For each orchestration found (`MM_DD_YYYY/project_name/`):
   - Load TASK-STATUS-TRACKER.yaml
   - Count tasks by status
   - Calculate completion percentage: (completed tasks / total tasks) × 100
   - Determine if active (has tasks not in completed status)

3. Apply filters based on options:
   - `--since DATE`: Only orchestrations with activity since date
   - `--incomplete`: Keep only if completion < 50%
   - `--nearly-done`: Keep only if completion > 80%

4. For each active orchestration, extract summary:
   - Orchestration name (date/project)
   - Start date (from first task or directory creation)
   - Days since start
   - Completion percentage
   - Count of active tasks (in_progress + qa + on_hold)
   - Current focus (titles of in_progress tasks)

5. Sort orchestrations by last activity (most recent first)

6. If no active orchestrations found:
   - Display message: "No active orchestrations found"
   - Suggest: `/orchestrate` to start new orchestration
   - Exit

## 3. Display List or Select Orchestration

1. If `--latest` flag:
   - Select most recently active orchestration (first in sorted list)
   - Skip to detailed resume (step 4)

2. If specific orchestration specified (`--date` and `--project`):
   - Find matching orchestration in list
   - If not found, display error and show available orchestrations
   - Skip to detailed resume (step 4)

3. If list mode (no specific target):
   - Format list of active orchestrations:
     ```
     Active Task Orchestrations
     ==========================
     
     1. 03_15_2024/authentication_system
        Started: 3 days ago | Progress: 65% | Active Tasks: 3
        └─ Focus: JWT implementation, OAuth integration
     
     2. 03_14_2024/payment_processing  
        Started: 4 days ago | Progress: 40% | Active Tasks: 2
        └─ Focus: Stripe webhooks, refund handling
     
     3. 03_12_2024/admin_dashboard
        Started: 1 week ago | Progress: 85% | Active Tasks: 1
        └─ Focus: Final testing and deployment
     ```
   - Display prompt: "Select orchestration to resume: [1-3] or use --date and --project"
   - If `--all --summary` flag, display list and exit without prompting
   - Wait for user input or exit

4. Validate selection exists and load selected orchestration

## 4. Load Complete Orchestration Context

1. Load all orchestration files for selected project:
   - EXECUTION-TRACKER.md: Overall progress, metrics, timeline
   - TASK-STATUS-TRACKER.yaml: Task statuses, history, assignments
   - MASTER-COORDINATION.md: Original plan, wave structure
   - TASK-DEPENDENCIES.yaml: Dependency graph
   - All active task files (not completed)

2. Extract current status summary:
   - Total tasks count
   - Tasks by status (completed, in_progress, qa, on_hold, todos)
   - Time elapsed (days since start)
   - Estimated remaining time (based on velocity)

3. Identify tasks in progress:
   - Load task files for in_progress tasks
   - Extract task ID, title, assigned agent, duration in progress
   - Determine what files each task is working on

4. Identify blocked tasks:
   - Load tasks in on_hold status
   - Extract blocking reasons or dependencies
   - Check if blockers are resolved but status not updated

5. Identify next available tasks:
   - Find tasks in todos with no unmet dependencies
   - Sort by priority
   - Extract estimates and required skills
   - Determine which files they will affect

6. Load last session information:
   - Check for saved state file (from --save-state)
   - Identify last worked on task
   - Load last commit timestamp
   - Extract what was planned next

## 5. Analyze Git Working State

1. Run `git status` to get current working directory state:
   - Modified files
   - Staged files
   - Untracked files
   - Current branch

2. Identify current branch and check if related to a task:
   - Parse branch name for task ID pattern
   - Cross-reference with active tasks

3. For each modified file:
   - Determine which active task it relates to
   - Check if it's expected for current task scope

4. Check for uncommitted changes:
   - Count modified files
   - Check if changes are staged
   - Determine if ready to commit

5. Query git log for recent activity:
   - Last N commits (from `--commits` option or default 5)
   - Filter commits referencing tasks in this orchestration
   - Extract commit messages and timestamps

6. Check git branches for this orchestration:
   - List feature branches related to tasks
   - Show merge status (merged / pending)
   - Identify branches ahead/behind main

7. Generate git state summary with recommendation:
   - If uncommitted changes: "Recommend: Commit current changes before switching tasks"
   - If clean: "Working directory clean, ready to start new task"
   - If ahead of remote: "Local commits not pushed"

## 6. Format Detailed Resume View

1. Generate header with orchestration name and date

2. Format current status summary section:
   ```
   ## Current Status Summary
   - Total Tasks: 24 (12 completed, 3 in progress, 2 on hold, 7 todos)
   - Time Elapsed: 3 days
   - Estimated Remaining: 2 days
   ```

3. Format tasks in progress table:
   ```
   ## Tasks In Progress
   ┌──────────┬────────────────────────────┬───────────────┬──────────────┐
   │ Task ID  │ Title                      │ Agent         │ Duration     │
   ├──────────┼────────────────────────────┼───────────────┼──────────────┤
   │ TASK-003 │ JWT token validation       │ dev-backend   │ 2.5h         │
   │ TASK-007 │ OAuth provider setup       │ dev-frontend  │ 1h           │
   │ TASK-011 │ Integration tests          │ test-dev      │ 30m          │
   └──────────┴────────────────────────────┴───────────────┴──────────────┘
   ```

4. Format blocked tasks section:
   ```
   ## Blocked Tasks (Require Attention)
   - TASK-005: User profile API - Blocked by TASK-003 (JWT validation)
   - TASK-009: OAuth callback handling - Waiting for provider credentials
   ```

5. Format next available tasks section:
   ```
   ## Next Available Tasks (Ready to Start)
   1. TASK-013: Password reset flow (4h, frontend)
      Files: src/auth/reset.tsx, src/api/auth.ts
      
   2. TASK-014: Session management (3h, backend)
      Files: src/services/session.ts, src/middleware/auth.ts
   ```

6. Format recent git activity section:
   ```
   ## Recent Git Activity
   - feature/jwt-auth: 2 commits behind, last commit 2h ago
   - feature/oauth-setup: clean, last commit 1h ago
   ```

7. Format git working state section (from step 5)

8. Format last session summary (if available):
   ```
   ## Last Session (2 hours ago)
   - Completed: TASK-002 (Database schema)
   - Started: TASK-003 (JWT validation)
   - Commits: 2 (feat: add user auth schema, test: auth unit tests)
   - Next planned: Continue TASK-003, then TASK-005
   ```

9. Add quick actions menu:
   ```
   ## Quick Actions
   [1] Show TASK-003 details (current focus)
   [2] Pick up TASK-013 (password reset)
   [3] View dependency graph
   [4] Show recent commits
   [5] Generate status report
   ```

## 7. Provide Task Context (if --task flag)

1. If `--task TASK-003` specified:
   - Load complete task file
   - Display full task description and requirements
   - Show implementation progress notes
   - List related files with their current git status
   - Show test requirements and current status
   - Display dependencies (what this depends on)
   - Display dependents (what depends on this)
   - Show status history

2. Format comprehensive task context view

## 8. Provide File Context (if --show-files flag)

1. If `--show-files` specified:
   - Build list of all files mentioned in active tasks
   - For each file:
     - Get last modified timestamp
     - Get current git status (modified, staged, untracked, clean)
     - List which tasks reference this file
   - Sort by last modified (most recent first)
   - Format as table with columns: File, Last Modified, Git Status, Referenced By

## 9. Provide Dependency Context (if --deps flag)

1. If `--deps` specified:
   - Load complete dependency graph
   - Filter to show only active tasks (not completed)
   - Generate dependency graph visualization (ASCII art)
   - Highlight critical path
   - Mark blocked tasks
   - Show ready-to-start tasks

## 10. Handle Direct Task Pickup (if --pickup flag)

1. If `--pickup TASK-013` specified:
   - Load task details
   - Display task description, requirements, files
   - Move task to in_progress status (call /task-move)
   - Check if feature branch needed
   - If branch needed and doesn't exist:
     - Suggest branch name: `feature/TASK-013-password-reset`
     - Offer to create branch
   - List files that will be modified
   - Display implementation notes and acceptance criteria
   - Set up environment for working on task

2. If `--pickup-where-left-off` specified:
   - Identify last task that was in progress
   - Load that task's context
   - Display resume point
   - Confirm user wants to continue this task

## 11. Support State Management

1. If `--save-state` specified:
   - Capture current context:
     - Current task in progress
     - Files modified
     - Git branch
     - Uncommitted changes summary
     - Next planned actions
   - Save to state file: `.orchestration-state/{orchestration_id}.yaml`
   - Display confirmation: "State saved"

2. When resuming, check for saved state file:
   - If exists, load and incorporate into resume context
   - Display last saved state information
   - Offer to restore exact context

## 12. Support Team Handoff (if --handoff flag)

1. If `--handoff` specified:
   - Generate detailed handoff document including:
     - Current orchestration status
     - Tasks in progress with details
     - What was completed recently
     - What's blocked and why
     - Next recommended tasks
     - Important context and decisions
     - Git state and uncommitted work
     - Environment setup notes
   - Format as comprehensive markdown document
   - Save to file: `HANDOFF-{timestamp}.md`
   - Display file location

## 13. Display Resume Information and Prompt for Action

1. Display formatted detailed resume view (from step 6)

2. If interactive mode:
   - Show quick actions menu
   - Wait for user to select action (1-5)
   - Execute selected action:
     - [1] Display detailed task information
     - [2] Move task to in_progress and show context
     - [3] Display dependency graph
     - [4] Show recent commits in detail
     - [5] Run `/task-report` command

3. If `--with-status` flag:
   - After resume display, run `/task-status` command
   - Show full status report

4. Display helpful next steps:
   ```
   Suggested next steps:
   - Continue TASK-003: /orchestration/resume --pickup TASK-003
   - Check full status: /task-status
   - View dependencies: /orchestration/resume --deps
   - Start new task: /task-move TASK-013 in_progress
   ```

5. Return success exit code

</detailed_sequence_steps>

</task>

