<task name="Create Svelte Component">

<task_objective>
Create new Svelte components with best practices, TypeScript support, and testing. Input: Component name, purpose, required props interface, events to emit, slots needed, and state management requirements. Process: Gather component specifications, determine component type, create component file with proper structure, implement props with TypeScript/JSDoc typing, add accessibility features, create accompanying test file, and generate usage examples. Output: Production-ready Svelte component with proper typing, accessible markup, scoped styles, comprehensive tests, and usage documentation.
</task_objective>

<detailed_sequence_steps>
# Create Svelte Component - Detailed Sequence of Steps

## 1. Gather Component Requirements

1. Determine component name:
   - Use PascalCase (e.g., Button, UserProfile, DataTable)
   - Ensure name is descriptive and clear

2. Identify component purpose and responsibilities:
   - What problem does it solve?
   - What is its primary function?
   - Where will it be used?

3. Define component interface:
   - Required props
   - Optional props with defaults
   - Events to dispatch
   - Slots to expose

4. Determine state management needs:
   - Local component state
   - Derived values
   - Side effects

5. Check if TypeScript is used in project:
   - Review tsconfig.json
   - Check existing component patterns

## 2. Assess Current Project Structure

1. Identify components directory:
   - Check src/lib/components/
   - Check src/components/
   - Review project structure conventions

2. Review project's Svelte configuration:
   - Read svelte.config.js
   - Check Vite configuration

3. Review existing component patterns:
   - Read similar components for consistency
   - Note naming conventions
   - Check prop patterns

4. Verify testing setup exists:
   - Check for Vitest configuration
   - Review test file patterns

## 3. Determine Component Type

1. Identify component category:
   
   **UI Components**: Presentational elements
   - Button, Input, Card, Modal, Dropdown
   - Focus on visual presentation
   - Reusable across application
   
   **Form Components**: Input handling with validation
   - TextInput, Select, Checkbox, FormGroup
   - Handle user input
   - Validation and error states
   
   **Layout Components**: Structural organization
   - Header, Sidebar, Grid, Container
   - Define page structure
   - Responsive design
   
   **Data Components**: Display and interact with data
   - DataTable, List, Chart, Timeline
   - Handle data presentation
   - Sorting, filtering, pagination
   
   **Utility Components**: Special functionality
   - Portal, Transition, ErrorBoundary
   - Provide enhanced functionality
   - Often wrap other components

2. Determine complexity level:
   - Simple: Minimal props, no state
   - Moderate: Multiple props, local state
   - Complex: Many props, derived state, side effects

## 4. Create Component File Structure

1. Create component directory:
   ```
   src/lib/components/Button/
   ├── Button.svelte
   ├── Button.test.ts
   └── index.ts (optional - for re-exports)
   ```

2. Or co-locate in single directory:
   ```
   src/lib/components/
   ├── Button.svelte
   └── Button.test.ts
   ```

3. Create the component file with proper naming.

## 5. Set Up Component Script Section

1. Create script tag with lang attribute if using TypeScript:
   ```svelte
   <script lang="ts">
   ```

2. Add imports section:
   ```typescript
   import { createEventDispatcher, onMount } from 'svelte';
   import type { ComponentType } from 'svelte';
   ```

3. Define TypeScript interfaces if using TypeScript:
   ```typescript
   interface Props {
     label: string;
     variant?: 'primary' | 'secondary' | 'danger';
     size?: 'small' | 'medium' | 'large';
     disabled?: boolean;
     onClick?: () => void;
   }
   ```

4. Or use JSDoc for JavaScript projects:
   ```javascript
   /**
    * @typedef {Object} Props
    * @property {string} label
    * @property {'primary' | 'secondary' | 'danger'} [variant='primary']
    * @property {'small' | 'medium' | 'large'} [size='medium']
    * @property {boolean} [disabled=false]
    */
   ```

## 6. Define Component Props

1. Declare props using destructuring:
   ```typescript
   let {
     label,
     variant = 'primary',
     size = 'medium',
     disabled = false,
     onClick,
     class: className = '',
     ...restProps
   }: Props = $props();
   ```

2. For Svelte 4 syntax (if not using runes):
   ```typescript
   export let label: string;
   export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
   export let size: 'small' | 'medium' | 'large' = 'medium';
   export let disabled: boolean = false;
   export let onClick: (() => void) | undefined = undefined;
   ```

