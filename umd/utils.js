/* @preserve built on: 2021-08-17T12:32:20.819Z */
(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("jss"),require("lodash"),require("mithril"),require("mithril/stream"),require("luxon"),require("@sdxmessaging/ui-widgets")):typeof define==="function"&&define.amd?define(["exports","jss","lodash","mithril","mithril/stream","luxon","@sdxmessaging/ui-widgets"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiBuilder={},e.jss,e._,e.m,e.m.stream,e.luxon,e.uiWidgets))})(this,(function(e,t,a,n,r,i,l){"use strict";function u(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var s=u(t);var o=u(a);var f=u(n);var c=u(r);const d={uiTableHeader:"ag-header",uiTableHeaderCell:"ag-header-cell"};function p(){function e(e,t,a){if(t.type!=="style")return e;if(t.id&&d[t.id.replace(/(-\d+)*/g,"")]&&a){const e=o["default"].reduce(o["default"].entries(t.style),((e,[t,a])=>{e[t]=a+" !important";return e}),{});const n=a.addRule(d[t.id.replace(/(-\d+)*/g,"")],e,{selector:"."+d[t.id.replace(/(-\d+)*/g,"")]});n.id=d[t.id]}return e}return{onProcessStyle:e}}function m(e){const t=o["default"].assign({repeat:2},e);const a=Array(t.repeat).join(":not(#\\20)");return{onProcessRule:(e,t)=>{const n=e.options.parent;if(t.options.increaseSpecificity===false||e.type!=="style"||n&&n.type==="keyframes"||e.selectorText.search(":not(#\\20)")!==-1)return;e.selectorText=a+e.selectorText}}}const h=["after","before","first-line","first-letter","selection","placeholder"];const y=["active","checked","disabled","empty","enabled","first-child","first-of-type","focus","hover","in-range","invalid","last-child","last-of-type","link","not","only-of-type","only-child","optional","out-of-range","read-only","read-write","required","root","target","valid","visited"];const g=["nth-child","nth-last-child","nth-last-of-type","nth-of-type"];const x=[{"-space-":" ","-space":" ","space-":" ",space:" "},{"-dot-":".","-dot":".","dot-":".",dot:"."},{"-dash-":"-","-dash":"-","dash-":"-",dash:"-"},{"-chevron-":" > ","-chevron":" > ","chevron-":" > ",chevron:" > "},{"-hash-":"#","-hash":"#","hash-":"#",hash:"#"},{"-star-":"*","-star":"*","star-":"*",star:"*"},{"-colon-":":","-colon":":","colon-":":",colon:":"},{"-equals-":"=","-equals":"=","equals-":"=",equals:"="},{"-sbo-":"[","-sbo":"[","sbo-":"[",sbo:"["},{"-sbc-":"]","-sbc":"]","sbc-":"]",sbc:"]"}];const w=e=>{const t=o["default"].find(g,(t=>e.search(t)!==-1));if(t){const a=e.slice(t.length+1);return`:${e.slice(0,t.length)}(${a})`}return e};const v=e=>o["default"].reduce(x,((t,a)=>{t=!t?e:t;o["default"].forEach(o["default"].entries(a),(([e,a])=>{const n=t.search(e);const r=new RegExp(e,"g");if(n!==-1){if(n===0){t=t.replace(e,a)}const i=t.search(e);if(i||n!==0){t=t.replace(r,a)}t=t.replace(/ +/," ")}}));return t}),"");const b=(e,t)=>{let a=e;h.forEach((e=>a=a.replace(new RegExp(e,"g"),"::"+e)));y.forEach((t=>{const n=["valid","last-child","last-of-type"];if(n.indexOf(t)===-1){a=a.replace(new RegExp(t,"g"),":"+t)}else{if(t==="valid"&&e.search("invalid")&&e.search("valid")!==e.search("invalid")-2){a=a.replace(new RegExp(t,"g"),":"+t)}else if(t!=="valid"&&n.indexOf(t)!==-1){if(e.search("nth-"+t)!==e.search(t)-4){a=a.replace(new RegExp(t,"g"),":"+t)}}}}));a=w(a);return`${t}${a}`};function S(e,t){const a=v(e);return b(a,t)}function j(){function e(e,t){if(t.type!=="style")return e;const a=t.options.parent;o["default"].forEach(e,((n,r)=>{if(typeof n!=="string"&&typeof n==="object"){const i=S(r,t.selector);const l=o["default"].reduce(n,((e,t,a)=>{e[o["default"].kebabCase(a)]=t;return e}),{});a.addRule(i,l,{selector:i});delete e[r]}}));return e}return{onProcessStyle:e}}const I="@media screen and (min-width:30em)";const k="@media screen and (min-width:30em) and (max-width: 60em)";const M="@media screen and (min-width:60em)";s["default"].use(j(),p());function T(e){return o["default"].mapKeys(e,((e,t)=>o["default"].kebabCase(t)))}const B=s["default"].createStyleSheet({});function R({style:e,styleNS:t,styleM:a,styleL:n,classes:r,key:i="unnamed"},l){const u=l?l:B;const s=[];const o=Boolean(i!=="unnamed"&&u.getRule(i));let f;if(e){if(o){f=u.update(i,T(e))}else{f=u.addRule(i,T(e))}if(f.id)s.push(f.id)}if(t){if(o){f=u.update(i,T(t))}else{f=u.addRule(I,{[i]:T(t)})}f=f.getRule(i);if(f.id)s.push(f.id)}if(a){if(o){f=u.update(i,T(a))}else{f=u.addRule(k,{[i]:T(a)})}f=f.getRule(i);if(f.id)s.push(f.id)}if(n){if(o){f=u.update(i,T(n))}else{f=u.addRule(M,{[i]:T(n)})}f=f.getRule(i);if(f.id)s.push(f.id)}if(s.length&&!l){u.attach()}if(r){s.push(r)}return s.join(" ")}const P=t.create({plugins:[p(),j(),m()]});class C{constructor(e){this._classes={};this.uiSheet=P.createStyleSheet({});this.applyTheme=e;this.createClasses()}get classes(){return this._classes}createClasses(){o["default"].each(this.applyTheme,((e,t)=>{this._classes[t]=R(o["default"].assign({key:t,increaseSpecificity:true},e),this.uiSheet)}));this.uiSheet.attach()}update(e){if(!o["default"].isEqual(this.applyTheme,e)){this.applyTheme=e;this.uiSheet.detach();this.createClasses()}}}function O(e){return o["default"].compact(e).join(" ")}function D(e){if(o["default"].isArray(e)){return o["default"].compact(e).length>0}if(o["default"].isObject(e)&&o["default"].isArray(e.children)){return o["default"].compact(e.children).length>0}return e}function E(e){switch(e){case"default":return"alt";case"alt":return"default";case"altLighter":return"lighter";case"altDarker":return"darker";case"darker":return"altDarker";case"lighter":return"altLighter";case"warn":return"neutral";case"error":return"neutral";default:return"neutral"}}function F(e){return i.DateTime.fromISO(e).valueOf()}function A(e,t="D"){const a=i.DateTime.fromMillis(e);return a.isValid?a.toFormat(t,{locale:"en-GB"}):"-"}function $(e,t="HH:mm"){return A(e,t)}function q(e){const t=i.DateTime.now().startOf("day");const a=i.DateTime.fromMillis(e).startOf("day").diff(t,"day").get("days");switch(a){case-1:return"Yesterday";case 0:return"Today";case 1:return"Tomorrow";default:return A(e)}}function N(e){try{return e?q(F(e)):"-"}catch(e){return"-"}}function L(e){try{return e?$(F(e)):"-"}catch(e){return"-"}}function U(e){try{if(e){const t=F(e);return`${q(t)}, ${$(t)}`}else{return"-"}}catch(e){return"-"}}function z(e){try{return e?q(e):"-"}catch(e){return"-"}}function H(e){try{return e?$(e):"-"}catch(e){return"-"}}function V(e){try{if(e){return`${q(e)}, ${$(e)}`}else{return"-, -"}}catch(e){return"-, -"}}function _(){return window.matchMedia("only screen and (max-width: 360px)").matches}function Y(){return window.matchMedia("only screen and (max-width: 768px)").matches}function W(e,t){return o["default"].find(e,o["default"].matches(t))}function K(e,t){return o["default"].find(e,o["default"].matches({_id:t}))}function Z(e,t,a){return c["default"].lift(((e,t)=>K(e,t)||a),e,t)}function G(e,t){return o["default"].filter(e,o["default"].matches(t))}function J(e,t){return o["default"].remove(e,o["default"].matches(t))}function Q(e,{tags:t}){return o["default"].some(e,(e=>o["default"].some(t,e)))}function X(e,{tags:t}){return o["default"].every(e,(e=>o["default"].some(t,e)))}function ee(e,t,a=false){if(t.length===0){return e}const n=o["default"].partial(a?X:Q,t);return o["default"].filter(e,(t=>{if(n(t)){const a=t;return a.hideEmpty?ee(e,a.content,a.contentAll).length>0:true}return false}))}function te({readonly:e,disabled:t}){return!(e||t)}function ae(e){return Boolean(o["default"].isArray(e)?e.length:e)}function ne(e){const t={};e.forEach(((e,a)=>t[a]=e));return t}function re(e,t){o["default"].forEach(t,((t,a)=>e.set(a,t)))}function ie(e){if(e<1e3){return`${e} bytes`}else if(e<1e6){return`${o["default"].round(e/1e3)}Kb`}else{return`${o["default"].round(e/1e6)}Mb`}}function le(e,t,a){if(a){return e.label}const{props:n}=e;return t.length===1?n[t[0]]:o["default"](t).map((e=>n[e])).compact().value().join(" ")}function ue(e){return e}const se={"application/zip":{icon:"fal fa-file-archive",ext:".zip"},"application/pdf":{icon:"fal fa-file-pdf",ext:".pdf"},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{icon:"fal fa-file-word",ext:".docx"},"application/msword":{icon:"fal fa-file-word",ext:".doc"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{icon:"fal fa-file-excel",ext:".xlsx"},"application/vnd.ms-excel":{icon:"fal fa-file-excel",ext:".xls"},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{icon:"fal fa-file-powerpoint",ext:".pptx"},"application/vnd.ms-powerpoint":{icon:"fal fa-file-powerpoint",ext:".ppt"},"image/jpeg":{icon:"fal fa-file-image",ext:".jpeg"},"image/png":{icon:"fal fa-file-image",ext:".png"},"image/gif":{icon:"fal fa-file-image",ext:".gif"},"image/tiff":{icon:"fal fa-file-image",ext:".tiff"},"audio/mpeg":{icon:"fal fa-file-audio",ext:".mp3"},"video/mpeg":{icon:"fal fa-file-video",ext:".mpeg"},"video/quicktime":{icon:"fal fa-file-video",ext:".mov"},"video/x-msvideo":{icon:"fal fa-file-video",ext:".avi"}};function oe(e){if(se.hasOwnProperty(e)){return se[e].icon}else{return"fal fa-file-alt"}}function fe(e){if(se.hasOwnProperty(e)){return se[e].ext}else{return""}}function ce(e,t){if(t==="size"){return ie(e.size)}else if(t==="lastModified"){return V(e.lastModified)}else if(t==="type"){return f["default"]("i.fal.fa-fw",{title:e.type,class:oe(e.type)})}else{return e[t]}}function de(e,t){return o["default"].map(G(e,{prop:t}),(e=>{const{_id:t,name:a}=e;return{guid:t,name:a,path:e.remoteUrl}}))}function pe(e,{id:t}){return c["default"](de(e,t))}function me(e,t){return o["default"].get(e,t)}function he(e,{id:t}){const a=me(e,t);return a?c["default"](a):c["default"]()}function ye(e,t){if(t){if(typeof e!=="object"||typeof e!==typeof t||o["default"].isArray(e)!==o["default"].isArray(t)){throw new Error("deepMerge only supports arrays and objects and cannot merge objects of different types.")}const a=o["default"].isArray(e)?[]:{};const n=o["default"].uniq([...o["default"].keys(e),...o["default"].keys(t)]);return o["default"].reduce(n,((a,n)=>{if(n in t&&!o["default"].isUndefined(t[n])){if(typeof e[n]==="object"){a[n]=ye(e[n]||{},t[n])}else{a[n]=t[n]}}else{a[n]=e[n]}return a}),a)}return e}const ge={};function xe(e,t){if(e in ge){throw new Error(`Component ${e} is already registered`)}else{ge[e]=t}}function we({type:e,data:t,style:a,styleNS:n,styleM:r,styleL:i,classes:l}){const u=R({style:a,styleNS:n,styleM:r,styleL:i,classes:l});if(e in ge){return f["default"](ge[e],{type:e,data:t,classes:u})}else{return f["default"]("span",`Unknown component type: ${e}`)}}function ve(e){return o["default"].map(e,(e=>we(e)))}const be={["label"]:l.Label,["trusted"]:l.TextareaInput,["hidden"]:l.BaseInput,["text"]:l.BaseInput,["password"]:l.PasswordInput,["search"]:l.BaseInput,["date"]:l.BaseInput,["time"]:l.BaseInput,["datetime-local"]:l.BaseInput,["dateInput"]:l.DateInput,["cardDate"]:l.CardDateInput,["number"]:l.BaseInput,["range"]:l.BaseInput,["email"]:l.BaseInput,["url"]:l.BaseInput,["tel"]:l.BaseInput,["color"]:l.BaseInput,["currency"]:l.CurrencyInput,["textarea"]:l.TextareaInput,["checkbox"]:l.CheckboxInput,["toggle"]:l.ToggleInput,["select"]:l.SelectInput,["radio"]:l.RadioInput};const Se={["fileMulti"]:l.FileMulti,["file"]:l.FileSelect,["imageMulti"]:l.ImageMulti,["image"]:l.ImageSelect,["sign"]:l.SignBuilder};const je={};o["default"].forEach(be,((e,t)=>je[t]=1));o["default"].forEach(Se,((e,t)=>je[t]=2));function Ie(e){if(Se.hasOwnProperty(e)){return Se[e]}else{return Se["file"]}}function ke(e){if(be.hasOwnProperty(e)){return be[e]}else{return be["text"]}}function Me(e,t){if(e===2){return Ie(t)}else if(e===1){return ke(t)}else{return undefined}}function Te(e="text"){return je[e]||3}const Be=/^ {0,}[0-9]{2}\/[0-9]{2}\/[0-9]{4} {0,}$/;const Re=/^ {0,}(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2})) {0,}$/;const Pe={default:e=>e,"date-format":e=>e.map((e=>e?A(Number(e)):"")),"dateStr-format":e=>e.map((e=>e?A(new Date(String(e)).valueOf()):"")),"date-format-month":e=>e.map((e=>e?A(Number(e),"dd MMMM yyyy"):"")),"date-endofday":e=>e.map((e=>e?i.DateTime.fromISO(e,{setZone:true}).endOf("day").toISO():"")),upper:e=>e.map((e=>String(e).toUpperCase())),lower:e=>e.map((e=>String(e).toLowerCase())),snake:e=>e.map((e=>o["default"].snakeCase(String(e)))),trunc:e=>e.map((e=>o["default"].truncate(String(e),{length:15}))),"remove-whitespace":e=>e.map((e=>e?o["default"].replace(String(e),/\s/g,""):"")),boolean:e=>e.map((e=>Boolean(e))),strLength:e=>e.map((e=>e?String(e).length>0:false)),"strLength-6":e=>e.map((e=>e?String(e).length===6:false)),"test-dob":e=>e.map((e=>e?Be.test(String(e)):false)),"test-postcode":e=>e.map((e=>e?Re.test(String(e)):false))};function Ce(e,t){if(Pe.hasOwnProperty(e)){return Pe[e](t)}else{return Pe["default"](t)}}function Oe(e,t){if(!Pe.hasOwnProperty(e)){Pe[e]=t}}const De={default:e=>e.map((e=>o["default"].map(e,(({name:e})=>e)).join())),"file-name":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.name:"")).join())),"file-type":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.type:"")).join())),"file-size":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.size:"")).join())),"file-lastmodified":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.lastModified:"")).join())),path:e=>e.map((e=>o["default"].map(e,(({path:e})=>e)).join())),dataUrl:e=>e.map((e=>o["default"].map(e,(({dataUrl:e})=>e?e:"")).join()))};function Ee(e,t){if(De.hasOwnProperty(e)){return De[e](t)}else{return De["default"](t)}}function Fe(e,t){if(!De.hasOwnProperty(e)){De[e]=t}}const Ae={default:e=>c["default"].merge(e).map((e=>e.join())),"join-space":e=>c["default"].merge(e).map((e=>e.join(" "))),"join-newline":e=>c["default"].merge(e).map((e=>e.join("\n"))),"join-underscore":e=>c["default"].merge(e).map((e=>e.join("_"))),sum:e=>c["default"].merge(e).map((e=>o["default"].reduce(e,((e,t)=>{const a=Number.parseInt(String(t));return o["default"].isNaN(a)?e:e+a}),0))),product:e=>c["default"].merge(e).map((e=>o["default"].reduce(e,((e,t)=>{const a=Number.parseInt(String(t));return o["default"].isNaN(a)?0:e*a}),1))),and:e=>c["default"].merge(e).map((e=>o["default"].reduce(e,((e,t)=>e?t:0),true))),or:e=>c["default"].merge(e).map((e=>o["default"].reduce(e,((e,t)=>e||t?t:e),0)))};function $e(e,t){if(Ae.hasOwnProperty(e)){return Ae[e](t)}else{return Ae["default"](t)}}function qe(e,t){return o["default"].map(o["default"].compact(o["default"].at(e,t)),(({value:e})=>e))}function Ne(e,t,a){return o["default"].max(o["default"].map(t,(t=>{const n=o["default"].find(a,o["default"].matches({key:t}));return n&&n.computed?Ne(e+1,n.computed.keys,a):e})))||0}function Le(e){return o["default"].sortBy(e,(t=>Ne(0,t.computed.keys,e)))}function Ue(e){const t=o["default"].groupBy(e,(e=>"computed"in e&&e.computed?"c":"b"));const{["b"]:a,["c"]:n}=t;const r={};o["default"].reduce(a,((e,{key:t,fileValue:a,input:n})=>{const r=n?Te(n.type):3;if(r===1){e[t]={type:r,value:c["default"]()}}else if(r===2){const n=c["default"]([]);e[t]={type:r,value:Ee(a||"default",n),files:n}}return e}),r);const i=Le(n);o["default"].reduce(i,((e,{key:t,computed:{keys:a,map:n="default",merge:r="default"}})=>{let i;if(a.length>1){const t=qe(e,a);i=$e(r,t)}else if(a.length===1){i=qe(e,a)[0]}if(i){e[t]={type:1,value:Ce(n,i)}}return e}),r);return{fields:o["default"](e).filter((e=>"input"in e)).map((({key:e,group:t,input:a,data:n,user:i,fieldSet:l})=>{const u=r[e];const s=u.type;return{key:e,group:t,input:a,type:s,data:n,user:i,fieldSet:l,widget:Me(s,a.type||"text"),value:u.value,files:u.type===2?u.files:undefined}})).value(),streamMap:r}}function ze(e,t){return t?o["default"].assign({},e,t):e}function He({type:e,input:t,widget:a,value:n,files:r},i){if(e===2&&t&&a&&r){return f["default"](a,{field:ze(t,i),value:r})}else if(e===1&&t&&a&&n){return f["default"](a,{field:ze(t,i),value:n})}return null}function Ve(e,t){return o["default"].map(e,(e=>He(e,t)))}e.ButtonContextMapper=E;e.ResponsiveThemeHandler=C;e.applyFileMap=Ee;e.applyMap=Ce;e.assembleFormField=He;e.assembleFormFieldList=Ve;e.buildComponent=we;e.buildComponentList=ve;e.buildFormFields=Ue;e.canEdit=te;e.createResponsiveClass=R;e.deepMerge=ye;e.extractFields=le;e.fileExt=fe;e.fileIcon=oe;e.filterByProperty=G;e.formatDate=A;e.formatTime=$;e.getFileStream=pe;e.getFileValue=ce;e.getFiles=de;e.getProp=me;e.getPropStream=he;e.hasChildren=D;e.hasValue=ae;e.humaniseByteCount=ie;e.humaniseTimeValue=q;e.itemsForCategory=ee;e.joinClasses=O;e.mapToObject=ne;e.parseDateStr=N;e.parseDateTimeStr=U;e.parseDateTimeValue=V;e.parseDateValue=z;e.parseIso=F;e.parseTimeStr=L;e.parseTimeValue=H;e.pickById=K;e.pickByIdStream=Z;e.pickByProperty=W;e.registerComponent=xe;e.registerFileMapFn=Fe;e.registerMapFn=Oe;e.removeByProperty=J;e.setMap=re;e.simpleResponse=ue;e.smallDevice=Y;e.tinyDevice=_;Object.defineProperty(e,"__esModule",{value:true})}));
