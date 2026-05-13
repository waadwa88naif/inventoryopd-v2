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
var UPDATE_TYPE_AVAILABILITY = 'Availability Update';
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
  EQUIVALENT: 'هل للصنف بديل مكافئ؟',
  SUPPLY_NOTE: 'ملاحظة التموين',
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
  OLD_EQUIVALENT: 'البديل السابق',
  NEW_EQUIVALENT: 'البديل الجديد',
  NOTE: 'ملاحظة',
  USER: 'تم التحديث بواسطة',
  SOURCE: 'مصدر التحديث'
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
  EQUIVALENTS: 'هل للصنف بديل مكافئ؟',
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
  MASTER.EQUIVALENT,
  MASTER.SUPPLY_NOTE,
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
  UPDATE_LOG.OLD_EQUIVALENT,
  UPDATE_LOG.NEW_EQUIVALENT,
  UPDATE_LOG.NOTE,
  UPDATE_LOG.USER,
  UPDATE_LOG.SOURCE
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
  SETTINGS.EQUIVALENTS,
  SETTINGS.MONTHS,
  SETTINGS.YEARS
];

function doGet(e) {
  var params = e && e.parameter ? e.parameter : {};

  if (params.page === 'supply') {
    if (params.key !== SUPPLY_ACCESS_KEY) {
      return renderAccessDenied_();
    }
    return HtmlService
      .createTemplateFromFile('SupplyPanel')
      .evaluate()
      .setTitle('Inventory OPD Supply Panel')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  return HtmlService
    .createTemplateFromFile('PharmacistDashboard')
    .evaluate()
    .setTitle('Inventory OPD Pharmacist Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function renderAccessDenied_() {
  return HtmlService
    .createHtmlOutput(
      '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<style>body{margin:0;font-family:Arial,Tahoma,sans-serif;background:#f4f7fb;color:#183044;display:grid;min-height:100vh;place-items:center}.card{background:#fff;border:1px solid #dce6ef;border-radius:16px;padding:28px;max-width:420px;box-shadow:0 18px 40px rgba(30,50,70,.08)}h1{margin:0 0 12px;font-size:24px}.muted{color:#687b8e;line-height:1.8}.watermark{position:fixed;inset:auto 0 16px;text-align:center;font-size:12px;color:#6d7e8f}</style>' +
      '</head><body><main class="card"><h1>غير مصرح بالدخول</h1><p class="muted">صفحة التموين تتطلب رابطا يحتوي على مفتاح الدخول الصحيح.</p></main>' +
      '<div class="watermark">تم انتاج وتصميم العمل بالكامل بواسطة وعد نايف الوقداني Email: waadalwagdani@gmail.com</div></body></html>'
    )
    .setTitle('Access denied');
}

function getMedicines() {
  var data = readSheetRows_(SHEETS.MASTER, MASTER_HEADERS);
  return data.rows
    .filter(function (row) {
      return valueToString_(row[MASTER.DB_ID]) ||
        valueToString_(row[MASTER.ITEM]) ||
        valueToString_(row[MASTER.NAME]) ||
        valueToString_(row[MASTER.NAME_AR]);
    })
    .map(medicineFromMasterRow_);
}

function getSettings() {
  var data = readSheetRows_(SHEETS.SETTINGS, SETTINGS_HEADERS);

  var users = valuesFromColumn_(data.rows, SETTINGS.USERS, []);
  var statuses = valuesFromColumn_(data.rows, SETTINGS.STATUSES, [
    STATUS_AVAILABLE,
    STATUS_LIMITED,
    STATUS_UNAVAILABLE
  ]);
  var limitedLocations = valuesFromColumn_(data.rows, SETTINGS.LIMITED_LOCATIONS, [
    'في الصيدلية',
    'مكتب المشرف'
  ]);
  var equivalentOptions = valuesFromColumn_(data.rows, SETTINGS.EQUIVALENTS, [
    'نعم',
    'لا',
    'غير محدد'
  ]);

  return {
    users: users,
    statuses: statuses,
    limitedLocations: limitedLocations,
    equivalentOptions: equivalentOptions,
    months: buildMonthOptions_(valuesFromColumn_(data.rows, SETTINGS.MONTHS, [])),
    years: buildYearOptions_(valuesFromColumn_(data.rows, SETTINGS.YEARS, []))
  };
}

function getSupplyBootstrap() {
  return {
    settings: getSettings(),
    medicines: getMedicines()
  };
}

function getDashboardBootstrap() {
  return {
    medicines: getMedicines(),
    expiring30: getExpiringMedications(30),
    expiring60: getExpiringMedications(60)
  };
}

function getLatestUpdates(limit) {
  var max = Math.max(1, Number(limit) || 50);
  var today = todayKey_();
  var data = readSheetRows_(SHEETS.UPDATE_LOG, UPDATE_LOG_HEADERS);

  return data.rows
    .filter(function (row) {
      return valueToString_(row[UPDATE_LOG.TYPE]) === UPDATE_TYPE_AVAILABILITY &&
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
        name: valueToString_(row[UPDATE_LOG.NAME]),
        nameAr: valueToString_(row[UPDATE_LOG.NAME_AR]),
        itemNumber: valueToString_(row[UPDATE_LOG.ITEM]),
        oldStatus: valueToString_(row[UPDATE_LOG.OLD_STATUS]),
        newStatus: valueToString_(row[UPDATE_LOG.NEW_STATUS]),
        user: valueToString_(row[UPDATE_LOG.USER])
      };
    });
}

function updateAvailability(payload) {
  payload = payload || {};
  var newStatus = valueToString_(payload.status || payload.newStatus);
  var user = valueToString_(payload.user || payload.updatedBy);
  var dbId = valueToString_(payload.dbId || payload.DB_ID);
  var itemNumber = valueToString_(payload.itemNumber || payload.item);
  var location = valueToString_(payload.location || payload.limitedLocation);
  var equivalent = valueToString_(payload.equivalentAlternative || payload.equivalent);
  var note = valueToString_(payload.note);

  validateAvailabilityPayload_(newStatus, user, location, equivalent);

  if (newStatus !== STATUS_LIMITED) {
    location = '';
  }
  if (newStatus !== STATUS_UNAVAILABLE) {
    equivalent = '';
  }

  var data = readSheetRows_(SHEETS.MASTER, MASTER_HEADERS);
  var match = findMasterRow_(data.rows, dbId, itemNumber);
  if (!match) {
    throw new Error('لم يتم العثور على الدواء المطلوب في Master_DB.');
  }

  var oldStatus = valueToString_(match[MASTER.STATUS]);
  var oldLocation = valueToString_(match[MASTER.LIMITED_LOCATION]);
  var oldEquivalent = valueToString_(match[MASTER.EQUIVALENT]);
  var timestamp = nowTimestamp_();

  setCellByHeader_(data.sheet, data.headerMap, match._rowNumber, MASTER.STATUS, newStatus);
  setCellByHeader_(data.sheet, data.headerMap, match._rowNumber, MASTER.LIMITED_LOCATION, location);
  setCellByHeader_(data.sheet, data.headerMap, match._rowNumber, MASTER.EQUIVALENT, equivalent);
  setCellByHeader_(data.sheet, data.headerMap, match._rowNumber, MASTER.SUPPLY_NOTE, note);
  setCellByHeader_(data.sheet, data.headerMap, match._rowNumber, MASTER.UPDATED_AT, timestamp);
  setCellByHeader_(data.sheet, data.headerMap, match._rowNumber, MASTER.UPDATED_BY, user);
  setCellByHeader_(data.sheet, data.headerMap, match._rowNumber, MASTER.SEARCH_KEY, buildSearchKey_(match));

  appendRowObject_(SHEETS.UPDATE_LOG, UPDATE_LOG_HEADERS, buildAvailabilityLogRow_({
    timestamp: timestamp,
    medicine: match,
    oldStatus: oldStatus,
    newStatus: newStatus,
    oldLocation: oldLocation,
    newLocation: location,
    oldEquivalent: oldEquivalent,
    newEquivalent: equivalent,
    note: note,
    user: user
  }));

  return {
    ok: true,
    message: 'تم حفظ تحديث التوفر.',
    oldStatus: oldStatus,
    newStatus: newStatus,
    medicine: getMedicineByIdentity_(valueToString_(match[MASTER.DB_ID]), valueToString_(match[MASTER.ITEM]))
  };
}

function addExpiryDate(payload) {
  payload = payload || {};
  var dbId = valueToString_(payload.dbId);
  var itemNumber = valueToString_(payload.itemNumber);
  var user = valueToString_(payload.user || payload.updatedBy);
  var month = monthToNumber_(payload.month);
  var year = Number(payload.year);
  var note = valueToString_(payload.note);

  if (!user) throw new Error('يجب اختيار اسم المحدث قبل إضافة تاريخ الانتهاء.');
  if (!month || month < 1 || month > 12) throw new Error('يجب اختيار شهر انتهاء صحيح.');
  if (!year || year < 2000) throw new Error('يجب اختيار سنة انتهاء صحيحة.');

  var masterData = readSheetRows_(SHEETS.MASTER, MASTER_HEADERS);
  var medicine = findMasterRow_(masterData.rows, dbId, itemNumber);
  if (!medicine) throw new Error('لم يتم العثور على الدواء المطلوب في Master_DB.');

  var timestamp = nowTimestamp_();
  var sortDate = expirySortDate_(month, year);

  appendRowObject_(SHEETS.EXPIRY, EXPIRY_HEADERS, {
    Expiry_ID: 'EXP-' + Utilities.getUuid(),
    DB_ID: valueToString_(medicine[MASTER.DB_ID]),
    'Item number': valueToString_(medicine[MASTER.ITEM]),
    Name: valueToString_(medicine[MASTER.NAME]),
    'الإسم': valueToString_(medicine[MASTER.NAME_AR]),
    'شهر الانتهاء': month,
    'سنة الانتهاء': year,
    'تاريخ الانتهاء للفرز': sortDate,
    'حالة التاريخ': 'نشط',
    'ملاحظة': note,
    'آخر تحديث': timestamp,
    'تم التحديث بواسطة': user,
    Is_Active: 'نشط'
  });

  syncExpirySummaryForMedication_(valueToString_(medicine[MASTER.DB_ID]));

  return {
    ok: true,
    message: 'تمت إضافة تاريخ الانتهاء.',
    expiryDates: getExpiryDates(valueToString_(medicine[MASTER.DB_ID]))
  };
}

function deleteExpiryDate(payload) {
  payload = payload || {};
  var expiryId = valueToString_(payload.expiryId || payload.id);
  var user = valueToString_(payload.user || payload.updatedBy);
  if (!expiryId) throw new Error('رقم تاريخ الانتهاء مطلوب.');
  if (!user) throw new Error('يجب اختيار اسم المحدث قبل حذف تاريخ الانتهاء.');

  var data = readSheetRows_(SHEETS.EXPIRY, EXPIRY_HEADERS);
  var target = data.rows.filter(function (row) {
    return valueToString_(row[EXPIRY.EXPIRY_ID]) === expiryId;
  })[0];
  if (!target) throw new Error('لم يتم العثور على تاريخ الانتهاء المطلوب.');

  setCellByHeader_(data.sheet, data.headerMap, target._rowNumber, EXPIRY.IS_ACTIVE, EXPIRY_DELETED);
  setCellByHeader_(data.sheet, data.headerMap, target._rowNumber, EXPIRY.DATE_STATUS, EXPIRY_DELETED);
  setCellByHeader_(data.sheet, data.headerMap, target._rowNumber, EXPIRY.UPDATED_AT, nowTimestamp_());
  setCellByHeader_(data.sheet, data.headerMap, target._rowNumber, EXPIRY.UPDATED_BY, user);

  var dbId = valueToString_(target[EXPIRY.DB_ID]);
  syncExpirySummaryForMedication_(dbId);

  return {
    ok: true,
    message: 'تم حذف تاريخ الانتهاء من السجل النشط.',
    expiryDates: getExpiryDates(dbId)
  };
}

function getExpiryDates(dbId) {
  var data = readSheetRows_(SHEETS.EXPIRY, EXPIRY_HEADERS);
  var id = valueToString_(dbId);

  return data.rows
    .filter(function (row) {
      return isActiveExpiry_(row) && (!id || valueToString_(row[EXPIRY.DB_ID]) === id);
    })
    .map(expiryFromRow_)
    .sort(function (a, b) {
      return dateOnlyMillis_(a.sortDate) - dateOnlyMillis_(b.sortDate);
    });
}

function getExpiringMedications(days) {
  var limitDays = Math.max(1, Number(days) || 30);
  var todayMillis = dateOnlyMillis_(todayKey_());
  var data = readSheetRows_(SHEETS.EXPIRY, EXPIRY_HEADERS);

  return data.rows
    .filter(isActiveExpiry_)
    .map(function (row) {
      var expiry = expiryFromRow_(row);
      var diffDays = Math.ceil((dateOnlyMillis_(expiry.sortDate) - todayMillis) / 86400000);
      expiry.daysUntil = diffDays;
      return expiry;
    })
    .filter(function (expiry) {
      return expiry.daysUntil >= 0 && expiry.daysUntil <= limitDays;
    })
    .sort(function (a, b) {
      if (a.daysUntil !== b.daysUntil) return a.daysUntil - b.daysUntil;
      return valueToString_(a.name).localeCompare(valueToString_(b.name));
    });
}

function validateAvailabilityPayload_(status, user, location, equivalent) {
  var statusOptions = [STATUS_AVAILABLE, STATUS_LIMITED, STATUS_UNAVAILABLE];
  var locationOptions = ['في الصيدلية', 'مكتب المشرف'];
  var equivalentOptions = ['نعم', 'لا', 'غير محدد'];

  if (statusOptions.indexOf(status) === -1) {
    throw new Error('حالة التوفر غير صحيحة.');
  }
  if (!user) {
    throw new Error('يجب اختيار اسم المحدث قبل الحفظ.');
  }
  if (status === STATUS_LIMITED && locationOptions.indexOf(location) === -1) {
    throw new Error('يجب اختيار مكان توفر الكمية المحدودة.');
  }
  if (status === STATUS_UNAVAILABLE && equivalentOptions.indexOf(equivalent) === -1) {
    throw new Error('يجب تحديد هل للصنف بديل مكافئ.');
  }
}

function buildAvailabilityLogRow_(input) {
  var medicine = input.medicine;
  var row = {};
  row[UPDATE_LOG.LOG_ID] = 'LOG-' + Utilities.getUuid();
  row[UPDATE_LOG.TIMESTAMP] = input.timestamp;
  row[UPDATE_LOG.TYPE] = UPDATE_TYPE_AVAILABILITY;
  row[UPDATE_LOG.DB_ID] = valueToString_(medicine[MASTER.DB_ID]);
  row[UPDATE_LOG.ITEM] = valueToString_(medicine[MASTER.ITEM]);
  row[UPDATE_LOG.NAME] = valueToString_(medicine[MASTER.NAME]);
  row[UPDATE_LOG.NAME_AR] = valueToString_(medicine[MASTER.NAME_AR]);
  row[UPDATE_LOG.OLD_STATUS] = input.oldStatus;
  row[UPDATE_LOG.NEW_STATUS] = input.newStatus;
  row[UPDATE_LOG.OLD_LOCATION] = input.oldLocation;
  row[UPDATE_LOG.NEW_LOCATION] = input.newLocation;
  row[UPDATE_LOG.OLD_EQUIVALENT] = input.oldEquivalent;
  row[UPDATE_LOG.NEW_EQUIVALENT] = input.newEquivalent;
  row[UPDATE_LOG.NOTE] = input.note;
  row[UPDATE_LOG.USER] = input.user;
  row[UPDATE_LOG.SOURCE] = 'SupplyPanel';
  return row;
}

function medicineFromMasterRow_(row) {
  var status = valueToString_(row[MASTER.STATUS]) || STATUS_AVAILABLE;
  return {
    dbId: valueToString_(row[MASTER.DB_ID]),
    itemNumber: valueToString_(row[MASTER.ITEM]),
    name: valueToString_(row[MASTER.NAME]),
    nameAr: valueToString_(row[MASTER.NAME_AR]),
    dosageForm: valueToString_(row[MASTER.FORM]),
    dosageFormAr: valueToString_(row[MASTER.FORM_AR]),
    status: status,
    limitedLocation: valueToString_(row[MASTER.LIMITED_LOCATION]),
    equivalentAlternative: valueToString_(row[MASTER.EQUIVALENT]) || 'غير محدد',
    supplyNote: valueToString_(row[MASTER.SUPPLY_NOTE]),
    updatedAt: timestampString_(row[MASTER.UPDATED_AT]),
    updatedBy: valueToString_(row[MASTER.UPDATED_BY]),
    currentExpiryDates: valueToString_(row[MASTER.EXPIRY_DATES]),
    expiryCount: Number(row[MASTER.EXPIRY_COUNT]) || 0,
    nearestExpiry: dateKeyFromValue_(row[MASTER.NEAREST_EXPIRY]) || valueToString_(row[MASTER.NEAREST_EXPIRY]),
    expiryAlert: valueToString_(row[MASTER.EXPIRY_ALERT]),
    searchKey: valueToString_(row[MASTER.SEARCH_KEY]) || buildSearchKey_(row)
  };
}

function expiryFromRow_(row) {
  var month = monthToNumber_(row[EXPIRY.MONTH]);
  var year = Number(row[EXPIRY.YEAR]);
  var sortDate = dateKeyFromValue_(row[EXPIRY.SORT_DATE]) || (month && year ? expirySortDate_(month, year) : '');

  return {
    expiryId: valueToString_(row[EXPIRY.EXPIRY_ID]),
    dbId: valueToString_(row[EXPIRY.DB_ID]),
    itemNumber: valueToString_(row[EXPIRY.ITEM]),
    name: valueToString_(row[EXPIRY.NAME]),
    nameAr: valueToString_(row[EXPIRY.NAME_AR]),
    month: month,
    year: year,
    sortDate: sortDate,
    dateStatus: valueToString_(row[EXPIRY.DATE_STATUS]),
    note: valueToString_(row[EXPIRY.NOTE]),
    updatedAt: timestampString_(row[EXPIRY.UPDATED_AT]),
    updatedBy: valueToString_(row[EXPIRY.UPDATED_BY]),
    isActive: valueToString_(row[EXPIRY.IS_ACTIVE]) || 'نشط'
  };
}

function syncExpirySummaryForMedication_(dbId) {
  var id = valueToString_(dbId);
  if (!id) return;

  var masterData = readSheetRows_(SHEETS.MASTER, MASTER_HEADERS);
  var medicine = findMasterRow_(masterData.rows, id, '');
  if (!medicine) return;

  var activeDates = getExpiryDates(id).map(function (expiry) {
    return expiry.sortDate;
  }).filter(Boolean).sort();

  var nearest = activeDates[0] || '';
  setCellByHeader_(masterData.sheet, masterData.headerMap, medicine._rowNumber, MASTER.EXPIRY_DATES, activeDates.join(', '));
  setCellByHeader_(masterData.sheet, masterData.headerMap, medicine._rowNumber, MASTER.EXPIRY_COUNT, activeDates.length);
  setCellByHeader_(masterData.sheet, masterData.headerMap, medicine._rowNumber, MASTER.NEAREST_EXPIRY, nearest);
  setCellByHeader_(masterData.sheet, masterData.headerMap, medicine._rowNumber, MASTER.EXPIRY_ALERT, expiryAlertForDate_(nearest));
}

function expiryAlertForDate_(dateKey) {
  if (!dateKey) return '';
  var diffDays = Math.ceil((dateOnlyMillis_(dateKey) - dateOnlyMillis_(todayKey_())) / 86400000);
  if (diffDays < 0) return 'منتهي';
  if (diffDays <= 30) return 'خلال 30 يوم';
  if (diffDays <= 60) return 'خلال 60 يوم';
  return '';
}

function findMasterRow_(rows, dbId, itemNumber) {
  var id = valueToString_(dbId);
  var item = valueToString_(itemNumber);
  return rows.filter(function (row) {
    return (id && valueToString_(row[MASTER.DB_ID]) === id) ||
      (item && valueToString_(row[MASTER.ITEM]) === item);
  })[0] || null;
}

function getMedicineByIdentity_(dbId, itemNumber) {
  var data = readSheetRows_(SHEETS.MASTER, MASTER_HEADERS);
  var row = findMasterRow_(data.rows, dbId, itemNumber);
  return row ? medicineFromMasterRow_(row) : null;
}

function appendRowObject_(sheetName, requiredHeaders, object) {
  var sheet = ensureSheet_(sheetName, requiredHeaders);
  var headers = getHeaders_(sheet);
  var row = headers.map(function (header) {
    return Object.prototype.hasOwnProperty.call(object, header) ? object[header] : '';
  });
  sheet.appendRow(row);
}

function readSheetRows_(sheetName, requiredHeaders) {
  var sheet = ensureSheet_(sheetName, requiredHeaders);
  var headers = getHeaders_(sheet);
  var headerMap = headerMapFromHeaders_(headers);
  var lastRow = sheet.getLastRow();
  var rows = [];

  if (lastRow >= 2) {
    var values = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
    rows = values
      .map(function (valuesRow, index) {
        return rowObject_(headers, valuesRow, index + 2);
      })
      .filter(function (row) {
        return !row._isBlank;
      });
  }

  return {
    sheet: sheet,
    headers: headers,
    headerMap: headerMap,
    rows: rows
  };
}

function ensureSheet_(sheetName, requiredHeaders) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  ensureHeaders_(sheet, requiredHeaders);
  return sheet;
}

