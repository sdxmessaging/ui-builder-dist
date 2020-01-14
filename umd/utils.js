(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("lodash"),require("mithril"),require("mithril/stream")):typeof define==="function"&&define.amd?define(["exports","lodash","mithril","mithril/stream"],t):(e=e||self,t(e.uiBuilder={},e._,e.m,e.m.stream))})(this,(function(e,t,r,n){"use strict";t=t&&t.hasOwnProperty("default")?t["default"]:t;r=r&&r.hasOwnProperty("default")?r["default"]:r;n=n&&n.hasOwnProperty("default")?n["default"]:n;function a(e){if(e===null||e===true||e===false){return NaN}var t=Number(e);if(isNaN(t)){return t}return t<0?Math.ceil(t):Math.floor(t)}function i(e,t){if(t.length<e){throw new TypeError(e+" argument"+e>1?"s":""+" required, but only "+t.length+" present")}}function o(e){i(1,arguments);var t=Object.prototype.toString.call(e);if(e instanceof Date||typeof e==="object"&&t==="[object Date]"){return new Date(e.getTime())}else if(typeof e==="number"||t==="[object Number]"){return new Date(e)}else{if((typeof e==="string"||t==="[object String]")&&typeof console!=="undefined"){console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");console.warn((new Error).stack)}return new Date(NaN)}}function u(e,t){i(2,arguments);var r=o(e);var n=a(t);r.setDate(r.getDate()+n);return r}function s(e,t){i(2,arguments);var r=o(e).getTime();var n=a(t);return new Date(r+n)}var c=6e4;function f(e){var t=new Date(e.getTime());var r=Math.ceil(t.getTimezoneOffset());t.setSeconds(0,0);var n=t.getTime()%c;return r*c+n}function d(e){i(1,arguments);var t=o(e);t.setHours(0,0,0,0);return t}function l(e){i(1,arguments);var t=o(e);return!isNaN(t)}function m(e,t){i(2,arguments);var r=d(e);var n=d(t);return r.getTime()===n.getTime()}var h={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function v(e,t,r){r=r||{};var n;if(typeof h[e]==="string"){n=h[e]}else if(t===1){n=h[e].one}else{n=h[e].other.replace("{{count}}",t)}if(r.addSuffix){if(r.comparison>0){return"in "+n}else{return n+" ago"}}return n}function g(e){return function(t){var r=t||{};var n=r.width?String(r.width):e.defaultWidth;var a=e.formats[n]||e.formats[e.defaultWidth];return a}}var w={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"};var y={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"};var p={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"};var b={date:g({formats:w,defaultWidth:"full"}),time:g({formats:y,defaultWidth:"full"}),dateTime:g({formats:p,defaultWidth:"full"})};var T={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function M(e,t,r,n){return T[e]}function D(e){return function(t,r){var n=r||{};var a=n.context?String(n.context):"standalone";var i;if(a==="formatting"&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth;var u=n.width?String(n.width):o;i=e.formattingValues[u]||e.formattingValues[o]}else{var s=e.defaultWidth;var c=n.width?String(n.width):e.defaultWidth;i=e.values[c]||e.values[s]}var f=e.argumentCallback?e.argumentCallback(t):t;return i[f]}}var C={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]};var x={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]};var P={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]};var U={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]};var S={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}};var k={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}};function N(e,t){var r=Number(e);var n=r%100;if(n>20||n<10){switch(n%10){case 1:return r+"st";case 2:return r+"nd";case 3:return r+"rd"}}return r+"th"}var W={ordinalNumber:N,era:D({values:C,defaultWidth:"wide"}),quarter:D({values:x,defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:D({values:P,defaultWidth:"wide"}),day:D({values:U,defaultWidth:"wide"}),dayPeriod:D({values:S,defaultWidth:"wide",formattingValues:k,defaultFormattingWidth:"wide"})};function E(e){return function(t,r){var n=String(t);var a=r||{};var i=n.match(e.matchPattern);if(!i){return null}var o=i[0];var u=n.match(e.parsePattern);if(!u){return null}var s=e.valueCallback?e.valueCallback(u[0]):u[0];s=a.valueCallback?a.valueCallback(s):s;return{value:s,rest:n.slice(o.length)}}}function O(e){return function(t,r){var n=String(t);var a=r||{};var i=a.width;var o=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth];var u=n.match(o);if(!u){return null}var s=u[0];var c=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];var f;if(Object.prototype.toString.call(c)==="[object Array]"){f=z(c,(function(e){return e.test(n)}))}else{f=Y(c,(function(e){return e.test(n)}))}f=e.valueCallback?e.valueCallback(f):f;f=a.valueCallback?a.valueCallback(f):f;return{value:f,rest:n.slice(s.length)}}}function Y(e,t){for(var r in e){if(e.hasOwnProperty(r)&&t(e[r])){return r}}}function z(e,t){for(var r=0;r<e.length;r++){if(t(e[r])){return r}}}var q=/^(\d+)(th|st|nd|rd)?/i;var H=/\d+/i;var j={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i};var F={any:[/^b/i,/^(a|c)/i]};var B={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i};var L={any:[/1/i,/2/i,/3/i,/4/i]};var X={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i};var Q={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]};var G={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i};var R={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]};var A={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i};var I={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}};var _={ordinalNumber:E({matchPattern:q,parsePattern:H,valueCallback:function(e){return parseInt(e,10)}}),era:O({matchPatterns:j,defaultMatchWidth:"wide",parsePatterns:F,defaultParseWidth:"any"}),quarter:O({matchPatterns:B,defaultMatchWidth:"wide",parsePatterns:L,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:O({matchPatterns:X,defaultMatchWidth:"wide",parsePatterns:Q,defaultParseWidth:"any"}),day:O({matchPatterns:G,defaultMatchWidth:"wide",parsePatterns:R,defaultParseWidth:"any"}),dayPeriod:O({matchPatterns:A,defaultMatchWidth:"any",parsePatterns:I,defaultParseWidth:"any"})};var J={code:"en-US",formatDistance:v,formatLong:b,formatRelative:M,localize:W,match:_,options:{weekStartsOn:0,firstWeekContainsDate:1}};function Z(e,t){i(2,arguments);var r=a(t);return s(e,-r)}function $(e,t){var r=e<0?"-":"";var n=Math.abs(e).toString();while(n.length<t){n="0"+n}return r+n}var V={y:function(e,t){var r=e.getUTCFullYear();var n=r>0?r:1-r;return $(t==="yy"?n%100:n,t.length)},M:function(e,t){var r=e.getUTCMonth();return t==="M"?String(r+1):$(r+1,2)},d:function(e,t){return $(e.getUTCDate(),t.length)},a:function(e,t){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":case"aaa":return r.toUpperCase();case"aaaaa":return r[0];case"aaaa":default:return r==="am"?"a.m.":"p.m."}},h:function(e,t){return $(e.getUTCHours()%12||12,t.length)},H:function(e,t){return $(e.getUTCHours(),t.length)},m:function(e,t){return $(e.getUTCMinutes(),t.length)},s:function(e,t){return $(e.getUTCSeconds(),t.length)},S:function(e,t){var r=t.length;var n=e.getUTCMilliseconds();var a=Math.floor(n*Math.pow(10,r-3));return $(a,t.length)}};var K=864e5;function ee(e){i(1,arguments);var t=o(e);var r=t.getTime();t.setUTCMonth(0,1);t.setUTCHours(0,0,0,0);var n=t.getTime();var a=r-n;return Math.floor(a/K)+1}function te(e){i(1,arguments);var t=1;var r=o(e);var n=r.getUTCDay();var a=(n<t?7:0)+n-t;r.setUTCDate(r.getUTCDate()-a);r.setUTCHours(0,0,0,0);return r}function re(e){i(1,arguments);var t=o(e);var r=t.getUTCFullYear();var n=new Date(0);n.setUTCFullYear(r+1,0,4);n.setUTCHours(0,0,0,0);var a=te(n);var u=new Date(0);u.setUTCFullYear(r,0,4);u.setUTCHours(0,0,0,0);var s=te(u);if(t.getTime()>=a.getTime()){return r+1}else if(t.getTime()>=s.getTime()){return r}else{return r-1}}function ne(e){i(1,arguments);var t=re(e);var r=new Date(0);r.setUTCFullYear(t,0,4);r.setUTCHours(0,0,0,0);var n=te(r);return n}var ae=6048e5;function ie(e){i(1,arguments);var t=o(e);var r=te(t).getTime()-ne(t).getTime();return Math.round(r/ae)+1}function oe(e,t){i(1,arguments);var r=t||{};var n=r.locale;var u=n&&n.options&&n.options.weekStartsOn;var s=u==null?0:a(u);var c=r.weekStartsOn==null?s:a(r.weekStartsOn);if(!(c>=0&&c<=6)){throw new RangeError("weekStartsOn must be between 0 and 6 inclusively")}var f=o(e);var d=f.getUTCDay();var l=(d<c?7:0)+d-c;f.setUTCDate(f.getUTCDate()-l);f.setUTCHours(0,0,0,0);return f}function ue(e,t){i(1,arguments);var r=o(e,t);var n=r.getUTCFullYear();var u=t||{};var s=u.locale;var c=s&&s.options&&s.options.firstWeekContainsDate;var f=c==null?1:a(c);var d=u.firstWeekContainsDate==null?f:a(u.firstWeekContainsDate);if(!(d>=1&&d<=7)){throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively")}var l=new Date(0);l.setUTCFullYear(n+1,0,d);l.setUTCHours(0,0,0,0);var m=oe(l,t);var h=new Date(0);h.setUTCFullYear(n,0,d);h.setUTCHours(0,0,0,0);var v=oe(h,t);if(r.getTime()>=m.getTime()){return n+1}else if(r.getTime()>=v.getTime()){return n}else{return n-1}}function se(e,t){i(1,arguments);var r=t||{};var n=r.locale;var o=n&&n.options&&n.options.firstWeekContainsDate;var u=o==null?1:a(o);var s=r.firstWeekContainsDate==null?u:a(r.firstWeekContainsDate);var c=ue(e,t);var f=new Date(0);f.setUTCFullYear(c,0,s);f.setUTCHours(0,0,0,0);var d=oe(f,t);return d}var ce=6048e5;function fe(e,t){i(1,arguments);var r=o(e);var n=oe(r,t).getTime()-se(r,t).getTime();return Math.round(n/ce)+1}var de={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"};var le={G:function(e,t,r){var n=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return r.era(n,{width:"abbreviated"});case"GGGGG":return r.era(n,{width:"narrow"});case"GGGG":default:return r.era(n,{width:"wide"})}},y:function(e,t,r){if(t==="yo"){var n=e.getUTCFullYear();var a=n>0?n:1-n;return r.ordinalNumber(a,{unit:"year"})}return V.y(e,t)},Y:function(e,t,r,n){var a=ue(e,n);var i=a>0?a:1-a;if(t==="YY"){var o=i%100;return $(o,2)}if(t==="Yo"){return r.ordinalNumber(i,{unit:"year"})}return $(i,t.length)},R:function(e,t){var r=re(e);return $(r,t.length)},u:function(e,t){var r=e.getUTCFullYear();return $(r,t.length)},Q:function(e,t,r){var n=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(n);case"QQ":return $(n,2);case"Qo":return r.ordinalNumber(n,{unit:"quarter"});case"QQQ":return r.quarter(n,{width:"abbreviated",context:"formatting"});case"QQQQQ":return r.quarter(n,{width:"narrow",context:"formatting"});case"QQQQ":default:return r.quarter(n,{width:"wide",context:"formatting"})}},q:function(e,t,r){var n=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(n);case"qq":return $(n,2);case"qo":return r.ordinalNumber(n,{unit:"quarter"});case"qqq":return r.quarter(n,{width:"abbreviated",context:"standalone"});case"qqqqq":return r.quarter(n,{width:"narrow",context:"standalone"});case"qqqq":default:return r.quarter(n,{width:"wide",context:"standalone"})}},M:function(e,t,r){var n=e.getUTCMonth();switch(t){case"M":case"MM":return V.M(e,t);case"Mo":return r.ordinalNumber(n+1,{unit:"month"});case"MMM":return r.month(n,{width:"abbreviated",context:"formatting"});case"MMMMM":return r.month(n,{width:"narrow",context:"formatting"});case"MMMM":default:return r.month(n,{width:"wide",context:"formatting"})}},L:function(e,t,r){var n=e.getUTCMonth();switch(t){case"L":return String(n+1);case"LL":return $(n+1,2);case"Lo":return r.ordinalNumber(n+1,{unit:"month"});case"LLL":return r.month(n,{width:"abbreviated",context:"standalone"});case"LLLLL":return r.month(n,{width:"narrow",context:"standalone"});case"LLLL":default:return r.month(n,{width:"wide",context:"standalone"})}},w:function(e,t,r,n){var a=fe(e,n);if(t==="wo"){return r.ordinalNumber(a,{unit:"week"})}return $(a,t.length)},I:function(e,t,r){var n=ie(e);if(t==="Io"){return r.ordinalNumber(n,{unit:"week"})}return $(n,t.length)},d:function(e,t,r){if(t==="do"){return r.ordinalNumber(e.getUTCDate(),{unit:"date"})}return V.d(e,t)},D:function(e,t,r){var n=ee(e);if(t==="Do"){return r.ordinalNumber(n,{unit:"dayOfYear"})}return $(n,t.length)},E:function(e,t,r){var n=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return r.day(n,{width:"abbreviated",context:"formatting"});case"EEEEE":return r.day(n,{width:"narrow",context:"formatting"});case"EEEEEE":return r.day(n,{width:"short",context:"formatting"});case"EEEE":default:return r.day(n,{width:"wide",context:"formatting"})}},e:function(e,t,r,n){var a=e.getUTCDay();var i=(a-n.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return $(i,2);case"eo":return r.ordinalNumber(i,{unit:"day"});case"eee":return r.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return r.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return r.day(a,{width:"short",context:"formatting"});case"eeee":default:return r.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,r,n){var a=e.getUTCDay();var i=(a-n.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return $(i,t.length);case"co":return r.ordinalNumber(i,{unit:"day"});case"ccc":return r.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return r.day(a,{width:"narrow",context:"standalone"});case"cccccc":return r.day(a,{width:"short",context:"standalone"});case"cccc":default:return r.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,r){var n=e.getUTCDay();var a=n===0?7:n;switch(t){case"i":return String(a);case"ii":return $(a,t.length);case"io":return r.ordinalNumber(a,{unit:"day"});case"iii":return r.day(n,{width:"abbreviated",context:"formatting"});case"iiiii":return r.day(n,{width:"narrow",context:"formatting"});case"iiiiii":return r.day(n,{width:"short",context:"formatting"});case"iiii":default:return r.day(n,{width:"wide",context:"formatting"})}},a:function(e,t,r){var n=e.getUTCHours();var a=n/12>=1?"pm":"am";switch(t){case"a":case"aa":case"aaa":return r.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaaaa":return r.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return r.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,r){var n=e.getUTCHours();var a;if(n===12){a=de.noon}else if(n===0){a=de.midnight}else{a=n/12>=1?"pm":"am"}switch(t){case"b":case"bb":case"bbb":return r.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbbbb":return r.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return r.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(e,t,r){var n=e.getUTCHours();var a;if(n>=17){a=de.evening}else if(n>=12){a=de.afternoon}else if(n>=4){a=de.morning}else{a=de.night}switch(t){case"B":case"BB":case"BBB":return r.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return r.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return r.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(e,t,r){if(t==="ho"){var n=e.getUTCHours()%12;if(n===0)n=12;return r.ordinalNumber(n,{unit:"hour"})}return V.h(e,t)},H:function(e,t,r){if(t==="Ho"){return r.ordinalNumber(e.getUTCHours(),{unit:"hour"})}return V.H(e,t)},K:function(e,t,r){var n=e.getUTCHours()%12;if(t==="Ko"){return r.ordinalNumber(n,{unit:"hour"})}return $(n,t.length)},k:function(e,t,r){var n=e.getUTCHours();if(n===0)n=24;if(t==="ko"){return r.ordinalNumber(n,{unit:"hour"})}return $(n,t.length)},m:function(e,t,r){if(t==="mo"){return r.ordinalNumber(e.getUTCMinutes(),{unit:"minute"})}return V.m(e,t)},s:function(e,t,r){if(t==="so"){return r.ordinalNumber(e.getUTCSeconds(),{unit:"second"})}return V.s(e,t)},S:function(e,t){return V.S(e,t)},X:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();if(i===0){return"Z"}switch(t){case"X":return he(i);case"XXXX":case"XX":return ve(i);case"XXXXX":case"XXX":default:return ve(i,":")}},x:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();switch(t){case"x":return he(i);case"xxxx":case"xx":return ve(i);case"xxxxx":case"xxx":default:return ve(i,":")}},O:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+me(i,":");case"OOOO":default:return"GMT"+ve(i,":")}},z:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+me(i,":");case"zzzz":default:return"GMT"+ve(i,":")}},t:function(e,t,r,n){var a=n._originalDate||e;var i=Math.floor(a.getTime()/1e3);return $(i,t.length)},T:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTime();return $(i,t.length)}};function me(e,t){var r=e>0?"-":"+";var n=Math.abs(e);var a=Math.floor(n/60);var i=n%60;if(i===0){return r+String(a)}var o=t||"";return r+String(a)+o+$(i,2)}function he(e,t){if(e%60===0){var r=e>0?"-":"+";return r+$(Math.abs(e)/60,2)}return ve(e,t)}function ve(e,t){var r=t||"";var n=e>0?"-":"+";var a=Math.abs(e);var i=$(Math.floor(a/60),2);var o=$(a%60,2);return n+i+r+o}function ge(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function we(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}function ye(e,t){var r=e.match(/(P+)(p+)?/);var n=r[1];var a=r[2];if(!a){return ge(e,t)}var i;switch(n){case"P":i=t.dateTime({width:"short"});break;case"PP":i=t.dateTime({width:"medium"});break;case"PPP":i=t.dateTime({width:"long"});break;case"PPPP":default:i=t.dateTime({width:"full"});break}return i.replace("{{date}}",ge(n,t)).replace("{{time}}",we(a,t))}var pe={p:we,P:ye};var be=["D","DD"];var Te=["YY","YYYY"];function Me(e){return be.indexOf(e)!==-1}function De(e){return Te.indexOf(e)!==-1}function Ce(e){if(e==="YYYY"){throw new RangeError("Use `yyyy` instead of `YYYY` for formatting years; see: https://git.io/fxCyr")}else if(e==="YY"){throw new RangeError("Use `yy` instead of `YY` for formatting years; see: https://git.io/fxCyr")}else if(e==="D"){throw new RangeError("Use `d` instead of `D` for formatting days of the month; see: https://git.io/fxCyr")}else if(e==="DD"){throw new RangeError("Use `dd` instead of `DD` for formatting days of the month; see: https://git.io/fxCyr")}}var xe=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;var Pe=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;var Ue=/^'([^]*?)'?$/;var Se=/''/g;var ke=/[a-zA-Z]/;function Ne(e,t,r){i(2,arguments);var n=String(t);var u=r||{};var s=u.locale||J;var c=s.options&&s.options.firstWeekContainsDate;var d=c==null?1:a(c);var m=u.firstWeekContainsDate==null?d:a(u.firstWeekContainsDate);if(!(m>=1&&m<=7)){throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively")}var h=s.options&&s.options.weekStartsOn;var v=h==null?0:a(h);var g=u.weekStartsOn==null?v:a(u.weekStartsOn);if(!(g>=0&&g<=6)){throw new RangeError("weekStartsOn must be between 0 and 6 inclusively")}if(!s.localize){throw new RangeError("locale must contain localize property")}if(!s.formatLong){throw new RangeError("locale must contain formatLong property")}var w=o(e);if(!l(w)){throw new RangeError("Invalid time value")}var y=f(w);var p=Z(w,y);var b={firstWeekContainsDate:m,weekStartsOn:g,locale:s,_originalDate:w};var T=n.match(Pe).map((function(e){var t=e[0];if(t==="p"||t==="P"){var r=pe[t];return r(e,s.formatLong,b)}return e})).join("").match(xe).map((function(e){if(e==="''"){return"'"}var t=e[0];if(t==="'"){return We(e)}var r=le[t];if(r){if(!u.useAdditionalWeekYearTokens&&De(e)){Ce(e)}if(!u.useAdditionalDayOfYearTokens&&Me(e)){Ce(e)}return r(p,e,s.localize,b)}if(t.match(ke)){throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`")}return e})).join("");return T}function We(e){return e.match(Ue)[1].replace(Se,"'")}function Ee(e){i(1,arguments);return m(e,Date.now())}function Oe(e){i(1,arguments);return m(e,u(Date.now(),1))}function Ye(e,t){i(2,arguments);var r=a(t);return u(e,-r)}function ze(e){i(1,arguments);return m(e,Ye(Date.now(),1))}var qe=36e5;var He=6e4;var je=2;var Fe={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/};var Be=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;var Le=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;var Xe=/^([+-])(\d{2})(?::?(\d{2}))?$/;function Qe(e,t){i(1,arguments);var r=t||{};var n=r.additionalDigits==null?je:a(r.additionalDigits);if(n!==2&&n!==1&&n!==0){throw new RangeError("additionalDigits must be 0, 1 or 2")}if(!(typeof e==="string"||Object.prototype.toString.call(e)==="[object String]")){return new Date(NaN)}var o=Ge(e);var u;if(o.date){var s=Re(o.date,n);u=Ae(s.restDateString,s.year)}if(isNaN(u)||!u){return new Date(NaN)}var c=u.getTime();var d=0;var l;if(o.time){d=_e(o.time);if(isNaN(d)||d===null){return new Date(NaN)}}if(o.timezone){l=Ze(o.timezone);if(isNaN(l)){return new Date(NaN)}}else{var m=c+d;var h=new Date(m);l=f(h);var v=new Date(m);if(l>0){v.setDate(h.getDate()+1)}else{v.setDate(h.getDate()-1)}var g=f(v)-l;if(g>0){l+=g}}return new Date(c+d+l)}function Ge(e){var t={};var r=e.split(Fe.dateTimeDelimiter);var n;if(/:/.test(r[0])){t.date=null;n=r[0]}else{t.date=r[0];n=r[1];if(Fe.timeZoneDelimiter.test(t.date)){t.date=e.split(Fe.timeZoneDelimiter)[0];n=e.substr(t.date.length,e.length)}}if(n){var a=Fe.timezone.exec(n);if(a){t.time=n.replace(a[1],"");t.timezone=a[1]}else{t.time=n}}return t}function Re(e,t){var r=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)");var n=e.match(r);if(!n)return{year:null};var a=n[1]&&parseInt(n[1]);var i=n[2]&&parseInt(n[2]);return{year:i==null?a:i*100,restDateString:e.slice((n[1]||n[2]).length)}}function Ae(e,t){if(t===null)return null;var r=e.match(Be);if(!r)return null;var n=!!r[4];var a=Ie(r[1]);var i=Ie(r[2])-1;var o=Ie(r[3]);var u=Ie(r[4]);var s=Ie(r[5])-1;if(n){if(!rt(t,u,s)){return new Date(NaN)}return $e(t,u,s)}else{var c=new Date(0);if(!et(t,i,o)||!tt(t,a)){return new Date(NaN)}c.setUTCFullYear(t,i,Math.max(a,o));return c}}function Ie(e){return e?parseInt(e):1}function _e(e){var t=e.match(Le);if(!t)return null;var r=Je(t[1]);var n=Je(t[2]);var a=Je(t[3]);if(!nt(r,n,a)){return NaN}return r*qe+n*He+a*1e3}function Je(e){return e&&parseFloat(e.replace(",","."))||0}function Ze(e){if(e==="Z")return 0;var t=e.match(Xe);if(!t)return 0;var r=t[1]==="+"?-1:1;var n=parseInt(t[2]);var a=t[3]&&parseInt(t[3])||0;if(!at(n,a)){return NaN}return r*(n*qe+a*He)}function $e(e,t,r){var n=new Date(0);n.setUTCFullYear(e,0,4);var a=n.getUTCDay()||7;var i=(t-1)*7+r+1-a;n.setUTCDate(n.getUTCDate()+i);return n}var Ve=[31,null,31,30,31,30,31,31,30,31,30,31];function Ke(e){return e%400===0||e%4===0&&e%100}function et(e,t,r){return t>=0&&t<=11&&r>=1&&r<=(Ve[t]||(Ke(e)?29:28))}function tt(e,t){return t>=1&&t<=(Ke(e)?366:365)}function rt(e,t,r){return t>=1&&t<=53&&r>=0&&r<=6}function nt(e,t,r){if(e===24){return t===0&&r===0}return r>=0&&r<60&&t>=0&&t<60&&e>=0&&e<25}function at(e,t){return t>=0&&t<=59}var it={full:"EEEE, d MMMM yyyy",long:"d MMMM yyyy",medium:"d MMM yyyy",short:"dd/MM/yyyy"};var ot={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"};var ut={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"};var st={date:g({formats:it,defaultWidth:"full"}),time:g({formats:ot,defaultWidth:"full"}),dateTime:g({formats:ut,defaultWidth:"full"})};var ct={code:"en-GB",formatDistance:v,formatLong:st,formatRelative:M,localize:W,match:_,options:{weekStartsOn:1,firstWeekContainsDate:4}};function ft(){return window.matchMedia("only screen and (max-width: 360px)").matches}function dt(){return window.matchMedia("only screen and (max-width: 768px)").matches}function lt(e,r){return t.find(e,t.matches(r))}function mt(e,r){return t.find(e,t.matches({_id:r}))}function ht(e,t,r){return n.lift((function(e,t){return mt(e,t)||r}),e,t)}function vt(e,r){return t.filter(e,t.matches(r))}function gt(e,r){return t.remove(e,t.matches(r))}function wt(e,r){var n=r.tags;return t.some(e,(function(e){return t.some(n,e)}))}function yt(e,r){var n=r.tags;return t.every(e,(function(e){return t.some(n,e)}))}function pt(e,r,n){if(n===void 0){n=false}if(r.length===0){return e}var a=t.partial(n?yt:wt,r);return t.filter(e,a)}function bt(e){var t=e.readonly,r=e.disabled;return!(t||r)}function Tt(e){return Boolean(t.isArray(e)?e.length:e)}function Mt(e){if(e<1e3){return e+" bytes"}else if(e<1e6){return t.round(e/1e3)+"Kb"}else{return t.round(e/1e6)+"Mb"}}function Dt(e,t){if(t===void 0){t="P"}return Ne(e,t,{locale:ct})}function Ct(e){if(ze(e)){return"Yesterday"}else if(Ee(e)){return"Today"}else if(Oe(e)){return"Tomorrow"}else{return Dt(e)}}function xt(e){return e?Ct(Qe(e).valueOf()):"-"}function Pt(e,r){if(e.modelId==="category"){return e.label}else{var n=e.props;return t(r).map((function(e){return n[e]})).compact().value().join(" ")}}function Ut(e){return e}function St(e){switch(e){case"application/zip":return"fa-file-archive";case"application/pdf":return"fa-file-pdf";case"application/vnd.openxmlformats-officedocument.wordprocessingml.document":case"application/msword":return"fa-file-word";case"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":case"application/vnd.ms-excel":return"fa-file-excel";case"application/vnd.openxmlformats-officedocument.presentationml.presentation":case"application/vnd.ms-powerpoint":return"fa-file-powerpoint";case"image/jpeg":case"image/png":case"image/gif":case"image/tiff":return"fa-file-image";case"audio/mpeg":return"fa-file-audio";case"video/mpeg":case"video/quicktime":case"video/x-msvideo":return"fa-file-video";default:return"fa-file-alt"}}function kt(e,t){if(t==="size"){return Mt(e.size)}else if(t==="lastModified"){return Ct(e.lastModified)}else if(t==="type"){return r("i.fal.fa-fw",{title:e.type,class:St(e.type)})}else{return e[t]}}function Nt(e,r){var a=r.id;return n(t.map(vt(e,{prop:a}),(function(e){var t=e._id,r=e.name;return{guid:t,name:r,path:e.remoteUrl}})))}function Wt(e,r){var a=r.id;return n(t.get(e,a,""))}e.canEdit=bt;e.extractFields=Pt;e.fileIcon=St;e.filterByProperty=vt;e.formatDate=Dt;e.getFileStream=Nt;e.getFileValue=kt;e.getPropStream=Wt;e.hasValue=Tt;e.humaniseByteCount=Mt;e.humaniseTimeValue=Ct;e.itemsForCategory=pt;e.parseTimeStr=xt;e.pickById=mt;e.pickByIdStream=ht;e.pickByProperty=lt;e.removeByProperty=gt;e.simpleResponse=Ut;e.smallDevice=dt;e.tinyDevice=ft;Object.defineProperty(e,"__esModule",{value:true})}));
