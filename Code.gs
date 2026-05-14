var APP_TIMEZONE = 'Asia/Riyadh';
var SUPPLY_ACCESS_KEY = 'waad-supply-2026';

var SHEETS = {
  MASTER: 'Master_DB',
  UPDATE_LOG: 'Update_Log',
  EXPIRY: 'Expiry_Dates',
  SETTINGS: 'Settings'
};

var STATUS_AVAILABLE = 'متوفر';
var STATUS_LIMITED = 'كمية محدودة';
var STATUS_UNAVAILABLE = 'غير متوفر';
var STATUS_UNKNOWN = 'غير محدد';
var UPDATE_TYPE_AVAILABILITY = 'Availability Update';
var UPDATE_FIELD_AVAILABILITY = 'حالة التوفر';
var UPDATE_SOURCE_SUPPLY = 'Supply Mobile Panel';
var EXPIRY_ACTIVE = 'نشط';
var EXPIRY_DELETED = 'محذوف';

var MASTER = {
  DB_ID: 'DB_ID',
  ITEM: 'Item number',
  NAME: 'Name',
  NAME_AR: 'الإسم',
  FORM: 'Dosage form',
  FORM_AR: 'الشكل الدوائي',
  STATUS: 'حالة التوفر',
  LIMITED_LOCATION: 'مكان توفر الكمية المحدودة',
  HAS_ALTERNATIVE: 'هل للصنف بديل مكافئ؟',
  NOTE: 'ملاحظة التموين',
  UPDATED_AT: 'آخر تحديث',
  UPDATED_BY: 'تم التحديث بواسطة',
  EXPIRY_DATES: 'تواريخ الانتهاء الحالية',
  EXPIRY_COUNT: 'عدد تواريخ الانتهاء',
  NEAREST_EXPIRY: 'أقرب تاريخ انتهاء للفرز',
  EXPIRY_ALERT: 'تنبيه الانتهاء الحالي',
  SEARCH_KEY: 'Search_Key'
};

var UPDATE_LOG = {
  LOG_ID: 'Log_ID',
  TIMESTAMP: 'التاريخ والوقت',
  TYPE: 'نوع التحديث',
  DB_ID: 'DB_ID',
  ITEM: 'Item number',
  NAME: 'Name',
  NAME_AR: 'الإسم',
  OLD_STATUS: 'الحالة السابقة',
  NEW_STATUS: 'الحالة الجديدة',
  OLD_LOCATION: 'مكان التوفر السابق',
  NEW_LOCATION: 'مكان التوفر الجديد',
  OLD_ALTERNATIVE: 'البديل السابق',
  NEW_ALTERNATIVE: 'البديل الجديد',
  NOTE: 'ملاحظة',
  USER: 'تم التحديث بواسطة',
  SOURCE: 'مصدر التحديث',
  FIELD: 'الحقل'
};

var EXPIRY = {
  EXPIRY_ID: 'Expiry_ID',
  DB_ID: 'DB_ID',
  ITEM: 'Item number',
  NAME: 'Name',
  NAME_AR: 'الإسم',
  MONTH: 'شهر الانتهاء',
  YEAR: 'سنة الانتهاء',
  SORT_DATE: 'تاريخ الانتهاء للفرز',
  DATE_STATUS: 'حالة التاريخ',
  NOTE: 'ملاحظة',
  UPDATED_AT: 'آخر تحديث',
  UPDATED_BY: 'تم التحديث بواسطة',
  IS_ACTIVE: 'Is_Active'
};

var SETTINGS = {
  USERS: 'المستخدمين',
  STATUSES: 'حالات التوفر',
  LIMITED_LOCATIONS: 'مكان توفر الكمية المحدودة',
  ALTERNATIVES: 'هل للصنف بديل مكافئ؟',
  MONTHS: 'الأشهر',
  YEARS: 'السنوات'
};

var MASTER_HEADERS = [
  MASTER.DB_ID,
  MASTER.ITEM,
  MASTER.NAME,
  MASTER.NAME_AR,
  MASTER.FORM,
  MASTER.FORM_AR,
  MASTER.STATUS,
  MASTER.LIMITED_LOCATION,
  MASTER.HAS_ALTERNATIVE,
  MASTER.NOTE,
  MASTER.UPDATED_AT,
  MASTER.UPDATED_BY,
  MASTER.EXPIRY_DATES,
  MASTER.EXPIRY_COUNT,
  MASTER.NEAREST_EXPIRY,
  MASTER.EXPIRY_ALERT,
  MASTER.SEARCH_KEY
];

