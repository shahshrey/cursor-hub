<task name="GitHub Actions Local Runner">

<task_objective>
Execute GitHub Actions workflows locally using act to test and debug CI/CD pipelines before pushing to GitHub. This workflow validates workflow syntax, verifies Docker environment setup, selects and runs specific workflows with appropriate secrets and configurations, and provides debugging capabilities for troubleshooting workflow issues.
</task_objective>

<detailed_sequence_steps>
# GitHub Actions Local Runner - Detailed Sequence of Steps

## 1. Environment Verification

1. Check if act is installed on the system
   - Run `act --version` to verify installation
   - If not installed, provide installation instructions for the user's platform
   - Verify installation was successful

2. Verify Docker is running and accessible
   - Run `docker --version` to check Docker installation
   - Check Docker daemon status
   - Ensure Docker has sufficient resources allocated

3. Locate available workflow files
   - Search for workflows in `.github/workflows/` directory
   - List all `.yml` and `.yaml` files found
   - Display workflow names and triggers to user

4. Check for act configuration file
   - Look for `.actrc` file in project root
   - If exists, display current configuration
   - Note any custom runner images or settings

## 2. Workflow Selection and Analysis

1. Determine which workflow to execute
   - If workflow name provided in arguments, validate it exists
   - If no workflow specified, present list of available workflows
   - Allow user to select from available options

2. Analyze selected workflow structure
   - Parse workflow file to identify jobs and steps
   - Identify required secrets and environment variables
   - Check for platform-specific runners or requirements
   - Note any workflow dependencies or artifacts

3. Identify trigger events
   - Determine workflow triggers (push, pull_request, workflow_dispatch, etc.)
   - Select appropriate event type for local execution
   - Map local execution context to workflow triggers

## 3. Secret and Configuration Management

1. Locate secret sources
   - Check for `.env` file in project root
   - Look for `.secrets` file if it exists
   - Identify secrets required by workflow

2. Validate secret availability
   - Compare required secrets with available secret sources
   - Warn user about any missing secrets
   - Provide guidance on creating necessary secret files

3. Prepare execution environment
   - Set up environment variables from `.env` file
   - Configure secret file path for act execution
   - Ensure proper permissions on secret files

## 4. Workflow Execution

1. Construct act command with appropriate flags
   - Use `workflow_dispatch` event for manual triggers
   - Specify workflow file with `-W` flag if needed
   - Include `--secret-file` flag if secrets are required
   - Add platform flags for runner compatibility

2. Execute the workflow locally
   - Run act command with constructed parameters
   - Stream output to console in real-time
   - Monitor execution progress through each job and step

3. Capture execution results
   - Track success/failure of each job
   - Log any errors or warnings
   - Record execution duration and resource usage

## 5. Debugging and Troubleshooting

1. If execution fails, provide debugging options
   - Suggest running with `--verbose` flag for detailed logs
   - Recommend `--dry-run` to validate without execution
   - Use `--list` to show all available actions

2. Analyze error messages
   - Parse act output for specific error types
   - Identify common issues (missing secrets, Docker problems, syntax errors)
   - Provide actionable solutions for each error type

3. Offer iterative debugging workflow
   - Allow re-running with additional flags
   - Enable step-by-step debugging if needed
   - Support testing individual jobs within workflow

## 6. Results and Recommendations

1. Present execution summary
   - Show which jobs succeeded or failed
   - Display total execution time
   - Highlight any warnings or issues encountered

2. Provide workflow optimization suggestions
   - Identify slow steps that could be optimized
   - Suggest caching strategies
   - Recommend improvements to workflow structure

3. Document findings
   - Save execution logs if requested
   - Generate summary report of local test
   - Provide next steps for workflow refinement

## Example Commands Reference

```bash
act --list

act workflow_dispatch -W .github/workflows/ci.yml

act --secret-file .env

act --verbose --dry-run

act -j test --secret-file .secrets

act push -W .github/workflows/deploy.yml --env ENVIRONMENT=staging
```

</detailed_sequence_steps>

</task>

