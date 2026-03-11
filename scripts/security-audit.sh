#!/bin/bash

# Security Audit Script
# This script performs a comprehensive security audit of npm dependencies
# and optionally applies automatic fixes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
AUDIT_LEVEL="${AUDIT_LEVEL:-moderate}"
AUTO_FIX="${AUTO_FIX:-false}"
RUN_TESTS="${RUN_TESTS:-true}"
CREATE_COMMIT="${CREATE_COMMIT:-false}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  NPM Security Audit${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found in current directory${NC}"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Warning: node_modules not found. Running npm install...${NC}"
    npm install
fi

# Run npm audit
echo -e "${BLUE}Running npm audit (level: $AUDIT_LEVEL)...${NC}"
echo ""

AUDIT_OUTPUT=$(npm audit --audit-level=$AUDIT_LEVEL 2>&1) || AUDIT_EXIT_CODE=$?

if [ -z "$AUDIT_EXIT_CODE" ]; then
    echo -e "${GREEN}No vulnerabilities found!${NC}"
    echo "$AUDIT_OUTPUT"
    exit 0
fi

echo "$AUDIT_OUTPUT"
echo ""

# Parse vulnerability counts
CRITICAL=$(echo "$AUDIT_OUTPUT" | grep -oP '\d+(?= critical)' || echo "0")
HIGH=$(echo "$AUDIT_OUTPUT" | grep -oP '\d+(?= high)' || echo "0")
MODERATE=$(echo "$AUDIT_OUTPUT" | grep -oP '\d+(?= moderate)' || echo "0")
LOW=$(echo "$AUDIT_OUTPUT" | grep -oP '\d+(?= low)' || echo "0")

echo -e "${YELLOW}Vulnerability Summary:${NC}"
echo -e "  Critical: ${RED}$CRITICAL${NC}"
echo -e "  High:     ${RED}$HIGH${NC}"
echo -e "  Moderate: ${YELLOW}$MODERATE${NC}"
echo -e "  Low:      ${YELLOW}$LOW${NC}"
echo ""

# Generate JSON report
echo -e "${BLUE}Generating detailed audit report...${NC}"
npm audit --json > audit-report.json
echo -e "${GREEN}Report saved to audit-report.json${NC}"
echo ""

# Auto-fix if enabled
if [ "$AUTO_FIX" = "true" ]; then
    echo -e "${BLUE}Attempting to automatically fix vulnerabilities...${NC}"
    npm audit fix
    
    # Check if fixes were applied
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Automatic fixes applied successfully${NC}"
        
        # Run tests if enabled
        if [ "$RUN_TESTS" = "true" ]; then
            echo ""
            echo -e "${BLUE}Running tests to verify fixes...${NC}"
            
            if npm test; then
                echo -e "${GREEN}All tests passed!${NC}"
                
                # Create commit if enabled
                if [ "$CREATE_COMMIT" = "true" ]; then
                    echo ""
                    echo -e "${BLUE}Creating commit for security fixes...${NC}"
                    
                    git add package*.json
                    git commit -m "fix(security): apply automatic security fixes

- Fixed $CRITICAL critical vulnerabilities
- Fixed $HIGH high vulnerabilities
- Fixed $MODERATE moderate vulnerabilities
- Fixed $LOW low vulnerabilities

All tests passing after fixes."
                    
                    echo -e "${GREEN}Commit created. Review and push when ready.${NC}"
                fi
            else
                echo -e "${RED}Tests failed after applying fixes!${NC}"
                echo -e "${YELLOW}Rolling back changes...${NC}"
                git checkout -- package*.json
                npm install
                exit 1
            fi
        fi
    else
        echo -e "${YELLOW}Some vulnerabilities could not be fixed automatically${NC}"
        echo -e "${YELLOW}Manual intervention may be required${NC}"
    fi
fi

# Check for outdated packages
echo ""
echo -e "${BLUE}Checking for outdated packages...${NC}"
npm outdated || true

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Audit Complete${NC}"
echo -e "${BLUE}========================================${NC}"

# Exit with error if vulnerabilities found
if [ "$AUDIT_EXIT_CODE" -ne 0 ]; then
    exit 1
fi
