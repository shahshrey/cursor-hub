<task name="Enforce Minimal Changes Principle">

<task_objective>
Apply the minimal changes principle to review and refactor existing code, ensuring only necessary modifications are made for the specific task at hand. These rules MUST be followed for all code changes unless a task or project-specific rule explicitly overrides them. Agents must continue iterating and applying these rules until the user's code task is fully and correctly resolved.
</task_objective>

<detailed_sequence_steps>
# Enforce Minimal Changes Principle - Detailed Sequence of Steps

## 1. Understand the Task Requirements

1. Read and analyze the user's request to identify the specific task at hand.

2. Clearly identify before making any changes:
   - What specifically needs to change
   - Why it needs to change
   - The minimal scope required for the change

3. If unsure about code context or requirements, use available tools to gather information before making changes. Do not guess.

4. Plan the minimal set of edits required before making changes.

## 2. Apply Core Minimal Changes Principles

1. Only change what is absolutely necessary to complete the task.

2. Resist the urge to "improve" unrelated code while making changes.

3. Keep changes focused and atomic.

4. Ensure each change has a clear, direct purpose.

5. Do not reformat unrelated lines or fix unrelated issues.

6. Do not update unrelated dependencies or change indentation of unchanged code.

7. Do not reorganize imports unless directly related to your change.

## 3. Context-Specific Implementation

### When Fixing Bugs

1. Focus only on the specific bug being addressed.

2. Do not refactor surrounding code or add new features while fixing bugs.

3. Do not change error handling unless directly related to the bug.

4. Document why the minimal change fixes the bug.

### When Adding Features

1. Add only the code needed for the new feature.

2. Do not refactor existing code unless absolutely necessary for integration.

3. Keep new code isolated where possible.

4. Only modify existing code where direct integration is required.

### When Reviewing Code

1. Look for changes that aren't directly related to the task.

2. Question any formatting changes to unchanged lines.

3. Verify each change has a clear purpose.

4. Check that bug fixes are focused only on the bug.

5. Ensure feature additions don't include unnecessary changes.

## 4. Validate and Reflect

1. After each change, reflect on whether the rules have been fully satisfied.

2. Verify that all changes are necessary and directly related to the task.

3. Check if further action is needed to complete the task.

4. Ensure no unrelated improvements or refactoring have been introduced.

## 5. Handle Exceptions Appropriately

1. If a change requires refactoring for integration, document why the additional changes are necessary.

2. If the change exposes a critical bug, document the issue and keep additional changes minimal.

3. If existing functionality would break without additional changes, document the reason and keep modifications to the minimum required.

## Example Comparison

**Task: Add error logging**

**Bad Approach - Making unrelated changes:**
```python
def process_data(data: List[str]) -> None:  # Added type hint (unrelated)
    try:
        for item in data:
            result = transform(item)
            save_to_db(result)
    except Exception:
        logger.exception("Error processing data")  # The only necessary change
```

**Good Approach - Only making required changes:**
```python
def process_data(data):
    try:
        for i in data:
            res = transform(i)
            save_to_db(res)
    except Exception:
        logger.exception("Error processing data")  # Only change what's needed
```

</detailed_sequence_steps>

</task>
