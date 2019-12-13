(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("js-sha256"),require("mithril"),require("lodash"),require("mithril/stream"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","js-sha256","mithril","lodash","mithril/stream","@sdxmessaging/ui-widgets","pusher-js"],t):(e=e||self,t(e.uiBuilder={},e.sha256,e.m,e._,e.m.stream,e.uiWidgets,e.Pusher))})(this,(function(e,t,n,r,i,a,o){"use strict";var s="default"in n?n["default"]:n;r=r&&r.hasOwnProperty("default")?r["default"]:r;i=i&&i.hasOwnProperty("default")?i["default"]:i;o=o&&o.hasOwnProperty("default")?o["default"]:o;var u={bind:function(){return null}};function l(e){var t=e.mock,n=e.apiKey,r=e.cloudChannel,i=e.companyChannel,a=e.userChannel,s=e.applicationChannel,l=e.applicationUserChannel;if(t){return{pusher:{},cloudChannel:u,companyChannel:u,userChannel:u,applicationChannel:u,applicationUserChannel:u}}var c=new o(n,{cluster:"eu",encrypted:true});return{pusher:c,cloudChannel:c.subscribe(r),companyChannel:c.subscribe(i),userChannel:c.subscribe(a),applicationChannel:c.subscribe(s),applicationUserChannel:c.subscribe(l)}}function c(e){var t=e.background,n=t===void 0?"DodgerBlue":t,r=e.highlight,i=r===void 0?"unset":r,o=e.text,s=o===void 0?"DodgerBlue":o,u=e.altText,l=u===void 0?"white":u,c=e.logoBackground,d=c===void 0?"transparent":c,f=e.logoBorderRadius,h=f===void 0?".25rem":f,p=e.headerHeight,g=p===void 0?"3rem":p,v=e.headerBackground,m=v===void 0?n:v,w=e.headerText,y=w===void 0?l:w,x=e.headerBorderRadius,k=x===void 0?"0px":x,C=e.panelBackground,B=C===void 0?"transparent":C,F=e.panelBorderRadius,P=F===void 0?".25rem":F,H=e.footerHeight,E=H===void 0?"3rem":H,q=e.footerBackground,j=q===void 0?"#F4F4F4":q,O=e.lineHeight,T=O===void 0?"1.9em":O,I=e.buttonBackground,U=I===void 0?n:I,W=e.buttonText,D=W===void 0?l:W,L=e.buttonBorderRadius,S=L===void 0?".25rem":L,N=e.tableHeaderBackground,R=N===void 0?n:N,A=e.tableHeaderText,_=A===void 0?l:A,K=e.primaryBackground,z=K===void 0?U:K,M=e.primaryText,$=M===void 0?D:M,G=e.bgInfo,J=G===void 0?"#357EDD":G,Q=e.txtInfo,V=Q===void 0?"#FFFFFF":Q,X=e.bgWarn,Y=X===void 0?"#FFD700":X,Z=e.txtWarn,ee=Z===void 0?"#111111":Z,te=e.bgError,ne=te===void 0?"#E7040F":te,re=e.txtError,ie=re===void 0?"#FFFFFF":re,ae=e.inpBrdClass,oe=ae===void 0?"bn":ae;b.helper({shrink0:b.flexShrink("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:n}),branding:b.color(s),brandingAlt:b.color(l),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLogo:b({background:d}),brdLogo:b.br(h),headerHeight:b.height(g),bgHeader:b({background:m}),header:b.color(y),brdHeader:b.br(k),bgPanel:b({background:B}),brdPanel:b.br(P),footerHeight:b.height(E),bgFooter:b({background:j}),inputHeight:b.height(T),inputFocus:b({":focus":{"border-color":i}}),active:b({"box-shadow":"0px 0px 8px "+s}),inactive:b({":hover":{"box-shadow":"0px 0px 4px "+s}}),empty:b({background:"#FFF5BE"}),bgThead:b({background:R}),thead:b.color(_),bgButton:b({background:U}),button:b.color(D),brdButton:b({border:"none"}).br(S),bgPrimary:b({background:z}),primary:b.color($),bgInfo:b({background:J}),info:b.color(V),bgWarn:b({background:Y}),warn:b.color(ee),bgError:b({background:ne}),error:b.color(ie)});a.updateTheme({icon:"fal",lblCol:b.branding,inpHgt:b.inputHeight.class,inpBrd:oe+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnBrd:b.brdButton})}var d={header:{lhs:{},rhs:{}},theme:{}};var f=function(){function e(e){if(e===void 0){e=""}this.loadBranding=i(d);this.branding=this.loadBranding.map((function(e){return r.merge({},d,e)}));this.path=e;this.header=this.branding.map((function(e){var t=e.header,n=e.theme;c(n);return t}))}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?n.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function h(e){if(r.isString(e)){return n.request(e)}else{return Promise.resolve(e)}}function p(e,t){t({message:String(e.message),context:"error"});s.redraw()}function g(e,t,r){if(r===void 0){r={message:""}}window.history.replaceState(null,"",window.location.href);var o;var s;var u;var c=i(r);return h(t).then((function(t){o=t;a.updateConfig({signFont:"Caveat"});if(o.uiWidgets){a.updateConfig(o.uiWidgets)}s=new f(o.brandingPath);u=l(e);u.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));u.applicationUserChannel.bind("redirect",(function(e){return window.location.href=e.url}));u.applicationChannel.bind("reloadbranding",(function(){return s.load().then(n.redraw)}));u.applicationUserChannel.bind("notification",(function(e){return c(e)}));return s.load()})).catch((function(e){return p(e,c)})).then((function(){return{application:o,brand:s,pusher:u,notification:c}}))}var v=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("icon")){return s(".flex.items-center.mh2",{class:t.classes},s("i.fal.fa-2x.mr2",{class:t.icon}),t.title)}else if(t.hasOwnProperty("src")){var n=t,r=n.src,i=n.imageClass,a=n.height,o=n.width;return s(".flex.items-center.mh2"+b.bgLogo.brdLogo,{class:t.classes},s("img.img",{src:r,class:i,height:a,width:o}),t.title)}else{return s(".mh2",{class:t.classes},t.title||"")}};return e}();function m(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var w=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var n=e.attrs.notification;n.map((function(e){var n=e.message,r=e.duration,a=r===void 0?3e3:r;if(n){t.active=true;setTimeout((function(){return t.dismiss()}),a)}return i.SKIP}))};e.prototype.view=function(e){var t=this;var n=e.attrs.notification;var r=n(),i=r.message,a=r.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:m(a),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},i)};e.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return e}();function y(e){return(e*100).toFixed(0)+"%"}var x=function(){function e(){this.saving=i();this.progress=i()}e.prototype.oninit=function(e){var t=e.attrs,n=t.saving,r=t.progress;if(n){this.saving=n}if(r){this.progress=r}};e.prototype.view=function(e){var t=e.attrs,n=t.application,r=n.version,i=n.auth,a=t.header,o=a.lhs,u=a.rhs,l=t.notification,c=t.containerClass,d=c===void 0?"mv2-l mw8-l shadow-4-l":c,f=t.headerClass,h=f===void 0?"":f,p=t.footerClass,g=p===void 0?"":p,m=t.logout,x=m===void 0?true:m,k=e.children;var C=this.saving();var B=C?this.progress():0;return[s("span.clip",{style:{"font-family":"Caveat"}},"test"),l?s(w,{notification:l}):null,s("main.flex-auto.flex.flex-column.self-center.w-100",{class:d},[s(".w-100",{class:h},s(".flex.justify-between.items-center"+b.shrink0.headerHeight.bgHeader.header,[s(v,o),s(v,u)])),k]),s(".w-100",{class:g},s("nav.ph2.flex.items-center.content-end"+b.footerHeight.bgFooter,[s("p.mr-auto.f7.silver",{title:r},s.trust("&copy; 2019 Secure Digital Exchange Limited")),s("span.ma2.f3.silver",{class:B?"":"dn"},y(B)),s("i.f3.mid-gray.fal.fa-spinner",{class:C?"fa-spin":"dn"}),i&&x?s("a.ml2.mid-gray",{href:i.logoutPath},s("i.fal.fa-fw.fa-2x.fa-sign-out-alt[aria-hidden=true]")):null]))]};return e}();var k=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.header,r=t.subheader,i=t.content,a=t.footer;return[n?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,n):null,r?s("div"+b.shrink0,r):null,s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,i),a]};return e}();var C=function(){function e(){this.username=i("")}e.prototype.view=function(e){var t=this;var n=e.attrs,i=n.header,o=n.application,u=n.notification,l=n.onNext;if(!o.auth){return s("span","No authentication set")}var c=o.auth,d=c.title,f=c.landing;return s(x,{header:i,application:o,notification:u},s(k,{content:f?s(".pa2",[s(".mb2.fw7",d),r.map(f.lines,(function(e){return s("p",e)})),s("form",{onsubmit:function(){l(t.username());return false}},[s(a.BaseInput,{field:{id:"username",label:f.label,type:"text",placeholder:f.placeholder,autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.username}),s(a.Button,{label:"Next",type:"submit",icon:"fa-2x fa-sign-in-alt db center mb2",classes:"w-100 mb3 tc br4",disabled:!this.username()})])]):null}))};return e}();function B(e){if(typeof e==="string"){return s("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return s(t.selector,t.content)}else{var n=e;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:n.href},n.text)}}var F=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return s(".ph4",r.map(t,(function(e){return B(e)})))};return e}();var P={};function H(e,t){if(e in P){throw new Error("Component "+e+" is already registered")}else{P[e]=t}}H("basic",F);function E(e){var t=e.type,n=e.data;if(t in P){return s(P[t],{type:t,data:n})}else{return s("span","Unknown component type: "+t)}}function q(e){return r.map(e,(function(e){return E(e)}))}function j(e,r,i){g(e,r,i).then((function(e){var r=e.application,i=e.brand,a=e.notification;s.mount(document.getElementById("page"),{view:function(){return s(C,{application:r,header:i.header(),notification:a,onNext:function(e){if(!r.auth||!r.auth.landing){return}n.request({url:r.auth.landing.endpoint,params:{username:t.sha256(e)}}).then((function(e){var t=e.url;return window.location.href=t})).catch((function(e){var t=e.code,n=e.message;if(t===404){a({message:"Account not found",context:"warn",duration:2e4})}else{a({message:n,context:"error"})}}))}})}})}))}e.buildComponent=E;e.buildComponentList=q;e.landing=j;e.registerComponent=H;Object.defineProperty(e,"__esModule",{value:true})}));
