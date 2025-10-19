<task name="Troubleshoot Storybook">

<task_objective>
Diagnose and fix common Storybook issues in SvelteKit projects, including build errors, module problems, and configuration issues. Input: Error messages, stack traces, Storybook configuration files, and project setup details. Process: Analyze error symptoms, identify root cause category (build, module resolution, styling, environment, performance, or addon conflicts), apply appropriate fixes, validate solution, and document resolution. Output: Working Storybook installation with all errors resolved, proper configuration in place, all stories rendering correctly, and documentation of fixes applied for team reference.
</task_objective>

<detailed_sequence_steps>
# Troubleshoot Storybook - Detailed Sequence of Steps

## 1. Gather Diagnostic Information

1. Collect error messages from console and terminal output.

2. Capture stack traces showing error origins.

3. Review `.storybook/main.js` configuration.

4. Review `.storybook/preview.js` configuration.

5. Check package.json for Storybook-related dependencies and versions.

6. Note recent changes that might have triggered the issue.

7. Identify Storybook version and SvelteKit version.

## 2. Categorize the Issue

1. Determine if error is:
   - Build/compilation error
   - Module resolution error
   - Styling/CSS issue
   - Environment variable problem
   - Performance issue
   - Addon conflict
   - SSR/component compatibility issue
   - Testing/interaction issue

2. Check if error occurs during:
   - Storybook startup
   - Story rendering
   - Interaction/play functions
   - Build process

## 3. Fix Build and Compilation Errors

1. For "__esbuild_register_import_meta_url__ already declared" error:
   - Remove `svelteOptions` from `.storybook/main.js`
   - Verify using @storybook/sveltekit framework
   - This is v6 to v7 migration issue

2. For "Module not found" compilation errors:
   - Check import paths in stories
   - Verify component file locations
   - Update imports to correct paths

3. For TypeScript compilation errors:
   - Check `.storybook/tsconfig.json` if exists
   - Verify type definitions are installed
   - Update story files to proper TypeScript syntax

## 4. Fix Module Resolution Issues

1. Configure Vite aliases in `.storybook/main.js`:
   ```javascript
   export default {
     framework: {
       name: '@storybook/sveltekit',
       options: {
         builder: {
           viteConfigPath: './vite.config.js'
         }
       }
     },
     viteFinal: async (config) => {
       config.resolve.alias = {
         ...config.resolve.alias,
         $lib: path.resolve('./src/lib'),
         $app: path.resolve('./.storybook/mocks/app')
       };
       return config;
     }
   };
   ```

2. Import path module at top of main.js:
   ```javascript
   import path from 'path';
   ```

3. Verify alias configuration matches svelte.config.js.

## 5. Fix SvelteKit Module Errors

1. For "Cannot find module '$app/stores'" error:
   - These modules require mocking in Storybook
   - Use `parameters.sveltekit_experimental` in stories

2. Create mock files if needed in `.storybook/mocks/app/stores.js`:
   ```javascript
   import { writable } from 'svelte/store';
   
   export const page = writable({
     url: new URL('http://localhost:6006'),
     params: {},
     route: { id: '/' },
     data: {}
   });
   
   export const navigating = writable(null);
   export const updated = writable(false);
   ```

3. Configure module mocking in preview.js if needed.

4. Update stories to use proper SvelteKit module mocking parameters.

## 6. Fix CSS and Styling Issues

1. For global styles not loading:
   - Add imports to `.storybook/preview.js`:
   ```javascript
   import '../src/app.css';
   import '../src/app.postcss';
   import '../src/styles/global.css';
   ```

2. For Tailwind CSS not working:
   - Install PostCSS addon:
   ```bash
   npm install -D @storybook/addon-postcss
   ```
   - Configure in `.storybook/main.js`:
   ```javascript
   export default {
     addons: [
       {
         name: '@storybook/addon-postcss',
         options: {
           postcssLoaderOptions: {
             implementation: require('postcss')
           }
         }
       }
     ]
   };
   ```

