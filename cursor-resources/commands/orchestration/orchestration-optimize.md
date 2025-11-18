<task name="Orchestration Optimize">

<task_objective>
Analyze and optimize task orchestrations to improve efficiency, reduce bottlenecks, and maximize team productivity. The workflow performs comprehensive analysis of active and historical orchestrations by identifying bottlenecks, analyzing velocity metrics, detecting parallelization opportunities, suggesting resource rebalancing, and providing actionable recommendations with impact projections, outputting detailed optimization reports and optionally applying safe optimizations automatically.
</task_objective>

<detailed_sequence_steps>
# Orchestration Optimize - Detailed Sequence of Steps

## 1. Determine Optimization Scope

1. Identify target orchestration(s) based on command options:
   - No options: Most recently active orchestration
   - `--date MM_DD_YYYY --project PROJECT_NAME`: Specific orchestration
   - `--all`: All active orchestrations
   - Default to orchestrations with active tasks (not 100% complete)

2. Set analysis focus based on flags:
   - `--performance`: Focus on timing, velocity, resource utilization
   - `--dependencies`: Focus on task dependencies and parallelization
   - `--workflow`: Focus on process and status transitions
   - `--rebalance`: Focus on resource allocation
   - `--restructure`: Focus on task sizing and organization
   - No flag: Comprehensive analysis across all areas

3. Load historical data if comparison needed:
   - `--trends --days 30`: Load last 30 days of data
   - `--compare-with PROJECT_NAME`: Load specific project for comparison

4. Set optimization execution mode:
   - `--execute immediate`: Apply safe optimizations automatically
   - `--execute structural --confirm`: Apply with confirmation
   - `--schedule daily`: Set up continuous optimization
   - Default: Analysis and recommendations only

## 2. Load Orchestration Data

1. For each target orchestration:
   - Load EXECUTION-TRACKER.md for progress metrics
   - Load TASK-STATUS-TRACKER.yaml for status data and history
   - Load MASTER-COORDINATION.md for original plan
   - Load TASK-DEPENDENCIES.yaml for dependency graph
   - Load all task files for detailed metadata

2. Parse status history to extract:
   - Time spent in each status per task
   - Status transition timestamps
   - Duration between transitions
   - Agent activity patterns

3. Build dependency graph data structure:
   - Nodes: Tasks
   - Edges: Dependencies (depends_on relationships)
   - Attributes: Task status, duration, assigned agent

4. Calculate baseline metrics:
   - Current velocity (tasks per day)
   - Average task duration
   - Status distribution
   - Agent utilization

5. Load git history if available:
   - Commit frequency per task
   - Code churn metrics
   - Merge patterns

## 3. Detect Bottlenecks

1. Perform critical path analysis:
   - Calculate longest path through dependency graph
   - Identify tasks on critical path
   - For each critical path task:
     - Check if over estimated time
     - Calculate impact (hours of downstream work delayed)
     - Determine severity (percentage over estimate)

2. Analyze queue wait times:
   - For each status (on_hold, qa, todos):
     - Calculate average wait time
     - Identify tasks waiting longest
     - Compare to target thresholds
   - Highlight queues exceeding targets (e.g., QA queue >8h avg)

3. Analyze resource constraints:
   - For each agent:
     - Count active tasks (in_progress)
     - Count queued tasks assigned to them
     - Calculate utilization percentage
   - Identify overloaded agents (>100% utilization)
   - Identify underutilized agents (<50% utilization)

4. Generate bottleneck report with:
   - Critical path tasks blocking downstream work
   - Queue analysis with wait time statistics
   - Resource constraint identification
   - Recommendations for each bottleneck

## 4. Analyze Velocity Metrics

1. Calculate current velocity metrics:
   - Tasks completed per day (last 7 days)
   - Average task duration (actual vs estimated)
   - Status transition times (todos→in_progress, in_progress→qa, qa→completed)

2. Load historical velocity data if available:
   - Compare to last week, last month
   - Identify best performing period
   - Calculate velocity trend (improving/declining, percentage change)

3. Analyze estimation accuracy:
   - For completed tasks, compare actual vs estimated time
   - Calculate accuracy percentage per task type
   - Identify consistently over/under estimated categories

4. Analyze quality metrics:
   - QA rejection rate (qa→in_progress transitions)
   - Average QA iterations per task
   - Rework time percentage

