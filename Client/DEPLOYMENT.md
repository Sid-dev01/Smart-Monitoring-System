# 🚀 Smart Skill Training - Deployment Guide

Complete guide for deploying your application to various hosting platforms.

## 📋 Pre-Deployment Checklist

Before deploying, ensure:
- ✅ All dependencies are installed
- ✅ Application builds successfully (`npm run build`)
- ✅ No console errors in production build
- ✅ All routes work correctly
- ✅ Images and assets load properly
- ✅ Environment variables are configured (if any)

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is perfect for React applications and offers:
- ✅ Automatic deployments from Git
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Instant rollbacks
- ✅ Preview deployments

#### Method A: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project directory
cd smart-skill-training

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

#### Method B: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your Git repository
5. Configure:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

**Your site will be live at**: `https://your-project.vercel.app`

---

### Option 2: Netlify

Netlify offers similar features to Vercel with great developer experience.

#### Method A: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Or direct deploy
netlify deploy --prod
```

#### Method B: Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login
3. Click "Add new site" → "Import an existing project"
4. Connect your Git provider
5. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
6. Click "Deploy site"

#### Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Your site will be live at**: `https://your-site.netlify.app`

---

### Option 3: GitHub Pages

Perfect for portfolio projects and free hosting.

#### Setup

1. Install gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Update `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/smart-skill-training",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/smart-skill-training/', // Your repo name
})
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages:
   - Go to repository Settings
   - Pages section
   - Source: `gh-pages` branch
   - Save

**Your site will be live at**: `https://yourusername.github.io/smart-skill-training`

---

### Option 4: Render

Free tier available with automatic deployments.

1. Go to [render.com](https://render.com)
2. Sign up/Login
3. Click "New +" → "Static Site"
4. Connect your Git repository
5. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
6. Click "Create Static Site"

**Your site will be live at**: `https://your-site.onrender.com`

---

### Option 5: Firebase Hosting

Google's hosting solution with excellent performance.

#### Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select:
# - Hosting
# - Use existing project or create new
# - Public directory: dist
# - Single-page app: Yes
# - GitHub deploys: No (or Yes if you want)

# Build your project
npm run build

# Deploy
firebase deploy
```

**Your site will be live at**: `https://your-project.firebaseapp.com`

---

### Option 6: AWS S3 + CloudFront

For production applications requiring AWS infrastructure.

#### Prerequisites
- AWS Account
- AWS CLI installed

#### Steps

```bash
# Install AWS CLI
npm install -g aws-cli

# Configure AWS credentials
aws configure

# Build project
npm run build

# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Enable static website hosting
aws s3 website s3://your-bucket-name --index-document index.html

# Upload files
aws s3 sync dist/ s3://your-bucket-name

# Set bucket policy for public access
aws s3api put-bucket-policy --bucket your-bucket-name --policy file://bucket-policy.json
```

**bucket-policy.json:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

#### CloudFront Setup
1. Go to AWS Console → CloudFront
2. Create Distribution
3. Origin: Your S3 bucket
4. Default Root Object: `index.html`
5. Create distribution

---

## 🔧 Build Optimization

### Before Deploying

```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Build for production
npm run build

# Test production build locally
npm run preview
```

### Optimize Bundle Size

1. **Analyze Bundle**:
```bash
npm install --save-dev rollup-plugin-visualizer
```

Add to `vite.config.js`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ],
})
```

2. **Code Splitting**: Already optimized by Vite

3. **Lazy Loading**: Consider lazy loading routes:
```javascript
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Reports = lazy(() => import('./pages/Reports'));
```

---

## 🌍 Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (up to 24 hours)

### Netlify

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS:
   - Type: A
   - Name: @
   - Value: 75.2.60.5
4. For www subdomain:
   - Type: CNAME
   - Name: www
   - Value: your-site.netlify.app

---

## 📊 Post-Deployment Monitoring

### 1. Google Analytics

Add to `index.html` before closing `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Error Tracking (Sentry)

```bash
npm install @sentry/react
```

Add to `main.jsx`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

## 🔐 Security Considerations

### 1. Environment Variables

Create `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Smart Skill Training
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

### 2. HTTPS

- All modern platforms provide free SSL
- Ensure all API calls use HTTPS
- Update mixed content if any

### 3. Security Headers

Add to `public/_headers` (for Netlify):
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

---

## 🚨 Troubleshooting Deployment

### Issue: 404 on Refresh

**Solution**: Configure rewrites/redirects

**Vercel** - `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Netlify** - `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Issue: Build Fails

**Check**:
- Node version compatibility
- Missing dependencies
- Build command is correct
- Environment variables are set

**Solution**:
```bash
# Clear cache
rm -rf node_modules dist
npm cache clean --force
npm install
npm run build
```

### Issue: Assets Not Loading

**Check**:
- Base path in `vite.config.js`
- Asset paths in code (use relative paths)
- Public folder structure

### Issue: Slow Load Times

**Solutions**:
- Enable CDN
- Optimize images
- Enable compression
- Use lazy loading
- Minimize bundle size

---

## 📈 Performance Optimization

### 1. Enable Compression

Most platforms auto-enable gzip/brotli compression.

### 2. Caching Strategy

Set cache headers in `public/_headers` (Netlify):
```
/static/*
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: no-cache
```

### 3. Image Optimization

- Use WebP format
- Compress images
- Lazy load images
- Use appropriate sizes

---

## ✅ Deployment Checklist

- [ ] Build passes successfully
- [ ] All routes work correctly
- [ ] Assets load properly
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Analytics configured
- [ ] Custom domain configured (if needed)
- [ ] SSL certificate active
- [ ] Tested on multiple devices
- [ ] Tested on multiple browsers
- [ ] Error tracking setup
- [ ] Backup/version control setup

---

## 🎯 Quick Deploy Commands

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod
```

### GitHub Pages
```bash
npm run deploy
```

### Firebase
```bash
firebase deploy
```

---

## 📞 Support

If you encounter deployment issues:

1. Check platform documentation
2. Review build logs
3. Test locally first
4. Check browser console for errors
5. Verify all configurations

**Contact**: hello@smartskill.ai

---

## 🎉 Success!

Once deployed, your Smart Skill Training platform will be live and accessible to the world!

**Share your deployment URL**: `https://your-site.domain.com`

**Pro Tip**: Set up continuous deployment so every push to your main branch automatically deploys! 🚀

---

**Happy Deploying! 🌐**
