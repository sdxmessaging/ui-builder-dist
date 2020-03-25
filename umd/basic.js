(function(e,r){typeof exports==="object"&&typeof module!=="undefined"?r(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js"],r):(e=e||self,r(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher))})(this,(function(e,r,t,n,o,i){"use strict";var a="default"in r?r["default"]:r;t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t["default"]:t;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n["default"]:n;i=i&&Object.prototype.hasOwnProperty.call(i,"default")?i["default"]:i;var s={bind:function(){return null}};function d(e){var r=e.mock,t=e.apiKey,n=e.cloudChannel,o=e.companyChannel,a=e.userChannel,d=e.applicationChannel,u=e.applicationUserChannel;if(r){return{pusher:{connection:{bind:function(e,r){return setImmediate(r)},unbind:function(){return null}}},cloudChannel:s,companyChannel:s,userChannel:s,applicationChannel:s,applicationUserChannel:s}}var c=new i(t,{cluster:"eu",encrypted:true});return{pusher:c,cloudChannel:c.subscribe(n),companyChannel:c.subscribe(o),userChannel:c.subscribe(a),applicationChannel:c.subscribe(d),applicationUserChannel:c.subscribe(u)}}var u={button:"",gridFlex:""};function c(e){var r=e.layoutBackground,t=r===void 0?"transparent":r,i=e.layoutLMaxWidth,a=i===void 0?"64rem":i,s=e.layoutLShadow,d=s===void 0?"2px 2px 8px 0 rgba(0,0,0,.2)":s,c=e.bodyText,l=c===void 0?"#333333":c,h=e.bodyFontSize,f=h===void 0?"1.25rem":h,p=e.bodyFontWeight,g=p===void 0?"200":p,v=e.background,m=v===void 0?"DodgerBlue":v,y=e.highlight,w=y===void 0?"unset":y,x=e.text,k=x===void 0?"DodgerBlue":x,B=e.icon,C=B===void 0?k:B,F=e.altText,H=F===void 0?"white":F,P=e.logoMargin,S=P===void 0?"0.5rem":P,L=e.logoBackground,O=L===void 0?"transparent":L,T=e.logoBorderRadius,I=T===void 0?".25rem":T,W=e.headerHeight,E=W===void 0?"3rem":W,j=e.headerBackground,U=j===void 0?m:j,D=e.headerBorderBottom,q=D===void 0?"none":D,z=e.headerBorderRadius,R=z===void 0?"0px":z,N=e.headerText,M=N===void 0?H:N,_=e.subheadingText,$=_===void 0?"rgba(0,0,0,.5)":_,A=e.cardHeight,K=A===void 0?"12em":A,G=e.cardWidth,J=G===void 0?"12em":G,Q=e.cardHeightNs,V=Q===void 0?K:Q,X=e.cardWidthNs,Y=X===void 0?J:X,Z=e.cardText,ee=Z===void 0?H:Z,re=e.cardBackground,te=re===void 0?m:re,ne=e.cardBorderRadius,oe=ne===void 0?"0px":ne,ie=e.cardShadow,ae=ie===void 0?"unset":ie,se=e.cardHeaderFontSize,de=se===void 0?"1.25rem":se,ue=e.cardSubheadingFontSize,ce=ue===void 0?"1.25rem":ue,le=e.cardSubheadingPadding,be=le===void 0?".25rem .5rem":le,he=e.cardHeaderOrder,fe=he===void 0?"0":he,pe=e.cardIconOrder,ge=pe===void 0?"1":pe,ve=e.panelBackground,me=ve===void 0?"transparent":ve,ye=e.panelBorderRadius,we=ye===void 0?".25rem":ye,xe=e.footerHeight,ke=xe===void 0?"3rem":xe,Be=e.footerBackground,Ce=Be===void 0?"#F4F4F4":Be,Fe=e.footerText,He=Fe===void 0?"#999":Fe,Pe=e.lineHeight,Se=Pe===void 0?"1.9em":Pe,Le=e.buttonBackground,Oe=Le===void 0?m:Le,Te=e.buttonText,Ie=Te===void 0?H:Te,We=e.buttonPadding,Ee=We===void 0?".5rem":We,je=e.buttonBorderRadius,Ue=je===void 0?".25rem":je,De=e.tableHeaderBackground,qe=De===void 0?m:De,ze=e.tableHeaderText,Re=ze===void 0?H:ze,Ne=e.primaryBackground,Me=Ne===void 0?Oe:Ne,_e=e.primaryText,$e=_e===void 0?Ie:_e,Ae=e.bgInfo,Ke=Ae===void 0?"#357EDD":Ae,Ge=e.txtInfo,Je=Ge===void 0?"#FFFFFF":Ge,Qe=e.bgWarn,Ve=Qe===void 0?"#FFD700":Qe,Xe=e.txtWarn,Ye=Xe===void 0?"#111111":Xe,Ze=e.bgError,er=Ze===void 0?"#E7040F":Ze,rr=e.txtError,tr=rr===void 0?"#FFFFFF":rr,nr=e.inpBrdClass,or=nr===void 0?"bn":nr,ir=e.button,ar=ir===void 0?"shadow-4":ir,sr=e.gridFlex,dr=sr===void 0?"flex flex-wrap justify-center":sr;b.helper({shrink0:b.flexShrink("0"),flexImg:b.objectFit("contain").minHeight("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:m}),branding:b.color(k),icon:b.color(C),brandingAlt:b.color(H),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:t}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":a,"box-shadow":d})),body:b.c(l),bodyFSize:b.fs(f),bodyFWeight:b({"font-weight":g}),marginLogo:b.m(S),bgLogo:b({background:O}),brdLogo:b.br(I),headerHeight:b.h(E),bgHeader:b({background:U}),bbHeader:b({"border-bottom":q}),brdHeader:b.br(R),header:b.c(M),subheading:b.c($),cardSize:b.h(K).w(J).$media("screen and (min-width:30em)",b.h(V).w(Y)),card:b.c(ee),bgCard:b({background:te}),brdCard:b.br(oe),shadowCard:b({"box-shadow":ae}),cardHead:b({order:fe}).fs(de),cardIcon:b({order:ge}),cardSub:b({order:"3"}).p(be).fs(ce),bgPanel:b({background:me}),brdPanel:b.br(we),footerHeight:b.h(ke),bgFooter:b({background:Ce}),footer:b.c(He),inputHeight:b.h(Se),inputFocus:b({":focus":{"border-color":w}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:qe}),thead:b.c(Re),bgButton:b({background:Oe}),button:b.c(Ie),padButton:b.p(Ee),brdButton:b({border:"none"}).br(Ue),bgPrimary:b({background:Me}),primary:b.c($e),bgInfo:b({background:Ke}),info:b.c(Je),bgWarn:b({background:Ve}),warn:b.c(Ye),bgError:b({background:er}),error:b.c(tr)});n.assign(u,{button:ar,gridFlex:dr});o.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:or+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:u.button+" "+b.brdButton.class})}var l={header:{lhs:{},rhs:{}},theme:{}};var h=function(){function e(e){if(e===void 0){e=""}this.loadBranding=t(l);this.branding=this.loadBranding.map((function(e){return n.merge({},l,e)}));this.path=e;this.header=this.branding.map((function(e){var r=e.header,t=e.theme;c(t);return r}))}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?r.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function f(e){if(n.isString(e)){return r.request(e)}else{return Promise.resolve(e)}}function p(e,t){t({message:String(e.message),context:"error"});r.redraw()}function g(e,t){window.history.replaceState(null,"",window.location.href);var i;var a;var s;return f(e).then((function(e){i=e;o.updateConfig({signFont:"Caveat"});if(i.uiWidgets){o.updateConfig(i.uiWidgets)}a=new h(i.brandingPath);s=d(i.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var r=e.url;return window.location.href=r}));s.applicationChannel.bind("reloadbranding",(function(){return a.load().then(r.redraw)}));s.applicationUserChannel.bind("notification",(function(e){t(e);r.redraw()}));return Promise.all([a.load().catch(n.noop),new Promise((function(e){s.pusher.connection.bind("connected",(function(){return e()}))}))])})).catch((function(e){return p(e,t)})).then((function(){s.pusher.connection.unbind("connected");return{application:i,brand:a,pusher:s}}))}function v(e){if(typeof e==="string"){return a("p",e)}else if(e.hasOwnProperty("selector")){var r=e;return a(r.selector,r.content)}else{var t=e;return a("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:t.href},t.text)}}var m=function(){function e(){}e.prototype.view=function(e){var r=e.attrs.data;return a(".ph4",n.map(r,(function(e){return v(e)})))};return e}();var y={};function w(e,r){if(e in y){throw new Error("Component "+e+" is already registered")}else{y[e]=r}}w("basic",m);function x(e){var r=e.type,t=e.data;if(r in y){return a(y[r],{type:r,data:t})}else{return a("span","Unknown component type: "+r)}}function k(e){return n.map(e,(function(e){return x(e)}))}var B=function(){function e(){}e.prototype.view=function(e){var r=e.attrs;if(r.hasOwnProperty("type")){return x(r)}else if(r.hasOwnProperty("icon")){var t=r;return a(".flex.items-center.mh2",{class:t.classes},a("i.fal.fa-2x.mr2",{class:t.icon}),t.title)}else if(r.hasOwnProperty("src")){var n=r;return a(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:n.classes},a("img.img",{src:n.src,class:n.imageClass,height:n.height,width:n.width}),n.title)}else{var o=r;return a(".mh2",{class:o.classes},o.title||"")}};return e}();var C=function(){function e(){}e.prototype.view=function(e){var r=e.attrs,t=r.auth,n=t.logoutPath,o=t.logoutLabel,i=t.logoutIcon,s=i===void 0?"fa-sign-out-alt":i,d=r.classes;return a("a.link.ma2",{href:n,class:d},[o?a("span.mr2",o):null,a("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:s})])};return e}();function F(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var H=function(){function e(){this.active=false}e.prototype.oninit=function(e){var r=this;var n=e.attrs.notification;n.map((function(e){var n=e.message,o=e.duration,i=o===void 0?3e3:o;if(n){r.active=true;setTimeout((function(){return r.dismiss()}),i)}return t.SKIP}))};e.prototype.view=function(e){var r=this;var t=e.attrs.notification;var n=t(),o=n.message,i=n.context;return a(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return r.dismiss()},class:F(i),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},o)};e.prototype.dismiss=function(){if(this.active){this.active=false;a.redraw()}};return e}();function P(e){return(e*100).toFixed(0)+"%"}var S=function(){function e(){this.saving=t();this.progress=t()}e.prototype.oninit=function(e){var r=e.attrs,t=r.saving,n=r.progress;if(t){this.saving=t}if(n){this.progress=n}};e.prototype.view=function(e){var r=e.attrs,t=r.application,n=t.version,o=t.auth,i=t.poweredBy,s=i===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:i,d=t.copyright,u=d===void 0?"2020 Secure Digital Exchange Limited":d,c=r.header,l=c.lhs,h=c.rhs,f=r.notification,p=r.fullScreen,g=r.headerClass,v=g===void 0?"":g,m=r.footerClass,y=m===void 0?"":m,w=r.logout,x=w===void 0?true:w,k=e.children;var F=this.saving();var S=F?this.progress():0;return[f?a(H,{notification:f}):null,a("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:p?undefined:b.layoutL.class},[a(".w-100"+b.shrink0,{class:v},a(".flex.items-center"+b.header.headerHeight.bgHeader.bbHeader.brdHeader,[a(B,l),a(".ml-auto",a(B,h)),o&&x?a(C,{auth:o,classes:"items-center dn flex-l "+b.header.class}):null])),k]),a(".w-100",{class:y},a("nav.flex.items-center.content-end"+b.footerHeight.bgFooter.footer,[s?a("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:s.href},a("img.img.h-100.o-80",{src:s.src,title:s.title})):null,a("p.center.f7",{title:n},[a.trust("&copy; "),u]),a("span.ma2.f3",{class:S?"":"dn"},P(S)),a("i.ma2.f3.fal.fa-spinner",{class:F?"fa-spin":"dn"}),o&&x?a(C,{auth:o,classes:"items-center flex dn-l "+b.footer.class}):null]))]};return e}();var L=function(){function e(){}e.prototype.view=function(e){var r=e.attrs,t=r.header,n=r.headerClass,o=r.subheader,i=r.subheaderClass,s=r.content,d=r.wrapContent,u=d===void 0?true:d,c=r.footer;return[t?a(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:n},t):null,o?a("div"+b.shrink0,{class:i},o):null,u?a(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,s):s,c]};return e}();function O(e,r){var n=r.toastMessage,o=n===void 0?{message:""}:n,i=r.title,s=i===void 0?"UNTITLED":i,d=r.lines,u=d===void 0?[]:d,c=r.returnBtn;var l=t(o);return g(e,l).then((function(e){var r=e.application,t=e.brand,n=e.pusher;a.mount(document.getElementById("page"),{view:function(){return a(S,{header:t.header(),application:r,notification:l},a(L,{content:[a(".ph4",[a("p.f3.fw4",s),x({type:"basic",data:u}),c&&r.auth?x({type:"basic",data:{href:r.auth.loginPath,text:"RETURN TO LOGIN"}}):null]),r.footer?x(r.footer):null]}))}});return{application:r,pusher:n}}))}e.basic=O;e.buildComponent=x;e.buildComponentList=k;e.registerComponent=w;Object.defineProperty(e,"__esModule",{value:true})}));
