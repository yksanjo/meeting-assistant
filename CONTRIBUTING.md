# 🤝 Contributing to Meeting Assistant

Thank you for your interest in contributing to Meeting Assistant! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Feature Requests](#feature-requests)
- [Bug Reports](#bug-reports)
- [Community](#community)

## 📜 Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Git

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/meeting-assistant.git
   cd meeting-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up database**
   ```bash
   # Using Supabase (recommended) or local PostgreSQL
   npm run db:push
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

### Creating a New Feature

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Write code
   - Add tests
   - Update documentation

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: add AI-powered meeting summary generation

- Implement DeepSeek API integration
- Add summary generation endpoint
- Add tests for AI features
- Update documentation

Closes #123
```

## 🎨 Code Style

### TypeScript

- Use strict TypeScript configuration
- Define types for all props and state
- Use interfaces for object types
- Avoid `any` type

### React/Next.js

- Use functional components with hooks
- Use TypeScript for props
- Follow Next.js 14 App Router conventions
- Use server components when possible
- Implement proper error boundaries

### Styling

- Use Tailwind CSS for styling
- Follow design system in `components/ui`
- Use CSS variables for theming
- Mobile-first responsive design

### Database

- Use Drizzle ORM for database operations
- Define schemas in `drizzle/schema.ts`
- Use migrations for schema changes
- Implement proper error handling

### File Structure

```
meeting-assistant/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication
│   ├── dashboard/         # Dashboard pages
│   └── ...
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── meetings/         # Meeting components
│   └── ...
├── lib/                   # Utility libraries
│   ├── ai/               # AI integration
│   ├── db/               # Database utilities
│   └── ...
├── drizzle/              # Database schema
└── server/               # Server actions
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- path/to/test.tsx
```

### Test Structure

- Unit tests: `*.test.ts` or `*.test.tsx`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.e2e.test.ts`

### Writing Tests

```typescript
// Example test
import { render, screen } from '@testing-library/react'
import { MeetingCard } from './MeetingCard'

describe('MeetingCard', () => {
  it('renders meeting title', () => {
    render(<MeetingCard title="Team Sync" />)
    expect(screen.getByText('Team Sync')).toBeInTheDocument()
  })
})
```

## 📚 Documentation

### Updating Documentation

- Update README.md for major changes
- Add JSDoc comments for functions
- Update API documentation in `/docs`
- Add examples for new features

### Documentation Standards

- Use clear, concise language
- Include code examples
- Document all parameters and return values
- Update CHANGELOG.md for releases

## 🔄 Pull Request Process

### PR Checklist

- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Accessibility considered
- [ ] Security considerations addressed

### PR Review Process

1. **Automated Checks**
   - Tests pass
   - Code coverage maintained
   - TypeScript compiles
   - Linting passes

2. **Code Review**
   - At least one maintainer approval required
   - Address all review comments
   - Update PR as needed

3. **Merge**
   - Squash commits
   - Use conventional commit message
   - Delete feature branch

## 💡 Feature Requests

### Suggesting a Feature

1. **Check existing issues**
   - Search for similar feature requests
   - Check roadmap in README.md

2. **Create feature request**
   - Use "Feature Request" template
   - Describe the feature clearly
   - Explain use cases
   - Suggest implementation approach

3. **Discussion**
   - Participate in discussions
   - Provide additional context
   - Help with implementation if possible

## 🐛 Bug Reports

### Reporting a Bug

1. **Check existing issues**
   - Search for similar bugs
   - Check if already fixed

2. **Create bug report**
   - Use "Bug Report" template
   - Describe the bug clearly
   - Include steps to reproduce
   - Add screenshots if applicable
   - Include environment details

3. **Debugging**
   - Provide error messages
   - Share relevant code
   - Test on different environments

## 👥 Community

### Getting Help

- **GitHub Discussions**: Ask questions, share ideas
- **GitHub Issues**: Report bugs, request features
- **Documentation**: Check README and docs

### Contributing Beyond Code

- **Documentation**: Improve docs, add examples
- **Testing**: Write tests, report bugs
- **Design**: Suggest UI improvements
- **Translation**: Help with localization
- **Community**: Help other contributors

### Recognition

All contributors will be:
- Listed in CONTRIBUTORS.md
- Recognized in release notes
- Thanked in the community

## 📝 Additional Resources

- [Project Roadmap](ROADMAP.md)
- [API Documentation](API.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

## 🙏 Thank You!

Thank you for contributing to Meeting Assistant! Your help makes this project better for everyone.

Happy coding! 🚀