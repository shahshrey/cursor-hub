<task name="Audit Codebase Quality">

<task_objective>
Conduct a comprehensive review of the provided codebase to identify and report on various problematic code patterns across 62 categories including legacy code, security vulnerabilities, architectural issues, and documentation gaps. The review analyzes code quality, architecture, dependencies, and documentation to provide structured, detailed, and actionable recommendations for improvement.
</task_objective>

<detailed_sequence_steps>
# Audit Codebase Quality - Detailed Sequence of Steps

## 1. Identify Scope and Context

1. Determine the codebase location and scope of the review (specific directories, files, or entire project).

2. Identify the primary programming language(s), frameworks, and technology stack in use.

3. Review any existing documentation (README, architecture docs, ADRs) to understand the project's intended design and patterns.

4. Note the project's deployment target (cloud, on-premise, hybrid) and operational context.

5. Establish the baseline date for "current best practices" (October 2025) for evaluating outdated technologies.

## 2. Analyze Code Quality Issues (Categories 1-32)

### 2.1 Legacy and Maintenance Issues

1. Scan for **Legacy Code** (Category 1): Outdated patterns, deprecated APIs, old library versions, hard-to-understand constructs, technical debt.

2. Identify **Unused Code** (Category 2): Dead code, uncalled functions/methods, unreferenced variables/constants, unused imports, unimplemented features, unreachable code blocks.

3. Check for **Duplicate Code** (Category 4): Identical or nearly identical code blocks repeated in multiple locations.

4. Examine **Inconsistent Coding Standards/Style** (Category 5): Violations of established style guides (naming conventions, indentation, formatting).

### 2.2 Code Structure and Complexity

5. Detect **Magic Numbers/Strings** (Category 6): Hardcoded literal values used without explanation or named constants.

6. Evaluate **Excessive Cyclomatic Complexity** (Category 7): Functions with too many decision points, making them difficult to test and maintain.

7. Assess **Tight Coupling / Lack of Modularity** (Category 8): Components excessively dependent on each other.

8. Identify **Deeply Nested Code** (Category 25): Code blocks with excessive indentation levels.

9. Find **God Objects / Monolithic Classes** (Category 23): Classes responsible for too many unrelated functionalities.

10. Spot **Excessive Primitive Obsession** (Category 24): Using primitives instead of domain objects for complex concepts.

### 2.3 Error Handling and Resilience

11. Review **Wrongly Implemented or Missing Fallback Strategies** (Category 3): Inadequate error handling, missing default values, absent retry logic.

12. Check **Inconsistent Error/Exception Handling Mechanics** (Category 28): Varying approaches to error handling without clear rationale.

13. Identify **Unhandled Edge Cases** (Category 17): Code that assumes ideal conditions without accounting for edge cases.

14. Locate **Resource Leaks** (Category 12): Unclosed file handles, database connections, network sockets.

### 2.4 Naming and Documentation in Code

15. Examine **Inconsistent Naming Conventions** (Category 22): Mixing different case styles within the same scope.

16. Review **Non-Commented Complex Logic** (Category 18): Complex operations lacking explanatory comments.

17. Identify **Wrongly Commented Code** (Category 19): Comments that are factually incorrect or misleading.

18. Find **Comments About Unfinished/Temporary Code** (Category 20): TODO, FIXME, HACK markers that have lingered.

19. Detect **Over-Commented / Obvious Code** (Category 21): Comments that merely restate obvious code.

20. Assess **Inadequate or Misleading Comments/Documentation** (Category 9): Missing or outdated comments.

### 2.5 Security and Performance

21. Scan for **Security Vulnerabilities** (Category 10): SQL injection vectors, unvalidated input, exposed sensitive information, weak cryptographic practices.

22. Identify **Lack of Input Validation/Sanitization** (Category 32): Trusting external input without proper checks.

23. Check for **Hardcoded Environment-Specific Values** (Category 16): Configuration values embedded in code rather than external configuration.

24. Detect **Performance Bottlenecks** (Category 11): Inefficient algorithms, N+1 queries, excessive loop iterations.

25. Find **Non-Atomic Operations / Race Conditions** (Category 13): Code modifying shared state without proper synchronization.

### 2.6 Design Patterns and Principles

26. Identify **Misuse of Language Features / Anti-Patterns** (Category 14): Overuse of inheritance, excessive globals, improper exception use.

27. Check for **Testability Issues** (Category 15): Code hard to unit test due to tight coupling or external dependencies.

28. Find **Premature Optimization** (Category 26): Overly complex code for minimal performance gains.

29. Assess **Violation of DRY Principle** (Category 27): Repeating knowledge, configuration, or design decisions.

30. Identify **Unnecessary Abstractions / Over-Engineering** (Category 29): Design patterns that don't provide clear benefits.

31. Detect **Mutable Global State** (Category 30): Excessive reliance on global variables or static mutable fields.

32. Review **Broken or Outdated Build/Deployment Scripts** (Category 31): Incorrect scripts, non-existent resources, deprecated commands.

## 3. Review Architecture and System Design (Categories 33-42)

### 3.1 Architectural Documentation and Decisions

1. Check for **Missing or Undocumented Architecture Decisions** (Category 33): Critical design choices not explicitly documented.

