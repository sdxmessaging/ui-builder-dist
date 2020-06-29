(function(t,e){typeof exports==="object"&&typeof module!=="undefined"?e(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js"),require("js-sha256")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js","js-sha256"],e):(t=t||self,e(t.uiBuilder={},t.m,t.m.stream,t._,t.uiWidgets,t.Pusher,t.sha256))})(this,(function(t,e,r,n,o,a,i){"use strict";var s="default"in e?e["default"]:e;r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r["default"]:r;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n["default"]:n;a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a["default"]:a;var d={bind:function(){return null}};function l(t){var e=t.mock,r=t.apiKey,n=t.cloudChannel,o=t.companyChannel,i=t.userChannel,s=t.applicationChannel,l=t.applicationUserChannel;if(e){return{pusher:{connection:{bind:function(t,e){return setImmediate(e)},unbind:function(){return null}}},cloudChannel:d,companyChannel:d,userChannel:d,applicationChannel:d,applicationUserChannel:d}}var u=new a(r,{cluster:"eu",encrypted:true});return{pusher:u,cloudChannel:u.subscribe(n),companyChannel:u.subscribe(o),userChannel:u.subscribe(i),applicationChannel:u.subscribe(s),applicationUserChannel:u.subscribe(l)}}var u={};function c(t){n.assign(u,{company:"",copyright:"",tel:"",email:"",address:"",poweredBy:undefined,header:[{type:0},{type:7}],footer:[{type:9},{type:0},{type:8},{type:0},{type:10},{type:6}]},t)}var p={button:"",gridFlex:"",cardFlex:"",cardHeader:"",cardSubheading:"",cardIcon:"",cardCounter:""};function h(t){var e=t.layoutBackground,r=e===void 0?"transparent":e,a=t.layoutLMaxWidth,i=a===void 0?"64rem":a,s=t.layoutLShadow,d=s===void 0?"unset":s,l=t.bodyText,u=l===void 0?"#333333":l,c=t.bodyFontSize,h=c===void 0?"1.25rem":c,f=t.bodyFontWeight,m=f===void 0?"200":f,v=t.background,g=v===void 0?"DodgerBlue":v,y=t.highlight,w=y===void 0?"unset":y,x=t.text,B=x===void 0?"DodgerBlue":x,P=t.icon,k=P===void 0?B:P,C=t.altText,I=C===void 0?"white":C,F=t.logoMargin,H=F===void 0?"0.5rem":F,T=t.logoBackground,S=T===void 0?"transparent":T,L=t.logoBorderRadius,V=L===void 0?".25rem":L,A=t.headerHeight,O=A===void 0?"3rem":A,W=t.headerBackground,R=W===void 0?g:W,j=t.headerBorderBottom,D=j===void 0?"none":j,E=t.headerBorderRadius,_=E===void 0?"0px":E,U=t.headerText,z=U===void 0?I:U,q=t.subheadingText,N=q===void 0?"rgba(0,0,0,.5)":q,X=t.cardStyle,M=X===void 0?{}:X,Y=t.cardHeight,K=Y===void 0?"12em":Y,$=t.cardWidth,Z=$===void 0?"12em":$,J=t.cardHeightNs,G=J===void 0?K:J,Q=t.cardWidthNs,tt=Q===void 0?Z:Q,et=t.cardText,rt=et===void 0?I:et,nt=t.cardBackground,ot=nt===void 0?g:nt,at=t.cardBorderRadius,it=at===void 0?"0px":at,st=t.cardShadow,dt=st===void 0?"unset":st,lt=t.cardHeaderStyle,ut=lt===void 0?{}:lt,ct=t.cardHeaderFontSize,pt=ct===void 0?"1.25rem":ct,bt=t.cardSubheadingStyle,ht=bt===void 0?{}:bt,ft=t.cardSubheadingFontSize,mt=ft===void 0?"1.25rem":ft,vt=t.cardIconStyle,gt=vt===void 0?{}:vt,yt=t.panelBackground,wt=yt===void 0?"transparent":yt,xt=t.panelBorderRadius,Bt=xt===void 0?".25rem":xt,Pt=t.footerHeight,kt=Pt===void 0?"3rem":Pt,Ct=t.footerBackground,It=Ct===void 0?"#F4F4F4":Ct,Ft=t.footerText,Ht=Ft===void 0?"#999":Ft,Tt=t.lineHeight,St=Tt===void 0?"1.9em":Tt,Lt=t.buttonBackground,Vt=Lt===void 0?g:Lt,At=t.buttonText,Ot=At===void 0?I:At,Wt=t.buttonPadding,Rt=Wt===void 0?".5rem":Wt,jt=t.buttonBorder,Dt=jt===void 0?"none":jt,Et=t.buttonBorderRadius,_t=Et===void 0?".25rem":Et,Ut=t.altButtonBackground,zt=Ut===void 0?Vt:Ut,qt=t.altButtonText,Nt=qt===void 0?Ot:qt,Xt=t.altButtonPadding,Mt=Xt===void 0?Rt:Xt,Yt=t.altButtonBorder,Kt=Yt===void 0?Dt:Yt,$t=t.altButtonBorderRadius,Zt=$t===void 0?_t:$t,Jt=t.tableHeaderBackground,Gt=Jt===void 0?g:Jt,Qt=t.tableHeaderText,te=Qt===void 0?I:Qt,ee=t.primaryBackground,re=ee===void 0?Vt:ee,ne=t.primaryText,oe=ne===void 0?Ot:ne,ae=t.bgInfo,ie=ae===void 0?"#357EDD":ae,se=t.txtInfo,de=se===void 0?"#FFFFFF":se,le=t.bgWarn,ue=le===void 0?"#FFD700":le,ce=t.txtWarn,pe=ce===void 0?"#111111":ce,be=t.bgError,he=be===void 0?"#E7040F":be,fe=t.txtError,me=fe===void 0?"#FFFFFF":fe,ve=t.inpBrdClass,ge=ve===void 0?"bn":ve,ye=t.button,we=ye===void 0?"shadow-4":ye,xe=t.gridFlex,Be=xe===void 0?"flex flex-wrap justify-center":xe,Pe=t.cardFlex,ke=Pe===void 0?"flex flex-column items-center":Pe,Ce=t.cardHeader,Ie=Ce===void 0?"flex-auto ma2 tc":Ce,Fe=t.cardSubheading,He=Fe===void 0?"ma2 pv1 ph2":Fe,Te=t.cardIcon,Se=Te===void 0?"fal fa-fw fa-4x ma2":Te,Le=t.cardCounter,Ve=Le===void 0?"nt1 nr1 top-0 right-0":Le;b.helper({shrink0:b.flexShrink("0"),sticky:b({position:"sticky"}),flexImg:b({"object-fit":"contain"}).minHeight("0"),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:g}),branding:b.color(B),icon:b.color(k),brandingAlt:b.color(I),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:r}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":i,"box-shadow":d})),body:b.c(u),bodyFSize:b.fs(h),bodyFWeight:b({"font-weight":m}),marginLogo:b.m(H),bgLogo:b({background:S}),brdLogo:b.br(V),headerHeight:b.h(O),bgHeader:b({background:R}),bbHeader:b({"border-bottom":D}),brdHeader:b.br(_),header:b.c(z),subheading:b.c(N),cardStyle:b(M),cardSize:b.h(K).w(Z).$media("screen and (min-width:30em)",b.h(G).w(tt)),card:b.c(rt),bgCard:b({background:ot}),brdCard:b.br(it),shadowCard:b({"box-shadow":dt}),cardHead:b(ut).fs(pt),cardSub:b(ht).fs(mt),cardIcon:b(gt),bgPanel:b({background:wt}),brdPanel:b.br(Bt),footerHeight:b.h(kt),bgFooter:b({background:It}),footer:b.c(Ht),inputHeight:b.h(St),inputFocus:b({":focus":{"border-color":w}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:Gt}),thead:b.c(te),bgButton:b({background:Vt}),button:b.c(Ot),padButton:b.p(Rt),brdButton:b({border:Dt}).br(_t),bgButtonAlt:b({background:zt}),buttonAlt:b.c(Nt),padButtonAlt:b.p(Mt),brdButtonAlt:b({border:Kt}).br(Zt),bgPrimary:b({background:re}),primary:b.c(oe),bgInfo:b({background:ie}),info:b.c(de),bgWarn:b({background:ue}),warn:b.c(pe),bgError:b({background:he}),error:b.c(me)});n.assign(p,{button:we,gridFlex:Be,cardFlex:ke,cardHeader:Ie,cardSubheading:He,cardIcon:Se,cardCounter:Ve});o.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:ge+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:p.button+" "+b.brdButton.class});o.updateButtonContext({alt:b.bgButtonAlt.buttonAlt.padButtonAlt.brdButtonAlt.ripple.class,info:b({border:"1px solid "+de}).br(_t).padButton.info.bgInfo.ripple.class,warn:b({border:"1px solid "+pe}).br(_t).padButton.warn.bgWarn.ripple.class,error:b({border:"1px solid "+me}).br(_t).padButton.error.bgError.ripple.class})}var f=function(){function t(t){var e=t.brandingPath,n=t.themePath;this.branding=r({});this.theme=r({});this.brandingPath=e;this.branding.map(c);this.themePath=n;this.theme.map(h)}t.prototype.load=function(){return Promise.all([this.loadBranding(),this.loadTheme()])};t.prototype.loadBranding=function(){return this.brandingPath?e.request(this.brandingPath).then(this.branding).catch(n.noop):Promise.resolve()};t.prototype.loadTheme=function(){return this.themePath?e.request(this.themePath).then(this.theme).catch(n.noop):Promise.resolve()};return t}();function m(t){if(n.isString(t)){return e.request(t)}else{return Promise.resolve(t)}}function v(t,r){r({message:String(t.message),context:"error"});e.redraw()}function g(t,r){window.history.replaceState(null,"",window.location.href);var a;var i;var s;return m(t).then((function(t){a=t;o.updateConfig({signFont:"Caveat"});if(a.uiWidgets){o.updateConfig(a.uiWidgets)}i=new f(a);s=l(a.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(t){var e=t.url;return window.location.href=e}));s.cloudChannel.bind("reloadbranding",(function(){return i.load().then(e.redraw)}));s.companyChannel.bind("reloadbranding",(function(){return i.load().then(e.redraw)}));s.applicationChannel.bind("reloadbranding",(function(){return i.load().then(e.redraw)}));s.applicationUserChannel.bind("notification",(function(t){r(t);e.redraw()}));return Promise.all([i.load().catch(n.noop),new Promise((function(t){s.pusher.connection.bind("connected",(function(){s.pusher.connection.unbind("connected");t()}))}))])})).catch((function(t){return v(t,r)})).then((function(){return{application:a,pusher:s}}))}function y(t){if(typeof t==="string"){return s("p",t)}else if(t.hasOwnProperty("selector")){var e=t;return s(e.selector,e.content)}else{var r=t;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:r.href},r.text)}}var w=function(){function t(){}t.prototype.view=function(t){var e=t.attrs.data;return s(".ph4",n.map(e,(function(t){return y(t)})))};return t}();var x={};function B(t,e){if(t in x){throw new Error("Component "+t+" is already registered")}else{x[t]=e}}B("basic",w);function P(t){var e=t.type,r=t.data;if(e in x){return s(x[e],{type:e,data:r})}else{return s("span","Unknown component type: "+e)}}function k(t){return n.map(t,(function(t){return P(t)}))}function C(t){if(t===void 0){t="info"}switch(t){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var I=function(){function t(){this.active=false}t.prototype.oninit=function(t){var e=this;var n=t.attrs.notification;n.map((function(t){var n=t.message,o=t.duration,a=o===void 0?3e3:o;if(n){e.active=true;setTimeout((function(){return e.dismiss()}),a)}return r.SKIP}))};t.prototype.view=function(t){var e=this;var r=t.attrs.notification;var n=r(),o=n.message,a=n.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return e.dismiss()},class:C(a),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},o)};t.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return t}();var F=function(){function t(){}t.prototype.view=function(t){var e=t.attrs;if(e.hasOwnProperty("type")){return P(e)}else if(e.hasOwnProperty("icon")){var r=e;return s(".flex.items-center.mh2",{class:r.classes},s("i.fal.fa-2x.mr2",{class:r.icon}),r.title)}else if(e.hasOwnProperty("src")){var n=e;return s(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:n.classes},s("img.img",{src:n.src,class:n.imageClass,height:n.height,width:n.width}),n.title)}else{var o=e;return s(".mh2",{class:o.classes},o.title||"")}};return t}();var H=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,r=e.auth,n=r.logoutPath,o=r.logoutLabel,a=r.logoutIcon,i=a===void 0?"fa-sign-out-alt":a,d=e.classes;return s("a.link.ma2",{href:n,class:d},[o?s("span.mr2",o):null,s("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:i})])};return t}();function T(t){return(t*100).toFixed(0)+"%"}var S=function(){function t(){}t.prototype.view=function(t){var e=this;var r=t.attrs,o=r.display,a=r.application,i=a.version,d=a.auth,l=r.saving,c=r.progress,p=r.logout;var h=o==="header"?u.header:u.footer;var f=o==="header"?b.header.class:b.footer.class;var m=[];if(n.isObject(h)){m=[{type:12,logo:h.lhs},{type:0},{type:12,logo:h.rhs},{type:7}]}if(n.isArray(h)){m=h}return n.map(m,(function(t){var r=t.classes||"";switch(t.type){case 0:return s(".center");case 1:return s("span","|");case 2:return t.src?e.image(t.src,r,t.height,t.width):null;case 3:return s("span.mh2",{class:r+" "+f},t.text);case 4:return s("a.link.mh2",{class:r+" "+f,href:t.href},t.text);case 5:return d&&p?e.logout(d,"flex "+f):null;case 6:return d&&p?e.logout(d,"flex dn-l "+f):null;case 7:return d&&p?e.logout(d,"dn flex-l "+f):null;case 8:return e.copyright(i);case 9:return e.poweredBy();case 10:return e.progressIndicator(l,c);case 11:return t.custom?P(t.custom):null;case 12:return t.logo?s(F,t.logo):null;default:return null}}))};t.prototype.image=function(t,e,r,n){return s("img.img.ma2",{src:t,class:e,height:r,width:n})};t.prototype.poweredBy=function(){var t=u.poweredBy,e=t===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:t;return s("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:e.href},s("img.img.h-100.o-80",{src:e.src,title:e.title}))};t.prototype.copyright=function(t){var e=u.copyright,r=e===void 0?"":e;return s("span.ma2.f7",{title:t},r?[s.trust("&copy; "),r]:null)};t.prototype.progressIndicator=function(t,e){var r=t?t():false;var n=r&&e?e():0;return s("span.ma2.f3",{class:n?"":"dn"},[T(n),s("i.ma2.f3.fal.fa-spinner",{class:r?"fa-spin":"dn"})])};t.prototype.logout=function(t,e){if(e===void 0){e=""}return s(H,{auth:t,classes:"items-center "+e+" "+b.footer.class})};return t}();var L=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,r=e.application,n=e.notification,o=e.saving,a=e.progress,i=e.fullScreen,d=e.responsiveHeader,l=e.responsiveFooter,u=e.logout,c=u===void 0?true:u,p=e.header,h=e.footer,f=t.children;return[n?s(I,{notification:n}):null,s("nav.items-center.self-center.w-100"+b.header.headerHeight.bgHeader.bbHeader.brdHeader.shrink0,{class:(d?"dn flex-l":"flex")+" "+(i?"":b.layoutL.class)},p?p:s(S,{display:"header",application:r,saving:o,progress:a,logout:c})),s("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:i?undefined:b.layoutL.class},f),s("nav.w-100.items-center"+b.footerHeight.bgFooter.footer,{class:l?"dn flex-l":"flex"},h?h:s(S,{display:"footer",application:r,saving:o,progress:a,logout:c}))]};return t}();var V=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,r=e.header,n=e.headerClass,o=e.subheader,a=e.subheaderClass,i=e.content,d=e.wrapContent,l=d===void 0?true:d,u=e.footer;return[r?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:n},r):null,o?s("div"+b.shrink0,{class:a},o):null,l?s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,i):i,u]};return t}();var A=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,r=e.left,n=e.right;return s(".flex.flex-column.flex-row-l.items-stretch.ph2-l",[s(".w-100-l.ma2.pa4.shadow-4"+b.bgPanel.brdPanel,r),s(".w-100-l.ma2.pa4.shadow-4"+b.bgPanel.brdPanel,n)])};return t}();var O=/^ {0,}[0-9]{2}\/[0-9]{2}\/[0-9]{4} {0,}$/;var W=function(){function t(){this.dobText=r("");this.dobXform=this.dobText.map((function(t){return n.replace(t,/[^\d/]/g,"")}));this.dobValid=this.dobXform.map((function(t){return O.test(t)}))}t.prototype.oninit=function(t){var e=t.attrs,r=e.value,n=e.valid;this.dobXform.map(r);this.dobValid.map(n)};t.prototype.view=function(t){var e=t.attrs,r=e.id,n=e.label,a=e.placeholder;return s(o.BaseInput,{field:{id:r,label:n,placeholder:a,pattern:O.source,autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.dobText,xform:this.dobXform})};return t}();var R=/^ {0,}(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2})) {0,}$/;var j=function(){function t(){this.postcodeText=r("");this.postcodeXform=this.postcodeText.map(n.toUpper);this.postcodeClean=this.postcodeXform.map((function(t){return n.replace(t,/\s/g,"")}));this.postcodeValid=this.postcodeClean.map((function(t){return R.test(t)}))}t.prototype.oninit=function(t){var e=t.attrs,r=e.value,n=e.valid;this.postcodeClean.map(r);this.postcodeValid.map(n)};t.prototype.view=function(t){var e=t.attrs,r=e.id,n=e.label,a=e.placeholder;return s(o.BaseInput,{field:{id:r,label:n,placeholder:a,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.postcodeText,xform:this.postcodeXform})};return t}();var D=function(){function t(){this.passwordText=r("");this.passwordValid=this.passwordText.map((function(t){return t.length>0}))}t.prototype.oninit=function(t){var e=t.attrs,r=e.value,n=e.valid;this.passwordText.map(r);this.passwordValid.map(n)};t.prototype.view=function(t){var e=t.attrs,r=e.id,n=e.label,a=e.placeholder,i=e.autocomplete;return s(o.BaseInput,{field:{id:r,label:n,type:"password",placeholder:a,autocomplete:i,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.passwordText})};return t}();var E=this&&this.__extends||function(){var t=function(e,r){t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)if(e.hasOwnProperty(r))t[r]=e[r]};return t(e,r)};return function(e,r){t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}();var _=function(t){E(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}e.prototype.view=function(t){var e=t.attrs,r=e.id,n=e.label,a=e.placeholder,i=e.autocomplete;return s(o.BaseInput,{field:{id:r,label:n,type:"password",placeholder:a,autocomplete:i,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20",inputmode:"numeric",pattern:"[0-9]+"},value:this.passwordText})};return e}(D);var U=function(){function t(){this.dob=r("");this.dobValid=r();this.postcode=r("");this.postcodeValid=r();this.passwordText=r.lift((function(t,e){return t+"_"+e}),this.dob,this.postcode);this.formValid=r.lift((function(t,e){return t&&e}),this.dobValid,this.postcodeValid)}t.prototype.view=function(t){var e=t.attrs.auth;var n=e.endpoint,a=e.username,i=e.pinInput,d=e.dobLabel,l=d===void 0?"DOB":d,u=e.dobPlaceholder,c=u===void 0?"DOB e.g. 23/02/1973":u,p=e.postcodeLabel,h=p===void 0?"Postcode":p,f=e.postcodePlaceholder,m=f===void 0?"Postcode e.g. AB12 3CD":f,v=e.loginBtnText,g=v===void 0?"Login to Secure Document Vault":v,y=e.loginBtnIcon,w=y===void 0?"fa-2x fa-sign-in-alt db center mb2":y,x=e.loginBtnClass,B=x===void 0?"w-100 mb3 tc br4":x;return s("form[enctype=multipart/form-data][method=post][accept=utf-8]",{action:n},[s(o.BaseInput,{field:{id:"username",type:"hidden",readonly:true},value:r(a)}),s(o.BaseInput,{field:{id:"password",type:"hidden",autocomplete:"off",readonly:true},value:this.passwordText}),s(W,{id:"dob",label:l,placeholder:c,value:this.dob,valid:this.dobValid}),i?s(_,{id:"pin",label:h,placeholder:m,value:this.postcode,valid:this.postcodeValid}):s(j,{id:"postcode",label:h,placeholder:m,value:this.postcode,valid:this.postcodeValid}),s(o.Button,{label:g,type:"submit",icon:w,classes:B+" "+b.bgPrimary.primary.class,disabled:!this.formValid()})])};return t}();var z=function(){function t(){this.password=r("");this.passwordValid=r()}t.prototype.view=function(t){var e=t.attrs.auth;var n=e.endpoint,a=e.username,i=e.pinInput,d=e.passwordLabel,l=d===void 0?"PASSWORD":d,u=e.passwordPlaceholder,c=u===void 0?"PASSWORD":u,p=e.loginBtnText,h=p===void 0?"Login to Secure Document Vault":p,f=e.loginBtnIcon,m=f===void 0?"fa-2x fa-sign-in-alt db center mb2":f,v=e.loginBtnClass,g=v===void 0?"w-100 mb3 tc br4":v;return s("form[enctype=multipart/form-data][method=post][accept=utf-8]",{action:n},[s(o.BaseInput,{field:{id:"username",type:"hidden",readonly:true},value:r(a)}),i?s(_,{id:"password",label:l,placeholder:c,autocomplete:"current-password",value:this.password,valid:this.passwordValid}):s(D,{id:"password",label:l,placeholder:c,autocomplete:"current-password",value:this.password,valid:this.passwordValid}),s(o.Button,{label:h,type:"submit",icon:m,classes:g+" "+b.bgPrimary.primary.class,disabled:!this.passwordValid()})])};return t}();var q=function(){function t(){this.resetId=r("");this.mobileValid=r();this.emailValid=r()}t.prototype.oninit=function(t){var e=t.attrs.reset.hash;this.mobileValid=this.resetId.map((function(t){return e===i.sha256(n.replace(n.toLower(t),/[^0-9]/g,"").slice(-9))}));this.emailValid=this.resetId.map((function(t){return e===i.sha256(n.trim(n.toLower(t)))}))};t.prototype.view=function(t){var e=this;var r=t.attrs,a=r.auth,i=r.reset,d=r.onReset;var l=i.type,u=i.inputLabel,c=i.inputPlaceholder;var p=a.helpBtnText,h=p===void 0?"SEND PIN":p,f=a.helpBtnIcon,m=f===void 0?"fa-2x "+(l==="email"?"fa-envelope":"fa-mobile-android")+" db center mb2":f,v=a.loginBtnClass,g=v===void 0?"w-100 mb3 tc br4":v;return s("form[enctype=multipart/form-data]",{onsubmit:function(t){t.preventDefault();d(l==="email"?n.trim(n.toLower(e.resetId())):n.trim(n.replace(n.toLower(e.resetId()),/[^0-9]/g,"").slice(-9)),e.resetId())}},[s(o.BaseInput,{field:n.extend({},{id:"resetpassword",instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},l==="email"?{label:u?u:"EMAIL",type:"email",placeholder:c?c:"Enter e-mail address",inputmode:"email"}:{label:u?u:"MOBILE",type:"tel",placeholder:c?c:"Enter mobile number",inputmode:"numeric",pattern:"[0-9]+"}),value:this.resetId}),s(o.Button,{label:h,type:"submit",icon:m,classes:g+" "+b.bgPrimary.primary.class,disabled:l==="email"?!this.emailValid():!this.mobileValid()})])};return t}();var N=function(){function t(){this.toggleHelp=false}t.prototype.view=function(t){var e=this;var r=t.attrs,o=r.application,a=r.notification,i=r.onReset;if(!o.auth){return s("span","No authentication set")}var d=o.auth,l=d.onePanel,u=d.title,c=d.lines,p=d.postLines,h=p===void 0?[]:p,f=d.helpLinkText,m=f===void 0?"Trouble logging in?":f,v=d.helpTitle,g=d.helpLines,y=d.postHelpLines,w=y===void 0?[]:y,x=d.returnLinkText,B=x===void 0?"Return":x,k=d.reset,C=o.footer;return s(L,{application:o,notification:a,logout:false},s(V,{content:[l?s(".flex.flex-column.items-center.ph2",s(".w-100.measure-wide",this.toggleHelp?[s("h2.fw5.mt2.tc"+b.branding,v),n.map(g,(function(t){return s("p.f5.tc",s.trust(t))})),s(".pa4.shadow-4"+b.bgPanel.brdPanel,[k?s(q,{auth:o.auth,reset:k,onReset:function(t,r){e.toggleHelp=false;i(t,r)}}):null,s("span.db.w-100.mt4.mb2.f6.tc.pointer"+b.branding,{onclick:function(){return e.toggleHelp=false}},B)]),n.map(w,(function(t){return s("p.f5.tc",s.trust(t))}))]:[s("h2.fw5.mt2.tc"+b.branding,u),n.map(c,(function(t){return s("p.f5.tc",s.trust(t))})),s(".pa4.shadow-4"+b.bgPanel.brdPanel,[o.auth.type==="dobPostcode"?s(U,{auth:o.auth}):s(z,{auth:o.auth}),k?s("span.db.w-100.mt4.mb2.f6.tc.pointer"+b.branding,{onclick:function(){return e.toggleHelp=true}},m):null]),n.map(h,(function(t){return s("p.f5.tc",s.trust(t))}))])):s(A,{left:[s("h2.fw5.mt2"+b.branding,u),n.map(c,(function(t){return s("p.f5",s.trust(t))})),o.auth.type==="dobPostcode"?s(U,{auth:o.auth}):s(z,{auth:o.auth}),n.map(h,(function(t){return s("p.f5",s.trust(t))}))],right:[s("h2.fw5.mt2"+b.branding,v),n.map(g,(function(t){return s("p.f5",s.trust(t))})),k?s(q,{auth:o.auth,reset:k,onReset:i}):null,n.map(w,(function(t){return s("p.f5",s.trust(t))}))]}),C?P(C):null]}))};return t}();function X(t,r){return function(n,o){if(r&&r.reset){var a=r.reset,i=a.username,s=a.endpoint;var d=new FormData;d.append("username",i);d.append("password",n);return e.request({method:"POST",url:s,body:d}).then((function(){return t({message:"We have sent your new PIN to "+o,duration:2e3})})).catch((function(e){return v(e,t)}))}else{return Promise.resolve(v(new Error("No authentication configuration"),t))}}}function M(t,e){var n=r(e);return g(t,n).then((function(t){var e=t.application,r=t.pusher;s.mount(document.getElementById("page"),{view:function(){return s(N,{application:e,notification:n,onReset:X(n,e.auth)})}});return{application:e,pusher:r}}))}t.buildComponent=P;t.buildComponentList=k;t.login=M;t.registerComponent=B;t.resetAuth=X;Object.defineProperty(t,"__esModule",{value:true})}));
