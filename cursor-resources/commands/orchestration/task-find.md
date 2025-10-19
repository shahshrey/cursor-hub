<task name="Task Find">

<task_objective>
Search and locate tasks across all orchestrations using various criteria including task ID, content, status, dependencies, and metadata. The workflow provides powerful search functionality with regex support, fuzzy matching, boolean operators, and field-specific queries, scanning all task files in the `/task-orchestration/` directory tree and returning formatted results with task details, location paths, and optional export capabilities for integration with other commands.
</task_objective>

<detailed_sequence_steps>
# Task Find - Detailed Sequence of Steps

## 1. Parse Search Query

1. Identify search mode based on input:
   - Task ID pattern: `TASK-001`, `TASK-*`, `TASK-0[0-9]{2}`
   - Text search: `"authentication"`, `"payment processing"`
   - Field-specific: `title:"user auth"`, `agent:dev-frontend`, `blocks:TASK-001`
   - Boolean: `"auth AND login"`, `"payment OR billing"`, `"security NOT test"`
   - Regex: `--regex "JWT|OAuth"`
   - Fuzzy: `--fuzzy "autentication"`

2. Extract filter options from flags:
   - `--status in_progress`: Status filter
   - `--priority high`: Priority filter
   - `--type feature`: Type filter
   - `--agent dev-backend`: Agent filter
   - `--created-after yesterday`: Date filter
   - `--orchestration "03_15_2024/auth_*"`: Orchestration filter

3. Extract special search flags:
   - `--has-dependencies`: Only tasks with dependencies
   - `--no-dependencies`: Only independent tasks
   - `--blocking-others`: Tasks blocking other tasks
   - `--circular-deps`: Find circular dependency chains
   - `--orphaned`: Tasks without references
   - `--duplicates`: Find duplicate tasks
   - `--stale --days 7`: Tasks unchanged for 7+ days
   - `--ready`: Tasks ready to start (no blockers)
   - `--critical-path`: Tasks on critical path

4. Determine output format:
   - Default: List view
   - `--detailed`: Full task content
   - `--tree --root TASK-001`: Dependency tree
   - `--export paths`: File paths only
   - `--export csv`: CSV format
   - `--report`: Detailed report file

## 2. Build Search Index

1. Scan `/task-orchestration/` directory recursively

2. For each orchestration found (`MM_DD_YYYY/project_name/`):
   - Check if matches `--orchestration` filter
   - If no filter or matches, include in search scope

3. For each status folder (todos, in_progress, on_hold, qa, completed):
   - List all task files (*.md format)

4. Load task metadata from each file:
   - Parse frontmatter or structured sections
   - Extract: Task ID, title, description, status, agent, priority, type, created date, modified date, dependencies, blocks, effort estimate

5. Build in-memory index of all tasks with:
   - Task ID → full task data mapping
   - Title/description → task ID mapping (for text search)
   - Agent → task ID list mapping
   - Status → task ID list mapping
   - File path → task ID mapping

6. Load TASK-STATUS-TRACKER.yaml files for additional metadata if needed

## 3. Apply Search Filters

1. Start with all indexed tasks as candidate set

2. Apply orchestration filter if specified:
   - Match orchestration path pattern
   - Remove tasks from non-matching orchestrations

3. Apply status filter (`--status in_progress,qa`):
   - Keep only tasks with matching status
   - Support comma-separated list with OR logic

4. Apply agent filter (`--agent dev-frontend`):
   - Keep only tasks assigned to specified agent

5. Apply priority filter (`--priority high`):
   - Keep only tasks with matching priority

6. Apply type filter (`--type feature,bugfix`):
   - Keep only tasks with matching type

7. Apply date range filters:
   - `--created "2024-03-10..2024-03-15"`: Tasks created in range
   - `--modified "last 3 days"`: Tasks modified recently
   - `--completed "this week"`: Tasks completed this week

8. Apply relationship filters:
   - `--depends-on TASK-001`: Tasks that depend on TASK-001
   - `--blocks TASK-005`: Tasks that block TASK-005
   - `--related-to TASK-003`: Tasks with any relationship to TASK-003

9. Apply property filters:
   - `--has-dependencies`: Tasks with non-empty dependencies list
   - `--no-dependencies`: Tasks with empty dependencies list
   - `--blocking-others`: Tasks referenced in other tasks' dependencies
   - `--effort ">4h"`: Tasks with effort estimate greater than 4 hours

## 4. Execute Content Search

1. If text search query provided (`"authentication"`):
   - Search in task title (case-insensitive by default)
   - Search in task description
   - Search in implementation notes
   - Keep tasks with any match

2. If regex search (`--regex "JWT|OAuth"`):
   - Compile regex pattern
   - Apply to title and description fields
   - Keep tasks matching regex

3. If fuzzy search (`--fuzzy "autentication"`):
   - Calculate Levenshtein distance or similar algorithm
   - Keep tasks with similarity score above threshold (e.g., 80%)
   - Sort results by similarity score

