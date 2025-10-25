// ============================================
// CONFIGURATION - Update these values
// ============================================

const CONFIG = {
    // Get your API key from: https://console.cloud.google.com/apis/credentials
    API_KEY: 'AIzaSyDCyXeCyFoZYNN7nH-URDj4zUMW_zzacFc',
    
    // Your Google Sheet ID (from the URL)
    // Example: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
    SPREADSHEET_ID: '1kAO5c7uX1ivK8WqYhJ83MmlULaZp3JxoWT9cdO1muOA',
    
    // Name of the sheet/tab in your spreadsheet
    SHEET_NAME: 'Semi Finale',
    
    // Range of cells to read (A2:C = Team Name, Score, Team Icon URL)
    RANGE: 'A2:C',
    
    // Auto-refresh interval in milliseconds (2000 = 2 seconds for near real-time updates)
    REFRESH_INTERVAL: 2000
};

// ============================================
// Application State
// ============================================

let refreshTimer = null;
let lastUpdateTime = null;
let previousScores = {}; // Track previous scores for change detection
let availableSheets = []; // Store available sheet names
let sheetRefreshTimer = null; // Timer for refreshing sheet list
let isInitialLoad = true; // Track if this is the first load

// ============================================
// Initialize the Dashboard
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('PW Champions League Dashboard Initialized');
    
    // Check if configuration is complete
    if (CONFIG.API_KEY === 'YOUR_GOOGLE_SHEETS_API_KEY' || 
        CONFIG.SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID') {
        showError('Please configure your Google Sheets API credentials in script.js');
        document.getElementById('loading').style.display = 'none';
        return;
    }
    
    // Load available sheets first
    loadAvailableSheets();
});

// ============================================
// Google Sheets API Integration
// ============================================

async function loadAvailableSheets() {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SPREADSHEET_ID}?key=${CONFIG.API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            let errorMessage = `API Error: ${response.status} - ${response.statusText}`;
            
            if (response.status === 403) {
                errorMessage = 'Access denied. Please check your API key permissions.';
            } else if (response.status === 404) {
                errorMessage = 'Spreadsheet not found. Please verify the Spreadsheet ID.';
            } else if (errorData.error && errorData.error.message) {
                errorMessage = errorData.error.message;
            }
            
            throw new Error(errorMessage);
        }
        
        const data = await response.json();
        
        if (!data.sheets || data.sheets.length === 0) {
            throw new Error('No sheets found in the spreadsheet');
        }
        
        const newSheets = data.sheets.map(sheet => sheet.properties.title);
        
        // Check if sheets have changed
        const sheetsChanged = JSON.stringify(newSheets) !== JSON.stringify(availableSheets);
        
        if (sheetsChanged || availableSheets.length === 0) {
            availableSheets = newSheets;
            console.log('Available sheets updated:', availableSheets);
            
            // Store current selection
            const selector = document.getElementById('sheetSelector');
            if (!selector) {
                console.error('Sheet selector element not found');
                return;
            }
            
            const currentSelection = selector.value || CONFIG.SHEET_NAME;
            
            // Populate dropdown
            selector.innerHTML = '';
            
            availableSheets.forEach(sheetName => {
                const option = document.createElement('option');
                option.value = sheetName;
                option.textContent = sheetName;
                if (sheetName === currentSelection) {
                    option.selected = true;
                }
                selector.appendChild(option);
            });
            
            // If this is the first load, start everything
            if (!refreshTimer) {
                loadScores(true); // Pass true for initial load
                startAutoRefresh();
            }
        }
        
        // Start automatic sheet refresh (check every 10 seconds)
        if (!sheetRefreshTimer) {
            sheetRefreshTimer = setInterval(() => {
                console.log('Checking for new sheets...');
                loadAvailableSheets();
            }, 10000); // Check every 10 seconds
        }
        
    } catch (error) {
        console.error('Error loading sheets:', error);
        
        // Only show error on first load, not on background refreshes
        if (availableSheets.length === 0) {
            const loadingEl = document.getElementById('loading');
            if (loadingEl) loadingEl.style.display = 'none';
            
            showError(`Failed to load sheets: ${error.message}`);
        } else {
            // Silent fail on background refresh - just log it
            console.warn('Background sheet refresh failed, will retry...');
        }
    }
}

