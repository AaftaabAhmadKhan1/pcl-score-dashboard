# Example Google Sheets Data Format

## Sheet Setup

**Sheet Name:** Sheet1 (or any name you prefer)

## Column Structure

| Column | Header | Data Type | Example Values |
|--------|--------|-----------|----------------|
| A | Team Name | Text | Warriors, Champions, Legends |
| B | Score | Number | 150, 200, 175 |
| C | Matches Played | Number | 10, 12, 11 |
| D | Status | Text | Active, Leading, Chasing |

## Sample Data

Copy this into your Google Sheet:

```
Team Name       Score   Matches Played  Status
Warriors        150     10              Active
Champions       200     12              Leading
Legends         175     11              Active
Titans          130     9               Chasing
Phoenix         195     11              Strong
Dragons         140     10              Active
Spartans        165     10              Rising
Vikings         180     12              Active
```

## Tips for Data Entry

1. **Start from Row 2**: Row 1 can have headers, data should start from row 2
2. **Use Numbers Only**: In Score and Matches columns, use only numbers (no text)
3. **Team Names**: Can be any text, emojis work too! 🔥⚡
4. **Status Field**: Use descriptive statuses like:
   - "Active" - Currently playing
   - "Leading" - In first place
   - "Chasing" - Trying to catch up
   - "Eliminated" - Out of competition
   - "On Fire" - Winning streak
   - Any custom status you want!

## Real-time Updates

When you update any value in the sheet:
- The dashboard will automatically fetch new data within 10 seconds
- Scores will be re-sorted automatically
- Rankings will update based on new scores

## Multiple Competitions

You can create multiple sheets in the same spreadsheet for different leagues:
- Sheet1: "Group A"
- Sheet2: "Group B"
- Sheet3: "Finals"

Just update the `SHEET_NAME` in `script.js` to switch between them.

## Advanced: Adding More Columns

If you want to add more data (e.g., Win/Loss record):

```
Team Name   Score   Matches   Status   Wins   Losses
Warriors    150     10        Active   7      3
Champions   200     12        Leading  10     2
```

Then update the `RANGE` in script.js to include more columns:
```javascript
RANGE: 'A2:F'  // Instead of 'A2:D'
```

And modify the JavaScript to display the extra data.
