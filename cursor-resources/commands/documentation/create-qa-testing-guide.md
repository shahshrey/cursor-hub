<task name="Create QA Testing Guide">

<task_objective>
Generate a comprehensive QA testing guide for Pull Request changes by analyzing the git diff and creating actionable testing guidance that helps QA understand features, test focus areas, required test data, areas of caution, and regression testing suggestions. The output will be logged as a comment to the specified Linear ticket.
</task_objective>

<detailed_sequence_steps>
# Create QA Testing Guide - Detailed Sequence of Steps

## Overview

You are assisting QA with understanding and testing features from a Pull Request. Your goal is to generate comprehensive QA testing guidance based on PR changes and log this to the Linear ticket.

**Key Principles:**
1. **Persistence**: Continue working through workflow steps until QA guidance is fully generated and logged to Linear
2. **Tool Usage**: Use available tools to gather correct information - do not guess
3. **Planning & Reflection**: Plan actions before executing, reflect on outcomes after each step

## 1. Prepare the Environment

1. Identify the main comparison branch name (typically `main`):
   - If unsure, confirm with the user
   
2. Fetch latest updates from origin:
   ```bash
   git fetch origin <MAIN_BRANCH_NAME>
   ```

3. Confirm the fetch was successful.

4. Identify the current branch name:
   ```bash
   git rev-parse --abbrev-ref HEAD
   ```

5. Store the current branch name for use in subsequent steps.

6. Verify the current branch name was retrieved successfully.

## 2. Gather Changes

1. Compare the current branch against the fetched state of the main branch:
   ```bash
   git diff origin/<MAIN_BRANCH_NAME>...<CURRENT_BRANCH_NAME> | cat
   ```
   
2. Use the correct `origin/<MAIN_BRANCH_NAME>` and retrieved `CURRENT_BRANCH_NAME`.

3. Pipe to `cat` to avoid pager issues.

4. Verify that the diff output was captured successfully.

## 3. Analyze Changes for QA

Review the diff output methodically to identify:

### Key User-Facing Changes
- What new features will users see?
- What UI modifications have been made?
- What behavior changes will be visible?

### Core Functionality Affected
- Which existing functionalities are modified?
- Which functionalities are extended?
- What are the scope and impact of changes?

### Potential Impact Areas
- What other parts of the system might be indirectly affected?
- Are there downstream dependencies?
- Could this impact integrations?

### High-Risk Changes
- Complex logic requiring careful testing
- Critical path modifications
- Areas with a history of bugs
- Performance-sensitive code

### Data Migration/Changes
- Are there database schema changes?
- Are migrations involved?
- Will existing data be affected?

### Configuration Changes
- Are new configurations introduced?
- Are existing configurations modified?
- Will this affect deployment?

### Integration Points
- How does this interact with other services?
- Are there external API changes?
- Are there cross-module dependencies?

## 4. Generate QA Testing Guide

Compile a concise, clear guide for the QA team with the following sections:

### PR Summary
- Briefly explain what the PR achieves from a user/QA perspective
- Provide context on the purpose and goals

### Test Focus Areas

**New Features:**
- List new features and how to access/test them
- Provide specific steps to verify functionality
- Include expected outcomes

**Modified Functionalities:**
- List modified functionalities with specific aspects to verify
- Example: "Verify user profile update now correctly handles new 'avatar_url' field"
- Provide before/after comparisons where relevant

**Test Scenarios:**
- Suggest specific positive test scenarios
- Suggest specific negative test scenarios
- Include boundary conditions and edge cases

**Edge Cases:**
- Highlight edge cases to consider based on code changes
- Focus on scenarios that could break functionality

### Test Data & Environment

**Required Test Data:**
- Specify test data requirements
- Example: "Test with a user who has X role"
- Example: "Requires a product with Y attribute"

**Environment Setup:**
- Note any environment setup needed
- Specify required configurations
- Mention any prerequisite states

### Areas of Caution

**High-Risk Areas:**
- Point out complex or high-risk areas requiring thorough testing
- Explain why these areas are risky
- Provide additional testing recommendations

**Known Limitations:**
- Mention any known limitations
- Note areas not covered by the PR
- Clarify scope boundaries

### Regression Testing Suggestions

**Critical Functionalities:**
- Suggest critical related functionalities to regression test
- Focus on areas that could have unintended side effects
- Include integration points that might be affected

## 5. Log QA Guidance to Linear Ticket

1. Identify the Linear Issue ID for the relevant PR/feature:
   - If not provided by user, ask for it

2. Use the `linear_create_comment` tool (or equivalent MCP tool) to add the QA Testing Guide as a comment:
   - Pass the Linear Issue ID
   - Pass the complete QA Testing Guide as the comment body

3. Confirm the comment was successfully added to the Linear ticket.

4. Inform the user of the outcome with confirmation message.

## Example Output Format

```markdown
# QA Testing Guide for [Feature Name]

## PR Summary
This PR introduces [brief description of changes and their purpose].

## Test Focus Areas

### New Features
1. **[Feature Name]**: 
   - Navigate to [location]
   - Verify [expected behavior]
   - Test with [specific data]

### Modified Functionalities
1. **[Component Name]**:
   - Verify [specific change]
   - Check [expected outcome]

### Test Scenarios

**Positive Tests:**
- Scenario 1: [Description]
- Scenario 2: [Description]

**Negative Tests:**
- Scenario 1: [Description with expected error]
- Scenario 2: [Description with expected validation]

**Edge Cases:**
- Case 1: [Description]
- Case 2: [Description]

## Test Data & Environment

### Required Test Data
- Test user with [specific attributes]
- Test data with [specific conditions]

### Environment Setup
- Configure [setting]
- Enable [feature flag]

## Areas of Caution

### High-Risk Areas
1. **[Component/Function]**: [Why it's risky and what to test carefully]
2. **[Integration Point]**: [Potential issues to watch for]

### Known Limitations
- [Limitation 1]
- [Limitation 2]

## Regression Testing Suggestions

### Critical Areas to Test
1. **[Feature Area]**: Ensure no impact on [specific functionality]
2. **[Integration]**: Verify [related feature] still works correctly
```

## Success Criteria

The QA testing guide is complete when:
- All changes from the PR are covered in test recommendations
- Test focus areas are specific and actionable
- Required test data and environment setup are clearly specified
- High-risk areas are identified with rationale
- Regression testing recommendations cover critical related functionality
- The guide is successfully logged to the Linear ticket
- User is informed of successful completion

</detailed_sequence_steps>

</task>
