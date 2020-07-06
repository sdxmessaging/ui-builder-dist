(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js"),require("ag-grid-community")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js","ag-grid-community"],t):(e=e||self,t(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher,e.agGrid))})(this,(function(e,t,r,n,o,i,a){"use strict";var s="default"in t?t["default"]:t;r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r["default"]:r;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n["default"]:n;i=i&&Object.prototype.hasOwnProperty.call(i,"default")?i["default"]:i;var d={bind:function(){return null}};function c(e){var t=e.mock,r=e.apiKey,n=e.cloudChannel,o=e.companyChannel,a=e.userChannel,s=e.applicationChannel,c=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:d,companyChannel:d,userChannel:d,applicationChannel:d,applicationUserChannel:d}}var l=new i(r,{cluster:"eu",encrypted:true});return{pusher:l,cloudChannel:l.subscribe(n),companyChannel:l.subscribe(o),userChannel:l.subscribe(a),applicationChannel:l.subscribe(s),applicationUserChannel:l.subscribe(c)}}var l={};function u(e){n.assign(l,{company:"",copyright:"",tel:"",email:"",address:"",poweredBy:undefined,header:[{type:0},{type:7}],footer:[{type:9},{type:0},{type:8},{type:0},{type:10},{type:6}]},e)}var p={button:"",gridFlex:"",cardFlex:"",cardHeader:"",cardSubheading:"",cardIcon:"",cardImage:"",cardCounter:"",loginForm:""};function f(e){var t=e.layoutBackground,r=t===void 0?"transparent":t,i=e.layoutLMaxWidth,a=i===void 0?"64rem":i,s=e.layoutLShadow,d=s===void 0?"unset":s,c=e.bodyText,l=c===void 0?"#333333":c,u=e.bodyFontSize,f=u===void 0?"1.25rem":u,h=e.bodyFontWeight,g=h===void 0?"200":h,v=e.background,m=v===void 0?"DodgerBlue":v,y=e.highlight,w=y===void 0?"unset":y,x=e.text,B=x===void 0?"DodgerBlue":x,k=e.icon,C=k===void 0?B:k,F=e.altText,O=F===void 0?"white":F,P=e.logoMargin,S=P===void 0?"0.5rem":P,H=e.logoBackground,L=H===void 0?"transparent":H,I=e.logoBorderRadius,T=I===void 0?".25rem":I,D=e.headerHeight,W=D===void 0?"3rem":D,_=e.headerBackground,j=_===void 0?m:_,A=e.headerBorderBottom,E=A===void 0?"none":A,R=e.headerBorderRadius,q=R===void 0?"0px":R,z=e.headerText,G=z===void 0?O:z,U=e.subheadingText,M=U===void 0?"rgba(0,0,0,.5)":U,$=e.cardStyle,K=$===void 0?{}:$,N=e.cardHeight,V=N===void 0?"12em":N,J=e.cardWidth,Q=J===void 0?"12em":J,X=e.cardHeightNs,Y=X===void 0?V:X,Z=e.cardWidthNs,ee=Z===void 0?Q:Z,te=e.cardText,re=te===void 0?O:te,ne=e.cardBackground,oe=ne===void 0?m:ne,ie=e.cardBorderRadius,ae=ie===void 0?"0px":ie,se=e.cardShadow,de=se===void 0?"unset":se,ce=e.cardHeaderStyle,le=ce===void 0?{}:ce,ue=e.cardHeaderFontSize,pe=ue===void 0?"1.25rem":ue,fe=e.cardSubheadingStyle,be=fe===void 0?{}:fe,he=e.cardSubheadingFontSize,ge=he===void 0?"1.25rem":he,ve=e.cardIconStyle,me=ve===void 0?{}:ve,ye=e.cardImageStyle,we=ye===void 0?{}:ye,xe=e.panelBackground,Be=xe===void 0?"transparent":xe,ke=e.panelBorderRadius,Ce=ke===void 0?".25rem":ke,Fe=e.loginStyle,Oe=Fe===void 0?{}:Fe,Pe=e.footerHeight,Se=Pe===void 0?"3rem":Pe,He=e.footerBackground,Le=He===void 0?"#F4F4F4":He,Ie=e.footerText,Te=Ie===void 0?"#999":Ie,De=e.lineHeight,We=De===void 0?"1.9em":De,_e=e.buttonBackground,je=_e===void 0?m:_e,Ae=e.buttonText,Ee=Ae===void 0?O:Ae,Re=e.buttonPadding,qe=Re===void 0?".5rem":Re,ze=e.buttonBorder,Ge=ze===void 0?"none":ze,Ue=e.buttonBorderRadius,Me=Ue===void 0?".25rem":Ue,$e=e.altButtonBackground,Ke=$e===void 0?je:$e,Ne=e.altButtonText,Ve=Ne===void 0?Ee:Ne,Je=e.altButtonPadding,Qe=Je===void 0?qe:Je,Xe=e.altButtonBorder,Ye=Xe===void 0?Ge:Xe,Ze=e.altButtonBorderRadius,et=Ze===void 0?Me:Ze,tt=e.tableHeaderBackground,rt=tt===void 0?m:tt,nt=e.tableHeaderText,ot=nt===void 0?O:nt,it=e.primaryBackground,at=it===void 0?je:it,st=e.primaryText,dt=st===void 0?Ee:st,ct=e.bgInfo,lt=ct===void 0?"#357EDD":ct,ut=e.txtInfo,pt=ut===void 0?"#FFFFFF":ut,ft=e.bgWarn,bt=ft===void 0?"#FFD700":ft,ht=e.txtWarn,gt=ht===void 0?"#111111":ht,vt=e.bgError,mt=vt===void 0?"#E7040F":vt,yt=e.txtError,wt=yt===void 0?"#FFFFFF":yt,xt=e.inpBrdClass,Bt=xt===void 0?"bn":xt,kt=e.button,Ct=kt===void 0?"shadow-4":kt,Ft=e.gridFlex,Ot=Ft===void 0?"flex flex-wrap justify-center":Ft,Pt=e.cardFlex,St=Pt===void 0?"flex flex-column items-center":Pt,Ht=e.cardHeader,Lt=Ht===void 0?"flex-auto ma2 tc":Ht,It=e.cardSubheading,Tt=It===void 0?"ma2 pv1 ph2":It,Dt=e.cardIcon,Wt=Dt===void 0?"fal fa-fw fa-4x ma2":Dt,_t=e.cardImage,jt=_t===void 0?"img ma2":_t,At=e.cardCounter,Et=At===void 0?"nt1 nr1 top-0 right-0":At,Rt=e.loginForm,qt=Rt===void 0?"measure-wide center":Rt;b.helper({shrink0:b.flexShrink("0"),sticky:b({position:"sticky"}),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:m}),branding:b.color(B),icon:b.color(C),brandingAlt:b.color(O),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:r}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":a,"box-shadow":d})),body:b.c(l),bodyFSize:b.fs(f),bodyFWeight:b({"font-weight":g}),marginLogo:b.m(S),bgLogo:b({background:L}),brdLogo:b.br(T),headerHeight:b.h(W),bgHeader:b({background:j}),bbHeader:b({"border-bottom":E}),brdHeader:b.br(q),header:b.c(G),subheading:b.c(M),cardStyle:b(K),cardSize:b.h(V).w(Q).$media("screen and (min-width:30em)",b.h(Y).w(ee)),card:b.c(re),bgCard:b({background:oe}),brdCard:b.br(ae),shadowCard:b({"box-shadow":de}),cardHead:b(le).fs(pe),cardSub:b(be).fs(ge),cardIcon:b(me),cardImage:b(we),bgPanel:b({background:Be}),brdPanel:b.br(Ce),loginStyle:b(Oe),footerHeight:b.h(Se),bgFooter:b({background:Le}),footer:b.c(Te),inputHeight:b.h(We),inputFocus:b({":focus":{"border-color":w}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:rt}),thead:b.c(ot),bgButton:b({background:je}),button:b.c(Ee),padButton:b.p(qe),brdButton:b({border:Ge}).br(Me),bgButtonAlt:b({background:Ke}),buttonAlt:b.c(Ve),padButtonAlt:b.p(Qe),brdButtonAlt:b({border:Ye}).br(et),bgPrimary:b({background:at}),primary:b.c(dt),bgInfo:b({background:lt}),info:b.c(pt),bgWarn:b({background:bt}),warn:b.c(gt),bgError:b({background:mt}),error:b.c(wt)});n.assign(p,{button:Ct,gridFlex:Ot,cardFlex:St,cardHeader:Lt,cardSubheading:Tt,cardIcon:Wt,cardImage:jt,cardCounter:Et,loginForm:qt});o.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:Bt+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:p.button+" "+b.brdButton.class});o.updateButtonContext({alt:b.bgButtonAlt.buttonAlt.padButtonAlt.brdButtonAlt.ripple.class,info:b({border:"1px solid "+pt}).br(Me).padButton.info.bgInfo.ripple.class,warn:b({border:"1px solid "+gt}).br(Me).padButton.warn.bgWarn.ripple.class,error:b({border:"1px solid "+wt}).br(Me).padButton.error.bgError.ripple.class})}var h=function(){function e(e){var t=e.brandingPath,n=e.themePath;this.branding=r({});this.theme=r({});this.brandingPath=t;this.branding.map(u);this.themePath=n;this.theme.map(f)}e.prototype.load=function(){return Promise.all([this.loadBranding(),this.loadTheme()])};e.prototype.loadBranding=function(){return this.brandingPath?t.request(this.brandingPath).then(this.branding).catch(n.noop):Promise.resolve()};e.prototype.loadTheme=function(){return this.themePath?t.request(this.themePath).then(this.theme).catch(n.noop):Promise.resolve()};return e}();function g(e){if(n.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function v(e,r){r({message:String(e.message),context:"error"});t.redraw()}function m(e,r){window.history.replaceState(null,"",window.location.href);var i;var a;var s;return g(e).then((function(e){i=e;o.updateConfig({signFont:"Caveat"});if(i.uiWidgets){o.updateConfig(i.uiWidgets)}a=new h(i);s=c(i.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));s.cloudChannel.bind("reloadbranding",(function(){return a.load().then(t.redraw)}));s.companyChannel.bind("reloadbranding",(function(){return a.load().then(t.redraw)}));s.applicationChannel.bind("reloadbranding",(function(){return a.load().then(t.redraw)}));s.applicationUserChannel.bind("notification",(function(e){r(e);t.redraw()}));return Promise.all([a.load().catch(n.noop),new Promise((function(e){s.pusher.connection.bind("connected",(function(){s.pusher.connection.unbind("connected");e()}))}))])})).catch((function(e){return v(e,r)})).then((function(){return{application:i,pusher:s}}))}function y(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var w=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var n=e.attrs.notification;n.map((function(e){var n=e.message,o=e.duration,i=o===void 0?3e3:o;if(n){t.active=true;setTimeout((function(){return t.dismiss()}),i)}return r.SKIP}))};e.prototype.view=function(e){var t=this;var r=e.attrs.notification;var n=r(),o=n.message,i=n.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:y(i),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},o)};e.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return e}();function x(e){if(typeof e==="string"){return s("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return s(t.selector,t.content)}else{var r=e;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:r.href},r.text)}}var B=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return s(".ph4",n.map(t,(function(e){return x(e)})))};return e}();var k={};function C(e,t){if(e in k){throw new Error("Component "+e+" is already registered")}else{k[e]=t}}C("basic",B);function F(e){var t=e.type,r=e.data;if(t in k){return s(k[t],{type:t,data:r})}else{return s("span","Unknown component type: "+t)}}function O(e){return n.map(e,(function(e){return F(e)}))}var P=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return F(t)}else if(t.hasOwnProperty("icon")){var r=t;return s(".flex.items-center.mh2",{class:r.classes},s("i.fal.fa-2x.mr2",{class:r.icon}),r.title)}else if(t.hasOwnProperty("src")){var n=t;return s(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:n.classes},s("img.img",{src:n.src,class:n.imageClass,height:n.height,width:n.width}),n.title)}else{var o=t;return s(".mh2",{class:o.classes},o.title||"")}};return e}();var S=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.auth,n=r.logoutPath,o=r.logoutLabel,i=r.logoutIcon,a=i===void 0?"fa-sign-out-alt":i,d=t.classes;return s("a.link.ma2",{href:n,class:d},[o?s("span.mr2",o):null,s("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:a})])};return e}();function H(e){return(e*100).toFixed(0)+"%"}var L=function(){function e(){}e.prototype.view=function(e){var t=this;var r=e.attrs,o=r.display,i=r.application,a=i.version,d=i.auth,c=r.saving,u=r.progress,p=r.logout;var f=o==="header"?l.header:l.footer;var h=o==="header"?b.header:b.footer;var g=[];if(n.isObject(f)){g=[{type:11,logo:f.lhs},{type:0},{type:11,logo:f.rhs},{type:7}]}if(n.isArray(f)){g=f}return n.map(g,(function(e){switch(e.type){case 0:return s(".center");case 1:return s("span","|");case 2:return e.src?t.image(e.src,e.classes,e.height,e.width):null;case 3:return s("span.ma2"+h,{class:e.classes},e.text);case 4:return s("a.link.ma2"+h,{class:e.classes,href:e.href},e.text);case 5:return d&&p?t.logout(d,"flex "+h.class):null;case 6:return d&&p?t.logout(d,"flex dn-l "+h.class):null;case 7:return d&&p?t.logout(d,"dn flex-l "+h.class):null;case 8:return t.copyright(a);case 9:return t.poweredBy();case 10:return t.progressIndicator(c,u);case 11:return e.logo?s(P,e.logo):null;default:return e.hasOwnProperty("data")?F(e):null}}))};e.prototype.image=function(e,t,r,n){return s("img.img.ma2",{src:e,class:t,height:r,width:n})};e.prototype.poweredBy=function(){var e=l.poweredBy,t=e===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:e;return s("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:t.href},s("img.w-100.h-100.mw3.mw4-l.o-80",{src:t.src,title:t.title}))};e.prototype.copyright=function(e){var t=l.copyright,r=t===void 0?"":t;return s("span.ma2.f7",{title:e},r?[s.trust("&copy; "),r]:null)};e.prototype.progressIndicator=function(e,t){var r=e?e():false;var n=r&&t?t():0;return s("span.ma2.f3",{class:n?"":"dn"},[H(n),s("i.ma2.f3.fal.fa-spinner",{class:r?"fa-spin":"dn"})])};e.prototype.logout=function(e,t){if(t===void 0){t=""}return s(S,{auth:e,classes:"items-center "+t})};return e}();var I=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.application,n=t.notification,o=t.saving,i=t.progress,a=t.fullScreen,d=t.responsiveHeader,c=t.responsiveFooter,l=t.logout,u=l===void 0?true:l,p=t.header,f=t.footer,h=e.children;return[n?s(w,{notification:n}):null,s("nav.items-center.self-center.w-100"+b.header.headerHeight.bgHeader.bbHeader.brdHeader.shrink0,{class:(d?"dn flex-l":"flex")+" "+(a?"":b.layoutL.class)},p?p:s(L,{display:"header",application:r,saving:o,progress:i,logout:u})),s("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:a?undefined:b.layoutL.class},h),s("nav.w-100.items-center"+b.footerHeight.bgFooter.footer.shrink0,{class:c?"dn flex-l":"flex"},f?f:s(L,{display:"footer",application:r,saving:o,progress:i,logout:u}))]};return e}();var T=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.header,n=t.headerClass,o=t.subheader,i=t.subheaderClass,a=t.content,d=t.wrapContent,c=d===void 0?true:d,l=t.footer;return[r?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:n},r):null,o?s("div"+b.shrink0,{class:i},o):null,c?s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,a):a,l]};return e}();var D=function(){function e(){this.id=n.uniqueId("search-")}e.prototype.view=function(e){var t=e.attrs,r=t.placeholder,n=t.searchValue;return s("form.flex.flex-row.items-center.bg-light-gray",{onsubmit:function(){return false}},s("label.fal.fa-fw.fa-search.w2.pv2.pl2.tc.pointer"+b.icon,{for:this.id}),s(o.BaseInput,{field:{id:this.id,label:"",type:"search",classes:"pa2 bg-transparent",placeholder:r,instant:true},value:n}),n()?s("i.fal.fa-fw.fa-times.pa2.tc.pointer.dim"+b.subheading,{title:"Reset Search",onclick:function(){return n("")}}):null)};return e}();var W=function(){function e(){this.gridOptions={suppressCellSelection:true,rowData:[]}}e.prototype.oncreate=function(e){var t=this;var r=e.dom,n=e.attrs,o=n.columnDefs,i=n.filter,s=n.test,d=n.load;this.gridOptions.columnDefs=o;this.gridOptions.context=i();this.gridOptions.isExternalFilterPresent=function(){return i().length>0};this.gridOptions.doesExternalFilterPass=s;new a.Grid(r,this.gridOptions);this.showLoading();d({offset:0,limit:-1}).then((function(e){var r;t.hideLoading();(r=t.gridOptions.api)===null||r===void 0?void 0:r.setRowData(e)}))};e.prototype.onupdate=function(e){var t=e.attrs.filter;if(this.gridOptions.context===t()){return}this.gridOptions.context=t();if(this.gridOptions.api){this.gridOptions.api.onFilterChanged();this.gridOptions.api.redrawRows()}};e.prototype.onremove=function(){var e;(e=this.gridOptions.api)===null||e===void 0?void 0:e.destroy()};e.prototype.view=function(){return s(".h-100.flex-auto.ag-theme-balham")};e.prototype.showLoading=function(){var e;(e=this.gridOptions.api)===null||e===void 0?void 0:e.showLoadingOverlay()};e.prototype.hideLoading=function(){var e;(e=this.gridOptions.api)===null||e===void 0?void 0:e.hideOverlay()};return e}();var _=this&&this.__extends||function(){var e=function(t,r){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)if(t.hasOwnProperty(r))e[r]=t[r]};return e(t,r)};return function(t,r){e(t,r);function n(){this.constructor=t}t.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}();function j(e,t,r){return{getRows:function(n){var o=n.startRow,i=n.endRow,a=n.successCallback,s=n.failCallback;var d=i-o;t();e({offset:o,limit:d+1}).then((function(e){if(e.length>d){a(e.slice(0,d))}else{a(e,o+e.length)}})).catch(s).then((function(){return r()}))}}}var A=function(e){_(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.gridOptions={suppressCellSelection:true,rowModelType:"infinite",blockLoadDebounceMillis:400};return t}t.prototype.oncreate=function(e){var t=e.dom,r=e.attrs,o=r.columnDefs,i=r.filter,s=r.load;this.gridOptions.columnDefs=o;this.gridOptions.context=i();this.gridOptions.datasource=j(s,n.bind(this.showLoading,this),n.bind(this.hideLoading,this));new a.Grid(t,this.gridOptions)};t.prototype.view=function(){return s(".h-100.flex-auto.ag-theme-balham")};return t}(W);(function(e){e[e["Single"]=0]="Single";e[e["Paging"]=1]="Paging"})(e.GridType||(e.GridType={}));function E(t,n){var o=n.notification,i=o===void 0?r({message:""}):o,a=n.fullScreen,d=a===void 0?true:a,c=n.type,l=c===void 0?e.GridType.Single:c,u=n.filter,p=n.columnDefs,f=n.test,b=n.load;return m(t,i).then((function(t){var r=t.application,n=t.pusher;s.mount(document.getElementById("page"),{view:function(){return s(I,{application:r,notification:i,fullScreen:d},s(T,{subheader:s(D,{placeholder:"Search",searchValue:u}),content:s(".pa2.flex.flex-column.aspect-ratio--object",[s(l===e.GridType.Single?W:A,{columnDefs:p,filter:u,test:f,load:b})])}))}});return{application:r,pusher:n}}))}e.buildComponent=F;e.buildComponentList=O;e.grid=E;e.registerComponent=C;Object.defineProperty(e,"__esModule",{value:true})}));
