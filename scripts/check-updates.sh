#!/bin/bash

# Check Updates Script
# This script checks for outdated packages and generates an update report

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Dependency Update Check${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found in current directory${NC}"
    exit 1
fi

# Check for outdated packages
echo -e "${BLUE}Checking for outdated packages...${NC}"
echo ""

npm outdated --long > outdated-report.txt 2>&1 || true
cat outdated-report.txt
echo ""

# Count outdated packages
OUTDATED_COUNT=$(cat outdated-report.txt | tail -n +2 | wc -l)

if [ "$OUTDATED_COUNT" -eq 0 ]; then
    echo -e "${GREEN}All packages are up to date!${NC}"
else
    echo -e "${YELLOW}Found $OUTDATED_COUNT outdated packages${NC}"
fi

echo ""

# Check for security vulnerabilities
echo -e "${BLUE}Checking for security vulnerabilities...${NC}"
echo ""

npm audit --audit-level=low 2>&1 || true

echo ""

# Generate detailed update report using npm-check-updates
echo -e "${BLUE}Generating detailed update report...${NC}"

if command -v ncu &> /dev/null; then
    ncu --format group > update-report.txt
    cat update-report.txt
    echo ""
    echo -e "${GREEN}Detailed report saved to update-report.txt${NC}"
else
    echo -e "${YELLOW}npm-check-updates not installed${NC}"
    echo -e "${YELLOW}Install with: npm install -g npm-check-updates${NC}"
fi

echo ""

# List dependency tree for specific packages if needed
echo -e "${BLUE}Dependency tree summary:${NC}"
npm list --depth=0

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Check Complete${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

if [ "$OUTDATED_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}Recommendations:${NC}"
    echo "1. Review outdated-report.txt for details"
    echo "2. Update packages with: npm update"
    echo "3. For major updates, use: npx npm-check-updates -u"
    echo "4. Always test after updates: npm test"
    echo "5. Review changelogs for breaking changes"
fi