function ensureHeaders_(sheet, requiredHeaders) {
  if (sheet.getLastRow() === 0 || sheet.getLastColumn() === 0) {
    sheet.getRange(1, 1, 1, requiredHeaders.length).setValues([requiredHeaders]);
    sheet.setFrozenRows(1);
    return;
  }

  var lastColumn = sheet.getLastColumn();
  var existingHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0].map(normalizeHeader_);
  var missingHeaders = requiredHeaders.filter(function (header) {
    return existingHeaders.indexOf(header) === -1;
  });

  if (missingHeaders.length) {
    sheet.getRange(1, lastColumn + 1, 1, missingHeaders.length).setValues([missingHeaders]);
  }
  sheet.setFrozenRows(1);
}

function getHeaders_(sheet) {
  if (sheet.getLastColumn() === 0) return [];
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(normalizeHeader_);
}

function headerMapFromHeaders_(headers) {
  var map = {};
  headers.forEach(function (header, index) {
    if (header && !map[header]) {
      map[header] = index + 1;
    }
  });
  return map;
}

function rowObject_(headers, values, rowNumber) {
  var object = {
    _rowNumber: rowNumber,
    _isBlank: values.every(function (value) {
      return valueToString_(value) === '';
    })
  };
  headers.forEach(function (header, index) {
    if (header) object[header] = values[index];
  });
  return object;
}

