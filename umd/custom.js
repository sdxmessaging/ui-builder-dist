(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("lodash"),require("mithril/stream"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","mithril","lodash","mithril/stream","@sdxmessaging/ui-widgets","pusher-js"],t):(e=e||self,t(e.uiBuilder={},e.m,e._,e.m.stream,e.uiWidgets,e.Pusher))})(this,(function(e,t,r,n,i,o){"use strict";var a="default"in t?t["default"]:t;r=r&&r.hasOwnProperty("default")?r["default"]:r;n=n&&n.hasOwnProperty("default")?n["default"]:n;o=o&&o.hasOwnProperty("default")?o["default"]:o;function s(e){var t=e.apiKey,r=e.cloudChannel,n=e.companyChannel,i=e.userChannel,a=e.applicationChannel,s=e.applicationUserChannel;var d=new o(t,{cluster:"eu",encrypted:true});return{pusher:d,cloudChannel:d.subscribe(r),companyChannel:d.subscribe(n),userChannel:d.subscribe(i),applicationChannel:d.subscribe(a),applicationUserChannel:d.subscribe(s)}}function d(e){var t=e.background,r=e.highlight,n=r===void 0?"unset":r,o=e.text,a=e.altText,s=e.logoBackground,d=s===void 0?"transparent":s,u=e.logoBorderRadius,c=u===void 0?".25rem":u,l=e.headerHeight,f=l===void 0?"3rem":l,h=e.headerBackground,p=h===void 0?t:h,g=e.headerText,v=g===void 0?a:g,m=e.headerBorderRadius,w=m===void 0?"0px":m,y=e.panelBackground,x=y===void 0?"transparent":y,k=e.panelBorderRadius,F=k===void 0?".25rem":k,B=e.footerHeight,C=B===void 0?"3rem":B,P=e.footerBackground,H=P===void 0?"#F4F4F4":P,I=e.lineHeight,E=I===void 0?"1.9em":I,O=e.buttonBackground,T=O===void 0?t:O,j=e.buttonText,q=j===void 0?a:j,S=e.buttonBorderRadius,W=S===void 0?".25rem":S,D=e.tableHeaderBackground,L=D===void 0?t:D,R=e.tableHeaderText,U=R===void 0?a:R,_=e.primaryBackground,A=_===void 0?"#137752":_,K=e.primaryText,z=K===void 0?"#FFFFFF":K,M=e.bgInfo,$=M===void 0?"#357EDD":M,G=e.txtInfo,J=G===void 0?"#FFFFFF":G,N=e.bgWarn,Q=N===void 0?"#FFD700":N,V=e.txtWarn,X=V===void 0?"#111111":V,Y=e.bgError,Z=Y===void 0?"#E7040F":Y,ee=e.txtError,te=ee===void 0?"#FFFFFF":ee,re=e.inpBrdClass,ne=re===void 0?"bn":re;b.helper({shrink0:b.flexShrink("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:t}),branding:b.color(o),brandingAlt:b.color(a),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLogo:b({background:d}),brdLogo:b.br(c),headerHeight:b.height(f),bgHeader:b({background:p}),header:b.color(v),brdHeader:b.br(w),bgPanel:b({background:x}),brdPanel:b.br(F),footerHeight:b.height(C),bgFooter:b({background:H}),inputHeight:b.height(E),inputFocus:b({":focus":{"border-color":n}}),active:b({"box-shadow":"0px 0px 8px "+o}),inactive:b({":hover":{"box-shadow":"0px 0px 4px "+o}}),empty:b({background:"#FFF5BE"}),bgThead:b({background:L}),thead:b.color(U),bgButton:b({background:T}),button:b.color(q),brdButton:b({border:"none"}).br(W),bgPrimary:b({background:A}),primary:b.color(z),bgInfo:b({background:$}),info:b.color(J),bgWarn:b({background:Q}),warn:b.color(X),bgError:b({background:Z}),error:b.color(te)});i.updateTheme({icon:"fal",lblCol:b.branding,inpHgt:b.inputHeight.class,inpBrd:ne+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnBrd:b.brdButton})}var u={header:{lhs:{},rhs:{}},theme:{background:"DodgerBlue",text:"DodgerBlue",altText:"white"}};var c=function(){function e(e){if(e===void 0){e=""}this.loadBranding=n(u);this.branding=this.loadBranding.map((function(e){return r.merge({},u,e)}));this.path=e;this.header=this.branding.map((function(e){var t=e.header,r=e.theme;d(r);return t}))}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?t.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function l(e){if(r.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function f(e,r,o){if(o===void 0){o={message:""}}window.history.replaceState(null,"",window.location.href);return l(r).then((function(r){i.updateConfig({signFont:"Caveat"});if(r.uiWidgets){i.updateConfig(r.uiWidgets)}var d=new c(r.brandingPath);var u=s(e);u.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));u.applicationUserChannel.bind("redirect",(function(e){return window.location.href=e.url}));u.applicationChannel.bind("reloadbranding",(function(){return d.load().then(t.redraw)}));var l=n(o);u.applicationUserChannel.bind("notification",(function(e){return l(e)}));return{application:r,brand:d,pusher:u,notification:l,errResponse:function(e){console.debug(e);l({message:String(e.message),context:0});a.redraw()}}}))}var h=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("icon")){return a(".flex.items-center.mh2",{class:t.classes},a("i.fal.fa-2x.mr2",{class:t.icon}),t.title)}else if(t.hasOwnProperty("src")){var r=t,n=r.src,i=r.imageClass,o=r.height,s=r.width;return a(".flex.items-center.mh2"+b.bgLogo.brdLogo,{class:t.classes},a("img.img",{src:n,class:i,height:o,width:s}),t.title)}else{return a(".mh2",{class:t.classes},t.title||"")}};return e}();function p(e){if(e===void 0){e=2}switch(e){case 0:return b.bgError.error.class;case 1:return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var g=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var r=e.attrs.notification;r.map((function(e){var r=e.message,i=e.duration,o=i===void 0?3e3:i;if(r){t.active=true;setTimeout((function(){return t.dismiss()}),o)}return n.SKIP}))};e.prototype.view=function(e){var t=this;var r=e.attrs.notification;var n=r(),i=n.message,o=n.context;return a(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:p(o),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},i)};e.prototype.dismiss=function(){if(this.active){this.active=false;a.redraw()}};return e}();function v(e){return(e*100).toFixed(2)+"%"}var m=function(){function e(){this.saveIndicator=n();this.progressIndicator=n()}e.prototype.oninit=function(e){var t=e.attrs,r=t.saving,n=t.progress;if(r){this.saveIndicator=r}if(n){this.progressIndicator=n}};e.prototype.view=function(e){var t=e.attrs,r=t.application,n=r.version,i=r.auth,o=t.header,s=o.lhs,d=o.rhs,u=t.notification,c=t.containerClass,l=c===void 0?"mv2-l mw8-l shadow-4-l":c,f=t.headerClass,p=f===void 0?"":f,m=t.footerClass,w=m===void 0?"":m,y=t.logout,x=y===void 0?true:y,k=e.children;return[a("span.clip",{style:{"font-family":"Caveat"}},"test"),u?a(g,{notification:u}):null,a("main.flex-auto.flex.flex-column.self-center.w-100",{class:l},[a(".w-100",{class:p},a(".flex.justify-between.items-center"+b.shrink0.headerHeight.bgHeader.header,[a(h,s),a(h,d)])),k]),a(".w-100",{class:w},a("nav.ph2.flex.items-center.content-end"+b.footerHeight.bgFooter,[a("p.mr-auto.f7.silver",{title:n},a.trust("&copy; 2019 Secure Digital Exchange Limited")),a("span.ma2.f3.silver",{class:this.saveIndicator()?"":"dn"},v(this.progressIndicator())),a("i.f3.mid-gray.fal.fa-spinner",{class:this.saveIndicator()?"fa-spin":"dn"}),i&&x?a("a.ml2.mid-gray",{href:i.logoutPath},a("i.fal.fa-fw.fa-2x.fa-sign-out-alt[aria-hidden=true]")):null]))]};return e}();var w=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.header,n=t.subheader,i=t.content,o=t.footer;return[r?a(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,r):null,n?a("div"+b.shrink0,n):null,a(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,i),o]};return e}();function y(e,t,r){var n=r.notification,i=r.fullScreen,o=r.getContent;f(e,t).then((function(e){var t=e.application,r=e.brand;r.load().then((function(){a.mount(document.getElementById("page"),{view:function(){return a(m,{header:r.header(),application:t,notification:n,containerClass:i?"":undefined},a(w,{content:o()}))}})}))}))}Object.keys(i).forEach((function(t){if(t!=="default")Object.defineProperty(e,t,{enumerable:true,get:function(){return i[t]}})}));e.custom=y;Object.defineProperty(e,"__esModule",{value:true})}));
