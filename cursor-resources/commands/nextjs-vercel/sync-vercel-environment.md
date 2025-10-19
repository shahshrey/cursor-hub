<task name="Sync Vercel Environment Variables">

<task_objective>
Synchronize environment variables between local development environment and Vercel deployment platforms. Takes sync operation flags (--pull, --push, --validate, --backup) as input, analyzes local environment files (.env.local, .env.development, .env.production) and Vercel project configuration, and executes bidirectional synchronization with validation, backup, security checks, and comprehensive diff reporting to maintain environment parity across development, preview, and production environments.
</task_objective>

<detailed_sequence_steps>

## 1. Environment Analysis and Setup

1. Verify Vercel CLI installation
   - Check if Vercel CLI is installed (vercel --version)
   - If not installed, provide installation instructions
   - Verify CLI is authenticated

2. Analyze local environment files
   - Check for .env.local existence and contents
   - Check for .env.development existence
   - Check for .env.production existence
   - Check for .env existence (base environment)
   - Locate .env.example as template reference

3. Verify Vercel project linkage
   - Execute: vercel project ls
   - Confirm current directory is linked to Vercel project
   - If not linked, execute: vercel link

4. Check Git status
   - Verify working directory is clean (optional warning)
   - Ensure .env files are in .gitignore
   - Check for any uncommitted environment changes

## 2. Pull Environment Variables from Vercel

1. Create backup of existing local files
   - If .env.local exists, copy to .env.local.backup.[timestamp]
   - Log backup location for user reference
   - Preserve original file permissions

2. Execute Vercel environment pull
   - Run: vercel env pull .env.local
   - Handle authentication prompts if needed
   - Wait for completion and verify success

3. Validate pulled environment variables
   - Count total variables pulled
   - Parse and display variable names (hide values)
   - Check for any parsing errors or malformed entries

4. Generate pull summary report
   - Total variables count
   - List of variable names (without values)
   - Timestamp of pull operation
   - Backup location reference

## 3. Push Environment Variables to Vercel

1. Identify source environment files
   - Look for .env.production for production environment
   - Look for .env.staging for preview environment
   - Look for .env.development for development environment
   - Fail if no suitable files found

2. Parse environment files
   - Read each file line by line
   - Skip empty lines and comments
   - Extract key=value pairs
   - Remove quotes from values if present
   - Validate format of each entry

3. Determine target Vercel environments
   - Map .env.production to "production" environment
   - Map .env.staging to "preview" environment
   - Map .env.development to "development" environment

4. Push variables to each environment
   - For each file and target environment pair:
     - Iterate through each variable
     - Execute: echo "$value" | vercel env add "$key" "$environment" --force
     - Log each variable being set (hide values)
     - Handle errors gracefully

5. Generate push summary report
   - List files processed
   - Count variables pushed per environment
   - Note any failures or skipped variables
   - Confirm completion status

## 4. Validate Environment Variables

1. Define validation rules
   - Required variables (DATABASE_URL, NEXTAUTH_SECRET, etc.)
   - Pattern validation (regex for URLs, connection strings)
   - Minimum length requirements (secrets should be 32+ chars)
   - Format validation (API keys, tokens)

2. Read and parse environment files
   - Load all environment files into memory
   - Parse into key-value objects
   - Maintain separate objects per environment

3. Run validation checks
   - Check all required variables are present
   - Validate patterns match expected formats
   - Check for placeholder values (your-secret-here, change-me)
   - Verify minimum lengths for sensitive values
   - Detect potentially hardcoded localhost URLs in production

4. Generate validation report
   - List all errors (missing required, invalid format)
   - List all warnings (placeholder values, suspicious patterns)
   - Categorize by severity (critical, warning, info)
   - Provide remediation suggestions for each issue

5. Security checks
   - Verify .env.local is in .gitignore
   - Verify .env.production is in .gitignore
   - Check if any .env files are tracked by Git
   - Warn about weak or short secrets

## 5. Backup and Restore Operations

1. Create comprehensive backup
   - Create .env-backups/ directory if doesn't exist
   - Generate timestamp for backup set
   - Backup all local .env files to .env-backups/[file].[timestamp]
   - Pull and backup Vercel environments

2. Backup Vercel environment variables
   - For each environment (production, preview, development):
     - Execute: vercel env ls --environment="$env"
     - Save output to .env-backups/vercel-$env.[timestamp].txt
     - Log completion for each environment

3. List available backups
   - Scan .env-backups/ directory
   - Extract unique timestamps
   - Display backups sorted by date
   - Show file sizes and dates

4. Restore from backup (if timestamp provided)
   - Validate backup timestamp exists
   - For each backed up file:
     - Copy from .env-backups/[file].[timestamp] to original location
     - Verify file integrity
     - Log restoration status
   - Confirm completion

## 6. Environment Comparison and Diff

1. Load local and remote environments
   - Parse local .env files into objects
   - Pull current Vercel environments
   - Parse Vercel environments into objects

2. Compare environments
   - Identify variables only in local (removed from Vercel)
   - Identify variables only in Vercel (added remotely)
   - Identify variables with different values (modified)
   - Track unchanged variables

3. Generate diff report
   - Section for added variables (in remote, not local)
   - Section for removed variables (in local, not remote)
   - Section for modified variables (with masked values)
   - Section summary for unchanged variables
   - Color-code or format for readability

4. Mask sensitive values in report
   - For values longer than 8 chars: show first 4 and last 4
   - For shorter values: show only asterisks
   - Preserve length information

## 7. Generate Environment Template

1. Analyze existing environment variables
   - Extract all unique keys across environments
   - Categorize by purpose (database, auth, APIs, config)
   - Detect common patterns (DATABASE_, NEXT_, API_KEY_)

2. Categorize variables
   - Database category: DATABASE_URL, DB_HOST, DB_PORT, etc.
   - Authentication: NEXTAUTH_SECRET, JWT_SECRET, etc.
   - External APIs: API keys and tokens
   - Configuration: Feature flags, app settings

3. Generate .env.example template
   - Add header comments with instructions
   - Group by category with section comments
   - For each variable: add descriptive comment
   - Use placeholder values (your-value-here)
   - Include examples where helpful

4. Write template file
   - Save as .env.example in project root
   - Ensure file is safe to commit (no secrets)
   - Add to Git if not already tracked

## 8. Automation and Integration

1. Setup GitHub Actions integration (optional)
   - Create .github/workflows/env-sync.yml
   - Configure triggers (push to main, paths: .env.*)
   - Add workflow_dispatch for manual triggers
   - Include validation job
   - Setup Vercel token as GitHub secret

2. Create validation workflow jobs
   - Install Vercel CLI in runner
   - Link to Vercel project with token
   - Run environment validation script
   - Report validation results as PR comment

3. Setup pre-commit hooks (optional)
   - Create validation script in scripts/
   - Add to .husky/pre-commit if husky is installed
   - Check environment file structure before commit
   - Run validation checks locally

## 9. Monitoring and Reporting

1. Track synchronization metrics
   - Log sync operations with timestamps
   - Record success/failure rates
   - Track variable count changes over time

2. Security audit logging
   - Log all access to environment variables
   - Track who pulled/pushed environments
   - Record validation failures

3. Generate comprehensive sync report
   - Operation type (pull, push, validate, backup)
   - Timestamp and duration
   - Variables affected (count, names without values)
   - Validation results
   - Backup locations (if created)
   - Any errors or warnings
   - Recommended next actions

4. Cleanup and maintenance
   - Remove old backups (keep last 10 or 30 days)
   - Archive sync logs
   - Update .env.example if new variables detected

</detailed_sequence_steps>

</task>

