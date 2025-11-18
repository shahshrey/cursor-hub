<task name="Migrate Svelte Version">

<task_objective>
Migrate Svelte/SvelteKit projects between versions, adopt new features like runes, and handle breaking changes. Input: Current Svelte/SvelteKit version, target version, codebase files, and migration requirements. Process: Analyze current implementation, create migration plan, update dependencies, run automated migration tools, convert syntax to new patterns, handle breaking changes, update configurations, and test thoroughly. Output: Fully migrated codebase with updated syntax, working application with all tests passing, updated configuration files, migration documentation with changes made, and rollback strategy if needed.
</task_objective>

<detailed_sequence_steps>
# Migrate Svelte Version - Detailed Sequence of Steps

## 1. Assess Current State

1. Identify current versions from package.json:
   - Svelte version (3.x, 4.x, or 5.x)
   - SvelteKit version (1.x or 2.x)
   - Related package versions

2. Review current codebase patterns:
   - Component syntax style
   - Store usage
   - Reactive statements
   - Event handling patterns

3. Check for deprecated features in use:
   - Review Svelte compiler warnings
   - Check for old syntax patterns

4. Identify migration scope:
   - Number of components affected
   - Store implementations
   - Configuration files
   - Third-party dependencies

5. Create backup of current code:
   ```bash
   git checkout -b backup-before-migration
   git push origin backup-before-migration
   ```

## 2. Determine Migration Type

1. **Svelte 3 → Svelte 4** migration needs:
   - Update package versions
   - Fix breaking changes (minimal)
   - Update deprecated patterns
   
2. **Svelte 4 → Svelte 5 (Runes)** migration needs:
   - Adopt runes ($state, $derived, $effect)
   - Update component props syntax
   - Convert reactive statements
   - Update store patterns
   - Fix event handling
   
3. **SvelteKit 1.x → 2.x** migration needs:
   - Update routing patterns
   - Update load function signatures
   - Update form action patterns
   - Update configuration
   
4. **JavaScript → TypeScript** migration needs:
   - Add type annotations
   - Create interface definitions
   - Configure TypeScript
   
5. **Legacy stores → Runes** migration needs:
   - Convert store subscriptions
   - Adopt $state for local state
   - Use $derived for computed values

## 3. Create Migration Plan

1. Document all breaking changes from release notes.

2. Create migration checklist:
   ```markdown
   - [ ] Update package.json dependencies
   - [ ] Run automated migration scripts
   - [ ] Update component syntax
   - [ ] Convert reactive statements to runes
   - [ ] Update prop definitions
   - [ ] Fix event handling
   - [ ] Update TypeScript types
   - [ ] Update configuration files
   - [ ] Test all routes and components
   - [ ] Update deployment configuration
   - [ ] Review performance impacts
   - [ ] Update documentation
   ```

3. Prioritize migration order:
   - Start with leaf components (no dependencies)
   - Move to parent components
   - Update routes last
   - Update stores separately

4. Establish rollback plan.

## 4. Update Dependencies

1. Update Svelte packages in package.json:
   ```json
   {
     "devDependencies": {
       "svelte": "^5.0.0",
       "@sveltejs/kit": "^2.0.0",
       "@sveltejs/vite-plugin-svelte": "^4.0.0"
     }
   }
   ```

2. Check for compatible versions of related packages:
   - svelte-check
   - @sveltejs/adapter-*
   - Testing libraries

3. Install updated packages:
   ```bash
   npm install
   ```

4. Clear caches:
   ```bash
   rm -rf .svelte-kit node_modules/.vite
   ```

## 5. Run Automated Migration Scripts

1. For Svelte 5 migration, use official migration tool:
   ```bash
   npx sv migrate svelte-5
   ```

2. Review what the migration tool changed:
   - Check git diff
   - Identify patterns converted
   - Note manual fixes needed

3. For SvelteKit 2.x migration:
   ```bash
   npx sv migrate sveltekit-2
   ```

4. Run migration for specific features if available:
   ```bash
   npx sv migrate runes
   ```

## 6. Convert Reactive Statements to Runes

1. Update basic reactive variables:
   ```javascript
   // Before (Svelte 4)
   let count = 0;
   
   // After (Svelte 5)
   let count = $state(0);
   ```

2. Convert reactive declarations to $derived:
   ```javascript
   // Before
   let count = 0;
   $: doubled = count * 2;
   $: quadrupled = doubled * 2;
   
   // After
   let count = $state(0);
   let doubled = $derived(count * 2);
   let quadrupled = $derived(doubled * 2);
   ```

3. Convert reactive statements to $effect:
   ```javascript
   // Before
   let count = 0;
   $: {
     console.log('Count changed:', count);
     document.title = `Count: ${count}`;
   }
   
   // After
   let count = $state(0);
   $effect(() => {
     console.log('Count changed:', count);
     document.title = `Count: ${count}`;
   });
   ```

4. Use $derived.by for complex derivations:
   ```javascript
   // Before
   $: filtered = items.filter(item => item.active);
   
   // After
   let filtered = $derived.by(() => {
     return items.filter(item => item.active);
   });
   ```

## 7. Update Component Props Syntax

1. Convert export let to props destructuring:
   ```typescript
   // Before (Svelte 4)
   export let name: string;
   export let age: number = 0;
   export let optional: boolean = false;
   
   // After (Svelte 5)
   let {
     name,
     age = 0,
     optional = false
   }: {
     name: string;
     age?: number;
     optional?: boolean;
   } = $props();
   ```

