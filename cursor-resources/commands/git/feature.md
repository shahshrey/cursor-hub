<task name="Git Flow Feature Branch">

<task_objective>
Create a new Git Flow feature branch from develop with proper naming and tracking. Takes a feature name as input, validates the repository state, creates a feature branch following Git Flow conventions, and sets up remote tracking for collaboration.
</task_objective>

<detailed_sequence_steps>
# Git Flow Feature Branch - Detailed Sequence of Steps

## 1. Pre-Flight Validation

1. Check if in a valid git repository.

2. Validate feature name from `$ARGUMENTS`:
   - ✅ Valid: `user-authentication`, `payment-integration`, `dashboard-redesign`
   - ❌ Invalid: `feat1`, `My_Feature`, empty name

3. Check for uncommitted changes:
   - If changes exist, warn user and ask to commit/stash first
   - OR offer to stash changes automatically

4. Verify develop branch exists.

**Feature Name Not Provided:**
```
❌ Feature name is required

Usage: /feature <feature-name>

Examples:
  /feature user-profile-page
  /feature api-v2-integration
  /feature payment-gateway

Feature names should:
- Be descriptive and concise
- Use kebab-case (lowercase-with-hyphens)
- Describe what the feature does
```

**Uncommitted Changes:**
```
⚠️  You have uncommitted changes:
M  src/file1.js
M  src/file2.js

Options:
1. Commit changes first
2. Stash changes: git stash
3. Discard changes: git checkout .

What would you like to do? [1/2/3]
```

**No Develop Branch:**
```
❌ Develop branch not found

Git Flow requires a 'develop' branch. Create it with:
  git checkout -b develop
  git push -u origin develop

Or initialize Git Flow:
  git flow init
```

## 2. Create Feature Branch

Execute the following workflow:

```bash
git checkout develop

git pull origin develop

git checkout -b feature/$ARGUMENTS

git push -u origin feature/$ARGUMENTS
```

**Branch Already Exists:**
```
❌ Branch feature/$ARGUMENTS already exists

Existing feature branches:
  feature/user-authentication
  feature/payment-gateway
  feature/$ARGUMENTS ← This one

Options:
1. Switch to existing branch: git checkout feature/$ARGUMENTS
2. Use a different feature name
3. Delete existing and recreate (destructive!)
```

**Develop Behind Remote:**
```
⚠️  Local develop is behind origin/develop by 5 commits

✓ Pulling latest changes...
✓ Develop is now up to date
✓ Ready to create feature branch
```

## 3. Provide Status Report

After successful creation, display:

```
✓ Switched to develop branch
✓ Pulled latest changes from origin/develop
✓ Created branch: feature/$ARGUMENTS
✓ Set up remote tracking: origin/feature/$ARGUMENTS
✓ Pushed branch to remote

🌿 Feature Branch Ready

Branch: feature/$ARGUMENTS
Base: develop
Status: Clean working directory

🎯 Next Steps:
1. Start implementing your feature
2. Make commits using conventional format:
   git commit -m "feat: your changes"
3. Push changes regularly: git push
4. When complete, use /finish to merge back to develop

💡 Git Flow Tips:
- Keep commits atomic and well-described
- Push frequently to avoid conflicts
- Use conventional commit format (feat:, fix:, etc.)
- Test thoroughly before finishing
```

## 4. Git Flow Context

This command is part of the Git Flow branching strategy:

- **main**: Production-ready code (protected)
- **develop**: Integration branch for features (protected)
- **feature/***: New features (you are here)
- **release/***: Release preparation
- **hotfix/***: Emergency production fixes

Feature branches:
- Branch from: `develop`
- Merge back to: `develop`
- Naming convention: `feature/<descriptive-name>`
- Lifecycle: Short to medium term

## 5. Environment Variables

This command respects:
- `GIT_FLOW_DEVELOP_BRANCH`: Develop branch name (default: "develop")
- `GIT_FLOW_PREFIX_FEATURE`: Feature prefix (default: "feature/")

## 6. Related Commands

- `/finish` - Complete and merge feature branch to develop
- `/flow-status` - Check current Git Flow status
- `/release <version>` - Create release branch from develop
- `/hotfix <name>` - Create hotfix branch from main

## 7. Best Practices

**DO:**
- ✅ Use descriptive feature names
- ✅ Keep feature scope focused and small
- ✅ Push to remote regularly
- ✅ Test your changes before finishing
- ✅ Use conventional commit messages

**DON'T:**
- ❌ Create features directly from main
- ❌ Use generic names like "feature1"
- ❌ Let feature branches live too long
- ❌ Mix multiple unrelated features
- ❌ Skip testing before merging

</detailed_sequence_steps>

</task>