5. Generate velocity report showing:
   - Current vs target velocity
   - Historical comparison
   - Trending issues (declining accuracy, increasing rework)
   - Velocity projection for completion

## 5. Identify Parallelization Opportunities

1. Analyze dependency graph for independent tasks:
   - Identify tasks with no dependencies or met dependencies
   - Identify tasks that don't share resource constraints
   - Calculate potential time savings if parallelized

2. Examine current execution patterns:
   - Calculate actual parallel execution rate (concurrent tasks / total tasks)
   - Compare to theoretical maximum parallelization
   - Identify serialization where parallel execution possible

3. For critical path optimization:
   - Identify tasks on critical path that could be split
   - Find tasks off critical path that could start earlier
   - Calculate optimized critical path duration

4. Detect false dependencies:
   - Check if dependency is truly required (code analysis)
   - Identify dependencies added for sequencing rather than technical need
   - Suggest dependency removals

5. Generate parallelization report with:
   - List of tasks that can run concurrently
   - Potential time savings per opportunity
   - Optimized critical path vs current
   - Recommended dependency changes

## 6. Analyze Resource Allocation

1. Calculate current load per agent:
   - Active tasks count
   - Queued tasks count
   - Utilization percentage (active tasks × avg duration / available time)

2. Analyze task-agent matching:
   - Tasks assigned to appropriate specialist (backend to backend dev)
   - Cross-functional tasks taking longer
   - Agent specialization effectiveness

3. Identify reallocation opportunities:
   - Tasks in overloaded agent's queue that could be reassigned
   - Underutilized agents who could take on more work
   - Tasks suitable for cross-training

4. Calculate optimal resource allocation:
   - Use load-balancing algorithm
   - Consider agent skills and task requirements
   - Maintain reasonable utilization (80-120%)

5. Generate resource rebalancing recommendations:
   - Specific task reassignments
   - Expected impact on velocity
   - Skills/training needed for optimal allocation

## 7. Identify Task Restructuring Needs

1. Find oversized tasks (>6h estimate):
   - List tasks exceeding size threshold
   - Suggest logical split points
   - Estimate time for each split component

2. Find undersized tasks (<1h estimate):
   - List small tasks
   - Suggest grouping into batches
   - Identify maintenance batch candidates

3. Analyze task dependencies for restructuring:
   - Find tasks with misleading dependencies
   - Identify opportunities to merge related tasks
   - Suggest reordering for better flow

4. Generate restructuring recommendations:
   - Task split suggestions with new task definitions
   - Task merge suggestions
   - Dependency corrections

## 8. Analyze Workflow Efficiency

1. Measure status transition delays:
   - Calculate average time in each status
   - Identify transitions exceeding targets
   - Find patterns (e.g., todos→in_progress slow in mornings)

2. Analyze block/unblock patterns:
   - Frequency of moves to on_hold
   - Average time in on_hold
   - Common blocking reasons

3. Analyze QA feedback loop:
   - QA rejection rate
   - Time from qa to feedback to fix
   - Common QA failure reasons

4. Identify process improvements:
   - Add gates to prevent common issues
   - Improve handoff processes
   - Add automation for repetitive tasks
   - Improve communication patterns

5. Generate workflow optimization recommendations:
   - Process changes to reduce delays
   - Automation opportunities
   - Communication improvements
   - Quality gates to add

## 9. Perform Comparative Analysis

1. If `--trends` flag, analyze trends over time:
   - Velocity trend over last N days
   - Quality trend (QA success rate over time)
   - Efficiency indicators over time
   - Generate trend charts

2. If comparing to historical projects:
   - Load similar archived orchestrations
   - Compare velocity, quality, efficiency metrics
   - Identify what worked better/worse
   - Extract applicable learnings

3. Identify patterns across time or projects:
   - Task type performance (features faster than bugs?)
   - Time-of-day patterns (mornings more productive?)
   - Agent specialization patterns
   - Team size effectiveness

4. Generate comparative analysis report with trends and patterns

## 10. Generate Optimization Recommendations

1. Prioritize recommendations by:
   - Impact (time/effort saved)
   - Effort to implement (easy/medium/hard)
   - Risk level (safe/requires-review/structural-change)
   - Confidence level (high/medium/low)

