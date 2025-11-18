<task name="Create Product Requirement Prompt">

<task_objective>
Create comprehensive Product Requirement Prompt (PRP) with research and validation. This workflow takes feature description as input ($ARGUMENTS), conducts systematic research through documentation review, web research, and codebase exploration, and outputs a production-ready PRP that provides curated codebase intelligence and implementation guidance for AI agents to ship code on the first pass.
</task_objective>

<detailed_sequence_steps>
# Create Product Requirement Prompt - Detailed Sequence of Steps

## 1. Review PRP Foundation

1. Access base template from @concept_library/cc_PRP_flow/PRPs/base_template_v1.

2. Review PRP concept documentation at @concept_library/cc_PRP_flow/README.md.

3. Analyze existing PRPs: !`find concept_library/cc_PRP_flow/PRPs/ -name "*.md" | head -5`.

4. Understand PRP structure and requirements.

## 2. Conduct Documentation Review

1. Analyze ai_docs/ directory for relevant documentation.

2. Review project README and architecture documentation.

3. Identify relevant technical specifications and standards.

4. Extract key implementation patterns and conventions.

## 3. Perform Web Research

1. Search for implementation examples of similar features.

2. Gather library documentation and API references.

3. Research best practices and design patterns.

4. Collect relevant technical resources and guides.

## 4. Analyze Template Structure

1. Study base_template_v1 structure in detail.

2. Review existing PRPs for structural patterns.

3. Identify required sections and components.

4. Understand validation criteria format.

## 5. Explore Codebase

1. Identify relevant code patterns and conventions.

2. Map dependencies and integration points.

3. Document existing implementations and utilities.

4. Extract reusable components and patterns.

## 6. Synthesize Implementation Context

1. Compile comprehensive implementation context.

2. Organize research findings by relevance.

3. Create curated list of file references.

4. Document web resources and external references.

## 7. Structure PRP Document

1. Follow base_template_v1 structure exactly.

2. Include specific file references from codebase.

3. Add curated web resources and documentation links.

4. Provide comprehensive codebase intelligence.

## 8. Define Validation Criteria

1. Establish clear success metrics.

2. Define validation requirements.

3. Create acceptance criteria.

4. Document testing and quality standards.

## 9. Create Implementation Guide

1. Provide step-by-step implementation guidance.

2. Reference specific code patterns and examples.

3. Document integration requirements.

4. Include troubleshooting guidance.

## 10. Compile Production-Ready PRP

1. Ensure PRP includes PRD + curated codebase intelligence + agent/runbook.

2. Validate PRP provides minimum viable packet for AI to ship production-ready code.

3. Review for completeness and clarity.

4. Verify all references and resources are accurate.

</detailed_sequence_steps>

</task>

