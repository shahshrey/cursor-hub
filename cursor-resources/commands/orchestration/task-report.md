<task name="Task Report">

<task_objective>
Generate comprehensive reports on task execution, progress, and metrics. The workflow reads task data from TASK-STATUS-TRACKER.yaml files and task files across orchestrations, calculates performance metrics including velocity, completion rates, quality scores, and resource utilization, formats data according to specified report type (executive summary, sprint report, daily standup, performance, dependencies), and outputs formatted reports to terminal or file in markdown, HTML, PDF, or CSV formats.
</task_objective>

<detailed_sequence_steps>
# Task Report - Detailed Sequence of Steps

## 1. Parse Command and Determine Report Type

1. Identify report type from command:
   - `executive`: High-level overview for stakeholders
   - `sprint`: Sprint progress with burndown and velocity
   - `standup`: Daily standup format (completed, in progress, blocked)
   - `performance`: Team and individual performance metrics
   - `dependencies`: Dependency graph and bottleneck analysis
   - `burndown`: Burndown chart for sprint
   - `velocity`: Velocity report with trends
   - `critical-path`: Critical path analysis
   - `bottlenecks`: Bottleneck identification
   - `resources`: Resource utilization
   - `risks`: Risk assessment
   - No type specified: Default to summary report

2. Extract time period options:
   - `--date MM_DD_YYYY`: Specific orchestration
   - `--from DATE --to DATE`: Date range
   - `--last 7d`: Last 7 days
   - `--this-month`: Current month
   - `--sprint current`: Current sprint
   - `--period week`: This week
   - Default: Active orchestrations

3. Extract filtering options:
   - `--project PROJECT_NAME`: Specific project
   - `--include completed,qa`: Include specific statuses
   - `--exclude on_hold`: Exclude specific statuses
   - `--agent AGENT_NAME`: Filter by agent

4. Extract output format options:
   - `--format markdown`: Markdown output (default)
   - `--format html`: HTML output
   - `--format pdf`: PDF output
   - `--format csv`: CSV data export
   - `--format slack`: Slack-formatted message
   - `--export-jira`, `--export-asana`, `--export-github`: External tool export

5. Extract visualization options:
   - `--include-velocity`: Include velocity charts
   - `--include-burndown`: Include burndown chart
   - `--gantt`: Generate Gantt chart
   - `--visual`: Include visualizations
   - `--animated`: Animated charts (for supported formats)

6. Extract distribution options:
   - `--email EMAIL`: Email report to address
   - `--copy`: Copy to clipboard
   - `--schedule daily --at "9am"`: Schedule recurring report

## 2. Load Orchestration Data

1. Identify target orchestrations based on time period and project filters

2. For each orchestration:
   - Load EXECUTION-TRACKER.md for:
     - Overall progress metrics
     - Velocity data
     - Milestone status
     - Blocker logs
   - Load TASK-STATUS-TRACKER.yaml for:
     - Status distribution
     - Task metadata
     - Status history with timestamps
     - Agent assignments
     - Git tracking
   - Load MASTER-COORDINATION.md for:
     - Original plan and estimates
     - Wave structure
     - Resource allocation
   - Load individual task files for:
     - Detailed descriptions
     - Implementation notes
     - Dependencies

3. Build comprehensive data structure with:
   - All tasks with metadata
   - Status history timeline
   - Agent activity
   - Dependency relationships
   - Completion metrics

## 3. Calculate Core Metrics

1. Calculate task completion metrics:
   - Total tasks count
   - Completed tasks count
   - Completion percentage
   - Tasks by status (todos, in_progress, qa, on_hold, completed)
   - Status distribution percentages

2. Calculate velocity metrics:
   - Tasks completed per day (daily, weekly, overall)
   - Average task duration (by status, by type)
   - Velocity trend over time (improving/declining)
   - Projected completion date based on current velocity

3. Calculate quality metrics:
   - QA rejection rate (qa → in_progress transitions / total qa entries)
   - First-time pass rate (qa → completed without qa → in_progress)
   - Average QA iterations per task
   - Rework time as percentage of total time

