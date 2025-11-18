<task name="Task Status">

<task_objective>
Check the current status of tasks in the orchestration system with various filtering and reporting options. The command provides comprehensive visibility into task progress, status distribution, and execution metrics across all active orchestrations, reading from TASK-STATUS-TRACKER.yaml files and generating formatted reports in terminal output with summary views, detailed views, timelines, and velocity metrics.
</task_objective>

<detailed_sequence_steps>
# Task Status - Detailed Sequence of Steps

## 1. Identify Orchestration Scope

1. Determine which orchestrations to include based on command options:
   - `--today`: Only today's orchestrations
   - `--date MM_DD_YYYY --project PROJECT_NAME`: Specific orchestration
   - No options: All active orchestrations
   - `--all`: Include historical orchestrations

2. Locate relevant TASK-STATUS-TRACKER.yaml files in the task-orchestration directory tree

3. Verify file accessibility and read permissions

4. Load status data from all identified orchestrations

## 2. Apply Filters

1. Process status filter if specified (`--status in_progress`, `--status qa,completed`)

2. Apply agent filter if specified (`--agent dev-frontend`)

3. Filter by priority if specified (`--priority high`)

4. Filter by task type if specified (`--type feature`, `--type bugfix`)

5. Apply date range filters (`--modified today`, `--created-after yesterday`)

6. Apply special filters:
   - `--ready`: Tasks with no blocking dependencies
   - `--critical-path`: Tasks on critical path
   - `--overdue`: Tasks exceeding estimated time
   - `--available`: Ready-to-pick-up todos

7. Combine multiple filters with AND logic

## 3. Generate Summary View (Default)

1. Calculate total active orchestrations count

2. Count total tasks across all included orchestrations

3. Compute status distribution:
   - Count tasks in each status (completed, qa, in_progress, on_hold, todos)
   - Calculate percentages for each status

4. Format status distribution table with columns: Status, Count, Percentage

5. List active tasks (in_progress) with:
   - Task ID
   - Task title
   - Assigned agent
   - Duration in progress

6. List blocked tasks (on_hold) with:
   - Task ID
   - Task title
   - Blocking reason or dependency

7. Display summary in formatted terminal output

## 4. Generate Detailed View (--detailed flag)

1. For each task matching filters, show:
   - Task ID and full title
   - Current status
   - Assigned agent
   - Start timestamp
   - Duration in current status
   - Estimated progress percentage and remaining time
   - Dependencies (tasks this depends on)
   - Blocks (tasks blocked by this)
   - File location path

2. Display status history with timestamps and transitions:
   - todos → in_progress (timestamp) by agent
   - in_progress → qa (timestamp) by agent
   - etc.

3. Include git commit references if available

4. Show test results and QA notes if in qa or completed status

## 5. Generate Timeline View (--timeline flag)

1. Create Gantt-style visualization using Unicode box characters

2. Plot tasks across time axis showing:
   - Start and end times
   - Current progress
   - Dependencies as connecting lines
   - Critical path highlighted

3. Use color coding or symbols for different statuses

4. Include today marker and milestones

## 6. Generate Velocity Report (--velocity flag)

1. Calculate completion rates:
   - Tasks completed per day (historical average)
   - Current week velocity
   - Velocity trend (improving/declining)

2. Compute average completion times:
   - By task type (feature, bugfix, test, etc.)
   - By status transition (todos→in_progress, in_progress→qa, qa→completed)

3. Generate performance metrics:
   - Estimation accuracy (actual time vs estimated time)
   - First-pass QA success rate
   - Blocker frequency and average resolution time

4. Show velocity chart comparing actual vs target

5. Project completion date based on current velocity

## 7. Export and Integration (Optional)

1. If `--export markdown` specified, generate markdown-formatted report file

2. If `--export csv` specified, generate CSV file with task data

3. If `--copy` specified, copy results to system clipboard

4. If `--watch` specified, refresh display every 30 seconds with updated data

5. If `--export paths` specified, output only file paths for batch operations

## 8. Format and Display Results

1. Apply output formatting based on terminal capabilities (colors, unicode support)

2. Sort results by relevance or specified sort order

3. Limit output if `--limit N` specified

4. Add navigation hints and quick action suggestions

5. Display timestamp of report generation

6. Show local timezone for all time values

</detailed_sequence_steps>

</task>

