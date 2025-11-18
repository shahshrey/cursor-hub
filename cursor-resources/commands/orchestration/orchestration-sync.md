<task name="Orchestration Sync">

<task_objective>
Synchronize task status with git commits, ensuring consistency between version control and task tracking. The workflow analyzes git history to identify task-related commits, extracts task references from commit messages and branch names, updates TASK-STATUS-TRACKER.yaml based on commit evidence, and reports discrepancies between git state and task tracking for bidirectional consistency validation.
</task_objective>

<detailed_sequence_steps>
# Orchestration Sync - Detailed Sequence of Steps

## 1. Determine Sync Scope

1. Identify target orchestration based on options:
   - `--date MM_DD_YYYY --project PROJECT_NAME`: Specific orchestration
   - No options: All active orchestrations with recent git activity
   - `--branch BRANCH_NAME`: Only tasks related to specific branch

2. Determine time range for git analysis:
   - `--since "1 week ago"`: Only recent commits
   - Default: All commits since orchestration start date

3. Set sync mode:
   - `--check`: Report only, no changes
   - `--dry-run`: Show what would change
   - `--force`: Apply all changes without prompting
   - Default: Interactive prompting

4. Load current task status from TASK-STATUS-TRACKER.yaml files

## 2. Analyze Git History

1. Execute git log command with appropriate filters (date range, branches)

2. For each commit, extract:
   - Commit hash (SHA)
   - Commit message (subject and body)
   - Author and timestamp
   - Changed files
   - Branch information

3. Scan commit messages for task references using patterns:
   - Explicit: "Task: TASK-003", "TASK-003"
   - In body: "Implements TASK-003", "Fixes TASK-007"
   - Conventional commits: "feat(auth): implement JWT (TASK-003)"

4. Extract task references from branch names:
   - Pattern: `feature/TASK-003-jwt`, `bugfix/TASK-007-fix`

5. Check PR/MR titles for task references if git hosting integration available

6. Build map of task IDs to associated commits

## 3. Detect Commit Patterns

1. Analyze commit message types using conventional commit patterns:
   - `feat` or `feature`: Implementation work
   - `test` or `spec`: Testing phase
   - `fix` or `bugfix`: Bug resolution
   - `docs` or `documentation`: Documentation complete
   - `refactor`: Code improvement
   - `WIP`: Work in progress

2. Determine implied status changes based on patterns:
   - Implementation commits (`feat`, `fix`) + test commits → Suggest move to qa
   - Test commits with "pass" or "passing" → Suggest move to completed
   - WIP commits → Keep in in_progress
   - Multiple commits over time → Task actively worked on

3. Check for test result indicators in commit messages or CI status

4. Calculate confidence score (0.0-1.0) for each status recommendation based on evidence strength

## 4. Compare with Task Tracker

1. For each task with git commits, compare:
   - Current status in TASK-STATUS-TRACKER.yaml
   - Implied status from git evidence
   - Confidence level of git-based recommendation

2. Identify discrepancies:
   - Tasks marked completed but no commits found
   - Tasks in qa but no implementation commits
   - Tasks in todos but commits exist
   - Tasks in in_progress but tests passing

3. Find orphaned commits (commits without task references) that might belong to tracked tasks

4. Detect tasks marked complete faster than commit history suggests

## 5. Generate Sync Recommendations

1. For each discrepancy, create recommendation with:
   - Task ID
   - Current status
   - Recommended status
   - Confidence level (percentage)
   - Supporting evidence (list of commits with messages and dates)

2. Group recommendations by type:
   - High confidence (>90%): Safe auto-updates
   - Medium confidence (70-90%): Suggest with review
   - Low confidence (<70%): Flag for manual review

3. Identify conflicts requiring manual resolution:
   - Task manually marked on_hold but recent commits exist
   - Task completed but failed CI/CD checks
   - Circular evidence (status changes don't match commit timeline)

4. Generate warnings for:
   - Tasks completed without any commits
   - Commits without any task references
   - Time gaps between commits and status updates

## 6. Apply or Report Updates

1. If `--check` mode, generate report showing all discrepancies without making changes

2. If `--dry-run` mode, show exactly what would be updated with preview of YAML changes

3. If interactive mode (default), for each recommendation:
   - Display task details and git evidence
   - Show current vs recommended status
   - Present resolution options:
     - [1] Trust git (update task status)
     - [2] Trust tracker (keep current status, add manual flag)
     - [3] Manual review (mark for later)
     - [4] Skip this task
   - Prompt for user choice

4. If `--force` mode, apply all high-confidence recommendations automatically

5. If `--conservative` flag, only apply high-confidence (>90%) updates

6. If `--aggressive` flag, apply all recommendations including medium confidence

## 7. Update Tracking Files

1. For each approved status change, update TASK-STATUS-TRACKER.yaml:
   - Change status field
   - Add status history entry with timestamp and reason "synced from git"
   - Add git_tracking section with evidence

2. Update git_tracking section format:
   ```yaml
   git_tracking:
     TASK-003:
       status_from_git: completed
       confidence: 0.95
       sync_timestamp: "2024-03-15T16:30:00Z"
       evidence:
         - commit: abc123def
           message: "feat(auth): implement JWT validation"
           date: "2024-03-14T10:00:00Z"
         - commit: def456789
           message: "test(auth): add JWT tests - all passing"
           date: "2024-03-14T15:30:00Z"
   ```

3. Move physical task files to appropriate status folders if file location changed

4. Update EXECUTION-TRACKER.md with sync results and any status count changes

5. Log all sync operations to orchestration audit log

## 8. Generate Sync Report

1. Create synchronization summary:
   - Number of commits analyzed
   - Number of tasks with references found
   - Number of status updates applied
   - Number of conflicts requiring manual review
   - Number of orphaned commits detected

2. List all updates made with before/after status

3. Show warnings and items needing attention:
   - Tasks completed without commits
   - Commits without task references
   - Manual review items

4. If `--commit-report` flag specified, generate detailed report file listing all task-related commits

5. If `--link-orphans` flag specified, attempt to associate orphaned commits with tasks based on file paths and content analysis

6. Display confidence metrics and sync quality assessment

7. Save sync report to `.sync-reports/` directory with timestamp

</detailed_sequence_steps>

</task>

