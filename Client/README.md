# 🚀 Smart Skill Training - AI Powered Vision Platform

A modern, interactive, and visually stunning frontend application for monitoring classroom sessions in skill training programs. Built with React, Vite, Tailwind CSS, and powered by simulated AI analytics.

## ✨ Features

- 🎨 **Beautiful UI/UX**: Modern gradient designs with smooth animations using Framer Motion
- 📊 **Real-time Analytics Dashboard**: Simulated live metrics with auto-updating data
- 📈 **Interactive Reports**: Comprehensive session reports with detailed analytics and trend charts
- 🎥 **Demo Video Player**: Integrated video player with live metrics overlay
- 🌓 **Dark Mode Support**: Full dark mode implementation with smooth transitions
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🔔 **Toast Notifications**: Smart notification system for important events
- ⚡ **High Performance**: Built with Vite for lightning-fast development and production builds

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Zustand** - Lightweight state management
- **Recharts** - Data visualization and charts
- **Framer Motion** - Animation library
- **Lucide React** - Modern icon library
- **Axios** - HTTP client (for future API integration)

## 📁 Project Structure

```
smart-skill-training/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation bar with dark mode toggle
│   │   ├── Footer.jsx              # Footer with links and contact info
│   │   ├── Hero.jsx                # Landing page hero section
│   │   ├── StatsSection.jsx        # Animated statistics counters
│   │   ├── FeaturesSection.jsx     # Feature cards with icons
│   │   ├── LiveMonitoringPreview.jsx # Live monitoring preview
│   │   ├── DemoModal.jsx           # Video demo modal with metrics
│   │   └── ToastContainer.jsx      # Toast notification system
│   ├── pages/
│   │   ├── Home.jsx                # Landing page
│   │   ├── About.jsx               # About us and team page
│   │   └── Reports.jsx             # Training reports dashboard
│   ├── store/
│   │   └── useStore.js             # Zustand global state
│   ├── utils/
│   │   └── mockApi.js              # Mock API for simulated data
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles and Tailwind directives
├── public/                         # Static assets
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind configuration
└── postcss.config.js               # PostCSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd smart-skill-training
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📱 Pages Overview

### 1. Home Page (`/`)
- **Hero Section**: Stunning gradient background with call-to-action buttons
- **Stats Section**: Animated counters showing key metrics
- **Features Section**: 6 feature cards with hover animations
- **Live Monitoring Preview**: Sample video feed with performance metrics

### 2. About Page (`/about`)
- **Mission Statement**: Company vision and values
- **Team Section**: Meet the development team
  - **Frontend**: Riddhi Rastogi, Priyanshi Raj
  - **Machine Learning**: Siddhartha Gautam, Nitin Jaiswal
  - **Backend**: Khushi Mishra, Ruchi Singh
- **Contact Information**: Get in touch section

### 3. Reports Page (`/reports`)
- **Reports Table**: List of all training sessions with:
  - Institution name
  - Date
  - Engagement percentage
  - Score (out of 100)
  - Status flag (Green/Yellow/Red)
- **Detail Drawer**: Click any report to see:
  - Comprehensive session summary
  - Weekly trend charts
  - Key insights and metrics

### 4. Demo Modal
- **Video Player**: Sample training session video
- **Live Metrics**: Real-time updating metrics
  - Student count
  - Engagement percentage
  - Session score
  - Detected activities
- **Activity Timeline**: Time-stamped updates log

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Accent**: Purple gradient (#a855f7 to #7e22ce)
- **Dark Mode**: Full dark theme support

### Animations
- **Framer Motion**: Page transitions, card animations, hover effects
- **Count-up Animations**: Animated statistics counters
- **Loading States**: Shimmer effects and skeleton screens
- **Smooth Transitions**: All interactions have smooth transitions

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet**: Adaptive layouts for medium screens
- **Desktop**: Full-featured experience on large screens

## 🔧 Mock API

The application uses simulated data from `src/utils/mockApi.js`:

- **`getDemoVideo()`**: Returns sample video URL
- **`getLiveMetrics()`**: Simulates real-time classroom metrics
- **`getReports()`**: Generates training session reports
- **`getReportDetails(id)`**: Returns detailed report data
- **`getStats()`**: Returns platform statistics

All functions include artificial delays to simulate network requests.

## 🎯 Key Features Explained

### 1. Real-time Metric Updates
The demo modal updates metrics every 3 seconds to simulate live monitoring. This is achieved using `setInterval` in the `DemoModal` component.

### 2. Flag System
Reports are automatically flagged based on scores:
- **Green**: Score ≥ 75 (Good performance)
- **Yellow**: Score 50-74 (Needs improvement)
- **Red**: Score < 50 (Requires attention)

### 3. Interactive Charts
Using Recharts to display weekly trends of engagement and scores in the report details drawer.

### 4. Dark Mode
Toggle between light and dark themes with a single click. The theme preference is managed via Zustand and applies across all components.

### 5. Toast Notifications
Smart notifications appear for:
- Low engagement alerts
- High performance celebrations
- System updates

## 🚀 Hackathon Enhancements

This project includes several features perfect for hackathon presentations:

1. **Professional Design**: Eye-catching gradients and modern UI
2. **Smooth Animations**: Polished user experience
3. **Interactive Demo**: Live metrics simulation
4. **Data Visualization**: Charts and trend analysis
5. **Responsive**: Works perfectly on presentation screens and mobile devices
6. **Dark Mode**: Modern feature that judges appreciate
7. **Mock Data**: No backend required - runs standalone

## 🎓 Team Credits

### Frontend Development
- **Riddhi Rastogi** - React + UI/UX Engineer
- **Priyanshi Raj** - React + UI/UX Engineer

### Machine Learning
- **Siddhartha Gautam** - Computer Vision Expert
- **Nitin Jaiswal** - Pose Estimation Specialist

### Backend Development
- **Khushi Mishra** - API & Infrastructure Engineer
- **Ruchi Singh** - Backend Developer

## 📧 Contact

- **Email**: hello@smartskill.ai
- **Website**: Smart Skill Training Platform

## 📄 License

This project is created for educational and hackathon purposes.

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for optimal user experience
- Created with passion for education technology

---

**Made with ❤️ by the Smart Skill Training Team**

🌟 If you find this project helpful, please consider giving it a star!
