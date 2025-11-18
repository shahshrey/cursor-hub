<task name="Fix Failing Tests">

<task_objective>
Troubleshoot and fix failing tests in Svelte/SvelteKit projects, including debugging test issues and resolving common testing problems. Input: Failing test output with error messages and stack traces, test files, and component/code under test. Process: Analyze test failures, identify failure patterns and root causes, apply appropriate fixes for timing issues, mocking problems, or test logic errors, verify fixes, and implement preventive measures. Output: All tests passing, fixed test files with proper assertions and setup, resolved timing and async issues, corrected mocks, improved test stability, and documentation of fixes with prevention strategies.
</task_objective>

<detailed_sequence_steps>
# Fix Failing Tests - Detailed Sequence of Steps

## 1. Gather Test Failure Information

1. Capture complete test output including:
   - Error messages
   - Stack traces
   - Failed assertion details
   - Test names and file locations

2. Run tests with verbose output:
   ```bash
   npm run test -- --reporter=verbose
   ```

3. Identify which tests are failing:
   - Specific test cases
   - Test suites
   - All tests in certain files

4. Note test failure consistency:
   - Always failing (consistent)
   - Sometimes failing (flaky)
   - Environment-specific (CI vs local)

5. Check recent code changes that might have caused failures.

## 2. Categorize Failure Type

1. Determine failure category:
   - Component rendering issues
   - Async timing problems
   - State management issues
   - DOM query failures
   - Mock/stub problems
   - Assertion errors
   - Setup/teardown issues
   - Environment configuration issues

2. Identify if failure is:
   - Test logic error (test is wrong)
   - Code regression (code is wrong)
   - Test infrastructure issue (setup is wrong)

3. Check for error patterns across multiple tests.

## 3. Diagnose Component Test Failures

1. For "Cannot access before initialization" errors:
   - Check component lifecycle order
   - Verify import statements
   - Look for circular dependencies
   - Check reactive statement execution order

2. For component not rendering:
   - Verify import paths are correct
   - Check required props are provided
   - Ensure component syntax is valid
   - Check for conditional rendering blocking

3. For reactive state not updating:
   - Add `await tick()` after state changes:
   ```typescript
   import { tick } from 'svelte';
   
   component.count = 5;
   await tick(); // Wait for DOM update
   expect(screen.getByText('5')).toBeInTheDocument();
   ```

4. For bindings not working:
   - Use `flushSync()` for immediate updates:
   ```typescript
   import { flushSync } from 'svelte';
   
   flushSync(() => {
     component.value = 'test';
   });
   ```

## 4. Fix Async and Timing Issues

1. Add proper waits for async operations:
   ```typescript
   import { waitFor } from '@testing-library/svelte';
   
   await waitFor(() => {
     expect(screen.getByText('Loaded')).toBeInTheDocument();
   });
   ```

2. Use `findBy` queries that wait automatically:
   ```typescript
   // Instead of getByText (throws immediately)
   const element = await screen.findByText('Async content');
   ```

3. For timing-sensitive tests, add explicit waits:
   ```typescript
   await new Promise(resolve => setTimeout(resolve, 100));
   ```

4. For animation/transition issues:
   - Mock timers:
   ```typescript
   import { vi } from 'vitest';
   
   vi.useFakeTimers();
   // ... test code
   vi.runAllTimers();
   vi.useRealTimers();
   ```

5. Ensure all promises are awaited:
   ```typescript
   await fireEvent.click(button);
   await tick();
   ```

## 5. Fix DOM Query Failures

1. Use more reliable query methods:
   ```typescript
   // Less reliable (text content specific)
   screen.getByText('Submit');
   
   // More reliable (role-based)
   screen.getByRole('button', { name: /submit/i });
   
   // Most reliable (test IDs)
   screen.getByTestId('submit-button');
   ```

2. Add data-testid attributes to components:
   ```svelte
   <button data-testid="submit-btn">Submit</button>
   ```

3. Use proper query variants:
   - `getBy*`: Throws error if not found (use for assertions)
   - `queryBy*`: Returns null if not found (use for checking absence)
   - `findBy*`: Returns promise (use for async elements)

4. Debug DOM structure:
   ```typescript
   const { debug } = render(Component);
   debug(); // Prints current DOM
   ```

## 6. Fix Mock and Stub Issues

1. Properly mock SvelteKit modules:
   ```typescript
   vi.mock('$app/navigation', () => ({
     goto: vi.fn(),
     invalidate: vi.fn()
   }));
   ```

2. Mock fetch for API calls:
   ```typescript
   global.fetch = vi.fn(() =>
     Promise.resolve({
       ok: true,
       json: async () => ({ data: 'mock' })
     })
   );
   ```

3. Reset mocks between tests:
   ```typescript
   import { beforeEach, afterEach } from 'vitest';
   
   beforeEach(() => {
     vi.clearAllMocks();
   });
   
   afterEach(() => {
     vi.restoreAllMocks();
   });
   ```

4. Verify mock calls correctly:
   ```typescript
   expect(mockFn).toHaveBeenCalledWith(expectedArg);
   expect(mockFn).toHaveBeenCalledTimes(1);
   ```

## 7. Fix Cleanup and Memory Leak Issues

