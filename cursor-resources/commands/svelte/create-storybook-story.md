<task name="Create Storybook Story">

<task_objective>
Create comprehensive Storybook stories for Svelte components using modern patterns and best practices. Input: Target Svelte component file with its props, slots, events, and states. Process: Analyze component interface, create story file using Svelte CSF v5 syntax, define all prop argTypes, create story variants for different states and use cases, add interactive play functions, and document component usage. Output: Comprehensive `.stories.svelte` file with multiple story variants demonstrating component functionality, proper controls configuration, accessibility tests, interaction tests, and complete component documentation.
</task_objective>

<detailed_sequence_steps>
# Create Storybook Story - Detailed Sequence of Steps

## 1. Analyze Target Component

1. Read the component file to understand its structure.

2. Identify all component props and their types:
   - Required props
   - Optional props with defaults
   - Prop types (string, number, boolean, object, array)

3. Find all slots the component accepts:
   - Named slots
   - Default slot
   - Slot props

4. Identify all events the component dispatches:
   - Event names
   - Event payload structure

5. Determine all possible component states:
   - Visual variants (primary, secondary, etc.)
   - Interactive states (hover, focus, active, disabled)
   - Loading states
   - Error states
   - Empty states

6. Check for accessibility features:
   - ARIA attributes
   - Keyboard navigation
   - Focus management

## 2. Create Story File Structure

1. Create story file adjacent to component:
   - Same directory as component
   - Name: `[ComponentName].stories.svelte`

2. Set up basic story file structure with Svelte CSF v5:
   ```svelte
   <script>
     import { defineMeta } from '@storybook/addon-svelte-csf';
     import { within, userEvent, expect } from '@storybook/test';
     import Component from './Component.svelte';

     const { Story } = defineMeta({
       component: Component,
       title: 'Category/Component',
       tags: ['autodocs']
     });
   </script>
   ```

3. Import necessary testing utilities for interactive stories.

## 3. Configure Meta Information

1. Set up component metadata in defineMeta:
   ```javascript
   const { Story } = defineMeta({
     component: Component,
     title: 'Category/Component',
     tags: ['autodocs'],
     parameters: {
       layout: 'centered',
       docs: {
         description: {
           component: 'Component description for docs'
         }
       }
     },
     argTypes: {
       // Configure in next step
     }
   });
   ```

2. Choose appropriate category path in title.

3. Add autodocs tag for automatic documentation generation.

4. Configure layout parameter (centered, fullscreen, padded).

5. Add component description for documentation.

## 4. Define ArgTypes

1. Configure argTypes for all props with appropriate controls:
   ```javascript
   argTypes: {
     variant: {
       control: 'select',
       options: ['primary', 'secondary', 'tertiary'],
       description: 'Visual style variant',
       table: {
         type: { summary: 'string' },
         defaultValue: { summary: 'primary' }
       }
     },
     size: {
       control: 'radio',
       options: ['small', 'medium', 'large'],
       description: 'Component size'
     },
     disabled: {
       control: 'boolean',
       description: 'Disables user interaction'
     },
     label: {
       control: 'text',
       description: 'Button label text'
     },
     onClick: {
       action: 'clicked',
       description: 'Fired when button is clicked'
     }
   }
   ```

2. Choose appropriate control type for each prop:
   - text, number, boolean
   - select, radio, check
   - color, date, object, array

3. Add descriptions for each argType.

4. Configure table metadata for documentation.

5. Set up actions for event handlers.

## 5. Create Basic Story Variants

1. Create Default story showing basic usage:
   ```svelte
   <Story name="Default" args={{ label: 'Click me' }} />
   ```

2. Create story for each visual variant:
   ```svelte
   <Story name="Primary" args={{ variant: 'primary', label: 'Primary' }} />
   <Story name="Secondary" args={{ variant: 'secondary', label: 'Secondary' }} />
   ```

3. Create stories for each size option:
   ```svelte
   <Story name="Small" args={{ size: 'small', label: 'Small' }} />
   <Story name="Large" args={{ size: 'large', label: 'Large' }} />
   ```

