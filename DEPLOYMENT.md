# 🚀 Deployment Guide

This guide will help you deploy the Meeting Assistant to various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- Database (PostgreSQL) - choose one:
  - [Supabase](https://supabase.com) (Free tier available)
  - [Neon](https://neon.tech) (Free tier available)
  - [Vercel Postgres](https://vercel.com/postgres)
  - Self-hosted PostgreSQL
- DeepSeek API key from [deepseek.com](https://platform.deepseek.com)

## 🎯 Quick Deployment Options

### Option 1: Deploy to Vercel (Recommended - 1 Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyksanjo%2Fmeeting-assistant)

**Steps:**
1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Configure environment variables (see below)
4. Click "Deploy"

### Option 2: Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/meeting-assistant)

**Steps:**
1. Click the Railway button above
2. Sign in with GitHub
3. Configure environment variables
4. Deploy!

### Option 3: Manual Deployment

```bash
# Clone the repository
git clone https://github.com/yksanjo/meeting-assistant.git
cd meeting-assistant

# Install dependencies
npm install

# Build the application
npm run build

# Start the production server
npm start
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database (choose one)
# For Supabase:
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# For Neon:
DATABASE_URL="postgresql://[USERNAME]:[PASSWORD]@[ENDPOINT]/[DATABASE]"

# For Vercel Postgres:
DATABASE_URL="postgresql://[USERNAME]:[PASSWORD]@[HOST]/[DATABASE]"

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# GitHub OAuth (optional but recommended)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# DeepSeek AI
DEEPSEEK_API_KEY="your-deepseek-api-key"
DEEPSEEK_API_URL="https://api.deepseek.com"

# App Configuration
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NEXT_PUBLIC_APP_NAME="Meeting Assistant"
```

## 🗄️ Database Setup

### Using Supabase (Recommended)

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose a name and region
   - Set a secure database password
   - Click "Create new project"

2. **Get your database URL:**
   - Go to Project Settings → Database
   - Copy the "Connection string" (URI format)

3. **Run database migrations:**
   ```bash
   npm run db:push
   ```

### Using Vercel Postgres

1. **Create Vercel Postgres database:**
   ```bash
   vercel db create meeting-assistant-db
   ```

2. **Connect to your project:**
   ```bash
   vercel db connect meeting-assistant-db
   ```

3. **Run migrations:**
   ```bash
   npm run db:push
   ```

## 🔐 Authentication Setup

### GitHub OAuth

1. **Create GitHub OAuth App:**
   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Application name: "Meeting Assistant"
   - Homepage URL: `https://your-domain.com`
   - Authorization callback URL: `https://your-domain.com/api/auth/callback/github`
   - Click "Register application"

2. **Get Client ID and Secret:**
   - Copy the "Client ID" and "Client Secret"
   - Add to your environment variables

### Google OAuth (Optional)

1. **Create Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Go to APIs & Services → Credentials
   - Click "Create Credentials" → OAuth 2.0 Client ID
   - Application type: "Web application"
   - Authorized redirect URIs: `https://your-domain.com/api/auth/callback/google`

2. **Get Client ID and Secret:**
   - Copy the "Client ID" and "Client Secret"
   - Add to your environment variables

## 🤖 DeepSeek AI Setup

1. **Get API Key:**
   - Go to [DeepSeek Platform](https://platform.deepseek.com)
   - Sign up or log in
   - Go to API Keys section
   - Create a new API key
   - Copy the key

2. **Configure in Environment:**
   ```env
   DEEPSEEK_API_KEY="your-api-key-here"
   DEEPSEEK_API_URL="https://api.deepseek.com"
   ```

## 🚀 Production Deployment

### Vercel Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure environment variables
   - Click "Deploy"

3. **Set up custom domain (optional):**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS as instructed

### Railway Deployment

1. **Create new project:**
   ```bash
   railway init
   ```

2. **Add PostgreSQL database:**
   ```bash
   railway add postgresql
   ```

3. **Deploy:**
   ```bash
   railway up
   ```

4. **Set environment variables:**
   ```bash
   railway variables set NEXTAUTH_URL="https://your-app.up.railway.app"
   railway variables set DATABASE_URL="$(railway variables get DATABASE_URL)"
   # ... set other variables
   ```

## 📊 Monitoring & Maintenance

### Health Checks

1. **Application Health:**
   ```
   GET https://your-domain.com/api/health
   ```

2. **Database Health:**
   ```bash
   npm run db:studio
   ```

3. **AI Service Health:**
   - Check DeepSeek API status
   - Monitor API usage and limits

### Backup Strategy

1. **Database Backups:**
   - Supabase: Automatic daily backups
   - Neon: Point-in-time recovery
   - Manual: Export with `pg_dump`

2. **Environment Backup:**
   ```bash
   # Export environment variables
   vercel env pull .env.local
   ```

### Scaling Considerations

1. **Database:**
   - Upgrade PostgreSQL plan as needed
   - Add read replicas for high traffic
   - Implement connection pooling

2. **Application:**
   - Enable Vercel's auto-scaling
   - Use CDN for static assets
   - Implement caching strategies

3. **AI Service:**
   - Monitor API rate limits
   - Implement request queuing
   - Cache AI responses when appropriate

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Failed:**
   - Check DATABASE_URL format
   - Verify database is running
   - Check firewall settings

2. **Authentication Not Working:**
   - Verify NEXTAUTH_URL matches deployment URL
   - Check OAuth callback URLs
   - Regenerate NEXTAUTH_SECRET

3. **AI Features Not Working:**
   - Verify DEEPSEEK_API_KEY is set
   - Check API quota/limits
   - Test connection with `npm run test:ai`

4. **Build Failures:**
   - Clear `.next` directory: `rm -rf .next`
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run type-check`

### Logs & Debugging

1. **Vercel Logs:**
   ```bash
   vercel logs
   ```

2. **Railway Logs:**
   ```bash
   railway logs
   ```

3. **Local Debugging:**
   ```bash
   npm run dev -- --debug
   ```

## 📈 Performance Optimization

1. **Database Optimization:**
   - Add indexes for frequently queried columns
   - Use connection pooling
   - Implement query caching

2. **Frontend Optimization:**
   - Enable Next.js image optimization
   - Implement code splitting
   - Use React.memo for expensive components

3. **API Optimization:**
   - Implement rate limiting
   - Add response caching
   - Use background jobs for AI processing

## 🔒 Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Set secure HTTP headers
- [ ] Implement rate limiting
- [ ] Sanitize user input
- [ ] Use parameterized queries
- [ ] Regular dependency updates
- [ ] Security headers (CSP, HSTS)
- [ ] Regular security audits

## 📞 Support

- **GitHub Issues**: [Report bugs](https://github.com/yksanjo/meeting-assistant/issues)
- **Documentation**: [Read docs](https://github.com/yksanjo/meeting-assistant#readme)
- **Community**: [GitHub Discussions](https://github.com/yksanjo/meeting-assistant/discussions)

## 🎉 Success!

Your Meeting Assistant is now deployed! 🚀

Next steps:
1. Test the application
2. Invite team members
3. Configure integrations
4. Set up monitoring
5. Enjoy productive meetings! 🤖