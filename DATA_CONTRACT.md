# inventoryopd-v2 Data Contract

This project is a Google Apps Script web app for outpatient pharmacy medication availability.

## Source Of Truth

- `Master_DB`: current medication state only.
- `Update_Log`: historical event log for availability changes.
- `Expiry_Dates`: medication expiry dates.
- `Settings`: users and dropdown values.

Today’s Latest Updates must read from `Update_Log` through `getLatestUpdates(50)`. Do not build latest updates from `Master_DB`.

## getMedicines()

Returns current medication state from `Master_DB`.

```json
[
  {
    "dbId": "DB-001",
    "itemNumber": "12345",
    "name": "Ticagrelor 90mg Tablet",
    "nameAr": "...",
    "dosageForm": "Tablet",
    "dosageFormAr": "...",
    "status": "متوفر",
    "limitedLocation": "",
    "hasAlternative": "غير محدد",
    "note": "",
    "updatedAt": "2026-05-14 09:30:00",
    "updatedBy": "عبدالرحمن الثبيتي",
    "expiryDates": "2026-06-30, 2026-07-31",
    "expiryCount": 2,
    "nearestExpiry": "2026-06-30",
    "expiryAlert": "قريب الانتهاء",
    "searchKey": "ticagrelor 90mg tablet | ..."
  }
]
```

## updateAvailability(payload)

Payload sent by `SupplyPanel.html`:

```json
{
  "dbId": "DB-001",
  "status": "كمية محدودة",
  "limitedLocation": "في الصيدلية",
  "hasAlternative": "غير محدد",
  "note": "Optional note",
  "user": "عبدالرحمن الثبيتي"
}
```

Behavior:

- Finds medication by `DB_ID`.
- Reads old status, old limited location, old equivalent alternative answer, and old note before writing.
- Updates `Master_DB`.
- Appends exactly one row to `Update_Log`.
- Sets `نوع التحديث` to `Availability Update`.
- Sets `مصدر التحديث` to `Supply Mobile Panel`.
- Sets `الحقل` to `حالة التوفر` when that optional appended column exists.

## getLatestUpdates(limit)

Reads `Update_Log` only.

Filters:

- `نوع التحديث` exactly equals `Availability Update`.
- row date is the current day in `Asia/Riyadh`.
- expiry additions/deletions are excluded.

Sort:

- newest first.

Exact returned shape:

```json
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
```

No other key names should be required by `PharmacistDashboard.html`.

## getExpiringBuckets()

Reads active rows from `Expiry_Dates` where `Is_Active` is not `محذوف`.

Returns:

```json
{
  "within30": [
    {
      "expiryId": "EXP-001",
      "dbId": "DB-001",
      "itemNumber": "12345",
      "name": "Ticagrelor 90mg Tablet",
      "nameAr": "...",
      "month": 6,
      "year": 2026,
      "sortDate": "2026-06-30",
      "dateStatus": "قريب الانتهاء",
      "note": "",
      "updatedAt": "2026-05-14 09:30:00",
      "updatedBy": "عبدالرحمن الثبيتي",
      "isActive": "نشط",
      "daysUntil": 28
    }
  ],
  "within60": [
    {
      "expiryId": "EXP-002",
      "dbId": "DB-002",
      "itemNumber": "67890",
      "name": "Metformin 500mg Tablet",
      "nameAr": "...",
      "month": 7,
      "year": 2026,
      "sortDate": "2026-07-31",
      "dateStatus": "تحذير خلال 60 يوم",
      "note": "",
      "updatedAt": "2026-05-14 09:30:00",
      "updatedBy": "نواف سندي",
      "isActive": "نشط",
      "daysUntil": 59
    }
  ]
}
```

`within60` contains active dates from day 31 through day 60 so the 30-day and 60-day cards do not duplicate items.

## getExpiryDates(dbId)

Returns active expiry dates for one medication, sorted by date.

```json
[
  {
    "expiryId": "EXP-001",
    "dbId": "DB-001",
    "itemNumber": "12345",
    "name": "Ticagrelor 90mg Tablet",
    "nameAr": "...",
    "month": 6,
    "year": 2026,
    "sortDate": "2026-06-30",
    "dateStatus": "قريب الانتهاء",
    "note": "",
    "updatedAt": "2026-05-14 09:30:00",
    "updatedBy": "عبدالرحمن الثبيتي",
    "isActive": "نشط"
  }
]
```

Deleting an expiry date sets `Is_Active` to `محذوف`; rows are not physically deleted.
