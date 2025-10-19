<task name="Generate Next.js Component">

<task_objective>
Generate optimized React components for Next.js applications following best practices and project conventions. Takes component name and type flags (--client, --server, --page, --layout) as input, analyzes project structure (framework detection, TypeScript/JavaScript, styling approach, existing patterns), creates comprehensive component files (main component, styles, types, tests, stories), implements proper patterns (Server Components by default, Client Components with 'use client', proper TypeScript typing, accessibility features), and generates complete file structure with barrel exports and documentation.
</task_objective>

<detailed_sequence_steps>

## 1. Project Analysis and Context Detection

1. Parse component name and flags from arguments
   - Extract component name (PascalCase expected)
   - Detect --client flag for Client Component (interactive)
   - Detect --server flag for Server Component (default for Next.js 13+)
   - Detect --page flag for route-level Page Component
   - Detect --layout flag for Layout Component
   - Set default based on Next.js version and interactivity needs

2. Analyze project framework and structure
   - Read next.config.js to detect Next.js version
   - Check for app/ directory (App Router) vs pages/ (Pages Router)
   - Detect components/ directory location and structure
   - Check for existing component organization patterns

3. Detect language and tooling
   - Check for tsconfig.json to confirm TypeScript usage
   - Verify TypeScript is JavaScript project
   - Check for @types packages in package.json
   - Determine file extensions (.tsx/.jsx or .ts/.js)

4. Detect styling approach
   - Check for tailwind.config.js (Tailwind CSS)
   - Check for CSS Modules pattern (*.module.css files)
   - Check for styled-components or emotion in package.json
   - Check for global CSS or CSS-in-JS
   - Determine which approach to use for new component

5. Detect testing framework
   - Check for jest.config.js or vitest.config.js
   - Check for @testing-library/react in devDependencies
   - Determine if tests should be generated

6. Detect Storybook usage
   - Check for .storybook/ directory
   - Check for @storybook packages in devDependencies
   - Determine if stories should be generated

## 2. Determine Component Structure and Location

1. Determine component directory
   - For standard components: components/[ComponentName]/
   - For UI primitives: components/ui/[ComponentName]/
   - For page components: app/[route]/
   - For layout components: app/[route]/

2. Create directory structure
   - Create main component directory
   - Prepare for multiple files (component, styles, types, tests)

3. Determine file naming conventions
   - Main component: [ComponentName].tsx or [ComponentName].jsx
   - Styles: [ComponentName].module.css (if CSS Modules)
   - Types: types.ts or inline in component file
   - Tests: [ComponentName].test.tsx
   - Stories: [ComponentName].stories.tsx (if Storybook)
   - Barrel export: index.ts

## 3. Generate Main Component File

1. Create component file header
   - Add 'use client' directive if Client Component
   - Import React and necessary hooks (useState, useEffect, etc.)
   - Import Next.js components (Image, Link, etc.) if needed
   - Import styles (CSS Module or className helpers)

2. Define TypeScript interfaces (if TypeScript)
   - Create [ComponentName]Props interface
   - Add JSDoc comments for each prop
   - Include children?: React.ReactNode if needed
   - Add className?: string for style overrides
   - Include event handlers (onClick, onChange, etc.)
   - Add any component-specific props

3. Generate component implementation
   - For Server Components: Standard function component with async support
   - For Client Components: Include 'use client' directive, use hooks
   - For Page Components: Accept params and searchParams props
   - For Layout Components: Include children prop, wrap structure

4. Implement component logic
   - Add state management if Client Component (useState)
   - Add lifecycle effects if needed (useEffect)
   - Implement event handlers
   - Add data fetching for Server Components (async/await)
   - Include prop destructuring with defaults

5. Create component JSX/TSX return
   - Use semantic HTML elements
   - Apply proper ARIA attributes for accessibility
   - Include className with CSS Module or Tailwind classes
   - Implement conditional rendering if needed
   - Add proper key props for lists

