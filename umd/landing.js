(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("js-sha256"),require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js")):typeof define==="function"&&define.amd?define(["exports","js-sha256","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js"],t):(e=e||self,t(e.uiBuilder={},e.sha256,e.m,e.m.stream,e._,e.uiWidgets,e.Pusher))})(this,(function(e,t,n,r,o,i,a){"use strict";var s="default"in n?n["default"]:n;r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r["default"]:r;o=o&&Object.prototype.hasOwnProperty.call(o,"default")?o["default"]:o;a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a["default"]:a;var d={bind:function(){return null}};function u(e){var t=e.mock,n=e.apiKey,r=e.cloudChannel,o=e.companyChannel,i=e.userChannel,s=e.applicationChannel,u=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:d,companyChannel:d,userChannel:d,applicationChannel:d,applicationUserChannel:d}}var c=new a(n,{cluster:"eu",encrypted:true});return{pusher:c,cloudChannel:c.subscribe(r),companyChannel:c.subscribe(o),userChannel:c.subscribe(i),applicationChannel:c.subscribe(s),applicationUserChannel:c.subscribe(u)}}var c={button:"",gridFlex:""};function l(e){var t=e.layoutBackground,n=t===void 0?"transparent":t,r=e.layoutLMaxWidth,a=r===void 0?"64rem":r,s=e.layoutLShadow,d=s===void 0?"2px 2px 8px 0 rgba(0,0,0,.2)":s,u=e.bodyText,l=u===void 0?"#333333":u,h=e.bodyFontSize,f=h===void 0?"1.25rem":h,p=e.bodyFontWeight,g=p===void 0?"200":p,v=e.background,m=v===void 0?"DodgerBlue":v,w=e.highlight,y=w===void 0?"unset":w,x=e.text,k=x===void 0?"DodgerBlue":x,B=e.icon,C=B===void 0?k:B,F=e.altText,H=F===void 0?"white":F,P=e.logoMargin,S=P===void 0?"0.5rem":P,L=e.logoBackground,O=L===void 0?"transparent":L,W=e.logoBorderRadius,j=W===void 0?".25rem":W,I=e.headerHeight,T=I===void 0?"3rem":I,E=e.headerBackground,q=E===void 0?m:E,z=e.headerBorderBottom,D=z===void 0?"none":z,U=e.headerBorderRadius,N=U===void 0?"0px":U,R=e.headerText,_=R===void 0?H:R,A=e.subheadingText,M=A===void 0?"rgba(0,0,0,.5)":A,$=e.cardHeight,K=$===void 0?"12em":$,G=e.cardWidth,J=G===void 0?"12em":G,Q=e.cardHeightNs,V=Q===void 0?K:Q,X=e.cardWidthNs,Y=X===void 0?J:X,Z=e.cardText,ee=Z===void 0?H:Z,te=e.cardBackground,ne=te===void 0?m:te,re=e.cardBorderRadius,oe=re===void 0?"0px":re,ie=e.cardShadow,ae=ie===void 0?"unset":ie,se=e.cardHeaderFontSize,de=se===void 0?"1.25rem":se,ue=e.cardSubheadingFontSize,ce=ue===void 0?"1.25rem":ue,le=e.cardSubheadingPadding,be=le===void 0?".25rem .5rem":le,he=e.cardHeaderOrder,fe=he===void 0?"0":he,pe=e.cardIconOrder,ge=pe===void 0?"1":pe,ve=e.panelBackground,me=ve===void 0?"transparent":ve,we=e.panelBorderRadius,ye=we===void 0?".25rem":we,xe=e.footerHeight,ke=xe===void 0?"3rem":xe,Be=e.footerBackground,Ce=Be===void 0?"#F4F4F4":Be,Fe=e.footerText,He=Fe===void 0?"#999":Fe,Pe=e.lineHeight,Se=Pe===void 0?"1.9em":Pe,Le=e.buttonBackground,Oe=Le===void 0?m:Le,We=e.buttonText,je=We===void 0?H:We,Ie=e.buttonPadding,Te=Ie===void 0?".5rem":Ie,Ee=e.buttonBorderRadius,qe=Ee===void 0?".25rem":Ee,ze=e.tableHeaderBackground,De=ze===void 0?m:ze,Ue=e.tableHeaderText,Ne=Ue===void 0?H:Ue,Re=e.primaryBackground,_e=Re===void 0?Oe:Re,Ae=e.primaryText,Me=Ae===void 0?je:Ae,$e=e.bgInfo,Ke=$e===void 0?"#357EDD":$e,Ge=e.txtInfo,Je=Ge===void 0?"#FFFFFF":Ge,Qe=e.bgWarn,Ve=Qe===void 0?"#FFD700":Qe,Xe=e.txtWarn,Ye=Xe===void 0?"#111111":Xe,Ze=e.bgError,et=Ze===void 0?"#E7040F":Ze,tt=e.txtError,nt=tt===void 0?"#FFFFFF":tt,rt=e.inpBrdClass,ot=rt===void 0?"bn":rt,it=e.button,at=it===void 0?"shadow-4":it,st=e.gridFlex,dt=st===void 0?"flex flex-wrap justify-center":st;b.helper({shrink0:b.flexShrink("0"),flexImg:b.objectFit("contain").minHeight("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:m}),branding:b.color(k),icon:b.color(C),brandingAlt:b.color(H),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:n}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":a,"box-shadow":d})),body:b.c(l),bodyFSize:b.fs(f),bodyFWeight:b({"font-weight":g}),marginLogo:b.m(S),bgLogo:b({background:O}),brdLogo:b.br(j),headerHeight:b.h(T),bgHeader:b({background:q}),bbHeader:b({"border-bottom":D}),brdHeader:b.br(N),header:b.c(_),subheading:b.c(M),cardSize:b.h(K).w(J).$media("screen and (min-width:30em)",b.h(V).w(Y)),card:b.c(ee),bgCard:b({background:ne}),brdCard:b.br(oe),shadowCard:b({"box-shadow":ae}),cardHead:b({order:fe}).fs(de),cardIcon:b({order:ge}),cardSub:b({order:"3"}).p(be).fs(ce),bgPanel:b({background:me}),brdPanel:b.br(ye),footerHeight:b.h(ke),bgFooter:b({background:Ce}),footer:b.c(He),inputHeight:b.h(Se),inputFocus:b({":focus":{"border-color":y}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:De}),thead:b.c(Ne),bgButton:b({background:Oe}),button:b.c(je),padButton:b.p(Te),brdButton:b({border:"none"}).br(qe),bgPrimary:b({background:_e}),primary:b.c(Me),bgInfo:b({background:Ke}),info:b.c(Je),bgWarn:b({background:Ve}),warn:b.c(Ye),bgError:b({background:et}),error:b.c(nt)});o.assign(c,{button:at,gridFlex:dt});i.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:ot+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:c.button+" "+b.brdButton.class})}var h={header:{lhs:{},rhs:{}},theme:{}};var f=function(){function e(e){if(e===void 0){e=""}this.loadBranding=r(h);this.branding=this.loadBranding.map((function(e){return o.merge({},h,e)}));this.path=e;this.header=this.branding.map((function(e){var t=e.header,n=e.theme;l(n);return t}))}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?n.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function p(e){if(o.isString(e)){return n.request(e)}else{return Promise.resolve(e)}}function g(e,t){t({message:String(e.message),context:"error"});n.redraw()}function v(e,t){window.history.replaceState(null,"",window.location.href);var r;var a;var s;return p(e).then((function(e){r=e;i.updateConfig({signFont:"Caveat"});if(r.uiWidgets){i.updateConfig(r.uiWidgets)}a=new f(r.brandingPath);s=u(r.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));s.applicationChannel.bind("reloadbranding",(function(){return a.load().then(n.redraw)}));s.applicationUserChannel.bind("notification",(function(e){t(e);n.redraw()}));return Promise.all([a.load().catch(o.noop),new Promise((function(e){s.pusher.connection.bind("connected",(function(){return e()}))}))])})).catch((function(e){return g(e,t)})).then((function(){s.pusher.connection.unbind("connected");return{application:r,brand:a,pusher:s}}))}function m(e){if(typeof e==="string"){return s("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return s(t.selector,t.content)}else{var n=e;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:n.href},n.text)}}var w=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return s(".ph4",o.map(t,(function(e){return m(e)})))};return e}();var y={};function x(e,t){if(e in y){throw new Error("Component "+e+" is already registered")}else{y[e]=t}}x("basic",w);function k(e){var t=e.type,n=e.data;if(t in y){return s(y[t],{type:t,data:n})}else{return s("span","Unknown component type: "+t)}}function B(e){return o.map(e,(function(e){return k(e)}))}var C=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return k(t)}else if(t.hasOwnProperty("icon")){var n=t;return s(".flex.items-center.mh2",{class:n.classes},s("i.fal.fa-2x.mr2",{class:n.icon}),n.title)}else if(t.hasOwnProperty("src")){var r=t;return s(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:r.classes},s("img.img",{src:r.src,class:r.imageClass,height:r.height,width:r.width}),r.title)}else{var o=t;return s(".mh2",{class:o.classes},o.title||"")}};return e}();var F=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.auth,r=n.logoutPath,o=n.logoutLabel,i=n.logoutIcon,a=i===void 0?"fa-sign-out-alt":i,d=t.classes;return s("a.link.ma2",{href:r,class:d},[o?s("span.mr2",o):null,s("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:a})])};return e}();function H(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var P=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var n=e.attrs.notification;n.map((function(e){var n=e.message,o=e.duration,i=o===void 0?3e3:o;if(n){t.active=true;setTimeout((function(){return t.dismiss()}),i)}return r.SKIP}))};e.prototype.view=function(e){var t=this;var n=e.attrs.notification;var r=n(),o=r.message,i=r.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:H(i),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},o)};e.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return e}();function S(e){return(e*100).toFixed(0)+"%"}var L=function(){function e(){this.saving=r();this.progress=r()}e.prototype.oninit=function(e){var t=e.attrs,n=t.saving,r=t.progress;if(n){this.saving=n}if(r){this.progress=r}};e.prototype.view=function(e){var t=e.attrs,n=t.application,r=n.version,o=n.auth,i=n.poweredBy,a=i===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:i,d=n.copyright,u=d===void 0?"2020 Secure Digital Exchange Limited":d,c=t.header,l=c.lhs,h=c.rhs,f=t.notification,p=t.fullScreen,g=t.headerClass,v=g===void 0?"":g,m=t.footerClass,w=m===void 0?"":m,y=t.logout,x=y===void 0?true:y,k=e.children;var B=this.saving();var H=B?this.progress():0;return[f?s(P,{notification:f}):null,s("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:p?undefined:b.layoutL.class},[s(".w-100"+b.shrink0,{class:v},s(".flex.items-center"+b.header.headerHeight.bgHeader.bbHeader.brdHeader,[s(C,l),s(".ml-auto",s(C,h)),o&&x?s(F,{auth:o,classes:"items-center dn flex-l "+b.header.class}):null])),k]),s(".w-100",{class:w},s("nav.flex.items-center.content-end"+b.footerHeight.bgFooter.footer,[a?s("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:a.href},s("img.img.h-100.o-80",{src:a.src,title:a.title})):null,s("p.center.f7",{title:r},[s.trust("&copy; "),u]),s("span.ma2.f3",{class:H?"":"dn"},S(H)),s("i.ma2.f3.fal.fa-spinner",{class:B?"fa-spin":"dn"}),o&&x?s(F,{auth:o,classes:"items-center flex dn-l "+b.footer.class}):null]))]};return e}();var O=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.header,r=t.headerClass,o=t.subheader,i=t.subheaderClass,a=t.content,d=t.wrapContent,u=d===void 0?true:d,c=t.footer;return[n?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:r},n):null,o?s("div"+b.shrink0,{class:i},o):null,u?s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,a):a,c]};return e}();var W=function(){function e(){this.username=r("")}e.prototype.view=function(e){var t=this;var n=e.attrs,r=n.header,a=n.application,d=n.notification,u=n.onNext;if(!a.auth){return s("span","No authentication set")}var c=a.auth,l=c.title,b=c.landing;return s(L,{header:r,application:a,notification:d},s(O,{content:b?s(".pa2",[s(".mb2.fw7",l),o.map(b.lines,(function(e){return s("p",e)})),s("form",{onsubmit:function(){u(t.username());return false}},[s(i.BaseInput,{field:{id:"username",label:b.label,type:"text",placeholder:b.placeholder,autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.username}),s(i.Button,{label:"Next",type:"submit",icon:"fa-2x fa-sign-in-alt db center mb2",classes:"w-100 mb3 tc br4",disabled:!this.username()})])]):null}))};return e}();function j(e,o){var i=r(o);return v(e,i).then((function(e){var r=e.application,o=e.brand,a=e.pusher;s.mount(document.getElementById("page"),{view:function(){return s(W,{application:r,header:o.header(),notification:i,onNext:function(e){if(!r.auth||!r.auth.landing){return}n.request({url:r.auth.landing.endpoint,params:{username:t.sha256(e)}}).then((function(e){var t=e.url;return window.location.href=t})).catch((function(e){var t=e.code,n=e.message;if(t===404){i({message:"Account not found",context:"warn",duration:2e4})}else{i({message:n,context:"error"})}}))}})}});return{application:r,pusher:a}}))}e.buildComponent=k;e.buildComponentList=B;e.landing=j;e.registerComponent=x;Object.defineProperty(e,"__esModule",{value:true})}));
