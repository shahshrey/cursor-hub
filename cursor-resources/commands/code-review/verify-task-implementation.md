<task name="Verify Task Implementation">

<task_objective>
Review completed work against the task list by examining related changes using git diff and confirming whether implementations fully satisfy requirements. Verify completeness, correctness, and usability through code analysis, marking tasks as done when validated or providing actionable feedback when gaps exist.
</task_objective>

<detailed_sequence_steps>
# Verify Task Implementation - Detailed Sequence of Steps

## 1. Load Task List

1. Locate and read the task list file (typically in `/agent-helpers/tasks` folder or as provided by the user).

2. Parse all tasks and their requirements to understand what needs to be verified.

3. Identify any UAT (User Acceptance Test) scripts or acceptance criteria associated with tasks.

## 2. Examine Changes Per Task

1. For each task in the list, identify the files that should have been modified.

2. Run `git diff` to view the actual changes made to those files.

3. Compare the implementation against the task requirements:
   - Does the code implement the required functionality?
   - Are edge cases handled appropriately?
   - Is the implementation consistent with project conventions?

4. If a task involves multiple files, trace the flow from entry point to downstream files.

## 3. Validate UAT Scripts

1. If a UAT script is provided, step through it mentally from a user's perspective.

2. Verify that:
   - The starting file/entry point exists and is accessible
   - Each step in the UAT can be executed without errors
   - Downstream files affected by changes are properly integrated

3. Identify any gaps between the UAT script and actual implementation.

## 4. Provide Feedback

1. For completed tasks that meet requirements:
   - Mark the task as done
   - Note any minor improvements that could be made (optional)

2. For incomplete or incorrect tasks:
   - Leave clear, actionable notes on what needs to be fixed
   - Reference specific lines of code or requirements that are not met
   - Ask the user for clarification if requirements are ambiguous

3. Keep all feedback concise and actionable.

## 5. Final Verification

1. Ensure all tasks have been reviewed and marked appropriately.

2. Verify that no unintended changes were introduced (use `git diff` to check).

3. Provide a summary of the review status to the user.

</detailed_sequence_steps>

</task>
