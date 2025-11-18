<task name="Orchestration Remove">

<task_objective>
Safely remove a task from the orchestration system, updating all references and dependencies. The workflow analyzes removal impact by checking dependencies and references across all orchestration files and git history, updates dependent tasks by removing references and adjusting blockers, updates all tracking files (TASK-STATUS-TRACKER.yaml, EXECUTION-TRACKER.md, MASTER-COORDINATION.md), moves task file to archive or deletes permanently based on options, and maintains complete audit trail with removal reason and affected items.
</task_objective>

<detailed_sequence_steps>
# Orchestration Remove - Detailed Sequence of Steps

## 1. Parse Command and Identify Tasks

1. Extract task ID(s) from command:
   - Single task: `TASK-003`
   - Multiple tasks: `TASK-003,TASK-005,TASK-008`
   - Pattern match: `--pattern "oauth-*"`

2. Extract options and flags:
   - `--force`: Skip confirmation prompts
   - `--dry-run`: Show impact without making changes
   - `--archive`: Move to archive instead of delete
   - `--hard`: Permanently delete without archive
   - `--cascade`: Also remove dependent tasks
   - `--replace-with TASK-XXX`: Transfer dependencies to another task
   - `--reason "description"`: Removal reason

3. Validate task ID format and existence

4. If multiple tasks specified, determine removal order (respect dependencies)

## 2. Locate and Load Task Data

1. For each task to remove:
   - Search across all status folders to find task file
   - If not found, check archive location
   - If still not found, display error and exit

2. Load task file and extract:
   - Task ID and title
   - Current status
   - Description and implementation notes
   - Dependencies (depends_on list)
   - Blocks (list of tasks depending on this)
   - Assigned agent
   - Time spent
   - Any other metadata

3. Load TASK-STATUS-TRACKER.yaml to get:
   - Status history
   - Git tracking information (commits associated)
   - Timestamps

4. Store current file location path for later deletion

## 3. Analyze Removal Impact

1. Find tasks that depend on this task:
   - Search all task files for references to this task ID in depends_on or blocks fields
   - Load each dependent task's metadata
   - Build list of tasks that will be affected

2. Search coordination documents for references:
   - Scan MASTER-COORDINATION.md for task mentions
   - Check EXECUTION-TRACKER.md for active task references
   - Parse TASK-DEPENDENCIES.yaml for dependency edges
   - Note line numbers where task is referenced

3. Check git history for commits related to this task:
   - Query git log for commits mentioning task ID
   - Check for branch names containing task ID
   - Identify any uncommitted changes related to task

4. Determine removal safety:
   - Safe: No dependencies, no commits, todos status
   - Warning: Has dependencies or blocks other tasks
   - Risky: In completed status or has commits
   - Critical: On critical path or blocking many tasks

5. Calculate impact metrics:
   - Number of dependent tasks affected
   - Number of references to update
   - Number of commits to note
   - Estimated time impact on project

## 4. Generate and Display Impact Analysis

1. Format impact analysis report:
   ```
   Task Removal Impact Analysis: TASK-003
   ======================================
   
   Task Details:
   - Title: JWT token validation
   - Status: in_progress
   - Location: /tasks/in_progress/TASK-003-jwt-validation.md
   
   Dependencies:
   - Blocks: TASK-005 (User profile API)
   - Blocks: TASK-007 (Session management)
   - Depends on: None
   
   References Found:
   - MASTER-COORDINATION.md: Line 45 (Wave 1 tasks)
   - EXECUTION-TRACKER.md: Active task count
   - TASK-005: Lists TASK-003 as dependency
   - TASK-007: Lists TASK-003 as dependency
   
   Git History:
   - 2 commits reference this task
   - Branch: feature/jwt-auth
   
   Warning: This task has downstream dependencies!
   ```

