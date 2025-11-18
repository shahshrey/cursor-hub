<task name="Team Velocity Tracker">

<task_objective>
Track and analyze team velocity with predictive forecasting and performance optimization recommendations. Analyze historical velocity patterns, assess consistency, integrate capacity factors, and generate predictive forecasts to enable sustainable performance and accurate sprint planning.
</task_objective>

<detailed_sequence_steps>
# Team Velocity Tracker - Detailed Sequence of Steps

## 1. Current Velocity Context Analysis

1. Calculate sprint velocity using `git log --oneline --since='2 weeks ago' | wc -l` for commits per current sprint
2. Analyze team consistency by reviewing velocity stability across recent sprints
3. Query Linear tracking for sprint point completion rates and story delivery metrics
4. Assess capacity factors including team size changes, availability, and skill development impact
5. Use $ARGUMENTS to focus on: sprint, monthly, quarterly, or trend-analysis

## 2. Historical Velocity Analysis

1. Extract sprint completion data from Linear and git history
2. Analyze story point delivery across multiple sprints
3. Calculate team throughput in tasks and points per sprint
4. Identify performance patterns and velocity trends

## 3. Consistency Assessment

1. Measure velocity stability across sprints using statistical analysis
2. Identify variance patterns and their causes
3. Assess predictability factors for planning accuracy
4. Evaluate planning accuracy by comparing estimates vs actuals

## 4. Capacity Correlation

1. Analyze team size impact on velocity
2. Assess skill level effects on throughput
3. Evaluate availability constraints (vacations, holidays, part-time)
4. Measure external factor influence (dependencies, blockers)

## 5. Predictive Forecasting

1. Generate velocity projections for upcoming sprints
2. Predict sprint outcomes based on historical data
3. Estimate delivery timelines for backlog items
4. Calculate confidence intervals for predictions

## 6. Performance Optimization

1. Identify improvement opportunities in workflow
2. Recommend capacity adjustments based on analysis
3. Suggest process enhancements to increase velocity
4. Optimize team composition for better throughput

## 7. Quality Integration

1. Correlate velocity with quality metrics (bugs, technical debt)
2. Assess technical debt impact on sustainable velocity
3. Evaluate sustainable pace to prevent burnout
4. Measure team satisfaction in relation to velocity

## 8. Advanced Features

1. Monte Carlo forecasting for probabilistic predictions
2. Velocity trend decomposition to understand components
3. Capacity planning optimization for resource allocation
4. Performance anomaly detection to identify outliers
5. Sustainable pace analysis for long-term health

## 9. Predictive Analytics

1. Sprint outcome predictions with confidence levels
2. Delivery timeline forecasting for planning
3. Capacity requirement planning for future sprints
4. Performance trend analysis for strategic decisions

**Allowed Tools**: Read, Bash, Glob, Grep
**Model**: sonnet
**Argument Hint**: [analysis-period] | --sprint | --monthly | --quarterly | --trend-analysis

</detailed_sequence_steps>

</task>
