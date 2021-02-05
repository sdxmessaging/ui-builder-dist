(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("lodash"),require("mithril"),require("mithril/stream"),require("jss")):typeof define==="function"&&define.amd?define(["exports","lodash","mithril","mithril/stream","jss"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiBuilder={},e._,e.m,e.m.stream,e.jss))})(this,(function(e,t,r,n,a){"use strict";function i(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var o=i(t);var u=i(r);var s=i(n);var f=i(a);function c(e){if(e===null||e===true||e===false){return NaN}var t=Number(e);if(isNaN(t)){return t}return t<0?Math.ceil(t):Math.floor(t)}function l(e,t){if(t.length<e){throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}}function d(e){l(1,arguments);var t=Object.prototype.toString.call(e);if(e instanceof Date||typeof e==="object"&&t==="[object Date]"){return new Date(e.getTime())}else if(typeof e==="number"||t==="[object Number]"){return new Date(e)}else{if((typeof e==="string"||t==="[object String]")&&typeof console!=="undefined"){console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");console.warn((new Error).stack)}return new Date(NaN)}}function h(e,t){l(2,arguments);var r=d(e);var n=c(t);if(isNaN(n)){return new Date(NaN)}if(!n){return r}r.setDate(r.getDate()+n);return r}function m(e,t){l(2,arguments);var r=d(e).getTime();var n=c(t);return new Date(r+n)}var v=6e4;function g(e){return e.getTime()%v}function p(e){var t=new Date(e.getTime());var r=Math.ceil(t.getTimezoneOffset());t.setSeconds(0,0);var n=r>0;var a=n?(v+g(t))%v:g(t);return r*v+a}function w(e){l(1,arguments);var t=d(e);t.setHours(0,0,0,0);return t}function y(e){l(1,arguments);var t=d(e);return!isNaN(t)}function b(e,t){l(2,arguments);var r=w(e);var n=w(t);return r.getTime()===n.getTime()}var T={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function x(e,t,r){r=r||{};var n;if(typeof T[e]==="string"){n=T[e]}else if(t===1){n=T[e].one}else{n=T[e].other.replace("{{count}}",t)}if(r.addSuffix){if(r.comparison>0){return"in "+n}else{return n+" ago"}}return n}function M(e){return function(t){var r=t||{};var n=r.width?String(r.width):e.defaultWidth;var a=e.formats[n]||e.formats[e.defaultWidth];return a}}var C={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"};var D={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"};var S={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"};var P={date:M({formats:C,defaultWidth:"full"}),time:M({formats:D,defaultWidth:"full"}),dateTime:M({formats:S,defaultWidth:"full"})};var k={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function U(e,t,r,n){return k[e]}function N(e){return function(t,r){var n=r||{};var a=n.context?String(n.context):"standalone";var i;if(a==="formatting"&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth;var u=n.width?String(n.width):o;i=e.formattingValues[u]||e.formattingValues[o]}else{var s=e.defaultWidth;var f=n.width?String(n.width):e.defaultWidth;i=e.values[f]||e.values[s]}var c=e.argumentCallback?e.argumentCallback(t):t;return i[c]}}var E={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]};var W={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]};var O={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]};var Y={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]};var q={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}};var z={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}};function H(e,t){var r=Number(e);var n=r%100;if(n>20||n<10){switch(n%10){case 1:return r+"st";case 2:return r+"nd";case 3:return r+"rd"}}return r+"th"}var j={ordinalNumber:H,era:N({values:E,defaultWidth:"wide"}),quarter:N({values:W,defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:N({values:O,defaultWidth:"wide"}),day:N({values:Y,defaultWidth:"wide"}),dayPeriod:N({values:q,defaultWidth:"wide",formattingValues:z,defaultFormattingWidth:"wide"})};function R(e){return function(t,r){var n=String(t);var a=r||{};var i=n.match(e.matchPattern);if(!i){return null}var o=i[0];var u=n.match(e.parsePattern);if(!u){return null}var s=e.valueCallback?e.valueCallback(u[0]):u[0];s=a.valueCallback?a.valueCallback(s):s;return{value:s,rest:n.slice(o.length)}}}function F(e){return function(t,r){var n=String(t);var a=r||{};var i=a.width;var o=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth];var u=n.match(o);if(!u){return null}var s=u[0];var f=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];var c;if(Object.prototype.toString.call(f)==="[object Array]"){c=L(f,(function(e){return e.test(s)}))}else{c=B(f,(function(e){return e.test(s)}))}c=e.valueCallback?e.valueCallback(c):c;c=a.valueCallback?a.valueCallback(c):c;return{value:c,rest:n.slice(s.length)}}}function B(e,t){for(var r in e){if(e.hasOwnProperty(r)&&t(e[r])){return r}}}function L(e,t){for(var r=0;r<e.length;r++){if(t(e[r])){return r}}}var X=/^(\d+)(th|st|nd|rd)?/i;var Q=/\d+/i;var G={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i};var A={any:[/^b/i,/^(a|c)/i]};var I={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i};var _={any:[/1/i,/2/i,/3/i,/4/i]};var J={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i};var Z={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]};var $={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i};var V={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]};var K={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i};var ee={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}};var te={ordinalNumber:R({matchPattern:X,parsePattern:Q,valueCallback:function(e){return parseInt(e,10)}}),era:F({matchPatterns:G,defaultMatchWidth:"wide",parsePatterns:A,defaultParseWidth:"any"}),quarter:F({matchPatterns:I,defaultMatchWidth:"wide",parsePatterns:_,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:F({matchPatterns:J,defaultMatchWidth:"wide",parsePatterns:Z,defaultParseWidth:"any"}),day:F({matchPatterns:$,defaultMatchWidth:"wide",parsePatterns:V,defaultParseWidth:"any"}),dayPeriod:F({matchPatterns:K,defaultMatchWidth:"any",parsePatterns:ee,defaultParseWidth:"any"})};var re={code:"en-US",formatDistance:x,formatLong:P,formatRelative:U,localize:j,match:te,options:{weekStartsOn:0,firstWeekContainsDate:1}};function ne(e,t){l(2,arguments);var r=c(t);return m(e,-r)}function ae(e,t){var r=e<0?"-":"";var n=Math.abs(e).toString();while(n.length<t){n="0"+n}return r+n}var ie={y:function(e,t){var r=e.getUTCFullYear();var n=r>0?r:1-r;return ae(t==="yy"?n%100:n,t.length)},M:function(e,t){var r=e.getUTCMonth();return t==="M"?String(r+1):ae(r+1,2)},d:function(e,t){return ae(e.getUTCDate(),t.length)},a:function(e,t){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":case"aaa":return r.toUpperCase();case"aaaaa":return r[0];case"aaaa":default:return r==="am"?"a.m.":"p.m."}},h:function(e,t){return ae(e.getUTCHours()%12||12,t.length)},H:function(e,t){return ae(e.getUTCHours(),t.length)},m:function(e,t){return ae(e.getUTCMinutes(),t.length)},s:function(e,t){return ae(e.getUTCSeconds(),t.length)},S:function(e,t){var r=t.length;var n=e.getUTCMilliseconds();var a=Math.floor(n*Math.pow(10,r-3));return ae(a,t.length)}};var oe=864e5;function ue(e){l(1,arguments);var t=d(e);var r=t.getTime();t.setUTCMonth(0,1);t.setUTCHours(0,0,0,0);var n=t.getTime();var a=r-n;return Math.floor(a/oe)+1}function se(e){l(1,arguments);var t=1;var r=d(e);var n=r.getUTCDay();var a=(n<t?7:0)+n-t;r.setUTCDate(r.getUTCDate()-a);r.setUTCHours(0,0,0,0);return r}function fe(e){l(1,arguments);var t=d(e);var r=t.getUTCFullYear();var n=new Date(0);n.setUTCFullYear(r+1,0,4);n.setUTCHours(0,0,0,0);var a=se(n);var i=new Date(0);i.setUTCFullYear(r,0,4);i.setUTCHours(0,0,0,0);var o=se(i);if(t.getTime()>=a.getTime()){return r+1}else if(t.getTime()>=o.getTime()){return r}else{return r-1}}function ce(e){l(1,arguments);var t=fe(e);var r=new Date(0);r.setUTCFullYear(t,0,4);r.setUTCHours(0,0,0,0);var n=se(r);return n}var le=6048e5;function de(e){l(1,arguments);var t=d(e);var r=se(t).getTime()-ce(t).getTime();return Math.round(r/le)+1}function he(e,t){l(1,arguments);var r=t||{};var n=r.locale;var a=n&&n.options&&n.options.weekStartsOn;var i=a==null?0:c(a);var o=r.weekStartsOn==null?i:c(r.weekStartsOn);if(!(o>=0&&o<=6)){throw new RangeError("weekStartsOn must be between 0 and 6 inclusively")}var u=d(e);var s=u.getUTCDay();var f=(s<o?7:0)+s-o;u.setUTCDate(u.getUTCDate()-f);u.setUTCHours(0,0,0,0);return u}function me(e,t){l(1,arguments);var r=d(e,t);var n=r.getUTCFullYear();var a=t||{};var i=a.locale;var o=i&&i.options&&i.options.firstWeekContainsDate;var u=o==null?1:c(o);var s=a.firstWeekContainsDate==null?u:c(a.firstWeekContainsDate);if(!(s>=1&&s<=7)){throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively")}var f=new Date(0);f.setUTCFullYear(n+1,0,s);f.setUTCHours(0,0,0,0);var h=he(f,t);var m=new Date(0);m.setUTCFullYear(n,0,s);m.setUTCHours(0,0,0,0);var v=he(m,t);if(r.getTime()>=h.getTime()){return n+1}else if(r.getTime()>=v.getTime()){return n}else{return n-1}}function ve(e,t){l(1,arguments);var r=t||{};var n=r.locale;var a=n&&n.options&&n.options.firstWeekContainsDate;var i=a==null?1:c(a);var o=r.firstWeekContainsDate==null?i:c(r.firstWeekContainsDate);var u=me(e,t);var s=new Date(0);s.setUTCFullYear(u,0,o);s.setUTCHours(0,0,0,0);var f=he(s,t);return f}var ge=6048e5;function pe(e,t){l(1,arguments);var r=d(e);var n=he(r,t).getTime()-ve(r,t).getTime();return Math.round(n/ge)+1}var we={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"};var ye={G:function(e,t,r){var n=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return r.era(n,{width:"abbreviated"});case"GGGGG":return r.era(n,{width:"narrow"});case"GGGG":default:return r.era(n,{width:"wide"})}},y:function(e,t,r){if(t==="yo"){var n=e.getUTCFullYear();var a=n>0?n:1-n;return r.ordinalNumber(a,{unit:"year"})}return ie.y(e,t)},Y:function(e,t,r,n){var a=me(e,n);var i=a>0?a:1-a;if(t==="YY"){var o=i%100;return ae(o,2)}if(t==="Yo"){return r.ordinalNumber(i,{unit:"year"})}return ae(i,t.length)},R:function(e,t){var r=fe(e);return ae(r,t.length)},u:function(e,t){var r=e.getUTCFullYear();return ae(r,t.length)},Q:function(e,t,r){var n=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(n);case"QQ":return ae(n,2);case"Qo":return r.ordinalNumber(n,{unit:"quarter"});case"QQQ":return r.quarter(n,{width:"abbreviated",context:"formatting"});case"QQQQQ":return r.quarter(n,{width:"narrow",context:"formatting"});case"QQQQ":default:return r.quarter(n,{width:"wide",context:"formatting"})}},q:function(e,t,r){var n=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(n);case"qq":return ae(n,2);case"qo":return r.ordinalNumber(n,{unit:"quarter"});case"qqq":return r.quarter(n,{width:"abbreviated",context:"standalone"});case"qqqqq":return r.quarter(n,{width:"narrow",context:"standalone"});case"qqqq":default:return r.quarter(n,{width:"wide",context:"standalone"})}},M:function(e,t,r){var n=e.getUTCMonth();switch(t){case"M":case"MM":return ie.M(e,t);case"Mo":return r.ordinalNumber(n+1,{unit:"month"});case"MMM":return r.month(n,{width:"abbreviated",context:"formatting"});case"MMMMM":return r.month(n,{width:"narrow",context:"formatting"});case"MMMM":default:return r.month(n,{width:"wide",context:"formatting"})}},L:function(e,t,r){var n=e.getUTCMonth();switch(t){case"L":return String(n+1);case"LL":return ae(n+1,2);case"Lo":return r.ordinalNumber(n+1,{unit:"month"});case"LLL":return r.month(n,{width:"abbreviated",context:"standalone"});case"LLLLL":return r.month(n,{width:"narrow",context:"standalone"});case"LLLL":default:return r.month(n,{width:"wide",context:"standalone"})}},w:function(e,t,r,n){var a=pe(e,n);if(t==="wo"){return r.ordinalNumber(a,{unit:"week"})}return ae(a,t.length)},I:function(e,t,r){var n=de(e);if(t==="Io"){return r.ordinalNumber(n,{unit:"week"})}return ae(n,t.length)},d:function(e,t,r){if(t==="do"){return r.ordinalNumber(e.getUTCDate(),{unit:"date"})}return ie.d(e,t)},D:function(e,t,r){var n=ue(e);if(t==="Do"){return r.ordinalNumber(n,{unit:"dayOfYear"})}return ae(n,t.length)},E:function(e,t,r){var n=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return r.day(n,{width:"abbreviated",context:"formatting"});case"EEEEE":return r.day(n,{width:"narrow",context:"formatting"});case"EEEEEE":return r.day(n,{width:"short",context:"formatting"});case"EEEE":default:return r.day(n,{width:"wide",context:"formatting"})}},e:function(e,t,r,n){var a=e.getUTCDay();var i=(a-n.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return ae(i,2);case"eo":return r.ordinalNumber(i,{unit:"day"});case"eee":return r.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return r.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return r.day(a,{width:"short",context:"formatting"});case"eeee":default:return r.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,r,n){var a=e.getUTCDay();var i=(a-n.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return ae(i,t.length);case"co":return r.ordinalNumber(i,{unit:"day"});case"ccc":return r.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return r.day(a,{width:"narrow",context:"standalone"});case"cccccc":return r.day(a,{width:"short",context:"standalone"});case"cccc":default:return r.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,r){var n=e.getUTCDay();var a=n===0?7:n;switch(t){case"i":return String(a);case"ii":return ae(a,t.length);case"io":return r.ordinalNumber(a,{unit:"day"});case"iii":return r.day(n,{width:"abbreviated",context:"formatting"});case"iiiii":return r.day(n,{width:"narrow",context:"formatting"});case"iiiiii":return r.day(n,{width:"short",context:"formatting"});case"iiii":default:return r.day(n,{width:"wide",context:"formatting"})}},a:function(e,t,r){var n=e.getUTCHours();var a=n/12>=1?"pm":"am";switch(t){case"a":case"aa":case"aaa":return r.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaaaa":return r.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return r.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,r){var n=e.getUTCHours();var a;if(n===12){a=we.noon}else if(n===0){a=we.midnight}else{a=n/12>=1?"pm":"am"}switch(t){case"b":case"bb":case"bbb":return r.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbbbb":return r.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return r.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(e,t,r){var n=e.getUTCHours();var a;if(n>=17){a=we.evening}else if(n>=12){a=we.afternoon}else if(n>=4){a=we.morning}else{a=we.night}switch(t){case"B":case"BB":case"BBB":return r.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return r.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return r.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(e,t,r){if(t==="ho"){var n=e.getUTCHours()%12;if(n===0)n=12;return r.ordinalNumber(n,{unit:"hour"})}return ie.h(e,t)},H:function(e,t,r){if(t==="Ho"){return r.ordinalNumber(e.getUTCHours(),{unit:"hour"})}return ie.H(e,t)},K:function(e,t,r){var n=e.getUTCHours()%12;if(t==="Ko"){return r.ordinalNumber(n,{unit:"hour"})}return ae(n,t.length)},k:function(e,t,r){var n=e.getUTCHours();if(n===0)n=24;if(t==="ko"){return r.ordinalNumber(n,{unit:"hour"})}return ae(n,t.length)},m:function(e,t,r){if(t==="mo"){return r.ordinalNumber(e.getUTCMinutes(),{unit:"minute"})}return ie.m(e,t)},s:function(e,t,r){if(t==="so"){return r.ordinalNumber(e.getUTCSeconds(),{unit:"second"})}return ie.s(e,t)},S:function(e,t){return ie.S(e,t)},X:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();if(i===0){return"Z"}switch(t){case"X":return Te(i);case"XXXX":case"XX":return xe(i);case"XXXXX":case"XXX":default:return xe(i,":")}},x:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();switch(t){case"x":return Te(i);case"xxxx":case"xx":return xe(i);case"xxxxx":case"xxx":default:return xe(i,":")}},O:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+be(i,":");case"OOOO":default:return"GMT"+xe(i,":")}},z:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+be(i,":");case"zzzz":default:return"GMT"+xe(i,":")}},t:function(e,t,r,n){var a=n._originalDate||e;var i=Math.floor(a.getTime()/1e3);return ae(i,t.length)},T:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTime();return ae(i,t.length)}};function be(e,t){var r=e>0?"-":"+";var n=Math.abs(e);var a=Math.floor(n/60);var i=n%60;if(i===0){return r+String(a)}var o=t||"";return r+String(a)+o+ae(i,2)}function Te(e,t){if(e%60===0){var r=e>0?"-":"+";return r+ae(Math.abs(e)/60,2)}return xe(e,t)}function xe(e,t){var r=t||"";var n=e>0?"-":"+";var a=Math.abs(e);var i=ae(Math.floor(a/60),2);var o=ae(a%60,2);return n+i+r+o}function Me(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function Ce(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}function De(e,t){var r=e.match(/(P+)(p+)?/);var n=r[1];var a=r[2];if(!a){return Me(e,t)}var i;switch(n){case"P":i=t.dateTime({width:"short"});break;case"PP":i=t.dateTime({width:"medium"});break;case"PPP":i=t.dateTime({width:"long"});break;case"PPPP":default:i=t.dateTime({width:"full"});break}return i.replace("{{date}}",Me(n,t)).replace("{{time}}",Ce(a,t))}var Se={p:Ce,P:De};var Pe=["D","DD"];var ke=["YY","YYYY"];function Ue(e){return Pe.indexOf(e)!==-1}function Ne(e){return ke.indexOf(e)!==-1}function Ee(e,t,r){if(e==="YYYY"){throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(r,"`; see: https://git.io/fxCyr"))}else if(e==="YY"){throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(r,"`; see: https://git.io/fxCyr"))}else if(e==="D"){throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(r,"`; see: https://git.io/fxCyr"))}else if(e==="DD"){throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(r,"`; see: https://git.io/fxCyr"))}}var We=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;var Oe=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;var Ye=/^'([^]*?)'?$/;var qe=/''/g;var ze=/[a-zA-Z]/;function He(e,t,r){l(2,arguments);var n=String(t);var a=r||{};var i=a.locale||re;var o=i.options&&i.options.firstWeekContainsDate;var u=o==null?1:c(o);var s=a.firstWeekContainsDate==null?u:c(a.firstWeekContainsDate);if(!(s>=1&&s<=7)){throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively")}var f=i.options&&i.options.weekStartsOn;var h=f==null?0:c(f);var m=a.weekStartsOn==null?h:c(a.weekStartsOn);if(!(m>=0&&m<=6)){throw new RangeError("weekStartsOn must be between 0 and 6 inclusively")}if(!i.localize){throw new RangeError("locale must contain localize property")}if(!i.formatLong){throw new RangeError("locale must contain formatLong property")}var v=d(e);if(!y(v)){throw new RangeError("Invalid time value")}var g=p(v);var w=ne(v,g);var b={firstWeekContainsDate:s,weekStartsOn:m,locale:i,_originalDate:v};var T=n.match(Oe).map((function(e){var t=e[0];if(t==="p"||t==="P"){var r=Se[t];return r(e,i.formatLong,b)}return e})).join("").match(We).map((function(r){if(r==="''"){return"'"}var n=r[0];if(n==="'"){return je(r)}var o=ye[n];if(o){if(!a.useAdditionalWeekYearTokens&&Ne(r)){Ee(r,t,e)}if(!a.useAdditionalDayOfYearTokens&&Ue(r)){Ee(r,t,e)}return o(w,r,i.localize,b)}if(n.match(ze)){throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`")}return r})).join("");return T}function je(e){return e.match(Ye)[1].replace(qe,"'")}function Re(e,t){l(2,arguments);var r=c(t);return h(e,-r)}function Fe(e){l(1,arguments);return b(e,Date.now())}function Be(e){l(1,arguments);return b(e,h(Date.now(),1))}function Le(e){l(1,arguments);return b(e,Re(Date.now(),1))}var Xe=36e5;var Qe=6e4;var Ge=2;var Ae={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/};var Ie=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;var _e=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;var Je=/^([+-])(\d{2})(?::?(\d{2}))?$/;function Ze(e,t){l(1,arguments);var r=t||{};var n=r.additionalDigits==null?Ge:c(r.additionalDigits);if(n!==2&&n!==1&&n!==0){throw new RangeError("additionalDigits must be 0, 1 or 2")}if(!(typeof e==="string"||Object.prototype.toString.call(e)==="[object String]")){return new Date(NaN)}var a=$e(e);var i;if(a.date){var o=Ve(a.date,n);i=Ke(o.restDateString,o.year)}if(isNaN(i)||!i){return new Date(NaN)}var u=i.getTime();var s=0;var f;if(a.time){s=tt(a.time);if(isNaN(s)||s===null){return new Date(NaN)}}if(a.timezone){f=nt(a.timezone);if(isNaN(f)){return new Date(NaN)}}else{var d=new Date(u+s);var h=new Date(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate(),d.getUTCHours(),d.getUTCMinutes(),d.getUTCSeconds(),d.getUTCMilliseconds());h.setFullYear(d.getUTCFullYear());return h}return new Date(u+s+f)}function $e(e){var t={};var r=e.split(Ae.dateTimeDelimiter);var n;if(r.length>2){return t}if(/:/.test(r[0])){t.date=null;n=r[0]}else{t.date=r[0];n=r[1];if(Ae.timeZoneDelimiter.test(t.date)){t.date=e.split(Ae.timeZoneDelimiter)[0];n=e.substr(t.date.length,e.length)}}if(n){var a=Ae.timezone.exec(n);if(a){t.time=n.replace(a[1],"");t.timezone=a[1]}else{t.time=n}}return t}function Ve(e,t){var r=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)");var n=e.match(r);if(!n)return{year:null};var a=n[1]&&parseInt(n[1]);var i=n[2]&&parseInt(n[2]);return{year:i==null?a:i*100,restDateString:e.slice((n[1]||n[2]).length)}}function Ke(e,t){if(t===null)return null;var r=e.match(Ie);if(!r)return null;var n=!!r[4];var a=et(r[1]);var i=et(r[2])-1;var o=et(r[3]);var u=et(r[4]);var s=et(r[5])-1;if(n){if(!ft(t,u,s)){return new Date(NaN)}return at(t,u,s)}else{var f=new Date(0);if(!ut(t,i,o)||!st(t,a)){return new Date(NaN)}f.setUTCFullYear(t,i,Math.max(a,o));return f}}function et(e){return e?parseInt(e):1}function tt(e){var t=e.match(_e);if(!t)return null;var r=rt(t[1]);var n=rt(t[2]);var a=rt(t[3]);if(!ct(r,n,a)){return NaN}return r*Xe+n*Qe+a*1e3}function rt(e){return e&&parseFloat(e.replace(",","."))||0}function nt(e){if(e==="Z")return 0;var t=e.match(Je);if(!t)return 0;var r=t[1]==="+"?-1:1;var n=parseInt(t[2]);var a=t[3]&&parseInt(t[3])||0;if(!lt(n,a)){return NaN}return r*(n*Xe+a*Qe)}function at(e,t,r){var n=new Date(0);n.setUTCFullYear(e,0,4);var a=n.getUTCDay()||7;var i=(t-1)*7+r+1-a;n.setUTCDate(n.getUTCDate()+i);return n}var it=[31,null,31,30,31,30,31,31,30,31,30,31];function ot(e){return e%400===0||e%4===0&&e%100}function ut(e,t,r){return t>=0&&t<=11&&r>=1&&r<=(it[t]||(ot(e)?29:28))}function st(e,t){return t>=1&&t<=(ot(e)?366:365)}function ft(e,t,r){return t>=1&&t<=53&&r>=0&&r<=6}function ct(e,t,r){if(e===24){return t===0&&r===0}return r>=0&&r<60&&t>=0&&t<60&&e>=0&&e<25}function lt(e,t){return t>=0&&t<=59}var dt={full:"EEEE, d MMMM yyyy",long:"d MMMM yyyy",medium:"d MMM yyyy",short:"dd/MM/yyyy"};var ht={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"};var mt={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"};var vt={date:M({formats:dt,defaultWidth:"full"}),time:M({formats:ht,defaultWidth:"full"}),dateTime:M({formats:mt,defaultWidth:"full"})};var gt={code:"en-GB",formatDistance:x,formatLong:vt,formatRelative:U,localize:j,match:te,options:{weekStartsOn:1,firstWeekContainsDate:4}};var pt=["after","before","first-line","first-letter","selection"];var wt=["active","checked","disabled","empty","enabled","first-child","first-of-type","focus","hover","in-range","invalid","last-child","last-of-type","link","not","only-of-type","only-child","optional","out-of-range","read-only","read-write","required","root","target","valid","visited"];var yt=["nth-child","nth-last-child","nth-last-of-type","nth-of-type"];var bt=[{"-space-":" ","-space":" ","space-":" "},{"-dot-":".","-dot":".","dot-":"."},{"-chevron-":"> ","-chevron":"> ","chevron-":"> "},{"-hash-":"#","-hash":"#","hash-":"#"},{"-star-":"*","-star":"*","star-":"*"}];var Tt=function(e){var t=o["default"].find(yt,(function(t){return e.search(t)!==-1}));if(t){var r=e.slice(t.length+1);return":"+e.slice(0,t.length)+"("+r+")"}return e};var xt=function(e){return o["default"].reduce(bt,(function(t,r){t=!t?e:t;o["default"].forEach(o["default"].entries(r),(function(e){var r=e[0],n=e[1];var a=t.search(r);var i=new RegExp(r,"g");if(a!==-1){if(a===0){t=t.replace(r,n)}var o=t.search(r);if(o||a!==0){t=t.replace(i," "+n)}t=t.replace(/ +/," ")}}));return t}),"")};var Mt=function(e,t){var r=e;pt.forEach((function(e){return r=r.replace(new RegExp(e,"g"),"::"+e)}));wt.forEach((function(t){var n=["valid","last-child","last-of-type"];if(n.indexOf(t)===-1){r=r.replace(new RegExp(t,"g"),":"+t)}else{if(t==="valid"&&e.search("invalid")&&e.search("valid")!==e.search("invalid")-2){r=r.replace(new RegExp(t,"g"),":"+t)}else if(t!=="valid"&&n.indexOf(t)!==-1){if(e.search("nth-"+t)!==e.search(t)-4){r=r.replace(new RegExp(t,"g"),":"+t)}}}}));r=Tt(r);return""+t+r};function Ct(e,t){var r=xt(e);return Mt(r,t)}function Dt(){function e(e,t){if(t.type!=="style")return e;var r=t.options.parent;o["default"].forEach(e,(function(n,a){if(typeof n!=="string"&&typeof n==="object"){var i=Ct(a,t.selector);var u=o["default"].reduce(n,(function(e,t,r){e[o["default"].kebabCase(r)]=t;return e}),{});r.addRule(i,u,{selector:i});delete e[a]}}));return e}return{onProcessStyle:e}}var St={uiTableHeader:"ag-header",uiTableHeaderCell:"ag-header-cell"};function Pt(){function e(e,t,r){if(t.type!=="style")return e;if(t.id&&St[t.id.replace(/(-\d+)*/g,"")]&&r){var n=o["default"].reduce(o["default"].entries(t.style),(function(e,t){var r=t[0],n=t[1];e[r]=n+" !important";return e}),{});var a=r.addRule(St[t.id.replace(/(-\d+)*/g,"")],n,{selector:"."+St[t.id.replace(/(-\d+)*/g,"")]});a.id=St[t.id]}return e}return{onProcessStyle:e}}function kt(e){var t=o["default"].assign({repeat:2},e);var r=Array(t.repeat).join(":not(#\\20)");return{onProcessRule:function(e,t){var n=e.options.parent;if(t.options.increaseSpecificity===false||e.type!=="style"||n&&n.type==="keyframes"||e.selectorText.search(":not(#\\20)")!==-1)return;e.selectorText=r+e.selectorText}}}var Ut=!!window.MSInputMethodContext&&!!document.documentMode;function Nt(){return window.matchMedia("only screen and (max-width: 360px)").matches}function Et(){return window.matchMedia("only screen and (max-width: 768px)").matches}function Wt(e,t){return o["default"].find(e,o["default"].matches(t))}function Ot(e,t){return o["default"].find(e,o["default"].matches({_id:t}))}function Yt(e,t,r){return s["default"].lift((function(e,t){return Ot(e,t)||r}),e,t)}function qt(e,t){return o["default"].filter(e,o["default"].matches(t))}function zt(e,t){return o["default"].remove(e,o["default"].matches(t))}function Ht(e,t){var r=t.tags;return o["default"].some(e,(function(e){return o["default"].some(r,e)}))}function jt(e,t){var r=t.tags;return o["default"].every(e,(function(e){return o["default"].some(r,e)}))}function Rt(e,t,r){if(r===void 0){r=false}if(t.length===0){return e}var n=o["default"].partial(r?jt:Ht,t);return o["default"].filter(e,(function(t){if(n(t)){var r=t;return r.hideEmpty?Rt(e,r.content,r.contentAll).length>0:true}return false}))}function Ft(e){var t=e.readonly,r=e.disabled;return!(t||r)}function Bt(e){return Boolean(o["default"].isArray(e)?e.length:e)}function Lt(e){if(e<1e3){return e+" bytes"}else if(e<1e6){return o["default"].round(e/1e3)+"Kb"}else{return o["default"].round(e/1e6)+"Mb"}}function Xt(e,t){if(t===void 0){t="P"}return He(e,t,{locale:gt})}function Qt(e,t){if(t===void 0){t="HH:mm"}return Xt(e,t)}function Gt(e){if(Le(e)){return"Yesterday"}else if(Fe(e)){return"Today"}else if(Be(e)){return"Tomorrow"}else{return Xt(e)}}function At(e){try{return e?Gt(Ze(e).valueOf()):"-"}catch(e){return"-"}}function It(e){try{return e?Qt(Ze(e).valueOf()):"-"}catch(e){return"-"}}function _t(e){try{if(e){var t=Ze(e).valueOf();return Gt(t)+", "+Qt(t)}else{return"-"}}catch(e){return"-"}}function Jt(e,t,r){if(r){return e.label}var n=e.props;return t.length===1?n[t[0]]:o["default"](t).map((function(e){return n[e]})).compact().value().join(" ")}function Zt(e){return e}var $t={"application/zip":{icon:"fal fa-file-archive",ext:".zip"},"application/pdf":{icon:"fal fa-file-pdf",ext:".pdf"},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{icon:"fal fa-file-word",ext:".docx"},"application/msword":{icon:"fal fa-file-word",ext:".doc"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{icon:"fal fa-file-excel",ext:".xlsx"},"application/vnd.ms-excel":{icon:"fal fa-file-excel",ext:".xls"},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{icon:"fal fa-file-powerpoint",ext:".pptx"},"application/vnd.ms-powerpoint":{icon:"fal fa-file-powerpoint",ext:".ppt"},"image/jpeg":{icon:"fal fa-file-image",ext:".jpeg"},"image/png":{icon:"fal fa-file-image",ext:".png"},"image/gif":{icon:"fal fa-file-image",ext:".gif"},"image/tiff":{icon:"fal fa-file-image",ext:".tiff"},"audio/mpeg":{icon:"fal fa-file-audio",ext:".mp3"},"video/mpeg":{icon:"fal fa-file-video",ext:".mpeg"},"video/quicktime":{icon:"fal fa-file-video",ext:".mov"},"video/x-msvideo":{icon:"fal fa-file-video",ext:".avi"}};function Vt(e){if($t.hasOwnProperty(e)){return $t[e].icon}else{return"fal fa-file-alt"}}function Kt(e){if($t.hasOwnProperty(e)){return $t[e].ext}else{return""}}function er(e,t){if(t==="size"){return Lt(e.size)}else if(t==="lastModified"){return Gt(e.lastModified)}else if(t==="type"){return u["default"]("i.fal.fa-fw",{title:e.type,class:Vt(e.type)})}else{return e[t]}}function tr(e,t){return o["default"].map(qt(e,{prop:t}),(function(e){var t=e._id,r=e.name;return{guid:t,name:r,path:e.remoteUrl}}))}function rr(e,t){var r=t.id;return s["default"](tr(e,r))}function nr(e,t){return o["default"].get(e,t)}function ar(e,t){var r=t.id;var n=nr(e,r);return n?s["default"](n):s["default"]()}var ir="@media screen and (min-width:30em)";var or="@media screen and (min-width:30em) and (max-width: 60em)";var ur="@media screen and (min-width:60em)";f["default"].use(Dt(),Pt());function sr(e){return o["default"].reduce(e,(function(e,t,r){e[o["default"].kebabCase(r)]=t;return e}),{})}function fr(e,t){var r,n,a;var i=e.style,o=e.styleNS,u=e.styleM,s=e.styleL,c=e.classes,l=e.key,d=l===void 0?"unnamed":l;var h=t?t:f["default"].createStyleSheet({});var m=[];var v;if(i){v=h.addRule(d,sr(i));if(v.id)m.push(v.id)}if(o){v=h.addRule(ir,(r={},r[d]=sr(o),r));v=v.getRule(d);if(v.id)m.push(v.id)}if(u){v=h.addRule(or,(n={},n[d]=sr(u),n));v=v.getRule(d);if(v.id)m.push(v.id)}if(s){v=h.addRule(ur,(a={},a[d]=sr(s),a));v=v.getRule(d);if(v.id)m.push(v.id)}if(m.length&&!t){h.attach()}if(c){m.push(c)}return m.join(" ")}var cr=a.create({plugins:[Pt(),Dt(),kt()]});var lr=function(){function e(e){var t=this;this._classes={};this.uiSheet=cr.createStyleSheet({});o["default"].map(e,(function(e,r){t._classes[r]=fr(o["default"].assign({key:r,increaseSpecificity:true},e),t.uiSheet)}));this.uiSheet.attach()}Object.defineProperty(e.prototype,"classes",{get:function(){return this._classes},enumerable:false,configurable:true});return e}();function dr(e){return o["default"].compact(e).join(" ")}function hr(e){if(o["default"].isArray(e)){return o["default"].filter(e).length}return e}function mr(e){switch(e){case"default":return"alt";case"alt":return"default";case"altLighter":return"lighter";case"altDarker":return"darker";case"darker":return"altDarker";case"lighter":return"altLighter";case"warn":return"neutral";case"error":return"neutral";default:return"neutral"}}e.ButtonContextMapper=mr;e.ResponsiveThemeHandler=lr;e.canEdit=Ft;e.createResponsiveClass=fr;e.extractFields=Jt;e.fileExt=Kt;e.fileIcon=Vt;e.filterByProperty=qt;e.formatDate=Xt;e.formatTime=Qt;e.getFileStream=rr;e.getFileValue=er;e.getFiles=tr;e.getProp=nr;e.getPropStream=ar;e.hasChildren=hr;e.hasValue=Bt;e.humaniseByteCount=Lt;e.humaniseTimeValue=Gt;e.isIE11=Ut;e.itemsForCategory=Rt;e.joinClasses=dr;e.parseDateStr=At;e.parseDateTimeStr=_t;e.parseTimeStr=It;e.pickById=Ot;e.pickByIdStream=Yt;e.pickByProperty=Wt;e.removeByProperty=zt;e.simpleResponse=Zt;e.smallDevice=Et;e.tinyDevice=Nt;Object.defineProperty(e,"__esModule",{value:true})}));
