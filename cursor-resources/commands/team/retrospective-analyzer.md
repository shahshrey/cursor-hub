<task name="Retrospective Analyzer">

<task_objective>
Analyze team retrospectives with quantitative metrics and actionable insights generation. Evaluate sprint performance, assess team collaboration, analyze process effectiveness, review quality metrics, evaluate individual contributions, and generate actionable insights to drive continuous improvement with data-driven recommendations.
</task_objective>

<detailed_sequence_steps>
# Retrospective Analyzer - Detailed Sequence of Steps

## 1. Current Retrospective Context Analysis

1. Count commits in recent sprint using `git log --oneline --since='2 weeks ago' | wc -l`
2. Analyze recent collaboration patterns and productivity metrics from team activity
3. Query Linear MCP for current sprint data and completion metrics
4. Review previous retrospectives for historical data and improvement tracking
5. Use $ARGUMENTS to specify: sprint-identifier, metrics, insights, action-items, or trends

## 2. Sprint Performance Analysis

1. Analyze velocity trends across multiple sprints
2. Calculate completion rates for committed work
3. Measure cycle time metrics from start to done
4. Track quality indicators (bug rates, test coverage)

## 3. Team Collaboration Assessment

1. Evaluate communication patterns in code reviews and discussions
2. Assess code review effectiveness and turnaround time
3. Measure knowledge sharing through documentation and pairing
4. Analyze pair programming impact on quality and velocity

## 4. Process Effectiveness

1. Assess meeting efficiency (time spent vs value)
2. Evaluate planning accuracy (estimates vs actuals)
3. Analyze impediment resolution time
4. Review workflow optimization opportunities

## 5. Quality Metrics

1. Analyze bug rates and defect density
2. Track technical debt accumulation over time
3. Assess code review quality through metrics
4. Evaluate testing effectiveness and coverage

## 6. Individual Contribution

1. Evaluate workload distribution across team members
2. Assess skill development and learning progress
3. Track mentorship activities and knowledge transfer
4. Measure cross-training progress and skill breadth

## 7. Actionable Insights Generation

1. Identify improvement opportunities based on data
2. Prioritize action items by impact and effort
3. Track progress on previous action items
4. Measure impact of implemented improvements

## 8. Advanced Features

1. Trend analysis across multiple sprints
2. Predictive performance modeling for future sprints
3. Team satisfaction correlation with metrics
4. Continuous improvement tracking over time

## 9. Insight Quality

1. Data-driven recommendations backed by metrics
2. Quantified improvement potential with estimates
3. Implementation feasibility assessment
4. Success measurement criteria definition

**Allowed Tools**: Read, Write, Bash, Glob
**Model**: sonnet
**Argument Hint**: [sprint-identifier] | --metrics | --insights | --action-items | --trends

</detailed_sequence_steps>

</task>
