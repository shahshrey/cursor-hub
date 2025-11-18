<task name="Team Knowledge Mapper">

<task_objective>
Map team knowledge and expertise with skill gap analysis and learning path recommendations. Create comprehensive skill matrices, identify knowledge gaps, analyze expertise distribution, and design learning paths to optimize team capabilities and reduce bus factor risks through strategic knowledge management.
</task_objective>

<detailed_sequence_steps>
# Team Knowledge Mapper - Detailed Sequence of Steps

## 1. Current Knowledge Context Analysis

1. Analyze team expertise using `git log --format='%ae' --since='3 months ago' | sort | uniq -c | sort -nr` for contributor activity patterns
2. Assess technology stack by analyzing languages, frameworks, and tools used in codebase
3. Evaluate knowledge distribution to identify expertise concentration and bus factor risks
4. Review recent skill development and cross-training initiatives
5. Use $ARGUMENTS to focus on: skill-matrix, knowledge-gaps, expertise-areas, or learning-paths

## 2. Skill Matrix Creation

1. Map individual expertise levels across team members
2. Identify core competencies for each team member
3. Assess technology proficiencies in languages and frameworks
4. Evaluate domain knowledge in business and technical areas

## 3. Knowledge Gap Analysis

1. Identify critical skill gaps that pose risks to project delivery
2. Assess team vulnerabilities where knowledge is concentrated
3. Evaluate learning priorities based on project needs
4. Recommend skill development areas for team growth

## 4. Expertise Distribution

1. Analyze knowledge concentration across team members
2. Identify single points of failure where only one person knows critical areas
3. Assess bus factor risks for project continuity
4. Recommend knowledge sharing strategies to distribute expertise

## 5. Learning Path Planning

1. Design skill development roadmaps for individual team members
2. Recommend training priorities based on gap analysis
3. Plan mentorship programs to transfer knowledge
4. Optimize knowledge transfer through structured learning

## 6. Cross-Training Optimization

1. Identify pairing opportunities for knowledge sharing
2. Plan knowledge rotation schedules
3. Design shadowing programs for skill development
4. Optimize skill redundancy to reduce single points of failure

## 7. Knowledge Retention

1. Assess knowledge preservation strategies
2. Plan documentation strategies for critical knowledge
3. Design knowledge capture systems for ongoing learning
4. Prevent expertise loss through systematic documentation

## 8. Advanced Features

1. Dynamic skill tracking with real-time updates
2. Expertise prediction modeling for future needs
3. Learning ROI analysis to prioritize investments
4. Knowledge graph visualization for relationship mapping
5. Competency gap forecasting based on project plans

## 9. Strategic Planning

1. Succession planning support for key roles
2. Hiring decision guidance based on skill gaps
3. Team composition optimization for project needs
4. Skill portfolio balancing across the organization

**Allowed Tools**: Read, Bash, Glob, Grep
**Model**: sonnet
**Argument Hint**: [mapping-type] | --skill-matrix | --knowledge-gaps | --expertise-areas | --learning-paths

</detailed_sequence_steps>

</task>
