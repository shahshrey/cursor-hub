<task name="Setup Testing Infrastructure">

<task_objective>
Set up comprehensive testing infrastructure for Svelte/SvelteKit projects, including unit testing, component testing, and E2E testing frameworks. Input: SvelteKit project structure, testing requirements (unit, integration, E2E), and preferred testing tools. Process: Assess current state, install and configure Vitest for unit/component tests, install and configure Playwright for E2E tests, set up test helpers and utilities, configure coverage reporting, create test structure, and add npm scripts. Output: Complete testing infrastructure with Vitest and Playwright configured, test setup files and helpers, example tests demonstrating patterns, npm scripts for all test types, coverage reporting enabled, and CI/CD integration ready.
</task_objective>

<detailed_sequence_steps>
# Setup Testing Infrastructure - Detailed Sequence of Steps

## 1. Assess Current Project State

1. Check for existing test setup:
   - Review package.json for test dependencies
   - Look for test configuration files
   - Identify existing test files and patterns
   - Check for test scripts in package.json

2. Identify SvelteKit version and project structure.

3. Determine testing requirements:
   - Unit testing needed
   - Component testing needed
   - E2E testing needed
   - API testing needed
   - Coverage requirements

4. Review project dependencies that may need mocking.

## 2. Install Vitest Dependencies

1. Install core Vitest packages:
   ```bash
   npm install -D vitest @vitest/ui
   ```

2. Install Testing Library for Svelte:
   ```bash
   npm install -D @testing-library/svelte @testing-library/jest-dom @testing-library/user-event
   ```

3. Install jsdom for browser environment simulation:
   ```bash
   npm install -D jsdom
   ```

4. Install coverage tools:
   ```bash
   npm install -D @vitest/coverage-v8
   ```

5. Verify all dependencies installed successfully.

## 3. Configure Vitest

1. Create `vitest.config.js` or `vitest.config.ts`:
   ```javascript
   import { sveltekit } from '@sveltejs/kit/vite';
   import { defineConfig } from 'vitest/config';
   
   export default defineConfig({
     plugins: [sveltekit()],
     test: {
       environment: 'jsdom',
       globals: true,
       setupFiles: ['./src/tests/setup.ts'],
       include: ['src/**/*.{test,spec}.{js,ts}'],
       coverage: {
         provider: 'v8',
         reporter: ['text', 'html', 'lcov', 'json'],
         exclude: [
           'node_modules/',
           'src/tests/setup.ts',
           '**/*.config.{js,ts}',
           '**/*.spec.{js,ts}',
           '.svelte-kit/'
         ],
         all: true,
         statements: 80,
         branches: 75,
         functions: 80,
         lines: 80
       }
     },
     resolve: {
       alias: {
         $lib: '/src/lib'
       }
     }
   });
   ```

2. Configure TypeScript support if using TypeScript:
   - Ensure vitest types are in tsconfig.json:
   ```json
   {
     "compilerOptions": {
       "types": ["vitest/globals", "@testing-library/jest-dom"]
     }
   }
   ```

3. Verify configuration loads without errors.

## 4. Create Test Setup File

1. Create `src/tests/setup.ts`:
   ```typescript
   import { expect, afterEach, vi } from 'vitest';
   import { cleanup } from '@testing-library/svelte';
   import * as matchers from '@testing-library/jest-dom/matchers';
   
   expect.extend(matchers);
   
   afterEach(() => {
     cleanup();
     vi.clearAllMocks();
   });
   
   Object.defineProperty(window, 'matchMedia', {
     writable: true,
     value: vi.fn().mockImplementation(query => ({
       matches: false,
       media: query,
       onchange: null,
       addListener: vi.fn(),
       removeListener: vi.fn(),
       addEventListener: vi.fn(),
       removeEventListener: vi.fn(),
       dispatchEvent: vi.fn()
     }))
   });
   ```

2. Mock SvelteKit modules if needed:
   ```typescript
   vi.mock('$app/environment', () => ({
     browser: true,
     dev: true,
     building: false
   }));
   
   vi.mock('$app/navigation', () => ({
     goto: vi.fn(),
     invalidate: vi.fn(),
     invalidateAll: vi.fn(),
     preloadData: vi.fn(),
     preloadCode: vi.fn(),
     beforeNavigate: vi.fn(),
     afterNavigate: vi.fn()
   }));
   ```

