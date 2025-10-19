<task name="Create PAC Ticket">

<task_objective>
Create new PAC ticket within an epic following Product as Code specification. This workflow takes ticket name, epic ID, and optional flags as input ($ARGUMENTS), processes ticket creation through guided workflow following PAC v0.1.0 specification, and outputs a properly structured ticket YAML file in `.pac/tickets/` linked to parent epic with complete metadata and spec sections.
</task_objective>

<detailed_sequence_steps>
# Create PAC Ticket - Detailed Sequence of Steps

## 1. Validate PAC Environment

1. Check for PAC directory: !`ls -la .pac/ 2>/dev/null || echo "No .pac directory found"`.

2. Access PAC configuration from @.pac/pac.config.yaml (if exists).

3. List available epics: !`ls -la .pac/epics/ 2>/dev/null | head -10`.

4. If PAC not configured, suggest running `/project:pac-configure`.

## 2. Parse Ticket Arguments

1. Extract ticket name from $ARGUMENTS.

2. Check for --epic flag for parent epic ID (required).

3. Check for --type flag for ticket type (feature/bug/task/spike).

4. Check for --assignee flag for developer assignment.

5. Check for --priority flag for priority level.

6. Check for --create-branch flag for automatic git branch creation.

## 3. Validate Parent Epic

1. If --epic not provided, list available epics and prompt for selection.

2. Validate specified epic exists in `.pac/epics/`.

3. Load parent epic details.

4. Confirm epic is appropriate for the ticket.

## 4. Gather Ticket Information

1. If ticket name not provided, prompt user for ticket name.

2. If type not provided, prompt for ticket type.

3. If assignee not provided, prompt or use default.

4. If priority not provided, prompt or use default.

5. Collect acceptance criteria and task list.

## 5. Generate Ticket ID

1. Generate unique ticket ID with sequence number.

2. Format ticket ID following project conventions.

3. Validate ticket ID doesn't conflict with existing tickets.

4. Confirm ticket ID generation.

## 6. Create Ticket YAML File

1. Create ticket file at `.pac/tickets/[ticket-id].yaml`.

2. Add metadata section with:
   - id: [ticket-id]
   - name: [ticket name]
   - epic: [parent epic-id]
   - created: [timestamp]
   - assignee: [assignee name].

3. Add spec section with:
   - description: [ticket description]
   - type: [ticket type]
   - status: backlog
   - priority: [priority level]
   - acceptance_criteria: [criteria list]
   - tasks: [task list].

## 7. Link to Parent Epic

1. Update parent epic with ticket reference.

2. Add ticket to epic's ticket list.

3. Update epic progress tracking.

## 8. Create Git Branch (if requested)

1. If --create-branch flag set, create git branch.

2. Format branch name as `ticket/[ticket-id]`.

3. Switch to new branch.

4. Stage ticket files.

## 9. Validate and Confirm

1. Validate ticket YAML follows PAC v0.1.0 specification.

2. Verify all required fields are present.

3. Confirm ticket is properly linked to epic.

4. Display ticket details to user.

## 10. Provide Next Steps

1. Inform user of successful ticket creation.

2. Suggest using `/project:pac-update-status` to track progress.

3. Document ticket workflow and conventions.

</detailed_sequence_steps>

</task>

