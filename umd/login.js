(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js"),require("js-sha256")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js","js-sha256"],t):(e=e||self,t(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher,e.sha256))})(this,(function(e,t,n,r,o,a,i){"use strict";var s="default"in t?t["default"]:t;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n["default"]:n;r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r["default"]:r;a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a["default"]:a;var d={bind:function(){return null}};function u(e){var t=e.mock,n=e.apiKey,r=e.cloudChannel,o=e.companyChannel,i=e.userChannel,s=e.applicationChannel,u=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:d,companyChannel:d,userChannel:d,applicationChannel:d,applicationUserChannel:d}}var l=new a(n,{cluster:"eu",encrypted:true});return{pusher:l,cloudChannel:l.subscribe(r),companyChannel:l.subscribe(o),userChannel:l.subscribe(i),applicationChannel:l.subscribe(s),applicationUserChannel:l.subscribe(u)}}var l={};function c(e){r.assign(l,{company:"",copyright:"",tel:"",email:"",address:"",header:{lhs:{},rhs:{}},poweredBy:undefined},e)}var p={button:"",gridFlex:""};function h(e){var t=e.layoutBackground,n=t===void 0?"transparent":t,a=e.layoutLMaxWidth,i=a===void 0?"64rem":a,s=e.layoutLShadow,d=s===void 0?"unset":s,u=e.bodyText,l=u===void 0?"#333333":u,c=e.bodyFontSize,h=c===void 0?"1.25rem":c,f=e.bodyFontWeight,m=f===void 0?"200":f,g=e.background,v=g===void 0?"DodgerBlue":g,w=e.highlight,y=w===void 0?"unset":w,x=e.text,B=x===void 0?"DodgerBlue":x,P=e.icon,C=P===void 0?B:P,k=e.altText,F=k===void 0?"white":k,H=e.logoMargin,I=H===void 0?"0.5rem":H,T=e.logoBackground,L=T===void 0?"transparent":T,S=e.logoBorderRadius,A=S===void 0?".25rem":S,W=e.headerHeight,O=W===void 0?"3rem":W,R=e.headerBackground,E=R===void 0?v:R,D=e.headerBorderBottom,j=D===void 0?"none":D,U=e.headerBorderRadius,z=U===void 0?"0px":U,V=e.headerText,q=V===void 0?F:V,N=e.subheadingText,X=N===void 0?"rgba(0,0,0,.5)":N,M=e.cardHeight,Y=M===void 0?"12em":M,K=e.cardWidth,$=K===void 0?"12em":K,_=e.cardHeightNs,Z=_===void 0?Y:_,J=e.cardWidthNs,G=J===void 0?$:J,Q=e.cardText,ee=Q===void 0?F:Q,te=e.cardBackground,ne=te===void 0?v:te,re=e.cardBorderRadius,oe=re===void 0?"0px":re,ae=e.cardShadow,ie=ae===void 0?"unset":ae,se=e.cardHeaderFontSize,de=se===void 0?"1.25rem":se,ue=e.cardSubheadingFontSize,le=ue===void 0?"1.25rem":ue,ce=e.cardSubheadingPadding,be=ce===void 0?".25rem .5rem":ce,pe=e.cardHeaderOrder,he=pe===void 0?"0":pe,fe=e.cardIconOrder,me=fe===void 0?"1":fe,ge=e.panelBackground,ve=ge===void 0?"transparent":ge,we=e.panelBorderRadius,ye=we===void 0?".25rem":we,xe=e.footerHeight,Be=xe===void 0?"3rem":xe,Pe=e.footerBackground,Ce=Pe===void 0?"#F4F4F4":Pe,ke=e.footerText,Fe=ke===void 0?"#999":ke,He=e.lineHeight,Ie=He===void 0?"1.9em":He,Te=e.buttonBackground,Le=Te===void 0?v:Te,Se=e.buttonText,Ae=Se===void 0?F:Se,We=e.buttonPadding,Oe=We===void 0?".5rem":We,Re=e.buttonBorder,Ee=Re===void 0?"none":Re,De=e.buttonBorderRadius,je=De===void 0?".25rem":De,Ue=e.altButtonBackground,ze=Ue===void 0?Le:Ue,Ve=e.altButtonText,qe=Ve===void 0?Ae:Ve,Ne=e.altButtonPadding,Xe=Ne===void 0?Oe:Ne,Me=e.altButtonBorder,Ye=Me===void 0?Ee:Me,Ke=e.altButtonBorderRadius,$e=Ke===void 0?je:Ke,_e=e.tableHeaderBackground,Ze=_e===void 0?v:_e,Je=e.tableHeaderText,Ge=Je===void 0?F:Je,Qe=e.primaryBackground,et=Qe===void 0?Le:Qe,tt=e.primaryText,nt=tt===void 0?Ae:tt,rt=e.bgInfo,ot=rt===void 0?"#357EDD":rt,at=e.txtInfo,it=at===void 0?"#FFFFFF":at,st=e.bgWarn,dt=st===void 0?"#FFD700":st,ut=e.txtWarn,lt=ut===void 0?"#111111":ut,ct=e.bgError,bt=ct===void 0?"#E7040F":ct,pt=e.txtError,ht=pt===void 0?"#FFFFFF":pt,ft=e.inpBrdClass,mt=ft===void 0?"bn":ft,gt=e.button,vt=gt===void 0?"shadow-4":gt,wt=e.gridFlex,yt=wt===void 0?"flex flex-wrap justify-center":wt;b.helper({shrink0:b.flexShrink("0"),flexImg:b({"object-fit":"contain"}).minHeight("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:v}),branding:b.color(B),icon:b.color(C),brandingAlt:b.color(F),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:n}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":i,"box-shadow":d})),body:b.c(l),bodyFSize:b.fs(h),bodyFWeight:b({"font-weight":m}),marginLogo:b.m(I),bgLogo:b({background:L}),brdLogo:b.br(A),headerHeight:b.h(O),bgHeader:b({background:E}),bbHeader:b({"border-bottom":j}),brdHeader:b.br(z),header:b.c(q),subheading:b.c(X),cardSize:b.h(Y).w($).$media("screen and (min-width:30em)",b.h(Z).w(G)),card:b.c(ee),bgCard:b({background:ne}),brdCard:b.br(oe),shadowCard:b({"box-shadow":ie}),cardHead:b({order:he}).fs(de),cardIcon:b({order:me}),cardSub:b({order:"3"}).p(be).fs(le),bgPanel:b({background:ve}),brdPanel:b.br(ye),footerHeight:b.h(Be),bgFooter:b({background:Ce}),footer:b.c(Fe),inputHeight:b.h(Ie),inputFocus:b({":focus":{"border-color":y}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:Ze}),thead:b.c(Ge),bgButton:b({background:Le}),button:b.c(Ae),padButton:b.p(Oe),brdButton:b({border:Ee}).br(je),bgButtonAlt:b({background:ze}),buttonAlt:b.c(qe),padButtonAlt:b.p(Xe),brdButtonAlt:b({border:Ye}).br($e),bgPrimary:b({background:et}),primary:b.c(nt),bgInfo:b({background:ot}),info:b.c(it),bgWarn:b({background:dt}),warn:b.c(lt),bgError:b({background:bt}),error:b.c(ht)});r.assign(p,{button:vt,gridFlex:yt});o.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:mt+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:p.button+" "+b.brdButton.class});o.updateButtonContext({alt:b.bgButtonAlt.buttonAlt.padButtonAlt.brdButtonAlt.ripple.class,info:b({border:"1px solid "+it}).br(je).padButton.info.bgInfo.ripple.class,warn:b({border:"1px solid "+lt}).br(je).padButton.warn.bgWarn.ripple.class,error:b({border:"1px solid "+ht}).br(je).padButton.error.bgError.ripple.class})}var f=function(){function e(e){var t=e.brandingPath,r=e.themePath;this.branding=n({});this.theme=n({});this.brandingPath=t;this.branding.map(c);this.themePath=r;this.theme.map(h)}e.prototype.load=function(){return Promise.all([this.loadBranding(),this.loadTheme()])};e.prototype.loadBranding=function(){return this.brandingPath?t.request(this.brandingPath).then(this.branding).catch(r.noop):Promise.resolve()};e.prototype.loadTheme=function(){return this.themePath?t.request(this.themePath).then(this.theme).catch(r.noop):Promise.resolve()};return e}();function m(e){if(r.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function g(e,n){n({message:String(e.message),context:"error"});t.redraw()}function v(e,n){window.history.replaceState(null,"",window.location.href);var a;var i;var s;return m(e).then((function(e){a=e;o.updateConfig({signFont:"Caveat"});if(a.uiWidgets){o.updateConfig(a.uiWidgets)}i=new f(a);s=u(a.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));s.cloudChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.companyChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.applicationChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.applicationUserChannel.bind("notification",(function(e){n(e);t.redraw()}));return Promise.all([i.load().catch(r.noop),new Promise((function(e){s.pusher.connection.bind("connected",(function(){s.pusher.connection.unbind("connected");e()}))}))])})).catch((function(e){return g(e,n)})).then((function(){return{application:a,pusher:s}}))}function w(e){if(typeof e==="string"){return s("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return s(t.selector,t.content)}else{var n=e;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:n.href},n.text)}}var y=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return s(".ph4",r.map(t,(function(e){return w(e)})))};return e}();var x={};function B(e,t){if(e in x){throw new Error("Component "+e+" is already registered")}else{x[e]=t}}B("basic",y);function P(e){var t=e.type,n=e.data;if(t in x){return s(x[t],{type:t,data:n})}else{return s("span","Unknown component type: "+t)}}function C(e){return r.map(e,(function(e){return P(e)}))}function k(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var F=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var r=e.attrs.notification;r.map((function(e){var r=e.message,o=e.duration,a=o===void 0?3e3:o;if(r){t.active=true;setTimeout((function(){return t.dismiss()}),a)}return n.SKIP}))};e.prototype.view=function(e){var t=this;var n=e.attrs.notification;var r=n(),o=r.message,a=r.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:k(a),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},o)};e.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return e}();var H=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return P(t)}else if(t.hasOwnProperty("icon")){var n=t;return s(".flex.items-center.mh2",{class:n.classes},s("i.fal.fa-2x.mr2",{class:n.icon}),n.title)}else if(t.hasOwnProperty("src")){var r=t;return s(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:r.classes},s("img.img",{src:r.src,class:r.imageClass,height:r.height,width:r.width}),r.title)}else{var o=t;return s(".mh2",{class:o.classes},o.title||"")}};return e}();var I=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.auth,r=n.logoutPath,o=n.logoutLabel,a=n.logoutIcon,i=a===void 0?"fa-sign-out-alt":a,d=t.classes;return s("a.link.ma2",{href:r,class:d},[o?s("span.mr2",o):null,s("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:i})])};return e}();var T=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.application.auth,r=t.logout;var o=l.header?l.header:{lhs:"",rhs:""},a=o.lhs,i=o.rhs;return[s(H,a),s(".ml-auto",s(H,i)),n&&r?s(I,{auth:n,classes:"items-center dn flex-l "+b.header.class}):null]};return e}();function L(e){return(e*100).toFixed(0)+"%"}var S=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.application,r=n.version,o=n.auth,a=t.saving,i=t.progress,d=t.logout;var u=l.poweredBy,c=u===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:u,p=l.copyright,h=p===void 0?"":p;var f=a?a():false;var m=f&&i?i():0;return[c?s("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:c.href},s("img.img.h-100.o-80",{src:c.src,title:c.title})):null,s("p.center.f7",{title:r},h?[s.trust("&copy; "),h]:null),s("span.ma2.f3",{class:m?"":"dn"},L(m)),s("i.ma2.f3.fal.fa-spinner",{class:f?"fa-spin":"dn"}),o&&d?s(I,{auth:o,classes:"items-center flex dn-l "+b.footer.class}):null]};return e}();var A=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.application,r=t.notification,o=t.saving,a=t.progress,i=t.fullScreen,d=t.responsiveHeader,u=t.responsiveFooter,l=t.logout,c=l===void 0?true:l,p=t.header,h=t.footer,f=e.children;return[r?s(F,{notification:r}):null,s("nav.items-center.self-center.w-100"+b.header.headerHeight.bgHeader.bbHeader.brdHeader.shrink0,{class:(d?"dn flex-l":"flex")+" "+(i?"":b.layoutL.class)},p?p:s(T,{application:n,logout:c})),s("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:i?undefined:b.layoutL.class},f),s("nav.w-100.items-center.content-end"+b.footerHeight.bgFooter.footer,{class:u?"dn flex-l":"flex"},h?h:s(S,{application:n,saving:o,progress:a,logout:c}))]};return e}();var W=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.header,r=t.headerClass,o=t.subheader,a=t.subheaderClass,i=t.content,d=t.wrapContent,u=d===void 0?true:d,l=t.footer;return[n?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:r},n):null,o?s("div"+b.shrink0,{class:a},o):null,u?s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,i):i,l]};return e}();var O=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.left,r=t.right;return s(".flex.flex-column.flex-row-l.items-stretch.ph2-l",[s(".w-100-l.ma2.pa4.shadow-4"+b.bgPanel.brdPanel,n),s(".w-100-l.ma2.pa4.shadow-4"+b.bgPanel.brdPanel,r)])};return e}();var R=/^ {0,}[0-9]{2}\/[0-9]{2}\/[0-9]{4} {0,}$/;var E=/^ {0,}(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2})) {0,}$/;var D=function(){function e(){this.dobText=n("");this.dobXform=this.dobText.map((function(e){return r.replace(e,/[^\d/]/g,"")}));this.postCodeText=n("");this.postCodeXform=this.postCodeText.map(r.toUpper);this.postCodeClean=this.postCodeXform.map((function(e){return r.replace(e,/\s/g,"")}));this.passwordText=n.lift((function(e,t){return e+"_"+t}),this.dobXform,this.postCodeClean);this.formValid=n.lift((function(e,t){return R.test(e)&&E.test(t)}),this.dobXform,this.postCodeClean)}e.prototype.view=function(e){var t=e.attrs.auth;var r=t.endpoint,a=t.username,i=t.dobLabel,d=i===void 0?"DOB":i,u=t.dobPlaceholder,l=u===void 0?"DOB e.g. 23/02/1973":u,c=t.postcodeLabel,p=c===void 0?"Postcode":c,h=t.postcodePlaceholder,f=h===void 0?"Postcode e.g. AB12 3CD":h,m=t.loginBtnText,g=m===void 0?"Login to Secure Document Vault":m,v=t.loginBtnIcon,w=v===void 0?"fa-2x fa-sign-in-alt db center mb2":v,y=t.loginBtnClass,x=y===void 0?"w-100 mb3 tc br4":y;return s("form[enctype=multipart/form-data][method=post][accept=utf-8]",{action:r},[s(o.BaseInput,{field:{id:"username",type:"hidden",readonly:true},value:n(a)}),s(o.BaseInput,{field:{id:"password",type:"hidden",autocomplete:"off",readonly:true},value:this.passwordText}),s(o.BaseInput,{field:{id:"dob",label:d,placeholder:l,pattern:R.source,autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.dobText,xform:this.dobXform}),s(o.BaseInput,{field:{id:"postcode",label:p,placeholder:f,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.postCodeText,xform:this.postCodeXform}),s(o.Button,{label:g,type:"submit",icon:w,classes:x+" "+b.bgPrimary.primary.class,disabled:!this.formValid()})])};return e}();var j=function(){function e(){this.passwordText=n("")}e.prototype.view=function(e){var t=e.attrs.auth;var a=t.endpoint,i=t.username,d=t.pinInput,u=t.passwordLabel,l=u===void 0?"PASSWORD":u,c=t.passwordPlaceholder,p=c===void 0?"PASSWORD":c,h=t.loginBtnText,f=h===void 0?"Login to Secure Document Vault":h,m=t.loginBtnIcon,g=m===void 0?"fa-2x fa-sign-in-alt db center mb2":m,v=t.loginBtnClass,w=v===void 0?"w-100 mb3 tc br4":v;return s("form[enctype=multipart/form-data][method=post][accept=utf-8]",{action:a},[s(o.BaseInput,{field:{id:"username",type:"hidden",readonly:true},value:n(i)}),s(o.BaseInput,{field:r.extend({},{id:"password",label:l,type:"password",placeholder:p,autocomplete:"current-password",autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},d?{inputmode:"numeric",pattern:"[0-9]+"}:{}),value:this.passwordText}),s(o.Button,{label:f,type:"submit",icon:g,classes:w+" "+b.bgPrimary.primary.class,disabled:!this.passwordText()})])};return e}();var U=function(){function e(){this.resetId=n("");this.mobileValid=n();this.emailValid=n()}e.prototype.oninit=function(e){var t=e.attrs.reset.hash;this.mobileValid=this.resetId.map((function(e){return t===i.sha256(r.replace(r.toLower(e),/[^0-9]/g,"").slice(-9))}));this.emailValid=this.resetId.map((function(e){return t===i.sha256(r.trim(r.toLower(e)))}))};e.prototype.view=function(e){var t=this;var n=e.attrs,a=n.auth,i=n.reset.type,d=n.onReset;var u=a.helpBtnText,l=u===void 0?"SEND PIN":u,c=a.helpBtnIcon,p=c===void 0?"fa-2x "+(i==="email"?"fa-envelope":"fa-mobile-android")+" db center mb2":c,h=a.loginBtnClass,f=h===void 0?"w-100 mb3 tc br4":h;return s("form[enctype=multipart/form-data]",{onsubmit:function(e){e.preventDefault();d(i==="email"?r.trim(r.toLower(t.resetId())):r.trim(r.replace(r.toLower(t.resetId()),/[^0-9]/g,"").slice(-9)),t.resetId())}},[s(o.BaseInput,{field:r.extend({},{id:"resetpassword",instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},i==="email"?{label:"EMAIL",type:"email",placeholder:"Enter e-mail address",inputmode:"email"}:{label:"MOBILE",type:"tel",placeholder:"Enter mobile number",inputmode:"numeric",pattern:"[0-9]+"}),value:this.resetId}),s(o.Button,{label:l,type:"submit",icon:p,classes:f+" "+b.bgPrimary.primary.class,disabled:i==="email"?!this.emailValid():!this.mobileValid()}),s("p","NOTE: you must use the same "+(i==="email"?"e-mail address":"mobile number")+" you used when taking out this policy.")])};return e}();var z=function(){function e(){this.toggleHelp=false}e.prototype.view=function(e){var t=this;var n=e.attrs,o=n.application,a=n.notification,i=n.onReset;if(!o.auth){return s("span","No authentication set")}var d=o.auth,u=d.onePanel,l=d.title,c=d.lines,p=d.postLines,h=p===void 0?[]:p,f=d.helpLinkText,m=f===void 0?"Trouble logging in?":f,g=d.helpTitle,v=d.helpLines,w=d.postHelpLines,y=w===void 0?[]:w,x=d.reset,B=o.footer;return s(A,{application:o,notification:a,logout:false},s(W,{content:[u?s(".flex.flex-column.items-center.ph2",s(".w-100.measure-wide",this.toggleHelp?[s("h2.fw5.mt2.tc"+b.branding,g),r.map(v,(function(e){return s("p.f5.tc",s.trust(e))})),s(".pa4.shadow-4"+b.bgPanel.brdPanel,[x?s(U,{auth:o.auth,reset:x,onReset:function(e,n){t.toggleHelp=false;i(e,n)}}):null,s("span.db.w-100.mt4.mb2.f6.tc.underline.pointer"+b.branding,{onclick:function(){return t.toggleHelp=false}},"Return")]),r.map(y,(function(e){return s("p.f5.tc",s.trust(e))}))]:[s("h2.fw5.mt2.tc"+b.branding,l),r.map(c,(function(e){return s("p.f5.tc",s.trust(e))})),s(".pa4.shadow-4"+b.bgPanel.brdPanel,[o.auth.type==="dobPostcode"?s(D,{auth:o.auth}):s(j,{auth:o.auth}),x?s("span.db.w-100.mt4.mb2.f6.tc.underline.pointer"+b.branding,{onclick:function(){return t.toggleHelp=true}},m):null]),r.map(h,(function(e){return s("p.f5.tc",s.trust(e))}))])):s(O,{left:[s("h2.fw5.mt2"+b.branding,l),r.map(c,(function(e){return s("p.f5",s.trust(e))})),o.auth.type==="dobPostcode"?s(D,{auth:o.auth}):s(j,{auth:o.auth}),r.map(h,(function(e){return s("p.f5",s.trust(e))}))],right:[s("h2.fw5.mt2"+b.branding,g),r.map(v,(function(e){return s("p.f5",s.trust(e))})),x?s(U,{auth:o.auth,reset:x,onReset:i}):null,r.map(y,(function(e){return s("p.f5",s.trust(e))}))]}),B?P(B):null]}))};return e}();function V(e,n){return function(r,o){if(n&&n.reset){var a=n.reset,i=a.username,s=a.endpoint;var d=new FormData;d.append("username",i);d.append("password",r);return t.request({method:"POST",url:s,body:d}).then((function(){return e({message:"We have sent your new PIN to "+o,duration:2e3})})).catch((function(t){return g(t,e)}))}else{return Promise.resolve(g(new Error("No authentication configuration"),e))}}}function q(e,t){var r=n(t);return v(e,r).then((function(e){var t=e.application,n=e.pusher;s.mount(document.getElementById("page"),{view:function(){return s(z,{application:t,notification:r,onReset:V(r,t.auth)})}});return{application:t,pusher:n}}))}e.buildComponent=P;e.buildComponentList=C;e.login=q;e.registerComponent=B;e.resetAuth=V;Object.defineProperty(e,"__esModule",{value:true})}));
