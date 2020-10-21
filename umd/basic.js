(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher))})(this,(function(e,t,n,r,a,o){"use strict";function i(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var d=i(t);var u=i(n);var s=i(r);var l=i(o);var c={bind:function(){return null}};function f(e){var t=e.mock,n=e.apiKey,r=e.cloudChannel,a=e.companyChannel,o=e.userChannel,i=e.applicationChannel,d=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:c,companyChannel:c,userChannel:c,applicationChannel:c,applicationUserChannel:c}}var u=new l["default"](n,{cluster:"eu"});return{pusher:u,cloudChannel:u.subscribe(r),companyChannel:u.subscribe(a),userChannel:u.subscribe(o),applicationChannel:u.subscribe(i),applicationUserChannel:u.subscribe(d)}}var p=b;var g={};function h(e){s["default"].assign(g,{company:"",copyright:"",tel:"",email:"",address:"",poweredBy:undefined,header:[{type:0},{type:7}],footer:[{type:9},{type:0},{type:8},{type:0},{type:10},{type:6}]},e)}var v={button:"",gridFlex:"",cardFlex:"",cardHeader:"",cardSubheading:"",cardIcon:"",cardImage:"",cardCounter:"",loginForm:""};function m(e){var t=e.layoutBackground,n=t===void 0?"transparent":t,r=e.layoutLMaxWidth,o=r===void 0?"64rem":r,i=e.layoutLShadow,d=i===void 0?"unset":i,u=e.bodyText,l=u===void 0?"#333333":u,c=e.bodyFontSize,f=c===void 0?"1.25rem":c,g=e.bodyFontWeight,h=g===void 0?"200":g,b=e.background,m=b===void 0?"DodgerBlue":b,y=e.highlight,w=y===void 0?"unset":y,x=e.text,B=x===void 0?"DodgerBlue":x,F=e.icon,k=F===void 0?B:F,C=e.altText,P=C===void 0?"white":C,S=e.logoMargin,H=S===void 0?"0.5rem":S,I=e.logoBackground,L=I===void 0?"transparent":I,T=e.logoBorderRadius,W=T===void 0?".25rem":T,z=e.headerHeight,E=z===void 0?"3rem":z,R=e.headerBackground,A=R===void 0?m:R,U=e.headerBorderBottom,q=U===void 0?"none":U,O=e.headerBorderRadius,$=O===void 0?"0px":O,j=e.headerText,D=j===void 0?P:j,N=e.subheadingText,M=N===void 0?"rgba(0,0,0,.5)":N,_=e.cardStyle,G=_===void 0?{}:_,K=e.cardHeight,J=K===void 0?"12em":K,Q=e.cardWidth,V=Q===void 0?"12em":Q,X=e.cardHeightNs,Y=X===void 0?J:X,Z=e.cardWidthNs,ee=Z===void 0?V:Z,te=e.cardText,ne=te===void 0?P:te,re=e.cardBackground,ae=re===void 0?m:re,oe=e.cardBorderRadius,ie=oe===void 0?"0px":oe,de=e.cardShadow,ue=de===void 0?"unset":de,se=e.cardHeaderStyle,le=se===void 0?{}:se,ce=e.cardHeaderFontSize,fe=ce===void 0?"1.25rem":ce,pe=e.cardSubheadingStyle,ge=pe===void 0?{}:pe,he=e.cardSubheadingFontSize,be=he===void 0?"1.25rem":he,ve=e.cardIconStyle,me=ve===void 0?{}:ve,ye=e.cardImageStyle,we=ye===void 0?{}:ye,xe=e.panelBackground,Be=xe===void 0?"transparent":xe,Fe=e.panelBorderRadius,ke=Fe===void 0?".25rem":Fe,Ce=e.loginStyle,Pe=Ce===void 0?{}:Ce,Se=e.footerHeight,He=Se===void 0?"3rem":Se,Ie=e.footerBackground,Le=Ie===void 0?"#F4F4F4":Ie,Te=e.footerText,We=Te===void 0?"#999":Te,ze=e.lineHeight,Ee=ze===void 0?"1.9em":ze,Re=e.buttonBackground,Ae=Re===void 0?m:Re,Ue=e.buttonText,qe=Ue===void 0?P:Ue,Oe=e.buttonPadding,$e=Oe===void 0?".5rem":Oe,je=e.buttonBorder,De=je===void 0?"none":je,Ne=e.buttonBorderRadius,Me=Ne===void 0?".25rem":Ne,_e=e.altButtonBackground,Ge=_e===void 0?Ae:_e,Ke=e.altButtonText,Je=Ke===void 0?qe:Ke,Qe=e.altButtonPadding,Ve=Qe===void 0?$e:Qe,Xe=e.altButtonBorder,Ye=Xe===void 0?De:Xe,Ze=e.altButtonBorderRadius,et=Ze===void 0?Me:Ze,tt=e.tableFontSize,nt=tt===void 0?f:tt,rt=e.tableFontSizeNs,at=rt===void 0?f:rt,ot=e.tableFontWeight,it=ot===void 0?h:ot,dt=e.tableHeaderBackground,ut=dt===void 0?m:dt,st=e.tableHeaderText,lt=st===void 0?P:st,ct=e.tableHeaderFontWeight,ft=ct===void 0?"400":ct,pt=e.tableRowText,gt=pt===void 0?l:pt,ht=e.tableRowFontSize,bt=ht===void 0?nt:ht,vt=e.tableRowFontWeight,mt=vt===void 0?h:vt,yt=e.primaryBackground,wt=yt===void 0?Ae:yt,xt=e.primaryText,Bt=xt===void 0?qe:xt,Ft=e.bgInfo,kt=Ft===void 0?"#357EDD":Ft,Ct=e.txtInfo,Pt=Ct===void 0?"#FFFFFF":Ct,St=e.bgWarn,Ht=St===void 0?"#FFD700":St,It=e.txtWarn,Lt=It===void 0?"#111111":It,Tt=e.bgError,Wt=Tt===void 0?"#E7040F":Tt,zt=e.txtError,Et=zt===void 0?"#FFFFFF":zt,Rt=e.bgBasic,At=Rt===void 0?"#FFFFFF":Rt,Ut=e.txtBasic,qt=Ut===void 0?l:Ut,Ot=e.inpBrdClass,$t=Ot===void 0?"bn":Ot,jt=e.button,Dt=jt===void 0?"shadow-4":jt,Nt=e.gridFlex,Mt=Nt===void 0?"flex flex-wrap justify-center":Nt,_t=e.cardFlex,Gt=_t===void 0?"flex flex-column items-center":_t,Kt=e.cardHeader,Jt=Kt===void 0?"flex-auto ma2 tc":Kt,Qt=e.cardSubheading,Vt=Qt===void 0?"ma2 pv1 ph2":Qt,Xt=e.cardIcon,Yt=Xt===void 0?"fal fa-fw fa-4x ma2":Xt,Zt=e.cardImage,en=Zt===void 0?"img ma2":Zt,tn=e.cardCounter,nn=tn===void 0?"nt1 nr1 top-0 right-0":tn,rn=e.loginForm,an=rn===void 0?"measure-wide center":rn;var on="screen and (min-width:30em)";var dn="screen and (min-width:60em)";var un=p;p.helper({hideInputClearButton:un.$nest({"::-ms-clear":{display:"none",width:0,height:0},"::-webkit-search-cancel-button":{display:"none"}}),shrink0:un.flexShrink("0"),sticky:un({position:"sticky"}),safariBug:un("-webkit-transform: translate3d(0, 0, 0)"),agGrid:un.$nest(".ag-header",un({background:ut+" !important"})).$nest(".ag-tooltip-hiding",un({opacity:"0"})),docOverlay:un.$nest("input",un({border:"none"})),bgBranding:un({background:m}),branding:un.color(B),icon:un.color(k),brandingAlt:un.color(P),ripple:un({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),pulse:un({"-moz-osx-font-smoothing":"grayscale","backface-visibility":"hidden",transform:"scale(1)"}).$animate("1.2s ease-in-out infinite",{from:un.transform("scale(1)"),"60%":un.transform("scale(1.1)"),to:un.transform("scale(1)")}),bgLayout:un({background:n}),layoutL:un.$media(dn,un({"max-width":o,"box-shadow":d})),body:un({color:l,"font-size":f,"font-weight":h}),marginLogo:un.m(H),bgLogo:un({background:L}),brdLogo:un.br(W),headerHeight:un.h(E),bgHeader:un({background:A}),bbHeader:un({"border-bottom":q}),brdHeader:un.br($),header:un.c(D),subheading:un.c(M),cardStyle:un(G),cardSize:un.h(J).w(V).$media(on,un.h(Y).w(ee)),card:un.c(ne),bgCard:un({background:ae}),brdCard:un.br(ie),shadowCard:un({"box-shadow":ue}),cardHead:un(le).fs(fe),cardSub:un(ge).fs(be),cardIcon:un(me),cardImage:un(we),bgPanel:un({background:Be}),brdPanel:un.br(ke),loginStyle:un(Pe),footerHeight:un.h(He),bgFooter:un({background:Le}),footer:un.c(We),inputHeight:un.h(Ee),inputFocus:un({":focus":{"border-color":w}}),active:un({outline:"solid 0.125rem"}),tFont:un({"font-size":nt,"font-weight":it}).$media(on,un({"font-size":at})),bgThead:un({background:ut}),thead:un({color:lt,"font-weight":ft}),tRow:un({color:gt,"font-size":bt,"font-weight":mt}),bgButton:un({background:Ae}),button:un.c(qe),padButton:un.p($e),brdButton:un({border:De}).br(Me),bgButtonAlt:un({background:Ge}),buttonAlt:un.c(Je),padButtonAlt:un.p(Ve),brdButtonAlt:un({border:Ye}).br(et),bgPrimary:un({background:wt}),primary:un.c(Bt),bgInfo:un({background:kt}),info:un.c(Pt),bgWarn:un({background:Ht}),warn:un.c(Lt),bgError:un({background:Wt}),error:un.c(Et),bgBasic:un({background:At}),basic:un.c(qt)});s["default"].assign(v,{button:Dt,gridFlex:Mt,cardFlex:Gt,cardHeader:Jt,cardSubheading:Vt,cardIcon:Yt,cardImage:en,cardCounter:nn,loginForm:an});a.updateTheme({icon:"fal",lblCol:p.branding.class,inpHgt:p.inputHeight.class,inpBrd:$t+" "+p.inputFocus.class,btnBg:p.ripple.bgButton.class,btnCol:p.button.class,btnPad:p.padButton.class,btnBrd:v.button+" "+p.brdButton.class});a.updateButtonContext({alt:v.button+" "+p.bgButtonAlt.buttonAlt.padButtonAlt.brdButtonAlt.ripple.class,info:v.button+" "+un({border:"1px solid "+Pt}).br(Me).padButton.info.bgInfo.ripple.class,warn:v.button+" "+un({border:"1px solid "+Lt}).br(Me).padButton.warn.bgWarn.ripple.class,error:v.button+" "+un({border:"1px solid "+Et}).br(Me).padButton.error.bgError.ripple.class})}var y=function(){function e(e){var t=e.brandingPath,n=e.themePath;this.branding=u["default"]({});this.theme=u["default"]({});this.brandingPath=t;this.branding.map(h);this.themePath=n;this.theme.map(m)}e.prototype.load=function(){return Promise.all([this.loadBranding(),this.loadTheme()])};e.prototype.loadBranding=function(){var e=this;return this.brandingPath?t.request(this.brandingPath).then((function(t){if(t.header&&!s["default"].isArray(t.header)){var n=t.header;t.header=[{type:13,logo:n.lhs},{type:0},{type:13,logo:n.rhs},{type:7}]}e.branding(t)})).catch(s["default"].noop):Promise.resolve()};e.prototype.loadTheme=function(){return this.themePath?t.request(this.themePath).then(this.theme).catch(s["default"].noop):Promise.resolve()};return e}();function w(e){if(s["default"].isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function x(e,n){n({message:String(e.message),context:"error"});t.redraw()}function B(e,n){window.history.replaceState(null,"",window.location.href);var r;var o;var i;return w(e).then((function(e){r=e;a.updateConfig({signFont:"Caveat"});if(r.uiWidgets){a.updateConfig(r.uiWidgets)}o=new y(r);i=f(r.pusher);i.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));i.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));i.cloudChannel.bind("reloadbranding",(function(){return o.load().then(t.redraw)}));i.companyChannel.bind("reloadbranding",(function(){return o.load().then(t.redraw)}));i.applicationChannel.bind("reloadbranding",(function(){return o.load().then(t.redraw)}));i.applicationUserChannel.bind("notification",(function(e){n(e);t.redraw()}));return Promise.all([o.load().catch(s["default"].noop),new Promise((function(e){i.pusher.connection.bind("connected",(function(){i.pusher.connection.unbind("connected");e()}))}))])})).catch((function(e){return x(e,n)})).then((function(){return{application:r,pusher:i}}))}function F(e){if(typeof e==="string"){return d["default"]("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return d["default"](t.selector,t.content)}else{var n=e;return d["default"]("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+p.bgButton.button,{href:n.href},n.text)}}var k=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return d["default"](".ph4",s["default"].map(t,(function(e){return F(e)})))};return e}();var C={};function P(e,t){if(e in C){throw new Error("Component "+e+" is already registered")}else{C[e]=t}}P("basic",k);function S(e){var t=e.type,n=e.data;if(t in C){return d["default"](C[t],{type:t,data:n})}else{return d["default"]("span","Unknown component type: "+t)}}function H(e){return s["default"].map(e,(function(e){return S(e)}))}function I(e){if(e===void 0){e="info"}switch(e){case"error":return p.bgError.error.class;case"warn":return p.bgWarn.warn.class;case"basic":return p.bgBasic.basic.class;default:return p.bgInfo.info.class}}function L(e){switch(e){case"bottom":return".bottom-0";default:return".top-0"}}function T(e){var t=e.context,n=e.type,r=e.message,a=e.duration,o=e.position,i=e.title;return{context:t||(!n||n==="notification"?"info":"basic"),type:n||"notification",message:r||"",title:i||"",duration:a||(!n||n==="notification"?3e3:0),position:o||(!n||n==="notification"?"top":"center")}}var W=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.config,r=t.active;var a=n.message,o=n.context,i=n.title,u=n.position;return d["default"](".w-100.pa3.fixed.left-0.z-max.f5.tc.pointer"+L(u),{class:I(o),style:{transition:"transform 0.5s",transform:r()?"none":"translate(0, -100%)"},onclick:function(){return r(false)}},i,a)};return e}();var z=function(){function e(){this.active=u["default"](false)}e.prototype.oninit=function(e){var t=this;var n=e.attrs.notification;n.map((function(e){t.config=T(e);if(t.config.message||t.config.title){t.active(true);if(t.config.duration){setTimeout((function(){t.active(false);d["default"].redraw()}),t.config.duration)}}return u["default"].SKIP}))};e.prototype.view=function(){var e=this,t=e.config,n=e.active;if(t){switch(t.type){case"notification":return d["default"](W,{config:t,active:n})}}return null};return e}();var E=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return S(t)}else if(t.hasOwnProperty("icon")){var n=t;return d["default"](".flex.items-center.mh2",{class:n.classes},d["default"]("i.fal.fa-2x.mr2",{class:n.icon}),n.title)}else if(t.hasOwnProperty("src")){var r=t;return d["default"](".flex.items-center"+p.marginLogo.bgLogo.brdLogo,{class:r.classes},d["default"]("img.img",{src:r.src,class:r.imageClass,height:r.height,width:r.width}),r.title)}else{var a=t;return d["default"](".mh2",{class:a.classes},a.title||"")}};return e}();var R=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.auth,r=n.logoutPath,a=n.logoutLabel,o=n.logoutIcon,i=o===void 0?"fa-sign-out-alt":o,u=t.classes;return d["default"]("a.link.ma2",{href:r,class:u},[a?d["default"]("span.mr2",a):null,d["default"]("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:i})])};return e}();function A(e){return(e*100).toFixed(0)+"%"}var U=function(){function e(){}e.prototype.view=function(e){var t=this;var n=e.attrs,r=n.navList,a=n.theme,o=n.application,i=o.name,u=o.version,l=o.auth,c=n.saving,f=n.progress,g=n.logout;var h=a==="header"?p.header:p.footer;var b=!(l&&g);var v=s["default"].filter(r,(function(e){return!(e.hideLogout&&b)}));return s["default"].map(v,(function(e){switch(e.type){case 0:return d["default"](".center");case 1:return d["default"]("span","|");case 2:return e.src?t.image(e.src,e.classes,e.height,e.width):null;case 3:return d["default"]("span.ma2"+h,{class:e.classes},e.text);case 4:return d["default"]("a.link.ma2"+h,{class:e.classes,href:e.href},e.text);case 5:return l&&g?t.logout(l,"flex "+h.class):null;case 6:return l&&g?t.logout(l,"flex dn-l "+h.class):null;case 7:return l&&g?t.logout(l,"dn flex-l "+h.class):null;case 8:return t.copyright(u);case 9:return t.poweredBy();case 10:return t.progressIndicator(c,f);case 11:return d["default"]("span.mv2.f7"+h,u);case 12:return d["default"]("span.ml2.mv2.f7"+h,i);case 13:return e.logo?d["default"](E,e.logo):null;default:return S(e)}}))};e.prototype.image=function(e,t,n,r){return d["default"]("img.img.ma2",{src:e,class:t,height:n,width:r})};e.prototype.poweredBy=function(){var e=g.poweredBy,t=e===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:e;return d["default"]("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:t.href},d["default"]("img.w-100.h-100.mw3.mw4-l.o-80",{src:t.src,title:t.title}))};e.prototype.copyright=function(e){var t=g.copyright;return d["default"]("span.ma2.f7",{title:e},t?[d["default"].trust("&copy; "),t]:null)};e.prototype.progressIndicator=function(e,t){var n=e?e():false;var r=n&&t?t():0;return d["default"]("span.ma2.f3",{class:r?"":"dn"},[A(r),d["default"]("i.ma2.f3.fal.fa-spinner",{class:n?"fa-spin":"dn"})])};e.prototype.logout=function(e,t){return d["default"](R,{auth:e,classes:"items-center "+t})};return e}();var q=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.application,r=t.notification,a=t.saving,o=t.progress,i=t.fullScreen,u=t.responsiveHeader,s=t.responsiveFooter,l=t.logout,c=l===void 0?true:l,f=t.header,h=t.footer,b=e.children;return[r?d["default"](z,{notification:r}):null,d["default"]("nav.items-center.self-center.w-100"+p.header.headerHeight.bgHeader.bbHeader.brdHeader.shrink0,{class:(u?"dn flex-l":"flex")+" "+(i?"":p.layoutL.class)},f?f:d["default"](U,{theme:"header",navList:g.header,application:n,saving:a,progress:o,logout:c})),d["default"]("main.flex-auto.flex.flex-column.self-center.w-100.h-100"+p.bgLayout.body,{class:i?undefined:p.layoutL.class},b),d["default"]("nav.w-100.items-center"+p.footerHeight.bgFooter.footer.shrink0,{class:s?"dn flex-l":"flex"},h?h:d["default"](U,{theme:"footer",navList:g.footer,application:n,saving:a,progress:o,logout:c}))]};return e}();var O=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.header,r=t.headerClass,a=t.subheader,o=t.subheaderClass,i=t.content,u=t.wrapContent,s=u===void 0?true:u,l=t.footer;return[n?d["default"](".flex.justify-between.items-center"+p.shrink0.bgBranding.brandingAlt,{class:r},n):null,a?d["default"]("div"+p.shrink0,{class:o},a):null,s?d["default"](".flex-auto.overflow-x-hidden.overflow-y-auto"+p.safariBug,i):i,l]};return e}();function $(e,t){var n=t.toastMessage,r=n===void 0?{message:""}:n,a=t.title,o=a===void 0?"UNTITLED":a,i=t.lines,s=i===void 0?[]:i,l=t.returnBtn;var c=u["default"](r);return B(e,c).then((function(e){var t=e.application,n=e.pusher;d["default"].mount(document.getElementById("page"),{view:function(){return d["default"](q,{application:t,notification:c},d["default"](O,{content:[d["default"](".ph4",[d["default"]("p.f3.fw4",o),S({type:"basic",data:s}),l&&t.auth?S({type:"basic",data:{href:t.auth.loginPath,text:"RETURN TO LOGIN"}}):null]),t.footer?S(t.footer):null]}))}});return{application:t,pusher:n}}))}e.basic=$;e.buildComponent=S;e.buildComponentList=H;e.registerComponent=P;Object.defineProperty(e,"__esModule",{value:true})}));
