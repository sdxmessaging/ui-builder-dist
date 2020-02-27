(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js"),require("js-sha256")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js","js-sha256"],t):(e=e||self,t(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher,e.sha256))})(this,(function(e,t,n,r,a,i,o){"use strict";var s="default"in t?t["default"]:t;n=n&&n.hasOwnProperty("default")?n["default"]:n;r=r&&r.hasOwnProperty("default")?r["default"]:r;i=i&&i.hasOwnProperty("default")?i["default"]:i;var u={bind:function(){return null}};function d(e){var t=e.mock,n=e.apiKey,r=e.cloudChannel,a=e.companyChannel,o=e.userChannel,s=e.applicationChannel,d=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:u,companyChannel:u,userChannel:u,applicationChannel:u,applicationUserChannel:u}}var l=new i(n,{cluster:"eu",encrypted:true});return{pusher:l,cloudChannel:l.subscribe(r),companyChannel:l.subscribe(a),userChannel:l.subscribe(o),applicationChannel:l.subscribe(s),applicationUserChannel:l.subscribe(d)}}function l(e){var t=e.layoutBackground,n=t===void 0?"transparent":t,r=e.bodyText,i=r===void 0?"#333333":r,o=e.bodyFontSize,s=o===void 0?"1.25rem":o,u=e.bodyFontWeight,d=u===void 0?"200":u,l=e.background,c=l===void 0?"DodgerBlue":l,p=e.highlight,f=p===void 0?"unset":p,h=e.text,m=h===void 0?"DodgerBlue":h,g=e.icon,v=g===void 0?m:g,w=e.altText,y=w===void 0?"white":w,x=e.logoMargin,B=x===void 0?"0.5rem":x,C=e.logoBackground,P=C===void 0?"transparent":C,k=e.logoBorderRadius,T=k===void 0?".25rem":k,I=e.headerHeight,F=I===void 0?"3rem":I,H=e.headerBackground,L=H===void 0?c:H,W=e.headerBorderRadius,S=W===void 0?"0px":W,R=e.headerText,D=R===void 0?y:R,E=e.subheadingText,A=E===void 0?"rgba(0,0,0,.5)":E,O=e.cardHeight,U=O===void 0?"12em":O,V=e.cardWidth,j=V===void 0?"12em":V,N=e.cardHeightNs,q=N===void 0?U:N,z=e.cardWidthNs,Y=z===void 0?j:z,K=e.cardBackground,M=K===void 0?c:K,Z=e.cardBorderRadius,$=Z===void 0?"0px":Z,_=e.cardText,J=_===void 0?y:_,G=e.panelBackground,Q=G===void 0?"transparent":G,X=e.panelBorderRadius,ee=X===void 0?".25rem":X,te=e.footerHeight,ne=te===void 0?"3rem":te,re=e.footerBackground,ae=re===void 0?"#F4F4F4":re,ie=e.footerText,oe=ie===void 0?"#999":ie,se=e.lineHeight,ue=se===void 0?"1.9em":se,de=e.buttonBackground,le=de===void 0?c:de,ce=e.buttonText,pe=ce===void 0?y:ce,be=e.buttonPadding,fe=be===void 0?".5rem":be,he=e.buttonBorderRadius,me=he===void 0?".25rem":he,ge=e.tableHeaderBackground,ve=ge===void 0?c:ge,we=e.tableHeaderText,ye=we===void 0?y:we,xe=e.primaryBackground,Be=xe===void 0?le:xe,Ce=e.primaryText,Pe=Ce===void 0?pe:Ce,ke=e.bgInfo,Te=ke===void 0?"#357EDD":ke,Ie=e.txtInfo,Fe=Ie===void 0?"#FFFFFF":Ie,He=e.bgWarn,Le=He===void 0?"#FFD700":He,We=e.txtWarn,Se=We===void 0?"#111111":We,Re=e.bgError,De=Re===void 0?"#E7040F":Re,Ee=e.txtError,Ae=Ee===void 0?"#FFFFFF":Ee,Oe=e.inpBrdClass,Ue=Oe===void 0?"bn":Oe;b.helper({shrink0:b.flexShrink("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:c}),branding:b.color(m),icon:b.color(v),brandingAlt:b.color(y),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:n}),body:b.c(i),bodyFSize:b.fs(s),bodyFWeight:b({"font-weight":d}),marginLogo:b.m(B),bgLogo:b({background:P}),brdLogo:b.br(T),headerHeight:b.h(F),bgHeader:b({background:L}),brdHeader:b.br(S),header:b.c(D),subheading:b.c(A),cardSize:b.h(U).w(j).$media("screen and (min-width:30em)",b.h(q).w(Y)),card:b.c(J),bgCard:b({background:M}),brdCard:b.br($),bgPanel:b({background:Q}),brdPanel:b.br(ee),footerHeight:b.h(ne),bgFooter:b({background:ae}),footer:b.c(oe),inputHeight:b.h(ue),inputFocus:b({":focus":{"border-color":f}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:ve}),thead:b.c(ye),bgButton:b({background:le}),button:b.c(pe),padButton:b.p(fe),brdButton:b({border:"none"}).br(me),bgPrimary:b({background:Be}),primary:b.c(Pe),bgInfo:b({background:Te}),info:b.c(Fe),bgWarn:b({background:Le}),warn:b.c(Se),bgError:b({background:De}),error:b.c(Ae)});a.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:Ue+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:"shadow-4 "+b.brdButton.class})}var c={header:{lhs:{},rhs:{}},theme:{}};var p=function(){function e(e){if(e===void 0){e=""}this.loadBranding=n(c);this.branding=this.loadBranding.map((function(e){return r.merge({},c,e)}));this.path=e;this.header=this.branding.map((function(e){var t=e.header,n=e.theme;l(n);return t}))}e.prototype.update=function(e){this.path=e;return this.load()};e.prototype.load=function(){return this.path?t.request(this.path).then(this.loadBranding):Promise.resolve()};return e}();function f(e){if(r.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function h(e,n){n({message:String(e.message),context:"error"});t.redraw()}function m(e,n,r){window.history.replaceState(null,"",window.location.href);var i;var o;var s;return f(n).then((function(n){i=n;a.updateConfig({signFont:"Caveat"});if(i.uiWidgets){a.updateConfig(i.uiWidgets)}o=new p(i.brandingPath);s=d(e);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));s.applicationChannel.bind("reloadbranding",(function(){return o.load().then(t.redraw)}));s.applicationUserChannel.bind("notification",(function(e){r(e);t.redraw()}));return Promise.all([o.load(),new Promise((function(e){s.pusher.connection.bind("connected",(function(){return e()}))}))])})).catch((function(e){return h(e,r)})).then((function(){s.pusher.connection.unbind("connected");return{application:i,brand:o,pusher:s}}))}function g(e){if(typeof e==="string"){return s("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return s(t.selector,t.content)}else{var n=e;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:n.href},n.text)}}var v=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return s(".ph4",r.map(t,(function(e){return g(e)})))};return e}();var w={};function y(e,t){if(e in w){throw new Error("Component "+e+" is already registered")}else{w[e]=t}}y("basic",v);function x(e){var t=e.type,n=e.data;if(t in w){return s(w[t],{type:t,data:n})}else{return s("span","Unknown component type: "+t)}}function B(e){return r.map(e,(function(e){return x(e)}))}var C=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return x(t)}else if(t.hasOwnProperty("icon")){var n=t;return s(".flex.items-center.mh2",{class:n.classes},s("i.fal.fa-2x.mr2",{class:n.icon}),n.title)}else if(t.hasOwnProperty("src")){var r=t;return s(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:r.classes},s("img.img",{src:r.src,class:r.imageClass,height:r.height,width:r.width}),r.title)}else{var a=t;return s(".mh2",{class:a.classes},a.title||"")}};return e}();function P(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var k=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var r=e.attrs.notification;r.map((function(e){var r=e.message,a=e.duration,i=a===void 0?3e3:a;if(r){t.active=true;setTimeout((function(){return t.dismiss()}),i)}return n.SKIP}))};e.prototype.view=function(e){var t=this;var n=e.attrs.notification;var r=n(),a=r.message,i=r.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:P(i),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},a)};e.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return e}();function T(e){return(e*100).toFixed(0)+"%"}var I=function(){function e(){this.saving=n();this.progress=n()}e.prototype.oninit=function(e){var t=e.attrs,n=t.saving,r=t.progress;if(n){this.saving=n}if(r){this.progress=r}};e.prototype.view=function(e){var t=e.attrs,n=t.application,r=n.version,a=n.auth,i=n.copyright,o=i===void 0?"2020 Secure Digital Exchange Limited":i,u=t.header,d=u.lhs,l=u.rhs,c=t.notification,p=t.containerClass,f=p===void 0?"mv2-l mw8-l shadow-4-l":p,h=t.headerClass,m=h===void 0?"":h,g=t.footerClass,v=g===void 0?"":g,w=t.logout,y=w===void 0?true:w,x=e.children;var B=this.saving();var P=B?this.progress():0;return[s("span.clip",{style:{"font-family":"Caveat"}},"test"),c?s(k,{notification:c}):null,s("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:f},[s(".w-100",{class:m},s(".flex.justify-between.items-center"+b.shrink0.headerHeight.bgHeader.header,[s(C,d),s(C,l)])),x]),s(".w-100",{class:v},s("nav.ph2.flex.items-center.content-end"+b.footerHeight.bgFooter.footer,[s("p.center.f7",{title:r},[s.trust("&copy; "),o]),s("span.ma2.f3",{class:P?"":"dn"},T(P)),s("i.f3.fal.fa-spinner",{class:B?"fa-spin":"dn"}),a&&y?s("a.link.flex.items-center.ml2"+b.footer,{href:a.logoutPath},[a.logoutLabel?s("span.mr2",a.logoutLabel):null,a.logoutIcon?s("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:a.logoutIcon}):s("i.fal.fa-fw.fa-2x.fa-sign-out-alt[aria-hidden=true]")]):null]))]};return e}();var F=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.header,r=t.headerClass,a=t.subheader,i=t.subheaderClass,o=t.content,u=t.wrapContent,d=u===void 0?true:u,l=t.footer;return[n?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:r},n):null,a?s("div"+b.shrink0,{class:i},a):null,d?s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,o):o,l]};return e}();var H=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.left,r=t.right;return s(".flex.flex-column.flex-row-l.items-stretch.ph2-l",[s(".w-100-l.ma2.pa4.shadow-4"+b.bgPanel.brdPanel,n),s(".w-100-l.ma2.pa4.shadow-4"+b.bgPanel.brdPanel,r)])};return e}();var L=/^ {0,}[0-9]{2}\/[0-9]{2}\/[0-9]{4} {0,}$/;var W=/^ {0,}(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2})) {0,}$/;var S=function(){function e(){this.dobText=n("");this.postCodeText=n("");this.dobTrim=this.dobText.map(r.trim);this.postCodeTrim=this.postCodeText.map(r.trim);this.passwordText=n.lift((function(e,t){return(e+"_"+t.toUpperCase()).replace(/ /g,"")}),this.dobTrim,this.postCodeTrim);this.formValid=n.lift((function(e,t){return L.test(e)&&W.test(t)}),this.dobTrim,this.postCodeTrim)}e.prototype.view=function(e){var t=e.attrs.auth;var r=t.endpoint,i=t.username,o=t.dobLabel,u=o===void 0?"DOB":o,d=t.dobPlaceholder,l=d===void 0?"DOB e.g. 23/02/1973":d,c=t.postcodeLabel,p=c===void 0?"Postcode":c,f=t.postcodePlaceholder,h=f===void 0?"Postcode e.g. AB12 3CD":f,m=t.loginBtnText,g=m===void 0?"Login to Secure Document Vault":m,v=t.loginBtnIcon,w=v===void 0?"fa-2x fa-sign-in-alt db center mb2":v,y=t.loginBtnClass,x=y===void 0?"w-100 mb3 tc br4":y;return s("form[enctype=multipart/form-data][method=post][accept=utf-8]",{action:r},[s(a.BaseInput,{field:{id:"username",label:"",type:"hidden",readonly:true},value:n(i)}),s(a.BaseInput,{field:{id:"password",label:"",type:"hidden",autocomplete:"off",classes:"pa2"},value:this.passwordText}),s(a.BaseInput,{field:{id:"dob",label:u,type:"text",placeholder:l,autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.dobText}),s(a.BaseInput,{field:{id:"postcode",label:p,type:"text",placeholder:h,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.postCodeText}),s(a.Button,{label:g,type:"submit",icon:w,classes:x+" "+b.bgPrimary.primary.class,disabled:!this.formValid()})])};return e}();var R=function(){function e(){this.passwordText=n("")}e.prototype.view=function(e){var t=e.attrs.auth;var i=t.endpoint,o=t.username,u=t.pinInput,d=t.passwordLabel,l=d===void 0?"PASSWORD":d,c=t.passwordPlaceholder,p=c===void 0?"PASSWORD":c,f=t.loginBtnText,h=f===void 0?"Login to Secure Document Vault":f,m=t.loginBtnIcon,g=m===void 0?"fa-2x fa-sign-in-alt db center mb2":m,v=t.loginBtnClass,w=v===void 0?"w-100 mb3 tc br4":v;return s("form[enctype=multipart/form-data][method=post][accept=utf-8]",{action:i},[s(a.BaseInput,{field:{id:"username",label:"",type:"hidden",readonly:true},value:n(o)}),s(a.BaseInput,{field:r.extend({},{id:"password",label:l,type:"password",placeholder:p,autocomplete:"current-password",autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},u?{pattern:"[0-9]*",inputmode:"numeric"}:{}),value:this.passwordText}),s(a.Button,{label:h,type:"submit",icon:g,classes:w+" "+b.bgPrimary.primary.class,disabled:!this.passwordText()})])};return e}();var D=function(){function e(){this.resetId=n("");this.mobileValid=n();this.emailValid=n()}e.prototype.oninit=function(e){var t=e.attrs.reset.hash;this.mobileValid=this.resetId.map((function(e){return t===o.sha256(r.replace(r.toLower(e),/[^0-9]/g,"").slice(-9))}));this.emailValid=this.resetId.map((function(e){return t===o.sha256(r.trim(r.toLower(e)))}))};e.prototype.view=function(e){var t=this;var n=e.attrs,i=n.auth,o=n.reset.type,u=n.onReset;var d=i.helpBtnText,l=d===void 0?"SEND PIN":d,c=i.helpBtnIcon,p=c===void 0?"fa-2x "+(o==="email"?"fa-envelope":"fa-mobile-android")+" db center mb2":c,f=i.loginBtnClass,h=f===void 0?"w-100 mb3 tc br4":f;return s("form[enctype=multipart/form-data][novalidate=novalidate]",{onsubmit:function(e){e.preventDefault();u(o==="email"?r.trim(r.toLower(t.resetId())):r.trim(r.replace(r.toLower(t.resetId()),/[^0-9]/g,"").slice(-9)),t.resetId())}},[s(a.BaseInput,{field:{id:"resetpassword",label:o==="email"?"EMAIL":"MOBILE",type:o==="email"?"email":"tel",placeholder:o==="email"?"Enter e-mail address":"Enter mobile number",instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.resetId}),s(a.Button,{label:l,type:"submit",icon:p,classes:h+" "+b.bgPrimary.primary.class,disabled:o==="email"?!this.emailValid():!this.mobileValid()}),s("p","NOTE: you must use the same "+(o==="email"?"e-mail address":"mobile number")+" you used when taking out this policy.")])};return e}();var E=function(){function e(){this.toggleHelp=false}e.prototype.view=function(e){var t=this;var n=e.attrs,a=n.header,i=n.application,o=n.notification,u=n.onReset;if(!i.auth){return s("span","No authentication set")}var d=i.auth,l=d.onePanel,c=d.title,p=d.lines,f=d.postLines,h=f===void 0?[]:f,m=d.helpLinkText,g=m===void 0?"Trouble logging in?":m,v=d.helpTitle,w=d.helpLines,y=d.postHelpLines,B=y===void 0?[]:y,C=d.reset,P=i.footer;return s(I,{header:a,application:i,notification:o,logout:false},s(F,{content:[l?s(".flex.flex-column.items-center.ph2-l",s(".w-90.w-60-l",this.toggleHelp?[s("h2.fw5.mt2.tc"+b.branding,v),r.map(w,(function(e){return s("p.f5.tc",s.trust(e))})),s(".pa4.shadow-4"+b.bgPanel.brdPanel,[C?s(D,{auth:i.auth,reset:C,onReset:function(e,n){t.toggleHelp=false;u(e,n)}}):null,s("span.db.w-100.mt4.mb2.f6.tc.underline.pointer"+b.branding,{onclick:function(){return t.toggleHelp=false}},"Return")]),r.map(B,(function(e){return s("p.f5.tc",s.trust(e))}))]:[s("h2.fw5.mt2.tc"+b.branding,c),r.map(p,(function(e){return s("p.f5.tc",s.trust(e))})),s(".pa4.shadow-4"+b.bgPanel.brdPanel,[i.auth.type==="dobPostcode"?s(S,{auth:i.auth}):s(R,{auth:i.auth}),C?s("span.db.w-100.mt4.mb2.f6.tc.underline.pointer"+b.branding,{onclick:function(){return t.toggleHelp=true}},g):null]),r.map(h,(function(e){return s("p.f5.tc",s.trust(e))}))])):s(H,{left:[s("h2.fw5.mt2"+b.branding,c),r.map(p,(function(e){return s("p.f5",s.trust(e))})),i.auth.type==="dobPostcode"?s(S,{auth:i.auth}):s(R,{auth:i.auth}),r.map(h,(function(e){return s("p.f5",s.trust(e))}))],right:[s("h2.fw5.mt2"+b.branding,v),r.map(w,(function(e){return s("p.f5",s.trust(e))})),C?s(D,{auth:i.auth,reset:C,onReset:u}):null,r.map(B,(function(e){return s("p.f5",s.trust(e))}))]}),P?x(P):null]}))};return e}();function A(e,n){return function(r,a){if(n&&n.reset){var i=n.reset,o=i.username,s=i.endpoint;var u=new FormData;u.append("username",o);u.append("password",r);return t.request({method:"POST",url:s,body:u}).then((function(){return e({message:"We have sent your new PIN to "+a,duration:2e3})})).catch((function(t){return h(t,e)}))}else{return Promise.resolve(h(new Error("No authentication configuration"),e))}}}function O(e,t,r){var a=n(r);m(e,t,a).then((function(e){var t=e.application,n=e.brand;s.mount(document.getElementById("page"),{view:function(){return s(E,{application:t,header:n.header(),notification:a,onReset:A(a,t.auth)})}})}))}e.buildComponent=x;e.buildComponentList=B;e.login=O;e.registerComponent=y;e.resetAuth=A;Object.defineProperty(e,"__esModule",{value:true})}));