function changeSheet() {
    try {
        const selector = document.getElementById('sheetSelector');
        if (!selector) {
            throw new Error('Sheet selector not found');
        }
        
        const selectedSheet = selector.value;
        
        if (!selectedSheet) {
            console.warn('No sheet selected');
            return;
        }
        
        console.log('Changing to sheet:', selectedSheet);
        CONFIG.SHEET_NAME = selectedSheet;
        
        // Clear previous scores to avoid incorrect change detection
        previousScores = {};
        
        // Stop current refresh
        stopAutoRefresh();
        
        // Show loading
        const loadingEl = document.getElementById('loading');
        const scoreboardEl = document.getElementById('scoreboard');
        const errorEl = document.getElementById('error');
        
        if (loadingEl) loadingEl.style.display = 'block';
        if (scoreboardEl) scoreboardEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'none';
        
        // Load new sheet data
        loadScores(true); // Pass true for user-initiated load
        
        // Restart auto-refresh
        startAutoRefresh();
        
    } catch (error) {
        console.error('Error changing sheet:', error);
        showError(`Failed to change sheet: ${error.message}`);
    }
}

async function loadScores(showErrors = false) {
    try {
        // Add subtle loading indicator
        const updateInfo = document.querySelector('.update-info i');
        if (updateInfo) {
            updateInfo.style.color = 'var(--primary-color)';
        }
        
        if (!CONFIG.SPREADSHEET_ID || !CONFIG.API_KEY || !CONFIG.SHEET_NAME) {
            throw new Error('Missing configuration. Please check API_KEY, SPREADSHEET_ID, and SHEET_NAME.');
        }
        
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SPREADSHEET_ID}/values/${CONFIG.SHEET_NAME}!${CONFIG.RANGE}?key=${CONFIG.API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            let errorMessage = `API Error: ${response.status} - ${response.statusText}`;
            
            if (response.status === 400) {
                errorMessage = `Invalid request. Sheet "${CONFIG.SHEET_NAME}" might not exist or range is invalid.`;
            } else if (response.status === 403) {
                errorMessage = 'Access denied. Check API key permissions and sheet sharing settings.';
            } else if (response.status === 404) {
                errorMessage = 'Spreadsheet not found. Verify the Spreadsheet ID.';
            } else if (response.status === 429) {
                errorMessage = 'Too many requests. Please wait a moment.';
            } else if (errorData.error && errorData.error.message) {
                errorMessage = errorData.error.message;
            }
            
            throw new Error(errorMessage);
        }
        
        const data = await response.json();
        
        console.log('=== RAW DATA FROM GOOGLE SHEETS ===');
        console.log('Full data object:', data);
        console.log('Number of rows:', data.values ? data.values.length : 0);
        
        if (!data.values || data.values.length === 0) {
            if (showErrors) {
                showError(`No data found in sheet "${CONFIG.SHEET_NAME}". Please add team data starting from row 2.`);
            }
            const loadingEl = document.getElementById('loading');
            const scoreboardEl = document.getElementById('scoreboard');
            if (loadingEl) loadingEl.style.display = 'none';
            if (scoreboardEl && showErrors) scoreboardEl.style.display = 'none';
            return;
        }
        
        // Validate data structure
        const invalidRows = data.values.filter(row => !row[0] || row[1] === undefined);
        if (invalidRows.length > 0) {
            console.warn(`Found ${invalidRows.length} rows with missing team name or score`);
        }
        
        // Log each row to see the actual data (only on initial load to reduce console spam)
        if (showErrors) {
            data.values.forEach((row, index) => {
                console.log(`Row ${index + 2}:`, {
                    teamName: row[0],
                    score: row[1],
                    iconUrl: row[2],
                    'iconUrl length': row[2] ? row[2].length : 0,
                    'full row': row
                });
            });
        }
        
        // Process and display the scores
        processScores(data.values);
        
        // Update last update time
        updateLastUpdateTime();
        
        // Reset loading indicator color
        if (updateInfo) {
            updateInfo.style.color = '';
        }
        
        // Hide loading, show scoreboard
        const loadingEl = document.getElementById('loading');
        const errorEl = document.getElementById('error');
        const scoreboardEl = document.getElementById('scoreboard');
        
        if (loadingEl) loadingEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'none';
        if (scoreboardEl) scoreboardEl.style.display = 'grid';
        
    } catch (error) {
        console.error('Error loading scores:', error);
        
        // Only show errors for initial load or user-triggered actions
        if (showErrors) {
            const loadingEl = document.getElementById('loading');
            if (loadingEl) loadingEl.style.display = 'none';
            
            // Check if it's a network error
            if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
                showError('Network error. Please check your internet connection.');
            } else {
                showError(`Failed to load scores: ${error.message}`);
            }
        } else {
            // Silent fail for background refresh - just log it
            console.warn('Background refresh failed, will retry on next interval:', error.message);
        }
    }
}

