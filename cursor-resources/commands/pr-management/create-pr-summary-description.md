<task name="Create PR Summary Description">

<task_objective>
Generate a concise yet thorough Pull Request summary for co-workers by analyzing the git diff between the current branch and main. The output will be a well-structured markdown document highlighting key changes, PR purpose, and areas requiring reviewer attention to facilitate effective code review.
</task_objective>

<detailed_sequence_steps>
# Create PR Summary Description - Detailed Sequence of Steps

## Overview

You are tasked with generating a Pull Request summary for co-workers to facilitate effective code review. Your summary should be:
- Concise but thorough
- Focused on significant changes
- Clear about PR's purpose
- Highlighting areas needing special attention

**Key Principles:**
1. **Persistence**: Keep going until PR summary is completely generated
2. **Tool Usage**: Use tools to read files and gather information - don't guess
3. **Planning & Reflection**: Plan before each action, reflect on outcomes
4. **Relevance**: Prioritize information that helps reviewers understand impact
5. **Clarity and Brevity**: Easy to read and to the point

## 1. Prepare the Environment

1. Identify the main comparison branch name (typically `main`):
   - If unsure, confirm with the user

2. Fetch latest updates from origin:
   ```bash
   git fetch origin <MAIN_BRANCH_NAME>
   ```

3. Confirm the fetch was successful.

4. Identify the current branch name:
   ```bash
   git rev-parse --abbrev-ref HEAD
   ```

5. Store the current branch name (e.g., `CURRENT_BRANCH_NAME`).

6. Verify the current branch name was retrieved successfully.

## 2. Gather Changes

1. Get summary of changes:
   ```bash
   git diff origin/<MAIN_BRANCH_NAME>...<CURRENT_BRANCH_NAME> --stat | cat
   ```

2. Get full diff:
   ```bash
   git diff origin/<MAIN_BRANCH_NAME>...<CURRENT_BRANCH_NAME> | cat
   ```

3. Use correct `origin/<MAIN_BRANCH_NAME>` and retrieved `CURRENT_BRANCH_NAME`.

4. Pipe to `cat` to avoid pager issues.

5. Verify that both stat and full diff outputs were captured successfully.

## 3. Analyze Changes for Co-worker Summary

Analyze the diff output focusing on:

### Overall Purpose and Intent
- What does this PR aim to achieve?
- What problem does it solve?
- What value does it provide?

### Major Changes
- New features added
- Significant refactors
- Architectural changes
- Breaking changes

### Key Files/Modules Affected
- Which files were modified?
- Nature of changes within them
- Impact on system architecture

### Areas of Complexity
- Notable complexity
- Potential risk areas
- Non-obvious logic
- Intricate implementations

### Potential Issues
- Possible bugs
- Unhandled edge cases
- Performance concerns
- Security considerations

### Dependencies
- Dependencies on other PRs
- Upcoming changes needed
- External dependencies

### Filter Minor Changes
- Typo fixes
- Comment changes
- Minor style adjustments
- Unless part of broader important change

Synthesize findings into key points for the summary.

## 4. Generate PR Summary for Co-workers

Create a well-structured markdown document with the following sections:

### PR Purpose (High-Level)

Start with 1-2 sentences explaining what the PR aims to achieve.

**Example:**
```markdown
### PR Purpose
This PR introduces a new caching mechanism for user profiles to improve login speed.
```

### Key Changes

Use bullet points to highlight the most important modifications. Focus on *what* changed and *why* it's relevant for review.

**Examples:**
```markdown
### Key Changes
- Adds `UserProfileCache` service in `services/cache.py`
- Refactors `AuthController` to use the new cache
- Modifies database schema for `users` table to include `last_cached_at` (see `migrations/XXXX_add_last_cached_at.py`)
```

### Areas for Reviewer Attention

Point out specific files, modules, or logic that warrant closer inspection. Mention complex or risky parts, or where feedback is specifically sought.

**Examples:**
```markdown
### Areas for Reviewer Attention
- Please pay close attention to the cache invalidation logic in `UserProfileCache`
- Consider potential race conditions in the `update_profile_and_cache` method
- Feedback on the new API endpoint `GET /users/{id}/cached_profile` would be appreciated
```

### Potential Issues/Concerns (Optional)

If any obvious concerns were identified during analysis, list them briefly.

**Examples:**
```markdown
### Potential Issues/Concerns
- The current implementation does not handle cache stampede; this will be addressed in a follow-up PR
- Performance impact on high-concurrency scenarios needs monitoring
```

### Testing (Optional)

Briefly mention what testing has been done or what specific testing reviewers might consider.

**Examples:**
```markdown
### Testing
- Unit tests cover cache hit/miss scenarios
- Integration testing with the front-end is pending
- Load testing recommended for production deployment
```

## 5. Format and Present Summary

1. Ensure the summary is a well-structured markdown document.

2. Verify it's balanced (not too long, not too short).

3. Confirm it directly helps co-workers understand the PR for review.

4. Ensure the summary guides reviewers to the most important parts of changes.

## Quality Checklist

Before presenting the summary, verify:

**Clarity:**
- [ ] PR purpose is clear and concise
- [ ] Technical jargon is minimized or explained
- [ ] Changes are described in plain language

**Completeness:**
- [ ] All major changes are highlighted
- [ ] Complex areas are identified
- [ ] Potential issues are noted
- [ ] Testing status is mentioned

**Relevance:**
- [ ] Focus on significant changes, not trivial edits
- [ ] Reviewer attention is directed to critical areas
- [ ] Context is provided for architectural decisions

**Formatting:**
- [ ] Proper markdown structure with headers
- [ ] Bullet points for easy scanning
- [ ] Code references use backticks
- [ ] File paths are clearly indicated

## Example Complete Summary

```markdown
# PR Summary

### PR Purpose
This PR introduces a Redis-based caching layer for user profiles to reduce database load and improve login response times by ~60%.

### Key Changes
- Adds `UserProfileCache` service in `services/cache/profile_cache.py` with TTL-based expiration
- Refactors `AuthController.login()` to fetch from cache before database
- Implements cache invalidation on profile updates in `UserService.update_profile()`
- Adds migration `2024_01_15_add_cache_metadata.py` for tracking cache timestamps
- Updates `User` model with `last_cached_at` and `cache_version` fields

### Areas for Reviewer Attention
- **Cache invalidation logic** in `UserProfileCache._invalidate()` - please verify the distributed cache invalidation pattern is correct
- **Race condition handling** in `update_profile_and_cache()` - using optimistic locking, but edge cases may exist
- **API endpoint** `GET /api/users/{id}/cached` - new endpoint for debugging cache state, feedback on security implications appreciated

### Potential Issues/Concerns
- Current implementation doesn't handle cache stampede scenario when many requests hit expired cache simultaneously - planning separate PR with request coalescing
- Redis failover behavior needs monitoring in production

### Testing
- Unit tests achieve 95% coverage for cache layer
- Integration tests verify cache hit/miss scenarios
- Load testing shows 60% improvement in login response times (500ms → 200ms)
- Manual testing completed for cache invalidation flows
```

## Success Criteria

The PR summary is complete when:
- All significant changes from the diff are represented
- PR purpose is clearly stated
- Areas requiring reviewer attention are identified
- Document is well-formatted and easy to scan
- Summary enables efficient, focused code review
- Technical details are balanced with readability

</detailed_sequence_steps>

</task>
