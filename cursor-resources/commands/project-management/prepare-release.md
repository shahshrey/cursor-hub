<task name="Prepare Release">

<task_objective>
Prepare and execute project release with version management and changelog updates. This workflow takes version type as input ($ARGUMENTS - patch/minor/major/prerelease or auto-detect), analyzes changes since last release, and outputs updated version files, comprehensive CHANGELOG.md entries, updated documentation, and properly tagged release following semantic versioning principles.
</task_objective>

<detailed_sequence_steps>
# Prepare Release - Detailed Sequence of Steps

## 1. Assess Current Project State

1. Check git status: !`git status --porcelain`.

2. Retrieve current version: !`git describe --tags --abbrev=0 2>/dev/null || echo "No previous tags"`.

3. Review recent commits: !`git log --oneline --since="1 month ago" | head -10`.

4. Access package info from @package.json or @setup.py or @Cargo.toml (if exists).

## 2. Determine Version Type

1. Parse version type from $ARGUMENTS (patch/minor/major/prerelease).

2. If no version type specified, analyze changes since last release:
   - Breaking changes → major version
   - New features → minor version
   - Bug fixes only → patch version.

3. Suggest appropriate version increment to user.

4. Confirm version increment with user.

## 3. Analyze Changes Since Last Release

1. Get list of commits since last tag/release.

2. Categorize commits by type:
   - Added (new features)
   - Changed (modifications to existing features)
   - Deprecated (features marked for removal)
   - Removed (deleted features)
   - Fixed (bug fixes)
   - Security (security fixes).

3. Extract commit messages and PR descriptions.

4. Identify significant changes requiring documentation.

## 4. Calculate New Version Number

1. Parse current version number.

2. Apply version increment based on determined type:
   - Major: X.0.0
   - Minor: X.Y.0
   - Patch: X.Y.Z
   - Prerelease: X.Y.Z-alpha.N.

3. Follow semantic versioning principles.

4. Validate new version number format.

## 5. Update Version Files

1. Identify all version files in project:
   - package.json
   - setup.py
   - Cargo.toml
   - version.txt
   - other project-specific files.

2. Update version number in each file.

3. Maintain file formatting and structure.

4. Validate updated files.

## 6. Update CHANGELOG.md

1. Locate or create CHANGELOG.md file.

2. Add new version section with:
   - Version number
   - Release date (today's date)
   - Categorized changes (Added, Changed, Fixed, etc.).

3. Organize changes from commit analysis.

4. Follow Keep a Changelog format.

5. Ensure entries are clear and user-friendly.

## 7. Review and Update Documentation

1. Review README.md for necessary updates:
   - Version references
   - New features documentation
   - Updated installation instructions
   - Modified API documentation.

2. Update any version-specific documentation.

3. Check for broken links or outdated information.

4. Update examples if features changed.

## 8. Prepare Release Notes

1. Create comprehensive release notes including:
   - Version number and release date
   - Summary of major changes
   - Breaking changes (if any)
   - Migration guide (if needed)
   - Contributors acknowledgment.

2. Highlight important features and fixes.

3. Include upgrade instructions if needed.

## 9. Stage Release Changes

1. Stage all updated files (version files, CHANGELOG, README).

2. Review staged changes for accuracy.

3. Ensure no unintended changes are included.

## 10. Create Release Commit

1. Create commit with message: "Release version X.Y.Z".

2. Include comprehensive commit message body if needed.

3. Follow project commit conventions.

## 11. Create Git Tag

1. Create annotated git tag with version number: `git tag -a vX.Y.Z`.

2. Add tag message with release notes summary.

3. Validate tag is created correctly.

## 12. Prepare Release Summary

1. Compile release summary including:
   - Version number
   - Changes included
   - Files updated
   - Tag created
   - Next steps for pushing and publishing.

2. Provide instructions for completing release.

## 13. Output Results

1. Display release preparation summary.

2. Show updated version number.

3. Provide next steps for:
   - Pushing changes and tags
   - Creating GitHub release
   - Publishing to package registries
   - Announcing release.

4. Confirm release is ready for publication.

</detailed_sequence_steps>

</task>