4. If boolean search (`"auth AND login"`):
   - Parse boolean expression
   - For AND: Keep tasks matching all terms
   - For OR: Keep tasks matching any term
   - For NOT: Exclude tasks matching term

5. If field-specific search (`title:"user authentication"`):
   - Extract field name and search term
   - Search only in specified field
   - Support fields: title, description, agent, blocks, depends_on, type, priority

6. If task ID pattern search (`TASK-*` or `TASK-0[0-9]{2}`):
   - Match pattern against task IDs
   - Support wildcards and regex

## 5. Apply Special Search Logic

1. If `--circular-deps` flag:
   - Build dependency graph from all tasks
   - Run cycle detection algorithm (DFS with back edges)
   - Return tasks involved in circular dependencies
   - Show dependency chain for each cycle

2. If `--orphaned` flag:
   - Find tasks not referenced in any orchestration coordination files
   - Find tasks without any dependencies or dependents
   - Return isolated tasks

3. If `--duplicates` flag:
   - Compare task titles for similarity (fuzzy matching)
   - Compare task descriptions
   - Group similar tasks (>90% similarity)
   - Return potential duplicates with similarity scores

4. If `--stale --days 7` flag:
   - Check last modified timestamp
   - Return tasks unchanged for more than specified days
   - Exclude completed tasks

5. If `--ready` flag:
   - Check task status is todos
   - Verify all dependencies are in completed status
   - Return tasks ready to start with no blockers

6. If `--critical-path` flag:
   - Load dependency graph
   - Calculate critical path using longest path algorithm
   - Return tasks on critical path

7. If `--high-impact` flag:
   - Count how many tasks each task blocks
   - Return tasks blocking 2+ other tasks
   - Sort by block count descending

## 6. Sort and Rank Results

1. Determine sort order:
   - Default: Relevance score (for text search) or task ID order
   - `--sort created`: Sort by creation date
   - `--sort modified`: Sort by last modified date
   - `--sort priority`: Sort by priority level
   - `--sort effort`: Sort by effort estimate

2. Calculate relevance scores for text searches:
   - Title match: higher score
   - Description match: medium score
   - Implementation notes match: lower score
   - Multiple matches: additive score

3. Apply sort to results list

4. If `--limit N` specified, keep only first N results

5. If `--recent 10` shortcut used, sort by modified date and limit to 10

## 7. Format Output

1. For default list view:
   - Show task ID, title, status, agent, created date
   - Show file location path
   - Include key metadata (priority if high, blocked status)
   - Format: `TASK-001: Implement JWT authentication`
              `  Status: in_progress | Agent: dev-frontend | Created: 2024-03-15`
              `  Location: /task-orchestration/03_15_2024/auth_system/tasks/in_progress/`

2. For detailed view (`--detailed`):
   - Show full task file content
   - Include all metadata fields
   - Show complete description and implementation notes
   - Display dependency list with task titles
   - Show status history

3. For tree view (`--tree --root TASK-001`):
   - Build dependency tree starting from root task
   - Use ASCII art for tree structure:
     ```
     TASK-001: JWT Implementation
     ├── TASK-005: User Profile API (depends on TASK-001)
     │   └── TASK-010: Profile UI (depends on TASK-005)
     └── TASK-007: Session Management (depends on TASK-001)
     ```

4. Apply terminal formatting:
   - Use colors if terminal supports (green for completed, yellow for in_progress, red for on_hold)
   - Use unicode box characters if supported
   - Fall back to ASCII if needed

## 8. Export Results (if requested)

1. If `--copy` flag:
   - Format results as plain text
   - Copy to system clipboard using pbcopy (macOS) or xclip (Linux)

2. If `--export paths` flag:
   - Extract file path for each result task
   - Output paths one per line
   - Suitable for piping to other commands

3. If `--export csv` flag:
   - Generate CSV with columns: TaskID, Title, Status, Agent, Priority, Type, Created, Modified, Location
   - Write to file: `task-search-results-{timestamp}.csv`

4. If `--report` flag:
   - Generate comprehensive markdown report file
   - Include search query, filters used, result count
   - Detailed information for each task
   - Save to: `task-search-report-{timestamp}.md`

## 9. Support Command Chaining

1. If pipe operator detected (for future shell integration):
   - Output task IDs in machine-readable format
   - Support piping to other commands:
     - `/task-find "payment" --status todos | /task-move in_progress`
     - `/task-find --filter "priority:low" | /task-update priority:medium`

2. Return exit code:
   - 0 if results found
   - 1 if no results found
   - 2 if error occurred

## 10. Save Search (if requested)

1. If `--save "search-name"` flag:
   - Save search query and all filters to configuration file
   - Store in: `~/.cursor/task-searches/search-name.yaml`

2. If `--load "search-name"` flag:
   - Load saved search from configuration
   - Apply same query and filters
   - Execute search with loaded parameters

</detailed_sequence_steps>

</task>