3. Add any global test utilities or mocks.

## 5. Create Test Helpers Directory

1. Create `src/tests/helpers/` directory.

2. Create rendering helper `src/tests/helpers/render.ts`:
   ```typescript
   import { render as renderSvelte, type RenderResult } from '@testing-library/svelte';
   import type { ComponentProps, SvelteComponent } from 'svelte';
   
   export function render<T extends SvelteComponent>(
     component: new (...args: any[]) => T,
     options?: {
       props?: ComponentProps<T>;
       context?: Map<any, any>;
     }
   ): RenderResult<T> {
     return renderSvelte(component, options);
   }
   ```

3. Create mock factory helpers `src/tests/helpers/mocks.ts`:
   ```typescript
   export function createMockUser(overrides = {}) {
     return {
       id: '123',
       email: 'test@example.com',
       name: 'Test User',
       ...overrides
     };
   }
   
   export function createMockPageData(overrides = {}) {
     return {
       url: new URL('http://localhost:5173'),
       params: {},
       route: { id: '/' },
       status: 200,
       error: null,
       data: {},
       form: null,
       ...overrides
     };
   }
   ```

4. Create fixture directory `src/tests/fixtures/` for test data.

## 6. Create Test Structure

1. Establish recommended test file structure:
   ```
   src/
   ├── tests/
   │   ├── setup.ts
   │   ├── helpers/
   │   │   ├── render.ts
   │   │   └── mocks.ts
   │   └── fixtures/
   │       └── data.ts
   ├── routes/
   │   ├── +page.svelte
   │   └── +page.test.ts
   └── lib/
       ├── components/
       │   ├── Button.svelte
       │   └── Button.test.ts
       └── utils/
           ├── format.ts
           └── format.test.ts
   ```

2. Document test file naming convention:
   - Component tests: `[ComponentName].test.ts`
   - Utility tests: `[moduleName].test.ts`
   - Route tests: `+page.test.ts`, `+layout.test.ts`

## 7. Create Example Unit Test

1. Create example utility test `src/lib/utils/format.test.ts`:
   ```typescript
   import { describe, it, expect } from 'vitest';
   import { formatCurrency, formatDate } from './format';
   
   describe('formatCurrency', () => {
     it('formats USD currency correctly', () => {
       expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
     });
     
     it('handles zero values', () => {
       expect(formatCurrency(0, 'USD')).toBe('$0.00');
     });
     
     it('handles negative values', () => {
       expect(formatCurrency(-100, 'USD')).toBe('-$100.00');
     });
   });
   
   describe('formatDate', () => {
     it('formats date in ISO format', () => {
       const date = new Date('2024-01-15');
       expect(formatDate(date)).toBe('2024-01-15');
     });
   });
   ```

## 8. Create Example Component Test

1. Create example component test `src/lib/components/Button.test.ts`:
   ```typescript
   import { render, screen, fireEvent } from '@testing-library/svelte';
   import { describe, it, expect, vi } from 'vitest';
   import Button from './Button.svelte';
   
   describe('Button', () => {
     it('renders with label', () => {
       render(Button, { props: { label: 'Click me' } });
       expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
     });
     
     it('calls onClick when clicked', async () => {
       const handleClick = vi.fn();
       render(Button, { props: { onClick: handleClick } });
       
       await fireEvent.click(screen.getByRole('button'));
       expect(handleClick).toHaveBeenCalledOnce();
     });
     
     it('is disabled when disabled prop is true', () => {
       render(Button, { props: { disabled: true } });
       expect(screen.getByRole('button')).toBeDisabled();
     });
     
     it('applies variant classes', () => {
       render(Button, { props: { variant: 'primary' } });
       const button = screen.getByRole('button');
       expect(button.className).toContain('primary');
     });
   });
   ```

## 9. Install Playwright Dependencies

1. Install Playwright:
   ```bash
   npm install -D @playwright/test
   ```

2. Initialize Playwright configuration:
   ```bash
   npx playwright install
   ```

3. Install browser binaries:
   ```bash
   npx playwright install chromium firefox webkit
   ```

## 10. Configure Playwright

