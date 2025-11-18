#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         Git Workflow Setup Verification                      ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

ERRORS=0
WARNINGS=0

check_file() {
  if [ -f "$1" ]; then
    echo "✓ $1"
  else
    echo "✗ $1 (MISSING)"
    ((ERRORS++))
  fi
}

check_executable() {
  if [ -x "$1" ]; then
    echo "✓ $1 (executable)"
  else
    echo "⚠ $1 (not executable)"
    ((WARNINGS++))
  fi
}

check_command() {
  if command -v "$1" &> /dev/null; then
    echo "✓ $1 is installed"
  else
    echo "✗ $1 is NOT installed"
    ((ERRORS++))
  fi
}

echo "📋 Checking required commands..."
check_command "node"
check_command "npm"
check_command "git"
echo ""

echo "🪝 Checking Git hooks..."
check_executable ".husky/pre-commit"
check_executable ".husky/commit-msg"
check_executable ".husky/pre-push"
check_executable ".husky/post-merge"
check_executable ".husky/post-checkout"
echo ""

echo "📜 Checking scripts..."
check_file "scripts/check-secrets.js"
check_executable "scripts/check-secrets.js"
echo ""

echo "⚙️  Checking GitHub Actions workflows..."
check_file ".github/workflows/ci.yml"
check_file ".github/workflows/playwright.yml"
check_file ".github/workflows/security.yml"
check_file ".github/workflows/pr-checks.yml"
check_file ".github/workflows/dependency-update.yml"
check_file ".github/workflows/cleanup.yml"
check_file ".github/workflows/codeowners-validation.yml"
echo ""

echo "📝 Checking configuration files..."
check_file ".github/labeler.yml"
check_file ".github/CODEOWNERS"
check_file ".github/pull_request_template.md"
check_file ".github/ISSUE_TEMPLATE/bug_report.md"
check_file ".github/ISSUE_TEMPLATE/feature_request.md"
check_file ".prettierrc"
check_file ".prettierignore"
check_file "package.json"
echo ""

echo ""

echo "🧪 Testing secret detection..."
echo "test-api-key-sk-1234567890abcdef1234567890abcdef" > /tmp/test-secret.txt
if node scripts/check-secrets.js /tmp/test-secret.txt 2>&1 | grep -q "CRITICAL"; then
  echo "✓ Secret detection is working"
else
  echo "✗ Secret detection is NOT working"
  ((ERRORS++))
fi
rm /tmp/test-secret.txt
echo ""

echo "📦 Checking package.json configuration..."
if grep -q "lint-staged" package.json; then
  echo "✓ lint-staged configuration found"
else
  echo "✗ lint-staged configuration missing"
  ((ERRORS++))
fi

if grep -q "husky" package.json; then
  echo "✓ husky dependency found"
else
  echo "✗ husky dependency missing"
  ((ERRORS++))
fi
echo ""

echo "════════════════════════════════════════════════════════════════"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo "✅ All checks passed! Git workflow is properly configured."
elif [ $ERRORS -eq 0 ]; then
  echo "⚠️  Setup complete with $WARNINGS warning(s)."
  echo "Run: chmod +x .husky/* scripts/*.sh"
else
  echo "❌ Setup incomplete. $ERRORS error(s), $WARNINGS warning(s)."
  echo ""
  echo "To fix:"
  echo "  1. Run: npm install"
  echo "  2. Run: npm run prepare"
  echo "  3. Run: chmod +x .husky/* scripts/*.sh"
fi
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "📖 For full documentation, see: GIT_WORKFLOW.txt"
echo "⚡ For quick reference, see: GIT_WORKFLOW_QUICK_REF.txt"
echo ""

exit $ERRORS

