<task name="Clean Branches">

<task_objective>
Clean up merged and stale git branches by systematically analyzing repository state, identifying merged and stale branches, performing interactive branch review with safety precautions, cleaning up local and remote branches, coordinating with team, and documenting procedures with rollback capabilities. Accepts options via $ARGUMENTS.
</task_objective>

<detailed_sequence_steps>
# Clean Branches - Detailed Sequence of Steps

## 1. Repository State Analysis

1. Check current branch and uncommitted changes for: **$ARGUMENTS**

2. List all local and remote branches

3. Identify the main/master branch name

4. Review recent branch activity and merge history

```bash
git status
git branch -a
git remote -v

git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'
```

## 2. Safety Precautions

1. Ensure working directory is clean

2. Switch to main/master branch

3. Pull latest changes from remote

4. Create backup of current branch state if needed

```bash
git stash push -m "Backup before branch cleanup"
git checkout main
git pull origin main
```

## 3. Identify Merged Branches

1. List branches that have been merged into main

2. Exclude protected branches (main, master, develop)

3. Check both local and remote merged branches

4. Verify merge status to avoid accidental deletion

```bash
git branch --merged main | grep -v "main\\|master\\|develop\\|\\*"

git branch -r --merged main | grep -v "main\\|master\\|develop\\|HEAD"
```

## 4. Identify Stale Branches

1. Find branches with no recent activity

2. Check last commit date for each branch

3. Identify branches older than specified timeframe (e.g., 30 days)

4. Consider branch naming patterns for feature/hotfix branches

```bash
git for-each-ref --format='%(committerdate) %(authorname) %(refname)' --sort=committerdate refs/heads

git for-each-ref --format='%(refname:short) %(committerdate)' refs/heads | awk '$2 < "'$(date -d '30 days ago' '+%Y-%m-%d')'"'
```

## 5. Interactive Branch Review

1. Review each branch before deletion

2. Check if branch has unmerged changes

3. Verify branch purpose and status

4. Ask for confirmation before deletion

```bash
git log main..branch-name --oneline

git show-branch branch-name main
```

## 6. Protected Branch Configuration

1. Identify branches that should never be deleted

2. Configure protection rules for important branches

3. Document branch protection policies

4. Set up automated protection for new repositories

```bash
PROTECTED_BRANCHES=("main" "master" "develop" "staging" "production")
```

## 7. Local Branch Cleanup

1. Delete merged local branches safely

2. Remove stale feature branches

3. Clean up tracking branches for deleted remotes

4. Update local branch references

```bash
git branch --merged main | grep -v "main\\|master\\|develop\\|\\*" | xargs -n 1 -p git branch -d

git branch -D branch-name
```

## 8. Remote Branch Cleanup

1. Remove merged remote branches

2. Clean up remote tracking references

3. Delete obsolete remote branches

4. Update remote branch information

```bash
git remote prune origin

git push origin --delete branch-name

git branch -dr origin/branch-name
```

## 9. Automated Cleanup Script

```bash
#!/bin/bash

set -e

MAIN_BRANCH="main"
PROTECTED_BRANCHES=("main" "master" "develop" "staging" "production")
STALE_DAYS=30

is_protected() {
    local branch=$1
    for protected in "${PROTECTED_BRANCHES[@]}"; do
        if [[ "$branch" == "$protected" ]]; then
            return 0
        fi
    done
    return 1
}

git checkout $MAIN_BRANCH
git pull origin $MAIN_BRANCH

echo "Cleaning up merged branches..."
merged_branches=$(git branch --merged $MAIN_BRANCH | grep -v "\\*\\|$MAIN_BRANCH")

for branch in $merged_branches; do
    if ! is_protected "$branch"; then
        echo "Deleting merged branch: $branch"
        git branch -d "$branch"
    fi
done

echo "Pruning remote tracking branches..."
git remote prune origin

echo "Branch cleanup completed!"
```

## 10. Team Coordination

1. Notify team before cleaning shared branches

2. Check if branches are being used by others

3. Coordinate branch cleanup schedules

4. Document branch cleanup procedures

## 11. Branch Naming Convention Cleanup

1. Identify branches with non-standard naming

2. Clean up temporary or experimental branches

3. Remove old hotfix and feature branches

4. Enforce consistent naming conventions

## 12. Verification and Validation

1. Verify important branches are still present

2. Check that no active work was deleted

3. Validate remote branch synchronization

4. Confirm team members have no issues

```bash
git branch -a
git remote show origin
```

## 13. Documentation and Reporting

1. Document what branches were cleaned up

2. Report any issues or conflicts found

3. Update team documentation about branch lifecycle

4. Create branch cleanup schedule and policies

## 14. Rollback Procedures

1. Document how to recover deleted branches

2. Use reflog to find deleted branch commits

3. Create emergency recovery procedures

4. Set up branch restoration scripts

```bash
git reflog --no-merges --since="2 weeks ago"
git checkout -b recovered-branch commit-hash
```

## 15. Automation Setup

1. Set up automated branch cleanup scripts

2. Configure CI/CD pipeline for branch cleanup

3. Create scheduled cleanup jobs

4. Implement branch lifecycle policies

## 16. Best Practices Implementation

1. Establish branch lifecycle guidelines

2. Set up automated merge detection

3. Configure branch protection rules

4. Implement code review requirements

## 17. Advanced Cleanup Options

```bash
git branch --merged main | grep -E "^  (feature|hotfix|bugfix)/" | xargs -n 1 git branch -d

git branch --merged main | grep -v "main\|master\|develop" | xargs -n 1 -p git branch -d

git branch -r --merged main | grep origin | grep -v "main\|master\|develop\|HEAD" | cut -d/ -f2- | xargs -n 1 git push origin --delete

git for-each-ref --format='%(refname:short) %(committerdate:short)' refs/heads | awk '$2 < "2023-01-01"' | cut -d' ' -f1 | xargs -n 1 git branch -D
```

## 18. Important Principles

Remember to:
- Always backup important branches before cleanup
- Coordinate with team members before deleting shared branches
- Test cleanup scripts in a safe environment first
- Document all cleanup procedures and policies
- Set up regular cleanup schedules to prevent accumulation

</detailed_sequence_steps>

</task>
