<task name="Setup Code Formatting">

<task_objective>
Setup comprehensive code formatting system with automated enforcement and team consistency. The input includes language detection, existing formatter configurations, package manager identification, and IDE configurations from the codebase. The output will be a complete formatting system with automated enforcement, team configurations, and style compliance monitoring.
</task_objective>

<detailed_sequence_steps>
# Setup Code Formatting - Detailed Sequence of Steps

## 1. Project State Analysis

1. Detect programming languages in the project by finding source files.

2. Check for existing formatter configurations (@.prettierrc, @pyproject.toml, @rustfmt.toml).

3. Identify package manager from @package.json or @requirements.txt or @Cargo.toml.

4. Review IDE configuration from @.vscode/settings.json or @.editorconfig.

5. Determine language focus from **$ARGUMENTS** (--javascript | --typescript | --python | --multi-language).

## 2. Tool Installation

1. Install Prettier for JavaScript and TypeScript formatting via package manager.

2. Install Black for Python code formatting via pip or poetry.

3. Install rustfmt for Rust formatting via cargo if Rust is detected.

4. Install language-specific formatters based on detected languages.

5. Install formatter plugins for framework-specific formatting (React, Vue, etc.).

## 3. Configuration Setup

1. Create formatter configuration files with style rules and preferences.

2. Configure line length limits consistent across all formatters.

3. Setup indentation style (spaces vs tabs) and indentation width.

4. Configure quote style (single vs double) for string literals.

5. Setup trailing comma rules for better diff readability.

6. Configure language-specific formatting options (semicolons, bracket spacing, etc.).

## 4. IDE Integration

1. Install editor extensions for formatters in VS Code or other IDEs.

2. Configure format-on-save functionality in editor settings.

3. Setup keyboard shortcuts for manual formatting triggers.

4. Configure workspace settings to override user settings for consistency.

5. Setup EditorConfig for cross-editor consistency.

## 5. Automation Implementation

1. Install pre-commit hooks using Husky or language-specific tools.

2. Configure Git hooks to format staged files before commit.

3. Create automated formatting scripts for bulk formatting operations.

4. Setup CI/CD formatting checks to enforce consistency.

5. Configure formatting verification in pull request checks.

## 6. Validation Setup

1. Create formatting verification script that checks unformatted files.

2. Integrate formatting checks into CI pipeline with non-zero exit codes.

3. Configure team compliance monitoring with formatting reports.

4. Setup automated pull request comments for formatting violations.

5. Create formatting status badges for repository visibility.

## 7. Advanced Features

1. Create custom formatting rules for project-specific patterns.

2. Configure framework-specific formatting (React JSX, Vue templates).

3. Implement performance optimization for large file formatting.

4. Setup incremental formatting to format only changed files.

5. Configure ignore patterns for generated code and third-party files.

## 8. Team Synchronization

1. Commit shared formatter configurations to version control.

2. Create style guide documentation explaining formatting decisions.

3. Document enforcement policies and how to handle formatting issues.

4. Create onboarding documentation for new team members.

5. Setup team communication channels for formatting questions.

## 9. Consistency Enforcement

1. Ensure cross-platform compatibility (Windows, macOS, Linux) for line endings.

2. Configure team standardization across all development environments.

3. Create legacy code migration strategies for gradual formatting adoption.

4. Document exceptions and special cases for formatting rules.

5. Setup regular audits to ensure formatting consistency.

## 10. Documentation and Maintenance

1. Document complete formatting setup including all tools and configurations.

2. Create automated enforcement guide explaining pre-commit hooks and CI checks.

3. Compile team configuration documentation with shared settings.

4. Create style compliance monitoring dashboard for team visibility.

5. Document troubleshooting steps for common formatting issues.

</detailed_sequence_steps>

</task>
