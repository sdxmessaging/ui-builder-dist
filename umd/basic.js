(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js"],t):(e=e||self,t(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher))})(this,(function(e,t,r,n,o,a){"use strict";var i="default"in t?t["default"]:t;r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r["default"]:r;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n["default"]:n;a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a["default"]:a;var d={bind:function(){return null}};function s(e){var t=e.mock,r=e.apiKey,n=e.cloudChannel,o=e.companyChannel,i=e.userChannel,s=e.applicationChannel,c=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:d,companyChannel:d,userChannel:d,applicationChannel:d,applicationUserChannel:d}}var u=new a(r,{cluster:"eu",encrypted:true});return{pusher:u,cloudChannel:u.subscribe(n),companyChannel:u.subscribe(o),userChannel:u.subscribe(i),applicationChannel:u.subscribe(s),applicationUserChannel:u.subscribe(c)}}var c={};function u(e){n.assign(c,{company:"",copyright:"",tel:"",email:"",address:"",poweredBy:undefined,header:[{type:0},{type:7}],footer:[{type:9},{type:0},{type:8},{type:0},{type:10},{type:6}]},e)}var l={button:"",gridFlex:"",cardFlex:"",cardHeader:"",cardSubheading:"",cardIcon:"",cardCounter:"",loginForm:""};function p(e){var t=e.layoutBackground,r=t===void 0?"transparent":t,a=e.layoutLMaxWidth,i=a===void 0?"64rem":a,d=e.layoutLShadow,s=d===void 0?"unset":d,c=e.bodyText,u=c===void 0?"#333333":c,p=e.bodyFontSize,f=p===void 0?"1.25rem":p,h=e.bodyFontWeight,g=h===void 0?"200":h,v=e.background,m=v===void 0?"DodgerBlue":v,y=e.highlight,w=y===void 0?"unset":y,x=e.text,B=x===void 0?"DodgerBlue":x,k=e.icon,C=k===void 0?B:k,F=e.altText,P=F===void 0?"white":F,H=e.logoMargin,S=H===void 0?"0.5rem":H,I=e.logoBackground,T=I===void 0?"transparent":I,L=e.logoBorderRadius,O=L===void 0?".25rem":L,W=e.headerHeight,E=W===void 0?"3rem":W,j=e.headerBackground,A=j===void 0?m:j,U=e.headerBorderBottom,q=U===void 0?"none":U,R=e.headerBorderRadius,z=R===void 0?"0px":R,D=e.headerText,N=D===void 0?P:D,M=e.subheadingText,_=M===void 0?"rgba(0,0,0,.5)":M,$=e.cardStyle,K=$===void 0?{}:$,G=e.cardHeight,J=G===void 0?"12em":G,Q=e.cardWidth,V=Q===void 0?"12em":Q,X=e.cardHeightNs,Y=X===void 0?J:X,Z=e.cardWidthNs,ee=Z===void 0?V:Z,te=e.cardText,re=te===void 0?P:te,ne=e.cardBackground,oe=ne===void 0?m:ne,ae=e.cardBorderRadius,ie=ae===void 0?"0px":ae,de=e.cardShadow,se=de===void 0?"unset":de,ce=e.cardHeaderStyle,ue=ce===void 0?{}:ce,le=e.cardHeaderFontSize,be=le===void 0?"1.25rem":le,pe=e.cardSubheadingStyle,fe=pe===void 0?{}:pe,he=e.cardSubheadingFontSize,ge=he===void 0?"1.25rem":he,ve=e.cardIconStyle,me=ve===void 0?{}:ve,ye=e.panelBackground,we=ye===void 0?"transparent":ye,xe=e.panelBorderRadius,Be=xe===void 0?".25rem":xe,ke=e.loginStyle,Ce=ke===void 0?{}:ke,Fe=e.footerHeight,Pe=Fe===void 0?"3rem":Fe,He=e.footerBackground,Se=He===void 0?"#F4F4F4":He,Ie=e.footerText,Te=Ie===void 0?"#999":Ie,Le=e.lineHeight,Oe=Le===void 0?"1.9em":Le,We=e.buttonBackground,Ee=We===void 0?m:We,je=e.buttonText,Ae=je===void 0?P:je,Ue=e.buttonPadding,qe=Ue===void 0?".5rem":Ue,Re=e.buttonBorder,ze=Re===void 0?"none":Re,De=e.buttonBorderRadius,Ne=De===void 0?".25rem":De,Me=e.altButtonBackground,_e=Me===void 0?Ee:Me,$e=e.altButtonText,Ke=$e===void 0?Ae:$e,Ge=e.altButtonPadding,Je=Ge===void 0?qe:Ge,Qe=e.altButtonBorder,Ve=Qe===void 0?ze:Qe,Xe=e.altButtonBorderRadius,Ye=Xe===void 0?Ne:Xe,Ze=e.tableHeaderBackground,et=Ze===void 0?m:Ze,tt=e.tableHeaderText,rt=tt===void 0?P:tt,nt=e.primaryBackground,ot=nt===void 0?Ee:nt,at=e.primaryText,it=at===void 0?Ae:at,dt=e.bgInfo,st=dt===void 0?"#357EDD":dt,ct=e.txtInfo,ut=ct===void 0?"#FFFFFF":ct,lt=e.bgWarn,bt=lt===void 0?"#FFD700":lt,pt=e.txtWarn,ft=pt===void 0?"#111111":pt,ht=e.bgError,gt=ht===void 0?"#E7040F":ht,vt=e.txtError,mt=vt===void 0?"#FFFFFF":vt,yt=e.inpBrdClass,wt=yt===void 0?"bn":yt,xt=e.button,Bt=xt===void 0?"shadow-4":xt,kt=e.gridFlex,Ct=kt===void 0?"flex flex-wrap justify-center":kt,Ft=e.cardFlex,Pt=Ft===void 0?"flex flex-column items-center":Ft,Ht=e.cardHeader,St=Ht===void 0?"flex-auto ma2 tc":Ht,It=e.cardSubheading,Tt=It===void 0?"ma2 pv1 ph2":It,Lt=e.cardIcon,Ot=Lt===void 0?"fal fa-fw fa-4x ma2":Lt,Wt=e.cardCounter,Et=Wt===void 0?"nt1 nr1 top-0 right-0":Wt,jt=e.loginForm,At=jt===void 0?"items-center measure-wide center":jt;b.helper({shrink0:b.flexShrink("0"),sticky:b({position:"sticky"}),flexImg:b({"object-fit":"contain"}).minHeight("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:m}),branding:b.color(B),icon:b.color(C),brandingAlt:b.color(P),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:r}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":i,"box-shadow":s})),body:b.c(u),bodyFSize:b.fs(f),bodyFWeight:b({"font-weight":g}),marginLogo:b.m(S),bgLogo:b({background:T}),brdLogo:b.br(O),headerHeight:b.h(E),bgHeader:b({background:A}),bbHeader:b({"border-bottom":q}),brdHeader:b.br(z),header:b.c(N),subheading:b.c(_),cardStyle:b(K),cardSize:b.h(J).w(V).$media("screen and (min-width:30em)",b.h(Y).w(ee)),card:b.c(re),bgCard:b({background:oe}),brdCard:b.br(ie),shadowCard:b({"box-shadow":se}),cardHead:b(ue).fs(be),cardSub:b(fe).fs(ge),cardIcon:b(me),bgPanel:b({background:we}),brdPanel:b.br(Be),loginStyle:b(Ce),footerHeight:b.h(Pe),bgFooter:b({background:Se}),footer:b.c(Te),inputHeight:b.h(Oe),inputFocus:b({":focus":{"border-color":w}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:et}),thead:b.c(rt),bgButton:b({background:Ee}),button:b.c(Ae),padButton:b.p(qe),brdButton:b({border:ze}).br(Ne),bgButtonAlt:b({background:_e}),buttonAlt:b.c(Ke),padButtonAlt:b.p(Je),brdButtonAlt:b({border:Ve}).br(Ye),bgPrimary:b({background:ot}),primary:b.c(it),bgInfo:b({background:st}),info:b.c(ut),bgWarn:b({background:bt}),warn:b.c(ft),bgError:b({background:gt}),error:b.c(mt)});n.assign(l,{button:Bt,gridFlex:Ct,cardFlex:Pt,cardHeader:St,cardSubheading:Tt,cardIcon:Ot,cardCounter:Et,loginForm:At});o.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:wt+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:l.button+" "+b.brdButton.class});o.updateButtonContext({alt:b.bgButtonAlt.buttonAlt.padButtonAlt.brdButtonAlt.ripple.class,info:b({border:"1px solid "+ut}).br(Ne).padButton.info.bgInfo.ripple.class,warn:b({border:"1px solid "+ft}).br(Ne).padButton.warn.bgWarn.ripple.class,error:b({border:"1px solid "+mt}).br(Ne).padButton.error.bgError.ripple.class})}var f=function(){function e(e){var t=e.brandingPath,n=e.themePath;this.branding=r({});this.theme=r({});this.brandingPath=t;this.branding.map(u);this.themePath=n;this.theme.map(p)}e.prototype.load=function(){return Promise.all([this.loadBranding(),this.loadTheme()])};e.prototype.loadBranding=function(){return this.brandingPath?t.request(this.brandingPath).then(this.branding).catch(n.noop):Promise.resolve()};e.prototype.loadTheme=function(){return this.themePath?t.request(this.themePath).then(this.theme).catch(n.noop):Promise.resolve()};return e}();function h(e){if(n.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function g(e,r){r({message:String(e.message),context:"error"});t.redraw()}function v(e,r){window.history.replaceState(null,"",window.location.href);var a;var i;var d;return h(e).then((function(e){a=e;o.updateConfig({signFont:"Caveat"});if(a.uiWidgets){o.updateConfig(a.uiWidgets)}i=new f(a);d=s(a.pusher);d.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));d.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));d.cloudChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));d.companyChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));d.applicationChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));d.applicationUserChannel.bind("notification",(function(e){r(e);t.redraw()}));return Promise.all([i.load().catch(n.noop),new Promise((function(e){d.pusher.connection.bind("connected",(function(){d.pusher.connection.unbind("connected");e()}))}))])})).catch((function(e){return g(e,r)})).then((function(){return{application:a,pusher:d}}))}function m(e){if(typeof e==="string"){return i("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return i(t.selector,t.content)}else{var r=e;return i("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:r.href},r.text)}}var y=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return i(".ph4",n.map(t,(function(e){return m(e)})))};return e}();var w={};function x(e,t){if(e in w){throw new Error("Component "+e+" is already registered")}else{w[e]=t}}x("basic",y);function B(e){var t=e.type,r=e.data;if(t in w){return i(w[t],{type:t,data:r})}else{return i("span","Unknown component type: "+t)}}function k(e){return n.map(e,(function(e){return B(e)}))}function C(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var F=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var n=e.attrs.notification;n.map((function(e){var n=e.message,o=e.duration,a=o===void 0?3e3:o;if(n){t.active=true;setTimeout((function(){return t.dismiss()}),a)}return r.SKIP}))};e.prototype.view=function(e){var t=this;var r=e.attrs.notification;var n=r(),o=n.message,a=n.context;return i(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:C(a),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},o)};e.prototype.dismiss=function(){if(this.active){this.active=false;i.redraw()}};return e}();var P=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return B(t)}else if(t.hasOwnProperty("icon")){var r=t;return i(".flex.items-center.mh2",{class:r.classes},i("i.fal.fa-2x.mr2",{class:r.icon}),r.title)}else if(t.hasOwnProperty("src")){var n=t;return i(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:n.classes},i("img.img",{src:n.src,class:n.imageClass,height:n.height,width:n.width}),n.title)}else{var o=t;return i(".mh2",{class:o.classes},o.title||"")}};return e}();var H=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.auth,n=r.logoutPath,o=r.logoutLabel,a=r.logoutIcon,d=a===void 0?"fa-sign-out-alt":a,s=t.classes;return i("a.link.ma2",{href:n,class:s},[o?i("span.mr2",o):null,i("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:d})])};return e}();function S(e){return(e*100).toFixed(0)+"%"}var I=function(){function e(){}e.prototype.view=function(e){var t=this;var r=e.attrs,o=r.display,a=r.application,d=a.version,s=a.auth,u=r.saving,l=r.progress,p=r.logout;var f=o==="header"?c.header:c.footer;var h=o==="header"?b.header.class:b.footer.class;var g=[];if(n.isObject(f)){g=[{type:12,logo:f.lhs},{type:0},{type:12,logo:f.rhs},{type:7}]}if(n.isArray(f)){g=f}return n.map(g,(function(e){var r=e.classes||"";switch(e.type){case 0:return i(".center");case 1:return i("span","|");case 2:return e.src?t.image(e.src,r,e.height,e.width):null;case 3:return i("span.mh2",{class:r+" "+h},e.text);case 4:return i("a.link.mh2",{class:r+" "+h,href:e.href},e.text);case 5:return s&&p?t.logout(s,"flex "+h):null;case 6:return s&&p?t.logout(s,"flex dn-l "+h):null;case 7:return s&&p?t.logout(s,"dn flex-l "+h):null;case 8:return t.copyright(d);case 9:return t.poweredBy();case 10:return t.progressIndicator(u,l);case 11:return e.custom?B(e.custom):null;case 12:return e.logo?i(P,e.logo):null;default:return null}}))};e.prototype.image=function(e,t,r,n){return i("img.img.ma2",{src:e,class:t,height:r,width:n})};e.prototype.poweredBy=function(){var e=c.poweredBy,t=e===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:e;return i("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:t.href},i("img.w-100.h-100.mw3.mw4-l.o-80",{src:t.src,title:t.title}))};e.prototype.copyright=function(e){var t=c.copyright,r=t===void 0?"":t;return i("span.ma2.f7",{title:e},r?[i.trust("&copy; "),r]:null)};e.prototype.progressIndicator=function(e,t){var r=e?e():false;var n=r&&t?t():0;return i("span.ma2.f3",{class:n?"":"dn"},[S(n),i("i.ma2.f3.fal.fa-spinner",{class:r?"fa-spin":"dn"})])};e.prototype.logout=function(e,t){if(t===void 0){t=""}return i(H,{auth:e,classes:"items-center "+t+" "+b.footer.class})};return e}();var T=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.application,n=t.notification,o=t.saving,a=t.progress,d=t.fullScreen,s=t.responsiveHeader,c=t.responsiveFooter,u=t.logout,l=u===void 0?true:u,p=t.header,f=t.footer,h=e.children;return[n?i(F,{notification:n}):null,i("nav.items-center.self-center.w-100"+b.header.headerHeight.bgHeader.bbHeader.brdHeader.shrink0,{class:(s?"dn flex-l":"flex")+" "+(d?"":b.layoutL.class)},p?p:i(I,{display:"header",application:r,saving:o,progress:a,logout:l})),i("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:d?undefined:b.layoutL.class},h),i("nav.w-100.items-center"+b.footerHeight.bgFooter.footer,{class:c?"dn flex-l":"flex"},f?f:i(I,{display:"footer",application:r,saving:o,progress:a,logout:l}))]};return e}();var L=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.header,n=t.headerClass,o=t.subheader,a=t.subheaderClass,d=t.content,s=t.wrapContent,c=s===void 0?true:s,u=t.footer;return[r?i(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:n},r):null,o?i("div"+b.shrink0,{class:a},o):null,c?i(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,d):d,u]};return e}();function O(e,t){var n=t.toastMessage,o=n===void 0?{message:""}:n,a=t.title,d=a===void 0?"UNTITLED":a,s=t.lines,c=s===void 0?[]:s,u=t.returnBtn;var l=r(o);return v(e,l).then((function(e){var t=e.application,r=e.pusher;i.mount(document.getElementById("page"),{view:function(){return i(T,{application:t,notification:l},i(L,{content:[i(".ph4",[i("p.f3.fw4",d),B({type:"basic",data:c}),u&&t.auth?B({type:"basic",data:{href:t.auth.loginPath,text:"RETURN TO LOGIN"}}):null]),t.footer?B(t.footer):null]}))}});return{application:t,pusher:r}}))}e.basic=O;e.buildComponent=B;e.buildComponentList=k;e.registerComponent=x;Object.defineProperty(e,"__esModule",{value:true})}));
