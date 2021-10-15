/* @preserve built on: 2021-10-15T09:13:43.971Z */
(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("jss"),require("lodash"),require("mithril"),require("mithril/stream"),require("luxon"),require("@sdxmessaging/ui-widgets")):typeof define==="function"&&define.amd?define(["exports","jss","lodash","mithril","mithril/stream","luxon","@sdxmessaging/ui-widgets"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiBuilder={},e.jss,e._,e.m,e.m.stream,e.luxon,e.uiWidgets))})(this,(function(e,t,n,a,r,i,u){"use strict";function l(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var s=l(t);var o=l(n);var f=l(a);var c=l(r);const d={uiTableHeader:"ag-header",uiTableHeaderCell:"ag-header-cell",uiTableHeaderIcon:"ag-icon",uiTableHeaderCellContainer:"ag-cell-label-container"};function p(){function e(e,t,n){if(t.type!=="style")return e;if(t.id&&d[t.id.replace(/(-\d+)*/g,"")]&&n){const e=o["default"].reduce(o["default"].entries(t.style),((e,[t,n])=>{e[t]=n+" !important";return e}),{});const a=n.addRule(d[t.id.replace(/(-\d+)*/g,"")],e,{selector:"."+d[t.id.replace(/(-\d+)*/g,"")]});a.id=d[t.id]}return e}return{onProcessStyle:e}}function m(e){const t=o["default"].assign({repeat:2},e);const n=Array(t.repeat).join(":not(#\\20)");return{onProcessRule:(e,t)=>{const a=e.options.parent;if(t.options.increaseSpecificity===false||e.type!=="style"||a&&a.type==="keyframes"||e.selectorText.search(":not(#\\20)")!==-1)return;e.selectorText=n+e.selectorText}}}const h=["after","before","first-line","first-letter","selection","placeholder"];const y=["active","checked","disabled","empty","enabled","first-child","first-of-type","focus","hover","in-range","invalid","last-child","last-of-type","link","not","only-of-type","only-child","optional","out-of-range","read-only","read-write","required","root","target","valid","visited"];const g=["nth-child","nth-last-child","nth-last-of-type","nth-of-type"];const x=[{"-space-":" ","-space":" ","space-":" ",space:" "},{"-dot-":".","-dot":".","dot-":".",dot:"."},{"-dash-":"-","-dash":"-","dash-":"-",dash:"-"},{"-chevron-":" > ","-chevron":" > ","chevron-":" > ",chevron:" > "},{"-hash-":"#","-hash":"#","hash-":"#",hash:"#"},{"-star-":"*","-star":"*","star-":"*",star:"*"},{"-colon-":":","-colon":":","colon-":":",colon:":"},{"-equals-":"=","-equals":"=","equals-":"=",equals:"="},{"-sbo-":"[","-sbo":"[","sbo-":"[",sbo:"["},{"-sbc-":"]","-sbc":"]","sbc-":"]",sbc:"]"}];const v=e=>{const t=o["default"].find(g,(t=>e.search(t)!==-1));if(t){const n=e.slice(t.length+1);return`:${e.slice(0,t.length)}(${n})`}return e};const w=e=>o["default"].reduce(x,((t,n)=>{t=!t?e:t;o["default"].forEach(o["default"].entries(n),(([e,n])=>{const a=t.search(e);const r=new RegExp(e,"g");if(a!==-1){if(a===0){t=t.replace(e,n)}const i=t.search(e);if(i||a!==0){t=t.replace(r,n)}t=t.replace(/ +/," ")}}));return t}),"");const b=(e,t)=>{let n=e;h.forEach((e=>n=n.replace(new RegExp(e,"g"),"::"+e)));y.forEach((t=>{const a=["valid","last-child","last-of-type"];if(a.indexOf(t)===-1){n=n.replace(new RegExp(t,"g"),":"+t)}else{if(t==="valid"&&e.search("invalid")&&e.search("valid")!==e.search("invalid")-2){n=n.replace(new RegExp(t,"g"),":"+t)}else if(t!=="valid"&&a.indexOf(t)!==-1){if(e.search("nth-"+t)!==e.search(t)-4){n=n.replace(new RegExp(t,"g"),":"+t)}}}}));n=v(n);return`${t}${n}`};function S(e,t){const n=w(e);return b(n,t)}function I(){function e(e,t){if(t.type!=="style")return e;const n=t.options.parent;o["default"].forEach(e,((a,r)=>{if(typeof a!=="string"&&typeof a==="object"){const i=S(r,t.selector);const u=o["default"].reduce(a,((e,t,n)=>{e[o["default"].kebabCase(n)]=t;return e}),{});n.addRule(i,u,{selector:i});delete e[r]}}));return e}return{onProcessStyle:e}}const j="@media screen and (min-width:30em)";const k="@media screen and (min-width:30em) and (max-width: 60em)";const M="@media screen and (min-width:60em)";s["default"].use(I(),p());const T=s["default"].createStyleSheet({});function B(e){return o["default"].mapKeys(e,((e,t)=>o["default"].kebabCase(t)))}function P(e,t){if(t){e.push(t)}}function F(e,t,n){if(n){const a=e.addRule(t,B(n));return a.id}else{return""}}function O(e,t,n,a){if(a){const r=e.addRule(n,{[t]:B(a)});return r.getRule(t).id}else{return""}}function C(e,t,n){if(n){const a=e.update(t,B(n));return a.id}else{return""}}function D(e,t,n){if(n){const a=e.update(t,B(n));return a.getRule(t).id}else{return""}}function R({style:e,styleNS:t,styleM:n,styleL:a,classes:r,key:i="unnamed"},u){const l=u?u:T;const s=[];const o=Boolean(i!=="unnamed"&&l.getRule(i));if(o){P(s,C(l,i,e));P(s,D(l,i,t));P(s,D(l,i,n));P(s,D(l,i,a))}else{P(s,F(l,i,e));P(s,O(l,i,j,t));P(s,O(l,i,k,n));P(s,O(l,i,M,a))}if(s.length&&!u){l.attach()}P(s,r);return s.join(" ")}const E=t.create({plugins:[p(),I(),m()]});class A{constructor(e){this._classes={};this.uiSheet=E.createStyleSheet({});this.applyTheme=e;this.createClasses()}get classes(){return this._classes}createClasses(){o["default"].each(this.applyTheme,((e,t)=>{this._classes[t]=R(o["default"].assign({key:t,increaseSpecificity:true},e),this.uiSheet)}));this.uiSheet.attach()}update(e){if(!o["default"].isEqual(this.applyTheme,e)){this.applyTheme=e;this.uiSheet.detach();this.createClasses()}}}function $(e){return o["default"].compact(e).join(" ")}function q(e){switch(e){case"default":return"alt";case"alt":return"default";case"altLighter":return"lighter";case"altDarker":return"darker";case"darker":return"altDarker";case"lighter":return"altLighter";case"warn":return"neutral";case"error":return"neutral";default:return"neutral"}}function N(e){return i.DateTime.fromISO(e).valueOf()}function H(e,t="D"){const n=i.DateTime.fromMillis(e);return n.isValid?n.toFormat(t,{locale:"en-GB"}):"-"}function L(e,t="HH:mm"){return H(e,t)}function U(){return i.DateTime.now().toISODate()}function z(e){const t=i.DateTime.now().startOf("day");const n=i.DateTime.fromMillis(e).startOf("day").diff(t,"day").get("days");switch(n){case-1:return"Yesterday";case 0:return"Today";case 1:return"Tomorrow";default:return H(e)}}function V(e){try{return e?z(N(e)):"-"}catch(e){return"-"}}function _(e){try{return e?L(N(e)):"-"}catch(e){return"-"}}function Y(e){try{if(e){const t=N(e);return`${z(t)}, ${L(t)}`}else{return"-"}}catch(e){return"-"}}function W(e){try{return e?z(e):"-"}catch(e){return"-"}}function K(e){try{return e?L(e):"-"}catch(e){return"-"}}function Z(e){try{if(e){return`${z(e)}, ${L(e)}`}else{return"-, -"}}catch(e){return"-, -"}}function G(){return window.matchMedia("only screen and (max-width: 360px)").matches}function J(){return window.matchMedia("only screen and (max-width: 768px)").matches}function Q(e,t){return o["default"].find(e,o["default"].matches(t))}function X(e,t){return o["default"].find(e,o["default"].matches({_id:t}))}function ee(e,t,n){return c["default"].lift(((e,t)=>X(e,t)||n),e,t)}function te(e,t){return o["default"].filter(e,o["default"].matches(t))}function ne(e,t){return o["default"].remove(e,o["default"].matches(t))}function ae(e,{tags:t}){return o["default"].some(e,(e=>o["default"].some(t,e)))}function re(e,{tags:t}){return o["default"].every(e,(e=>o["default"].some(t,e)))}function ie(e,t,n=false){if(t.length===0){return e}const a=o["default"].partial(n?re:ae,t);return o["default"].filter(e,(t=>{if(a(t)){const n=t;return n.hideEmpty?ie(e,n.content,n.contentAll).length>0:true}return false}))}function ue({readonly:e,disabled:t}){return!(e||t)}function le(e){return Boolean(o["default"].isArray(e)?e.length:e)}function se(e){const t={};e.forEach(((e,n)=>t[n]=e));return t}function oe(e,t){o["default"].forEach(t,((t,n)=>e.set(n,t)))}function fe(e){if(e<1e3){return`${e} bytes`}else if(e<1e6){return`${o["default"].round(e/1e3)}Kb`}else{return`${o["default"].round(e/1e6)}Mb`}}function ce(e,t,n){if(n){return e.label}const{props:a}=e;return t.length===1?a[t[0]]:o["default"](t).map((e=>a[e])).compact().value().join(" ")}function de(e){return e}const pe={"application/zip":{icon:"fal fa-file-archive",ext:".zip"},"application/pdf":{icon:"fal fa-file-pdf",ext:".pdf"},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{icon:"fal fa-file-word",ext:".docx"},"application/msword":{icon:"fal fa-file-word",ext:".doc"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{icon:"fal fa-file-excel",ext:".xlsx"},"application/vnd.ms-excel":{icon:"fal fa-file-excel",ext:".xls"},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{icon:"fal fa-file-powerpoint",ext:".pptx"},"application/vnd.ms-powerpoint":{icon:"fal fa-file-powerpoint",ext:".ppt"},"image/jpeg":{icon:"fal fa-file-image",ext:".jpeg"},"image/png":{icon:"fal fa-file-image",ext:".png"},"image/gif":{icon:"fal fa-file-image",ext:".gif"},"image/tiff":{icon:"fal fa-file-image",ext:".tiff"},"audio/mpeg":{icon:"fal fa-file-audio",ext:".mp3"},"video/mpeg":{icon:"fal fa-file-video",ext:".mpeg"},"video/quicktime":{icon:"fal fa-file-video",ext:".mov"},"video/x-msvideo":{icon:"fal fa-file-video",ext:".avi"}};function me(e){if(pe.hasOwnProperty(e)){return pe[e].icon}else{return"fal fa-file-alt"}}function he(e){if(pe.hasOwnProperty(e)){return pe[e].ext}else{return""}}function ye(e,t){if(t==="size"){return fe(e.size)}else if(t==="lastModified"){return Z(e.lastModified)}else if(t==="type"){return f["default"]("i.fal.fa-fw",{title:e.type,class:me(e.type)})}else{return e[t]}}function ge(e,t){return o["default"].map(te(e,{prop:t}),(e=>{const{_id:t,name:n}=e;return{guid:t,name:n,path:e.remoteUrl}}))}function xe(e,{id:t}){return c["default"](ge(e,t))}function ve(e,t){return o["default"].get(e,t)}function we(e,t){const n=e();n.push(t);e(n)}function be(e,t){const n=e();const a=o["default"].pullAt(n,t);e(n);return a}function Se(e,{id:t}){const n=ve(e,t);return n?c["default"](n):c["default"]()}function Ie(e,t){if(t){if(typeof e!=="object"||typeof e!==typeof t||o["default"].isArray(e)!==o["default"].isArray(t)){throw new Error("deepMerge only supports arrays and objects and cannot merge objects of different types.")}const n=o["default"].isArray(e)?[]:{};const a=o["default"].uniq([...o["default"].keys(e),...o["default"].keys(t)]);return o["default"].reduce(a,((n,a)=>{if(a in t&&!o["default"].isUndefined(t[a])){if(typeof e[a]==="object"){n[a]=Ie(e[a]||{},t[a])}else{n[a]=t[a]}}else{n[a]=e[a]}return n}),n)}return e}const je={};function ke(e,t){if(e in je){throw new Error(`Component ${e} is already registered`)}else{je[e]=t}}function Me({type:e,data:t,style:n,styleNS:a,styleM:r,styleL:i,classes:u}){const l=R({style:n,styleNS:a,styleM:r,styleL:i,classes:u});if(e in je){return f["default"](je[e],{type:e,data:t,classes:l})}else{return f["default"]("span",`Unknown component type: ${e}`)}}function Te(e){return o["default"].map(e,(e=>Me(e)))}const Be={["label"]:u.Label,["trusted"]:u.TextareaInput,["hidden"]:u.BaseInput,["text"]:u.BaseInput,["password"]:u.PasswordInput,["search"]:u.BaseInput,["date"]:u.BaseInput,["time"]:u.BaseInput,["datetime-local"]:u.BaseInput,["dateInput"]:u.DateInput,["cardDate"]:u.CardDateInput,["number"]:u.BaseInput,["range"]:u.BaseInput,["email"]:u.BaseInput,["url"]:u.BaseInput,["tel"]:u.BaseInput,["color"]:u.BaseInput,["currency"]:u.CurrencyInput,["textarea"]:u.TextareaInput,["checkbox"]:u.CheckboxInput,["toggle"]:u.ToggleInput,["select"]:u.SelectInput,["radio"]:u.RadioInput};const Pe={["fileMulti"]:u.FileMulti,["file"]:u.FileSelect,["imageMulti"]:u.ImageMulti,["image"]:u.ImageSelect,["sign"]:u.SignBuilder};const Fe={};o["default"].forEach(Be,((e,t)=>Fe[t]=1));o["default"].forEach(Pe,((e,t)=>Fe[t]=2));function Oe(e){if(Pe.hasOwnProperty(e)){return Pe[e]}else{return Pe["file"]}}function Ce(e){if(Be.hasOwnProperty(e)){return Be[e]}else{return Be["text"]}}function De(e,t){if(e===2){return Oe(t)}else if(e===1){return Ce(t)}else{return undefined}}function Re(e="text"){return Fe[e]||3}const Ee=/\s*\d{2}\/\d{2}\/\d{4}\s*$/;const Ae=/\s*(([gG][iI][rR]\s*0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?\d\d?)|(([a-pr-uwyzA-PR-UWYZ]\d[a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]\d[abehmnprv-yABEHMNPRV-Y])))\s*\d[abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))\s*$/;const $e={default:e=>e,"date-format":e=>e.map((e=>e?H(Number(e)):"")),"dateStr-format":e=>e.map((e=>e?H(new Date(String(e)).valueOf()):"")),"date-format-month":e=>e.map((e=>e?H(Number(e),"dd MMMM yyyy"):"")),"date-endofday":e=>e.map((e=>e?i.DateTime.fromISO(e,{setZone:true}).endOf("day").toISO():"")),upper:e=>e.map((e=>String(e).toUpperCase())),lower:e=>e.map((e=>String(e).toLowerCase())),snake:e=>e.map((e=>o["default"].snakeCase(String(e)))),trunc:e=>e.map((e=>o["default"].truncate(String(e),{length:15}))),"remove-whitespace":e=>e.map((e=>e?o["default"].replace(String(e),/\s/g,""):"")),boolean:e=>e.map((e=>Boolean(e))),strLength:e=>e.map((e=>e?String(e).length>0:false)),"strLength-6":e=>e.map((e=>e?String(e).length===6:false)),"test-dob":e=>e.map((e=>e?Ee.test(String(e)):false)),"test-postcode":e=>e.map((e=>e?Ae.test(String(e)):false))};function qe(e,t){if($e.hasOwnProperty(e)){return $e[e](t)}else{return $e["default"](t)}}function Ne(e,t){if(!$e.hasOwnProperty(e)){$e[e]=t}}const He={default:e=>e.map((e=>o["default"].map(e,(({name:e})=>e)).join())),"file-name":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.name:"")).join())),"file-type":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.type:"")).join())),"file-size":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.size:"")).join())),"file-lastmodified":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.lastModified:"")).join())),path:e=>e.map((e=>o["default"].map(e,(({path:e})=>e)).join())),dataUrl:e=>e.map((e=>o["default"].map(e,(({dataUrl:e})=>e?e:"")).join()))};function Le(e,t){if(He.hasOwnProperty(e)){return He[e](t)}else{return He["default"](t)}}function Ue(e,t){if(!He.hasOwnProperty(e)){He[e]=t}}const ze={default:e=>c["default"].merge(e).map((e=>e.join())),"join-space":e=>c["default"].merge(e).map((e=>e.join(" "))),"join-newline":e=>c["default"].merge(e).map((e=>e.join("\n"))),"join-underscore":e=>c["default"].merge(e).map((e=>e.join("_"))),sum:e=>c["default"].merge(e).map((e=>o["default"].reduce(e,((e,t)=>{const n=Number.parseInt(String(t));return o["default"].isNaN(n)?e:e+n}),0))),product:e=>c["default"].merge(e).map((e=>o["default"].reduce(e,((e,t)=>{const n=Number.parseInt(String(t));return o["default"].isNaN(n)?0:e*n}),1))),and:e=>c["default"].merge(e).map((e=>o["default"].reduce(e,((e,t)=>e?t:0),true))),or:e=>c["default"].merge(e).map((e=>o["default"].reduce(e,((e,t)=>e||t?t:e),0)))};function Ve(e,t){if(ze.hasOwnProperty(e)){return ze[e](t)}else{return ze["default"](t)}}function _e(e,t){if(!ze.hasOwnProperty(e)){ze[e]=t}}function Ye(e,t){return o["default"].map(o["default"].compact(o["default"].at(e,t)),(({value:e})=>e))}function We(e,t,n){return o["default"].max(o["default"].map(t,(t=>{const a=o["default"].find(n,o["default"].matches({key:t}));return a&&a.computed?We(e+1,a.computed.keys,n):e})))||0}function Ke(e){return o["default"].sortBy(e,(t=>We(0,t.computed.keys,e)))}function Ze(e){const t=o["default"].groupBy(e,(e=>"computed"in e&&e.computed?"c":"b"));const{["b"]:n,["c"]:a}=t;const r={};o["default"].reduce(n,((e,{key:t,fileValue:n,input:a,initialValue:r})=>{const i=a?Re(a.type):3;if(i===1){const n=c["default"]();if(r!=null){n(r)}e[t]={type:i,value:n}}else if(i===2){const a=c["default"]([]);e[t]={type:i,value:Le(n||"default",a),files:a}}return e}),r);const i=Ke(a);o["default"].reduce(i,((e,{key:t,computed:{keys:n,map:a="default",merge:r="default"}})=>{let i;if(n.length>1){const t=Ye(e,n);i=Ve(r,t)}else if(n.length===1){i=Ye(e,n)[0]}if(i){e[t]={type:1,value:qe(a,i)}}return e}),r);return{fields:o["default"](e).filter((e=>"input"in e)).map((({key:e,group:t,input:n,data:a,user:i,fieldSet:u})=>{const l=r[e];const s=l.type;return{key:e,group:t,input:n,type:s,data:a,user:i,fieldSet:u,widget:De(s,n.type||"text"),value:l.value,files:l.type===2?l.files:undefined}})).value(),streamMap:r}}function Ge(e,t){return t?o["default"].assign({},e,t):e}function Je({type:e,input:t,widget:n,value:a,files:r},i){if(e===2&&t&&n&&r){return f["default"](n,{field:Ge(t,i),value:r})}else if(e===1&&t&&n&&a){return f["default"](n,{field:Ge(t,i),value:a})}return null}function Qe(e,t){return o["default"].map(e,(e=>Je(e,t)))}function Xe(e){return e.type===1}const et=new Set(["checkbox","toggle","select","radio"]);function tt(e){var t;return Xe(e)&&((t=e.input)===null||t===void 0?void 0:t.type)&&!et.has(e.input.type)}function nt(e){return e.type===2}function at(e){var t;return nt(e)&&((t=e.input)===null||t===void 0?void 0:t.type)==="sign"}function rt(e){return o["default"].reduce(e.fields,((e,t)=>{const{key:n,value:a}=t;if(Xe(t)&&a&&a()!=null){e[n]=a()}return e}),{})}function it(e,t){o["default"].forEach(t,((t,n)=>{if(n in e.streamMap){e.streamMap[n].value(t)}}))}e.ButtonContextMapper=q;e.ResponsiveThemeHandler=A;e.applyFileMap=Le;e.applyMap=qe;e.applyMerge=Ve;e.assembleFormField=Je;e.assembleFormFieldList=Qe;e.buildComponent=Me;e.buildComponentList=Te;e.buildFormFields=Ze;e.canEdit=ue;e.createResponsiveClass=R;e.deepMerge=Ie;e.deserialise=it;e.extractFields=ce;e.fileExt=he;e.fileIcon=me;e.filterByProperty=te;e.formatDate=H;e.formatTime=L;e.getFileStream=xe;e.getFileValue=ye;e.getFiles=ge;e.getISODate=U;e.getProp=ve;e.getPropStream=Se;e.hasValue=le;e.humaniseByteCount=fe;e.humaniseTimeValue=z;e.isFileField=nt;e.isPropField=Xe;e.isSignField=at;e.isTextField=tt;e.itemsForCategory=ie;e.joinClasses=$;e.mapToObject=se;e.parseDateStr=V;e.parseDateTimeStr=Y;e.parseDateTimeValue=Z;e.parseDateValue=W;e.parseIso=N;e.parseTimeStr=_;e.parseTimeValue=K;e.pickById=X;e.pickByIdStream=ee;e.pickByProperty=Q;e.registerComponent=ke;e.registerFileMapFn=Ue;e.registerMapFn=Ne;e.registerMergeFn=_e;e.removeByProperty=ne;e.serialise=rt;e.setMap=oe;e.simpleResponse=de;e.smallDevice=J;e.streamArrayPullAt=be;e.streamArrayPush=we;e.tinyDevice=G;Object.defineProperty(e,"__esModule",{value:true})}));
