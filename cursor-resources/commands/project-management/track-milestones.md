<task name="Track Milestones">

<task_objective>
Track and analyze project milestone progress with predictive analytics. This workflow takes time period as input ($ARGUMENTS or defaults to current sprint/quarter), analyzes project activity and milestone data, and outputs a comprehensive milestone tracking report with progress indicators, predictive analytics, risk assessments, and actionable recommendations for milestone delivery optimization.
</task_objective>

<detailed_sequence_steps>
# Track Milestones - Detailed Sequence of Steps

## 1. Gather Project Context

1. Determine time period from $ARGUMENTS or default to current sprint/quarter.

2. Check project activity: !`git log --oneline --since="30 days ago" | wc -l` commits.

3. Review active branches: !`git branch -r | wc -l` remote branches.

4. Check recent releases: !`git tag -l --sort=-creatordate | head -5`.

5. Access milestone data from @.github/milestones/ or Linear integration.

## 2. Analyze Milestone Progress

1. Identify current milestones within specified time period.

2. Calculate completion rates for each milestone.

3. Track velocity trends over time.

4. Generate burn-down analysis for active milestones.

## 3. Perform Critical Path Analysis

1. Identify critical path items for each milestone.

2. Map dependencies between milestone tasks.

3. Assess risk factors and blockers.

4. Evaluate impact of delays on overall timeline.

## 4. Generate Predictive Analytics

1. Calculate completion date predictions based on current velocity.

2. Provide confidence intervals for delivery dates.

3. Create risk-adjusted timeline recommendations.

4. Develop scenario planning (what-if analysis).

## 5. Assess Resource Allocation

1. Analyze team capacity utilization.

2. Identify resource allocation patterns.

3. Recommend resource allocation optimization.

4. Evaluate team workload distribution.

## 6. Evaluate Health Indicators

1. Measure schedule adherence metrics.

2. Identify and categorize blockers with impact assessment.

3. Analyze quality vs delivery balance.

4. Track team capacity against commitments.

## 7. Compile Milestone Dashboard

1. Create visual progress indicators for each milestone.

2. Include predictive analytics and completion forecasts.

3. Add risk assessments with mitigation strategies.

4. Provide actionable recommendations.

## 8. Generate Comprehensive Report

1. Organize all analysis into interactive milestone dashboard.

2. Include visual charts and progress indicators.

3. Present predictive analytics with confidence levels.

4. Provide prioritized recommendations for milestone delivery optimization.

5. Output report in accessible format.

</detailed_sequence_steps>

</task>