2. Display severity warnings:
   - ERROR: Task on critical path (if applicable)
   - Warning: Task in completed status (work was done)
   - Warning: Task has commits (code exists)
   - Warning: Multiple tasks depend on this

3. If `--dry-run` flag:
   - Display complete impact analysis
   - Show what would be updated/removed
   - Exit without making changes

4. If not `--force` flag:
   - Prompt for confirmation: "Proceed with removal? [y/N]"
   - If user enters 'N' or anything other than 'y', abort

## 5. Handle Special Cases

1. If task has associated commits:
   - Display commit list with hashes and messages
   - Present options:
     - [1] Keep commits, remove task only (recommended)
     - [2] Add removal note to commit messages
     - [3] Cancel removal
   - Wait for user choice

2. If task is in qa or completed status:
   - Display warning: "This task has completed work"
   - Suggest alternatives:
     - [1] Archive task instead of removing
     - [2] Document removal reason
     - [3] Consider reverting commits
   - If user chooses archive, set `--archive` flag

3. If task is on critical path (detected in step 3):
   - Display error: "Task is on critical path"
   - Show impact on project timeline
   - Require `--force-critical` flag to proceed
   - If flag not present, abort removal

4. If `--cascade` flag and task has dependents:
   - Display: "This will also remove dependent tasks: [list]"
   - Confirm cascade removal
   - Add dependent tasks to removal list

## 6. Update Dependent Tasks

1. For each task that depends on this task:
   - Load task file
   - Remove this task ID from depends_on list
   - Check if task now has no blockers (all dependencies removed or met)
   - If now ready to start, update status note

2. For each task file updated:
   - Add note to task history: "TASK-003 dependency removed (task deleted)"
   - If task was on_hold due to this dependency, suggest status change
   - Write updated task file

3. Display progress:
   ```
   Updating dependent tasks:
   - TASK-005: Removing dependency on TASK-003
     New status: Ready to start (no blockers)
   - TASK-007: Removing dependency on TASK-003
     Warning: Still blocked by TASK-009
   ```

## 7. Handle Replacement Task (if --replace-with flag)

1. If `--replace-with TASK-015` specified:
   - Validate replacement task exists
   - Load replacement task metadata

2. For each dependent task:
   - Replace TASK-003 in depends_on with TASK-015
   - Add note: "Dependency transferred from TASK-003 to TASK-015"
   - Update blocks field in replacement task

3. Transfer any other references:
   - In coordination documents, replace task references
   - Update dependency graph

4. Display:
   ```
   Transferring dependencies to TASK-015:
   - Dependencies transferred: 2
   - References updated: 4
   ```

## 8. Update Coordination Documents

1. Update MASTER-COORDINATION.md:
   - Find all references to task ID
   - Remove from wave assignments
   - Remove from task lists
   - Add note in changes section about removal

2. Update EXECUTION-TRACKER.md:
   - Update task counts (decrement total tasks)
   - Update status distribution counts
   - Add entry to changes log about removal
   - Recalculate completion percentage

3. Update TASK-DEPENDENCIES.yaml:
   - Remove task node from dependency graph
   - Remove all edges involving this task
   - Update graph visualization data

4. Regenerate dependency graph if visualization exists

## 9. Update TASK-STATUS-TRACKER.yaml

1. Load TASK-STATUS-TRACKER.yaml

2. Update status_history section:
   ```yaml
   status_history:
     TASK-003:
       - timestamp: "2024-03-15T10:00:00Z"
         status: "todos"
       - timestamp: "2024-03-15T14:30:00Z"
         status: "in_progress"
       - timestamp: "2024-03-16T16:00:00Z"
         status: "REMOVED"
         reason: "Requirement changed"
         removed_by: "user-id"
   ```

3. Remove task from current_status_summary:
   ```yaml
   current_status_summary:
     in_progress: [TASK-001]  # TASK-003 removed
   ```

4. Update agent_assignments if task was assigned:
   - Remove from agent's current task
   - Update agent's task count

