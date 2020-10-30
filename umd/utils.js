(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("lodash"),require("mithril"),require("mithril/stream")):typeof define==="function"&&define.amd?define(["exports","lodash","mithril","mithril/stream"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiBuilder={},e._,e.m,e.m.stream))})(this,(function(e,t,r,n){"use strict";function a(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var i=a(t);var o=a(r);var u=a(n);function s(e){if(e===null||e===true||e===false){return NaN}var t=Number(e);if(isNaN(t)){return t}return t<0?Math.ceil(t):Math.floor(t)}function f(e,t){if(t.length<e){throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}}function c(e){f(1,arguments);var t=Object.prototype.toString.call(e);if(e instanceof Date||typeof e==="object"&&t==="[object Date]"){return new Date(e.getTime())}else if(typeof e==="number"||t==="[object Number]"){return new Date(e)}else{if((typeof e==="string"||t==="[object String]")&&typeof console!=="undefined"){console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");console.warn((new Error).stack)}return new Date(NaN)}}function d(e,t){f(2,arguments);var r=c(e);var n=s(t);if(isNaN(n)){return new Date(NaN)}if(!n){return r}r.setDate(r.getDate()+n);return r}function l(e,t){f(2,arguments);var r=c(e).getTime();var n=s(t);return new Date(r+n)}var m=6e4;function h(e){return e.getTime()%m}function v(e){var t=new Date(e.getTime());var r=Math.ceil(t.getTimezoneOffset());t.setSeconds(0,0);var n=r>0;var a=n?(m+h(t))%m:h(t);return r*m+a}function g(e){f(1,arguments);var t=c(e);t.setHours(0,0,0,0);return t}function w(e){f(1,arguments);var t=c(e);return!isNaN(t)}function p(e,t){f(2,arguments);var r=g(e);var n=g(t);return r.getTime()===n.getTime()}var y={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function b(e,t,r){r=r||{};var n;if(typeof y[e]==="string"){n=y[e]}else if(t===1){n=y[e].one}else{n=y[e].other.replace("{{count}}",t)}if(r.addSuffix){if(r.comparison>0){return"in "+n}else{return n+" ago"}}return n}function T(e){return function(t){var r=t||{};var n=r.width?String(r.width):e.defaultWidth;var a=e.formats[n]||e.formats[e.defaultWidth];return a}}var M={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"};var x={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"};var C={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"};var D={date:T({formats:M,defaultWidth:"full"}),time:T({formats:x,defaultWidth:"full"}),dateTime:T({formats:C,defaultWidth:"full"})};var P={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function U(e,t,r,n){return P[e]}function S(e){return function(t,r){var n=r||{};var a=n.context?String(n.context):"standalone";var i;if(a==="formatting"&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth;var u=n.width?String(n.width):o;i=e.formattingValues[u]||e.formattingValues[o]}else{var s=e.defaultWidth;var f=n.width?String(n.width):e.defaultWidth;i=e.values[f]||e.values[s]}var c=e.argumentCallback?e.argumentCallback(t):t;return i[c]}}var k={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]};var N={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]};var W={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]};var E={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]};var Y={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}};var O={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}};function q(e,t){var r=Number(e);var n=r%100;if(n>20||n<10){switch(n%10){case 1:return r+"st";case 2:return r+"nd";case 3:return r+"rd"}}return r+"th"}var z={ordinalNumber:q,era:S({values:k,defaultWidth:"wide"}),quarter:S({values:N,defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:S({values:W,defaultWidth:"wide"}),day:S({values:E,defaultWidth:"wide"}),dayPeriod:S({values:Y,defaultWidth:"wide",formattingValues:O,defaultFormattingWidth:"wide"})};function H(e){return function(t,r){var n=String(t);var a=r||{};var i=n.match(e.matchPattern);if(!i){return null}var o=i[0];var u=n.match(e.parsePattern);if(!u){return null}var s=e.valueCallback?e.valueCallback(u[0]):u[0];s=a.valueCallback?a.valueCallback(s):s;return{value:s,rest:n.slice(o.length)}}}function F(e){return function(t,r){var n=String(t);var a=r||{};var i=a.width;var o=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth];var u=n.match(o);if(!u){return null}var s=u[0];var f=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];var c;if(Object.prototype.toString.call(f)==="[object Array]"){c=B(f,(function(e){return e.test(s)}))}else{c=j(f,(function(e){return e.test(s)}))}c=e.valueCallback?e.valueCallback(c):c;c=a.valueCallback?a.valueCallback(c):c;return{value:c,rest:n.slice(s.length)}}}function j(e,t){for(var r in e){if(e.hasOwnProperty(r)&&t(e[r])){return r}}}function B(e,t){for(var r=0;r<e.length;r++){if(t(e[r])){return r}}}var L=/^(\d+)(th|st|nd|rd)?/i;var X=/\d+/i;var R={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i};var Q={any:[/^b/i,/^(a|c)/i]};var G={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i};var A={any:[/1/i,/2/i,/3/i,/4/i]};var I={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i};var _={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]};var J={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i};var Z={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]};var $={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i};var V={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}};var K={ordinalNumber:H({matchPattern:L,parsePattern:X,valueCallback:function(e){return parseInt(e,10)}}),era:F({matchPatterns:R,defaultMatchWidth:"wide",parsePatterns:Q,defaultParseWidth:"any"}),quarter:F({matchPatterns:G,defaultMatchWidth:"wide",parsePatterns:A,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:F({matchPatterns:I,defaultMatchWidth:"wide",parsePatterns:_,defaultParseWidth:"any"}),day:F({matchPatterns:J,defaultMatchWidth:"wide",parsePatterns:Z,defaultParseWidth:"any"}),dayPeriod:F({matchPatterns:$,defaultMatchWidth:"any",parsePatterns:V,defaultParseWidth:"any"})};var ee={code:"en-US",formatDistance:b,formatLong:D,formatRelative:U,localize:z,match:K,options:{weekStartsOn:0,firstWeekContainsDate:1}};function te(e,t){f(2,arguments);var r=s(t);return l(e,-r)}function re(e,t){var r=e<0?"-":"";var n=Math.abs(e).toString();while(n.length<t){n="0"+n}return r+n}var ne={y:function(e,t){var r=e.getUTCFullYear();var n=r>0?r:1-r;return re(t==="yy"?n%100:n,t.length)},M:function(e,t){var r=e.getUTCMonth();return t==="M"?String(r+1):re(r+1,2)},d:function(e,t){return re(e.getUTCDate(),t.length)},a:function(e,t){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":case"aaa":return r.toUpperCase();case"aaaaa":return r[0];case"aaaa":default:return r==="am"?"a.m.":"p.m."}},h:function(e,t){return re(e.getUTCHours()%12||12,t.length)},H:function(e,t){return re(e.getUTCHours(),t.length)},m:function(e,t){return re(e.getUTCMinutes(),t.length)},s:function(e,t){return re(e.getUTCSeconds(),t.length)},S:function(e,t){var r=t.length;var n=e.getUTCMilliseconds();var a=Math.floor(n*Math.pow(10,r-3));return re(a,t.length)}};var ae=864e5;function ie(e){f(1,arguments);var t=c(e);var r=t.getTime();t.setUTCMonth(0,1);t.setUTCHours(0,0,0,0);var n=t.getTime();var a=r-n;return Math.floor(a/ae)+1}function oe(e){f(1,arguments);var t=1;var r=c(e);var n=r.getUTCDay();var a=(n<t?7:0)+n-t;r.setUTCDate(r.getUTCDate()-a);r.setUTCHours(0,0,0,0);return r}function ue(e){f(1,arguments);var t=c(e);var r=t.getUTCFullYear();var n=new Date(0);n.setUTCFullYear(r+1,0,4);n.setUTCHours(0,0,0,0);var a=oe(n);var i=new Date(0);i.setUTCFullYear(r,0,4);i.setUTCHours(0,0,0,0);var o=oe(i);if(t.getTime()>=a.getTime()){return r+1}else if(t.getTime()>=o.getTime()){return r}else{return r-1}}function se(e){f(1,arguments);var t=ue(e);var r=new Date(0);r.setUTCFullYear(t,0,4);r.setUTCHours(0,0,0,0);var n=oe(r);return n}var fe=6048e5;function ce(e){f(1,arguments);var t=c(e);var r=oe(t).getTime()-se(t).getTime();return Math.round(r/fe)+1}function de(e,t){f(1,arguments);var r=t||{};var n=r.locale;var a=n&&n.options&&n.options.weekStartsOn;var i=a==null?0:s(a);var o=r.weekStartsOn==null?i:s(r.weekStartsOn);if(!(o>=0&&o<=6)){throw new RangeError("weekStartsOn must be between 0 and 6 inclusively")}var u=c(e);var d=u.getUTCDay();var l=(d<o?7:0)+d-o;u.setUTCDate(u.getUTCDate()-l);u.setUTCHours(0,0,0,0);return u}function le(e,t){f(1,arguments);var r=c(e,t);var n=r.getUTCFullYear();var a=t||{};var i=a.locale;var o=i&&i.options&&i.options.firstWeekContainsDate;var u=o==null?1:s(o);var d=a.firstWeekContainsDate==null?u:s(a.firstWeekContainsDate);if(!(d>=1&&d<=7)){throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively")}var l=new Date(0);l.setUTCFullYear(n+1,0,d);l.setUTCHours(0,0,0,0);var m=de(l,t);var h=new Date(0);h.setUTCFullYear(n,0,d);h.setUTCHours(0,0,0,0);var v=de(h,t);if(r.getTime()>=m.getTime()){return n+1}else if(r.getTime()>=v.getTime()){return n}else{return n-1}}function me(e,t){f(1,arguments);var r=t||{};var n=r.locale;var a=n&&n.options&&n.options.firstWeekContainsDate;var i=a==null?1:s(a);var o=r.firstWeekContainsDate==null?i:s(r.firstWeekContainsDate);var u=le(e,t);var c=new Date(0);c.setUTCFullYear(u,0,o);c.setUTCHours(0,0,0,0);var d=de(c,t);return d}var he=6048e5;function ve(e,t){f(1,arguments);var r=c(e);var n=de(r,t).getTime()-me(r,t).getTime();return Math.round(n/he)+1}var ge={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"};var we={G:function(e,t,r){var n=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return r.era(n,{width:"abbreviated"});case"GGGGG":return r.era(n,{width:"narrow"});case"GGGG":default:return r.era(n,{width:"wide"})}},y:function(e,t,r){if(t==="yo"){var n=e.getUTCFullYear();var a=n>0?n:1-n;return r.ordinalNumber(a,{unit:"year"})}return ne.y(e,t)},Y:function(e,t,r,n){var a=le(e,n);var i=a>0?a:1-a;if(t==="YY"){var o=i%100;return re(o,2)}if(t==="Yo"){return r.ordinalNumber(i,{unit:"year"})}return re(i,t.length)},R:function(e,t){var r=ue(e);return re(r,t.length)},u:function(e,t){var r=e.getUTCFullYear();return re(r,t.length)},Q:function(e,t,r){var n=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(n);case"QQ":return re(n,2);case"Qo":return r.ordinalNumber(n,{unit:"quarter"});case"QQQ":return r.quarter(n,{width:"abbreviated",context:"formatting"});case"QQQQQ":return r.quarter(n,{width:"narrow",context:"formatting"});case"QQQQ":default:return r.quarter(n,{width:"wide",context:"formatting"})}},q:function(e,t,r){var n=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(n);case"qq":return re(n,2);case"qo":return r.ordinalNumber(n,{unit:"quarter"});case"qqq":return r.quarter(n,{width:"abbreviated",context:"standalone"});case"qqqqq":return r.quarter(n,{width:"narrow",context:"standalone"});case"qqqq":default:return r.quarter(n,{width:"wide",context:"standalone"})}},M:function(e,t,r){var n=e.getUTCMonth();switch(t){case"M":case"MM":return ne.M(e,t);case"Mo":return r.ordinalNumber(n+1,{unit:"month"});case"MMM":return r.month(n,{width:"abbreviated",context:"formatting"});case"MMMMM":return r.month(n,{width:"narrow",context:"formatting"});case"MMMM":default:return r.month(n,{width:"wide",context:"formatting"})}},L:function(e,t,r){var n=e.getUTCMonth();switch(t){case"L":return String(n+1);case"LL":return re(n+1,2);case"Lo":return r.ordinalNumber(n+1,{unit:"month"});case"LLL":return r.month(n,{width:"abbreviated",context:"standalone"});case"LLLLL":return r.month(n,{width:"narrow",context:"standalone"});case"LLLL":default:return r.month(n,{width:"wide",context:"standalone"})}},w:function(e,t,r,n){var a=ve(e,n);if(t==="wo"){return r.ordinalNumber(a,{unit:"week"})}return re(a,t.length)},I:function(e,t,r){var n=ce(e);if(t==="Io"){return r.ordinalNumber(n,{unit:"week"})}return re(n,t.length)},d:function(e,t,r){if(t==="do"){return r.ordinalNumber(e.getUTCDate(),{unit:"date"})}return ne.d(e,t)},D:function(e,t,r){var n=ie(e);if(t==="Do"){return r.ordinalNumber(n,{unit:"dayOfYear"})}return re(n,t.length)},E:function(e,t,r){var n=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return r.day(n,{width:"abbreviated",context:"formatting"});case"EEEEE":return r.day(n,{width:"narrow",context:"formatting"});case"EEEEEE":return r.day(n,{width:"short",context:"formatting"});case"EEEE":default:return r.day(n,{width:"wide",context:"formatting"})}},e:function(e,t,r,n){var a=e.getUTCDay();var i=(a-n.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return re(i,2);case"eo":return r.ordinalNumber(i,{unit:"day"});case"eee":return r.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return r.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return r.day(a,{width:"short",context:"formatting"});case"eeee":default:return r.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,r,n){var a=e.getUTCDay();var i=(a-n.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return re(i,t.length);case"co":return r.ordinalNumber(i,{unit:"day"});case"ccc":return r.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return r.day(a,{width:"narrow",context:"standalone"});case"cccccc":return r.day(a,{width:"short",context:"standalone"});case"cccc":default:return r.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,r){var n=e.getUTCDay();var a=n===0?7:n;switch(t){case"i":return String(a);case"ii":return re(a,t.length);case"io":return r.ordinalNumber(a,{unit:"day"});case"iii":return r.day(n,{width:"abbreviated",context:"formatting"});case"iiiii":return r.day(n,{width:"narrow",context:"formatting"});case"iiiiii":return r.day(n,{width:"short",context:"formatting"});case"iiii":default:return r.day(n,{width:"wide",context:"formatting"})}},a:function(e,t,r){var n=e.getUTCHours();var a=n/12>=1?"pm":"am";switch(t){case"a":case"aa":case"aaa":return r.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaaaa":return r.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return r.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,r){var n=e.getUTCHours();var a;if(n===12){a=ge.noon}else if(n===0){a=ge.midnight}else{a=n/12>=1?"pm":"am"}switch(t){case"b":case"bb":case"bbb":return r.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbbbb":return r.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return r.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(e,t,r){var n=e.getUTCHours();var a;if(n>=17){a=ge.evening}else if(n>=12){a=ge.afternoon}else if(n>=4){a=ge.morning}else{a=ge.night}switch(t){case"B":case"BB":case"BBB":return r.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return r.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return r.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(e,t,r){if(t==="ho"){var n=e.getUTCHours()%12;if(n===0)n=12;return r.ordinalNumber(n,{unit:"hour"})}return ne.h(e,t)},H:function(e,t,r){if(t==="Ho"){return r.ordinalNumber(e.getUTCHours(),{unit:"hour"})}return ne.H(e,t)},K:function(e,t,r){var n=e.getUTCHours()%12;if(t==="Ko"){return r.ordinalNumber(n,{unit:"hour"})}return re(n,t.length)},k:function(e,t,r){var n=e.getUTCHours();if(n===0)n=24;if(t==="ko"){return r.ordinalNumber(n,{unit:"hour"})}return re(n,t.length)},m:function(e,t,r){if(t==="mo"){return r.ordinalNumber(e.getUTCMinutes(),{unit:"minute"})}return ne.m(e,t)},s:function(e,t,r){if(t==="so"){return r.ordinalNumber(e.getUTCSeconds(),{unit:"second"})}return ne.s(e,t)},S:function(e,t){return ne.S(e,t)},X:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();if(i===0){return"Z"}switch(t){case"X":return ye(i);case"XXXX":case"XX":return be(i);case"XXXXX":case"XXX":default:return be(i,":")}},x:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();switch(t){case"x":return ye(i);case"xxxx":case"xx":return be(i);case"xxxxx":case"xxx":default:return be(i,":")}},O:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+pe(i,":");case"OOOO":default:return"GMT"+be(i,":")}},z:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+pe(i,":");case"zzzz":default:return"GMT"+be(i,":")}},t:function(e,t,r,n){var a=n._originalDate||e;var i=Math.floor(a.getTime()/1e3);return re(i,t.length)},T:function(e,t,r,n){var a=n._originalDate||e;var i=a.getTime();return re(i,t.length)}};function pe(e,t){var r=e>0?"-":"+";var n=Math.abs(e);var a=Math.floor(n/60);var i=n%60;if(i===0){return r+String(a)}var o=t||"";return r+String(a)+o+re(i,2)}function ye(e,t){if(e%60===0){var r=e>0?"-":"+";return r+re(Math.abs(e)/60,2)}return be(e,t)}function be(e,t){var r=t||"";var n=e>0?"-":"+";var a=Math.abs(e);var i=re(Math.floor(a/60),2);var o=re(a%60,2);return n+i+r+o}function Te(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function Me(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}function xe(e,t){var r=e.match(/(P+)(p+)?/);var n=r[1];var a=r[2];if(!a){return Te(e,t)}var i;switch(n){case"P":i=t.dateTime({width:"short"});break;case"PP":i=t.dateTime({width:"medium"});break;case"PPP":i=t.dateTime({width:"long"});break;case"PPPP":default:i=t.dateTime({width:"full"});break}return i.replace("{{date}}",Te(n,t)).replace("{{time}}",Me(a,t))}var Ce={p:Me,P:xe};var De=["D","DD"];var Pe=["YY","YYYY"];function Ue(e){return De.indexOf(e)!==-1}function Se(e){return Pe.indexOf(e)!==-1}function ke(e,t,r){if(e==="YYYY"){throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(r,"`; see: https://git.io/fxCyr"))}else if(e==="YY"){throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(r,"`; see: https://git.io/fxCyr"))}else if(e==="D"){throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(r,"`; see: https://git.io/fxCyr"))}else if(e==="DD"){throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(r,"`; see: https://git.io/fxCyr"))}}var Ne=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;var We=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;var Ee=/^'([^]*?)'?$/;var Ye=/''/g;var Oe=/[a-zA-Z]/;function qe(e,t,r){f(2,arguments);var n=String(t);var a=r||{};var i=a.locale||ee;var o=i.options&&i.options.firstWeekContainsDate;var u=o==null?1:s(o);var d=a.firstWeekContainsDate==null?u:s(a.firstWeekContainsDate);if(!(d>=1&&d<=7)){throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively")}var l=i.options&&i.options.weekStartsOn;var m=l==null?0:s(l);var h=a.weekStartsOn==null?m:s(a.weekStartsOn);if(!(h>=0&&h<=6)){throw new RangeError("weekStartsOn must be between 0 and 6 inclusively")}if(!i.localize){throw new RangeError("locale must contain localize property")}if(!i.formatLong){throw new RangeError("locale must contain formatLong property")}var g=c(e);if(!w(g)){throw new RangeError("Invalid time value")}var p=v(g);var y=te(g,p);var b={firstWeekContainsDate:d,weekStartsOn:h,locale:i,_originalDate:g};var T=n.match(We).map((function(e){var t=e[0];if(t==="p"||t==="P"){var r=Ce[t];return r(e,i.formatLong,b)}return e})).join("").match(Ne).map((function(r){if(r==="''"){return"'"}var n=r[0];if(n==="'"){return ze(r)}var o=we[n];if(o){if(!a.useAdditionalWeekYearTokens&&Se(r)){ke(r,t,e)}if(!a.useAdditionalDayOfYearTokens&&Ue(r)){ke(r,t,e)}return o(y,r,i.localize,b)}if(n.match(Oe)){throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`")}return r})).join("");return T}function ze(e){return e.match(Ee)[1].replace(Ye,"'")}function He(e,t){f(2,arguments);var r=s(t);return d(e,-r)}function Fe(e){f(1,arguments);return p(e,Date.now())}function je(e){f(1,arguments);return p(e,d(Date.now(),1))}function Be(e){f(1,arguments);return p(e,He(Date.now(),1))}var Le=36e5;var Xe=6e4;var Re=2;var Qe={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/};var Ge=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;var Ae=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;var Ie=/^([+-])(\d{2})(?::?(\d{2}))?$/;function _e(e,t){f(1,arguments);var r=t||{};var n=r.additionalDigits==null?Re:s(r.additionalDigits);if(n!==2&&n!==1&&n!==0){throw new RangeError("additionalDigits must be 0, 1 or 2")}if(!(typeof e==="string"||Object.prototype.toString.call(e)==="[object String]")){return new Date(NaN)}var a=Je(e);var i;if(a.date){var o=Ze(a.date,n);i=$e(o.restDateString,o.year)}if(isNaN(i)||!i){return new Date(NaN)}var u=i.getTime();var c=0;var d;if(a.time){c=Ke(a.time);if(isNaN(c)||c===null){return new Date(NaN)}}if(a.timezone){d=tt(a.timezone);if(isNaN(d)){return new Date(NaN)}}else{var l=new Date(u+c);var m=new Date(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate(),l.getUTCHours(),l.getUTCMinutes(),l.getUTCSeconds(),l.getUTCMilliseconds());m.setFullYear(l.getUTCFullYear());return m}return new Date(u+c+d)}function Je(e){var t={};var r=e.split(Qe.dateTimeDelimiter);var n;if(r.length>2){return t}if(/:/.test(r[0])){t.date=null;n=r[0]}else{t.date=r[0];n=r[1];if(Qe.timeZoneDelimiter.test(t.date)){t.date=e.split(Qe.timeZoneDelimiter)[0];n=e.substr(t.date.length,e.length)}}if(n){var a=Qe.timezone.exec(n);if(a){t.time=n.replace(a[1],"");t.timezone=a[1]}else{t.time=n}}return t}function Ze(e,t){var r=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)");var n=e.match(r);if(!n)return{year:null};var a=n[1]&&parseInt(n[1]);var i=n[2]&&parseInt(n[2]);return{year:i==null?a:i*100,restDateString:e.slice((n[1]||n[2]).length)}}function $e(e,t){if(t===null)return null;var r=e.match(Ge);if(!r)return null;var n=!!r[4];var a=Ve(r[1]);var i=Ve(r[2])-1;var o=Ve(r[3]);var u=Ve(r[4]);var s=Ve(r[5])-1;if(n){if(!ut(t,u,s)){return new Date(NaN)}return rt(t,u,s)}else{var f=new Date(0);if(!it(t,i,o)||!ot(t,a)){return new Date(NaN)}f.setUTCFullYear(t,i,Math.max(a,o));return f}}function Ve(e){return e?parseInt(e):1}function Ke(e){var t=e.match(Ae);if(!t)return null;var r=et(t[1]);var n=et(t[2]);var a=et(t[3]);if(!st(r,n,a)){return NaN}return r*Le+n*Xe+a*1e3}function et(e){return e&&parseFloat(e.replace(",","."))||0}function tt(e){if(e==="Z")return 0;var t=e.match(Ie);if(!t)return 0;var r=t[1]==="+"?-1:1;var n=parseInt(t[2]);var a=t[3]&&parseInt(t[3])||0;if(!ft(n,a)){return NaN}return r*(n*Le+a*Xe)}function rt(e,t,r){var n=new Date(0);n.setUTCFullYear(e,0,4);var a=n.getUTCDay()||7;var i=(t-1)*7+r+1-a;n.setUTCDate(n.getUTCDate()+i);return n}var nt=[31,null,31,30,31,30,31,31,30,31,30,31];function at(e){return e%400===0||e%4===0&&e%100}function it(e,t,r){return t>=0&&t<=11&&r>=1&&r<=(nt[t]||(at(e)?29:28))}function ot(e,t){return t>=1&&t<=(at(e)?366:365)}function ut(e,t,r){return t>=1&&t<=53&&r>=0&&r<=6}function st(e,t,r){if(e===24){return t===0&&r===0}return r>=0&&r<60&&t>=0&&t<60&&e>=0&&e<25}function ft(e,t){return t>=0&&t<=59}var ct={full:"EEEE, d MMMM yyyy",long:"d MMMM yyyy",medium:"d MMM yyyy",short:"dd/MM/yyyy"};var dt={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"};var lt={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"};var mt={date:T({formats:ct,defaultWidth:"full"}),time:T({formats:dt,defaultWidth:"full"}),dateTime:T({formats:lt,defaultWidth:"full"})};var ht={code:"en-GB",formatDistance:b,formatLong:mt,formatRelative:U,localize:z,match:K,options:{weekStartsOn:1,firstWeekContainsDate:4}};var vt;(function(e){e["error"]="error";e["warn"]="warn";e["info"]="info";e["basic"]="basic"})(vt||(vt={}));var gt;(function(e){e["center"]="center";e["top"]="top";e["topRight"]="topRight";e["topLeft"]="topLeft";e["bottom"]="bottom";e["bottomRight"]="bottomRight";e["bottomLeft"]="bottomLeft"})(gt||(gt={}));var wt;(function(e){e["notification"]="notification";e["confirm"]="confirm";e["login"]="login"})(wt||(wt={}));var pt=u["default"]();var yt=!!window.MSInputMethodContext&&!!document.documentMode;function bt(){return window.matchMedia("only screen and (max-width: 360px)").matches}function Tt(){return window.matchMedia("only screen and (max-width: 768px)").matches}function Mt(e,t){return i["default"].find(e,i["default"].matches(t))}function xt(e,t){return i["default"].find(e,i["default"].matches({_id:t}))}function Ct(e,t,r){return u["default"].lift((function(e,t){return xt(e,t)||r}),e,t)}function Dt(e,t){return i["default"].filter(e,i["default"].matches(t))}function Pt(e,t){return i["default"].remove(e,i["default"].matches(t))}function Ut(e,t){var r=t.tags;return i["default"].some(e,(function(e){return i["default"].some(r,e)}))}function St(e,t){var r=t.tags;return i["default"].every(e,(function(e){return i["default"].some(r,e)}))}function kt(e,t,r){if(r===void 0){r=false}if(t.length===0){return e}var n=i["default"].partial(r?St:Ut,t);return i["default"].filter(e,n)}function Nt(e){var t=e.readonly,r=e.disabled;return!(t||r)}function Wt(e){return Boolean(i["default"].isArray(e)?e.length:e)}function Et(e){if(e<1e3){return e+" bytes"}else if(e<1e6){return i["default"].round(e/1e3)+"Kb"}else{return i["default"].round(e/1e6)+"Mb"}}function Yt(e,t){if(t===void 0){t="P"}return qe(e,t,{locale:ht})}function Ot(e,t){if(t===void 0){t="HH:mm"}return Yt(e,t)}function qt(e){if(Be(e)){return"Yesterday"}else if(Fe(e)){return"Today"}else if(je(e)){return"Tomorrow"}else{return Yt(e)}}function zt(e){try{return e?qt(_e(e).valueOf()):"-"}catch(e){return"-"}}function Ht(e){try{return e?Ot(_e(e).valueOf()):"-"}catch(e){return"-"}}function Ft(e){try{if(e){var t=_e(e).valueOf();return qt(t)+", "+Ot(t)}else{return"-"}}catch(e){return"-"}}function jt(e,t){if(e.modelId==="category"){return e.label}var r=e.props;return t.length===1?r[t[0]]:i["default"](t).map((function(e){return r[e]})).compact().value().join(" ")}function Bt(e){return e}function Lt(e){if(e.code===440){window.location.reload()}return e}var Xt={"application/zip":"fa-file-archive","application/pdf":"fa-file-pdf","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"fa-file-word","application/msword":"fa-file-word","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"fa-file-excel","application/vnd.ms-excel":"fa-file-excel","application/vnd.openxmlformats-officedocument.presentationml.presentation":"fa-file-powerpoint","application/vnd.ms-powerpoint":"fa-file-powerpoint","image/jpeg":"fa-file-image","image/png":"fa-file-image","image/gif":"fa-file-image","image/tiff":"fa-file-image","audio/mpeg":"fa-file-audio","video/mpeg":"fa-file-video","video/quicktime":"fa-file-video","video/x-msvideo":"fa-file-video"};function Rt(e){if(Xt.hasOwnProperty(e)){return Xt[e]}else{return"fa-file-alt"}}var Qt={"application/zip":".zip","application/pdf":".pdf","application/vnd.openxmlformats-officedocument.wordprocessingml.document":".docx","application/msword":".doc","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":".xlsx","application/vnd.ms-excel":".xls","application/vnd.openxmlformats-officedocument.presentationml.presentation":".pptx","application/vnd.ms-powerpoint":".ppt","image/jpeg":"jpeg","image/png":".png","image/gif":".gif","image/tiff":".tiff","audio/mpeg":".mp3","video/mpeg":".mpeg","video/quicktime":".mov","video/x-msvideo":".avi"};function Gt(e){if(Qt.hasOwnProperty(e)){return Qt[e]}else{return""}}function At(e,t){if(t==="size"){return Et(e.size)}else if(t==="lastModified"){return qt(e.lastModified)}else if(t==="type"){return o["default"]("i.fal.fa-fw",{title:e.type,class:Rt(e.type)})}else{return e[t]}}function It(e,t){return i["default"].map(Dt(e,{prop:t}),(function(e){var t=e._id,r=e.name;return{guid:t,name:r,path:e.remoteUrl}}))}function _t(e,t){var r=t.id;return u["default"](It(e,r))}function Jt(e,t){return i["default"].get(e,t)}function Zt(e,t){var r=t.id;var n=Jt(e,r);return n?u["default"](n):u["default"]()}function $t(e){return new Promise((function(t){if(typeof e==="string"){e={url:e}}r.request(e).catch((function(r){if(r.code===440){t(pt({title:"Your session has expired!",message:"Please login again to continue",context:vt.basic,type:wt.login,login:{onSuccess:function(){return $t(e)}}}))}else{pt({message:"Error uploading your documents, please try again",context:vt.error});throw r}}))}))}e.canEdit=Nt;e.checkExpired=Lt;e.extractFields=jt;e.fileExt=Gt;e.fileIcon=Rt;e.filterByProperty=Dt;e.formatDate=Yt;e.formatTime=Ot;e.getFileStream=_t;e.getFileValue=At;e.getFiles=It;e.getProp=Jt;e.getPropStream=Zt;e.hasValue=Wt;e.humaniseByteCount=Et;e.humaniseTimeValue=qt;e.isIE11=yt;e.itemsForCategory=kt;e.parseDateStr=zt;e.parseDateTimeStr=Ft;e.parseTimeStr=Ht;e.pickById=xt;e.pickByIdStream=Ct;e.pickByProperty=Mt;e.removeByProperty=Pt;e.sdxRequest=$t;e.simpleResponse=Bt;e.smallDevice=Tt;e.tinyDevice=bt;Object.defineProperty(e,"__esModule",{value:true})}));
