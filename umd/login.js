(function(t,e){typeof exports==="object"&&typeof module!=="undefined"?e(exports,require("mithril"),require("lodash"),require("mithril/stream"),require("@sdxmessaging/ui-widgets"),require("pusher-js"),require("js-sha256")):typeof define==="function"&&define.amd?define(["exports","mithril","lodash","mithril/stream","@sdxmessaging/ui-widgets","pusher-js","js-sha256"],e):(t=t||self,e(t.uiBuilder={},t.m,t._,t.m.stream,t.uiWidgets,t.Pusher,t.sha256))})(this,(function(t,e,n,r,a,i,o){"use strict";var s="default"in e?e["default"]:e;n=n&&n.hasOwnProperty("default")?n["default"]:n;r=r&&r.hasOwnProperty("default")?r["default"]:r;i=i&&i.hasOwnProperty("default")?i["default"]:i;var u={bind:function(){return null}};function l(t){var e=t.mock,n=t.apiKey,r=t.cloudChannel,a=t.companyChannel,o=t.userChannel,s=t.applicationChannel,l=t.applicationUserChannel;if(e){return{pusher:{},cloudChannel:u,companyChannel:u,userChannel:u,applicationChannel:u,applicationUserChannel:u}}var d=new i(n,{cluster:"eu",encrypted:true});return{pusher:d,cloudChannel:d.subscribe(r),companyChannel:d.subscribe(a),userChannel:d.subscribe(o),applicationChannel:d.subscribe(s),applicationUserChannel:d.subscribe(l)}}function d(t){var e=t.background,n=e===void 0?"DodgerBlue":e,r=t.highlight,i=r===void 0?"unset":r,o=t.text,s=o===void 0?"DodgerBlue":o,u=t.altText,l=u===void 0?"white":u,d=t.logoBackground,c=d===void 0?"transparent":d,p=t.logoBorderRadius,f=p===void 0?".25rem":p,h=t.headerHeight,m=h===void 0?"3rem":h,g=t.headerBackground,v=g===void 0?n:g,w=t.headerText,y=w===void 0?l:w,x=t.headerBorderRadius,B=x===void 0?"0px":x,C=t.panelBackground,P=C===void 0?"transparent":C,k=t.panelBorderRadius,T=k===void 0?".25rem":k,I=t.footerHeight,F=I===void 0?"3rem":I,H=t.footerBackground,L=H===void 0?"#F4F4F4":H,E=t.lineHeight,D=E===void 0?"1.9em":E,R=t.buttonBackground,A=R===void 0?n:R,O=t.buttonText,S=O===void 0?l:O,W=t.buttonBorderRadius,U=W===void 0?".25rem":W,V=t.tableHeaderBackground,j=V===void 0?n:V,q=t.tableHeaderText,N=q===void 0?l:q,Y=t.primaryBackground,z=Y===void 0?A:Y,K=t.primaryText,M=K===void 0?S:K,Z=t.bgInfo,_=Z===void 0?"#357EDD":Z,$=t.txtInfo,J=$===void 0?"#FFFFFF":$,G=t.bgWarn,Q=G===void 0?"#FFD700":G,X=t.txtWarn,tt=X===void 0?"#111111":X,et=t.bgError,nt=et===void 0?"#E7040F":et,rt=t.txtError,at=rt===void 0?"#FFFFFF":rt,it=t.inpBrdClass,ot=it===void 0?"bn":it;b.helper({shrink0:b.flexShrink("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:n}),branding:b.color(s),brandingAlt:b.color(l),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLogo:b({background:c}),brdLogo:b.br(f),headerHeight:b.height(m),bgHeader:b({background:v}),header:b.color(y),brdHeader:b.br(B),bgPanel:b({background:P}),brdPanel:b.br(T),footerHeight:b.height(F),bgFooter:b({background:L}),inputHeight:b.height(D),inputFocus:b({":focus":{"border-color":i}}),active:b({"box-shadow":"0px 0px 8px "+s}),inactive:b({":hover":{"box-shadow":"0px 0px 4px "+s}}),empty:b({background:"#FFF5BE"}),bgThead:b({background:j}),thead:b.color(N),bgButton:b({background:A}),button:b.color(S),brdButton:b({border:"none"}).br(U),bgPrimary:b({background:z}),primary:b.color(M),bgInfo:b({background:_}),info:b.color(J),bgWarn:b({background:Q}),warn:b.color(tt),bgError:b({background:nt}),error:b.color(at)});a.updateTheme({icon:"fal",lblCol:b.branding,inpHgt:b.inputHeight.class,inpBrd:ot+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnBrd:b.brdButton})}var c={header:{lhs:{},rhs:{}},theme:{}};var p=function(){function t(t){if(t===void 0){t=""}this.loadBranding=r(c);this.branding=this.loadBranding.map((function(t){return n.merge({},c,t)}));this.path=t;this.header=this.branding.map((function(t){var e=t.header,n=t.theme;d(n);return e}))}t.prototype.update=function(t){this.path=t;return this.load()};t.prototype.load=function(){return this.path?e.request(this.path).then(this.loadBranding):Promise.resolve()};return t}();function f(t){if(n.isString(t)){return e.request(t)}else{return Promise.resolve(t)}}function h(t,e){e({message:String(t.message),context:"error"});s.redraw()}function m(t,n,i){if(i===void 0){i={message:""}}window.history.replaceState(null,"",window.location.href);var o;var s;var u;var d=r(i);return f(n).then((function(n){o=n;a.updateConfig({signFont:"Caveat"});if(o.uiWidgets){a.updateConfig(o.uiWidgets)}s=new p(o.brandingPath);u=l(t);u.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));u.applicationUserChannel.bind("redirect",(function(t){return window.location.href=t.url}));u.applicationChannel.bind("reloadbranding",(function(){return s.load().then(e.redraw)}));u.applicationUserChannel.bind("notification",(function(t){return d(t)}));return s.load()})).catch((function(t){return h(t,d)})).then((function(){return{application:o,brand:s,pusher:u,notification:d}}))}function g(t){if(typeof t==="string"){return s("p",t)}else if(t.hasOwnProperty("selector")){var e=t;return s(e.selector,e.content)}else{var n=t;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:n.href},n.text)}}var v=function(){function t(){}t.prototype.view=function(t){var e=t.attrs.data;return s(".ph4",n.map(e,(function(t){return g(t)})))};return t}();var w={};function y(t,e){if(t in w){throw new Error("Component "+t+" is already registered")}else{w[t]=e}}y("basic",v);function x(t){var e=t.type,n=t.data;if(e in w){return s(w[e],{type:e,data:n})}else{return s("span","Unknown component type: "+e)}}function B(t){return n.map(t,(function(t){return x(t)}))}var C=function(){function t(){}t.prototype.view=function(t){var e=t.attrs;if(e.hasOwnProperty("type")){return x(e)}else if(e.hasOwnProperty("icon")){var n=e;return s(".flex.items-center.mh2",{class:n.classes},s("i.fal.fa-2x.mr2",{class:n.icon}),n.title)}else if(e.hasOwnProperty("src")){var r=e;return s(".flex.items-center.mh2"+b.bgLogo.brdLogo,{class:r.classes},s("img.img",{src:r.src,class:r.imageClass,height:r.height,width:r.width}),r.title)}else{var a=e;return s(".mh2",{class:a.classes},a.title||"")}};return t}();function P(t){if(t===void 0){t="info"}switch(t){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var k=function(){function t(){this.active=false}t.prototype.oninit=function(t){var e=this;var n=t.attrs.notification;n.map((function(t){var n=t.message,a=t.duration,i=a===void 0?3e3:a;if(n){e.active=true;setTimeout((function(){return e.dismiss()}),i)}return r.SKIP}))};t.prototype.view=function(t){var e=this;var n=t.attrs.notification;var r=n(),a=r.message,i=r.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return e.dismiss()},class:P(i),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},a)};t.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return t}();function T(t){return(t*100).toFixed(0)+"%"}var I=function(){function t(){this.saving=r();this.progress=r()}t.prototype.oninit=function(t){var e=t.attrs,n=e.saving,r=e.progress;if(n){this.saving=n}if(r){this.progress=r}};t.prototype.view=function(t){var e=t.attrs,n=e.application,r=n.version,a=n.auth,i=e.header,o=i.lhs,u=i.rhs,l=e.notification,d=e.containerClass,c=d===void 0?"mv2-l mw8-l shadow-4-l":d,p=e.headerClass,f=p===void 0?"":p,h=e.footerClass,m=h===void 0?"":h,g=e.logout,v=g===void 0?true:g,w=t.children;var y=this.saving();var x=y?this.progress():0;return[s("span.clip",{style:{"font-family":"Caveat"}},"test"),l?s(k,{notification:l}):null,s("main.flex-auto.flex.flex-column.self-center.w-100",{class:c},[s(".w-100",{class:f},s(".flex.justify-between.items-center"+b.shrink0.headerHeight.bgHeader.header,[s(C,o),s(C,u)])),w]),s(".w-100",{class:m},s("nav.ph2.flex.items-center.content-end"+b.footerHeight.bgFooter,[s("p.mr-auto.f7.silver",{title:r},s.trust("&copy; 2019 Secure Digital Exchange Limited")),s("span.ma2.f3.silver",{class:x?"":"dn"},T(x)),s("i.f3.mid-gray.fal.fa-spinner",{class:y?"fa-spin":"dn"}),a&&v?s("a.ml2.mid-gray",{href:a.logoutPath},s("i.fal.fa-fw.fa-2x.fa-sign-out-alt[aria-hidden=true]")):null]))]};return t}();var F=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,n=e.header,r=e.subheader,a=e.content,i=e.footer;return[n?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,n):null,r?s("div"+b.shrink0,r):null,s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,a),i]};return t}();var H=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,n=e.left,r=e.right;return s(".flex.flex-column.flex-row-l.items-stretch.ph2-l",[s(".w-100-l.ma2.pa4.shadow-4"+b.bgPanel.brdPanel,n),s(".w-100-l.ma2.pa4.shadow-4"+b.bgPanel.brdPanel,r)])};return t}();var L=/^ {0,}[0-9]{2}\/[0-9]{2}\/[0-9]{4} {0,}$/;var E=/^ {0,}(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2})) {0,}$/;var D=function(){function t(){this.dobText=r("");this.postCodeText=r("");this.dobTrim=this.dobText.map(n.trim);this.postCodeTrim=this.postCodeText.map(n.trim);this.passwordText=r.lift((function(t,e){return(t+"_"+e).replace(/ /g,"")}),this.dobTrim,this.postCodeTrim);this.formValid=r.lift((function(t,e){return L.test(t)&&E.test(e)}),this.dobTrim,this.postCodeTrim)}t.prototype.view=function(t){var e=t.attrs.auth;var n=e.endpoint,i=e.username,o=e.dobPlaceholder,u=o===void 0?"DOB e.g. 23/02/1973":o,l=e.postcodePlaceholder,d=l===void 0?"Postcode e.g. AB12 3CD":l,c=e.loginBtnText,p=c===void 0?"Login to Secure Document Vault":c,f=e.loginBtnIcon,h=f===void 0?"fa-2x fa-sign-in-alt db center mb2":f,m=e.loginBtnClass,g=m===void 0?"w-100 mb3 tc br4":m;return s("form[enctype=multipart/form-data][method=post][accept=utf-8]",{action:n},[s(a.BaseInput,{field:{id:"username",label:"",type:"hidden",readonly:true},value:r(i)}),s(a.BaseInput,{field:{id:"password",label:"",type:"hidden",autocomplete:"off",classes:"pa2"},value:this.passwordText}),s(a.BaseInput,{field:{id:"dob",label:"DOB",type:"text",placeholder:u,autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.dobText}),s(a.BaseInput,{field:{id:"postcode",label:"Postcode",type:"text",placeholder:d,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.postCodeText}),s(a.Button,{label:p,type:"submit",icon:h,classes:g+" "+b.bgPrimary.primary.class,disabled:!this.formValid()})])};return t}();var R=function(){function t(){this.passwordText=r("")}t.prototype.view=function(t){var e=t.attrs.auth;var i=e.endpoint,o=e.username,u=e.pinInput,l=e.passwordLabel,d=l===void 0?"PASSWORD":l,c=e.passwordPlaceholder,p=c===void 0?"PASSWORD":c,f=e.loginBtnText,h=f===void 0?"Login to Secure Document Vault":f,m=e.loginBtnIcon,g=m===void 0?"fa-2x fa-sign-in-alt db center mb2":m,v=e.loginBtnClass,w=v===void 0?"w-100 mb3 tc br4":v;return s("form[enctype=multipart/form-data][method=post][accept=utf-8]",{action:i},[s(a.BaseInput,{field:{id:"username",label:"",type:"hidden",readonly:true},value:r(o)}),s(a.BaseInput,{field:n.extend({},{id:"password",label:d,type:"password",placeholder:p,autocomplete:"current-password",autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},u?{pattern:"[0-9]*",inputmode:"numeric"}:{}),value:this.passwordText}),s(a.Button,{label:h,type:"submit",icon:g,classes:w+" "+b.bgPrimary.primary.class,disabled:!this.passwordText()})])};return t}();var A=function(){function t(){this.resetId=r("");this.mobileValid=r();this.emailValid=r()}t.prototype.oninit=function(t){var e=t.attrs.reset.hash;this.mobileValid=this.resetId.map((function(t){return e===o.sha256(n.replace(n.toLower(t),/[^0-9]/g,"").slice(-9))}));this.emailValid=this.resetId.map((function(t){return e===o.sha256(n.trim(n.toLower(t)))}))};t.prototype.view=function(t){var e=this;var r=t.attrs,i=r.auth,o=r.reset.type,u=r.onReset;var l=i.helpBtnText,d=l===void 0?"SEND PIN":l,c=i.helpBtnIcon,p=c===void 0?"fa-2x "+(o==="email"?"fa-envelope":"fa-mobile-android")+" db center mb2":c,f=i.loginBtnClass,h=f===void 0?"w-100 mb3 tc br4":f;return s("form[enctype=multipart/form-data][novalidate=novalidate]",{onsubmit:function(t){t.preventDefault();u(o==="email"?n.trim(n.toLower(e.resetId())):n.trim(n.replace(n.toLower(e.resetId()),/[^0-9]/g,"").slice(-9)),e.resetId())}},[s(a.BaseInput,{field:{id:"resetpassword",label:o==="email"?"EMAIL":"MOBILE",type:o==="email"?"email":"tel",placeholder:o==="email"?"Enter e-mail address":"Enter mobile number",instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.resetId}),s(a.Button,{label:d,type:"submit",icon:p,classes:h+" "+b.bgPrimary.primary.class,disabled:o==="email"?!this.emailValid():!this.mobileValid()}),s("p","NOTE: you must use the same "+(o==="email"?"e-mail address":"mobile number")+" you used when taking out this policy.")])};return t}();var O=function(){function t(){this.toggleHelp=false}t.prototype.view=function(t){var e=this;var r=t.attrs,a=r.header,i=r.application,o=r.notification,u=r.onReset;if(!i.auth){return s("span","No authentication set")}var l=i.auth,d=l.onePanel,c=l.title,p=l.lines,f=l.postLines,h=f===void 0?[]:f,m=l.helpLinkText,g=m===void 0?"Trouble logging in?":m,v=l.helpTitle,w=l.helpLines,y=l.postHelpLines,B=y===void 0?[]:y,C=l.reset,P=i.footer;return s(I,{header:a,application:i,notification:o,logout:false},s(F,{content:[d?s(".flex.flex-column.items-center.ph2-l",s(".w-90.w-60-l",this.toggleHelp?[s("h2.fw5.mt2.tc"+b.branding,v),n.map(w,(function(t){return s("p.f5.tc",s.trust(t))})),s(".pa4.shadow-4"+b.bgPanel.brdPanel,[C?s(A,{auth:i.auth,reset:C,onReset:function(t,n){e.toggleHelp=false;u(t,n)}}):null,s("span.db.w-100.mt4.mb2.f6.tc.underline.pointer"+b.branding,{onclick:function(){return e.toggleHelp=false}},"Return")]),n.map(B,(function(t){return s("p.f5.tc",s.trust(t))}))]:[s("h2.fw5.mt2.tc"+b.branding,c),n.map(p,(function(t){return s("p.f5.tc",s.trust(t))})),s(".pa4.shadow-4"+b.bgPanel.brdPanel,[i.auth.type==="dobPostcode"?s(D,{auth:i.auth}):s(R,{auth:i.auth}),C?s("span.db.w-100.mt4.mb2.f6.tc.underline.pointer"+b.branding,{onclick:function(){return e.toggleHelp=true}},g):null]),n.map(h,(function(t){return s("p.f5.tc",s.trust(t))}))])):s(H,{left:[s("h2.fw5.mt2"+b.branding,c),n.map(p,(function(t){return s("p.f5",s.trust(t))})),i.auth.type==="dobPostcode"?s(D,{auth:i.auth}):s(R,{auth:i.auth}),n.map(h,(function(t){return s("p.f5",s.trust(t))}))],right:[s("h2.fw5.mt2"+b.branding,v),n.map(w,(function(t){return s("p.f5",s.trust(t))})),C?s(A,{auth:i.auth,reset:C,onReset:u}):null,n.map(B,(function(t){return s("p.f5",s.trust(t))}))]}),P?x(P):null]}))};return t}();function S(t,n){return function(r,a){if(n&&n.reset){var i=n.reset,o=i.username,s=i.endpoint;var u=new FormData;u.append("username",o);u.append("password",r);return e.request({method:"POST",url:s,body:u}).then((function(){return t({message:"We have sent your new PIN to "+a,duration:2e3})})).catch((function(e){return h(e,t)}))}else{return Promise.resolve(h(new Error("No authentication configuration"),t))}}}function W(t,e,n){m(t,e,n).then((function(t){var e=t.application,n=t.brand,r=t.notification;s.mount(document.getElementById("page"),{view:function(){return s(O,{application:e,header:n.header(),notification:r,onReset:S(r,e.auth)})}})}))}t.buildComponent=x;t.buildComponentList=B;t.login=W;t.registerComponent=y;t.resetAuth=S;Object.defineProperty(t,"__esModule",{value:true})}));
