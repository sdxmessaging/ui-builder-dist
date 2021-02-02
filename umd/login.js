(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash'), require('mithril'), require('mithril/stream'), require('jss'), require('@sdxmessaging/ui-widgets'), require('js-sha256'), require('pusher-js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash', 'mithril', 'mithril/stream', 'jss', '@sdxmessaging/ui-widgets', 'js-sha256', 'pusher-js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.uiBuilder = {}, global._, global.m, global.m.stream, global.jss, global.uiWidgets, global.sha256, global.Pusher));
}(this, (function (exports, lodash, m, stream, jss, uiWidgets, jsSha256, Pusher) { 'use strict';

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

  var psuedoElems = ["after", "before", "first-line", "first-letter", "selection"];
  var psuedoSelectors = ["active", "checked", "disabled", "empty", "enabled", "first-child", "first-of-type", "focus", "hover", "in-range", "invalid", "last-child", "last-of-type", "link", "not", "only-of-type", "only-child", "optional", "out-of-range", "read-only", "read-write", "required", "root", "target", "valid", "visited"];
  var indexedSelectors = ["nth-child", "nth-last-child", "nth-last-of-type", "nth-of-type"];
  var deliniators = { "-space-": " ", "space-": " ", "-dot-": " .", "dot-": " .", "-chevron-": " >", "chevron-": " >", "-hash-": " #", "hash-": " #" };
  function jssPluginPsuedo() {
      function replaceParentRefs(prop, parent) {
          var selectorFunction = function (key) {
              var selector = lodash__default['default'].find(indexedSelectors, function (entry) { return key.search(entry) !== -1; });
              if (selector) {
                  var index = key.slice(selector.length + 1);
                  return ":" + key.slice(0, selector.length) + "(" + index + ")";
              }
              return key;
          };
          var replaceDeliniators = function (key) {
              return lodash__default['default'].reduce(lodash__default['default'].entries(deliniators), function (acc, _a) {
                  var deliniator = _a[0], value = _a[1];
                  var start = key.search(deliniator);
                  acc = !acc ? key : acc;
                  if (start !== -1) {
                      acc = acc.replace(deliniator, value);
                  }
                  return acc;
              }, "");
          };
          var addPsudoSelectors = function (key) {
              psuedoElems.forEach(function (selector) { return key = key.replace(selector, "::" + selector); });
              psuedoSelectors.forEach(function (selector) { return key = key.replace(selector, ":" + selector); });
              key = selectorFunction(key);
              return "" + parent + key;
          };
          var deliniaitedKey = replaceDeliniators(prop);
          return addPsudoSelectors(deliniaitedKey);
      }
      function onProcessStyle(style, rule, _) {
          if (rule.type !== 'style')
              return style;
          var styleRule = rule;
          var container = styleRule.options.parent;
          lodash__default['default'].forEach(style, function (value, key) {
              if (typeof value !== "string" && typeof value === "object") {
                  var selector = replaceParentRefs(key, styleRule.selector);
                  container.addRule(selector, value, { selector: selector });
                  delete style[key];
              }
          });
          return style;
      }
      return { onProcessStyle: onProcessStyle };
  }

  var classMapper = {
      uiTableHeader: 'ag-header',
      uiTableHeaderCell: 'ag-header-cell'
  };
  function jssPluginAgGridClassMapper() {
      function onProcessStyle(style, rule, sheet) {
          if (rule.type !== 'style')
              return style;
          if (rule.id && classMapper[rule.id.replace(/(-\d+)*/g, "")] && sheet) {
              var importantStyle = lodash__default['default'].reduce(lodash__default['default'].entries(rule.style), function (acc, _a) {
                  var key = _a[0], value = _a[1];
                  acc[key] = value + " !important";
                  return acc;
              }, {});
              var r = sheet.addRule(classMapper[rule.id.replace(/(-\d+)*/g, "")], importantStyle, {
                  selector: '.' + classMapper[rule.id.replace(/(-\d+)*/g, "")],
              });
              r.id = classMapper[rule.id];
          }
          return style;
      }
      return { onProcessStyle: onProcessStyle };
  }

  function jssIncreaseSpecificity(userOptions) {
      var options = lodash__default['default'].assign({ repeat: 2 }, userOptions);
      var prefix = Array(options.repeat).join(':not(#\\20)');
      return {
          onProcessRule: function (rule, sheet) {
              var parent = rule.options.parent;
              if (sheet.options.increaseSpecificity === false ||
                  rule.type !== 'style' ||
                  (parent && parent.type === 'keyframes') ||
                  rule.selectorText.search(':not(#\\20)') !== -1)
                  return;
              rule.selectorText = prefix + rule.selectorText;
          }
      };
  }

  function formatDate(timeValue, mask) {
      if (mask === void 0) { mask = "P"; }
      return format(timeValue, mask, { locale: locale$1 });
  }
  /**
   * Pass-through function for replacing m.request "deserialize" JSON parsing default
   */
  function simpleResponse(value) {
      return value;
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
  jss__default['default'].use(jssPluginPsuedo(), jssPluginAgGridClassMapper());
  function kebabifyStyle(style) {
      return lodash__default['default'].reduce(style, function (acc, value, key) {
          acc[lodash__default['default'].kebabCase(key)] = value;
          return acc;
      }, {});
  }
  function createResponsiveClass(_a, uiSheet) {
      var _b, _c, _d;
      var style = _a.style, styleNS = _a.styleNS, styleM = _a.styleM, styleL = _a.styleL, classes = _a.classes, _e = _a.key, key = _e === void 0 ? "unnamed" : _e;
      var _uiSheet = uiSheet ? uiSheet : jss__default['default'].createStyleSheet({});
      var classList = [];
      var rule;
      if (style) {
          rule = _uiSheet.addRule(key, kebabifyStyle(style));
          if (rule.id)
              classList.push(rule.id);
      }
      if (styleNS) {
          rule = _uiSheet.addRule(mediaNS, (_b = {}, _b[key] = kebabifyStyle(styleNS), _b));
          rule = rule.getRule(key);
          if (rule.id)
              classList.push(rule.id);
      }
      if (styleM) {
          rule = _uiSheet.addRule(mediaM, (_c = {}, _c[key] = kebabifyStyle(styleM), _c));
          rule = rule.getRule(key);
          if (rule.id)
              classList.push(rule.id);
      }
      if (styleL) {
          rule = _uiSheet.addRule(mediaL, (_d = {}, _d[key] = kebabifyStyle(styleL), _d));
          rule = rule.getRule(key);
          if (rule.id)
              classList.push(rule.id);
      }
      if (classList.length && !uiSheet) {
          _uiSheet.attach();
      }
      if (classes) {
          classList.push(classes);
      }
      return classList.join(" ");
  }
  var applyThemeJss = jss.create({
      plugins: [jssPluginAgGridClassMapper(), jssPluginPsuedo(), jssIncreaseSpecificity()]
  });
  var ResponsiveThemeHandler = /** @class */ (function () {
      function ResponsiveThemeHandler(applyTheme) {
          var _this = this;
          this._classes = {};
          this.uiSheet = applyThemeJss.createStyleSheet({});
          lodash__default['default'].map(applyTheme, function (themeObj, key) {
              _this._classes[key] = createResponsiveClass(lodash__default['default'].assign({ key: key, increaseSpecificity: true }, themeObj), _this.uiSheet);
          });
          this.uiSheet.attach();
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
  function hasChildren(header) {
      if (lodash__default['default'].isArray(header)) {
          return lodash__default['default'].filter(header).length;
      }
      return header;
  }
  function ButtonContextMapper(context) {
      switch (context) {
          case "default" /* default */:
              return "alt" /* alt */;
          case "alt" /* alt */:
              return "default" /* default */;
          case "altLighter" /* altLighter */:
              return "lighter" /* lighter */;
          case "altDarker" /* altDarker */:
              return "darker" /* darker */;
          case "darker" /* darker */:
              return "altDarker" /* altDarker */;
          case "lighter" /* lighter */:
              return "altLighter" /* altLighter */;
          case "warn" /* warn */:
              return "neutral" /* neutral */;
          case "error" /* error */:
              return "neutral" /* neutral */;
          default: return "neutral" /* neutral */;
      }
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

  var application = stream__default['default']();
  // Update ui-widgets config when application is set
  application.map(function (_a) {
      var uiWidgets$1 = _a.uiWidgets;
      uiWidgets.updateConfig({
          signFont: "Caveat",
          stampBtnClass: "pulse",
          stampBtnContext: "alt"
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
          context: "error" /* error */
      });
  }

  var BrandingRoute;
  (function (BrandingRoute) {
      BrandingRoute["list"] = "list";
      BrandingRoute["root"] = "root";
      BrandingRoute["single"] = "single";
      BrandingRoute["new"] = "new";
      BrandingRoute["view"] = "view";
      BrandingRoute["edit"] = "edit";
      BrandingRoute["comp"] = "comp";
      BrandingRoute["pdf"] = "pdf";
      BrandingRoute["default"] = "default";
  })(BrandingRoute || (BrandingRoute = {}));

  var baseBranding = stream__default['default']({});
  var routeString = stream__default['default'](BrandingRoute.default);
  var branding = stream__default['default'].lift(function (route, base) {
      var routes = base.routes || {};
      return lodash__default['default'].assign({}, base, routes[route]);
  }, routeString, baseBranding);
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
      ] : _j, _k = _a.routes, routes = _k === void 0 ? {} : _k;
      baseBranding({
          company: company, copyright: copyright,
          tel: tel, email: email, address: address,
          poweredBy: poweredBy,
          header: header, subheader: subheader, footer: footer, routes: routes
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

  var uiColorSheet = jss__default['default'].createStyleSheet({});
  var ThemeColor = /** @class */ (function () {
      function ThemeColor(input) {
          this.key = input.key;
          this.background = input.background;
          this.color = input.color;
          this._style = {
              background: input.background,
              color: input.color
          };
          this._classes = {
              background: createResponsiveClass({
                  key: input.key,
                  style: { background: input.background }
              }, uiColorSheet),
              color: createResponsiveClass({
                  key: input.key,
                  style: { color: input.color }
              }, uiColorSheet)
          };
      }
      Object.defineProperty(ThemeColor.prototype, "style", {
          get: function () {
              return lodash__default['default'].assign({}, this._style);
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(ThemeColor.prototype, "classes", {
          get: function () {
              return this._classes;
          },
          enumerable: false,
          configurable: true
      });
      return ThemeColor;
  }());
  var UIThemeColorsHelper = /** @class */ (function () {
      function UIThemeColorsHelper() {
          this._body = new ThemeColor({
              key: 'body_colors',
              background: 'linear-gradient(232deg, rgba(119, 171, 203, 0.4) 0%, rgba(255,255,255,1) 58%, rgba(255,255,255,1) 67%, rgba(119, 173, 206, 0.6) 100%)',
              color: "#333333",
          });
          this._default = new ThemeColor({
              key: "default_colors",
              background: "#fff",
              color: "#6db0ec",
          });
          this._lighter = new ThemeColor({
              key: "lighter_colors",
              background: "#fff",
              color: "#9bc6ec",
          });
          this._darker = new ThemeColor({
              key: "darker_colors",
              background: "#efefef",
              color: "#3372bc",
          });
          this._alt = new ThemeColor({
              key: "alt_colors",
              background: "#6db0ef",
              color: "#fff",
          });
          this._altLighter = new ThemeColor({
              key: "altLighter_colors",
              background: "#9bc6ec",
              color: "#333333",
          });
          this._altDarker = new ThemeColor({
              key: "altDarker_colors",
              background: "#3372bc",
              color: "#fff",
          });
          this._error = new ThemeColor({
              key: "error_colors",
              background: "#ED5d5d",
              color: "#fff",
          });
          this._warn = new ThemeColor({
              key: "warn_colors",
              background: "#ff925c",
              color: "#fff",
          });
          this._neutral = new ThemeColor({
              key: "neutral_colors",
              background: "#fff",
              color: "#333333",
          });
      }
      UIThemeColorsHelper.prototype.getContextClasses = function (context) {
          return this[context].classes.background + " " + this[context].classes.color;
      };
      UIThemeColorsHelper.prototype.update = function (newColors) {
          if ("body" in newColors)
              this.body = new ThemeColor(lodash__default['default'].assign({}, this._body, newColors.body));
          if ("default" in newColors)
              this.default = new ThemeColor(lodash__default['default'].assign({}, this._default, newColors.default));
          if ("lighter" in newColors)
              this.lighter = new ThemeColor(lodash__default['default'].assign({}, this._lighter, newColors.lighter));
          if ("darker" in newColors)
              this.darker = new ThemeColor(lodash__default['default'].assign({}, this._darker, newColors.darker));
          if ("alt" in newColors)
              this.alt = new ThemeColor(lodash__default['default'].assign({}, this._alt, newColors.alt));
          if ("altDarker" in newColors)
              this.altDarker = new ThemeColor(lodash__default['default'].assign({}, this._altDarker, newColors.altDarker));
          if ("altLighter" in newColors)
              this.altLighter = new ThemeColor(lodash__default['default'].assign({}, this._altLighter, newColors.altLighter));
          if ("error" in newColors)
              this.error = new ThemeColor(lodash__default['default'].assign({}, this._error, newColors.error));
          if ("warn" in newColors)
              this.warn = new ThemeColor(lodash__default['default'].assign({}, this._warn, newColors.warn));
          if ("neutral" in newColors)
              this.neutral = new ThemeColor(lodash__default['default'].assign({}, this._neutral, newColors.neutral));
          uiColorSheet.attach();
      };
      Object.defineProperty(UIThemeColorsHelper.prototype, "body", {
          get: function () { return this._body; },
          set: function (newValue) { this._body = newValue; },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(UIThemeColorsHelper.prototype, "default", {
          get: function () { return this._default; },
          set: function (newValue) { this._default = newValue; },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(UIThemeColorsHelper.prototype, "lighter", {
          get: function () { return this._lighter; },
          set: function (newValue) { this._lighter = newValue; },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(UIThemeColorsHelper.prototype, "darker", {
          get: function () { return this._darker; },
          set: function (newValue) { this._darker = newValue; },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(UIThemeColorsHelper.prototype, "alt", {
          get: function () { return this._alt; },
          set: function (newValue) { this._alt = newValue; },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(UIThemeColorsHelper.prototype, "altLighter", {
          get: function () { return this._altLighter; },
          set: function (newValue) { this._altLighter = newValue; },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(UIThemeColorsHelper.prototype, "altDarker", {
          get: function () { return this._altDarker; },
          set: function (newValue) { this._altDarker = newValue; },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(UIThemeColorsHelper.prototype, "error", {
          get: function () { return this._error; },
          set: function (newValue) { this._error = newValue; },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(UIThemeColorsHelper.prototype, "warn", {
          get: function () { return this._warn; },
          set: function (newValue) { this._warn = newValue; },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(UIThemeColorsHelper.prototype, "neutral", {
          get: function () { return this._neutral; },
          set: function (newValue) { this._neutral = newValue; },
          enumerable: false,
          configurable: true
      });
      return UIThemeColorsHelper;
  }());

  var colors = stream__default['default'](new UIThemeColorsHelper());

  var profile = stream__default['default']({});
  function loadProfile() {
      var path = application().profilePath;
      return path
          ? m.request(path).then(profile).catch(lodash__default['default'].noop)
          : Promise.resolve();
  }

  function createThemeClasses(theme, uiSheet) {
      return lodash__default['default'].reduce(theme, function (acc, value, key) {
          acc[key] = createResponsiveClass(lodash__default['default'].assign({ key: key }, value), uiSheet);
          return acc;
      }, {});
  }

  function uiInputTheme() {
      return {
          uiInputWrapper: {
              classes: "mb2",
              style: {
                  focus: { "border-color": colors().lighter.color },
                  background: "#efefef",
                  padding: '.3rem',
                  margin: "10px 0px"
              }
          },
          uiInput: {
              classes: "bn fw2"
          },
          uiInputFieldset: {
              classes: "mb2",
          },
          uiInputLabel: {},
          uiRadioButton: {},
          uiRadioButtonChecked: {}
      };
  }

  // import { colors } from "../../state/theme";
  function uiLayoutTheme( /* colors: UIThemeColorsHelper */) {
      return {
          uiLayout: {
              style: {
                  background: "transparent"
              },
          },
          uiPostContentWrapper: {
              classes: "flex flex-wrap items-center flex-column w-100"
          },
          uiPreContentWrapper: {
              classes: "flex flex-wrap items-center flex-column w-100"
          }
      };
  }

  function uiCardTheme() {
      return {
          uiCardGroup: {
              classes: "flex flex-wrap justify-center pa2"
          },
          uiCardWrapper: {
              style: {
                  color: colors().alt.color,
                  background: colors().alt.background,
                  borderRadius: "10px",
                  boxShadow: "3px 2px 11px lightgrey",
                  width: '13rem',
                  height: '13rem',
              },
              classes: "flex flex-column",
          },
          uiCardHeader: {
              classes: "flex-auto",
              style: {
                  fontSize: "1.25rem",
                  textAlign: "center",
                  fontWeight: '300',
              }
          },
          uiCardContentWrapper: {
              style: {
                  justifyContent: "center",
                  "hover-space-img": {
                      transform: "scale(1.05)"
                  }
              },
          },
          uiCardSubheading: {
              classes: "ma2 pv1 ph2 flex items-center",
              style: {
                  fontSize: "1.25rem"
              }
          },
          uiCardIcon: {
              classes: "fal fa-fw fa-4x ma2",
              style: {
                  fontSize: '3rem',
              }
          },
          uiCardImage: {
              classes: "img ma2",
              style: {
                  transition: 'transform 0.1s ease-in-out'
              }
          },
          uiCardCounter: {
              classes: "top-0 right-0",
              style: {
                  fontWeight: '600',
                  background: '#f7931c',
                  color: "white",
                  padding: '0.3rem 0.5rem',
                  borderRadius: '24px',
                  marginTop: "-0.45rem",
                  marginRight: "-0.55rem",
              }
          },
          uiCardContextNeutral: {
              style: colors().neutral.style
          },
          uiCardContextDefault: {
              style: colors().default.style
          },
          uiCardContextWarn: {
              style: colors().warn.style
          },
          uiCardContextError: {
              style: colors().error.style
          },
      };
  }

  function uiHeaderFooterTheme() {
      return {
          uiCustomHeader: {},
          uiHeaderWrapper: {
              style: {
                  maxWidth: "100%",
                  background: 'white',
                  boxShadow: '2px 2px 5px #ebf0f5',
              }
          },
          uiHeader: {
              style: colors().default.style
          },
          uiSubheader: {
              style: {
                  height: "3rem",
                  color: colors().default.color,
                  background: "transparent"
              }
          },
          uiFooter: {
              style: {
                  maxWidth: "100%",
                  height: "3rem",
                  boxShadow: '0px 0px 2px 2px #ebf0f5',
                  background: 'white'
              }
          },
      };
  }

  function uiPanelTheme() {
      return {
          uiPanel: {},
          uiPanelHeader: {
              style: {
                  color: colors().default.color,
                  background: "transparent"
              },
          },
          uiPanelSubheader: {},
          uiPanelHeaderButton: {},
      };
  }

  function uiLoginTheme() {
      return {
          uiLoginResetReturn: {},
          uiLoginResetHeader: {},
          uiLoginWrapper: {
              classes: "pa2",
              style: {
                  width: "100%",
              }
          },
          uiLogin: {
              classes: "measure-wide center",
              style: {
                  padding: "2rem",
                  border: "2px solid #dcdedf",
                  borderRadius: "10px",
                  marginTop: "3rem",
                  boxShadow: "1px 1px 6px #80808036",
              }
          },
          uiLoginInputWrapper: {
              style: {
                  border: "2px solid #dcdedf",
                  borderRadius: "5px",
                  margin: "10px 0px"
              }
          },
          uiLoginForm: {},
          uiLoginButtonWrapper: {
              classes: "justify-between"
          },
          uiLoginButton: {
              style: colors().alt.style
          },
          uiLoginInput: {},
          uiLoginFormInputWrapper: {},
          uiLoginLines: {},
          uiHelpInputWrapper: {},
          uiHelpInputLines: {},
          uiLoginInputFieldset: {},
          uiLoginInputLabel: {},
          uiLoginHeader: {},
          uiLoginResetButton: {},
          uiLoginHelpHeader: {
              style: {
                  alignSelf: "center"
              }
          },
          uiLoginPostLines: {}
      };
  }

  function uiTableTheme() {
      return {
          uiTable: {
              style: {}
          },
          uiTableHeader: {
              classes: "flex-auto",
              style: {
                  color: colors().alt.color,
                  background: colors().alt.background,
                  fontWeight: "400"
              }
          },
          uiTableHeaderCell: {
              style: {
                  color: colors().alt.color,
                  fontWeight: "400",
              }
          },
          uiTableHeaderRowCell: {},
          uiTableRow: {},
          uiTableRowCell: {},
          uiTableItem: {},
          uiTableItemRow: {},
          uiTableItemIcon: {},
          uiTableItemDate: {},
          uiTableItemTime: {},
          uiTableItemTitle: {},
          uiTableItemType: {},
          uiTableItemSize: {},
      };
  }

  function uiButtonTheme() {
      return {
          uiNavButton: {},
          uiButton: {
              classes: "shadow-4 ma2",
              style: {
                  color: colors().default.color,
                  background: colors().default.background,
                  padding: ".5rem 2rem",
                  fontWeight: '300',
                  border: "unset",
                  borderRadius: "5px",
                  outline: "none",
                  hover: {
                      "box-shadow": "0 0 0.125rem 0 silver"
                  }
              }
          },
          uiButtonAlt: {
              classes: "shadow-4 ma2",
              style: colors().alt.style
          },
          uiButtonInfo: {},
          uiButtonDefault: {
              style: colors().default.style
          },
          uiButtonWarn: {
              style: colors().warn.style
          },
          uiButtonError: {
              style: colors().error.style
          },
          uiButtonNeutral: {
              style: colors().neutral.style
          }
      };
  }

  function uiDialogTheme() {
      return {
          uiDialogContextAlt: {
              style: colors().alt.style
          },
          uiDialogContextDefault: {
              style: colors().default.style
          },
          uiDialogContextNeutral: {
              style: colors().neutral.style
          },
          uiDialogContextWarn: {
              style: colors().warn.style
          },
          uiDialogContextError: {
              style: colors().error.style
          },
          uiDialogWrapper: {
              style: {
                  borderRadius: "10px",
                  overflow: "hidden"
              }
          },
          uiDialogLoginWrapper: {
              style: {
                  position: 'relative',
                  minHeight: "20%",
                  animationIterationCount: "3"
              }
          },
          uiDialogNotificationWrapper: {
              style: {
                  borderRadius: "10px",
                  pointerEvents: 'auto',
                  boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
              }
          },
          uiDialogIcon: {},
          uiDialogTitle: {},
          uiDialogText: {},
          uiDialogButtonWrapper: {
              style: {
                  position: 'relative',
                  justifySelf: 'flex-end'
              }
          },
          uiDialogFeedbackWrapper: {
              style: {
                  background: colors().default.background
              }
          },
          uiDialogFeedbackTitle: {
              style: {
                  color: colors().default.color
              }
          },
          uiDialogFeedbackLabel: {},
          uiDialogFeedbackButtonWrapper: {
              style: {
                  backgroundColor: "#c7c7c7",
                  position: 'relative',
                  justifySelf: 'flex-end'
              }
          },
          uiDialogLinkButton: {
              style: {
                  background: "unset"
              }
          },
          uiDialogCancelButton: {
              classes: "mr2"
          },
          uiDialogConfirmButton: {
              classes: "mr2"
          },
          uiDialogFailMessage: {
              style: {
                  fontSize: '1.1rem'
              },
              styleNS: {
                  fontSize: '1.2'
              }
          }
      };
  }

  // import { colors } from "../../state/theme";
  function uiNavbarTheme( /* colors: UIThemeColorsHelper */) {
      return {
          uiNavbarCopyright: {},
          uiNavbarImage: {},
          uiNavbarLink: {},
          uiNavbarLogout: {
              style: {
                  height: "2rem",
                  padding: "0rem 1rem",
                  borderRadius: "5px",
                  marginBottom: 'auto',
                  marginTop: 'auto',
              }
          },
          uiNavbarLogoutIcon: {
              style: {
                  color: "inherit"
              }
          },
          uiNavbarLogoutLabel: {
              style: {
                  color: "inherit"
              }
          },
          uiNavbarName: {},
          uiNavbarNameVersion: {},
          uiNavbarPoweredBy: {},
          uiNavbarProgress: {},
          uiNavbarSalutation: {},
          uiNavbarText: {},
          uiNavbarVersion: {}
      };
  }

  function uiActionCardTheme() {
      return {
          uiActionCardContent: {},
          uiActionCardWrapper: {
              classes: "pa3",
              style: {
                  width: "100%",
                  height: "100%"
              }
          },
          uiActionCardInnerWrapper: {
              style: {
                  display: "flex",
                  alignContent: "space-evenly",
                  width: "100%"
              },
              styleNS: {
                  width: "75%"
              }
          },
          uiActionCardButton: {
              style: {
                  maxWidth: "35%"
              }
          },
          uiActionCardHeader: {
              style: {
                  margin: "unset",
                  flex: "unset",
                  minWidth: "unset",
                  minheight: "unset",
                  textAlign: "left"
              }
          },
          uiActionCardImage: {},
          uiActionCardImageWrapper: {
              style: {
                  width: "0px",
                  visibility: "hidden"
              },
              styleNS: {
                  width: "25%",
                  visibility: "visible"
              }
          },
          uiActionCardLines: {
              style: {
                  background: "unset",
                  color: "white"
              }
          },
      };
  }

  function uiItemTheme() {
      return {
          uiItemListTitleIcon: {},
          uiItemListAccordionIcon: {
              style: {
                  fontSize: "1.5rem"
              }
          },
          uiItemListTitle: {
              style: {
                  fontSize: "1.5rem",
                  fontWeight: "300"
              }
          },
          uiItemListGroupLabel: {},
          uiItemListAccordionTitleWrapper: {
              style: {
                  marginBottom: "1rem"
              }
          },
          uiItemListAccordionWrapper: {
              classes: "flex flex-column items-left",
              style: {
                  transition: "height 0.5s ease 0.1s",
                  overflow: "hidden",
                  width: "100%",
                  border: "1px solid grey",
                  padding: "0px 1rem"
              }
          },
          uiItemListContainer: {
              classes: "flex flex-column flex-auto overflow-x-hidden overflow-y-auto",
          },
          uiItemTableContainer: {
              classes: "flex-auto overflow-x-hidden overflow-y-auto pa2",
          },
          uiItemTableIcon: {},
          uiItemTableInfo: {},
          uiItemTableInfoIcon: {},
          uiItemTableRow: {},
          uiItemTableHeader: {},
          uiItemTableHeaderMarker: {},
          uiItemTableHeaderDate: {},
          uiItemTableHeaderDocumentName: {},
          uiItemTableHeaderIcon: {},
          uiItemTableHeaderSize: {},
          uiItemGridContainer: {
              classes: "flex-auto overflow-x-hidden overflow-y-auto",
          },
          uiItemRowWrapper: {
              classes: "flex flex-column flex-row-ns ma2 pv2 bb b--black-20",
          },
          uiItemRowInnerWrapper: {
              classes: "flex-auto flex flex-row items-center pointer",
              style: {
                  color: "black"
              }
          },
          uiItemRowHeaderWrapper: {
              classes: "flex-auto"
          },
          uiItemRowActions: {
              classes: "flex flex-wrap items-center justify-end pl2 nl1 nr1",
          },
          uiItemButtonsWrapper: {},
          uiItemButtonsInnerWrapper: {},
          uiItemActionButton: {
              classes: "pa1 mr2"
          },
          uiItemIcon: {},
          uiItemHeading: {},
          uiItemSubheading: {
              classes: "flex flex-wrap nr1 nb1 nl1 f6 ws-normal",
              style: {
                  color: colors().default.color
              }
          },
          uiItemEditWrapper: {},
          uiItemEditHeader: {},
          uiItemEditIcon: {},
          uiItemEditLabel: {},
          uiItemEditButton: {},
          uiItemEditFormWrapper: {},
          uiItemViewWrapper: {},
          uiItemViewRowWrapper: {},
          uiItemViewIcon: {},
          uiItemViewField: {},
          uiCategoryItemWrapper: {},
          uiCategoryItemIcon: {},
          uiCategoryItemLabel: {},
          uiCategoryItemMarker: {},
          uiCategoryItemArrow: {},
      };
  }

  function uiPdfTheme() {
      return {
          uiPdfFieldOverlay: {
              style: {
                  background: colors().darker.background
              }
          },
          uiPdfTopBar: {
              style: colors().alt.style
          },
          uiPdfBackButton: {},
          uiPdfZoomInButton: {},
          uiPdfZoomOutButton: {},
          uiPdfDownloadButton: {},
          uiPdfPanel: {
              style: {
                  background: "#777777",
              }
          },
          uiPdfBottomBar: {
              style: colors().alt.style
          },
          uiPdfSubheader: {
              style: colors().alt.style
          },
          uiPdfStartButton: {
              style: colors().alt.style
          },
      };
  }

  function uiDataCardTheme() {
      return {
          uiDataCardGridWrapper: {
              classes: "flex flex-column",
              style: {
                  padding: "0 1rem"
              },
              styleNS: {
                  padding: "0 2rem"
              }
          },
          uiDataCardCategoryLabel: {
              style: {
                  marginLeft: 'auto',
                  borderRadius: '1rem',
                  padding: '0.3rem 1rem',
                  alignSelf: 'center',
                  textTransform: 'uppercase',
                  fontWeight: '300',
              }
          },
          uiDataCardHeader: {
              style: {
                  fontWeight: '400',
                  fontSize: '2rem',
              }
          },
          uiDataCardHeaderWrapper: {
              classes: "flex flex-row",
              style: {
                  marginBottom: '1rem'
              }
          },
          uiDataCardSectionItemLabel: {
              style: {
                  fontWeight: '300',
                  marginRight: '1rem',
                  minWidth: '9rem',
              }
          },
          uiDataCardSectionItemValue: {
              style: {
                  opacity: "0.9",
                  fontWeight: '200',
                  marginBottom: '0.5rem',
              }
          },
          uiDataCardSectionItemWrapper: {
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
          },
          uiDataCardSectionLabel: {
              style: {
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem'
              }
          },
          uiDataCardSectionWrapper: {
              style: {
                  marginBottom: '2rem',
              }
          },
          uiDataCardWrapper: {
              classes: "flex-shrink-0 self-center",
              style: {
                  borderRadius: "10px",
                  boxShadow: '0px 0px 2px 2px #ebf0f5',
                  padding: '2rem',
                  fontSize: '1rem',
                  maxWidth: '60rem',
                  margin: '2rem',
                  width: "100%",
                  height: "unset",
                  background: "white"
              }
          },
          uiDataCardButton: {
              style: {
                  marginLeft: "auto"
              }
          }
      };
  }

  function uiBlockLinesTheme() {
      return {
          uiBlockLinesWrapper: {}
      };
  }

  function uiIconTheme() {
      return {
          uiIcon: {
              style: {
                  color: colors().default.color
              }
          }
      };
  }

  function uiSearchBoxTheme() {
      return {
          uiSearchBoxWrapper: {},
          uiSearchBoxIcon: {
              style: {
                  color: colors().default.color
              }
          },
          uiSearchBoxInput: {},
          uiSearchBoxClearIcon: {
              style: {
                  color: colors().default.color
              }
          },
      };
  }

  function uiProgressTheme() {
      return {
          uiProgressFlowWrapper: {},
          uiProgressFlowStepWrapper: {
              style: {
                  margin: "1rem"
              }
          },
          uiProgressFlowArrowWrapper: {
              style: {
                  position: "relative",
                  top: "4rem",
                  height: "4rem",
              },
              styleNS: {
                  width: "4rem",
              }
          },
          uiProgressFlowArrow: {
              style: {
                  height: "100%",
                  width: "4rem",
                  transform: "rotate(90deg)",
                  fill: colors().default.color
              },
              styleNS: {
                  transform: "rotate(0deg)",
              }
          },
          uiProgressCardIndicator: {
              style: {
                  position: "relative",
                  height: "3.6rem",
                  width: "5rem",
                  borderRadius: "50%",
                  border: "solid 1px white"
              }
          },
          uiProgressCardWrapper: {
              style: {
                  textAlign: "center",
                  padding: "1rem 0 1rem 1rem",
              }
          },
          uiProgressCardOuterWrapper: {},
          uiProgressCardSubheading: {
              style: {
                  textAlign: "start",
                  fontWeight: "200",
                  opacity: "0.8"
              }
          },
          uiProgressCardHeading: {
              style: {
                  textAlign: "start",
                  fontWeight: "600",
                  fontSize: "1.25rem",
                  textTransform: "uppercase"
              }
          },
          uiProgressCardWarn: {
              style: {
                  color: "#5a5a5a",
                  background: "#f9ceba"
              }
          },
          uiProgressCardWaiting: {
              style: {
                  color: "#5a5a5a",
                  background: "#f9ceba"
              }
          },
          uiProgressCardError: {
              style: {
                  color: "#5a5a5a",
                  background: "#f5b7b8"
              }
          },
          uiProgressCardComplete: {
              style: {
                  color: "#5a5a5a",
                  background: "#d1e6c7"
              }
          },
          uiProgressCardIncomplete: {
              style: {
                  color: "#5a5a5a",
                  background: "#bfdbf1"
              }
          },
          uiProgressCardIconWarn: {
              style: {
                  color: colors().warn.color,
                  background: colors().warn.background,
                  boxShadow: "0px 0px 0px 2px " + colors().warn.background,
              }
          },
          uiProgressCardIconWaiting: {
              style: {
                  color: colors().warn.color,
                  background: colors().warn.background,
                  boxShadow: "0px 0px 0px 2px " + colors().warn.background,
              }
          },
          uiProgressCardIconError: {
              style: {
                  color: colors().error.color,
                  background: colors().error.background,
                  boxShadow: "0px 0px 0px 2px " + colors().error.background,
              }
          },
          uiProgressCardIconComplete: {
              style: {
                  color: "#fff",
                  background: "#94c47d",
                  boxShadow: "0px 0px 0px 2px #94c47d",
              }
          },
          uiProgressCardIconIncomplete: {
              style: {
                  color: "#fff",
                  background: "#70acdf",
                  boxShadow: "0px 0px 0px 2px #70acdf",
              }
          }
      };
  }

  /** NOTE !! The order that the theme defaults are created matter
  --> The !!--> [ LAST ]<--!! items written to markup have a !!--> [ HIGHER ]<--!! specificity <--  */
  function themeDefaults() {
      function addItem(item) {
          return lodash__default['default'].assign({ style: {} }, item);
      }
      return {
          body: {
              style: colors().body.style
          },
          /** uiCard.defaults  */
          uiCardGroup: addItem(uiCardTheme().uiCardGroup),
          uiCardCounter: addItem(uiCardTheme().uiCardCounter),
          uiCardHeader: addItem(uiCardTheme().uiCardHeader),
          uiCardIcon: addItem(uiCardTheme().uiCardIcon),
          uiCardImage: addItem(uiCardTheme().uiCardImage),
          uiCardSubheading: addItem(uiCardTheme().uiCardSubheading),
          uiCardWrapper: addItem(uiCardTheme().uiCardWrapper),
          uiCardContentWrapper: addItem(uiCardTheme().uiCardContentWrapper),
          uiCardContextDefault: addItem(uiCardTheme().uiCardContextDefault),
          uiCardContextError: addItem(uiCardTheme().uiCardContextError),
          uiCardContextNeutral: addItem(uiCardTheme().uiCardContextNeutral),
          uiCardContextWarn: addItem(uiCardTheme().uiCardContextWarn),
          /** uiButton.defaults  */
          uiButton: addItem(uiButtonTheme().uiButton),
          uiNavButton: addItem(uiButtonTheme().uiNavButton),
          uiButtonAlt: addItem(uiButtonTheme().uiButtonAlt),
          uiButtonError: addItem(uiButtonTheme().uiButtonError),
          uiButtonInfo: addItem(uiButtonTheme().uiButtonInfo),
          uiButtonWarn: addItem(uiButtonTheme().uiButtonWarn),
          uiButtonNeutral: addItem(uiButtonTheme().uiButtonNeutral),
          /** uiIcon.defaults  */
          uiIcon: addItem(uiIconTheme().uiIcon),
          /** uiInput.defaults  */
          uiInputWrapper: addItem(uiInputTheme().uiInputWrapper),
          uiInput: addItem(uiInputTheme().uiInput),
          uiInputLabel: addItem(uiInputTheme().uiInputLabel),
          uiInputFieldset: addItem(uiInputTheme().uiInputFieldset),
          /** uiInput.defaults  */
          uiRadioButton: addItem(uiInputTheme().uiRadioButton),
          uiRadioButtonChecked: addItem(uiInputTheme().uiRadioButtonChecked),
          /** uiLayout.defaults  */
          uiLayout: addItem(uiLayoutTheme().uiLayout),
          uiPostContentWrapper: addItem(uiLayoutTheme().uiPostContentWrapper),
          uiPreContentWrapper: addItem(uiLayoutTheme().uiPreContentWrapper),
          /** uiHeaderFooter.defaults  */
          uiHeaderWrapper: addItem(uiHeaderFooterTheme().uiHeaderWrapper),
          uiHeader: addItem(uiHeaderFooterTheme().uiHeader),
          uiCustomHeader: addItem(uiHeaderFooterTheme().uiCustomHeader),
          uiSubheader: addItem(uiHeaderFooterTheme().uiSubheader),
          uiFooter: addItem(uiHeaderFooterTheme().uiFooter),
          /** uiPanel.defaults  */
          uiPanel: addItem(uiPanelTheme().uiPanel),
          uiPanelHeader: addItem(uiPanelTheme().uiPanelHeader),
          uiPanelSubheader: addItem(uiPanelTheme().uiPanelSubheader),
          uiPanelHeaderButton: addItem(uiPanelTheme().uiPanelHeaderButton),
          /** uiLogin.defaults  */
          uiHelpInputLines: addItem(uiLoginTheme().uiHelpInputLines),
          uiHelpInputWrapper: addItem(uiLoginTheme().uiHelpInputWrapper),
          uiLogin: addItem(uiLoginTheme().uiLogin),
          uiLoginHeader: addItem(uiLoginTheme().uiLoginHeader),
          uiLoginButton: addItem(uiLoginTheme().uiLoginButton),
          uiLoginResetButton: addItem(uiLoginTheme().uiLoginResetButton),
          uiLoginButtonWrapper: addItem(uiLoginTheme().uiLoginButtonWrapper),
          uiLoginForm: addItem(uiLoginTheme().uiLoginForm),
          uiLoginFormInputWrapper: addItem(uiLoginTheme().uiLoginFormInputWrapper),
          uiLoginInput: addItem(uiLoginTheme().uiLoginInput),
          uiLoginInputWrapper: addItem(uiLoginTheme().uiLoginInputWrapper),
          uiLoginLines: addItem(uiLoginTheme().uiLoginLines),
          uiLoginPostLines: addItem(uiLoginTheme().uiLoginPostLines),
          uiLoginWrapper: addItem(uiLoginTheme().uiLoginWrapper),
          uiLoginInputFieldset: addItem(uiLoginTheme().uiLoginInputFieldset),
          uiLoginInputLabel: addItem(uiLoginTheme().uiLoginInputLabel),
          uiLoginResetHeader: addItem(uiLoginTheme().uiLoginResetHeader),
          uiLoginResetReturn: addItem(uiLoginTheme().uiLoginResetReturn),
          /** uiTable.defaults  */
          uiTable: addItem(uiTableTheme().uiTable),
          uiTableHeader: addItem(uiTableTheme().uiTableHeader),
          uiTableHeaderCell: addItem(uiTableTheme().uiTableHeaderCell),
          uiTableRow: addItem(uiTableTheme().uiTableRow),
          uiTableRowCell: addItem(uiTableTheme().uiTableRowCell),
          uiTableItem: addItem(uiTableTheme().uiTableItem),
          uiTableItemDate: addItem(uiTableTheme().uiTableItemDate),
          uiTableItemIcon: addItem(uiTableTheme().uiTableItemIcon),
          uiTableItemRow: addItem(uiTableTheme().uiTableItemRow),
          uiTableItemSize: addItem(uiTableTheme().uiTableItemSize),
          uiTableItemTime: addItem(uiTableTheme().uiTableItemTime),
          uiTableItemTitle: addItem(uiTableTheme().uiTableItemTitle),
          uiTableItemType: addItem(uiTableTheme().uiTableItemType),
          /** uiDialog.defaults  */
          uiDialogButtonWrapper: addItem(uiDialogTheme().uiDialogButtonWrapper),
          uiDialogCancelButton: addItem(uiDialogTheme().uiDialogCancelButton),
          uiDialogConfirmButton: addItem(uiDialogTheme().uiDialogConfirmButton),
          uiDialogContextDefault: addItem(uiDialogTheme().uiDialogContextDefault),
          uiDialogContextAlt: addItem(uiDialogTheme().uiDialogContextAlt),
          uiDialogContextError: addItem(uiDialogTheme().uiDialogContextError),
          uiDialogContextNeutral: addItem(uiDialogTheme().uiDialogContextNeutral),
          uiDialogContextWarn: addItem(uiDialogTheme().uiDialogContextWarn),
          uiDialogFeedbackButtonWrapper: addItem(uiDialogTheme().uiDialogFeedbackButtonWrapper),
          uiDialogFeedbackTitle: addItem(uiDialogTheme().uiDialogFeedbackTitle),
          uiDialogFeedbackSubTitle: addItem(uiDialogTheme().uiDialogFeedbackTitle),
          uiDialogFeedbackLabel: addItem(uiDialogTheme().uiDialogFeedbackLabel),
          uiDialogFeedbackWrapper: addItem(uiDialogTheme().uiDialogFeedbackWrapper),
          uiDialogLinkButton: addItem(uiDialogTheme().uiDialogLinkButton),
          uiDialogLoginWrapper: addItem(uiDialogTheme().uiDialogLoginWrapper),
          uiDialogNotificationWrapper: addItem(uiDialogTheme().uiDialogNotificationWrapper),
          uiDialogText: addItem(uiDialogTheme().uiDialogText),
          uiDialogIcon: addItem(uiDialogTheme().uiDialogIcon),
          uiDialogTitle: addItem(uiDialogTheme().uiDialogTitle),
          uiDialogWrapper: addItem(uiDialogTheme().uiDialogWrapper),
          uiDialogFailMessage: addItem(uiDialogTheme().uiDialogFailMessage),
          /** uiNavbar.defaults */
          uiNavbarCopyright: addItem(uiNavbarTheme().uiNavbarCopyright),
          uiNavbarImage: addItem(uiNavbarTheme().uiNavbarImage),
          uiNavbarLink: addItem(uiNavbarTheme().uiNavbarLink),
          uiNavbarLogout: addItem(uiNavbarTheme().uiNavbarLogout),
          uiNavbarLogoutIcon: addItem(uiNavbarTheme().uiNavbarLogoutIcon),
          uiNavbarLogoutLabel: addItem(uiNavbarTheme().uiNavbarLogoutLabel),
          uiNavbarName: addItem(uiNavbarTheme().uiNavbarName),
          uiNavbarNameVersion: addItem(uiNavbarTheme().uiNavbarNameVersion),
          uiNavbarPoweredBy: addItem(uiNavbarTheme().uiNavbarPoweredBy),
          uiNavbarProgress: addItem(uiNavbarTheme().uiNavbarProgress),
          uiNavbarSalutation: addItem(uiNavbarTheme().uiNavbarSalutation),
          uiNavbarText: addItem(uiNavbarTheme().uiNavbarText),
          uiNavbarVersion: addItem(uiNavbarTheme().uiNavbarVersion),
          /** uiProgress.defaults */
          uiProgressFlowArrowWrapper: addItem(uiProgressTheme().uiProgressFlowArrowWrapper),
          uiProgressFlowArrow: addItem(uiProgressTheme().uiProgressFlowArrow),
          uiProgressFlowStepWrapper: addItem(uiProgressTheme().uiProgressFlowStepWrapper),
          uiProgressFlowWrapper: addItem(uiProgressTheme().uiProgressFlowWrapper),
          uiProgressCardIndicator: addItem(uiProgressTheme().uiProgressCardIndicator),
          uiProgressCardHeading: addItem(uiProgressTheme().uiProgressCardHeading),
          uiProgressCardSubheading: addItem(uiProgressTheme().uiProgressCardSubheading),
          uiProgressCardOuterWrapper: addItem(uiProgressTheme().uiProgressCardOuterWrapper),
          uiProgressCardWrapper: addItem(uiProgressTheme().uiProgressCardWrapper),
          uiProgressCardComplete: addItem(uiProgressTheme().uiProgressCardComplete),
          uiProgressCardError: addItem(uiProgressTheme().uiProgressCardError),
          uiProgressCardIncomplete: addItem(uiProgressTheme().uiProgressCardIncomplete),
          uiProgressCardWarn: addItem(uiProgressTheme().uiProgressCardWarn),
          uiProgressCardWaiting: addItem(uiProgressTheme().uiProgressCardWaiting),
          uiProgressCardIconComplete: addItem(uiProgressTheme().uiProgressCardIconComplete),
          uiProgressCardIconError: addItem(uiProgressTheme().uiProgressCardIconError),
          uiProgressCardIconIncomplete: addItem(uiProgressTheme().uiProgressCardIconIncomplete),
          uiProgressCardIconWaiting: addItem(uiProgressTheme().uiProgressCardIconWaiting),
          uiProgressCardIconWarn: addItem(uiProgressTheme().uiProgressCardIconWarn),
          /** uiActionCard.defaults */
          uiActionCardButton: addItem(uiActionCardTheme().uiActionCardButton),
          uiActionCardContent: addItem(uiActionCardTheme().uiActionCardContent),
          uiActionCardHeader: addItem(uiActionCardTheme().uiActionCardHeader),
          uiActionCardImage: addItem(uiActionCardTheme().uiActionCardImage),
          uiActionCardImageWrapper: addItem(uiActionCardTheme().uiActionCardImageWrapper),
          uiActionCardInnerWrapper: addItem(uiActionCardTheme().uiActionCardInnerWrapper),
          uiActionCardLines: addItem(uiActionCardTheme().uiActionCardLines),
          uiActionCardWrapper: addItem(uiActionCardTheme().uiActionCardWrapper),
          /** uiDataCard.defaults */
          uiDataCardCategoryLabel: addItem(uiDataCardTheme().uiDataCardCategoryLabel),
          uiDataCardGridWrapper: addItem(uiDataCardTheme().uiDataCardGridWrapper),
          uiDataCardHeader: addItem(uiDataCardTheme().uiDataCardHeader),
          uiDataCardHeaderWrapper: addItem(uiDataCardTheme().uiDataCardHeaderWrapper),
          uiDataCardSectionItemLabel: addItem(uiDataCardTheme().uiDataCardSectionItemLabel),
          uiDataCardSectionItemValue: addItem(uiDataCardTheme().uiDataCardSectionItemValue),
          uiDataCardSectionItemWrapper: addItem(uiDataCardTheme().uiDataCardSectionItemWrapper),
          uiDataCardSectionLabel: addItem(uiDataCardTheme().uiDataCardSectionLabel),
          uiDataCardSectionWrapper: addItem(uiDataCardTheme().uiDataCardSectionWrapper),
          uiDataCardWrapper: addItem(uiDataCardTheme().uiDataCardWrapper),
          uiDataCardButton: addItem(uiDataCardTheme().uiDataCardButton),
          /** uiItem.defaults */
          uiItemActionButton: addItem(uiItemTheme().uiItemActionButton),
          uiItemButtonsInnerWrapper: addItem(uiItemTheme().uiItemButtonsInnerWrapper),
          uiItemButtonsWrapper: addItem(uiItemTheme().uiItemButtonsWrapper),
          uiItemGridContainer: addItem(uiItemTheme().uiItemGridContainer),
          uiItemHeading: addItem(uiItemTheme().uiItemHeading),
          uiItemIcon: addItem(uiItemTheme().uiItemIcon),
          uiItemListAccordionIcon: addItem(uiItemTheme().uiItemListAccordionIcon),
          uiItemListTitle: addItem(uiItemTheme().uiItemListTitle),
          uiItemListTitleIcon: addItem(uiItemTheme().uiItemListTitleIcon),
          uiItemListGroupLabel: addItem(uiItemTheme().uiItemListGroupLabel),
          uiItemListAccordionTitleWrapper: addItem(uiItemTheme().uiItemListAccordionTitleWrapper),
          uiItemListAccordionWrapper: addItem(uiItemTheme().uiItemListAccordionWrapper),
          uiItemListContainer: addItem(uiItemTheme().uiItemListContainer),
          uiItemRowActions: addItem(uiItemTheme().uiItemRowActions),
          uiItemRowHeaderWrapper: addItem(uiItemTheme().uiItemRowHeaderWrapper),
          uiItemRowInnerWrapper: addItem(uiItemTheme().uiItemRowInnerWrapper),
          uiItemRowWrapper: addItem(uiItemTheme().uiItemRowWrapper),
          uiItemSubheading: addItem(uiItemTheme().uiItemSubheading),
          uiItemTableContainer: addItem(uiItemTheme().uiItemTableContainer),
          uiItemTableInfo: addItem(uiItemTheme().uiItemTableInfo),
          uiItemTableHeader: addItem(uiItemTheme().uiItemTableHeader),
          uiItemTableHeaderDate: addItem(uiItemTheme().uiItemTableHeaderDate),
          uiItemTableHeaderDocumentName: addItem(uiItemTheme().uiItemTableHeaderDocumentName),
          uiItemTableHeaderIcon: addItem(uiItemTheme().uiItemTableHeaderIcon),
          uiItemTableHeaderMarker: addItem(uiItemTheme().uiItemTableHeaderMarker),
          uiItemTableHeaderSize: addItem(uiItemTheme().uiItemTableHeaderSize),
          uiItemTableIcon: addItem(uiItemTheme().uiItemTableIcon),
          uiItemTableInfoIcon: addItem(uiItemTheme().uiItemTableInfoIcon),
          uiItemTableRow: addItem(uiItemTheme().uiItemTableRow),
          uiItemEditButton: addItem(uiItemTheme().uiItemEditButton),
          uiItemEditFormWrapper: addItem(uiItemTheme().uiItemEditFormWrapper),
          uiItemEditHeader: addItem(uiItemTheme().uiItemEditHeader),
          uiItemEditIcon: addItem(uiItemTheme().uiItemEditIcon),
          uiItemEditLabel: addItem(uiItemTheme().uiItemEditLabel),
          uiItemEditWrapper: addItem(uiItemTheme().uiItemEditWrapper),
          uiItemViewRowWrapper: addItem(uiItemTheme().uiItemViewRowWrapper),
          uiItemViewWrapper: addItem(uiItemTheme().uiItemViewWrapper),
          uiItemViewIcon: addItem(uiItemTheme().uiItemViewIcon),
          uiItemViewField: addItem(uiItemTheme().uiItemViewField),
          uiCategoryItemIcon: addItem(uiItemTheme().uiCategoryItemIcon),
          uiCategoryItemLabel: addItem(uiItemTheme().uiCategoryItemLabel),
          uiCategoryItemWrapper: addItem(uiItemTheme().uiCategoryItemWrapper),
          uiCategoryItemArrow: addItem(uiItemTheme().uiCategoryItemArrow),
          uiCategoryItemMarker: addItem(uiItemTheme().uiCategoryItemMarker),
          /** uiPdf.defaults */
          uiPdfPanel: addItem(uiPdfTheme().uiPdfPanel),
          uiPdfBottomBar: addItem(uiPdfTheme().uiPdfBottomBar),
          uiPdfStartButton: addItem(uiPdfTheme().uiPdfStartButton),
          uiPdfFieldOverlay: addItem(uiPdfTheme().uiPdfFieldOverlay),
          uiPdfTopBar: addItem(uiPdfTheme().uiPdfTopBar),
          uiPdfBackButton: addItem(uiPdfTheme().uiPdfBackButton),
          uiPdfDownloadButton: addItem(uiPdfTheme().uiPdfDownloadButton),
          uiPdfZoomInButton: addItem(uiPdfTheme().uiPdfZoomInButton),
          uiPdfZoomOutButton: addItem(uiPdfTheme().uiPdfZoomOutButton),
          uiPdfSubheader: addItem(uiPdfTheme().uiPdfSubheader),
          /** uiBlockLines.defaults */
          uiBlockLinesWrapper: addItem(uiBlockLinesTheme().uiBlockLinesWrapper),
          /** uiSearchBox.defaults */
          uiSearchBoxIcon: addItem(uiSearchBoxTheme().uiSearchBoxIcon),
          uiSearchBoxClearIcon: addItem(uiSearchBoxTheme().uiSearchBoxClearIcon),
          uiSearchBoxInput: addItem(uiSearchBoxTheme().uiSearchBoxInput),
          uiSearchBoxWrapper: addItem(uiSearchBoxTheme().uiSearchBoxWrapper),
          uiDisabled: {
              style: {
                  filter: "grayscale(0.9)",
                  opacity: "0.4"
              }
          },
      };
  }

  var theme = stream__default['default']();
  function applyTheme(newTheme) {
      var _a;
      colors().update(newTheme.colors || {});
      var mergedTheme = lodash__default['default'].reduce(themeDefaults(), function (acc, value, key) {
          var _key = key;
          if (newTheme[_key]) {
              acc[_key] = lodash__default['default'].merge(value, newTheme[_key]);
          }
          else {
              acc[_key] = value;
          }
          return acc;
      }, {});
      var uiSheet = jss__default['default'].createStyleSheet({});
      theme(createThemeClasses(mergedTheme, uiSheet));
      uiSheet.attach();
      // Apply body style classes
      var bodyClass = theme().body;
      (_a = document.getElementById("page")) === null || _a === void 0 ? void 0 : _a.classList.add(bodyClass);
  }
  function loadTheme() {
      var path = application().themePath;
      return path
          ? m.request(path).then(function (themeObj) {
              applyTheme(themeObj);
              applyThemeUiWidgets();
          }).catch(defaultTheme)
          : defaultTheme();
  }
  function defaultTheme() {
      applyTheme({});
      applyThemeUiWidgets();
      return Promise.resolve();
  }
  function applyThemeUiWidgets() {
      // Apply theme to ui-widgets
      uiWidgets.updateClasses({
          inputWrapper: theme().uiInputWrapper,
          input: theme().uiInput,
          label: theme().uiInputLabel,
          button: "ripple",
          navButton: "ripple",
          radio: theme().uiRadioButton,
          radioChecked: theme().uiRadioButtonChecked
      });
      // Add ui-widgets theme().uiButton context presets
      uiWidgets.updateButtonContext({
          default: theme().uiButton,
          alt: joinClasses([theme().uiButtonAlt, theme().uiButton]),
          neutral: joinClasses([theme().uiButtonNeutral, theme().uiButton]),
          info: joinClasses([theme().uiButtonInfo, theme().uiButton]),
          warn: joinClasses([theme().uiButtonWarn, theme().uiButton]),
          error: joinClasses([theme().uiButtonError, theme().uiButton]),
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

  function redirect(_a) {
      var url = _a.url;
      window.location.href = url;
  }
  function reload() {
      window.location.reload();
  }
  function relogin() {
      return new Promise(function (resolve) { return dialog({
          title: "Your session has expired",
          message: "Please login again to continue",
          context: "warn" /* warn */,
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
      if (context === void 0) { context = "default" /* default */; }
      switch (context) {
          case "error" /* error */: return theme().uiDialogContextError;
          case "warn" /* warn */: return theme().uiDialogContextWarn;
          case "neutral" /* neutral */: return theme().uiDialogContextNeutral;
          case "alt" /* alt */: return theme().uiDialogContextAlt;
          default: return theme().uiDialogContextDefault;
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
          case exports.DialogPosition.center: return ".mw-90-pa2.w-50-ns.w-100.tc";
          case exports.DialogPosition.top: return ".br4.p3.z-max.w-50-ns.w-100.f5.tc.pointer";
          case exports.DialogPosition.bottom: return ".br4.p3.z-max.w-50-ns.w-100.f5.tc.pointer";
          case exports.DialogPosition.topLeft: return ".pa2.pointer.z-max.w-30-ns.w-100.tc";
          case exports.DialogPosition.topRight: return ".pa2.pointer.z-max.w-30-ns.w-100.tc";
          case exports.DialogPosition.bottomLeft: return ".pa2.pointer.z-max.w-30-ns.w-100.tc";
          case exports.DialogPosition.bottomRight: return ".pointer.z-max.w-30-ns.w-100.tc";
          default: return ".br4.p3.z-max.w-50-ns.w-100.f5.tc.pointer";
      }
  }
  function createConfig(_a) {
      var _b = _a.context, context = _b === void 0 ? "alt" /* alt */ : _b, buttonContext = _a.buttonContext, _c = _a.type, type = _c === void 0 ? exports.DialogType.notification : _c, _d = _a.message, message = _d === void 0 ? "" : _d, duration = _a.duration, _e = _a.position, position = _e === void 0 ? exports.DialogPosition.top : _e, _f = _a.icon, icon = _f === void 0 ? "" : _f, _g = _a.title, title = _g === void 0 ? "" : _g, _h = _a.subTitle, subTitle = _h === void 0 ? "" : _h, _j = _a.confirmButton, confirmButton = _j === void 0 ? {} : _j, _k = _a.cancelButton, cancelButton = _k === void 0 ? {} : _k, _l = _a.submitButton, submitButton = _l === void 0 ? {} : _l, _m = _a.priority, priority = _m === void 0 ? false : _m, login = _a.login, _o = _a.applyTheme, applyTheme = _o === void 0 ? {} : _o, _p = _a.useProfile, useProfile = _p === void 0 ? null : _p, _q = _a.postUrl, postUrl = _q === void 0 ? null : _q;
      return {
          context: context,
          buttonContext: buttonContext || ButtonContextMapper(context),
          type: type,
          message: message,
          icon: icon,
          title: title,
          subTitle: subTitle,
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
          },
          applyTheme: applyTheme,
          useProfile: useProfile,
          postUrl: postUrl
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

  var DialogWrapper = /** @class */ (function () {
      function DialogWrapper() {
      }
      DialogWrapper.prototype.onbeforeremove = function (_a) {
          var dom = _a.dom, visible = _a.attrs.visible;
          dom.classList.remove("fade-in");
          dom.classList.add("fade-out");
          return new Promise(function (resolve) {
              dom.addEventListener("animationend", function () {
                  visible(false);
                  // Invoke DialogComponent onbeforeupdate reflecting visible state change
                  m__default['default'].redraw();
                  resolve();
              });
          });
      };
      DialogWrapper.prototype.view = function (_a) {
          var children = _a.children;
          return m__default['default'](".fixed.w-100.h-100.left-0.top-0.flex.items-center.justify-center.pa3.bg-black-70.z-max", {
              class: "fade-in",
              tabIndex: -1
          }, children);
      };
      return DialogWrapper;
  }());

  var DialogConfirm = /** @class */ (function () {
      function DialogConfirm() {
      }
      DialogConfirm.prototype.oninit = function (_a) {
          var applyTheme = _a.attrs.config.applyTheme;
          if (applyTheme) {
              this.themeHandler = new ResponsiveThemeHandler(applyTheme);
          }
      };
      DialogConfirm.prototype.view = function (_a) {
          var _b;
          var _c = _a.attrs, config = _c.config, active = _c.active, visible = _c.visible;
          var context = config.context, buttonContext = config.buttonContext, icon = config.icon, title = config.title, message = config.message, confirmButton = config.confirmButton, cancelButton = config.cancelButton;
          var overwrite = (_b = this.themeHandler) === null || _b === void 0 ? void 0 : _b.classes;
          return active() ? m__default['default'](DialogWrapper, { visible: visible }, m__default['default'](".w-75-ns.mw-90.measure.pa3", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogWrapper,
                  getContextClass(context),
                  theme().uiDialogWrapper
              ])
          }, [
              icon ? m__default['default']("i", {
                  class: joinClasses([
                      icon,
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogIcon,
                      theme().uiDialogIcon
                  ])
              }) : null,
              title ? m__default['default']("h2", {
                  class: joinClasses([
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogTitle,
                      theme().uiDialogTitle
                  ])
              }, title) : null,
              message ? buildComponent({
                  type: "sdx-blockLines",
                  data: {
                      lines: message,
                      applyTheme: {
                          uiBlockLinesWrapper: {
                              classes: joinClasses([
                                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogText,
                                  theme().uiDialogText
                              ])
                          }
                      }
                  }
              }) : null,
              /* message ? m("p.mv4", {
                  class: joinClasses([
                      overwrite?.uiDialogText,
                      theme().uiDialogText
                  ])
              }, message) : null, */
              // Button wrapper
              m__default['default'](".flex.items-end.justify-end", {
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
                      rightIcon: cancelButton.rightIcon,
                      type: "button",
                      context: buttonContext,
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
                      rightIcon: confirmButton.rightIcon,
                      type: "button",
                      context: buttonContext,
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
      switch (position) {
          case exports.DialogPosition.bottom: {
              return ".w-100.h-100.pa3.fixed.left-0.top-0.flex.justify-center.items-end.z-max";
          }
          case exports.DialogPosition.bottomLeft: {
              return ".w-100.h-100.pa3.fixed.left-0.top-0.flex.items-end.z-max";
          }
          case exports.DialogPosition.bottomRight: {
              return ".w-100.h-100.pa3.fixed.left-0.top-0.flex.flex-row-reverse.items-end.z-max";
          }
          case exports.DialogPosition.top: {
              return ".w-100.h-100.pa3.fixed.left-0.top-0.flex.justify-center.items-start.z-max";
          }
          case exports.DialogPosition.topLeft: {
              return ".w-100.h-100.pa3.fixed.left-0.top-0.z-max";
          }
          case exports.DialogPosition.topRight: {
              return ".w-100.h-100.pa3.fixed.right-0.top-0.flex-row-reverse.z-max";
          }
          default: {
              return ".flex.items-center.justify-center.w-100.h-100.pa3.fixed.left-0.top-0.z-max";
          }
      }
  };
  var DialogNotification = /** @class */ (function () {
      function DialogNotification() {
      }
      DialogNotification.prototype.view = function (_a) {
          var _this = this;
          var _b;
          var _c = _a.attrs, config = _c.config, active = _c.active, visible = _c.visible;
          var position = config.position, title = config.title, message = config.message, context = config.context, duration = config.duration, applyTheme = config.applyTheme;
          if (applyTheme) {
              this.themeHandler = new ResponsiveThemeHandler(applyTheme);
          }
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
          }, title) : null, message ? m__default['default']("p.w-100.pa1", {
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
          var _c = auth.onePanel, onePanel = _c === void 0 ? true : _c, _d = auth.helpBtnText, helpBtnText = _d === void 0 ? "SEND PIN" : _d, _e = auth.helpBtnIcon, helpBtnIcon = _e === void 0 ? "" : _e, _f = auth.loginFormClass, loginFormClass = _f === void 0 ? "" : _f, _g = auth.loginBtnClass, loginBtnClass = _g === void 0 ? "" : _g, _h = auth.returnLinkText, returnLinkText = _h === void 0 ? "Return" : _h, helpInputLines = auth.helpInputLines;
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
                      uiClass: {
                          wrapper: joinClasses([theme().uiInputFieldset]),
                          inputWrapper: joinClasses([theme().uiLoginInputWrapper, theme().uiInputWrapper]),
                          input: joinClasses(["pa2", theme().uiLoginInput, theme().uiInput]),
                          label: joinClasses([theme().uiLoginInputLabel, theme().uiInputLabel]),
                      },
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
              helpInputLines ? lodash__default['default'].map(helpInputLines, function (line) { return m__default['default']("p.f5", {
                  class: joinClasses([theme().uiLoginLines])
              }, m__default['default'].trust(line)); }) : null,
              m__default['default'](".flex.items-center.flex-row-reverse-ns", {
                  class: joinClasses([theme().uiLoginButtonWrapper])
              }, [
                  m__default['default'](uiWidgets.Button, {
                      label: helpBtnText,
                      type: "submit",
                      rightIcon: helpBtnIcon,
                      classes: joinClasses([
                          theme().uiLoginButton,
                          loginBtnClass,
                      ]),
                      disabled: type === "email" /* Email */ ? !this.emailValid() : !this.mobileValid()
                  }),
                  onePanel ? m__default['default']("span.pv2.f6.pointer", {
                      class: joinClasses([
                          theme().uiLoginResetReturn,
                          theme().uiLoginResetButton
                      ]),
                      onclick: onToggle
                  }, returnLinkText) : null
              ])
          ]);
      };
      return PasswordReset;
  }());

  function loginForm(auth) {
      var username = auth.username, pinInput = auth.pinInput;
      var _a = theme(), uiLoginInputWrapper = _a.uiLoginInputWrapper, uiLoginInput = _a.uiLoginInput, uiInput = _a.uiInput, uiInputWrapper = _a.uiInputWrapper, uiLoginInputFieldset = _a.uiLoginInputFieldset, uiInputFieldset = _a.uiInputFieldset, uiLoginInputLabel = _a.uiLoginInputLabel, uiInputLabel = _a.uiInputLabel;
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
                  required: true,
                  uiClass: {
                      wrapper: joinClasses([uiLoginInputFieldset, uiInputFieldset]),
                      inputWrapper: joinClasses([uiLoginInputWrapper, uiInputWrapper]),
                      input: joinClasses(["pa2", uiLoginInput, uiInput]),
                      label: joinClasses([uiLoginInputLabel, uiInputLabel]),
                  }
              }
          });
          formFields.push(pinInput
              ? {
                  key: "pin",
                  input: {
                      id: "pin", label: postcodeLabel,
                      type: "password" /* password */,
                      placeholder: postcodePlaceholder, title: postcodePlaceholder,
                      pattern: "[0-9]*", inputmode: "numeric",
                      required: true, instant: true,
                      uiClass: {
                          wrapper: joinClasses([uiLoginInputFieldset, uiInputFieldset]),
                          inputWrapper: joinClasses([uiLoginInputWrapper, uiInputWrapper]),
                          input: joinClasses(["pa2", uiLoginInput, uiInput]),
                          label: joinClasses([uiLoginInputLabel, uiInputLabel]),
                      }
                  }
              }
              : {
                  key: "postcode",
                  input: {
                      id: "postcode", label: postcodeLabel,
                      type: "text" /* text */,
                      placeholder: postcodePlaceholder, title: postcodePlaceholder,
                      required: true, instant: true,
                      uiClass: {
                          wrapper: joinClasses([uiLoginInputFieldset, uiInputFieldset]),
                          inputWrapper: joinClasses([uiLoginInputWrapper, uiInputWrapper]),
                          input: joinClasses(["pa2", uiLoginInput, uiInput]),
                          label: joinClasses([uiLoginInputLabel, uiInputLabel]),
                      }
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
                      pattern: "[0-9]+", inputmode: "numeric",
                      required: true, instant: true,
                      uiClass: {
                          wrapper: joinClasses([uiLoginInputFieldset, uiInputFieldset]),
                          inputWrapper: joinClasses([uiLoginInputWrapper, uiInputWrapper]),
                          input: joinClasses(["pa2", uiLoginInput, uiInput]),
                          label: joinClasses([uiLoginInputLabel, uiInputLabel]),
                      },
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
                      uiClass: {
                          wrapper: joinClasses([uiLoginInputFieldset, uiInputFieldset]),
                          inputWrapper: joinClasses([uiLoginInputWrapper, uiInputWrapper]),
                          input: joinClasses(["pa2", uiLoginInput, uiInput]),
                          label: joinClasses([uiLoginInputLabel, uiInputLabel]),
                      }
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
          var endpoint = auth.endpoint, _c = auth.onePanel, onePanel = _c === void 0 ? true : _c, title = auth.title, lines = auth.lines, _d = auth.postLines, postLines = _d === void 0 ? [] : _d, helpTitle = auth.helpTitle, helpLines = auth.helpLines, _e = auth.postHelpLines, postHelpLines = _e === void 0 ? [] : _e, _f = auth.loginFormClass, loginFormClass = _f === void 0 ? "" : _f, _g = auth.loginBtnText, loginBtnText = _g === void 0 ? "Login" : _g, _h = auth.loginBtnIcon, loginBtnIcon = _h === void 0 ? "" : _h, _j = auth.loginBtnClass, loginBtnClass = _j === void 0 ? "" : _j, reset = auth.reset, _k = auth.helpLinkText, helpLinkText = _k === void 0 ? "Trouble logging in?" : _k;
          return m__default['default'](".flex.flex-column", {
              class: (onePanel ? "" : "flex-row-l items-stretch ph1-l") + " " + (minimal ? '' : theme().uiLoginWrapper)
          }, [
              // Login form
              !this.toggleHelp ? m__default['default'](".flex-column.w-100", {
                  class: joinClasses([
                      theme().uiLogin
                  ])
              }, [
                  minimal ? null : m__default['default'](".f3.f2-l.fw5", {
                      class: joinClasses([colors().default.color, theme().uiLoginHeader])
                  }, m__default['default'].trust(title)),
                  lines
                      ? lodash__default['default'].map(lines, function (line) {
                          return m__default['default']("p.f5", {
                              class: joinClasses([theme().uiLoginLines])
                          }, m__default['default'].trust(line));
                      })
                      : null,
                  m__default['default']("form[enctype=multipart/form-data][method=post][accept=utf-8].w-100 " + (minimal ? '' : '.justify-between'), {
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
                      minimal ? null : lodash__default['default'].map(postLines, function (line) { return m__default['default']("p.f5", {
                          class: joinClasses([theme().uiLoginPostLines])
                      }, m__default['default'].trust(line)); }),
                      m__default['default'](".flex.items-center " + (minimal ? '.flex-column' : '.flex-row-reverse-ns.flex-column'), {
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
                          class: joinClasses([
                              theme().uiLoginResetButton
                          ]),
                          onclick: function () { return _this.toggleHelp = true; }
                      }, helpLinkText) : null)
                  ]),
              ]) : null,
              // Help form
              !onePanel || this.toggleHelp ? m__default['default'](".flex-column.w-100", {
                  class: joinClasses([
                      theme().uiLogin
                  ])
              }, [
                  minimal ? null : m__default['default'](".f3.f2-l.fw5.mv3.mv4-l", {
                      class: joinClasses([theme().uiLoginResetHeader, theme().uiLoginHeader])
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
              ]) : null
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
          var _b = _a.attrs, active = _b.active, _c = _b.config, login = _c.login, applyTheme = _c.applyTheme;
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
          return active() ? m__default['default'](DialogWrapper, {
              visible: visible,
          }, m__default['default'](".measure-wide.pa3", {
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
                      context === "default" /* default */ ? theme().uiDialogTitle : getContextClass(context),
                  ])
              }, title),
              m__default['default']("p.tc", {
                  class: joinClasses([
                      this.failMessage ? "red" : "",
                      theme().uiDialogFailMessage,
                  ])
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

  var DialogFeedback = /** @class */ (function () {
      function DialogFeedback() {
      }
      DialogFeedback.prototype.oninit = function (_a) {
          var _b = _a.attrs.config, applyTheme = _b.applyTheme, useProfile = _b.useProfile;
          var _c = useProfile ? useProfile() : profile() || {}, _d = _c.email, email = _d === void 0 ? "" : _d, _e = _c.mobile, mobile = _e === void 0 ? "" : _e;
          var uiClass = {
              wrapper: joinClasses([theme().uiInputFieldset]),
              inputWrapper: joinClasses(["ba b--light-gray mb2", theme().uiInputWrapper]),
              input: joinClasses([theme().uiInput]),
              label: joinClasses([theme().uiInputLabel]),
          };
          this.feedbackFormFields = buildFormFields([{
                  key: "feedback",
                  group: "feedback",
                  input: {
                      id: "feedback",
                      type: "textarea" /* textarea */, required: true,
                      uiClass: uiClass
                  }
              }, {
                  key: "email",
                  group: "email",
                  input: {
                      id: "email",
                      type: "email" /* email */, required: true,
                      uiClass: uiClass
                  }
              }, {
                  key: "phone_number",
                  group: "phone_number",
                  input: {
                      id: "phone_number",
                      type: "tel" /* tel */, required: true,
                      uiClass: uiClass
                  }
              }]);
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
          var _this = this;
          var _b;
          var _c = _a.attrs, config = _c.config, active = _c.active, visible = _c.visible;
          var title = config.title, subTitle = config.subTitle, cancelButton = config.cancelButton, submitButton = config.submitButton, postUrl = config.postUrl;
          var overwrite = (_b = this.themeHandler) === null || _b === void 0 ? void 0 : _b.classes;
          var feedbackFormGroup = lodash__default['default'].groupBy(this.feedbackFormFields ? this.feedbackFormFields.fields : [], "group");
          return active() ? m__default['default'](DialogWrapper, { visible: visible }, m__default['default'](".w-75-ns.mw-90.measure", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogFeedbackWrapper,
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogWrapper,
                  theme().uiDialogFeedbackWrapper,
                  theme().uiDialogWrapper
              ])
          }, [
              m__default['default'](".pa3", [
                  m__default['default']("h2.w-100.tc", {
                      class: joinClasses([
                          overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogFeedbackTitle,
                          theme().uiDialogFeedbackTitle
                      ])
                  }, title),
                  m__default['default']("h5.w-100.tc", {
                      class: joinClasses([
                          overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogFeedbackSubTitle,
                          theme().uiDialogFeedbackSubTitle
                      ])
                  }, subTitle),
                  m__default['default']("p.f6.b.pt3.mv1", {
                      class: joinClasses([
                          overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogFeedbackLabel,
                          theme().uiDialogFeedbackLabel
                      ])
                  }, "Feedback"),
                  m__default['default']("p.f6.pt1.ma0", lodash__default['default'].map(feedbackFormGroup["feedback"], assembleFormField)),
                  m__default['default']("p.f6.b.pt3.mv1", {
                      class: joinClasses([
                          overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogFeedbackLabel,
                          theme().uiDialogFeedbackLabel
                      ])
                  }, "Email Address"),
                  m__default['default']("p.f6.ma0", "We may need to contact you if we need more information on the feedback you have provided."),
                  m__default['default']("p.f6.pt1.ma0", lodash__default['default'].map(feedbackFormGroup["email"], assembleFormField)),
                  m__default['default']("p.f6.b.pt3.mv1", {
                      class: joinClasses([
                          overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDialogFeedbackLabel,
                          theme().uiDialogFeedbackLabel
                      ])
                  }, "Phone Number"),
                  m__default['default']("p.f6.pt1.ma0", lodash__default['default'].map(feedbackFormGroup["phone_number"], assembleFormField)),
              ]),
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
                          if (postUrl) {
                              m__default['default'].request({
                                  url: postUrl,
                                  method: "POST",
                                  body: {
                                      dialogFeedbackEmail: _this.feedbackFormFields.streamMap["email"].value(),
                                      dialogFeedbackPhone: _this.feedbackFormFields.streamMap["phone_number"].value(),
                                      dialogFeedbackText: _this.feedbackFormFields.streamMap["feedback"].value()
                                  }
                              }).then(function () {
                                  dialog({
                                      message: "Thank you for your feedback",
                                      position: exports.DialogPosition.center,
                                      priority: true
                                  });
                                  active(false);
                              }).catch(function () {
                                  active(false);
                                  dialog({
                                      type: exports.DialogType.notification,
                                      position: exports.DialogPosition.center,
                                      context: "error" /* error */,
                                      duration: 0,
                                      title: "Sorry!",
                                      message: "You're feedback failed to send, please try again later."
                                  });
                              });
                          }
                          else {
                              active(false);
                          }
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

  var NavbarCopyright = /** @class */ (function () {
      function NavbarCopyright() {
      }
      NavbarCopyright.prototype.view = function (_a) {
          var classes = _a.attrs.classes;
          var copyright = branding().copyright;
          var version = application().version;
          return m__default['default']("span.ma2.f7", {
              class: joinClasses([
                  classes,
                  theme().uiNavbarCopyright
              ]),
              title: version
          }, copyright ? [m__default['default'].trust("&copy; "), copyright] : null);
      };
      return NavbarCopyright;
  }());

  var NavbarImage = /** @class */ (function () {
      function NavbarImage() {
      }
      NavbarImage.prototype.view = function (_a) {
          var _b = _a.attrs, src = _b.src, classes = _b.classes, height = _b.height, width = _b.width, link = _b.link, linkToVaultRoot = _b.linkToVaultRoot;
          return src ? m__default['default']("img", {
              src: src,
              onclick: function () {
                  var _a;
                  if (link === null || link === void 0 ? void 0 : link.href) {
                      window.open(link.href, link.target || "_self");
                  }
                  if (linkToVaultRoot) {
                      window.open((_a = application().auth) === null || _a === void 0 ? void 0 : _a.endpoint, (link === null || link === void 0 ? void 0 : link.target) || "_self");
                  }
              },
              class: joinClasses([
                  (link === null || link === void 0 ? void 0 : link.href) ? "pointer" : "",
                  classes,
                  theme().uiNavbarImage
              ]),
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
          return m__default['default']("a.link.mh2.flex.self-stretch.items-center", {
              class: joinClasses([
                  classes,
                  theme().uiNavbarLink
              ]),
              href: href
          }, textContent);
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
          var logoutPath = auth.logoutPath, _c = auth.logoutLabel, logoutLabel = _c === void 0 ? "Logout" : _c, _d = auth.logoutIcon, logoutIcon = _d === void 0 ? "fal fa-sign-out-alt" : _d;
          return m__default['default']("span.mh2.self-stretch.items-center.pointer", {
              class: joinClasses([
                  classes,
                  getLogoutWrapperClasses(size),
                  theme().uiNavbarLogout,
                  "ripple"
              ]),
              onclick: function () { return logout(logoutPath); }
          }, [
              logoutLabel ? m__default['default']("span.mr2", {
                  class: joinClasses([theme().uiNavbarLogoutLabel]),
              }, logoutLabel) : null,
              m__default['default']("i.fal.fa-fw.fw4[aria-hidden=true]" + (logoutLabel ? '' : '.fal.fa-2x'), {
                  class: joinClasses([
                      theme().uiNavbarLogoutIcon,
                      logoutIcon
                  ])
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
          return m__default['default']("span.ma2", {
              class: joinClasses([
                  classes,
                  theme().uiNavbarText
              ]),
          }, textContent);
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
              class: joinClasses([
                  classes,
                  theme().uiNavbarPoweredBy
              ]),
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
              class: joinClasses([
                  progressNum ? undefined : "dn",
                  classes,
                  theme().uiNavbarProgress
              ])
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
              class: joinClasses([
                  classes,
                  theme().uiNavbarVersion
              ]),
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
              class: joinClasses([
                  classes,
                  theme().uiNavbarName
              ])
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
          return m__default['default']("span.ma2", {
              class: joinClasses([
                  classes,
                  theme().uiNavbarSalutation
              ]),
          }, "" + pre + (showFirstName ? firstName : "") + (showFirstName && showLastName ? " " : "") + (showLastName ? lastName : "") + post);
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
              else if (navItem.type === 2 /* image */) {
                  var src = navItem.src, height = navItem.height, width = navItem.width, link = navItem.link, linkToVaultRoot = navItem.linkToVaultRoot;
                  return m__default['default'](NavbarImage, { src: src, height: height, width: width, classes: classes, link: link, linkToVaultRoot: linkToVaultRoot });
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
                  ? m__default['default'](NavbarBuilder, { saving: saving, progress: progress, logout: logout, navList: navList })
                  : null;
          }
          else if (type === NavbarType.FOOTER) {
              var navList = filterNavList(branding().footer || [], logout);
              return navList.length
                  ? m__default['default'](NavbarBuilder, { saving: saving, progress: progress, logout: logout, navList: navList })
                  : null;
          }
          else if (type === NavbarType.SUBHEADER) {
              var navList = filterNavList(branding().subheader || [], logout);
              return navList.length
                  ? m__default['default'](".flex.items-center.self-center.w-100.flex-shrink-0", {
                      class: joinClasses([theme().uiSubheader]),
                  }, m__default['default'](NavbarBuilder, { saving: saving, progress: progress, logout: logout, navList: navList })) : null;
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
          var showFooter = filterNavList(branding().footer || [], logout).length > 0;
          var showHeader = filterNavList(branding().header || [], logout).length > 0;
          var showSubheader = filterNavList(branding().subheader || [], logout).length > 0;
          var fsStyle = fullScreen ? {
              "max-width": "unset"
          } : {};
          return [
              // Toast notification
              m__default['default'](DialogComponent),
              // Header
              showHeader ? m__default['default'](".flex.items-center.justify-center.z-1", {
                  class: joinClasses([theme().uiHeaderWrapper])
              }, m__default['default']("nav.items-center.self-center.w-100.z-1.h3.flex-shrink-0", {
                  class: joinClasses([
                      theme().uiHeader,
                      responsiveHeader ? "dn flex-l" : "flex"
                  ]),
                  style: fsStyle
              }, header ? header : m__default['default'](Navbar, {
                  type: NavbarType.HEADER,
                  saving: saving, progress: progress, logout: logout
              }))) : null,
              // Central
              m__default['default']("main.flex-auto.flex.flex-column.self-center.w-100.h-100.overflow-x-hidden", {
                  class: joinClasses([theme().uiLayout]),
                  style: fsStyle
              }, 
              // Subheader
              showSubheader ? m__default['default'](Navbar, {
                  type: NavbarType.SUBHEADER,
                  saving: saving, progress: progress, logout: logout
              }) : null, children),
              // Footer
              showFooter ? m__default['default'](".flex.items-center.justify-center.z-1", m__default['default']("nav.w-100.items-center.flex-shrink-0", {
                  class: joinClasses([
                      theme().uiFooter,
                      responsiveFooter ? "dn flex-l" : "flex"
                  ]),
                  style: fsStyle
              }, footer ? footer : m__default['default'](Navbar, {
                  type: NavbarType.FOOTER,
                  saving: saving, progress: progress, logout: logout
              }))) : null
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
              hasChildren(header)
                  ? m__default['default'](".flex.justify-between.items-center.flex-shrink-0", {
                      class: joinClasses([
                          headerClass,
                          theme().uiPanelHeader
                      ])
                  }, header)
                  : null,
              hasChildren(subheader)
                  ? m__default['default'](".flex-shrink-0", {
                      class: joinClasses([
                          theme().uiPanelSubheader,
                          subheaderClass
                      ])
                  }, subheader)
                  : null,
              content,
              footer
          ];
      };
      return Panel;
  }());

  var jsonActions = {
      actionCardConfirm: function (args) { return dialog(lodash__default['default'].assign(args, {
          type: exports.DialogType.confirm,
          cancelButton: args.cancelButton,
          confirmButton: lodash__default['default'].assign({
              onclick: function () {
                  window.open(args.href, args.target);
              }
          }, args.confirmButton)
      })); },
      dialog: function (args) { return dialog(args); },
      openWindow: function (args) { return window.open(args.href, args.target); }
  };
  function jsonAction(config) {
      return jsonActions[config.type](config.props);
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
          var _c = _a.attrs.data, src = _c.src, header = _c.header, lines = _c.lines, linesAsList = _c.linesAsList, buttonLabel = _c.buttonLabel, buttonIcon = _c.buttonIcon, href = _c.href, _d = _c.target, target = _d === void 0 ? "_self" : _d, confirm = _c.confirm, buttonContext = _c.buttonContext, context = _c.context;
          context = context || "alt" /* alt */;
          var overwrite = (_b = this.themeHandler) === null || _b === void 0 ? void 0 : _b.classes;
          var openRef = function () { return window.open(href, target); };
          return m__default['default'](".flex.items-center.justify-center.w-100.overflow-hidden.ma3", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiActionCardWrapper,
                  theme().uiActionCardWrapper,
                  theme().uiCardWrapper,
                  colors().getContextClasses(context),
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
          }, header), m__default['default'](".w-100.flex-auto", buildComponent({
              type: "sdx-blockLines",
              data: linesAsList ? {
                  blockSelector: "ul",
                  lines: lodash__default['default'].map(lines, function (line) {
                      return {
                          selector: "li",
                          child: line
                      };
                  })
              } : { lines: lines }
          })), href || buttonLabel ? m__default['default'](uiWidgets.Button, {
              classes: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiActionCardButton,
                  theme().uiActionCardButton,
              ]),
              label: buttonLabel,
              icon: buttonIcon,
              context: buttonContext || ButtonContextMapper(context),
              onclick: function () { return confirm
                  ? jsonAction({
                      type: "actionCardConfirm" /* actionCardConfirm */,
                      props: {
                          icon: confirm.icon,
                          title: confirm.title,
                          message: confirm.message,
                          confirmButton: confirm.confirmButton,
                          cancelButton: confirm.cancelButton,
                          href: href,
                          target: target
                      }
                  })
                  : openRef(); }
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
              class: joinClasses([theme().uiButton])
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
          var _b = _a.attrs.data, text = _b.text, _c = _b.key, key = _c === void 0 ? "sdx-header" : _c, _d = _b.style, style = _d === void 0 ? {} : _d, _e = _b.styleNS, styleNS = _e === void 0 ? {} : _e, _f = _b.styleM, styleM = _f === void 0 ? {} : _f, _g = _b.styleL, styleL = _g === void 0 ? {} : _g, _h = _b.classes, classes = _h === void 0 ? "" : _h;
          return m__default['default'](".f3.f2-l.fw5.mv3.mv4-l", {
              class: joinClasses([
                  createResponsiveClass({
                      key: key,
                      classes: classes,
                      style: style,
                      styleNS: styleNS,
                      styleL: styleL,
                      styleM: styleM,
                  }),
                  theme().uiCustomHeader,
                  colors().default.color
              ])
          }, text);
      };
      return Header;
  }());

  var BlockLines = /** @class */ (function () {
      function BlockLines() {
      }
      BlockLines.prototype.oninit = function (_a) {
          var applyTheme = _a.attrs.data.applyTheme;
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
          }, typeof lines === 'string' ?
              m__default['default']("p", lines)
              : lodash__default['default'].map(lines, function (line) {
                  if (typeof line === "string") {
                      return m__default['default']("p", m__default['default'].trust(line));
                  }
                  else {
                      return m__default['default'](line.selector, {
                          class: joinClasses([
                              line.classes,
                              line.colorSelector ? colors()[line.colorSelector].color : "",
                              line.bgColorSelector ? colors()[line.bgColorSelector].background : "",
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
          var _b = _a.attrs, itemLabel = _b.itemLabel, value = _b.value, overwrite = _b.overwrite, context = _b.context;
          return m__default['default']("div", {
              class: joinClasses([
                  theme().uiDataCardSectionItemWrapper,
              ])
          }, m__default['default']("span", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionItemLabel,
                  theme().uiDataCardSectionItemLabel,
                  !context || context === "default" /* default */
                      ? colors().body.classes.color
                      : colors().getContextClasses(context)
              ])
          }, itemLabel), typeof value === "string"
              ? m__default['default']("div", {
                  class: joinClasses([
                      overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionItemValue,
                      theme().uiDataCardSectionItemValue,
                      !context || context === "default" /* default */
                          ? colors().body.classes.color
                          : colors().getContextClasses(context)
                  ])
              }, value)
              : m__default['default']("div", lodash__default['default'].map(value, function (line) {
                  return m__default['default']("div", {
                      class: joinClasses([
                          overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionItemValue,
                          theme().uiDataCardSectionItemValue,
                          !context || context === "default" /* default */
                              ? colors().body.classes.color
                              : colors().getContextClasses(context)
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
          var _b = _a.attrs, dataMap = _b.dataMap, keys = _b.keys, label = _b.label, overwrite = _b.overwrite, context = _b.context;
          return m__default['default']("div", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionWrapper,
                  theme().uiDataCardSectionWrapper
              ])
          }, label ? m__default['default']("div", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionLabel,
                  theme().uiDataCardSectionLabel,
                  context ? colors().getContextClasses(context) : ""
              ])
          }, label) : null, lodash__default['default'].map(keys, function (key) {
              if (!dataMap[key]) {
                  console.error('Valid dataMap keys are - ', keys);
                  console.error("dataCard key " + key + " doesn't exist on your dataMap -- do you have typo?");
                  return null;
              }
              var _a = dataMap[key], itemLabel = _a[0], value = _a[1];
              return m__default['default'](DataCardSectionItem, { itemLabel: itemLabel, value: value, overwrite: overwrite, context: context });
          }));
      };
      return DataCardSection;
  }());

  var DataCard = /** @class */ (function () {
      function DataCard() {
          this.getDisplayComponents = function (_a) {
              var displayType = _a.displayType, context = _a.context, detailed = _a.detailed, overview = _a.overview, overwrite = _a.overwrite, dataMap = _a.dataMap;
              if (displayType === "detailed" /* detailed */) {
                  return detailed
                      ? lodash__default['default'].map(detailed, function (_a) {
                          var label = _a.label, keys = _a.keys;
                          return m__default['default'](DataCardSection, { dataMap: dataMap, keys: keys, label: label, overwrite: overwrite, context: context });
                      })
                      : lodash__default['default'].map(dataMap, function (_a) {
                          var itemLabel = _a[0], value = _a[1];
                          return m__default['default'](DataCardSectionItem, { overwrite: overwrite, itemLabel: itemLabel, value: value, context: context });
                      });
              }
              else {
                  return overview
                      ? m__default['default'](DataCardSection, { dataMap: dataMap, keys: overview, label: "", overwrite: overwrite, context: context })
                      : lodash__default['default'].map(dataMap, function (_a) {
                          var itemLabel = _a[0], value = _a[1];
                          return m__default['default'](DataCardSectionItem, { overwrite: overwrite, itemLabel: itemLabel, value: value, context: context });
                      });
              }
          };
      }
      DataCard.prototype.oninit = function (_a) {
          var data = _a.attrs.data;
          if (data === null || data === void 0 ? void 0 : data.applyTheme) {
              this.themeHandler = new ResponsiveThemeHandler(data === null || data === void 0 ? void 0 : data.applyTheme);
          }
      };
      DataCard.prototype.view = function (_a) {
          var _b;
          var data = _a.attrs.data;
          var pre = data.pre, post = data.post, dataMap = data.dataMap, displayType = data.displayType, _c = data.config, config = _c === void 0 ? {} : _c, onclick = data.onclick, header = data.header, categoryLabel = data.categoryLabel, button = data.button, _d = data.context, context = _d === void 0 ? "default" /* default */ : _d, buttonContext = data.buttonContext;
          var detailed = config.detailed, overview = config.overview;
          var overwrite = (_b = this.themeHandler) === null || _b === void 0 ? void 0 : _b.classes;
          return m__default['default'](".flex.flex-column", {
              class: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardWrapper,
                  theme().uiDataCardWrapper,
                  theme().uiCardWrapper,
                  colors().getContextClasses(context)
              ]),
              onclick: function () {
                  if (!button && onclick)
                      return onclick();
                  return null;
              },
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
          this.getDisplayComponents({ displayType: displayType, detailed: detailed, overview: overview, overwrite: overwrite, dataMap: dataMap, context: context }), button ? m__default['default'](uiWidgets.Button, {
              context: buttonContext || ButtonContextMapper(context),
              classes: joinClasses([
                  overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardButton,
                  theme().uiDataCardButton
              ]),
              onclick: function () {
                  if (button.action)
                      return jsonAction(button.action);
                  if (onclick)
                      return onclick();
                  return null;
              },
              label: button.label,
              icon: button.icon
          }) : null, (post === null || post === void 0 ? void 0 : post.length) ? lodash__default['default'].map(post, buildComponent)
              : null);
      };
      return DataCard;
  }());

  var ProgressCard = /** @class */ (function () {
      function ProgressCard() {
      }
      ProgressCard.prototype.mergeData = function (overwrites) {
          var status = overwrites.status, disabled = overwrites.disabled, onclick = overwrites.onclick, heading = overwrites.heading, subheading = overwrites.subheading, icons = overwrites.icons, stepNumber = overwrites.stepNumber, style = overwrites.style, link = overwrites.link, _a = overwrites.children, children = _a === void 0 ? null : _a, _b = overwrites.post, post = _b === void 0 ? [] : _b;
          this.data = {
              status: status || "incomplete" /* incomplete */,
              disabled: disabled || false,
              heading: heading || "",
              subheading: subheading || "",
              onclick: onclick || lodash__default['default'].noop,
              style: style || {},
              stepNumber: stepNumber || "",
              //Undefined check happens as Setting an icon to null will ensure no icon is displayed 
              //when combined with stepNumber allows the stepNumber to be displayed in a any status
              icons: {
                  complete: (icons === null || icons === void 0 ? void 0 : icons.complete) === undefined ? "fas fa-check fa-2x" : icons === null || icons === void 0 ? void 0 : icons.complete,
                  incomplete: (icons === null || icons === void 0 ? void 0 : icons.incomplete) || stepNumber ? "" : "fal fa-ellipsis-h fa-2x",
                  error: (icons === null || icons === void 0 ? void 0 : icons.error) === undefined ? "fas fa-exclamation fa-2x" : icons === null || icons === void 0 ? void 0 : icons.error,
                  warn: (icons === null || icons === void 0 ? void 0 : icons.warn) === undefined ? "fas fa-times fa-2x" : icons === null || icons === void 0 ? void 0 : icons.warn,
                  waiting: (icons === null || icons === void 0 ? void 0 : icons.waiting) === undefined ? "fal fa-hourglass-half fa-2x" : icons === null || icons === void 0 ? void 0 : icons.waiting
              },
              link: {
                  style: (link === null || link === void 0 ? void 0 : link.style) || {},
                  text: (link === null || link === void 0 ? void 0 : link.text) || "",
                  href: (link === null || link === void 0 ? void 0 : link.href) || "",
                  target: (link === null || link === void 0 ? void 0 : link.target) || "_blank"
              },
              post: post,
              children: children
          };
      };
      ProgressCard.prototype.getStatusClass = function (status) {
          switch (status) {
              case "complete" /* complete */:
                  return theme().uiProgressCardComplete;
              case "warn" /* warn */:
                  return theme().uiProgressCardWarn;
              case "waiting" /* waiting */:
                  return theme().uiProgressCardWaiting;
              case "error" /* error */:
                  return theme().uiProgressCardError;
              default:
                  return theme().uiProgressCardIncomplete;
          }
      };
      ProgressCard.prototype.getIconStatusClass = function (status) {
          switch (status) {
              case "complete" /* complete */:
                  return theme().uiProgressCardIconComplete;
              case "warn" /* warn */:
                  return theme().uiProgressCardIconWarn;
              case "waiting" /* waiting */:
                  return theme().uiProgressCardIconWaiting;
              case "error" /* error */:
                  return theme().uiProgressCardIconError;
              default:
                  return theme().uiProgressCardIconIncomplete;
          }
      };
      ProgressCard.prototype.statusComp = function (_a) {
          var status = _a.status, stepNumber = _a.stepNumber, icons = _a.icons;
          var iconStyle = status === "incomplete" /* incomplete */ && stepNumber
              ? {
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  margin: "auto"
              }
              : {
                  margin: "auto"
              };
          var iconText = status === "incomplete" /* incomplete */ || !icons[status] ? stepNumber : "";
          return m__default['default'](".flex.items-center.justify-center", {
              class: joinClasses([
                  theme().uiProgressCardIndicator,
                  this.getIconStatusClass(status)
              ])
          }, m__default['default']("i", {
              class: icons[status] || "",
              style: iconStyle
          }, iconText));
      };
      ProgressCard.prototype.view = function (_a) {
          var data = _a.attrs.data;
          this.mergeData(data);
          var _b = this.data, status = _b.status, style = _b.style, onclick = _b.onclick, disabled = _b.disabled, heading = _b.heading, subheading = _b.subheading, link = _b.link, post = _b.post, children = _b.children;
          return m__default['default'](".flex.flex-column", {
              onclick: onclick,
              style: lodash__default['default'].assign({ zIndex: "1" }, style),
              class: joinClasses([
                  theme().uiCardWrapper,
                  theme().uiProgressCardWrapper,
                  this.getStatusClass(status),
                  disabled ? theme().uiDisabled : "pointer",
              ])
          }, m__default['default'](".flex.flex-row.items-center.w-100", this.statusComp(this.data), m__default['default']("div", {
              style: {
                  borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                  width: "100%",
              }
          })), m__default['default'](".flex.flex-column.w-100", {
              style: {
                  marginTop: "2rem",
                  paddingRight: "1rem"
              }
          }, m__default['default'](".w-100", {
              class: theme().uiProgressCardSubheading
          }, subheading), m__default['default'](".w-100", {
              class: theme().uiProgressCardHeading
          }, heading)), link.href ? m__default['default'](uiWidgets.ButtonLink, {
              href: link.href,
              target: link.target,
              style: link.style,
              label: link.text,
          }) : null, lodash__default['default'].map(post, buildComponent), children);
      };
      return ProgressCard;
  }());

  var ProgressFlow = /** @class */ (function () {
      function ProgressFlow() {
      }
      ProgressFlow.prototype.view = function (_a) {
          var data = _a.attrs.data;
          return m__default['default'](".flex.flex-wrap.items-center", {
              class: theme().uiProgressFlowWrapper
          }, data.map(function (card) { return m__default['default'](".flex", {
              class: theme().uiProgressFlowStepWrapper
          }, buildComponent({ type: 'sdx-progressCard', data: card })); }));
      };
      return ProgressFlow;
  }());

  function registerDefault() {
      registerComponent("basic", Basic);
      registerComponent("sdx-actionCard", ActionCard);
      registerComponent("sdx-header", Header);
      registerComponent("sdx-blockLines", BlockLines);
      registerComponent("sdx-wrapper", Wrapper);
      registerComponent("sdx-dataCard", DataCard);
      registerComponent("sdx-progressCard", ProgressCard);
      registerComponent("sdx-progressFlow", ProgressFlow);
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

  function login(appConf, toastMessage) {
      if (toastMessage.message) {
          dialog(toastMessage);
      }
      return bootstrap(appConf).then(function (_a) {
          var pusher = _a.pusher;
          m__default['default'].mount(document.getElementById("page"), {
              view: function () {
                  var _a = application(), auth = _a.auth, footer = _a.footer, loginPreComponents = _a.loginPreComponents, loginPostComponents = _a.loginPostComponents;
                  if (!auth) {
                      return m__default['default']("span", "No authentication set");
                  }
                  return m__default['default'](Layout, {
                      logout: false
                  }, m__default['default'](Panel, {
                      content: m__default['default'](".flex-auto.overflow-x-hidden.overflow-y-auto.w-100.safari-bug", {
                          class: joinClasses([
                              theme().uiPanel
                          ])
                      }, [
                          loginPreComponents
                              ? lodash__default['default'].map(loginPreComponents, buildComponent)
                              : null,
                          m__default['default'](LoginForm, { auth: auth }),
                          // Company footer
                          loginPostComponents
                              ? lodash__default['default'].map(loginPostComponents, buildComponent)
                              : null,
                          footer ? buildComponent(footer) : null
                      ])
                  }));
              }
          });
          return {
              application: application(),
              pusher: pusher
          };
      });
  }

  exports.application = application;
  exports.assembleFormField = assembleFormField;
  exports.branding = branding;
  exports.buildComponent = buildComponent;
  exports.buildComponentList = buildComponentList;
  exports.buildFormFields = buildFormFields;
  exports.colors = colors;
  exports.createResponsiveClass = createResponsiveClass;
  exports.dialog = dialog;
  exports.joinClasses = joinClasses;
  exports.login = login;
  exports.profile = profile;
  exports.registerComponent = registerComponent;
  exports.registerFileMapFn = registerFileMapFn;
  exports.registerMapFn = registerMapFn;
  exports.registerMergeFn = registerMergeFn;
  exports.sdxRequest = sdxRequest;
  exports.size = size;
  exports.theme = theme;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