var UPDATE_LOG_HEADERS = [
  UPDATE_LOG.LOG_ID,
  UPDATE_LOG.TIMESTAMP,
  UPDATE_LOG.TYPE,
  UPDATE_LOG.DB_ID,
  UPDATE_LOG.ITEM,
  UPDATE_LOG.NAME,
  UPDATE_LOG.NAME_AR,
  UPDATE_LOG.OLD_STATUS,
  UPDATE_LOG.NEW_STATUS,
  UPDATE_LOG.OLD_LOCATION,
  UPDATE_LOG.NEW_LOCATION,
  UPDATE_LOG.OLD_ALTERNATIVE,
  UPDATE_LOG.NEW_ALTERNATIVE,
  UPDATE_LOG.NOTE,
  UPDATE_LOG.USER,
  UPDATE_LOG.SOURCE,
  UPDATE_LOG.FIELD
];

var EXPIRY_HEADERS = [
  EXPIRY.EXPIRY_ID,
  EXPIRY.DB_ID,
  EXPIRY.ITEM,
  EXPIRY.NAME,
  EXPIRY.NAME_AR,
  EXPIRY.MONTH,
  EXPIRY.YEAR,
  EXPIRY.SORT_DATE,
  EXPIRY.DATE_STATUS,
  EXPIRY.NOTE,
  EXPIRY.UPDATED_AT,
  EXPIRY.UPDATED_BY,
  EXPIRY.IS_ACTIVE
];

var SETTINGS_HEADERS = [
  SETTINGS.USERS,
  SETTINGS.STATUSES,
  SETTINGS.LIMITED_LOCATIONS,
  SETTINGS.ALTERNATIVES,
  SETTINGS.MONTHS,
  SETTINGS.YEARS
];

var DEFAULT_USERS = [
  'عبدالرحمن الثبيتي',
  'نواف سندي',
  'عبدالرحمن الغامدي',
  'وعد الوقداني'
];

var DEFAULT_STATUSES = [
  STATUS_AVAILABLE,
  STATUS_LIMITED,
  STATUS_UNAVAILABLE,
  STATUS_UNKNOWN
];

var DEFAULT_LIMITED_LOCATIONS = [
  'في الصيدلية',
  'مكتب المشرف'
];

var DEFAULT_ALTERNATIVES = [
  'نعم',
  'لا',
  STATUS_UNKNOWN
];

function doGet(e) {
  var params = e && e.parameter ? e.parameter : {};
  var page = stringValue_(params.page || 'pharmacist');

  if (page === 'supply') {
    if (stringValue_(params.key) !== SUPPLY_ACCESS_KEY) {
      return renderAccessDenied_();
    }
    return renderHtml_('SupplyPanel', 'inventoryopd Supply Panel');
  }

  if (page === 'pharmacist' || page === '') {
    return renderHtml_('PharmacistDashboard', 'inventoryopd Medication Availability Dashboard');
  }

  return renderHtml_('PharmacistDashboard', 'inventoryopd Medication Availability Dashboard');
}

