<task name="Validate PAC Structure">

<task_objective>
Validate Product as Code project structure and files for PAC specification compliance. This workflow takes validation scope as input ($ARGUMENTS - specific files/epics or entire structure), processes comprehensive validation checks across structure, configuration, epics, tickets, and cross-references, and outputs a detailed validation report with compliance status, issues found, and specific fix recommendations with optional auto-fix capability.
</task_objective>

<detailed_sequence_steps>
# Validate PAC Structure - Detailed Sequence of Steps

## 1. Assess Current PAC State

1. Check for PAC directory: !`ls -la .pac/ 2>/dev/null || echo "No .pac directory found"`.

2. Access configuration from @.pac/pac.config.yaml (if exists).

3. Count epics: !`find .pac/epics/ -name "*.yaml" 2>/dev/null | wc -l`.

4. Count tickets: !`find .pac/tickets/ -name "*.yaml" 2>/dev/null | wc -l`.

## 2. Determine Validation Scope

1. Parse $ARGUMENTS for validation scope.

2. Check for --file flag for specific file validation.

3. Check for --epic flag for epic-specific validation.

4. Check for --fix flag for auto-repair mode.

5. Check for --pre-commit flag for pre-commit hook validation.

6. Default to full structure validation if no scope specified.

## 3. Validate Directory Structure

1. Verify `.pac/` root directory exists.

2. Check for required subdirectories:
   - `.pac/epics/`
   - `.pac/tickets/`
   - `.pac/templates/`.

3. Validate directory permissions.

4. Check for unexpected files or directories.

## 4. Validate Configuration File

1. Verify `pac.config.yaml` exists.

2. Parse YAML syntax and structure.

3. Validate required configuration fields:
   - project name
   - version
   - default owners
   - workflow definitions.

4. Check configuration value validity.

## 5. Validate Epic Files

1. List all epic YAML files in `.pac/epics/`.

2. For each epic file:
   - Parse YAML syntax
   - Verify required metadata fields (id, name, created, owner)
   - Validate spec section (description, scope, success_criteria, constraints, dependencies)
   - Check PAC v0.1.0 specification compliance.

3. Document all epic validation issues.

## 6. Validate Ticket Files

1. List all ticket YAML files in `.pac/tickets/`.

2. For each ticket file:
   - Parse YAML syntax
   - Verify required metadata fields (id, name, epic, created, assignee)
   - Validate spec section (description, type, status, priority, acceptance_criteria, tasks)
   - Check PAC v0.1.0 specification compliance.

3. Document all ticket validation issues.

## 7. Validate Cross-References

1. Verify all ticket epic references point to existing epics.

2. Check all epic-ticket relationships are bidirectional.

3. Validate dependency references exist.

4. Identify orphaned tickets or epics.

## 8. Validate Data Consistency

1. Check timestamp formats and validity.

2. Validate status values against allowed set.

3. Verify status transition history is logical.

4. Check ID uniqueness across all epics and tickets.

## 9. Generate Validation Report

1. Compile all validation findings.

2. Organize by severity (error, warning, info).

3. Include:
   - Compliance status (pass/fail)
   - Total issues found by category
   - Specific issues with file and line references
   - Recommendations for fixing each issue.

4. Calculate validation score.

## 10. Apply Auto-Fix (if requested)

1. If --fix flag set, automatically resolve common issues:
   - Fix YAML formatting
   - Add missing required fields with defaults
   - Repair broken references
   - Normalize timestamps and IDs.

2. Document all auto-fixes applied.

3. Re-run validation to confirm fixes.

## 11. Output Results

1. Display detailed validation report.

2. Use exit codes: 0 (valid), 1 (errors found), 2 (configuration issues).

3. Provide specific actionable recommendations.

4. Suggest fixes for manual resolution if needed.

</detailed_sequence_steps>

</task>

