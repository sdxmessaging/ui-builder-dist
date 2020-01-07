(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("lodash"),require("mithril/stream"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","mithril","lodash","mithril/stream","@sdxmessaging/ui-widgets","pusher-js"],t):(e=e||self,t(e.uiBuilder={},e.m,e._,e.m.stream,e.uiWidgets,e.Pusher))})(this,(function(e,t,n,r,i,o){"use strict";var a="default"in t?t["default"]:t;n=n&&n.hasOwnProperty("default")?n["default"]:n;r=r&&r.hasOwnProperty("default")?r["default"]:r;o=o&&o.hasOwnProperty("default")?o["default"]:o;var s={bind:function(){return null}};function u(e){var t=e.mock,n=e.apiKey,r=e.cloudChannel,i=e.companyChannel,a=e.userChannel,u=e.applicationChannel,d=e.applicationUserChannel;if(t){return{pusher:{},cloudChannel:s,companyChannel:s,userChannel:s,applicationChannel:s,applicationUserChannel:s}}var l=new o(n,{cluster:"eu",encrypted:true});return{pusher:l,cloudChannel:l.subscribe(r),companyChannel:l.subscribe(i),userChannel:l.subscribe(a),applicationChannel:l.subscribe(u),applicationUserChannel:l.subscribe(d)}}function d(e){var t=e.background,n=t===void 0?"DodgerBlue":t,r=e.highlight,o=r===void 0?"unset":r,a=e.text,s=a===void 0?"DodgerBlue":a,u=e.altText,d=u===void 0?"white":u,l=e.logoBackground,c=l===void 0?"transparent":l,f=e.logoBorderRadius,h=f===void 0?".25rem":f,p=e.headerHeight,g=p===void 0?"3rem":p,v=e.headerBackground,m=v===void 0?n:v,w=e.headerText,y=w===void 0?d:w,x=e.headerBorderRadius,C=x===void 0?"0px":x,k=e.panelBackground,B=k===void 0?"transparent":k,F=e.panelBorderRadius,P=F===void 0?".25rem":F,H=e.footerHeight,E=H===void 0?"3rem":H,O=e.footerBackground,T=O===void 0?"#F4F4F4":O,q=e.lineHeight,S=q===void 0?"1.9em":q,U=e.buttonBackground,W=U===void 0?n:U,j=e.buttonText,D=j===void 0?d:j,I=e.buttonBorderRadius,L=I===void 0?".25rem":I,R=e.tableHeaderBackground,_=R===void 0?n:R,A=e.tableHeaderText,K=A===void 0?d:A,z=e.primaryBackground,M=z===void 0?W:z,$=e.primaryText,G=$===void 0?D:$,J=e.bgInfo,N=J===void 0?"#357EDD":J,Q=e.txtInfo,V=Q===void 0?"#FFFFFF":Q,X=e.bgWarn,Y=X===void 0?"#FFD700":X,Z=e.txtWarn,ee=Z===void 0?"#111111":Z,te=e.bgError,ne=te===void 0?"#E7040F":te,re=e.txtError,ie=re===void 0?"#FFFFFF":re,oe=e.inpBrdClass,ae=oe===void 0?"bn":oe;b.helper({shrink0:b.flexShrink("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:n}),branding:b.color(s),brandingAlt:b.color(d),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLogo:b({background:c}),brdLogo:b.br(h),headerHeight:b.height(g),bgHeader:b({background:m}),header:b.color(y),brdHeader:b.br(C),bgPanel:b({background:B}),brdPanel:b.br(P),footerHeight:b.height(E),bgFooter:b({background:T}),inputHeight:b.height(S),inputFocus:b({":focus":{"border-color":o}}),active:b({"box-shadow":"0px 0px 8px "+s}),inactive:b({":hover":{"box-shadow":"0px 0px 4px "+s}}),empty:b({background:"#FFF5BE"}),bgThead:b({background:_}),thead:b.color(K),bgButton:b({background:W}),button:b.color(D),brdButton:b({border:"none"}).br(L),bgPrimary:b({background:M}),primary:b.color(G),bgInfo:b({background:N}),info:b.color(V),bgWarn:b({background:Y}),warn:b.color(ee),bgError:b({background:ne}),error:b.color(ie)});i.updateTheme({icon:"fal",lblCol:b.branding,inpHgt:b.inputHeight.class,inpBrd:ae+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnBrd:b.brdButton})}var l={header:{lhs:{},rhs:{}},theme:{}};var c=function(){function e(e){if(e===void 0){e=""}this.loadBranding=r(l);this.branding=this.loadBranding.map((function(e){return n.merge({},l,e)}));this.path=e;this.header=this.branding.map((function(e){var t=e.header,n=e.theme;d(n);return t}))}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?t.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function f(e){if(n.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function h(e,t){t({message:String(e.message),context:"error"});a.redraw()}function p(e,n,o){if(o===void 0){o={message:""}}window.history.replaceState(null,"",window.location.href);var a;var s;var d;var l=r(o);return f(n).then((function(n){a=n;i.updateConfig({signFont:"Caveat"});if(a.uiWidgets){i.updateConfig(a.uiWidgets)}s=new c(a.brandingPath);d=u(e);d.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));d.applicationUserChannel.bind("redirect",(function(e){return window.location.href=e.url}));d.applicationChannel.bind("reloadbranding",(function(){return s.load().then(t.redraw)}));d.applicationUserChannel.bind("notification",(function(e){return l(e)}));return s.load()})).catch((function(e){return h(e,l)})).then((function(){return{application:a,brand:s,pusher:d,notification:l}}))}function g(e){if(typeof e==="string"){return a("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return a(t.selector,t.content)}else{var n=e;return a("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:n.href},n.text)}}var v=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return a(".ph4",n.map(t,(function(e){return g(e)})))};return e}();var m={};function w(e,t){if(e in m){throw new Error("Component "+e+" is already registered")}else{m[e]=t}}w("basic",v);function y(e){var t=e.type,n=e.data;if(t in m){return a(m[t],{type:t,data:n})}else{return a("span","Unknown component type: "+t)}}function x(e){return n.map(e,(function(e){return y(e)}))}var C=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return y(t)}else if(t.hasOwnProperty("icon")){var n=t;return a(".flex.items-center.mh2",{class:n.classes},a("i.fal.fa-2x.mr2",{class:n.icon}),n.title)}else if(t.hasOwnProperty("src")){var r=t;return a(".flex.items-center.mh2"+b.bgLogo.brdLogo,{class:r.classes},a("img.img",{src:r.src,class:r.imageClass,height:r.height,width:r.width}),r.title)}else{var i=t;return a(".mh2",{class:i.classes},i.title||"")}};return e}();function k(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var B=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var n=e.attrs.notification;n.map((function(e){var n=e.message,i=e.duration,o=i===void 0?3e3:i;if(n){t.active=true;setTimeout((function(){return t.dismiss()}),o)}return r.SKIP}))};e.prototype.view=function(e){var t=this;var n=e.attrs.notification;var r=n(),i=r.message,o=r.context;return a(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:k(o),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},i)};e.prototype.dismiss=function(){if(this.active){this.active=false;a.redraw()}};return e}();function F(e){return(e*100).toFixed(0)+"%"}var P=function(){function e(){this.saving=r();this.progress=r()}e.prototype.oninit=function(e){var t=e.attrs,n=t.saving,r=t.progress;if(n){this.saving=n}if(r){this.progress=r}};e.prototype.view=function(e){var t=e.attrs,n=t.application,r=n.version,i=n.auth,o=t.header,s=o.lhs,u=o.rhs,d=t.notification,l=t.containerClass,c=l===void 0?"mv2-l mw8-l shadow-4-l":l,f=t.headerClass,h=f===void 0?"":f,p=t.footerClass,g=p===void 0?"":p,v=t.logout,m=v===void 0?true:v,w=e.children;var y=this.saving();var x=y?this.progress():0;return[a("span.clip",{style:{"font-family":"Caveat"}},"test"),d?a(B,{notification:d}):null,a("main.flex-auto.flex.flex-column.self-center.w-100",{class:c},[a(".w-100",{class:h},a(".flex.justify-between.items-center"+b.shrink0.headerHeight.bgHeader.header,[a(C,s),a(C,u)])),w]),a(".w-100",{class:g},a("nav.ph2.flex.items-center.content-end"+b.footerHeight.bgFooter,[a("p.mr-auto.f7.silver",{title:r},a.trust("&copy; 2019 Secure Digital Exchange Limited")),a("span.ma2.f3.silver",{class:x?"":"dn"},F(x)),a("i.f3.mid-gray.fal.fa-spinner",{class:y?"fa-spin":"dn"}),i&&m?a("a.ml2.mid-gray",{href:i.logoutPath},a("i.fal.fa-fw.fa-2x.fa-sign-out-alt[aria-hidden=true]")):null]))]};return e}();var H=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.header,r=t.subheader,i=t.content,o=t.footer;return[n?a(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,n):null,r?a("div"+b.shrink0,r):null,a(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,i),o]};return e}();function E(e,t,n){var r=n.notification,i=n.fullScreen,o=n.getContent;p(e,t).then((function(e){var t=e.application,n=e.brand;a.mount(document.getElementById("page"),{view:function(){return a(P,{header:n.header(),application:t,notification:r,containerClass:i?"":undefined},a(H,{content:o()}))}})}))}e.buildComponent=y;e.buildComponentList=x;e.custom=E;e.registerComponent=w;Object.defineProperty(e,"__esModule",{value:true})}));
