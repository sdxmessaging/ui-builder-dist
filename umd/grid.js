(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js"),require("ag-grid-community")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js","ag-grid-community"],t):(e=e||self,t(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher,e.agGrid))})(this,(function(e,t,n,r,i,o,a){"use strict";var s="default"in t?t["default"]:t;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n["default"]:n;r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r["default"]:r;o=o&&Object.prototype.hasOwnProperty.call(o,"default")?o["default"]:o;var d={bind:function(){return null}};function u(e){var t=e.mock,n=e.apiKey,r=e.cloudChannel,i=e.companyChannel,a=e.userChannel,s=e.applicationChannel,u=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:d,companyChannel:d,userChannel:d,applicationChannel:d,applicationUserChannel:d}}var c=new o(n,{cluster:"eu",encrypted:true});return{pusher:c,cloudChannel:c.subscribe(r),companyChannel:c.subscribe(i),userChannel:c.subscribe(a),applicationChannel:c.subscribe(s),applicationUserChannel:c.subscribe(u)}}var c={button:"",gridFlex:""};function l(e){var t=e.layoutBackground,n=t===void 0?"transparent":t,o=e.layoutLMaxWidth,a=o===void 0?"64rem":o,s=e.layoutLShadow,d=s===void 0?"unset":s,u=e.bodyText,l=u===void 0?"#333333":u,f=e.bodyFontSize,p=f===void 0?"1.25rem":f,h=e.bodyFontWeight,g=h===void 0?"200":h,v=e.background,m=v===void 0?"DodgerBlue":v,y=e.highlight,w=y===void 0?"unset":y,x=e.text,k=x===void 0?"DodgerBlue":x,C=e.icon,B=C===void 0?k:C,F=e.altText,O=F===void 0?"white":F,P=e.logoMargin,S=P===void 0?"0.5rem":P,H=e.logoBackground,L=H===void 0?"transparent":H,T=e.logoBorderRadius,D=T===void 0?".25rem":T,_=e.headerHeight,j=_===void 0?"3rem":_,I=e.headerBackground,W=I===void 0?m:I,E=e.headerBorderBottom,R=E===void 0?"none":E,q=e.headerBorderRadius,z=q===void 0?"0px":q,G=e.headerText,U=G===void 0?O:G,M=e.subheadingText,A=M===void 0?"rgba(0,0,0,.5)":M,$=e.cardHeight,K=$===void 0?"12em":$,N=e.cardWidth,V=N===void 0?"12em":N,J=e.cardHeightNs,Q=J===void 0?K:J,X=e.cardWidthNs,Y=X===void 0?V:X,Z=e.cardText,ee=Z===void 0?O:Z,te=e.cardBackground,ne=te===void 0?m:te,re=e.cardBorderRadius,ie=re===void 0?"0px":re,oe=e.cardShadow,ae=oe===void 0?"unset":oe,se=e.cardHeaderFontSize,de=se===void 0?"1.25rem":se,ue=e.cardSubheadingFontSize,ce=ue===void 0?"1.25rem":ue,le=e.cardSubheadingPadding,fe=le===void 0?".25rem .5rem":le,pe=e.cardHeaderOrder,he=pe===void 0?"0":pe,be=e.cardIconOrder,ge=be===void 0?"1":be,ve=e.panelBackground,me=ve===void 0?"transparent":ve,ye=e.panelBorderRadius,we=ye===void 0?".25rem":ye,xe=e.footerHeight,ke=xe===void 0?"3rem":xe,Ce=e.footerBackground,Be=Ce===void 0?"#F4F4F4":Ce,Fe=e.footerText,Oe=Fe===void 0?"#999":Fe,Pe=e.lineHeight,Se=Pe===void 0?"1.9em":Pe,He=e.buttonBackground,Le=He===void 0?m:He,Te=e.buttonText,De=Te===void 0?O:Te,_e=e.buttonPadding,je=_e===void 0?".5rem":_e,Ie=e.buttonBorderRadius,We=Ie===void 0?".25rem":Ie,Ee=e.tableHeaderBackground,Re=Ee===void 0?m:Ee,qe=e.tableHeaderText,ze=qe===void 0?O:qe,Ge=e.primaryBackground,Ue=Ge===void 0?Le:Ge,Me=e.primaryText,Ae=Me===void 0?De:Me,$e=e.bgInfo,Ke=$e===void 0?"#357EDD":$e,Ne=e.txtInfo,Ve=Ne===void 0?"#FFFFFF":Ne,Je=e.bgWarn,Qe=Je===void 0?"#FFD700":Je,Xe=e.txtWarn,Ye=Xe===void 0?"#111111":Xe,Ze=e.bgError,et=Ze===void 0?"#E7040F":Ze,tt=e.txtError,nt=tt===void 0?"#FFFFFF":tt,rt=e.inpBrdClass,it=rt===void 0?"bn":rt,ot=e.button,at=ot===void 0?"shadow-4":ot,st=e.gridFlex,dt=st===void 0?"flex flex-wrap justify-center":st;b.helper({shrink0:b.flexShrink("0"),flexImg:b.objectFit("contain").minHeight("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:m}),branding:b.color(k),icon:b.color(B),brandingAlt:b.color(O),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:n}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":a,"box-shadow":d})),body:b.c(l),bodyFSize:b.fs(p),bodyFWeight:b({"font-weight":g}),marginLogo:b.m(S),bgLogo:b({background:L}),brdLogo:b.br(D),headerHeight:b.h(j),bgHeader:b({background:W}),bbHeader:b({"border-bottom":R}),brdHeader:b.br(z),header:b.c(U),subheading:b.c(A),cardSize:b.h(K).w(V).$media("screen and (min-width:30em)",b.h(Q).w(Y)),card:b.c(ee),bgCard:b({background:ne}),brdCard:b.br(ie),shadowCard:b({"box-shadow":ae}),cardHead:b({order:he}).fs(de),cardIcon:b({order:ge}),cardSub:b({order:"3"}).p(fe).fs(ce),bgPanel:b({background:me}),brdPanel:b.br(we),footerHeight:b.h(ke),bgFooter:b({background:Be}),footer:b.c(Oe),inputHeight:b.h(Se),inputFocus:b({":focus":{"border-color":w}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:Re}),thead:b.c(ze),bgButton:b({background:Le}),button:b.c(De),padButton:b.p(je),brdButton:b({border:"none"}).br(We),bgPrimary:b({background:Ue}),primary:b.c(Ae),bgInfo:b({background:Ke}),info:b.c(Ve),bgWarn:b({background:Qe}),warn:b.c(Ye),bgError:b({background:et}),error:b.c(nt)});r.assign(c,{button:at,gridFlex:dt});i.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:it+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:c.button+" "+b.brdButton.class})}var f={header:{lhs:{},rhs:{}},theme:{}};var p=function(){function e(e){if(e===void 0){e=""}this.loadBranding=n(f);this.branding=this.loadBranding.map((function(e){return r.merge({},f,e)}));this.path=e;this.header=this.branding.map((function(e){var t=e.header,n=e.theme;l(n);return t}))}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?t.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function h(e){if(r.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function g(e,n){n({message:String(e.message),context:"error"});t.redraw()}function v(e,n){window.history.replaceState(null,"",window.location.href);var o;var a;var s;return h(e).then((function(e){o=e;i.updateConfig({signFont:"Caveat"});if(o.uiWidgets){i.updateConfig(o.uiWidgets)}a=new p(o.brandingPath);s=u(o.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));s.applicationChannel.bind("reloadbranding",(function(){return a.load().then(t.redraw)}));s.applicationUserChannel.bind("notification",(function(e){n(e);t.redraw()}));return Promise.all([a.load().catch(r.noop),new Promise((function(e){s.pusher.connection.bind("connected",(function(){return e()}))}))])})).catch((function(e){return g(e,n)})).then((function(){s.pusher.connection.unbind("connected");return{application:o,brand:a,pusher:s}}))}function m(e){if(typeof e==="string"){return s("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return s(t.selector,t.content)}else{var n=e;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:n.href},n.text)}}var y=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return s(".ph4",r.map(t,(function(e){return m(e)})))};return e}();var w={};function x(e,t){if(e in w){throw new Error("Component "+e+" is already registered")}else{w[e]=t}}x("basic",y);function k(e){var t=e.type,n=e.data;if(t in w){return s(w[t],{type:t,data:n})}else{return s("span","Unknown component type: "+t)}}function C(e){return r.map(e,(function(e){return k(e)}))}var B=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return k(t)}else if(t.hasOwnProperty("icon")){var n=t;return s(".flex.items-center.mh2",{class:n.classes},s("i.fal.fa-2x.mr2",{class:n.icon}),n.title)}else if(t.hasOwnProperty("src")){var r=t;return s(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:r.classes},s("img.img",{src:r.src,class:r.imageClass,height:r.height,width:r.width}),r.title)}else{var i=t;return s(".mh2",{class:i.classes},i.title||"")}};return e}();var F=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.auth,r=n.logoutPath,i=n.logoutLabel,o=n.logoutIcon,a=o===void 0?"fa-sign-out-alt":o,d=t.classes;return s("a.link.ma2",{href:r,class:d},[i?s("span.mr2",i):null,s("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:a})])};return e}();function O(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var P=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var r=e.attrs.notification;r.map((function(e){var r=e.message,i=e.duration,o=i===void 0?3e3:i;if(r){t.active=true;setTimeout((function(){return t.dismiss()}),o)}return n.SKIP}))};e.prototype.view=function(e){var t=this;var n=e.attrs.notification;var r=n(),i=r.message,o=r.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:O(o),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},i)};e.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return e}();function S(e){return(e*100).toFixed(0)+"%"}var H=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.application,r=n.version,i=n.auth,o=n.poweredBy,a=o===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:o,d=n.copyright,u=d===void 0?"":d,c=t.header,l=c.lhs,f=c.rhs,p=t.notification,h=t.saving,g=t.progress,v=t.fullScreen,m=t.responsiveHeader,y=t.responsiveFooter,w=t.logout,x=w===void 0?true:w,k=e.children;var C=h?h():false;var O=C&&g?g():0;return[p?s(P,{notification:p}):null,s("nav.items-center.self-center.w-100"+b.header.headerHeight.bgHeader.bbHeader.brdHeader.shrink0,{class:(m?"dn flex-l":"flex")+" "+(v?"":b.layoutL.class)},[s(B,l),s(".ml-auto",s(B,f)),i&&x?s(F,{auth:i,classes:"items-center dn flex-l "+b.header.class}):null]),s("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:v?undefined:b.layoutL.class},k),s("nav.w-100.items-center.content-end"+b.footerHeight.bgFooter.footer,{class:y?"dn flex-l":"flex"},[a?s("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:a.href},s("img.img.h-100.o-80",{src:a.src,title:a.title})):null,s("p.center.f7",{title:r},u?[s.trust("&copy; "),u]:null),s("span.ma2.f3",{class:O?"":"dn"},S(O)),s("i.ma2.f3.fal.fa-spinner",{class:C?"fa-spin":"dn"}),i&&x?s(F,{auth:i,classes:"items-center flex dn-l "+b.footer.class}):null])]};return e}();var L=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.header,r=t.headerClass,i=t.subheader,o=t.subheaderClass,a=t.content,d=t.wrapContent,u=d===void 0?true:d,c=t.footer;return[n?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:r},n):null,i?s("div"+b.shrink0,{class:o},i):null,u?s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,a):a,c]};return e}();var T=function(){function e(){this.id=r.uniqueId("search-")}e.prototype.view=function(e){var t=e.attrs,n=t.placeholder,r=t.searchValue;return s("form.flex.flex-row.items-center.bg-light-gray",{onsubmit:function(){return false}},s("label.fal.fa-fw.fa-search.w2.pv2.pl2.tc.pointer"+b.icon,{for:this.id}),s(i.BaseInput,{field:{id:this.id,label:"",type:"search",classes:"pa2 bg-transparent",placeholder:n,instant:true},value:r}),r()?s("i.fal.fa-fw.fa-times.pa2.tc.pointer.dim"+b.subheading,{title:"Reset Search",onclick:function(){return r("")}}):null)};return e}();var D=function(){function e(){this.gridOptions={suppressCellSelection:true,rowData:[]}}e.prototype.oncreate=function(e){var t=this;var n=e.dom,r=e.attrs,i=r.columnDefs,o=r.filter,s=r.test,d=r.load;this.gridOptions.columnDefs=i;this.gridOptions.context=o();this.gridOptions.isExternalFilterPresent=function(){return o().length>0};this.gridOptions.doesExternalFilterPass=s;new a.Grid(n,this.gridOptions);this.showLoading();d({offset:0,limit:-1}).then((function(e){var n;t.hideLoading();(n=t.gridOptions.api)===null||n===void 0?void 0:n.setRowData(e)}))};e.prototype.onupdate=function(e){var t=e.attrs.filter;if(this.gridOptions.context===t()){return}this.gridOptions.context=t();if(this.gridOptions.api){this.gridOptions.api.onFilterChanged();this.gridOptions.api.redrawRows()}};e.prototype.onremove=function(){var e;(e=this.gridOptions.api)===null||e===void 0?void 0:e.destroy()};e.prototype.view=function(){return s(".h-100.flex-auto.ag-theme-balham")};e.prototype.showLoading=function(){var e;(e=this.gridOptions.api)===null||e===void 0?void 0:e.showLoadingOverlay()};e.prototype.hideLoading=function(){var e;(e=this.gridOptions.api)===null||e===void 0?void 0:e.hideOverlay()};return e}();var _=this&&this.__extends||function(){var e=function(t,n){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)if(t.hasOwnProperty(n))e[n]=t[n]};return e(t,n)};return function(t,n){e(t,n);function r(){this.constructor=t}t.prototype=n===null?Object.create(n):(r.prototype=n.prototype,new r)}}();function j(e,t,n){return{getRows:function(r){var i=r.startRow,o=r.endRow,a=r.successCallback,s=r.failCallback;var d=o-i;t();e({offset:i,limit:d+1}).then((function(e){if(e.length>d){a(e.slice(0,d))}else{a(e,i+e.length)}})).catch(s).then((function(){return n()}))}}}var I=function(e){_(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.gridOptions={suppressCellSelection:true,rowModelType:"infinite",blockLoadDebounceMillis:400};return t}t.prototype.oncreate=function(e){var t=e.dom,n=e.attrs,i=n.columnDefs,o=n.filter,s=n.load;this.gridOptions.columnDefs=i;this.gridOptions.context=o();this.gridOptions.datasource=j(s,r.bind(this.showLoading,this),r.bind(this.hideLoading,this));new a.Grid(t,this.gridOptions)};t.prototype.view=function(){return s(".h-100.flex-auto.ag-theme-balham")};return t}(D);(function(e){e[e["Single"]=0]="Single";e[e["Paging"]=1]="Paging"})(e.GridType||(e.GridType={}));function W(t,r){var i=r.notification,o=i===void 0?n({message:""}):i,a=r.fullScreen,d=a===void 0?true:a,u=r.type,c=u===void 0?e.GridType.Single:u,l=r.filter,f=r.columnDefs,p=r.test,h=r.load;return v(t,o).then((function(t){var n=t.application,r=t.brand,i=t.pusher;s.mount(document.getElementById("page"),{view:function(){return s(H,{header:r.header(),application:n,notification:o,fullScreen:d},s(L,{subheader:s(T,{placeholder:"Search",searchValue:l}),content:s(".pa2.flex.flex-column.aspect-ratio--object",[s(c===e.GridType.Single?D:I,{columnDefs:f,filter:l,test:p,load:h})])}))}});return{application:n,pusher:i}}))}e.buildComponent=k;e.buildComponentList=C;e.grid=W;e.registerComponent=x;Object.defineProperty(e,"__esModule",{value:true})}));
