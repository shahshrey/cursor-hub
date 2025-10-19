<task name="Orchestrate Tasks">

<task_objective>
Initiate the task orchestration workflow using the three-agent system (task-orchestrator, task-decomposer, and dependency-analyzer) to create a comprehensive execution plan. The workflow processes requirements from direct task lists, file references, or mixed context, and generates a complete orchestration structure with atomic task files, dependency analysis, and master coordination documents in the `/task-orchestration/MM_DD_YYYY/descriptive_task_name/` directory structure.
</task_objective>

<detailed_sequence_steps>
# Orchestrate Tasks - Detailed Sequence of Steps

## 1. Clarify Requirements

1. Extract actionable tasks from provided context (task list, file path, or mixed context with discussions and notes)

2. Filter out irrelevant information (meeting notes about UI colors, deadline mentions from non-technical stakeholders)

3. Present extracted tasks for confirmation to ensure understanding matches intent

4. Ask clarifying questions if task descriptions are unclear or incomplete

5. Document any constraints mentioned (resource limits, focus areas, deadlines)

## 2. Create Directory Structure

1. Generate today's date in MM_DD_YYYY format for the orchestration folder

2. Create descriptive task name from the primary objective or project name (e.g., `authentication_system`, `payment_integration`)

3. Build complete directory structure:
   - `/task-orchestration/MM_DD_YYYY/descriptive_task_name/`
   - `MASTER-COORDINATION.md` (comprehensive coordination plan)
   - `EXECUTION-TRACKER.md` (progress tracking document)
   - `TASK-STATUS-TRACKER.yaml` (structured status data)
   - `tasks/` subdirectory with status folders:
     - `todos/` (pending tasks)
     - `in_progress/` (active tasks)
     - `on_hold/` (blocked tasks)
     - `qa/` (tasks under review)
     - `completed/` (finished tasks)

4. Initialize all tracking files with baseline data

## 3. Decompose Tasks

1. Work with task-decomposer agent to break down high-level requirements into atomic tasks

2. For each task, define:
   - Unique task ID (TASK-XXX format)
   - Clear title and description
   - Estimated effort (hours)
   - Task type (feature, bugfix, test, security, etc.)
   - Priority level
   - Required resources and tools

3. Create individual task files in `tasks/todos/` directory

4. Ensure tasks are appropriately sized (not too large >6h, not too small <1h)

5. Include implementation notes, acceptance criteria, and test requirements in each task file

## 4. Analyze Dependencies

1. Use dependency-analyzer agent to identify relationships between tasks

2. Detect blocking dependencies (Task A must complete before Task B starts)

3. Identify parallelization opportunities (tasks that can run concurrently)

4. Check for circular dependencies and suggest resolutions

5. Flag potential conflicts (resource contention, overlapping file changes)

6. Generate TASK-DEPENDENCIES.yaml file with complete dependency graph

7. Calculate critical path and identify high-impact blocking tasks

## 5. Generate Master Coordination Plan

1. Create MASTER-COORDINATION.md with:
   - Project overview and objectives
   - Task wave assignments (logical groupings for execution)
   - Dependency graph visualization
   - Resource allocation matrix
   - Risk assessment and mitigation strategies
   - Execution timeline with milestones

2. Populate EXECUTION-TRACKER.md with:
   - Current progress metrics (0% at start)
   - Task completion tracking
   - Velocity calculations framework
   - Blocker and risk logs
   - Status transition history

3. Initialize TASK-STATUS-TRACKER.yaml with:
   - Complete task inventory
   - Initial status (all in todos)
   - Agent assignments (if specified)
   - Timestamp metadata

## 6. Present Deliverables

1. Show summary of created orchestration:
   - Total tasks count
   - Estimated duration
   - Identified dependencies
   - Resource requirements

2. Highlight critical path tasks and potential bottlenecks

3. Suggest optimal execution strategy (which tasks to start first)

4. Request approval to proceed or adjustments needed

5. Provide commands for next steps (`/task-status`, `/task-move`, `/orchestration/optimize`)

</detailed_sequence_steps>

</task>

