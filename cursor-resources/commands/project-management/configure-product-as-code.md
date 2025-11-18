<task name="Configure Product as Code">

<task_objective>
Initialize Product as Code (PAC) project structure with templates and configuration. This workflow takes project name and optional flags as input ($ARGUMENTS), processes PAC structure setup including directories, configuration files, and templates, and outputs a complete PAC-enabled project with version-controlled product management capabilities following PAC v0.1.0 specification.
</task_objective>

<detailed_sequence_steps>
# Configure Product as Code - Detailed Sequence of Steps

## 1. Validate Project State

1. Check git status: !`git status --porcelain | wc -l` uncommitted changes.

2. Check for existing PAC structure: !`ls -la .pac/ 2>/dev/null | head -5 || echo "No PAC directory"`.

3. Count existing epics: !`find .pac/epics/ -name "*.yaml" 2>/dev/null | wc -l`.

4. Validate git repository is initialized.

## 2. Parse Configuration Arguments

1. Parse project name from $ARGUMENTS.

2. Check for --minimal flag for basic structure.

3. Check for --epic-name flag for initial epic.

4. Check for --owner flag for product owner assignment.

## 3. Create PAC Directory Structure

1. Create root `.pac/` directory.

2. Create `.pac/epics/` directory for epic definitions.

3. Create `.pac/tickets/` directory for ticket definitions.

4. Create `.pac/templates/` directory for templates.

## 4. Generate Configuration Files

1. Create `pac.config.yaml` with project metadata.

2. Add project name and version information.

3. Configure default owners and team information.

4. Set up workflow and status definitions.

## 5. Create PAC Templates

1. Generate epic template following PAC v0.1.0 specification.

2. Create ticket template with required fields.

3. Include metadata sections (id, name, created, owner).

4. Add spec sections (description, scope, success criteria, constraints, dependencies).

## 6. Generate Initial Content

1. If --epic-name provided, create first epic.

2. If --epic-name provided, create initial ticket within epic.

3. Use project owner from --owner flag if provided.

4. Initialize PAC index file if applicable.

## 7. Set Up Git Integration

1. Configure git hooks for PAC validation.

2. Create validation scripts for PAC files.

3. Add .pac/ to git tracking.

4. Create initial commit if requested.

## 8. Validate PAC Setup

1. Verify all directories are created correctly.

2. Validate configuration file format.

3. Test template structure.

4. Confirm PAC environment is ready.

## 9. Provide Next Steps

1. Inform user of successful PAC configuration.

2. Suggest using `/project:pac-create-epic` for creating epics.

3. Recommend `/project:pac-create-ticket` for managing tickets.

4. Document PAC workflow and conventions.

</detailed_sequence_steps>

</task>

