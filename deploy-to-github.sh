#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Meeting Assistant GitHub Deployment Script${NC}"
echo -e "${BLUE}============================================${NC}\n"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed. Please install git first.${NC}"
    exit 1
fi

# Check if in git repository
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Not a git repository. Initializing...${NC}"
    git init
fi

# Add all files
echo -e "${BLUE}📦 Adding files to git...${NC}"
git add .

# Check if there are changes
if git diff --cached --quiet; then
    echo -e "${YELLOW}⚠️  No changes to commit.${NC}"
else
    # Commit changes
    echo -e "${BLUE}💾 Committing changes...${NC}"
    git commit -m "feat: initial commit - AI-powered meeting assistant

- Complete Next.js 14 application with TypeScript
- Drizzle ORM with PostgreSQL schema
- DeepSeek AI integration for meeting summaries
- Team collaboration features
- Enterprise-ready dashboard
- Comprehensive documentation
- Vercel deployment ready"

    echo -e "${GREEN}✅ Changes committed successfully!${NC}"
fi

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo -e "${YELLOW}⚠️  No remote repository configured.${NC}"
    echo -e "${BLUE}Please enter your GitHub repository URL:${NC}"
    echo -e "${YELLOW}Example: https://github.com/yourusername/meeting-assistant.git${NC}"
    read -p "Repository URL: " repo_url
    
    if [ -z "$repo_url" ]; then
        echo -e "${RED}❌ No repository URL provided. Exiting.${NC}"
        exit 1
    fi
    
    git remote add origin "$repo_url"
    echo -e "${GREEN}✅ Remote repository added!${NC}"
fi

# Push to GitHub
echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"
if git push -u origin main; then
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
    
    # Show repository information
    echo -e "\n${BLUE}📊 Repository Information:${NC}"
    echo -e "${YELLOW}Repository URL:${NC} $(git remote get-url origin)"
    echo -e "${YELLOW}Branch:${NC} main"
    
    # Create GitHub repository URL for user
    repo_url=$(git remote get-url origin)
    if [[ $repo_url == *"github.com"* ]]; then
        web_url=$(echo $repo_url | sed 's/git@github.com:/https:\/\/github.com\//' | sed 's/\.git$//')
        echo -e "${YELLOW}Web URL:${NC} $web_url"
        
        # Check if it's a new repository
        if [[ $web_url == *"yourusername"* ]]; then
            echo -e "\n${YELLOW}⚠️  IMPORTANT:${NC}"
            echo -e "Please update the repository URL in the following files:"
            echo -e "1. README.md - Update repository URLs"
            echo -e "2. package.json - Update repository field"
            echo -e "3. DEPLOYMENT.md - Update deployment URLs"
        fi
    fi
    
    # Deployment instructions
    echo -e "\n${BLUE}🚀 Next Steps:${NC}"
    echo -e "1. ${YELLOW}Deploy to Vercel:${NC} Go to https://vercel.com/new and import your repository"
    echo -e "2. ${YELLOW}Set up database:${NC} Create a PostgreSQL database (Supabase recommended)"
    echo -e "3. ${YELLOW}Configure environment variables:${NC} Add DATABASE_URL, NEXTAUTH_SECRET, etc."
    echo -e "4. ${YELLOW}Get DeepSeek API key:${NC} Sign up at https://platform.deepseek.com"
    echo -e "5. ${YELLOW}Set up OAuth:${NC} Create GitHub OAuth app for authentication"
    
    echo -e "\n${GREEN}🎉 Your Meeting Assistant is ready!${NC}"
    echo -e "Visit $(git remote get-url origin | sed 's/\.git$//') to view your repository."
    
else
    echo -e "${RED}❌ Failed to push to GitHub.${NC}"
    echo -e "${YELLOW}Trying to force push...${NC}"
    
    read -p "Force push? (y/n): " force_push
    if [[ $force_push == "y" || $force_push == "Y" ]]; then
        if git push -u origin main --force; then
            echo -e "${GREEN}✅ Successfully force pushed to GitHub!${NC}"
        else
            echo -e "${RED}❌ Force push also failed. Please check your git configuration.${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  Push cancelled. Please resolve conflicts manually.${NC}"
    fi
fi

# Create a simple README for the deployment
echo -e "\n${BLUE}📝 Creating deployment summary...${NC}"
cat > DEPLOYMENT_SUMMARY.md << 'EOF'
# 🚀 Meeting Assistant Deployment Summary

## ✅ What's Been Deployed

A complete, production-ready AI-powered meeting assistant platform with:

### 🏗️ Core Architecture
- Next.js 14 with App Router
- TypeScript for type safety
- Drizzle ORM with PostgreSQL
- Tailwind CSS for styling
- NextAuth.js for authentication

### 🤖 AI Features
- DeepSeek API integration
- Automatic meeting summaries
- Action item extraction
- Smart tagging
- Sentiment analysis

### 👥 Collaboration Features
- Multi-team management
- Project organization
- Meeting scheduling
- Notes with versioning
- Action item tracking

### 📚 Documentation
- Comprehensive README with badges
- Deployment guide
- API documentation
- Contributing guidelines
- License (MIT)

## 🔧 Setup Instructions

### 1. Environment Variables
Create `.env.local` with:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="..."
DEEPSEEK_API_KEY="..."
```

### 2. Database Setup
```bash
npm run db:push
npm run db:seed
```

### 3. Development
```bash
npm run dev
```

### 4. Production Build
```bash
npm run build
npm start
```

## 🚀 Deployment Options

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

### Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/YOUR_TEMPLATE)

## 📞 Support

- GitHub Issues: Bug reports & feature requests
- Documentation: Complete setup guides
- Community: GitHub Discussions

## 🎯 Perfect For
- Enterprise BD teams (JPMorgan, Discord, Panasonic)
- Startup fundraising (i-GENTIC, MCP Discovery)
- Community pods (Human Unicorn Pod)
- Team collaboration & meeting management

---
**Built with ❤️ by yksanjo**
EOF

echo -e "${GREEN}✅ Deployment summary created at DEPLOYMENT_SUMMARY.md${NC}"

echo -e "\n${BLUE}🎉 Deployment script completed!${NC}"
echo -e "${YELLOW}Check DEPLOYMENT_SUMMARY.md for next steps.${NC}"