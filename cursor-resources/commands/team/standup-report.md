<task name="Standup Report">

<task_objective>
Generate comprehensive daily standup reports with team activity analysis and progress tracking. Analyze git activity, Linear task progress, pull request activity, team collaboration patterns, and identify blockers to provide actionable insights for team coordination and meeting efficiency optimization.
</task_objective>

<detailed_sequence_steps>
# Standup Report - Detailed Sequence of Steps

## 1. Current Standup Context Analysis

1. Verify Linear MCP server status and task synchronization connectivity
2. Determine time range for analysis using `date -d 'yesterday' '+%Y-%m-%d'` to `date '+%Y-%m-%d'`
3. Count active contributors using `git log --format='%ae' --since='1 day ago' | sort -u | wc -l`
4. Get repository context with `gh repo view --json nameWithOwner -q .nameWithOwner`
5. Use $ARGUMENTS to specify time range: yesterday, last-24h, since-friday, or custom-range

## 2. Git Activity Analysis

1. Extract commit activity for the specified time period
2. Analyze code changes by reviewing file modifications and line changes
3. Identify contributors and their contribution patterns
4. Assess impact scope of changes across the codebase

## 3. Linear Task Progress

1. Query Linear MCP for task updates during the time period
2. Analyze completion status of tasks and stories
3. Track sprint progress toward goals and milestones
4. Identify blockers and impediments in task workflow

## 4. Pull Request Activity

1. Review PR submissions during the time period
2. Analyze review activity and reviewer participation
3. Track merge status and deployment readiness
4. Assess collaboration patterns through PR interactions

## 5. Team Collaboration

1. Analyze pair programming activities and sessions
2. Evaluate code review participation across team members
3. Track knowledge sharing activities and documentation updates
4. Assess mentorship activities and learning opportunities

## 6. Progress Tracking

1. Calculate velocity metrics based on completed work
2. Assess goal completion against sprint objectives
3. Identify trends in team performance and productivity
4. Predict sprint outcomes based on current progress

## 7. Blockers & Impediments

1. Identify stuck tasks that haven't progressed
2. Analyze delay patterns and common obstacles
3. Assess resource needs for unblocking tasks
4. Recommend solutions for identified impediments

## 8. Advanced Features

1. Automated activity categorization by type and impact
2. Progress visualization with charts and graphs
3. Trend analysis across multiple time periods
4. Predictive insights for sprint completion
5. Team health scoring based on activity patterns

## 9. Report Quality Assurance

1. Generate actionable insights from analyzed data
2. Provide clear progress indicators with metrics
3. Highlight obstacle identification and impact
4. Support team coordination with assignment clarity
5. Optimize meeting efficiency with pre-prepared data

**Allowed Tools**: Read, Bash, Glob, Grep
**Model**: sonnet
**Argument Hint**: [time-range] | --yesterday | --last-24h | --since-friday | --custom-range

</detailed_sequence_steps>

</task>
