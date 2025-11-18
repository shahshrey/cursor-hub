<task name="Cross-Reference Manager">

<task_objective>
Manage cross-platform reference links between GitHub and Linear with integrity checking. Implement comprehensive cross-reference management system that maintains bidirectional links, performs integrity auditing, repairs broken references, visualizes mapping networks, validates link functionality, and exports documentation. The output will be a complete reference management system with integrity reports, repair summaries, mapping visualizations, and comprehensive cross-platform link maintenance.
</task_objective>

<how_to_ask_followup_question>
<question>What cross-reference management action would you like to perform?</question>
<options>["Audit all references for integrity", "Repair broken or orphaned links", "Display mapping visualization", "Validate link functionality", "Export mapping documentation"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Cross-Reference Manager - Detailed Sequence of Steps

## Prerequisites and Context

**Available Tools**: Read, Write, Edit, Bash

**Argument Options**: [action] | audit | repair | map | validate | export

**Model**: sonnet

## Current Reference State

- GitHub CLI: !`gh --version 2>/dev/null && echo "✓ Available" || echo "⚠ Not available"`
- Linear MCP: Check Linear MCP server connectivity and authentication
- Reference database: @.reference-mappings.json or reference state files
- Link integrity: !`find . -name "*sync*" -o -name "*reference*" | wc -l` mapping files found

## 1. Reference Database

Initialize and manage mapping storage:

**Initialize Mapping Storage**:
- Create or load reference database file (.reference-mappings.json)
- Define schema for GitHub-Linear entity pairs
- Set up indexes for efficient lookup
- Initialize metadata tracking (created, updated, verified timestamps)

**Track Bidirectional Links**:
- Store GitHub issue number to Linear task ID mappings
- Store Linear task ID to GitHub issue number mappings
- Track PR to task relationships
- Maintain comment and attachment references

**Maintain Sync History**:
- Log all reference creation events
- Track reference updates and modifications
- Record validation and repair operations
- Store historical state for rollback capability

## 2. Integrity Auditing

Scan and identify reference issues:

**Scan Cross-References**:
- Enumerate all GitHub issues with Linear references
- Query all Linear tasks with GitHub references
- Extract references from issue/task descriptions and comments
- Build complete reference inventory

**Identify Orphaned Links**:
- Find GitHub issues referencing non-existent Linear tasks
- Find Linear tasks referencing deleted GitHub issues
- Identify references to archived or moved items
- Flag references with broken URLs

**Detect Mismatches**:
- Compare bidirectional links for consistency
- Identify one-way references (GitHub→Linear but not Linear→GitHub)
- Find duplicate references pointing to same entity
- Detect conflicting references (multiple tasks for one issue)

**Validate Consistency**:
- Verify GitHub issue numbers are valid
- Confirm Linear task IDs exist and are accessible
- Check reference format and structure
- Validate metadata accuracy

## 3. Smart Repair

Fix broken and inconsistent references:

**Fix Broken References**:
- Remove references to deleted entities
- Update references to moved or renamed items
- Repair malformed reference formats
- Recreate missing bidirectional links

**Update Outdated Links**:
- Refresh stale references with current data
- Update changed URLs or identifiers
- Sync metadata changes (title, status, assignee)
- Refresh timestamps and verification dates

**Consolidate Duplicates**:
- Identify duplicate mappings for same entity
- Determine canonical reference using rules (newest, most complete)
- Merge metadata from duplicate entries
- Remove redundant references

**Remove Invalid Entries**:
- Delete references to permanently deleted items
- Clean up test or development references
- Remove references outside current scope
- Archive historical references separately

## 4. Mapping Visualization

Display and analyze reference networks:

**Display Reference Networks**:
- Generate visual map of GitHub-Linear connections
- Show entity relationships (issues, PRs, tasks, comments)
- Highlight reference density and patterns
- Display hierarchical relationships

**Show Connection Health**:
- Color-code by reference status (valid, broken, orphaned)
- Display verification timestamps
- Show bidirectional vs one-way links
- Indicate sync frequency and recency

**Highlight Problems**:
- Mark broken references prominently
- Flag orphaned or inconsistent links
- Identify high-risk areas needing attention
- Suggest priority order for repairs

**Provide Statistics**:
- Total reference count by type
- Health percentage (valid/total)
- Breakdown by status (valid, broken, orphaned)
- Trend analysis (improving/degrading)

## 5. Deep Validation

Verify link functionality and integrity:

**Verify Link Functionality**:
- Test GitHub issue accessibility via API
- Test Linear task accessibility via API
- Validate URL resolution for web links
- Check permission and access rights

**Test Bidirectional Navigation**:
- Verify GitHub→Linear navigation works
- Verify Linear→GitHub navigation works
- Test link click-through functionality
- Validate cross-platform context preservation

**Check Field Consistency**:
- Compare titles between linked entities
- Verify state/status consistency
- Check assignee mappings accuracy
- Validate priority and label mappings

**Ensure Data Integrity**:
- Verify no data corruption in references
- Check reference format compliance
- Validate metadata completeness
- Test reference resolution performance

## 6. Export & Documentation

Generate reports and documentation:

**Generate Mapping Reports**:
- Create comprehensive mapping inventory
- Generate statistics and health summary
- Produce detailed audit results
- Include repair history and actions taken

**Create Backup Files**:
- Export complete reference database
- Create timestamped backup copies
- Generate recovery instructions
- Include schema documentation

**Provide Import Instructions**:
- Document reference database format
- Provide import/restore procedures
- Include migration scripts
- Document API for programmatic access

**Maintain Audit Trails**:
- Log all reference operations
- Track changes over time
- Record validation results
- Preserve historical state

## Advanced Features

**Automated Orphan Detection**:
- Scheduled scans for orphaned references
- Real-time detection on entity deletion
- Predictive orphan identification
- Automated cleanup workflows

**Intelligent Reference Reconstruction**:
- Reconstruct missing references from context
- Use entity metadata for matching
- Apply fuzzy matching for recovery
- Suggest probable matches for manual review

**Duplicate Consolidation**:
- Advanced duplicate detection algorithms
- Smart merging of duplicate metadata
- Conflict resolution strategies
- Preservation of historical data

**Comprehensive Validation**:
- Multi-level validation (format, existence, accessibility)
- Performance testing of reference resolution
- Security validation of access rights
- Periodic re-validation scheduling

## Data Protection

**Backup Before Modifications**:
- Automatic backup creation before repairs
- Versioned backup retention
- Quick restore capability
- Backup integrity verification

**Transaction-Based Operations**:
- Atomic reference updates
- Rollback on failure
- Transaction log maintenance
- Consistency guarantees

**Rollback Capabilities**:
- Undo recent changes
- Restore from backup points
- Selective rollback for specific entities
- Recovery procedures documentation

**Comprehensive Logging**:
- Detailed operation logs
- Error and warning tracking
- Performance metrics logging
- Audit trail for compliance

## Output

Complete reference management system including:
- Integrity reports with detailed health metrics
- Repair summaries showing all fixes applied
- Mapping visualizations with network diagrams
- Validation results with pass/fail details
- Comprehensive cross-platform link maintenance documentation
- Export files for backup and migration
- Recommendations for improving reference quality

</detailed_sequence_steps>

</task>
