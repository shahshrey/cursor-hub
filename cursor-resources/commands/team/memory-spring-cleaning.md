<task name="Memory Spring Cleaning">

<task_objective>
Clean and organize project memory files with implementation synchronization and pattern updates. Discover memory files, analyze implementation drift, validate patterns, optimize content, synchronize updates with actual code, and ensure quality to maintain accurate and useful project documentation.
</task_objective>

<detailed_sequence_steps>
# Memory Spring Cleaning - Detailed Sequence of Steps

## 1. Current Memory Context Analysis

1. Count memory files using `find . -name "CLAUDE*.md" | wc -l` to locate all CLAUDE.md files
2. Count total documentation with `find . -name "README*" -o -name "*.md" | wc -l`
3. Check last update time using `find . -name "CLAUDE.md" -exec stat -c "%y" {} \;`
4. Analyze implementation drift by comparing documented vs actual patterns
5. Use $ARGUMENTS to focus on: claude-md, documentation, outdated-patterns, or implementation-sync

## 2. Memory File Discovery

1. Locate all CLAUDE.md files throughout the project
2. Find all documentation files (README, docs, guides)
3. Assess hierarchy and organization structure
4. Identify redundant content across files

## 3. Implementation Analysis

1. Compare documented patterns with actual code implementation
2. Identify implementation drift where code diverged from docs
3. Assess accuracy gaps between documentation and reality
4. Note areas requiring synchronization

## 4. Pattern Validation

1. Verify documented conventions are still followed
2. Validate code examples for correctness
3. Check dependency accuracy in documentation
4. Assess technology stack alignment with current state

## 5. Content Optimization

1. Remove outdated information no longer relevant
2. Consolidate duplicate content across files
3. Improve organization structure for better navigation
4. Enhance clarity in explanations and examples

## 6. Synchronization Updates

1. Update development commands to match current workflow
2. Refresh technology stack references
3. Sync architectural patterns with current implementation
4. Validate workflows and update as needed

## 7. Quality Assurance

1. Ensure consistency across all memory files
2. Validate markdown formatting correctness
3. Check link integrity (internal and external links)
4. Maintain version alignment with project state

## 8. Advanced Features

1. Automated pattern detection from codebase
2. Implementation drift analysis using code comparison
3. Cross-reference validation between documents
4. Documentation health scoring metrics

## 9. Memory Health Assessment

1. Content freshness metrics tracking
2. Accuracy validation against implementation
3. Usage pattern analysis for popular sections
4. Maintenance scheduling recommendations

**Allowed Tools**: Read, Write, Edit, Glob
**Model**: sonnet
**Argument Hint**: [scope] | --claude-md | --documentation | --outdated-patterns | --implementation-sync

</detailed_sequence_steps>

</task>
