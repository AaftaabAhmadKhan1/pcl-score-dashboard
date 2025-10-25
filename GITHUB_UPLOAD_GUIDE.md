# 📤 GitHub Upload Guide

## Complete Steps to Upload Your Project to GitHub

### Method 1: GitHub Desktop (Easiest)

#### Step 1: Install GitHub Desktop
1. Download from: https://desktop.github.com/
2. Install and open GitHub Desktop
3. Sign in with your GitHub account (or create one at https://github.com/signup)

#### Step 2: Create Repository
1. Click **"File"** → **"New Repository"**
2. Fill in:
   - **Name**: `pcl-score-dashboard`
   - **Description**: `Real-time score dashboard for PW Champions League`
   - **Local Path**: Browse to `c:\Users\Aaftaab Ahmad Khan\Documents\`
   - Check ✅ "Initialize this repository with a README"
3. Click **"Create Repository"**

#### Step 3: Publish to GitHub
1. Click **"Publish repository"** button
2. Uncheck "Keep this code private" (if you want it public)
3. Click **"Publish repository"**
4. Done! Your code is now on GitHub! 🎉

Your repository URL will be:
```
https://github.com/YOUR_USERNAME/pcl-score-dashboard
```

---

### Method 2: Command Line (For Developers)

#### Step 1: Create GitHub Repository Online
1. Go to: https://github.com/new
2. Repository name: `pcl-score-dashboard`
3. Description: `Real-time score dashboard for PW Champions League`
4. Select: **Public** or **Private**
5. Don't initialize with README (we already have one)
6. Click **"Create repository"**

#### Step 2: Run These Commands

Open PowerShell and run:

```powershell
# Navigate to your project
cd "c:\Users\Aaftaab Ahmad Khan\Documents\PCL Score Dashboard"

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: PW Champions League Dashboard"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/pcl-score-dashboard.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

#### Step 3: Enter Credentials
- You'll be asked for username and password
- For password, use a **Personal Access Token** (not your GitHub password)
- Get token from: https://github.com/settings/tokens

---

### Method 3: Upload via GitHub Web Interface

#### Step 1: Create New Repository
1. Go to: https://github.com/new
2. Repository name: `pcl-score-dashboard`
3. Click **"Create repository"**

#### Step 2: Upload Files
1. Click **"uploading an existing file"** link
2. Drag your folder or click **"choose your files"**
3. Select all files from: `c:\Users\Aaftaab Ahmad Khan\Documents\PCL Score Dashboard`
4. Add commit message: "Initial commit"
5. Click **"Commit changes"**

---

## 🔧 After Upload: Connect to Vercel

### Option A: Vercel + GitHub Integration (Automatic Deployment)

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your GitHub repository: `pcl-score-dashboard`
4. Click **"Deploy"**
5. Every GitHub commit = automatic deployment! 🚀

### Option B: Manual Vercel Deployment

Follow the steps in `VERCEL_DEPLOYMENT_GUIDE.md`

---

## 📝 Making Updates After Upload

### Using GitHub Desktop:
1. Make changes to your files
2. Open GitHub Desktop
3. Review changes in left panel
4. Add commit message
5. Click **"Commit to main"**
6. Click **"Push origin"**

### Using Command Line:
```powershell
cd "c:\Users\Aaftaab Ahmad Khan\Documents\PCL Score Dashboard"
git add .
git commit -m "Your update message"
git push
```

---

## 🔒 Important: Secure Your API Key

Before uploading to GitHub, you might want to hide your API key:

### Option 1: Keep it as is (Simple but Less Secure)
- API key is visible in code
- Restrict it in Google Cloud Console to your domain only

### Option 2: Use Environment Variables (More Secure)
1. Create `.env` file (already in .gitignore)
2. Move API key there
3. Use Vercel environment variables

For this project, **Option 1 is fine** since you'll restrict the API key to your deployed domain.

---

## ✅ Verification Steps

After uploading to GitHub:

1. ✅ Visit: `https://github.com/YOUR_USERNAME/pcl-score-dashboard`
2. ✅ Check all files are there
3. ✅ README.md displays correctly
4. ✅ Clone and test locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pcl-score-dashboard.git
   cd pcl-score-dashboard
   # Open index.html in browser
   ```

---

## 🎉 Next Steps

1. ✅ Code is on GitHub
2. ✅ Deploy to Vercel (see VERCEL_DEPLOYMENT_GUIDE.md)
3. ✅ Secure your API key
4. ✅ Share your live URL!

---

## 🆘 Troubleshooting

**Error: "git is not recognized"**
- Install Git from: https://git-scm.com/download/win
- Restart PowerShell

**Error: "Permission denied"**
- Generate SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
- Or use Personal Access Token

**Error: "Repository already exists"**
- Use a different repository name
- Or delete existing repository first

**Files not showing on GitHub**
- Check .gitignore file
- Make sure you ran `git add .`
- Run `git status` to see what's staged

---

## 📞 Need Help?

- GitHub Docs: https://docs.github.com
- Git Tutorial: https://git-scm.com/docs/gittutorial
- GitHub Desktop Help: https://docs.github.com/en/desktop

Your project is ready to be shared with the world! 🌍✨
