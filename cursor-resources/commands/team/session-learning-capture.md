<task name="Session Learning Capture">

<task_objective>
Capture and document session learnings with automatic knowledge integration and memory updates. Process project learnings, implementation corrections, structure insights, and workflow improvements by detecting new knowledge, classifying and categorizing it, analyzing context, and integrating updates into project memory files while maintaining consistency and validating accuracy.
</task_objective>

<detailed_sequence_steps>
# Session Learning Capture - Detailed Sequence of Steps

## 1. Current Learning Context Analysis

1. Assess session duration and identify learning opportunities in the current Cursor session
2. Locate and count all CLAUDE*.md memory files available for knowledge integration using `find . -name "CLAUDE*.md" | wc -l`
3. Evaluate project complexity through assessment of project structure and documentation completeness
4. Identify learning patterns by detecting knowledge gaps and correction opportunities

## 2. Learning Identification

1. Detect new project knowledge discovered during the session
2. Identify implementation corrections that need to be documented
3. Recognize structural insights about architecture or organization
4. Note workflow discoveries and process improvements
5. Use $ARGUMENTS to focus on specific capture type: project-learnings, implementation-corrections, structure-insights, or workflow-improvements

## 3. Knowledge Classification

1. Categorize the type of learning (project, implementation, structure, or workflow)
2. Assess importance level of each learning item
3. Determine appropriate integration location in memory files
4. Evaluate reusability potential for future sessions

## 4. Context Analysis

1. Analyze session context to understand what triggered the learning
2. Identify triggering conditions that led to the knowledge discovery
3. Assess knowledge applicability to other parts of the project
4. Determine documentation needs and format requirements

## 5. Integration Planning

1. Select appropriate CLAUDE.md memory files for updates
2. Determine update strategy (append, modify, or consolidate)
3. Plan updates to maintain consistency with existing content
4. Design approach to preserve existing knowledge while adding new insights

## 6. Memory Updates

1. Update CLAUDE.md files with new learnings
2. Enhance documentation with improved examples or explanations
3. Improve workflows based on discovered optimizations
4. Strengthen knowledge base with cross-references and connections

## 7. Validation Process

1. Verify accuracy of captured knowledge against actual implementation
2. Ensure integration quality and consistency with existing content
3. Validate accessibility and discoverability of new knowledge
4. Confirm usefulness through practical applicability testing

## 8. Advanced Features

1. Automated learning detection using pattern recognition
2. Intelligent categorization based on content analysis
3. Context-aware integration preserving related knowledge
4. Knowledge graph enhancement with relationship mapping
5. Version control integration for change tracking

## 9. Quality Assurance

1. Learning accuracy validation through verification
2. Integration consistency checks across memory files
3. Accessibility optimization for easy retrieval
4. Knowledge retrieval efficiency testing

**Allowed Tools**: Read, Write, Edit, Glob
**Model**: sonnet
**Argument Hint**: [capture-type] | --project-learnings | --implementation-corrections | --structure-insights | --workflow-improvements

</detailed_sequence_steps>

</task>