function setCellByHeader_(sheet, headerMap, rowNumber, header, value) {
  var column = headerMap[header];
  if (!column) {
    ensureHeaders_(sheet, [header]);
    headerMap = headerMapFromHeaders_(getHeaders_(sheet));
    column = headerMap[header];
  }
  sheet.getRange(rowNumber, column).setValue(value);
}

function valuesFromColumn_(rows, header, fallback) {
  var values = rows.map(function (row) {
    return valueToString_(row[header]);
  }).filter(Boolean);

  return uniqueValues_(values.length ? values : fallback);
}

function buildMonthOptions_(rawValues) {
  var values = rawValues.length ? rawValues : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  return values.map(function (value) {
    var number = monthToNumber_(value);
    return {
      value: number,
      label: number ? pad2_(number) : valueToString_(value)
    };
  }).filter(function (month) {
    return month.value >= 1 && month.value <= 12;
  });
}

function buildYearOptions_(rawValues) {
  if (rawValues.length) return rawValues.map(valueToString_);
  var currentYear = Number(Utilities.formatDate(new Date(), APP_TIMEZONE, 'yyyy'));
  var years = [];
  for (var offset = 0; offset <= 6; offset += 1) {
    years.push(String(currentYear + offset));
  }
  return years;
}

function buildSearchKey_(row) {
  return [
    valueToString_(row[MASTER.NAME]),
    valueToString_(row[MASTER.NAME_AR]),
    valueToString_(row[MASTER.ITEM]),
    valueToString_(row[MASTER.FORM]),
    valueToString_(row[MASTER.FORM_AR])
  ].filter(Boolean).join(' | ').toLowerCase();
}

