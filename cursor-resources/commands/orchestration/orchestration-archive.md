<task name="Orchestration Archive">

<task_objective>
Archive completed orchestrations while preserving valuable data, metrics, and lessons learned for future reference. The workflow performs comprehensive analysis of finished orchestrations, extracts performance metrics and insights, creates structured archive in `/archived-orchestrations/YYYY/QN/MM_DD_YYYY_project_name/` with analytics reports, visualizations, and git correlation data, and generates searchable knowledge base entries and reusable templates.
</task_objective>

<detailed_sequence_steps>
# Orchestration Archive - Detailed Sequence of Steps

## 1. Identify Orchestrations for Archival

1. Scan `/task-orchestration/` directory for completed orchestrations if no specific target specified

2. For each orchestration, check completion status:
   - All tasks in completed status
   - No active tasks (in_progress, qa, todos)
   - No pending dependencies

3. If specific orchestration specified (`--date MM_DD_YYYY --project PROJECT_NAME`), validate it exists

4. Check age of completed orchestration (default: completed >7 days ago eligible for archive)

5. If `--all-completed --since "last month"` specified, gather all matching orchestrations

6. Display list of eligible orchestrations for user confirmation

## 2. Perform Pre-Archive Analysis

1. Load all orchestration data files:
   - MASTER-COORDINATION.md
   - EXECUTION-TRACKER.md
   - TASK-STATUS-TRACKER.yaml
   - All task files from all status folders
   - TASK-DEPENDENCIES.yaml

2. Calculate completion metrics:
   - Total tasks count
   - Actual duration (start date to final completion date)
   - Estimated duration (from original plan)
   - Duration variance (actual vs estimated, percentage)

3. Compute velocity metrics:
   - Average tasks completed per day
   - Peak velocity day
   - Velocity trend over time
   - Final velocity

4. Calculate quality scores:
   - Average QA iterations per task
   - First-pass QA success rate percentage
   - Number of bugs found post-completion
   - Test coverage achieved

5. Check for outstanding items:
   - Any tasks not in completed status
   - Open git branches not merged
   - Uncommitted changes
   - Incomplete documentation

6. Generate pre-archive validation report showing completeness and readiness

7. If not ready (has active tasks or pending items), warn user and offer to wait or archive anyway with flag

## 3. Extract Performance Data

1. Extract task completion times for each task:
   - Time in each status (todos, in_progress, qa)
   - Total time from creation to completion
   - Actual time vs estimated time
   - Estimation accuracy percentage per task

2. Calculate velocity data:
   - Daily task completion counts
   - Weekly velocity averages
   - Velocity trends and patterns
   - Acceleration/deceleration points

3. Compile quality metrics:
   - QA pass/fail rates per task
   - Rework time per task
   - Defect density
   - Test coverage statistics

4. Analyze resource utilization:
   - Tasks per agent
   - Agent average completion times
   - Agent efficiency scores
   - Cross-functional task performance

5. Map dependency patterns:
   - Critical path actual duration
   - Blocking task frequency
   - Parallel execution achieved vs possible
   - Dependency bottlenecks

6. Correlate with git history:
   - Commits per task
   - Lines of code changed per task
   - Commit frequency patterns
   - Branch merge timeline

7. Save all metrics to METRICS-REPORT.json for programmatic access

## 4. Extract Lessons Learned

1. Identify what worked well by analyzing:
   - Tasks completed faster than estimated
   - High QA success rates
   - Effective parallel execution
   - Successful patterns (e.g., early dependency identification)

2. Identify pain points by analyzing:
   - Tasks significantly over estimate
   - High QA failure rates
   - Frequent status reversals (qa → in_progress)
   - Long-duration blocks (on_hold status)
   - External dependency delays

3. Extract process improvements:
   - Estimation patterns (which task types consistently under/over estimated)
   - Optimal team size and composition
   - Effective workflows that reduced bottlenecks
   - Communication patterns that prevented issues

4. Document technical insights:
   - Reusable code patterns discovered
   - Architecture decisions that worked well
   - Technology choices that helped/hindered
   - Integration approaches that succeeded

5. Calculate estimation insights by task type:
   - Security tasks: X% underestimated
   - UI tasks with new libraries: Y% longer
   - Integration tasks: Z% buffer needed

6. Generate LESSONS-LEARNED.md with structured sections for each category

## 5. Create Archive Structure

1. Determine archive location:
   - Extract year (YYYY) and quarter (Q1-Q4) from orchestration date
   - Create path: `/archived-orchestrations/YYYY/QN/MM_DD_YYYY_project_name/`

