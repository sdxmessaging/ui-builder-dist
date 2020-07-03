(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril"),require("mithril/stream"),require("lodash"),require("@sdxmessaging/ui-widgets"),require("pusher-js"),require("js-sha256")):typeof define==="function"&&define.amd?define(["exports","mithril","mithril/stream","lodash","@sdxmessaging/ui-widgets","pusher-js","js-sha256"],t):(e=e||self,t(e.uiBuilder={},e.m,e.m.stream,e._,e.uiWidgets,e.Pusher,e.sha256))})(this,(function(e,t,r,n,o,a,i){"use strict";var s="default"in t?t["default"]:t;r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r["default"]:r;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n["default"]:n;a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a["default"]:a;var l={bind:function(){return null}};function d(e){var t=e.mock,r=e.apiKey,n=e.cloudChannel,o=e.companyChannel,i=e.userChannel,s=e.applicationChannel,d=e.applicationUserChannel;if(t){return{pusher:{connection:{bind:function(e,t){return setImmediate(t)},unbind:function(){return null}}},cloudChannel:l,companyChannel:l,userChannel:l,applicationChannel:l,applicationUserChannel:l}}var u=new a(r,{cluster:"eu",encrypted:true});return{pusher:u,cloudChannel:u.subscribe(n),companyChannel:u.subscribe(o),userChannel:u.subscribe(i),applicationChannel:u.subscribe(s),applicationUserChannel:u.subscribe(d)}}var u={};function c(e){n.assign(u,{company:"",copyright:"",tel:"",email:"",address:"",poweredBy:undefined,header:[{type:0},{type:7}],footer:[{type:9},{type:0},{type:8},{type:0},{type:10},{type:6}]},e)}var p={button:"",gridFlex:"",cardFlex:"",cardHeader:"",cardSubheading:"",cardIcon:"",cardImage:"",cardCounter:"",loginForm:""};function h(e){var t=e.layoutBackground,r=t===void 0?"transparent":t,a=e.layoutLMaxWidth,i=a===void 0?"64rem":a,s=e.layoutLShadow,l=s===void 0?"unset":s,d=e.bodyText,u=d===void 0?"#333333":d,c=e.bodyFontSize,h=c===void 0?"1.25rem":c,f=e.bodyFontWeight,g=f===void 0?"200":f,m=e.background,v=m===void 0?"DodgerBlue":m,y=e.highlight,w=y===void 0?"unset":y,x=e.text,B=x===void 0?"DodgerBlue":x,k=e.icon,P=k===void 0?B:k,C=e.altText,I=C===void 0?"white":C,T=e.logoMargin,F=T===void 0?"0.5rem":T,H=e.logoBackground,S=H===void 0?"transparent":H,L=e.logoBorderRadius,V=L===void 0?".25rem":L,A=e.headerHeight,O=A===void 0?"3rem":A,W=e.headerBackground,R=W===void 0?v:W,D=e.headerBorderBottom,E=D===void 0?"none":D,j=e.headerBorderRadius,_=j===void 0?"0px":j,U=e.headerText,z=U===void 0?I:U,q=e.subheadingText,N=q===void 0?"rgba(0,0,0,.5)":q,X=e.cardStyle,M=X===void 0?{}:X,Y=e.cardHeight,K=Y===void 0?"12em":Y,$=e.cardWidth,Z=$===void 0?"12em":$,J=e.cardHeightNs,G=J===void 0?K:J,Q=e.cardWidthNs,ee=Q===void 0?Z:Q,te=e.cardText,re=te===void 0?I:te,ne=e.cardBackground,oe=ne===void 0?v:ne,ae=e.cardBorderRadius,ie=ae===void 0?"0px":ae,se=e.cardShadow,le=se===void 0?"unset":se,de=e.cardHeaderStyle,ue=de===void 0?{}:de,ce=e.cardHeaderFontSize,pe=ce===void 0?"1.25rem":ce,be=e.cardSubheadingStyle,he=be===void 0?{}:be,fe=e.cardSubheadingFontSize,ge=fe===void 0?"1.25rem":fe,me=e.cardIconStyle,ve=me===void 0?{}:me,ye=e.cardImageStyle,we=ye===void 0?{}:ye,xe=e.panelBackground,Be=xe===void 0?"transparent":xe,ke=e.panelBorderRadius,Pe=ke===void 0?".25rem":ke,Ce=e.loginStyle,Ie=Ce===void 0?{}:Ce,Te=e.footerHeight,Fe=Te===void 0?"3rem":Te,He=e.footerBackground,Se=He===void 0?"#F4F4F4":He,Le=e.footerText,Ve=Le===void 0?"#999":Le,Ae=e.lineHeight,Oe=Ae===void 0?"1.9em":Ae,We=e.buttonBackground,Re=We===void 0?v:We,De=e.buttonText,Ee=De===void 0?I:De,je=e.buttonPadding,_e=je===void 0?".5rem":je,Ue=e.buttonBorder,ze=Ue===void 0?"none":Ue,qe=e.buttonBorderRadius,Ne=qe===void 0?".25rem":qe,Xe=e.altButtonBackground,Me=Xe===void 0?Re:Xe,Ye=e.altButtonText,Ke=Ye===void 0?Ee:Ye,$e=e.altButtonPadding,Ze=$e===void 0?_e:$e,Je=e.altButtonBorder,Ge=Je===void 0?ze:Je,Qe=e.altButtonBorderRadius,et=Qe===void 0?Ne:Qe,tt=e.tableHeaderBackground,rt=tt===void 0?v:tt,nt=e.tableHeaderText,ot=nt===void 0?I:nt,at=e.primaryBackground,it=at===void 0?Re:at,st=e.primaryText,lt=st===void 0?Ee:st,dt=e.bgInfo,ut=dt===void 0?"#357EDD":dt,ct=e.txtInfo,pt=ct===void 0?"#FFFFFF":ct,bt=e.bgWarn,ht=bt===void 0?"#FFD700":bt,ft=e.txtWarn,gt=ft===void 0?"#111111":ft,mt=e.bgError,vt=mt===void 0?"#E7040F":mt,yt=e.txtError,wt=yt===void 0?"#FFFFFF":yt,xt=e.inpBrdClass,Bt=xt===void 0?"bn":xt,kt=e.button,Pt=kt===void 0?"shadow-4":kt,Ct=e.gridFlex,It=Ct===void 0?"flex flex-wrap justify-center":Ct,Tt=e.cardFlex,Ft=Tt===void 0?"flex flex-column items-center":Tt,Ht=e.cardHeader,St=Ht===void 0?"flex-auto ma2 tc":Ht,Lt=e.cardSubheading,Vt=Lt===void 0?"ma2 pv1 ph2":Lt,At=e.cardIcon,Ot=At===void 0?"fal fa-fw fa-4x ma2":At,Wt=e.cardImage,Rt=Wt===void 0?"img ma2":Wt,Dt=e.cardCounter,Et=Dt===void 0?"nt1 nr1 top-0 right-0":Dt,jt=e.loginForm,_t=jt===void 0?"items-center measure-wide center":jt;b.helper({shrink0:b.flexShrink("0"),sticky:b({position:"sticky"}),safariBug:b("-webkit-transform: translate3d(0, 0, 0)"),docOverlay:b.$nest("input",b({border:"none"})),bgBranding:b({background:v}),branding:b.color(B),icon:b.color(P),brandingAlt:b.color(I),ripple:b({position:"relative",overflow:"hidden",transform:"translate3d(0, 0, 0)",":after":{content:"",display:"block",position:"absolute",width:"100%",height:"100%",top:0,left:0,"pointer-events":"none","background-image":"radial-gradient(circle, #fff 10%, transparent 10.01%)","background-repeat":"no-repeat","background-position":"50%",transform:"scale(10, 10)",opacity:"0",transition:"transform .5s, opacity 1s"},":active":{":after":{transform:"scale(0, 0)",opacity:.3,transition:"0s"}}}),bgLayout:b({background:r}),layoutL:b.$media("screen and (min-width:60em)",b({"max-width":i,"box-shadow":l})),body:b.c(u),bodyFSize:b.fs(h),bodyFWeight:b({"font-weight":g}),marginLogo:b.m(F),bgLogo:b({background:S}),brdLogo:b.br(V),headerHeight:b.h(O),bgHeader:b({background:R}),bbHeader:b({"border-bottom":E}),brdHeader:b.br(_),header:b.c(z),subheading:b.c(N),cardStyle:b(M),cardSize:b.h(K).w(Z).$media("screen and (min-width:30em)",b.h(G).w(ee)),card:b.c(re),bgCard:b({background:oe}),brdCard:b.br(ie),shadowCard:b({"box-shadow":le}),cardHead:b(ue).fs(pe),cardSub:b(he).fs(ge),cardIcon:b(ve),cardImage:b(we),bgPanel:b({background:Be}),brdPanel:b.br(Pe),loginStyle:b(Ie),footerHeight:b.h(Fe),bgFooter:b({background:Se}),footer:b.c(Ve),inputHeight:b.h(Oe),inputFocus:b({":focus":{"border-color":w}}),active:b({outline:"solid 0.125rem"}),inactive:b({":hover":{outline:"solid 0.125rem"}}),empty:b({background:"transparent"}),bgThead:b({background:rt}),thead:b.c(ot),bgButton:b({background:Re}),button:b.c(Ee),padButton:b.p(_e),brdButton:b({border:ze}).br(Ne),bgButtonAlt:b({background:Me}),buttonAlt:b.c(Ke),padButtonAlt:b.p(Ze),brdButtonAlt:b({border:Ge}).br(et),bgPrimary:b({background:it}),primary:b.c(lt),bgInfo:b({background:ut}),info:b.c(pt),bgWarn:b({background:ht}),warn:b.c(gt),bgError:b({background:vt}),error:b.c(wt)});n.assign(p,{button:Pt,gridFlex:It,cardFlex:Ft,cardHeader:St,cardSubheading:Vt,cardIcon:Ot,cardImage:Rt,cardCounter:Et,loginForm:_t});o.updateTheme({icon:"fal",lblCol:b.branding.class,inpHgt:b.inputHeight.class,inpBrd:Bt+" "+b.inputFocus.class,btnBg:b.ripple.bgButton.class,btnCol:b.button.class,btnPad:b.padButton.class,btnBrd:p.button+" "+b.brdButton.class});o.updateButtonContext({alt:b.bgButtonAlt.buttonAlt.padButtonAlt.brdButtonAlt.ripple.class,info:b({border:"1px solid "+pt}).br(Ne).padButton.info.bgInfo.ripple.class,warn:b({border:"1px solid "+gt}).br(Ne).padButton.warn.bgWarn.ripple.class,error:b({border:"1px solid "+wt}).br(Ne).padButton.error.bgError.ripple.class})}var f=function(){function e(e){var t=e.brandingPath,n=e.themePath;this.branding=r({});this.theme=r({});this.brandingPath=t;this.branding.map(c);this.themePath=n;this.theme.map(h)}e.prototype.load=function(){return Promise.all([this.loadBranding(),this.loadTheme()])};e.prototype.loadBranding=function(){return this.brandingPath?t.request(this.brandingPath).then(this.branding).catch(n.noop):Promise.resolve()};e.prototype.loadTheme=function(){return this.themePath?t.request(this.themePath).then(this.theme).catch(n.noop):Promise.resolve()};return e}();function g(e){if(n.isString(e)){return t.request(e)}else{return Promise.resolve(e)}}function m(e,r){r({message:String(e.message),context:"error"});t.redraw()}function v(e,r){window.history.replaceState(null,"",window.location.href);var a;var i;var s;return g(e).then((function(e){a=e;o.updateConfig({signFont:"Caveat"});if(a.uiWidgets){o.updateConfig(a.uiWidgets)}i=new f(a);s=d(a.pusher);s.applicationUserChannel.bind("reload",(function(){return window.location.reload()}));s.applicationUserChannel.bind("redirect",(function(e){var t=e.url;return window.location.href=t}));s.cloudChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.companyChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.applicationChannel.bind("reloadbranding",(function(){return i.load().then(t.redraw)}));s.applicationUserChannel.bind("notification",(function(e){r(e);t.redraw()}));return Promise.all([i.load().catch(n.noop),new Promise((function(e){s.pusher.connection.bind("connected",(function(){s.pusher.connection.unbind("connected");e()}))}))])})).catch((function(e){return m(e,r)})).then((function(){return{application:a,pusher:s}}))}function y(e){if(typeof e==="string"){return s("p",e)}else if(e.hasOwnProperty("selector")){var t=e;return s(t.selector,t.content)}else{var r=e;return s("a.link.mv2.pa2.bn.br2.w-40.tc.dim.pointer"+b.bgButton.button,{href:r.href},r.text)}}var w=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.data;return s(".ph4",n.map(t,(function(e){return y(e)})))};return e}();var x={};function B(e,t){if(e in x){throw new Error("Component "+e+" is already registered")}else{x[e]=t}}B("basic",w);function k(e){var t=e.type,r=e.data;if(t in x){return s(x[t],{type:t,data:r})}else{return s("span","Unknown component type: "+t)}}function P(e){return n.map(e,(function(e){return k(e)}))}function C(e){if(e===void 0){e="info"}switch(e){case"error":return b.bgError.error.class;case"warn":return b.bgWarn.warn.class;default:return b.bgInfo.info.class}}var I=function(){function e(){this.active=false}e.prototype.oninit=function(e){var t=this;var n=e.attrs.notification;n.map((function(e){var n=e.message,o=e.duration,a=o===void 0?3e3:o;if(n){t.active=true;setTimeout((function(){return t.dismiss()}),a)}return r.SKIP}))};e.prototype.view=function(e){var t=this;var r=e.attrs.notification;var n=r(),o=n.message,a=n.context;return s(".w-100.pa3.fixed.top-0.left-0.z-max.f5.tc.pointer",{onclick:function(){return t.dismiss()},class:C(a),style:{transition:"transform 0.5s",transform:this.active?"none":"translate(0, -100%)"}},o)};e.prototype.dismiss=function(){if(this.active){this.active=false;s.redraw()}};return e}();var T=function(){function e(){}e.prototype.view=function(e){var t=e.attrs;if(t.hasOwnProperty("type")){return k(t)}else if(t.hasOwnProperty("icon")){var r=t;return s(".flex.items-center.mh2",{class:r.classes},s("i.fal.fa-2x.mr2",{class:r.icon}),r.title)}else if(t.hasOwnProperty("src")){var n=t;return s(".flex.items-center"+b.marginLogo.bgLogo.brdLogo,{class:n.classes},s("img.img",{src:n.src,class:n.imageClass,height:n.height,width:n.width}),n.title)}else{var o=t;return s(".mh2",{class:o.classes},o.title||"")}};return e}();var F=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.auth,n=r.logoutPath,o=r.logoutLabel,a=r.logoutIcon,i=a===void 0?"fa-sign-out-alt":a,l=t.classes;return s("a.link.ma2",{href:n,class:l},[o?s("span.mr2",o):null,s("i.fal.fa-fw.fa-2x[aria-hidden=true]",{class:i})])};return e}();function H(e){return(e*100).toFixed(0)+"%"}var S=function(){function e(){}e.prototype.view=function(e){var t=this;var r=e.attrs,o=r.display,a=r.application,i=a.version,l=a.auth,d=r.saving,c=r.progress,p=r.logout;var h=o==="header"?u.header:u.footer;var f=o==="header"?b.header:b.footer;var g=[];if(n.isObject(h)){g=[{type:11,logo:h.lhs},{type:0},{type:11,logo:h.rhs},{type:7}]}if(n.isArray(h)){g=h}return n.map(g,(function(e){switch(e.type){case 0:return s(".center");case 1:return s("span","|");case 2:return e.src?t.image(e.src,e.classes,e.height,e.width):null;case 3:return s("span.ma2"+f,{class:e.classes},e.text);case 4:return s("a.link.ma2"+f,{class:e.classes,href:e.href},e.text);case 5:return l&&p?t.logout(l,"flex "+f.class):null;case 6:return l&&p?t.logout(l,"flex dn-l "+f.class):null;case 7:return l&&p?t.logout(l,"dn flex-l "+f.class):null;case 8:return t.copyright(i);case 9:return t.poweredBy();case 10:return t.progressIndicator(d,c);case 11:return e.logo?s(T,e.logo):null;default:return e.hasOwnProperty("data")?k(e):null}}))};e.prototype.image=function(e,t,r,n){return s("img.img.ma2",{src:e,class:t,height:r,width:n})};e.prototype.poweredBy=function(){var e=u.poweredBy,t=e===void 0?{src:"https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",title:"Powered by Secure Digital Exchange Limited",href:"https://www.sdxmessaging.com/"}:e;return s("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]",{href:t.href},s("img.w-100.h-100.mw3.mw4-l.o-80",{src:t.src,title:t.title}))};e.prototype.copyright=function(e){var t=u.copyright,r=t===void 0?"":t;return s("span.ma2.f7",{title:e},r?[s.trust("&copy; "),r]:null)};e.prototype.progressIndicator=function(e,t){var r=e?e():false;var n=r&&t?t():0;return s("span.ma2.f3",{class:n?"":"dn"},[H(n),s("i.ma2.f3.fal.fa-spinner",{class:r?"fa-spin":"dn"})])};e.prototype.logout=function(e,t){if(t===void 0){t=""}return s(F,{auth:e,classes:"items-center "+t})};return e}();var L=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.application,n=t.notification,o=t.saving,a=t.progress,i=t.fullScreen,l=t.responsiveHeader,d=t.responsiveFooter,u=t.logout,c=u===void 0?true:u,p=t.header,h=t.footer,f=e.children;return[n?s(I,{notification:n}):null,s("nav.items-center.self-center.w-100"+b.header.headerHeight.bgHeader.bbHeader.brdHeader.shrink0,{class:(l?"dn flex-l":"flex")+" "+(i?"":b.layoutL.class)},p?p:s(S,{display:"header",application:r,saving:o,progress:a,logout:c})),s("main.flex-auto.flex.flex-column.self-center.w-100"+b.bgLayout.body.bodyFSize.bodyFWeight,{class:i?undefined:b.layoutL.class},f),s("nav.w-100.items-center"+b.footerHeight.bgFooter.footer.shrink0,{class:d?"dn flex-l":"flex"},h?h:s(S,{display:"footer",application:r,saving:o,progress:a,logout:c}))]};return e}();var V=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.header,n=t.headerClass,o=t.subheader,a=t.subheaderClass,i=t.content,l=t.wrapContent,d=l===void 0?true:l,u=t.footer;return[r?s(".flex.justify-between.items-center"+b.shrink0.bgBranding.brandingAlt,{class:n},r):null,o?s("div"+b.shrink0,{class:a},o):null,d?s(".flex-auto.overflow-x-hidden.overflow-y-auto"+b.safariBug,i):i,u]};return e}();var A=/^ {0,}[0-9]{2}\/[0-9]{2}\/[0-9]{4} {0,}$/;var O=function(){function e(){this.dobText=r("");this.dobXform=this.dobText.map((function(e){return n.replace(e,/[^\d/]/g,"")}));this.dobValid=this.dobXform.map((function(e){return A.test(e)}))}e.prototype.oninit=function(e){var t=e.attrs,r=t.value,n=t.valid;this.dobXform.map(r);this.dobValid.map(n)};e.prototype.view=function(e){var t=e.attrs,r=t.id,n=t.label,a=t.placeholder;return s(o.BaseInput,{field:{id:r,label:n,placeholder:a,pattern:A.source,autofocus:true,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.dobText,xform:this.dobXform})};return e}();var W=/^ {0,}(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2})) {0,}$/;var R=function(){function e(){this.postcodeText=r("");this.postcodeXform=this.postcodeText.map(n.toUpper);this.postcodeClean=this.postcodeXform.map((function(e){return n.replace(e,/\s/g,"")}));this.postcodeValid=this.postcodeClean.map((function(e){return W.test(e)}))}e.prototype.oninit=function(e){var t=e.attrs,r=t.value,n=t.valid;this.postcodeClean.map(r);this.postcodeValid.map(n)};e.prototype.view=function(e){var t=e.attrs,r=t.id,n=t.label,a=t.placeholder;return s(o.BaseInput,{field:{id:r,label:n,placeholder:a,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.postcodeText,xform:this.postcodeXform})};return e}();var D=function(){function e(){this.passwordText=r("");this.passwordValid=this.passwordText.map((function(e){return e.length>0}))}e.prototype.oninit=function(e){var t=e.attrs,r=t.value,n=t.valid;this.passwordText.map(r);this.passwordValid.map(n)};e.prototype.view=function(e){var t=e.attrs,r=t.id,n=t.label,a=t.placeholder,i=t.autocomplete;return s(o.BaseInput,{field:{id:r,label:n,type:"password",placeholder:a,autocomplete:i,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},value:this.passwordText})};return e}();var E=this&&this.__extends||function(){var e=function(t,r){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)if(t.hasOwnProperty(r))e[r]=t[r]};return e(t,r)};return function(t,r){e(t,r);function n(){this.constructor=t}t.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}();var j=function(e){E(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.passwordValid=t.passwordText.map((function(e){return e.length===6}));return t}t.prototype.view=function(e){var t=e.attrs,r=t.id,n=t.label,a=t.placeholder,i=t.autocomplete;return s(o.BaseInput,{field:{id:r,label:n,type:"password",placeholder:a,autocomplete:i,instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20",inputmode:"numeric",pattern:"[0-9]+"},value:this.passwordText})};return t}(D);var _=function(){function e(){this.dob=r("");this.dobValid=r();this.postcode=r("");this.postcodeValid=r();this.passwordText=r.lift((function(e,t){return e+"_"+t}),this.dob,this.postcode);this.formValid=r.lift((function(e,t){return e&&t}),this.dobValid,this.postcodeValid)}e.prototype.view=function(e){var t=e.attrs,n=t.auth,a=t.onToggle;var i=n.endpoint,l=n.username,d=n.pinInput,u=n.onePanel,c=n.helpLinkText,p=c===void 0?"Trouble logging in?":c,h=n.dobLabel,f=h===void 0?"DOB":h,g=n.dobPlaceholder,m=g===void 0?"DOB e.g. 23/02/1973":g,v=n.postcodeLabel,y=v===void 0?"Postcode":v,w=n.postcodePlaceholder,x=w===void 0?"Postcode e.g. AB12 3CD":w,B=n.loginBtnText,k=B===void 0?"Login to Secure Document Vault":B,P=n.loginBtnIcon,C=P===void 0?"fa-sign-in-alt":P,I=n.loginBtnClass,T=I===void 0?"w-100 mv3 tc br4":I,F=n.reset;return s("form.w-100[enctype=multipart/form-data][method=post][accept=utf-8]",{action:i},[s(o.BaseInput,{field:{id:"username",type:"hidden",readonly:true},value:r(l)}),s(o.BaseInput,{field:{id:"password",type:"hidden",autocomplete:"off",readonly:true},value:this.passwordText}),s(O,{id:"dob",label:f,placeholder:m,value:this.dob,valid:this.dobValid}),d?s(j,{id:"pin",label:y,placeholder:x,value:this.postcode,valid:this.postcodeValid}):s(R,{id:"postcode",label:y,placeholder:x,value:this.postcode,valid:this.postcodeValid}),u&&F?s("span.pv2.nt2.fr.f6.pointer"+b.branding,{onclick:a},p):null,s(o.Button,{label:k,type:"submit",rightIcon:C,classes:T+" "+b.bgPrimary.primary.class,disabled:!this.formValid()})])};return e}();var U=function(){function e(){this.password=r("");this.passwordValid=r()}e.prototype.view=function(e){var t=e.attrs,n=t.auth,a=t.onToggle;var i=n.endpoint,l=n.username,d=n.pinInput,u=n.onePanel,c=n.helpLinkText,p=c===void 0?"Trouble logging in?":c,h=n.passwordLabel,f=h===void 0?"PASSWORD":h,g=n.passwordPlaceholder,m=g===void 0?"PASSWORD":g,v=n.loginBtnText,y=v===void 0?"Login to Secure Document Vault":v,w=n.loginBtnIcon,x=w===void 0?"fa-sign-in-alt":w,B=n.loginBtnClass,k=B===void 0?"w-100 mv3 tc br4":B,P=n.reset;return s("form.w-100[enctype=multipart/form-data][method=post][accept=utf-8]",{action:i},[s(o.BaseInput,{field:{id:"username",type:"hidden",readonly:true},value:r(l)}),d?s(j,{id:"password",label:f,placeholder:m,autocomplete:"current-password",value:this.password,valid:this.passwordValid}):s(D,{id:"password",label:f,placeholder:m,autocomplete:"current-password",value:this.password,valid:this.passwordValid}),u&&P?s("span.pv2.nt2.fr.f6.pointer"+b.branding,{onclick:a},p):null,s(o.Button,{label:y,type:"submit",rightIcon:x,classes:k+" "+b.bgPrimary.primary.class,disabled:!this.passwordValid()})])};return e}();var z=function(){function e(){this.resetId=r("");this.mobileValid=r();this.emailValid=r()}e.prototype.oninit=function(e){var t=e.attrs.reset.hash;this.mobileValid=this.resetId.map((function(e){return t===i.sha256(n.replace(n.toLower(e),/[^0-9]/g,"").slice(-9))}));this.emailValid=this.resetId.map((function(e){return t===i.sha256(n.trim(n.toLower(e)))}))};e.prototype.view=function(e){var t=this;var r=e.attrs,a=r.auth,i=r.reset,l=r.onReset,d=r.onToggle;var u=i.type,c=i.inputLabel,p=i.inputPlaceholder;var h=a.onePanel,f=a.helpBtnText,g=f===void 0?"SEND PIN":f,m=a.helpBtnIcon,v=m===void 0?""+(u==="email"?"fa-envelope":"fa-mobile-android"):m,y=a.loginBtnClass,w=y===void 0?"w-100 mv3 tc br4":y,x=a.returnLinkText,B=x===void 0?"Return":x;return s("form.w-100[enctype=multipart/form-data]",{onsubmit:function(e){e.preventDefault();l(u==="email"?n.trim(n.toLower(t.resetId())):n.trim(n.replace(n.toLower(t.resetId()),/[^0-9]/g,"").slice(-9)),t.resetId())}},[s(o.BaseInput,{field:n.extend({},{id:"resetpassword",instant:true,classes:"pa2",containerClass:"mb2 bb b--black-20"},u==="email"?{label:c?c:"EMAIL",type:"email",placeholder:p?p:"Enter e-mail address",inputmode:"email"}:{label:c?c:"MOBILE",type:"tel",placeholder:p?p:"Enter mobile number",inputmode:"numeric",pattern:"[0-9]+"}),value:this.resetId}),s(".flex.items-center",[s(o.Button,{label:g,type:"submit",rightIcon:v,classes:w+" "+b.bgPrimary.primary.class,disabled:u==="email"?!this.emailValid():!this.mobileValid()}),h?s("span.ml-auto.pv2.f6.pointer"+b.branding,{onclick:d},B):null])])};return e}();var q=function(){function e(){this.toggleHelp=false}e.prototype.view=function(e){var t=this;var r=e.attrs,o=r.application,a=r.notification,i=r.onReset;if(!o.auth){return s("span","No authentication set")}var l=o.auth,d=l.onePanel,u=l.title,c=l.lines,h=l.postLines,f=h===void 0?[]:h,g=l.helpTitle,m=l.helpLines,v=l.postHelpLines,y=v===void 0?[]:v,w=l.reset,x=o.footer;return s(L,{application:o,notification:a,logout:false},s(V,{content:s(".flex.flex-column.pv2",{class:d?"":"flex-row-l items-stretch ph2 ph1-l"},[s(".flex-column.w-100"+b.loginStyle,{class:p.loginForm+" "+(d?this.toggleHelp?"dn":"flex":"mb2 mb0-l mh1-l")},[s(".f3.f2-l.fw5.mv3.mv4-l"+b.branding,s.trust(u)),n.map(c,(function(e){return s("p.f5",s.trust(e))})),o.auth.type==="dobPostcode"?s(_,{auth:o.auth,onToggle:function(){return t.toggleHelp=true}}):s(U,{auth:o.auth,onToggle:function(){return t.toggleHelp=true}}),n.map(f,(function(e){return s("p.f5",s.trust(e))}))]),s(".flex-column.w-100"+b.loginStyle,{class:p.loginForm+" "+(d?this.toggleHelp?"flex":"dn":"mh1-l")},[s(".f3.f2-l.fw5.mv3.mv4-l"+b.branding,s.trust(g)),n.map(m,(function(e){return s("p.f5",s.trust(e))})),w?s(z,{auth:o.auth,reset:w,onReset:function(e,r){t.toggleHelp=false;i(e,r)},onToggle:function(){return t.toggleHelp=false}}):null,n.map(y,(function(e){return s("p.f5",s.trust(e))}))]),x?k(x):null])}))};return e}();function N(e,r){return function(n,o){if(r&&r.reset){var a=r.reset,i=a.username,s=a.endpoint;var l=new FormData;l.append("username",i);l.append("password",n);return t.request({method:"POST",url:s,body:l}).then((function(){return e({message:"We have sent your new PIN to "+o,duration:2e3})})).catch((function(t){return m(t,e)}))}else{return Promise.resolve(m(new Error("No authentication configuration"),e))}}}function X(e,t){var n=r(t);return v(e,n).then((function(e){var t=e.application,r=e.pusher;s.mount(document.getElementById("page"),{view:function(){return s(q,{application:t,notification:n,onReset:N(n,t.auth)})}});return{application:t,pusher:r}}))}e.buildComponent=k;e.buildComponentList=P;e.login=X;e.registerComponent=B;e.resetAuth=N;Object.defineProperty(e,"__esModule",{value:true})}));
