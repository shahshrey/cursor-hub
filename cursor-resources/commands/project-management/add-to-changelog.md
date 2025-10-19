<task name="Add to Changelog">

<task_objective>
Add entry to project changelog following Keep a Changelog format. This workflow takes version, change-type, and message as inputs ($ARGUMENTS), processes the changelog update, and outputs a properly formatted CHANGELOG.md file with the new entry under the appropriate version and category.
</task_objective>

<detailed_sequence_steps>
# Add to Changelog - Detailed Sequence of Steps

## 1. Parse Arguments and Context

1. Parse arguments from $ARGUMENTS:
   - Version: First argument (e.g., "1.1.0")
   - Change Type: Second argument (added/changed/deprecated/removed/fixed/security)
   - Message: Third argument (description of the change).

2. If arguments are missing, prompt user for required information.

3. Review existing changelog: @CHANGELOG.md (if exists).

4. Check project version files: @package.json or @setup.py (if exists).

## 2. Validate Changelog Structure

1. Check if CHANGELOG.md exists in project root.

2. If CHANGELOG.md doesn't exist, create it with standard header.

3. Validate existing changelog follows Keep a Changelog format.

4. Verify change type is valid (added/changed/deprecated/removed/fixed/security).

## 3. Locate or Create Version Section

1. Search for existing version section matching the target version.

2. If version section doesn't exist, create new version section.

3. Add today's date to version section header.

4. Follow Semantic Versioning principles for version numbering.

## 4. Add Change Entry

1. Locate or create the appropriate change type subsection within version.

2. Add the change entry under the correct category.

3. Format entry as bulleted list item.

4. Ensure entry is clear and descriptive.

## 5. Update Version Files

1. Check if this is a new version number.

2. If new version, update version in package.json or setup.py.

3. Ensure version consistency across all version files.

4. Update any additional version references in project.

## 6. Validate and Format

1. Verify the updated changelog follows Keep a Changelog format.

2. Ensure proper markdown formatting and structure.

3. Validate all links and references (if any).

4. Review the complete changelog for consistency.

</detailed_sequence_steps>

</task>
