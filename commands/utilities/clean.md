<task name="Clean Python Codebase">

<task_objective>
Execute repo-wide remediation of black, isort, flake8, and mypy issues across the Python codebase to enforce formatting, import organization, linting compliance, and type correctness. This command helps keep Python files consistent and compliant for $ARGUMENTS by resolving formatting, lint, and typing problems.
</task_objective>

<detailed_sequence_steps>
# Clean Python Codebase - Detailed Sequence of Steps

## 1. Run Black Formatter

1. Execute black on the entire codebase to fix code formatting issues

2. Ensure consistent code style across all Python files

3. Review and apply formatting changes

## 2. Run isort for Import Organization

1. Execute isort on the entire codebase to organize imports

2. Ensure consistent import ordering and grouping

3. Apply import organization changes

## 3. Fix Flake8 Linting Issues

1. Run flake8 to identify linting issues

2. Fix code quality issues, style violations, and potential bugs

3. Address all flake8 warnings and errors

## 4. Resolve MyPy Type Checking Issues

1. Run mypy to identify type checking issues

2. Add missing type annotations

3. Fix type inconsistencies and errors

4. Ensure type safety across the codebase

## 5. Verify All Fixes

1. Run all tools again to confirm all issues are resolved

2. Ensure no new issues were introduced

3. Validate that the codebase passes all quality checks

</detailed_sequence_steps>

</task>