2. For each recommendation, specify:
   - What to change (e.g., "Move TASK-007 to test-developer")
   - Why (e.g., "Backend dev overloaded, test dev underutilized")
   - Expected impact (e.g., "Reduce queue time by 2h")
   - How to implement (specific actions)
   - Risk assessment

3. Group recommendations by category:
   - Immediate actions (safe, high-impact)
   - Structural changes (require confirmation)
   - Long-term improvements (process/workflow changes)

4. Generate executive summary highlighting:
   - Top 3-5 recommendations
   - Total potential impact
   - Key metrics improvement projections

## 11. Execute Optimizations (if --execute flag)

1. If `--execute immediate`:
   - Filter recommendations to safe, high-confidence changes
   - For each safe optimization:
     - Apply task reassignment (update TASK-STATUS-TRACKER.yaml)
     - Remove false dependencies (update task files)
     - Update estimates based on historical data
   - Log all applied changes

2. If `--execute structural --confirm`:
   - For each structural change:
     - Display change details
     - Show expected impact
     - Prompt for confirmation: "Apply this change? [y/n]"
     - If yes, apply change (split tasks, merge tasks, etc.)

3. If `--auto-apply --threshold conservative`:
   - Only apply recommendations meeting conservative criteria (>90% confidence, low risk)
   - Log all applied changes
   - Generate report of what was changed

4. For any applied changes:
   - Update affected task files
   - Update tracking files
   - Move task files if status changed
   - Log to audit trail

## 12. Generate Optimization Report

1. Create comprehensive optimization report with sections:
   - Executive Summary (key findings and top recommendations)
   - Current State Analysis (metrics, bottlenecks, resource utilization)
   - Identified Opportunities (categorized recommendations)
   - Expected Impact (projected improvements if recommendations applied)
   - Implementation Timeline (sequence and priority)

2. Include visualizations if requested:
   - Velocity charts
   - Resource utilization graphs
   - Critical path diagrams
   - Before/after comparisons

3. If `--report detailed` flag:
   - Include all analysis details
   - Full data tables
   - Complete recommendation list
   - Supporting evidence for each recommendation

4. If `--summary executive` flag:
   - High-level summary only
   - Key metrics and improvements
   - Top recommendations
   - ROI projections

5. Save report to file:
   - Location: `/task-orchestration/{date}/{project}/.optimization-reports/`
   - Filename: `optimization-report-{timestamp}.md`

## 13. Set Up Continuous Optimization (if --schedule flag)

1. If `--schedule daily`:
   - Create scheduled optimization task
   - Configure to run daily at specified time
   - Set up automated monitoring:
     - Velocity tracking
     - Bottleneck detection
     - Resource utilization alerts

2. If `--schedule weekly`:
   - Create weekly optimization task
   - Configure for deeper analysis
   - Generate trend reports

3. Configure alert thresholds:
   - Velocity drops below target
   - Queue wait time exceeds threshold
   - Resource utilization imbalanced
   - Quality metrics decline

4. Set up notification system for optimization alerts

## 14. Perform Simulation (if --simulate flag)

1. If `--simulate "add agent:dev-fullstack"`:
   - Load current orchestration state
   - Add simulated agent to resource pool
   - Recalculate optimal task allocation
   - Project new velocity and completion time

2. Run what-if analysis:
   - Calculate projected improvements (velocity increase, critical path reduction, queue time reduction)
   - Calculate resource utilization changes
   - Estimate ROI (cost vs benefit)

3. Generate simulation report with:
   - Scenario description
   - Projected improvements (before/after metrics)
   - Resource utilization changes
   - ROI analysis
   - Recommendation (whether to implement change)

4. Support multiple simulation scenarios

## 15. Display Results and Next Steps

1. Display optimization summary to terminal:
   - Number of bottlenecks identified
   - Number of recommendations generated
   - Potential time savings
   - Key metrics improvement projections

2. Highlight immediate actions:
   - Changes that can be applied now
   - Quick wins for velocity improvement

3. Suggest next steps:
   - Review detailed report: `cat /path/to/report.md`
   - Apply optimizations: `/orchestration/optimize --execute`
   - Set up monitoring: `/orchestration/optimize --schedule daily`

4. If optimizations were applied, show summary of changes made

5. Return success status

</detailed_sequence_steps>

</task>

