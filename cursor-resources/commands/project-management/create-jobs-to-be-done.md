<task name="Create Jobs-to-be-Done Document">

<task_objective>
Create Jobs-to-be-Done (JTBD) analysis for product features. This workflow takes feature name as input ($ARGUMENTS), analyzes product documentation and feature ideas, and outputs a comprehensive JTBD document (product-development/current-feature/JTBD.md) that captures user motivations, pain points, and desired outcomes from the user's perspective.
</task_objective>

<detailed_sequence_steps>
# Create Jobs-to-be-Done Document - Detailed Sequence of Steps

## 1. Validate Required Documentation

1. Locate product documentation at @product-development/resources/product.md.

2. Locate feature idea at @product-development/current-feature/feature.md.

3. If feature file cannot be found, exit the process and notify the user.

4. Review both documents to understand product context and feature scope.

## 2. Locate JTBD Template

1. Access JTBD template from @product-development/resources/JTBD-template.md.

2. Review template structure and required sections.

3. Understand JTBD framework principles and format.

## 3. Analyze Feature Context

1. Parse feature name from $ARGUMENTS.

2. Extract key feature details from feature.md.

3. Identify user personas and target audience.

4. Understand the problem space the feature addresses.

## 4. Develop Job Statements

1. Create job statements following format: "When [situation], I want [motivation], so I can [expected outcome]".

2. Identify multiple job statements for different user contexts.

3. Prioritize job statements by user impact and frequency.

4. Validate job statements focus on user goals, not solutions.

## 5. Analyze User Needs and Pain Points

1. Identify current user pain points and frustrations.

2. Document unmet needs in existing solutions.

3. Understand user context and circumstances.

4. Map emotional and functional job dimensions.

## 6. Define Desired Outcomes

1. Define measurable outcomes from user perspective.

2. Identify success criteria for job completion.

3. Document both functional and emotional outcomes.

4. Prioritize outcomes by user value.

## 7. Conduct Competitive Analysis

1. Analyze how competitors address similar jobs.

2. Identify gaps in competitive solutions.

3. Evaluate competitor approaches through JTBD lens.

4. Document differentiation opportunities.

## 8. Assess Market Opportunity

1. Evaluate market size for the identified jobs.

2. Assess urgency and importance of the jobs.

3. Identify underserved or overserved segments.

4. Document market opportunity assessment.

## 9. Generate JTBD Document

1. Compile all analysis into JTBD template structure.

2. Ensure document focuses on user jobs, not technical features.

3. Validate document excludes time estimates and implementation details.

4. Review for clarity and completeness.

## 10. Output and Validation

1. Write JTBD document to product-development/current-feature/JTBD.md.

2. Verify file is created in correct location.

3. Ensure document is properly formatted and complete.

4. Confirm focus remains on fundamental jobs users are trying to accomplish.

</detailed_sequence_steps>

</task>

