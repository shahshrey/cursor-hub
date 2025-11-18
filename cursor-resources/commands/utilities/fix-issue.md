<task name="Fix Issue">

<task_objective>
Identify and resolve code issues by analyzing issue details from GitHub, reproducing the problem, performing root cause analysis, designing and implementing solutions, testing thoroughly, and creating pull requests with proper documentation. Accepts issue reference via $ARGUMENTS.
</task_objective>

<detailed_sequence_steps>
# Fix Issue - Detailed Sequence of Steps

## 1. Issue Analysis

1. Use `gh issue view $ARGUMENTS` to get complete issue details

2. Read the issue description, comments, and any attached logs/screenshots

3. Identify the type of issue (bug, feature request, enhancement, etc.)

4. Understand the expected vs actual behavior

## 2. Environment Setup

1. Ensure you're on the correct branch (usually main/master)

2. Pull latest changes: `git pull origin main`

3. Create a new feature branch: `git checkout -b fix/issue-$ARGUMENTS`

## 3. Reproduce the Issue

1. Follow the steps to reproduce described in the issue

2. Set up the development environment if needed

3. Run the application/tests to confirm the issue exists

4. Document the current behavior

## 4. Root Cause Analysis

1. Search the codebase for relevant files and functions

2. Use grep/search tools to locate the problematic code

3. Analyze the code logic and identify the root cause

4. Check for related issues or similar patterns

## 5. Solution Design

1. Design a fix that addresses the root cause, not just symptoms

2. Consider edge cases and potential side effects

3. Ensure the solution follows project conventions and patterns

4. Plan for backward compatibility if needed

## 6. Implementation

1. Implement the fix with clean, readable code

2. Follow the project's coding standards and style

3. Add appropriate error handling and logging

4. Keep changes minimal and focused

## 7. Testing Strategy

1. Write or update tests to cover the fix

2. Ensure existing tests still pass

3. Test edge cases and error conditions

4. Run the full test suite to check for regressions

## 8. Code Quality Checks

1. Run linting and formatting tools

2. Perform static analysis if available

3. Check for security implications

4. Ensure performance isn't negatively impacted

## 9. Documentation Updates

1. Update relevant documentation if needed

2. Add or update code comments for clarity

3. Update changelog if the project maintains one

4. Document any breaking changes

## 10. Commit and Push

1. Stage the changes: `git add .`

2. Create a descriptive commit message following project conventions

3. Example: `fix: resolve issue with user authentication timeout (#$ARGUMENTS)`

4. Push the branch: `git push origin fix/issue-$ARGUMENTS`

## 11. Create Pull Request

1. Use `gh pr create` to create a pull request

2. Reference the issue in the PR description: "Fixes #$ARGUMENTS"

3. Provide a clear description of the changes and testing performed

4. Add appropriate labels and reviewers

## 12. Follow-up

1. Monitor the PR for feedback and requested changes

2. Address any review comments promptly

3. Update the issue with progress and resolution

4. Ensure CI/CD checks pass

## 13. Verification

1. Once merged, verify the fix in the main branch

2. Close the issue if not automatically closed

3. Monitor for any related issues or regressions

## 14. Important Principles

Remember to communicate clearly in both code and comments, and always prioritize maintainable solutions over quick fixes.

</detailed_sequence_steps>

</task>
