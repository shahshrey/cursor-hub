<task name="Directory Deep Dive">

<task_objective>
Analyze the architecture, implementation principles, and design patterns of a specified directory (or current working directory) and its subdirectories. Generate comprehensive documentation (AGENTS.md) that captures key architectural decisions, implementation details, common patterns, and important context for future development work in that area.
</task_objective>

<detailed_sequence_steps>
# Directory Deep Dive - Detailed Sequence of Steps

## 1. Identify Target Directory

1. Determine the directory to analyze:
   - Use the directory specified in `$ARGUMENTS` if provided
   - Otherwise, use the current working directory
   
2. Verify the directory exists and is accessible

3. Display the target directory path to the user for confirmation

## 2. Analyze Directory Structure

1. List all files and subdirectories in the target directory

2. Identify the primary programming languages and frameworks used

3. Map out the directory organization:
   - Identify key subdirectories and their purposes
   - Note any standard patterns (MVC, feature-based, layered, etc.)
   - Document the file naming conventions

## 3. Investigate Code Architecture

1. Examine implementation patterns across files:
   - Design patterns being used (Singleton, Factory, Observer, etc.)
   - Architectural patterns (MVC, MVVM, Clean Architecture, etc.)
   - Code organization principles (DRY, SOLID, separation of concerns)

2. Analyze dependencies:
   - External libraries and frameworks
   - Internal module dependencies
   - Common utilities and shared code

3. Identify key abstractions:
   - Core interfaces and base classes
   - Important data structures
   - API boundaries and contracts

4. Note coding standards:
   - Naming conventions for variables, functions, classes
   - Code formatting patterns
   - Comment and documentation styles

## 4. Extract Implementation Details

1. Document critical implementation details:
   - Configuration patterns and settings
   - State management approaches
   - Error handling strategies
   - Performance optimization techniques

2. Identify non-obvious behaviors:
   - Side effects and hidden dependencies
   - Gotchas and common pitfalls
   - Workarounds and technical debt
   - Important assumptions in the code

3. Note testing patterns:
   - Test file locations and naming
   - Testing frameworks used
   - Coverage patterns

## 5. Create or Update Documentation

1. Check if a AGENTS.md file already exists in the target directory

2. Generate comprehensive documentation including:
   - **Purpose and Responsibility**: High-level description of what this module does
   - **Key Architectural Decisions**: Important design choices and their rationale
   - **Directory Structure**: Organized breakdown of subdirectories and their roles
   - **Implementation Details**: Critical patterns, conventions, and approaches
   - **Common Patterns**: Recurring code patterns and how to use them
   - **Dependencies**: External and internal dependencies with their purposes
   - **Gotchas and Pitfalls**: Non-obvious behaviors and things to watch out for
   - **Best Practices**: Guidelines for working in this codebase area

3. If AGENTS.md exists:
   - Review existing content
   - Merge new discoveries with existing documentation
   - Update outdated information
   - Preserve valuable context from the original

4. If AGENTS.md doesn't exist:
   - Create a new comprehensive documentation file

## 6. Finalize and Place Documentation

1. Save the AGENTS.md file in the analyzed directory

2. Verify the file was created/updated successfully

3. Present a summary to the user:
   - Location of the documentation file
   - Key findings and insights
   - Number of files analyzed
   - Main architectural patterns discovered

4. Provide recommendations for next steps if applicable

</detailed_sequence_steps>

<credit>
Based on the work of Thomas Landgraf: https://thomaslandgraf.substack.com/p/claude-codes-memory-working-with
</credit>

</task>