function renderHtml_(fileName, title) {
  return HtmlService
    .createTemplateFromFile(fileName)
    .evaluate()
    .setTitle(title)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function renderAccessDenied_() {
  var html = [
    '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<style>',
    'body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f6f8fb;color:#102448;font-family:Arial,Tahoma,sans-serif}',
    '.box{width:min(92vw,460px);border:1px solid #dde6ef;border-radius:18px;background:white;padding:28px;box-shadow:0 20px 60px rgba(16,36,72,.10);text-align:center}',
    'h1{margin:0 0 10px;font-size:24px}.muted{margin:0;color:#60708a;line-height:1.8}.watermark{position:fixed;right:0;left:0;bottom:12px;color:#7b8798;font-size:12px;text-align:center}',
    '</style></head><body>',
    '<main class="box"><h1>غير مصرح بالدخول</h1><p class="muted">رابط لوحة التموين غير صحيح أو لا يحتوي على مفتاح الدخول المطلوب.</p></main>',
    '<div class="watermark">تم انتاج وتصميم العمل بالكامل بواسطة وعد نايف الوقداني Email: waadalwagdani@gmail.com</div>',
    '</body></html>'
  ].join('');
  return HtmlService.createHtmlOutput(html).setTitle('غير مصرح بالدخول');
}

function getMedicines() {
  var data = readSheetRows_(SHEETS.MASTER, MASTER_HEADERS);
  return data.rows
    .filter(function (row) {
      return stringValue_(row[MASTER.DB_ID]) ||
        stringValue_(row[MASTER.ITEM]) ||
        stringValue_(row[MASTER.NAME]) ||
        stringValue_(row[MASTER.NAME_AR]);
    })
    .map(medicineFromRow_);
}

function updateAvailability(payload) {
  payload = payload || {};
  var dbId = stringValue_(payload.dbId);
  var newStatus = stringValue_(payload.status);
  var incomingLocation = stringValue_(payload.limitedLocation);
  var incomingAlternative = stringValue_(payload.hasAlternative);
  var note = stringValue_(payload.note);
  var user = stringValue_(payload.user);

  if (!dbId) throw new Error('يجب اختيار الدواء قبل حفظ التغيير.');
  if (!user) throw new Error('يجب اختيار اسم المحدث قبل حفظ التغيير.');
  validateStatus_(newStatus);

  var masterData = readSheetRows_(SHEETS.MASTER, MASTER_HEADERS);
  var row = findMasterByDbId_(masterData.rows, dbId);
  if (!row) throw new Error('لم يتم العثور على الدواء في Master_DB.');

  var oldStatus = stringValue_(row[MASTER.STATUS]) || STATUS_UNKNOWN;
  var oldLocation = stringValue_(row[MASTER.LIMITED_LOCATION]);
  var oldAlternative = stringValue_(row[MASTER.HAS_ALTERNATIVE]) || STATUS_UNKNOWN;
  var oldNote = stringValue_(row[MASTER.NOTE]);
  var finalLocation = '';
  var finalAlternative = oldAlternative || STATUS_UNKNOWN;

  if (newStatus === STATUS_LIMITED) {
    if (DEFAULT_LIMITED_LOCATIONS.indexOf(incomingLocation) === -1) {
      throw new Error('يجب اختيار مكان توفر الكمية المحدودة.');
    }
    finalLocation = incomingLocation;
  }

  if (newStatus === STATUS_UNAVAILABLE) {
    if (DEFAULT_ALTERNATIVES.indexOf(incomingAlternative) === -1) {
      throw new Error('يجب تحديد هل للصنف بديل مكافئ.');
    }
    finalAlternative = incomingAlternative;
  }

  if (newStatus === STATUS_AVAILABLE || newStatus === STATUS_LIMITED || newStatus === STATUS_UNKNOWN) {
    finalAlternative = incomingAlternative || oldAlternative || STATUS_UNKNOWN;
  }

  var timestamp = nowTimestamp_();

  setCell_(masterData.sheet, masterData.headerMap, row._rowNumber, MASTER.STATUS, newStatus);
  setCell_(masterData.sheet, masterData.headerMap, row._rowNumber, MASTER.LIMITED_LOCATION, finalLocation);
  setCell_(masterData.sheet, masterData.headerMap, row._rowNumber, MASTER.HAS_ALTERNATIVE, finalAlternative);
  setCell_(masterData.sheet, masterData.headerMap, row._rowNumber, MASTER.NOTE, note);
  setCell_(masterData.sheet, masterData.headerMap, row._rowNumber, MASTER.UPDATED_AT, timestamp);
  setCell_(masterData.sheet, masterData.headerMap, row._rowNumber, MASTER.UPDATED_BY, user);
  setCell_(masterData.sheet, masterData.headerMap, row._rowNumber, MASTER.SEARCH_KEY, buildSearchKey_(row));

  appendRowObject_(SHEETS.UPDATE_LOG, UPDATE_LOG_HEADERS, buildAvailabilityLogRow_({
    timestamp: timestamp,
    medicine: row,
    oldStatus: oldStatus,
    newStatus: newStatus,
    oldLocation: oldLocation,
    newLocation: finalLocation,
    oldAlternative: oldAlternative,
    newAlternative: finalAlternative,
    oldNote: oldNote,
    note: note,
    user: user
  }));

  return {
    ok: true,
    message: 'تم حفظ التغييرات بنجاح.',
    oldStatus: oldStatus,
    newStatus: newStatus,
    medicine: getMedicineByDbId_(dbId)
  };
}

function getLatestUpdates(limit) {
  var max = Math.max(1, Number(limit) || 50);
  var today = todayKey_();
  var data = readSheetRows_(SHEETS.UPDATE_LOG, UPDATE_LOG_HEADERS);

  return data.rows
    .filter(function (row) {
      return stringValue_(row[UPDATE_LOG.TYPE]) === UPDATE_TYPE_AVAILABILITY &&
        dateKeyFromValue_(row[UPDATE_LOG.TIMESTAMP]) === today;
    })
    .sort(function (a, b) {
      var diff = timestampMillis_(b[UPDATE_LOG.TIMESTAMP]) - timestampMillis_(a[UPDATE_LOG.TIMESTAMP]);
      if (diff !== 0) return diff;
      return b._rowNumber - a._rowNumber;
    })
    .slice(0, max)
    .map(function (row) {
      return {
        timestamp: timestampString_(row[UPDATE_LOG.TIMESTAMP]),
        name: stringValue_(row[UPDATE_LOG.NAME]),
        nameAr: stringValue_(row[UPDATE_LOG.NAME_AR]),
        itemNumber: stringValue_(row[UPDATE_LOG.ITEM]),
        oldStatus: stringValue_(row[UPDATE_LOG.OLD_STATUS]),
        newStatus: stringValue_(row[UPDATE_LOG.NEW_STATUS]),
        user: stringValue_(row[UPDATE_LOG.USER])
      };
    });
}

function getExpiringBuckets() {
  var todayMillis = dateOnlyMillis_(todayKey_());
  var data = readSheetRows_(SHEETS.EXPIRY, EXPIRY_HEADERS);
  var expiring = data.rows
    .filter(isActiveExpiry_)
    .map(function (row) {
      var item = expiryFromRow_(row);
      item.daysUntil = Math.ceil((dateOnlyMillis_(item.sortDate) - todayMillis) / 86400000);
      return item;
    })
    .filter(function (item) {
      return item.daysUntil >= 0 && item.daysUntil <= 60;
    })
    .sort(function (a, b) {
      if (a.daysUntil !== b.daysUntil) return a.daysUntil - b.daysUntil;
      return stringValue_(a.name).localeCompare(stringValue_(b.name));
    });

  return {
    within30: expiring.filter(function (item) {
      return item.daysUntil <= 30;
    }),
    within60: expiring.filter(function (item) {
      return item.daysUntil > 30 && item.daysUntil <= 60;
    })
  };
}

function getExpiryDates(dbId) {
  var id = stringValue_(dbId);
  var data = readSheetRows_(SHEETS.EXPIRY, EXPIRY_HEADERS);
  return data.rows
    .filter(function (row) {
      return isActiveExpiry_(row) && (!id || stringValue_(row[EXPIRY.DB_ID]) === id);
    })
    .map(expiryFromRow_)
    .sort(function (a, b) {
      return dateOnlyMillis_(a.sortDate) - dateOnlyMillis_(b.sortDate);
    });
}

function addExpiryDate(payload) {
  payload = payload || {};
  var dbId = stringValue_(payload.dbId);
  var month = monthToNumber_(payload.month);
  var year = Number(payload.year);
  var note = stringValue_(payload.note);
  var user = stringValue_(payload.user);

  if (!dbId) throw new Error('يجب اختيار الدواء قبل إضافة تاريخ الانتهاء.');
  if (!user) throw new Error('يجب اختيار اسم المحدث قبل إضافة تاريخ الانتهاء.');
  if (!month || month < 1 || month > 12) throw new Error('يجب اختيار شهر صحيح.');
  if (!year || year < 2000) throw new Error('يجب اختيار سنة صحيحة.');

  var activeDates = getExpiryDates(dbId);
  if (activeDates.length >= 6) {
    throw new Error('لا يمكن إضافة أكثر من 6 تواريخ انتهاء نشطة لنفس الدواء.');
  }

  var masterData = readSheetRows_(SHEETS.MASTER, MASTER_HEADERS);
  var medicine = findMasterByDbId_(masterData.rows, dbId);
  if (!medicine) throw new Error('لم يتم العثور على الدواء في Master_DB.');

  var sortDate = lastDayOfMonthKey_(month, year);
  var timestamp = nowTimestamp_();
  var row = {};
  row[EXPIRY.EXPIRY_ID] = 'EXP-' + Utilities.getUuid();
  row[EXPIRY.DB_ID] = stringValue_(medicine[MASTER.DB_ID]);
  row[EXPIRY.ITEM] = stringValue_(medicine[MASTER.ITEM]);
  row[EXPIRY.NAME] = stringValue_(medicine[MASTER.NAME]);
  row[EXPIRY.NAME_AR] = stringValue_(medicine[MASTER.NAME_AR]);
  row[EXPIRY.MONTH] = month;
  row[EXPIRY.YEAR] = year;
  row[EXPIRY.SORT_DATE] = sortDate;
  row[EXPIRY.DATE_STATUS] = expiryStatusForDate_(sortDate);
  row[EXPIRY.NOTE] = note;
  row[EXPIRY.UPDATED_AT] = timestamp;
  row[EXPIRY.UPDATED_BY] = user;
  row[EXPIRY.IS_ACTIVE] = EXPIRY_ACTIVE;

  appendRowObject_(SHEETS.EXPIRY, EXPIRY_HEADERS, row);
  syncExpirySummary_(dbId);

  return {
    ok: true,
    message: 'تمت إضافة تاريخ الانتهاء.',
    expiryDates: getExpiryDates(dbId)
  };
}

function deleteExpiryDate(payload) {
  payload = payload || {};
  var expiryId = stringValue_(payload.expiryId || payload.id);
  var user = stringValue_(payload.user);

  if (!expiryId) throw new Error('رقم تاريخ الانتهاء مطلوب.');
  if (!user) throw new Error('يجب اختيار اسم المحدث قبل حذف تاريخ الانتهاء.');

  var data = readSheetRows_(SHEETS.EXPIRY, EXPIRY_HEADERS);
  var target = data.rows.filter(function (row) {
    return stringValue_(row[EXPIRY.EXPIRY_ID]) === expiryId;
  })[0];

  if (!target) throw new Error('لم يتم العثور على تاريخ الانتهاء.');

  setCell_(data.sheet, data.headerMap, target._rowNumber, EXPIRY.IS_ACTIVE, EXPIRY_DELETED);
  setCell_(data.sheet, data.headerMap, target._rowNumber, EXPIRY.DATE_STATUS, EXPIRY_DELETED);
  setCell_(data.sheet, data.headerMap, target._rowNumber, EXPIRY.UPDATED_AT, nowTimestamp_());
  setCell_(data.sheet, data.headerMap, target._rowNumber, EXPIRY.UPDATED_BY, user);

  var dbId = stringValue_(target[EXPIRY.DB_ID]);
  syncExpirySummary_(dbId);

  return {
    ok: true,
    message: 'تم حذف تاريخ الانتهاء من القائمة النشطة.',
    expiryDates: getExpiryDates(dbId)
  };
}

function getSettings() {
  var data = readSheetRows_(SHEETS.SETTINGS, SETTINGS_HEADERS);
  return {
    users: valuesFromColumn_(data.rows, SETTINGS.USERS, DEFAULT_USERS),
    statuses: valuesFromColumn_(data.rows, SETTINGS.STATUSES, DEFAULT_STATUSES),
    limitedLocations: valuesFromColumn_(data.rows, SETTINGS.LIMITED_LOCATIONS, DEFAULT_LIMITED_LOCATIONS),
    alternativeOptions: valuesFromColumn_(data.rows, SETTINGS.ALTERNATIVES, DEFAULT_ALTERNATIVES),
    months: buildMonthOptions_(valuesFromColumn_(data.rows, SETTINGS.MONTHS, [])),
    years: buildYearOptions_(valuesFromColumn_(data.rows, SETTINGS.YEARS, []))
  };
}

function buildAvailabilityLogRow_(input) {
  var medicine = input.medicine;
  var row = {};
  row[UPDATE_LOG.LOG_ID] = 'LOG-' + Utilities.getUuid();
  row[UPDATE_LOG.TIMESTAMP] = input.timestamp;
  row[UPDATE_LOG.TYPE] = UPDATE_TYPE_AVAILABILITY;
  row[UPDATE_LOG.DB_ID] = stringValue_(medicine[MASTER.DB_ID]);
  row[UPDATE_LOG.ITEM] = stringValue_(medicine[MASTER.ITEM]);
  row[UPDATE_LOG.NAME] = stringValue_(medicine[MASTER.NAME]);
  row[UPDATE_LOG.NAME_AR] = stringValue_(medicine[MASTER.NAME_AR]);
  row[UPDATE_LOG.OLD_STATUS] = input.oldStatus;
  row[UPDATE_LOG.NEW_STATUS] = input.newStatus;
  row[UPDATE_LOG.OLD_LOCATION] = input.oldLocation;
  row[UPDATE_LOG.NEW_LOCATION] = input.newLocation;
  row[UPDATE_LOG.OLD_ALTERNATIVE] = input.oldAlternative;
  row[UPDATE_LOG.NEW_ALTERNATIVE] = input.newAlternative;
  row[UPDATE_LOG.NOTE] = input.note;
  row[UPDATE_LOG.USER] = input.user;
  row[UPDATE_LOG.SOURCE] = UPDATE_SOURCE_SUPPLY;
  row[UPDATE_LOG.FIELD] = UPDATE_FIELD_AVAILABILITY;
  return row;
}

function medicineFromRow_(row) {
  return {
    dbId: stringValue_(row[MASTER.DB_ID]),
    itemNumber: stringValue_(row[MASTER.ITEM]),
    name: stringValue_(row[MASTER.NAME]),
    nameAr: stringValue_(row[MASTER.NAME_AR]),
    dosageForm: stringValue_(row[MASTER.FORM]),
    dosageFormAr: stringValue_(row[MASTER.FORM_AR]),
    status: stringValue_(row[MASTER.STATUS]) || STATUS_UNKNOWN,
    limitedLocation: stringValue_(row[MASTER.LIMITED_LOCATION]),
    hasAlternative: stringValue_(row[MASTER.HAS_ALTERNATIVE]) || STATUS_UNKNOWN,
    note: stringValue_(row[MASTER.NOTE]),
    updatedAt: timestampString_(row[MASTER.UPDATED_AT]),
    updatedBy: stringValue_(row[MASTER.UPDATED_BY]),
    expiryDates: stringValue_(row[MASTER.EXPIRY_DATES]),
    expiryCount: Number(row[MASTER.EXPIRY_COUNT]) || 0,
    nearestExpiry: dateKeyFromValue_(row[MASTER.NEAREST_EXPIRY]) || stringValue_(row[MASTER.NEAREST_EXPIRY]),
    expiryAlert: stringValue_(row[MASTER.EXPIRY_ALERT]),
    searchKey: stringValue_(row[MASTER.SEARCH_KEY]) || buildSearchKey_(row)
  };
}

function expiryFromRow_(row) {
  var month = monthToNumber_(row[EXPIRY.MONTH]);
  var year = Number(row[EXPIRY.YEAR]) || '';
  var sortDate = dateKeyFromValue_(row[EXPIRY.SORT_DATE]) || (month && year ? lastDayOfMonthKey_(month, year) : '');
  return {
    expiryId: stringValue_(row[EXPIRY.EXPIRY_ID]),
    dbId: stringValue_(row[EXPIRY.DB_ID]),
    itemNumber: stringValue_(row[EXPIRY.ITEM]),
    name: stringValue_(row[EXPIRY.NAME]),
    nameAr: stringValue_(row[EXPIRY.NAME_AR]),
    month: month,
    year: year,
    sortDate: sortDate,
    dateStatus: stringValue_(row[EXPIRY.DATE_STATUS]) || expiryStatusForDate_(sortDate),
    note: stringValue_(row[EXPIRY.NOTE]),
    updatedAt: timestampString_(row[EXPIRY.UPDATED_AT]),
    updatedBy: stringValue_(row[EXPIRY.UPDATED_BY]),
    isActive: stringValue_(row[EXPIRY.IS_ACTIVE]) || EXPIRY_ACTIVE
  };
}

function syncExpirySummary_(dbId) {
  var id = stringValue_(dbId);
  if (!id) return;

  var masterData = readSheetRows_(SHEETS.MASTER, MASTER_HEADERS);
  var medicine = findMasterByDbId_(masterData.rows, id);
  if (!medicine) return;

  var dates = getExpiryDates(id).map(function (item) {
    return item.sortDate;
  }).filter(Boolean).sort();
  var nearest = dates[0] || '';

  setCell_(masterData.sheet, masterData.headerMap, medicine._rowNumber, MASTER.EXPIRY_DATES, dates.join(', '));
  setCell_(masterData.sheet, masterData.headerMap, medicine._rowNumber, MASTER.EXPIRY_COUNT, dates.length);
  setCell_(masterData.sheet, masterData.headerMap, medicine._rowNumber, MASTER.NEAREST_EXPIRY, nearest);
  setCell_(masterData.sheet, masterData.headerMap, medicine._rowNumber, MASTER.EXPIRY_ALERT, expiryStatusForDate_(nearest));
}

function findMasterByDbId_(rows, dbId) {
  var id = stringValue_(dbId);
  return rows.filter(function (row) {
    return stringValue_(row[MASTER.DB_ID]) === id;
  })[0] || null;
}

function getMedicineByDbId_(dbId) {
  var data = readSheetRows_(SHEETS.MASTER, MASTER_HEADERS);
  var row = findMasterByDbId_(data.rows, dbId);
  return row ? medicineFromRow_(row) : null;
}

function readSheetRows_(sheetName, headers) {
  var sheet = ensureSheet_(sheetName, headers);
  var sheetHeaders = getHeaders_(sheet);
  var headerMap = headerMap_(sheetHeaders);
  var lastRow = sheet.getLastRow();
  var rows = [];

  if (lastRow > 1) {
    rows = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn())
      .getValues()
      .map(function (values, index) {
        return rowObject_(sheetHeaders, values, index + 2);
      })
      .filter(function (row) {
        return !row._isBlank;
      });
  }

  return {
    sheet: sheet,
    headers: sheetHeaders,
    headerMap: headerMap,
    rows: rows
  };
}