3. Verify Tailwind config is accessible to Storybook.

4. Check that PostCSS plugins are properly configured.

## 7. Fix Component Import Issues

1. For SSR-incompatible components:
   - Mark stories as client-only:
   ```javascript
   export const Default = {
     parameters: {
       storyshots: { disable: true }
     }
   };
   ```

2. For dynamic import issues:
   - Use lazy loading for heavy components:
   ```javascript
   const HeavyComponent = lazy(() => import('./HeavyComponent.svelte'));
   ```

3. Check if component uses browser-only APIs without proper guards.

## 8. Fix Environment Variable Issues

1. For PUBLIC_ variables not available:
   - Configure in `.storybook/main.js`:
   ```javascript
   export default {
     env: (config) => ({
       ...config,
       PUBLIC_API_URL: process.env.PUBLIC_API_URL || 'http://localhost:3000'
     })
   };
   ```

2. Create `.env.storybook` file:
   ```bash
   PUBLIC_API_URL=http://localhost:3000
   PUBLIC_FEATURE_FLAG=true
   ```

3. Load environment variables in preview.js if needed.

## 9. Fix Performance Issues

1. For slow build times:
   - Enable Storybook optimizations in `.storybook/main.js`:
   ```javascript
   export default {
     features: {
       buildStoriesJson: true,
       storyStoreV7: true
     },
     core: {
       disableTelemetry: true
     }
   };
   ```

2. Exclude large dependencies from Storybook build.

3. Use production builds for dependencies.

4. Enable Vite build caching.

5. Reduce number of stories loaded simultaneously.

## 10. Fix Addon Conflicts

1. Check for version mismatches:
   ```bash
   npm ls @storybook/svelte
   npm ls @storybook/sveltekit
   npm ls @storybook/addon-svelte-csf
   ```

2. Update all Storybook packages to matching versions:
   ```bash
   npx storybook@latest upgrade
   ```

3. Verify addon compatibility with current Storybook version.

4. Remove conflicting or deprecated addons.

5. Check addon configuration in main.js for proper syntax.

## 11. Fix Testing and Interaction Issues

1. For play functions not working:
   - Verify testing library imports:
   ```javascript
   import { within, userEvent, expect } from '@storybook/test';
   ```

2. For interaction tests failing:
   - Check element selectors are correct
   - Add proper wait conditions:
   ```javascript
   await waitFor(() => expect(element).toBeInTheDocument());
   ```
   - Use data-testid attributes for reliable selection:
   ```svelte
   <button data-testid="submit-btn">Submit</button>
   ```

3. Add debugging to interaction tests:
   ```javascript
   const { debug } = within(canvasElement);
   debug();
   ```

## 12. Run Debugging Checklist

1. Verify Storybook and SvelteKit versions are compatible.

2. Check framework configuration in main.js.

3. Validate all required module mocks are in place.

4. Review Vite configuration and aliases.

5. Check addon compatibility and versions.

6. Test stories in isolation mode.

7. Review browser console for client-side errors.

8. Review terminal output for build errors.

## 13. Test Solution

1. Clear Storybook cache:
   ```bash
   rm -rf node_modules/.cache/storybook
   ```

2. Restart Storybook:
   ```bash
   npm run storybook
   ```

3. Verify all stories render correctly.

4. Test story interactions and controls.

5. Check that all addons function properly.

6. Run build command to verify production build:
   ```bash
   npm run build-storybook
   ```

## 14. Document Resolution

1. Document the error encountered.

2. Record the root cause identified.

3. List all fixes applied.

4. Create troubleshooting guide entry for team.

5. Update project documentation with any configuration changes.

6. Add comments in config files explaining non-obvious settings.

7. Consider creating a team wiki entry for recurring issues.

</detailed_sequence_steps>

</task>

