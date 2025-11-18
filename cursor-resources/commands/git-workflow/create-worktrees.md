<task name="Create Git Worktrees">

<task_objective>
Create git worktrees for managing multiple branches simultaneously without switching contexts. Input: Optional PR numbers or branch names, or flag to create worktrees for all open PRs. Processing: Fetch branch information from GitHub or repository, validate branches exist, create directory structure for worktrees, add git worktrees for each branch. Output: Git worktrees created in ./tree/<BRANCH_NAME> directories, worktree list displaying all active worktrees, optional cleanup of stale worktrees.
</task_objective>

<how_to_ask_followup_question>
<question>Which worktree creation approach would you like to use?</question>
<options>["Create worktrees for all open PRs", "Create worktree for specific branch", "Create new branch with worktree", "Clean up stale worktrees"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Create Git Worktrees - Detailed Sequence of Steps

## 1. Verify Prerequisites

1. Check if git repository is valid by executing `git rev-parse --is-inside-work-tree`.

2. Get repository root path using `git rev-parse --show-toplevel`.

3. Verify GitHub CLI is installed and authenticated by executing `gh auth status` if working with PRs.

4. Create base worktree directory `./tree` if it doesn't exist using `mkdir -p ./tree`.

5. Verify current working directory is clean with `git status --porcelain`.

## 2. Fetch Branch Information

### For All Open PRs

1. Execute `gh pr list --json headRefName --jq '.[].headRefName'` to get list of all PR branch names.

2. Parse output to extract branch names into array.

3. For each branch, verify branch exists remotely using `git ls-remote --heads origin <branch>`.

4. Fetch remote branches if not available locally using `git fetch origin <branch>:<branch>`.

### For Specific Branch

1. Verify branch name is provided as argument.

2. Check if branch exists locally using `git show-ref --verify --quiet "refs/heads/<branch>"`.

3. If branch doesn't exist locally, check remote using `git ls-remote --heads origin <branch>`.

4. Fetch branch from remote if needed using `git fetch origin <branch>:<branch>`.

### For New Branch Creation

1. Prompt user for new branch name.

2. Validate branch name is not empty and follows naming conventions.

3. Check if branch already exists using `git show-ref --verify --quiet "refs/heads/<branch>"`.

4. If branch exists, ask user if they want to use existing branch or choose different name.

5. Optionally prompt for base branch/commit (default: HEAD) to create new branch from.

## 3. Create Directory Structure

1. For each branch to create worktree for, determine worktree path: `./tree/<BRANCH_NAME>`.

2. Handle branch names with slashes (e.g., `feature/foo`) by creating nested directory structure.

3. If branch contains slashes, extract directory path using `dirname` and create parent directories with `mkdir -p`.

4. Verify worktree directory doesn't already exist to prevent conflicts.

5. Store mapping of branch names to worktree paths.

## 4. Create Git Worktrees

1. For each branch, check if worktree already exists at target path.

2. If worktree already exists, skip creation and log message.

3. For existing branches, execute `git worktree add <path> <branch>` to create worktree.

4. For new branches, execute `git worktree add -b <branch> <path> <base-commit>` to create branch and worktree.

5. Handle errors such as worktree conflicts, branch conflicts, or invalid branch references.

6. Verify worktree was created successfully by checking directory exists and contains git repository.

## 5. Verify Worktree Creation

1. Execute `git worktree list` to display all active worktrees.

2. Parse worktree list to confirm new worktrees were added.

3. For each created worktree, verify branch is checked out using `git -C <worktree-path> branch --show-current`.

4. Display summary of created worktrees with branch names and paths.

5. Count total worktrees and display statistics.

## 6. Optional Cleanup of Stale Worktrees

1. Execute `git worktree list` to get list of all existing worktrees.

2. For each worktree (excluding main worktree), extract branch name from path.

3. Execute `git branch -a` to get list of all current branches (local and remote).

4. Check if worktree's branch still exists in repository.

5. If branch no longer exists, prompt user to remove stale worktree or remove automatically in force mode.

6. Execute `git worktree remove --force <path>` to remove stale worktrees.

7. Clean up empty directories in ./tree after worktree removal.

## 7. Provide Usage Instructions

1. Display paths to newly created worktrees.

2. Provide command to navigate to each worktree: `cd <worktree-path>`.

3. Explain that each worktree is independent working directory for its branch.

4. Inform user they can work in multiple worktrees simultaneously without branch switching.

5. Provide worktree management commands: `git worktree list` (list all worktrees), `git worktree remove <path>` (remove worktree), `git worktree prune` (clean up worktree metadata).

## 8. Handle Edge Cases

1. If branch name is `main`, `master`, or current working branch, warn user and confirm before creating worktree.

2. Handle worktree creation failure due to locked worktrees by attempting unlock with `git worktree unlock <path>`.

3. If disk space is insufficient, provide error message and cleanup suggestions.

4. Handle branches with special characters in names by properly escaping or sanitizing.

5. If worktree path conflicts with existing file, suggest alternative path or prompt for resolution.

</detailed_sequence_steps>

</task>
