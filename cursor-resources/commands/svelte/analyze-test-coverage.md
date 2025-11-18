<task name="Analyze Test Coverage">

<task_objective>
Analyze test coverage, identify testing gaps, and provide recommendations for improving test coverage in Svelte/SvelteKit projects. Input: Project codebase, existing test files, coverage reports, and testing infrastructure. Process: Run coverage analysis tools, examine coverage metrics, identify untested components and functions, categorize gaps by criticality, and generate prioritized testing recommendations. Output: Comprehensive coverage report with identified gaps, priority matrix for test implementation, specific test recommendations with examples, coverage improvement plan with effort estimates, and target coverage thresholds.
</task_objective>

<detailed_sequence_steps>
# Analyze Test Coverage - Detailed Sequence of Steps

## 1. Assess Current Testing Infrastructure

1. Check for testing framework installation:
   - Vitest for unit/component tests
   - Playwright for E2E tests
   - Coverage tools (c8, istanbul)

2. Review existing test files:
   - Component tests (*.test.ts, *.spec.ts)
   - E2E tests (*.spec.ts in tests/)
   - Integration tests

3. Check for coverage configuration:
   - Coverage reporters configured
   - Coverage thresholds set
   - Excluded files/directories

4. Identify test patterns used in project.

## 2. Run Coverage Analysis

1. Execute coverage report generation:
   ```bash
   npm run test:coverage
   ```

2. If coverage not configured, set up coverage in vitest.config.js:
   ```javascript
   export default defineConfig({
     test: {
       coverage: {
         provider: 'c8',
         reporter: ['text', 'html', 'lcov', 'json'],
         exclude: [
           'node_modules/',
           '.svelte-kit/',
           'tests/',
           '**/*.config.js'
         ]
       }
     }
   });
   ```

3. Generate fresh coverage report.

4. Open HTML coverage report for visual analysis.

## 3. Analyze Coverage Metrics

1. Review overall coverage percentages:
   - Statements coverage
   - Branch coverage
   - Function coverage
   - Line coverage

2. Identify files with low coverage (<80%):
   - List all files below threshold
   - Note current coverage percentage for each
   - Identify completely untested files (0%)

3. Examine branch coverage gaps:
   - Find conditional statements without full branch coverage
   - Identify error handling paths not tested
   - Note ternary operations without coverage

4. Review function coverage:
   - List functions never executed in tests
   - Identify exported functions without tests
   - Find callback functions not tested

## 4. Identify Component Testing Gaps

1. List all Svelte components in project.

