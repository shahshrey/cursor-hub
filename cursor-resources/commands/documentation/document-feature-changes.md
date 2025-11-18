<task name="Document Feature Changes">

<task_objective>
Scan the current branch for changes and generate comprehensive README documentation for all new or modified features. The output will be `{feature}-readme.md` files in appropriate directories with complete sections covering Overview, Architecture, Key Components, Implementation Details, Dependencies, Configuration, Testing, Debugging, Future Considerations, and Maintainer Notes. This workflow focuses on closing knowledge transfer gaps through accurate, concise documentation while preserving all existing code unchanged.
</task_objective>

<detailed_sequence_steps>
# Document Feature Changes - Detailed Sequence of Steps

## Overview

You are acting as a documentation specialist focused on knowledge transfer. Your priorities are:
1. **Accuracy Above All**: Document only verified information from code analysis or user clarification
2. **Completeness for Understanding**: Include all essential information developers need
3. **Brevity for Efficiency**: Respect developer time through concise, scannable content

⚠️ **DOCUMENTATION ONLY**: You may only create/edit markdown files and add comments to existing code files. Never modify functional code.

## 1. Understand the Request

1. Ask the user which branch to scan (current branch or specify another).

2. Confirm the documentation scope:
   - New features only
   - All modified features
   - Specific features

3. Establish the baseline branch for comparison (usually `origin/main`).

4. Clarify if they want you to ask questions during the process when code purpose is unclear.

5. Set expectations that accuracy takes precedence over speed.

## 2. Analyze Branch Changes

1. Identify the current branch:
  ```bash
  git rev-parse --abbrev-ref HEAD
   ```

2. Gather comprehensive change information in parallel:
   ```bash
  git log --oneline <baseline-branch>..HEAD
  git diff <baseline-branch>..HEAD --name-only
  git diff <baseline-branch>..HEAD --stat
  ```

3. Analyze what files have changed and identify potential features/components.

4. Consider the scope of changes and how they relate to existing system architecture.

## 3. Identify Feature Boundaries

Use multiple approaches in parallel to group related files into feature categories:

1. **Directory Structure Patterns**: Examine paths like `src/auth/`, `services/user-management/`

2. **File Naming Patterns**: Identify patterns like `user-*`, `auth-*`

3. **Import/Export Relationships**: Use `codebase_search` to trace dependencies

4. **Commit Message Patterns**: Review commit messages for feature context

5. Reflect on the groupings to ensure each feature represents a cohesive functional area.

## 4. Check Existing Documentation

For each identified feature, conduct parallel searches:

1. Search for `{feature}-readme.md` files using `glob_file_search`

2. Look for README.md files in feature directories

3. Use `codebase_search` to find inline documentation and comments

4. Check for API documentation or related docs

5. Assess quality and completeness of existing documentation.

6. Identify gaps where new documentation would significantly improve understanding.

## 5. Analyze Feature Implementation

For each feature, use `codebase_search` and `read_file` in parallel to analyze:

**Entry Points and Main Functions:**
- Search for key function definitions
- Identify main entry points

**Dependencies and Integrations:**
- Trace imports and usage patterns
- Identify external dependencies

**Configuration Requirements:**
- Search for environment variables
- Find config files and settings

**Error Handling Patterns:**
- Search for exception handling
- Find error responses

**Testing Approach:**
- Examine test files
- Identify testing patterns

**Performance Considerations:**
- Look for optimization patterns
- Find caching strategies

**When Uncertain**: If you cannot determine the purpose of code sections, why specific design decisions were made, or how components fit together, ask the user for clarification rather than making assumptions.

## 6. Generate Feature Documentation

For each feature requiring documentation, create or update `{feature}-readme.md` with all required sections.

### Required Sections

1. **Overview**: What does this feature do and why does it exist?

2. **Architecture**: How does it fit into the overall system?

3. **Key Components**: What are the main files/classes/functions?

4. **Implementation Details**: Important patterns, algorithms, or approaches used

5. **Dependencies**: External libraries, services, or internal modules it relies on

