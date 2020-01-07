(function(t,e){typeof exports==="object"&&typeof module!=="undefined"?e(exports,require("mithril"),require("lodash"),require("mithril/stream"),require("@sdxmessaging/ui-widgets"),require("pusher-js"),require("ag-grid-community")):typeof define==="function"&&define.amd?define(["exports","mithril","lodash","mithril/stream","@sdxmessaging/ui-widgets","pusher-js","ag-grid-community"],e):(t=t||self,e(t.uiBuilder={},t.m,t._,t.m.stream,t.uiWidgets,t.Pusher,t.agGrid))})(this,(function(t,e,n,r,i,o,a){"use strict";var s="default"in e?e["default"]:e;n=n&&n.hasOwnProperty("default")?n["default"]:n;r=r&&r.hasOwnProperty("default")?r["default"]:r;o=o&&o.hasOwnProperty("default")?o["default"]:o;var u={bind:function(){return null}};function l(t){var e=t.mock,n=t.apiKey,r=t.cloudChannel,i=t.companyChannel,a=t.userChannel,s=t.applicationChannel,l=t.applicationUserChannel;if(e){return{pusher:{},cloudChannel:u,companyChannel:u,userChannel:u,applicationChannel:u,applicationUserChannel:u}}var d=new o(n,{cluster:"eu",encrypted:true});return{pusher:d,cloudChannel:d.subscribe(r),companyChannel:d.subscribe(i),userChannel:d.subscribe(a),applicationChannel:d.subscribe(s),applicationUserChannel:d.subscribe(l)}}function d(t){var e=t.background,n=e===void 0?"DodgerBlue":e,r=t.highlight,o=r===void 0?"unset":r,a=t.text,s=a===void 0?"DodgerBlue":a,u=t.altText,l=u===void 0?"white":u,d=t.logoBackground,c=d===void 0?"transparent":d,f=t.logoBorderRadius,p=f===void 0?".25rem":f,h=t.headerHeight,g=h===void 0?"3rem":h,v=t.headerBackground,m=v===void 0?n:v,y=t.headerText,w=y===void 0?l:y,x=t.headerBorderRadius,C=x===void 0?"0px":x,k=t.panelBackground,O=k===void 0?"transparent":k,B=t.panelBorderRadius,F=B===void 0?".25rem":B,P=t.footerHeight,D=P===void 0?"3rem":P,H=t.footerBackground,S=H===void 0?"#F4F4F4":H,L=t.lineHeight,T=L===void 0?"1.9em":L,_=t.buttonBackground,E=_===void 0?n:_,R=t.buttonText,j=R===void 0?l:R,q=t.buttonBorderRadius,I=q===void 0?".25rem":q,G=t.tableHeaderBackground,U=G===void 0?n:G,W=t.tableHeaderText,A=W===void 0?l:W,M=t.primaryBackground,K=M===void 0?E:M,V=t.primaryText,z=V===void 0?j:V,$=t.bgInfo,J=$===void 0?"#357EDD":$,N=t.txtInfo,Q=N===void 0?"#FFFFFF":N,X=t.bgWarn,Y=X===void 0?"#FFD700":X,Z=t.txtWarn,tt=Z===void 0?"#111111":Z,et=t.bgError,nt=et===void 0?"#E7040F":et,rt=t.txtError,it=rt===void 0?"#FFFFFF":rt,ot=t.inpBrdClass,at=ot===void 0?"bn":ot;b.helper({shrink0:b.flexShrink("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:n}),branding:b.color(s),brandingAlt:b.color(l),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLogo:b({background:c}),brdLogo:b.br(p),headerHeight:b.height(g),bgHeader:b({background:m}),header:b.color(w),brdHeader:b.br(C),bgPanel:b({background:O}),brdPanel:b.br(F),footerHeight:b.height(D),bgFooter:b({background:S}),inputHeight:b.height(T),inputFocus:b({":focus":{"border-color":o}}),active:b({"box-shadow":"0px 0px 8px "+s}),inactive:b({":hover":{"box-shadow":"0px 0px 4px "+s}}),empty:b({background:"#FFF5BE"}),bgThead:b({background:U}),thead:b.color(A),bgButton:b({background:E}),button:b.color(j),brdButton:b({border:"none"}).br(I),bgPrimary:b({background:K}),primary:b.color(z),bgInfo:b({background:J}),info:b.color(Q),bgWarn:b({background:Y}),warn:b.color(tt),bgError:b({background:nt}),error:b.color(it)});i.updateTheme({icon:"fal",lblCol:b.branding,inpHgt:b.inputHeight.class,inpBrd:at+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnBrd:b.brdButton})}var c={header:{lhs:{},rhs:{}},theme:{}};var f=function(){function t(t){if(t===void 0){t=""}this.loadBranding=r(c);this.branding=this.loadBranding.map((function(t){return n.merge({},c,t)}));this.path=t;this.header=this.branding.map((function(t){var e=t.header,n=t.theme;d(n);return e}))}t.prototype.update=function(t){this.path=t;return this.load()};t.prototype.load=function(){return this.path?e.request(this.path).then(this.loadBranding):Promise.resolve()};return t}();function p(t){if(n.isString(t)){return e.request(t)}else{return Promise.resolve(t)}}function h(t,e){e({message:String(t.message),context:"error"});s.redraw()}function g(t,n,o){if(o===void 0){o={message:""}}window.history.replaceState(null,"",window.location.href);var a;var s;var u;var d=r(o);return p(n).then((function(n){a=n;i.updateConfig({signFont:"Caveat"});if(a.uiWidgets){i.updateConfig(a.uiWidgets)}s=new f(a.brandingPath);u=l(t);u.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));u.applicationUserChannel.bind("redirect",(function(t){return window.location.href=t.url}));u.applicationChannel.bind("reloadbranding",(function(){return s.load().then(e.redraw)}));u.applicationUserChannel.bind("notification",(function(t){return d(t)}));return s.load()})).catch((function(t){return h(t,d)})).then((function(){return{application:a,brand:s,pusher:u,notification:d}}))}function v(t){if(typeof t==="string"){return s("p",t)}else if(t.hasOwnProperty("selector")){var e=t;return s(e.selector,e.content)}else{var n=t;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:n.href},n.text)}}var m=function(){function t(){}t.prototype.view=function(t){var e=t.attrs.data;return s(".ph4",n.map(e,(function(t){return v(t)})))};return t}();var y={};function w(t,e){if(t in y){throw new Error("Component "+t+" is already registered")}else{y[t]=e}}w("basic",m);function x(t){var e=t.type,n=t.data;if(e in y){return s(y[e],{type:e,data:n})}else{return s("span","Unknown component type: "+e)}}function C(t){return n.map(t,(function(t){return x(t)}))}var k=function(){function t(){}t.prototype.view=function(t){var e=t.attrs;if(e.hasOwnProperty("type")){return x(e)}else if(e.hasOwnProperty("icon")){var n=e;return s(".flex.items-center.mh2",{class:n.classes},s("i.fal.fa-2x.mr2",{class:n.icon}),n.title)}else if(e.hasOwnProperty("src")){var r=e;return s(".flex.items-center.mh2"+b.bgLogo.brdLogo,{class:r.classes},s("img.img",{src:r.src,class:r.imageClass,height:r.height,width:r.width}),r.title)}else{var i=e;return s(".mh2",{class:i.classes},i.title||"")}};return t}();function O(t){if(t===void 0){t="info"}switch(t){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var B=function(){function t(){this.active=false}t.prototype.oninit=function(t){var e=this;var n=t.attrs.notification;n.map((function(t){var n=t.message,i=t.duration,o=i===void 0?3e3:i;if(n){e.active=true;setTimeout((function(){return e.dismiss()}),o)}return r.SKIP}))};t.prototype.view=function(t){var e=this;var n=t.attrs.notification;var r=n(),i=r.message,o=r.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return e.dismiss()},class:O(o),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},i)};t.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return t}();function F(t){return(t*100).toFixed(0)+"%"}var P=function(){function t(){this.saving=r();this.progress=r()}t.prototype.oninit=function(t){var e=t.attrs,n=e.saving,r=e.progress;if(n){this.saving=n}if(r){this.progress=r}};t.prototype.view=function(t){var e=t.attrs,n=e.application,r=n.version,i=n.auth,o=e.header,a=o.lhs,u=o.rhs,l=e.notification,d=e.containerClass,c=d===void 0?"mv2-l mw8-l shadow-4-l":d,f=e.headerClass,p=f===void 0?"":f,h=e.footerClass,g=h===void 0?"":h,v=e.logout,m=v===void 0?true:v,y=t.children;var w=this.saving();var x=w?this.progress():0;return[s("span.clip",{style:{"font-family":"Caveat"}},"test"),l?s(B,{notification:l}):null,s("main.flex-auto.flex.flex-column.self-center.w-100",{class:c},[s(".w-100",{class:p},s(".flex.justify-between.items-center"+b.shrink0.headerHeight.bgHeader.header,[s(k,a),s(k,u)])),y]),s(".w-100",{class:g},s("nav.ph2.flex.items-center.content-end"+b.footerHeight.bgFooter,[s("p.mr-auto.f7.silver",{title:r},s.trust("&copy; 2019 Secure Digital Exchange Limited")),s("span.ma2.f3.silver",{class:x?"":"dn"},F(x)),s("i.f3.mid-gray.fal.fa-spinner",{class:w?"fa-spin":"dn"}),i&&m?s("a.ml2.mid-gray",{href:i.logoutPath},s("i.fal.fa-fw.fa-2x.fa-sign-out-alt[aria-hidden=true]")):null]))]};return t}();var D=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,n=e.header,r=e.subheader,i=e.content,o=e.footer;return[n?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,n):null,r?s("div"+b.shrink0,r):null,s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,i),o]};return t}();var H=function(){function t(){this.id=n.uniqueId("search-")}t.prototype.view=function(t){var e=t.attrs,n=e.placeholder,r=e.searchValue;return s("form.flex.flex-row.items-center.bg-light-gray",{onsubmit:function(){return false}},s("label.fal.fa-fw.fa-search.w2.pv2.pl2.tc.light-blue.pointer",{for:this.id}),s(i.BaseInput,{field:{id:this.id,label:"",type:"search",classes:"pa2 bg-transparent",placeholder:n,instant:true},value:r}),r()?s("i.fal.fa-fw.fa-times.pa2.tc.black-50.pointer.dim",{title:"Reset Search",onclick:function(){return r("")}}):null)};return t}();var S=function(){function t(){this.gridOptions={suppressCellSelection:true,rowData:[]}}t.prototype.oncreate=function(t){var e=this;var n=t.dom,r=t.attrs,i=r.columnDefs,o=r.filter,s=r.test,u=r.load;this.gridOptions.columnDefs=i;this.gridOptions.context=o();this.gridOptions.isExternalFilterPresent=function(){return o().length>0};this.gridOptions.doesExternalFilterPass=s;new a.Grid(n,this.gridOptions);this.showLoading();u({offset:0,limit:-1}).then((function(t){var n;e.hideLoading();(n=e.gridOptions.api)===null||n===void 0?void 0:n.setRowData(t)}))};t.prototype.onupdate=function(t){var e=t.attrs.filter;if(this.gridOptions.context===e()){return}this.gridOptions.context=e();if(this.gridOptions.api){this.gridOptions.api.onFilterChanged();this.gridOptions.api.redrawRows()}};t.prototype.onremove=function(){var t;(t=this.gridOptions.api)===null||t===void 0?void 0:t.destroy()};t.prototype.view=function(){return s(".h-100.flex-auto.ag-theme-balham")};t.prototype.showLoading=function(){var t;(t=this.gridOptions.api)===null||t===void 0?void 0:t.showLoadingOverlay()};t.prototype.hideLoading=function(){var t;(t=this.gridOptions.api)===null||t===void 0?void 0:t.hideOverlay()};return t}();var L=this&&this.__extends||function(){var t=function(e,n){t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)if(e.hasOwnProperty(n))t[n]=e[n]};return t(e,n)};return function(e,n){t(e,n);function r(){this.constructor=e}e.prototype=n===null?Object.create(n):(r.prototype=n.prototype,new r)}}();function T(t,e,n){return{getRows:function(r){var i=r.startRow,o=r.endRow,a=r.successCallback,s=r.failCallback;var u=o-i;e();t({offset:i,limit:u+1}).then((function(t){if(t.length>u){a(t.slice(0,u))}else{a(t,i+t.length)}})).catch(s).then((function(){return n()}))}}}var _=function(t){L(e,t);function e(){var e=t!==null&&t.apply(this,arguments)||this;e.gridOptions={suppressCellSelection:true,rowModelType:"infinite",blockLoadDebounceMillis:400};return e}e.prototype.oncreate=function(t){var e=t.dom,r=t.attrs,i=r.columnDefs,o=r.filter,s=r.load;this.gridOptions.columnDefs=i;this.gridOptions.context=o();this.gridOptions.datasource=T(s,n.bind(this.showLoading,this),n.bind(this.hideLoading,this));new a.Grid(e,this.gridOptions)};e.prototype.view=function(){return s(".h-100.flex-auto.ag-theme-balham")};return e}(S);(function(t){t[t["Single"]=0]="Single";t[t["Paging"]=1]="Paging"})(t.GridType||(t.GridType={}));function E(e,n,r){var i=r.fullScreen,o=i===void 0?true:i,a=r.type,u=a===void 0?t.GridType.Single:a,l=r.filter,d=r.columnDefs,c=r.test,f=r.load;g(e,n).then((function(e){var n=e.application,r=e.brand,i=e.notification;s.mount(document.getElementById("page"),{view:function(){return s(P,{header:r.header(),application:n,notification:i,containerClass:o?"":undefined},s(D,{subheader:s(H,{placeholder:"Search",searchValue:l}),content:s(".pa2.flex.flex-column.aspect-ratio--object",[s(u===t.GridType.Single?S:_,{columnDefs:d,filter:l,test:c,load:f})])}))}})}))}t.buildComponent=x;t.buildComponentList=C;t.grid=E;t.registerComponent=w;Object.defineProperty(t,"__esModule",{value:true})}));
