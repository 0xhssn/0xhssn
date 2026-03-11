# Security Quick Start Guide

A fast-track guide to implementing dependency security in your projects.

## 5-Minute Setup

### Step 1: Enable Dependabot (GitHub Projects)

Copy `.github/dependabot.yml` to your project:

```bash
mkdir -p .github
cp /path/to/dependabot.yml .github/
git add .github/dependabot.yml
git commit -m "chore: enable Dependabot for automated security updates"
git push
```

Dependabot will now automatically:
- Check for vulnerabilities weekly
- Create PRs for security updates
- Group related updates together

### Step 2: Add Security Audit to CI/CD

Copy `.github/workflows/security-audit.yml` to your project:

```bash
mkdir -p .github/workflows
cp /path/to/security-audit.yml .github/workflows/
git add .github/workflows/security-audit.yml
git commit -m "ci: add security audit workflow"
git push
```

This will:
- Run security audits on every PR
- Check for vulnerabilities on push
- Run weekly scheduled scans
- Block PRs with critical vulnerabilities

### Step 3: Run Your First Audit

```bash
# Quick audit
npm audit

# Fix automatically
npm audit fix

# Fix including breaking changes (careful!)
npm audit fix --force
```

### Step 4: Set Up Automation Scripts

Copy the scripts to your project:

```bash
mkdir -p scripts
cp /path/to/scripts/*.sh scripts/
chmod +x scripts/*.sh
```

Use them:

```bash
# Daily security check
./scripts/security-audit.sh

# Weekly update check
./scripts/check-updates.sh

# Safe dependency updates
UPDATE_TYPE=minor ./scripts/update-dependencies.sh
```

## Daily Workflow

### Before Starting Work

```bash
# Check for security issues
npm audit

# Check for updates
npm outdated
```

### Before Committing

```bash
# Run security audit
npm audit --audit-level=moderate

# Run tests
npm test
```

### Before Deploying

```bash
# Full security check
./scripts/security-audit.sh

# Verify no critical vulnerabilities
npm audit --audit-level=critical
```

## Common Scenarios

### Scenario 1: Critical Vulnerability Found

```bash
# 1. Check the vulnerability
npm audit

# 2. Try automatic fix
npm audit fix

# 3. Test everything
npm test

# 4. Commit and deploy
git add package*.json
git commit -m "fix(security): patch critical vulnerability CVE-YYYY-XXXXX"
git push
```

### Scenario 2: Outdated Dependencies

```bash
# 1. Check what's outdated
npm outdated

# 2. Update safely (patch versions only)
npm update

# 3. Test
npm test

# 4. For major updates, use the script
UPDATE_TYPE=major RUN_TESTS=true ./scripts/update-dependencies.sh
```

### Scenario 3: Dependabot PR Review

1. Check the PR description for:
   - What's being updated
   - Why (security fix or regular update)
   - Breaking changes

2. Review the changelog:
   ```bash
   # Click the "Release notes" link in the PR
   ```

3. Check CI status:
   - All tests passing?
   - Security audit passing?

4. Merge if safe:
   - Green CI checks
   - No breaking changes
   - Tests passing

### Scenario 4: No Patch Available

```bash
# 1. Check for workarounds
npm audit

# 2. Search for alternatives
npm search <package-functionality>

# 3. Check if vulnerability affects your code
# Read the CVE details and check your usage

# 4. Implement temporary mitigation
# - Disable vulnerable feature
# - Add input validation
# - Add security middleware

# 5. Monitor for updates
# Set up Snyk monitoring
snyk monitor
```

## Integration with Existing Projects

### For New Projects

Add to `package.json`:

```json
{
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "audit:check": "npm audit --audit-level=moderate",
    "outdated": "npm outdated",
    "update:check": "./scripts/check-updates.sh",
    "update:safe": "UPDATE_TYPE=minor ./scripts/update-dependencies.sh"
  }
}
```

### For Existing Projects

1. **Audit current state:**
   ```bash
   npm audit --json > initial-audit.json
   ```

2. **Fix what you can:**
   ```bash
   npm audit fix
   npm test
   ```

3. **Document remaining issues:**
   ```bash
   npm audit > known-vulnerabilities.txt
   ```

4. **Create action plan:**
   - Critical: Fix within 24 hours
   - High: Fix within 1 week
   - Moderate: Fix within 1 month
   - Low: Fix in next update cycle

5. **Enable automation:**
   - Add Dependabot
   - Add CI/CD checks
   - Set up monitoring

## Monitoring and Alerts

### GitHub Security Alerts

Enable in repository settings:
1. Go to Settings > Security & analysis
2. Enable "Dependabot alerts"
3. Enable "Dependabot security updates"
4. Configure notification preferences

### Snyk Monitoring

```bash
# Install Snyk
npm install -g snyk

# Authenticate
snyk auth

# Monitor project
snyk monitor

# Get alerts via email/Slack
# Configure in Snyk dashboard
```

### Custom Alerts

Add to your monitoring system:

```bash
# Daily cron job
0 9 * * * cd /path/to/project && npm audit --audit-level=high || mail -s "Security Alert" you@example.com
```

## Best Practices Checklist

- [ ] Dependabot enabled
- [ ] Security audit in CI/CD
- [ ] Lock files committed
- [ ] Regular audit schedule (weekly)
- [ ] Security update policy documented
- [ ] Team trained on security procedures
- [ ] Incident response plan ready
- [ ] Monitoring and alerts configured
- [ ] Security log maintained
- [ ] Regular security reviews scheduled

## Emergency Contacts

### Security Issues

- **GitHub Security:** security@github.com
- **npm Security:** security@npmjs.com
- **Node.js Security:** security@nodejs.org

### Reporting Vulnerabilities

If you discover a security vulnerability:

1. **Do NOT** open a public issue
2. Email security details to project maintainers
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Resources

### Documentation
- [Complete Security Guide](./DEPENDENCY_SECURITY.md)
- [Security Update Log](./SECURITY_UPDATES.md)

### Tools
- [npm audit docs](https://docs.npmjs.com/cli/v9/commands/npm-audit)
- [Snyk](https://snyk.io/)
- [Dependabot](https://github.com/dependabot)

### Learning
- [OWASP Dependency Check](https://owasp.org/www-project-dependency-check/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

---

**Need Help?**

- Read the [complete guide](./DEPENDENCY_SECURITY.md)
- Check [common issues](#common-scenarios)
- Review [security updates log](./SECURITY_UPDATES.md)

**Last Updated:** 2026-03-11
