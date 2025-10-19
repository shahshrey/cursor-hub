<task name="Fix GitHub Issue">

<task_objective>
Analyze and fix a GitHub issue by fetching issue details, understanding the problem, implementing necessary changes, and verifying the fix. Input: GitHub issue number. Processing: Fetch issue details using GitHub CLI, search codebase for relevant files, implement changes, run tests, validate with linting and type checking. Output: Fixed code with descriptive commit, passing tests, and code quality validation.
</task_objective>

<detailed_sequence_steps>
# Fix GitHub Issue - Detailed Sequence of Steps

## 1. Fetch Issue Details

1. Execute `gh issue view <ISSUE-NUMBER>` to retrieve complete issue details including title, description, labels, assignees, and comments.

2. Parse issue description to understand the problem statement, expected behavior, and actual behavior.

3. Extract reproduction steps if provided in the issue.

4. Identify any referenced files, line numbers, or code snippets in the issue.

5. Note any related issues or PRs mentioned in the issue.

## 2. Understand the Problem

1. Analyze the issue description to identify the core problem being reported.

2. Determine the scope of the issue (bug fix, feature request, documentation update, etc.).

3. Identify affected components, modules, or areas of the codebase.

4. Review any stack traces, error messages, or screenshots provided.

5. Clarify any ambiguous requirements or edge cases.

## 3. Search Codebase for Relevant Files

1. Use Grep to search for keywords, function names, or error messages mentioned in the issue.

2. Locate files directly referenced in the issue description or comments.

3. Use codebase_search to find related code by understanding the semantic meaning of the issue.

4. Identify dependencies and related modules that may be affected.

5. Read relevant files to understand current implementation and identify root cause.

## 4. Implement Necessary Changes

1. Design solution approach based on issue requirements and codebase context.

2. Use Edit or search_replace to make required code changes.

3. Ensure changes follow project coding standards and best practices.

4. Add or update comments if complex logic is involved.

5. Handle edge cases and validate input as needed.

## 5. Write and Run Tests

1. Create or update unit tests to cover the fix or new functionality.

2. Execute test suite using appropriate test command (`npm test`, `pytest`, etc.).

3. Verify that new tests pass and existing tests remain unaffected.

4. Add integration tests if the change affects multiple components.

5. Test edge cases and error conditions.

## 6. Validate Code Quality

1. Run linting tools to ensure code style compliance.

2. Execute type checking if applicable (TypeScript, Python type hints, etc.).

3. Verify no new linter errors or warnings were introduced.

4. Check for any security vulnerabilities in the changes.

5. Ensure code coverage meets project standards.

## 7. Create Descriptive Commit

1. Stage all modified files using `git add`.

2. Create commit message following conventional commit format with appropriate emoji.

3. Include issue reference in commit message (e.g., "fix: resolve authentication bug (fixes #123)").

4. Provide clear description of what was changed and why.

5. Document any trade-offs or implementation decisions in commit body if needed.

</detailed_sequence_steps>

</task>