5. Move task entry to removal_log section:
   ```yaml
   removal_log:
     - task_id: TASK-003
       removed_at: "2024-03-16T16:00:00Z"
       removed_by: "user-id"
       reason: "Requirement changed"
       status_at_removal: "in_progress"
       dependencies_affected: ["TASK-005", "TASK-007"]
       commits_preserved: ["abc123", "def456"]
       archived_to: ".removed/2024-03-16/TASK-003/"
   ```

6. Write updated YAML to file

## 10. Handle Task File Removal

1. Determine removal strategy based on flags:
   - `--archive` (or default): Move to archive
   - `--hard`: Delete permanently
   - Task has commits: Force archive regardless

2. If archiving:
   - Create archive directory: `.removed/{date}/TASK-{id}/`
   - Copy task file to archive location
   - Copy any related files (attachments, notes)
   - Create removal metadata file in archive with reason and impact analysis
   - Delete original task file from status folder

3. If hard delete:
   - Delete task file permanently
   - Log deletion to audit trail
   - No recovery possible

4. Verify file removal:
   - Check original location is empty
   - Verify archive location contains file (if archived)

## 11. Update Audit Trail

1. Create detailed audit entry:
   ```yaml
   # .orchestration-audit.yaml
   removals:
     - task_id: TASK-003
       removed_at: "2024-03-16T16:00:00Z"
       removed_by: "user-id"
       reason: "Requirement changed"
       status_at_removal: "in_progress"
       had_commits: true
       commits_preserved: ["abc123", "def456"]
       dependencies_affected: ["TASK-005", "TASK-007"]
       references_updated: 4
       archived_to: ".removed/2024-03-16/TASK-003/"
       removal_type: "soft"  # or "hard"
   ```

2. Append audit entry to orchestration audit log

3. If git tracking enabled, create commit with removal changes:
   - Commit message: "chore: remove TASK-003 - {reason}"
   - Include all updated files

## 12. Handle Batch Removal (if multiple tasks)

1. For each task in removal list:
   - Execute steps 2-11
   - Track success/failure for each
   - Continue even if one fails

2. Resolve cross-dependencies:
   - If TASK-A depends on TASK-B and both are being removed, handle order
   - Update references correctly

3. Display batch removal summary:
   ```
   Removed 3 tasks:
   ✓ TASK-003: JWT validation (archived)
   ✓ TASK-005: User profile API (archived)
   ✗ TASK-008: OAuth integration (failed - not found)
   ```

## 13. Provide Undo Capability

1. Save undo information to temporary file:
   - Original task file content
   - Original file location
   - All changes made to other files
   - Timestamp of removal

2. Undo information retained for recent removal (last 24 hours)

3. If `/orchestration/remove --undo-last` called later:
   - Load most recent removal from undo file
   - Restore task file to original location
   - Revert changes to dependent tasks
   - Restore tracking file entries
   - Remove from removal_log

4. If `/orchestration/remove --restore TASK-003` called:
   - Load task from archive
   - Restore to appropriate status folder
   - Update tracking files
   - Notify about references that may need manual restoration

## 14. Display Results and Confirmation

1. Show removal summary:
   ```
   ✓ Task TASK-003 removed successfully
   
   Summary:
   - Task archived to: .removed/2024-03-16/TASK-003/
   - Dependent tasks updated: 2
   - References updated: 4
   - Commits preserved: 2
   
   Affected tasks:
   - TASK-005: Now ready to start (no blockers)
   - TASK-007: Still blocked by TASK-009
   ```

2. If any warnings or issues:
   - Display list of issues encountered
   - Suggest remediation actions

3. Provide next steps:
   ```
   Next steps:
   - Review TASK-005 and TASK-007 status
   - Undo if needed: /orchestration/remove --undo-last
   - Check status: /task-status
   ```

4. Return success exit code

</detailed_sequence_steps>

</task>

