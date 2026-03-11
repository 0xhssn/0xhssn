# Dependency Security Audit Guide

This document provides a comprehensive approach to reviewing and updating dependency vulnerabilities in JavaScript/TypeScript projects.

## Overview

Regular dependency audits are critical for maintaining application security. Outdated dependencies can expose applications to known vulnerabilities that attackers can exploit.

## Quick Start

### For npm Projects

```bash
# Run security audit
npm audit

# View detailed report
npm audit --json

# Automatically fix vulnerabilities
npm audit fix

# Fix including breaking changes (use with caution)
npm audit fix --force

# Update specific package
npm update <package-name>

# Update all packages to latest versions
npm update
```

### For Yarn Projects

```bash
# Run security audit
yarn audit

# Upgrade interactive (recommended)
yarn upgrade-interactive

# Upgrade all dependencies
yarn upgrade

# Upgrade specific package
yarn upgrade <package-name>
```

### For pnpm Projects

```bash
# Run security audit
pnpm audit

# Update all dependencies
pnpm update

# Update specific package
pnpm update <package-name>

# Update to latest versions
pnpm update --latest
```

## Comprehensive Audit Process

### Step 1: Identify Current Dependencies

```bash
# List all dependencies
npm list --depth=0

# List outdated packages
npm outdated

# Check for security vulnerabilities
npm audit
```

### Step 2: Analyze Vulnerability Report

The audit report will show:
- **Critical**: Immediate action required
- **High**: Should be addressed soon
- **Moderate**: Address in next update cycle
- **Low**: Monitor and address when convenient

### Step 3: Review Breaking Changes

Before updating, check:
1. Package changelog/release notes
2. Migration guides
3. Breaking changes documentation
4. Compatibility with other dependencies

### Step 4: Update Strategy

**Conservative Approach (Recommended for Production)**
```bash
# Update patch versions only (1.2.3 -> 1.2.4)
npm update

# Update specific vulnerable package
npm update <package-name>

# Test thoroughly
npm test
```

**Aggressive Approach (For Development/Testing)**
```bash
# Use npm-check-updates to update to latest versions
npx npm-check-updates -u

# Install updated dependencies
npm install

# Run comprehensive tests
npm test
```

### Step 5: Test After Updates

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e

# Build the project
npm run build

# Start development server and manual test
npm run dev
```

## Advanced Tools

### 1. Snyk

Snyk provides advanced vulnerability scanning and monitoring.

```bash
# Install Snyk CLI
npm install -g snyk

# Authenticate
snyk auth

# Test for vulnerabilities
snyk test

# Monitor project (continuous monitoring)
snyk monitor

# Fix vulnerabilities
snyk fix
```

**Snyk Features:**
- Detailed vulnerability database
- Automated pull requests for fixes
- License compliance checking
- Container and infrastructure scanning
- CI/CD integration

### 2. npm-check-updates

Keep dependencies up to date with interactive updates.

```bash
# Install globally
npm install -g npm-check-updates

# Check for updates
ncu

# Update package.json
ncu -u

# Interactive mode
ncu -i

# Update only specific packages
ncu -f <package-name>
```

### 3. Dependabot (GitHub)

Automated dependency updates via pull requests.

**Setup:** Create `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "your-username"
    assignees:
      - "your-username"
    labels:
      - "dependencies"
      - "security"
    commit-message:
      prefix: "chore"
      include: "scope"
```

### 4. Renovate Bot

Alternative to Dependabot with more configuration options.

**Setup:** Create `renovate.json`

```json
{
  "extends": ["config:base"],
  "packageRules": [
    {
      "matchUpdateTypes": ["minor", "patch"],
      "automerge": true
    },
    {
      "matchDepTypes": ["devDependencies"],
      "automerge": true
    }
  ],
  "schedule": ["before 5am on Monday"],
  "labels": ["dependencies"]
}
```

## Security Best Practices

### 1. Regular Audits

```bash
# Add to package.json scripts
{
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "outdated": "npm outdated"
  }
}
```

Run audits:
- Before each release
- Weekly in active development
- After adding new dependencies

### 2. Lock Files

Always commit lock files:
- `package-lock.json` (npm)
- `yarn.lock` (Yarn)
- `pnpm-lock.yaml` (pnpm)

Benefits:
- Reproducible builds
- Prevents unexpected updates
- Security consistency across environments

### 3. Dependency Pinning

**Semantic Versioning:**
- `^1.2.3` - Compatible with 1.x.x (allows minor and patch updates)
- `~1.2.3` - Compatible with 1.2.x (allows patch updates only)
- `1.2.3` - Exact version (no updates)

**Recommendation:**
- Production dependencies: Use `~` or exact versions
- Development dependencies: Use `^` for flexibility
- Critical security packages: Pin exact versions

### 4. CI/CD Integration

Add security checks to your CI pipeline:

**GitHub Actions Example:**

```yaml
name: Security Audit

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    - cron: '0 0 * * 1' # Weekly on Monday

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run security audit
        run: npm audit --audit-level=moderate
        
      - name: Check for outdated packages
        run: npm outdated || true
