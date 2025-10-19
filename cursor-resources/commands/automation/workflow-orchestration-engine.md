<task name="Workflow Orchestration Engine">

<task_objective>
Create and manage complex automation workflows with task dependency management, parallel execution, scheduling capabilities, and cross-platform support. This workflow enables building sophisticated automation pipelines with conditional logic, retry mechanisms, monitoring, and integration with external services like Docker, HTTP APIs, and databases.
</task_objective>

<detailed_sequence_steps>
# Workflow Orchestration Engine - Detailed Sequence of Steps

## 1. Workflow Discovery and Assessment

1. Analyze existing workflow infrastructure
   - Search for workflow definition files: `*.workflow.json`, `workflow.yml`, `Taskfile.yml`
   - Find workflow files using: `find . -name "*.workflow.json" -o -name "workflow.yml" -o -name "Taskfile.yml" | head -5`
   - List up to 5 most relevant workflow files

2. Check scheduling infrastructure
   - Review crontab entries with `crontab -l`
   - If no crontab found, note that scheduling needs setup
   - Identify any systemd timers on Linux systems

3. Examine running workflow processes
   - Search for active workflow processes: `ps aux | grep -E "(workflow|task|job)" | head -3`
   - Identify any hung or long-running workflow executions
   - Note resource usage of active workflows

4. Verify system capabilities
   - Check for Docker availability: `which docker`
   - Check for Node.js: `which node`
   - Check for Python: `which python3`
   - List all available execution environments

5. Load existing configuration
   - Read `.workflow-config.json` if exists
   - Check for `workflows/` directory structure
   - Load any existing workflow definitions

## 2. Workflow Operation Mode Selection

1. Determine requested operation from arguments
   - If workflow name provided: Manage/execute specific workflow
   - If `create` specified: Launch workflow creation wizard
   - If `run` specified: Execute existing workflow
   - If `schedule` specified: Set up workflow scheduling
   - If `monitor` specified: Display workflow execution metrics

2. Validate operation feasibility
   - Check permissions for requested operation
   - Verify required tools are available
   - Ensure dependencies are installed

## 3. Workflow Definition Creation

### When creating new workflow:

1. Define workflow metadata
   - Prompt for workflow name (kebab-case recommended)
   - Collect workflow version (semantic versioning)
   - Get workflow description and purpose
   - Determine workflow category (deployment, data processing, testing, etc.)

2. Configure workflow triggers
   - Select trigger type: manual, schedule, webhook, file_change
   - For schedule: Define cron expression
   - For file_change: Specify file patterns to watch
   - For webhook: Define endpoint path
   - Allow multiple trigger types if needed

3. Define workflow environment
   - Collect required environment variables
   - Set default values where appropriate
   - Configure environment-specific overrides
   - Note any sensitive variables for secret management

4. Design task structure
   - Prompt for task definitions (recommended 3-10 tasks)
   - For each task, define:
     - Unique task ID
     - Human-readable task name
     - Task type (shell, http, docker, javascript, python, conditional, parallel, loop)
     - Execution command or configuration
     - Timeout value in seconds

5. Configure task dependencies
   - For each task, identify prerequisite tasks
   - Build dependency graph to visualize execution flow
   - Validate no circular dependencies exist
   - Determine which tasks can run in parallel

6. Add error handling and retry logic
   - Configure retry attempts for each task
   - Set retry delay/backoff strategy
   - Define on_success callbacks
   - Define on_failure callbacks and rollback tasks

7. Set up notifications
   - Select notification channels (slack, email, webhook)
   - Configure on_completion notifications
   - Configure on_failure alerts
   - Set up notification templates

8. Generate and save workflow file
   - Create JSON workflow definition with all configuration
   - Validate JSON schema correctness
   - Save to `workflows/{workflow-name}.workflow.json`
   - Display workflow structure to user for review

## 4. Workflow Validation

1. Parse workflow definition file
   - Load workflow JSON and parse
   - Validate against workflow schema
   - Check all required fields are present

2. Validate task structure
   - Ensure all task IDs are unique
   - Verify task types are supported
   - Check all commands/scripts exist
   - Validate timeout values are reasonable

3. Check dependency graph
   - Build task dependency graph
   - Detect circular dependencies
   - Warn about potential bottlenecks
   - Verify all dependency references exist

4. Validate conditional logic
   - Check condition syntax for conditional tasks
   - Verify variables referenced in conditions exist
   - Validate boolean expressions

5. Check external dependencies
   - For Docker tasks: verify Docker is available
   - For HTTP tasks: validate URLs are well-formed
   - For script tasks: check scripts exist and are executable
   - For database tasks: verify connection strings format

## 5. Workflow Execution Engine

1. Initialize workflow execution
   - Generate unique execution ID
   - Record workflow start time
   - Set up execution context with environment variables
   - Initialize task state tracking (pending, running, completed, failed)

