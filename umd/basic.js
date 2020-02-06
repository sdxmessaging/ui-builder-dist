(function(e,n){typeof exports==="object"&&typeof module!=="undefined"?n(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js"],n):(e=e||self,n(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher))})(this,(function(e,n,t,r,i,o){"use strict";var a="default"in n?n["default"]:n;t=t&&t.hasOwnProperty("default")?t["default"]:t;r=r&&r.hasOwnProperty("default")?r["default"]:r;o=o&&o.hasOwnProperty("default")?o["default"]:o;var s={bind:function(){return null}};function u(e){var n=e.mock,t=e.apiKey,r=e.cloudChannel,i=e.companyChannel,a=e.userChannel,u=e.applicationChannel,d=e.applicationUserChannel;if(n){return{pusher:{connection:{bind:function(e,n){return setImmediate(n)},unbind:function(){return null}}},cloudChannel:s,companyChannel:s,userChannel:s,applicationChannel:s,applicationUserChannel:s}}var c=new o(t,{cluster:"eu",encrypted:true});return{pusher:c,cloudChannel:c.subscribe(r),companyChannel:c.subscribe(i),userChannel:c.subscribe(a),applicationChannel:c.subscribe(u),applicationUserChannel:c.subscribe(d)}}function d(e){var n=e.background,t=n===void 0?"DodgerBlue":n,r=e.highlight,o=r===void 0?"unset":r,a=e.text,s=a===void 0?"DodgerBlue":a,u=e.altText,d=u===void 0?"white":u,c=e.logoBackground,l=c===void 0?"transparent":c,f=e.logoBorderRadius,h=f===void 0?".25rem":f,p=e.headerHeight,g=p===void 0?"3rem":p,v=e.headerBackground,m=v===void 0?t:v,w=e.headerText,y=w===void 0?d:w,x=e.headerBorderRadius,C=x===void 0?"0px":x,k=e.cardBackground,B=k===void 0?t:k,F=e.cardBorderRadius,P=F===void 0?"0px":F,H=e.cardText,T=H===void 0?d:H,E=e.panelBackground,O=E===void 0?"transparent":E,I=e.panelBorderRadius,U=I===void 0?".25rem":I,L=e.footerHeight,q=L===void 0?"3rem":L,D=e.footerBackground,R=D===void 0?"#F4F4F4":D,W=e.footerText,j=W===void 0?"#999":W,S=e.lineHeight,N=S===void 0?"1.9em":S,_=e.buttonBackground,A=_===void 0?t:_,K=e.buttonText,M=K===void 0?d:K,z=e.buttonBorderRadius,G=z===void 0?".25rem":z,$=e.tableHeaderBackground,J=$===void 0?t:$,Q=e.tableHeaderText,V=Q===void 0?d:Q,X=e.primaryBackground,Y=X===void 0?A:X,Z=e.primaryText,ee=Z===void 0?M:Z,ne=e.bgInfo,te=ne===void 0?"#357EDD":ne,re=e.txtInfo,ie=re===void 0?"#FFFFFF":re,oe=e.bgWarn,ae=oe===void 0?"#FFD700":oe,se=e.txtWarn,ue=se===void 0?"#111111":se,de=e.bgError,ce=de===void 0?"#E7040F":de,le=e.txtError,fe=le===void 0?"#FFFFFF":le,be=e.inpBrdClass,he=be===void 0?"bn":be;b.helper({shrink0:b.flexShrink("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:t}),branding:b.color(s),brandingAlt:b.color(d),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLogo:b({background:l}),brdLogo:b.br(h),headerHeight:b.height(g),bgHeader:b({background:m}),header:b.color(y),brdHeader:b.br(C),card:b.color(T),bgCard:b({background:B}),brdCard:b.br(P),bgPanel:b({background:O}),brdPanel:b.br(U),footerHeight:b.height(q),bgFooter:b({background:R}),footer:b.color(j),inputHeight:b.height(N),inputFocus:b({":focus":{"border-color":o}}),active:b({outline:s+" inset 0.125rem"}),inactive:b({":hover":{outline:s+" inset 0.125rem"}}),empty:b({background:"#FFF5BE"}),bgThead:b({background:J}),thead:b.color(V),bgButton:b({background:A}),button:b.color(M),brdButton:b({border:"none"}).br(G),bgPrimary:b({background:Y}),primary:b.color(ee),bgInfo:b({background:te}),info:b.color(ie),bgWarn:b({background:ae}),warn:b.color(ue),bgError:b({background:ce}),error:b.color(fe)});i.updateTheme({icon:"fal",lblCol:b.branding,inpHgt:b.inputHeight.class,inpBrd:he+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnBrd:b.brdButton})}var c={header:{lhs:{},rhs:{}},theme:{}};var l=function(){function e(e){if(e===void 0){e=""}this.loadBranding=t(c);this.branding=this.loadBranding.map((function(e){return r.merge({},c,e)}));this.path=e;this.header=this.branding.map((function(e){var n=e.header,t=e.theme;d(t);return n}))}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?n.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function f(e){if(r.isString(e)){return n.request(e)}else{return Promise.resolve(e)}}function h(e,t){t({message:String(e.message),context:"error"});n.redraw()}function p(e,t,r){window.history.replaceState(null,"",window.location.href);var o;var a;var s;return f(t).then((function(t){o=t;i.updateConfig({signFont:"Caveat"});if(o.uiWidgets){i.updateConfig(o.uiWidgets)}a=new l(o.brandingPath);s=u(e);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){return window.location.href=e.url}));s.applicationChannel.bind("reloadbranding",(function(){return a.load().then(n.redraw)}));s.applicationUserChannel.bind("notification",(function(e){r(e);n.redraw()}));return Promise.all([a.load(),new Promise((function(e){s.pusher.connection.bind("connected",(function(){return e()}))}))])})).catch((function(e){return h(e,r)})).then((function(){s.pusher.connection.unbind("connected");return{application:o,brand:a,pusher:s}}))}function g(e){if(typeof e==="string"){return a("p",e)}else if(e.hasOwnProperty("selector")){var n=e;return a(n.selector,n.content)}else{var t=e;return a("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:t.href},t.text)}}var v=function(){function e(){}e.prototype.view=function(e){var n=e.attrs.data;return a(".ph4",r.map(n,(function(e){return g(e)})))};return e}();var m={};function w(e,n){if(e in m){throw new Error("Component "+e+" is already registered")}else{m[e]=n}}w("basic",v);function y(e){var n=e.type,t=e.data;if(n in m){return a(m[n],{type:n,data:t})}else{return a("span","Unknown component type: "+n)}}function x(e){return r.map(e,(function(e){return y(e)}))}var C=function(){function e(){}e.prototype.view=function(e){var n=e.attrs;if(n.hasOwnProperty("type")){return y(n)}else if(n.hasOwnProperty("icon")){var t=n;return a(".flex.items-center.mh2",{class:t.classes},a("i.fal.fa-2x.mr2",{class:t.icon}),t.title)}else if(n.hasOwnProperty("src")){var r=n;return a(".flex.items-center.mh2"+b.bgLogo.brdLogo,{class:r.classes},a("img.img",{src:r.src,class:r.imageClass,height:r.height,width:r.width}),r.title)}else{var i=n;return a(".mh2",{class:i.classes},i.title||"")}};return e}();function k(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var B=function(){function e(){this.active=false}e.prototype.oninit=function(e){var n=this;var r=e.attrs.notification;r.map((function(e){var r=e.message,i=e.duration,o=i===void 0?3e3:i;if(r){n.active=true;setTimeout((function(){return n.dismiss()}),o)}return t.SKIP}))};e.prototype.view=function(e){var n=this;var t=e.attrs.notification;var r=t(),i=r.message,o=r.context;return a(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return n.dismiss()},class:k(o),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},i)};e.prototype.dismiss=function(){if(this.active){this.active=false;a.redraw()}};return e}();function F(e){return(e*100).toFixed(0)+"%"}var P=function(){function e(){this.saving=t();this.progress=t()}e.prototype.oninit=function(e){var n=e.attrs,t=n.saving,r=n.progress;if(t){this.saving=t}if(r){this.progress=r}};e.prototype.view=function(e){var n=e.attrs,t=n.application,r=t.version,i=t.auth,o=t.copyright,s=o===void 0?"2020 Secure Digital Exchange Limited":o,u=n.header,d=u.lhs,c=u.rhs,l=n.notification,f=n.containerClass,h=f===void 0?"mv2-l mw8-l shadow-4-l":f,p=n.headerClass,g=p===void 0?"":p,v=n.footerClass,m=v===void 0?"":v,w=n.logout,y=w===void 0?true:w,x=e.children;var k=this.saving();var P=k?this.progress():0;return[a("span.clip",{style:{"font-family":"Caveat"}},"test"),l?a(B,{notification:l}):null,a("main.flex-auto.flex.flex-column.self-center.w-100",{class:h},[a(".w-100",{class:g},a(".flex.justify-between.items-center"+b.shrink0.headerHeight.bgHeader.header,[a(C,d),a(C,c)])),x]),a(".w-100",{class:m},a("nav.ph2.flex.items-center.content-end"+b.footerHeight.bgFooter.footer,[a("p.center.f7",{title:r},[a.trust("&copy; "),s]),a("span.ma2.f3",{class:P?"":"dn"},F(P)),a("i.f3.mid-gray.fal.fa-spinner",{class:k?"fa-spin":"dn"}),i&&y?a("a.ml2.mid-gray",{href:i.logoutPath},a("i.fal.fa-fw.fa-2x.fa-sign-out-alt[aria-hidden=true]")):null]))]};return e}();var H=function(){function e(){}e.prototype.view=function(e){var n=e.attrs,t=n.header,r=n.headerClass,i=n.subheader,o=n.subheaderClass,s=n.content,u=n.wrapContent,d=u===void 0?true:u,c=n.footer;return[t?a(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:r},t):null,i?a("div"+b.shrink0,{class:o},i):null,d?a(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,s):s,c]};return e}();function T(e,n,r){var i=r.toastMessage,o=i===void 0?{message:""}:i,s=r.title,u=s===void 0?"UNTITLED":s,d=r.lines,c=d===void 0?[]:d,l=r.returnBtn;var f=t(o);p(e,n,f).then((function(e){var n=e.application,t=e.brand;a.mount(document.getElementById("page"),{view:function(){return a(P,{header:t.header(),application:n,notification:f},a(H,{content:[a(".ph4",[a("p.f3.fw4",u),y({type:"basic",data:c}),l&&n.auth?y({type:"basic",data:{href:n.auth.loginPath,text:"RETURN TO LOGIN"}}):null]),n.footer?y(n.footer):null]}))}})}))}e.basic=T;e.buildComponent=y;e.buildComponentList=x;e.registerComponent=w;Object.defineProperty(e,"__esModule",{value:true})}));
