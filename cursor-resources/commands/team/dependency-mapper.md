<task name="Dependency Mapper">

<task_objective>
Map project and task dependencies with critical path analysis and circular dependency detection. Extract code dependencies, analyze task relationships, construct dependency graphs, detect circular dependencies, optimize execution order, and assess risks to provide visual representations and optimization recommendations.
</task_objective>

<detailed_sequence_steps>
# Dependency Mapper - Detailed Sequence of Steps

## 1. Current Dependency Context Analysis

1. Get repository context using `gh repo view --json nameWithOwner -q .nameWithOwner`
2. Count project files with `find . -name "*.js" -o -name "*.ts" -o -name "*.py" | wc -l` for analysis scope
3. Verify Linear MCP server connectivity for task relationship data
4. Assess import analysis needs for code dependency structure and circular dependency detection
5. Use $ARGUMENTS to focus on: tasks, code, circular, or critical-path analysis

## 2. Code Dependency Mapping

1. Extract import statements from all code files
2. Analyze module relationships and dependencies
3. Identify coupling levels between components
4. Map file interdependencies across the codebase

## 3. Task Relationship Analysis

1. Query Linear for task dependencies and relationships
2. Extract task mentions from commit messages and PR descriptions
3. Analyze project relationships and epic structures
4. Map task hierarchy and dependencies

## 4. Dependency Graph Construction

1. Build comprehensive graph structure representing all dependencies
2. Identify dependency chains showing transitive dependencies
3. Calculate critical paths for longest dependency chains
4. Detect bottlenecks where multiple tasks converge

## 5. Circular Dependency Detection

1. Implement cycle detection algorithms (DFS-based)
2. Identify problematic loops in code or task dependencies
3. Assess impact severity of circular dependencies
4. Recommend resolution strategies to break cycles

## 6. Execution Order Optimization

1. Calculate topological sort for optimal task ordering
2. Optimize task sequence to maximize parallelism
3. Balance team capacity in task assignments
4. Minimize blocking dependencies through reordering

## 7. Risk Assessment

1. Identify high-risk chains with many dependencies
2. Assess single points of failure in critical paths
3. Evaluate dependency complexity metrics
4. Recommend mitigation strategies for risks

## 8. Advanced Features

1. Visual dependency graphs generation
2. ASCII tree representations for terminal display
3. Impact analysis for dependency changes
4. Sprint planning optimization based on dependencies
5. Real-time dependency tracking as changes occur

## 9. Quality Insights

1. Dependency health metrics measurement
2. Coupling analysis for maintainability
3. Maintainability assessment based on dependency structure
4. Team workload distribution based on dependencies

**Allowed Tools**: Read, Glob, Grep, Bash
**Model**: sonnet
**Argument Hint**: [scope] | --tasks | --code | --circular | --critical-path

</detailed_sequence_steps>

</task>
