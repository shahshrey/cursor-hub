<task name="External Documentation Context Loader">

<task_objective>
Load and process external documentation context from llms.txt files or custom sources. Input: External URLs (Xatu data repository or custom sources), project context, and local cache status. Processing: Validate URL accessibility, download and cache content, process and structure information. Output: Loaded external documentation context integrated with project context and cached locally for offline access.
</task_objective>

<detailed_sequence_steps>

## 1. Assess Current Context Status

1. Check network access: `curl -s --connect-timeout 5 https://httpbin.org/status/200 >/dev/null && echo "✅ Available" || echo "❌ Limited"`

2. Check for existing context in local llms.txt or documentation cache

3. Identify project type from @package.json or @README.md to detect context needs

## 2. Determine Data Source

1. If no custom source specified, use default Xatu data repository

2. Validate custom URL if provided as argument

3. Check accessibility and format of specified source

## 3. Load Default Xatu Data (Default Action)

1. Execute curl command to load llms.txt from Xatu repository:
   ```bash
   curl -s https://raw.githubusercontent.com/ethpandaops/xatu-data/refs/heads/master/llms.txt
   ```

2. Display retrieved content to user

## 4. Load Custom Source (When Specified)

1. Validate URL accessibility using curl or similar tool

2. Download content from custom URL

3. Verify content format and structure

## 5. Process Retrieved Content

1. Apply processing based on specified option:
   - **Raw loading**: Direct content retrieval and display
   - **Validation**: Check content format and structure
   - **Integration**: Merge with existing project documentation
   - **Caching**: Store locally for offline access

## 6. Cache Content Locally

1. Create local cache directory if it doesn't exist

2. Save retrieved content to local file with timestamp

3. Set up cache expiration or refresh policies

## 7. Integrate with Project Context

1. Parse loaded content structure

2. Identify relevant sections for current project

3. Merge with existing project documentation

4. Update project context references

## 8. Validate Loaded Content

1. Check content completeness and integrity

2. Verify format compatibility with project needs

3. Validate links and references within loaded content

4. Report any validation issues or warnings

## 9. Provide Offline Access

1. Verify cached content is accessible without network

2. Document cache location for future reference

3. Set up cache update procedures

4. Create fallback mechanisms for failed loads

</detailed_sequence_steps>

</task>
