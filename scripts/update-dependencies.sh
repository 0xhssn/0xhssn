#!/bin/bash

# Update Dependencies Script
# This script safely updates dependencies with testing and rollback capabilities

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
UPDATE_TYPE="${UPDATE_TYPE:-minor}" # patch, minor, major
RUN_TESTS="${RUN_TESTS:-true}"
CREATE_BACKUP="${CREATE_BACKUP:-true}"
AUTO_COMMIT="${AUTO_COMMIT:-false}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Dependency Update Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "Update type: ${YELLOW}$UPDATE_TYPE${NC}"
echo -e "Run tests: ${YELLOW}$RUN_TESTS${NC}"
echo -e "Create backup: ${YELLOW}$CREATE_BACKUP${NC}"
echo ""

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found in current directory${NC}"
    exit 1
fi

# Create backup if enabled
if [ "$CREATE_BACKUP" = "true" ]; then
    echo -e "${BLUE}Creating backup...${NC}"
    cp package.json package.json.backup
    cp package-lock.json package-lock.json.backup 2>/dev/null || true
    echo -e "${GREEN}Backup created${NC}"
    echo ""
fi

# Function to restore backup
restore_backup() {
    echo -e "${YELLOW}Restoring backup...${NC}"
    mv package.json.backup package.json
    mv package-lock.json.backup package-lock.json 2>/dev/null || true
    npm install
    echo -e "${GREEN}Backup restored${NC}"
}

# Trap errors and restore backup
trap 'restore_backup' ERR

# Update dependencies based on type
echo -e "${BLUE}Updating dependencies...${NC}"

case $UPDATE_TYPE in
    patch)
        echo "Updating patch versions only..."
        npm update
        ;;
    minor)
        echo "Updating minor and patch versions..."
        if command -v ncu &> /dev/null; then
            ncu -u --target minor
            npm install
        else
            echo -e "${YELLOW}npm-check-updates not installed, using npm update${NC}"
            npm update
        fi
        ;;
    major)
        echo "Updating to latest versions (including major)..."
        if command -v ncu &> /dev/null; then
            ncu -u
            npm install
        else
            echo -e "${RED}Error: npm-check-updates required for major updates${NC}"
            echo -e "${YELLOW}Install with: npm install -g npm-check-updates${NC}"
            exit 1
        fi
        ;;
    *)
        echo -e "${RED}Invalid update type: $UPDATE_TYPE${NC}"
        echo "Valid types: patch, minor, major"
        exit 1
        ;;
esac

echo -e "${GREEN}Dependencies updated${NC}"
echo ""

# Show what changed
echo -e "${BLUE}Changes made:${NC}"
git diff package.json || diff package.json.backup package.json || true
echo ""

# Run security audit
echo -e "${BLUE}Running security audit...${NC}"
npm audit --audit-level=moderate || true
echo ""

# Run tests if enabled
if [ "$RUN_TESTS" = "true" ]; then
    echo -e "${BLUE}Running tests...${NC}"
    
    if npm test; then
        echo -e "${GREEN}All tests passed!${NC}"
        
        # Remove backup on success
        if [ "$CREATE_BACKUP" = "true" ]; then
            rm -f package.json.backup package-lock.json.backup
            echo -e "${GREEN}Backup removed${NC}"
        fi
        
        # Create commit if enabled
        if [ "$AUTO_COMMIT" = "true" ]; then
            echo ""
            echo -e "${BLUE}Creating commit...${NC}"
            
            git add package*.json
            git commit -m "chore(deps): update dependencies ($UPDATE_TYPE)

Updated dependencies to latest $UPDATE_TYPE versions.
All tests passing after updates."
            
            echo -e "${GREEN}Commit created${NC}"
        fi
    else
        echo -e "${RED}Tests failed!${NC}"
        restore_backup
        exit 1
    fi
else
    echo -e "${YELLOW}Skipping tests (RUN_TESTS=false)${NC}"
    echo -e "${YELLOW}Remember to run tests manually: npm test${NC}"
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Update Complete${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}Dependencies successfully updated!${NC}"
echo ""
echo "Next steps:"
echo "1. Review the changes in package.json"
echo "2. Test the application thoroughly"
echo "3. Check for any breaking changes in changelogs"
echo "4. Commit and push when ready"