6. Add TypeScript type annotations
   - Annotate function with React.FC<Props> or direct typing
   - Type event handlers correctly
   - Type async functions with Promise returns
   - Ensure all variables are properly typed

7. Export component
   - Default export for main component
   - Named export for Props interface
   - Add JSDoc documentation comment above component

## 4. Generate Component Styles

1. Create CSS Module file (if using CSS Modules)
   - Generate [ComponentName].module.css
   - Add base container styles
   - Include responsive breakpoints
   - Add hover/focus/active states
   - Include proper spacing and layout
   - Add variants if needed (primary, secondary, etc.)

2. Generate Tailwind classes (if using Tailwind)
   - Create utility-first className strings
   - Use responsive classes (sm:, md:, lg:)
   - Include hover and focus variants
   - Add dark mode classes if applicable
   - Keep classes organized and readable

3. Add responsive design rules
   - Mobile-first approach
   - Add breakpoints (@media queries or Tailwind)
   - Ensure touch-friendly sizing (min 44x44px)
   - Test layouts at different widths

4. Include accessibility styles
   - Visible focus indicators
   - Sufficient color contrast
   - Readable font sizes
   - Proper spacing for readability

## 5. Generate Type Definitions

1. Create types.ts file (if separate from component)
   - Export BaseComponentProps with common props
   - Export component-specific prop interfaces
   - Include union types for variants
   - Define complex prop types (arrays, objects)

2. Define reusable types
   - Size variants: 'sm' | 'md' | 'lg'
   - Color variants: 'primary' | 'secondary' | 'outline'
   - Status types for state management
   - Event handler types

3. Document types with JSDoc
   - Add descriptions for each interface
   - Document complex prop structures
   - Include usage examples in comments

## 6. Generate Unit Tests

1. Create test file [ComponentName].test.tsx
   - Import testing libraries (@testing-library/react)
   - Import component to test
   - Setup test utilities and mocks

2. Write basic rendering tests
   - Test: should render children correctly
   - Test: should apply custom className
   - Test: should render with default props
   - Test: should handle missing optional props

3. Write interaction tests (for Client Components)
   - Test: should handle click events
   - Test: should update state correctly
   - Test: should call callback props
   - Test: should handle form inputs

4. Write accessibility tests
   - Test: should have proper ARIA attributes
   - Test: should be keyboard accessible
   - Test: should have accessible names/labels
   - Test: should have proper semantic HTML

5. Write conditional rendering tests
   - Test different prop combinations
   - Test loading states
   - Test error states
   - Test empty states

6. Add snapshot tests (optional)
   - Capture component render output
   - Ensure consistent rendering
   - Update snapshots when intentionally changed

## 7. Generate Storybook Stories (if applicable)

1. Create [ComponentName].stories.tsx
   - Import Meta and StoryObj types from @storybook/react
   - Import component
   - Define meta configuration

2. Setup story metadata
   - Set title: 'Components/[ComponentName]'
   - Configure component
   - Add parameters (layout, docs description)
   - Add tags: ['autodocs']
   - Configure argTypes for interactive controls

3. Create story variants
   - Default story with basic props
   - Story for each variant (if applicable)
   - Story for different states (loading, error, success)
   - Story for edge cases (long text, empty data)
   - Interactive story with action handlers

4. Configure story controls
   - Add action loggers for event handlers
   - Configure control types (text, boolean, select)
   - Set default values
   - Add descriptions

## 8. Create Barrel Export

1. Generate index.ts file
   - Export default component: export { default } from './ComponentName'
   - Export named types: export type { ComponentNameProps } from './ComponentName'
   - Export any utility functions
   - Keep exports clean and minimal

2. Verify import paths
   - Ensure relative paths are correct
   - Use consistent import style with project

## 9. Implement Framework-Specific Features

1. For Server Components
   - Mark as async if doing data fetching
   - Use fetch with Next.js caching options
   - Implement proper error boundaries
   - Add loading.tsx for Suspense boundaries
   - Include metadata exports for SEO

