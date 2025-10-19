<task name="Setup Storybook">

<task_objective>
Initialize and configure Storybook for SvelteKit projects with optimal settings and structure. Input: SvelteKit project structure, required addons, and configuration preferences. Process: Install Storybook dependencies, configure for SvelteKit framework, set up Svelte CSF addon, create configuration files, establish project structure, and add essential scripts. Output: Fully configured Storybook installation with proper SvelteKit integration, example stories, essential addons configured, npm scripts for development and building, and ready-to-use Storybook development environment.
</task_objective>

<detailed_sequence_steps>
# Setup Storybook - Detailed Sequence of Steps

## 1. Assess Project State

1. Check if Storybook is already installed by examining package.json.

2. Verify SvelteKit project structure exists.

3. Check for existing `.storybook` directory.

4. Identify current dependencies and versions.

5. Review project's styling setup (Tailwind, vanilla CSS, etc.).

## 2. Install Storybook

1. Run automated installation command:
   ```bash
   npx storybook@latest init
   ```

2. Allow Storybook to detect SvelteKit framework.

3. Confirm installation prompts and addon selections.

4. Wait for dependency installation to complete.

5. Verify successful installation.

## 3. Install Additional Required Dependencies

1. Install Svelte CSF addon:
   ```bash
   npm install -D @storybook/addon-svelte-csf
   ```

2. Install accessibility addon:
   ```bash
   npm install -D @storybook/addon-a11y
   ```

3. Install interactions addon:
   ```bash
   npm install -D @storybook/addon-interactions
   ```

4. Install Chromatic for visual testing (optional):
   ```bash
   npm install -D @chromatic-com/storybook
   ```

5. Verify all dependencies installed correctly.

## 4. Configure Main Storybook Configuration

1. Create or update `.storybook/main.js`:
   ```javascript
   export default {
     stories: ['../src/**/*.stories.@(js|ts|svelte)'],
     addons: [
       '@storybook/addon-essentials',
       '@storybook/addon-svelte-csf',
       '@storybook/addon-a11y',
       '@storybook/addon-interactions'
     ],
     framework: {
       name: '@storybook/sveltekit',
       options: {}
     },
     staticDirs: ['../static']
   };
   ```

2. Configure stories glob pattern to match project structure.

3. Add all required addons to the addons array.

4. Set framework to @storybook/sveltekit.

5. Configure staticDirs to point to project's static assets.

6. Add any project-specific Vite configuration if needed.

## 5. Configure Preview Settings

1. Create or update `.storybook/preview.js`:
   ```javascript
   import '../src/app.css';
   
   export const parameters = {
     actions: { argTypesRegex: '^on[A-Z].*' },
     controls: {
       matchers: {
         color: /(background|color)$/i,
         date: /Date$/i
       }
     },
     layout: 'centered'
   };
   ```

2. Import global styles (app.css, Tailwind, etc.).

3. Configure actions addon for event handlers.

4. Set up controls matchers for proper control types.

5. Configure default layout preference.

6. Add any global decorators if needed.

## 6. Set Up Project Structure

1. Create recommended directory structure:
   ```
   src/
   ├── lib/
   │   └── components/
   │       ├── Button/
   │       │   ├── Button.svelte
   │       │   ├── Button.stories.svelte
   │       │   └── Button.test.ts
   │       └── Card/
   │           ├── Card.svelte
   │           └── Card.stories.svelte
   └── stories/
       ├── Introduction.mdx
       └── Configure.mdx
   ```

2. Create components directory if it doesn't exist.

3. Create stories directory for documentation pages.

4. Set up component co-location pattern (component + story + test in same folder).

## 7. Create Example Stories

1. Create Introduction.mdx in stories directory with project-specific documentation.

2. Create Configure.mdx with setup instructions.

3. Create at least one example component story using Svelte CSF:
   ```svelte
   <script>
     import { defineMeta } from '@storybook/addon-svelte-csf';
     import Button from './Button.svelte';
     
     const { Story } = defineMeta({
       component: Button,
       title: 'Components/Button',
       tags: ['autodocs']
     });
   </script>
   
   <Story name="Default" args={{ label: 'Click me' }} />
   ```

4. Verify example story uses proper Svelte CSF v5 syntax.

5. Add multiple story variants to demonstrate usage.

## 8. Configure NPM Scripts

1. Update package.json with Storybook scripts:
   ```json
   {
     "scripts": {
       "storybook": "storybook dev -p 6006",
       "build-storybook": "storybook build",
       "test-storybook": "test-storybook",
       "chromatic": "chromatic --exit-zero-on-changes"
     }
   }
   ```

2. Verify port doesn't conflict with dev server (default 6006).

3. Add build script for static Storybook generation.

4. Add test script for interaction testing.

5. Add Chromatic script if using visual testing.

## 9. Configure SvelteKit Integration

1. Set up module alias configuration in `.storybook/main.js` if needed:
   ```javascript
   viteFinal: async (config) => {
     config.resolve.alias = {
       ...config.resolve.alias,
       $lib: path.resolve('./src/lib')
     };
     return config;
   }
   ```

2. Configure SvelteKit module mocking parameters in preview.js.

3. Set up path aliases to match svelte.config.js.

4. Configure handling of static assets.

5. Set up SSR considerations for component stories.

## 10. Set Up GitHub Actions (Optional)

1. Create `.github/workflows/chromatic.yml` for visual testing:
   ```yaml
   name: Chromatic
   on: push
   jobs:
     chromatic:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: npm ci
         - run: npm run chromatic
   ```

2. Configure Chromatic project token in GitHub secrets.

3. Set up build and test workflows.

## 11. Test Installation

1. Start Storybook development server:
   ```bash
   npm run storybook
   ```

2. Verify Storybook opens in browser at correct port.

3. Check that example stories render correctly.

4. Test all installed addons are functional.

5. Verify global styles are applied.

6. Test hot reload functionality.

## 12. Document Setup

1. Create or update README section about Storybook usage.

2. Document how to create new stories.

3. Add guidelines for story organization.

4. Document any project-specific Storybook configurations.

5. Provide troubleshooting tips for common issues.

</detailed_sequence_steps>

</task>