3. Use $bindable for two-way binding props:
   ```typescript
   let { value = $bindable('') }: { value: string } = $props();
   ```

4. Add prop validation comments:
   ```typescript
   /**
    * The button label text
    */
   export let label: string;
   
   /**
    * Visual style variant
    * @default 'primary'
    */
   export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
   ```

## 7. Implement Component State

1. Define local state using $state (Svelte 5):
   ```typescript
   let isHovered = $state(false);
   let isPressed = $state(false);
   ```

2. Or using let for Svelte 4:
   ```typescript
   let isHovered = false;
   let isPressed = false;
   ```

3. Create derived values using $derived:
   ```typescript
   let computedClass = $derived(
     `btn btn-${variant} btn-${size} ${disabled ? 'disabled' : ''} ${className}`
   );
   ```

4. Or using reactive statements for Svelte 4:
   ```typescript
   $: computedClass = `btn btn-${variant} btn-${size} ${disabled ? 'disabled' : ''} ${className}`;
   ```

## 8. Implement Event Handling

1. Create event dispatcher:
   ```typescript
   const dispatch = createEventDispatcher<{
     click: MouseEvent;
     focus: FocusEvent;
     blur: FocusEvent;
   }>();
   ```

2. Define event handlers:
   ```typescript
   function handleClick(event: MouseEvent) {
     if (disabled) return;
     
     dispatch('click', event);
     onClick?.(event);
   }
   
   function handleFocus(event: FocusEvent) {
     isHovered = true;
     dispatch('focus', event);
   }
   
   function handleBlur(event: FocusEvent) {
     isHovered = false;
     dispatch('blur', event);
   }
   ```

3. Implement keyboard handling if needed:
   ```typescript
   function handleKeydown(event: KeyboardEvent) {
     if (event.key === 'Enter' || event.key === ' ') {
       event.preventDefault();
       handleClick(event as any);
     }
   }
   ```

## 9. Add Lifecycle and Effects

1. Use onMount for initialization:
   ```typescript
   onMount(() => {
     // Initialization code
     
     return () => {
       // Cleanup code
     };
   });
   ```

2. Use $effect for reactive side effects (Svelte 5):
   ```typescript
   $effect(() => {
     if (someCondition) {
       // Side effect
     }
   });
   ```

3. Or use reactive statements for Svelte 4:
   ```typescript
   $: if (someCondition) {
     // Side effect
   }
   ```

## 10. Create Component Markup

1. Build accessible HTML structure:
   ```svelte
   <button
     type="button"
     class={computedClass}
     {disabled}
     aria-label={ariaLabel}
     onclick={handleClick}
     onfocus={handleFocus}
     onblur={handleBlur}
     onkeydown={handleKeydown}
     {...restProps}
   >
     {#if icon}
       <span class="icon" aria-hidden="true">
         <svelte:component this={icon} />
       </span>
     {/if}
     <span class="label">{label}</span>
     <slot />
   </button>
   ```

2. Use semantic HTML elements:
   - `<button>` for buttons
   - `<a>` for links
   - `<input>` for form inputs
   - Proper heading levels

3. Add ARIA attributes for accessibility:
   ```svelte
   <button
     role="button"
     aria-pressed={isPressed}
     aria-disabled={disabled}
     aria-label={ariaLabel || label}
   >
   ```

4. Implement slots where appropriate:
   ```svelte
   <div class="card">
     <slot name="header" />
     <div class="card-body">
       <slot />
     </div>
     <slot name="footer" />
   </div>
   ```

## 11. Style the Component

1. Add scoped styles:
   ```svelte
   <style>
     .btn {
       display: inline-flex;
       align-items: center;
       justify-content: center;
       padding: 0.5rem 1rem;
       border: none;
       border-radius: 0.25rem;
       font-weight: 500;
       cursor: pointer;
       transition: all 0.2s;
     }
     
     .btn:hover:not(.disabled) {
       transform: translateY(-1px);
     }
     
     .btn:focus-visible {
       outline: 2px solid currentColor;
       outline-offset: 2px;
     }
     
     .btn-primary {
       background: var(--color-primary, #0066cc);
       color: white;
     }
     
     .btn-secondary {
       background: var(--color-secondary, #6c757d);
       color: white;
     }
     
     .btn.disabled {
       opacity: 0.5;
       cursor: not-allowed;
     }
     
     @media (prefers-reduced-motion: reduce) {
       .btn {
         transition: none;
       }
     }
   </style>
   ```

