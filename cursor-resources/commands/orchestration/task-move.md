<task name="Task Move">

<task_objective>
Move tasks between status folders following the task management protocol. The workflow validates status transitions against allowed state changes, enforces protocol rules (one task per agent in progress, dependency checks), physically moves task files between status directories, updates TASK-STATUS-TRACKER.yaml with status history and timestamps, updates EXECUTION-TRACKER.md metrics, and maintains complete audit trail with transition reasons.
</task_objective>

<detailed_sequence_steps>
# Task Move - Detailed Sequence of Steps

## 1. Parse Command and Identify Tasks

1. Extract task ID(s) from command:
   - Single task: `TASK-001`
   - Multiple tasks: `TASK-001,TASK-002,TASK-003`
   - Pattern: `TASK-00*` (glob pattern matching)
   - Filter: `--filter "priority:high status:todos"` (search and select tasks)

2. Extract target status from command:
   - Target status must be one of: `todos`, `in_progress`, `on_hold`, `qa`, `completed`

3. Extract reason/notes from command (optional third argument or after status):
   - Example: `"Implementation complete, ready for testing"`
   - Example: `"Waiting for TASK-001 API completion"`

4. Load additional flags:
   - `--force`: Bypass validation checks
   - `--dry-run`: Show what would happen without executing
   - `--assign AGENT_NAME`: Assign to specific agent
   - `--estimate TIME`: Update time estimate
   - `--auto-progress`: Auto-move when conditions met

5. Validate task IDs exist by searching across all status folders in orchestration

## 2. Load Current Task State

1. For each identified task:
   - Locate task file in current status folder
   - Read task file to extract metadata:
     - Task ID, title, description
     - Current status
     - Assigned agent
     - Dependencies (depends_on list)
     - Blocks (list of tasks this blocks)
     - Time estimate
     - Status history

2. Load TASK-STATUS-TRACKER.yaml to get:
   - Current status confirmation
   - Status history
   - Agent assignments
   - Timestamps

3. Load TASK-DEPENDENCIES.yaml or parse dependencies from all task files to understand:
   - Which tasks this task depends on
   - Which tasks depend on this task (blocked by this)
   - Dependency status (are dependencies met?)

4. Determine current status folder path

## 3. Validate Status Transition

1. Check if transition is allowed based on status transition map:
   ```
   Valid transitions:
   - todos → in_progress ✓
   - todos → on_hold ✓
   - in_progress → qa ✓
   - in_progress → on_hold ✓
   - qa → completed ✓
   - qa → in_progress ✓ (failed QA)
   - on_hold → todos ✓ (unblocked)
   - on_hold → in_progress ✓ (resume)
   
   Invalid transitions (examples):
   - completed → anything ✗ (terminal state)
   - todos → qa ✗ (must go through in_progress)
   - in_progress → completed ✗ (must go through qa)
   ```

2. If transition is invalid:
   - Display error: "Cannot move from '{current_status}' to '{target_status}'"
   - Show valid transitions from current status
   - Return error and exit

3. If `--force` flag provided:
   - Skip transition validation
   - Log that validation was bypassed
   - Proceed with move

## 4. Validate Protocol Rules

1. If moving to `in_progress` status:
   - Check if agent already has a task in progress
   - If yes and not `--force`:
     - Display warning: "Agent {agent} already has TASK-XXX in progress"
     - Prompt: "Continue? (y/n)"
     - If no, abort move

2. Check dependency requirements:
   - Load dependencies from task metadata
   - For each dependency, check its status
   - If moving to `in_progress` and dependencies not in `completed`:
     - Display warning: "TASK-XXX depends on TASK-YYY (currently {status})"
     - Prompt: "Moving to on_hold instead? (y/n)"
     - If yes, change target status to `on_hold`
     - If no and not `--force`, abort move

3. If moving to `on_hold`:
   - Require reason if not provided
   - Prompt: "Reason for blocking:"
   - Validate reason is not empty

4. If moving from `on_hold` back to `todos` or `in_progress`:
   - Require reason explaining resolution
   - Example: "Dependencies resolved", "Blocker removed"

5. If `--dry-run` flag:
   - Display all validation results
   - Show: "Would move TASK-XXX from {current} to {target}"
   - Show any warnings or validation issues
   - Exit without making changes

## 5. Update Task File

1. Read current task file content

2. Update status field in task frontmatter or metadata section:
   - Change `status: in_progress` to `status: qa`

3. If `--assign AGENT_NAME` flag provided:
   - Update assigned agent field

4. If `--estimate TIME` flag provided:
   - Update time estimate field

5. Add status transition entry to task file history section:
   ```markdown
   ## Status History
   - 2024-03-15T14:30:00Z: todos → in_progress (Agent: dev-frontend)
   - 2024-03-16T18:00:00Z: in_progress → qa (Reason: Implementation complete, ready for testing)
   ```

