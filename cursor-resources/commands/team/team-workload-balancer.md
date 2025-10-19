<task name="Team Workload Balancer">

<task_objective>
Analyze and optimize team workload distribution with skill matching and capacity planning. Assess current workload, match skills to tasks, plan capacity, integrate performance data, and generate optimal task assignments to maximize team efficiency while preventing burnout and ensuring equitable workload distribution.
</task_objective>

<detailed_sequence_steps>
# Team Workload Balancer - Detailed Sequence of Steps

## 1. Current Team Context Analysis

1. Count active team members using `git log --format='%ae' --since='1 month ago' | sort -u | wc -l`
2. Query Linear MCP for current sprint tasks and assignments
3. Analyze recent activity with `git log --oneline --since='1 week ago' | wc -l` commits in last week
4. Review capacity metrics by analyzing team velocity and individual contribution patterns
5. Use $ARGUMENTS to focus on: current-workload, skill-matching, capacity-planning, or assignment-optimization

## 2. Current Workload Assessment

1. Analyze task distribution across team members
2. Evaluate individual capacity and availability
3. Assess deadline pressure for current assignments
4. Identify overloaded team members at risk of burnout

## 3. Skill Matching Analysis

1. Map team member expertise to required task skills
2. Identify skill gaps where tasks require unavailable expertise
3. Assess learning opportunities for skill development
4. Optimize skill utilization to leverage team strengths

## 4. Capacity Planning

1. Calculate available capacity per team member
2. Project future workload based on backlog
3. Plan skill development time allocation
4. Optimize resource allocation for upcoming work

## 5. Performance Integration

1. Analyze historical performance data per team member
2. Identify productivity patterns and peak performance times
3. Assess collaboration effectiveness in team dynamics
4. Factor in availability constraints (PTO, meetings, other commitments)

## 6. Assignment Optimization

1. Generate optimal task assignments based on skills and capacity
2. Balance workload distribution for equity
3. Maximize skill utilization to prevent underutilization
4. Minimize bottlenecks in workflow

## 7. Risk Mitigation

1. Identify single points of failure in task assignments
2. Plan cross-training to distribute critical knowledge
3. Assess knowledge distribution across team
4. Ensure backup coverage for critical skills

## 8. Advanced Features

1. Predictive workload modeling for future sprints
2. Skill gap analysis to inform hiring decisions
3. Burnout prevention through workload monitoring
4. Performance-based assignment algorithms
5. Dynamic rebalancing recommendations as conditions change

## 9. Quality Metrics

1. Workload distribution equity measurement
2. Skill utilization efficiency tracking
3. Team satisfaction indicators monitoring
4. Delivery predictability measures

**Allowed Tools**: Read, Bash, Grep, Glob
**Model**: sonnet
**Argument Hint**: [analysis-type] | --current-workload | --skill-matching | --capacity-planning | --assignment-optimization

</detailed_sequence_steps>

</task>