2. For each component, check for:
   - Component test file existence
   - Props testing coverage (all props tested with various values)
   - Event handler coverage (all dispatched events tested)
   - Conditional rendering paths (all {#if} branches tested)
   - Slot usage testing
   - Reactive statement coverage
   - Edge cases (empty states, error states, loading states)

3. Categorize untested components:
   - Critical user-facing components
   - Reusable UI components
   - Form components
   - Layout components
   - Presentational components

4. Document specific untested scenarios for each component.

## 5. Identify Route Testing Gaps

1. List all SvelteKit routes (pages, layouts, errors).

2. For each route, check for:
   - Load function testing
   - Form action testing
   - Error boundary testing
   - Authentication/authorization flow testing
   - Data validation testing
   - Server-side logic testing

3. Identify untested load functions:
   - +page.server.ts load functions
   - +layout.server.ts load functions
   - API route handlers

4. Find form actions without tests:
   - Form submission handlers
   - Validation logic
   - Error handling

5. Check error handling coverage:
   - 404 error handling
   - 500 error handling
   - Custom error pages

## 6. Identify Business Logic Gaps

1. Examine stores for test coverage:
   - Writable stores
   - Readable stores
   - Derived stores
   - Custom stores
   - Store update functions

2. Review utility functions:
   - Pure utility functions (formatters, validators, transformers)
   - Helper functions
   - Data processing functions

3. Check API integration coverage:
   - API client functions
   - Request/response handling
   - Error handling and retry logic
   - Mock API responses in tests

4. Examine state management:
   - State transitions
   - Side effects
   - Subscriptions

## 7. Create Priority Matrix

1. Categorize identified gaps by priority:

   **High Priority (Critical - Must Test):**
   - Core user flows (registration, login, checkout)
   - Payment/transaction processing
   - Authentication and authorization
   - Data mutations and writes
   - Security-critical functions
   - Form validation and submission

   **Medium Priority (Important - Should Test):**
   - UI component variations and states
   - Form field validations
   - Navigation flows
   - Data transformations
   - Error handling
   - API integrations

   **Low Priority (Nice to Have - Could Test):**
   - Static content components
   - Simple presentational components
   - Pure utility functions with simple logic
   - Style variations

2. Assign criticality scores (1-10) to each untested area.

3. Consider business impact of gaps:
   - Revenue impact
   - User experience impact
   - Security implications
   - Compliance requirements

## 8. Calculate Risk Assessment

1. For each gap, assess risk:
   - Probability of failure (High/Medium/Low)
   - Impact of failure (High/Medium/Low)
   - Risk score = Probability × Impact

2. Identify high-risk untested areas.

3. Consider recent bugs in untested code as high priority.

4. Factor in code complexity (cyclomatic complexity).

## 9. Generate Test Recommendations

1. For each identified gap, provide specific recommendation:
   - What to test
   - Type of test needed (unit, integration, E2E)
   - Example test scenario
   - Expected coverage improvement

2. Create example test templates:
   ```typescript
   // Example: Test Button component
   import { render, fireEvent } from '@testing-library/svelte';
   import { describe, it, expect, vi } from 'vitest';
   import Button from './Button.svelte';

   describe('Button', () => {
     it('handles click events', async () => {
       const handleClick = vi.fn();
       const { getByRole } = render(Button, { 
         props: { onClick: handleClick }
       });
       
       await fireEvent.click(getByRole('button'));
       expect(handleClick).toHaveBeenCalledOnce();
     });

     it('renders disabled state', () => {
       const { getByRole } = render(Button, { 
         props: { disabled: true }
       });
       expect(getByRole('button')).toBeDisabled();
     });
   });
   ```

3. Provide E2E test examples for critical user flows.

4. Show integration test patterns for complex features.

## 10. Estimate Testing Effort

1. For each priority category, estimate:
   - Number of test files to create
   - Approximate number of test cases
   - Estimated time to implement (hours/days)
   - Required testing expertise level

2. Create effort matrix:
   ```
   High Priority: 50 test cases, ~5 days
   Medium Priority: 100 test cases, ~8 days
   Low Priority: 80 test cases, ~6 days
   Total: 230 test cases, ~19 days
   ```

3. Consider team capacity and sprint planning.

## 11. Set Coverage Targets

1. Define realistic coverage targets based on project type:
   - Critical systems: 90%+ coverage
   - Standard applications: 80%+ coverage
   - Internal tools: 70%+ coverage

2. Set specific targets by file type:
   - Business logic: 95%+
   - Components: 85%+
   - Routes: 80%+
   - Utilities: 90%+

3. Configure coverage thresholds in vitest.config.js:
   ```javascript
   coverage: {
     statements: 80,
     branches: 75,
     functions: 80,
     lines: 80,
     perFile: true
   }
   ```

4. Plan gradual coverage improvement:
   - Phase 1: Critical gaps (bring to 60%)
   - Phase 2: High priority (bring to 75%)
   - Phase 3: Medium priority (bring to 85%)

## 12. Generate Visual Reports

1. Create coverage visualization:
   - HTML coverage report with color coding
   - Coverage badge for README
   - Trend graphs showing coverage over time

2. Generate gap analysis document:
   - List of untested files with current coverage
   - Priority categorization
   - Specific recommendations

3. Create coverage dashboard if applicable.

## 13. Provide Implementation Plan

1. Create phased implementation plan:
   - Week 1-2: High priority gaps
   - Week 3-4: Critical component gaps
   - Week 5-6: Medium priority gaps

2. Assign ownership for test implementation.

3. Set up coverage gates in CI/CD:
   - Fail builds if coverage drops below threshold
   - Require tests for new files
   - Track coverage trends

4. Schedule regular coverage reviews.

## 14. Document Findings and Recommendations

1. Create comprehensive coverage report document:
   - Executive summary with key metrics
   - Detailed gap analysis
   - Priority matrix
   - Implementation recommendations
   - Effort estimates
   - Timeline proposal

2. Include specific test examples for critical gaps.

3. Provide testing best practices guidance.

4. Document coverage improvement strategy.

5. Share report with team and stakeholders.

## 15. Set Up Continuous Monitoring

1. Configure CI/CD to generate coverage reports on every build.

2. Set up coverage tracking over time.

3. Configure automated alerts for coverage drops.

4. Schedule periodic coverage reviews (monthly/quarterly).

5. Update coverage targets as project matures.

</detailed_sequence_steps>

</task>

