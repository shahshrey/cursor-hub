<task name="Debug Svelte Application">

<task_objective>
Help debug Svelte and SvelteKit issues by analyzing error messages, stack traces, and common problems. Input: Error messages, stack traces, relevant code files, and description of unexpected behavior. Process: Analyze error type and context, identify root cause category (compilation, runtime, configuration, or SvelteKit-specific), examine relevant code, check for common pitfalls, and provide specific fixes with explanations. Output: Clear diagnosis of the issue, specific code fixes, step-by-step resolution guide, explanation of root cause, and preventive measures to avoid similar issues.
</task_objective>

<detailed_sequence_steps>
# Debug Svelte Application - Detailed Sequence of Steps

## 1. Gather Error Information

1. Collect complete error messages:
   - Console error output
   - Terminal/build error messages
   - Browser console errors
   - Stack traces

2. Note when error occurs:
   - During compilation/build
   - At runtime in browser
   - On specific user actions
   - In specific routes/components

3. Identify error type:
   - Syntax error
   - Runtime error
   - Type error
   - Configuration error
   - Network error

4. Gather context:
   - Recent code changes
   - Environment (dev/prod)
   - Browser/Node version
   - Package versions

## 2. Categorize the Error

1. Determine error category:
   
   **Compilation Errors**:
   - Svelte syntax errors
   - TypeScript errors
   - Import/module errors
   - Build configuration issues
   
   **Runtime Errors**:
   - Reactive statement errors
   - Component lifecycle issues
   - State management problems
   - Event handling errors
   
   **SvelteKit Specific**:
   - Load function errors
   - Form action problems
   - Routing issues
   - SSR vs CSR conflicts
   
   **Configuration Issues**:
   - Vite configuration
   - svelte.config.js problems
   - Adapter configuration
   - Environment variables

2. Check if error is consistent or intermittent.

3. Identify affected scope (specific component, route, or global).

## 3. Debug Compilation Errors

