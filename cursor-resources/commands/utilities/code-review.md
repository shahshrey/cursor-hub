<task name="Code Quality Review">

<task_objective>
Perform comprehensive code quality review with security, performance, and architecture analysis by examining repository structure, assessing code quality, conducting security reviews, analyzing performance, evaluating architecture and design, checking testing coverage, reviewing documentation, and providing prioritized recommendations. Accepts target via $ARGUMENTS.
</task_objective>

<detailed_sequence_steps>
# Code Quality Review - Detailed Sequence of Steps

## 1. Current State Analysis

1. Check git status: `git status --porcelain`

2. Review recent changes: `git diff --stat HEAD~5`

3. Get repository info: `git log --oneline -5`

4. Check build status: `npm run build --dry-run 2>/dev/null || echo "No build script"`

## 2. Repository Analysis

1. Examine the repository structure and identify the primary language/framework

2. Check for configuration files (package.json, requirements.txt, Cargo.toml, etc.)

3. Review README and documentation for context

4. Understand project architecture and organization

## 3. Code Quality Assessment

1. Scan for code smells, anti-patterns, and potential bugs

2. Check for consistent coding style and naming conventions

3. Identify unused imports, variables, or dead code

4. Review error handling and logging practices

5. Assess code organization and modularity

## 4. Security Review

1. Look for common security vulnerabilities (SQL injection, XSS, etc.)

2. Check for hardcoded secrets, API keys, or passwords

3. Review authentication and authorization logic

4. Examine input validation and sanitization

5. Assess attack surface and security posture

## 5. Performance Analysis

1. Identify potential performance bottlenecks

2. Check for inefficient algorithms or database queries

3. Review memory usage patterns and potential leaks

4. Analyze bundle size and optimization opportunities

5. Assess scalability and resource efficiency

## 6. Architecture & Design

1. Evaluate code organization and separation of concerns

2. Check for proper abstraction and modularity

3. Review dependency management and coupling

4. Assess scalability and maintainability

5. Examine design patterns and architectural principles

## 7. Testing Coverage

1. Check existing test coverage and quality

2. Identify areas lacking proper testing

3. Review test structure and organization

4. Suggest additional test scenarios

5. Assess test effectiveness and maintainability

## 8. Documentation Review

1. Evaluate code comments and inline documentation

2. Check API documentation completeness

3. Review README and setup instructions

4. Identify areas needing better documentation

5. Assess documentation quality and clarity

## 9. Recommendations

1. Prioritize issues by severity (critical, high, medium, low)

2. Provide specific, actionable recommendations

3. Suggest tools and practices for improvement

4. Create a summary report with next steps

5. Include file paths and line numbers where applicable

## 10. Important Principles

Remember to be constructive and provide specific examples with file paths and line numbers where applicable.

Target for review: $ARGUMENTS

</detailed_sequence_steps>

</task>
