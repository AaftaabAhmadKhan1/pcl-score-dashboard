# 📝 Complete Guide: Setting Up Google Sheets API

## Step-by-Step Instructions with Screenshots Guide

---

## Part 1: Create Your Google Sheet

### Step 1.1: Create a New Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click on **"+ Blank"** to create a new spreadsheet
3. Name your sheet: **"PW Champions League Scores"**

### Step 1.2: Add Your Data
Enter data in this exact format:

| A (Team Name) | B (Score) | C (Matches) | D (Status) |
|---------------|-----------|-------------|------------|
| Warriors      | 150       | 10          | Active     |
| Champions     | 200       | 12          | Leading    |
| Legends       | 175       | 11          | Active     |
| Titans        | 130       | 9           | Chasing    |

**Important Notes:**
- Row 1 can have headers (optional)
- Data should start from Row 2
- Column A: Team names (text)
- Column B: Scores (numbers only)
- Column C: Matches played (numbers only)
- Column D: Status (text)

### Step 1.3: Get Your Spreadsheet ID
1. Look at your browser's URL bar
2. The URL looks like: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
3. Copy the part between `/d/` and `/edit` - this is your **SPREADSHEET_ID**
4. Example: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`
5. **Save this ID somewhere** - you'll need it later!

### Step 1.4: Make Your Sheet Publicly Accessible
1. Click the **"Share"** button (top-right corner)
2. Click **"Change to anyone with the link"**
3. Make sure it says **"Anyone with the link"** and **"Viewer"**
4. Click **"Done"**

⚠️ **Important**: The sheet must be publicly accessible (view-only) for the API to work!

---

## Part 2: Set Up Google Cloud Project

### Step 2.1: Go to Google Cloud Console
1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account (same one used for the sheet)

### Step 2.2: Create a New Project
1. Click on the **project dropdown** at the top (next to "Google Cloud")
2. Click **"NEW PROJECT"** (top-right)
3. Enter Project Details:
   - **Project name**: `PW Champions League`
   - **Location**: Leave as default (No organization)
4. Click **"CREATE"**
5. Wait 10-15 seconds for the project to be created
6. Click **"SELECT PROJECT"** when the notification appears

---

## Part 3: Enable Google Sheets API

### Step 3.1: Navigate to APIs & Services
1. Click the **☰ hamburger menu** (top-left)
2. Scroll down and hover over **"APIs & Services"**
3. Click **"Library"**

### Step 3.2: Enable Google Sheets API
1. In the search box, type: **"Google Sheets API"**
2. Click on **"Google Sheets API"** from the results
3. Click the blue **"ENABLE"** button
4. Wait a few seconds for it to enable
5. You'll see "API enabled" confirmation

---

## Part 4: Create API Key

### Step 4.1: Go to Credentials
1. Click the **☰ hamburger menu** (top-left)
2. Hover over **"APIs & Services"**
3. Click **"Credentials"**

### Step 4.2: Create API Key
1. Click **"+ CREATE CREDENTIALS"** (top of page)
2. Select **"API key"** from the dropdown
3. A popup will appear with your API key
4. **COPY YOUR API KEY** immediately!
   - It looks like: `AIzaSyB1234567890abcdefghijklmnopqrstuvw`
5. Click **"CLOSE"** (we'll restrict it in the next step)

### Step 4.3: Restrict Your API Key (IMPORTANT for Security)
1. Find your newly created API key in the list
2. Click the **pencil/edit icon** next to it
3. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Click **"Select APIs"** dropdown
   - Check ✅ **"Google Sheets API"**
   - Uncheck all other APIs
4. Under **"Application restrictions"** (Optional but recommended):
   - If testing locally: Select **"None"**
   - If deployed online: Select **"HTTP referrers (web sites)"**
     - Click **"ADD AN ITEM"**
     - Enter: `http://localhost/*` (for local testing)
     - Click **"ADD AN ITEM"** again
     - Enter your website URL (if deployed)
5. Click **"SAVE"** at the bottom

---

## Part 5: Configure Your Dashboard

### Step 5.1: Open script.js
1. Open the `script.js` file in your code editor
2. Find the `CONFIG` section at the top (lines 5-17)

### Step 5.2: Update Configuration
Replace the placeholder values with your actual values:

```javascript
const CONFIG = {
    // Paste your API key here (from Step 4.2)
    API_KEY: 'AIzaSyB1234567890abcdefghijklmnopqrstuvw',
    
    // Paste your Spreadsheet ID here (from Step 1.3)
    SPREADSHEET_ID: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    
    // Your sheet name (default is Sheet1)
    SHEET_NAME: 'Sheet1',
    
    // Range of cells to read
    RANGE: 'A2:D',
    
    // Refresh interval (2000 = 2 seconds)
    REFRESH_INTERVAL: 2000
};
```

**Example with real values:**
```javascript
const CONFIG = {
    API_KEY: 'AIzaSyCGHxK9mP3nL2oQ5vR8wT4uY6iO7pA1sD3',
    SPREADSHEET_ID: '1xY2zA3bC4dE5fG6hI7jK8lM9nO0pQ1rS2tU3vW4xY5z',
    SHEET_NAME: 'Sheet1',
    RANGE: 'A2:D',
    REFRESH_INTERVAL: 2000
};
```

### Step 5.3: Save the File
1. Press **Ctrl + S** (Windows) or **Cmd + S** (Mac)
2. Make sure the file is saved

