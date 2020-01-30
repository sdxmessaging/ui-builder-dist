(function(e,n){typeof exports==="object"&&typeof module!=="undefined"?n(exports,require("js-sha256"),require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","js-sha256","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js"],n):(e=e||self,n(e.uiBuilder={},e.sha256,e.m,e.m.stream,e._,e.uiWidgets,e.Pusher))})(this,(function(e,n,t,r,i,a,o){"use strict";var s="default"in t?t["default"]:t;r=r&&r.hasOwnProperty("default")?r["default"]:r;i=i&&i.hasOwnProperty("default")?i["default"]:i;o=o&&o.hasOwnProperty("default")?o["default"]:o;var u={bind:function(){return null}};function c(e){var n=e.mock,t=e.apiKey,r=e.cloudChannel,i=e.companyChannel,a=e.userChannel,s=e.applicationChannel,c=e.applicationUserChannel;if(n){return{pusher:{connection:{bind:function(e,n){return setImmediate(n)},unbind:function(){return null}}},cloudChannel:u,companyChannel:u,userChannel:u,applicationChannel:u,applicationUserChannel:u}}var d=new o(t,{cluster:"eu",encrypted:true});return{pusher:d,cloudChannel:d.subscribe(r),companyChannel:d.subscribe(i),userChannel:d.subscribe(a),applicationChannel:d.subscribe(s),applicationUserChannel:d.subscribe(c)}}function d(e){var n=e.background,t=n===void 0?"DodgerBlue":n,r=e.highlight,i=r===void 0?"unset":r,o=e.text,s=o===void 0?"DodgerBlue":o,u=e.altText,c=u===void 0?"white":u,d=e.logoBackground,l=d===void 0?"transparent":d,f=e.logoBorderRadius,h=f===void 0?".25rem":f,p=e.headerHeight,g=p===void 0?"3rem":p,v=e.headerBackground,m=v===void 0?t:v,w=e.headerText,y=w===void 0?c:w,x=e.headerBorderRadius,C=x===void 0?"0px":x,k=e.cardBackground,B=k===void 0?t:k,F=e.cardBorderRadius,P=F===void 0?"0px":F,H=e.cardText,E=H===void 0?c:H,T=e.panelBackground,q=T===void 0?"transparent":T,O=e.panelBorderRadius,j=O===void 0?".25rem":O,I=e.footerHeight,U=I===void 0?"3rem":I,W=e.footerBackground,D=W===void 0?"#F4F4F4":W,L=e.footerText,S=L===void 0?"#999":L,R=e.lineHeight,N=R===void 0?"1.9em":R,A=e.buttonBackground,_=A===void 0?t:A,K=e.buttonText,z=K===void 0?c:K,M=e.buttonBorderRadius,$=M===void 0?".25rem":M,G=e.tableHeaderBackground,J=G===void 0?t:G,Q=e.tableHeaderText,V=Q===void 0?c:Q,X=e.primaryBackground,Y=X===void 0?_:X,Z=e.primaryText,ee=Z===void 0?z:Z,ne=e.bgInfo,te=ne===void 0?"#357EDD":ne,re=e.txtInfo,ie=re===void 0?"#FFFFFF":re,ae=e.bgWarn,oe=ae===void 0?"#FFD700":ae,se=e.txtWarn,ue=se===void 0?"#111111":se,ce=e.bgError,de=ce===void 0?"#E7040F":ce,le=e.txtError,fe=le===void 0?"#FFFFFF":le,be=e.inpBrdClass,he=be===void 0?"bn":be;b.helper({shrink0:b.flexShrink("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:t}),branding:b.color(s),brandingAlt:b.color(c),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLogo:b({background:l}),brdLogo:b.br(h),headerHeight:b.height(g),bgHeader:b({background:m}),header:b.color(y),brdHeader:b.br(C),card:b.color(E),bgCard:b({background:B}),brdCard:b.br(P),bgPanel:b({background:q}),brdPanel:b.br(j),footerHeight:b.height(U),bgFooter:b({background:D}),footer:b.color(S),inputHeight:b.height(N),inputFocus:b({":focus":{"border-color":i}}),active:b({"box-shadow":"0px 0px 8px "+s}),inactive:b({":hover":{"box-shadow":"0px 0px 4px "+s}}),empty:b({background:"#FFF5BE"}),bgThead:b({background:J}),thead:b.color(V),bgButton:b({background:_}),button:b.color(z),brdButton:b({border:"none"}).br($),bgPrimary:b({background:Y}),primary:b.color(ee),bgInfo:b({background:te}),info:b.color(ie),bgWarn:b({background:oe}),warn:b.color(ue),bgError:b({background:de}),error:b.color(fe)});a.updateTheme({icon:"fal",lblCol:b.branding,inpHgt:b.inputHeight.class,inpBrd:he+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnBrd:b.brdButton})}var l={header:{lhs:{},rhs:{}},theme:{}};var f=function(){function e(e){if(e===void 0){e=""}this.loadBranding=r(l);this.branding=this.loadBranding.map((function(e){return i.merge({},l,e)}));this.path=e;this.header=this.branding.map((function(e){var n=e.header,t=e.theme;d(t);return n}))}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?t.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function h(e){if(i.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function p(e,n){n({message:String(e.message),context:"error"});t.redraw()}function g(e,n,r){window.history.replaceState(null,"",window.location.href);var i;var o;var s;return h(n).then((function(n){i=n;a.updateConfig({signFont:"Caveat"});if(i.uiWidgets){a.updateConfig(i.uiWidgets)}o=new f(i.brandingPath);s=c(e);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){return window.location.href=e.url}));s.applicationChannel.bind("reloadbranding",(function(){return o.load().then(t.redraw)}));s.applicationUserChannel.bind("notification",(function(e){r(e);t.redraw()}));return Promise.all([o.load(),new Promise((function(e){s.pusher.connection.bind("connected",(function(){return e()}))}))])})).catch((function(e){return p(e,r)})).then((function(){s.pusher.connection.unbind("connected");return{application:i,brand:o,pusher:s}}))}function v(e){if(typeof e==="string"){return s("p",e)}else if(e.hasOwnProperty("selector")){var n=e;return s(n.selector,n.content)}else{var t=e;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:t.href},t.text)}}var m=function(){function e(){}e.prototype.view=function(e){var n=e.attrs.data;return s(".ph4",i.map(n,(function(e){return v(e)})))};return e}();var w={};function y(e,n){if(e in w){throw new Error("Component "+e+" is already registered")}else{w[e]=n}}y("basic",m);function x(e){var n=e.type,t=e.data;if(n in w){return s(w[n],{type:n,data:t})}else{return s("span","Unknown component type: "+n)}}function C(e){return i.map(e,(function(e){return x(e)}))}var k=function(){function e(){}e.prototype.view=function(e){var n=e.attrs;if(n.hasOwnProperty("type")){return x(n)}else if(n.hasOwnProperty("icon")){var t=n;return s(".flex.items-center.mh2",{class:t.classes},s("i.fal.fa-2x.mr2",{class:t.icon}),t.title)}else if(n.hasOwnProperty("src")){var r=n;return s(".flex.items-center.mh2"+b.bgLogo.brdLogo,{class:r.classes},s("img.img",{src:r.src,class:r.imageClass,height:r.height,width:r.width}),r.title)}else{var i=n;return s(".mh2",{class:i.classes},i.title||"")}};return e}();function B(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var F=function(){function e(){this.active=false}e.prototype.oninit=function(e){var n=this;var t=e.attrs.notification;t.map((function(e){var t=e.message,i=e.duration,a=i===void 0?3e3:i;if(t){n.active=true;setTimeout((function(){return n.dismiss()}),a)}return r.SKIP}))};e.prototype.view=function(e){var n=this;var t=e.attrs.notification;var r=t(),i=r.message,a=r.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return n.dismiss()},class:B(a),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},i)};e.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return e}();function P(e){return(e*100).toFixed(0)+"%"}var H=function(){function e(){this.saving=r();this.progress=r()}e.prototype.oninit=function(e){var n=e.attrs,t=n.saving,r=n.progress;if(t){this.saving=t}if(r){this.progress=r}};e.prototype.view=function(e){var n=e.attrs,t=n.application,r=t.version,i=t.auth,a=t.copyright,o=a===void 0?"2020 Secure Digital Exchange Limited":a,u=n.header,c=u.lhs,d=u.rhs,l=n.notification,f=n.containerClass,h=f===void 0?"mv2-l mw8-l shadow-4-l":f,p=n.headerClass,g=p===void 0?"":p,v=n.footerClass,m=v===void 0?"":v,w=n.logout,y=w===void 0?true:w,x=e.children;var C=this.saving();var B=C?this.progress():0;return[s("span.clip",{style:{"font-family":"Caveat"}},"test"),l?s(F,{notification:l}):null,s("main.flex-auto.flex.flex-column.self-center.w-100",{class:h},[s(".w-100",{class:g},s(".flex.justify-between.items-center"+b.shrink0.headerHeight.bgHeader.header,[s(k,c),s(k,d)])),x]),s(".w-100",{class:m},s("nav.ph2.flex.items-center.content-end"+b.footerHeight.bgFooter.footer,[s("p.center.f7",{title:r},[s.trust("&copy; "),o]),s("span.ma2.f3",{class:B?"":"dn"},P(B)),s("i.f3.mid-gray.fal.fa-spinner",{class:C?"fa-spin":"dn"}),i&&y?s("a.ml2.mid-gray",{href:i.logoutPath},s("i.fal.fa-fw.fa-2x.fa-sign-out-alt[aria-hidden=true]")):null]))]};return e}();var E=function(){function e(){}e.prototype.view=function(e){var n=e.attrs,t=n.header,r=n.headerClass,i=n.subheader,a=n.subheaderClass,o=n.content,u=n.wrapContent,c=u===void 0?true:u,d=n.footer;return[t?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:r},t):null,i?s("div"+b.shrink0,{class:a},i):null,c?s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,o):o,d]};return e}();var T=function(){function e(){this.username=r("")}e.prototype.view=function(e){var n=this;var t=e.attrs,r=t.header,o=t.application,u=t.notification,c=t.onNext;if(!o.auth){return s("span","No authentication set")}var d=o.auth,l=d.title,f=d.landing;return s(H,{header:r,application:o,notification:u},s(E,{content:f?s(".pa2",[s(".mb2.fw7",l),i.map(f.lines,(function(e){return s("p",e)})),s("form",{onsubmit:function(){c(n.username());return false}},[s(a.BaseInput,{field:{id:"username",label:f.label,type:"text",placeholder:f.placeholder,autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.username}),s(a.Button,{label:"Next",type:"submit",icon:"fa-2x fa-sign-in-alt db center mb2",classes:"w-100 mb3 tc br4",disabled:!this.username()})])]):null}))};return e}();function q(e,i,a){var o=r(a);g(e,i,o).then((function(e){var r=e.application,i=e.brand;s.mount(document.getElementById("page"),{view:function(){return s(T,{application:r,header:i.header(),notification:o,onNext:function(e){if(!r.auth||!r.auth.landing){return}t.request({url:r.auth.landing.endpoint,params:{username:n.sha256(e)}}).then((function(e){var n=e.url;return window.location.href=n})).catch((function(e){var n=e.code,t=e.message;if(n===404){o({message:"Account not found",context:"warn",duration:2e4})}else{o({message:t,context:"error"})}}))}})}})}))}e.buildComponent=x;e.buildComponentList=C;e.landing=q;e.registerComponent=y;Object.defineProperty(e,"__esModule",{value:true})}));
