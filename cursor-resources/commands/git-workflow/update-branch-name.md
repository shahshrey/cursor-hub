<task name="Update Branch Name">

<task_objective>
Update the current branch name to be descriptive and meaningful based on actual work being done. Input: Current git branch state. Processing: Analyze changes between current branch and main branch HEAD, examine modified files to understand work scope, determine appropriate descriptive branch name following naming conventions, update branch name. Output: Renamed branch with descriptive name and verification of successful update.
</task_objective>

<detailed_sequence_steps>
# Update Branch Name - Detailed Sequence of Steps

## 1. Analyze Current Branch Changes

1. Execute `git branch --show-current` to get current branch name.

2. Execute `git diff main...HEAD` to see all differences between current branch and main branch HEAD.

3. If main doesn't exist, try `git diff master...HEAD` as fallback.

4. Capture list of modified files using `git diff --name-only main...HEAD`.

5. Capture list of added files and deleted files separately.

## 2. Understand Work Scope

1. Read modified files to understand nature of changes being made.

2. Identify primary purpose of changes (feature addition, bug fix, refactoring, documentation update, performance improvement).

3. Determine affected components, modules, or features based on file paths.

4. Identify if changes are focused on single area or span multiple areas.

5. Extract key functionality or feature being worked on.

## 3. Determine Appropriate Branch Name

1. Analyze change type and select appropriate prefix: `feature/` for new features, `fix/` or `bugfix/` for bug fixes, `refactor/` for code refactoring, `docs/` for documentation updates, `perf/` for performance improvements, `test/` for test additions, `chore/` for maintenance tasks.

2. Create descriptive name based on primary work focus using kebab-case format.

3. Keep name concise but meaningful (e.g., `feature/user-authentication`, `fix/login-redirect`, `refactor/api-error-handling`).

4. Ensure name follows team or project naming conventions.

5. Avoid generic names like `feature/updates` or `fix/issues`.

## 4. Update Branch Name

1. Construct new branch name with appropriate prefix and descriptive suffix.

2. Execute `git branch -m <new-branch-name>` to rename current branch locally.

3. Handle any errors (e.g., new name already exists).

4. Execute `git branch` to verify branch name was updated successfully.

5. Display confirmation message showing old name and new name.

## 5. Update Remote Tracking (If Applicable)

1. Check if current branch has remote tracking using `git rev-parse --abbrev-ref @{upstream}`.

2. If branch has been pushed to remote, inform user that remote branch should be updated.

3. Provide command to delete old remote branch: `git push origin --delete <old-branch-name>`.

4. Provide command to push new branch name: `git push origin <new-branch-name>`.

5. Provide command to set upstream tracking: `git push --set-upstream origin <new-branch-name>`.

</detailed_sequence_steps>

</task>
