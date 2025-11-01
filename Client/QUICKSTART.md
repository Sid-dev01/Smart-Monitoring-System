# ⚡ Smart Skill Training - Quick Start

Get up and running in 5 minutes!

## 🎯 Prerequisites Check

Before starting, verify you have:

```bash
# Check Node.js version (need v16+)
node --version

# Check npm version
npm --version
```

❌ **Don't have Node.js?** → Download from [nodejs.org](https://nodejs.org/)

## 🚀 Installation (3 Steps)

### Step 1: Navigate to Project
```bash
cd smart-skill-training
```

### Step 2: Install Dependencies
```bash
npm install
```
⏱️ *This will take 1-2 minutes*

### Step 3: Start Development Server
```bash
npm run dev
```

✅ **Success!** Your app is now running at `http://localhost:3000`

## 📱 What You'll See

### Home Page (`/`)
- Beautiful gradient hero section
- Animated statistics
- Feature showcase
- Live monitoring preview

### About Page (`/about`)
- Team information
- Mission statement
- Contact details

### Reports Page (`/reports`)
- Training session reports
- Interactive data table
- Detailed analytics drawer

## 🎮 Try These Features

### 1. Request Demo
- Click "Request a Demo" button
- Watch the video with live metrics
- See real-time updates every 3 seconds

### 2. View Reports
- Navigate to Reports page
- Click any row to see details
- Check the trend charts

### 3. Toggle Dark Mode
- Click moon/sun icon in navbar
- Watch smooth theme transition

### 4. Test Responsiveness
- Resize your browser window
- Open on mobile device
- Check tablet view

## 🛠️ Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Stop server
Ctrl + C (in terminal)
```

## 📂 Key Files to Explore

```
📁 Components to customize:
src/components/Hero.jsx         → Landing hero section
src/components/FeaturesSection.jsx → Feature cards
src/pages/Reports.jsx           → Reports dashboard

📁 Styling:
tailwind.config.js              → Theme colors
src/index.css                   → Global styles

📁 Mock Data:
src/utils/mockApi.js            → Simulated data

📁 State Management:
src/store/useStore.js           → Global state
```

## 🎨 Quick Customizations

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR', // Change this
  }
}
```

### Update Team Members
Edit `src/pages/About.jsx`:
```javascript
const team = {
  frontend: [
    { name: 'Your Name', role: 'Your Role' }
  ]
}
```

### Modify Mock Data
Edit `src/utils/mockApi.js`:
```javascript
export const getReports = async () => {
  // Add your institutions here
}
```

## 🚨 Troubleshooting

### Port Already in Use?
```bash
# Kill process on port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill

# On Windows:
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

### Dependencies Won't Install?
```bash
# Clear cache and retry
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Build Fails?
```bash
# Check Node version
node --version  # Should be v16+

# Clear build folder
rm -rf dist

# Rebuild
npm run build
```

## 🎯 Next Steps

1. ✅ **Explore**: Browse all pages and features
2. 📚 **Read**: Check out README.md for details
3. 🎨 **Customize**: Make it your own
4. 🚀 **Deploy**: Use DEPLOYMENT.md guide
5. 🏆 **Present**: Win your hackathon!

## 📖 Documentation

- `README.md` → Complete project overview
- `SETUP_GUIDE.md` → Detailed installation
- `FEATURES.md` → All features explained
- `DEPLOYMENT.md` → Hosting guide
- `CONTRIBUTING.md` → How to contribute

## 💡 Pro Tips

### 1. Hot Reload
Changes auto-refresh in browser. No manual reload needed!

### 2. Component Development
- Keep components small and focused
- Use existing components as templates
- Follow the established patterns

### 3. State Management
- Use Zustand store for global state
- Keep local state in components
- Check `useStore.js` for examples

### 4. Styling
- Use Tailwind classes
- Follow mobile-first approach
- Check existing components for patterns

## 🎨 UI Components Available

```
✅ Navbar           - Navigation with dark mode
✅ Footer           - Contact and links
✅ Hero             - Landing section
✅ StatsSection     - Animated counters
✅ FeaturesSection  - Feature cards
✅ DemoModal        - Video with metrics
✅ ToastContainer   - Notifications
✅ LiveMonitoring   - Preview section
```

## 🔗 Useful Links

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org)
- [Lucide Icons](https://lucide.dev)

## 🎯 Development Workflow

```
1. Start server → npm run dev
2. Make changes → Auto-reload
3. Test features → Browser
4. Build → npm run build
5. Preview → npm run preview
6. Deploy → See DEPLOYMENT.md
```

## ⚡ Performance Tips

- Images: Use WebP format
- Code: Already optimized by Vite
- Loading: Lazy load heavy components
- Caching: Handled by build tools

## 🎉 You're Ready!

Everything is set up and ready to go. Start exploring and building!

### Need Help?

- 📧 Email: hello@smartskill.ai
- 📚 Docs: Check other .md files
- 🐛 Issues: Check TROUBLESHOOTING section

---

**Happy Building! 🚀**

Remember: This is your project now. Customize it, break it, fix it, learn from it!

✨ **Make something amazing!** ✨
