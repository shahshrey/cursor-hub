<task name="Create Tests">

<task_objective>
Create comprehensive tests for Svelte components and SvelteKit routes, including unit tests, component tests, and E2E tests. Input: Target code to test (component, route, store, utility function), component interface and behavior, and required test scenarios. Process: Analyze target for testing needs, determine appropriate test types, create test files with comprehensive coverage, implement tests for happy paths and edge cases, add accessibility and interaction tests, and verify all tests pass. Output: Complete test file with multiple test cases covering functionality, component tests with user interaction scenarios, route tests with load function and form action coverage, proper mocks and test utilities, and passing test suite with good coverage.
</task_objective>

<detailed_sequence_steps>
# Create Tests - Detailed Sequence of Steps

## 1. Analyze Target for Testing

1. Identify what needs testing:
   - Svelte component
   - SvelteKit route (+page, +layout)
   - Store (writable, readable, derived)
   - Utility function
   - API endpoint

2. Review target code structure:
   - Read component/module file
   - Identify all props/parameters
   - Note all public methods/functions
   - List all side effects
   - Identify dependencies

3. Check for existing tests:
   - Look for .test.ts or .spec.ts files
   - Review existing test patterns
   - Identify coverage gaps

4. Review existing test patterns in the codebase for consistency.

## 2. Determine Test Types Needed

1. For Svelte components, need:
   - Unit tests for component logic
   - Rendering tests
   - User interaction tests
   - Prop variation tests
   - Slot tests
   - Event emission tests
   - Accessibility tests

2. For SvelteKit routes, need:
   - Load function tests
   - Form action tests
   - Error handling tests
   - Authorization tests
   - Data validation tests

3. For Stores, need:
   - State change tests
   - Derived value tests
   - Subscription tests
   - Update function tests

4. For Utilities, need:
   - Pure function tests
   - Edge case tests
   - Error handling tests

5. For E2E scenarios, need:
   - User flow tests
   - Navigation tests
   - Form submission tests
   - Authentication flows

## 3. Create Test File Structure

1. Create test file adjacent to source:
   - Same directory as target
   - Name: `[FileName].test.ts` or `[FileName].spec.ts`

2. Set up test file imports:
   ```typescript
   import { describe, it, expect, vi, beforeEach } from 'vitest';
   import { render, screen, fireEvent } from '@testing-library/svelte';
   import { tick } from 'svelte';
   import ComponentName from './ComponentName.svelte';
   ```

3. Create describe block for the test suite:
   ```typescript
   describe('ComponentName', () => {
     // Tests will go here
   });
   ```

## 4. Create Component Rendering Tests

1. Test basic rendering:
   ```typescript
   it('renders correctly', () => {
     render(ComponentName);
     expect(screen.getByRole('main')).toBeInTheDocument();
   });
   ```

2. Test rendering with different props:
   ```typescript
   it('renders with custom label', () => {
     render(ComponentName, { props: { label: 'Custom Label' } });
     expect(screen.getByText('Custom Label')).toBeInTheDocument();
   });
   ```

3. Test conditional rendering:
   ```typescript
   it('shows loading state when loading is true', () => {
     render(ComponentName, { props: { loading: true } });
     expect(screen.getByText('Loading...')).toBeInTheDocument();
   });
   
   it('hides content when loading is false', () => {
     render(ComponentName, { props: { loading: false } });
     expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
   });
   ```

4. Test slot rendering:
   ```typescript
   it('renders default slot content', () => {
     const { container } = render(ComponentName, {
       props: {
         $$slots: { default: true },
         $$scope: {}
       }
     });
     // Additional slot assertions
   });
   ```

## 5. Create User Interaction Tests

1. Test click events:
   ```typescript
   it('calls onClick when button is clicked', async () => {
     const handleClick = vi.fn();
     render(ComponentName, { props: { onClick: handleClick } });
     
     await fireEvent.click(screen.getByRole('button'));
     expect(handleClick).toHaveBeenCalledOnce();
   });
   ```

2. Test input changes:
   ```typescript
   it('updates input value on change', async () => {
     const { component } = render(ComponentName);
     const input = screen.getByRole('textbox');
     
     await fireEvent.input(input, { target: { value: 'test' } });
     await tick();
     
     expect(input).toHaveValue('test');
   });
   ```

3. Test form submissions:
   ```typescript
   it('submits form with correct data', async () => {
     const handleSubmit = vi.fn();
     render(FormComponent, { props: { onSubmit: handleSubmit } });
     
     await fireEvent.input(screen.getByLabelText('Email'), { 
       target: { value: 'test@example.com' } 
     });
     await fireEvent.click(screen.getByRole('button', { name: /submit/i }));
     
     expect(handleSubmit).toHaveBeenCalledWith({
       email: 'test@example.com'
     });
   });
   ```

