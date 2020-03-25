(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js"),require("js-sha256")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js","js-sha256"],t):(e=e||self,t(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher,e.sha256))})(this,(function(e,t,r,n,o,a,i){"use strict";var s="default"in t?t["default"]:t;r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r["default"]:r;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n["default"]:n;a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a["default"]:a;var d={bind:function(){return null}};function u(e){var t=e.mock,r=e.apiKey,n=e.cloudChannel,o=e.companyChannel,i=e.userChannel,s=e.applicationChannel,u=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:d,companyChannel:d,userChannel:d,applicationChannel:d,applicationUserChannel:d}}var l=new a(r,{cluster:"eu",encrypted:true});return{pusher:l,cloudChannel:l.subscribe(n),companyChannel:l.subscribe(o),userChannel:l.subscribe(i),applicationChannel:l.subscribe(s),applicationUserChannel:l.subscribe(u)}}var l={button:"",gridFlex:""};function c(e){var t=e.layoutBackground,r=t===void 0?"transparent":t,a=e.layoutLMaxWidth,i=a===void 0?"64rem":a,s=e.layoutLShadow,d=s===void 0?"2px 2px 8px 0 rgba(0,0,0,.2)":s,u=e.bodyText,c=u===void 0?"#333333":u,p=e.bodyFontSize,h=p===void 0?"1.25rem":p,f=e.bodyFontWeight,m=f===void 0?"200":f,g=e.background,v=g===void 0?"DodgerBlue":g,w=e.highlight,y=w===void 0?"unset":w,x=e.text,B=x===void 0?"DodgerBlue":x,C=e.icon,P=C===void 0?B:C,k=e.altText,F=k===void 0?"white":k,H=e.logoMargin,I=H===void 0?"0.5rem":H,L=e.logoBackground,T=L===void 0?"transparent":L,S=e.logoBorderRadius,O=S===void 0?".25rem":S,W=e.headerHeight,D=W===void 0?"3rem":W,E=e.headerBackground,R=E===void 0?v:E,A=e.headerBorderBottom,j=A===void 0?"none":A,U=e.headerBorderRadius,z=U===void 0?"0px":U,V=e.headerText,N=V===void 0?F:V,q=e.subheadingText,X=q===void 0?"rgba(0,0,0,.5)":q,M=e.cardHeight,Y=M===void 0?"12em":M,K=e.cardWidth,$=K===void 0?"12em":K,_=e.cardHeightNs,Z=_===void 0?Y:_,J=e.cardWidthNs,G=J===void 0?$:J,Q=e.cardText,ee=Q===void 0?F:Q,te=e.cardBackground,re=te===void 0?v:te,ne=e.cardBorderRadius,oe=ne===void 0?"0px":ne,ae=e.cardShadow,ie=ae===void 0?"unset":ae,se=e.cardHeaderFontSize,de=se===void 0?"1.25rem":se,ue=e.cardSubheadingFontSize,le=ue===void 0?"1.25rem":ue,ce=e.cardSubheadingPadding,be=ce===void 0?".25rem .5rem":ce,pe=e.cardHeaderOrder,he=pe===void 0?"0":pe,fe=e.cardIconOrder,me=fe===void 0?"1":fe,ge=e.panelBackground,ve=ge===void 0?"transparent":ge,we=e.panelBorderRadius,ye=we===void 0?".25rem":we,xe=e.footerHeight,Be=xe===void 0?"3rem":xe,Ce=e.footerBackground,Pe=Ce===void 0?"#F4F4F4":Ce,ke=e.footerText,Fe=ke===void 0?"#999":ke,He=e.lineHeight,Ie=He===void 0?"1.9em":He,Le=e.buttonBackground,Te=Le===void 0?v:Le,Se=e.buttonText,Oe=Se===void 0?F:Se,We=e.buttonPadding,De=We===void 0?".5rem":We,Ee=e.buttonBorderRadius,Re=Ee===void 0?".25rem":Ee,Ae=e.tableHeaderBackground,je=Ae===void 0?v:Ae,Ue=e.tableHeaderText,ze=Ue===void 0?F:Ue,Ve=e.primaryBackground,Ne=Ve===void 0?Te:Ve,qe=e.primaryText,Xe=qe===void 0?Oe:qe,Me=e.bgInfo,Ye=Me===void 0?"#357EDD":Me,Ke=e.txtInfo,$e=Ke===void 0?"#FFFFFF":Ke,_e=e.bgWarn,Ze=_e===void 0?"#FFD700":_e,Je=e.txtWarn,Ge=Je===void 0?"#111111":Je,Qe=e.bgError,et=Qe===void 0?"#E7040F":Qe,tt=e.txtError,rt=tt===void 0?"#FFFFFF":tt,nt=e.inpBrdClass,ot=nt===void 0?"bn":nt,at=e.button,it=at===void 0?"shadow-4":at,st=e.gridFlex,dt=st===void 0?"flex flex-wrap justify-center":st;b.helper({shrink0:b.flexShrink("0"),flexImg:b.objectFit("contain").minHeight("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:v}),branding:b.color(B),icon:b.color(P),brandingAlt:b.color(F),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:r}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":i,"box-shadow":d})),body:b.c(c),bodyFSize:b.fs(h),bodyFWeight:b({"font-weight":m}),marginLogo:b.m(I),bgLogo:b({background:T}),brdLogo:b.br(O),headerHeight:b.h(D),bgHeader:b({background:R}),bbHeader:b({"border-bottom":j}),brdHeader:b.br(z),header:b.c(N),subheading:b.c(X),cardSize:b.h(Y).w($).$media("screen and (min-width:30em)",b.h(Z).w(G)),card:b.c(ee),bgCard:b({background:re}),brdCard:b.br(oe),shadowCard:b({"box-shadow":ie}),cardHead:b({order:he}).fs(de),cardIcon:b({order:me}),cardSub:b({order:"3"}).p(be).fs(le),bgPanel:b({background:ve}),brdPanel:b.br(ye),footerHeight:b.h(Be),bgFooter:b({background:Pe}),footer:b.c(Fe),inputHeight:b.h(Ie),inputFocus:b({":focus":{"border-color":y}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:je}),thead:b.c(ze),bgButton:b({background:Te}),button:b.c(Oe),padButton:b.p(De),brdButton:b({border:"none"}).br(Re),bgPrimary:b({background:Ne}),primary:b.c(Xe),bgInfo:b({background:Ye}),info:b.c($e),bgWarn:b({background:Ze}),warn:b.c(Ge),bgError:b({background:et}),error:b.c(rt)});n.assign(l,{button:it,gridFlex:dt});o.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:ot+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:l.button+" "+b.brdButton.class})}var p={header:{lhs:{},rhs:{}},theme:{}};var h=function(){function e(e){if(e===void 0){e=""}this.loadBranding=r(p);this.branding=this.loadBranding.map((function(e){return n.merge({},p,e)}));this.path=e;this.header=this.branding.map((function(e){var t=e.header,r=e.theme;c(r);return t}))}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?t.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function f(e){if(n.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function m(e,r){r({message:String(e.message),context:"error"});t.redraw()}function g(e,r){window.history.replaceState(null,"",window.location.href);var a;var i;var s;return f(e).then((function(e){a=e;o.updateConfig({signFont:"Caveat"});if(a.uiWidgets){o.updateConfig(a.uiWidgets)}i=new h(a.brandingPath);s=u(a.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));s.applicationChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.applicationUserChannel.bind("notification",(function(e){r(e);t.redraw()}));return Promise.all([i.load().catch(n.noop),new Promise((function(e){s.pusher.connection.bind("connected",(function(){return e()}))}))])})).catch((function(e){return m(e,r)})).then((function(){s.pusher.connection.unbind("connected");return{application:a,brand:i,pusher:s}}))}function v(e){if(typeof e==="string"){return s("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return s(t.selector,t.content)}else{var r=e;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:r.href},r.text)}}var w=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return s(".ph4",n.map(t,(function(e){return v(e)})))};return e}();var y={};function x(e,t){if(e in y){throw new Error("Component "+e+" is already registered")}else{y[e]=t}}x("basic",w);function B(e){var t=e.type,r=e.data;if(t in y){return s(y[t],{type:t,data:r})}else{return s("span","Unknown component type: "+t)}}function C(e){return n.map(e,(function(e){return B(e)}))}var P=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return B(t)}else if(t.hasOwnProperty("icon")){var r=t;return s(".flex.items-center.mh2",{class:r.classes},s("i.fal.fa-2x.mr2",{class:r.icon}),r.title)}else if(t.hasOwnProperty("src")){var n=t;return s(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:n.classes},s("img.img",{src:n.src,class:n.imageClass,height:n.height,width:n.width}),n.title)}else{var o=t;return s(".mh2",{class:o.classes},o.title||"")}};return e}();var k=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.auth,n=r.logoutPath,o=r.logoutLabel,a=r.logoutIcon,i=a===void 0?"fa-sign-out-alt":a,d=t.classes;return s("a.link.ma2",{href:n,class:d},[o?s("span.mr2",o):null,s("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:i})])};return e}();function F(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var H=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var n=e.attrs.notification;n.map((function(e){var n=e.message,o=e.duration,a=o===void 0?3e3:o;if(n){t.active=true;setTimeout((function(){return t.dismiss()}),a)}return r.SKIP}))};e.prototype.view=function(e){var t=this;var r=e.attrs.notification;var n=r(),o=n.message,a=n.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:F(a),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},o)};e.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return e}();function I(e){return(e*100).toFixed(0)+"%"}var L=function(){function e(){this.saving=r();this.progress=r()}e.prototype.oninit=function(e){var t=e.attrs,r=t.saving,n=t.progress;if(r){this.saving=r}if(n){this.progress=n}};e.prototype.view=function(e){var t=e.attrs,r=t.application,n=r.version,o=r.auth,a=r.poweredBy,i=a===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:a,d=r.copyright,u=d===void 0?"2020 Secure Digital Exchange Limited":d,l=t.header,c=l.lhs,p=l.rhs,h=t.notification,f=t.fullScreen,m=t.headerClass,g=m===void 0?"":m,v=t.footerClass,w=v===void 0?"":v,y=t.logout,x=y===void 0?true:y,B=e.children;var C=this.saving();var F=C?this.progress():0;return[h?s(H,{notification:h}):null,s("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:f?undefined:b.layoutL.class},[s(".w-100"+b.shrink0,{class:g},s(".flex.items-center"+b.header.headerHeight.bgHeader.bbHeader.brdHeader,[s(P,c),s(".ml-auto",s(P,p)),o&&x?s(k,{auth:o,classes:"items-center dn flex-l "+b.header.class}):null])),B]),s(".w-100",{class:w},s("nav.flex.items-center.content-end"+b.footerHeight.bgFooter.footer,[i?s("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:i.href},s("img.img.h-100.o-80",{src:i.src,title:i.title})):null,s("p.center.f7",{title:n},[s.trust("&copy; "),u]),s("span.ma2.f3",{class:F?"":"dn"},I(F)),s("i.ma2.f3.fal.fa-spinner",{class:C?"fa-spin":"dn"}),o&&x?s(k,{auth:o,classes:"items-center flex dn-l "+b.footer.class}):null]))]};return e}();var T=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.header,n=t.headerClass,o=t.subheader,a=t.subheaderClass,i=t.content,d=t.wrapContent,u=d===void 0?true:d,l=t.footer;return[r?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:n},r):null,o?s("div"+b.shrink0,{class:a},o):null,u?s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,i):i,l]};return e}();var S=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.left,n=t.right;return s(".flex.flex-column.flex-row-l.items-stretch.ph2-l",[s(".w-100-l.ma2.pa4.shadow-4"+b.bgPanel.brdPanel,r),s(".w-100-l.ma2.pa4.shadow-4"+b.bgPanel.brdPanel,n)])};return e}();var O=/^ {0,}[0-9]{2}\/[0-9]{2}\/[0-9]{4} {0,}$/;var W=/^ {0,}(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2})) {0,}$/;var D=function(){function e(){this.dobText=r("");this.dobXform=this.dobText.map((function(e){return n.replace(e,/[^\d/]/g,"")}));this.postCodeText=r("");this.postCodeXform=this.postCodeText.map(n.toUpper);this.postCodeClean=this.postCodeXform.map((function(e){return n.replace(e,/\s/g,"")}));this.passwordText=r.lift((function(e,t){return e+"_"+t}),this.dobXform,this.postCodeClean);this.formValid=r.lift((function(e,t){return O.test(e)&&W.test(t)}),this.dobXform,this.postCodeClean)}e.prototype.view=function(e){var t=e.attrs.auth;var n=t.endpoint,a=t.username,i=t.dobLabel,d=i===void 0?"DOB":i,u=t.dobPlaceholder,l=u===void 0?"DOB e.g. 23/02/1973":u,c=t.postcodeLabel,p=c===void 0?"Postcode":c,h=t.postcodePlaceholder,f=h===void 0?"Postcode e.g. AB12 3CD":h,m=t.loginBtnText,g=m===void 0?"Login to Secure Document Vault":m,v=t.loginBtnIcon,w=v===void 0?"fa-2x fa-sign-in-alt db center mb2":v,y=t.loginBtnClass,x=y===void 0?"w-100 mb3 tc br4":y;return s("form[enctype=multipart/form-data][method=post][accept=utf-8]",{action:n},[s(o.BaseInput,{field:{id:"username",type:"hidden",readonly:true},value:r(a)}),s(o.BaseInput,{field:{id:"password",type:"hidden",autocomplete:"off",readonly:true},value:this.passwordText}),s(o.BaseInput,{field:{id:"dob",label:d,placeholder:l,pattern:O.source,autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.dobText,xform:this.dobXform}),s(o.BaseInput,{field:{id:"postcode",label:p,placeholder:f,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.postCodeText,xform:this.postCodeXform}),s(o.Button,{label:g,type:"submit",icon:w,classes:x+" "+b.bgPrimary.primary.class,disabled:!this.formValid()})])};return e}();var E=function(){function e(){this.passwordText=r("")}e.prototype.view=function(e){var t=e.attrs.auth;var a=t.endpoint,i=t.username,d=t.pinInput,u=t.passwordLabel,l=u===void 0?"PASSWORD":u,c=t.passwordPlaceholder,p=c===void 0?"PASSWORD":c,h=t.loginBtnText,f=h===void 0?"Login to Secure Document Vault":h,m=t.loginBtnIcon,g=m===void 0?"fa-2x fa-sign-in-alt db center mb2":m,v=t.loginBtnClass,w=v===void 0?"w-100 mb3 tc br4":v;return s("form[enctype=multipart/form-data][method=post][accept=utf-8]",{action:a},[s(o.BaseInput,{field:{id:"username",type:"hidden",readonly:true},value:r(i)}),s(o.BaseInput,{field:n.extend({},{id:"password",label:l,type:"password",placeholder:p,autocomplete:"current-password",autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},d?{inputmode:"numeric",pattern:"[0-9]+"}:{}),value:this.passwordText}),s(o.Button,{label:f,type:"submit",icon:g,classes:w+" "+b.bgPrimary.primary.class,disabled:!this.passwordText()})])};return e}();var R=function(){function e(){this.resetId=r("");this.mobileValid=r();this.emailValid=r()}e.prototype.oninit=function(e){var t=e.attrs.reset.hash;this.mobileValid=this.resetId.map((function(e){return t===i.sha256(n.replace(n.toLower(e),/[^0-9]/g,"").slice(-9))}));this.emailValid=this.resetId.map((function(e){return t===i.sha256(n.trim(n.toLower(e)))}))};e.prototype.view=function(e){var t=this;var r=e.attrs,a=r.auth,i=r.reset.type,d=r.onReset;var u=a.helpBtnText,l=u===void 0?"SEND PIN":u,c=a.helpBtnIcon,p=c===void 0?"fa-2x "+(i==="email"?"fa-envelope":"fa-mobile-android")+" db center mb2":c,h=a.loginBtnClass,f=h===void 0?"w-100 mb3 tc br4":h;return s("form[enctype=multipart/form-data]",{onsubmit:function(e){e.preventDefault();d(i==="email"?n.trim(n.toLower(t.resetId())):n.trim(n.replace(n.toLower(t.resetId()),/[^0-9]/g,"").slice(-9)),t.resetId())}},[s(o.BaseInput,{field:n.extend({},{id:"resetpassword",instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},i==="email"?{label:"EMAIL",type:"email",placeholder:"Enter e-mail address",inputmode:"email"}:{label:"MOBILE",type:"tel",placeholder:"Enter mobile number",inputmode:"numeric",pattern:"[0-9]+"}),value:this.resetId}),s(o.Button,{label:l,type:"submit",icon:p,classes:f+" "+b.bgPrimary.primary.class,disabled:i==="email"?!this.emailValid():!this.mobileValid()}),s("p","NOTE: you must use the same "+(i==="email"?"e-mail address":"mobile number")+" you used when taking out this policy.")])};return e}();var A=function(){function e(){this.toggleHelp=false}e.prototype.view=function(e){var t=this;var r=e.attrs,o=r.header,a=r.application,i=r.notification,d=r.onReset;if(!a.auth){return s("span","No authentication set")}var u=a.auth,l=u.onePanel,c=u.title,p=u.lines,h=u.postLines,f=h===void 0?[]:h,m=u.helpLinkText,g=m===void 0?"Trouble logging in?":m,v=u.helpTitle,w=u.helpLines,y=u.postHelpLines,x=y===void 0?[]:y,C=u.reset,P=a.footer;return s(L,{header:o,application:a,notification:i,logout:false},s(T,{content:[l?s(".flex.flex-column.items-center.ph2",s(".w-100.measure-wide",this.toggleHelp?[s("h2.fw5.mt2.tc"+b.branding,v),n.map(w,(function(e){return s("p.f5.tc",s.trust(e))})),s(".pa4.shadow-4"+b.bgPanel.brdPanel,[C?s(R,{auth:a.auth,reset:C,onReset:function(e,r){t.toggleHelp=false;d(e,r)}}):null,s("span.db.w-100.mt4.mb2.f6.tc.underline.pointer"+b.branding,{onclick:function(){return t.toggleHelp=false}},"Return")]),n.map(x,(function(e){return s("p.f5.tc",s.trust(e))}))]:[s("h2.fw5.mt2.tc"+b.branding,c),n.map(p,(function(e){return s("p.f5.tc",s.trust(e))})),s(".pa4.shadow-4"+b.bgPanel.brdPanel,[a.auth.type==="dobPostcode"?s(D,{auth:a.auth}):s(E,{auth:a.auth}),C?s("span.db.w-100.mt4.mb2.f6.tc.underline.pointer"+b.branding,{onclick:function(){return t.toggleHelp=true}},g):null]),n.map(f,(function(e){return s("p.f5.tc",s.trust(e))}))])):s(S,{left:[s("h2.fw5.mt2"+b.branding,c),n.map(p,(function(e){return s("p.f5",s.trust(e))})),a.auth.type==="dobPostcode"?s(D,{auth:a.auth}):s(E,{auth:a.auth}),n.map(f,(function(e){return s("p.f5",s.trust(e))}))],right:[s("h2.fw5.mt2"+b.branding,v),n.map(w,(function(e){return s("p.f5",s.trust(e))})),C?s(R,{auth:a.auth,reset:C,onReset:d}):null,n.map(x,(function(e){return s("p.f5",s.trust(e))}))]}),P?B(P):null]}))};return e}();function j(e,r){return function(n,o){if(r&&r.reset){var a=r.reset,i=a.username,s=a.endpoint;var d=new FormData;d.append("username",i);d.append("password",n);return t.request({method:"POST",url:s,body:d}).then((function(){return e({message:"We have sent your new PIN to "+o,duration:2e3})})).catch((function(t){return m(t,e)}))}else{return Promise.resolve(m(new Error("No authentication configuration"),e))}}}function U(e,t){var n=r(t);return g(e,n).then((function(e){var t=e.application,r=e.brand,o=e.pusher;s.mount(document.getElementById("page"),{view:function(){return s(A,{application:t,header:r.header(),notification:n,onReset:j(n,t.auth)})}});return{application:t,pusher:o}}))}e.buildComponent=B;e.buildComponentList=C;e.login=U;e.registerComponent=x;e.resetAuth=j;Object.defineProperty(e,"__esModule",{value:true})}));
