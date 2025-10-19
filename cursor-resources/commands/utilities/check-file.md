<task name="File Analysis Tool">

<task_objective>
Perform comprehensive analysis of specified files to identify code quality issues, security vulnerabilities, performance bottlenecks, dependency problems, language-specific patterns, and test coverage gaps with actionable recommendations for improvement. Accepts file path via $ARGUMENTS.
</task_objective>

<detailed_sequence_steps>
# File Analysis Tool - Detailed Sequence of Steps

## 1. Read and Parse Target File

1. Read the target file: $ARGUMENTS

2. Parse file structure and content

3. Identify programming language and framework

4. Extract metadata and file characteristics

## 2. Analyze Code Structure and Complexity

1. Analyze code organization and architecture

2. Calculate cyclomatic complexity and maintainability metrics

3. Identify code structure patterns and anti-patterns

4. Assess overall code organization quality

## 3. Code Quality Assessment

1. Scan for code smells and anti-patterns

2. Check for consistent coding style and naming conventions

3. Identify unused imports, variables, or dead code

4. Review error handling and logging practices

5. Evaluate code duplication and refactoring opportunities

6. Assess TypeScript type safety and best practices (if applicable)

## 4. Security Review

1. Look for common security vulnerabilities (SQL injection, XSS, etc.)

2. Check for hardcoded secrets, API keys, or passwords

3. Review authentication and authorization logic

4. Examine input validation and sanitization

5. Assess sensitive data exposure risks

6. Review common vulnerability patterns

## 5. Performance Analysis

1. Identify potential performance bottlenecks

2. Check for inefficient algorithms or database queries

3. Review memory usage patterns and potential leaks

4. Analyze bundle size and optimization opportunities (if applicable)

5. Assess runtime performance implications

6. Evaluate lazy loading and code splitting opportunities

## 6. Dependency Usage Evaluation

1. Review dependency usage and imports

2. Check for outdated or vulnerable dependencies

3. Assess dependency efficiency and alternatives

4. Identify potential dependency issues

## 7. Language-Specific Patterns Review

1. Evaluate framework-specific patterns (React, Vue, Angular, etc.)

2. Check for modern JavaScript/TypeScript features usage

3. Review language-specific best practices

4. Assess idiomatic code patterns

## 8. Test Coverage and Quality

1. Check existing test coverage for the file

2. Identify areas lacking proper testing

3. Review test structure and organization

4. Suggest additional test scenarios

5. Assess test coverage gaps

## 9. Best Practices Evaluation

1. Review error handling and logging practices

2. Assess testing patterns and practices

3. Evaluate documentation quality

4. Check for proper separation of concerns

## 10. Generate Actionable Recommendations

1. Prioritize issues by severity (critical, high, medium, low)

2. Provide specific, actionable recommendations

3. Suggest tools and practices for improvement

4. Include file paths and line numbers for specific issues

5. Create a summary report with next steps

## 11. Analysis Report Structure

Generate comprehensive analysis covering:

1. **Code Quality Metrics**: Cyclomatic complexity, maintainability, code duplication, naming conventions, code organization

2. **Security Assessment**: Input validation, authentication patterns, sensitive data exposure, common vulnerability patterns

3. **Performance Review**: Bundle size impact, runtime performance bottlenecks, memory usage patterns, optimization opportunities

4. **Best Practices**: Framework-specific patterns, modern feature usage, error handling practices, testing patterns and coverage gaps

5. **Actionable Recommendations**: Prioritized by severity with specific examples and file locations

</detailed_sequence_steps>

</task>