1. Create `playwright.config.ts`:
   ```typescript
   import { defineConfig, devices } from '@playwright/test';
   
   export default defineConfig({
     testDir: './tests',
     fullyParallel: true,
     forbidOnly: !!process.env.CI,
     retries: process.env.CI ? 2 : 0,
     workers: process.env.CI ? 1 : undefined,
     reporter: 'html',
     use: {
       baseURL: 'http://localhost:4173',
       trace: 'on-first-retry',
       screenshot: 'only-on-failure'
     },
     projects: [
       {
         name: 'chromium',
         use: { ...devices['Desktop Chrome'] }
       },
       {
         name: 'firefox',
         use: { ...devices['Desktop Firefox'] }
       },
       {
         name: 'webkit',
         use: { ...devices['Desktop Safari'] }
       }
     ],
     webServer: {
       command: 'npm run build && npm run preview',
       port: 4173,
       reuseExistingServer: !process.env.CI
     }
   });
   ```

2. Create `tests/` directory for E2E tests.

## 11. Create Example E2E Test

1. Create example E2E test `tests/home.spec.ts`:
   ```typescript
   import { test, expect } from '@playwright/test';
   
   test('homepage loads and displays title', async ({ page }) => {
     await page.goto('/');
     await expect(page).toHaveTitle(/Home/);
     await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
   });
   
   test('navigation works', async ({ page }) => {
     await page.goto('/');
     await page.getByRole('link', { name: /about/i }).click();
     await expect(page).toHaveURL('/about');
   });
   
   test('form submission', async ({ page }) => {
     await page.goto('/contact');
     await page.getByLabel('Email').fill('test@example.com');
     await page.getByLabel('Message').fill('Test message');
     await page.getByRole('button', { name: /submit/i }).click();
     await expect(page.getByText(/success/i)).toBeVisible();
   });
   ```

2. Create page object models if needed in `tests/pages/`.

## 12. Configure NPM Scripts

1. Add comprehensive test scripts to package.json:
   ```json
   {
     "scripts": {
       "test": "vitest",
       "test:unit": "vitest run",
       "test:watch": "vitest watch",
       "test:ui": "vitest --ui",
       "test:coverage": "vitest run --coverage",
       "test:e2e": "playwright test",
       "test:e2e:ui": "playwright test --ui",
       "test:e2e:debug": "playwright test --debug",
       "test:report": "playwright show-report",
       "test:all": "npm run test:unit && npm run build && npm run test:e2e"
     }
   }
   ```

2. Verify all scripts work correctly.

## 13. Set Up Coverage Reporting

1. Configure coverage thresholds in vitest.config.js (already done in step 3).

2. Add coverage badge generation:
   ```bash
   npm install -D vitest-coverage-badge
   ```

3. Create script to generate badge after coverage run.

4. Configure .gitignore to exclude coverage output:
   ```
   coverage/
   .nyc_output/
   playwright-report/
   test-results/
   ```

## 14. Create CI/CD Integration

1. Create GitHub Actions workflow `.github/workflows/test.yml`:
   ```yaml
   name: Test
   
   on: [push, pull_request]
   
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
         - run: npm ci
         - run: npm run test:unit
         - run: npm run test:coverage
         - uses: codecov/codecov-action@v3
           with:
             files: ./coverage/lcov.info
     
     e2e:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
         - run: npm ci
         - run: npx playwright install --with-deps
         - run: npm run test:e2e
         - uses: actions/upload-artifact@v3
           if: always()
           with:
             name: playwright-report
             path: playwright-report/
   ```

2. Configure test to fail build on insufficient coverage.

## 15. Document Testing Setup

1. Create or update README.md with testing section:
   ```markdown
   ## Testing
   
   ### Unit and Component Tests
   
   Run all tests:
   ```bash
   npm run test
   ```
   
   Run tests in watch mode:
   ```bash
   npm run test:watch
   ```
   
   Generate coverage report:
   ```bash
   npm run test:coverage
   ```
   
   ### E2E Tests
   
   Run E2E tests:
   ```bash
   npm run test:e2e
   ```
   
   Run E2E tests with UI:
   ```bash
   npm run test:e2e:ui
   ```
   
   ### Test Structure
   
   - Unit tests: Co-located with source files (*.test.ts)
   - E2E tests: Located in `/tests` directory
   - Test helpers: Located in `/src/tests/helpers`
   ```

2. Create TESTING.md with detailed testing guidelines.

3. Document test patterns and best practices.

4. Provide examples for common testing scenarios.

</detailed_sequence_steps>

</task>