function ensureSheet_(sheetName, requiredHeaders) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('لم يتم العثور على ملف Google Sheets المرتبط بالتطبيق.');
  }
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(sheetName);
  ensureHeaders_(sheet, requiredHeaders);
  return sheet;
}

function ensureHeaders_(sheet, requiredHeaders) {
  if (sheet.getLastColumn() === 0 || sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, requiredHeaders.length).setValues([requiredHeaders]);
    sheet.setFrozenRows(1);
    return;
  }

  var currentHeaders = getHeaders_(sheet);
  var missing = requiredHeaders.filter(function (header) {
    return currentHeaders.indexOf(header) === -1;
  });

  if (missing.length) {
    sheet.getRange(1, sheet.getLastColumn() + 1, 1, missing.length).setValues([missing]);
  }

  sheet.setFrozenRows(1);
}

function getHeaders_(sheet) {
  return sheet.getRange(1, 1, 1, Math.max(1, sheet.getLastColumn()))
    .getValues()[0]
    .map(function (header) {
      return stringValue_(header);
    });
}

function headerMap_(headers) {
  var map = {};
  headers.forEach(function (header, index) {
    if (header && !map[header]) map[header] = index + 1;
  });
  return map;
}

function rowObject_(headers, values, rowNumber) {
  var object = {
    _rowNumber: rowNumber,
    _isBlank: values.every(function (value) {
      return stringValue_(value) === '';
    })
  };
  headers.forEach(function (header, index) {
    if (header) object[header] = values[index];
  });
  return object;
}

