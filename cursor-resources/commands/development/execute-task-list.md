<task name="Execute Task List">

<task_objective>
Act as a world-class developer to execute a tasklist from the `/agent-helpers/tasks` folder by reading the implementation guide, reviewing the codebase, and systematically completing all tasks in order until finished. The output will be completed tasks with appropriate git commits and a final status update.
</task_objective>

<detailed_sequence_steps>
# Execute Task List - Detailed Sequence of Steps

## 1. Verify Git Branch Status

1. Check the current git branch status:
   ```bash
   git status
   ```

2. Verify the working directory is clean:
   - No uncommitted changes
   - On the correct branch for this work

3. If the branch is not clean:
   - DO NOT create a new branch yourself
   - Alert the user that the branch is not clean
   - Ask the user to start a new branch before proceeding
   - Wait for user confirmation before continuing

## 2. Locate and Load Task List

1. Look for task list in the `/agent-helpers/tasks` folder.

2. If the folder or task list doesn't exist:
   - Check alternative locations the user might have specified
   - Ask the user for the correct location

3. Read the complete task list file.

4. Identify if there's an implementation guide or additional context:
   - Look for files like `implementation-guide.md`, `context.md`, or similar
   - Read any provided guides completely before starting

## 3. Review Codebase

1. Perform a quick codebase review to understand:
   - Project structure and organization
   - Key files and directories relevant to the tasks
   - Coding conventions and patterns used
   - Technologies and frameworks in use

2. Use `grep` or `codebase_search` to find relevant code sections mentioned in tasks.

3. Understand dependencies between tasks to anticipate requirements.

## 4. Process Tasks Sequentially

1. For each task in order:

   **A. Read and Understand the Task:**
   - Read the task description completely
   - Identify acceptance criteria
   - Note any specific requirements or constraints
   - Check for any optional user details provided

   **B. Plan the Implementation:**
   - Identify files that need to be created or modified
   - Determine the approach to implement the task
   - Consider edge cases and error handling

   **C. Implement the Task:**
   - Make necessary code changes
   - Follow project conventions and user rules
   - Apply separation of concerns principles
   - Use early returns and functional programming patterns
   - Ensure proper error handling with try-except blocks
   - Specify `encoding="utf-8"` when using `open()` in Python

   **D. Verify the Implementation:**
   - Review code for linter errors and fix them
   - Check for duplicate functionality or unused variables
   - Ensure the implementation meets the task requirements
   - Test the changes if possible

   **E. Use Git to Review Changes:**
   - Run `git diff` to review what changed
   - Verify changes are relevant to the task
   - Ensure no unintended modifications were made

2. If you need clarification on any task:
   - Clearly state what is unclear
   - Ask the user for specific details needed
   - Wait for response before proceeding with that task

3. Continue to the next task immediately after completing the current one.

## 5. Handle Implementation Issues

1. If a task cannot be completed due to missing information:
   - Document what information is needed
   - Ask the user for clarification
   - Move to the next task if possible, or wait for response

2. If a task reveals issues with previous tasks:
   - Flag the issue immediately
   - Fix the previous task before continuing
   - Document the correction

3. If linter errors are introduced:
   - Fix them immediately before proceeding
   - Run linter again to verify fixes

## 6. Final Review and Update

1. After completing all tasks:
   - Run `git status` to see all modified files
   - Review the complete set of changes with `git diff`
   - Verify all tasks are complete and meet requirements
   - Check for any linter errors in modified files

2. Provide a concise summary to the user:
   - Number of tasks completed
   - Key files modified or created
   - Any issues encountered and how they were resolved
   - Confirmation that all tasks are done

3. Ask user if they want to commit the changes or if further review is needed.

## 7. Optional: Process User Details

1. If the user provided additional details in their message:
   - Review the optional details section
   - Incorporate any additional context or requirements
   - Adjust task execution accordingly

2. Prioritize explicit user instructions over general task descriptions.

</detailed_sequence_steps>

</task>
