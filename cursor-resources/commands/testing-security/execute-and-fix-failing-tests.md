<task name="Execute and Fix Failing Tests">

<task_objective>
Execute the complete test suite and systematically fix any failing tests by analyzing error messages, identifying patterns, and addressing failures one at a time until all tests pass. The output will be a fully passing test suite with verified fixes that don't introduce new failures.
</task_objective>

<detailed_sequence_steps>
# Execute and Fix Failing Tests - Detailed Sequence of Steps

## 1. Identify Test Command

1. Check the project's package manager and test configuration:
   - Look for `package.json` to determine if using npm, pnpm, or yarn
   - Identify the test script command defined in the scripts section
   - Note any test-related configuration files (jest.config.js, vitest.config.ts, etc.)

2. Determine the appropriate test command to run the full suite.

## 2. Run Full Test Suite

1. Execute the test command in the terminal:
   ```bash
   npm test
   # or
   pnpm test
   # or
   yarn test
   ```

2. Allow the test suite to run completely without interruption.

3. Capture the full output including all failures, errors, and summary statistics.

## 3. Analyze Test Failures

1. Read all error messages carefully and document each failure:
   - Test file name and line number
   - Test description/name
   - Failure reason and error message
   - Stack trace if available

2. Identify patterns in failures:
   - Are multiple tests failing in the same file?
   - Are failures related to a common component or module?
   - Is there a specific type of failure (assertion, timeout, syntax)?

3. Group related failures together for efficient fixing.

4. Prioritize failures from simplest to most complex.

## 4. Fix Failures One at a Time

1. Select the first failure to address (start with simplest).

2. For each failure, determine the root cause:
   - Read the test code to understand what it expects
   - Examine the implementation code being tested
   - Check if the test expectations are still valid
   - Identify if this is a code issue or test issue

3. Decide on the appropriate fix:
   - If implementation is wrong: Fix the code
   - If test is outdated: Update the test
   - If snapshot is stale: Update the snapshot carefully
   - If environment issue: Fix test setup or configuration

4. Implement the fix:
   - Make minimal, targeted changes
   - Ensure the fix addresses the root cause, not just the symptom

5. Run the test suite again to verify:
   - The specific test now passes
   - No new failures were introduced
   - No previously passing tests broke

6. If the fix introduces new failures, investigate and adjust.

7. Move to the next failure only after current test is green.

## 5. Handle Common Issues

1. **Outdated snapshots:**
   - Review the snapshot diff carefully
   - Verify the changes are intentional
   - Update snapshots only if changes are correct

2. **Race conditions:**
   - Add proper async/await handling
   - Use appropriate waitFor or flush promises utilities
   - Ensure proper test cleanup

3. **Environment issues:**
   - Check test setup and teardown
   - Verify mock data and fixtures
   - Ensure proper isolation between tests

4. **Flaky tests:**
   - Investigate root cause (timing, shared state, etc.)
   - Fix the underlying issue rather than just re-running
   - Consider adding appropriate waits or cleanup

## 6. Final Verification

1. Run the full test suite one final time after all fixes are applied.

2. Verify that:
   - All tests pass
   - No new failures were introduced
   - Test output shows expected number of tests

3. Check test coverage if applicable:
   - Run coverage command if available
   - Ensure coverage hasn't decreased significantly
   - Verify critical paths are covered

4. Provide summary to user:
   - Total tests fixed
   - Any remaining issues or concerns
   - Coverage status if applicable

</detailed_sequence_steps>

</task>
