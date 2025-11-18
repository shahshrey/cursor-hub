<task name="Sync Project to Linear">

<task_objective>
Sync project structure and requirements to Linear workspace with comprehensive task breakdown. This workflow takes project description and optional flags as input ($ARGUMENTS including team-id, create-new, epic-name), analyzes project requirements and structure, and outputs a complete Linear project hierarchy with organized epics, parent tasks, detailed subtasks, proper labeling, priorities, and dependency relationships.
</task_objective>

<detailed_sequence_steps>
# Sync Project to Linear - Detailed Sequence of Steps

## 1. Validate Linear Integration

1. Check if Linear MCP server is configured.

2. Test Linear workspace connection: !`echo "Test Linear connection if MCP available"`.

3. Verify user has appropriate Linear permissions.

4. Confirm workspace access.

## 2. Gather Project Context

1. Parse project description from $ARGUMENTS.

2. Access project documentation from @README.md or project docs.

3. Check for --team-id flag for team assignment.

4. Check for --create-new flag to create new Linear project.

5. Check for --epic-name flag for epic naming.

## 3. Analyze Project Requirements

1. Parse project description to identify major components.

2. Break down project into feature areas.

3. Identify core functionality and dependencies.

4. Extract technical requirements and constraints.

5. Determine project scope and boundaries.

## 4. Create Task Hierarchy

1. Identify epic-level features and major components.

2. Define parent tasks for each feature area.

3. Break down parent tasks into detailed subtasks.

4. Ensure hierarchical structure is logical and complete.

## 5. Define Task Details

1. For each task, define:
   - Clear, descriptive title
   - Detailed description
   - Acceptance criteria
   - Subtasks or checklist items.

2. Add technical context and requirements.

3. Include implementation notes if applicable.

## 6. Assign Task Attributes

1. Apply appropriate labels:
   - frontend
   - backend
   - testing
   - documentation
   - infrastructure.

2. Set priority levels (urgent/high/medium/low).

3. Provide effort estimates.

4. Add task types (feature/bug/improvement).

## 7. Map Dependencies

1. Identify task dependencies and relationships.

2. Establish task ordering and sequence.

3. Define critical path through project.

4. Mark blocking relationships.

5. Create timeline and milestone structure.

## 8. Create Linear Project Structure

1. Create new Linear project or select existing.

2. Set project metadata (name, description, team).

3. Configure project settings and workflow.

## 9. Create Epics in Linear

1. For each epic-level component:
   - Create epic in Linear
   - Set epic description and scope
   - Add epic metadata
   - Link related documentation.

## 10. Create Parent Tasks

1. For each feature area:
   - Create parent task in Linear
   - Link to appropriate epic
   - Set task description and acceptance criteria
   - Add labels and priority.

## 11. Create Detailed Subtasks

1. For each parent task:
   - Create detailed subtasks
   - Set clear descriptions
   - Add acceptance criteria
   - Link dependencies
   - Assign appropriate attributes.

## 12. Configure Task Relationships

1. Link all tasks to parent tasks and epics.

2. Set up dependency relationships.

3. Define milestone associations.

4. Configure timeline and dates if specified.

## 13. Validate Linear Structure

1. Review created project hierarchy.

2. Verify all tasks are properly linked.

3. Check dependency relationships are correct.

4. Ensure labeling and priorities are appropriate.

## 14. Generate Project Overview

1. Compile project structure summary:
   - Total epics created
   - Total tasks and subtasks
   - Task distribution by type
   - Priority breakdown
   - Dependency map.

2. Provide Linear project URL and access information.

3. Document project organization and conventions.

## 15. Output Results

1. Display complete Linear project structure.

2. Provide project overview and statistics.

3. Share Linear project links.

4. Document any manual steps needed.

</detailed_sequence_steps>

</task>

