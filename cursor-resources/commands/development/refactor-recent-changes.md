<task name="Refactor Recent Changes">

<task_objective>
Review recently changed files in the repository and perform small, focused refactors to make the codebase easier for AI agents to navigate in the future. Use git diff to identify changed files and their directly related modules, then refactor by splitting large files into smaller single-purpose files (target under 500 lines), organizing folder hierarchies, tightening module boundaries, removing dead code, and simplifying APIs. Keep code behaviorally identical and document all changes. Output will be refactored code files with updated documentation headers.
</task_objective>

<detailed_sequence_steps>
# Refactor Recent Changes - Detailed Sequence of Steps

## 1. Identify Changed Files

1. Use git diff to identify files that have been modified in the current working state.
   - Tool: Run `git diff --name-only` to get list of changed files
   - Tool: Run `git diff --stat` to see change statistics
   - Expected output: List of modified files with change metrics

2. If the user has specified a target folder path, scope the analysis to that path recursively.
   - Filter the changed files list to only include files within the specified path

3. Identify directly related modules and dependencies for each changed file.
   - Analyze imports and references
   - Build a focused set of files to consider for refactoring

## 2. Analyze Refactoring Needs

1. For each changed file and its related modules, assess:
   - File size (flag files over 500 lines)
   - Single Responsibility Principle adherence
   - Module boundaries and coupling
   - Presence of dead code or unused variables
   - API complexity and clarity
   - Folder structure and organization

2. Determine if refactoring is actually needed.
   - Not all changes require refactoring
   - Only proceed if refactoring will meaningfully improve AI agent navigability
   - Minimize risk by avoiding unnecessary changes

3. Create a prioritized list of refactoring opportunities:
   - High priority: Large files that can be split, dead code removal
   - Medium priority: Folder reorganization, API simplification
   - Low priority: Minor optimizations

## 3. Perform Focused Refactors

1. Split large files into smaller, single-purpose files:
   - Target: Files under 500 lines each
   - Ensure each file has a clear, single responsibility
   - Maintain behavioral equivalence
   - Update imports and references across the codebase

2. Organize files into clear folder hierarchies:
   - Group related functionality
   - Create logical module boundaries
   - Ensure intuitive navigation for AI agents

3. Remove dead code and unused variables:
   - Delete unused imports
   - Remove commented-out code blocks
   - Eliminate unused functions and variables
   - Follow user rule #16: No unused variables

4. Simplify APIs and tighten module boundaries:
   - Reduce public interface surface area
   - Make dependencies explicit
   - Ensure clear separation of concerns

5. Keep code behaviorally identical:
   - Only make minimal adjustments if required for splits or cleanup
   - Do not introduce new functionality
   - Do not change existing business logic

## 4. Document Changes

1. For each file touched during refactoring, update the documentation header using the format specified in the `/document` command.
   - Reflect the new structure and responsibilities
   - Document any splits or reorganizations
   - Ensure headers accurately describe current file purpose

2. Update any README files or module-level documentation if folder structures changed.

## 5. Present Changes to User

1. Summarize the refactoring work completed:
   - List of files modified
   - Types of refactors performed (splits, moves, deletions)
   - Before/after metrics (file sizes, module count)

2. Highlight any files that were split or reorganized with their new locations.

3. Confirm that code remains behaviorally identical.

4. Remind the user that changes have NOT been committed, staged, or built - only refactored in the working directory.

</detailed_sequence_steps>

</task>
