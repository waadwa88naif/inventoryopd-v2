# inventoryopd-v2 Test Checklist

## PharmacistDashboard.html

- Dashboard loads without errors.
- Search by English typed text returns only medications that start with the typed text.
- Search by Arabic typed text returns only medications that start with the typed text.
- Clicking English letter opens a list of medications starting with that letter.
- Clicking Arabic letter opens a list of medications starting with that letter.
- Available medication shows green status chip.
- Limited Stock medication shows amber status chip and location details.
- Unavailable medication shows red chip, refer to physician, and equivalent alternative yes/no/not specified.
- Unavailable medication must not show alternative medication names.
- Today’s Latest Updates calls getLatestUpdates(50).
- Today’s Latest Updates shows only today’s availability changes.
- Today’s Latest Updates shows old status chip → new status chip.
- Today’s Latest Updates is scrollable after around 8 updates.
- Expiring medications within 30 and 60 days render.

## SupplyPanel.html

- Supply page opens only with ?page=supply&key=waad-supply-2026.
- Wrong key shows access message.
- User can select updater name from Settings.
- Search uses startsWith only.
- Letter selection opens startsWith list.
- Saving متوفر updates Master_DB and appends Update_Log.
- Saving كمية محدودة requires location and appends Update_Log.
- Saving غير متوفر requires equivalent alternative yes/no/not specified and appends Update_Log.
- Adding expiry date works.
- Deleting expiry date sets Is_Active to محذوف.

## Code.gs

- updateAvailability reads old status before updating.
- updateAvailability appends Update_Log.
- getLatestUpdates filters by Asia/Riyadh current day.
- getLatestUpdates returns exact DATA_CONTRACT.md shape.
- Missing columns are appended to the right, not reordered.
