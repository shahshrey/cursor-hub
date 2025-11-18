<task name="Git Branch Cleanup and Organization">

<task_objective>
Perform comprehensive branch cleanup and organize repository structure by identifying and removing merged branches, stale remotes, and old branches. Input: Repository state and optional mode flags (dry-run, force, remote-only, local-only). Processing: Identify branches for cleanup, perform safety checks, categorize branches, synchronize remote references, clean up with appropriate confirmation. Output: Cleaned repository with summary of deleted branches, pruned remotes, recovery information with git reflog references and commands.
</task_objective>

<how_to_ask_followup_question>
<question>How would you like to proceed with branch cleanup?</question>
<options>["Interactive mode with confirmations", "Dry run to preview changes", "Force cleanup without confirmations", "Remote-only cleanup", "Local-only cleanup"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Git Branch Cleanup and Organization - Detailed Sequence of Steps

## 1. Analyze Repository State

1. Execute `git branch -a` to list all local and remote branches.

2. Execute `git for-each-ref --count=10 --sort=-committerdate refs/heads/ --format='%(refname:short) - %(committerdate:relative)'` to see recently modified branches.

3. Execute `git branch -r` to list remote-tracking branches.

4. Execute `git branch --merged main` (or master) to identify merged branches.

5. Execute `git branch --show-current` to get current working branch.

6. Execute `git status --porcelain` to verify working directory is clean.

## 2. Identify Branches for Cleanup

1. Find local branches already merged into main/master using `git branch --merged`.

2. Identify stale remote-tracking branches using `git remote prune origin --dry-run`.

3. Detect old branches with no recent activity (>30 days) using `git for-each-ref`.

4. Categorize branches by naming pattern (feature/*, hotfix/*, release/*, bugfix/*).

5. Cross-reference with GitHub PR status using `gh pr list` if GitHub CLI is available.

## 3. Perform Safety Checks

1. Verify branches are actually merged using `git merge-base` to double-check.

2. Check for unpushed commits using `git log origin/<branch>..<branch>`.

3. Confirm branches aren't the current working branch.

4. Validate against protected branch patterns (main, master, develop, staging, production, release/*).

5. Create backup references for branches being deleted by recording SHA hashes.

## 4. Categorize Branches

1. Mark as safe to delete: merged feature branches, old hotfix branches, merged bugfix branches.

2. Flag for review: unmerged branches with old commits (>30 days), branches with unpushed work.

3. Mark to keep: main branches (main, master, develop), active feature branches, release branches, current working branch.

4. Consider for archiving: long-running branches that might need preservation.

5. Generate branch analysis report with recommendations for each category.

## 5. Execute Cleanup Based on Mode

### Interactive Mode (Default)

1. Present branch analysis with recommendations for each branch.

2. Prompt for confirmation before each deletion.

3. Execute `git branch -d <branch-name>` for merged branches or `git branch -D <branch-name>` if forced.

4. Ask if user wants to push deletions to remote.

5. Provide summary of actions taken.

### Dry Run Mode

1. Display what would be deleted without making any changes.

2. Show branch analysis and recommendations.

3. Provide cleanup statistics (number of branches to delete, disk space to reclaim).

4. Exit without modifying repository state.

### Force Mode

1. Delete merged branches without confirmation using `git branch -D`.

2. Clean up stale remotes automatically with `git remote prune origin`.

3. Remove old branches based on criteria.

4. Provide summary of all actions taken.

### Remote Only Mode

1. Execute `git remote prune origin` to remove stale remote-tracking references.

2. Synchronize with actual remote state using `git fetch --prune`.

3. Keep all local branches intact.

4. Display removed remote references.

### Local Only Mode

1. Delete only local branches based on criteria.

2. Don't affect remote-tracking branches.

3. Keep remote synchronization intact.

4. Focus on local workspace organization.

## 6. Clean Up Remote Branches

1. For each deleted local branch, check if corresponding remote branch should be deleted.

2. Execute `git push origin --delete <branch-name>` for remote cleanup if confirmed.

3. Remove remote-tracking branches for deleted remotes.

4. Update branch tracking relationships using `git branch --unset-upstream` if needed.

## 7. Generate Cleanup Report

1. Count branches deleted, stale references removed, branches requiring review.

2. Calculate repository size reduction if applicable.

3. Display cleanup summary with emoji indicators (✅ for deleted, ⚠️ for requiring attention).

4. Provide recovery instructions with git reflog references for each deleted branch.

5. Create recovery script showing commands to restore deleted branches (`git checkout -b <branch> <SHA>`).

## 8. Organize Remaining Branches

1. Identify branches that don't follow naming conventions.

2. Suggest renaming branches to follow team conventions (feature/, bugfix/, hotfix/ prefixes).

3. Check for branches missing upstream tracking configuration.

4. Fix broken tracking relationships using `git branch --set-upstream-to`.

5. Provide batch renaming suggestions for consistency.

</detailed_sequence_steps>

</task>
