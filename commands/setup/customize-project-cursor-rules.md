# Customize Project Cursor Rules

Automatically customize the generic Cursor rules with your project-specific details, replacing placeholders with actual project names, imports, and configurations.

**Agent Instructions:**
You are an AI agent tasked with customizing generic Cursor rules for a specific project. You MUST iterate through all rule files and systematically replace generic placeholders with project-specific details. Only terminate when all rules have been successfully customized and verified.

**Key Principles for Your Operation:**
1. **Persistence & Task Completion:** Continue working until all generic placeholders are replaced with project-specific details across all rule files.
2. **Systematic Approach:** Process each rule file methodically, ensuring no placeholders are missed.
3. **Validation:** Verify that all replacements are consistent and make sense in context.
4. **User Confirmation:** Get user approval for critical project details before making changes.

## Workflow Steps

### 1. Gather Project Information
**Plan:** Collect all necessary project-specific details from the user to replace generic placeholders.

**Execute:** Ask the user for the following information:
- **Project Name:** What is your project's name? (e.g., "my-awesome-app")
- **Organization/Owner:** GitHub organization or username (e.g., "mycompany")
- **Repository Name:** GitHub repository name (e.g., "my-awesome-app")
- **Linear Ticket Prefix:** Linear ticket format (e.g., "PROJ", "APP", "TASK")
- **Main API Module:** Primary API module name (e.g., "my_app_api", "core_api")
- **Web Service Name:** Frontend service name (e.g., "my-app-web", "frontend")
- **Logging Framework:** Logging approach ("standard", "structlog", "custom")
- **Kubernetes Namespace:** K8s namespace for local development (e.g., "my-app-dev")
- **Design System Path:** Path to design system/theme (e.g., "src/design-system")

**Reflect:** Ensure all required information is collected and validate that the details are consistent.

### 2. Create Replacement Mapping
**Plan:** Create a comprehensive mapping of all generic placeholders to project-specific values.

**Execute:** Build replacement mappings:
```
Generic Placeholder → Project-Specific Value
your_project → {project_name}
your-api → {api_module}
your-web → {web_service}
PROJ-123 → {linear_prefix}-123
{owner}/{repo} → {organization}/{repository}
<your-namespace> → {kubernetes_namespace}
your design system → {design_system_path}
proj-929 → {linear_prefix}-929
```

**Reflect:** Verify the mapping covers all placeholders found in the previous analysis.

### 3. Process Rule Files Systematically
**Plan:** Go through each rule file in the `.cursor/rules/` directory and apply the replacements.

**Execute:** For each rule file:
1. **Read the current file content**
2. **Apply all relevant replacements** based on the mapping
3. **Verify replacements make sense in context**
4. **Update the file with customized content**
5. **Log what was changed for user review**

**Categories to process:**
- `languages/essential-python-rules-auto.mdc`
- `languages/essential-typescript-rules-auto.mdc`
- `frameworks/tool-creation-standards-auto.mdc`
- `frameworks/sse-streaming-standards-auto.mdc`
- `frameworks/langgraph-agent-creation-auto.mdc`
- `testing/testing-conventions-always.mdc`
- `tools/kubernetes-debugging-agent-intelligent.mdc`

**Reflect:** Ensure each file has been properly customized and no generic placeholders remain.

### 4. Process Command Files
**Plan:** Update command files in `.cursor/commands/` with project-specific details.

**Execute:** Process these command files:
- `update-linear-from-release.md`
- `decompose-pr.md`
- Any other commands with generic placeholders

**Apply replacements for:**
- Repository references
- Linear ticket formats
- Branch naming conventions
- API module paths

**Reflect:** Verify command files are properly customized for the project.

### 5. Handle Special Cases
**Plan:** Address specific customizations that may need special handling.

**Execute:**
- **Logging Framework:** If user specified "structlog" or custom logging, provide appropriate import patterns
- **Monorepo Structure:** If project uses monorepo, adjust path references accordingly
- **Custom Design System:** Update TypeScript rules with actual design system import paths
- **Kubernetes Context:** Ensure K8s debugging rules use correct context and namespace

**Reflect:** Confirm special cases are handled appropriately for the project structure.

### 6. Validate and Summary
**Plan:** Perform final validation and provide comprehensive summary of changes.

**Execute:**
1. **Scan all modified files** for any remaining generic placeholders
2. **Check for consistency** across all rule files
3. **Generate summary report** of all changes made
4. **List any manual steps** the user needs to complete

**Reflect:** Ensure the customization is complete and the user has all information needed.

## Project Information Collection

### Required Information
Ask the user to provide these details:

1. **Project Identity:**
   - Project name (for imports and references)
   - GitHub organization/owner
   - Repository name

2. **Development Setup:**
   - Linear ticket prefix (e.g., "PROJ", "APP")
   - Main API module name
   - Frontend service name
   - Kubernetes namespace for local dev

3. **Technical Stack:**
   - Logging approach (standard/structlog/custom)
   - Design system location
   - Monorepo structure (if applicable)

### Replacement Patterns

**Python Imports:**
```python
# Generic
from your_project.common import tracing
from your_project.streams import BaseSSEStream

# Customized
from {project_name}.common import tracing
from {project_name}.streams import BaseSSEStream
```

**Linear Tickets:**
```
# Generic
PROJ-123, proj-456, Proj-789

# Customized  
{PREFIX}-123, {prefix}-456, {Prefix}-789
```

**Repository References:**
```bash
# Generic
gh api repos/{owner}/{repo}/compare/

# Customized
gh api repos/{organization}/{repository}/compare/
```

**Branch Naming:**
```bash
# Generic
proj-929-1-database

# Customized
{prefix}-929-1-database
```

## Validation Checklist

After customization, verify:
- [ ] All `your_project` references replaced
- [ ] All `PROJ-123` ticket formats updated
- [ ] All `{owner}/{repo}` patterns customized
- [ ] All `<your-namespace>` placeholders filled
- [ ] All path references match project structure
- [ ] Logging imports match chosen framework
- [ ] Design system paths are correct
- [ ] No generic placeholders remain

## Success Criteria

The customization is complete when:
✅ **All Generic Placeholders Replaced:** No "your_project", "PROJ-123", etc. remain
✅ **Consistent Project Identity:** All references use the same project name/format
✅ **Valid Import Paths:** All Python/TypeScript imports match actual project structure
✅ **Correct Repository Info:** GitHub references point to actual repo
✅ **Proper Linear Format:** Ticket patterns match project's Linear setup
✅ **Working Kubernetes Config:** Namespace and context are project-specific
✅ **Complete Documentation:** User has summary of all changes made

## Example Interaction

```
Agent: I'll help you customize the Cursor rules for your project. Let me gather some information:

1. What is your project name? (used for imports like "my_app.common")
User: "inventory_system"

2. What's your GitHub organization/username?
User: "acme-corp"

3. What's your repository name?
User: "inventory-management"

4. What's your Linear ticket prefix? (e.g., "INV", "PROJ")
User: "INV"

5. What's your main API module name?
User: "inventory_api"

[Continue gathering info...]

Agent: Perfect! I'll now customize all rules with these details:
- Project: inventory_system
- Repo: acme-corp/inventory-management  
- Tickets: INV-123 format
- API: inventory_api
[Proceeds with systematic replacement...]
```

This command ensures your generic Cursor rules become perfectly tailored to your specific project, making them immediately useful without any manual find-and-replace work.
