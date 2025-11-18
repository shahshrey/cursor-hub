<task name="Estimate Assistant">

<task_objective>
Generate accurate task estimates using historical data, complexity analysis, and team velocity metrics. Analyze historical patterns, assess complexity, integrate team velocity, model confidence intervals, calibrate estimates, and factor in context to provide data-driven estimates with confidence levels and accuracy tracking.
</task_objective>

<detailed_sequence_steps>
# Estimate Assistant - Detailed Sequence of Steps

## 1. Current Estimation Context Analysis

1. Calculate team velocity using `git log --oneline --since='1 month ago' | wc -l` commits in last month
2. Analyze historical data from git history for similar task completion patterns
3. Assess code complexity with `find . -name "*.js" -o -name "*.ts" -o -name "*.py" | head -5 | xargs wc -l`
4. Query Linear for sprint tracking, task completion times, and estimate accuracy
5. Use $ARGUMENTS for: historical, complexity-analysis, team-velocity, or confidence-intervals

## 2. Historical Pattern Analysis

1. Analyze similar past tasks to find comparable work
2. Extract completion time patterns from git history
3. Identify velocity trends over time
4. Calculate accuracy metrics by comparing past estimates vs actuals

## 3. Complexity Assessment

1. Evaluate technical complexity (algorithms, integrations, unknowns)
2. Assess scope uncertainty and requirement clarity
3. Identify risk factors (dependencies, new technology, team unfamiliarity)
4. Estimate effort distribution across different phases

## 4. Team Velocity Integration

1. Calculate sprint velocity from recent performance
2. Analyze individual capacity and availability
3. Assess team expertise in relevant technologies
4. Factor in availability constraints (PTO, meetings, other commitments)

## 5. Confidence Modeling

1. Generate confidence intervals (e.g., 50%, 80%, 95%)
2. Assess estimation uncertainty based on information quality
3. Identify risk factors affecting confidence
4. Provide accuracy ranges (best case, likely, worst case)

## 6. Calibration Analysis

1. Compare past estimates vs actuals for accuracy
2. Identify systematic biases (optimism, pessimism)
3. Calculate estimation accuracy percentage
4. Improve prediction models based on historical calibration

## 7. Context Integration

1. Factor in current sprint load and capacity
2. Assess team familiarity with similar work
3. Evaluate external dependencies impact
4. Integrate deadline pressure effects

## 8. Advanced Features

1. Multi-point estimation (three-point: optimistic, likely, pessimistic)
2. Monte Carlo simulation for probabilistic estimates
3. Reference class forecasting using similar past projects
4. Estimation accuracy tracking over time
5. Bias correction algorithms

## 9. Quality Metrics

1. Estimation confidence levels with statistical basis
2. Accuracy historical trends tracking
3. Velocity stability measurement
4. Complexity correlation analysis

**Allowed Tools**: Read, Bash, Glob, Grep
**Model**: sonnet
**Argument Hint**: [task-description] | --historical | --complexity-analysis | --team-velocity | --confidence-intervals

</detailed_sequence_steps>

</task>
