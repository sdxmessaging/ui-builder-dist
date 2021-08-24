/* @preserve built on: 2021-08-24T14:16:58.968Z */
(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("jss"),require("lodash"),require("mithril"),require("mithril/stream"),require("luxon"),require("@sdxmessaging/ui-widgets")):typeof define==="function"&&define.amd?define(["exports","jss","lodash","mithril","mithril/stream","luxon","@sdxmessaging/ui-widgets"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiBuilder={},e.jss,e._,e.m,e.m.stream,e.luxon,e.uiWidgets))})(this,(function(e,t,n,a,r,i,l){"use strict";function u(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var s=u(t);var o=u(n);var f=u(a);var c=u(r);const d={uiTableHeader:"ag-header",uiTableHeaderCell:"ag-header-cell"};function p(){function e(e,t,n){if(t.type!=="style")return e;if(t.id&&d[t.id.replace(/(-\d+)*/g,"")]&&n){const e=o["default"].reduce(o["default"].entries(t.style),((e,[t,n])=>{e[t]=n+" !important";return e}),{});const a=n.addRule(d[t.id.replace(/(-\d+)*/g,"")],e,{selector:"."+d[t.id.replace(/(-\d+)*/g,"")]});a.id=d[t.id]}return e}return{onProcessStyle:e}}function m(e){const t=o["default"].assign({repeat:2},e);const n=Array(t.repeat).join(":not(#\\20)");return{onProcessRule:(e,t)=>{const a=e.options.parent;if(t.options.increaseSpecificity===false||e.type!=="style"||a&&a.type==="keyframes"||e.selectorText.search(":not(#\\20)")!==-1)return;e.selectorText=n+e.selectorText}}}const h=["after","before","first-line","first-letter","selection","placeholder"];const y=["active","checked","disabled","empty","enabled","first-child","first-of-type","focus","hover","in-range","invalid","last-child","last-of-type","link","not","only-of-type","only-child","optional","out-of-range","read-only","read-write","required","root","target","valid","visited"];const g=["nth-child","nth-last-child","nth-last-of-type","nth-of-type"];const x=[{"-space-":" ","-space":" ","space-":" ",space:" "},{"-dot-":".","-dot":".","dot-":".",dot:"."},{"-dash-":"-","-dash":"-","dash-":"-",dash:"-"},{"-chevron-":" > ","-chevron":" > ","chevron-":" > ",chevron:" > "},{"-hash-":"#","-hash":"#","hash-":"#",hash:"#"},{"-star-":"*","-star":"*","star-":"*",star:"*"},{"-colon-":":","-colon":":","colon-":":",colon:":"},{"-equals-":"=","-equals":"=","equals-":"=",equals:"="},{"-sbo-":"[","-sbo":"[","sbo-":"[",sbo:"["},{"-sbc-":"]","-sbc":"]","sbc-":"]",sbc:"]"}];const v=e=>{const t=o["default"].find(g,(t=>e.search(t)!==-1));if(t){const n=e.slice(t.length+1);return`:${e.slice(0,t.length)}(${n})`}return e};const w=e=>o["default"].reduce(x,((t,n)=>{t=!t?e:t;o["default"].forEach(o["default"].entries(n),(([e,n])=>{const a=t.search(e);const r=new RegExp(e,"g");if(a!==-1){if(a===0){t=t.replace(e,n)}const i=t.search(e);if(i||a!==0){t=t.replace(r,n)}t=t.replace(/ +/," ")}}));return t}),"");const b=(e,t)=>{let n=e;h.forEach((e=>n=n.replace(new RegExp(e,"g"),"::"+e)));y.forEach((t=>{const a=["valid","last-child","last-of-type"];if(a.indexOf(t)===-1){n=n.replace(new RegExp(t,"g"),":"+t)}else{if(t==="valid"&&e.search("invalid")&&e.search("valid")!==e.search("invalid")-2){n=n.replace(new RegExp(t,"g"),":"+t)}else if(t!=="valid"&&a.indexOf(t)!==-1){if(e.search("nth-"+t)!==e.search(t)-4){n=n.replace(new RegExp(t,"g"),":"+t)}}}}));n=v(n);return`${t}${n}`};function S(e,t){const n=w(e);return b(n,t)}function j(){function e(e,t){if(t.type!=="style")return e;const n=t.options.parent;o["default"].forEach(e,((a,r)=>{if(typeof a!=="string"&&typeof a==="object"){const i=S(r,t.selector);const l=o["default"].reduce(a,((e,t,n)=>{e[o["default"].kebabCase(n)]=t;return e}),{});n.addRule(i,l,{selector:i});delete e[r]}}));return e}return{onProcessStyle:e}}const k="@media screen and (min-width:30em)";const I="@media screen and (min-width:30em) and (max-width: 60em)";const M="@media screen and (min-width:60em)";s["default"].use(j(),p());function T(e){return o["default"].mapKeys(e,((e,t)=>o["default"].kebabCase(t)))}const B=s["default"].createStyleSheet({});function P({style:e,styleNS:t,styleM:n,styleL:a,classes:r,key:i="unnamed"},l){const u=l?l:B;const s=[];const o=Boolean(i!=="unnamed"&&u.getRule(i));let f;if(e){if(o){f=u.update(i,T(e))}else{f=u.addRule(i,T(e))}if(f.id)s.push(f.id)}if(t){if(o){f=u.update(i,T(t))}else{f=u.addRule(k,{[i]:T(t)})}f=f.getRule(i);if(f.id)s.push(f.id)}if(n){if(o){f=u.update(i,T(n))}else{f=u.addRule(I,{[i]:T(n)})}f=f.getRule(i);if(f.id)s.push(f.id)}if(a){if(o){f=u.update(i,T(a))}else{f=u.addRule(M,{[i]:T(a)})}f=f.getRule(i);if(f.id)s.push(f.id)}if(s.length&&!l){u.attach()}if(r){s.push(r)}return s.join(" ")}const R=t.create({plugins:[p(),j(),m()]});class F{constructor(e){this._classes={};this.uiSheet=R.createStyleSheet({});this.applyTheme=e;this.createClasses()}get classes(){return this._classes}createClasses(){o["default"].each(this.applyTheme,((e,t)=>{this._classes[t]=P(o["default"].assign({key:t,increaseSpecificity:true},e),this.uiSheet)}));this.uiSheet.attach()}update(e){if(!o["default"].isEqual(this.applyTheme,e)){this.applyTheme=e;this.uiSheet.detach();this.createClasses()}}}function C(e){return o["default"].compact(e).join(" ")}function E(e){switch(e){case"default":return"alt";case"alt":return"default";case"altLighter":return"lighter";case"altDarker":return"darker";case"darker":return"altDarker";case"lighter":return"altLighter";case"warn":return"neutral";case"error":return"neutral";default:return"neutral"}}function O(e){return i.DateTime.fromISO(e).valueOf()}function D(e,t="D"){const n=i.DateTime.fromMillis(e);return n.isValid?n.toFormat(t,{locale:"en-GB"}):"-"}function A(e,t="HH:mm"){return D(e,t)}function $(e){const t=i.DateTime.now().startOf("day");const n=i.DateTime.fromMillis(e).startOf("day").diff(t,"day").get("days");switch(n){case-1:return"Yesterday";case 0:return"Today";case 1:return"Tomorrow";default:return D(e)}}function q(e){try{return e?$(O(e)):"-"}catch(e){return"-"}}function N(e){try{return e?A(O(e)):"-"}catch(e){return"-"}}function L(e){try{if(e){const t=O(e);return`${$(t)}, ${A(t)}`}else{return"-"}}catch(e){return"-"}}function U(e){try{return e?$(e):"-"}catch(e){return"-"}}function z(e){try{return e?A(e):"-"}catch(e){return"-"}}function H(e){try{if(e){return`${$(e)}, ${A(e)}`}else{return"-, -"}}catch(e){return"-, -"}}function V(){return window.matchMedia("only screen and (max-width: 360px)").matches}function _(){return window.matchMedia("only screen and (max-width: 768px)").matches}function Y(e,t){return o["default"].find(e,o["default"].matches(t))}function W(e,t){return o["default"].find(e,o["default"].matches({_id:t}))}function K(e,t,n){return c["default"].lift(((e,t)=>W(e,t)||n),e,t)}function Z(e,t){return o["default"].filter(e,o["default"].matches(t))}function G(e,t){return o["default"].remove(e,o["default"].matches(t))}function J(e,{tags:t}){return o["default"].some(e,(e=>o["default"].some(t,e)))}function Q(e,{tags:t}){return o["default"].every(e,(e=>o["default"].some(t,e)))}function X(e,t,n=false){if(t.length===0){return e}const a=o["default"].partial(n?Q:J,t);return o["default"].filter(e,(t=>{if(a(t)){const n=t;return n.hideEmpty?X(e,n.content,n.contentAll).length>0:true}return false}))}function ee({readonly:e,disabled:t}){return!(e||t)}function te(e){return Boolean(o["default"].isArray(e)?e.length:e)}function ne(e){const t={};e.forEach(((e,n)=>t[n]=e));return t}function ae(e,t){o["default"].forEach(t,((t,n)=>e.set(n,t)))}function re(e){if(e<1e3){return`${e} bytes`}else if(e<1e6){return`${o["default"].round(e/1e3)}Kb`}else{return`${o["default"].round(e/1e6)}Mb`}}function ie(e,t,n){if(n){return e.label}const{props:a}=e;return t.length===1?a[t[0]]:o["default"](t).map((e=>a[e])).compact().value().join(" ")}function le(e){return e}const ue={"application/zip":{icon:"fal fa-file-archive",ext:".zip"},"application/pdf":{icon:"fal fa-file-pdf",ext:".pdf"},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{icon:"fal fa-file-word",ext:".docx"},"application/msword":{icon:"fal fa-file-word",ext:".doc"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{icon:"fal fa-file-excel",ext:".xlsx"},"application/vnd.ms-excel":{icon:"fal fa-file-excel",ext:".xls"},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{icon:"fal fa-file-powerpoint",ext:".pptx"},"application/vnd.ms-powerpoint":{icon:"fal fa-file-powerpoint",ext:".ppt"},"image/jpeg":{icon:"fal fa-file-image",ext:".jpeg"},"image/png":{icon:"fal fa-file-image",ext:".png"},"image/gif":{icon:"fal fa-file-image",ext:".gif"},"image/tiff":{icon:"fal fa-file-image",ext:".tiff"},"audio/mpeg":{icon:"fal fa-file-audio",ext:".mp3"},"video/mpeg":{icon:"fal fa-file-video",ext:".mpeg"},"video/quicktime":{icon:"fal fa-file-video",ext:".mov"},"video/x-msvideo":{icon:"fal fa-file-video",ext:".avi"}};function se(e){if(ue.hasOwnProperty(e)){return ue[e].icon}else{return"fal fa-file-alt"}}function oe(e){if(ue.hasOwnProperty(e)){return ue[e].ext}else{return""}}function fe(e,t){if(t==="size"){return re(e.size)}else if(t==="lastModified"){return H(e.lastModified)}else if(t==="type"){return f["default"]("i.fal.fa-fw",{title:e.type,class:se(e.type)})}else{return e[t]}}function ce(e,t){return o["default"].map(Z(e,{prop:t}),(e=>{const{_id:t,name:n}=e;return{guid:t,name:n,path:e.remoteUrl}}))}function de(e,{id:t}){return c["default"](ce(e,t))}function pe(e,t){return o["default"].get(e,t)}function me(e,{id:t}){const n=pe(e,t);return n?c["default"](n):c["default"]()}function he(e,t){if(t){if(typeof e!=="object"||typeof e!==typeof t||o["default"].isArray(e)!==o["default"].isArray(t)){throw new Error("deepMerge only supports arrays and objects and cannot merge objects of different types.")}const n=o["default"].isArray(e)?[]:{};const a=o["default"].uniq([...o["default"].keys(e),...o["default"].keys(t)]);return o["default"].reduce(a,((n,a)=>{if(a in t&&!o["default"].isUndefined(t[a])){if(typeof e[a]==="object"){n[a]=he(e[a]||{},t[a])}else{n[a]=t[a]}}else{n[a]=e[a]}return n}),n)}return e}const ye={};function ge(e,t){if(e in ye){throw new Error(`Component ${e} is already registered`)}else{ye[e]=t}}function xe({type:e,data:t,style:n,styleNS:a,styleM:r,styleL:i,classes:l}){const u=P({style:n,styleNS:a,styleM:r,styleL:i,classes:l});if(e in ye){return f["default"](ye[e],{type:e,data:t,classes:u})}else{return f["default"]("span",`Unknown component type: ${e}`)}}function ve(e){return o["default"].map(e,(e=>xe(e)))}const we={["label"]:l.Label,["trusted"]:l.TextareaInput,["hidden"]:l.BaseInput,["text"]:l.BaseInput,["password"]:l.PasswordInput,["search"]:l.BaseInput,["date"]:l.BaseInput,["time"]:l.BaseInput,["datetime-local"]:l.BaseInput,["dateInput"]:l.DateInput,["cardDate"]:l.CardDateInput,["number"]:l.BaseInput,["range"]:l.BaseInput,["email"]:l.BaseInput,["url"]:l.BaseInput,["tel"]:l.BaseInput,["color"]:l.BaseInput,["currency"]:l.CurrencyInput,["textarea"]:l.TextareaInput,["checkbox"]:l.CheckboxInput,["toggle"]:l.ToggleInput,["select"]:l.SelectInput,["radio"]:l.RadioInput};const be={["fileMulti"]:l.FileMulti,["file"]:l.FileSelect,["imageMulti"]:l.ImageMulti,["image"]:l.ImageSelect,["sign"]:l.SignBuilder};const Se={};o["default"].forEach(we,((e,t)=>Se[t]=1));o["default"].forEach(be,((e,t)=>Se[t]=2));function je(e){if(be.hasOwnProperty(e)){return be[e]}else{return be["file"]}}function ke(e){if(we.hasOwnProperty(e)){return we[e]}else{return we["text"]}}function Ie(e,t){if(e===2){return je(t)}else if(e===1){return ke(t)}else{return undefined}}function Me(e="text"){return Se[e]||3}const Te=/^ {0,}[0-9]{2}\/[0-9]{2}\/[0-9]{4} {0,}$/;const Be=/^ {0,}(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2})) {0,}$/;const Pe={default:e=>e,"date-format":e=>e.map((e=>e?D(Number(e)):"")),"dateStr-format":e=>e.map((e=>e?D(new Date(String(e)).valueOf()):"")),"date-format-month":e=>e.map((e=>e?D(Number(e),"dd MMMM yyyy"):"")),"date-endofday":e=>e.map((e=>e?i.DateTime.fromISO(e,{setZone:true}).endOf("day").toISO():"")),upper:e=>e.map((e=>String(e).toUpperCase())),lower:e=>e.map((e=>String(e).toLowerCase())),snake:e=>e.map((e=>o["default"].snakeCase(String(e)))),trunc:e=>e.map((e=>o["default"].truncate(String(e),{length:15}))),"remove-whitespace":e=>e.map((e=>e?o["default"].replace(String(e),/\s/g,""):"")),boolean:e=>e.map((e=>Boolean(e))),strLength:e=>e.map((e=>e?String(e).length>0:false)),"strLength-6":e=>e.map((e=>e?String(e).length===6:false)),"test-dob":e=>e.map((e=>e?Te.test(String(e)):false)),"test-postcode":e=>e.map((e=>e?Be.test(String(e)):false))};function Re(e,t){if(Pe.hasOwnProperty(e)){return Pe[e](t)}else{return Pe["default"](t)}}function Fe(e,t){if(!Pe.hasOwnProperty(e)){Pe[e]=t}}const Ce={default:e=>e.map((e=>o["default"].map(e,(({name:e})=>e)).join())),"file-name":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.name:"")).join())),"file-type":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.type:"")).join())),"file-size":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.size:"")).join())),"file-lastmodified":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.lastModified:"")).join())),path:e=>e.map((e=>o["default"].map(e,(({path:e})=>e)).join())),dataUrl:e=>e.map((e=>o["default"].map(e,(({dataUrl:e})=>e?e:"")).join()))};function Ee(e,t){if(Ce.hasOwnProperty(e)){return Ce[e](t)}else{return Ce["default"](t)}}function Oe(e,t){if(!Ce.hasOwnProperty(e)){Ce[e]=t}}const De={default:e=>c["default"].merge(e).map((e=>e.join())),"join-space":e=>c["default"].merge(e).map((e=>e.join(" "))),"join-newline":e=>c["default"].merge(e).map((e=>e.join("\n"))),"join-underscore":e=>c["default"].merge(e).map((e=>e.join("_"))),sum:e=>c["default"].merge(e).map((e=>o["default"].reduce(e,((e,t)=>{const n=Number.parseInt(String(t));return o["default"].isNaN(n)?e:e+n}),0))),product:e=>c["default"].merge(e).map((e=>o["default"].reduce(e,((e,t)=>{const n=Number.parseInt(String(t));return o["default"].isNaN(n)?0:e*n}),1))),and:e=>c["default"].merge(e).map((e=>o["default"].reduce(e,((e,t)=>e?t:0),true))),or:e=>c["default"].merge(e).map((e=>o["default"].reduce(e,((e,t)=>e||t?t:e),0)))};function Ae(e,t){if(De.hasOwnProperty(e)){return De[e](t)}else{return De["default"](t)}}function $e(e,t){return o["default"].map(o["default"].compact(o["default"].at(e,t)),(({value:e})=>e))}function qe(e,t,n){return o["default"].max(o["default"].map(t,(t=>{const a=o["default"].find(n,o["default"].matches({key:t}));return a&&a.computed?qe(e+1,a.computed.keys,n):e})))||0}function Ne(e){return o["default"].sortBy(e,(t=>qe(0,t.computed.keys,e)))}function Le(e){const t=o["default"].groupBy(e,(e=>"computed"in e&&e.computed?"c":"b"));const{["b"]:n,["c"]:a}=t;const r={};o["default"].reduce(n,((e,{key:t,fileValue:n,input:a})=>{const r=a?Me(a.type):3;if(r===1){e[t]={type:r,value:c["default"]()}}else if(r===2){const a=c["default"]([]);e[t]={type:r,value:Ee(n||"default",a),files:a}}return e}),r);const i=Ne(a);o["default"].reduce(i,((e,{key:t,computed:{keys:n,map:a="default",merge:r="default"}})=>{let i;if(n.length>1){const t=$e(e,n);i=Ae(r,t)}else if(n.length===1){i=$e(e,n)[0]}if(i){e[t]={type:1,value:Re(a,i)}}return e}),r);return{fields:o["default"](e).filter((e=>"input"in e)).map((({key:e,group:t,input:n,data:a,user:i,fieldSet:l})=>{const u=r[e];const s=u.type;return{key:e,group:t,input:n,type:s,data:a,user:i,fieldSet:l,widget:Ie(s,n.type||"text"),value:u.value,files:u.type===2?u.files:undefined}})).value(),streamMap:r}}function Ue(e,t){return t?o["default"].assign({},e,t):e}function ze({type:e,input:t,widget:n,value:a,files:r},i){if(e===2&&t&&n&&r){return f["default"](n,{field:Ue(t,i),value:r})}else if(e===1&&t&&n&&a){return f["default"](n,{field:Ue(t,i),value:a})}return null}function He(e,t){return o["default"].map(e,(e=>ze(e,t)))}function Ve(e){return e.type===1}const _e=new Set(["checkbox","toggle","select","radio"]);function Ye(e){var t;return Ve(e)&&((t=e.input)===null||t===void 0?void 0:t.type)&&!_e.has(e.input.type)}function We(e){return e.type===2}function Ke(e){var t;return We(e)&&((t=e.input)===null||t===void 0?void 0:t.type)==="sign"}function Ze(e){return o["default"].reduce(e.fields,((e,t)=>{const{key:n,value:a}=t;if(Ve(t)&&a&&a()!=null){e[n]=a()}return e}),{})}function Ge(e,t){o["default"].forEach(t,((t,n)=>{if(n in e.streamMap){e.streamMap[n].value(t)}}))}e.ButtonContextMapper=E;e.ResponsiveThemeHandler=F;e.applyFileMap=Ee;e.applyMap=Re;e.assembleFormField=ze;e.assembleFormFieldList=He;e.buildComponent=xe;e.buildComponentList=ve;e.buildFormFields=Le;e.canEdit=ee;e.createResponsiveClass=P;e.deepMerge=he;e.deserialise=Ge;e.extractFields=ie;e.fileExt=oe;e.fileIcon=se;e.filterByProperty=Z;e.formatDate=D;e.formatTime=A;e.getFileStream=de;e.getFileValue=fe;e.getFiles=ce;e.getProp=pe;e.getPropStream=me;e.hasValue=te;e.humaniseByteCount=re;e.humaniseTimeValue=$;e.isFileField=We;e.isPropField=Ve;e.isSignField=Ke;e.isTextField=Ye;e.itemsForCategory=X;e.joinClasses=C;e.mapToObject=ne;e.parseDateStr=q;e.parseDateTimeStr=L;e.parseDateTimeValue=H;e.parseDateValue=U;e.parseIso=O;e.parseTimeStr=N;e.parseTimeValue=z;e.pickById=W;e.pickByIdStream=K;e.pickByProperty=Y;e.registerComponent=ge;e.registerFileMapFn=Oe;e.registerMapFn=Fe;e.removeByProperty=G;e.serialise=Ze;e.setMap=ae;e.simpleResponse=le;e.smallDevice=_;e.tinyDevice=V;Object.defineProperty(e,"__esModule",{value:true})}));
