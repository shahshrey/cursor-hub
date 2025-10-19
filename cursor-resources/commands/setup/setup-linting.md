<task name="Setup Code Linting">

<task_objective>
Setup comprehensive code linting system with quality analysis and automated enforcement. The input includes language detection, existing linter configurations, package manager identification, and code quality tools from the codebase. The output will be a complete linting system with automated quality gates, team standards enforcement, and comprehensive code analysis.
</task_objective>

<detailed_sequence_steps>
# Setup Code Linting - Detailed Sequence of Steps

## 1. Code Quality State Assessment

1. Detect programming languages by finding source files (.js, .ts, .py, .rs, etc.).

2. Check for existing linter configurations (@.eslintrc.*, @pyproject.toml, @tslint.json).

3. Identify package manager from @package.json or @requirements.txt or @Cargo.toml.

4. Detect installed code quality tools (eslint, flake8, pylint, mypy, clippy).

5. Determine language focus from **$ARGUMENTS** (--javascript | --typescript | --python | --multi-language).

## 2. Tool Installation

1. Install ESLint for JavaScript/TypeScript linting via npm or yarn.

2. Install Flake8, Pylint, and MyPy for Python code quality analysis.

3. Install Clippy for Rust linting and code analysis if Rust is detected.

4. Install language-specific linters for all detected languages in the project.

5. Install linter plugins for frameworks (React, Vue, Angular) and libraries.

## 3. Rule Configuration

1. Configure code style rules for consistent formatting and structure.

2. Setup error detection rules for common mistakes and anti-patterns.

3. Configure best practices rules based on community standards.

4. Implement security pattern detection to identify potential vulnerabilities.

5. Setup performance guideline rules for optimization opportunities.

6. Configure accessibility rules for web applications (a11y).

## 4. IDE Integration

1. Install IDE extensions for real-time linting feedback.

2. Configure error highlighting in editor for immediate visibility.

3. Setup quick fix suggestions and automatic corrections where possible.

4. Configure workspace settings to override user settings for consistency.

5. Enable inline documentation for lint rules in IDE.

## 5. Quality Gates Implementation

1. Configure pre-commit validation using Git hooks to catch issues early.

2. Integrate linting checks into CI/CD pipeline with failure thresholds.

3. Setup pull request checks requiring linting to pass before merge.

4. Configure quality metrics reporting in CI dashboard.

5. Implement code quality trends tracking over time.

## 6. Custom Rules Development

1. Create project-specific patterns for architectural constraints.

2. Implement architectural constraint rules to enforce design decisions.

3. Configure team convention rules for project-specific standards.

4. Create custom rule plugins for framework-specific patterns.

5. Document custom rules with examples and rationale.

## 7. Performance Optimization

1. Configure incremental linting to check only changed files.

2. Implement caching strategies to speed up subsequent lint runs.

3. Setup parallel execution for linting multiple files simultaneously.

4. Optimize configuration to minimize false positives and noise.

5. Configure ignore patterns for generated code and third-party files.

## 8. Advanced Features

1. Configure security linting using plugins like ESLint Security or Bandit.

2. Setup accessibility checks for web applications (JSX A11y, axe).

3. Implement performance analysis rules for code efficiency.

4. Configure dependency analysis to detect unused or outdated packages.

5. Setup code complexity metrics (cyclomatic complexity, cognitive complexity).

## 9. Team Standards

1. Create shared linting configurations committed to version control.

2. Document style guide explaining linting rules and their purpose.

3. Create review guidelines for handling linting violations in PRs.

4. Develop onboarding documentation for team linting standards.

5. Setup team communication channels for discussing rule changes.

## 10. Documentation and Monitoring

1. Document complete linting system including all tools and configurations.

2. Create automated quality gates documentation explaining enforcement.

3. Compile team standards enforcement guide with examples.

4. Create comprehensive code analysis documentation with metrics.

5. Setup monitoring dashboard for code quality trends and violations.

</detailed_sequence_steps>

</task>
