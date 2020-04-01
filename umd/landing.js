(function(e,n){typeof exports==="object"&&typeof module!=="undefined"?n(exports,require("js-sha256"),require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","js-sha256","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js"],n):(e=e||self,n(e.uiBuilder={},e.sha256,e.m,e.m.stream,e._,e.uiWidgets,e.Pusher))})(this,(function(e,n,t,r,o,a,i){"use strict";var s="default"in t?t["default"]:t;r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r["default"]:r;o=o&&Object.prototype.hasOwnProperty.call(o,"default")?o["default"]:o;i=i&&Object.prototype.hasOwnProperty.call(i,"default")?i["default"]:i;var d={bind:function(){return null}};function u(e){var n=e.mock,t=e.apiKey,r=e.cloudChannel,o=e.companyChannel,a=e.userChannel,s=e.applicationChannel,u=e.applicationUserChannel;if(n){return{pusher:{connection:{bind:function(e,n){return setImmediate(n)},unbind:function(){return null}}},cloudChannel:d,companyChannel:d,userChannel:d,applicationChannel:d,applicationUserChannel:d}}var c=new i(t,{cluster:"eu",encrypted:true});return{pusher:c,cloudChannel:c.subscribe(r),companyChannel:c.subscribe(o),userChannel:c.subscribe(a),applicationChannel:c.subscribe(s),applicationUserChannel:c.subscribe(u)}}var c={button:"",gridFlex:""};function l(e){var n=e.layoutBackground,t=n===void 0?"transparent":n,r=e.layoutLMaxWidth,i=r===void 0?"64rem":r,s=e.layoutLShadow,d=s===void 0?"unset":s,u=e.bodyText,l=u===void 0?"#333333":u,f=e.bodyFontSize,h=f===void 0?"1.25rem":f,p=e.bodyFontWeight,g=p===void 0?"200":p,v=e.background,m=v===void 0?"DodgerBlue":v,w=e.highlight,y=w===void 0?"unset":w,x=e.text,k=x===void 0?"DodgerBlue":x,B=e.icon,C=B===void 0?k:B,F=e.altText,H=F===void 0?"white":F,P=e.logoMargin,S=P===void 0?"0.5rem":P,L=e.logoBackground,O=L===void 0?"transparent":L,W=e.logoBorderRadius,j=W===void 0?".25rem":W,I=e.headerHeight,T=I===void 0?"3rem":I,q=e.headerBackground,E=q===void 0?m:q,z=e.headerBorderBottom,U=z===void 0?"none":z,D=e.headerBorderRadius,N=D===void 0?"0px":D,R=e.headerText,_=R===void 0?H:R,A=e.subheadingText,M=A===void 0?"rgba(0,0,0,.5)":A,$=e.cardHeight,K=$===void 0?"12em":$,G=e.cardWidth,J=G===void 0?"12em":G,Q=e.cardHeightNs,V=Q===void 0?K:Q,X=e.cardWidthNs,Y=X===void 0?J:X,Z=e.cardText,ee=Z===void 0?H:Z,ne=e.cardBackground,te=ne===void 0?m:ne,re=e.cardBorderRadius,oe=re===void 0?"0px":re,ae=e.cardShadow,ie=ae===void 0?"unset":ae,se=e.cardHeaderFontSize,de=se===void 0?"1.25rem":se,ue=e.cardSubheadingFontSize,ce=ue===void 0?"1.25rem":ue,le=e.cardSubheadingPadding,be=le===void 0?".25rem .5rem":le,fe=e.cardHeaderOrder,he=fe===void 0?"0":fe,pe=e.cardIconOrder,ge=pe===void 0?"1":pe,ve=e.panelBackground,me=ve===void 0?"transparent":ve,we=e.panelBorderRadius,ye=we===void 0?".25rem":we,xe=e.footerHeight,ke=xe===void 0?"3rem":xe,Be=e.footerBackground,Ce=Be===void 0?"#F4F4F4":Be,Fe=e.footerText,He=Fe===void 0?"#999":Fe,Pe=e.lineHeight,Se=Pe===void 0?"1.9em":Pe,Le=e.buttonBackground,Oe=Le===void 0?m:Le,We=e.buttonText,je=We===void 0?H:We,Ie=e.buttonPadding,Te=Ie===void 0?".5rem":Ie,qe=e.buttonBorderRadius,Ee=qe===void 0?".25rem":qe,ze=e.tableHeaderBackground,Ue=ze===void 0?m:ze,De=e.tableHeaderText,Ne=De===void 0?H:De,Re=e.primaryBackground,_e=Re===void 0?Oe:Re,Ae=e.primaryText,Me=Ae===void 0?je:Ae,$e=e.bgInfo,Ke=$e===void 0?"#357EDD":$e,Ge=e.txtInfo,Je=Ge===void 0?"#FFFFFF":Ge,Qe=e.bgWarn,Ve=Qe===void 0?"#FFD700":Qe,Xe=e.txtWarn,Ye=Xe===void 0?"#111111":Xe,Ze=e.bgError,en=Ze===void 0?"#E7040F":Ze,nn=e.txtError,tn=nn===void 0?"#FFFFFF":nn,rn=e.inpBrdClass,on=rn===void 0?"bn":rn,an=e.button,sn=an===void 0?"shadow-4":an,dn=e.gridFlex,un=dn===void 0?"flex flex-wrap justify-center":dn;b.helper({shrink0:b.flexShrink("0"),flexImg:b.objectFit("contain").minHeight("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:m}),branding:b.color(k),icon:b.color(C),brandingAlt:b.color(H),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:t}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":i,"box-shadow":d})),body:b.c(l),bodyFSize:b.fs(h),bodyFWeight:b({"font-weight":g}),marginLogo:b.m(S),bgLogo:b({background:O}),brdLogo:b.br(j),headerHeight:b.h(T),bgHeader:b({background:E}),bbHeader:b({"border-bottom":U}),brdHeader:b.br(N),header:b.c(_),subheading:b.c(M),cardSize:b.h(K).w(J).$media("screen and (min-width:30em)",b.h(V).w(Y)),card:b.c(ee),bgCard:b({background:te}),brdCard:b.br(oe),shadowCard:b({"box-shadow":ie}),cardHead:b({order:he}).fs(de),cardIcon:b({order:ge}),cardSub:b({order:"3"}).p(be).fs(ce),bgPanel:b({background:me}),brdPanel:b.br(ye),footerHeight:b.h(ke),bgFooter:b({background:Ce}),footer:b.c(He),inputHeight:b.h(Se),inputFocus:b({":focus":{"border-color":y}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:Ue}),thead:b.c(Ne),bgButton:b({background:Oe}),button:b.c(je),padButton:b.p(Te),brdButton:b({border:"none"}).br(Ee),bgPrimary:b({background:_e}),primary:b.c(Me),bgInfo:b({background:Ke}),info:b.c(Je),bgWarn:b({background:Ve}),warn:b.c(Ye),bgError:b({background:en}),error:b.c(tn)});o.assign(c,{button:sn,gridFlex:un});a.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:on+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:c.button+" "+b.brdButton.class})}var f={header:{lhs:{},rhs:{}},theme:{}};var h=function(){function e(e){if(e===void 0){e=""}this.loadBranding=r(f);this.branding=this.loadBranding.map((function(e){return o.merge({},f,e)}));this.path=e;this.header=this.branding.map((function(e){var n=e.header,t=e.theme;l(t);return n}))}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?t.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function p(e){if(o.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function g(e,n){n({message:String(e.message),context:"error"});t.redraw()}function v(e,n){window.history.replaceState(null,"",window.location.href);var r;var i;var s;return p(e).then((function(e){r=e;a.updateConfig({signFont:"Caveat"});if(r.uiWidgets){a.updateConfig(r.uiWidgets)}i=new h(r.brandingPath);s=u(r.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var n=e.url;return window.location.href=n}));s.applicationChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.applicationUserChannel.bind("notification",(function(e){n(e);t.redraw()}));return Promise.all([i.load().catch(o.noop),new Promise((function(e){s.pusher.connection.bind("connected",(function(){return e()}))}))])})).catch((function(e){return g(e,n)})).then((function(){s.pusher.connection.unbind("connected");return{application:r,brand:i,pusher:s}}))}function m(e){if(typeof e==="string"){return s("p",e)}else if(e.hasOwnProperty("selector")){var n=e;return s(n.selector,n.content)}else{var t=e;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:t.href},t.text)}}var w=function(){function e(){}e.prototype.view=function(e){var n=e.attrs.data;return s(".ph4",o.map(n,(function(e){return m(e)})))};return e}();var y={};function x(e,n){if(e in y){throw new Error("Component "+e+" is already registered")}else{y[e]=n}}x("basic",w);function k(e){var n=e.type,t=e.data;if(n in y){return s(y[n],{type:n,data:t})}else{return s("span","Unknown component type: "+n)}}function B(e){return o.map(e,(function(e){return k(e)}))}var C=function(){function e(){}e.prototype.view=function(e){var n=e.attrs;if(n.hasOwnProperty("type")){return k(n)}else if(n.hasOwnProperty("icon")){var t=n;return s(".flex.items-center.mh2",{class:t.classes},s("i.fal.fa-2x.mr2",{class:t.icon}),t.title)}else if(n.hasOwnProperty("src")){var r=n;return s(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:r.classes},s("img.img",{src:r.src,class:r.imageClass,height:r.height,width:r.width}),r.title)}else{var o=n;return s(".mh2",{class:o.classes},o.title||"")}};return e}();var F=function(){function e(){}e.prototype.view=function(e){var n=e.attrs,t=n.auth,r=t.logoutPath,o=t.logoutLabel,a=t.logoutIcon,i=a===void 0?"fa-sign-out-alt":a,d=n.classes;return s("a.link.ma2",{href:r,class:d},[o?s("span.mr2",o):null,s("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:i})])};return e}();function H(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var P=function(){function e(){this.active=false}e.prototype.oninit=function(e){var n=this;var t=e.attrs.notification;t.map((function(e){var t=e.message,o=e.duration,a=o===void 0?3e3:o;if(t){n.active=true;setTimeout((function(){return n.dismiss()}),a)}return r.SKIP}))};e.prototype.view=function(e){var n=this;var t=e.attrs.notification;var r=t(),o=r.message,a=r.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return n.dismiss()},class:H(a),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},o)};e.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return e}();function S(e){return(e*100).toFixed(0)+"%"}var L=function(){function e(){}e.prototype.view=function(e){var n=e.attrs,t=n.application,r=t.version,o=t.auth,a=t.poweredBy,i=a===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:a,d=t.copyright,u=d===void 0?"":d,c=n.header,l=c.lhs,f=c.rhs,h=n.notification,p=n.saving,g=n.progress,v=n.fullScreen,m=n.responsiveHeader,w=n.responsiveFooter,y=n.logout,x=y===void 0?true:y,k=e.children;var B=p?p():false;var H=B&&g?g():0;return[h?s(P,{notification:h}):null,s("nav.items-center.self-center.w-100"+b.header.headerHeight.bgHeader.bbHeader.brdHeader.shrink0,{class:(m?"dn flex-l":"flex")+" "+(v?"":b.layoutL.class)},[s(C,l),s(".ml-auto",s(C,f)),o&&x?s(F,{auth:o,classes:"items-center dn flex-l "+b.header.class}):null]),s("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:v?undefined:b.layoutL.class},k),s("nav.w-100.items-center.content-end"+b.footerHeight.bgFooter.footer,{class:w?"dn flex-l":"flex"},[i?s("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:i.href},s("img.img.h-100.o-80",{src:i.src,title:i.title})):null,s("p.center.f7",{title:r},u?[s.trust("&copy; "),u]:null),s("span.ma2.f3",{class:H?"":"dn"},S(H)),s("i.ma2.f3.fal.fa-spinner",{class:B?"fa-spin":"dn"}),o&&x?s(F,{auth:o,classes:"items-center flex dn-l "+b.footer.class}):null])]};return e}();var O=function(){function e(){}e.prototype.view=function(e){var n=e.attrs,t=n.header,r=n.headerClass,o=n.subheader,a=n.subheaderClass,i=n.content,d=n.wrapContent,u=d===void 0?true:d,c=n.footer;return[t?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:r},t):null,o?s("div"+b.shrink0,{class:a},o):null,u?s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,i):i,c]};return e}();var W=function(){function e(){this.username=r("")}e.prototype.view=function(e){var n=this;var t=e.attrs,r=t.header,i=t.application,d=t.notification,u=t.onNext;if(!i.auth){return s("span","No authentication set")}var c=i.auth,l=c.title,b=c.landing;return s(L,{header:r,application:i,notification:d},s(O,{content:b?s(".pa2",[s(".mb2.fw7",l),o.map(b.lines,(function(e){return s("p",e)})),s("form",{onsubmit:function(){u(n.username());return false}},[s(a.BaseInput,{field:{id:"username",label:b.label,type:"text",placeholder:b.placeholder,autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.username}),s(a.Button,{label:"Next",type:"submit",icon:"fa-2x fa-sign-in-alt db center mb2",classes:"w-100 mb3 tc br4",disabled:!this.username()})])]):null}))};return e}();function j(e,o){var a=r(o);return v(e,a).then((function(e){var r=e.application,o=e.brand,i=e.pusher;s.mount(document.getElementById("page"),{view:function(){return s(W,{application:r,header:o.header(),notification:a,onNext:function(e){if(!r.auth||!r.auth.landing){return}t.request({url:r.auth.landing.endpoint,params:{username:n.sha256(e)}}).then((function(e){var n=e.url;return window.location.href=n})).catch((function(e){var n=e.code,t=e.message;if(n===404){a({message:"Account not found",context:"warn",duration:2e4})}else{a({message:t,context:"error"})}}))}})}});return{application:r,pusher:i}}))}e.buildComponent=k;e.buildComponentList=B;e.landing=j;e.registerComponent=x;Object.defineProperty(e,"__esModule",{value:true})}));
