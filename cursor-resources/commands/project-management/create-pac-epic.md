<task name="Create PAC Epic">

<task_objective>
Create new PAC epic following Product as Code specification. This workflow takes epic name and optional flags as input ($ARGUMENTS), processes epic creation through guided workflow following PAC v0.1.0 specification, and outputs a properly structured epic YAML file in `.pac/epics/` with complete metadata, spec sections, and git integration.
</task_objective>

<detailed_sequence_steps>
# Create PAC Epic - Detailed Sequence of Steps

## 1. Validate PAC Environment

1. Check for PAC directory: !`ls -la .pac/ 2>/dev/null || echo "No .pac directory found"`.

2. Access PAC configuration from @.pac/pac.config.yaml (if exists).

3. List existing epics: !`ls -la .pac/epics/ 2>/dev/null | head -10`.

4. If PAC not configured, suggest running `/project:pac-configure`.

## 2. Parse Epic Arguments

1. Extract epic name from $ARGUMENTS.

2. Check for --name flag for explicit epic name.

3. Check for --description flag for epic description.

4. Check for --owner flag for epic owner assignment.

5. Check for --scope flag for scope definition.

## 3. Gather Epic Information

1. If epic name not provided, prompt user for epic name.

2. If description not provided, prompt for epic description.

3. If owner not provided, use default from pac.config.yaml or prompt.

4. If scope not provided, prompt for scope definition.

5. Collect additional epic details (success criteria, constraints).

## 4. Generate Epic ID

1. Convert epic name to kebab-case format.

2. Generate epic ID with format: epic-[kebab-case-name].

3. Validate epic ID doesn't conflict with existing epics.

4. Confirm epic ID with user if needed.

## 5. Create Epic YAML File

1. Create epic file at `.pac/epics/[epic-id].yaml`.

2. Add metadata section with:
   - id: [epic-id]
   - name: [epic name]
   - created: [timestamp]
   - owner: [owner name].

3. Add spec section with:
   - description: [epic description]
   - scope: [scope definition]
   - success_criteria: [criteria list]
   - constraints: [constraint list]
   - dependencies: [dependency list].

## 6. Create Epic Directory Structure

1. Create epic directory at `.pac/epics/[epic-id]/`.

2. Set up subdirectories for epic artifacts.

3. Initialize epic documentation structure.

## 7. Update PAC Index

1. Check if `.pac/index.yaml` exists.

2. If exists, add epic entry to index.

3. Update epic count and metadata.

## 8. Git Integration

1. Check if project is in git repository.

2. If in git, create branch `pac/[epic-id]`.

3. Stage epic files for commit.

4. Provide git workflow guidance.

## 9. Validate and Confirm

1. Validate epic YAML follows PAC v0.1.0 specification.

2. Verify all required fields are present.

3. Confirm epic is properly structured.

4. Display epic details to user.

## 10. Provide Next Steps

1. Inform user of successful epic creation.

2. Suggest using `/project:pac-create-ticket --epic [epic-id]` to add tickets.

3. Document epic workflow and conventions.

</detailed_sequence_steps>

</task>

