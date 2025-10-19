<task name="Check Project Health">

<task_objective>
Analyze overall project health and generate comprehensive metrics report. This workflow takes evaluation period as input ($ARGUMENTS or defaults to last 30 days), analyzes code quality, delivery performance, team health, and dependency health dimensions, and outputs a detailed markdown report with health scores, metrics tables, trend analysis, risk assessment, and prioritized actionable recommendations.
</task_objective>

<detailed_sequence_steps>
# Check Project Health - Detailed Sequence of Steps

## 1. Gather Project Context

1. Determine evaluation period from $ARGUMENTS or default to last 30 days.

2. Check git activity: !`git log --oneline --since="30 days ago" | wc -l`.

3. Review contributors: !`git shortlog -sn --since="30 days ago" | head -5`.

4. Check branch status: !`git branch -r | wc -l` remote branches.

5. Analyze code changes: !`git diff --stat HEAD~30 2>/dev/null || echo "Not enough history"`.

6. Access dependencies from @package.json or @requirements.txt or @Cargo.toml (if exists).

## 2. Analyze Code Quality Metrics

1. Run test suite and capture coverage results.

2. Analyze code complexity using appropriate tools.

3. Run security audit (npm audit or equivalent).

4. Identify technical debt indicators.

5. Calculate code quality trends over evaluation period.

## 3. Assess Delivery Performance

1. Analyze sprint velocity trends (if task management tools available).

2. Calculate cycle time for completed work.

3. Determine bug vs feature ratio.

4. Measure on-time delivery metrics.

5. Track deployment frequency.

## 4. Evaluate Team Health Indicators

1. Measure PR review turnaround time.

2. Analyze commit frequency distribution.

3. Assess work distribution balance across team.

4. Identify knowledge concentration risk.

5. Evaluate collaboration patterns.

## 5. Assess Dependency Health

1. Check for outdated packages.

2. Run security audit on dependencies.

3. Perform license compliance check.

4. Identify external service dependencies.

5. Evaluate dependency update frequency.

## 6. Calculate Health Scores

1. Calculate code quality score (0-100).

2. Calculate delivery performance score (0-100).

3. Calculate team health score (0-100).

4. Calculate dependency health score (0-100).

5. Compute overall health score (weighted average).

## 7. Generate Executive Summary

1. Identify key findings from all health dimensions.

2. Highlight critical issues requiring immediate attention.

3. Summarize overall project status.

4. Provide color-coded health status indicator.

## 8. Create Detailed Metrics Tables

1. Organize metrics by health dimension.

2. Include current values vs target values.

3. Add trend indicators (improving/declining/stable).

4. Provide context for each metric.

## 9. Perform Trend Analysis

1. Analyze trends over evaluation period.

2. Identify patterns and correlations.

3. Assess risk trajectory.

4. Project future health trends.

## 10. Generate Actionable Recommendations

1. Identify improvement opportunities.

2. Prioritize recommendations by impact and effort.

3. Provide specific action items.

4. Include success criteria for recommendations.

## 11. Compile Comprehensive Report

1. Structure report with clear sections:
   - Executive Summary
   - Overall Health Score
   - Code Quality Analysis
   - Delivery Performance
   - Team Health
   - Dependency Health
   - Trend Analysis
   - Risk Assessment
   - Recommendations.

2. Include charts and visual indicators.

3. Add metrics tables with current vs target.

4. Format as markdown document.

## 12. Output and Validation

1. Generate markdown report file.

2. Validate report completeness.

3. Ensure all metrics are accurately represented.

4. Display report to user with key highlights.

</detailed_sequence_steps>

</task>