2. Build task execution plan
   - Create dependency graph from task definitions
   - Identify initial runnable tasks (no dependencies)
   - Calculate critical path through workflow
   - Estimate total execution time

3. Execute workflow tasks
   - While runnable tasks exist:
     - Get all tasks whose dependencies are satisfied
     - Execute runnable tasks (in parallel if multiple)
     - Monitor task execution status
     - Update task state upon completion
     - Check for failures and trigger error handlers

4. Handle task execution by type
   - For shell tasks: spawn process, capture stdout/stderr
   - For http tasks: make HTTP request, return response
   - For docker tasks: run Docker container
   - For javascript tasks: execute JS function or script
   - For python tasks: run Python script
   - For conditional tasks: evaluate condition, execute branch
   - For parallel tasks: execute sub-tasks concurrently
   - For loop tasks: iterate and execute task for each item

5. Implement timeout handling
   - Set timeout timer for each task
   - Kill task process if timeout exceeded
   - Log timeout error
   - Trigger on_failure callbacks for timeout

6. Implement retry mechanism
   - On task failure, check retry configuration
   - If retries remain, wait retry delay
   - Re-execute task
   - Increment retry counter
   - If all retries exhausted, mark task as failed

7. Handle task failures
   - Log failure details (error message, exit code, stderr)
   - Execute on_failure callbacks
   - Trigger rollback tasks if defined
   - Send failure notifications
   - Decide whether to stop workflow or continue

8. Handle task success
   - Log success details (stdout, exit code, duration)
   - Execute on_success callbacks
   - Mark dependent tasks as runnable
   - Continue workflow execution

9. Generate execution report
   - Compile execution statistics
   - Calculate total duration
   - List successful and failed tasks
   - Include task-level timing information
   - Save execution log to file

## 6. Advanced Task Type Implementation

### Shell Task Execution
1. Prepare shell execution environment
   - Set working directory (cwd)
   - Merge task environment with process environment
   - Configure stdout/stderr pipes

2. Spawn shell process
   - Use child_process spawn with sh -c
   - Stream output in real-time if live_output enabled
   - Capture stdout and stderr separately

3. Handle process completion
   - Detect process exit
   - Capture exit code
   - Return execution result with stdout, stderr, exitCode

### HTTP Task Execution
1. Prepare HTTP request
   - Set HTTP method (GET, POST, PUT, DELETE, etc.)
   - Configure request headers
   - Prepare request body if applicable
   - Set timeout value

2. Make HTTP request
   - Use axios or similar HTTP client
   - Handle authentication if configured
   - Follow redirects if needed

3. Process HTTP response
   - Capture status code
   - Extract response body
   - Save response headers
   - Return structured result

### Docker Task Execution
1. Prepare Docker configuration
   - Validate Docker is running
   - Build image if Dockerfile specified
   - Pull image if not available locally

2. Run Docker container
   - Configure container with environment variables
   - Mount volumes if needed
   - Set resource limits
   - Configure networking

3. Monitor container execution
   - Stream container logs
   - Wait for container completion
   - Capture exit code
   - Clean up container after execution

### Conditional Task Execution
1. Evaluate condition expression
   - Parse condition string
   - Substitute variables from execution context
   - Evaluate boolean expression

2. Execute appropriate branch
   - If condition true: execute then branch
   - If condition false: execute else branch
   - Return result from executed branch

### Parallel Task Execution
1. Launch all sub-tasks concurrently
   - Create promise for each sub-task
   - Start all tasks simultaneously
   - Track each task's progress

2. Handle parallel completion
   - If wait_for is "all": wait for all tasks to complete
   - If wait_for is "any": wait for first task to complete
   - If wait_for is "first": return first completed result
   - Handle timeout for entire parallel group

### Loop Task Execution
1. Iterate over items
   - For each item in items array
   - Set ${item} variable in context
   - Execute task definition with current item

2. Handle loop execution mode
   - If parallel: execute all iterations concurrently
   - If sequential: execute iterations one by one
   - If stop_on_failure: halt on first failure

## 7. Workflow Scheduling Setup

1. Determine scheduling mechanism
   - For Linux/Mac: use cron
   - For Linux with systemd: offer systemd timers
   - For Windows: suggest Task Scheduler
   - For cross-platform: implement internal scheduler

2. Generate cron expression
   - Parse schedule from workflow definition
   - Validate cron expression syntax
   - Explain schedule in human-readable format

3. Install cron job
   - Construct cron command with full paths
   - Set working directory correctly
   - Redirect output to log file
   - Add entry to crontab using `crontab -e` or programmatically

4. Set up systemd timer (Linux)
   - Generate .timer unit file
   - Generate .service unit file
   - Install to /etc/systemd/system/
   - Enable and start timer

5. Configure internal scheduler
   - Implement node-cron or similar library
   - Schedule workflow execution
   - Run scheduler as daemon or background service
   - Set up scheduler persistence