---

## Part 6: Test Your Dashboard

### Step 6.1: Open the Dashboard
1. Navigate to your project folder
2. Right-click on `index.html`
3. Choose **"Open with"** → Your web browser (Chrome, Firefox, Edge, etc.)

**OR** use Live Server (Recommended):
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Click **"Open with Live Server"**

### Step 6.2: Check for Errors
1. Open your browser's **Developer Console**:
   - Press **F12** (Windows/Linux)
   - Press **Cmd + Option + I** (Mac)
2. Look at the **Console** tab
3. Check for any error messages:

**✅ Success Messages:**
```
PW Champions League Dashboard
Dashboard loaded successfully!
Configuration: 
  API Key: ✓ Configured
  Spreadsheet ID: ✓ Configured
```

**❌ Common Error Messages (and how to fix them):**

**Error: "Please configure your Google Sheets API credentials"**
- Fix: Update API_KEY and SPREADSHEET_ID in script.js

**Error: "API Error: 403"**
- Fix: Make sure Google Sheets API is enabled (Part 3)
- Fix: Make sure your sheet is publicly shared (Step 1.4)
- Fix: Check your API key is correct

**Error: "API Error: 400"**
- Fix: Check your SPREADSHEET_ID is correct
- Fix: Verify SHEET_NAME matches your sheet's name
- Fix: Make sure RANGE is valid (e.g., 'A2:D')

**Error: "No data found"**
- Fix: Add data to your sheet starting from row 2
- Fix: Make sure you have data in columns A, B, C, and D

---

## Part 7: Update Scores in Real-Time

### Step 7.1: Test Real-Time Updates
1. Keep the dashboard open in your browser
2. Go to your Google Sheet
3. Change any team's score in Column B
4. Watch your dashboard - it should update within 2-3 seconds! ⚡

### Step 7.2: Add New Teams
1. Add a new row in your Google Sheet
2. Enter: Team name | Score | Matches | Status
3. The new team will appear on the dashboard automatically

### Step 7.3: Remove Teams
1. Delete a row from your Google Sheet
2. The team will disappear from the dashboard on next refresh

---

## 🎯 Quick Reference Checklist

- [ ] Created Google Sheet with correct format (Team, Score, Matches, Status)
- [ ] Copied Spreadsheet ID from URL
- [ ] Made sheet publicly accessible (Share → Anyone with link → Viewer)
- [ ] Created Google Cloud Project
- [ ] Enabled Google Sheets API
- [ ] Created API Key
- [ ] Restricted API Key to Google Sheets API only
- [ ] Updated script.js with API_KEY and SPREADSHEET_ID
- [ ] Saved script.js file
- [ ] Opened index.html in browser
- [ ] Verified scores are displaying
- [ ] Tested real-time updates by changing a score

---

## 📞 Troubleshooting

### Problem: Dashboard shows "Loading..." forever
**Solutions:**
1. Check browser console for errors (F12)
2. Verify API_KEY is correct (no extra spaces)
3. Verify SPREADSHEET_ID is correct
4. Make sure sheet is publicly shared
5. Check internet connection

### Problem: "Failed to load scores: 403"
**Solutions:**
1. Go to Google Cloud Console
2. Verify Google Sheets API is enabled
3. Check API key restrictions
4. Make sure sheet is shared with "Anyone with the link"

### Problem: Scores not updating
**Solutions:**
1. Check if sheet data is changing
2. Look at "Last Updated" time on dashboard
3. Check browser console for errors
4. Try manually refreshing the page (F5)
5. Clear browser cache (Ctrl + Shift + Delete)

### Problem: Some teams not showing
**Solutions:**
1. Verify data starts from row 2
2. Check that all columns (A, B, C, D) have data
3. Make sure scores are numbers (not text)
4. Check RANGE in script.js includes all rows

---

## 🔒 Security Best Practices

1. **Never share your API key publicly**
   - Don't commit it to public GitHub repositories
   - Don't share screenshots with your API key visible

2. **Use API restrictions**
   - Restrict to Google Sheets API only
   - Add HTTP referrer restrictions when deployed

3. **Keep your sheet view-only**
   - Share with "Viewer" access only, not "Editor"
   - This prevents others from changing your data

4. **Monitor API usage**
   - Google Cloud Console → APIs & Services → Dashboard
   - Check for unusual activity

---

## 🚀 Next Steps

### Deploy Your Dashboard Online (Free Options):

**Option 1: GitHub Pages**
1. Create GitHub account
2. Create new repository
3. Upload all files
4. Enable GitHub Pages in Settings
5. Access at: `https://yourusername.github.io/repository-name/`

**Option 2: Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your folder
3. Get instant live URL

**Option 3: Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Import your project
3. Deploy automatically

---

## 📚 Additional Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Google Sheets](https://sheets.google.com/)

---

## ✅ Verification Steps

After completing all steps, verify:

1. ✅ Dashboard loads without errors
2. ✅ All teams from your sheet are displayed
3. ✅ Scores match your Google Sheet
4. ✅ Teams are ranked correctly (highest score first)
5. ✅ "Last Updated" time shows current time
6. ✅ When you change a score in the sheet, dashboard updates within 2-3 seconds
7. ✅ Changed scores flash with animation

---

**Congratulations! Your PW Champions League Dashboard is now live! 🎉🏆**

If you encounter any issues not covered here, check the browser console (F12) for specific error messages.
