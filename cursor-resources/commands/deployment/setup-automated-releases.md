<task name="Setup Automated Releases">

<task_objective>
Setup automated release workflows with semantic versioning, conventional commits, and comprehensive automation. The workflow processes project structure and versioning approach to generate a fully automated release system that determines version bumps from commits, generates changelogs, creates GitHub releases, and manages the entire release lifecycle with minimal manual intervention.
</task_objective>

<detailed_sequence_steps>
# Setup Automated Releases - Detailed Sequence of Steps

## 1. Analyze Repository Structure

Detect project type (Node.js, Python, Go, etc.) by examining @package.json or @setup.py or @go.mod. Check for existing CI/CD workflows using !`find .github/workflows -name "*.yml" 2>/dev/null | head -3`. Identify current versioning approach from package.json version field. Review existing release processes by analyzing !`git tag -l | wc -l || echo "0"` existing releases and checking commit patterns with !`git log --oneline -20 | grep -E "^(feat|fix|docs|style|refactor|test|chore)" | wc -l || echo "0"` conventional commits.

## 2. Create Version Tracking

For Node.js projects, use package.json version field. For Python projects, use __version__ in __init__.py or pyproject.toml. For Go projects, use version in go.mod. For other projects, create version.txt file. Ensure version follows semantic versioning (MAJOR.MINOR.PATCH).

## 3. Set Up Conventional Commits

Create CONTRIBUTING.md with commit conventions including feat: for new features (minor bump), fix: for bug fixes (patch bump), feat! or BREAKING CHANGE: for breaking changes (major bump), and docs:, chore:, style:, refactor:, test: for non-releasing changes. Include examples and guidelines for each type.

## 4. Create Pull Request Template

Add .github/pull_request_template.md with conventional commit reminder, add checklist for common requirements, and reference contributing guidelines.

## 5. Create Release Workflow

Add .github/workflows/release.yml that triggers on push to main branch, analyzes commits since last release, determines version bump type, updates version in appropriate file(s), generates release notes from commits, updates CHANGELOG.md, creates git tag, creates GitHub Release, and attaches distribution artifacts. Include manual trigger option for forced releases.

## 6. Create PR Validation Workflow

Add .github/workflows/pr-check.yml to validate PR title follows conventional format, check commit messages, provide feedback on version impact, and run tests and quality checks.

## 7. Configure GitHub Release Notes

Create .github/release.yml to define categories for different change types, configure changelog exclusions, and set up contributor recognition.

## 8. Update Documentation

Add release badges to README including current version badge, latest release badge, and build status badge. Document release process, add link to CONTRIBUTING.md, and explain version bump rules.

## 9. Set Up Changelog Management

Ensure CHANGELOG.md follows Keep a Changelog format, add [Unreleased] section for upcoming changes, configure automatic changelog updates, and set up changelog categories.

## 10. Configure Branch Protection

Recommend branch protection rules to require PR reviews, require status checks, require conventional PR titles, and dismiss stale reviews. Document recommended settings.

## 11. Add Security Scanning

Set up Dependabot for dependency updates, configure security alerts, and add security policy if needed.

## 12. Test the System

Create example PR with conventional title, verify PR checks work correctly, test manual release trigger, and validate changelog generation.

</detailed_sequence_steps>

</task>
