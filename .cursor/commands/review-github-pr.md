<task name="Review GitHub PR">

<task_objective>
Perform a comprehensive review of a GitHub Pull Request using automated tools and best practices. This command helps analyze PR changes, identify potential issues, and generate detailed review reports.
</task_objective>

<how_to_ask_followup_question>
<question>Do you have a specific PR number you want to review, or would you like to list open PRs first?</question>
<options>["I have a PR number", "List open PRs"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Review GitHub PR Process - Detailed Sequence of Steps

## 1. Understand the Request

1. If the PR number was not provided, ask the user for it.
2. If the user wants to list open PRs, use `gh pr list` to show available options, then ask for the PR number.

## 2. Prepare the Environment

1. **Plan:** Determine the command needed to check out the PR branch.
2. **Execute:** Use the GitHub CLI: `gh pr checkout <PR_NUMBER>`
3. **Reflect:** Confirm the checkout was successful.
4. **Plan:** Determine the command to identify the current branch name.
5. **Execute:** Run `git rev-parse --abbrev-ref HEAD`. Store this branch name.
6. **Reflect:** Confirm the branch name was retrieved.

## 3. Gather Changes

1. **Plan:** Identify the main branch name (e.g., `main` or `master`). If unsure, confirm with the user. Plan the `git diff` command.
2. **Execute:** Run `git diff <MAIN_BRANCH_NAME>...<CURRENT_BRANCH_NAME>`. Ensure you use the correct main branch name and the retrieved branch name.
3. **Reflect:** Verify that the diff output was captured successfully.

## 4. Analyze Changes

1. **Plan:** Outline the approach for analyzing the diff output based on the criteria below.
2. **Execute & Reflect:** Review the diff output methodically. Identify potential areas of concern, including:
   - Possible bugs or logic errors (e.g., off-by-one, incorrect conditions)
   - Breaking changes impacting other parts of the system
   - Complex logic requiring deeper scrutiny
   - Missing or inadequate tests for new/modified code
   - Deviations from project coding standards or best practices
   - Potential security vulnerabilities (e.g., improper input validation, sensitive data exposure)
   - Insufficient error handling
   - Readability or maintainability issues

## 5. Generate Review Report

1. **Plan:** Structure the review report.
2. **Execute:**
   - Provide a concise, clear report to the user.
   - Start with a high-level summary of what the PR does and its intent.
   - Highlight any complex, non-obvious, or risky changes.
   - Highlight specific files, line numbers, or code sections that require attention.
   - Explain *why* each flagged area is a concern.
   - Summarize the overall state of the PR.
3. **Reflect:** Ensure the report is comprehensive and directly addresses the findings.

</detailed_sequence_steps>

</task>