// ============================================
// Process and Display Scores
// ============================================

function processScores(rows) {
    try {
        if (!rows || rows.length === 0) {
            console.warn('No rows to process');
            return;
        }
        
        // Expected format: [Team Name, Score, Team Icon URL]
        const teams = rows
            .filter(row => row[0] && row[0].trim() !== '') // Filter out empty rows
            .map((row, index) => {
                try {
                    const teamName = row[0] ? String(row[0]).trim() : 'Unknown Team';
                    const score = parseInt(row[1]) || 0;
                    const iconUrl = convertGoogleDriveUrl(row[2]) || '';
                    
                    console.log(`Team: ${teamName}, Original URL: ${row[2]}, Converted URL: ${iconUrl}`);
                    
                    return {
                        name: teamName,
                        score: score,
                        matches: 0,
                        status: 'Active',
                        iconUrl: iconUrl
                    };
                } catch (error) {
                    console.error(`Error processing row ${index + 2}:`, error);
                    return {
                        name: `Team ${index + 1}`,
                        score: 0,
                        matches: 0,
                        status: 'Active',
                        iconUrl: ''
                    };
                }
            });
        
        if (teams.length === 0) {
            showError('No valid team data found. Please check your spreadsheet format.');
            return;
        }
        
        // Sort teams by score (highest first)
        teams.sort((a, b) => b.score - a.score);
        
        // Check for score changes and highlight them
        teams.forEach(team => {
            if (previousScores[team.name] !== undefined && previousScores[team.name] !== team.score) {
                team.scoreChanged = true;
            }
            previousScores[team.name] = team.score;
        });
        
        // Display teams
        displayTeams(teams);
        
    } catch (error) {
        console.error('Error in processScores:', error);
        showError(`Error processing team data: ${error.message}`);
    }
}

function displayTeams(teams) {
    try {
        const scoreboard = document.getElementById('scoreboard');
        if (!scoreboard) {
            console.error('Scoreboard element not found');
            return;
        }
        
        const existingCards = scoreboard.querySelectorAll('.team-card');
        
        // If this is the first load, create all cards
        if (existingCards.length === 0) {
            teams.forEach((team, index) => {
                try {
                    const teamCard = createTeamCard(team, index + 1);
                    scoreboard.appendChild(teamCard);
                } catch (error) {
                    console.error(`Error creating card for team ${team.name}:`, error);
                }
            });
            return;
        }
        
        // Update existing cards instead of recreating them
        teams.forEach((team, index) => {
            try {
                const existingCard = existingCards[index];
                
                if (existingCard) {
                    // Update only the data that might have changed
                    updateTeamCard(existingCard, team, index + 1);
                } else {
                    // Add new card if teams were added
                    const teamCard = createTeamCard(team, index + 1);
                    scoreboard.appendChild(teamCard);
                }
            } catch (error) {
                console.error(`Error updating card for team ${team.name}:`, error);
            }
        });
        
        // Remove extra cards if teams were removed
        if (existingCards.length > teams.length) {
            for (let i = teams.length; i < existingCards.length; i++) {
                try {
                    existingCards[i].remove();
                } catch (error) {
                    console.error(`Error removing card at index ${i}:`, error);
                }
            }
        }
        
    } catch (error) {
        console.error('Error in displayTeams:', error);
        showError(`Error displaying teams: ${error.message}`);
    }
}

