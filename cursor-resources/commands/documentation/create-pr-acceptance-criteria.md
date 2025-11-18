<task name="Create PR Acceptance Criteria">

<task_objective>
Generate comprehensive, testable acceptance criteria for Pull Request changes by analyzing the git diff and creating clear, boolean-verifiable statements that QA can use to validate the implementation. The output will be a properly formatted acceptance criteria document named `@acceptance-criteria-[feature-name].mdc` with Epic Goal, numbered AC sections, and Definition of Done.
</task_objective>

<detailed_sequence_steps>
# Create PR Acceptance Criteria - Detailed Sequence of Steps

## Overview

You are acting as a Product Manager tasked with creating acceptance criteria that are:
- Testable with true/false statements
- Specific with expected outcomes (status codes, behaviors, data states)
- Comprehensive covering happy paths and error scenarios
- Independent and atomic (one concept per criterion)

## 1. Prepare the Environment

1. Identify the main branch for comparison (typically `main`):
   ```bash
   git fetch origin main
   ```

2. Confirm current feature branch:
   ```bash
   git rev-parse --abbrev-ref HEAD
   ```

3. Verify both commands succeeded and you have the correct branch context.

## 2. Gather PR Changes

1. Get file summary of changes:
   ```bash
   git diff origin/main...HEAD --stat | cat
   ```

2. Get detailed changes:
   ```bash
   git diff origin/main...HEAD | cat
   ```

3. Analyze the scope and nature of changes to inform AC creation.

## 3. Analyze Changes for AC Creation

Systematically review changes to identify:

**New Features and Functionality:**
- New API endpoints and their behaviors
- New UI components or pages
- New business logic or services

**Modified Existing Features:**
- Changes to existing endpoints
- Updates to UI/UX
- Modified business rules

**Technical Changes:**
- Database schema changes
- Integration points
- Configuration changes
- Error handling scenarios

Create a mental model of what the PR achieves and what needs testing validation.

## 4. Generate Acceptance Criteria

Create a comprehensive AC document with the following structure:

### Document Format

```markdown
# Acceptance Criteria: [Feature Name] ([Ticket ID])

## Epic Goal
[Brief description of what the PR achieves from user/business perspective]

## AC1: [Feature Area 1]
- [ ] **AC1.1:** [Specific testable condition with expected outcome]
- [ ] **AC1.2:** [Another specific condition]

## AC2: [Feature Area 2]
- [ ] **AC2.1:** [Specific testable condition]
- [ ] **AC2.2:** [Another condition]

## Definition of Done
- [ ] All acceptance criteria pass
- [ ] Test coverage meets requirements
- [ ] Documentation updated
- [ ] No breaking changes introduced
```

### Quality Standards for Each AC

Each criterion must:
- Be testable with a clear pass/fail result
- Include specific expected outcomes (status codes, data states, behaviors)
- Cover both happy path and error scenarios
- Be independent and atomic
- Use action-oriented language ("returns 201", "displays error message")

### Coverage Areas

Ensure ACs cover:
- All new API endpoints with request/response validation
- Modified functionality with before/after behavior verification
- Error handling and edge cases
- Integration points and backward compatibility
- Data persistence and state management
- User experience and interface changes

### Examples

**Good AC:**
- [ ] **AC1.1:** POST `/api/users` with valid data returns 201 status and user object with generated ID

**Bad AC:**
- [ ] **AC1.1:** User creation works properly and follows best practices

**Good Error Handling AC:**
- [ ] **AC2.3:** POST `/api/users` with missing email field returns 422 status with validation error message

## 5. Document and Save

1. Create file named `@acceptance-criteria-[feature-name].mdc` with generated content.

2. Ensure the document includes:
   - Clear Epic Goal statement
   - All AC sections with testable criteria
   - Definition of Done checklist
   - Proper markdown formatting

3. Verify the document is complete, well-formatted, and ready for QA and development team use.

## 6. Quality Validation

Review the generated acceptance criteria to ensure:
- No vague criteria ("works correctly", "functions properly")
- No implementation details instead of behavior
- All criteria can be easily verified by QA
- No missing error scenarios or edge cases
- No overly complex criteria covering multiple concepts

## Anti-Patterns to Avoid

❌ Vague criteria without specific outcomes
❌ Implementation details instead of user-facing behavior
❌ Criteria that require technical knowledge to verify
❌ Missing error scenarios
❌ Combining multiple concepts in one criterion

## Success Criteria

The acceptance criteria document is complete when:
- All significant changes from the PR have corresponding AC items
- Each AC is independently testable
- QA can verify each criterion with a simple true/false check
- Error scenarios and edge cases are documented
- The document provides a comprehensive testing checklist

</detailed_sequence_steps>

</task>
