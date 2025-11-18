<task name="Documentation Update & Synchronization">

<task_objective>
Systematically update project documentation with implementation status, API changes, and synchronized content. Input: Documentation structure, specs directory, implementation status indicators, recent changes, and project progress files. Processing: Analyze documentation status, review implementation and testing results, update phase documents, mark completed items, synchronize specifications, and update project-wide documentation. Output: Updated and synchronized documentation with current implementation status, completion percentages, best practices, testing procedures, and comprehensive project status.
</task_objective>

<detailed_sequence_steps>

## 1. Assess Current Documentation State

1. List documentation structure: `find . -name "*.md" | head -10`

2. Check specs directory at @specs/

3. Count status indicators: `grep -r "✅\|❌\|⚠️" docs/ specs/ 2>/dev/null | wc -l`

4. Review recent changes: `git log --oneline --since="1 week ago" -- "*.md" | head -5`

5. Check project progress at @CLAUDE.md or @README.md

## 2. Documentation Analysis - Review Current Status

1. Check `specs/implementation_status.md` for overall project status

2. Review implemented phase document (`specs/phase{N}_implementation_plan.md`)

3. Review `specs/flutter_structurizr_implementation_spec.md` and `specs/flutter_structurizr_implementation_spec_updated.md`

4. Review `specs/testing_plan.md` to ensure it is current given recent test passes, failures, and changes

5. Examine `CLAUDE.md` and `README.md` for project-wide documentation

6. Check for and document any new lessons learned or best practices in CLAUDE.md

## 3. Implementation and Testing Results Analysis

1. Review what was implemented in the last phase

2. Review testing results and coverage

3. Identify new best practices discovered during implementation

4. Note any implementation challenges and solutions

5. Cross-reference updated documentation with recent implementation and test results to ensure accuracy

## 4. Update Phase Implementation Document

1. Mark completed tasks with ✅ status

2. Update implementation percentages

3. Add detailed notes on implementation approach

4. Document any deviations from original plan with justification

5. Add new sections if needed (lessons learned, best practices)

6. Document specific implementation details for complex components

7. Include a summary of any new troubleshooting tips or workflow improvements discovered during the phase

## 5. Update Implementation Status Document

1. Update phase completion percentages

2. Add or update implementation status for components

3. Add notes on implementation approach and decisions

4. Document best practices discovered during implementation

5. Note any challenges overcome and solutions implemented

## 6. Update Implementation Specification Documents

1. Mark completed items with ✅ or strikethrough but preserve original requirements

2. Add notes on implementation details where appropriate

3. Add references to implemented files and classes

4. Update any implementation guidance based on experience

## 7. Update CLAUDE.md and README.md

1. Add new best practices

2. Update project status

3. Add new implementation guidance

4. Document known issues or limitations

5. Update usage examples to include new functionality

## 8. Document New Testing Procedures

1. Add details on test files created

2. Include test running instructions

3. Document test coverage

4. Explain testing approach for complex components

## 9. Maintain Consistent Documentation Style

1. Use clear headings and sections

2. Include code examples where helpful

3. Use status indicators (✅, ⚠️, ❌) consistently

4. Maintain proper Markdown formatting

## 10. Ensure Documentation Completeness

1. Cover all implemented features

2. Include usage examples

3. Document API changes or additions

4. Include troubleshooting guidance for common issues

## 11. Apply Documentation Guidelines

1. DO NOT CREATE new specification files

2. UPDATE existing files in the `specs/` directory

3. Maintain consistent documentation style

4. Include practical examples where appropriate

5. Cross-reference related documentation sections

6. Document best practices and lessons learned

7. Provide clear status updates on project progress

8. Update numerical completion percentages

9. Ensure documentation reflects actual implementation

## 12. Provide Summary of Documentation Updates

1. List files updated

2. Document major changes to documentation

3. Report updated completion percentages

4. Summarize new best practices documented

5. Present status of the overall project after this phase

</detailed_sequence_steps>

</task>