function createTeamCard(team, rank) {
    try {
        if (!team || !team.name) {
            throw new Error('Invalid team data');
        }
        
        const card = document.createElement('div');
        card.className = 'team-card';
        card.setAttribute('data-team-name', team.name);
        
        // Add animation delay for staggered effect (only on initial load)
        card.style.animationDelay = `${rank * 0.1}s`;
        
        // Add highlight class if score changed
        if (team.scoreChanged) {
            card.classList.add('score-updated');
        }
        
        // Create team icon HTML
        let teamIconHtml = '';
        const firstLetter = team.name.charAt(0).toUpperCase() || 'T';
        
        console.log(`Creating card for ${team.name}, iconUrl: "${team.iconUrl}"`);
        
        if (team.iconUrl && team.iconUrl.trim() !== '') {
            teamIconHtml = `<img src="${team.iconUrl}" alt="${escapeHtml(team.name)}" class="team-icon" 
                                 onload="console.log('Image loaded successfully:', this.src);"
                                 onerror="console.error('Image failed to load:', this.src); this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="team-icon-fallback" style="display:none;">${firstLetter}</div>`;
        } else {
            console.log(`No iconUrl for ${team.name}, showing fallback`);
            teamIconHtml = `<div class="team-icon-fallback">${firstLetter}</div>`;
        }
        
        card.innerHTML = `
            <div class="team-rank">${teamIconHtml}</div>
            <div class="team-header">
                <h2 class="team-name" title="${escapeHtml(team.name)}">${escapeHtml(team.name)}</h2>
            </div>
            <div class="team-score">
                <span class="score-label">Points</span>
                <span class="score-value ${team.scoreChanged ? 'score-highlight' : ''}">${team.score}</span>
            </div>
        `;
        
        return card;
        
    } catch (error) {
        console.error('Error in createTeamCard:', error);
        // Return a minimal error card
        const errorCard = document.createElement('div');
        errorCard.className = 'team-card';
        errorCard.innerHTML = `
            <div class="team-header">
                <h2 class="team-name">Error loading team</h2>
            </div>
        `;
        return errorCard;
    }
}

function updateTeamCard(card, team, rank) {
    try {
        if (!card || !team) {
            console.warn('Invalid card or team data for update');
            return;
        }
        
        // Update team icon
        const rankElement = card.querySelector('.team-rank');
        if (rankElement) {
            const currentIcon = rankElement.querySelector('.team-icon, .team-icon-fallback');
            const needsUpdate = !currentIcon || 
                              (team.iconUrl && currentIcon.tagName === 'DIV') ||
                              (!team.iconUrl && currentIcon.tagName === 'IMG') ||
                              (currentIcon.tagName === 'IMG' && currentIcon.src !== team.iconUrl);
            
            if (needsUpdate) {
                const firstLetter = team.name.charAt(0).toUpperCase() || 'T';
                let teamIconHtml = '';
                
                if (team.iconUrl && team.iconUrl.trim() !== '') {
                    teamIconHtml = `<img src="${team.iconUrl}" alt="${escapeHtml(team.name)}" class="team-icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                    <div class="team-icon-fallback" style="display:none;">${firstLetter}</div>`;
                } else {
                    teamIconHtml = `<div class="team-icon-fallback">${firstLetter}</div>`;
                }
                rankElement.innerHTML = teamIconHtml;
            }
        }
        
        // Update team name (only if changed)
        const nameElement = card.querySelector('.team-name');
        if (nameElement && nameElement.textContent !== team.name) {
            nameElement.textContent = team.name;
            nameElement.setAttribute('title', team.name);
        }
        
        // Update score with animation if changed
        const scoreElement = card.querySelector('.score-value');
        if (scoreElement) {
            const currentScore = parseInt(scoreElement.textContent);
            if (!isNaN(currentScore) && currentScore !== team.score) {
                // Add highlight animation
                scoreElement.classList.add('score-highlight');
                card.classList.add('score-updated');
                
                // Update the score
                scoreElement.textContent = team.score;
                
                // Remove animation classes after animation completes
                setTimeout(() => {
                    scoreElement.classList.remove('score-highlight');
                    card.classList.remove('score-updated');
                }, 1000);
            } else if (isNaN(currentScore)) {
                // If current score is not a number, just update it
                scoreElement.textContent = team.score;
            }
        }
        
    } catch (error) {
        console.error('Error in updateTeamCard:', error);
    }
}

// ============================================
// Auto-Refresh Functionality
// ============================================

function startAutoRefresh() {
    try {
        if (refreshTimer) {
            clearInterval(refreshTimer);
        }
        
        refreshTimer = setInterval(() => {
            console.log('Auto-refreshing scores...');
            loadScores(false).catch(error => { // Pass false to not show errors on background refresh
                console.error('Error in auto-refresh:', error);
            });
        }, CONFIG.REFRESH_INTERVAL);
        
        console.log(`Auto-refresh started: ${CONFIG.REFRESH_INTERVAL / 1000}s interval`);
    } catch (error) {
        console.error('Error starting auto-refresh:', error);
    }
}

function stopAutoRefresh() {
    try {
        if (refreshTimer) {
            clearInterval(refreshTimer);
            refreshTimer = null;
            console.log('Auto-refresh stopped');
        }
    } catch (error) {
        console.error('Error stopping auto-refresh:', error);
    }
}

// ============================================
// Utility Functions
// ============================================

