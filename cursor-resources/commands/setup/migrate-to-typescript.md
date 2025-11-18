<task name="Migrate to TypeScript">

<task_objective>
Systematically migrate JavaScript codebase to TypeScript with proper typing and tooling. The input includes project structure from @package.json, JavaScript and TypeScript file counts, and build system configurations. The output will be a fully typed TypeScript codebase with strict type checking, comprehensive IntelliSense, and improved developer productivity.
</task_objective>

<detailed_sequence_steps>
# Migrate to TypeScript - Detailed Sequence of Steps

## 1. Current JavaScript State Assessment

1. Analyze project structure from @package.json to understand dependencies and build configuration.

2. Count existing JavaScript files to estimate migration scope and effort.

3. Identify existing TypeScript files to understand current migration progress.

4. Review build system from @webpack.config.js or @vite.config.js or @rollup.config.js.

5. Determine migration strategy from **$ARGUMENTS** (--gradual | --complete | --strict | --incremental).

## 2. Environment Setup

1. Install TypeScript compiler and type definitions using npm or yarn.

2. Create tsconfig.json configuration with appropriate compiler options for the project.

3. Configure target ECMAScript version based on runtime environment requirements.

4. Enable module resolution and path mapping for import statements.

5. Integrate TypeScript with existing build tools (Webpack, Vite, Rollup, etc.).

6. Configure source maps for debugging TypeScript in development and production.

## 3. Type Definitions Installation

1. Install @types packages for all third-party dependencies from DefinitelyTyped.

2. Create custom type declaration files for untyped libraries in types/ directory.

3. Define global type declarations for environment variables and window extensions.

4. Create shared interface files for common data structures across the application.

5. Setup module augmentation for extending third-party library types.

## 4. File Migration Process

1. Rename JavaScript files to TypeScript (.js to .ts, .jsx to .tsx) in batches.

2. Add basic type annotations to function parameters and return types.

3. Define interfaces for object shapes and data models.

4. Type component props and state in React or other framework components.

5. Resolve initial TypeScript compiler errors including implicit any and undefined checks.

## 5. Code Transformation

1. Convert ES5 classes to TypeScript classes with proper type annotations.

2. Add type annotations to functions including parameters, return types, and generics.

3. Transform module imports and exports with proper type imports.

4. Convert callback functions to typed arrow functions or function expressions.

5. Refactor any types to proper specific types for better type safety.

## 6. Error Resolution

1. Fix type mismatch errors by correcting type annotations and assertions.

2. Handle null and undefined cases using optional chaining and nullish coalescing.

3. Resolve strict mode issues including strictNullChecks and strictFunctionTypes.

4. Address implicit any errors by adding explicit type annotations.

5. Fix module resolution errors and import statement issues.

## 7. Advanced Type Features

1. Implement generic types for reusable functions and components.

2. Create mapped types for transforming existing types programmatically.

3. Use conditional types for complex type logic and type inference.

4. Apply utility types (Partial, Required, Pick, Omit) for type transformations.

5. Configure strict compiler settings including noImplicitAny and strictNullChecks.

## 8. Testing & Validation

1. Update test files to TypeScript with proper type annotations.

2. Configure type checking in test runner and continuous integration.

3. Validate type coverage across the codebase using type coverage tools.

4. Run full test suite to ensure no runtime regressions from migration.

5. Perform integration testing to verify all components work correctly.

## 9. Developer Experience Configuration

1. Configure IDE integration for TypeScript including VSCode settings.

2. Setup debugging configuration for TypeScript source maps in IDE.

3. Configure linting rules using ESLint with TypeScript plugins.

4. Enable auto-import and IntelliSense features for better developer productivity.

5. Create team documentation for TypeScript conventions and best practices.

## 10. Team Onboarding

1. Document migration decisions and TypeScript patterns used in the project.

2. Create TypeScript style guide aligned with project conventions.

3. Setup code review guidelines for TypeScript pull requests.

4. Provide training materials and resources for team members.

5. Establish ongoing support channels for TypeScript questions and issues.

</detailed_sequence_steps>

</task>