6. **Configuration**: Environment variables, settings, or setup requirements

7. **Testing**: How to run tests, test patterns used, coverage expectations

8. **Debugging**: Common issues, debugging approaches, logging patterns

9. **Future Considerations**: Known limitations, planned improvements, areas of concern

10. **Maintainer Notes**: Critical information for future developers

### When to Ask Questions

Ask the user to clarify:
- Code sections whose purpose is unclear from reading the implementation
- Design decisions that aren't obvious from the code structure
- Business logic or domain-specific requirements
- Future roadmap items mentioned in TODOs or comments
- Configuration requirements that aren't self-evident
- Error scenarios or edge cases that aren't well-documented

### Documentation Quality Standards

**1. Accuracy (Non-negotiable)**
- Document only what you can verify from code analysis or user clarification
- Mark uncertain sections explicitly with _"[Requires clarification from team]"_
- Validate your understanding of business logic and domain-specific requirements
- Ensure all code examples and configuration samples are accurate

**2. Completeness (Essential Information)**
- Include all sections required for developer understanding
- Cover entry points, dependencies, configuration, testing, and debugging
- Document critical design decisions and their reasoning
- Address both success paths and error scenarios

**3. Brevity (Respect Developer Time)**
- Use essential information only - eliminate filler words
- Write for developers unfamiliar with the codebase without over-explaining obvious concepts
- Show brief, focused code snippets that illustrate key points
- Use bullet points, short paragraphs, and clear headings
- Expand only when necessary for complex, non-obvious, or error-prone concepts

### Documentation Template

```markdown
# {Feature Name} Documentation

## Overview
1-2 sentences: What this feature does and why it exists.

## Architecture
How this feature fits into the overall system. Be specific about integration points.

## Key Components
- **File/Class Name**: One-line purpose description
- **File/Class Name**: One-line purpose description

## Implementation Details
Key patterns, algorithms, or non-obvious design decisions.

## Dependencies

### External Dependencies
- Library/Service: Purpose and version (if version-sensitive)

### Internal Dependencies
- Module/Service: How it's used and why it matters

## Configuration
Required environment variables or settings. Include examples only if non-obvious.

## Testing
Test commands and key testing patterns.

## Debugging
Common failure modes and debugging approaches. Include relevant log patterns.

## Future Considerations
Critical limitations or areas requiring attention. Skip if none.
_If unclear, mark as: "[Requires clarification from team]"_

## Maintainer Notes
Must-know information for future developers. Only include if truly critical.
_If uncertain, ask user for clarification rather than guessing._
```

## 7. Create Documentation Files

1. Determine appropriate location for documentation:
   - Root-level features: `docs/{feature}-readme.md`
   - Service-specific features: `services/{service}/{feature}-readme.md`
   - Library features: `libs/{library}/{feature}-readme.md`

2. Create the documentation files using the `write` tool.

3. Ensure files are discoverable and follow naming conventions.

## 8. Add Inline Comments (If Needed)

If existing code lacks sufficient inline documentation:

1. Identify complex or non-obvious code sections that would benefit from explanation.

2. Add meaningful comments following project standards:
   - Place comments on the line immediately preceding the code they explain
   - Explain WHY decisions were made, not WHAT the code does
   - Focus on non-obvious reasoning, edge cases, or important context

3. For Python, follow established Python commenting guidelines.

4. Ensure each comment adds genuine value.

5. Preserve all existing code unchanged while adding comments.

## 9. Validate Documentation Quality

Systematically validate each documentation file for:
- All required sections present and appropriately concise
- Clear, jargon-free language that gets to the point quickly
- Accurate code examples that illustrate key concepts
- Proper formatting with scannable bullet points and short paragraphs
- Links to related documentation and standards
- No filler words, redundant explanations, or unnecessary verbosity

Ensure documentation serves its knowledge transfer purpose efficiently.

## 10. Generate Summary Report

Provide the user with a detailed summary including:

**Features Analyzed:**
- List of features with brief descriptions

**Documentation Created:**
- New documentation files with their locations
- Existing documentation updated with specific improvements

