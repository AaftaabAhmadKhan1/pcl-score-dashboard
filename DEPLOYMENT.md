# PW Champions League - Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites
- A Vercel account (sign up at https://vercel.com)
- Your project files ready

### Method 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Navigate to your project folder**:
   ```bash
   cd "c:\Users\Aaftaab Ahmad Khan\Documents\PCL Score Dashboard"
   ```

3. **Login to Vercel**:
   ```bash
   vercel login
   ```

4. **Deploy**:
   ```bash
   vercel
   ```
   - Press Enter to accept defaults
   - Your project will be deployed!

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via Vercel Dashboard (Easiest)

1. **Go to https://vercel.com/new**

2. **Import Git Repository** (if you have GitHub):
   - Connect your GitHub account
   - Import the repository
   - Click "Deploy"

3. **Import Project via Drag & Drop**:
   - Drag your project folder to the upload area
   - Or click "Browse" and select your folder
   - Click "Deploy"

### Method 3: Deploy via GitHub

1. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository

2. **Push your code to GitHub**:
   ```bash
   cd "c:\Users\Aaftaab Ahmad Khan\Documents\PCL Score Dashboard"
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Select "Import Git Repository"
   - Choose your repository
   - Click "Deploy"

### After Deployment

1. Vercel will provide you with a URL like: `https://your-project.vercel.app`
2. Your dashboard will be live!
3. Any updates you push will automatically redeploy

### Configuration
- All settings are in `script.js`
- Your Google Sheets API key is already configured
- No server-side configuration needed!

### Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 🔒 Security Note
Your API key is exposed in the client-side code. For production:
- Use API key restrictions in Google Cloud Console
- Restrict to HTTP referrers (your Vercel domain)
- Consider using Vercel Serverless Functions for better security

## 📞 Support
If you encounter issues, check:
- Vercel deployment logs
- Browser console for errors
- Google Sheets API settings