```

### 5. Vulnerability Monitoring

Set up alerts:
- GitHub Security Advisories
- Snyk monitoring
- npm audit in CI/CD
- Email notifications for critical vulnerabilities

### 6. Dependency Review

Before adding new dependencies:
1. Check package popularity (npm downloads)
2. Review maintenance status (last update date)
3. Check for known vulnerabilities
4. Review license compatibility
5. Assess bundle size impact
6. Look for alternatives with better security records

### 7. Private Package Security

For private registries:

```bash
# Configure registry authentication
npm config set registry https://your-registry.com
npm config set //your-registry.com/:_authToken=${NPM_TOKEN}

# Audit private packages
npm audit --registry=https://your-registry.com
```

## Common Vulnerability Scenarios

### Scenario 1: Critical Vulnerability in Direct Dependency

```bash
# Identify the vulnerable package
npm audit

# Update to patched version
npm update <package-name>

# If no patch available, find alternatives
npm search <alternative-package>

# Test thoroughly
npm test
```

### Scenario 2: Vulnerability in Transitive Dependency

```bash
# Identify dependency tree
npm ls <vulnerable-package>

# Update parent package
npm update <parent-package>

# If parent not updated, use overrides (npm 8.3+)
# Add to package.json:
{
  "overrides": {
    "vulnerable-package": "^safe-version"
  }
}

# Or use resolutions (Yarn)
{
  "resolutions": {
    "vulnerable-package": "^safe-version"
  }
}
```

### Scenario 3: No Patch Available

```bash
# Check for workarounds
npm audit

# Consider alternatives
npm search <package-functionality>

# Implement temporary mitigation
# - Disable vulnerable feature
# - Add security middleware
# - Implement input validation

# Monitor for updates
snyk monitor
```

## Reporting and Documentation

### Create Audit Report

```bash
# Generate JSON report
npm audit --json > audit-report.json

# Generate detailed report
npm audit --json | jq '.' > audit-detailed.json

# Count vulnerabilities by severity
npm audit --json | jq '.metadata.vulnerabilities'
```

### Track Updates

Maintain a `SECURITY_UPDATES.md` log:

```markdown
# Security Update Log

## 2026-03-11
- Updated `express` from 4.17.1 to 4.18.2 (CVE-2022-24999)
- Updated `axios` from 0.21.1 to 1.6.0 (CVE-2023-45857)
- Ran full test suite - all tests passing
- Deployed to staging for verification

## 2026-03-04
- Automated Dependabot updates merged
- Minor version updates for dev dependencies
- No breaking changes detected
```

## Automation Scripts

### Daily Audit Script

Create `scripts/security-audit.sh`:

```bash
#!/bin/bash

echo "Running security audit..."
npm audit --audit-level=moderate

if [ $? -ne 0 ]; then
  echo "Vulnerabilities found! Running npm audit fix..."
  npm audit fix
  
  echo "Re-running tests..."
  npm test
  
  if [ $? -eq 0 ]; then
    echo "Tests passed. Creating commit..."
    git add package*.json
    git commit -m "chore(deps): fix security vulnerabilities"
    echo "Please review changes and push if appropriate."
  else
    echo "Tests failed. Please review changes manually."
    git reset --hard
  fi
else
  echo "No vulnerabilities found."
fi
```

### Weekly Update Check

Create `scripts/check-updates.sh`:

```bash
#!/bin/bash

echo "Checking for outdated packages..."
npm outdated

echo "\nChecking for security vulnerabilities..."
npm audit

echo "\nGenerating update report..."
npx npm-check-updates > update-report.txt

echo "Report saved to update-report.txt"
```

## Resources

### Official Documentation
- [npm audit](https://docs.npmjs.com/cli/v9/commands/npm-audit)
- [Yarn audit](https://classic.yarnpkg.com/en/docs/cli/audit)
- [pnpm audit](https://pnpm.io/cli/audit)

### Security Tools
- [Snyk](https://snyk.io/)
- [GitHub Dependabot](https://github.com/dependabot)
- [Renovate](https://www.mend.io/renovate/)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates)

### Vulnerability Databases
- [National Vulnerability Database](https://nvd.nist.gov/)
- [GitHub Advisory Database](https://github.com/advisories)
- [Snyk Vulnerability DB](https://security.snyk.io/)
- [npm Security Advisories](https://www.npmjs.com/advisories)

### Best Practices
- [OWASP Dependency Check](https://owasp.org/www-project-dependency-check/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [npm Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)

## Checklist

Use this checklist for regular dependency audits:

- [ ] Run `npm audit` to identify vulnerabilities
- [ ] Review audit report and prioritize by severity
- [ ] Check for available patches and updates
- [ ] Review changelogs for breaking changes
- [ ] Update dependencies using appropriate strategy
- [ ] Run full test suite
- [ ] Perform manual testing of critical features
- [ ] Build project to verify no build errors
- [ ] Update lock files
- [ ] Document changes in security log
- [ ] Commit and push changes
- [ ] Deploy to staging environment
- [ ] Monitor for issues
- [ ] Deploy to production after verification

---

**Last Updated:** 2026-03-11  
**Maintained by:** Hamza Hassan
