/* @preserve built on: 2022-07-11T10:43:21.555Z */
(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("jss"),require("lodash"),require("mithril"),require("mithril/stream"),require("luxon"),require("@sdxmessaging/ui-widgets")):typeof define==="function"&&define.amd?define(["exports","jss","lodash","mithril","mithril/stream","luxon","@sdxmessaging/ui-widgets"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiBuilder={},e.jss,e._,e.m,e.m.stream,e.luxon,e.uiWidgets))})(this,(function(e,t,n,r,a,i,u){"use strict";function l(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var s=l(t);var o=l(n);var f=l(r);var c=l(a);const d={uiAgGridHeader:"ag-header",uiAgGridHeaderCell:"ag-header-cell",uiAgGridHeaderIcon:"ag-icon",uiAgGridHeaderCellContainer:"ag-cell-label-container",uiAgGridWrapper:"ag-root-wrapper",uiAgGridColsClipper:"ag-center-cols-clipper",uiAgGridCell:"ag-cell",uiAgGridThemeAlpine:"ag-theme-alpine",uiAgGridBodyViewport:"ag-body-viewport"};function p(){function e(e,t,n){if(t.type!=="style")return e;if(t.id&&d[t.id.replace(/(-\d+)*/g,"")]&&n){const e=o["default"].reduce(o["default"].entries(t.style),((e,[t,n])=>{e[t]=n+" !important";return e}),{});const r=n.addRule(d[t.id.replace(/(-\d+)*/g,"")],e,{selector:"."+d[t.id.replace(/(-\d+)*/g,"")]});r.id=d[t.id]}return e}return{onProcessStyle:e}}function m(e){const t=o["default"].assign({repeat:2},e);const n=Array(t.repeat).join(":not(#\\20)");return{onProcessRule:(e,t)=>{const r=e.options.parent;if(t.options.increaseSpecificity===false||e.type!=="style"||r&&r.type==="keyframes"||e.selectorText.search(":not(#\\20)")!==-1)return;e.selectorText=n+e.selectorText}}}const h=["after","before","first-line","first-letter","selection","placeholder"];const y=["active","checked","disabled","empty","enabled","first-child","first-of-type","focus","hover","in-range","invalid","last-child","last-of-type","link","not","only-of-type","only-child","optional","out-of-range","read-only","read-write","required","root","target","valid","visited"];const g=["nth-child","nth-last-child","nth-last-of-type","nth-of-type"];const x=[{"-space-":" ","-space":" ","space-":" ",space:" "},{"-dot-":".","-dot":".","dot-":".",dot:"."},{"-dash-":"-","-dash":"-","dash-":"-",dash:"-"},{"-chevron-":" > ","-chevron":" > ","chevron-":" > ",chevron:" > "},{"-hash-":"#","-hash":"#","hash-":"#",hash:"#"},{"-star-":"*","-star":"*","star-":"*",star:"*"},{"-colon-":":","-colon":":","colon-":":",colon:":"},{"-equals-":"=","-equals":"=","equals-":"=",equals:"="},{"-sbo-":"[","-sbo":"[","sbo-":"[",sbo:"["},{"-sbc-":"]","-sbc":"]","sbc-":"]",sbc:"]"}];const v=e=>{const t=o["default"].find(g,(t=>e.search(t)!==-1));if(t){const n=e.slice(t.length+1);return`:${e.slice(0,t.length)}(${n})`}return e};const w=e=>o["default"].reduce(x,((t,n)=>{t=!t?e:t;o["default"].forEach(o["default"].entries(n),(([e,n])=>{const r=t.search(e);const a=new RegExp(e,"g");if(r!==-1){if(r===0){t=t.replace(e,n)}const i=t.search(e);if(i||r!==0){t=t.replace(a,n)}t=t.replace(/ +/," ")}}));return t}),"");const b=(e,t)=>{let n=e;h.forEach((e=>n=n.replace(new RegExp(e,"g"),"::"+e)));y.forEach((t=>{const r=["valid","last-child","last-of-type"];if(r.indexOf(t)===-1){n=n.replace(new RegExp(t,"g"),":"+t)}else{if(t==="valid"&&e.search("invalid")&&e.search("valid")!==e.search("invalid")-2){n=n.replace(new RegExp(t,"g"),":"+t)}else if(t!=="valid"&&r.indexOf(t)!==-1){if(e.search("nth-"+t)!==e.search(t)-4){n=n.replace(new RegExp(t,"g"),":"+t)}}}}));n=v(n);return`${t}${n}`};function S(e,t){const n=w(e);return b(n,t)}function I(){function e(e,t){if(t.type!=="style")return e;const n=t.options.parent;o["default"].forEach(e,((r,a)=>{if(typeof r!=="string"&&typeof r==="object"){const i=S(a,t.selector);const u=o["default"].reduce(r,((e,t,n)=>{e[o["default"].kebabCase(n)]=t;return e}),{});n.addRule(i,u,{selector:i});delete e[a]}}));return e}return{onProcessStyle:e}}const j="@media screen and (min-width:30em)";const M="@media screen and (min-width:30em) and (max-width: 60em)";const k="@media screen and (min-width:60em)";s["default"].use(I(),p());const T=s["default"].createStyleSheet({});function A(e){return o["default"].mapKeys(e,((e,t)=>o["default"].kebabCase(t)))}function B(e,t){if(t){e.push(t)}}function P(e,t,n){if(n){const r=e.addRule(t,A(n));return r.id}else{return""}}function C(e,t,n,r){if(r){const a=e.addRule(n,{[t]:A(r)});return a.getRule(t).id}else{return""}}function R(e,t,n){if(n){const r=e.update(t,A(n));return r.id||r.getRule(t).id}else{return""}}function E(e,t,n){if(n){const r=e.update(t,A(n));return r.getRule(t).id}else{return""}}function F({style:e={},styleNS:t,styleM:n,styleL:r,classes:a,key:i="unnamed"},u){const l=u?u:T;const s=[];const o=Boolean(i!=="unnamed"&&l.getRule(i));if(o){B(s,R(l,i,e));B(s,E(l,i,t));B(s,E(l,i,n));B(s,E(l,i,r))}else{B(s,P(l,i,e));B(s,C(l,i,j,t));B(s,C(l,i,M,n));B(s,C(l,i,k,r))}if(s.length&&!u){l.attach()}B(s,a);return s.join(" ")}const O=t.create({plugins:[p(),I(),m()]});class D{constructor(e){this._classes={};this.uiSheet=O.createStyleSheet({});this.applyTheme=e;this.createClasses()}get classes(){return this._classes}createClasses(){o["default"].each(this.applyTheme,((e,t)=>{this._classes[t]=F(o["default"].assign({key:t,increaseSpecificity:true},e),this.uiSheet)}));this.uiSheet.attach()}update(e){if(!o["default"].isEqual(this.applyTheme,e)){this.applyTheme=e;this.uiSheet.detach();this.createClasses()}}}function $(e){return o["default"].compact(e).join(" ")}function q(e){switch(e){case"default":return"alt";case"alt":return"default";case"altLighter":return"lighter";case"altDarker":return"darker";case"darker":return"altDarker";case"lighter":return"altLighter";case"warn":return"neutral";case"error":return"neutral";default:return"neutral"}}function L(e){return i.DateTime.fromISO(e).valueOf()}function N(e,t="D"){const n=i.DateTime.fromMillis(e);return n.isValid?n.toFormat(t,{locale:"en-GB"}):"-"}function G(e,t="HH:mm"){return N(e,t)}function H(){return i.DateTime.now().toISODate()}function U(e){const t=i.DateTime.now().startOf("day");const n=i.DateTime.fromMillis(e).startOf("day").diff(t,"day").get("days");switch(n){case-1:return"Yesterday";case 0:return"Today";case 1:return"Tomorrow";default:return N(e)}}function V(e){try{return e?U(L(e)):"-"}catch(e){return"-"}}function z(e){try{return e?G(L(e)):"-"}catch(e){return"-"}}function _(e){try{if(e){const t=L(e);return`${U(t)}, ${G(t)}`}else{return"-"}}catch(e){return"-"}}function W(e){try{return e?U(e):"-"}catch(e){return"-"}}function Y(e){try{return e?G(e):"-"}catch(e){return"-"}}function K(e){try{if(e){return`${U(e)}, ${G(e)}`}else{return"-, -"}}catch(e){return"-, -"}}function Z(){return window.matchMedia("only screen and (max-width: 360px)").matches}function J(){return window.matchMedia("only screen and (max-width: 768px)").matches}function Q(e,t){return o["default"].find(e,o["default"].matches(t))}function X(e,t){return o["default"].find(e,o["default"].matches({_id:t}))}function ee(e,t,n){return c["default"].lift(((e,t)=>X(e,t)||n),e,t)}function te(e,t){return o["default"].filter(e,o["default"].matches(t))}function ne(e,t){return o["default"].remove(e,o["default"].matches(t))}function re(e,{tags:t}){return o["default"].some(e,(e=>o["default"].some(t,e)))}function ae(e,{tags:t}){return o["default"].every(e,(e=>o["default"].some(t,e)))}function ie(e,t,n=false){if(t.length===0){return e}const r=o["default"].partial(n?ae:re,t);return o["default"].filter(e,(t=>{if(r(t)){const n=t;return n.hideEmpty?ie(e,n.content,n.contentAll).length>0:true}return false}))}function ue({readonly:e,disabled:t}){return!(e||t)}function le(e){return Boolean(o["default"].isArray(e)?e.length:e)}function se(e){const t={};e.forEach(((e,n)=>t[n]=e));return t}function oe(e,t){o["default"].forEach(t,((t,n)=>e.set(n,t)))}function fe(e){if(e<1e3){return`${e} bytes`}else if(e<1e6){return`${o["default"].round(e/1e3)}Kb`}else{return`${o["default"].round(e/1e6)}Mb`}}function ce(e,t,n){if(n){return e.label}const{props:r}=e;return t.length===1?r[t[0]]:o["default"](t).map((e=>r[e])).compact().value().join(" ")}function de(e){return e}const pe={"application/zip":{icon:"fal fa-file-archive",ext:".zip"},"application/pdf":{icon:"fal fa-file-pdf",ext:".pdf"},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{icon:"fal fa-file-word",ext:".docx"},"application/msword":{icon:"fal fa-file-word",ext:".doc"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{icon:"fal fa-file-excel",ext:".xlsx"},"application/vnd.ms-excel":{icon:"fal fa-file-excel",ext:".xls"},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{icon:"fal fa-file-powerpoint",ext:".pptx"},"application/vnd.ms-powerpoint":{icon:"fal fa-file-powerpoint",ext:".ppt"},"image/jpeg":{icon:"fal fa-file-image",ext:".jpeg"},"image/png":{icon:"fal fa-file-image",ext:".png"},"image/gif":{icon:"fal fa-file-image",ext:".gif"},"image/tiff":{icon:"fal fa-file-image",ext:".tiff"},"audio/mpeg":{icon:"fal fa-file-audio",ext:".mp3"},"video/mpeg":{icon:"fal fa-file-video",ext:".mpeg"},"video/quicktime":{icon:"fal fa-file-video",ext:".mov"},"video/x-msvideo":{icon:"fal fa-file-video",ext:".avi"}};function me(e){if(pe.hasOwnProperty(e)){return pe[e].icon}else{return"fal fa-file-alt"}}function he(e){if(pe.hasOwnProperty(e)){return pe[e].ext}else{return""}}function ye(e){const t=he(e);return t?t.substring(1):t}function ge(e,t,n=""){if(t==="size"){return fe(e.size)}else if(t==="lastModified"){return K(e.lastModified)}else if(t==="type"){return f["default"](`i.fal.fa-fw${n}`,{title:e.type,class:me(e.type)})}else{return e[t]}}function xe(e,t){return o["default"].map(te(e,{prop:t}),(e=>{const{_id:t,name:n}=e;return{guid:t,name:n,path:e.remoteUrl}}))}function ve(e,{id:t}){return c["default"](xe(e,t))}function we(e,t){return o["default"].get(e,t)}function be(e,t){const n=e();n.push(t);e(n)}function Se(e,t){const n=e();const r=o["default"].pullAt(n,t);e(n);return r}function Ie(e,{id:t}){const n=we(e,t);return n?c["default"](n):c["default"]()}function je(e,t){if(t){if(typeof e!=="object"||typeof e!==typeof t||o["default"].isArray(e)!==o["default"].isArray(t)){throw new Error("deepMerge only supports arrays and objects and cannot merge objects of different types.")}const n=o["default"].isArray(e)?[]:{};const r=o["default"].uniq([...o["default"].keys(e),...o["default"].keys(t)]);return o["default"].reduce(r,((n,r)=>{if(r in t&&!o["default"].isUndefined(t[r])){if(typeof e[r]==="object"){n[r]=je(e[r]||{},t[r])}else{n[r]=t[r]}}else{n[r]=e[r]}return n}),n)}return e}const Me={};const ke={};function Te(e,t){if(e in ke){throw new Error(`Component ${e} is already registered`)}else{ke[e]=t}}function Ae(e,t){if(e in Me){throw new Error(`Cell Renderer ${e} is already registered`)}else{Me[e]=t}}function Be({type:e,data:t,style:n,styleNS:r,styleM:a,styleL:i,classes:u}){const l=F({style:n,styleNS:r,styleM:a,styleL:i,classes:u});if(e in ke){return f["default"](ke[e],{type:e,data:t,classes:l})}else{return f["default"]("span",`Unknown component type: ${e}`)}}function Pe(e){return o["default"].map(e,(e=>Be(e)))}const Ce={["label"]:u.Label,["trusted"]:u.TextareaInput,["hidden"]:u.BaseInput,["text"]:u.BaseInput,["password"]:u.PasswordInput,["search"]:u.BaseInput,["date"]:u.BaseInput,["time"]:u.BaseInput,["datetime-local"]:u.BaseInput,["dateInput"]:u.DateInput,["cardDate"]:u.CardDateInput,["number"]:u.BaseInput,["range"]:u.BaseInput,["email"]:u.BaseInput,["url"]:u.BaseInput,["tel"]:u.BaseInput,["color"]:u.BaseInput,["currency"]:u.CurrencyInput,["percentage"]:u.PercentageInput,["textarea"]:u.TextareaInput,["checkbox"]:u.CheckboxInput,["toggle"]:u.ToggleInput,["select"]:u.SelectInput,["radio"]:u.RadioInput};const Re={["fileMulti"]:u.FileMulti,["file"]:u.FileSelect,["imageMulti"]:u.ImageMulti,["image"]:u.ImageSelect,["sign"]:u.SignBuilder};const Ee={};o["default"].forEach(Ce,((e,t)=>Ee[t]=1));o["default"].forEach(Re,((e,t)=>Ee[t]=2));function Fe(e){if(Re.hasOwnProperty(e)){return Re[e]}else{return Re["file"]}}function Oe(e){if(Ce.hasOwnProperty(e)){return Ce[e]}else{return Ce["text"]}}function De(e,t){if(e===2){return Fe(t)}else if(e===1){return Oe(t)}else{return undefined}}function $e(e="text"){return Ee[e]||3}const qe=/\s*\d{2}\/\d{2}\/\d{4}\s*$/;const Le=/\s*(([gG][iI][rR]\s*0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?\d\d?)|(([a-pr-uwyzA-PR-UWYZ]\d[a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]\d[abehmnprv-yABEHMNPRV-Y])))\s*\d[abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))\s*$/;function Ne(e){return function(t,n){return t.map((function(t){return e(t,n)}))}}const Ge={default:Ne((e=>e)),equals:Ne(((e,[t]=[])=>e===t)),"date-format":Ne((e=>e?N(Number(e)):"")),"dateStr-format":Ne((e=>e?N(new Date(String(e)).valueOf()):"")),"date-format-month":Ne((e=>e?N(Number(e),"dd MMMM yyyy"):"")),"date-endofday":Ne((e=>e?i.DateTime.fromISO(e,{setZone:true}).endOf("day").toISO():"")),substr:Ne(((e,[t=0,n]=[])=>String(e).substr(t,n))),upper:Ne((e=>String(e).toUpperCase())),lower:Ne((e=>String(e).toLowerCase())),snake:Ne((e=>o["default"].snakeCase(String(e)))),trunc:Ne((e=>o["default"].truncate(String(e),{length:15}))),"remove-whitespace":Ne((e=>e?o["default"].replace(String(e),/\s/g,""):"")),strLenEq:Ne(((e,[t]=[0])=>e?String(e).length===t:false)),strLenLt:Ne(((e,[t]=[0])=>e?String(e).length<t:false)),strLenGt:Ne(((e,[t]=[0])=>e?String(e).length>t:false)),boolean:Ne((e=>Boolean(e))),not:Ne((e=>!e)),"test-dob":Ne((e=>e?qe.test(String(e)):false)),"test-postcode":Ne((e=>e?Le.test(String(e)):false)),debug:Ne((e=>{console.debug(e);return e}))};function He(e,t,n){if(Ge.hasOwnProperty(e)){return Ge[e](t,n)}else{return Ge["default"](t)}}function Ue(e,t){if(!Ge.hasOwnProperty(e)){Ge[e]=t}}const Ve={default:e=>e.map((e=>o["default"].map(e,(({name:e})=>e)).join())),"file-name":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.name:"")).join())),"file-type":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.type:"")).join())),"file-size":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.size:"")).join())),"file-lastmodified":e=>e.map((e=>o["default"].map(e,(({file:e})=>e?e.lastModified:"")).join())),path:e=>e.map((e=>o["default"].map(e,(({path:e})=>e)).join())),dataUrl:e=>e.map((e=>o["default"].map(e,(({dataUrl:e})=>e?e:"")).join()))};function ze(e,t){if(Ve.hasOwnProperty(e)){return Ve[e](t)}else{return Ve["default"](t)}}function _e(e,t){if(!Ve.hasOwnProperty(e)){Ve[e]=t}}function We(e){return function(t){return c["default"].merge(t).map(e)}}const Ye={default:We((e=>e.join())),"join-space":We((e=>e.join(" "))),"join-newline":We((e=>e.join("\n"))),"join-underscore":We((e=>e.join("_"))),sum:We((e=>o["default"].reduce(e,((e,t)=>{const n=Number.parseInt(String(t));return o["default"].isNaN(n)?e:e+n}),0))),product:We((e=>o["default"].reduce(e,((e,t)=>{const n=Number.parseInt(String(t));return o["default"].isNaN(n)?0:e*n}),1))),and:We((e=>o["default"].reduce(e,((e,t)=>e?t:0),true))),or:We((e=>o["default"].reduce(e,((e,t)=>e||t?t:e),0))),any:We((e=>o["default"].some(e))),all:We((e=>o["default"].every(e,Boolean))),none:We((e=>o["default"].every(e,(e=>!e))))};function Ke(e,t){if(Ye.hasOwnProperty(e)){return Ye[e](t)}else{return Ye["default"](t)}}function Ze(e,t){if(!Ye.hasOwnProperty(e)){Ye[e]=t}}function Je(e){return"computed"in e&&e.computed!=null}function Qe(e,t){return o["default"].map(o["default"].compact(o["default"].at(e,t)),(({value:e})=>e))}function Xe(e,t,n){return o["default"].max(o["default"].map(t,(t=>{const r=o["default"].find(n,o["default"].matches({key:t}));return r&&r.computed?Xe(e+1,r.computed.keys,n):e})))||0}function et(e){return o["default"].sortBy(e,(t=>Xe(0,t.computed.keys,e)))}function tt(e){const t={};o["default"](e).reject(Je).reduce(((e,{key:t,fileValue:n,input:r,initialValue:a})=>{const i=r?$e(r.type):3;if(i===1){const n=c["default"]();if(a!=null){n(a)}e[t]={computed:false,type:i,value:n}}else if(i===2){const r=c["default"]([]);e[t]={computed:false,type:i,value:ze(n||"default",r),files:r}}return e}),t);o["default"](e).filter(Je).thru(et).reduce(((e,{key:t,computed:{keys:n,map:r="default",merge:a="default",args:i}})=>{let u;if(n.length>1){const t=Qe(e,n);u=Ke(a,t)}else if(n.length===1){u=Qe(e,n)[0]}if(u){e[t]={computed:true,type:1,value:He(r,u,i)}}else{e[t]={computed:true,type:1,value:c["default"](`#REF! ${n.join()}`)}}return e}),t);return{fields:o["default"](e).filter((e=>"input"in e)).map((({key:e,group:n,input:r,data:a,user:i,fieldSet:u})=>{const l=t[e];const s=l.type;return{key:e,group:n,input:r,type:s,data:a,user:i,fieldSet:u,computed:l.computed,widget:De(s,r.type||"text"),value:l.value,files:l.type===2?l.files:undefined}})).value(),streamMap:t}}function nt(e,t){return t?o["default"].assign({},e,t):e}function rt({type:e,input:t,widget:n,value:r,files:a},i){if(e===2&&t&&n&&a){return f["default"](n,{field:nt(t,i),value:a})}else if(e===1&&t&&n&&r){return f["default"](n,{field:nt(t,i),value:r})}return null}function at(e,t){return o["default"].map(e,(e=>rt(e,t)))}function it(e){return e.type===1}const ut=new Set(["checkbox","toggle","select","radio"]);function lt(e){var t;return it(e)&&((t=e.input)===null||t===void 0?void 0:t.type)&&!ut.has(e.input.type)}function st(e){return e.type===2}function ot(e){var t;return st(e)&&((t=e.input)===null||t===void 0?void 0:t.type)==="sign"}function ft(e){return o["default"].reduce(e.fields,((e,t)=>{const{key:n,value:r}=t;if(it(t)&&r&&r()!=null){e[n]=r()}return e}),{})}function ct(e,t){o["default"].forEach(t,((t,n)=>{if(n in e.streamMap){e.streamMap[n].value(t)}}))}e.ResponsiveThemeHandler=D;e.applyFileMap=ze;e.applyMap=He;e.applyMerge=Ke;e.assembleFormField=rt;e.assembleFormFieldList=at;e.buildComponent=Be;e.buildComponentList=Pe;e.buildFormFields=tt;e.buttonContextMapper=q;e.canEdit=ue;e.cellRendererMap=Me;e.createResponsiveClass=F;e.deepMerge=je;e.deserialise=ct;e.extractFields=ce;e.fileExt=he;e.fileExtNameOnly=ye;e.fileIcon=me;e.filterByProperty=te;e.formatDate=N;e.formatTime=G;e.getFileStream=ve;e.getFileValue=ge;e.getFiles=xe;e.getISODate=H;e.getProp=we;e.getPropStream=Ie;e.hasValue=le;e.humaniseByteCount=fe;e.humaniseTimeValue=U;e.isFileField=st;e.isPropField=it;e.isSignField=ot;e.isTextField=lt;e.itemsForCategory=ie;e.joinClasses=$;e.mapMixin=Ne;e.mapToObject=se;e.mergeMixin=We;e.parseDateStr=V;e.parseDateTimeStr=_;e.parseDateTimeValue=K;e.parseDateValue=W;e.parseIso=L;e.parseTimeStr=z;e.parseTimeValue=Y;e.pickById=X;e.pickByIdStream=ee;e.pickByProperty=Q;e.registerCellRenderer=Ae;e.registerComponent=Te;e.registerFileMapFn=_e;e.registerMapFn=Ue;e.registerMergeFn=Ze;e.removeByProperty=ne;e.serialise=ft;e.setMap=oe;e.simpleResponse=de;e.smallDevice=J;e.streamArrayPullAt=Se;e.streamArrayPush=be;e.tinyDevice=Z;Object.defineProperty(e,"__esModule",{value:true})}));
