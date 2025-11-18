<task name="Setup Development Environment">

<task_objective>
Configure complete development environment with modern tools and best practices. The input includes operating system detection, existing development tools, package managers, and IDE configurations. The output will be a complete development environment with documented setup process, team configurations, and troubleshooting guides.
</task_objective>

<detailed_sequence_steps>
# Setup Development Environment - Detailed Sequence of Steps

## 1. Environment State Assessment

1. Detect operating system and architecture using system commands.

2. Check installed development runtimes (Node.js, Python, Ruby, etc.) and their versions.

3. Identify available package managers (npm, yarn, pnpm, pip, poetry, cargo).

4. Detect IDE or editor being used (VS Code, IntelliJ, Vim, etc.).

5. Determine environment type from **$ARGUMENTS** (--local | --docker | --cloud | --full-stack).

## 2. Runtime Installation

1. Install required programming language runtimes for the project.

2. Setup version managers (nvm for Node.js, pyenv for Python, rustup for Rust).

3. Configure default runtime versions aligned with project requirements.

4. Install package managers appropriate for each language ecosystem.

5. Verify runtime installations and add to system PATH.

## 3. Development Tools Setup

1. Configure IDE with project-specific settings and workspace configuration.

2. Install essential extensions for language support, linting, and formatting.

3. Setup debugger configuration for step-through debugging capabilities.

4. Install profilers for performance analysis and optimization.

5. Configure database clients for local database management and queries.

## 4. Build System Configuration

1. Install compilers for compiled languages (gcc, g++, rustc, etc.).

2. Setup bundlers (Webpack, Vite, Rollup) according to project needs.

3. Configure task runners (Make, npm scripts, gulp) for common operations.

4. Install and configure CI/CD tools for local pipeline testing.

5. Setup testing frameworks and test runners for unit and integration tests.

## 5. Code Quality Tools

1. Install and configure linting tools (ESLint, Pylint, Clippy) with project rules.

2. Setup code formatters (Prettier, Black, rustfmt) with consistent configurations.

3. Configure pre-commit hooks using Husky or similar tools.

4. Install code analysis tools for complexity and maintainability metrics.

5. Setup Git hooks for automated quality checks before commits.

## 6. Environment Configuration

1. Create environment variable files (.env) with development defaults.

2. Configure secrets management for local development credentials.

3. Setup configuration files for application settings and feature flags.

4. Document required environment variables and their purposes.

5. Create environment variable templates for team consistency.

## 7. Team Synchronization

1. Create shared configuration files committed to version control.

2. Document installation steps in README or setup documentation.

3. Create onboarding guides for new team members.

4. Setup automated setup scripts to streamline environment creation.

5. Document troubleshooting steps for common setup issues.

## 8. Advanced Features Configuration

1. Configure hot reloading for rapid development feedback.

2. Setup debugging configuration for IDE including breakpoints and watch expressions.

3. Integrate performance monitoring tools for local profiling.

4. Configure container orchestration (Docker Compose) for local services.

5. Setup local API mocking or service virtualization for external dependencies.

## 9. Automation Implementation

1. Create automated setup scripts for one-command environment setup.

2. Implement configuration management using dotfiles or setup tools.

3. Configure team environment synchronization with shared settings.

4. Setup health check scripts to verify environment completeness.

5. Automate dependency updates and version management.

## 10. Documentation and Validation

1. Document complete setup process with step-by-step instructions.

2. Create team configurations guide explaining all settings and tools.

3. Compile troubleshooting guide for common environment issues.

4. Document platform-specific setup differences (macOS, Linux, Windows).

5. Verify setup process by testing on clean environment.

</detailed_sequence_steps>

</task>
