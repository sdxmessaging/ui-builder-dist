(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js"),require("ag-grid-community")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js","ag-grid-community"],t):(e=e||self,t(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher,e.agGrid))})(this,(function(e,t,n,r,i,o,a){"use strict";var s="default"in t?t["default"]:t;n=n&&n.hasOwnProperty("default")?n["default"]:n;r=r&&r.hasOwnProperty("default")?r["default"]:r;o=o&&o.hasOwnProperty("default")?o["default"]:o;var d={bind:function(){return null}};function u(e){var t=e.mock,n=e.apiKey,r=e.cloudChannel,i=e.companyChannel,a=e.userChannel,s=e.applicationChannel,u=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:d,companyChannel:d,userChannel:d,applicationChannel:d,applicationUserChannel:d}}var c=new o(n,{cluster:"eu",encrypted:true});return{pusher:c,cloudChannel:c.subscribe(r),companyChannel:c.subscribe(i),userChannel:c.subscribe(a),applicationChannel:c.subscribe(s),applicationUserChannel:c.subscribe(u)}}function c(e){var t=e.layoutBackground,n=t===void 0?"transparent":t,r=e.layoutLMaxWidth,o=r===void 0?"64rem":r,a=e.layoutLShadow,s=a===void 0?"2px 2px 8px 0 rgba(0,0,0,.2)":a,d=e.bodyText,u=d===void 0?"#333333":d,c=e.bodyFontSize,l=c===void 0?"1.25rem":c,f=e.bodyFontWeight,h=f===void 0?"200":f,p=e.background,g=p===void 0?"DodgerBlue":p,v=e.highlight,m=v===void 0?"unset":v,y=e.text,w=y===void 0?"DodgerBlue":y,x=e.icon,k=x===void 0?w:x,C=e.altText,B=C===void 0?"white":C,O=e.logoMargin,F=O===void 0?"0.5rem":O,P=e.logoBackground,S=P===void 0?"transparent":P,H=e.logoBorderRadius,L=H===void 0?".25rem":H,T=e.headerHeight,D=T===void 0?"3rem":T,I=e.headerBackground,W=I===void 0?g:I,_=e.headerBorderBottom,E=_===void 0?"none":_,R=e.headerBorderRadius,j=R===void 0?"0px":R,q=e.headerText,z=q===void 0?B:q,G=e.subheadingText,U=G===void 0?"rgba(0,0,0,.5)":G,M=e.cardHeight,A=M===void 0?"12em":M,$=e.cardWidth,K=$===void 0?"12em":$,N=e.cardHeightNs,V=N===void 0?A:N,J=e.cardWidthNs,Q=J===void 0?K:J,X=e.cardText,Y=X===void 0?B:X,Z=e.cardBackground,ee=Z===void 0?g:Z,te=e.cardBorderRadius,ne=te===void 0?"0px":te,re=e.cardShadow,ie=re===void 0?"unset":re,oe=e.cardHeaderFontSize,ae=oe===void 0?"1.25rem":oe,se=e.cardSubheadingFontSize,de=se===void 0?"1.25rem":se,ue=e.cardSubheadingPadding,ce=ue===void 0?".25rem .5rem":ue,le=e.cardHeaderOrder,fe=le===void 0?"0":le,he=e.cardIconOrder,pe=he===void 0?"1":he,be=e.panelBackground,ge=be===void 0?"transparent":be,ve=e.panelBorderRadius,me=ve===void 0?".25rem":ve,ye=e.footerHeight,we=ye===void 0?"3rem":ye,xe=e.footerBackground,ke=xe===void 0?"#F4F4F4":xe,Ce=e.footerText,Be=Ce===void 0?"#999":Ce,Oe=e.lineHeight,Fe=Oe===void 0?"1.9em":Oe,Pe=e.buttonBackground,Se=Pe===void 0?g:Pe,He=e.buttonText,Le=He===void 0?B:He,Te=e.buttonPadding,De=Te===void 0?".5rem":Te,Ie=e.buttonBorderRadius,We=Ie===void 0?".25rem":Ie,_e=e.tableHeaderBackground,Ee=_e===void 0?g:_e,Re=e.tableHeaderText,je=Re===void 0?B:Re,qe=e.primaryBackground,ze=qe===void 0?Se:qe,Ge=e.primaryText,Ue=Ge===void 0?Le:Ge,Me=e.bgInfo,Ae=Me===void 0?"#357EDD":Me,$e=e.txtInfo,Ke=$e===void 0?"#FFFFFF":$e,Ne=e.bgWarn,Ve=Ne===void 0?"#FFD700":Ne,Je=e.txtWarn,Qe=Je===void 0?"#111111":Je,Xe=e.bgError,Ye=Xe===void 0?"#E7040F":Xe,Ze=e.txtError,et=Ze===void 0?"#FFFFFF":Ze,tt=e.inpBrdClass,nt=tt===void 0?"bn":tt;b.helper({shrink0:b.flexShrink("0"),flexImg:b.objectFit("contain").minHeight("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:g}),branding:b.color(w),icon:b.color(k),brandingAlt:b.color(B),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:n}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":o,"box-shadow":s})),body:b.c(u),bodyFSize:b.fs(l),bodyFWeight:b({"font-weight":h}),marginLogo:b.m(F),bgLogo:b({background:S}),brdLogo:b.br(L),headerHeight:b.h(D),bgHeader:b({background:W}),bbHeader:b({"border-bottom":E}),brdHeader:b.br(j),header:b.c(z),subheading:b.c(U),cardSize:b.h(A).w(K).$media("screen and (min-width:30em)",b.h(V).w(Q)),card:b.c(Y),bgCard:b({background:ee}),brdCard:b.br(ne),shadowCard:b({"box-shadow":ie}),cardHead:b({order:fe}).fs(ae),cardIcon:b({order:pe}),cardSub:b({order:"3"}).p(ce).fs(de),bgPanel:b({background:ge}),brdPanel:b.br(me),footerHeight:b.h(we),bgFooter:b({background:ke}),footer:b.c(Be),inputHeight:b.h(Fe),inputFocus:b({":focus":{"border-color":m}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:Ee}),thead:b.c(je),bgButton:b({background:Se}),button:b.c(Le),padButton:b.p(De),brdButton:b({border:"none"}).br(We),bgPrimary:b({background:ze}),primary:b.c(Ue),bgInfo:b({background:Ae}),info:b.c(Ke),bgWarn:b({background:Ve}),warn:b.c(Qe),bgError:b({background:Ye}),error:b.c(et)});i.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:nt+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:"shadow-4 "+b.brdButton.class})}var l={header:{lhs:{},rhs:{}},theme:{}};var f=function(){function e(e){if(e===void 0){e=""}this.loadBranding=n(l);this.branding=this.loadBranding.map((function(e){return r.merge({},l,e)}));this.path=e;this.header=this.branding.map((function(e){var t=e.header,n=e.theme;c(n);return t}))}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?t.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function h(e){if(r.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function p(e,n){n({message:String(e.message),context:"error"});t.redraw()}function g(e,n){window.history.replaceState(null,"",window.location.href);var o;var a;var s;return h(e).then((function(e){o=e;i.updateConfig({signFont:"Caveat"});if(o.uiWidgets){i.updateConfig(o.uiWidgets)}a=new f(o.brandingPath);s=u(o.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));s.applicationChannel.bind("reloadbranding",(function(){return a.load().then(t.redraw)}));s.applicationUserChannel.bind("notification",(function(e){n(e);t.redraw()}));return Promise.all([a.load().catch(r.noop),new Promise((function(e){s.pusher.connection.bind("connected",(function(){return e()}))}))])})).catch((function(e){return p(e,n)})).then((function(){s.pusher.connection.unbind("connected");return{application:o,brand:a,pusher:s}}))}function v(e){if(typeof e==="string"){return s("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return s(t.selector,t.content)}else{var n=e;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:n.href},n.text)}}var m=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return s(".ph4",r.map(t,(function(e){return v(e)})))};return e}();var y={};function w(e,t){if(e in y){throw new Error("Component "+e+" is already registered")}else{y[e]=t}}w("basic",m);function x(e){var t=e.type,n=e.data;if(t in y){return s(y[t],{type:t,data:n})}else{return s("span","Unknown component type: "+t)}}function k(e){return r.map(e,(function(e){return x(e)}))}var C=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return x(t)}else if(t.hasOwnProperty("icon")){var n=t;return s(".flex.items-center.mh2",{class:n.classes},s("i.fal.fa-2x.mr2",{class:n.icon}),n.title)}else if(t.hasOwnProperty("src")){var r=t;return s(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:r.classes},s("img.img",{src:r.src,class:r.imageClass,height:r.height,width:r.width}),r.title)}else{var i=t;return s(".mh2",{class:i.classes},i.title||"")}};return e}();function B(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var O=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var r=e.attrs.notification;r.map((function(e){var r=e.message,i=e.duration,o=i===void 0?3e3:i;if(r){t.active=true;setTimeout((function(){return t.dismiss()}),o)}return n.SKIP}))};e.prototype.view=function(e){var t=this;var n=e.attrs.notification;var r=n(),i=r.message,o=r.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:B(o),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},i)};e.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return e}();function F(e){return(e*100).toFixed(0)+"%"}var P=function(){function e(){this.saving=n();this.progress=n()}e.prototype.oninit=function(e){var t=e.attrs,n=t.saving,r=t.progress;if(n){this.saving=n}if(r){this.progress=r}};e.prototype.view=function(e){var t=e.attrs,n=t.application,r=n.version,i=n.auth,o=n.copyright,a=o===void 0?"2020 Secure Digital Exchange Limited":o,d=t.header,u=d.lhs,c=d.rhs,l=t.notification,f=t.fullScreen,h=t.headerClass,p=h===void 0?"":h,g=t.footerClass,v=g===void 0?"":g,m=t.logout,y=m===void 0?true:m,w=e.children;var x=this.saving();var k=x?this.progress():0;return[l?s(O,{notification:l}):null,s("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:f?undefined:b.layoutL.class},[s(".w-100",{class:p},s(".flex.justify-between.items-center"+b.shrink0.header.headerHeight.bgHeader.bbHeader.brdHeader,[s(C,u),s(C,c)])),w]),s(".w-100",{class:v},s("nav.ph2.flex.items-center.content-end"+b.footerHeight.bgFooter.footer,[s("p.center.f7",{title:r},[s.trust("&copy; "),a]),s("span.ma2.f3",{class:k?"":"dn"},F(k)),s("i.f3.fal.fa-spinner",{class:x?"fa-spin":"dn"}),i&&y?s("a.link.flex.items-center.ml2"+b.footer,{href:i.logoutPath},[i.logoutLabel?s("span.mr2",i.logoutLabel):null,i.logoutIcon?s("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:i.logoutIcon}):s("i.fal.fa-fw.fa-2x.fa-sign-out-alt[aria-hidden=true]")]):null]))]};return e}();var S=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.header,r=t.headerClass,i=t.subheader,o=t.subheaderClass,a=t.content,d=t.wrapContent,u=d===void 0?true:d,c=t.footer;return[n?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:r},n):null,i?s("div"+b.shrink0,{class:o},i):null,u?s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,a):a,c]};return e}();var H=function(){function e(){this.id=r.uniqueId("search-")}e.prototype.view=function(e){var t=e.attrs,n=t.placeholder,r=t.searchValue;return s("form.flex.flex-row.items-center.bg-light-gray",{onsubmit:function(){return false}},s("label.fal.fa-fw.fa-search.w2.pv2.pl2.tc.pointer"+b.icon,{for:this.id}),s(i.BaseInput,{field:{id:this.id,label:"",type:"search",classes:"pa2 bg-transparent",placeholder:n,instant:true},value:r}),r()?s("i.fal.fa-fw.fa-times.pa2.tc.pointer.dim"+b.subheading,{title:"Reset Search",onclick:function(){return r("")}}):null)};return e}();var L=function(){function e(){this.gridOptions={suppressCellSelection:true,rowData:[]}}e.prototype.oncreate=function(e){var t=this;var n=e.dom,r=e.attrs,i=r.columnDefs,o=r.filter,s=r.test,d=r.load;this.gridOptions.columnDefs=i;this.gridOptions.context=o();this.gridOptions.isExternalFilterPresent=function(){return o().length>0};this.gridOptions.doesExternalFilterPass=s;new a.Grid(n,this.gridOptions);this.showLoading();d({offset:0,limit:-1}).then((function(e){var n;t.hideLoading();(n=t.gridOptions.api)===null||n===void 0?void 0:n.setRowData(e)}))};e.prototype.onupdate=function(e){var t=e.attrs.filter;if(this.gridOptions.context===t()){return}this.gridOptions.context=t();if(this.gridOptions.api){this.gridOptions.api.onFilterChanged();this.gridOptions.api.redrawRows()}};e.prototype.onremove=function(){var e;(e=this.gridOptions.api)===null||e===void 0?void 0:e.destroy()};e.prototype.view=function(){return s(".h-100.flex-auto.ag-theme-balham")};e.prototype.showLoading=function(){var e;(e=this.gridOptions.api)===null||e===void 0?void 0:e.showLoadingOverlay()};e.prototype.hideLoading=function(){var e;(e=this.gridOptions.api)===null||e===void 0?void 0:e.hideOverlay()};return e}();var T=this&&this.__extends||function(){var e=function(t,n){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)if(t.hasOwnProperty(n))e[n]=t[n]};return e(t,n)};return function(t,n){e(t,n);function r(){this.constructor=t}t.prototype=n===null?Object.create(n):(r.prototype=n.prototype,new r)}}();function D(e,t,n){return{getRows:function(r){var i=r.startRow,o=r.endRow,a=r.successCallback,s=r.failCallback;var d=o-i;t();e({offset:i,limit:d+1}).then((function(e){if(e.length>d){a(e.slice(0,d))}else{a(e,i+e.length)}})).catch(s).then((function(){return n()}))}}}var I=function(e){T(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.gridOptions={suppressCellSelection:true,rowModelType:"infinite",blockLoadDebounceMillis:400};return t}t.prototype.oncreate=function(e){var t=e.dom,n=e.attrs,i=n.columnDefs,o=n.filter,s=n.load;this.gridOptions.columnDefs=i;this.gridOptions.context=o();this.gridOptions.datasource=D(s,r.bind(this.showLoading,this),r.bind(this.hideLoading,this));new a.Grid(t,this.gridOptions)};t.prototype.view=function(){return s(".h-100.flex-auto.ag-theme-balham")};return t}(L);(function(e){e[e["Single"]=0]="Single";e[e["Paging"]=1]="Paging"})(e.GridType||(e.GridType={}));function W(t,r){var i=r.notification,o=i===void 0?n({message:""}):i,a=r.fullScreen,d=a===void 0?true:a,u=r.type,c=u===void 0?e.GridType.Single:u,l=r.filter,f=r.columnDefs,h=r.test,p=r.load;return g(t,o).then((function(t){var n=t.application,r=t.brand,i=t.pusher;s.mount(document.getElementById("page"),{view:function(){return s(P,{header:r.header(),application:n,notification:o,fullScreen:d},s(S,{subheader:s(H,{placeholder:"Search",searchValue:l}),content:s(".pa2.flex.flex-column.aspect-ratio--object",[s(c===e.GridType.Single?L:I,{columnDefs:f,filter:l,test:h,load:p})])}))}});return{application:n,pusher:i}}))}e.buildComponent=x;e.buildComponentList=k;e.grid=W;e.registerComponent=w;Object.defineProperty(e,"__esModule",{value:true})}));
