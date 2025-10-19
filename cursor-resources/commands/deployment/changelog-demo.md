<task name="Changelog Automation Demo">

<task_objective>
Demonstrate changelog automation features with real examples and validation. The workflow processes existing changelog from @CHANGELOG.md, recent commits from git log, and current version information to showcase changelog generation, format validation, integration testing, and performance benchmarking without affecting the main workflow.
</task_objective>

<detailed_sequence_steps>
# Changelog Demo - Detailed Sequence of Steps

## 1. Changelog Generation Demo

Generate sample changelog entries from git commits using !`git log --oneline -10` to retrieve recent commits. Show different changelog formats including Keep a Changelog format and conventional-changelog format. Demonstrate automatic categorization of changes into Added, Changed, Deprecated, Removed, Fixed, and Security sections. Show version numbering and semantic versioning application based on commit types.

## 2. Format Validation Demo

Validate existing changelog format compliance by reading @CHANGELOG.md. Show format inconsistencies and suggestions for improvement. Demonstrate automated formatting fixes for common issues. Show integration with release automation including version header format, date format, and section organization.

## 3. Integration Testing

Test changelog automation without affecting main workflow by creating test branches and temporary files. Validate changelog generation pipeline with different commit patterns. Test different commit message patterns (feat:, fix:, docs:, style:, refactor:, test:, chore:). Show error handling and recovery for malformed commits and missing version information.

## 4. Performance Benchmarking

Measure changelog generation speed for different repository sizes. Test with large commit histories by checking !`git log --oneline -10` patterns. Show memory usage and optimization techniques. Benchmark different parsing strategies including conventional-changelog-cli and auto-changelog tools. Compare generation times and output quality.

## 5. Automation Tools Demonstration

Install and demonstrate conventional-changelog-cli with command npx conventional-changelog -p angular -i CHANGELOG.md -s. Install and demonstrate auto-changelog with command npx auto-changelog. Show configuration options and customization capabilities.

## 6. Commit Convention Examples

Show conventional commit format examples including feat: for features, fix: for bug fixes, docs: for documentation, style: for formatting, refactor: for code restructure, test: for tests, and chore: for maintenance. Demonstrate how each type affects version bumping and changelog categorization.

## 7. Release Integration Demo

Show changelog update process before each release. Demonstrate inclusion in release notes. Show linking to GitHub releases. Demonstrate version tagging consistency and automation.

</detailed_sequence_steps>

</task>

