<task name="Initialize Project">

<task_objective>
Initialize new project with essential structure, configuration, and development environment setup. This workflow takes project type and framework as input ($ARGUMENTS), processes project setup through structure creation, framework configuration, and tooling setup, and outputs a fully configured project ready for development with proper testing, CI/CD, and documentation.
</task_objective>

<detailed_sequence_steps>
# Initialize Project - Detailed Sequence of Steps

## 1. Project Analysis and Setup

1. Parse the project type and framework from arguments: `$ARGUMENTS`.

2. If no arguments provided, analyze current directory and ask user for project type and framework.

3. Create project directory structure if needed.

4. Validate that the chosen framework is appropriate for the project type.

## 2. Base Project Structure

1. Create essential directories (src/, tests/, docs/, etc.).

2. Initialize git repository with proper .gitignore for the project type.

3. Create README.md with project description and setup instructions.

4. Set up proper file structure based on project type and framework.

## 3. Framework-Specific Configuration

1. **Web/React**: Set up React with TypeScript, Vite/Next.js, ESLint, Prettier.

2. **Web/Vue**: Configure Vue 3 with TypeScript, Vite, ESLint, Prettier.

3. **Web/Angular**: Set up Angular CLI project with TypeScript and testing.

4. **API/Express**: Create Express.js server with TypeScript, middleware, and routing.

5. **API/FastAPI**: Set up FastAPI with Python, Pydantic models, and async support.

6. **Mobile/React Native**: Configure React Native with navigation and development tools.

7. **Desktop/Electron**: Set up Electron with renderer and main process structure.

8. **CLI/Node**: Create Node.js CLI with commander.js and proper packaging.

9. **Library/NPM**: Set up library with TypeScript, rollup/webpack, and publishing config.

## 4. Development Environment Setup

1. Configure package manager (npm, yarn, pnpm) with proper package.json.

2. Set up TypeScript configuration with strict mode and path mapping.

3. Configure linting with ESLint and language-specific rules.

4. Set up code formatting with Prettier and pre-commit hooks.

5. Add EditorConfig for consistent coding standards.

## 5. Testing Infrastructure

1. Install and configure testing framework (Jest, Vitest, Pytest, etc.).

2. Set up test directory structure and example tests.

3. Configure code coverage reporting.

4. Add testing scripts to package.json/makefile.

## 6. Build and Development Tools

1. Configure build system (Vite, webpack, rollup, etc.).

2. Set up development server with hot reloading.

3. Configure environment variable management.

4. Add build optimization and bundling.

## 7. CI/CD Pipeline

1. Create GitHub Actions workflow for testing and deployment.

2. Set up automated testing on pull requests.

3. Configure automated dependency updates with Dependabot.

4. Add status badges to README.

## 8. Documentation and Quality

1. Generate comprehensive README with installation and usage instructions.

2. Create CONTRIBUTING.md with development guidelines.

3. Set up API documentation generation (JSDoc, Sphinx, etc.).

4. Add code quality badges and shields.

## 9. Security and Best Practices

1. Configure security scanning with npm audit or similar.

2. Set up dependency vulnerability checking.

3. Add security headers for web applications.

4. Configure environment-specific security settings.

## 10. Project Validation

1. Verify all dependencies install correctly.

2. Run initial build to ensure configuration is working.

3. Execute test suite to validate testing setup.

4. Check linting and formatting rules are applied.

5. Validate that development server starts successfully.

6. Create initial commit with proper project structure.

</detailed_sequence_steps>

</task>