4. Test keyboard interactions:
   ```typescript
   it('closes modal on Escape key', async () => {
     render(Modal, { props: { open: true } });
     
     await fireEvent.keyDown(document, { key: 'Escape' });
     await tick();
     
     expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
   });
   ```

## 6. Create Prop Variation Tests

1. Test all prop combinations:
   ```typescript
   describe('variants', () => {
     it.each([
       ['primary', 'btn-primary'],
       ['secondary', 'btn-secondary'],
       ['danger', 'btn-danger']
     ])('renders %s variant with %s class', (variant, expectedClass) => {
       render(Button, { props: { variant } });
       expect(screen.getByRole('button').className).toContain(expectedClass);
     });
   });
   ```

2. Test size variations:
   ```typescript
   it.each(['small', 'medium', 'large'])('renders %s size correctly', (size) => {
     render(Component, { props: { size } });
     expect(screen.getByRole('button')).toHaveClass(`btn-${size}`);
   });
   ```

3. Test disabled state:
   ```typescript
   it('is disabled when disabled prop is true', () => {
     render(Component, { props: { disabled: true } });
     expect(screen.getByRole('button')).toBeDisabled();
   });
   ```

## 7. Create State Management Tests

1. Test reactive state updates:
   ```typescript
   it('updates display when count changes', async () => {
     const { component } = render(Counter);
     
     component.count = 5;
     await tick();
     
     expect(screen.getByText('5')).toBeInTheDocument();
   });
   ```

2. Test derived values:
   ```typescript
   it('calculates doubled value correctly', async () => {
     const { component } = render(Calculator);
     
     component.value = 10;
     await tick();
     
     expect(screen.getByTestId('doubled')).toHaveTextContent('20');
   });
   ```

3. Test effects and lifecycle:
   ```typescript
   it('fetches data on mount', async () => {
     const mockFetch = vi.fn().mockResolvedValue({
       ok: true,
       json: async () => ({ data: 'test' })
     });
     global.fetch = mockFetch;
     
     render(DataComponent);
     await tick();
     
     expect(mockFetch).toHaveBeenCalled();
   });
   ```

## 8. Create Store Tests

1. Test store initialization:
   ```typescript
   import { get } from 'svelte/store';
   import { userStore } from './stores';
   
   it('initializes with default value', () => {
     expect(get(userStore)).toEqual({ name: '', email: '' });
   });
   ```

2. Test store updates:
   ```typescript
   it('updates user data', () => {
     userStore.set({ name: 'John', email: 'john@example.com' });
     expect(get(userStore)).toEqual({ name: 'John', email: 'john@example.com' });
   });
   ```

3. Test derived stores:
   ```typescript
   it('derives full name from first and last name', () => {
     nameStore.set({ first: 'John', last: 'Doe' });
     expect(get(fullNameStore)).toBe('John Doe');
   });
   ```

4. Test store subscriptions:
   ```typescript
   it('notifies subscribers on change', () => {
     const callback = vi.fn();
     const unsubscribe = userStore.subscribe(callback);
     
     userStore.set({ name: 'Jane', email: 'jane@example.com' });
     
     expect(callback).toHaveBeenCalledWith({ name: 'Jane', email: 'jane@example.com' });
     unsubscribe();
   });
   ```

## 9. Create Route Tests

1. Test load functions:
   ```typescript
   import { load } from './+page.server.ts';
   
   it('loads user data', async () => {
     const mockFetch = vi.fn().mockResolvedValue({
       ok: true,
       json: async () => ({ user: { id: 1, name: 'John' } })
     });
     
     const result = await load({ fetch: mockFetch, params: { id: '1' } });
     
     expect(result).toEqual({ user: { id: 1, name: 'John' } });
   });
   ```

2. Test form actions:
   ```typescript
   import { actions } from './+page.server.ts';
   
   it('creates new user on submit', async () => {
     const formData = new FormData();
     formData.append('name', 'John Doe');
     formData.append('email', 'john@example.com');
     
     const result = await actions.default({
       request: { formData: async () => formData }
     });
     
     expect(result).toEqual({ success: true });
   });
   ```

3. Test error handling:
   ```typescript
   it('returns error when validation fails', async () => {
     const formData = new FormData();
     formData.append('email', 'invalid-email');
     
     const result = await actions.default({
       request: { formData: async () => formData }
     });
     
     expect(result).toEqual({ 
       success: false, 
       errors: { email: 'Invalid email' } 
     });
   });
   ```

## 10. Create Utility Function Tests