2. Convert two-way bindings to $bindable:
   ```typescript
   // Before
   export let value: string;
   
   // After
   let {
     value = $bindable('')
   }: {
     value: string;
   } = $props();
   ```

3. Handle rest props:
   ```typescript
   // Before
   export let className = '';
   $$restProps; // Implicitly available
   
   // After
   let {
     class: className = '',
     ...restProps
   } = $props();
   ```

## 8. Update Event Handling

1. Convert createEventDispatcher to callback props:
   ```typescript
   // Before
   import { createEventDispatcher } from 'svelte';
   const dispatch = createEventDispatcher<{ click: MouseEvent }>();
   
   function handleClick(event: MouseEvent) {
     dispatch('click', event);
   }
   
   // After
   let { onclick }: { onclick?: (event: MouseEvent) => void } = $props();
   
   function handleClick(event: MouseEvent) {
     onclick?.(event);
   }
   ```

2. Update event attribute syntax:
   ```svelte
   <!-- Before -->
   <button on:click={handleClick}>Click</button>
   <button on:click|preventDefault={handleClick}>Click</button>
   
   <!-- After -->
   <button onclick={handleClick}>Click</button>
   <button onclick={(e) => {
     e.preventDefault();
     handleClick(e);
   }}>Click</button>
   ```

## 9. Migrate Stores to Runes (Where Appropriate)

1. Convert local stores to $state:
   ```javascript
   // Before
   import { writable } from 'svelte/store';
   const count = writable(0);
   
   // After
   let count = $state(0);
   ```

2. Keep global stores as stores:
   ```javascript
   // Keep this pattern for global shared state
   import { writable } from 'svelte/store';
   export const userStore = writable(null);
   ```

3. Convert store subscriptions to $state:
   ```svelte
   <!-- Before -->
   <script>
     import { userStore } from './stores';
   </script>
   <p>{$userStore.name}</p>
   
   <!-- After (if converting to $state) -->
   <script>
     import { user } from './stores';
   </script>
   <p>{user.name}</p>
   ```

## 10. Update Configuration Files

1. Update svelte.config.js if needed:
   ```javascript
   import adapter from '@sveltejs/adapter-auto';
   import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
   
   export default {
     preprocess: vitePreprocess(),
     kit: {
       adapter: adapter()
     }
   };
   ```

2. Update vite.config.js:
   ```javascript
   import { sveltekit } from '@sveltejs/kit/vite';
   import { defineConfig } from 'vite';
   
   export default defineConfig({
     plugins: [sveltekit()]
   });
   ```

3. Update TypeScript configuration if needed:
   ```json
   {
     "compilerOptions": {
       "types": ["svelte"]
     }
   }
   ```

## 11. Fix Breaking Changes

1. Update component lifecycle:
   ```javascript
   // onMount and onDestroy still work
   import { onMount, onDestroy } from 'svelte';
   
   // Or use $effect for side effects
   $effect(() => {
     // Setup
     return () => {
       // Cleanup
     };
   });
   ```

2. Fix slot syntax if changed:
   ```svelte
   <!-- Check release notes for slot changes -->
   <slot />
   <slot name="header" />
   ```

3. Update context API usage if needed:
   ```javascript
   import { setContext, getContext } from 'svelte';
   // Usage remains same in Svelte 5
   ```

## 12. Update Tests

1. Update test syntax for new patterns:
   ```typescript
   import { render, screen } from '@testing-library/svelte';
   import { describe, it, expect } from 'vitest';
   import Component from './Component.svelte';
   
   describe('Component', () => {
     it('works with new syntax', () => {
       render(Component, { props: { count: 5 } });
       expect(screen.getByText('5')).toBeInTheDocument();
     });
   });
   ```

2. Update mock patterns for new event handling.

3. Fix any test failures from syntax changes.

## 13. Test Thoroughly

1. Start development server:
   ```bash
   npm run dev
   ```

2. Test all routes manually:
   - Navigate through application
   - Test all user interactions
   - Verify forms work
   - Check authentication flows

3. Run test suite:
   ```bash
   npm run test
   npm run test:e2e
   ```

4. Check for console errors or warnings.

5. Test SSR behavior:
   ```bash
   npm run build
   npm run preview
   ```

6. Verify performance hasn't degraded.

## 14. Review and Optimize

1. Look for optimization opportunities with new features:
   - Use $state.raw for large objects
   - Use $derived.lazy for expensive computations
   - Leverage new reactivity system

2. Remove deprecated patterns completely.

3. Update code style for consistency.

4. Refactor to use new best practices.

## 15. Document Migration

1. Create migration summary document:
   ```markdown
   # Svelte 5 Migration Summary
   
   ## Changes Made
   - Converted 45 components to runes syntax
   - Updated 12 stores
   - Fixed 23 event handlers
   - Updated 8 configuration files
   
   ## Breaking Changes Encountered
   - Event dispatcher removed, using callback props
   - Reactive statements converted to $derived
   - Props syntax updated to destructuring
   
   ## Testing Results
   - All unit tests passing
   - All E2E tests passing
   - Manual testing complete
   - Performance improved by 15%
   
   ## Rollback Plan
   - Backup branch: backup-before-migration
   - Estimated rollback time: 10 minutes
   ```

2. Update project documentation with new patterns.

3. Create team training materials if needed.

4. Update coding standards and best practices.

5. Commit migration with comprehensive message:
   ```bash
   git add .
   git commit -m "feat: migrate to Svelte 5 with runes

   - Convert all components to $state and $derived
   - Update event handling to callback props
   - Migrate reactive statements to $effect
   - Update tests for new syntax
   - All tests passing"
   ```

</detailed_sequence_steps>

</task>