function updateLastUpdateTime() {
    try {
        lastUpdateTime = new Date();
        const timeString = lastUpdateTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const lastUpdateEl = document.getElementById('lastUpdate');
        if (lastUpdateEl) {
            lastUpdateEl.textContent = timeString;
        }
    } catch (error) {
        console.error('Error updating last update time:', error);
    }
}

function showError(message) {
    try {
        const errorDiv = document.getElementById('error');
        const errorText = document.getElementById('errorText');
        
        if (errorText) {
            errorText.textContent = message || 'An unknown error occurred';
        }
        
        if (errorDiv) {
            errorDiv.style.display = 'block';
        }
        
        console.error('Error displayed to user:', message);
    } catch (error) {
        console.error('Error in showError:', error);
        // Fallback to alert if DOM manipulation fails
        alert(`Error: ${message}`);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function truncateText(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
}

function convertGoogleDriveUrl(url) {
    try {
        if (!url) return '';
        
        // Remove any whitespace
        url = url.trim();
        
        // Basic URL validation
        if (!url.includes('drive.google.com')) {
            console.log('Not a Google Drive URL:', url);
            return url; // Return as-is if not a Drive URL
        }
        
        console.log('Original URL:', url);
        
        // Convert Google Drive sharing URL to direct image URL
        // From: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
        // To: https://drive.google.com/thumbnail?id=FILE_ID&sz=w200
        
        const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
            const convertedUrl = `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w200`;
            console.log('Converted URL:', convertedUrl);
            return convertedUrl;
        }
        
        // Try alternate pattern: https://drive.google.com/open?id=FILE_ID
        const openIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (openIdMatch && openIdMatch[1]) {
            const convertedUrl = `https://drive.google.com/thumbnail?id=${openIdMatch[1]}&sz=w200`;
            console.log('Converted URL (open pattern):', convertedUrl);
            return convertedUrl;
        }
        
        console.log('URL not converted, returning as is:', url);
        // If already in direct format or other format, return as is
        return url;
        
    } catch (error) {
        console.error('Error converting Google Drive URL:', error);
        return ''; // Return empty string on error
    }
}

function closeConfigModal() {
    document.getElementById('configModal').style.display = 'none';
}

// ============================================
// Visibility Change Handler (Pause/Resume)
// ============================================

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden - stopping auto-refresh and sheet monitoring');
        stopAutoRefresh();
        if (sheetRefreshTimer) {
            clearInterval(sheetRefreshTimer);
            sheetRefreshTimer = null;
        }
    } else {
        console.log('Page visible - resuming auto-refresh and sheet monitoring');
        loadScores(false); // Don't show errors on resume
        startAutoRefresh();
        // Resume sheet monitoring
        sheetRefreshTimer = setInterval(() => {
            console.log('Checking for new sheets...');
            loadAvailableSheets();
        }, 10000);
    }
});

// ============================================
// Manual Refresh (Optional)
// ============================================

// You can add a refresh button and call this function
function manualRefresh() {
    try {
        console.log('Manual refresh triggered');
        const loadingEl = document.getElementById('loading');
        const scoreboardEl = document.getElementById('scoreboard');
        
        if (loadingEl) loadingEl.style.display = 'block';
        if (scoreboardEl) scoreboardEl.style.display = 'none';
        
        loadScores(true).catch(error => { // Pass true to show errors on manual refresh
            console.error('Error in manual refresh:', error);
        });
    } catch (error) {
        console.error('Error triggering manual refresh:', error);
    }
}

// Make it available globally if needed
window.manualRefresh = manualRefresh;
window.changeSheet = changeSheet;

// ============================================
// Global Error Handlers
// ============================================

// Catch unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    showError(`Unexpected error: ${event.reason?.message || 'Unknown error occurred'}`);
    event.preventDefault();
});

// Catch unhandled errors
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    if (event.error) {
        showError(`Application error: ${event.error.message || 'Unknown error occurred'}`);
    }
    event.preventDefault();
});

// ============================================
// Console Helper
// ============================================

console.log('%c PW Champions League Dashboard ', 'background: #667eea; color: white; font-size: 20px; padding: 10px;');
console.log('Dashboard loaded successfully!');
console.log('Configuration:', {
    'API Key': CONFIG.API_KEY ? '✓ Configured' : '✗ Not configured',
    'Spreadsheet ID': CONFIG.SPREADSHEET_ID ? '✓ Configured' : '✗ Not configured',
    'Sheet Name': CONFIG.SHEET_NAME,
    'Refresh Interval': `${CONFIG.REFRESH_INTERVAL / 1000} seconds (Near Real-time)`
});
