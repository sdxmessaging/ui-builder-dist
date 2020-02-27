(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js"],t):(e=e||self,t(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher))})(this,(function(e,t,n,r,i,a){"use strict";var o="default"in t?t["default"]:t;n=n&&n.hasOwnProperty("default")?n["default"]:n;r=r&&r.hasOwnProperty("default")?r["default"]:r;a=a&&a.hasOwnProperty("default")?a["default"]:a;var s={bind:function(){return null}};function d(e){var t=e.mock,n=e.apiKey,r=e.cloudChannel,i=e.companyChannel,o=e.userChannel,d=e.applicationChannel,u=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:s,companyChannel:s,userChannel:s,applicationChannel:s,applicationUserChannel:s}}var l=new a(n,{cluster:"eu",encrypted:true});return{pusher:l,cloudChannel:l.subscribe(r),companyChannel:l.subscribe(i),userChannel:l.subscribe(o),applicationChannel:l.subscribe(d),applicationUserChannel:l.subscribe(u)}}function u(e){var t=e.layoutBackground,n=t===void 0?"transparent":t,r=e.bodyText,a=r===void 0?"#333333":r,o=e.bodyFontSize,s=o===void 0?"1.25rem":o,d=e.bodyFontWeight,u=d===void 0?"200":d,l=e.background,c=l===void 0?"DodgerBlue":l,f=e.highlight,h=f===void 0?"unset":f,p=e.text,g=p===void 0?"DodgerBlue":p,v=e.icon,m=v===void 0?g:v,w=e.altText,y=w===void 0?"white":w,x=e.logoMargin,k=x===void 0?"0.5rem":x,C=e.logoBackground,B=C===void 0?"transparent":C,F=e.logoBorderRadius,P=F===void 0?".25rem":F,T=e.headerHeight,H=T===void 0?"3rem":T,S=e.headerBackground,E=S===void 0?c:S,W=e.headerBorderRadius,L=W===void 0?"0px":W,I=e.headerText,O=I===void 0?y:I,R=e.subheadingText,q=R===void 0?"rgba(0,0,0,.5)":R,D=e.cardHeight,U=D===void 0?"12em":D,V=e.cardWidth,j=V===void 0?"12em":V,z=e.cardHeightNs,N=z===void 0?U:z,A=e.cardWidthNs,_=A===void 0?j:A,K=e.cardBackground,M=K===void 0?c:K,$=e.cardBorderRadius,G=$===void 0?"0px":$,J=e.cardText,Q=J===void 0?y:J,X=e.panelBackground,Y=X===void 0?"transparent":X,Z=e.panelBorderRadius,ee=Z===void 0?".25rem":Z,te=e.footerHeight,ne=te===void 0?"3rem":te,re=e.footerBackground,ie=re===void 0?"#F4F4F4":re,ae=e.footerText,oe=ae===void 0?"#999":ae,se=e.lineHeight,de=se===void 0?"1.9em":se,ue=e.buttonBackground,le=ue===void 0?c:ue,ce=e.buttonText,be=ce===void 0?y:ce,fe=e.buttonPadding,he=fe===void 0?".5rem":fe,pe=e.buttonBorderRadius,ge=pe===void 0?".25rem":pe,ve=e.tableHeaderBackground,me=ve===void 0?c:ve,we=e.tableHeaderText,ye=we===void 0?y:we,xe=e.primaryBackground,ke=xe===void 0?le:xe,Ce=e.primaryText,Be=Ce===void 0?be:Ce,Fe=e.bgInfo,Pe=Fe===void 0?"#357EDD":Fe,Te=e.txtInfo,He=Te===void 0?"#FFFFFF":Te,Se=e.bgWarn,Ee=Se===void 0?"#FFD700":Se,We=e.txtWarn,Le=We===void 0?"#111111":We,Ie=e.bgError,Oe=Ie===void 0?"#E7040F":Ie,Re=e.txtError,qe=Re===void 0?"#FFFFFF":Re,De=e.inpBrdClass,Ue=De===void 0?"bn":De;b.helper({shrink0:b.flexShrink("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:c}),branding:b.color(g),icon:b.color(m),brandingAlt:b.color(y),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:n}),body:b.c(a),bodyFSize:b.fs(s),bodyFWeight:b({"font-weight":u}),marginLogo:b.m(k),bgLogo:b({background:B}),brdLogo:b.br(P),headerHeight:b.h(H),bgHeader:b({background:E}),brdHeader:b.br(L),header:b.c(O),subheading:b.c(q),cardSize:b.h(U).w(j).$media("screen and (min-width:30em)",b.h(N).w(_)),card:b.c(Q),bgCard:b({background:M}),brdCard:b.br(G),bgPanel:b({background:Y}),brdPanel:b.br(ee),footerHeight:b.h(ne),bgFooter:b({background:ie}),footer:b.c(oe),inputHeight:b.h(de),inputFocus:b({":focus":{"border-color":h}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:me}),thead:b.c(ye),bgButton:b({background:le}),button:b.c(be),padButton:b.p(he),brdButton:b({border:"none"}).br(ge),bgPrimary:b({background:ke}),primary:b.c(Be),bgInfo:b({background:Pe}),info:b.c(He),bgWarn:b({background:Ee}),warn:b.c(Le),bgError:b({background:Oe}),error:b.c(qe)});i.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:Ue+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:"shadow-4 "+b.brdButton.class})}var l={header:{lhs:{},rhs:{}},theme:{}};var c=function(){function e(e){if(e===void 0){e=""}this.loadBranding=n(l);this.branding=this.loadBranding.map((function(e){return r.merge({},l,e)}));this.path=e;this.header=this.branding.map((function(e){var t=e.header,n=e.theme;u(n);return t}))}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?t.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function f(e){if(r.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function h(e,n){n({message:String(e.message),context:"error"});t.redraw()}function p(e,n,r){window.history.replaceState(null,"",window.location.href);var a;var o;var s;return f(n).then((function(n){a=n;i.updateConfig({signFont:"Caveat"});if(a.uiWidgets){i.updateConfig(a.uiWidgets)}o=new c(a.brandingPath);s=d(e);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));s.applicationChannel.bind("reloadbranding",(function(){return o.load().then(t.redraw)}));s.applicationUserChannel.bind("notification",(function(e){r(e);t.redraw()}));return Promise.all([o.load(),new Promise((function(e){s.pusher.connection.bind("connected",(function(){return e()}))}))])})).catch((function(e){return h(e,r)})).then((function(){s.pusher.connection.unbind("connected");return{application:a,brand:o,pusher:s}}))}function g(e){if(typeof e==="string"){return o("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return o(t.selector,t.content)}else{var n=e;return o("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:n.href},n.text)}}var v=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return o(".ph4",r.map(t,(function(e){return g(e)})))};return e}();var m={};function w(e,t){if(e in m){throw new Error("Component "+e+" is already registered")}else{m[e]=t}}w("basic",v);function y(e){var t=e.type,n=e.data;if(t in m){return o(m[t],{type:t,data:n})}else{return o("span","Unknown component type: "+t)}}function x(e){return r.map(e,(function(e){return y(e)}))}var k=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return y(t)}else if(t.hasOwnProperty("icon")){var n=t;return o(".flex.items-center.mh2",{class:n.classes},o("i.fal.fa-2x.mr2",{class:n.icon}),n.title)}else if(t.hasOwnProperty("src")){var r=t;return o(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:r.classes},o("img.img",{src:r.src,class:r.imageClass,height:r.height,width:r.width}),r.title)}else{var i=t;return o(".mh2",{class:i.classes},i.title||"")}};return e}();function C(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var B=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var r=e.attrs.notification;r.map((function(e){var r=e.message,i=e.duration,a=i===void 0?3e3:i;if(r){t.active=true;setTimeout((function(){return t.dismiss()}),a)}return n.SKIP}))};e.prototype.view=function(e){var t=this;var n=e.attrs.notification;var r=n(),i=r.message,a=r.context;return o(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:C(a),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},i)};e.prototype.dismiss=function(){if(this.active){this.active=false;o.redraw()}};return e}();function F(e){return(e*100).toFixed(0)+"%"}var P=function(){function e(){this.saving=n();this.progress=n()}e.prototype.oninit=function(e){var t=e.attrs,n=t.saving,r=t.progress;if(n){this.saving=n}if(r){this.progress=r}};e.prototype.view=function(e){var t=e.attrs,n=t.application,r=n.version,i=n.auth,a=n.copyright,s=a===void 0?"2020 Secure Digital Exchange Limited":a,d=t.header,u=d.lhs,l=d.rhs,c=t.notification,f=t.containerClass,h=f===void 0?"mv2-l mw8-l shadow-4-l":f,p=t.headerClass,g=p===void 0?"":p,v=t.footerClass,m=v===void 0?"":v,w=t.logout,y=w===void 0?true:w,x=e.children;var C=this.saving();var P=C?this.progress():0;return[o("span.clip",{style:{"font-family":"Caveat"}},"test"),c?o(B,{notification:c}):null,o("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:h},[o(".w-100",{class:g},o(".flex.justify-between.items-center"+b.shrink0.headerHeight.bgHeader.header,[o(k,u),o(k,l)])),x]),o(".w-100",{class:m},o("nav.ph2.flex.items-center.content-end"+b.footerHeight.bgFooter.footer,[o("p.center.f7",{title:r},[o.trust("&copy; "),s]),o("span.ma2.f3",{class:P?"":"dn"},F(P)),o("i.f3.fal.fa-spinner",{class:C?"fa-spin":"dn"}),i&&y?o("a.link.flex.items-center.ml2"+b.footer,{href:i.logoutPath},[i.logoutLabel?o("span.mr2",i.logoutLabel):null,i.logoutIcon?o("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:i.logoutIcon}):o("i.fal.fa-fw.fa-2x.fa-sign-out-alt[aria-hidden=true]")]):null]))]};return e}();var T=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.header,r=t.headerClass,i=t.subheader,a=t.subheaderClass,s=t.content,d=t.wrapContent,u=d===void 0?true:d,l=t.footer;return[n?o(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:r},n):null,i?o("div"+b.shrink0,{class:a},i):null,u?o(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,s):s,l]};return e}();function H(e,t){var n=t.minLen,r=t.regex;return e.map((function(e){return e.length===0||e.length>=n&&r.test(e)}))}function S(e,t){return n.lift((function(e,t){return e.length>0&&t}),e,t)}var E=function(){function e(){this.email=n("");this.passwordText=n("");this.passwordValid=n();this.formValid=n()}e.prototype.oninit=function(e){var t=e.attrs,n=t.application.licensee,r=t.passwordConfig;if(n){this.email(n.email)}this.passwordValid=H(this.passwordText,r);this.formValid=S(this.passwordText,this.passwordValid)};e.prototype.view=function(e){var t=e.attrs,n=t.header,r=t.application;if(!r.auth){return o("span","No authentication set")}var a=r.auth.passResetPath;return o(P,{header:n,application:r},o(T,{content:o("form.mh3[method=post]",{action:a},[o("p","Please enter (and confirm) your new password - at least four characters in length and must match - then click RESET PASSWORD."),o("p","Note that this facility is available for one hour from your initial request."),o(i.BaseInput,{field:{id:"username",label:"",type:"hidden",readonly:true},value:this.email}),o(i.PasswordInput,{field:{id:"password",label:"New Password",type:"password",autocomplete:"new-password",placeholder:"Enter your new password",autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.passwordText}),o(".flex.flex-row.mb3",o("span.dark-red.f7",{class:this.passwordValid()?"dn":""},"Password should be more than four characters"),o(i.Button,{label:"RESET PASSWORD",type:"submit",classes:"ml-auto",disabled:!this.formValid()}))])}))};return e}();function W(e,t,r){var i=n({message:""});p(e,t,i).then((function(e){var t=e.application,n=e.brand;o.mount(document.getElementById("page"),{view:function(){return o(E,{application:t,header:n.header(),passwordConfig:r})}})}))}e.buildComponent=y;e.buildComponentList=x;e.password=W;e.registerComponent=w;Object.defineProperty(e,"__esModule",{value:true})}));
