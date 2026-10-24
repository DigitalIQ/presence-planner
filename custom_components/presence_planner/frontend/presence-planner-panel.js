var Kr=globalThis,Jr=Kr.ShadowRoot&&(Kr.ShadyCSS===void 0||Kr.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,gl=Symbol(),Xu=new WeakMap,Js=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==gl)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Jr&&t===void 0){let n=e!==void 0&&e.length===1;n&&(t=Xu.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Xu.set(e,t))}return t}toString(){return this.cssText}},qu=i=>new Js(typeof i=="string"?i:i+"",void 0,gl),Pn=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((n,s,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[r+1],i[0]);return new Js(e,i,gl)},Yu=(i,t)=>{if(Jr)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let n=document.createElement("style"),s=Kr.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}},_l=Jr?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let n of t.cssRules)e+=n.cssText;return qu(e)})(i):i;var{is:wg,defineProperty:Mg,getOwnPropertyDescriptor:Sg,getOwnPropertyNames:Eg,getOwnPropertySymbols:Ag,getPrototypeOf:Tg}=Object,jr=globalThis,Zu=jr.trustedTypes,Rg=Zu?Zu.emptyScript:"",Cg=jr.reactiveElementPolyfillSupport,js=(i,t)=>i,xl={toAttribute(i,t){switch(t){case Boolean:i=i?Rg:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Ju=(i,t)=>!wg(i,t),Ku={attribute:!0,type:String,converter:xl,reflect:!1,useDefault:!1,hasChanged:Ju};Symbol.metadata??=Symbol("metadata"),jr.litPropertyMetadata??=new WeakMap;var In=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ku){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let n=Symbol(),s=this.getPropertyDescriptor(t,n,e);s!==void 0&&Mg(this.prototype,t,s)}}static getPropertyDescriptor(t,e,n){let{get:s,set:r}=Sg(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ku}static _$Ei(){if(this.hasOwnProperty(js("elementProperties")))return;let t=Tg(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(js("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(js("properties"))){let e=this.properties,n=[...Eg(e),...Ag(e)];for(let s of n)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[n,s]of e)this.elementProperties.set(n,s)}this._$Eh=new Map;for(let[e,n]of this.elementProperties){let s=this._$Eu(e,n);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let s of n)e.unshift(_l(s))}else t!==void 0&&e.push(_l(t));return e}static _$Eu(t,e){let n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Yu(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){let n=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,n);if(s!==void 0&&n.reflect===!0){let r=(n.converter?.toAttribute!==void 0?n.converter:xl).toAttribute(e,n.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let n=this.constructor,s=n._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=n.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:xl;this._$Em=s;let a=o.fromAttribute(e,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,n,s=!1,r){if(t!==void 0){let o=this.constructor;if(s===!1&&(r=this[t]),n??=o.getPropertyOptions(t),!((n.hasChanged??Ju)(r,e)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,n))))return;this.C(t,e,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:s,wrapped:r},o){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[s,r]of n){let{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};In.elementStyles=[],In.shadowRootOptions={mode:"open"},In[js("elementProperties")]=new Map,In[js("finalized")]=new Map,Cg?.({ReactiveElement:In}),(jr.reactiveElementVersions??=[]).push("2.1.2");var yl=globalThis,ju=i=>i,Qr=yl.trustedTypes,Qu=Qr?Qr.createPolicy("lit-html",{createHTML:i=>i}):void 0,bl="$lit$",Ln=`lit$${Math.random().toFixed(9).slice(2)}$`,wl="?"+Ln,Pg=`<${wl}>`,Mi=document,tr=()=>Mi.createComment(""),er=i=>i===null||typeof i!="object"&&typeof i!="function",Ml=Array.isArray,rd=i=>Ml(i)||typeof i?.[Symbol.iterator]=="function",vl=`[ 	
\f\r]`,Qs=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,td=/-->/g,ed=/>/g,bi=RegExp(`>|${vl}(?:([^\\s"'>=/]+)(${vl}*=${vl}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),nd=/'/g,id=/"/g,od=/^(?:script|style|textarea|title)$/i,Sl=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),Y=Sl(1),Wt=Sl(2),CM=Sl(3),nn=Symbol.for("lit-noChange"),mt=Symbol.for("lit-nothing"),sd=new WeakMap,wi=Mi.createTreeWalker(Mi,129);function ad(i,t){if(!Ml(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qu!==void 0?Qu.createHTML(t):t}var ld=(i,t)=>{let e=i.length-1,n=[],s,r=t===2?"<svg>":t===3?"<math>":"",o=Qs;for(let a=0;a<e;a++){let l=i[a],c,h,d=-1,u=0;for(;u<l.length&&(o.lastIndex=u,h=o.exec(l),h!==null);)u=o.lastIndex,o===Qs?h[1]==="!--"?o=td:h[1]!==void 0?o=ed:h[2]!==void 0?(od.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=bi):h[3]!==void 0&&(o=bi):o===bi?h[0]===">"?(o=s??Qs,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?bi:h[3]==='"'?id:nd):o===id||o===nd?o=bi:o===td||o===ed?o=Qs:(o=bi,s=void 0);let f=o===bi&&i[a+1].startsWith("/>")?" ":"";r+=o===Qs?l+Pg:d>=0?(n.push(c),l.slice(0,d)+bl+l.slice(d)+Ln+f):l+Ln+(d===-2?a:f)}return[ad(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},nr=class i{constructor({strings:t,_$litType$:e},n){let s;this.parts=[];let r=0,o=0,a=t.length-1,l=this.parts,[c,h]=ld(t,e);if(this.el=i.createElement(c,n),wi.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=wi.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(bl)){let u=h[o++],f=s.getAttribute(d).split(Ln),g=/([.?@])?(.*)/.exec(u);l.push({type:1,index:r,name:g[2],strings:f,ctor:g[1]==="."?eo:g[1]==="?"?no:g[1]==="@"?io:Ei}),s.removeAttribute(d)}else d.startsWith(Ln)&&(l.push({type:6,index:r}),s.removeAttribute(d));if(od.test(s.tagName)){let d=s.textContent.split(Ln),u=d.length-1;if(u>0){s.textContent=Qr?Qr.emptyScript:"";for(let f=0;f<u;f++)s.append(d[f],tr()),wi.nextNode(),l.push({type:2,index:++r});s.append(d[u],tr())}}}else if(s.nodeType===8)if(s.data===wl)l.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(Ln,d+1))!==-1;)l.push({type:7,index:r}),d+=Ln.length-1}r++}}static createElement(t,e){let n=Mi.createElement("template");return n.innerHTML=t,n}};function Si(i,t,e=i,n){if(t===nn)return t;let s=n!==void 0?e._$Co?.[n]:e._$Cl,r=er(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(i),s._$AT(i,e,n)),n!==void 0?(e._$Co??=[])[n]=s:e._$Cl=s),s!==void 0&&(t=Si(i,s._$AS(i,t.values),s,n)),t}var to=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:n}=this._$AD,s=(t?.creationScope??Mi).importNode(e,!0);wi.currentNode=s;let r=wi.nextNode(),o=0,a=0,l=n[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new Ji(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new so(r,this,t)),this._$AV.push(c),l=n[++a]}o!==l?.index&&(r=wi.nextNode(),o++)}return wi.currentNode=Mi,s}p(t){let e=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}},Ji=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,s){this.type=2,this._$AH=mt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Si(this,t,e),er(t)?t===mt||t==null||t===""?(this._$AH!==mt&&this._$AR(),this._$AH=mt):t!==this._$AH&&t!==nn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):rd(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==mt&&er(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mi.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=nr.createElement(ad(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new to(s,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=sd.get(t.strings);return e===void 0&&sd.set(t.strings,e=new nr(t)),e}k(t){Ml(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,n,s=0;for(let r of t)s===e.length?e.push(n=new i(this.O(tr()),this.O(tr()),this,this.options)):n=e[s],n._$AI(r),s++;s<e.length&&(this._$AR(n&&n._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let n=ju(t).nextSibling;ju(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ei=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,s,r){this.type=1,this._$AH=mt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=mt}_$AI(t,e=this,n,s){let r=this.strings,o=!1;if(r===void 0)t=Si(this,t,e,0),o=!er(t)||t!==this._$AH&&t!==nn,o&&(this._$AH=t);else{let a=t,l,c;for(t=r[0],l=0;l<r.length-1;l++)c=Si(this,a[n+l],e,l),c===nn&&(c=this._$AH[l]),o||=!er(c)||c!==this._$AH[l],c===mt?t=mt:t!==mt&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!s&&this.j(t)}j(t){t===mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},eo=class extends Ei{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===mt?void 0:t}},no=class extends Ei{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==mt)}},io=class extends Ei{constructor(t,e,n,s,r){super(t,e,n,s,r),this.type=5}_$AI(t,e=this){if((t=Si(this,t,e,0)??mt)===nn)return;let n=this._$AH,s=t===mt&&n!==mt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==mt&&(n===mt||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},so=class{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Si(this,t)}},cd={M:bl,P:Ln,A:wl,C:1,L:ld,R:to,D:rd,V:Si,I:Ji,H:Ei,N:no,U:io,B:eo,F:so},Ig=yl.litHtmlPolyfillSupport;Ig?.(nr,Ji),(yl.litHtmlVersions??=[]).push("3.3.3");var hd=(i,t,e)=>{let n=e?.renderBefore??t,s=n._$litPart$;if(s===void 0){let r=e?.renderBefore??null;n._$litPart$=s=new Ji(t.insertBefore(tr(),r),r,void 0,e??{})}return s._$AI(i),s};var El=globalThis,Ye=class extends In{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=hd(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return nn}};Ye._$litElement$=!0,Ye.finalized=!0,El.litElementHydrateSupport?.({LitElement:Ye});var Lg=El.litElementPolyfillSupport;Lg?.({LitElement:Ye});(El.litElementVersions??=[]).push("4.2.2");var Dn={version:1,default_fov_v:90,profiles:[{id:"aqara_fp300",name:"Aqara Presence Multi-Sensor FP300",manufacturer:"Aqara",match:["fp300","ps-s04d","ps-s04e","presence multi-sensor"],tech:"hybrid",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:null,verified:!0,source:"https://www.aqara.com/en/product/presence-multi-sensor-fp300/",note:"Manual: side mounting 1.4\u20131.8 m, about 2 m tilted down for larger areas. Detection range limit only in Zigbee mode."},{id:"aqara_fp400",name:"Aqara Spatial Multi Sensor FP400",manufacturer:"Aqara",match:["fp400","ps-s05d","spatial multi sensor"],tech:"mmwave",fov_h:120,fov_v:null,reach:10,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:{fov:120,reach:4},verified:!0,source:"https://www.aqara.com/en/product/spatial-multi-sensor-fp400/",note:"Side mounting covers about 10 m deep \xD7 8 m wide, corner 7 \xD7 7 m; ceiling 3\u20134 m recommended."},{id:"aqara_p1",name:"Aqara Motion Sensor P1",manufacturer:"Aqara",match:["motion sensor p1","rtcgq14lm","ms-s02"],tech:"pir",fov_h:150,fov_v:null,reach:7,reach_static:0,mounts:["wall","corner","ceiling"],ceiling:null,verified:!0,source:"https://www.aqara.com/en/product/motion-sensor-p1/",note:"170\xB0 up to 2 m, 150\xB0 up to 7 m. PIR: detects motion only, no stationary presence."},{id:"everything_presence_one",name:"Everything Presence One",manufacturer:"Everything Smart Technology",match:["everything presence one","everything-presence-one"],tech:"hybrid",fov_h:100,fov_v:40,reach:25,reach_static:null,mounts:["wall","corner"],ceiling:null,verified:!0,source:"https://shop.everythingsmart.io/products/everything-presence-one-kit",note:"mmWave 100\xB0 \xD7 40\xB0, 25 m; PIR 12 m."},{id:"switchbot_presence",name:"SwitchBot Presence Sensor",manufacturer:"SwitchBot",match:["switchbot presence"],tech:"mmwave",fov_h:120,fov_v:null,reach:8,reach_static:5,mounts:["wall","corner"],ceiling:null,verified:!0,source:"https://www.switch-bot.com/products/switchbot-presence-sensor",note:"8 m for moving, 5 m for stationary people."},{id:"aqara_fp2",name:"Aqara Presence Sensor FP2",manufacturer:"Aqara",match:["fp2","ps-s02"],tech:"mmwave",fov_h:120,fov_v:null,reach:8,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:{fov:120,reach:2},verified:!1,source:"https://www.123led.nl/pdf/LAQ00045.pdf",note:"Values from a copy of the manual hosted by a retailer, not from aqara.com."},{id:"aqara_fp1e",name:"Aqara Presence Sensor FP1E",manufacturer:"Aqara",match:["fp1e","ps-s03"],tech:"mmwave",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:{fov:120,reach:4},verified:!1,source:"https://123led.nl/pdf/LAQ00070_handleiding.pdf",note:"Values from a copy of the manual hosted by a retailer, not from aqara.com."},{id:"aqara_p2",name:"Aqara Motion and Light Sensor P2",manufacturer:"Aqara",match:["motion and light sensor p2","ml-s02"],tech:"pir",fov_h:150,fov_v:null,reach:7,reach_static:0,mounts:["wall","corner","ceiling"],ceiling:null,verified:!1,source:"https://www.domadoo.fr/en/smart-home-security-alarm/7048-aqara-matter-over-thread-aqara-motion-and-light-sensor-p2-6970504219656.html",note:"Retailer values (angle given as 120\xB0 or 170\xB0). PIR: motion only."},{id:"everything_presence_lite",name:"Everything Presence Lite",manufacturer:"Everything Smart Technology",match:["everything presence lite","everything-presence-lite"],tech:"mmwave",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner"],ceiling:null,verified:!1,source:"https://devices.esphome.io/devices/Everything-Presence-Lite",note:"Range from the vendor page, field of view from the LD2450 radar spec."},{id:"hue_motion_indoor",name:"Philips Hue Motion Sensor (indoor)",manufacturer:"Signify",match:["hue motion sensor","sml001","sml003"],tech:"pir",fov_h:100,fov_v:null,reach:5,reach_static:0,mounts:["wall","corner","ceiling"],ceiling:null,verified:!1,source:"https://www.philips-hue.com/en-us/p/hue-motion-sensor/046677570972",note:"Retailer values (100\xB0 or 120\xB0). PIR: motion only."},{id:"apollo_msr2",name:"Apollo MSR-2",manufacturer:"Apollo Automation",match:["msr-2","msr2"],tech:"mmwave",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:null,verified:!1,source:"https://wiki.apolloautomation.com/products/general/mmwave-presence-sensor-comparison/",note:"LD2410B radar, 6 m; angle not stated by the vendor."},{id:"apollo_mtr1",name:"Apollo MTR-1",manufacturer:"Apollo Automation",match:["mtr-1","mtr1"],tech:"mmwave",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner"],ceiling:null,verified:!1,source:"https://wiki.apolloautomation.com/products/general/mmwave-presence-sensor-comparison/",note:"LD2450 radar, 6 m; 120\xB0 from the radar spec, not the vendor."},{id:"custom",name:"Custom",manufacturer:"",match:[],tech:"mmwave",fov_h:120,fov_v:90,reach:6,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:null,verified:!1,source:"",note:"Your own values."}]};var Ai=Math.PI/180,ir=180/Math.PI,ji=(i,t)=>Math.hypot(t[0]-i[0],t[1]-i[1]),Qi=(i,t,e)=>i<t?t:i>e?e:i,Se=i=>Math.round(i*1e4)/1e4,ud=i=>(i%360+360)%360;function Ee(i,t,e){let n=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){let o=e[s][0],a=e[s][1],l=e[r][0],c=e[r][1];a>t!=c>t&&i<(l-o)*(t-a)/(c-a)+o&&(n=!n)}return n}var dd=(i,t)=>Ee(i[0],i[1],t),Al=(i,t,e)=>(t[0]-i[0])*(e[1]-i[1])-(t[1]-i[1])*(e[0]-i[0]);function Tl(i,t,e,n,s,r,o,a){let l=o-s,c=a-r;if((l*(t-r)-c*(i-s))*(l*(n-r)-c*(e-s))>=0)return!1;let h=e-i,d=n-t;return h*(r-t)-d*(s-i)>=0!=h*(a-t)-d*(o-i)>=0}function Rl(i,t,e,n,s,r=0){let o=s*Ai,a=Math.cos(o),l=Math.sin(o),c=e/2+r,h=n/2+r;return[[-c,-h],[c,-h],[c,h],[-c,h]].map(([d,u])=>[i+d*a-u*l,t+d*l+u*a])}function Cl(i,t,e){let n=ji(i,t)||1,s=-(t[1]-i[1])/n*(e/2),r=(t[0]-i[0])/n*(e/2);return[[i[0]+s,i[1]+r],[t[0]+s,t[1]+r],[t[0]-s,t[1]-r],[i[0]-s,i[1]-r]]}function Ug(i){let t=0;for(let e=0;e<i.length;e++){let n=i[e],s=i[(e+1)%i.length];t+=n[0]*s[1]-s[0]*n[1]}return t/2}function fd(i,t,e,n){let s=n[0]-e[0],r=n[1]-e[1],o=s*s+r*r,a=o>0?((i-e[0])*s+(t-e[1])*r)/o:0;return a=Qi(a,0,1),Math.hypot(i-(e[0]+s*a),t-(e[1]+r*a))}function Pl(i){let t=Ug(i)>=0?1:-1,e=i.length,n=new Float64Array(e),s=new Float64Array(e),r=new Float64Array(e),o=new Float64Array(e),a=1/0,l=-1/0,c=1/0,h=-1/0;for(let d=0;d<e;d++){let u=i[d],f=i[(d+1)%e];n[d]=f[0]-u[0],s[d]=f[1]-u[1],r[d]=u[0],o[d]=u[1],a=Math.min(a,u[0]),l=Math.max(l,u[0]),c=Math.min(c,u[1]),h=Math.max(h,u[1])}return{n:e,s:t,ex:n,ez:s,px:r,pz:o,x0:a,x1:l,z0:c,z1:h}}function Il(i,t,e,n,s,r){if(Math.max(t,n)<i.x0||Math.min(t,n)>i.x1||Math.max(e,s)<i.z0||Math.min(e,s)>i.z1)return!1;let o=n-t,a=s-e,l=0,c=1,h=1;for(let d=0;d<i.n;d++){let u=i.s*(i.ex[d]*(e-i.pz[d])-i.ez[d]*(t-i.px[d])),f=i.s*(i.ex[d]*a-i.ez[d]*o);if(u<0&&(h=0),f===0){if(u<0)return!1}else{let g=-u/f;if(f>0?g>l&&(l=g):g<c&&(c=g),l>c)return!1}}return r[0]=l,r[1]=c,r[2]=h,!0}var Qt=i=>{throw new Error(i)},jn=i=>((typeof i!="number"||!Number.isFinite(i)||Math.abs(i)>1e3)&&Qt("invalid_number"),i),sr=i=>{(!Array.isArray(i)||i.length!==2)&&Qt("invalid_point"),i.forEach(jn)};function rr(i,t){(!Array.isArray(i)||i.length>64)&&Qt("invalid_rooms"),(typeof t!="number"||!Number.isFinite(t)||Math.abs(t)>1e100||t<=0)&&Qt("invalid_grid_step");let e=0;for(let n of i){(!Array.isArray(n.points)||n.points.length<3||n.points.length>128)&&Qt("invalid_polygon"),n.points.forEach(sr);let s=n.points.map(h=>h[0]),r=n.points.map(h=>h[1]),o=(Math.max(...s)-Math.min(...s))/t,a=(Math.max(...r)-Math.min(...r))/t;(!Number.isFinite(o)||!Number.isFinite(a)||Math.max(o,a)>1e5)&&Qt("grid_budget_exceeded");let l=Math.ceil(o),c=Math.ceil(a);e+=l+l*c,e>1e5&&Qt("grid_budget_exceeded")}return e}function pd(i){let t=5e4,e=0,n=(a,l=0)=>{if((--t<0||l>20)&&Qt("plan_too_complex"),typeof a=="number"&&!Number.isFinite(a)&&Qt("non_finite_number"),typeof a=="string"&&(e+=a.length)>8e6&&Qt("plan_too_large"),a&&typeof a=="object"){let c=Object.values(a);c.length>2048&&Qt("too_many_objects");for(let h of c)n(h,l+1)}};n(i),(!i||i.version!==1||!Array.isArray(i.floors))&&Qt("invalid_plan"),i.settings!=null&&(typeof i.settings!="object"||Array.isArray(i.settings))&&Qt("invalid_settings");let s=(a,l,c)=>{let h=l in a?a[l]:[];(!Array.isArray(h)||h.length>c)&&Qt(`invalid_${l}`);let d=new Set;for(let u of h)(!u||typeof u.id!="string"||!u.id||d.has(u.id))&&Qt(`invalid_${l}_id`),d.add(u.id);return h},r=0,o=0;for(let a of s(i,"floors",16)){a.background?.image!=null&&(typeof a.background.image!="string"||!a.background.image.startsWith("data:image/"))&&Qt("background_must_be_inline_image");let l=s(a,"rooms",64),c=s(a,"walls",256),h=s(a,"openings",256),d=s(a,"furniture",256),u="outdoor"in a?a.outdoor:[];(!Array.isArray(u)||u.length>64)&&Qt("invalid_outdoor");for(let _ of u)(!_||!Array.isArray(_.points)||_.points.length<3||_.points.length>128)&&Qt("invalid_outdoor"),_.points.forEach(sr);let f=0;for(let _ of l){(!Array.isArray(_.points)||_.points.length<3||_.points.length>128)&&Qt("invalid_polygon"),_.points.forEach(sr),f+=_.points.length;for(let m of["wall_thickness","wall_heights"])_[m]!=null&&((!Array.isArray(_[m])||_[m].length!==_.points.length)&&Qt(`invalid_${m}`),_[m].forEach(p=>{p!=null&&jn(p)<0&&Qt(`invalid_${m}`)}));_.ceiling_height!=null&&!(jn(_.ceiling_height)>0&&_.ceiling_height<=20)&&Qt("invalid_ceiling_height")}f>1024&&Qt("too_many_vertices"),a.height!=null&&!(jn(a.height)>0&&a.height<=20)&&Qt("invalid_floor_height");for(let _ of["wall_exterior","wall_interior"])i.settings?.[_]!=null&&jn(i.settings[_])<0&&Qt("invalid_settings");for(let _ of c)sr(_.a),sr(_.b);for(let _ of h){if(_.wall)c.some(m=>m.id===_.wall)||Qt("missing_opening_wall");else{let m=l.find(p=>p.id===_.room_id);(!m||!Number.isInteger(_.edge)||_.edge<0||_.edge>=m.points.length)&&Qt("invalid_opening_room_edge")}for(let m of["offset","width"])jn(_[m])<0&&Qt(`invalid_${m}`)}for(let _ of d){typeof _.type!="string"&&Qt("invalid_furniture_type");for(let m of["x","z","w","d","h"])jn(_[m])}for(let _ of[a,...c,...h,...d])for(let m of["height","thickness","rotation","sill","elevation"])_[m]!=null&&jn(_[m]);let g=rr(l,.1)+rr(l,.2);r+=g,o+=g*(f+c.length+h.length+d.length+1),(r>5e5||o>2e7)&&Qt("plan_budget_exceeded")}return i}var gd=25,_d=6,xd=10,bn=.005,Ng=.9,Og=["lamp","led_strip","shower","plant","rug","coat_rack"];function kg(i){let t=String(i||"");return t==="bed"||t==="bunk_bed"?{name:"bed",grow:0,ring:!1,height:.5}:t.startsWith("sofa")||t==="armchair"?{name:"sofa",grow:0,ring:!1,height:.9}:t==="desk"?{name:"desk",grow:.5,ring:!1,height:.9}:t.startsWith("table")?{name:"dining",grow:.45,ring:!1,height:.9}:["kitchen","worktop","sink","stove"].includes(t)?{name:"kitchen",grow:.6,ring:!0,height:1.3}:t==="wc"?{name:"wc",grow:.3,ring:!1,height:.9}:t==="shower"?{name:"shower",grow:0,ring:!1,height:1.3}:t==="bathtub"?{name:"bathtub",grow:0,ring:!1,height:1.3}:t==="washbasin"?{name:"washbasin",grow:.5,ring:!0,height:1.3}:null}function Fg(i){let t=String(i.type||"");return(i.h||0)>=1.5&&!t.startsWith("lamp")&&!Og.includes(t)}var zg=i=>{let t=s=>Math.round(s*200)/200,e=[t(i.a[0]),t(i.a[1])],n=[t(i.b[0]),t(i.b[1])];return e[0]<n[0]||e[0]===n[0]&&e[1]<n[1]?`${e}|${n}`:`${n}|${e}`};function oo(i,t){pd(i);let e=(i.floors||[]).find(E=>E.id===t)||(t==null?(i.floors||[])[0]:null);if(!e)throw new Error(`floor not found: ${t}`);let n=i.settings||{},s=n.wall_exterior||.24,r=n.wall_interior||.12,o=e.height||2.6,a=(e.rooms||[]).filter(E=>(E.points||[]).length>=3),l=a.map(E=>({id:E.id,name:E.name??E.id,area_id:E.area_id??null,points:E.points.map(B=>[B[0],B[1]]),height:E.ceiling_height||o})),c=[];l.forEach(E=>E.points.forEach(B=>c.push(B)));let h=[];a.forEach((E,B)=>{let H=l[B].points;for(let N=0;N<H.length;N++){let X=H[N],F=H[(N+1)%H.length],tt=ji(X,F);if(tt<1e-6)continue;let J=(F[0]-X[0])/tt,ct=(F[1]-X[1])/tt,ft=[0,tt];for(let Z of c){let rt=Z[0]-X[0],nt=Z[1]-X[1],pt=rt*J+nt*ct;Math.abs(rt*ct-nt*J)<bn&&pt>bn&&pt<tt-bn&&ft.push(pt)}ft.sort((Z,rt)=>Z-rt);let Et=(E.wall_thickness||[])[N],V=(E.wall_heights||[])[N];for(let Z=0;Z<ft.length-1;Z++){if(ft[Z+1]-ft[Z]<bn)continue;let rt=(ft[Z]+ft[Z+1])/2,nt=-ct,pt=J;dd([X[0]+J*rt+nt*.02,X[1]+ct*rt+pt*.02],H)||(nt=-nt,pt=-pt),h.push({a:Z===0?[X[0],X[1]]:[X[0]+J*ft[Z],X[1]+ct*ft[Z]],b:Z===ft.length-2?[F[0],F[1]]:[X[0]+J*ft[Z+1],X[1]+ct*ft[Z+1]],room:E.id,edge:N,t0:ft[Z],t1:ft[Z+1],n:[nt,pt],u:[J,ct],thick:Et,noWall:V===0})}}});let d=new Map;for(let E of h)E.key=zg(E),d.has(E.key)||d.set(E.key,[]),d.get(E.key).push(E);let u=[],f=[],g=[];for(let E of d.values()){let B=new Set(E.map(J=>J.room)).size>1,H=B?r:s,N=Math.max(...E.map(J=>typeof J.thick=="number"&&J.thick>0?J.thick:H)),X=E.some(J=>J.noWall);for(let J of E)J.shared=B,J.wallT=X?0:N;if(X)continue;let F=E[0];B?u.push(Cl(F.a,F.b,N)):u.push([F.a,F.b,[F.b[0]-F.n[0]*N,F.b[1]-F.n[1]*N],[F.a[0]-F.n[0]*N,F.a[1]-F.n[1]*N]]);let tt=!B||N>=.2-1e-9?"block":N>=.1-1e-9?"brick":"thin";g.push({a:F.a,b:F.b,k:tt,t:N,shared:B})}for(let E of h){if(E.noWall)continue;let B=E.shared?E.wallT/2:0;f.push({a:[E.a[0]+E.n[0]*B,E.a[1]+E.n[1]*B],b:[E.b[0]+E.n[0]*B,E.b[1]+E.n[1]*B],n:E.n,room:E.room,edge:E.edge,t0:E.t0,t1:E.t1,shared:E.shared,off:B})}let _=Object.fromEntries(l.map(E=>[E.id,E])),m=Object.fromEntries(a.map(E=>[E.id,E])),p=[],y=[],v=[];for(let E of e.openings||[]){if(E.wall)continue;let B=_[E.room_id];if(!B||!m[E.room_id])continue;let H=B.points,N=H[E.edge],X=H[(E.edge+1)%H.length];if(!N||!X)continue;let F=ji(N,X),tt=(X[0]-N[0])/F,J=(X[1]-N[1])/F,ct=E.offset-E.width/2,ft=E.offset+E.width/2,Et=[N[0]+tt*ct,N[1]+J*ct],V=[N[0]+tt*ft,N[1]+J*ft],Z=h.find(St=>St.room===B.id&&St.edge===E.edge&&E.offset>=St.t0-1e-6&&E.offset<=St.t1+1e-6)||{},rt=Z.n||[-J,tt],nt=Z.wallT||r,pt=!!Z.shared;if(E.type==="window")p.push({id:E.id,a:Et,b:V,n:rt,exterior:!pt,room:B.id,sill:E.sill??.9,height:E.height??1.3,t:pt?0:nt}),pt||v.push({a:Et,b:V,n:rt,sill:E.sill??.9,height:E.height??1.3});else{let St=E.swing==="out"?-1:1,Dt=E.hinge==="right"?V:Et,ie=E.hinge==="right"?Et:V,Ht=[Dt[0]+rt[0]*E.width*St,Dt[1]+rt[1]*E.width*St],pe=[(Et[0]+V[0])/2,(Et[1]+V[1])/2];y.push({id:E.id,a:Et,b:V,hinge:Dt,tip:Ht,other:ie,w:E.width,rooms:[B.id],contact:E.contact??null,outside:!pt,mid:pe,room:B.id,swing:E.swing||"in",sill:E.sill??0,height:E.height??2,t:nt});for(let U=g.length-1;U>=0;U--){let ve=g[U],kt=ji(Et,V)||1;if(Math.abs(Al(Et,V,ve.a))/kt>bn||Math.abs(Al(Et,V,ve.b))/kt>bn)continue;let $t=(ve.a[0]-Et[0])*tt+(ve.a[1]-Et[1])*J,Tt=(ve.b[0]-Et[0])*tt+(ve.b[1]-Et[1])*J,ee=Math.min($t,Tt),At=Math.max($t,Tt);if(At<=bn||ee>=kt-bn)continue;g.splice(U,1);let T=b=>[Et[0]+tt*b,Et[1]+J*b];ee<-bn&&g.push({...ve,a:T(ee),b:[Et[0],Et[1]]}),At>kt+bn&&g.push({...ve,a:T(kt),b:T(At)})}}}for(let E of y){let B=ji(E.a,E.b)||1,H=-(E.b[1]-E.a[1])/B,N=(E.b[0]-E.a[0])/B;E.rooms=l.filter(X=>Ee(E.mid[0]+H*.3,E.mid[1]+N*.3,X.points)||Ee(E.mid[0]-H*.3,E.mid[1]-N*.3,X.points)).map(X=>X.id)}let x=(e.walls||[]).map(E=>({id:E.id,poly:Cl(E.a,E.b,E.thickness||r),height:E.height??null,block:E.height==null||E.height>=1.5})),C=(e.furniture||[]).map(E=>({id:E.id,type:E.type,poly:Rl(E.x,E.z,E.w||.3,E.d||.3,E.rotation||0),h:E.h||0,obstacle:Fg(E)})),A=[];(e.furniture||[]).forEach((E,B)=>{let H=kg(E.type);if(!H)return;let N=l.find(X=>Ee(E.x,E.z,X.points));N&&A.push({name:H.name,room:N.id,height:H.height,outer:Rl(E.x,E.z,E.w||.3,E.d||.3,E.rotation||0,H.grow),inner:H.ring?C[B].poly:null})});let R=[];for(let E of y)for(let B of E.rooms)R.push({name:"entry",room:B,height:1.3,center:E.mid,radius:Ng,door:E.id});let P=[...u.flat(),...l.flatMap(E=>E.points),...(e.outdoor||[]).flatMap(E=>E.points||[])];P.length||P.push([0,0]);let M=P.map(E=>E[0]),w=P.map(E=>E[1]),I={x0:Math.min(...M)-.4,x1:Math.max(...M)+.4,z0:Math.min(...w)-.4,z1:Math.max(...w)+.4},L={floor:{id:e.id,name:e.name??e.id,height:o},rooms:l,bands:u,faces:f,segments:g,doors:y,windows:p,glass:v,freeWalls:x,furniture:C,zones:A,entryZones:R,cells:{},bounds:I,outdoor:e.outdoor||[]};return Object.defineProperty(L,"subs",{value:h,enumerable:!1}),L.cells["0.1"]=ro(L,.1),L.cells["0.2"]=ro(L,.2),L}function ro(i,t){let e=rr(i.rooms,t),n=i.rooms.reduce((o,a)=>o+a.points.length,0)+i.bands.length+i.freeWalls.length+1;if(e*n>2e7)throw new Error("grid_budget_exceeded");let s=[],r=[...i.bands.map(o=>({p:o,b:Ll(o)})),...i.freeWalls.map(o=>({p:o.poly,b:Ll(o.poly)}))];for(let o of i.rooms){let a=Ll(o.points);for(let l=0;;l++){let c=a[0]+t*(l+.5);if(c>=a[1])break;for(let h=0;;h++){let d=a[2]+t*(h+.5);if(d>=a[3])break;if(!Ee(c,d,o.points))continue;let u=!1;for(let{p:f,b:g}of r)if(g[0]<=c&&c<=g[1]&&g[2]<=d&&d<=g[3]&&Ee(c,d,f)){u=!0;break}u||s.push({x:Math.round(c*1e6)/1e6,z:Math.round(d*1e6)/1e6,room:o.id})}}}return s}function Ll(i){let t=1/0,e=-1/0,n=1/0,s=-1/0;for(let r of i)t=Math.min(t,r[0]),e=Math.max(e,r[0]),n=Math.min(n,r[1]),s=Math.max(s,r[1]);return[t,e,n,s]}function ao(i,t){let e=rr(i.rooms,t),n=i.rooms.reduce((r,o)=>r+o.points.length,0)+i.bands.length+i.freeWalls.length+1;if(e*n>2e7)throw new Error("grid_budget_exceeded");let s=String(t);if(!i.cells[s]){let r=ro(i,t);if(Object.getOwnPropertyNames(i.cells).length>=8)return r;Object.defineProperty(i.cells,s,{value:r,enumerable:!1,writable:!0,configurable:!0})}return i.cells[s]}var Ul={heights:[.5,.9,1.3],doors:"open",thin_db:10,cell:.1};function or(i){let t={...Ul,...i||{}};return(!Array.isArray(t.heights)||!t.heights.length)&&(t.heights=Ul.heights),t}function ts(i,t=Dn){let e=t.profiles||[],n=e.find(o=>o.id===i.profile)||e.find(o=>o.id==="custom")||e[0],s={...i};s.mount==null&&(s.mount=n.mounts&&n.mounts[0]||"wall");let r=s.mount==="ceiling"?n.ceiling:null;return s.fov_h==null&&(s.fov_h=r?r.fov:n.fov_h),s.reach==null&&(s.reach=r?r.reach:n.reach),s.fov_v==null&&(n.fov_v==null?(s.fov_v=t.default_fov_v??90,s.fov_v_assumed=!0):s.fov_v=n.fov_v),r&&s.ceiling_fov==null&&(s.ceiling_fov=r.fov),s.tilt==null&&(s.tilt=s.mount==="ceiling"?90:0),s.active==null&&(s.active=!0),s}function Nl(i){return i.fov_h!=null&&i.fov_v!=null&&i.reach!=null&&i.mount!=null?i:ts(i,Dn)}var Dl=1e-9;function lo(i){let t=Number(i.fov_h),e=Number(i.fov_v),n={x:Number(i.x),y:Number(i.height??1.9),z:Number(i.z),reach:Number(i.reach),ceiling:i.mount==="ceiling",degH:t/2,degV:e/2,degC:(i.ceiling_fov?Number(i.ceiling_fov):Math.max(t,e))/2,halfH:0,halfV:0,halfC:0,fx:0,fy:0,fz:0,rx:0,rz:0,ux:0,uy:0,uz:0,d:0};n.halfH=n.degH*Ai,n.halfV=n.degV*Ai,n.halfC=n.degC*Ai;let s=(i.phi||0)*Ai,r=(i.tilt||0)*Ai,o=Math.cos(s),a=Math.sin(s),l=Math.cos(r),c=Math.sin(r);return n.fx=o*l,n.fy=-c,n.fz=a*l,n.rx=-a,n.rz=o,n.ux=o*c,n.uy=l,n.uz=a*c,n}function co(i,t,e,n){let s=Math.sqrt(t*t+e*e+n*n);if(i.d=s,s<1e-6)return 0;if(i.ceiling){let h=Math.acos(Qi(-e/s,-1,1));return h>i.halfC+Dl?0:1-.4*Qi((h*ir-(i.degC-15))/15,0,1)}let r=t*i.fx+e*i.fy+n*i.fz;if(r<=0)return 0;let o=t*i.rx+n*i.rz,a=Math.abs(Math.atan2(o,r));if(a>i.halfH+Dl)return 0;let l=t*i.ux+e*i.uy+n*i.uz,c=Math.abs(Math.atan2(l,Math.hypot(r,o)));return c>i.halfV+Dl?0:(1-.4*Qi((a*ir-(i.degH-15))/15,0,1))*(1-.4*Qi((c*ir-(i.degV-10))/10,0,1))}function Bg(i,t,e,n){if(t<=0||e>i.reach*t*n)return 0;let s=.58*i.reach;return e<=s?1:1-.4*(e-s)/(i.reach-s)}var vd=new WeakMap;function ar(i,t){let e=or(t),n=typeof e.doors=="object"?JSON.stringify(e.doors):String(e.doors),s=`${e.thin_db}|${n}`,r=vd.get(i);if(r||vd.set(i,r=new Map),r.has(s))return r.get(s);let o=i.segments,a=o.length,l={n:a,ax:new Float64Array(a),az:new Float64Array(a),bx:new Float64Array(a),bz:new Float64Array(a),db:new Float64Array(a),x0:new Float64Array(a),x1:new Float64Array(a),z0:new Float64Array(a),z1:new Float64Array(a),doorSegs:[],blockers:[],obstacles:[]};o.forEach((c,h)=>{l.ax[h]=c.a[0],l.az[h]=c.a[1],l.bx[h]=c.b[0],l.bz[h]=c.b[1],l.db[h]=c.k==="block"?1/0:c.k==="brick"?gd:e.thin_db,l.x0[h]=Math.min(c.a[0],c.b[0]),l.x1[h]=Math.max(c.a[0],c.b[0]),l.z0[h]=Math.min(c.a[1],c.b[1]),l.z1[h]=Math.max(c.a[1],c.b[1])}),i.doors.forEach((c,h)=>{let d=e.doors==="open"?!0:e.doors==="closed"?!1:e.doors?.[c.id]!==!1;l.doorSegs.push({idx:h,id:c.id,ax:c.a[0],az:c.a[1],bx:c.b[0],bz:c.b[1],db:d?0:_d})});for(let c of i.freeWalls)c.block&&l.blockers.push(Pl(c.poly));for(let c of i.furniture)c.obstacle&&l.obstacles.push({P:Pl(c.poly),h:c.h});return l.tmp=new Float64Array(3),r.set(s,l),l}function ho(i,t,e,n,s){let r=0,o=Math.min(t,n),a=Math.max(t,n),l=Math.min(e,s),c=Math.max(e,s);for(let h=0;h<i.n;h++)if(!(i.x1[h]<o||i.x0[h]>a||i.z1[h]<l||i.z0[h]>c)&&Tl(t,e,n,s,i.ax[h],i.az[h],i.bx[h],i.bz[h])){if(i.db[h]===1/0)return 1/0;r+=i.db[h]}for(let h of i.doorSegs)h.db&&Tl(t,e,n,s,h.ax,h.az,h.bx,h.bz)&&(r+=h.db);for(let h of i.blockers)if(Il(h,t,e,n,s,i.tmp)&&!i.tmp[2])return 1/0;return r}function uo(i,t,e,n,s,r,o){let a=0;for(let l of i.obstacles){if(!Il(l.P,t,n,s,o,i.tmp)||i.tmp[2])continue;let c=e+(r-e)*i.tmp[0],h=e+(r-e)*i.tmp[1];Math.min(c,h)<l.h&&(a+=xd)}return a}var yd=new WeakMap;function fo(i,t){let e=yd.get(i);if(e)return e;let n=i.length,s=new Float64Array(n),r=new Float64Array(n),o=new Int32Array(n),a=new Map(t.rooms.map((l,c)=>[l.id,c]));return i.forEach((l,c)=>{s[c]=l.x,r[c]=l.z,o[c]=a.get(l.room)}),e={n,x:s,z:r,room:o},yd.set(i,e),e}function Ol(i,t,e,n,s,r,o,a){let l=a.length,c=o.length*l,h=new Float64Array(c),d=new Float64Array(c),u=new Float64Array(c),f=new Float64Array(c),g=new Int32Array(c),_=new Int8Array(c),m=0;for(let p=0;p<o.length;p++){let y=o[p],v=r.x[y],x=r.z[y],C=v-t,A=x-n;if(C*C+A*A>s*s)continue;let R=ho(i,t,n,v,x);if(R!==1/0)for(let P=0;P<l;P++){let M=a[P],w=M-e;if(C*C+A*A+w*w>s*s)continue;let I=R+(i.obstacles.length?uo(i,t,e,n,v,M,x):0);h[m]=C,d[m]=w,u[m]=A,f[m]=I?Math.pow(10,-I/20):1,g[m]=y,_[m]=P,m++}}return{n:m,nH:l,vx:h,vy:d,vz:u,att:f,ci:g,hi:_}}function kl(i,t,e){for(let n=0;n<i.n;n++){let s=co(t,i.vx[n],i.vy[n],i.vz[n]);e[n]=s?Bg(t,s,t.d,i.att[n]):0}return e}function bd(i,t,e){for(let n of i.rooms)if(Ee(t,e,n.points))return n.id;return null}function po(i,t){let e=Nl(t);if(e.mount==="ceiling"||!i.glass.length)return 0;let n=Math.max(10,Number(e.fov_h)/2-10),s=e.phi||0,r=Number(e.reach),o=0;for(let a of i.glass)for(let l=0;l<=10;l++){let c=a.a[0]+(a.b[0]-a.a[0])*l/10,h=a.a[1]+(a.b[1]-a.a[1])*l/10,d=c-e.x,u=h-e.z,f=Math.hypot(d,u);f<.3||f>r||Math.abs((Math.atan2(u,d)*ir-s+540)%360-180)>n||(o+=Math.abs(d*a.n[0]+u*a.n[1])/f*(1-f/r)/11)}return o}var cr=1.3,lr=i=>String(i);function Vg(i,t){return(t||[]).filter(e=>e.active!==!1&&(e.floor_id==null||e.floor_id===i.floor.id)).map(e=>Nl(e))}function Fl(i,t){let e=new Map,n=r=>{let o=`${r.name}|${r.room}`;e.has(o)||e.set(o,{name:r.name,room:r.room,height:r.height,parts:[]}),e.get(o).parts.push(r)};i.zones.forEach(n),i.entryZones.forEach(n);let s=[...e.values()];for(let r of s){r.idx=[];for(let o=0;o<t.length;o++){let a=t[o];if(a.room===r.room){for(let l of r.parts)if(l.center?Math.hypot(a.x-l.center[0],a.z-l.center[1])<l.radius:Ee(a.x,a.z,l.outer)&&!(l.inner&&Ee(a.x,a.z,l.inner))){r.idx.push(o);break}}}}return s}function hr(i,t,e){let n=or(e),s=ar(i,n),r=ar(i,{...n,doors:"open"}),o=ao(i,n.cell),a=fo(o,i),l=o.length,c=i.rooms.length,h=Vg(i,t),d=h.length,u=h.map(L=>lo(L)),f=h.map(L=>bd(i,L.x,L.z)),g=new Int32Array(l);for(let L=0;L<l;L++)g[L]=L;let _=new Map(i.rooms.map((L,E)=>[L.id,E])),m=f.map(L=>L==null?-1:_.get(L)),p=new Array(c).fill(0);for(let L=0;L<l;L++)p[a.room[L]]++;let y=new Map,v=(L,E)=>{let B=`${L}|${E.join(",")}`;if(y.has(B))return y.get(B);let H=u[L],N=E.length,X=Ol(s,H.x,H.y,H.z,H.reach,a,g,E),F=kl(X,H,new Float64Array(X.n)),tt=new Float32Array(l*N);for(let J=0;J<X.n;J++)F[J]>0&&(tt[X.ci[J]*N+X.hi[J]]=F[J]);return y.set(B,tt),tt},x=new Map,C=(L,E)=>{let B=`${L}|${E.join(",")}`;if(x.has(B))return x.get(B);let H=u[L],N=E.length,X=Ol(r,H.x,H.y,H.z,H.reach,a,g,E),F=kl(X,H,new Float64Array(X.n)),tt=new Float32Array(l*N);for(let J=0;J<X.n;J++)F[J]>0&&(tt[X.ci[J]*N+X.hi[J]]=F[J]);return x.set(B,tt),tt},A={},R={};h.forEach((L,E)=>{R[L.entity_id]={room:f[E],glass:Se(po(i,L)),spill:{}}});let P=h.map((L,E)=>C(E,[cr])),M=i.rooms.map(()=>[]);for(let L=0;L<l;L++)M[a.room[L]].push(L);i.rooms.forEach((L,E)=>{let B=M[E],H=B.length,N=[];for(let V=0;V<d;V++)m[V]===E&&N.push(V);let X={},F={},tt=N.map(V=>v(V,n.heights));n.heights.forEach((V,Z)=>{if(!H){X[lr(V)]=0,F[lr(V)]=0;return}let rt=0,nt=0;for(let pt of B){let St=0;for(let Dt of tt){let ie=Dt[pt*n.heights.length+Z];ie>St&&(St=ie)}rt+=St,St>0&&nt++}X[lr(V)]=Se(rt/H),F[lr(V)]=Se(nt/H)});let J=Object.values(X),ct={},ft=new Uint8Array(H);for(let V=0;V<d;V++){if(m[V]===E)continue;let Z=0;B.forEach((nt,pt)=>{P[V][nt]>0&&(Z++,ft[pt]=1)});let rt=H?Se(Z/H):0;ct[h[V].entity_id]=rt,R[h[V].entity_id].spill[L.id]=rt}let Et=0;for(let V=0;V<H;V++)Et+=ft[V];A[L.id]={coverage:X,coverage_mean:J.length?Se(J.reduce((V,Z)=>V+Z,0)/J.length):0,seen:F,misfire_risk:H?Se(Et/H):0,from:ct,own_sensors:N.map(V=>h[V].entity_id)}});let w=[];for(let L of Fl(i,o)){if(!L.idx.length)continue;let E=_.get(L.room),B=[];for(let N=0;N<d;N++)m[N]===E&&B.push(v(N,[L.height]));let H=0;for(let N of L.idx)B.some(X=>X[N]>0)&&H++;w.push({name:L.name,room:L.room,height:L.height,share:Se(H/L.idx.length)})}let I={rooms:A,sensors:R,zones:w,grid:{}};if(n.grid)for(let L of n.heights){let E=[],B=n.heights.indexOf(L);i.rooms.forEach((H,N)=>{let X=[];for(let F=0;F<d;F++)m[F]===N&&X.push(F);for(let F of M[N]){let tt=0,J=null;for(let ft of X){let Et=v(ft,n.heights)[F*n.heights.length+B];Et>tt&&(tt=Et,J=h[ft].entity_id)}let ct=[];for(let ft=0;ft<d;ft++)m[ft]!==N&&C(ft,[L])[F]>0&&ct.push(h[ft].entity_id);E.push({x:Se(o[F].x),z:Se(o[F].z),room:H.id,own:Se(tt),own_sensor:J,spill:ct})}}),I.grid[lr(L)]=E}return I}var $g=.1,ur=.03,es=.5,Hg=1.9,Gg=10,wd=70,Td=10,Md=30,Wg=[-5,-2.5,2.5,5],Xg=20,qg=.4,Yg=3,Zg=2,Kg=.3,Jg=3,jg=["flur","hall","corridor","diele","entry","entrance","eingang","vorraum","lobby"],Qg=5;function t_(i){let t=`${i.id??""} ${i.name??""}`.toLowerCase();return jg.some(e=>t.includes(e))}var Rd=(i,t,e)=>{let n=[];for(let s=i;s<=t;s+=e)n.push(s);return n};function Sd(i,t,e,n){if(Ee(i,t,e))return!0;for(let s=0;s<e.length;s++)if(fd(i,t,e[s],e[(s+1)%e.length])<n)return!0;return!1}function e_(i,t,e,n,s){let r=e.heights.length?e.heights:[cr],o=r.length,a=i.rooms.indexOf(t),l=[];for(let g=0;g<n.length;g++)s.room[g]===a&&l.push(g);let c=l.length,h=new Map;for(let g of l){let _=new Map;for(let m of r)_.set(m,[1/o,1/(c*o)]);h.set(g,_)}let d=c;for(let g of Fl(i,n)){if(g.room!==t.id)continue;let _=g.name==="entry"?Zg:Yg;d+=_*g.idx.length;for(let m of g.idx){let p=h.get(m);p.has(g.height)||p.set(g.height,[0,0]),p.get(g.height)[0]+=_}}d=d||1;let u={cx:[],cz:[],py:[],ws:[],wp:[]};for(let g of l)for(let[_,[m,p]]of h.get(g))u.cx.push(n[g].x),u.cz.push(n[g].z),u.py.push(_),u.ws.push(m/d),u.wp.push(p);let f={rooms:[],n:[],mult:[],cx:[],cz:[],sr:[]};return i.rooms.forEach((g,_)=>{if(g.id===t.id)return;let m=[];for(let y=0;y<n.length;y++)s.room[y]===_&&m.push(y);if(!m.length)return;let p=f.rooms.length;f.rooms.push(g.id),f.n.push(m.length),f.mult.push(t_(g)?Jg:1);for(let y of m)f.cx.push(n[y].x),f.cz.push(n[y].z),f.sr.push(p)}),{own:u,spill:f}}function n_(i,t,e,n,s,r){let o=r*r,a=[],l=t.own,c=NaN,h=NaN,d=0;for(let g=0;g<l.cx.length;g++){let _=l.cx[g],m=l.cz[g],p=l.py[g],y=_-e,v=p-n,x=m-s,C=y*y+v*v+x*x;if(C>o||C<1e-12||((_!==c||m!==h)&&(d=ho(i,e,s,_,m),c=_,h=m),d===1/0))continue;let A=d+uo(i,e,n,s,_,p,m),R=Math.pow(10,-A/20),P=Math.sqrt(C);P>r*R||a.push(y,v,x,P,R,l.ws[g],l.wp[g])}let u=[],f=t.spill;for(let g=0;g<f.cx.length;g++){let _=f.cx[g],m=f.cz[g],p=_-e,y=cr-n,v=m-s,x=p*p+y*y+v*v;if(x>o||x<1e-12)continue;let C=ho(i,e,s,_,m);if(C===1/0)continue;let A=C+uo(i,e,n,s,_,cr,m),R=Math.pow(10,-A/20),P=Math.sqrt(x);P>r*R||u.push(p,y,v,P,R,f.sr[g])}return{own:a,spill:u}}function Ed(i,t,e,n,s,r){let o={...n,phi:s},a=lo(o),l=a.reach,c=.58*l,h=l-c,d=0,u=0,f=e.own;for(let v=0;v<f.length;v+=7){let x=co(a,f[v],f[v+1],f[v+2]),C=f[v+3];if(!x||C>l*x*f[v+4])continue;let A=C<=c?1:1-.4*(C-c)/h;d+=f[v+5]*A,u+=f[v+6]*A}let g=new Array(t.spill.rooms.length).fill(0),_=e.spill;for(let v=0;v<_.length;v+=6){let x=co(a,_[v],_[v+1],_[v+2]);!x||_[v+3]>l*x*_[v+4]||g[_[v+5]]++}let m={},p=0;g.forEach((v,x)=>{if(!v)return;let C=v/t.spill.n[x];m[t.spill.rooms[x]]=C,p+=t.spill.mult[x]*C});let y=po(i,o);return{phi:ud(s),score:d-r*p-Kg*y,coverage:u,spill:m,glass:y}}function Cd(i,t,e,n){if(!Ee(e,n,t.points))return!0;for(let s of i.bands){let r=Pd(s);if(r[0]<=e&&e<=r[1]&&r[2]<=n&&n<=r[3]&&Ee(e,n,s))return!0}for(let s of i.freeWalls)if(Sd(e,n,s.poly,.05))return!0;for(let s of[...i.doors,...i.windows]){let r=s.a,o=s.b,a=Math.hypot(o[0]-r[0],o[1]-r[1])||1,l=(o[0]-r[0])/a,c=(o[1]-r[1])/a,h=(e-r[0])*l+(n-r[1])*c,d=Math.abs((e-r[0])*c-(n-r[1])*l);if(h>=-.15&&h<=a+.15&&d<.5)return!0}for(let s of i.furniture)if(s.h>=1.5&&!String(s.type).startsWith("lamp")&&Sd(e,n,s.poly,.08))return!0;return!1}function Pd(i){let t=1/0,e=-1/0,n=1/0,s=-1/0;for(let r of i)t=Math.min(t,r[0]),e=Math.max(e,r[0]),n=Math.min(n,r[1]),s=Math.max(s,r[1]);return[t,e,n,s]}function i_(i,t){let e=[],n=i.subs.filter(r=>r.room===t.id),s=t.points;for(let r=0;r<s.length;r++){let o=n.filter(h=>h.edge===r).sort((h,d)=>h.t0-d.t0);if(!o.length)continue;let a=s[r],l=o[0].u,c=o[o.length-1].t1;for(let h=0;;h++){let d=ur+$g*h;if(d>c-ur+1e-9)break;let u=o.find(p=>p.t0-1e-9<=d&&d<=p.t1+1e-9);if(!u||u.wallT<=0)continue;let f=(u.shared?u.wallT/2:0)+ur,g=a[0]+l[0]*d+u.n[0]*f,_=a[1]+l[1]*d+u.n[1]*f;if(Cd(i,t,g,_))continue;let m=Math.atan2(u.n[1],u.n[0])*180/Math.PI;e.push({x:g,z:_,mount:"wall",phis:Rd(-wd,wd,Td).map(p=>m+p)})}}return e}function s_(i,t){let e=[],n=t.points,s=n.length,r=0;for(let a=0;a<s;a++){let l=n[(a+s-1)%s];r+=l[0]*n[a][1]-n[a][0]*l[1]}let o=i.subs.filter(a=>a.room===t.id);for(let a=0;a<s;a++){let l=o.filter(R=>R.edge===(a+s-1)%s),c=o.filter(R=>R.edge===a);if(!l.length||!c.length)continue;let h=l.reduce((R,P)=>P.t1>R.t1?P:R),d=c.reduce((R,P)=>P.t0<R.t0?P:R);if(h.wallT<=0||d.wallT<=0)continue;let u=h.u,f=d.u;if((u[0]*f[1]-u[1]*f[0])*r<=0)continue;let g=h.n,_=d.n,m=g[0]*_[1]-g[1]*_[0];if(Math.abs(m)<.2)continue;let p=(h.shared?h.wallT/2:0)+ur,y=(d.shared?d.wallT/2:0)+ur,v=n[a],x=v[0]+(p*_[1]-y*g[1])/m,C=v[1]+(g[0]*y-_[0]*p)/m;if(Cd(i,t,x,C))continue;let A=Math.atan2(g[1]+_[1],g[0]+_[0])*180/Math.PI;e.push({x,z:C,mount:"corner",phis:Rd(-Md,Md,Td).map(R=>A+R)})}return e}function r_(i,t){let e=[],[n,s,r,o]=Pd(t.points);for(let a=Math.ceil(n/es-1e-9);a*es<=s;a++){let l=a*es;for(let c=Math.ceil(r/es-1e-9);c*es<=o;c++){let h=c*es;Ee(l,h,t.points)&&(i.bands.some(d=>Ee(l,h,d))||i.freeWalls.some(d=>Ee(l,h,d.poly))||e.push({x:l,z:h,mount:"ceiling",phis:[0]}))}}return e}var Ad=(i,t)=>t.best.score-i.best.score||i.cand.x-t.cand.x||i.cand.z-t.cand.z||i.best.phi-t.best.phi;function zl(i,t,e,n,s=1,r=Dn,o=null){let a=or(n),l=i.rooms.find(v=>v.id===t);if(!l)throw new Error(`room not found: ${t}`);let c=(r.profiles||[]).find(v=>v.id===e)||(r.profiles||[]).find(v=>v.id==="custom"),h=ar(i,{...a,doors:"open"}),d=ao(i,a.cell),u=fo(d,i),f=e_(i,l,a,d,u),g=c.mounts||["wall"],_=[];g.includes("wall")&&_.push(...i_(i,l)),g.includes("corner")&&_.push(...s_(i,l)),g.includes("ceiling")&&_.push(...r_(i,l));let m=Math.min(Hg,l.height-.1),p=[];_.forEach((v,x)=>{let C=v.mount==="ceiling",A=C?l.height:m,R=C?90:Gg,P=ts({entity_id:"candidate",profile:c.id,mount:v.mount,x:v.x,z:v.z,height:A,tilt:R,phi:0},r),M=n_(h,f,v.x,A,v.z,Number(P.reach)),w=null;for(let I of v.phis){let L=Ed(i,f,M,P,I,s);(w===null||L.score>w.score+1e-12)&&(w=L)}p.push({cand:v,tpl:P,data:M,best:w,height:A,tilt:R}),o&&x%10===0&&o(.9*(x+1)/_.length)}),p.sort(Ad);for(let v of p.slice(0,Xg)){if(v.cand.mount==="ceiling")continue;let x=v.best;for(let C of Wg){let A=Ed(i,f,v.data,v.tpl,x.phi+C,s);A.score>v.best.score+1e-12&&(v.best=A)}}p.sort(Ad);let y=[];for(let v of p){let x=v.cand;if(y.some(R=>Math.hypot(x.x-R.x,x.z-R.z)<qg))continue;let C=v.best,A={};for(let[R,P]of Object.entries(C.spill))A[R]=Se(P);if(y.push({x:Se(x.x),z:Se(x.z),height:Se(v.height),phi:Math.round(C.phi*100)/100,tilt:v.tilt,mount:x.mount,score:Se(C.score),coverage:Se(C.coverage),spill:A,glass:Se(C.glass)}),y.length>=Qg)break}return o&&o(1),y}var Qn=Math.PI/180;function o_(i,t,e=0){return[i,e,t]}var ti=(i,t)=>[i[0]+t[0],i[1]+t[1],i[2]+t[2]],Id=(i,t)=>[i[0]-t[0],i[1]-t[1],i[2]-t[2]],cn=(i,t)=>[i[0]*t,i[1]*t,i[2]*t],ns=(i,t)=>i[0]*t[0]+i[1]*t[1]+i[2]*t[2],$l=(i,t)=>[i[1]*t[2]-i[2]*t[1],i[2]*t[0]-i[0]*t[2],i[0]*t[1]-i[1]*t[0]],go=i=>{let t=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/t,i[1]/t,i[2]/t]};function _o(i){return o_(i.x,i.z,i.height??1.9)}function Dd(i){let t=(i.phi??0)*Qn,e=(i.tilt??0)*Qn,n=[Math.cos(t)*Math.cos(e),-Math.sin(e),Math.sin(t)*Math.cos(e)],s=[-Math.sin(t),0,Math.cos(t)],r=$l(s,n);return{f:n,r:s,u:r}}function Ud(i){let t=Dd(i.mount==="ceiling"?{...i,tilt:90}:i);return{x:t.r,y:t.u,z:cn(t.f,-1)}}function a_(i,t,e){let n=t*Qn,s=e*Qn,r=Math.cos(s);return go(ti(ti(cn(i.f,r*Math.cos(n)),cn(i.r,r*Math.sin(n))),cn(i.u,Math.sin(s))))}function Bl(i,t,e,n=0,s=1/0){let r=e;return t[1]<-1e-9&&Number.isFinite(n)&&(r=Math.min(r,Math.max(0,(i[1]-n)/-t[1]))),t[1]>1e-9&&Number.isFinite(s)&&(r=Math.min(r,Math.max(0,(s-i[1])/t[1]))),r}function Nd(i,t={}){let e=t.yMin??0,n=t.yMax??1/0,s=t.segments??28,r=_o(i),o=i.reach>0?i.reach:5,a=i.fov_h>0?i.fov_h:90,l=i.fov_v>0?i.fov_v:90;if(i.mount==="ceiling"){let p=i.ceiling_fov>0?i.ceiling_fov:Math.max(a,l),y=Math.min(p/2,89)*Qn,v=[r];for(let M=0;M<s;M++){let w=M/s*2*Math.PI,I=[Math.sin(y)*Math.cos(w),-Math.cos(y),Math.sin(y)*Math.sin(w)];v.push(ti(r,cn(I,Bl(r,I,o,e,n))))}let x=Bl(r,[0,-1,0],o,e,n);v.push(ti(r,[0,-x,0]));let C=v.length-1,A=[];for(let M=0;M<s;M++){let w=(M+1)%s;A.push(0,1+w,1+M),A.push(C,1+M,1+w)}let R=[],P=4;for(let M=0;M<P;M++){let w=v[1+Math.round(M/P*s)%s];R.push(...r,...w)}for(let M=0;M<s;M++)R.push(...v[1+M],...v[1+(M+1)%s]);return{apex:r,corners:v.slice(1,1+s),positions:v.flat(),indices:A,edges:R}}let c=Dd(i),h=Math.min(a/2,89),d=Math.min(l/2,89),f=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([p,y])=>{let v=a_(c,p*h,y*d);return ti(r,cn(v,Bl(r,v,o,e,n)))}),g=[r,...f],_=[0,1,2,0,2,3,0,3,4,0,4,1,1,3,2,1,4,3],m=[];for(let p=0;p<4;p++)m.push(...r,...f[p]),m.push(...f[p],...f[(p+1)%4]);return{apex:r,corners:f,positions:g.flat(),indices:_,edges:m}}function Od(i){let t=[];for(let e of i||[]){let n=t[t.length-1];(!n||Math.abs(n[0]-e[0])>1e-9||Math.abs(n[1]-e[1])>1e-9)&&t.push([e[0],e[1]])}for(;t.length>1&&Math.abs(t[0][0]-t[t.length-1][0])<1e-9&&Math.abs(t[0][1]-t[t.length-1][1])<1e-9;)t.pop();return t}function Hl(i){let t=0;for(let e=0;e<i.length;e++){let[n,s]=i[e],[r,o]=i[(e+1)%i.length];t+=n*o-r*s}return t/2}function l_(i,t,e,n){let s=(i[0]-e[0])*(t[1]-e[1])-(t[0]-e[0])*(i[1]-e[1]),r=(i[0]-n[0])*(e[1]-n[1])-(e[0]-n[0])*(i[1]-n[1]),o=(i[0]-t[0])*(n[1]-t[1])-(n[0]-t[0])*(i[1]-t[1]),a=s<-1e-12||r<-1e-12||o<-1e-12,l=s>1e-12||r>1e-12||o>1e-12;return!(a&&l)}function c_(i){let t=i.length;if(t<3)return[];let e=[...Array(t).keys()];Hl(i)<0&&e.reverse();let n=[],s=0;for(;e.length>3&&s++<t*t;){let r=!1;for(let o=0;o<e.length;o++){let a=e[(o-1+e.length)%e.length],l=e[o],c=e[(o+1)%e.length],h=i[a],d=i[l],u=i[c];if((d[0]-h[0])*(u[1]-h[1])-(d[1]-h[1])*(u[0]-h[0])<=1e-12)continue;let g=!0;for(let _ of e){if(_===a||_===l||_===c)continue;let m=i[_];if(l_(m,h,d,u)){g=!1;break}}if(g){n.push([a,l,c]),e.splice(o,1),r=!0;break}}r||(n.push([e[0],e[1],e[2]]),e.splice(1,1))}return e.length===3&&n.push([e[0],e[1],e[2]]),n.filter(([r,o,a])=>{let l=i[r],c=i[o],h=i[a];return Math.abs((c[0]-l[0])*(h[1]-l[1])-(c[1]-l[1])*(h[0]-l[0]))>1e-12})}function dr(i,t,e){let n=Od(i);if(n.length<3)return{positions:[],indices:[]};Hl(n)<0&&n.reverse();let s=[],r=[],o=c_(n),a=Math.abs(e-t)<1e-9,l=s.length/3;for(let h of n)s.push(h[0],e,h[1]);for(let[h,d,u]of o)r.push(l+h,l+u,l+d);if(a)return{positions:s,indices:r};let c=s.length/3;for(let h of n)s.push(h[0],t,h[1]);for(let[h,d,u]of o)r.push(c+h,c+d,c+u);for(let h=0;h<n.length;h++){let d=(h+1)%n.length,u=s.length/3;s.push(n[h][0],t,n[h][1],n[d][0],t,n[d][1],n[d][0],e,n[d][1],n[h][0],e,n[h][1]),r.push(u,u+2,u+1,u,u+3,u+2)}return{positions:s,indices:r}}function Ti(i){let t=[],e=[];for(let n of i){let s=t.length/3;for(let r of n.positions)t.push(r);for(let r of n.indices)e.push(r+s)}return{positions:t,indices:e}}function mo(i,t,e,n){let s=n==="le"?1:-1,r=a=>s*(a[0]*t[0]+a[1]*t[1]-e),o=[];for(let a=0;a<i.length;a++){let l=i[a],c=i[(a+1)%i.length],h=r(l),d=r(c);if(h<=0&&o.push(l),h<0&&d>0||h>0&&d<0){let u=h/(h-d);o.push([l[0]+(c[0]-l[0])*u,l[1]+(c[1]-l[1])*u])}}return o}function h_(i,t,e=.02){let n=!1;for(let s=0,r=t.length-1;s<t.length;r=s++){let[o,a]=t[s],[l,c]=t[r];a>i[1]!=c>i[1]&&i[0]<(l-o)*(i[1]-a)/(c-a)+o&&(n=!n)}if(n)return!0;for(let s=0;s<t.length;s++){let r=t[s],o=t[(s+1)%t.length],a=o[0]-r[0],l=o[1]-r[1],c=a*a+l*l||1,h=Math.max(0,Math.min(1,((i[0]-r[0])*a+(i[1]-r[1])*l)/c));if(Math.hypot(i[0]-(r[0]+a*h),i[1]-(r[1]+l*h))<=e)return!0}return!1}function u_(i,t,e){let n=Od(i),s=[{poly:n,y0:0,y1:e}];for(let r of t){let o=[(r.a[0]+r.b[0])/2,(r.a[1]+r.b[1])/2];if(!h_(o,n,.03))continue;let a=Math.hypot(r.b[0]-r.a[0],r.b[1]-r.a[1]);if(a<1e-6)continue;let l=[(r.b[0]-r.a[0])/a,(r.b[1]-r.a[1])/a],c=r.a[0]*l[0]+r.a[1]*l[1],h=r.b[0]*l[0]+r.b[1]*l[1],d=[],u=(f,g,_)=>{f.length>=3&&Math.abs(Hl(f))>1e-6&&_-g>1e-6&&d.push({poly:f,y0:g,y1:_})};for(let f of s){u(mo(f.poly,l,c,"le"),f.y0,f.y1),u(mo(f.poly,l,h,"ge"),f.y0,f.y1);let g=mo(mo(f.poly,l,c,"ge"),l,h,"le");r.y0>f.y0&&u(g,f.y0,Math.min(r.y0,f.y1)),r.y1<f.y1&&u(g,Math.max(r.y1,f.y0),f.y1)}s=d}return s}function d_(i,t,e,n){return{positions:[i[0],e,i[1],t[0],e,t[1],t[0],n,t[1],i[0],n,i[1]],indices:[0,1,2,0,2,3]}}function kd(i,t={}){let e=i?.floor?.height>0?i.floor.height:2.6,n=t.cutY>0?Math.min(t.cutY,e):e,s=e,r=i?.doors||[],o=i?.windows||[],a=[...r.map(_=>({a:_.a,b:_.b,y0:_.sill??0,y1:Math.min(s,(_.sill??0)+(_.height??2))})),...o.map(_=>{let m=_.sill??.9;return{a:_.a,b:_.b,y0:m,y1:Math.min(s,m+(_.height??1.1))}})],l=[];for(let _ of i?.rooms||[])l.push(dr(_.points,-.05,0));let c=[];for(let _ of i?.bands||[])for(let m of u_(_,a,s))m.y0>=n-1e-6||c.push(dr(m.poly,m.y0,Math.min(m.y1,n)));let h=[];for(let _ of i?.freeWalls||[])h.push(dr(_.poly,0,Math.min(_.height??s,n)));let d=[],u=[];for(let _ of i?.furniture||[])(_.obstacle?u:d).push(dr(_.poly,0,Math.min(_.h??.5,n)));let f=o.map((_,m)=>({w:_,o:a[r.length+m]})).filter(({o:_})=>_.y0<n-1e-6).map(({w:_,o:m})=>d_(_.a,_.b,m.y0,Math.min(m.y1,n))),g=r.map(_=>{let m=_.b[0]-_.a[0],p=_.b[1]-_.a[1],y=Math.hypot(m,p)||1,v=-p/y*.06,x=m/y*.06;return dr([[_.a[0]-v,_.a[1]-x],[_.b[0]-v,_.b[1]-x],[_.b[0]+v,_.b[1]+x],[_.a[0]+v,_.a[1]+x]],0,.012)});return{wallHeight:s,cutY:n,floors:Ti(l),walls:Ti(c),freeWalls:Ti(h),furniture:Ti(d),obstacles:Ti(u),windows:Ti(f),thresholds:Ti(g)}}function Fd(i,t={}){let e=i&&Number.isFinite(i.x1-i.x0)?i:{x0:0,x1:10,z0:0,z1:10},n=(t.fov??40)*Qn,s=t.aspect>0?t.aspect:1.5,r=t.height??2.6,o=Math.max(e.x1-e.x0,1),a=Math.max(e.z1-e.z0,1),l=(e.x0+e.x1)/2,c=(e.z0+e.z1)/2,h=Math.tan(n/2),d=h*s,u,f,g;if(t.view==="top")u=[l,0,c],f=[0,1,1e-4],g=Math.max(a/2/h,o/2/d)*1.08+r;else{u=[l,r*.25,c];let p=50*Qn,y=20*Qn;f=[Math.sin(y)*Math.cos(p),Math.sin(p),Math.cos(y)*Math.cos(p)];let v=go(f),x=go($l(cn(v,-1),[0,1,0])),C=$l(x,cn(v,-1)),A=Math.max(0,Math.min(t.inset??0,(o-1)/2,(a-1)/2)),R=[];for(let P of[e.x0+A,e.x1-A])for(let M of[e.z0+A,e.z1-A])for(let w of[0,r])R.push([P,w,M]);for(let P=0;P<6;P++){g=0;for(let H of R){let N=Id(H,u),X=ns(N,v);g=Math.max(g,X+Math.abs(ns(N,x))/d,X+Math.abs(ns(N,C))/h)}let M=1/0,w=-1/0,I=1/0,L=-1/0;for(let H of R){let N=Id(H,u),X=g-ns(N,v),F=ns(N,x)/X/d,tt=ns(N,C)/X/h;M=Math.min(M,F),w=Math.max(w,F),I=Math.min(I,tt),L=Math.max(L,tt)}let E=(M+w)/2*d*g,B=(I+L)/2*h*g;if(Math.abs(E)<1e-4&&Math.abs(B)<1e-4)break;u=ti(u,ti(cn(x,E),cn(C,B)))}g*=1.04}let _=go(f),m=ti(u,cn(_,g));return{target:u,position:m,distance:g,near:Math.max(.05,g/200),far:g*12+50,minDistance:.5,maxDistance:g*4}}function zd(i,t,e=.05){return!i||!t?!0:["x0","x1","z0","z1"].some(n=>Math.abs(i[n]-t[n])>e)}var Vl=["#2f7de1","#e8832a","#2aa876","#a05bd6","#d6477c","#c9a400","#17a2b8","#7a8794"],Ld={light:{background:"#eef1f4",floor:"#dde2e8",wall:"#b7bfc9",freeWall:"#98a2ae",furniture:"#8d9bb0",obstacle:"#6f819b",window:"#8ec9ff",door:"#c99a55",spill:"#e5484d",sensorBody:"#2b3138",selected:"#f59f00",inactive:"#9aa3ad"},dark:{background:"#12161b",floor:"#242b34",wall:"#4b5666",freeWall:"#5f6b7c",furniture:"#7a89a0",obstacle:"#94a4bd",window:"#4f9fe0",door:"#b98a4a",spill:"#ff6b6b",sensorBody:"#d8dee6",selected:"#ffc53d",inactive:"#6b7480"}};function Bd(i){return i?Ld.dark:Ld.light}function Un(i){if(typeof i!="string")return null;let t=i.trim().toLowerCase(),e=/^#([0-9a-f]{3})$/.exec(t);return e?[...e[1]].map(n=>parseInt(n+n,16)):(e=/^#([0-9a-f]{6})(?:[0-9a-f]{2})?$/.exec(t),e?[0,2,4].map(n=>parseInt(e[1].slice(n,n+2),16)):(e=/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(t),e?[e[1],e[2],e[3]].map(n=>Math.max(0,Math.min(255,Math.round(Number(n))))):null))}function f_(i,t){for(let e of["colour_index","color_index","colourIndex","colorIndex","colour","color"])if(Number.isInteger(i?.[e])&&i[e]>=0)return i[e];return t}function Gl(i,t){let e=Array.isArray(i)&&i.length?i:Vl,n=Un(e[t%e.length]);return n||Un(Vl[t%Vl.length])}function Wl(i,t,e){if(i&&typeof i=="object"&&!Array.isArray(i)){let n=Un(i[t?.entity_id]);if(n)return n}return Gl(Array.isArray(i)?i:null,f_(t,e))}function xo(i,t){let e=new Map;return(i||[]).forEach((n,s)=>e.set(n.entity_id,Wl(t,n,s))),e}function Vd(i,t,e={}){let n=i?.cell||.2,s=i?.step||.2,r=(i?.heights||[]).slice().sort((x,C)=>x-C);if(!t||!r.length)return null;let o=e.colorFor||(()=>[31,95,153]),a=e.spillColor||[229,72,77],l=e.spillStrength??.7,c=e.selected||null,h=e.lights||null,d=(x,C,A,R)=>{let P=h&&h[x];if(!P)return 1;let M=Math.hypot(C-P[0],A-P[1],R-P[2]);return M>(P[3]||6)?.06:.06+.94/(1+(M/1.4)**2)},u=t.x0,f=t.z0,g=Math.max(1,Math.ceil((t.x1-t.x0)/n)),_=Math.max(1,Math.ceil((t.z1-t.z0)/n)),m=r.length,p=new Uint8Array(g*m*_*4),y=new Int16Array(g*m*_).fill(-1),v=new Map;return r.forEach((x,C)=>{for(let A of i.grid?.[String(x)]||[]){let R=Math.floor((A.x-u)/n),P=Math.floor((A.z-f)/n);if(R<0||P<0||R>=g||P>=_)continue;v.has(A.room)||v.set(A.room,v.size),y[(P*m+C)*g+R]=v.get(A.room);let M=A.spill&&A.spill.length>0,w,I;if(M)w=a,I=l*(c&&!A.spill.includes(c)?.3:1);else if(A.own>0&&A.own_sensor)w=o(A.own_sensor),I=Math.min(1,A.own)*d(A.own_sensor,A.x,x,A.z)*(c&&A.own_sensor!==c?.3:1);else continue;let L=((P*m+C)*g+R)*4;p[L]=w[0],p[L+1]=w[1],p[L+2]=w[2],p[L+3]=Math.round(I*255)}}),e.blur>0&&p_(p,y,g,m,_,e.blur),e.dilate&&m_(p,g,m,_),{data:p,nx:g,ny:m,nz:_,origin:[u,r[0]-s/2,f],size:[g*n,m*s,_*n]}}function p_(i,t,e,n,s,r){let o=e*n*s,a=new Float32Array(o*4);for(let d=0;d<o;d++){let u=i[d*4+3]/255;a[d*4]=i[d*4]*u,a[d*4+1]=i[d*4+1]*u,a[d*4+2]=i[d*4+2]*u,a[d*4+3]=u}let l=new Float32Array(o*4),c=[1,e,e*n],h=[e,n,s];for(let d=0;d<r;d++)for(let u=0;u<3;u++){let f=c[u];for(let g=0;g<s;g++)for(let _=0;_<n;_++)for(let m=0;m<e;m++){let p=(g*n+_)*e+m,y=t[p];if(y<0){for(let M=0;M<4;M++)l[p*4+M]=a[p*4+M];continue}let v=u===0?m:u===1?_:g,x=2,C=a[p*4]*2,A=a[p*4+1]*2,R=a[p*4+2]*2,P=a[p*4+3]*2;for(let M of[-1,1]){let w=v+M;if(w<0||w>=h[u])continue;let I=p+M*f;t[I]===y&&(C+=a[I*4],A+=a[I*4+1],R+=a[I*4+2],P+=a[I*4+3],x+=1)}l[p*4]=C/x,l[p*4+1]=A/x,l[p*4+2]=R/x,l[p*4+3]=P/x}[a,l]=[l,a]}for(let d=0;d<o;d++){if(t[d]<0)continue;let u=a[d*4+3];i[d*4+3]=Math.round(Math.min(1,u)*255),u>1e-4&&(i[d*4]=Math.round(Math.min(255,a[d*4]/u)),i[d*4+1]=Math.round(Math.min(255,a[d*4+1]/u)),i[d*4+2]=Math.round(Math.min(255,a[d*4+2]/u)))}}function m_(i,t,e,n){let s=i.slice();for(let r=0;r<n;r++)for(let o=0;o<e;o++)for(let a=0;a<t;a++){let l=((r*e+o)*t+a)*4;if(s[l+3]>0)continue;let c=0,h=0,d=0,u=0,f=0;for(let[g,_]of[[1,0],[-1,0],[0,1],[0,-1]]){let m=a+g,p=r+_;if(m<0||p<0||m>=t||p>=n)continue;let y=((p*e+o)*t+m)*4;s[y+3]!==0&&(c+=s[y],h+=s[y+1],d+=s[y+2],u+=s[y+3],f++)}f&&(i[l]=Math.round(c/f),i[l+1]=Math.round(h/f),i[l+2]=Math.round(d/f),i[l+3]=Math.round(u/f/2))}}function $d(i,t=.2){let e=i>0?i:2.6,n=[];for(let s=t/2;s<e-.05;s+=t)n.push(Math.round(s*1e3)/1e3);return n}function Hd(i,t={}){let e=i?.grid||{},n=(i?.heights||Object.keys(e).map(Number)).filter(u=>Number.isFinite(u)).sort((u,f)=>u-f),s=t.maxY??1/0,r=t.fadeColor||[255,255,255],o=t.spillColor||[229,72,77],a=t.selected||null,l=t.colorFor||(()=>[31,95,153]),c=(u,f)=>[0,1,2].map(g=>Math.round(r[g]+(u[g]-r[g])*f)),h=[],d=[];for(let u of n)if(!(u>s+1e-6))for(let f of e[String(u)]||[]){let g=f.spill&&f.spill.length>0,_=f.own>0&&f.own_sensor;if(!g&&!_)continue;let m;if(g)m=a&&!f.spill.includes(a)?c(o,.25):o;else{let p=.35+.65*Math.min(1,f.own);m=c(l(f.own_sensor),a&&f.own_sensor!==a?p*.25:p)}h.push(f.x,u,f.z),d.push(m[0],m[1],m[2])}return{count:h.length/3,positions:h,colors:d,cell:i?.cell||.2,step:i?.step||.2}}function g_(i){let t=n=>{let s=[...new Set(i.map(o=>Math.round(o[n]*1e4)))].sort((o,a)=>o-a),r=1/0;for(let o=1;o<s.length;o++){let a=s[o]-s[o-1];a>1&&(r=Math.min(r,a))}return r/1e4},e=Math.min(t("x"),t("z"));return Number.isFinite(e)?e:.1}function Gd(i,t){let e=i||[],n=t.cellSize||g_(e),s=t.bounds,r=n/2,o=s.x0-r,a=s.z0-r,l=s.x1+r,c=s.z1+r,h=Math.max(l-o,c-a,1e-6),d=Math.min(t.maxPixels?t.maxPixels/h:2048/h,t.maxPpm??50),u=Math.max(1,Math.ceil((l-o)*d)),f=Math.max(1,Math.ceil((c-a)*d)),g=new Uint8Array(u*f*4),_=t.spillColor||[229,72,77],m=t.selected||null,p=t.colorFor||(()=>[128,128,128]);for(let y of e){let v=y.spill||[],x=v.length>0&&(!m||v.includes(m)),C,A;if(x)C=_,A=.55;else if(y.own>0&&y.own_sensor)C=p(y.own_sensor),A=.2+.55*Math.max(0,Math.min(1,y.own)),m&&y.own_sensor!==m&&(A*=.45);else continue;let R=Math.max(0,Math.round((y.x-n/2-o)*d)),P=Math.min(u,Math.round((y.x+n/2-o)*d)),M=Math.max(0,Math.round((y.z-n/2-a)*d)),w=Math.min(f,Math.round((y.z+n/2-a)*d));P<=R&&(P=Math.min(u,R+1)),w<=M&&(w=Math.min(f,M+1));let I=Math.round(A*255);for(let L=M;L<w;L++)for(let E=R;E<P;E++){let B=(L*u+E)*4;g[B]=C[0],g[B+1]=C[1],g[B+2]=C[2],g[B+3]=I}}return{width:u,height:f,data:g,x0:o,z0:a,x1:l,z1:c,ppm:d,cellSize:n}}var Bi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Vi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},__=0,Wd=1,x_=2;var sp=1,v_=2,Bn=3,di=0,Fe=1,Ae=2,ci=0,hi=1,ta=2,Xd=3,qd=4,Fh=5,Ni=100,y_=101,b_=102,w_=103,M_=104,S_=200,zh=201,E_=202,A_=203,Mc=204,Sr=205,T_=206,R_=207,C_=208,P_=209,I_=210,L_=211,D_=212,U_=213,N_=214,Sc=0,Ec=1,Ac=2,Ss=3,Tc=4,Rc=5,Cc=6,Pc=7,Bh=0,O_=1,k_=2,ui=0,F_=1,z_=2,B_=3,V_=4,$_=5,H_=6,G_=7;var rp=300,Es=301,As=302,Ic=303,Lc=304,Ta=306,Dc=1e3,Vn=1001,Uc=1002,ze=1003,W_=1004;var vo=1005;var Qe=1006,Xl=1007;var ki=1008;var Xe=1009,op=1010,ap=1011,Er=1012,Vh=1013,Gn=1014,Mn=1015,Dr=1016,$h=1017,Hh=1018,Ts=1020,lp=35902,cp=1021,hp=1022,De=1023,up=1024,dp=1025,ys=1026,Rs=1027,Gh=1028,Wh=1029,fp=1030,Xh=1031;var qh=1033,Zo=33776,Ko=33777,Jo=33778,jo=33779,Nc=35840,Oc=35841,kc=35842,Fc=35843,zc=36196,Bc=37492,Vc=37496,$c=37808,Hc=37809,Gc=37810,Wc=37811,Xc=37812,qc=37813,Yc=37814,Zc=37815,Kc=37816,Jc=37817,jc=37818,Qc=37819,th=37820,eh=37821,Qo=36492,nh=36494,ih=36495,pp=36283,sh=36284,rh=36285,oh=36286;var ea=2300,ah=2301,ql=2302,Yd=2400,Zd=2401,Kd=2402;var X_=3200,q_=3201;var mp=0,Y_=1,ai="",Ie="srgb",Ns="srgb-linear",Ra="linear",se="srgb";var is=7680;var Jd=519,Z_=512,K_=513,J_=514,gp=515,j_=516,Q_=517,t0=518,e0=519,jd=35044;var Qd="300 es",$n=2e3,na=2001,Wn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],tf=1234567,bs=Math.PI/180,Ar=180/Math.PI;function Os(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function ke(i,t,e){return Math.max(t,Math.min(e,i))}function Yh(i,t){return(i%t+t)%t}function n0(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function i0(i,t,e){return i!==t?(e-i)/(t-i):0}function wr(i,t,e){return(1-e)*i+e*t}function s0(i,t,e,n){return wr(i,t,1-Math.exp(-e*n))}function r0(i,t=1){return t-Math.abs(Yh(i,t*2)-t)}function o0(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function a0(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function l0(i,t){return i+Math.floor(Math.random()*(t-i+1))}function c0(i,t){return i+Math.random()*(t-i)}function h0(i){return i*(.5-Math.random())}function u0(i){i!==void 0&&(tf=i);let t=tf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function d0(i){return i*bs}function f0(i){return i*Ar}function p0(i){return(i&i-1)===0&&i!==0}function m0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function g0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function _0(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*d,l*u,a*c);break;case"YZY":i.set(l*u,a*h,l*d,a*c);break;case"ZXZ":i.set(l*d,l*u,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function xs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function $e(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var _p={DEG2RAD:bs,RAD2DEG:Ar,generateUUID:Os,clamp:ke,euclideanModulo:Yh,mapLinear:n0,inverseLerp:i0,lerp:wr,damp:s0,pingpong:r0,smoothstep:o0,smootherstep:a0,randInt:l0,randFloat:c0,randFloatSpread:h0,seededRandom:u0,degToRad:d0,radToDeg:f0,isPowerOfTwo:p0,ceilPowerOfTwo:m0,floorPowerOfTwo:g0,setQuaternionFromProperEuler:_0,normalize:$e,denormalize:xs},Ct=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ke(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ot=class i{constructor(t,e,n,s,r,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],y=s[1],v=s[4],x=s[7],C=s[2],A=s[5],R=s[8];return r[0]=o*_+a*y+l*C,r[3]=o*m+a*v+l*A,r[6]=o*p+a*x+l*R,r[1]=c*_+h*y+d*C,r[4]=c*m+h*v+d*A,r[7]=c*p+h*x+d*R,r[2]=u*_+f*y+g*C,r[5]=u*m+f*v+g*A,r[8]=u*p+f*x+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=e*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=u*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Yl.makeScale(t,e)),this}rotate(t){return this.premultiply(Yl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Yl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Yl=new Ot;function xp(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ia(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function x0(){let i=ia("canvas");return i.style.display="block",i}var ef={};function yr(i){i in ef||(ef[i]=!0,console.warn(i))}function v0(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function y0(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function b0(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var qt={enabled:!0,workingColorSpace:Ns,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===se&&(i.r=Hn(i.r),i.g=Hn(i.g),i.b=Hn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===se&&(i.r=ws(i.r),i.g=ws(i.g),i.b=ws(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ai?Ra:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Hn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ws(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var nf=[.64,.33,.3,.6,.15,.06],sf=[.2126,.7152,.0722],rf=[.3127,.329],of=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),af=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[Ns]:{primaries:nf,whitePoint:rf,transfer:Ra,toXYZ:of,fromXYZ:af,luminanceCoefficients:sf,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:nf,whitePoint:rf,transfer:se,toXYZ:of,fromXYZ:af,luminanceCoefficients:sf,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}});var ss,lh=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ss===void 0&&(ss=ia("canvas")),ss.width=t.width,ss.height=t.height;let n=ss.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ss}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ia("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Hn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Hn(e[n]/255)*255):e[n]=Hn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},w0=0,sa=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:w0++}),this.uuid=Os(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Zl(s[o].image)):r.push(Zl(s[o]))}else r=Zl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Zl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?lh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var M0=0,tn=class i extends Wn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Vn,s=Vn,r=Qe,o=ki,a=De,l=Xe,c=i.DEFAULT_ANISOTROPY,h=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=Os(),this.name="",this.source=new sa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==rp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Dc:t.x=t.x-Math.floor(t.x);break;case Vn:t.x=t.x<0?0:1;break;case Uc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Dc:t.y=t.y-Math.floor(t.y);break;case Vn:t.y=t.y<0?0:1;break;case Uc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=rp;tn.DEFAULT_ANISOTROPY=1;var _e=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(c+1)/2,x=(f+1)/2,C=(p+1)/2,A=(h+u)/4,R=(d+_)/4,P=(g+m)/4;return v>x&&v>C?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=A/n,r=R/n):x>C?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=A/s,r=P/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=R/r,s=P/r),this.set(n,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-_)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ch=class extends Wn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new tn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new sa(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},pn=class extends ch{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ra=class extends tn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Cs=class extends tn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var mn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==u||c!==f||h!==g){let m=1-a,p=l*u+c*f+h*g+d*_,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let C=Math.sqrt(v),A=Math.atan2(C,p*y);m=Math.sin(m*A)/C,a=Math.sin(a*A)/C}let x=a*y;if(l=l*m+u*x,c=c*m+f*x,h=h*m+g*x,d=d*m+_*x,m===1-a){let C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-a*f,t[e+2]=c*g+h*f+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),d=a(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ke(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},z=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(lf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(lf.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Kl.copy(this).projectOnVector(t),this.sub(Kl)}reflect(t){return this.sub(Kl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ke(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Kl=new z,lf=new mn,Xn=class{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,hn):hn.fromBufferAttribute(r,o),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),yo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),yo.copy(n.boundingBox)),yo.applyMatrix4(t.matrixWorld),this.union(yo)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fr),bo.subVectors(this.max,fr),rs.subVectors(t.a,fr),os.subVectors(t.b,fr),as.subVectors(t.c,fr),ei.subVectors(os,rs),ni.subVectors(as,os),Ri.subVectors(rs,as);let e=[0,-ei.z,ei.y,0,-ni.z,ni.y,0,-Ri.z,Ri.y,ei.z,0,-ei.x,ni.z,0,-ni.x,Ri.z,0,-Ri.x,-ei.y,ei.x,0,-ni.y,ni.x,0,-Ri.y,Ri.x,0];return!Jl(e,rs,os,as,bo)||(e=[1,0,0,0,1,0,0,0,1],!Jl(e,rs,os,as,bo))?!1:(wo.crossVectors(ei,ni),e=[wo.x,wo.y,wo.z],Jl(e,rs,os,as,bo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Nn=[new z,new z,new z,new z,new z,new z,new z,new z],hn=new z,yo=new Xn,rs=new z,os=new z,as=new z,ei=new z,ni=new z,Ri=new z,fr=new z,bo=new z,wo=new z,Ci=new z;function Jl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ci.fromArray(i,r);let a=s.x*Math.abs(Ci.x)+s.y*Math.abs(Ci.y)+s.z*Math.abs(Ci.z),l=t.dot(Ci),c=e.dot(Ci),h=n.dot(Ci);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var S0=new Xn,pr=new z,jl=new z,qn=class{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):S0.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;pr.subVectors(t,this.center);let e=pr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(pr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(jl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(pr.copy(t.center).add(jl)),this.expandByPoint(pr.copy(t.center).sub(jl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},On=new z,Ql=new z,Mo=new z,ii=new z,tc=new z,So=new z,ec=new z,fi=class{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,On)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=On.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(On.copy(this.origin).addScaledVector(this.direction,e),On.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ql.copy(t).add(e).multiplyScalar(.5),Mo.copy(e).sub(t).normalize(),ii.copy(this.origin).sub(Ql);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Mo),a=ii.dot(this.direction),l=-ii.dot(Mo),c=ii.lengthSq(),h=Math.abs(1-o*o),d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ql).addScaledVector(Mo,u),f}intersectSphere(t,e){On.subVectors(t.center,this.origin);let n=On.dot(this.direction),s=On.dot(On)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,On)!==null}intersectTriangle(t,e,n,s,r){tc.subVectors(e,t),So.subVectors(n,t),ec.crossVectors(tc,So);let o=this.direction.dot(ec),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ii.subVectors(this.origin,t);let l=a*this.direction.dot(So.crossVectors(ii,So));if(l<0)return null;let c=a*this.direction.dot(tc.cross(ii));if(c<0||l+c>o)return null;let h=-a*ii.dot(ec);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},te=class i{constructor(t,e,n,s,r,o,a,l,c,h,d,u,f,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,d,u,f,g,_,m)}set(t,e,n,s,r,o,a,l,c,h,d,u,f,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/ls.setFromMatrixColumn(t,0).length(),r=1/ls.setFromMatrixColumn(t,1).length(),o=1/ls.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u+_*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u-_*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,f=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,f=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-_*d}else if(t.order==="XZY"){let u=o*l,f=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(E0,t,A0)}lookAt(t,e,n){let s=this.elements;return Je.subVectors(t,e),Je.lengthSq()===0&&(Je.z=1),Je.normalize(),si.crossVectors(n,Je),si.lengthSq()===0&&(Math.abs(n.z)===1?Je.x+=1e-4:Je.z+=1e-4,Je.normalize(),si.crossVectors(n,Je)),si.normalize(),Eo.crossVectors(Je,si),s[0]=si.x,s[4]=Eo.x,s[8]=Je.x,s[1]=si.y,s[5]=Eo.y,s[9]=Je.y,s[2]=si.z,s[6]=Eo.z,s[10]=Je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],y=n[3],v=n[7],x=n[11],C=n[15],A=s[0],R=s[4],P=s[8],M=s[12],w=s[1],I=s[5],L=s[9],E=s[13],B=s[2],H=s[6],N=s[10],X=s[14],F=s[3],tt=s[7],J=s[11],ct=s[15];return r[0]=o*A+a*w+l*B+c*F,r[4]=o*R+a*I+l*H+c*tt,r[8]=o*P+a*L+l*N+c*J,r[12]=o*M+a*E+l*X+c*ct,r[1]=h*A+d*w+u*B+f*F,r[5]=h*R+d*I+u*H+f*tt,r[9]=h*P+d*L+u*N+f*J,r[13]=h*M+d*E+u*X+f*ct,r[2]=g*A+_*w+m*B+p*F,r[6]=g*R+_*I+m*H+p*tt,r[10]=g*P+_*L+m*N+p*J,r[14]=g*M+_*E+m*X+p*ct,r[3]=y*A+v*w+x*B+C*F,r[7]=y*R+v*I+x*H+C*tt,r[11]=y*P+v*L+x*N+C*J,r[15]=y*M+v*E+x*X+C*ct,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*l*d-s*c*d-r*a*u+n*c*u+s*a*f-n*l*f)+_*(+e*l*f-e*c*u+r*o*u-s*o*f+s*c*h-r*l*h)+m*(+e*c*d-e*a*f-r*o*d+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-e*l*d+e*a*u+s*o*d-n*o*u+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],y=d*m*c-_*u*c+_*l*f-a*m*f-d*l*p+a*u*p,v=g*u*c-h*m*c-g*l*f+o*m*f+h*l*p-o*u*p,x=h*_*c-g*d*c+g*a*f-o*_*f-h*a*p+o*d*p,C=g*d*l-h*_*l-g*a*u+o*_*u+h*a*m-o*d*m,A=e*y+n*v+s*x+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/A;return t[0]=y*R,t[1]=(_*u*r-d*m*r-_*s*f+n*m*f+d*s*p-n*u*p)*R,t[2]=(a*m*r-_*l*r+_*s*c-n*m*c-a*s*p+n*l*p)*R,t[3]=(d*l*r-a*u*r-d*s*c+n*u*c+a*s*f-n*l*f)*R,t[4]=v*R,t[5]=(h*m*r-g*u*r+g*s*f-e*m*f-h*s*p+e*u*p)*R,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*R,t[7]=(o*u*r-h*l*r+h*s*c-e*u*c-o*s*f+e*l*f)*R,t[8]=x*R,t[9]=(g*d*r-h*_*r-g*n*f+e*_*f+h*n*p-e*d*p)*R,t[10]=(o*_*r-g*a*r+g*n*c-e*_*c-o*n*p+e*a*p)*R,t[11]=(h*a*r-o*d*r-h*n*c+e*d*c+o*n*f-e*a*f)*R,t[12]=C*R,t[13]=(h*_*s-g*d*s+g*n*u-e*_*u-h*n*m+e*d*m)*R,t[14]=(g*a*s-o*_*s-g*n*l+e*_*l+o*n*m-e*a*m)*R,t[15]=(o*d*s-h*a*s+h*n*l-e*d*l-o*n*u+e*a*u)*R,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,_=o*h,m=o*d,p=a*d,y=l*c,v=l*h,x=l*d,C=n.x,A=n.y,R=n.z;return s[0]=(1-(_+p))*C,s[1]=(f+x)*C,s[2]=(g-v)*C,s[3]=0,s[4]=(f-x)*A,s[5]=(1-(u+p))*A,s[6]=(m+y)*A,s[7]=0,s[8]=(g+v)*R,s[9]=(m-y)*R,s[10]=(1-(u+_))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=ls.set(s[0],s[1],s[2]).length(),o=ls.set(s[4],s[5],s[6]).length(),a=ls.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],un.copy(this);let c=1/r,h=1/o,d=1/a;return un.elements[0]*=c,un.elements[1]*=c,un.elements[2]*=c,un.elements[4]*=h,un.elements[5]*=h,un.elements[6]*=h,un.elements[8]*=d,un.elements[9]*=d,un.elements[10]*=d,e.setFromRotationMatrix(un),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=$n){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),u=(n+s)/(n-s),f,g;if(a===$n)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===na)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=$n){let l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(o-r),u=(e+t)*c,f=(n+s)*h,g,_;if(a===$n)g=(o+r)*d,_=-2*d;else if(a===na)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ls=new z,un=new te,E0=new z(0,0,0),A0=new z(1,1,1),si=new z,Eo=new z,Je=new z,cf=new te,hf=new mn,En=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return cf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(cf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return hf.setFromEuler(this),this.setFromQuaternion(hf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};En.DEFAULT_ORDER="XYZ";var Tr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},T0=0,uf=new z,cs=new mn,kn=new te,Ao=new z,mr=new z,R0=new z,C0=new mn,df=new z(1,0,0),ff=new z(0,1,0),pf=new z(0,0,1),mf={type:"added"},P0={type:"removed"},hs={type:"childadded",child:null},nc={type:"childremoved",child:null},Be=class i extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:T0++}),this.uuid=Os(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new z,e=new En,n=new mn,s=new z(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new te},normalMatrix:{value:new Ot}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return cs.setFromAxisAngle(t,e),this.quaternion.multiply(cs),this}rotateOnWorldAxis(t,e){return cs.setFromAxisAngle(t,e),this.quaternion.premultiply(cs),this}rotateX(t){return this.rotateOnAxis(df,t)}rotateY(t){return this.rotateOnAxis(ff,t)}rotateZ(t){return this.rotateOnAxis(pf,t)}translateOnAxis(t,e){return uf.copy(t).applyQuaternion(this.quaternion),this.position.add(uf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(df,t)}translateY(t){return this.translateOnAxis(ff,t)}translateZ(t){return this.translateOnAxis(pf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ao.copy(t):Ao.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(mr,Ao,this.up):kn.lookAt(Ao,mr,this.up),this.quaternion.setFromRotationMatrix(kn),s&&(kn.extractRotation(s.matrixWorld),cs.setFromRotationMatrix(kn),this.quaternion.premultiply(cs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(mf),hs.child=t,this.dispatchEvent(hs),hs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(P0),nc.child=t,this.dispatchEvent(nc),nc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(mf),hs.child=t,this.dispatchEvent(hs),hs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,t,R0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,C0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Be.DEFAULT_UP=new z(0,1,0);Be.DEFAULT_MATRIX_AUTO_UPDATE=!0;Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var dn=new z,Fn=new z,ic=new z,zn=new z,us=new z,ds=new z,gf=new z,sc=new z,rc=new z,oc=new z,ac=new _e,lc=new _e,cc=new _e,li=class i{constructor(t=new z,e=new z,n=new z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),dn.subVectors(t,e),s.cross(dn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){dn.subVectors(s,e),Fn.subVectors(n,e),ic.subVectors(t,e);let o=dn.dot(dn),a=dn.dot(Fn),l=dn.dot(ic),c=Fn.dot(Fn),h=Fn.dot(ic),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,zn.x),l.addScaledVector(o,zn.y),l.addScaledVector(a,zn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return ac.setScalar(0),lc.setScalar(0),cc.setScalar(0),ac.fromBufferAttribute(t,e),lc.fromBufferAttribute(t,n),cc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ac,r.x),o.addScaledVector(lc,r.y),o.addScaledVector(cc,r.z),o}static isFrontFacing(t,e,n,s){return dn.subVectors(n,e),Fn.subVectors(t,e),dn.cross(Fn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),dn.cross(Fn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;us.subVectors(s,n),ds.subVectors(r,n),sc.subVectors(t,n);let l=us.dot(sc),c=ds.dot(sc);if(l<=0&&c<=0)return e.copy(n);rc.subVectors(t,s);let h=us.dot(rc),d=ds.dot(rc);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(us,o);oc.subVectors(t,r);let f=us.dot(oc),g=ds.dot(oc);if(g>=0&&f<=g)return e.copy(r);let _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(ds,a);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return gf.subVectors(r,s),a=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(gf,a);let p=1/(m+_+u);return o=_*p,a=u*p,e.copy(n).addScaledVector(us,o).addScaledVector(ds,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},vp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},To={h:0,s:0,l:0};function hc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Vt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=qt.workingColorSpace){if(t=Yh(t,1),e=ke(e,0,1),n=ke(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=hc(o,r,t+1/3),this.g=hc(o,r,t),this.b=hc(o,r,t-1/3)}return qt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ie){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){let n=vp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Hn(t.r),this.g=Hn(t.g),this.b=Hn(t.b),this}copyLinearToSRGB(t){return this.r=ws(t.r),this.g=ws(t.g),this.b=ws(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return qt.fromWorkingColorSpace(Oe.copy(this),t),Math.round(ke(Oe.r*255,0,255))*65536+Math.round(ke(Oe.g*255,0,255))*256+Math.round(ke(Oe.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(Oe.copy(this),e);let n=Oe.r,s=Oe.g,r=Oe.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=Ie){qt.fromWorkingColorSpace(Oe.copy(this),t);let e=Oe.r,n=Oe.g,s=Oe.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ri),this.setHSL(ri.h+t,ri.s+e,ri.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ri),t.getHSL(To);let n=wr(ri.h,To.h,e),s=wr(ri.s,To.s,e),r=wr(ri.l,To.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Oe=new Vt;Vt.NAMES=vp;var I0=0,Yn=class extends Wn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:I0++}),this.uuid=Os(),this.name="",this.blending=hi,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mc,this.blendDst=Sr,this.blendEquation=Ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=Ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=is,this.stencilZFail=is,this.stencilZPass=is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hi&&(n.blending=this.blending),this.side!==di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Mc&&(n.blendSrc=this.blendSrc),this.blendDst!==Sr&&(n.blendDst=this.blendDst),this.blendEquation!==Ni&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ss&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==is&&(n.stencilFail=this.stencilFail),this.stencilZFail!==is&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==is&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},gn=class extends Yn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Bh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Me=new z,Ro=new Ct,ye=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=jd,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ro.fromBufferAttribute(this,e),Ro.applyMatrix3(t),this.setXY(e,Ro.x,Ro.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=xs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=$e(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=xs(e,this.array)),e}setX(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=xs(e,this.array)),e}setY(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=xs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=xs(e,this.array)),e}setW(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),n=$e(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),n=$e(n,this.array),s=$e(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),n=$e(n,this.array),s=$e(s,this.array),r=$e(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==jd&&(t.usage=this.usage),t}};var oa=class extends ye{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var aa=class extends ye{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var We=class extends ye{constructor(t,e,n){super(new Float32Array(t),e,n)}},L0=0,sn=new te,uc=new Be,fs=new z,je=new Xn,gr=new Xn,Pe=new z,Ve=class i extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:L0++}),this.uuid=Os(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(xp(t)?aa:oa)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return uc.lookAt(t),uc.updateMatrix(),this.applyMatrix4(uc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new We(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];je.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){let n=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];gr.setFromBufferAttribute(a),this.morphTargetsRelative?(Pe.addVectors(je.min,gr.min),je.expandByPoint(Pe),Pe.addVectors(je.max,gr.max),je.expandByPoint(Pe)):(je.expandByPoint(gr.min),je.expandByPoint(gr.max))}je.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Pe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Pe.fromBufferAttribute(a,c),l&&(fs.fromBufferAttribute(t,c),Pe.add(fs)),s=Math.max(s,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ye(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new z,l[P]=new z;let c=new z,h=new z,d=new z,u=new Ct,f=new Ct,g=new Ct,_=new z,m=new z;function p(P,M,w){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,w),u.fromBufferAttribute(r,P),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,w),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(I),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(I),a[P].add(_),a[M].add(_),a[w].add(_),l[P].add(m),l[M].add(m),l[w].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let P=0,M=y.length;P<M;++P){let w=y[P],I=w.start,L=w.count;for(let E=I,B=I+L;E<B;E+=3)p(t.getX(E+0),t.getX(E+1),t.getX(E+2))}let v=new z,x=new z,C=new z,A=new z;function R(P){C.fromBufferAttribute(s,P),A.copy(C);let M=a[P];v.copy(M),v.sub(C.multiplyScalar(C.dot(M))).normalize(),x.crossVectors(A,M);let I=x.dot(l[P])<0?-1:1;o.setXYZW(P,v.x,v.y,v.z,I)}for(let P=0,M=y.length;P<M;++P){let w=y[P],I=w.start,L=w.count;for(let E=I,B=I+L;E<B;E+=3)R(t.getX(E+0)),R(t.getX(E+1)),R(t.getX(E+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ye(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new z,r=new z,o=new z,a=new z,l=new z,c=new z,h=new z,d=new z;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new ye(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},_f=new te,Pi=new fi,Co=new qn,xf=new z,Po=new z,Io=new z,Lo=new z,dc=new z,Do=new z,vf=new z,Uo=new z,xe=class extends Be{constructor(t=new Ve,e=new gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Do.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(dc.fromBufferAttribute(d,t),o?Do.addScaledVector(dc,h):Do.addScaledVector(dc.sub(e),h))}e.add(Do)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Co.copy(n.boundingSphere),Co.applyMatrix4(r),Pi.copy(t.ray).recast(t.near),!(Co.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(Co,xf)===null||Pi.origin.distanceToSquared(xf)>(t.far-t.near)**2))&&(_f.copy(r).invert(),Pi.copy(t.ray).applyMatrix4(_f),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Pi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=y,C=v;x<C;x+=3){let A=a.getX(x),R=a.getX(x+1),P=a.getX(x+2);s=No(this,p,t,n,c,h,d,A,R,P),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let y=a.getX(m),v=a.getX(m+1),x=a.getX(m+2);s=No(this,o,t,n,c,h,d,y,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=y,C=v;x<C;x+=3){let A=x,R=x+1,P=x+2;s=No(this,p,t,n,c,h,d,A,R,P),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let y=m,v=m+1,x=m+2;s=No(this,o,t,n,c,h,d,y,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function D0(i,t,e,n,s,r,o,a){let l;if(t.side===Fe?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===di,a),l===null)return null;Uo.copy(a),Uo.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Uo);return c<e.near||c>e.far?null:{distance:c,point:Uo.clone(),object:i}}function No(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Po),i.getVertexPosition(l,Io),i.getVertexPosition(c,Lo);let h=D0(i,t,e,n,Po,Io,Lo,vf);if(h){let d=new z;li.getBarycoord(vf,Po,Io,Lo,d),s&&(h.uv=li.getInterpolatedAttribute(s,a,l,c,d,new Ct)),r&&(h.uv1=li.getInterpolatedAttribute(r,a,l,c,d,new Ct)),o&&(h.normal=li.getInterpolatedAttribute(o,a,l,c,d,new z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new z,materialIndex:0};li.getNormal(Po,Io,Lo,u.normal),h.face=u,h.barycoord=d}return h}var _n=class i extends Ve{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new We(c,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(d,2));function g(_,m,p,y,v,x,C,A,R,P,M){let w=x/R,I=C/P,L=x/2,E=C/2,B=A/2,H=R+1,N=P+1,X=0,F=0,tt=new z;for(let J=0;J<N;J++){let ct=J*I-E;for(let ft=0;ft<H;ft++){let Et=ft*w-L;tt[_]=Et*y,tt[m]=ct*v,tt[p]=B,c.push(tt.x,tt.y,tt.z),tt[_]=0,tt[m]=0,tt[p]=A>0?1:-1,h.push(tt.x,tt.y,tt.z),d.push(ft/R),d.push(1-J/P),X+=1}}for(let J=0;J<P;J++)for(let ct=0;ct<R;ct++){let ft=u+ct+H*J,Et=u+ct+H*(J+1),V=u+(ct+1)+H*(J+1),Z=u+(ct+1)+H*J;l.push(ft,Et,Z),l.push(Et,V,Z),F+=6}a.addGroup(f,F,M),f+=F,u+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ps(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function He(i){let t={};for(let e=0;e<i.length;e++){let n=Ps(i[e]);for(let s in n)t[s]=n[s]}return t}function U0(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function yp(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}var N0={clone:Ps,merge:He},O0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,k0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,rn=class extends Yn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=O0,this.fragmentShader=k0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ps(t.uniforms),this.uniformsGroups=U0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},la=class extends Be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=$n}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},oi=new z,yf=new Ct,bf=new Ct,Ge=class extends la{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ar*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(bs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ar*2*Math.atan(Math.tan(bs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(oi.x,oi.y).multiplyScalar(-t/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-t/oi.z)}getViewSize(t,e){return this.getViewBounds(t,yf,bf),e.subVectors(bf,yf)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(bs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ps=-90,ms=1,hh=class extends Be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ge(ps,ms,t,e);s.layers=this.layers,this.add(s);let r=new Ge(ps,ms,t,e);r.layers=this.layers,this.add(r);let o=new Ge(ps,ms,t,e);o.layers=this.layers,this.add(o);let a=new Ge(ps,ms,t,e);a.layers=this.layers,this.add(a);let l=new Ge(ps,ms,t,e);l.layers=this.layers,this.add(l);let c=new Ge(ps,ms,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===$n)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===na)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},ca=class extends tn{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Es,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},uh=class extends pn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ca(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Qe}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new _n(5,5,5),r=new rn({name:"CubemapFromEquirect",uniforms:Ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fe,blending:ci});r.uniforms.tEquirect.value=e;let o=new xe(s,r),a=e.minFilter;return e.minFilter===ki&&(e.minFilter=Qe),new hh(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},fc=new z,F0=new z,z0=new Ot,fn=class{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=fc.subVectors(n,e).cross(F0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(fc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||z0.getNormalMatrix(t),s=this.coplanarPoint(fc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ii=new qn,Oo=new z,Rr=class{constructor(t=new fn,e=new fn,n=new fn,s=new fn,r=new fn,o=new fn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=$n){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],y=s[13],v=s[14],x=s[15];if(n[0].setComponents(l-r,u-c,m-f,x-p).normalize(),n[1].setComponents(l+r,u+c,m+f,x+p).normalize(),n[2].setComponents(l+o,u+h,m+g,x+y).normalize(),n[3].setComponents(l-o,u-h,m-g,x-y).normalize(),n[4].setComponents(l-a,u-d,m-_,x-v).normalize(),e===$n)n[5].setComponents(l+a,u+d,m+_,x+v).normalize();else if(e===na)n[5].setComponents(a,d,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ii.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ii.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ii)}intersectsSprite(t){return Ii.center.set(0,0,0),Ii.radius=.7071067811865476,Ii.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ii)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Oo.x=s.normal.x>0?t.max.x:t.min.x,Oo.y=s.normal.y>0?t.max.y:t.min.y,Oo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Oo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function bp(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function B0(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let _=d[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var ha=class i extends Ve{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,d=t/a,u=e/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let y=p*u-o;for(let v=0;v<c;v++){let x=v*d-r;g.push(x,-y,0),_.push(0,0,1),m.push(v/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){let v=y+c*p,x=y+c*(p+1),C=y+1+c*(p+1),A=y+1+c*p;f.push(v,x,A),f.push(x,C,A)}this.setIndex(f),this.setAttribute("position",new We(g,3)),this.setAttribute("normal",new We(_,3)),this.setAttribute("uv",new We(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},V0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$0=`#ifdef USE_ALPHAHASH
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
#endif`,H0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,G0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,W0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,X0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,q0=`#ifdef USE_AOMAP
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
#endif`,Y0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Z0=`#ifdef USE_BATCHING
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
#endif`,K0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,J0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,j0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Q0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tx=`#ifdef USE_IRIDESCENCE
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
#endif`,ex=`#ifdef USE_BUMPMAP
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
#endif`,nx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ix=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ox=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ax=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,cx=`#if defined( USE_COLOR_ALPHA )
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
#endif`,hx=`#define PI 3.141592653589793
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
} // validated`,ux=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,dx=`vec3 transformedNormal = objectNormal;
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
#endif`,fx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,px=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_x="gl_FragColor = linearToOutputTexel( gl_FragColor );",xx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vx=`#ifdef USE_ENVMAP
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
#endif`,yx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,bx=`#ifdef USE_ENVMAP
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
#endif`,wx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mx=`#ifdef USE_ENVMAP
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
#endif`,Sx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ex=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ax=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rx=`#ifdef USE_GRADIENTMAP
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
}`,Cx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Px=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ix=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lx=`uniform bool receiveShadow;
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
#endif`,Dx=`#ifdef USE_ENVMAP
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
#endif`,Ux=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ox=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Fx=`PhysicalMaterial material;
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
#endif`,zx=`struct PhysicalMaterial {
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
}`,Bx=`
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
#endif`,Vx=`#if defined( RE_IndirectDiffuse )
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
#endif`,$x=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gx=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xx=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Kx=`#if defined( USE_POINTS_UV )
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
#endif`,Jx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ev=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nv=`#ifdef USE_MORPHTARGETS
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
#endif`,iv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,rv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ov=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,av=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cv=`#ifdef USE_NORMALMAP
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
#endif`,hv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_v=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ev=`float getShadowMask() {
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
}`,Av=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tv=`#ifdef USE_SKINNING
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
#endif`,Rv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cv=`#ifdef USE_SKINNING
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
#endif`,Pv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Iv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Uv=`#ifdef USE_TRANSMISSION
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
#endif`,Nv=`#ifdef USE_TRANSMISSION
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
#endif`,Ov=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Bv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vv=`uniform sampler2D t2D;
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
}`,$v=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Gv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xv=`#include <common>
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
}`,qv=`#if DEPTH_PACKING == 3200
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
}`,Yv=`#define DISTANCE
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
}`,Zv=`#define DISTANCE
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
}`,Kv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jv=`uniform float scale;
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
}`,Qv=`uniform vec3 diffuse;
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
}`,ty=`#include <common>
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
}`,ey=`uniform vec3 diffuse;
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
}`,ny=`#define LAMBERT
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
}`,iy=`#define LAMBERT
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
}`,sy=`#define MATCAP
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
}`,ry=`#define MATCAP
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
}`,oy=`#define NORMAL
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
}`,ay=`#define NORMAL
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
}`,ly=`#define PHONG
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
}`,cy=`#define PHONG
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
}`,hy=`#define STANDARD
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
}`,uy=`#define STANDARD
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
}`,dy=`#define TOON
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
}`,fy=`#define TOON
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
}`,py=`uniform float size;
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
}`,my=`uniform vec3 diffuse;
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
}`,gy=`#include <common>
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
}`,_y=`uniform vec3 color;
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
}`,xy=`uniform float rotation;
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
}`,vy=`uniform vec3 diffuse;
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
}`,zt={alphahash_fragment:V0,alphahash_pars_fragment:$0,alphamap_fragment:H0,alphamap_pars_fragment:G0,alphatest_fragment:W0,alphatest_pars_fragment:X0,aomap_fragment:q0,aomap_pars_fragment:Y0,batching_pars_vertex:Z0,batching_vertex:K0,begin_vertex:J0,beginnormal_vertex:j0,bsdfs:Q0,iridescence_fragment:tx,bumpmap_pars_fragment:ex,clipping_planes_fragment:nx,clipping_planes_pars_fragment:ix,clipping_planes_pars_vertex:sx,clipping_planes_vertex:rx,color_fragment:ox,color_pars_fragment:ax,color_pars_vertex:lx,color_vertex:cx,common:hx,cube_uv_reflection_fragment:ux,defaultnormal_vertex:dx,displacementmap_pars_vertex:fx,displacementmap_vertex:px,emissivemap_fragment:mx,emissivemap_pars_fragment:gx,colorspace_fragment:_x,colorspace_pars_fragment:xx,envmap_fragment:vx,envmap_common_pars_fragment:yx,envmap_pars_fragment:bx,envmap_pars_vertex:wx,envmap_physical_pars_fragment:Dx,envmap_vertex:Mx,fog_vertex:Sx,fog_pars_vertex:Ex,fog_fragment:Ax,fog_pars_fragment:Tx,gradientmap_pars_fragment:Rx,lightmap_pars_fragment:Cx,lights_lambert_fragment:Px,lights_lambert_pars_fragment:Ix,lights_pars_begin:Lx,lights_toon_fragment:Ux,lights_toon_pars_fragment:Nx,lights_phong_fragment:Ox,lights_phong_pars_fragment:kx,lights_physical_fragment:Fx,lights_physical_pars_fragment:zx,lights_fragment_begin:Bx,lights_fragment_maps:Vx,lights_fragment_end:$x,logdepthbuf_fragment:Hx,logdepthbuf_pars_fragment:Gx,logdepthbuf_pars_vertex:Wx,logdepthbuf_vertex:Xx,map_fragment:qx,map_pars_fragment:Yx,map_particle_fragment:Zx,map_particle_pars_fragment:Kx,metalnessmap_fragment:Jx,metalnessmap_pars_fragment:jx,morphinstance_vertex:Qx,morphcolor_vertex:tv,morphnormal_vertex:ev,morphtarget_pars_vertex:nv,morphtarget_vertex:iv,normal_fragment_begin:sv,normal_fragment_maps:rv,normal_pars_fragment:ov,normal_pars_vertex:av,normal_vertex:lv,normalmap_pars_fragment:cv,clearcoat_normal_fragment_begin:hv,clearcoat_normal_fragment_maps:uv,clearcoat_pars_fragment:dv,iridescence_pars_fragment:fv,opaque_fragment:pv,packing:mv,premultiplied_alpha_fragment:gv,project_vertex:_v,dithering_fragment:xv,dithering_pars_fragment:vv,roughnessmap_fragment:yv,roughnessmap_pars_fragment:bv,shadowmap_pars_fragment:wv,shadowmap_pars_vertex:Mv,shadowmap_vertex:Sv,shadowmask_pars_fragment:Ev,skinbase_vertex:Av,skinning_pars_vertex:Tv,skinning_vertex:Rv,skinnormal_vertex:Cv,specularmap_fragment:Pv,specularmap_pars_fragment:Iv,tonemapping_fragment:Lv,tonemapping_pars_fragment:Dv,transmission_fragment:Uv,transmission_pars_fragment:Nv,uv_pars_fragment:Ov,uv_pars_vertex:kv,uv_vertex:Fv,worldpos_vertex:zv,background_vert:Bv,background_frag:Vv,backgroundCube_vert:$v,backgroundCube_frag:Hv,cube_vert:Gv,cube_frag:Wv,depth_vert:Xv,depth_frag:qv,distanceRGBA_vert:Yv,distanceRGBA_frag:Zv,equirect_vert:Kv,equirect_frag:Jv,linedashed_vert:jv,linedashed_frag:Qv,meshbasic_vert:ty,meshbasic_frag:ey,meshlambert_vert:ny,meshlambert_frag:iy,meshmatcap_vert:sy,meshmatcap_frag:ry,meshnormal_vert:oy,meshnormal_frag:ay,meshphong_vert:ly,meshphong_frag:cy,meshphysical_vert:hy,meshphysical_frag:uy,meshtoon_vert:dy,meshtoon_frag:fy,points_vert:py,points_frag:my,shadow_vert:gy,shadow_frag:_y,sprite_vert:xy,sprite_frag:vy},ot={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},wn={basic:{uniforms:He([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:He([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Vt(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:He([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:He([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:He([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new Vt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:He([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:He([ot.points,ot.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:He([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:He([ot.common,ot.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:He([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:He([ot.sprite,ot.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:He([ot.common,ot.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:He([ot.lights,ot.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};wn.physical={uniforms:He([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};var ko={r:0,b:0,g:0},Li=new En,yy=new te;function by(i,t,e,n,s,r,o){let a=new Vt(0),l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function _(y){let v=!1,x=g(y);x===null?p(a,l):x&&x.isColor&&(p(x,1),v=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,v){let x=g(v);x&&(x.isCubeTexture||x.mapping===Ta)?(h===void 0&&(h=new xe(new _n(1,1,1),new rn({name:"BackgroundCubeMaterial",uniforms:Ps(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:Fe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Li.copy(v.backgroundRotation),Li.x*=-1,Li.y*=-1,Li.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(yy.makeRotationFromEuler(Li)),h.material.toneMapped=qt.getTransfer(x.colorSpace)!==se,(d!==x||u!==x.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,f=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new xe(new ha(2,2),new rn({name:"BackgroundMaterial",uniforms:Ps(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=qt.getTransfer(x.colorSpace)!==se,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=x,u=x.version,f=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,v){y.getRGB(ko,yp(i)),n.buffers.color.setClear(ko.r,ko.g,ko.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:_,addToRenderList:m}}function wy(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(w,I,L,E,B){let H=!1,N=d(E,L,I);r!==N&&(r=N,c(r.object)),H=f(w,E,L,B),H&&g(w,E,L,B),B!==null&&t.update(B,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,x(w,I,L,E),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return i.createVertexArray()}function c(w){return i.bindVertexArray(w)}function h(w){return i.deleteVertexArray(w)}function d(w,I,L){let E=L.wireframe===!0,B=n[w.id];B===void 0&&(B={},n[w.id]=B);let H=B[I.id];H===void 0&&(H={},B[I.id]=H);let N=H[E];return N===void 0&&(N=u(l()),H[E]=N),N}function u(w){let I=[],L=[],E=[];for(let B=0;B<e;B++)I[B]=0,L[B]=0,E[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:L,attributeDivisors:E,object:w,attributes:{},index:null}}function f(w,I,L,E){let B=r.attributes,H=I.attributes,N=0,X=L.getAttributes();for(let F in X)if(X[F].location>=0){let J=B[F],ct=H[F];if(ct===void 0&&(F==="instanceMatrix"&&w.instanceMatrix&&(ct=w.instanceMatrix),F==="instanceColor"&&w.instanceColor&&(ct=w.instanceColor)),J===void 0||J.attribute!==ct||ct&&J.data!==ct.data)return!0;N++}return r.attributesNum!==N||r.index!==E}function g(w,I,L,E){let B={},H=I.attributes,N=0,X=L.getAttributes();for(let F in X)if(X[F].location>=0){let J=H[F];J===void 0&&(F==="instanceMatrix"&&w.instanceMatrix&&(J=w.instanceMatrix),F==="instanceColor"&&w.instanceColor&&(J=w.instanceColor));let ct={};ct.attribute=J,J&&J.data&&(ct.data=J.data),B[F]=ct,N++}r.attributes=B,r.attributesNum=N,r.index=E}function _(){let w=r.newAttributes;for(let I=0,L=w.length;I<L;I++)w[I]=0}function m(w){p(w,0)}function p(w,I){let L=r.newAttributes,E=r.enabledAttributes,B=r.attributeDivisors;L[w]=1,E[w]===0&&(i.enableVertexAttribArray(w),E[w]=1),B[w]!==I&&(i.vertexAttribDivisor(w,I),B[w]=I)}function y(){let w=r.newAttributes,I=r.enabledAttributes;for(let L=0,E=I.length;L<E;L++)I[L]!==w[L]&&(i.disableVertexAttribArray(L),I[L]=0)}function v(w,I,L,E,B,H,N){N===!0?i.vertexAttribIPointer(w,I,L,B,H):i.vertexAttribPointer(w,I,L,E,B,H)}function x(w,I,L,E){_();let B=E.attributes,H=L.getAttributes(),N=I.defaultAttributeValues;for(let X in H){let F=H[X];if(F.location>=0){let tt=B[X];if(tt===void 0&&(X==="instanceMatrix"&&w.instanceMatrix&&(tt=w.instanceMatrix),X==="instanceColor"&&w.instanceColor&&(tt=w.instanceColor)),tt!==void 0){let J=tt.normalized,ct=tt.itemSize,ft=t.get(tt);if(ft===void 0)continue;let Et=ft.buffer,V=ft.type,Z=ft.bytesPerElement,rt=V===i.INT||V===i.UNSIGNED_INT||tt.gpuType===Vh;if(tt.isInterleavedBufferAttribute){let nt=tt.data,pt=nt.stride,St=tt.offset;if(nt.isInstancedInterleavedBuffer){for(let Dt=0;Dt<F.locationSize;Dt++)p(F.location+Dt,nt.meshPerAttribute);w.isInstancedMesh!==!0&&E._maxInstanceCount===void 0&&(E._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let Dt=0;Dt<F.locationSize;Dt++)m(F.location+Dt);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let Dt=0;Dt<F.locationSize;Dt++)v(F.location+Dt,ct/F.locationSize,V,J,pt*Z,(St+ct/F.locationSize*Dt)*Z,rt)}else{if(tt.isInstancedBufferAttribute){for(let nt=0;nt<F.locationSize;nt++)p(F.location+nt,tt.meshPerAttribute);w.isInstancedMesh!==!0&&E._maxInstanceCount===void 0&&(E._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let nt=0;nt<F.locationSize;nt++)m(F.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let nt=0;nt<F.locationSize;nt++)v(F.location+nt,ct/F.locationSize,V,J,ct*Z,ct/F.locationSize*nt*Z,rt)}}else if(N!==void 0){let J=N[X];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(F.location,J);break;case 3:i.vertexAttrib3fv(F.location,J);break;case 4:i.vertexAttrib4fv(F.location,J);break;default:i.vertexAttrib1fv(F.location,J)}}}}y()}function C(){P();for(let w in n){let I=n[w];for(let L in I){let E=I[L];for(let B in E)h(E[B].object),delete E[B];delete I[L]}delete n[w]}}function A(w){if(n[w.id]===void 0)return;let I=n[w.id];for(let L in I){let E=I[L];for(let B in E)h(E[B].object),delete E[B];delete I[L]}delete n[w.id]}function R(w){for(let I in n){let L=n[I];if(L[w.id]===void 0)continue;let E=L[w.id];for(let B in E)h(E[B].object),delete E[B];delete L[w.id]}}function P(){M(),o=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:M,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function My(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Sy(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==De&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let P=R===Dr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Xe&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Mn&&!P)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:C,maxSamples:A}}function Ey(i){let t=this,e=null,n=0,s=!1,r=!1,o=new fn,a=new Ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let y=r?0:n,v=y*4,x=p.clippingState||null;l.value=x,x=h(g,u,v,f);for(let C=0;C!==v;++C)x[C]=e[C];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=f+_*4,y=u.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,x=f;v!==_;++v,x+=4)o.copy(d[v]).applyMatrix4(y,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Ay(i){let t=new WeakMap;function e(o,a){return a===Ic?o.mapping=Es:a===Lc&&(o.mapping=As),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ic||a===Lc)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new uh(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var ua=class extends la{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},vs=4,wf=[.125,.215,.35,.446,.526,.582],Oi=20,pc=new ua,Mf=new Vt,mc=null,gc=0,_c=0,xc=!1,Ui=(1+Math.sqrt(5))/2,gs=1/Ui,Sf=[new z(-Ui,gs,0),new z(Ui,gs,0),new z(-gs,0,Ui),new z(gs,0,Ui),new z(0,Ui,-gs),new z(0,Ui,gs),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],da=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){mc=this._renderer.getRenderTarget(),gc=this._renderer.getActiveCubeFace(),_c=this._renderer.getActiveMipmapLevel(),xc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Af(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(mc,gc,_c),this._renderer.xr.enabled=xc,t.scissorTest=!1,Fo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Es||t.mapping===As?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),mc=this._renderer.getRenderTarget(),gc=this._renderer.getActiveCubeFace(),_c=this._renderer.getActiveMipmapLevel(),xc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Qe,minFilter:Qe,generateMipmaps:!1,type:Dr,format:De,colorSpace:Ns,depthBuffer:!1},s=Ef(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ef(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ty(r)),this._blurMaterial=Ry(r,t,e)}return s}_compileMaterial(t){let e=new xe(this._lodPlanes[0],t);this._renderer.compile(e,pc)}_sceneToCubeUV(t,e,n,s){let a=new Ge(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Mf),h.toneMapping=ui,h.autoClear=!1;let f=new gn({name:"PMREM.Background",side:Fe,depthWrite:!1,depthTest:!1}),g=new xe(new _n,f),_=!1,m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(Mf),_=!0);for(let p=0;p<6;p++){let y=p%3;y===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):y===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));let v=this._cubeSize;Fo(s,y*v,p>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Es||t.mapping===As;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Af());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new xe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Fo(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,pc)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Sf[(s-r-1)%Sf.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new xe(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Oi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Oi;m>Oi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Oi}`);let p=[],y=0;for(let R=0;R<Oi;++R){let P=R/_,M=Math.exp(-P*P/2);p.push(M),R===0?y+=M:R<m&&(y+=2*M)}for(let R=0;R<p.length;R++)p[R]=p[R]/y;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:v}=this;u.dTheta.value=g,u.mipInt.value=v-n;let x=this._sizeLods[s],C=3*x*(s>v-vs?s-v+vs:0),A=4*(this._cubeSize-x);Fo(e,C,A,3*x,2*x),l.setRenderTarget(e),l.render(d,pc)}};function Ty(i){let t=[],e=[],n=[],s=i,r=i-vs+1+wf.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>i-vs?l=wf[o-i+vs-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,_=3,m=2,p=1,y=new Float32Array(_*g*f),v=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let A=0;A<f;A++){let R=A%3*2/3-1,P=A>2?0:-1,M=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];y.set(M,_*g*A),v.set(u,m*g*A);let w=[A,A,A,A,A,A];x.set(w,p*g*A)}let C=new Ve;C.setAttribute("position",new ye(y,_)),C.setAttribute("uv",new ye(v,m)),C.setAttribute("faceIndex",new ye(x,p)),t.push(C),s>vs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ef(i,t,e){let n=new pn(i,t,e);return n.texture.mapping=Ta,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fo(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Ry(i,t,e){let n=new Float32Array(Oi),s=new z(0,1,0);return new rn({name:"SphericalGaussianBlur",defines:{n:Oi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Zh(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Af(){return new rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zh(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Tf(){return new rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Zh(){return`

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
	`}function Cy(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Ic||l===Lc,h=l===Es||l===As;if(c||h){let d=t.get(a),u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new da(i)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new da(i)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Py(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&yr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Iy(i,t,e,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);for(let g in u.morphAttributes){let _=u.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let g in u)t.update(u[g],i.ARRAY_BUFFER);let f=d.morphAttributes;for(let g in f){let _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function c(d){let u=[],f=d.index,g=d.attributes.position,_=0;if(f!==null){let y=f.array;_=f.version;for(let v=0,x=y.length;v<x;v+=3){let C=y[v+0],A=y[v+1],R=y[v+2];u.push(C,A,A,R,R,C)}}else if(g!==void 0){let y=g.array;_=g.version;for(let v=0,x=y.length/3-1;v<x;v+=3){let C=v+0,A=v+1,R=v+2;u.push(C,A,A,R,R,C)}}else return;let m=new(xp(u)?aa:oa)(u,1);m.version=_;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Ly(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*o),e.update(f,n,1)}function c(u,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,u*o,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(u,f,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y]*_[y];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Dy(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Uy(i,t,e){let n=new WeakMap,s=new _e;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let M=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],v=0;f===!0&&(v=1),g===!0&&(v=2),_===!0&&(v=3);let x=a.attributes.position.count*v,C=1;x>t.maxTextureSize&&(C=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let A=new Float32Array(x*C*4*d),R=new ra(A,x,C,d);R.type=Mn,R.needsUpdate=!0;let P=v*4;for(let w=0;w<d;w++){let I=m[w],L=p[w],E=y[w],B=x*C*4*w;for(let H=0;H<I.count;H++){let N=H*P;f===!0&&(s.fromBufferAttribute(I,H),A[B+N+0]=s.x,A[B+N+1]=s.y,A[B+N+2]=s.z,A[B+N+3]=0),g===!0&&(s.fromBufferAttribute(L,H),A[B+N+4]=s.x,A[B+N+5]=s.y,A[B+N+6]=s.z,A[B+N+7]=0),_===!0&&(s.fromBufferAttribute(E,H),A[B+N+8]=s.x,A[B+N+9]=s.y,A[B+N+10]=s.z,A[B+N+11]=E.itemSize===4?s.w:1)}}u={count:d,texture:R,size:new Ct(x,C)},n.set(a,u),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Ny(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Is=class extends tn{constructor(t,e,n,s,r,o,a,l,c,h=ys){if(h!==ys&&h!==Rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ys&&(n=Gn),n===void 0&&h===Rs&&(n=Ts),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ze,this.minFilter=l!==void 0?l:ze,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},wp=new tn,Rf=new Is(1,1),Mp=new ra,Sp=new Cs,Ep=new ca,Cf=[],Pf=[],If=new Float32Array(16),Lf=new Float32Array(9),Df=new Float32Array(4);function ks(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Cf[s];if(r===void 0&&(r=new Float32Array(s),Cf[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Te(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Re(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ca(i,t){let e=Pf[t];e===void 0&&(e=new Int32Array(t),Pf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Oy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ky(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2fv(this.addr,t),Re(e,t)}}function Fy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;i.uniform3fv(this.addr,t),Re(e,t)}}function zy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4fv(this.addr,t),Re(e,t)}}function By(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Te(e,n))return;Df.set(n),i.uniformMatrix2fv(this.addr,!1,Df),Re(e,n)}}function Vy(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Te(e,n))return;Lf.set(n),i.uniformMatrix3fv(this.addr,!1,Lf),Re(e,n)}}function $y(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Te(e,n))return;If.set(n),i.uniformMatrix4fv(this.addr,!1,If),Re(e,n)}}function Hy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Gy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2iv(this.addr,t),Re(e,t)}}function Wy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3iv(this.addr,t),Re(e,t)}}function Xy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4iv(this.addr,t),Re(e,t)}}function qy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Yy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2uiv(this.addr,t),Re(e,t)}}function Zy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3uiv(this.addr,t),Re(e,t)}}function Ky(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4uiv(this.addr,t),Re(e,t)}}function Jy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Rf.compareFunction=gp,r=Rf):r=wp,e.setTexture2D(t||r,s)}function jy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Sp,s)}function Qy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ep,s)}function tb(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Mp,s)}function eb(i){switch(i){case 5126:return Oy;case 35664:return ky;case 35665:return Fy;case 35666:return zy;case 35674:return By;case 35675:return Vy;case 35676:return $y;case 5124:case 35670:return Hy;case 35667:case 35671:return Gy;case 35668:case 35672:return Wy;case 35669:case 35673:return Xy;case 5125:return qy;case 36294:return Yy;case 36295:return Zy;case 36296:return Ky;case 35678:case 36198:case 36298:case 36306:case 35682:return Jy;case 35679:case 36299:case 36307:return jy;case 35680:case 36300:case 36308:case 36293:return Qy;case 36289:case 36303:case 36311:case 36292:return tb}}function nb(i,t){i.uniform1fv(this.addr,t)}function ib(i,t){let e=ks(t,this.size,2);i.uniform2fv(this.addr,e)}function sb(i,t){let e=ks(t,this.size,3);i.uniform3fv(this.addr,e)}function rb(i,t){let e=ks(t,this.size,4);i.uniform4fv(this.addr,e)}function ob(i,t){let e=ks(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function ab(i,t){let e=ks(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function lb(i,t){let e=ks(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function cb(i,t){i.uniform1iv(this.addr,t)}function hb(i,t){i.uniform2iv(this.addr,t)}function ub(i,t){i.uniform3iv(this.addr,t)}function db(i,t){i.uniform4iv(this.addr,t)}function fb(i,t){i.uniform1uiv(this.addr,t)}function pb(i,t){i.uniform2uiv(this.addr,t)}function mb(i,t){i.uniform3uiv(this.addr,t)}function gb(i,t){i.uniform4uiv(this.addr,t)}function _b(i,t,e){let n=this.cache,s=t.length,r=Ca(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||wp,r[o])}function xb(i,t,e){let n=this.cache,s=t.length,r=Ca(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Sp,r[o])}function vb(i,t,e){let n=this.cache,s=t.length,r=Ca(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Ep,r[o])}function yb(i,t,e){let n=this.cache,s=t.length,r=Ca(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Mp,r[o])}function bb(i){switch(i){case 5126:return nb;case 35664:return ib;case 35665:return sb;case 35666:return rb;case 35674:return ob;case 35675:return ab;case 35676:return lb;case 5124:case 35670:return cb;case 35667:case 35671:return hb;case 35668:case 35672:return ub;case 35669:case 35673:return db;case 5125:return fb;case 36294:return pb;case 36295:return mb;case 36296:return gb;case 35678:case 36198:case 36298:case 36306:case 35682:return _b;case 35679:case 36299:case 36307:return xb;case 35680:case 36300:case 36308:case 36293:return vb;case 36289:case 36303:case 36311:case 36292:return yb}}var dh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=eb(e.type)}},fh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=bb(e.type)}},ph=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},vc=/(\w+)(\])?(\[|\.)?/g;function Uf(i,t){i.seq.push(t),i.map[t.id]=t}function wb(i,t,e){let n=i.name,s=n.length;for(vc.lastIndex=0;;){let r=vc.exec(n),o=vc.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Uf(e,c===void 0?new dh(a,i,t):new fh(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new ph(a),Uf(e,d)),e=d}}}var Ms=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);wb(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Nf(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Mb=37297,Sb=0;function Eb(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Of=new Ot;function Ab(i){qt._getMatrix(Of,qt.workingColorSpace,i);let t=`mat3( ${Of.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case Ra:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function kf(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Eb(i.getShaderSource(t),o)}else return s}function Tb(i,t){let e=Ab(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Rb(i,t){let e;switch(t){case F_:e="Linear";break;case z_:e="Reinhard";break;case B_:e="Cineon";break;case V_:e="ACESFilmic";break;case H_:e="AgX";break;case G_:e="Neutral";break;case $_:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var zo=new z;function Cb(){qt.getLuminanceCoefficients(zo);let i=zo.x.toFixed(4),t=zo.y.toFixed(4),e=zo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Pb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(br).join(`
`)}function Ib(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Lb(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function br(i){return i!==""}function Ff(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function zf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Db=/^[ \t]*#include +<([\w\d./]+)>/gm;function mh(i){return i.replace(Db,Nb)}var Ub=new Map;function Nb(i,t){let e=zt[t];if(e===void 0){let n=Ub.get(t);if(n!==void 0)e=zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return mh(e)}var Ob=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bf(i){return i.replace(Ob,kb)}function kb(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vf(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Fb(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===sp?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===v_?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Bn&&(t="SHADOWMAP_TYPE_VSM"),t}function zb(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Es:case As:t="ENVMAP_TYPE_CUBE";break;case Ta:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Bb(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===As&&(t="ENVMAP_MODE_REFRACTION"),t}function Vb(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Bh:t="ENVMAP_BLENDING_MULTIPLY";break;case O_:t="ENVMAP_BLENDING_MIX";break;case k_:t="ENVMAP_BLENDING_ADD";break}return t}function $b(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Hb(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Fb(e),c=zb(e),h=Bb(e),d=Vb(e),u=$b(e),f=Pb(e),g=Ib(r),_=s.createProgram(),m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(br).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(br).join(`
`),p.length>0&&(p+=`
`)):(m=[Vf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(br).join(`
`),p=[Vf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ui?"#define TONE_MAPPING":"",e.toneMapping!==ui?zt.tonemapping_pars_fragment:"",e.toneMapping!==ui?Rb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,Tb("linearToOutputTexel",e.outputColorSpace),Cb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(br).join(`
`)),o=mh(o),o=Ff(o,e),o=zf(o,e),a=mh(a),a=Ff(a,e),a=zf(a,e),o=Bf(o),a=Bf(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Qd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Qd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=y+m+o,x=y+p+a,C=Nf(s,s.VERTEX_SHADER,v),A=Nf(s,s.FRAGMENT_SHADER,x);s.attachShader(_,C),s.attachShader(_,A),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(I){if(i.debug.checkShaderErrors){let L=s.getProgramInfoLog(_).trim(),E=s.getShaderInfoLog(C).trim(),B=s.getShaderInfoLog(A).trim(),H=!0,N=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,C,A);else{let X=kf(s,C,"vertex"),F=kf(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+L+`
`+X+`
`+F)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(E===""||B==="")&&(N=!1);N&&(I.diagnostics={runnable:H,programLog:L,vertexShader:{log:E,prefix:m},fragmentShader:{log:B,prefix:p}})}s.deleteShader(C),s.deleteShader(A),P=new Ms(s,_),M=Lb(s,_)}let P;this.getUniforms=function(){return P===void 0&&R(this),P};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=s.getProgramParameter(_,Mb)),w},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Sb++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=A,this}var Gb=0,gh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new _h(t),e.set(t,n)),n}},_h=class{constructor(t){this.id=Gb++,this.code=t,this.usedTimes=0}};function Wb(i,t,e,n,s,r,o){let a=new Tr,l=new gh,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,w,I,L,E){let B=L.fog,H=E.geometry,N=M.isMeshStandardMaterial?L.environment:null,X=(M.isMeshStandardMaterial?e:t).get(M.envMap||N),F=X&&X.mapping===Ta?X.image.height:null,tt=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let J=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ct=J!==void 0?J.length:0,ft=0;H.morphAttributes.position!==void 0&&(ft=1),H.morphAttributes.normal!==void 0&&(ft=2),H.morphAttributes.color!==void 0&&(ft=3);let Et,V,Z,rt;if(tt){let ne=wn[tt];Et=ne.vertexShader,V=ne.fragmentShader}else Et=M.vertexShader,V=M.fragmentShader,l.update(M),Z=l.getVertexShaderID(M),rt=l.getFragmentShaderID(M);let nt=i.getRenderTarget(),pt=i.state.buffers.depth.getReversed(),St=E.isInstancedMesh===!0,Dt=E.isBatchedMesh===!0,ie=!!M.map,Ht=!!M.matcap,pe=!!X,U=!!M.aoMap,ve=!!M.lightMap,kt=!!M.bumpMap,$t=!!M.normalMap,Tt=!!M.displacementMap,ee=!!M.emissiveMap,At=!!M.metalnessMap,T=!!M.roughnessMap,b=M.anisotropy>0,$=M.clearcoat>0,j=M.dispersion>0,et=M.iridescence>0,K=M.sheen>0,wt=M.transmission>0,lt=b&&!!M.anisotropyMap,gt=$&&!!M.clearcoatMap,Xt=$&&!!M.clearcoatNormalMap,it=$&&!!M.clearcoatRoughnessMap,_t=et&&!!M.iridescenceMap,Rt=et&&!!M.iridescenceThicknessMap,Pt=K&&!!M.sheenColorMap,xt=K&&!!M.sheenRoughnessMap,Gt=!!M.specularMap,Ft=!!M.specularColorMap,ae=!!M.specularIntensityMap,D=wt&&!!M.transmissionMap,at=wt&&!!M.thicknessMap,q=!!M.gradientMap,Q=!!M.alphaMap,dt=M.alphaTest>0,ht=!!M.alphaHash,Ut=!!M.extensions,ge=ui;M.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(ge=i.toneMapping);let Ue={shaderID:tt,shaderType:M.type,shaderName:M.name,vertexShader:Et,fragmentShader:V,defines:M.defines,customVertexShaderID:Z,customFragmentShaderID:rt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Dt,batchingColor:Dt&&E._colorsTexture!==null,instancing:St,instancingColor:St&&E.instanceColor!==null,instancingMorph:St&&E.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Ns,alphaToCoverage:!!M.alphaToCoverage,map:ie,matcap:Ht,envMap:pe,envMapMode:pe&&X.mapping,envMapCubeUVHeight:F,aoMap:U,lightMap:ve,bumpMap:kt,normalMap:$t,displacementMap:u&&Tt,emissiveMap:ee,normalMapObjectSpace:$t&&M.normalMapType===Y_,normalMapTangentSpace:$t&&M.normalMapType===mp,metalnessMap:At,roughnessMap:T,anisotropy:b,anisotropyMap:lt,clearcoat:$,clearcoatMap:gt,clearcoatNormalMap:Xt,clearcoatRoughnessMap:it,dispersion:j,iridescence:et,iridescenceMap:_t,iridescenceThicknessMap:Rt,sheen:K,sheenColorMap:Pt,sheenRoughnessMap:xt,specularMap:Gt,specularColorMap:Ft,specularIntensityMap:ae,transmission:wt,transmissionMap:D,thicknessMap:at,gradientMap:q,opaque:M.transparent===!1&&M.blending===hi&&M.alphaToCoverage===!1,alphaMap:Q,alphaTest:dt,alphaHash:ht,combine:M.combine,mapUv:ie&&_(M.map.channel),aoMapUv:U&&_(M.aoMap.channel),lightMapUv:ve&&_(M.lightMap.channel),bumpMapUv:kt&&_(M.bumpMap.channel),normalMapUv:$t&&_(M.normalMap.channel),displacementMapUv:Tt&&_(M.displacementMap.channel),emissiveMapUv:ee&&_(M.emissiveMap.channel),metalnessMapUv:At&&_(M.metalnessMap.channel),roughnessMapUv:T&&_(M.roughnessMap.channel),anisotropyMapUv:lt&&_(M.anisotropyMap.channel),clearcoatMapUv:gt&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Xt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:xt&&_(M.sheenRoughnessMap.channel),specularMapUv:Gt&&_(M.specularMap.channel),specularColorMapUv:Ft&&_(M.specularColorMap.channel),specularIntensityMapUv:ae&&_(M.specularIntensityMap.channel),transmissionMapUv:D&&_(M.transmissionMap.channel),thicknessMapUv:at&&_(M.thicknessMap.channel),alphaMapUv:Q&&_(M.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&($t||b),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:E.isPoints===!0&&!!H.attributes.uv&&(ie||Q),fog:!!B,useFog:M.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:pt,skinning:E.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ct,morphTextureStride:ft,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ge,decodeVideoTexture:ie&&M.map.isVideoTexture===!0&&qt.getTransfer(M.map.colorSpace)===se,decodeVideoTextureEmissive:ee&&M.emissiveMap.isVideoTexture===!0&&qt.getTransfer(M.emissiveMap.colorSpace)===se,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Ae,flipSided:M.side===Fe,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ut&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&M.extensions.multiDraw===!0||Dt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Ue.vertexUv1s=c.has(1),Ue.vertexUv2s=c.has(2),Ue.vertexUv3s=c.has(3),c.clear(),Ue}function p(M){let w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(let I in M.defines)w.push(I),w.push(M.defines[I]);return M.isRawShaderMaterial===!1&&(y(w,M),v(w,M),w.push(i.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function y(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function v(M,w){a.disableAll(),w.supportsVertexTextures&&a.enable(0),w.instancing&&a.enable(1),w.instancingColor&&a.enable(2),w.instancingMorph&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),w.dispersion&&a.enable(20),w.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reverseDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),M.push(a.mask)}function x(M){let w=g[M.type],I;if(w){let L=wn[w];I=N0.clone(L.uniforms)}else I=M.uniforms;return I}function C(M,w){let I;for(let L=0,E=h.length;L<E;L++){let B=h[L];if(B.cacheKey===w){I=B,++I.usedTimes;break}}return I===void 0&&(I=new Hb(i,w,M,r),h.push(I)),I}function A(M){if(--M.usedTimes===0){let w=h.indexOf(M);h[w]=h[h.length-1],h.pop(),M.destroy()}}function R(M){l.remove(M)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:C,releaseProgram:A,releaseShaderCache:R,programs:h,dispose:P}}function Xb(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function qb(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function $f(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Hf(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d,u,f,g,_,m){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},i[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),t++,p}function a(d,u,f,g,_,m){let p=o(d,u,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(d,u,f,g,_,m){let p=o(d,u,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||qb),n.length>1&&n.sort(u||$f),s.length>1&&s.sort(u||$f)}function h(){for(let d=t,u=i.length;d<u;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Yb(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Hf,i.set(n,[o])):s>=r.length?(o=new Hf,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Zb(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new z,color:new Vt};break;case"SpotLight":e={position:new z,direction:new z,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new z,halfWidth:new z,halfHeight:new z};break}return i[t.id]=e,e}}}function Kb(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Jb=0;function jb(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Qb(i){let t=new Zb,e=Kb(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new z);let s=new z,r=new te,o=new te;function a(c){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,y=0,v=0,x=0,C=0,A=0,R=0;c.sort(jb);for(let M=0,w=c.length;M<w;M++){let I=c[M],L=I.color,E=I.intensity,B=I.distance,H=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=L.r*E,d+=L.g*E,u+=L.b*E;else if(I.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(I.sh.coefficients[N],E);R++}else if(I.isDirectionalLight){let N=t.get(I);if(N.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let X=I.shadow,F=e.get(I);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,n.directionalShadow[f]=F,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=I.shadow.matrix,y++}n.directional[f]=N,f++}else if(I.isSpotLight){let N=t.get(I);N.position.setFromMatrixPosition(I.matrixWorld),N.color.copy(L).multiplyScalar(E),N.distance=B,N.coneCos=Math.cos(I.angle),N.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),N.decay=I.decay,n.spot[_]=N;let X=I.shadow;if(I.map&&(n.spotLightMap[C]=I.map,C++,X.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[_]=X.matrix,I.castShadow){let F=e.get(I);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,n.spotShadow[_]=F,n.spotShadowMap[_]=H,x++}_++}else if(I.isRectAreaLight){let N=t.get(I);N.color.copy(L).multiplyScalar(E),N.halfWidth.set(I.width*.5,0,0),N.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=N,m++}else if(I.isPointLight){let N=t.get(I);if(N.color.copy(I.color).multiplyScalar(I.intensity),N.distance=I.distance,N.decay=I.decay,I.castShadow){let X=I.shadow,F=e.get(I);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,F.shadowCameraNear=X.camera.near,F.shadowCameraFar=X.camera.far,n.pointShadow[g]=F,n.pointShadowMap[g]=H,n.pointShadowMatrix[g]=I.shadow.matrix,v++}n.point[g]=N,g++}else if(I.isHemisphereLight){let N=t.get(I);N.skyColor.copy(I.color).multiplyScalar(E),N.groundColor.copy(I.groundColor).multiplyScalar(E),n.hemi[p]=N,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==y||P.numPointShadows!==v||P.numSpotShadows!==x||P.numSpotMaps!==C||P.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+C-A,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,P.directionalLength=f,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=y,P.numPointShadows=v,P.numSpotShadows=x,P.numSpotMaps=C,P.numLightProbes=R,n.version=Jb++)}function l(c,h){let d=0,u=0,f=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){let v=c[p];if(v.isDirectionalLight){let x=n.directional[d];x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(v.isSpotLight){let x=n.spot[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(v.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){let x=n.point[u];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),u++}else if(v.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function Gf(i){let t=new Qb(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function tw(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Gf(i),t.set(s,[a])):r>=o.length?(a=new Gf(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var xh=class extends Yn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=X_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},vh=class extends Yn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},ew=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nw=`uniform sampler2D shadow_pass;
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
}`;function iw(i,t,e){let n=new Rr,s=new Ct,r=new Ct,o=new _e,a=new xh({depthPacking:q_}),l=new vh,c={},h=e.maxTextureSize,d={[di]:Fe,[Fe]:di,[Ae]:Ae},u=new rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:ew,fragmentShader:nw}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ve;g.setAttribute("position",new ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new xe(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sp;let p=this.type;this.render=function(A,R,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;let M=i.getRenderTarget(),w=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),L=i.state;L.setBlending(ci),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let E=p!==Bn&&this.type===Bn,B=p===Bn&&this.type!==Bn;for(let H=0,N=A.length;H<N;H++){let X=A[H],F=X.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);let tt=F.getFrameExtents();if(s.multiply(tt),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/tt.x),s.x=r.x*tt.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/tt.y),s.y=r.y*tt.y,F.mapSize.y=r.y)),F.map===null||E===!0||B===!0){let ct=this.type!==Bn?{minFilter:ze,magFilter:ze}:{};F.map!==null&&F.map.dispose(),F.map=new pn(s.x,s.y,ct),F.map.texture.name=X.name+".shadowMap",F.camera.updateProjectionMatrix()}i.setRenderTarget(F.map),i.clear();let J=F.getViewportCount();for(let ct=0;ct<J;ct++){let ft=F.getViewport(ct);o.set(r.x*ft.x,r.y*ft.y,r.x*ft.z,r.y*ft.w),L.viewport(o),F.updateMatrices(X,ct),n=F.getFrustum(),x(R,P,F.camera,X,this.type)}F.isPointLightShadow!==!0&&this.type===Bn&&y(F,P),F.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,w,I)};function y(A,R){let P=t.update(_);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new pn(s.x,s.y)),u.uniforms.shadow_pass.value=A.map.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(R,null,P,u,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(R,null,P,f,_,null)}function v(A,R,P,M){let w=null,I=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)w=I;else if(w=P.isPointLight===!0?l:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let L=w.uuid,E=R.uuid,B=c[L];B===void 0&&(B={},c[L]=B);let H=B[E];H===void 0&&(H=w.clone(),B[E]=H,R.addEventListener("dispose",C)),w=H}if(w.visible=R.visible,w.wireframe=R.wireframe,M===Bn?w.side=R.shadowSide!==null?R.shadowSide:R.side:w.side=R.shadowSide!==null?R.shadowSide:d[R.side],w.alphaMap=R.alphaMap,w.alphaTest=R.alphaTest,w.map=R.map,w.clipShadows=R.clipShadows,w.clippingPlanes=R.clippingPlanes,w.clipIntersection=R.clipIntersection,w.displacementMap=R.displacementMap,w.displacementScale=R.displacementScale,w.displacementBias=R.displacementBias,w.wireframeLinewidth=R.wireframeLinewidth,w.linewidth=R.linewidth,P.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let L=i.properties.get(w);L.light=P}return w}function x(A,R,P,M,w){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&w===Bn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);let E=t.update(A),B=A.material;if(Array.isArray(B)){let H=E.groups;for(let N=0,X=H.length;N<X;N++){let F=H[N],tt=B[F.materialIndex];if(tt&&tt.visible){let J=v(A,tt,M,w);A.onBeforeShadow(i,A,R,P,E,J,F),i.renderBufferDirect(P,null,E,J,A,F),A.onAfterShadow(i,A,R,P,E,J,F)}}}else if(B.visible){let H=v(A,B,M,w);A.onBeforeShadow(i,A,R,P,E,H,null),i.renderBufferDirect(P,null,E,H,A,null),A.onAfterShadow(i,A,R,P,E,H,null)}}let L=A.children;for(let E=0,B=L.length;E<B;E++)x(L[E],R,P,M,w)}function C(A){A.target.removeEventListener("dispose",C);for(let P in c){let M=c[P],w=A.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}var sw={[Sc]:Ec,[Ac]:Cc,[Tc]:Pc,[Ss]:Rc,[Ec]:Sc,[Cc]:Ac,[Pc]:Tc,[Rc]:Ss};function rw(i,t){function e(){let D=!1,at=new _e,q=null,Q=new _e(0,0,0,0);return{setMask:function(dt){q!==dt&&!D&&(i.colorMask(dt,dt,dt,dt),q=dt)},setLocked:function(dt){D=dt},setClear:function(dt,ht,Ut,ge,Ue){Ue===!0&&(dt*=ge,ht*=ge,Ut*=ge),at.set(dt,ht,Ut,ge),Q.equals(at)===!1&&(i.clearColor(dt,ht,Ut,ge),Q.copy(at))},reset:function(){D=!1,q=null,Q.set(-1,0,0,0)}}}function n(){let D=!1,at=!1,q=null,Q=null,dt=null;return{setReversed:function(ht){if(at!==ht){let Ut=t.get("EXT_clip_control");at?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT);let ge=dt;dt=null,this.setClear(ge)}at=ht},getReversed:function(){return at},setTest:function(ht){ht?nt(i.DEPTH_TEST):pt(i.DEPTH_TEST)},setMask:function(ht){q!==ht&&!D&&(i.depthMask(ht),q=ht)},setFunc:function(ht){if(at&&(ht=sw[ht]),Q!==ht){switch(ht){case Sc:i.depthFunc(i.NEVER);break;case Ec:i.depthFunc(i.ALWAYS);break;case Ac:i.depthFunc(i.LESS);break;case Ss:i.depthFunc(i.LEQUAL);break;case Tc:i.depthFunc(i.EQUAL);break;case Rc:i.depthFunc(i.GEQUAL);break;case Cc:i.depthFunc(i.GREATER);break;case Pc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=ht}},setLocked:function(ht){D=ht},setClear:function(ht){dt!==ht&&(at&&(ht=1-ht),i.clearDepth(ht),dt=ht)},reset:function(){D=!1,q=null,Q=null,dt=null,at=!1}}}function s(){let D=!1,at=null,q=null,Q=null,dt=null,ht=null,Ut=null,ge=null,Ue=null;return{setTest:function(ne){D||(ne?nt(i.STENCIL_TEST):pt(i.STENCIL_TEST))},setMask:function(ne){at!==ne&&!D&&(i.stencilMask(ne),at=ne)},setFunc:function(ne,an,Rn){(q!==ne||Q!==an||dt!==Rn)&&(i.stencilFunc(ne,an,Rn),q=ne,Q=an,dt=Rn)},setOp:function(ne,an,Rn){(ht!==ne||Ut!==an||ge!==Rn)&&(i.stencilOp(ne,an,Rn),ht=ne,Ut=an,ge=Rn)},setLocked:function(ne){D=ne},setClear:function(ne){Ue!==ne&&(i.clearStencil(ne),Ue=ne)},reset:function(){D=!1,at=null,q=null,Q=null,dt=null,ht=null,Ut=null,ge=null,Ue=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,y=null,v=null,x=null,C=null,A=null,R=new Vt(0,0,0),P=0,M=!1,w=null,I=null,L=null,E=null,B=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,X=0,F=i.getParameter(i.VERSION);F.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=X>=1):F.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=X>=2);let tt=null,J={},ct=i.getParameter(i.SCISSOR_BOX),ft=i.getParameter(i.VIEWPORT),Et=new _e().fromArray(ct),V=new _e().fromArray(ft);function Z(D,at,q,Q){let dt=new Uint8Array(4),ht=i.createTexture();i.bindTexture(D,ht),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<q;Ut++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(at,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(at+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return ht}let rt={};rt[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),rt[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),rt[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(i.DEPTH_TEST),o.setFunc(Ss),kt(!1),$t(Wd),nt(i.CULL_FACE),U(ci);function nt(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function pt(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function St(D,at){return d[D]!==at?(i.bindFramebuffer(D,at),d[D]=at,D===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=at),D===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=at),!0):!1}function Dt(D,at){let q=f,Q=!1;if(D){q=u.get(at),q===void 0&&(q=[],u.set(at,q));let dt=D.textures;if(q.length!==dt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let ht=0,Ut=dt.length;ht<Ut;ht++)q[ht]=i.COLOR_ATTACHMENT0+ht;q.length=dt.length,Q=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,Q=!0);Q&&i.drawBuffers(q)}function ie(D){return g!==D?(i.useProgram(D),g=D,!0):!1}let Ht={[Ni]:i.FUNC_ADD,[y_]:i.FUNC_SUBTRACT,[b_]:i.FUNC_REVERSE_SUBTRACT};Ht[w_]=i.MIN,Ht[M_]=i.MAX;let pe={[S_]:i.ZERO,[zh]:i.ONE,[E_]:i.SRC_COLOR,[Mc]:i.SRC_ALPHA,[I_]:i.SRC_ALPHA_SATURATE,[C_]:i.DST_COLOR,[T_]:i.DST_ALPHA,[A_]:i.ONE_MINUS_SRC_COLOR,[Sr]:i.ONE_MINUS_SRC_ALPHA,[P_]:i.ONE_MINUS_DST_COLOR,[R_]:i.ONE_MINUS_DST_ALPHA,[L_]:i.CONSTANT_COLOR,[D_]:i.ONE_MINUS_CONSTANT_COLOR,[U_]:i.CONSTANT_ALPHA,[N_]:i.ONE_MINUS_CONSTANT_ALPHA};function U(D,at,q,Q,dt,ht,Ut,ge,Ue,ne){if(D===ci){_===!0&&(pt(i.BLEND),_=!1);return}if(_===!1&&(nt(i.BLEND),_=!0),D!==Fh){if(D!==m||ne!==M){if((p!==Ni||x!==Ni)&&(i.blendEquation(i.FUNC_ADD),p=Ni,x=Ni),ne)switch(D){case hi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ta:i.blendFunc(i.ONE,i.ONE);break;case Xd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case qd:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case hi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ta:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Xd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case qd:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,v=null,C=null,A=null,R.set(0,0,0),P=0,m=D,M=ne}return}dt=dt||at,ht=ht||q,Ut=Ut||Q,(at!==p||dt!==x)&&(i.blendEquationSeparate(Ht[at],Ht[dt]),p=at,x=dt),(q!==y||Q!==v||ht!==C||Ut!==A)&&(i.blendFuncSeparate(pe[q],pe[Q],pe[ht],pe[Ut]),y=q,v=Q,C=ht,A=Ut),(ge.equals(R)===!1||Ue!==P)&&(i.blendColor(ge.r,ge.g,ge.b,Ue),R.copy(ge),P=Ue),m=D,M=!1}function ve(D,at){D.side===Ae?pt(i.CULL_FACE):nt(i.CULL_FACE);let q=D.side===Fe;at&&(q=!q),kt(q),D.blending===hi&&D.transparent===!1?U(ci):U(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let Q=D.stencilWrite;a.setTest(Q),Q&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),ee(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function kt(D){w!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),w=D)}function $t(D){D!==__?(nt(i.CULL_FACE),D!==I&&(D===Wd?i.cullFace(i.BACK):D===x_?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pt(i.CULL_FACE),I=D}function Tt(D){D!==L&&(N&&i.lineWidth(D),L=D)}function ee(D,at,q){D?(nt(i.POLYGON_OFFSET_FILL),(E!==at||B!==q)&&(i.polygonOffset(at,q),E=at,B=q)):pt(i.POLYGON_OFFSET_FILL)}function At(D){D?nt(i.SCISSOR_TEST):pt(i.SCISSOR_TEST)}function T(D){D===void 0&&(D=i.TEXTURE0+H-1),tt!==D&&(i.activeTexture(D),tt=D)}function b(D,at,q){q===void 0&&(tt===null?q=i.TEXTURE0+H-1:q=tt);let Q=J[q];Q===void 0&&(Q={type:void 0,texture:void 0},J[q]=Q),(Q.type!==D||Q.texture!==at)&&(tt!==q&&(i.activeTexture(q),tt=q),i.bindTexture(D,at||rt[D]),Q.type=D,Q.texture=at)}function $(){let D=J[tt];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function et(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function wt(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function lt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function gt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Xt(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _t(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Rt(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pt(D){Et.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Et.copy(D))}function xt(D){V.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),V.copy(D))}function Gt(D,at){let q=c.get(at);q===void 0&&(q=new WeakMap,c.set(at,q));let Q=q.get(D);Q===void 0&&(Q=i.getUniformBlockIndex(at,D.name),q.set(D,Q))}function Ft(D,at){let Q=c.get(at).get(D);l.get(at)!==Q&&(i.uniformBlockBinding(at,Q,D.__bindingPointIndex),l.set(at,Q))}function ae(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},tt=null,J={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,y=null,v=null,x=null,C=null,A=null,R=new Vt(0,0,0),P=0,M=!1,w=null,I=null,L=null,E=null,B=null,Et.set(0,0,i.canvas.width,i.canvas.height),V.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:pt,bindFramebuffer:St,drawBuffers:Dt,useProgram:ie,setBlending:U,setMaterial:ve,setFlipSided:kt,setCullFace:$t,setLineWidth:Tt,setPolygonOffset:ee,setScissorTest:At,activeTexture:T,bindTexture:b,unbindTexture:$,compressedTexImage2D:j,compressedTexImage3D:et,texImage2D:_t,texImage3D:Rt,updateUBOMapping:Gt,uniformBlockBinding:Ft,texStorage2D:Xt,texStorage3D:it,texSubImage2D:K,texSubImage3D:wt,compressedTexSubImage2D:lt,compressedTexSubImage3D:gt,scissor:Pt,viewport:xt,reset:ae}}function Wf(i,t,e,n){let s=ow(n);switch(e){case cp:return i*t;case up:return i*t;case dp:return i*t*2;case Gh:return i*t/s.components*s.byteLength;case Wh:return i*t/s.components*s.byteLength;case fp:return i*t*2/s.components*s.byteLength;case Xh:return i*t*2/s.components*s.byteLength;case hp:return i*t*3/s.components*s.byteLength;case De:return i*t*4/s.components*s.byteLength;case qh:return i*t*4/s.components*s.byteLength;case Zo:case Ko:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Jo:case jo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Oc:case Fc:return Math.max(i,16)*Math.max(t,8)/4;case Nc:case kc:return Math.max(i,8)*Math.max(t,8)/2;case zc:case Bc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Vc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case $c:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Hc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Gc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Wc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Xc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case qc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Yc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Zc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Kc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Jc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case jc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Qc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case th:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case eh:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Qo:case nh:case ih:return Math.ceil(i/4)*Math.ceil(t/4)*16;case pp:case sh:return Math.ceil(i/4)*Math.ceil(t/4)*8;case rh:case oh:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ow(i){switch(i){case Xe:case op:return{byteLength:1,components:1};case Er:case ap:case Dr:return{byteLength:2,components:1};case $h:case Hh:return{byteLength:2,components:4};case Gn:case Vh:case Mn:return{byteLength:4,components:1};case lp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function aw(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ct,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,b){return f?new OffscreenCanvas(T,b):ia("canvas")}function _(T,b,$){let j=1,et=At(T);if((et.width>$||et.height>$)&&(j=$/Math.max(et.width,et.height)),j<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let K=Math.floor(j*et.width),wt=Math.floor(j*et.height);d===void 0&&(d=g(K,wt));let lt=b?g(K,wt):d;return lt.width=K,lt.height=wt,lt.getContext("2d").drawImage(T,0,0,K,wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+K+"x"+wt+")."),lt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function y(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(T,b,$,j,et=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let K=b;if(b===i.RED&&($===i.FLOAT&&(K=i.R32F),$===i.HALF_FLOAT&&(K=i.R16F),$===i.UNSIGNED_BYTE&&(K=i.R8)),b===i.RED_INTEGER&&($===i.UNSIGNED_BYTE&&(K=i.R8UI),$===i.UNSIGNED_SHORT&&(K=i.R16UI),$===i.UNSIGNED_INT&&(K=i.R32UI),$===i.BYTE&&(K=i.R8I),$===i.SHORT&&(K=i.R16I),$===i.INT&&(K=i.R32I)),b===i.RG&&($===i.FLOAT&&(K=i.RG32F),$===i.HALF_FLOAT&&(K=i.RG16F),$===i.UNSIGNED_BYTE&&(K=i.RG8)),b===i.RG_INTEGER&&($===i.UNSIGNED_BYTE&&(K=i.RG8UI),$===i.UNSIGNED_SHORT&&(K=i.RG16UI),$===i.UNSIGNED_INT&&(K=i.RG32UI),$===i.BYTE&&(K=i.RG8I),$===i.SHORT&&(K=i.RG16I),$===i.INT&&(K=i.RG32I)),b===i.RGB_INTEGER&&($===i.UNSIGNED_BYTE&&(K=i.RGB8UI),$===i.UNSIGNED_SHORT&&(K=i.RGB16UI),$===i.UNSIGNED_INT&&(K=i.RGB32UI),$===i.BYTE&&(K=i.RGB8I),$===i.SHORT&&(K=i.RGB16I),$===i.INT&&(K=i.RGB32I)),b===i.RGBA_INTEGER&&($===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),$===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),$===i.UNSIGNED_INT&&(K=i.RGBA32UI),$===i.BYTE&&(K=i.RGBA8I),$===i.SHORT&&(K=i.RGBA16I),$===i.INT&&(K=i.RGBA32I)),b===i.RGB&&$===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),b===i.RGBA){let wt=et?Ra:qt.getTransfer(j);$===i.FLOAT&&(K=i.RGBA32F),$===i.HALF_FLOAT&&(K=i.RGBA16F),$===i.UNSIGNED_BYTE&&(K=wt===se?i.SRGB8_ALPHA8:i.RGBA8),$===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),$===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function x(T,b){let $;return T?b===null||b===Gn||b===Ts?$=i.DEPTH24_STENCIL8:b===Mn?$=i.DEPTH32F_STENCIL8:b===Er&&($=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Gn||b===Ts?$=i.DEPTH_COMPONENT24:b===Mn?$=i.DEPTH_COMPONENT32F:b===Er&&($=i.DEPTH_COMPONENT16),$}function C(T,b){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==ze&&T.minFilter!==Qe?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function A(T){let b=T.target;b.removeEventListener("dispose",A),P(b),b.isVideoTexture&&h.delete(b)}function R(T){let b=T.target;b.removeEventListener("dispose",R),w(b)}function P(T){let b=n.get(T);if(b.__webglInit===void 0)return;let $=T.source,j=u.get($);if(j){let et=j[b.__cacheKey];et.usedTimes--,et.usedTimes===0&&M(T),Object.keys(j).length===0&&u.delete($)}n.remove(T)}function M(T){let b=n.get(T);i.deleteTexture(b.__webglTexture);let $=T.source,j=u.get($);delete j[b.__cacheKey],o.memory.textures--}function w(T){let b=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(b.__webglFramebuffer[j]))for(let et=0;et<b.__webglFramebuffer[j].length;et++)i.deleteFramebuffer(b.__webglFramebuffer[j][et]);else i.deleteFramebuffer(b.__webglFramebuffer[j]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[j])}else{if(Array.isArray(b.__webglFramebuffer))for(let j=0;j<b.__webglFramebuffer.length;j++)i.deleteFramebuffer(b.__webglFramebuffer[j]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let j=0;j<b.__webglColorRenderbuffer.length;j++)b.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[j]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let $=T.textures;for(let j=0,et=$.length;j<et;j++){let K=n.get($[j]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove($[j])}n.remove(T)}let I=0;function L(){I=0}function E(){let T=I;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),I+=1,T}function B(T){let b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function H(T,b){let $=n.get(T);if(T.isVideoTexture&&Tt(T),T.isRenderTargetTexture===!1&&T.version>0&&$.__version!==T.version){let j=T.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V($,T,b);return}}e.bindTexture(i.TEXTURE_2D,$.__webglTexture,i.TEXTURE0+b)}function N(T,b){let $=n.get(T);if(T.version>0&&$.__version!==T.version){V($,T,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,$.__webglTexture,i.TEXTURE0+b)}function X(T,b){let $=n.get(T);if(T.version>0&&$.__version!==T.version){V($,T,b);return}e.bindTexture(i.TEXTURE_3D,$.__webglTexture,i.TEXTURE0+b)}function F(T,b){let $=n.get(T);if(T.version>0&&$.__version!==T.version){Z($,T,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture,i.TEXTURE0+b)}let tt={[Dc]:i.REPEAT,[Vn]:i.CLAMP_TO_EDGE,[Uc]:i.MIRRORED_REPEAT},J={[ze]:i.NEAREST,[W_]:i.NEAREST_MIPMAP_NEAREST,[vo]:i.NEAREST_MIPMAP_LINEAR,[Qe]:i.LINEAR,[Xl]:i.LINEAR_MIPMAP_NEAREST,[ki]:i.LINEAR_MIPMAP_LINEAR},ct={[Z_]:i.NEVER,[e0]:i.ALWAYS,[K_]:i.LESS,[gp]:i.LEQUAL,[J_]:i.EQUAL,[t0]:i.GEQUAL,[j_]:i.GREATER,[Q_]:i.NOTEQUAL};function ft(T,b){if(b.type===Mn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Qe||b.magFilter===Xl||b.magFilter===vo||b.magFilter===ki||b.minFilter===Qe||b.minFilter===Xl||b.minFilter===vo||b.minFilter===ki)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,tt[b.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,tt[b.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,tt[b.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,J[b.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,J[b.minFilter]),b.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ct[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===ze||b.minFilter!==vo&&b.minFilter!==ki||b.type===Mn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let $=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Et(T,b){let $=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",A));let j=b.source,et=u.get(j);et===void 0&&(et={},u.set(j,et));let K=B(b);if(K!==T.__cacheKey){et[K]===void 0&&(et[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,$=!0),et[K].usedTimes++;let wt=et[T.__cacheKey];wt!==void 0&&(et[T.__cacheKey].usedTimes--,wt.usedTimes===0&&M(b)),T.__cacheKey=K,T.__webglTexture=et[K].texture}return $}function V(T,b,$){let j=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(j=i.TEXTURE_3D);let et=Et(T,b),K=b.source;e.bindTexture(j,T.__webglTexture,i.TEXTURE0+$);let wt=n.get(K);if(K.version!==wt.__version||et===!0){e.activeTexture(i.TEXTURE0+$);let lt=qt.getPrimaries(qt.workingColorSpace),gt=b.colorSpace===ai?null:qt.getPrimaries(b.colorSpace),Xt=b.colorSpace===ai||lt===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xt);let it=_(b.image,!1,s.maxTextureSize);it=ee(b,it);let _t=r.convert(b.format,b.colorSpace),Rt=r.convert(b.type),Pt=v(b.internalFormat,_t,Rt,b.colorSpace,b.isVideoTexture);ft(j,b);let xt,Gt=b.mipmaps,Ft=b.isVideoTexture!==!0,ae=wt.__version===void 0||et===!0,D=K.dataReady,at=C(b,it);if(b.isDepthTexture)Pt=x(b.format===Rs,b.type),ae&&(Ft?e.texStorage2D(i.TEXTURE_2D,1,Pt,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,Pt,it.width,it.height,0,_t,Rt,null));else if(b.isDataTexture)if(Gt.length>0){Ft&&ae&&e.texStorage2D(i.TEXTURE_2D,at,Pt,Gt[0].width,Gt[0].height);for(let q=0,Q=Gt.length;q<Q;q++)xt=Gt[q],Ft?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,xt.width,xt.height,_t,Rt,xt.data):e.texImage2D(i.TEXTURE_2D,q,Pt,xt.width,xt.height,0,_t,Rt,xt.data);b.generateMipmaps=!1}else Ft?(ae&&e.texStorage2D(i.TEXTURE_2D,at,Pt,it.width,it.height),D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,it.width,it.height,_t,Rt,it.data)):e.texImage2D(i.TEXTURE_2D,0,Pt,it.width,it.height,0,_t,Rt,it.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ft&&ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,Pt,Gt[0].width,Gt[0].height,it.depth);for(let q=0,Q=Gt.length;q<Q;q++)if(xt=Gt[q],b.format!==De)if(_t!==null)if(Ft){if(D)if(b.layerUpdates.size>0){let dt=Wf(xt.width,xt.height,b.format,b.type);for(let ht of b.layerUpdates){let Ut=xt.data.subarray(ht*dt/xt.data.BYTES_PER_ELEMENT,(ht+1)*dt/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,ht,xt.width,xt.height,1,_t,Ut)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,xt.width,xt.height,it.depth,_t,xt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Pt,xt.width,xt.height,it.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,xt.width,xt.height,it.depth,_t,Rt,xt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Pt,xt.width,xt.height,it.depth,0,_t,Rt,xt.data)}else{Ft&&ae&&e.texStorage2D(i.TEXTURE_2D,at,Pt,Gt[0].width,Gt[0].height);for(let q=0,Q=Gt.length;q<Q;q++)xt=Gt[q],b.format!==De?_t!==null?Ft?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,xt.width,xt.height,_t,xt.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Pt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,xt.width,xt.height,_t,Rt,xt.data):e.texImage2D(i.TEXTURE_2D,q,Pt,xt.width,xt.height,0,_t,Rt,xt.data)}else if(b.isDataArrayTexture)if(Ft){if(ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,Pt,it.width,it.height,it.depth),D)if(b.layerUpdates.size>0){let q=Wf(it.width,it.height,b.format,b.type);for(let Q of b.layerUpdates){let dt=it.data.subarray(Q*q/it.data.BYTES_PER_ELEMENT,(Q+1)*q/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,it.width,it.height,1,_t,Rt,dt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,_t,Rt,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Pt,it.width,it.height,it.depth,0,_t,Rt,it.data);else if(b.isData3DTexture)Ft?(ae&&e.texStorage3D(i.TEXTURE_3D,at,Pt,it.width,it.height,it.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,_t,Rt,it.data)):e.texImage3D(i.TEXTURE_3D,0,Pt,it.width,it.height,it.depth,0,_t,Rt,it.data);else if(b.isFramebufferTexture){if(ae)if(Ft)e.texStorage2D(i.TEXTURE_2D,at,Pt,it.width,it.height);else{let q=it.width,Q=it.height;for(let dt=0;dt<at;dt++)e.texImage2D(i.TEXTURE_2D,dt,Pt,q,Q,0,_t,Rt,null),q>>=1,Q>>=1}}else if(Gt.length>0){if(Ft&&ae){let q=At(Gt[0]);e.texStorage2D(i.TEXTURE_2D,at,Pt,q.width,q.height)}for(let q=0,Q=Gt.length;q<Q;q++)xt=Gt[q],Ft?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,_t,Rt,xt):e.texImage2D(i.TEXTURE_2D,q,Pt,_t,Rt,xt);b.generateMipmaps=!1}else if(Ft){if(ae){let q=At(it);e.texStorage2D(i.TEXTURE_2D,at,Pt,q.width,q.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t,Rt,it)}else e.texImage2D(i.TEXTURE_2D,0,Pt,_t,Rt,it);m(b)&&p(j),wt.__version=K.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function Z(T,b,$){if(b.image.length!==6)return;let j=Et(T,b),et=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+$);let K=n.get(et);if(et.version!==K.__version||j===!0){e.activeTexture(i.TEXTURE0+$);let wt=qt.getPrimaries(qt.workingColorSpace),lt=b.colorSpace===ai?null:qt.getPrimaries(b.colorSpace),gt=b.colorSpace===ai||wt===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);let Xt=b.isCompressedTexture||b.image[0].isCompressedTexture,it=b.image[0]&&b.image[0].isDataTexture,_t=[];for(let Q=0;Q<6;Q++)!Xt&&!it?_t[Q]=_(b.image[Q],!0,s.maxCubemapSize):_t[Q]=it?b.image[Q].image:b.image[Q],_t[Q]=ee(b,_t[Q]);let Rt=_t[0],Pt=r.convert(b.format,b.colorSpace),xt=r.convert(b.type),Gt=v(b.internalFormat,Pt,xt,b.colorSpace),Ft=b.isVideoTexture!==!0,ae=K.__version===void 0||j===!0,D=et.dataReady,at=C(b,Rt);ft(i.TEXTURE_CUBE_MAP,b);let q;if(Xt){Ft&&ae&&e.texStorage2D(i.TEXTURE_CUBE_MAP,at,Gt,Rt.width,Rt.height);for(let Q=0;Q<6;Q++){q=_t[Q].mipmaps;for(let dt=0;dt<q.length;dt++){let ht=q[dt];b.format!==De?Pt!==null?Ft?D&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,0,0,ht.width,ht.height,Pt,ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,Gt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,0,0,ht.width,ht.height,Pt,xt,ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,Gt,ht.width,ht.height,0,Pt,xt,ht.data)}}}else{if(q=b.mipmaps,Ft&&ae){q.length>0&&at++;let Q=At(_t[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,at,Gt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(it){Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,_t[Q].width,_t[Q].height,Pt,xt,_t[Q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Gt,_t[Q].width,_t[Q].height,0,Pt,xt,_t[Q].data);for(let dt=0;dt<q.length;dt++){let Ut=q[dt].image[Q].image;Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,0,0,Ut.width,Ut.height,Pt,xt,Ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,Gt,Ut.width,Ut.height,0,Pt,xt,Ut.data)}}else{Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Pt,xt,_t[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Gt,Pt,xt,_t[Q]);for(let dt=0;dt<q.length;dt++){let ht=q[dt];Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,0,0,Pt,xt,ht.image[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,Gt,Pt,xt,ht.image[Q])}}}m(b)&&p(i.TEXTURE_CUBE_MAP),K.__version=et.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function rt(T,b,$,j,et,K){let wt=r.convert($.format,$.colorSpace),lt=r.convert($.type),gt=v($.internalFormat,wt,lt,$.colorSpace),Xt=n.get(b),it=n.get($);if(it.__renderTarget=b,!Xt.__hasExternalTextures){let _t=Math.max(1,b.width>>K),Rt=Math.max(1,b.height>>K);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,K,gt,_t,Rt,b.depth,0,wt,lt,null):e.texImage2D(et,K,gt,_t,Rt,0,wt,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),$t(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,et,it.__webglTexture,0,kt(b)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,et,it.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function nt(T,b,$){if(i.bindRenderbuffer(i.RENDERBUFFER,T),b.depthBuffer){let j=b.depthTexture,et=j&&j.isDepthTexture?j.type:null,K=x(b.stencilBuffer,et),wt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=kt(b);$t(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,K,b.width,b.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,K,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,K,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,wt,i.RENDERBUFFER,T)}else{let j=b.textures;for(let et=0;et<j.length;et++){let K=j[et],wt=r.convert(K.format,K.colorSpace),lt=r.convert(K.type),gt=v(K.internalFormat,wt,lt,K.colorSpace),Xt=kt(b);$&&$t(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Xt,gt,b.width,b.height):$t(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Xt,gt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,gt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pt(T,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let j=n.get(b.depthTexture);j.__renderTarget=b,(!j.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),H(b.depthTexture,0);let et=j.__webglTexture,K=kt(b);if(b.depthTexture.format===ys)$t(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0);else if(b.depthTexture.format===Rs)$t(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function St(T){let b=n.get(T),$=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){let j=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),j){let et=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,j.removeEventListener("dispose",et)};j.addEventListener("dispose",et),b.__depthDisposeCallback=et}b.__boundDepthTexture=j}if(T.depthTexture&&!b.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");pt(b.__webglFramebuffer,T)}else if($){b.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[j]),b.__webglDepthbuffer[j]===void 0)b.__webglDepthbuffer[j]=i.createRenderbuffer(),nt(b.__webglDepthbuffer[j],T,!1);else{let et=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=b.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),nt(b.__webglDepthbuffer,T,!1);else{let j=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,et)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(T,b,$){let j=n.get(T);b!==void 0&&rt(j.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),$!==void 0&&St(T)}function ie(T){let b=T.texture,$=n.get(T),j=n.get(b);T.addEventListener("dispose",R);let et=T.textures,K=T.isWebGLCubeRenderTarget===!0,wt=et.length>1;if(wt||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=b.version,o.memory.textures++),K){$.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(b.mipmaps&&b.mipmaps.length>0){$.__webglFramebuffer[lt]=[];for(let gt=0;gt<b.mipmaps.length;gt++)$.__webglFramebuffer[lt][gt]=i.createFramebuffer()}else $.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){$.__webglFramebuffer=[];for(let lt=0;lt<b.mipmaps.length;lt++)$.__webglFramebuffer[lt]=i.createFramebuffer()}else $.__webglFramebuffer=i.createFramebuffer();if(wt)for(let lt=0,gt=et.length;lt<gt;lt++){let Xt=n.get(et[lt]);Xt.__webglTexture===void 0&&(Xt.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&$t(T)===!1){$.__webglMultisampledFramebuffer=i.createFramebuffer(),$.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let lt=0;lt<et.length;lt++){let gt=et[lt];$.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,$.__webglColorRenderbuffer[lt]);let Xt=r.convert(gt.format,gt.colorSpace),it=r.convert(gt.type),_t=v(gt.internalFormat,Xt,it,gt.colorSpace,T.isXRRenderTarget===!0),Rt=kt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,_t,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,$.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&($.__webglDepthRenderbuffer=i.createRenderbuffer(),nt($.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),ft(i.TEXTURE_CUBE_MAP,b);for(let lt=0;lt<6;lt++)if(b.mipmaps&&b.mipmaps.length>0)for(let gt=0;gt<b.mipmaps.length;gt++)rt($.__webglFramebuffer[lt][gt],T,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,gt);else rt($.__webglFramebuffer[lt],T,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);m(b)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(wt){for(let lt=0,gt=et.length;lt<gt;lt++){let Xt=et[lt],it=n.get(Xt);e.bindTexture(i.TEXTURE_2D,it.__webglTexture),ft(i.TEXTURE_2D,Xt),rt($.__webglFramebuffer,T,Xt,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),m(Xt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(lt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,j.__webglTexture),ft(lt,b),b.mipmaps&&b.mipmaps.length>0)for(let gt=0;gt<b.mipmaps.length;gt++)rt($.__webglFramebuffer[gt],T,b,i.COLOR_ATTACHMENT0,lt,gt);else rt($.__webglFramebuffer,T,b,i.COLOR_ATTACHMENT0,lt,0);m(b)&&p(lt),e.unbindTexture()}T.depthBuffer&&St(T)}function Ht(T){let b=T.textures;for(let $=0,j=b.length;$<j;$++){let et=b[$];if(m(et)){let K=y(T),wt=n.get(et).__webglTexture;e.bindTexture(K,wt),p(K),e.unbindTexture()}}}let pe=[],U=[];function ve(T){if(T.samples>0){if($t(T)===!1){let b=T.textures,$=T.width,j=T.height,et=i.COLOR_BUFFER_BIT,K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,wt=n.get(T),lt=b.length>1;if(lt)for(let gt=0;gt<b.length;gt++)e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let gt=0;gt<b.length;gt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,wt.__webglColorRenderbuffer[gt]);let Xt=n.get(b[gt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Xt,0)}i.blitFramebuffer(0,0,$,j,0,0,$,j,et,i.NEAREST),l===!0&&(pe.length=0,U.length=0,pe.push(i.COLOR_ATTACHMENT0+gt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(pe.push(K),U.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,U)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pe))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let gt=0;gt<b.length;gt++){e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,wt.__webglColorRenderbuffer[gt]);let Xt=n.get(b[gt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,Xt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let b=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function kt(T){return Math.min(s.maxSamples,T.samples)}function $t(T){let b=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Tt(T){let b=o.render.frame;h.get(T)!==b&&(h.set(T,b),T.update())}function ee(T,b){let $=T.colorSpace,j=T.format,et=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||$!==Ns&&$!==ai&&(qt.getTransfer($)===se?(j!==De||et!==Xe)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),b}function At(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=E,this.resetTextureUnits=L,this.setTexture2D=H,this.setTexture2DArray=N,this.setTexture3D=X,this.setTextureCube=F,this.rebindTextures=Dt,this.setupRenderTarget=ie,this.updateRenderTargetMipmap=Ht,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=$t}function lw(i,t){function e(n,s=ai){let r,o=qt.getTransfer(s);if(n===Xe)return i.UNSIGNED_BYTE;if(n===$h)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Hh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===lp)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===op)return i.BYTE;if(n===ap)return i.SHORT;if(n===Er)return i.UNSIGNED_SHORT;if(n===Vh)return i.INT;if(n===Gn)return i.UNSIGNED_INT;if(n===Mn)return i.FLOAT;if(n===Dr)return i.HALF_FLOAT;if(n===cp)return i.ALPHA;if(n===hp)return i.RGB;if(n===De)return i.RGBA;if(n===up)return i.LUMINANCE;if(n===dp)return i.LUMINANCE_ALPHA;if(n===ys)return i.DEPTH_COMPONENT;if(n===Rs)return i.DEPTH_STENCIL;if(n===Gh)return i.RED;if(n===Wh)return i.RED_INTEGER;if(n===fp)return i.RG;if(n===Xh)return i.RG_INTEGER;if(n===qh)return i.RGBA_INTEGER;if(n===Zo||n===Ko||n===Jo||n===jo)if(o===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Zo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Zo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ko)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Jo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===jo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Nc||n===Oc||n===kc||n===Fc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Nc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Oc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===kc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===zc||n===Bc||n===Vc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===zc||n===Bc)return o===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Vc)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===$c||n===Hc||n===Gc||n===Wc||n===Xc||n===qc||n===Yc||n===Zc||n===Kc||n===Jc||n===jc||n===Qc||n===th||n===eh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===$c)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Hc)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Gc)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Wc)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Xc)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qc)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Yc)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Zc)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Kc)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Jc)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===jc)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qc)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===th)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===eh)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qo||n===nh||n===ih)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Qo)return o===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===nh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ih)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pp||n===sh||n===rh||n===oh)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Qo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===sh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===rh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===oh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ts?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var yh=class extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Sn=class extends Be{constructor(){super(),this.isGroup=!0,this.type="Group"}},cw={type:"move"},Mr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Sn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Sn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Sn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(cw)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Sn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},hw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uw=`
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

}`,bh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new tn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new rn({vertexShader:hw,fragmentShader:uw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new xe(new ha(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wh=class extends Wn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,_=new bh,m=e.getContextAttributes(),p=null,y=null,v=[],x=[],C=new Ct,A=null,R=new Ge;R.viewport=new _e;let P=new Ge;P.viewport=new _e;let M=[R,P],w=new yh,I=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let Z=v[V];return Z===void 0&&(Z=new Mr,v[V]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(V){let Z=v[V];return Z===void 0&&(Z=new Mr,v[V]=Z),Z.getGripSpace()},this.getHand=function(V){let Z=v[V];return Z===void 0&&(Z=new Mr,v[V]=Z),Z.getHandSpace()};function E(V){let Z=x.indexOf(V.inputSource);if(Z===-1)return;let rt=v[Z];rt!==void 0&&(rt.update(V.inputSource,V.frame,c||o),rt.dispatchEvent({type:V.type,data:V.inputSource}))}function B(){s.removeEventListener("select",E),s.removeEventListener("selectstart",E),s.removeEventListener("selectend",E),s.removeEventListener("squeeze",E),s.removeEventListener("squeezestart",E),s.removeEventListener("squeezeend",E),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",H);for(let V=0;V<v.length;V++){let Z=x[V];Z!==null&&(x[V]=null,v[V].disconnect(Z))}I=null,L=null,_.reset(),t.setRenderTarget(p),f=null,u=null,d=null,s=null,y=null,Et.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",E),s.addEventListener("selectstart",E),s.addEventListener("selectend",E),s.addEventListener("squeeze",E),s.addEventListener("squeezestart",E),s.addEventListener("squeezeend",E),s.addEventListener("end",B),s.addEventListener("inputsourceschange",H),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(C),s.renderState.layers===void 0){let Z={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,Z),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new pn(f.framebufferWidth,f.framebufferHeight,{format:De,type:Xe,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let Z=null,rt=null,nt=null;m.depth&&(nt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Z=m.stencil?Rs:ys,rt=m.stencil?Ts:Gn);let pt={colorFormat:e.RGBA8,depthFormat:nt,scaleFactor:r};d=new XRWebGLBinding(s,e),u=d.createProjectionLayer(pt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new pn(u.textureWidth,u.textureHeight,{format:De,type:Xe,depthTexture:new Is(u.textureWidth,u.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Et.setContext(s),Et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function H(V){for(let Z=0;Z<V.removed.length;Z++){let rt=V.removed[Z],nt=x.indexOf(rt);nt>=0&&(x[nt]=null,v[nt].disconnect(rt))}for(let Z=0;Z<V.added.length;Z++){let rt=V.added[Z],nt=x.indexOf(rt);if(nt===-1){for(let St=0;St<v.length;St++)if(St>=x.length){x.push(rt),nt=St;break}else if(x[St]===null){x[St]=rt,nt=St;break}if(nt===-1)break}let pt=v[nt];pt&&pt.connect(rt)}}let N=new z,X=new z;function F(V,Z,rt){N.setFromMatrixPosition(Z.matrixWorld),X.setFromMatrixPosition(rt.matrixWorld);let nt=N.distanceTo(X),pt=Z.projectionMatrix.elements,St=rt.projectionMatrix.elements,Dt=pt[14]/(pt[10]-1),ie=pt[14]/(pt[10]+1),Ht=(pt[9]+1)/pt[5],pe=(pt[9]-1)/pt[5],U=(pt[8]-1)/pt[0],ve=(St[8]+1)/St[0],kt=Dt*U,$t=Dt*ve,Tt=nt/(-U+ve),ee=Tt*-U;if(Z.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(ee),V.translateZ(Tt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),pt[10]===-1)V.projectionMatrix.copy(Z.projectionMatrix),V.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let At=Dt+Tt,T=ie+Tt,b=kt-ee,$=$t+(nt-ee),j=Ht*ie/T*At,et=pe*ie/T*At;V.projectionMatrix.makePerspective(b,$,j,et,At,T),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function tt(V,Z){Z===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(Z.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let Z=V.near,rt=V.far;_.texture!==null&&(_.depthNear>0&&(Z=_.depthNear),_.depthFar>0&&(rt=_.depthFar)),w.near=P.near=R.near=Z,w.far=P.far=R.far=rt,(I!==w.near||L!==w.far)&&(s.updateRenderState({depthNear:w.near,depthFar:w.far}),I=w.near,L=w.far),R.layers.mask=V.layers.mask|2,P.layers.mask=V.layers.mask|4,w.layers.mask=R.layers.mask|P.layers.mask;let nt=V.parent,pt=w.cameras;tt(w,nt);for(let St=0;St<pt.length;St++)tt(pt[St],nt);pt.length===2?F(w,R,P):w.projectionMatrix.copy(R.projectionMatrix),J(V,w,nt)};function J(V,Z,rt){rt===null?V.matrix.copy(Z.matrixWorld):(V.matrix.copy(rt.matrixWorld),V.matrix.invert(),V.matrix.multiply(Z.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(Z.projectionMatrix),V.projectionMatrixInverse.copy(Z.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Ar*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(V){l=V,u!==null&&(u.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(w)};let ct=null;function ft(V,Z){if(h=Z.getViewerPose(c||o),g=Z,h!==null){let rt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let nt=!1;rt.length!==w.cameras.length&&(w.cameras.length=0,nt=!0);for(let St=0;St<rt.length;St++){let Dt=rt[St],ie=null;if(f!==null)ie=f.getViewport(Dt);else{let pe=d.getViewSubImage(u,Dt);ie=pe.viewport,St===0&&(t.setRenderTargetTextures(y,pe.colorTexture,u.ignoreDepthValues?void 0:pe.depthStencilTexture),t.setRenderTarget(y))}let Ht=M[St];Ht===void 0&&(Ht=new Ge,Ht.layers.enable(St),Ht.viewport=new _e,M[St]=Ht),Ht.matrix.fromArray(Dt.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray(Dt.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(ie.x,ie.y,ie.width,ie.height),St===0&&(w.matrix.copy(Ht.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),nt===!0&&w.cameras.push(Ht)}let pt=s.enabledFeatures;if(pt&&pt.includes("depth-sensing")){let St=d.getDepthInformation(rt[0]);St&&St.isValid&&St.texture&&_.init(t,St,s.renderState)}}for(let rt=0;rt<v.length;rt++){let nt=x[rt],pt=v[rt];nt!==null&&pt!==void 0&&pt.update(nt,Z,c||o)}ct&&ct(V,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}let Et=new bp;Et.setAnimationLoop(ft),this.setAnimationLoop=function(V){ct=V},this.dispose=function(){}}},Di=new En,dw=new te;function fw(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,yp(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Fe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Fe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let y=t.get(p),v=y.envMap,x=y.envMapRotation;v&&(m.envMap.value=v,Di.copy(x),Di.x*=-1,Di.y*=-1,Di.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),m.envMapRotation.value.setFromMatrix4(dw.makeRotationFromEuler(Di)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Fe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function pw(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){let x=v.program;n.uniformBlockBinding(y,x)}function c(y,v){let x=s[y.id];x===void 0&&(g(y),x=h(y),s[y.id]=x,y.addEventListener("dispose",m));let C=v.program;n.updateUBOMapping(y,C);let A=t.render.frame;r[y.id]!==A&&(u(y),r[y.id]=A)}function h(y){let v=d();y.__bindingPointIndex=v;let x=i.createBuffer(),C=y.__size,A=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,C,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,x),x}function d(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let v=s[y.id],x=y.uniforms,C=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let A=0,R=x.length;A<R;A++){let P=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,w=P.length;M<w;M++){let I=P[M];if(f(I,A,M,C)===!0){let L=I.__offset,E=Array.isArray(I.value)?I.value:[I.value],B=0;for(let H=0;H<E.length;H++){let N=E[H],X=_(N);typeof N=="number"||typeof N=="boolean"?(I.__data[0]=N,i.bufferSubData(i.UNIFORM_BUFFER,L+B,I.__data)):N.isMatrix3?(I.__data[0]=N.elements[0],I.__data[1]=N.elements[1],I.__data[2]=N.elements[2],I.__data[3]=0,I.__data[4]=N.elements[3],I.__data[5]=N.elements[4],I.__data[6]=N.elements[5],I.__data[7]=0,I.__data[8]=N.elements[6],I.__data[9]=N.elements[7],I.__data[10]=N.elements[8],I.__data[11]=0):(N.toArray(I.__data,B),B+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,v,x,C){let A=y.value,R=v+"_"+x;if(C[R]===void 0)return typeof A=="number"||typeof A=="boolean"?C[R]=A:C[R]=A.clone(),!0;{let P=C[R];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return C[R]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function g(y){let v=y.uniforms,x=0,C=16;for(let R=0,P=v.length;R<P;R++){let M=Array.isArray(v[R])?v[R]:[v[R]];for(let w=0,I=M.length;w<I;w++){let L=M[w],E=Array.isArray(L.value)?L.value:[L.value];for(let B=0,H=E.length;B<H;B++){let N=E[B],X=_(N),F=x%C,tt=F%X.boundary,J=F+tt;x+=tt,J!==0&&C-J<X.storage&&(x+=C-J),L.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=x,x+=X.storage}}}let A=x%C;return A>0&&(x+=C-A),y.__size=x,y.__cache={},this}function _(y){let v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){let v=y.target;v.removeEventListener("dispose",m);let x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(let y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}var fa=class{constructor(t={}){let{canvas:e=x0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,y=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ie,this.toneMapping=ui,this.toneMappingExposure=1;let x=this,C=!1,A=0,R=0,P=null,M=-1,w=null,I=new _e,L=new _e,E=null,B=new Vt(0),H=0,N=e.width,X=e.height,F=1,tt=null,J=null,ct=new _e(0,0,N,X),ft=new _e(0,0,N,X),Et=!1,V=new Rr,Z=!1,rt=!1,nt=new te,pt=new te,St=new z,Dt=new _e,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ht=!1;function pe(){return P===null?F:1}let U=n;function ve(S,O){return e.getContext(S,O)}try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ht,!1),U===null){let O="webgl2";if(U=ve(O,S),U===null)throw ve(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let kt,$t,Tt,ee,At,T,b,$,j,et,K,wt,lt,gt,Xt,it,_t,Rt,Pt,xt,Gt,Ft,ae,D;function at(){kt=new Py(U),kt.init(),Ft=new lw(U,kt),$t=new Sy(U,kt,t,Ft),Tt=new rw(U,kt),$t.reverseDepthBuffer&&u&&Tt.buffers.depth.setReversed(!0),ee=new Dy(U),At=new Xb,T=new aw(U,kt,Tt,At,$t,Ft,ee),b=new Ay(x),$=new Cy(x),j=new B0(U),ae=new wy(U,j),et=new Iy(U,j,ee,ae),K=new Ny(U,et,j,ee),Pt=new Uy(U,$t,T),it=new Ey(At),wt=new Wb(x,b,$,kt,$t,ae,it),lt=new fw(x,At),gt=new Yb,Xt=new tw(kt),Rt=new by(x,b,$,Tt,K,f,l),_t=new iw(x,K,$t),D=new pw(U,ee,$t,Tt),xt=new My(U,kt,ee),Gt=new Ly(U,kt,ee),ee.programs=wt.programs,x.capabilities=$t,x.extensions=kt,x.properties=At,x.renderLists=gt,x.shadowMap=_t,x.state=Tt,x.info=ee}at();let q=new wh(x,U);this.xr=q,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let S=kt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=kt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(S){S!==void 0&&(F=S,this.setSize(N,X,!1))},this.getSize=function(S){return S.set(N,X)},this.setSize=function(S,O,G=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=S,X=O,e.width=Math.floor(S*F),e.height=Math.floor(O*F),G===!0&&(e.style.width=S+"px",e.style.height=O+"px"),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(N*F,X*F).floor()},this.setDrawingBufferSize=function(S,O,G){N=S,X=O,F=G,e.width=Math.floor(S*G),e.height=Math.floor(O*G),this.setViewport(0,0,S,O)},this.getCurrentViewport=function(S){return S.copy(I)},this.getViewport=function(S){return S.copy(ct)},this.setViewport=function(S,O,G,W){S.isVector4?ct.set(S.x,S.y,S.z,S.w):ct.set(S,O,G,W),Tt.viewport(I.copy(ct).multiplyScalar(F).round())},this.getScissor=function(S){return S.copy(ft)},this.setScissor=function(S,O,G,W){S.isVector4?ft.set(S.x,S.y,S.z,S.w):ft.set(S,O,G,W),Tt.scissor(L.copy(ft).multiplyScalar(F).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(S){Tt.setScissorTest(Et=S)},this.setOpaqueSort=function(S){tt=S},this.setTransparentSort=function(S){J=S},this.getClearColor=function(S){return S.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(S=!0,O=!0,G=!0){let W=0;if(S){let k=!1;if(P!==null){let st=P.texture.format;k=st===qh||st===Xh||st===Wh}if(k){let st=P.texture.type,ut=st===Xe||st===Gn||st===Er||st===Ts||st===$h||st===Hh,vt=Rt.getClearColor(),yt=Rt.getClearAlpha(),It=vt.r,Nt=vt.g,bt=vt.b;ut?(g[0]=It,g[1]=Nt,g[2]=bt,g[3]=yt,U.clearBufferuiv(U.COLOR,0,g)):(_[0]=It,_[1]=Nt,_[2]=bt,_[3]=yt,U.clearBufferiv(U.COLOR,0,_))}else W|=U.COLOR_BUFFER_BIT}O&&(W|=U.DEPTH_BUFFER_BIT),G&&(W|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),gt.dispose(),Xt.dispose(),At.dispose(),b.dispose(),$.dispose(),K.dispose(),ae.dispose(),D.dispose(),wt.dispose(),q.dispose(),q.removeEventListener("sessionstart",Fu),q.removeEventListener("sessionend",zu),yi.stop()};function Q(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let S=ee.autoReset,O=_t.enabled,G=_t.autoUpdate,W=_t.needsUpdate,k=_t.type;at(),ee.autoReset=S,_t.enabled=O,_t.autoUpdate=G,_t.needsUpdate=W,_t.type=k}function ht(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ut(S){let O=S.target;O.removeEventListener("dispose",Ut),ge(O)}function ge(S){Ue(S),At.remove(S)}function Ue(S){let O=At.get(S).programs;O!==void 0&&(O.forEach(function(G){wt.releaseProgram(G)}),S.isShaderMaterial&&wt.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,G,W,k,st){O===null&&(O=ie);let ut=k.isMesh&&k.matrixWorld.determinant()<0,vt=vg(S,O,G,W,k);Tt.setMaterial(W,ut);let yt=G.index,It=1;if(W.wireframe===!0){if(yt=et.getWireframeAttribute(G),yt===void 0)return;It=2}let Nt=G.drawRange,bt=G.attributes.position,Kt=Nt.start*It,le=(Nt.start+Nt.count)*It;st!==null&&(Kt=Math.max(Kt,st.start*It),le=Math.min(le,(st.start+st.count)*It)),yt!==null?(Kt=Math.max(Kt,0),le=Math.min(le,yt.count)):bt!=null&&(Kt=Math.max(Kt,0),le=Math.min(le,bt.count));let ce=le-Kt;if(ce<0||ce===1/0)return;ae.setup(k,W,vt,G,yt);let qe,Jt=xt;if(yt!==null&&(qe=j.get(yt),Jt=Gt,Jt.setIndex(qe)),k.isMesh)W.wireframe===!0?(Tt.setLineWidth(W.wireframeLinewidth*pe()),Jt.setMode(U.LINES)):Jt.setMode(U.TRIANGLES);else if(k.isLine){let Mt=W.linewidth;Mt===void 0&&(Mt=1),Tt.setLineWidth(Mt*pe()),k.isLineSegments?Jt.setMode(U.LINES):k.isLineLoop?Jt.setMode(U.LINE_LOOP):Jt.setMode(U.LINE_STRIP)}else k.isPoints?Jt.setMode(U.POINTS):k.isSprite&&Jt.setMode(U.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Jt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(kt.get("WEBGL_multi_draw"))Jt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Mt=k._multiDrawStarts,Cn=k._multiDrawCounts,jt=k._multiDrawCount,ln=yt?j.get(yt).bytesPerElement:1,Ki=At.get(W).currentProgram.getUniforms();for(let Ke=0;Ke<jt;Ke++)Ki.setValue(U,"_gl_DrawID",Ke),Jt.render(Mt[Ke]/ln,Cn[Ke])}else if(k.isInstancedMesh)Jt.renderInstances(Kt,ce,k.count);else if(G.isInstancedBufferGeometry){let Mt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Cn=Math.min(G.instanceCount,Mt);Jt.renderInstances(Kt,ce,Cn)}else Jt.render(Kt,ce)};function ne(S,O,G){S.transparent===!0&&S.side===Ae&&S.forceSinglePass===!1?(S.side=Fe,S.needsUpdate=!0,Zr(S,O,G),S.side=di,S.needsUpdate=!0,Zr(S,O,G),S.side=Ae):Zr(S,O,G)}this.compile=function(S,O,G=null){G===null&&(G=S),p=Xt.get(G),p.init(O),v.push(p),G.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),S!==G&&S.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let W=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let st=k.material;if(st)if(Array.isArray(st))for(let ut=0;ut<st.length;ut++){let vt=st[ut];ne(vt,G,k),W.add(vt)}else ne(st,G,k),W.add(st)}),v.pop(),p=null,W},this.compileAsync=function(S,O,G=null){let W=this.compile(S,O,G);return new Promise(k=>{function st(){if(W.forEach(function(ut){At.get(ut).currentProgram.isReady()&&W.delete(ut)}),W.size===0){k(S);return}setTimeout(st,10)}kt.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let an=null;function Rn(S){an&&an(S)}function Fu(){yi.stop()}function zu(){yi.start()}let yi=new bp;yi.setAnimationLoop(Rn),typeof self<"u"&&yi.setContext(self),this.setAnimationLoop=function(S){an=S,q.setAnimationLoop(S),S===null?yi.stop():yi.start()},q.addEventListener("sessionstart",Fu),q.addEventListener("sessionend",zu),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(O),O=q.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,O,P),p=Xt.get(S,v.length),p.init(O),v.push(p),pt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),V.setFromProjectionMatrix(pt),rt=this.localClippingEnabled,Z=it.init(this.clippingPlanes,rt),m=gt.get(S,y.length),m.init(),y.push(m),q.enabled===!0&&q.isPresenting===!0){let st=x.xr.getDepthSensingMesh();st!==null&&ml(st,O,-1/0,x.sortObjects)}ml(S,O,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(tt,J),Ht=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Ht&&Rt.addToRenderList(m,S),this.info.render.frame++,Z===!0&&it.beginShadows();let G=p.state.shadowsArray;_t.render(G,S,O),Z===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=m.opaque,k=m.transmissive;if(p.setupLights(),O.isArrayCamera){let st=O.cameras;if(k.length>0)for(let ut=0,vt=st.length;ut<vt;ut++){let yt=st[ut];Vu(W,k,S,yt)}Ht&&Rt.render(S);for(let ut=0,vt=st.length;ut<vt;ut++){let yt=st[ut];Bu(m,S,yt,yt.viewport)}}else k.length>0&&Vu(W,k,S,O),Ht&&Rt.render(S),Bu(m,S,O);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(x,S,O),ae.resetDefaultState(),M=-1,w=null,v.pop(),v.length>0?(p=v[v.length-1],Z===!0&&it.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function ml(S,O,G,W){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||V.intersectsSprite(S)){W&&Dt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(pt);let ut=K.update(S),vt=S.material;vt.visible&&m.push(S,ut,vt,G,Dt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||V.intersectsObject(S))){let ut=K.update(S),vt=S.material;if(W&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Dt.copy(S.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Dt.copy(ut.boundingSphere.center)),Dt.applyMatrix4(S.matrixWorld).applyMatrix4(pt)),Array.isArray(vt)){let yt=ut.groups;for(let It=0,Nt=yt.length;It<Nt;It++){let bt=yt[It],Kt=vt[bt.materialIndex];Kt&&Kt.visible&&m.push(S,ut,Kt,G,Dt.z,bt)}}else vt.visible&&m.push(S,ut,vt,G,Dt.z,null)}}let st=S.children;for(let ut=0,vt=st.length;ut<vt;ut++)ml(st[ut],O,G,W)}function Bu(S,O,G,W){let k=S.opaque,st=S.transmissive,ut=S.transparent;p.setupLightsView(G),Z===!0&&it.setGlobalState(x.clippingPlanes,G),W&&Tt.viewport(I.copy(W)),k.length>0&&Yr(k,O,G),st.length>0&&Yr(st,O,G),ut.length>0&&Yr(ut,O,G),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function Vu(S,O,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new pn(1,1,{generateMipmaps:!0,type:kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float")?Dr:Xe,minFilter:ki,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));let st=p.state.transmissionRenderTarget[W.id],ut=W.viewport||I;st.setSize(ut.z,ut.w);let vt=x.getRenderTarget();x.setRenderTarget(st),x.getClearColor(B),H=x.getClearAlpha(),H<1&&x.setClearColor(16777215,.5),x.clear(),Ht&&Rt.render(G);let yt=x.toneMapping;x.toneMapping=ui;let It=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),Z===!0&&it.setGlobalState(x.clippingPlanes,W),Yr(S,G,W),T.updateMultisampleRenderTarget(st),T.updateRenderTargetMipmap(st),kt.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let bt=0,Kt=O.length;bt<Kt;bt++){let le=O[bt],ce=le.object,qe=le.geometry,Jt=le.material,Mt=le.group;if(Jt.side===Ae&&ce.layers.test(W.layers)){let Cn=Jt.side;Jt.side=Fe,Jt.needsUpdate=!0,$u(ce,G,W,qe,Jt,Mt),Jt.side=Cn,Jt.needsUpdate=!0,Nt=!0}}Nt===!0&&(T.updateMultisampleRenderTarget(st),T.updateRenderTargetMipmap(st))}x.setRenderTarget(vt),x.setClearColor(B,H),It!==void 0&&(W.viewport=It),x.toneMapping=yt}function Yr(S,O,G){let W=O.isScene===!0?O.overrideMaterial:null;for(let k=0,st=S.length;k<st;k++){let ut=S[k],vt=ut.object,yt=ut.geometry,It=W===null?ut.material:W,Nt=ut.group;vt.layers.test(G.layers)&&$u(vt,O,G,yt,It,Nt)}}function $u(S,O,G,W,k,st){S.onBeforeRender(x,O,G,W,k,st),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(x,O,G,W,S,st),k.transparent===!0&&k.side===Ae&&k.forceSinglePass===!1?(k.side=Fe,k.needsUpdate=!0,x.renderBufferDirect(G,O,W,k,S,st),k.side=di,k.needsUpdate=!0,x.renderBufferDirect(G,O,W,k,S,st),k.side=Ae):x.renderBufferDirect(G,O,W,k,S,st),S.onAfterRender(x,O,G,W,k,st)}function Zr(S,O,G){O.isScene!==!0&&(O=ie);let W=At.get(S),k=p.state.lights,st=p.state.shadowsArray,ut=k.state.version,vt=wt.getParameters(S,k.state,st,O,G),yt=wt.getProgramCacheKey(vt),It=W.programs;W.environment=S.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(S.isMeshStandardMaterial?$:b).get(S.envMap||W.environment),W.envMapRotation=W.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,It===void 0&&(S.addEventListener("dispose",Ut),It=new Map,W.programs=It);let Nt=It.get(yt);if(Nt!==void 0){if(W.currentProgram===Nt&&W.lightsStateVersion===ut)return Gu(S,vt),Nt}else vt.uniforms=wt.getUniforms(S),S.onBeforeCompile(vt,x),Nt=wt.acquireProgram(vt,yt),It.set(yt,Nt),W.uniforms=vt.uniforms;let bt=W.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(bt.clippingPlanes=it.uniform),Gu(S,vt),W.needsLights=bg(S),W.lightsStateVersion=ut,W.needsLights&&(bt.ambientLightColor.value=k.state.ambient,bt.lightProbe.value=k.state.probe,bt.directionalLights.value=k.state.directional,bt.directionalLightShadows.value=k.state.directionalShadow,bt.spotLights.value=k.state.spot,bt.spotLightShadows.value=k.state.spotShadow,bt.rectAreaLights.value=k.state.rectArea,bt.ltc_1.value=k.state.rectAreaLTC1,bt.ltc_2.value=k.state.rectAreaLTC2,bt.pointLights.value=k.state.point,bt.pointLightShadows.value=k.state.pointShadow,bt.hemisphereLights.value=k.state.hemi,bt.directionalShadowMap.value=k.state.directionalShadowMap,bt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,bt.spotShadowMap.value=k.state.spotShadowMap,bt.spotLightMatrix.value=k.state.spotLightMatrix,bt.spotLightMap.value=k.state.spotLightMap,bt.pointShadowMap.value=k.state.pointShadowMap,bt.pointShadowMatrix.value=k.state.pointShadowMatrix),W.currentProgram=Nt,W.uniformsList=null,Nt}function Hu(S){if(S.uniformsList===null){let O=S.currentProgram.getUniforms();S.uniformsList=Ms.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function Gu(S,O){let G=At.get(S);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function vg(S,O,G,W,k){O.isScene!==!0&&(O=ie),T.resetTextureUnits();let st=O.fog,ut=W.isMeshStandardMaterial?O.environment:null,vt=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ns,yt=(W.isMeshStandardMaterial?$:b).get(W.envMap||ut),It=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Nt=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),bt=!!G.morphAttributes.position,Kt=!!G.morphAttributes.normal,le=!!G.morphAttributes.color,ce=ui;W.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ce=x.toneMapping);let qe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Jt=qe!==void 0?qe.length:0,Mt=At.get(W),Cn=p.state.lights;if(Z===!0&&(rt===!0||S!==w)){let en=S===w&&W.id===M;it.setState(W,S,en)}let jt=!1;W.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==Cn.state.version||Mt.outputColorSpace!==vt||k.isBatchedMesh&&Mt.batching===!1||!k.isBatchedMesh&&Mt.batching===!0||k.isBatchedMesh&&Mt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Mt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Mt.instancing===!1||!k.isInstancedMesh&&Mt.instancing===!0||k.isSkinnedMesh&&Mt.skinning===!1||!k.isSkinnedMesh&&Mt.skinning===!0||k.isInstancedMesh&&Mt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Mt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Mt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Mt.instancingMorph===!1&&k.morphTexture!==null||Mt.envMap!==yt||W.fog===!0&&Mt.fog!==st||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==it.numPlanes||Mt.numIntersection!==it.numIntersection)||Mt.vertexAlphas!==It||Mt.vertexTangents!==Nt||Mt.morphTargets!==bt||Mt.morphNormals!==Kt||Mt.morphColors!==le||Mt.toneMapping!==ce||Mt.morphTargetsCount!==Jt)&&(jt=!0):(jt=!0,Mt.__version=W.version);let ln=Mt.currentProgram;jt===!0&&(ln=Zr(W,O,k));let Ki=!1,Ke=!1,Zs=!1,he=ln.getUniforms(),yn=Mt.uniforms;if(Tt.useProgram(ln.program)&&(Ki=!0,Ke=!0,Zs=!0),W.id!==M&&(M=W.id,Ke=!0),Ki||w!==S){Tt.buffers.depth.getReversed()?(nt.copy(S.projectionMatrix),y0(nt),b0(nt),he.setValue(U,"projectionMatrix",nt)):he.setValue(U,"projectionMatrix",S.projectionMatrix),he.setValue(U,"viewMatrix",S.matrixWorldInverse);let Kn=he.map.cameraPosition;Kn!==void 0&&Kn.setValue(U,St.setFromMatrixPosition(S.matrixWorld)),$t.logarithmicDepthBuffer&&he.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&he.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),w!==S&&(w=S,Ke=!0,Zs=!0)}if(k.isSkinnedMesh){he.setOptional(U,k,"bindMatrix"),he.setOptional(U,k,"bindMatrixInverse");let en=k.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),he.setValue(U,"boneTexture",en.boneTexture,T))}k.isBatchedMesh&&(he.setOptional(U,k,"batchingTexture"),he.setValue(U,"batchingTexture",k._matricesTexture,T),he.setOptional(U,k,"batchingIdTexture"),he.setValue(U,"batchingIdTexture",k._indirectTexture,T),he.setOptional(U,k,"batchingColorTexture"),k._colorsTexture!==null&&he.setValue(U,"batchingColorTexture",k._colorsTexture,T));let Ks=G.morphAttributes;if((Ks.position!==void 0||Ks.normal!==void 0||Ks.color!==void 0)&&Pt.update(k,G,ln),(Ke||Mt.receiveShadow!==k.receiveShadow)&&(Mt.receiveShadow=k.receiveShadow,he.setValue(U,"receiveShadow",k.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(yn.envMap.value=yt,yn.flipEnvMap.value=yt.isCubeTexture&&yt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&O.environment!==null&&(yn.envMapIntensity.value=O.environmentIntensity),Ke&&(he.setValue(U,"toneMappingExposure",x.toneMappingExposure),Mt.needsLights&&yg(yn,Zs),st&&W.fog===!0&&lt.refreshFogUniforms(yn,st),lt.refreshMaterialUniforms(yn,W,F,X,p.state.transmissionRenderTarget[S.id]),Ms.upload(U,Hu(Mt),yn,T)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ms.upload(U,Hu(Mt),yn,T),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&he.setValue(U,"center",k.center),he.setValue(U,"modelViewMatrix",k.modelViewMatrix),he.setValue(U,"normalMatrix",k.normalMatrix),he.setValue(U,"modelMatrix",k.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let en=W.uniformsGroups;for(let Kn=0,Jn=en.length;Kn<Jn;Kn++){let Wu=en[Kn];D.update(Wu,ln),D.bind(Wu,ln)}}return ln}function yg(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function bg(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,O,G){At.get(S.texture).__webglTexture=O,At.get(S.depthTexture).__webglTexture=G;let W=At.get(S);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||kt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,O){let G=At.get(S);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(S,O=0,G=0){P=S,A=O,R=G;let W=!0,k=null,st=!1,ut=!1;if(S){let yt=At.get(S);if(yt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(U.FRAMEBUFFER,null),W=!1;else if(yt.__webglFramebuffer===void 0)T.setupRenderTarget(S);else if(yt.__hasExternalTextures)T.rebindTextures(S,At.get(S.texture).__webglTexture,At.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let bt=S.depthTexture;if(yt.__boundDepthTexture!==bt){if(bt!==null&&At.has(bt)&&(S.width!==bt.image.width||S.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(S)}}let It=S.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(ut=!0);let Nt=At.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Nt[O])?k=Nt[O][G]:k=Nt[O],st=!0):S.samples>0&&T.useMultisampledRTT(S)===!1?k=At.get(S).__webglMultisampledFramebuffer:Array.isArray(Nt)?k=Nt[G]:k=Nt,I.copy(S.viewport),L.copy(S.scissor),E=S.scissorTest}else I.copy(ct).multiplyScalar(F).floor(),L.copy(ft).multiplyScalar(F).floor(),E=Et;if(Tt.bindFramebuffer(U.FRAMEBUFFER,k)&&W&&Tt.drawBuffers(S,k),Tt.viewport(I),Tt.scissor(L),Tt.setScissorTest(E),st){let yt=At.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+O,yt.__webglTexture,G)}else if(ut){let yt=At.get(S.texture),It=O||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,yt.__webglTexture,G||0,It)}M=-1},this.readRenderTargetPixels=function(S,O,G,W,k,st,ut){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=At.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ut!==void 0&&(vt=vt[ut]),vt){Tt.bindFramebuffer(U.FRAMEBUFFER,vt);try{let yt=S.texture,It=yt.format,Nt=yt.type;if(!$t.textureFormatReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$t.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-W&&G>=0&&G<=S.height-k&&U.readPixels(O,G,W,k,Ft.convert(It),Ft.convert(Nt),st)}finally{let yt=P!==null?At.get(P).__webglFramebuffer:null;Tt.bindFramebuffer(U.FRAMEBUFFER,yt)}}},this.readRenderTargetPixelsAsync=async function(S,O,G,W,k,st,ut){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=At.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ut!==void 0&&(vt=vt[ut]),vt){let yt=S.texture,It=yt.format,Nt=yt.type;if(!$t.textureFormatReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$t.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=S.width-W&&G>=0&&G<=S.height-k){Tt.bindFramebuffer(U.FRAMEBUFFER,vt);let bt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,bt),U.bufferData(U.PIXEL_PACK_BUFFER,st.byteLength,U.STREAM_READ),U.readPixels(O,G,W,k,Ft.convert(It),Ft.convert(Nt),0);let Kt=P!==null?At.get(P).__webglFramebuffer:null;Tt.bindFramebuffer(U.FRAMEBUFFER,Kt);let le=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await v0(U,le,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,bt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,st),U.deleteBuffer(bt),U.deleteSync(le),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,O=null,G=0){S.isTexture!==!0&&(yr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,S=arguments[1]);let W=Math.pow(2,-G),k=Math.floor(S.image.width*W),st=Math.floor(S.image.height*W),ut=O!==null?O.x:0,vt=O!==null?O.y:0;T.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,G,0,0,ut,vt,k,st),Tt.unbindTexture()},this.copyTextureToTexture=function(S,O,G=null,W=null,k=0){S.isTexture!==!0&&(yr("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,S=arguments[1],O=arguments[2],k=arguments[3]||0,G=null);let st,ut,vt,yt,It,Nt,bt,Kt,le,ce=S.isCompressedTexture?S.mipmaps[k]:S.image;G!==null?(st=G.max.x-G.min.x,ut=G.max.y-G.min.y,vt=G.isBox3?G.max.z-G.min.z:1,yt=G.min.x,It=G.min.y,Nt=G.isBox3?G.min.z:0):(st=ce.width,ut=ce.height,vt=ce.depth||1,yt=0,It=0,Nt=0),W!==null?(bt=W.x,Kt=W.y,le=W.z):(bt=0,Kt=0,le=0);let qe=Ft.convert(O.format),Jt=Ft.convert(O.type),Mt;O.isData3DTexture?(T.setTexture3D(O,0),Mt=U.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(T.setTexture2DArray(O,0),Mt=U.TEXTURE_2D_ARRAY):(T.setTexture2D(O,0),Mt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment);let Cn=U.getParameter(U.UNPACK_ROW_LENGTH),jt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),ln=U.getParameter(U.UNPACK_SKIP_PIXELS),Ki=U.getParameter(U.UNPACK_SKIP_ROWS),Ke=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ce.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ce.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,yt),U.pixelStorei(U.UNPACK_SKIP_ROWS,It),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Nt);let Zs=S.isDataArrayTexture||S.isData3DTexture,he=O.isDataArrayTexture||O.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){let yn=At.get(S),Ks=At.get(O),en=At.get(yn.__renderTarget),Kn=At.get(Ks.__renderTarget);Tt.bindFramebuffer(U.READ_FRAMEBUFFER,en.__webglFramebuffer),Tt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Kn.__webglFramebuffer);for(let Jn=0;Jn<vt;Jn++)Zs&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,At.get(S).__webglTexture,k,Nt+Jn),S.isDepthTexture?(he&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,At.get(O).__webglTexture,k,le+Jn),U.blitFramebuffer(yt,It,st,ut,bt,Kt,st,ut,U.DEPTH_BUFFER_BIT,U.NEAREST)):he?U.copyTexSubImage3D(Mt,k,bt,Kt,le+Jn,yt,It,st,ut):U.copyTexSubImage2D(Mt,k,bt,Kt,le+Jn,yt,It,st,ut);Tt.bindFramebuffer(U.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else he?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(Mt,k,bt,Kt,le,st,ut,vt,qe,Jt,ce.data):O.isCompressedArrayTexture?U.compressedTexSubImage3D(Mt,k,bt,Kt,le,st,ut,vt,qe,ce.data):U.texSubImage3D(Mt,k,bt,Kt,le,st,ut,vt,qe,Jt,ce):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,k,bt,Kt,st,ut,qe,Jt,ce.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,k,bt,Kt,ce.width,ce.height,qe,ce.data):U.texSubImage2D(U.TEXTURE_2D,k,bt,Kt,st,ut,qe,Jt,ce);U.pixelStorei(U.UNPACK_ROW_LENGTH,Cn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,jt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ln),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ki),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ke),k===0&&O.generateMipmaps&&U.generateMipmap(Mt),Tt.unbindTexture()},this.copyTextureToTexture3D=function(S,O,G=null,W=null,k=0){return S.isTexture!==!0&&(yr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,W=arguments[1]||null,S=arguments[2],O=arguments[3],k=arguments[4]||0),yr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,O,G,W,k)},this.initRenderTarget=function(S){At.get(S).__webglFramebuffer===void 0&&T.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?T.setTextureCube(S,0):S.isData3DTexture?T.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?T.setTexture2DArray(S,0):T.setTexture2D(S,0),Tt.unbindTexture()},this.resetState=function(){A=0,R=0,P=null,Tt.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}};var pa=class extends Be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Ls=class extends tn{constructor(t=null,e=1,n=1,s,r,o,a,l,c=ze,h=ze,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ma=class extends ye{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},_s=new te,Xf=new te,Bo=[],qf=new Xn,mw=new te,_r=new xe,xr=new qn,ga=class extends xe{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ma(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,mw)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Xn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,_s),qf.copy(t.boundingBox).applyMatrix4(_s),this.boundingBox.union(qf)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new qn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,_s),xr.copy(t.boundingSphere).applyMatrix4(_s),this.boundingSphere.union(xr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(_r.geometry=this.geometry,_r.material=this.material,_r.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xr.copy(this.boundingSphere),xr.applyMatrix4(n),t.ray.intersectsSphere(xr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,_s),Xf.multiplyMatrices(n,_s),_r.matrixWorld=Xf,_r.raycast(t,Bo);for(let o=0,a=Bo.length;o<a;o++){let l=Bo[o];l.instanceId=r,l.object=this,e.push(l)}Bo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ma(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ls(new Float32Array(s*this.count),s,this.count,Gh,Mn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Ds=class extends Yn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Vt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},_a=new z,xa=new z,Yf=new te,vr=new fi,Vo=new qn,yc=new z,Zf=new z,Mh=class extends Be{constructor(t=new Ve,e=new Ds){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)_a.fromBufferAttribute(e,s-1),xa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=_a.distanceTo(xa);t.setAttribute("lineDistance",new We(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vo.copy(n.boundingSphere),Vo.applyMatrix4(s),Vo.radius+=r,t.ray.intersectsSphere(Vo)===!1)return;Yf.copy(s).invert(),vr.copy(t.ray).applyMatrix4(Yf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){let p=h.getX(_),y=h.getX(_+1),v=$o(this,t,vr,l,p,y);v&&e.push(v)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(f),p=$o(this,t,vr,l,_,m);p&&e.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){let p=$o(this,t,vr,l,_,_+1);p&&e.push(p)}if(this.isLineLoop){let _=$o(this,t,vr,l,g-1,f);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function $o(i,t,e,n,s,r){let o=i.geometry.attributes.position;if(_a.fromBufferAttribute(o,s),xa.fromBufferAttribute(o,r),e.distanceSqToSegment(_a,xa,yc,Zf)>n)return;yc.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(yc);if(!(l<t.near||l>t.far))return{distance:l,point:Zf.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var Kf=new z,Jf=new z,Cr=class extends Mh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Kf.fromBufferAttribute(e,s),Jf.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Kf.distanceTo(Jf);t.setAttribute("lineDistance",new We(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Pr=class extends Yn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},jf=new te,Sh=new fi,Ho=new qn,Go=new z,va=class extends Be{constructor(t=new Ve,e=new Pr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ho.copy(n.boundingSphere),Ho.applyMatrix4(s),Ho.radius+=r,t.ray.intersectsSphere(Ho)===!1)return;jf.copy(s).invert(),Sh.copy(t.ray).applyMatrix4(jf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=u,_=f;g<_;g++){let m=c.getX(g);Go.fromBufferAttribute(d,m),Qf(Go,m,l,s,t,e,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,_=f;g<_;g++)Go.fromBufferAttribute(d,g),Qf(Go,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Qf(i,t,e,n,s,r,o){let a=Sh.distanceSqToPoint(i);if(a<e){let l=new z;Sh.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Wo=new z,Xo=new z,bc=new z,qo=new li,ya=class extends Ve{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(bs*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:_,b:m,c:p}=qo;if(_.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),qo.getNormal(bc),d[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,d[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,d[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let y=0;y<3;y++){let v=(y+1)%3,x=d[y],C=d[v],A=qo[h[y]],R=qo[h[v]],P=`${x}_${C}`,M=`${C}_${x}`;M in u&&u[M]?(bc.dot(u[M].normal)<=r&&(f.push(A.x,A.y,A.z),f.push(R.x,R.y,R.z)),u[M]=null):P in u||(u[P]={index0:c[y],index1:c[v],normal:bc.clone()})}}for(let g in u)if(u[g]){let{index0:_,index1:m}=u[g];Wo.fromBufferAttribute(a,_),Xo.fromBufferAttribute(a,m),f.push(Wo.x,Wo.y,Wo.z),f.push(Xo.x,Xo.y,Xo.z)}this.setAttribute("position",new We(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var Ir=class i extends Ve{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new z,u=new z,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let y=[],v=p/n,x=0;p===0&&o===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let C=0;C<=e;C++){let A=C/e;d.x=-t*Math.cos(s+A*r)*Math.sin(o+v*a),d.y=t*Math.cos(o+v*a),d.z=t*Math.sin(s+A*r)*Math.sin(o+v*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(A+x,1-v),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){let v=h[p][y+1],x=h[p][y],C=h[p+1][y],A=h[p+1][y+1];(p!==0||o>0)&&f.push(v,x,A),(p!==n-1||l<Math.PI)&&f.push(x,C,A)}this.setIndex(f),this.setAttribute("position",new We(g,3)),this.setAttribute("normal",new We(_,3)),this.setAttribute("uv",new We(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var An=class extends Yn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mp,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Bh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Yo(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function gw(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Us=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Eh=class extends Us{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Yd,endingEnd:Yd}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Zd:r=t,a=2*e-n;break;case Kd:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Zd:o=t,l=2*n-e;break;case Kd:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,p=-u*m+2*u*_-u*g,y=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*g+1,v=(-1-f)*m+(1.5+f)*_+.5*g,x=f*m-f*_;for(let C=0;C!==a;++C)r[C]=p*o[h+C]+y*o[c+C]+v*o[l+C]+x*o[d+C];return r}},Ah=class extends Us{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},Th=class extends Us{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},xn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Yo(e,this.TimeBufferType),this.values=Yo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Yo(t.times,Array),values:Yo(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Th(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ah(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Eh(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ea:e=this.InterpolantFactoryMethodDiscrete;break;case ah:e=this.InterpolantFactoryMethodLinear;break;case ql:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ea;case this.InterpolantFactoryMethodLinear:return ah;case this.InterpolantFactoryMethodSmooth:return ql}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&gw(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ql,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let _=e[d+g];if(_!==e[u+g]||_!==e[f+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=ah;var Fi=class extends xn{constructor(t,e,n){super(t,e,n)}};Fi.prototype.ValueTypeName="bool";Fi.prototype.ValueBufferType=Array;Fi.prototype.DefaultInterpolation=ea;Fi.prototype.InterpolantFactoryMethodLinear=void 0;Fi.prototype.InterpolantFactoryMethodSmooth=void 0;var Rh=class extends xn{};Rh.prototype.ValueTypeName="color";var Ch=class extends xn{};Ch.prototype.ValueTypeName="number";var Ph=class extends Us{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)mn.slerpFlat(r,0,o,c-a,o,c,l);return r}},ba=class extends xn{InterpolantFactoryMethodLinear(t){return new Ph(this.times,this.values,this.getValueSize(),t)}};ba.prototype.ValueTypeName="quaternion";ba.prototype.InterpolantFactoryMethodSmooth=void 0;var zi=class extends xn{constructor(t,e,n){super(t,e,n)}};zi.prototype.ValueTypeName="string";zi.prototype.ValueBufferType=Array;zi.prototype.DefaultInterpolation=ea;zi.prototype.InterpolantFactoryMethodLinear=void 0;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ih=class extends xn{};Ih.prototype.ValueTypeName="vector";var Lh=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},_w=new Lh,Dh=class{constructor(t){this.manager=t!==void 0?t:_w,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Dh.DEFAULT_MATERIAL_NAME="__DEFAULT";var wa=class extends Be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var wc=new te,tp=new z,ep=new z,Uh=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.map=null,this.mapPass=null,this.matrix=new te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rr,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;tp.setFromMatrixPosition(t.matrixWorld),e.position.copy(tp),ep.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ep),e.updateMatrixWorld(),wc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Nh=class extends Uh{constructor(){super(new ua(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ma=class extends wa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.target=new Be,this.shadow=new Nh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Sa=class extends wa{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Kh="\\[\\]\\.:\\/",xw=new RegExp("["+Kh+"]","g"),Jh="[^"+Kh+"]",vw="[^"+Kh.replace("\\.","")+"]",yw=/((?:WC+[\/:])*)/.source.replace("WC",Jh),bw=/(WCOD+)?/.source.replace("WCOD",vw),ww=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Jh),Mw=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Jh),Sw=new RegExp("^"+yw+bw+ww+Mw+"$"),Ew=["material","materials","bones","map"],Oh=class{constructor(t,e,n){let s=n||ue.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ue=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(xw,"")}static parseTrackName(t){let e=Sw.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Ew.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ue.Composite=Oh;ue.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ue.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ue.prototype.GetterByBindingType=[ue.prototype._getValue_direct,ue.prototype._getValue_array,ue.prototype._getValue_arrayElement,ue.prototype._getValue_toArray];ue.prototype.SetterByBindingTypeAndVersioning=[[ue.prototype._setValue_direct,ue.prototype._setValue_direct_setNeedsUpdate,ue.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_array,ue.prototype._setValue_array_setNeedsUpdate,ue.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_arrayElement,ue.prototype._setValue_arrayElement_setNeedsUpdate,ue.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_fromArray,ue.prototype._setValue_fromArray_setNeedsUpdate,ue.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var b1=new Float32Array(1);var np=new te,Ea=class{constructor(t,e,n=0,s=1/0){this.ray=new fi(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Tr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return np.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(np),this}intersectObject(t,e=!0,n=[]){return kh(t,this,n,e),n.sort(ip),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)kh(t[s],this,n,e);return n.sort(ip),n}};function ip(i,t){return i.distance-t.distance}function kh(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)kh(r[o],t,e,!0)}}var Lr=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ke(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Aa=class extends Wn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var Ap={type:"change"},Qh={type:"start"},Rp={type:"end"},Pa=new fi,Tp=new fn,Aw=Math.cos(70*_p.DEG2RAD),Ce=new z,Ze=2*Math.PI,re={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},jh=1e-6,Ia=class extends Aa{constructor(t,e=null){super(t,e),this.state=re.NONE,this.enabled=!0,this.target=new z,this.cursor=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Bi.ROTATE,MIDDLE:Bi.DOLLY,RIGHT:Bi.PAN},this.touches={ONE:Vi.ROTATE,TWO:Vi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new z,this._lastQuaternion=new mn,this._lastTargetPosition=new z,this._quat=new mn().setFromUnitVectors(t.up,new z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Lr,this._sphericalDelta=new Lr,this._scale=1,this._panOffset=new z,this._rotateStart=new Ct,this._rotateEnd=new Ct,this._rotateDelta=new Ct,this._panStart=new Ct,this._panEnd=new Ct,this._panDelta=new Ct,this._dollyStart=new Ct,this._dollyEnd=new Ct,this._dollyDelta=new Ct,this._dollyDirection=new z,this._mouse=new Ct,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Rw.bind(this),this._onPointerDown=Tw.bind(this),this._onPointerUp=Cw.bind(this),this._onContextMenu=Ow.bind(this),this._onMouseWheel=Lw.bind(this),this._onKeyDown=Dw.bind(this),this._onTouchStart=Uw.bind(this),this._onTouchMove=Nw.bind(this),this._onMouseDown=Pw.bind(this),this._onMouseMove=Iw.bind(this),this._interceptControlDown=kw.bind(this),this._interceptControlUp=Fw.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ap),this.update(),this.state=re.NONE}update(t=null){let e=this.object.position;Ce.copy(e).sub(this.target),Ce.applyQuaternion(this._quat),this._spherical.setFromVector3(Ce),this.autoRotate&&this.state===re.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ze:n>Math.PI&&(n-=Ze),s<-Math.PI?s+=Ze:s>Math.PI&&(s-=Ze),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ce.setFromSpherical(this._spherical),Ce.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ce),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ce.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new z(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new z(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ce.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Pa.origin.copy(this.object.position),Pa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Pa.direction))<Aw?this.object.lookAt(this.target):(Tp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Pa.intersectPlane(Tp,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>jh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>jh||this._lastTargetPosition.distanceToSquared(this.target)>jh?(this.dispatchEvent(Ap),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ze/60*this.autoRotateSpeed*t:Ze/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ce.setFromMatrixColumn(e,0),Ce.multiplyScalar(-t),this._panOffset.add(Ce)}_panUp(t,e){this.screenSpacePanning===!0?Ce.setFromMatrixColumn(e,1):(Ce.setFromMatrixColumn(e,0),Ce.crossVectors(this.object.up,Ce)),Ce.multiplyScalar(t),this._panOffset.add(Ce)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ce.copy(s).sub(this.target);let r=Ce.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ct,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Tw(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Rw(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Cw(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Rp),this.state=re.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Pw(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Bi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=re.DOLLY;break;case Bi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=re.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=re.ROTATE}break;case Bi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=re.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=re.PAN}break;default:this.state=re.NONE}this.state!==re.NONE&&this.dispatchEvent(Qh)}function Iw(i){switch(this.state){case re.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case re.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case re.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Lw(i){this.enabled===!1||this.enableZoom===!1||this.state!==re.NONE||(i.preventDefault(),this.dispatchEvent(Qh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Rp))}function Dw(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function Uw(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Vi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=re.TOUCH_ROTATE;break;case Vi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=re.TOUCH_PAN;break;default:this.state=re.NONE}break;case 2:switch(this.touches.TWO){case Vi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=re.TOUCH_DOLLY_PAN;break;case Vi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=re.TOUCH_DOLLY_ROTATE;break;default:this.state=re.NONE}break;default:this.state=re.NONE}this.state!==re.NONE&&this.dispatchEvent(Qh)}function Nw(i){switch(this._trackPointer(i),this.state){case re.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case re.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case re.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case re.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=re.NONE}}function Ow(i){this.enabled!==!1&&i.preventDefault()}function kw(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Fw(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Cp(){return{uPPVolume:{value:Pp()},uPPMin:{value:new z},uPPSize:{value:new z(1,1,1)},uPPOn:{value:0},uPPGain:{value:2.2}}}function Pp(){let i=new Cs(new Uint8Array(4),1,1,1);return i.format=De,i.type=Xe,i.needsUpdate=!0,i}function Da(i,t){let e=i.uPPVolume.value;if(!t)i.uPPVolume.value=Pp(),i.uPPOn.value=0;else{let n=new Cs(t.data,t.nx,t.ny,t.nz);n.format=De,n.type=Xe,n.minFilter=Qe,n.magFilter=Qe,n.wrapS=n.wrapT=n.wrapR=Vn,n.unpackAlignment=1,n.needsUpdate=!0,i.uPPVolume.value=n,i.uPPMin.value.set(...t.origin),i.uPPSize.value.set(...t.size)}e?.dispose()}var Ip=`
  uniform highp sampler3D uPPVolume;
  uniform vec3 uPPMin;
  uniform vec3 uPPSize;
  uniform float uPPOn;
  uniform float uPPGain;
  vec4 ppSample(vec3 p) {
    vec3 uvw = (p - uPPMin) / uPPSize;
    if (any(lessThan(uvw, vec3(0.0))) || any(greaterThan(uvw, vec3(1.0)))) return vec4(0.0);
    vec4 s = texture(uPPVolume, uvw);
    return vec4(pow(s.rgb, vec3(2.2)), s.a);
  }
`;function Lp(i,t){i.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vPPWorld;
varying vec3 vPPNormal;`).replace("#include <project_vertex>",`#include <project_vertex>
vPPWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
vPPNormal = normalize(mat3(modelMatrix) * objectNormal);`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vPPWorld;
varying vec3 vPPNormal;
${Ip}`).replace("#include <opaque_fragment>",`if (uPPOn > 0.5) {
          vec3 ppN = normalize(vPPNormal) * (gl_FrontFacing ? 1.0 : -1.0);
          vec4 ppL = ppSample(vPPWorld + ppN * 0.15);
          outgoingLight += ppL.rgb * pow(ppL.a, 1.1) * uPPGain;
        }
        #include <opaque_fragment>`)},i.customProgramCacheKey=()=>"pp-light-surface",i.needsUpdate=!0}var zw=`
  varying vec3 vWorld;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`,Bw=`
  #include <packing>
  ${Ip}
  uniform sampler2D uDepth;
  uniform vec2 uResolution;
  uniform float uNear;
  uniform float uFar;
  uniform float uGlow;
  uniform float uAbsorb;
  uniform int uSteps;
  varying vec3 vWorld;

  vec2 hitBox(vec3 ro, vec3 rd) {
    vec3 inv = 1.0 / rd;
    vec3 t0 = (uPPMin - ro) * inv;
    vec3 t1 = (uPPMin + uPPSize - ro) * inv;
    vec3 lo = min(t0, t1);
    vec3 hi = max(t0, t1);
    return vec2(max(max(lo.x, lo.y), lo.z), min(min(hi.x, hi.y), hi.z));
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec3 ro = cameraPosition;
    vec3 rd = normalize(vWorld - ro);
    vec2 hit = hitBox(ro, rd);
    float tEnter = max(hit.x, 0.0);
    float tExit = hit.y;
    // stop at the first wall, floor or furniture surface (depth pre-pass)
    float depth = texture2D(uDepth, gl_FragCoord.xy / uResolution).x;
    if (depth < 1.0) {
      float viewZ = perspectiveDepthToViewZ(depth, uNear, uFar);
      vec3 rdView = (viewMatrix * vec4(rd, 0.0)).xyz;
      if (rdView.z < 0.0) tExit = min(tExit, viewZ / rdView.z);
    }
    if (tExit <= tEnter) discard;
    float dt = (tExit - tEnter) / float(uSteps);
    float t = tEnter + hash(gl_FragCoord.xy) * dt;
    vec3 col = vec3(0.0);
    float trans = 1.0;
    for (int i = 0; i < 96; i++) {
      if (i >= uSteps) break;
      vec4 s = ppSample(ro + rd * t);
      if (s.a > 0.002) {
        // the haze concentrates where the light is strong, so the beam near the sensor stands out
        float a = pow(s.a, 1.5);
        col += trans * s.rgb * a * uGlow * dt;
        trans *= exp(-a * uAbsorb * dt);
      }
      t += dt;
    }
    gl_FragColor = vec4(col, 1.0 - trans);
    #include <colorspace_fragment>
  }
`,La=class{constructor(t){this.uniforms=t,this.depthTarget=null,this.material=new rn({vertexShader:zw,fragmentShader:Bw,uniforms:{...t,uDepth:{value:null},uResolution:{value:new Ct(1,1)},uNear:{value:.1},uFar:{value:100},uGlow:{value:.9},uAbsorb:{value:.35},uSteps:{value:64}},side:Fe,transparent:!0,depthTest:!1,depthWrite:!1,blending:Fh,blendSrc:zh,blendDst:Sr}),this.mesh=new xe(new _n(1,1,1),this.material),this.mesh.renderOrder=20,this.mesh.visible=!1,this.mesh.frustumCulled=!1}fit(){let t=this.uniforms.uPPMin.value,e=this.uniforms.uPPSize.value;this.mesh.scale.copy(e),this.mesh.position.set(t.x+e.x/2,t.y+e.y/2,t.z+e.z/2),this.mesh.updateMatrixWorld()}setStyle({glow:t,absorb:e,steps:n}={}){t!==void 0&&(this.material.uniforms.uGlow.value=t),e!==void 0&&(this.material.uniforms.uAbsorb.value=e),n!==void 0&&(this.material.uniforms.uSteps.value=n)}render(t,e,n){let s=t.getDrawingBufferSize(new Ct);(!this.depthTarget||this.depthTarget.width!==s.x||this.depthTarget.height!==s.y)&&(this.depthTarget?.dispose(),this.depthTarget=new pn(s.x,s.y,{depthBuffer:!0,depthTexture:new Is(s.x,s.y,Gn)}));let r=this.material.uniforms;this.mesh.visible=!1,t.setRenderTarget(this.depthTarget),t.render(e,n),t.setRenderTarget(null),r.uDepth.value=this.depthTarget.depthTexture,r.uResolution.value.copy(s),r.uNear.value=n.near,r.uFar.value=n.far,this.mesh.visible=!0,t.render(e,n)}dispose(){this.depthTarget?.dispose(),this.mesh.geometry.dispose(),this.material.dispose()}};var Dp=40,Vw=.02,Up=new Set(["light","voxels","points"]),$w={background:"#0f1318",floor:"#272d35",wall:"#363e49",freeWall:"#3e4753",furniture:"#4b5564",obstacle:"#566173",window:"#5a8fbf",door:"#8a6a3c"};function Hw(){let t=new Uint8Array(4096);for(let n=0;n<32;n++)for(let s=0;s<32;s++){let r=Math.hypot(s+.5-16,n+.5-16)/16,o=(n*32+s)*4;t[o]=t[o+1]=t[o+2]=255;let a=r>=1?0:Math.pow(1-r*r,1.6);t[o+3]=Math.round(a*255)}let e=new Ls(t,32,32,De,Xe);return e.needsUpdate=!0,e}function Np(i){let t=new Ve;return t.setAttribute("position",new ye(new Float32Array(i.positions),3)),t.setIndex(new ye(new Uint32Array(i.indices),1)),t.computeVertexNormals(),t}function Tn(i,t="#808080"){let e=Un(i)||Un(t);return new Vt().setRGB(e[0]/255,e[1]/255,e[2]/255,Ie)}function Op(i){i.traverse(t=>{t.geometry&&t.geometry.dispose();let e=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(let n of e)n.map&&n.map.dispose(),n.dispose()})}function tu(i,t=!1){for(let e of[...i.children])i.remove(e),t?e.traverse(n=>n.geometry&&n.geometry.dispose()):Op(e)}var Ua=class{constructor(t,{onSelect:e}={}){this.container=t,this.onSelect=e||(()=>{}),this.state={},this._raf=0,this._disposed=!1,this._framedBounds=null,this._hover=null,this._down=null;let n=document.createElement("canvas");n.style.cssText="display:block;width:100%;height:100%;touch-action:none;outline:none",t.appendChild(n),this.canvas=n,this.renderer=new fa({canvas:n,antialias:!0,alpha:!1,powerPreference:"low-power"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.scene=new pa,this.camera=new Ge(Dp,1.5,.1,200),this.ambient=new Sa(16777215,1.7),this.scene.add(this.ambient),this.sun=new Ma(16777215,1.6),this.sun.position.set(-4,10,6),this.scene.add(this.sun),this.staticGroup=new Sn,this.sensorGroup=new Sn,this.overlayGroup=new Sn,this.scene.add(this.staticGroup,this.overlayGroup,this.sensorGroup),this.mats={floor:new An({side:Ae}),wall:new An({side:Ae}),freeWall:new An({side:Ae}),furniture:new An({transparent:!0,opacity:.42,depthWrite:!1,side:Ae}),obstacle:new An({transparent:!0,opacity:.55,depthWrite:!1,side:Ae}),window:new gn({transparent:!0,opacity:.35,depthWrite:!1,side:Ae}),door:new gn({side:Ae})},this.lightUniforms=Cp();for(let s of["floor","wall","freeWall","furniture","obstacle"])Lp(this.mats[s],this.lightUniforms);this.haze=new La(this.lightUniforms),this.scene.add(this.haze.mesh),this.controls=new Ia(this.camera,n),this.controls.screenSpacePanning=!0,this.controls.maxPolarAngle=Math.PI/2-.02,this.controls.addEventListener("change",()=>this._request()),this._userMoved=!1,this._lastView="iso",this.controls.addEventListener("start",()=>{this._userMoved=!0}),this.raycaster=new Ea,this._onPointerDown=s=>this._pointerDown(s),this._onPointerUp=s=>this._pointerUp(s),this._onPointerMove=s=>this._pointerMove(s),n.addEventListener("pointerdown",this._onPointerDown),n.addEventListener("pointerup",this._onPointerUp),n.addEventListener("pointermove",this._onPointerMove),this._motionQuery=window.matchMedia?window.matchMedia("(prefers-reduced-motion: reduce)"):null,this._onMotion=()=>this._applyMotion(),this._motionQuery&&this._motionQuery.addEventListener?.("change",this._onMotion),this._applyMotion(),this._resizeObserver=new ResizeObserver(()=>this.resize()),this._resizeObserver.observe(t),this.resize()}setState(t){if(this._disposed)return;let e=this.state,n={dark:!1,height:.9,mode:"flat",walls:"solid",...t};this.state=n;let s=n.model!==e.model,r=n.dark!==e.dark||!e.palette,o=n.mode!==e.mode;(r||o&&(n.mode==="light"||e.mode==="light"))&&(this.palette=Bd(n.dark),this._applyPalette()),(s||o||n.mode==="voxels"&&n.height!==e.height)&&this._buildStatic();let a=s||r||o||n.sensors!==e.sensors||n.colors!==e.colors||n.selected!==e.selected;a&&this._buildSensors(),(a||n.evaluation!==e.evaluation||n.volume!==e.volume||n.height!==e.height)&&this._buildOverlay(),this.state.palette=this.palette,n.walls!==e.walls&&this._applyWalls(),this._request()}_applyWalls(){let t=this.state.walls;for(let e of[this.mats.wall,this.mats.freeWall]){let n=t==="ghost";e.visible=t!=="hidden",e.transparent=n,e.opacity=n?.12:1,e.depthWrite=!n,e.needsUpdate=!0}}resetView(){this._frame("iso")}topView(){this._frame("top")}resize(){if(this._disposed)return;let t=this.container.clientWidth,e=this.container.clientHeight;t<2||e<2||(this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.state.model&&(!this._sized||!this._userMoved)&&(this._sized=!0,this._frame(this._lastView)),this._request())}dispose(){if(!this._disposed){this._disposed=!0,this._raf&&cancelAnimationFrame(this._raf),this._raf=0,this._resizeObserver.disconnect(),this._motionQuery&&this._motionQuery.removeEventListener?.("change",this._onMotion),this.canvas.removeEventListener("pointerdown",this._onPointerDown),this.canvas.removeEventListener("pointerup",this._onPointerUp),this.canvas.removeEventListener("pointermove",this._onPointerMove),this.controls.dispose(),this.scene.remove(this.haze.mesh),this.haze.dispose(),Da(this.lightUniforms,null),this.lightUniforms.uPPVolume.value.dispose(),Op(this.scene);for(let t of Object.values(this.mats))t.dispose();this.renderer.dispose(),this.renderer.forceContextLoss(),this.canvas.remove()}}_request(){this._raf||this._disposed||(this._raf=requestAnimationFrame(()=>{if(this._raf=0,this._disposed)return;let t=this.controls.update();this.state.mode==="light"&&this._lightReady?this.haze.render(this.renderer,this.scene,this.camera):this.renderer.render(this.scene,this.camera),t&&this._request()}))}_applyMotion(){this.controls.enableDamping=!(this._motionQuery&&this._motionQuery.matches)}_frame(t){this._lastView=t,this._userMoved=!1;let e=this.state.model?.bounds,n=Fd(e,{fov:Dp,aspect:this.camera.aspect,height:this.state.model?.floor?.height,inset:.35,view:t});this.camera.near=n.near,this.camera.far=n.far,this.camera.updateProjectionMatrix(),this.camera.position.set(...n.position),this.controls.target.set(...n.target),this.controls.minDistance=n.minDistance,this.controls.maxDistance=n.maxDistance,this.controls.update(),this._request()}_applyPalette(){let t=this.state.mode==="light",e=t?{...this.palette,...$w}:this.palette;this.ambient.intensity=t?.6:1.7,this.sun.intensity=t?.45:1.6,this.scene.background=Tn(e.background),this.mats.floor.color=Tn(e.floor),this.mats.wall.color=Tn(e.wall),this.mats.freeWall.color=Tn(e.freeWall),this.mats.furniture.color=Tn(e.furniture),this.mats.obstacle.color=Tn(e.obstacle),this.mats.window.color=Tn(e.window),this.mats.door.color=Tn(e.door);for(let n of Object.values(this.mats))n.needsUpdate=!0}_buildStatic(){tu(this.staticGroup,!0);let t=this.state.model;if(!t)return;let e=this.state.mode==="voxels"?(this.state.height??.9)+.12:void 0,n=kd(t,{cutY:e});this._wallHeight=n.wallHeight;let s=(r,o,a=0)=>{if(!r.indices.length)return;let l=new xe(Np(r),o);l.renderOrder=a,this.staticGroup.add(l)};s(n.floors,this.mats.floor),s(n.thresholds,this.mats.door),s(n.walls,this.mats.wall),s(n.freeWalls,this.mats.freeWall),s(n.furniture,this.mats.furniture,2),s(n.obstacles,this.mats.obstacle,2),s(n.windows,this.mats.window,3),zd(this._framedBounds,t.bounds)&&(this._framedBounds=t.bounds?{...t.bounds}:null,this._frame("iso"))}_buildSensors(){tu(this.sensorGroup);let{sensors:t,colors:e,selected:n}=this.state,s=this.palette,r=this._wallHeight??2.6,o=!!n&&(t||[]).some(l=>l.entity_id===n);this._hitMeshes=[];let a=Up.has(this.state.mode);(t||[]).forEach((l,c)=>{if(!Number.isFinite(l.x)||!Number.isFinite(l.z))return;let h=Wl(e,l,c),d=new Vt().setRGB(h[0]/255,h[1]/255,h[2]/255,Ie),u=l.entity_id===n,f=l.active!==!1,g=_o(l),_=Ud(l),m=new te().makeBasis(new z(..._.x),new z(..._.y),new z(..._.z));m.setPosition(...g);let p=new xe(new _n(.1,.1,.05),new An({color:f?d:Tn(s.inactive),transparent:!f,opacity:f?1:.6}));p.matrixAutoUpdate=!1,p.matrix.copy(m),p.renderOrder=4,this.sensorGroup.add(p);let y=new ya(new _n(.16,.16,.09)),v=new Cr(y,new Ds({color:u?Tn(s.selected):d,depthTest:!1}));if(v.matrixAutoUpdate=!1,v.matrix.copy(m),v.renderOrder=5,this.sensorGroup.add(v),this.state.mode==="light"&&f){let A=new xe(new Ir(.07,16,12),new gn({color:d}));A.position.set(...g),A.renderOrder=4,this.sensorGroup.add(A)}let x=new xe(new Ir(.22,8,6),new gn({visible:!1}));if(x.position.set(...g),x.userData.entityId=l.entity_id,this.sensorGroup.add(x),this._hitMeshes.push(x),!f)return;let C=Nd(a?{...l,reach:Math.min(l.reach||5,.9)}:l,{yMin:0,yMax:r});if(!a){let A=u?.24:o?.04:.09,R=new xe(Np({positions:C.positions,indices:C.indices}),new gn({color:d,transparent:!0,opacity:A,depthWrite:!1,side:Ae}));R.renderOrder=6+c*.01,this.sensorGroup.add(R)}if(u){let A=new Ve;A.setAttribute("position",new ye(new Float32Array(C.edges),3));let R=new Cr(A,new Ds({color:d,transparent:!0,opacity:.85}));R.renderOrder=7,this.sensorGroup.add(R)}})}_buildOverlay(){if(tu(this.overlayGroup),this.state.mode==="light"){this._buildLight();return}if(this._clearLight(),Up.has(this.state.mode)){this._buildVolume();return}let{evaluation:t,model:e,height:n,sensors:s,colors:r,selected:o}=this.state,a=t?.grid?.[n]??t?.grid?.[String(n)];if(!e?.bounds||!a||!a.length)return;let l=xo(s,r),c=Gd(a,{bounds:e.bounds,colorFor:g=>l.get(g)||Gl(r,0),spillColor:Un(this.palette.spill),selected:o||null}),h=new Ls(c.data,c.width,c.height,De,Xe);h.colorSpace=Ie,h.magFilter=ze,h.minFilter=ze,h.generateMipmaps=!1,h.needsUpdate=!0;let d=n+Vw,u=new Ve;u.setAttribute("position",new ye(new Float32Array([c.x0,d,c.z0,c.x1,d,c.z0,c.x1,d,c.z1,c.x0,d,c.z1]),3)),u.setAttribute("uv",new ye(new Float32Array([0,0,1,0,1,1,0,1]),2)),u.setIndex([0,2,1,0,3,2]);let f=new xe(u,new gn({map:h,transparent:!0,depthWrite:!1,side:Ae}));f.renderOrder=1,this.overlayGroup.add(f)}_buildLight(){let{volume:t,model:e,sensors:n,colors:s,selected:r}=this.state;if(!t?.grid||!e?.bounds){this._clearLight();return}let o=xo(n,s),a={};for(let c of n||[])c.active===!1||!Number.isFinite(c.x)||!Number.isFinite(c.z)||(a[c.entity_id]=[..._o(c),c.reach>0?c.reach:6]);let l=Vd(t,e.bounds,{colorFor:c=>o.get(c)||[31,95,153],spillColor:Un(this.palette.spill),spillStrength:.45,selected:r||null,lights:a,blur:2,dilate:!0});Da(this.lightUniforms,l),this.lightUniforms.uPPOn.value=l?1:0,this.haze.fit(),this._lightReady=!!l}_clearLight(){!this._lightReady&&!this.lightUniforms.uPPOn.value||(Da(this.lightUniforms,null),this.haze.mesh.visible=!1,this._lightReady=!1)}_buildVolume(){let{volume:t,height:e,sensors:n,colors:s,selected:r,mode:o,dark:a}=this.state;if(!t?.grid)return;let l=xo(n,s),c=Hd(t,{maxY:o==="voxels"?e+1e-6:1/0,colorFor:p=>l.get(p)||[31,95,153],spillColor:Un(this.palette.spill),fadeColor:a?[70,74,80]:[255,255,255],selected:r||null});if(!c.count)return;let h=new Vt;if(o==="voxels"){let p=new _n(c.cell*.82,c.step*.82,c.cell*.82),y=new ga(p,new An,c.count),v=new te;for(let x=0;x<c.count;x++)v.makeTranslation(c.positions[x*3],c.positions[x*3+1],c.positions[x*3+2]),y.setMatrixAt(x,v),h.setRGB(c.colors[x*3]/255,c.colors[x*3+1]/255,c.colors[x*3+2]/255,Ie),y.setColorAt(x,h);y.instanceMatrix.needsUpdate=!0,y.instanceColor&&(y.instanceColor.needsUpdate=!0),this.overlayGroup.add(y);return}let d=new Ve,u=new Float32Array(c.positions),f=p=>{let y=Math.sin(p*12.9898)*43758.5453;return y-Math.floor(y)-.5};for(let p=0;p<c.count;p++)u[p*3]+=f(p*3+1)*c.cell*.7,u[p*3+1]+=f(p*3+2)*c.step*.7,u[p*3+2]+=f(p*3+3)*c.cell*.7;d.setAttribute("position",new ye(u,3));let g=new Float32Array(c.count*3);for(let p=0;p<c.count;p++)h.setRGB(c.colors[p*3]/255,c.colors[p*3+1]/255,c.colors[p*3+2]/255,Ie),g[p*3]=h.r,g[p*3+1]=h.g,g[p*3+2]=h.b;d.setAttribute("color",new ye(g,3));let _=new Pr({size:c.cell*1.7,sizeAttenuation:!0,vertexColors:!0,map:Hw(),transparent:!0,opacity:a?.32:.38,depthWrite:!1,alphaTest:.01,blending:a?ta:hi}),m=new va(d,_);m.renderOrder=8,this.overlayGroup.add(m)}_pick(t){if(!this._hitMeshes?.length)return null;let e=this.canvas.getBoundingClientRect(),n=new Ct((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1);this.raycaster.setFromCamera(n,this.camera);let s=this.raycaster.intersectObjects(this._hitMeshes,!1)[0];return s?s.object.userData.entityId:null}_pointerDown(t){this._down={x:t.clientX,y:t.clientY,t:performance.now()}}_pointerUp(t){let e=this._down;if(this._down=null,!e||t.button>0||Math.hypot(t.clientX-e.x,t.clientY-e.y)>5||performance.now()-e.t>600)return;let n=this._pick(t);n&&this.onSelect(n)}_pointerMove(t){if(t.buttons)return;let e=this._pick(t);e!==this._hover&&(this._hover=e,this.canvas.style.cursor=e?"pointer":"")}};var eu=["light","voxels","points"],Fp="pp-view3d-mode",Na=["solid","ghost","hidden"],zp="pp-view3d-walls",kp=i=>i==="light"?.1:.2;function Gw(){try{let i=localStorage.getItem(Fp);return i==="flat"?"light":eu.includes(i)?i:"voxels"}catch{return"voxels"}}function Ww(){try{let i=localStorage.getItem(zp);return Na.includes(i)?i:"solid"}catch{return"solid"}}var nu=class extends Ye{static properties={model:{attribute:!1},sensors:{attribute:!1},evaluation:{attribute:!1},height:{type:Number},selected:{type:String},dark:{type:Boolean},colors:{attribute:!1},labels:{attribute:!1},coreOpts:{attribute:!1},_mode:{state:!0},_walls:{state:!0}};static styles=Pn`
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
      left: 8px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 6px;
      pointer-events: none;
    }
    .bar > * {
      pointer-events: auto;
    }
    .seg {
      display: inline-flex;
    }
    .seg button {
      border-radius: 0;
      margin-left: -1px;
    }
    .seg button:first-child {
      border-radius: 6px 0 0 6px;
      margin-left: 0;
    }
    .seg button:last-child {
      border-radius: 0 6px 6px 0;
    }
    .seg button[aria-pressed='true'] {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      position: relative;
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
  `;constructor(){super(),this.height=.9,this.dark=!1,this.labels={},this._ctl=null,this._mode=Gw(),this._walls=Ww(),this._volume=null,this._volumeKey=null,this._volumeTimer=0}render(){let t={reset:"Reset view",top:"Top view",mode:"Display",light:"Light",voxels:"Voxels",points:"Point cloud",walls:"Walls",walls_solid:"solid",walls_ghost:"transparent",walls_hidden:"hidden",...this.labels||{}};return Y`
      <div class="stage"></div>
      <div class="bar">
        <div class="seg" role="group" aria-label=${t.mode}>
          ${eu.map(e=>Y`<button type="button" aria-pressed=${this._mode===e?"true":"false"} @click=${()=>this.setMode(e)}>${t[e]}</button>`)}
        </div>
        <button type="button" aria-pressed=${this._walls==="solid"?"false":"true"} @click=${()=>this.cycleWalls()}>
          ${t.walls}: ${t["walls_"+this._walls]}
        </button>
        <button type="button" @click=${()=>this.resetView()}>${t.reset}</button>
        <button type="button" @click=${()=>this.topView()}>${t.top}</button>
      </div>
    `}setMode(t){if(!(!eu.includes(t)||t===this._mode)){this._mode=t;try{localStorage.setItem(Fp,t)}catch{}}}cycleWalls(){this._walls=Na[(Na.indexOf(this._walls)+1)%Na.length];try{localStorage.setItem(zp,this._walls)}catch{}}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this._setup()}firstUpdated(){this._setup()}disconnectedCallback(){super.disconnectedCallback(),this._teardown()}updated(){this._scheduleVolume(),this._push()}_volumeInputs(){if(!this.model)return null;this._keyModel!==this.model&&(this._keyModel=this.model,this._modelSeq=(this._modelSeq||0)+1);let t=(this.sensors||[]).map(s=>[s.entity_id,s.x,s.z,s.height,s.phi,s.tilt,s.fov_h,s.fov_v,s.reach,s.mount,s.active,s.profile]),{doors:e,thin_db:n}=this.coreOpts||{};return{key:JSON.stringify([this._modelSeq,kp(this._mode),t,e??null,n??null]),doors:e,thin_db:n}}_scheduleVolume(){let t=this._volumeInputs();!t||t.key===this._volumeKey||t.key===this._pendingKey||(this._pendingKey=t.key,clearTimeout(this._volumeTimer),this._volumeTimer=setTimeout(()=>this._computeVolume(t),120))}_computeVolume(t){if(this._pendingKey=null,!this.model)return;let e=kp(this._mode),n=$d(this.model.floor?.height,.2);try{let s={...this.coreOpts||{},heights:n,cell:e,grid:!0};t.doors!==void 0&&(s.doors=t.doors),t.thin_db!==void 0&&(s.thin_db=t.thin_db);let r=hr(this.model,this.sensors||[],s);this._volume={grid:r.grid,heights:n,cell:e,step:.2}}catch(s){console.warn("pp-view3d: volume evaluation failed",s),this._volume=null}this._volumeKey=t.key,this._push()}resetView(){this._ctl?.resetView()}topView(){this._ctl?.topView()}_setup(){if(this._ctl)return;let t=this.renderRoot.querySelector(".stage");if(t){try{this._ctl=new Ua(t,{onSelect:e=>this.dispatchEvent(new CustomEvent("select",{detail:{entityId:e},bubbles:!0,composed:!0}))})}catch(e){console.warn("pp-view3d: WebGL unavailable",e),this._ctl=null;return}this._push(!0)}}_teardown(){clearTimeout(this._volumeTimer),this._pendingKey=null,this._ctl?.dispose(),this._ctl=null}_push(){this._ctl?.setState({model:this.model,sensors:this.sensors,evaluation:this.evaluation,height:this.height,selected:this.selected,dark:this.dark,colors:this.colors,mode:this._mode,walls:this._walls,volume:this._volume})}};typeof customElements<"u"&&!customElements.get("pp-view3d")&&customElements.define("pp-view3d",nu);var $i={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Bp=i=>(...t)=>({_$litDirective$:i,values:t}),Oa=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,n){this._$Ct=t,this._$AM=e,this._$Ci=n}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:z1}=cd;var Vp=i=>i.strings===void 0;var Xw={},$p=(i,t=Xw)=>i._$AH=t;var be=Bp(class extends Oa{constructor(i){if(super(i),i.type!==$i.PROPERTY&&i.type!==$i.ATTRIBUTE&&i.type!==$i.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Vp(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===nn||t===mt)return t;let e=i.element,n=i.name;if(i.type===$i.PROPERTY){if(t===e[n])return nn}else if(i.type===$i.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(n))return nn}else if(i.type===$i.ATTRIBUTE&&e.getAttribute(n)===t+"")return nn;return $p(i),t}});var Hp=Pn`
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
`;var qw={select:"M6 3l12 7-5.5 1.6L15 18l-2.4 1.2-2.6-6.3L6 16.5z",room:"M4 5h10l6 5v9H4z",wall:"M3 6h18v12H3z M3 12h18 M9 6v6 M15 12v6",door:"M5 20h14 M7 20V4h8 M15 4a12 12 0 0 1 3 16 M7 4l8 16",window:"M4 5h16v14H4z M12 5v14 M4 12h16",freewall:"M5 18L18 5 M8 21L21 8 M5 18l3 3 M18 5l3 3",furniture:"M4 11v7h16v-7 M6 11V7h12v4 M4 18v2 M20 18v2 M4 11h3v3h10v-3h3",background:"M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6 M15.5 9.5a1 1 0 1 0 0.01 0",measure:"M3 16.5L16.5 3l4.5 4.5L7.5 21z M7 12.5l2 2 M10 9.5l2 2 M13 6.5l2 2",undo:"M9 15L4 10l5-5 M4 10h10a5 5 0 0 1 0 10h-3",redo:"M15 15l5-5-5-5 M20 10H10a5 5 0 0 0 0 10h3",zoomIn:"M10.5 4a6.5 6.5 0 1 0 0.01 0 M15.5 15.5L21 21 M10.5 7.5v6 M7.5 10.5h6",zoomOut:"M10.5 4a6.5 6.5 0 1 0 0.01 0 M15.5 15.5L21 21 M7.5 10.5h6",fit:"M4 9V4h5 M15 4h5v5 M20 15v5h-5 M9 20H4v-5",plus:"M12 5v14 M5 12h14",trash:"M5 7h14 M10 7V4h4v3 M7 7l1 13h8l1-13",rotateLeft:"M4 4v5h5 M4.5 9A8 8 0 1 1 6 17",rotateRight:"M20 4v5h-5 M19.5 9A8 8 0 1 0 18 17",upload:"M12 16V4 M7 9l5-5 5 5 M5 20h14",ruler:"M4 18L18 4 M4 18l-1-3 M4 18l3 1 M18 4l3 1 M18 4l-1-3",check:"M5 12l5 5 9-10",close:"M6 6l12 12 M18 6L6 18"};function me(i){return Y`<svg class="icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"
    fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d=${qw[i]||""}></path></svg>`}var iu={editor_label:"Floor plan editor",canvas_label:"Floor plan. Arrow keys move the selection, Delete removes it.",toolbar_label:"Editor tools",tool_select:"Select and move",tool_select_short:"Select",tool_room:"Draw room",tool_room_short:"Room",tool_wall:"Walls",tool_wall_short:"Walls",tool_door:"Door",tool_door_short:"Door",tool_window:"Window",tool_window_short:"Window",tool_freewall:"Free wall",tool_freewall_short:"Free wall",tool_furniture:"Furniture",tool_furniture_short:"Furniture",tool_background:"Background image",tool_background_short:"Image",tool_measure:"Show lengths and areas",tool_measure_short:"Sizes",undo:"Undo",redo:"Redo",zoom_in:"Zoom in",zoom_out:"Zoom out",zoom_fit:"Show everything",shortcut:"{label} ({key})",floor:"Floor",floor_add:"Add floor",floor_default_name:"Floor {n}",floor_settings:"Floor",floor_name:"Name",floor_ha:"Home Assistant floor",floor_height:"Storey height (m)",floor_elevation:"Floor level (m)",floor_delete:"Delete floor",floor_delete_confirm:"Delete this floor with all its rooms?",no_floor:"No floor yet. Add one to start drawing.",none:"None",delete:"Delete",keep:"Keep",cancel:"Cancel",room:"Room",room_default_name:"Room {n}",room_name:"Name",room_area_ha:"Home Assistant area",room_size:"Floor area",room_ceiling:"Ceiling height (m, empty = storey height)",room_delete:"Delete room",room_finish:"Close room",room_undo_point:"Remove last corner",corner:"Corner {n}",corner_delete:"Delete corner",corner_min:"A room needs at least three corners.",pos_x:"X (m)",pos_z:"Z (m)",hint_select:"Click a room, corner, opening or piece of furniture and drag it. Drag a + on an edge to add a corner. Drag empty space to pan.",hint_room:"Click the corners of the room one after another. Click the first corner or press Enter to close it. Corners snap to the 5 cm grid and to existing walls.",hint_wall:"Click an edge to set its wall.",hint_door:"Click a wall to place a door. Drag a door to slide it along its wall.",hint_window:"Click a wall to place a window. Drag a window to slide it along its wall.",hint_freewall:"Click the start and the end of the wall, for example a chimney or a partition.",hint_freewall_second:"Now click the end of the wall. Esc cancels.",hint_furniture:"Choose a type, then click where it goes. Drag the round handle to rotate.",hint_background:"Upload an image of your floor plan, then set its scale with two points of known distance.",wall:"Wall",wall_length:"Length",wall_interior:"Interior wall, shared with {rooms}. It is centred on the edge and uses the larger thickness of both rooms.",wall_exterior:"Exterior wall. It is drawn outside the room.",wall_partial:"{rooms} shares only part of its edge with this wall and keeps its own thickness there. Add a corner in that room to split its edge.",wall_thickness:"Wall thickness (m)",wall_default:"Default: {v} m",wall_reset:"Use default",wall_none:"No wall here (open passage)",opening_door:"Door",opening_window:"Window",opening_type:"Type",opening_room:"Belongs to",opening_offset:"Centre from edge start (m)",width:"Width (m)",height:"Height (m)",depth:"Depth (m)",thickness:"Thickness (m)",sill:"Sill height (m)",hinge:"Hinge",hinge_left:"Left (edge start)",hinge_right:"Right (edge end)",swing:"Opens",swing_in:"Into the room",swing_out:"Out of the room",contact:"Contact sensor (entity id)",contact_hint:"A binary sensor that is on while the door is open. Optional.",opening_delete:"Delete opening",freewall:"Free wall",freewall_height:"Height (m, empty = full height)",freewall_delete:"Delete wall",furniture:"Furniture",furniture_type:"Type",furniture_new_type:"Type for new furniture",rotation:"Rotation (\xB0)",rotate_left:"Rotate 90\xB0 anticlockwise",rotate_right:"Rotate 90\xB0 clockwise",furniture_delete:"Delete furniture",rotate_handle:"Drag to rotate",bg_upload:"Upload image",bg_replace:"Replace image",bg_remove:"Remove image",bg_none:"No background image on this floor.",bg_opacity:"Opacity",bg_rotation:"Rotation (\xB0)",bg_width:"Width (m)",bg_calibrate:"Set scale",bg_calib_first:"Click the first point of a distance you know.",bg_calib_second:"Click the second point.",bg_calib_length:"Real distance (m)",bg_calib_measured:"Measured on the image: {v} m",bg_calib_apply:"Apply scale",bg_move_hint:"Drag the image to move it.",bg_error:"The image could not be read.",area_value:"{v} m\xB2",length_value:"{v} m",nothing_selected:"Nothing selected.",group_lights:"Lights",group_living:"Living",group_dining:"Dining",group_kitchen:"Kitchen",group_sleeping:"Sleeping",group_bath:"Bath and laundry",group_work:"Work and other",group_household:"Household and installations",group_outdoor:"Outdoor",furn_lamp_ceiling:"Ceiling light",furn_lamp_downlight:"Downlight",furn_lamp_spot:"Surface spot",furn_lamp_panel:"LED panel",furn_lamp_pendant:"Pendant light",furn_lamp_fan:"Ceiling fan with light",furn_lamp_floor:"Floor lamp",furn_lamp_uplight:"Floor uplight",furn_lamp_table:"Table lamp",furn_lamp_wall:"Wall light",furn_led_strip:"LED strip",furn_lamp_bollard:"Path light",furn_lamp_garden:"Garden spot",furn_sofa:"Sofa",furn_sofa_l:"Corner sofa (L-shaped)",furn_sofa_u:"U-shaped sofa",furn_armchair:"Armchair",furn_stool:"Stool",furn_coffee_table:"Coffee table",furn_tv_board:"TV board",furn_tv_wall:"TV (wall)",furn_sideboard:"Sideboard",furn_shelf:"Shelf",furn_plant:"Plant",furn_rug:"Rug",furn_table:"Table",furn_table_round:"Round table",furn_chair:"Chair",furn_bench:"Bench",furn_corner_bench:"Corner bench",furn_bar_stool:"Bar stool",furn_kitchen:"Kitchen unit",furn_kitchen_wall:"Wall cabinet",furn_kitchen_tall:"Tall unit with oven",furn_island:"Kitchen island",furn_worktop:"Worktop",furn_sink:"Sink",furn_stove:"Stove",furn_dishwasher:"Dishwasher",furn_fridge:"Fridge",furn_bed:"Bed",furn_bunk_bed:"Bunk bed",furn_nightstand:"Nightstand",furn_wardrobe:"Wardrobe",furn_dresser:"Dresser",furn_bathtub:"Bathtub",furn_shower:"Shower",furn_wc:"WC",furn_washbasin:"Washbasin",furn_washer:"Washing machine",furn_dryer:"Dryer",furn_desk:"Desk",furn_office_chair:"Office chair",furn_tall_cabinet:"Tall cabinet",furn_coat_rack:"Coat rack",furn_radiator:"Radiator",furn_ac_unit:"Air conditioner (wall)",furn_stairs:"Stairs",furn_stairs_u:"U-shaped stairs with landing",furn_robot_vacuum:"Robot vacuum",furn_waste_bin:"Waste bin",furn_mailbox:"Mailbox",furn_wall_switch:"Light switch",furn_wall_socket:"Socket",furn_wifi_ap:"Wi-Fi access point",furn_water_heater:"Hot water tank",furn_parking:"Parking space",furn_awning:"Awning"},Yw={editor_label:"Grundriss-Editor",canvas_label:"Grundriss. Pfeiltasten verschieben die Auswahl, Entf l\xF6scht sie.",toolbar_label:"Werkzeuge",tool_select:"Ausw\xE4hlen und verschieben",tool_select_short:"Auswahl",tool_room:"Raum zeichnen",tool_room_short:"Raum",tool_wall:"W\xE4nde",tool_wall_short:"W\xE4nde",tool_door:"T\xFCr",tool_door_short:"T\xFCr",tool_window:"Fenster",tool_window_short:"Fenster",tool_freewall:"Freistehende Wand",tool_freewall_short:"Einzelwand",tool_furniture:"M\xF6bel",tool_furniture_short:"M\xF6bel",tool_background:"Hintergrundbild",tool_background_short:"Bild",tool_measure:"L\xE4ngen und Fl\xE4chen zeigen",tool_measure_short:"Ma\xDFe",undo:"R\xFCckg\xE4ngig",redo:"Wiederholen",zoom_in:"Vergr\xF6\xDFern",zoom_out:"Verkleinern",zoom_fit:"Alles zeigen",shortcut:"{label} ({key})",floor:"Etage",floor_add:"Etage hinzuf\xFCgen",floor_default_name:"Etage {n}",floor_settings:"Etage",floor_name:"Name",floor_ha:"Etage in Home Assistant",floor_height:"Geschossh\xF6he (m)",floor_elevation:"Fu\xDFbodenh\xF6he (m)",floor_delete:"Etage l\xF6schen",floor_delete_confirm:"Diese Etage mit allen R\xE4umen l\xF6schen?",no_floor:"Noch keine Etage. Lege eine an, um zu zeichnen.",none:"Keine",delete:"L\xF6schen",keep:"Behalten",cancel:"Abbrechen",room:"Raum",room_default_name:"Raum {n}",room_name:"Name",room_area_ha:"Bereich in Home Assistant",room_size:"Grundfl\xE4che",room_ceiling:"Raumh\xF6he (m, leer = Geschossh\xF6he)",room_delete:"Raum l\xF6schen",room_finish:"Raum schlie\xDFen",room_undo_point:"Letzte Ecke entfernen",corner:"Ecke {n}",corner_delete:"Ecke l\xF6schen",corner_min:"Ein Raum braucht mindestens drei Ecken.",pos_x:"X (m)",pos_z:"Z (m)",hint_select:"Klicke auf einen Raum, eine Ecke, eine \xD6ffnung oder ein M\xF6bel und ziehe es an die neue Stelle. Ziehst du ein + auf einer Kante, entsteht dort eine neue Ecke. Auf leerer Fl\xE4che verschiebt Ziehen die Ansicht.",hint_room:"Klicke die Ecken des Raums nacheinander an. Ein Klick auf die erste Ecke oder Enter schlie\xDFt den Raum. Die Ecken rasten im 5-cm-Raster und an vorhandenen W\xE4nden ein.",hint_wall:"Klicke auf eine Kante, um ihre Wand einzustellen.",hint_door:"Klicke auf eine Wand, um eine T\xFCr zu setzen. Eine T\xFCr l\xE4sst sich entlang ihrer Wand ziehen.",hint_window:"Klicke auf eine Wand, um ein Fenster zu setzen. Ein Fenster l\xE4sst sich entlang seiner Wand ziehen.",hint_freewall:"Klicke Anfang und Ende der Wand an, zum Beispiel f\xFCr einen Kamin oder eine Trennwand.",hint_freewall_second:"Klicke jetzt das Ende der Wand an. Esc bricht ab.",hint_furniture:"W\xE4hle eine Art und klicke an die Stelle, an die das M\xF6bel soll. Am runden Griff l\xE4sst es sich drehen.",hint_background:"Lade ein Bild deines Grundrisses hoch und lege den Ma\xDFstab \xFCber zwei Punkte mit bekanntem Abstand fest.",wall:"Wand",wall_length:"L\xE4nge",wall_interior:"Innenwand, gemeinsam mit {rooms}. Sie liegt mittig auf der Kante und nimmt die gr\xF6\xDFere St\xE4rke beider R\xE4ume.",wall_exterior:"Au\xDFenwand. Sie liegt au\xDFerhalb des Raums.",wall_partial:"{rooms} teilt nur einen Teil seiner Kante mit dieser Wand und beh\xE4lt dort die eigene St\xE4rke. Setze in diesem Raum eine Ecke, um seine Kante zu teilen.",wall_thickness:"Wandst\xE4rke (m)",wall_default:"Standard: {v} m",wall_reset:"Standard verwenden",wall_none:"Keine Wand (offener Durchgang)",opening_door:"T\xFCr",opening_window:"Fenster",opening_type:"Art",opening_room:"Geh\xF6rt zu",opening_offset:"Mitte ab Kantenanfang (m)",width:"Breite (m)",height:"H\xF6he (m)",depth:"Tiefe (m)",thickness:"St\xE4rke (m)",sill:"Br\xFCstungsh\xF6he (m)",hinge:"Anschlag",hinge_left:"Links (Kantenanfang)",hinge_right:"Rechts (Kantenende)",swing:"\xD6ffnet",swing_in:"In den Raum",swing_out:"Aus dem Raum heraus",contact:"Kontaktsensor (Entit\xE4ts-ID)",contact_hint:"Ein Bin\xE4rsensor, der an ist, solange die T\xFCr offen steht. Optional.",opening_delete:"\xD6ffnung l\xF6schen",freewall:"Freistehende Wand",freewall_height:"H\xF6he (m, leer = raumhoch)",freewall_delete:"Wand l\xF6schen",furniture:"M\xF6bel",furniture_type:"Art",furniture_new_type:"Art f\xFCr neue M\xF6bel",rotation:"Drehung (\xB0)",rotate_left:"90\xB0 gegen den Uhrzeigersinn drehen",rotate_right:"90\xB0 im Uhrzeigersinn drehen",furniture_delete:"M\xF6bel l\xF6schen",rotate_handle:"Zum Drehen ziehen",bg_upload:"Bild hochladen",bg_replace:"Bild ersetzen",bg_remove:"Bild entfernen",bg_none:"Diese Etage hat kein Hintergrundbild.",bg_opacity:"Deckkraft",bg_rotation:"Drehung (\xB0)",bg_width:"Breite (m)",bg_calibrate:"Ma\xDFstab festlegen",bg_calib_first:"Klicke den ersten Punkt einer Strecke an, deren L\xE4nge du kennst.",bg_calib_second:"Klicke den zweiten Punkt an.",bg_calib_length:"Tats\xE4chlicher Abstand (m)",bg_calib_measured:"Auf dem Bild gemessen: {v} m",bg_calib_apply:"Ma\xDFstab \xFCbernehmen",bg_move_hint:"Ziehe das Bild, um es zu verschieben.",bg_error:"Das Bild lie\xDF sich nicht lesen.",area_value:"{v} m\xB2",length_value:"{v} m",nothing_selected:"Nichts ausgew\xE4hlt.",group_lights:"Leuchten",group_living:"Wohnen",group_dining:"Essen",group_kitchen:"K\xFCche",group_sleeping:"Schlafen",group_bath:"Bad und Hauswirtschaft",group_work:"Arbeiten und Sonstiges",group_household:"Haushalt und Haustechnik",group_outdoor:"Au\xDFen",furn_lamp_ceiling:"Deckenleuchte",furn_lamp_downlight:"Einbauspot",furn_lamp_spot:"Aufbauspot",furn_lamp_panel:"LED-Panel",furn_lamp_pendant:"Pendelleuchte",furn_lamp_fan:"Deckenventilator mit Licht",furn_lamp_floor:"Stehlampe",furn_lamp_uplight:"Deckenfluter",furn_lamp_table:"Tischlampe",furn_lamp_wall:"Wandleuchte",furn_led_strip:"LED-Streifen",furn_lamp_bollard:"Wegleuchte",furn_lamp_garden:"Gartenstrahler",furn_sofa:"Sofa",furn_sofa_l:"Ecksofa (L-Form)",furn_sofa_u:"Wohnlandschaft (U-Form)",furn_armchair:"Sessel",furn_stool:"Hocker",furn_coffee_table:"Couchtisch",furn_tv_board:"TV-Board",furn_tv_wall:"Fernseher (Wand)",furn_sideboard:"Sideboard",furn_shelf:"Regal",furn_plant:"Pflanze",furn_rug:"Teppich",furn_table:"Tisch",furn_table_round:"Runder Tisch",furn_chair:"Stuhl",furn_bench:"Sitzbank",furn_corner_bench:"Eckbank",furn_bar_stool:"Barhocker",furn_kitchen:"K\xFCchenzeile",furn_kitchen_wall:"Oberschrank",furn_kitchen_tall:"Hochschrank mit Backofen",furn_island:"Kochinsel",furn_worktop:"Arbeitsplatte",furn_sink:"Sp\xFCle",furn_stove:"Herd",furn_dishwasher:"Sp\xFClmaschine",furn_fridge:"K\xFChlschrank",furn_bed:"Bett",furn_bunk_bed:"Etagenbett",furn_nightstand:"Nachttisch",furn_wardrobe:"Kleiderschrank",furn_dresser:"Kommode",furn_bathtub:"Badewanne",furn_shower:"Dusche",furn_wc:"WC",furn_washbasin:"Waschtisch",furn_washer:"Waschmaschine",furn_dryer:"Trockner",furn_desk:"Schreibtisch",furn_office_chair:"B\xFCrostuhl",furn_tall_cabinet:"Hochschrank",furn_coat_rack:"Garderobe",furn_radiator:"Heizk\xF6rper",furn_ac_unit:"Klimager\xE4t (Wand)",furn_stairs:"Treppe",furn_stairs_u:"U-Treppe mit Podest",furn_robot_vacuum:"Saugroboter",furn_waste_bin:"M\xFClltonne",furn_mailbox:"Briefkasten",furn_wall_switch:"Lichtschalter",furn_wall_socket:"Steckdose",furn_wifi_ap:"WLAN-Access-Point",furn_water_heater:"Warmwasserspeicher",furn_parking:"Stellplatz",furn_awning:"Markise"},Gp={en:iu,de:Yw};function Wp(i,t,e){let n=String(i||"en").toLowerCase().split(/[-_]/)[0],r=(Gp[n]||iu)[t]??iu[t]??t;if(e)for(let[o,a]of Object.entries(e))r=r.split(`{${o}}`).join(String(a));return r}function Xp(i,t,e=2){let n=String(i||"en").toLowerCase().split(/[-_]/)[0];return t==null||!Number.isFinite(t)?"":new Intl.NumberFormat(n==="de"?"de-DE":"en-GB",{minimumFractionDigits:0,maximumFractionDigits:e,useGrouping:!1}).format(t)}function ka(i){let t=String(i??"").trim().replace(",",".");if(t==="")return null;let e=Number(t);return Number.isFinite(e)?e:NaN}function Lt(i){let t=Math.round(i*1e3)/1e3;return Object.is(t,-0)?0:t}function on(i){return[Lt(i[0]),Lt(i[1])]}function Bt(i,t){return[i[0]+t[0],i[1]+t[1]]}function oe(i,t){return[i[0]-t[0],i[1]-t[1]]}function Zt(i,t){return[i[0]*t,i[1]*t]}function Ur(i,t){return i[0]*t[0]+i[1]*t[1]}function Fa(i,t){return i[0]*t[1]-i[1]*t[0]}function qp(i){return Math.hypot(i[0],i[1])}function Yt(i,t){return Math.hypot(i[0]-t[0],i[1]-t[1])}function Nr(i){let t=qp(i);return t<1e-9?[0,0]:[i[0]/t,i[1]/t]}function pi(i,t,e){return[i[0]+(t[0]-i[0])*e,i[1]+(t[1]-i[1])*e]}function Bs(i,t,e){return Math.min(e,Math.max(t,i))}function Yp(i){return i*Math.PI/180}function Zw(i){return i*180/Math.PI}function za(i){let t=(i%360+360)%360;return Lt(t)===360?0:Lt(t)}function Fs(i,t){let e=Yp(t),n=Math.cos(e),s=Math.sin(e);return[i[0]*n-i[1]*s,i[0]*s+i[1]*n]}function mi(i){let t=0,e=i.length;for(let n=0;n<e;n++){let s=i[n],r=i[(n+1)%e];t+=s[0]*r[1]-r[0]*s[1]}return t/2}function su(i){return Math.abs(mi(i))}function Zp(i){let t=i.length;if(!t)return[0,0];let e=mi(i);if(Math.abs(e)<1e-9){let r=0,o=0;for(let a of i)r+=a[0],o+=a[1];return[r/t,o/t]}let n=0,s=0;for(let r=0;r<t;r++){let o=i[r],a=i[(r+1)%t],l=o[0]*a[1]-a[0]*o[1];n+=(o[0]+a[0])*l,s+=(o[1]+a[1])*l}return[n/(6*e),s/(6*e)]}function Ba(i,t){let e=!1,n=t.length;for(let s=0,r=n-1;s<n;r=s++){let[o,a]=t[s],[l,c]=t[r];a>i[1]!=c>i[1]&&i[0]<(l-o)*(i[1]-a)/(c-a)+o&&(e=!e)}return e}function de(i,t){let e=i.length;return[i[(t%e+e)%e],i[((t+1)%e+e)%e]]}function Hi(i,t,e){let n=oe(e,t),s=Ur(n,n),r=Math.sqrt(s),o=s<1e-9?0:Ur(oe(i,t),n)/s;o=Bs(o,0,1);let a=pi(t,e,o);return{t:o,point:a,dist:Yt(i,a),along:o*r,length:r}}function ru(i,t,e){let n=oe(e,t),s=qp(n);return s<1e-9?Yt(i,t):Math.abs(Fa(n,oe(i,t)))/s}function Or(i,t,e){let n=Nr(oe(t,i));return e>=0?[-n[1],n[0]]:[n[1],-n[0]]}function ou(i,t){let e=i.length,n=i[(t-1+e)%e],s=i[t],r=i[(t+1)%e],o=Fa(oe(s,n),oe(r,s));return mi(i)>=0?o>1e-9:o<-1e-9}function Kp(i,t=1e-4){let e=[];for(let n of i)(!e.length||Yt(e[e.length-1],n)>t)&&e.push(n);for(;e.length>1&&Yt(e[0],e[e.length-1])<=t;)e.pop();return e}function zs(i,t){return t?Lt(Math.round(i/t)*t):i}function Va(i,t){return[zs(i[0],t),zs(i[1],t)]}function Jp(i,t={}){let{grid:e=.05,tol:n=.15,vertices:s=[],segments:r=[]}=t,o=null;for(let a=0;a<s.length;a++){let l=Yt(i,s[a]);l<=n&&(!o||l<o.d)&&(o={d:l,point:s[a],ref:a})}if(o)return{point:on(o.point),kind:"vertex",ref:o.ref};for(let a=0;a<r.length;a++){let[l,c]=r[a],h=Hi(i,l,c);h.dist<=n&&(!o||h.dist<o.d)&&(o={d:h.dist,pr:h,a:l,b:c,ref:a})}if(o){let{pr:a,a:l,b:c}=o,h=a.point;if(e&&a.length>1e-9){let d=Bs(Math.round(a.along/e)*e,0,a.length);h=pi(l,c,d/a.length)}return{point:on(h),kind:"edge",ref:o.ref}}return e?{point:Va(i,e),kind:"grid",ref:null}:{point:on(i),kind:"none",ref:null}}function au(i,t,e={}){let{grid:n=.05,tol:s=.15,targets:r=[]}=e,o=null;for(let c of i){let h=Bt(c,t);for(let d of r){let u=Yt(h,d);u<=s&&(!o||u<o.d)&&(o={d:u,corr:oe(d,h)})}}if(o)return[Lt(t[0]+o.corr[0]),Lt(t[1]+o.corr[1])];if(!i.length||!n)return[Lt(t[0]),Lt(t[1])];let a=Bt(i[0],t),l=Va(a,n);return[Lt(l[0]-i[0][0]),Lt(l[1]-i[0][1])]}function $a(i){let t=(i.w||0)/2,e=(i.d||0)/2,n=Yp(i.rotation||0),s=Math.cos(n),r=Math.sin(n);return[[-t,-e],[t,-e],[t,e],[-t,e]].map(([o,a])=>[i.x+o*s-a*r,i.z+o*r+a*s])}function jp(i,t){let e=oe(t,i);return za(Zw(Math.atan2(e[0],-e[1])))}function lu(i){if(!i.length)return null;let t=1/0,e=-1/0,n=1/0,s=-1/0;for(let[r,o]of i)r<t&&(t=r),r>e&&(e=r),o<n&&(n=o),o>s&&(s=o);return{x0:t,x1:e,z0:n,z1:s}}function Qp(i,t,e,n){let s=Yt(t,e);if(!(s>1e-9)||!(n>0))return i;let r=n/s,o=[i.x||0,i.z||0],a=i.rotation||0,l=Fs(oe(t,o),-a),c=Zt(l,r),h=oe(t,Fs(c,a));return{...i,x:Lt(h[0]),z:Lt(h[1]),width:Lt((i.width||0)*r)}}function tm(i,t){let e=i.width||0,n=e*(t||1),s=[i.x||0,i.z||0];return[[0,0],[e,0],[e,n],[0,n]].map(r=>Bt(s,Fs(r,i.rotation||0)))}var Ga=.01,Wa={wall_exterior:.24,wall_interior:.12};function cu(i){return{...Wa,...i&&i.settings}}function nm(i,t,e,n,s=Ga){let r=Yt(i,t);if(r<1e-9||ru(e,i,t)>s||ru(n,i,t)>s)return null;let o=oe(t,i),a=Ur(oe(e,i),o)/(r*r),l=Ur(oe(n,i),o)/(r*r),c=Math.max(0,Math.min(a,l)),h=Math.min(1,Math.max(a,l));return(h-c)*r<=s?null:[c,h]}function im(i,t,e,n=Ga){let s=i.rooms.find(l=>l.id===t);if(!s)return[];let[r,o]=de(s.points,e),a=[];for(let l of i.rooms){if(l.id===t)continue;let c=l.points.length;for(let h=0;h<c;h++){let[d,u]=de(l.points,h),f=nm(r,o,d,u,n);f&&a.push({room_id:l.id,edge:h,t0:f[0],t1:f[1]})}}return a}function hu(i,t,e,n=Ga){let s=[{room_id:t,edge:e}],r=[],o=i.rooms.find(c=>c.id===t);if(!o)return{targets:s,partial:r};let[a,l]=de(o.points,e);for(let c of im(i,t,e,n)){let h=i.rooms.find(_=>_.id===c.room_id),[d,u]=de(h.points,c.edge),f=nm(d,u,a,l,n),g=Yt(d,u);f&&(f[1]-f[0])*g>=g-2*n?s.push({room_id:c.room_id,edge:c.edge}):r.push(c.room_id)}return{targets:s,partial:r}}function sm(i,t,e,n=Ga){let s=i.rooms.find(u=>u.id===t);if(!s)return[];let[r,o]=de(s.points,e),a=im(i,t,e,n),l=[0,1];for(let u of a)l.push(u.t0,u.t1);l.sort((u,f)=>u-f);let c=Yt(r,o),h=[];for(let u of l)(!h.length||(u-h[h.length-1])*c>n/2)&&h.push(u);h[h.length-1]<1&&(h[h.length-1]=1);let d=[];for(let u=0;u<h.length-1;u++){let f=h[u],g=h[u+1],_=(f+g)/2,m=a.filter(p=>p.t0<=_&&p.t1>=_).map(p=>({room_id:p.room_id,edge:p.edge}));d.push({t0:f,t1:g,a:Bt(r,Zt(oe(o,r),f)),b:Bt(r,Zt(oe(o,r),g)),neighbours:m})}return d}function Gi(i,t){let e=i.wall_thickness&&i.wall_thickness[t];return typeof e=="number"&&e>0?e:null}function Ha(i,t){return!!(i.wall_heights&&i.wall_heights[t]===0)}function uu(i,t,e,n){let s=cu(i),r=t.rooms.find(g=>g.id===e);if(!r)return null;let o=sm(t,e,n),a=[...new Set(o.flatMap(g=>g.neighbours.map(_=>_.room_id)))],l=a.length>0,c=Gi(r,n),h=c??(l?s.wall_interior:s.wall_exterior);if(l)for(let g of o)for(let _ of g.neighbours){let m=t.rooms.find(y=>y.id===_.room_id),p=(m&&Gi(m,_.edge))??s.wall_interior;h=Math.max(h,p)}let[d,u]=de(r.points,n),f=l?hu(t,e,n).partial:[];return{length:Yt(d,u),shared:l,neighbours:a,partial:f,thickness:h,stored:c,noWall:Ha(r,n),pieces:o}}function rm(i,t){let e=cu(i),n=t.rooms||[],s=new Map(n.map((o,a)=>[o.id,a])),r=[];for(let o=0;o<n.length;o++){let a=n[o],l=a.points||[];if(l.length<3)continue;let c=mi(l);for(let h=0;h<l.length;h++){let[d,u]=de(l,h);if(Yt(d,u)<1e-9)continue;let f=Or(d,u,c),g=sm(t,a.id,h);for(let _ of g)if(_.neighbours.length>0){if(_.neighbours.some(x=>s.get(x.room_id)<o)||Ha(a,h)||_.neighbours.some(x=>Ha(n[s.get(x.room_id)],x.edge)))continue;let p=Gi(a,h)??e.wall_interior;for(let x of _.neighbours)p=Math.max(p,Gi(n[s.get(x.room_id)],x.edge)??e.wall_interior);let y=_.t0===0?p/2:0,v=_.t1===1?p/2:0;r.push(em(a.id,h,_.a,_.b,"interior",p,f,-p/2,p/2,y,v))}else{if(Ha(a,h))continue;let p=Gi(a,h)??e.wall_exterior,y=l.length,v=Gi(a,(h-1+y)%y)??e.wall_exterior,x=Gi(a,(h+1)%y)??e.wall_exterior,C=_.t0===0&&ou(l,h)?v:0,A=_.t1===1&&ou(l,(h+1)%y)?x:0;r.push(em(a.id,h,_.a,_.b,"exterior",p,f,-p,0,C,A))}}}return r}function em(i,t,e,n,s,r,o,a,l,c,h){let d=Nr(oe(n,e)),u=oe(e,Zt(d,c)),f=Bt(n,Zt(d,h)),g=[Bt(u,Zt(o,a)),Bt(f,Zt(o,a)),Bt(f,Zt(o,l)),Bt(u,Zt(o,l))];return{room_id:i,edge:t,a:e,b:n,kind:s,thickness:r,poly:g,n0:a,n1:l,normal:o}}function om(i){let t=i.thickness||.1,e=Nr(oe(i.b,i.a)),n=[-e[1],e[0]],s=t/2;return[Bt(i.a,Zt(n,-s)),Bt(i.b,Zt(n,-s)),Bt(i.b,Zt(n,s)),Bt(i.a,Zt(n,s))]}function am(i,t,e){let n=t.rooms.find(P=>P.id===e.room_id);if(!n||!n.points||n.points.length<3)return null;let s=n.points.length;if(!(e.edge>=0&&e.edge<s))return null;let[r,o]=de(n.points,e.edge),a=Yt(r,o);if(a<1e-9)return null;let l=Nr(oe(o,r)),c=Or(r,o,mi(n.points)),h=Math.min(e.width||.8,a),d=Bs(e.offset??a/2,h/2,a-h/2),u=Bt(r,Zt(l,d)),f=uu(i,t,n.id,e.edge),g=f?f.thickness:cu(i).wall_exterior,_=d/a,m=f?f.pieces.find(P=>P.t0<=_&&P.t1>=_):null,p=!!(m&&m.neighbours.length),y=p?-g/2:-g,v=p?g/2:0,x=oe(u,Zt(l,h/2)),C=Bt(u,Zt(l,h/2)),A=[Bt(x,Zt(c,y)),Bt(C,Zt(c,y)),Bt(C,Zt(c,v)),Bt(x,Zt(c,v))],R={a:x,b:C,centre:u,dir:l,normal:c,n0:y,n1:v,poly:A,width:h,offset:d,edgeLength:a,shared:p};if(e.type==="door"){let P=e.hinge==="right",M=e.swing==="out"?-1:1,w=M>0?v:y,I=Bt(P?C:x,Zt(c,w)),L=Bt(P?x:C,Zt(c,w)),E=Bt(I,Zt(c,M*h));R.hinge=I,R.closed=L,R.tip=E}return R}function Xa(i,t,e){let n=null;for(let s of i.rooms||[]){let r=s.points||[];if(r.length<3)continue;let o=Ba(t,r);for(let a=0;a<r.length;a++){let[l,c]=de(r,a),h=Hi(t,l,c);if(h.dist>e)continue;let d={room_id:s.id,edge:a,t:h.t,along:h.along,length:h.length,dist:h.dist,point:h.point,inside:o};(!n||d.dist<n.dist-.001||Math.abs(d.dist-n.dist)<=.001&&d.inside&&!n.inside)&&(n=d)}}return n&&delete n.inside,n}var qa={lights:["lamp_ceiling","lamp_downlight","lamp_spot","lamp_panel","lamp_pendant","lamp_fan","lamp_floor","lamp_uplight","lamp_table","lamp_wall","led_strip","lamp_bollard","lamp_garden"],living:["sofa","sofa_l","sofa_u","armchair","stool","coffee_table","tv_board","tv_wall","sideboard","shelf","plant","rug"],dining:["table","table_round","chair","bench","corner_bench","bar_stool"],kitchen:["kitchen","kitchen_wall","kitchen_tall","island","worktop","sink","stove","dishwasher","fridge"],sleeping:["bed","bunk_bed","nightstand","wardrobe","dresser"],bath:["bathtub","shower","wc","washbasin","washer","dryer"],work:["desk","office_chair","tall_cabinet","coat_rack","radiator","ac_unit","stairs","stairs_u","robot_vacuum"],household:["waste_bin","mailbox","wall_switch","wall_socket","wifi_ap","water_heater"],outdoor:["parking","awning"]},Kw=[...new Set(Object.values(qa).flat())],du={lamp_ceiling:[.4,.4,.08],lamp_downlight:[.1,.1,.02],lamp_spot:[.1,.1,.14],lamp_panel:[.6,.6,.03],lamp_pendant:[.4,.4,.8],lamp_fan:[1.3,1.3,.45],lamp_floor:[.4,.4,1.7],lamp_uplight:[.35,.35,1.8],lamp_table:[.28,.28,.45],lamp_wall:[.22,.12,.2],led_strip:[2,.04,.03],lamp_bollard:[.16,.16,.8],lamp_garden:[.12,.12,.3],sofa:[2.2,.9,.82],sofa_l:[2.6,1.8,.82],sofa_u:[3,2.2,.82],armchair:[.85,.85,.8],stool:[.55,.55,.42],coffee_table:[1.1,.6,.42],tv_board:[1.8,.42,.5],tv_wall:[1.3,.08,.75],sideboard:[1.6,.45,.8],shelf:[.9,.35,1.9],plant:[.45,.45,1.1],rug:[2,1.4,.01],table:[1.6,.9,.75],table_round:[1.1,1.1,.75],chair:[.46,.5,.9],bench:[1.4,.45,.85],corner_bench:[2,1.6,.9],bar_stool:[.42,.42,.75],kitchen:[2.4,.62,.92],kitchen_wall:[.8,.35,.7],kitchen_tall:[.6,.62,2.1],island:[1.8,.9,.92],worktop:[1.2,.62,.91],sink:[.9,.62,.92],stove:[.6,.62,.92],dishwasher:[.6,.62,.92],fridge:[.6,.65,1.8],bed:[1.6,2.05,.9],bunk_bed:[1,2.05,1.65],nightstand:[.45,.4,.5],wardrobe:[1.8,.6,2.1],dresser:[1,.5,.9],bathtub:[1.7,.75,.58],shower:[.9,.9,2],wc:[.38,.6,.8],washbasin:[.6,.46,.85],washer:[.6,.6,.85],dryer:[.6,.6,.85],desk:[1.4,.7,.75],office_chair:[.65,.65,1.1],tall_cabinet:[.6,.6,2.1],coat_rack:[1,.35,1.9],radiator:[1,.1,.6],ac_unit:[.85,.22,.3],stairs:[1,3.2,2.75],stairs_u:[2.1,2.7,2.75],robot_vacuum:[.36,.5,.1],waste_bin:[.58,.73,1.07],mailbox:[.38,.14,.34],wall_switch:[.085,.012,.085],wall_socket:[.085,.014,.085],wifi_ap:[.2,.2,.04],water_heater:[.56,.56,1.5],parking:[2.6,5.2,.02],awning:[3,2.5,.22]},Jw=new Set(["led_strip","shower","plant","rug","coat_rack"]);function lm(i){return(i.h||0)>=1.5&&!String(i.type).startsWith("lamp_")&&!Jw.has(i.type)}var $s=2.6,Ya={door:{width:.9,sill:0,height:2,hinge:"left",swing:"in"},window:{width:1.2,sill:.9,height:1.3,hinge:"left",swing:"in"}};function fu(){return{version:1,settings:{...Wa},floors:[]}}function pu(i){return!i||typeof i!="object"?fu():Array.isArray(i.floors)&&i.settings&&i.version?i:{version:1,...i,settings:{...Wa,...i.settings||{}},floors:i.floors||[]}}function fe(i,t){return i&&i.floors&&i.floors.find(e=>e.id===t)||null}function gi(i){return{rooms:[],openings:[],walls:[],furniture:[],outdoor:[],background:null,...i}}function we(i,t,e){let n=!1,s=i.floors.map(r=>r.id!==t?r:(n=!0,e(gi(r))));return n?{...i,floors:s}:i}function kr(i,t){let e=new Set(t),n=1;for(;e.has(`${i}_${n}`);)n++;return`${i}_${n}`}function Za(i){return[...(i.rooms||[]).map(t=>t.id),...(i.openings||[]).map(t=>t.id),...(i.walls||[]).map(t=>t.id),...(i.furniture||[]).map(t=>t.id)]}function hm(i,t={}){let e=pu(i),n=t.id||kr("floor",e.floors.map(o=>o.id)),s=0;for(let o of e.floors)s=Math.max(s,(o.elevation||0)+(o.height||$s));let r=gi({id:n,name:t.name||n,ha_floor:t.ha_floor??null,elevation:t.elevation??Lt(s),height:t.height??$s});return{...e,floors:[...e.floors,r]}}function um(i,t,e){let n={};for(let s of["name","ha_floor","height","elevation"])s in e&&(n[s]=e[s]);return we(i,t,s=>({...s,...n}))}function dm(i,t){return{...i,floors:i.floors.filter(e=>e.id!==t)}}function Le(i,t){return i&&i.rooms.find(e=>e.id===t)||null}function jw(i,t,e,n){return we(i,t,s=>({...s,rooms:s.rooms.map(r=>r.id===e?n(r):r)}))}function fm(i,t,e,n={}){let s=fe(i,t);if(!s)return{plan:i,id:null};let r=Kp(e.map(on));if(r.length<3)return{plan:i,id:null};let o=n.id||kr("room",Za(gi(s))),a={id:o,name:n.name||o,area_id:n.area_id??null,points:r,ceiling_height:null};return{plan:we(i,t,l=>({...l,rooms:[...l.rooms,a]})),id:o}}function pm(i,t,e,n){let s={};for(let r of["name","area_id","ceiling_height"])r in n&&(s[r]=n[r]);return jw(i,t,e,r=>({...r,...s}))}function mu(i,t,e){return we(i,t,n=>({...n,rooms:n.rooms.filter(s=>s.id!==e),openings:n.openings.filter(s=>s.room_id!==e)}))}function Hs(i,t,e){return t>=e?Lt(e/2):Lt(Bs(i,t/2,e-t/2))}function Qw(i,t){let[e,n]=de(i,t.edge),s=Yt(e,n);return s<1e-9?e:Bt(e,[(n[0]-e[0])*t.offset/s,(n[1]-e[1])*t.offset/s])}function mm(i,t,e,n,s){return i.map(r=>{if(r.room_id!==t)return r;let o=s(r.edge),a=Qw(e,r),[l,c]=de(n,o),h=Hi(a,l,c),d=Hs(h.along,r.width||0,h.length);return o===r.edge&&d===r.offset?r:{...r,edge:o,offset:d}})}function cm(i,t,e){if(!Array.isArray(i))return i;let n=i.slice();for(;n.length<e;)n.push(null);return n.splice(t+1,0,n[t]??null),n}function Fr(i,t,e,n,s){let r=fe(i,t),o=Le(r,e);if(!o||n<0||n>=o.points.length)return i;let a=on(s),l=o.points.map((c,h)=>h===n?a:c);return we(i,t,c=>({...c,rooms:c.rooms.map(h=>h.id===e?{...h,points:l}:h),openings:mm(c.openings,e,o.points,l,h=>h)}))}function gu(i,t,e,n,s){let r=fe(i,t),o=Le(r,e);if(!o)return{plan:i,index:null};let a=o.points.length,[l,c]=de(o.points,n),h=Hi(s,l,c);if(h.along<.01||h.length-h.along<.01)return{plan:i,index:null};let d=on(h.point),u=Yt(l,d),f=Yt(d,c),g=o.points.slice();g.splice(n+1,0,d);let _={...o,points:g};Array.isArray(o.wall_thickness)&&(_.wall_thickness=cm(o.wall_thickness,n,a)),Array.isArray(o.wall_heights)&&(_.wall_heights=cm(o.wall_heights,n,a));let m=p=>p.openings.map(y=>y.room_id!==e?y:y.edge>n?{...y,edge:y.edge+1}:y.edge<n?y:y.offset<=u?{...y,offset:Hs(y.offset,y.width||0,u)}:{...y,edge:n+1,offset:Hs(y.offset-u,y.width||0,f)});return{plan:we(i,t,p=>({...p,rooms:p.rooms.map(y=>y.id===e?_:y),openings:m(p)})),index:n+1}}function tM(i,t,e,n){let s=fe(i,t),r=Le(s,e);if(!r)return i;let o=r.points.length;if(o<=3||n<0||n>=o)return i;let a=r.points.filter((u,f)=>f!==n),l=(n-1+o)%o,c=u=>n===0?u===0||u===o-1?o-2:u-1:u===n?n-1:u<n?u:u-1,h=u=>{if(!Array.isArray(u))return u;let f=u.slice();for(;f.length<o;)f.push(null);let g=new Array(o-1).fill(null);for(let _=0;_<o;_++)_===n&&_!==l||(g[c(_)]=f[_]);return g[c(l)]=f[l],g},d={...r,points:a};return Array.isArray(r.wall_thickness)&&(d.wall_thickness=h(r.wall_thickness)),Array.isArray(r.wall_heights)&&(d.wall_heights=h(r.wall_heights)),we(i,t,u=>({...u,rooms:u.rooms.map(f=>f.id===e?d:f),openings:mm(u.openings,e,r.points,a,c)}))}function _u(i,t,e,n,s={}){let{withFurniture:r=!0}=s,o=fe(i,t),a=Le(o,e);if(!a||!n[0]&&!n[1])return i;let l=a.points.map(c=>on(Bt(c,n)));return we(i,t,c=>({...c,rooms:c.rooms.map(h=>h.id===e?{...h,points:l}:h),furniture:r?c.furniture.map(h=>Ba([h.x,h.z],a.points)?{...h,x:Lt(h.x+n[0]),z:Lt(h.z+n[1])}:h):c.furniture}))}function gm(i,t,e,n){let s=i.points.length,r=Array.isArray(i[t])?i[t].slice():new Array(s).fill(null);for(;r.length<s;)r.push(null);return r.length=s,r[e]=n,{...i,[t]:r}}function _m(i,t,e){return hu(i,t,e).targets}function xu(i,t,e,n,s){let r=fe(i,t);if(!Le(r,e))return i;let o=s==null||!(s>0)?null:Lt(s),a=_m(gi(r),e,n);return we(i,t,l=>({...l,rooms:l.rooms.map(c=>{let h=c;for(let d of a)d.room_id===c.id&&(h=gm(h,"wall_thickness",d.edge,o));return h})}))}function xm(i,t,e,n,s){let r=fe(i,t);if(!Le(r,e))return i;let o=_m(gi(r),e,n);return we(i,t,a=>({...a,rooms:a.rooms.map(l=>{let c=l;for(let h of o)if(h.room_id===l.id&&(c=gm(c,"wall_heights",h.edge,s?0:null),c.wall_heights.every(d=>d==null))){let{wall_heights:d,...u}=c;c=u}return c})}))}function vm(i,t,e,n,s,r="door",o={}){let a=fe(i,t),l=Le(a,e);if(!l)return{plan:i,id:null};let c=Yt(...de(l.points,n)),h=Ya[r]||Ya.door,d=o.width??h.width;d>c-.1&&(d=Lt(Math.max(.3,c-.1)));let u=o.id||kr(r,Za(gi(a))),f={id:u,room_id:e,edge:n,offset:Hs(s,d,c),width:d,type:r,sill:o.sill??h.sill,height:o.height??h.height,hinge:o.hinge??h.hinge,swing:o.swing??h.swing,contact:o.contact??null};return{plan:we(i,t,g=>({...g,openings:[...g.openings,f]})),id:u}}function Ka(i,t,e,n){return fe(i,t)?we(i,t,r=>({...r,openings:r.openings.map(o=>{if(o.id!==e)return o;let a={...o,...n};a.contact===""&&(a.contact=null);let l=Le(r,a.room_id);if(l){let c=Yt(...de(l.points,a.edge));a.width>c&&(a.width=Lt(c)),a.offset=Hs(a.offset,a.width,c)}return a})})):i}function ym(i,t,e,n,s=.05){let r=fe(i,t),o=r&&r.openings.find(u=>u.id===e),a=o&&Le(r,o.room_id);if(!a)return i;let[l,c]=de(a.points,o.edge),h=Hi(n,l,c),d=h.along;return s&&(d=Math.round(d/s)*s),Ka(i,t,e,{offset:Hs(d,o.width,h.length)})}function vu(i,t,e){return we(i,t,n=>({...n,openings:n.openings.filter(s=>s.id!==e)}))}function bm(i,t,e,n,s={}){let r=fe(i,t);if(!r||Yt(e,n)<.02)return{plan:i,id:null};let o=s.id||kr("wall",Za(gi(r))),a={id:o,a:on(e),b:on(n),thickness:s.thickness??.24,height:s.height??null};return{plan:we(i,t,l=>({...l,walls:[...l.walls,a]})),id:o}}function Ja(i,t,e,n){return we(i,t,s=>({...s,walls:s.walls.map(r=>{if(r.id!==e)return r;let o={...r,...n};return n.a&&(o.a=on(n.a)),n.b&&(o.b=on(n.b)),o})}))}function yu(i,t,e,n){let s=fe(i,t),r=s&&s.walls.find(o=>o.id===e);return r?Ja(i,t,e,{a:Bt(r.a,n),b:Bt(r.b,n)}):i}function bu(i,t,e){return we(i,t,n=>({...n,walls:n.walls.filter(s=>s.id!==e)}))}function wm(i,t,e,n,s,r={}){let o=fe(i,t);if(!o)return{plan:i,id:null};let a=du[e]||[1,1,1],l=r.id||kr(e,Za(gi(o))),c={id:l,type:e,x:Lt(n),z:Lt(s),w:r.w??a[0],d:r.d??a[1],h:r.h??a[2],rotation:za(r.rotation??0)};return{plan:we(i,t,h=>({...h,furniture:[...h.furniture,c]})),id:l}}function zr(i,t,e,n){return we(i,t,s=>({...s,furniture:s.furniture.map(r=>{if(r.id!==e)return r;let o={...r,...n};"rotation"in n&&(o.rotation=za(n.rotation||0));for(let a of["x","z","w","d","h"])a in n&&(o[a]=Lt(Number(n[a])||0));return o})}))}function wu(i,t,e){return we(i,t,n=>({...n,furniture:n.furniture.filter(s=>s.id!==e)}))}function Br(i,t,e){return we(i,t,n=>({...n,background:e?{...e}:null}))}function Vr(i,t,e){return we(i,t,n=>n.background?{...n,background:{...n.background,...e}}:n)}function Mm(i,t,e){if(!e)return i;switch(e.kind){case"room":return mu(i,t,e.id);case"corner":return tM(i,t,e.id,e.index);case"opening":return vu(i,t,e.id);case"wall":return bu(i,t,e.id);case"furniture":return wu(i,t,e.id);case"background":return Br(i,t,null);default:return i}}function Sm(i,t,e,n){if(!e)return i;let s=fe(i,t);if(!s)return i;switch(e.kind){case"room":return _u(i,t,e.id,n);case"corner":{let r=Le(s,e.id);return r?Fr(i,t,e.id,e.index,Bt(r.points[e.index],n)):i}case"wall":return yu(i,t,e.id,n);case"furniture":{let r=s.furniture.find(o=>o.id===e.id);return r?zr(i,t,e.id,{x:r.x+n[0],z:r.z+n[1]}):i}case"opening":{let r=s.openings.find(u=>u.id===e.id),o=r&&Le(s,r.room_id);if(!o)return i;let[a,l]=de(o.points,r.edge),c=Yt(a,l),h=oe(l,a),d=c>1e-9?(n[0]*h[0]+n[1]*h[1])/c:0;return Ka(i,t,e.id,{offset:r.offset+d})}case"background":{let r=s.background;return r?Vr(i,t,{x:Lt((r.x||0)+n[0]),z:Lt((r.z||0)+n[1])}):i}default:return i}}function ja(i,t=null){let e=[],n=[];for(let s of i&&i.rooms||[]){if(s.id===t)continue;let r=s.points||[];for(let o=0;o<r.length;o++)e.push(r[o]),n.push(de(r,o))}for(let s of i&&i.walls||[])e.push(s.a,s.b),n.push([s.a,s.b]);return{vertices:e,segments:n}}function Mu(i,t=100){return{past:[],present:i,future:[],limit:t}}function Em(i,t){if(t===i.present)return i;let e=[...i.past,i.present];for(;e.length>i.limit;)e.shift();return{...i,past:e,present:t,future:[]}}function Qa(i){return i.past.length>0}function tl(i){return i.future.length>0}function Am(i){if(!Qa(i))return i;let t=i.past.slice(0,-1);return{...i,past:t,present:i.past[i.past.length-1],future:[i.present,...i.future]}}function Tm(i){if(!tl(i))return i;let[t,...e]=i.future;return{...i,past:[...i.past,i.present],present:t,future:e}}function Rm(i,t){return{...i,present:t}}function Su(i){return Math.min(800,Math.max(8,i))}function Wi(i,t){return[(t[0]-i.tx)/i.scale,(t[1]-i.ty)/i.scale]}function Eu(i,t,e){let n=Su(i.scale*e),s=Wi(i,t);return{scale:n,tx:t[0]-s[0]*n,ty:t[1]-s[1]*n}}function Cm(i,t,e,n=24){let s=i||{x0:0,x1:10,z0:0,z1:8},r=Math.max(1,s.x1-s.x0),o=Math.max(1,s.z1-s.z0),a=Math.max(1,t-2*n),l=Math.max(1,e-2*n),c=Su(Math.min(a/r,l/o));return{scale:c,tx:t/2-(s.x0+s.x1)/2*c,ty:e/2-(s.z0+s.z1)/2*c}}function Pm(i,t,e){let n=(u,f)=>[(u[0]+f[0])/2,(u[1]+f[1])/2],s=(u,f)=>Math.hypot(u[0]-f[0],u[1]-f[1]),r=s(t[0],t[1]),o=s(e[0],e[1]),a=r>1?o/r:1,l=n(t[0],t[1]),c=n(e[0],e[1]),h=Wi(i,l),d=Su(i.scale*a);return{scale:d,tx:c[0]-h[0]*d,ty:c[1]-h[1]*d}}var Zn=.05,nM=10,iM=4,sM=6,Im=14,rM=.3,Lm=[{id:"select",key:"V",icon:"select"},{id:"room",key:"R",icon:"room"},{id:"wall",key:"W",icon:"wall"},{id:"door",key:"D",icon:"door"},{id:"window",key:"N",icon:"window"},{id:"freewall",key:"F",icon:"freewall"},{id:"furniture",key:"M",icon:"furniture"},{id:"background",key:"B",icon:"background"}],oM={select:["room","corner","opening","wall","furniture"],room:["room","corner"],wall:["edge"],door:["opening"],window:["opening"],freewall:["wall"],furniture:["furniture"],background:["background"]},$r=typeof navigator<"u"&&/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent||"");function Xi(i){return!i||!i.length?"":"M"+i.map(t=>`${t[0]} ${t[1]}`).join("L")+"Z"}function aM(i,t){try{return JSON.stringify(i)===JSON.stringify(t)}catch{return!1}}function Dm(i){return new Promise((t,e)=>{let n=new Image;n.onload=()=>t(n),n.onerror=()=>e(new Error("image")),n.src=i})}function lM(i){return new Promise((t,e)=>{let n=new FileReader;n.onload=()=>t(n.result),n.onerror=()=>e(n.error),n.readAsDataURL(i)})}var el=class extends Ye{static properties={plan:{attribute:!1},floorId:{attribute:"floor-id"},lang:{type:String},dark:{type:Boolean,reflect:!0},areas:{attribute:!1},floors:{attribute:!1},_history:{state:!0},_draft:{state:!0},_floor:{state:!0},_tool:{state:!0},_sel:{state:!0},_view:{state:!0},_measure:{state:!0},_draw:{state:!0},_hover:{state:!0},_hoverEdge:{state:!0},_wallStart:{state:!0},_calib:{state:!0},_furnType:{state:!0},_confirmDelete:{state:!0},_panning:{state:!0},_bgError:{state:!0},_size:{state:!0}};static styles=Hp;constructor(){super(),this.plan=null,this.floorId=null,this.lang="en",this.dark=!1,this.areas=[],this.floors=[],this._history=Mu(fu()),this._draft=null,this._floor=null,this._tool="select",this._sel=null,this._view={scale:50,tx:24,ty:24},this._measure=!0,this._draw=[],this._hover=null,this._hoverEdge=null,this._wallStart=null,this._calib=null,this._furnType="sofa",this._confirmDelete=!1,this._panning=!1,this._bgError=!1,this._size=null,this._emitted=void 0,this._needFit=!0,this._userView=!1,this._pointers=new Map,this._gesture=null,this._drag=null,this._aspects=new Map,this.addEventListener("keydown",t=>this._onKey(t))}get _plan(){return this._history.present}get _shown(){return this._draft||this._plan}get _floorObj(){return fe(this._shown,this._floor)}_t(t,e){return Wp(this.lang,t,e)}_n(t,e=2){return Xp(this.lang,t,e)}willUpdate(t){t.has("plan")&&this._syncPlan(),t.has("floorId")&&this.floorId&&this.floorId!==this._floor&&(this._floor=this.floorId,this._resetInteraction(),this._sel=null,this._needFit=!0);let e=this._plan.floors||[];e.some(n=>n.id===this._floor)||(this._floor=e.length?e[0].id:null,this._needFit=!0)}_syncPlan(){let t=this.plan;if(t===this._emitted)return;this._emitted=t;let e=pu(t);if(e!==this._plan){if(aM(e,this._plan)){this._history=Rm(this._history,e);return}this._history=Mu(e),this._resetInteraction(),this._sel=null,this._needFit=!0}}firstUpdated(){let t=this.renderRoot.querySelector(".canvas");t&&typeof ResizeObserver<"u"&&(this._ro=new ResizeObserver(e=>{let n=e[0].contentRect;n.width>0&&n.height>0&&(this._size={w:n.width,h:n.height},this._userView||(this._needFit=!0))}),this._ro.observe(t))}updated(){this._needFit&&this._size&&this._floorObj&&this._fit()}disconnectedCallback(){super.disconnectedCallback(),this._ro&&this._ro.disconnect(),this._ro=null}connectedCallback(){super.connectedCallback(),this.hasUpdated&&!this._ro&&this.firstUpdated()}_resetInteraction(){this._draft=null,this._drag=null,this._draw=[],this._hover=null,this._hoverEdge=null,this._wallStart=null,this._calib=null,this._confirmDelete=!1}_commit(t,e){return this._draft=null,e!==void 0&&(this._sel=e),!t||t===this._plan?!1:(this._history=Em(this._history,t),this._emit(),!0)}_emit(){let t=this._plan;this._emitted=t,this.dispatchEvent(new CustomEvent("plan-changed",{detail:{plan:t},bubbles:!0,composed:!0}))}_undo(){Qa(this._history)&&(this._resetInteraction(),this._history=Am(this._history),this._afterHistoryMove())}_redo(){tl(this._history)&&(this._resetInteraction(),this._history=Tm(this._history),this._afterHistoryMove())}_afterHistoryMove(){if(!fe(this._plan,this._floor)){let t=this._plan.floors[0];this._floor=t?t.id:null}this._validateSelection(),this._emit()}_validateSelection(){let t=this._sel,e=fe(this._plan,this._floor);if(!t||!e){this._sel=null;return}let n=r=>e.rooms.find(o=>o.id===r),s=!0;t.kind==="room"?s=!!n(t.id):t.kind==="corner"||t.kind==="edge"?s=!!n(t.id)&&t.index<n(t.id).points.length:t.kind==="opening"?s=e.openings.some(r=>r.id===t.id):t.kind==="wall"?s=e.walls.some(r=>r.id===t.id):t.kind==="furniture"?s=e.furniture.some(r=>r.id===t.id):t.kind==="background"&&(s=!!e.background),s||(this._sel=null)}_selectFloor(t){t!==this._floor&&(this._floor=t,this._resetInteraction(),this._sel=null,this._needFit=!0,this.dispatchEvent(new CustomEvent("floor-selected",{detail:{floorId:t},bubbles:!0,composed:!0})))}_addFloor(){let t=(this._plan.floors||[]).length+1,e=hm(this._plan,{name:this._t("floor_default_name",{n:t})}),n=e.floors[e.floors.length-1].id;this._commit(e,null),this._selectFloor(n)}_deleteFloor(){let t=dm(this._plan,this._floor);this._confirmDelete=!1,this._commit(t,null);let e=t.floors[0];this._selectFloor(e?e.id:null)}_fit(){let t=this._floorObj,e=[];if(t){for(let l of t.rooms)e.push(...l.points);for(let l of t.walls)e.push(l.a,l.b);for(let l of t.furniture)e.push(...$a(l));t.background&&t.background.image&&e.push(...tm(t.background,this._aspect(t.background.image)))}let n=lu(e),s=.4,r=n?{x0:n.x0-s,x1:n.x1+s,z0:n.z0-s,z1:n.z1+s}:null,{w:o,h:a}=this._size||{w:800,h:600};this._view=Cm(r,o,a,24),this._needFit=!1,this._userView=!1}_zoom(t){this._userView=!0;let{w:e,h:n}=this._size||{w:800,h:600};this._view=Eu(this._view,[e/2,n/2],t)}_aspect(t){return this._aspects.has(t)?this._aspects.get(t):(this._aspects.set(t,.75),Dm(t).then(e=>{e.naturalWidth>0&&e.naturalHeight>0&&(this._aspects.set(t,e.naturalHeight/e.naturalWidth),this.requestUpdate())}).catch(()=>{}),.75)}_setTool(t){if(t!==this._tool&&(this._tool=t,this._resetInteraction(),this._sel&&!oM[t].includes(this._sel.kind)&&(this._sel=null),t==="background")){let e=this._floorObj;this._sel=e&&e.background?{kind:"background"}:null}}_tolerance(){return nM/this._view.scale}_edgeTolerance(){return Math.max(Im/this._view.scale,rM)}_snap(t,e={}){let n=fe(this._plan,this._floor),s=ja(n,e.exceptRoom||null),r=s.vertices,o=s.segments;if(e.exceptWall){let l=n.walls.find(c=>c.id===e.exceptWall);l&&(r=r.filter(c=>c!==l.a&&c!==l.b),o=o.filter(c=>c[0]!==l.a||c[1]!==l.b))}let a=e.extra||[];if(a.length){r=[...r,...a];let l=[];for(let c=0;c+1<a.length;c++)l.push([a[c],a[c+1]]);o=[...o,...l]}return Jp(t,{grid:Zn,tol:this._tolerance(),vertices:r,segments:o})}_svgEl(){return this.renderRoot.querySelector("svg.plan")}_local(t){let e=this._svgEl(),n=e?e.getBoundingClientRect():{left:0,top:0};return[t.clientX-n.left,t.clientY-n.top]}_onPointerDown(t){if(!this._floorObj||t.pointerType==="mouse"&&t.button!==0&&t.button!==1)return;let e=t.currentTarget;try{e.setPointerCapture(t.pointerId)}catch{}let n=this.renderRoot.querySelector(".canvas");n&&this.shadowRoot.activeElement!==n&&n.focus({preventScroll:!0});let s=this._local(t);if(t.isPrimary&&(this._pointers.clear(),this._gesture=null),this._pointers.set(t.pointerId,s),this._pointers.size>=2){this._draft=null,this._drag=null;let c=[...this._pointers.values()].slice(0,2);this._gesture={startView:this._view,start:c};return}let r=Wi(this._view,s),o=t.target&&t.target.closest?t.target.closest("[data-hit]"):null,a=o?{kind:o.dataset.hit,id:o.dataset.id||null,index:o.dataset.index!=null?Number(o.dataset.index):null}:null,l=t.button===1?"pan":this._modeFor(a);this._drag={mode:l,hit:a,startS:s,startP:r,startView:this._view,base:this._plan,moved:!1},t.preventDefault()}_modeFor(t){let e=this._tool,n=t&&t.kind;if(e==="select")return n==="corner"?(this._sel={kind:"corner",id:t.id,index:t.index},"corner"):n==="mid"?"insert":n==="rot"?"rotate":n==="wallend"?"wallend":n==="opening"?(this._sel={kind:"opening",id:t.id},"opening"):n==="furniture"?(this._sel={kind:"furniture",id:t.id},"furniture"):n==="freewall"?(this._sel={kind:"wall",id:t.id},"freewall"):n==="room"?(this._sel={kind:"room",id:t.id},"room"):"pan";if((e==="door"||e==="window")&&n==="opening")return this._sel={kind:"opening",id:t.id},"opening";if(e==="furniture"){if(n==="furniture")return this._sel={kind:"furniture",id:t.id},"furniture";if(n==="rot")return"rotate"}return e==="freewall"&&n==="wallend"&&!this._wallStart?"wallend":e==="background"?this._calib?"click":n==="bg"?(this._sel={kind:"background"},"bg"):"pan":"click"}_onPointerMove(t){let e=this._local(t);if(this._pointers.has(t.pointerId)&&this._pointers.set(t.pointerId,e),this._gesture){if(this._pointers.size>=2){let r=[...this._pointers.values()].slice(0,2);this._view=Pm(this._gesture.startView,this._gesture.start,r),this._userView=!0}return}let n=Wi(this._view,e),s=this._drag;if(!s){(t.pointerType==="mouse"||t.pointerType==="pen")&&this._updateHover(n);return}if(!(!s.moved&&Math.hypot(e[0]-s.startS[0],e[1]-s.startS[1])<iM)){if(s.moved=!0,s.mode==="pan"||s.mode==="click"){this._panning=!0,this._userView=!0,this._view={...s.startView,tx:s.startView.tx+e[0]-s.startS[0],ty:s.startView.ty+e[1]-s.startS[1]};return}this._dragEdit(s,n,t)}}_dragEdit(t,e,n){let s=this._floor,r=fe(t.base,s),o=oe(e,t.startP),a=t.hit&&t.hit.id,l=null;switch(t.mode){case"insert":{let c=gu(t.base,s,a,t.hit.index,t.startP);if(c.index==null)return;t.base=c.plan,t.mode="corner",t.hit={kind:"corner",id:a,index:c.index},this._sel={kind:"corner",id:a,index:c.index},this._dragEdit(t,e,n);return}case"corner":{let c=this._snap(e,{exceptRoom:a});this._hover=c,l=Fr(t.base,s,a,t.hit.index,c.point);break}case"room":{let c=Le(r,a);if(!c)return;let h=ja(r,a).vertices,d=au(c.points,o,{grid:Zn,tol:this._tolerance(),targets:h});l=_u(t.base,s,a,d);break}case"furniture":{let c=r.furniture.find(h=>h.id===a);if(!c)return;l=zr(t.base,s,a,{x:zs(c.x+o[0],Zn),z:zs(c.z+o[1],Zn)});break}case"rotate":{let c=r.furniture.find(d=>d.id===a);if(!c)return;let h=jp([c.x,c.z],e);n.shiftKey||(h=Math.round(h/15)*15),l=zr(t.base,s,a,{rotation:h});break}case"freewall":{let c=r.walls.find(u=>u.id===a);if(!c)return;let h=ja(r).vertices.filter(u=>u!==c.a&&u!==c.b),d=au([c.a,c.b],o,{grid:Zn,tol:this._tolerance(),targets:h});l=yu(t.base,s,a,d);break}case"wallend":{let c=this._snap(e,{exceptWall:a});this._hover=c,l=Ja(t.base,s,a,{[t.hit.index?"b":"a"]:c.point});break}case"opening":l=ym(t.base,s,a,e,Zn);break;case"bg":{let c=r.background;if(!c)return;l=Vr(t.base,s,{x:Lt((c.x||0)+o[0]),z:Lt((c.z||0)+o[1])});break}default:return}this._draft=l}_onPointerUp(t){let e=this._pointers.delete(t.pointerId);if(this._gesture){this._pointers.size<2&&(this._gesture=null),this._drag=null;return}let n=this._drag;if(this._drag=null,this._panning=!1,!(!n||!e)){if(n.moved){n.mode!=="pan"&&n.mode!=="click"&&(this._hover=null,this._draft?this._commit(this._draft):this._draft=null);return}this._click(n)}}_onPointerCancel(t){this._pointers.delete(t.pointerId),this._pointers.size<2&&(this._gesture=null),this._drag=null,this._draft=null,this._panning=!1}_onPointerLeave(){this._drag||(this._hover=null,this._hoverEdge=null)}_onWheel(t){t.preventDefault();let e=this._local(t);this._userView=!0;let n=t.deltaMode===1?.05:t.deltaMode===2?1:.0015;this._view=Eu(this._view,e,Math.exp(-t.deltaY*n))}_onDblClick(){this._tool==="room"&&this._draw.length>=3&&this._finishRoom()}_updateHover(t){let e=this._tool;if(e==="room"||e==="freewall"){this._hover=this._snap(t,{extra:e==="room"?this._draw:[]});return}if(e==="wall"||e==="door"||e==="window"){let n=this._floorObj,s=n?Xa(n,t,this._edgeTolerance()):null,r=this._hoverEdge;if(!s&&!r||s&&r&&s.room_id===r.room_id&&s.edge===r.edge)return;this._hoverEdge=s}}_click(t){let e=this._floor,n=t.startP,s=t.hit,r=this._plan,o=fe(r,e);switch(this._tool){case"select":if(s&&s.kind==="mid"){let a=gu(r,e,s.id,s.index,n);a.index!=null&&this._commit(a.plan,{kind:"corner",id:s.id,index:a.index})}else s||(this._sel=null);break;case"room":this._addDrawPoint(n);break;case"wall":{let a=Xa(o,n,this._edgeTolerance());this._sel=a?{kind:"edge",id:a.room_id,index:a.edge}:null;break}case"door":case"window":{if(s&&s.kind==="opening")break;let a=Xa(o,n,this._edgeTolerance());if(!a)break;let l=vm(r,e,a.room_id,a.edge,zs(a.along,Zn),this._tool);l.id&&this._commit(l.plan,{kind:"opening",id:l.id});break}case"freewall":{let a=this._snap(n);if(!this._wallStart)this._wallStart=a.point,this._sel=null;else{let l=bm(r,e,this._wallStart,a.point);this._wallStart=null,l.id&&this._commit(l.plan,{kind:"wall",id:l.id})}break}case"furniture":{if(s&&(s.kind==="furniture"||s.kind==="rot"))break;let a=Va(n,Zn),l=wm(r,e,this._furnType,a[0],a[1]);l.id&&this._commit(l.plan,{kind:"furniture",id:l.id});break}case"background":{let a=this._calib;a&&(!a.p1||a.p2?this._calib={p1:n,p2:null,length:""}:this._calib={...a,p2:n});break}default:break}}_addDrawPoint(t){let e=this._draw,n=this._snap(t,{extra:e});if(e.length>=3&&(Yt(n.point,e[0])<.005||Yt(t,e[0])<=this._tolerance()*1.2)){this._finishRoom();return}e.length&&Yt(n.point,e[e.length-1])<.01||(this._draw=[...e,n.point])}_finishRoom(){let t=this._draw;if(t.length<3)return;let e=fe(this._plan,this._floor),n=this._t("room_default_name",{n:e.rooms.length+1}),s=fm(this._plan,this._floor,t,{name:n});this._draw=[],this._hover=null,s.id&&this._commit(s.plan,{kind:"room",id:s.id})}_onKey(t){let e=t.composedPath()[0],n=e&&e.tagName;if(n==="INPUT"||n==="SELECT"||n==="TEXTAREA"){t.key==="Escape"&&e.blur&&e.blur();return}let s=t.ctrlKey||t.metaKey,r=t.key.length===1?t.key.toLowerCase():t.key;if(s&&r==="z"){t.shiftKey?this._redo():this._undo(),t.preventDefault();return}if(s&&r==="y"){this._redo(),t.preventDefault();return}if(s||t.altKey)return;let o=n==="BUTTON"||n==="LABEL";switch(r){case"Escape":this._escape(),t.preventDefault();return;case"Enter":!o&&this._tool==="room"&&this._draw.length>=3&&(this._finishRoom(),t.preventDefault());return;case"Delete":case"Backspace":this._tool==="room"&&this._draw.length?this._draw=this._draw.slice(0,-1):this._deleteSelection(),t.preventDefault();return;case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"ArrowDown":{if(o)return;let a=t.shiftKey?.01:Zn,l={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[r];this._sel&&this._sel.kind!=="edge"?this._commit(Sm(this._plan,this._floor,this._sel,Zt(l,a))):(this._view={...this._view,tx:this._view.tx-l[0]*40,ty:this._view.ty-l[1]*40},this._userView=!0),t.preventDefault();return}case"+":case"=":this._zoom(1.25);return;case"-":this._zoom(.8);return;case"0":this._fit();return;case"l":this._measure=!this._measure;return;default:{let a=Lm.find(l=>l.key.toLowerCase()===r);a&&(this._setTool(a.id),t.preventDefault())}}}_escape(){if(this._drag){this._drag=null,this._draft=null,this._panning=!1;return}if(this._draw.length){this._draw=[];return}if(this._wallStart){this._wallStart=null;return}if(this._calib){this._calib=null;return}this._sel=null}_deleteSelection(){let t=this._sel;if(!t||t.kind==="edge")return;let e=Mm(this._plan,this._floor,t);if(e===this._plan)return;let n=t.kind==="corner"?{kind:"room",id:t.id}:null;this._commit(e,n)}async _onUpload(t){let e=t.target,n=e.files&&e.files[0];if(e.value="",!!n)try{let s=await lM(n),r=await Dm(s),o=s,a=r.naturalWidth||1e3,l=r.naturalHeight||750,c=3e3;if(r.naturalWidth&&(a>c||l>c||n.size>2e6)){let g=Math.min(1,c/Math.max(a,l)),_=document.createElement("canvas");_.width=Math.round(a*g),_.height=Math.round(l*g);let m=_.getContext("2d");m.fillStyle="#ffffff",m.fillRect(0,0,_.width,_.height),m.drawImage(r,0,0,_.width,_.height),o=_.toDataURL("image/jpeg",.85)}this._aspects.set(o,l/a);let h=fe(this._plan,this._floor),d=h.background,u=lu(h.rooms.flatMap(g=>g.points)),f=d?{...d,image:o}:{image:o,x:u?u.x0:0,z:u?u.z0:0,width:u?Lt(Math.max(4,u.x1-u.x0)+1):10,rotation:0,opacity:.5};this._bgError=!1,this._commit(Br(this._plan,this._floor,f),{kind:"background"}),u||(this._needFit=!0)}catch{this._bgError=!0}}render(){let t=this._floorObj,e=["canvas",`tool-${this._tool}`,this._calib?"calib":"",this._panning?"panning":""].join(" ");return Y`
      <div class="root">
        ${this._renderFloorBar()} ${this._renderToolbar()}
        <div class="main">
          <div class=${e} tabindex="0" role="application" aria-label=${this._t("canvas_label")}>
            ${t?this._renderPlan(this._shown,t):Y`<div class="empty">
                  <p>${this._t("no_floor")}</p>
                  <button class="primary" @click=${()=>this._addFloor()}>${me("plus")}<span>${this._t("floor_add")}</span></button>
                </div>`}
            ${t?Y`<div class="zoom">
                  <button title=${this._t("shortcut",{label:this._t("zoom_in"),key:"+"})} aria-label=${this._t("zoom_in")} @click=${()=>this._zoom(1.25)}>
                    ${me("zoomIn")}
                  </button>
                  <button title=${this._t("shortcut",{label:this._t("zoom_out"),key:"\u2212"})} aria-label=${this._t("zoom_out")} @click=${()=>this._zoom(.8)}>
                    ${me("zoomOut")}
                  </button>
                  <button title=${this._t("shortcut",{label:this._t("zoom_fit"),key:"0"})} aria-label=${this._t("zoom_fit")} @click=${()=>this._fit()}>
                    ${me("fit")}
                  </button>
                </div>`:mt}
          </div>
          <aside class="panel" aria-live="polite">${this._renderPanel(this._shown,t)}</aside>
        </div>
      </div>
    `}_renderFloorBar(){let t=this._plan.floors||[];return Y`<div class="bar">
      ${t.length?Y`<label class="visually-hidden" for="pp-floor">${this._t("floor")}</label>
            <select id="pp-floor" class="floor-select" @change=${e=>this._selectFloor(e.target.value)}>
              ${t.map(e=>Y`<option value=${e.id} ?selected=${e.id===this._floor}>${e.name||e.id}</option>`)}
            </select>`:mt}
      <button @click=${()=>this._addFloor()}>${me("plus")}<span>${this._t("floor_add")}</span></button>
    </div>`}_renderToolbar(){let t=$r?"\u2318":"Ctrl+",e=$r?"\u2318Z":"Ctrl+Z",n=$r?"\u21E7\u2318Z":"Shift+Ctrl+Z",s=!this._floor;return Y`<div class="toolbar" role="toolbar" aria-label=${this._t("toolbar_label")}>
      ${Lm.map(r=>Y`<button
          class="tool"
          aria-pressed=${String(this._tool===r.id)}
          ?disabled=${s}
          title=${this._t("shortcut",{label:this._t(`tool_${r.id}`),key:r.key})}
          aria-keyshortcuts=${r.key}
          @click=${()=>this._setTool(r.id)}
        >
          ${me(r.icon)}<span>${this._t(`tool_${r.id}_short`)}</span>
        </button>`)}
      <span class="sep" role="separator"></span>
      <button
        class="tool"
        aria-pressed=${String(this._measure)}
        title=${this._t("shortcut",{label:this._t("tool_measure"),key:"L"})}
        aria-keyshortcuts="L"
        @click=${()=>this._measure=!this._measure}
      >
        ${me("measure")}<span>${this._t("tool_measure_short")}</span>
      </button>
      <button
        class="tool"
        ?disabled=${!Qa(this._history)}
        title=${this._t("shortcut",{label:this._t("undo"),key:e})}
        aria-keyshortcuts=${$r?"Meta+Z":"Control+Z"}
        @click=${()=>this._undo()}
      >
        ${me("undo")}<span>${this._t("undo")}</span>
      </button>
      <button
        class="tool"
        ?disabled=${!tl(this._history)}
        title=${this._t("shortcut",{label:this._t("redo"),key:n})}
        aria-keyshortcuts=${$r?"Shift+Meta+Z":"Shift+Control+Z"}
        data-mod=${t}
        @click=${()=>this._redo()}
      >
        ${me("redo")}<span>${this._t("redo")}</span>
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
    </svg>`}_renderGrid(t){let{w:e,h:n}=this._size||{w:800,h:600},s=this._view,[r,o]=Wi(s,[0,0]),[a,l]=Wi(s,[e,n]),c=s.scale>=40?.25:s.scale>=12?1:5,h=c<1?1:5,d="",u="",f=(g,_)=>{let m="",p=Math.floor(r/g)*g,y=Math.floor(o/g)*g,v=0;for(let x=p;x<=a&&v<600;x+=g,v++){let C=Math.abs(x/h-Math.round(x/h))<1e-6;_===C&&(m+=`M${x} ${o}V${l}`)}v=0;for(let x=y;x<=l&&v<600;x+=g,v++){let C=Math.abs(x/h-Math.round(x/h))<1e-6;_===C&&(m+=`M${r} ${x}H${a}`)}return m};return d=f(c,!1),u=f(h,!0),Wt`<path class="grid-line" d=${d} stroke-width=${t} fill="none" pointer-events="none"></path>
      <path class="grid-major" d=${u} stroke-width=${t} fill="none" pointer-events="none"></path>`}_renderBackground(t,e){let n=t.background;if(!n||!n.image)return mt;let s=this._aspect(n.image),r=n.width||10,o=this._tool==="background"&&!this._calib;return Wt`<g transform="translate(${n.x||0} ${n.z||0}) rotate(${n.rotation||0})">
      <image class="bg-image ${o?"movable":""}" href=${n.image} x="0" y="0" width=${r} height=${r*s}
        opacity=${n.opacity??.5} preserveAspectRatio="none" pointer-events=${o?"all":"none"}
        data-hit=${o?"bg":mt}></image>
      ${this._tool==="background"?Wt`<rect class="bg-outline" x="0" y="0" width=${r} height=${r*s} pointer-events="none"></rect>`:mt}
    </g>`}_renderRooms(t){let e=this._sel;return t.rooms.map(n=>{let s=e&&(e.kind==="room"||e.kind==="corner"||e.kind==="edge")&&e.id===n.id;return Wt`<path class="room ${s?"selected":""}" d=${Xi(n.points)} data-hit="room" data-id=${n.id}></path>`})}_renderWalls(t,e){let n=rm(t,e),s=this._sel;return Wt`${n.map(r=>Wt`<path class="band ${r.kind}" d=${Xi(r.poly)} pointer-events="none"></path>`)}
      ${e.walls.map(r=>Wt`<path class="free-wall ${s&&s.kind==="wall"&&s.id===r.id?"selected":""}" d=${Xi(om(r))}
          data-hit="freewall" data-id=${r.id}></path>`)}`}_renderOpenings(t,e,n){let s=this._sel;return e.openings.map(r=>{let o=am(t,e,r);if(!o)return mt;let a=(u,f)=>[Bt(o.a,Zt(o.normal,u)),Bt(o.b,Zt(o.normal,u)),Bt(o.b,Zt(o.normal,f)),Bt(o.a,Zt(o.normal,f))],l=a(o.n0-n,o.n1+n),c=a(o.n0-6*n,o.n1+6*n),h=s&&s.kind==="opening"&&s.id===r.id,d;if(r.type==="door"){let u=Fa(oe(o.closed,o.hinge),oe(o.tip,o.hinge))>0?1:0;d=Wt`<line class="opening-line" x1=${o.hinge[0]} y1=${o.hinge[1]} x2=${o.tip[0]} y2=${o.tip[1]}></line>
          <path class="opening-arc" d="M${o.closed[0]} ${o.closed[1]}A${o.width} ${o.width} 0 0 ${u} ${o.tip[0]} ${o.tip[1]}"></path>`}else{let u=(o.n0+o.n1)/2,f=Bt(o.a,Zt(o.normal,u)),g=Bt(o.b,Zt(o.normal,u));d=Wt`<path class="window-pane" d=${Xi(a(o.n0,o.n1))}></path>
          <line class="opening-line" x1=${f[0]} y1=${f[1]} x2=${g[0]} y2=${g[1]}></line>`}return Wt`<g>
        <path class="opening-gap" d=${Xi(l)} pointer-events="none"></path>
        <g pointer-events="none">${d}</g>
        <path class="opening-hit ${h?"selected":""}" d=${Xi(c)} data-hit="opening" data-id=${r.id}></path>
      </g>`})}_renderFurniture(t,e){let n=this._sel;return t.furniture.map(s=>{let r=$a(s),o=n&&n.kind==="furniture"&&n.id===s.id,a=this._t(`furn_${s.type}`),l=10*e,c=Math.min(s.w,s.d)/e>22&&Math.max(s.w,s.d)/e>a.length*6;return Wt`<g>
        <path class="item ${lm(s)?"obstacle":""} ${o?"selected":""}" d=${Xi(r)} data-hit="furniture" data-id=${s.id}>
          <title>${a}</title>
        </path>
        ${c?Wt`<text class="label muted" x=${s.x} y=${s.z} font-size=${l} stroke-width=${2*e} text-anchor="middle" dominant-baseline="central">${a}</text>`:mt}
      </g>`})}_renderLabels(t,e){let n=[],s=12*e;for(let r of t.rooms){if(r.points.length<3)continue;let o=Zp(r.points);if(n.push(Wt`<text class="label" x=${o[0]} y=${o[1]} font-size=${s} stroke-width=${3*e} text-anchor="middle" font-weight="600">${r.name||r.id}</text>`),this._measure){n.push(Wt`<text class="label muted" x=${o[0]} y=${o[1]+s*1.3} font-size=${s*.9} stroke-width=${3*e} text-anchor="middle">${this._t("area_value",{v:this._n(su(r.points),2)})}</text>`);let a=mi(r.points);for(let l=0;l<r.points.length;l++){let[c,h]=de(r.points,l),d=Yt(c,h);if(d/e<36)continue;let u=Or(c,h,a),f=Bt(pi(c,h,.5),Zt(u,11*e));n.push(Wt`<text class="label dim" x=${f[0]} y=${f[1]} font-size=${10*e} stroke-width=${3*e} text-anchor="middle" dominant-baseline="central">${this._n(d,2)}</text>`)}}}if(this._measure)for(let r of t.walls){let o=Yt(r.a,r.b);if(o/e<36)continue;let a=pi(r.a,r.b,.5);n.push(Wt`<text class="label dim" x=${a[0]} y=${a[1]-(r.thickness/2+8*e)} font-size=${10*e} stroke-width=${3*e} text-anchor="middle">${this._n(o,2)}</text>`)}return n}_handle(t,e,n,s="",r=mt){return Wt`<g>
      <circle class="handle ${s}" cx=${t[0]} cy=${t[1]} r=${sM*e} pointer-events="none"></circle>
      ${r}
      <circle class="handle-hit" cx=${t[0]} cy=${t[1]} r=${Im*e} data-hit=${n.kind} data-id=${n.id} data-index=${n.index??mt}></circle>
    </g>`}_renderSelection(t,e,n){let s=this._sel,r=[],o=this._tool;if(this._hoverEdge&&(o==="wall"||o==="door"||o==="window")){let a=e.rooms.find(l=>l.id===this._hoverEdge.room_id);if(a){let[l,c]=de(a.points,this._hoverEdge.edge);r.push(Wt`<line class="edge-hover" x1=${l[0]} y1=${l[1]} x2=${c[0]} y2=${c[1]} pointer-events="none"></line>`)}}if(!s)return r;if(s.kind==="edge"){let a=e.rooms.find(l=>l.id===s.id);if(a){let[l,c]=de(a.points,s.index);r.push(Wt`<line class="edge-selected" x1=${l[0]} y1=${l[1]} x2=${c[0]} y2=${c[1]} pointer-events="none"></line>`)}}if((s.kind==="room"||s.kind==="corner")&&o==="select"){let a=e.rooms.find(l=>l.id===s.id);if(a){for(let l=0;l<a.points.length;l++){let[c,h]=de(a.points,l);if(Yt(c,h)/n<44)continue;let d=pi(c,h,.5),u=3*n,f=Wt`<path class="handle-plus" d="M${d[0]-u} ${d[1]}H${d[0]+u}M${d[0]} ${d[1]-u}V${d[1]+u}"></path>`;r.push(this._handle(d,n,{kind:"mid",id:a.id,index:l},"add",f))}a.points.forEach((l,c)=>{let h=s.kind==="corner"&&s.index===c;r.push(this._handle(l,n,{kind:"corner",id:a.id,index:c},h?"active":""))})}}if(s.kind==="furniture"&&(o==="select"||o==="furniture")){let a=e.furniture.find(l=>l.id===s.id);if(a){let l=[a.x,a.z],c=Bt(l,Fs([0,-a.d/2],a.rotation||0)),h=Bt(l,Fs([0,-a.d/2-24*n],a.rotation||0));r.push(Wt`<line class="rot-line" x1=${c[0]} y1=${c[1]} x2=${h[0]} y2=${h[1]} pointer-events="none"></line>`),r.push(this._handle(h,n,{kind:"rot",id:a.id},"",Wt`<title>${this._t("rotate_handle")}</title>`))}}if(s.kind==="wall"&&(o==="select"||o==="freewall")){let a=e.walls.find(l=>l.id===s.id);a&&(r.push(this._handle(a.a,n,{kind:"wallend",id:a.id,index:0})),r.push(this._handle(a.b,n,{kind:"wallend",id:a.id,index:1})))}return r}_renderPreview(t){let e=[],n=this._hover;if(n&&n.kind!=="grid"&&n.kind!=="none"){let r=7*t,o=n.point;e.push(n.kind==="vertex"?Wt`<rect class="snap-mark" x=${o[0]-r} y=${o[1]-r} width=${2*r} height=${2*r}></rect>`:Wt`<path class="snap-mark" d="M${o[0]} ${o[1]-r}L${o[0]+r} ${o[1]}L${o[0]} ${o[1]+r}L${o[0]-r} ${o[1]}Z"></path>`)}if(this._tool==="room"&&this._draw.length){let r=this._draw,o=n?n.point:null,a=o?[...r,o]:r;if(e.push(Wt`<path class="draft-line" d=${"M"+a.map(l=>`${l[0]} ${l[1]}`).join("L")} pointer-events="none"></path>`),r.forEach((l,c)=>e.push(Wt`<circle class="draft-point" cx=${l[0]} cy=${l[1]} r=${(c===0?6:4)*t} pointer-events="none"></circle>`)),o){let l=r[r.length-1],c=pi(l,o,.5);e.push(Wt`<text class="label dim" x=${c[0]} y=${c[1]-8*t} font-size=${11*t} stroke-width=${3*t} text-anchor="middle">${this._t("length_value",{v:this._n(Yt(l,o),2)})}</text>`)}}if(this._tool==="freewall"&&this._wallStart){let r=this._wallStart;if(e.push(Wt`<circle class="draft-point" cx=${r[0]} cy=${r[1]} r=${4*t} pointer-events="none"></circle>`),n){let o=n.point;e.push(Wt`<path class="draft-line" d="M${r[0]} ${r[1]}L${o[0]} ${o[1]}" pointer-events="none"></path>`);let a=pi(r,o,.5);e.push(Wt`<text class="label dim" x=${a[0]} y=${a[1]-8*t} font-size=${11*t} stroke-width=${3*t} text-anchor="middle">${this._t("length_value",{v:this._n(Yt(r,o),2)})}</text>`)}}let s=this._calib;return s&&s.p1&&(e.push(Wt`<circle class="calib-point" cx=${s.p1[0]} cy=${s.p1[1]} r=${5*t} pointer-events="none"></circle>`),s.p2&&(e.push(Wt`<line class="calib-line" x1=${s.p1[0]} y1=${s.p1[1]} x2=${s.p2[0]} y2=${s.p2[1]} pointer-events="none"></line>`),e.push(Wt`<circle class="calib-point" cx=${s.p2[0]} cy=${s.p2[1]} r=${5*t} pointer-events="none"></circle>`))),e}_hint(){switch(this._tool){case"room":return this._t("hint_room");case"wall":return this._t("hint_wall");case"door":return this._t("hint_door");case"window":return this._t("hint_window");case"freewall":return this._t(this._wallStart?"hint_freewall_second":"hint_freewall");case"furniture":return this._t("hint_furniture");case"background":return this._calib?this._t(this._calib.p1&&!this._calib.p2?"bg_calib_second":this._calib.p2?"bg_calib_length":"bg_calib_first"):this._t("hint_background");default:return this._t("hint_select")}}_renderPanel(t,e){if(!e)return Y`<p class="hint">${this._t("no_floor")}</p>`;let n=this._sel,s=[Y`<p class="hint">${this._hint()}</p>`];if(this._tool==="room"&&this._draw.length&&s.push(Y`<div class="actions">
        <button class="primary" ?disabled=${this._draw.length<3} @click=${()=>this._finishRoom()}>${me("check")}<span>${this._t("room_finish")}</span></button>
        <button @click=${()=>this._draw=this._draw.slice(0,-1)}>${this._t("room_undo_point")}</button>
        <button @click=${()=>this._draw=[]}>${this._t("cancel")}</button>
      </div>`),this._tool==="freewall"&&this._wallStart&&s.push(Y`<div class="actions"><button @click=${()=>this._wallStart=null}>${this._t("cancel")}</button></div>`),this._tool==="furniture"&&s.push(this._furnitureTypeSelect(this._t("furniture_new_type"),this._furnType,r=>this._furnType=r)),this._tool==="background")return s.push(this._renderBackgroundPanel(e)),s;if(!n)return this._tool==="select"&&s.push(this._renderFloorPanel(e)),s;switch(n.kind){case"room":case"corner":s.push(this._renderRoomPanel(e,n));break;case"edge":s.push(this._renderEdgePanel(t,e,n));break;case"opening":s.push(this._renderOpeningPanel(e,n));break;case"wall":s.push(this._renderFreeWallPanel(e,n));break;case"furniture":s.push(this._renderFurniturePanel(e,n));break;default:break}return s}_num(t,e,n,s={}){let{digits:r=2,allowEmpty:o=!1,min:a=null,max:l=null,placeholder:c=""}=s,h=e==null?"":this._n(e,r);return Y`<label class="field"
      ><span>${t}</span>
      <input
        type="text"
        inputmode="decimal"
        autocomplete="off"
        .value=${be(h)}
        placeholder=${c}
        @keydown=${d=>d.key==="Enter"&&d.target.blur()}
        @change=${d=>{let u=ka(d.target.value);u===null&&o?n(null):u!==null&&Number.isFinite(u)&&(a==null||u>=a)&&(l==null||u<=l)&&n(u),d.target.value=h,this.requestUpdate()}}
    /></label>`}_text(t,e,n,s=""){return Y`<label class="field"
      ><span>${t}</span>
      <input
        type="text"
        autocomplete="off"
        spellcheck="false"
        .value=${be(e||"")}
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
        ${Object.entries(qa).map(([s,r])=>Y`<optgroup label=${this._t(`group_${s}`)}>
            ${r.map(o=>Y`<option value=${o} ?selected=${o===e}>${this._t(`furn_${o}`)}</option>`)}
          </optgroup>`)}
      </select></label
    >`}_renderFloorPanel(t){let e=t.id,n=this.floors||[],s=r=>this._commit(um(this._plan,e,r));return Y`<h3>${this._t("floor_settings")}</h3>
      ${this._text(this._t("floor_name"),t.name,r=>s({name:r||t.id}))}
      ${this._select(this._t("floor_ha"),t.ha_floor||"",[{value:"",label:this._t("none")},...n.map(r=>({value:r.floor_id,label:r.name||r.floor_id}))],r=>{let o={ha_floor:r||null},a=n.find(c=>c.floor_id===r),l=!t.name||t.name===t.id||/^(Floor|Etage) \d+$/.test(t.name);a&&l&&(o.name=a.name),s(o)})}
      <div class="row">
        ${this._num(this._t("floor_height"),t.height??$s,r=>s({height:Lt(r)}),{min:1,max:20})}
        ${this._num(this._t("floor_elevation"),t.elevation??0,r=>s({elevation:Lt(r)}),{min:-50,max:500})}
      </div>
      ${this._confirmDelete?Y`<p class="hint">${this._t("floor_delete_confirm")}</p>
            <div class="actions">
              <button class="danger" @click=${()=>this._deleteFloor()}>${me("trash")}<span>${this._t("delete")}</span></button>
              <button @click=${()=>this._confirmDelete=!1}>${this._t("keep")}</button>
            </div>`:Y`<div class="actions">
            <button class="danger" @click=${()=>this._confirmDelete=!0}>${me("trash")}<span>${this._t("floor_delete")}</span></button>
          </div>`}`}_renderRoomPanel(t,e){let n=t.id,s=Le(t,e.id);if(!s)return mt;let r=this.areas||[],o=l=>this._commit(pm(this._plan,n,s.id,l)),a=e.kind==="corner"?s.points[e.index]:null;return Y`<h3>${this._t("room")}</h3>
      ${this._text(this._t("room_name"),s.name,l=>o({name:l||s.id}))}
      ${this._select(this._t("room_area_ha"),s.area_id||"",[{value:"",label:this._t("none")},...r.map(l=>({value:l.area_id,label:l.name||l.area_id}))],l=>{let c={area_id:l||null},h=r.find(u=>u.area_id===l),d=!s.name||s.name===s.id||/^(Room|Raum) \d+$/.test(s.name);h&&d&&(c.name=h.name),o(c)})}
      ${this._num(this._t("room_ceiling"),s.ceiling_height??null,l=>o({ceiling_height:l==null?null:Lt(l)}),{allowEmpty:!0,min:1,max:20,placeholder:this._n(t.height??$s,2)})}
      <div class="field">
        <span>${this._t("room_size")}</span>
        <span class="value">${this._t("area_value",{v:this._n(su(s.points),2)})}</span>
      </div>
      ${a?Y`<h3>${this._t("corner",{n:e.index+1})}</h3>
            <div class="row">
              ${this._num(this._t("pos_x"),a[0],l=>this._commit(Fr(this._plan,n,s.id,e.index,[l,a[1]])),{digits:3})}
              ${this._num(this._t("pos_z"),a[1],l=>this._commit(Fr(this._plan,n,s.id,e.index,[a[0],l])),{digits:3})}
            </div>
            <div class="actions">
              <button ?disabled=${s.points.length<=3} @click=${()=>this._deleteSelection()}>${me("trash")}<span>${this._t("corner_delete")}</span></button>
            </div>
            ${s.points.length<=3?Y`<p class="hint">${this._t("corner_min")}</p>`:mt}`:mt}
      <div class="actions">
        <button class="danger" @click=${()=>this._commit(mu(this._plan,n,s.id),null)}>${me("trash")}<span>${this._t("room_delete")}</span></button>
      </div>`}_renderEdgePanel(t,e,n){let s=e.id,r=Le(e,n.id),o=r&&uu(t,e,r.id,n.index);if(!o)return mt;let a=o.neighbours.map(h=>(Le(e,h)||{}).name||h).join(", "),l={wall_exterior:.24,wall_interior:.12,...t.settings||{}},c=o.shared?l.wall_interior:l.wall_exterior;return Y`<h3>${this._t("wall")} · ${r.name||r.id}</h3>
      <div class="field">
        <span>${this._t("wall_length")}</span><span class="value">${this._t("length_value",{v:this._n(o.length,2)})}</span>
      </div>
      <p class="hint">${o.shared?this._t("wall_interior",{rooms:a}):this._t("wall_exterior")}</p>
      ${o.partial.length?Y`<p class="hint">${this._t("wall_partial",{rooms:o.partial.map(h=>(Le(e,h)||{}).name||h).join(", ")})}</p>`:mt}
      ${this._num(this._t("wall_thickness"),o.thickness,h=>this._commit(xu(this._plan,s,r.id,n.index,h)),{digits:3,min:.01,max:2,allowEmpty:!0})}
      <div class="actions">
        <button ?disabled=${o.stored==null} @click=${()=>this._commit(xu(this._plan,s,r.id,n.index,null))}>
          ${this._t("wall_reset")}
        </button>
        <span class="hint">${this._t("wall_default",{v:this._n(c,3)})}</span>
      </div>
      <label class="check">
        <input type="checkbox" .checked=${be(o.noWall)} @change=${h=>this._commit(xm(this._plan,s,r.id,n.index,h.target.checked))} />
        <span>${this._t("wall_none")}</span>
      </label>`}_renderOpeningPanel(t,e){let n=t.id,s=t.openings.find(l=>l.id===e.id);if(!s)return mt;let r=Le(t,s.room_id),o=l=>this._commit(Ka(this._plan,n,s.id,l)),a=s.type==="door";return Y`<h3>${this._t(a?"opening_door":"opening_window")}</h3>
      ${this._select(this._t("opening_type"),s.type,[{value:"door",label:this._t("opening_door")},{value:"window",label:this._t("opening_window")}],l=>o({type:l,...Ya[l],width:s.width,hinge:s.hinge,swing:s.swing}))}
      <div class="field">
        <span>${this._t("opening_room")}</span><span>${r?r.name||r.id:s.room_id}</span>
      </div>
      <div class="row">
        ${this._num(this._t("width"),s.width,l=>o({width:Lt(l)}),{min:.2,max:10})}
        ${this._num(this._t("opening_offset"),s.offset,l=>o({offset:Lt(l)}),{min:0})}
        ${this._num(this._t("height"),s.height,l=>o({height:Lt(l)}),{min:.1,max:10})}
        ${this._num(this._t("sill"),s.sill??0,l=>o({sill:Lt(l)}),{min:0,max:10})}
      </div>
      ${a?Y`<div class="row">
              ${this._select(this._t("hinge"),s.hinge||"left",[{value:"left",label:this._t("hinge_left")},{value:"right",label:this._t("hinge_right")}],l=>o({hinge:l}))}
              ${this._select(this._t("swing"),s.swing||"in",[{value:"in",label:this._t("swing_in")},{value:"out",label:this._t("swing_out")}],l=>o({swing:l}))}
            </div>
            ${this._text(this._t("contact"),s.contact,l=>o({contact:l||null}),"binary_sensor.")}
            <p class="hint">${this._t("contact_hint")}</p>`:mt}
      <div class="actions">
        <button class="danger" @click=${()=>this._commit(vu(this._plan,n,s.id),null)}>${me("trash")}<span>${this._t("opening_delete")}</span></button>
      </div>`}_renderFreeWallPanel(t,e){let n=t.id,s=t.walls.find(o=>o.id===e.id);if(!s)return mt;let r=o=>this._commit(Ja(this._plan,n,s.id,o));return Y`<h3>${this._t("freewall")}</h3>
      <div class="field">
        <span>${this._t("wall_length")}</span><span class="value">${this._t("length_value",{v:this._n(Yt(s.a,s.b),2)})}</span>
      </div>
      <div class="row">
        ${this._num(this._t("thickness"),s.thickness,o=>r({thickness:Lt(o)}),{digits:3,min:.01,max:5})}
        ${this._num(this._t("freewall_height"),s.height??null,o=>r({height:o==null?null:Lt(o)}),{allowEmpty:!0,min:.05,max:20,placeholder:this._n(t.height??$s,2)})}
      </div>
      <div class="actions">
        <button class="danger" @click=${()=>this._commit(bu(this._plan,n,s.id),null)}>${me("trash")}<span>${this._t("freewall_delete")}</span></button>
      </div>`}_renderFurniturePanel(t,e){let n=t.id,s=t.furniture.find(o=>o.id===e.id);if(!s)return mt;let r=o=>this._commit(zr(this._plan,n,s.id,o));return Y`<h3>${this._t("furniture")}</h3>
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
          ${me("rotateLeft")}
        </button>
        <button title=${this._t("rotate_right")} aria-label=${this._t("rotate_right")} @click=${()=>r({rotation:(s.rotation||0)+90})}>
          ${me("rotateRight")}
        </button>
        <button class="danger" @click=${()=>this._commit(wu(this._plan,n,s.id),null)}>${me("trash")}<span>${this._t("furniture_delete")}</span></button>
      </div>`}_renderBackgroundPanel(t){let e=t.id,n=t.background,s=Y`<label class="file">
      ${me("upload")}<span>${this._t(n?"bg_replace":"bg_upload")}</span>
      <input class="visually-hidden" type="file" accept="image/*" @change=${c=>this._onUpload(c)} />
    </label>`,r=this._bgError?Y`<p class="hint" role="alert">${this._t("bg_error")}</p>`:mt;if(!n)return Y`<p class="hint">${this._t("bg_none")}</p><div class="actions">${s}</div>${r}`;let o=c=>this._commit(Vr(this._plan,e,c)),a=this._calib,l;if(!a)l=Y`<button @click=${()=>this._calib={p1:null,p2:null,length:""}}>${me("ruler")}<span>${this._t("bg_calibrate")}</span></button>`;else if(a.p1&&a.p2){let c=Yt(a.p1,a.p2);l=Y`<p class="hint">${this._t("bg_calib_measured",{v:this._n(c,2)})}</p>
        <label class="field"
          ><span>${this._t("bg_calib_length")}</span>
          <input
            type="text"
            inputmode="decimal"
            autocomplete="off"
            .value=${be(a.length)}
            @input=${h=>this._calib={...this._calib,length:h.target.value}}
            @keydown=${h=>h.key==="Enter"&&this._applyCalibration()}
        /></label>
        <div class="actions">
          <button class="primary" ?disabled=${!(ka(a.length)>0)} @click=${()=>this._applyCalibration()}>${this._t("bg_calib_apply")}</button>
          <button @click=${()=>this._calib=null}>${this._t("cancel")}</button>
        </div>`}else l=Y`<div class="actions"><button @click=${()=>this._calib=null}>${this._t("cancel")}</button></div>`;return Y`<p class="hint">${this._t("bg_move_hint")}</p>
      <label class="field"
        ><span>${this._t("bg_opacity")} · ${Math.round((n.opacity??.5)*100)} %</span>
        <input
          type="range"
          min="0.05"
          max="1"
          step="0.05"
          .value=${be(String(n.opacity??.5))}
          @input=${c=>this._draft=Vr(this._plan,e,{opacity:Number(c.target.value)})}
          @change=${c=>o({opacity:Number(c.target.value)})}
      /></label>
      <div class="row">
        ${this._num(this._t("bg_width"),n.width,c=>o({width:Lt(c)}),{digits:3,min:.1,max:1e3})}
        ${this._num(this._t("bg_rotation"),n.rotation||0,c=>o({rotation:c}),{digits:1})}
        ${this._num(this._t("pos_x"),n.x||0,c=>o({x:Lt(c)}),{digits:3})}
        ${this._num(this._t("pos_z"),n.z||0,c=>o({z:Lt(c)}),{digits:3})}
      </div>
      ${l}
      <div class="actions">
        ${s}
        <button class="danger" @click=${()=>this._commit(Br(this._plan,e,null),null)}>${me("trash")}<span>${this._t("bg_remove")}</span></button>
      </div>
      ${r}`}_applyCalibration(){let t=this._calib,e=ka(t&&t.length),n=fe(this._plan,this._floor);if(!t||!t.p1||!t.p2||!(e>0)||!n.background)return;let s=Qp(n.background,t.p1,t.p2,e);this._calib=null,this._commit(Br(this._plan,this._floor,s),{kind:"background"})}};customElements.get("pp-editor")||customElements.define("pp-editor",el);var Gs=Math.PI/180;function Um(i,t){let e=!1;for(let n=0,s=t.length-1;n<t.length;s=n++){let[r,o]=t[n],[a,l]=t[s];o>i[1]!=l>i[1]&&i[0]<(a-r)*(i[1]-o)/(l-o)+r&&(e=!e)}return e}function Au(i,t,e){let n=(i&&i.rooms||[]).find(s=>Um([t,e],s.points));return n?n.id:null}function cM(i,t,e){let n=e[0]-t[0],s=e[1]-t[1],r=n*n+s*s;if(r<1e-12)return{d:Math.hypot(i[0]-t[0],i[1]-t[1]),t:0};let o=Math.max(0,Math.min(1,((i[0]-t[0])*n+(i[1]-t[1])*s)/r));return{d:Math.hypot(i[0]-t[0]-n*o,i[1]-t[1]-s*o),t:o}}function Nm(i,t,{maxDist:e=.4,inset:n=.03,endGap:s=.04}={}){let r=null;for(let o of i||[]){let a=o.b[0]-o.a[0],l=o.b[1]-o.a[1],c=Math.hypot(a,l);if(c<1e-6)continue;let h=((t[0]-o.a[0])*a+(t[1]-o.a[1])*l)/(c*c),d=Math.min(.5,s/c);h=Math.max(d,Math.min(1-d,h));let u=o.a[0]+a*h,f=o.a[1]+l*h,g=Math.hypot(t[0]-u,t[1]-f);if(!r||g<r.d){let _=o.n||[0,0];r={d:g,x:u+_[0]*n,z:f+_[1]*n,along:[h*c,(1-h)*c],phi:Om(Math.atan2(_[1],_[0])/Gs),room:o.room}}}return r&&r.d<=e?r:null}var Om=i=>(i%360+360)%360;function km(i,t,e,n,s=0){let r=Math.atan2(n-t,e-i)/Gs;return s&&(r=Math.round(r/s)*s),Om(Math.round(r*10)/10)}function Fm(i,t,e,n=8){let s=Math.max(.1,i.x1-i.x0),r=Math.max(.1,i.z1-i.z0),o=Math.max(1,Math.min((t-2*n)/s,(e-2*n)/r)),a=(t-s*o)/2-i.x0*o,l=(e-r*o)/2-i.z0*o;return{scale:o,ox:a,oy:l,sx:c=>c*o+a,sz:c=>c*o+l,wx:c=>(c-a)/o,wz:c=>(c-l)/o}}var hM=.75;function Tu(i,t){let e=t.phi*Gs,n=Math.max(28,hM*i.scale);return[i.sx(t.x)+Math.cos(e)*n,i.sz(t.z)+Math.sin(e)*n]}function Ru(i,t,e,n,{handleR:s=12,dotR:r=15}={}){let o=[...t||[]].reverse();for(let a of o){if(a.mount==="ceiling")continue;let[l,c]=Tu(i,a);if(Math.hypot(e-l,n-c)<=s)return{entity_id:a.entity_id,mode:"rotate"}}for(let a of o)if(Math.hypot(e-i.sx(a.x),n-i.sz(a.z))<=r)return{entity_id:a.entity_id,mode:"move"};return null}function zm(i,t=24){let e=i.reach||0;if(i.mount==="ceiling"){let o=Math.min(89,(i.fov_h||120)/2)*Gs,a=Math.min(e,Math.max(.2,(i.height||2.5)*Math.tan(o))),l=[];for(let c=0;c<t*2;c++){let h=c/(t*2)*2*Math.PI;l.push([i.x+Math.cos(h)*a,i.z+Math.sin(h)*a])}return l}let n=e*Math.cos(Math.min(80,i.tilt||0)*Gs),s=Math.min(180,(i.fov_h||120)/2),r=s>=180?[]:[[i.x,i.z]];for(let o=0;o<=t;o++){let a=(i.phi-s+2*s*o/t)*Gs;r.push([i.x+Math.cos(a)*n,i.z+Math.sin(a)*n])}return r}function nl(i,t=.2){let e=i.map(h=>h[0]),n=i.map(h=>h[1]),s=Math.min(...e),r=Math.max(...e),o=Math.min(...n),a=Math.max(...n),l=Math.max(t,Math.min(r-s,a-o)/40),c=null;for(let h=s+l/2;h<r;h+=l)for(let d=o+l/2;d<a;d+=l){if(!Um([h,d],i))continue;let u=1/0;for(let f=0;f<i.length;f++)u=Math.min(u,cM([h,d],i[f],i[(f+1)%i.length]).d);(!c||u>c.m)&&(c={x:h,z:d,m:u})}return c||{x:e.reduce((h,d)=>h+d,0)/e.length,z:n.reduce((h,d)=>h+d,0)/n.length,m:0}}function Bm(i){if(i&&i.bounds)return i.bounds;let t=(i&&i.rooms||[]).flatMap(s=>s.points);if(!t.length)return{x0:0,x1:1,z0:0,z1:1};let e=t.map(s=>s[0]),n=t.map(s=>s[1]);return{x0:Math.min(...e)-.4,x1:Math.max(...e)+.4,z0:Math.min(...n)-.4,z1:Math.max(...n)+.4}}function Cu(i,t,e){let n=Math.hypot(t[0]-i[0],t[1]-i[1])||1,s=-(t[1]-i[1])/n*e,r=(t[0]-i[0])/n*e;return[[i[0]+s,i[1]+r],[t[0]+s,t[1]+r],[t[0]-s,t[1]-r],[i[0]-s,i[1]-r]]}function Pu(i,t,e){return Au(i,t,e)!==null}var Iu={light:["#1f7a4d","#1f5f99","#8a4b9c","#c06a14","#56616b","#b23a6f","#2f7f8f","#7a6a12"],dark:["#43b37b","#5a9be0","#c08bd2","#eb9a45","#9aa6b1","#e07aa8","#5cc3d3","#d4c04a"]};function Vm(i,t){let e=Iu[t?"dark":"light"],n={};return(i||[]).forEach((s,r)=>{n[s.entity_id]=e[r%e.length]}),n}function Lu(i,t){let e=String(i||"").trim(),n=e.match(/^#([0-9a-f]{3})$/i);if(n){let[s,r,o]=n[1].split("").map(a=>parseInt(a+a,16));return`rgba(${s},${r},${o},${t})`}if(n=e.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i),n){let s=parseInt(n[1],16);return`rgba(${s>>16&255},${s>>8&255},${s&255},${t})`}return n=e.match(/^rgba?\(([^)]+)\)$/i),n?`rgba(${n[1].split(/[\s,/]+/).filter(Boolean).slice(0,3).join(",")},${t})`:e}var Ws=[.5,.9,1.3],uM=["occupancy","presence","motion"],rl=["wall","corner","ceiling"],$m=["open","closed","live"],Hm=["2d","3d","split"],ol=90,Du=.15,Gr={height:[.2,4,2],tilt:[0,90,0],phi:[0,359,0],fov_h:[10,360,0],fov_v:[10,180,0],reach:[.5,15,1],x:[-1e3,1e3,3],z:[-1e3,1e3,3]},il={wall:{height:1.9,tilt:10},corner:{height:1.9,tilt:10},ceiling:{height:2.5,tilt:90}},qi=(i,t)=>{let e=10**t;return Math.round(i*e)/e},dM=(i,t,e)=>Math.min(e,Math.max(t,i)),sl=i=>(Math.round(+i||0)%360+360)%360;function Gm(i,t){if(i==="phi")return Number.isFinite(+t)?sl(t):void 0;let e=Gr[i];if(!e)return t;let n=+t;if(!(t===""||t===null||!Number.isFinite(n)))return qi(dM(n,e[0],e[1]),e[2])}function Wr(i){return i?Array.isArray(i)?i:Array.isArray(i.profiles)?i.profiles:Object.entries(i).filter(([,t])=>t&&typeof t=="object"&&t.name).map(([t,e])=>({id:t,...e})):[]}function Xr(i){let t=Wr(i);return{version:1,default_fov_v:i&&!Array.isArray(i)&&i.default_fov_v?i.default_fov_v:ol,profiles:t}}function Xs(i,t){let e=Wr(i);return e.find(n=>n.id===t)||e.find(n=>n.id==="custom")||null}function Uu(i,t,e=ol){return i?t==="ceiling"&&i.ceiling?{fov_h:i.ceiling.fov,fov_v:i.ceiling.fov,reach:i.ceiling.reach}:{fov_h:i.fov_h,fov_v:i.fov_v==null?e:i.fov_v,reach:i.reach}:{fov_h:120,fov_v:e,reach:6}}function Wm(){return{loading:!0,error:null,revision:null,plan:null,editPlan:null,planDirty:!1,savedSensors:[],sensors:[],profiles:null,options:{},deviceProfiles:{},floorId:null,selected:null,dirty:!1,remoteChanged:!1,height:1.3,doorsMode:"open",thinDb:10,weight:1,snap:!0,cones:!0,view:"split",tab:"planner"}}var Hr=i=>i===void 0?i:JSON.parse(JSON.stringify(i));function Xm(i,t){let e=t.plan||null,n=e&&e.floors||[],s=n.some(l=>l.id===i.floorId)?i.floorId:n[0]?n[0].id:null,r=(t.sensors||[]).map(l=>({...l})),o=t.options||{},a=r.some(l=>l.entity_id===i.selected)?i.selected:(r.find(l=>l.floor_id===s)||{}).entity_id||null;return{...i,loading:!1,error:null,revision:t.revision===void 0?null:t.revision,plan:e,editPlan:Hr(e),planDirty:!1,savedSensors:Hr(r),sensors:r,profiles:t.profiles||i.profiles,options:o,floorId:s,selected:a,dirty:!1,remoteChanged:!1,thinDb:typeof o.thin_db=="number"&&!i.thinTouched?o.thin_db:i.thinDb}}function qm(i,t){return t!==void 0&&t===i.revision?{state:i,reload:!1}:i.dirty||i.planDirty?{state:{...i,remoteChanged:!0},reload:!1}:{state:i,reload:!0}}var qs=i=>(i.editPlan&&i.editPlan.floors||[]).find(t=>t.id===i.floorId)||null,vn=i=>i.sensors.filter(t=>t.floor_id===i.floorId),_i=(i,t)=>i.sensors.find(e=>e.entity_id===t)||null;function qr(i,t,e){let n=!1,s=i.sensors.map(r=>{if(r.entity_id!==t)return r;let o={...r};for(let[a,l]of Object.entries(e)){let c=a in Gr?Gm(a,l):l;c!==void 0&&o[a]!==c&&(o[a]=c,n=!0)}return o});return n?{...i,sensors:s,dirty:!0}:i}function Ym(i,t,e){let n=_i(i,t),s=Xs(i.profiles,e);if(!n||!s)return i;let r=s.mounts&&s.mounts.length&&!s.mounts.includes(n.mount)?s.mounts[0]:n.mount,o=Xr(i.profiles).default_fov_v;return qr(i,t,{profile:s.id,mount:r,...Uu(s,r,o)})}function Zm(i,t,e,n){let s=_i(i,t);if(!s||!rl.includes(e))return i;let r=Xs(i.profiles,s.profile),o=Xr(i.profiles).default_fov_v,a=e==="ceiling"?{height:n||il.ceiling.height,tilt:90}:s.mount==="ceiling"?{...il[e]}:{},l=e==="ceiling"!=(s.mount==="ceiling")?Uu(r,e,o):{};return qr(i,t,{mount:e,...a,...l})}function Km(i,{floorId:t,x:e,z:n,profileId:s,profiles:r,phi:o=0}){let a=Xs(r,s),l=a&&a.mounts&&a.mounts.length?a.mounts[0]:"wall";return{entity_id:i,floor_id:t,x:qi(e,3),z:qi(n,3),height:il[l].height,phi:sl(o),tilt:il[l].tilt,mount:l,profile:a?a.id:"custom",...Uu(a,l,Xr(r).default_fov_v),active:!0}}function Jm(i,t){return _i(i,t.entity_id)?i:{...i,sensors:[...i.sensors,t],selected:t.entity_id,dirty:!0}}function jm(i,t){if(!_i(i,t))return i;let e=i.sensors.filter(s=>s.entity_id!==t),n=i.selected===t?(e.find(s=>s.floor_id===i.floorId)||{}).entity_id||null:i.selected;return{...i,sensors:e,selected:n,dirty:!0}}function Qm(i){let t=Hr(i.savedSensors),e=Hr(i.plan),n=e?.floors||[],s=n.some(o=>o.id===i.floorId)?i.floorId:n[0]?.id||null,r=t.some(o=>o.entity_id===i.selected&&o.floor_id===s)?i.selected:null;return{...i,sensors:t,floorId:s,editPlan:e,dirty:!1,planDirty:!1,selected:r}}function tg(i,t){return{...i,editPlan:t,planDirty:!0}}function eg(i,t){return{...i,savedSensors:Hr(i.sensors),dirty:!1,revision:t===void 0?i.revision:t}}function ng(i){return i.sensors.map(t=>{let e={...t};for(let n of Object.keys(Gr))typeof e[n]=="number"&&(e[n]=Gm(n,e[n]));return delete e.fov_v_assumed,e})}function fM(i,t,e){if(i!=="live")return i==="closed"?"closed":"open";let n={};for(let s of t&&t.openings||[]){if(s.type==="window")continue;let r=s.contact&&e?e[s.contact]:null,o=r&&(r.state==="on"||r.state==="off");n[s.id]=o?r.state==="on"!=!!s.contact_invert:!0}return n}function al(i,t,{fast:e=!1,grid:n=!0}={}){return{heights:e?[i.height]:Ws.slice(),doors:fM(i.doorsMode,qs(i),t),thin_db:i.thinDb,cell:e?.2:.1,grid:n}}function ll(i,t){let e=new Set((t||[]).map(n=>typeof n=="string"?n:n.entity_id));return Object.entries(i||{}).filter(([n,s])=>n.startsWith("binary_sensor.")&&!e.has(n)&&s&&s.attributes&&uM.includes(s.attributes.device_class)).map(([n,s])=>({entity_id:n,name:s.attributes.friendly_name||n})).sort((n,s)=>n.name.localeCompare(s.name))}function ig(i,t,e=!1){if(!i)return null;let n=e?.01:.05,s=e?1:5;switch(t){case"ArrowLeft":return{x:qi(i.x-n,3)};case"ArrowRight":return{x:qi(i.x+n,3)};case"ArrowUp":return{z:qi(i.z-n,3)};case"ArrowDown":return{z:qi(i.z+n,3)};case"q":case"Q":return{phi:sl(i.phi-s)};case"e":case"E":return{phi:sl(i.phi+s)};default:return null}}function sg(i,t,e){return!e||!vn(i).some(n=>n.entity_id===t)?i:qr(i,t,{x:e.x,z:e.z,height:e.height,phi:e.phi,tilt:e.tilt,mount:e.mount||"wall"})}var xi=i=>[i.editPlan,i.floorId,i.revision,i.sensors,i.profiles,i.thinDb,i.doorsMode,i.weight],Ys=(i,t)=>!!i&&!!t&&i.length===t.length&&i.every((e,n)=>e===t[n]);function rg(i,t){if(!(i.editPlan?.floors||[]).some(n=>n.id===t))return i;let e=i.sensors.find(n=>n.floor_id===t)?.entity_id||null;return{...i,floorId:t,selected:e}}function cl(i,t,e){let n=vn(i),s=n.find(o=>o.entity_id===i.selected);if(s&&e(s)===t)return s.entity_id;let r=n.find(o=>e(o)===t);return r?r.entity_id:s?s.entity_id:null}var Nu=class extends Ye{static properties={model:{attribute:!1},sensors:{attribute:!1},evaluation:{attribute:!1},colors:{attribute:!1},names:{attribute:!1},height:{type:Number},cell:{type:Number},selected:{type:String},dark:{type:Boolean},cones:{type:Boolean},snap:{type:Boolean},readonly:{type:Boolean},t:{attribute:!1}};static styles=Pn`
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
    </div>`}firstUpdated(){this._canvas=this.renderRoot.querySelector("canvas"),this._ro=new ResizeObserver(()=>this._resize()),this._ro.observe(this.renderRoot.querySelector(".wrap")),this._resize()}disconnectedCallback(){super.disconnectedCallback(),this._ro&&this._ro.disconnect(),cancelAnimationFrame(this._raf)}connectedCallback(){super.connectedCallback(),this._ro&&this.renderRoot.querySelector(".wrap")&&this._ro.observe(this.renderRoot.querySelector(".wrap"))}updated(){this._schedule()}_schedule(){cancelAnimationFrame(this._raf),this._raf=requestAnimationFrame(()=>this._draw())}_resize(){let t=this.renderRoot.querySelector(".wrap");if(!t||!this._canvas)return;let e=Math.max(200,t.clientWidth),n=Math.max(200,t.clientHeight),s=window.devicePixelRatio||1;e===this._w&&n===this._h&&s===this._dpr||(this._w=e,this._h=n,this._dpr=s,this._canvas.width=Math.round(e*s),this._canvas.height=Math.round(n*s),this._draw())}get _vp(){return Fm(Bm(this.model),this._w,this._h,12)}_palette(){let t=getComputedStyle(this),e=(n,s)=>(t.getPropertyValue(n)||"").trim()||s;return{ink:e("--primary-text-color",this.dark?"#e1e1e1":"#212121"),muted:e("--secondary-text-color",this.dark?"#9b9b9b":"#727272"),floor:e("--card-background-color",this.dark?"#1c1c1c":"#ffffff"),line:e("--divider-color",this.dark?"#3a3a3a":"#cccccc"),spill:e("--error-color","#db4437"),accent:e("--primary-color","#03a9f4"),glass:this.dark?"#62a9ee":"#3b86cf"}}_rgba(t,e){let n=Lu(t,e);if(n.startsWith("rgba"))return n;let s=this._cc||(this._cc=document.createElement("canvas").getContext("2d"));return s.fillStyle="#000",s.fillStyle=t,Lu(s.fillStyle,e)}_path(t,e,n){t.beginPath(),n.forEach((s,r)=>r?t.lineTo(e.sx(s[0]),e.sz(s[1])):t.moveTo(e.sx(s[0]),e.sz(s[1]))),t.closePath()}_poly(t,e,n,s,r,o=1){this._path(t,e,n),s&&(t.fillStyle=s,t.fill()),r&&(t.strokeStyle=r,t.lineWidth=o,t.stroke())}_roomLabels(){if(this._labelModel!==this.model){this._labelModel=this.model,this._labels={};for(let t of this.model&&this.model.rooms||[])this._labels[t.id]=nl(t.points)}return this._labels}_draw(){let t=this._canvas&&this._canvas.getContext("2d");if(!t||!this._w)return;let e=this._palette();t.setTransform(this._dpr,0,0,this._dpr,0,0),t.clearRect(0,0,this._w,this._h);let n=this.model;if(!n)return;let s=this._vp,r=s.scale;for(let u of n.rooms||[])this._poly(t,s,u.points,this._rgba(e.ink,.03));let o=this.evaluation&&this.evaluation.grid?this.evaluation.grid[String(this.height)]:null;if(o){let u=(this.cell||.1)/2;for(let f of o){let g=f.own>0&&f.own_sensor,_=f.spill&&f.spill.length;if(!g&&!_)continue;let m=Math.round(s.sx(f.x-u)),p=Math.round(s.sz(f.z-u)),y=Math.round(s.sx(f.x+u))-m,v=Math.round(s.sz(f.z+u))-p;g&&(t.fillStyle=this._rgba(this.colors[f.own_sensor]||e.accent,.14+.22*f.own),t.fillRect(m,p,y,v)),_&&(t.fillStyle=this._rgba(e.spill,.5),t.fillRect(m,p,y,v))}}for(let u of n.furniture||[])this._poly(t,s,u.poly,this._rgba(e.line,u.obstacle?.75:.45),this._rgba(e.muted,.6),.7);for(let u of n.bands||[])this._poly(t,s,u,e.ink);for(let u of n.freeWalls||[])this._poly(t,s,u.poly,this._rgba(e.ink,u.block?.65:.3));let a=[...(n.doors||[]).filter(u=>u.a&&u.b).map(u=>[Cu(u.a,u.b,.45),e.floor,null]),...(n.windows||[]).filter(u=>u.a&&u.b).map(u=>[Cu(u.a,u.b,.45),e.floor,this._rgba(e.glass,.45)])];if(a.length)for(let u of n.bands||[]){t.save(),this._path(t,s,u),t.clip();for(let[f,g,_]of a)this._poly(t,s,f,g),_&&this._poly(t,s,f,_);t.restore()}t.strokeStyle=e.glass,t.lineWidth=2;for(let u of n.windows||[])t.beginPath(),t.moveTo(s.sx(u.a[0]),s.sz(u.a[1])),t.lineTo(s.sx(u.b[0]),s.sz(u.b[1])),t.stroke();t.lineWidth=1.3;for(let u of n.doors||[])if(!(!u.hinge||!u.tip)&&(t.strokeStyle=e.muted,t.beginPath(),t.moveTo(s.sx(u.hinge[0]),s.sz(u.hinge[1])),t.lineTo(s.sx(u.tip[0]),s.sz(u.tip[1])),t.stroke(),u.other)){let f=Math.atan2(u.tip[1]-u.hinge[1],u.tip[0]-u.hinge[0]),_=(Math.atan2(u.other[1]-u.hinge[1],u.other[0]-u.hinge[0])-f+3*Math.PI)%(2*Math.PI)-Math.PI,m=(u.w||Math.hypot(u.tip[0]-u.hinge[0],u.tip[1]-u.hinge[1]))*r;t.setLineDash([3,3]),t.beginPath(),t.arc(s.sx(u.hinge[0]),s.sz(u.hinge[1]),m,f,f+_,_<0),t.stroke(),t.setLineDash([])}let l=this._roomLabels(),c=getComputedStyle(this).fontFamily||"Roboto, sans-serif";t.fillStyle=e.ink,t.font=`500 ${Math.max(11,Math.min(15,r*.26))}px ${c}`,t.textAlign="center",t.textBaseline="middle";for(let u of n.rooms||[]){let f=l[u.id];f&&t.fillText(String(u.name||u.id).toUpperCase(),s.sx(f.x),s.sz(f.z))}let h=12,d=this._h-12;if(t.strokeStyle=e.muted,t.lineWidth=2,t.beginPath(),t.moveTo(h,d),t.lineTo(h+r,d),t.stroke(),t.fillStyle=e.muted,t.font=`11px ${c}`,t.textAlign="left",t.textBaseline="alphabetic",t.fillText("1 m",h,d-5),(this.sensors||[]).forEach((u,f)=>{let g=u.active===!1?e.muted:this.colors[u.entity_id]||e.accent,_=s.sx(u.x),m=s.sz(u.z),p=u.entity_id===this.selected;if(this.cones&&u.active!==!1&&(this._path(t,s,zm(u)),t.strokeStyle=this._rgba(g,p?.95:.5),t.lineWidth=p?1.6:1,t.setLineDash([5,4]),t.stroke(),t.setLineDash([])),u.mount!=="ceiling"){let[y,v]=Tu(s,u);t.strokeStyle=g,t.lineWidth=3,t.beginPath(),t.moveTo(_,m),t.lineTo(y,v),t.stroke(),t.beginPath(),t.arc(y,v,p?7:5,0,2*Math.PI),t.fillStyle=e.floor,t.fill(),t.strokeStyle=g,t.lineWidth=2,t.stroke()}t.beginPath(),t.arc(_,m,p?12:10,0,2*Math.PI),t.fillStyle=u.active===!1?e.floor:g,t.fill(),t.strokeStyle=p?e.accent:u.active===!1?g:e.floor,t.lineWidth=p?3:2,t.stroke(),t.fillStyle=u.active===!1?g:"#fff",t.font=`600 11px ${c}`,t.textAlign="center",t.textBaseline="middle",t.fillText(String(f+1),_,m+.5),t.textBaseline="alphabetic"}),this._drag&&this._drag.snapInfo){let u=(this.sensors||[]).find(f=>f.entity_id===this._drag.entity_id);if(u){let[f,g]=this._drag.snapInfo.along,_=this.t("map.snap_readout",{a:Math.round(f*100),b:Math.round(g*100)});t.font=`12px ${c}`,t.textAlign="left";let m=t.measureText(_).width,p=Math.max(4,Math.min(this._w-m-8,s.sx(u.x)+16)),y=Math.max(16,s.sz(u.z)-16);t.fillStyle=this._rgba(e.floor,.92),t.fillRect(p-4,y-13,m+8,18),t.fillStyle=e.ink,t.fillText(_,p,y)}}}_pos(t){let e=this._canvas.getBoundingClientRect();return[t.clientX-e.left,t.clientY-e.top]}_emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}_down(t){if(!this.model)return;let[e,n]=this._pos(t),s=Ru(this._vp,this.sensors,e,n);s&&(s.entity_id!==this.selected&&this._emit("select",{entity_id:s.entity_id}),!this.readonly&&(this._drag={...s,snapInfo:null,moved:!1},this._canvas.setPointerCapture(t.pointerId),this._canvas.focus({preventScroll:!0}),t.preventDefault()))}_move(t){if(!this.model)return;let[e,n]=this._pos(t),s=this._vp;if(!this._drag){this._canvas.style.cursor=Ru(s,this.sensors,e,n)?"grab":"default";return}let r=(this.sensors||[]).find(a=>a.entity_id===this._drag.entity_id);if(!r)return;let o;if(this._drag.mode==="rotate")o={phi:Math.round(km(r.x,r.z,s.wx(e),s.wz(n),t.shiftKey?0:5))%360};else{let a=[s.wx(e),s.wz(n)];if(this._drag.snapInfo=null,this.snap&&r.mount!=="ceiling"&&!t.altKey){let l=Nm(this.model.faces,a,{maxDist:.4});l&&(a=[l.x,l.z],this._drag.snapInfo=l)}if(!Pu(this.model,a[0],a[1]))return;o={x:Math.round(a[0]*1e3)/1e3,z:Math.round(a[1]*1e3)/1e3}}this._drag.moved=!0,this._drag.last=o,this._canvas.style.cursor="grabbing",this._emit("sensor-move",{entity_id:r.entity_id,patch:o,final:!1})}_up(){if(!this._drag)return;let t=this._drag;this._drag=null,this._canvas.style.cursor="default",t.moved&&this._emit("sensor-move",{entity_id:t.entity_id,patch:t.last||{},final:!0}),this._schedule()}_key(t){let e=this.sensors||[];if((t.key==="n"||t.key==="p"||t.key==="N"||t.key==="P")&&e.length){let a=e.findIndex(c=>c.entity_id===this.selected),l=t.key.toLowerCase()==="n"?1:-1;this._emit("select",{entity_id:e[(a+l+e.length)%e.length].entity_id}),t.preventDefault();return}if(this.readonly)return;let n=e.find(a=>a.entity_id===this.selected),s=ig(n,t.key,t.shiftKey);if(!s)return;t.preventDefault();let r=s.x===void 0?n.x:s.x,o=s.z===void 0?n.z:s.z;Pu(this.model,r,o)&&this._emit("sensor-move",{entity_id:n.entity_id,patch:s,final:!0})}};customElements.get("pp-map2d")||customElements.define("pp-map2d",Nu);var ag="presence_planner",Yi=class extends Error{constructor(t,e,n){super(e||t),this.name="PlannerError",this.code=t,this.i18nKey=n}},lg={unauthorized:"error.unauthorized",unknown_command:"error.not_loaded",not_loaded:"error.not_loaded",no_plan:"error.no_plan",not_found:"error.not_found",not_supported:"error.not_supported",invalid_format:"error.invalid_format",invalid_plan:"error.invalid_format",timeout:"error.timeout"};function vi(i){if(i instanceof Yi)return i;let t=i&&(i.code||i.error&&i.error.code)||"unknown",e=i&&(i.message||i.error&&i.error.message)||String(i),n=lg[t];return!n&&/unauthori[sz]ed|admin/i.test(e)?new Yi("unauthorized",e,lg.unauthorized):new Yi(t,e,n||"error.generic")}function pM(i){if(!i)return{};let t=i;!Array.isArray(t)&&typeof t=="object"&&(t=t.suggestions||t.devices||t.profiles||t);let e={};if(Array.isArray(t)){for(let n of t){if(!n||!n.entity_id)continue;let s=n.profile_id||n.profile||n.suggestion&&n.suggestion.id;s&&(e[n.entity_id]=typeof s=="object"?s.id:s)}return e}for(let[n,s]of Object.entries(t))s&&(e[n]=typeof s=="object"?s.profile_id||s.profile||s.id:s);return e}var hl=class{constructor(t){this.connection=t}async _call(t,e={}){if(!this.connection)throw new Yi("no_connection","No connection","error.generic");try{return await this.connection.sendMessagePromise({type:`${ag}/${t}`,...e})}catch(n){throw vi(n)}}get(){return this._call("get")}async subscribe(t){if(!this.connection)throw new Yi("no_connection","No connection","error.generic");try{return await this.connection.subscribeMessage(e=>t(e||{}),{type:`${ag}/subscribe`})}catch(e){throw vi(e)}}saveSensors(t){return this._call("save_sensors",{sensors:t})}savePlan(t){return this._call("save_plan",{plan:t})}exportPlan(){return this._call("export")}importPlan(t){return this._call("import",{data:t})}async deviceProfiles(){return pM(await this._call("device_profiles"))}};var ul={title:"Presence Planner","floor.select":"Floor","floor.default_name":"Ground floor","action.save":"Save","action.reset":"Reset","action.export":"Export","action.import":"Import","action.reload":"Reload","action.cancel":"Cancel","status.loading":"Loading plan\u2026","status.saving":"Saving\u2026","status.saved":"Saved.","status.exported":"Export downloaded.","status.imported":"Plan imported.","status.revision":"Revision {revision}","status.sensors":"{count} sensors on this floor","status.unsaved":"unsaved changes","banner.remote_changed":"The plan or the sensors were changed elsewhere. Reload to see the new version; your unsaved changes will be lost.","banner.read_only":"You can look at the plan, but saving needs an administrator account.","error.generic":"Something went wrong: {detail}","error.unauthorized":"Not allowed. Saving and importing need an administrator account in Home Assistant.","error.not_loaded":"The Presence Planner integration is not loaded. Add it under Settings > Devices & services.","error.not_found":"Not found: {detail}","error.not_supported":"Not possible with the current plan source: {detail}","error.invalid_format":"The file is not in a supported format: {detail}","error.invalid_json":"The file is not valid JSON.","error.timeout":"Home Assistant did not answer in time.","error.no_plan":"There is no plan to export yet.","error.model":"The plan could not be calculated: {detail}","empty.no_plan":"There is no floor plan yet. Import a NeonPlan export or draw your own plan.","empty.start_editor":"Draw a plan","empty.no_floor":"This floor has no rooms yet.","import.confirm":"Importing replaces your own plan. Continue?","tabs.label":"Views","tabs.planner":"Planner","tabs.editor":"Editor","stage.label":"Floor plan","view.label":"Display","view.2d":"2D","view.3d":"3D","view.split":"Split","height.label":"Height for the coverage map","height.h05":"Lying, 0.5 m above the floor","height.h09":"Sitting, 0.9 m above the floor","height.h13":"Standing, 1.3 m above the floor","height.short05":"Lying","height.short09":"Sitting","height.short13":"Standing","legend.own":"seen by the room's own sensor","legend.spill":"seen from another room","map.aria":"Floor plan with sensors. Select a sensor, move it with the arrow keys, rotate it with Q and E, switch with N and P.","map.help":"Drag a sensor to move it, drag the small handle to turn it. Sensors snap to wall faces; hold Alt to place freely. Keyboard: arrow keys move by 5 cm (Shift 1 cm), Q and E turn by 5\xB0, N and P select the next or previous sensor.","map.selected":"Selected: {name}, x {x} m, z {z} m, direction {phi}\xB0","map.none_selected":"No sensor selected","map.snap_readout":"{a} cm | {b} cm to the end of the wall","sensors.title":"Sensors","sensors.empty":"No sensor placed on this floor yet.","sensors.select":"Select {name}","sensors.add_select":"Sensor to add","sensors.add":"Add sensor","sensors.no_candidates":"All presence and motion sensors from Home Assistant are placed.","sensors.suggested_profile":"Suggested profile from the device: {profile}","sensor.active":"include","sensor.profile":"Profile","sensor.mount":"Mount","sensor.phi":"Direction","sensor.height":"Height","sensor.tilt":"Tilt","sensor.fov_h":"Field of view, horizontal","sensor.fov_v":"Field of view, vertical","sensor.reach":"Reach","sensor.x":"Position x","sensor.z":"Position z","sensor.glass_warning":"A window is in view. Reflections can cause false detections.","sensor.remove":"Remove from plan","profile.custom":"Custom","profile.unverified":"not verified by the manufacturer","profile.unverified_hint":"The values come from community sources, not from the manufacturer's datasheet.","profile.fov_v_assumed":"The manufacturer gives no vertical field of view; {fov}\xB0 is assumed.","mount.wall":"Wall","mount.corner":"Corner","mount.ceiling":"Ceiling","results.title":"Results","results.none":"No results yet.","results.room":"Room","results.misfire":"Misfire risk","results.misfire_hint":"Share of the room that sensors from other rooms see at 1.3 m, with all doors open","results.seen_from":"Seen from","results.no_sensor":"no sensor","results.spill_list":"Sensors that see into other rooms","results.spill_line":"{sensor} sees {share} of {room}","results.no_spill":"No sensor sees noticeably into another room.","results.glass_title":"Windows in view","results.glass_line":"{sensor}: window in view, reflections possible","results.zones":"Zones","zone.bed":"Bed","zone.sofa":"Sofa","zone.desk":"Desk","zone.dining":"Dining table","zone.kitchen":"Kitchen counter","zone.wc":"Toilet","zone.shower":"Shower","zone.bathtub":"Bathtub","zone.washbasin":"Washbasin","zone.entry":"Entrance","optimizer.title":"Best spot","optimizer.room":"Room","optimizer.profile":"Profile","optimizer.target":"Apply to","optimizer.target_none":"no sensor","optimizer.weight":"Balance ({value})","optimizer.weight_coverage":"Coverage","optimizer.weight_misfire":"Avoid misfires","optimizer.run_room":"Suggest best spot","optimizer.run_all":"All rooms","optimizer.progress":"Optimizer progress","optimizer.running":"Calculating {room}\u2026 {pct}","optimizer.error":"The optimizer stopped: {detail}","optimizer.intro":"Finds the mount points with the best coverage and the least view into other rooms.","optimizer.no_result":"No suitable mount point found.","optimizer.coverage":"Coverage","optimizer.spill":"Spill","optimizer.glass":"window in view","optimizer.score":"Score","optimizer.apply":"Apply","optimizer.apply_to":"Move {name} here","optimizer.no_target":"Choose a sensor to apply this to","assume.title":"Assumptions","assume.doors":"Doors","assume.doors_open":"open","assume.doors_closed":"closed","assume.doors_live":"live","assume.doors_live_none":"No door on this floor has a contact sensor.","assume.thin":"Thin walls (under 10 cm)","assume.snap":"Snap to walls","assume.cones":"Show fields of view","assume.how_title":"How the planner calculates","assume.how_text":"Each sensor sees within its horizontal and vertical field of view up to its reach; the reach shrinks towards the edge of the view. Exterior walls and walls from 20 cm block. Walls from 10 to 19 cm damp by 25 dB, thinner ones by the value of the slider. Tall furniture damps by 10 dB, closed doors by 6 dB. This is a model, not a measurement.","view3d.reset":"Reset view","view3d.top":"Top view","view3d.mode":"Display","view3d.mode_light":"Light","view3d.mode_voxels":"Voxels","view3d.mode_points":"Point cloud","view3d.walls":"Walls","view3d.walls_solid":"solid","view3d.walls_ghost":"transparent","view3d.walls_hidden":"hidden","room.outside":"outside","help.label":"Feedback and help","help.bug":"Report a bug","help.idea":"Suggest an idea","help.question":"Ask a question","help.manual":"Manual"};var cg={title:"Presence Planner","floor.select":"Etage","floor.default_name":"Erdgeschoss","action.save":"Speichern","action.reset":"Zur\xFCcksetzen","action.export":"Exportieren","action.import":"Importieren","action.reload":"Neu laden","action.cancel":"Abbrechen","status.loading":"Plan wird geladen \u2026","status.saving":"Wird gespeichert \u2026","status.saved":"Gespeichert.","status.exported":"Export heruntergeladen.","status.imported":"Plan importiert.","status.revision":"Revision {revision}","status.sensors":"{count} Sensoren auf dieser Etage","status.unsaved":"nicht gespeichert","banner.remote_changed":"Plan oder Sensoren wurden an anderer Stelle ge\xE4ndert. Lade neu, um den neuen Stand zu sehen. Deine ungespeicherten \xC4nderungen gehen dabei verloren.","banner.read_only":"Du kannst dir den Plan ansehen. Zum Speichern brauchst du ein Administratorkonto.","error.generic":"Da ist etwas schiefgegangen: {detail}","error.unauthorized":"Keine Berechtigung. Speichern und Importieren gehen nur mit einem Administratorkonto in Home Assistant.","error.not_loaded":"Die Integration Presence Planner ist nicht geladen. Richte sie unter Einstellungen > Ger\xE4te & Dienste ein.","error.not_found":"Nicht gefunden: {detail}","error.not_supported":"Mit der aktuellen Planquelle nicht m\xF6glich: {detail}","error.invalid_format":"Das Dateiformat wird nicht unterst\xFCtzt: {detail}","error.invalid_json":"Die Datei ist kein g\xFCltiges JSON.","error.timeout":"Home Assistant hat nicht rechtzeitig geantwortet.","error.no_plan":"Es gibt noch keinen Plan zum Exportieren.","error.model":"Der Plan l\xE4sst sich nicht berechnen: {detail}","empty.no_plan":"Es gibt noch keinen Grundriss. Importiere einen NeonPlan-Export oder zeichne deinen eigenen Plan.","empty.start_editor":"Plan zeichnen","empty.no_floor":"Auf dieser Etage gibt es noch keine R\xE4ume.","import.confirm":"Der Import ersetzt deinen eigenen Plan. Weiter?","tabs.label":"Ansichten","tabs.planner":"Planer","tabs.editor":"Editor","stage.label":"Grundriss","view.label":"Darstellung","view.2d":"2D","view.3d":"3D","view.split":"Geteilt","height.label":"H\xF6he f\xFCr die Abdeckungskarte","height.h05":"Liegen, 0,5 m \xFCber dem Boden","height.h09":"Sitzen, 0,9 m \xFCber dem Boden","height.h13":"Stehen, 1,3 m \xFCber dem Boden","height.short05":"Liegen","height.short09":"Sitzen","height.short13":"Stehen","legend.own":"vom Sensor des Raums erfasst","legend.spill":"aus einem anderen Raum erfasst","map.aria":"Grundriss mit Sensoren. Sensor w\xE4hlen, mit den Pfeiltasten verschieben, mit Q und E drehen, mit N und P wechseln.","map.help":"Zieh einen Sensor, um ihn zu verschieben, und den kleinen Griff, um ihn zu drehen. Sensoren rasten an Wandfl\xE4chen ein, mit gedr\xFCckter Alt-Taste platzierst du frei. Tastatur: Pfeiltasten verschieben um 5 cm (mit Umschalt 1 cm), Q und E drehen um 5\xB0, N und P w\xE4hlen den n\xE4chsten oder vorherigen Sensor.","map.selected":"Gew\xE4hlt: {name}, x {x} m, z {z} m, Richtung {phi}\xB0","map.none_selected":"Kein Sensor gew\xE4hlt","map.snap_readout":"{a} cm | {b} cm bis zum Wandende","sensors.title":"Sensoren","sensors.empty":"Auf dieser Etage ist noch kein Sensor platziert.","sensors.select":"{name} w\xE4hlen","sensors.add_select":"Sensor zum Hinzuf\xFCgen","sensors.add":"Sensor hinzuf\xFCgen","sensors.no_candidates":"Alle Pr\xE4senz- und Bewegungsmelder aus Home Assistant sind platziert.","sensors.suggested_profile":"Vorgeschlagenes Profil laut Ger\xE4t: {profile}","sensor.active":"einrechnen","sensor.profile":"Profil","sensor.mount":"Montage","sensor.phi":"Richtung","sensor.height":"H\xF6he","sensor.tilt":"Neigung","sensor.fov_h":"Sichtfeld waagerecht","sensor.fov_v":"Sichtfeld senkrecht","sensor.reach":"Reichweite","sensor.x":"Position x","sensor.z":"Position z","sensor.glass_warning":"Ein Fenster ist im Blickfeld. Spiegelungen k\xF6nnen Fehlschaltungen verursachen.","sensor.remove":"Aus dem Plan entfernen","profile.custom":"Eigene Werte","profile.unverified":"nicht vom Hersteller best\xE4tigt","profile.unverified_hint":"Die Werte stammen aus Quellen der Community, nicht aus dem Datenblatt des Herstellers.","profile.fov_v_assumed":"Der Hersteller nennt kein senkrechtes Sichtfeld, angenommen werden {fov}\xB0.","mount.wall":"Wand","mount.corner":"Ecke","mount.ceiling":"Decke","results.title":"Auswertung","results.none":"Noch keine Ergebnisse.","results.room":"Raum","results.misfire":"Fehlschalt-Risiko","results.misfire_hint":"Anteil des Raums, den Sensoren aus anderen R\xE4umen in 1,3 m H\xF6he sehen, bei offenen T\xFCren","results.seen_from":"Blick hinein von","results.no_sensor":"kein Sensor","results.spill_list":"Sensoren, die in andere R\xE4ume sehen","results.spill_line":"{sensor} sieht {share} von {room}","results.no_spill":"Kein Sensor schaut sp\xFCrbar in einen anderen Raum.","results.glass_title":"Fenster im Blickfeld","results.glass_line":"{sensor}: Fenster im Blickfeld, Spiegelungen m\xF6glich","results.zones":"Zonen","zone.bed":"Bett","zone.sofa":"Sofa","zone.desk":"Schreibtisch","zone.dining":"Esstisch","zone.kitchen":"K\xFCchenzeile","zone.wc":"WC","zone.shower":"Dusche","zone.bathtub":"Badewanne","zone.washbasin":"Waschtisch","zone.entry":"Eingang","optimizer.title":"Bester Platz","optimizer.room":"Raum","optimizer.profile":"Profil","optimizer.target":"\xDCbernehmen f\xFCr","optimizer.target_none":"keinen Sensor","optimizer.weight":"Gewichtung ({value})","optimizer.weight_coverage":"Abdeckung","optimizer.weight_misfire":"Fehlschaltungen vermeiden","optimizer.run_room":"Besten Platz vorschlagen","optimizer.run_all":"Alle R\xE4ume","optimizer.progress":"Fortschritt der Optimierung","optimizer.running":"Berechne {room} \u2026 {pct}","optimizer.error":"Die Optimierung wurde abgebrochen: {detail}","optimizer.intro":"Sucht die Montagepunkte mit der besten Abdeckung und dem geringsten Blick in andere R\xE4ume.","optimizer.no_result":"Kein passender Montagepunkt gefunden.","optimizer.coverage":"Abdeckung","optimizer.spill":"\xDCberstrahlung","optimizer.glass":"Fenster im Blickfeld","optimizer.score":"Wertung","optimizer.apply":"\xDCbernehmen","optimizer.apply_to":"{name} hierher setzen","optimizer.no_target":"W\xE4hle einen Sensor, f\xFCr den der Vorschlag gelten soll","assume.title":"Annahmen","assume.doors":"T\xFCren","assume.doors_open":"offen","assume.doors_closed":"zu","assume.doors_live":"live","assume.doors_live_none":"Keine T\xFCr auf dieser Etage hat einen Kontaktsensor.","assume.thin":"D\xFCnne W\xE4nde (unter 10 cm)","assume.snap":"An W\xE4nden einrasten","assume.cones":"Sichtfelder zeigen","assume.how_title":"So rechnet der Planer","assume.how_text":"Jeder Sensor sieht in seinem waagerechten und senkrechten Sichtfeld bis zu seiner Reichweite, zum Rand hin nimmt die Reichweite ab. Au\xDFenw\xE4nde und W\xE4nde ab 20 cm blocken. W\xE4nde von 10 bis 19 cm d\xE4mpfen um 25 dB, d\xFCnnere um den Wert des Reglers. Hohe M\xF6bel d\xE4mpfen um 10 dB, geschlossene T\xFCren um 6 dB. Das ist ein Modell, keine Messung.","view3d.reset":"Ansicht zur\xFCcksetzen","view3d.top":"Draufsicht","view3d.mode":"Darstellung","view3d.mode_light":"Licht","view3d.mode_voxels":"Voxel","view3d.mode_points":"Punktwolke","view3d.walls":"W\xE4nde","view3d.walls_solid":"fest","view3d.walls_ghost":"durchsichtig","view3d.walls_hidden":"aus","room.outside":"au\xDFerhalb","help.label":"Feedback und Hilfe","help.bug":"Fehler melden","help.idea":"Idee vorschlagen","help.question":"Frage stellen","help.manual":"Anleitung"};var hg={en:ul,de:cg};function ug(i){let t=String(i||"en").toLowerCase().split(/[-_]/)[0];return hg[t]?t:"en"}function dl(i){let t=ug(i),e=hg[t],n=(s,r)=>{let o=e[s];return o===void 0&&(o=ul[s]),o===void 0?s:(r&&(o=o.replace(/\{(\w+)\}/g,(a,l)=>r[l]===void 0||r[l]===null?a:String(r[l]))),o)};return n.lang=t,n.has=s=>e[s]!==void 0||ul[s]!==void 0,n}function Ou(i){let t=ug(i),e=new Map,n=o=>(e.has(o)||e.set(o,new Intl.NumberFormat(t,{minimumFractionDigits:o,maximumFractionDigits:o})),e.get(o)),s=(o,a)=>{let l=10**a,c=Math.round(o*l)/l;return n(a).format(c===0?0:c)},r=o=>o==null||Number.isNaN(+o);return{num:(o,a=0)=>r(o)?"\u2013":s(+o,a),pct:(o,a=0)=>r(o)?"\u2013":`${s(+o*100,a)} %`}}var _M="presence-planner-worker.js",xM="/presence_planner/frontend/presence-planner-worker.js";function dg(i){try{if(i&&/^https?:/.test(i)){let t=new URL(_M,i),e=new URL(i).search;return e&&(t.search=e),t.href}}catch{}return xM}var vM=i=>typeof i.value=="number"?i.value:typeof i.progress=="number"?i.progress:i.total?(i.done||0)/i.total:null,yM=i=>i.result||i.results||i.candidates||[],fl=class{constructor({createWorker:t,fallback:e}={}){this.createWorker=t,this.fallback=e,this.worker=null,this.nextId=1,this.pending=new Map,this.cancelled=!1,this.running=!1}_ensureWorker(){if(this.worker||!this.createWorker)return this.worker;try{this.worker=this.createWorker()}catch{return this.createWorker=null,null}return this.worker.onmessage=t=>this._onMessage(t.data||{}),this.worker.onerror=t=>{let e=new Error(t&&t.message||"worker error");for(let n of this.pending.values())n.reject(e);this.pending.clear(),this._dropWorker()},this.worker}_dropWorker(){if(this.worker)try{this.worker.terminate()}catch{}this.worker=null}_onMessage(t){let e=this.pending.get(t.id);if(e)if(t.type==="error"||t.error!==void 0)this.pending.delete(t.id),e.reject(new Error(t.message||t.error||"optimizer error"));else if(t.type==="result"||t.result!==void 0||t.results!==void 0||t.candidates!==void 0)this.pending.delete(t.id),e.resolve(yM(t));else{let n=vM(t);n!==null&&e.onProgress(Math.max(0,Math.min(1,n)))}}_runOne(t,e){let n=this._ensureWorker();if(!n)return this.fallback?Promise.resolve().then(()=>this.fallback(t)):Promise.reject(new Error("no optimizer available"));let s=this.nextId++;return new Promise((r,o)=>{this.pending.set(s,{resolve:r,reject:o,onProgress:e}),n.postMessage({id:s,type:"optimize",...t})})}async run({plan:t,floorId:e,roomIds:n,profileId:s,opts:r,weight:o,profiles:a},l=()=>{}){this.cancelled=!1,this.running=!0;let c={},h=n.length||1;try{for(let d=0;d<n.length&&!this.cancelled;d++){let u=n[d];l(d/h,u);let f={plan:t,floorId:e,roomId:u,profileId:s,opts:r,weight:o,profiles:a};try{c[u]=await this._runOne(f,g=>l((d+g)/h,u))}catch(g){if(this.cancelled)break;c[u]={error:g.message||String(g)}}}return this.cancelled||l(1,null),c}finally{this.running=!1}}cancel(){this.cancelled=!0;let t=new Error("cancelled");for(let e of this.pending.values())e.reject(t);this.pending.clear(),this._dropWorker()}dispose(){this.cancel(),this.createWorker=null}};var fg=Pn`
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
  .badge.warn { border-color: var(--pp-warn); color: var(--pp-warn); }
  .status { flex: 1 1 200px; min-width: 0; color: var(--pp-muted); font-size: 13px; }
  .status.err { color: var(--pp-error); }
  .actions { display: flex; flex-wrap: wrap; gap: 6px; }

  button, .btn { font: inherit; font-size: 13px; color: var(--pp-text); background: transparent; border: 1px solid var(--pp-line); border-radius: 6px; padding: 6px 12px; cursor: pointer; min-height: 32px; }
  button:hover:not(:disabled) { border-color: var(--pp-accent); }
  button.primary, button[aria-pressed="true"], button.on { background: var(--pp-accent); border-color: var(--pp-accent); color: var(--pp-on-accent); }
  button:disabled { opacity: 0.5; cursor: default; }
  a.btn { display: inline-flex; align-items: center; text-decoration: none; }
  .help { display: flex; flex-wrap: wrap; gap: 6px 8px; align-items: center; padding-top: 8px; border-top: 1px solid var(--pp-line); }
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
`;var bM=(i,t)=>i.t.has(`zone.${t}`)?i.t(`zone.${t}`):t;function Zi(i,t,e,{step:n=1,label:s,unit:r=""}){let o=Gr[e];return Y`<label for="f-${e}">${s}${r?Y` <span class="muted">${r}</span>`:mt}</label>
    <span></span>
    <input id="f-${e}" type="number" min=${o[0]} max=${o[1]} step=${n} .value=${be(String(t[e]??""))}
      @change=${a=>i.patchSensor(t.entity_id,{[e]:a.target.value})} />`}function wM(i,t){let e=i.t,n=Wr(i.profiles),s=Xs(i.profiles,t.profile),r=s&&s.mounts||rl,o=i._stats&&i._stats.sensors&&i._stats.sensors[t.entity_id],a=t.active!==!1&&o&&o.glass>Du;return Y`<div class="fields" @click=${l=>l.stopPropagation()}>
    <label for="f-profile">${e("sensor.profile")}</label>
    <div class="wide">
      <select id="f-profile" style="width:100%" .value=${be(t.profile||"custom")} @change=${l=>i.setProfile(t.entity_id,l.target.value)}>
        ${n.map(l=>Y`<option value=${l.id} ?selected=${l.id===t.profile}>${l.id==="custom"?e("profile.custom"):l.name}</option>`)}
      </select>
      ${s&&!s.verified?Y`<span class="unverified" title=${e("profile.unverified_hint")}>${e("profile.unverified")}</span>`:mt}
      ${s&&s.fov_v==null&&t.mount!=="ceiling"?Y`<div class="muted">${e("profile.fov_v_assumed",{fov:i.profiles.default_fov_v||ol})}</div>`:mt}
    </div>

    <label for="f-mount">${e("sensor.mount")}</label>
    <select id="f-mount" class="wide" .value=${be(t.mount||"wall")} @change=${l=>i.setMount(t.entity_id,l.target.value)}>
      ${rl.map(l=>Y`<option value=${l} ?selected=${l===t.mount} ?disabled=${!r.includes(l)}>${e(`mount.${l}`)}</option>`)}
    </select>

    <label for="f-phi">${e("sensor.phi")} <span class="muted">°</span></label>
    <input type="range" min="0" max="359" step="1" aria-label=${e("sensor.phi")} .value=${be(String(Math.round(t.phi||0)))} ?disabled=${t.mount==="ceiling"}
      @input=${l=>i.patchSensor(t.entity_id,{phi:l.target.value},!0)} @change=${l=>i.patchSensor(t.entity_id,{phi:l.target.value})} />
    <input id="f-phi" type="number" min="0" max="359" step="1" .value=${be(String(Math.round(t.phi||0)))} ?disabled=${t.mount==="ceiling"}
      @change=${l=>i.patchSensor(t.entity_id,{phi:l.target.value})} />

    ${Zi(i,t,"height",{step:.05,label:e("sensor.height"),unit:"m"})}
    ${Zi(i,t,"tilt",{step:1,label:e("sensor.tilt"),unit:"\xB0"})}
    ${Zi(i,t,"fov_h",{step:5,label:e("sensor.fov_h"),unit:"\xB0"})}
    ${Zi(i,t,"fov_v",{step:5,label:e("sensor.fov_v"),unit:"\xB0"})}
    ${Zi(i,t,"reach",{step:.1,label:e("sensor.reach"),unit:"m"})}
    ${Zi(i,t,"x",{step:.01,label:e("sensor.x"),unit:"m"})}
    ${Zi(i,t,"z",{step:.01,label:e("sensor.z"),unit:"m"})}

    ${a?Y`<div class="full warn">${e("sensor.glass_warning")}</div>`:mt}
    ${i.isAdmin?Y`<div class="full"><button @click=${()=>i.removeSensor(t.entity_id)}>${e("sensor.remove")}</button></div>`:mt}
  </div>`}function pg(i,t){let e=i.t,n=i._s,s=i.colors,r=i.hass?ll(i.hass.states,n.sensors):[],o=i._addEntity||r[0]&&r[0].entity_id||"",a=o&&n.deviceProfiles[o]?Xs(i.profiles,n.deviceProfiles[o]):null;return Y`<section class="box" aria-labelledby="h-sensors">
    <h2 id="h-sensors">${e("sensors.title")}</h2>
    ${t.length?mt:Y`<p class="muted">${e("sensors.empty")}</p>`}
    <div class="cards">
      ${t.map((l,c)=>{let h=l.entity_id===n.selected,d=i.roomOf(l);return Y`<div class="card ${h?"sel":""} ${l.active===!1?"off":""}" @click=${()=>i.select(l.entity_id)}>
          <span class="dot" style="background:${s[l.entity_id]}"></span>
          <button class="namebtn" aria-pressed=${h?"true":"false"} aria-label=${e("sensors.select",{name:i.name(l.entity_id)})}
            @click=${u=>{u.stopPropagation(),i.select(l.entity_id)}}>${c+1}. ${i.name(l.entity_id)}</button>
          <label class="chk" @click=${u=>u.stopPropagation()}>
            <input type="checkbox" .checked=${be(l.active!==!1)} @change=${u=>i.patchSensor(l.entity_id,{active:u.target.checked})} />
            ${e("sensor.active")}
          </label>
          <span class="meta">${i.roomName(d)} · ${e(`mount.${l.mount||"wall"}`)} · ${i.fmt.num(l.height,2)} m · ${Math.round(l.phi||0)}°</span>
          ${h?wM(i,l):mt}
        </div>`})}
    </div>
    ${r.length?Y`<div class="row">
          <select aria-label=${e("sensors.add_select")} .value=${be(o)} @change=${l=>i._addEntity=l.target.value}>
            ${r.map(l=>Y`<option value=${l.entity_id} ?selected=${l.entity_id===o}>${l.name}</option>`)}
          </select>
          <button ?disabled=${!i._model||!i.isAdmin} @click=${()=>i.addSensor()}>${e("sensors.add")}</button>
        </div>
        ${a?Y`<div class="muted">${e("sensors.suggested_profile",{profile:a.name})}</div>`:mt}`:Y`<p class="muted">${e("sensors.no_candidates")}</p>`}
  </section>`}function mg(i){let t=i.t,e=i.fmt,n=i._stats,s=i._model&&i._model.rooms||[];if(!n||!n.rooms)return Y`<section class="box"><h2>${t("results.title")}</h2><p class="muted">${t("results.none")}</p></section>`;let r=[],o=[];for(let l of vn(i._s)){let c=n.sensors&&n.sensors[l.entity_id];if(!(!c||l.active===!1)){for(let[h,d]of Object.entries(c.spill||{}))d>=.01&&r.push({s:l,rid:h,share:d});c.glass>Du&&o.push(l)}}r.sort((l,c)=>c.share-l.share);let a=[...n.zones||[]].sort((l,c)=>i.roomName(l.room).localeCompare(i.roomName(c.room))||l.name.localeCompare(c.name));return Y`<section class="box" aria-labelledby="h-results">
    <h2 id="h-results">${t("results.title")}</h2>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th scope="col">${t("results.room")}</th>
          ${Ws.map(l=>Y`<th scope="col" class="num" title=${t(`height.h${String(l).replace(".","")}`)}>${e.num(l,1)} m</th>`)}
          <th scope="col" class="num" title=${t("results.misfire_hint")}>${t("results.misfire")}</th>
        </tr></thead>
        <tbody>
          ${s.map(l=>{let c=n.rooms[l.id];if(!c)return mt;let h=(c.own_sensors||[]).length>0,d=Object.entries(c.from||{}).filter(([,u])=>u>=.01).sort((u,f)=>f[1]-u[1]);return Y`<tr class=${d.length?"has-from":""}>
              <th scope="row" style="font-weight:500;color:inherit">${l.name||l.id}
                <div class="bar" aria-hidden="true"><i style="width:${Math.round((h?c.coverage_mean:0)*100)}%"></i></div></th>
              ${h?Ws.map(u=>Y`<td class="num">${e.pct(c.coverage[String(u)])}</td>`):Y`<td class="num muted" colspan="3">${t("results.no_sensor")}</td>`}
              <td class="num ${c.misfire_risk>=.05?"spill":""}">${e.pct(c.misfire_risk)}</td>
            </tr>
            ${d.length?Y`<tr class="from"><td colspan="5" class="spill">${t("results.seen_from")}: ${d.map(([u,f],g)=>Y`${g?", ":""}${i.name(u)} <span style="white-space:nowrap">${e.pct(f)}</span>`)}</td></tr>`:mt}`})}
        </tbody>
      </table>
    </div>
    ${r.length?Y`<ul class="spill" aria-label=${t("results.spill_list")}>${r.map(l=>Y`<li>${t("results.spill_line",{sensor:i.name(l.s.entity_id),share:e.pct(l.share),room:i.roomName(l.rid)})}</li>`)}</ul>`:Y`<p class="muted">${t("results.no_spill")}</p>`}
    ${o.length?Y`<div class="warn" role="note"><strong>${t("results.glass_title")}</strong><ul>${o.map(l=>Y`<li>${t("results.glass_line",{sensor:i.name(l.entity_id)})}</li>`)}</ul></div>`:mt}
    ${a.length?Y`<h2>${t("results.zones")}</h2>
          <div class="kv">${a.map(l=>{let c=n.rooms[l.room]&&(n.rooms[l.room].own_sensors||[]).length;return Y`<span>${bM(i,l.name)} <span class="muted">(${i.roomName(l.room)}, ${e.num(l.height,1)} m)</span></span><span class="v">${c?e.pct(l.share):"\u2013"}</span>`})}</div>`:mt}
  </section>`}function MM(i,t,e,n,s){let r=i.t,o=i.fmt,a=Object.values(e.spill||{}).reduce((l,c)=>l+c,0);return Y`<div class="result">
    <span><strong>${n+1}.</strong> ${r("optimizer.coverage")} ${o.pct(e.coverage)} · ${r("optimizer.spill")} ${o.pct(a)}${e.glass>.05?Y` · <span class="warn">${r("optimizer.glass")}</span>`:mt}</span>
    <button ?disabled=${!s} title=${s?r("optimizer.apply_to",{name:i.name(s)}):r("optimizer.no_target")}
      aria-label=${s?r("optimizer.apply_to",{name:i.name(s)}):r("optimizer.no_target")}
      @click=${()=>i.applyCandidate(s,e)}>${r("optimizer.apply")}</button>
    <span class="meta">${r(`mount.${e.mount||"wall"}`)} · x ${o.num(e.x,2)} · z ${o.num(e.z,2)} · ${o.num(e.height,2)} m${e.mount==="ceiling"?mt:Y` · ${Math.round(e.phi)}° · ${r("sensor.tilt")} ${Math.round(e.tilt)}°`} · ${r("optimizer.score")} ${o.num(e.score,3)}</span>
  </div>`}function gg(i){let t=i.t,e=i._opt,n=i._model&&i._model.rooms||[],s=i.optimizerRoom(),r=i.optimizerProfile(),o=vn(i._s),a=i.optimizerTarget(s),l=e.results;return Y`<section class="box" aria-labelledby="h-opt">
    <h2 id="h-opt">${t("optimizer.title")}</h2>
    <div class="row">
      <label for="o-room" class="muted">${t("optimizer.room")}</label>
      <select id="o-room" .value=${be(s||"")} @change=${c=>i.setOpt({roomId:c.target.value,target:null})}>
        ${n.map(c=>Y`<option value=${c.id} ?selected=${c.id===s}>${c.name||c.id}</option>`)}
      </select>
    </div>
    <div class="row">
      <label for="o-profile" class="muted">${t("optimizer.profile")}</label>
      <select id="o-profile" .value=${be(r)} @change=${c=>i.setOpt({profileId:c.target.value})}>
        ${Wr(i.profiles).map(c=>Y`<option value=${c.id} ?selected=${c.id===r}>${c.id==="custom"?t("profile.custom"):c.name}</option>`)}
      </select>
    </div>
    <div class="row">
      <label for="o-target" class="muted">${t("optimizer.target")}</label>
      <select id="o-target" .value=${be(a||"-")} @change=${c=>i.setOpt({target:c.target.value})}>
        <option value="-">${t("optimizer.target_none")}</option>
        ${o.map(c=>Y`<option value=${c.entity_id} ?selected=${c.entity_id===a}>${i.name(c.entity_id)}</option>`)}
      </select>
    </div>
    <div>
      <label for="o-weight" class="muted">${t("optimizer.weight",{value:i.fmt.num(i._s.weight,1)})}</label>
      <div class="slider">
        <span>${t("optimizer.weight_coverage")}</span>
        <input id="o-weight" type="range" min="0" max="2" step="0.1" .value=${be(String(i._s.weight))} @input=${c=>i.setOption("weight",+c.target.value)} />
        <span>${t("optimizer.weight_misfire")}</span>
      </div>
    </div>
    <div class="row">
      <button class="primary" ?disabled=${e.running||!s} @click=${()=>i.runOptimizer(!1)}>${t("optimizer.run_room")}</button>
      <button ?disabled=${e.running||!n.length} @click=${()=>i.runOptimizer(!0)}>${t("optimizer.run_all")}</button>
      ${e.running?Y`<button @click=${()=>i.cancelOptimizer()}>${t("action.cancel")}</button>`:mt}
    </div>
    ${e.running?Y`<div role="status" aria-live="polite">
          <progress max="1" .value=${e.progress} aria-label=${t("optimizer.progress")}></progress>
          <span class="muted">${t("optimizer.running",{room:i.roomName(e.currentRoom),pct:i.fmt.pct(e.progress)})}</span>
        </div>`:mt}
    ${e.error?Y`<p class="spill" role="alert">${t("optimizer.error",{detail:e.error})}</p>`:mt}
    ${l?Y`<div class="results">
          ${Object.entries(l).map(([c,h],d)=>{let u=e.scope==="all"?cl(i._s,c,f=>i.roomOf(f)):a;return Array.isArray(h)?Y`<details ?open=${e.scope!=="all"||d===0}>
              <summary>${i.roomName(c)}${h[0]?Y` · ${t("optimizer.coverage")} ${i.fmt.pct(h[0].coverage)}`:mt}</summary>
              <div class="results">
                ${h.length?h.map((f,g)=>MM(i,c,f,g,u)):Y`<p class="muted">${t("optimizer.no_result")}</p>`}
              </div>
            </details>`:Y`<p class="spill">${i.roomName(c)}: ${t("optimizer.error",{detail:h.error})}</p>`})}
        </div>`:Y`<p class="muted">${t("optimizer.intro")}</p>`}
  </section>`}function _g(i){let t=i.t,e=i._s,n=qs(e),s=(n&&n.openings||[]).some(r=>r.type!=="window"&&r.contact);return Y`<section class="box" aria-labelledby="h-assume">
    <h2 id="h-assume">${t("assume.title")}</h2>
    <div class="row">
      <span class="muted">${t("assume.doors")}</span>
      <div class="seg" role="group" aria-label=${t("assume.doors")}>
        ${$m.map(r=>Y`<button aria-pressed=${e.doorsMode===r?"true":"false"} ?disabled=${r==="live"&&!s}
          title=${r==="live"&&!s?t("assume.doors_live_none"):""} @click=${()=>i.setOption("doorsMode",r)}>${t(`assume.doors_${r}`)}</button>`)}
      </div>
    </div>
    <div class="kv"><label for="a-thin">${t("assume.thin")}</label><span class="v">${e.thinDb} dB</span></div>
    <input id="a-thin" type="range" min="4" max="18" step="1" .value=${be(String(e.thinDb))}
      @input=${r=>i.setOption("thinDb",+r.target.value,!0)} @change=${r=>i.setOption("thinDb",+r.target.value)} />
    <label class="chk"><input type="checkbox" .checked=${be(e.snap)} @change=${r=>i.setOption("snap",r.target.checked)} /> ${t("assume.snap")}</label>
    <label class="chk"><input type="checkbox" .checked=${be(e.cones)} @change=${r=>i.setOption("cones",r.target.checked)} /> ${t("assume.cones")}</label>
    <details><summary>${t("assume.how_title")}</summary><p>${t("assume.how_text")}</p></details>
  </section>`}var pl="https://github.com/DigitalIQ/presence-planner",xg=[{key:"help.bug",href:`${pl}/issues/new/choose`},{key:"help.idea",href:`${pl}/discussions/categories/ideas`},{key:"help.question",href:`${pl}/discussions/categories/q-a`},{key:"help.manual",href:`${pl}#readme`}];var SM=.2,ku=class extends Ye{static properties={hass:{attribute:!1},narrow:{type:Boolean,reflect:!0},route:{attribute:!1},panel:{attribute:!1},_s:{state:!0},_eval:{state:!0},_stats:{state:!0},_model:{state:!0},_status:{state:!0},_busy:{state:!0},_opt:{state:!0},_addEntity:{state:!0}};static styles=fg;constructor(){super(),this._s=Wm(),this._eval=null,this._stats=null,this._model=null,this._status=null,this._busy=!1,this._opt={roomId:null,profileId:null,target:null,running:!1,progress:0,results:null,error:null,scope:null},this._addEntity="",this._client=null,this._unsub=null,this._evalFast=!1,this._contactSig="",this._runner=new fl({createWorker:()=>new Worker(dg(import.meta.url),{type:"module"}),fallback:t=>zl(this._modelFor(t.plan,t.floorId),t.roomId,t.profileId,t.opts,t.weight,t.profiles)})}connectedCallback(){super.connectedCallback(),this._client&&!this._unsub&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe(),this._runner.cancel(),cancelAnimationFrame(this._evalRaf)}willUpdate(t){if(t.has("hass")&&this.hass){(!this._t||this._t.lang!==dl(this.hass.language).lang)&&(this._t=dl(this.hass.language),this._f=Ou(this.hass.language));let e=!!(this.hass.themes&&this.hass.themes.darkMode);if(e!==this._dark&&(this._dark=e,this.toggleAttribute("dark",e)),(!this._client||this._client.connection!==this.hass.connection)&&(this._client=new hl(this.hass.connection),this._unsubscribe(),this._load(),this._subscribe(),this._loadDeviceProfiles()),this._s.doorsMode==="live"){let n=this._contactSignature();n!==this._contactSig&&(this._contactSig=n,this._invalidateOptimizer(),this._scheduleEval(!1))}}}get t(){return this._t||(this._t=dl("en"))}get fmt(){return this._f||(this._f=Ou("en"))}async _load(){if(!this._client)return!1;this._busy=!0,this._status={key:"status.loading"};try{let t;for(let e=0;;e++)try{t=await this._client.get();break}catch(n){if(vi(n).code!=="not_loaded"||e>=3)throw n;await new Promise(s=>setTimeout(s,1e3))}return this._setState(Xm(this._s,t)),this._status=null,!0}catch(t){let e=vi(t);return this._s={...this._s,loading:!1,error:e},this._status={key:e.i18nKey,error:!0,detail:e.message},!1}finally{this._busy=!1}}async _loadDeviceProfiles(){try{let t=await this._client.deviceProfiles();this._s={...this._s,deviceProfiles:t}}catch{}}async _subscribe(){if(!(!this._client||this._unsub))try{this._unsub=await this._client.subscribe(t=>{if(this._saving)return;let{state:e,reload:n}=qm(this._s,t.revision);this._s=e,n&&this._load()})}catch{}}_unsubscribe(){if(this._unsub)try{this._unsub()}catch{}this._unsub=null}_setState(t,{fast:e=!1}={}){let n=this._s;Ys(xi(n),xi(t))||(this._invalidateOptimizer(),(t.floorId!==n.floorId||t.editPlan!==n.editPlan)&&(this._opt={...this._opt,roomId:null,target:null})),this._s=t,(t.editPlan!==n.editPlan||t.floorId!==n.floorId||!this._model)&&this._rebuildModel(),t.profiles!==n.profiles&&(this._profilesDict=null),t.doorsMode==="live"&&n.doorsMode!=="live"&&(this._contactSig=this._contactSignature()),this._scheduleEval(e)}get profiles(){return this._profilesDict||(this._profilesDict=Xr(this._s.profiles||Dn)),this._profilesDict}_modelFor(t,e){return t===this._s.editPlan&&e===this._s.floorId&&this._model?this._model:oo(t,e)}_rebuildModel(){let t=this._s.editPlan,e=this._s.floorId;if(!t||!e){this._model=null;return}try{this._model=oo(t,e),this._modelError=null}catch(n){this._model=null,this._modelError=n,this._status={key:"error.model",error:!0,detail:n.message}}}_resolved(t){return t.map(e=>{try{return ts(e,this.profiles)}catch{return e}})}_scheduleEval(t){this._evalFast=t,cancelAnimationFrame(this._evalRaf),clearTimeout(this._evalTimer);let e=()=>this._runEval(t);t?this._evalRaf=requestAnimationFrame(e):this._evalTimer=setTimeout(e,0)}_coreOpts3d(){let t=al(this._s,this.hass&&this.hass.states,{fast:!1}),e=JSON.stringify([t.doors,t.thin_db]);return this._opts3dKey!==e&&(this._opts3dKey=e,this._opts3d={doors:t.doors,thin_db:t.thin_db}),this._opts3d}_runEval(t){if(!this._model){this._eval=null,this._stats=null;return}let e=al(this._s,this.hass&&this.hass.states,{fast:t});try{let n=hr(this._model,this._resolved(vn(this._s)),e);this._eval={...n,cell:e.cell,fast:t},t||(this._stats=this._eval)}catch(n){this._eval=null,this._status={key:"error.model",error:!0,detail:n.message}}}_contactSignature(){let t=qs(this._s),e=this.hass&&this.hass.states||{};return(t&&t.openings||[]).filter(n=>n.contact).map(n=>`${n.id}:${(e[n.contact]||{}).state}`).join("|")}name(t){let e=this.hass&&this.hass.states[t];return e&&e.attributes&&e.attributes.friendly_name||t}roomName(t){let e=this._model&&(this._model.rooms||[]).find(n=>n.id===t);return e?e.name||e.id:this.t("room.outside")}roomOf(t){return Au(this._model,t.x,t.z)}roomHeight(t){let e=this._model&&(this._model.rooms||[]).find(s=>s.id===t),n=qs(this._s);return e&&e.height||n&&n.height||2.5}get colors(){return Vm(this._s.sensors,this._dark)}get isAdmin(){return!this.hass||!this.hass.user||this.hass.user.is_admin!==!1}_selectId(t){return typeof t=="string"?t:t&&(t.entityId||t.entity_id)||null}select(t){!t||t===this._s.selected||(this._s={...this._s,selected:t})}patchSensor(t,e,n=!1){this._setState(qr(this._s,t,e),{fast:n})}setProfile(t,e){this._setState(Ym(this._s,t,e))}setMount(t,e){let n=_i(this._s,t);this._setState(Zm(this._s,t,e,n?this.roomHeight(this.roomOf(n)):void 0))}removeSensor(t){this._setState(jm(this._s,t))}setOption(t,e,n=!1){let s={...this._s,[t]:e};t==="thinDb"&&(s.thinTouched=!0),["height","doorsMode","thinDb"].includes(t)?this._setState(s,{fast:n}):this._s=s}addSensor(){let t=this._addEntity||(ll(this.hass.states,this._s.sensors)[0]||{}).entity_id;if(!t||!this._model)return;let e=this._model.rooms||[],n=new Set(vn(this._s).map(a=>this.roomOf(a))),s=e.find(a=>!n.has(a.id))||e[0],r=s?nl(s.points):{x:0,z:0},o=Km(t,{floorId:this._s.floorId,x:r.x,z:r.z,profileId:this._s.deviceProfiles[t]||"custom",profiles:this.profiles});this._addEntity="",this._setState(Jm(this._s,o))}async save(){if(this._client){this._busy=!0,this._saving=!0,this._status={key:"status.saving"};try{this._s.planDirty&&await this._client.savePlan(this._s.editPlan);let t;if(this._s.dirty){let e=await this._client.saveSensors(ng(this._s));t=e&&e.revision,this._s=eg(this._s,t)}await this._load()&&(this._status={key:"status.saved"})}catch(t){let e=vi(t);this._status={key:e.i18nKey,error:!0,detail:e.message}}finally{this._busy=!1,this._saving=!1}}}reset(){if(this._s.remoteChanged){this._load();return}this._setState(Qm(this._s)),this._status=null}async exportPlan(){try{let t=await this._client.exportPlan(),e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(e),n.download="presence-planner-backup.json",document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3),this._status={key:"status.exported"}}catch(t){let e=vi(t);this._status={key:e.i18nKey,error:!0,detail:e.message}}}_pickImport(){this.renderRoot.querySelector("#import-file").click()}async _importFile(t){let e=t.target.files&&t.target.files[0];if(t.target.value="",!e)return;let n;try{n=JSON.parse(await e.text())}catch{this._status={key:"error.invalid_json",error:!0};return}if(!((this._s.dirty||this._s.planDirty||this._s.plan)&&!window.confirm(this.t("import.confirm")))){this._busy=!0;try{await this._client.importPlan(n),await this._load(),this._status={key:"status.imported"}}catch(s){let r=vi(s);this._status={key:r.i18nKey,error:!0,detail:r.message}}finally{this._busy=!1}}}setOpt(t){("profileId"in t&&t.profileId!==this._opt.profileId||"roomId"in t&&t.roomId!==this._opt.roomId)&&this._invalidateOptimizer(),this._opt={...this._opt,...t}}_invalidateOptimizer(){this._runner.cancel(),this._optRun=null,this._optContext=null,this._opt={...this._opt,running:!1,results:null,progress:0}}optimizerRoom(){let t=this._model&&this._model.rooms||[];if(t.some(s=>s.id===this._opt.roomId))return this._opt.roomId;let e=_i(this._s,this._s.selected);return(e?this.roomOf(e):null)||t[0]&&t[0].id||null}optimizerProfile(){if(this._opt.profileId)return this._opt.profileId;let t=_i(this._s,this._s.selected);return t&&t.profile||"aqara_fp300"}optimizerTarget(t){if(this._opt.target&&this._opt.scope!=="all"){if(this._opt.target==="-")return null;if(vn(this._s).some(e=>e.entity_id===this._opt.target))return this._opt.target}return cl(this._s,t,e=>this.roomOf(e))}async runOptimizer(t){if(!this._model||this._opt.running)return;let e=t?(this._model.rooms||[]).map(o=>o.id):[this.optimizerRoom()].filter(Boolean);if(!e.length)return;let n={...al(this._s,this.hass&&this.hass.states,{grid:!1}),cell:SM},s=xi(this._s),r=Symbol("optimizer run");this._optRun=r,this._optContext=s,this.setOpt({running:!0,progress:0,results:null,error:null,scope:t?"all":"room",currentRoom:e[0]});try{let o=await this._runner.run({plan:this._s.editPlan,floorId:this._s.floorId,roomIds:e,profileId:this.optimizerProfile(),opts:n,weight:this._s.weight,profiles:this.profiles},(a,l)=>{this._optRun===r&&Ys(s,xi(this._s))&&this.setOpt({progress:a,currentRoom:l})});if(this._optRun!==r||!Ys(s,xi(this._s)))return;this.setOpt({running:!1,results:o,progress:1})}catch(o){if(this._optRun!==r||!Ys(s,xi(this._s)))return;this.setOpt({running:!1,error:o.message||String(o)})}}cancelOptimizer(){this._invalidateOptimizer()}applyCandidate(t,e){!t||!Ys(this._optContext,xi(this._s))||this._setState({...sg(this._s,t,e),selected:t})}render(){let t=this.t,e=this._s;if(!this.hass)return Y``;let n=e.editPlan&&e.editPlan.floors||[],s=e.dirty||e.planDirty;return Y`<div class="app">
      ${this._renderTop(n,s)}
      ${e.remoteChanged?Y`<div class="banner" role="alert"><span>${t("banner.remote_changed")}</span><button @click=${()=>this._load()}>${t("action.reload")}</button></div>`:mt}
      ${this.isAdmin?mt:Y`<div class="banner" role="note"><span>${t("banner.read_only")}</span></div>`}
      ${e.loading&&!e.plan?Y`<div class="empty">${t("status.loading")}</div>`:e.error&&!e.plan?this._renderError():e.plan?this._renderBody():this._renderNoPlan()}
      ${this._renderHelp()}
    </div>`}_renderHelp(){let t=this.t;return Y`<footer class="help" aria-label=${t("help.label")}>
      <span class="muted">${t("help.label")}</span>
      ${xg.map(e=>Y`<a class="btn" href=${e.href} target="_blank" rel="noopener noreferrer">${t(e.key)}</a>`)}
    </footer>`}_renderTop(t,e){let n=this.t,s=this._s,r=this._status,o=r?n(r.key,{detail:r.detail||""})+(r.error&&r.detail&&!n(r.key).includes("{detail}")?` (${r.detail})`:""):s.plan?[s.revision!==null?n("status.revision",{revision:s.revision}):null,n("status.sensors",{count:vn(s).length}),e?n("status.unsaved"):null].filter(Boolean).join(" \xB7 "):"";return Y`<header class="top">
      <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
      <h1>${n("title")}</h1>
      ${t.length>1?Y`<select aria-label=${n("floor.select")} .value=${s.floorId||""} @change=${a=>this._setState({...s,floorId:a.target.value,selected:null})}>
            ${t.map(a=>Y`<option value=${a.id} ?selected=${a.id===s.floorId}>${a.name||a.id}</option>`)}
          </select>`:mt}
      <span class="status ${r&&r.error?"err":""}" role="status" aria-live="polite">${o}</span>
      <div class="actions">
        <button class="primary" ?disabled=${!e||this._busy||!this.isAdmin} @click=${()=>this.save()}>${n("action.save")}</button>
        <button ?disabled=${!e&&!s.remoteChanged||this._busy} @click=${()=>this.reset()}>${n("action.reset")}</button>
        <button ?disabled=${!s.plan||this._busy} @click=${()=>this.exportPlan()}>${n("action.export")}</button>
        <button ?disabled=${this._busy||!this.isAdmin} @click=${()=>this._pickImport()}>${n("action.import")}</button>
        <input id="import-file" type="file" accept=".json,application/json" hidden @change=${a=>this._importFile(a)} />
      </div>
    </header>`}_renderError(){let t=this.t;return Y`<div class="empty"><p>${t(this._s.error.i18nKey||"error.generic",{detail:this._s.error.message})}</p><button @click=${()=>this._load()}>${t("action.reload")}</button></div>`}_renderNoPlan(){let t=this.t;return Y`<div class="empty">
      <p>${t("empty.no_plan")}</p>
      <div class="row" style="justify-content:center">
        <button @click=${()=>this._pickImport()} ?disabled=${!this.isAdmin}>${t("action.import")}</button>
        <button class="primary" @click=${()=>this._startOwnPlan()}>${t("empty.start_editor")}</button>
      </div>
    </div>`}_startOwnPlan(){let t={version:1,settings:{wall_exterior:.24,wall_interior:.12},floors:[{id:"f1",name:this.t("floor.default_name"),ha_floor:null,elevation:0,height:2.5,rooms:[],openings:[],walls:[],furniture:[],outdoor:[],background:null}]};this._setState({...this._s,plan:t,editPlan:t,floorId:"f1",planDirty:!0,tab:"editor"})}_renderBody(){let t=this.t,n=this._s.tab;return Y`
      <nav class="tabs" role="tablist" aria-label=${t("tabs.label")} @keydown=${s=>this._tabKey(s)}>
        <button role="tab" id="tab-planner" aria-controls="tp-planner" aria-selected=${n==="planner"?"true":"false"} tabindex=${n==="planner"?0:-1} @click=${()=>this.setOption("tab","planner")}>${t("tabs.planner")}</button>
        ${Y`<button role="tab" id="tab-editor" aria-controls="tp-editor" aria-selected=${n==="editor"?"true":"false"} tabindex=${n==="editor"?0:-1} @click=${()=>this.setOption("tab","editor")}>${t("tabs.editor")}</button>`}
      </nav>
      ${n==="editor"?this._renderEditor():this._renderPlanner()}`}_tabKey(t){if(t.key!=="ArrowLeft"&&t.key!=="ArrowRight")return;let e=this._s.tab==="planner"?"editor":"planner";this.setOption("tab",e),this.updateComplete.then(()=>{let n=this.renderRoot.querySelector(`#tab-${e}`);n&&n.focus()})}_haRegistries(){let t=this.hass?.areas,e=this.hass?.floors;if(this._regCache&&this._regCache.areas===t&&this._regCache.floors===e)return this._regCache;let n=(s,r)=>String(s.name||"").localeCompare(String(r.name||""));return this._regCache={areas:t,floors:e,areaList:Object.values(t||{}).sort(n),floorList:Object.values(e||{}).sort((s,r)=>(s.level??0)-(r.level??0)||n(s,r))},this._regCache}_renderEditor(){let t=this._haRegistries();return Y`<section id="tp-editor" role="tabpanel" aria-labelledby="tab-editor" class="editor">
      <pp-editor .plan=${this._s.editPlan} .floorId=${this._s.floorId} .hass=${this.hass} .dark=${!!this._dark}
        .lang=${this.hass?.language||"en"} .areas=${t.areaList} .floors=${t.floorList}
        @plan-changed=${e=>this._onPlanChanged(e)}
        @floor-selected=${e=>this._onFloorSelected(e)}></pp-editor>
    </section>`}_onPlanChanged(t){let e=t.detail,n=e&&e.plan?e.plan:e;if(!n||!n.floors)return;let s=this._s.floorId;e&&e.floorId&&(s=e.floorId),n.floors.some(r=>r.id===s)||(s=n.floors[0]?n.floors[0].id:null),this._setState({...tg(this._s,n),floorId:s})}_onFloorSelected(t){this._setState(rg(this._s,t.detail.floorId))}_renderPlanner(){let t=this.t,e=this._s,n=vn(e),s=this._resolved(n),r=this.colors,o=Object.fromEntries(n.map(c=>[c.entity_id,this.name(c.entity_id)])),a=e.view,l=Iu[this._dark?"dark":"light"];return Y`<div id="tp-planner" role="tabpanel" aria-labelledby="tab-planner" class="planner">
      <section class="stage" aria-label=${t("stage.label")}>
        <div class="toolbar">
          <div class="seg" role="group" aria-label=${t("view.label")}>
            ${Hm.map(c=>Y`<button aria-pressed=${a===c?"true":"false"} @click=${()=>this.setOption("view",c)}>${t(`view.${c}`)}</button>`)}
          </div>
          <div class="seg" role="group" aria-label=${t("height.label")}>
            ${Ws.map(c=>Y`<button aria-pressed=${e.height===c?"true":"false"} title=${t(`height.h${String(c).replace(".","")}`)} @click=${()=>this.setOption("height",c)}>${t(`height.short${String(c).replace(".","")}`)}</button>`)}
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
                    @sensor-move=${c=>this.patchSensor(c.detail.entity_id,c.detail.patch,!c.detail.final)}></pp-map2d></div>`:mt}
              ${a!=="2d"?Y`<div class="view"><pp-view3d .model=${this._model} .sensors=${s} .evaluation=${this._eval} .height=${e.height}
                    .selected=${e.selected} .dark=${!!this._dark} .colors=${r} .coreOpts=${this._coreOpts3d()}
                    .labels=${{reset:t("view3d.reset"),top:t("view3d.top"),mode:t("view3d.mode"),light:t("view3d.mode_light"),voxels:t("view3d.mode_voxels"),points:t("view3d.mode_points"),walls:t("view3d.walls"),walls_solid:t("view3d.walls_solid"),walls_ghost:t("view3d.walls_ghost"),walls_hidden:t("view3d.walls_hidden")}}
                    @select=${c=>this.select(this._selectId(c.detail))}></pp-view3d></div>`:mt}
            </div>
            <p class="hint">${t("map.help")}</p>`:Y`<div class="empty">${this._modelError?t("error.model",{detail:this._modelError.message}):t("empty.no_floor")}</div>`}
      </section>
      <aside class="side">
        ${pg(this,n)}
        ${mg(this)}
        ${gg(this)}
        ${_g(this)}
      </aside>
    </div>`}};customElements.get("presence-planner-panel")||customElements.define("presence-planner-panel",ku);export{ku as PresencePlannerPanel};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
lit-html/directive.js:
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

lit-html/directive-helpers.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