2. For Client Components
   - Add 'use client' directive at top
   - Use React hooks appropriately
   - Implement proper error boundaries
   - Handle loading states in UI
   - Optimize re-renders with memo if needed

3. For Page Components
   - Export metadata object or generateMetadata function
   - Accept params and searchParams props
   - Implement proper data fetching
   - Add error.tsx for error handling
   - Create loading.tsx for loading states

4. For Layout Components
   - Include children prop in interface
   - Setup persistent layout structure
   - Add navigation if applicable
   - Include footer and header if needed
   - Configure proper nesting

## 10. Implement Accessibility Features

1. Add semantic HTML
   - Use proper HTML5 elements (button, nav, main, etc.)
   - Avoid div soup
   - Use heading hierarchy correctly

2. Add ARIA attributes
   - aria-label for icon buttons
   - aria-labelledby for complex components
   - aria-describedby for additional context
   - role attributes where needed
   - aria-hidden for decorative elements

3. Implement keyboard navigation
   - Ensure tab order is logical
   - Add keyboard event handlers (onKeyDown)
   - Support Enter and Space for activation
   - Add focus management for modals/dialogs

4. Ensure visible focus indicators
   - Style :focus and :focus-visible states
   - Use outline or ring styles
   - Ensure sufficient contrast
   - Test keyboard navigation

5. Add screen reader support
   - Use proper alt text for images
   - Add visually-hidden text for context
   - Announce dynamic content changes
   - Use live regions for updates

## 11. Optimize Component Performance

1. Implement React.memo (if needed)
   - Wrap component with memo for expensive renders
   - Define custom comparison function if needed
   - Document why memoization was added

2. Use useCallback for event handlers (Client Components)
   - Memoize callbacks passed to child components
   - Include proper dependency arrays
   - Avoid unnecessary re-renders

3. Use useMemo for expensive calculations
   - Memoize computed values
   - Avoid recalculating on every render
   - Include proper dependencies

4. Implement code splitting (for large components)
   - Use dynamic imports with next/dynamic
   - Add loading component
   - Set ssr: false for client-only components

## 12. Generate Component Documentation

1. Add JSDoc comments to component
   - Component description
   - @example usage code
   - @param descriptions
   - @returns description

2. Create inline usage examples
   - Basic usage example in JSDoc
   - Advanced usage examples
   - Common patterns

3. Document props thoroughly
   - Description for each prop
   - Default values
   - Required vs optional
   - Type information
   - Usage notes

## 13. Validation and Quality Checks

1. Verify TypeScript compilation
   - Run type check on generated files
   - Ensure no type errors
   - Verify imports resolve correctly

2. Run linting
   - Check for ESLint errors
   - Fix auto-fixable issues
   - Verify style consistency

3. Verify component renders
   - Test in development server
   - Check for console errors
   - Verify styles apply correctly
   - Test interactive features

4. Run generated tests
   - Execute test suite
   - Verify all tests pass
   - Check coverage if applicable

## 14. Generate Creation Report

1. List all created files
   - Main component file with path
   - Styles file with path
   - Types file (if separate)
   - Test file with path
   - Stories file (if applicable)
   - Barrel export index.ts

2. Document component features
   - Component type (Server/Client/Page/Layout)
   - Styling approach used
   - Props interface
   - Accessibility features
   - Performance optimizations

3. Provide usage examples
   - Basic import and usage
   - With all props
   - Common patterns
   - Integration examples

4. Create quality checklist
   - [ ] Component follows naming conventions
   - [ ] TypeScript types properly defined
   - [ ] Styles follow project patterns
   - [ ] Unit tests cover key functionality
   - [ ] Component is accessible
   - [ ] Documentation is complete
   - [ ] Storybook story created
   - [ ] Component compiles without errors
   - [ ] Tests pass successfully
   - [ ] Component is performant

5. Provide next steps
   - How to import and use component
   - Where to add additional features
   - How to customize styles
   - How to add more tests
   - Integration with other components

</detailed_sequence_steps>

</task>

