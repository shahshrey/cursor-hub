<task name="Mock SvelteKit Modules">

<task_objective>
Mock SvelteKit modules and functionality in Storybook stories for isolated component development. Input: Component dependencies on SvelteKit modules ($app/stores, $app/navigation, $app/forms) and required mock scenarios (authenticated states, loading states, form states). Process: Analyze component module usage, configure module mocks using parameters, set up store mocks, create navigation mocks, and configure link/form handling. Output: Comprehensive mock configurations enabling component testing in isolation with all SvelteKit module dependencies properly mocked and multiple story variants demonstrating different application states.
</task_objective>

<detailed_sequence_steps>
# Mock SvelteKit Modules - Detailed Sequence of Steps

## 1. Analyze Component Dependencies

1. Examine component code to identify all SvelteKit module imports:
   - `$app/stores` usage
   - `$app/navigation` functions
   - `$app/forms` enhancements
   - `$app/environment` references
   - `$app/paths` usage

2. Determine which modules need mocking:
   - Fully Supported: `$app/environment`, `$app/paths`, `$lib`
   - Experimental (Requires Mocking): `$app/stores`, `$app/navigation`, `$app/forms`
   - Not Supported: `$env/dynamic/private`, `$env/static/private`, `$service-worker`

3. Identify component's data requirements from page store.

4. Note any navigation functions being used.

5. Check for form enhancement usage.

## 2. Set Up Page Store Mocking

1. Create comprehensive page store mock structure:
   ```javascript
   parameters: {
     sveltekit_experimental: {
       stores: {
         page: {
           url: new URL('https://example.com/products/123'),
           params: { id: '123' },
           route: { id: '/products/[id]' },
           status: 200,
           error: null,
           data: {
             // Component-specific data
           },
           form: null
         }
       }
     }
   }
   ```

2. Configure URL and route parameters to match component expectations.

3. Set up data object with all required properties for component.

4. Configure status code for different scenarios (200, 404, 500).

5. Set up error object for error state testing.

6. Configure form data if component handles form submissions.

## 3. Configure Navigating Store Mock

1. Set up navigating store for loading states:
   ```javascript
   navigating: {
     from: {
       params: { id: '122' },
       route: { id: '/products/[id]' },
       url: new URL('https://example.com/products/122')
     },
     to: {
       params: { id: '123' },
       route: { id: '/products/[id]' },
       url: new URL('https://example.com/products/123')
     },
     type: 'link',
     delta: 1
   }
   ```

2. Configure navigation origin (from) state.

3. Configure navigation destination (to) state.

4. Set navigation type ('link', 'popstate', 'goto').

5. Set delta for history navigation.

6. Create null state for non-navigating scenarios.

## 4. Configure Updated Store Mock

1. Set up updated store for app update notifications:
   ```javascript
   updated: true  // or false
   ```

2. Create story variants for update available state.

3. Create story variants for no updates state.

## 5. Set Up Navigation Function Mocking

1. Configure navigation function mocks with actions:
   ```javascript
   parameters: {
     sveltekit_experimental: {
       navigation: {
         goto: (url, options) => {
           console.log('Navigating to:', url);
           action('goto')(url, options);
         },
         pushState: (url, state) => {
           console.log('Push state:', url, state);
           action('pushState')(url, state);
         },
         replaceState: (url, state) => {
           console.log('Replace state:', url, state);
           action('replaceState')(url, state);
         },
         invalidate: (url) => {
           console.log('Invalidate:', url);
           action('invalidate')(url);
         },
         invalidateAll: () => {
           console.log('Invalidate all');
           action('invalidateAll')();
         }
       }
     }
   }
   ```

2. Add logging for debugging navigation calls.

3. Connect to Storybook actions addon for visibility.

4. Configure afterNavigate callback if needed:
   ```javascript
   afterNavigate: {
     from: null,
     to: { url: new URL('https://example.com') },
     type: 'enter'
   }
   ```

## 6. Configure Form Enhancement Mocking

1. Set up form enhance function mock:
   ```javascript
   parameters: {
     sveltekit_experimental: {
       forms: {
         enhance: (form) => {
           console.log('Form enhanced:', form);
           return {
             destroy() {
               console.log('Form enhancement cleaned up');
             }
           };
         }
       }
     }
   }
   ```

2. Add logging for form enhancement lifecycle.

3. Implement cleanup function for proper testing.

4. Create variants for different form submission states.

## 7. Configure Link Handling

1. Set up link interception patterns:
   ```javascript
   parameters: {
     sveltekit_experimental: {
       hrefs: {
         '/products': (to, event) => {
           console.log('Products link clicked');
           event.preventDefault();
         },
         '/product/.*': {
           callback: (to, event) => {
             console.log('Product detail:', to);
           },
           asRegex: true
         },
         '/api/.*': {
           callback: (to, event) => {
             event.preventDefault();
             console.log('API call intercepted:', to);
           },
           asRegex: true
         }
       }
     }
   }
   ```

2. Configure exact match handlers for specific routes.

3. Set up regex patterns for dynamic routes.

4. Add API route interception to prevent external calls.

5. Add event.preventDefault() where appropriate.

## 8. Create Complex Mock Scenarios

1. Create authenticated user state mock:
   ```javascript
   const mockAuthenticatedUser = {
     parameters: {
       sveltekit_experimental: {
         stores: {
           page: {
             data: {
               user: {
                 id: '123',
                 email: 'user@example.com',
                 role: 'admin'
               },
               session: {
                 token: 'mock-jwt-token',
                 expiresAt: '2024-12-31'
               }
             }
           }
         }
       }
     }
   };
   ```

2. Create unauthenticated state mock.

3. Create loading state mock:
   ```javascript
   const mockLoadingState = {
     parameters: {
       sveltekit_experimental: {
         stores: {
           navigating: {
             from: { url: new URL('https://example.com') },
             to: { url: new URL('https://example.com/products') }
           }
         }
       }
     }
   };
   ```

4. Create error state mocks for different error types.

5. Create form submission state mocks.

## 9. Create Story Variants

1. Create default story with base mocks.

2. Create authenticated state story.

3. Create loading state story.

4. Create error state story.

5. Create success state story.

6. Create empty/no data state story.

7. Document each story variant's purpose.

## 10. Test and Validate Mocks

1. Verify all component interactions work with mocks.

2. Test that store subscriptions receive mocked data.

3. Verify navigation functions trigger properly.

4. Test form submissions with mocked enhance.

5. Verify links are intercepted correctly.

6. Check console for any SvelteKit module errors.

7. Test all story variants render correctly.

</detailed_sequence_steps>

</task>

