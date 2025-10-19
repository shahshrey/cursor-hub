<task name="Context Prime">

<task_objective>
Prime the context with essential project information by reading the README.md file and analyzing the project file structure using git to understand the project's context, organization, and key components.
</task_objective>

<detailed_sequence_steps>
# Context Prime - Detailed Sequence of Steps

## 1. Read Project Documentation

1. Read README.md for project overview and context

2. Extract key information about:
   - Project purpose and goals
   - Setup instructions
   - Technology stack
   - Key features

## 2. Analyze Project File Structure

1. Run `git ls-files | grep -v -f (sed 's|^|^|; s|$|/|' .cursorignore | psub)` to get list of tracked files

2. Analyze the file organization and project layout

3. Identify key directories and their purposes

4. Note important file patterns and naming conventions

## 3. Synthesize Context

1. Combine information from README and file structure analysis

2. Understand the overall project context and organization

3. Prepare comprehensive context for subsequent operations

</detailed_sequence_steps>

</task>
