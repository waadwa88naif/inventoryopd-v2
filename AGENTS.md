# AGENTS.md

Repository instructions for future Codex work on `inventoryopd-v2`.

## Production Safety

- Do not rewrite entire files for small bugs after production unless the user explicitly asks for a full rebuild.
- Keep the data contract stable.
- Keep function names stable:
  - `doGet(e)`
  - `getMedicines()`
  - `updateAvailability(payload)`
  - `getLatestUpdates(limit)`
  - `getExpiringBuckets()`
  - `getExpiryDates(dbId)`
  - `addExpiryDate(payload)`
  - `deleteExpiryDate(payload)`
  - `getSettings()`

## Data Rules

- `Master_DB` is current medication state only.
- `Update_Log` is the historical availability update log.
- Today’s Latest Updates must come from `Update_Log` only.
- Do not build latest updates from `Master_DB`.
- `getLatestUpdates(limit)` must filter `نوع التحديث === "Availability Update"`.
- Expiry additions and deletions must not appear in Today’s Latest Updates.
- Use `Asia/Riyadh` timezone for timestamps and today filtering.

## Sheet Header Rules

- Do not reorder sheet headers.
- Do not destroy, reset, or rewrite `Update_Log` headers.
- Append missing columns to the right only.
- Use header-based reads and writes.
- Do not rely on fixed column numbers.

## UI Rules

- Arabic is primary; English is secondary.
- Search must use `startsWith` only.
- Do not use contains-style medication search.
- Do not show alternative medication names anywhere.
- For unavailable medication, show only:
  - الرجوع للطبيب / Refer to Physician
  - equivalent alternative answer: نعم / لا / غير محدد
- Do not expose the supply page link in `index.html` or `PharmacistDashboard.html`.
- Keep the watermark:
  - `تم انتاج وتصميم العمل بالكامل بواسطة وعد نايف الوقداني Email: waadalwagdani@gmail.com`

## Commit Discipline

- Keep changes scoped to the requested task.
- Verify contract-sensitive behavior before committing.
- Update `DATA_CONTRACT.md` and `TEST_CHECKLIST.md` when changing server return shapes or user flows.
