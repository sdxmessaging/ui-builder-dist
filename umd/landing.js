(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("js-sha256"),require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","js-sha256","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js"],t):(e=e||self,t(e.uiBuilder={},e.sha256,e.m,e.m.stream,e._,e.uiWidgets,e.Pusher))})(this,(function(e,t,r,n,o,a,i){"use strict";var s="default"in r?r["default"]:r;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n["default"]:n;o=o&&Object.prototype.hasOwnProperty.call(o,"default")?o["default"]:o;i=i&&Object.prototype.hasOwnProperty.call(i,"default")?i["default"]:i;var d={bind:function(){return null}};function u(e){var t=e.mock,r=e.apiKey,n=e.cloudChannel,o=e.companyChannel,a=e.userChannel,s=e.applicationChannel,u=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:d,companyChannel:d,userChannel:d,applicationChannel:d,applicationUserChannel:d}}var c=new i(r,{cluster:"eu",encrypted:true});return{pusher:c,cloudChannel:c.subscribe(n),companyChannel:c.subscribe(o),userChannel:c.subscribe(a),applicationChannel:c.subscribe(s),applicationUserChannel:c.subscribe(u)}}var c={};function l(e){o.assign(c,{company:"",copyright:"",tel:"",email:"",address:"",poweredBy:undefined,header:[{type:0},{type:7}],footer:[{type:9},{type:0},{type:8},{type:0},{type:10},{type:6}]},e)}var p={button:"",gridFlex:"",cardFlex:"",cardHeader:"",cardSubheading:"",cardIcon:"",cardCounter:"",loginForm:""};function f(e){var t=e.layoutBackground,r=t===void 0?"transparent":t,n=e.layoutLMaxWidth,i=n===void 0?"64rem":n,s=e.layoutLShadow,d=s===void 0?"unset":s,u=e.bodyText,c=u===void 0?"#333333":u,l=e.bodyFontSize,f=l===void 0?"1.25rem":l,h=e.bodyFontWeight,g=h===void 0?"200":h,v=e.background,m=v===void 0?"DodgerBlue":v,y=e.highlight,w=y===void 0?"unset":y,x=e.text,B=x===void 0?"DodgerBlue":x,k=e.icon,C=k===void 0?B:k,F=e.altText,P=F===void 0?"white":F,H=e.logoMargin,S=H===void 0?"0.5rem":H,I=e.logoBackground,L=I===void 0?"transparent":I,T=e.logoBorderRadius,W=T===void 0?".25rem":T,j=e.headerHeight,O=j===void 0?"3rem":j,A=e.headerBackground,q=A===void 0?m:A,E=e.headerBorderBottom,z=E===void 0?"none":E,U=e.headerBorderRadius,D=U===void 0?"0px":U,N=e.headerText,R=N===void 0?P:N,_=e.subheadingText,M=_===void 0?"rgba(0,0,0,.5)":_,$=e.cardStyle,K=$===void 0?{}:$,G=e.cardHeight,J=G===void 0?"12em":G,Q=e.cardWidth,V=Q===void 0?"12em":Q,X=e.cardHeightNs,Y=X===void 0?J:X,Z=e.cardWidthNs,ee=Z===void 0?V:Z,te=e.cardText,re=te===void 0?P:te,ne=e.cardBackground,oe=ne===void 0?m:ne,ae=e.cardBorderRadius,ie=ae===void 0?"0px":ae,se=e.cardShadow,de=se===void 0?"unset":se,ue=e.cardHeaderStyle,ce=ue===void 0?{}:ue,le=e.cardHeaderFontSize,be=le===void 0?"1.25rem":le,pe=e.cardSubheadingStyle,fe=pe===void 0?{}:pe,he=e.cardSubheadingFontSize,ge=he===void 0?"1.25rem":he,ve=e.cardIconStyle,me=ve===void 0?{}:ve,ye=e.panelBackground,we=ye===void 0?"transparent":ye,xe=e.panelBorderRadius,Be=xe===void 0?".25rem":xe,ke=e.loginStyle,Ce=ke===void 0?{}:ke,Fe=e.footerHeight,Pe=Fe===void 0?"3rem":Fe,He=e.footerBackground,Se=He===void 0?"#F4F4F4":He,Ie=e.footerText,Le=Ie===void 0?"#999":Ie,Te=e.lineHeight,We=Te===void 0?"1.9em":Te,je=e.buttonBackground,Oe=je===void 0?m:je,Ae=e.buttonText,qe=Ae===void 0?P:Ae,Ee=e.buttonPadding,ze=Ee===void 0?".5rem":Ee,Ue=e.buttonBorder,De=Ue===void 0?"none":Ue,Ne=e.buttonBorderRadius,Re=Ne===void 0?".25rem":Ne,_e=e.altButtonBackground,Me=_e===void 0?Oe:_e,$e=e.altButtonText,Ke=$e===void 0?qe:$e,Ge=e.altButtonPadding,Je=Ge===void 0?ze:Ge,Qe=e.altButtonBorder,Ve=Qe===void 0?De:Qe,Xe=e.altButtonBorderRadius,Ye=Xe===void 0?Re:Xe,Ze=e.tableHeaderBackground,et=Ze===void 0?m:Ze,tt=e.tableHeaderText,rt=tt===void 0?P:tt,nt=e.primaryBackground,ot=nt===void 0?Oe:nt,at=e.primaryText,it=at===void 0?qe:at,st=e.bgInfo,dt=st===void 0?"#357EDD":st,ut=e.txtInfo,ct=ut===void 0?"#FFFFFF":ut,lt=e.bgWarn,bt=lt===void 0?"#FFD700":lt,pt=e.txtWarn,ft=pt===void 0?"#111111":pt,ht=e.bgError,gt=ht===void 0?"#E7040F":ht,vt=e.txtError,mt=vt===void 0?"#FFFFFF":vt,yt=e.inpBrdClass,wt=yt===void 0?"bn":yt,xt=e.button,Bt=xt===void 0?"shadow-4":xt,kt=e.gridFlex,Ct=kt===void 0?"flex flex-wrap justify-center":kt,Ft=e.cardFlex,Pt=Ft===void 0?"flex flex-column items-center":Ft,Ht=e.cardHeader,St=Ht===void 0?"flex-auto ma2 tc":Ht,It=e.cardSubheading,Lt=It===void 0?"ma2 pv1 ph2":It,Tt=e.cardIcon,Wt=Tt===void 0?"fal fa-fw fa-4x ma2":Tt,jt=e.cardCounter,Ot=jt===void 0?"nt1 nr1 top-0 right-0":jt,At=e.loginForm,qt=At===void 0?"items-center measure-wide center":At;b.helper({shrink0:b.flexShrink("0"),sticky:b({position:"sticky"}),flexImg:b({"object-fit":"contain"}).minHeight("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:m}),branding:b.color(B),icon:b.color(C),brandingAlt:b.color(P),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:r}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":i,"box-shadow":d})),body:b.c(c),bodyFSize:b.fs(f),bodyFWeight:b({"font-weight":g}),marginLogo:b.m(S),bgLogo:b({background:L}),brdLogo:b.br(W),headerHeight:b.h(O),bgHeader:b({background:q}),bbHeader:b({"border-bottom":z}),brdHeader:b.br(D),header:b.c(R),subheading:b.c(M),cardStyle:b(K),cardSize:b.h(J).w(V).$media("screen and (min-width:30em)",b.h(Y).w(ee)),card:b.c(re),bgCard:b({background:oe}),brdCard:b.br(ie),shadowCard:b({"box-shadow":de}),cardHead:b(ce).fs(be),cardSub:b(fe).fs(ge),cardIcon:b(me),bgPanel:b({background:we}),brdPanel:b.br(Be),loginStyle:b(Ce),footerHeight:b.h(Pe),bgFooter:b({background:Se}),footer:b.c(Le),inputHeight:b.h(We),inputFocus:b({":focus":{"border-color":w}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:et}),thead:b.c(rt),bgButton:b({background:Oe}),button:b.c(qe),padButton:b.p(ze),brdButton:b({border:De}).br(Re),bgButtonAlt:b({background:Me}),buttonAlt:b.c(Ke),padButtonAlt:b.p(Je),brdButtonAlt:b({border:Ve}).br(Ye),bgPrimary:b({background:ot}),primary:b.c(it),bgInfo:b({background:dt}),info:b.c(ct),bgWarn:b({background:bt}),warn:b.c(ft),bgError:b({background:gt}),error:b.c(mt)});o.assign(p,{button:Bt,gridFlex:Ct,cardFlex:Pt,cardHeader:St,cardSubheading:Lt,cardIcon:Wt,cardCounter:Ot,loginForm:qt});a.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:wt+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:p.button+" "+b.brdButton.class});a.updateButtonContext({alt:b.bgButtonAlt.buttonAlt.padButtonAlt.brdButtonAlt.ripple.class,info:b({border:"1px solid "+ct}).br(Re).padButton.info.bgInfo.ripple.class,warn:b({border:"1px solid "+ft}).br(Re).padButton.warn.bgWarn.ripple.class,error:b({border:"1px solid "+mt}).br(Re).padButton.error.bgError.ripple.class})}var h=function(){function e(e){var t=e.brandingPath,r=e.themePath;this.branding=n({});this.theme=n({});this.brandingPath=t;this.branding.map(l);this.themePath=r;this.theme.map(f)}e.prototype.load=function(){return Promise.all([this.loadBranding(),this.loadTheme()])};e.prototype.loadBranding=function(){return this.brandingPath?r.request(this.brandingPath).then(this.branding).catch(o.noop):Promise.resolve()};e.prototype.loadTheme=function(){return this.themePath?r.request(this.themePath).then(this.theme).catch(o.noop):Promise.resolve()};return e}();function g(e){if(o.isString(e)){return r.request(e)}else{return Promise.resolve(e)}}function v(e,t){t({message:String(e.message),context:"error"});r.redraw()}function m(e,t){window.history.replaceState(null,"",window.location.href);var n;var i;var s;return g(e).then((function(e){n=e;a.updateConfig({signFont:"Caveat"});if(n.uiWidgets){a.updateConfig(n.uiWidgets)}i=new h(n);s=u(n.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));s.cloudChannel.bind("reloadbranding",(function(){return i.load().then(r.redraw)}));s.companyChannel.bind("reloadbranding",(function(){return i.load().then(r.redraw)}));s.applicationChannel.bind("reloadbranding",(function(){return i.load().then(r.redraw)}));s.applicationUserChannel.bind("notification",(function(e){t(e);r.redraw()}));return Promise.all([i.load().catch(o.noop),new Promise((function(e){s.pusher.connection.bind("connected",(function(){s.pusher.connection.unbind("connected");e()}))}))])})).catch((function(e){return v(e,t)})).then((function(){return{application:n,pusher:s}}))}function y(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var w=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var r=e.attrs.notification;r.map((function(e){var r=e.message,o=e.duration,a=o===void 0?3e3:o;if(r){t.active=true;setTimeout((function(){return t.dismiss()}),a)}return n.SKIP}))};e.prototype.view=function(e){var t=this;var r=e.attrs.notification;var n=r(),o=n.message,a=n.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:y(a),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},o)};e.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return e}();function x(e){if(typeof e==="string"){return s("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return s(t.selector,t.content)}else{var r=e;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:r.href},r.text)}}var B=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return s(".ph4",o.map(t,(function(e){return x(e)})))};return e}();var k={};function C(e,t){if(e in k){throw new Error("Component "+e+" is already registered")}else{k[e]=t}}C("basic",B);function F(e){var t=e.type,r=e.data;if(t in k){return s(k[t],{type:t,data:r})}else{return s("span","Unknown component type: "+t)}}function P(e){return o.map(e,(function(e){return F(e)}))}var H=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return F(t)}else if(t.hasOwnProperty("icon")){var r=t;return s(".flex.items-center.mh2",{class:r.classes},s("i.fal.fa-2x.mr2",{class:r.icon}),r.title)}else if(t.hasOwnProperty("src")){var n=t;return s(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:n.classes},s("img.img",{src:n.src,class:n.imageClass,height:n.height,width:n.width}),n.title)}else{var o=t;return s(".mh2",{class:o.classes},o.title||"")}};return e}();var S=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.auth,n=r.logoutPath,o=r.logoutLabel,a=r.logoutIcon,i=a===void 0?"fa-sign-out-alt":a,d=t.classes;return s("a.link.ma2",{href:n,class:d},[o?s("span.mr2",o):null,s("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:i})])};return e}();function I(e){return(e*100).toFixed(0)+"%"}var L=function(){function e(){}e.prototype.view=function(e){var t=this;var r=e.attrs,n=r.display,a=r.application,i=a.version,d=a.auth,u=r.saving,l=r.progress,p=r.logout;var f=n==="header"?c.header:c.footer;var h=n==="header"?b.header.class:b.footer.class;var g=[];if(o.isObject(f)){g=[{type:12,logo:f.lhs},{type:0},{type:12,logo:f.rhs},{type:7}]}if(o.isArray(f)){g=f}return o.map(g,(function(e){var r=e.classes||"";switch(e.type){case 0:return s(".center");case 1:return s("span","|");case 2:return e.src?t.image(e.src,r,e.height,e.width):null;case 3:return s("span.mh2",{class:r+" "+h},e.text);case 4:return s("a.link.mh2",{class:r+" "+h,href:e.href},e.text);case 5:return d&&p?t.logout(d,"flex "+h):null;case 6:return d&&p?t.logout(d,"flex dn-l "+h):null;case 7:return d&&p?t.logout(d,"dn flex-l "+h):null;case 8:return t.copyright(i);case 9:return t.poweredBy();case 10:return t.progressIndicator(u,l);case 11:return e.custom?F(e.custom):null;case 12:return e.logo?s(H,e.logo):null;default:return null}}))};e.prototype.image=function(e,t,r,n){return s("img.img.ma2",{src:e,class:t,height:r,width:n})};e.prototype.poweredBy=function(){var e=c.poweredBy,t=e===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:e;return s("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:t.href},s("img.w-100.h-100.mw3.mw4-l.o-80",{src:t.src,title:t.title}))};e.prototype.copyright=function(e){var t=c.copyright,r=t===void 0?"":t;return s("span.ma2.f7",{title:e},r?[s.trust("&copy; "),r]:null)};e.prototype.progressIndicator=function(e,t){var r=e?e():false;var n=r&&t?t():0;return s("span.ma2.f3",{class:n?"":"dn"},[I(n),s("i.ma2.f3.fal.fa-spinner",{class:r?"fa-spin":"dn"})])};e.prototype.logout=function(e,t){if(t===void 0){t=""}return s(S,{auth:e,classes:"items-center "+t+" "+b.footer.class})};return e}();var T=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.application,n=t.notification,o=t.saving,a=t.progress,i=t.fullScreen,d=t.responsiveHeader,u=t.responsiveFooter,c=t.logout,l=c===void 0?true:c,p=t.header,f=t.footer,h=e.children;return[n?s(w,{notification:n}):null,s("nav.items-center.self-center.w-100"+b.header.headerHeight.bgHeader.bbHeader.brdHeader.shrink0,{class:(d?"dn flex-l":"flex")+" "+(i?"":b.layoutL.class)},p?p:s(L,{display:"header",application:r,saving:o,progress:a,logout:l})),s("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:i?undefined:b.layoutL.class},h),s("nav.w-100.items-center"+b.footerHeight.bgFooter.footer.shrink0,{class:u?"dn flex-l":"flex"},f?f:s(L,{display:"footer",application:r,saving:o,progress:a,logout:l}))]};return e}();var W=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.header,n=t.headerClass,o=t.subheader,a=t.subheaderClass,i=t.content,d=t.wrapContent,u=d===void 0?true:d,c=t.footer;return[r?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:n},r):null,o?s("div"+b.shrink0,{class:a},o):null,u?s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,i):i,c]};return e}();var j=function(){function e(){this.username=n("")}e.prototype.view=function(e){var t=this;var r=e.attrs,n=r.application,i=r.notification,d=r.onNext;if(!n.auth){return s("span","No authentication set")}var u=n.auth,c=u.title,l=u.landing;return s(T,{application:n,notification:i},s(W,{content:l?s(".pa2",[s(".mb2.fw7",c),o.map(l.lines,(function(e){return s("p",e)})),s("form",{onsubmit:function(){d(t.username());return false}},[s(a.BaseInput,{field:{id:"username",label:l.label,type:"text",placeholder:l.placeholder,autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.username}),s(a.Button,{label:"Next",type:"submit",icon:"fa-2x fa-sign-in-alt db center mb2",classes:"w-100 mb3 tc br4",disabled:!this.username()})])]):null}))};return e}();function O(e,o){var a=n(o);return m(e,a).then((function(e){var n=e.application,o=e.pusher;s.mount(document.getElementById("page"),{view:function(){return s(j,{application:n,notification:a,onNext:function(e){if(!n.auth||!n.auth.landing){return}r.request({url:n.auth.landing.endpoint,params:{username:t.sha256(e)}}).then((function(e){var t=e.url;return window.location.href=t})).catch((function(e){var t=e.code,r=e.message;if(t===404){a({message:"Account not found",context:"warn",duration:2e4})}else{a({message:r,context:"error"})}}))}})}});return{application:n,pusher:o}}))}e.buildComponent=F;e.buildComponentList=P;e.landing=O;e.registerComponent=C;Object.defineProperty(e,"__esModule",{value:true})}));