## 8. Workflow Monitoring and Metrics

1. Initialize monitoring system
   - Create metrics data structure
   - Track total runs, successes, failures
   - Calculate average duration
   - Store per-task metrics

2. Record workflow execution events
   - Log workflow start/completion
   - Update success/failure counters
   - Calculate and update average duration
   - Store execution details in history

3. Track task-level metrics
   - For each task, maintain:
     - Total runs
     - Failure count
     - Average duration
     - Last execution time
     - Success rate

4. Generate health reports
   - Calculate overall success rate
   - Identify problematic tasks with high failure rates
   - Detect performance degradation
   - Provide optimization recommendations

5. Display monitoring dashboard
   - Show workflow execution history
   - Display real-time running workflows
   - Show task-level statistics
   - Graph trends over time

## 9. Alerting and Notifications

1. Configure notification channels
   - Set up Slack webhook integration
   - Configure email SMTP settings
   - Set up custom webhook endpoints
   - Test notification delivery

2. Define alert triggers
   - Workflow failure
   - High failure rate threshold
   - Execution duration exceeds expected
   - Task timeout or repeated failures

3. Generate alert messages
   - Use notification templates
   - Substitute variables (workflow name, error, duration)
   - Include relevant context and logs
   - Provide actionable next steps

4. Send notifications
   - Route to configured channels
   - Implement retry for failed notifications
   - Log notification delivery status
   - Throttle alerts to prevent spam

## 10. Workflow Management CLI

1. Implement workflow commands
   - `workflow create`: Launch creation wizard
   - `workflow run <workflow-file>`: Execute workflow
   - `workflow schedule`: Set up scheduling
   - `workflow monitor`: Display live monitoring
   - `workflow history`: Show execution history
   - `workflow status <execution-id>`: Get status
   - `workflow validate <workflow-file>`: Validate definition
   - `workflow generate`: Generate from template
   - `workflow list`: List all workflows
   - `workflow delete <workflow>`: Remove workflow

2. Implement command-line argument parsing
   - Use commander, yargs, or similar CLI framework
   - Support global flags (verbose, quiet, config-file)
   - Provide help text for each command
   - Support command aliases

3. Implement interactive mode
   - Prompt for missing required arguments
   - Offer choices for enum-type options
   - Provide autocomplete for workflow names
   - Confirm destructive operations

## 11. Integration Capabilities

### Slack Integration
1. Configure Slack webhook URL from environment
2. Format message with workflow details
3. Post to specified channel
4. Include execution status and links

### Docker Integration
1. Build Docker images from Dockerfile
2. Run containers with custom configuration
3. Mount volumes for file access
4. Capture container logs and exit codes
5. Clean up containers and images

### Database Integration
1. Connect to database using connection string
2. Execute SQL migrations from files
3. Run database queries or procedures
4. Handle transactions properly
5. Implement rollback on failure

### File Processing Integration
1. Watch for file changes using chokidar
2. Trigger workflows on file modifications
3. Process files in batches
4. Transform and output to destination

## 12. Error Recovery and Cleanup

1. Implement graceful shutdown
   - Catch SIGINT and SIGTERM signals
   - Allow running tasks to complete
   - Save workflow state
   - Clean up temporary resources

2. Implement cleanup procedures
   - Remove temporary files and directories
   - Stop Docker containers
   - Close database connections
   - Release file locks

3. Save workflow state for recovery
   - Persist execution state to disk
   - Enable workflow resume after crash
   - Implement checkpoint mechanism

4. Provide rollback capabilities
   - Define rollback tasks in workflow
   - Execute rollback on critical failures
   - Restore system to pre-workflow state

## Workflow Schema Example

```json
{
  "name": "deployment-workflow",
  "version": "1.0.0",
  "description": "Complete deployment automation",
  "trigger": {
    "type": "schedule",
    "config": {
      "schedule": "0 2 * * *"
    }
  },
  "environment": {
    "NODE_ENV": "production",
    "LOG_LEVEL": "info"
  },
  "tasks": [
    {
      "id": "pre-build",
      "name": "Pre-build validation",
      "type": "shell",
      "command": "npm run validate",
      "timeout": 300,
      "retry": {
        "attempts": 3,
        "delay": 5000
      }
    },
    {
      "id": "build",
      "name": "Build application",
      "type": "shell",
      "command": "npm run build",
      "depends_on": ["pre-build"],
      "timeout": 600
    },
    {
      "id": "deploy",
      "name": "Deploy to staging",
      "type": "shell",
      "command": "npm run deploy:staging",
      "depends_on": ["build"],
      "on_success": ["notify-success"],
      "on_failure": ["rollback", "notify-failure"]
    }
  ],
  "notifications": {
    "channels": ["slack", "email"],
    "on_completion": true,
    "on_failure": true
  }
}
```

</detailed_sequence_steps>

</task>