function setCell_(sheet, headerMap, rowNumber, header, value) {
  var column = headerMap[header];
  if (!column) {
    ensureHeaders_(sheet, [header]);
    column = headerMap_(getHeaders_(sheet))[header];
  }
  sheet.getRange(rowNumber, column).setValue(value);
}

function appendRowObject_(sheetName, headers, object) {
  var sheet = ensureSheet_(sheetName, headers);
  var currentHeaders = getHeaders_(sheet);
  var values = currentHeaders.map(function (header) {
    return Object.prototype.hasOwnProperty.call(object, header) ? object[header] : '';
  });
  sheet.appendRow(values);
}

function valuesFromColumn_(rows, header, fallbackValues) {
  var values = rows.map(function (row) {
    return stringValue_(row[header]);
  }).filter(Boolean);
  return unique_(values.length ? values : fallbackValues);
}

function buildMonthOptions_(values) {
  var source = values.length ? values : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  return source.map(function (value) {
    var number = monthToNumber_(value);
    return {
      value: number,
      label: number ? pad2_(number) : stringValue_(value)
    };
  }).filter(function (item) {
    return item.value >= 1 && item.value <= 12;
  });
}

function buildYearOptions_(values) {
  if (values.length) return values.map(stringValue_);
  var current = Number(Utilities.formatDate(new Date(), APP_TIMEZONE, 'yyyy'));
  var years = [];
  for (var i = 0; i <= 7; i += 1) years.push(String(current + i));
  return years;
}

