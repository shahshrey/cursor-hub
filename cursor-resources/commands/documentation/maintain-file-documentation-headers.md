<task name="Maintain File Documentation Headers">

<task_objective>
Review and maintain top-of-file documentation headers for all created or edited files. Create concise, context-rich documentation that orients future AI agents efficiently without bloating their context window. The output will be updated file headers with appropriate comment syntax for each file type.
</task_objective>

<detailed_sequence_steps>
# Maintain File Documentation Headers - Detailed Sequence of Steps

## 1. Identify Target Files

1. Determine which files need documentation:
   - All files that have been created during the current session
   - All files that have been edited during the current session
   - If user specifies a folder, recursively process all files within that path

2. Collect the list of target files for processing.

## 2. Analyze Each File

1. Open the file and examine its current state.

2. Check if top-of-file documentation exists:
   - Look for header comments in the appropriate syntax for the file type
   - Identify any existing documentation structure

3. Understand the file's purpose and functionality:
   - Why the file exists
   - Key behaviors and responsibilities
   - Important inputs/outputs
   - External dependencies or side effects
   - Non-obvious constraints, invariants, or performance assumptions

## 3. Create or Update Documentation Header

1. Determine the appropriate comment syntax for the file type:
   - Python: `#`
   - JavaScript/TypeScript: `//` or `/* */`
   - HTML/XML: `<!-- -->`
   - CSS: `/* */`
   - Shell scripts: `#`
   - Other languages: Use appropriate syntax

2. Write concise documentation following these guidelines:
   - Source files: 6–12 lines maximum
   - Utility or test files: 1–2 lines
   - Focus on what matters, not obvious details
   - Use clear, present-tense sentences or short bullet points
   - Do not restate filename, language, or trivial imports

3. Include a "Recent Changes" section:
   - Add current date and one-line summary of latest edits
   - Keep only the three most recent changes
   - Remove older entries

4. Remove stale or redundant information.

## 4. Apply Documentation

1. Insert or update the header at the top of the file.

2. Ensure proper formatting and syntax.

3. Verify the documentation is accurate and reflects current state.

## 5. Review and Confirm

1. Review all updated files to ensure documentation quality.

2. Confirm that each file has appropriate context for future AI agents.

3. Report completion to the user with summary of files processed.

</detailed_sequence_steps>

</task>
