<task name="General Storybook Assistance">

<task_objective>
Provide general-purpose Storybook assistance for SvelteKit projects, including setup guidance, best practices, and common tasks. Input: User's Storybook-related question or task request, current project state, and existing Storybook configuration. Process: Assess request type (setup, story creation, configuration, optimization, or troubleshooting), analyze current Storybook installation, provide relevant guidance or implementation, and recommend best practices. Output: Comprehensive assistance with actionable guidance, code examples, configuration recommendations, and implementation steps tailored to the specific request and project context.
</task_objective>

<detailed_sequence_steps>
# General Storybook Assistance - Detailed Sequence of Steps

## 1. Assess the Request

1. Determine the primary request category:
   - Initial setup and installation
   - Story creation for components
   - Configuration and customization
   - Troubleshooting and debugging
   - Performance optimization
   - Visual testing setup
   - Team workflows and documentation

2. Understand user's current state:
   - Is Storybook already installed?
   - What version is being used?
   - What issues or goals does user have?

3. Identify the user's expertise level with Storybook.

4. Note any specific constraints or requirements.

## 2. Analyze Current Storybook Setup

1. Check if Storybook is installed by examining package.json.

2. If installed, identify Storybook version:
   - Check @storybook/* package versions
   - Determine if using latest v7+ or older versions

3. Review `.storybook/main.js` configuration:
   - Framework configuration
   - Installed addons
   - Stories glob patterns
   - Custom configurations

4. Review `.storybook/preview.js` for global settings.

5. Identify current story format being used:
   - Svelte CSF (v4 or v5)
   - JavaScript/TypeScript CSF
   - MDX stories

## 3. Provide Setup Guidance

1. If Storybook not installed:
   - Guide through installation process
   - Recommend running `npx storybook@latest init`
   - Help configure for SvelteKit framework
   - Set up essential addons

2. If Storybook is installed but needs configuration:
   - Review and optimize main.js settings
   - Configure preview settings
   - Set up proper story locations
   - Configure static asset handling

3. Recommend essential addons for SvelteKit:
   - @storybook/addon-essentials (core functionality)
   - @storybook/addon-svelte-csf (native Svelte stories)
   - @storybook/addon-a11y (accessibility testing)
   - @storybook/addon-interactions (interaction testing)

## 4. Assist with Story Creation

1. If user needs help creating stories:
   - Identify target component
   - Analyze component props and structure
   - Recommend story structure using Svelte CSF v5
   - Provide story template

2. Guide on story organization:
   - Recommend title/category structure
   - Suggest co-location pattern (component + story + test)
   - Provide naming conventions

3. Help configure controls and argTypes for component props.

4. Suggest story variants to create:
   - Default/basic usage
   - All visual variants
   - Interactive states
   - Edge cases
   - Accessibility focused stories

## 5. Provide Configuration Assistance

1. For SvelteKit module mocking:
   - Explain what needs mocking ($app/stores, $app/navigation, etc.)
   - Show how to use parameters.sveltekit_experimental
   - Provide mock configuration examples

2. For styling configuration:
   - Help import global styles in preview.js
   - Configure Tailwind or other CSS frameworks
   - Set up PostCSS if needed

3. For environment variables:
   - Configure PUBLIC_ variables
   - Set up .env files for Storybook

4. For path aliases:
   - Configure viteFinal in main.js
   - Match aliases to svelte.config.js

## 6. Recommend Best Practices

1. Story writing best practices:
   - Use Svelte CSF format for native Svelte syntax
   - Implement autodocs tags for automatic documentation
   - Create comprehensive argTypes with descriptions
   - Use play functions for interaction testing
   - Document components thoroughly

2. Project structure recommendations:
   ```
   src/lib/components/
   ├── Button/
   │   ├── Button.svelte
   │   ├── Button.stories.svelte
   │   └── Button.test.ts
   ```

3. Naming conventions:
   - Component: PascalCase (Button.svelte)
   - Story: PascalCase.stories.svelte (Button.stories.svelte)
   - Title: Category/Component

4. Documentation practices:
   - Use autodocs for automatic generation
   - Add component descriptions
   - Document prop usage
   - Include accessibility notes
   - Provide usage examples

## 7. Guide on Addon Usage

1. Essential addons explanation:
   - Controls: Interactive prop manipulation
   - Actions: Event handler logging
   - Viewport: Responsive testing
   - A11y: Accessibility auditing
   - Interactions: Automated interaction testing

2. Configure addons in stories:
   - Show parameter usage
   - Demonstrate addon-specific features
   - Provide configuration examples

3. Recommend additional addons based on needs:
   - @chromatic-com/storybook for visual testing
   - Design integrations (Figma, Zeroheight)
   - Performance monitoring addons

## 8. Assist with Testing Integration

1. Explain interaction testing with play functions:
   - Import testing utilities
   - Write interaction scenarios
   - Add assertions
   - Debug test failures

2. Set up visual testing:
   - Configure Chromatic
   - Set up CI/CD integration
   - Establish approval workflows

3. Accessibility testing setup:
   - Configure a11y addon
   - Run accessibility audits
   - Fix reported issues

## 9. Provide Optimization Guidance

1. Performance optimization:
   - Enable storyStoreV7
   - Configure build optimizations
   - Lazy load heavy components
   - Optimize story loading

2. Build optimization:
   - Configure staticDirs properly
   - Optimize asset loading
   - Enable caching
   - Minimize bundle size

3. Development workflow optimization:
   - Set up useful npm scripts
   - Configure hot reload
   - Optimize story search

## 10. Guide on CI/CD Setup

1. Set up Storybook build in CI:
   - Add build-storybook to CI pipeline
   - Deploy static Storybook build
   - Configure hosting (Netlify, Vercel, etc.)

2. Configure Chromatic in CI:
   - Set up GitHub Actions workflow
   - Configure project tokens
   - Establish review processes

3. Integrate with testing frameworks:
   - Run interaction tests in CI
   - Generate test reports
   - Configure failure handling

## 11. Assist with Team Workflows

1. Establish story review processes:
   - Include stories in code reviews
   - Require stories for new components
   - Document component changes

2. Documentation practices:
   - Use Storybook as component library documentation
   - Create introduction and guide pages
   - Maintain design system documentation

3. Collaboration tools:
   - Set up shared Storybook deployment
   - Integrate with design tools
   - Enable feedback mechanisms

## 12. Troubleshooting Support

1. If user reports issues:
   - Gather error information
   - Identify issue category
   - Provide targeted solutions
   - Reference detailed troubleshooting workflow if needed

2. Common issues quick fixes:
   - Module resolution: Configure aliases
   - SvelteKit modules: Set up mocking
   - Styling: Import global styles
   - Performance: Enable optimizations

## 13. Provide Examples and Resources

1. Create code examples relevant to user's request.

2. Link to relevant Storybook documentation.

3. Provide SvelteKit-specific Storybook resources.

4. Share community examples and patterns.

5. Reference official Svelte CSF documentation.

## 14. Follow-up and Next Steps

1. Verify solution addresses user's needs.

2. Suggest next steps for improvement:
   - Additional stories to create
   - Configuration enhancements
   - Team adoption strategies
   - Advanced features to explore

3. Provide learning resources for continued improvement.

4. Offer to assist with related tasks if needed.

</detailed_sequence_steps>

</task>

