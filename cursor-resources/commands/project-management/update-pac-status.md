<task name="Update PAC Ticket Status">

<task_objective>
Update PAC ticket status and track progress in Product as Code workflow. This workflow takes ticket ID and status flags as input ($ARGUMENTS), processes status updates with validation and workflow integration, and outputs updated ticket YAML with new status, timestamps, and automated suggestions for git workflow actions based on status transitions.
</task_objective>

<detailed_sequence_steps>
# Update PAC Ticket Status - Detailed Sequence of Steps

## 1. Validate PAC Environment

1. Check for PAC directory: !`ls -la .pac/ 2>/dev/null || echo "No .pac directory found"`.

2. Count active tickets: !`find .pac/tickets/ -name "*.yaml" 2>/dev/null | wc -l`.

3. Check recent updates: !`find .pac/tickets/ -name "*.yaml" -mtime -7 2>/dev/null | wc -l`.

4. Validate PAC is properly configured.

## 2. Parse Update Arguments

1. Check for --ticket flag for explicit ticket ID.

2. Check for --status flag for new status value.

3. Check for --assignee flag to update assignee.

4. Check for --comment flag to add progress comment.

5. Check for --epic flag to filter tickets by epic.

## 3. Select Target Ticket

1. If --ticket provided, locate specified ticket.

2. If not provided, list active tickets.

3. If --epic provided, filter tickets by epic.

4. Prompt user for ticket selection if needed.

5. Validate ticket exists.

## 4. Load Current Ticket State

1. Read ticket YAML file.

2. Extract current status and metadata.

3. Load ticket history and previous updates.

4. Verify ticket structure is valid.

## 5. Validate Status Transition

1. Validate new status is in allowed set (backlog/in-progress/review/blocked/done/cancelled).

2. Check if status transition is valid:
   - backlog → in-progress
   - in-progress → review/blocked
   - review → done/blocked
   - blocked → in-progress
   - any → cancelled.

3. Confirm transition with user if needed.

## 6. Update Ticket YAML

1. Update status field with new value.

2. Add timestamp for status change.

3. Update assignee if --assignee provided.

4. Add progress comment if --comment provided.

5. Preserve all existing ticket data.

## 7. Handle Status-Specific Actions

1. **in-progress**: Suggest creating git branch if not exists.

2. **review**: Suggest creating pull request.

3. **done**: Suggest merging branch and closing ticket.

4. **blocked**: Prompt for blocker details.

## 8. Update Parent Epic

1. Load parent epic from ticket metadata.

2. Update epic progress tracking.

3. Recalculate epic completion percentage.

4. Update epic status if needed.

## 9. Generate Status Summary

1. Create status update summary with:
   - Ticket ID and name
   - Previous status → New status
   - Timestamp of update
   - Updated assignee (if changed)
   - Progress comment (if added).

2. Include git workflow suggestions.

3. Show next recommended actions.

## 10. Validate and Confirm

1. Validate updated ticket YAML structure.

2. Verify status transition is recorded.

3. Confirm parent epic is updated.

4. Display status update summary to user.

</detailed_sequence_steps>

</task>

