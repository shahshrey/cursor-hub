<task name="Add Changelog Entry">

<task_objective>
Generate and maintain project changelog with Keep a Changelog format. The workflow processes existing @CHANGELOG.md, recent commits from !`git log --oneline -10`, current version from !`git describe --tags --abbrev=0`, and package version from @package.json to create properly formatted changelog entries categorized by change type following Keep a Changelog and Semantic Versioning standards.
</task_objective>

<detailed_sequence_steps>
# Add Changelog Entry - Detailed Sequence of Steps

## 1. Analyze Current Changelog State

Read existing @CHANGELOG.md file to understand current format and structure. Check for current version from !`git describe --tags --abbrev=0 2>/dev/null || echo "No tags found"`. Review recent commits using !`git log --oneline -10` to identify changes. Check package version in @package.json or equivalent version file if exists.

## 2. Initialize Changelog if Missing

If CHANGELOG.md doesn't exist, create new file with Keep a Changelog format header including title "Changelog", description "All notable changes to this project will be documented in this file", format reference to Keep a Changelog website, and Semantic Versioning adherence statement. Add [Unreleased] section with empty categories.

## 3. Create Unreleased Section

Ensure [Unreleased] section exists at top of changelog below header. Add category sections: "Added" for new features, "Changed" for changes in existing functionality, "Deprecated" for soon-to-be removed features, "Removed" for removed features, "Fixed" for bug fixes, and "Security" for security improvements. Keep empty categories as placeholders.

## 4. Analyze Git Commits for Entries

Parse recent commits from git log to extract conventional commit messages. Identify commit type (feat, fix, docs, style, refactor, test, chore) from commit prefix. Extract commit message and description. Categorize commits into appropriate changelog sections: feat -> Added, fix -> Fixed, security or vuln -> Security, breaking changes -> Changed or Removed.

## 5. Generate Version Entry

When creating release entry, move [Unreleased] content to new version section [X.Y.Z] - YYYY-MM-DD format. Use version from package.json or provided version argument. Use current date in ISO format (YYYY-MM-DD). Organize entries by category with bullet points. Include links to issues and PRs if available.

## 6. Format Changelog Entries

Write entries in clear, concise language focused on user-facing changes. Use bullet points starting with dash. Start each entry with capital letter. Don't end entries with period. Include relevant context for changes. Link to issues using #issue-number format. Link to PRs for more details.

## 7. Setup Automation Tools

Install conventional-changelog-cli for automatic changelog generation from commits using npm install -D conventional-changelog-cli. Install auto-changelog as alternative tool using npm install -D auto-changelog. Configure tools with package.json scripts: "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s" and "changelog:auto": "auto-changelog".

## 8. Commit Convention Validation

Validate commits follow conventional commit format with type(scope): description pattern. Check for valid types: feat, fix, docs, style, refactor, test, chore. Identify breaking changes marked with exclamation (feat!) or BREAKING CHANGE in footer. Suggest fixes for non-conforming commit messages.

## 9. Integration with Release Process

Update changelog before each release as part of release preparation. Include changelog content in release notes. Add links to GitHub releases in changelog. Tag versions consistently with git tags. Ensure changelog version matches git tag and package version.

## 10. Validate Changelog Format

Check changelog follows Keep a Changelog format with proper headers, version numbers, date format, and category organization. Validate version links at bottom of file. Ensure [Unreleased] section exists and is up-to-date. Check for proper markdown formatting.

</detailed_sequence_steps>

</task>
