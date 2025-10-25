# 🚀 Quick Deployment Steps for Vercel

## EASIEST METHOD: Vercel Dashboard Upload

### Step 1: Prepare Your Files
✅ All files are ready in: `c:\Users\Aaftaab Ahmad Khan\Documents\PCL Score Dashboard`

### Step 2: Go to Vercel
1. Open browser and go to: **https://vercel.com/signup**
2. Sign up with GitHub, GitLab, Bitbucket, or Email
3. Complete the signup process

### Step 3: Create New Project
1. After login, go to: **https://vercel.com/new**
2. You'll see "Import Git Repository" or "Upload Project"

### Step 4: Upload Your Project
**Option A: Drag & Drop**
1. Open File Explorer
2. Navigate to: `c:\Users\Aaftaab Ahmad Khan\Documents\PCL Score Dashboard`
3. Select all files (Ctrl+A)
4. Drag them to the Vercel upload area

**Option B: Browse and Upload**
1. Click "Browse" on Vercel
2. Select your project folder
3. Click "Upload"

### Step 5: Configure Project
1. **Project Name**: Enter a name (e.g., `pcl-score-dashboard`)
2. **Framework Preset**: Select "Other" or leave as default
3. **Root Directory**: Leave as `./`
4. Click **"Deploy"**

### Step 6: Wait for Deployment
- Vercel will build and deploy your project
- Takes about 30-60 seconds
- You'll see a success screen with your URL

### Step 7: Get Your Live URL
Your dashboard will be live at:
```
https://your-project-name.vercel.app
```

### Step 8: Test Your Dashboard
1. Click the provided URL
2. Check if scores load correctly
3. Test sheet switching
4. Verify auto-refresh works

---

## ALTERNATIVE: Command Line Method

### Prerequisites
```bash
npm install -g vercel
```

### Deploy Commands
```bash
# Navigate to project
cd "c:\Users\Aaftaab Ahmad Khan\Documents\PCL Score Dashboard"

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

---

## 🔒 IMPORTANT: Secure Your API Key

After deployment:

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Navigate to**: APIs & Services → Credentials
3. **Click on your API Key**
4. **Under "Application restrictions"**:
   - Select "HTTP referrers (web sites)"
   - Add: `https://your-project-name.vercel.app/*`
   - Add: `https://*.vercel.app/*` (for preview deployments)
5. **Click "Save"**

This prevents others from using your API key!

---

## 📱 Sharing Your Dashboard

After deployment, share this URL:
```
https://your-project-name.vercel.app
```

Anyone can view it in real-time! 🎉

---

## 🔄 Updating Your Dashboard

**Method 1: Vercel Dashboard**
1. Make changes to your files locally
2. Go to your project in Vercel
3. Click "Deployments"
4. Click "Redeploy"
5. Upload updated files

**Method 2: Git Integration** (Automatic)
1. Push changes to GitHub
2. Vercel auto-deploys
3. No manual steps needed!

---

## ⚙️ Custom Domain (Optional)

1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In Vercel project settings, click "Domains"
3. Add your domain
4. Update DNS settings as instructed
5. Your dashboard will be at: `https://yourdomain.com`

---

## 🆘 Troubleshooting

**Issue**: Dashboard shows "Failed to load"
- **Solution**: Check Google Sheets sharing is "Anyone with link can view"

**Issue**: API Key doesn't work
- **Solution**: Add Vercel domain to API key restrictions

**Issue**: Images not loading
- **Solution**: Ensure Google Drive images are public

---

## ✅ You're Done!

Your dashboard is now:
- ✨ Live on the internet
- 🔄 Auto-updating every 2 seconds
- 📱 Accessible from any device
- 🚀 Fast and responsive

Enjoy your live dashboard! 🎊