2. Create archive directory structure:
   - `original-files/` (copy of all original orchestration files)
   - `analytics/` (generated charts and visualizations)
   - `git-correlation/` (git-task mapping data)

3. Copy original files preserving structure:
   - MASTER-COORDINATION.md
   - EXECUTION-TRACKER.md
   - TASK-STATUS-TRACKER.yaml
   - All task files from `tasks/completed/` and other status folders

4. Generate analytics files:
   - `velocity-chart.png` (if visualization tools available)
   - `dependency-graph.svg` (dependency visualization)
   - `timeline-visualization.html` (interactive timeline)

5. Create git correlation files:
   - `commit-task-mapping.json` (map of commits to tasks)
   - `branch-analysis.md` (branch strategy and merge patterns)

## 6. Generate Archive Summary Documents

1. Create ARCHIVE-SUMMARY.md with:
   - Project overview (name, dates, objectives)
   - Key metrics summary (tasks, duration, velocity, quality)
   - Major achievements and deliverables
   - Team composition and roles
   - Final status and outcome
   - Links to detailed reports

2. Create LESSONS-LEARNED.md (from step 4) with:
   - What Worked Well section
   - Pain Points section
   - Process Improvements section
   - Technical Insights section
   - Estimation Insights section
   - Recommendations for similar future projects

3. Generate METRICS-REPORT.json with complete structured data:
   - All performance metrics
   - Task-by-task data
   - Agent performance data
   - Timeline data
   - Comparison data with similar projects

4. If `--format template` specified, create template files:
   - Task structure template
   - Dependency pattern template
   - Workflow template

## 7. Perform Historical Correlation

1. Search archived orchestrations for similar projects using:
   - Task type similarity
   - Technology stack keywords
   - Team size and composition
   - Project duration and complexity

2. Calculate similarity scores (0-100%) with each past project

3. For similar projects, compare metrics:
   - Velocity comparison
   - Duration comparison
   - Quality metrics comparison
   - Estimation accuracy comparison

4. Identify best and worst performing similar projects

5. Extract applicable learning from similar projects:
   - Patterns that could have been reused
   - Pitfalls that could have been avoided
   - Estimation baselines from similar work

6. Generate correlation analysis section in ARCHIVE-SUMMARY.md

7. Tag archive with keywords for future searchability

## 8. Validate Archive Completeness

1. Verify all required files exist:
   - ARCHIVE-SUMMARY.md
   - LESSONS-LEARNED.md
   - METRICS-REPORT.json
   - All original orchestration files

2. Check data integrity:
   - No corrupted files
   - JSON files are valid
   - Timeline consistency (no gaps or overlaps)
   - Dependency graph is valid
   - Metrics calculations are correct

3. Verify task count consistency across all files

4. Ensure all git commit references are valid and accessible

5. Check that archive location follows naming convention

6. Calculate archive completeness score (percentage)

7. Generate validation report showing any missing or inconsistent data

## 9. Finalize and Index

1. Mark archive as read-only (file permissions)

2. Update archive index file (`/archived-orchestrations/INDEX.yaml`) with:
   - Archive location
   - Project name and date
   - Key metrics summary
   - Tags and keywords
   - Similarity references to other projects

3. If `--knowledge-base` flag specified, create knowledge base entries:
   - Add lessons to searchable KB
   - Tag technical insights
   - Link to reusable patterns

4. If `--dashboard` flag specified, update metrics dashboard with this archive's data

5. If `--notify` specified, send archive completion notification with key insights

6. Log archival operation to system audit log

7. Remove original orchestration from active `/task-orchestration/` directory (or move to `.archived/` staging)

8. Display archive location and quick access commands for future reference

## 10. Optional Post-Archive Actions

1. If `--create-template TEMPLATE_NAME` specified:
   - Extract successful patterns
   - Create reusable orchestration template
   - Save to `/orchestration-templates/` directory

2. If `--predict similar_to:PROJECT_NAME` specified:
   - Use archived data to generate predictions for new similar project
   - Estimate duration, velocity, and resource needs
   - Identify likely challenges

3. If `--compare ARCHIVE1 ARCHIVE2` specified:
   - Load both archives
   - Generate side-by-side comparison
   - Identify differences and improvements

4. If `--extract-template` specified:
   - Create orchestration template from this successful archive
   - Include task structure, dependencies, and workflow patterns

</detailed_sequence_steps>

</task>

