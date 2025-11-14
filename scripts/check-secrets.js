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

const ALLOWED_FILES = ['.env.example', '.env.local.example', 'check-secrets.js']

const EXCLUDED_PATTERNS = [/node_modules/, /\.git\//, /\.next\//, /dist\//, /build\//, /\.husky\//]

const FALSE_POSITIVE_PATTERNS = [
  {
    pattern:
      /(?:const|let|var)\s+\w*KEY\w*\s*=\s*['"](cursor-resources|localStorage|sessionStorage)[^'"]*['"]/gi,
    description: 'localStorage/sessionStorage keys',
  },
  {
    pattern:
      /key:\s*['"](Content-Security-Policy|X-Frame-Options|X-Content-Type-Options|Strict-Transport-Security|Referrer-Policy|Permissions-Policy|X-XSS-Protection|Cache-Control|Access-Control)[^'"]*['"]/gi,
    description: 'HTTP header keys',
  },
  {
    pattern:
      /(?:STORAGE_KEY|ONBOARDING_KEY|SEARCH_HISTORY_KEY|PRESET_KEY|ONBOARDING_KEY|SEARCH_HISTORY_KEY)\s*=\s*['"][^'"]*['"]/gi,
    description: 'Storage key constants',
  },
  {
    pattern: /cursor-resources-[^'"]*['"]/gi,
    description: 'localStorage key strings',
  },
  {
    pattern: /(?:test|example|sample|demo|placeholder)[^'"]*(?:sk-|ghp_|1234567890abcdef)/gi,
    description: 'Test/example values',
  },
  {
    pattern: /mysql:\/\/user:password@localhost/gi,
    description: 'Example database connection strings',
  },
  {
    pattern: /\/tmp\/test-secret\.txt/gi,
    description: 'Test file paths',
  },
]

function isFalsePositive(match, content, filePath) {
  const matchIndex = content.indexOf(match)
  if (matchIndex === -1) return false

  const contextStart = Math.max(0, matchIndex - 150)
  const contextEnd = Math.min(content.length, matchIndex + match.length + 150)
  const context = content.slice(contextStart, contextEnd)

  if (match.includes('cursor-resources-')) {
    return true
  }

  const httpHeaderKeys = [
    'Content-Security-Policy',
    'X-Frame-Options',
    'X-Content-Type-Options',
    'Strict-Transport-Security',
    'Referrer-Policy',
    'Permissions-Policy',
    'X-XSS-Protection',
    'Cache-Control',
    'Access-Control',
  ]
  if (httpHeaderKeys.some(header => match.includes(header))) {
    return true
  }

  for (const { pattern } of FALSE_POSITIVE_PATTERNS) {
    if (pattern.test(context)) {
      return true
    }
  }

  const fileName = path.basename(filePath).toLowerCase()
  if (fileName.includes('test') || fileName.includes('example') || fileName.includes('sample')) {
    if (match.includes('1234567890abcdef') || match.includes('sk-123456')) {
      return true
    }
  }

  if (filePath.includes('verify-git-workflow.sh') || filePath.includes('check-secrets.js')) {
    if (match.includes('1234567890abcdef') || match.includes('sk-123456')) {
      return true
    }
  }

  if (filePath.includes('.json') && match.includes('mysql://user:password@localhost')) {
    return true
  }

  if (match.includes('mysql://user:password@localhost')) {
    return true
  }

  return false
}

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
        const validMatches = matches.filter(match => !isFalsePositive(match, content, filePath))
        if (validMatches.length > 0) {
          findings.push({
            type: name,
            matches: validMatches.slice(0, 3),
            count: validMatches.length,
          })
        }
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
