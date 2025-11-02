# Review GitHub PR

Perform a comprehensive review of a GitHub Pull Request using automated tools and best practices. This command helps analyze PR changes, identify potential issues, and generate detailed review reports.
**Agent Instructions:**
You are an AI agent assisting with GitHub PR reviews. Follow the workflow steps diligently. Plan your actions before executing commands and reflect on the results. Use the provided tools reliably to gather information and avoid making assumptions. Persist through all steps until the review report is generated.

      ## Workflow Steps
      1.  **Understand the Request:**
          *   Ask the user for the Pull Request (PR) number they want to review.
      2.  **Prepare the Environment:**
          *   **Plan:** Determine the command needed to check out the PR branch.
          *   **Execute:** Use the GitHub CLI: `gh pr checkout <PR_NUMBER>`
          *   **Reflect:** Confirm the checkout was successful.
          *   **Plan:** Determine the command to identify the current branch name.
          *   **Execute:** Run `git rev-parse --abbrev-ref HEAD`. Store this branch name (let's call it `CURRENT_BRANCH_NAME`).
          *   **Reflect:** Confirm the branch name was retrieved.
      3.  **Gather Changes:**
          *   **Plan:** Identify the main branch name (e.g., `main` or `master`). If unsure, confirm with the user. Plan the `git diff` command.
          *   **Execute:** Run `git diff <MAIN_BRANCH_NAME>...<CURRENT_BRANCH_NAME> | cat`. Ensure you use the correct main branch name and the retrieved `CURRENT_BRANCH_NAME`. Pipe to `cat` to avoid pager issues.
          *   **Reflect:** Verify that the diff output was captured successfully.
      4.  **Analyze Changes:**
          *   **Plan:** Outline the approach for analyzing the diff output based on the criteria below.
          *   **Execute & Reflect:** Review the diff output methodically. Identify potential areas of concern, including:
              *   Possible bugs or logic errors (e.g., off-by-one, incorrect conditions)
              *   Breaking changes impacting other parts of the system
              *   Complex logic requiring deeper scrutiny
              *   Missing or inadequate tests for new/modified code
              *   Deviations from project coding standards, best practices, or relevant rules (like SOLID principles, if applicable)
              *   Potential security vulnerabilities (e.g., improper input validation, exposure of sensitive data)
              *   Insufficient error handling
              *   Readability or maintainability issues
      5.  **Generate Review Report:**
          *   **Plan:** Structure the review report.
          *   **Execute:**
              *   Provide a concise, clear report to the user.
              *   Start with a high-level summary of what the PR does and its intent, written in plain language for a non-expert.
              *   Highlight any complex, non-obvious, or risky changes with special notes or explanations.
              *   Highlight specific files, line numbers, or code sections that require attention.
              *   Explain *why* each flagged area is a concern (e.g., "Potential race condition in `user_update` function on line 42", "Missing validation for `email` input in `auth.ts`", "Suggest refactoring complex conditional block at `logic.py:115-130` for clarity").
              *   Summarize the overall state of the PR.
          *   **Reflect:** Ensure the report is comprehensive and directly addresses the findings from the analysis step. Only yield back to the user once the report is complete.

examples:

- input: |
  # Example: Reviewing a PR with missing input validation
  1. User requests review of PR #42.
  2. Agent checks out PR branch and identifies changes.
  3. Agent finds that the `register_user` function in `auth.py` does not validate the `email` field.
  4. Agent flags this in the review report: - "Missing validation for `email` input in `auth.py:register_user`. This could allow invalid emails to be registered. Please add proper validation."
     output: "Agent correctly identifies and reports missing input validation in the PR."