2. Use CSS custom properties for theming:
   ```css
   .btn {
     background: var(--btn-bg, #0066cc);
     color: var(--btn-color, white);
   }
   ```

3. Support responsive design:
   ```css
   @media (max-width: 768px) {
     .btn {
       padding: 0.75rem 1.5rem;
       font-size: 1rem;
     }
   }
   ```

## 12. Create Component Tests

1. Create test file `Button.test.ts`:
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
       render(Button, { props: { label: 'Click', onClick: handleClick } });
       
       await fireEvent.click(screen.getByRole('button'));
       expect(handleClick).toHaveBeenCalledOnce();
     });
     
     it('is disabled when disabled prop is true', () => {
       render(Button, { props: { label: 'Click', disabled: true } });
       expect(screen.getByRole('button')).toBeDisabled();
     });
     
     it('applies variant classes', () => {
       render(Button, { props: { label: 'Click', variant: 'primary' } });
       const button = screen.getByRole('button');
       expect(button.className).toContain('btn-primary');
     });
   });
   ```

2. Add accessibility tests:
   ```typescript
   it('is keyboard accessible', async () => {
     const handleClick = vi.fn();
     render(Button, { props: { label: 'Click', onClick: handleClick } });
     const button = screen.getByRole('button');
     
     button.focus();
     expect(button).toHaveFocus();
     
     await fireEvent.keyDown(button, { key: 'Enter' });
     expect(handleClick).toHaveBeenCalled();
   });
   ```

## 13. Add Storybook Story (Optional)

1. Create `Button.stories.svelte`:
   ```svelte
   <script>
     import { defineMeta } from '@storybook/addon-svelte-csf';
     import Button from './Button.svelte';
     
     const { Story } = defineMeta({
       component: Button,
       title: 'Components/Button',
       tags: ['autodocs'],
       argTypes: {
         variant: {
           control: 'select',
           options: ['primary', 'secondary', 'danger']
         },
         size: {
           control: 'radio',
           options: ['small', 'medium', 'large']
         }
       }
     });
   </script>
   
   <Story name="Primary" args={{ label: 'Primary Button', variant: 'primary' }} />
   <Story name="Secondary" args={{ label: 'Secondary Button', variant: 'secondary' }} />
   <Story name="Disabled" args={{ label: 'Disabled', disabled: true }} />
   ```

## 14. Create Usage Documentation

1. Add JSDoc comments to component:
   ```typescript
   /**
    * A reusable button component with multiple variants and sizes.
    * 
    * @component
    * @example
    * ```svelte
    * <Button label="Click me" variant="primary" onClick={handleClick} />
    * ```
    */
   ```

2. Create README or usage examples:
   ```markdown
   # Button Component
   
   ## Usage
   
   ```svelte
   <script>
     import Button from '$lib/components/Button.svelte';
     
     function handleClick() {
       console.log('Button clicked!');
     }
   </script>
   
   <Button label="Click me" variant="primary" onClick={handleClick} />
   ```
   
   ## Props
   
   - `label` (string, required): Button text
   - `variant` ('primary' | 'secondary' | 'danger', default: 'primary'): Visual style
   - `size` ('small' | 'medium' | 'large', default: 'medium'): Button size
   - `disabled` (boolean, default: false): Disable the button
   ```

## 15. Export and Integrate Component

1. Create index file for clean imports (optional):
   ```typescript
   // src/lib/components/Button/index.ts
   export { default as Button } from './Button.svelte';
   export type { Props as ButtonProps } from './Button.svelte';
   ```

2. Add to main component exports:
   ```typescript
   // src/lib/components/index.ts
   export { Button } from './Button';
   ```

3. Verify component works:
   - Import in a test page
   - Test all props and variants
   - Verify accessibility
   - Run tests

4. Commit component with descriptive message:
   ```bash
   git add src/lib/components/Button
   git commit -m "feat: add Button component with variants and accessibility"
   ```

</detailed_sequence_steps>

</task>

