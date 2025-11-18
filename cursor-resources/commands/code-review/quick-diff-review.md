<task name="Quick Diff Review">

<task_objective>
Perform a quick, focused review of existing code diffs to catch obvious issues, code smells, and common mistakes before proceeding to a detailed code review. The output will be a summary of findings with a recommendation on whether the code is ready for detailed review, needs minor fixes, or requires major rework.
</task_objective>

<detailed_sequence_steps>
# Quick Diff Review - Detailed Sequence of Steps

## 1. Identify Code Changes

1. Determine the scope of code changes to review by running `git status` or `git diff` to view staged/unstaged changes.

2. If a specific branch or PR is being reviewed, checkout the branch and compare against the base branch using `git diff base-branch...current-branch`.

3. List all modified files and note the total number of files changed and lines of code affected.

4. Identify any red flags at the file level:
   - Large files (>500 lines changed)
   - Many files changed (>15 files)
   - Mixed concerns (refactoring and features together)
   - Missing test files

## 2. Check for Obvious Issues (2 minutes)

1. Scan through the diffs for commented-out code blocks.
   - Flag any instances of commented code that should be removed.

2. Search for debug statements:
   - Look for `console.log`, `print()`, `debugger`, or similar debugging artifacts.
   - Verify these are intentional logging or should be removed.

3. Check for TODO/FIXME comments:
   - Identify any TODO comments without associated tickets or issues.
   - Verify if they need tickets created or should be addressed now.

4. Verify file formatting:
   - Check for consistent indentation and spacing.
   - Ensure proper line endings and no trailing whitespace.

## 3. Perform Code Smell Check (3 minutes)

1. Identify extremely long functions:
   - Flag functions longer than 50 lines that may need decomposition.
   - Note any functions with unclear responsibilities.

2. Check for deeply nested conditions:
   - Look for nested if/else statements beyond 3 levels.
   - Identify opportunities for early returns or guard clauses.

3. Scan for obvious code duplication:
   - Look for repeated code blocks that could be extracted.
   - Check for similar patterns across multiple files.

4. Review variable and function naming:
   - Verify names are descriptive and follow conventions.
   - Flag overly short (single letter except in loops) or cryptic names.

## 4. Review Common Mistakes (3 minutes)

1. Check for hardcoded values:
   - Identify magic numbers, strings, or URLs that should be constants or config.
   - Verify environment-specific values use configuration.

2. Verify error handling:
   - Ensure try-catch blocks exist where errors may occur.
   - Check that errors are properly logged or handled, not silently caught.

3. Check for unused code:
   - Look for unused imports or dependencies.
   - Identify unused variables or parameters.
   - Verify all defined functions are actually called.

4. Verify type safety:
   - Check for proper type annotations (if using TypeScript/Python typing).
   - Look for potential null/undefined access issues.
   - Verify proper type casting or validation.

## 5. Review Documentation (2 minutes)

1. Check if complex logic has explanatory comments:
   - Flag complex algorithms or business logic without comments.
   - Verify comments are meaningful, not redundant.

2. Review public API documentation:
   - Ensure exported functions/classes have proper documentation.
   - Verify function signatures match documentation.

3. Check if README or relevant docs were updated:
   - If new features added, verify documentation updated.
   - If APIs changed, ensure migration guides exist if needed.

## 6. Generate Review Summary

1. Compile all findings into categories:
   - Critical issues (must fix)
   - Code smells (should fix)
   - Suggestions (nice to have)

2. Determine overall assessment:
   - ✅ Looks good for detailed review: No critical issues found
   - ⚠️  Needs minor fixes before review: Few issues that can be quickly addressed
   - ❌ Needs major rework: Significant issues or anti-patterns present

3. Provide specific, actionable feedback for each issue found with file and line references.

4. Present the summary to the user with recommendations on next steps.

</detailed_sequence_steps>

</task>
