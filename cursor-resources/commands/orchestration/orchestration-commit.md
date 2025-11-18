<task name="Orchestration Commit">

<task_objective>
Create git commits aligned with task completion, maintaining clean version control synchronized with task progress. The workflow automatically generates well-structured commits following Conventional Commits specification when tasks move to QA or completion, using task metadata, changed files, and implementation notes to create meaningful commit messages, and updates TASK-STATUS-TRACKER.yaml with git tracking information for bidirectional task-commit linkage.
</task_objective>

<detailed_sequence_steps>
# Orchestration Commit - Detailed Sequence of Steps

## 1. Identify Task to Commit

1. Determine target task based on command input:
   - No argument: Find task currently in progress for active agent
   - `TASK-003` specified: Use specified task ID
   - `--batch`: Identify all tasks ready to commit (in qa or completed status without commits)
   - `--status qa`: All tasks in qa status

2. Verify task exists in orchestration system

3. Load task metadata from task file:
   - Task ID and title
   - Task type (feature, bugfix, refactor, test, docs, performance, security)
   - Current status
   - Implementation notes
   - Changed files list (if documented)
   - Time spent

4. Check if task already has associated commits in TASK-STATUS-TRACKER.yaml

5. If `--batch` or `--feature` flag, identify related tasks that should be grouped

## 2. Detect Changed Files

1. Run `git status` to get list of modified, added, and deleted files

2. If `--detect-scope` flag enabled, analyze changed files to determine scope:
   - Files in `src/auth/` → scope: `auth`
   - Files in `src/api/` → scope: `api`
   - Files in `src/components/` → scope: `ui` or component name
   - Files in `tests/` → scope: `test` or parent module

3. Cross-reference changed files with task file documentation (if files were listed in task requirements)

4. Identify files outside expected task scope (potential warning)

5. If `--validate` flag enabled, check for uncommitted files unrelated to task

6. Stage appropriate files for commit using `git add`

## 3. Perform Pre-Commit Validation (if --validate flag)

1. Run test suite to verify all tests pass

2. Run linter to check for code quality issues

3. Verify task requirements are met by checking:
   - Acceptance criteria documented in task file
   - Test requirements fulfilled
   - Documentation updated if required

4. Check that changed files align with task scope

5. Report validation results:
   - ✓ All tests passing
   - ✓ No linting errors
   - ✓ Task requirements met
   - ✗ Uncommitted files outside task scope: [list files]

6. If validation fails, prompt user:
   - Proceed anyway? [y/n]
   - Or cancel to fix issues first

## 4. Generate Commit Message

1. Determine commit type based on task type:
   - Task type: feature → Commit type: `feat:`
   - Task type: bugfix → Commit type: `fix:`
   - Task type: refactor → Commit type: `refactor:`
   - Task type: test → Commit type: `test:`
   - Task type: docs → Commit type: `docs:`
   - Task type: performance → Commit type: `perf:`
   - Task type: security → Commit type: `fix:` (with security note)

2. Determine scope from detected files or task metadata

3. Create commit subject line:
   - Format: `{type}({scope}): {task-title-summary}`
   - Keep under 72 characters
   - Use imperative mood ("implement" not "implemented")

4. If `--breaking` flag specified, add breaking change indicator:
   - Format: `{type}({scope})!: {subject}`

5. Build commit body with:
   - Bullet points from implementation notes in task file
   - Key changes or features added
   - Important technical details

6. Add commit footer with:
   - `Task: TASK-XXX` (always included)
   - `Status: {previous-status} -> {current-status}` (status transition)
   - `Time: {hours}h` (time spent on task)
   - `Fixes: #123` (if issue number referenced in task)
   - `BREAKING CHANGE:` section if `--breaking` flag used

7. If `--link-task` flag enabled, add orchestration link:
   - `Link: /task-orchestration/{date}/{project}/tasks/{status}/TASK-XXX`

8. Example generated message:
   ```
   feat(auth): implement JWT token validation
   
   - Add token verification middleware
   - Implement refresh token logic
   - Add expiration handling
   - Create comprehensive test suite
   
   Task: TASK-003
   Status: todos -> in_progress -> qa
   Time: 4.5 hours
   ```

## 5. Apply Custom Overrides (if specified)

1. If `--message "Custom message"` flag provided:
   - Use custom message as subject
   - Still append Task ID and metadata to body

2. If `--no-task-ref` flag provided:
   - Omit task reference (not recommended)

3. If `--template TEMPLATE_NAME` specified:
   - Load commit template from configuration
   - Populate template with task data

## 6. Create Git Commit

1. Execute `git commit` with generated message

2. Capture commit hash (SHA) from git output

3. If commit fails, display error and options:
   - Retry with different message
   - Fix issues and retry
   - Cancel operation

4. If `--worktree` flag enabled:
   - Detect current worktree
   - Ensure commit only includes changes from current worktree
   - Add worktree identifier to commit metadata

5. Verify commit was created successfully by checking `git log`

## 7. Update Task Status Tracker

1. If `--update-tracker` flag enabled or by default:
   - Load TASK-STATUS-TRACKER.yaml
   - Add or update git_tracking section for this task:
     ```yaml
     git_tracking:
       TASK-003:
         commits: ["abc123def"]
         commit_message: "feat(auth): implement JWT validation"
         committed_at: "2024-03-15T14:30:00Z"
         committed_by: "agent-id"
     ```

2. If task was in qa status and commit represents completion:
   - Update task status to completed if tests pass
   - Update status_history with timestamp

3. Update EXECUTION-TRACKER.md with:
   - Note of commit creation
   - Updated task completion metrics

4. If `--auto-commit` flag was used (from `/task-move` command):
   - Update task status atomically with commit

## 8. Handle Batch Commits (if --batch flag)

1. If `--feature FEATURE_NAME` specified:
   - Find all completed tasks related to feature
   - Determine logical grouping

2. If `--smart-group` flag enabled:
   - Analyze task dependencies and relationships
   - Group related tasks (e.g., all auth tasks)
   - Suggest grouping to user

3. For each group, create single commit with:
   - Combined commit message listing all tasks
   - Format: `feat(auth): complete authentication system implementation`
   - Body with sections for each task
   - Multiple Task IDs in footer: `Tasks: TASK-001, TASK-003, TASK-005`

4. Stage all files from all tasks in group

5. Validate group commit doesn't mix incompatible changes (e.g., features + bugfixes)

6. Execute group commit

7. Update git_tracking for all tasks in group with same commit hash

## 9. Verify and Report

1. Display commit summary:
   - Commit hash
   - Commit message
   - Files changed count
   - Lines added/removed
   - Task ID(s) associated

2. Show next suggested action:
   - Push to remote?
   - Move task to next status?
   - Start next task?

3. If `--all-worktrees` flag specified:
   - Show commit status across all worktrees
   - Identify other tasks ready to commit in other worktrees

4. Update orchestration audit log with commit operation

5. If auto-commit was triggered by status change, confirm status update and commit both succeeded

</detailed_sequence_steps>

</task>

