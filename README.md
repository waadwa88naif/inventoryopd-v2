# inventoryopd-v2

Outpatient pharmacy medication availability system built as a Google Apps Script web app connected to Google Sheets.

The app has two surfaces:

- Pharmacist dashboard: read-only medication availability, latest availability updates, expiring medications, and medication error form access.
- Supply mobile panel: protected Arabic-first workflow for updating availability and managing medication expiry dates.

## Files

- `Code.gs`: Google Apps Script backend, routing, sheet helpers, availability logging, expiry logic, settings.
- `PharmacistDashboard.html`: read-only pharmacist dashboard.
- `SupplyPanel.html`: protected mobile-first supply staff interface.
- `index.html`: GitHub landing page only.
- `DATA_CONTRACT.md`: server function return shapes.
- `TEST_CHECKLIST.md`: manual verification checklist.
- `AGENTS.md`: future Codex instructions.

## Sheets

Create a Google Sheet with these tabs. The backend appends missing headers to the right and never reorders existing columns.

### Master_DB

```text
DB_ID
Item number
Name
الإسم
Dosage form
الشكل الدوائي
حالة التوفر
مكان توفر الكمية المحدودة
هل للصنف بديل مكافئ؟
ملاحظة التموين
آخر تحديث
تم التحديث بواسطة
تواريخ الانتهاء الحالية
عدد تواريخ الانتهاء
أقرب تاريخ انتهاء للفرز
تنبيه الانتهاء الحالي
Search_Key
```

### Update_Log

```text
Log_ID
التاريخ والوقت
نوع التحديث
DB_ID
Item number
Name
الإسم
الحالة السابقة
الحالة الجديدة
مكان التوفر السابق
مكان التوفر الجديد
البديل السابق
البديل الجديد
ملاحظة
تم التحديث بواسطة
مصدر التحديث
```

`Code.gs` also appends `الحقل` to the right if missing so availability log rows can store `حالة التوفر` without reordering production columns.

### Expiry_Dates

```text
Expiry_ID
DB_ID
Item number
Name
الإسم
شهر الانتهاء
سنة الانتهاء
تاريخ الانتهاء للفرز
حالة التاريخ
ملاحظة
آخر تحديث
تم التحديث بواسطة
Is_Active
```

### Settings

```text
المستخدمين
حالات التوفر
مكان توفر الكمية المحدودة
هل للصنف بديل مكافئ؟
الأشهر
السنوات
```

If Settings users are empty, the app uses:

- عبدالرحمن الثبيتي
- نواف سندي
- عبدالرحمن الغامدي
- وعد الوقداني

## Deployment

1. Open the Google Sheet.
2. Go to `Extensions` → `Apps Script`.
3. Copy `Code.gs` into the Apps Script `Code.gs` file.
4. Create HTML files named exactly:
   - `PharmacistDashboard`
   - `SupplyPanel`
5. Copy the matching `.html` file contents into each Apps Script HTML file.
6. Click `Deploy` → `New deployment`.
7. Select type `Web app`.
8. Use:
   - Execute as: `Me`
   - Who has access: your chosen audience
9. Deploy and copy the Web app URL.

## URLs

Replace `APP_SCRIPT_EXEC_URL` with the deployed Apps Script Web app URL.

Pharmacist dashboard:

```text
APP_SCRIPT_EXEC_URL?page=pharmacist
```

Supply mobile panel:

```text
APP_SCRIPT_EXEC_URL?page=supply&key=waad-supply-2026
```

Do not publish the supply URL in the pharmacist dashboard or GitHub landing page.

## Testing

Use `TEST_CHECKLIST.md` after every deployment. The most important production check is:

1. Update a medication in the Supply panel.
2. Confirm `Master_DB` changed.
3. Confirm `Update_Log` received exactly one `Availability Update` row with old and new status.
4. Confirm the pharmacist dashboard Today’s Latest Updates shows the update from `Update_Log`.
