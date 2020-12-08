(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash'), require('mithril'), require('mithril/stream'), require('jss'), require('@sdxmessaging/ui-widgets'), require('pusher-js'), require('js-sha256'), require('pdfjs-dist')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash', 'mithril', 'mithril/stream', 'jss', '@sdxmessaging/ui-widgets', 'pusher-js', 'js-sha256', 'pdfjs-dist'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.uiBuilder = {}, global._, global.m, global.m.stream, global.jss, global.uiWidgets, global.Pusher, global.sha256, global.pdfjsLib));
}(this, (function (exports, lodash, m, stream, jss, uiWidgets, Pusher, jsSha256, pdfjsDist) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var lodash__default = /*#__PURE__*/_interopDefaultLegacy(lodash);
  var m__default = /*#__PURE__*/_interopDefaultLegacy(m);
  var stream__default = /*#__PURE__*/_interopDefaultLegacy(stream);
  var jss__default = /*#__PURE__*/_interopDefaultLegacy(jss);
  var Pusher__default = /*#__PURE__*/_interopDefaultLegacy(Pusher);

  function toInteger(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }

    var number = Number(dirtyNumber);

    if (isNaN(number)) {
      return number;
    }

    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }

  function requiredArgs(required, args) {
    if (args.length < required) {
      throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
    }
  }

  /**
   * @name toDate
   * @category Common Helpers
   * @summary Convert the given argument to an instance of Date.
   *
   * @description
   * Convert the given argument to an instance of Date.
   *
   * If the argument is an instance of Date, the function returns its clone.
   *
   * If the argument is a number, it is treated as a timestamp.
   *
   * If the argument is none of the above, the function returns Invalid Date.
   *
   * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
   *
   * @param {Date|Number} argument - the value to convert
   * @returns {Date} the parsed date in the local time zone
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // Clone the date:
   * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
   * //=> Tue Feb 11 2014 11:30:30
   *
   * @example
   * // Convert the timestamp to date:
   * const result = toDate(1392098430000)
   * //=> Tue Feb 11 2014 11:30:30
   */

  function toDate(argument) {
    requiredArgs(1, arguments);
    var argStr = Object.prototype.toString.call(argument); // Clone the date

    if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
      // Prevent the date to lose the milliseconds when passed to new Date() in IE10
      return new Date(argument.getTime());
    } else if (typeof argument === 'number' || argStr === '[object Number]') {
      return new Date(argument);
    } else {
      if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

        console.warn(new Error().stack);
      }

      return new Date(NaN);
    }
  }

  /**
   * @name addDays
   * @category Day Helpers
   * @summary Add the specified number of days to the given date.
   *
   * @description
   * Add the specified number of days to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the days added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 10 days to 1 September 2014:
   * var result = addDays(new Date(2014, 8, 1), 10)
   * //=> Thu Sep 11 2014 00:00:00
   */

  function addDays(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var date = toDate(dirtyDate);
    var amount = toInteger(dirtyAmount);

    if (isNaN(amount)) {
      return new Date(NaN);
    }

    if (!amount) {
      // If 0 days, no-op to avoid changing times in the hour before end of DST
      return date;
    }

    date.setDate(date.getDate() + amount);
    return date;
  }

  /**
   * @name addMonths
   * @category Month Helpers
   * @summary Add the specified number of months to the given date.
   *
   * @description
   * Add the specified number of months to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of months to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the months added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 5 months to 1 September 2014:
   * var result = addMonths(new Date(2014, 8, 1), 5)
   * //=> Sun Feb 01 2015 00:00:00
   */

  function addMonths(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var date = toDate(dirtyDate);
    var amount = toInteger(dirtyAmount);

    if (isNaN(amount)) {
      return new Date(NaN);
    }

    if (!amount) {
      // If 0 months, no-op to avoid changing times in the hour before end of DST
      return date;
    }

    var dayOfMonth = date.getDate(); // The JS Date object supports date math by accepting out-of-bounds values for
    // month, day, etc. For example, new Date(2020, 1, 0) returns 31 Dec 2019 and
    // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
    // want except that dates will wrap around the end of a month, meaning that
    // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
    // we'll default to the end of the desired month by adding 1 to the desired
    // month and using a date of 0 to back up one day to the end of the desired
    // month.

    var endOfDesiredMonth = new Date(date.getTime());
    endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
    var daysInMonth = endOfDesiredMonth.getDate();

    if (dayOfMonth >= daysInMonth) {
      // If we're already at the end of the month, then this is the correct date
      // and we're done.
      return endOfDesiredMonth;
    } else {
      // Otherwise, we now know that setting the original day-of-month value won't
      // cause an overflow, so set the desired day-of-month. Note that we can't
      // just set the date of `endOfDesiredMonth` because that object may have had
      // its time changed in the unusual case where where a DST transition was on
      // the last day of the month and its local time was in the hour skipped or
      // repeated next to a DST transition.  So we use `date` instead which is
      // guaranteed to still have the original time.
      date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
      return date;
    }
  }

  /**
   * @name add
   * @category Common Helpers
   * @summary Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
   *
   * @description
   * Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Duration} duration - the object with years, months, weeks, days, hours, minutes and seconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   *
   * | Key            | Description                        |
   * |----------------|------------------------------------|
   * | years          | Amount of years to be added        |
   * | months         | Amount of months to be added       |
   * | weeks          | Amount of weeks to be added       |
   * | days           | Amount of days to be added         |
   * | hours          | Amount of hours to be added        |
   * | minutes        | Amount of minutes to be added      |
   * | seconds        | Amount of seconds to be added      |
   *
   * All values default to 0
   *
   * @returns {Date} the new date with the seconds added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add the following duration to 1 September 2014, 10:19:50
   * var result = add(new Date(2014, 8, 1, 10, 19, 50), {
   *   years: 2,
   *   months: 9,
   *   weeks: 1,
   *   days: 7,
   *   hours: 5,
   *   minutes: 9,
   *   seconds: 30,
   * })
   * //=> Thu Jun 15 2017 15:29:20
   */

  function add(dirtyDate, duration) {
    requiredArgs(2, arguments);
    if (!duration || typeof duration !== 'object') return new Date(NaN);
    var years = 'years' in duration ? toInteger(duration.years) : 0;
    var months = 'months' in duration ? toInteger(duration.months) : 0;
    var weeks = 'weeks' in duration ? toInteger(duration.weeks) : 0;
    var days = 'days' in duration ? toInteger(duration.days) : 0;
    var hours = 'hours' in duration ? toInteger(duration.hours) : 0;
    var minutes = 'minutes' in duration ? toInteger(duration.minutes) : 0;
    var seconds = 'seconds' in duration ? toInteger(duration.seconds) : 0; // Add years and months

    var date = toDate(dirtyDate);
    var dateWithMonths = months || years ? addMonths(date, months + years * 12) : date; // Add weeks and days

    var dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths; // Add days, hours, minutes and seconds

    var minutesToAdd = minutes + hours * 60;
    var secondsToAdd = seconds + minutesToAdd * 60;
    var msToAdd = secondsToAdd * 1000;
    var finalDate = new Date(dateWithDays.getTime() + msToAdd);
    return finalDate;
  }

  /**
   * @name addMilliseconds
   * @category Millisecond Helpers
   * @summary Add the specified number of milliseconds to the given date.
   *
   * @description
   * Add the specified number of milliseconds to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the milliseconds added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
   * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
   * //=> Thu Jul 10 2014 12:45:30.750
   */

  function addMilliseconds(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var timestamp = toDate(dirtyDate).getTime();
    var amount = toInteger(dirtyAmount);
    return new Date(timestamp + amount);
  }

  var MILLISECONDS_IN_MINUTE = 60000;

  function getDateMillisecondsPart(date) {
    return date.getTime() % MILLISECONDS_IN_MINUTE;
  }
  /**
   * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
   * They usually appear for dates that denote time before the timezones were introduced
   * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
   * and GMT+01:00:00 after that date)
   *
   * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
   * which would lead to incorrect calculations.
   *
   * This function returns the timezone offset in milliseconds that takes seconds in account.
   */


  function getTimezoneOffsetInMilliseconds(dirtyDate) {
    var date = new Date(dirtyDate.getTime());
    var baseTimezoneOffset = Math.ceil(date.getTimezoneOffset());
    date.setSeconds(0, 0);
    var hasNegativeUTCOffset = baseTimezoneOffset > 0;
    var millisecondsPartOfTimezoneOffset = hasNegativeUTCOffset ? (MILLISECONDS_IN_MINUTE + getDateMillisecondsPart(date)) % MILLISECONDS_IN_MINUTE : getDateMillisecondsPart(date);
    return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset;
  }

  /**
   * @name startOfDay
   * @category Day Helpers
   * @summary Return the start of a day for the given date.
   *
   * @description
   * Return the start of a day for the given date.
   * The result will be in the local timezone.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the original date
   * @returns {Date} the start of a day
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // The start of a day for 2 September 2014 11:55:00:
   * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Tue Sep 02 2014 00:00:00
   */

  function startOfDay(dirtyDate) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  /**
   * @name isValid
   * @category Common Helpers
   * @summary Is the given date valid?
   *
   * @description
   * Returns false if argument is Invalid Date and true otherwise.
   * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * Invalid Date is a Date, whose time value is NaN.
   *
   * Time value of Date: http://es5.github.io/#x15.9.1.1
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * - Now `isValid` doesn't throw an exception
   *   if the first argument is not an instance of Date.
   *   Instead, argument is converted beforehand using `toDate`.
   *
   *   Examples:
   *
   *   | `isValid` argument        | Before v2.0.0 | v2.0.0 onward |
   *   |---------------------------|---------------|---------------|
   *   | `new Date()`              | `true`        | `true`        |
   *   | `new Date('2016-01-01')`  | `true`        | `true`        |
   *   | `new Date('')`            | `false`       | `false`       |
   *   | `new Date(1488370835081)` | `true`        | `true`        |
   *   | `new Date(NaN)`           | `false`       | `false`       |
   *   | `'2016-01-01'`            | `TypeError`   | `false`       |
   *   | `''`                      | `TypeError`   | `false`       |
   *   | `1488370835081`           | `TypeError`   | `true`        |
   *   | `NaN`                     | `TypeError`   | `false`       |
   *
   *   We introduce this change to make *date-fns* consistent with ECMAScript behavior
   *   that try to coerce arguments to the expected type
   *   (which is also the case with other *date-fns* functions).
   *
   * @param {*} date - the date to check
   * @returns {Boolean} the date is valid
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // For the valid date:
   * var result = isValid(new Date(2014, 1, 31))
   * //=> true
   *
   * @example
   * // For the value, convertable into a date:
   * var result = isValid(1393804800000)
   * //=> true
   *
   * @example
   * // For the invalid date:
   * var result = isValid(new Date(''))
   * //=> false
   */

  function isValid(dirtyDate) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    return !isNaN(date);
  }

  /**
   * @name isSameDay
   * @category Day Helpers
   * @summary Are the given dates in the same day?
   *
   * @description
   * Are the given dates in the same day?
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the first date to check
   * @param {Date|Number} dateRight - the second date to check
   * @returns {Boolean} the dates are in the same day
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
   * var result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
   * //=> true
   */

  function isSameDay(dirtyDateLeft, dirtyDateRight) {
    requiredArgs(2, arguments);
    var dateLeftStartOfDay = startOfDay(dirtyDateLeft);
    var dateRightStartOfDay = startOfDay(dirtyDateRight);
    return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
  }

  var formatDistanceLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },
    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },
    halfAMinute: 'half a minute',
    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },
    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },
    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },
    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },
    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },
    aboutXWeeks: {
      one: 'about 1 week',
      other: 'about {{count}} weeks'
    },
    xWeeks: {
      one: '1 week',
      other: '{{count}} weeks'
    },
    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },
    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },
    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },
    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },
    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },
    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  };
  function formatDistance(token, count, options) {
    options = options || {};
    var result;

    if (typeof formatDistanceLocale[token] === 'string') {
      result = formatDistanceLocale[token];
    } else if (count === 1) {
      result = formatDistanceLocale[token].one;
    } else {
      result = formatDistanceLocale[token].other.replace('{{count}}', count);
    }

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result;
      } else {
        return result + ' ago';
      }
    }

    return result;
  }

  function buildFormatLongFn(args) {
    return function (dirtyOptions) {
      var options = dirtyOptions || {};
      var width = options.width ? String(options.width) : args.defaultWidth;
      var format = args.formats[width] || args.formats[args.defaultWidth];
      return format;
    };
  }

  var dateFormats = {
    full: 'EEEE, MMMM do, y',
    long: 'MMMM do, y',
    medium: 'MMM d, y',
    short: 'MM/dd/yyyy'
  };
  var timeFormats = {
    full: 'h:mm:ss a zzzz',
    long: 'h:mm:ss a z',
    medium: 'h:mm:ss a',
    short: 'h:mm a'
  };
  var dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: '{{date}}, {{time}}',
    short: '{{date}}, {{time}}'
  };
  var formatLong = {
    date: buildFormatLongFn({
      formats: dateFormats,
      defaultWidth: 'full'
    }),
    time: buildFormatLongFn({
      formats: timeFormats,
      defaultWidth: 'full'
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats,
      defaultWidth: 'full'
    })
  };

  var formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'P'
  };
  function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
  }

  function buildLocalizeFn(args) {
    return function (dirtyIndex, dirtyOptions) {
      var options = dirtyOptions || {};
      var context = options.context ? String(options.context) : 'standalone';
      var valuesArray;

      if (context === 'formatting' && args.formattingValues) {
        var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        var width = options.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        var _defaultWidth = args.defaultWidth;

        var _width = options.width ? String(options.width) : args.defaultWidth;

        valuesArray = args.values[_width] || args.values[_defaultWidth];
      }

      var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
      return valuesArray[index];
    };
  }

  var eraValues = {
    narrow: ['B', 'A'],
    abbreviated: ['BC', 'AD'],
    wide: ['Before Christ', 'Anno Domini']
  };
  var quarterValues = {
    narrow: ['1', '2', '3', '4'],
    abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
    wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'] // Note: in English, the names of days of the week and months are capitalized.
    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
    // Generally, formatted dates should look like they are in the middle of a sentence,
    // e.g. in Spanish language the weekdays and months should be in the lowercase.

  };
  var monthValues = {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };
  var dayValues = {
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  };
  var dayPeriodValues = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    }
  };
  var formattingDayPeriodValues = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    }
  };

  function ordinalNumber(dirtyNumber, _dirtyOptions) {
    var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
    // if they are different for different grammatical genders,
    // use `options.unit`:
    //
    //   var options = dirtyOptions || {}
    //   var unit = String(options.unit)
    //
    // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
    // 'day', 'hour', 'minute', 'second'

    var rem100 = number % 100;

    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + 'st';

        case 2:
          return number + 'nd';

        case 3:
          return number + 'rd';
      }
    }

    return number + 'th';
  }

  var localize = {
    ordinalNumber: ordinalNumber,
    era: buildLocalizeFn({
      values: eraValues,
      defaultWidth: 'wide'
    }),
    quarter: buildLocalizeFn({
      values: quarterValues,
      defaultWidth: 'wide',
      argumentCallback: function (quarter) {
        return Number(quarter) - 1;
      }
    }),
    month: buildLocalizeFn({
      values: monthValues,
      defaultWidth: 'wide'
    }),
    day: buildLocalizeFn({
      values: dayValues,
      defaultWidth: 'wide'
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues,
      defaultWidth: 'wide',
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: 'wide'
    })
  };

  function buildMatchPatternFn(args) {
    return function (dirtyString, dirtyOptions) {
      var string = String(dirtyString);
      var options = dirtyOptions || {};
      var matchResult = string.match(args.matchPattern);

      if (!matchResult) {
        return null;
      }

      var matchedString = matchResult[0];
      var parseResult = string.match(args.parsePattern);

      if (!parseResult) {
        return null;
      }

      var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      return {
        value: value,
        rest: string.slice(matchedString.length)
      };
    };
  }

  function buildMatchFn(args) {
    return function (dirtyString, dirtyOptions) {
      var string = String(dirtyString);
      var options = dirtyOptions || {};
      var width = options.width;
      var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      var matchResult = string.match(matchPattern);

      if (!matchResult) {
        return null;
      }

      var matchedString = matchResult[0];
      var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      var value;

      if (Object.prototype.toString.call(parsePatterns) === '[object Array]') {
        value = findIndex(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        });
      } else {
        value = findKey(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        });
      }

      value = args.valueCallback ? args.valueCallback(value) : value;
      value = options.valueCallback ? options.valueCallback(value) : value;
      return {
        value: value,
        rest: string.slice(matchedString.length)
      };
    };
  }

  function findKey(object, predicate) {
    for (var key in object) {
      if (object.hasOwnProperty(key) && predicate(object[key])) {
        return key;
      }
    }
  }

  function findIndex(array, predicate) {
    for (var key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
  }

  var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  var parseOrdinalNumberPattern = /\d+/i;
  var matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  var parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  };
  var matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  var parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  var matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  var parseMonthPatterns = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  };
  var matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  var parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  var matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  var parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  var match = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: function (value) {
        return parseInt(value, 10);
      }
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseEraPatterns,
      defaultParseWidth: 'any'
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: 'any',
      valueCallback: function (index) {
        return index + 1;
      }
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: 'any'
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseDayPatterns,
      defaultParseWidth: 'any'
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: 'any',
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: 'any'
    })
  };

  /**
   * @type {Locale}
   * @category Locales
   * @summary English locale (United States).
   * @language English
   * @iso-639-2 eng
   * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
   * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
   */

  var locale = {
    code: 'en-US',
    formatDistance: formatDistance,
    formatLong: formatLong,
    formatRelative: formatRelative,
    localize: localize,
    match: match,
    options: {
      weekStartsOn: 0
      /* Sunday */
      ,
      firstWeekContainsDate: 1
    }
  };

  /**
   * @name subMilliseconds
   * @category Millisecond Helpers
   * @summary Subtract the specified number of milliseconds from the given date.
   *
   * @description
   * Subtract the specified number of milliseconds from the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the milliseconds subtracted
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
   * var result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
   * //=> Thu Jul 10 2014 12:45:29.250
   */

  function subMilliseconds(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var amount = toInteger(dirtyAmount);
    return addMilliseconds(dirtyDate, -amount);
  }

  function addLeadingZeros(number, targetLength) {
    var sign = number < 0 ? '-' : '';
    var output = Math.abs(number).toString();

    while (output.length < targetLength) {
      output = '0' + output;
    }

    return sign + output;
  }

  /*
   * |     | Unit                           |     | Unit                           |
   * |-----|--------------------------------|-----|--------------------------------|
   * |  a  | AM, PM                         |  A* |                                |
   * |  d  | Day of month                   |  D  |                                |
   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
   * |  m  | Minute                         |  M  | Month                          |
   * |  s  | Second                         |  S  | Fraction of second             |
   * |  y  | Year (abs)                     |  Y  |                                |
   *
   * Letters marked by * are not implemented but reserved by Unicode standard.
   */

  var formatters = {
    // Year
    y: function (date, token) {
      // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
      // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
      // |----------|-------|----|-------|-------|-------|
      // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
      // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
      // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
      // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
      // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
      var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return addLeadingZeros(token === 'yy' ? year % 100 : year, token.length);
    },
    // Month
    M: function (date, token) {
      var month = date.getUTCMonth();
      return token === 'M' ? String(month + 1) : addLeadingZeros(month + 1, 2);
    },
    // Day of the month
    d: function (date, token) {
      return addLeadingZeros(date.getUTCDate(), token.length);
    },
    // AM or PM
    a: function (date, token) {
      var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';

      switch (token) {
        case 'a':
        case 'aa':
        case 'aaa':
          return dayPeriodEnumValue.toUpperCase();

        case 'aaaaa':
          return dayPeriodEnumValue[0];

        case 'aaaa':
        default:
          return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
      }
    },
    // Hour [1-12]
    h: function (date, token) {
      return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
    },
    // Hour [0-23]
    H: function (date, token) {
      return addLeadingZeros(date.getUTCHours(), token.length);
    },
    // Minute
    m: function (date, token) {
      return addLeadingZeros(date.getUTCMinutes(), token.length);
    },
    // Second
    s: function (date, token) {
      return addLeadingZeros(date.getUTCSeconds(), token.length);
    },
    // Fraction of second
    S: function (date, token) {
      var numberOfDigits = token.length;
      var milliseconds = date.getUTCMilliseconds();
      var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
      return addLeadingZeros(fractionalSeconds, token.length);
    }
  };

  var MILLISECONDS_IN_DAY = 86400000; // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376

  function getUTCDayOfYear(dirtyDate) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var timestamp = date.getTime();
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
    var startOfYearTimestamp = date.getTime();
    var difference = timestamp - startOfYearTimestamp;
    return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
  }

  // See issue: https://github.com/date-fns/date-fns/issues/376

  function startOfUTCISOWeek(dirtyDate) {
    requiredArgs(1, arguments);
    var weekStartsOn = 1;
    var date = toDate(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  // See issue: https://github.com/date-fns/date-fns/issues/376

  function getUTCISOWeekYear(dirtyDate) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var year = date.getUTCFullYear();
    var fourthOfJanuaryOfNextYear = new Date(0);
    fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
    var fourthOfJanuaryOfThisYear = new Date(0);
    fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);

    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }

  // See issue: https://github.com/date-fns/date-fns/issues/376

  function startOfUTCISOWeekYear(dirtyDate) {
    requiredArgs(1, arguments);
    var year = getUTCISOWeekYear(dirtyDate);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(year, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    var date = startOfUTCISOWeek(fourthOfJanuary);
    return date;
  }

  var MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376

  function getUTCISOWeek(dirtyDate) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime(); // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)

    return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
  }

  // See issue: https://github.com/date-fns/date-fns/issues/376

  function startOfUTCWeek(dirtyDate, dirtyOptions) {
    requiredArgs(1, arguments);
    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }

    var date = toDate(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  // See issue: https://github.com/date-fns/date-fns/issues/376

  function getUTCWeekYear(dirtyDate, dirtyOptions) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate, dirtyOptions);
    var year = date.getUTCFullYear();
    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
    }

    var firstWeekOfNextYear = new Date(0);
    firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, dirtyOptions);
    var firstWeekOfThisYear = new Date(0);
    firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, dirtyOptions);

    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }

  // See issue: https://github.com/date-fns/date-fns/issues/376

  function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
    requiredArgs(1, arguments);
    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
    var year = getUTCWeekYear(dirtyDate, dirtyOptions);
    var firstWeek = new Date(0);
    firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setUTCHours(0, 0, 0, 0);
    var date = startOfUTCWeek(firstWeek, dirtyOptions);
    return date;
  }

  var MILLISECONDS_IN_WEEK$1 = 604800000; // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376

  function getUTCWeek(dirtyDate, options) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime(); // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)

    return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
  }

  var dayPeriodEnum = {
    am: 'am',
    pm: 'pm',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
    /*
     * |     | Unit                           |     | Unit                           |
     * |-----|--------------------------------|-----|--------------------------------|
     * |  a  | AM, PM                         |  A* | Milliseconds in day            |
     * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
     * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
     * |  d  | Day of month                   |  D  | Day of year                    |
     * |  e  | Local day of week              |  E  | Day of week                    |
     * |  f  |                                |  F* | Day of week in month           |
     * |  g* | Modified Julian day            |  G  | Era                            |
     * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
     * |  i! | ISO day of week                |  I! | ISO week of year               |
     * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
     * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
     * |  l* | (deprecated)                   |  L  | Stand-alone month              |
     * |  m  | Minute                         |  M  | Month                          |
     * |  n  |                                |  N  |                                |
     * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
     * |  p! | Long localized time            |  P! | Long localized date            |
     * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
     * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
     * |  s  | Second                         |  S  | Fraction of second             |
     * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
     * |  u  | Extended year                  |  U* | Cyclic year                    |
     * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
     * |  w  | Local week of year             |  W* | Week of month                  |
     * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
     * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
     * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
     *
     * Letters marked by * are not implemented but reserved by Unicode standard.
     *
     * Letters marked by ! are non-standard, but implemented by date-fns:
     * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
     * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
     *   i.e. 7 for Sunday, 1 for Monday, etc.
     * - `I` is ISO week of year, as opposed to `w` which is local week of year.
     * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
     *   `R` is supposed to be used in conjunction with `I` and `i`
     *   for universal ISO week-numbering date, whereas
     *   `Y` is supposed to be used in conjunction with `w` and `e`
     *   for week-numbering date specific to the locale.
     * - `P` is long localized date format
     * - `p` is long localized time format
     */

  };
  var formatters$1 = {
    // Era
    G: function (date, token, localize) {
      var era = date.getUTCFullYear() > 0 ? 1 : 0;

      switch (token) {
        // AD, BC
        case 'G':
        case 'GG':
        case 'GGG':
          return localize.era(era, {
            width: 'abbreviated'
          });
        // A, B

        case 'GGGGG':
          return localize.era(era, {
            width: 'narrow'
          });
        // Anno Domini, Before Christ

        case 'GGGG':
        default:
          return localize.era(era, {
            width: 'wide'
          });
      }
    },
    // Year
    y: function (date, token, localize) {
      // Ordinal number
      if (token === 'yo') {
        var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return localize.ordinalNumber(year, {
          unit: 'year'
        });
      }

      return formatters.y(date, token);
    },
    // Local week-numbering year
    Y: function (date, token, localize, options) {
      var signedWeekYear = getUTCWeekYear(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)

      var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year

      if (token === 'YY') {
        var twoDigitYear = weekYear % 100;
        return addLeadingZeros(twoDigitYear, 2);
      } // Ordinal number


      if (token === 'Yo') {
        return localize.ordinalNumber(weekYear, {
          unit: 'year'
        });
      } // Padding


      return addLeadingZeros(weekYear, token.length);
    },
    // ISO week-numbering year
    R: function (date, token) {
      var isoWeekYear = getUTCISOWeekYear(date); // Padding

      return addLeadingZeros(isoWeekYear, token.length);
    },
    // Extended year. This is a single number designating the year of this calendar system.
    // The main difference between `y` and `u` localizers are B.C. years:
    // | Year | `y` | `u` |
    // |------|-----|-----|
    // | AC 1 |   1 |   1 |
    // | BC 1 |   1 |   0 |
    // | BC 2 |   2 |  -1 |
    // Also `yy` always returns the last two digits of a year,
    // while `uu` pads single digit years to 2 characters and returns other years unchanged.
    u: function (date, token) {
      var year = date.getUTCFullYear();
      return addLeadingZeros(year, token.length);
    },
    // Quarter
    Q: function (date, token, localize) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

      switch (token) {
        // 1, 2, 3, 4
        case 'Q':
          return String(quarter);
        // 01, 02, 03, 04

        case 'QQ':
          return addLeadingZeros(quarter, 2);
        // 1st, 2nd, 3rd, 4th

        case 'Qo':
          return localize.ordinalNumber(quarter, {
            unit: 'quarter'
          });
        // Q1, Q2, Q3, Q4

        case 'QQQ':
          return localize.quarter(quarter, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)

        case 'QQQQQ':
          return localize.quarter(quarter, {
            width: 'narrow',
            context: 'formatting'
          });
        // 1st quarter, 2nd quarter, ...

        case 'QQQQ':
        default:
          return localize.quarter(quarter, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Stand-alone quarter
    q: function (date, token, localize) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

      switch (token) {
        // 1, 2, 3, 4
        case 'q':
          return String(quarter);
        // 01, 02, 03, 04

        case 'qq':
          return addLeadingZeros(quarter, 2);
        // 1st, 2nd, 3rd, 4th

        case 'qo':
          return localize.ordinalNumber(quarter, {
            unit: 'quarter'
          });
        // Q1, Q2, Q3, Q4

        case 'qqq':
          return localize.quarter(quarter, {
            width: 'abbreviated',
            context: 'standalone'
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)

        case 'qqqqq':
          return localize.quarter(quarter, {
            width: 'narrow',
            context: 'standalone'
          });
        // 1st quarter, 2nd quarter, ...

        case 'qqqq':
        default:
          return localize.quarter(quarter, {
            width: 'wide',
            context: 'standalone'
          });
      }
    },
    // Month
    M: function (date, token, localize) {
      var month = date.getUTCMonth();

      switch (token) {
        case 'M':
        case 'MM':
          return formatters.M(date, token);
        // 1st, 2nd, ..., 12th

        case 'Mo':
          return localize.ordinalNumber(month + 1, {
            unit: 'month'
          });
        // Jan, Feb, ..., Dec

        case 'MMM':
          return localize.month(month, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // J, F, ..., D

        case 'MMMMM':
          return localize.month(month, {
            width: 'narrow',
            context: 'formatting'
          });
        // January, February, ..., December

        case 'MMMM':
        default:
          return localize.month(month, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Stand-alone month
    L: function (date, token, localize) {
      var month = date.getUTCMonth();

      switch (token) {
        // 1, 2, ..., 12
        case 'L':
          return String(month + 1);
        // 01, 02, ..., 12

        case 'LL':
          return addLeadingZeros(month + 1, 2);
        // 1st, 2nd, ..., 12th

        case 'Lo':
          return localize.ordinalNumber(month + 1, {
            unit: 'month'
          });
        // Jan, Feb, ..., Dec

        case 'LLL':
          return localize.month(month, {
            width: 'abbreviated',
            context: 'standalone'
          });
        // J, F, ..., D

        case 'LLLLL':
          return localize.month(month, {
            width: 'narrow',
            context: 'standalone'
          });
        // January, February, ..., December

        case 'LLLL':
        default:
          return localize.month(month, {
            width: 'wide',
            context: 'standalone'
          });
      }
    },
    // Local week of year
    w: function (date, token, localize, options) {
      var week = getUTCWeek(date, options);

      if (token === 'wo') {
        return localize.ordinalNumber(week, {
          unit: 'week'
        });
      }

      return addLeadingZeros(week, token.length);
    },
    // ISO week of year
    I: function (date, token, localize) {
      var isoWeek = getUTCISOWeek(date);

      if (token === 'Io') {
        return localize.ordinalNumber(isoWeek, {
          unit: 'week'
        });
      }

      return addLeadingZeros(isoWeek, token.length);
    },
    // Day of the month
    d: function (date, token, localize) {
      if (token === 'do') {
        return localize.ordinalNumber(date.getUTCDate(), {
          unit: 'date'
        });
      }

      return formatters.d(date, token);
    },
    // Day of year
    D: function (date, token, localize) {
      var dayOfYear = getUTCDayOfYear(date);

      if (token === 'Do') {
        return localize.ordinalNumber(dayOfYear, {
          unit: 'dayOfYear'
        });
      }

      return addLeadingZeros(dayOfYear, token.length);
    },
    // Day of week
    E: function (date, token, localize) {
      var dayOfWeek = date.getUTCDay();

      switch (token) {
        // Tue
        case 'E':
        case 'EE':
        case 'EEE':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // T

        case 'EEEEE':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu

        case 'EEEEEE':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting'
          });
        // Tuesday

        case 'EEEE':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Local day of week
    e: function (date, token, localize, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

      switch (token) {
        // Numerical value (Nth day of week with current locale or weekStartsOn)
        case 'e':
          return String(localDayOfWeek);
        // Padded numerical value

        case 'ee':
          return addLeadingZeros(localDayOfWeek, 2);
        // 1st, 2nd, ..., 7th

        case 'eo':
          return localize.ordinalNumber(localDayOfWeek, {
            unit: 'day'
          });

        case 'eee':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // T

        case 'eeeee':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu

        case 'eeeeee':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting'
          });
        // Tuesday

        case 'eeee':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Stand-alone local day of week
    c: function (date, token, localize, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

      switch (token) {
        // Numerical value (same as in `e`)
        case 'c':
          return String(localDayOfWeek);
        // Padded numerical value

        case 'cc':
          return addLeadingZeros(localDayOfWeek, token.length);
        // 1st, 2nd, ..., 7th

        case 'co':
          return localize.ordinalNumber(localDayOfWeek, {
            unit: 'day'
          });

        case 'ccc':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'standalone'
          });
        // T

        case 'ccccc':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'standalone'
          });
        // Tu

        case 'cccccc':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'standalone'
          });
        // Tuesday

        case 'cccc':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'standalone'
          });
      }
    },
    // ISO day of week
    i: function (date, token, localize) {
      var dayOfWeek = date.getUTCDay();
      var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

      switch (token) {
        // 2
        case 'i':
          return String(isoDayOfWeek);
        // 02

        case 'ii':
          return addLeadingZeros(isoDayOfWeek, token.length);
        // 2nd

        case 'io':
          return localize.ordinalNumber(isoDayOfWeek, {
            unit: 'day'
          });
        // Tue

        case 'iii':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // T

        case 'iiiii':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu

        case 'iiiiii':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting'
          });
        // Tuesday

        case 'iiii':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // AM or PM
    a: function (date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';

      switch (token) {
        case 'a':
        case 'aa':
        case 'aaa':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          });

        case 'aaaaa':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'aaaa':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // AM, PM, midnight, noon
    b: function (date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;

      if (hours === 12) {
        dayPeriodEnumValue = dayPeriodEnum.noon;
      } else if (hours === 0) {
        dayPeriodEnumValue = dayPeriodEnum.midnight;
      } else {
        dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
      }

      switch (token) {
        case 'b':
        case 'bb':
        case 'bbb':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          });

        case 'bbbbb':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'bbbb':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // in the morning, in the afternoon, in the evening, at night
    B: function (date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;

      if (hours >= 17) {
        dayPeriodEnumValue = dayPeriodEnum.evening;
      } else if (hours >= 12) {
        dayPeriodEnumValue = dayPeriodEnum.afternoon;
      } else if (hours >= 4) {
        dayPeriodEnumValue = dayPeriodEnum.morning;
      } else {
        dayPeriodEnumValue = dayPeriodEnum.night;
      }

      switch (token) {
        case 'B':
        case 'BB':
        case 'BBB':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          });

        case 'BBBBB':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'BBBB':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Hour [1-12]
    h: function (date, token, localize) {
      if (token === 'ho') {
        var hours = date.getUTCHours() % 12;
        if (hours === 0) hours = 12;
        return localize.ordinalNumber(hours, {
          unit: 'hour'
        });
      }

      return formatters.h(date, token);
    },
    // Hour [0-23]
    H: function (date, token, localize) {
      if (token === 'Ho') {
        return localize.ordinalNumber(date.getUTCHours(), {
          unit: 'hour'
        });
      }

      return formatters.H(date, token);
    },
    // Hour [0-11]
    K: function (date, token, localize) {
      var hours = date.getUTCHours() % 12;

      if (token === 'Ko') {
        return localize.ordinalNumber(hours, {
          unit: 'hour'
        });
      }

      return addLeadingZeros(hours, token.length);
    },
    // Hour [1-24]
    k: function (date, token, localize) {
      var hours = date.getUTCHours();
      if (hours === 0) hours = 24;

      if (token === 'ko') {
        return localize.ordinalNumber(hours, {
          unit: 'hour'
        });
      }

      return addLeadingZeros(hours, token.length);
    },
    // Minute
    m: function (date, token, localize) {
      if (token === 'mo') {
        return localize.ordinalNumber(date.getUTCMinutes(), {
          unit: 'minute'
        });
      }

      return formatters.m(date, token);
    },
    // Second
    s: function (date, token, localize) {
      if (token === 'so') {
        return localize.ordinalNumber(date.getUTCSeconds(), {
          unit: 'second'
        });
      }

      return formatters.s(date, token);
    },
    // Fraction of second
    S: function (date, token) {
      return formatters.S(date, token);
    },
    // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
    X: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();

      if (timezoneOffset === 0) {
        return 'Z';
      }

      switch (token) {
        // Hours and optional minutes
        case 'X':
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        // Hours, minutes and optional seconds without `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `XX`

        case 'XXXX':
        case 'XX':
          // Hours and minutes without `:` delimiter
          return formatTimezone(timezoneOffset);
        // Hours, minutes and optional seconds with `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `XXX`

        case 'XXXXX':
        case 'XXX': // Hours and minutes with `:` delimiter

        default:
          return formatTimezone(timezoneOffset, ':');
      }
    },
    // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
    x: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();

      switch (token) {
        // Hours and optional minutes
        case 'x':
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        // Hours, minutes and optional seconds without `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `xx`

        case 'xxxx':
        case 'xx':
          // Hours and minutes without `:` delimiter
          return formatTimezone(timezoneOffset);
        // Hours, minutes and optional seconds with `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `xxx`

        case 'xxxxx':
        case 'xxx': // Hours and minutes with `:` delimiter

        default:
          return formatTimezone(timezoneOffset, ':');
      }
    },
    // Timezone (GMT)
    O: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();

      switch (token) {
        // Short
        case 'O':
        case 'OO':
        case 'OOO':
          return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
        // Long

        case 'OOOO':
        default:
          return 'GMT' + formatTimezone(timezoneOffset, ':');
      }
    },
    // Timezone (specific non-location)
    z: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();

      switch (token) {
        // Short
        case 'z':
        case 'zz':
        case 'zzz':
          return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
        // Long

        case 'zzzz':
        default:
          return 'GMT' + formatTimezone(timezoneOffset, ':');
      }
    },
    // Seconds timestamp
    t: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = Math.floor(originalDate.getTime() / 1000);
      return addLeadingZeros(timestamp, token.length);
    },
    // Milliseconds timestamp
    T: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = originalDate.getTime();
      return addLeadingZeros(timestamp, token.length);
    }
  };

  function formatTimezoneShort(offset, dirtyDelimiter) {
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;

    if (minutes === 0) {
      return sign + String(hours);
    }

    var delimiter = dirtyDelimiter || '';
    return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
  }

  function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
    if (offset % 60 === 0) {
      var sign = offset > 0 ? '-' : '+';
      return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
    }

    return formatTimezone(offset, dirtyDelimiter);
  }

  function formatTimezone(offset, dirtyDelimiter) {
    var delimiter = dirtyDelimiter || '';
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
    var minutes = addLeadingZeros(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
  }

  function dateLongFormatter(pattern, formatLong) {
    switch (pattern) {
      case 'P':
        return formatLong.date({
          width: 'short'
        });

      case 'PP':
        return formatLong.date({
          width: 'medium'
        });

      case 'PPP':
        return formatLong.date({
          width: 'long'
        });

      case 'PPPP':
      default:
        return formatLong.date({
          width: 'full'
        });
    }
  }

  function timeLongFormatter(pattern, formatLong) {
    switch (pattern) {
      case 'p':
        return formatLong.time({
          width: 'short'
        });

      case 'pp':
        return formatLong.time({
          width: 'medium'
        });

      case 'ppp':
        return formatLong.time({
          width: 'long'
        });

      case 'pppp':
      default:
        return formatLong.time({
          width: 'full'
        });
    }
  }

  function dateTimeLongFormatter(pattern, formatLong) {
    var matchResult = pattern.match(/(P+)(p+)?/);
    var datePattern = matchResult[1];
    var timePattern = matchResult[2];

    if (!timePattern) {
      return dateLongFormatter(pattern, formatLong);
    }

    var dateTimeFormat;

    switch (datePattern) {
      case 'P':
        dateTimeFormat = formatLong.dateTime({
          width: 'short'
        });
        break;

      case 'PP':
        dateTimeFormat = formatLong.dateTime({
          width: 'medium'
        });
        break;

      case 'PPP':
        dateTimeFormat = formatLong.dateTime({
          width: 'long'
        });
        break;

      case 'PPPP':
      default:
        dateTimeFormat = formatLong.dateTime({
          width: 'full'
        });
        break;
    }

    return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
  }

  var longFormatters = {
    p: timeLongFormatter,
    P: dateTimeLongFormatter
  };

  var protectedDayOfYearTokens = ['D', 'DD'];
  var protectedWeekYearTokens = ['YY', 'YYYY'];
  function isProtectedDayOfYearToken(token) {
    return protectedDayOfYearTokens.indexOf(token) !== -1;
  }
  function isProtectedWeekYearToken(token) {
    return protectedWeekYearTokens.indexOf(token) !== -1;
  }
  function throwProtectedError(token, format, input) {
    if (token === 'YYYY') {
      throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
    } else if (token === 'YY') {
      throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
    } else if (token === 'D') {
      throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
    } else if (token === 'DD') {
      throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
    }
  }

  // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
  //   (one of the certain letters followed by `o`)
  // - (\w)\1* matches any sequences of the same letter
  // - '' matches two quote characters in a row
  // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
  //   except a single quote symbol, which ends the sequence.
  //   Two quote characters do not end the sequence.
  //   If there is no matching single quote
  //   then the sequence will continue until the end of the string.
  // - . matches any single character unmatched by previous parts of the RegExps

  var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
  // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

  var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
  var escapedStringRegExp = /^'([^]*?)'?$/;
  var doubleQuoteRegExp = /''/g;
  var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
  /**
   * @name format
   * @category Common Helpers
   * @summary Format the date.
   *
   * @description
   * Return the formatted date string in the given format. The result may vary by locale.
   *
   * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
   * > See: https://git.io/fxCyr
   *
   * The characters wrapped between two single quotes characters (') are escaped.
   * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
   * (see the last example)
   *
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   * with a few additions (see note 7 below the table).
   *
   * Accepted patterns:
   * | Unit                            | Pattern | Result examples                   | Notes |
   * |---------------------------------|---------|-----------------------------------|-------|
   * | Era                             | G..GGG  | AD, BC                            |       |
   * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
   * |                                 | GGGGG   | A, B                              |       |
   * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
   * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
   * |                                 | yy      | 44, 01, 00, 17                    | 5     |
   * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
   * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
   * |                                 | yyyyy   | ...                               | 3,5   |
   * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
   * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
   * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
   * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
   * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
   * |                                 | YYYYY   | ...                               | 3,5   |
   * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
   * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
   * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
   * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
   * |                                 | RRRRR   | ...                               | 3,5,7 |
   * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
   * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
   * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
   * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
   * |                                 | uuuuu   | ...                               | 3,5   |
   * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
   * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
   * |                                 | QQ      | 01, 02, 03, 04                    |       |
   * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
   * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
   * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
   * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
   * |                                 | qq      | 01, 02, 03, 04                    |       |
   * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
   * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
   * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
   * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
   * |                                 | MM      | 01, 02, ..., 12                   |       |
   * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
   * |                                 | MMMM    | January, February, ..., December  | 2     |
   * |                                 | MMMMM   | J, F, ..., D                      |       |
   * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
   * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
   * |                                 | LL      | 01, 02, ..., 12                   |       |
   * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
   * |                                 | LLLL    | January, February, ..., December  | 2     |
   * |                                 | LLLLL   | J, F, ..., D                      |       |
   * | Local week of year              | w       | 1, 2, ..., 53                     |       |
   * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
   * |                                 | ww      | 01, 02, ..., 53                   |       |
   * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
   * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
   * |                                 | II      | 01, 02, ..., 53                   | 7     |
   * | Day of month                    | d       | 1, 2, ..., 31                     |       |
   * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
   * |                                 | dd      | 01, 02, ..., 31                   |       |
   * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
   * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
   * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
   * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
   * |                                 | DDDD    | ...                               | 3     |
   * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
   * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
   * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
   * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
   * |                                 | ii      | 01, 02, ..., 07                   | 7     |
   * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
   * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
   * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
   * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 7     |
   * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
   * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
   * |                                 | ee      | 02, 03, ..., 01                   |       |
   * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
   * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
   * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
   * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
   * |                                 | cc      | 02, 03, ..., 01                   |       |
   * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
   * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
   * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | AM, PM                          | a..aaa  | AM, PM                            |       |
   * |                                 | aaaa    | a.m., p.m.                        | 2     |
   * |                                 | aaaaa   | a, p                              |       |
   * | AM, PM, noon, midnight          | b..bbb  | AM, PM, noon, midnight            |       |
   * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
   * |                                 | bbbbb   | a, p, n, mi                       |       |
   * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
   * |                                 | BBBB    | at night, in the morning, ...     | 2     |
   * |                                 | BBBBB   | at night, in the morning, ...     |       |
   * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
   * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
   * |                                 | hh      | 01, 02, ..., 11, 12               |       |
   * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
   * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
   * |                                 | HH      | 00, 01, 02, ..., 23               |       |
   * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
   * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
   * |                                 | KK      | 01, 02, ..., 11, 00               |       |
   * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
   * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
   * |                                 | kk      | 24, 01, 02, ..., 23               |       |
   * | Minute                          | m       | 0, 1, ..., 59                     |       |
   * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
   * |                                 | mm      | 00, 01, ..., 59                   |       |
   * | Second                          | s       | 0, 1, ..., 59                     |       |
   * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
   * |                                 | ss      | 00, 01, ..., 59                   |       |
   * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
   * |                                 | SS      | 00, 01, ..., 99                   |       |
   * |                                 | SSS     | 000, 0001, ..., 999               |       |
   * |                                 | SSSS    | ...                               | 3     |
   * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
   * |                                 | XX      | -0800, +0530, Z                   |       |
   * |                                 | XXX     | -08:00, +05:30, Z                 |       |
   * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
   * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
   * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
   * |                                 | xx      | -0800, +0530, +0000               |       |
   * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
   * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
   * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
   * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
   * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
   * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
   * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
   * | Seconds timestamp               | t       | 512969520                         | 7     |
   * |                                 | tt      | ...                               | 3,7   |
   * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
   * |                                 | TT      | ...                               | 3,7   |
   * | Long localized date             | P       | 05/29/1453                        | 7     |
   * |                                 | PP      | May 29, 1453                      | 7     |
   * |                                 | PPP     | May 29th, 1453                    | 7     |
   * |                                 | PPPP    | Sunday, May 29th, 1453            | 2,7   |
   * | Long localized time             | p       | 12:00 AM                          | 7     |
   * |                                 | pp      | 12:00:00 AM                       | 7     |
   * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
   * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
   * | Combination of date and time    | Pp      | 05/29/1453, 12:00 AM              | 7     |
   * |                                 | PPpp    | May 29, 1453, 12:00:00 AM         | 7     |
   * |                                 | PPPppp  | May 29th, 1453 at ...             | 7     |
   * |                                 | PPPPpppp| Sunday, May 29th, 1453 at ...     | 2,7   |
   * Notes:
   * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
   *    are the same as "stand-alone" units, but are different in some languages.
   *    "Formatting" units are declined according to the rules of the language
   *    in the context of a date. "Stand-alone" units are always nominative singular:
   *
   *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
   *
   *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
   *
   * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
   *    the single quote characters (see below).
   *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
   *    the output will be the same as default pattern for this unit, usually
   *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
   *    are marked with "2" in the last column of the table.
   *
   *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
   *
   * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
   *    The output will be padded with zeros to match the length of the pattern.
   *
   *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
   *
   * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
   *    These tokens represent the shortest form of the quarter.
   *
   * 5. The main difference between `y` and `u` patterns are B.C. years:
   *
   *    | Year | `y` | `u` |
   *    |------|-----|-----|
   *    | AC 1 |   1 |   1 |
   *    | BC 1 |   1 |   0 |
   *    | BC 2 |   2 |  -1 |
   *
   *    Also `yy` always returns the last two digits of a year,
   *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
   *
   *    | Year | `yy` | `uu` |
   *    |------|------|------|
   *    | 1    |   01 |   01 |
   *    | 14   |   14 |   14 |
   *    | 376  |   76 |  376 |
   *    | 1453 |   53 | 1453 |
   *
   *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
   *    except local week-numbering years are dependent on `options.weekStartsOn`
   *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
   *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
   *
   * 6. Specific non-location timezones are currently unavailable in `date-fns`,
   *    so right now these tokens fall back to GMT timezones.
   *
   * 7. These patterns are not in the Unicode Technical Standard #35:
   *    - `i`: ISO day of week
   *    - `I`: ISO week of year
   *    - `R`: ISO week-numbering year
   *    - `t`: seconds timestamp
   *    - `T`: milliseconds timestamp
   *    - `o`: ordinal number modifier
   *    - `P`: long localized date
   *    - `p`: long localized time
   *
   * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
   *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
   *
   * 9. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
   *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * - The second argument is now required for the sake of explicitness.
   *
   *   ```javascript
   *   // Before v2.0.0
   *   format(new Date(2016, 0, 1))
   *
   *   // v2.0.0 onward
   *   format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
   *   ```
   *
   * - New format string API for `format` function
   *   which is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
   *   See [this post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg) for more details.
   *
   * - Characters are now escaped using single quote symbols (`'`) instead of square brackets.
   *
   * @param {Date|Number} date - the original date
   * @param {String} format - the string of tokens
   * @param {Object} [options] - an object with options.
   * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
   * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
   * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
   * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
   *   see: https://git.io/fxCyr
   * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
   *   see: https://git.io/fxCyr
   * @returns {String} the formatted date string
   * @throws {TypeError} 2 arguments required
   * @throws {RangeError} `date` must not be Invalid Date
   * @throws {RangeError} `options.locale` must contain `localize` property
   * @throws {RangeError} `options.locale` must contain `formatLong` property
   * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
   * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
   * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
   * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
   * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
   * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
   * @throws {RangeError} format string contains an unescaped latin alphabet character
   *
   * @example
   * // Represent 11 February 2014 in middle-endian format:
   * var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
   * //=> '02/11/2014'
   *
   * @example
   * // Represent 2 July 2014 in Esperanto:
   * import { eoLocale } from 'date-fns/locale/eo'
   * var result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
   *   locale: eoLocale
   * })
   * //=> '2-a de julio 2014'
   *
   * @example
   * // Escape string by single quote characters:
   * var result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
   * //=> "3 o'clock"
   */

  function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
    requiredArgs(2, arguments);
    var formatStr = String(dirtyFormatStr);
    var options = dirtyOptions || {};
    var locale$1 = options.locale || locale;
    var localeFirstWeekContainsDate = locale$1.options && locale$1.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
    }

    var localeWeekStartsOn = locale$1.options && locale$1.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }

    if (!locale$1.localize) {
      throw new RangeError('locale must contain localize property');
    }

    if (!locale$1.formatLong) {
      throw new RangeError('locale must contain formatLong property');
    }

    var originalDate = toDate(dirtyDate);

    if (!isValid(originalDate)) {
      throw new RangeError('Invalid time value');
    } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
    // This ensures that when UTC functions will be implemented, locales will be compatible with them.
    // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376


    var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
    var utcDate = subMilliseconds(originalDate, timezoneOffset);
    var formatterOptions = {
      firstWeekContainsDate: firstWeekContainsDate,
      weekStartsOn: weekStartsOn,
      locale: locale$1,
      _originalDate: originalDate
    };
    var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
      var firstCharacter = substring[0];

      if (firstCharacter === 'p' || firstCharacter === 'P') {
        var longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale$1.formatLong, formatterOptions);
      }

      return substring;
    }).join('').match(formattingTokensRegExp).map(function (substring) {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return "'";
      }

      var firstCharacter = substring[0];

      if (firstCharacter === "'") {
        return cleanEscapedString(substring);
      }

      var formatter = formatters$1[firstCharacter];

      if (formatter) {
        if (!options.useAdditionalWeekYearTokens && isProtectedWeekYearToken(substring)) {
          throwProtectedError(substring, dirtyFormatStr, dirtyDate);
        }

        if (!options.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(substring)) {
          throwProtectedError(substring, dirtyFormatStr, dirtyDate);
        }

        return formatter(utcDate, substring, locale$1.localize, formatterOptions);
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
      }

      return substring;
    }).join('');
    return result;
  }

  function cleanEscapedString(input) {
    return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
  }

  /**
   * @name subDays
   * @category Day Helpers
   * @summary Subtract the specified number of days from the given date.
   *
   * @description
   * Subtract the specified number of days from the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the days subtracted
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Subtract 10 days from 1 September 2014:
   * var result = subDays(new Date(2014, 8, 1), 10)
   * //=> Fri Aug 22 2014 00:00:00
   */

  function subDays(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var amount = toInteger(dirtyAmount);
    return addDays(dirtyDate, -amount);
  }

  /**
   * @name isToday
   * @category Day Helpers
   * @summary Is the given date today?
   * @pure false
   *
   * @description
   * Is the given date today?
   *
   * > ⚠️ Please note that this function is not present in the FP submodule as
   * > it uses `Date.now()` internally hence impure and can't be safely curried.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to check
   * @returns {Boolean} the date is today
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // If today is 6 October 2014, is 6 October 14:00:00 today?
   * var result = isToday(new Date(2014, 9, 6, 14, 0))
   * //=> true
   */

  function isToday(dirtyDate) {
    requiredArgs(1, arguments);
    return isSameDay(dirtyDate, Date.now());
  }

  /**
   * @name isTomorrow
   * @category Day Helpers
   * @summary Is the given date tomorrow?
   * @pure false
   *
   * @description
   * Is the given date tomorrow?
   *
   * > ⚠️ Please note that this function is not present in the FP submodule as
   * > it uses `Date.now()` internally hence impure and can't be safely curried.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to check
   * @returns {Boolean} the date is tomorrow
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
   * var result = isTomorrow(new Date(2014, 9, 7, 14, 0))
   * //=> true
   */

  function isTomorrow(dirtyDate) {
    requiredArgs(1, arguments);
    return isSameDay(dirtyDate, addDays(Date.now(), 1));
  }

  /**
   * @name isYesterday
   * @category Day Helpers
   * @summary Is the given date yesterday?
   * @pure false
   *
   * @description
   * Is the given date yesterday?
   *
   * > ⚠️ Please note that this function is not present in the FP submodule as
   * > it uses `Date.now()` internally hence impure and can't be safely curried.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to check
   * @returns {Boolean} the date is yesterday
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
   * var result = isYesterday(new Date(2014, 9, 5, 14, 0))
   * //=> true
   */

  function isYesterday(dirtyDate) {
    requiredArgs(1, arguments);
    return isSameDay(dirtyDate, subDays(Date.now(), 1));
  }

  var MILLISECONDS_IN_HOUR = 3600000;
  var MILLISECONDS_IN_MINUTE$1 = 60000;
  var DEFAULT_ADDITIONAL_DIGITS = 2;
  var patterns = {
    dateTimeDelimiter: /[T ]/,
    timeZoneDelimiter: /[Z ]/i,
    timezone: /([Z+-].*)$/
  };
  var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
  var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
  var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
  /**
   * @name parseISO
   * @category Common Helpers
   * @summary Parse ISO string
   *
   * @description
   * Parse the given string in ISO 8601 format and return an instance of Date.
   *
   * Function accepts complete ISO 8601 formats as well as partial implementations.
   * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
   *
   * If the argument isn't a string, the function cannot parse the string or
   * the values are invalid, it returns Invalid Date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * - The previous `parse` implementation was renamed to `parseISO`.
   *
   *   ```javascript
   *   // Before v2.0.0
   *   parse('2016-01-01')
   *
   *   // v2.0.0 onward
   *   parseISO('2016-01-01')
   *   ```
   *
   * - `parseISO` now validates separate date and time values in ISO-8601 strings
   *   and returns `Invalid Date` if the date is invalid.
   *
   *   ```javascript
   *   parseISO('2018-13-32')
   *   //=> Invalid Date
   *   ```
   *
   * - `parseISO` now doesn't fall back to `new Date` constructor
   *   if it fails to parse a string argument. Instead, it returns `Invalid Date`.
   *
   * @param {String} argument - the value to convert
   * @param {Object} [options] - an object with options.
   * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
   * @returns {Date} the parsed date in the local time zone
   * @throws {TypeError} 1 argument required
   * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
   *
   * @example
   * // Convert string '2014-02-11T11:30:30' to date:
   * var result = parseISO('2014-02-11T11:30:30')
   * //=> Tue Feb 11 2014 11:30:30
   *
   * @example
   * // Convert string '+02014101' to date,
   * // if the additional number of digits in the extended year format is 1:
   * var result = parseISO('+02014101', { additionalDigits: 1 })
   * //=> Fri Apr 11 2014 00:00:00
   */

  function parseISO(argument, dirtyOptions) {
    requiredArgs(1, arguments);
    var options = dirtyOptions || {};
    var additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : toInteger(options.additionalDigits);

    if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
      throw new RangeError('additionalDigits must be 0, 1 or 2');
    }

    if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
      return new Date(NaN);
    }

    var dateStrings = splitDateString(argument);
    var date;

    if (dateStrings.date) {
      var parseYearResult = parseYear(dateStrings.date, additionalDigits);
      date = parseDate(parseYearResult.restDateString, parseYearResult.year);
    }

    if (isNaN(date) || !date) {
      return new Date(NaN);
    }

    var timestamp = date.getTime();
    var time = 0;
    var offset;

    if (dateStrings.time) {
      time = parseTime(dateStrings.time);

      if (isNaN(time) || time === null) {
        return new Date(NaN);
      }
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone);

      if (isNaN(offset)) {
        return new Date(NaN);
      }
    } else {
      var dirtyDate = new Date(timestamp + time); // js parsed string assuming it's in UTC timezone
      // but we need it to be parsed in our timezone
      // so we use utc values to build date in our timezone.
      // Year values from 0 to 99 map to the years 1900 to 1999
      // so set year explicitly with setFullYear.

      var result = new Date(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate(), dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
      result.setFullYear(dirtyDate.getUTCFullYear());
      return result;
    }

    return new Date(timestamp + time + offset);
  }

  function splitDateString(dateString) {
    var dateStrings = {};
    var array = dateString.split(patterns.dateTimeDelimiter);
    var timeString; // The regex match should only return at maximum two array elements.
    // [date], [time], or [date, time].

    if (array.length > 2) {
      return dateStrings;
    }

    if (/:/.test(array[0])) {
      dateStrings.date = null;
      timeString = array[0];
    } else {
      dateStrings.date = array[0];
      timeString = array[1];

      if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
        dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
        timeString = dateString.substr(dateStrings.date.length, dateString.length);
      }
    }

    if (timeString) {
      var token = patterns.timezone.exec(timeString);

      if (token) {
        dateStrings.time = timeString.replace(token[1], '');
        dateStrings.timezone = token[1];
      } else {
        dateStrings.time = timeString;
      }
    }

    return dateStrings;
  }

  function parseYear(dateString, additionalDigits) {
    var regex = new RegExp('^(?:(\\d{4}|[+-]\\d{' + (4 + additionalDigits) + '})|(\\d{2}|[+-]\\d{' + (2 + additionalDigits) + '})$)');
    var captures = dateString.match(regex); // Invalid ISO-formatted year

    if (!captures) return {
      year: null
    };
    var year = captures[1] && parseInt(captures[1]);
    var century = captures[2] && parseInt(captures[2]);
    return {
      year: century == null ? year : century * 100,
      restDateString: dateString.slice((captures[1] || captures[2]).length)
    };
  }

  function parseDate(dateString, year) {
    // Invalid ISO-formatted year
    if (year === null) return null;
    var captures = dateString.match(dateRegex); // Invalid ISO-formatted string

    if (!captures) return null;
    var isWeekDate = !!captures[4];
    var dayOfYear = parseDateUnit(captures[1]);
    var month = parseDateUnit(captures[2]) - 1;
    var day = parseDateUnit(captures[3]);
    var week = parseDateUnit(captures[4]);
    var dayOfWeek = parseDateUnit(captures[5]) - 1;

    if (isWeekDate) {
      if (!validateWeekDate(year, week, dayOfWeek)) {
        return new Date(NaN);
      }

      return dayOfISOWeekYear(year, week, dayOfWeek);
    } else {
      var date = new Date(0);

      if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
        return new Date(NaN);
      }

      date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
      return date;
    }
  }

  function parseDateUnit(value) {
    return value ? parseInt(value) : 1;
  }

  function parseTime(timeString) {
    var captures = timeString.match(timeRegex);
    if (!captures) return null; // Invalid ISO-formatted time

    var hours = parseTimeUnit(captures[1]);
    var minutes = parseTimeUnit(captures[2]);
    var seconds = parseTimeUnit(captures[3]);

    if (!validateTime(hours, minutes, seconds)) {
      return NaN;
    }

    return hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE$1 + seconds * 1000;
  }

  function parseTimeUnit(value) {
    return value && parseFloat(value.replace(',', '.')) || 0;
  }

  function parseTimezone(timezoneString) {
    if (timezoneString === 'Z') return 0;
    var captures = timezoneString.match(timezoneRegex);
    if (!captures) return 0;
    var sign = captures[1] === '+' ? -1 : 1;
    var hours = parseInt(captures[2]);
    var minutes = captures[3] && parseInt(captures[3]) || 0;

    if (!validateTimezone(hours, minutes)) {
      return NaN;
    }

    return sign * (hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE$1);
  }

  function dayOfISOWeekYear(isoWeekYear, week, day) {
    var date = new Date(0);
    date.setUTCFullYear(isoWeekYear, 0, 4);
    var fourthOfJanuaryDay = date.getUTCDay() || 7;
    var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
  } // Validation functions
  // February is null to handle the leap year (using ||)


  var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function isLeapYearIndex(year) {
    return year % 400 === 0 || year % 4 === 0 && year % 100;
  }

  function validateDate(year, month, date) {
    return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
  }

  function validateDayOfYearDate(year, dayOfYear) {
    return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
  }

  function validateWeekDate(_year, week, day) {
    return week >= 1 && week <= 53 && day >= 0 && day <= 6;
  }

  function validateTime(hours, minutes, seconds) {
    if (hours === 24) {
      return minutes === 0 && seconds === 0;
    }

    return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
  }

  function validateTimezone(_hours, minutes) {
    return minutes >= 0 && minutes <= 59;
  }

  var dateFormats$1 = {
    full: 'EEEE, d MMMM yyyy',
    long: 'd MMMM yyyy',
    medium: 'd MMM yyyy',
    short: 'dd/MM/yyyy'
  };
  var timeFormats$1 = {
    full: 'HH:mm:ss zzzz',
    long: 'HH:mm:ss z',
    medium: 'HH:mm:ss',
    short: 'HH:mm'
  };
  var dateTimeFormats$1 = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: '{{date}}, {{time}}',
    short: '{{date}}, {{time}}'
  };
  var formatLong$1 = {
    date: buildFormatLongFn({
      formats: dateFormats$1,
      defaultWidth: 'full'
    }),
    time: buildFormatLongFn({
      formats: timeFormats$1,
      defaultWidth: 'full'
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats$1,
      defaultWidth: 'full'
    })
  };

  /**
   * @type {Locale}
   * @category Locales
   * @summary English locale (United Kingdom).
   * @language English
   * @iso-639-2 eng
   * @author Alex [@glintik]{@link https://github.com/glintik}
   */

  var locale$1 = {
    code: 'en-GB',
    formatDistance: formatDistance,
    formatLong: formatLong$1,
    formatRelative: formatRelative,
    localize: localize,
    match: match,
    options: {
      weekStartsOn: 1
      /* Monday */
      ,
      firstWeekContainsDate: 4
    }
  };

  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  function tinyDevice() {
      return window.matchMedia("only screen and (max-width: 360px)").matches;
  }
  function smallDevice() {
      return window.matchMedia("only screen and (max-width: 768px)").matches;
  }
  function pickByProperty(list, prop) {
      return lodash__default['default'].find(list, lodash__default['default'].matches(prop));
  }
  function pickById(list, id) {
      return lodash__default['default'].find(list, lodash__default['default'].matches({ _id: id }));
  }
  /**
   * Variant of pickById accepting stream values, and returning a stream
   */
  function pickByIdStream(listStream, idStream, defaultValue) {
      return stream__default['default'].lift(function (list, id) { return pickById(list, id) || defaultValue; }, listStream, idStream);
  }
  function filterByProperty(list, prop) {
      return lodash__default['default'].filter(list, lodash__default['default'].matches(prop));
  }
  /**
   * Mutates input list, returns array of removed items
   */
  function removeByProperty(list, prop) {
      return lodash__default['default'].remove(list, lodash__default['default'].matches(prop));
  }
  function itemTagsOr(testTags, _a) {
      var tags = _a.tags;
      return lodash__default['default'].some(testTags, function (tag) { return lodash__default['default'].some(tags, tag); });
  }
  function itemTagsAnd(testTags, _a) {
      var tags = _a.tags;
      return lodash__default['default'].every(testTags, function (tag) { return lodash__default['default'].some(tags, tag); });
  }
  function itemsForCategory(itemList, hasTags, matchAll) {
      if (matchAll === void 0) { matchAll = false; }
      if (hasTags.length === 0) {
          return itemList;
      }
      var filterFn = lodash__default['default'].partial(matchAll ? itemTagsAnd : itemTagsOr, hasTags);
      return lodash__default['default'].filter(itemList, filterFn);
  }
  // Test given primitive is truthy or array has > 0 elements
  function canEdit(_a) {
      var readonly = _a.readonly, disabled = _a.disabled;
      return !(readonly || disabled);
  }
  function hasValue(value) {
      return Boolean(lodash__default['default'].isArray(value) ? value.length : value);
  }
  /**
   * Express a given number of bytes as Kilobytes or Megabytes where appropriate
   */
  function humaniseByteCount(numBytes) {
      if (numBytes < 1000 /* kilo */) {
          return numBytes + " bytes";
      }
      else if (numBytes < 1000000 /* mega */) {
          return lodash__default['default'].round(numBytes / 1000 /* kilo */) + "Kb";
      }
      else {
          return lodash__default['default'].round(numBytes / 1000000 /* mega */) + "Mb";
      }
  }
  function formatDate(timeValue, mask) {
      if (mask === void 0) { mask = "P"; }
      return format(timeValue, mask, { locale: locale$1 });
  }
  function formatTime(timeValue, mask) {
      if (mask === void 0) { mask = "HH:mm"; }
      return formatDate(timeValue, mask);
  }
  function humaniseTimeValue(timeValue) {
      if (isYesterday(timeValue)) {
          return "Yesterday";
      }
      else if (isToday(timeValue)) {
          return "Today";
      }
      else if (isTomorrow(timeValue)) {
          return "Tomorrow";
      }
      else {
          return formatDate(timeValue);
      }
  }
  function parseDateStr(timeStr) {
      try {
          return timeStr ? humaniseTimeValue(parseISO(timeStr).valueOf()) : "-";
      }
      catch (_a) {
          return "-";
      }
  }
  function parseTimeStr(timeStr) {
      try {
          return timeStr ? formatTime(parseISO(timeStr).valueOf()) : "-";
      }
      catch (_a) {
          return "-";
      }
  }
  /**
   * Extract field(s) from item props
   * A single field will be returned as its respective TProp type
   * Multiple fields will be joined into a space delimited string
   */
  function extractFields(item, fieldList, category) {
      if (category) {
          return item.label;
      }
      var props = item.props;
      return fieldList.length === 1 ? props[fieldList[0]] : lodash__default['default'](fieldList)
          .map(function (field) { return props[field]; })
          .compact().value().join(" ");
  }
  /**
   * Pass-through function for replacing m.request "deserialize" JSON parsing default
   */
  function simpleResponse(value) {
      return value;
  }
  var fileIconMap = {
      "application/zip": "fa-file-archive",
      "application/pdf": "fa-file-pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "fa-file-word",
      "application/msword": "fa-file-word",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "fa-file-excel",
      "application/vnd.ms-excel": "fa-file-excel",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": "fa-file-powerpoint",
      "application/vnd.ms-powerpoint": "fa-file-powerpoint",
      "image/jpeg": "fa-file-image",
      "image/png": "fa-file-image",
      "image/gif": "fa-file-image",
      "image/tiff": "fa-file-image",
      "audio/mpeg": "fa-file-audio",
      "video/mpeg": "fa-file-video",
      "video/quicktime": "fa-file-video",
      "video/x-msvideo": "fa-file-video"
  };
  function fileIcon(fileType) {
      if (fileIconMap.hasOwnProperty(fileType)) {
          return fileIconMap[fileType];
      }
      else {
          return "fa-file-alt";
      }
  }
  var fileTypeExtMap = {
      "application/zip": ".zip",
      "application/pdf": ".pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
      "application/msword": ".doc",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
      "application/vnd.ms-excel": ".xls",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": ".pptx",
      "application/vnd.ms-powerpoint": ".ppt",
      "image/jpeg": "jpeg",
      "image/png": ".png",
      "image/gif": ".gif",
      "image/tiff": ".tiff",
      "audio/mpeg": ".mp3",
      "video/mpeg": ".mpeg",
      "video/quicktime": ".mov",
      "video/x-msvideo": ".avi"
  };
  function fileExt(fileType) {
      if (fileTypeExtMap.hasOwnProperty(fileType)) {
          return fileTypeExtMap[fileType];
      }
      else {
          return "";
      }
  }
  /**
   * Provide user-friendly presentation of some file metadata properties
   */
  function getFileValue(file, property) {
      if (property === "size") {
          return humaniseByteCount(file.size);
      }
      else if (property === "lastModified") {
          return humaniseTimeValue(file.lastModified);
      }
      else if (property === "type") {
          return m__default['default']("i.fal.fa-fw", {
              title: file.type,
              class: fileIcon(file.type)
          });
      }
      else {
          return  file[property];
      }
  }
  /**
   * Get an array of files
   * @param files IDataItem file array
   * @param prop file property to match
   */
  function getFiles(files, prop) {
      return lodash__default['default'].map(filterByProperty(files, { prop: prop }), function (file) {
          var guid = file._id, name = file.name;
          return {
              guid: guid,
              name: name,
              path: file.remoteUrl
          };
      });
  }
  /**
   * Get a stream of files
   * @param files IDataItem file array
   * @param field TField identifying files
   */
  function getFileStream(files, _a) {
      var id = _a.id;
      return stream__default['default'](getFiles(files, id));
  }
  /**
   * Get a property
   * @param props IDataItem property map
   * @param key TField key to match
   */
  function getProp(props, key) {
      return lodash__default['default'].get(props, key);
  }
  /**
   * Get a property stream
   * @param props IDataItem property map
   * @param field TField identifying prop
   */
  function getPropStream(props, _a) {
      var id = _a.id;
      var propVal = getProp(props, id);
      return propVal ? stream__default['default'](propVal) : stream__default['default']();
  }
  // export function getLocation(): Promise<Coordinates | undefined> {
  // 	return new Promise((resolve) => {
  // 		navigator.geolocation.getCurrentPosition(({ coords }) => resolve(coords), () => resolve());
  // 	});
  // }
  var mediaNS = "@media screen and (min-width:30em)";
  var mediaM = "@media screen and (min-width:30em) and (max-width: 60em)";
  var mediaL = "@media screen and (min-width:60em)";
  /** SETUP JSS */
  function increaseSpecificity(userOptions) {
      var options = lodash__default['default'].assign({ repeat: 2 }, userOptions);
      var prefix = Array(options.repeat + 1).join(':not(#\\20)');
      return {
          onProcessRule: function (rule, sheet) {
              var parent = rule.options.parent;
              if (sheet.options.increaseSpecificity === false ||
                  rule.type !== 'style' ||
                  (parent && parent.type === 'keyframes'))
                  return;
              rule.selectorText = prefix + rule.selectorText;
          }
      };
  }
  jss__default['default'].use(increaseSpecificity());
  function kebabifyStyle(style) {
      return lodash__default['default'].reduce(style, function (acc, value, key) {
          acc[lodash__default['default'].kebabCase(key)] = value;
          return acc;
      }, {});
  }
  function createResponsiveClass(_a, uiSheet) {
      var _b, _c, _d;
      var style = _a.style, styleNS = _a.styleNS, styleM = _a.styleM, styleL = _a.styleL, classes = _a.classes, _e = _a.key, key = _e === void 0 ? "unnamed" : _e;
      if (uiSheet === void 0) { uiSheet = jss__default['default'].createStyleSheet({}); }
      var classList = [];
      var rule;
      if (style) {
          rule = uiSheet.addRule(key, kebabifyStyle(style));
          if (rule.id)
              classList.push(rule.id);
      }
      if (styleNS) {
          rule = uiSheet.addRule(mediaNS, (_b = {}, _b[key] = lodash__default['default'].assign(kebabifyStyle(styleNS)), _b));
          rule = rule.getRule(key);
          if (rule.id)
              classList.push(rule.id);
      }
      if (styleM) {
          rule = uiSheet.addRule(mediaM, (_c = {}, _c[key] = lodash__default['default'].assign(kebabifyStyle(styleM)), _c));
          rule = rule.getRule(key);
          if (rule.id)
              classList.push(rule.id);
      }
      if (styleL) {
          rule = uiSheet.addRule(mediaL, (_d = {}, _d[key] = lodash__default['default'].assign(kebabifyStyle(styleL)), _d));
          rule = rule.getRule(key);
          if (rule.id)
              classList.push(rule.id);
      }
      if (classList.length) {
          uiSheet.attach();
      }
      if (classes) {
          classList.push(classes);
      }
      return classList.join(" ");
  }
  var ResponsiveThemeHandler = /** @class */ (function () {
      function ResponsiveThemeHandler(applyTheme) {
          var _this = this;
          this._classes = {};
          this.uiSheet = jss__default['default'].createStyleSheet({});
          lodash__default['default'].map(applyTheme, function (themeObj, key) {
              _this._classes[key] = createResponsiveClass(lodash__default['default'].assign({ key: key }, themeObj), _this.uiSheet);
          });
      }
      Object.defineProperty(ResponsiveThemeHandler.prototype, "classes", {
          get: function () {
              return this._classes;
          },
          enumerable: false,
          configurable: true
      });
      return ResponsiveThemeHandler;
  }());
  function joinClasses(arr) {
      return lodash__default['default'].compact(arr).join(" ");
  }

  // Registered component map
  var componentMap = {};
  function registerComponent(type, component) {
      if (type in componentMap) {
          throw new Error("Component " + type + " is already registered");
      }
      else {
          componentMap[type] = component;
      }
  }
  function buildComponent(_a) {
      var type = _a.type, data = _a.data, style = _a.style, styleNS = _a.styleNS, styleM = _a.styleM, styleL = _a.styleL, classes = _a.classes;
      var mergedClasses = createResponsiveClass({ style: style, styleNS: styleNS, styleM: styleM, styleL: styleL, classes: classes });
      if (type in componentMap) {
          return m__default['default'](componentMap[type], { type: type, data: data, classes: mergedClasses });
      }
      else {
          return m__default['default']("span", "Unknown component type: " + type);
      }
  }
  function buildComponentList(list) {
      return lodash__default['default'].map(list, function (comp) { return buildComponent(comp); });
  }

  (function (DialogContext) {
      DialogContext["error"] = "error";
      DialogContext["warn"] = "warn";
      DialogContext["info"] = "info";
      DialogContext["basic"] = "basic";
  })(exports.ToastContext || (exports.ToastContext = {}));
  (function (DialogPosition) {
      DialogPosition["center"] = "center";
      DialogPosition["top"] = "top";
      DialogPosition["topRight"] = "topRight";
      DialogPosition["topLeft"] = "topLeft";
      DialogPosition["bottom"] = "bottom";
      DialogPosition["bottomRight"] = "bottomRight";
      DialogPosition["bottomLeft"] = "bottomLeft";
  })(exports.DialogPosition || (exports.DialogPosition = {}));
  (function (DialogType) {
      DialogType["notification"] = "notification";
      DialogType["confirm"] = "confirm";
      DialogType["login"] = "login";
      DialogType["feedback"] = "feedback";
  })(exports.DialogType || (exports.DialogType = {}));

  var _a, _b;
  var propMap = (_a = {},
      _a["label" /* label */] = uiWidgets.Label,
      _a["trusted" /* trusted */] = uiWidgets.TextareaInput,
      _a["hidden" /* hidden */] = uiWidgets.BaseInput,
      _a["text" /* text */] = uiWidgets.BaseInput,
      _a["password" /* password */] = uiWidgets.PasswordInput,
      _a["search" /* search */] = uiWidgets.BaseInput,
      _a["date" /* date */] = uiWidgets.BaseInput,
      _a["time" /* time */] = uiWidgets.BaseInput,
      _a["datetime-local" /* dateTimeLocal */] = uiWidgets.BaseInput,
      _a["dateInput" /* dateInput */] = uiWidgets.DateInput,
      _a["cardDate" /* cardDate */] = uiWidgets.CardDateInput,
      _a["number" /* number */] = uiWidgets.BaseInput,
      _a["range" /* range */] = uiWidgets.BaseInput,
      _a["email" /* email */] = uiWidgets.BaseInput,
      _a["url" /* url */] = uiWidgets.BaseInput,
      _a["tel" /* tel */] = uiWidgets.BaseInput,
      _a["color" /* color */] = uiWidgets.BaseInput,
      _a["currency" /* currency */] = uiWidgets.CurrencyInput,
      _a["textarea" /* textarea */] = uiWidgets.TextareaInput,
      _a["checkbox" /* checkbox */] = uiWidgets.CheckboxInput,
      _a["toggle" /* toggle */] = uiWidgets.ToggleInput,
      _a["select" /* select */] = uiWidgets.SelectInput,
      _a["radio" /* radio */] = uiWidgets.RadioInput,
      _a);
  var fileMap = (_b = {},
      _b["fileMulti" /* fileMulti */] = uiWidgets.FileMulti,
      _b["file" /* file */] = uiWidgets.FileSelect,
      _b["imageMulti" /* imageMulti */] = uiWidgets.ImageMulti,
      _b["image" /* image */] = uiWidgets.ImageSelect,
      _b["sign" /* sign */] = uiWidgets.SignBuilder,
      _b);
  // Index widgets by type
  var widgetTypeMap = {};
  lodash__default['default'].forEach(propMap, function (_widget, key) { return widgetTypeMap[key] = 1 /* Prop */; });
  lodash__default['default'].forEach(fileMap, function (_widget, key) { return widgetTypeMap[key] = 2 /* File */; });
  // Widget getters
  function getFileWidget(fieldType) {
      if (fileMap.hasOwnProperty(fieldType)) {
          return fileMap[fieldType];
      }
      else {
          return fileMap["file" /* file */];
      }
  }
  function getPropWidget(fieldType) {
      if (propMap.hasOwnProperty(fieldType)) {
          return propMap[fieldType];
      }
      else {
          return propMap["text" /* text */];
      }
  }
  function getWidget(type, fieldType) {
      return type === 2 /* File */
          ? getFileWidget(fieldType)
          : type === 1 /* Prop */
              ? getPropWidget(fieldType)
              : undefined;
  }
  function getWidgetType(fieldType) {
      if (fieldType === void 0) { fieldType = "text" /* text */; }
      return widgetTypeMap[fieldType] || 3 /* Unknown */;
  }

  var dobRegex = /^ {0,}[0-9]{2}\/[0-9]{2}\/[0-9]{4} {0,}$/;
  var postCodeRegex = /^ {0,}(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2})) {0,}$/;
  var mapHelper = {
      "default": function (inp) { return inp; },
      "date-format": function (inp) { return inp.map(function (dateVal) { return dateVal
          ? formatDate(Number(dateVal))
          : ""; }); },
      "dateStr-format": function (inp) { return inp.map(function (dateStr) { return dateStr
          ? formatDate(new Date(String(dateStr)).valueOf())
          : ""; }); },
      "date-format-month": function (inp) { return inp.map(function (dateVal) { return dateVal
          ? formatDate(Number(dateVal), "dd MMMM yyyy")
          : ""; }); },
      "date-endofday": function (inp) { return inp.map(function (dateVal) { return dateVal
          ? add(new Date(dateVal), { hours: 23, minutes: 59, seconds: 59 }).toISOString()
          : ""; }); },
      "upper": function (inp) { return inp.map(function (val) { return String(val).toUpperCase(); }); },
      "lower": function (inp) { return inp.map(function (val) { return String(val).toLowerCase(); }); },
      "snake": function (inp) { return inp.map(function (val) { return lodash__default['default'].snakeCase(String(val)); }); },
      "trunc": function (inp) { return inp.map(function (val) { return lodash__default['default'].truncate(String(val), { length: 15 }); }); },
      "remove-whitespace": function (inp) { return inp.map(function (val) { return val ? lodash__default['default'].replace(String(val), /\s/g, "") : ""; }); },
      "boolean": function (inp) { return inp.map(function (val) { return Boolean(val); }); },
      // Value test
      "strLength": function (inp) { return inp.map(function (val) { return val ? String(val).length > 0 : false; }); },
      "strLength-6": function (inp) { return inp.map(function (val) { return val ? String(val).length === 6 : false; }); },
      "test-dob": function (inp) { return inp.map(function (val) { return val ? dobRegex.test(String(val)) : false; }); },
      "test-postcode": function (inp) { return inp.map(function (val) { return val ? postCodeRegex.test(String(val)) : false; }); }
  };
  function applyMap(key, inp) {
      if (mapHelper.hasOwnProperty(key)) {
          return mapHelper[key](inp);
      }
      else {
          return mapHelper["default"](inp);
      }
  }
  function registerMapFn(key, func) {
      if (!mapHelper.hasOwnProperty(key)) {
          mapHelper[key] = func;
      }
  }
  // Convert file streams into basic computed props
  var fileMapHelper = {
      "default": function (inp) { return inp.map(function (files) { return lodash__default['default'].map(files, function (_a) {
          var name = _a.name;
          return name;
      }).join(); }); },
      // File properties
      "file-name": function (inp) { return inp.map(function (files) { return lodash__default['default'].map(files, function (_a) {
          var file = _a.file;
          return file ? file.name : "";
      }).join(); }); },
      "file-type": function (inp) { return inp.map(function (files) { return lodash__default['default'].map(files, function (_a) {
          var file = _a.file;
          return file ? file.type : "";
      }).join(); }); },
      "file-size": function (inp) { return inp.map(function (files) { return lodash__default['default'].map(files, function (_a) {
          var file = _a.file;
          return file ? file.size : "";
      }).join(); }); },
      "file-lastmodified": function (inp) { return inp.map(function (files) { return lodash__default['default'].map(files, function (_a) {
          var file = _a.file;
          return file ? file.lastModified : "";
      }).join(); }); },
      // File metadata
      "path": function (inp) { return inp.map(function (files) { return lodash__default['default'].map(files, function (_a) {
          var path = _a.path;
          return path;
      }).join(); }); },
      "dataUrl": function (inp) { return inp.map(function (files) { return lodash__default['default'].map(files, function (_a) {
          var dataUrl = _a.dataUrl;
          return dataUrl ? dataUrl : "";
      }).join(); }); }
  };
  function applyFileMap(key, inp) {
      if (fileMapHelper.hasOwnProperty(key)) {
          return fileMapHelper[key](inp);
      }
      else {
          return fileMapHelper["default"](inp);
      }
  }
  function registerFileMapFn(key, func) {
      if (!fileMapHelper.hasOwnProperty(key)) {
          fileMapHelper[key] = func;
      }
  }

  var mergeHelper = {
      "default": function (inp) { return stream__default['default'].merge(inp).map(function (vals) { return vals.join(); }); },
      "join-space": function (inp) { return stream__default['default'].merge(inp).map(function (vals) { return vals.join(" "); }); },
      "join-newline": function (inp) { return stream__default['default'].merge(inp).map(function (vals) { return vals.join("\n"); }); },
      "join-underscore": function (inp) { return stream__default['default'].merge(inp).map(function (vals) { return vals.join("_"); }); },
      // Sum of values, attempt to parse values as integers
      "sum": function (inp) { return stream__default['default'].merge(inp).map(function (vals) { return lodash__default['default']
          .reduce(vals, function (acc, val) {
          var num = Number.parseInt(String(val));
          return lodash__default['default'].isNaN(num) ? acc : acc + num;
      }, 0); }); },
      // Product of values, attempt to parse values as integers
      "product": function (inp) { return stream__default['default'].merge(inp).map(function (vals) { return lodash__default['default']
          .reduce(vals, function (acc, val) {
          var num = Number.parseInt(String(val));
          return lodash__default['default'].isNaN(num) ? 0 : acc * num;
      }, 1); }); },
      // Boolean utils
      // Return last value if all other values are "truthy", otherwise 0
      "and": function (inp) { return stream__default['default'].merge(inp).map(function (vals) { return lodash__default['default']
          .reduce(vals, function (acc, val) { return acc ? val : 0; }, true); }); },
      // Return last value if any values are "truthy", otherwise 0
      "or": function (inp) { return stream__default['default'].merge(inp).map(function (vals) { return lodash__default['default']
          .reduce(vals, function (acc, val) { return acc || val ? val : acc; }, 0); }); }
  };
  function applyMerge(key, inp) {
      if (mergeHelper.hasOwnProperty(key)) {
          return mergeHelper[key](inp);
      }
      else {
          return mergeHelper["default"](inp);
      }
  }
  function registerMergeFn(key, func) {
      if (!mergeHelper.hasOwnProperty(key)) {
          mergeHelper[key] = func;
      }
  }

  function getStreams(map, keys) {
      // TODO Reject if any one key is missing?
      return lodash__default['default'].map(lodash__default['default'].compact(lodash__default['default'].at(map, keys)), function (_a) {
          var value = _a.value;
          return value;
      });
  }
  function depthTest(score, keys, fieldList) {
      return lodash__default['default'].max(lodash__default['default'].map(keys, function (key) {
          var field = lodash__default['default'].find(fieldList, lodash__default['default'].matches({ key: key }));
          // Increment depth and test computed dep, or return result
          return (field && field.computed) ? depthTest(score + 1, field.computed.keys, fieldList) : score;
      })) || 0;
  }
  function sortComputed(fieldList) {
      return lodash__default['default'].sortBy(fieldList, function (field) { return depthTest(0, field.computed.keys, fieldList); });
  }
  /**
   * Convert a given list of fields into a form definition
   */
  function buildFormFields(fieldList) {
      // Split list into "basic" and "computed" values
      // const { [ValType.basic]: basicList, [ValType.computed]: computedList } = lodash
      // 	.groupBy(fieldList, (field) => "computed" in field && field.computed ? ValType.computed : ValType.basic);
      var groups = lodash__default['default'].groupBy(fieldList, function (field) { return "computed" in field && field.computed ? "c" /* computed */ : "b" /* basic */; });
      var _a = groups, _b = "b" /* basic */, basicList = _a[_b], _c = "c" /* computed */, computedList = _a[_c];
      var streamMap = {};
      // Create "basic" value stream map
      lodash__default['default'].reduce(basicList, function (acc, _a) {
          var key = _a.key, fileValue = _a.fileValue, input = _a.input;
          // Distinguish between TProp and IFile[] stream values
          var type = input ? getWidgetType(input.type) : 3 /* Unknown */;
          if (type === 1 /* Prop */) {
              acc[key] = {
                  type: type,
                  value: stream__default['default']()
              };
          }
          else if (type === 2 /* File */) {
              // Apply stream transform to present file(s) as a basic text prop
              var fileStream = stream__default['default']([]);
              acc[key] = {
                  type: type,
                  value: applyFileMap(fileValue || "default", fileStream),
                  files: fileStream
              };
          }
          return acc;
      }, streamMap);
      // Sort computedList based on "depth" of computed dependencies
      var sortedComputed = sortComputed(computedList);
      // Create "computed" value stream map using basic streams
      lodash__default['default'].reduce(sortedComputed, function (acc, _a) {
          var key = _a.key, _b = _a.computed, keys = _b.keys, _c = _b.map, map = _c === void 0 ? "default" : _c, _d = _b.merge, merge = _d === void 0 ? "default" : _d;
          var mapStream;
          // Merge multiple streams
          if (keys.length > 1) {
              var srcStreams = getStreams(acc, keys);
              mapStream = applyMerge(merge, srcStreams);
          }
          else if (keys.length === 1) {
              // Get single stream
              mapStream = getStreams(acc, keys)[0];
          }
          // Apply map
          if (mapStream) {
              acc[key] = {
                  type: 1 /* Prop */,
                  value: applyMap(map, mapStream)
              };
          }
          return acc;
      }, streamMap);
      // Gather inputs, widgets, and streams
      return {
          fields: lodash__default['default'](fieldList)
              // Only create fields for entries with inputs
              .filter(function (field) { return "input" in field; })
              .map(function (_a) {
              var key = _a.key, group = _a.group, input = _a.input, data = _a.data;
              var formStream = streamMap[key];
              var type = formStream.type;
              return {
                  key: key, group: group, input: input, type: type, data: data,
                  widget: getWidget(type, input.type || "text" /* text */),
                  value: formStream.value,
                  files: formStream.type === 2 /* File */ ? formStream.files : undefined
              };
          }).value(),
          streamMap: streamMap
      };
  }
  function overrideInput(input, override) {
      return override ? lodash__default['default'].assign({}, input, override) : input;
  }
  function assembleFormField(_a, inputOverride) {
      var type = _a.type, input = _a.input, widget = _a.widget, value = _a.value, files = _a.files;
      if (type === 2 /* File */ && input && widget && files) {
          return m__default['default'](widget, {
              field: overrideInput(input, inputOverride),
              value: files
          });
      }
      else if (type === 1 /* Prop */ && input && widget && value) {
          return m__default['default'](widget, {
              field: overrideInput(input, inputOverride),
              value: value
          });
      }
      return null;
  }

  var application = stream__default['default']();
  // Update ui-widgets config when application is set
  application.map(function (_a) {
      var uiWidgets$1 = _a.uiWidgets;
      uiWidgets.updateConfig({
          signFont: "Caveat"
      });
      if (uiWidgets$1) {
          uiWidgets.updateConfig(uiWidgets$1);
      }
  });

  var dialog = stream__default['default']();
  /**
   * Set dialog and redraw, useful for 3rd party library events/callbacks
   */
  function dialogRedraw(newDialog) {
      dialog(newDialog);
      m.redraw();
  }
  function errNotification(err) {
      // console.debug(err);
      // TODO Does this requre a redraw in our use cases?
      dialogRedraw({
          message: String(err.message),
          context: exports.ToastContext.error
      });
  }

  var branding = stream__default['default']();
  // Push new branding into brandMap, setting default values
  function updateBrandmap(_a) {
      var _b = _a.company, company = _b === void 0 ? "" : _b, _c = _a.copyright, copyright = _c === void 0 ? "" : _c, _d = _a.tel, tel = _d === void 0 ? "" : _d, _e = _a.email, email = _e === void 0 ? "" : _e, _f = _a.address, address = _f === void 0 ? "" : _f, poweredBy = _a.poweredBy, _g = _a.header, header = _g === void 0 ? [
          { type: 0 /* spacer */ },
          { type: 7 /* logoutLarge */ }
      ] : _g, _h = _a.subheader, subheader = _h === void 0 ? [] : _h, _j = _a.footer, footer = _j === void 0 ? [
          { type: 9 /* poweredBy */ },
          { type: 0 /* spacer */ },
          { type: 8 /* copyright */ },
          { type: 0 /* spacer */ },
          { type: 10 /* progress */ },
          { type: 6 /* logoutSmall */ }
      ] : _j;
      branding({
          company: company, copyright: copyright,
          tel: tel, email: email, address: address,
          poweredBy: poweredBy,
          header: header, subheader: subheader, footer: footer
      });
  }
  // Apply default value
  updateBrandmap({});
  function loadBranding() {
      var path = application().brandingPath;
      return path
          ? m.request(path).then(function (newBranding) {
              // Update legacy branding header
              if (newBranding.header && !lodash__default['default'].isArray(newBranding.header)) {
                  var oldHeader = newBranding.header;
                  newBranding.header = [
                      { type: 15 /* logo */, logo: oldHeader.lhs },
                      { type: 0 /* spacer */ },
                      { type: 15 /* logo */, logo: oldHeader.rhs },
                      { type: 7 /* logoutLarge */ }
                  ];
              }
              updateBrandmap(newBranding);
          }).catch(lodash__default['default'].noop)
          : Promise.resolve();
  }

  var b$1 = b;

  var UIThemeColorsHelper = /** @class */ (function () {
      function UIThemeColorsHelper() {
          this._text = {
              body: "#333333",
              primary: "#00bb44",
              default: "#333333",
              alt: "#fff",
              subheading: "rgba(0,0,0,.5)",
              highlight: "unset",
              basic: "#333333",
              info: "#fff",
              warning: "#111111",
              error: "#fff"
          };
          this._background = {
              primary: "#fff",
              default: "#0974c0",
              basic: "#fff",
              info: "#0974c0",
              warning: "#FFD700",
              error: "#E7040F"
          };
      }
      Object.defineProperty(UIThemeColorsHelper.prototype, "background", {
          get: function () {
              return this._background;
          },
          set: function (colors) {
              this._background = lodash__default['default'].merge(this._background, colors);
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(UIThemeColorsHelper.prototype, "text", {
          get: function () {
              return this._text;
          },
          set: function (colors) {
              this._text = lodash__default['default'].merge(this._text, colors);
          },
          enumerable: false,
          configurable: true
      });
      return UIThemeColorsHelper;
  }());
  var UIStyleColors = new UIThemeColorsHelper();
  var UIStyleDefaults = /** @class */ (function () {
      function UIStyleDefaults() {
          this.colors = UIStyleColors;
          this.body = {
              style: {
                  color: UIStyleColors.text.body,
                  fontSize: "1rem",
                  fontWeight: "200",
                  background: UIStyleColors.background.basic
              }
          };
          this.uiInputWrapper = {};
          this.uiInput = {
              classes: "bn"
          };
          this.uiIcon = {
              style: {
                  color: UIStyleColors.text.default
              }
          };
          this.uiLayout = {
              style: {
                  background: "transparent"
              },
              styleL: {
                  maxWidth: "64rem"
              }
          };
          this.uiPostContentWrapper = {
              classes: "flex flex-wrap"
          };
          this.uiCardGroup = {
              classes: "flex flex-wrap justify-center pa2"
          };
          this.uiHeaderWrapper = {
              style: {
                  maxWidth: "100%"
              }
          };
          this.uiHeader = {
              style: {
                  background: "#fff",
                  color: UIStyleColors.text.alt,
              },
          };
          this.uiSubheader = {
              style: {
                  height: "3rem",
                  background: UIStyleColors.background.basic,
                  color: UIStyleColors.text.default,
              }
          };
          this.uiFooter = {
              style: {
                  maxWidth: "100%",
                  height: "3rem",
                  background: "#F4F4F4",
                  color: "#999",
              }
          };
          this.uiPanel = {};
          this.uiPanelHeader = {
              style: {
                  background: "#fff",
                  color: UIStyleColors.text.alt,
              },
          };
          this.uiCardWrapper = {
              style: {
                  height: "12em",
                  width: "12em",
                  color: UIStyleColors.text.alt,
                  background: UIStyleColors.background.default,
                  borderRadius: "0px",
                  boxShadow: "unset",
              },
              classes: "flex flex-column items-center",
          };
          this.uiCardHeader = {
              classes: "flex-auto",
              style: {
                  fontSize: "1.25rem"
              }
          };
          this.uiCardSubheading = {
              classes: "ma2 pv1 ph2 flex items-center",
              style: {
                  fontSize: "1.25rem"
              }
          };
          this.uiCardIcon = {
              classes: "fal fa-fw fa-4x ma2"
          };
          this.uiCardImage = {
              classes: "img ma2"
          };
          this.uiCardCounter = {
              classes: "nt1 nr1 top-0 right-0"
          };
          this.uiCardContextBasic = {
              style: {
                  backgroundColor: "#fff",
                  color: UIStyleColors.text.body
              }
          };
          this.uiCardContextInfo = {
              style: {
                  backgroundColor: "#fff",
                  color: "#fff"
              }
          };
          this.uiCardContextWarn = {
              style: {
                  backgroundColor: "#FFD700",
                  color: "#111111"
              }
          };
          this.uiCardContextError = {
              style: {
                  backgroundColor: "#E7040F",
                  color: "#fff"
              }
          };
          this.uiLoginWrapper = {
              classes: "pa2",
              style: {
                  width: "100%",
                  background: "transparent"
              }
          };
          this.uiLogin = {
              classes: "measure-wide center"
          };
          this.uiLoginForm = {};
          this.uiLoginButtonWrapper = {
              classes: "justify-between"
          };
          this.uiLoginButton = {};
          this.uiLoginInput = {};
          this.uiLoginInputWrapper = {};
          this.uiLoginFormInputWrapper = {};
          this.uiLoginLines = {};
          this.uiHelpInputWrapper = {};
          this.uiHelpInputLines = {};
          this.uiTable = {};
          this.uiTableHeader = {
              classes: "flex-auto",
              style: {
                  background: UIStyleColors.background.default,
                  color: UIStyleColors.text.alt,
                  fontWeight: "400"
              }
          };
          this.uiTableRow = {};
          this.uiButton = {
              classes: "shadow-4",
              style: {
                  background: UIStyleColors.background.default,
                  color: UIStyleColors.text.alt,
              }
          };
          this.uiAltButton = {
              style: {
                  background: UIStyleColors.background.default,
                  color: UIStyleColors.text.alt,
              }
          };
          this.uiButtonInfo = {};
          this.uiButtonWarn = {};
          this.uiButtonError = {};
          this.uiDialogContextBasic = {
              style: {
                  backgroundColor: UIStyleColors.background.basic,
                  color: UIStyleColors.text.body
              }
          };
          this.uiDialogContextInfo = {
              style: {
                  backgroundColor: UIStyleColors.background.info,
                  color: UIStyleColors.text.info
              }
          };
          this.uiDialogContextWarn = {
              style: {
                  backgroundColor: UIStyleColors.background.warning,
                  color: UIStyleColors.text.warning
              }
          };
          this.uiDialogContextError = {
              style: {
                  backgroundColor: UIStyleColors.background.error,
                  color: UIStyleColors.text.error
              }
          };
          this.uiDialogWrapper = {
              style: {
                  borderRadius: "15px 0px 15px 0px"
              }
          };
          this.uiDialogLoginWrapper = {
              style: {
                  position: 'relative',
                  minHeight: "20%",
                  animationIterationCount: "3"
              }
          };
          this.uiDialogFeedbackWrapper = {};
          this.uiDialogNotificationWrapper = {
              style: {
                  borderRadius: "0px 0px 15px",
                  pointerEvents: 'auto',
                  boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
              }
          };
          this.uiDialogTitle = {};
          this.uiDialogText = {};
          this.uiDialogButtonWrapper = {
              style: {
                  position: 'relative',
                  justifySelf: 'flex-end'
              }
          };
          this.uiDialogFeedbackLabel = {};
          this.uiDialogFeedbackButtonWrapper = {
              style: {
                  backgroundColor: "#f4f4f4",
                  position: 'relative',
                  justifySelf: 'flex-end'
              }
          };
          this.uiDialogLinkButton = {};
          this.uiDialogCancelButton = {
              classes: "mr2"
          };
          this.uiDialogConfirmButton = {
              classes: "mr2"
          };
          this.uiLogoutButtonIcon = {
              style: {
                  color: "inherit"
              }
          };
          this.uiLogoutButtonLabel = {
              style: {
                  color: "inherit"
              }
          };
          this.uiLogo = {
              style: {
                  margin: "0.5rem",
                  background: "transparent",
                  borderRadius: ".25rem",
                  position: "relative"
              }
          };
          this.uiPdfFieldOverlay = {
              style: {
                  backgroundColor: "#FFF9CE"
              }
          };
          this.uiPdfTopBar = {
              style: {
                  backgroundColor: UIStyleColors.background.default,
              }
          };
          this.uiPdfBottomBar = {
              style: {
                  backgroundColor: "#F2F2F2",
              }
          };
          this.uiActionCardContent = {};
          this.uiActionCardWrapper = {};
          this.uiActionCardInnerWrapper = {
              style: {
                  display: "flex",
                  alignContent: "space-evenly",
                  width: "100%"
              },
              styleNS: {
                  width: "75%"
              }
          };
          this.uiActionCardButton = {};
          this.uiActionCardHeader = {
              style: {
                  margin: "unset",
                  flex: "unset",
                  minWidth: "unset",
                  minheight: "unset"
              }
          };
          this.uiActionCardImage = {};
          this.uiActionCardImageWrapper = {
              style: {
                  width: "0px",
                  visibility: "hidden"
              },
              styleNS: {
                  width: "25%",
                  visibility: "visible"
              }
          };
          this.uiActionCardLines = {};
          this.uiItemListContainer = {
              classes: "flex-auto overflow-x-hidden overflow-y-auto"
          };
          this.uiItemTableContainer = {
              classes: "flex-auto overflow-x-hidden overflow-y-auto pa2"
          };
          this.uiItemGridContainer = {
              classes: "flex-auto overflow-x-hidden overflow-y-auto"
          };
          this.uiItemRowWrapper = {
              classes: "flex flex-column flex-row-ns ma2 pv2 bb b--black-20"
          };
          this.uiItemRowInnerWrapper = {
              classes: "flex-auto flex flex-row items-center pointer",
              style: {
                  color: "black"
              }
          };
          this.uiItemRowHeaderWrapper = {
              classes: "flex-auto"
          };
          this.uiItemRowActions = {
              classes: "flex flex-wrap items-center justify-end pl2 nl1 nr1"
          };
          this.uiItemButtonsWrapper = {};
          this.uiItemButtonsInnerWrapper = {};
          this.uiItemActionButton = {
              classes: "pa1 mr2"
          };
          this.uiItemIcon = {};
          this.uiItemHeading = {};
          this.uiItemSubheading = {
              classes: "flex flex-wrap nr1 nb1 nl1 f6 ws-normal",
              style: {
                  color: UIStyleColors.text.body
              }
          };
          this.uiBlockLinesWrapper = {};
          this.uiDataCardCategoryLabel = {
              style: {
                  marginLeft: 'auto',
                  borderRadius: '1rem',
                  padding: '0.3rem 1rem',
                  background: UIStyleColors.background.info,
                  color: UIStyleColors.text.info,
                  alignSelf: 'center',
                  textTransform: 'uppercase',
                  fontWeight: '300',
              }
          };
          this.uiDataCardHeader = {
              style: {
                  color: 'black',
                  fontWeight: '400',
                  fontSize: '2rem',
              }
          };
          this.uiDataCardHeaderWrapper = {
              classes: "flex flex-row",
              style: {
                  marginBottom: '1rem',
                  color: 'black',
              }
          };
          this.uiDataCardSectionItemLabel = {
              style: {
                  color: '#6e7174',
                  fontWeight: '300',
                  marginRight: '1rem',
                  minWidth: '9rem',
              }
          };
          this.uiDataCardSectionItemValue = {
              style: {
                  color: '#999999',
                  fontWeight: '200',
                  marginBottom: '0.5rem',
              }
          };
          this.uiDataCardSectionItemWrapper = {
              style: {
                  display: 'inline',
                  marginBottom: '0.5rem',
              },
              styleNS: {
                  display: 'flex',
                  flexDirection: 'row',
              },
              styleM: {
                  display: 'flex',
                  flexDirection: 'row',
              }
          };
          this.uiDataCardSectionLabel = {
              style: {
                  color: 'black',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem'
              }
          };
          this.uiDataCardSectionWrapper = {
              style: {
                  marginBottom: '2rem',
              }
          };
          this.uiDataCardWrapper = {
              style: {
                  background: 'white',
                  boxShadow: '0px 0px 2px 2px #ebf0f5',
                  height: '100%',
                  width: '100%',
                  padding: '2rem',
                  fontSize: '1rem',
                  maxWidth: '64rem',
                  margin: '2rem',
              }
          };
      }
      return UIStyleDefaults;
  }());

  var translationMap = {
      layoutBackground: "uiLayout.style.background",
      layoutLShadow: "uiLayout.styleL.boxShadow",
      layoutLMaxWidth: "uiLayout.styleL.maxWidth",
      bodyText: "colors.text.body",
      bodyFontSize: "body.style.fontSize",
      bodyFontWeight: "body.style.fontWeight",
      background: "colors.background.default",
      highlight: "colors.text.highlight",
      text: "colors.text.default",
      icon: "uiIcon.style.color",
      altText: "colors.text.alt",
      logoMargin: "uiLogo.style.margin",
      logoBackground: "uiLogo.style.background",
      logoBorderRadius: "uiLogo.style.borderRadius",
      logoStyle: "uiLogo.style",
      headerHeight: "uiHeader.style.height",
      headerBackground: "uiHeader.style.background",
      headerText: "uiHeader.style.color",
      subheadingText: "colors.text.subheading",
      headerBorderBottom: "uiHeader.style.borderBottom",
      headerBorderRadius: "uiHeader.style.borderRadius",
      headerBoxShadow: "uiHeaderWrapper.style.boxShadow",
      headerMargin: "uiHeader.style.margin",
      subheaderHeight: "uiSubheader.style.height",
      subheaderBackground: "uiSubheader.style.background",
      subheaderText: "uiSubheader.style.color",
      subheaderBorderBottom: "uiSubheader.style.borderBottom",
      subheaderBorderRadius: "uiSubheader.style.borderRadius",
      subheaderBoxShadow: "uiSubheader.style.boxShadow",
      subheaderMargin: "uiSubheader.style.margin",
      cardStyle: "uiCardWrapper.style",
      cardHeight: "uiCardWrapper.style.height",
      cardWidth: "uiCardWrapper.style.width",
      cardHeightNs: "uiCardWrapper.styleNS.height",
      cardWidthNs: "uiCardWrapper.styleNS.width",
      cardText: "uiCardWrapper.style.color",
      cardFlex: "uiCardWrapper.classes",
      cardBackground: "uiCardWrapper.style.background",
      cardBorderRadius: "uiCardWrapper.style.borderRadius",
      cardShadow: "uiCardWrapper.style.boxShadow",
      cardHeaderFontSize: "uiCardHeader.style.fontSize",
      cardHeaderStyle: "uiCardHeader.style",
      cardSubheadingFontSize: "uiCardSubheading.style.fontSize",
      cardSubheadingStyle: "uiCardSubheading.style",
      cardIconStyle: "uiCardIcon.style",
      cardImageStyle: "uiCardImage.style",
      panelBackground: "uiPanel.style.background",
      panelBorderRadius: "uiPanel.style.borderRadius",
      loginStyle: "uiLogin.style",
      footerHeight: "uiFooter.style.height",
      footerBackground: "uiFooter.style.background",
      footerText: "uiFooter.style.color",
      lineHeight: "uiInput.style.lineHeight",
      buttonBackground: "uiButton.style.background",
      buttonText: "uiButton.style.color",
      buttonPadding: "uiButton.style.padding",
      buttonBorder: "uiButton.style.padding",
      buttonBorderRadius: "uiButton.style.borderRadius",
      altButtonBackground: "uiAltButton.style.background",
      altButtonText: "uiAltButton.style.color",
      altButtonPadding: "uiAltButton.style.padding",
      altButtonBorder: "uiAltButton.style.borderBottom",
      altButtonBorderRadius: "uiAltButton.style.borderRadius",
      tableFontSize: "uiTable.style.fontSize",
      tableFontSizeNs: "uiTable.styleNS.fontSize",
      tableFontWeight: "uiTable.style.fontWeight",
      tableHeaderBackground: "uiTableHeader.style.background",
      tableHeaderText: "uiTableHeader.style.background",
      tableHeaderFontWeight: "uiTableHeader.style.fontWeight",
      tableRowText: "uiTableRow.style.color",
      tableRowFontSize: "uiTableRow.style.fontSize",
      tableRowFontWeight: "uiTableRow.style.fontWeight",
      primaryBackground: "colors.background.primary",
      primaryText: "colors.text.primary",
      logoutButtonIconColor: "uiLogoutButtonIcon.style.color",
      logoutButtonLabelColor: "uiLogoutButtonLabel.style.color",
      bgInfo: "uiDialogContextInfo.style.background",
      txtInfo: "uiDialogContextInfo.style.color",
      bgWarn: "uiDialogContextWarn.style.background",
      txtWarn: "uiDialogContextWarn.style.color",
      bgError: "uiDialogContextError.style.background",
      txtError: "uiDialogContextError.style.color",
      bgBasic: "uiDialogContextBasic.style.background",
      txtBasic: "uiDialogContextBasic.style.color",
      inpBrdClass: "uiInput.style.classes",
      button: "uiButton.classes",
      gridFlex: "uiCardGroup.classes",
      cardHeader: "uiCardHeader.classes",
      cardSubheading: "uiCardSubheading.classes",
      cardIcon: "uiCardIcon.classes",
      cardImage: "uiCardImage.classes",
      cardCounter: "uiCardCounter.classes",
      loginForm: "uiLoginForm.classes",
  };
  function translateLegacyStyles(style) {
      return lodash__default['default'].reduce(style, function (acc, value, key) {
          if (key in translationMap) {
              lodash__default['default'].set(acc, translationMap[key], value);
          }
          else {
              acc[key] = value;
          }
          return acc;
      }, {});
  }

  function updateUIStyleColors(styleOptions) {
      if (styleOptions.background) {
          UIStyleColors.background = styleOptions.background;
      }
      if (styleOptions.text) {
          UIStyleColors.text = styleOptions.text;
      }
  }
  function combineStyles(styleOptions) {
      var styleWithTranslations = translateLegacyStyles(styleOptions);
      if (styleWithTranslations.colors) {
          updateUIStyleColors(styleWithTranslations.colors);
      }
      var defaults = new UIStyleDefaults();
      return lodash__default['default'].merge(defaults, styleWithTranslations);
  }
  function buildUIStyleClasses(styleOptions, uiSheet) {
      var combined = combineStyles(styleOptions);
      var accumulator = {};
      return lodash__default['default'].reduce(combined, function (acc, value, key) {
          if (key !== "colors") {
              acc[key] = createResponsiveClass(lodash__default['default'].assign({ key: key }, value), uiSheet);
          }
          return acc;
      }, accumulator);
  }
  function buildUIColorClasses() {
      var _b = b$1;
      return {
          text: lodash__default['default'].reduce(UIStyleColors.text, function (acc, value, key) {
              acc[key] = _b.c(value).class;
              return acc;
          }, {}),
          background: lodash__default['default'].reduce(UIStyleColors.background, function (acc, value, key) {
              acc[key] = _b.c(value).class;
              return acc;
          }, {})
      };
  }
  var classMap = {
      button: "",
      gridFlex: "",
      cardFlex: "",
      cardHeader: "",
      cardSubheading: "",
      cardIcon: "",
      cardImage: "",
      cardCounter: "",
      loginForm: ""
  };
  function buildTheme(_a) {
      var _c = _a.layoutBackground, layoutBackground = _c === void 0 ? "transparent" : _c, _d = _a.layoutLMaxWidth, layoutLMaxWidth = _d === void 0 ? "64rem" : _d, _e = _a.layoutLShadow, layoutLShadow = _e === void 0 ? "" : _e, _f = _a.bodyText, bodyText = _f === void 0 ? "#333333" : _f, _g = _a.bodyFontSize, bodyFontSize = _g === void 0 ? "1.25rem" : _g, _h = _a.bodyFontWeight, bodyFontWeight = _h === void 0 ? "200" : _h, _j = _a.background, background = _j === void 0 ? "#0974c0" : _j, _k = _a.highlight, highlight = _k === void 0 ? "unset" : _k, _l = _a.text, text = _l === void 0 ? "#0974c0" : _l, _m = _a.icon, icon = _m === void 0 ? text : _m, _o = _a.altText, altText = _o === void 0 ? "white" : _o, _p = _a.logoMargin, logoMargin = _p === void 0 ? "0.5rem" : _p, _q = _a.logoBackground, logoBackground = _q === void 0 ? "transparent" : _q, _r = _a.logoBorderRadius, logoBorderRadius = _r === void 0 ? ".25rem" : _r, _s = _a.logoStyle, logoStyle = _s === void 0 ? { position: "relative" } : _s, _t = _a.headerHeight, headerHeight = _t === void 0 ? "3rem" : _t, _u = _a.headerBackground, headerBackground = _u === void 0 ? background : _u, _v = _a.headerBorderBottom, headerBorderBottom = _v === void 0 ? "none" : _v, _w = _a.headerBorderRadius, headerBorderRadius = _w === void 0 ? "0px" : _w, _x = _a.headerBoxShadow, headerBoxShadow = _x === void 0 ? "0px" : _x, _y = _a.headerText, headerText = _y === void 0 ? altText : _y, _z = _a.subheadingText, subheadingText = _z === void 0 ? "rgba(0,0,0,.5)" : _z, _0 = _a.subheaderHeight, subheaderHeight = _0 === void 0 ? "3rem" : _0, _1 = _a.subheaderBackground, subheaderBackground = _1 === void 0 ? background : _1, _2 = _a.subheaderBorderBottom, subheaderBorderBottom = _2 === void 0 ? "none" : _2, _3 = _a.subheaderBorderRadius, subheaderBorderRadius = _3 === void 0 ? "0px" : _3, _4 = _a.subheaderBoxShadow, subheaderBoxShadow = _4 === void 0 ? "0px" : _4, _5 = _a.subheaderMargin, subheaderMargin = _5 === void 0 ? "0px" : _5, _6 = _a.subheaderText, subheaderText = _6 === void 0 ? altText : _6, _7 = _a.cardStyle, cardStyle = _7 === void 0 ? {} : _7, _8 = _a.cardHeight, cardHeight = _8 === void 0 ? "12em" : _8, _9 = _a.cardWidth, cardWidth = _9 === void 0 ? "12em" : _9, _10 = _a.cardHeightNs, cardHeightNs = _10 === void 0 ? cardHeight : _10, _11 = _a.cardWidthNs, cardWidthNs = _11 === void 0 ? cardWidth : _11, _12 = _a.cardText, cardText = _12 === void 0 ? altText : _12, _13 = _a.cardBackground, cardBackground = _13 === void 0 ? background : _13, _14 = _a.cardBorderRadius, cardBorderRadius = _14 === void 0 ? "0px" : _14, _15 = _a.cardShadow, cardShadow = _15 === void 0 ? "unset" : _15, _16 = _a.cardHeaderStyle, cardHeaderStyle = _16 === void 0 ? {} : _16, _17 = _a.cardHeaderFontSize, cardHeaderFontSize = _17 === void 0 ? "1.25rem" : _17, _18 = _a.cardSubheadingStyle, cardSubheadingStyle = _18 === void 0 ? {} : _18, _19 = _a.cardSubheadingFontSize, cardSubheadingFontSize = _19 === void 0 ? "1.25rem" : _19, _20 = _a.cardIconStyle, cardIconStyle = _20 === void 0 ? {} : _20, _21 = _a.cardImageStyle, cardImageStyle = _21 === void 0 ? {} : _21, _22 = _a.panelBackground, panelBackground = _22 === void 0 ? "transparent" : _22, _23 = _a.panelBorderRadius, panelBorderRadius = _23 === void 0 ? ".25rem" : _23, _24 = _a.loginStyle, loginStyle = _24 === void 0 ? {} : _24, 
      // .bg-near-white
      _25 = _a.footerHeight, 
      // .bg-near-white
      footerHeight = _25 === void 0 ? "3rem" : _25, _26 = _a.footerBackground, footerBackground = _26 === void 0 ? "#F4F4F4" : _26, _27 = _a.footerText, footerText = _27 === void 0 ? "#999" : _27, _28 = _a.lineHeight, lineHeight = _28 === void 0 ? "1.9em" : _28, _29 = _a.buttonBackground, buttonBackground = _29 === void 0 ? background : _29, _30 = _a.buttonText, buttonText = _30 === void 0 ? altText : _30, _31 = _a.buttonPadding, buttonPadding = _31 === void 0 ? ".5rem" : _31, _32 = _a.buttonBorder, buttonBorder = _32 === void 0 ? "none" : _32, _33 = _a.buttonBorderRadius, buttonBorderRadius = _33 === void 0 ? ".25rem" : _33, _34 = _a.altButtonBackground, altButtonBackground = _34 === void 0 ? buttonBackground : _34, _35 = _a.altButtonText, altButtonText = _35 === void 0 ? buttonText : _35, _36 = _a.altButtonPadding, altButtonPadding = _36 === void 0 ? buttonPadding : _36, _37 = _a.altButtonBorder, altButtonBorder = _37 === void 0 ? buttonBorder : _37, _38 = _a.altButtonBorderRadius, altButtonBorderRadius = _38 === void 0 ? buttonBorderRadius : _38, _39 = _a.tableFontSize, tableFontSize = _39 === void 0 ? bodyFontSize : _39, _40 = _a.tableFontSizeNs, tableFontSizeNs = _40 === void 0 ? bodyFontSize : _40, _41 = _a.tableFontWeight, tableFontWeight = _41 === void 0 ? bodyFontWeight : _41, _42 = _a.tableHeaderBackground, tableHeaderBackground = _42 === void 0 ? background : _42, _43 = _a.tableHeaderText, tableHeaderText = _43 === void 0 ? altText : _43, _44 = _a.tableHeaderFontWeight, tableHeaderFontWeight = _44 === void 0 ? "400" : _44, _45 = _a.tableRowText, tableRowText = _45 === void 0 ? bodyText : _45, _46 = _a.tableRowFontSize, tableRowFontSize = _46 === void 0 ? tableFontSize : _46, _47 = _a.tableRowFontWeight, tableRowFontWeight = _47 === void 0 ? bodyFontWeight : _47, _48 = _a.logoutButtonIconColor, logoutButtonIconColor = _48 === void 0 ? "inherit" : _48, _49 = _a.logoutButtonLabelColor, logoutButtonLabelColor = _49 === void 0 ? "inherit" : _49, 
      // .bg-dark-green, .white
      _50 = _a.primaryBackground, 
      // .bg-dark-green, .white
      primaryBackground = _50 === void 0 ? buttonBackground : _50, _51 = _a.primaryText, primaryText = _51 === void 0 ? buttonText : _51, 
      // .bg-blue, .white
      _52 = _a.bgInfo, 
      // .bg-blue, .white
      bgInfo = _52 === void 0 ? "#357EDD" : _52, _53 = _a.txtInfo, txtInfo = _53 === void 0 ? "#FFFFFF" : _53, 
      // .bg-yellow, .near-black
      _54 = _a.bgWarn, 
      // .bg-yellow, .near-black
      bgWarn = _54 === void 0 ? "#FFD700" : _54, _55 = _a.txtWarn, txtWarn = _55 === void 0 ? "#111111" : _55, 
      // .bg-dark-red, .white
      _56 = _a.bgError, 
      // .bg-dark-red, .white
      bgError = _56 === void 0 ? "#E7040F" : _56, _57 = _a.txtError, txtError = _57 === void 0 ? "#FFFFFF" : _57, 
      // .white
      _58 = _a.bgBasic, 
      // .white
      bgBasic = _58 === void 0 ? "#FFFFFF" : _58, _59 = _a.txtBasic, txtBasic = _59 === void 0 ? bodyText : _59, 
      // ui-widgets classes
      //inpBrdClass = "bn",
      // CSS options
      _60 = _a.button, 
      // ui-widgets classes
      //inpBrdClass = "bn",
      // CSS options
      button = _60 === void 0 ? "shadow-4" : _60, _61 = _a.gridFlex, gridFlex = _61 === void 0 ? "flex flex-wrap justify-center" : _61, _62 = _a.cardFlex, cardFlex = _62 === void 0 ? "flex flex-column items-center" : _62, _63 = _a.cardHeader, cardHeader = _63 === void 0 ? "flex-auto ma2 tc" : _63, _64 = _a.cardSubheading, cardSubheading = _64 === void 0 ? "ma2 pv1 ph2" : _64, _65 = _a.cardIcon, cardIcon = _65 === void 0 ? "fal fa-fw fa-4x ma2" : _65, _66 = _a.cardImage, cardImage = _66 === void 0 ? "img ma2" : _66, _67 = _a.cardCounter, cardCounter = _67 === void 0 ? "nt1 nr1 top-0 right-0" : _67, _68 = _a.loginForm, loginForm = _68 === void 0 ? "measure-wide center" : _68;
      var mediaNs = "screen and (min-width:30em)";
      var mediaL = "screen and (min-width:60em)";
      // TODO Create bss.d.ts file for community
      var _b = b$1;
      // Create helper classes
      b$1.helper({
          agGrid: _b.$nest(".ag-header", _b({ background: tableHeaderBackground + " !important" })).$nest(".ag-tooltip-hiding", _b({ opacity: "0" })),
          bgBranding: _b({ background: background }),
          branding: _b.color(text),
          icon: _b.color(icon),
          brandingAlt: _b.color(altText),
          // Body
          bgLayout: _b({ background: layoutBackground }),
          layoutL: _b.$media(mediaL, _b({
              "max-width": layoutLMaxWidth,
              "box-shadow": layoutLShadow
          })),
          body: _b({
              "color": bodyText,
              "font-size": bodyFontSize,
              "font-weight": bodyFontWeight
          }),
          // Logo
          marginLogo: _b.m(logoMargin),
          bgLogo: _b({ background: logoBackground }),
          brdLogo: _b.br(logoBorderRadius),
          styleLogo: _b(lodash__default['default'].assign({}, logoStyle)),
          // Header
          headerHeight: _b.h(headerHeight),
          bgHeader: _b({ background: headerBackground }),
          bbHeader: _b({ "border-bottom": headerBorderBottom }),
          brdHeader: _b.br(headerBorderRadius),
          boxShadowHeader: _b({ "box-shadow": headerBoxShadow }),
          header: _b.c(headerText),
          subheading: _b.c(subheadingText),
          //SubHeader
          subheader: _b.c(subheaderText),
          subheaderHeight: _b.h(subheaderHeight),
          subheaderMargin: _b.m(subheaderMargin),
          bgSubheader: _b({ background: subheaderBackground }),
          bbSubheader: _b({ "border-bottom": subheaderBorderBottom }),
          brdSubheader: _b.br(subheaderBorderRadius),
          boxShadowSubheader: _b({ "box-shadow": subheaderBoxShadow }),
          // Card
          cardStyle: _b(cardStyle),
          cardSize: _b.h(cardHeight).w(cardWidth)
              .$media(mediaNs, _b.h(cardHeightNs).w(cardWidthNs)),
          card: _b.c(cardText),
          bgCard: _b({ background: cardBackground }),
          brdCard: _b.br(cardBorderRadius),
          shadowCard: _b({ "box-shadow": cardShadow }),
          // Card chile elements
          cardHead: _b(cardHeaderStyle).fs(cardHeaderFontSize),
          cardSub: _b(cardSubheadingStyle).fs(cardSubheadingFontSize),
          cardIcon: _b(cardIconStyle),
          cardImage: _b(cardImageStyle),
          // TODO cardSub font, bg, border
          // Panel
          bgPanel: _b({ background: panelBackground }),
          brdPanel: _b.br(panelBorderRadius),
          // Login form
          loginStyle: _b(loginStyle),
          // Logout Button
          lgBtnIconColor: _b.c(logoutButtonIconColor),
          lgBtnLabelColor: _b.c(logoutButtonLabelColor),
          // Footer
          footerHeight: _b.h(footerHeight),
          bgFooter: _b({ background: footerBackground }),
          footer: _b.c(footerText),
          // Input
          inputHeight: _b.h(lineHeight),
          inputFocus: _b({ ":focus": { "border-color": highlight } }),
          // Document overlay
          interactive: _b({
              ":hover": {
                  // "outline": "solid 0.125rem",
                  "box-shadow": "0 0 0.125rem 0 " + buttonBackground
              }
          }),
          // Table
          tFont: _b({
              "font-size": tableFontSize,
              "font-weight": tableFontWeight
          })
              .$media(mediaNs, _b({ "font-size": tableFontSizeNs })),
          bgThead: _b({ background: tableHeaderBackground }),
          thead: _b({
              "color": tableHeaderText,
              "font-weight": tableHeaderFontWeight
          }),
          tRow: _b({
              "color": tableRowText,
              "font-size": tableRowFontSize,
              "font-weight": tableRowFontWeight
          }),
          // Button
          bgButton: _b({ background: buttonBackground }),
          button: _b.c(buttonText),
          padButton: _b.p(buttonPadding),
          brdButton: _b({ border: buttonBorder }).br(buttonBorderRadius),
          // Alt button
          bgButtonAlt: _b({ background: altButtonBackground }),
          buttonAlt: _b.c(altButtonText),
          padButtonAlt: _b.p(altButtonPadding),
          brdButtonAlt: _b({ border: altButtonBorder }).br(altButtonBorderRadius),
          // Contextual classes
          bgPrimary: _b({ background: primaryBackground }),
          primary: _b.c(primaryText),
          bgInfo: _b({ background: bgInfo }),
          info: _b.c(txtInfo),
          bgWarn: _b({ background: bgWarn }),
          warn: _b.c(txtWarn),
          bgError: _b({ background: bgError }),
          error: _b.c(txtError),
          bgBasic: _b({ background: bgBasic }),
          basic: _b.c(txtBasic)
      });
      // Update CSS classes
      lodash__default['default'].assign(classMap, {
          button: button,
          gridFlex: gridFlex,
          cardFlex: cardFlex,
          cardHeader: cardHeader,
          cardSubheading: cardSubheading,
          cardIcon: cardIcon,
          cardImage: cardImage,
          cardCounter: cardCounter,
          loginForm: loginForm
      });
  }

  var theme = stream__default['default']();
  var colors = stream__default['default']();
  var uiSheet = jss__default['default'].createStyleSheet({});
  function applyTheme(newTheme) {
      theme(buildUIStyleClasses(newTheme, uiSheet));
      // IMPORTANT buildUIColorClasses must be executed after buildUIStyleClasses
      colors(buildUIColorClasses());
      // Apply body style classes
      document.body.classList.add(theme().body);
  }
  function loadTheme() {
      var path = application().themePath;
      return path
          ? m.request(path).then(function (themeObj) {
              buildTheme(themeObj);
              applyTheme(themeObj);
              applyThemeUiWidgets();
          }).catch(defaultTheme)
          : defaultTheme();
  }
  function defaultTheme() {
      buildTheme({});
      applyTheme({});
      applyThemeUiWidgets();
      return Promise.resolve();
  }
  function applyThemeUiWidgets() {
      var _b = b$1;
      // Apply theme to ui-widgets
      uiWidgets.updateTheme({
          icon: "fas",
          lblCol: colors().text.default,
          inpHgt: b$1.inputHeight.class,
          inpBrd: theme().uiInput + " " + b$1.inputFocus.class,
          // TODO Apply the bss responsive class as btnBg -
          // rework uiWidget theme interface to reflect new theme interface
          btnBg: theme().uiButton + " " + b$1.bgButton.class + " ripple",
          btnCol: b$1.button.class,
          btnPad: b$1.padButton.class,
          btnBrd: b$1.brdButton.class
      });
      // Add ui-widgets theme().uiButton context presets
      uiWidgets.updateButtonContext({
          alt: theme().uiAltButton + " " + theme().uiButton + " " + b$1.bgButtonAlt.buttonAlt.padButtonAlt.brdButtonAlt.class + " ripple",
          info: theme().uiButtonInfo + " " + theme().uiButton + " " + _b({ border: "1px solid " + colors().text.info })
              .br(b$1.brdButton.style.borderRadius)
              .padButton.info.bgInfo.class + " ripple",
          warn: theme().uiButtonWarn + " " + theme().uiButton + " " + _b({ border: "1px solid " + colors().text.warning })
              .br(b$1.brdButton.style.borderRadius)
              .padButton.warn.bgWarn.class + " ripple",
          error: theme().uiButtonError + " " + theme().uiButton + " " + _b({ border: "1px solid " + colors().text.error })
              .br(b$1.brdButton.style.borderRadius)
              .padButton.error.bgError.class + " ripple"
      });
  }

  var size = stream__default['default']();
  function setSize() {
      size({
          height: window.innerHeight,
          width: window.innerWidth
      });
  }
  function onResize() {
      setSize();
      m.redraw();
  }
  // Update window size stream after a small delay
  window.addEventListener("resize", lodash__default['default'].debounce(onResize, 250));
  // Set initial size
  setSize();

  var homeRoute = "/root/list?noreturn=true";
  function home() {
      m.route.set(homeRoute);
  }
  function back() {
      history.back();
  }
  function redirect(_a) {
      var url = _a.url;
      window.location.href = url;
  }
  function reload() {
      window.location.reload();
  }
  function noreturn() {
      return Boolean(m.route.param("noreturn"));
  }
  function getFirstFile(item) {
      return lodash__default['default'].head(item.files);
  }
  function actionItem(data, action, actionId, opts) {
      // Navigate to file
      if (action === "open" /* open */) {
          var item = data;
          // Handle special document "open" action
          var fileObj = getFirstFile(item);
          if (fileObj && fileObj.remoteUrl) {
              window.location.href = fileObj.remoteUrl;
          }
          var url = lodash__default['default'].get(item.props, "url");
          if (typeof url === "string") {
              window.location.href = url;
          }
          return;
      }
      // Validate PDF viewer requests
      if (action === "pdf" /* pdf */) {
          var fileObj = getFirstFile(data);
          // Open files if they are not pdf (or unsupported IE11)
          if (isIE11 || fileObj && fileObj.type.indexOf("pdf") === -1) {
              actionItem(data, "open" /* open */, actionId, opts);
              return;
          }
      }
      // Route to action with id
      if (actionId) {
          m.route.set("/:itemGuid/:action/:actionGuid", {
              itemGuid: data._id,
              action: action,
              actionGuid: actionId
          }, opts);
          return;
      }
      // Route to action
      m.route.set("/:itemGuid/:action", {
          itemGuid: data._id,
          action: action
      }, opts);
  }
  // Perform default action (model-defined) with given item
  function selectItem(_a, item, opts) {
      var action = _a.action;
      actionItem(item, action, undefined, opts);
  }
  // Perform "edit" action on given item
  function editItem(item, opts) {
      actionItem(item, "edit" /* edit */, undefined, opts);
  }
  function newItem(_a, opts) {
      var _id = _a._id;
      m.route.set("/:modelGuid/new", {
          modelGuid: _id
      }, opts);
  }
  function relogin() {
      return new Promise(function (resolve) { return dialog({
          title: "Your session has expired",
          message: "Please login again to continue",
          context: exports.ToastContext.basic,
          type: exports.DialogType.login,
          login: {
              onSuccess: resolve
          }
      }); });
  }
  function requestHelper(options) {
      return new Promise(function (resolve, reject) {
          m.request(options).then(resolve).catch(function (err) {
              if (err.code === 440) {
                  relogin().then(function () { return resolve(sdxRequest(options)); });
              }
              else {
                  reject(err);
              }
          });
      });
  }
  function sdxRequest(urlOrOpts, options) {
      if (typeof urlOrOpts === "string") {
          return requestHelper(lodash__default['default'].extend(options, { url: urlOrOpts }));
      }
      else {
          return requestHelper(urlOrOpts);
      }
  }
  function resetAuth(shortid, fullid) {
      var auth = application().auth;
      if (auth && auth.reset) {
          var _a = auth.reset, username = _a.username, endpoint = _a.endpoint;
          var body = new FormData();
          body.append("username", username);
          body.append("password", shortid);
          return m.request({
              method: "POST",
              url: endpoint,
              body: body
          }).then(function () { return dialog({
              message: "We have sent your new PIN to " + fullid,
              duration: 2000
          }); }).catch(function (err) { return errNotification(err); });
      }
      else {
          return Promise.resolve(errNotification(new Error("No authentication configuration")));
      }
  }

  var ActionCard = /** @class */ (function () {
      function ActionCard() {
      }
      ActionCard.prototype.oninit = function (_a) {
          var applyTheme = _a.attrs.data.applyTheme;
          if (applyTheme) {
              this.themeHandler = new ResponsiveThemeHandler(applyTheme);
          }
      };
      ActionCard.prototype.view = function (_a) {
          var _b;
          var _c = _a.attrs.data, src = _c.src, header = _c.header, lines = _c.lines, _d = _c.linesAsList, linesAsList = _d === void 0 ? false : _d, buttonLabel = _c.buttonLabel, buttonIcon = _c.buttonIcon, href = _c.href, target = _c.target, buttonContext = _c.buttonContext;
          var overwrite = (_b = this.themeHandler) === null || _b === void 0 ? void 0 : _b.classes;
          return m__default['default'](".flex.items-center.justify-center.w-100.overflow-hidden.ma3", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiActionCardWrapper,
                  theme().uiActionCardWrapper,
                  theme().uiCardWrapper
              ])
          }, m__default['default'](".flex.w-100.h-100.pa2", m__default['default'](".flex.flex-column.h-100.mr4", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiActionCardInnerWrapper,
                  theme().uiActionCardInnerWrapper
              ])
          }, m__default['default']('h4.w-100.flex-auto', {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiActionCardHeader,
                  theme().uiActionCardHeader,
                  theme().uiCardHeader
              ])
          }, header), m__default['default'](".w-100.flex-auto", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiActionCardLines,
                  theme().uiActionCardLines
              ])
          }, linesAsList
              ? m__default['default']("ul", lodash__default['default'].map(lines, function (line) { return m__default['default']("li", line); }))
              : lodash__default['default'].map(lines, function (line) { return m__default['default']("p", line); })), href || buttonLabel ? m__default['default'](uiWidgets.ButtonLink, {
              classes: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiActionCardButton,
                  theme().uiActionCardButton,
                  theme().uiButton
              ]),
              label: buttonLabel,
              icon: buttonIcon,
              context: buttonContext,
              href: href,
              target: target
          }) : null), src ? m__default['default'](".flex.justify-center.items-center", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiActionCardImageWrapper,
                  theme().uiActionCardImageWrapper
              ]),
          }, m__default['default']("img", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiActionCardImage,
                  theme().uiActionCardImage
              ]),
              src: src
          })) : null));
      };
      return ActionCard;
  }());

  function buildPart(part) {
      if (typeof part === "string") {
          return m__default['default']("p", part);
      }
      else if (part.hasOwnProperty("selector")) {
          var tag = part;
          return m__default['default'](tag.selector, tag.content);
      }
      else {
          var link = part;
          return m__default['default']("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer", {
              href: link.href,
              class: theme().uiButton
          }, link.text);
      }
  }
  // Wrapper class for basic part building function
  var Basic = /** @class */ (function () {
      function Basic() {
      }
      Basic.prototype.view = function (_a) {
          var data = _a.attrs.data;
          return m__default['default'](".ph4", lodash__default['default'].map(data, function (part) { return buildPart(part); }));
      };
      return Basic;
  }());

  // Wrapper class for basic part building function
  var Header = /** @class */ (function () {
      function Header() {
      }
      Header.prototype.view = function (_a) {
          var text = _a.attrs.data.text;
          return m__default['default'](".f3.f2-l.fw5.mv3.mv4-l", { class: colors().text.default }, text);
      };
      return Header;
  }());

  var BlockLines = /** @class */ (function () {
      function BlockLines() {
      }
      BlockLines.prototype.oninit = function (_a) {
          var _b = _a.attrs.data, textColor = _b.textColor, bgColor = _b.bgColor, _c = _b.applyTheme, applyTheme = _c === void 0 ? {
              uiBlockLinesWrapper: {
                  style: {
                      color: textColor ? colors().text[textColor] : colors().text.body,
                      background: bgColor ? colors().background[bgColor] : colors().background.default
                  }
              }
          } : _c;
          if (applyTheme) {
              this.themeHandler = new ResponsiveThemeHandler(applyTheme);
          }
      };
      BlockLines.prototype.view = function (_a) {
          var _b;
          var _c = _a.attrs.data, _d = _c.lines, lines = _d === void 0 ? [] : _d, _e = _c.blockSelector, blockSelector = _e === void 0 ? "div" : _e;
          var overwrite = (_b = this.themeHandler) === null || _b === void 0 ? void 0 : _b.classes;
          return m__default['default'](blockSelector, {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiBlockLinesWrapper,
                  theme().uiBlockLinesWrapper,
              ])
          }, lodash__default['default'].map(lines, function (line) {
              if (typeof line === "string") {
                  return m__default['default']("p", m__default['default'].trust(line));
              }
              else {
                  return m__default['default'](line.selector, {
                      class: joinClasses([
                          line.classes,
                          line.colorSelector ? colors().text[line.colorSelector] : "",
                          line.bgColorSelector ? colors().background[line.bgColorSelector] : "",
                      ]),
                  }, m__default['default'].trust(line.child));
              }
          }));
      };
      return BlockLines;
  }());

  var Wrapper = /** @class */ (function () {
      function Wrapper() {
      }
      Wrapper.prototype.view = function (_a) {
          var _b = _a.attrs.data, children = _b.children, style = _b.style, styleNS = _b.styleNS, styleM = _b.styleM, styleL = _b.styleL, classes = _b.classes, key = _b.key;
          var className = createResponsiveClass({ key: key, style: style, styleNS: styleNS, styleM: styleM, styleL: styleL, classes: classes });
          return m__default['default']("div", {
              class: className
          }, lodash__default['default'].map(children, function (child) {
              return typeof child === 'string' ? child : buildComponent(child);
          }));
      };
      return Wrapper;
  }());

  var DataCardSectionItem = /** @class */ (function () {
      function DataCardSectionItem() {
      }
      DataCardSectionItem.prototype.view = function (_a) {
          var _b = _a.attrs, itemLabel = _b.itemLabel, value = _b.value, overwrite = _b.overwrite;
          return m__default['default']("div", {
              class: joinClasses([
                  theme().uiDataCardSectionItemWrapper,
              ])
          }, m__default['default']("span", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionItemLabel,
                  theme().uiDataCardSectionItemLabel
              ])
          }, itemLabel), typeof value === "string"
              ? m__default['default']("div", {
                  class: joinClasses([
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionItemValue,
                      theme().uiDataCardSectionItemValue
                  ])
              }, value)
              : m__default['default']("div", lodash__default['default'].map(value, function (line) {
                  return m__default['default']("div", {
                      class: joinClasses([
                          overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionItemValue,
                          theme().uiDataCardSectionItemValue
                      ])
                  }, line);
              })));
      };
      return DataCardSectionItem;
  }());

  var DataCardSection = /** @class */ (function () {
      function DataCardSection() {
      }
      DataCardSection.prototype.view = function (_a) {
          var _b = _a.attrs, dataMap = _b.dataMap, keys = _b.keys, label = _b.label, overwrite = _b.overwrite;
          return m__default['default']("div", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionWrapper,
                  theme().uiDataCardSectionWrapper
              ])
          }, label ? m__default['default']("div", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionLabel,
                  theme().uiDataCardSectionLabel
              ])
          }, label) : null, lodash__default['default'].map(keys, function (key) {
              if (!dataMap[key]) {
                  console.error('Valid dataMap keys are - ', keys);
                  throw "dataCard key " + key + " doesn't exist on your dataMap -- do you have typo?";
              }
              var _a = dataMap[key], itemLabel = _a[0], value = _a[1];
              return m__default['default'](DataCardSectionItem, { itemLabel: itemLabel, value: value, overwrite: overwrite });
          }));
      };
      return DataCardSection;
  }());

  var DataCard = /** @class */ (function () {
      function DataCard() {
          this.getDisplayComponents = function (_a) {
              var displayType = _a.displayType, detailed = _a.detailed, overview = _a.overview, overwrite = _a.overwrite, dataMap = _a.dataMap;
              if (displayType === "detailed" /* detailed */) {
                  return detailed
                      ? lodash__default['default'].map(detailed, function (_a) {
                          var label = _a.label, keys = _a.keys;
                          return m__default['default'](DataCardSection, { dataMap: dataMap, keys: keys, label: label, overwrite: overwrite });
                      })
                      : lodash__default['default'].map(dataMap, function (_a) {
                          var itemLabel = _a[0], value = _a[1];
                          return m__default['default'](DataCardSectionItem, { overwrite: overwrite, itemLabel: itemLabel, value: value });
                      });
              }
              else {
                  return overview
                      ? m__default['default'](DataCardSection, { dataMap: dataMap, keys: overview, label: "", overwrite: overwrite })
                      : lodash__default['default'].map(dataMap, function (_a) {
                          var itemLabel = _a[0], value = _a[1];
                          return m__default['default'](DataCardSectionItem, { overwrite: overwrite, itemLabel: itemLabel, value: value });
                      });
              }
          };
      }
      DataCard.prototype.oninit = function (_a) {
          var _b, _c;
          var data = _a.attrs.data;
          if ((_b = data === null || data === void 0 ? void 0 : data.config) === null || _b === void 0 ? void 0 : _b.applyTheme) {
              this.themeHandler = new ResponsiveThemeHandler((_c = data === null || data === void 0 ? void 0 : data.config) === null || _c === void 0 ? void 0 : _c.applyTheme);
          }
      };
      DataCard.prototype.view = function (_a) {
          var _b;
          var data = _a.attrs.data;
          var pre = data.pre, post = data.post, dataMap = data.dataMap, displayType = data.displayType, _c = data.config, config = _c === void 0 ? {} : _c;
          var header = config.header, categoryLabel = config.categoryLabel, detailed = config.detailed, overview = config.overview;
          var overwrite = (_b = this.themeHandler) === null || _b === void 0 ? void 0 : _b.classes;
          return m__default['default']("div", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardWrapper,
                  theme().uiDataCardWrapper,
                  theme().uiCardWrapper,
              ])
          }, header || categoryLabel ? m__default['default'](".flex.flex-row", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardHeaderWrapper,
                  theme().uiDataCardHeaderWrapper
              ])
          }, [
              header ? m__default['default']("span", {
                  class: joinClasses([
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardHeader,
                      theme().uiDataCardHeader
                  ])
              }, header) : null,
              categoryLabel ? m__default['default']("div", {
                  class: joinClasses([
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardCategoryLabel,
                      theme().uiDataCardCategoryLabel
                  ])
              }, categoryLabel) : null
          ]) : null, (pre === null || pre === void 0 ? void 0 : pre.length) ? lodash__default['default'].map(pre, buildComponent)
              : null, 
          //Render dataList
          this.getDisplayComponents({ displayType: displayType, detailed: detailed, overview: overview, overwrite: overwrite, dataMap: dataMap }), (post === null || post === void 0 ? void 0 : post.length) ? lodash__default['default'].map(post, buildComponent)
              : null);
      };
      return DataCard;
  }());

  function registerDefault() {
      registerComponent("basic", Basic);
      registerComponent("sdx-actionCard", ActionCard);
      registerComponent("sdx-header", Header);
      registerComponent("sdx-blockLines", BlockLines);
      registerComponent("sdx-wrapper", Wrapper);
      registerComponent("sdx-dataCard", DataCard);
  }

  // Application service creators
  var mockChannel = {
      bind: function () { return null; },
  };
  function pusherService(_a) {
      var mock = _a.mock, apiKey = _a.apiKey, cloudChannel = _a.cloudChannel, companyChannel = _a.companyChannel, userChannel = _a.userChannel, applicationChannel = _a.applicationChannel, applicationUserChannel = _a.applicationUserChannel;
      if (mock) {
          return {
              pusher: {
                  connection: {
                      bind: function (_evt, cb) { return setImmediate(cb); },
                      unbind: function () { return null; }
                  }
              },
              cloudChannel: mockChannel,
              companyChannel: mockChannel,
              userChannel: mockChannel,
              applicationChannel: mockChannel,
              applicationUserChannel: mockChannel
          };
      }
      var pusher = new Pusher__default['default'](apiKey, { cluster: "eu" });
      return {
          pusher: pusher,
          cloudChannel: pusher.subscribe(cloudChannel),
          companyChannel: pusher.subscribe(companyChannel),
          userChannel: pusher.subscribe(userChannel),
          applicationChannel: pusher.subscribe(applicationChannel),
          applicationUserChannel: pusher.subscribe(applicationUserChannel)
      };
  }

  var profile = stream__default['default']();
  function loadProfile() {
      var path = application().profilePath;
      return path
          ? m.request(path).then(profile).catch(lodash__default['default'].noop)
          : Promise.resolve();
  }

  function loadApplication(conf) {
      if (lodash__default['default'].isString(conf)) {
          return m.request(conf);
      }
      else {
          return Promise.resolve(conf);
      }
  }
  function loadThemeBranding() {
      return Promise.all([loadTheme(), loadBranding()]);
  }
  // Register default ui-builder custom components
  registerDefault();
  function bootstrap(appConf) {
      // Replace history state with page path, prevent entry from login POST requesting resubmission
      window.history.replaceState(null, "", window.location.href);
      // Initialise core components
      var pusher;
      return loadApplication(appConf)
          .then(function (app) {
          application(app);
          // Listen for common application-level messages
          pusher = pusherService(application().pusher);
          pusher.applicationUserChannel.bind("reload" /* reload */, reload);
          pusher.applicationUserChannel.bind("redirect" /* redirect */, redirect);
          pusher.cloudChannel.bind("reloadbranding" /* reloadBranding */, loadThemeBranding);
          pusher.companyChannel.bind("reloadbranding" /* reloadBranding */, loadThemeBranding);
          pusher.applicationChannel.bind("reloadbranding" /* reloadBranding */, loadThemeBranding);
          pusher.applicationUserChannel.bind("notification" /* notification */, dialogRedraw);
          // Load branding and confirm Pusher connection
          return Promise.all([
              loadThemeBranding(),
              new Promise(function (resolve) {
                  pusher.pusher.connection.bind("connected", function () {
                      pusher.pusher.connection.unbind("connected");
                      resolve();
                  });
              }),
              loadProfile()
          ]);
      })
          .catch(errNotification)
          .then(function () {
          return { application: application(), pusher: pusher };
      });
  }

  var Files = /** @class */ (function () {
      function Files(config) {
          if (config === void 0) { config = {}; }
          this.complete = stream__default['default'](0);
          this.total = stream__default['default'](0);
          this.percent = stream__default['default'].lift(function (complete, total) {
              return complete ? (complete / total) : 0;
          }, this.complete, this.total);
          this.config = config;
      }
      Files.prototype.uploadList = function (fileList) {
          var _this = this;
          var uploadPath = this.config.fileUpload;
          // Reset former upload progress
          this.total(0);
          this.complete(0);
          if (!uploadPath) {
              return [Promise.resolve()];
          }
          return lodash__default['default'].map(fileList, function (_a) {
              var guid = _a[0], file = _a[1];
              _this.total(_this.total() + 1);
              var body = new FormData();
              body.append("file", file, file.name);
              body.append("filename", guid);
              body.append("file_name", file.name);
              body.append("file_type", file.type);
              body.append("file_size", String(file.size));
              body.append("file_lastModified", String(file.lastModified));
              body.append("guid", guid);
              return sdxRequest({
                  method: "POST",
                  url: uploadPath,
                  deserialize: simpleResponse,
                  body: body
              }).then(function () { return _this.complete(_this.complete() + 1); });
          });
      };
      Files.prototype.canUploadAssets = function () {
          return Boolean(this.config.assetUpload);
      };
      Files.prototype.uploadAssets = function (fileList, category) {
          var _this = this;
          var uploadPath = this.config.assetUpload;
          // Reset former upload progress
          this.total(0);
          this.complete(0);
          if (!uploadPath) {
              return [Promise.reject(new Error("No path set"))];
          }
          // Get upload category and subcategory
          var catTag = pickByProperty(category.content, { ctx: "category" });
          var subTag = pickByProperty(category.content, { ctx: "subcategory" });
          if (!catTag) {
              return [Promise.reject(new Error("Missing category tag"))];
          }
          return lodash__default['default'].map(fileList, function (_a) {
              var file = _a.file, name = _a.name, type = _a.type, size = _a.size;
              // Don't upload file objects lacking in file content
              if (!file) {
                  return Promise.resolve();
              }
              _this.total(_this.total() + 1);
              var body = new FormData();
              body.append("file", file, file.name);
              body.append("upload_name", uiWidgets.fileNameExtSplit(name)[0]);
              body.append("upload_filename", name);
              body.append("upload_filetype", type);
              body.append("upload_filesize", size.toString());
              body.append("upload_origin", "customer");
              body.append("upload_category", catTag.val);
              body.append("upload_subcategory", subTag ? subTag.val : "");
              body.append("upload_transaction_type", "CUSTOMER");
              body.append("upload_reference", "");
              return sdxRequest({
                  method: "POST",
                  url: uploadPath,
                  deserialize: simpleResponse,
                  body: body
              }).then(function () { return _this.complete(_this.complete() + 1); });
          });
      };
      Files.prototype.getPercent = function () {
          return this.percent;
      };
      return Files;
  }());

  function strToJSON(str) {
      try {
          return JSON.parse(str);
      }
      catch (_) {
          return [];
      }
  }
  function fullFileName(name, filetype) {
      var _a = uiWidgets.fileNameExtSplit(name), fname = _a[0], ext = _a[1];
      if (ext) {
          return name;
      }
      else {
          // Get file extension from filetype
          return fname + fileExt(filetype);
      }
  }
  function xformAsset(_a) {
      var id = _a.id, uuid = _a.uuid, origin = _a.origin, href = _a.href, _b = _a.url, url = _b === void 0 ? href : _b, date = _a.date_deposited, name = _a.name, size = _a.size, viewed = _a.viewed, type = _a.filetype, category = _a.category, subcategory = _a.subcategory, reference = _a.reference, actions = _a.actionsjson;
      return {
          _id: uuid,
          modelId: "documents",
          tags: [{
                  ctx: "model",
                  val: "documents"
              }, {
                  ctx: "origin",
                  val: origin
              }, {
                  ctx: "category",
                  val: category
              }, {
                  ctx: "subcategory",
                  val: subcategory
              }, {
                  ctx: "reference",
                  val: reference
              }, {
                  ctx: "viewed",
                  val: String(viewed)
              }],
          files: [{
                  _id: uuid,
                  prop: "document-file",
                  remoteUrl: url,
                  name: fullFileName(name, type),
                  size: size,
                  type: type,
                  lastModified: 0
              }],
          props: {
              id: id,
              title: name,
              date: date,
              viewed: viewed
          },
          actions: strToJSON(actions)
      };
  }

  var homeCategory = {
      _id: "root",
      modelId: "category",
      label: "Root",
      icon: "fa-seedling",
      type: "list" /* list */,
      search: false,
      content: [{
              ctx: "root",
              val: "root"
          }],
      tags: []
  };
  var nullModel = {
      _id: "unknown",
      readonly: true,
      label: "Unknown",
      icon: "fa-undefined",
      action: "view" /* view */,
      fields: [],
      listType: "basic" /* basic */,
      search: [],
      heading: [],
      subheading: []
  };
  var categoryModel = {
      _id: "category",
      category: true,
      readonly: true,
      label: "Category",
      icon: "fa-filter",
      action: "list" /* list */,
      fields: [],
      listType: "category" /* category */,
      search: [],
      heading: [],
      subheading: []
  };
  var nullItem = {
      _id: "cdcdcdcd-0000-0000-0000-cdcd0404cdcd",
      modelId: "unknown",
      readonly: true,
      tags: [],
      files: [],
      props: {},
      actions: []
  };
  var nullAction = {
      _id: "cdcdcdcd-0000-0000-0000-cdcd0404cdcd",
      type: "view" /* view */,
      label: "Unknown"
  };

  /**
   * Generate a list of categories from a given list of items, with respect to a data-driven config object
   */
  function createCategories(itemList, driven, parent) {
      var _id = driven._id, readonly = driven.readonly, icon = driven.icon, type = driven.type, categoryTags = driven.tags, contentAll = driven.contentAll, countContent = driven.countContent, hideEmpty = driven.hideEmpty, search = driven.search, sort = driven.sort, group = driven.group, groupConf = driven.groupConf, ctx = driven.creationContext, child = driven.child;
      var driverId = parent ? parent._id + "-" + _id : _id;
      // Scope list to content tags
      var content = parent ? parent.content : driven.content;
      var contentItems = itemsForCategory(itemList, content, contentAll);
      // Generate categories for driver creationContext
      return lodash__default['default'](contentItems)
          .map(function (_a) {
          var tags = _a.tags;
          return tags ? pickByProperty(tags, { ctx: ctx }) : null;
      })
          .compact()
          .map(function (_a) {
          var val = _a.val;
          return val;
      })
          .uniq()
          .map(function (val) {
          var ctxTag = { ctx: ctx, val: val };
          var category = {
              _id: driverId + "-" + val,
              modelId: "category",
              readonly: readonly,
              label: val,
              icon: icon, type: type,
              contentAll: true,
              // Add context to content tags
              content: lodash__default['default'].concat(content, ctxTag),
              // Add context to content counter (when set)
              countContent: countContent
                  ? lodash__default['default'].concat(content, ctxTag, countContent)
                  : undefined,
              tags: categoryTags,
              hideEmpty: hideEmpty, search: search, sort: sort, group: group, groupConf: groupConf
          };
          if (child) {
              // Update parent and child tagging to create hierarchy
              var parentCategory = lodash__default['default'].extend({}, category, {
                  content: lodash__default['default'].concat(child.tags, ctxTag)
              });
              var childCategory = lodash__default['default'].extend({}, child, {
                  tags: parentCategory.content,
                  // Enforce "contentAll" tag matching for child folders
                  contentAll: true
              });
              // Generate next level of categories
              var childCategories = createCategories(contentItems, childCategory, category);
              return lodash__default['default'].concat(childCategories, parentCategory);
          }
          else {
              return [category];
          }
      })
          .flatten()
          .value();
  }

  var DataSource = /** @class */ (function () {
      function DataSource(src) {
          this.src = src;
          this.stream = stream__default['default']([]);
      }
      DataSource.prototype.load = function () {
          if (this.src.path) {
              return sdxRequest(this.src.path).then(this.stream).catch(lodash__default['default'].noop);
          }
          else {
              return Promise.resolve();
          }
      };
      return DataSource;
  }());

  // declare const meiosisTracer: any;
  /**
   * Create item instance from model
  */
  function createItem(model) {
      return lodash__default['default'].reduce(model.fields, function (item, field) {
          // Apply default prop values
          if (field.default) {
              item.props[field.id] = field.default;
          }
          return item;
      }, {
          _id: uiWidgets.guid(),
          modelId: model._id,
          readonly: model.readonly,
          tags: [{
                  ctx: "model",
                  val: model._id
              }],
          files: [],
          props: {},
          actions: []
      });
  }
  function scopeList(sourceList, filterScope) {
      return lodash__default['default'].filter(sourceList, function (_a) {
          var scope = _a.src.scope;
          return scope === filterScope;
      });
  }
  function getUserSource(sourceList) {
      var filtered = scopeList(sourceList, "user" /* User */);
      return filtered.length ? filtered[0] : null;
  }
  function buildSources(sourceList, type) {
      return lodash__default['default'].map(filterByProperty(sourceList, { type: type }), function (src) { return new DataSource(src); });
  }
  var Items = /** @class */ (function () {
      function Items(config) {
          var _this = this;
          if (config === void 0) { config = {}; }
          this.remotePath = "./";
          this.config = config;
          if (this.config.remotePath) {
              this.remotePath = this.config.remotePath;
          }
          var sourceList = this.config.sourceList || [];
          // Models
          this.modelSources = buildSources(sourceList, "model" /* Model */);
          // Combine loaded models with special category model
          this.modelList = stream__default['default'].merge(lodash__default['default'].map(this.modelSources, function (src) { return src.stream; }))
              .map(function (modelLists) { return lodash__default['default'].concat([categoryModel], lodash__default['default'].flatten(modelLists)); });
          // Assets
          this.assetSources = buildSources(sourceList, "asset" /* Asset */);
          // Transform assets into "typical" items
          this.assetList = stream__default['default'].merge(lodash__default['default'].map(this.assetSources, function (src) { return src.stream; }))
              .map(function (assetLists) { return lodash__default['default'].map(lodash__default['default'].flatten(assetLists), xformAsset); });
          // Items
          this.itemSources = buildSources(sourceList, "item" /* Item */);
          // Patch item files lacking remoteUrl property
          this.itemList = stream__default['default'].merge(lodash__default['default'].map(this.itemSources, function (src) { return src.stream; }))
              // .map((itemLists) => lodash.flatten(itemLists));
              .map(function (itemLists) { return lodash__default['default'].map(lodash__default['default'].flatten(itemLists), lodash__default['default'].bind(_this.patchRemoteUrl, _this)); });
          lodash__default['default'].bind(this.patchRemoteUrl, this);
          // Combine items and assets
          this.dataList = stream__default['default'].lift(function (assets, items) {
              var list = lodash__default['default'].concat(assets, items);
              // Add default "root" category if required
              var root = pickById(list, "root");
              if (!root) {
                  list.push(homeCategory);
              }
              // "Unpack" data-driven objects into their respective categories
              var drivers = removeByProperty(list, { modelId: "driven" });
              return lodash__default['default'].concat(list, lodash__default['default'](drivers)
                  .map(function (driver) { return createCategories(list, driver); })
                  .flatten()
                  .value());
          }, this.assetList, this.itemList);
          // // Trace items
          // meiosisTracer({
          // 	streams: [
          // 		this.itemList
          // 	]
          // });
      }
      Items.prototype.loaded = function () {
          return this.itemList().length > 1;
      };
      /** Load DataSources if they haven't been loaded yet */
      Items.prototype.initialLoad = function () {
          return this.loaded() ? Promise.resolve() : this.load();
      };
      /** Load all DataSources */
      Items.prototype.load = function () {
          // TODO User Promise.allSettled when fully supported
          return Promise.all([
              this.loadApplication(),
              this.loadUser()
          ]);
      };
      /** Load all Application scoped DataSources */
      Items.prototype.loadApplication = function () {
          return this.loadScope("application" /* Application */);
      };
      /** Load all User Scoped DataSources */
      Items.prototype.loadUser = function () {
          return this.loadScope("user" /* User */);
      };
      Items.prototype.loadScope = function (scope) {
          return Promise.all([
              Promise.all(lodash__default['default'].map(scopeList(this.modelSources, scope), function (src) { return src.load(); })),
              Promise.all(lodash__default['default'].map(scopeList(this.assetSources, scope), function (src) { return src.load(); })),
              Promise.all(lodash__default['default'].map(scopeList(this.itemSources, scope), function (src) { return src.load(); })),
          ]);
      };
      /** Load assets from a specific sjr and merge with existing loaded assets */
      Items.prototype.updateAssets = function (params) {
          var _this = this;
          var userAssets = getUserSource(this.assetSources);
          if (userAssets && userAssets.src.path) {
              return sdxRequest(userAssets.src.path, { params: params })
                  .then(function (list) { return _this.addAssets(list); });
          }
          return Promise.resolve(0);
      };
      /** Add new assets to existing loaded assets, will not replace */
      Items.prototype.addAssets = function (assets) {
          var userAssets = getUserSource(this.assetSources);
          if (userAssets) {
              var addList_1 = userAssets.stream();
              var addedCount_1 = 0;
              lodash__default['default'].each(assets, function (asset) {
                  if (pickByProperty(addList_1, { uuid: asset.uuid }) === undefined) {
                      ++addedCount_1;
                      addList_1.push(asset);
                  }
              });
              userAssets.stream(addList_1);
              return addedCount_1;
          }
          return 0;
      };
      Items.prototype.viewAsset = function (_a) {
          var uuid = _a.uuid;
          var userAssets = getUserSource(this.assetSources);
          if (userAssets) {
              var updateList = userAssets.stream();
              // Replace asset with version marked as viewed
              var assets = removeByProperty(updateList, { uuid: uuid });
              if (assets.length) {
                  var viewed = assets[0];
                  viewed.viewed = true;
                  updateList.push(viewed);
                  userAssets.stream(updateList);
              }
          }
      };
      /** Accessor to model list stream */
      Items.prototype.model = function () {
          return this.modelList;
      };
      /** Accessor to items/asset list stream */
      Items.prototype.data = function () {
          return this.dataList;
      };
      /** Add new, or update existing item loaded from the itemList configuration */
      Items.prototype.upsertUserItem = function (item) {
          var userItems = getUserSource(this.itemSources);
          if (userItems) {
              var updateList = userItems.stream();
              // Remove former version of item (if present)
              removeByProperty(updateList, { _id: item._id });
              updateList.push(item);
              userItems.stream(updateList);
              return this.saveUserData(userItems.stream());
          }
          else {
              return Promise.reject(new Error("User item source not found"));
          }
      };
      /** Delete item from loaded from the itemList configuration */
      Items.prototype.removeUserItem = function (_a) {
          var _id = _a._id;
          var userItems = getUserSource(this.itemSources);
          if (userItems) {
              var updateList = userItems.stream();
              removeByProperty(updateList, { _id: _id });
              userItems.stream(updateList);
              return this.saveUserData(userItems.stream());
          }
          else {
              return Promise.reject(new Error("User item source not found"));
          }
      };
      Items.prototype.saveUserData = function (list) {
          var updatePath = this.config.itemUpdate;
          if (!updatePath) {
              return Promise.resolve();
          }
          return sdxRequest({
              method: "POST",
              url: updatePath,
              deserialize: simpleResponse,
              body: list
          });
      };
      // Assemble remoteUrl property in "travel-wallet" style items based on _id
      Items.prototype.patchRemoteUrl = function (item) {
          var _this = this;
          var dat = item;
          if (dat.files && dat.files.length) {
              return lodash__default['default'].assign({}, dat, {
                  files: lodash__default['default'].map(dat.files, function (file) { return lodash__default['default'].assign({}, file, {
                      remoteUrl: file.remoteUrl ? file.remoteUrl : "" + _this.remotePath + file._id
                  }); })
              });
          }
          else {
              return item;
          }
      };
      return Items;
  }());

  var ItemSelect = /** @class */ (function () {
      function ItemSelect(modelStream, itemStream) {
          // Item selection handlers
          this.modelId = stream__default['default'](nullModel._id);
          this.itemId = stream__default['default'](nullItem._id);
          this.actionId = stream__default['default'](nullAction._id);
          this.pickModel = pickByIdStream(modelStream, this.modelId, nullModel);
          this.pickItem = pickByIdStream(itemStream, this.itemId, nullItem);
          this.pickAction = stream__default['default'].lift(function (item, id) { return ("actions" in item ? pickById(item.actions, id) : null) || nullAction; }, this.pickItem, this.actionId);
          this.readonly = stream__default['default'].lift(function (model, item) { return Boolean(model.readonly || item.readonly); }, this.pickModel, this.pickItem);
      }
      ItemSelect.prototype.selectItem = function (id) {
          this.itemId(id);
          this.selectModel(this.pickItem().modelId);
      };
      ItemSelect.prototype.getItem = function () {
          return this.pickItem();
      };
      ItemSelect.prototype.isReadonly = function () {
          return this.readonly();
      };
      ItemSelect.prototype.isCategory = function () {
          return this.pickItem().modelId === categoryModel._id;
      };
      ItemSelect.prototype.selectModel = function (id) {
          this.modelId(id);
      };
      ItemSelect.prototype.getModel = function () {
          return this.pickModel();
      };
      ItemSelect.prototype.selectAction = function (id) {
          this.actionId(id);
      };
      ItemSelect.prototype.getAction = function () {
          return this.pickAction();
      };
      return ItemSelect;
  }());

  var Vault = /** @class */ (function () {
      function Vault(files, items, qry) {
          this.saving = stream__default['default'](false);
          this.files = files;
          this.items = items;
          this.qry = qry;
      }
      Vault.prototype.uploadAssets = function (item, fileList) {
          return this.saveIndicator(Promise.all(this.files.uploadAssets(fileList, item)));
      };
      Vault.prototype.upsertItem = function (item, fileList) {
          if (this.qry.isReadonly()) {
              return Promise.reject(new Error("Cannot modify item"));
          }
          // Submit files
          var promiseList = this.files.uploadList(fileList);
          // Add/Update item
          promiseList.push(this.items.upsertUserItem(item));
          return this.saveIndicator(Promise.all(promiseList));
      };
      Vault.prototype.removeItem = function (item) {
          if (this.qry.isReadonly()) {
              return Promise.reject(new Error("Cannot remove item"));
          }
          return this.saveIndicator(this.items.removeUserItem(item));
      };
      /* Manage save indicator state, handling success or error */
      Vault.prototype.saveIndicator = function (promise) {
          var _this = this;
          this.saving(true);
          m__default['default'].redraw();
          return promise.then(function () { return _this.saving(false); }).catch(function (err) {
              _this.saving(false);
              throw err;
          });
      };
      return Vault;
  }());

  var NavbarType;
  (function (NavbarType) {
      NavbarType["HEADER"] = "header";
      NavbarType["FOOTER"] = "footer";
      NavbarType["SUBHEADER"] = "subheader";
  })(NavbarType || (NavbarType = {}));
  var LogoutSize;
  (function (LogoutSize) {
      LogoutSize["SMALL"] = "small";
      LogoutSize["LARGE"] = "large";
      LogoutSize["DEFAULT"] = "default";
  })(LogoutSize || (LogoutSize = {}));

  function getContextClass(context) {
      if (context === void 0) { context = exports.ToastContext.info; }
      switch (context) {
          case exports.ToastContext.error: return theme().uiDialogContextError;
          case exports.ToastContext.warn: return theme().uiDialogContextWarn;
          case exports.ToastContext.basic: return theme().uiDialogContextBasic;
          default: return theme().uiDialogContextInfo;
      }
  }
  function getAnimateInClass(position) {
      switch (position) {
          case exports.DialogPosition.center: return "fade-in";
          case exports.DialogPosition.top: return "notify-top-in";
          case exports.DialogPosition.bottom: return "notify-bottom-in";
          case exports.DialogPosition.topLeft: return "notify-left-in";
          case exports.DialogPosition.bottomLeft: return "notify-left-in";
          case exports.DialogPosition.topRight: return "notify-right-in";
          case exports.DialogPosition.bottomRight: return "notify-right-in";
          default: return "notify-top-in";
      }
  }
  function getAnimateOutClass(position) {
      switch (position) {
          case exports.DialogPosition.center: return "fade-out";
          case exports.DialogPosition.top: return "notify-top-out";
          case exports.DialogPosition.bottom: return "notify-bottom-out";
          case exports.DialogPosition.topLeft: return "notify-left-out";
          case exports.DialogPosition.bottomLeft: return "notify-left-out";
          case exports.DialogPosition.topRight: return "notify-right-out";
          case exports.DialogPosition.bottomRight: return "notify-right-out";
          default: return "notify-top-out";
      }
  }
  function getPositionClasses(position) {
      switch (position) {
          case exports.DialogPosition.center: return ".flex-row.w-75-ns.mw-90-pa3.measure";
          case exports.DialogPosition.top: return ".w-100.pa3.fixed.left-0.z-max.f5.tc.pointer.top-0";
          case exports.DialogPosition.bottom: return ".w-100.pa3.fixed.left-0.z-max.f5.tc.pointer.bottom-0";
          case exports.DialogPosition.topLeft: return ".flex-row.pa3.pointer.fixed.top-1.left-1.z-max.mw7-ns.mw5";
          case exports.DialogPosition.topRight: return ".flex-row.pa3.pointer.fixed.top-1.right-1.z-max.mw7-ns.mw5";
          case exports.DialogPosition.bottomLeft: return ".flex-row.pa3.pointer.fixed.bottom-1.left-1.z-max.mw7-ns.mw5";
          case exports.DialogPosition.bottomRight: return ".flex-row.pa3.pointer.fixed.bottom-1.right-1.z-max.mw7-ns.mw5";
          default: return ".w-100.pa3.fixed.left-0.z-max.f5.tc.pointer.top-0";
      }
  }
  function unsetBorderRadius(position) {
      if ([exports.DialogPosition.top, exports.DialogPosition.bottom].indexOf(position) > -1) {
          return true;
      }
      return false;
  }
  function useMinHeight(position) {
      if ([exports.DialogPosition.top, exports.DialogPosition.bottom].indexOf(position) > -1) {
          return "6em";
      }
      return "0px";
  }
  function createConfig(_a) {
      var context = _a.context, _b = _a.type, type = _b === void 0 ? exports.DialogType.notification : _b, _c = _a.message, message = _c === void 0 ? "" : _c, duration = _a.duration, _d = _a.position, position = _d === void 0 ? exports.DialogPosition.top : _d, _e = _a.title, title = _e === void 0 ? "" : _e, _f = _a.confirmButton, confirmButton = _f === void 0 ? {} : _f, _g = _a.cancelButton, cancelButton = _g === void 0 ? {} : _g, _h = _a.submitButton, submitButton = _h === void 0 ? {} : _h, _j = _a.priority, priority = _j === void 0 ? false : _j, login = _a.login;
      return {
          context: context || (!type || type === exports.DialogType.notification
              ? exports.ToastContext.info
              : exports.ToastContext.basic),
          type: type,
          message: message,
          title: title,
          duration: type === exports.DialogType.notification && duration
              ? duration
              : (!type || type === exports.DialogType.notification ? 3000 : 0),
          position: position,
          confirmButton: confirmButton,
          cancelButton: cancelButton,
          submitButton: submitButton,
          priority: priority,
          login: {
              onSuccess: (login === null || login === void 0 ? void 0 : login.onSuccess) ? login.onSuccess : function () { return null; },
              onFailure: (login === null || login === void 0 ? void 0 : login.onFailure) ? login.onFailure : function () { return null; }
          }
      };
  }
  var DialogHandler = /** @class */ (function () {
      function DialogHandler() {
          this.priorityQueue = [];
          this.notificationQueue = [];
          this.confirmQueue = [];
          this.loginQueue = [];
          this.queue = [];
          this.active = stream__default['default'](false);
          this.visible = stream__default['default'](false);
      }
      Object.defineProperty(DialogHandler.prototype, "config", {
          get: function () {
              return this._config;
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(DialogHandler.prototype, "getQueue", {
          //For testing only
          get: function () {
              return this.queue;
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(DialogHandler.prototype, "getActiveDialog", {
          get: function () {
              return this.activeDialog;
          },
          enumerable: false,
          configurable: true
      });
      DialogHandler.prototype.insert = function (dialogValue) {
          //Store notification to type queues
          if (dialogValue.priority)
              this.priorityQueue.push(dialogValue);
          else if (dialogValue.type === exports.DialogType.notification)
              this.notificationQueue.push(dialogValue);
          else if (dialogValue.type === exports.DialogType.confirm)
              this.confirmQueue.push(dialogValue);
          else if (dialogValue.type === exports.DialogType.login)
              this.loginQueue.push(dialogValue);
          else
              this.notificationQueue.push(dialogValue);
          //Add the notification queues to the general queue in priority order
          this.queue = lodash__default['default'].concat(this.priorityQueue, this.loginQueue, this.confirmQueue, this.notificationQueue);
      };
      DialogHandler.prototype.next = function () {
          if (!this.visible() && !this.active() && this.queue.length) {
              //Create the new activeDialog and confirm and set active/visible
              this.activeDialog = this.queue[0];
              this._config = createConfig(this.activeDialog);
              //Remove the last dialog from the respective queues
              if (this.activeDialog.priority)
                  this.priorityQueue.shift();
              else if (this.activeDialog.type === exports.DialogType.notification)
                  this.notificationQueue.shift();
              else if (this.activeDialog.type === exports.DialogType.confirm)
                  this.confirmQueue.shift();
              else if (this.activeDialog.type === exports.DialogType.login)
                  this.loginQueue.shift();
              else
                  this.notificationQueue.shift();
              this.queue.shift();
              this.active(true);
              this.visible(true);
          }
      };
      return DialogHandler;
  }());

  var DialogConfirm = /** @class */ (function () {
      function DialogConfirm() {
      }
      DialogConfirm.prototype.oninit = function (_a) {
          var applyTheme = _a.attrs.applyTheme;
          if (applyTheme) {
              this.themeHandler = new ResponsiveThemeHandler(applyTheme);
          }
      };
      DialogConfirm.prototype.view = function (_a) {
          var _b;
          var _c = _a.attrs, config = _c.config, active = _c.active, visible = _c.visible;
          var context = config.context, title = config.title, message = config.message, confirmButton = config.confirmButton, cancelButton = config.cancelButton;
          var overwrite = (_b = this.themeHandler) === null || _b === void 0 ? void 0 : _b.classes;
          return active() ? m__default['default'](".w-100.h-100.pa3.fixed.left-0.top-0.z-1.bg-black.flex.items-center.justify-center.z-max", {
              class: "fade-in",
              style: {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  tabIndex: -1
              },
              onbeforeremove: function (_a) {
                  var dom = _a.dom;
                  dom.classList.remove("fade-in");
                  dom.classList.add("fade-out");
                  return new Promise(function (resolve) {
                      dom.addEventListener("animationend", function () {
                          visible(false);
                          m__default['default'].redraw();
                          resolve();
                      });
                  });
              }
          }, m__default['default'](".flex-row.w-75-ns.mw-90-pa3.measure", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogWrapper,
                  getContextClass(context),
                  theme().uiDialogWrapper
              ])
          }, [
              m__default['default']("h2.w-100.pl3.pr3", {
                  class: joinClasses([
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogTitle,
                      theme().uiDialogTitle
                  ])
              }, title),
              m__default['default']("p.w-100.pa3", {
                  class: joinClasses([
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogText,
                      theme().uiDialogText
                  ])
              }, message),
              //Button wrapper
              m__default['default'](".flex.w-100.items-end.justify-end.pa3", {
                  class: joinClasses([
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogButtonWrapper,
                      theme().uiDialogButtonWrapper
                  ])
              }, [
                  m__default['default'](uiWidgets.Button, {
                      classes: joinClasses([
                          overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogCancelButton,
                          theme().uiDialogCancelButton
                      ]),
                      label: cancelButton.label || "Cancel",
                      icon: cancelButton.icon,
                      type: "button",
                      context: "alt",
                      onclick: function () {
                          active(false);
                          if (cancelButton.onclick) {
                              cancelButton.onclick();
                          }
                          m__default['default'].redraw();
                      }
                  }),
                  confirmButton.onclick ? m__default['default'](uiWidgets.Button, {
                      classes: joinClasses([
                          overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogConfirmButton,
                          theme().uiDialogConfirmButton
                      ]),
                      label: confirmButton.label || "Confirm",
                      icon: confirmButton.icon,
                      type: "button",
                      onclick: function () {
                          active(false);
                          if (confirmButton.onclick) {
                              confirmButton.onclick();
                          }
                          m__default['default'].redraw();
                      }
                  }) : null
              ])
          ])) : null;
      };
      return DialogConfirm;
  }());

  var wrapperClasses = function (position) {
      return position === exports.DialogPosition.center
          ? ".w-100.h-100.pa3.fixed.left-0.top-0.z-1.bg-black.flex.items-center.justify-center.z-max"
          : ".w-100.h-100.pa3.fixed.left-0.top-0.z-1.bg-black.flex.z-max";
  };
  var DialogNotification = /** @class */ (function () {
      function DialogNotification() {
      }
      DialogNotification.prototype.oninit = function (_a) {
          var applyTheme = _a.attrs.applyTheme;
          if (applyTheme) {
              this.themeHandler = new ResponsiveThemeHandler(applyTheme);
          }
      };
      DialogNotification.prototype.view = function (_a) {
          var _this = this;
          var _b;
          var _c = _a.attrs, config = _c.config, active = _c.active, visible = _c.visible;
          var position = config.position, title = config.title, message = config.message, context = config.context, duration = config.duration;
          var overwrite = (_b = this.themeHandler) === null || _b === void 0 ? void 0 : _b.classes;
          if (duration && !this.timeout && active()) {
              this.timeout = setTimeout(function () {
                  active(false);
                  m__default['default'].redraw();
              }, duration);
          }
          return m__default['default'](wrapperClasses(position), {
              style: {
                  pointerEvents: "none",
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  tabIndex: -1
              }
          }, active() ? m__default['default'](getPositionClasses(position), {
              class: joinClasses([
                  getAnimateInClass(position),
                  getContextClass(context),
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogNotificationWrapper,
                  theme().uiDialogNotificationWrapper,
              ]),
              style: lodash__default['default'].assign({
                  minHeight: useMinHeight(position),
              }, unsetBorderRadius(position) ? { borderRadius: "unset" } : {}),
              onclick: function () { return active(false); },
              onbeforeremove: function (_a) {
                  var dom = _a.dom;
                  dom.classList.remove(getAnimateInClass(position));
                  dom.classList.add(getAnimateOutClass(position));
                  if (_this.timeout) {
                      clearTimeout(_this.timeout);
                  }
                  _this.timeout = null;
                  return new Promise(function (resolve) {
                      dom.addEventListener("animationend", function () {
                          visible(false);
                          m__default['default'].redraw();
                          resolve();
                      });
                  });
              }
          }, m__default['default'](".flex-row.center-items.justify-center", title ? m__default['default']("h4.w-100.pl3.pr3", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogTitle,
                  theme().uiDialogTitle
              ])
          }, title) : null, message ? m__default['default']("p.w-100.pa3", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogText,
                  theme().uiDialogText
              ])
          }, message) : null)) : null);
      };
      return DialogNotification;
  }());

  var PasswordReset = /** @class */ (function () {
      function PasswordReset() {
          this.resetId = stream__default['default']("");
          this.mobileValid = stream__default['default']();
          this.emailValid = stream__default['default']();
      }
      // TODO: Create "clean resetId" from resetId, validate and submit that value
      PasswordReset.prototype.oninit = function (_a) {
          var hash = _a.attrs.reset.hash;
          this.mobileValid = this.resetId.map(function (mobile) {
              // Take only numbers, and the last 9 (ignore countro code) before hashing
              return hash === jsSha256.sha256(lodash__default['default'].replace(lodash__default['default'].toLower(mobile), /[^0-9]/g, '').slice(-9));
          });
          this.emailValid = this.resetId.map(function (email) {
              // Trim leading/trailing spaces before hashing
              return hash === jsSha256.sha256(lodash__default['default'].trim(lodash__default['default'].toLower(email)));
          });
      };
      PasswordReset.prototype.view = function (_a) {
          var _this = this;
          var _b = _a.attrs, auth = _b.auth, reset = _b.reset, onReset = _b.onReset, onToggle = _b.onToggle;
          var type = reset.type, inputLabel = reset.inputLabel, inputPlaceholder = reset.inputPlaceholder;
          var onePanel = auth.onePanel, _c = auth.helpBtnText, helpBtnText = _c === void 0 ? "SEND PIN" : _c, _d = auth.helpBtnIcon, helpBtnIcon = _d === void 0 ? "" + (type === "email" /* Email */ ? "fa-envelope" : "fa-mobile-android") : _d, _e = auth.loginFormClass, loginFormClass = _e === void 0 ? "w-100" : _e, _f = auth.loginBtnClass, loginBtnClass = _f === void 0 ? "mv3 tc br4" : _f, _g = auth.returnLinkText, returnLinkText = _g === void 0 ? "Return" : _g, helpInputLines = auth.helpInputLines;
          return m__default['default']("form[enctype=multipart/form-data]", {
              onsubmit: function (evt) {
                  evt.preventDefault();
                  onReset(type === "email" /* Email */ ?
                      lodash__default['default'].trim(lodash__default['default'].toLower(_this.resetId())) :
                      lodash__default['default'].trim(lodash__default['default'].replace(lodash__default['default'].toLower(_this.resetId()), /[^0-9]/g, '').slice(-9)), _this.resetId());
                  // Reset input to empty
                  _this.resetId("");
              },
              class: joinClasses([
                  loginFormClass,
                  theme().uiLoginForm
              ]),
          }, [
              m__default['default']("div", {
                  class: joinClasses([theme().uiLoginFormInputWrapper]),
              }, m__default['default'](uiWidgets.BaseInput, {
                  field: lodash__default['default'].extend({}, {
                      id: "resetpassword",
                      instant: true,
                      classes: joinClasses(["pa2", theme().uiLoginInput]),
                      containerClass: joinClasses(["mb2", theme().uiLoginInputWrapper])
                  }, type === "email" /* Email */
                      ? {
                          label: inputLabel ? inputLabel : "EMAIL",
                          type: "email" /* email */,
                          placeholder: inputPlaceholder ? inputPlaceholder : "Enter e-mail address",
                          inputmode: "email"
                      } : {
                      label: inputLabel ? inputLabel : "MOBILE",
                      type: "tel" /* tel */,
                      placeholder: inputPlaceholder ? inputPlaceholder : "Enter mobile number",
                      inputmode: "numeric",
                      pattern: "[0-9]+"
                  }),
                  value: this.resetId
              })),
              helpInputLines
                  ? lodash__default['default'].map(helpInputLines, function (line) {
                      return m__default['default']("p.f5", {
                          class: theme().uiLoginLines
                      }, m__default['default'].trust(line));
                  })
                  : null,
              m__default['default'](".flex.items-center", {
                  class: joinClasses([theme().uiLoginButtonWrapper])
              }, [
                  m__default['default'](uiWidgets.Button, {
                      label: helpBtnText,
                      type: "submit",
                      rightIcon: helpBtnIcon,
                      classes: joinClasses([
                          theme().uiLoginButton,
                          theme().uiButton,
                          loginBtnClass,
                      ]),
                      disabled: type === "email" /* Email */ ? !this.emailValid() : !this.mobileValid()
                  }),
                  onePanel ? m__default['default']("span.pv2.f6.pointer", {
                      class: colors().text.default,
                      onclick: onToggle
                  }, returnLinkText) : null
              ])
          ]);
      };
      return PasswordReset;
  }());

  function loginForm(auth) {
      var username = auth.username, pinInput = auth.pinInput;
      var _a = theme(), uiLoginInputWrapper = _a.uiLoginInputWrapper, uiLoginInput = _a.uiLoginInput, uiInput = _a.uiInput, uiInputWrapper = _a.uiInputWrapper;
      // Username field is common to all form configurations
      var formFields = [{
              key: "username",
              input: {
                  id: "username",
                  type: "hidden" /* hidden */,
                  readonly: true
              },
          }];
      if (auth.type === "dobPostcode" /* DOBPostcode */) {
          // Assemble DOB Postcode/PIN form config
          var _b = auth.dobLabel, dobLabel = _b === void 0 ? "DOB" : _b, _c = auth.dobPlaceholder, dobPlaceholder = _c === void 0 ? "DOB e.g. 23/02/1973" : _c, _d = auth.postcodeLabel, postcodeLabel = _d === void 0 ? "Postcode" : _d, _e = auth.postcodePlaceholder, postcodePlaceholder = _e === void 0 ? "Postcode e.g. AB12 3CD" : _e;
          formFields.push({
              key: "dob",
              input: {
                  id: "dob", label: dobLabel,
                  type: "dateInput" /* dateInput */,
                  placeholder: dobPlaceholder, title: dobPlaceholder,
                  required: true, containerClass: joinClasses([uiLoginInputWrapper, uiInputWrapper, "mb2"]), classes: joinClasses(["pa2", uiLoginInput, uiInput])
              }
          });
          formFields.push(pinInput
              ? {
                  key: "pin",
                  input: {
                      id: "pin", label: postcodeLabel,
                      type: "password" /* password */,
                      placeholder: postcodePlaceholder, title: postcodePlaceholder,
                      required: true, instant: true,
                      containerClass: joinClasses([uiLoginInputWrapper, uiInputWrapper, "mb2"]), classes: joinClasses(["pa2", uiLoginInput, uiInput])
                  }
              }
              : {
                  key: "postcode",
                  input: {
                      id: "postcode", label: postcodeLabel,
                      type: "text" /* text */,
                      placeholder: postcodePlaceholder, title: postcodePlaceholder,
                      required: true, instant: true,
                      containerClass: joinClasses([uiLoginInputWrapper, uiInputWrapper, "mb2"]), classes: joinClasses(["pa2", uiLoginInput, uiInput])
                  }
              });
          // Add computed fields for validation
          formFields.push({
              key: "dob-format",
              computed: {
                  keys: ["dob"],
                  map: "dateStr-format"
              }
          });
          formFields.push({
              key: "dob-valid",
              computed: {
                  keys: ["dob-format"],
                  map: "test-dob"
              }
          });
          if (pinInput) {
              formFields.push({
                  key: "pin-valid",
                  computed: {
                      keys: ["pin"],
                      map: "strLength-6"
                  }
              });
          }
          else {
              formFields.push({
                  key: "postcode-remove-whitespace",
                  computed: {
                      keys: ["postcode"],
                      map: "remove-whitespace"
                  }
              });
              formFields.push({
                  key: "postcode-upper",
                  computed: {
                      keys: ["postcode-remove-whitespace"],
                      map: "upper"
                  }
              });
              formFields.push({
                  key: "postcode-valid",
                  computed: {
                      keys: ["postcode-upper"],
                      map: "test-postcode"
                  }
              });
          }
          formFields.push({
              key: "form-valid",
              computed: {
                  keys: ["dob-valid", pinInput ? "pin-valid" : "postcode-valid"],
                  merge: "and"
              }
          });
          formFields.push({
              key: "password",
              input: {
                  id: "password",
                  type: "hidden" /* hidden */,
                  autocomplete: "off",
                  readonly: true
              },
              computed: {
                  keys: ["dob-format", pinInput ? "pin" : "postcode-upper"],
                  merge: "join-underscore"
              }
          });
      }
      else {
          // Assemble Password/PIN form config
          var _f = auth.passwordLabel, passwordLabel = _f === void 0 ? "PASSWORD" : _f, _g = auth.passwordPlaceholder, passwordPlaceholder = _g === void 0 ? "PASSWORD" : _g;
          formFields.push(pinInput
              ? {
                  key: "password",
                  input: {
                      id: "password", label: passwordLabel,
                      type: "password" /* password */,
                      placeholder: passwordPlaceholder,
                      autocomplete: "current-password",
                      required: true, instant: true,
                      pattern: "[0-9]+", inputmode: "numeric",
                      containerClass: joinClasses([uiLoginInputWrapper, uiInputWrapper, "mb2"]), classes: joinClasses(["pa2", uiLoginInput, uiInput]),
                  }
              }
              : {
                  key: "password",
                  input: {
                      id: "password", label: passwordLabel,
                      type: "password" /* password */,
                      placeholder: passwordPlaceholder,
                      autocomplete: "current-password",
                      required: true, instant: true,
                      containerClass: joinClasses([uiLoginInputWrapper, uiInputWrapper, "mb2"]), classes: joinClasses(["pa2", uiLoginInput, uiInput])
                  }
              });
          // Add computed fields for validation
          formFields.push({
              key: "form-valid",
              computed: {
                  keys: ["password"],
                  map: pinInput ? "strLength-6" : "strLength"
              }
          });
      }
      // Build form from config
      var form = buildFormFields(formFields);
      // Set fixed username
      form.streamMap["username"].value(username);
      return form;
  }

  function loginSubmit(endpoint, config) {
      return function (evt) {
          evt.preventDefault();
          m.request({
              method: "POST",
              url: endpoint,
              body: new FormData(evt.target),
              deserialize: simpleResponse
          }).then(config.onSuccess).catch(config.onFailure);
      };
  }

  var LoginForm = /** @class */ (function () {
      function LoginForm() {
          this.toggleHelp = false;
      }
      LoginForm.prototype.oninit = function (_a) {
          var auth = _a.attrs.auth;
          this.form = loginForm(auth);
      };
      LoginForm.prototype.view = function (_a) {
          var _this = this;
          var _b = _a.attrs, auth = _b.auth, config = _b.config, minimal = _b.minimal;
          var endpoint = auth.endpoint, onePanel = auth.onePanel, title = auth.title, lines = auth.lines, _c = auth.postLines, postLines = _c === void 0 ? [] : _c, helpTitle = auth.helpTitle, helpLines = auth.helpLines, _d = auth.postHelpLines, postHelpLines = _d === void 0 ? [] : _d, _e = auth.loginFormClass, loginFormClass = _e === void 0 ? "w-100" : _e, _f = auth.loginBtnText, loginBtnText = _f === void 0 ? "Login to Secure Document Vault" : _f, _g = auth.loginBtnIcon, loginBtnIcon = _g === void 0 ? "fa-sign-in-alt" : _g, _h = auth.loginBtnClass, loginBtnClass = _h === void 0 ? "mv3 tc br4" : _h, reset = auth.reset, _j = auth.helpLinkText, helpLinkText = _j === void 0 ? "Trouble logging in?" : _j;
          return m__default['default'](".flex.flex-column", {
              class: (onePanel ? "" : "flex-row-l items-stretch ph1-l") + " " + theme().uiLoginWrapper
          }, [
              // Login form
              m__default['default'](".flex-column.w-100", {
                  class: theme().uiLogin + " " + (onePanel
                      // Single panel visibility toggle
                      ? this.toggleHelp ? "dn" : "flex"
                      // Two panel stacking
                      : "mb2 mb0-l mh1-l")
              }, [
                  minimal ? null : m__default['default'](".f3.f2-l.fw5.mv3.mv4-l", {
                      class: colors().text.default
                  }, m__default['default'].trust(title)),
                  lines
                      ? lodash__default['default'].map(lines, function (line) {
                          return m__default['default']("p.f5", {
                              class: theme().uiLoginLines
                          }, m__default['default'].trust(line));
                      })
                      : null,
                  m__default['default']("form[enctype=multipart/form-data][method=post][accept=utf-8]", {
                      action: endpoint,
                      class: joinClasses([
                          loginFormClass,
                          theme().uiLoginForm
                      ]),
                      onsubmit: config ? loginSubmit(endpoint, config) : undefined
                  }, [
                      m__default['default']("div", {
                          class: joinClasses([theme().uiLoginFormInputWrapper]),
                      }, lodash__default['default'].map(this.form.fields, assembleFormField)),
                      lodash__default['default'].map(postLines, function (line) { return m__default['default']("p.f5", m__default['default'].trust(line)); }),
                      m__default['default'](".flex.items-center", {
                          class: joinClasses([theme().uiLoginButtonWrapper])
                      }, m__default['default'](uiWidgets.Button, {
                          label: loginBtnText,
                          type: "submit",
                          rightIcon: loginBtnIcon,
                          classes: joinClasses([
                              theme().uiLoginButton,
                              theme().uiButton,
                              loginBtnClass,
                          ]),
                          disabled: Boolean(!this.form.streamMap["form-valid"].value())
                      }), 
                      // Show reset form (onePanel layout only)
                      onePanel && reset ? m__default['default']("span.pv2.nt2.fr.f6.pointer", {
                          class: colors().text.default,
                          onclick: function () { return _this.toggleHelp = true; }
                      }, helpLinkText) : null)
                  ]),
              ]),
              // Help form
              m__default['default'](".flex-column.w-100", {
                  class: theme().uiLogin + " " + (onePanel
                      // Single panel visibility toggle
                      ? this.toggleHelp ? "flex" : "dn"
                      // Two panel stacking
                      : "mh1-l")
              }, [
                  minimal ? null : m__default['default'](".f3.f2-l.fw5.mv3.mv4-l", {
                      class: colors().text.default
                  }, m__default['default'].trust(helpTitle)),
                  lodash__default['default'].map(helpLines, function (line) { return m__default['default']("p.f5", m__default['default'].trust(line)); }),
                  reset ? m__default['default'](PasswordReset, {
                      auth: auth,
                      reset: reset,
                      onReset: function (shortId, fullId) {
                          _this.toggleHelp = false;
                          resetAuth(shortId, fullId);
                      },
                      onToggle: function () { return _this.toggleHelp = false; }
                  }) : null,
                  lodash__default['default'].map(postHelpLines, function (line) { return m__default['default']("p.f5", m__default['default'].trust(line)); })
              ])
          ]);
      };
      return LoginForm;
  }());

  var DialogLogin = /** @class */ (function () {
      function DialogLogin() {
          this.shake = false;
      }
      DialogLogin.prototype.oninit = function (_a) {
          var _this = this;
          var _b = _a.attrs, active = _b.active, login = _b.config.login, applyTheme = _b.applyTheme;
          if (applyTheme) {
              this.themeHandler = new ResponsiveThemeHandler(applyTheme);
          }
          this.loginSuccess = function () {
              active(false);
              return login.onSuccess();
          };
          this.loginFailure = function () {
              _this.shake = true;
              _this.failMessage = "Invalid credentials - please try again";
              return login.onFailure();
          };
      };
      DialogLogin.prototype.onupdate = function () {
          // Remove the shake class if present
          if (this.shake) {
              this.shake = false;
          }
      };
      DialogLogin.prototype.view = function (_a) {
          var _b;
          var _c = _a.attrs, config = _c.config, active = _c.active, visible = _c.visible;
          var context = config.context, title = config.title, message = config.message;
          var auth = application().auth;
          var overwrite = (_b = this.themeHandler) === null || _b === void 0 ? void 0 : _b.classes;
          return active() ? m__default['default'](".w-100.h-100.pa3.fixed.left-0.top-0.z-1.bg-black.flex.items-center.justify-center.z-max", {
              class: "fade-in",
              style: {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  tabIndex: -1
              },
              onbeforeupdate: function () {
                  if (this.shake) {
                      this.shake = false;
                  }
              },
              onbeforeremove: function (_a) {
                  var dom = _a.dom;
                  dom.classList.remove("fade-in");
                  dom.classList.add("fade-out");
                  return new Promise(function (resolve) {
                      dom.addEventListener("animationend", function () {
                          visible(false);
                          m__default['default'].redraw();
                          resolve();
                      });
                  });
              }
          }, m__default['default'](".measure-wide.pa2", {
              class: joinClasses([
                  theme().uiDialogLoginWrapper,
                  theme().uiDialogWrapper,
                  getContextClass(context),
                  this.shake ? "shake" : ''
              ])
          }, m__default['default'](".pa2", [
              m__default['default']("h2.w-100", {
                  class: joinClasses([
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogTitle,
                      theme().uiDialogTitle
                  ])
              }, title),
              m__default['default']("p", {
                  class: this.failMessage ? "red" : "",
              }, this.failMessage ? this.failMessage : message)
          ]), auth ? m__default['default'](LoginForm, {
              auth: auth,
              config: {
                  onSuccess: this.loginSuccess,
                  onFailure: this.loginFailure
              },
              minimal: true
          }) : null)) : null;
      };
      return DialogLogin;
  }());

  var containerClass = "ba b--light-gray mb2";
  // Feedback form config
  var feedbackFields = [{
          key: "feedback",
          group: "feedback",
          input: {
              id: "feedback",
              type: "textarea" /* textarea */, required: true,
              containerClass: containerClass
          }
      }, {
          key: "email",
          group: "email",
          input: {
              id: "email",
              type: "email" /* email */, required: true,
              containerClass: containerClass
          }
      }, {
          key: "phone_number",
          group: "phone_number",
          input: {
              id: "phone_number",
              type: "tel" /* tel */, required: true,
              containerClass: containerClass
          }
      }];
  var DialogFeedback = /** @class */ (function () {
      function DialogFeedback() {
          this.feedbackFormFields = buildFormFields(feedbackFields);
          this.feedbackFormGroup = lodash__default['default'].groupBy(this.feedbackFormFields.fields, "group");
      }
      DialogFeedback.prototype.oninit = function (_a) {
          var applyTheme = _a.attrs.applyTheme;
          var _b = profile() || {}, _c = _b.email, email = _c === void 0 ? "" : _c, _d = _b.mobile, mobile = _d === void 0 ? "" : _d;
          if (email) {
              this.feedbackFormFields.streamMap["email"].value(email);
          }
          if (mobile) {
              this.feedbackFormFields.streamMap["phone_number"].value(mobile);
          }
          if (applyTheme) {
              this.themeHandler = new ResponsiveThemeHandler(applyTheme);
          }
      };
      DialogFeedback.prototype.view = function (_a) {
          var _b;
          var _c = _a.attrs, config = _c.config, active = _c.active, visible = _c.visible;
          var context = config.context, title = config.title, cancelButton = config.cancelButton, submitButton = config.submitButton;
          var overwrite = (_b = this.themeHandler) === null || _b === void 0 ? void 0 : _b.classes;
          return active() ? m__default['default'](".w-100.h-100.pa3.fixed.left-0.top-0.z-1.bg-black.flex.items-center.justify-center.z-max", {
              class: "fade-in",
              style: {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  tabIndex: -1
              },
              onbeforeremove: function (_a) {
                  var dom = _a.dom;
                  dom.classList.remove("fade-in");
                  dom.classList.add("fade-out");
                  return new Promise(function (resolve) {
                      dom.addEventListener("animationend", function () {
                          visible(false);
                          m__default['default'].redraw();
                          resolve();
                      });
                  });
              }
          }, m__default['default'](".flex-row.w-75-ns.mw-90-pa3.measure", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogFeedbackWrapper,
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogWrapper,
                  getContextClass(context),
                  theme().uiDialogFeedbackWrapper,
                  theme().uiDialogWrapper
              ])
          }, [
              m__default['default']("h2.w-100.pl3.pr3.tc", {
                  class: joinClasses([
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogTitle,
                      theme().uiDialogTitle
                  ])
              }, title),
              m__default['default']("p.f6.b.pt3.ph3", {
                  class: joinClasses([
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogFeedbackLabel,
                      theme().uiDialogFeedbackLabel
                  ])
              }, "Feedback"),
              m__default['default']("p.f6.pt1.ph3", lodash__default['default'].map(this.feedbackFormGroup["feedback"], assembleFormField)),
              m__default['default']("p.f6.b.pt3.ph3", {
                  class: joinClasses([
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogFeedbackLabel,
                      theme().uiDialogFeedbackLabel
                  ])
              }, "Email Address"),
              m__default['default']("p.f6.ph3", "We may contact you if we need more information before addressing your feedback"),
              m__default['default']("p.f6.pt1.ph3", lodash__default['default'].map(this.feedbackFormGroup["email"], assembleFormField)),
              m__default['default']("p.f6.b.pt3.ph3", {
                  class: joinClasses([
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogFeedbackLabel,
                      theme().uiDialogFeedbackLabel
                  ])
              }, "Phone Number"),
              m__default['default']("p.f6.pt1.ph3", lodash__default['default'].map(this.feedbackFormGroup["phone_number"], assembleFormField)),
              //Button wrapper
              m__default['default'](".flex.flex-column.w-100.items-center.pa3", {
                  class: joinClasses([
                      theme().uiDialogFeedbackButtonWrapper,
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogText,
                      theme().uiDialogButtonWrapper
                  ]),
              }, [
                  m__default['default'](uiWidgets.Button, {
                      classes: joinClasses([
                          overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogConfirmButton,
                          theme().uiDialogConfirmButton
                      ]),
                      label: submitButton.label || "Confirm",
                      type: "button",
                      onclick: function () {
                          active(false);
                          if (submitButton.onclick) {
                              submitButton.onclick();
                          }
                          m__default['default'].redraw();
                      }
                  }),
                  m__default['default']("span.dim.pointer.pa1.underline", {
                      class: joinClasses([
                          theme().uiDialogLinkButton,
                          overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogLinkButton,
                      ]),
                      onclick: function () {
                          active(false);
                          if (cancelButton.onclick) {
                              cancelButton.onclick();
                          }
                      }
                  }, "Back")
              ])
          ])) : null;
      };
      return DialogFeedback;
  }());

  var DialogComponent = /** @class */ (function () {
      function DialogComponent() {
          this.dialogHandler = new DialogHandler();
      }
      DialogComponent.prototype.oninit = function (_a) {
          var _this = this;
          var useStream = _a.attrs.useStream;
          var dialogStream = useStream ? useStream : dialog;
          dialogStream.map(function (newDialog) { return _this.dialogHandler.insert(newDialog); });
      };
      DialogComponent.prototype.onbeforeupdate = function () {
          this.dialogHandler.next();
      };
      DialogComponent.prototype.view = function () {
          var _a = this.dialogHandler, active = _a.active, visible = _a.visible, config = _a.config;
          if (config) {
              switch (config.type) {
                  case exports.DialogType.notification: return m__default['default'](DialogNotification, { config: config, active: active, visible: visible });
                  case exports.DialogType.confirm: return m__default['default'](DialogConfirm, { config: config, active: active, visible: visible });
                  case exports.DialogType.login: return m__default['default'](DialogLogin, { config: config, active: active, visible: visible });
                  case exports.DialogType.feedback: return m__default['default'](DialogFeedback, { config: config, active: active, visible: visible });
                  default: return m__default['default'](DialogNotification, { config: config, active: active, visible: visible });
              }
          }
          return null;
      };
      return DialogComponent;
  }());

  // TODO Consider making all Logo types into custom components
  var Logo = /** @class */ (function () {
      function Logo() {
      }
      Logo.prototype.view = function (_a) {
          var attrs = _a.attrs;
          if (attrs.hasOwnProperty("type")) {
              // Custom component
              return buildComponent(attrs);
          }
          else if (attrs.hasOwnProperty("icon")) {
              // icon
              var icon = attrs;
              return m__default['default'](".flex.items-center.mh2", {
                  class: icon.classes
              }, m__default['default']("i.fal.fa-2x.mr2", {
                  class: icon.icon
              }), icon.title);
          }
          else if (attrs.hasOwnProperty("src")) {
              // image
              var image = attrs;
              return m__default['default'](".flex.items-center" + b$1.marginLogo.bgLogo.brdLogo.styleLogo, {
                  class: image.classes
              }, m__default['default']("img.img", {
                  src: image.src,
                  class: image.imageClass,
                  height: image.height,
                  width: image.width
              }), image.title);
          }
          else {
              // text
              var text = attrs;
              return m__default['default'](".mh2", {
                  class: text.classes
              }, text.title || "");
          }
      };
      return Logo;
  }());

  var NavbarCopyright = /** @class */ (function () {
      function NavbarCopyright() {
      }
      NavbarCopyright.prototype.view = function (_a) {
          var classes = _a.attrs.classes;
          var copyright = branding().copyright;
          var version = application().version;
          return m__default['default']("span.ma2.f7", {
              class: classes,
              title: version
          }, copyright ? [m__default['default'].trust("&copy; "), copyright] : null);
      };
      return NavbarCopyright;
  }());

  var NavbarImage = /** @class */ (function () {
      function NavbarImage() {
      }
      NavbarImage.prototype.view = function (_a) {
          var _b = _a.attrs, src = _b.src, classes = _b.classes, height = _b.height, width = _b.width;
          return src ? m__default['default']("img", {
              src: src,
              class: classes,
              height: height,
              width: width
          }) : null;
      };
      return NavbarImage;
  }());

  var NavbarLink = /** @class */ (function () {
      function NavbarLink() {
      }
      NavbarLink.prototype.view = function (_a) {
          var _b = _a.attrs, classes = _b.classes, href = _b.href, textContent = _b.textContent;
          return m__default['default']("a.link.mh2.flex.self-stretch.items-center", { class: classes, href: href }, textContent);
      };
      return NavbarLink;
  }());

  function toPercent(pct) {
      return (pct * 100).toFixed(0) + "%";
  }
  function getLogoutWrapperClasses(size) {
      switch (size) {
          case LogoutSize.SMALL: return 'flex dn-l';
          case LogoutSize.LARGE: return 'dn flex-l';
          default: return 'flex';
      }
  }
  function filterNavList(navList, logout) {
      var hideLogout = !(application().auth && logout);
      return lodash__default['default'].reject(navList, lodash__default['default'].matches({ hideLogout: hideLogout }));
  }

  function logout(path) {
      m__default['default'].request(path).then(reload);
  }
  var NavbarLogout = /** @class */ (function () {
      function NavbarLogout() {
      }
      NavbarLogout.prototype.view = function (_a) {
          var _b = _a.attrs, classes = _b.classes, size = _b.size;
          // We can safely assume auth is defined here
          var auth = application().auth;
          var logoutPath = auth.logoutPath, logoutLabel = auth.logoutLabel, _c = auth.logoutIcon, logoutIcon = _c === void 0 ? "fa-sign-out-alt" : _c;
          return m__default['default']("span.mh2.self-stretch.items-center.pointer", {
              class: getLogoutWrapperClasses(size) + " " + classes,
              onclick: function () { return logout(logoutPath); }
          }, [
              logoutLabel ? m__default['default']("span.mr2", {
                  class: b$1.lgBtnLabelColor.class
              }, logoutLabel) : null,
              m__default['default']("i.fal.fa-fw.fw6[aria-hidden=true]" + (logoutLabel ? '' : '.fa-2x'), {
                  class: logoutIcon + " " + b$1.lgBtnIconColor.class
              })
          ]);
      };
      return NavbarLogout;
  }());

  var NavbarText = /** @class */ (function () {
      function NavbarText() {
      }
      NavbarText.prototype.view = function (_a) {
          var _b = _a.attrs, classes = _b.classes, textContent = _b.textContent;
          return m__default['default']("span.ma2", { class: classes }, textContent);
      };
      return NavbarText;
  }());

  var NavbarPoweredBy = /** @class */ (function () {
      function NavbarPoweredBy() {
      }
      NavbarPoweredBy.prototype.view = function (_a) {
          var classes = _a.attrs.classes;
          var _b = branding().poweredBy, poweredBy = _b === void 0 ? {
              src: "https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",
              title: "Powered by Secure Digital Exchange Limited",
              href: "https://www.sdxmessaging.com/",
          } : _b;
          return m__default['default']("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]", {
              href: poweredBy.href
          }, m__default['default']("img.w-100.h-100.mw3.mw4-l.o-80", {
              class: classes,
              src: poweredBy.src,
              title: poweredBy.title
          }));
      };
      return NavbarPoweredBy;
  }());

  var NavbarProgress = /** @class */ (function () {
      function NavbarProgress() {
      }
      NavbarProgress.prototype.view = function (_a) {
          var _b = _a.attrs, saving = _b.saving, progress = _b.progress, classes = _b.classes;
          var isSaving = saving ? saving() : false;
          var progressNum = isSaving && progress ? progress() : 0;
          return m__default['default']("span.ma2.f3", {
              class: (progressNum ? "" : "dn") + " " + classes
          }, [
              toPercent(progressNum),
              m__default['default']("i.ma2.f3.fal.fa-spinner", {
                  class: isSaving ? "fa-spin" : "dn"
              })
          ]);
      };
      return NavbarProgress;
  }());

  var NavbarVersion = /** @class */ (function () {
      function NavbarVersion() {
      }
      NavbarVersion.prototype.view = function (_a) {
          var classes = _a.attrs.classes;
          var version = application().version;
          return m__default['default']("span.ma2.f7", {
              class: classes
          }, version);
      };
      return NavbarVersion;
  }());

  var NavbarName = /** @class */ (function () {
      function NavbarName() {
      }
      NavbarName.prototype.view = function (_a) {
          var classes = _a.attrs.classes;
          var name = application().name;
          return m__default['default']("span.ma2.f7", {
              class: classes
          }, name);
      };
      return NavbarName;
  }());

  var NavbarSalutation = /** @class */ (function () {
      function NavbarSalutation() {
      }
      NavbarSalutation.prototype.view = function (_a) {
          var _b = _a.attrs, classes = _b.classes, salutation = _b.salutation;
          var _c = profile(), firstName = _c.firstName, lastName = _c.lastName;
          var _salutation = lodash__default['default'].assign({
              pre: "Welcome, ",
              showFirstName: true,
              showLastName: false,
              post: "!"
          }, salutation);
          var showFirstName = _salutation.showFirstName, showLastName = _salutation.showLastName, pre = _salutation.pre, post = _salutation.post;
          return m__default['default']("span.ma2", { class: classes }, "" + pre + (showFirstName ? firstName : "") + (showFirstName && showLastName ? " " : "") + (showLastName ? lastName : "") + post);
      };
      return NavbarSalutation;
  }());

  var NavbarBuilder = /** @class */ (function () {
      function NavbarBuilder() {
      }
      NavbarBuilder.prototype.view = function (_a) {
          var attrs = _a.attrs;
          var navList = attrs.navList, saving = attrs.saving, progress = attrs.progress, logout = attrs.logout;
          var auth = application().auth;
          return lodash__default['default'].map(navList, function (navItem) {
              var classes = "" + createResponsiveClass(navItem);
              if (navItem.type === 0 /* spacer */)
                  return m__default['default'](".center", { classes: classes });
              else if (navItem.type === 1 /* divider */)
                  return m__default['default']("span", { classes: classes }, "|");
              else if (navItem.type === 8 /* copyright */)
                  return m__default['default'](NavbarCopyright, { classes: classes });
              else if (navItem.type === 9 /* poweredBy */)
                  return m__default['default'](NavbarPoweredBy, { classes: classes });
              else if (navItem.type === 10 /* progress */)
                  return m__default['default'](NavbarProgress, { saving: saving, progress: progress, classes: classes });
              else if (navItem.type === 11 /* version */)
                  return m__default['default'](NavbarVersion, { classes: classes });
              else if (navItem.type === 12 /* name */)
                  return m__default['default'](NavbarName, { classes: classes });
              else if (navItem.type === 13 /* nameVersion */)
                  return m__default['default'](NavbarName, { classes: classes });
              else if (navItem.type === 14 /* salutation */) {
                  return m__default['default'](NavbarSalutation, { salutation: navItem.salutation, classes: classes });
              }
              else if (navItem.type === 15 /* logo */)
                  return navItem.logo ? m__default['default'](Logo, navItem.logo) : null;
              else if (navItem.type === 2 /* image */) {
                  var src = navItem.src, height = navItem.height, width = navItem.width;
                  return m__default['default'](NavbarImage, { src: src, height: height, width: width, classes: classes });
              }
              else if (navItem.type === 3 /* text */) {
                  var text = navItem.text;
                  return m__default['default'](NavbarText, { textContent: text, classes: classes });
              }
              else if (navItem.type === 4 /* link */) {
                  var text = navItem.text, href = navItem.href;
                  return m__default['default'](NavbarLink, { href: href, textContent: text, classes: classes });
              }
              else if (navItem.type === 5 /* logout */
                  || navItem.type === 7 /* logoutLarge */
                  || navItem.type === 6 /* logoutSmall */) {
                  var size = LogoutSize.DEFAULT;
                  if (navItem.type === 5 /* logout */)
                      size = LogoutSize.DEFAULT;
                  if (navItem.type === 7 /* logoutLarge */)
                      size = LogoutSize.LARGE;
                  if (navItem.type === 6 /* logoutSmall */)
                      size = LogoutSize.SMALL;
                  return auth && logout ? m__default['default'](NavbarLogout, { size: size, classes: classes }) : null;
              }
              return buildComponent(navItem);
          });
      };
      return NavbarBuilder;
  }());

  var Navbar = /** @class */ (function () {
      function Navbar() {
      }
      Navbar.prototype.view = function (_a) {
          var _b = _a.attrs, type = _b.type, saving = _b.saving, progress = _b.progress, logout = _b.logout;
          if (type === NavbarType.HEADER) {
              var navList = filterNavList(branding().header || [], logout);
              return navList.length
                  ? m__default['default'](NavbarBuilder, { saving: saving, progress: progress, logout: logout, navList: navList, navClass: b$1.header.class })
                  : null;
          }
          else if (type === NavbarType.FOOTER) {
              var navList = filterNavList(branding().footer || [], logout);
              return navList.length
                  ? m__default['default'](NavbarBuilder, { saving: saving, progress: progress, logout: logout, navList: navList, navClass: b$1.body.class })
                  : null;
          }
          else if (type === NavbarType.SUBHEADER) {
              var navList = filterNavList(branding().subheader || [], logout);
              return navList.length
                  ? m__default['default'](".flex.items-center.self-center.w-100.flex-shrink-0", {
                      class: theme().uiSubheader,
                  }, m__default['default'](NavbarBuilder, { saving: saving, progress: progress, logout: logout, navList: navList, navClass: b$1.subheader.class })) : null;
          }
          return null;
      };
      return Navbar;
  }());

  var Layout = /** @class */ (function () {
      function Layout() {
      }
      Layout.prototype.view = function (_a) {
          var _b = _a.attrs, saving = _b.saving, progress = _b.progress, fullScreen = _b.fullScreen, responsiveHeader = _b.responsiveHeader, responsiveFooter = _b.responsiveFooter, _c = _b.logout, logout = _c === void 0 ? true : _c, header = _b.header, footer = _b.footer, children = _a.children;
          var fsStyle = fullScreen ? {
              "max-width": "unset"
          } : {};
          return [
              // Toast notification
              m__default['default'](DialogComponent),
              // Header
              m__default['default'](".flex.items-center.justify-center.z-1", {
                  class: theme().uiHeaderWrapper
              }, m__default['default']("nav.items-center.self-center.w-100.z-1.h3.flex-shrink-0", {
                  class: theme().uiHeader + " " + (responsiveHeader ? "dn flex-l" : "flex"),
                  style: fsStyle
              }, header ? header : m__default['default'](Navbar, {
                  type: NavbarType.HEADER,
                  saving: saving, progress: progress, logout: logout
              }))),
              // Central
              m__default['default']("main.flex-auto.flex.flex-column.self-center.w-100.h-100", {
                  class: theme().uiLayout,
                  style: fsStyle
              }, 
              // Subheader
              m__default['default'](Navbar, {
                  type: NavbarType.SUBHEADER,
                  saving: saving, progress: progress, logout: logout
              }), children),
              // Footer
              m__default['default'](".flex.items-center.justify-center.z-1", m__default['default']("nav.w-100.items-center.flex-shrink-0", {
                  class: theme().uiFooter + " " + (responsiveFooter ? "dn flex-l" : "flex"),
                  style: fsStyle
              }, footer ? footer : m__default['default'](Navbar, {
                  type: NavbarType.FOOTER,
                  saving: saving, progress: progress, logout: logout
              })))
          ];
      };
      return Layout;
  }());

  var Panel = /** @class */ (function () {
      function Panel() {
      }
      Panel.prototype.view = function (_a) {
          var _b = _a.attrs, header = _b.header, headerClass = _b.headerClass, subheader = _b.subheader, subheaderClass = _b.subheaderClass, content = _b.content, footer = _b.footer;
          return [
              header
                  ? m__default['default'](".flex.justify-between.items-center.flex-shrink-0", {
                      class: headerClass ? headerClass : theme().uiPanelHeader
                  }, header)
                  : null,
              subheader
                  ? m__default['default'](".flex-shrink-0", {
                      class: subheaderClass
                  }, subheader)
                  : null,
              content,
              footer
          ];
      };
      return Panel;
  }());

  var CustomPanel = /** @class */ (function () {
      function CustomPanel() {
      }
      CustomPanel.prototype.view = function (_a) {
          var action = _a.attrs.action;
          var component = action.comp;
          return m__default['default'](Panel, {
              header: [
                  noreturn() ? null : m__default['default'](uiWidgets.NavButton, {
                      label: "Return",
                      icon: "fa-chevron-left nl2",
                      classes: "dim",
                      onclick: back
                  })
              ],
              content: m__default['default'](".flex-auto.overflow-x-hidden.overflow-y-auto.safari-bug", component
                  // TODO Consider passing IItemWidget props to component
                  ? buildComponent(component)
                  : m__default['default']("span.ma3.db.truncate", {
                      class: colors().text.subheading
                  }, "No Component Found"))
          });
      };
      return CustomPanel;
  }());

  function customDefaultRoute(items, qry, layoutAttrs) {
      return {
          onmatch: function (_a) {
              var itemGuid = _a.itemGuid;
              return items.initialLoad()
                  .then(function () {
                  qry.selectItem(itemGuid);
                  // Find first component action on item
                  var item = qry.getItem();
                  var actionList = item.actions || [];
                  var action = pickByProperty(actionList, { type: "comp" /* custom */ });
                  if (action) {
                      qry.selectAction(action._id);
                  }
                  else {
                      home();
                  }
              });
          },
          render: function () { return m__default['default'](Layout, layoutAttrs, m__default['default'](CustomPanel, {
              modelList: items.model()(),
              itemList: items.data(),
              model: qry.getModel(),
              item: qry.getItem(),
              action: qry.getAction()
          })); }
      };
  }
  function customRoute(items, qry, layoutAttrs) {
      return {
          onmatch: function (_a) {
              var itemGuid = _a.itemGuid, actionGuid = _a.actionGuid;
              return items.initialLoad()
                  .then(function () {
                  qry.selectItem(itemGuid);
                  qry.selectAction(actionGuid);
              });
          },
          render: function () { return m__default['default'](Layout, layoutAttrs, m__default['default'](CustomPanel, {
              modelList: items.model()(),
              itemList: items.data(),
              model: qry.getModel(),
              item: qry.getItem(),
              action: qry.getAction()
          })); }
      };
  }

  function addClasses(field, classes, containerClass) {
      return lodash__default['default'].extend({}, field, {
          classes: classes,
          containerClass: containerClass,
      });
  }
  // Build a form using a model
  function buildModelFields(_a) {
      var fields = _a.fields;
      var modelForm = lodash__default['default'].map(fields, function (field) {
          return {
              key: field.id,
              input: getWidgetType(field.type) === 2 /* File */
                  ? addClasses(field, "", "mb2")
                  : addClasses(field, "pa2", "mb2 bb b--black-20"),
          };
      });
      return buildFormFields(modelForm);
  }
  // Apply item values to a built form
  function applyItemValues(form, item, _a) {
      var fields = _a.fields;
      // Get form field and item values for each model field (by id)
      lodash__default['default'].forEach(fields, function (_a) {
          var id = _a.id;
          var formField = lodash__default['default'].find(form.fields, lodash__default['default'].matches({ key: id }));
          if (formField) {
              var type = formField.type, value = formField.value, files = formField.files;
              if (type === 1 /* Prop */ && value) {
                  value(getProp(item.props, id));
              }
              else if (type === 2 /* File */ && files) {
                  files(getFiles(item.files, id));
              }
          }
      });
  }
  function formToItem(builtForm) {
      var fileList = [];
      var props = {};
      lodash__default['default'].forEach(builtForm.fields, function (_a) {
          var type = _a.type, input = _a.input, value = _a.value, files = _a.files;
          if (input && value) {
              var id_1 = input.id;
              if (type === 1 /* Prop */) {
                  // Append props
                  if (!lodash__default['default'].isUndefined(value())) {
                      lodash__default['default'].set(props, id_1, value());
                  }
              }
              else if (type === 2 /* File */ && files) {
                  // Append files
                  lodash__default['default'].each(files(), function (file) {
                      if (file) {
                          fileList.push([id_1, file]);
                      }
                  });
              }
          }
      });
      return {
          files: fileList,
          props: props
      };
  }

  var Icon = /** @class */ (function () {
      function Icon() {
      }
      Icon.prototype.view = function (_a) {
          var icon = _a.attrs.icon;
          return typeof icon === "string" ? m__default['default']("i.fal.fa-fw.w2.mr2.tc.flex-shrink-0", {
              class: icon
          }) : m__default['default']("img.img.mw2.mr2", {
              src: icon.src,
              class: icon.imageClass,
              height: icon.height,
              width: icon.width
          });
      };
      return Icon;
  }());

  function updateItem(data, form) {
      var _a = formToItem(form), files = _a.files, props = _a.props;
      var uploads = [];
      // Update item files and props
      var newItem = lodash__default['default'].assign({}, data, {
          // Rebuild file list
          files: lodash__default['default'](files).map(function (_a) {
              var prop = _a[0], _b = _a[1], guid = _b.guid, name = _b.name, file = _b.file;
              // Gather files to be uploaded
              var fileMetadata = null;
              if (file) {
                  uploads.push([guid, file]);
                  fileMetadata = {
                      _id: guid,
                      prop: prop,
                      name: name,
                      size: file.size,
                      type: file.type,
                      lastModified: file.lastModified
                  };
              }
              // Check for existing file
              var oldFile = pickByProperty(data.files, { _id: guid });
              if (oldFile) {
                  // Update file if new entry set
                  if (fileMetadata) {
                      lodash__default['default'].merge(oldFile, fileMetadata);
                  }
                  return oldFile;
              }
              else {
                  // Return new file
                  return fileMetadata;
              }
          }).compact().value(),
          props: props
      });
      return [newItem, uploads];
  }
  var ItemEdit = /** @class */ (function () {
      function ItemEdit() {
      }
      ItemEdit.prototype.oninit = function (_a) {
          var _b = _a.attrs, item = _b.item, model = _b.model;
          // Assemble form from model, set values from item
          this.form = buildModelFields(model);
          applyItemValues(this.form, item, model);
      };
      ItemEdit.prototype.view = function (_a) {
          var _this = this;
          var _b = _a.attrs, model = _b.model, item = _b.item, isNew = _b.isNew, onCancel = _b.onCancel, onSave = _b.onSave, onRemove = _b.onRemove;
          return m__default['default'](Panel, {
              header: [
                  m__default['default'](uiWidgets.NavButton, {
                      label: "Cancel",
                      classes: "dim",
                      onclick: onCancel
                  }),
                  m__default['default'](uiWidgets.NavButton, {
                      label: "Done",
                      classes: "dim",
                      onclick: function (evt) {
                          // Block redraw so validation states remain
                          evt.redraw = false;
                          var form = document.getElementById("item-editor");
                          // // Submit form (IE11 not supported)
                          // if (form && form.reportValidity()) {
                          // 	this.save(item as IDataItem, onSave);
                          // }
                          // Submit form (IE11 supported)
                          if (!form.checkValidity()) {
                              // Create the temporary button, click and remove it
                              var tmpSubmit = document.createElement("button");
                              form.appendChild(tmpSubmit);
                              tmpSubmit.click();
                              form.removeChild(tmpSubmit);
                          }
                          else {
                              _this.save(item, onSave);
                          }
                      }
                  })
              ],
              content: m__default['default'](".flex-auto.overflow-x-hidden.overflow-y-auto.pa2.safari-bug", [
                  // Display heading for new items
                  isNew ? m__default['default'](".pv2.mb2.flex.flex-row.bb.b--black-20", [
                      m__default['default'](Icon, { icon: model.icon }),
                      m__default['default']("span.truncate", "New " + model.label)
                  ]) : null,
                  m__default['default']("form#item-editor.flex.flex-column", {
                      onsubmit: function () {
                          _this.save(item, onSave);
                          return false;
                      }
                  }, [
                      // Present form
                      lodash__default['default'].map(this.form.fields, assembleFormField),
                      isNew ? null
                          : m__default['default'](uiWidgets.Button, {
                              label: "Delete",
                              icon: "fa-trash-alt",
                              classes: "self-end mv2",
                              onclick: function () { return onRemove(item); }
                          }),
                      // Allow form submit on enter key (IE11)
                      m__default['default']("input.dn[type=submit]")
                  ]),
                  // Custom components
                  item.post ? m__default['default']("div", { class: theme().uiPostContentWrapper }, buildComponentList(item.post)) : null
              ])
          });
      };
      ItemEdit.prototype.save = function (data, onSave) {
          // Serialise form into pending uploads, files and properties
          var _a = updateItem(data, this.form), newItem = _a[0], uploads = _a[1];
          onSave(newItem, uploads);
      };
      return ItemEdit;
  }());

  function categorySingleRoute(items, qry, layoutAttrs, onSave, onRemove) {
      var newItem;
      return {
          onmatch: function (_a) {
              var itemGuid = _a.itemGuid;
              return items.initialLoad().then(function () {
                  qry.selectItem(itemGuid);
                  if (qry.isCategory()) {
                      var category = qry.getItem();
                      // Get model from category tags
                      var modelTag = pickByProperty(category.content, { ctx: "model" });
                      if (modelTag) {
                          qry.selectModel(modelTag.val);
                          var existingItem = pickByProperty(items.data()(), { modelId: modelTag.val });
                          // Edit existing/Create new item
                          newItem = existingItem ? existingItem : createItem(qry.getModel());
                          return;
                      }
                  }
                  back();
              });
          },
          render: function () { return newItem ? m__default['default'](Layout, layoutAttrs, m__default['default'](ItemEdit, {
              modelList: items.model()(),
              itemList: items.data(),
              model: qry.getModel(),
              item: newItem,
              isNew: true,
              onCancel: back,
              onSave: onSave,
              onRemove: onRemove
          })) : null; }
      };
  }
  function itemNewRoute(items, qry, layoutAttrs, onSave, onRemove) {
      var newItem;
      return {
          onmatch: function (_a) {
              var modelGuid = _a.modelGuid;
              return items.initialLoad().then(function () {
                  qry.selectModel(modelGuid);
                  // Create new item from model
                  newItem = createItem(qry.getModel());
              });
          },
          render: function () { return newItem ? m__default['default'](Layout, layoutAttrs, m__default['default'](ItemEdit, {
              modelList: items.model()(),
              itemList: items.data(),
              model: qry.getModel(),
              item: newItem,
              isNew: true,
              onCancel: back,
              onSave: onSave,
              onRemove: onRemove
          })) : null; }
      };
  }
  function itemEditRoute(items, qry, layoutAttrs, onSave, onRemove) {
      return {
          onmatch: function (_a) {
              var itemGuid = _a.itemGuid;
              return items.initialLoad().then(function () {
                  qry.selectItem(itemGuid);
                  // Return to default action if the editing is not permitted
                  if (qry.isReadonly()) {
                      selectItem(qry.getModel(), qry.getItem(), {
                          replace: true
                      });
                  }
              });
          },
          render: function () { return m__default['default'](Layout, layoutAttrs, m__default['default'](ItemEdit, {
              modelList: items.model()(),
              itemList: items.data(),
              model: qry.getModel(),
              item: qry.getItem(),
              onCancel: back,
              onSave: onSave,
              onRemove: onRemove
          })); }
      };
  }

  var SearchBox = /** @class */ (function () {
      function SearchBox() {
          this.id = lodash__default['default'].uniqueId("search-");
      }
      SearchBox.prototype.view = function (_a) {
          var _b = _a.attrs, placeholder = _b.placeholder, searchValue = _b.searchValue;
          return m__default['default']("form.flex.flex-row.items-center.bg-light-gray", {
              onsubmit: function () { return false; }
          }, m__default['default']("label.fal.fa-fw.fa-search.w2.pv2.pl2.tc.pointer" + b$1.icon, {
              for: this.id
          }), m__default['default'](uiWidgets.BaseInput, {
              field: {
                  id: this.id,
                  label: "",
                  type: "search" /* search */,
                  classes: "bn pa2 bg-transparent hide-input-clear",
                  placeholder: placeholder,
                  instant: true
              },
              value: searchValue
          }), 
          // Clear button when search has value
          searchValue() ? m__default['default']("i.fal.fa-fw.fa-times.pa2.tc.pointer.dim" + b$1.subheading, {
              title: "Reset Search",
              onclick: function () { return searchValue(""); }
          }) : null);
      };
      return SearchBox;
  }());

  var BaseItem = /** @class */ (function () {
      function BaseItem() {
      }
      BaseItem.prototype.view = function (_a) {
          var attrs = _a.attrs;
          var model = attrs.model, item = attrs.item;
          var icon = model.icon;
          // Row wrapper
          return m__default['default'](".flex-shrink-0", {
              class: theme().uiItemRowWrapper
          }, [
              // Row Inner
              m__default['default']("div.justify-between", {
                  class: theme().uiItemRowInnerWrapper,
                  onclick: function () { return selectItem(model, item); }
              }, [
                  // Row Header
                  m__default['default']("div", {
                      class: theme().uiItemRowHeaderWrapper
                  }, [
                      icon ?
                          typeof icon === "string" ?
                              m__default['default']("div", { icon: icon }) :
                              m__default['default']("img", { src: icon.src, height: icon.height, width: icon.width })
                          : null,
                      m__default['default']("div", {
                          class: theme().uiItemHeading
                      }, this.heading(attrs)),
                      this.subheading ?
                          m__default['default']("div", {
                              class: theme().uiItemSubheading
                          }, this.subheading(attrs))
                          : null,
                  ]),
                  // Row buttons/actions
                  // TODO hide region if no actions?
                  m__default['default']("div", {
                      class: theme().uiItemButtonsWrapper
                  }, m__default['default']("div", {
                      class: theme().uiItemButtonsInnerWrapper
                  }, this.buttons(attrs)))
              ])
          ]);
      };
      BaseItem.prototype.heading = function (_a) {
          var model = _a.model, item = _a.item;
          return m__default['default']("span.ws-normal.mb1", extractFields(item, model.heading, model.category));
      };
      BaseItem.prototype.subheading = function (_a) {
          var model = _a.model, item = _a.item;
          var subheading = extractFields(item, model.subheading, model.category);
          return subheading
              ? m__default['default']("span.f6.ws-normal.silver.ma1", subheading)
              : null;
      };
      BaseItem.prototype.buttons = function (_a) {
          var item = _a.item, model = _a.model;
          return lodash__default['default'].isArray(model.action) ? lodash__default['default'].map(model.action, function (data) {
              return m__default['default'](uiWidgets.Button, {
                  label: data.label,
                  classes: data.classes + " " + theme().uiItemActionButton,
                  icon: data.icon,
                  onclick: function (evt) {
                      evt.stopPropagation();
                      actionItem(item, data.action);
                  }
              });
          }) : null;
      };
      return BaseItem;
  }());

  var CategoryItem = /** @class */ (function () {
      function CategoryItem() {
          this.itemCount = stream__default['default']();
      }
      CategoryItem.prototype.oninit = function (_a) {
          var _b = _a.attrs, item = _b.item, itemList = _b.itemList;
          var _c = item, content = _c.content, _d = _c.countContent, countContent = _d === void 0 ? content : _d, contentAll = _c.contentAll;
          this.itemCount = itemList.map(function (list) { return itemsForCategory(list, countContent, contentAll).length; });
      };
      CategoryItem.prototype.view = function (_a) {
          var _b = _a.attrs, model = _b.model, item = _b.item;
          var _c = item, label = _c.label, icon = _c.icon, type = _c.type, hideEmpty = _c.hideEmpty;
          return hideEmpty && this.itemCount() === 0
              ? null
              : m__default['default'](".flex.items-center.justify-between.ma2.pv2.bb.b--black-20.dim.pointer", {
                  onclick: function () { return selectItem(model, item); }
              }, [
                  m__default['default'](".flex.items-center.mr2.truncate", [
                      m__default['default'](Icon, { icon: icon }),
                      m__default['default']("span", label)
                  ]),
                  this.itemCount() ? m__default['default'](".silver.flex-shrink-0", [
                      type === "single" /* single */
                          ? m__default['default']("i.fal.fa-check", {
                              class: colors().text.default
                          })
                          : m__default['default']("span", {
                              class: colors().text.default
                          }, this.itemCount()),
                      m__default['default']("i.fal.fa-fw.fa-chevron-right.mh2.flex-shrink-0")
                  ]) : null
              ]);
      };
      return CategoryItem;
  }());

  var __extends = (this && this.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  var FileItem = /** @class */ (function (_super) {
      __extends(FileItem, _super);
      function FileItem() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      FileItem.prototype.subheading = function (attrs) {
          var _this = this;
          var item = attrs.item, model = attrs.model;
          return [
              _super.prototype.subheading.call(this, attrs),
              lodash__default['default'].map(item.files, function (fileObj) { return _this.fileProperties(fileObj, model); })
          ];
      };
      FileItem.prototype.buttons = function (attrs) {
          var item = attrs.item;
          var actionList = item.actions || [];
          return [
              lodash__default['default'].map(actionList, function (_a) {
                  var _id = _a._id, type = _a.type, label = _a.label;
                  return m__default['default'](uiWidgets.Button, {
                      label: label,
                      classes: theme().uiItemActionButton,
                      onclick: function (evt) {
                          evt.stopPropagation();
                          actionItem(item, type, _id);
                      }
                  });
              }),
              _super.prototype.buttons.call(this, attrs)
          ];
      };
      FileItem.prototype.fileProperties = function (file, _a) {
          var fileHeading = _a.fileHeading;
          return lodash__default['default'].map(fileHeading, function (_a) {
              var prop = _a.prop, classes = _a.classes;
              return m__default['default']("span.ma1", {
                  class: classes
              }, getFileValue(file, prop));
          });
      };
      return FileItem;
  }(BaseItem));

  var __extends$1 = (this && this.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  var LinkItem = /** @class */ (function (_super) {
      __extends$1(LinkItem, _super);
      function LinkItem() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      LinkItem.prototype.subheading = function (attrs) {
          var model = attrs.model, item = attrs.item;
          var linkList = model.links || [];
          return [
              _super.prototype.subheading.call(this, attrs),
              lodash__default['default'].map(linkList, function (link) {
                  var props = item.props;
                  var field = pickByProperty(model.fields, { id: link });
                  var linkVal = props[link];
                  if (field && linkVal) {
                      var fieldType = (field ? field.type : null) || "url" /* url */;
                      var href = uiWidgets.linkAttrs(fieldType, linkVal).href;
                      return m__default['default'](".ma1.w-100.mw5-l", {
                          onclick: function (evt) { return evt.stopPropagation(); }
                      }, m__default['default'](uiWidgets.ButtonLink, {
                          label: linkVal,
                          href: href,
                          icon: uiWidgets.iconMap[fieldType],
                          classes: "db tc truncate"
                      }));
                  }
                  else {
                      return null;
                  }
              })
          ];
      };
      return LinkItem;
  }(BaseItem));

  var _a$1;
  var widgetMap = (_a$1 = {},
      // [ListType.basic]: BaseItem,
      _a$1["category" /* category */] = CategoryItem,
      _a$1["link" /* link */] = LinkItem,
      _a$1["file" /* file */] = FileItem,
      _a$1);
  function getListWidget(_a) {
      var listType = _a.listType;
      if (widgetMap.hasOwnProperty(listType)) {
          return widgetMap[listType];
      }
      else {
          // Use the "default" widget
          return BaseItem;
      }
  }

  function sortItems(itemList, modelMap, sort) {
      var sortConf = typeof sort === "string" ? { type: sort } : sort;
      switch (sortConf.type) {
          case "heading" /* heading */:
              return itemList.map(function (list) { return lodash__default['default'].sortBy(list, function (item) {
                  var model = modelMap[item.modelId];
                  return model ? extractFields(item, model.heading, model.category) : "";
              }); });
          case "props" /* props */: {
              var _a = sortConf.props, props_1 = _a === void 0 ? [] : _a, desc_1 = sortConf.desc;
              return itemList.map(function (list) {
                  var orderList = lodash__default['default'].sortBy(list, function (item) {
                      var model = modelMap[item.modelId];
                      return extractFields(item, props_1, model.category);
                  });
                  return desc_1 ? lodash__default['default'].reverse(orderList) : orderList;
              });
          }
          case "ordinal" /* ordinal */: {
              var desc_2 = sortConf.desc;
              return itemList.map(function (list) {
                  var orderList = lodash__default['default'].sortBy(list, ["ordinal"]);
                  return desc_2 ? lodash__default['default'].reverse(orderList) : orderList;
              });
          }
          // TODO Other sort methods
          default:
              return itemList;
      }
  }
  function groupMapToList(groupMap) {
      return lodash__default['default'].map(lodash__default['default'].sortBy(lodash__default['default'].keys(groupMap)), function (key) {
          return {
              label: key,
              itemList: groupMap[key]
          };
      });
  }
  function groupItems(itemList, modelMap, order) {
      switch (order.type) {
          case "model" /* model */:
              return itemList.map(function (list) {
                  var groupedItemsMap = lodash__default['default'].groupBy(list, "modelId");
                  var groupKeys = lodash__default['default'].sortBy(lodash__default['default'].keys(groupedItemsMap));
                  return lodash__default['default'].map(groupKeys, function (key) {
                      var model = modelMap[key];
                      return {
                          label: model ? model.label : "Unknown Model",
                          itemList: groupedItemsMap[key]
                      };
                  });
              });
          case "rolodex" /* rolodex */:
              return itemList.map(function (list) {
                  return groupMapToList(lodash__default['default'].groupBy(list, function (item) {
                      var model = modelMap[item.modelId];
                      return model
                          ? lodash__default['default'].head(String(extractFields(item, model.heading, model.category)))
                          : "N/A";
                  }));
              });
          case "tags" /* tags */: {
              var ctx_1 = order.ctx;
              return itemList.map(function (list) {
                  return groupMapToList(lodash__default['default'].groupBy(list, function (_a) {
                      var tags = _a.tags;
                      var subTag = pickByProperty(tags, { ctx: ctx_1 });
                      return subTag ? subTag.val : "N/A";
                  }));
              });
          }
          default:
              return itemList.map(function (list) {
                  return [{
                          label: false,
                          itemList: list
                      }];
              });
      }
  }

  var ItemList = /** @class */ (function () {
      function ItemList() {
          this.taggedItemList = stream__default['default']([]);
          this.modelMap = {};
          this.filteredItems = stream__default['default']();
          this.itemGroups = stream__default['default']();
          this.listModels = false;
          this.createModels = [];
          this.searchValue = stream__default['default']("");
          this.filter = stream__default['default']();
      }
      ItemList.prototype.oninit = function (_a) {
          var _this = this;
          var _b = _a.attrs, _c = _b.item, contentAll = _c.contentAll, content = _c.content, _d = _c.sort, sort = _d === void 0 ? "none" /* none */ : _d, _e = _c.group, group = _e === void 0 ? {
              type: "none" /* none */
          } : _e, modelList = _b.modelList, itemList = _b.itemList;
          if (!lodash__default['default'].isArray(content)) {
              return;
          }
          this.modelMap = lodash__default['default'].keyBy(modelList, "_id");
          // Assemble list of models that could be created from this list
          this.createModels = lodash__default['default'](content)
              .filter({ ctx: "model" })
              .map(function (_a) {
              var val = _a.val;
              return pickById(modelList, val);
          })
              .compact()
              .filter(function (_a) {
              var readonly = _a.readonly;
              return !readonly;
          })
              .value();
          // Scope itemList to item category
          this.taggedItemList = itemList.map(function (list) { return itemsForCategory(list, content, contentAll); });
          // Sort items
          var sortedItems = sortItems(this.taggedItemList, this.modelMap, sort);
          // Create filter regex from search value
          this.filter = this.searchValue.map(function (current) { return new RegExp(current, "i"); });
          // Apply filter to items
          this.filteredItems = stream__default['default'].lift(function (sortedList, search) {
              return lodash__default['default'].filter(sortedList, function (item) {
                  var model = _this.modelMap[item.modelId];
                  return model ? search.test(String(extractFields(item, model.search, model.category))) : false;
              });
          }, sortedItems, this.filter);
          // Group items
          this.itemGroups = groupItems(this.filteredItems, this.modelMap, group);
      };
      ItemList.prototype.view = function (vnode) {
          var _this = this;
          var _a = vnode.attrs.item, label = _a.label, _b = _a.search, search = _b === void 0 ? true : _b, pre = _a.pre, post = _a.post, dataCard = _a.dataCard;
          var dataCardModel = dataCard ? this.modelMap["dataCard"] : null;
          var dataCardConfig = dataCardModel && dataCard
              ? lodash__default['default'].filter(dataCardModel.config, function (c) { return c._id === dataCard.modelId; })[0]
              : null;
          return m__default['default'](Panel, {
              header: [
                  noreturn() ? m__default['default']("div") : m__default['default'](uiWidgets.NavButton, {
                      label: "Return",
                      icon: "fa-chevron-left nl2",
                      classes: "dim",
                      onclick: back
                  }),
                  this.createModels.length ? this.listModels
                      ? m__default['default'](uiWidgets.NavButton, {
                          icon: "fa-chevron-up nl2",
                          title: "Cancel",
                          classes: "dim",
                          onclick: function () { return _this.listModels = false; }
                      })
                      : m__default['default'](uiWidgets.NavButton, {
                          icon: "fa-plus nl2",
                          title: "Create New...",
                          classes: "dim",
                          onclick: function () { return _this.createNew(); }
                      })
                      : null
              ],
              subheader: [
                  this.listModels ? lodash__default['default'].map(this.createModels, function (model) {
                      return m__default['default'](".ma2.pv2.bb.b--black-20.dim.pointer", {
                          onclick: function () { return newItem(model); }
                      }, m__default['default'](".mr2.truncate", [
                          m__default['default'](Icon, { icon: model.icon }),
                          m__default['default']("span", "New " + model.label)
                      ]));
                  }) : null,
                  search ? m__default['default'](SearchBox, {
                      placeholder: "Search " + label,
                      searchValue: this.searchValue
                  }) : null
              ],
              // TODO Theme support for list/table/grid containers
              // .flex.flex-column.items-center
              content: m__default['default'](".safari-bug", {
                  class: this.contentWrapperClass()
              }, [
                  pre ? buildComponentList(pre) : null,
                  //DataCard -->
                  dataCard && dataCardConfig ? buildComponent({
                      type: "sdx-dataCard",
                      data: {
                          pre: dataCard.pre,
                          post: dataCard.post,
                          displayType: dataCard.displayType,
                          dataMap: dataCard.dataMap,
                          config: dataCardConfig
                      }
                  }) : null,
                  this.viewContent(vnode),
                  post ? m__default['default']("div", {
                      class: theme().uiPostContentWrapper
                  }, buildComponentList(post)) : null
              ])
          });
      };
      ItemList.prototype.contentWrapperClass = function () {
          return theme().uiItemListContainer;
      };
      ItemList.prototype.viewContent = function (vnode) {
          var _this = this;
          var _a = vnode.attrs, label = _a.item.label, modelList = _a.modelList, itemList = _a.itemList;
          return this.taggedItemList().length
              ? this.filteredItems().length
                  ? lodash__default['default'].map(this.itemGroups(), function (_a) {
                      var groupLabel = _a.label, groupList = _a.itemList;
                      return [
                          groupLabel ? m__default['default']("h4.mh2.mv3.silver", groupLabel) : null,
                          lodash__default['default'].map(groupList, function (item) {
                              var model = _this.modelMap[item.modelId];
                              return m__default['default'](getListWidget(model), {
                                  key: item._id,
                                  modelList: modelList,
                                  itemList: itemList,
                                  item: item,
                                  model: model
                              });
                          })
                      ];
                  })
                  : m__default['default']("span.ma3.db.truncate", {
                      class: colors().text.subheading
                  }, "No matching " + label)
              : m__default['default']("span.ma3.db.truncate", {
                  class: colors().text.subheading
              }, "Use this section to store " + label);
      };
      ItemList.prototype.createNew = function () {
          if (this.createModels.length === 1) {
              newItem(this.createModels[0]);
          }
          else {
              this.listModels = true;
          }
      };
      return ItemList;
  }());

  var ItemCard = /** @class */ (function () {
      function ItemCard() {
          var _this = this;
          this.isCategory = false;
          this.itemCount = stream__default['default'](0);
          this.headerScale = stream__default['default'](1);
          this.setHeaderScale = function () {
              if (_this.headerSpan) {
                  var scale = _this.headerSpan.offsetHeight / _this.headerSpan.scrollHeight;
                  // --> only redraw if header scale has changed
                  if (_this.headerScale() !== scale) {
                      _this.headerScale(scale);
                      m__default['default'].redraw();
                  }
              }
          };
      }
      ItemCard.prototype.oninit = function (_a) {
          var _b = _a.attrs, _c = _b.model.category, category = _c === void 0 ? false : _c, item = _b.item, itemList = _b.itemList;
          this.isCategory = category;
          if (this.isCategory) {
              var _d = item, content = _d.content, _e = _d.countContent, countContent_1 = _e === void 0 ? content : _e, contentAll_1 = _d.contentAll;
              this.itemCount = itemList.map(function (list) { return itemsForCategory(list, countContent_1, contentAll_1).length; });
          }
      };
      ItemCard.prototype.oncreate = function (vnode) {
          var _a;
          this.headerSpan = (_a = vnode.dom.firstChild) === null || _a === void 0 ? void 0 : _a.firstChild;
          this.setHeaderScale();
          window.addEventListener("resize", this.setHeaderScale);
          this.selectHandler = function (e) {
              if (["Enter", " "].includes(e.key) && document.activeElement === vnode.dom) {
                  selectItem(vnode.attrs.model, vnode.attrs.item);
              }
          };
          window.addEventListener("keyup", this.selectHandler);
      };
      ItemCard.prototype.onremove = function () {
          window.removeEventListener("resize", this.setHeaderScale);
          if (this.selectHandler) {
              window.removeEventListener("keyup", this.selectHandler);
          }
      };
      ItemCard.prototype.view = function (_a) {
          var _b = _a.attrs, model = _b.model, item = _b.item;
          var heading = this.isCategory
              ? item.label
              : extractFields(item, model.heading, model.category);
          var subheading = this.isCategory
              ? item.subheading
              : extractFields(item, model.subheading, model.category);
          var subheadingIcon = this.isCategory ? item.subheadingIcon : null;
          var icon = this.isCategory ? item.icon : model.icon;
          var hideEmpty = this.isCategory ? item.hideEmpty : false;
          return hideEmpty && this.itemCount() === 0
              ? null
              : m__default['default']("div.relative.pa2.ma3.f7.f6-ns.f5-l.pointer.flex-shrink-0", {
                  tabIndex: 0,
                  ariaLabel: heading,
                  title: heading,
                  style: item.style,
                  class: theme().uiCardWrapper,
                  onclick: function () { return selectItem(model, item); }
              }, [
                  m__default['default'](".flex.flex-column.items-center.h-100.w-100.overflow-hidden", {}, m__default['default']("span.flex-shrink-0", {
                      class: theme().uiCardHeader,
                      style: {
                          maxHeight: typeof icon === "string" ? "43%" : "13%",
                          transformOrigin: "top",
                          transform: "scale(" + this.headerScale() + ")"
                      }
                  }, heading), typeof icon === "string"
                      ? m__default['default']("i.flex-shrink-0", {
                          class: theme().uiCardIcon + " " + icon
                      })
                      : m__default['default']("img", {
                          src: icon.src,
                          class: theme().uiCardImage + " " + (icon.imageClass || ""),
                          height: icon.height,
                          width: icon.width
                      }), subheading ? m__default['default'](".flex-shrink-0", {
                      class: theme().uiCardSubheading
                  }, m__default['default']("span", subheading), subheadingIcon ?
                      m__default['default']("i.mh2", {
                          class: subheadingIcon
                      }) : null) : null),
                  this.itemCount()
                      ? m__default['default']("span.absolute.ph1.bg-red.br-pill.tc.f5.white.o-80", {
                          class: theme().uiCardCounter,
                          style: { "min-width": "0.65rem" }
                      }, this.itemCount())
                      : null
              ]);
      };
      return ItemCard;
  }());

  var __extends$2 = (this && this.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  var ItemGrid = /** @class */ (function (_super) {
      __extends$2(ItemGrid, _super);
      function ItemGrid() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ItemGrid.prototype.contentWrapperClass = function () {
          return theme().uiItemGridContainer;
      };
      ItemGrid.prototype.viewContent = function (vnode) {
          var _this = this;
          var _a = vnode.attrs, label = _a.item.label, modelList = _a.modelList, itemList = _a.itemList;
          return this.taggedItemList().length
              ? this.filteredItems().length
                  ? lodash__default['default'].map(this.itemGroups(), function (_a) {
                      var groupLabel = _a.label, groupList = _a.itemList;
                      return [
                          groupLabel ? m__default['default']("h4.mh2.mv3.silver", groupLabel) : null,
                          // Card group container
                          m__default['default']("div", {
                              class: theme().uiCardGroup
                          }, lodash__default['default'].map(groupList, function (item) {
                              var model = _this.modelMap[item.modelId];
                              return m__default['default'](ItemCard, {
                                  key: item._id,
                                  modelList: modelList,
                                  itemList: itemList,
                                  item: item,
                                  model: model
                              });
                          }))
                      ];
                  })
                  : m__default['default']("span.ma3.db.truncate", {
                      class: colors().text.subheading
                  }, "No matching " + label)
              : m__default['default']("span.ma3.db.truncate", {
                  class: colors().text.subheading
              }, "Use this section to store " + label);
      };
      return ItemGrid;
  }(ItemList));

  function addFiles(fileList) {
      return function (_a) {
          var files = _a.target.files;
          var newFileList = fileList();
          lodash__default['default'].each(files, function (file) {
              newFileList.push({
                  file: file,
                  _id: uiWidgets.guid(),
                  prop: "tableUpload",
                  name: file.name,
                  size: file.size,
                  type: file.type,
                  lastModified: file.lastModified
              });
          });
          fileList(newFileList);
      };
  }
  function removeFile(fileList, removeId) {
      return function () {
          var newFileList = fileList();
          removeByProperty(newFileList, { _id: removeId });
          fileList(newFileList);
      };
  }
  function renameFile(fileList, updateId) {
      return function (_a) {
          var value = _a.target.value;
          var newFileList = fileList();
          var idx = lodash__default['default'].findIndex(newFileList, { _id: updateId });
          if (idx === -1) {
              return;
          }
          var updateFile = newFileList[idx];
          var ext = uiWidgets.fileNameExtSplit(updateFile.name)[1];
          updateFile.name = value + ext;
          newFileList.splice(idx, 1, updateFile);
          fileList(newFileList);
      };
  }
  var TableUpload = /** @class */ (function () {
      function TableUpload() {
          this.fileList = stream__default['default']([]);
      }
      TableUpload.prototype.view = function (_a) {
          var _this = this;
          var _b = _a.attrs, numCols = _b.numCols, onUpload = _b.onUpload;
          var numFiles = this.fileList().length;
          var nameColSpan = numCols - 3;
          return [
              numFiles ? m__default['default']("tr.f5.tl" + b$1.icon, m__default['default']("td.pa2", {
                  colspan: numCols
              }, [
                  m__default['default']("i.fad.fa-fw.fa-list-ol.mr2"),
                  "Outbox"
              ])) : null,
              // Pending files header
              numFiles ? m__default['default']("tr.tl.fw4" + b$1.bgThead.thead, [
                  // Delete indicator
                  m__default['default']("td.w2.pa1.bb.b--black-10.tc", m__default['default']("i.fal.fa-fw.fa-trash-alt.w2")),
                  // Name, type, size
                  m__default['default']("td.pa1.bb.b--black-10", { colspan: nameColSpan }, "Document"),
                  m__default['default']("td.pa1.bb.b--black-10.dn.dtc-l.tc", m__default['default']("i.fal.fa-fw.fa-file.w2")),
                  m__default['default']("td.pa1.bb.b--black-10.dn.dtc-l", "Size")
              ]) : null,
              // Pending file rows
              lodash__default['default'].map(this.fileList(), function (file) { return m__default['default']("tr", [
                  m__default['default']("td.w2.ph1.pv2.bb.b--black-10.tc.dim.pointer", {
                      onclick: removeFile(_this.fileList, file._id)
                  }, m__default['default']("i.fal.fa-trash-alt.w2")),
                  // Name editor
                  m__default['default']("td.bb.b--black-10", { colspan: nameColSpan }, m__default['default']("input.input-reset.w-100.pl2.pv1.fw2.ba.b--black-10.br2.border-box.dark-gray.bg-washed-yellow[type=text]", {
                      value: uiWidgets.fileNameExtSplit(file.name)[0],
                      onchange: renameFile(_this.fileList, file._id)
                  })),
                  m__default['default']("td.ph1.pv2.bb.b--black-10.dn.dtc-l.tc", getFileValue(file, "type")),
                  m__default['default']("td.ph1.pv2.bb.b--black-10.dn.dtc-l", getFileValue(file, "size")),
              ]); }),
              // File select area
              m__default['default']("tr", m__default['default']("td.pv3", {
                  colspan: numCols
              }, m__default['default']("label.flex.flex-column.pointer[for=upload]", [
                  m__default['default']("input#upload.clip[type=file][multiple=true]", {
                      onchange: addFiles(this.fileList)
                  }),
                  m__default['default'](".pa3.f3.ba.b--dashed.br2", {
                      class: "b--light-silver silver"
                  }, [
                      m__default['default']("i.fal.fa-file-upload.mr2"),
                      m__default['default']("span", "Upload Document")
                  ])
              ]))),
              numFiles ? m__default['default']("tr", m__default['default']("td", {
                  colspan: numCols,
              }, m__default['default'](uiWidgets.Button, {
                  label: "Upload",
                  icon: "fa-upload",
                  classes: "w-100 pa3 br3 f4",
                  onclick: function () { return onUpload(_this.fileList()).then(function () {
                      // Empty pending upload list
                      _this.fileList([]);
                      m__default['default'].redraw();
                  }); }
              }))) : null
          ];
      };
      return TableUpload;
  }());

  var TableItem = /** @class */ (function () {
      function TableItem() {
      }
      TableItem.prototype.oncreate = function (vnode) {
          this.selectHandler = function (e) {
              if (["Enter", " "].includes(e.key) && document.activeElement === vnode.dom) {
                  selectItem(vnode.attrs.model, vnode.attrs.item);
              }
          };
          window.addEventListener("keyup", this.selectHandler);
      };
      TableItem.prototype.onremove = function () {
          if (this.selectHandler) {
              window.removeEventListener("keyup", this.selectHandler);
          }
      };
      TableItem.prototype.view = function (vnode) {
          var _a = vnode.attrs, item = _a.item, model = _a.model, file = _a.file;
          return m__default['default']("tr.pointer", {
              class: theme().uiTableRow,
              ariaLabel: item.props.title,
              tabIndex: 0,
              onclick: function () { return selectItem(model, item); }
          }, [
              // Viewed indicator
              m__default['default']("td.f7.ph1.pv2.bb.b--black-10.tc", {
                  class: theme().uiIcon
              }, item.props.viewed ? null : m__default['default']("i.fas.fa-circle")),
              // Date Deposited
              m__default['default']("td.w4-ns.ph1.pv2.bb.b--black-10", parseDateStr(item.props.date)),
              m__default['default']("td.w3-ns.ph1.pv2.bb.b--black-10", parseTimeStr(item.props.date)),
              // Document Name, type, size
              m__default['default']("td.ph1.pv2.bb.b--black-10.w-100.mw1.truncate", item.props.title),
              m__default['default']("td.ph1.pv2.bb.b--black-10.dn.dtc-l.tc", getFileValue(file, "type")),
              m__default['default']("td.ph1.pv2.bb.b--black-10.dn.dtc-l", getFileValue(file, "size"))
          ]);
      };
      return TableItem;
  }());

  var __extends$3 = (this && this.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  var defaultGroupConf = [{
          key: "office",
          label: "Documents Received",
          direction: "Received",
          icon: "fa-inbox-in"
      }, {
          key: "customer",
          label: "Documents Uploaded",
          direction: "Sent",
          icon: "fa-inbox-out"
      }];
  var ItemTable = /** @class */ (function (_super) {
      __extends$3(ItemTable, _super);
      function ItemTable() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ItemTable.prototype.contentWrapperClass = function () {
          return theme().uiItemTableContainer;
      };
      ItemTable.prototype.viewContent = function (vnode) {
          var _a = vnode.attrs, _b = _a.item, label = _b.label, _c = _b.groupConf, groupConf = _c === void 0 ? defaultGroupConf : _c, onUpload = _a.onUpload;
          // TODO Only accept items of the same model in an itemTable, assume models are document for now
          var model = this.modelMap.documents;
          if (!model) {
              return m__default['default']("span.ma3.db.truncate", {
                  class: colors().text.subheading
              }, "No Document Model");
          }
          var numCols = 6;
          var groupList = this.itemGroups();
          return m__default['default']("table.w-100.f5.f4-ns[cellspacing=0]", {
              class: theme().uiTable
          }, this.taggedItemList().length ? this.filteredItems().length
              // Get groups keyed by each groupConf entry
              ? lodash__default['default'].map(groupConf, function (_a) {
                  var key = _a.key, groupLabel = _a.label, direction = _a.direction, icon = _a.icon;
                  var itemGroup = pickByProperty(groupList, { label: key });
                  var itemList = itemGroup ? itemGroup.itemList : [];
                  return itemList.length ? [
                      // Group label and heading
                      groupLabel
                          ? m__default['default']("tr.f5.tl", {
                              class: theme().uiIcon
                          }, m__default['default']("td.pa2", {
                              colspan: numCols
                          }, [
                              m__default['default']("i.fad.fa-fw.mr2", {
                                  class: icon
                              }),
                              groupLabel
                          ]))
                          : null,
                      // Group heading
                      m__default['default']("tr.tl.fw4", {
                          class: theme().uiTableHeader
                      }, [
                          // Viewed indicator
                          m__default['default']("td.w2.pa1.f7.bb.b--black-10.tc", m__default['default']("i.fal.fa-fw.fa-circle")),
                          // Date Deposited (sent or received)
                          m__default['default']("td.pa1.bb.b--black-10[colspan=2]", "Date " + direction),
                          // File heading fields
                          m__default['default']("td.pa1.bb.b--black-10", "Document Name"),
                          m__default['default']("td.w2.pa1.bb.b--black-10.dn.dtc-l.tc", m__default['default']("i.fal.fa-fw.fa-file")),
                          m__default['default']("td.pa1.bb.b--black-10.dn.dtc-l", "Size")
                      ]),
                      // List each file as individual rows
                      lodash__default['default'].map(itemList, function (item) { return lodash__default['default'].map(item.files, function (file) { return m__default['default'](TableItem, {
                          item: item,
                          model: model,
                          file: file
                      }); }); }),
                  ] : null;
              })
              : m__default['default']("tr.f4.truncate", m__default['default']("td.pa3", {
                  class: colors().text.subheading,
                  colspan: numCols
              }, "No matching " + label))
              : m__default['default']("tr.f4.truncate", m__default['default']("td.pa3", {
                  class: colors().text.subheading,
                  colspan: numCols
              }, "No content in " + label)), 
          // Upload file area
          onUpload ? m__default['default'](TableUpload, {
              numCols: numCols,
              onUpload: onUpload
          }) : null);
      };
      return ItemTable;
  }(ItemList));

  function itemListRoute(items, qry, layoutAttrs, onUpload) {
      return {
          onmatch: function (_a) {
              var itemGuid = _a.itemGuid;
              return items.initialLoad().then(function () { return qry.selectItem(itemGuid); });
          },
          render: function () {
              if (qry.isCategory()) {
                  var item = qry.getItem();
                  // TODO Consider moving component selection into onmatch handler
                  var component = ItemList;
                  if (item.type === "grid" /* grid */) {
                      component = ItemGrid;
                  }
                  else if (item.type === "table" /* table */) {
                      component = ItemTable;
                  }
                  return m__default['default'](Layout, layoutAttrs, m__default['default'](component, {
                      key: item._id,
                      modelList: items.model()(),
                      itemList: items.data(),
                      item: item,
                      onUpload: onUpload
                  }));
              }
              else {
                  return null;
              }
          }
      };
  }

  var _a$2, _b$1;
  var propMap$1 = (_a$2 = {},
      _a$2["label" /* label */] = uiWidgets.BaseText,
      _a$2["trusted" /* trusted */] = uiWidgets.Trusted,
      _a$2["text" /* text */] = uiWidgets.BaseText,
      _a$2["search" /* search */] = uiWidgets.BaseText,
      _a$2["date" /* date */] = uiWidgets.BaseText,
      _a$2["number" /* number */] = uiWidgets.BaseText,
      _a$2["range" /* range */] = uiWidgets.BaseText,
      _a$2["color" /* color */] = uiWidgets.BaseText,
      _a$2["email" /* email */] = uiWidgets.Link,
      _a$2["tel" /* tel */] = uiWidgets.Link,
      _a$2["url" /* url */] = uiWidgets.Link,
      _a$2["textarea" /* textarea */] = uiWidgets.BaseText,
      _a$2["checkbox" /* checkbox */] = uiWidgets.Checkbox,
      _a$2["select" /* select */] = uiWidgets.SelectText,
      _a$2["radio" /* radio */] = uiWidgets.SelectText,
      _a$2);
  var fileMap$1 = (_b$1 = {},
      _b$1["fileMulti" /* fileMulti */] = uiWidgets.FileList,
      _b$1["file" /* file */] = uiWidgets.FileList,
      _b$1["imageMulti" /* imageMulti */] = uiWidgets.ImageList,
      _b$1["image" /* image */] = uiWidgets.ImagePreview,
      _b$1["sign" /* sign */] = uiWidgets.ImagePreview,
      _b$1);
  function buildWidgets(_a, _b) {
      var files = _a.files, props = _a.props;
      var fields = _b.fields;
      return lodash__default['default'](fields).map(function (field) {
          var _a = field.type, type = _a === void 0 ? "text" /* text */ : _a;
          if (propMap$1.hasOwnProperty(type)) {
              // Assemble basic widget (manipulate specific property)
              return {
                  component: propMap$1[type],
                  attrs: {
                      field: field,
                      value: getPropStream(props, field)
                  }
              };
          }
          else if (fileMap$1.hasOwnProperty(type)) {
              // Assemble file widget (manipulate file list subset)
              return {
                  component: fileMap$1[type],
                  attrs: {
                      field: field,
                      value: getFileStream(files, field)
                  }
              };
          }
          else {
              // Unknown type
              return null;
          }
      })
          .compact()
          .value();
  }

  var ItemView = /** @class */ (function () {
      function ItemView() {
          this.widgetList = [];
      }
      ItemView.prototype.oninit = function (_a) {
          var _b = _a.attrs, item = _b.item, model = _b.model;
          // Assemble widgets for each field
          this.widgetList = buildWidgets(item, model);
      };
      ItemView.prototype.view = function (_a) {
          var _b = _a.attrs, model = _b.model, item = _b.item, readonly = _b.readonly, onReturn = _b.onReturn, onEdit = _b.onEdit;
          return m__default['default'](Panel, {
              header: [
                  m__default['default'](uiWidgets.NavButton, {
                      label: model.label,
                      icon: "fa-chevron-left nl2",
                      classes: "dim",
                      onclick: onReturn
                  }),
                  readonly ? null : m__default['default'](uiWidgets.NavButton, {
                      label: "Edit",
                      classes: "dim",
                      onclick: onEdit
                  })
              ],
              content: m__default['default'](".flex-auto.overflow-x-hidden.overflow-y-auto.pa2.safari-bug", [
                  m__default['default'](".pv2.flex.flex-row.bb.b--black-20", [
                      m__default['default'](Icon, { icon: model.icon }),
                      m__default['default']("span.truncate", extractFields(item, model.heading, model.category))
                  ]),
                  // Present widgets
                  lodash__default['default'].map(this.widgetList, function (_a) {
                      var component = _a.component, attrs = _a.attrs;
                      return m__default['default'](component, attrs);
                  }),
                  // Custom components
                  item.post ? m__default['default']("div", { class: theme().uiPostContentWrapper }, buildComponentList(item.post)) : null
              ])
          });
      };
      return ItemView;
  }());

  function itemViewRoute(items, qry, layoutAttrs) {
      return {
          onmatch: function (_a) {
              var itemGuid = _a.itemGuid;
              return items.initialLoad()
                  .then(function () { return qry.selectItem(itemGuid); });
          },
          render: function () { return m__default['default'](Layout, layoutAttrs, m__default['default'](ItemView, {
              modelList: items.model()(),
              itemList: items.data(),
              model: qry.getModel(),
              item: qry.getItem(),
              readonly: qry.isReadonly(),
              onReturn: back,
              onEdit: function () { return editItem(qry.getItem()); }
          })); }
      };
  }

  function addOverlayClass(field, heightPct) {
      return lodash__default['default'].extend({}, field, {
          classes: "h-100 w-100 bg-transparent",
          heightPct: heightPct
      });
  }
  function heightPctFromRect(_a) {
      var x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
      return 100 * (y2 - y1) / (x2 - x1);
  }
  // Build a form using an overlay list
  function buildOverlayFields(overlayList) {
      var overlayForm = lodash__default['default'].map(overlayList, function (_a) {
          var _id = _a._id, field = _a.field, fileValue = _a.fileValue, computed = _a.computed, page = _a.page, rect = _a.rect, preText = _a.preText, postText = _a.postText;
          return {
              key: _id,
              input: addOverlayClass(field, 
              // Scale signature widget to fit binding rectangle
              field.type === "sign" /* sign */ ? heightPctFromRect(rect) : undefined),
              // Smoke and mirrors for FBD signature -> date fields
              fileValue: fileValue ? fileValue : field.type === "sign" /* sign */
                  ? "file-lastmodified" : fileValue,
              computed: computed ? computed : field.id === "CustSignDate" ? {
                  keys: ["CustSignature"],
                  map: "date-format-month"
              } : computed,
              data: {
                  page: page,
                  rect: rect,
                  preText: preText,
                  postText: postText
              }
          };
      });
      return buildFormFields(overlayForm);
  }
  function serialiseOverlay(_a) {
      var fields = _a.fields;
      return lodash__default['default'].reduce(fields, function (prev, field) {
          var key = field.key, type = field.type, value = field.value, files = field.files;
          if (type === 1 /* Prop */ && value) {
              prev[key] = value();
          }
          else if (type === 2 /* File */ && files) {
              var firstFile = lodash__default['default'].head(files());
              if (firstFile && firstFile.file) {
                  prev[key] = firstFile.dataUrl;
                  prev[key + "-ts"] = new Date(firstFile.file.lastModified).toISOString();
              }
          }
          return prev;
      }, {});
  }

  var PageOverlay = /** @class */ (function () {
      function PageOverlay() {
      }
      // Transform overlay elements from pdf co-ordinates ([0, 0] at bottom-left)
      // To DOM positions ([0, 0] at top-right)
      PageOverlay.prototype.view = function (_a) {
          var _b = _a.attrs, overlay = _b.overlay, height = _b.height, scalar = _b.scalar;
          return m__default['default'](".relative.doc-overlay", lodash__default['default'].map(overlay, function (field) {
              if (!field.data || !field.input) {
                  return null;
              }
              var input = field.input, _a = field.data.rect, x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2;
              var _b = input.classes, classes = _b === void 0 ? "" : _b;
              var interactive = canEdit(input);
              // Apply scaling to prop fields
              var scale = field.type === 1 /* Prop */;
              return m__default['default'](".absolute", {
                  // class: interactive ? b.interactive.class : "",
                  // Always position element with scaled co-ordinates
                  style: lodash__default['default'].extend({
                      left: x1 * scalar + "px",
                      top: height - (y2 * scalar) + "px"
                  }, scale
                      ? {
                          // Scale element with CSS transform
                          "width": x2 - x1 + "px",
                          "height": y2 - y1 + "px",
                          "font-size": (y2 - y1) * 0.52 + "px",
                          "transform": "scale(" + scalar + ")",
                          "transform-origin": "top left"
                      }
                      : {
                          // Scale element container, use default size
                          width: (x2 - x1) * scalar + "px",
                          height: (y2 - y1) * scalar + "px"
                      })
              }, assembleFormField(field, {
                  label: "",
                  readonly: true,
                  classes: classes + " " + (interactive ? theme().uiPdfFieldOverlay : "arrow")
              }));
          }));
      };
      return PageOverlay;
  }());

  var PdfPage = /** @class */ (function () {
      function PdfPage() {
          this.rendering = false;
      }
      PdfPage.prototype.oncreate = function (_a) {
          var dom = _a.dom, _b = _a.attrs, page = _b.page, viewport = _b.viewport;
          this.renderPage(page, dom, viewport);
      };
      // Only render when scale changes
      PdfPage.prototype.onbeforeupdate = function (_a, _b) {
          var height = _a.attrs.viewport.height;
          var oldHeight = _b.attrs.viewport.height;
          return height !== oldHeight;
      };
      PdfPage.prototype.onupdate = function (_a) {
          var dom = _a.dom, _b = _a.attrs, page = _b.page, viewport = _b.viewport;
          this.renderPage(page, dom, viewport);
      };
      PdfPage.prototype.view = function () {
          return m__default['default']("canvas.w-100.h-100");
      };
      PdfPage.prototype.renderPage = function (page, canvas, viewport) {
          var _this = this;
          var canvasContext = canvas.getContext("2d");
          // TODO Buffer task if rendering is set true
          if (canvasContext && !this.rendering) {
              // Scale canvas to fill container
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              // Render page
              this.rendering = true;
              var renderTask = page.render({
                  canvasContext: canvasContext,
                  viewport: viewport
              });
              renderTask.promise.then(function () {
                  _this.rendering = false;
              });
          }
      };
      return PdfPage;
  }());

  var PageManager = /** @class */ (function () {
      function PageManager() {
          this.pageBuffer = [];
          // Use small buffer on smaller devices
          this.pageBufferSize = tinyDevice() ? 2 : 3;
          this.scrollPct = 0;
          this.containerWidth = 0;
          this.containerHeight = 0;
          this.pageHeight = 1;
          this.leftMargin = 0;
          this.scalar = 1;
      }
      PageManager.prototype.oncreate = function (_a) {
          var _this = this;
          var dom = _a.dom, _b = _a.attrs, pdf = _b.pdf, overlayForm = _b.overlayForm, scale = _b.scale, jumpTo = _b.jumpTo, zoom = _b.zoom;
          var container = dom;
          this.onResize = size.map(function () {
              _this.containerWidth = container.clientWidth;
              _this.containerHeight = container.clientHeight;
              // Update relative scroll position (minor delay to help mobile device rotation)
              lodash__default['default'].delay(function () {
                  container.scrollTop = _this.scrollPct * (pdf.numPages * _this.pageHeight);
              }, 32);
          });
          // Load pages as user scrolls (with suitable delay)
          this.scrollHandler = lodash__default['default'].throttle(function (scroll) {
              _this.scroll(pdf, overlayForm, scroll);
          }, 333, { leading: false });
          // Clamp pageBufferSize for smaller documents
          this.pageBufferSize = Math.min(this.pageBufferSize, pdf.numPages);
          // Populate pageBuffer
          this.getPage(pdf, overlayForm, 1).then(function (page) {
              // Store first page for scaling use
              _this.firstPage = page;
              _this.applyScaling(scale, zoom);
          }).then(function () { return _this.scroll(pdf, overlayForm, 0); });
          // Support jumping to an arbitrary overlay
          jumpTo.map(function (field) {
              var _a;
              // Don't scroll to widgets on page 0 (invisible widget special case)
              if (field && field.input && ((_a = field.data) === null || _a === void 0 ? void 0 : _a.page)) {
                  var id_1 = field.input.id, page = field.data.page;
                  var scrollTo_1 = (page - 1) * _this.pageHeight;
                  _this.scroll(pdf, overlayForm, scrollTo_1);
                  // Focus input (or navigate to page)
                  _this.jumpDelay = lodash__default['default'].delay(function () {
                      var input = document.getElementById(id_1);
                      if (input) {
                          if (smallDevice()) {
                              // Help keep widget visible with mobile keyboard (+ small margin)
                              input.scrollIntoView({ block: "end", inline: "center" });
                              container.scrollTop += 15;
                          }
                          else {
                              input.scrollIntoView({ block: "center" });
                          }
                      }
                      else {
                          container.scrollTop = scrollTo_1;
                      }
                  }, 125);
              }
          });
      };
      PageManager.prototype.onremove = function () {
          this.onResize.end(true);
          this.scrollHandler.cancel();
          if (this.jumpDelay) {
              clearTimeout(this.jumpDelay);
          }
      };
      PageManager.prototype.onbeforeupdate = function (_a) {
          var _b = _a.attrs, scale = _b.scale, zoom = _b.zoom;
          this.applyScaling(scale, zoom);
      };
      PageManager.prototype.view = function (_a) {
          var _this = this;
          var _b = _a.attrs, pdf = _b.pdf, onSelect = _b.onSelect;
          return m__default['default'](".flex-auto.overflow-x-auto.overflow-y-scroll.bg-gray.safari-bug", {
              onclick: function (_a) {
                  var target = _a.target;
                  if (target && target.id) {
                      onSelect(target.id);
                  }
              },
              onscroll: function (evt) {
                  evt.redraw = false;
                  if (evt.target && _this.scrollHandler) {
                      _this.scrollHandler(evt.target.scrollTop);
                  }
              },
          }, 
          // "Document-sized" page container
          m__default['default'](".relative", {
              style: {
                  height: pdf.numPages * this.pageHeight + "px"
              }
          }, this.pageBuffer.map(function (_a) {
              var page = _a.page, overlay = _a.overlay;
              // Positioned visible page subset
              var viewport = page.getViewport({
                  scale: _this.scalar
              });
              return m__default['default'](".absolute.bg-near-white.shadow-5", {
                  key: page.pageNumber,
                  style: {
                      width: viewport.width + "px",
                      height: viewport.height + "px",
                      transform: "translate(" + _this.leftMargin + "px, " + (page.pageNumber - 1) * _this.pageHeight + "px)"
                  }
              }, [
                  m__default['default'](PageOverlay, {
                      overlay: overlay,
                      height: viewport.height,
                      scalar: _this.scalar
                  }),
                  m__default['default'](PdfPage, {
                      page: page,
                      // Render page scaled with respect to device DPI
                      viewport: page.getViewport({
                          scale: _this.scalar * (window.devicePixelRatio || 1)
                      })
                  })
              ]);
          })));
      };
      // Set pages scaling under assumption all pages are the same height
      PageManager.prototype.applyScaling = function (scaling, zoom) {
          if (this.firstPage) {
              var _a = this.firstPage.page.getViewport({ scale: 1 }), width = _a.width, height = _a.height;
              switch (scaling) {
                  case 0 /* FitWidth */:
                      this.scalar = this.containerWidth / width;
                      break;
                  case 1 /* FitHeight */:
                      this.scalar = this.containerHeight / height;
                      break;
                  // PageScale.Pct100
                  default:
                      this.scalar = 1.5;
              }
              // Apply zoom factor
              this.scalar *= zoom;
              this.applyPageScale();
          }
      };
      PageManager.prototype.applyPageScale = function () {
          if (this.firstPage) {
              var _a = this.firstPage.page.getViewport({ scale: 1 }), width = _a.width, height = _a.height;
              // Apply page margin to height
              this.pageHeight = height * this.scalar + PageManager.margin;
              // Calculate margin to centre pages that are smaller than the viewport
              var pageWidth = width * this.scalar;
              if (pageWidth < this.containerWidth) {
                  this.leftMargin = 0.5 * (this.containerWidth - pageWidth);
              }
              else {
                  this.leftMargin = 0;
              }
          }
      };
      // Ensure pages are loaded and rendered based on the viewport scroll position
      PageManager.prototype.scroll = function (pdf, overlayForm, scroll) {
          var _this = this;
          // Store scroll as a percentage relative to document size
          this.scrollPct = scroll / (pdf.numPages * this.pageHeight);
          // Determine where page buffer should "start" relative to scroll
          var pos = scroll + 0.5 * this.pageHeight;
          var startPos = pos - (this.pageBufferSize - 1) * 0.33 * this.pageHeight;
          // Clamp buffer start page within document limits
          var start = Math.min(Math.max(1, Math.round(startPos / this.pageHeight)), pdf.numPages - this.pageBufferSize + 1);
          // Load pages from pdf or reuse from pageBuffer
          var shouldRedraw = false;
          Promise.all(lodash__default['default'].map(new Array(this.pageBufferSize), function (_, idx) {
              var num = start + idx;
              var existing = lodash__default['default'].find(_this.pageBuffer, { page: { pageNumber: num } });
              if (existing) {
                  return Promise.resolve(existing);
              }
              else {
                  shouldRedraw = true;
                  return _this.getPage(pdf, overlayForm, num);
              }
          })).then(function (pageList) {
              _this.pageBuffer = pageList;
              if (shouldRedraw) {
                  m__default['default'].redraw();
              }
          });
      };
      // Get pdf page and respective overlay list
      PageManager.prototype.getPage = function (pdf, overlayForm, num) {
          return new Promise(function (resolve) { return pdf.getPage(num).then(function (page) { return resolve({
              page: page,
              overlay: lodash__default['default'].filter(overlayForm.fields, function (field) { return Boolean(field.data && field.data.page === num); })
          }); }); });
      };
      PageManager.margin = 10;
      return PageManager;
  }());

  /**
   * Smooth step through PDF zoom multipliers
   * @param input - Scale value (negative for zoom out, positive to zoom in)
   * @returns Smoothed value (0.25 - 4 for input between -2 and 2)
   */
  function scaleSmoothStep(input) {
      return Math.pow(2, input);
  }
  var Pdf = /** @class */ (function () {
      function Pdf() {
          this.statusText = "Loading...";
          this.pageScale = smallDevice() ? 0 /* FitWidth */ : 2 /* Pct100 */;
          this.zoom = stream__default['default'](0 /* Default */);
          this.smoothZoom = this.zoom.map(scaleSmoothStep);
          this.activeField = stream__default['default']();
          // TODO Convert to streams?
          this.editList = [];
          this.actionCount = stream__default['default'](0);
          this.state = stream__default['default'](0 /* view */);
      }
      Pdf.prototype.oninit = function (_a) {
          var _this = this;
          var _b = _a.attrs, _c = _b.item, _id = _c._id, files = _c.files, actions = _c.actions, uploadDelay = _b.uploadDelay;
          // Get pdf path from first file
          var fileObj = lodash__default['default'].head(files);
          if (fileObj && fileObj.remoteUrl) {
              this.fileObj = fileObj;
              this.pdfPath = fileObj.remoteUrl;
          }
          else {
              this.statusText = "No File Present";
          }
          // Get overlay actions
          this.formAction = lodash__default['default'].head(filterByProperty(actions, { type: "form" /* form */ }));
          var fieldList = filterByProperty(actions, { type: "overlay" /* overlay */ });
          this.overlayForm = buildOverlayFields(fieldList);
          // Limit list to unique widgets that can be modified
          this.editList = lodash__default['default'](this.overlayForm.fields)
              .filter(function (_a) {
              var input = _a.input;
              return input ? canEdit(input) : false;
          })
              .uniqBy(function (_a) {
              var input = _a.input;
              return input === null || input === void 0 ? void 0 : input.id;
          })
              .value();
          // Display count of unpopulated required overlay fields
          this.actionCount = stream__default['default'].merge(lodash__default['default'](this.editList)
              .map(function (_a) {
              var input = _a.input, value = _a.value;
              return input && input.required ? value : null;
          })
              .compact()
              .value()).map(function (values) { return lodash__default['default']
              // Count widgets that don't have values set
              .reduce(values, function (acc, value) { return hasValue(value) ? acc : acc + 1; }, 0); });
          if (this.formAction) {
              this.state(1 /* call */);
              // Submit when there are no remaining actions
              // TODO Revise submission when document has mix of required/optional inputs
              stream__default['default'].lift(function (newState, newCount) {
                  if (newState === 2 /* edit */ && newCount === 0) {
                      // Mark form as complete if there is no next empty widget
                      _this.state(3 /* complete */);
                  }
                  if (newState === 3 /* complete */) {
                      if (_this.formAction && _this.fileObj) {
                          var formData_1 = new FormData();
                          // Add item and file ids
                          formData_1.append("item_id", _id);
                          formData_1.append("file_id", _this.fileObj._id);
                          // Write overlay values
                          lodash__default['default'].forEach(_this.serialise(), function (value, key) {
                              formData_1.append(key, String(value));
                          });
                          var uploadUrl_1 = _this.formAction.url;
                          lodash__default['default'].delay(function () { return sdxRequest({
                              method: "POST",
                              url: uploadUrl_1,
                              body: formData_1
                          }); }, uploadDelay);
                      }
                  }
              }, this.state, this.actionCount);
          }
      };
      Pdf.prototype.oncreate = function () {
          var _this = this;
          if (this.pdfPath) {
              pdfjsDist.getDocument(this.pdfPath).promise.then(function (pdf) { return _this.pdf = pdf; }, function (err) {
                  var _a, _b, _c;
                  // Basic tests for common 4xx response codes
                  if (/server response \(440\)/g.test(err)) {
                      // Session expired, reload page to login again
                      reload();
                  }
                  else if (/server response \(403\)/g.test(err)) {
                      _this.statusText = "Unable to access " + ((_a = _this.fileObj) === null || _a === void 0 ? void 0 : _a.name);
                  }
                  else if (/Missing PDF/g.test(err)) {
                      _this.statusText = ((_b = _this.fileObj) === null || _b === void 0 ? void 0 : _b.name) + " not found";
                  }
                  else {
                      _this.statusText = "Error loading " + ((_c = _this.fileObj) === null || _c === void 0 ? void 0 : _c.name);
                  }
              }).then(m__default['default'].redraw);
          }
      };
      Pdf.prototype.onremove = function () {
          if (this.pdf) {
              this.pdf.destroy();
          }
      };
      Pdf.prototype.view = function () {
          var _this = this;
          var _a, _b, _c, _d;
          var active = this.activeField();
          return m__default['default'](Panel, {
              header: [
                  noreturn() ? m__default['default']("div") : m__default['default'](uiWidgets.NavButton, {
                      icon: "fal fa-arrow-left nl2",
                      title: "Back",
                      classes: "f3 dim",
                      onclick: back
                  }),
                  m__default['default']("div.flex.w-50.w-35-m.w-20-l.justify-between", [
                      m__default['default'](uiWidgets.NavButton, {
                          icon: "fal fa-search-plus fa-fw",
                          title: "Zoom In",
                          classes: "f3 dim fw4",
                          disabled: this.zoom() >= 2 /* Max */,
                          onclick: function () { return _this.adjustZoom(0.5 /* Increment */); }
                      }),
                      m__default['default'](uiWidgets.NavButton, {
                          icon: "fal fa-redo fa-fw",
                          title: "Reset Zoom",
                          classes: "f3 dim",
                          onclick: function () { return _this.resetZoom(); }
                      }),
                      m__default['default'](uiWidgets.NavButton, {
                          icon: "fal fa-search-minus fa-fw",
                          title: "Zoom Out",
                          classes: "f3 dim",
                          disabled: this.zoom() <= -2 /* Min */,
                          onclick: function () { return _this.adjustZoom(-0.5 /* Decrement */); }
                      }),
                  ]),
                  this.pdfPath ? m__default['default'](uiWidgets.NavLink, {
                      icon: "fal fa-arrow-to-bottom",
                      title: "Download",
                      classes: "f3 dim",
                      href: this.pdfPath
                  }) : null,
              ],
              headerClass: "h2.5 " + theme().uiPdfTopBar,
              // Pop-out menu
              subheaderClass: "relative",
              content: this.pdf
                  ? m__default['default'](PageManager, {
                      pdf: this.pdf,
                      overlayForm: this.overlayForm,
                      scale: this.pageScale,
                      zoom: this.smoothZoom(),
                      jumpTo: this.activeField,
                      onSelect: function (id) { return _this.setWidget(id); }
                  })
                  : m__default['default'](".flex-auto.bg-gray", m__default['default']("span.ma3.db.truncate", {
                      class: colors().text.subheading
                  }, this.statusText)),
              // Bottom toolbar area
              // TODO Consider moving out into own component
              footer: this.state() !== 0 /* view */ ? m__default['default'](".relative.flex.flex-column.justify-around.items-center.pa1.shadow-2.flex-shrink-0", {
                  style: { "min-height": "6rem" },
                  class: theme().uiPdfBottomBar
              }, m__default['default'](".absolute.bottom-0.right-0.z-999.pr2", {
                  style: {
                      transform: "translateY(-100%)",
                  },
              }, []), active && active.data ? [
                  // Active widget
                  active.data.preText ? m__default['default']("p.ma1.f6.tc", active.data.preText) : null,
                  m__default['default']("form.w-100.mw5.ma1", {
                      onsubmit: function () {
                          _this.setNextWidget();
                          return false;
                      }
                  }, assembleFormField(active, { id: "overlay-assist" })),
                  active.data.postText ? m__default['default']("p.ma1.f6.tc", active.data.postText) : null
              ] : this.state() === 1 /* call */ ? [
                  // Document fill intro section
                  m__default['default'](uiWidgets.NavButton, {
                      title: "Start",
                      icon: ((_a = this.formAction) === null || _a === void 0 ? void 0 : _a.icon) || "fal fa-chevron-down",
                      classes: "absolute f1 top-0 nt4 br-100 shadow-4 pt3 pulse " + b$1.button.bgButton.class,
                      // Activate next unset widget
                      onclick: function () { return _this.setActive(_this.nextEmptyWidget()); }
                  }),
                  m__default['default'](".w-100.flex-auto.flex.flex-column-reverse.items-center.pointer", {
                      onclick: function () { return _this.setActive(_this.nextEmptyWidget()); }
                  }, 
                  // Form action text
                  m__default['default']("p.mv2.f6.tc", (_b = this.formAction) === null || _b === void 0 ? void 0 : _b.label))
              ] : this.state() === 3 /* complete */ ? m__default['default']("p.self-center.mw5.mv0.f2.fw3.tc", {
                  class: colors().text.default
              }, [
                  // Document complete notification
                  ((_c = this.formAction) === null || _c === void 0 ? void 0 : _c.completeIcon) ? m__default['default']("i.mr2", {
                      class: this.formAction.completeIcon
                  }) : null,
                  (_d = this.formAction) === null || _d === void 0 ? void 0 : _d.complete
              ]) : null) : null
          });
      };
      Pdf.prototype.activeWidgetIdx = function () {
          var active = this.activeField();
          if (active && active.input) {
              return lodash__default['default'].findIndex(this.editList, lodash__default['default'].matches({ input: { id: active.input.id } }));
          }
          else {
              return undefined;
          }
      };
      Pdf.prototype.setActive = function (field) {
          this.state(2 /* edit */);
          if (field) {
              this.activeField(field);
              this.focusWidget();
          }
      };
      Pdf.prototype.nextEmptyWidget = function () {
          return lodash__default['default'].find(this.editList, function (_a) {
              var value = _a.value;
              return value ? !hasValue(value()) : true;
          });
      };
      // Find and activate widget by id
      Pdf.prototype.setWidget = function (id) {
          this.setActive(lodash__default['default'].find(this.editList, lodash__default['default'].matches({ input: { id: id } })));
      };
      // Find and set next/previous editable widget
      Pdf.prototype.setNextWidget = function (direction) {
          if (direction === void 0) { direction = 1; }
          var newIdx = this.activeWidgetIdx();
          if (newIdx !== undefined) {
              newIdx += direction;
              if (newIdx >= 0 && newIdx < this.editList.length) {
                  this.setActive(this.editList[newIdx]);
              }
          }
      };
      Pdf.prototype.focusWidget = function () {
          lodash__default['default'].delay(function () {
              var widgetInput = document.getElementById("overlay-assist");
              if (widgetInput) {
                  widgetInput.focus();
              }
          }, 32);
      };
      Pdf.prototype.adjustZoom = function (delta) {
          // Clamp zoom value
          this.zoom(Math.max(-2 /* Min */, Math.min(this.zoom() + delta, 2 /* Max */)));
          window.dispatchEvent(new Event("resize"));
      };
      Pdf.prototype.resetZoom = function () {
          this.zoom(0 /* Default */);
      };
      Pdf.prototype.serialise = function () {
          this.activeField(undefined);
          return serialiseOverlay(this.overlayForm);
      };
      return Pdf;
  }());

  function pdfViewRoute(items, qry, layoutAttrs, uploadDelay) {
      return {
          onmatch: function (_a) {
              var itemGuid = _a.itemGuid;
              return items.initialLoad()
                  .then(function () { return qry.selectItem(itemGuid); });
          },
          render: function () { return m__default['default'](Layout, layoutAttrs, m__default['default'](Pdf, {
              item: qry.getItem(),
              uploadDelay: uploadDelay
          })); }
      };
  }

  /**
   * Create vault application, loading/saving data, and performing routing via history states
   */
  function vault(appConf) {
      return bootstrap(appConf).then(function (_a) {
          var application = _a.application, pusher = _a.pusher;
          var uploadDelay = application.vault && application.vault.fileDelay ? application.vault.fileDelay : 2500;
          var files = new Files(application.vault);
          var items = new Items(application.vault);
          var qry = new ItemSelect(items.model(), items.data());
          var vaultModel = new Vault(files, items, qry);
          // Reload application/user-level data on socket messages
          pusher.applicationChannel.bind("reloadapplication" /* reloadApplication */, function () { return items.loadApplication().then(m__default['default'].redraw); });
          pusher.applicationUserChannel.bind("reloaditems" /* reloadItems */, function () { return items.loadUser().then(m__default['default'].redraw); });
          // Load new assets added by given sjr
          // TODO Enforce interface to event data including direction (sent/received) or full message
          pusher.applicationUserChannel.bind("newassets" /* updateAssets */, function (params) {
              items.updateAssets(params).then(function (count) {
                  dialog({
                      message: "We have sent " + count + " new documents",
                      context: exports.ToastContext.info
                  });
                  m__default['default'].redraw();
              }).catch(errNotification);
          });
          // Merge new documents into assets
          pusher.applicationUserChannel.bind("document" /* addAssets */, function (assetList) {
              if (assetList.length) {
                  var count = items.addAssets(assetList);
                  var direction = assetList[0].origin === "customer" ? "received" : "sent";
                  dialog({
                      message: "We have " + direction + " " + count + " new documents",
                      context: exports.ToastContext.info
                  });
                  m__default['default'].redraw();
              }
          });
          // Mark viewed assets
          pusher.applicationUserChannel.bind("viewed" /* viewed */, function (asset) {
              items.viewAsset(asset);
              m__default['default'].redraw();
          });
          // Setters
          function updateItem(item, fileList) {
              return vaultModel.upsertItem(item, fileList)
                  // Apply final delay
                  .then(function () { return new Promise(function (resolve) { return setTimeout(resolve, uploadDelay); }); })
                  .catch(errNotification);
          }
          function removeItem(item) {
              return vaultModel.removeItem(item).catch(errNotification);
          }
          // Attributes common to layout component
          var layoutAttrs = {
              saving: vaultModel.saving,
              progress: files.getPercent()
          };
          var layoutAttrsNoHeader = lodash__default['default'].extend({
              responsiveHeader: true
          }, layoutAttrs);
          var layoutAttrsMinimal = lodash__default['default'].extend({
              responsiveHeader: true,
              responsiveFooter: true
          }, layoutAttrs);
          // Default page to listing items tagged "home"
          m.route(document.getElementById("page"), homeRoute, {
              // TODO Assemble route keys with ActionType enum (requires ES6 support)
              // Display category content
              "/:itemGuid/list": itemListRoute(items, qry, layoutAttrs, files.canUploadAssets()
                  ? function (fileList) { return vaultModel.uploadAssets(qry.getItem(), fileList)
                      .catch(errNotification); }
                  : undefined),
              // Direct access to item in "single entry" categories
              "/:itemGuid/single": categorySingleRoute(items, qry, layoutAttrsNoHeader, function (item, fileList) { return updateItem(item, fileList).then(back).catch(errNotification); }, removeItem),
              // New instance of model
              "/:modelGuid/new": itemNewRoute(items, qry, layoutAttrsNoHeader, function (item, fileList) { return updateItem(item, fileList)
                  // Go to default item action
                  .then(function () { return selectItem(qry.getModel(), item, {
                  replace: true
              }); })
                  .catch(errNotification); }, removeItem),
              // IDataItem suitable actions
              "/:itemGuid/view": itemViewRoute(items, qry, layoutAttrsNoHeader),
              "/:itemGuid/edit": itemEditRoute(items, qry, layoutAttrsNoHeader, function (item, fileList) { return updateItem(item, fileList).then(back).catch(errNotification); }, function (item) { return removeItem(item).then(home).catch(errNotification); }),
              // Custom component container
              "/:itemGuid/comp": customDefaultRoute(items, qry, layoutAttrs),
              "/:itemGuid/comp/:actionGuid": customRoute(items, qry, layoutAttrs),
              // PDF Viewer + input overlay
              "/:itemGuid/pdf": pdfViewRoute(items, qry, layoutAttrsMinimal, uploadDelay)
          });
          return {
              application: application,
              pusher: pusher
          };
      });
  }

  exports.DialogContext = exports.ToastContext;
  exports.application = application;
  exports.assembleFormField = assembleFormField;
  exports.branding = branding;
  exports.buildComponent = buildComponent;
  exports.buildComponentList = buildComponentList;
  exports.buildFormFields = buildFormFields;
  exports.colors = colors;
  exports.createResponsiveClass = createResponsiveClass;
  exports.dialog = dialog;
  exports.registerComponent = registerComponent;
  exports.registerFileMapFn = registerFileMapFn;
  exports.registerMapFn = registerMapFn;
  exports.registerMergeFn = registerMergeFn;
  exports.sdxRequest = sdxRequest;
  exports.size = size;
  exports.theme = theme;
  exports.vault = vault;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
