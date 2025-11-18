<task name="Analyze GitHub PR Quality">

<task_objective>
Perform a comprehensive review of a GitHub Pull Request using automated tools and best practices by checking out the PR branch, analyzing the diff against main, identifying potential issues across code quality, security, testing, and maintainability dimensions, and generating a detailed review report that highlights specific concerns with file locations and line numbers.
</task_objective>

<detailed_sequence_steps>
# Analyze GitHub PR Quality - Detailed Sequence of Steps

## Overview

You are assisting with GitHub PR reviews. Follow this workflow diligently, planning actions before executing and reflecting on results. Use tools reliably to gather information and avoid assumptions. Persist through all steps until the review report is generated.

## 1. Understand the Request

1. Ask the user for the Pull Request (PR) number they want to review.

2. Confirm the PR number before proceeding.

## 2. Prepare the Environment

1. Plan the command to check out the PR branch.

2. Execute using GitHub CLI:
   ```bash
   gh pr checkout <PR_NUMBER>
   ```

3. Confirm the checkout was successful.

4. Determine the current branch name:
   ```bash
   git rev-parse --abbrev-ref HEAD
   ```

5. Store this branch name (e.g., `CURRENT_BRANCH_NAME`).

6. Verify the branch name was retrieved successfully.

## 3. Gather Changes

1. Identify the main branch name (typically `main` or `master`):
   - If unsure, confirm with the user

2. Plan the `git diff` command to compare branches.

3. Execute the diff:
   ```bash
   git diff <MAIN_BRANCH_NAME>...<CURRENT_BRANCH_NAME> | cat
   ```

4. Use correct main branch name and retrieved `CURRENT_BRANCH_NAME`.

5. Pipe to `cat` to avoid pager issues.

6. Verify the diff output was captured successfully.

## 4. Analyze Changes

Review the diff output methodically based on these criteria:

### Possible Bugs or Logic Errors
- Off-by-one errors
- Incorrect conditional logic
- Null pointer dereferences
- Type mismatches
- Infinite loops
- Resource leaks

### Breaking Changes
- API signature changes
- Removed public methods or properties
- Changed data structures
- Modified configuration requirements
- Database schema incompatibilities

### Complex Logic Requiring Scrutiny
- Nested conditionals (>3 levels)
- Long functions (>50 lines)
- Complex algorithms
- Intricate state management
- Non-obvious business logic

### Missing or Inadequate Tests
- New code without corresponding tests
- Modified functions without updated tests
- Edge cases not covered
- Integration points not tested
- Low test coverage for critical paths

### Coding Standards Deviations
- Inconsistent naming conventions
- Improper code organization
- Missing documentation
- Violation of SOLID principles
- Anti-patterns

### Potential Security Vulnerabilities
- SQL injection risks
- XSS vulnerabilities
- Improper input validation
- Exposed sensitive data (credentials, tokens, PII)
- Inadequate authentication/authorization
- Insecure cryptographic practices

### Insufficient Error Handling
- Uncaught exceptions
- Silent failures
- Generic error messages
- Missing validation
- Lack of retry logic
- No fallback mechanisms

### Readability or Maintainability Issues
- Unclear variable names
- Magic numbers
- Duplicated code
- Missing comments for complex logic
- Inconsistent formatting
- Poor separation of concerns

## 5. Generate Review Report

Structure the review report with the following sections:

### High-Level Summary

Start with a concise explanation of what the PR does and its intent, written in plain language.

**Example:**
```markdown
## Summary
This PR refactors the authentication system to use JWT tokens instead of session-based authentication. The change aims to improve scalability and enable stateless authentication across distributed services.
```

### Critical Issues

Highlight significant problems that must be addressed before merge.

**Format:** `[Severity] Issue in file:line - Description`

**Example:**
```markdown
## Critical Issues
- [HIGH] Potential SQL injection in `auth.py:42` - User input is concatenated directly into query string without parameterization
- [HIGH] Exposed API key in `config.js:15` - Hardcoded API key should be moved to environment variable
```

### Major Concerns

List important issues that should be addressed but may not block merge.

**Example:**
```markdown
## Major Concerns
- [MEDIUM] Missing input validation in `user_service.py:78` - Email field is not validated before processing
- [MEDIUM] Complex conditional block in `logic.py:115-130` - Suggest refactoring for clarity and testability
```

### Minor Issues

Note smaller improvements or style issues.

