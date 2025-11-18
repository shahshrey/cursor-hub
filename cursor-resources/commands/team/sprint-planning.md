<task name="Sprint Planning">

<task_objective>
Plan and organize sprint workflows with Linear integration and capacity analysis. Check Linear integration, gather sprint context, analyze current state, generate comprehensive sprint plan, and provide interactive planning assistance to optimize sprint backlog, assess risks, and ensure realistic sprint commitments.
</task_objective>

<detailed_sequence_steps>
# Sprint Planning - Detailed Sequence of Steps

## 1. Check Linear Integration

1. Verify if Linear MCP server is connected and functional
2. If connected, proceed with full Linear integration capabilities
3. If not connected, inform user about installation from https://github.com/modelcontextprotocol/servers
4. Establish fallback approach using GitHub issues and manual input if Linear unavailable

## 2. Gather Sprint Context

1. Collect sprint duration information (e.g., 2 weeks, 3 weeks)
2. Determine sprint start date from user or calculate next sprint
3. Identify team members involved in the sprint
4. Define sprint goals and themes from product roadmap
5. Retrieve previous sprint velocity if available for planning
6. Use $ARGUMENTS to specify sprint duration or date range

## 3. Analyze Current State with Linear Connected

1. Fetch all backlog items from Linear workspace
2. Get in-progress tasks and their current status
3. Analyze task priorities and importance levels
4. Review dependencies between tasks
5. Check team member assignments and current capacity
6. Review blocked tasks and impediments requiring resolution

## 4. Analyze Current State without Linear (Fallback)

1. Analyze GitHub issues by labels and milestones
2. Review open pull requests and their status
3. Check recent commit activity for team velocity
4. Query git history using `git log --oneline --since='2 weeks ago' | wc -l`
5. Ask user for additional context about tasks and priorities

## 5. Sprint Planning Analysis - Capacity Calculation

1. Calculate total available hours based on team size and sprint duration
2. Extract previous sprint velocity from Linear or git history
3. Recommend capacity at 80-85% of total to account for overhead
4. Factor in known absences, holidays, and other commitments

## 6. Sprint Planning Analysis - Backlog Prioritization

1. Categorize tasks into High Priority (must-have for sprint goal)
2. Identify Medium Priority tasks (important but flexible)
3. Determine Nice-to-Have tasks (stretch goals)
4. For each task include: ID, title, estimate, assignee, dependencies, acceptance criteria

## 7. Sprint Planning Analysis - Risk Assessment

1. Identify technical risks (complex features, unknowns, new technology)
2. Assess resource risks (availability, skill gaps)
3. Evaluate dependency risks (external dependencies, blockers)
4. Plan mitigation strategies for identified risks

## 8. Sprint Planning Analysis - Generate Recommendations

1. Provide specific recommendations based on data analysis
2. Suggest resource allocation strategies for optimal efficiency
3. Propose risk mitigation strategies for high-risk items
4. Define metrics to track: velocity, burndown rate, blocked time, cycle time

## 9. Interactive Planning Session

1. Offer assistance with task breakdown and estimation
2. Help with dependency mapping and visualization
3. Support resource balancing across team members
4. Assist with risk mitigation planning
5. Help finalize sprint backlog with realistic commitments

## 10. Error Handling - Linear Connection Issues

1. Detect when Linear MCP server is not connected
2. Inform user about installation steps: `npm install -g @modelcontextprotocol/server-linear`
3. Guide configuration with Linear API key
4. Suggest restarting session with Linear connected
5. Proceed with GitHub data and manual input as fallback

## 11. Error Handling - Missing Data

1. Identify specific missing data points needed for planning
2. Provide templates for manual input
3. Ask clarifying questions to gather necessary information
4. Use historical data as estimates when direct data unavailable

## 12. Best Practices Application

1. Always verify capacity to avoid overcommitting the team
2. Include buffer time by planning for 80-85% capacity
3. Consider dependencies when ordering tasks
4. Balance workload to distribute tasks evenly
5. Define clear sprint goals for focused objectives
6. Plan for unknowns with spike and investigation time

## 13. Integration Points Utilization

1. Linear for task management and tracking
2. GitHub for code repository and pull requests
3. Git history for velocity and activity metrics
4. Team calendars for availability if accessible

## 14. Output Formats

1. Generate markdown report as default format
2. Offer CSV format for spreadsheet import
3. Provide JSON format for automation tools
4. Create Linear-compatible format for direct import

**Allowed Tools**: Read, WebSearch
**Model**: sonnet
**Argument Hint**: [sprint-duration] | [start-date] [duration]

</detailed_sequence_steps>

</task>