4. Calculate time metrics:
   - Average time in each status (todos, in_progress, qa, on_hold)
   - Total project duration (start to current or completion)
   - Estimated vs actual time comparison
   - Time to completion projection

5. Calculate resource metrics:
   - Tasks per agent
   - Average completion time per agent
   - Agent utilization percentages
   - Agent efficiency scores (actual time / estimated time)

## 4. Generate Report Based on Type

### If Report Type is "executive":

1. Calculate project overview:
   - Project name and dates
   - Total duration and percentage complete
   - Original estimate vs current projection

2. Format key metrics section:
   - Total tasks with breakdown by status
   - Completion percentage
   - Tasks remaining

3. Format timeline section:
   - Original estimate
   - Current projection
   - Risk level (on track / at risk / delayed)

4. Identify highlights (major completions, milestones reached):
   - Recently completed major tasks
   - Systems now operational
   - Test results

5. Identify blockers requiring attention:
   - Tasks in on_hold status with reasons
   - External dependencies awaited

6. List next milestones:
   - Upcoming major deliverables
   - Expected completion dates

### If Report Type is "sprint" or "burndown":

1. Extract sprint date range (start to end)

2. Calculate tasks remaining by day:
   - For each day in sprint, count remaining tasks
   - Calculate ideal burndown line
   - Calculate actual burndown

3. Format burndown visualization using ASCII/Unicode characters:
   ```
   Day 1: ████████████████████ 24
   Day 2: ████████████████     20 
   Day 3: ████████████         15 (TODAY)
   Day 4: ████████             10 (projected)
   Day 5: ████                 5  (projected)
   ```

4. Calculate velocity metrics:
   - Average tasks per day
   - Yesterday's completion
   - Today's progress

5. Assess risk: ON TRACK / AT RISK / BEHIND

### If Report Type is "standup":

1. Identify completed tasks since last standup (typically last 24 hours):
   - List task IDs and titles
   - Include completion timestamps
   - Note any major achievements

2. Identify tasks currently in progress:
   - List task IDs, titles, assigned agents
   - Show time in progress
   - Estimated completion

3. Identify blocked tasks:
   - List tasks in on_hold status
   - Include blocking reasons
   - Show duration blocked

4. Identify planned tasks for today:
   - Tasks in todos with high priority
   - Tasks ready to start (no blockers)

### If Report Type is "performance":

1. Calculate agent-level metrics:
   - Tasks completed per agent
   - Average time per task per agent
   - Quality score per agent (based on QA results)
   - Efficiency percentage (actual vs estimated)

2. Format agent performance table with columns:
   - Agent name
   - Completed count
   - Average time
   - Quality score
   - Efficiency percentage

3. Calculate task type metrics:
   - Average time per task type (features, bugfixes, tests)
   - Count per type
   - Quality metrics per type

4. Calculate quality metrics:
   - First-time pass rate
   - Rework required (count and percentage)
   - Total blocked time across all tasks

### If Report Type is "dependencies":

1. Load or construct dependency graph

2. Identify critical path:
   - Calculate longest path through dependency graph
   - List tasks on critical path
   - Show total critical path duration

3. Identify bottleneck tasks:
   - Tasks blocking multiple other tasks
   - Tasks on critical path with long duration
   - Tasks currently blocking progress

4. Generate dependency graph visualization (ASCII art or graphviz format)

5. List dependency issues:
   - Circular dependencies (if any)
   - Orphaned tasks (no dependencies or dependents)

## 5. Add Comparison and Trend Data (if applicable)

1. If `--trends --weeks 4` specified:
   - Load data from previous weeks
   - Calculate week-over-week metrics
   - Show velocity trend
   - Show quality trend
   - Show efficiency indicators over time

2. If `--compare --sprint 23 24` specified:
   - Load data from both sprints
   - Generate side-by-side comparison
   - Calculate improvements/regressions
   - Highlight significant differences

