(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js"],t):(e=e||self,t(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher))})(this,(function(e,t,r,n,o,a){"use strict";var i="default"in t?t["default"]:t;r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r["default"]:r;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n["default"]:n;a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a["default"]:a;var s={bind:function(){return null}};function d(e){var t=e.mock,r=e.apiKey,n=e.cloudChannel,o=e.companyChannel,i=e.userChannel,d=e.applicationChannel,u=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:s,companyChannel:s,userChannel:s,applicationChannel:s,applicationUserChannel:s}}var l=new a(r,{cluster:"eu",encrypted:true});return{pusher:l,cloudChannel:l.subscribe(n),companyChannel:l.subscribe(o),userChannel:l.subscribe(i),applicationChannel:l.subscribe(d),applicationUserChannel:l.subscribe(u)}}var u={};function l(e){n.assign(u,{company:"",copyright:"",tel:"",email:"",address:"",header:{lhs:{},rhs:{}},poweredBy:undefined},e)}var c={button:"",gridFlex:""};function p(e){var t=e.layoutBackground,r=t===void 0?"transparent":t,a=e.layoutLMaxWidth,i=a===void 0?"64rem":a,s=e.layoutLShadow,d=s===void 0?"unset":s,u=e.bodyText,l=u===void 0?"#333333":u,p=e.bodyFontSize,h=p===void 0?"1.25rem":p,f=e.bodyFontWeight,g=f===void 0?"200":f,v=e.background,m=v===void 0?"DodgerBlue":v,w=e.highlight,y=w===void 0?"unset":w,x=e.text,B=x===void 0?"DodgerBlue":x,k=e.icon,C=k===void 0?B:k,P=e.altText,F=P===void 0?"white":P,H=e.logoMargin,S=H===void 0?"0.5rem":H,T=e.logoBackground,L=T===void 0?"transparent":T,O=e.logoBorderRadius,W=O===void 0?".25rem":O,E=e.headerHeight,I=E===void 0?"3rem":E,A=e.headerBackground,R=A===void 0?m:A,j=e.headerBorderBottom,q=j===void 0?"none":j,D=e.headerBorderRadius,z=D===void 0?"0px":D,U=e.headerText,V=U===void 0?F:U,N=e.subheadingText,_=N===void 0?"rgba(0,0,0,.5)":N,M=e.cardHeight,$=M===void 0?"12em":M,K=e.cardWidth,G=K===void 0?"12em":K,J=e.cardHeightNs,Q=J===void 0?$:J,X=e.cardWidthNs,Y=X===void 0?G:X,Z=e.cardText,ee=Z===void 0?F:Z,te=e.cardBackground,re=te===void 0?m:te,ne=e.cardBorderRadius,oe=ne===void 0?"0px":ne,ae=e.cardShadow,ie=ae===void 0?"unset":ae,se=e.cardHeaderFontSize,de=se===void 0?"1.25rem":se,ue=e.cardSubheadingFontSize,le=ue===void 0?"1.25rem":ue,ce=e.cardSubheadingPadding,be=ce===void 0?".25rem .5rem":ce,pe=e.cardHeaderOrder,he=pe===void 0?"0":pe,fe=e.cardIconOrder,ge=fe===void 0?"1":fe,ve=e.panelBackground,me=ve===void 0?"transparent":ve,we=e.panelBorderRadius,ye=we===void 0?".25rem":we,xe=e.footerHeight,Be=xe===void 0?"3rem":xe,ke=e.footerBackground,Ce=ke===void 0?"#F4F4F4":ke,Pe=e.footerText,Fe=Pe===void 0?"#999":Pe,He=e.lineHeight,Se=He===void 0?"1.9em":He,Te=e.buttonBackground,Le=Te===void 0?m:Te,Oe=e.buttonText,We=Oe===void 0?F:Oe,Ee=e.buttonPadding,Ie=Ee===void 0?".5rem":Ee,Ae=e.buttonBorder,Re=Ae===void 0?"none":Ae,je=e.buttonBorderRadius,qe=je===void 0?".25rem":je,De=e.altButtonBackground,ze=De===void 0?Le:De,Ue=e.altButtonText,Ve=Ue===void 0?We:Ue,Ne=e.altButtonPadding,_e=Ne===void 0?Ie:Ne,Me=e.altButtonBorder,$e=Me===void 0?Re:Me,Ke=e.altButtonBorderRadius,Ge=Ke===void 0?qe:Ke,Je=e.tableHeaderBackground,Qe=Je===void 0?m:Je,Xe=e.tableHeaderText,Ye=Xe===void 0?F:Xe,Ze=e.primaryBackground,et=Ze===void 0?Le:Ze,tt=e.primaryText,rt=tt===void 0?We:tt,nt=e.bgInfo,ot=nt===void 0?"#357EDD":nt,at=e.txtInfo,it=at===void 0?"#FFFFFF":at,st=e.bgWarn,dt=st===void 0?"#FFD700":st,ut=e.txtWarn,lt=ut===void 0?"#111111":ut,ct=e.bgError,bt=ct===void 0?"#E7040F":ct,pt=e.txtError,ht=pt===void 0?"#FFFFFF":pt,ft=e.inpBrdClass,gt=ft===void 0?"bn":ft,vt=e.button,mt=vt===void 0?"shadow-4":vt,wt=e.gridFlex,yt=wt===void 0?"flex flex-wrap justify-center":wt;b.helper({shrink0:b.flexShrink("0"),flexImg:b({"object-fit":"contain"}).minHeight("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:m}),branding:b.color(B),icon:b.color(C),brandingAlt:b.color(F),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:r}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":i,"box-shadow":d})),body:b.c(l),bodyFSize:b.fs(h),bodyFWeight:b({"font-weight":g}),marginLogo:b.m(S),bgLogo:b({background:L}),brdLogo:b.br(W),headerHeight:b.h(I),bgHeader:b({background:R}),bbHeader:b({"border-bottom":q}),brdHeader:b.br(z),header:b.c(V),subheading:b.c(_),cardSize:b.h($).w(G).$media("screen and (min-width:30em)",b.h(Q).w(Y)),card:b.c(ee),bgCard:b({background:re}),brdCard:b.br(oe),shadowCard:b({"box-shadow":ie}),cardHead:b({order:he}).fs(de),cardIcon:b({order:ge}),cardSub:b({order:"3"}).p(be).fs(le),bgPanel:b({background:me}),brdPanel:b.br(ye),footerHeight:b.h(Be),bgFooter:b({background:Ce}),footer:b.c(Fe),inputHeight:b.h(Se),inputFocus:b({":focus":{"border-color":y}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:Qe}),thead:b.c(Ye),bgButton:b({background:Le}),button:b.c(We),padButton:b.p(Ie),brdButton:b({border:Re}).br(qe),bgButtonAlt:b({background:ze}),buttonAlt:b.c(Ve),padButtonAlt:b.p(_e),brdButtonAlt:b({border:$e}).br(Ge),bgPrimary:b({background:et}),primary:b.c(rt),bgInfo:b({background:ot}),info:b.c(it),bgWarn:b({background:dt}),warn:b.c(lt),bgError:b({background:bt}),error:b.c(ht)});n.assign(c,{button:mt,gridFlex:yt});o.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:gt+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:c.button+" "+b.brdButton.class});o.updateButtonContext({alt:b.bgButtonAlt.buttonAlt.padButtonAlt.brdButtonAlt.ripple.class,info:b({border:"1px solid "+it}).br(qe).padButton.info.bgInfo.ripple.class,warn:b({border:"1px solid "+lt}).br(qe).padButton.warn.bgWarn.ripple.class,error:b({border:"1px solid "+ht}).br(qe).padButton.error.bgError.ripple.class})}var h=function(){function e(e){var t=e.brandingPath,n=e.themePath;this.branding=r({});this.theme=r({});this.brandingPath=t;this.branding.map(l);this.themePath=n;this.theme.map(p)}e.prototype.load=function(){return Promise.all([this.loadBranding(),this.loadTheme()])};e.prototype.loadBranding=function(){return this.brandingPath?t.request(this.brandingPath).then(this.branding).catch(n.noop):Promise.resolve()};e.prototype.loadTheme=function(){return this.themePath?t.request(this.themePath).then(this.theme).catch(n.noop):Promise.resolve()};return e}();function f(e){if(n.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function g(e,r){r({message:String(e.message),context:"error"});t.redraw()}function v(e,r){window.history.replaceState(null,"",window.location.href);var a;var i;var s;return f(e).then((function(e){a=e;o.updateConfig({signFont:"Caveat"});if(a.uiWidgets){o.updateConfig(a.uiWidgets)}i=new h(a);s=d(a.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));s.cloudChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.companyChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.applicationChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.applicationUserChannel.bind("notification",(function(e){r(e);t.redraw()}));return Promise.all([i.load().catch(n.noop),new Promise((function(e){s.pusher.connection.bind("connected",(function(){s.pusher.connection.unbind("connected");e()}))}))])})).catch((function(e){return g(e,r)})).then((function(){return{application:a,pusher:s}}))}function m(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var w=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var n=e.attrs.notification;n.map((function(e){var n=e.message,o=e.duration,a=o===void 0?3e3:o;if(n){t.active=true;setTimeout((function(){return t.dismiss()}),a)}return r.SKIP}))};e.prototype.view=function(e){var t=this;var r=e.attrs.notification;var n=r(),o=n.message,a=n.context;return i(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:m(a),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},o)};e.prototype.dismiss=function(){if(this.active){this.active=false;i.redraw()}};return e}();function y(e){if(typeof e==="string"){return i("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return i(t.selector,t.content)}else{var r=e;return i("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:r.href},r.text)}}var x=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return i(".ph4",n.map(t,(function(e){return y(e)})))};return e}();var B={};function k(e,t){if(e in B){throw new Error("Component "+e+" is already registered")}else{B[e]=t}}k("basic",x);function C(e){var t=e.type,r=e.data;if(t in B){return i(B[t],{type:t,data:r})}else{return i("span","Unknown component type: "+t)}}function P(e){return n.map(e,(function(e){return C(e)}))}var F=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return C(t)}else if(t.hasOwnProperty("icon")){var r=t;return i(".flex.items-center.mh2",{class:r.classes},i("i.fal.fa-2x.mr2",{class:r.icon}),r.title)}else if(t.hasOwnProperty("src")){var n=t;return i(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:n.classes},i("img.img",{src:n.src,class:n.imageClass,height:n.height,width:n.width}),n.title)}else{var o=t;return i(".mh2",{class:o.classes},o.title||"")}};return e}();var H=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.auth,n=r.logoutPath,o=r.logoutLabel,a=r.logoutIcon,s=a===void 0?"fa-sign-out-alt":a,d=t.classes;return i("a.link.ma2",{href:n,class:d},[o?i("span.mr2",o):null,i("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:s})])};return e}();var S=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.application.auth,n=t.logout;var o=u.header?u.header:{lhs:"",rhs:""},a=o.lhs,s=o.rhs;return[i(F,a),i(".ml-auto",i(F,s)),r&&n?i(H,{auth:r,classes:"items-center dn flex-l "+b.header.class}):null]};return e}();function T(e){return(e*100).toFixed(0)+"%"}var L=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.application,n=r.version,o=r.auth,a=t.saving,s=t.progress,d=t.logout;var l=u.poweredBy,c=l===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:l,p=u.copyright,h=p===void 0?"":p;var f=a?a():false;var g=f&&s?s():0;return[c?i("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:c.href},i("img.img.h-100.o-80",{src:c.src,title:c.title})):null,i("p.center.f7",{title:n},h?[i.trust("&copy; "),h]:null),i("span.ma2.f3",{class:g?"":"dn"},T(g)),i("i.ma2.f3.fal.fa-spinner",{class:f?"fa-spin":"dn"}),o&&d?i(H,{auth:o,classes:"items-center flex dn-l "+b.footer.class}):null]};return e}();var O=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.application,n=t.notification,o=t.saving,a=t.progress,s=t.fullScreen,d=t.responsiveHeader,u=t.responsiveFooter,l=t.logout,c=l===void 0?true:l,p=t.header,h=t.footer,f=e.children;return[n?i(w,{notification:n}):null,i("nav.items-center.self-center.w-100"+b.header.headerHeight.bgHeader.bbHeader.brdHeader.shrink0,{class:(d?"dn flex-l":"flex")+" "+(s?"":b.layoutL.class)},p?p:i(S,{application:r,logout:c})),i("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:s?undefined:b.layoutL.class},f),i("nav.w-100.items-center.content-end"+b.footerHeight.bgFooter.footer,{class:u?"dn flex-l":"flex"},h?h:i(L,{application:r,saving:o,progress:a,logout:c}))]};return e}();var W=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.header,n=t.headerClass,o=t.subheader,a=t.subheaderClass,s=t.content,d=t.wrapContent,u=d===void 0?true:d,l=t.footer;return[r?i(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:n},r):null,o?i("div"+b.shrink0,{class:a},o):null,u?i(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,s):s,l]};return e}();function E(e,t){var r=t.minLen,n=t.regex;return e.map((function(e){return e.length===0||e.length>=r&&n.test(e)}))}function I(e,t){return r.lift((function(e,t){return e.length>0&&t}),e,t)}var A=function(){function e(){this.passwordText=r("");this.passwordValid=r();this.formValid=r()}e.prototype.oninit=function(e){var t=e.attrs.passwordConfig;this.passwordValid=E(this.passwordText,t);this.formValid=I(this.passwordText,this.passwordValid)};e.prototype.view=function(e){var t=e.attrs.application;if(!t.auth){return i("span","No authentication set")}var r=t.auth.passResetPath;return i(O,{application:t},i(W,{content:i("form.mh3[method=post]",{action:r},[i("p","Please enter (and confirm) your new password - at least four characters in length and must match - then click RESET PASSWORD."),i("p","Note that this facility is available for one hour from your initial request."),i(o.PasswordInput,{field:{id:"password",label:"New Password",type:"password",autocomplete:"new-password",placeholder:"Enter your new password",autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.passwordText}),i(".flex.flex-row.mb3",i("span.dark-red.f7",{class:this.passwordValid()?"dn":""},"Password should be more than four characters"),i(o.Button,{label:"RESET PASSWORD",type:"submit",classes:"ml-auto",disabled:!this.formValid()}))])}))};return e}();function R(e,t){var n=r({message:""});return v(e,n).then((function(e){var r=e.application,n=e.pusher;i.mount(document.getElementById("page"),{view:function(){return i(A,{application:r,passwordConfig:t})}});return{application:r,pusher:n}}))}e.buildComponent=C;e.buildComponentList=P;e.password=R;e.registerComponent=k;Object.defineProperty(e,"__esModule",{value:true})}));
