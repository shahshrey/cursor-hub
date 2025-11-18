<task name="Issue Triage">

<task_objective>
Intelligently triage and prioritize issues with automatic categorization, prioritization, and team assignment. Analyze issues, classify by category, assess priority, route to appropriate teams, manage labels, and assign SLAs to ensure consistent and efficient issue handling with balanced workload distribution.
</task_objective>

<detailed_sequence_steps>
# Issue Triage - Detailed Sequence of Steps

## 1. Current Triage Context Analysis

1. Get repository context using `gh repo view --json nameWithOwner -q .nameWithOwner`
2. Count open issues with `gh issue list --state open --limit 1 --json number | jq length`
3. Query Linear MCP for available teams and project assignments for routing
4. Assess triage backlog volume and age of untriaged issues
5. Use $ARGUMENTS to focus on: github-issues, linear-tasks, priority-analysis, or team-assignment

## 2. Issue Analysis

1. Extract issue metadata (title, description, labels, author)
2. Analyze content patterns to understand issue type
3. Assess severity indicators from description and impact
4. Evaluate impact scope (single user, many users, critical system)

## 3. Category Classification

1. Identify issue type: bug, feature request, documentation, question
2. Assess complexity level (trivial, simple, moderate, complex)
3. Determine urgency factors (production down, blocking work, nice-to-have)
4. Categorize by affected system component

## 4. Priority Assessment

1. Calculate priority score using multiple factors
2. Consider severity of issue impact
3. Assess business value and user impact
4. Factor in effort estimate and ROI

## 5. Team Routing

1. Match issue skills required to team expertise
2. Balance workload distribution across teams
3. Consider current sprint capacity and availability
4. Route to appropriate team based on component ownership

## 6. Label Management

1. Apply consistent labeling scheme (type, priority, component)
2. Maintain taxonomy standards across repository
3. Enable filtering and reporting through proper labeling
4. Remove or correct inconsistent labels

## 7. SLA Assignment

1. Set response time expectations based on priority
2. Establish resolution targets for different issue types
3. Track performance metrics against SLAs
4. Escalate issues approaching SLA breach

## 8. Advanced Features

1. Automated severity detection from text analysis
2. Intelligent team matching using skill profiles
3. Workload balancing algorithms
4. SLA monitoring with alerts
5. Escalation workflows for critical issues

## 9. Quality Assurance

1. Consistency validation across similar issues
2. Triage accuracy tracking and improvement
3. Team satisfaction monitoring with assignments
4. Process optimization feedback loop

**Allowed Tools**: Read, Write, Bash
**Model**: sonnet
**Argument Hint**: [scope] | --github-issues | --linear-tasks | --priority-analysis | --team-assignment

</detailed_sequence_steps>

</task>