function validateStatus_(status) {
  if (DEFAULT_STATUSES.indexOf(status) === -1) {
    throw new Error('حالة التوفر غير صحيحة.');
  }
}

function isActiveExpiry_(row) {
  return stringValue_(row[EXPIRY.IS_ACTIVE]) !== EXPIRY_DELETED;
}

function buildSearchKey_(row) {
  return [
    row[MASTER.NAME],
    row[MASTER.NAME_AR],
    row[MASTER.ITEM],
    row[MASTER.FORM],
    row[MASTER.FORM_AR]
  ].map(stringValue_).filter(Boolean).join(' | ').toLowerCase();
}

function nowTimestamp_() {
  return Utilities.formatDate(new Date(), APP_TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
}

function todayKey_() {
  return Utilities.formatDate(new Date(), APP_TIMEZONE, 'yyyy-MM-dd');
}

function timestampString_(value) {
  if (!value) return '';
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, APP_TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
  }
  return stringValue_(value);
}

function dateKeyFromValue_(value) {
  if (!value) return '';
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, APP_TIMEZONE, 'yyyy-MM-dd');
  }
  var text = stringValue_(value);
  var match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) return match[1] + '-' + match[2] + '-' + match[3];
  var parsed = new Date(text);
  if (!isNaN(parsed.getTime())) return Utilities.formatDate(parsed, APP_TIMEZONE, 'yyyy-MM-dd');
  return '';
}

