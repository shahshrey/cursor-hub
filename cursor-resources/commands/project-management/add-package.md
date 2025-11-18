<task name="Add Package to Workspace">

<task_objective>
Add and configure new project dependencies with proper structure and dependencies. This workflow takes package information as input ($ARGUMENTS in format: name [type]), processes it through package setup and configuration, and outputs a fully integrated package within the workspace with proper testing and documentation.
</task_objective>

<detailed_sequence_steps>
# Add Package to Workspace - Detailed Sequence of Steps

## 1. Package Definition and Analysis

1. Parse package name and type from arguments: `$ARGUMENTS` (format: name [type]).

2. If no arguments provided, prompt for package name and type.

3. Validate package name follows workspace naming conventions.

4. Determine package type: library, application, tool, shared, service, component-library.

5. Check for naming conflicts with existing packages.

## 2. Package Structure Creation

1. Create package directory in appropriate workspace location (packages/, apps/, libs/).

2. Set up standard package directory structure based on type:
   - `src/` for source code
   - `tests/` or `__tests__/` for testing
   - `docs/` for package documentation
   - `examples/` for usage examples (if library)
   - `public/` for static assets (if application).

3. Create package-specific configuration files.

## 3. Package Configuration Setup

1. Generate package.json with proper metadata:
   - Name following workspace conventions
   - Version aligned with workspace strategy
   - Dependencies and devDependencies
   - Scripts for build, test, lint, dev
   - Entry points and exports configuration.

2. Configure TypeScript (tsconfig.json) extending workspace settings.

3. Set up package-specific linting and formatting rules.

## 4. Package Type-Specific Setup

1. **Library**: Configure build system, export definitions, API documentation.

2. **Application**: Set up routing, environment configuration, build optimization.

3. **Tool**: Configure CLI setup, binary exports, command definitions.

4. **Shared**: Set up common utilities, type definitions, shared constants.

5. **Service**: Configure server setup, API routes, database connections.

6. **Component Library**: Set up Storybook, component exports, styling system.

## 5. Workspace Integration

1. Register package in workspace configuration (nx.json, lerna.json, etc.).

2. Configure package dependencies and peer dependencies.

3. Set up cross-package imports and references.

4. Configure workspace-wide build order and dependencies.

5. Add package to workspace scripts and task runners.

## 6. Development Environment

1. Configure package-specific development server (if applicable).

2. Set up hot reloading and watch mode.

3. Configure debugging and source maps.

4. Set up development proxy and API mocking (if needed).

5. Configure environment variable management.

## 7. Testing Infrastructure

1. Set up testing framework configuration for the package.

2. Create initial test files and examples.

3. Configure test coverage reporting.

4. Set up package-specific test scripts.

5. Configure integration testing with other workspace packages.

## 8. Build and Deployment

1. Configure build system for the package type.

2. Set up build artifacts and output directories.

3. Configure bundling and optimization.

4. Set up package publishing configuration (if library).

5. Configure deployment scripts (if application).

## 9. Documentation and Examples

1. Create package README with installation and usage instructions.

2. Set up API documentation generation.

3. Create usage examples and demos.

4. Document package architecture and design decisions.

5. Add package to workspace documentation.

## 10. Validation and Integration Testing

1. Verify package builds successfully.

2. Test package installation and imports.

3. Validate workspace dependency resolution.

4. Test development workflow and hot reloading.

5. Verify CI/CD pipeline includes new package.

6. Test cross-package functionality and integration.

</detailed_sequence_steps>

</task>