2. Identify **Architecture Drift / Inconsistent Architecture** (Category 34): Code diverging from stated architectural vision.

3. Detect **Violation of Architectural Layers/Boundaries** (Category 35): Code accessing non-adjacent layers or bypassing interfaces.

### 3.2 Reliability and Scalability

4. Find **Single Points of Failure** (Category 36): Components whose failure would cause system unavailability.

5. Assess **Scalability Bottlenecks** (Category 37): Design choices limiting ability to handle increased load.

6. Review **Security Architecture Flaws** (Category 38): Lack of security model, insecure defaults, inadequate access control.

7. Evaluate **Poor Data Model Design** (Category 39): Suboptimal database schema leading to performance or integrity issues.

### 3.3 Observability and Dependencies

8. Check **Lack of Observability / Monitoring Hooks** (Category 40): Insufficient logging, metrics, or tracing.

9. Identify **Technology Sprawl** (Category 41): Excessive diversity of technologies without clear justification.

10. Detect **Circular Dependencies** (Category 42): Modules depending on each other in cycles.

## 4. Evaluate Documentation Quality (Categories 43-52)

### 4.1 API and Code Documentation

1. Check for **Missing API Documentation** (Category 43): API endpoints lacking clear documentation.

2. Identify **Outdated API Documentation** (Category 44): Documentation not reflecting current API behavior.

3. Review **Incomplete Error Message Documentation** (Category 46): Unexplained error codes or messages.

### 4.2 Project Documentation

4. Verify **Missing Readme/Getting Started Guide** (Category 45): Lack of comprehensive README or setup guide.

5. Check for **Lack of Decision Records** (Category 47): Important technical decisions not formally documented.

6. Identify **Undefined Release Process/Notes** (Category 48): No clear release process or versioning documentation.

7. Find **Missing Deployment/Infrastructure Documentation** (Category 49): Lack of deployment and infrastructure details.

8. Check for **No User/Operational Manuals** (Category 50): Missing documentation for end-users or operators.

9. Detect **Scattered/Disorganized Documentation** (Category 51): Documentation spread across multiple locations.

10. Review **Technical Debt Documentation** (Category 52): Areas of known technical debt not documented.

## 5. Assess Technology Stack Currency (Categories 53-62)

### 5.1 Dependencies and Libraries

1. Analyze **Outdated Libraries/Dependencies** (Category 53): Dependencies significantly behind latest stable versions, missing security patches. Compare against October 2025 best practices.

2. Identify **Incompatible Dependency Versions** (Category 57): Dependencies with version conflicts or known incompatibilities.

3. Check for **Use of Deprecated Language Features/APIs** (Category 56): Code using officially deprecated features slated for removal.

### 5.2 Technology Stack Evaluation

4. Evaluate **Not State-of-the-Art Technology/Framework** (Category 54): Core technology stack considered significantly outmoded for new development in October 2025.

5. Review **Outdated Development Environment Setup** (Category 58): Development environment relying on outdated tooling.

6. Assess **Inefficient Build Process** (Category 61): Build process using outdated or slow tools.

### 5.3 Best Practices and Patterns

7. Check **Security Best Practices** (Category 59): Code or configuration not adhering to current security best practices as of October 2025.

8. Review **Outdated Testing Frameworks/Methodologies** (Category 60): Testing suite relying on unmaintained frameworks or outdated methodologies.

9. Evaluate **Lack of Cloud-Native Readiness** (Category 62): For cloud deployments, design patterns not optimized for cloud environments.

10. Identify **Outdated Documentation (General)** (Category 55): Documentation containing incorrect information or referring to deprecated features.

## 6. Generate Structured Report

1. For each identified issue, compile findings using the standardized output format.

2. Organize findings by category, grouping related issues together.

3. For each issue, include:
   - Category name and number
   - Type (Dependency, Framework, Language Feature, Configuration File, Design Document, etc.)
   - File path (or N/A for broader concepts)
   - Line numbers (approximate if code-related, N/A for conceptual)
   - Detailed description explaining the issue and its impact in the current context
   - Specific, actionable recommendations including upgrade paths or modern alternatives
   - Severity level (Low, Medium, High, Critical) if applicable

4. Prioritize findings by severity and potential impact.

5. Group recommendations by effort level (quick wins vs. long-term refactoring).

## 7. Present Findings and Summary

1. Provide an executive summary highlighting the most critical issues discovered.

2. Present the detailed findings using the structured format specified.

3. Include statistics: total issues found, breakdown by category, severity distribution.

4. Offer general recommendations for addressing systematic issues across the codebase.

5. Suggest a prioritized remediation roadmap based on severity and effort.

</detailed_sequence_steps>

<output_format>
For each identified issue, use the following structure:

### [Category: {Category Name from list above}]

**Type:** {Dependency | Framework | Language Feature | Configuration File | Design Document | Code Pattern | etc.}
**File Path:** {path/to/relevant_file_or_directory | N/A for broader concepts}
**Line Numbers:** {start-line-number - end-line-number | N/A for conceptual}
**Description:** {Detailed explanation of the issue, why it's considered outdated/problematic in the current context (October 2025), and its potential impact.}
**Recommendation:** {Specific, actionable steps to address the issue, including potential upgrade paths or modern alternatives.}
**Severity:** {Low | Medium | High | Critical}

</output_format>

</task>