function isActiveExpiry_(row) {
  return valueToString_(row[EXPIRY.IS_ACTIVE]) !== EXPIRY_DELETED;
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
  return valueToString_(value);
}

function dateKeyFromValue_(value) {
  if (!value) return '';
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, APP_TIMEZONE, 'yyyy-MM-dd');
  }
  var text = valueToString_(value);
  var match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) return match[1] + '-' + match[2] + '-' + match[3];
  var parsed = new Date(text);
  if (!isNaN(parsed.getTime())) {
    return Utilities.formatDate(parsed, APP_TIMEZONE, 'yyyy-MM-dd');
  }
  return '';
}

function timestampMillis_(value) {
  if (!value) return 0;
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return value.getTime();
  }
  var text = valueToString_(value);
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
  var text = valueToString_(dateKey);
  var match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return 0;
  return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function expirySortDate_(month, year) {
  var date = new Date(Date.UTC(Number(year), Number(month), 0));
  return [
    date.getUTCFullYear(),
    pad2_(date.getUTCMonth() + 1),
    pad2_(date.getUTCDate())
  ].join('-');
}

function monthToNumber_(value) {
  var text = valueToString_(value);
  var numeric = Number(text);
  if (numeric >= 1 && numeric <= 12) return numeric;

  var normalized = text.replace(/\s+/g, '');
  var months = {
    يناير: 1,
    جانفي: 1,
    فبراير: 2,
    فيفري: 2,
    مارس: 3,
    ابريل: 4,
    أبريل: 4,
    افريل: 4,
    مايو: 5,
    ماي: 5,
    يونيو: 6,
    جوان: 6,
    يوليو: 7,
    جويلية: 7,
    اغسطس: 8,
    أغسطس: 8,
    اوت: 8,
    سبتمبر: 9,
    شتنبر: 9,
    اكتوبر: 10,
    أكتوبر: 10,
    نوفمبر: 11,
    دجنبر: 12,
    ديسمبر: 12
  };
  return months[normalized] || 0;
}

function uniqueValues_(values) {
  var seen = {};
  return values.filter(function (value) {
    var key = valueToString_(value);
    if (!key || seen[key]) return false;
    seen[key] = true;
    return true;
  });
}

function normalizeHeader_(value) {
  return valueToString_(value);
}

function valueToString_(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function pad2_(number) {
  return String(number).padStart(2, '0');
}