1. For Svelte syntax errors:
   ```
   Error: Expected }
   ```
   - Check for unclosed tags or blocks
   - Verify proper {#if} {/if} syntax
   - Check for missing closing braces in expressions

2. For TypeScript type errors:
   ```
   Error: Property 'x' does not exist on type 'Y'
   ```
   - Check type definitions
   - Verify imported types
   - Add proper type annotations

3. For import/module errors:
   ```
   Error: Cannot find module '$lib/component'
   ```
   - Verify file exists at path
   - Check import path spelling
   - Verify alias configuration in svelte.config.js:
   ```javascript
   kit: {
     alias: {
       $lib: './src/lib'
     }
   }
   ```

4. For build configuration errors:
   - Review vite.config.js
   - Check svelte.config.js
   - Verify adapter configuration

## 4. Debug Reactive Statement Errors

1. For "Cannot access before initialization" error:
   ```svelte
   <!-- Problem: Using variable before declaration -->
   <script>
     $: doubled = count * 2;  // Error!
     let count = 0;
   </script>
   
   <!-- Solution: Declare variables first -->
   <script>
     let count = 0;
     $: doubled = count * 2;  // Works
   </script>
   ```

2. For infinite reactive loops:
   ```svelte
   <!-- Problem: Reactive statement modifies its dependency -->
   <script>
     let count = 0;
     $: count = count + 1;  // Infinite loop!
   </script>
   
   <!-- Solution: Use proper reactive pattern -->
   <script>
     let count = 0;
     $: doubled = count * 2;  // No modification
   </script>
   ```

3. For $state/$derived errors (Svelte 5):
   ```typescript
   // Problem: Not using runes correctly
   let count = 0;
   $: doubled = count * 2;  // Won't work in runes mode
   
   // Solution: Use runes
   let count = $state(0);
   let doubled = $derived(count * 2);
   ```

## 5. Debug SSR vs CSR Conflicts

1. For "window is not defined" error:
   ```svelte
   <!-- Problem: Accessing browser APIs in SSR -->
   <script>
     const width = window.innerWidth;  // Error on server!
   </script>
   
   <!-- Solution: Use browser check -->
   <script>
     import { browser } from '$app/environment';
     
     let width = 0;
     if (browser) {
       width = window.innerWidth;
     }
   </script>
   
   <!-- Or use onMount -->
   <script>
     import { onMount } from 'svelte';
     
     let width = 0;
     onMount(() => {
       width = window.innerWidth;
     });
   </script>
   ```

2. For hydration mismatch errors:
   ```
   Error: Hydration failed because the initial UI does not match
   ```
   - Ensure SSR and CSR render same HTML
   - Check for browser-only conditions
   - Verify date/random number generation
   ```svelte
   <!-- Problem: Different output on server and client -->
   <script>
     const randomId = Math.random();  // Different on server/client!
   </script>
   
   <!-- Solution: Generate on client only -->
   <script>
     import { browser } from '$app/environment';
     let randomId = browser ? Math.random() : 0;
   </script>
   ```

## 6. Debug Load Function Errors

1. For "Cannot access before initialization" in load:
   ```typescript
   // Problem: Using variable before declaration
   export async function load() {
     console.log(data);  // Error!
     const data = await fetchData();
     return { data };
   }
   
   // Solution: Declare first
   export async function load() {
     const data = await fetchData();
     console.log(data);
     return { data };
   }
   ```

2. For missing return in load function:
   ```typescript
   // Problem: Not returning data
   export async function load() {
     const data = await fetchData();
     // Missing return!
   }
   
   // Solution: Return data
   export async function load() {
     const data = await fetchData();
     return { data };
   }
   ```

3. For incorrect data access in component:
   ```svelte
   <!-- Problem: Wrong property name -->
   <script>
     export let data;
   </script>
   <p>{data.user.name}</p>  <!-- Error if user is undefined -->
   
   <!-- Solution: Optional chaining -->
   <p>{data?.user?.name ?? 'Unknown'}</p>
   ```

## 7. Debug Form Action Errors

1. For form action not being called:
   ```svelte
   <!-- Problem: Missing use:enhance or wrong action -->
   <form method="POST">
     <button>Submit</button>
   </form>
   
   <!-- Solution: Use proper form enhancement -->
   <script>
     import { enhance } from '$app/forms';
   </script>
   <form method="POST" use:enhance>
     <button>Submit</button>
   </form>
   ```

2. For FormData issues:
   ```typescript
   // Problem: Not handling FormData correctly
   export const actions = {
     default: async ({ request }) => {
       const data = request.formData();  // Error: formData is a function!
       return { success: true };
     }
   };
   
   // Solution: Await formData()
   export const actions = {
     default: async ({ request }) => {
       const data = await request.formData();
       const email = data.get('email');
       return { success: true };
     }
   };
   ```

## 8. Debug Routing Issues

1. For 404 on valid routes:
   - Check file naming (+page.svelte, +layout.svelte)
   - Verify directory structure
   - Check for typos in route names
   - Review route matcher configuration

2. For layout not applying:
   ```
   routes/
   ├── +layout.svelte  ← Must be named exactly this
   └── +page.svelte
   ```

3. For dynamic route issues:
   ```
   // routes/blog/[slug]/+page.svelte
   export let data;  // data.slug from load function
   ```

## 9. Use Debugging Techniques

1. Add console.log strategically:
   ```svelte
   <script>
     let count = 0;
     $: console.log('count changed:', count);
     
     function increment() {
       console.log('increment called');
       count += 1;
     }
   </script>
   ```

2. Use {@debug} tag:
   ```svelte
   <script>
     let user = { name: 'John', age: 30 };
   </script>
   
   {@debug user}
   <p>{user.name}</p>
   ```

3. Use browser DevTools:
   - Set breakpoints in Sources tab
   - Inspect component state
   - Monitor network requests
   - Check console for errors

4. Inspect component props:
   ```svelte
   <script>
     export let data;
     console.log('Component props:', $$props);
   </script>
   ```

## 10. Fix Common Pitfalls

1. Bind directive issues:
   ```svelte
   <!-- Problem: Binding to computed value -->
   <script>
     let value = '';
     $: upper = value.toUpperCase();
   </script>
   <input bind:value={upper} />  <!-- Error! -->
   
   <!-- Solution: Bind to source -->
   <input bind:value />
   ```

2. Event modifier mistakes:
   ```svelte
   <!-- Wrong: Using deprecated syntax -->
   <button on:click|preventDefault={handler}>
   
   <!-- Correct: New syntax -->
   <button onclick={(e) => {
     e.preventDefault();
     handler();
   }}>
   ```

3. Store subscription leaks:
   ```svelte
   <!-- Problem: Manual subscription without cleanup -->
   <script>
     import { userStore } from './stores';
     
     userStore.subscribe(value => {
       console.log(value);  // Memory leak!
     });
   </script>
   
   <!-- Solution: Auto-subscription with $ -->
   <script>
     import { userStore } from './stores';
   </script>
   <p>{$userStore.name}</p>
   
   <!-- Or manual cleanup -->
   <script>
     import { onDestroy } from 'svelte';
     
     const unsubscribe = userStore.subscribe(value => {
       console.log(value);
     });
     
     onDestroy(unsubscribe);
   </script>
   ```

## 11. Check Configuration Files

1. Review svelte.config.js:
   ```javascript
   import adapter from '@sveltejs/adapter-auto';
   
   export default {
     kit: {
       adapter: adapter(),
       alias: {
         $lib: './src/lib'
       }
     }
   };
   ```

2. Review vite.config.js:
   ```javascript
   import { sveltekit } from '@sveltejs/kit/vite';
   import { defineConfig } from 'vite';
   
   export default defineConfig({
     plugins: [sveltekit()]
   });
   ```

3. Check for version mismatches in package.json.

## 12. Test Fixes

1. Clear build cache:
   ```bash
   rm -rf .svelte-kit
   rm -rf node_modules/.vite
   ```

2. Restart dev server:
   ```bash
   npm run dev
   ```

3. Test in different browsers.

4. Test in production build:
   ```bash
   npm run build
   npm run preview
   ```

## 13. Recommend Preventive Measures

1. Add TypeScript for better error catching.

2. Use linting rules:
   - eslint-plugin-svelte
   - @typescript-eslint

3. Enable Svelte a11y warnings.

4. Use proper error boundaries.

5. Add comprehensive tests.

## 14. Document Solution

1. Explain root cause of error.

2. Show before/after code comparison.

3. Explain why fix works.

4. Suggest best practices to prevent recurrence.

5. Link to relevant documentation.

## 15. Provide Additional Resources

1. Link to relevant Svelte/SvelteKit documentation.

2. Suggest related troubleshooting guides.

3. Recommend debugging tools and extensions.

4. Point to community resources (Discord, Stack Overflow).

</detailed_sequence_steps>

</task>

