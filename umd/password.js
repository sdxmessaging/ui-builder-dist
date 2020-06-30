(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js"],t):(e=e||self,t(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher))})(this,(function(e,t,r,n,o,a){"use strict";var i="default"in t?t["default"]:t;r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r["default"]:r;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n["default"]:n;a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a["default"]:a;var s={bind:function(){return null}};function d(e){var t=e.mock,r=e.apiKey,n=e.cloudChannel,o=e.companyChannel,i=e.userChannel,d=e.applicationChannel,u=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:s,companyChannel:s,userChannel:s,applicationChannel:s,applicationUserChannel:s}}var c=new a(r,{cluster:"eu",encrypted:true});return{pusher:c,cloudChannel:c.subscribe(n),companyChannel:c.subscribe(o),userChannel:c.subscribe(i),applicationChannel:c.subscribe(d),applicationUserChannel:c.subscribe(u)}}var u={};function c(e){n.assign(u,{company:"",copyright:"",tel:"",email:"",address:"",poweredBy:undefined,header:[{type:0},{type:7}],footer:[{type:9},{type:0},{type:8},{type:0},{type:10},{type:6}]},e)}var l={button:"",gridFlex:"",cardFlex:"",cardHeader:"",cardSubheading:"",cardIcon:"",cardCounter:"",loginForm:""};function p(e){var t=e.layoutBackground,r=t===void 0?"transparent":t,a=e.layoutLMaxWidth,i=a===void 0?"64rem":a,s=e.layoutLShadow,d=s===void 0?"unset":s,u=e.bodyText,c=u===void 0?"#333333":u,p=e.bodyFontSize,h=p===void 0?"1.25rem":p,f=e.bodyFontWeight,g=f===void 0?"200":f,v=e.background,m=v===void 0?"DodgerBlue":v,y=e.highlight,w=y===void 0?"unset":y,x=e.text,B=x===void 0?"DodgerBlue":x,k=e.icon,C=k===void 0?B:k,F=e.altText,P=F===void 0?"white":F,S=e.logoMargin,H=S===void 0?"0.5rem":S,T=e.logoBackground,I=T===void 0?"transparent":T,L=e.logoBorderRadius,W=L===void 0?".25rem":L,E=e.headerHeight,O=E===void 0?"3rem":E,A=e.headerBackground,j=A===void 0?m:A,R=e.headerBorderBottom,q=R===void 0?"none":R,D=e.headerBorderRadius,z=D===void 0?"0px":D,U=e.headerText,V=U===void 0?P:U,N=e.subheadingText,_=N===void 0?"rgba(0,0,0,.5)":N,M=e.cardStyle,$=M===void 0?{}:M,K=e.cardHeight,G=K===void 0?"12em":K,J=e.cardWidth,Q=J===void 0?"12em":J,X=e.cardHeightNs,Y=X===void 0?G:X,Z=e.cardWidthNs,ee=Z===void 0?Q:Z,te=e.cardText,re=te===void 0?P:te,ne=e.cardBackground,oe=ne===void 0?m:ne,ae=e.cardBorderRadius,ie=ae===void 0?"0px":ae,se=e.cardShadow,de=se===void 0?"unset":se,ue=e.cardHeaderStyle,ce=ue===void 0?{}:ue,le=e.cardHeaderFontSize,be=le===void 0?"1.25rem":le,pe=e.cardSubheadingStyle,he=pe===void 0?{}:pe,fe=e.cardSubheadingFontSize,ge=fe===void 0?"1.25rem":fe,ve=e.cardIconStyle,me=ve===void 0?{}:ve,ye=e.panelBackground,we=ye===void 0?"transparent":ye,xe=e.panelBorderRadius,Be=xe===void 0?".25rem":xe,ke=e.loginStyle,Ce=ke===void 0?{}:ke,Fe=e.footerHeight,Pe=Fe===void 0?"3rem":Fe,Se=e.footerBackground,He=Se===void 0?"#F4F4F4":Se,Te=e.footerText,Ie=Te===void 0?"#999":Te,Le=e.lineHeight,We=Le===void 0?"1.9em":Le,Ee=e.buttonBackground,Oe=Ee===void 0?m:Ee,Ae=e.buttonText,je=Ae===void 0?P:Ae,Re=e.buttonPadding,qe=Re===void 0?".5rem":Re,De=e.buttonBorder,ze=De===void 0?"none":De,Ue=e.buttonBorderRadius,Ve=Ue===void 0?".25rem":Ue,Ne=e.altButtonBackground,_e=Ne===void 0?Oe:Ne,Me=e.altButtonText,$e=Me===void 0?je:Me,Ke=e.altButtonPadding,Ge=Ke===void 0?qe:Ke,Je=e.altButtonBorder,Qe=Je===void 0?ze:Je,Xe=e.altButtonBorderRadius,Ye=Xe===void 0?Ve:Xe,Ze=e.tableHeaderBackground,et=Ze===void 0?m:Ze,tt=e.tableHeaderText,rt=tt===void 0?P:tt,nt=e.primaryBackground,ot=nt===void 0?Oe:nt,at=e.primaryText,it=at===void 0?je:at,st=e.bgInfo,dt=st===void 0?"#357EDD":st,ut=e.txtInfo,ct=ut===void 0?"#FFFFFF":ut,lt=e.bgWarn,bt=lt===void 0?"#FFD700":lt,pt=e.txtWarn,ht=pt===void 0?"#111111":pt,ft=e.bgError,gt=ft===void 0?"#E7040F":ft,vt=e.txtError,mt=vt===void 0?"#FFFFFF":vt,yt=e.inpBrdClass,wt=yt===void 0?"bn":yt,xt=e.button,Bt=xt===void 0?"shadow-4":xt,kt=e.gridFlex,Ct=kt===void 0?"flex flex-wrap justify-center":kt,Ft=e.cardFlex,Pt=Ft===void 0?"flex flex-column items-center":Ft,St=e.cardHeader,Ht=St===void 0?"flex-auto ma2 tc":St,Tt=e.cardSubheading,It=Tt===void 0?"ma2 pv1 ph2":Tt,Lt=e.cardIcon,Wt=Lt===void 0?"fal fa-fw fa-4x ma2":Lt,Et=e.cardCounter,Ot=Et===void 0?"nt1 nr1 top-0 right-0":Et,At=e.loginForm,jt=At===void 0?"items-center measure-wide center":At;b.helper({shrink0:b.flexShrink("0"),sticky:b({position:"sticky"}),flexImg:b({"object-fit":"contain"}).minHeight("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:m}),branding:b.color(B),icon:b.color(C),brandingAlt:b.color(P),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:r}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":i,"box-shadow":d})),body:b.c(c),bodyFSize:b.fs(h),bodyFWeight:b({"font-weight":g}),marginLogo:b.m(H),bgLogo:b({background:I}),brdLogo:b.br(W),headerHeight:b.h(O),bgHeader:b({background:j}),bbHeader:b({"border-bottom":q}),brdHeader:b.br(z),header:b.c(V),subheading:b.c(_),cardStyle:b($),cardSize:b.h(G).w(Q).$media("screen and (min-width:30em)",b.h(Y).w(ee)),card:b.c(re),bgCard:b({background:oe}),brdCard:b.br(ie),shadowCard:b({"box-shadow":de}),cardHead:b(ce).fs(be),cardSub:b(he).fs(ge),cardIcon:b(me),bgPanel:b({background:we}),brdPanel:b.br(Be),loginStyle:b(Ce),footerHeight:b.h(Pe),bgFooter:b({background:He}),footer:b.c(Ie),inputHeight:b.h(We),inputFocus:b({":focus":{"border-color":w}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:et}),thead:b.c(rt),bgButton:b({background:Oe}),button:b.c(je),padButton:b.p(qe),brdButton:b({border:ze}).br(Ve),bgButtonAlt:b({background:_e}),buttonAlt:b.c($e),padButtonAlt:b.p(Ge),brdButtonAlt:b({border:Qe}).br(Ye),bgPrimary:b({background:ot}),primary:b.c(it),bgInfo:b({background:dt}),info:b.c(ct),bgWarn:b({background:bt}),warn:b.c(ht),bgError:b({background:gt}),error:b.c(mt)});n.assign(l,{button:Bt,gridFlex:Ct,cardFlex:Pt,cardHeader:Ht,cardSubheading:It,cardIcon:Wt,cardCounter:Ot,loginForm:jt});o.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:wt+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:l.button+" "+b.brdButton.class});o.updateButtonContext({alt:b.bgButtonAlt.buttonAlt.padButtonAlt.brdButtonAlt.ripple.class,info:b({border:"1px solid "+ct}).br(Ve).padButton.info.bgInfo.ripple.class,warn:b({border:"1px solid "+ht}).br(Ve).padButton.warn.bgWarn.ripple.class,error:b({border:"1px solid "+mt}).br(Ve).padButton.error.bgError.ripple.class})}var h=function(){function e(e){var t=e.brandingPath,n=e.themePath;this.branding=r({});this.theme=r({});this.brandingPath=t;this.branding.map(c);this.themePath=n;this.theme.map(p)}e.prototype.load=function(){return Promise.all([this.loadBranding(),this.loadTheme()])};e.prototype.loadBranding=function(){return this.brandingPath?t.request(this.brandingPath).then(this.branding).catch(n.noop):Promise.resolve()};e.prototype.loadTheme=function(){return this.themePath?t.request(this.themePath).then(this.theme).catch(n.noop):Promise.resolve()};return e}();function f(e){if(n.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function g(e,r){r({message:String(e.message),context:"error"});t.redraw()}function v(e,r){window.history.replaceState(null,"",window.location.href);var a;var i;var s;return f(e).then((function(e){a=e;o.updateConfig({signFont:"Caveat"});if(a.uiWidgets){o.updateConfig(a.uiWidgets)}i=new h(a);s=d(a.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));s.cloudChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.companyChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.applicationChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.applicationUserChannel.bind("notification",(function(e){r(e);t.redraw()}));return Promise.all([i.load().catch(n.noop),new Promise((function(e){s.pusher.connection.bind("connected",(function(){s.pusher.connection.unbind("connected");e()}))}))])})).catch((function(e){return g(e,r)})).then((function(){return{application:a,pusher:s}}))}function m(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var y=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var n=e.attrs.notification;n.map((function(e){var n=e.message,o=e.duration,a=o===void 0?3e3:o;if(n){t.active=true;setTimeout((function(){return t.dismiss()}),a)}return r.SKIP}))};e.prototype.view=function(e){var t=this;var r=e.attrs.notification;var n=r(),o=n.message,a=n.context;return i(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:m(a),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},o)};e.prototype.dismiss=function(){if(this.active){this.active=false;i.redraw()}};return e}();function w(e){if(typeof e==="string"){return i("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return i(t.selector,t.content)}else{var r=e;return i("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:r.href},r.text)}}var x=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return i(".ph4",n.map(t,(function(e){return w(e)})))};return e}();var B={};function k(e,t){if(e in B){throw new Error("Component "+e+" is already registered")}else{B[e]=t}}k("basic",x);function C(e){var t=e.type,r=e.data;if(t in B){return i(B[t],{type:t,data:r})}else{return i("span","Unknown component type: "+t)}}function F(e){return n.map(e,(function(e){return C(e)}))}var P=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return C(t)}else if(t.hasOwnProperty("icon")){var r=t;return i(".flex.items-center.mh2",{class:r.classes},i("i.fal.fa-2x.mr2",{class:r.icon}),r.title)}else if(t.hasOwnProperty("src")){var n=t;return i(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:n.classes},i("img.img",{src:n.src,class:n.imageClass,height:n.height,width:n.width}),n.title)}else{var o=t;return i(".mh2",{class:o.classes},o.title||"")}};return e}();var S=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.auth,n=r.logoutPath,o=r.logoutLabel,a=r.logoutIcon,s=a===void 0?"fa-sign-out-alt":a,d=t.classes;return i("a.link.ma2",{href:n,class:d},[o?i("span.mr2",o):null,i("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:s})])};return e}();function H(e){return(e*100).toFixed(0)+"%"}var T=function(){function e(){}e.prototype.view=function(e){var t=this;var r=e.attrs,o=r.display,a=r.application,s=a.version,d=a.auth,c=r.saving,l=r.progress,p=r.logout;var h=o==="header"?u.header:u.footer;var f=o==="header"?b.header.class:b.footer.class;var g=[];if(n.isObject(h)){g=[{type:12,logo:h.lhs},{type:0},{type:12,logo:h.rhs},{type:7}]}if(n.isArray(h)){g=h}return n.map(g,(function(e){var r=e.classes||"";switch(e.type){case 0:return i(".center");case 1:return i("span","|");case 2:return e.src?t.image(e.src,r,e.height,e.width):null;case 3:return i("span.mh2",{class:r+" "+f},e.text);case 4:return i("a.link.mh2",{class:r+" "+f,href:e.href},e.text);case 5:return d&&p?t.logout(d,"flex "+f):null;case 6:return d&&p?t.logout(d,"flex dn-l "+f):null;case 7:return d&&p?t.logout(d,"dn flex-l "+f):null;case 8:return t.copyright(s);case 9:return t.poweredBy();case 10:return t.progressIndicator(c,l);case 11:return e.custom?C(e.custom):null;case 12:return e.logo?i(P,e.logo):null;default:return null}}))};e.prototype.image=function(e,t,r,n){return i("img.img.ma2",{src:e,class:t,height:r,width:n})};e.prototype.poweredBy=function(){var e=u.poweredBy,t=e===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:e;return i("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:t.href},i("img.w-100.h-100.mw3.mw4-l.o-80",{src:t.src,title:t.title}))};e.prototype.copyright=function(e){var t=u.copyright,r=t===void 0?"":t;return i("span.ma2.f7",{title:e},r?[i.trust("&copy; "),r]:null)};e.prototype.progressIndicator=function(e,t){var r=e?e():false;var n=r&&t?t():0;return i("span.ma2.f3",{class:n?"":"dn"},[H(n),i("i.ma2.f3.fal.fa-spinner",{class:r?"fa-spin":"dn"})])};e.prototype.logout=function(e,t){if(t===void 0){t=""}return i(S,{auth:e,classes:"items-center "+t+" "+b.footer.class})};return e}();var I=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.application,n=t.notification,o=t.saving,a=t.progress,s=t.fullScreen,d=t.responsiveHeader,u=t.responsiveFooter,c=t.logout,l=c===void 0?true:c,p=t.header,h=t.footer,f=e.children;return[n?i(y,{notification:n}):null,i("nav.items-center.self-center.w-100"+b.header.headerHeight.bgHeader.bbHeader.brdHeader.shrink0,{class:(d?"dn flex-l":"flex")+" "+(s?"":b.layoutL.class)},p?p:i(T,{display:"header",application:r,saving:o,progress:a,logout:l})),i("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:s?undefined:b.layoutL.class},f),i("nav.w-100.items-center"+b.footerHeight.bgFooter.footer.shrink0,{class:u?"dn flex-l":"flex"},h?h:i(T,{display:"footer",application:r,saving:o,progress:a,logout:l}))]};return e}();var L=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.header,n=t.headerClass,o=t.subheader,a=t.subheaderClass,s=t.content,d=t.wrapContent,u=d===void 0?true:d,c=t.footer;return[r?i(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:n},r):null,o?i("div"+b.shrink0,{class:a},o):null,u?i(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,s):s,c]};return e}();function W(e,t){var r=t.minLen,n=t.regex;return e.map((function(e){return e.length===0||e.length>=r&&n.test(e)}))}function E(e,t){return r.lift((function(e,t){return e.length>0&&t}),e,t)}var O=function(){function e(){this.passwordText=r("");this.passwordValid=r();this.formValid=r()}e.prototype.oninit=function(e){var t=e.attrs.passwordConfig;this.passwordValid=W(this.passwordText,t);this.formValid=E(this.passwordText,this.passwordValid)};e.prototype.view=function(e){var t=e.attrs.application;if(!t.auth){return i("span","No authentication set")}var r=t.auth.passResetPath;return i(I,{application:t},i(L,{content:i("form.mh3[method=post]",{action:r},[i("p","Please enter (and confirm) your new password - at least four characters in length and must match - then click RESET PASSWORD."),i("p","Note that this facility is available for one hour from your initial request."),i(o.PasswordInput,{field:{id:"password",label:"New Password",type:"password",autocomplete:"new-password",placeholder:"Enter your new password",autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.passwordText}),i(".flex.flex-row.mb3",i("span.dark-red.f7",{class:this.passwordValid()?"dn":""},"Password should be more than four characters"),i(o.Button,{label:"RESET PASSWORD",type:"submit",classes:"ml-auto",disabled:!this.formValid()}))])}))};return e}();function A(e,t){var n=r({message:""});return v(e,n).then((function(e){var r=e.application,n=e.pusher;i.mount(document.getElementById("page"),{view:function(){return i(O,{application:r,passwordConfig:t})}});return{application:r,pusher:n}}))}e.buildComponent=C;e.buildComponentList=F;e.password=A;e.registerComponent=k;Object.defineProperty(e,"__esModule",{value:true})}));
