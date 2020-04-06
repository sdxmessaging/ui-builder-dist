(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js"],t):(e=e||self,t(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher))})(this,(function(e,t,r,n,o,a){"use strict";var i="default"in t?t["default"]:t;r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r["default"]:r;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n["default"]:n;a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a["default"]:a;var s={bind:function(){return null}};function d(e){var t=e.mock,r=e.apiKey,n=e.cloudChannel,o=e.companyChannel,i=e.userChannel,d=e.applicationChannel,u=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:s,companyChannel:s,userChannel:s,applicationChannel:s,applicationUserChannel:s}}var c=new a(r,{cluster:"eu",encrypted:true});return{pusher:c,cloudChannel:c.subscribe(n),companyChannel:c.subscribe(o),userChannel:c.subscribe(i),applicationChannel:c.subscribe(d),applicationUserChannel:c.subscribe(u)}}var u={button:"",gridFlex:""};function c(e){n.assign(u,e)}function l(e){var t=e.layoutBackground,r=t===void 0?"transparent":t,n=e.layoutLMaxWidth,a=n===void 0?"64rem":n,i=e.layoutLShadow,s=i===void 0?"unset":i,d=e.bodyText,l=d===void 0?"#333333":d,p=e.bodyFontSize,f=p===void 0?"1.25rem":p,h=e.bodyFontWeight,g=h===void 0?"200":h,v=e.background,m=v===void 0?"DodgerBlue":v,w=e.highlight,y=w===void 0?"unset":w,x=e.text,k=x===void 0?"DodgerBlue":x,B=e.icon,C=B===void 0?k:B,F=e.altText,P=F===void 0?"white":F,H=e.logoMargin,S=H===void 0?"0.5rem":H,T=e.logoBackground,L=T===void 0?"transparent":T,O=e.logoBorderRadius,W=O===void 0?".25rem":O,E=e.headerHeight,I=E===void 0?"3rem":E,j=e.headerBackground,R=j===void 0?m:j,q=e.headerBorderBottom,D=q===void 0?"none":q,z=e.headerBorderRadius,U=z===void 0?"0px":z,V=e.headerText,N=V===void 0?P:V,A=e.subheadingText,_=A===void 0?"rgba(0,0,0,.5)":A,M=e.cardHeight,$=M===void 0?"12em":M,K=e.cardWidth,G=K===void 0?"12em":K,J=e.cardHeightNs,Q=J===void 0?$:J,X=e.cardWidthNs,Y=X===void 0?G:X,Z=e.cardText,ee=Z===void 0?P:Z,te=e.cardBackground,re=te===void 0?m:te,ne=e.cardBorderRadius,oe=ne===void 0?"0px":ne,ae=e.cardShadow,ie=ae===void 0?"unset":ae,se=e.cardHeaderFontSize,de=se===void 0?"1.25rem":se,ue=e.cardSubheadingFontSize,ce=ue===void 0?"1.25rem":ue,le=e.cardSubheadingPadding,be=le===void 0?".25rem .5rem":le,pe=e.cardHeaderOrder,fe=pe===void 0?"0":pe,he=e.cardIconOrder,ge=he===void 0?"1":he,ve=e.panelBackground,me=ve===void 0?"transparent":ve,we=e.panelBorderRadius,ye=we===void 0?".25rem":we,xe=e.footerHeight,ke=xe===void 0?"3rem":xe,Be=e.footerBackground,Ce=Be===void 0?"#F4F4F4":Be,Fe=e.footerText,Pe=Fe===void 0?"#999":Fe,He=e.lineHeight,Se=He===void 0?"1.9em":He,Te=e.buttonBackground,Le=Te===void 0?m:Te,Oe=e.buttonText,We=Oe===void 0?P:Oe,Ee=e.buttonPadding,Ie=Ee===void 0?".5rem":Ee,je=e.buttonBorderRadius,Re=je===void 0?".25rem":je,qe=e.tableHeaderBackground,De=qe===void 0?m:qe,ze=e.tableHeaderText,Ue=ze===void 0?P:ze,Ve=e.primaryBackground,Ne=Ve===void 0?Le:Ve,Ae=e.primaryText,_e=Ae===void 0?We:Ae,Me=e.bgInfo,$e=Me===void 0?"#357EDD":Me,Ke=e.txtInfo,Ge=Ke===void 0?"#FFFFFF":Ke,Je=e.bgWarn,Qe=Je===void 0?"#FFD700":Je,Xe=e.txtWarn,Ye=Xe===void 0?"#111111":Xe,Ze=e.bgError,et=Ze===void 0?"#E7040F":Ze,tt=e.txtError,rt=tt===void 0?"#FFFFFF":tt,nt=e.inpBrdClass,ot=nt===void 0?"bn":nt,at=e.button,it=at===void 0?"shadow-4":at,st=e.gridFlex,dt=st===void 0?"flex flex-wrap justify-center":st;b.helper({shrink0:b.flexShrink("0"),flexImg:b.objectFit("contain").minHeight("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:m}),branding:b.color(k),icon:b.color(C),brandingAlt:b.color(P),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:r}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":a,"box-shadow":s})),body:b.c(l),bodyFSize:b.fs(f),bodyFWeight:b({"font-weight":g}),marginLogo:b.m(S),bgLogo:b({background:L}),brdLogo:b.br(W),headerHeight:b.h(I),bgHeader:b({background:R}),bbHeader:b({"border-bottom":D}),brdHeader:b.br(U),header:b.c(N),subheading:b.c(_),cardSize:b.h($).w(G).$media("screen and (min-width:30em)",b.h(Q).w(Y)),card:b.c(ee),bgCard:b({background:re}),brdCard:b.br(oe),shadowCard:b({"box-shadow":ie}),cardHead:b({order:fe}).fs(de),cardIcon:b({order:ge}),cardSub:b({order:"3"}).p(be).fs(ce),bgPanel:b({background:me}),brdPanel:b.br(ye),footerHeight:b.h(ke),bgFooter:b({background:Ce}),footer:b.c(Pe),inputHeight:b.h(Se),inputFocus:b({":focus":{"border-color":y}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:De}),thead:b.c(Ue),bgButton:b({background:Le}),button:b.c(We),padButton:b.p(Ie),brdButton:b({border:"none"}).br(Re),bgPrimary:b({background:Ne}),primary:b.c(_e),bgInfo:b({background:$e}),info:b.c(Ge),bgWarn:b({background:Qe}),warn:b.c(Ye),bgError:b({background:et}),error:b.c(rt)});c({button:it,gridFlex:dt});o.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:ot+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:u.button+" "+b.brdButton.class})}var p=function(){function e(e){if(e===void 0){e=""}this.loadBranding=r({});this.branding=this.loadBranding.map((function(e){return n.merge({},e)}));this.path=e;this.branding.map(l)}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?t.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function f(e){if(n.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function h(e,r){r({message:String(e.message),context:"error"});t.redraw()}function g(e,r){window.history.replaceState(null,"",window.location.href);var a;var i;var s;return f(e).then((function(e){a=e;o.updateConfig({signFont:"Caveat"});if(a.uiWidgets){o.updateConfig(a.uiWidgets)}i=new p(a.brandingPath);s=d(a.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));s.cloudChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.companyChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.applicationChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.applicationUserChannel.bind("notification",(function(e){r(e);t.redraw()}));return Promise.all([i.load().catch(n.noop),new Promise((function(e){s.pusher.connection.bind("connected",(function(){return e()}))}))])})).catch((function(e){return h(e,r)})).then((function(){s.pusher.connection.unbind("connected");return{application:a,pusher:s}}))}function v(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var m=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var n=e.attrs.notification;n.map((function(e){var n=e.message,o=e.duration,a=o===void 0?3e3:o;if(n){t.active=true;setTimeout((function(){return t.dismiss()}),a)}return r.SKIP}))};e.prototype.view=function(e){var t=this;var r=e.attrs.notification;var n=r(),o=n.message,a=n.context;return i(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:v(a),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},o)};e.prototype.dismiss=function(){if(this.active){this.active=false;i.redraw()}};return e}();function w(e){if(typeof e==="string"){return i("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return i(t.selector,t.content)}else{var r=e;return i("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:r.href},r.text)}}var y=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return i(".ph4",n.map(t,(function(e){return w(e)})))};return e}();var x={};function k(e,t){if(e in x){throw new Error("Component "+e+" is already registered")}else{x[e]=t}}k("basic",y);function B(e){var t=e.type,r=e.data;if(t in x){return i(x[t],{type:t,data:r})}else{return i("span","Unknown component type: "+t)}}function C(e){return n.map(e,(function(e){return B(e)}))}var F=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return B(t)}else if(t.hasOwnProperty("icon")){var r=t;return i(".flex.items-center.mh2",{class:r.classes},i("i.fal.fa-2x.mr2",{class:r.icon}),r.title)}else if(t.hasOwnProperty("src")){var n=t;return i(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:n.classes},i("img.img",{src:n.src,class:n.imageClass,height:n.height,width:n.width}),n.title)}else{var o=t;return i(".mh2",{class:o.classes},o.title||"")}};return e}();var P=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.auth,n=r.logoutPath,o=r.logoutLabel,a=r.logoutIcon,s=a===void 0?"fa-sign-out-alt":a,d=t.classes;return i("a.link.ma2",{href:n,class:d},[o?i("span.mr2",o):null,i("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:s})])};return e}();var H=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.application,n=r.header,o=n.lhs,a=n.rhs,s=r.auth,d=t.logout;return[i(F,o),i(".ml-auto",i(F,a)),s&&d?i(P,{auth:s,classes:"items-center dn flex-l "+b.header.class}):null]};return e}();function S(e){return(e*100).toFixed(0)+"%"}var T=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.application,n=r.version,o=r.auth,a=r.poweredBy,s=a===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:a,d=r.copyright,u=d===void 0?"":d,c=t.saving,l=t.progress,p=t.logout;var f=c?c():false;var h=f&&l?l():0;return[s?i("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:s.href},i("img.img.h-100.o-80",{src:s.src,title:s.title})):null,i("p.center.f7",{title:n},u?[i.trust("&copy; "),u]:null),i("span.ma2.f3",{class:h?"":"dn"},S(h)),i("i.ma2.f3.fal.fa-spinner",{class:f?"fa-spin":"dn"}),o&&p?i(P,{auth:o,classes:"items-center flex dn-l "+b.footer.class}):null]};return e}();var L=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.application,n=t.notification,o=t.saving,a=t.progress,s=t.fullScreen,d=t.responsiveHeader,u=t.responsiveFooter,c=t.logout,l=c===void 0?true:c,p=t.header,f=t.footer,h=e.children;return[n?i(m,{notification:n}):null,i("nav.items-center.self-center.w-100"+b.header.headerHeight.bgHeader.bbHeader.brdHeader.shrink0,{class:(d?"dn flex-l":"flex")+" "+(s?"":b.layoutL.class)},p?p:i(H,{application:r,logout:l})),i("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:s?undefined:b.layoutL.class},h),i("nav.w-100.items-center.content-end"+b.footerHeight.bgFooter.footer,{class:u?"dn flex-l":"flex"},f?f:i(T,{application:r,saving:o,progress:a,logout:l}))]};return e}();var O=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.header,n=t.headerClass,o=t.subheader,a=t.subheaderClass,s=t.content,d=t.wrapContent,u=d===void 0?true:d,c=t.footer;return[r?i(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:n},r):null,o?i("div"+b.shrink0,{class:a},o):null,u?i(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,s):s,c]};return e}();function W(e,t){var r=t.minLen,n=t.regex;return e.map((function(e){return e.length===0||e.length>=r&&n.test(e)}))}function E(e,t){return r.lift((function(e,t){return e.length>0&&t}),e,t)}var I=function(){function e(){this.email=r("");this.passwordText=r("");this.passwordValid=r();this.formValid=r()}e.prototype.oninit=function(e){var t=e.attrs,r=t.application.licensee,n=t.passwordConfig;if(r){this.email(r.email)}this.passwordValid=W(this.passwordText,n);this.formValid=E(this.passwordText,this.passwordValid)};e.prototype.view=function(e){var t=e.attrs.application;if(!t.auth){return i("span","No authentication set")}var r=t.auth.passResetPath;return i(L,{application:t},i(O,{content:i("form.mh3[method=post]",{action:r},[i("p","Please enter (and confirm) your new password - at least four characters in length and must match - then click RESET PASSWORD."),i("p","Note that this facility is available for one hour from your initial request."),i(o.BaseInput,{field:{id:"username",label:"",type:"hidden",readonly:true},value:this.email}),i(o.PasswordInput,{field:{id:"password",label:"New Password",type:"password",autocomplete:"new-password",placeholder:"Enter your new password",autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.passwordText}),i(".flex.flex-row.mb3",i("span.dark-red.f7",{class:this.passwordValid()?"dn":""},"Password should be more than four characters"),i(o.Button,{label:"RESET PASSWORD",type:"submit",classes:"ml-auto",disabled:!this.formValid()}))])}))};return e}();function j(e,t){var n=r({message:""});return g(e,n).then((function(e){var r=e.application,n=e.pusher;i.mount(document.getElementById("page"),{view:function(){return i(I,{application:r,passwordConfig:t})}});return{application:r,pusher:n}}))}e.buildComponent=B;e.buildComponentList=C;e.password=j;e.registerComponent=k;Object.defineProperty(e,"__esModule",{value:true})}));
