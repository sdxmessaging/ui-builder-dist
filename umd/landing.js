(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("js-sha256"),require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","js-sha256","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiBuilder={},e.sha256,e.m,e.m.stream,e._,e.uiWidgets,e.Pusher))})(this,(function(e,t,r,n,a,o,i){"use strict";function d(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var u=d(r);var s=d(n);var l=d(a);var c=d(i);var f={bind:function(){return null}};function h(e){var t=e.mock,r=e.apiKey,n=e.cloudChannel,a=e.companyChannel,o=e.userChannel,i=e.applicationChannel,d=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:f,companyChannel:f,userChannel:f,applicationChannel:f,applicationUserChannel:f}}var u=new c["default"](r,{cluster:"eu"});return{pusher:u,cloudChannel:u.subscribe(n),companyChannel:u.subscribe(a),userChannel:u.subscribe(o),applicationChannel:u.subscribe(i),applicationUserChannel:u.subscribe(d)}}var p=b;var g={};function v(e){l["default"].assign(g,{company:"",copyright:"",tel:"",email:"",address:"",poweredBy:undefined,header:[{type:0},{type:7}],footer:[{type:9},{type:0},{type:8},{type:0},{type:10},{type:6}]},e)}var m={button:"",gridFlex:"",cardFlex:"",cardHeader:"",cardSubheading:"",cardIcon:"",cardImage:"",cardCounter:"",loginForm:""};function y(e){var t=e.layoutBackground,r=t===void 0?"transparent":t,n=e.layoutLMaxWidth,a=n===void 0?"64rem":n,i=e.layoutLShadow,d=i===void 0?"unset":i,u=e.bodyText,s=u===void 0?"#333333":u,c=e.bodyFontSize,f=c===void 0?"1.25rem":c,h=e.bodyFontWeight,g=h===void 0?"200":h,b=e.background,v=b===void 0?"DodgerBlue":b,y=e.highlight,w=y===void 0?"unset":y,x=e.text,B=x===void 0?"DodgerBlue":x,k=e.icon,F=k===void 0?B:k,C=e.altText,P=C===void 0?"white":C,S=e.logoMargin,H=S===void 0?"0.5rem":S,I=e.logoBackground,L=I===void 0?"transparent":I,T=e.logoBorderRadius,W=T===void 0?".25rem":T,z=e.headerHeight,A=z===void 0?"3rem":z,q=e.headerBackground,E=q===void 0?v:q,R=e.headerBorderBottom,j=R===void 0?"none":R,N=e.headerBorderRadius,O=N===void 0?"0px":N,U=e.headerText,$=U===void 0?P:U,D=e.subheadingText,_=D===void 0?"rgba(0,0,0,.5)":D,M=e.cardStyle,K=M===void 0?{}:M,G=e.cardHeight,J=G===void 0?"12em":G,Q=e.cardWidth,V=Q===void 0?"12em":Q,X=e.cardHeightNs,Y=X===void 0?J:X,Z=e.cardWidthNs,ee=Z===void 0?V:Z,te=e.cardText,re=te===void 0?P:te,ne=e.cardBackground,ae=ne===void 0?v:ne,oe=e.cardBorderRadius,ie=oe===void 0?"0px":oe,de=e.cardShadow,ue=de===void 0?"unset":de,se=e.cardHeaderStyle,le=se===void 0?{}:se,ce=e.cardHeaderFontSize,fe=ce===void 0?"1.25rem":ce,he=e.cardSubheadingStyle,pe=he===void 0?{}:he,ge=e.cardSubheadingFontSize,be=ge===void 0?"1.25rem":ge,ve=e.cardIconStyle,me=ve===void 0?{}:ve,ye=e.cardImageStyle,we=ye===void 0?{}:ye,xe=e.panelBackground,Be=xe===void 0?"transparent":xe,ke=e.panelBorderRadius,Fe=ke===void 0?".25rem":ke,Ce=e.loginStyle,Pe=Ce===void 0?{}:Ce,Se=e.footerHeight,He=Se===void 0?"3rem":Se,Ie=e.footerBackground,Le=Ie===void 0?"#F4F4F4":Ie,Te=e.footerText,We=Te===void 0?"#999":Te,ze=e.lineHeight,Ae=ze===void 0?"1.9em":ze,qe=e.buttonBackground,Ee=qe===void 0?v:qe,Re=e.buttonText,je=Re===void 0?P:Re,Ne=e.buttonPadding,Oe=Ne===void 0?".5rem":Ne,Ue=e.buttonBorder,$e=Ue===void 0?"none":Ue,De=e.buttonBorderRadius,_e=De===void 0?".25rem":De,Me=e.altButtonBackground,Ke=Me===void 0?Ee:Me,Ge=e.altButtonText,Je=Ge===void 0?je:Ge,Qe=e.altButtonPadding,Ve=Qe===void 0?Oe:Qe,Xe=e.altButtonBorder,Ye=Xe===void 0?$e:Xe,Ze=e.altButtonBorderRadius,et=Ze===void 0?_e:Ze,tt=e.tableFontSize,rt=tt===void 0?f:tt,nt=e.tableFontSizeNs,at=nt===void 0?f:nt,ot=e.tableFontWeight,it=ot===void 0?g:ot,dt=e.tableHeaderBackground,ut=dt===void 0?v:dt,st=e.tableHeaderText,lt=st===void 0?P:st,ct=e.tableHeaderFontWeight,ft=ct===void 0?"400":ct,ht=e.tableRowText,pt=ht===void 0?s:ht,gt=e.tableRowFontSize,bt=gt===void 0?rt:gt,vt=e.tableRowFontWeight,mt=vt===void 0?g:vt,yt=e.primaryBackground,wt=yt===void 0?Ee:yt,xt=e.primaryText,Bt=xt===void 0?je:xt,kt=e.bgInfo,Ft=kt===void 0?"#357EDD":kt,Ct=e.txtInfo,Pt=Ct===void 0?"#FFFFFF":Ct,St=e.bgWarn,Ht=St===void 0?"#FFD700":St,It=e.txtWarn,Lt=It===void 0?"#111111":It,Tt=e.bgError,Wt=Tt===void 0?"#E7040F":Tt,zt=e.txtError,At=zt===void 0?"#FFFFFF":zt,qt=e.inpBrdClass,Et=qt===void 0?"bn":qt,Rt=e.button,jt=Rt===void 0?"shadow-4":Rt,Nt=e.gridFlex,Ot=Nt===void 0?"flex flex-wrap justify-center":Nt,Ut=e.cardFlex,$t=Ut===void 0?"flex flex-column items-center":Ut,Dt=e.cardHeader,_t=Dt===void 0?"flex-auto ma2 tc":Dt,Mt=e.cardSubheading,Kt=Mt===void 0?"ma2 pv1 ph2":Mt,Gt=e.cardIcon,Jt=Gt===void 0?"fal fa-fw fa-4x ma2":Gt,Qt=e.cardImage,Vt=Qt===void 0?"img ma2":Qt,Xt=e.cardCounter,Yt=Xt===void 0?"nt1 nr1 top-0 right-0":Xt,Zt=e.loginForm,er=Zt===void 0?"measure-wide center":Zt;var tr="screen and (min-width:30em)";var rr="screen and (min-width:60em)";var nr=p;p.helper({shrink0:nr.flexShrink("0"),sticky:nr({position:"sticky"}),safariBug:nr("-webkit-transform: translate3d(0, 0, 0)"),agGrid:nr.$nest(".ag-header",nr({background:ut+" !important"})).$nest(".ag-tooltip-hiding",nr({opacity:"0"})),docOverlay:nr.$nest("input",nr({border:"none"})),bgBranding:nr({background:v}),branding:nr.color(B),icon:nr.color(F),brandingAlt:nr.color(P),ripple:nr({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),pulse:nr({"-moz-osx-font-smoothing":"grayscale","backface-visibility":"hidden",transform:"scale(1)"}).$animate("1.2s ease-in-out infinite",{from:nr.transform("scale(1)"),"60%":nr.transform("scale(1.1)"),to:nr.transform("scale(1)")}),bgLayout:nr({background:r}),layoutL:nr.$media(rr,nr({"max-width":a,"box-shadow":d})),body:nr({color:s,"font-size":f,"font-weight":g}),marginLogo:nr.m(H),bgLogo:nr({background:L}),brdLogo:nr.br(W),headerHeight:nr.h(A),bgHeader:nr({background:E}),bbHeader:nr({"border-bottom":j}),brdHeader:nr.br(O),header:nr.c($),subheading:nr.c(_),cardStyle:nr(K),cardSize:nr.h(J).w(V).$media(tr,nr.h(Y).w(ee)),card:nr.c(re),bgCard:nr({background:ae}),brdCard:nr.br(ie),shadowCard:nr({"box-shadow":ue}),cardHead:nr(le).fs(fe),cardSub:nr(pe).fs(be),cardIcon:nr(me),cardImage:nr(we),bgPanel:nr({background:Be}),brdPanel:nr.br(Fe),loginStyle:nr(Pe),footerHeight:nr.h(He),bgFooter:nr({background:Le}),footer:nr.c(We),inputHeight:nr.h(Ae),inputFocus:nr({":focus":{"border-color":w}}),active:nr({outline:"solid 0.125rem"}),tFont:nr({"font-size":rt,"font-weight":it}).$media(tr,nr({"font-size":at})),bgThead:nr({background:ut}),thead:nr({color:lt,"font-weight":ft}),tRow:nr({color:pt,"font-size":bt,"font-weight":mt}),bgButton:nr({background:Ee}),button:nr.c(je),padButton:nr.p(Oe),brdButton:nr({border:$e}).br(_e),bgButtonAlt:nr({background:Ke}),buttonAlt:nr.c(Je),padButtonAlt:nr.p(Ve),brdButtonAlt:nr({border:Ye}).br(et),bgPrimary:nr({background:wt}),primary:nr.c(Bt),bgInfo:nr({background:Ft}),info:nr.c(Pt),bgWarn:nr({background:Ht}),warn:nr.c(Lt),bgError:nr({background:Wt}),error:nr.c(At)});l["default"].assign(m,{button:jt,gridFlex:Ot,cardFlex:$t,cardHeader:_t,cardSubheading:Kt,cardIcon:Jt,cardImage:Vt,cardCounter:Yt,loginForm:er});o.updateTheme({icon:"fal",lblCol:p.branding.class,inpHgt:p.inputHeight.class,inpBrd:Et+" "+p.inputFocus.class,btnBg:p.ripple.bgButton.class,btnCol:p.button.class,btnPad:p.padButton.class,btnBrd:m.button+" "+p.brdButton.class});o.updateButtonContext({alt:m.button+" "+p.bgButtonAlt.buttonAlt.padButtonAlt.brdButtonAlt.ripple.class,info:m.button+" "+nr({border:"1px solid "+Pt}).br(_e).padButton.info.bgInfo.ripple.class,warn:m.button+" "+nr({border:"1px solid "+Lt}).br(_e).padButton.warn.bgWarn.ripple.class,error:m.button+" "+nr({border:"1px solid "+At}).br(_e).padButton.error.bgError.ripple.class})}var w=function(){function e(e){var t=e.brandingPath,r=e.themePath;this.branding=s["default"]({});this.theme=s["default"]({});this.brandingPath=t;this.branding.map(v);this.themePath=r;this.theme.map(y)}e.prototype.load=function(){return Promise.all([this.loadBranding(),this.loadTheme()])};e.prototype.loadBranding=function(){var e=this;return this.brandingPath?r.request(this.brandingPath).then((function(t){if(t.header&&!l["default"].isArray(t.header)){var r=t.header;t.header=[{type:11,logo:r.lhs},{type:0},{type:11,logo:r.rhs},{type:7}]}e.branding(t)})).catch(l["default"].noop):Promise.resolve()};e.prototype.loadTheme=function(){return this.themePath?r.request(this.themePath).then(this.theme).catch(l["default"].noop):Promise.resolve()};return e}();function x(e){if(l["default"].isString(e)){return r.request(e)}else{return Promise.resolve(e)}}function B(e,t){t({message:String(e.message),context:"error"});r.redraw()}function k(e,t){window.history.replaceState(null,"",window.location.href);var n;var a;var i;return x(e).then((function(e){n=e;o.updateConfig({signFont:"Caveat"});if(n.uiWidgets){o.updateConfig(n.uiWidgets)}a=new w(n);i=h(n.pusher);i.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));i.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));i.cloudChannel.bind("reloadbranding",(function(){return a.load().then(r.redraw)}));i.companyChannel.bind("reloadbranding",(function(){return a.load().then(r.redraw)}));i.applicationChannel.bind("reloadbranding",(function(){return a.load().then(r.redraw)}));i.applicationUserChannel.bind("notification",(function(e){t(e);r.redraw()}));return Promise.all([a.load().catch(l["default"].noop),new Promise((function(e){i.pusher.connection.bind("connected",(function(){i.pusher.connection.unbind("connected");e()}))}))])})).catch((function(e){return B(e,t)})).then((function(){return{application:n,pusher:i}}))}function F(e){if(e===void 0){e="info"}switch(e){case"error":return p.bgError.error.class;case"warn":return p.bgWarn.warn.class;default:return p.bgInfo.info.class}}var C=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var r=e.attrs.notification;r.map((function(e){var r=e.message,n=e.duration,a=n===void 0?3e3:n;if(r){t.active=true;setTimeout((function(){return t.dismiss()}),a)}return s["default"].SKIP}))};e.prototype.view=function(e){var t=this;var r=e.attrs.notification;var n=r(),a=n.message,o=n.context;return u["default"](".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:F(o),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},a)};e.prototype.dismiss=function(){if(this.active){this.active=false;u["default"].redraw()}};return e}();function P(e){if(typeof e==="string"){return u["default"]("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return u["default"](t.selector,t.content)}else{var r=e;return u["default"]("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+p.bgButton.button,{href:r.href},r.text)}}var S=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return u["default"](".ph4",l["default"].map(t,(function(e){return P(e)})))};return e}();var H={};function I(e,t){if(e in H){throw new Error("Component "+e+" is already registered")}else{H[e]=t}}I("basic",S);function L(e){var t=e.type,r=e.data;if(t in H){return u["default"](H[t],{type:t,data:r})}else{return u["default"]("span","Unknown component type: "+t)}}function T(e){return l["default"].map(e,(function(e){return L(e)}))}var W=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return L(t)}else if(t.hasOwnProperty("icon")){var r=t;return u["default"](".flex.items-center.mh2",{class:r.classes},u["default"]("i.fal.fa-2x.mr2",{class:r.icon}),r.title)}else if(t.hasOwnProperty("src")){var n=t;return u["default"](".flex.items-center"+p.marginLogo.bgLogo.brdLogo,{class:n.classes},u["default"]("img.img",{src:n.src,class:n.imageClass,height:n.height,width:n.width}),n.title)}else{var a=t;return u["default"](".mh2",{class:a.classes},a.title||"")}};return e}();var z=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.auth,n=r.logoutPath,a=r.logoutLabel,o=r.logoutIcon,i=o===void 0?"fa-sign-out-alt":o,d=t.classes;return u["default"]("a.link.ma2",{href:n,class:d},[a?u["default"]("span.mr2",a):null,u["default"]("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:i})])};return e}();function A(e){return(e*100).toFixed(0)+"%"}var q=function(){function e(){}e.prototype.view=function(e){var t=this;var r=e.attrs,n=r.navList,a=r.theme,o=r.application,i=o.version,d=o.auth,s=r.saving,c=r.progress,f=r.logout;var h=a==="header"?p.header:p.footer;var g=!(d&&f);var b=l["default"].filter(n,(function(e){return!(e.hideLogout&&g)}));return l["default"].map(b,(function(e){switch(e.type){case 0:return u["default"](".center");case 1:return u["default"]("span","|");case 2:return e.src?t.image(e.src,e.classes,e.height,e.width):null;case 3:return u["default"]("span.ma2"+h,{class:e.classes},e.text);case 4:return u["default"]("a.link.ma2"+h,{class:e.classes,href:e.href},e.text);case 5:return d&&f?t.logout(d,"flex "+h.class):null;case 6:return d&&f?t.logout(d,"flex dn-l "+h.class):null;case 7:return d&&f?t.logout(d,"dn flex-l "+h.class):null;case 8:return t.copyright(i);case 9:return t.poweredBy();case 10:return t.progressIndicator(s,c);case 11:return e.logo?u["default"](W,e.logo):null;default:return e.hasOwnProperty("data")?L(e):null}}))};e.prototype.image=function(e,t,r,n){return u["default"]("img.img.ma2",{src:e,class:t,height:r,width:n})};e.prototype.poweredBy=function(){var e=g.poweredBy,t=e===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:e;return u["default"]("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:t.href},u["default"]("img.w-100.h-100.mw3.mw4-l.o-80",{src:t.src,title:t.title}))};e.prototype.copyright=function(e){var t=g.copyright,r=t===void 0?"":t;return u["default"]("span.ma2.f7",{title:e},r?[u["default"].trust("&copy; "),r]:null)};e.prototype.progressIndicator=function(e,t){var r=e?e():false;var n=r&&t?t():0;return u["default"]("span.ma2.f3",{class:n?"":"dn"},[A(n),u["default"]("i.ma2.f3.fal.fa-spinner",{class:r?"fa-spin":"dn"})])};e.prototype.logout=function(e,t){return u["default"](z,{auth:e,classes:"items-center "+t})};return e}();var E=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.application,n=t.notification,a=t.saving,o=t.progress,i=t.fullScreen,d=t.responsiveHeader,s=t.responsiveFooter,l=t.logout,c=l===void 0?true:l,f=t.header,h=t.footer,b=e.children;return[n?u["default"](C,{notification:n}):null,u["default"]("nav.items-center.self-center.w-100"+p.header.headerHeight.bgHeader.bbHeader.brdHeader.shrink0,{class:(d?"dn flex-l":"flex")+" "+(i?"":p.layoutL.class)},f?f:u["default"](q,{theme:"header",navList:g.header,application:r,saving:a,progress:o,logout:c})),u["default"]("main.flex-auto.flex.flex-column.self-center.w-100.h-100"+p.bgLayout.body,{class:i?undefined:p.layoutL.class},b),u["default"]("nav.w-100.items-center"+p.footerHeight.bgFooter.footer.shrink0,{class:s?"dn flex-l":"flex"},h?h:u["default"](q,{theme:"footer",navList:g.footer,application:r,saving:a,progress:o,logout:c}))]};return e}();var R=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.header,n=t.headerClass,a=t.subheader,o=t.subheaderClass,i=t.content,d=t.wrapContent,s=d===void 0?true:d,l=t.footer;return[r?u["default"](".flex.justify-between.items-center"+p.shrink0.bgBranding.brandingAlt,{class:n},r):null,a?u["default"]("div"+p.shrink0,{class:o},a):null,s?u["default"](".flex-auto.overflow-x-hidden.overflow-y-auto"+p.safariBug,i):i,l]};return e}();var j=function(){function e(){this.username=s["default"]("")}e.prototype.view=function(e){var t=this;var r=e.attrs,n=r.application,a=r.notification,i=r.onNext;if(!n.auth){return u["default"]("span","No authentication set")}var d=n.auth,s=d.title,c=d.landing;return u["default"](E,{application:n,notification:a},u["default"](R,{content:c?u["default"](".pa2",[u["default"](".mb2.fw7",s),l["default"].map(c.lines,(function(e){return u["default"]("p",e)})),u["default"]("form",{onsubmit:function(){i(t.username());return false}},[u["default"](o.BaseInput,{field:{id:"username",label:c.label,type:"text",placeholder:c.placeholder,autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.username}),u["default"](o.Button,{label:"Next",type:"submit",icon:"fa-2x fa-sign-in-alt db center mb2",classes:"w-100 mb3 tc br4",disabled:!this.username()})])]):null}))};return e}();function N(e,n){var a=s["default"](n);return k(e,a).then((function(e){var n=e.application,o=e.pusher;u["default"].mount(document.getElementById("page"),{view:function(){return u["default"](j,{application:n,notification:a,onNext:function(e){if(!n.auth||!n.auth.landing){return}r.request({url:n.auth.landing.endpoint,params:{username:t.sha256(e)}}).then((function(e){var t=e.url;return window.location.href=t})).catch((function(e){var t=e.code,r=e.message;if(t===404){a({message:"Account not found",context:"warn",duration:2e4})}else{a({message:r,context:"error"})}}))}})}});return{application:n,pusher:o}}))}e.buildComponent=L;e.buildComponentList=T;e.landing=N;e.registerComponent=I;Object.defineProperty(e,"__esModule",{value:true})}));