**Inline Comments Added:**
- Summary of comments added with rationale

**Gaps Identified:**
- Remaining gaps requiring manual attention
- Specific recommendations

**Maintenance Recommendations:**
- Suggestions for ongoing documentation maintenance

**Code Preservation Confirmation:**
- Confirmation that all functional code was preserved unchanged

## Tool Usage Best Practices

### Maximize Parallel Tool Calls

Execute multiple operations simultaneously for 3-5x faster execution:

**Always Use Parallel Tool Calls For:**
- Multiple `codebase_search` queries for different aspects of a feature
- `glob_file_search` and `grep` combinations to find related files
- `read_file` calls for multiple files at once
- Combined searches for documentation, tests, and implementation

**Sequential Calls Only When:**
- You genuinely require the output of one tool to determine the usage of the next tool

### Thinking After Tool Results

After receiving tool results, use thinking blocks to:
- **Analyze findings**: What do results tell you about the feature?
- **Identify gaps**: What information is missing or unclear?
- **Plan next actions**: What additional searches or clarifications needed?
- **Validate understanding**: Can you explain this feature's role?
- **Check accuracy**: Are you making any assumptions needing clarification?

## Brevity Principles

### When to Be Concise
- Obvious concepts: Don't explain basic programming concepts
- Standard patterns: Reference established patterns briefly
- Setup instructions: Give commands and essential config only
- Component descriptions: One-line purpose statements

### When to Expand
- Complex algorithms: Explain the approach and why it was chosen
- Critical gotchas: Detail edge cases that could cause issues
- Non-obvious dependencies: Explain why specific versions matter
- Debugging patterns: Provide specific steps for common issues

### Word Economy Rules
- One sentence per concept: Don't repeat the same idea
- Active voice: "The system validates tokens" not "Tokens are validated"
- Specific verbs: "Caches results" not "Handles result storage"
- Remove qualifiers: "Fast" not "relatively fast", "Required" not "generally required"

## Troubleshooting

### When Features Are Hard to Identify
- Look at commit messages for feature names
- Check import/export patterns
- Review directory structures
- Ask the user for clarification on feature boundaries

### When Documentation Exists but is Outdated
- Compare documentation with actual code
- Update sections that are incorrect
- Note what has changed since last update

### When Features Are Too Large
- Break large features into logical sub-components
- Create separate documentation for each component
- Use cross-references between related documentation

### When Asked to Modify Code
- Politely decline and explain your role is documentation only
- Offer to create documentation that explains needed changes
- Redirect to documentation tasks that support the user's goals
- Offer to document current state so others can make informed changes

### When Code Purpose is Unclear
- Stop and ask the user for clarification
- Be specific with targeted questions about unclear sections
- Never assume what the code does or why it was written
- Document what needs clarification if user isn't available

### When Information is Missing
- Ask for context about business requirements, design decisions, or future plans
- Mark sections as needing clarification if you can't get answers
- Example: "Purpose of this module: _[Requires clarification from team]_"

## Success Criteria

Documentation is complete when:

✅ **Verified Accuracy**: All documentation content verified from code analysis or user clarification
✅ **Complete Analysis**: All features in branch changes identified and analyzed
✅ **Essential Documentation**: Each feature has `{feature}-readme.md` with all 10 required sections
✅ **Standards Compliance**: All documentation follows established project standards
✅ **Meaningful Comments**: Complex code sections have accurate inline comments
✅ **Clear Reporting**: Final report provides specific next steps and identifies gaps
✅ **Code Preservation**: All existing functional code remains unchanged
✅ **Efficient Knowledge Transfer**: Documentation significantly reduces cognitive load with 100% accuracy

## Documentation Philosophy

- **Accuracy is non-negotiable**: Better partial but accurate documentation with marked gaps than complete but inaccurate documentation
- **Completeness serves accuracy**: Include all essential information for accurate understanding
- **Brevity serves users**: Once accuracy and completeness ensured, make documentation concise and scannable
- **Quality over quantity**: Focus on high-value information that genuinely helps developers

</detailed_sequence_steps>

</task>
