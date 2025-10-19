<task name="Git Status">

<task_objective>
Analyze the current state of the git repository by running git status commands, analyzing repository state, reading key files, and providing a comprehensive summary that helps developers quickly understand what changes are pending, the repository's sync status, and whether any actions are needed before continuing work. Supports arguments via $ARGUMENTS.
</task_objective>

<detailed_sequence_steps>
# Git Status - Detailed Sequence of Steps

## 1. Run Git Status Commands

1. Execute `git status` to see current working tree state

2. Run `git diff HEAD origin/main` to check differences with remote

3. Execute `git branch --show-current` to display current branch

4. Check for uncommitted changes and untracked files

## 2. Analyze Repository State

1. Identify staged vs unstaged changes

2. List any untracked files

3. Check if branch is ahead/behind remote

4. Review any merge conflicts if present

## 3. Read Key Files

1. Review README.md for project context

2. Check for any recent changes in important files

3. Understand project structure if needed

## 4. Provide Summary

1. Report current branch and its relationship to main/master

2. Show number of commits ahead/behind

3. List modified files with change types

4. Provide action items (commits needed, pulls required, etc.)

## 5. Use Cases

This command helps developers quickly understand:
- What changes are pending
- The repository's sync status
- Whether any actions are needed before continuing work

</detailed_sequence_steps>

<credit>
Command originally created by IndyDevDan (YouTube: https://www.youtube.com/@indydevdan) / DislerH (GitHub: https://github.com/disler)
</credit>

</task>