4. Create disabled state story:
   ```svelte
   <Story name="Disabled" args={{ disabled: true, label: 'Disabled' }} />
   ```

## 6. Create Stories with Slots

1. For components with slots, use snippet syntax:
   ```svelte
   <Story name="WithIcon">
     {#snippet template(args)}
       <Component {...args}>
         <Icon slot="icon" name="star" />
         Custom content
       </Component>
     {/snippet}
   </Story>
   ```

2. Create story for each named slot.

3. Create story showing all slots used together.

4. Document slot usage in story description.

## 7. Create Interactive Stories

1. Add play function for user interaction testing:
   ```svelte
   <Story 
     name="Interactive"
     args={{ label: 'Click me' }}
     play={async ({ canvasElement }) => {
       const canvas = within(canvasElement);
       const button = canvas.getByRole('button');
       
       await userEvent.click(button);
       await expect(button).toHaveTextContent('Clicked!');
     }}
   />
   ```

2. Test keyboard interactions:
   ```javascript
   await userEvent.tab();
   await userEvent.keyboard('{Enter}');
   ```

3. Test form interactions for form components.

4. Add assertions to verify expected behavior.

## 8. Create State-Based Stories

1. Create Loading state story:
   ```svelte
   <Story name="Loading" args={{ loading: true, label: 'Loading...' }} />
   ```

2. Create Error state story:
   ```svelte
   <Story name="Error" args={{ error: 'Something went wrong' }} />
   ```

3. Create Success state story.

4. Create Empty state story for data components.

## 9. Create Edge Case Stories

1. Create story with very long text:
   ```svelte
   <Story 
     name="LongText" 
     args={{ 
       label: 'This is a very long label that might cause overflow issues in the component layout'
     }} 
   />
   ```

2. Create story with missing/null data.

3. Create story with maximum values.

4. Create story with special characters.

## 10. Create Responsive Stories

1. Create story with viewport configuration:
   ```svelte
   <Story 
     name="Mobile"
     args={{ label: 'Mobile View' }}
     parameters={{
       viewport: { defaultViewport: 'mobile1' }
     }}
   />
   ```

2. Create tablet viewport story.

3. Create desktop viewport story.

## 11. Create Accessibility Stories

1. Create story testing focus states:
   ```svelte
   <Story 
     name="FocusState"
     play={async ({ canvasElement }) => {
       const canvas = within(canvasElement);
       const button = canvas.getByRole('button');
       button.focus();
     }}
   />
   ```

2. Create story testing ARIA attributes.

3. Add accessibility checks using a11y addon.

## 12. Create Custom Render Stories

1. For complex layouts, use custom render:
   ```svelte
   <Story name="Grid">
     {#snippet template()}
       <div class="grid grid-cols-3 gap-4">
         <Component variant="primary" />
         <Component variant="secondary" />
         <Component variant="tertiary" />
       </div>
     {/snippet}
   </Story>
   ```

2. Create comparison stories showing multiple variants side by side.

## 13. Add Decorators (Optional)

1. Add decorators for specific stories:
   ```javascript
   parameters: {
     decorators: [
       (Story) => ({
         Component: Story,
         props: {
           style: 'background: #333; padding: 2rem;'
         }
       })
     ]
   }
   ```

2. Use decorators for dark mode testing.

3. Use decorators for container constraints.

## 14. Document Stories

1. Add descriptions to complex stories:
   ```svelte
   <Story 
     name="Complex"
     args={{ ... }}
     parameters={{
       docs: {
         description: {
           story: 'This story demonstrates...'
         }
       }
     }}
   />
   ```

2. Add code examples in documentation.

3. Document accessibility considerations.

4. Add design notes and usage guidelines.

## 15. Verify and Test Stories

1. Start Storybook and verify all stories render.

2. Test all controls work correctly.

3. Verify play functions execute successfully.

4. Check accessibility addon for issues.

5. Test stories in different viewports.

6. Verify documentation is generated correctly.

</detailed_sequence_steps>

</task>

