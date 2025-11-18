<task name="Architecture Review">

<task_objective>
Perform comprehensive system architecture analysis and improvement planning. Map component hierarchy, evaluate design patterns, analyze dependency architecture, trace data flow, assess scalability and performance, and review security architecture to provide actionable improvement recommendations and implementation roadmap.
</task_objective>

<detailed_sequence_steps>
# Architecture Review - Detailed Sequence of Steps

## 1. Current Architecture Context Analysis

1. Analyze project structure using `find . -name "*.js" -o -name "*.ts" -o -name "*.py" -o -name "*.go" | head -5`
2. Identify package dependencies from package.json, requirements.txt, go.mod, or other dependency files
3. Locate testing framework files with `find . -name "*.test.*" -o -name "*spec.*" | head -3`
4. Count documentation files using `find . -name "README*" -o -name "*.md" | wc -l`
5. Use $ARGUMENTS to focus on: modules, patterns, dependencies, or security

## 2. System Structure Assessment

1. Map component hierarchy and relationships
2. Identify architectural patterns in use (MVC, microservices, etc.)
3. Analyze module boundaries and separation of concerns
4. Assess layered design implementation (presentation, business, data)

## 3. Design Pattern Evaluation

1. Identify implemented design patterns (factory, singleton, observer, etc.)
2. Assess pattern consistency across the codebase
3. Detect anti-patterns that violate best practices
4. Evaluate pattern effectiveness for solving problems

## 4. Dependency Architecture

1. Analyze coupling levels between modules
2. Detect circular dependencies in imports
3. Evaluate dependency injection usage
4. Assess architectural boundaries and layer violations

## 5. Data Flow Analysis

1. Trace information flow through the system
2. Evaluate state management approach
3. Assess data persistence strategies (database, cache, file)
4. Validate transformation patterns for data processing

## 6. Scalability & Performance

1. Analyze scaling capabilities (horizontal, vertical)
2. Evaluate caching strategies and implementations
3. Assess bottlenecks in critical paths
4. Review resource management (memory, connections, threads)

## 7. Security Architecture

1. Review trust boundaries between components
2. Assess authentication patterns and implementations
3. Analyze authorization flows and access control
4. Evaluate data protection strategies (encryption, sanitization)

## 8. Advanced Analysis

1. Component testability assessment
2. Configuration management evaluation
3. Error handling patterns review
4. Monitoring integration analysis
5. Extensibility assessment for future growth

## 9. Quality Assessment

1. Code organization and structure quality
2. Documentation adequacy for maintenance
3. Team communication patterns effectiveness
4. Technical debt evaluation and prioritization

**Allowed Tools**: Read, Glob, Grep, Bash
**Model**: sonnet
**Argument Hint**: [scope] | --modules | --patterns | --dependencies | --security

</detailed_sequence_steps>

</task>
