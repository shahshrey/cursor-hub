<task name="Setup Monorepo">

<task_objective>
Implement production-ready monorepo with advanced workspace management and build orchestration. The input includes repository structure, package manager detection, existing monorepo configurations, and project count from the codebase. The output will be a complete monorepo setup with optimized build system, comprehensive tooling, and team productivity enhancements.
</task_objective>

<detailed_sequence_steps>
# Setup Monorepo - Detailed Sequence of Steps

## 1. Project State Analysis

1. Analyze repository structure by examining directory layout and organization.

2. Identify package manager from @package.json or existing workspace configuration.

3. Check for existing monorepo tools (@nx.json, @lerna.json, @rush.json, @turbo.json).

4. Count projects by finding package.json files excluding node_modules.

5. Determine monorepo tool from **$ARGUMENTS** (--nx | --lerna | --rush | --turborepo | --yarn-workspaces).

## 2. Workspace Structure

1. Design directory organization with clear separation of concerns.

2. Define package architecture for applications, libraries, and shared code.

3. Create shared libraries for common utilities and components.

4. Organize application separation for independent deployable units.

5. Establish naming conventions for packages and directories.

## 3. Dependency Management

1. Configure workspace dependencies using workspace protocol or local references.

2. Implement version management strategy for internal and external packages.

3. Configure package hoisting to optimize node_modules structure.

4. Resolve dependency conflicts between packages with version alignment.

5. Setup dependency graph visualization for understanding relationships.

## 4. Build Orchestration

1. Define task dependencies between packages for correct build order.

2. Configure parallel builds for independent packages to speed up builds.

3. Implement incremental compilation to rebuild only changed packages.

4. Setup affected package detection based on git changes.

5. Create build caching strategy to avoid redundant builds.

## 5. Development Workflow

1. Configure hot reloading for rapid development feedback across packages.

2. Setup debugging configuration for multi-package debugging.

3. Implement testing strategies including unit, integration, and e2e tests.

4. Configure development server coordination for dependent services.

5. Setup workspace scripts for common development tasks.

## 6. CI/CD Integration

1. Design build pipelines optimized for monorepo structure.

2. Implement affected project detection to run tests only for changed packages.

3. Configure deployment orchestration for multiple applications.

4. Setup artifact management for build outputs and deployments.

5. Implement matrix builds for testing across multiple configurations.

## 7. Tooling Configuration

1. Create shared configurations for linting, formatting, and type checking.

2. Configure code quality tools consistently across all packages.

3. Setup testing frameworks with shared test utilities.

4. Create documentation generation for all packages and APIs.

5. Configure IDE workspace settings for consistent developer experience.

## 8. Advanced Features

1. Implement task caching using local and remote cache strategies.

2. Configure distributed execution for cloud-based build acceleration.

3. Setup performance optimization for large monorepos.

4. Integrate plugin ecosystem for extending monorepo capabilities.

5. Configure dependency graph analysis for architecture insights.

## 9. Team Productivity

1. Optimize developer experience with fast feedback loops.

2. Create onboarding automation for new developers.

3. Document maintenance procedures for package management.

4. Setup code ownership rules for package maintainership.

5. Configure automated dependency updates across packages.

## 10. Documentation and Validation

1. Document complete monorepo setup including tool configuration.

2. Create optimized build system guide explaining task orchestration.

3. Compile comprehensive tooling documentation for all integrated tools.

4. Document team productivity enhancements and best practices.

5. Validate setup by performing full build, test, and deployment cycle.

</detailed_sequence_steps>

</task>
