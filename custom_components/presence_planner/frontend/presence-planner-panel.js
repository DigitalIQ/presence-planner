var Ur=globalThis,Nr=Ur.ShadowRoot&&(Ur.ShadyCSS===void 0||Ur.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Wa=Symbol(),Mu=new WeakMap,Hs=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==Wa)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Nr&&t===void 0){let n=e!==void 0&&e.length===1;n&&(t=Mu.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Mu.set(e,t))}return t}toString(){return this.cssText}},wu=i=>new Hs(typeof i=="string"?i:i+"",void 0,Wa),Sn=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((n,s,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[r+1],i[0]);return new Hs(e,i,Wa)},Su=(i,t)=>{if(Nr)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let n=document.createElement("style"),s=Ur.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}},Xa=Nr?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let n of t.cssRules)e+=n.cssText;return wu(e)})(i):i;var{is:Om,defineProperty:km,getOwnPropertyDescriptor:Fm,getOwnPropertyNames:zm,getOwnPropertySymbols:Bm,getPrototypeOf:Vm}=Object,Or=globalThis,Eu=Or.trustedTypes,$m=Eu?Eu.emptyScript:"",Hm=Or.reactiveElementPolyfillSupport,Gs=(i,t)=>i,qa={toAttribute(i,t){switch(t){case Boolean:i=i?$m:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Tu=(i,t)=>!Om(i,t),Au={attribute:!0,type:String,converter:qa,reflect:!1,useDefault:!1,hasChanged:Tu};Symbol.metadata??=Symbol("metadata"),Or.litPropertyMetadata??=new WeakMap;var En=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Au){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let n=Symbol(),s=this.getPropertyDescriptor(t,n,e);s!==void 0&&km(this.prototype,t,s)}}static getPropertyDescriptor(t,e,n){let{get:s,set:r}=Fm(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Au}static _$Ei(){if(this.hasOwnProperty(Gs("elementProperties")))return;let t=Vm(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Gs("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Gs("properties"))){let e=this.properties,n=[...zm(e),...Bm(e)];for(let s of n)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[n,s]of e)this.elementProperties.set(n,s)}this._$Eh=new Map;for(let[e,n]of this.elementProperties){let s=this._$Eu(e,n);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let s of n)e.unshift(Xa(s))}else t!==void 0&&e.push(Xa(t));return e}static _$Eu(t,e){let n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Su(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){let n=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,n);if(s!==void 0&&n.reflect===!0){let r=(n.converter?.toAttribute!==void 0?n.converter:qa).toAttribute(e,n.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let n=this.constructor,s=n._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=n.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:qa;this._$Em=s;let a=o.fromAttribute(e,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,n,s=!1,r){if(t!==void 0){let o=this.constructor;if(s===!1&&(r=this[t]),n??=o.getPropertyOptions(t),!((n.hasChanged??Tu)(r,e)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,n))))return;this.C(t,e,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:s,wrapped:r},o){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[s,r]of n){let{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};En.elementStyles=[],En.shadowRootOptions={mode:"open"},En[Gs("elementProperties")]=new Map,En[Gs("finalized")]=new Map,Hm?.({ReactiveElement:En}),(Or.reactiveElementVersions??=[]).push("2.1.2");var Za=globalThis,Ru=i=>i,kr=Za.trustedTypes,Cu=kr?kr.createPolicy("lit-html",{createHTML:i=>i}):void 0,Ka="$lit$",An=`lit$${Math.random().toFixed(9).slice(2)}$`,Ja="?"+An,Gm=`<${Ja}>`,pi=document,Xs=()=>pi.createComment(""),qs=i=>i===null||typeof i!="object"&&typeof i!="function",ja=Array.isArray,Nu=i=>ja(i)||typeof i?.[Symbol.iterator]=="function",Ya=`[ 	
\f\r]`,Ws=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pu=/-->/g,Iu=/>/g,di=RegExp(`>|${Ya}(?:([^\\s"'>=/]+)(${Ya}*=${Ya}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Du=/'/g,Lu=/"/g,Ou=/^(?:script|style|textarea|title)$/i,Qa=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),Y=Qa(1),Wt=Qa(2),NM=Qa(3),Qe=Symbol.for("lit-noChange"),ft=Symbol.for("lit-nothing"),Uu=new WeakMap,fi=pi.createTreeWalker(pi,129);function ku(i,t){if(!ja(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Cu!==void 0?Cu.createHTML(t):t}var Fu=(i,t)=>{let e=i.length-1,n=[],s,r=t===2?"<svg>":t===3?"<math>":"",o=Ws;for(let a=0;a<e;a++){let l=i[a],c,h,d=-1,u=0;for(;u<l.length&&(o.lastIndex=u,h=o.exec(l),h!==null);)u=o.lastIndex,o===Ws?h[1]==="!--"?o=Pu:h[1]!==void 0?o=Iu:h[2]!==void 0?(Ou.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=di):h[3]!==void 0&&(o=di):o===di?h[0]===">"?(o=s??Ws,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?di:h[3]==='"'?Lu:Du):o===Lu||o===Du?o=di:o===Pu||o===Iu?o=Ws:(o=di,s=void 0);let f=o===di&&i[a+1].startsWith("/>")?" ":"";r+=o===Ws?l+Gm:d>=0?(n.push(c),l.slice(0,d)+Ka+l.slice(d)+An+f):l+An+(d===-2?a:f)}return[ku(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Ys=class i{constructor({strings:t,_$litType$:e},n){let s;this.parts=[];let r=0,o=0,a=t.length-1,l=this.parts,[c,h]=Fu(t,e);if(this.el=i.createElement(c,n),fi.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=fi.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(Ka)){let u=h[o++],f=s.getAttribute(d).split(An),m=/([.?@])?(.*)/.exec(u);l.push({type:1,index:r,name:m[2],strings:f,ctor:m[1]==="."?zr:m[1]==="?"?Br:m[1]==="@"?Vr:gi}),s.removeAttribute(d)}else d.startsWith(An)&&(l.push({type:6,index:r}),s.removeAttribute(d));if(Ou.test(s.tagName)){let d=s.textContent.split(An),u=d.length-1;if(u>0){s.textContent=kr?kr.emptyScript:"";for(let f=0;f<u;f++)s.append(d[f],Xs()),fi.nextNode(),l.push({type:2,index:++r});s.append(d[u],Xs())}}}else if(s.nodeType===8)if(s.data===Ja)l.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(An,d+1))!==-1;)l.push({type:7,index:r}),d+=An.length-1}r++}}static createElement(t,e){let n=pi.createElement("template");return n.innerHTML=t,n}};function mi(i,t,e=i,n){if(t===Qe)return t;let s=n!==void 0?e._$Co?.[n]:e._$Cl,r=qs(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(i),s._$AT(i,e,n)),n!==void 0?(e._$Co??=[])[n]=s:e._$Cl=s),s!==void 0&&(t=mi(i,s._$AS(i,t.values),s,n)),t}var Fr=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:n}=this._$AD,s=(t?.creationScope??pi).importNode(e,!0);fi.currentNode=s;let r=fi.nextNode(),o=0,a=0,l=n[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new Wi(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new $r(r,this,t)),this._$AV.push(c),l=n[++a]}o!==l?.index&&(r=fi.nextNode(),o++)}return fi.currentNode=pi,s}p(t){let e=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}},Wi=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,s){this.type=2,this._$AH=ft,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=mi(this,t,e),qs(t)?t===ft||t==null||t===""?(this._$AH!==ft&&this._$AR(),this._$AH=ft):t!==this._$AH&&t!==Qe&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Nu(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ft&&qs(this._$AH)?this._$AA.nextSibling.data=t:this.T(pi.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Ys.createElement(ku(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new Fr(s,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=Uu.get(t.strings);return e===void 0&&Uu.set(t.strings,e=new Ys(t)),e}k(t){ja(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,n,s=0;for(let r of t)s===e.length?e.push(n=new i(this.O(Xs()),this.O(Xs()),this,this.options)):n=e[s],n._$AI(r),s++;s<e.length&&(this._$AR(n&&n._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let n=Ru(t).nextSibling;Ru(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},gi=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,s,r){this.type=1,this._$AH=ft,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ft}_$AI(t,e=this,n,s){let r=this.strings,o=!1;if(r===void 0)t=mi(this,t,e,0),o=!qs(t)||t!==this._$AH&&t!==Qe,o&&(this._$AH=t);else{let a=t,l,c;for(t=r[0],l=0;l<r.length-1;l++)c=mi(this,a[n+l],e,l),c===Qe&&(c=this._$AH[l]),o||=!qs(c)||c!==this._$AH[l],c===ft?t=ft:t!==ft&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!s&&this.j(t)}j(t){t===ft?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},zr=class extends gi{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ft?void 0:t}},Br=class extends gi{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ft)}},Vr=class extends gi{constructor(t,e,n,s,r){super(t,e,n,s,r),this.type=5}_$AI(t,e=this){if((t=mi(this,t,e,0)??ft)===Qe)return;let n=this._$AH,s=t===ft&&n!==ft||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==ft&&(n===ft||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},$r=class{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){mi(this,t)}},zu={M:Ka,P:An,A:Ja,C:1,L:Fu,R:Fr,D:Nu,V:mi,I:Wi,H:gi,N:Br,U:Vr,B:zr,F:$r},Wm=Za.litHtmlPolyfillSupport;Wm?.(Ys,Wi),(Za.litHtmlVersions??=[]).push("3.3.3");var Bu=(i,t,e)=>{let n=e?.renderBefore??t,s=n._$litPart$;if(s===void 0){let r=e?.renderBefore??null;n._$litPart$=s=new Wi(t.insertBefore(Xs(),r),r,void 0,e??{})}return s._$AI(i),s};var tl=globalThis,He=class extends En{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Bu(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Qe}};He._$litElement$=!0,He.finalized=!0,tl.litElementHydrateSupport?.({LitElement:He});var Xm=tl.litElementPolyfillSupport;Xm?.({LitElement:He});(tl.litElementVersions??=[]).push("4.2.2");var Tn={version:1,default_fov_v:90,profiles:[{id:"aqara_fp300",name:"Aqara Presence Multi-Sensor FP300",manufacturer:"Aqara",match:["fp300","ps-s04d","ps-s04e","presence multi-sensor"],tech:"hybrid",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:null,verified:!0,source:"https://www.aqara.com/en/product/presence-multi-sensor-fp300/",note:"Manual: side mounting 1.4\u20131.8 m, about 2 m tilted down for larger areas. Detection range limit only in Zigbee mode."},{id:"aqara_fp400",name:"Aqara Spatial Multi Sensor FP400",manufacturer:"Aqara",match:["fp400","ps-s05d","spatial multi sensor"],tech:"mmwave",fov_h:120,fov_v:null,reach:10,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:{fov:120,reach:4},verified:!0,source:"https://www.aqara.com/en/product/spatial-multi-sensor-fp400/",note:"Side mounting covers about 10 m deep \xD7 8 m wide, corner 7 \xD7 7 m; ceiling 3\u20134 m recommended."},{id:"aqara_p1",name:"Aqara Motion Sensor P1",manufacturer:"Aqara",match:["motion sensor p1","rtcgq14lm","ms-s02"],tech:"pir",fov_h:150,fov_v:null,reach:7,reach_static:0,mounts:["wall","corner","ceiling"],ceiling:null,verified:!0,source:"https://www.aqara.com/en/product/motion-sensor-p1/",note:"170\xB0 up to 2 m, 150\xB0 up to 7 m. PIR: detects motion only, no stationary presence."},{id:"everything_presence_one",name:"Everything Presence One",manufacturer:"Everything Smart Technology",match:["everything presence one","everything-presence-one"],tech:"hybrid",fov_h:100,fov_v:40,reach:25,reach_static:null,mounts:["wall","corner"],ceiling:null,verified:!0,source:"https://shop.everythingsmart.io/products/everything-presence-one-kit",note:"mmWave 100\xB0 \xD7 40\xB0, 25 m; PIR 12 m."},{id:"switchbot_presence",name:"SwitchBot Presence Sensor",manufacturer:"SwitchBot",match:["switchbot presence"],tech:"mmwave",fov_h:120,fov_v:null,reach:8,reach_static:5,mounts:["wall","corner"],ceiling:null,verified:!0,source:"https://www.switch-bot.com/products/switchbot-presence-sensor",note:"8 m for moving, 5 m for stationary people."},{id:"aqara_fp2",name:"Aqara Presence Sensor FP2",manufacturer:"Aqara",match:["fp2","ps-s02"],tech:"mmwave",fov_h:120,fov_v:null,reach:8,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:{fov:120,reach:2},verified:!1,source:"https://www.123led.nl/pdf/LAQ00045.pdf",note:"Values from a copy of the manual hosted by a retailer, not from aqara.com."},{id:"aqara_fp1e",name:"Aqara Presence Sensor FP1E",manufacturer:"Aqara",match:["fp1e","ps-s03"],tech:"mmwave",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:{fov:120,reach:4},verified:!1,source:"https://123led.nl/pdf/LAQ00070_handleiding.pdf",note:"Values from a copy of the manual hosted by a retailer, not from aqara.com."},{id:"aqara_p2",name:"Aqara Motion and Light Sensor P2",manufacturer:"Aqara",match:["motion and light sensor p2","ml-s02"],tech:"pir",fov_h:150,fov_v:null,reach:7,reach_static:0,mounts:["wall","corner","ceiling"],ceiling:null,verified:!1,source:"https://www.domadoo.fr/en/smart-home-security-alarm/7048-aqara-matter-over-thread-aqara-motion-and-light-sensor-p2-6970504219656.html",note:"Retailer values (angle given as 120\xB0 or 170\xB0). PIR: motion only."},{id:"everything_presence_lite",name:"Everything Presence Lite",manufacturer:"Everything Smart Technology",match:["everything presence lite","everything-presence-lite"],tech:"mmwave",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner"],ceiling:null,verified:!1,source:"https://devices.esphome.io/devices/Everything-Presence-Lite",note:"Range from the vendor page, field of view from the LD2450 radar spec."},{id:"hue_motion_indoor",name:"Philips Hue Motion Sensor (indoor)",manufacturer:"Signify",match:["hue motion sensor","sml001","sml003"],tech:"pir",fov_h:100,fov_v:null,reach:5,reach_static:0,mounts:["wall","corner","ceiling"],ceiling:null,verified:!1,source:"https://www.philips-hue.com/en-us/p/hue-motion-sensor/046677570972",note:"Retailer values (100\xB0 or 120\xB0). PIR: motion only."},{id:"apollo_msr2",name:"Apollo MSR-2",manufacturer:"Apollo Automation",match:["msr-2","msr2"],tech:"mmwave",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:null,verified:!1,source:"https://wiki.apolloautomation.com/products/general/mmwave-presence-sensor-comparison/",note:"LD2410B radar, 6 m; angle not stated by the vendor."},{id:"apollo_mtr1",name:"Apollo MTR-1",manufacturer:"Apollo Automation",match:["mtr-1","mtr1"],tech:"mmwave",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner"],ceiling:null,verified:!1,source:"https://wiki.apolloautomation.com/products/general/mmwave-presence-sensor-comparison/",note:"LD2450 radar, 6 m; 120\xB0 from the radar spec, not the vendor."},{id:"custom",name:"Custom",manufacturer:"",match:[],tech:"mmwave",fov_h:120,fov_v:90,reach:6,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:null,verified:!1,source:"",note:"Your own values."}]};var _i=Math.PI/180,Zs=180/Math.PI,Xi=(i,t)=>Math.hypot(t[0]-i[0],t[1]-i[1]),qi=(i,t,e)=>i<t?t:i>e?e:i,be=i=>Math.round(i*1e4)/1e4,Vu=i=>(i%360+360)%360;function Me(i,t,e){let n=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){let o=e[s][0],a=e[s][1],l=e[r][0],c=e[r][1];a>t!=c>t&&i<(l-o)*(t-a)/(c-a)+o&&(n=!n)}return n}var $u=(i,t)=>Me(i[0],i[1],t),el=(i,t,e)=>(t[0]-i[0])*(e[1]-i[1])-(t[1]-i[1])*(e[0]-i[0]);function nl(i,t,e,n,s,r,o,a){let l=o-s,c=a-r;if((l*(t-r)-c*(i-s))*(l*(n-r)-c*(e-s))>=0)return!1;let h=e-i,d=n-t;return h*(r-t)-d*(s-i)>=0!=h*(a-t)-d*(o-i)>=0}function il(i,t,e,n,s,r=0){let o=s*_i,a=Math.cos(o),l=Math.sin(o),c=e/2+r,h=n/2+r;return[[-c,-h],[c,-h],[c,h],[-c,h]].map(([d,u])=>[i+d*a-u*l,t+d*l+u*a])}function sl(i,t,e){let n=Xi(i,t)||1,s=-(t[1]-i[1])/n*(e/2),r=(t[0]-i[0])/n*(e/2);return[[i[0]+s,i[1]+r],[t[0]+s,t[1]+r],[t[0]-s,t[1]-r],[i[0]-s,i[1]-r]]}function Ym(i){let t=0;for(let e=0;e<i.length;e++){let n=i[e],s=i[(e+1)%i.length];t+=n[0]*s[1]-s[0]*n[1]}return t/2}function Hu(i,t,e,n){let s=n[0]-e[0],r=n[1]-e[1],o=s*s+r*r,a=o>0?((i-e[0])*s+(t-e[1])*r)/o:0;return a=qi(a,0,1),Math.hypot(i-(e[0]+s*a),t-(e[1]+r*a))}function rl(i){let t=Ym(i)>=0?1:-1,e=i.length,n=new Float64Array(e),s=new Float64Array(e),r=new Float64Array(e),o=new Float64Array(e),a=1/0,l=-1/0,c=1/0,h=-1/0;for(let d=0;d<e;d++){let u=i[d],f=i[(d+1)%e];n[d]=f[0]-u[0],s[d]=f[1]-u[1],r[d]=u[0],o[d]=u[1],a=Math.min(a,u[0]),l=Math.max(l,u[0]),c=Math.min(c,u[1]),h=Math.max(h,u[1])}return{n:e,s:t,ex:n,ez:s,px:r,pz:o,x0:a,x1:l,z0:c,z1:h}}function ol(i,t,e,n,s,r){if(Math.max(t,n)<i.x0||Math.min(t,n)>i.x1||Math.max(e,s)<i.z0||Math.min(e,s)>i.z1)return!1;let o=n-t,a=s-e,l=0,c=1,h=1;for(let d=0;d<i.n;d++){let u=i.s*(i.ex[d]*(e-i.pz[d])-i.ez[d]*(t-i.px[d])),f=i.s*(i.ex[d]*a-i.ez[d]*o);if(u<0&&(h=0),f===0){if(u<0)return!1}else{let m=-u/f;if(f>0?m>l&&(l=m):m<c&&(c=m),l>c)return!1}}return r[0]=l,r[1]=c,r[2]=h,!0}var Gu=25,Wu=6,Xu=10,pn=.005,Zm=.9,Km=["lamp","led_strip","shower","plant","rug","coat_rack"];function Jm(i){let t=String(i||"");return t==="bed"||t==="bunk_bed"?{name:"bed",grow:0,ring:!1,height:.5}:t.startsWith("sofa")||t==="armchair"?{name:"sofa",grow:0,ring:!1,height:.9}:t==="desk"?{name:"desk",grow:.5,ring:!1,height:.9}:t.startsWith("table")?{name:"dining",grow:.45,ring:!1,height:.9}:["kitchen","worktop","sink","stove"].includes(t)?{name:"kitchen",grow:.6,ring:!0,height:1.3}:t==="wc"?{name:"wc",grow:.3,ring:!1,height:.9}:t==="shower"?{name:"shower",grow:0,ring:!1,height:1.3}:t==="bathtub"?{name:"bathtub",grow:0,ring:!1,height:1.3}:t==="washbasin"?{name:"washbasin",grow:.5,ring:!0,height:1.3}:null}function jm(i){let t=String(i.type||"");return(i.h||0)>=1.5&&!t.startsWith("lamp")&&!Km.includes(t)}var Qm=i=>{let t=s=>Math.round(s*200)/200,e=[t(i.a[0]),t(i.a[1])],n=[t(i.b[0]),t(i.b[1])];return e[0]<n[0]||e[0]===n[0]&&e[1]<n[1]?`${e}|${n}`:`${n}|${e}`};function Gr(i,t){let e=(i.floors||[]).find(E=>E.id===t)||(t==null?(i.floors||[])[0]:null);if(!e)throw new Error(`floor not found: ${t}`);let n=i.settings||{},s=n.wall_exterior||.24,r=n.wall_interior||.12,o=e.height||2.6,a=(e.rooms||[]).filter(E=>(E.points||[]).length>=3),l=a.map(E=>({id:E.id,name:E.name??E.id,area_id:E.area_id??null,points:E.points.map(z=>[z[0],z[1]]),height:E.ceiling_height||o})),c=[];l.forEach(E=>E.points.forEach(z=>c.push(z)));let h=[];a.forEach((E,z)=>{let H=l[z].points;for(let N=0;N<H.length;N++){let X=H[N],F=H[(N+1)%H.length],tt=Xi(X,F);if(tt<1e-6)continue;let J=(F[0]-X[0])/tt,ct=(F[1]-X[1])/tt,pt=[0,tt];for(let Z of c){let rt=Z[0]-X[0],nt=Z[1]-X[1],mt=rt*J+nt*ct;Math.abs(rt*ct-nt*J)<pn&&mt>pn&&mt<tt-pn&&pt.push(mt)}pt.sort((Z,rt)=>Z-rt);let Et=(E.wall_thickness||[])[N],V=(E.wall_heights||[])[N];for(let Z=0;Z<pt.length-1;Z++){if(pt[Z+1]-pt[Z]<pn)continue;let rt=(pt[Z]+pt[Z+1])/2,nt=-ct,mt=J;$u([X[0]+J*rt+nt*.02,X[1]+ct*rt+mt*.02],H)||(nt=-nt,mt=-mt),h.push({a:Z===0?[X[0],X[1]]:[X[0]+J*pt[Z],X[1]+ct*pt[Z]],b:Z===pt.length-2?[F[0],F[1]]:[X[0]+J*pt[Z+1],X[1]+ct*pt[Z+1]],room:E.id,edge:N,t0:pt[Z],t1:pt[Z+1],n:[nt,mt],u:[J,ct],thick:Et,noWall:V===0})}}});let d=new Map;for(let E of h)E.key=Qm(E),d.has(E.key)||d.set(E.key,[]),d.get(E.key).push(E);let u=[],f=[],m=[];for(let E of d.values()){let z=new Set(E.map(J=>J.room)).size>1,H=z?r:s,N=Math.max(...E.map(J=>typeof J.thick=="number"&&J.thick>0?J.thick:H)),X=E.some(J=>J.noWall);for(let J of E)J.shared=z,J.wallT=X?0:N;if(X)continue;let F=E[0];z?u.push(sl(F.a,F.b,N)):u.push([F.a,F.b,[F.b[0]-F.n[0]*N,F.b[1]-F.n[1]*N],[F.a[0]-F.n[0]*N,F.a[1]-F.n[1]*N]]);let tt=!z||N>=.2-1e-9?"block":N>=.1-1e-9?"brick":"thin";m.push({a:F.a,b:F.b,k:tt,t:N,shared:z})}for(let E of h){if(E.noWall)continue;let z=E.shared?E.wallT/2:0;f.push({a:[E.a[0]+E.n[0]*z,E.a[1]+E.n[1]*z],b:[E.b[0]+E.n[0]*z,E.b[1]+E.n[1]*z],n:E.n,room:E.room,edge:E.edge,t0:E.t0,t1:E.t1,shared:E.shared,off:z})}let _=Object.fromEntries(l.map(E=>[E.id,E])),g=Object.fromEntries(a.map(E=>[E.id,E])),p=[],b=[],x=[];for(let E of e.openings||[]){let z=_[E.room_id];if(!z||!g[E.room_id])continue;let H=z.points,N=H[E.edge],X=H[(E.edge+1)%H.length];if(!N||!X)continue;let F=Xi(N,X),tt=(X[0]-N[0])/F,J=(X[1]-N[1])/F,ct=E.offset-E.width/2,pt=E.offset+E.width/2,Et=[N[0]+tt*ct,N[1]+J*ct],V=[N[0]+tt*pt,N[1]+J*pt],Z=h.find(St=>St.room===z.id&&St.edge===E.edge&&E.offset>=St.t0-1e-6&&E.offset<=St.t1+1e-6)||{},rt=Z.n||[-J,tt],nt=Z.wallT||r,mt=!!Z.shared;if(E.type==="window")p.push({id:E.id,a:Et,b:V,n:rt,exterior:!mt,room:z.id,sill:E.sill??.9,height:E.height??1.3,t:mt?0:nt}),mt||x.push({a:Et,b:V,n:rt,sill:E.sill??.9,height:E.height??1.3});else{let St=E.swing==="out"?-1:1,Lt=E.hinge==="right"?V:Et,ee=E.hinge==="right"?Et:V,Ht=[Lt[0]+rt[0]*E.width*St,Lt[1]+rt[1]*E.width*St],fe=[(Et[0]+V[0])/2,(Et[1]+V[1])/2];b.push({id:E.id,a:Et,b:V,hinge:Lt,tip:Ht,other:ee,w:E.width,rooms:[z.id],contact:E.contact??null,outside:!mt,mid:fe,room:z.id,swing:E.swing||"in",sill:E.sill??0,height:E.height??2,t:nt});for(let U=m.length-1;U>=0;U--){let _e=m[U],kt=Xi(Et,V)||1;if(Math.abs(el(Et,V,_e.a))/kt>pn||Math.abs(el(Et,V,_e.b))/kt>pn)continue;let Vt=(_e.a[0]-Et[0])*tt+(_e.a[1]-Et[1])*J,Tt=(_e.b[0]-Et[0])*tt+(_e.b[1]-Et[1])*J,Qt=Math.min(Vt,Tt),At=Math.max(Vt,Tt);if(At<=pn||Qt>=kt-pn)continue;m.splice(U,1);let A=y=>[Et[0]+tt*y,Et[1]+J*y];Qt<-pn&&m.push({..._e,a:A(Qt),b:[Et[0],Et[1]]}),At>kt+pn&&m.push({..._e,a:A(kt),b:A(At)})}}}for(let E of b){let z=Xi(E.a,E.b)||1,H=-(E.b[1]-E.a[1])/z,N=(E.b[0]-E.a[0])/z;E.rooms=l.filter(X=>Me(E.mid[0]+H*.3,E.mid[1]+N*.3,X.points)||Me(E.mid[0]-H*.3,E.mid[1]-N*.3,X.points)).map(X=>X.id)}let v=(e.walls||[]).map(E=>({id:E.id,poly:sl(E.a,E.b,E.thickness||r),height:E.height??null,block:E.height==null||E.height>=1.5})),C=(e.furniture||[]).map(E=>({id:E.id,type:E.type,poly:il(E.x,E.z,E.w||.3,E.d||.3,E.rotation||0),h:E.h||0,obstacle:jm(E)})),T=[];(e.furniture||[]).forEach((E,z)=>{let H=Jm(E.type);if(!H)return;let N=l.find(X=>Me(E.x,E.z,X.points));N&&T.push({name:H.name,room:N.id,height:H.height,outer:il(E.x,E.z,E.w||.3,E.d||.3,E.rotation||0,H.grow),inner:H.ring?C[z].poly:null})});let R=[];for(let E of b)for(let z of E.rooms)R.push({name:"entry",room:z,height:1.3,center:E.mid,radius:Zm,door:E.id});let P=[...u.flat(),...l.flatMap(E=>E.points),...(e.outdoor||[]).flatMap(E=>E.points||[])],S=P.map(E=>E[0]),M=P.map(E=>E[1]),I={x0:Math.min(...S)-.4,x1:Math.max(...S)+.4,z0:Math.min(...M)-.4,z1:Math.max(...M)+.4},L={floor:{id:e.id,name:e.name??e.id,height:o},rooms:l,bands:u,faces:f,segments:m,doors:b,windows:p,glass:x,freeWalls:v,furniture:C,zones:T,entryZones:R,cells:{},bounds:I,outdoor:e.outdoor||[]};return Object.defineProperty(L,"subs",{value:h,enumerable:!1}),L.cells["0.1"]=Hr(L,.1),L.cells["0.2"]=Hr(L,.2),L}function Hr(i,t){let e=[],n=[...i.bands.map(s=>({p:s,b:al(s)})),...i.freeWalls.map(s=>({p:s.poly,b:al(s.poly)}))];for(let s of i.rooms){let r=al(s.points);for(let o=0;;o++){let a=r[0]+t*(o+.5);if(a>=r[1])break;for(let l=0;;l++){let c=r[2]+t*(l+.5);if(c>=r[3])break;if(!Me(a,c,s.points))continue;let h=!1;for(let{p:d,b:u}of n)if(u[0]<=a&&a<=u[1]&&u[2]<=c&&c<=u[3]&&Me(a,c,d)){h=!0;break}h||e.push({x:Math.round(a*1e6)/1e6,z:Math.round(c*1e6)/1e6,room:s.id})}}}return e}function al(i){let t=1/0,e=-1/0,n=1/0,s=-1/0;for(let r of i)t=Math.min(t,r[0]),e=Math.max(e,r[0]),n=Math.min(n,r[1]),s=Math.max(s,r[1]);return[t,e,n,s]}function Wr(i,t){let e=String(t);return i.cells[e]||Object.defineProperty(i.cells,e,{value:Hr(i,t),enumerable:!1,writable:!0,configurable:!0}),i.cells[e]}var cl={heights:[.5,.9,1.3],doors:"open",thin_db:10,cell:.1};function Ks(i){let t={...cl,...i||{}};return(!Array.isArray(t.heights)||!t.heights.length)&&(t.heights=cl.heights),t}function Yi(i,t=Tn){let e=t.profiles||[],n=e.find(o=>o.id===i.profile)||e.find(o=>o.id==="custom")||e[0],s={...i};s.mount==null&&(s.mount=n.mounts&&n.mounts[0]||"wall");let r=s.mount==="ceiling"?n.ceiling:null;return s.fov_h==null&&(s.fov_h=r?r.fov:n.fov_h),s.reach==null&&(s.reach=r?r.reach:n.reach),s.fov_v==null&&(n.fov_v==null?(s.fov_v=t.default_fov_v??90,s.fov_v_assumed=!0):s.fov_v=n.fov_v),r&&s.ceiling_fov==null&&(s.ceiling_fov=r.fov),s.tilt==null&&(s.tilt=s.mount==="ceiling"?90:0),s.active==null&&(s.active=!0),s}function hl(i){return i.fov_h!=null&&i.fov_v!=null&&i.reach!=null&&i.mount!=null?i:Yi(i,Tn)}var ll=1e-9;function Xr(i){let t=Number(i.fov_h),e=Number(i.fov_v),n={x:Number(i.x),y:Number(i.height??1.9),z:Number(i.z),reach:Number(i.reach),ceiling:i.mount==="ceiling",degH:t/2,degV:e/2,degC:(i.ceiling_fov?Number(i.ceiling_fov):Math.max(t,e))/2,halfH:0,halfV:0,halfC:0,fx:0,fy:0,fz:0,rx:0,rz:0,ux:0,uy:0,uz:0,d:0};n.halfH=n.degH*_i,n.halfV=n.degV*_i,n.halfC=n.degC*_i;let s=(i.phi||0)*_i,r=(i.tilt||0)*_i,o=Math.cos(s),a=Math.sin(s),l=Math.cos(r),c=Math.sin(r);return n.fx=o*l,n.fy=-c,n.fz=a*l,n.rx=-a,n.rz=o,n.ux=o*c,n.uy=l,n.uz=a*c,n}function qr(i,t,e,n){let s=Math.sqrt(t*t+e*e+n*n);if(i.d=s,s<1e-6)return 0;if(i.ceiling){let h=Math.acos(qi(-e/s,-1,1));return h>i.halfC+ll?0:1-.4*qi((h*Zs-(i.degC-15))/15,0,1)}let r=t*i.fx+e*i.fy+n*i.fz;if(r<=0)return 0;let o=t*i.rx+n*i.rz,a=Math.abs(Math.atan2(o,r));if(a>i.halfH+ll)return 0;let l=t*i.ux+e*i.uy+n*i.uz,c=Math.abs(Math.atan2(l,Math.hypot(r,o)));return c>i.halfV+ll?0:(1-.4*qi((a*Zs-(i.degH-15))/15,0,1))*(1-.4*qi((c*Zs-(i.degV-10))/10,0,1))}function tg(i,t,e,n){if(t<=0||e>i.reach*t*n)return 0;let s=.58*i.reach;return e<=s?1:1-.4*(e-s)/(i.reach-s)}var qu=new WeakMap;function Js(i,t){let e=Ks(t),n=typeof e.doors=="object"?JSON.stringify(e.doors):String(e.doors),s=`${e.thin_db}|${n}`,r=qu.get(i);if(r||qu.set(i,r=new Map),r.has(s))return r.get(s);let o=i.segments,a=o.length,l={n:a,ax:new Float64Array(a),az:new Float64Array(a),bx:new Float64Array(a),bz:new Float64Array(a),db:new Float64Array(a),x0:new Float64Array(a),x1:new Float64Array(a),z0:new Float64Array(a),z1:new Float64Array(a),doorSegs:[],blockers:[],obstacles:[]};o.forEach((c,h)=>{l.ax[h]=c.a[0],l.az[h]=c.a[1],l.bx[h]=c.b[0],l.bz[h]=c.b[1],l.db[h]=c.k==="block"?1/0:c.k==="brick"?Gu:e.thin_db,l.x0[h]=Math.min(c.a[0],c.b[0]),l.x1[h]=Math.max(c.a[0],c.b[0]),l.z0[h]=Math.min(c.a[1],c.b[1]),l.z1[h]=Math.max(c.a[1],c.b[1])}),i.doors.forEach((c,h)=>{let d=e.doors==="open"?!0:e.doors==="closed"?!1:e.doors?.[c.id]!==!1;l.doorSegs.push({idx:h,id:c.id,ax:c.a[0],az:c.a[1],bx:c.b[0],bz:c.b[1],db:d?0:Wu})});for(let c of i.freeWalls)c.block&&l.blockers.push(rl(c.poly));for(let c of i.furniture)c.obstacle&&l.obstacles.push({P:rl(c.poly),h:c.h});return l.tmp=new Float64Array(3),r.set(s,l),l}function Yr(i,t,e,n,s){let r=0,o=Math.min(t,n),a=Math.max(t,n),l=Math.min(e,s),c=Math.max(e,s);for(let h=0;h<i.n;h++)if(!(i.x1[h]<o||i.x0[h]>a||i.z1[h]<l||i.z0[h]>c)&&nl(t,e,n,s,i.ax[h],i.az[h],i.bx[h],i.bz[h])){if(i.db[h]===1/0)return 1/0;r+=i.db[h]}for(let h of i.doorSegs)h.db&&nl(t,e,n,s,h.ax,h.az,h.bx,h.bz)&&(r+=h.db);for(let h of i.blockers)if(ol(h,t,e,n,s,i.tmp)&&!i.tmp[2])return 1/0;return r}function Zr(i,t,e,n,s,r,o){let a=0;for(let l of i.obstacles){if(!ol(l.P,t,n,s,o,i.tmp)||i.tmp[2])continue;let c=e+(r-e)*i.tmp[0],h=e+(r-e)*i.tmp[1];Math.min(c,h)<l.h&&(a+=Xu)}return a}var Yu=new WeakMap;function Kr(i,t){let e=Yu.get(i);if(e)return e;let n=i.length,s=new Float64Array(n),r=new Float64Array(n),o=new Int32Array(n),a=new Map(t.rooms.map((l,c)=>[l.id,c]));return i.forEach((l,c)=>{s[c]=l.x,r[c]=l.z,o[c]=a.get(l.room)}),e={n,x:s,z:r,room:o},Yu.set(i,e),e}function ul(i,t,e,n,s,r,o,a){let l=a.length,c=o.length*l,h=new Float64Array(c),d=new Float64Array(c),u=new Float64Array(c),f=new Float64Array(c),m=new Int32Array(c),_=new Int8Array(c),g=0;for(let p=0;p<o.length;p++){let b=o[p],x=r.x[b],v=r.z[b],C=x-t,T=v-n;if(C*C+T*T>s*s)continue;let R=Yr(i,t,n,x,v);if(R!==1/0)for(let P=0;P<l;P++){let S=a[P],M=S-e;if(C*C+T*T+M*M>s*s)continue;let I=R+(i.obstacles.length?Zr(i,t,e,n,x,S,v):0);h[g]=C,d[g]=M,u[g]=T,f[g]=I?Math.pow(10,-I/20):1,m[g]=b,_[g]=P,g++}}return{n:g,nH:l,vx:h,vy:d,vz:u,att:f,ci:m,hi:_}}function dl(i,t,e){for(let n=0;n<i.n;n++){let s=qr(t,i.vx[n],i.vy[n],i.vz[n]);e[n]=s?tg(t,s,t.d,i.att[n]):0}return e}function Zu(i,t,e){for(let n of i.rooms)if(Me(t,e,n.points))return n.id;return null}function Jr(i,t){let e=hl(t);if(e.mount==="ceiling"||!i.glass.length)return 0;let n=Math.max(10,Number(e.fov_h)/2-10),s=e.phi||0,r=Number(e.reach),o=0;for(let a of i.glass)for(let l=0;l<=10;l++){let c=a.a[0]+(a.b[0]-a.a[0])*l/10,h=a.a[1]+(a.b[1]-a.a[1])*l/10,d=c-e.x,u=h-e.z,f=Math.hypot(d,u);f<.3||f>r||Math.abs((Math.atan2(u,d)*Zs-s+540)%360-180)>n||(o+=Math.abs(d*a.n[0]+u*a.n[1])/f*(1-f/r)/11)}return o}var Qs=1.3,js=i=>String(i);function eg(i,t){return(t||[]).filter(e=>e.active!==!1&&(e.floor_id==null||e.floor_id===i.floor.id)).map(e=>hl(e))}function fl(i,t){let e=new Map,n=r=>{let o=`${r.name}|${r.room}`;e.has(o)||e.set(o,{name:r.name,room:r.room,height:r.height,parts:[]}),e.get(o).parts.push(r)};i.zones.forEach(n),i.entryZones.forEach(n);let s=[...e.values()];for(let r of s){r.idx=[];for(let o=0;o<t.length;o++){let a=t[o];if(a.room===r.room){for(let l of r.parts)if(l.center?Math.hypot(a.x-l.center[0],a.z-l.center[1])<l.radius:Me(a.x,a.z,l.outer)&&!(l.inner&&Me(a.x,a.z,l.inner))){r.idx.push(o);break}}}}return s}function pl(i,t,e){let n=Ks(e),s=Js(i,n),r=Js(i,{...n,doors:"open"}),o=Wr(i,n.cell),a=Kr(o,i),l=o.length,c=i.rooms.length,h=eg(i,t),d=h.length,u=h.map(L=>Xr(L)),f=h.map(L=>Zu(i,L.x,L.z)),m=new Int32Array(l);for(let L=0;L<l;L++)m[L]=L;let _=new Map(i.rooms.map((L,E)=>[L.id,E])),g=f.map(L=>L==null?-1:_.get(L)),p=new Array(c).fill(0);for(let L=0;L<l;L++)p[a.room[L]]++;let b=new Map,x=(L,E)=>{let z=`${L}|${E.join(",")}`;if(b.has(z))return b.get(z);let H=u[L],N=E.length,X=ul(s,H.x,H.y,H.z,H.reach,a,m,E),F=dl(X,H,new Float64Array(X.n)),tt=new Float32Array(l*N);for(let J=0;J<X.n;J++)F[J]>0&&(tt[X.ci[J]*N+X.hi[J]]=F[J]);return b.set(z,tt),tt},v=new Map,C=(L,E)=>{let z=`${L}|${E.join(",")}`;if(v.has(z))return v.get(z);let H=u[L],N=E.length,X=ul(r,H.x,H.y,H.z,H.reach,a,m,E),F=dl(X,H,new Float64Array(X.n)),tt=new Float32Array(l*N);for(let J=0;J<X.n;J++)F[J]>0&&(tt[X.ci[J]*N+X.hi[J]]=F[J]);return v.set(z,tt),tt},T={},R={};h.forEach((L,E)=>{R[L.entity_id]={room:f[E],glass:be(Jr(i,L)),spill:{}}});let P=h.map((L,E)=>C(E,[Qs])),S=i.rooms.map(()=>[]);for(let L=0;L<l;L++)S[a.room[L]].push(L);i.rooms.forEach((L,E)=>{let z=S[E],H=z.length,N=[];for(let V=0;V<d;V++)g[V]===E&&N.push(V);let X={},F={},tt=N.map(V=>x(V,n.heights));n.heights.forEach((V,Z)=>{if(!H){X[js(V)]=0,F[js(V)]=0;return}let rt=0,nt=0;for(let mt of z){let St=0;for(let Lt of tt){let ee=Lt[mt*n.heights.length+Z];ee>St&&(St=ee)}rt+=St,St>0&&nt++}X[js(V)]=be(rt/H),F[js(V)]=be(nt/H)});let J=Object.values(X),ct={},pt=new Uint8Array(H);for(let V=0;V<d;V++){if(g[V]===E)continue;let Z=0;z.forEach((nt,mt)=>{P[V][nt]>0&&(Z++,pt[mt]=1)});let rt=H?be(Z/H):0;ct[h[V].entity_id]=rt,R[h[V].entity_id].spill[L.id]=rt}let Et=0;for(let V=0;V<H;V++)Et+=pt[V];T[L.id]={coverage:X,coverage_mean:J.length?be(J.reduce((V,Z)=>V+Z,0)/J.length):0,seen:F,misfire_risk:H?be(Et/H):0,from:ct,own_sensors:N.map(V=>h[V].entity_id)}});let M=[];for(let L of fl(i,o)){if(!L.idx.length)continue;let E=_.get(L.room),z=[];for(let N=0;N<d;N++)g[N]===E&&z.push(x(N,[L.height]));let H=0;for(let N of L.idx)z.some(X=>X[N]>0)&&H++;M.push({name:L.name,room:L.room,height:L.height,share:be(H/L.idx.length)})}let I={rooms:T,sensors:R,zones:M,grid:{}};if(n.grid)for(let L of n.heights){let E=[],z=n.heights.indexOf(L);i.rooms.forEach((H,N)=>{let X=[];for(let F=0;F<d;F++)g[F]===N&&X.push(F);for(let F of S[N]){let tt=0,J=null;for(let pt of X){let Et=x(pt,n.heights)[F*n.heights.length+z];Et>tt&&(tt=Et,J=h[pt].entity_id)}let ct=[];for(let pt=0;pt<d;pt++)g[pt]!==N&&C(pt,[L])[F]>0&&ct.push(h[pt].entity_id);E.push({x:be(o[F].x),z:be(o[F].z),room:H.id,own:be(tt),own_sensor:J,spill:ct})}}),I.grid[js(L)]=E}return I}var ng=.1,tr=.03,Zi=.5,ig=1.9,sg=10,Ku=70,ed=10,Ju=30,rg=[-5,-2.5,2.5,5],og=20,ag=.4,lg=3,cg=2,hg=.3,ug=3,dg=["flur","hall","corridor","diele","entry","entrance","eingang","vorraum","lobby"],fg=5;function pg(i){let t=`${i.id??""} ${i.name??""}`.toLowerCase();return dg.some(e=>t.includes(e))}var nd=(i,t,e)=>{let n=[];for(let s=i;s<=t;s+=e)n.push(s);return n};function ju(i,t,e,n){if(Me(i,t,e))return!0;for(let s=0;s<e.length;s++)if(Hu(i,t,e[s],e[(s+1)%e.length])<n)return!0;return!1}function mg(i,t,e,n,s){let r=e.heights.length?e.heights:[Qs],o=r.length,a=i.rooms.indexOf(t),l=[];for(let m=0;m<n.length;m++)s.room[m]===a&&l.push(m);let c=l.length,h=new Map;for(let m of l){let _=new Map;for(let g of r)_.set(g,[1/o,1/(c*o)]);h.set(m,_)}let d=c;for(let m of fl(i,n)){if(m.room!==t.id)continue;let _=m.name==="entry"?cg:lg;d+=_*m.idx.length;for(let g of m.idx){let p=h.get(g);p.has(m.height)||p.set(m.height,[0,0]),p.get(m.height)[0]+=_}}d=d||1;let u={cx:[],cz:[],py:[],ws:[],wp:[]};for(let m of l)for(let[_,[g,p]]of h.get(m))u.cx.push(n[m].x),u.cz.push(n[m].z),u.py.push(_),u.ws.push(g/d),u.wp.push(p);let f={rooms:[],n:[],mult:[],cx:[],cz:[],sr:[]};return i.rooms.forEach((m,_)=>{if(m.id===t.id)return;let g=[];for(let b=0;b<n.length;b++)s.room[b]===_&&g.push(b);if(!g.length)return;let p=f.rooms.length;f.rooms.push(m.id),f.n.push(g.length),f.mult.push(pg(m)?ug:1);for(let b of g)f.cx.push(n[b].x),f.cz.push(n[b].z),f.sr.push(p)}),{own:u,spill:f}}function gg(i,t,e,n,s,r){let o=r*r,a=[],l=t.own,c=NaN,h=NaN,d=0;for(let m=0;m<l.cx.length;m++){let _=l.cx[m],g=l.cz[m],p=l.py[m],b=_-e,x=p-n,v=g-s,C=b*b+x*x+v*v;if(C>o||C<1e-12||((_!==c||g!==h)&&(d=Yr(i,e,s,_,g),c=_,h=g),d===1/0))continue;let T=d+Zr(i,e,n,s,_,p,g),R=Math.pow(10,-T/20),P=Math.sqrt(C);P>r*R||a.push(b,x,v,P,R,l.ws[m],l.wp[m])}let u=[],f=t.spill;for(let m=0;m<f.cx.length;m++){let _=f.cx[m],g=f.cz[m],p=_-e,b=Qs-n,x=g-s,v=p*p+b*b+x*x;if(v>o||v<1e-12)continue;let C=Yr(i,e,s,_,g);if(C===1/0)continue;let T=C+Zr(i,e,n,s,_,Qs,g),R=Math.pow(10,-T/20),P=Math.sqrt(v);P>r*R||u.push(p,b,x,P,R,f.sr[m])}return{own:a,spill:u}}function Qu(i,t,e,n,s,r){let o={...n,phi:s},a=Xr(o),l=a.reach,c=.58*l,h=l-c,d=0,u=0,f=e.own;for(let x=0;x<f.length;x+=7){let v=qr(a,f[x],f[x+1],f[x+2]),C=f[x+3];if(!v||C>l*v*f[x+4])continue;let T=C<=c?1:1-.4*(C-c)/h;d+=f[x+5]*T,u+=f[x+6]*T}let m=new Array(t.spill.rooms.length).fill(0),_=e.spill;for(let x=0;x<_.length;x+=6){let v=qr(a,_[x],_[x+1],_[x+2]);!v||_[x+3]>l*v*_[x+4]||m[_[x+5]]++}let g={},p=0;m.forEach((x,v)=>{if(!x)return;let C=x/t.spill.n[v];g[t.spill.rooms[v]]=C,p+=t.spill.mult[v]*C});let b=Jr(i,o);return{phi:Vu(s),score:d-r*p-hg*b,coverage:u,spill:g,glass:b}}function id(i,t,e,n){if(!Me(e,n,t.points))return!0;for(let s of i.bands){let r=sd(s);if(r[0]<=e&&e<=r[1]&&r[2]<=n&&n<=r[3]&&Me(e,n,s))return!0}for(let s of i.freeWalls)if(ju(e,n,s.poly,.05))return!0;for(let s of[...i.doors,...i.windows]){let r=s.a,o=s.b,a=Math.hypot(o[0]-r[0],o[1]-r[1])||1,l=(o[0]-r[0])/a,c=(o[1]-r[1])/a,h=(e-r[0])*l+(n-r[1])*c,d=Math.abs((e-r[0])*c-(n-r[1])*l);if(h>=-.15&&h<=a+.15&&d<.5)return!0}for(let s of i.furniture)if(s.h>=1.5&&!String(s.type).startsWith("lamp")&&ju(e,n,s.poly,.08))return!0;return!1}function sd(i){let t=1/0,e=-1/0,n=1/0,s=-1/0;for(let r of i)t=Math.min(t,r[0]),e=Math.max(e,r[0]),n=Math.min(n,r[1]),s=Math.max(s,r[1]);return[t,e,n,s]}function _g(i,t){let e=[],n=i.subs.filter(r=>r.room===t.id),s=t.points;for(let r=0;r<s.length;r++){let o=n.filter(h=>h.edge===r).sort((h,d)=>h.t0-d.t0);if(!o.length)continue;let a=s[r],l=o[0].u,c=o[o.length-1].t1;for(let h=0;;h++){let d=tr+ng*h;if(d>c-tr+1e-9)break;let u=o.find(p=>p.t0-1e-9<=d&&d<=p.t1+1e-9);if(!u||u.wallT<=0)continue;let f=(u.shared?u.wallT/2:0)+tr,m=a[0]+l[0]*d+u.n[0]*f,_=a[1]+l[1]*d+u.n[1]*f;if(id(i,t,m,_))continue;let g=Math.atan2(u.n[1],u.n[0])*180/Math.PI;e.push({x:m,z:_,mount:"wall",phis:nd(-Ku,Ku,ed).map(p=>g+p)})}}return e}function xg(i,t){let e=[],n=t.points,s=n.length,r=0;for(let a=0;a<s;a++){let l=n[(a+s-1)%s];r+=l[0]*n[a][1]-n[a][0]*l[1]}let o=i.subs.filter(a=>a.room===t.id);for(let a=0;a<s;a++){let l=o.filter(R=>R.edge===(a+s-1)%s),c=o.filter(R=>R.edge===a);if(!l.length||!c.length)continue;let h=l.reduce((R,P)=>P.t1>R.t1?P:R),d=c.reduce((R,P)=>P.t0<R.t0?P:R);if(h.wallT<=0||d.wallT<=0)continue;let u=h.u,f=d.u;if((u[0]*f[1]-u[1]*f[0])*r<=0)continue;let m=h.n,_=d.n,g=m[0]*_[1]-m[1]*_[0];if(Math.abs(g)<.2)continue;let p=(h.shared?h.wallT/2:0)+tr,b=(d.shared?d.wallT/2:0)+tr,x=n[a],v=x[0]+(p*_[1]-b*m[1])/g,C=x[1]+(m[0]*b-_[0]*p)/g;if(id(i,t,v,C))continue;let T=Math.atan2(m[1]+_[1],m[0]+_[0])*180/Math.PI;e.push({x:v,z:C,mount:"corner",phis:nd(-Ju,Ju,ed).map(R=>T+R)})}return e}function vg(i,t){let e=[],[n,s,r,o]=sd(t.points);for(let a=Math.ceil(n/Zi-1e-9);a*Zi<=s;a++){let l=a*Zi;for(let c=Math.ceil(r/Zi-1e-9);c*Zi<=o;c++){let h=c*Zi;Me(l,h,t.points)&&(i.bands.some(d=>Me(l,h,d))||i.freeWalls.some(d=>Me(l,h,d.poly))||e.push({x:l,z:h,mount:"ceiling",phis:[0]}))}}return e}var td=(i,t)=>t.best.score-i.best.score||i.cand.x-t.cand.x||i.cand.z-t.cand.z||i.best.phi-t.best.phi;function ml(i,t,e,n,s=1,r=Tn,o=null){let a=Ks(n),l=i.rooms.find(x=>x.id===t);if(!l)throw new Error(`room not found: ${t}`);let c=(r.profiles||[]).find(x=>x.id===e)||(r.profiles||[]).find(x=>x.id==="custom"),h=Js(i,{...a,doors:"open"}),d=Wr(i,a.cell),u=Kr(d,i),f=mg(i,l,a,d,u),m=c.mounts||["wall"],_=[];m.includes("wall")&&_.push(..._g(i,l)),m.includes("corner")&&_.push(...xg(i,l)),m.includes("ceiling")&&_.push(...vg(i,l));let g=Math.min(ig,l.height-.1),p=[];_.forEach((x,v)=>{let C=x.mount==="ceiling",T=C?l.height:g,R=C?90:sg,P=Yi({entity_id:"candidate",profile:c.id,mount:x.mount,x:x.x,z:x.z,height:T,tilt:R,phi:0},r),S=gg(h,f,x.x,T,x.z,Number(P.reach)),M=null;for(let I of x.phis){let L=Qu(i,f,S,P,I,s);(M===null||L.score>M.score+1e-12)&&(M=L)}p.push({cand:x,tpl:P,data:S,best:M,height:T,tilt:R}),o&&v%10===0&&o(.9*(v+1)/_.length)}),p.sort(td);for(let x of p.slice(0,og)){if(x.cand.mount==="ceiling")continue;let v=x.best;for(let C of rg){let T=Qu(i,f,x.data,x.tpl,v.phi+C,s);T.score>x.best.score+1e-12&&(x.best=T)}}p.sort(td);let b=[];for(let x of p){let v=x.cand;if(b.some(R=>Math.hypot(v.x-R.x,v.z-R.z)<ag))continue;let C=x.best,T={};for(let[R,P]of Object.entries(C.spill))T[R]=be(P);if(b.push({x:be(v.x),z:be(v.z),height:be(x.height),phi:Math.round(C.phi*100)/100,tilt:x.tilt,mount:v.mount,score:be(C.score),coverage:be(C.coverage),spill:T,glass:be(C.glass)}),b.length>=fg)break}return o&&o(1),b}var ch="170",Ui={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ni={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},yg=0,rd=1,bg=2;var mf=1,Mg=2,Ln=3,ni=0,Ge=1,we=2,ti=0,ds=1,od=2,ad=3,ld=4,wg=5,Ei=100,Sg=101,Eg=102,Ag=103,Tg=104,Rg=200,Cg=201,Pg=202,Ig=203,ql=204,Yl=205,Dg=206,Lg=207,Ug=208,Ng=209,Og=210,kg=211,Fg=212,zg=213,Bg=214,Zl=0,Kl=1,Jl=2,_s=3,jl=4,Ql=5,tc=6,ec=7,hh=0,Vg=1,$g=2,ei=0,Hg=1,Gg=2,Wg=3,Xg=4,qg=5,Yg=6,Zg=7;var gf=300,xs=301,vs=302,nc=303,ic=304,ia=306,sc=1e3,Ti=1001,rc=1002,Oe=1003,Kg=1004;var jr=1005;var gn=1006,gl=1007;var Ri=1008;var cn=1009,_f=1010,xf=1011,hr=1012,uh=1013,Ci=1014,Un=1015,gr=1016,dh=1017,fh=1018,ys=1020,vf=35902,yf=1021,bf=1022,Ke=1023,Mf=1024,wf=1025,fs=1026,bs=1027,Sf=1028,ph=1029,Ef=1030,mh=1031;var gh=1033,Ao=33776,To=33777,Ro=33778,Co=33779,oc=35840,ac=35841,lc=35842,cc=35843,hc=36196,uc=37492,dc=37496,fc=37808,pc=37809,mc=37810,gc=37811,_c=37812,xc=37813,vc=37814,yc=37815,bc=37816,Mc=37817,wc=37818,Sc=37819,Ec=37820,Ac=37821,Po=36492,Tc=36494,Rc=36495,Af=36283,Cc=36284,Pc=36285,Ic=36286;var Io=2300,Dc=2301,_l=2302,cd=2400,hd=2401,ud=2402;var Jg=3200,jg=3201;var Tf=0,Qg=1,jn="",Ue="srgb",As="srgb-linear",sa="linear",ne="srgb";var Ki=7680;var dd=519,t_=512,e_=513,n_=514,Rf=515,i_=516,s_=517,r_=518,o_=519,fd=35044;var pd="300 es",Nn=2e3,Do=2001,kn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],md=1234567,ps=Math.PI/180,ur=180/Math.PI;function Ts(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(De[i&255]+De[i>>8&255]+De[i>>16&255]+De[i>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]).toLowerCase()}function Ne(i,t,e){return Math.max(t,Math.min(e,i))}function _h(i,t){return(i%t+t)%t}function a_(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function l_(i,t,e){return i!==t?(e-i)/(t-i):0}function lr(i,t,e){return(1-e)*i+e*t}function c_(i,t,e,n){return lr(i,t,1-Math.exp(-e*n))}function h_(i,t=1){return t-Math.abs(_h(i,t*2)-t)}function u_(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function d_(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function f_(i,t){return i+Math.floor(Math.random()*(t-i+1))}function p_(i,t){return i+Math.random()*(t-i)}function m_(i){return i*(.5-Math.random())}function g_(i){i!==void 0&&(md=i);let t=md+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function __(i){return i*ps}function x_(i){return i*ur}function v_(i){return(i&i-1)===0&&i!==0}function y_(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function b_(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function M_(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*d,l*u,a*c);break;case"YZY":i.set(l*u,a*h,l*d,a*c);break;case"ZXZ":i.set(l*d,l*u,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function hs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ke(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Cf={DEG2RAD:ps,RAD2DEG:ur,generateUUID:Ts,clamp:Ne,euclideanModulo:_h,mapLinear:a_,inverseLerp:l_,lerp:lr,damp:c_,pingpong:h_,smoothstep:u_,smootherstep:d_,randInt:f_,randFloat:p_,randFloatSpread:m_,seededRandom:g_,degToRad:__,radToDeg:x_,isPowerOfTwo:v_,ceilPowerOfTwo:y_,floorPowerOfTwo:b_,setQuaternionFromProperEuler:M_,normalize:ke,denormalize:hs},It=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ot=class i{constructor(t,e,n,s,r,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],b=s[1],x=s[4],v=s[7],C=s[2],T=s[5],R=s[8];return r[0]=o*_+a*b+l*C,r[3]=o*g+a*x+l*T,r[6]=o*p+a*v+l*R,r[1]=c*_+h*b+d*C,r[4]=c*g+h*x+d*T,r[7]=c*p+h*v+d*R,r[2]=u*_+f*b+m*C,r[5]=u*g+f*x+m*T,r[8]=u*p+f*v+m*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,m=e*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=d*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=u*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(xl.makeScale(t,e)),this}rotate(t){return this.premultiply(xl.makeRotation(-t)),this}translate(t,e){return this.premultiply(xl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},xl=new Ot;function Pf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Lo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function w_(){let i=Lo("canvas");return i.style.display="block",i}var gd={};function or(i){i in gd||(gd[i]=!0,console.warn(i))}function S_(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function E_(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function A_(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var qt={enabled:!0,workingColorSpace:As,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ne&&(i.r=On(i.r),i.g=On(i.g),i.b=On(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ne&&(i.r=ms(i.r),i.g=ms(i.g),i.b=ms(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===jn?sa:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function On(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ms(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var _d=[.64,.33,.3,.6,.15,.06],xd=[.2126,.7152,.0722],vd=[.3127,.329],yd=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bd=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[As]:{primaries:_d,whitePoint:vd,transfer:sa,toXYZ:yd,fromXYZ:bd,luminanceCoefficients:xd,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:_d,whitePoint:vd,transfer:ne,toXYZ:yd,fromXYZ:bd,luminanceCoefficients:xd,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}});var Ji,Lc=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ji===void 0&&(Ji=Lo("canvas")),Ji.width=t.width,Ji.height=t.height;let n=Ji.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ji}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Lo("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=On(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(On(e[n]/255)*255):e[n]=On(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},T_=0,Uo=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:T_++}),this.uuid=Ts(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(vl(s[o].image)):r.push(vl(s[o]))}else r=vl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function vl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Lc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var R_=0,Je=class i extends kn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Ti,s=Ti,r=gn,o=Ri,a=Ke,l=cn,c=i.DEFAULT_ANISOTROPY,h=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:R_++}),this.uuid=Ts(),this.name="",this.source=new Uo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case sc:t.x=t.x-Math.floor(t.x);break;case Ti:t.x=t.x<0?0:1;break;case rc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case sc:t.y=t.y-Math.floor(t.y);break;case Ti:t.y=t.y<0?0:1;break;case rc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Je.DEFAULT_IMAGE=null;Je.DEFAULT_MAPPING=gf;Je.DEFAULT_ANISOTROPY=1;var ge=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,v=(f+1)/2,C=(p+1)/2,T=(h+u)/4,R=(d+_)/4,P=(m+g)/4;return x>v&&x>C?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=T/n,r=R/n):v>C?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=T/s,r=P/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=R/r,s=P/r),this.set(n,s,r,e),this}let b=Math.sqrt((g-m)*(g-m)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(g-m)/b,this.y=(d-_)/b,this.z=(u-h)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Uc=class extends kn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Je(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Uo(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Fn=class extends Uc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},No=class extends Je{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Nc=class extends Je{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var hn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=m,t[e+3]=_;return}if(d!==_||l!==u||c!==f||h!==m){let g=1-a,p=l*u+c*f+h*m+d*_,b=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){let C=Math.sqrt(x),T=Math.atan2(C,p*b);g=Math.sin(g*T)/C,a=Math.sin(a*T)/C}let v=a*b;if(l=l*g+u*v,c=c*g+f*v,h=h*g+m*v,d=d*g+_*v,g===1-a){let C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*d+l*f-c*u,t[e+1]=l*m+h*u+c*d-a*f,t[e+2]=c*m+h*f+a*u-l*d,t[e+3]=h*m-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),d=a(r/2),u=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ne(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Md.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Md.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return yl.copy(this).projectOnVector(t),this.sub(yl)}reflect(t){return this.sub(yl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},yl=new B,Md=new hn,Pi=class{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(rn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(rn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=rn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,rn):rn.fromBufferAttribute(r,o),rn.applyMatrix4(t.matrixWorld),this.expandByPoint(rn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Qr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qr.copy(n.boundingBox)),Qr.applyMatrix4(t.matrixWorld),this.union(Qr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,rn),rn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(er),to.subVectors(this.max,er),ji.subVectors(t.a,er),Qi.subVectors(t.b,er),ts.subVectors(t.c,er),Xn.subVectors(Qi,ji),qn.subVectors(ts,Qi),xi.subVectors(ji,ts);let e=[0,-Xn.z,Xn.y,0,-qn.z,qn.y,0,-xi.z,xi.y,Xn.z,0,-Xn.x,qn.z,0,-qn.x,xi.z,0,-xi.x,-Xn.y,Xn.x,0,-qn.y,qn.x,0,-xi.y,xi.x,0];return!bl(e,ji,Qi,ts,to)||(e=[1,0,0,0,1,0,0,0,1],!bl(e,ji,Qi,ts,to))?!1:(eo.crossVectors(Xn,qn),e=[eo.x,eo.y,eo.z],bl(e,ji,Qi,ts,to))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,rn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(rn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Rn=[new B,new B,new B,new B,new B,new B,new B,new B],rn=new B,Qr=new Pi,ji=new B,Qi=new B,ts=new B,Xn=new B,qn=new B,xi=new B,er=new B,to=new B,eo=new B,vi=new B;function bl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){vi.fromArray(i,r);let a=s.x*Math.abs(vi.x)+s.y*Math.abs(vi.y)+s.z*Math.abs(vi.z),l=t.dot(vi),c=e.dot(vi),h=n.dot(vi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var C_=new Pi,nr=new B,Ml=new B,Ms=class{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):C_.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;nr.subVectors(t,this.center);let e=nr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(nr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ml.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(nr.copy(t.center).add(Ml)),this.expandByPoint(nr.copy(t.center).sub(Ml))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Cn=new B,wl=new B,no=new B,Yn=new B,Sl=new B,io=new B,El=new B,Ii=class{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Cn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Cn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Cn.copy(this.origin).addScaledVector(this.direction,e),Cn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){wl.copy(t).add(e).multiplyScalar(.5),no.copy(e).sub(t).normalize(),Yn.copy(this.origin).sub(wl);let r=t.distanceTo(e)*.5,o=-this.direction.dot(no),a=Yn.dot(this.direction),l=-Yn.dot(no),c=Yn.lengthSq(),h=Math.abs(1-o*o),d,u,f,m;if(h>0)if(d=o*l-a,u=o*a-l,m=r*h,d>=0)if(u>=-m)if(u<=m){let _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(wl).addScaledVector(no,u),f}intersectSphere(t,e){Cn.subVectors(t.center,this.origin);let n=Cn.dot(this.direction),s=Cn.dot(Cn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Cn)!==null}intersectTriangle(t,e,n,s,r){Sl.subVectors(e,t),io.subVectors(n,t),El.crossVectors(Sl,io);let o=this.direction.dot(El),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yn.subVectors(this.origin,t);let l=a*this.direction.dot(io.crossVectors(Yn,io));if(l<0)return null;let c=a*this.direction.dot(Sl.cross(Yn));if(c<0||l+c>o)return null;let h=-a*Yn.dot(El);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ce=class i{constructor(t,e,n,s,r,o,a,l,c,h,d,u,f,m,_,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,d,u,f,m,_,g)}set(t,e,n,s,r,o,a,l,c,h,d,u,f,m,_,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/es.setFromMatrixColumn(t,0).length(),r=1/es.setFromMatrixColumn(t,1).length(),o=1/es.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,m=a*h,_=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+m*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,m=c*h,_=c*d;e[0]=u+_*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,m=c*h,_=c*d;e[0]=u-_*a,e[4]=-o*d,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,f=o*d,m=a*h,_=a*d;e[0]=l*h,e[4]=m*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,f=o*c,m=a*l,_=a*c;e[0]=l*h,e[4]=_-u*d,e[8]=m*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+m,e[10]=u-_*d}else if(t.order==="XZY"){let u=o*l,f=o*c,m=a*l,_=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=o*h,e[9]=f*d-m,e[2]=m*d-f,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(P_,t,I_)}lookAt(t,e,n){let s=this.elements;return Ye.subVectors(t,e),Ye.lengthSq()===0&&(Ye.z=1),Ye.normalize(),Zn.crossVectors(n,Ye),Zn.lengthSq()===0&&(Math.abs(n.z)===1?Ye.x+=1e-4:Ye.z+=1e-4,Ye.normalize(),Zn.crossVectors(n,Ye)),Zn.normalize(),so.crossVectors(Ye,Zn),s[0]=Zn.x,s[4]=so.x,s[8]=Ye.x,s[1]=Zn.y,s[5]=so.y,s[9]=Ye.y,s[2]=Zn.z,s[6]=so.z,s[10]=Ye.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],b=n[3],x=n[7],v=n[11],C=n[15],T=s[0],R=s[4],P=s[8],S=s[12],M=s[1],I=s[5],L=s[9],E=s[13],z=s[2],H=s[6],N=s[10],X=s[14],F=s[3],tt=s[7],J=s[11],ct=s[15];return r[0]=o*T+a*M+l*z+c*F,r[4]=o*R+a*I+l*H+c*tt,r[8]=o*P+a*L+l*N+c*J,r[12]=o*S+a*E+l*X+c*ct,r[1]=h*T+d*M+u*z+f*F,r[5]=h*R+d*I+u*H+f*tt,r[9]=h*P+d*L+u*N+f*J,r[13]=h*S+d*E+u*X+f*ct,r[2]=m*T+_*M+g*z+p*F,r[6]=m*R+_*I+g*H+p*tt,r[10]=m*P+_*L+g*N+p*J,r[14]=m*S+_*E+g*X+p*ct,r[3]=b*T+x*M+v*z+C*F,r[7]=b*R+x*I+v*H+C*tt,r[11]=b*P+x*L+v*N+C*J,r[15]=b*S+x*E+v*X+C*ct,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+r*l*d-s*c*d-r*a*u+n*c*u+s*a*f-n*l*f)+_*(+e*l*f-e*c*u+r*o*u-s*o*f+s*c*h-r*l*h)+g*(+e*c*d-e*a*f-r*o*d+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-e*l*d+e*a*u+s*o*d-n*o*u+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],m=t[12],_=t[13],g=t[14],p=t[15],b=d*g*c-_*u*c+_*l*f-a*g*f-d*l*p+a*u*p,x=m*u*c-h*g*c-m*l*f+o*g*f+h*l*p-o*u*p,v=h*_*c-m*d*c+m*a*f-o*_*f-h*a*p+o*d*p,C=m*d*l-h*_*l-m*a*u+o*_*u+h*a*g-o*d*g,T=e*b+n*x+s*v+r*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/T;return t[0]=b*R,t[1]=(_*u*r-d*g*r-_*s*f+n*g*f+d*s*p-n*u*p)*R,t[2]=(a*g*r-_*l*r+_*s*c-n*g*c-a*s*p+n*l*p)*R,t[3]=(d*l*r-a*u*r-d*s*c+n*u*c+a*s*f-n*l*f)*R,t[4]=x*R,t[5]=(h*g*r-m*u*r+m*s*f-e*g*f-h*s*p+e*u*p)*R,t[6]=(m*l*r-o*g*r-m*s*c+e*g*c+o*s*p-e*l*p)*R,t[7]=(o*u*r-h*l*r+h*s*c-e*u*c-o*s*f+e*l*f)*R,t[8]=v*R,t[9]=(m*d*r-h*_*r-m*n*f+e*_*f+h*n*p-e*d*p)*R,t[10]=(o*_*r-m*a*r+m*n*c-e*_*c-o*n*p+e*a*p)*R,t[11]=(h*a*r-o*d*r-h*n*c+e*d*c+o*n*f-e*a*f)*R,t[12]=C*R,t[13]=(h*_*s-m*d*s+m*n*u-e*_*u-h*n*g+e*d*g)*R,t[14]=(m*a*s-o*_*s-m*n*l+e*_*l+o*n*g-e*a*g)*R,t[15]=(o*d*s-h*a*s+h*n*l-e*d*l-o*n*u+e*a*u)*R,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,m=r*d,_=o*h,g=o*d,p=a*d,b=l*c,x=l*h,v=l*d,C=n.x,T=n.y,R=n.z;return s[0]=(1-(_+p))*C,s[1]=(f+v)*C,s[2]=(m-x)*C,s[3]=0,s[4]=(f-v)*T,s[5]=(1-(u+p))*T,s[6]=(g+b)*T,s[7]=0,s[8]=(m+x)*R,s[9]=(g-b)*R,s[10]=(1-(u+_))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=es.set(s[0],s[1],s[2]).length(),o=es.set(s[4],s[5],s[6]).length(),a=es.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],on.copy(this);let c=1/r,h=1/o,d=1/a;return on.elements[0]*=c,on.elements[1]*=c,on.elements[2]*=c,on.elements[4]*=h,on.elements[5]*=h,on.elements[6]*=h,on.elements[8]*=d,on.elements[9]*=d,on.elements[10]*=d,e.setFromRotationMatrix(on),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Nn){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),u=(n+s)/(n-s),f,m;if(a===Nn)f=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===Do)f=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Nn){let l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(o-r),u=(e+t)*c,f=(n+s)*h,m,_;if(a===Nn)m=(o+r)*d,_=-2*d;else if(a===Do)m=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},es=new B,on=new ce,P_=new B(0,0,0),I_=new B(1,1,1),Zn=new B,so=new B,Ye=new B,wd=new ce,Sd=new hn,xn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ne(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return wd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(wd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Sd.setFromEuler(this),this.setFromQuaternion(Sd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};xn.DEFAULT_ORDER="XYZ";var dr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},D_=0,Ed=new B,ns=new hn,Pn=new ce,ro=new B,ir=new B,L_=new B,U_=new hn,Ad=new B(1,0,0),Td=new B(0,1,0),Rd=new B(0,0,1),Cd={type:"added"},N_={type:"removed"},is={type:"childadded",child:null},Al={type:"childremoved",child:null},Ve=class i extends kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:D_++}),this.uuid=Ts(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new B,e=new xn,n=new hn,s=new B(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ce},normalMatrix:{value:new Ot}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ns.setFromAxisAngle(t,e),this.quaternion.multiply(ns),this}rotateOnWorldAxis(t,e){return ns.setFromAxisAngle(t,e),this.quaternion.premultiply(ns),this}rotateX(t){return this.rotateOnAxis(Ad,t)}rotateY(t){return this.rotateOnAxis(Td,t)}rotateZ(t){return this.rotateOnAxis(Rd,t)}translateOnAxis(t,e){return Ed.copy(t).applyQuaternion(this.quaternion),this.position.add(Ed.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ad,t)}translateY(t){return this.translateOnAxis(Td,t)}translateZ(t){return this.translateOnAxis(Rd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ro.copy(t):ro.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(ir,ro,this.up):Pn.lookAt(ro,ir,this.up),this.quaternion.setFromRotationMatrix(Pn),s&&(Pn.extractRotation(s.matrixWorld),ns.setFromRotationMatrix(Pn),this.quaternion.premultiply(ns.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Cd),is.child=t,this.dispatchEvent(is),is.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(N_),Al.child=t,this.dispatchEvent(Al),Al.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Cd),is.child=t,this.dispatchEvent(is),is.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,t,L_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,U_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ve.DEFAULT_UP=new B(0,1,0);Ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var an=new B,In=new B,Tl=new B,Dn=new B,ss=new B,rs=new B,Pd=new B,Rl=new B,Cl=new B,Pl=new B,Il=new ge,Dl=new ge,Ll=new ge,Qn=class i{constructor(t=new B,e=new B,n=new B){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),an.subVectors(t,e),s.cross(an);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){an.subVectors(s,e),In.subVectors(n,e),Tl.subVectors(t,e);let o=an.dot(an),a=an.dot(In),l=an.dot(Tl),c=In.dot(In),h=In.dot(Tl),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,m=(o*h-a*l)*u;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Dn.x),l.addScaledVector(o,Dn.y),l.addScaledVector(a,Dn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Il.setScalar(0),Dl.setScalar(0),Ll.setScalar(0),Il.fromBufferAttribute(t,e),Dl.fromBufferAttribute(t,n),Ll.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Il,r.x),o.addScaledVector(Dl,r.y),o.addScaledVector(Ll,r.z),o}static isFrontFacing(t,e,n,s){return an.subVectors(n,e),In.subVectors(t,e),an.cross(In).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return an.subVectors(this.c,this.b),In.subVectors(this.a,this.b),an.cross(In).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;ss.subVectors(s,n),rs.subVectors(r,n),Rl.subVectors(t,n);let l=ss.dot(Rl),c=rs.dot(Rl);if(l<=0&&c<=0)return e.copy(n);Cl.subVectors(t,s);let h=ss.dot(Cl),d=rs.dot(Cl);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(ss,o);Pl.subVectors(t,r);let f=ss.dot(Pl),m=rs.dot(Pl);if(m>=0&&f<=m)return e.copy(r);let _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(rs,a);let g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return Pd.subVectors(r,s),a=(d-h)/(d-h+(f-m)),e.copy(s).addScaledVector(Pd,a);let p=1/(g+_+u);return o=_*p,a=u*p,e.copy(n).addScaledVector(ss,o).addScaledVector(rs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},If={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},oo={h:0,s:0,l:0};function Ul(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var $t=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=qt.workingColorSpace){if(t=_h(t,1),e=Ne(e,0,1),n=Ne(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ul(o,r,t+1/3),this.g=Ul(o,r,t),this.b=Ul(o,r,t-1/3)}return qt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ue){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ue){let n=If[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=On(t.r),this.g=On(t.g),this.b=On(t.b),this}copyLinearToSRGB(t){return this.r=ms(t.r),this.g=ms(t.g),this.b=ms(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return qt.fromWorkingColorSpace(Le.copy(this),t),Math.round(Ne(Le.r*255,0,255))*65536+Math.round(Ne(Le.g*255,0,255))*256+Math.round(Ne(Le.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(Le.copy(this),e);let n=Le.r,s=Le.g,r=Le.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(Le.copy(this),e),t.r=Le.r,t.g=Le.g,t.b=Le.b,t}getStyle(t=Ue){qt.fromWorkingColorSpace(Le.copy(this),t);let e=Le.r,n=Le.g,s=Le.b;return t!==Ue?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Kn),this.setHSL(Kn.h+t,Kn.s+e,Kn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Kn),t.getHSL(oo);let n=lr(Kn.h,oo.h,e),s=lr(Kn.s,oo.s,e),r=lr(Kn.l,oo.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Le=new $t;$t.NAMES=If;var O_=0,ii=class extends kn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:O_++}),this.uuid=Ts(),this.name="",this.blending=ds,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ql,this.blendDst=Yl,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $t(0,0,0),this.blendAlpha=0,this.depthFunc=_s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ki,this.stencilZFail=Ki,this.stencilZPass=Ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ds&&(n.blending=this.blending),this.side!==ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ql&&(n.blendSrc=this.blendSrc),this.blendDst!==Yl&&(n.blendDst=this.blendDst),this.blendEquation!==Ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_s&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==dd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},vn=class extends ii{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=hh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ye=new B,ao=new It,Re=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=fd,this.updateRanges=[],this.gpuType=Un,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ao.fromBufferAttribute(this,e),ao.applyMatrix3(t),this.setXY(e,ao.x,ao.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=hs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ke(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=hs(e,this.array)),e}setX(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=hs(e,this.array)),e}setY(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=hs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=hs(e,this.array)),e}setW(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),n=ke(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),n=ke(n,this.array),s=ke(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),n=ke(n,this.array),s=ke(s,this.array),r=ke(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==fd&&(t.usage=this.usage),t}};var Oo=class extends Re{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ko=class extends Re{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Be=class extends Re{constructor(t,e,n){super(new Float32Array(t),e,n)}},k_=0,tn=new ce,Nl=new Ve,os=new B,Ze=new Pi,sr=new Pi,Te=new B,We=class i extends kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:k_++}),this.uuid=Ts(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Pf(t)?ko:Oo)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return Nl.lookAt(t),Nl.updateMatrix(),this.applyMatrix4(Nl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(os).negate(),this.translate(os.x,os.y,os.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Be(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Ze.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ms);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){let n=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];sr.setFromBufferAttribute(a),this.morphTargetsRelative?(Te.addVectors(Ze.min,sr.min),Ze.expandByPoint(Te),Te.addVectors(Ze.max,sr.max),Ze.expandByPoint(Te)):(Ze.expandByPoint(sr.min),Ze.expandByPoint(sr.max))}Ze.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Te.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Te));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Te.fromBufferAttribute(a,c),l&&(os.fromBufferAttribute(t,c),Te.add(os)),s=Math.max(s,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Re(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new B,l[P]=new B;let c=new B,h=new B,d=new B,u=new It,f=new It,m=new It,_=new B,g=new B;function p(P,S,M){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,M),u.fromBufferAttribute(r,P),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,M),h.sub(c),d.sub(c),f.sub(u),m.sub(u);let I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(I),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(I),a[P].add(_),a[S].add(_),a[M].add(_),l[P].add(g),l[S].add(g),l[M].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let P=0,S=b.length;P<S;++P){let M=b[P],I=M.start,L=M.count;for(let E=I,z=I+L;E<z;E+=3)p(t.getX(E+0),t.getX(E+1),t.getX(E+2))}let x=new B,v=new B,C=new B,T=new B;function R(P){C.fromBufferAttribute(s,P),T.copy(C);let S=a[P];x.copy(S),x.sub(C.multiplyScalar(C.dot(S))).normalize(),v.crossVectors(T,S);let I=v.dot(l[P])<0?-1:1;o.setXYZW(P,x.x,x.y,x.z,I)}for(let P=0,S=b.length;P<S;++P){let M=b[P],I=M.start,L=M.count;for(let E=I,z=I+L;E<z;E+=3)R(t.getX(E+0)),R(t.getX(E+1)),R(t.getX(E+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Re(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new B,r=new B,o=new B,a=new B,l=new B,c=new B,h=new B,d=new B;if(t)for(let u=0,f=t.count;u<f;u+=3){let m=t.getX(u+0),_=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,m=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)u[m++]=c[f++]}return new Re(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Id=new ce,yi=new Ii,lo=new Ms,Dd=new B,co=new B,ho=new B,uo=new B,Ol=new B,fo=new B,Ld=new B,po=new B,Pe=class extends Ve{constructor(t=new We,e=new vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){fo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(Ol.fromBufferAttribute(d,t),o?fo.addScaledVector(Ol,h):fo.addScaledVector(Ol.sub(e),h))}e.add(fo)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),lo.copy(n.boundingSphere),lo.applyMatrix4(r),yi.copy(t.ray).recast(t.near),!(lo.containsPoint(yi.origin)===!1&&(yi.intersectSphere(lo,Dd)===null||yi.origin.distanceToSquared(Dd)>(t.far-t.near)**2))&&(Id.copy(r).invert(),yi.copy(t.ray).applyMatrix4(Id),!(n.boundingBox!==null&&yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,yi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=u.length;m<_;m++){let g=u[m],p=o[g.materialIndex],b=Math.max(g.start,f.start),x=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let v=b,C=x;v<C;v+=3){let T=a.getX(v),R=a.getX(v+1),P=a.getX(v+2);s=mo(this,p,t,n,c,h,d,T,R,P),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let b=a.getX(g),x=a.getX(g+1),v=a.getX(g+2);s=mo(this,o,t,n,c,h,d,b,x,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,_=u.length;m<_;m++){let g=u[m],p=o[g.materialIndex],b=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=b,C=x;v<C;v+=3){let T=v,R=v+1,P=v+2;s=mo(this,p,t,n,c,h,d,T,R,P),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let b=g,x=g+1,v=g+2;s=mo(this,o,t,n,c,h,d,b,x,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function F_(i,t,e,n,s,r,o,a){let l;if(t.side===Ge?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===ni,a),l===null)return null;po.copy(a),po.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(po);return c<e.near||c>e.far?null:{distance:c,point:po.clone(),object:i}}function mo(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,co),i.getVertexPosition(l,ho),i.getVertexPosition(c,uo);let h=F_(i,t,e,n,co,ho,uo,Ld);if(h){let d=new B;Qn.getBarycoord(Ld,co,ho,uo,d),s&&(h.uv=Qn.getInterpolatedAttribute(s,a,l,c,d,new It)),r&&(h.uv1=Qn.getInterpolatedAttribute(r,a,l,c,d,new It)),o&&(h.normal=Qn.getInterpolatedAttribute(o,a,l,c,d,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new B,materialIndex:0};Qn.getNormal(co,ho,uo,u.normal),h.face=u,h.barycoord=d}return h}var si=class i extends We{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Be(c,3)),this.setAttribute("normal",new Be(h,3)),this.setAttribute("uv",new Be(d,2));function m(_,g,p,b,x,v,C,T,R,P,S){let M=v/R,I=C/P,L=v/2,E=C/2,z=T/2,H=R+1,N=P+1,X=0,F=0,tt=new B;for(let J=0;J<N;J++){let ct=J*I-E;for(let pt=0;pt<H;pt++){let Et=pt*M-L;tt[_]=Et*b,tt[g]=ct*x,tt[p]=z,c.push(tt.x,tt.y,tt.z),tt[_]=0,tt[g]=0,tt[p]=T>0?1:-1,h.push(tt.x,tt.y,tt.z),d.push(pt/R),d.push(1-J/P),X+=1}}for(let J=0;J<P;J++)for(let ct=0;ct<R;ct++){let pt=u+ct+H*J,Et=u+ct+H*(J+1),V=u+(ct+1)+H*(J+1),Z=u+(ct+1)+H*J;l.push(pt,Et,Z),l.push(Et,V,Z),F+=6}a.addGroup(f,F,S),f+=F,u+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ws(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Fe(i){let t={};for(let e=0;e<i.length;e++){let n=ws(i[e]);for(let s in n)t[s]=n[s]}return t}function z_(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Df(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}var B_={clone:ws,merge:Fe},V_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,yn=class extends ii{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=V_,this.fragmentShader=$_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ws(t.uniforms),this.uniformsGroups=z_(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Fo=class extends Ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=Nn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Jn=new B,Ud=new It,Nd=new It,ze=class extends Fo{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ur*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ur*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Jn.x,Jn.y).multiplyScalar(-t/Jn.z),Jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Jn.x,Jn.y).multiplyScalar(-t/Jn.z)}getViewSize(t,e){return this.getViewBounds(t,Ud,Nd),e.subVectors(Nd,Ud)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ps*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},as=-90,ls=1,Oc=class extends Ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ze(as,ls,t,e);s.layers=this.layers,this.add(s);let r=new ze(as,ls,t,e);r.layers=this.layers,this.add(r);let o=new ze(as,ls,t,e);o.layers=this.layers,this.add(o);let a=new ze(as,ls,t,e);a.layers=this.layers,this.add(a);let l=new ze(as,ls,t,e);l.layers=this.layers,this.add(l);let c=new ze(as,ls,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Nn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Do)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},zo=class extends Je{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:xs,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},kc=class extends Fn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new zo(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new si(5,5,5),r=new yn({name:"CubemapFromEquirect",uniforms:ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:ti});r.uniforms.tEquirect.value=e;let o=new Pe(s,r),a=e.minFilter;return e.minFilter===Ri&&(e.minFilter=gn),new Oc(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},kl=new B,H_=new B,G_=new Ot,ln=class{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=kl.subVectors(n,e).cross(H_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(kl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||G_.getNormalMatrix(t),s=this.coplanarPoint(kl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},bi=new Ms,go=new B,fr=class{constructor(t=new ln,e=new ln,n=new ln,s=new ln,r=new ln,o=new ln){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Nn){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],f=s[8],m=s[9],_=s[10],g=s[11],p=s[12],b=s[13],x=s[14],v=s[15];if(n[0].setComponents(l-r,u-c,g-f,v-p).normalize(),n[1].setComponents(l+r,u+c,g+f,v+p).normalize(),n[2].setComponents(l+o,u+h,g+m,v+b).normalize(),n[3].setComponents(l-o,u-h,g-m,v-b).normalize(),n[4].setComponents(l-a,u-d,g-_,v-x).normalize(),e===Nn)n[5].setComponents(l+a,u+d,g+_,v+x).normalize();else if(e===Do)n[5].setComponents(a,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),bi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),bi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(bi)}intersectsSprite(t){return bi.center.set(0,0,0),bi.radius=.7071067811865476,bi.applyMatrix4(t.matrixWorld),this.intersectsSphere(bi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(go.x=s.normal.x>0?t.max.x:t.min.x,go.y=s.normal.y>0?t.max.y:t.min.y,go.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(go)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Lf(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function W_(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){let m=d[u],_=d[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){let _=d[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Bo=class i extends We{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,d=t/a,u=e/l,f=[],m=[],_=[],g=[];for(let p=0;p<h;p++){let b=p*u-o;for(let x=0;x<c;x++){let v=x*d-r;m.push(v,-b,0),_.push(0,0,1),g.push(x/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){let x=b+c*p,v=b+c*(p+1),C=b+1+c*(p+1),T=b+1+c*p;f.push(x,v,T),f.push(v,C,T)}this.setIndex(f),this.setAttribute("position",new Be(m,3)),this.setAttribute("normal",new Be(_,3)),this.setAttribute("uv",new Be(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},X_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,q_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Y_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Z_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,K_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,J_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,j_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Q_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,t0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,e0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,n0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,i0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,s0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,r0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,o0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,a0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,l0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,c0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,u0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,d0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,f0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,p0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,m0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,g0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,_0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,x0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,v0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,y0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,b0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,M0="gl_FragColor = linearToOutputTexel( gl_FragColor );",w0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,S0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,E0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,A0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,T0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,R0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,C0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,P0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,I0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,D0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,L0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,U0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,N0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,O0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,k0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,F0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,z0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,B0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,V0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,H0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,G0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,W0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,X0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,q0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Y0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Z0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,K0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,J0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,j0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Q0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ex=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ix=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ox=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ax=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,lx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,hx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ux=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,px=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,mx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_x=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,bx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Sx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ex=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ax=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Rx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Cx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Px=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ix=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Lx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ux=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Nx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ox=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,zx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Bx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Vx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$x=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Gx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Wx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,jx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Qx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,tv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ev=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ov=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,av=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,dv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,fv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,gv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_v=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,yv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,wv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zt={alphahash_fragment:X_,alphahash_pars_fragment:q_,alphamap_fragment:Y_,alphamap_pars_fragment:Z_,alphatest_fragment:K_,alphatest_pars_fragment:J_,aomap_fragment:j_,aomap_pars_fragment:Q_,batching_pars_vertex:t0,batching_vertex:e0,begin_vertex:n0,beginnormal_vertex:i0,bsdfs:s0,iridescence_fragment:r0,bumpmap_pars_fragment:o0,clipping_planes_fragment:a0,clipping_planes_pars_fragment:l0,clipping_planes_pars_vertex:c0,clipping_planes_vertex:h0,color_fragment:u0,color_pars_fragment:d0,color_pars_vertex:f0,color_vertex:p0,common:m0,cube_uv_reflection_fragment:g0,defaultnormal_vertex:_0,displacementmap_pars_vertex:x0,displacementmap_vertex:v0,emissivemap_fragment:y0,emissivemap_pars_fragment:b0,colorspace_fragment:M0,colorspace_pars_fragment:w0,envmap_fragment:S0,envmap_common_pars_fragment:E0,envmap_pars_fragment:A0,envmap_pars_vertex:T0,envmap_physical_pars_fragment:F0,envmap_vertex:R0,fog_vertex:C0,fog_pars_vertex:P0,fog_fragment:I0,fog_pars_fragment:D0,gradientmap_pars_fragment:L0,lightmap_pars_fragment:U0,lights_lambert_fragment:N0,lights_lambert_pars_fragment:O0,lights_pars_begin:k0,lights_toon_fragment:z0,lights_toon_pars_fragment:B0,lights_phong_fragment:V0,lights_phong_pars_fragment:$0,lights_physical_fragment:H0,lights_physical_pars_fragment:G0,lights_fragment_begin:W0,lights_fragment_maps:X0,lights_fragment_end:q0,logdepthbuf_fragment:Y0,logdepthbuf_pars_fragment:Z0,logdepthbuf_pars_vertex:K0,logdepthbuf_vertex:J0,map_fragment:j0,map_pars_fragment:Q0,map_particle_fragment:tx,map_particle_pars_fragment:ex,metalnessmap_fragment:nx,metalnessmap_pars_fragment:ix,morphinstance_vertex:sx,morphcolor_vertex:rx,morphnormal_vertex:ox,morphtarget_pars_vertex:ax,morphtarget_vertex:lx,normal_fragment_begin:cx,normal_fragment_maps:hx,normal_pars_fragment:ux,normal_pars_vertex:dx,normal_vertex:fx,normalmap_pars_fragment:px,clearcoat_normal_fragment_begin:mx,clearcoat_normal_fragment_maps:gx,clearcoat_pars_fragment:_x,iridescence_pars_fragment:xx,opaque_fragment:vx,packing:yx,premultiplied_alpha_fragment:bx,project_vertex:Mx,dithering_fragment:wx,dithering_pars_fragment:Sx,roughnessmap_fragment:Ex,roughnessmap_pars_fragment:Ax,shadowmap_pars_fragment:Tx,shadowmap_pars_vertex:Rx,shadowmap_vertex:Cx,shadowmask_pars_fragment:Px,skinbase_vertex:Ix,skinning_pars_vertex:Dx,skinning_vertex:Lx,skinnormal_vertex:Ux,specularmap_fragment:Nx,specularmap_pars_fragment:Ox,tonemapping_fragment:kx,tonemapping_pars_fragment:Fx,transmission_fragment:zx,transmission_pars_fragment:Bx,uv_pars_fragment:Vx,uv_pars_vertex:$x,uv_vertex:Hx,worldpos_vertex:Gx,background_vert:Wx,background_frag:Xx,backgroundCube_vert:qx,backgroundCube_frag:Yx,cube_vert:Zx,cube_frag:Kx,depth_vert:Jx,depth_frag:jx,distanceRGBA_vert:Qx,distanceRGBA_frag:tv,equirect_vert:ev,equirect_frag:nv,linedashed_vert:iv,linedashed_frag:sv,meshbasic_vert:rv,meshbasic_frag:ov,meshlambert_vert:av,meshlambert_frag:lv,meshmatcap_vert:cv,meshmatcap_frag:hv,meshnormal_vert:uv,meshnormal_frag:dv,meshphong_vert:fv,meshphong_frag:pv,meshphysical_vert:mv,meshphysical_frag:gv,meshtoon_vert:_v,meshtoon_frag:xv,points_vert:vv,points_frag:yv,shadow_vert:bv,shadow_frag:Mv,sprite_vert:wv,sprite_frag:Sv},ot={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},mn={basic:{uniforms:Fe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Fe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new $t(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Fe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Fe([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Fe([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new $t(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Fe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Fe([ot.points,ot.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Fe([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Fe([ot.common,ot.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Fe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Fe([ot.sprite,ot.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:Fe([ot.common,ot.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:Fe([ot.lights,ot.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};mn.physical={uniforms:Fe([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};var _o={r:0,b:0,g:0},Mi=new xn,Ev=new ce;function Av(i,t,e,n,s,r,o){let a=new $t(0),l=r===!0?0:1,c,h,d=null,u=0,f=null;function m(b){let x=b.isScene===!0?b.background:null;return x&&x.isTexture&&(x=(b.backgroundBlurriness>0?e:t).get(x)),x}function _(b){let x=!1,v=m(b);v===null?p(a,l):v&&v.isColor&&(p(v,1),x=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(b,x){let v=m(x);v&&(v.isCubeTexture||v.mapping===ia)?(h===void 0&&(h=new Pe(new si(1,1,1),new yn({name:"BackgroundCubeMaterial",uniforms:ws(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Mi.copy(x.backgroundRotation),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ev.makeRotationFromEuler(Mi)),h.material.toneMapped=qt.getTransfer(v.colorSpace)!==ne,(d!==v||u!==v.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=v,u=v.version,f=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Pe(new Bo(2,2),new yn({name:"BackgroundMaterial",uniforms:ws(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=qt.getTransfer(v.colorSpace)!==ne,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||u!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=v,u=v.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,x){b.getRGB(_o,Df(i)),n.buffers.color.setClear(_o.r,_o.g,_o.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(b,x=1){a.set(b),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:_,addToRenderList:g}}function Tv(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(M,I,L,E,z){let H=!1,N=d(E,L,I);r!==N&&(r=N,c(r.object)),H=f(M,E,L,z),H&&m(M,E,L,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,v(M,I,L,E),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function d(M,I,L){let E=L.wireframe===!0,z=n[M.id];z===void 0&&(z={},n[M.id]=z);let H=z[I.id];H===void 0&&(H={},z[I.id]=H);let N=H[E];return N===void 0&&(N=u(l()),H[E]=N),N}function u(M){let I=[],L=[],E=[];for(let z=0;z<e;z++)I[z]=0,L[z]=0,E[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:L,attributeDivisors:E,object:M,attributes:{},index:null}}function f(M,I,L,E){let z=r.attributes,H=I.attributes,N=0,X=L.getAttributes();for(let F in X)if(X[F].location>=0){let J=z[F],ct=H[F];if(ct===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(ct=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(ct=M.instanceColor)),J===void 0||J.attribute!==ct||ct&&J.data!==ct.data)return!0;N++}return r.attributesNum!==N||r.index!==E}function m(M,I,L,E){let z={},H=I.attributes,N=0,X=L.getAttributes();for(let F in X)if(X[F].location>=0){let J=H[F];J===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(J=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(J=M.instanceColor));let ct={};ct.attribute=J,J&&J.data&&(ct.data=J.data),z[F]=ct,N++}r.attributes=z,r.attributesNum=N,r.index=E}function _(){let M=r.newAttributes;for(let I=0,L=M.length;I<L;I++)M[I]=0}function g(M){p(M,0)}function p(M,I){let L=r.newAttributes,E=r.enabledAttributes,z=r.attributeDivisors;L[M]=1,E[M]===0&&(i.enableVertexAttribArray(M),E[M]=1),z[M]!==I&&(i.vertexAttribDivisor(M,I),z[M]=I)}function b(){let M=r.newAttributes,I=r.enabledAttributes;for(let L=0,E=I.length;L<E;L++)I[L]!==M[L]&&(i.disableVertexAttribArray(L),I[L]=0)}function x(M,I,L,E,z,H,N){N===!0?i.vertexAttribIPointer(M,I,L,z,H):i.vertexAttribPointer(M,I,L,E,z,H)}function v(M,I,L,E){_();let z=E.attributes,H=L.getAttributes(),N=I.defaultAttributeValues;for(let X in H){let F=H[X];if(F.location>=0){let tt=z[X];if(tt===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(tt=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(tt=M.instanceColor)),tt!==void 0){let J=tt.normalized,ct=tt.itemSize,pt=t.get(tt);if(pt===void 0)continue;let Et=pt.buffer,V=pt.type,Z=pt.bytesPerElement,rt=V===i.INT||V===i.UNSIGNED_INT||tt.gpuType===uh;if(tt.isInterleavedBufferAttribute){let nt=tt.data,mt=nt.stride,St=tt.offset;if(nt.isInstancedInterleavedBuffer){for(let Lt=0;Lt<F.locationSize;Lt++)p(F.location+Lt,nt.meshPerAttribute);M.isInstancedMesh!==!0&&E._maxInstanceCount===void 0&&(E._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let Lt=0;Lt<F.locationSize;Lt++)g(F.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let Lt=0;Lt<F.locationSize;Lt++)x(F.location+Lt,ct/F.locationSize,V,J,mt*Z,(St+ct/F.locationSize*Lt)*Z,rt)}else{if(tt.isInstancedBufferAttribute){for(let nt=0;nt<F.locationSize;nt++)p(F.location+nt,tt.meshPerAttribute);M.isInstancedMesh!==!0&&E._maxInstanceCount===void 0&&(E._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let nt=0;nt<F.locationSize;nt++)g(F.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let nt=0;nt<F.locationSize;nt++)x(F.location+nt,ct/F.locationSize,V,J,ct*Z,ct/F.locationSize*nt*Z,rt)}}else if(N!==void 0){let J=N[X];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(F.location,J);break;case 3:i.vertexAttrib3fv(F.location,J);break;case 4:i.vertexAttrib4fv(F.location,J);break;default:i.vertexAttrib1fv(F.location,J)}}}}b()}function C(){P();for(let M in n){let I=n[M];for(let L in I){let E=I[L];for(let z in E)h(E[z].object),delete E[z];delete I[L]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;let I=n[M.id];for(let L in I){let E=I[L];for(let z in E)h(E[z].object),delete E[z];delete I[L]}delete n[M.id]}function R(M){for(let I in n){let L=n[I];if(L[M.id]===void 0)continue;let E=L[M.id];for(let z in E)h(E[z].object),delete E[z];delete L[M.id]}}function P(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:S,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:g,disableUnusedAttributes:b}}function Rv(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let m=0;m<d;m++)f+=h[m];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],h[m],u[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let m=0;for(let _=0;_<d;_++)m+=h[_]*u[_];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Cv(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Ke&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let P=R===gr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==cn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Un&&!P)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=m>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:b,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:C,maxSamples:T}}function Pv(i){let t=this,e=null,n=0,s=!1,r=!1,o=new ln,a=new Ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let m=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{let b=r?0:n,x=b*4,v=p.clippingState||null;l.value=v,v=h(m,u,x,f);for(let C=0;C!==x;++C)v[C]=e[C];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,m){let _=d!==null?d.length:0,g=null;if(_!==0){if(g=l.value,m!==!0||g===null){let p=f+_*4,b=u.matrixWorldInverse;a.getNormalMatrix(b),(g===null||g.length<p)&&(g=new Float32Array(p));for(let x=0,v=f;x!==_;++x,v+=4)o.copy(d[x]).applyMatrix4(b,a),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function Iv(i){let t=new WeakMap;function e(o,a){return a===nc?o.mapping=xs:a===ic&&(o.mapping=vs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===nc||a===ic)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new kc(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Vo=class extends Fo{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},us=4,Od=[.125,.215,.35,.446,.526,.582],Ai=20,Fl=new Vo,kd=new $t,zl=null,Bl=0,Vl=0,$l=!1,Si=(1+Math.sqrt(5))/2,cs=1/Si,Fd=[new B(-Si,cs,0),new B(Si,cs,0),new B(-cs,0,Si),new B(cs,0,Si),new B(0,Si,-cs),new B(0,Si,cs),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)],$o=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){zl=this._renderer.getRenderTarget(),Bl=this._renderer.getActiveCubeFace(),Vl=this._renderer.getActiveMipmapLevel(),$l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(zl,Bl,Vl),this._renderer.xr.enabled=$l,t.scissorTest=!1,xo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xs||t.mapping===vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),zl=this._renderer.getRenderTarget(),Bl=this._renderer.getActiveCubeFace(),Vl=this._renderer.getActiveMipmapLevel(),$l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:gr,format:Ke,colorSpace:As,depthBuffer:!1},s=zd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zd(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dv(r)),this._blurMaterial=Lv(r,t,e)}return s}_compileMaterial(t){let e=new Pe(this._lodPlanes[0],t);this._renderer.compile(e,Fl)}_sceneToCubeUV(t,e,n,s){let a=new ze(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(kd),h.toneMapping=ei,h.autoClear=!1;let f=new vn({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1}),m=new Pe(new si,f),_=!1,g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,_=!0):(f.color.copy(kd),_=!0);for(let p=0;p<6;p++){let b=p%3;b===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):b===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));let x=this._cubeSize;xo(s,b*x,p>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(m,a),h.render(t,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=g}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===xs||t.mapping===vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bd());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Pe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;xo(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Fl)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Fd[(s-r-1)%Fd.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new Pe(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ai-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):Ai;g>Ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ai}`);let p=[],b=0;for(let R=0;R<Ai;++R){let P=R/_,S=Math.exp(-P*P/2);p.push(S),R===0?b+=S:R<g&&(b+=2*S)}for(let R=0;R<p.length;R++)p[R]=p[R]/b;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:x}=this;u.dTheta.value=m,u.mipInt.value=x-n;let v=this._sizeLods[s],C=3*v*(s>x-us?s-x+us:0),T=4*(this._cubeSize-v);xo(e,C,T,3*v,2*v),l.setRenderTarget(e),l.render(d,Fl)}};function Dv(i){let t=[],e=[],n=[],s=i,r=i-us+1+Od.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>i-us?l=Od[o-i+us-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,m=6,_=3,g=2,p=1,b=new Float32Array(_*m*f),x=new Float32Array(g*m*f),v=new Float32Array(p*m*f);for(let T=0;T<f;T++){let R=T%3*2/3-1,P=T>2?0:-1,S=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];b.set(S,_*m*T),x.set(u,g*m*T);let M=[T,T,T,T,T,T];v.set(M,p*m*T)}let C=new We;C.setAttribute("position",new Re(b,_)),C.setAttribute("uv",new Re(x,g)),C.setAttribute("faceIndex",new Re(v,p)),t.push(C),s>us&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function zd(i,t,e){let n=new Fn(i,t,e);return n.texture.mapping=ia,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xo(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Lv(i,t,e){let n=new Float32Array(Ai),s=new B(0,1,0);return new yn({name:"SphericalGaussianBlur",defines:{n:Ai,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:xh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Bd(){return new yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Vd(){return new yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function xh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Uv(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===nc||l===ic,h=l===xs||l===vs;if(c||h){let d=t.get(a),u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new $o(i)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new $o(i)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Nv(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&or("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Ov(i,t,e,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let m in u.attributes)t.remove(u.attributes[m]);for(let m in u.morphAttributes){let _=u.morphAttributes[m];for(let g=0,p=_.length;g<p;g++)t.remove(_[g])}u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let m in u)t.update(u[m],i.ARRAY_BUFFER);let f=d.morphAttributes;for(let m in f){let _=f[m];for(let g=0,p=_.length;g<p;g++)t.update(_[g],i.ARRAY_BUFFER)}}function c(d){let u=[],f=d.index,m=d.attributes.position,_=0;if(f!==null){let b=f.array;_=f.version;for(let x=0,v=b.length;x<v;x+=3){let C=b[x+0],T=b[x+1],R=b[x+2];u.push(C,T,T,R,R,C)}}else if(m!==void 0){let b=m.array;_=m.version;for(let x=0,v=b.length/3-1;x<v;x+=3){let C=x+0,T=x+1,R=x+2;u.push(C,T,T,R,R,C)}}else return;let g=new(Pf(u)?ko:Oo)(u,1);g.version=_;let p=r.get(d);p&&t.remove(p),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function kv(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*o),e.update(f,n,1)}function c(u,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,u*o,m),e.update(f,n,m))}function h(u,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function d(u,f,m,_){if(m===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<u.length;p++)c(u[p]/o,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,m);let p=0;for(let b=0;b<m;b++)p+=f[b]*_[b];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Fv(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function zv(i,t,e){let n=new WeakMap,s=new ge;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let S=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],x=0;f===!0&&(x=1),m===!0&&(x=2),_===!0&&(x=3);let v=a.attributes.position.count*x,C=1;v>t.maxTextureSize&&(C=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let T=new Float32Array(v*C*4*d),R=new No(T,v,C,d);R.type=Un,R.needsUpdate=!0;let P=x*4;for(let M=0;M<d;M++){let I=g[M],L=p[M],E=b[M],z=v*C*4*M;for(let H=0;H<I.count;H++){let N=H*P;f===!0&&(s.fromBufferAttribute(I,H),T[z+N+0]=s.x,T[z+N+1]=s.y,T[z+N+2]=s.z,T[z+N+3]=0),m===!0&&(s.fromBufferAttribute(L,H),T[z+N+4]=s.x,T[z+N+5]=s.y,T[z+N+6]=s.z,T[z+N+7]=0),_===!0&&(s.fromBufferAttribute(E,H),T[z+N+8]=s.x,T[z+N+9]=s.y,T[z+N+10]=s.z,T[z+N+11]=E.itemSize===4?s.w:1)}}u={count:d,texture:R,size:new It(v,C)},n.set(a,u),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Bv(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Ho=class extends Je{constructor(t,e,n,s,r,o,a,l,c,h=fs){if(h!==fs&&h!==bs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===fs&&(n=Ci),n===void 0&&h===bs&&(n=ys),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Oe,this.minFilter=l!==void 0?l:Oe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Uf=new Je,$d=new Ho(1,1),Nf=new No,Of=new Nc,kf=new zo,Hd=[],Gd=[],Wd=new Float32Array(16),Xd=new Float32Array(9),qd=new Float32Array(4);function Rs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Hd[s];if(r===void 0&&(r=new Float32Array(s),Hd[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Se(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ee(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ra(i,t){let e=Gd[t];e===void 0&&(e=new Int32Array(t),Gd[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Vv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function $v(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2fv(this.addr,t),Ee(e,t)}}function Hv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Se(e,t))return;i.uniform3fv(this.addr,t),Ee(e,t)}}function Gv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4fv(this.addr,t),Ee(e,t)}}function Wv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(Se(e,n))return;qd.set(n),i.uniformMatrix2fv(this.addr,!1,qd),Ee(e,n)}}function Xv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(Se(e,n))return;Xd.set(n),i.uniformMatrix3fv(this.addr,!1,Xd),Ee(e,n)}}function qv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(Se(e,n))return;Wd.set(n),i.uniformMatrix4fv(this.addr,!1,Wd),Ee(e,n)}}function Yv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Zv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2iv(this.addr,t),Ee(e,t)}}function Kv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;i.uniform3iv(this.addr,t),Ee(e,t)}}function Jv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4iv(this.addr,t),Ee(e,t)}}function jv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Qv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2uiv(this.addr,t),Ee(e,t)}}function ty(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;i.uniform3uiv(this.addr,t),Ee(e,t)}}function ey(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4uiv(this.addr,t),Ee(e,t)}}function ny(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?($d.compareFunction=Rf,r=$d):r=Uf,e.setTexture2D(t||r,s)}function iy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Of,s)}function sy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||kf,s)}function ry(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Nf,s)}function oy(i){switch(i){case 5126:return Vv;case 35664:return $v;case 35665:return Hv;case 35666:return Gv;case 35674:return Wv;case 35675:return Xv;case 35676:return qv;case 5124:case 35670:return Yv;case 35667:case 35671:return Zv;case 35668:case 35672:return Kv;case 35669:case 35673:return Jv;case 5125:return jv;case 36294:return Qv;case 36295:return ty;case 36296:return ey;case 35678:case 36198:case 36298:case 36306:case 35682:return ny;case 35679:case 36299:case 36307:return iy;case 35680:case 36300:case 36308:case 36293:return sy;case 36289:case 36303:case 36311:case 36292:return ry}}function ay(i,t){i.uniform1fv(this.addr,t)}function ly(i,t){let e=Rs(t,this.size,2);i.uniform2fv(this.addr,e)}function cy(i,t){let e=Rs(t,this.size,3);i.uniform3fv(this.addr,e)}function hy(i,t){let e=Rs(t,this.size,4);i.uniform4fv(this.addr,e)}function uy(i,t){let e=Rs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function dy(i,t){let e=Rs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function fy(i,t){let e=Rs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function py(i,t){i.uniform1iv(this.addr,t)}function my(i,t){i.uniform2iv(this.addr,t)}function gy(i,t){i.uniform3iv(this.addr,t)}function _y(i,t){i.uniform4iv(this.addr,t)}function xy(i,t){i.uniform1uiv(this.addr,t)}function vy(i,t){i.uniform2uiv(this.addr,t)}function yy(i,t){i.uniform3uiv(this.addr,t)}function by(i,t){i.uniform4uiv(this.addr,t)}function My(i,t,e){let n=this.cache,s=t.length,r=ra(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Uf,r[o])}function wy(i,t,e){let n=this.cache,s=t.length,r=ra(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Of,r[o])}function Sy(i,t,e){let n=this.cache,s=t.length,r=ra(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||kf,r[o])}function Ey(i,t,e){let n=this.cache,s=t.length,r=ra(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Nf,r[o])}function Ay(i){switch(i){case 5126:return ay;case 35664:return ly;case 35665:return cy;case 35666:return hy;case 35674:return uy;case 35675:return dy;case 35676:return fy;case 5124:case 35670:return py;case 35667:case 35671:return my;case 35668:case 35672:return gy;case 35669:case 35673:return _y;case 5125:return xy;case 36294:return vy;case 36295:return yy;case 36296:return by;case 35678:case 36198:case 36298:case 36306:case 35682:return My;case 35679:case 36299:case 36307:return wy;case 35680:case 36300:case 36308:case 36293:return Sy;case 36289:case 36303:case 36311:case 36292:return Ey}}var Fc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=oy(e.type)}},zc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ay(e.type)}},Bc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Hl=/(\w+)(\])?(\[|\.)?/g;function Yd(i,t){i.seq.push(t),i.map[t.id]=t}function Ty(i,t,e){let n=i.name,s=n.length;for(Hl.lastIndex=0;;){let r=Hl.exec(n),o=Hl.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Yd(e,c===void 0?new Fc(a,i,t):new zc(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new Bc(a),Yd(e,d)),e=d}}}var gs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Ty(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Zd(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Ry=37297,Cy=0;function Py(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Kd=new Ot;function Iy(i){qt._getMatrix(Kd,qt.workingColorSpace,i);let t=`mat3( ${Kd.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case sa:return[t,"LinearTransferOETF"];case ne:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Jd(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Py(i.getShaderSource(t),o)}else return s}function Dy(i,t){let e=Iy(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Ly(i,t){let e;switch(t){case Hg:e="Linear";break;case Gg:e="Reinhard";break;case Wg:e="Cineon";break;case Xg:e="ACESFilmic";break;case Yg:e="AgX";break;case Zg:e="Neutral";break;case qg:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var vo=new B;function Uy(){qt.getLuminanceCoefficients(vo);let i=vo.x.toFixed(4),t=vo.y.toFixed(4),e=vo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ny(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ar).join(`
`)}function Oy(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ky(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ar(i){return i!==""}function jd(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Qd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Fy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vc(i){return i.replace(Fy,By)}var zy=new Map;function By(i,t){let e=zt[t];if(e===void 0){let n=zy.get(t);if(n!==void 0)e=zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Vc(e)}var Vy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tf(i){return i.replace(Vy,$y)}function $y(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ef(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Hy(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===mf?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Mg?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ln&&(t="SHADOWMAP_TYPE_VSM"),t}function Gy(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case xs:case vs:t="ENVMAP_TYPE_CUBE";break;case ia:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Wy(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case vs:t="ENVMAP_MODE_REFRACTION";break}return t}function Xy(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case hh:t="ENVMAP_BLENDING_MULTIPLY";break;case Vg:t="ENVMAP_BLENDING_MIX";break;case $g:t="ENVMAP_BLENDING_ADD";break}return t}function qy(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Yy(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Hy(e),c=Gy(e),h=Wy(e),d=Xy(e),u=qy(e),f=Ny(e),m=Oy(r),_=s.createProgram(),g,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ar).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ar).join(`
`),p.length>0&&(p+=`
`)):(g=[ef(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ar).join(`
`),p=[ef(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ei?"#define TONE_MAPPING":"",e.toneMapping!==ei?zt.tonemapping_pars_fragment:"",e.toneMapping!==ei?Ly("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,Dy("linearToOutputTexel",e.outputColorSpace),Uy(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ar).join(`
`)),o=Vc(o),o=jd(o,e),o=Qd(o,e),a=Vc(a),a=jd(a,e),a=Qd(a,e),o=tf(o),a=tf(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===pd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===pd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let x=b+g+o,v=b+p+a,C=Zd(s,s.VERTEX_SHADER,x),T=Zd(s,s.FRAGMENT_SHADER,v);s.attachShader(_,C),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(I){if(i.debug.checkShaderErrors){let L=s.getProgramInfoLog(_).trim(),E=s.getShaderInfoLog(C).trim(),z=s.getShaderInfoLog(T).trim(),H=!0,N=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,C,T);else{let X=Jd(s,C,"vertex"),F=Jd(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+L+`
`+X+`
`+F)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(E===""||z==="")&&(N=!1);N&&(I.diagnostics={runnable:H,programLog:L,vertexShader:{log:E,prefix:g},fragmentShader:{log:z,prefix:p}})}s.deleteShader(C),s.deleteShader(T),P=new gs(s,_),S=ky(s,_)}let P;this.getUniforms=function(){return P===void 0&&R(this),P};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,Ry)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Cy++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=T,this}var Zy=0,$c=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Hc(t),e.set(t,n)),n}},Hc=class{constructor(t){this.id=Zy++,this.code=t,this.usedTimes=0}};function Ky(i,t,e,n,s,r,o){let a=new dr,l=new $c,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures,f=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,M,I,L,E){let z=L.fog,H=E.geometry,N=S.isMeshStandardMaterial?L.environment:null,X=(S.isMeshStandardMaterial?e:t).get(S.envMap||N),F=X&&X.mapping===ia?X.image.height:null,tt=m[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let J=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ct=J!==void 0?J.length:0,pt=0;H.morphAttributes.position!==void 0&&(pt=1),H.morphAttributes.normal!==void 0&&(pt=2),H.morphAttributes.color!==void 0&&(pt=3);let Et,V,Z,rt;if(tt){let te=mn[tt];Et=te.vertexShader,V=te.fragmentShader}else Et=S.vertexShader,V=S.fragmentShader,l.update(S),Z=l.getVertexShaderID(S),rt=l.getFragmentShaderID(S);let nt=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),St=E.isInstancedMesh===!0,Lt=E.isBatchedMesh===!0,ee=!!S.map,Ht=!!S.matcap,fe=!!X,U=!!S.aoMap,_e=!!S.lightMap,kt=!!S.bumpMap,Vt=!!S.normalMap,Tt=!!S.displacementMap,Qt=!!S.emissiveMap,At=!!S.metalnessMap,A=!!S.roughnessMap,y=S.anisotropy>0,$=S.clearcoat>0,j=S.dispersion>0,et=S.iridescence>0,K=S.sheen>0,Mt=S.transmission>0,lt=y&&!!S.anisotropyMap,gt=$&&!!S.clearcoatMap,Xt=$&&!!S.clearcoatNormalMap,it=$&&!!S.clearcoatRoughnessMap,_t=et&&!!S.iridescenceMap,Rt=et&&!!S.iridescenceThicknessMap,Ct=K&&!!S.sheenColorMap,xt=K&&!!S.sheenRoughnessMap,Gt=!!S.specularMap,Ft=!!S.specularColorMap,re=!!S.specularIntensityMap,D=Mt&&!!S.transmissionMap,at=Mt&&!!S.thicknessMap,q=!!S.gradientMap,Q=!!S.alphaMap,dt=S.alphaTest>0,ht=!!S.alphaHash,Ut=!!S.extensions,me=ei;S.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(me=i.toneMapping);let Ie={shaderID:tt,shaderType:S.type,shaderName:S.name,vertexShader:Et,fragmentShader:V,defines:S.defines,customVertexShaderID:Z,customFragmentShaderID:rt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Lt,batchingColor:Lt&&E._colorsTexture!==null,instancing:St,instancingColor:St&&E.instanceColor!==null,instancingMorph:St&&E.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:As,alphaToCoverage:!!S.alphaToCoverage,map:ee,matcap:Ht,envMap:fe,envMapMode:fe&&X.mapping,envMapCubeUVHeight:F,aoMap:U,lightMap:_e,bumpMap:kt,normalMap:Vt,displacementMap:u&&Tt,emissiveMap:Qt,normalMapObjectSpace:Vt&&S.normalMapType===Qg,normalMapTangentSpace:Vt&&S.normalMapType===Tf,metalnessMap:At,roughnessMap:A,anisotropy:y,anisotropyMap:lt,clearcoat:$,clearcoatMap:gt,clearcoatNormalMap:Xt,clearcoatRoughnessMap:it,dispersion:j,iridescence:et,iridescenceMap:_t,iridescenceThicknessMap:Rt,sheen:K,sheenColorMap:Ct,sheenRoughnessMap:xt,specularMap:Gt,specularColorMap:Ft,specularIntensityMap:re,transmission:Mt,transmissionMap:D,thicknessMap:at,gradientMap:q,opaque:S.transparent===!1&&S.blending===ds&&S.alphaToCoverage===!1,alphaMap:Q,alphaTest:dt,alphaHash:ht,combine:S.combine,mapUv:ee&&_(S.map.channel),aoMapUv:U&&_(S.aoMap.channel),lightMapUv:_e&&_(S.lightMap.channel),bumpMapUv:kt&&_(S.bumpMap.channel),normalMapUv:Vt&&_(S.normalMap.channel),displacementMapUv:Tt&&_(S.displacementMap.channel),emissiveMapUv:Qt&&_(S.emissiveMap.channel),metalnessMapUv:At&&_(S.metalnessMap.channel),roughnessMapUv:A&&_(S.roughnessMap.channel),anisotropyMapUv:lt&&_(S.anisotropyMap.channel),clearcoatMapUv:gt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Xt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:xt&&_(S.sheenRoughnessMap.channel),specularMapUv:Gt&&_(S.specularMap.channel),specularColorMapUv:Ft&&_(S.specularColorMap.channel),specularIntensityMapUv:re&&_(S.specularIntensityMap.channel),transmissionMapUv:D&&_(S.transmissionMap.channel),thicknessMapUv:at&&_(S.thicknessMap.channel),alphaMapUv:Q&&_(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Vt||y),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:E.isPoints===!0&&!!H.attributes.uv&&(ee||Q),fog:!!z,useFog:S.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:mt,skinning:E.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ct,morphTextureStride:pt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:me,decodeVideoTexture:ee&&S.map.isVideoTexture===!0&&qt.getTransfer(S.map.colorSpace)===ne,decodeVideoTextureEmissive:Qt&&S.emissiveMap.isVideoTexture===!0&&qt.getTransfer(S.emissiveMap.colorSpace)===ne,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===we,flipSided:S.side===Ge,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ut&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&S.extensions.multiDraw===!0||Lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function p(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let I in S.defines)M.push(I),M.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(b(M,S),x(M,S),M.push(i.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function b(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function x(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){let M=m[S.type],I;if(M){let L=mn[M];I=B_.clone(L.uniforms)}else I=S.uniforms;return I}function C(S,M){let I;for(let L=0,E=h.length;L<E;L++){let z=h[L];if(z.cacheKey===M){I=z,++I.usedTimes;break}}return I===void 0&&(I=new Yy(i,M,S,r),h.push(I)),I}function T(S){if(--S.usedTimes===0){let M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function R(S){l.remove(S)}function P(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:C,releaseProgram:T,releaseShaderCache:R,programs:h,dispose:P}}function Jy(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function jy(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function nf(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function sf(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d,u,f,m,_,g){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:m,renderOrder:d.renderOrder,z:_,group:g},i[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=_,p.group=g),t++,p}function a(d,u,f,m,_,g){let p=o(d,u,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(d,u,f,m,_,g){let p=o(d,u,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||jy),n.length>1&&n.sort(u||nf),s.length>1&&s.sort(u||nf)}function h(){for(let d=t,u=i.length;d<u;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Qy(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new sf,i.set(n,[o])):s>=r.length?(o=new sf,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function tb(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new B,color:new $t};break;case"SpotLight":e={position:new B,direction:new B,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new $t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":e={color:new $t,position:new B,halfWidth:new B,halfHeight:new B};break}return i[t.id]=e,e}}}function eb(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var nb=0;function ib(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function sb(i){let t=new tb,e=eb(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new B);let s=new B,r=new ce,o=new ce;function a(c){let h=0,d=0,u=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,b=0,x=0,v=0,C=0,T=0,R=0;c.sort(ib);for(let S=0,M=c.length;S<M;S++){let I=c[S],L=I.color,E=I.intensity,z=I.distance,H=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=L.r*E,d+=L.g*E,u+=L.b*E;else if(I.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(I.sh.coefficients[N],E);R++}else if(I.isDirectionalLight){let N=t.get(I);if(N.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let X=I.shadow,F=e.get(I);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,n.directionalShadow[f]=F,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=I.shadow.matrix,b++}n.directional[f]=N,f++}else if(I.isSpotLight){let N=t.get(I);N.position.setFromMatrixPosition(I.matrixWorld),N.color.copy(L).multiplyScalar(E),N.distance=z,N.coneCos=Math.cos(I.angle),N.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),N.decay=I.decay,n.spot[_]=N;let X=I.shadow;if(I.map&&(n.spotLightMap[C]=I.map,C++,X.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[_]=X.matrix,I.castShadow){let F=e.get(I);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,n.spotShadow[_]=F,n.spotShadowMap[_]=H,v++}_++}else if(I.isRectAreaLight){let N=t.get(I);N.color.copy(L).multiplyScalar(E),N.halfWidth.set(I.width*.5,0,0),N.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=N,g++}else if(I.isPointLight){let N=t.get(I);if(N.color.copy(I.color).multiplyScalar(I.intensity),N.distance=I.distance,N.decay=I.decay,I.castShadow){let X=I.shadow,F=e.get(I);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,F.shadowCameraNear=X.camera.near,F.shadowCameraFar=X.camera.far,n.pointShadow[m]=F,n.pointShadowMap[m]=H,n.pointShadowMatrix[m]=I.shadow.matrix,x++}n.point[m]=N,m++}else if(I.isHemisphereLight){let N=t.get(I);N.skyColor.copy(I.color).multiplyScalar(E),N.groundColor.copy(I.groundColor).multiplyScalar(E),n.hemi[p]=N,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let P=n.hash;(P.directionalLength!==f||P.pointLength!==m||P.spotLength!==_||P.rectAreaLength!==g||P.hemiLength!==p||P.numDirectionalShadows!==b||P.numPointShadows!==x||P.numSpotShadows!==v||P.numSpotMaps!==C||P.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=R,P.directionalLength=f,P.pointLength=m,P.spotLength=_,P.rectAreaLength=g,P.hemiLength=p,P.numDirectionalShadows=b,P.numPointShadows=x,P.numSpotShadows=v,P.numSpotMaps=C,P.numLightProbes=R,n.version=nb++)}function l(c,h){let d=0,u=0,f=0,m=0,_=0,g=h.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){let x=c[p];if(x.isDirectionalLight){let v=n.directional[d];v.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),d++}else if(x.isSpotLight){let v=n.spot[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),f++}else if(x.isRectAreaLight){let v=n.rectArea[m];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),o.identity(),r.copy(x.matrixWorld),r.premultiply(g),o.extractRotation(r),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(x.isPointLight){let v=n.point[u];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),u++}else if(x.isHemisphereLight){let v=n.hemi[_];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:n}}function rf(i){let t=new sb(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function rb(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new rf(i),t.set(s,[a])):r>=o.length?(a=new rf(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Gc=class extends ii{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Jg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Wc=class extends ii{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},ob=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ab=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function lb(i,t,e){let n=new fr,s=new It,r=new It,o=new ge,a=new Gc({depthPacking:jg}),l=new Wc,c={},h=e.maxTextureSize,d={[ni]:Ge,[Ge]:ni,[we]:we},u=new yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:ob,fragmentShader:ab}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new We;m.setAttribute("position",new Re(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Pe(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mf;let p=this.type;this.render=function(T,R,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;let S=i.getRenderTarget(),M=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),L=i.state;L.setBlending(ti),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let E=p!==Ln&&this.type===Ln,z=p===Ln&&this.type!==Ln;for(let H=0,N=T.length;H<N;H++){let X=T[H],F=X.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);let tt=F.getFrameExtents();if(s.multiply(tt),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/tt.x),s.x=r.x*tt.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/tt.y),s.y=r.y*tt.y,F.mapSize.y=r.y)),F.map===null||E===!0||z===!0){let ct=this.type!==Ln?{minFilter:Oe,magFilter:Oe}:{};F.map!==null&&F.map.dispose(),F.map=new Fn(s.x,s.y,ct),F.map.texture.name=X.name+".shadowMap",F.camera.updateProjectionMatrix()}i.setRenderTarget(F.map),i.clear();let J=F.getViewportCount();for(let ct=0;ct<J;ct++){let pt=F.getViewport(ct);o.set(r.x*pt.x,r.y*pt.y,r.x*pt.z,r.y*pt.w),L.viewport(o),F.updateMatrices(X,ct),n=F.getFrustum(),v(R,P,F.camera,X,this.type)}F.isPointLightShadow!==!0&&this.type===Ln&&b(F,P),F.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(S,M,I)};function b(T,R){let P=t.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Fn(s.x,s.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(R,null,P,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(R,null,P,f,_,null)}function x(T,R,P,S){let M=null,I=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)M=I;else if(M=P.isPointLight===!0?l:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let L=M.uuid,E=R.uuid,z=c[L];z===void 0&&(z={},c[L]=z);let H=z[E];H===void 0&&(H=M.clone(),z[E]=H,R.addEventListener("dispose",C)),M=H}if(M.visible=R.visible,M.wireframe=R.wireframe,S===Ln?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:d[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let L=i.properties.get(M);L.light=P}return M}function v(T,R,P,S,M){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Ln)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);let E=t.update(T),z=T.material;if(Array.isArray(z)){let H=E.groups;for(let N=0,X=H.length;N<X;N++){let F=H[N],tt=z[F.materialIndex];if(tt&&tt.visible){let J=x(T,tt,S,M);T.onBeforeShadow(i,T,R,P,E,J,F),i.renderBufferDirect(P,null,E,J,T,F),T.onAfterShadow(i,T,R,P,E,J,F)}}}else if(z.visible){let H=x(T,z,S,M);T.onBeforeShadow(i,T,R,P,E,H,null),i.renderBufferDirect(P,null,E,H,T,null),T.onAfterShadow(i,T,R,P,E,H,null)}}let L=T.children;for(let E=0,z=L.length;E<z;E++)v(L[E],R,P,S,M)}function C(T){T.target.removeEventListener("dispose",C);for(let P in c){let S=c[P],M=T.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}var cb={[Zl]:Kl,[Jl]:tc,[jl]:ec,[_s]:Ql,[Kl]:Zl,[tc]:Jl,[ec]:jl,[Ql]:_s};function hb(i,t){function e(){let D=!1,at=new ge,q=null,Q=new ge(0,0,0,0);return{setMask:function(dt){q!==dt&&!D&&(i.colorMask(dt,dt,dt,dt),q=dt)},setLocked:function(dt){D=dt},setClear:function(dt,ht,Ut,me,Ie){Ie===!0&&(dt*=me,ht*=me,Ut*=me),at.set(dt,ht,Ut,me),Q.equals(at)===!1&&(i.clearColor(dt,ht,Ut,me),Q.copy(at))},reset:function(){D=!1,q=null,Q.set(-1,0,0,0)}}}function n(){let D=!1,at=!1,q=null,Q=null,dt=null;return{setReversed:function(ht){if(at!==ht){let Ut=t.get("EXT_clip_control");at?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT);let me=dt;dt=null,this.setClear(me)}at=ht},getReversed:function(){return at},setTest:function(ht){ht?nt(i.DEPTH_TEST):mt(i.DEPTH_TEST)},setMask:function(ht){q!==ht&&!D&&(i.depthMask(ht),q=ht)},setFunc:function(ht){if(at&&(ht=cb[ht]),Q!==ht){switch(ht){case Zl:i.depthFunc(i.NEVER);break;case Kl:i.depthFunc(i.ALWAYS);break;case Jl:i.depthFunc(i.LESS);break;case _s:i.depthFunc(i.LEQUAL);break;case jl:i.depthFunc(i.EQUAL);break;case Ql:i.depthFunc(i.GEQUAL);break;case tc:i.depthFunc(i.GREATER);break;case ec:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=ht}},setLocked:function(ht){D=ht},setClear:function(ht){dt!==ht&&(at&&(ht=1-ht),i.clearDepth(ht),dt=ht)},reset:function(){D=!1,q=null,Q=null,dt=null,at=!1}}}function s(){let D=!1,at=null,q=null,Q=null,dt=null,ht=null,Ut=null,me=null,Ie=null;return{setTest:function(te){D||(te?nt(i.STENCIL_TEST):mt(i.STENCIL_TEST))},setMask:function(te){at!==te&&!D&&(i.stencilMask(te),at=te)},setFunc:function(te,nn,Mn){(q!==te||Q!==nn||dt!==Mn)&&(i.stencilFunc(te,nn,Mn),q=te,Q=nn,dt=Mn)},setOp:function(te,nn,Mn){(ht!==te||Ut!==nn||me!==Mn)&&(i.stencilOp(te,nn,Mn),ht=te,Ut=nn,me=Mn)},setLocked:function(te){D=te},setClear:function(te){Ie!==te&&(i.clearStencil(te),Ie=te)},reset:function(){D=!1,at=null,q=null,Q=null,dt=null,ht=null,Ut=null,me=null,Ie=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},d={},u=new WeakMap,f=[],m=null,_=!1,g=null,p=null,b=null,x=null,v=null,C=null,T=null,R=new $t(0,0,0),P=0,S=!1,M=null,I=null,L=null,E=null,z=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,X=0,F=i.getParameter(i.VERSION);F.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=X>=1):F.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=X>=2);let tt=null,J={},ct=i.getParameter(i.SCISSOR_BOX),pt=i.getParameter(i.VIEWPORT),Et=new ge().fromArray(ct),V=new ge().fromArray(pt);function Z(D,at,q,Q){let dt=new Uint8Array(4),ht=i.createTexture();i.bindTexture(D,ht),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<q;Ut++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(at,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(at+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return ht}let rt={};rt[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),rt[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),rt[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(i.DEPTH_TEST),o.setFunc(_s),kt(!1),Vt(rd),nt(i.CULL_FACE),U(ti);function nt(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function mt(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function St(D,at){return d[D]!==at?(i.bindFramebuffer(D,at),d[D]=at,D===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=at),D===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=at),!0):!1}function Lt(D,at){let q=f,Q=!1;if(D){q=u.get(at),q===void 0&&(q=[],u.set(at,q));let dt=D.textures;if(q.length!==dt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let ht=0,Ut=dt.length;ht<Ut;ht++)q[ht]=i.COLOR_ATTACHMENT0+ht;q.length=dt.length,Q=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,Q=!0);Q&&i.drawBuffers(q)}function ee(D){return m!==D?(i.useProgram(D),m=D,!0):!1}let Ht={[Ei]:i.FUNC_ADD,[Sg]:i.FUNC_SUBTRACT,[Eg]:i.FUNC_REVERSE_SUBTRACT};Ht[Ag]=i.MIN,Ht[Tg]=i.MAX;let fe={[Rg]:i.ZERO,[Cg]:i.ONE,[Pg]:i.SRC_COLOR,[ql]:i.SRC_ALPHA,[Og]:i.SRC_ALPHA_SATURATE,[Ug]:i.DST_COLOR,[Dg]:i.DST_ALPHA,[Ig]:i.ONE_MINUS_SRC_COLOR,[Yl]:i.ONE_MINUS_SRC_ALPHA,[Ng]:i.ONE_MINUS_DST_COLOR,[Lg]:i.ONE_MINUS_DST_ALPHA,[kg]:i.CONSTANT_COLOR,[Fg]:i.ONE_MINUS_CONSTANT_COLOR,[zg]:i.CONSTANT_ALPHA,[Bg]:i.ONE_MINUS_CONSTANT_ALPHA};function U(D,at,q,Q,dt,ht,Ut,me,Ie,te){if(D===ti){_===!0&&(mt(i.BLEND),_=!1);return}if(_===!1&&(nt(i.BLEND),_=!0),D!==wg){if(D!==g||te!==S){if((p!==Ei||v!==Ei)&&(i.blendEquation(i.FUNC_ADD),p=Ei,v=Ei),te)switch(D){case ds:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case od:i.blendFunc(i.ONE,i.ONE);break;case ad:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ld:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ds:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case od:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ad:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ld:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}b=null,x=null,C=null,T=null,R.set(0,0,0),P=0,g=D,S=te}return}dt=dt||at,ht=ht||q,Ut=Ut||Q,(at!==p||dt!==v)&&(i.blendEquationSeparate(Ht[at],Ht[dt]),p=at,v=dt),(q!==b||Q!==x||ht!==C||Ut!==T)&&(i.blendFuncSeparate(fe[q],fe[Q],fe[ht],fe[Ut]),b=q,x=Q,C=ht,T=Ut),(me.equals(R)===!1||Ie!==P)&&(i.blendColor(me.r,me.g,me.b,Ie),R.copy(me),P=Ie),g=D,S=!1}function _e(D,at){D.side===we?mt(i.CULL_FACE):nt(i.CULL_FACE);let q=D.side===Ge;at&&(q=!q),kt(q),D.blending===ds&&D.transparent===!1?U(ti):U(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let Q=D.stencilWrite;a.setTest(Q),Q&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Qt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function kt(D){M!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),M=D)}function Vt(D){D!==yg?(nt(i.CULL_FACE),D!==I&&(D===rd?i.cullFace(i.BACK):D===bg?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):mt(i.CULL_FACE),I=D}function Tt(D){D!==L&&(N&&i.lineWidth(D),L=D)}function Qt(D,at,q){D?(nt(i.POLYGON_OFFSET_FILL),(E!==at||z!==q)&&(i.polygonOffset(at,q),E=at,z=q)):mt(i.POLYGON_OFFSET_FILL)}function At(D){D?nt(i.SCISSOR_TEST):mt(i.SCISSOR_TEST)}function A(D){D===void 0&&(D=i.TEXTURE0+H-1),tt!==D&&(i.activeTexture(D),tt=D)}function y(D,at,q){q===void 0&&(tt===null?q=i.TEXTURE0+H-1:q=tt);let Q=J[q];Q===void 0&&(Q={type:void 0,texture:void 0},J[q]=Q),(Q.type!==D||Q.texture!==at)&&(tt!==q&&(i.activeTexture(q),tt=q),i.bindTexture(D,at||rt[D]),Q.type=D,Q.texture=at)}function $(){let D=J[tt];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function et(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Mt(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function lt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function gt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Xt(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _t(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Rt(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ct(D){Et.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Et.copy(D))}function xt(D){V.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),V.copy(D))}function Gt(D,at){let q=c.get(at);q===void 0&&(q=new WeakMap,c.set(at,q));let Q=q.get(D);Q===void 0&&(Q=i.getUniformBlockIndex(at,D.name),q.set(D,Q))}function Ft(D,at){let Q=c.get(at).get(D);l.get(at)!==Q&&(i.uniformBlockBinding(at,Q,D.__bindingPointIndex),l.set(at,Q))}function re(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},tt=null,J={},d={},u=new WeakMap,f=[],m=null,_=!1,g=null,p=null,b=null,x=null,v=null,C=null,T=null,R=new $t(0,0,0),P=0,S=!1,M=null,I=null,L=null,E=null,z=null,Et.set(0,0,i.canvas.width,i.canvas.height),V.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:mt,bindFramebuffer:St,drawBuffers:Lt,useProgram:ee,setBlending:U,setMaterial:_e,setFlipSided:kt,setCullFace:Vt,setLineWidth:Tt,setPolygonOffset:Qt,setScissorTest:At,activeTexture:A,bindTexture:y,unbindTexture:$,compressedTexImage2D:j,compressedTexImage3D:et,texImage2D:_t,texImage3D:Rt,updateUBOMapping:Gt,uniformBlockBinding:Ft,texStorage2D:Xt,texStorage3D:it,texSubImage2D:K,texSubImage3D:Mt,compressedTexSubImage2D:lt,compressedTexSubImage3D:gt,scissor:Ct,viewport:xt,reset:re}}function of(i,t,e,n){let s=ub(n);switch(e){case yf:return i*t;case Mf:return i*t;case wf:return i*t*2;case Sf:return i*t/s.components*s.byteLength;case ph:return i*t/s.components*s.byteLength;case Ef:return i*t*2/s.components*s.byteLength;case mh:return i*t*2/s.components*s.byteLength;case bf:return i*t*3/s.components*s.byteLength;case Ke:return i*t*4/s.components*s.byteLength;case gh:return i*t*4/s.components*s.byteLength;case Ao:case To:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ro:case Co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ac:case cc:return Math.max(i,16)*Math.max(t,8)/4;case oc:case lc:return Math.max(i,8)*Math.max(t,8)/2;case hc:case uc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case dc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case fc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case pc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case mc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case gc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case _c:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case xc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case vc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case yc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case bc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Mc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case wc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Sc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ec:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ac:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Po:case Tc:case Rc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Af:case Cc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Pc:case Ic:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ub(i){switch(i){case cn:case _f:return{byteLength:1,components:1};case hr:case xf:case gr:return{byteLength:2,components:1};case dh:case fh:return{byteLength:2,components:4};case Ci:case uh:case Un:return{byteLength:4,components:1};case vf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function db(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new It,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,y){return f?new OffscreenCanvas(A,y):Lo("canvas")}function _(A,y,$){let j=1,et=At(A);if((et.width>$||et.height>$)&&(j=$/Math.max(et.width,et.height)),j<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let K=Math.floor(j*et.width),Mt=Math.floor(j*et.height);d===void 0&&(d=m(K,Mt));let lt=y?m(K,Mt):d;return lt.width=K,lt.height=Mt,lt.getContext("2d").drawImage(A,0,0,K,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+K+"x"+Mt+")."),lt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),A;return A}function g(A){return A.generateMipmaps}function p(A){i.generateMipmap(A)}function b(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(A,y,$,j,et=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=y;if(y===i.RED&&($===i.FLOAT&&(K=i.R32F),$===i.HALF_FLOAT&&(K=i.R16F),$===i.UNSIGNED_BYTE&&(K=i.R8)),y===i.RED_INTEGER&&($===i.UNSIGNED_BYTE&&(K=i.R8UI),$===i.UNSIGNED_SHORT&&(K=i.R16UI),$===i.UNSIGNED_INT&&(K=i.R32UI),$===i.BYTE&&(K=i.R8I),$===i.SHORT&&(K=i.R16I),$===i.INT&&(K=i.R32I)),y===i.RG&&($===i.FLOAT&&(K=i.RG32F),$===i.HALF_FLOAT&&(K=i.RG16F),$===i.UNSIGNED_BYTE&&(K=i.RG8)),y===i.RG_INTEGER&&($===i.UNSIGNED_BYTE&&(K=i.RG8UI),$===i.UNSIGNED_SHORT&&(K=i.RG16UI),$===i.UNSIGNED_INT&&(K=i.RG32UI),$===i.BYTE&&(K=i.RG8I),$===i.SHORT&&(K=i.RG16I),$===i.INT&&(K=i.RG32I)),y===i.RGB_INTEGER&&($===i.UNSIGNED_BYTE&&(K=i.RGB8UI),$===i.UNSIGNED_SHORT&&(K=i.RGB16UI),$===i.UNSIGNED_INT&&(K=i.RGB32UI),$===i.BYTE&&(K=i.RGB8I),$===i.SHORT&&(K=i.RGB16I),$===i.INT&&(K=i.RGB32I)),y===i.RGBA_INTEGER&&($===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),$===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),$===i.UNSIGNED_INT&&(K=i.RGBA32UI),$===i.BYTE&&(K=i.RGBA8I),$===i.SHORT&&(K=i.RGBA16I),$===i.INT&&(K=i.RGBA32I)),y===i.RGB&&$===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),y===i.RGBA){let Mt=et?sa:qt.getTransfer(j);$===i.FLOAT&&(K=i.RGBA32F),$===i.HALF_FLOAT&&(K=i.RGBA16F),$===i.UNSIGNED_BYTE&&(K=Mt===ne?i.SRGB8_ALPHA8:i.RGBA8),$===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),$===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function v(A,y){let $;return A?y===null||y===Ci||y===ys?$=i.DEPTH24_STENCIL8:y===Un?$=i.DEPTH32F_STENCIL8:y===hr&&($=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Ci||y===ys?$=i.DEPTH_COMPONENT24:y===Un?$=i.DEPTH_COMPONENT32F:y===hr&&($=i.DEPTH_COMPONENT16),$}function C(A,y){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Oe&&A.minFilter!==gn?Math.log2(Math.max(y.width,y.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?y.mipmaps.length:1}function T(A){let y=A.target;y.removeEventListener("dispose",T),P(y),y.isVideoTexture&&h.delete(y)}function R(A){let y=A.target;y.removeEventListener("dispose",R),M(y)}function P(A){let y=n.get(A);if(y.__webglInit===void 0)return;let $=A.source,j=u.get($);if(j){let et=j[y.__cacheKey];et.usedTimes--,et.usedTimes===0&&S(A),Object.keys(j).length===0&&u.delete($)}n.remove(A)}function S(A){let y=n.get(A);i.deleteTexture(y.__webglTexture);let $=A.source,j=u.get($);delete j[y.__cacheKey],o.memory.textures--}function M(A){let y=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(y.__webglFramebuffer[j]))for(let et=0;et<y.__webglFramebuffer[j].length;et++)i.deleteFramebuffer(y.__webglFramebuffer[j][et]);else i.deleteFramebuffer(y.__webglFramebuffer[j]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[j])}else{if(Array.isArray(y.__webglFramebuffer))for(let j=0;j<y.__webglFramebuffer.length;j++)i.deleteFramebuffer(y.__webglFramebuffer[j]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let j=0;j<y.__webglColorRenderbuffer.length;j++)y.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[j]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let $=A.textures;for(let j=0,et=$.length;j<et;j++){let K=n.get($[j]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove($[j])}n.remove(A)}let I=0;function L(){I=0}function E(){let A=I;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),I+=1,A}function z(A){let y=[];return y.push(A.wrapS),y.push(A.wrapT),y.push(A.wrapR||0),y.push(A.magFilter),y.push(A.minFilter),y.push(A.anisotropy),y.push(A.internalFormat),y.push(A.format),y.push(A.type),y.push(A.generateMipmaps),y.push(A.premultiplyAlpha),y.push(A.flipY),y.push(A.unpackAlignment),y.push(A.colorSpace),y.join()}function H(A,y){let $=n.get(A);if(A.isVideoTexture&&Tt(A),A.isRenderTargetTexture===!1&&A.version>0&&$.__version!==A.version){let j=A.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V($,A,y);return}}e.bindTexture(i.TEXTURE_2D,$.__webglTexture,i.TEXTURE0+y)}function N(A,y){let $=n.get(A);if(A.version>0&&$.__version!==A.version){V($,A,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,$.__webglTexture,i.TEXTURE0+y)}function X(A,y){let $=n.get(A);if(A.version>0&&$.__version!==A.version){V($,A,y);return}e.bindTexture(i.TEXTURE_3D,$.__webglTexture,i.TEXTURE0+y)}function F(A,y){let $=n.get(A);if(A.version>0&&$.__version!==A.version){Z($,A,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture,i.TEXTURE0+y)}let tt={[sc]:i.REPEAT,[Ti]:i.CLAMP_TO_EDGE,[rc]:i.MIRRORED_REPEAT},J={[Oe]:i.NEAREST,[Kg]:i.NEAREST_MIPMAP_NEAREST,[jr]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[gl]:i.LINEAR_MIPMAP_NEAREST,[Ri]:i.LINEAR_MIPMAP_LINEAR},ct={[t_]:i.NEVER,[o_]:i.ALWAYS,[e_]:i.LESS,[Rf]:i.LEQUAL,[n_]:i.EQUAL,[r_]:i.GEQUAL,[i_]:i.GREATER,[s_]:i.NOTEQUAL};function pt(A,y){if(y.type===Un&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===gn||y.magFilter===gl||y.magFilter===jr||y.magFilter===Ri||y.minFilter===gn||y.minFilter===gl||y.minFilter===jr||y.minFilter===Ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,tt[y.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,tt[y.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,tt[y.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,J[y.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,J[y.minFilter]),y.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ct[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Oe||y.minFilter!==jr&&y.minFilter!==Ri||y.type===Un&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let $=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Et(A,y){let $=!1;A.__webglInit===void 0&&(A.__webglInit=!0,y.addEventListener("dispose",T));let j=y.source,et=u.get(j);et===void 0&&(et={},u.set(j,et));let K=z(y);if(K!==A.__cacheKey){et[K]===void 0&&(et[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,$=!0),et[K].usedTimes++;let Mt=et[A.__cacheKey];Mt!==void 0&&(et[A.__cacheKey].usedTimes--,Mt.usedTimes===0&&S(y)),A.__cacheKey=K,A.__webglTexture=et[K].texture}return $}function V(A,y,$){let j=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(j=i.TEXTURE_3D);let et=Et(A,y),K=y.source;e.bindTexture(j,A.__webglTexture,i.TEXTURE0+$);let Mt=n.get(K);if(K.version!==Mt.__version||et===!0){e.activeTexture(i.TEXTURE0+$);let lt=qt.getPrimaries(qt.workingColorSpace),gt=y.colorSpace===jn?null:qt.getPrimaries(y.colorSpace),Xt=y.colorSpace===jn||lt===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xt);let it=_(y.image,!1,s.maxTextureSize);it=Qt(y,it);let _t=r.convert(y.format,y.colorSpace),Rt=r.convert(y.type),Ct=x(y.internalFormat,_t,Rt,y.colorSpace,y.isVideoTexture);pt(j,y);let xt,Gt=y.mipmaps,Ft=y.isVideoTexture!==!0,re=Mt.__version===void 0||et===!0,D=K.dataReady,at=C(y,it);if(y.isDepthTexture)Ct=v(y.format===bs,y.type),re&&(Ft?e.texStorage2D(i.TEXTURE_2D,1,Ct,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,Ct,it.width,it.height,0,_t,Rt,null));else if(y.isDataTexture)if(Gt.length>0){Ft&&re&&e.texStorage2D(i.TEXTURE_2D,at,Ct,Gt[0].width,Gt[0].height);for(let q=0,Q=Gt.length;q<Q;q++)xt=Gt[q],Ft?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,xt.width,xt.height,_t,Rt,xt.data):e.texImage2D(i.TEXTURE_2D,q,Ct,xt.width,xt.height,0,_t,Rt,xt.data);y.generateMipmaps=!1}else Ft?(re&&e.texStorage2D(i.TEXTURE_2D,at,Ct,it.width,it.height),D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,it.width,it.height,_t,Rt,it.data)):e.texImage2D(i.TEXTURE_2D,0,Ct,it.width,it.height,0,_t,Rt,it.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ft&&re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,Ct,Gt[0].width,Gt[0].height,it.depth);for(let q=0,Q=Gt.length;q<Q;q++)if(xt=Gt[q],y.format!==Ke)if(_t!==null)if(Ft){if(D)if(y.layerUpdates.size>0){let dt=of(xt.width,xt.height,y.format,y.type);for(let ht of y.layerUpdates){let Ut=xt.data.subarray(ht*dt/xt.data.BYTES_PER_ELEMENT,(ht+1)*dt/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,ht,xt.width,xt.height,1,_t,Ut)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,xt.width,xt.height,it.depth,_t,xt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Ct,xt.width,xt.height,it.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,xt.width,xt.height,it.depth,_t,Rt,xt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Ct,xt.width,xt.height,it.depth,0,_t,Rt,xt.data)}else{Ft&&re&&e.texStorage2D(i.TEXTURE_2D,at,Ct,Gt[0].width,Gt[0].height);for(let q=0,Q=Gt.length;q<Q;q++)xt=Gt[q],y.format!==Ke?_t!==null?Ft?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,xt.width,xt.height,_t,xt.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Ct,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,xt.width,xt.height,_t,Rt,xt.data):e.texImage2D(i.TEXTURE_2D,q,Ct,xt.width,xt.height,0,_t,Rt,xt.data)}else if(y.isDataArrayTexture)if(Ft){if(re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,Ct,it.width,it.height,it.depth),D)if(y.layerUpdates.size>0){let q=of(it.width,it.height,y.format,y.type);for(let Q of y.layerUpdates){let dt=it.data.subarray(Q*q/it.data.BYTES_PER_ELEMENT,(Q+1)*q/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,it.width,it.height,1,_t,Rt,dt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,_t,Rt,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ct,it.width,it.height,it.depth,0,_t,Rt,it.data);else if(y.isData3DTexture)Ft?(re&&e.texStorage3D(i.TEXTURE_3D,at,Ct,it.width,it.height,it.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,_t,Rt,it.data)):e.texImage3D(i.TEXTURE_3D,0,Ct,it.width,it.height,it.depth,0,_t,Rt,it.data);else if(y.isFramebufferTexture){if(re)if(Ft)e.texStorage2D(i.TEXTURE_2D,at,Ct,it.width,it.height);else{let q=it.width,Q=it.height;for(let dt=0;dt<at;dt++)e.texImage2D(i.TEXTURE_2D,dt,Ct,q,Q,0,_t,Rt,null),q>>=1,Q>>=1}}else if(Gt.length>0){if(Ft&&re){let q=At(Gt[0]);e.texStorage2D(i.TEXTURE_2D,at,Ct,q.width,q.height)}for(let q=0,Q=Gt.length;q<Q;q++)xt=Gt[q],Ft?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,_t,Rt,xt):e.texImage2D(i.TEXTURE_2D,q,Ct,_t,Rt,xt);y.generateMipmaps=!1}else if(Ft){if(re){let q=At(it);e.texStorage2D(i.TEXTURE_2D,at,Ct,q.width,q.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t,Rt,it)}else e.texImage2D(i.TEXTURE_2D,0,Ct,_t,Rt,it);g(y)&&p(j),Mt.__version=K.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function Z(A,y,$){if(y.image.length!==6)return;let j=Et(A,y),et=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+$);let K=n.get(et);if(et.version!==K.__version||j===!0){e.activeTexture(i.TEXTURE0+$);let Mt=qt.getPrimaries(qt.workingColorSpace),lt=y.colorSpace===jn?null:qt.getPrimaries(y.colorSpace),gt=y.colorSpace===jn||Mt===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);let Xt=y.isCompressedTexture||y.image[0].isCompressedTexture,it=y.image[0]&&y.image[0].isDataTexture,_t=[];for(let Q=0;Q<6;Q++)!Xt&&!it?_t[Q]=_(y.image[Q],!0,s.maxCubemapSize):_t[Q]=it?y.image[Q].image:y.image[Q],_t[Q]=Qt(y,_t[Q]);let Rt=_t[0],Ct=r.convert(y.format,y.colorSpace),xt=r.convert(y.type),Gt=x(y.internalFormat,Ct,xt,y.colorSpace),Ft=y.isVideoTexture!==!0,re=K.__version===void 0||j===!0,D=et.dataReady,at=C(y,Rt);pt(i.TEXTURE_CUBE_MAP,y);let q;if(Xt){Ft&&re&&e.texStorage2D(i.TEXTURE_CUBE_MAP,at,Gt,Rt.width,Rt.height);for(let Q=0;Q<6;Q++){q=_t[Q].mipmaps;for(let dt=0;dt<q.length;dt++){let ht=q[dt];y.format!==Ke?Ct!==null?Ft?D&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,0,0,ht.width,ht.height,Ct,ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,Gt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,0,0,ht.width,ht.height,Ct,xt,ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,Gt,ht.width,ht.height,0,Ct,xt,ht.data)}}}else{if(q=y.mipmaps,Ft&&re){q.length>0&&at++;let Q=At(_t[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,at,Gt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(it){Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,_t[Q].width,_t[Q].height,Ct,xt,_t[Q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Gt,_t[Q].width,_t[Q].height,0,Ct,xt,_t[Q].data);for(let dt=0;dt<q.length;dt++){let Ut=q[dt].image[Q].image;Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,0,0,Ut.width,Ut.height,Ct,xt,Ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,Gt,Ut.width,Ut.height,0,Ct,xt,Ut.data)}}else{Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ct,xt,_t[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Gt,Ct,xt,_t[Q]);for(let dt=0;dt<q.length;dt++){let ht=q[dt];Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,0,0,Ct,xt,ht.image[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,Gt,Ct,xt,ht.image[Q])}}}g(y)&&p(i.TEXTURE_CUBE_MAP),K.__version=et.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function rt(A,y,$,j,et,K){let Mt=r.convert($.format,$.colorSpace),lt=r.convert($.type),gt=x($.internalFormat,Mt,lt,$.colorSpace),Xt=n.get(y),it=n.get($);if(it.__renderTarget=y,!Xt.__hasExternalTextures){let _t=Math.max(1,y.width>>K),Rt=Math.max(1,y.height>>K);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,K,gt,_t,Rt,y.depth,0,Mt,lt,null):e.texImage2D(et,K,gt,_t,Rt,0,Mt,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),Vt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,et,it.__webglTexture,0,kt(y)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,et,it.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function nt(A,y,$){if(i.bindRenderbuffer(i.RENDERBUFFER,A),y.depthBuffer){let j=y.depthTexture,et=j&&j.isDepthTexture?j.type:null,K=v(y.stencilBuffer,et),Mt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=kt(y);Vt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,K,y.width,y.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,K,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,K,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Mt,i.RENDERBUFFER,A)}else{let j=y.textures;for(let et=0;et<j.length;et++){let K=j[et],Mt=r.convert(K.format,K.colorSpace),lt=r.convert(K.type),gt=x(K.internalFormat,Mt,lt,K.colorSpace),Xt=kt(y);$&&Vt(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Xt,gt,y.width,y.height):Vt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Xt,gt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,gt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function mt(A,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let j=n.get(y.depthTexture);j.__renderTarget=y,(!j.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),H(y.depthTexture,0);let et=j.__webglTexture,K=kt(y);if(y.depthTexture.format===fs)Vt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0);else if(y.depthTexture.format===bs)Vt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function St(A){let y=n.get(A),$=A.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==A.depthTexture){let j=A.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),j){let et=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,j.removeEventListener("dispose",et)};j.addEventListener("dispose",et),y.__depthDisposeCallback=et}y.__boundDepthTexture=j}if(A.depthTexture&&!y.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");mt(y.__webglFramebuffer,A)}else if($){y.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[j]),y.__webglDepthbuffer[j]===void 0)y.__webglDepthbuffer[j]=i.createRenderbuffer(),nt(y.__webglDepthbuffer[j],A,!1);else{let et=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=y.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),nt(y.__webglDepthbuffer,A,!1);else{let j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,et)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(A,y,$){let j=n.get(A);y!==void 0&&rt(j.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),$!==void 0&&St(A)}function ee(A){let y=A.texture,$=n.get(A),j=n.get(y);A.addEventListener("dispose",R);let et=A.textures,K=A.isWebGLCubeRenderTarget===!0,Mt=et.length>1;if(Mt||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=y.version,o.memory.textures++),K){$.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(y.mipmaps&&y.mipmaps.length>0){$.__webglFramebuffer[lt]=[];for(let gt=0;gt<y.mipmaps.length;gt++)$.__webglFramebuffer[lt][gt]=i.createFramebuffer()}else $.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){$.__webglFramebuffer=[];for(let lt=0;lt<y.mipmaps.length;lt++)$.__webglFramebuffer[lt]=i.createFramebuffer()}else $.__webglFramebuffer=i.createFramebuffer();if(Mt)for(let lt=0,gt=et.length;lt<gt;lt++){let Xt=n.get(et[lt]);Xt.__webglTexture===void 0&&(Xt.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&Vt(A)===!1){$.__webglMultisampledFramebuffer=i.createFramebuffer(),$.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let lt=0;lt<et.length;lt++){let gt=et[lt];$.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,$.__webglColorRenderbuffer[lt]);let Xt=r.convert(gt.format,gt.colorSpace),it=r.convert(gt.type),_t=x(gt.internalFormat,Xt,it,gt.colorSpace,A.isXRRenderTarget===!0),Rt=kt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,_t,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,$.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&($.__webglDepthRenderbuffer=i.createRenderbuffer(),nt($.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),pt(i.TEXTURE_CUBE_MAP,y);for(let lt=0;lt<6;lt++)if(y.mipmaps&&y.mipmaps.length>0)for(let gt=0;gt<y.mipmaps.length;gt++)rt($.__webglFramebuffer[lt][gt],A,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,gt);else rt($.__webglFramebuffer[lt],A,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);g(y)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let lt=0,gt=et.length;lt<gt;lt++){let Xt=et[lt],it=n.get(Xt);e.bindTexture(i.TEXTURE_2D,it.__webglTexture),pt(i.TEXTURE_2D,Xt),rt($.__webglFramebuffer,A,Xt,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),g(Xt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(lt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,j.__webglTexture),pt(lt,y),y.mipmaps&&y.mipmaps.length>0)for(let gt=0;gt<y.mipmaps.length;gt++)rt($.__webglFramebuffer[gt],A,y,i.COLOR_ATTACHMENT0,lt,gt);else rt($.__webglFramebuffer,A,y,i.COLOR_ATTACHMENT0,lt,0);g(y)&&p(lt),e.unbindTexture()}A.depthBuffer&&St(A)}function Ht(A){let y=A.textures;for(let $=0,j=y.length;$<j;$++){let et=y[$];if(g(et)){let K=b(A),Mt=n.get(et).__webglTexture;e.bindTexture(K,Mt),p(K),e.unbindTexture()}}}let fe=[],U=[];function _e(A){if(A.samples>0){if(Vt(A)===!1){let y=A.textures,$=A.width,j=A.height,et=i.COLOR_BUFFER_BIT,K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Mt=n.get(A),lt=y.length>1;if(lt)for(let gt=0;gt<y.length;gt++)e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let gt=0;gt<y.length;gt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[gt]);let Xt=n.get(y[gt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Xt,0)}i.blitFramebuffer(0,0,$,j,0,0,$,j,et,i.NEAREST),l===!0&&(fe.length=0,U.length=0,fe.push(i.COLOR_ATTACHMENT0+gt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(fe.push(K),U.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,U)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,fe))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let gt=0;gt<y.length;gt++){e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[gt]);let Xt=n.get(y[gt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,Xt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let y=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function kt(A){return Math.min(s.maxSamples,A.samples)}function Vt(A){let y=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Tt(A){let y=o.render.frame;h.get(A)!==y&&(h.set(A,y),A.update())}function Qt(A,y){let $=A.colorSpace,j=A.format,et=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||$!==As&&$!==jn&&(qt.getTransfer($)===ne?(j!==Ke||et!==cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),y}function At(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=E,this.resetTextureUnits=L,this.setTexture2D=H,this.setTexture2DArray=N,this.setTexture3D=X,this.setTextureCube=F,this.rebindTextures=Lt,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=Ht,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=Vt}function fb(i,t){function e(n,s=jn){let r,o=qt.getTransfer(s);if(n===cn)return i.UNSIGNED_BYTE;if(n===dh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===fh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===vf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===_f)return i.BYTE;if(n===xf)return i.SHORT;if(n===hr)return i.UNSIGNED_SHORT;if(n===uh)return i.INT;if(n===Ci)return i.UNSIGNED_INT;if(n===Un)return i.FLOAT;if(n===gr)return i.HALF_FLOAT;if(n===yf)return i.ALPHA;if(n===bf)return i.RGB;if(n===Ke)return i.RGBA;if(n===Mf)return i.LUMINANCE;if(n===wf)return i.LUMINANCE_ALPHA;if(n===fs)return i.DEPTH_COMPONENT;if(n===bs)return i.DEPTH_STENCIL;if(n===Sf)return i.RED;if(n===ph)return i.RED_INTEGER;if(n===Ef)return i.RG;if(n===mh)return i.RG_INTEGER;if(n===gh)return i.RGBA_INTEGER;if(n===Ao||n===To||n===Ro||n===Co)if(o===ne)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ao)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ao)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Co)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===oc||n===ac||n===lc||n===cc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===oc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ac)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===lc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===cc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===hc||n===uc||n===dc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===hc||n===uc)return o===ne?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===dc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===fc||n===pc||n===mc||n===gc||n===_c||n===xc||n===vc||n===yc||n===bc||n===Mc||n===wc||n===Sc||n===Ec||n===Ac)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===fc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===pc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===mc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===gc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===_c)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===yc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Mc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Sc)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ec)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ac)return o===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Po||n===Tc||n===Rc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Po)return o===ne?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Tc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Rc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Af||n===Cc||n===Pc||n===Ic)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Po)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Cc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Pc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ic)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ys?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Xc=class extends ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},_n=class extends Ve{constructor(){super(),this.isGroup=!0,this.type="Group"}},pb={type:"move"},cr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let g=e.getJointPose(_,n),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(pb)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new _n;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},mb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,qc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new Je,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new yn({vertexShader:mb,fragmentShader:gb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Pe(new Bo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Yc=class extends kn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null,_=new qc,g=e.getContextAttributes(),p=null,b=null,x=[],v=[],C=new It,T=null,R=new ze;R.viewport=new ge;let P=new ze;P.viewport=new ge;let S=[R,P],M=new Xc,I=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let Z=x[V];return Z===void 0&&(Z=new cr,x[V]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(V){let Z=x[V];return Z===void 0&&(Z=new cr,x[V]=Z),Z.getGripSpace()},this.getHand=function(V){let Z=x[V];return Z===void 0&&(Z=new cr,x[V]=Z),Z.getHandSpace()};function E(V){let Z=v.indexOf(V.inputSource);if(Z===-1)return;let rt=x[Z];rt!==void 0&&(rt.update(V.inputSource,V.frame,c||o),rt.dispatchEvent({type:V.type,data:V.inputSource}))}function z(){s.removeEventListener("select",E),s.removeEventListener("selectstart",E),s.removeEventListener("selectend",E),s.removeEventListener("squeeze",E),s.removeEventListener("squeezestart",E),s.removeEventListener("squeezeend",E),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",H);for(let V=0;V<x.length;V++){let Z=v[V];Z!==null&&(v[V]=null,x[V].disconnect(Z))}I=null,L=null,_.reset(),t.setRenderTarget(p),f=null,u=null,d=null,s=null,b=null,Et.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",E),s.addEventListener("selectstart",E),s.addEventListener("selectend",E),s.addEventListener("squeeze",E),s.addEventListener("squeezestart",E),s.addEventListener("squeezeend",E),s.addEventListener("end",z),s.addEventListener("inputsourceschange",H),g.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(C),s.renderState.layers===void 0){let Z={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,Z),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Fn(f.framebufferWidth,f.framebufferHeight,{format:Ke,type:cn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let Z=null,rt=null,nt=null;g.depth&&(nt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Z=g.stencil?bs:fs,rt=g.stencil?ys:Ci);let mt={colorFormat:e.RGBA8,depthFormat:nt,scaleFactor:r};d=new XRWebGLBinding(s,e),u=d.createProjectionLayer(mt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new Fn(u.textureWidth,u.textureHeight,{format:Ke,type:cn,depthTexture:new Ho(u.textureWidth,u.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Et.setContext(s),Et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function H(V){for(let Z=0;Z<V.removed.length;Z++){let rt=V.removed[Z],nt=v.indexOf(rt);nt>=0&&(v[nt]=null,x[nt].disconnect(rt))}for(let Z=0;Z<V.added.length;Z++){let rt=V.added[Z],nt=v.indexOf(rt);if(nt===-1){for(let St=0;St<x.length;St++)if(St>=v.length){v.push(rt),nt=St;break}else if(v[St]===null){v[St]=rt,nt=St;break}if(nt===-1)break}let mt=x[nt];mt&&mt.connect(rt)}}let N=new B,X=new B;function F(V,Z,rt){N.setFromMatrixPosition(Z.matrixWorld),X.setFromMatrixPosition(rt.matrixWorld);let nt=N.distanceTo(X),mt=Z.projectionMatrix.elements,St=rt.projectionMatrix.elements,Lt=mt[14]/(mt[10]-1),ee=mt[14]/(mt[10]+1),Ht=(mt[9]+1)/mt[5],fe=(mt[9]-1)/mt[5],U=(mt[8]-1)/mt[0],_e=(St[8]+1)/St[0],kt=Lt*U,Vt=Lt*_e,Tt=nt/(-U+_e),Qt=Tt*-U;if(Z.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Qt),V.translateZ(Tt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),mt[10]===-1)V.projectionMatrix.copy(Z.projectionMatrix),V.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let At=Lt+Tt,A=ee+Tt,y=kt-Qt,$=Vt+(nt-Qt),j=Ht*ee/A*At,et=fe*ee/A*At;V.projectionMatrix.makePerspective(y,$,j,et,At,A),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function tt(V,Z){Z===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(Z.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let Z=V.near,rt=V.far;_.texture!==null&&(_.depthNear>0&&(Z=_.depthNear),_.depthFar>0&&(rt=_.depthFar)),M.near=P.near=R.near=Z,M.far=P.far=R.far=rt,(I!==M.near||L!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,L=M.far),R.layers.mask=V.layers.mask|2,P.layers.mask=V.layers.mask|4,M.layers.mask=R.layers.mask|P.layers.mask;let nt=V.parent,mt=M.cameras;tt(M,nt);for(let St=0;St<mt.length;St++)tt(mt[St],nt);mt.length===2?F(M,R,P):M.projectionMatrix.copy(R.projectionMatrix),J(V,M,nt)};function J(V,Z,rt){rt===null?V.matrix.copy(Z.matrixWorld):(V.matrix.copy(rt.matrixWorld),V.matrix.invert(),V.matrix.multiply(Z.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(Z.projectionMatrix),V.projectionMatrixInverse.copy(Z.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=ur*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(V){l=V,u!==null&&(u.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let ct=null;function pt(V,Z){if(h=Z.getViewerPose(c||o),m=Z,h!==null){let rt=h.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let nt=!1;rt.length!==M.cameras.length&&(M.cameras.length=0,nt=!0);for(let St=0;St<rt.length;St++){let Lt=rt[St],ee=null;if(f!==null)ee=f.getViewport(Lt);else{let fe=d.getViewSubImage(u,Lt);ee=fe.viewport,St===0&&(t.setRenderTargetTextures(b,fe.colorTexture,u.ignoreDepthValues?void 0:fe.depthStencilTexture),t.setRenderTarget(b))}let Ht=S[St];Ht===void 0&&(Ht=new ze,Ht.layers.enable(St),Ht.viewport=new ge,S[St]=Ht),Ht.matrix.fromArray(Lt.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray(Lt.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(ee.x,ee.y,ee.width,ee.height),St===0&&(M.matrix.copy(Ht.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),nt===!0&&M.cameras.push(Ht)}let mt=s.enabledFeatures;if(mt&&mt.includes("depth-sensing")){let St=d.getDepthInformation(rt[0]);St&&St.isValid&&St.texture&&_.init(t,St,s.renderState)}}for(let rt=0;rt<x.length;rt++){let nt=v[rt],mt=x[rt];nt!==null&&mt!==void 0&&mt.update(nt,Z,c||o)}ct&&ct(V,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),m=null}let Et=new Lf;Et.setAnimationLoop(pt),this.setAnimationLoop=function(V){ct=V},this.dispose=function(){}}},wi=new xn,_b=new ce;function xb(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Df(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,b,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,b,x):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Ge&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Ge&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let b=t.get(p),x=b.envMap,v=b.envMapRotation;x&&(g.envMap.value=x,wi.copy(v),wi.x*=-1,wi.y*=-1,wi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(wi.y*=-1,wi.z*=-1),g.envMapRotation.value.setFromMatrix4(_b.makeRotationFromEuler(wi)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,b,x){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*b,g.scale.value=x*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,b){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ge&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let b=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function vb(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,x){let v=x.program;n.uniformBlockBinding(b,v)}function c(b,x){let v=s[b.id];v===void 0&&(m(b),v=h(b),s[b.id]=v,b.addEventListener("dispose",g));let C=x.program;n.updateUBOMapping(b,C);let T=t.render.frame;r[b.id]!==T&&(u(b),r[b.id]=T)}function h(b){let x=d();b.__bindingPointIndex=x;let v=i.createBuffer(),C=b.__size,T=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,C,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,v),v}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(b){let x=s[b.id],v=b.uniforms,C=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let T=0,R=v.length;T<R;T++){let P=Array.isArray(v[T])?v[T]:[v[T]];for(let S=0,M=P.length;S<M;S++){let I=P[S];if(f(I,T,S,C)===!0){let L=I.__offset,E=Array.isArray(I.value)?I.value:[I.value],z=0;for(let H=0;H<E.length;H++){let N=E[H],X=_(N);typeof N=="number"||typeof N=="boolean"?(I.__data[0]=N,i.bufferSubData(i.UNIFORM_BUFFER,L+z,I.__data)):N.isMatrix3?(I.__data[0]=N.elements[0],I.__data[1]=N.elements[1],I.__data[2]=N.elements[2],I.__data[3]=0,I.__data[4]=N.elements[3],I.__data[5]=N.elements[4],I.__data[6]=N.elements[5],I.__data[7]=0,I.__data[8]=N.elements[6],I.__data[9]=N.elements[7],I.__data[10]=N.elements[8],I.__data[11]=0):(N.toArray(I.__data,z),z+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,x,v,C){let T=b.value,R=x+"_"+v;if(C[R]===void 0)return typeof T=="number"||typeof T=="boolean"?C[R]=T:C[R]=T.clone(),!0;{let P=C[R];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return C[R]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function m(b){let x=b.uniforms,v=0,C=16;for(let R=0,P=x.length;R<P;R++){let S=Array.isArray(x[R])?x[R]:[x[R]];for(let M=0,I=S.length;M<I;M++){let L=S[M],E=Array.isArray(L.value)?L.value:[L.value];for(let z=0,H=E.length;z<H;z++){let N=E[z],X=_(N),F=v%C,tt=F%X.boundary,J=F+tt;v+=tt,J!==0&&C-J<X.storage&&(v+=C-J),L.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=v,v+=X.storage}}}let T=v%C;return T>0&&(v+=C-T),b.__size=v,b.__cache={},this}function _(b){let x={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(x.boundary=4,x.storage=4):b.isVector2?(x.boundary=8,x.storage=8):b.isVector3||b.isColor?(x.boundary=16,x.storage=12):b.isVector4?(x.boundary=16,x.storage=16):b.isMatrix3?(x.boundary=48,x.storage=48):b.isMatrix4?(x.boundary=64,x.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),x}function g(b){let x=b.target;x.removeEventListener("dispose",g);let v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(let b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}var Go=class{constructor(t={}){let{canvas:e=w_(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let m=new Uint32Array(4),_=new Int32Array(4),g=null,p=null,b=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ue,this.toneMapping=ei,this.toneMappingExposure=1;let v=this,C=!1,T=0,R=0,P=null,S=-1,M=null,I=new ge,L=new ge,E=null,z=new $t(0),H=0,N=e.width,X=e.height,F=1,tt=null,J=null,ct=new ge(0,0,N,X),pt=new ge(0,0,N,X),Et=!1,V=new fr,Z=!1,rt=!1,nt=new ce,mt=new ce,St=new B,Lt=new ge,ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ht=!1;function fe(){return P===null?F:1}let U=n;function _e(w,O){return e.getContext(w,O)}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ch}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ht,!1),U===null){let O="webgl2";if(U=_e(O,w),U===null)throw _e(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let kt,Vt,Tt,Qt,At,A,y,$,j,et,K,Mt,lt,gt,Xt,it,_t,Rt,Ct,xt,Gt,Ft,re,D;function at(){kt=new Nv(U),kt.init(),Ft=new fb(U,kt),Vt=new Cv(U,kt,t,Ft),Tt=new hb(U,kt),Vt.reverseDepthBuffer&&u&&Tt.buffers.depth.setReversed(!0),Qt=new Fv(U),At=new Jy,A=new db(U,kt,Tt,At,Vt,Ft,Qt),y=new Iv(v),$=new Uv(v),j=new W_(U),re=new Tv(U,j),et=new Ov(U,j,Qt,re),K=new Bv(U,et,j,Qt),Ct=new zv(U,Vt,A),it=new Pv(At),Mt=new Ky(v,y,$,kt,Vt,re,it),lt=new xb(v,At),gt=new Qy,Xt=new rb(kt),Rt=new Av(v,y,$,Tt,K,f,l),_t=new lb(v,K,Vt),D=new vb(U,Qt,Vt,Tt),xt=new Rv(U,kt,Qt),Gt=new kv(U,kt,Qt),Qt.programs=Mt.programs,v.capabilities=Vt,v.extensions=kt,v.properties=At,v.renderLists=gt,v.shadowMap=_t,v.state=Tt,v.info=Qt}at();let q=new Yc(v,U);this.xr=q,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let w=kt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=kt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(w){w!==void 0&&(F=w,this.setSize(N,X,!1))},this.getSize=function(w){return w.set(N,X)},this.setSize=function(w,O,G=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=w,X=O,e.width=Math.floor(w*F),e.height=Math.floor(O*F),G===!0&&(e.style.width=w+"px",e.style.height=O+"px"),this.setViewport(0,0,w,O)},this.getDrawingBufferSize=function(w){return w.set(N*F,X*F).floor()},this.setDrawingBufferSize=function(w,O,G){N=w,X=O,F=G,e.width=Math.floor(w*G),e.height=Math.floor(O*G),this.setViewport(0,0,w,O)},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(ct)},this.setViewport=function(w,O,G,W){w.isVector4?ct.set(w.x,w.y,w.z,w.w):ct.set(w,O,G,W),Tt.viewport(I.copy(ct).multiplyScalar(F).round())},this.getScissor=function(w){return w.copy(pt)},this.setScissor=function(w,O,G,W){w.isVector4?pt.set(w.x,w.y,w.z,w.w):pt.set(w,O,G,W),Tt.scissor(L.copy(pt).multiplyScalar(F).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(w){Tt.setScissorTest(Et=w)},this.setOpaqueSort=function(w){tt=w},this.setTransparentSort=function(w){J=w},this.getClearColor=function(w){return w.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(w=!0,O=!0,G=!0){let W=0;if(w){let k=!1;if(P!==null){let st=P.texture.format;k=st===gh||st===mh||st===ph}if(k){let st=P.texture.type,ut=st===cn||st===Ci||st===hr||st===ys||st===dh||st===fh,vt=Rt.getClearColor(),yt=Rt.getClearAlpha(),Pt=vt.r,Nt=vt.g,bt=vt.b;ut?(m[0]=Pt,m[1]=Nt,m[2]=bt,m[3]=yt,U.clearBufferuiv(U.COLOR,0,m)):(_[0]=Pt,_[1]=Nt,_[2]=bt,_[3]=yt,U.clearBufferiv(U.COLOR,0,_))}else W|=U.COLOR_BUFFER_BIT}O&&(W|=U.DEPTH_BUFFER_BIT),G&&(W|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),gt.dispose(),Xt.dispose(),At.dispose(),y.dispose(),$.dispose(),K.dispose(),re.dispose(),D.dispose(),Mt.dispose(),q.dispose(),q.removeEventListener("sessionstart",pu),q.removeEventListener("sessionend",mu),ui.stop()};function Q(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let w=Qt.autoReset,O=_t.enabled,G=_t.autoUpdate,W=_t.needsUpdate,k=_t.type;at(),Qt.autoReset=w,_t.enabled=O,_t.autoUpdate=G,_t.needsUpdate=W,_t.type=k}function ht(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Ut(w){let O=w.target;O.removeEventListener("dispose",Ut),me(O)}function me(w){Ie(w),At.remove(w)}function Ie(w){let O=At.get(w).programs;O!==void 0&&(O.forEach(function(G){Mt.releaseProgram(G)}),w.isShaderMaterial&&Mt.releaseShaderCache(w))}this.renderBufferDirect=function(w,O,G,W,k,st){O===null&&(O=ee);let ut=k.isMesh&&k.matrixWorld.determinant()<0,vt=Lm(w,O,G,W,k);Tt.setMaterial(W,ut);let yt=G.index,Pt=1;if(W.wireframe===!0){if(yt=et.getWireframeAttribute(G),yt===void 0)return;Pt=2}let Nt=G.drawRange,bt=G.attributes.position,Kt=Nt.start*Pt,oe=(Nt.start+Nt.count)*Pt;st!==null&&(Kt=Math.max(Kt,st.start*Pt),oe=Math.min(oe,(st.start+st.count)*Pt)),yt!==null?(Kt=Math.max(Kt,0),oe=Math.min(oe,yt.count)):bt!=null&&(Kt=Math.max(Kt,0),oe=Math.min(oe,bt.count));let ae=oe-Kt;if(ae<0||ae===1/0)return;re.setup(k,W,vt,G,yt);let $e,Jt=xt;if(yt!==null&&($e=j.get(yt),Jt=Gt,Jt.setIndex($e)),k.isMesh)W.wireframe===!0?(Tt.setLineWidth(W.wireframeLinewidth*fe()),Jt.setMode(U.LINES)):Jt.setMode(U.TRIANGLES);else if(k.isLine){let wt=W.linewidth;wt===void 0&&(wt=1),Tt.setLineWidth(wt*fe()),k.isLineSegments?Jt.setMode(U.LINES):k.isLineLoop?Jt.setMode(U.LINE_LOOP):Jt.setMode(U.LINE_STRIP)}else k.isPoints?Jt.setMode(U.POINTS):k.isSprite&&Jt.setMode(U.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Jt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(kt.get("WEBGL_multi_draw"))Jt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let wt=k._multiDrawStarts,wn=k._multiDrawCounts,jt=k._multiDrawCount,sn=yt?j.get(yt).bytesPerElement:1,Gi=At.get(W).currentProgram.getUniforms();for(let qe=0;qe<jt;qe++)Gi.setValue(U,"_gl_DrawID",qe),Jt.render(wt[qe]/sn,wn[qe])}else if(k.isInstancedMesh)Jt.renderInstances(Kt,ae,k.count);else if(G.isInstancedBufferGeometry){let wt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,wn=Math.min(G.instanceCount,wt);Jt.renderInstances(Kt,ae,wn)}else Jt.render(Kt,ae)};function te(w,O,G){w.transparent===!0&&w.side===we&&w.forceSinglePass===!1?(w.side=Ge,w.needsUpdate=!0,Lr(w,O,G),w.side=ni,w.needsUpdate=!0,Lr(w,O,G),w.side=we):Lr(w,O,G)}this.compile=function(w,O,G=null){G===null&&(G=w),p=Xt.get(G),p.init(O),x.push(p),G.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),w!==G&&w.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let W=new Set;return w.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let st=k.material;if(st)if(Array.isArray(st))for(let ut=0;ut<st.length;ut++){let vt=st[ut];te(vt,G,k),W.add(vt)}else te(st,G,k),W.add(st)}),x.pop(),p=null,W},this.compileAsync=function(w,O,G=null){let W=this.compile(w,O,G);return new Promise(k=>{function st(){if(W.forEach(function(ut){At.get(ut).currentProgram.isReady()&&W.delete(ut)}),W.size===0){k(w);return}setTimeout(st,10)}kt.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let nn=null;function Mn(w){nn&&nn(w)}function pu(){ui.stop()}function mu(){ui.start()}let ui=new Lf;ui.setAnimationLoop(Mn),typeof self<"u"&&ui.setContext(self),this.setAnimationLoop=function(w){nn=w,q.setAnimationLoop(w),w===null?ui.stop():ui.start()},q.addEventListener("sessionstart",pu),q.addEventListener("sessionend",mu),this.render=function(w,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(O),O=q.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,O,P),p=Xt.get(w,x.length),p.init(O),x.push(p),mt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),V.setFromProjectionMatrix(mt),rt=this.localClippingEnabled,Z=it.init(this.clippingPlanes,rt),g=gt.get(w,b.length),g.init(),b.push(g),q.enabled===!0&&q.isPresenting===!0){let st=v.xr.getDepthSensingMesh();st!==null&&Ga(st,O,-1/0,v.sortObjects)}Ga(w,O,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(tt,J),Ht=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Ht&&Rt.addToRenderList(g,w),this.info.render.frame++,Z===!0&&it.beginShadows();let G=p.state.shadowsArray;_t.render(G,w,O),Z===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=g.opaque,k=g.transmissive;if(p.setupLights(),O.isArrayCamera){let st=O.cameras;if(k.length>0)for(let ut=0,vt=st.length;ut<vt;ut++){let yt=st[ut];_u(W,k,w,yt)}Ht&&Rt.render(w);for(let ut=0,vt=st.length;ut<vt;ut++){let yt=st[ut];gu(g,w,yt,yt.viewport)}}else k.length>0&&_u(W,k,w,O),Ht&&Rt.render(w),gu(g,w,O);P!==null&&(A.updateMultisampleRenderTarget(P),A.updateRenderTargetMipmap(P)),w.isScene===!0&&w.onAfterRender(v,w,O),re.resetDefaultState(),S=-1,M=null,x.pop(),x.length>0?(p=x[x.length-1],Z===!0&&it.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?g=b[b.length-1]:g=null};function Ga(w,O,G,W){if(w.visible===!1)return;if(w.layers.test(O.layers)){if(w.isGroup)G=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(O);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||V.intersectsSprite(w)){W&&Lt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(mt);let ut=K.update(w),vt=w.material;vt.visible&&g.push(w,ut,vt,G,Lt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||V.intersectsObject(w))){let ut=K.update(w),vt=w.material;if(W&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Lt.copy(w.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Lt.copy(ut.boundingSphere.center)),Lt.applyMatrix4(w.matrixWorld).applyMatrix4(mt)),Array.isArray(vt)){let yt=ut.groups;for(let Pt=0,Nt=yt.length;Pt<Nt;Pt++){let bt=yt[Pt],Kt=vt[bt.materialIndex];Kt&&Kt.visible&&g.push(w,ut,Kt,G,Lt.z,bt)}}else vt.visible&&g.push(w,ut,vt,G,Lt.z,null)}}let st=w.children;for(let ut=0,vt=st.length;ut<vt;ut++)Ga(st[ut],O,G,W)}function gu(w,O,G,W){let k=w.opaque,st=w.transmissive,ut=w.transparent;p.setupLightsView(G),Z===!0&&it.setGlobalState(v.clippingPlanes,G),W&&Tt.viewport(I.copy(W)),k.length>0&&Dr(k,O,G),st.length>0&&Dr(st,O,G),ut.length>0&&Dr(ut,O,G),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function _u(w,O,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Fn(1,1,{generateMipmaps:!0,type:kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float")?gr:cn,minFilter:Ri,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));let st=p.state.transmissionRenderTarget[W.id],ut=W.viewport||I;st.setSize(ut.z,ut.w);let vt=v.getRenderTarget();v.setRenderTarget(st),v.getClearColor(z),H=v.getClearAlpha(),H<1&&v.setClearColor(16777215,.5),v.clear(),Ht&&Rt.render(G);let yt=v.toneMapping;v.toneMapping=ei;let Pt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),Z===!0&&it.setGlobalState(v.clippingPlanes,W),Dr(w,G,W),A.updateMultisampleRenderTarget(st),A.updateRenderTargetMipmap(st),kt.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let bt=0,Kt=O.length;bt<Kt;bt++){let oe=O[bt],ae=oe.object,$e=oe.geometry,Jt=oe.material,wt=oe.group;if(Jt.side===we&&ae.layers.test(W.layers)){let wn=Jt.side;Jt.side=Ge,Jt.needsUpdate=!0,xu(ae,G,W,$e,Jt,wt),Jt.side=wn,Jt.needsUpdate=!0,Nt=!0}}Nt===!0&&(A.updateMultisampleRenderTarget(st),A.updateRenderTargetMipmap(st))}v.setRenderTarget(vt),v.setClearColor(z,H),Pt!==void 0&&(W.viewport=Pt),v.toneMapping=yt}function Dr(w,O,G){let W=O.isScene===!0?O.overrideMaterial:null;for(let k=0,st=w.length;k<st;k++){let ut=w[k],vt=ut.object,yt=ut.geometry,Pt=W===null?ut.material:W,Nt=ut.group;vt.layers.test(G.layers)&&xu(vt,O,G,yt,Pt,Nt)}}function xu(w,O,G,W,k,st){w.onBeforeRender(v,O,G,W,k,st),w.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),k.onBeforeRender(v,O,G,W,w,st),k.transparent===!0&&k.side===we&&k.forceSinglePass===!1?(k.side=Ge,k.needsUpdate=!0,v.renderBufferDirect(G,O,W,k,w,st),k.side=ni,k.needsUpdate=!0,v.renderBufferDirect(G,O,W,k,w,st),k.side=we):v.renderBufferDirect(G,O,W,k,w,st),w.onAfterRender(v,O,G,W,k,st)}function Lr(w,O,G){O.isScene!==!0&&(O=ee);let W=At.get(w),k=p.state.lights,st=p.state.shadowsArray,ut=k.state.version,vt=Mt.getParameters(w,k.state,st,O,G),yt=Mt.getProgramCacheKey(vt),Pt=W.programs;W.environment=w.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(w.isMeshStandardMaterial?$:y).get(w.envMap||W.environment),W.envMapRotation=W.environment!==null&&w.envMap===null?O.environmentRotation:w.envMapRotation,Pt===void 0&&(w.addEventListener("dispose",Ut),Pt=new Map,W.programs=Pt);let Nt=Pt.get(yt);if(Nt!==void 0){if(W.currentProgram===Nt&&W.lightsStateVersion===ut)return yu(w,vt),Nt}else vt.uniforms=Mt.getUniforms(w),w.onBeforeCompile(vt,v),Nt=Mt.acquireProgram(vt,yt),Pt.set(yt,Nt),W.uniforms=vt.uniforms;let bt=W.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(bt.clippingPlanes=it.uniform),yu(w,vt),W.needsLights=Nm(w),W.lightsStateVersion=ut,W.needsLights&&(bt.ambientLightColor.value=k.state.ambient,bt.lightProbe.value=k.state.probe,bt.directionalLights.value=k.state.directional,bt.directionalLightShadows.value=k.state.directionalShadow,bt.spotLights.value=k.state.spot,bt.spotLightShadows.value=k.state.spotShadow,bt.rectAreaLights.value=k.state.rectArea,bt.ltc_1.value=k.state.rectAreaLTC1,bt.ltc_2.value=k.state.rectAreaLTC2,bt.pointLights.value=k.state.point,bt.pointLightShadows.value=k.state.pointShadow,bt.hemisphereLights.value=k.state.hemi,bt.directionalShadowMap.value=k.state.directionalShadowMap,bt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,bt.spotShadowMap.value=k.state.spotShadowMap,bt.spotLightMatrix.value=k.state.spotLightMatrix,bt.spotLightMap.value=k.state.spotLightMap,bt.pointShadowMap.value=k.state.pointShadowMap,bt.pointShadowMatrix.value=k.state.pointShadowMatrix),W.currentProgram=Nt,W.uniformsList=null,Nt}function vu(w){if(w.uniformsList===null){let O=w.currentProgram.getUniforms();w.uniformsList=gs.seqWithValue(O.seq,w.uniforms)}return w.uniformsList}function yu(w,O){let G=At.get(w);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function Lm(w,O,G,W,k){O.isScene!==!0&&(O=ee),A.resetTextureUnits();let st=O.fog,ut=W.isMeshStandardMaterial?O.environment:null,vt=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:As,yt=(W.isMeshStandardMaterial?$:y).get(W.envMap||ut),Pt=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Nt=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),bt=!!G.morphAttributes.position,Kt=!!G.morphAttributes.normal,oe=!!G.morphAttributes.color,ae=ei;W.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ae=v.toneMapping);let $e=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Jt=$e!==void 0?$e.length:0,wt=At.get(W),wn=p.state.lights;if(Z===!0&&(rt===!0||w!==M)){let je=w===M&&W.id===S;it.setState(W,w,je)}let jt=!1;W.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==wn.state.version||wt.outputColorSpace!==vt||k.isBatchedMesh&&wt.batching===!1||!k.isBatchedMesh&&wt.batching===!0||k.isBatchedMesh&&wt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&wt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&wt.instancing===!1||!k.isInstancedMesh&&wt.instancing===!0||k.isSkinnedMesh&&wt.skinning===!1||!k.isSkinnedMesh&&wt.skinning===!0||k.isInstancedMesh&&wt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&wt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&wt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&wt.instancingMorph===!1&&k.morphTexture!==null||wt.envMap!==yt||W.fog===!0&&wt.fog!==st||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==it.numPlanes||wt.numIntersection!==it.numIntersection)||wt.vertexAlphas!==Pt||wt.vertexTangents!==Nt||wt.morphTargets!==bt||wt.morphNormals!==Kt||wt.morphColors!==oe||wt.toneMapping!==ae||wt.morphTargetsCount!==Jt)&&(jt=!0):(jt=!0,wt.__version=W.version);let sn=wt.currentProgram;jt===!0&&(sn=Lr(W,O,k));let Gi=!1,qe=!1,Vs=!1,le=sn.getUniforms(),fn=wt.uniforms;if(Tt.useProgram(sn.program)&&(Gi=!0,qe=!0,Vs=!0),W.id!==S&&(S=W.id,qe=!0),Gi||M!==w){Tt.buffers.depth.getReversed()?(nt.copy(w.projectionMatrix),E_(nt),A_(nt),le.setValue(U,"projectionMatrix",nt)):le.setValue(U,"projectionMatrix",w.projectionMatrix),le.setValue(U,"viewMatrix",w.matrixWorldInverse);let Gn=le.map.cameraPosition;Gn!==void 0&&Gn.setValue(U,St.setFromMatrixPosition(w.matrixWorld)),Vt.logarithmicDepthBuffer&&le.setValue(U,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&le.setValue(U,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,qe=!0,Vs=!0)}if(k.isSkinnedMesh){le.setOptional(U,k,"bindMatrix"),le.setOptional(U,k,"bindMatrixInverse");let je=k.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),le.setValue(U,"boneTexture",je.boneTexture,A))}k.isBatchedMesh&&(le.setOptional(U,k,"batchingTexture"),le.setValue(U,"batchingTexture",k._matricesTexture,A),le.setOptional(U,k,"batchingIdTexture"),le.setValue(U,"batchingIdTexture",k._indirectTexture,A),le.setOptional(U,k,"batchingColorTexture"),k._colorsTexture!==null&&le.setValue(U,"batchingColorTexture",k._colorsTexture,A));let $s=G.morphAttributes;if(($s.position!==void 0||$s.normal!==void 0||$s.color!==void 0)&&Ct.update(k,G,sn),(qe||wt.receiveShadow!==k.receiveShadow)&&(wt.receiveShadow=k.receiveShadow,le.setValue(U,"receiveShadow",k.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(fn.envMap.value=yt,fn.flipEnvMap.value=yt.isCubeTexture&&yt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&O.environment!==null&&(fn.envMapIntensity.value=O.environmentIntensity),qe&&(le.setValue(U,"toneMappingExposure",v.toneMappingExposure),wt.needsLights&&Um(fn,Vs),st&&W.fog===!0&&lt.refreshFogUniforms(fn,st),lt.refreshMaterialUniforms(fn,W,F,X,p.state.transmissionRenderTarget[w.id]),gs.upload(U,vu(wt),fn,A)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(gs.upload(U,vu(wt),fn,A),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&le.setValue(U,"center",k.center),le.setValue(U,"modelViewMatrix",k.modelViewMatrix),le.setValue(U,"normalMatrix",k.normalMatrix),le.setValue(U,"modelMatrix",k.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let je=W.uniformsGroups;for(let Gn=0,Wn=je.length;Gn<Wn;Gn++){let bu=je[Gn];D.update(bu,sn),D.bind(bu,sn)}}return sn}function Um(w,O){w.ambientLightColor.needsUpdate=O,w.lightProbe.needsUpdate=O,w.directionalLights.needsUpdate=O,w.directionalLightShadows.needsUpdate=O,w.pointLights.needsUpdate=O,w.pointLightShadows.needsUpdate=O,w.spotLights.needsUpdate=O,w.spotLightShadows.needsUpdate=O,w.rectAreaLights.needsUpdate=O,w.hemisphereLights.needsUpdate=O}function Nm(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(w,O,G){At.get(w.texture).__webglTexture=O,At.get(w.depthTexture).__webglTexture=G;let W=At.get(w);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||kt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,O){let G=At.get(w);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(w,O=0,G=0){P=w,T=O,R=G;let W=!0,k=null,st=!1,ut=!1;if(w){let yt=At.get(w);if(yt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(U.FRAMEBUFFER,null),W=!1;else if(yt.__webglFramebuffer===void 0)A.setupRenderTarget(w);else if(yt.__hasExternalTextures)A.rebindTextures(w,At.get(w.texture).__webglTexture,At.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let bt=w.depthTexture;if(yt.__boundDepthTexture!==bt){if(bt!==null&&At.has(bt)&&(w.width!==bt.image.width||w.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(w)}}let Pt=w.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(ut=!0);let Nt=At.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Nt[O])?k=Nt[O][G]:k=Nt[O],st=!0):w.samples>0&&A.useMultisampledRTT(w)===!1?k=At.get(w).__webglMultisampledFramebuffer:Array.isArray(Nt)?k=Nt[G]:k=Nt,I.copy(w.viewport),L.copy(w.scissor),E=w.scissorTest}else I.copy(ct).multiplyScalar(F).floor(),L.copy(pt).multiplyScalar(F).floor(),E=Et;if(Tt.bindFramebuffer(U.FRAMEBUFFER,k)&&W&&Tt.drawBuffers(w,k),Tt.viewport(I),Tt.scissor(L),Tt.setScissorTest(E),st){let yt=At.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+O,yt.__webglTexture,G)}else if(ut){let yt=At.get(w.texture),Pt=O||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,yt.__webglTexture,G||0,Pt)}S=-1},this.readRenderTargetPixels=function(w,O,G,W,k,st,ut){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=At.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ut!==void 0&&(vt=vt[ut]),vt){Tt.bindFramebuffer(U.FRAMEBUFFER,vt);try{let yt=w.texture,Pt=yt.format,Nt=yt.type;if(!Vt.textureFormatReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Vt.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=w.width-W&&G>=0&&G<=w.height-k&&U.readPixels(O,G,W,k,Ft.convert(Pt),Ft.convert(Nt),st)}finally{let yt=P!==null?At.get(P).__webglFramebuffer:null;Tt.bindFramebuffer(U.FRAMEBUFFER,yt)}}},this.readRenderTargetPixelsAsync=async function(w,O,G,W,k,st,ut){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=At.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ut!==void 0&&(vt=vt[ut]),vt){let yt=w.texture,Pt=yt.format,Nt=yt.type;if(!Vt.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Vt.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=w.width-W&&G>=0&&G<=w.height-k){Tt.bindFramebuffer(U.FRAMEBUFFER,vt);let bt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,bt),U.bufferData(U.PIXEL_PACK_BUFFER,st.byteLength,U.STREAM_READ),U.readPixels(O,G,W,k,Ft.convert(Pt),Ft.convert(Nt),0);let Kt=P!==null?At.get(P).__webglFramebuffer:null;Tt.bindFramebuffer(U.FRAMEBUFFER,Kt);let oe=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await S_(U,oe,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,bt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,st),U.deleteBuffer(bt),U.deleteSync(oe),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,O=null,G=0){w.isTexture!==!0&&(or("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,w=arguments[1]);let W=Math.pow(2,-G),k=Math.floor(w.image.width*W),st=Math.floor(w.image.height*W),ut=O!==null?O.x:0,vt=O!==null?O.y:0;A.setTexture2D(w,0),U.copyTexSubImage2D(U.TEXTURE_2D,G,0,0,ut,vt,k,st),Tt.unbindTexture()},this.copyTextureToTexture=function(w,O,G=null,W=null,k=0){w.isTexture!==!0&&(or("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,w=arguments[1],O=arguments[2],k=arguments[3]||0,G=null);let st,ut,vt,yt,Pt,Nt,bt,Kt,oe,ae=w.isCompressedTexture?w.mipmaps[k]:w.image;G!==null?(st=G.max.x-G.min.x,ut=G.max.y-G.min.y,vt=G.isBox3?G.max.z-G.min.z:1,yt=G.min.x,Pt=G.min.y,Nt=G.isBox3?G.min.z:0):(st=ae.width,ut=ae.height,vt=ae.depth||1,yt=0,Pt=0,Nt=0),W!==null?(bt=W.x,Kt=W.y,oe=W.z):(bt=0,Kt=0,oe=0);let $e=Ft.convert(O.format),Jt=Ft.convert(O.type),wt;O.isData3DTexture?(A.setTexture3D(O,0),wt=U.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(A.setTexture2DArray(O,0),wt=U.TEXTURE_2D_ARRAY):(A.setTexture2D(O,0),wt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment);let wn=U.getParameter(U.UNPACK_ROW_LENGTH),jt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),sn=U.getParameter(U.UNPACK_SKIP_PIXELS),Gi=U.getParameter(U.UNPACK_SKIP_ROWS),qe=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ae.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ae.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,yt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Pt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Nt);let Vs=w.isDataArrayTexture||w.isData3DTexture,le=O.isDataArrayTexture||O.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){let fn=At.get(w),$s=At.get(O),je=At.get(fn.__renderTarget),Gn=At.get($s.__renderTarget);Tt.bindFramebuffer(U.READ_FRAMEBUFFER,je.__webglFramebuffer),Tt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let Wn=0;Wn<vt;Wn++)Vs&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,At.get(w).__webglTexture,k,Nt+Wn),w.isDepthTexture?(le&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,At.get(O).__webglTexture,k,oe+Wn),U.blitFramebuffer(yt,Pt,st,ut,bt,Kt,st,ut,U.DEPTH_BUFFER_BIT,U.NEAREST)):le?U.copyTexSubImage3D(wt,k,bt,Kt,oe+Wn,yt,Pt,st,ut):U.copyTexSubImage2D(wt,k,bt,Kt,oe+Wn,yt,Pt,st,ut);Tt.bindFramebuffer(U.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else le?w.isDataTexture||w.isData3DTexture?U.texSubImage3D(wt,k,bt,Kt,oe,st,ut,vt,$e,Jt,ae.data):O.isCompressedArrayTexture?U.compressedTexSubImage3D(wt,k,bt,Kt,oe,st,ut,vt,$e,ae.data):U.texSubImage3D(wt,k,bt,Kt,oe,st,ut,vt,$e,Jt,ae):w.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,k,bt,Kt,st,ut,$e,Jt,ae.data):w.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,k,bt,Kt,ae.width,ae.height,$e,ae.data):U.texSubImage2D(U.TEXTURE_2D,k,bt,Kt,st,ut,$e,Jt,ae);U.pixelStorei(U.UNPACK_ROW_LENGTH,wn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,jt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,sn),U.pixelStorei(U.UNPACK_SKIP_ROWS,Gi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,qe),k===0&&O.generateMipmaps&&U.generateMipmap(wt),Tt.unbindTexture()},this.copyTextureToTexture3D=function(w,O,G=null,W=null,k=0){return w.isTexture!==!0&&(or("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,W=arguments[1]||null,w=arguments[2],O=arguments[3],k=arguments[4]||0),or('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,O,G,W,k)},this.initRenderTarget=function(w){At.get(w).__webglFramebuffer===void 0&&A.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?A.setTextureCube(w,0):w.isData3DTexture?A.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?A.setTexture2DArray(w,0):A.setTexture2D(w,0),Tt.unbindTexture()},this.resetState=function(){T=0,R=0,P=null,Tt.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}};var Wo=class extends Ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Xo=class extends Je{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Oe,h=Oe,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ss=class extends ii{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new $t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},qo=new B,Yo=new B,af=new ce,rr=new Ii,yo=new Ms,Gl=new B,lf=new B,Zc=class extends Ve{constructor(t=new We,e=new Ss){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)qo.fromBufferAttribute(e,s-1),Yo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=qo.distanceTo(Yo);t.setAttribute("lineDistance",new Be(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),yo.copy(n.boundingSphere),yo.applyMatrix4(s),yo.radius+=r,t.ray.intersectsSphere(yo)===!1)return;af.copy(s).invert(),rr.copy(t.ray).applyMatrix4(af);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=c){let p=h.getX(_),b=h.getX(_+1),x=bo(this,t,rr,l,p,b);x&&e.push(x)}if(this.isLineLoop){let _=h.getX(m-1),g=h.getX(f),p=bo(this,t,rr,l,_,g);p&&e.push(p)}}else{let f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=c){let p=bo(this,t,rr,l,_,_+1);p&&e.push(p)}if(this.isLineLoop){let _=bo(this,t,rr,l,m-1,f);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function bo(i,t,e,n,s,r){let o=i.geometry.attributes.position;if(qo.fromBufferAttribute(o,s),Yo.fromBufferAttribute(o,r),e.distanceSqToSegment(qo,Yo,Gl,lf)>n)return;Gl.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Gl);if(!(l<t.near||l>t.far))return{distance:l,point:lf.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var cf=new B,hf=new B,pr=class extends Zc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)cf.fromBufferAttribute(e,s),hf.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+cf.distanceTo(hf);t.setAttribute("lineDistance",new Be(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Mo=new B,wo=new B,Wl=new B,So=new Qn,Zo=class extends We{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(ps*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let m=0;m<l;m+=3){o?(c[0]=o.getX(m),c[1]=o.getX(m+1),c[2]=o.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:_,b:g,c:p}=So;if(_.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),So.getNormal(Wl),d[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,d[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,d[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let b=0;b<3;b++){let x=(b+1)%3,v=d[b],C=d[x],T=So[h[b]],R=So[h[x]],P=`${v}_${C}`,S=`${C}_${v}`;S in u&&u[S]?(Wl.dot(u[S].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(R.x,R.y,R.z)),u[S]=null):P in u||(u[P]={index0:c[b],index1:c[x],normal:Wl.clone()})}}for(let m in u)if(u[m]){let{index0:_,index1:g}=u[m];Mo.fromBufferAttribute(a,_),wo.fromBufferAttribute(a,g),f.push(Mo.x,Mo.y,Mo.z),f.push(wo.x,wo.y,wo.z)}this.setAttribute("position",new Be(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var Ko=class i extends We{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new B,u=new B,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){let b=[],x=p/n,v=0;p===0&&o===0?v=.5/e:p===n&&l===Math.PI&&(v=-.5/e);for(let C=0;C<=e;C++){let T=C/e;d.x=-t*Math.cos(s+T*r)*Math.sin(o+x*a),d.y=t*Math.cos(o+x*a),d.z=t*Math.sin(s+T*r)*Math.sin(o+x*a),m.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),g.push(T+v,1-x),b.push(c++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<e;b++){let x=h[p][b+1],v=h[p][b],C=h[p+1][b],T=h[p+1][b+1];(p!==0||o>0)&&f.push(x,v,T),(p!==n-1||l<Math.PI)&&f.push(v,C,T)}this.setIndex(f),this.setAttribute("position",new Be(m,3)),this.setAttribute("normal",new Be(_,3)),this.setAttribute("uv",new Be(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var zn=class extends ii{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tf,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=hh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Eo(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function yb(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Es=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Kc=class extends Es{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cd,endingEnd:cd}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case hd:r=t,a=2*e-n;break;case ud:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case hd:o=t,l=2*n-e;break;case ud:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),_=m*m,g=_*m,p=-u*g+2*u*_-u*m,b=(1+u)*g+(-1.5-2*u)*_+(-.5+u)*m+1,x=(-1-f)*g+(1.5+f)*_+.5*m,v=f*g-f*_;for(let C=0;C!==a;++C)r[C]=p*o[h+C]+b*o[c+C]+x*o[l+C]+v*o[d+C];return r}},Jc=class extends Es{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},jc=class extends Es{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},un=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Eo(e,this.TimeBufferType),this.values=Eo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Eo(t.times,Array),values:Eo(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new jc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Jc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Kc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Io:e=this.InterpolantFactoryMethodDiscrete;break;case Dc:e=this.InterpolantFactoryMethodLinear;break;case _l:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Io;case this.InterpolantFactoryMethodLinear:return Dc;case this.InterpolantFactoryMethodSmooth:return _l}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&yb(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===_l,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let m=0;m!==n;++m){let _=e[d+m];if(_!==e[u+m]||_!==e[f+m]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};un.prototype.TimeBufferType=Float32Array;un.prototype.ValueBufferType=Float32Array;un.prototype.DefaultInterpolation=Dc;var Di=class extends un{constructor(t,e,n){super(t,e,n)}};Di.prototype.ValueTypeName="bool";Di.prototype.ValueBufferType=Array;Di.prototype.DefaultInterpolation=Io;Di.prototype.InterpolantFactoryMethodLinear=void 0;Di.prototype.InterpolantFactoryMethodSmooth=void 0;var Qc=class extends un{};Qc.prototype.ValueTypeName="color";var th=class extends un{};th.prototype.ValueTypeName="number";var eh=class extends Es{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)hn.slerpFlat(r,0,o,c-a,o,c,l);return r}},Jo=class extends un{InterpolantFactoryMethodLinear(t){return new eh(this.times,this.values,this.getValueSize(),t)}};Jo.prototype.ValueTypeName="quaternion";Jo.prototype.InterpolantFactoryMethodSmooth=void 0;var Li=class extends un{constructor(t,e,n){super(t,e,n)}};Li.prototype.ValueTypeName="string";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=Io;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;var nh=class extends un{};nh.prototype.ValueTypeName="vector";var ih=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}},bb=new ih,sh=class{constructor(t){this.manager=t!==void 0?t:bb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};sh.DEFAULT_MATERIAL_NAME="__DEFAULT";var jo=class extends Ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new $t(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var Xl=new ce,uf=new B,df=new B,rh=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new It(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fr,this._frameExtents=new It(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;uf.setFromMatrixPosition(t.matrixWorld),e.position.copy(uf),df.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(df),e.updateMatrixWorld(),Xl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Xl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var oh=class extends rh{constructor(){super(new Vo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Qo=class extends jo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ve.DEFAULT_UP),this.updateMatrix(),this.target=new Ve,this.shadow=new oh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},ta=class extends jo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var vh="\\[\\]\\.:\\/",Mb=new RegExp("["+vh+"]","g"),yh="[^"+vh+"]",wb="[^"+vh.replace("\\.","")+"]",Sb=/((?:WC+[\/:])*)/.source.replace("WC",yh),Eb=/(WCOD+)?/.source.replace("WCOD",wb),Ab=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yh),Tb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yh),Rb=new RegExp("^"+Sb+Eb+Ab+Tb+"$"),Cb=["material","materials","bones","map"],ah=class{constructor(t,e,n){let s=n||he.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},he=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Mb,"")}static parseTrackName(t){let e=Rb.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Cb.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};he.Composite=ah;he.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};he.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};he.prototype.GetterByBindingType=[he.prototype._getValue_direct,he.prototype._getValue_array,he.prototype._getValue_arrayElement,he.prototype._getValue_toArray];he.prototype.SetterByBindingTypeAndVersioning=[[he.prototype._setValue_direct,he.prototype._setValue_direct_setNeedsUpdate,he.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[he.prototype._setValue_array,he.prototype._setValue_array_setNeedsUpdate,he.prototype._setValue_array_setMatrixWorldNeedsUpdate],[he.prototype._setValue_arrayElement,he.prototype._setValue_arrayElement_setNeedsUpdate,he.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[he.prototype._setValue_fromArray,he.prototype._setValue_fromArray_setNeedsUpdate,he.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Sw=new Float32Array(1);var ff=new ce,ea=class{constructor(t,e,n=0,s=1/0){this.ray=new Ii(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new dr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ff.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ff),this}intersectObject(t,e=!0,n=[]){return lh(t,this,n,e),n.sort(pf),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)lh(t[s],this,n,e);return n.sort(pf),n}};function pf(i,t){return i.distance-t.distance}function lh(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)lh(r[o],t,e,!0)}}var mr=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ne(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var na=class extends kn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ch}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ch);var Ff={type:"change"},Mh={type:"start"},Bf={type:"end"},oa=new Ii,zf=new ln,Pb=Math.cos(70*Cf.DEG2RAD),Ae=new B,Xe=2*Math.PI,ie={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},bh=1e-6,aa=class extends na{constructor(t,e=null){super(t,e),this.state=ie.NONE,this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ui.ROTATE,MIDDLE:Ui.DOLLY,RIGHT:Ui.PAN},this.touches={ONE:Ni.ROTATE,TWO:Ni.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new hn,this._lastTargetPosition=new B,this._quat=new hn().setFromUnitVectors(t.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new mr,this._sphericalDelta=new mr,this._scale=1,this._panOffset=new B,this._rotateStart=new It,this._rotateEnd=new It,this._rotateDelta=new It,this._panStart=new It,this._panEnd=new It,this._panDelta=new It,this._dollyStart=new It,this._dollyEnd=new It,this._dollyDelta=new It,this._dollyDirection=new B,this._mouse=new It,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Db.bind(this),this._onPointerDown=Ib.bind(this),this._onPointerUp=Lb.bind(this),this._onContextMenu=Bb.bind(this),this._onMouseWheel=Ob.bind(this),this._onKeyDown=kb.bind(this),this._onTouchStart=Fb.bind(this),this._onTouchMove=zb.bind(this),this._onMouseDown=Ub.bind(this),this._onMouseMove=Nb.bind(this),this._interceptControlDown=Vb.bind(this),this._interceptControlUp=$b.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ff),this.update(),this.state=ie.NONE}update(t=null){let e=this.object.position;Ae.copy(e).sub(this.target),Ae.applyQuaternion(this._quat),this._spherical.setFromVector3(Ae),this.autoRotate&&this.state===ie.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Xe:n>Math.PI&&(n-=Xe),s<-Math.PI?s+=Xe:s>Math.PI&&(s-=Xe),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ae.setFromSpherical(this._spherical),Ae.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ae),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ae.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new B(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new B(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ae.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(oa.origin.copy(this.object.position),oa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(oa.direction))<Pb?this.object.lookAt(this.target):(zf.setFromNormalAndCoplanarPoint(this.object.up,this.target),oa.intersectPlane(zf,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>bh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>bh||this._lastTargetPosition.distanceToSquared(this.target)>bh?(this.dispatchEvent(Ff),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Xe/60*this.autoRotateSpeed*t:Xe/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ae.setFromMatrixColumn(e,0),Ae.multiplyScalar(-t),this._panOffset.add(Ae)}_panUp(t,e){this.screenSpacePanning===!0?Ae.setFromMatrixColumn(e,1):(Ae.setFromMatrixColumn(e,0),Ae.crossVectors(this.object.up,Ae)),Ae.multiplyScalar(t),this._panOffset.add(Ae)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ae.copy(s).sub(this.target);let r=Ae.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Xe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Xe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Xe*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Xe*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Xe*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Xe*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Xe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Xe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new It,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Ib(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Db(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Lb(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Bf),this.state=ie.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Ub(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ui.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ie.DOLLY;break;case Ui.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}break;case Ui.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(Mh)}function Nb(i){switch(this.state){case ie.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ie.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ie.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Ob(i){this.enabled===!1||this.enableZoom===!1||this.state!==ie.NONE||(i.preventDefault(),this.dispatchEvent(Mh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Bf))}function kb(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function Fb(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ni.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ie.TOUCH_ROTATE;break;case Ni.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ie.TOUCH_PAN;break;default:this.state=ie.NONE}break;case 2:switch(this.touches.TWO){case Ni.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ie.TOUCH_DOLLY_PAN;break;case Ni.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ie.TOUCH_DOLLY_ROTATE;break;default:this.state=ie.NONE}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(Mh)}function zb(i){switch(this._trackPointer(i),this.state){case ie.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ie.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ie.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ie.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ie.NONE}}function Bb(i){this.enabled!==!1&&i.preventDefault()}function Vb(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function $b(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var ri=Math.PI/180;function Hb(i,t,e=0){return[i,e,t]}var oi=(i,t)=>[i[0]+t[0],i[1]+t[1],i[2]+t[2]],Vf=(i,t)=>[i[0]-t[0],i[1]-t[1],i[2]-t[2]],dn=(i,t)=>[i[0]*t,i[1]*t,i[2]*t],Cs=(i,t)=>i[0]*t[0]+i[1]*t[1]+i[2]*t[2],Eh=(i,t)=>[i[1]*t[2]-i[2]*t[1],i[2]*t[0]-i[0]*t[2],i[0]*t[1]-i[1]*t[0]],ca=i=>{let t=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/t,i[1]/t,i[2]/t]};function Ah(i){return Hb(i.x,i.z,i.height??1.9)}function Hf(i){let t=(i.phi??0)*ri,e=(i.tilt??0)*ri,n=[Math.cos(t)*Math.cos(e),-Math.sin(e),Math.sin(t)*Math.cos(e)],s=[-Math.sin(t),0,Math.cos(t)],r=Eh(s,n);return{f:n,r:s,u:r}}function Gf(i){let t=Hf(i.mount==="ceiling"?{...i,tilt:90}:i);return{x:t.r,y:t.u,z:dn(t.f,-1)}}function Gb(i,t,e){let n=t*ri,s=e*ri,r=Math.cos(s);return ca(oi(oi(dn(i.f,r*Math.cos(n)),dn(i.r,r*Math.sin(n))),dn(i.u,Math.sin(s))))}function wh(i,t,e,n=0,s=1/0){let r=e;return t[1]<-1e-9&&Number.isFinite(n)&&(r=Math.min(r,Math.max(0,(i[1]-n)/-t[1]))),t[1]>1e-9&&Number.isFinite(s)&&(r=Math.min(r,Math.max(0,(s-i[1])/t[1]))),r}function Wf(i,t={}){let e=t.yMin??0,n=t.yMax??1/0,s=t.segments??28,r=Ah(i),o=i.reach>0?i.reach:5,a=i.fov_h>0?i.fov_h:90,l=i.fov_v>0?i.fov_v:90;if(i.mount==="ceiling"){let p=i.ceiling_fov>0?i.ceiling_fov:Math.max(a,l),b=Math.min(p/2,89)*ri,x=[r];for(let S=0;S<s;S++){let M=S/s*2*Math.PI,I=[Math.sin(b)*Math.cos(M),-Math.cos(b),Math.sin(b)*Math.sin(M)];x.push(oi(r,dn(I,wh(r,I,o,e,n))))}let v=wh(r,[0,-1,0],o,e,n);x.push(oi(r,[0,-v,0]));let C=x.length-1,T=[];for(let S=0;S<s;S++){let M=(S+1)%s;T.push(0,1+M,1+S),T.push(C,1+S,1+M)}let R=[],P=4;for(let S=0;S<P;S++){let M=x[1+Math.round(S/P*s)%s];R.push(...r,...M)}for(let S=0;S<s;S++)R.push(...x[1+S],...x[1+(S+1)%s]);return{apex:r,corners:x.slice(1,1+s),positions:x.flat(),indices:T,edges:R}}let c=Hf(i),h=Math.min(a/2,89),d=Math.min(l/2,89),f=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([p,b])=>{let x=Gb(c,p*h,b*d);return oi(r,dn(x,wh(r,x,o,e,n)))}),m=[r,...f],_=[0,1,2,0,2,3,0,3,4,0,4,1,1,3,2,1,4,3],g=[];for(let p=0;p<4;p++)g.push(...r,...f[p]),g.push(...f[p],...f[(p+1)%4]);return{apex:r,corners:f,positions:m.flat(),indices:_,edges:g}}function Xf(i){let t=[];for(let e of i||[]){let n=t[t.length-1];(!n||Math.abs(n[0]-e[0])>1e-9||Math.abs(n[1]-e[1])>1e-9)&&t.push([e[0],e[1]])}for(;t.length>1&&Math.abs(t[0][0]-t[t.length-1][0])<1e-9&&Math.abs(t[0][1]-t[t.length-1][1])<1e-9;)t.pop();return t}function Th(i){let t=0;for(let e=0;e<i.length;e++){let[n,s]=i[e],[r,o]=i[(e+1)%i.length];t+=n*o-r*s}return t/2}function Wb(i,t,e,n){let s=(i[0]-e[0])*(t[1]-e[1])-(t[0]-e[0])*(i[1]-e[1]),r=(i[0]-n[0])*(e[1]-n[1])-(e[0]-n[0])*(i[1]-n[1]),o=(i[0]-t[0])*(n[1]-t[1])-(n[0]-t[0])*(i[1]-t[1]),a=s<-1e-12||r<-1e-12||o<-1e-12,l=s>1e-12||r>1e-12||o>1e-12;return!(a&&l)}function Xb(i){let t=i.length;if(t<3)return[];let e=[...Array(t).keys()];Th(i)<0&&e.reverse();let n=[],s=0;for(;e.length>3&&s++<t*t;){let r=!1;for(let o=0;o<e.length;o++){let a=e[(o-1+e.length)%e.length],l=e[o],c=e[(o+1)%e.length],h=i[a],d=i[l],u=i[c];if((d[0]-h[0])*(u[1]-h[1])-(d[1]-h[1])*(u[0]-h[0])<=1e-12)continue;let m=!0;for(let _ of e){if(_===a||_===l||_===c)continue;let g=i[_];if(Wb(g,h,d,u)){m=!1;break}}if(m){n.push([a,l,c]),e.splice(o,1),r=!0;break}}r||(n.push([e[0],e[1],e[2]]),e.splice(1,1))}return e.length===3&&n.push([e[0],e[1],e[2]]),n.filter(([r,o,a])=>{let l=i[r],c=i[o],h=i[a];return Math.abs((c[0]-l[0])*(h[1]-l[1])-(c[1]-l[1])*(h[0]-l[0]))>1e-12})}function _r(i,t,e){let n=Xf(i);if(n.length<3)return{positions:[],indices:[]};Th(n)<0&&n.reverse();let s=[],r=[],o=Xb(n),a=Math.abs(e-t)<1e-9,l=s.length/3;for(let h of n)s.push(h[0],e,h[1]);for(let[h,d,u]of o)r.push(l+h,l+u,l+d);if(a)return{positions:s,indices:r};let c=s.length/3;for(let h of n)s.push(h[0],t,h[1]);for(let[h,d,u]of o)r.push(c+h,c+d,c+u);for(let h=0;h<n.length;h++){let d=(h+1)%n.length,u=s.length/3;s.push(n[h][0],t,n[h][1],n[d][0],t,n[d][1],n[d][0],e,n[d][1],n[h][0],e,n[h][1]),r.push(u,u+2,u+1,u,u+3,u+2)}return{positions:s,indices:r}}function Oi(i){let t=[],e=[];for(let n of i){let s=t.length/3;for(let r of n.positions)t.push(r);for(let r of n.indices)e.push(r+s)}return{positions:t,indices:e}}function la(i,t,e,n){let s=n==="le"?1:-1,r=a=>s*(a[0]*t[0]+a[1]*t[1]-e),o=[];for(let a=0;a<i.length;a++){let l=i[a],c=i[(a+1)%i.length],h=r(l),d=r(c);if(h<=0&&o.push(l),h<0&&d>0||h>0&&d<0){let u=h/(h-d);o.push([l[0]+(c[0]-l[0])*u,l[1]+(c[1]-l[1])*u])}}return o}function qb(i,t,e=.02){let n=!1;for(let s=0,r=t.length-1;s<t.length;r=s++){let[o,a]=t[s],[l,c]=t[r];a>i[1]!=c>i[1]&&i[0]<(l-o)*(i[1]-a)/(c-a)+o&&(n=!n)}if(n)return!0;for(let s=0;s<t.length;s++){let r=t[s],o=t[(s+1)%t.length],a=o[0]-r[0],l=o[1]-r[1],c=a*a+l*l||1,h=Math.max(0,Math.min(1,((i[0]-r[0])*a+(i[1]-r[1])*l)/c));if(Math.hypot(i[0]-(r[0]+a*h),i[1]-(r[1]+l*h))<=e)return!0}return!1}function Yb(i,t,e){let n=Xf(i),s=[{poly:n,y0:0,y1:e}];for(let r of t){let o=[(r.a[0]+r.b[0])/2,(r.a[1]+r.b[1])/2];if(!qb(o,n,.03))continue;let a=Math.hypot(r.b[0]-r.a[0],r.b[1]-r.a[1]);if(a<1e-6)continue;let l=[(r.b[0]-r.a[0])/a,(r.b[1]-r.a[1])/a],c=r.a[0]*l[0]+r.a[1]*l[1],h=r.b[0]*l[0]+r.b[1]*l[1],d=[],u=(f,m,_)=>{f.length>=3&&Math.abs(Th(f))>1e-6&&_-m>1e-6&&d.push({poly:f,y0:m,y1:_})};for(let f of s){u(la(f.poly,l,c,"le"),f.y0,f.y1),u(la(f.poly,l,h,"ge"),f.y0,f.y1);let m=la(la(f.poly,l,c,"ge"),l,h,"le");r.y0>f.y0&&u(m,f.y0,Math.min(r.y0,f.y1)),r.y1<f.y1&&u(m,Math.max(r.y1,f.y0),f.y1)}s=d}return s}function Zb(i,t,e,n){return{positions:[i[0],e,i[1],t[0],e,t[1],t[0],n,t[1],i[0],n,i[1]],indices:[0,1,2,0,2,3]}}function qf(i){let t=i?.floor?.height>0?i.floor.height:2.6,e=i?.doors||[],n=i?.windows||[],s=[...e.map(u=>({a:u.a,b:u.b,y0:u.sill??0,y1:Math.min(t,(u.sill??0)+(u.height??2))})),...n.map(u=>{let f=u.sill??.9;return{a:u.a,b:u.b,y0:f,y1:Math.min(t,f+(u.height??1.1))}})],r=[];for(let u of i?.rooms||[])r.push(_r(u.points,0,0));let o=[];for(let u of i?.bands||[])for(let f of Yb(u,s,t))o.push(_r(f.poly,f.y0,f.y1));let a=[];for(let u of i?.freeWalls||[])a.push(_r(u.poly,0,Math.min(u.height??t,t)));let l=[],c=[];for(let u of i?.furniture||[])(u.obstacle?c:l).push(_r(u.poly,0,u.h??.5));let h=n.map((u,f)=>Zb(u.a,u.b,s[e.length+f].y0,s[e.length+f].y1)),d=e.map(u=>{let f=u.b[0]-u.a[0],m=u.b[1]-u.a[1],_=Math.hypot(f,m)||1,g=-m/_*.06,p=f/_*.06;return _r([[u.a[0]-g,u.a[1]-p],[u.b[0]-g,u.b[1]-p],[u.b[0]+g,u.b[1]+p],[u.a[0]+g,u.a[1]+p]],.01,.01)});return{wallHeight:t,floors:Oi(r),walls:Oi(o),freeWalls:Oi(a),furniture:Oi(l),obstacles:Oi(c),windows:Oi(h),thresholds:Oi(d)}}function Yf(i,t={}){let e=i&&Number.isFinite(i.x1-i.x0)?i:{x0:0,x1:10,z0:0,z1:10},n=(t.fov??40)*ri,s=t.aspect>0?t.aspect:1.5,r=t.height??2.6,o=Math.max(e.x1-e.x0,1),a=Math.max(e.z1-e.z0,1),l=(e.x0+e.x1)/2,c=(e.z0+e.z1)/2,h=Math.tan(n/2),d=h*s,u,f,m;if(t.view==="top")u=[l,0,c],f=[0,1,1e-4],m=Math.max(a/2/h,o/2/d)*1.08+r;else{u=[l,r*.25,c];let p=50*ri,b=20*ri;f=[Math.sin(b)*Math.cos(p),Math.sin(p),Math.cos(b)*Math.cos(p)];let x=ca(f),v=ca(Eh(dn(x,-1),[0,1,0])),C=Eh(v,dn(x,-1)),T=Math.max(0,Math.min(t.inset??0,(o-1)/2,(a-1)/2)),R=[];for(let P of[e.x0+T,e.x1-T])for(let S of[e.z0+T,e.z1-T])for(let M of[0,r])R.push([P,M,S]);for(let P=0;P<6;P++){m=0;for(let H of R){let N=Vf(H,u),X=Cs(N,x);m=Math.max(m,X+Math.abs(Cs(N,v))/d,X+Math.abs(Cs(N,C))/h)}let S=1/0,M=-1/0,I=1/0,L=-1/0;for(let H of R){let N=Vf(H,u),X=m-Cs(N,x),F=Cs(N,v)/X/d,tt=Cs(N,C)/X/h;S=Math.min(S,F),M=Math.max(M,F),I=Math.min(I,tt),L=Math.max(L,tt)}let E=(S+M)/2*d*m,z=(I+L)/2*h*m;if(Math.abs(E)<1e-4&&Math.abs(z)<1e-4)break;u=oi(u,oi(dn(v,E),dn(C,z)))}m*=1.04}let _=ca(f),g=oi(u,dn(_,m));return{target:u,position:g,distance:m,near:Math.max(.05,m/200),far:m*12+50,minDistance:.5,maxDistance:m*4}}function Zf(i,t,e=.05){return!i||!t?!0:["x0","x1","z0","z1"].some(n=>Math.abs(i[n]-t[n])>e)}var Sh=["#2f7de1","#e8832a","#2aa876","#a05bd6","#d6477c","#c9a400","#17a2b8","#7a8794"],$f={light:{background:"#eef1f4",floor:"#dde2e8",wall:"#b7bfc9",freeWall:"#98a2ae",furniture:"#8d9bb0",obstacle:"#6f819b",window:"#8ec9ff",door:"#c99a55",spill:"#e5484d",sensorBody:"#2b3138",selected:"#f59f00",inactive:"#9aa3ad"},dark:{background:"#12161b",floor:"#242b34",wall:"#4b5666",freeWall:"#5f6b7c",furniture:"#7a89a0",obstacle:"#94a4bd",window:"#4f9fe0",door:"#b98a4a",spill:"#ff6b6b",sensorBody:"#d8dee6",selected:"#ffc53d",inactive:"#6b7480"}};function Kf(i){return i?$f.dark:$f.light}function Ps(i){if(typeof i!="string")return null;let t=i.trim().toLowerCase(),e=/^#([0-9a-f]{3})$/.exec(t);return e?[...e[1]].map(n=>parseInt(n+n,16)):(e=/^#([0-9a-f]{6})(?:[0-9a-f]{2})?$/.exec(t),e?[0,2,4].map(n=>parseInt(e[1].slice(n,n+2),16)):(e=/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(t),e?[e[1],e[2],e[3]].map(n=>Math.max(0,Math.min(255,Math.round(Number(n))))):null))}function Rh(i,t){for(let e of["colour_index","color_index","colourIndex","colorIndex","colour","color"])if(Number.isInteger(i?.[e])&&i[e]>=0)return i[e];return t}function ha(i,t){let e=Array.isArray(i)&&i.length?i:Sh,n=Ps(e[t%e.length]);return n||Ps(Sh[t%Sh.length])}function Jf(i,t){let e=new Map;return(i||[]).forEach((n,s)=>e.set(n.entity_id,ha(t,Rh(n,s)))),e}function Kb(i){let t=n=>{let s=[...new Set(i.map(o=>Math.round(o[n]*1e4)))].sort((o,a)=>o-a),r=1/0;for(let o=1;o<s.length;o++){let a=s[o]-s[o-1];a>1&&(r=Math.min(r,a))}return r/1e4},e=Math.min(t("x"),t("z"));return Number.isFinite(e)?e:.1}function jf(i,t){let e=i||[],n=t.cellSize||Kb(e),s=t.bounds,r=n/2,o=s.x0-r,a=s.z0-r,l=s.x1+r,c=s.z1+r,h=Math.max(l-o,c-a,1e-6),d=Math.min(t.maxPixels?t.maxPixels/h:2048/h,t.maxPpm??50),u=Math.max(1,Math.ceil((l-o)*d)),f=Math.max(1,Math.ceil((c-a)*d)),m=new Uint8Array(u*f*4),_=t.spillColor||[229,72,77],g=t.selected||null,p=t.colorFor||(()=>[128,128,128]);for(let b of e){let x=b.spill||[],v=x.length>0&&(!g||x.includes(g)),C,T;if(v)C=_,T=.55;else if(b.own>0&&b.own_sensor)C=p(b.own_sensor),T=.2+.55*Math.max(0,Math.min(1,b.own)),g&&b.own_sensor!==g&&(T*=.45);else continue;let R=Math.max(0,Math.round((b.x-n/2-o)*d)),P=Math.min(u,Math.round((b.x+n/2-o)*d)),S=Math.max(0,Math.round((b.z-n/2-a)*d)),M=Math.min(f,Math.round((b.z+n/2-a)*d));P<=R&&(P=Math.min(u,R+1)),M<=S&&(M=Math.min(f,S+1));let I=Math.round(T*255);for(let L=S;L<M;L++)for(let E=R;E<P;E++){let z=(L*u+E)*4;m[z]=C[0],m[z+1]=C[1],m[z+2]=C[2],m[z+3]=I}}return{width:u,height:f,data:m,x0:o,z0:a,x1:l,z1:c,ppm:d,cellSize:n}}var Qf=40,Jb=.004;function tp(i){let t=new We;return t.setAttribute("position",new Re(new Float32Array(i.positions),3)),t.setIndex(new Re(new Uint32Array(i.indices),1)),t.computeVertexNormals(),t}function bn(i,t="#808080"){let e=Ps(i)||Ps(t);return new $t().setRGB(e[0]/255,e[1]/255,e[2]/255,Ue)}function ep(i){i.traverse(t=>{t.geometry&&t.geometry.dispose();let e=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(let n of e)n.map&&n.map.dispose(),n.dispose()})}function Ch(i,t=!1){for(let e of[...i.children])i.remove(e),t?e.traverse(n=>n.geometry&&n.geometry.dispose()):ep(e)}var ua=class{constructor(t,{onSelect:e}={}){this.container=t,this.onSelect=e||(()=>{}),this.state={},this._raf=0,this._disposed=!1,this._framedBounds=null,this._hover=null,this._down=null;let n=document.createElement("canvas");n.style.cssText="display:block;width:100%;height:100%;touch-action:none;outline:none",t.appendChild(n),this.canvas=n,this.renderer=new Go({canvas:n,antialias:!0,alpha:!1,powerPreference:"low-power"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.scene=new Wo,this.camera=new ze(Qf,1.5,.1,200),this.scene.add(new ta(16777215,1.7));let s=new Qo(16777215,1.6);s.position.set(-4,10,6),this.scene.add(s),this.staticGroup=new _n,this.sensorGroup=new _n,this.overlayGroup=new _n,this.scene.add(this.staticGroup,this.overlayGroup,this.sensorGroup),this.mats={floor:new zn({side:we}),wall:new zn({side:we}),freeWall:new zn({side:we}),furniture:new zn({transparent:!0,opacity:.42,depthWrite:!1,side:we}),obstacle:new zn({transparent:!0,opacity:.55,depthWrite:!1,side:we}),window:new vn({transparent:!0,opacity:.35,depthWrite:!1,side:we}),door:new vn({side:we})},this.controls=new aa(this.camera,n),this.controls.screenSpacePanning=!0,this.controls.maxPolarAngle=Math.PI/2-.02,this.controls.addEventListener("change",()=>this._request()),this._userMoved=!1,this._lastView="iso",this.controls.addEventListener("start",()=>{this._userMoved=!0}),this.raycaster=new ea,this._onPointerDown=r=>this._pointerDown(r),this._onPointerUp=r=>this._pointerUp(r),this._onPointerMove=r=>this._pointerMove(r),n.addEventListener("pointerdown",this._onPointerDown),n.addEventListener("pointerup",this._onPointerUp),n.addEventListener("pointermove",this._onPointerMove),this._motionQuery=window.matchMedia?window.matchMedia("(prefers-reduced-motion: reduce)"):null,this._onMotion=()=>this._applyMotion(),this._motionQuery&&this._motionQuery.addEventListener?.("change",this._onMotion),this._applyMotion(),this._resizeObserver=new ResizeObserver(()=>this.resize()),this._resizeObserver.observe(t),this.resize()}setState(t){if(this._disposed)return;let e=this.state,n={dark:!1,height:.9,...t};this.state=n;let s=n.model!==e.model,r=n.dark!==e.dark||!e.palette;r&&(this.palette=Kf(n.dark),this._applyPalette()),s&&this._buildStatic();let o=s||r||n.sensors!==e.sensors||n.colors!==e.colors||n.selected!==e.selected;o&&this._buildSensors(),(o||n.evaluation!==e.evaluation||n.height!==e.height)&&this._buildOverlay(),this.state.palette=this.palette,this._request()}resetView(){this._frame("iso")}topView(){this._frame("top")}resize(){if(this._disposed)return;let t=this.container.clientWidth,e=this.container.clientHeight;t<2||e<2||(this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.state.model&&(!this._sized||!this._userMoved)&&(this._sized=!0,this._frame(this._lastView)),this._request())}dispose(){if(!this._disposed){this._disposed=!0,this._raf&&cancelAnimationFrame(this._raf),this._raf=0,this._resizeObserver.disconnect(),this._motionQuery&&this._motionQuery.removeEventListener?.("change",this._onMotion),this.canvas.removeEventListener("pointerdown",this._onPointerDown),this.canvas.removeEventListener("pointerup",this._onPointerUp),this.canvas.removeEventListener("pointermove",this._onPointerMove),this.controls.dispose(),ep(this.scene);for(let t of Object.values(this.mats))t.dispose();this.renderer.dispose(),this.renderer.forceContextLoss(),this.canvas.remove()}}_request(){this._raf||this._disposed||(this._raf=requestAnimationFrame(()=>{if(this._raf=0,this._disposed)return;let t=this.controls.update();this.renderer.render(this.scene,this.camera),t&&this._request()}))}_applyMotion(){this.controls.enableDamping=!(this._motionQuery&&this._motionQuery.matches)}_frame(t){this._lastView=t,this._userMoved=!1;let e=this.state.model?.bounds,n=Yf(e,{fov:Qf,aspect:this.camera.aspect,height:this.state.model?.floor?.height,inset:.35,view:t});this.camera.near=n.near,this.camera.far=n.far,this.camera.updateProjectionMatrix(),this.camera.position.set(...n.position),this.controls.target.set(...n.target),this.controls.minDistance=n.minDistance,this.controls.maxDistance=n.maxDistance,this.controls.update(),this._request()}_applyPalette(){let t=this.palette;this.scene.background=bn(t.background),this.mats.floor.color=bn(t.floor),this.mats.wall.color=bn(t.wall),this.mats.freeWall.color=bn(t.freeWall),this.mats.furniture.color=bn(t.furniture),this.mats.obstacle.color=bn(t.obstacle),this.mats.window.color=bn(t.window),this.mats.door.color=bn(t.door);for(let e of Object.values(this.mats))e.needsUpdate=!0}_buildStatic(){Ch(this.staticGroup,!0);let t=this.state.model;if(!t)return;let e=qf(t);this._wallHeight=e.wallHeight;let n=(s,r,o=0)=>{if(!s.indices.length)return;let a=new Pe(tp(s),r);a.renderOrder=o,this.staticGroup.add(a)};n(e.floors,this.mats.floor),n(e.thresholds,this.mats.door),n(e.walls,this.mats.wall),n(e.freeWalls,this.mats.freeWall),n(e.furniture,this.mats.furniture,2),n(e.obstacles,this.mats.obstacle,2),n(e.windows,this.mats.window,3),Zf(this._framedBounds,t.bounds)&&(this._framedBounds=t.bounds?{...t.bounds}:null,this._frame("iso"))}_buildSensors(){Ch(this.sensorGroup);let{sensors:t,colors:e,selected:n}=this.state,s=this.palette,r=this._wallHeight??2.6,o=!!n&&(t||[]).some(a=>a.entity_id===n);this._hitMeshes=[],(t||[]).forEach((a,l)=>{if(!Number.isFinite(a.x)||!Number.isFinite(a.z))return;let c=ha(e,Rh(a,l)),h=new $t().setRGB(c[0]/255,c[1]/255,c[2]/255,Ue),d=a.entity_id===n,u=a.active!==!1,f=Ah(a),m=Gf(a),_=new ce().makeBasis(new B(...m.x),new B(...m.y),new B(...m.z));_.setPosition(...f);let g=new Pe(new si(.1,.1,.05),new zn({color:u?h:bn(s.inactive),transparent:!u,opacity:u?1:.6}));g.matrixAutoUpdate=!1,g.matrix.copy(_),g.renderOrder=4,this.sensorGroup.add(g);let p=new Zo(new si(.16,.16,.09)),b=new pr(p,new Ss({color:d?bn(s.selected):h,depthTest:!1}));b.matrixAutoUpdate=!1,b.matrix.copy(_),b.renderOrder=5,this.sensorGroup.add(b);let x=new Pe(new Ko(.22,8,6),new vn({visible:!1}));if(x.position.set(...f),x.userData.entityId=a.entity_id,this.sensorGroup.add(x),this._hitMeshes.push(x),!u)return;let v=Wf(a,{yMin:0,yMax:r}),C=d?.24:o?.04:.09,T=new Pe(tp({positions:v.positions,indices:v.indices}),new vn({color:h,transparent:!0,opacity:C,depthWrite:!1,side:we}));if(T.renderOrder=6,this.sensorGroup.add(T),d){let R=new We;R.setAttribute("position",new Re(new Float32Array(v.edges),3));let P=new pr(R,new Ss({color:h,transparent:!0,opacity:.85}));P.renderOrder=7,this.sensorGroup.add(P)}})}_buildOverlay(){Ch(this.overlayGroup);let{evaluation:t,model:e,height:n,sensors:s,colors:r,selected:o}=this.state,a=t?.grid?.[n]??t?.grid?.[String(n)];if(!e?.bounds||!a||!a.length)return;let l=Jf(s,r),c=jf(a,{bounds:e.bounds,colorFor:m=>l.get(m)||ha(r,0),spillColor:Ps(this.palette.spill),selected:o||null}),h=new Xo(c.data,c.width,c.height,Ke,cn);h.colorSpace=Ue,h.magFilter=Oe,h.minFilter=Oe,h.generateMipmaps=!1,h.needsUpdate=!0;let d=n+Jb,u=new We;u.setAttribute("position",new Re(new Float32Array([c.x0,d,c.z0,c.x1,d,c.z0,c.x1,d,c.z1,c.x0,d,c.z1]),3)),u.setAttribute("uv",new Re(new Float32Array([0,0,1,0,1,1,0,1]),2)),u.setIndex([0,2,1,0,3,2]);let f=new Pe(u,new vn({map:h,transparent:!0,depthWrite:!1,side:we}));f.renderOrder=1,this.overlayGroup.add(f)}_pick(t){if(!this._hitMeshes?.length)return null;let e=this.canvas.getBoundingClientRect(),n=new It((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1);this.raycaster.setFromCamera(n,this.camera);let s=this.raycaster.intersectObjects(this._hitMeshes,!1)[0];return s?s.object.userData.entityId:null}_pointerDown(t){this._down={x:t.clientX,y:t.clientY,t:performance.now()}}_pointerUp(t){let e=this._down;if(this._down=null,!e||t.button>0||Math.hypot(t.clientX-e.x,t.clientY-e.y)>5||performance.now()-e.t>600)return;let n=this._pick(t);n&&this.onSelect(n)}_pointerMove(t){if(t.buttons)return;let e=this._pick(t);e!==this._hover&&(this._hover=e,this.canvas.style.cursor=e?"pointer":"")}};var Ph=class extends He{static properties={model:{attribute:!1},sensors:{attribute:!1},evaluation:{attribute:!1},height:{type:Number},selected:{type:String},dark:{type:Boolean},colors:{attribute:!1},labels:{attribute:!1}};static styles=Sn`
    :host {
      display: block;
      position: relative;
      height: 100%;
      min-height: 240px;
      overflow: hidden;
    }
    .stage {
      position: absolute;
      inset: 0;
    }
    .bar {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      gap: 6px;
    }
    button {
      font: inherit;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.5));
      background: var(--card-background-color, rgba(255, 255, 255, 0.85));
      color: var(--primary-text-color, inherit);
      cursor: pointer;
    }
    button:hover {
      border-color: var(--primary-color, #03a9f4);
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 1px;
    }
  `;constructor(){super(),this.height=.9,this.dark=!1,this.labels={},this._ctl=null}render(){let t={reset:"Reset view",top:"Top view",...this.labels||{}};return Y`
      <div class="stage"></div>
      <div class="bar">
        <button type="button" @click=${()=>this.resetView()}>${t.reset}</button>
        <button type="button" @click=${()=>this.topView()}>${t.top}</button>
      </div>
    `}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this._setup()}firstUpdated(){this._setup()}disconnectedCallback(){super.disconnectedCallback(),this._teardown()}updated(){this._push()}resetView(){this._ctl?.resetView()}topView(){this._ctl?.topView()}_setup(){if(this._ctl)return;let t=this.renderRoot.querySelector(".stage");if(t){try{this._ctl=new ua(t,{onSelect:e=>this.dispatchEvent(new CustomEvent("select",{detail:{entityId:e},bubbles:!0,composed:!0}))})}catch(e){console.warn("pp-view3d: WebGL unavailable",e),this._ctl=null;return}this._push(!0)}}_teardown(){this._ctl?.dispose(),this._ctl=null}_push(){this._ctl?.setState({model:this.model,sensors:this.sensors,evaluation:this.evaluation,height:this.height,selected:this.selected,dark:this.dark,colors:this.colors})}};typeof customElements<"u"&&!customElements.get("pp-view3d")&&customElements.define("pp-view3d",Ph);var ki={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},np=i=>(...t)=>({_$litDirective$:i,values:t}),da=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,n){this._$Ct=t,this._$AM=e,this._$Ci=n}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Fw}=zu;var ip=i=>i.strings===void 0;var jb={},sp=(i,t=jb)=>i._$AH=t;var xe=np(class extends da{constructor(i){if(super(i),i.type!==ki.PROPERTY&&i.type!==ki.ATTRIBUTE&&i.type!==ki.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ip(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===Qe||t===ft)return t;let e=i.element,n=i.name;if(i.type===ki.PROPERTY){if(t===e[n])return Qe}else if(i.type===ki.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(n))return Qe}else if(i.type===ki.ATTRIBUTE&&e.getAttribute(n)===t+"")return Qe;return sp(i),t}});var rp=Sn`
  :host {
    --pp-text: var(--primary-text-color, #1f2328);
    --pp-muted: var(--secondary-text-color, #5f6b76);
    --pp-surface: var(--card-background-color, #ffffff);
    --pp-canvas: var(--primary-background-color, #f4f5f7);
    --pp-divider: var(--divider-color, rgba(0, 0, 0, 0.14));
    --pp-accent: var(--primary-color, #03a9f4);
    --pp-error: var(--error-color, #db4437);
    --pp-wall: var(--pp-text);
    display: block;
    container-type: inline-size;
    color: var(--pp-text);
    font-family: var(--paper-font-body1_-_font-family, var(--ha-font-family-body, system-ui, sans-serif));
    font-size: 14px;
    min-width: 0;
  }
  :host([dark]) {
    --pp-text: var(--primary-text-color, #e3e6ea);
    --pp-muted: var(--secondary-text-color, #9aa4ae);
    --pp-surface: var(--card-background-color, #1f2226);
    --pp-canvas: var(--primary-background-color, #121416);
    --pp-divider: var(--divider-color, rgba(255, 255, 255, 0.16));
  }
  * {
    box-sizing: border-box;
  }
  .root {
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 100%;
    min-height: 0;
  }
  .bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
  }
  .toolbar {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    scrollbar-width: thin;
    padding: 2px;
  }
  .sep {
    flex: 0 0 1px;
    align-self: stretch;
    background: var(--pp-divider);
    margin: 0 2px;
  }
  button,
  select,
  input,
  label.file {
    font: inherit;
    color: inherit;
  }
  button,
  label.file {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 36px;
    padding: 4px 10px;
    border: 1px solid var(--pp-divider);
    border-radius: 8px;
    background: var(--pp-surface);
    cursor: pointer;
    white-space: nowrap;
    touch-action: manipulation;
  }
  .tool {
    flex-direction: column;
    gap: 2px;
    min-width: 58px;
    padding: 4px 6px;
    font-size: 12px;
  }
  button[aria-pressed="true"] {
    background: color-mix(in srgb, var(--pp-accent) 18%, var(--pp-surface));
    border-color: var(--pp-accent);
    color: var(--pp-text);
  }
  button:disabled {
    opacity: 0.45;
    cursor: default;
  }
  button.danger {
    color: var(--pp-error);
    border-color: color-mix(in srgb, var(--pp-error) 50%, var(--pp-divider));
  }
  button.primary {
    background: var(--pp-accent);
    border-color: var(--pp-accent);
    color: var(--text-primary-color, #fff);
  }
  button:focus-visible,
  select:focus-visible,
  input:focus-visible,
  label.file:focus-within,
  .canvas:focus-visible {
    outline: 2px solid var(--pp-accent);
    outline-offset: 2px;
  }
  select,
  input[type="text"] {
    min-height: 36px;
    padding: 4px 8px;
    border: 1px solid var(--pp-divider);
    border-radius: 8px;
    background: var(--pp-surface);
    min-width: 0;
    width: 100%;
  }
  input[type="range"] {
    width: 100%;
    accent-color: var(--pp-accent);
  }
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: var(--pp-accent);
  }
  .floor-select {
    width: auto;
    max-width: 220px;
  }
  .main {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 290px;
    gap: 8px;
    flex: 1 1 auto;
    min-height: 0;
  }
  @container (max-width: 700px) {
    .main {
      grid-template-columns: minmax(0, 1fr);
    }
    .tool span {
      font-size: 11px;
    }
  }
  .canvas {
    position: relative;
    min-height: 320px;
    height: var(--pp-editor-canvas-height, min(70vh, 640px));
    border: 1px solid var(--pp-divider);
    border-radius: 12px;
    background: var(--pp-canvas);
    overflow: hidden;
    outline: none;
  }
  .canvas svg.plan {
    display: block;
    width: 100%;
    height: 100%;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .canvas.tool-room svg.plan,
  .canvas.tool-freewall svg.plan,
  .canvas.tool-door svg.plan,
  .canvas.tool-window svg.plan,
  .canvas.tool-furniture svg.plan,
  .canvas.calib svg.plan {
    cursor: crosshair;
  }
  .canvas.panning svg.plan {
    cursor: grabbing;
  }
  .zoom {
    position: absolute;
    right: 8px;
    bottom: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .zoom button {
    min-width: 36px;
    padding: 4px;
  }
  .panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border: 1px solid var(--pp-divider);
    border-radius: 12px;
    background: var(--pp-surface);
    overflow: auto;
    min-width: 0;
    max-height: var(--pp-editor-canvas-height, min(70vh, 640px));
  }
  @container (max-width: 700px) {
    .panel {
      max-height: none;
    }
  }
  .panel h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
  }
  .hint {
    margin: 0;
    color: var(--pp-muted);
    font-size: 13px;
    line-height: 1.4;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .field > span {
    font-size: 12px;
    color: var(--pp-muted);
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .check {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .value {
    font-variant-numeric: tabular-nums;
  }
  .empty {
    padding: 24px;
    text-align: center;
    color: var(--pp-muted);
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  /* plan drawing */
  .grid-line {
    stroke: color-mix(in srgb, var(--pp-text) 9%, transparent);
  }
  .grid-major {
    stroke: color-mix(in srgb, var(--pp-text) 16%, transparent);
  }
  .room {
    fill: color-mix(in srgb, var(--pp-accent) 7%, transparent);
    stroke: color-mix(in srgb, var(--pp-text) 30%, transparent);
    vector-effect: non-scaling-stroke;
  }
  .room.selected {
    fill: color-mix(in srgb, var(--pp-accent) 18%, transparent);
    stroke: var(--pp-accent);
  }
  .tool-select .room,
  .tool-select .item,
  .tool-select .opening-hit,
  .tool-select .free-wall {
    cursor: move;
  }
  .band {
    fill: var(--pp-wall);
  }
  .band.interior {
    fill: color-mix(in srgb, var(--pp-wall) 70%, transparent);
  }
  .free-wall {
    fill: color-mix(in srgb, var(--pp-wall) 85%, transparent);
  }
  .free-wall.selected,
  .item.selected {
    stroke: var(--pp-accent);
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
  }
  .opening-gap {
    fill: var(--pp-canvas);
  }
  .opening-line {
    fill: none;
    stroke: var(--pp-text);
    stroke-width: 1.5px;
    vector-effect: non-scaling-stroke;
  }
  .opening-arc {
    fill: none;
    stroke: var(--pp-muted);
    stroke-width: 1px;
    stroke-dasharray: 4 3;
    vector-effect: non-scaling-stroke;
  }
  .window-pane {
    fill: color-mix(in srgb, var(--pp-accent) 25%, var(--pp-canvas));
    stroke: var(--pp-text);
    stroke-width: 1px;
    vector-effect: non-scaling-stroke;
  }
  .opening-hit {
    fill: transparent;
    stroke: transparent;
  }
  .opening-hit.selected {
    stroke: var(--pp-accent);
    stroke-width: 2.5px;
    vector-effect: non-scaling-stroke;
  }
  .item {
    fill: color-mix(in srgb, var(--pp-text) 9%, var(--pp-canvas));
    stroke: color-mix(in srgb, var(--pp-text) 45%, transparent);
    stroke-width: 1px;
    vector-effect: non-scaling-stroke;
  }
  .item.obstacle {
    fill: color-mix(in srgb, var(--pp-text) 22%, var(--pp-canvas));
  }
  .item-front {
    stroke: color-mix(in srgb, var(--pp-text) 60%, transparent);
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
  }
  .label {
    fill: var(--pp-text);
    paint-order: stroke;
    stroke: var(--pp-canvas);
    stroke-linejoin: round;
    pointer-events: none;
    font-family: inherit;
  }
  .label.muted {
    fill: var(--pp-muted);
  }
  .label.dim {
    fill: var(--pp-accent);
  }
  .edge-hover,
  .edge-selected {
    stroke: var(--pp-accent);
    stroke-width: 5px;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    fill: none;
    opacity: 0.75;
  }
  .edge-selected {
    opacity: 1;
  }
  .handle {
    fill: var(--pp-surface);
    stroke: var(--pp-accent);
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
    cursor: grab;
  }
  .handle.active {
    fill: var(--pp-accent);
  }
  .handle.add {
    stroke-dasharray: 2 2;
  }
  .handle-plus {
    stroke: var(--pp-accent);
    stroke-width: 1.5px;
    vector-effect: non-scaling-stroke;
    pointer-events: none;
  }
  .handle-hit {
    fill: transparent;
    cursor: grab;
  }
  .rot-line {
    stroke: var(--pp-accent);
    stroke-width: 1px;
    vector-effect: non-scaling-stroke;
  }
  .draft-line {
    fill: color-mix(in srgb, var(--pp-accent) 10%, transparent);
    stroke: var(--pp-accent);
    stroke-width: 2px;
    stroke-dasharray: 6 4;
    vector-effect: non-scaling-stroke;
  }
  .draft-point {
    fill: var(--pp-accent);
  }
  .snap-mark {
    fill: none;
    stroke: var(--pp-accent);
    stroke-width: 1.5px;
    vector-effect: non-scaling-stroke;
    pointer-events: none;
  }
  .calib-line {
    stroke: var(--pp-error);
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
  }
  .calib-point {
    fill: var(--pp-error);
  }
  .bg-outline {
    fill: none;
    stroke: var(--pp-accent);
    stroke-width: 1px;
    stroke-dasharray: 5 4;
    vector-effect: non-scaling-stroke;
  }
  .bg-image.movable {
    cursor: move;
  }
`;var Qb={select:"M6 3l12 7-5.5 1.6L15 18l-2.4 1.2-2.6-6.3L6 16.5z",room:"M4 5h10l6 5v9H4z",wall:"M3 6h18v12H3z M3 12h18 M9 6v6 M15 12v6",door:"M5 20h14 M7 20V4h8 M15 4a12 12 0 0 1 3 16 M7 4l8 16",window:"M4 5h16v14H4z M12 5v14 M4 12h16",freewall:"M5 18L18 5 M8 21L21 8 M5 18l3 3 M18 5l3 3",furniture:"M4 11v7h16v-7 M6 11V7h12v4 M4 18v2 M20 18v2 M4 11h3v3h10v-3h3",background:"M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6 M15.5 9.5a1 1 0 1 0 0.01 0",measure:"M3 16.5L16.5 3l4.5 4.5L7.5 21z M7 12.5l2 2 M10 9.5l2 2 M13 6.5l2 2",undo:"M9 15L4 10l5-5 M4 10h10a5 5 0 0 1 0 10h-3",redo:"M15 15l5-5-5-5 M20 10H10a5 5 0 0 0 0 10h3",zoomIn:"M10.5 4a6.5 6.5 0 1 0 0.01 0 M15.5 15.5L21 21 M10.5 7.5v6 M7.5 10.5h6",zoomOut:"M10.5 4a6.5 6.5 0 1 0 0.01 0 M15.5 15.5L21 21 M7.5 10.5h6",fit:"M4 9V4h5 M15 4h5v5 M20 15v5h-5 M9 20H4v-5",plus:"M12 5v14 M5 12h14",trash:"M5 7h14 M10 7V4h4v3 M7 7l1 13h8l1-13",rotateLeft:"M4 4v5h5 M4.5 9A8 8 0 1 1 6 17",rotateRight:"M20 4v5h-5 M19.5 9A8 8 0 1 0 18 17",upload:"M12 16V4 M7 9l5-5 5 5 M5 20h14",ruler:"M4 18L18 4 M4 18l-1-3 M4 18l3 1 M18 4l3 1 M18 4l-1-3",check:"M5 12l5 5 9-10",close:"M6 6l12 12 M18 6L6 18"};function pe(i){return Y`<svg class="icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"
    fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d=${Qb[i]||""}></path></svg>`}var Ih={editor_label:"Floor plan editor",canvas_label:"Floor plan. Arrow keys move the selection, Delete removes it.",toolbar_label:"Editor tools",tool_select:"Select and move",tool_select_short:"Select",tool_room:"Draw room",tool_room_short:"Room",tool_wall:"Walls",tool_wall_short:"Walls",tool_door:"Door",tool_door_short:"Door",tool_window:"Window",tool_window_short:"Window",tool_freewall:"Free wall",tool_freewall_short:"Free wall",tool_furniture:"Furniture",tool_furniture_short:"Furniture",tool_background:"Background image",tool_background_short:"Image",tool_measure:"Show lengths and areas",tool_measure_short:"Sizes",undo:"Undo",redo:"Redo",zoom_in:"Zoom in",zoom_out:"Zoom out",zoom_fit:"Show everything",shortcut:"{label} ({key})",floor:"Floor",floor_add:"Add floor",floor_default_name:"Floor {n}",floor_settings:"Floor",floor_name:"Name",floor_ha:"Home Assistant floor",floor_height:"Storey height (m)",floor_elevation:"Floor level (m)",floor_delete:"Delete floor",floor_delete_confirm:"Delete this floor with all its rooms?",no_floor:"No floor yet. Add one to start drawing.",none:"None",delete:"Delete",keep:"Keep",cancel:"Cancel",room:"Room",room_default_name:"Room {n}",room_name:"Name",room_area_ha:"Home Assistant area",room_size:"Floor area",room_ceiling:"Ceiling height (m, empty = storey height)",room_delete:"Delete room",room_finish:"Close room",room_undo_point:"Remove last corner",corner:"Corner {n}",corner_delete:"Delete corner",corner_min:"A room needs at least three corners.",pos_x:"X (m)",pos_z:"Z (m)",hint_select:"Click a room, corner, opening or piece of furniture and drag it. Drag a + on an edge to add a corner. Drag empty space to pan.",hint_room:"Click the corners of the room one after another. Click the first corner or press Enter to close it. Corners snap to the 5 cm grid and to existing walls.",hint_wall:"Click an edge to set its wall.",hint_door:"Click a wall to place a door. Drag a door to slide it along its wall.",hint_window:"Click a wall to place a window. Drag a window to slide it along its wall.",hint_freewall:"Click the start and the end of the wall, for example a chimney or a partition.",hint_freewall_second:"Now click the end of the wall. Esc cancels.",hint_furniture:"Choose a type, then click where it goes. Drag the round handle to rotate.",hint_background:"Upload an image of your floor plan, then set its scale with two points of known distance.",wall:"Wall",wall_length:"Length",wall_interior:"Interior wall, shared with {rooms}. It is centred on the edge and uses the larger thickness of both rooms.",wall_exterior:"Exterior wall. It is drawn outside the room.",wall_partial:"{rooms} shares only part of its edge with this wall and keeps its own thickness there. Add a corner in that room to split its edge.",wall_thickness:"Wall thickness (m)",wall_default:"Default: {v} m",wall_reset:"Use default",wall_none:"No wall here (open passage)",opening_door:"Door",opening_window:"Window",opening_type:"Type",opening_room:"Belongs to",opening_offset:"Centre from edge start (m)",width:"Width (m)",height:"Height (m)",depth:"Depth (m)",thickness:"Thickness (m)",sill:"Sill height (m)",hinge:"Hinge",hinge_left:"Left (edge start)",hinge_right:"Right (edge end)",swing:"Opens",swing_in:"Into the room",swing_out:"Out of the room",contact:"Contact sensor (entity id)",contact_hint:"A binary sensor that is on while the door is open. Optional.",opening_delete:"Delete opening",freewall:"Free wall",freewall_height:"Height (m, empty = full height)",freewall_delete:"Delete wall",furniture:"Furniture",furniture_type:"Type",furniture_new_type:"Type for new furniture",rotation:"Rotation (\xB0)",rotate_left:"Rotate 90\xB0 anticlockwise",rotate_right:"Rotate 90\xB0 clockwise",furniture_delete:"Delete furniture",rotate_handle:"Drag to rotate",bg_upload:"Upload image",bg_replace:"Replace image",bg_remove:"Remove image",bg_none:"No background image on this floor.",bg_opacity:"Opacity",bg_rotation:"Rotation (\xB0)",bg_width:"Width (m)",bg_calibrate:"Set scale",bg_calib_first:"Click the first point of a distance you know.",bg_calib_second:"Click the second point.",bg_calib_length:"Real distance (m)",bg_calib_measured:"Measured on the image: {v} m",bg_calib_apply:"Apply scale",bg_move_hint:"Drag the image to move it.",bg_error:"The image could not be read.",area_value:"{v} m\xB2",length_value:"{v} m",nothing_selected:"Nothing selected.",group_lights:"Lights",group_living:"Living",group_dining:"Dining",group_kitchen:"Kitchen",group_sleeping:"Sleeping",group_bath:"Bath and laundry",group_work:"Work and other",group_household:"Household and installations",group_outdoor:"Outdoor",furn_lamp_ceiling:"Ceiling light",furn_lamp_downlight:"Downlight",furn_lamp_spot:"Surface spot",furn_lamp_panel:"LED panel",furn_lamp_pendant:"Pendant light",furn_lamp_fan:"Ceiling fan with light",furn_lamp_floor:"Floor lamp",furn_lamp_uplight:"Floor uplight",furn_lamp_table:"Table lamp",furn_lamp_wall:"Wall light",furn_led_strip:"LED strip",furn_lamp_bollard:"Path light",furn_lamp_garden:"Garden spot",furn_sofa:"Sofa",furn_sofa_l:"Corner sofa (L-shaped)",furn_sofa_u:"U-shaped sofa",furn_armchair:"Armchair",furn_stool:"Stool",furn_coffee_table:"Coffee table",furn_tv_board:"TV board",furn_tv_wall:"TV (wall)",furn_sideboard:"Sideboard",furn_shelf:"Shelf",furn_plant:"Plant",furn_rug:"Rug",furn_table:"Table",furn_table_round:"Round table",furn_chair:"Chair",furn_bench:"Bench",furn_corner_bench:"Corner bench",furn_bar_stool:"Bar stool",furn_kitchen:"Kitchen unit",furn_kitchen_wall:"Wall cabinet",furn_kitchen_tall:"Tall unit with oven",furn_island:"Kitchen island",furn_worktop:"Worktop",furn_sink:"Sink",furn_stove:"Stove",furn_dishwasher:"Dishwasher",furn_fridge:"Fridge",furn_bed:"Bed",furn_bunk_bed:"Bunk bed",furn_nightstand:"Nightstand",furn_wardrobe:"Wardrobe",furn_dresser:"Dresser",furn_bathtub:"Bathtub",furn_shower:"Shower",furn_wc:"WC",furn_washbasin:"Washbasin",furn_washer:"Washing machine",furn_dryer:"Dryer",furn_desk:"Desk",furn_office_chair:"Office chair",furn_tall_cabinet:"Tall cabinet",furn_coat_rack:"Coat rack",furn_radiator:"Radiator",furn_ac_unit:"Air conditioner (wall)",furn_stairs:"Stairs",furn_stairs_u:"U-shaped stairs with landing",furn_robot_vacuum:"Robot vacuum",furn_waste_bin:"Waste bin",furn_mailbox:"Mailbox",furn_wall_switch:"Light switch",furn_wall_socket:"Socket",furn_wifi_ap:"Wi-Fi access point",furn_water_heater:"Hot water tank",furn_parking:"Parking space",furn_awning:"Awning"},tM={editor_label:"Grundriss-Editor",canvas_label:"Grundriss. Pfeiltasten verschieben die Auswahl, Entf l\xF6scht sie.",toolbar_label:"Werkzeuge",tool_select:"Ausw\xE4hlen und verschieben",tool_select_short:"Auswahl",tool_room:"Raum zeichnen",tool_room_short:"Raum",tool_wall:"W\xE4nde",tool_wall_short:"W\xE4nde",tool_door:"T\xFCr",tool_door_short:"T\xFCr",tool_window:"Fenster",tool_window_short:"Fenster",tool_freewall:"Freistehende Wand",tool_freewall_short:"Einzelwand",tool_furniture:"M\xF6bel",tool_furniture_short:"M\xF6bel",tool_background:"Hintergrundbild",tool_background_short:"Bild",tool_measure:"L\xE4ngen und Fl\xE4chen zeigen",tool_measure_short:"Ma\xDFe",undo:"R\xFCckg\xE4ngig",redo:"Wiederholen",zoom_in:"Vergr\xF6\xDFern",zoom_out:"Verkleinern",zoom_fit:"Alles zeigen",shortcut:"{label} ({key})",floor:"Etage",floor_add:"Etage hinzuf\xFCgen",floor_default_name:"Etage {n}",floor_settings:"Etage",floor_name:"Name",floor_ha:"Etage in Home Assistant",floor_height:"Geschossh\xF6he (m)",floor_elevation:"Fu\xDFbodenh\xF6he (m)",floor_delete:"Etage l\xF6schen",floor_delete_confirm:"Diese Etage mit allen R\xE4umen l\xF6schen?",no_floor:"Noch keine Etage. Lege eine an, um zu zeichnen.",none:"Keine",delete:"L\xF6schen",keep:"Behalten",cancel:"Abbrechen",room:"Raum",room_default_name:"Raum {n}",room_name:"Name",room_area_ha:"Bereich in Home Assistant",room_size:"Grundfl\xE4che",room_ceiling:"Raumh\xF6he (m, leer = Geschossh\xF6he)",room_delete:"Raum l\xF6schen",room_finish:"Raum schlie\xDFen",room_undo_point:"Letzte Ecke entfernen",corner:"Ecke {n}",corner_delete:"Ecke l\xF6schen",corner_min:"Ein Raum braucht mindestens drei Ecken.",pos_x:"X (m)",pos_z:"Z (m)",hint_select:"Klicke auf einen Raum, eine Ecke, eine \xD6ffnung oder ein M\xF6bel und ziehe es an die neue Stelle. Ziehst du ein + auf einer Kante, entsteht dort eine neue Ecke. Auf leerer Fl\xE4che verschiebt Ziehen die Ansicht.",hint_room:"Klicke die Ecken des Raums nacheinander an. Ein Klick auf die erste Ecke oder Enter schlie\xDFt den Raum. Die Ecken rasten im 5-cm-Raster und an vorhandenen W\xE4nden ein.",hint_wall:"Klicke auf eine Kante, um ihre Wand einzustellen.",hint_door:"Klicke auf eine Wand, um eine T\xFCr zu setzen. Eine T\xFCr l\xE4sst sich entlang ihrer Wand ziehen.",hint_window:"Klicke auf eine Wand, um ein Fenster zu setzen. Ein Fenster l\xE4sst sich entlang seiner Wand ziehen.",hint_freewall:"Klicke Anfang und Ende der Wand an, zum Beispiel f\xFCr einen Kamin oder eine Trennwand.",hint_freewall_second:"Klicke jetzt das Ende der Wand an. Esc bricht ab.",hint_furniture:"W\xE4hle eine Art und klicke an die Stelle, an die das M\xF6bel soll. Am runden Griff l\xE4sst es sich drehen.",hint_background:"Lade ein Bild deines Grundrisses hoch und lege den Ma\xDFstab \xFCber zwei Punkte mit bekanntem Abstand fest.",wall:"Wand",wall_length:"L\xE4nge",wall_interior:"Innenwand, gemeinsam mit {rooms}. Sie liegt mittig auf der Kante und nimmt die gr\xF6\xDFere St\xE4rke beider R\xE4ume.",wall_exterior:"Au\xDFenwand. Sie liegt au\xDFerhalb des Raums.",wall_partial:"{rooms} teilt nur einen Teil seiner Kante mit dieser Wand und beh\xE4lt dort die eigene St\xE4rke. Setze in diesem Raum eine Ecke, um seine Kante zu teilen.",wall_thickness:"Wandst\xE4rke (m)",wall_default:"Standard: {v} m",wall_reset:"Standard verwenden",wall_none:"Keine Wand (offener Durchgang)",opening_door:"T\xFCr",opening_window:"Fenster",opening_type:"Art",opening_room:"Geh\xF6rt zu",opening_offset:"Mitte ab Kantenanfang (m)",width:"Breite (m)",height:"H\xF6he (m)",depth:"Tiefe (m)",thickness:"St\xE4rke (m)",sill:"Br\xFCstungsh\xF6he (m)",hinge:"Anschlag",hinge_left:"Links (Kantenanfang)",hinge_right:"Rechts (Kantenende)",swing:"\xD6ffnet",swing_in:"In den Raum",swing_out:"Aus dem Raum heraus",contact:"Kontaktsensor (Entit\xE4ts-ID)",contact_hint:"Ein Bin\xE4rsensor, der an ist, solange die T\xFCr offen steht. Optional.",opening_delete:"\xD6ffnung l\xF6schen",freewall:"Freistehende Wand",freewall_height:"H\xF6he (m, leer = raumhoch)",freewall_delete:"Wand l\xF6schen",furniture:"M\xF6bel",furniture_type:"Art",furniture_new_type:"Art f\xFCr neue M\xF6bel",rotation:"Drehung (\xB0)",rotate_left:"90\xB0 gegen den Uhrzeigersinn drehen",rotate_right:"90\xB0 im Uhrzeigersinn drehen",furniture_delete:"M\xF6bel l\xF6schen",rotate_handle:"Zum Drehen ziehen",bg_upload:"Bild hochladen",bg_replace:"Bild ersetzen",bg_remove:"Bild entfernen",bg_none:"Diese Etage hat kein Hintergrundbild.",bg_opacity:"Deckkraft",bg_rotation:"Drehung (\xB0)",bg_width:"Breite (m)",bg_calibrate:"Ma\xDFstab festlegen",bg_calib_first:"Klicke den ersten Punkt einer Strecke an, deren L\xE4nge du kennst.",bg_calib_second:"Klicke den zweiten Punkt an.",bg_calib_length:"Tats\xE4chlicher Abstand (m)",bg_calib_measured:"Auf dem Bild gemessen: {v} m",bg_calib_apply:"Ma\xDFstab \xFCbernehmen",bg_move_hint:"Ziehe das Bild, um es zu verschieben.",bg_error:"Das Bild lie\xDF sich nicht lesen.",area_value:"{v} m\xB2",length_value:"{v} m",nothing_selected:"Nichts ausgew\xE4hlt.",group_lights:"Leuchten",group_living:"Wohnen",group_dining:"Essen",group_kitchen:"K\xFCche",group_sleeping:"Schlafen",group_bath:"Bad und Hauswirtschaft",group_work:"Arbeiten und Sonstiges",group_household:"Haushalt und Haustechnik",group_outdoor:"Au\xDFen",furn_lamp_ceiling:"Deckenleuchte",furn_lamp_downlight:"Einbauspot",furn_lamp_spot:"Aufbauspot",furn_lamp_panel:"LED-Panel",furn_lamp_pendant:"Pendelleuchte",furn_lamp_fan:"Deckenventilator mit Licht",furn_lamp_floor:"Stehlampe",furn_lamp_uplight:"Deckenfluter",furn_lamp_table:"Tischlampe",furn_lamp_wall:"Wandleuchte",furn_led_strip:"LED-Streifen",furn_lamp_bollard:"Wegleuchte",furn_lamp_garden:"Gartenstrahler",furn_sofa:"Sofa",furn_sofa_l:"Ecksofa (L-Form)",furn_sofa_u:"Wohnlandschaft (U-Form)",furn_armchair:"Sessel",furn_stool:"Hocker",furn_coffee_table:"Couchtisch",furn_tv_board:"TV-Board",furn_tv_wall:"Fernseher (Wand)",furn_sideboard:"Sideboard",furn_shelf:"Regal",furn_plant:"Pflanze",furn_rug:"Teppich",furn_table:"Tisch",furn_table_round:"Runder Tisch",furn_chair:"Stuhl",furn_bench:"Sitzbank",furn_corner_bench:"Eckbank",furn_bar_stool:"Barhocker",furn_kitchen:"K\xFCchenzeile",furn_kitchen_wall:"Oberschrank",furn_kitchen_tall:"Hochschrank mit Backofen",furn_island:"Kochinsel",furn_worktop:"Arbeitsplatte",furn_sink:"Sp\xFCle",furn_stove:"Herd",furn_dishwasher:"Sp\xFClmaschine",furn_fridge:"K\xFChlschrank",furn_bed:"Bett",furn_bunk_bed:"Etagenbett",furn_nightstand:"Nachttisch",furn_wardrobe:"Kleiderschrank",furn_dresser:"Kommode",furn_bathtub:"Badewanne",furn_shower:"Dusche",furn_wc:"WC",furn_washbasin:"Waschtisch",furn_washer:"Waschmaschine",furn_dryer:"Trockner",furn_desk:"Schreibtisch",furn_office_chair:"B\xFCrostuhl",furn_tall_cabinet:"Hochschrank",furn_coat_rack:"Garderobe",furn_radiator:"Heizk\xF6rper",furn_ac_unit:"Klimager\xE4t (Wand)",furn_stairs:"Treppe",furn_stairs_u:"U-Treppe mit Podest",furn_robot_vacuum:"Saugroboter",furn_waste_bin:"M\xFClltonne",furn_mailbox:"Briefkasten",furn_wall_switch:"Lichtschalter",furn_wall_socket:"Steckdose",furn_wifi_ap:"WLAN-Access-Point",furn_water_heater:"Warmwasserspeicher",furn_parking:"Stellplatz",furn_awning:"Markise"},op={en:Ih,de:tM};function ap(i,t,e){let n=String(i||"en").toLowerCase().split(/[-_]/)[0],r=(op[n]||Ih)[t]??Ih[t]??t;if(e)for(let[o,a]of Object.entries(e))r=r.split(`{${o}}`).join(String(a));return r}function lp(i,t,e=2){let n=String(i||"en").toLowerCase().split(/[-_]/)[0];return t==null||!Number.isFinite(t)?"":new Intl.NumberFormat(n==="de"?"de-DE":"en-GB",{minimumFractionDigits:0,maximumFractionDigits:e,useGrouping:!1}).format(t)}function fa(i){let t=String(i??"").trim().replace(",",".");if(t==="")return null;let e=Number(t);return Number.isFinite(e)?e:NaN}function Dt(i){let t=Math.round(i*1e3)/1e3;return Object.is(t,-0)?0:t}function en(i){return[Dt(i[0]),Dt(i[1])]}function Bt(i,t){return[i[0]+t[0],i[1]+t[1]]}function se(i,t){return[i[0]-t[0],i[1]-t[1]]}function Zt(i,t){return[i[0]*t,i[1]*t]}function xr(i,t){return i[0]*t[0]+i[1]*t[1]}function pa(i,t){return i[0]*t[1]-i[1]*t[0]}function cp(i){return Math.hypot(i[0],i[1])}function Yt(i,t){return Math.hypot(i[0]-t[0],i[1]-t[1])}function vr(i){let t=cp(i);return t<1e-9?[0,0]:[i[0]/t,i[1]/t]}function ai(i,t,e){return[i[0]+(t[0]-i[0])*e,i[1]+(t[1]-i[1])*e]}function Ls(i,t,e){return Math.min(e,Math.max(t,i))}function hp(i){return i*Math.PI/180}function eM(i){return i*180/Math.PI}function ma(i){let t=(i%360+360)%360;return Dt(t)===360?0:Dt(t)}function Is(i,t){let e=hp(t),n=Math.cos(e),s=Math.sin(e);return[i[0]*n-i[1]*s,i[0]*s+i[1]*n]}function li(i){let t=0,e=i.length;for(let n=0;n<e;n++){let s=i[n],r=i[(n+1)%e];t+=s[0]*r[1]-r[0]*s[1]}return t/2}function Dh(i){return Math.abs(li(i))}function up(i){let t=i.length;if(!t)return[0,0];let e=li(i);if(Math.abs(e)<1e-9){let r=0,o=0;for(let a of i)r+=a[0],o+=a[1];return[r/t,o/t]}let n=0,s=0;for(let r=0;r<t;r++){let o=i[r],a=i[(r+1)%t],l=o[0]*a[1]-a[0]*o[1];n+=(o[0]+a[0])*l,s+=(o[1]+a[1])*l}return[n/(6*e),s/(6*e)]}function ga(i,t){let e=!1,n=t.length;for(let s=0,r=n-1;s<n;r=s++){let[o,a]=t[s],[l,c]=t[r];a>i[1]!=c>i[1]&&i[0]<(l-o)*(i[1]-a)/(c-a)+o&&(e=!e)}return e}function ue(i,t){let e=i.length;return[i[(t%e+e)%e],i[((t+1)%e+e)%e]]}function Fi(i,t,e){let n=se(e,t),s=xr(n,n),r=Math.sqrt(s),o=s<1e-9?0:xr(se(i,t),n)/s;o=Ls(o,0,1);let a=ai(t,e,o);return{t:o,point:a,dist:Yt(i,a),along:o*r,length:r}}function Lh(i,t,e){let n=se(e,t),s=cp(n);return s<1e-9?Yt(i,t):Math.abs(pa(n,se(i,t)))/s}function yr(i,t,e){let n=vr(se(t,i));return e>=0?[-n[1],n[0]]:[n[1],-n[0]]}function Uh(i,t){let e=i.length,n=i[(t-1+e)%e],s=i[t],r=i[(t+1)%e],o=pa(se(s,n),se(r,s));return li(i)>=0?o>1e-9:o<-1e-9}function dp(i,t=1e-4){let e=[];for(let n of i)(!e.length||Yt(e[e.length-1],n)>t)&&e.push(n);for(;e.length>1&&Yt(e[0],e[e.length-1])<=t;)e.pop();return e}function Ds(i,t){return t?Dt(Math.round(i/t)*t):i}function _a(i,t){return[Ds(i[0],t),Ds(i[1],t)]}function fp(i,t={}){let{grid:e=.05,tol:n=.15,vertices:s=[],segments:r=[]}=t,o=null;for(let a=0;a<s.length;a++){let l=Yt(i,s[a]);l<=n&&(!o||l<o.d)&&(o={d:l,point:s[a],ref:a})}if(o)return{point:en(o.point),kind:"vertex",ref:o.ref};for(let a=0;a<r.length;a++){let[l,c]=r[a],h=Fi(i,l,c);h.dist<=n&&(!o||h.dist<o.d)&&(o={d:h.dist,pr:h,a:l,b:c,ref:a})}if(o){let{pr:a,a:l,b:c}=o,h=a.point;if(e&&a.length>1e-9){let d=Ls(Math.round(a.along/e)*e,0,a.length);h=ai(l,c,d/a.length)}return{point:en(h),kind:"edge",ref:o.ref}}return e?{point:_a(i,e),kind:"grid",ref:null}:{point:en(i),kind:"none",ref:null}}function Nh(i,t,e={}){let{grid:n=.05,tol:s=.15,targets:r=[]}=e,o=null;for(let c of i){let h=Bt(c,t);for(let d of r){let u=Yt(h,d);u<=s&&(!o||u<o.d)&&(o={d:u,corr:se(d,h)})}}if(o)return[Dt(t[0]+o.corr[0]),Dt(t[1]+o.corr[1])];if(!i.length||!n)return[Dt(t[0]),Dt(t[1])];let a=Bt(i[0],t),l=_a(a,n);return[Dt(l[0]-i[0][0]),Dt(l[1]-i[0][1])]}function xa(i){let t=(i.w||0)/2,e=(i.d||0)/2,n=hp(i.rotation||0),s=Math.cos(n),r=Math.sin(n);return[[-t,-e],[t,-e],[t,e],[-t,e]].map(([o,a])=>[i.x+o*s-a*r,i.z+o*r+a*s])}function pp(i,t){let e=se(t,i);return ma(eM(Math.atan2(e[0],-e[1])))}function Oh(i){if(!i.length)return null;let t=1/0,e=-1/0,n=1/0,s=-1/0;for(let[r,o]of i)r<t&&(t=r),r>e&&(e=r),o<n&&(n=o),o>s&&(s=o);return{x0:t,x1:e,z0:n,z1:s}}function mp(i,t,e,n){let s=Yt(t,e);if(!(s>1e-9)||!(n>0))return i;let r=n/s,o=[i.x||0,i.z||0],a=i.rotation||0,l=Is(se(t,o),-a),c=Zt(l,r),h=se(t,Is(c,a));return{...i,x:Dt(h[0]),z:Dt(h[1]),width:Dt((i.width||0)*r)}}function gp(i,t){let e=i.width||0,n=e*(t||1),s=[i.x||0,i.z||0];return[[0,0],[e,0],[e,n],[0,n]].map(r=>Bt(s,Is(r,i.rotation||0)))}var ya=.01,ba={wall_exterior:.24,wall_interior:.12};function kh(i){return{...ba,...i&&i.settings}}function xp(i,t,e,n,s=ya){let r=Yt(i,t);if(r<1e-9||Lh(e,i,t)>s||Lh(n,i,t)>s)return null;let o=se(t,i),a=xr(se(e,i),o)/(r*r),l=xr(se(n,i),o)/(r*r),c=Math.max(0,Math.min(a,l)),h=Math.min(1,Math.max(a,l));return(h-c)*r<=s?null:[c,h]}function vp(i,t,e,n=ya){let s=i.rooms.find(l=>l.id===t);if(!s)return[];let[r,o]=ue(s.points,e),a=[];for(let l of i.rooms){if(l.id===t)continue;let c=l.points.length;for(let h=0;h<c;h++){let[d,u]=ue(l.points,h),f=xp(r,o,d,u,n);f&&a.push({room_id:l.id,edge:h,t0:f[0],t1:f[1]})}}return a}function Fh(i,t,e,n=ya){let s=[{room_id:t,edge:e}],r=[],o=i.rooms.find(c=>c.id===t);if(!o)return{targets:s,partial:r};let[a,l]=ue(o.points,e);for(let c of vp(i,t,e,n)){let h=i.rooms.find(_=>_.id===c.room_id),[d,u]=ue(h.points,c.edge),f=xp(d,u,a,l,n),m=Yt(d,u);f&&(f[1]-f[0])*m>=m-2*n?s.push({room_id:c.room_id,edge:c.edge}):r.push(c.room_id)}return{targets:s,partial:r}}function yp(i,t,e,n=ya){let s=i.rooms.find(u=>u.id===t);if(!s)return[];let[r,o]=ue(s.points,e),a=vp(i,t,e,n),l=[0,1];for(let u of a)l.push(u.t0,u.t1);l.sort((u,f)=>u-f);let c=Yt(r,o),h=[];for(let u of l)(!h.length||(u-h[h.length-1])*c>n/2)&&h.push(u);h[h.length-1]<1&&(h[h.length-1]=1);let d=[];for(let u=0;u<h.length-1;u++){let f=h[u],m=h[u+1],_=(f+m)/2,g=a.filter(p=>p.t0<=_&&p.t1>=_).map(p=>({room_id:p.room_id,edge:p.edge}));d.push({t0:f,t1:m,a:Bt(r,Zt(se(o,r),f)),b:Bt(r,Zt(se(o,r),m)),neighbours:g})}return d}function zi(i,t){let e=i.wall_thickness&&i.wall_thickness[t];return typeof e=="number"&&e>0?e:null}function va(i,t){return!!(i.wall_heights&&i.wall_heights[t]===0)}function zh(i,t,e,n){let s=kh(i),r=t.rooms.find(m=>m.id===e);if(!r)return null;let o=yp(t,e,n),a=[...new Set(o.flatMap(m=>m.neighbours.map(_=>_.room_id)))],l=a.length>0,c=zi(r,n),h=c??(l?s.wall_interior:s.wall_exterior);if(l)for(let m of o)for(let _ of m.neighbours){let g=t.rooms.find(b=>b.id===_.room_id),p=(g&&zi(g,_.edge))??s.wall_interior;h=Math.max(h,p)}let[d,u]=ue(r.points,n),f=l?Fh(t,e,n).partial:[];return{length:Yt(d,u),shared:l,neighbours:a,partial:f,thickness:h,stored:c,noWall:va(r,n),pieces:o}}function bp(i,t){let e=kh(i),n=t.rooms||[],s=new Map(n.map((o,a)=>[o.id,a])),r=[];for(let o=0;o<n.length;o++){let a=n[o],l=a.points||[];if(l.length<3)continue;let c=li(l);for(let h=0;h<l.length;h++){let[d,u]=ue(l,h);if(Yt(d,u)<1e-9)continue;let f=yr(d,u,c),m=yp(t,a.id,h);for(let _ of m)if(_.neighbours.length>0){if(_.neighbours.some(v=>s.get(v.room_id)<o)||va(a,h)||_.neighbours.some(v=>va(n[s.get(v.room_id)],v.edge)))continue;let p=zi(a,h)??e.wall_interior;for(let v of _.neighbours)p=Math.max(p,zi(n[s.get(v.room_id)],v.edge)??e.wall_interior);let b=_.t0===0?p/2:0,x=_.t1===1?p/2:0;r.push(_p(a.id,h,_.a,_.b,"interior",p,f,-p/2,p/2,b,x))}else{if(va(a,h))continue;let p=zi(a,h)??e.wall_exterior,b=l.length,x=zi(a,(h-1+b)%b)??e.wall_exterior,v=zi(a,(h+1)%b)??e.wall_exterior,C=_.t0===0&&Uh(l,h)?x:0,T=_.t1===1&&Uh(l,(h+1)%b)?v:0;r.push(_p(a.id,h,_.a,_.b,"exterior",p,f,-p,0,C,T))}}}return r}function _p(i,t,e,n,s,r,o,a,l,c,h){let d=vr(se(n,e)),u=se(e,Zt(d,c)),f=Bt(n,Zt(d,h)),m=[Bt(u,Zt(o,a)),Bt(f,Zt(o,a)),Bt(f,Zt(o,l)),Bt(u,Zt(o,l))];return{room_id:i,edge:t,a:e,b:n,kind:s,thickness:r,poly:m,n0:a,n1:l,normal:o}}function Mp(i){let t=i.thickness||.1,e=vr(se(i.b,i.a)),n=[-e[1],e[0]],s=t/2;return[Bt(i.a,Zt(n,-s)),Bt(i.b,Zt(n,-s)),Bt(i.b,Zt(n,s)),Bt(i.a,Zt(n,s))]}function wp(i,t,e){let n=t.rooms.find(P=>P.id===e.room_id);if(!n||!n.points||n.points.length<3)return null;let s=n.points.length;if(!(e.edge>=0&&e.edge<s))return null;let[r,o]=ue(n.points,e.edge),a=Yt(r,o);if(a<1e-9)return null;let l=vr(se(o,r)),c=yr(r,o,li(n.points)),h=Math.min(e.width||.8,a),d=Ls(e.offset??a/2,h/2,a-h/2),u=Bt(r,Zt(l,d)),f=zh(i,t,n.id,e.edge),m=f?f.thickness:kh(i).wall_exterior,_=d/a,g=f?f.pieces.find(P=>P.t0<=_&&P.t1>=_):null,p=!!(g&&g.neighbours.length),b=p?-m/2:-m,x=p?m/2:0,v=se(u,Zt(l,h/2)),C=Bt(u,Zt(l,h/2)),T=[Bt(v,Zt(c,b)),Bt(C,Zt(c,b)),Bt(C,Zt(c,x)),Bt(v,Zt(c,x))],R={a:v,b:C,centre:u,dir:l,normal:c,n0:b,n1:x,poly:T,width:h,offset:d,edgeLength:a,shared:p};if(e.type==="door"){let P=e.hinge==="right",S=e.swing==="out"?-1:1,M=S>0?x:b,I=Bt(P?C:v,Zt(c,M)),L=Bt(P?v:C,Zt(c,M)),E=Bt(I,Zt(c,S*h));R.hinge=I,R.closed=L,R.tip=E}return R}function Ma(i,t,e){let n=null;for(let s of i.rooms||[]){let r=s.points||[];if(r.length<3)continue;let o=ga(t,r);for(let a=0;a<r.length;a++){let[l,c]=ue(r,a),h=Fi(t,l,c);if(h.dist>e)continue;let d={room_id:s.id,edge:a,t:h.t,along:h.along,length:h.length,dist:h.dist,point:h.point,inside:o};(!n||d.dist<n.dist-.001||Math.abs(d.dist-n.dist)<=.001&&d.inside&&!n.inside)&&(n=d)}}return n&&delete n.inside,n}var wa={lights:["lamp_ceiling","lamp_downlight","lamp_spot","lamp_panel","lamp_pendant","lamp_fan","lamp_floor","lamp_uplight","lamp_table","lamp_wall","led_strip","lamp_bollard","lamp_garden"],living:["sofa","sofa_l","sofa_u","armchair","stool","coffee_table","tv_board","tv_wall","sideboard","shelf","plant","rug"],dining:["table","table_round","chair","bench","corner_bench","bar_stool"],kitchen:["kitchen","kitchen_wall","kitchen_tall","island","worktop","sink","stove","dishwasher","fridge"],sleeping:["bed","bunk_bed","nightstand","wardrobe","dresser"],bath:["bathtub","shower","wc","washbasin","washer","dryer"],work:["desk","office_chair","tall_cabinet","coat_rack","radiator","ac_unit","stairs","stairs_u","robot_vacuum"],household:["waste_bin","mailbox","wall_switch","wall_socket","wifi_ap","water_heater"],outdoor:["parking","awning"]},nM=[...new Set(Object.values(wa).flat())],Bh={lamp_ceiling:[.4,.4,.08],lamp_downlight:[.1,.1,.02],lamp_spot:[.1,.1,.14],lamp_panel:[.6,.6,.03],lamp_pendant:[.4,.4,.8],lamp_fan:[1.3,1.3,.45],lamp_floor:[.4,.4,1.7],lamp_uplight:[.35,.35,1.8],lamp_table:[.28,.28,.45],lamp_wall:[.22,.12,.2],led_strip:[2,.04,.03],lamp_bollard:[.16,.16,.8],lamp_garden:[.12,.12,.3],sofa:[2.2,.9,.82],sofa_l:[2.6,1.8,.82],sofa_u:[3,2.2,.82],armchair:[.85,.85,.8],stool:[.55,.55,.42],coffee_table:[1.1,.6,.42],tv_board:[1.8,.42,.5],tv_wall:[1.3,.08,.75],sideboard:[1.6,.45,.8],shelf:[.9,.35,1.9],plant:[.45,.45,1.1],rug:[2,1.4,.01],table:[1.6,.9,.75],table_round:[1.1,1.1,.75],chair:[.46,.5,.9],bench:[1.4,.45,.85],corner_bench:[2,1.6,.9],bar_stool:[.42,.42,.75],kitchen:[2.4,.62,.92],kitchen_wall:[.8,.35,.7],kitchen_tall:[.6,.62,2.1],island:[1.8,.9,.92],worktop:[1.2,.62,.91],sink:[.9,.62,.92],stove:[.6,.62,.92],dishwasher:[.6,.62,.92],fridge:[.6,.65,1.8],bed:[1.6,2.05,.9],bunk_bed:[1,2.05,1.65],nightstand:[.45,.4,.5],wardrobe:[1.8,.6,2.1],dresser:[1,.5,.9],bathtub:[1.7,.75,.58],shower:[.9,.9,2],wc:[.38,.6,.8],washbasin:[.6,.46,.85],washer:[.6,.6,.85],dryer:[.6,.6,.85],desk:[1.4,.7,.75],office_chair:[.65,.65,1.1],tall_cabinet:[.6,.6,2.1],coat_rack:[1,.35,1.9],radiator:[1,.1,.6],ac_unit:[.85,.22,.3],stairs:[1,3.2,2.75],stairs_u:[2.1,2.7,2.75],robot_vacuum:[.36,.5,.1],waste_bin:[.58,.73,1.07],mailbox:[.38,.14,.34],wall_switch:[.085,.012,.085],wall_socket:[.085,.014,.085],wifi_ap:[.2,.2,.04],water_heater:[.56,.56,1.5],parking:[2.6,5.2,.02],awning:[3,2.5,.22]},iM=new Set(["led_strip","shower","plant","rug","coat_rack"]);function Sp(i){return(i.h||0)>=1.5&&!String(i.type).startsWith("lamp_")&&!iM.has(i.type)}var Ns=2.6,Sa={door:{width:.9,sill:0,height:2,hinge:"left",swing:"in"},window:{width:1.2,sill:.9,height:1.3,hinge:"left",swing:"in"}};function Vh(){return{version:1,settings:{...ba},floors:[]}}function $h(i){return!i||typeof i!="object"?Vh():Array.isArray(i.floors)&&i.settings&&i.version?i:{version:1,...i,settings:{...ba,...i.settings||{}},floors:i.floors||[]}}function de(i,t){return i&&i.floors&&i.floors.find(e=>e.id===t)||null}function ci(i){return{rooms:[],openings:[],walls:[],furniture:[],outdoor:[],background:null,...i}}function ve(i,t,e){let n=!1,s=i.floors.map(r=>r.id!==t?r:(n=!0,e(ci(r))));return n?{...i,floors:s}:i}function br(i,t){let e=new Set(t),n=1;for(;e.has(`${i}_${n}`);)n++;return`${i}_${n}`}function Ea(i){return[...(i.rooms||[]).map(t=>t.id),...(i.openings||[]).map(t=>t.id),...(i.walls||[]).map(t=>t.id),...(i.furniture||[]).map(t=>t.id)]}function Ap(i,t={}){let e=$h(i),n=t.id||br("floor",e.floors.map(o=>o.id)),s=0;for(let o of e.floors)s=Math.max(s,(o.elevation||0)+(o.height||Ns));let r=ci({id:n,name:t.name||n,ha_floor:t.ha_floor??null,elevation:t.elevation??Dt(s),height:t.height??Ns});return{...e,floors:[...e.floors,r]}}function Tp(i,t,e){let n={};for(let s of["name","ha_floor","height","elevation"])s in e&&(n[s]=e[s]);return ve(i,t,s=>({...s,...n}))}function Rp(i,t){return{...i,floors:i.floors.filter(e=>e.id!==t)}}function Ce(i,t){return i&&i.rooms.find(e=>e.id===t)||null}function sM(i,t,e,n){return ve(i,t,s=>({...s,rooms:s.rooms.map(r=>r.id===e?n(r):r)}))}function Cp(i,t,e,n={}){let s=de(i,t);if(!s)return{plan:i,id:null};let r=dp(e.map(en));if(r.length<3)return{plan:i,id:null};let o=n.id||br("room",Ea(ci(s))),a={id:o,name:n.name||o,area_id:n.area_id??null,points:r,ceiling_height:null};return{plan:ve(i,t,l=>({...l,rooms:[...l.rooms,a]})),id:o}}function Pp(i,t,e,n){let s={};for(let r of["name","area_id","ceiling_height"])r in n&&(s[r]=n[r]);return sM(i,t,e,r=>({...r,...s}))}function Hh(i,t,e){return ve(i,t,n=>({...n,rooms:n.rooms.filter(s=>s.id!==e),openings:n.openings.filter(s=>s.room_id!==e)}))}function Os(i,t,e){return t>=e?Dt(e/2):Dt(Ls(i,t/2,e-t/2))}function rM(i,t){let[e,n]=ue(i,t.edge),s=Yt(e,n);return s<1e-9?e:Bt(e,[(n[0]-e[0])*t.offset/s,(n[1]-e[1])*t.offset/s])}function Ip(i,t,e,n,s){return i.map(r=>{if(r.room_id!==t)return r;let o=s(r.edge),a=rM(e,r),[l,c]=ue(n,o),h=Fi(a,l,c),d=Os(h.along,r.width||0,h.length);return o===r.edge&&d===r.offset?r:{...r,edge:o,offset:d}})}function Ep(i,t,e){if(!Array.isArray(i))return i;let n=i.slice();for(;n.length<e;)n.push(null);return n.splice(t+1,0,n[t]??null),n}function Mr(i,t,e,n,s){let r=de(i,t),o=Ce(r,e);if(!o||n<0||n>=o.points.length)return i;let a=en(s),l=o.points.map((c,h)=>h===n?a:c);return ve(i,t,c=>({...c,rooms:c.rooms.map(h=>h.id===e?{...h,points:l}:h),openings:Ip(c.openings,e,o.points,l,h=>h)}))}function Gh(i,t,e,n,s){let r=de(i,t),o=Ce(r,e);if(!o)return{plan:i,index:null};let a=o.points.length,[l,c]=ue(o.points,n),h=Fi(s,l,c);if(h.along<.01||h.length-h.along<.01)return{plan:i,index:null};let d=en(h.point),u=Yt(l,d),f=Yt(d,c),m=o.points.slice();m.splice(n+1,0,d);let _={...o,points:m};Array.isArray(o.wall_thickness)&&(_.wall_thickness=Ep(o.wall_thickness,n,a)),Array.isArray(o.wall_heights)&&(_.wall_heights=Ep(o.wall_heights,n,a));let g=p=>p.openings.map(b=>b.room_id!==e?b:b.edge>n?{...b,edge:b.edge+1}:b.edge<n?b:b.offset<=u?{...b,offset:Os(b.offset,b.width||0,u)}:{...b,edge:n+1,offset:Os(b.offset-u,b.width||0,f)});return{plan:ve(i,t,p=>({...p,rooms:p.rooms.map(b=>b.id===e?_:b),openings:g(p)})),index:n+1}}function oM(i,t,e,n){let s=de(i,t),r=Ce(s,e);if(!r)return i;let o=r.points.length;if(o<=3||n<0||n>=o)return i;let a=r.points.filter((u,f)=>f!==n),l=(n-1+o)%o,c=u=>n===0?u===0||u===o-1?o-2:u-1:u===n?n-1:u<n?u:u-1,h=u=>{if(!Array.isArray(u))return u;let f=u.slice();for(;f.length<o;)f.push(null);let m=new Array(o-1).fill(null);for(let _=0;_<o;_++)_===n&&_!==l||(m[c(_)]=f[_]);return m[c(l)]=f[l],m},d={...r,points:a};return Array.isArray(r.wall_thickness)&&(d.wall_thickness=h(r.wall_thickness)),Array.isArray(r.wall_heights)&&(d.wall_heights=h(r.wall_heights)),ve(i,t,u=>({...u,rooms:u.rooms.map(f=>f.id===e?d:f),openings:Ip(u.openings,e,r.points,a,c)}))}function Wh(i,t,e,n,s={}){let{withFurniture:r=!0}=s,o=de(i,t),a=Ce(o,e);if(!a||!n[0]&&!n[1])return i;let l=a.points.map(c=>en(Bt(c,n)));return ve(i,t,c=>({...c,rooms:c.rooms.map(h=>h.id===e?{...h,points:l}:h),furniture:r?c.furniture.map(h=>ga([h.x,h.z],a.points)?{...h,x:Dt(h.x+n[0]),z:Dt(h.z+n[1])}:h):c.furniture}))}function Dp(i,t,e,n){let s=i.points.length,r=Array.isArray(i[t])?i[t].slice():new Array(s).fill(null);for(;r.length<s;)r.push(null);return r.length=s,r[e]=n,{...i,[t]:r}}function Lp(i,t,e){return Fh(i,t,e).targets}function Xh(i,t,e,n,s){let r=de(i,t);if(!Ce(r,e))return i;let o=s==null||!(s>0)?null:Dt(s),a=Lp(ci(r),e,n);return ve(i,t,l=>({...l,rooms:l.rooms.map(c=>{let h=c;for(let d of a)d.room_id===c.id&&(h=Dp(h,"wall_thickness",d.edge,o));return h})}))}function Up(i,t,e,n,s){let r=de(i,t);if(!Ce(r,e))return i;let o=Lp(ci(r),e,n);return ve(i,t,a=>({...a,rooms:a.rooms.map(l=>{let c=l;for(let h of o)if(h.room_id===l.id&&(c=Dp(c,"wall_heights",h.edge,s?0:null),c.wall_heights.every(d=>d==null))){let{wall_heights:d,...u}=c;c=u}return c})}))}function Np(i,t,e,n,s,r="door",o={}){let a=de(i,t),l=Ce(a,e);if(!l)return{plan:i,id:null};let c=Yt(...ue(l.points,n)),h=Sa[r]||Sa.door,d=o.width??h.width;d>c-.1&&(d=Dt(Math.max(.3,c-.1)));let u=o.id||br(r,Ea(ci(a))),f={id:u,room_id:e,edge:n,offset:Os(s,d,c),width:d,type:r,sill:o.sill??h.sill,height:o.height??h.height,hinge:o.hinge??h.hinge,swing:o.swing??h.swing,contact:o.contact??null};return{plan:ve(i,t,m=>({...m,openings:[...m.openings,f]})),id:u}}function Aa(i,t,e,n){return de(i,t)?ve(i,t,r=>({...r,openings:r.openings.map(o=>{if(o.id!==e)return o;let a={...o,...n};a.contact===""&&(a.contact=null);let l=Ce(r,a.room_id);if(l){let c=Yt(...ue(l.points,a.edge));a.width>c&&(a.width=Dt(c)),a.offset=Os(a.offset,a.width,c)}return a})})):i}function Op(i,t,e,n,s=.05){let r=de(i,t),o=r&&r.openings.find(u=>u.id===e),a=o&&Ce(r,o.room_id);if(!a)return i;let[l,c]=ue(a.points,o.edge),h=Fi(n,l,c),d=h.along;return s&&(d=Math.round(d/s)*s),Aa(i,t,e,{offset:Os(d,o.width,h.length)})}function qh(i,t,e){return ve(i,t,n=>({...n,openings:n.openings.filter(s=>s.id!==e)}))}function kp(i,t,e,n,s={}){let r=de(i,t);if(!r||Yt(e,n)<.02)return{plan:i,id:null};let o=s.id||br("wall",Ea(ci(r))),a={id:o,a:en(e),b:en(n),thickness:s.thickness??.24,height:s.height??null};return{plan:ve(i,t,l=>({...l,walls:[...l.walls,a]})),id:o}}function Ta(i,t,e,n){return ve(i,t,s=>({...s,walls:s.walls.map(r=>{if(r.id!==e)return r;let o={...r,...n};return n.a&&(o.a=en(n.a)),n.b&&(o.b=en(n.b)),o})}))}function Yh(i,t,e,n){let s=de(i,t),r=s&&s.walls.find(o=>o.id===e);return r?Ta(i,t,e,{a:Bt(r.a,n),b:Bt(r.b,n)}):i}function Zh(i,t,e){return ve(i,t,n=>({...n,walls:n.walls.filter(s=>s.id!==e)}))}function Fp(i,t,e,n,s,r={}){let o=de(i,t);if(!o)return{plan:i,id:null};let a=Bh[e]||[1,1,1],l=r.id||br(e,Ea(ci(o))),c={id:l,type:e,x:Dt(n),z:Dt(s),w:r.w??a[0],d:r.d??a[1],h:r.h??a[2],rotation:ma(r.rotation??0)};return{plan:ve(i,t,h=>({...h,furniture:[...h.furniture,c]})),id:l}}function wr(i,t,e,n){return ve(i,t,s=>({...s,furniture:s.furniture.map(r=>{if(r.id!==e)return r;let o={...r,...n};"rotation"in n&&(o.rotation=ma(n.rotation||0));for(let a of["x","z","w","d","h"])a in n&&(o[a]=Dt(Number(n[a])||0));return o})}))}function Kh(i,t,e){return ve(i,t,n=>({...n,furniture:n.furniture.filter(s=>s.id!==e)}))}function Sr(i,t,e){return ve(i,t,n=>({...n,background:e?{...e}:null}))}function Er(i,t,e){return ve(i,t,n=>n.background?{...n,background:{...n.background,...e}}:n)}function zp(i,t,e){if(!e)return i;switch(e.kind){case"room":return Hh(i,t,e.id);case"corner":return oM(i,t,e.id,e.index);case"opening":return qh(i,t,e.id);case"wall":return Zh(i,t,e.id);case"furniture":return Kh(i,t,e.id);case"background":return Sr(i,t,null);default:return i}}function Bp(i,t,e,n){if(!e)return i;let s=de(i,t);if(!s)return i;switch(e.kind){case"room":return Wh(i,t,e.id,n);case"corner":{let r=Ce(s,e.id);return r?Mr(i,t,e.id,e.index,Bt(r.points[e.index],n)):i}case"wall":return Yh(i,t,e.id,n);case"furniture":{let r=s.furniture.find(o=>o.id===e.id);return r?wr(i,t,e.id,{x:r.x+n[0],z:r.z+n[1]}):i}case"opening":{let r=s.openings.find(u=>u.id===e.id),o=r&&Ce(s,r.room_id);if(!o)return i;let[a,l]=ue(o.points,r.edge),c=Yt(a,l),h=se(l,a),d=c>1e-9?(n[0]*h[0]+n[1]*h[1])/c:0;return Aa(i,t,e.id,{offset:r.offset+d})}case"background":{let r=s.background;return r?Er(i,t,{x:Dt((r.x||0)+n[0]),z:Dt((r.z||0)+n[1])}):i}default:return i}}function Ra(i,t=null){let e=[],n=[];for(let s of i&&i.rooms||[]){if(s.id===t)continue;let r=s.points||[];for(let o=0;o<r.length;o++)e.push(r[o]),n.push(ue(r,o))}for(let s of i&&i.walls||[])e.push(s.a,s.b),n.push([s.a,s.b]);return{vertices:e,segments:n}}function Jh(i,t=100){return{past:[],present:i,future:[],limit:t}}function Vp(i,t){if(t===i.present)return i;let e=[...i.past,i.present];for(;e.length>i.limit;)e.shift();return{...i,past:e,present:t,future:[]}}function Ca(i){return i.past.length>0}function Pa(i){return i.future.length>0}function $p(i){if(!Ca(i))return i;let t=i.past.slice(0,-1);return{...i,past:t,present:i.past[i.past.length-1],future:[i.present,...i.future]}}function Hp(i){if(!Pa(i))return i;let[t,...e]=i.future;return{...i,past:[...i.past,i.present],present:t,future:e}}function Gp(i,t){return{...i,present:t}}function jh(i){return Math.min(800,Math.max(8,i))}function Bi(i,t){return[(t[0]-i.tx)/i.scale,(t[1]-i.ty)/i.scale]}function Qh(i,t,e){let n=jh(i.scale*e),s=Bi(i,t);return{scale:n,tx:t[0]-s[0]*n,ty:t[1]-s[1]*n}}function Wp(i,t,e,n=24){let s=i||{x0:0,x1:10,z0:0,z1:8},r=Math.max(1,s.x1-s.x0),o=Math.max(1,s.z1-s.z0),a=Math.max(1,t-2*n),l=Math.max(1,e-2*n),c=jh(Math.min(a/r,l/o));return{scale:c,tx:t/2-(s.x0+s.x1)/2*c,ty:e/2-(s.z0+s.z1)/2*c}}function Xp(i,t,e){let n=(u,f)=>[(u[0]+f[0])/2,(u[1]+f[1])/2],s=(u,f)=>Math.hypot(u[0]-f[0],u[1]-f[1]),r=s(t[0],t[1]),o=s(e[0],e[1]),a=r>1?o/r:1,l=n(t[0],t[1]),c=n(e[0],e[1]),h=Bi(i,l),d=jh(i.scale*a);return{scale:d,tx:c[0]-h[0]*d,ty:c[1]-h[1]*d}}var Bn=.05,lM=10,cM=4,hM=6,qp=14,uM=.3,Yp=[{id:"select",key:"V",icon:"select"},{id:"room",key:"R",icon:"room"},{id:"wall",key:"W",icon:"wall"},{id:"door",key:"D",icon:"door"},{id:"window",key:"N",icon:"window"},{id:"freewall",key:"F",icon:"freewall"},{id:"furniture",key:"M",icon:"furniture"},{id:"background",key:"B",icon:"background"}],dM={select:["room","corner","opening","wall","furniture"],room:["room","corner"],wall:["edge"],door:["opening"],window:["opening"],freewall:["wall"],furniture:["furniture"],background:["background"]},Ar=typeof navigator<"u"&&/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent||"");function Vi(i){return!i||!i.length?"":"M"+i.map(t=>`${t[0]} ${t[1]}`).join("L")+"Z"}function fM(i,t){try{return JSON.stringify(i)===JSON.stringify(t)}catch{return!1}}function Zp(i){return new Promise((t,e)=>{let n=new Image;n.onload=()=>t(n),n.onerror=()=>e(new Error("image")),n.src=i})}function pM(i){return new Promise((t,e)=>{let n=new FileReader;n.onload=()=>t(n.result),n.onerror=()=>e(n.error),n.readAsDataURL(i)})}var Ia=class extends He{static properties={plan:{attribute:!1},floorId:{attribute:"floor-id"},lang:{type:String},dark:{type:Boolean,reflect:!0},areas:{attribute:!1},floors:{attribute:!1},_history:{state:!0},_draft:{state:!0},_floor:{state:!0},_tool:{state:!0},_sel:{state:!0},_view:{state:!0},_measure:{state:!0},_draw:{state:!0},_hover:{state:!0},_hoverEdge:{state:!0},_wallStart:{state:!0},_calib:{state:!0},_furnType:{state:!0},_confirmDelete:{state:!0},_panning:{state:!0},_bgError:{state:!0},_size:{state:!0}};static styles=rp;constructor(){super(),this.plan=null,this.floorId=null,this.lang="en",this.dark=!1,this.areas=[],this.floors=[],this._history=Jh(Vh()),this._draft=null,this._floor=null,this._tool="select",this._sel=null,this._view={scale:50,tx:24,ty:24},this._measure=!0,this._draw=[],this._hover=null,this._hoverEdge=null,this._wallStart=null,this._calib=null,this._furnType="sofa",this._confirmDelete=!1,this._panning=!1,this._bgError=!1,this._size=null,this._emitted=void 0,this._needFit=!0,this._userView=!1,this._pointers=new Map,this._gesture=null,this._drag=null,this._aspects=new Map,this.addEventListener("keydown",t=>this._onKey(t))}get _plan(){return this._history.present}get _shown(){return this._draft||this._plan}get _floorObj(){return de(this._shown,this._floor)}_t(t,e){return ap(this.lang,t,e)}_n(t,e=2){return lp(this.lang,t,e)}willUpdate(t){t.has("plan")&&this._syncPlan(),t.has("floorId")&&this.floorId&&this.floorId!==this._floor&&(this._floor=this.floorId,this._resetInteraction(),this._sel=null,this._needFit=!0);let e=this._plan.floors||[];e.some(n=>n.id===this._floor)||(this._floor=e.length?e[0].id:null,this._needFit=!0)}_syncPlan(){let t=this.plan;if(t===this._emitted)return;this._emitted=t;let e=$h(t);if(e!==this._plan){if(fM(e,this._plan)){this._history=Gp(this._history,e);return}this._history=Jh(e),this._resetInteraction(),this._sel=null,this._needFit=!0}}firstUpdated(){let t=this.renderRoot.querySelector(".canvas");t&&typeof ResizeObserver<"u"&&(this._ro=new ResizeObserver(e=>{let n=e[0].contentRect;n.width>0&&n.height>0&&(this._size={w:n.width,h:n.height},this._userView||(this._needFit=!0))}),this._ro.observe(t))}updated(){this._needFit&&this._size&&this._floorObj&&this._fit()}disconnectedCallback(){super.disconnectedCallback(),this._ro&&this._ro.disconnect(),this._ro=null}connectedCallback(){super.connectedCallback(),this.hasUpdated&&!this._ro&&this.firstUpdated()}_resetInteraction(){this._draft=null,this._drag=null,this._draw=[],this._hover=null,this._hoverEdge=null,this._wallStart=null,this._calib=null,this._confirmDelete=!1}_commit(t,e){return this._draft=null,e!==void 0&&(this._sel=e),!t||t===this._plan?!1:(this._history=Vp(this._history,t),this._emit(),!0)}_emit(){let t=this._plan;this._emitted=t,this.dispatchEvent(new CustomEvent("plan-changed",{detail:{plan:t},bubbles:!0,composed:!0}))}_undo(){Ca(this._history)&&(this._resetInteraction(),this._history=$p(this._history),this._afterHistoryMove())}_redo(){Pa(this._history)&&(this._resetInteraction(),this._history=Hp(this._history),this._afterHistoryMove())}_afterHistoryMove(){if(!de(this._plan,this._floor)){let t=this._plan.floors[0];this._floor=t?t.id:null}this._validateSelection(),this._emit()}_validateSelection(){let t=this._sel,e=de(this._plan,this._floor);if(!t||!e){this._sel=null;return}let n=r=>e.rooms.find(o=>o.id===r),s=!0;t.kind==="room"?s=!!n(t.id):t.kind==="corner"||t.kind==="edge"?s=!!n(t.id)&&t.index<n(t.id).points.length:t.kind==="opening"?s=e.openings.some(r=>r.id===t.id):t.kind==="wall"?s=e.walls.some(r=>r.id===t.id):t.kind==="furniture"?s=e.furniture.some(r=>r.id===t.id):t.kind==="background"&&(s=!!e.background),s||(this._sel=null)}_selectFloor(t){t!==this._floor&&(this._floor=t,this._resetInteraction(),this._sel=null,this._needFit=!0,this.dispatchEvent(new CustomEvent("floor-selected",{detail:{floorId:t},bubbles:!0,composed:!0})))}_addFloor(){let t=(this._plan.floors||[]).length+1,e=Ap(this._plan,{name:this._t("floor_default_name",{n:t})}),n=e.floors[e.floors.length-1].id;this._commit(e,null),this._selectFloor(n)}_deleteFloor(){let t=Rp(this._plan,this._floor);this._confirmDelete=!1,this._commit(t,null);let e=t.floors[0];this._selectFloor(e?e.id:null)}_fit(){let t=this._floorObj,e=[];if(t){for(let l of t.rooms)e.push(...l.points);for(let l of t.walls)e.push(l.a,l.b);for(let l of t.furniture)e.push(...xa(l));t.background&&t.background.image&&e.push(...gp(t.background,this._aspect(t.background.image)))}let n=Oh(e),s=.4,r=n?{x0:n.x0-s,x1:n.x1+s,z0:n.z0-s,z1:n.z1+s}:null,{w:o,h:a}=this._size||{w:800,h:600};this._view=Wp(r,o,a,24),this._needFit=!1,this._userView=!1}_zoom(t){this._userView=!0;let{w:e,h:n}=this._size||{w:800,h:600};this._view=Qh(this._view,[e/2,n/2],t)}_aspect(t){return this._aspects.has(t)?this._aspects.get(t):(this._aspects.set(t,.75),Zp(t).then(e=>{e.naturalWidth>0&&e.naturalHeight>0&&(this._aspects.set(t,e.naturalHeight/e.naturalWidth),this.requestUpdate())}).catch(()=>{}),.75)}_setTool(t){if(t!==this._tool&&(this._tool=t,this._resetInteraction(),this._sel&&!dM[t].includes(this._sel.kind)&&(this._sel=null),t==="background")){let e=this._floorObj;this._sel=e&&e.background?{kind:"background"}:null}}_tolerance(){return lM/this._view.scale}_edgeTolerance(){return Math.max(qp/this._view.scale,uM)}_snap(t,e={}){let n=de(this._plan,this._floor),s=Ra(n,e.exceptRoom||null),r=s.vertices,o=s.segments;if(e.exceptWall){let l=n.walls.find(c=>c.id===e.exceptWall);l&&(r=r.filter(c=>c!==l.a&&c!==l.b),o=o.filter(c=>c[0]!==l.a||c[1]!==l.b))}let a=e.extra||[];if(a.length){r=[...r,...a];let l=[];for(let c=0;c+1<a.length;c++)l.push([a[c],a[c+1]]);o=[...o,...l]}return fp(t,{grid:Bn,tol:this._tolerance(),vertices:r,segments:o})}_svgEl(){return this.renderRoot.querySelector("svg.plan")}_local(t){let e=this._svgEl(),n=e?e.getBoundingClientRect():{left:0,top:0};return[t.clientX-n.left,t.clientY-n.top]}_onPointerDown(t){if(!this._floorObj||t.pointerType==="mouse"&&t.button!==0&&t.button!==1)return;let e=t.currentTarget;try{e.setPointerCapture(t.pointerId)}catch{}let n=this.renderRoot.querySelector(".canvas");n&&this.shadowRoot.activeElement!==n&&n.focus({preventScroll:!0});let s=this._local(t);if(t.isPrimary&&(this._pointers.clear(),this._gesture=null),this._pointers.set(t.pointerId,s),this._pointers.size>=2){this._draft=null,this._drag=null;let c=[...this._pointers.values()].slice(0,2);this._gesture={startView:this._view,start:c};return}let r=Bi(this._view,s),o=t.target&&t.target.closest?t.target.closest("[data-hit]"):null,a=o?{kind:o.dataset.hit,id:o.dataset.id||null,index:o.dataset.index!=null?Number(o.dataset.index):null}:null,l=t.button===1?"pan":this._modeFor(a);this._drag={mode:l,hit:a,startS:s,startP:r,startView:this._view,base:this._plan,moved:!1},t.preventDefault()}_modeFor(t){let e=this._tool,n=t&&t.kind;if(e==="select")return n==="corner"?(this._sel={kind:"corner",id:t.id,index:t.index},"corner"):n==="mid"?"insert":n==="rot"?"rotate":n==="wallend"?"wallend":n==="opening"?(this._sel={kind:"opening",id:t.id},"opening"):n==="furniture"?(this._sel={kind:"furniture",id:t.id},"furniture"):n==="freewall"?(this._sel={kind:"wall",id:t.id},"freewall"):n==="room"?(this._sel={kind:"room",id:t.id},"room"):"pan";if((e==="door"||e==="window")&&n==="opening")return this._sel={kind:"opening",id:t.id},"opening";if(e==="furniture"){if(n==="furniture")return this._sel={kind:"furniture",id:t.id},"furniture";if(n==="rot")return"rotate"}return e==="freewall"&&n==="wallend"&&!this._wallStart?"wallend":e==="background"?this._calib?"click":n==="bg"?(this._sel={kind:"background"},"bg"):"pan":"click"}_onPointerMove(t){let e=this._local(t);if(this._pointers.has(t.pointerId)&&this._pointers.set(t.pointerId,e),this._gesture){if(this._pointers.size>=2){let r=[...this._pointers.values()].slice(0,2);this._view=Xp(this._gesture.startView,this._gesture.start,r),this._userView=!0}return}let n=Bi(this._view,e),s=this._drag;if(!s){(t.pointerType==="mouse"||t.pointerType==="pen")&&this._updateHover(n);return}if(!(!s.moved&&Math.hypot(e[0]-s.startS[0],e[1]-s.startS[1])<cM)){if(s.moved=!0,s.mode==="pan"||s.mode==="click"){this._panning=!0,this._userView=!0,this._view={...s.startView,tx:s.startView.tx+e[0]-s.startS[0],ty:s.startView.ty+e[1]-s.startS[1]};return}this._dragEdit(s,n,t)}}_dragEdit(t,e,n){let s=this._floor,r=de(t.base,s),o=se(e,t.startP),a=t.hit&&t.hit.id,l=null;switch(t.mode){case"insert":{let c=Gh(t.base,s,a,t.hit.index,t.startP);if(c.index==null)return;t.base=c.plan,t.mode="corner",t.hit={kind:"corner",id:a,index:c.index},this._sel={kind:"corner",id:a,index:c.index},this._dragEdit(t,e,n);return}case"corner":{let c=this._snap(e,{exceptRoom:a});this._hover=c,l=Mr(t.base,s,a,t.hit.index,c.point);break}case"room":{let c=Ce(r,a);if(!c)return;let h=Ra(r,a).vertices,d=Nh(c.points,o,{grid:Bn,tol:this._tolerance(),targets:h});l=Wh(t.base,s,a,d);break}case"furniture":{let c=r.furniture.find(h=>h.id===a);if(!c)return;l=wr(t.base,s,a,{x:Ds(c.x+o[0],Bn),z:Ds(c.z+o[1],Bn)});break}case"rotate":{let c=r.furniture.find(d=>d.id===a);if(!c)return;let h=pp([c.x,c.z],e);n.shiftKey||(h=Math.round(h/15)*15),l=wr(t.base,s,a,{rotation:h});break}case"freewall":{let c=r.walls.find(u=>u.id===a);if(!c)return;let h=Ra(r).vertices.filter(u=>u!==c.a&&u!==c.b),d=Nh([c.a,c.b],o,{grid:Bn,tol:this._tolerance(),targets:h});l=Yh(t.base,s,a,d);break}case"wallend":{let c=this._snap(e,{exceptWall:a});this._hover=c,l=Ta(t.base,s,a,{[t.hit.index?"b":"a"]:c.point});break}case"opening":l=Op(t.base,s,a,e,Bn);break;case"bg":{let c=r.background;if(!c)return;l=Er(t.base,s,{x:Dt((c.x||0)+o[0]),z:Dt((c.z||0)+o[1])});break}default:return}this._draft=l}_onPointerUp(t){let e=this._pointers.delete(t.pointerId);if(this._gesture){this._pointers.size<2&&(this._gesture=null),this._drag=null;return}let n=this._drag;if(this._drag=null,this._panning=!1,!(!n||!e)){if(n.moved){n.mode!=="pan"&&n.mode!=="click"&&(this._hover=null,this._draft?this._commit(this._draft):this._draft=null);return}this._click(n)}}_onPointerCancel(t){this._pointers.delete(t.pointerId),this._pointers.size<2&&(this._gesture=null),this._drag=null,this._draft=null,this._panning=!1}_onPointerLeave(){this._drag||(this._hover=null,this._hoverEdge=null)}_onWheel(t){t.preventDefault();let e=this._local(t);this._userView=!0;let n=t.deltaMode===1?.05:t.deltaMode===2?1:.0015;this._view=Qh(this._view,e,Math.exp(-t.deltaY*n))}_onDblClick(){this._tool==="room"&&this._draw.length>=3&&this._finishRoom()}_updateHover(t){let e=this._tool;if(e==="room"||e==="freewall"){this._hover=this._snap(t,{extra:e==="room"?this._draw:[]});return}if(e==="wall"||e==="door"||e==="window"){let n=this._floorObj,s=n?Ma(n,t,this._edgeTolerance()):null,r=this._hoverEdge;if(!s&&!r||s&&r&&s.room_id===r.room_id&&s.edge===r.edge)return;this._hoverEdge=s}}_click(t){let e=this._floor,n=t.startP,s=t.hit,r=this._plan,o=de(r,e);switch(this._tool){case"select":if(s&&s.kind==="mid"){let a=Gh(r,e,s.id,s.index,n);a.index!=null&&this._commit(a.plan,{kind:"corner",id:s.id,index:a.index})}else s||(this._sel=null);break;case"room":this._addDrawPoint(n);break;case"wall":{let a=Ma(o,n,this._edgeTolerance());this._sel=a?{kind:"edge",id:a.room_id,index:a.edge}:null;break}case"door":case"window":{if(s&&s.kind==="opening")break;let a=Ma(o,n,this._edgeTolerance());if(!a)break;let l=Np(r,e,a.room_id,a.edge,Ds(a.along,Bn),this._tool);l.id&&this._commit(l.plan,{kind:"opening",id:l.id});break}case"freewall":{let a=this._snap(n);if(!this._wallStart)this._wallStart=a.point,this._sel=null;else{let l=kp(r,e,this._wallStart,a.point);this._wallStart=null,l.id&&this._commit(l.plan,{kind:"wall",id:l.id})}break}case"furniture":{if(s&&(s.kind==="furniture"||s.kind==="rot"))break;let a=_a(n,Bn),l=Fp(r,e,this._furnType,a[0],a[1]);l.id&&this._commit(l.plan,{kind:"furniture",id:l.id});break}case"background":{let a=this._calib;a&&(!a.p1||a.p2?this._calib={p1:n,p2:null,length:""}:this._calib={...a,p2:n});break}default:break}}_addDrawPoint(t){let e=this._draw,n=this._snap(t,{extra:e});if(e.length>=3&&(Yt(n.point,e[0])<.005||Yt(t,e[0])<=this._tolerance()*1.2)){this._finishRoom();return}e.length&&Yt(n.point,e[e.length-1])<.01||(this._draw=[...e,n.point])}_finishRoom(){let t=this._draw;if(t.length<3)return;let e=de(this._plan,this._floor),n=this._t("room_default_name",{n:e.rooms.length+1}),s=Cp(this._plan,this._floor,t,{name:n});this._draw=[],this._hover=null,s.id&&this._commit(s.plan,{kind:"room",id:s.id})}_onKey(t){let e=t.composedPath()[0],n=e&&e.tagName;if(n==="INPUT"||n==="SELECT"||n==="TEXTAREA"){t.key==="Escape"&&e.blur&&e.blur();return}let s=t.ctrlKey||t.metaKey,r=t.key.length===1?t.key.toLowerCase():t.key;if(s&&r==="z"){t.shiftKey?this._redo():this._undo(),t.preventDefault();return}if(s&&r==="y"){this._redo(),t.preventDefault();return}if(s||t.altKey)return;let o=n==="BUTTON"||n==="LABEL";switch(r){case"Escape":this._escape(),t.preventDefault();return;case"Enter":!o&&this._tool==="room"&&this._draw.length>=3&&(this._finishRoom(),t.preventDefault());return;case"Delete":case"Backspace":this._tool==="room"&&this._draw.length?this._draw=this._draw.slice(0,-1):this._deleteSelection(),t.preventDefault();return;case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"ArrowDown":{if(o)return;let a=t.shiftKey?.01:Bn,l={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[r];this._sel&&this._sel.kind!=="edge"?this._commit(Bp(this._plan,this._floor,this._sel,Zt(l,a))):(this._view={...this._view,tx:this._view.tx-l[0]*40,ty:this._view.ty-l[1]*40},this._userView=!0),t.preventDefault();return}case"+":case"=":this._zoom(1.25);return;case"-":this._zoom(.8);return;case"0":this._fit();return;case"l":this._measure=!this._measure;return;default:{let a=Yp.find(l=>l.key.toLowerCase()===r);a&&(this._setTool(a.id),t.preventDefault())}}}_escape(){if(this._drag){this._drag=null,this._draft=null,this._panning=!1;return}if(this._draw.length){this._draw=[];return}if(this._wallStart){this._wallStart=null;return}if(this._calib){this._calib=null;return}this._sel=null}_deleteSelection(){let t=this._sel;if(!t||t.kind==="edge")return;let e=zp(this._plan,this._floor,t);if(e===this._plan)return;let n=t.kind==="corner"?{kind:"room",id:t.id}:null;this._commit(e,n)}async _onUpload(t){let e=t.target,n=e.files&&e.files[0];if(e.value="",!!n)try{let s=await pM(n),r=await Zp(s),o=s,a=r.naturalWidth||1e3,l=r.naturalHeight||750,c=3e3;if(r.naturalWidth&&(a>c||l>c||n.size>2e6)){let m=Math.min(1,c/Math.max(a,l)),_=document.createElement("canvas");_.width=Math.round(a*m),_.height=Math.round(l*m);let g=_.getContext("2d");g.fillStyle="#ffffff",g.fillRect(0,0,_.width,_.height),g.drawImage(r,0,0,_.width,_.height),o=_.toDataURL("image/jpeg",.85)}this._aspects.set(o,l/a);let h=de(this._plan,this._floor),d=h.background,u=Oh(h.rooms.flatMap(m=>m.points)),f=d?{...d,image:o}:{image:o,x:u?u.x0:0,z:u?u.z0:0,width:u?Dt(Math.max(4,u.x1-u.x0)+1):10,rotation:0,opacity:.5};this._bgError=!1,this._commit(Sr(this._plan,this._floor,f),{kind:"background"}),u||(this._needFit=!0)}catch{this._bgError=!0}}render(){let t=this._floorObj,e=["canvas",`tool-${this._tool}`,this._calib?"calib":"",this._panning?"panning":""].join(" ");return Y`
      <div class="root">
        ${this._renderFloorBar()} ${this._renderToolbar()}
        <div class="main">
          <div class=${e} tabindex="0" role="application" aria-label=${this._t("canvas_label")}>
            ${t?this._renderPlan(this._shown,t):Y`<div class="empty">
                  <p>${this._t("no_floor")}</p>
                  <button class="primary" @click=${()=>this._addFloor()}>${pe("plus")}<span>${this._t("floor_add")}</span></button>
                </div>`}
            ${t?Y`<div class="zoom">
                  <button title=${this._t("shortcut",{label:this._t("zoom_in"),key:"+"})} aria-label=${this._t("zoom_in")} @click=${()=>this._zoom(1.25)}>
                    ${pe("zoomIn")}
                  </button>
                  <button title=${this._t("shortcut",{label:this._t("zoom_out"),key:"\u2212"})} aria-label=${this._t("zoom_out")} @click=${()=>this._zoom(.8)}>
                    ${pe("zoomOut")}
                  </button>
                  <button title=${this._t("shortcut",{label:this._t("zoom_fit"),key:"0"})} aria-label=${this._t("zoom_fit")} @click=${()=>this._fit()}>
                    ${pe("fit")}
                  </button>
                </div>`:ft}
          </div>
          <aside class="panel" aria-live="polite">${this._renderPanel(this._shown,t)}</aside>
        </div>
      </div>
    `}_renderFloorBar(){let t=this._plan.floors||[];return Y`<div class="bar">
      ${t.length?Y`<label class="visually-hidden" for="pp-floor">${this._t("floor")}</label>
            <select id="pp-floor" class="floor-select" @change=${e=>this._selectFloor(e.target.value)}>
              ${t.map(e=>Y`<option value=${e.id} ?selected=${e.id===this._floor}>${e.name||e.id}</option>`)}
            </select>`:ft}
      <button @click=${()=>this._addFloor()}>${pe("plus")}<span>${this._t("floor_add")}</span></button>
    </div>`}_renderToolbar(){let t=Ar?"\u2318":"Ctrl+",e=Ar?"\u2318Z":"Ctrl+Z",n=Ar?"\u21E7\u2318Z":"Shift+Ctrl+Z",s=!this._floor;return Y`<div class="toolbar" role="toolbar" aria-label=${this._t("toolbar_label")}>
      ${Yp.map(r=>Y`<button
          class="tool"
          aria-pressed=${String(this._tool===r.id)}
          ?disabled=${s}
          title=${this._t("shortcut",{label:this._t(`tool_${r.id}`),key:r.key})}
          aria-keyshortcuts=${r.key}
          @click=${()=>this._setTool(r.id)}
        >
          ${pe(r.icon)}<span>${this._t(`tool_${r.id}_short`)}</span>
        </button>`)}
      <span class="sep" role="separator"></span>
      <button
        class="tool"
        aria-pressed=${String(this._measure)}
        title=${this._t("shortcut",{label:this._t("tool_measure"),key:"L"})}
        aria-keyshortcuts="L"
        @click=${()=>this._measure=!this._measure}
      >
        ${pe("measure")}<span>${this._t("tool_measure_short")}</span>
      </button>
      <button
        class="tool"
        ?disabled=${!Ca(this._history)}
        title=${this._t("shortcut",{label:this._t("undo"),key:e})}
        aria-keyshortcuts=${Ar?"Meta+Z":"Control+Z"}
        @click=${()=>this._undo()}
      >
        ${pe("undo")}<span>${this._t("undo")}</span>
      </button>
      <button
        class="tool"
        ?disabled=${!Pa(this._history)}
        title=${this._t("shortcut",{label:this._t("redo"),key:n})}
        aria-keyshortcuts=${Ar?"Shift+Meta+Z":"Shift+Control+Z"}
        data-mod=${t}
        @click=${()=>this._redo()}
      >
        ${pe("redo")}<span>${this._t("redo")}</span>
      </button>
    </div>`}_renderPlan(t,e){let n=this._view,s=1/n.scale;return Y`<svg
      class="plan"
      @pointerdown=${this._onPointerDown}
      @pointermove=${this._onPointerMove}
      @pointerup=${this._onPointerUp}
      @pointercancel=${this._onPointerCancel}
      @pointerleave=${this._onPointerLeave}
      @wheel=${this._onWheel}
      @dblclick=${this._onDblClick}
    >
      <g transform="translate(${n.tx} ${n.ty}) scale(${n.scale})">
        ${this._renderGrid(s)} ${this._renderBackground(e,s)} ${this._renderRooms(e)} ${this._renderWalls(t,e)}
        ${this._renderOpenings(t,e,s)} ${this._renderFurniture(e,s)} ${this._renderLabels(e,s)}
        ${this._renderSelection(t,e,s)} ${this._renderPreview(s)}
      </g>
    </svg>`}_renderGrid(t){let{w:e,h:n}=this._size||{w:800,h:600},s=this._view,[r,o]=Bi(s,[0,0]),[a,l]=Bi(s,[e,n]),c=s.scale>=40?.25:s.scale>=12?1:5,h=c<1?1:5,d="",u="",f=(m,_)=>{let g="",p=Math.floor(r/m)*m,b=Math.floor(o/m)*m,x=0;for(let v=p;v<=a&&x<600;v+=m,x++){let C=Math.abs(v/h-Math.round(v/h))<1e-6;_===C&&(g+=`M${v} ${o}V${l}`)}x=0;for(let v=b;v<=l&&x<600;v+=m,x++){let C=Math.abs(v/h-Math.round(v/h))<1e-6;_===C&&(g+=`M${r} ${v}H${a}`)}return g};return d=f(c,!1),u=f(h,!0),Wt`<path class="grid-line" d=${d} stroke-width=${t} fill="none" pointer-events="none"></path>
      <path class="grid-major" d=${u} stroke-width=${t} fill="none" pointer-events="none"></path>`}_renderBackground(t,e){let n=t.background;if(!n||!n.image)return ft;let s=this._aspect(n.image),r=n.width||10,o=this._tool==="background"&&!this._calib;return Wt`<g transform="translate(${n.x||0} ${n.z||0}) rotate(${n.rotation||0})">
      <image class="bg-image ${o?"movable":""}" href=${n.image} x="0" y="0" width=${r} height=${r*s}
        opacity=${n.opacity??.5} preserveAspectRatio="none" pointer-events=${o?"all":"none"}
        data-hit=${o?"bg":ft}></image>
      ${this._tool==="background"?Wt`<rect class="bg-outline" x="0" y="0" width=${r} height=${r*s} pointer-events="none"></rect>`:ft}
    </g>`}_renderRooms(t){let e=this._sel;return t.rooms.map(n=>{let s=e&&(e.kind==="room"||e.kind==="corner"||e.kind==="edge")&&e.id===n.id;return Wt`<path class="room ${s?"selected":""}" d=${Vi(n.points)} data-hit="room" data-id=${n.id}></path>`})}_renderWalls(t,e){let n=bp(t,e),s=this._sel;return Wt`${n.map(r=>Wt`<path class="band ${r.kind}" d=${Vi(r.poly)} pointer-events="none"></path>`)}
      ${e.walls.map(r=>Wt`<path class="free-wall ${s&&s.kind==="wall"&&s.id===r.id?"selected":""}" d=${Vi(Mp(r))}
          data-hit="freewall" data-id=${r.id}></path>`)}`}_renderOpenings(t,e,n){let s=this._sel;return e.openings.map(r=>{let o=wp(t,e,r);if(!o)return ft;let a=(u,f)=>[Bt(o.a,Zt(o.normal,u)),Bt(o.b,Zt(o.normal,u)),Bt(o.b,Zt(o.normal,f)),Bt(o.a,Zt(o.normal,f))],l=a(o.n0-n,o.n1+n),c=a(o.n0-6*n,o.n1+6*n),h=s&&s.kind==="opening"&&s.id===r.id,d;if(r.type==="door"){let u=pa(se(o.closed,o.hinge),se(o.tip,o.hinge))>0?1:0;d=Wt`<line class="opening-line" x1=${o.hinge[0]} y1=${o.hinge[1]} x2=${o.tip[0]} y2=${o.tip[1]}></line>
          <path class="opening-arc" d="M${o.closed[0]} ${o.closed[1]}A${o.width} ${o.width} 0 0 ${u} ${o.tip[0]} ${o.tip[1]}"></path>`}else{let u=(o.n0+o.n1)/2,f=Bt(o.a,Zt(o.normal,u)),m=Bt(o.b,Zt(o.normal,u));d=Wt`<path class="window-pane" d=${Vi(a(o.n0,o.n1))}></path>
          <line class="opening-line" x1=${f[0]} y1=${f[1]} x2=${m[0]} y2=${m[1]}></line>`}return Wt`<g>
        <path class="opening-gap" d=${Vi(l)} pointer-events="none"></path>
        <g pointer-events="none">${d}</g>
        <path class="opening-hit ${h?"selected":""}" d=${Vi(c)} data-hit="opening" data-id=${r.id}></path>
      </g>`})}_renderFurniture(t,e){let n=this._sel;return t.furniture.map(s=>{let r=xa(s),o=n&&n.kind==="furniture"&&n.id===s.id,a=this._t(`furn_${s.type}`),l=10*e,c=Math.min(s.w,s.d)/e>22&&Math.max(s.w,s.d)/e>a.length*6;return Wt`<g>
        <path class="item ${Sp(s)?"obstacle":""} ${o?"selected":""}" d=${Vi(r)} data-hit="furniture" data-id=${s.id}>
          <title>${a}</title>
        </path>
        ${c?Wt`<text class="label muted" x=${s.x} y=${s.z} font-size=${l} stroke-width=${2*e} text-anchor="middle" dominant-baseline="central">${a}</text>`:ft}
      </g>`})}_renderLabels(t,e){let n=[],s=12*e;for(let r of t.rooms){if(r.points.length<3)continue;let o=up(r.points);if(n.push(Wt`<text class="label" x=${o[0]} y=${o[1]} font-size=${s} stroke-width=${3*e} text-anchor="middle" font-weight="600">${r.name||r.id}</text>`),this._measure){n.push(Wt`<text class="label muted" x=${o[0]} y=${o[1]+s*1.3} font-size=${s*.9} stroke-width=${3*e} text-anchor="middle">${this._t("area_value",{v:this._n(Dh(r.points),2)})}</text>`);let a=li(r.points);for(let l=0;l<r.points.length;l++){let[c,h]=ue(r.points,l),d=Yt(c,h);if(d/e<36)continue;let u=yr(c,h,a),f=Bt(ai(c,h,.5),Zt(u,11*e));n.push(Wt`<text class="label dim" x=${f[0]} y=${f[1]} font-size=${10*e} stroke-width=${3*e} text-anchor="middle" dominant-baseline="central">${this._n(d,2)}</text>`)}}}if(this._measure)for(let r of t.walls){let o=Yt(r.a,r.b);if(o/e<36)continue;let a=ai(r.a,r.b,.5);n.push(Wt`<text class="label dim" x=${a[0]} y=${a[1]-(r.thickness/2+8*e)} font-size=${10*e} stroke-width=${3*e} text-anchor="middle">${this._n(o,2)}</text>`)}return n}_handle(t,e,n,s="",r=ft){return Wt`<g>
      <circle class="handle ${s}" cx=${t[0]} cy=${t[1]} r=${hM*e} pointer-events="none"></circle>
      ${r}
      <circle class="handle-hit" cx=${t[0]} cy=${t[1]} r=${qp*e} data-hit=${n.kind} data-id=${n.id} data-index=${n.index??ft}></circle>
    </g>`}_renderSelection(t,e,n){let s=this._sel,r=[],o=this._tool;if(this._hoverEdge&&(o==="wall"||o==="door"||o==="window")){let a=e.rooms.find(l=>l.id===this._hoverEdge.room_id);if(a){let[l,c]=ue(a.points,this._hoverEdge.edge);r.push(Wt`<line class="edge-hover" x1=${l[0]} y1=${l[1]} x2=${c[0]} y2=${c[1]} pointer-events="none"></line>`)}}if(!s)return r;if(s.kind==="edge"){let a=e.rooms.find(l=>l.id===s.id);if(a){let[l,c]=ue(a.points,s.index);r.push(Wt`<line class="edge-selected" x1=${l[0]} y1=${l[1]} x2=${c[0]} y2=${c[1]} pointer-events="none"></line>`)}}if((s.kind==="room"||s.kind==="corner")&&o==="select"){let a=e.rooms.find(l=>l.id===s.id);if(a){for(let l=0;l<a.points.length;l++){let[c,h]=ue(a.points,l);if(Yt(c,h)/n<44)continue;let d=ai(c,h,.5),u=3*n,f=Wt`<path class="handle-plus" d="M${d[0]-u} ${d[1]}H${d[0]+u}M${d[0]} ${d[1]-u}V${d[1]+u}"></path>`;r.push(this._handle(d,n,{kind:"mid",id:a.id,index:l},"add",f))}a.points.forEach((l,c)=>{let h=s.kind==="corner"&&s.index===c;r.push(this._handle(l,n,{kind:"corner",id:a.id,index:c},h?"active":""))})}}if(s.kind==="furniture"&&(o==="select"||o==="furniture")){let a=e.furniture.find(l=>l.id===s.id);if(a){let l=[a.x,a.z],c=Bt(l,Is([0,-a.d/2],a.rotation||0)),h=Bt(l,Is([0,-a.d/2-24*n],a.rotation||0));r.push(Wt`<line class="rot-line" x1=${c[0]} y1=${c[1]} x2=${h[0]} y2=${h[1]} pointer-events="none"></line>`),r.push(this._handle(h,n,{kind:"rot",id:a.id},"",Wt`<title>${this._t("rotate_handle")}</title>`))}}if(s.kind==="wall"&&(o==="select"||o==="freewall")){let a=e.walls.find(l=>l.id===s.id);a&&(r.push(this._handle(a.a,n,{kind:"wallend",id:a.id,index:0})),r.push(this._handle(a.b,n,{kind:"wallend",id:a.id,index:1})))}return r}_renderPreview(t){let e=[],n=this._hover;if(n&&n.kind!=="grid"&&n.kind!=="none"){let r=7*t,o=n.point;e.push(n.kind==="vertex"?Wt`<rect class="snap-mark" x=${o[0]-r} y=${o[1]-r} width=${2*r} height=${2*r}></rect>`:Wt`<path class="snap-mark" d="M${o[0]} ${o[1]-r}L${o[0]+r} ${o[1]}L${o[0]} ${o[1]+r}L${o[0]-r} ${o[1]}Z"></path>`)}if(this._tool==="room"&&this._draw.length){let r=this._draw,o=n?n.point:null,a=o?[...r,o]:r;if(e.push(Wt`<path class="draft-line" d=${"M"+a.map(l=>`${l[0]} ${l[1]}`).join("L")} pointer-events="none"></path>`),r.forEach((l,c)=>e.push(Wt`<circle class="draft-point" cx=${l[0]} cy=${l[1]} r=${(c===0?6:4)*t} pointer-events="none"></circle>`)),o){let l=r[r.length-1],c=ai(l,o,.5);e.push(Wt`<text class="label dim" x=${c[0]} y=${c[1]-8*t} font-size=${11*t} stroke-width=${3*t} text-anchor="middle">${this._t("length_value",{v:this._n(Yt(l,o),2)})}</text>`)}}if(this._tool==="freewall"&&this._wallStart){let r=this._wallStart;if(e.push(Wt`<circle class="draft-point" cx=${r[0]} cy=${r[1]} r=${4*t} pointer-events="none"></circle>`),n){let o=n.point;e.push(Wt`<path class="draft-line" d="M${r[0]} ${r[1]}L${o[0]} ${o[1]}" pointer-events="none"></path>`);let a=ai(r,o,.5);e.push(Wt`<text class="label dim" x=${a[0]} y=${a[1]-8*t} font-size=${11*t} stroke-width=${3*t} text-anchor="middle">${this._t("length_value",{v:this._n(Yt(r,o),2)})}</text>`)}}let s=this._calib;return s&&s.p1&&(e.push(Wt`<circle class="calib-point" cx=${s.p1[0]} cy=${s.p1[1]} r=${5*t} pointer-events="none"></circle>`),s.p2&&(e.push(Wt`<line class="calib-line" x1=${s.p1[0]} y1=${s.p1[1]} x2=${s.p2[0]} y2=${s.p2[1]} pointer-events="none"></line>`),e.push(Wt`<circle class="calib-point" cx=${s.p2[0]} cy=${s.p2[1]} r=${5*t} pointer-events="none"></circle>`))),e}_hint(){switch(this._tool){case"room":return this._t("hint_room");case"wall":return this._t("hint_wall");case"door":return this._t("hint_door");case"window":return this._t("hint_window");case"freewall":return this._t(this._wallStart?"hint_freewall_second":"hint_freewall");case"furniture":return this._t("hint_furniture");case"background":return this._calib?this._t(this._calib.p1&&!this._calib.p2?"bg_calib_second":this._calib.p2?"bg_calib_length":"bg_calib_first"):this._t("hint_background");default:return this._t("hint_select")}}_renderPanel(t,e){if(!e)return Y`<p class="hint">${this._t("no_floor")}</p>`;let n=this._sel,s=[Y`<p class="hint">${this._hint()}</p>`];if(this._tool==="room"&&this._draw.length&&s.push(Y`<div class="actions">
        <button class="primary" ?disabled=${this._draw.length<3} @click=${()=>this._finishRoom()}>${pe("check")}<span>${this._t("room_finish")}</span></button>
        <button @click=${()=>this._draw=this._draw.slice(0,-1)}>${this._t("room_undo_point")}</button>
        <button @click=${()=>this._draw=[]}>${this._t("cancel")}</button>
      </div>`),this._tool==="freewall"&&this._wallStart&&s.push(Y`<div class="actions"><button @click=${()=>this._wallStart=null}>${this._t("cancel")}</button></div>`),this._tool==="furniture"&&s.push(this._furnitureTypeSelect(this._t("furniture_new_type"),this._furnType,r=>this._furnType=r)),this._tool==="background")return s.push(this._renderBackgroundPanel(e)),s;if(!n)return this._tool==="select"&&s.push(this._renderFloorPanel(e)),s;switch(n.kind){case"room":case"corner":s.push(this._renderRoomPanel(e,n));break;case"edge":s.push(this._renderEdgePanel(t,e,n));break;case"opening":s.push(this._renderOpeningPanel(e,n));break;case"wall":s.push(this._renderFreeWallPanel(e,n));break;case"furniture":s.push(this._renderFurniturePanel(e,n));break;default:break}return s}_num(t,e,n,s={}){let{digits:r=2,allowEmpty:o=!1,min:a=null,max:l=null,placeholder:c=""}=s,h=e==null?"":this._n(e,r);return Y`<label class="field"
      ><span>${t}</span>
      <input
        type="text"
        inputmode="decimal"
        autocomplete="off"
        .value=${xe(h)}
        placeholder=${c}
        @keydown=${d=>d.key==="Enter"&&d.target.blur()}
        @change=${d=>{let u=fa(d.target.value);u===null&&o?n(null):u!==null&&Number.isFinite(u)&&(a==null||u>=a)&&(l==null||u<=l)&&n(u),d.target.value=h,this.requestUpdate()}}
    /></label>`}_text(t,e,n,s=""){return Y`<label class="field"
      ><span>${t}</span>
      <input
        type="text"
        autocomplete="off"
        spellcheck="false"
        .value=${xe(e||"")}
        placeholder=${s}
        @keydown=${r=>r.key==="Enter"&&r.target.blur()}
        @change=${r=>n(r.target.value.trim())}
    /></label>`}_select(t,e,n,s){return Y`<label class="field"
      ><span>${t}</span>
      <select @change=${r=>s(r.target.value)}>
        ${n.map(r=>Y`<option value=${r.value} ?selected=${r.value===(e??"")}>${r.label}</option>`)}
      </select></label
    >`}_furnitureTypeSelect(t,e,n){return Y`<label class="field"
      ><span>${t}</span>
      <select @change=${s=>n(s.target.value)}>
        ${Object.entries(wa).map(([s,r])=>Y`<optgroup label=${this._t(`group_${s}`)}>
            ${r.map(o=>Y`<option value=${o} ?selected=${o===e}>${this._t(`furn_${o}`)}</option>`)}
          </optgroup>`)}
      </select></label
    >`}_renderFloorPanel(t){let e=t.id,n=this.floors||[],s=r=>this._commit(Tp(this._plan,e,r));return Y`<h3>${this._t("floor_settings")}</h3>
      ${this._text(this._t("floor_name"),t.name,r=>s({name:r||t.id}))}
      ${this._select(this._t("floor_ha"),t.ha_floor||"",[{value:"",label:this._t("none")},...n.map(r=>({value:r.floor_id,label:r.name||r.floor_id}))],r=>{let o={ha_floor:r||null},a=n.find(c=>c.floor_id===r),l=!t.name||t.name===t.id||/^(Floor|Etage) \d+$/.test(t.name);a&&l&&(o.name=a.name),s(o)})}
      <div class="row">
        ${this._num(this._t("floor_height"),t.height??Ns,r=>s({height:Dt(r)}),{min:1,max:20})}
        ${this._num(this._t("floor_elevation"),t.elevation??0,r=>s({elevation:Dt(r)}),{min:-50,max:500})}
      </div>
      ${this._confirmDelete?Y`<p class="hint">${this._t("floor_delete_confirm")}</p>
            <div class="actions">
              <button class="danger" @click=${()=>this._deleteFloor()}>${pe("trash")}<span>${this._t("delete")}</span></button>
              <button @click=${()=>this._confirmDelete=!1}>${this._t("keep")}</button>
            </div>`:Y`<div class="actions">
            <button class="danger" @click=${()=>this._confirmDelete=!0}>${pe("trash")}<span>${this._t("floor_delete")}</span></button>
          </div>`}`}_renderRoomPanel(t,e){let n=t.id,s=Ce(t,e.id);if(!s)return ft;let r=this.areas||[],o=l=>this._commit(Pp(this._plan,n,s.id,l)),a=e.kind==="corner"?s.points[e.index]:null;return Y`<h3>${this._t("room")}</h3>
      ${this._text(this._t("room_name"),s.name,l=>o({name:l||s.id}))}
      ${this._select(this._t("room_area_ha"),s.area_id||"",[{value:"",label:this._t("none")},...r.map(l=>({value:l.area_id,label:l.name||l.area_id}))],l=>{let c={area_id:l||null},h=r.find(u=>u.area_id===l),d=!s.name||s.name===s.id||/^(Room|Raum) \d+$/.test(s.name);h&&d&&(c.name=h.name),o(c)})}
      ${this._num(this._t("room_ceiling"),s.ceiling_height??null,l=>o({ceiling_height:l==null?null:Dt(l)}),{allowEmpty:!0,min:1,max:20,placeholder:this._n(t.height??Ns,2)})}
      <div class="field">
        <span>${this._t("room_size")}</span>
        <span class="value">${this._t("area_value",{v:this._n(Dh(s.points),2)})}</span>
      </div>
      ${a?Y`<h3>${this._t("corner",{n:e.index+1})}</h3>
            <div class="row">
              ${this._num(this._t("pos_x"),a[0],l=>this._commit(Mr(this._plan,n,s.id,e.index,[l,a[1]])),{digits:3})}
              ${this._num(this._t("pos_z"),a[1],l=>this._commit(Mr(this._plan,n,s.id,e.index,[a[0],l])),{digits:3})}
            </div>
            <div class="actions">
              <button ?disabled=${s.points.length<=3} @click=${()=>this._deleteSelection()}>${pe("trash")}<span>${this._t("corner_delete")}</span></button>
            </div>
            ${s.points.length<=3?Y`<p class="hint">${this._t("corner_min")}</p>`:ft}`:ft}
      <div class="actions">
        <button class="danger" @click=${()=>this._commit(Hh(this._plan,n,s.id),null)}>${pe("trash")}<span>${this._t("room_delete")}</span></button>
      </div>`}_renderEdgePanel(t,e,n){let s=e.id,r=Ce(e,n.id),o=r&&zh(t,e,r.id,n.index);if(!o)return ft;let a=o.neighbours.map(h=>(Ce(e,h)||{}).name||h).join(", "),l={wall_exterior:.24,wall_interior:.12,...t.settings||{}},c=o.shared?l.wall_interior:l.wall_exterior;return Y`<h3>${this._t("wall")} · ${r.name||r.id}</h3>
      <div class="field">
        <span>${this._t("wall_length")}</span><span class="value">${this._t("length_value",{v:this._n(o.length,2)})}</span>
      </div>
      <p class="hint">${o.shared?this._t("wall_interior",{rooms:a}):this._t("wall_exterior")}</p>
      ${o.partial.length?Y`<p class="hint">${this._t("wall_partial",{rooms:o.partial.map(h=>(Ce(e,h)||{}).name||h).join(", ")})}</p>`:ft}
      ${this._num(this._t("wall_thickness"),o.thickness,h=>this._commit(Xh(this._plan,s,r.id,n.index,h)),{digits:3,min:.01,max:2,allowEmpty:!0})}
      <div class="actions">
        <button ?disabled=${o.stored==null} @click=${()=>this._commit(Xh(this._plan,s,r.id,n.index,null))}>
          ${this._t("wall_reset")}
        </button>
        <span class="hint">${this._t("wall_default",{v:this._n(c,3)})}</span>
      </div>
      <label class="check">
        <input type="checkbox" .checked=${xe(o.noWall)} @change=${h=>this._commit(Up(this._plan,s,r.id,n.index,h.target.checked))} />
        <span>${this._t("wall_none")}</span>
      </label>`}_renderOpeningPanel(t,e){let n=t.id,s=t.openings.find(l=>l.id===e.id);if(!s)return ft;let r=Ce(t,s.room_id),o=l=>this._commit(Aa(this._plan,n,s.id,l)),a=s.type==="door";return Y`<h3>${this._t(a?"opening_door":"opening_window")}</h3>
      ${this._select(this._t("opening_type"),s.type,[{value:"door",label:this._t("opening_door")},{value:"window",label:this._t("opening_window")}],l=>o({type:l,...Sa[l],width:s.width,hinge:s.hinge,swing:s.swing}))}
      <div class="field">
        <span>${this._t("opening_room")}</span><span>${r?r.name||r.id:s.room_id}</span>
      </div>
      <div class="row">
        ${this._num(this._t("width"),s.width,l=>o({width:Dt(l)}),{min:.2,max:10})}
        ${this._num(this._t("opening_offset"),s.offset,l=>o({offset:Dt(l)}),{min:0})}
        ${this._num(this._t("height"),s.height,l=>o({height:Dt(l)}),{min:.1,max:10})}
        ${this._num(this._t("sill"),s.sill??0,l=>o({sill:Dt(l)}),{min:0,max:10})}
      </div>
      ${a?Y`<div class="row">
              ${this._select(this._t("hinge"),s.hinge||"left",[{value:"left",label:this._t("hinge_left")},{value:"right",label:this._t("hinge_right")}],l=>o({hinge:l}))}
              ${this._select(this._t("swing"),s.swing||"in",[{value:"in",label:this._t("swing_in")},{value:"out",label:this._t("swing_out")}],l=>o({swing:l}))}
            </div>
            ${this._text(this._t("contact"),s.contact,l=>o({contact:l||null}),"binary_sensor.")}
            <p class="hint">${this._t("contact_hint")}</p>`:ft}
      <div class="actions">
        <button class="danger" @click=${()=>this._commit(qh(this._plan,n,s.id),null)}>${pe("trash")}<span>${this._t("opening_delete")}</span></button>
      </div>`}_renderFreeWallPanel(t,e){let n=t.id,s=t.walls.find(o=>o.id===e.id);if(!s)return ft;let r=o=>this._commit(Ta(this._plan,n,s.id,o));return Y`<h3>${this._t("freewall")}</h3>
      <div class="field">
        <span>${this._t("wall_length")}</span><span class="value">${this._t("length_value",{v:this._n(Yt(s.a,s.b),2)})}</span>
      </div>
      <div class="row">
        ${this._num(this._t("thickness"),s.thickness,o=>r({thickness:Dt(o)}),{digits:3,min:.01,max:5})}
        ${this._num(this._t("freewall_height"),s.height??null,o=>r({height:o==null?null:Dt(o)}),{allowEmpty:!0,min:.05,max:20,placeholder:this._n(t.height??Ns,2)})}
      </div>
      <div class="actions">
        <button class="danger" @click=${()=>this._commit(Zh(this._plan,n,s.id),null)}>${pe("trash")}<span>${this._t("freewall_delete")}</span></button>
      </div>`}_renderFurniturePanel(t,e){let n=t.id,s=t.furniture.find(o=>o.id===e.id);if(!s)return ft;let r=o=>this._commit(wr(this._plan,n,s.id,o));return Y`<h3>${this._t("furniture")}</h3>
      ${this._furnitureTypeSelect(this._t("furniture_type"),s.type,o=>r({type:o}))}
      <div class="row">
        ${this._num(this._t("width"),s.w,o=>r({w:o}),{min:.01,max:20})}
        ${this._num(this._t("depth"),s.d,o=>r({d:o}),{min:.01,max:20})}
        ${this._num(this._t("height"),s.h,o=>r({h:o}),{min:0,max:10})}
        ${this._num(this._t("rotation"),s.rotation||0,o=>r({rotation:o}),{digits:1})}
        ${this._num(this._t("pos_x"),s.x,o=>r({x:o}),{digits:3})}
        ${this._num(this._t("pos_z"),s.z,o=>r({z:o}),{digits:3})}
      </div>
      <div class="actions">
        <button title=${this._t("rotate_left")} aria-label=${this._t("rotate_left")} @click=${()=>r({rotation:(s.rotation||0)-90})}>
          ${pe("rotateLeft")}
        </button>
        <button title=${this._t("rotate_right")} aria-label=${this._t("rotate_right")} @click=${()=>r({rotation:(s.rotation||0)+90})}>
          ${pe("rotateRight")}
        </button>
        <button class="danger" @click=${()=>this._commit(Kh(this._plan,n,s.id),null)}>${pe("trash")}<span>${this._t("furniture_delete")}</span></button>
      </div>`}_renderBackgroundPanel(t){let e=t.id,n=t.background,s=Y`<label class="file">
      ${pe("upload")}<span>${this._t(n?"bg_replace":"bg_upload")}</span>
      <input class="visually-hidden" type="file" accept="image/*" @change=${c=>this._onUpload(c)} />
    </label>`,r=this._bgError?Y`<p class="hint" role="alert">${this._t("bg_error")}</p>`:ft;if(!n)return Y`<p class="hint">${this._t("bg_none")}</p><div class="actions">${s}</div>${r}`;let o=c=>this._commit(Er(this._plan,e,c)),a=this._calib,l;if(!a)l=Y`<button @click=${()=>this._calib={p1:null,p2:null,length:""}}>${pe("ruler")}<span>${this._t("bg_calibrate")}</span></button>`;else if(a.p1&&a.p2){let c=Yt(a.p1,a.p2);l=Y`<p class="hint">${this._t("bg_calib_measured",{v:this._n(c,2)})}</p>
        <label class="field"
          ><span>${this._t("bg_calib_length")}</span>
          <input
            type="text"
            inputmode="decimal"
            autocomplete="off"
            .value=${xe(a.length)}
            @input=${h=>this._calib={...this._calib,length:h.target.value}}
            @keydown=${h=>h.key==="Enter"&&this._applyCalibration()}
        /></label>
        <div class="actions">
          <button class="primary" ?disabled=${!(fa(a.length)>0)} @click=${()=>this._applyCalibration()}>${this._t("bg_calib_apply")}</button>
          <button @click=${()=>this._calib=null}>${this._t("cancel")}</button>
        </div>`}else l=Y`<div class="actions"><button @click=${()=>this._calib=null}>${this._t("cancel")}</button></div>`;return Y`<p class="hint">${this._t("bg_move_hint")}</p>
      <label class="field"
        ><span>${this._t("bg_opacity")} · ${Math.round((n.opacity??.5)*100)} %</span>
        <input
          type="range"
          min="0.05"
          max="1"
          step="0.05"
          .value=${xe(String(n.opacity??.5))}
          @input=${c=>this._draft=Er(this._plan,e,{opacity:Number(c.target.value)})}
          @change=${c=>o({opacity:Number(c.target.value)})}
      /></label>
      <div class="row">
        ${this._num(this._t("bg_width"),n.width,c=>o({width:Dt(c)}),{digits:3,min:.1,max:1e3})}
        ${this._num(this._t("bg_rotation"),n.rotation||0,c=>o({rotation:c}),{digits:1})}
        ${this._num(this._t("pos_x"),n.x||0,c=>o({x:Dt(c)}),{digits:3})}
        ${this._num(this._t("pos_z"),n.z||0,c=>o({z:Dt(c)}),{digits:3})}
      </div>
      ${l}
      <div class="actions">
        ${s}
        <button class="danger" @click=${()=>this._commit(Sr(this._plan,e,null),null)}>${pe("trash")}<span>${this._t("bg_remove")}</span></button>
      </div>
      ${r}`}_applyCalibration(){let t=this._calib,e=fa(t&&t.length),n=de(this._plan,this._floor);if(!t||!t.p1||!t.p2||!(e>0)||!n.background)return;let s=mp(n.background,t.p1,t.p2,e);this._calib=null,this._commit(Sr(this._plan,this._floor,s),{kind:"background"})}};customElements.get("pp-editor")||customElements.define("pp-editor",Ia);var ks=Math.PI/180;function Kp(i,t){let e=!1;for(let n=0,s=t.length-1;n<t.length;s=n++){let[r,o]=t[n],[a,l]=t[s];o>i[1]!=l>i[1]&&i[0]<(a-r)*(i[1]-o)/(l-o)+r&&(e=!e)}return e}function tu(i,t,e){let n=(i&&i.rooms||[]).find(s=>Kp([t,e],s.points));return n?n.id:null}function mM(i,t,e){let n=e[0]-t[0],s=e[1]-t[1],r=n*n+s*s;if(r<1e-12)return{d:Math.hypot(i[0]-t[0],i[1]-t[1]),t:0};let o=Math.max(0,Math.min(1,((i[0]-t[0])*n+(i[1]-t[1])*s)/r));return{d:Math.hypot(i[0]-t[0]-n*o,i[1]-t[1]-s*o),t:o}}function Jp(i,t,{maxDist:e=.4,inset:n=.03,endGap:s=.04}={}){let r=null;for(let o of i||[]){let a=o.b[0]-o.a[0],l=o.b[1]-o.a[1],c=Math.hypot(a,l);if(c<1e-6)continue;let h=((t[0]-o.a[0])*a+(t[1]-o.a[1])*l)/(c*c),d=Math.min(.5,s/c);h=Math.max(d,Math.min(1-d,h));let u=o.a[0]+a*h,f=o.a[1]+l*h,m=Math.hypot(t[0]-u,t[1]-f);if(!r||m<r.d){let _=o.n||[0,0];r={d:m,x:u+_[0]*n,z:f+_[1]*n,along:[h*c,(1-h)*c],phi:jp(Math.atan2(_[1],_[0])/ks),room:o.room}}}return r&&r.d<=e?r:null}var jp=i=>(i%360+360)%360;function Qp(i,t,e,n,s=0){let r=Math.atan2(n-t,e-i)/ks;return s&&(r=Math.round(r/s)*s),jp(Math.round(r*10)/10)}function tm(i,t,e,n=8){let s=Math.max(.1,i.x1-i.x0),r=Math.max(.1,i.z1-i.z0),o=Math.max(1,Math.min((t-2*n)/s,(e-2*n)/r)),a=(t-s*o)/2-i.x0*o,l=(e-r*o)/2-i.z0*o;return{scale:o,ox:a,oy:l,sx:c=>c*o+a,sz:c=>c*o+l,wx:c=>(c-a)/o,wz:c=>(c-l)/o}}var gM=.75;function eu(i,t){let e=t.phi*ks,n=Math.max(28,gM*i.scale);return[i.sx(t.x)+Math.cos(e)*n,i.sz(t.z)+Math.sin(e)*n]}function nu(i,t,e,n,{handleR:s=12,dotR:r=15}={}){let o=[...t||[]].reverse();for(let a of o){if(a.mount==="ceiling")continue;let[l,c]=eu(i,a);if(Math.hypot(e-l,n-c)<=s)return{entity_id:a.entity_id,mode:"rotate"}}for(let a of o)if(Math.hypot(e-i.sx(a.x),n-i.sz(a.z))<=r)return{entity_id:a.entity_id,mode:"move"};return null}function em(i,t=24){let e=i.reach||0;if(i.mount==="ceiling"){let o=Math.min(89,(i.fov_h||120)/2)*ks,a=Math.min(e,Math.max(.2,(i.height||2.5)*Math.tan(o))),l=[];for(let c=0;c<t*2;c++){let h=c/(t*2)*2*Math.PI;l.push([i.x+Math.cos(h)*a,i.z+Math.sin(h)*a])}return l}let n=e*Math.cos(Math.min(80,i.tilt||0)*ks),s=Math.min(180,(i.fov_h||120)/2),r=s>=180?[]:[[i.x,i.z]];for(let o=0;o<=t;o++){let a=(i.phi-s+2*s*o/t)*ks;r.push([i.x+Math.cos(a)*n,i.z+Math.sin(a)*n])}return r}function Da(i,t=.2){let e=i.map(h=>h[0]),n=i.map(h=>h[1]),s=Math.min(...e),r=Math.max(...e),o=Math.min(...n),a=Math.max(...n),l=Math.max(t,Math.min(r-s,a-o)/40),c=null;for(let h=s+l/2;h<r;h+=l)for(let d=o+l/2;d<a;d+=l){if(!Kp([h,d],i))continue;let u=1/0;for(let f=0;f<i.length;f++)u=Math.min(u,mM([h,d],i[f],i[(f+1)%i.length]).d);(!c||u>c.m)&&(c={x:h,z:d,m:u})}return c||{x:e.reduce((h,d)=>h+d,0)/e.length,z:n.reduce((h,d)=>h+d,0)/n.length,m:0}}function nm(i){if(i&&i.bounds)return i.bounds;let t=(i&&i.rooms||[]).flatMap(s=>s.points);if(!t.length)return{x0:0,x1:1,z0:0,z1:1};let e=t.map(s=>s[0]),n=t.map(s=>s[1]);return{x0:Math.min(...e)-.4,x1:Math.max(...e)+.4,z0:Math.min(...n)-.4,z1:Math.max(...n)+.4}}function iu(i,t,e){let n=Math.hypot(t[0]-i[0],t[1]-i[1])||1,s=-(t[1]-i[1])/n*e,r=(t[0]-i[0])/n*e;return[[i[0]+s,i[1]+r],[t[0]+s,t[1]+r],[t[0]-s,t[1]-r],[i[0]-s,i[1]-r]]}function su(i,t,e){return tu(i,t,e)!==null}var ru={light:["#1f7a4d","#1f5f99","#8a4b9c","#c06a14","#56616b","#b23a6f","#2f7f8f","#7a6a12"],dark:["#43b37b","#5a9be0","#c08bd2","#eb9a45","#9aa6b1","#e07aa8","#5cc3d3","#d4c04a"]};function im(i,t){let e=ru[t?"dark":"light"],n={};return(i||[]).forEach((s,r)=>{n[s.entity_id]=e[r%e.length]}),n}function ou(i,t){let e=String(i||"").trim(),n=e.match(/^#([0-9a-f]{3})$/i);if(n){let[s,r,o]=n[1].split("").map(a=>parseInt(a+a,16));return`rgba(${s},${r},${o},${t})`}if(n=e.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i),n){let s=parseInt(n[1],16);return`rgba(${s>>16&255},${s>>8&255},${s&255},${t})`}return n=e.match(/^rgba?\(([^)]+)\)$/i),n?`rgba(${n[1].split(/[\s,/]+/).filter(Boolean).slice(0,3).join(",")},${t})`:e}var Fs=[.5,.9,1.3],_M=["occupancy","presence","motion"],Na=["wall","corner","ceiling"],sm=["open","closed","live"],rm=["2d","3d","split"],Oa=90,au=.15,Rr={height:[.2,4,2],tilt:[0,90,0],phi:[0,359,0],fov_h:[10,360,0],fov_v:[10,180,0],reach:[.5,15,1],x:[-1e3,1e3,3],z:[-1e3,1e3,3]},La={wall:{height:1.9,tilt:10},corner:{height:1.9,tilt:10},ceiling:{height:2.5,tilt:90}},$i=(i,t)=>{let e=10**t;return Math.round(i*e)/e},xM=(i,t,e)=>Math.min(e,Math.max(t,i)),Ua=i=>(Math.round(+i||0)%360+360)%360;function om(i,t){if(i==="phi")return Number.isFinite(+t)?Ua(t):void 0;let e=Rr[i];if(!e)return t;let n=+t;if(!(t===""||t===null||!Number.isFinite(n)))return $i(xM(n,e[0],e[1]),e[2])}function Cr(i){return i?Array.isArray(i)?i:Array.isArray(i.profiles)?i.profiles:Object.entries(i).filter(([,t])=>t&&typeof t=="object"&&t.name).map(([t,e])=>({id:t,...e})):[]}function Pr(i){let t=Cr(i);return{version:1,default_fov_v:i&&!Array.isArray(i)&&i.default_fov_v?i.default_fov_v:Oa,profiles:t}}function zs(i,t){let e=Cr(i);return e.find(n=>n.id===t)||e.find(n=>n.id==="custom")||null}function lu(i,t,e=Oa){return i?t==="ceiling"&&i.ceiling?{fov_h:i.ceiling.fov,fov_v:i.ceiling.fov,reach:i.ceiling.reach}:{fov_h:i.fov_h,fov_v:i.fov_v==null?e:i.fov_v,reach:i.reach}:{fov_h:120,fov_v:e,reach:6}}function am(){return{loading:!0,error:null,source:null,revision:null,plan:null,editPlan:null,planDirty:!1,savedSensors:[],sensors:[],profiles:null,options:{},neonplan:{installed:!1,version:null,linked:!1},deviceProfiles:{},floorId:null,selected:null,dirty:!1,remoteChanged:!1,height:1.3,doorsMode:"open",thinDb:10,weight:1,snap:!0,cones:!0,view:"split",tab:"planner"}}var Tr=i=>i===void 0?i:JSON.parse(JSON.stringify(i));function lm(i,t){let e=t.plan||null,n=e&&e.floors||[],s=n.some(l=>l.id===i.floorId)?i.floorId:n[0]?n[0].id:null,r=(t.sensors||[]).map(l=>({...l})),o=t.options||{},a=r.some(l=>l.entity_id===i.selected)?i.selected:(r.find(l=>l.floor_id===s)||{}).entity_id||null;return{...i,loading:!1,error:null,source:t.source||"own",revision:t.revision===void 0?null:t.revision,plan:e,editPlan:Tr(e),planDirty:!1,savedSensors:Tr(r),sensors:r,profiles:t.profiles||i.profiles,options:o,neonplan:{installed:!1,version:null,linked:!1,...t.neonplan||{}},floorId:s,selected:a,dirty:!1,remoteChanged:!1,thinDb:typeof o.thin_db=="number"&&!i.thinTouched?o.thin_db:i.thinDb,tab:t.source==="neonplan"&&i.tab==="editor"?"planner":i.tab}}function cm(i,t){return t!==void 0&&t===i.revision?{state:i,reload:!1}:i.dirty||i.planDirty?{state:{...i,remoteChanged:!0},reload:!1}:{state:i,reload:!0}}var Bs=i=>(i.plan&&i.plan.floors||[]).find(t=>t.id===i.floorId)||null,Vn=i=>i.sensors.filter(t=>t.floor_id===i.floorId),$n=(i,t)=>i.sensors.find(e=>e.entity_id===t)||null;function Ir(i,t,e){let n=!1,s=i.sensors.map(r=>{if(r.entity_id!==t)return r;let o={...r};for(let[a,l]of Object.entries(e)){let c=a in Rr?om(a,l):l;c!==void 0&&o[a]!==c&&(o[a]=c,n=!0)}return o});return n?{...i,sensors:s,dirty:!0}:i}function hm(i,t,e){let n=$n(i,t),s=zs(i.profiles,e);if(!n||!s)return i;let r=s.mounts&&s.mounts.length&&!s.mounts.includes(n.mount)?s.mounts[0]:n.mount,o=Pr(i.profiles).default_fov_v;return Ir(i,t,{profile:s.id,mount:r,...lu(s,r,o)})}function um(i,t,e,n){let s=$n(i,t);if(!s||!Na.includes(e))return i;let r=zs(i.profiles,s.profile),o=Pr(i.profiles).default_fov_v,a=e==="ceiling"?{height:n||La.ceiling.height,tilt:90}:s.mount==="ceiling"?{...La[e]}:{},l=e==="ceiling"!=(s.mount==="ceiling")?lu(r,e,o):{};return Ir(i,t,{mount:e,...a,...l})}function dm(i,{floorId:t,x:e,z:n,profileId:s,profiles:r,phi:o=0}){let a=zs(r,s),l=a&&a.mounts&&a.mounts.length?a.mounts[0]:"wall";return{entity_id:i,floor_id:t,x:$i(e,3),z:$i(n,3),height:La[l].height,phi:Ua(o),tilt:La[l].tilt,mount:l,profile:a?a.id:"custom",...lu(a,l,Pr(r).default_fov_v),active:!0}}function fm(i,t){return $n(i,t.entity_id)?i:{...i,sensors:[...i.sensors,t],selected:t.entity_id,dirty:!0}}function pm(i,t){if(!$n(i,t))return i;let e=i.sensors.filter(s=>s.entity_id!==t),n=i.selected===t?(e.find(s=>s.floor_id===i.floorId)||{}).entity_id||null:i.selected;return{...i,sensors:e,selected:n,dirty:!0}}function mm(i){let t=Tr(i.savedSensors),e=t.some(n=>n.entity_id===i.selected)?i.selected:null;return{...i,sensors:t,editPlan:Tr(i.plan),dirty:!1,planDirty:!1,selected:e}}function gm(i,t){return{...i,editPlan:t,planDirty:!0}}function _m(i,t){return{...i,savedSensors:Tr(i.sensors),dirty:!1,revision:t===void 0?i.revision:t}}function xm(i){return i.sensors.map(t=>{let e={...t};for(let n of Object.keys(Rr))typeof e[n]=="number"&&(e[n]=om(n,e[n]));return delete e.fov_v_assumed,e})}function vM(i,t,e){if(i!=="live")return i==="closed"?"closed":"open";let n={};for(let s of t&&t.openings||[]){if(s.type==="window")continue;let r=s.contact&&e?e[s.contact]:null;n[s.id]=!(r&&r.state==="off")}return n}function cu(i,t,{fast:e=!1,grid:n=!0}={}){return{heights:e?[i.height]:Fs.slice(),doors:vM(i.doorsMode,Bs(i),t),thin_db:i.thinDb,cell:e?.2:.1,grid:n}}function ka(i,t){let e=new Set((t||[]).map(n=>typeof n=="string"?n:n.entity_id));return Object.entries(i||{}).filter(([n,s])=>n.startsWith("binary_sensor.")&&!e.has(n)&&s&&s.attributes&&_M.includes(s.attributes.device_class)).map(([n,s])=>({entity_id:n,name:s.attributes.friendly_name||n})).sort((n,s)=>n.name.localeCompare(s.name))}function vm(i,t,e=!1){if(!i)return null;let n=e?.01:.05,s=e?1:5;switch(t){case"ArrowLeft":return{x:$i(i.x-n,3)};case"ArrowRight":return{x:$i(i.x+n,3)};case"ArrowUp":return{z:$i(i.z-n,3)};case"ArrowDown":return{z:$i(i.z+n,3)};case"q":case"Q":return{phi:Ua(i.phi-s)};case"e":case"E":return{phi:Ua(i.phi+s)};default:return null}}function ym(i,t,e){return e?Ir(i,t,{x:e.x,z:e.z,height:e.height,phi:e.phi,tilt:e.tilt,mount:e.mount||"wall"}):i}var bm=i=>!!(i.neonplan&&i.neonplan.installed&&!i.neonplan.linked),Fa=i=>i.source==="own";function za(i,t,e){let n=Vn(i),s=n.find(o=>o.entity_id===i.selected);if(s&&e(s)===t)return s.entity_id;let r=n.find(o=>e(o)===t);return r?r.entity_id:s?s.entity_id:null}var hu=class extends He{static properties={model:{attribute:!1},sensors:{attribute:!1},evaluation:{attribute:!1},colors:{attribute:!1},names:{attribute:!1},height:{type:Number},cell:{type:Number},selected:{type:String},dark:{type:Boolean},cones:{type:Boolean},snap:{type:Boolean},readonly:{type:Boolean},t:{attribute:!1}};static styles=Sn`
    :host { display: block; position: relative; min-width: 0; }
    .wrap { position: relative; width: 100%; height: 100%; min-height: 240px; }
    canvas { display: block; width: 100%; height: 100%; touch-action: none; border-radius: 8px; }
    canvas:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  `;constructor(){super(),this.sensors=[],this.colors={},this.names={},this.height=1.3,this.cell=.1,this.cones=!0,this.snap=!0,this.t=t=>t,this._drag=null,this._labels=null,this._labelModel=null,this._w=0,this._h=0}render(){let t=(this.sensors||[]).find(n=>n.entity_id===this.selected),e=t?this.t("map.selected",{name:this.names[t.entity_id]||t.entity_id,x:t.x.toFixed(2),z:t.z.toFixed(2),phi:Math.round(t.phi)}):this.t("map.none_selected");return Y`<div class="wrap">
      <canvas tabindex="0" role="application" aria-label=${this.t("map.aria")} aria-describedby="desc"
        @pointerdown=${this._down} @pointermove=${this._move} @pointerup=${this._up} @pointercancel=${this._up}
        @keydown=${this._key}></canvas>
      <div id="desc" class="sr" aria-live="polite">${e}</div>
    </div>`}firstUpdated(){this._canvas=this.renderRoot.querySelector("canvas"),this._ro=new ResizeObserver(()=>this._resize()),this._ro.observe(this.renderRoot.querySelector(".wrap")),this._resize()}disconnectedCallback(){super.disconnectedCallback(),this._ro&&this._ro.disconnect(),cancelAnimationFrame(this._raf)}connectedCallback(){super.connectedCallback(),this._ro&&this.renderRoot.querySelector(".wrap")&&this._ro.observe(this.renderRoot.querySelector(".wrap"))}updated(){this._schedule()}_schedule(){cancelAnimationFrame(this._raf),this._raf=requestAnimationFrame(()=>this._draw())}_resize(){let t=this.renderRoot.querySelector(".wrap");if(!t||!this._canvas)return;let e=Math.max(200,t.clientWidth),n=Math.max(200,t.clientHeight),s=window.devicePixelRatio||1;e===this._w&&n===this._h&&s===this._dpr||(this._w=e,this._h=n,this._dpr=s,this._canvas.width=Math.round(e*s),this._canvas.height=Math.round(n*s),this._draw())}get _vp(){return tm(nm(this.model),this._w,this._h,12)}_palette(){let t=getComputedStyle(this),e=(n,s)=>(t.getPropertyValue(n)||"").trim()||s;return{ink:e("--primary-text-color",this.dark?"#e1e1e1":"#212121"),muted:e("--secondary-text-color",this.dark?"#9b9b9b":"#727272"),floor:e("--card-background-color",this.dark?"#1c1c1c":"#ffffff"),line:e("--divider-color",this.dark?"#3a3a3a":"#cccccc"),spill:e("--error-color","#db4437"),accent:e("--primary-color","#03a9f4"),glass:this.dark?"#62a9ee":"#3b86cf"}}_rgba(t,e){let n=ou(t,e);if(n.startsWith("rgba"))return n;let s=this._cc||(this._cc=document.createElement("canvas").getContext("2d"));return s.fillStyle="#000",s.fillStyle=t,ou(s.fillStyle,e)}_path(t,e,n){t.beginPath(),n.forEach((s,r)=>r?t.lineTo(e.sx(s[0]),e.sz(s[1])):t.moveTo(e.sx(s[0]),e.sz(s[1]))),t.closePath()}_poly(t,e,n,s,r,o=1){this._path(t,e,n),s&&(t.fillStyle=s,t.fill()),r&&(t.strokeStyle=r,t.lineWidth=o,t.stroke())}_roomLabels(){if(this._labelModel!==this.model){this._labelModel=this.model,this._labels={};for(let t of this.model&&this.model.rooms||[])this._labels[t.id]=Da(t.points)}return this._labels}_draw(){let t=this._canvas&&this._canvas.getContext("2d");if(!t||!this._w)return;let e=this._palette();t.setTransform(this._dpr,0,0,this._dpr,0,0),t.clearRect(0,0,this._w,this._h);let n=this.model;if(!n)return;let s=this._vp,r=s.scale;for(let u of n.rooms||[])this._poly(t,s,u.points,this._rgba(e.ink,.03));let o=this.evaluation&&this.evaluation.grid?this.evaluation.grid[String(this.height)]:null;if(o){let u=(this.cell||.1)/2;for(let f of o){let m=f.own>0&&f.own_sensor,_=f.spill&&f.spill.length;if(!m&&!_)continue;let g=Math.round(s.sx(f.x-u)),p=Math.round(s.sz(f.z-u)),b=Math.round(s.sx(f.x+u))-g,x=Math.round(s.sz(f.z+u))-p;m&&(t.fillStyle=this._rgba(this.colors[f.own_sensor]||e.accent,.14+.22*f.own),t.fillRect(g,p,b,x)),_&&(t.fillStyle=this._rgba(e.spill,.5),t.fillRect(g,p,b,x))}}for(let u of n.furniture||[])this._poly(t,s,u.poly,this._rgba(e.line,u.obstacle?.75:.45),this._rgba(e.muted,.6),.7);for(let u of n.bands||[])this._poly(t,s,u,e.ink);for(let u of n.freeWalls||[])this._poly(t,s,u.poly,this._rgba(e.ink,u.block?.65:.3));let a=[...(n.doors||[]).filter(u=>u.a&&u.b).map(u=>[iu(u.a,u.b,.45),e.floor,null]),...(n.windows||[]).filter(u=>u.a&&u.b).map(u=>[iu(u.a,u.b,.45),e.floor,this._rgba(e.glass,.45)])];if(a.length)for(let u of n.bands||[]){t.save(),this._path(t,s,u),t.clip();for(let[f,m,_]of a)this._poly(t,s,f,m),_&&this._poly(t,s,f,_);t.restore()}t.strokeStyle=e.glass,t.lineWidth=2;for(let u of n.windows||[])t.beginPath(),t.moveTo(s.sx(u.a[0]),s.sz(u.a[1])),t.lineTo(s.sx(u.b[0]),s.sz(u.b[1])),t.stroke();t.lineWidth=1.3;for(let u of n.doors||[])if(!(!u.hinge||!u.tip)&&(t.strokeStyle=e.muted,t.beginPath(),t.moveTo(s.sx(u.hinge[0]),s.sz(u.hinge[1])),t.lineTo(s.sx(u.tip[0]),s.sz(u.tip[1])),t.stroke(),u.other)){let f=Math.atan2(u.tip[1]-u.hinge[1],u.tip[0]-u.hinge[0]),_=(Math.atan2(u.other[1]-u.hinge[1],u.other[0]-u.hinge[0])-f+3*Math.PI)%(2*Math.PI)-Math.PI,g=(u.w||Math.hypot(u.tip[0]-u.hinge[0],u.tip[1]-u.hinge[1]))*r;t.setLineDash([3,3]),t.beginPath(),t.arc(s.sx(u.hinge[0]),s.sz(u.hinge[1]),g,f,f+_,_<0),t.stroke(),t.setLineDash([])}let l=this._roomLabels(),c=getComputedStyle(this).fontFamily||"Roboto, sans-serif";t.fillStyle=e.ink,t.font=`500 ${Math.max(11,Math.min(15,r*.26))}px ${c}`,t.textAlign="center",t.textBaseline="middle";for(let u of n.rooms||[]){let f=l[u.id];f&&t.fillText(String(u.name||u.id).toUpperCase(),s.sx(f.x),s.sz(f.z))}let h=12,d=this._h-12;if(t.strokeStyle=e.muted,t.lineWidth=2,t.beginPath(),t.moveTo(h,d),t.lineTo(h+r,d),t.stroke(),t.fillStyle=e.muted,t.font=`11px ${c}`,t.textAlign="left",t.textBaseline="alphabetic",t.fillText("1 m",h,d-5),(this.sensors||[]).forEach((u,f)=>{let m=u.active===!1?e.muted:this.colors[u.entity_id]||e.accent,_=s.sx(u.x),g=s.sz(u.z),p=u.entity_id===this.selected;if(this.cones&&u.active!==!1&&(this._path(t,s,em(u)),t.strokeStyle=this._rgba(m,p?.95:.5),t.lineWidth=p?1.6:1,t.setLineDash([5,4]),t.stroke(),t.setLineDash([])),u.mount!=="ceiling"){let[b,x]=eu(s,u);t.strokeStyle=m,t.lineWidth=3,t.beginPath(),t.moveTo(_,g),t.lineTo(b,x),t.stroke(),t.beginPath(),t.arc(b,x,p?7:5,0,2*Math.PI),t.fillStyle=e.floor,t.fill(),t.strokeStyle=m,t.lineWidth=2,t.stroke()}t.beginPath(),t.arc(_,g,p?12:10,0,2*Math.PI),t.fillStyle=u.active===!1?e.floor:m,t.fill(),t.strokeStyle=p?e.accent:u.active===!1?m:e.floor,t.lineWidth=p?3:2,t.stroke(),t.fillStyle=u.active===!1?m:"#fff",t.font=`600 11px ${c}`,t.textAlign="center",t.textBaseline="middle",t.fillText(String(f+1),_,g+.5),t.textBaseline="alphabetic"}),this._drag&&this._drag.snapInfo){let u=(this.sensors||[]).find(f=>f.entity_id===this._drag.entity_id);if(u){let[f,m]=this._drag.snapInfo.along,_=this.t("map.snap_readout",{a:Math.round(f*100),b:Math.round(m*100)});t.font=`12px ${c}`,t.textAlign="left";let g=t.measureText(_).width,p=Math.max(4,Math.min(this._w-g-8,s.sx(u.x)+16)),b=Math.max(16,s.sz(u.z)-16);t.fillStyle=this._rgba(e.floor,.92),t.fillRect(p-4,b-13,g+8,18),t.fillStyle=e.ink,t.fillText(_,p,b)}}}_pos(t){let e=this._canvas.getBoundingClientRect();return[t.clientX-e.left,t.clientY-e.top]}_emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}_down(t){if(!this.model)return;let[e,n]=this._pos(t),s=nu(this._vp,this.sensors,e,n);s&&(s.entity_id!==this.selected&&this._emit("select",{entity_id:s.entity_id}),!this.readonly&&(this._drag={...s,snapInfo:null,moved:!1},this._canvas.setPointerCapture(t.pointerId),this._canvas.focus({preventScroll:!0}),t.preventDefault()))}_move(t){if(!this.model)return;let[e,n]=this._pos(t),s=this._vp;if(!this._drag){this._canvas.style.cursor=nu(s,this.sensors,e,n)?"grab":"default";return}let r=(this.sensors||[]).find(a=>a.entity_id===this._drag.entity_id);if(!r)return;let o;if(this._drag.mode==="rotate")o={phi:Math.round(Qp(r.x,r.z,s.wx(e),s.wz(n),t.shiftKey?0:5))%360};else{let a=[s.wx(e),s.wz(n)];if(this._drag.snapInfo=null,this.snap&&r.mount!=="ceiling"&&!t.altKey){let l=Jp(this.model.faces,a,{maxDist:.4});l&&(a=[l.x,l.z],this._drag.snapInfo=l)}if(!su(this.model,a[0],a[1]))return;o={x:Math.round(a[0]*1e3)/1e3,z:Math.round(a[1]*1e3)/1e3}}this._drag.moved=!0,this._drag.last=o,this._canvas.style.cursor="grabbing",this._emit("sensor-move",{entity_id:r.entity_id,patch:o,final:!1})}_up(){if(!this._drag)return;let t=this._drag;this._drag=null,this._canvas.style.cursor="default",t.moved&&this._emit("sensor-move",{entity_id:t.entity_id,patch:t.last||{},final:!0}),this._schedule()}_key(t){let e=this.sensors||[];if((t.key==="n"||t.key==="p"||t.key==="N"||t.key==="P")&&e.length){let a=e.findIndex(c=>c.entity_id===this.selected),l=t.key.toLowerCase()==="n"?1:-1;this._emit("select",{entity_id:e[(a+l+e.length)%e.length].entity_id}),t.preventDefault();return}if(this.readonly)return;let n=e.find(a=>a.entity_id===this.selected),s=vm(n,t.key,t.shiftKey);if(!s)return;t.preventDefault();let r=s.x===void 0?n.x:s.x,o=s.z===void 0?n.z:s.z;su(this.model,r,o)&&this._emit("sensor-move",{entity_id:n.entity_id,patch:s,final:!0})}};customElements.get("pp-map2d")||customElements.define("pp-map2d",hu);var wm="presence_planner",hi=class extends Error{constructor(t,e,n){super(e||t),this.name="PlannerError",this.code=t,this.i18nKey=n}},uu={unauthorized:"error.unauthorized",neonplan_incompatible:"error.neonplan_incompatible",unknown_command:"error.not_loaded",not_loaded:"error.not_loaded",neonplan_error:"error.neonplan_error",neonplan_unavailable:"error.neonplan_unavailable",neonplan_rejected:"error.neonplan_rejected",no_plan:"error.no_plan",not_found:"error.not_found",not_supported:"error.not_supported",invalid_format:"error.invalid_format",timeout:"error.timeout"};function Hn(i){if(i instanceof hi)return i;let t=i&&(i.code||i.error&&i.error.code)||"unknown",e=i&&(i.message||i.error&&i.error.message)||String(i),n=uu[t];return!n&&/neonplan_incompatible/.test(e)?new hi("neonplan_incompatible",e,uu.neonplan_incompatible):!n&&/unauthori[sz]ed|admin/i.test(e)?new hi("unauthorized",e,uu.unauthorized):new hi(t,e,n||"error.generic")}function yM(i){if(!i)return{};let t=i;!Array.isArray(t)&&typeof t=="object"&&(t=t.suggestions||t.devices||t.profiles||t);let e={};if(Array.isArray(t)){for(let n of t){if(!n||!n.entity_id)continue;let s=n.profile_id||n.profile||n.suggestion&&n.suggestion.id;s&&(e[n.entity_id]=typeof s=="object"?s.id:s)}return e}for(let[n,s]of Object.entries(t))s&&(e[n]=typeof s=="object"?s.profile_id||s.profile||s.id:s);return e}var Ba=class{constructor(t){this.connection=t}async _call(t,e={}){if(!this.connection)throw new hi("no_connection","No connection","error.generic");try{return await this.connection.sendMessagePromise({type:`${wm}/${t}`,...e})}catch(n){throw Hn(n)}}get(){return this._call("get")}async subscribe(t){if(!this.connection)throw new hi("no_connection","No connection","error.generic");try{return await this.connection.subscribeMessage(e=>t(e||{}),{type:`${wm}/subscribe`})}catch(e){throw Hn(e)}}saveSensors(t){return this._call("save_sensors",{sensors:t})}savePlan(t){return this._call("save_plan",{plan:t})}exportPlan(){return this._call("export")}importPlan(t){return this._call("import",{data:t})}linkNeonplan(){return this._call("link_neonplan")}async deviceProfiles(){return yM(await this._call("device_profiles"))}};var Va={title:"Presence Planner","source.neonplan":"NeonPlan","source.own":"Own plan","floor.select":"Floor","floor.default_name":"Ground floor","action.save":"Save","action.reset":"Reset","action.export":"Export","action.import":"Import","action.link_neonplan":"Link in NeonPlan","action.reload":"Reload","action.cancel":"Cancel","status.loading":"Loading plan\u2026","status.saving":"Saving\u2026","status.saved":"Saved.","status.exported":"Export downloaded.","status.imported":"Plan imported.","status.linked":"Button added to the NeonPlan menu.","status.revision":"Revision {revision}","status.sensors":"{count} sensors on this floor","status.unsaved":"unsaved changes","banner.remote_changed":"The plan or the sensors were changed elsewhere. Reload to see the new version; your unsaved changes will be lost.","banner.read_only":"You can look at the plan, but saving needs an administrator account.","error.generic":"Something went wrong: {detail}","error.unauthorized":"Not allowed. Saving and importing need an administrator account in Home Assistant.","error.neonplan_incompatible":"This NeonPlan 3D version is not supported yet. Presence Planner uses its own plan until an update is available.","error.not_loaded":"The Presence Planner integration is not loaded. Add it under Settings > Devices & services.","error.not_found":"Not found: {detail}","error.not_supported":"Not possible with the current plan source: {detail}","error.invalid_format":"The file is not in a supported format: {detail}","error.invalid_json":"The file is not valid JSON.","error.timeout":"Home Assistant did not answer in time.","error.neonplan_error":"NeonPlan reported an error: {detail}","error.neonplan_unavailable":"NeonPlan 3D is not available right now. Presence Planner uses its own plan.","error.neonplan_rejected":"NeonPlan did not accept the change: {detail}","error.no_plan":"There is no plan to export yet.","error.model":"The plan could not be calculated: {detail}","empty.no_plan":"There is no floor plan yet. Import a NeonPlan export or draw your own plan.","empty.start_editor":"Draw a plan","empty.no_floor":"This floor has no rooms yet.","import.confirm":"Importing replaces your own plan. Continue?","tabs.label":"Views","tabs.planner":"Planner","tabs.editor":"Editor","stage.label":"Floor plan","view.label":"Display","view.2d":"2D","view.3d":"3D","view.split":"Split","height.label":"Height for the coverage map","height.h05":"Lying, 0.5 m above the floor","height.h09":"Sitting, 0.9 m above the floor","height.h13":"Standing, 1.3 m above the floor","height.short05":"Lying","height.short09":"Sitting","height.short13":"Standing","legend.own":"seen by the room's own sensor","legend.spill":"seen from another room","map.aria":"Floor plan with sensors. Select a sensor, move it with the arrow keys, rotate it with Q and E, switch with N and P.","map.help":"Drag a sensor to move it, drag the small handle to turn it. Sensors snap to wall faces; hold Alt to place freely. Keyboard: arrow keys move by 5 cm (Shift 1 cm), Q and E turn by 5\xB0, N and P select the next or previous sensor.","map.selected":"Selected: {name}, x {x} m, z {z} m, direction {phi}\xB0","map.none_selected":"No sensor selected","map.snap_readout":"{a} cm | {b} cm to the end of the wall","sensors.title":"Sensors","sensors.empty":"No sensor placed on this floor yet.","sensors.select":"Select {name}","sensors.add_select":"Sensor to add","sensors.add":"Add sensor","sensors.no_candidates":"All presence and motion sensors from Home Assistant are placed.","sensors.suggested_profile":"Suggested profile from the device: {profile}","sensor.active":"include","sensor.profile":"Profile","sensor.mount":"Mount","sensor.phi":"Direction","sensor.height":"Height","sensor.tilt":"Tilt","sensor.fov_h":"Field of view, horizontal","sensor.fov_v":"Field of view, vertical","sensor.reach":"Reach","sensor.x":"Position x","sensor.z":"Position z","sensor.glass_warning":"A window is in view. Reflections can cause false detections.","sensor.remove":"Remove from plan","profile.custom":"Custom","profile.unverified":"not verified by the manufacturer","profile.unverified_hint":"The values come from community sources, not from the manufacturer's datasheet.","profile.fov_v_assumed":"The manufacturer gives no vertical field of view; {fov}\xB0 is assumed.","mount.wall":"Wall","mount.corner":"Corner","mount.ceiling":"Ceiling","results.title":"Results","results.none":"No results yet.","results.room":"Room","results.misfire":"Misfire risk","results.misfire_hint":"Share of the room that sensors from other rooms see at 1.3 m, with all doors open","results.seen_from":"Seen from","results.no_sensor":"no sensor","results.spill_list":"Sensors that see into other rooms","results.spill_line":"{sensor} sees {share} of {room}","results.no_spill":"No sensor sees noticeably into another room.","results.glass_title":"Windows in view","results.glass_line":"{sensor}: window in view, reflections possible","results.zones":"Zones","zone.bed":"Bed","zone.sofa":"Sofa","zone.desk":"Desk","zone.dining":"Dining table","zone.kitchen":"Kitchen counter","zone.wc":"Toilet","zone.shower":"Shower","zone.bathtub":"Bathtub","zone.washbasin":"Washbasin","zone.entry":"Entrance","optimizer.title":"Best spot","optimizer.room":"Room","optimizer.profile":"Profile","optimizer.target":"Apply to","optimizer.target_none":"no sensor","optimizer.weight":"Balance ({value})","optimizer.weight_coverage":"Coverage","optimizer.weight_misfire":"Avoid misfires","optimizer.run_room":"Suggest best spot","optimizer.run_all":"All rooms","optimizer.progress":"Optimizer progress","optimizer.running":"Calculating {room}\u2026 {pct}","optimizer.error":"The optimizer stopped: {detail}","optimizer.intro":"Finds the mount points with the best coverage and the least view into other rooms.","optimizer.no_result":"No suitable mount point found.","optimizer.coverage":"Coverage","optimizer.spill":"Spill","optimizer.glass":"window in view","optimizer.score":"Score","optimizer.apply":"Apply","optimizer.apply_to":"Move {name} here","optimizer.no_target":"Choose a sensor to apply this to","assume.title":"Assumptions","assume.doors":"Doors","assume.doors_open":"open","assume.doors_closed":"closed","assume.doors_live":"live","assume.doors_live_none":"No door on this floor has a contact sensor.","assume.thin":"Thin walls (under 10 cm)","assume.snap":"Snap to walls","assume.cones":"Show fields of view","assume.how_title":"How the planner calculates","assume.how_text":"Each sensor sees within its horizontal and vertical field of view up to its reach; the reach shrinks towards the edge of the view. Exterior walls and walls from 20 cm block. Walls from 10 to 19 cm damp by 25 dB, thinner ones by the value of the slider. Tall furniture damps by 10 dB, closed doors by 6 dB. This is a model, not a measurement.","view3d.reset":"Reset view","view3d.top":"Top view","room.outside":"outside"};var Sm={title:"Presence Planner","source.neonplan":"NeonPlan","source.own":"Eigener Plan","floor.select":"Etage","floor.default_name":"Erdgeschoss","action.save":"Speichern","action.reset":"Zur\xFCcksetzen","action.export":"Exportieren","action.import":"Importieren","action.link_neonplan":"In NeonPlan verlinken","action.reload":"Neu laden","action.cancel":"Abbrechen","status.loading":"Plan wird geladen \u2026","status.saving":"Wird gespeichert \u2026","status.saved":"Gespeichert.","status.exported":"Export heruntergeladen.","status.imported":"Plan importiert.","status.linked":"Knopf im NeonPlan-Men\xFC erg\xE4nzt.","status.revision":"Revision {revision}","status.sensors":"{count} Sensoren auf dieser Etage","status.unsaved":"nicht gespeichert","banner.remote_changed":"Plan oder Sensoren wurden an anderer Stelle ge\xE4ndert. Lade neu, um den neuen Stand zu sehen. Deine ungespeicherten \xC4nderungen gehen dabei verloren.","banner.read_only":"Du kannst dir den Plan ansehen. Zum Speichern brauchst du ein Administratorkonto.","error.generic":"Da ist etwas schiefgegangen: {detail}","error.unauthorized":"Keine Berechtigung. Speichern und Importieren gehen nur mit einem Administratorkonto in Home Assistant.","error.neonplan_incompatible":"Diese Version von NeonPlan 3D wird noch nicht unterst\xFCtzt. Bis zu einem Update nutzt Presence Planner den eigenen Plan.","error.not_loaded":"Die Integration Presence Planner ist nicht geladen. Richte sie unter Einstellungen > Ger\xE4te & Dienste ein.","error.not_found":"Nicht gefunden: {detail}","error.not_supported":"Mit der aktuellen Planquelle nicht m\xF6glich: {detail}","error.invalid_format":"Das Dateiformat wird nicht unterst\xFCtzt: {detail}","error.invalid_json":"Die Datei ist kein g\xFCltiges JSON.","error.timeout":"Home Assistant hat nicht rechtzeitig geantwortet.","error.neonplan_error":"NeonPlan meldet einen Fehler: {detail}","error.neonplan_unavailable":"NeonPlan 3D ist gerade nicht erreichbar. Presence Planner nutzt den eigenen Plan.","error.neonplan_rejected":"NeonPlan hat die \xC4nderung nicht \xFCbernommen: {detail}","error.no_plan":"Es gibt noch keinen Plan zum Exportieren.","error.model":"Der Plan l\xE4sst sich nicht berechnen: {detail}","empty.no_plan":"Es gibt noch keinen Grundriss. Importiere einen NeonPlan-Export oder zeichne deinen eigenen Plan.","empty.start_editor":"Plan zeichnen","empty.no_floor":"Auf dieser Etage gibt es noch keine R\xE4ume.","import.confirm":"Der Import ersetzt deinen eigenen Plan. Weiter?","tabs.label":"Ansichten","tabs.planner":"Planer","tabs.editor":"Editor","stage.label":"Grundriss","view.label":"Darstellung","view.2d":"2D","view.3d":"3D","view.split":"Geteilt","height.label":"H\xF6he f\xFCr die Abdeckungskarte","height.h05":"Liegen, 0,5 m \xFCber dem Boden","height.h09":"Sitzen, 0,9 m \xFCber dem Boden","height.h13":"Stehen, 1,3 m \xFCber dem Boden","height.short05":"Liegen","height.short09":"Sitzen","height.short13":"Stehen","legend.own":"vom Sensor des Raums erfasst","legend.spill":"aus einem anderen Raum erfasst","map.aria":"Grundriss mit Sensoren. Sensor w\xE4hlen, mit den Pfeiltasten verschieben, mit Q und E drehen, mit N und P wechseln.","map.help":"Zieh einen Sensor, um ihn zu verschieben, und den kleinen Griff, um ihn zu drehen. Sensoren rasten an Wandfl\xE4chen ein, mit gedr\xFCckter Alt-Taste platzierst du frei. Tastatur: Pfeiltasten verschieben um 5 cm (mit Umschalt 1 cm), Q und E drehen um 5\xB0, N und P w\xE4hlen den n\xE4chsten oder vorherigen Sensor.","map.selected":"Gew\xE4hlt: {name}, x {x} m, z {z} m, Richtung {phi}\xB0","map.none_selected":"Kein Sensor gew\xE4hlt","map.snap_readout":"{a} cm | {b} cm bis zum Wandende","sensors.title":"Sensoren","sensors.empty":"Auf dieser Etage ist noch kein Sensor platziert.","sensors.select":"{name} w\xE4hlen","sensors.add_select":"Sensor zum Hinzuf\xFCgen","sensors.add":"Sensor hinzuf\xFCgen","sensors.no_candidates":"Alle Pr\xE4senz- und Bewegungsmelder aus Home Assistant sind platziert.","sensors.suggested_profile":"Vorgeschlagenes Profil laut Ger\xE4t: {profile}","sensor.active":"einrechnen","sensor.profile":"Profil","sensor.mount":"Montage","sensor.phi":"Richtung","sensor.height":"H\xF6he","sensor.tilt":"Neigung","sensor.fov_h":"Sichtfeld waagerecht","sensor.fov_v":"Sichtfeld senkrecht","sensor.reach":"Reichweite","sensor.x":"Position x","sensor.z":"Position z","sensor.glass_warning":"Ein Fenster ist im Blickfeld. Spiegelungen k\xF6nnen Fehlschaltungen verursachen.","sensor.remove":"Aus dem Plan entfernen","profile.custom":"Eigene Werte","profile.unverified":"nicht vom Hersteller best\xE4tigt","profile.unverified_hint":"Die Werte stammen aus Quellen der Community, nicht aus dem Datenblatt des Herstellers.","profile.fov_v_assumed":"Der Hersteller nennt kein senkrechtes Sichtfeld, angenommen werden {fov}\xB0.","mount.wall":"Wand","mount.corner":"Ecke","mount.ceiling":"Decke","results.title":"Auswertung","results.none":"Noch keine Ergebnisse.","results.room":"Raum","results.misfire":"Fehlschalt-Risiko","results.misfire_hint":"Anteil des Raums, den Sensoren aus anderen R\xE4umen in 1,3 m H\xF6he sehen, bei offenen T\xFCren","results.seen_from":"Blick hinein von","results.no_sensor":"kein Sensor","results.spill_list":"Sensoren, die in andere R\xE4ume sehen","results.spill_line":"{sensor} sieht {share} von {room}","results.no_spill":"Kein Sensor schaut sp\xFCrbar in einen anderen Raum.","results.glass_title":"Fenster im Blickfeld","results.glass_line":"{sensor}: Fenster im Blickfeld, Spiegelungen m\xF6glich","results.zones":"Zonen","zone.bed":"Bett","zone.sofa":"Sofa","zone.desk":"Schreibtisch","zone.dining":"Esstisch","zone.kitchen":"K\xFCchenzeile","zone.wc":"WC","zone.shower":"Dusche","zone.bathtub":"Badewanne","zone.washbasin":"Waschtisch","zone.entry":"Eingang","optimizer.title":"Bester Platz","optimizer.room":"Raum","optimizer.profile":"Profil","optimizer.target":"\xDCbernehmen f\xFCr","optimizer.target_none":"keinen Sensor","optimizer.weight":"Gewichtung ({value})","optimizer.weight_coverage":"Abdeckung","optimizer.weight_misfire":"Fehlschaltungen vermeiden","optimizer.run_room":"Besten Platz vorschlagen","optimizer.run_all":"Alle R\xE4ume","optimizer.progress":"Fortschritt der Optimierung","optimizer.running":"Berechne {room} \u2026 {pct}","optimizer.error":"Die Optimierung wurde abgebrochen: {detail}","optimizer.intro":"Sucht die Montagepunkte mit der besten Abdeckung und dem geringsten Blick in andere R\xE4ume.","optimizer.no_result":"Kein passender Montagepunkt gefunden.","optimizer.coverage":"Abdeckung","optimizer.spill":"\xDCberstrahlung","optimizer.glass":"Fenster im Blickfeld","optimizer.score":"Wertung","optimizer.apply":"\xDCbernehmen","optimizer.apply_to":"{name} hierher setzen","optimizer.no_target":"W\xE4hle einen Sensor, f\xFCr den der Vorschlag gelten soll","assume.title":"Annahmen","assume.doors":"T\xFCren","assume.doors_open":"offen","assume.doors_closed":"zu","assume.doors_live":"live","assume.doors_live_none":"Keine T\xFCr auf dieser Etage hat einen Kontaktsensor.","assume.thin":"D\xFCnne W\xE4nde (unter 10 cm)","assume.snap":"An W\xE4nden einrasten","assume.cones":"Sichtfelder zeigen","assume.how_title":"So rechnet der Planer","assume.how_text":"Jeder Sensor sieht in seinem waagerechten und senkrechten Sichtfeld bis zu seiner Reichweite, zum Rand hin nimmt die Reichweite ab. Au\xDFenw\xE4nde und W\xE4nde ab 20 cm blocken. W\xE4nde von 10 bis 19 cm d\xE4mpfen um 25 dB, d\xFCnnere um den Wert des Reglers. Hohe M\xF6bel d\xE4mpfen um 10 dB, geschlossene T\xFCren um 6 dB. Das ist ein Modell, keine Messung.","view3d.reset":"Ansicht zur\xFCcksetzen","view3d.top":"Draufsicht","room.outside":"au\xDFerhalb"};var Em={en:Va,de:Sm};function Am(i){let t=String(i||"en").toLowerCase().split(/[-_]/)[0];return Em[t]?t:"en"}function $a(i){let t=Am(i),e=Em[t],n=(s,r)=>{let o=e[s];return o===void 0&&(o=Va[s]),o===void 0?s:(r&&(o=o.replace(/\{(\w+)\}/g,(a,l)=>r[l]===void 0||r[l]===null?a:String(r[l]))),o)};return n.lang=t,n.has=s=>e[s]!==void 0||Va[s]!==void 0,n}function du(i){let t=Am(i),e=new Map,n=o=>(e.has(o)||e.set(o,new Intl.NumberFormat(t,{minimumFractionDigits:o,maximumFractionDigits:o})),e.get(o)),s=(o,a)=>{let l=10**a,c=Math.round(o*l)/l;return n(a).format(c===0?0:c)},r=o=>o==null||Number.isNaN(+o);return{num:(o,a=0)=>r(o)?"\u2013":s(+o,a),pct:(o,a=0)=>r(o)?"\u2013":`${s(+o*100,a)} %`}}var wM="presence-planner-worker.js",SM="/presence_planner/frontend/presence-planner-worker.js";function Tm(i){try{if(i&&/^https?:/.test(i)){let t=new URL(wM,i),e=new URL(i).search;return e&&(t.search=e),t.href}}catch{}return SM}var EM=i=>typeof i.value=="number"?i.value:typeof i.progress=="number"?i.progress:i.total?(i.done||0)/i.total:null,AM=i=>i.result||i.results||i.candidates||[],Ha=class{constructor({createWorker:t,fallback:e}={}){this.createWorker=t,this.fallback=e,this.worker=null,this.nextId=1,this.pending=new Map,this.cancelled=!1,this.running=!1}_ensureWorker(){if(this.worker||!this.createWorker)return this.worker;try{this.worker=this.createWorker()}catch{return this.createWorker=null,null}return this.worker.onmessage=t=>this._onMessage(t.data||{}),this.worker.onerror=t=>{let e=new Error(t&&t.message||"worker error");for(let n of this.pending.values())n.reject(e);this.pending.clear(),this._dropWorker()},this.worker}_dropWorker(){if(this.worker)try{this.worker.terminate()}catch{}this.worker=null}_onMessage(t){let e=this.pending.get(t.id);if(e)if(t.type==="error"||t.error!==void 0)this.pending.delete(t.id),e.reject(new Error(t.message||t.error||"optimizer error"));else if(t.type==="result"||t.result!==void 0||t.results!==void 0||t.candidates!==void 0)this.pending.delete(t.id),e.resolve(AM(t));else{let n=EM(t);n!==null&&e.onProgress(Math.max(0,Math.min(1,n)))}}_runOne(t,e){let n=this._ensureWorker();if(!n)return this.fallback?Promise.resolve().then(()=>this.fallback(t)):Promise.reject(new Error("no optimizer available"));let s=this.nextId++;return new Promise((r,o)=>{this.pending.set(s,{resolve:r,reject:o,onProgress:e}),n.postMessage({id:s,type:"optimize",...t})})}async run({plan:t,floorId:e,roomIds:n,profileId:s,opts:r,weight:o,profiles:a},l=()=>{}){this.cancelled=!1,this.running=!0;let c={},h=n.length||1;try{for(let d=0;d<n.length&&!this.cancelled;d++){let u=n[d];l(d/h,u);let f={plan:t,floorId:e,roomId:u,profileId:s,opts:r,weight:o,profiles:a};try{c[u]=await this._runOne(f,m=>l((d+m)/h,u))}catch(m){if(this.cancelled)break;c[u]={error:m.message||String(m)}}}return this.cancelled||l(1,null),c}finally{this.running=!1}}cancel(){this.cancelled=!0;let t=new Error("cancelled");for(let e of this.pending.values())e.reject(t);this.pending.clear(),this._dropWorker()}dispose(){this.cancel(),this.createWorker=null}};var Rm=Sn`
  :host {
    /* Fallbacks only matter outside Home Assistant; inside, the theme variables are always set. */
    --pp-fb-bg: #fafafa;
    --pp-fb-surface: #ffffff;
    --pp-fb-text: #212121;
    --pp-fb-muted: #727272;
    --pp-fb-line: #dddddd;
    display: block;
    min-height: 100%;
    background: var(--primary-background-color, var(--pp-fb-bg));
    color: var(--pp-text);
    font-family: var(--paper-font-body1_-_font-family, var(--ha-font-family-body, Roboto, sans-serif));
    font-size: 14px;
    --pp-gap: 12px;
    --pp-radius: 8px;
    --pp-text: var(--primary-text-color, var(--pp-fb-text));
    --pp-surface: var(--card-background-color, var(--ha-card-background, var(--pp-fb-surface)));
    --pp-line: var(--divider-color, var(--pp-fb-line));
    --pp-muted: var(--secondary-text-color, var(--pp-fb-muted));
    --pp-accent: var(--primary-color, #03a9f4);
    --pp-on-accent: var(--text-primary-color, #fff);
    --pp-warn: var(--warning-color, #c77700);
    --pp-error: var(--error-color, #db4437);
  }
  :host([dark]) {
    --pp-fb-bg: #111111;
    --pp-fb-surface: #1c1c1c;
    --pp-fb-text: #e1e1e1;
    --pp-fb-muted: #9b9b9b;
    --pp-fb-line: #3a3a3a;
  }
  * { box-sizing: border-box; }
  [hidden] { display: none !important; }
  .app { display: grid; gap: var(--pp-gap); padding: var(--pp-gap); max-width: 1800px; margin: 0 auto; }

  /* Top bar */
  .top { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; }
  .top h1 { margin: 0; font-size: 22px; font-weight: 400; }
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 12px; border: 1px solid var(--pp-line); color: var(--pp-muted); white-space: nowrap; }
  .badge.np { border-color: var(--pp-accent); color: var(--pp-accent); }
  .badge.warn { border-color: var(--pp-warn); color: var(--pp-warn); }
  .status { flex: 1 1 200px; min-width: 0; color: var(--pp-muted); font-size: 13px; }
  .status.err { color: var(--pp-error); }
  .actions { display: flex; flex-wrap: wrap; gap: 6px; }

  button, .btn { font: inherit; font-size: 13px; color: var(--pp-text); background: transparent; border: 1px solid var(--pp-line); border-radius: 6px; padding: 6px 12px; cursor: pointer; min-height: 32px; }
  button:hover:not(:disabled) { border-color: var(--pp-accent); }
  button.primary, button[aria-pressed="true"], button.on { background: var(--pp-accent); border-color: var(--pp-accent); color: var(--pp-on-accent); }
  button:disabled { opacity: 0.5; cursor: default; }
  button.link { border: none; padding: 2px 4px; color: var(--pp-accent); min-height: 0; }
  button:focus-visible, select:focus-visible, input:focus-visible, [role="tab"]:focus-visible, summary:focus-visible {
    outline: 2px solid var(--pp-accent); outline-offset: 2px;
  }
  select, input[type="number"], input[type="text"] { font: inherit; font-size: 13px; padding: 4px 6px; border: 1px solid var(--pp-line); border-radius: 4px; background: var(--pp-surface); color: var(--pp-text); min-height: 30px; max-width: 100%; }
  input[type="number"] { width: 72px; }
  input[type="range"] { width: 100%; accent-color: var(--pp-accent); }
  input[type="checkbox"] { accent-color: var(--pp-accent); }

  .banner { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding: 8px 12px; border-radius: var(--pp-radius); background: var(--pp-warn); color: #fff; font-size: 13px; }
  .banner.err { background: var(--pp-error); }
  .banner button { color: #fff; border-color: #fff; }

  /* Tabs */
  .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--pp-line); }
  [role="tab"] { border: none; border-bottom: 2px solid transparent; border-radius: 0; padding: 8px 14px; background: transparent; color: var(--pp-muted); }
  [role="tab"][aria-selected="true"] { color: var(--pp-accent); border-bottom-color: var(--pp-accent); background: transparent; }

  /* Planner layout */
  .planner { display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: var(--pp-gap); align-items: start; }
  :host([narrow]) .planner { grid-template-columns: minmax(0, 1fr); }
  @media (max-width: 1100px) { .planner { grid-template-columns: minmax(0, 1fr); } }
  .stage { display: grid; gap: 8px; min-width: 0; position: sticky; top: var(--pp-gap); }
  :host([narrow]) .stage { position: static; }
  @media (max-width: 1100px) { .stage { position: static; } }
  .toolbar { display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; }
  .seg { display: inline-flex; border: 1px solid var(--pp-line); border-radius: 6px; overflow: hidden; }
  .seg button { border: none; border-radius: 0; min-height: 30px; }
  .seg button + button { border-left: 1px solid var(--pp-line); }
  .views { display: grid; gap: 8px; min-width: 0; }
  .views.split { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  :host([narrow]) .views.split { grid-template-columns: minmax(0, 1fr); }
  @media (max-width: 700px) { .views.split { grid-template-columns: minmax(0, 1fr); } }
  .view { border: 1px solid var(--pp-line); border-radius: var(--pp-radius); background: var(--pp-surface); min-width: 0; height: clamp(320px, calc(100vh - 230px), 860px); overflow: hidden; }
  :host([narrow]) .view { height: clamp(280px, 70vw, 560px); }
  .view > * { width: 100%; height: 100%; display: block; }
  .legend { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 12px; color: var(--pp-muted); }
  .legend i { display: inline-block; width: 14px; height: 10px; border-radius: 2px; margin-right: 4px; vertical-align: -1px; }
  .hint { font-size: 12px; color: var(--pp-muted); }

  /* Side panel */
  .side { display: grid; gap: var(--pp-gap); min-width: 0; }
  .box { border: 1px solid var(--pp-line); border-radius: var(--pp-radius); background: var(--pp-surface); padding: 12px; display: grid; gap: 10px; min-width: 0; }
  h2 { margin: 0; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--pp-muted); font-weight: 500; }
  .row { display: flex; flex-wrap: wrap; gap: 6px 8px; align-items: center; }
  .row > select { flex: 1 1 160px; min-width: 0; }
  .muted { color: var(--pp-muted); font-size: 12px; }
  .warn { color: var(--pp-warn); font-size: 12px; }
  .spill { color: var(--pp-error); }

  .cards { display: grid; gap: 8px; }
  .card { display: grid; grid-template-columns: 12px minmax(0, 1fr) auto; gap: 4px 8px; align-items: center; padding: 8px 10px; border: 1px solid var(--pp-line); border-radius: 6px; cursor: pointer; }
  .card.sel { border-color: var(--pp-accent); box-shadow: inset 3px 0 0 var(--pp-accent); cursor: default; }
  .card.off .namebtn, .card.off .meta { opacity: 0.6; }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .namebtn, .namebtn[aria-pressed="true"] { font-weight: 500; overflow-wrap: anywhere; text-align: left; border: none; padding: 2px 0; min-height: 0; background: transparent; color: var(--pp-text); }
  .meta { grid-column: 2 / 4; color: var(--pp-muted); font-size: 12px; font-variant-numeric: tabular-nums; }
  .fields { grid-column: 1 / 4; display: grid; grid-template-columns: minmax(90px, auto) minmax(0, 1fr) auto; gap: 6px 8px; align-items: center; font-size: 13px; margin-top: 4px; }
  .fields .wide { grid-column: 2 / 4; min-width: 0; }
  .fields .full { grid-column: 1 / 4; }
  .unverified { display: inline-block; font-size: 11px; padding: 1px 6px; border-radius: 4px; border: 1px solid var(--pp-warn); color: var(--pp-warn); margin-top: 2px; }
  label.chk { display: inline-flex; gap: 6px; align-items: center; font-size: 13px; cursor: pointer; }

  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { text-align: left; padding: 4px; border-bottom: 1px solid var(--pp-line); vertical-align: top; }
  th { color: var(--pp-muted); font-weight: 500; font-size: 12px; }
  td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .bar { height: 4px; background: var(--pp-line); border-radius: 2px; overflow: hidden; margin-top: 3px; }
  .bar i { display: block; height: 100%; background: var(--pp-accent); }
  .table-wrap { overflow-x: auto; }
  tr.has-from > th, tr.has-from > td { border-bottom: none; padding-bottom: 0; }
  tr.from > td { font-size: 12px; padding-top: 2px; }
  ul { margin: 0; padding-left: 18px; font-size: 13px; }
  .kv { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 3px 10px; font-size: 13px; }
  .kv .v { text-align: right; font-variant-numeric: tabular-nums; }

  .slider { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: 8px; align-items: center; font-size: 12px; color: var(--pp-muted); }
  progress { width: 100%; height: 6px; accent-color: var(--pp-accent); }
  .results { display: grid; gap: 6px; }
  .result { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 2px 8px; align-items: center; padding: 6px 8px; border: 1px solid var(--pp-line); border-radius: 6px; font-size: 13px; }
  .result .meta { grid-column: 1 / 2; }
  details summary { cursor: pointer; font-size: 13px; }
  details p { margin: 6px 0 0; color: var(--pp-muted); font-size: 12px; }

  .editor { min-height: 70vh; border: 1px solid var(--pp-line); border-radius: var(--pp-radius); background: var(--pp-surface); overflow: hidden; }
  .editor > pp-editor { display: block; width: 100%; min-height: 70vh; }
  .empty { padding: 32px; text-align: center; color: var(--pp-muted); }

  @media (prefers-reduced-motion: no-preference) {
    button, .card { transition: border-color 0.15s ease, background-color 0.15s ease; }
  }
  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; animation: none !important; scroll-behavior: auto !important; }
  }
`;var TM=(i,t)=>i.t.has(`zone.${t}`)?i.t(`zone.${t}`):t;function Hi(i,t,e,{step:n=1,label:s,unit:r=""}){let o=Rr[e];return Y`<label for="f-${e}">${s}${r?Y` <span class="muted">${r}</span>`:ft}</label>
    <span></span>
    <input id="f-${e}" type="number" min=${o[0]} max=${o[1]} step=${n} .value=${xe(String(t[e]??""))}
      @change=${a=>i.patchSensor(t.entity_id,{[e]:a.target.value})} />`}function RM(i,t){let e=i.t,n=Cr(i.profiles),s=zs(i.profiles,t.profile),r=s&&s.mounts||Na,o=i._stats&&i._stats.sensors&&i._stats.sensors[t.entity_id],a=t.active!==!1&&o&&o.glass>au;return Y`<div class="fields" @click=${l=>l.stopPropagation()}>
    <label for="f-profile">${e("sensor.profile")}</label>
    <div class="wide">
      <select id="f-profile" style="width:100%" .value=${xe(t.profile||"custom")} @change=${l=>i.setProfile(t.entity_id,l.target.value)}>
        ${n.map(l=>Y`<option value=${l.id} ?selected=${l.id===t.profile}>${l.id==="custom"?e("profile.custom"):l.name}</option>`)}
      </select>
      ${s&&!s.verified?Y`<span class="unverified" title=${e("profile.unverified_hint")}>${e("profile.unverified")}</span>`:ft}
      ${s&&s.fov_v==null&&t.mount!=="ceiling"?Y`<div class="muted">${e("profile.fov_v_assumed",{fov:i.profiles.default_fov_v||Oa})}</div>`:ft}
    </div>

    <label for="f-mount">${e("sensor.mount")}</label>
    <select id="f-mount" class="wide" .value=${xe(t.mount||"wall")} @change=${l=>i.setMount(t.entity_id,l.target.value)}>
      ${Na.map(l=>Y`<option value=${l} ?selected=${l===t.mount} ?disabled=${!r.includes(l)}>${e(`mount.${l}`)}</option>`)}
    </select>

    <label for="f-phi">${e("sensor.phi")} <span class="muted">°</span></label>
    <input type="range" min="0" max="359" step="1" aria-label=${e("sensor.phi")} .value=${xe(String(Math.round(t.phi||0)))} ?disabled=${t.mount==="ceiling"}
      @input=${l=>i.patchSensor(t.entity_id,{phi:l.target.value},!0)} @change=${l=>i.patchSensor(t.entity_id,{phi:l.target.value})} />
    <input id="f-phi" type="number" min="0" max="359" step="1" .value=${xe(String(Math.round(t.phi||0)))} ?disabled=${t.mount==="ceiling"}
      @change=${l=>i.patchSensor(t.entity_id,{phi:l.target.value})} />

    ${Hi(i,t,"height",{step:.05,label:e("sensor.height"),unit:"m"})}
    ${Hi(i,t,"tilt",{step:1,label:e("sensor.tilt"),unit:"\xB0"})}
    ${Hi(i,t,"fov_h",{step:5,label:e("sensor.fov_h"),unit:"\xB0"})}
    ${Hi(i,t,"fov_v",{step:5,label:e("sensor.fov_v"),unit:"\xB0"})}
    ${Hi(i,t,"reach",{step:.1,label:e("sensor.reach"),unit:"m"})}
    ${Hi(i,t,"x",{step:.01,label:e("sensor.x"),unit:"m"})}
    ${Hi(i,t,"z",{step:.01,label:e("sensor.z"),unit:"m"})}

    ${a?Y`<div class="full warn">${e("sensor.glass_warning")}</div>`:ft}
    ${i._s.source==="own"&&i.isAdmin?Y`<div class="full"><button @click=${()=>i.removeSensor(t.entity_id)}>${e("sensor.remove")}</button></div>`:ft}
  </div>`}function Cm(i,t){let e=i.t,n=i._s,s=i.colors,r=i.hass?ka(i.hass.states,n.sensors):[],o=i._addEntity||r[0]&&r[0].entity_id||"",a=o&&n.deviceProfiles[o]?zs(i.profiles,n.deviceProfiles[o]):null;return Y`<section class="box" aria-labelledby="h-sensors">
    <h2 id="h-sensors">${e("sensors.title")}</h2>
    ${t.length?ft:Y`<p class="muted">${e("sensors.empty")}</p>`}
    <div class="cards">
      ${t.map((l,c)=>{let h=l.entity_id===n.selected,d=i.roomOf(l);return Y`<div class="card ${h?"sel":""} ${l.active===!1?"off":""}" @click=${()=>i.select(l.entity_id)}>
          <span class="dot" style="background:${s[l.entity_id]}"></span>
          <button class="namebtn" aria-pressed=${h?"true":"false"} aria-label=${e("sensors.select",{name:i.name(l.entity_id)})}
            @click=${u=>{u.stopPropagation(),i.select(l.entity_id)}}>${c+1}. ${i.name(l.entity_id)}</button>
          <label class="chk" @click=${u=>u.stopPropagation()}>
            <input type="checkbox" .checked=${xe(l.active!==!1)} @change=${u=>i.patchSensor(l.entity_id,{active:u.target.checked})} />
            ${e("sensor.active")}
          </label>
          <span class="meta">${i.roomName(d)} · ${e(`mount.${l.mount||"wall"}`)} · ${i.fmt.num(l.height,2)} m · ${Math.round(l.phi||0)}°</span>
          ${h?RM(i,l):ft}
        </div>`})}
    </div>
    ${r.length?Y`<div class="row">
          <select aria-label=${e("sensors.add_select")} .value=${xe(o)} @change=${l=>i._addEntity=l.target.value}>
            ${r.map(l=>Y`<option value=${l.entity_id} ?selected=${l.entity_id===o}>${l.name}</option>`)}
          </select>
          <button ?disabled=${!i._model||!i.isAdmin} @click=${()=>i.addSensor()}>${e("sensors.add")}</button>
        </div>
        ${a?Y`<div class="muted">${e("sensors.suggested_profile",{profile:a.name})}</div>`:ft}`:Y`<p class="muted">${e("sensors.no_candidates")}</p>`}
  </section>`}function Pm(i){let t=i.t,e=i.fmt,n=i._stats,s=i._model&&i._model.rooms||[];if(!n||!n.rooms)return Y`<section class="box"><h2>${t("results.title")}</h2><p class="muted">${t("results.none")}</p></section>`;let r=[],o=[];for(let l of Vn(i._s)){let c=n.sensors&&n.sensors[l.entity_id];if(!(!c||l.active===!1)){for(let[h,d]of Object.entries(c.spill||{}))d>=.01&&r.push({s:l,rid:h,share:d});c.glass>au&&o.push(l)}}r.sort((l,c)=>c.share-l.share);let a=[...n.zones||[]].sort((l,c)=>i.roomName(l.room).localeCompare(i.roomName(c.room))||l.name.localeCompare(c.name));return Y`<section class="box" aria-labelledby="h-results">
    <h2 id="h-results">${t("results.title")}</h2>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th scope="col">${t("results.room")}</th>
          ${Fs.map(l=>Y`<th scope="col" class="num" title=${t(`height.h${String(l).replace(".","")}`)}>${e.num(l,1)} m</th>`)}
          <th scope="col" class="num" title=${t("results.misfire_hint")}>${t("results.misfire")}</th>
        </tr></thead>
        <tbody>
          ${s.map(l=>{let c=n.rooms[l.id];if(!c)return ft;let h=(c.own_sensors||[]).length>0,d=Object.entries(c.from||{}).filter(([,u])=>u>=.01).sort((u,f)=>f[1]-u[1]);return Y`<tr class=${d.length?"has-from":""}>
              <th scope="row" style="font-weight:500;color:inherit">${l.name||l.id}
                <div class="bar" aria-hidden="true"><i style="width:${Math.round((h?c.coverage_mean:0)*100)}%"></i></div></th>
              ${h?Fs.map(u=>Y`<td class="num">${e.pct(c.coverage[String(u)])}</td>`):Y`<td class="num muted" colspan="3">${t("results.no_sensor")}</td>`}
              <td class="num ${c.misfire_risk>=.05?"spill":""}">${e.pct(c.misfire_risk)}</td>
            </tr>
            ${d.length?Y`<tr class="from"><td colspan="5" class="spill">${t("results.seen_from")}: ${d.map(([u,f],m)=>Y`${m?", ":""}${i.name(u)} <span style="white-space:nowrap">${e.pct(f)}</span>`)}</td></tr>`:ft}`})}
        </tbody>
      </table>
    </div>
    ${r.length?Y`<ul class="spill" aria-label=${t("results.spill_list")}>${r.map(l=>Y`<li>${t("results.spill_line",{sensor:i.name(l.s.entity_id),share:e.pct(l.share),room:i.roomName(l.rid)})}</li>`)}</ul>`:Y`<p class="muted">${t("results.no_spill")}</p>`}
    ${o.length?Y`<div class="warn" role="note"><strong>${t("results.glass_title")}</strong><ul>${o.map(l=>Y`<li>${t("results.glass_line",{sensor:i.name(l.entity_id)})}</li>`)}</ul></div>`:ft}
    ${a.length?Y`<h2>${t("results.zones")}</h2>
          <div class="kv">${a.map(l=>{let c=n.rooms[l.room]&&(n.rooms[l.room].own_sensors||[]).length;return Y`<span>${TM(i,l.name)} <span class="muted">(${i.roomName(l.room)}, ${e.num(l.height,1)} m)</span></span><span class="v">${c?e.pct(l.share):"\u2013"}</span>`})}</div>`:ft}
  </section>`}function CM(i,t,e,n,s){let r=i.t,o=i.fmt,a=Object.values(e.spill||{}).reduce((l,c)=>l+c,0);return Y`<div class="result">
    <span><strong>${n+1}.</strong> ${r("optimizer.coverage")} ${o.pct(e.coverage)} · ${r("optimizer.spill")} ${o.pct(a)}${e.glass>.05?Y` · <span class="warn">${r("optimizer.glass")}</span>`:ft}</span>
    <button ?disabled=${!s} title=${s?r("optimizer.apply_to",{name:i.name(s)}):r("optimizer.no_target")}
      aria-label=${s?r("optimizer.apply_to",{name:i.name(s)}):r("optimizer.no_target")}
      @click=${()=>i.applyCandidate(s,e)}>${r("optimizer.apply")}</button>
    <span class="meta">${r(`mount.${e.mount||"wall"}`)} · x ${o.num(e.x,2)} · z ${o.num(e.z,2)} · ${o.num(e.height,2)} m${e.mount==="ceiling"?ft:Y` · ${Math.round(e.phi)}° · ${r("sensor.tilt")} ${Math.round(e.tilt)}°`} · ${r("optimizer.score")} ${o.num(e.score,3)}</span>
  </div>`}function Im(i){let t=i.t,e=i._opt,n=i._model&&i._model.rooms||[],s=i.optimizerRoom(),r=i.optimizerProfile(),o=Vn(i._s),a=i.optimizerTarget(s),l=e.results;return Y`<section class="box" aria-labelledby="h-opt">
    <h2 id="h-opt">${t("optimizer.title")}</h2>
    <div class="row">
      <label for="o-room" class="muted">${t("optimizer.room")}</label>
      <select id="o-room" .value=${xe(s||"")} @change=${c=>i.setOpt({roomId:c.target.value,target:null})}>
        ${n.map(c=>Y`<option value=${c.id} ?selected=${c.id===s}>${c.name||c.id}</option>`)}
      </select>
    </div>
    <div class="row">
      <label for="o-profile" class="muted">${t("optimizer.profile")}</label>
      <select id="o-profile" .value=${xe(r)} @change=${c=>i.setOpt({profileId:c.target.value})}>
        ${Cr(i.profiles).map(c=>Y`<option value=${c.id} ?selected=${c.id===r}>${c.id==="custom"?t("profile.custom"):c.name}</option>`)}
      </select>
    </div>
    <div class="row">
      <label for="o-target" class="muted">${t("optimizer.target")}</label>
      <select id="o-target" .value=${xe(a||"-")} @change=${c=>i.setOpt({target:c.target.value})}>
        <option value="-">${t("optimizer.target_none")}</option>
        ${o.map(c=>Y`<option value=${c.entity_id} ?selected=${c.entity_id===a}>${i.name(c.entity_id)}</option>`)}
      </select>
    </div>
    <div>
      <label for="o-weight" class="muted">${t("optimizer.weight",{value:i.fmt.num(i._s.weight,1)})}</label>
      <div class="slider">
        <span>${t("optimizer.weight_coverage")}</span>
        <input id="o-weight" type="range" min="0" max="2" step="0.1" .value=${xe(String(i._s.weight))} @input=${c=>i.setOption("weight",+c.target.value)} />
        <span>${t("optimizer.weight_misfire")}</span>
      </div>
    </div>
    <div class="row">
      <button class="primary" ?disabled=${e.running||!s} @click=${()=>i.runOptimizer(!1)}>${t("optimizer.run_room")}</button>
      <button ?disabled=${e.running||!n.length} @click=${()=>i.runOptimizer(!0)}>${t("optimizer.run_all")}</button>
      ${e.running?Y`<button @click=${()=>i.cancelOptimizer()}>${t("action.cancel")}</button>`:ft}
    </div>
    ${e.running?Y`<div role="status" aria-live="polite">
          <progress max="1" .value=${e.progress} aria-label=${t("optimizer.progress")}></progress>
          <span class="muted">${t("optimizer.running",{room:i.roomName(e.currentRoom),pct:i.fmt.pct(e.progress)})}</span>
        </div>`:ft}
    ${e.error?Y`<p class="spill" role="alert">${t("optimizer.error",{detail:e.error})}</p>`:ft}
    ${l?Y`<div class="results">
          ${Object.entries(l).map(([c,h],d)=>{let u=e.scope==="all"?za(i._s,c,f=>i.roomOf(f)):a;return Array.isArray(h)?Y`<details ?open=${e.scope!=="all"||d===0}>
              <summary>${i.roomName(c)}${h[0]?Y` · ${t("optimizer.coverage")} ${i.fmt.pct(h[0].coverage)}`:ft}</summary>
              <div class="results">
                ${h.length?h.map((f,m)=>CM(i,c,f,m,u)):Y`<p class="muted">${t("optimizer.no_result")}</p>`}
              </div>
            </details>`:Y`<p class="spill">${i.roomName(c)}: ${t("optimizer.error",{detail:h.error})}</p>`})}
        </div>`:Y`<p class="muted">${t("optimizer.intro")}</p>`}
  </section>`}function Dm(i){let t=i.t,e=i._s,n=Bs(e),s=(n&&n.openings||[]).some(r=>r.type!=="window"&&r.contact);return Y`<section class="box" aria-labelledby="h-assume">
    <h2 id="h-assume">${t("assume.title")}</h2>
    <div class="row">
      <span class="muted">${t("assume.doors")}</span>
      <div class="seg" role="group" aria-label=${t("assume.doors")}>
        ${sm.map(r=>Y`<button aria-pressed=${e.doorsMode===r?"true":"false"} ?disabled=${r==="live"&&!s}
          title=${r==="live"&&!s?t("assume.doors_live_none"):""} @click=${()=>i.setOption("doorsMode",r)}>${t(`assume.doors_${r}`)}</button>`)}
      </div>
    </div>
    <div class="kv"><label for="a-thin">${t("assume.thin")}</label><span class="v">${e.thinDb} dB</span></div>
    <input id="a-thin" type="range" min="4" max="18" step="1" .value=${xe(String(e.thinDb))}
      @input=${r=>i.setOption("thinDb",+r.target.value,!0)} @change=${r=>i.setOption("thinDb",+r.target.value)} />
    <label class="chk"><input type="checkbox" .checked=${xe(e.snap)} @change=${r=>i.setOption("snap",r.target.checked)} /> ${t("assume.snap")}</label>
    <label class="chk"><input type="checkbox" .checked=${xe(e.cones)} @change=${r=>i.setOption("cones",r.target.checked)} /> ${t("assume.cones")}</label>
    <details><summary>${t("assume.how_title")}</summary><p>${t("assume.how_text")}</p></details>
  </section>`}var PM=.2,fu=class extends He{static properties={hass:{attribute:!1},narrow:{type:Boolean,reflect:!0},route:{attribute:!1},panel:{attribute:!1},_s:{state:!0},_eval:{state:!0},_stats:{state:!0},_model:{state:!0},_status:{state:!0},_busy:{state:!0},_opt:{state:!0},_addEntity:{state:!0}};static styles=Rm;constructor(){super(),this._s=am(),this._eval=null,this._stats=null,this._model=null,this._status=null,this._busy=!1,this._opt={roomId:null,profileId:null,target:null,running:!1,progress:0,results:null,error:null,scope:null},this._addEntity="",this._client=null,this._unsub=null,this._evalFast=!1,this._contactSig="",this._runner=new Ha({createWorker:()=>new Worker(Tm(import.meta.url),{type:"module"}),fallback:t=>ml(this._modelFor(t.plan,t.floorId),t.roomId,t.profileId,t.opts,t.weight,t.profiles)})}connectedCallback(){super.connectedCallback(),this._client&&!this._unsub&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe(),this._runner.cancel(),cancelAnimationFrame(this._evalRaf)}willUpdate(t){if(t.has("hass")&&this.hass){(!this._t||this._t.lang!==$a(this.hass.language).lang)&&(this._t=$a(this.hass.language),this._f=du(this.hass.language));let e=!!(this.hass.themes&&this.hass.themes.darkMode);if(e!==this._dark&&(this._dark=e,this.toggleAttribute("dark",e)),(!this._client||this._client.connection!==this.hass.connection)&&(this._client=new Ba(this.hass.connection),this._unsubscribe(),this._load(),this._subscribe(),this._loadDeviceProfiles()),this._s.doorsMode==="live"){let n=this._contactSignature();n!==this._contactSig&&(this._contactSig=n,this._scheduleEval(!1))}}}get t(){return this._t||(this._t=$a("en"))}get fmt(){return this._f||(this._f=du("en"))}async _load(){if(this._client){this._busy=!0,this._status={key:"status.loading"};try{let t=await this._client.get();this._setState(lm(this._s,t)),this._status=null;let e=t.neonplan&&(t.neonplan.error||t.neonplan.incompatible&&"neonplan_incompatible");e&&(this._status={key:Hn({code:e,message:e}).i18nKey,error:!0,detail:e})}catch(t){let e=Hn(t);this._s={...this._s,loading:!1,error:e},this._status={key:e.i18nKey,error:!0,detail:e.message}}finally{this._busy=!1}}}async _loadDeviceProfiles(){try{let t=await this._client.deviceProfiles();this._s={...this._s,deviceProfiles:t}}catch{}}async _subscribe(){if(!(!this._client||this._unsub))try{this._unsub=await this._client.subscribe(t=>{let{state:e,reload:n}=cm(this._s,t.revision);this._s=e,n&&this._load()})}catch{}}_unsubscribe(){if(this._unsub)try{this._unsub()}catch{}this._unsub=null}_setState(t,{fast:e=!1}={}){let n=this._s;this._s=t,(t.editPlan!==n.editPlan||t.floorId!==n.floorId||!this._model)&&this._rebuildModel(),t.profiles!==n.profiles&&(this._profilesDict=null),t.doorsMode==="live"&&n.doorsMode!=="live"&&(this._contactSig=this._contactSignature()),this._scheduleEval(e)}get profiles(){return this._profilesDict||(this._profilesDict=Pr(this._s.profiles||Tn)),this._profilesDict}_modelFor(t,e){return t===this._s.editPlan&&e===this._s.floorId&&this._model?this._model:Gr(t,e)}_rebuildModel(){let t=this._s.editPlan,e=this._s.floorId;if(!t||!e){this._model=null;return}try{this._model=Gr(t,e),this._modelError=null}catch(n){this._model=null,this._modelError=n,this._status={key:"error.model",error:!0,detail:n.message}}}_resolved(t){return t.map(e=>{try{return Yi(e,this.profiles)}catch{return e}})}_scheduleEval(t){this._evalFast=t,cancelAnimationFrame(this._evalRaf),clearTimeout(this._evalTimer);let e=()=>this._runEval(t);t?this._evalRaf=requestAnimationFrame(e):this._evalTimer=setTimeout(e,0)}_runEval(t){if(!this._model){this._eval=null,this._stats=null;return}let e=cu(this._s,this.hass&&this.hass.states,{fast:t});try{let n=pl(this._model,this._resolved(Vn(this._s)),e);this._eval={...n,cell:e.cell,fast:t},t||(this._stats=this._eval)}catch(n){this._eval=null,this._status={key:"error.model",error:!0,detail:n.message}}}_contactSignature(){let t=Bs(this._s),e=this.hass&&this.hass.states||{};return(t&&t.openings||[]).filter(n=>n.contact).map(n=>`${n.id}:${(e[n.contact]||{}).state}`).join("|")}name(t){let e=this.hass&&this.hass.states[t];return e&&e.attributes&&e.attributes.friendly_name||t}roomName(t){let e=this._model&&(this._model.rooms||[]).find(n=>n.id===t);return e?e.name||e.id:this.t("room.outside")}roomOf(t){return tu(this._model,t.x,t.z)}roomHeight(t){let e=this._model&&(this._model.rooms||[]).find(s=>s.id===t),n=Bs(this._s);return e&&e.height||n&&n.height||2.5}get colors(){return im(this._s.sensors,this._dark)}get isAdmin(){return!this.hass||!this.hass.user||this.hass.user.is_admin!==!1}_selectId(t){return typeof t=="string"?t:t&&(t.entityId||t.entity_id)||null}select(t){!t||t===this._s.selected||(this._s={...this._s,selected:t})}patchSensor(t,e,n=!1){this._setState(Ir(this._s,t,e),{fast:n})}setProfile(t,e){this._setState(hm(this._s,t,e))}setMount(t,e){let n=$n(this._s,t);this._setState(um(this._s,t,e,n?this.roomHeight(this.roomOf(n)):void 0))}removeSensor(t){this._setState(pm(this._s,t))}setOption(t,e,n=!1){let s={...this._s,[t]:e};t==="thinDb"&&(s.thinTouched=!0),["height","doorsMode","thinDb"].includes(t)?this._setState(s,{fast:n}):this._s=s}addSensor(){let t=this._addEntity||(ka(this.hass.states,this._s.sensors)[0]||{}).entity_id;if(!t||!this._model)return;let e=this._model.rooms||[],n=new Set(Vn(this._s).map(a=>this.roomOf(a))),s=e.find(a=>!n.has(a.id))||e[0],r=s?Da(s.points):{x:0,z:0},o=dm(t,{floorId:this._s.floorId,x:r.x,z:r.z,profileId:this._s.deviceProfiles[t]||"custom",profiles:this.profiles});this._addEntity="",this._setState(fm(this._s,o))}async save(){if(this._client){this._busy=!0,this._status={key:"status.saving"};try{this._s.planDirty&&Fa(this._s)&&await this._client.savePlan(this._s.editPlan);let t;if(this._s.dirty){let e=await this._client.saveSensors(xm(this._s));t=e&&e.revision,this._s=_m(this._s,t)}await this._load(),this._status={key:"status.saved"}}catch(t){let e=Hn(t);this._status={key:e.i18nKey,error:!0,detail:e.message}}finally{this._busy=!1}}}reset(){if(this._s.remoteChanged){this._load();return}this._setState(mm(this._s)),this._status=null}async exportPlan(){try{let t=await this._client.exportPlan(),e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(e),n.download="presence-planner-neonplan-import.json",document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3),this._status={key:"status.exported"}}catch(t){let e=Hn(t);this._status={key:e.i18nKey,error:!0,detail:e.message}}}_pickImport(){this.renderRoot.querySelector("#import-file").click()}async _importFile(t){let e=t.target.files&&t.target.files[0];if(t.target.value="",!e)return;let n;try{n=JSON.parse(await e.text())}catch{this._status={key:"error.invalid_json",error:!0};return}if(!((this._s.dirty||this._s.planDirty||this._s.plan)&&!window.confirm(this.t("import.confirm")))){this._busy=!0;try{await this._client.importPlan(n),await this._load(),this._status={key:"status.imported"}}catch(s){let r=Hn(s);this._status={key:r.i18nKey,error:!0,detail:r.message}}finally{this._busy=!1}}}async linkNeonplan(){try{await this._client.linkNeonplan(),this._status={key:"status.linked"},await this._load()}catch(t){let e=Hn(t);this._status={key:e.i18nKey,error:!0,detail:e.message}}}setOpt(t){this._opt={...this._opt,...t}}optimizerRoom(){let t=this._model&&this._model.rooms||[];if(t.some(s=>s.id===this._opt.roomId))return this._opt.roomId;let e=$n(this._s,this._s.selected);return(e?this.roomOf(e):null)||t[0]&&t[0].id||null}optimizerProfile(){if(this._opt.profileId)return this._opt.profileId;let t=$n(this._s,this._s.selected);return t&&t.profile||"aqara_fp300"}optimizerTarget(t){if(this._opt.target&&this._opt.scope!=="all"){if(this._opt.target==="-")return null;if($n(this._s,this._opt.target))return this._opt.target}return za(this._s,t,e=>this.roomOf(e))}async runOptimizer(t){if(!this._model||this._opt.running)return;let e=t?(this._model.rooms||[]).map(s=>s.id):[this.optimizerRoom()].filter(Boolean);if(!e.length)return;let n={...cu(this._s,this.hass&&this.hass.states,{grid:!1}),cell:PM};this.setOpt({running:!0,progress:0,results:null,error:null,scope:t?"all":"room",currentRoom:e[0]});try{let s=await this._runner.run({plan:this._s.editPlan,floorId:this._s.floorId,roomIds:e,profileId:this.optimizerProfile(),opts:n,weight:this._s.weight,profiles:this.profiles},(r,o)=>this.setOpt({progress:r,currentRoom:o}));this.setOpt({running:!1,results:s,progress:1})}catch(s){this.setOpt({running:!1,error:s.message||String(s)})}}cancelOptimizer(){this._runner.cancel(),this.setOpt({running:!1,progress:0})}applyCandidate(t,e){t&&this._setState({...ym(this._s,t,e),selected:t})}render(){let t=this.t,e=this._s;if(!this.hass)return Y``;let n=e.plan&&e.plan.floors||[],s=e.dirty||e.planDirty;return Y`<div class="app">
      ${this._renderTop(n,s)}
      ${e.remoteChanged?Y`<div class="banner" role="alert"><span>${t("banner.remote_changed")}</span><button @click=${()=>this._load()}>${t("action.reload")}</button></div>`:ft}
      ${this.isAdmin?ft:Y`<div class="banner" role="note"><span>${t("banner.read_only")}</span></div>`}
      ${e.loading&&!e.plan?Y`<div class="empty">${t("status.loading")}</div>`:e.error&&!e.plan?this._renderError():e.plan?this._renderBody():this._renderNoPlan()}
    </div>`}_renderTop(t,e){let n=this.t,s=this._s,r=this._status,o=r?n(r.key,{detail:r.detail||""})+(r.error&&r.detail&&!n(r.key).includes("{detail}")?` (${r.detail})`:""):s.plan?[s.revision!==null?n("status.revision",{revision:s.revision}):null,n("status.sensors",{count:Vn(s).length}),e?n("status.unsaved"):null].filter(Boolean).join(" \xB7 "):"";return Y`<header class="top">
      <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
      <h1>${n("title")}</h1>
      ${s.source?Y`<span class="badge ${s.source==="neonplan"?"np":""}">${s.source==="neonplan"?n("source.neonplan"):n("source.own")}</span>`:ft}
      ${t.length>1?Y`<select aria-label=${n("floor.select")} .value=${s.floorId||""} @change=${a=>this._setState({...s,floorId:a.target.value,selected:null})}>
            ${t.map(a=>Y`<option value=${a.id} ?selected=${a.id===s.floorId}>${a.name||a.id}</option>`)}
          </select>`:ft}
      <span class="status ${r&&r.error?"err":""}" role="status" aria-live="polite">${o}</span>
      <div class="actions">
        <button class="primary" ?disabled=${!e||this._busy||!this.isAdmin} @click=${()=>this.save()}>${n("action.save")}</button>
        <button ?disabled=${!e&&!s.remoteChanged||this._busy} @click=${()=>this.reset()}>${n("action.reset")}</button>
        <button ?disabled=${!s.plan||this._busy} @click=${()=>this.exportPlan()}>${n("action.export")}</button>
        <button ?disabled=${this._busy||!this.isAdmin} @click=${()=>this._pickImport()}>${n("action.import")}</button>
        <input id="import-file" type="file" accept=".json,application/json" hidden @change=${a=>this._importFile(a)} />
        ${bm(s)?Y`<button ?disabled=${this._busy||!this.isAdmin} @click=${()=>this.linkNeonplan()}>${n("action.link_neonplan")}</button>`:ft}
      </div>
    </header>`}_renderError(){let t=this.t;return Y`<div class="empty"><p>${t(this._s.error.i18nKey||"error.generic",{detail:this._s.error.message})}</p><button @click=${()=>this._load()}>${t("action.reload")}</button></div>`}_renderNoPlan(){let t=this.t;return Y`<div class="empty">
      <p>${t("empty.no_plan")}</p>
      <div class="row" style="justify-content:center">
        <button @click=${()=>this._pickImport()} ?disabled=${!this.isAdmin}>${t("action.import")}</button>
        ${Fa(this._s)?Y`<button class="primary" @click=${()=>this._startOwnPlan()}>${t("empty.start_editor")}</button>`:ft}
      </div>
    </div>`}_startOwnPlan(){let t={version:1,settings:{wall_exterior:.24,wall_interior:.12},floors:[{id:"f1",name:this.t("floor.default_name"),ha_floor:null,elevation:0,height:2.5,rooms:[],openings:[],walls:[],furniture:[],outdoor:[],background:null}]};this._setState({...this._s,plan:t,editPlan:t,floorId:"f1",planDirty:!0,tab:"editor"})}_renderBody(){let t=this.t,e=this._s,n=Fa(e),s=n?e.tab:"planner";return Y`
      <nav class="tabs" role="tablist" aria-label=${t("tabs.label")} @keydown=${r=>this._tabKey(r,n)}>
        <button role="tab" id="tab-planner" aria-controls="tp-planner" aria-selected=${s==="planner"?"true":"false"} tabindex=${s==="planner"?0:-1} @click=${()=>this.setOption("tab","planner")}>${t("tabs.planner")}</button>
        ${n?Y`<button role="tab" id="tab-editor" aria-controls="tp-editor" aria-selected=${s==="editor"?"true":"false"} tabindex=${s==="editor"?0:-1} @click=${()=>this.setOption("tab","editor")}>${t("tabs.editor")}</button>`:ft}
      </nav>
      ${s==="editor"?this._renderEditor():this._renderPlanner()}`}_tabKey(t,e){if(!e||t.key!=="ArrowLeft"&&t.key!=="ArrowRight")return;let n=this._s.tab==="planner"?"editor":"planner";this.setOption("tab",n),this.updateComplete.then(()=>{let s=this.renderRoot.querySelector(`#tab-${n}`);s&&s.focus()})}_renderEditor(){return Y`<section id="tp-editor" role="tabpanel" aria-labelledby="tab-editor" class="editor">
      <pp-editor .plan=${this._s.editPlan} .floorId=${this._s.floorId} .hass=${this.hass} .dark=${!!this._dark}
        @plan-changed=${t=>this._onPlanChanged(t)}></pp-editor>
    </section>`}_onPlanChanged(t){let e=t.detail,n=e&&e.plan?e.plan:e;if(!n||!n.floors)return;let s=this._s.floorId;e&&e.floorId&&(s=e.floorId),n.floors.some(r=>r.id===s)||(s=n.floors[0]?n.floors[0].id:null),this._setState({...gm(this._s,n),floorId:s})}_renderPlanner(){let t=this.t,e=this._s,n=Vn(e),s=this._resolved(n),r=this.colors,o=Object.fromEntries(n.map(c=>[c.entity_id,this.name(c.entity_id)])),a=e.view,l=ru[this._dark?"dark":"light"];return Y`<div id="tp-planner" role="tabpanel" aria-labelledby="tab-planner" class="planner">
      <section class="stage" aria-label=${t("stage.label")}>
        <div class="toolbar">
          <div class="seg" role="group" aria-label=${t("view.label")}>
            ${rm.map(c=>Y`<button aria-pressed=${a===c?"true":"false"} @click=${()=>this.setOption("view",c)}>${t(`view.${c}`)}</button>`)}
          </div>
          <div class="seg" role="group" aria-label=${t("height.label")}>
            ${Fs.map(c=>Y`<button aria-pressed=${e.height===c?"true":"false"} title=${t(`height.h${String(c).replace(".","")}`)} @click=${()=>this.setOption("height",c)}>${t(`height.short${String(c).replace(".","")}`)}</button>`)}
          </div>
          <div class="legend">
            <span><i style="background:${l[0]};opacity:.6"></i>${t("legend.own")}</span>
            <span><i style="background:var(--error-color, #db4437)"></i>${t("legend.spill")}</span>
          </div>
        </div>
        ${this._model?Y`<div class="views ${a}">
              ${a!=="3d"?Y`<div class="view"><pp-map2d .model=${this._model} .sensors=${s} .evaluation=${this._eval} .colors=${r} .names=${o}
                    .height=${e.height} .cell=${this._eval&&this._eval.cell||.1} .selected=${e.selected} ?dark=${!!this._dark} ?cones=${e.cones} ?snap=${e.snap}
                    ?readonly=${!1} .t=${t}
                    @select=${c=>this.select(this._selectId(c.detail))}
                    @sensor-move=${c=>this.patchSensor(c.detail.entity_id,c.detail.patch,!c.detail.final)}></pp-map2d></div>`:ft}
              ${a!=="2d"?Y`<div class="view"><pp-view3d .model=${this._model} .sensors=${s} .evaluation=${this._eval} .height=${e.height}
                    .selected=${e.selected} .dark=${!!this._dark} .colors=${r} .labels=${{reset:t("view3d.reset"),top:t("view3d.top")}}
                    @select=${c=>this.select(this._selectId(c.detail))}></pp-view3d></div>`:ft}
            </div>
            <p class="hint">${t("map.help")}</p>`:Y`<div class="empty">${this._modelError?t("error.model",{detail:this._modelError.message}):t("empty.no_floor")}</div>`}
      </section>
      <aside class="side">
        ${Cm(this,n)}
        ${Pm(this)}
        ${Im(this)}
        ${Dm(this)}
      </aside>
    </div>`}};customElements.get("presence-planner-panel")||customElements.define("presence-planner-panel",fu);export{fu as PresencePlannerPanel};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
