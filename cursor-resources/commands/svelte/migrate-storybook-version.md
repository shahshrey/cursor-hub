<task name="Migrate Storybook Version">

<task_objective>
Migrate Storybook configurations and stories to newer versions, including Svelte CSF v5 and @storybook/sveltekit framework. Input: Current Storybook setup (version, configuration files, and story files). Process: Analyze current setup, update dependencies, migrate configuration syntax, convert story formats, update module mocking patterns, and validate functionality. Output: Fully migrated Storybook installation with updated configurations, converted stories using modern syntax, and verified working setup with all addons functional.
</task_objective>

<detailed_sequence_steps>
# Migrate Storybook Version - Detailed Sequence of Steps

## 1. Analyze Current Setup

1. Identify current Storybook version from package.json.

2. Review existing Storybook configuration files:
   - `.storybook/main.js` or `.storybook/main.ts`
   - `.storybook/preview.js` or `.storybook/preview.ts`

3. Inventory all story files and their current format.

4. Check for custom addons and configurations.

5. Document current module mocking approach.

6. Create backup of current setup.

## 2. Plan Migration Path

1. Determine target Storybook version (v7+).

2. Identify required migration steps:
   - Storybook 6.x to 7.x core migration
   - Framework migration to @storybook/sveltekit
   - Svelte CSF v4 to v5 migration
   - Module mocking updates

3. Check for breaking changes in target version.

4. Create migration checklist with all required updates.

## 3. Update Core Storybook Dependencies

1. Run automated upgrade command:
   ```bash
   npx storybook@latest upgrade
   ```

2. Update framework dependency:
   ```bash
   npm uninstall @storybook/svelte-vite @storybook/builder-vite @storybook/svelte
   npm install -D @storybook/sveltekit
   ```

3. Update Svelte CSF addon:
   ```bash
   npm install -D @storybook/addon-svelte-csf@latest
   ```

4. Remove obsolete packages:
   - storybook-builder-vite
   - @storybook/svelte-vite
   - Other deprecated addons

5. Verify dependency tree for conflicts.

## 4. Migrate Configuration Files

1. Update `.storybook/main.js` framework configuration:
   ```javascript
   // Old
   module.exports = {
     framework: '@storybook/svelte',
     svelteOptions: { ... }
   };
   
   // New
   export default {
     framework: {
       name: '@storybook/sveltekit',
       options: {}
     }
   };
   ```

2. Convert module.exports to ES module exports.

3. Remove `svelteOptions` configuration (v6 to v7 migration).

4. Update stories glob patterns if needed.

5. Update addon configurations to new format.

6. Migrate addon parameters to use tags where applicable:
   ```javascript
   // Old
   parameters: { docs: { autodocs: true } }
   
   // New
   tags: ['autodocs']
   ```

## 5. Migrate Svelte CSF Story Syntax (v4 to v5)

1. For each story file, convert Meta Component to defineMeta:
   ```svelte
   <!-- Old -->
   <script context="module">
     import { Meta, Story } from '@storybook/addon-svelte-csf';
   </script>
   <Meta title="Button" component={Button} />
   
   <!-- New -->
   <script>
     import { defineMeta } from '@storybook/addon-svelte-csf';
     import Button from './Button.svelte';
     
     const { Story } = defineMeta({
       title: 'Button',
       component: Button
     });
   </script>
   ```

2. Convert Template pattern to children/snippets:
   ```svelte
   <!-- Old -->
   <Story name="Default">
     <Template let:args>
       <Button {...args} />
     </Template>
   </Story>
   
   <!-- New -->
   <Story name="Default" args={{ label: 'Click' }}>
     {#snippet template(args)}
       <Button {...args} />
     {/snippet}
   </Story>
   ```

3. Update all story definitions to new syntax.

4. Remove context="module" script blocks.

## 6. Migrate CSF 2 to CSF 3 Format

1. For JavaScript/TypeScript story files, update to CSF 3:
   ```javascript
   // Old (CSF 2)
   export const Primary = (args) => ({
     Component: Button,
     props: args
   });
   Primary.args = { variant: 'primary' };
   
   // New (CSF 3)
   export const Primary = {
     args: { variant: 'primary' }
   };
   ```

2. Move story args inline with story definition.

3. Update story structure to object-based format.

## 7. Update Module Mocking

1. Remove custom mock files approach.

2. Migrate to parameters-based mocking:
   ```javascript
   // Old
   import { page } from './__mocks__/stores';
   
   // New
   export const Default = {
     parameters: {
       sveltekit_experimental: {
         stores: { 
           page: { url: new URL('https://example.com'), params: {}, data: {} }
         }
       }
     }
   };
   ```

3. Update navigation mocks to new parameter structure.

4. Convert form enhancement mocks.

5. Update link handling configuration.

## 8. Create Migration Script Helper

1. Create migration helper script to automate story conversions:
   ```javascript
   // migration-helper.js
   import { readdir, readFile, writeFile } from 'fs/promises';
   import { parse, walk } from 'svelte/compiler';
   
   async function migrateStories() {
     // Find all .stories.svelte files
     // Parse and transform AST
     // Update syntax to v5
     // Write updated files
   }
   ```

2. Run migration script on all story files.

3. Review and manually fix edge cases.

## 9. Test and Validate Migration

1. Start Storybook development server:
   ```bash
   npm run storybook
   ```

2. Verify all stories render correctly.

3. Test story interactions and controls.

4. Verify all addon functionality works.

5. Test build process:
   ```bash
   npm run build-storybook
   ```

6. Check for console errors or warnings.

7. Test module mocking functionality.

8. Validate accessibility addon integration.

## 10. Update CI/CD Configuration

1. Update CI/CD pipelines with new Storybook commands.

2. Update deployment configuration if using Chromatic or similar services.

3. Verify automated tests still pass.

4. Update documentation with new patterns.

## 11. Document Migration and Cleanup

1. Document breaking changes encountered.

2. Create migration guide for team members.

3. Update project documentation with new Storybook patterns.

4. Remove old mock files and obsolete configurations.

5. Create git commit with comprehensive migration notes.

</detailed_sequence_steps>

</task>