1. Test pure functions:
   ```typescript
   import { formatCurrency, validateEmail } from './utils';
   
   describe('formatCurrency', () => {
     it('formats positive numbers', () => {
       expect(formatCurrency(1234.56)).toBe('$1,234.56');
     });
     
     it('formats negative numbers', () => {
       expect(formatCurrency(-100)).toBe('-$100.00');
     });
     
     it('handles zero', () => {
       expect(formatCurrency(0)).toBe('$0.00');
     });
   });
   
   describe('validateEmail', () => {
     it('validates correct email', () => {
       expect(validateEmail('test@example.com')).toBe(true);
     });
     
     it('rejects invalid email', () => {
       expect(validateEmail('invalid')).toBe(false);
     });
   });
   ```

## 11. Create Accessibility Tests

1. Test keyboard navigation:
   ```typescript
   it('is keyboard accessible', async () => {
     render(Component);
     const button = screen.getByRole('button');
     
     button.focus();
     expect(button).toHaveFocus();
     
     await fireEvent.keyDown(button, { key: 'Enter' });
     // Assert expected behavior
   });
   ```

2. Test ARIA attributes:
   ```typescript
   it('has proper ARIA attributes', () => {
     render(Modal, { props: { open: true } });
     const dialog = screen.getByRole('dialog');
     
     expect(dialog).toHaveAttribute('aria-modal', 'true');
     expect(dialog).toHaveAttribute('aria-labelledby');
   });
   ```

3. Test screen reader content:
   ```typescript
   it('provides screen reader text', () => {
     render(IconButton, { props: { icon: 'close' } });
     expect(screen.getByLabelText('Close')).toBeInTheDocument();
   });
   ```

## 12. Create Edge Case Tests

1. Test with empty data:
   ```typescript
   it('handles empty list', () => {
     render(List, { props: { items: [] } });
     expect(screen.getByText('No items')).toBeInTheDocument();
   });
   ```

2. Test with null/undefined:
   ```typescript
   it('handles null user', () => {
     render(UserProfile, { props: { user: null } });
     expect(screen.getByText('No user found')).toBeInTheDocument();
   });
   ```

3. Test with very long strings:
   ```typescript
   it('handles long text gracefully', () => {
     const longText = 'a'.repeat(1000);
     render(Component, { props: { text: longText } });
     expect(screen.getByText(longText)).toBeInTheDocument();
   });
   ```

4. Test with special characters:
   ```typescript
   it('handles special characters', () => {
     render(Component, { props: { text: '<script>alert("xss")</script>' } });
     // Verify XSS prevention
   });
   ```

## 13. Create E2E Tests

1. Create user flow test in `tests/flows/user-registration.spec.ts`:
   ```typescript
   import { test, expect } from '@playwright/test';
   
   test('complete user registration flow', async ({ page }) => {
     await page.goto('/register');
     
     await page.getByLabel('Email').fill('user@example.com');
     await page.getByLabel('Password').fill('SecurePass123!');
     await page.getByLabel('Confirm Password').fill('SecurePass123!');
     await page.getByRole('button', { name: /sign up/i }).click();
     
     await expect(page).toHaveURL('/dashboard');
     await expect(page.getByText(/welcome/i)).toBeVisible();
   });
   ```

2. Create navigation test:
   ```typescript
   test('navigates through main sections', async ({ page }) => {
     await page.goto('/');
     
     await page.getByRole('link', { name: /products/i }).click();
     await expect(page).toHaveURL('/products');
     
     await page.getByRole('link', { name: /about/i }).click();
     await expect(page).toHaveURL('/about');
   });
   ```

3. Create form interaction test:
   ```typescript
   test('submits contact form', async ({ page }) => {
     await page.goto('/contact');
     
     await page.getByLabel('Name').fill('John Doe');
     await page.getByLabel('Email').fill('john@example.com');
     await page.getByLabel('Message').fill('Test message');
     
     await page.getByRole('button', { name: /send/i }).click();
     
     await expect(page.getByText(/message sent/i)).toBeVisible();
   });
   ```

## 14. Add Test Utilities and Mocks

1. Create reusable mocks:
   ```typescript
   export const mockUser = {
     id: '123',
     email: 'test@example.com',
     name: 'Test User'
   };
   
   export function mockFetch(data: any) {
     return vi.fn().mockResolvedValue({
       ok: true,
       json: async () => data
     });
   }
   ```

2. Create render utilities:
   ```typescript
   export function renderWithUser(Component: any, user = mockUser) {
     return render(Component, {
       context: new Map([['user', user]])
     });
   }
   ```

## 15. Verify and Run Tests

1. Run new tests:
   ```bash
   npm run test -- path/to/test.ts
   ```

2. Verify all tests pass.

3. Check test coverage:
   ```bash
   npm run test:coverage -- path/to/source.ts
   ```

4. Ensure coverage meets project standards.

5. Review test output for any warnings or issues.

6. Commit tests with descriptive message.

</detailed_sequence_steps>

</task>

