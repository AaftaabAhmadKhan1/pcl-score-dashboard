# 🏆 PW Champions League - Live Score Dashboard

A professional, real-time score dashboard that displays competition scores from Google Sheets with a modern, animated interface.

![Dashboard Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **Real-time Updates**: Automatically fetches and displays scores every 2 seconds
- **Multiple Sheets Support**: Dropdown menu to switch between different rounds/sheets
- **Team Icons**: Display custom team logos from Google Drive
- **Modern UI**: Beautiful gradient designs with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Live Indicator**: Shows when the dashboard is actively updating
- **Automatic Ranking**: Teams are sorted by score automatically
- **Score Change Animation**: Visual highlights when scores update
- **Auto Sheet Detection**: Automatically detects new sheets added to your spreadsheet
- **Error Handling**: Robust error handling with user-friendly messages

## 🚀 Live Demo

[View Live Dashboard](https://your-dashboard-url.vercel.app)

## 📋 Prerequisites

1. A Google account
2. A web browser (Chrome, Firefox, Safari, or Edge)
3. A Google Sheet with your team scores

## 🛠️ Setup Instructions

### Step 1: Prepare Your Google Sheet

Create a Google Sheet with the following structure (starting from row 2):

| Column A | Column B | Column C |
|----------|----------|----------|
| Team Name | Score | Team Icon URL |
| Warriors | 150 | https://drive.google.com/file/d/abc123/view |
| Champions | 200 | https://drive.google.com/file/d/def456/view |

**Team Icon URLs**: Upload team logos to Google Drive, set to "Anyone with the link can view", and paste the sharing link.

### Step 2: Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**
4. Create credentials → **API Key**
5. Copy your API key

### Step 3: Configure the Dashboard

1. Open `script.js`
2. Update the `CONFIG` object:

```javascript
const CONFIG = {
    API_KEY: 'YOUR_GOOGLE_SHEETS_API_KEY',
    SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID',
    SHEET_NAME: 'Your Sheet Name',
    RANGE: 'A2:C',
    REFRESH_INTERVAL: 2000
};
```

### Step 4: Run Locally

```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx serve

# Or using VS Code Live Server extension
```

Open `http://localhost:8000` in your browser.

## 🌐 Deploy to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

### Manual Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🔒 Security

**Important**: After deployment, secure your API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Click on your API Key
3. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add: `https://your-domain.vercel.app/*`
4. Click "Save"

## 📁 Project Structure

```
PCL Score Dashboard/
├── index.html              # Main HTML file
├── styles.css             # All styling and animations
├── script.js              # Google Sheets API integration & logic
├── vercel.json            # Vercel deployment configuration
├── .gitignore             # Git ignore file
├── README.md              # This file
├── DEPLOYMENT.md          # Deployment guide
└── VERCEL_DEPLOYMENT_GUIDE.md  # Detailed Vercel guide
```

## 🎨 Customization

### Change Theme Colors

Edit `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #10b981;
    --danger-color: #ef4444;
}
```

### Adjust Refresh Interval

Edit `script.js`:

```javascript
REFRESH_INTERVAL: 2000  // Time in milliseconds (2000 = 2 seconds)
```

### Modify Card Layout

Edit `styles.css` - `.scoreboard` section:

```css
.scoreboard {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 15px;
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aaftaab Ahmad Khan**

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Google Sheets API for data integration
- Vercel for hosting

## 📞 Support

If you encounter any issues:
- Check the browser console for errors
- Verify Google Sheets API settings
- Ensure sheet sharing is set to "Anyone with link can view"
- Check [Troubleshooting Guide](./VERCEL_DEPLOYMENT_GUIDE.md#-troubleshooting)

## 🎯 Roadmap

- [ ] Add user authentication
- [ ] Export data to PDF/Excel
- [ ] Historical score tracking
- [ ] Multiple competition support
- [ ] Admin panel for score management
- [ ] Mobile app version

---

Made with ❤️ for PW Champions League

1. Create a new Google Sheet or use an existing one
2. Format your data with the following columns (starting from row 2):

   | Column A | Column B | Column C |
   |----------|----------|----------|
   | Team Name | Score | Team Icon URL |
   | Team Alpha | 150 | https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing |
   | Team Beta | 120 | https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing |
   | Team Gamma | 180 | https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing |

   **Example:**
   ```
   Row 1 (Headers): Team Name | Score | Team Icon
   Row 2: Warriors | 150 | https://drive.google.com/file/d/abc123/view
   Row 3: Champions | 200 | https://drive.google.com/file/d/def456/view
   Row 4: Legends | 175 | https://drive.google.com/file/d/ghi789/view
   ```

3. Make sure your sheet is named (default is "Sheet1")

#### 📸 Adding Team Icons (Column C)

Team icons are displayed in the top-right corner of each team card:

1. **Upload your team icon/logo to Google Drive**
2. **Right-click the image → Share → "Anyone with the link can view"**
3. **Copy the sharing link** (format: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`)
4. **Paste the link in Column C** of your Google Sheet
5. The dashboard will automatically convert the link and display the image
6. **If no icon URL is provided**, the first letter of the team name will be shown as a fallback

### Step 2: Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**:
   - Click on "Enable APIs and Services"
   - Search for "Google Sheets API"
   - Click "Enable"

### Step 3: Create an API Key

1. In Google Cloud Console, go to **Credentials**
2. Click "Create Credentials" → "API Key"
3. Copy your API key (keep it safe!)
4. (Optional but recommended) Click "Restrict Key":
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Sheets API"
   - Under "Website restrictions", add your domain/localhost

### Step 4: Make Your Sheet Public

1. Open your Google Sheet
2. Click "Share" (top right)
3. Click "Change to anyone with the link"
4. Set permission to "Viewer"
5. Copy the Spreadsheet ID from the URL
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the `SPREADSHEET_ID` part

### Step 5: Configure the Dashboard

1. Open `script.js` file
2. Update the configuration at the top:

```javascript
const CONFIG = {
    API_KEY: 'YOUR_GOOGLE_SHEETS_API_KEY',           // Paste your API key here
    SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID',           // Paste your spreadsheet ID here
    SHEET_NAME: 'Sheet1',                            // Change if your sheet has a different name
    RANGE: 'A2:D',                                   // Adjust if you have more/fewer columns
    REFRESH_INTERVAL: 10000                          // Refresh every 10 seconds (10000ms)
};
```

**Example Configuration:**
```javascript
const CONFIG = {
    API_KEY: 'AIzaSyB1234567890abcdefghijklmnop',
    SPREADSHEET_ID: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    SHEET_NAME: 'Sheet1',
    RANGE: 'A2:D',
    REFRESH_INTERVAL: 10000
};
```

### Step 6: Run the Dashboard

1. Open `index.html` in your web browser
2. You should see your scores displayed!

**Alternative Methods:**
- **Using Live Server** (Recommended for development):
  - Install the "Live Server" extension in VS Code
  - Right-click on `index.html` → "Open with Live Server"
  
- **Using Python HTTP Server**:
  ```bash
  python -m http.server 8000
  ```
  Then open: http://localhost:8000

## 📊 Google Sheets Format

### Required Columns

| Column | Name | Type | Description | Example |
|--------|------|------|-------------|---------|
| A | Team Name | Text | Name of the team | "Warriors" |
| B | Score | Number | Total points/score | 150 |
| C | Matches Played | Number | Number of matches | 10 |
| D | Status | Text | Current status | "Active" / "Leading" / "Eliminated" |

### Example Sheet Layout

```
     A              B       C       D
1    Team Name      Score   Matches Status
2    Warriors       150     10      Active
3    Champions      200     12      Leading
4    Legends        175     11      Active
5    Titans         130     9       Active
6    Phoenix        195     11      Chasing
```

## 🎨 Customization

### Change Refresh Interval

In `script.js`, modify:
```javascript
REFRESH_INTERVAL: 10000  // Change to desired milliseconds
```

### Change Colors

In `styles.css`, modify the CSS variables:
```css
:root {
    --primary-color: #6366f1;    /* Main theme color */
    --secondary-color: #8b5cf6;  /* Secondary theme color */
    --accent-color: #ec4899;     /* Accent highlights */
}
```

### Modify Column Range

If you have more or fewer columns, update the RANGE in `script.js`:
```javascript
RANGE: 'A2:D'  // Change 'D' to your last column letter
```

## 🔧 Troubleshooting

### Problem: "Please configure your Google Sheets API credentials"
- **Solution**: Make sure you've updated `API_KEY` and `SPREADSHEET_ID` in `script.js`

### Problem: "API Error: 403"
- **Solution**: 
  - Check that your Google Sheets API is enabled
  - Verify your API key is correct
  - Make sure your sheet is shared with "Anyone with the link"

### Problem: "API Error: 400"
- **Solution**: 
  - Check that your `SPREADSHEET_ID` is correct
  - Verify the `SHEET_NAME` matches your sheet's name
  - Ensure the `RANGE` is valid (e.g., 'A2:D')

### Problem: "No data found"
- **Solution**: 
  - Make sure your sheet has data starting from row 2
  - Check that you have data in columns A, B, C, and D
  - Verify the range in CONFIG matches your data

### Problem: Scores not updating
- **Solution**: 
  - Check browser console (F12) for errors
  - Verify your internet connection
  - Make sure the sheet is accessible
  - Try manually refreshing the page

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select main branch → Save
5. Your dashboard will be live at `https://yourusername.github.io/repository-name/`

### Option 2: Netlify (Free)
1. Sign up at [Netlify](https://www.netlify.com/)
2. Drag and drop your folder
3. Done! Your site is live

### Option 3: Vercel (Free)
1. Sign up at [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Deploy automatically

## 📱 Mobile Optimization

The dashboard is fully responsive and works great on:
- ✅ Desktop computers
- ✅ Tablets (iPad, Android tablets)
- ✅ Mobile phones (iPhone, Android)

## 🔒 Security Notes

- Never commit your API key to public repositories
- Use API key restrictions in Google Cloud Console
- Consider using environment variables for sensitive data
- Limit API key to Google Sheets API only

## 🎯 Usage Tips

1. **Manual Updates**: Simply update your Google Sheet, and the dashboard will reflect changes within 10 seconds
2. **Live Events**: Perfect for displaying scores during live competitions
3. **Projector Display**: Use fullscreen mode (F11) for presentations
4. **Multiple Dashboards**: Create multiple sheets for different leagues/competitions

## 📞 Support

If you encounter any issues:
1. Check the browser console (Press F12) for error messages
2. Verify all configuration settings
3. Ensure your Google Sheet is properly formatted
4. Check that the API key has proper permissions

## 📄 Files Included

- `index.html` - Main dashboard HTML
- `styles.css` - Professional styling and animations
- `script.js` - Google Sheets integration and logic
- `README.md` - This documentation file

## 🎉 Features Breakdown

- **Animated Background**: Dynamic gradient animation
- **Pulse Effects**: Trophy icon with pulse animation
- **Live Indicator**: Blinking red dot showing live status
- **Auto-refresh**: Scores update automatically
- **Smooth Transitions**: Cards slide in with staggered animation
- **Hover Effects**: Interactive card animations
- **Responsive Grid**: Automatic layout adjustment
- **Medal System**: Visual ranking with emojis
- **Last Update Time**: Shows when data was last refreshed

## 🚀 Quick Start (TL;DR)

1. Create Google Sheet with team data (columns: Name, Score, Matches, Status)
2. Get Google Sheets API key from Google Cloud Console
3. Make sheet public (View access)
4. Update `script.js` with API key and Spreadsheet ID
5. Open `index.html` in browser
6. Done! 🎉

---

**Made with ❤️ for PW Champions League**

*Auto-refreshes every 10 seconds | Mobile Responsive | Real-time Updates*
