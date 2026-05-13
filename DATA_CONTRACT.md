# inventoryopd-v2 Data Contract

This project is a Google Apps Script web app for outpatient pharmacy medication availability.

## Source of truth

Master_DB = current medication state  
Update_Log = historical availability update log  
Expiry_Dates = expiry dates  
Settings = users and dropdown values  

## Required Google Sheets tabs

### Master_DB

Headers:

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

### Update_Log

Headers:

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

### Expiry_Dates

Headers:

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

### Settings

Headers:

المستخدمين  
حالات التوفر  
مكان توفر الكمية المحدودة  
هل للصنف بديل مكافئ؟  
الأشهر  
السنوات  

## Apps Script data contracts

### getLatestUpdates(limit)

Must return only availability updates from today's date using Asia/Riyadh timezone.

Return shape:

[
  {
    "timestamp": "yyyy-MM-dd HH:mm:ss",
    "name": "Ticagrelor 90mg Tablet",
    "nameAr": "...",
    "itemNumber": "...",
    "oldStatus": "متوفر",
    "newStatus": "كمية محدودة",
    "user": "عبدالرحمن الثبيتي"
  }
]

### getMedicines()

Must return current medication state from Master_DB.

### updateAvailability(payload)

Must:
1. Read old status from Master_DB before changing it.
2. Update Master_DB.
3. Append one row to Update_Log.
4. Preserve oldStatus and newStatus clearly.

## Search rule

Medication search must use startsWith only.  
Do not use contains for medication search.

## Pharmacist dashboard rules

- Read-only.
- Shows current medication availability.
- Shows today’s latest availability updates from Update_Log only.
- Does not show SupplyPanel link.
- Does not show alternative medication names.
- For unavailable medication, show:
  الرجوع للطبيب / Refer to Physician
  and whether equivalent alternative exists: نعم / لا / غير محدد.

## Supply panel rules

- Arabic primary, English secondary.
- Requires:
  ?page=supply&key=waad-supply-2026
- On availability save, update Master_DB and append Update_Log.
- On expiry delete, set Is_Active to محذوف.
