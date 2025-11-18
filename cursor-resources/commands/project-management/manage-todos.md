<task name="Manage Project Todos">

<task_objective>
Manage project todos in todos.md file at project root. This workflow takes action and task details as input ($ARGUMENTS - add/complete/remove/list/undo/due/past-due/next with task descriptions and optional dates), processes todo management operations, and outputs updated todos.md file organized into Active and Completed sections with proper formatting, due dates, and completion timestamps.
</task_objective>

<detailed_sequence_steps>
# Manage Project Todos - Detailed Sequence of Steps

## 1. Locate Project Root

1. Search for common project root indicators (.git, package.json, etc.).

2. Determine project root directory.

3. Validate project root location.

## 2. Locate or Create todos.md

1. Check if todos.md exists in project root.

2. If doesn't exist, create todos.md with basic structure:
   ```markdown
   # Project Todos
   
   ## Active
   
   ## Completed
   ```

3. Read current todos.md contents.

## 3. Parse Command Arguments

1. Extract action from $ARGUMENTS (add/complete/remove/list/undo/due/past due/next).

2. Extract task description if provided.

3. Extract optional due date/time parameter.

4. Extract todo number for complete/remove/undo/due actions.

5. Validate command syntax.

## 4. Process Add Command

1. If action is "add":
   - Extract task description from arguments
   - Parse optional due date parameter (tomorrow/next week/specific date/time)
   - Format due date to standardized format (MM/DD/YYYY or locale-specific)
   - Add time if specifically requested (HH:MM AM/PM)
   - Create new todo item: `- [ ] Task description | Due: MM/DD/YYYY`
   - Insert into Active section maintaining due date sort order
   - Todos with due dates come before those without.

2. Update todos.md file.

## 5. Process Complete Command

1. If action is "complete N":
   - Parse todo number N
   - Locate todo N in Active section
   - Mark as completed: change `- [ ]` to `- [x]`
   - Add completion timestamp: `| Done: MM/DD/YYYY`
   - Move from Active section to Completed section
   - Preserve due date if it existed.

2. Update todos.md file.

## 6. Process Remove Command

1. If action is "remove N":
   - Parse todo number N
   - Locate todo N in Active or Completed section
   - Remove todo line entirely.

2. Update todos.md file.

## 7. Process Undo Command

1. If action is "undo N":
   - Parse todo number N
   - Locate todo N in Completed section
   - Change `- [x]` to `- [ ]`
   - Remove completion timestamp (Done: date)
   - Move from Completed section to Active section
   - Re-sort by due date if applicable.

2. Update todos.md file.

## 8. Process Due Command

1. If action is "due N [date/time]":
   - Parse todo number N
   - Parse due date parameter
   - Locate todo N in Active section
   - Add or update due date: `| Due: MM/DD/YYYY`
   - Add time if specified
   - Re-sort Active list by due date.

2. Update todos.md file.

## 9. Process List Command

1. If action is "list" or "list N":
   - Read todos.md file
   - Parse Active and Completed sections
   - Number all todos sequentially (1, 2, 3...)
   - If N provided, show only first N todos
   - Format for display with numbers
   - Highlight due dates and overdue items.

2. Display formatted list to user.

## 10. Process Past Due Command

1. If action is "past due":
   - Parse Active section
   - Extract todos with due dates
   - Compare due dates to current date
   - Filter todos that are past due
   - Number and display past due todos.

2. Display past due list to user.

## 11. Process Next Command

1. If action is "next":
   - Parse Active section
   - If todos have due dates, return earliest due date todo
   - If no due dates, return first todo in Active list
   - Display next task details.

2. Display next task to user.

## 12. Maintain Proper Formatting

1. Keep todos.md structured with:
   - `# Project Todos` header
   - `## Active` section with active tasks
   - `## Completed` section with completed tasks.

2. Sort Active list descending by due date (earliest first).

3. Todos with due dates come before todos without due dates.

4. Use standardized date format (MM/DD/YYYY or DD/MM/YYYY based on locale).

5. Include time only when explicitly requested.

## 13. Provide User Feedback

1. After each operation, show helpful feedback:
   - "Added todo: [description]"
   - "Completed todo N: [description]"
   - "Removed todo N"
   - "Updated due date for todo N".

2. Handle edge cases gracefully:
   - Invalid todo numbers
   - Missing files
   - Malformed dates.

3. Be concise and helpful in responses.

## 14. Validate and Confirm

1. Verify todos.md is properly formatted after updates.

2. Ensure no data loss occurred.

3. Confirm operation completed successfully.

</detailed_sequence_steps>

</task>

