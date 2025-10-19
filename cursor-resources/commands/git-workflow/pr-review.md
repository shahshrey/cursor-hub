<task name="Comprehensive PR Review">

<task_objective>
Conduct thorough multi-perspective code review of a pull request and update GitHub with comprehensive feedback. Input: PR link or number. Processing: Execute six specialized reviews (Product Manager, Developer, Quality Engineer, Security Engineer, DevOps, UI/UX Designer), identify all improvements needed, implement fixes immediately. Output: Complete GitHub review comment with all perspectives addressed, all identified improvements implemented immediately without deferrals.
</task_objective>

<detailed_sequence_steps>
# Comprehensive PR Review - Detailed Sequence of Steps

## 1. Product Manager Review

1. Fetch PR details using `gh pr view <PR-NUMBER>` to understand proposed changes.

2. Assess business value by analyzing how the PR advances core product goals and delivers immediate ROI.

3. Evaluate user experience impact ensuring changes are intuitive and delightful for users.

4. Verify strategic alignment with current and long-term product objectives.

5. Identify any user experience issues and implement fixes immediately.

6. Document product-level directives for maximum user and business impact.

## 2. Developer Review

1. Read all modified files to understand code changes comprehensively.

2. Evaluate code quality and maintainability checking for readability, proper structure, and ease of maintenance.

3. Assess performance and scalability ensuring changes operate efficiently at scale.

4. Verify adherence to best practices and coding standards.

5. Identify any deviations from standards and refactor code immediately.

6. Check for code duplication, unused variables, and optimization opportunities.

7. Implement all code quality improvements immediately without deferring to future PRs.

## 3. Quality Engineer Review

1. Analyze test coverage checking for sufficient unit tests, integration tests, and E2E tests.

2. Add missing tests immediately if coverage is insufficient.

3. Identify potential bugs and edge cases that haven't been addressed.

4. Implement handling for all edge cases immediately.

5. Assess regression risk by verifying changes don't undermine existing functionality.

6. Add additional checks or tests immediately if regression risks are identified.

7. Execute test suite to validate all tests pass.

## 4. Security Engineer Review

1. Scan code changes for potential security vulnerabilities (injection attacks, XSS, authentication issues).

2. Fix any identified vulnerabilities immediately.

3. Verify proper data handling including encryption, sanitization, and validation.

4. Address all data security gaps immediately.

5. Confirm compliance with security and privacy standards (OWASP, GDPR, HIPAA).

6. Implement missing security requirements immediately.

7. Check for exposed secrets, API keys, or sensitive data in code.

## 5. DevOps Review

1. Validate PR integrates smoothly with existing CI/CD pipeline.

2. Fix any integration issues immediately.

3. Check if code changes require updates to infrastructure or configuration files.

4. Update infrastructure and configs immediately if needed.

5. Identify new monitoring needs or potential improvements to observability.

6. Implement monitoring enhancements immediately.

7. Verify build and deployment processes work correctly with changes.

## 6. UI/UX Designer Review

1. Assess visual consistency confirming adherence to brand and design guidelines.

2. Adjust any visual inconsistencies immediately.

3. Validate usability and accessibility compliance ensuring UI is intuitive and meets accessibility standards.

4. Make accessibility corrections immediately.

5. Evaluate interaction flow to ensure user flow is seamless.

6. Refine any friction points in user experience immediately.

7. Test responsive design if applicable.

## 7. Implement All Improvements Immediately

1. For each issue identified across all review perspectives, implement fixes immediately.

2. Use Edit or search_replace to make necessary code changes.

3. Add or update tests to cover all changes.

4. Run linting and type checking to ensure code quality.

5. Execute full test suite to verify no regressions.

6. Stage and commit all improvements using conventional commit format.

## 8. Update GitHub with Review

1. Compile comprehensive review feedback from all six perspectives.

2. Document all improvements that were implemented.

3. Use `gh pr review <PR-NUMBER>` to submit review comment.

4. Include specific line comments for critical areas if needed.

5. Mark review as "Approve" if all issues addressed or "Request changes" if manual intervention needed.

</detailed_sequence_steps>

</task>