6. If moving to `in_progress`, record start timestamp

7. If moving to `completed`, record end timestamp and calculate total duration

8. Write updated content back to task file in current location (will be moved in next step)

## 6. Move Task File Physically

1. Determine source path:
   - Current: `/task-orchestration/{date}/{project}/tasks/{current_status}/TASK-XXX-{name}.md`

2. Determine destination path:
   - Target: `/task-orchestration/{date}/{project}/tasks/{target_status}/TASK-XXX-{name}.md`

3. Ensure destination directory exists (create if necessary)

4. Move file from source to destination using filesystem move operation

5. Verify file was moved successfully (exists at destination, removed from source)

6. If move fails:
   - Display error message
   - Rollback any changes made to task file
   - Exit with error status

## 7. Update TASK-STATUS-TRACKER.yaml

1. Read current TASK-STATUS-TRACKER.yaml file

2. Update status_history section:
   ```yaml
   status_history:
     TASK-001:
       - timestamp: "2024-03-15T10:00:00Z"
         status: "todos"
         agent: null
       - timestamp: "2024-03-15T14:30:00Z"
         status: "in_progress"
         agent: "dev-frontend"
         reason: "Started implementation"
       - timestamp: "2024-03-16T18:00:00Z"
         status: "qa"
         agent: "dev-frontend"
         reason: "Implementation complete, ready for testing"
   ```

3. Update current_status_summary section:
   ```yaml
   current_status_summary:
     todos: [TASK-002, TASK-004]
     in_progress: [TASK-003]  # removed TASK-001
     qa: [TASK-001, TASK-005]  # added TASK-001
     on_hold: []
     completed: []
   ```

4. Update agent_assignments if agent assigned:
   ```yaml
   agent_assignments:
     dev-frontend:
       current: "TASK-003"  # updated from TASK-001
       completed: ["TASK-001"]  # added when TASK-001 completes
   ```

5. Update task_metadata for this task:
   ```yaml
   task_metadata:
     TASK-001:
       title: "Implement JWT authentication"
       status: "qa"  # updated
       assigned_agent: "dev-frontend"
       last_updated: "2024-03-16T18:00:00Z"
   ```

6. Write updated YAML back to file with proper formatting

## 8. Update EXECUTION-TRACKER.md

1. Read EXECUTION-TRACKER.md file

2. Update overall progress metrics section:
   - Increment completed count if moved to completed
   - Update in_progress count
   - Update qa count
   - Recalculate completion percentage

3. Add entry to status transition log section:
   ```markdown
   ### Recent Status Changes
   - 2024-03-16 18:00 - TASK-001: in_progress → qa (dev-frontend)
     Reason: Implementation complete, ready for testing
   ```

4. If moved to `on_hold`, add entry to blockers log:
   ```markdown
   ### Active Blockers
   - TASK-004: Waiting for TASK-001 API completion (Blocked since: 2024-03-16)
   ```

5. If unblocked (moved from `on_hold`), remove from blockers log

6. Update velocity calculations if task completed:
   - Increment tasks completed today
   - Recalculate average velocity

7. Write updated EXECUTION-TRACKER.md back to file

## 9. Handle Bulk Operations

1. If multiple tasks specified (`TASK-001,TASK-002,TASK-003`):
   - For each task, execute steps 2-8 sequentially
   - Collect results (success/failure) for each task
   - Display summary at end:
     ```
     Moved 3 tasks to in_progress:
     ✓ TASK-001: todos → in_progress
     ✓ TASK-002: todos → in_progress
     ✗ TASK-003: Failed - dependencies not met
     ```

2. If any task fails, continue with remaining tasks (don't abort entire operation)

3. If all tasks fail, return error status

## 10. Integration and Notifications

1. If `--auto-commit` flag (typically from automated workflows):
   - After successful move, trigger `/orchestration/commit` if moving to qa or completed

2. Update orchestration audit log with move operation:
   - Task ID, from status, to status, agent, timestamp, reason

3. If notification system configured:
   - Trigger notifications for significant transitions (e.g., task completed, task blocked)

4. If moving to `completed`:
   - Check if any blocked tasks now have all dependencies met
   - Display message: "TASK-XXX is now unblocked and ready to start"

## 11. Display Results

1. Show success message:
   ```
   ✓ Moved TASK-001 from in_progress to qa
   Reason: Implementation complete, ready for testing
   ```

2. If warnings occurred, display them:
   ```
   ⚠ Warning: dev-frontend now has 2 tasks in progress
   ```

3. Suggest next actions:
   ```
   Next steps:
   - Review TASK-001 in QA
   - Commit changes: /orchestration/commit TASK-001
   - Check status: /task-status --task TASK-001
   ```

4. Return success exit code

</detailed_sequence_steps>

</task>