function timestampMillis_(value) {
  if (!value) return 0;
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return value.getTime();
  }
  var text = stringValue_(value);
  var match = text.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/);
  if (match) {
    return Date.UTC(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3]),
      Number(match[4]) - 3,
      Number(match[5]),
      Number(match[6])
    );
  }
  var parsed = new Date(text);
  return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

function dateOnlyMillis_(dateKey) {
  var match = stringValue_(dateKey).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return 0;
  return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function lastDayOfMonthKey_(month, year) {
  var date = new Date(Date.UTC(Number(year), Number(month), 0));
  return date.getUTCFullYear() + '-' + pad2_(date.getUTCMonth() + 1) + '-' + pad2_(date.getUTCDate());
}

function expiryStatusForDate_(dateKey) {
  if (!dateKey) return '';
  var days = Math.ceil((dateOnlyMillis_(dateKey) - dateOnlyMillis_(todayKey_())) / 86400000);
  if (days < 0) return 'منتهي';
  if (days <= 30) return 'قريب الانتهاء';
  if (days <= 60) return 'تحذير خلال 60 يوم';
  return EXPIRY_ACTIVE;
}

function monthToNumber_(value) {
  var text = stringValue_(value);
  var numeric = Number(text);
  if (numeric >= 1 && numeric <= 12) return numeric;
  var clean = text.replace(/\s+/g, '');
  var names = {
    يناير: 1,
    فبراير: 2,
    مارس: 3,
    ابريل: 4,
    أبريل: 4,
    مايو: 5,
    يونيو: 6,
    يوليو: 7,
    اغسطس: 8,
    أغسطس: 8,
    سبتمبر: 9,
    اكتوبر: 10,
    أكتوبر: 10,
    نوفمبر: 11,
    ديسمبر: 12
  };
  return names[clean] || 0;
}

function unique_(values) {
  var seen = {};
  return values.map(stringValue_).filter(function (value) {
    if (!value || seen[value]) return false;
    seen[value] = true;
    return true;
  });
}

function stringValue_(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function pad2_(value) {
  return String(value).padStart(2, '0');
}
