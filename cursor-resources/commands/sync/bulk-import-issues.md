<task name="Bulk Import Issues">

<task_objective>
Bulk import GitHub issues to Linear with comprehensive progress tracking and error handling. Execute efficient bulk import of GitHub issues to Linear workspace with advanced filtering, batch processing, rate limit management, data transformation, and comprehensive error recovery. The output will be complete import results with success metrics, failed item reports, mapping documentation, and performance analytics for large-scale issue migration.
</task_objective>

<how_to_ask_followup_question>
<question>What scope of issues would you like to import?</question>
<options>["All open issues", "Issues by state (open/closed/all)", "Issues by specific labels", "Issues by milestone", "Custom batch configuration"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Bulk Import Issues - Detailed Sequence of Steps

## Prerequisites and Context

**Available Tools**: Read, Write, Edit, Bash

**Argument Options**: [import-scope] | --state | --label | --milestone | --batch-size

**Model**: sonnet

## Current Import Context

- Repository: !`gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "No repo context"`
- Issue count: !`gh api repos/{owner}/{repo}/issues?state=all --paginate | jq length 2>/dev/null || echo "Check manually"`
- Linear teams: Check available Linear teams and projects for import mapping
- Rate limits: !`gh api rate_limit -q '.rate | "GitHub: \(.remaining)/\(.limit)"' 2>/dev/null || echo "Check GitHub rate limit"`

## 1. Pre-Import Analysis

Analyze and prepare for bulk import operation:

**Issue Discovery**:
- Query GitHub issues based on filter criteria from $ARGUMENTS
- Apply state filters (open, closed, all)
- Filter by labels, milestones, assignees as specified
- Calculate total issue count and estimate import time

**Duplicate Detection**:
- Search existing Linear workspace for matching issues
- Check for previous imports using GitHub issue URLs
- Identify issues already synced to prevent duplication
- Build skip list for already imported items

**Import Estimation**:
- Calculate total API calls required
- Estimate time based on rate limits and batch size
- Project resource utilization and completion time
- Provide user with import plan and confirmation prompt

**Resource Planning**:
- Check GitHub API rate limit availability
- Verify Linear API access and rate limits
- Assess database or state storage requirements
- Ensure adequate error logging capacity

## 2. Batch Configuration

Configure optimal batch processing:

**Dynamic Batch Sizing**:
- Calculate optimal batch size based on rate limits
- Adjust batch size based on API response times
- Balance between speed and reliability
- Consider issue complexity and content size

**Rate Limit Management**:
- Monitor GitHub and Linear API rate limits
- Implement exponential backoff for rate limit errors
- Queue operations when approaching limits
- Resume automatically when limits reset

**Progress Tracking**:
- Initialize progress counter and metrics
- Set up real-time progress reporting
- Track success and failure counts
- Estimate remaining time dynamically

**Error Handling**:
- Configure retry logic with maximum attempts
- Set up error categorization (transient vs permanent)
- Define fallback strategies for different error types
- Initialize error log and failed item tracking

## 3. Data Transformation

Transform GitHub issue data to Linear format:

**Field Mapping**:
- Map GitHub title to Linear task title
- Convert issue body to Linear description format
- Transform GitHub metadata to Linear equivalents
- Preserve all relevant timestamps and identifiers

**Priority Inference**:
- Analyze labels for priority indicators (urgent, high, low)
- Consider issue age and activity level
- Map to Linear priority levels (No Priority, Low, Medium, High, Urgent)
- Apply team-specific priority rules

**User Mapping**:
- Map GitHub usernames to Linear users by email or username
- Handle unmapped users with fallback strategies
- Preserve original assignee information in description
- Notify about unmapped users for manual resolution

**Content Enhancement**:
- Add GitHub issue reference at top of description
- Append metadata section with original issue details
- Include links to original GitHub issue
- Preserve code blocks and formatting

## 4. Import Execution

Execute the bulk import with monitoring:

**Parallel Processing**:
- Process multiple issues concurrently within rate limits
- Maintain connection pool for API efficiency
- Balance load across available resources
- Monitor system resource utilization

**Retry Logic**:
- Implement exponential backoff for failed operations
- Retry transient failures automatically
- Skip permanent failures after max retries
- Log all retry attempts with reasons

**Transaction Management**:
- Track each import operation with unique identifier
- Maintain import state for resume capability
- Implement checkpoint mechanism for large imports
- Enable rollback for critical failures

**Progress Reporting**:
- Display real-time progress bar or percentage
- Show current/total issues processed
- Report success and failure counts
- Provide estimated time remaining

## 5. Error Recovery

Handle failures and partial imports:

**Failed Item Handling**:
- Collect all failed items with error details
- Categorize failures by error type
- Generate detailed error report
- Provide retry instructions for failed items

**Retry Mechanisms**:
- Automatic retry for transient errors
- Manual retry option for specific items
- Batch retry for all failed items
- Smart retry with adjusted parameters

**Partial Import Recovery**:
- Resume from last successful checkpoint
- Skip already imported items
- Continue with remaining issues
- Maintain consistency across resume operations

**Validation**:
- Verify each created Linear task
- Validate field mappings and content
- Check cross-reference creation
- Report validation failures

## 6. Post-Import Actions

Complete the import process:

**Cross-Reference Creation**:
- Create bidirectional references between GitHub and Linear
- Update GitHub issues with Linear task links (if enabled)
- Maintain mapping database for future syncs
- Enable navigation between platforms

**GitHub Updates**:
- Add comment to GitHub issues with Linear task reference
- Apply labels to indicate Linear sync status
- Update issue description with Linear link (optional)
- Close GitHub issues if specified in arguments

**Mapping Files**:
- Generate comprehensive mapping document
- Create JSON mapping file for programmatic access
- Include all imported issues with Linear IDs
- Document failed imports with reasons

**Notifications**:
- Send completion notification with summary
- Alert on significant failure rates
- Provide access to detailed reports
- Share mapping documentation location

## Advanced Features

**Dynamic Batch Adjustment**:
- Real-time batch size optimization
- Adaptive rate limiting based on API responses
- Performance-based throughput tuning
- Automatic scaling for large imports

**Intelligent Rate Limiting**:
- Predictive rate limit management
- Pre-emptive throttling to avoid limits
- Multi-API rate limit coordination
- Smart queuing for optimal throughput

**Duplicate Detection**:
- Content-based similarity matching
- URL-based duplicate detection
- Title and description fuzzy matching
- User confirmation for potential duplicates

**Comprehensive Error Recovery**:
- Automatic recovery from network errors
- Checkpoint-based resume capability
- Failed item isolation and retry
- Transaction rollback for critical errors

**Progress Visualization**:
- Real-time progress dashboard
- Success/failure rate charts
- Performance metrics display
- Estimated completion time

## Quality Assurance

**Pre-Import Validation**:
- Verify API connectivity
- Validate filter criteria
- Check team and project assignments
- Confirm duplicate handling strategy

**Post-Import Verification**:
- Count verification (imported vs expected)
- Sample content validation
- Cross-reference integrity check
- User mapping accuracy verification

**Data Integrity Checks**:
- Verify all required fields populated
- Check formatting preservation
- Validate relationship mappings
- Ensure metadata accuracy

**Comprehensive Audit Trails**:
- Log all import operations
- Track all API calls and responses
- Record all errors and resolutions
- Maintain complete import history

## Output

Complete import results including:
- Success metrics (total imported, success rate, timing)
- Failed item reports with detailed error information
- Mapping documentation (JSON and human-readable formats)
- Performance analytics (throughput, API usage, timing breakdown)
- Recommendations for future imports or improvements

</detailed_sequence_steps>

</task>
