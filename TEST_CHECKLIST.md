# inventoryopd-v2 Test Checklist

Run these checks after deployment to Google Apps Script.

## Routing And Access

- Open `APP_SCRIPT_EXEC_URL?page=pharmacist`; pharmacist dashboard loads.
- Open `APP_SCRIPT_EXEC_URL?page=supply&key=waad-supply-2026`; supply panel loads.
- Open `APP_SCRIPT_EXEC_URL?page=supply&key=wrong`; Arabic access denied message appears.
- Confirm `index.html` does not expose the supply URL.
- Confirm `PharmacistDashboard.html` does not expose or link to the supply page.

## Supply Availability Update

- In Supply panel, choose updater name from Settings.
- Search an English medication name; only medicines whose `Name` starts with typed text appear.
- Search an Arabic medication name; only medicines whose `الإسم` starts with typed text appear.
- Click an English letter; a list opens with medicines starting with that English letter only.
- Click an Arabic letter; a list opens with medicines starting with that Arabic letter only.
- Select a medication currently marked `متوفر`.
- Change status to `كمية محدودة`.
- Confirm unselected status choices become visually muted.
- Select limited location `في الصيدلية`.
- Click `حفظ التغييرات`.
- Confirm success message appears.

## Master_DB Verification

- In `Master_DB`, confirm the selected medication row updated:
  - `حالة التوفر` is `كمية محدودة`.
  - `مكان توفر الكمية المحدودة` is `في الصيدلية`.
  - `آخر تحديث` has an `Asia/Riyadh` timestamp.
  - `تم التحديث بواسطة` has the selected user.

## Update_Log Verification

- In `Update_Log`, confirm exactly one new row was appended.
- Confirm `نوع التحديث` is exactly `Availability Update`.
- Confirm old status and new status are both present:
  - `الحالة السابقة`
  - `الحالة الجديدة`
- Confirm `مصدر التحديث` is `Supply Mobile Panel`.
- Confirm expiry actions do not create rows shown in Today’s Latest Updates.

## Pharmacist Dashboard

- Refresh `APP_SCRIPT_EXEC_URL?page=pharmacist`.
- Confirm Today’s Latest Updates calls and displays data from `getLatestUpdates(50)`.
- Confirm the latest update text says:
  - `تم تحديث حالة [Medication Name] من [Old Status] إلى [New Status]`
- Confirm old status chip → new status chip appears.
- Confirm timestamp appears.
- Confirm updater name appears when available.
- Confirm updates list is vertically scrollable when there are more than about 8 updates.
- If no updates exist today, confirm message appears:
  - `لا توجد تحديثات لحالة الأدوية خلال اليوم الحالي.`

## Medication Card Behavior

- Available medication shows green chip.
- Limited stock medication shows amber chip and location.
- Unavailable medication shows red chip.
- Unavailable medication shows:
  - `الرجوع للطبيب`
  - `Refer to Physician`
  - equivalent alternative answer `نعم / لا / غير محدد`
- Confirm unavailable medication does not show alternative medication names anywhere.
- Unknown status shows gray chip.

## Expiry Dates

- In Supply panel, open `تواريخ الانتهاء`.
- Search medication using English startsWith.
- Search medication using Arabic startsWith.
- Click an English letter and confirm startsWith list opens.
- Click an Arabic letter and confirm startsWith list opens.
- Select medication.
- Add expiry date using month and year dropdowns.
- Confirm `Expiry_Dates` gets one active row.
- Confirm `تاريخ الانتهاء للفرز` is the last day of the selected month.
- Confirm `Master_DB` expiry summary updates.
- Delete expiry date.
- Confirm the expiry row is not physically deleted.
- Confirm `Is_Active` is set to `محذوف`.
- Confirm max 6 active expiry dates per medication is enforced.

## Final Contract Checks

- `updateAvailability(payload)` appends one `Update_Log` row per save.
- `getLatestUpdates(limit)` returns exact keys:
  - `timestamp`
  - `name`
  - `nameAr`
  - `itemNumber`
  - `oldStatus`
  - `newStatus`
  - `user`
- Search in both interfaces uses `startsWith` only.
- Sheet headers are not reordered.
- Missing required columns are appended to the right.
