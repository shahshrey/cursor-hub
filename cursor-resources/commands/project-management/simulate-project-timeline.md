<task name="Simulate Project Timeline">

<task_objective>
Simulate project outcomes with variable modeling, risk assessment, and resource optimization. This workflow takes project type and optional parameters as input ($ARGUMENTS including duration, team-size, risk-level), processes comprehensive scenario modeling with multiple variables and risk factors, and outputs timeline predictions with confidence intervals, critical path analysis, risk-adjusted resource recommendations, and Monte Carlo simulation results.
</task_objective>

<detailed_sequence_steps>
# Simulate Project Timeline - Detailed Sequence of Steps

## 1. Gather Project Context

1. Determine project type from $ARGUMENTS or analyze codebase.

2. Check team capacity: !`git shortlog -sn --since="90 days ago" | wc -l` contributors.

3. Analyze velocity data: !`git log --online --since="30 days ago" | wc -l` commits/month.

4. Access risk indicators from @RISKS.md or project documentation.

5. Parse optional flags: --duration, --team-size, --risk-level.

## 2. Define Simulation Variables

1. Identify team capacity variables:
   - Team size
   - Skill level distribution
   - Availability and utilization rates.

2. Define project complexity variables:
   - Technical complexity
   - Integration requirements
   - Unknown factors.

3. Establish external dependency variables:
   - Third-party integrations
   - External team dependencies
   - Resource availability.

## 3. Model Baseline Scenario

1. Create baseline timeline using historical velocity.

2. Define baseline resource allocation.

3. Establish baseline assumptions.

4. Calculate baseline completion date.

## 4. Generate Alternative Scenarios

1. **Optimistic Scenario**:
   - Ideal conditions
   - Maximum velocity
   - No major blockers
   - Best-case resource availability.

2. **Pessimistic Scenario**:
   - Adverse conditions
   - Reduced velocity
   - Major blockers anticipated
   - Resource constraints.

3. **Disruption Scenario**:
   - Unexpected events
   - Team changes
   - Technical challenges
   - External delays.

## 5. Conduct Risk Assessment

1. Identify technical risks:
   - Technology uncertainties
   - Integration challenges
   - Performance concerns.

2. Assess resource risks:
   - Team availability
   - Skill gaps
   - Turnover potential.

3. Evaluate business risks:
   - Scope changes
   - Priority shifts
   - Budget constraints.

4. Consider external risks:
   - Third-party dependencies
   - Market changes
   - Regulatory factors.

## 6. Perform Critical Path Analysis

1. Identify all project tasks and dependencies.

2. Map dependency relationships.

3. Calculate critical path through project.

4. Identify critical path items with zero slack.

5. Analyze impact of delays on critical path.

## 7. Optimize Resource Allocation

1. Analyze current resource distribution.

2. Identify resource constraints and bottlenecks.

3. Recommend optimal team allocation.

4. Suggest budget distribution strategies.

5. Calculate timeline buffers for risk mitigation.

## 8. Run Monte Carlo Simulation

1. Define probability distributions for key variables.

2. Run multiple iterations (1000+ simulations).

3. Generate probability distribution of outcomes.

4. Calculate confidence intervals for completion dates.

5. Identify most likely outcome ranges.

## 9. Define Decision Points

1. Identify milestone gates for evaluation.

2. Define adaptation triggers:
   - Velocity thresholds
   - Risk activation points
   - Resource adjustment triggers.

3. Establish contingency activation criteria.

4. Document decision-making framework.

## 10. Generate Timeline Predictions

1. Compile timeline ranges for each scenario.

2. Provide confidence intervals (50%, 75%, 90%).

3. Calculate expected completion dates.

4. Include probability distributions.

## 11. Create Optimization Recommendations

1. Provide multi-objective optimization for:
   - Time efficiency
   - Quality standards
   - Resource utilization
   - Budget constraints.

2. Suggest trade-offs and alternatives.

3. Recommend early warning indicators.

## 12. Compile Comprehensive Report

1. Structure simulation results with:
   - Executive Summary
   - Scenario Comparisons
   - Timeline Predictions
   - Critical Path Analysis
   - Risk Assessment
   - Resource Recommendations
   - Monte Carlo Results
   - Decision Points
   - Early Warning Indicators.

2. Include visualizations:
   - Timeline charts
   - Probability distributions
   - Resource allocation diagrams
   - Critical path diagrams.

3. Format as detailed markdown document.

## 13. Output and Validation

1. Generate simulation report.

2. Validate calculations and assumptions.

3. Provide interactive elements if possible.

4. Display key findings and recommendations to user.

</detailed_sequence_steps>

</task>

