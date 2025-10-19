<task name="Systematic Code Review Process">

<task_objective>
Guide the user through a systematic approach to reviewing pull requests and code changes. The workflow will analyze the code across multiple dimensions including quality, security, testing, and documentation, ultimately producing a comprehensive review assessment with actionable feedback.
</task_objective>

<detailed_sequence_steps>
# Systematic Code Review Process - Detailed Sequence of Steps

## 1. Initialize Review

1. Identify the pull request or code changes to be reviewed.

2. Gather context about the changes:
   - Review PR description and linked issues
   - Understand the purpose and scope of changes
   - Identify files modified and lines changed

3. Set up the review environment:
   - Checkout the branch locally if needed
   - Ensure all dependencies are installed
   - Verify the code builds successfully

## 2. Assess Code Quality - Readability

1. Review code for clarity and understandability:
   - Verify code is easy to understand
   - Check that variable names are descriptive
   - Ensure functions are small and focused
   - Confirm comments explain WHY, not WHAT

2. Document any readability issues found with specific line references.

3. Note patterns that improve or detract from code clarity.

## 3. Assess Code Quality - Architecture

1. Evaluate architectural decisions:
   - Verify changes follow existing patterns
   - Check for unnecessary complexity
   - Confirm proper separation of concerns
   - Validate that dependencies are justified

2. Identify any architectural concerns or improvements.

3. Consider long-term maintainability implications.

## 4. Assess Code Quality - Performance

1. Review for performance considerations:
   - Look for obvious performance issues
   - Verify database queries are optimized
   - Check for unnecessary re-renders (frontend code)
   - Confirm proper resource cleanup

2. Identify potential bottlenecks or inefficiencies.

3. Consider scalability implications of the changes.

## 5. Evaluate Security

1. Perform security assessment:
   - Verify no hardcoded secrets or credentials
   - Check input validation is present
   - Look for SQL injection vulnerabilities
   - Confirm authentication/authorization checks are in place

2. Document any security concerns with severity levels.

3. Suggest security improvements or mitigations.

## 6. Review Testing Coverage

1. Assess test quality and coverage:
   - Verify tests cover new functionality
   - Check that edge cases are tested
   - Confirm tests are maintainable
   - Validate all tests pass

2. Identify gaps in test coverage.

3. Run tests locally to verify functionality.

## 7. Verify Documentation

1. Check documentation completeness:
   - Verify README updated if needed
   - Confirm API documentation is current
   - Ensure complex logic is documented

2. Identify missing or outdated documentation.

3. Suggest documentation improvements.

## 8. Compile and Deliver Review

1. Consolidate all findings from previous steps.

2. Categorize feedback:
   - Critical issues (must fix before merge)
   - Important suggestions (should address)
   - Minor improvements (nice to have)

3. Provide clear, constructive feedback with examples.

4. Submit review with appropriate status:
   - Approve (if no critical issues)
   - Request changes (if critical issues found)
   - Comment (for discussion or minor suggestions)

</detailed_sequence_steps>

</task>
