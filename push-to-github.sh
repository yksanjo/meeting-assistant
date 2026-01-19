#!/bin/bash

echo "🚀 Meeting Assistant - GitHub Push Helper"
echo "========================================="
echo ""
echo "This script will help you push the Meeting Assistant project to GitHub."
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Initializing..."
    git init
fi

# Add all files
echo "📦 Adding files to git..."
git add .

# Check if there are changes
if git diff --cached --quiet; then
    echo "⚠️  No changes to commit."
else
    echo "💾 Committing changes..."
    git commit -m "feat: initial commit - AI-powered meeting assistant

- Complete Next.js 14 application with TypeScript
- Drizzle ORM with PostgreSQL schema
- DeepSeek AI integration for meeting summaries
- Team collaboration features
- Enterprise-ready dashboard
- Comprehensive documentation
- Vercel deployment ready"
    echo "✅ Changes committed!"
fi

echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: meeting-assistant"
echo "   - Description: AI-powered meeting assistant with DeepSeek integration"
echo "   - Choose Public or Private"
echo "   - DO NOT initialize with README, .gitignore, or license"
echo ""
echo "2. After creating the repository, run these commands:"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/meeting-assistant.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Vercel:"
echo "   - Go to https://vercel.com/new"
echo "   - Import your GitHub repository"
echo "   - Configure environment variables"
echo "   - Deploy!"
echo ""
echo "4. Set up your database:"
echo "   - Create a PostgreSQL database (Supabase recommended)"
echo "   - Run: npm run db:push"
echo "   - Run: npm run db:seed"
echo ""
echo "🎉 Your Meeting Assistant will be live in minutes!"
echo ""
echo "Need help? Check DEPLOYMENT.md for detailed instructions."