**Example:**
```markdown
## Minor Issues
- [LOW] Inconsistent naming in `utils.ts:23` - Function uses camelCase while rest of file uses snake_case
- [LOW] Missing error handling in `api_client.py:56` - Network request lacks try-except block
```

### Testing Gaps

Identify missing or inadequate test coverage.

**Example:**
```markdown
## Testing Gaps
- No tests for error scenarios in `AuthController.login()`
- Missing integration tests for JWT token refresh flow
- Edge case not covered: expired tokens with concurrent requests
```

### Positive Observations

Highlight good practices or well-implemented features.

**Example:**
```markdown
## Positive Observations
- Excellent error handling in `payment_service.py`
- Clear separation of concerns in new service layer
- Comprehensive documentation for new API endpoints
```

### Overall Assessment

Summarize the state of the PR and provide a recommendation.

**Example:**
```markdown
## Overall Assessment
The PR introduces valuable improvements to the authentication system. However, there are critical security issues (SQL injection, exposed credentials) that must be addressed before merge. Once these are resolved and appropriate tests are added, this will be a solid contribution.

**Recommendation:** Request changes
```

## 6. Present Review Report

1. Provide the complete, well-formatted review report to the user.

2. Ensure the report is comprehensive and directly addresses findings from analysis.

3. Only yield back to user once the report is complete.

## Quality Standards

Ensure your review:

**Is Specific:**
- [ ] References exact file names and line numbers
- [ ] Provides concrete examples of issues
- [ ] Explains why each flagged area is a concern

**Is Constructive:**
- [ ] Offers suggestions for improvement
- [ ] Explains the reasoning behind recommendations
- [ ] Balances criticism with positive observations

**Is Actionable:**
- [ ] Clearly categorizes issues by severity
- [ ] Prioritizes what must be fixed vs. what's optional
- [ ] Provides clear next steps

**Is Complete:**
- [ ] Covers all critical aspects (bugs, security, tests, maintainability)
- [ ] Addresses both code and architecture concerns
- [ ] Includes overall assessment and recommendation

## Example Complete Review Report

```markdown
# PR Review: Implement User Profile Caching

## Summary
This PR introduces Redis-based caching for user profiles to improve login performance. The implementation adds a cache layer between the authentication controller and the database, with TTL-based expiration and cache invalidation on profile updates.

## Critical Issues
- [HIGH] Race condition in `cache/profile_cache.py:67` - Multiple concurrent updates could lead to cache inconsistency. Recommend implementing distributed locking or optimistic locking pattern.
- [HIGH] Exposed Redis password in `config/cache.py:12` - Move to environment variable immediately.

## Major Concerns
- [MEDIUM] Missing cache stampede protection in `profile_cache.py:45` - When cache expires, multiple simultaneous requests will hit the database. Consider implementing request coalescing.
- [MEDIUM] Insufficient error handling in `AuthController.login():89` - If Redis is down, the application crashes instead of falling back to direct database access.

## Minor Issues
- [LOW] Inconsistent naming in `profile_cache.py` - Mix of `get_user` and `fetch_profile` for similar operations. Standardize naming.
- [LOW] Magic number in `profile_cache.py:23` - TTL of 3600 should be a named constant.

## Testing Gaps
- No tests for Redis connection failure scenarios
- Missing load tests for cache stampede scenario
- Edge case not covered: Profile updates during active cache read

## Positive Observations
- Excellent separation of concerns with dedicated cache layer
- Clear documentation of cache invalidation strategy
- Good use of type hints throughout new code
- Proper logging for cache hit/miss metrics

## Overall Assessment
This PR provides valuable performance improvements, but has critical issues around concurrency and error handling that must be addressed. The race condition and missing fallback mechanism could cause production issues. Once these are resolved and appropriate tests added, this will be a solid improvement.

**Recommendation:** Request changes

**Priority fixes:**
1. Implement proper concurrency control for cache updates
2. Add fallback mechanism for Redis failures
3. Move credentials to environment variables
4. Add tests for failure scenarios
```

## Success Criteria

The review is complete when:
- PR has been checked out and analyzed
- All significant issues are identified with specific locations
- Review report covers all quality dimensions
- Issues are categorized by severity
- Specific, actionable recommendations are provided
- Overall assessment and recommendation are clear
- User has comprehensive understanding of PR quality

</detailed_sequence_steps>

</task>