3. Generate trend visualizations (line charts as ASCII art or graphics)

## 6. Add Specialized Analysis Sections

1. If report includes critical path analysis:
   - Calculate and display critical path
   - Show tasks that directly impact completion time
   - Calculate impact of delays on critical path

2. If report includes bottleneck analysis:
   - Identify tasks causing delays
   - Show queue wait times
   - Identify resource constraints

3. If report includes resource utilization:
   - Show agent allocation
   - Display availability
   - Show overloaded/underutilized agents

4. If report includes risk assessment:
   - Identify tasks likely to delay project
   - Assess external dependency risks
   - Calculate probability of on-time delivery

## 7. Generate Visualizations

1. If `--gantt` flag specified:
   - Create Gantt chart showing task timeline
   - Use Unicode box characters for terminal output
   - Show task duration, dependencies, current progress

2. If `--visual` flag for dependency graph:
   - Generate graphviz DOT format
   - Render as SVG or ASCII art
   - Include in report

3. If burndown chart requested:
   - Generate ASCII art burndown chart
   - Show ideal vs actual lines
   - Mark current day

4. If velocity chart requested:
   - Generate line chart of velocity over time
   - Mark target velocity line
   - Show trend direction

5. For HTML/PDF output:
   - Generate embedded chart images using visualization library
   - Include interactive elements (if HTML)

## 8. Format Report Output

1. Apply formatting for terminal output (markdown):
   - Use headers (# ## ###) for sections
   - Use tables for data
   - Use bullet lists for items
   - Apply bold/italics for emphasis
   - Use Unicode box characters for charts

2. Apply formatting for HTML output:
   - Convert markdown to HTML
   - Apply CSS styling
   - Embed charts as images or canvas elements
   - Add navigation links

3. Apply formatting for PDF output:
   - Convert markdown/HTML to PDF
   - Apply professional styling
   - Include charts and graphs
   - Add page numbers and headers

4. Apply formatting for CSV output:
   - Extract tabular data
   - Format as CSV with headers
   - One row per task or metric

5. Apply formatting for Slack output:
   - Use Slack markdown syntax
   - Use emojis for status indicators
   - Format as Slack blocks
   - Include links

## 9. Export to External Tools (if requested)

1. If `--export-jira`:
   - Format data for Jira import
   - Create Jira-compatible JSON or CSV
   - Include task mappings

2. If `--export-asana`:
   - Format data for Asana import
   - Use Asana API format

3. If `--export-github`:
   - Format as GitHub issues or project board data
   - Use GitHub API format

4. If `--api --generate-endpoint`:
   - Create JSON API endpoint file
   - Include query parameters
   - Document API structure

## 10. Distribute Report

1. If terminal output (default):
   - Display formatted report to stdout
   - Apply terminal colors if supported
   - Page output if long (use less/more)

2. If `--copy` flag:
   - Copy formatted report to system clipboard

3. If `--email EMAIL` specified:
   - Format as HTML email
   - Send via configured email system
   - Include charts as embedded images

4. If file output (PDF/HTML/CSV):
   - Write to file with timestamp
   - Display file location
   - Offer to open file

## 11. Schedule Recurring Reports (if --schedule flag)

1. If `--schedule daily-standup --at "9am"`:
   - Create scheduled task in system
   - Configure report type (standup)
   - Set execution time (9am daily)
   - Set output destination (email, slack, file)

2. If `--schedule weekly-summary --every friday`:
   - Create weekly scheduled task
   - Configure report type (performance or summary)
   - Set execution day and time

3. Store schedule configuration in orchestration config file

4. Display confirmation of scheduled report

## 12. Display Report and Cleanup

1. Output formatted report to selected destination

2. Display summary information:
   - Report type generated
   - Time period covered
   - Number of tasks included
   - Key highlights

3. If file created, display file path and size

4. Suggest next actions:
   - View different report type
   - Drill down into specific area
   - Export to different format
   - Schedule recurring report

5. Return success exit code

</detailed_sequence_steps>

</task>

