# 🤝 Contributing to Smart Skill Training

Thank you for considering contributing to Smart Skill Training! This document provides guidelines for contributing to the project.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Component Guidelines](#component-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/smart-skill-training.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

## 🛠️ Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Coding Standards

### JavaScript/React

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Example:

```jsx
// ✅ Good
const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="user-profile">
      {/* Component content */}
    </div>
  );
};

// ❌ Avoid
function UserProfile(props) {
  const [a, setA] = useState(false);
  // ...
}
```

### CSS/Tailwind

- Use Tailwind utility classes
- Follow mobile-first approach
- Use consistent spacing
- Leverage Tailwind's design system

```jsx
// ✅ Good
<button className="px-6 py-3 bg-accent-600 hover:bg-accent-700 rounded-lg">
  Click Me
</button>

// ❌ Avoid inline styles
<button style={{ padding: '12px 24px', background: '#a855f7' }}>
  Click Me
</button>
```

## 🧩 Component Guidelines

### File Structure

```
ComponentName/
├── ComponentName.jsx      # Main component
└── index.js               # Export file (optional)
```

Or simply:
```
ComponentName.jsx
```

### Component Template

```jsx
import { motion } from 'framer-motion';
import { IconName } from 'lucide-react';

/**
 * ComponentName - Brief description
 * @param {Object} props - Component props
 * @param {string} props.title - Title text
 */
const ComponentName = ({ title, children }) => {
  // State
  const [state, setState] = useState(initialValue);
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // Handlers
  const handleAction = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div className="component-wrapper">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### Props

- Use prop destructuring
- Define PropTypes or TypeScript types
- Provide default values when appropriate

```jsx
const Button = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  // Component logic
};
```

## 📦 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(reports): add export to PDF functionality

Add ability to export training reports as PDF files.
Includes custom styling and formatting.

Closes #123
```

```bash
fix(navbar): resolve mobile menu close issue

Fixed bug where mobile menu wouldn't close after
navigation on iOS devices.
```

```bash
docs(readme): update installation instructions

Added troubleshooting section for common issues.
```

## 🔄 Pull Request Process

### Before Submitting

1. ✅ Update documentation if needed
2. ✅ Test your changes thoroughly
3. ✅ Ensure code follows style guidelines
4. ✅ Run `npm run build` successfully
5. ✅ Add descriptive commit messages
6. ✅ Reference any related issues

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console errors
- [ ] Tested on multiple browsers
- [ ] Mobile responsive
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on all screen sizes
- [ ] Works in light and dark mode
- [ ] Smooth animations
- [ ] Accessible (keyboard navigation)
- [ ] Fast loading times

### Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🎨 Design Guidelines

### Colors

Use Tailwind color classes:
- Primary: `primary-*` (Blue gradient)
- Accent: `accent-*` (Purple gradient)
- Text: `gray-*` with dark mode variants

### Typography

- Headings: Use `font-bold` with appropriate sizes
- Body: Use `text-base` or `text-lg`
- Font family: Inter (default)

### Spacing

Follow Tailwind's spacing scale:
- sm: 0.5rem
- md: 1rem
- lg: 2rem
- xl: 3rem

### Animations

Use Framer Motion for:
- Page transitions
- Component entrance
- Interactive elements

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## 📚 Adding New Features

### 1. Create Feature Branch

```bash
git checkout -b feature/feature-name
```

### 2. Develop Feature

- Write clean, documented code
- Follow existing patterns
- Add necessary tests

### 3. Update Documentation

- Update README.md if needed
- Add comments to complex code
- Update FEATURES.md

### 4. Submit PR

- Describe changes clearly
- Link related issues
- Request review

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 96]
- Version: [e.g., 1.0.0]
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature

**Problem It Solves**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other solutions you've thought about

**Additional Context**
Any other information
```

## 📖 Documentation

When updating documentation:
- Use clear, concise language
- Add code examples where helpful
- Update table of contents if needed
- Check for typos and grammar

## 🤝 Code of Conduct

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy towards others

## ❓ Questions?

- Open an issue for discussion
- Email: hello@smartskill.ai
- Check existing documentation

## 🎉 Thank You!

Every contribution, no matter how small, is valued and appreciated!

---

**Happy Contributing! 🚀**
