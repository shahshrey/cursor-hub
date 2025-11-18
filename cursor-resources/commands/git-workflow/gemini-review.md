<task name="Gemini PR Review Automation">

<task_objective>
Transform Gemini Code Assist PR reviews into prioritized TodoLists with automated execution. Input: GitHub PR number with Gemini review comments. Processing: Fetch PR details, parse and categorize review comments by severity, assess impact and effort, create prioritized TodoList. Output: Structured TodoList with priority ordering (must-fix/should-fix/nice-to-have), effort estimates, execution plan, and decision record for accepted/deferred/rejected changes.
</task_objective>

<how_to_ask_followup_question>
<question>Would you like me to automatically execute the high-priority fixes after creating the TodoList?</question>
<options>["Yes, proceed with execution", "No, I'll review the TodoList first", "Preview mode - show changes without applying"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Gemini PR Review Automation - Detailed Sequence of Steps

## 1. Fetch PR and Review Data

1. Determine PR number from arguments or current branch using GitHub CLI.

2. Execute `gh pr view <PR-NUMBER>` to retrieve PR details including title, description, and current status.

3. Execute `gh pr view <PR-NUMBER> --comments` to fetch all Gemini Code Assist review comments.

4. Validate that PR exists and has Gemini review comments available.

5. Extract Gemini comments from the GitHub PR review system.

## 2. Parse and Categorize Review Comments

1. Parse each Gemini review comment extracting file path, line numbers, comment type, and description.

2. Categorize comments by severity: Critical, Improvement, Suggestion, Style.

3. Map each comment to specific code locations using file paths and line ranges.

4. Identify common themes and patterns across multiple comments.

5. Generate review summary including total comment count, severity distribution, common patterns, overall sentiment, and estimated total effort.

## 3. Assess Impact and Priority

1. For each review comment, analyze potential impact if left unaddressed.

2. Determine decision category: Must-fix (security vulnerabilities, data integrity issues, breaking changes, critical performance problems), Should-fix (maintainability issues, moderate performance improvements, best practice violations), Nice-to-have (style improvements, minor optimizations, optional refactoring), or Skip (conflicts with project standards, out of scope, low ROI).

3. Document reasoning for each priority assignment.

4. Estimate implementation effort for each item (Small: <15min, Medium: 15-45min, Large: >45min).

5. Assess dependencies between review items and determine implementation order.

## 4. Generate TodoList

1. Group review items by priority level (High/Medium/Low).

2. Create TodoList structure with clear descriptions, effort estimates, and file locations.

3. Add decision reasoning for each todo item.

4. Include skipped items with explanation in separate section.

5. Present TodoList to user for confirmation before execution.

## 5. Create Execution Plan

1. Organize todos into phases: Phase 1 (Critical Fixes - immediate), Phase 2 (Important Improvements - same PR), Phase 3 (Optional Enhancements - future PR).

2. Identify dependencies and establish implementation order.

3. Define testing strategy required for each phase.

4. Document accepted changes, deferred changes, rejected changes, and trade-offs.

5. Generate commit strategy with conventional commit message templates referencing Gemini review.

## 6. Execute Fixes (Optional)

1. For each high-priority item, use Grep to locate exact code locations.

2. Use Read to inspect source code context and understand current implementation.

3. Apply fixes using Edit/MultiEdit following best practices and project standards.

4. Run linting and type checking to validate changes.

5. Group related changes for atomic commits following conventional commit format.

6. Create commits with descriptive messages referencing Gemini PR review item.

</detailed_sequence_steps>

</task>
