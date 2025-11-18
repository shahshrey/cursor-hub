<task name="Create Product Requirements Document">

<task_objective>
Create Product Requirements Document (PRD) for new features. This workflow takes feature name as input ($ARGUMENTS), analyzes product documentation, feature ideas, and JTBD analysis, and outputs a comprehensive PRD (product-development/current-feature/PRD.md) that defines the what, why, and how of the product feature with clear specifications and success metrics.
</task_objective>

<detailed_sequence_steps>
# Create Product Requirements Document - Detailed Sequence of Steps

## 1. Validate Product Context

1. Locate product documentation at @product-development/resources/product.md.

2. Locate feature documentation at @product-development/current-feature/feature.md.

3. Locate JTBD documentation at @product-development/current-feature/JTBD.md.

4. Review all documents to understand complete product and feature context.

## 2. Access PRD Template

1. Locate PRD template from @product-development/resources/PRD-template.md.

2. Review template structure and required sections.

3. Understand PRD framework and documentation standards.

## 3. Parse Feature Requirements

1. Extract feature name from $ARGUMENTS.

2. Analyze feature documentation for core requirements.

3. Review JTBD document to understand user needs alignment.

4. Identify key feature objectives and goals.

## 4. Define Problem Statement and User Needs

1. Articulate the problem being solved.

2. Document target user personas and segments.

3. Define user needs based on JTBD analysis.

4. Establish clear value proposition.

## 5. Specify Feature Requirements

1. Define functional requirements and capabilities.

2. Document feature scope and boundaries.

3. Identify required integrations and dependencies.

4. Specify technical constraints (high-level only).

## 6. Establish Success Metrics

1. Define key performance indicators (KPIs).

2. Establish measurable success criteria.

3. Define acceptance criteria for feature completion.

4. Document validation methods.

## 7. Define User Experience Requirements

1. Outline user journey and workflows.

2. Specify interaction patterns and behaviors.

3. Define accessibility requirements.

4. Document usability standards.

## 8. Document Technical Considerations

1. Provide high-level technical requirements.

2. Identify platform and technology constraints.

3. Document scalability and performance requirements.

4. Note security and compliance considerations.

## 9. Compile Comprehensive PRD

1. Organize all information into PRD template structure.

2. Ensure alignment between user needs and feature specifications.

3. Validate focus on feature requirements, not technical implementation.

4. Confirm time estimates are excluded per requirements.

## 10. Output and Validation

1. Write completed PRD to product-development/current-feature/PRD.md.

2. Verify file is created in correct location.

3. Ensure document is comprehensive and well-structured.

4. Confirm PRD clearly defines feature requirements while maintaining alignment with user needs and business objectives.

</detailed_sequence_steps>

</task>

