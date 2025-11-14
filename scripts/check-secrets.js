#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const SECRET_PATTERNS = [
  {
    pattern: /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi,
    name: 'UUID (potential API/Team ID)',
  },
  {
    pattern: /[a-f0-9]{32,}/gi,
    name: 'Long hex string (potential API key)',
  },
  {
    pattern: /Bearer\s+[a-zA-Z0-9._-]{40,}/gi,
    name: 'Bearer token',
  },
  {
    pattern: /(password|secret|token|key|api_key|apikey)\s*[=:]\s*['"][^'"]{8,}['"]/gi,
    name: 'Potential secret assignment',
  },
  {
    pattern: /(?:postgres|mysql|mongodb):\/\/[^:]+:[^@]+@/gi,
    name: 'Database connection string with credentials',
  },
  {
    pattern: /sk-[a-zA-Z0-9]{32,}/gi,
    name: 'OpenAI API key',
  },
  {
    pattern: /ghp_[a-zA-Z0-9]{36}/gi,
    name: 'GitHub Personal Access Token',
  },
]

const ALLOWED_FILES = ['.env.example', '.env.local.example', 'check-secrets.js', 'README.md']

const EXCLUDED_PATTERNS = [/node_modules/, /\.git\//, /\.next\//, /dist\//, /build\//, /\.husky\//]

function checkFileForSecrets(filePath) {
  const fileName = path.basename(filePath)

  if (ALLOWED_FILES.includes(fileName)) {
    return { hasSecrets: false, findings: [] }
  }

  if (EXCLUDED_PATTERNS.some(pattern => pattern.test(filePath))) {
    return { hasSecrets: false, findings: [] }
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return { hasSecrets: false, findings: [] }
  }

  try {
    const content = fs.readFileSync(filePath, { encoding: 'utf-8' })
    const findings = []

    for (const { pattern, name } of SECRET_PATTERNS) {
      const matches = content.match(pattern)
      if (matches) {
        findings.push({
          type: name,
          matches: matches.slice(0, 3),
          count: matches.length,
        })
      }
    }

    return {
      hasSecrets: findings.length > 0,
      findings,
    }
  } catch (error) {
    return { hasSecrets: false, findings: [] }
  }
}

function main() {
  const files = process.argv.slice(2)

  if (files.length === 0) {
    process.exit(0)
  }

  let hasAnySecrets = false
  const results = []

  for (const file of files) {
    const { hasSecrets, findings } = checkFileForSecrets(file)

    if (hasSecrets) {
      hasAnySecrets = true
      results.push({ file, findings })
    }
  }

  if (hasAnySecrets) {
    console.error('\n🚨 CRITICAL: Potential secrets detected in staged files!\n')

    for (const { file, findings } of results) {
      console.error(`\n📄 ${file}`)
      for (const { type, matches, count } of findings) {
        console.error(`  ❌ ${type}`)
        if (count > 3) {
          console.error(`     Found ${count} instances (showing first 3):`)
        }
        for (const match of matches.slice(0, 3)) {
          console.error(`     - ${match}`)
        }
      }
    }

    console.error('\n⚠️  Please remove hardcoded secrets and use environment variables instead.')
    console.error('💡 Reference: See project rules about preventing hardcoded secrets.\n')

    process.exit(1)
  }

  process.exit(0)
}

if (require.main === module) {
  main()
}
