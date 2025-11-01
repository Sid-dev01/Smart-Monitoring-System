# 🚀 Smart Skill Training - Setup Guide

Complete setup instructions for getting the project up and running.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v16.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js) or **yarn**
   - Verify npm: `npm --version`
   - Or install yarn: `npm install -g yarn`

3. **Git** (for version control)
   - Download from: https://git-scm.com/

## 🔧 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd smart-skill-training
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

This will install all required dependencies including:
- React & React DOM
- Vite
- Tailwind CSS
- React Router DOM
- Zustand
- Framer Motion
- Recharts
- Lucide React
- Axios

### Step 3: Start Development Server

Using npm:
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application will start and automatically open in your default browser at:
```
http://localhost:3000
```

## 🎨 Development Features

### Hot Module Replacement (HMR)
- Changes to your code will automatically refresh in the browser
- No need to manually reload the page

### Fast Refresh
- React components update without losing state
- Instant feedback during development

## 🏗️ Building for Production

### Step 1: Create Production Build

Using npm:
```bash
npm run build
```

Or using yarn:
```bash
yarn build
```

This will:
- Optimize all assets
- Minify JavaScript and CSS
- Create a production-ready build in the `dist` folder

### Step 2: Preview Production Build

To test the production build locally:

Using npm:
```bash
npm run preview
```

Or using yarn:
```bash
yarn preview
```

## 📁 Project Structure Explained

```
smart-skill-training/
│
├── src/                          # Source code
│   ├── components/               # Reusable React components
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Footer.jsx           # Footer component
│   │   ├── Hero.jsx             # Hero section
│   │   ├── DemoModal.jsx        # Demo video modal
│   │   └── ...                  # Other components
│   │
│   ├── pages/                    # Page components
│   │   ├── Home.jsx             # Home page
│   │   ├── About.jsx            # About page
│   │   └── Reports.jsx          # Reports page
│   │
│   ├── store/                    # State management
│   │   └── useStore.js          # Zustand store
│   │
│   ├── utils/                    # Utility functions
│   │   └── mockApi.js           # Mock API calls
│   │
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
│
├── public/                       # Static assets
│   └── videos/                   # Video files
│
├── index.html                    # HTML template
├── package.json                  # Dependencies & scripts
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
└── postcss.config.js            # PostCSS configuration
```

## 🎯 Available Scripts

### Development
```bash
npm run dev          # Start development server
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run lint         # Run ESLint (if configured)
```

## 🔍 Troubleshooting

### Common Issues & Solutions

#### 1. Port Already in Use
If port 3000 is already in use:
- The dev server will automatically try port 3001
- Or you can change the port in `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3001, // Change to your preferred port
  },
})
```

#### 2. Dependencies Installation Failed
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

#### 3. Build Errors
- Ensure all dependencies are installed
- Check Node.js version (should be v16+)
- Clear the build cache: `rm -rf dist`

#### 4. Module Not Found Errors
- Make sure all files are in the correct directories
- Check import paths for typos
- Restart the development server

## 🎨 Customization Guide

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: { /* Your colors */ },
      accent: { /* Your colors */ },
    }
  }
}
```

### Adding New Pages
1. Create a new file in `src/pages/`
2. Add the route in `src/App.jsx`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```

### Modifying Mock Data
Edit `src/utils/mockApi.js` to change:
- Student counts
- Engagement percentages
- Report data
- Institution names

## 🌐 Browser Support

This application supports:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📦 Deployment Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Option 2: Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod`
3. Follow the prompts

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```
3. Run: `npm run deploy`

## 🆘 Getting Help

If you encounter any issues:

1. **Check the console** for error messages
2. **Read the error carefully** - it usually points to the problem
3. **Check file paths** - ensure all imports are correct
4. **Verify Node version** - must be v16 or higher
5. **Clear cache and reinstall** - sometimes fixes mysterious issues

## 💡 Tips for Best Experience

1. **Use a modern code editor** like VS Code
2. **Install extensions**:
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - ESLint
   - Prettier

3. **Enable auto-save** in your editor
4. **Keep terminal open** to see build errors immediately

## 🎓 Learning Resources

- React: https://react.dev/
- Vite: https://vitejs.dev/
- Tailwind CSS: https://tailwindcss.com/
- Framer Motion: https://www.framer.com/motion/
- Zustand: https://zustand-demo.pmnd.rs/

## 🎉 You're All Set!

Your Smart Skill Training platform should now be running. Enjoy developing!

For questions or support, contact: **hello@smartskill.ai**

---

**Happy Coding! 🚀**
