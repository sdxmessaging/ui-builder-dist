(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("lodash"),require("mithril"),require("mithril/stream"),require("jss")):typeof define==="function"&&define.amd?define(["exports","lodash","mithril","mithril/stream","jss"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiBuilder={},e._,e.m,e.m.stream,e.jss))})(this,(function(e,t,r,n,a){"use strict";function i(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var o=i(t);var u=i(r);var s=i(n);var f=i(a);function d(e){if(e===null||e===true||e===false){return NaN}var t=Number(e);if(isNaN(t)){return t}return t<0?Math.ceil(t):Math.floor(t)}function c(e,t){if(t.length<e){throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}}function l(e){c(1,arguments);var t=Object.prototype.toString.call(e);if(e instanceof Date||typeof e==="object"&&t==="[object Date]"){return new Date(e.getTime())}else if(typeof e==="number"||t==="[object Number]"){return new Date(e)}else{if((typeof e==="string"||t==="[object String]")&&typeof console!=="undefined"){console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");console.warn((new Error).stack)}return new Date(NaN)}}function m(e,t){c(2,arguments);var r=l(e);var n=d(t);if(isNaN(n)){return new Date(NaN)}if(!n){return r}r.setDate(r.getDate()+n);return r}function v(e,t){c(2,arguments);var r=l(e).getTime();var n=d(t);return new Date(r+n)}var h=6e4;function g(e){return e.getTime()%h}function p(e){var t=new Date(e.getTime());var r=Math.ceil(t.getTimezoneOffset());t.setSeconds(0,0);var n=r>0;var a=n?(h+g(t))%h:g(t);return r*h+a}function w(e){c(1,arguments);var t=l(e);t.setHours(0,0,0,0);return t}function y(e){c(1,arguments);var t=l(e);return!isNaN(t)}function b(e,t){c(2,arguments);var r=w(e);var n=w(t);return r.getTime()===n.getTime()}var T={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function M(e,t,r){r=r||{};var n;if(typeof T[e]==="string"){n=T[e]}else if(t===1){n=T[e].one}else{n=T[e].other.replace("{{count}}",t)}if(r.addSuffix){if(r.comparison>0){return"in "+n}else{return n+" ago"}}return n}function C(e){return function(t){var r=t||{};var n=r.width?String(r.width):e.defaultWidth;var a=e.formats[n]||e.formats[e.defaultWidth];return a}}var x={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"};var D={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"};var S={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"};var P={date:C({formats:x,defaultWidth:"full"}),time:C({formats:D,defaultWidth:"full"}),dateTime:C({formats:S,defaultWidth:"full"})};var U={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function k(e,t,r,n){return U[e]}function N(e){return function(t,r){var n=r||{};var a=n.context?String(n.context):"standalone";var i;if(a==="formatting"&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth;var u=n.width?String(n.width):o;i=e.formattingValues[u]||e.formattingValues[o]}else{var s=e.defaultWidth;var f=n.width?String(n.width):e.defaultWidth;i=e.values[f]||e.values[s]}var d=e.argumentCallback?e.argumentCallback(t):t;return i[d]}}var W={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]};var E={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]};var O={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]};var Y={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]};var z={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}};var q={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}};function j(e,t){var r=Number(e);var n=r%100;if(n>20||n<10){switch(n%10){case 1:return r+"st";case 2:return r+"nd";case 3:return r+"rd"}}return r+"th"}var H={ordinalNumber:j,era:N({values:W,defaultWidth:"wide"}),quarter:N({values:E,defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:N({values:O,defaultWidth:"wide"}),day:N({values:Y,defaultWidth:"wide"}),dayPeriod:N({values:z,defaultWidth:"wide",formattingValues:q,defaultFormattingWidth:"wide"})};function F(e){return function(t,r){var n=String(t);var a=r||{};var i=n.match(e.matchPattern);if(!i){return null}var o=i[0];var u=n.match(e.parsePattern);if(!u){return null}var s=e.valueCallback?e.valueCallback(u[0]):u[0];s=a.valueCallback?a.valueCallback(s):s;return{value:s,rest:n.slice(o.length)}}}function B(e){return function(t,r){var n=String(t);var a=r||{};var i=a.width;var o=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth];var u=n.match(o);if(!u){return null}var s=u[0];var f=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];var d;if(Object.prototype.toString.call(f)==="[object Array]"){d=L(f,(function(e){return e.test(s)}))}else{d=R(f,(function(e){return e.test(s)}))}d=e.valueCallback?e.valueCallback(d):d;d=a.valueCallback?a.valueCallback(d):d;return{value:d,rest:n.slice(s.length)}}}function R(e,t){for(var r in e){if(e.hasOwnProperty(r)&&t(e[r])){return r}}}function L(e,t){for(var r=0;r<e.length;r++){if(t(e[r])){return r}}}var X=/^(\d+)(th|st|nd|rd)?/i;var Q=/\d+/i;var G={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i};var A={any:[/^b/i,/^(a|c)/i]};var I={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i};var _={any:[/1/i,/2/i,/3/i,/4/i]};var J={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i};var Z={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]};var $={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i};var V={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]};var K={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i};var ee={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}};var te={ordinalNumber:F({matchPattern:X,parsePattern:Q,valueCallback:function(e){return parseInt(e,10)}}),era:B({matchPatterns:G,defaultMatchWidth:"wide",parsePatterns:A,defaultParseWidth:"any"}),quarter:B({matchPatterns:I,defaultMatchWidth:"wide",parsePatterns:_,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:B({matchPatterns:J,defaultMatchWidth:"wide",parsePatterns:Z,defaultParseWidth:"any"}),day:B({matchPatterns:$,defaultMatchWidth:"wide",parsePatterns:V,defaultParseWidth:"any"}),dayPeriod:B({matchPatterns:K,defaultMatchWidth:"any",parsePatterns:ee,defaultParseWidth:"any"})};var re={code:"en-US",formatDistance:M,formatLong:P,formatRelative:k,localize:H,match:te,options:{weekStartsOn:0,firstWeekContainsDate:1}};function ne(e,t){c(2,arguments);var r=d(t);return v(e,-r)}function ae(e,t){var r=e<0?"-":"";var n=Math.abs(e).toString();while(n.length<t){n="0"+n}return r+n}var ie={y:function(e,t){var r=e.getUTCFullYear();var n=r>0?r:1-r;return ae(t==="yy"?n%100:n,t.length)},M:function(e,t){var r=e.getUTCMonth();return t==="M"?String(r+1):ae(r+1,2)},d:function(e,t){return ae(e.getUTCDate(),t.length)},a:function(e,t){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":case"aaa":return r.toUpperCase();case"aaaaa":return r[0];case"aaaa":default:return r==="am"?"a.m.":"p.m."}},h:function(e,t){return ae(e.getUTCHours()%12||12,t.length)},H:function(e,t){return ae(e.getUTCHours(),t.length)},m:function(e,t){return ae(e.getUTCMinutes(),t.length)},s:function(e,t){return ae(e.getUTCSeconds(),t.length)},S:function(e,t){var r=t.length;var n=e.getUTCMilliseconds();var a=Math.floor(n*Math.pow(10,r-3));return ae(a,t.length)}};var oe=864e5;function ue(e){c(1,arguments);var t=l(e);var r=t.getTime();t.setUTCMonth(0,1);t.setUTCHours(0,0,0,0);var n=t.getTime();var a=r-n;return Math.floor(a/oe)+1}function se(e){c(1,arguments);var t=1;var r=l(e);var n=r.getUTCDay();var a=(n<t?7:0)+n-t;r.setUTCDate(r.getUTCDate()-a);r.setUTCHours(0,0,0,0);return r}function fe(e){c(1,arguments);var t=l(e);var r=t.getUTCFullYear();var n=new Date(0);n.setUTCFullYear(r+1,0,4);n.setUTCHours(0,0,0,0);var a=se(n);var i=new Date(0);i.setUTCFullYear(r,0,4);i.setUTCHours(0,0,0,0);var o=se(i);if(t.getTime()>=a.getTime()){return r+1}else if(t.getTime()>=o.getTime()){return r}else{return r-1}}function de(e){c(1,arguments);var t=fe(e);var r=new Date(0);r.setUTCFullYear(t,0,4);r.setUTCHours(0,0,0,0);var n=se(r);return n}var ce=6048e5;function le(e){c(1,arguments);var t=l(e);var r=se(t).getTime()-de(t).getTime();return Math.round(r/ce)+1}function me(e,t){c(1,arguments);var r=t||{};var n=r.locale;var a=n&&n.options&&n.options.weekStartsOn;var i=a==null?0:d(a);var o=r.weekStartsOn==null?i:d(r.weekStartsOn);if(!(o>=0&&o<=6)){throw new RangeError("weekStartsOn must be between 0 and 6 inclusively")}var u=l(e);var s=u.getUTCDay();var f=(s<o?7:0)+s-o;u.setUTCDate(u.getUTCDate()-f);u.setUTCHours(0,0,0,0);return u}function ve(e,t){c(1,arguments);var r=l(e,t);var n=r.getUTCFullYear();var a=t||{};var i=a.locale;var o=i&&i.options&&i.options.firstWeekContainsDate;var u=o==null?1:d(o);var s=a.firstWeekContainsDate==null?u:d(a.firstWeekContainsDate);if(!(s>=1&&s<=7)){throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively")}var f=new Date(0);f.setUTCFullYear(n+1,0,s);f.setUTCHours(0,0,0,0);var m=me(f,t);var v=new Date(0);v.setUTCFullYear(n,0,s);v.setUTCHours(0,0,0,0);var h=me(v,t);if(r.getTime()>=m.getTime()){return n+1}else if(r.getTime()>=h.getTime()){return n}else{return n-1}}function he(e,t){c(1,arguments);var r=t||{};var n=r.locale;var a=n&&n.options&&n.options.firstWeekContainsDate;var i=a==null?1:d(a);var o=r.firstWeekContainsDate==null?i:d(r.firstWeekContainsDate);var u=ve(e,t);var s=new Date(0);s.setUTCFullYear(u,0,o);s.setUTCHours(0,0,0,0);var f=me(s,t);return f}var ge=6048e5;function pe(e,t){c(1,arguments);var r=l(e);var n=me(r,t).getTime()-he(r,t).getTime();return Math.round(n/ge)+1}var we={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"};var ye={G:function(e,t,r){var n=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return r.era(n,{width:"abbreviated"});case"GGGGG":return r.era(n,{width:"narrow"});case"GGGG":default:return r.era(n,{width:"wide"})}},y:function(e,t,r){if(t==="yo"){var n=e.getUTCFullYear();var a=n>0?n:1-n;return r.ordinalNumber(a,{unit:"year"})}return ie.y(e,t)},Y:function(e,t,r,n){var a=ve(e,n);var i=a>0?a:1-a;if(t==="YY"){var o=i%100;return ae(o,2)}if(t==="Yo"){return r.ordinalNumber(i,{unit:"year"})}return ae(i,t.length)},R:function(e,t){var r=fe(e);return ae(r,t.length)},u:function(e,t){var r=e.getUTCFullYear();return ae(r,t.length)},Q:function(e,t,r){var n=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(n);case"QQ":return ae(n,2);case"Qo":return r.ordinalNumber(n,{unit:"quarter"});case"QQQ":return r.quarter(n,{width:"abbreviated",context:"formatting"});case"QQQQQ":return r.quarter(n,{width:"narrow",context:"formatting"});case"QQQQ":default:return r.quarter(n,{width:"wide",context:"formatting"})}},q:function(e,t,r){var n=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(n);case"qq":return ae(n,2);case"qo":return r.ordinalNumber(n,{unit:"quarter"});case"qqq":return r.quarter(n,{width:"abbreviated",context:"standalone"});case"qqqqq":return r.quarter(n,{width:"narrow",context:"standalone"});case"qqqq":default:return r.quarter(n,{width:"wide",context:"standalone"})}},M:function(e,t,r){var n=e.getUTCMonth();switch(t){case"M":case"MM":return ie.M(e,t);case"Mo":return r.ordinalNumber(n+1,{unit:"month"});case"MMM":return r.month(n,{width:"abbreviated",context:"formatting"});case"MMMMM":return r.month(n,{width:"narrow",context:"formatting"});case"MMMM":default:return r.month(n,{width:"wide",context:"formatting"})}},L:function(e,t,r){var n=e.getUTCMonth();switch(t){case"L":return String(n+1);case"LL":return ae(n+1,2);case"Lo":return r.ordinalNumber(n+1,{unit:"month"});case"LLL":return r.month(n,{width:"abbreviated",context:"standalone"});case"LLLLL":return r.month(n,{width:"narrow",context:"standalone"});case"LLLL":default:return r.month(n,{width:"wide",context:"standalone"})}},w:function(e,t,r,n){var a=pe(e,n);if(t==="wo"){return r.ordinalNumber(a,{unit:"week"})}return ae(a,t.length)},I:function(e,t,r){var n=le(e);if(t==="Io"){return r.ordinalNumber(n,{unit:"week"})}return ae(n,t.length)},d:function(e,t,r){if(t==="do"){return r.ordinalNumber(e.getUTCDate(),{unit:"date"})}return ie.d(e,t)},D:function(e,t,r){var n=ue(e);if(t==="Do"){return r.ordinalNumber(n,{unit:"dayOfYear"})}return ae(n,t.length)},E:function(e,t,r){var n=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return r.day(n,{width:"abbreviated",context:"formatting"});case"EEEEE":return r.day(n,{width:"narrow",context:"formatting"});case"EEEEEE":return r.day(n,{width:"short",context:"formatting"});case"EEEE":default:return r.day(n,{width:"wide",context:"formatting"})}},e:function(e,t,r,n){var a=e.getUTCDay();var i=(a-n.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return ae(i,2);case"eo":return r.ordinalNumber(i,{unit:"day"});case"eee":return r.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return r.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return r.day(a,{width:"short",context:"formatting"});case"eeee":default:return r.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,r,n){var a=e.getUTCDay();var i=(a-n.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return ae(i,t.length);case"co":return r.ordinalNumber(i,{unit:"day"});case"ccc":return r.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return r.day(a,{width:"narrow",context:"standalone"});case"cccccc":return r.day(a,{width:"short",context:"standalone"});case"cccc":default:return r.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,r){var n=e.getUTCDay();var a=n===0?7:n;switch(t){case"i":return String(a);case"ii":return ae(a,t.length);case"io":return r.ordinalNumber(a,{unit:"day"});case"iii":return r.day(n,{width:"abbreviated",context:"formatting"});case"iiiii":return r.day(n,{width:"narrow",context:"formatting"});case"iiiiii":return r.day(n,{width:"short",context:"formatting"});case"iiii":default:return r.day(n,{width:"wide",context:"formatting"})}},a:function(e,t,r){var n=e.getUTCHours();var a=n/12>=1?"pm":"am";switch(t){case"a":case"aa":case"aaa":return r.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaaaa":return r.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return r.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,r){var n=e.getUTCHours();var a;if(n===12){a=we.noon}else if(n===0){a=we.midnight}else{a=n/12>=1?"pm":"am"}switch(t){case"b":case"bb":case"bbb":return r.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbbbb":return r.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return r.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(e,t,r){var n=e.getUTCHours();var a;if(n>=17){a=we.evening}else if(n>=12){a=we.afternoon}else if(n>=4){a=we.morning}else{a=we.night}switch(t){case"B":case"BB":case"BBB":return r.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return r.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return r.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(e,t,r){if(t==="ho"){var n=e.getUTCHours()%12;if(n===0)n=12;return r.ordinalNumber(n,{unit:"hour"})}return ie.h(e,t)},H:function(e,t,r){if(t==="Ho"){return r.ordinalNumber(e.getUTCHours(),{unit:"hour"})}return ie.H(e,t)},K:function(e,t,r){var n=e.getUTCHours()%12;if(t==="Ko"){return r.ordinalNumber(n,{unit:"hour"})}return ae(n,t.length)},k:function(e,t,r){var n=e.getUTCHours();if(n===0)n=24;if(t==="ko"){return r.ordinalNumber(n,{unit:"hour"})}return ae(n,t.length)},m:function(e,t,r){if(t==="mo"){return r.ordinalNumber(e.getUTCMinutes(),{unit:"minute"})}return ie.m(e,t)},s:function(e,t,r){if(t==="so"){return r.ordinalNumber(e.getUTCSeconds(),{unit:"second"})}return ie.s(e,t)},S:function(e,t){return ie.S(e,t)},X:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();if(i===0){return"Z"}switch(t){case"X":return Te(i);case"XXXX":case"XX":return Me(i);case"XXXXX":case"XXX":default:return Me(i,":")}},x:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();switch(t){case"x":return Te(i);case"xxxx":case"xx":return Me(i);case"xxxxx":case"xxx":default:return Me(i,":")}},O:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+be(i,":");case"OOOO":default:return"GMT"+Me(i,":")}},z:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+be(i,":");case"zzzz":default:return"GMT"+Me(i,":")}},t:function(e,t,r,n){var a=n._originalDate||e;var i=Math.floor(a.getTime()/1e3);return ae(i,t.length)},T:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTime();return ae(i,t.length)}};function be(e,t){var r=e>0?"-":"+";var n=Math.abs(e);var a=Math.floor(n/60);var i=n%60;if(i===0){return r+String(a)}var o=t||"";return r+String(a)+o+ae(i,2)}function Te(e,t){if(e%60===0){var r=e>0?"-":"+";return r+ae(Math.abs(e)/60,2)}return Me(e,t)}function Me(e,t){var r=t||"";var n=e>0?"-":"+";var a=Math.abs(e);var i=ae(Math.floor(a/60),2);var o=ae(a%60,2);return n+i+r+o}function Ce(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function xe(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}function De(e,t){var r=e.match(/(P+)(p+)?/);var n=r[1];var a=r[2];if(!a){return Ce(e,t)}var i;switch(n){case"P":i=t.dateTime({width:"short"});break;case"PP":i=t.dateTime({width:"medium"});break;case"PPP":i=t.dateTime({width:"long"});break;case"PPPP":default:i=t.dateTime({width:"full"});break}return i.replace("{{date}}",Ce(n,t)).replace("{{time}}",xe(a,t))}var Se={p:xe,P:De};var Pe=["D","DD"];var Ue=["YY","YYYY"];function ke(e){return Pe.indexOf(e)!==-1}function Ne(e){return Ue.indexOf(e)!==-1}function We(e,t,r){if(e==="YYYY"){throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(r,"`; see: https://git.io/fxCyr"))}else if(e==="YY"){throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(r,"`; see: https://git.io/fxCyr"))}else if(e==="D"){throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(r,"`; see: https://git.io/fxCyr"))}else if(e==="DD"){throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(r,"`; see: https://git.io/fxCyr"))}}var Ee=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;var Oe=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;var Ye=/^'([^]*?)'?$/;var ze=/''/g;var qe=/[a-zA-Z]/;function je(e,t,r){c(2,arguments);var n=String(t);var a=r||{};var i=a.locale||re;var o=i.options&&i.options.firstWeekContainsDate;var u=o==null?1:d(o);var s=a.firstWeekContainsDate==null?u:d(a.firstWeekContainsDate);if(!(s>=1&&s<=7)){throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively")}var f=i.options&&i.options.weekStartsOn;var m=f==null?0:d(f);var v=a.weekStartsOn==null?m:d(a.weekStartsOn);if(!(v>=0&&v<=6)){throw new RangeError("weekStartsOn must be between 0 and 6 inclusively")}if(!i.localize){throw new RangeError("locale must contain localize property")}if(!i.formatLong){throw new RangeError("locale must contain formatLong property")}var h=l(e);if(!y(h)){throw new RangeError("Invalid time value")}var g=p(h);var w=ne(h,g);var b={firstWeekContainsDate:s,weekStartsOn:v,locale:i,_originalDate:h};var T=n.match(Oe).map((function(e){var t=e[0];if(t==="p"||t==="P"){var r=Se[t];return r(e,i.formatLong,b)}return e})).join("").match(Ee).map((function(r){if(r==="''"){return"'"}var n=r[0];if(n==="'"){return He(r)}var o=ye[n];if(o){if(!a.useAdditionalWeekYearTokens&&Ne(r)){We(r,t,e)}if(!a.useAdditionalDayOfYearTokens&&ke(r)){We(r,t,e)}return o(w,r,i.localize,b)}if(n.match(qe)){throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`")}return r})).join("");return T}function He(e){return e.match(Ye)[1].replace(ze,"'")}function Fe(e,t){c(2,arguments);var r=d(t);return m(e,-r)}function Be(e){c(1,arguments);return b(e,Date.now())}function Re(e){c(1,arguments);return b(e,m(Date.now(),1))}function Le(e){c(1,arguments);return b(e,Fe(Date.now(),1))}var Xe=36e5;var Qe=6e4;var Ge=2;var Ae={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/};var Ie=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;var _e=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;var Je=/^([+-])(\d{2})(?::?(\d{2}))?$/;function Ze(e,t){c(1,arguments);var r=t||{};var n=r.additionalDigits==null?Ge:d(r.additionalDigits);if(n!==2&&n!==1&&n!==0){throw new RangeError("additionalDigits must be 0, 1 or 2")}if(!(typeof e==="string"||Object.prototype.toString.call(e)==="[object String]")){return new Date(NaN)}var a=$e(e);var i;if(a.date){var o=Ve(a.date,n);i=Ke(o.restDateString,o.year)}if(isNaN(i)||!i){return new Date(NaN)}var u=i.getTime();var s=0;var f;if(a.time){s=tt(a.time);if(isNaN(s)||s===null){return new Date(NaN)}}if(a.timezone){f=nt(a.timezone);if(isNaN(f)){return new Date(NaN)}}else{var l=new Date(u+s);var m=new Date(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate(),l.getUTCHours(),l.getUTCMinutes(),l.getUTCSeconds(),l.getUTCMilliseconds());m.setFullYear(l.getUTCFullYear());return m}return new Date(u+s+f)}function $e(e){var t={};var r=e.split(Ae.dateTimeDelimiter);var n;if(r.length>2){return t}if(/:/.test(r[0])){t.date=null;n=r[0]}else{t.date=r[0];n=r[1];if(Ae.timeZoneDelimiter.test(t.date)){t.date=e.split(Ae.timeZoneDelimiter)[0];n=e.substr(t.date.length,e.length)}}if(n){var a=Ae.timezone.exec(n);if(a){t.time=n.replace(a[1],"");t.timezone=a[1]}else{t.time=n}}return t}function Ve(e,t){var r=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)");var n=e.match(r);if(!n)return{year:null};var a=n[1]&&parseInt(n[1]);var i=n[2]&&parseInt(n[2]);return{year:i==null?a:i*100,restDateString:e.slice((n[1]||n[2]).length)}}function Ke(e,t){if(t===null)return null;var r=e.match(Ie);if(!r)return null;var n=!!r[4];var a=et(r[1]);var i=et(r[2])-1;var o=et(r[3]);var u=et(r[4]);var s=et(r[5])-1;if(n){if(!ft(t,u,s)){return new Date(NaN)}return at(t,u,s)}else{var f=new Date(0);if(!ut(t,i,o)||!st(t,a)){return new Date(NaN)}f.setUTCFullYear(t,i,Math.max(a,o));return f}}function et(e){return e?parseInt(e):1}function tt(e){var t=e.match(_e);if(!t)return null;var r=rt(t[1]);var n=rt(t[2]);var a=rt(t[3]);if(!dt(r,n,a)){return NaN}return r*Xe+n*Qe+a*1e3}function rt(e){return e&&parseFloat(e.replace(",","."))||0}function nt(e){if(e==="Z")return 0;var t=e.match(Je);if(!t)return 0;var r=t[1]==="+"?-1:1;var n=parseInt(t[2]);var a=t[3]&&parseInt(t[3])||0;if(!ct(n,a)){return NaN}return r*(n*Xe+a*Qe)}function at(e,t,r){var n=new Date(0);n.setUTCFullYear(e,0,4);var a=n.getUTCDay()||7;var i=(t-1)*7+r+1-a;n.setUTCDate(n.getUTCDate()+i);return n}var it=[31,null,31,30,31,30,31,31,30,31,30,31];function ot(e){return e%400===0||e%4===0&&e%100}function ut(e,t,r){return t>=0&&t<=11&&r>=1&&r<=(it[t]||(ot(e)?29:28))}function st(e,t){return t>=1&&t<=(ot(e)?366:365)}function ft(e,t,r){return t>=1&&t<=53&&r>=0&&r<=6}function dt(e,t,r){if(e===24){return t===0&&r===0}return r>=0&&r<60&&t>=0&&t<60&&e>=0&&e<25}function ct(e,t){return t>=0&&t<=59}var lt={full:"EEEE, d MMMM yyyy",long:"d MMMM yyyy",medium:"d MMM yyyy",short:"dd/MM/yyyy"};var mt={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"};var vt={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"};var ht={date:C({formats:lt,defaultWidth:"full"}),time:C({formats:mt,defaultWidth:"full"}),dateTime:C({formats:vt,defaultWidth:"full"})};var gt={code:"en-GB",formatDistance:M,formatLong:ht,formatRelative:k,localize:H,match:te,options:{weekStartsOn:1,firstWeekContainsDate:4}};var pt=!!window.MSInputMethodContext&&!!document.documentMode;function wt(){return window.matchMedia("only screen and (max-width: 360px)").matches}function yt(){return window.matchMedia("only screen and (max-width: 768px)").matches}function bt(e,t){return o["default"].find(e,o["default"].matches(t))}function Tt(e,t){return o["default"].find(e,o["default"].matches({_id:t}))}function Mt(e,t,r){return s["default"].lift((function(e,t){return Tt(e,t)||r}),e,t)}function Ct(e,t){return o["default"].filter(e,o["default"].matches(t))}function xt(e,t){return o["default"].remove(e,o["default"].matches(t))}function Dt(e,t){var r=t.tags;return o["default"].some(e,(function(e){return o["default"].some(r,e)}))}function St(e,t){var r=t.tags;return o["default"].every(e,(function(e){return o["default"].some(r,e)}))}function Pt(e,t,r){if(r===void 0){r=false}if(t.length===0){return e}var n=o["default"].partial(r?St:Dt,t);return o["default"].filter(e,n)}function Ut(e){var t=e.readonly,r=e.disabled;return!(t||r)}function kt(e){return Boolean(o["default"].isArray(e)?e.length:e)}function Nt(e){if(e<1e3){return e+" bytes"}else if(e<1e6){return o["default"].round(e/1e3)+"Kb"}else{return o["default"].round(e/1e6)+"Mb"}}function Wt(e,t){if(t===void 0){t="P"}return je(e,t,{locale:gt})}function Et(e,t){if(t===void 0){t="HH:mm"}return Wt(e,t)}function Ot(e){if(Le(e)){return"Yesterday"}else if(Be(e)){return"Today"}else if(Re(e)){return"Tomorrow"}else{return Wt(e)}}function Yt(e){try{return e?Ot(Ze(e).valueOf()):"-"}catch(e){return"-"}}function zt(e){try{return e?Et(Ze(e).valueOf()):"-"}catch(e){return"-"}}function qt(e){try{if(e){var t=Ze(e).valueOf();return Ot(t)+", "+Et(t)}else{return"-"}}catch(e){return"-"}}function jt(e,t){if(e.modelId==="category"){return e.label}var r=e.props;return t.length===1?r[t[0]]:o["default"](t).map((function(e){return r[e]})).compact().value().join(" ")}function Ht(e){return e}var Ft={"application/zip":"fa-file-archive","application/pdf":"fa-file-pdf","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"fa-file-word","application/msword":"fa-file-word","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"fa-file-excel","application/vnd.ms-excel":"fa-file-excel","application/vnd.openxmlformats-officedocument.presentationml.presentation":"fa-file-powerpoint","application/vnd.ms-powerpoint":"fa-file-powerpoint","image/jpeg":"fa-file-image","image/png":"fa-file-image","image/gif":"fa-file-image","image/tiff":"fa-file-image","audio/mpeg":"fa-file-audio","video/mpeg":"fa-file-video","video/quicktime":"fa-file-video","video/x-msvideo":"fa-file-video"};function Bt(e){if(Ft.hasOwnProperty(e)){return Ft[e]}else{return"fa-file-alt"}}var Rt={"application/zip":".zip","application/pdf":".pdf","application/vnd.openxmlformats-officedocument.wordprocessingml.document":".docx","application/msword":".doc","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":".xlsx","application/vnd.ms-excel":".xls","application/vnd.openxmlformats-officedocument.presentationml.presentation":".pptx","application/vnd.ms-powerpoint":".ppt","image/jpeg":"jpeg","image/png":".png","image/gif":".gif","image/tiff":".tiff","audio/mpeg":".mp3","video/mpeg":".mpeg","video/quicktime":".mov","video/x-msvideo":".avi"};function Lt(e){if(Rt.hasOwnProperty(e)){return Rt[e]}else{return""}}function Xt(e,t){if(t==="size"){return Nt(e.size)}else if(t==="lastModified"){return Ot(e.lastModified)}else if(t==="type"){return u["default"]("i.fal.fa-fw",{title:e.type,class:Bt(e.type)})}else{return e[t]}}function Qt(e,t){return o["default"].map(Ct(e,{prop:t}),(function(e){var t=e._id,r=e.name;return{guid:t,name:r,path:e.remoteUrl}}))}function Gt(e,t){var r=t.id;return s["default"](Qt(e,r))}function At(e,t){return o["default"].get(e,t)}function It(e,t){var r=t.id;var n=At(e,r);return n?s["default"](n):s["default"]()}var _t="@media screen and (min-width:30em)";var Jt="@media screen and (min-width:30em) and (max-width: 60em)";var Zt="@media screen and (min-width:60em)";function $t(e){var t=o["default"].assign({repeat:2},e);var r=Array(t.repeat+1).join(":not(#\\20)");return{onProcessRule:function(e,t){var n=e.options.parent;if(t.options.increaseSpecificity===false||e.type!=="style"||n&&n.type==="keyframes")return;e.selectorText=r+e.selectorText}}}f["default"].use($t());function Vt(e){return o["default"].reduce(e,(function(e,t,r){e[o["default"].kebabCase(r)]=t;return e}),{})}function Kt(e,t){var r,n,a;var i=e.style,u=e.styleNS,s=e.styleM,d=e.styleL,c=e.classes,l=e.key,m=l===void 0?"unnamed":l;if(t===void 0){t=f["default"].createStyleSheet({})}var v=[];var h;if(i){h=t.addRule(m,Vt(i));if(h.id)v.push(h.id)}if(u){h=t.addRule(_t,(r={},r[m]=o["default"].assign(Vt(u)),r));h=h.getRule(m);if(h.id)v.push(h.id)}if(s){h=t.addRule(Jt,(n={},n[m]=o["default"].assign(Vt(s)),n));h=h.getRule(m);if(h.id)v.push(h.id)}if(d){h=t.addRule(Zt,(a={},a[m]=o["default"].assign(Vt(d)),a));h=h.getRule(m);if(h.id)v.push(h.id)}if(v.length){t.attach()}if(c){v.push(c)}return v.join(" ")}var er=function(){function e(e){var t=this;this._classes={};this.uiSheet=f["default"].createStyleSheet({});o["default"].map(e,(function(e,r){t._classes[r]=Kt(o["default"].assign({key:r},e),t.uiSheet)}))}Object.defineProperty(e.prototype,"classes",{get:function(){return this._classes},enumerable:false,configurable:true});return e}();function tr(e){return o["default"].compact(e).join(" ")}e.ResponsiveThemeHandler=er;e.canEdit=Ut;e.createResponsiveClass=Kt;e.extractFields=jt;e.fileExt=Lt;e.fileIcon=Bt;e.filterByProperty=Ct;e.formatDate=Wt;e.formatTime=Et;e.getFileStream=Gt;e.getFileValue=Xt;e.getFiles=Qt;e.getProp=At;e.getPropStream=It;e.hasValue=kt;e.humaniseByteCount=Nt;e.humaniseTimeValue=Ot;e.isIE11=pt;e.itemsForCategory=Pt;e.joinClasses=tr;e.parseDateStr=Yt;e.parseDateTimeStr=qt;e.parseTimeStr=zt;e.pickById=Tt;e.pickByIdStream=Mt;e.pickByProperty=bt;e.removeByProperty=xt;e.simpleResponse=Ht;e.smallDevice=yt;e.tinyDevice=wt;Object.defineProperty(e,"__esModule",{value:true})}));