1. Ensure components unmount properly:
   ```typescript
   const { unmount } = render(Component);
   // ... test code
   unmount(); // Clean up
   ```

2. Clean up event listeners:
   ```typescript
   import { cleanup } from '@testing-library/svelte';
   
   afterEach(() => {
     cleanup();
   });
   ```

3. Unsubscribe from stores in tests:
   ```typescript
   const unsubscribe = store.subscribe(value => {
     // ...
   });
   // ... test code
   unsubscribe();
   ```

4. Clear timers and intervals:
   ```typescript
   afterEach(() => {
     vi.clearAllTimers();
   });
   ```

## 8. Fix Module Resolution Issues

1. For module not found errors:
   - Check import paths match file locations
   - Verify aliases configured in vitest.config.js:
   ```javascript
   resolve: {
     alias: {
       $lib: path.resolve('./src/lib')
     }
   }
   ```

2. For SvelteKit module errors:
   - Mock required SvelteKit modules
   - Set up proper test environment

3. For TypeScript errors in tests:
   - Check tsconfig.json includes test files
   - Install @types packages for test libraries

## 9. Fix Assertion Errors

1. Review assertion logic for correctness:
   ```typescript
   // Check if assertion expectation is correct
   expect(result).toBe(expectedValue);
   ```

2. Use appropriate matchers:
   - `toBe` for primitives
   - `toEqual` for objects/arrays
   - `toMatch` for strings/regex
   - `toContain` for arrays/strings
   - `toHaveLength` for arrays

3. Add more specific error messages:
   ```typescript
   expect(result, 'User should be authenticated').toBe(true);
   ```

4. Check for order-dependent test failures:
   - Tests should be independent
   - Reset state between tests

## 10. Add Debugging to Tests

1. Add console logs strategically:
   ```typescript
   console.log('Component state:', component.$$.props);
   console.log('DOM:', container.innerHTML);
   ```

2. Use debug utilities:
   ```typescript
   const { debug, container } = render(Component);
   debug(container); // Print specific element
   ```

3. Inspect component context:
   ```typescript
   console.log('Context:', component.$$.context);
   ```

4. For Playwright tests, add debugging:
   ```typescript
   await page.pause(); // Interactive debugging
   await page.screenshot({ path: 'debug.png' });
   console.log(await page.content()); // Full page HTML
   ```

## 11. Fix Environment Configuration Issues

1. For browser API not available errors:
   - Check jsdom environment is configured:
   ```javascript
   // vitest.config.js
   test: {
     environment: 'jsdom'
   }
   ```

2. Mock unavailable browser APIs:
   ```typescript
   Object.defineProperty(window, 'matchMedia', {
     writable: true,
     value: vi.fn().mockImplementation(query => ({
       matches: false,
       media: query,
       addEventListener: vi.fn(),
       removeEventListener: vi.fn()
     }))
   });
   ```

3. Set up global test configuration:
   ```typescript
   // tests/setup.ts
   import { expect, afterEach } from 'vitest';
   import { cleanup } from '@testing-library/svelte';
   import * as matchers from '@testing-library/jest-dom/matchers';
   
   expect.extend(matchers);
   
   afterEach(() => {
     cleanup();
   });
   ```

## 12. Isolate and Fix Flaky Tests

1. Run flaky test multiple times to identify pattern:
   ```bash
   npm run test -- --run --reporter=verbose --repeat=10 flaky.test.ts
   ```

2. Common flaky test causes and fixes:
   - Race conditions: Add proper waits
   - Timing dependencies: Mock timers
   - Shared state: Ensure proper cleanup
   - Order dependence: Make tests independent

3. Add retry logic for inherently flaky operations:
   ```typescript
   import { retry } from '@testing-library/svelte';
   
   await retry(async () => {
     expect(await screen.findByText('Loaded')).toBeInTheDocument();
   });
   ```

## 13. Verify Fixes

1. Run failing test in isolation:
   ```bash
   npm run test -- path/to/test.ts
   ```

2. Run full test suite to check for regressions:
   ```bash
   npm run test
   ```

3. Run tests multiple times to verify stability:
   ```bash
   npm run test -- --run --repeat=5
   ```

4. Test in different environments if applicable:
   - Local development
   - CI environment
   - Different operating systems

## 14. Implement Prevention Strategies

1. Improve test stability:
   - Always use waitFor for async operations
   - Prefer findBy queries over getBy for async elements
   - Use data-testid for critical elements
   - Mock external dependencies consistently

2. Add test utilities for common patterns:
   ```typescript
   // tests/utils.ts
   export async function renderWithRouter(Component, props = {}) {
     return render(Component, {
       props,
       context: new Map([
         // Set up routing context
       ])
     });
   }
   ```

3. Create shared mock factory functions:
   ```typescript
   export function createMockUser(overrides = {}) {
     return {
       id: '123',
       email: 'test@example.com',
       ...overrides
     };
   }
   ```

4. Document test patterns and anti-patterns for team.

## 15. Document Fixes

1. Add comments explaining non-obvious test code:
   ```typescript
   // Wait for async store update before asserting
   await tick();
   ```

2. Document why certain mocks are needed.

3. Update test documentation with lessons learned.

4. Share fix patterns with team in knowledge base.

5. Create test improvement tickets for systemic issues.

</detailed_sequence_steps>

</task>

