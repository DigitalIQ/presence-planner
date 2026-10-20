var Br=globalThis,Vr=Br.ShadowRoot&&(Br.ShadyCSS===void 0||Br.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,il=Symbol(),ku=new WeakMap,Ws=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==il)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Vr&&t===void 0){let n=e!==void 0&&e.length===1;n&&(t=ku.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&ku.set(e,t))}return t}toString(){return this.cssText}},Fu=i=>new Ws(typeof i=="string"?i:i+"",void 0,il),Tn=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((n,s,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[r+1],i[0]);return new Ws(e,i,il)},zu=(i,t)=>{if(Vr)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let n=document.createElement("style"),s=Br.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}},sl=Vr?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let n of t.cssRules)e+=n.cssText;return Fu(e)})(i):i;var{is:ig,defineProperty:sg,getOwnPropertyDescriptor:rg,getOwnPropertyNames:og,getOwnPropertySymbols:ag,getPrototypeOf:lg}=Object,$r=globalThis,Bu=$r.trustedTypes,cg=Bu?Bu.emptyScript:"",hg=$r.reactiveElementPolyfillSupport,Xs=(i,t)=>i,rl={toAttribute(i,t){switch(t){case Boolean:i=i?cg:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},$u=(i,t)=>!ig(i,t),Vu={attribute:!0,type:String,converter:rl,reflect:!1,useDefault:!1,hasChanged:$u};Symbol.metadata??=Symbol("metadata"),$r.litPropertyMetadata??=new WeakMap;var Rn=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Vu){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let n=Symbol(),s=this.getPropertyDescriptor(t,n,e);s!==void 0&&sg(this.prototype,t,s)}}static getPropertyDescriptor(t,e,n){let{get:s,set:r}=rg(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Vu}static _$Ei(){if(this.hasOwnProperty(Xs("elementProperties")))return;let t=lg(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Xs("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Xs("properties"))){let e=this.properties,n=[...og(e),...ag(e)];for(let s of n)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[n,s]of e)this.elementProperties.set(n,s)}this._$Eh=new Map;for(let[e,n]of this.elementProperties){let s=this._$Eu(e,n);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let s of n)e.unshift(sl(s))}else t!==void 0&&e.push(sl(t));return e}static _$Eu(t,e){let n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return zu(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){let n=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,n);if(s!==void 0&&n.reflect===!0){let r=(n.converter?.toAttribute!==void 0?n.converter:rl).toAttribute(e,n.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let n=this.constructor,s=n._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=n.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:rl;this._$Em=s;let a=o.fromAttribute(e,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,n,s=!1,r){if(t!==void 0){let o=this.constructor;if(s===!1&&(r=this[t]),n??=o.getPropertyOptions(t),!((n.hasChanged??$u)(r,e)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,n))))return;this.C(t,e,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:s,wrapped:r},o){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[s,r]of n){let{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};Rn.elementStyles=[],Rn.shadowRootOptions={mode:"open"},Rn[Xs("elementProperties")]=new Map,Rn[Xs("finalized")]=new Map,hg?.({ReactiveElement:Rn}),($r.reactiveElementVersions??=[]).push("2.1.2");var al=globalThis,Hu=i=>i,Hr=al.trustedTypes,Gu=Hr?Hr.createPolicy("lit-html",{createHTML:i=>i}):void 0,ll="$lit$",Cn=`lit$${Math.random().toFixed(9).slice(2)}$`,cl="?"+Cn,ug=`<${cl}>`,xi=document,Ys=()=>xi.createComment(""),Zs=i=>i===null||typeof i!="object"&&typeof i!="function",hl=Array.isArray,Ku=i=>hl(i)||typeof i?.[Symbol.iterator]=="function",ol=`[ 	
\f\r]`,qs=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Wu=/-->/g,Xu=/>/g,gi=RegExp(`>|${ol}(?:([^\\s"'>=/]+)(${ol}*=${ol}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qu=/'/g,Yu=/"/g,Ju=/^(?:script|style|textarea|title)$/i,ul=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),Y=ul(1),Wt=ul(2),ow=ul(3),Qe=Symbol.for("lit-noChange"),ft=Symbol.for("lit-nothing"),Zu=new WeakMap,_i=xi.createTreeWalker(xi,129);function ju(i,t){if(!hl(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Gu!==void 0?Gu.createHTML(t):t}var Qu=(i,t)=>{let e=i.length-1,n=[],s,r=t===2?"<svg>":t===3?"<math>":"",o=qs;for(let a=0;a<e;a++){let l=i[a],c,h,d=-1,u=0;for(;u<l.length&&(o.lastIndex=u,h=o.exec(l),h!==null);)u=o.lastIndex,o===qs?h[1]==="!--"?o=Wu:h[1]!==void 0?o=Xu:h[2]!==void 0?(Ju.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=gi):h[3]!==void 0&&(o=gi):o===gi?h[0]===">"?(o=s??qs,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?gi:h[3]==='"'?Yu:qu):o===Yu||o===qu?o=gi:o===Wu||o===Xu?o=qs:(o=gi,s=void 0);let f=o===gi&&i[a+1].startsWith("/>")?" ":"";r+=o===qs?l+ug:d>=0?(n.push(c),l.slice(0,d)+ll+l.slice(d)+Cn+f):l+Cn+(d===-2?a:f)}return[ju(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Ks=class i{constructor({strings:t,_$litType$:e},n){let s;this.parts=[];let r=0,o=0,a=t.length-1,l=this.parts,[c,h]=Qu(t,e);if(this.el=i.createElement(c,n),_i.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=_i.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(ll)){let u=h[o++],f=s.getAttribute(d).split(Cn),g=/([.?@])?(.*)/.exec(u);l.push({type:1,index:r,name:g[2],strings:f,ctor:g[1]==="."?Wr:g[1]==="?"?Xr:g[1]==="@"?qr:yi}),s.removeAttribute(d)}else d.startsWith(Cn)&&(l.push({type:6,index:r}),s.removeAttribute(d));if(Ju.test(s.tagName)){let d=s.textContent.split(Cn),u=d.length-1;if(u>0){s.textContent=Hr?Hr.emptyScript:"";for(let f=0;f<u;f++)s.append(d[f],Ys()),_i.nextNode(),l.push({type:2,index:++r});s.append(d[u],Ys())}}}else if(s.nodeType===8)if(s.data===cl)l.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(Cn,d+1))!==-1;)l.push({type:7,index:r}),d+=Cn.length-1}r++}}static createElement(t,e){let n=xi.createElement("template");return n.innerHTML=t,n}};function vi(i,t,e=i,n){if(t===Qe)return t;let s=n!==void 0?e._$Co?.[n]:e._$Cl,r=Zs(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(i),s._$AT(i,e,n)),n!==void 0?(e._$Co??=[])[n]=s:e._$Cl=s),s!==void 0&&(t=vi(i,s._$AS(i,t.values),s,n)),t}var Gr=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:n}=this._$AD,s=(t?.creationScope??xi).importNode(e,!0);_i.currentNode=s;let r=_i.nextNode(),o=0,a=0,l=n[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new qi(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new Yr(r,this,t)),this._$AV.push(c),l=n[++a]}o!==l?.index&&(r=_i.nextNode(),o++)}return _i.currentNode=xi,s}p(t){let e=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}},qi=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,s){this.type=2,this._$AH=ft,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=vi(this,t,e),Zs(t)?t===ft||t==null||t===""?(this._$AH!==ft&&this._$AR(),this._$AH=ft):t!==this._$AH&&t!==Qe&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ku(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ft&&Zs(this._$AH)?this._$AA.nextSibling.data=t:this.T(xi.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Ks.createElement(ju(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new Gr(s,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=Zu.get(t.strings);return e===void 0&&Zu.set(t.strings,e=new Ks(t)),e}k(t){hl(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,n,s=0;for(let r of t)s===e.length?e.push(n=new i(this.O(Ys()),this.O(Ys()),this,this.options)):n=e[s],n._$AI(r),s++;s<e.length&&(this._$AR(n&&n._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let n=Hu(t).nextSibling;Hu(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},yi=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,s,r){this.type=1,this._$AH=ft,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ft}_$AI(t,e=this,n,s){let r=this.strings,o=!1;if(r===void 0)t=vi(this,t,e,0),o=!Zs(t)||t!==this._$AH&&t!==Qe,o&&(this._$AH=t);else{let a=t,l,c;for(t=r[0],l=0;l<r.length-1;l++)c=vi(this,a[n+l],e,l),c===Qe&&(c=this._$AH[l]),o||=!Zs(c)||c!==this._$AH[l],c===ft?t=ft:t!==ft&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!s&&this.j(t)}j(t){t===ft?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Wr=class extends yi{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ft?void 0:t}},Xr=class extends yi{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ft)}},qr=class extends yi{constructor(t,e,n,s,r){super(t,e,n,s,r),this.type=5}_$AI(t,e=this){if((t=vi(this,t,e,0)??ft)===Qe)return;let n=this._$AH,s=t===ft&&n!==ft||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==ft&&(n===ft||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Yr=class{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){vi(this,t)}},td={M:ll,P:Cn,A:cl,C:1,L:Qu,R:Gr,D:Ku,V:vi,I:qi,H:yi,N:Xr,U:qr,B:Wr,F:Yr},dg=al.litHtmlPolyfillSupport;dg?.(Ks,qi),(al.litHtmlVersions??=[]).push("3.3.3");var ed=(i,t,e)=>{let n=e?.renderBefore??t,s=n._$litPart$;if(s===void 0){let r=e?.renderBefore??null;n._$litPart$=s=new qi(t.insertBefore(Ys(),r),r,void 0,e??{})}return s._$AI(i),s};var dl=globalThis,Ge=class extends Rn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ed(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Qe}};Ge._$litElement$=!0,Ge.finalized=!0,dl.litElementHydrateSupport?.({LitElement:Ge});var fg=dl.litElementPolyfillSupport;fg?.({LitElement:Ge});(dl.litElementVersions??=[]).push("4.2.2");var Pn={version:1,default_fov_v:90,profiles:[{id:"aqara_fp300",name:"Aqara Presence Multi-Sensor FP300",manufacturer:"Aqara",match:["fp300","ps-s04d","ps-s04e","presence multi-sensor"],tech:"hybrid",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:null,verified:!0,source:"https://www.aqara.com/en/product/presence-multi-sensor-fp300/",note:"Manual: side mounting 1.4\u20131.8 m, about 2 m tilted down for larger areas. Detection range limit only in Zigbee mode."},{id:"aqara_fp400",name:"Aqara Spatial Multi Sensor FP400",manufacturer:"Aqara",match:["fp400","ps-s05d","spatial multi sensor"],tech:"mmwave",fov_h:120,fov_v:null,reach:10,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:{fov:120,reach:4},verified:!0,source:"https://www.aqara.com/en/product/spatial-multi-sensor-fp400/",note:"Side mounting covers about 10 m deep \xD7 8 m wide, corner 7 \xD7 7 m; ceiling 3\u20134 m recommended."},{id:"aqara_p1",name:"Aqara Motion Sensor P1",manufacturer:"Aqara",match:["motion sensor p1","rtcgq14lm","ms-s02"],tech:"pir",fov_h:150,fov_v:null,reach:7,reach_static:0,mounts:["wall","corner","ceiling"],ceiling:null,verified:!0,source:"https://www.aqara.com/en/product/motion-sensor-p1/",note:"170\xB0 up to 2 m, 150\xB0 up to 7 m. PIR: detects motion only, no stationary presence."},{id:"everything_presence_one",name:"Everything Presence One",manufacturer:"Everything Smart Technology",match:["everything presence one","everything-presence-one"],tech:"hybrid",fov_h:100,fov_v:40,reach:25,reach_static:null,mounts:["wall","corner"],ceiling:null,verified:!0,source:"https://shop.everythingsmart.io/products/everything-presence-one-kit",note:"mmWave 100\xB0 \xD7 40\xB0, 25 m; PIR 12 m."},{id:"switchbot_presence",name:"SwitchBot Presence Sensor",manufacturer:"SwitchBot",match:["switchbot presence"],tech:"mmwave",fov_h:120,fov_v:null,reach:8,reach_static:5,mounts:["wall","corner"],ceiling:null,verified:!0,source:"https://www.switch-bot.com/products/switchbot-presence-sensor",note:"8 m for moving, 5 m for stationary people."},{id:"aqara_fp2",name:"Aqara Presence Sensor FP2",manufacturer:"Aqara",match:["fp2","ps-s02"],tech:"mmwave",fov_h:120,fov_v:null,reach:8,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:{fov:120,reach:2},verified:!1,source:"https://www.123led.nl/pdf/LAQ00045.pdf",note:"Values from a copy of the manual hosted by a retailer, not from aqara.com."},{id:"aqara_fp1e",name:"Aqara Presence Sensor FP1E",manufacturer:"Aqara",match:["fp1e","ps-s03"],tech:"mmwave",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:{fov:120,reach:4},verified:!1,source:"https://123led.nl/pdf/LAQ00070_handleiding.pdf",note:"Values from a copy of the manual hosted by a retailer, not from aqara.com."},{id:"aqara_p2",name:"Aqara Motion and Light Sensor P2",manufacturer:"Aqara",match:["motion and light sensor p2","ml-s02"],tech:"pir",fov_h:150,fov_v:null,reach:7,reach_static:0,mounts:["wall","corner","ceiling"],ceiling:null,verified:!1,source:"https://www.domadoo.fr/en/smart-home-security-alarm/7048-aqara-matter-over-thread-aqara-motion-and-light-sensor-p2-6970504219656.html",note:"Retailer values (angle given as 120\xB0 or 170\xB0). PIR: motion only."},{id:"everything_presence_lite",name:"Everything Presence Lite",manufacturer:"Everything Smart Technology",match:["everything presence lite","everything-presence-lite"],tech:"mmwave",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner"],ceiling:null,verified:!1,source:"https://devices.esphome.io/devices/Everything-Presence-Lite",note:"Range from the vendor page, field of view from the LD2450 radar spec."},{id:"hue_motion_indoor",name:"Philips Hue Motion Sensor (indoor)",manufacturer:"Signify",match:["hue motion sensor","sml001","sml003"],tech:"pir",fov_h:100,fov_v:null,reach:5,reach_static:0,mounts:["wall","corner","ceiling"],ceiling:null,verified:!1,source:"https://www.philips-hue.com/en-us/p/hue-motion-sensor/046677570972",note:"Retailer values (100\xB0 or 120\xB0). PIR: motion only."},{id:"apollo_msr2",name:"Apollo MSR-2",manufacturer:"Apollo Automation",match:["msr-2","msr2"],tech:"mmwave",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:null,verified:!1,source:"https://wiki.apolloautomation.com/products/general/mmwave-presence-sensor-comparison/",note:"LD2410B radar, 6 m; angle not stated by the vendor."},{id:"apollo_mtr1",name:"Apollo MTR-1",manufacturer:"Apollo Automation",match:["mtr-1","mtr1"],tech:"mmwave",fov_h:120,fov_v:null,reach:6,reach_static:null,mounts:["wall","corner"],ceiling:null,verified:!1,source:"https://wiki.apolloautomation.com/products/general/mmwave-presence-sensor-comparison/",note:"LD2450 radar, 6 m; 120\xB0 from the radar spec, not the vendor."},{id:"custom",name:"Custom",manufacturer:"",match:[],tech:"mmwave",fov_h:120,fov_v:90,reach:6,reach_static:null,mounts:["wall","corner","ceiling"],ceiling:null,verified:!1,source:"",note:"Your own values."}]};var bi=Math.PI/180,Js=180/Math.PI,Yi=(i,t)=>Math.hypot(t[0]-i[0],t[1]-i[1]),Zi=(i,t,e)=>i<t?t:i>e?e:i,Me=i=>Math.round(i*1e4)/1e4,nd=i=>(i%360+360)%360;function we(i,t,e){let n=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){let o=e[s][0],a=e[s][1],l=e[r][0],c=e[r][1];a>t!=c>t&&i<(l-o)*(t-a)/(c-a)+o&&(n=!n)}return n}var id=(i,t)=>we(i[0],i[1],t),fl=(i,t,e)=>(t[0]-i[0])*(e[1]-i[1])-(t[1]-i[1])*(e[0]-i[0]);function pl(i,t,e,n,s,r,o,a){let l=o-s,c=a-r;if((l*(t-r)-c*(i-s))*(l*(n-r)-c*(e-s))>=0)return!1;let h=e-i,d=n-t;return h*(r-t)-d*(s-i)>=0!=h*(a-t)-d*(o-i)>=0}function ml(i,t,e,n,s,r=0){let o=s*bi,a=Math.cos(o),l=Math.sin(o),c=e/2+r,h=n/2+r;return[[-c,-h],[c,-h],[c,h],[-c,h]].map(([d,u])=>[i+d*a-u*l,t+d*l+u*a])}function gl(i,t,e){let n=Yi(i,t)||1,s=-(t[1]-i[1])/n*(e/2),r=(t[0]-i[0])/n*(e/2);return[[i[0]+s,i[1]+r],[t[0]+s,t[1]+r],[t[0]-s,t[1]-r],[i[0]-s,i[1]-r]]}function mg(i){let t=0;for(let e=0;e<i.length;e++){let n=i[e],s=i[(e+1)%i.length];t+=n[0]*s[1]-s[0]*n[1]}return t/2}function sd(i,t,e,n){let s=n[0]-e[0],r=n[1]-e[1],o=s*s+r*r,a=o>0?((i-e[0])*s+(t-e[1])*r)/o:0;return a=Zi(a,0,1),Math.hypot(i-(e[0]+s*a),t-(e[1]+r*a))}function _l(i){let t=mg(i)>=0?1:-1,e=i.length,n=new Float64Array(e),s=new Float64Array(e),r=new Float64Array(e),o=new Float64Array(e),a=1/0,l=-1/0,c=1/0,h=-1/0;for(let d=0;d<e;d++){let u=i[d],f=i[(d+1)%e];n[d]=f[0]-u[0],s[d]=f[1]-u[1],r[d]=u[0],o[d]=u[1],a=Math.min(a,u[0]),l=Math.max(l,u[0]),c=Math.min(c,u[1]),h=Math.max(h,u[1])}return{n:e,s:t,ex:n,ez:s,px:r,pz:o,x0:a,x1:l,z0:c,z1:h}}function xl(i,t,e,n,s,r){if(Math.max(t,n)<i.x0||Math.min(t,n)>i.x1||Math.max(e,s)<i.z0||Math.min(e,s)>i.z1)return!1;let o=n-t,a=s-e,l=0,c=1,h=1;for(let d=0;d<i.n;d++){let u=i.s*(i.ex[d]*(e-i.pz[d])-i.ez[d]*(t-i.px[d])),f=i.s*(i.ex[d]*a-i.ez[d]*o);if(u<0&&(h=0),f===0){if(u<0)return!1}else{let g=-u/f;if(f>0?g>l&&(l=g):g<c&&(c=g),l>c)return!1}}return r[0]=l,r[1]=c,r[2]=h,!0}var rd=25,od=6,ad=10,pn=.005,gg=.9,_g=["lamp","led_strip","shower","plant","rug","coat_rack"];function xg(i){let t=String(i||"");return t==="bed"||t==="bunk_bed"?{name:"bed",grow:0,ring:!1,height:.5}:t.startsWith("sofa")||t==="armchair"?{name:"sofa",grow:0,ring:!1,height:.9}:t==="desk"?{name:"desk",grow:.5,ring:!1,height:.9}:t.startsWith("table")?{name:"dining",grow:.45,ring:!1,height:.9}:["kitchen","worktop","sink","stove"].includes(t)?{name:"kitchen",grow:.6,ring:!0,height:1.3}:t==="wc"?{name:"wc",grow:.3,ring:!1,height:.9}:t==="shower"?{name:"shower",grow:0,ring:!1,height:1.3}:t==="bathtub"?{name:"bathtub",grow:0,ring:!1,height:1.3}:t==="washbasin"?{name:"washbasin",grow:.5,ring:!0,height:1.3}:null}function vg(i){let t=String(i.type||"");return(i.h||0)>=1.5&&!t.startsWith("lamp")&&!_g.includes(t)}var yg=i=>{let t=s=>Math.round(s*200)/200,e=[t(i.a[0]),t(i.a[1])],n=[t(i.b[0]),t(i.b[1])];return e[0]<n[0]||e[0]===n[0]&&e[1]<n[1]?`${e}|${n}`:`${n}|${e}`};function Kr(i,t){let e=(i.floors||[]).find(E=>E.id===t)||(t==null?(i.floors||[])[0]:null);if(!e)throw new Error(`floor not found: ${t}`);let n=i.settings||{},s=n.wall_exterior||.24,r=n.wall_interior||.12,o=e.height||2.6,a=(e.rooms||[]).filter(E=>(E.points||[]).length>=3),l=a.map(E=>({id:E.id,name:E.name??E.id,area_id:E.area_id??null,points:E.points.map(z=>[z[0],z[1]]),height:E.ceiling_height||o})),c=[];l.forEach(E=>E.points.forEach(z=>c.push(z)));let h=[];a.forEach((E,z)=>{let H=l[z].points;for(let N=0;N<H.length;N++){let X=H[N],F=H[(N+1)%H.length],tt=Yi(X,F);if(tt<1e-6)continue;let J=(F[0]-X[0])/tt,ct=(F[1]-X[1])/tt,pt=[0,tt];for(let Z of c){let rt=Z[0]-X[0],nt=Z[1]-X[1],mt=rt*J+nt*ct;Math.abs(rt*ct-nt*J)<pn&&mt>pn&&mt<tt-pn&&pt.push(mt)}pt.sort((Z,rt)=>Z-rt);let Et=(E.wall_thickness||[])[N],V=(E.wall_heights||[])[N];for(let Z=0;Z<pt.length-1;Z++){if(pt[Z+1]-pt[Z]<pn)continue;let rt=(pt[Z]+pt[Z+1])/2,nt=-ct,mt=J;id([X[0]+J*rt+nt*.02,X[1]+ct*rt+mt*.02],H)||(nt=-nt,mt=-mt),h.push({a:Z===0?[X[0],X[1]]:[X[0]+J*pt[Z],X[1]+ct*pt[Z]],b:Z===pt.length-2?[F[0],F[1]]:[X[0]+J*pt[Z+1],X[1]+ct*pt[Z+1]],room:E.id,edge:N,t0:pt[Z],t1:pt[Z+1],n:[nt,mt],u:[J,ct],thick:Et,noWall:V===0})}}});let d=new Map;for(let E of h)E.key=yg(E),d.has(E.key)||d.set(E.key,[]),d.get(E.key).push(E);let u=[],f=[],g=[];for(let E of d.values()){let z=new Set(E.map(J=>J.room)).size>1,H=z?r:s,N=Math.max(...E.map(J=>typeof J.thick=="number"&&J.thick>0?J.thick:H)),X=E.some(J=>J.noWall);for(let J of E)J.shared=z,J.wallT=X?0:N;if(X)continue;let F=E[0];z?u.push(gl(F.a,F.b,N)):u.push([F.a,F.b,[F.b[0]-F.n[0]*N,F.b[1]-F.n[1]*N],[F.a[0]-F.n[0]*N,F.a[1]-F.n[1]*N]]);let tt=!z||N>=.2-1e-9?"block":N>=.1-1e-9?"brick":"thin";g.push({a:F.a,b:F.b,k:tt,t:N,shared:z})}for(let E of h){if(E.noWall)continue;let z=E.shared?E.wallT/2:0;f.push({a:[E.a[0]+E.n[0]*z,E.a[1]+E.n[1]*z],b:[E.b[0]+E.n[0]*z,E.b[1]+E.n[1]*z],n:E.n,room:E.room,edge:E.edge,t0:E.t0,t1:E.t1,shared:E.shared,off:z})}let _=Object.fromEntries(l.map(E=>[E.id,E])),m=Object.fromEntries(a.map(E=>[E.id,E])),p=[],b=[],x=[];for(let E of e.openings||[]){let z=_[E.room_id];if(!z||!m[E.room_id])continue;let H=z.points,N=H[E.edge],X=H[(E.edge+1)%H.length];if(!N||!X)continue;let F=Yi(N,X),tt=(X[0]-N[0])/F,J=(X[1]-N[1])/F,ct=E.offset-E.width/2,pt=E.offset+E.width/2,Et=[N[0]+tt*ct,N[1]+J*ct],V=[N[0]+tt*pt,N[1]+J*pt],Z=h.find(St=>St.room===z.id&&St.edge===E.edge&&E.offset>=St.t0-1e-6&&E.offset<=St.t1+1e-6)||{},rt=Z.n||[-J,tt],nt=Z.wallT||r,mt=!!Z.shared;if(E.type==="window")p.push({id:E.id,a:Et,b:V,n:rt,exterior:!mt,room:z.id,sill:E.sill??.9,height:E.height??1.3,t:mt?0:nt}),mt||x.push({a:Et,b:V,n:rt,sill:E.sill??.9,height:E.height??1.3});else{let St=E.swing==="out"?-1:1,Lt=E.hinge==="right"?V:Et,ne=E.hinge==="right"?Et:V,Ht=[Lt[0]+rt[0]*E.width*St,Lt[1]+rt[1]*E.width*St],fe=[(Et[0]+V[0])/2,(Et[1]+V[1])/2];b.push({id:E.id,a:Et,b:V,hinge:Lt,tip:Ht,other:ne,w:E.width,rooms:[z.id],contact:E.contact??null,outside:!mt,mid:fe,room:z.id,swing:E.swing||"in",sill:E.sill??0,height:E.height??2,t:nt});for(let U=g.length-1;U>=0;U--){let _e=g[U],kt=Yi(Et,V)||1;if(Math.abs(fl(Et,V,_e.a))/kt>pn||Math.abs(fl(Et,V,_e.b))/kt>pn)continue;let $t=(_e.a[0]-Et[0])*tt+(_e.a[1]-Et[1])*J,Tt=(_e.b[0]-Et[0])*tt+(_e.b[1]-Et[1])*J,te=Math.min($t,Tt),At=Math.max($t,Tt);if(At<=pn||te>=kt-pn)continue;g.splice(U,1);let A=y=>[Et[0]+tt*y,Et[1]+J*y];te<-pn&&g.push({..._e,a:A(te),b:[Et[0],Et[1]]}),At>kt+pn&&g.push({..._e,a:A(kt),b:A(At)})}}}for(let E of b){let z=Yi(E.a,E.b)||1,H=-(E.b[1]-E.a[1])/z,N=(E.b[0]-E.a[0])/z;E.rooms=l.filter(X=>we(E.mid[0]+H*.3,E.mid[1]+N*.3,X.points)||we(E.mid[0]-H*.3,E.mid[1]-N*.3,X.points)).map(X=>X.id)}let v=(e.walls||[]).map(E=>({id:E.id,poly:gl(E.a,E.b,E.thickness||r),height:E.height??null,block:E.height==null||E.height>=1.5})),C=(e.furniture||[]).map(E=>({id:E.id,type:E.type,poly:ml(E.x,E.z,E.w||.3,E.d||.3,E.rotation||0),h:E.h||0,obstacle:vg(E)})),T=[];(e.furniture||[]).forEach((E,z)=>{let H=xg(E.type);if(!H)return;let N=l.find(X=>we(E.x,E.z,X.points));N&&T.push({name:H.name,room:N.id,height:H.height,outer:ml(E.x,E.z,E.w||.3,E.d||.3,E.rotation||0,H.grow),inner:H.ring?C[z].poly:null})});let R=[];for(let E of b)for(let z of E.rooms)R.push({name:"entry",room:z,height:1.3,center:E.mid,radius:gg,door:E.id});let I=[...u.flat(),...l.flatMap(E=>E.points),...(e.outdoor||[]).flatMap(E=>E.points||[])],S=I.map(E=>E[0]),M=I.map(E=>E[1]),P={x0:Math.min(...S)-.4,x1:Math.max(...S)+.4,z0:Math.min(...M)-.4,z1:Math.max(...M)+.4},L={floor:{id:e.id,name:e.name??e.id,height:o},rooms:l,bands:u,faces:f,segments:g,doors:b,windows:p,glass:x,freeWalls:v,furniture:C,zones:T,entryZones:R,cells:{},bounds:P,outdoor:e.outdoor||[]};return Object.defineProperty(L,"subs",{value:h,enumerable:!1}),L.cells["0.1"]=Zr(L,.1),L.cells["0.2"]=Zr(L,.2),L}function Zr(i,t){let e=[],n=[...i.bands.map(s=>({p:s,b:vl(s)})),...i.freeWalls.map(s=>({p:s.poly,b:vl(s.poly)}))];for(let s of i.rooms){let r=vl(s.points);for(let o=0;;o++){let a=r[0]+t*(o+.5);if(a>=r[1])break;for(let l=0;;l++){let c=r[2]+t*(l+.5);if(c>=r[3])break;if(!we(a,c,s.points))continue;let h=!1;for(let{p:d,b:u}of n)if(u[0]<=a&&a<=u[1]&&u[2]<=c&&c<=u[3]&&we(a,c,d)){h=!0;break}h||e.push({x:Math.round(a*1e6)/1e6,z:Math.round(c*1e6)/1e6,room:s.id})}}}return e}function vl(i){let t=1/0,e=-1/0,n=1/0,s=-1/0;for(let r of i)t=Math.min(t,r[0]),e=Math.max(e,r[0]),n=Math.min(n,r[1]),s=Math.max(s,r[1]);return[t,e,n,s]}function Jr(i,t){let e=String(t);return i.cells[e]||Object.defineProperty(i.cells,e,{value:Zr(i,t),enumerable:!1,writable:!0,configurable:!0}),i.cells[e]}var bl={heights:[.5,.9,1.3],doors:"open",thin_db:10,cell:.1};function js(i){let t={...bl,...i||{}};return(!Array.isArray(t.heights)||!t.heights.length)&&(t.heights=bl.heights),t}function Ki(i,t=Pn){let e=t.profiles||[],n=e.find(o=>o.id===i.profile)||e.find(o=>o.id==="custom")||e[0],s={...i};s.mount==null&&(s.mount=n.mounts&&n.mounts[0]||"wall");let r=s.mount==="ceiling"?n.ceiling:null;return s.fov_h==null&&(s.fov_h=r?r.fov:n.fov_h),s.reach==null&&(s.reach=r?r.reach:n.reach),s.fov_v==null&&(n.fov_v==null?(s.fov_v=t.default_fov_v??90,s.fov_v_assumed=!0):s.fov_v=n.fov_v),r&&s.ceiling_fov==null&&(s.ceiling_fov=r.fov),s.tilt==null&&(s.tilt=s.mount==="ceiling"?90:0),s.active==null&&(s.active=!0),s}function Ml(i){return i.fov_h!=null&&i.fov_v!=null&&i.reach!=null&&i.mount!=null?i:Ki(i,Pn)}var yl=1e-9;function jr(i){let t=Number(i.fov_h),e=Number(i.fov_v),n={x:Number(i.x),y:Number(i.height??1.9),z:Number(i.z),reach:Number(i.reach),ceiling:i.mount==="ceiling",degH:t/2,degV:e/2,degC:(i.ceiling_fov?Number(i.ceiling_fov):Math.max(t,e))/2,halfH:0,halfV:0,halfC:0,fx:0,fy:0,fz:0,rx:0,rz:0,ux:0,uy:0,uz:0,d:0};n.halfH=n.degH*bi,n.halfV=n.degV*bi,n.halfC=n.degC*bi;let s=(i.phi||0)*bi,r=(i.tilt||0)*bi,o=Math.cos(s),a=Math.sin(s),l=Math.cos(r),c=Math.sin(r);return n.fx=o*l,n.fy=-c,n.fz=a*l,n.rx=-a,n.rz=o,n.ux=o*c,n.uy=l,n.uz=a*c,n}function Qr(i,t,e,n){let s=Math.sqrt(t*t+e*e+n*n);if(i.d=s,s<1e-6)return 0;if(i.ceiling){let h=Math.acos(Zi(-e/s,-1,1));return h>i.halfC+yl?0:1-.4*Zi((h*Js-(i.degC-15))/15,0,1)}let r=t*i.fx+e*i.fy+n*i.fz;if(r<=0)return 0;let o=t*i.rx+n*i.rz,a=Math.abs(Math.atan2(o,r));if(a>i.halfH+yl)return 0;let l=t*i.ux+e*i.uy+n*i.uz,c=Math.abs(Math.atan2(l,Math.hypot(r,o)));return c>i.halfV+yl?0:(1-.4*Zi((a*Js-(i.degH-15))/15,0,1))*(1-.4*Zi((c*Js-(i.degV-10))/10,0,1))}function bg(i,t,e,n){if(t<=0||e>i.reach*t*n)return 0;let s=.58*i.reach;return e<=s?1:1-.4*(e-s)/(i.reach-s)}var ld=new WeakMap;function Qs(i,t){let e=js(t),n=typeof e.doors=="object"?JSON.stringify(e.doors):String(e.doors),s=`${e.thin_db}|${n}`,r=ld.get(i);if(r||ld.set(i,r=new Map),r.has(s))return r.get(s);let o=i.segments,a=o.length,l={n:a,ax:new Float64Array(a),az:new Float64Array(a),bx:new Float64Array(a),bz:new Float64Array(a),db:new Float64Array(a),x0:new Float64Array(a),x1:new Float64Array(a),z0:new Float64Array(a),z1:new Float64Array(a),doorSegs:[],blockers:[],obstacles:[]};o.forEach((c,h)=>{l.ax[h]=c.a[0],l.az[h]=c.a[1],l.bx[h]=c.b[0],l.bz[h]=c.b[1],l.db[h]=c.k==="block"?1/0:c.k==="brick"?rd:e.thin_db,l.x0[h]=Math.min(c.a[0],c.b[0]),l.x1[h]=Math.max(c.a[0],c.b[0]),l.z0[h]=Math.min(c.a[1],c.b[1]),l.z1[h]=Math.max(c.a[1],c.b[1])}),i.doors.forEach((c,h)=>{let d=e.doors==="open"?!0:e.doors==="closed"?!1:e.doors?.[c.id]!==!1;l.doorSegs.push({idx:h,id:c.id,ax:c.a[0],az:c.a[1],bx:c.b[0],bz:c.b[1],db:d?0:od})});for(let c of i.freeWalls)c.block&&l.blockers.push(_l(c.poly));for(let c of i.furniture)c.obstacle&&l.obstacles.push({P:_l(c.poly),h:c.h});return l.tmp=new Float64Array(3),r.set(s,l),l}function to(i,t,e,n,s){let r=0,o=Math.min(t,n),a=Math.max(t,n),l=Math.min(e,s),c=Math.max(e,s);for(let h=0;h<i.n;h++)if(!(i.x1[h]<o||i.x0[h]>a||i.z1[h]<l||i.z0[h]>c)&&pl(t,e,n,s,i.ax[h],i.az[h],i.bx[h],i.bz[h])){if(i.db[h]===1/0)return 1/0;r+=i.db[h]}for(let h of i.doorSegs)h.db&&pl(t,e,n,s,h.ax,h.az,h.bx,h.bz)&&(r+=h.db);for(let h of i.blockers)if(xl(h,t,e,n,s,i.tmp)&&!i.tmp[2])return 1/0;return r}function eo(i,t,e,n,s,r,o){let a=0;for(let l of i.obstacles){if(!xl(l.P,t,n,s,o,i.tmp)||i.tmp[2])continue;let c=e+(r-e)*i.tmp[0],h=e+(r-e)*i.tmp[1];Math.min(c,h)<l.h&&(a+=ad)}return a}var cd=new WeakMap;function no(i,t){let e=cd.get(i);if(e)return e;let n=i.length,s=new Float64Array(n),r=new Float64Array(n),o=new Int32Array(n),a=new Map(t.rooms.map((l,c)=>[l.id,c]));return i.forEach((l,c)=>{s[c]=l.x,r[c]=l.z,o[c]=a.get(l.room)}),e={n,x:s,z:r,room:o},cd.set(i,e),e}function wl(i,t,e,n,s,r,o,a){let l=a.length,c=o.length*l,h=new Float64Array(c),d=new Float64Array(c),u=new Float64Array(c),f=new Float64Array(c),g=new Int32Array(c),_=new Int8Array(c),m=0;for(let p=0;p<o.length;p++){let b=o[p],x=r.x[b],v=r.z[b],C=x-t,T=v-n;if(C*C+T*T>s*s)continue;let R=to(i,t,n,x,v);if(R!==1/0)for(let I=0;I<l;I++){let S=a[I],M=S-e;if(C*C+T*T+M*M>s*s)continue;let P=R+(i.obstacles.length?eo(i,t,e,n,x,S,v):0);h[m]=C,d[m]=M,u[m]=T,f[m]=P?Math.pow(10,-P/20):1,g[m]=b,_[m]=I,m++}}return{n:m,nH:l,vx:h,vy:d,vz:u,att:f,ci:g,hi:_}}function Sl(i,t,e){for(let n=0;n<i.n;n++){let s=Qr(t,i.vx[n],i.vy[n],i.vz[n]);e[n]=s?bg(t,s,t.d,i.att[n]):0}return e}function hd(i,t,e){for(let n of i.rooms)if(we(t,e,n.points))return n.id;return null}function io(i,t){let e=Ml(t);if(e.mount==="ceiling"||!i.glass.length)return 0;let n=Math.max(10,Number(e.fov_h)/2-10),s=e.phi||0,r=Number(e.reach),o=0;for(let a of i.glass)for(let l=0;l<=10;l++){let c=a.a[0]+(a.b[0]-a.a[0])*l/10,h=a.a[1]+(a.b[1]-a.a[1])*l/10,d=c-e.x,u=h-e.z,f=Math.hypot(d,u);f<.3||f>r||Math.abs((Math.atan2(u,d)*Js-s+540)%360-180)>n||(o+=Math.abs(d*a.n[0]+u*a.n[1])/f*(1-f/r)/11)}return o}var er=1.3,tr=i=>String(i);function Mg(i,t){return(t||[]).filter(e=>e.active!==!1&&(e.floor_id==null||e.floor_id===i.floor.id)).map(e=>Ml(e))}function El(i,t){let e=new Map,n=r=>{let o=`${r.name}|${r.room}`;e.has(o)||e.set(o,{name:r.name,room:r.room,height:r.height,parts:[]}),e.get(o).parts.push(r)};i.zones.forEach(n),i.entryZones.forEach(n);let s=[...e.values()];for(let r of s){r.idx=[];for(let o=0;o<t.length;o++){let a=t[o];if(a.room===r.room){for(let l of r.parts)if(l.center?Math.hypot(a.x-l.center[0],a.z-l.center[1])<l.radius:we(a.x,a.z,l.outer)&&!(l.inner&&we(a.x,a.z,l.inner))){r.idx.push(o);break}}}}return s}function nr(i,t,e){let n=js(e),s=Qs(i,n),r=Qs(i,{...n,doors:"open"}),o=Jr(i,n.cell),a=no(o,i),l=o.length,c=i.rooms.length,h=Mg(i,t),d=h.length,u=h.map(L=>jr(L)),f=h.map(L=>hd(i,L.x,L.z)),g=new Int32Array(l);for(let L=0;L<l;L++)g[L]=L;let _=new Map(i.rooms.map((L,E)=>[L.id,E])),m=f.map(L=>L==null?-1:_.get(L)),p=new Array(c).fill(0);for(let L=0;L<l;L++)p[a.room[L]]++;let b=new Map,x=(L,E)=>{let z=`${L}|${E.join(",")}`;if(b.has(z))return b.get(z);let H=u[L],N=E.length,X=wl(s,H.x,H.y,H.z,H.reach,a,g,E),F=Sl(X,H,new Float64Array(X.n)),tt=new Float32Array(l*N);for(let J=0;J<X.n;J++)F[J]>0&&(tt[X.ci[J]*N+X.hi[J]]=F[J]);return b.set(z,tt),tt},v=new Map,C=(L,E)=>{let z=`${L}|${E.join(",")}`;if(v.has(z))return v.get(z);let H=u[L],N=E.length,X=wl(r,H.x,H.y,H.z,H.reach,a,g,E),F=Sl(X,H,new Float64Array(X.n)),tt=new Float32Array(l*N);for(let J=0;J<X.n;J++)F[J]>0&&(tt[X.ci[J]*N+X.hi[J]]=F[J]);return v.set(z,tt),tt},T={},R={};h.forEach((L,E)=>{R[L.entity_id]={room:f[E],glass:Me(io(i,L)),spill:{}}});let I=h.map((L,E)=>C(E,[er])),S=i.rooms.map(()=>[]);for(let L=0;L<l;L++)S[a.room[L]].push(L);i.rooms.forEach((L,E)=>{let z=S[E],H=z.length,N=[];for(let V=0;V<d;V++)m[V]===E&&N.push(V);let X={},F={},tt=N.map(V=>x(V,n.heights));n.heights.forEach((V,Z)=>{if(!H){X[tr(V)]=0,F[tr(V)]=0;return}let rt=0,nt=0;for(let mt of z){let St=0;for(let Lt of tt){let ne=Lt[mt*n.heights.length+Z];ne>St&&(St=ne)}rt+=St,St>0&&nt++}X[tr(V)]=Me(rt/H),F[tr(V)]=Me(nt/H)});let J=Object.values(X),ct={},pt=new Uint8Array(H);for(let V=0;V<d;V++){if(m[V]===E)continue;let Z=0;z.forEach((nt,mt)=>{I[V][nt]>0&&(Z++,pt[mt]=1)});let rt=H?Me(Z/H):0;ct[h[V].entity_id]=rt,R[h[V].entity_id].spill[L.id]=rt}let Et=0;for(let V=0;V<H;V++)Et+=pt[V];T[L.id]={coverage:X,coverage_mean:J.length?Me(J.reduce((V,Z)=>V+Z,0)/J.length):0,seen:F,misfire_risk:H?Me(Et/H):0,from:ct,own_sensors:N.map(V=>h[V].entity_id)}});let M=[];for(let L of El(i,o)){if(!L.idx.length)continue;let E=_.get(L.room),z=[];for(let N=0;N<d;N++)m[N]===E&&z.push(x(N,[L.height]));let H=0;for(let N of L.idx)z.some(X=>X[N]>0)&&H++;M.push({name:L.name,room:L.room,height:L.height,share:Me(H/L.idx.length)})}let P={rooms:T,sensors:R,zones:M,grid:{}};if(n.grid)for(let L of n.heights){let E=[],z=n.heights.indexOf(L);i.rooms.forEach((H,N)=>{let X=[];for(let F=0;F<d;F++)m[F]===N&&X.push(F);for(let F of S[N]){let tt=0,J=null;for(let pt of X){let Et=x(pt,n.heights)[F*n.heights.length+z];Et>tt&&(tt=Et,J=h[pt].entity_id)}let ct=[];for(let pt=0;pt<d;pt++)m[pt]!==N&&C(pt,[L])[F]>0&&ct.push(h[pt].entity_id);E.push({x:Me(o[F].x),z:Me(o[F].z),room:H.id,own:Me(tt),own_sensor:J,spill:ct})}}),P.grid[tr(L)]=E}return P}var wg=.1,ir=.03,Ji=.5,Sg=1.9,Eg=10,ud=70,gd=10,dd=30,Ag=[-5,-2.5,2.5,5],Tg=20,Rg=.4,Cg=3,Pg=2,Ig=.3,Dg=3,Lg=["flur","hall","corridor","diele","entry","entrance","eingang","vorraum","lobby"],Ug=5;function Ng(i){let t=`${i.id??""} ${i.name??""}`.toLowerCase();return Lg.some(e=>t.includes(e))}var _d=(i,t,e)=>{let n=[];for(let s=i;s<=t;s+=e)n.push(s);return n};function fd(i,t,e,n){if(we(i,t,e))return!0;for(let s=0;s<e.length;s++)if(sd(i,t,e[s],e[(s+1)%e.length])<n)return!0;return!1}function Og(i,t,e,n,s){let r=e.heights.length?e.heights:[er],o=r.length,a=i.rooms.indexOf(t),l=[];for(let g=0;g<n.length;g++)s.room[g]===a&&l.push(g);let c=l.length,h=new Map;for(let g of l){let _=new Map;for(let m of r)_.set(m,[1/o,1/(c*o)]);h.set(g,_)}let d=c;for(let g of El(i,n)){if(g.room!==t.id)continue;let _=g.name==="entry"?Pg:Cg;d+=_*g.idx.length;for(let m of g.idx){let p=h.get(m);p.has(g.height)||p.set(g.height,[0,0]),p.get(g.height)[0]+=_}}d=d||1;let u={cx:[],cz:[],py:[],ws:[],wp:[]};for(let g of l)for(let[_,[m,p]]of h.get(g))u.cx.push(n[g].x),u.cz.push(n[g].z),u.py.push(_),u.ws.push(m/d),u.wp.push(p);let f={rooms:[],n:[],mult:[],cx:[],cz:[],sr:[]};return i.rooms.forEach((g,_)=>{if(g.id===t.id)return;let m=[];for(let b=0;b<n.length;b++)s.room[b]===_&&m.push(b);if(!m.length)return;let p=f.rooms.length;f.rooms.push(g.id),f.n.push(m.length),f.mult.push(Ng(g)?Dg:1);for(let b of m)f.cx.push(n[b].x),f.cz.push(n[b].z),f.sr.push(p)}),{own:u,spill:f}}function kg(i,t,e,n,s,r){let o=r*r,a=[],l=t.own,c=NaN,h=NaN,d=0;for(let g=0;g<l.cx.length;g++){let _=l.cx[g],m=l.cz[g],p=l.py[g],b=_-e,x=p-n,v=m-s,C=b*b+x*x+v*v;if(C>o||C<1e-12||((_!==c||m!==h)&&(d=to(i,e,s,_,m),c=_,h=m),d===1/0))continue;let T=d+eo(i,e,n,s,_,p,m),R=Math.pow(10,-T/20),I=Math.sqrt(C);I>r*R||a.push(b,x,v,I,R,l.ws[g],l.wp[g])}let u=[],f=t.spill;for(let g=0;g<f.cx.length;g++){let _=f.cx[g],m=f.cz[g],p=_-e,b=er-n,x=m-s,v=p*p+b*b+x*x;if(v>o||v<1e-12)continue;let C=to(i,e,s,_,m);if(C===1/0)continue;let T=C+eo(i,e,n,s,_,er,m),R=Math.pow(10,-T/20),I=Math.sqrt(v);I>r*R||u.push(p,b,x,I,R,f.sr[g])}return{own:a,spill:u}}function pd(i,t,e,n,s,r){let o={...n,phi:s},a=jr(o),l=a.reach,c=.58*l,h=l-c,d=0,u=0,f=e.own;for(let x=0;x<f.length;x+=7){let v=Qr(a,f[x],f[x+1],f[x+2]),C=f[x+3];if(!v||C>l*v*f[x+4])continue;let T=C<=c?1:1-.4*(C-c)/h;d+=f[x+5]*T,u+=f[x+6]*T}let g=new Array(t.spill.rooms.length).fill(0),_=e.spill;for(let x=0;x<_.length;x+=6){let v=Qr(a,_[x],_[x+1],_[x+2]);!v||_[x+3]>l*v*_[x+4]||g[_[x+5]]++}let m={},p=0;g.forEach((x,v)=>{if(!x)return;let C=x/t.spill.n[v];m[t.spill.rooms[v]]=C,p+=t.spill.mult[v]*C});let b=io(i,o);return{phi:nd(s),score:d-r*p-Ig*b,coverage:u,spill:m,glass:b}}function xd(i,t,e,n){if(!we(e,n,t.points))return!0;for(let s of i.bands){let r=vd(s);if(r[0]<=e&&e<=r[1]&&r[2]<=n&&n<=r[3]&&we(e,n,s))return!0}for(let s of i.freeWalls)if(fd(e,n,s.poly,.05))return!0;for(let s of[...i.doors,...i.windows]){let r=s.a,o=s.b,a=Math.hypot(o[0]-r[0],o[1]-r[1])||1,l=(o[0]-r[0])/a,c=(o[1]-r[1])/a,h=(e-r[0])*l+(n-r[1])*c,d=Math.abs((e-r[0])*c-(n-r[1])*l);if(h>=-.15&&h<=a+.15&&d<.5)return!0}for(let s of i.furniture)if(s.h>=1.5&&!String(s.type).startsWith("lamp")&&fd(e,n,s.poly,.08))return!0;return!1}function vd(i){let t=1/0,e=-1/0,n=1/0,s=-1/0;for(let r of i)t=Math.min(t,r[0]),e=Math.max(e,r[0]),n=Math.min(n,r[1]),s=Math.max(s,r[1]);return[t,e,n,s]}function Fg(i,t){let e=[],n=i.subs.filter(r=>r.room===t.id),s=t.points;for(let r=0;r<s.length;r++){let o=n.filter(h=>h.edge===r).sort((h,d)=>h.t0-d.t0);if(!o.length)continue;let a=s[r],l=o[0].u,c=o[o.length-1].t1;for(let h=0;;h++){let d=ir+wg*h;if(d>c-ir+1e-9)break;let u=o.find(p=>p.t0-1e-9<=d&&d<=p.t1+1e-9);if(!u||u.wallT<=0)continue;let f=(u.shared?u.wallT/2:0)+ir,g=a[0]+l[0]*d+u.n[0]*f,_=a[1]+l[1]*d+u.n[1]*f;if(xd(i,t,g,_))continue;let m=Math.atan2(u.n[1],u.n[0])*180/Math.PI;e.push({x:g,z:_,mount:"wall",phis:_d(-ud,ud,gd).map(p=>m+p)})}}return e}function zg(i,t){let e=[],n=t.points,s=n.length,r=0;for(let a=0;a<s;a++){let l=n[(a+s-1)%s];r+=l[0]*n[a][1]-n[a][0]*l[1]}let o=i.subs.filter(a=>a.room===t.id);for(let a=0;a<s;a++){let l=o.filter(R=>R.edge===(a+s-1)%s),c=o.filter(R=>R.edge===a);if(!l.length||!c.length)continue;let h=l.reduce((R,I)=>I.t1>R.t1?I:R),d=c.reduce((R,I)=>I.t0<R.t0?I:R);if(h.wallT<=0||d.wallT<=0)continue;let u=h.u,f=d.u;if((u[0]*f[1]-u[1]*f[0])*r<=0)continue;let g=h.n,_=d.n,m=g[0]*_[1]-g[1]*_[0];if(Math.abs(m)<.2)continue;let p=(h.shared?h.wallT/2:0)+ir,b=(d.shared?d.wallT/2:0)+ir,x=n[a],v=x[0]+(p*_[1]-b*g[1])/m,C=x[1]+(g[0]*b-_[0]*p)/m;if(xd(i,t,v,C))continue;let T=Math.atan2(g[1]+_[1],g[0]+_[0])*180/Math.PI;e.push({x:v,z:C,mount:"corner",phis:_d(-dd,dd,gd).map(R=>T+R)})}return e}function Bg(i,t){let e=[],[n,s,r,o]=vd(t.points);for(let a=Math.ceil(n/Ji-1e-9);a*Ji<=s;a++){let l=a*Ji;for(let c=Math.ceil(r/Ji-1e-9);c*Ji<=o;c++){let h=c*Ji;we(l,h,t.points)&&(i.bands.some(d=>we(l,h,d))||i.freeWalls.some(d=>we(l,h,d.poly))||e.push({x:l,z:h,mount:"ceiling",phis:[0]}))}}return e}var md=(i,t)=>t.best.score-i.best.score||i.cand.x-t.cand.x||i.cand.z-t.cand.z||i.best.phi-t.best.phi;function Al(i,t,e,n,s=1,r=Pn,o=null){let a=js(n),l=i.rooms.find(x=>x.id===t);if(!l)throw new Error(`room not found: ${t}`);let c=(r.profiles||[]).find(x=>x.id===e)||(r.profiles||[]).find(x=>x.id==="custom"),h=Qs(i,{...a,doors:"open"}),d=Jr(i,a.cell),u=no(d,i),f=Og(i,l,a,d,u),g=c.mounts||["wall"],_=[];g.includes("wall")&&_.push(...Fg(i,l)),g.includes("corner")&&_.push(...zg(i,l)),g.includes("ceiling")&&_.push(...Bg(i,l));let m=Math.min(Sg,l.height-.1),p=[];_.forEach((x,v)=>{let C=x.mount==="ceiling",T=C?l.height:m,R=C?90:Eg,I=Ki({entity_id:"candidate",profile:c.id,mount:x.mount,x:x.x,z:x.z,height:T,tilt:R,phi:0},r),S=kg(h,f,x.x,T,x.z,Number(I.reach)),M=null;for(let P of x.phis){let L=pd(i,f,S,I,P,s);(M===null||L.score>M.score+1e-12)&&(M=L)}p.push({cand:x,tpl:I,data:S,best:M,height:T,tilt:R}),o&&v%10===0&&o(.9*(v+1)/_.length)}),p.sort(md);for(let x of p.slice(0,Tg)){if(x.cand.mount==="ceiling")continue;let v=x.best;for(let C of Ag){let T=pd(i,f,x.data,x.tpl,v.phi+C,s);T.score>x.best.score+1e-12&&(x.best=T)}}p.sort(md);let b=[];for(let x of p){let v=x.cand;if(b.some(R=>Math.hypot(v.x-R.x,v.z-R.z)<Rg))continue;let C=x.best,T={};for(let[R,I]of Object.entries(C.spill))T[R]=Me(I);if(b.push({x:Me(v.x),z:Me(v.z),height:Me(x.height),phi:Math.round(C.phi*100)/100,tilt:x.tilt,mount:v.mount,score:Me(C.score),coverage:Me(C.coverage),spill:T,glass:Me(C.glass)}),b.length>=Ug)break}return o&&o(1),b}var Kn=Math.PI/180;function Vg(i,t,e=0){return[i,e,t]}var Jn=(i,t)=>[i[0]+t[0],i[1]+t[1],i[2]+t[2]],yd=(i,t)=>[i[0]-t[0],i[1]-t[1],i[2]-t[2]],on=(i,t)=>[i[0]*t,i[1]*t,i[2]*t],ji=(i,t)=>i[0]*t[0]+i[1]*t[1]+i[2]*t[2],Cl=(i,t)=>[i[1]*t[2]-i[2]*t[1],i[2]*t[0]-i[0]*t[2],i[0]*t[1]-i[1]*t[0]],ro=i=>{let t=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/t,i[1]/t,i[2]/t]};function Pl(i){return Vg(i.x,i.z,i.height??1.9)}function Md(i){let t=(i.phi??0)*Kn,e=(i.tilt??0)*Kn,n=[Math.cos(t)*Math.cos(e),-Math.sin(e),Math.sin(t)*Math.cos(e)],s=[-Math.sin(t),0,Math.cos(t)],r=Cl(s,n);return{f:n,r:s,u:r}}function wd(i){let t=Md(i.mount==="ceiling"?{...i,tilt:90}:i);return{x:t.r,y:t.u,z:on(t.f,-1)}}function $g(i,t,e){let n=t*Kn,s=e*Kn,r=Math.cos(s);return ro(Jn(Jn(on(i.f,r*Math.cos(n)),on(i.r,r*Math.sin(n))),on(i.u,Math.sin(s))))}function Tl(i,t,e,n=0,s=1/0){let r=e;return t[1]<-1e-9&&Number.isFinite(n)&&(r=Math.min(r,Math.max(0,(i[1]-n)/-t[1]))),t[1]>1e-9&&Number.isFinite(s)&&(r=Math.min(r,Math.max(0,(s-i[1])/t[1]))),r}function Sd(i,t={}){let e=t.yMin??0,n=t.yMax??1/0,s=t.segments??28,r=Pl(i),o=i.reach>0?i.reach:5,a=i.fov_h>0?i.fov_h:90,l=i.fov_v>0?i.fov_v:90;if(i.mount==="ceiling"){let p=i.ceiling_fov>0?i.ceiling_fov:Math.max(a,l),b=Math.min(p/2,89)*Kn,x=[r];for(let S=0;S<s;S++){let M=S/s*2*Math.PI,P=[Math.sin(b)*Math.cos(M),-Math.cos(b),Math.sin(b)*Math.sin(M)];x.push(Jn(r,on(P,Tl(r,P,o,e,n))))}let v=Tl(r,[0,-1,0],o,e,n);x.push(Jn(r,[0,-v,0]));let C=x.length-1,T=[];for(let S=0;S<s;S++){let M=(S+1)%s;T.push(0,1+M,1+S),T.push(C,1+S,1+M)}let R=[],I=4;for(let S=0;S<I;S++){let M=x[1+Math.round(S/I*s)%s];R.push(...r,...M)}for(let S=0;S<s;S++)R.push(...x[1+S],...x[1+(S+1)%s]);return{apex:r,corners:x.slice(1,1+s),positions:x.flat(),indices:T,edges:R}}let c=Md(i),h=Math.min(a/2,89),d=Math.min(l/2,89),f=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([p,b])=>{let x=$g(c,p*h,b*d);return Jn(r,on(x,Tl(r,x,o,e,n)))}),g=[r,...f],_=[0,1,2,0,2,3,0,3,4,0,4,1,1,3,2,1,4,3],m=[];for(let p=0;p<4;p++)m.push(...r,...f[p]),m.push(...f[p],...f[(p+1)%4]);return{apex:r,corners:f,positions:g.flat(),indices:_,edges:m}}function Ed(i){let t=[];for(let e of i||[]){let n=t[t.length-1];(!n||Math.abs(n[0]-e[0])>1e-9||Math.abs(n[1]-e[1])>1e-9)&&t.push([e[0],e[1]])}for(;t.length>1&&Math.abs(t[0][0]-t[t.length-1][0])<1e-9&&Math.abs(t[0][1]-t[t.length-1][1])<1e-9;)t.pop();return t}function Il(i){let t=0;for(let e=0;e<i.length;e++){let[n,s]=i[e],[r,o]=i[(e+1)%i.length];t+=n*o-r*s}return t/2}function Hg(i,t,e,n){let s=(i[0]-e[0])*(t[1]-e[1])-(t[0]-e[0])*(i[1]-e[1]),r=(i[0]-n[0])*(e[1]-n[1])-(e[0]-n[0])*(i[1]-n[1]),o=(i[0]-t[0])*(n[1]-t[1])-(n[0]-t[0])*(i[1]-t[1]),a=s<-1e-12||r<-1e-12||o<-1e-12,l=s>1e-12||r>1e-12||o>1e-12;return!(a&&l)}function Gg(i){let t=i.length;if(t<3)return[];let e=[...Array(t).keys()];Il(i)<0&&e.reverse();let n=[],s=0;for(;e.length>3&&s++<t*t;){let r=!1;for(let o=0;o<e.length;o++){let a=e[(o-1+e.length)%e.length],l=e[o],c=e[(o+1)%e.length],h=i[a],d=i[l],u=i[c];if((d[0]-h[0])*(u[1]-h[1])-(d[1]-h[1])*(u[0]-h[0])<=1e-12)continue;let g=!0;for(let _ of e){if(_===a||_===l||_===c)continue;let m=i[_];if(Hg(m,h,d,u)){g=!1;break}}if(g){n.push([a,l,c]),e.splice(o,1),r=!0;break}}r||(n.push([e[0],e[1],e[2]]),e.splice(1,1))}return e.length===3&&n.push([e[0],e[1],e[2]]),n.filter(([r,o,a])=>{let l=i[r],c=i[o],h=i[a];return Math.abs((c[0]-l[0])*(h[1]-l[1])-(c[1]-l[1])*(h[0]-l[0]))>1e-12})}function sr(i,t,e){let n=Ed(i);if(n.length<3)return{positions:[],indices:[]};Il(n)<0&&n.reverse();let s=[],r=[],o=Gg(n),a=Math.abs(e-t)<1e-9,l=s.length/3;for(let h of n)s.push(h[0],e,h[1]);for(let[h,d,u]of o)r.push(l+h,l+u,l+d);if(a)return{positions:s,indices:r};let c=s.length/3;for(let h of n)s.push(h[0],t,h[1]);for(let[h,d,u]of o)r.push(c+h,c+d,c+u);for(let h=0;h<n.length;h++){let d=(h+1)%n.length,u=s.length/3;s.push(n[h][0],t,n[h][1],n[d][0],t,n[d][1],n[d][0],e,n[d][1],n[h][0],e,n[h][1]),r.push(u,u+2,u+1,u,u+3,u+2)}return{positions:s,indices:r}}function Mi(i){let t=[],e=[];for(let n of i){let s=t.length/3;for(let r of n.positions)t.push(r);for(let r of n.indices)e.push(r+s)}return{positions:t,indices:e}}function so(i,t,e,n){let s=n==="le"?1:-1,r=a=>s*(a[0]*t[0]+a[1]*t[1]-e),o=[];for(let a=0;a<i.length;a++){let l=i[a],c=i[(a+1)%i.length],h=r(l),d=r(c);if(h<=0&&o.push(l),h<0&&d>0||h>0&&d<0){let u=h/(h-d);o.push([l[0]+(c[0]-l[0])*u,l[1]+(c[1]-l[1])*u])}}return o}function Wg(i,t,e=.02){let n=!1;for(let s=0,r=t.length-1;s<t.length;r=s++){let[o,a]=t[s],[l,c]=t[r];a>i[1]!=c>i[1]&&i[0]<(l-o)*(i[1]-a)/(c-a)+o&&(n=!n)}if(n)return!0;for(let s=0;s<t.length;s++){let r=t[s],o=t[(s+1)%t.length],a=o[0]-r[0],l=o[1]-r[1],c=a*a+l*l||1,h=Math.max(0,Math.min(1,((i[0]-r[0])*a+(i[1]-r[1])*l)/c));if(Math.hypot(i[0]-(r[0]+a*h),i[1]-(r[1]+l*h))<=e)return!0}return!1}function Xg(i,t,e){let n=Ed(i),s=[{poly:n,y0:0,y1:e}];for(let r of t){let o=[(r.a[0]+r.b[0])/2,(r.a[1]+r.b[1])/2];if(!Wg(o,n,.03))continue;let a=Math.hypot(r.b[0]-r.a[0],r.b[1]-r.a[1]);if(a<1e-6)continue;let l=[(r.b[0]-r.a[0])/a,(r.b[1]-r.a[1])/a],c=r.a[0]*l[0]+r.a[1]*l[1],h=r.b[0]*l[0]+r.b[1]*l[1],d=[],u=(f,g,_)=>{f.length>=3&&Math.abs(Il(f))>1e-6&&_-g>1e-6&&d.push({poly:f,y0:g,y1:_})};for(let f of s){u(so(f.poly,l,c,"le"),f.y0,f.y1),u(so(f.poly,l,h,"ge"),f.y0,f.y1);let g=so(so(f.poly,l,c,"ge"),l,h,"le");r.y0>f.y0&&u(g,f.y0,Math.min(r.y0,f.y1)),r.y1<f.y1&&u(g,Math.max(r.y1,f.y0),f.y1)}s=d}return s}function qg(i,t,e,n){return{positions:[i[0],e,i[1],t[0],e,t[1],t[0],n,t[1],i[0],n,i[1]],indices:[0,1,2,0,2,3]}}function Ad(i,t={}){let e=i?.floor?.height>0?i.floor.height:2.6,n=t.cutY>0?Math.min(t.cutY,e):e,s=e,r=i?.doors||[],o=i?.windows||[],a=[...r.map(_=>({a:_.a,b:_.b,y0:_.sill??0,y1:Math.min(s,(_.sill??0)+(_.height??2))})),...o.map(_=>{let m=_.sill??.9;return{a:_.a,b:_.b,y0:m,y1:Math.min(s,m+(_.height??1.1))}})],l=[];for(let _ of i?.rooms||[])l.push(sr(_.points,-.05,0));let c=[];for(let _ of i?.bands||[])for(let m of Xg(_,a,s))m.y0>=n-1e-6||c.push(sr(m.poly,m.y0,Math.min(m.y1,n)));let h=[];for(let _ of i?.freeWalls||[])h.push(sr(_.poly,0,Math.min(_.height??s,n)));let d=[],u=[];for(let _ of i?.furniture||[])(_.obstacle?u:d).push(sr(_.poly,0,Math.min(_.h??.5,n)));let f=o.map((_,m)=>({w:_,o:a[r.length+m]})).filter(({o:_})=>_.y0<n-1e-6).map(({w:_,o:m})=>qg(_.a,_.b,m.y0,Math.min(m.y1,n))),g=r.map(_=>{let m=_.b[0]-_.a[0],p=_.b[1]-_.a[1],b=Math.hypot(m,p)||1,x=-p/b*.06,v=m/b*.06;return sr([[_.a[0]-x,_.a[1]-v],[_.b[0]-x,_.b[1]-v],[_.b[0]+x,_.b[1]+v],[_.a[0]+x,_.a[1]+v]],0,.012)});return{wallHeight:s,cutY:n,floors:Mi(l),walls:Mi(c),freeWalls:Mi(h),furniture:Mi(d),obstacles:Mi(u),windows:Mi(f),thresholds:Mi(g)}}function Td(i,t={}){let e=i&&Number.isFinite(i.x1-i.x0)?i:{x0:0,x1:10,z0:0,z1:10},n=(t.fov??40)*Kn,s=t.aspect>0?t.aspect:1.5,r=t.height??2.6,o=Math.max(e.x1-e.x0,1),a=Math.max(e.z1-e.z0,1),l=(e.x0+e.x1)/2,c=(e.z0+e.z1)/2,h=Math.tan(n/2),d=h*s,u,f,g;if(t.view==="top")u=[l,0,c],f=[0,1,1e-4],g=Math.max(a/2/h,o/2/d)*1.08+r;else{u=[l,r*.25,c];let p=50*Kn,b=20*Kn;f=[Math.sin(b)*Math.cos(p),Math.sin(p),Math.cos(b)*Math.cos(p)];let x=ro(f),v=ro(Cl(on(x,-1),[0,1,0])),C=Cl(v,on(x,-1)),T=Math.max(0,Math.min(t.inset??0,(o-1)/2,(a-1)/2)),R=[];for(let I of[e.x0+T,e.x1-T])for(let S of[e.z0+T,e.z1-T])for(let M of[0,r])R.push([I,M,S]);for(let I=0;I<6;I++){g=0;for(let H of R){let N=yd(H,u),X=ji(N,x);g=Math.max(g,X+Math.abs(ji(N,v))/d,X+Math.abs(ji(N,C))/h)}let S=1/0,M=-1/0,P=1/0,L=-1/0;for(let H of R){let N=yd(H,u),X=g-ji(N,x),F=ji(N,v)/X/d,tt=ji(N,C)/X/h;S=Math.min(S,F),M=Math.max(M,F),P=Math.min(P,tt),L=Math.max(L,tt)}let E=(S+M)/2*d*g,z=(P+L)/2*h*g;if(Math.abs(E)<1e-4&&Math.abs(z)<1e-4)break;u=Jn(u,Jn(on(v,E),on(C,z)))}g*=1.04}let _=ro(f),m=Jn(u,on(_,g));return{target:u,position:m,distance:g,near:Math.max(.05,g/200),far:g*12+50,minDistance:.5,maxDistance:g*4}}function Rd(i,t,e=.05){return!i||!t?!0:["x0","x1","z0","z1"].some(n=>Math.abs(i[n]-t[n])>e)}var Rl=["#2f7de1","#e8832a","#2aa876","#a05bd6","#d6477c","#c9a400","#17a2b8","#7a8794"],bd={light:{background:"#eef1f4",floor:"#dde2e8",wall:"#b7bfc9",freeWall:"#98a2ae",furniture:"#8d9bb0",obstacle:"#6f819b",window:"#8ec9ff",door:"#c99a55",spill:"#e5484d",sensorBody:"#2b3138",selected:"#f59f00",inactive:"#9aa3ad"},dark:{background:"#12161b",floor:"#242b34",wall:"#4b5666",freeWall:"#5f6b7c",furniture:"#7a89a0",obstacle:"#94a4bd",window:"#4f9fe0",door:"#b98a4a",spill:"#ff6b6b",sensorBody:"#d8dee6",selected:"#ffc53d",inactive:"#6b7480"}};function Cd(i){return i?bd.dark:bd.light}function jn(i){if(typeof i!="string")return null;let t=i.trim().toLowerCase(),e=/^#([0-9a-f]{3})$/.exec(t);return e?[...e[1]].map(n=>parseInt(n+n,16)):(e=/^#([0-9a-f]{6})(?:[0-9a-f]{2})?$/.exec(t),e?[0,2,4].map(n=>parseInt(e[1].slice(n,n+2),16)):(e=/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(t),e?[e[1],e[2],e[3]].map(n=>Math.max(0,Math.min(255,Math.round(Number(n))))):null))}function Yg(i,t){for(let e of["colour_index","color_index","colourIndex","colorIndex","colour","color"])if(Number.isInteger(i?.[e])&&i[e]>=0)return i[e];return t}function Dl(i,t){let e=Array.isArray(i)&&i.length?i:Rl,n=jn(e[t%e.length]);return n||jn(Rl[t%Rl.length])}function Ll(i,t,e){if(i&&typeof i=="object"&&!Array.isArray(i)){let n=jn(i[t?.entity_id]);if(n)return n}return Dl(Array.isArray(i)?i:null,Yg(t,e))}function Ul(i,t){let e=new Map;return(i||[]).forEach((n,s)=>e.set(n.entity_id,Ll(t,n,s))),e}function Pd(i,t=.2){let e=i>0?i:2.6,n=[];for(let s=t/2;s<e-.05;s+=t)n.push(Math.round(s*1e3)/1e3);return n}function Id(i,t={}){let e=i?.grid||{},n=(i?.heights||Object.keys(e).map(Number)).filter(u=>Number.isFinite(u)).sort((u,f)=>u-f),s=t.maxY??1/0,r=t.fadeColor||[255,255,255],o=t.spillColor||[229,72,77],a=t.selected||null,l=t.colorFor||(()=>[31,95,153]),c=(u,f)=>[0,1,2].map(g=>Math.round(r[g]+(u[g]-r[g])*f)),h=[],d=[];for(let u of n)if(!(u>s+1e-6))for(let f of e[String(u)]||[]){let g=f.spill&&f.spill.length>0,_=f.own>0&&f.own_sensor;if(!g&&!_)continue;let m;if(g)m=a&&!f.spill.includes(a)?c(o,.25):o;else{let p=.35+.65*Math.min(1,f.own);m=c(l(f.own_sensor),a&&f.own_sensor!==a?p*.25:p)}h.push(f.x,u,f.z),d.push(m[0],m[1],m[2])}return{count:h.length/3,positions:h,colors:d,cell:i?.cell||.2,step:i?.step||.2}}function Zg(i){let t=n=>{let s=[...new Set(i.map(o=>Math.round(o[n]*1e4)))].sort((o,a)=>o-a),r=1/0;for(let o=1;o<s.length;o++){let a=s[o]-s[o-1];a>1&&(r=Math.min(r,a))}return r/1e4},e=Math.min(t("x"),t("z"));return Number.isFinite(e)?e:.1}function Dd(i,t){let e=i||[],n=t.cellSize||Zg(e),s=t.bounds,r=n/2,o=s.x0-r,a=s.z0-r,l=s.x1+r,c=s.z1+r,h=Math.max(l-o,c-a,1e-6),d=Math.min(t.maxPixels?t.maxPixels/h:2048/h,t.maxPpm??50),u=Math.max(1,Math.ceil((l-o)*d)),f=Math.max(1,Math.ceil((c-a)*d)),g=new Uint8Array(u*f*4),_=t.spillColor||[229,72,77],m=t.selected||null,p=t.colorFor||(()=>[128,128,128]);for(let b of e){let x=b.spill||[],v=x.length>0&&(!m||x.includes(m)),C,T;if(v)C=_,T=.55;else if(b.own>0&&b.own_sensor)C=p(b.own_sensor),T=.2+.55*Math.max(0,Math.min(1,b.own)),m&&b.own_sensor!==m&&(T*=.45);else continue;let R=Math.max(0,Math.round((b.x-n/2-o)*d)),I=Math.min(u,Math.round((b.x+n/2-o)*d)),S=Math.max(0,Math.round((b.z-n/2-a)*d)),M=Math.min(f,Math.round((b.z+n/2-a)*d));I<=R&&(I=Math.min(u,R+1)),M<=S&&(M=Math.min(f,S+1));let P=Math.round(T*255);for(let L=S;L<M;L++)for(let E=R;E<I;E++){let z=(L*u+E)*4;g[z]=C[0],g[z+1]=C[1],g[z+2]=C[2],g[z+3]=P}}return{width:u,height:f,data:g,x0:o,z0:a,x1:l,z1:c,ppm:d,cellSize:n}}var Ch="170",ki={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Fi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Kg=0,Ld=1,Jg=2;var qf=1,jg=2,On=3,ci=0,Xe=1,Se=2,ai=0,gs=1,Ud=2,Nd=3,Od=4,Qg=5,Pi=100,t_=101,e_=102,n_=103,i_=104,s_=200,r_=201,o_=202,a_=203,dc=204,fc=205,l_=206,c_=207,h_=208,u_=209,d_=210,f_=211,p_=212,m_=213,g_=214,pc=0,mc=1,gc=2,bs=3,_c=4,xc=5,vc=6,yc=7,Ph=0,__=1,x_=2,li=0,v_=1,y_=2,b_=3,M_=4,w_=5,S_=6,E_=7;var Yf=300,Ms=301,ws=302,bc=303,Mc=304,ga=306,wc=1e3,Di=1001,Sc=1002,Oe=1003,A_=1004;var oo=1005;var gn=1006,Nl=1007;var Li=1008;var en=1009,Zf=1010,Kf=1011,gr=1012,Ih=1013,Ui=1014,_n=1015,wr=1016,Dh=1017,Lh=1018,Ss=1020,Jf=35902,jf=1021,Qf=1022,We=1023,tp=1024,ep=1025,_s=1026,Es=1027,Uh=1028,Nh=1029,np=1030,Oh=1031;var kh=1033,ko=33776,Fo=33777,zo=33778,Bo=33779,Ec=35840,Ac=35841,Tc=35842,Rc=35843,Cc=36196,Pc=37492,Ic=37496,Dc=37808,Lc=37809,Uc=37810,Nc=37811,Oc=37812,kc=37813,Fc=37814,zc=37815,Bc=37816,Vc=37817,$c=37818,Hc=37819,Gc=37820,Wc=37821,Vo=36492,Xc=36494,qc=36495,ip=36283,Yc=36284,Zc=36285,Kc=36286;var $o=2300,Jc=2301,Ol=2302,kd=2400,Fd=2401,zd=2402;var T_=3200,R_=3201;var sp=0,C_=1,ri="",Pe="srgb",Ps="srgb-linear",_a="linear",ie="srgb";var Qi=7680;var Bd=519,P_=512,I_=513,D_=514,rp=515,L_=516,U_=517,N_=518,O_=519,Vd=35044;var $d="300 es",kn=2e3,Ho=2001,zn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hd=1234567,xs=Math.PI/180,_r=180/Math.PI;function Is(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function Ne(i,t,e){return Math.max(t,Math.min(e,i))}function Fh(i,t){return(i%t+t)%t}function k_(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function F_(i,t,e){return i!==t?(e-i)/(t-i):0}function pr(i,t,e){return(1-e)*i+e*t}function z_(i,t,e,n){return pr(i,t,1-Math.exp(-e*n))}function B_(i,t=1){return t-Math.abs(Fh(i,t*2)-t)}function V_(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function $_(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function H_(i,t){return i+Math.floor(Math.random()*(t-i+1))}function G_(i,t){return i+Math.random()*(t-i)}function W_(i){return i*(.5-Math.random())}function X_(i){i!==void 0&&(Hd=i);let t=Hd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function q_(i){return i*xs}function Y_(i){return i*_r}function Z_(i){return(i&i-1)===0&&i!==0}function K_(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function J_(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function j_(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*d,l*u,a*c);break;case"YZY":i.set(l*u,a*h,l*d,a*c);break;case"ZXZ":i.set(l*d,l*u,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ps(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ze(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var op={DEG2RAD:xs,RAD2DEG:_r,generateUUID:Is,clamp:Ne,euclideanModulo:Fh,mapLinear:k_,inverseLerp:F_,lerp:pr,damp:z_,pingpong:B_,smoothstep:V_,smootherstep:$_,randInt:H_,randFloat:G_,randFloatSpread:W_,seededRandom:X_,degToRad:q_,radToDeg:Y_,isPowerOfTwo:Z_,ceilPowerOfTwo:K_,floorPowerOfTwo:J_,setQuaternionFromProperEuler:j_,normalize:ze,denormalize:ps},It=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ot=class i{constructor(t,e,n,s,r,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],b=s[1],x=s[4],v=s[7],C=s[2],T=s[5],R=s[8];return r[0]=o*_+a*b+l*C,r[3]=o*m+a*x+l*T,r[6]=o*p+a*v+l*R,r[1]=c*_+h*b+d*C,r[4]=c*m+h*x+d*T,r[7]=c*p+h*v+d*R,r[2]=u*_+f*b+g*C,r[5]=u*m+f*x+g*T,r[8]=u*p+f*v+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=e*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=u*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(kl.makeScale(t,e)),this}rotate(t){return this.premultiply(kl.makeRotation(-t)),this}translate(t,e){return this.premultiply(kl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},kl=new Ot;function ap(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Go(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Q_(){let i=Go("canvas");return i.style.display="block",i}var Gd={};function dr(i){i in Gd||(Gd[i]=!0,console.warn(i))}function t0(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function e0(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function n0(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var qt={enabled:!0,workingColorSpace:Ps,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ie&&(i.r=Fn(i.r),i.g=Fn(i.g),i.b=Fn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ie&&(i.r=vs(i.r),i.g=vs(i.g),i.b=vs(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ri?_a:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Fn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Wd=[.64,.33,.3,.6,.15,.06],Xd=[.2126,.7152,.0722],qd=[.3127,.329],Yd=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zd=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[Ps]:{primaries:Wd,whitePoint:qd,transfer:_a,toXYZ:Yd,fromXYZ:Zd,luminanceCoefficients:Xd,workingColorSpaceConfig:{unpackColorSpace:Pe},outputColorSpaceConfig:{drawingBufferColorSpace:Pe}},[Pe]:{primaries:Wd,whitePoint:qd,transfer:ie,toXYZ:Yd,fromXYZ:Zd,luminanceCoefficients:Xd,outputColorSpaceConfig:{drawingBufferColorSpace:Pe}}});var ts,jc=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ts===void 0&&(ts=Go("canvas")),ts.width=t.width,ts.height=t.height;let n=ts.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ts}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Go("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Fn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Fn(e[n]/255)*255):e[n]=Fn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},i0=0,Wo=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:i0++}),this.uuid=Is(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Fl(s[o].image)):r.push(Fl(s[o]))}else r=Fl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Fl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?jc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var s0=0,Je=class i extends zn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Di,s=Di,r=gn,o=Li,a=We,l=en,c=i.DEFAULT_ANISOTROPY,h=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=Is(),this.name="",this.source=new Wo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case wc:t.x=t.x-Math.floor(t.x);break;case Di:t.x=t.x<0?0:1;break;case Sc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case wc:t.y=t.y-Math.floor(t.y);break;case Di:t.y=t.y<0?0:1;break;case Sc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Je.DEFAULT_IMAGE=null;Je.DEFAULT_MAPPING=Yf;Je.DEFAULT_ANISOTROPY=1;var ge=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,v=(f+1)/2,C=(p+1)/2,T=(h+u)/4,R=(d+_)/4,I=(g+m)/4;return x>v&&x>C?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=T/n,r=R/n):v>C?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=T/s,r=I/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=R/r,s=I/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-_)/b,this.z=(u-h)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Qc=class extends zn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Je(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Wo(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Bn=class extends Qc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Xo=class extends Je{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var th=class extends Je{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var un=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==u||c!==f||h!==g){let m=1-a,p=l*u+c*f+h*g+d*_,b=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){let C=Math.sqrt(x),T=Math.atan2(C,p*b);m=Math.sin(m*T)/C,a=Math.sin(a*T)/C}let v=a*b;if(l=l*m+u*v,c=c*m+f*v,h=h*m+g*v,d=d*m+_*v,m===1-a){let C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-a*f,t[e+2]=c*g+h*f+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),d=a(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ne(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Kd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Kd.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zl.copy(this).projectOnVector(t),this.sub(zl)}reflect(t){return this.sub(zl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},zl=new B,Kd=new un,Vn=class{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,an):an.fromBufferAttribute(r,o),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ao.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ao.copy(n.boundingBox)),ao.applyMatrix4(t.matrixWorld),this.union(ao)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(rr),lo.subVectors(this.max,rr),es.subVectors(t.a,rr),ns.subVectors(t.b,rr),is.subVectors(t.c,rr),Qn.subVectors(ns,es),ti.subVectors(is,ns),wi.subVectors(es,is);let e=[0,-Qn.z,Qn.y,0,-ti.z,ti.y,0,-wi.z,wi.y,Qn.z,0,-Qn.x,ti.z,0,-ti.x,wi.z,0,-wi.x,-Qn.y,Qn.x,0,-ti.y,ti.x,0,-wi.y,wi.x,0];return!Bl(e,es,ns,is,lo)||(e=[1,0,0,0,1,0,0,0,1],!Bl(e,es,ns,is,lo))?!1:(co.crossVectors(Qn,ti),e=[co.x,co.y,co.z],Bl(e,es,ns,is,lo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},In=[new B,new B,new B,new B,new B,new B,new B,new B],an=new B,ao=new Vn,es=new B,ns=new B,is=new B,Qn=new B,ti=new B,wi=new B,rr=new B,lo=new B,co=new B,Si=new B;function Bl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Si.fromArray(i,r);let a=s.x*Math.abs(Si.x)+s.y*Math.abs(Si.y)+s.z*Math.abs(Si.z),l=t.dot(Si),c=e.dot(Si),h=n.dot(Si);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var r0=new Vn,or=new B,Vl=new B,$n=class{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):r0.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;or.subVectors(t,this.center);let e=or.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(or,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Vl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(or.copy(t.center).add(Vl)),this.expandByPoint(or.copy(t.center).sub(Vl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Dn=new B,$l=new B,ho=new B,ei=new B,Hl=new B,uo=new B,Gl=new B,hi=class{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){$l.copy(t).add(e).multiplyScalar(.5),ho.copy(e).sub(t).normalize(),ei.copy(this.origin).sub($l);let r=t.distanceTo(e)*.5,o=-this.direction.dot(ho),a=ei.dot(this.direction),l=-ei.dot(ho),c=ei.lengthSq(),h=Math.abs(1-o*o),d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy($l).addScaledVector(ho,u),f}intersectSphere(t,e){Dn.subVectors(t.center,this.origin);let n=Dn.dot(this.direction),s=Dn.dot(Dn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,s,r){Hl.subVectors(e,t),uo.subVectors(n,t),Gl.crossVectors(Hl,uo);let o=this.direction.dot(Gl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ei.subVectors(this.origin,t);let l=a*this.direction.dot(uo.crossVectors(ei,uo));if(l<0)return null;let c=a*this.direction.dot(Hl.cross(ei));if(c<0||l+c>o)return null;let h=-a*ei.dot(Gl);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qt=class i{constructor(t,e,n,s,r,o,a,l,c,h,d,u,f,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,d,u,f,g,_,m)}set(t,e,n,s,r,o,a,l,c,h,d,u,f,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/ss.setFromMatrixColumn(t,0).length(),r=1/ss.setFromMatrixColumn(t,1).length(),o=1/ss.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u+_*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u-_*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,f=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,f=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-_*d}else if(t.order==="XZY"){let u=o*l,f=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(o0,t,a0)}lookAt(t,e,n){let s=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),ni.crossVectors(n,Ze),ni.lengthSq()===0&&(Math.abs(n.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),ni.crossVectors(n,Ze)),ni.normalize(),fo.crossVectors(Ze,ni),s[0]=ni.x,s[4]=fo.x,s[8]=Ze.x,s[1]=ni.y,s[5]=fo.y,s[9]=Ze.y,s[2]=ni.z,s[6]=fo.z,s[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],x=n[7],v=n[11],C=n[15],T=s[0],R=s[4],I=s[8],S=s[12],M=s[1],P=s[5],L=s[9],E=s[13],z=s[2],H=s[6],N=s[10],X=s[14],F=s[3],tt=s[7],J=s[11],ct=s[15];return r[0]=o*T+a*M+l*z+c*F,r[4]=o*R+a*P+l*H+c*tt,r[8]=o*I+a*L+l*N+c*J,r[12]=o*S+a*E+l*X+c*ct,r[1]=h*T+d*M+u*z+f*F,r[5]=h*R+d*P+u*H+f*tt,r[9]=h*I+d*L+u*N+f*J,r[13]=h*S+d*E+u*X+f*ct,r[2]=g*T+_*M+m*z+p*F,r[6]=g*R+_*P+m*H+p*tt,r[10]=g*I+_*L+m*N+p*J,r[14]=g*S+_*E+m*X+p*ct,r[3]=b*T+x*M+v*z+C*F,r[7]=b*R+x*P+v*H+C*tt,r[11]=b*I+x*L+v*N+C*J,r[15]=b*S+x*E+v*X+C*ct,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*l*d-s*c*d-r*a*u+n*c*u+s*a*f-n*l*f)+_*(+e*l*f-e*c*u+r*o*u-s*o*f+s*c*h-r*l*h)+m*(+e*c*d-e*a*f-r*o*d+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-e*l*d+e*a*u+s*o*d-n*o*u+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],b=d*m*c-_*u*c+_*l*f-a*m*f-d*l*p+a*u*p,x=g*u*c-h*m*c-g*l*f+o*m*f+h*l*p-o*u*p,v=h*_*c-g*d*c+g*a*f-o*_*f-h*a*p+o*d*p,C=g*d*l-h*_*l-g*a*u+o*_*u+h*a*m-o*d*m,T=e*b+n*x+s*v+r*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/T;return t[0]=b*R,t[1]=(_*u*r-d*m*r-_*s*f+n*m*f+d*s*p-n*u*p)*R,t[2]=(a*m*r-_*l*r+_*s*c-n*m*c-a*s*p+n*l*p)*R,t[3]=(d*l*r-a*u*r-d*s*c+n*u*c+a*s*f-n*l*f)*R,t[4]=x*R,t[5]=(h*m*r-g*u*r+g*s*f-e*m*f-h*s*p+e*u*p)*R,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*R,t[7]=(o*u*r-h*l*r+h*s*c-e*u*c-o*s*f+e*l*f)*R,t[8]=v*R,t[9]=(g*d*r-h*_*r-g*n*f+e*_*f+h*n*p-e*d*p)*R,t[10]=(o*_*r-g*a*r+g*n*c-e*_*c-o*n*p+e*a*p)*R,t[11]=(h*a*r-o*d*r-h*n*c+e*d*c+o*n*f-e*a*f)*R,t[12]=C*R,t[13]=(h*_*s-g*d*s+g*n*u-e*_*u-h*n*m+e*d*m)*R,t[14]=(g*a*s-o*_*s-g*n*l+e*_*l+o*n*m-e*a*m)*R,t[15]=(o*d*s-h*a*s+h*n*l-e*d*l-o*n*u+e*a*u)*R,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,_=o*h,m=o*d,p=a*d,b=l*c,x=l*h,v=l*d,C=n.x,T=n.y,R=n.z;return s[0]=(1-(_+p))*C,s[1]=(f+v)*C,s[2]=(g-x)*C,s[3]=0,s[4]=(f-v)*T,s[5]=(1-(u+p))*T,s[6]=(m+b)*T,s[7]=0,s[8]=(g+x)*R,s[9]=(m-b)*R,s[10]=(1-(u+_))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=ss.set(s[0],s[1],s[2]).length(),o=ss.set(s[4],s[5],s[6]).length(),a=ss.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ln.copy(this);let c=1/r,h=1/o,d=1/a;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=h,ln.elements[5]*=h,ln.elements[6]*=h,ln.elements[8]*=d,ln.elements[9]*=d,ln.elements[10]*=d,e.setFromRotationMatrix(ln),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=kn){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),u=(n+s)/(n-s),f,g;if(a===kn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ho)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=kn){let l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(o-r),u=(e+t)*c,f=(n+s)*h,g,_;if(a===kn)g=(o+r)*d,_=-2*d;else if(a===Ho)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ss=new B,ln=new Qt,o0=new B(0,0,0),a0=new B(1,1,1),ni=new B,fo=new B,Ze=new B,Jd=new Qt,jd=new un,vn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ne(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Jd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Jd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jd.setFromEuler(this),this.setFromQuaternion(jd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};vn.DEFAULT_ORDER="XYZ";var xr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},l0=0,Qd=new B,rs=new un,Ln=new Qt,po=new B,ar=new B,c0=new B,h0=new un,tf=new B(1,0,0),ef=new B(0,1,0),nf=new B(0,0,1),sf={type:"added"},u0={type:"removed"},os={type:"childadded",child:null},Wl={type:"childremoved",child:null},ke=class i extends zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:l0++}),this.uuid=Is(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new B,e=new vn,n=new un,s=new B(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Ot}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return rs.setFromAxisAngle(t,e),this.quaternion.multiply(rs),this}rotateOnWorldAxis(t,e){return rs.setFromAxisAngle(t,e),this.quaternion.premultiply(rs),this}rotateX(t){return this.rotateOnAxis(tf,t)}rotateY(t){return this.rotateOnAxis(ef,t)}rotateZ(t){return this.rotateOnAxis(nf,t)}translateOnAxis(t,e){return Qd.copy(t).applyQuaternion(this.quaternion),this.position.add(Qd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(tf,t)}translateY(t){return this.translateOnAxis(ef,t)}translateZ(t){return this.translateOnAxis(nf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?po.copy(t):po.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(ar,po,this.up):Ln.lookAt(po,ar,this.up),this.quaternion.setFromRotationMatrix(Ln),s&&(Ln.extractRotation(s.matrixWorld),rs.setFromRotationMatrix(Ln),this.quaternion.premultiply(rs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(sf),os.child=t,this.dispatchEvent(os),os.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(u0),Wl.child=t,this.dispatchEvent(Wl),Wl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(sf),os.child=t,this.dispatchEvent(os),os.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,t,c0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,h0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};ke.DEFAULT_UP=new B(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var cn=new B,Un=new B,Xl=new B,Nn=new B,as=new B,ls=new B,rf=new B,ql=new B,Yl=new B,Zl=new B,Kl=new ge,Jl=new ge,jl=new ge,oi=class i{constructor(t=new B,e=new B,n=new B){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),cn.subVectors(t,e),s.cross(cn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){cn.subVectors(s,e),Un.subVectors(n,e),Xl.subVectors(t,e);let o=cn.dot(cn),a=cn.dot(Un),l=cn.dot(Xl),c=Un.dot(Un),h=Un.dot(Xl),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Nn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Nn.x),l.addScaledVector(o,Nn.y),l.addScaledVector(a,Nn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Kl.setScalar(0),Jl.setScalar(0),jl.setScalar(0),Kl.fromBufferAttribute(t,e),Jl.fromBufferAttribute(t,n),jl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Kl,r.x),o.addScaledVector(Jl,r.y),o.addScaledVector(jl,r.z),o}static isFrontFacing(t,e,n,s){return cn.subVectors(n,e),Un.subVectors(t,e),cn.cross(Un).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),cn.cross(Un).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;as.subVectors(s,n),ls.subVectors(r,n),ql.subVectors(t,n);let l=as.dot(ql),c=ls.dot(ql);if(l<=0&&c<=0)return e.copy(n);Yl.subVectors(t,s);let h=as.dot(Yl),d=ls.dot(Yl);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(as,o);Zl.subVectors(t,r);let f=as.dot(Zl),g=ls.dot(Zl);if(g>=0&&f<=g)return e.copy(r);let _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(ls,a);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return rf.subVectors(r,s),a=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(rf,a);let p=1/(m+_+u);return o=_*p,a=u*p,e.copy(n).addScaledVector(as,o).addScaledVector(ls,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},lp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},mo={h:0,s:0,l:0};function Ql(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Vt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Pe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=qt.workingColorSpace){if(t=Fh(t,1),e=Ne(e,0,1),n=Ne(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ql(o,r,t+1/3),this.g=Ql(o,r,t),this.b=Ql(o,r,t-1/3)}return qt.toWorkingColorSpace(this,s),this}setStyle(t,e=Pe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Pe){let n=lp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fn(t.r),this.g=Fn(t.g),this.b=Fn(t.b),this}copyLinearToSRGB(t){return this.r=vs(t.r),this.g=vs(t.g),this.b=vs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Pe){return qt.fromWorkingColorSpace(Ue.copy(this),t),Math.round(Ne(Ue.r*255,0,255))*65536+Math.round(Ne(Ue.g*255,0,255))*256+Math.round(Ne(Ue.b*255,0,255))}getHexString(t=Pe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(Ue.copy(this),e);let n=Ue.r,s=Ue.g,r=Ue.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=Pe){qt.fromWorkingColorSpace(Ue.copy(this),t);let e=Ue.r,n=Ue.g,s=Ue.b;return t!==Pe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ii),this.setHSL(ii.h+t,ii.s+e,ii.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ii),t.getHSL(mo);let n=pr(ii.h,mo.h,e),s=pr(ii.s,mo.s,e),r=pr(ii.l,mo.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ue=new Vt;Vt.NAMES=lp;var d0=0,Hn=class extends zn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:d0++}),this.uuid=Is(),this.name="",this.blending=gs,this.side=ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dc,this.blendDst=fc,this.blendEquation=Pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qi,this.stencilZFail=Qi,this.stencilZPass=Qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(n.blending=this.blending),this.side!==ci&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==dc&&(n.blendSrc=this.blendSrc),this.blendDst!==fc&&(n.blendDst=this.blendDst),this.blendEquation!==Pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==bs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},yn=class extends Hn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Ph,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var be=new B,go=new It,xe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Vd,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)go.fromBufferAttribute(this,e),go.applyMatrix3(t),this.setXY(e,go.x,go.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ps(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ze(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ps(e,this.array)),e}setX(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ps(e,this.array)),e}setY(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ps(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ps(e,this.array)),e}setW(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),n=ze(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),n=ze(n,this.array),s=ze(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),n=ze(n,this.array),s=ze(s,this.array),r=ze(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Vd&&(t.usage=this.usage),t}};var qo=class extends xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Yo=class extends xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var $e=class extends xe{constructor(t,e,n){super(new Float32Array(t),e,n)}},f0=0,tn=new Qt,tc=new ke,cs=new B,Ke=new Vn,lr=new Vn,Ce=new B,Fe=class i extends zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:f0++}),this.uuid=Is(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ap(t)?Yo:qo)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return tc.lookAt(t),tc.updateMatrix(),this.applyMatrix4(tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new $e(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Ke.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $n);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){let n=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];lr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ce.addVectors(Ke.min,lr.min),Ke.expandByPoint(Ce),Ce.addVectors(Ke.max,lr.max),Ke.expandByPoint(Ce)):(Ke.expandByPoint(lr.min),Ke.expandByPoint(lr.max))}Ke.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ce));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ce.fromBufferAttribute(a,c),l&&(cs.fromBufferAttribute(t,c),Ce.add(cs)),s=Math.max(s,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xe(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<n.count;I++)a[I]=new B,l[I]=new B;let c=new B,h=new B,d=new B,u=new It,f=new It,g=new It,_=new B,m=new B;function p(I,S,M){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,M),u.fromBufferAttribute(r,I),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,M),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),a[I].add(_),a[S].add(_),a[M].add(_),l[I].add(m),l[S].add(m),l[M].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let I=0,S=b.length;I<S;++I){let M=b[I],P=M.start,L=M.count;for(let E=P,z=P+L;E<z;E+=3)p(t.getX(E+0),t.getX(E+1),t.getX(E+2))}let x=new B,v=new B,C=new B,T=new B;function R(I){C.fromBufferAttribute(s,I),T.copy(C);let S=a[I];x.copy(S),x.sub(C.multiplyScalar(C.dot(S))).normalize(),v.crossVectors(T,S);let P=v.dot(l[I])<0?-1:1;o.setXYZW(I,x.x,x.y,x.z,P)}for(let I=0,S=b.length;I<S;++I){let M=b[I],P=M.start,L=M.count;for(let E=P,z=P+L;E<z;E+=3)R(t.getX(E+0)),R(t.getX(E+1)),R(t.getX(E+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new B,r=new B,o=new B,a=new B,l=new B,c=new B,h=new B,d=new B;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new xe(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},of=new Qt,Ei=new hi,_o=new $n,af=new B,xo=new B,vo=new B,yo=new B,ec=new B,bo=new B,lf=new B,Mo=new B,Ee=class extends ke{constructor(t=new Fe,e=new yn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){bo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(ec.fromBufferAttribute(d,t),o?bo.addScaledVector(ec,h):bo.addScaledVector(ec.sub(e),h))}e.add(bo)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_o.copy(n.boundingSphere),_o.applyMatrix4(r),Ei.copy(t.ray).recast(t.near),!(_o.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(_o,af)===null||Ei.origin.distanceToSquared(af)>(t.far-t.near)**2))&&(of.copy(r).invert(),Ei.copy(t.ray).applyMatrix4(of),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ei)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,C=x;v<C;v+=3){let T=a.getX(v),R=a.getX(v+1),I=a.getX(v+2);s=wo(this,p,t,n,c,h,d,T,R,I),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let b=a.getX(m),x=a.getX(m+1),v=a.getX(m+2);s=wo(this,o,t,n,c,h,d,b,x,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,C=x;v<C;v+=3){let T=v,R=v+1,I=v+2;s=wo(this,p,t,n,c,h,d,T,R,I),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let b=m,x=m+1,v=m+2;s=wo(this,o,t,n,c,h,d,b,x,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function p0(i,t,e,n,s,r,o,a){let l;if(t.side===Xe?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===ci,a),l===null)return null;Mo.copy(a),Mo.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Mo);return c<e.near||c>e.far?null:{distance:c,point:Mo.clone(),object:i}}function wo(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,xo),i.getVertexPosition(l,vo),i.getVertexPosition(c,yo);let h=p0(i,t,e,n,xo,vo,yo,lf);if(h){let d=new B;oi.getBarycoord(lf,xo,vo,yo,d),s&&(h.uv=oi.getInterpolatedAttribute(s,a,l,c,d,new It)),r&&(h.uv1=oi.getInterpolatedAttribute(r,a,l,c,d,new It)),o&&(h.normal=oi.getInterpolatedAttribute(o,a,l,c,d,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new B,materialIndex:0};oi.getNormal(xo,vo,yo,u.normal),h.face=u,h.barycoord=d}return h}var Gn=class i extends Fe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new $e(c,3)),this.setAttribute("normal",new $e(h,3)),this.setAttribute("uv",new $e(d,2));function g(_,m,p,b,x,v,C,T,R,I,S){let M=v/R,P=C/I,L=v/2,E=C/2,z=T/2,H=R+1,N=I+1,X=0,F=0,tt=new B;for(let J=0;J<N;J++){let ct=J*P-E;for(let pt=0;pt<H;pt++){let Et=pt*M-L;tt[_]=Et*b,tt[m]=ct*x,tt[p]=z,c.push(tt.x,tt.y,tt.z),tt[_]=0,tt[m]=0,tt[p]=T>0?1:-1,h.push(tt.x,tt.y,tt.z),d.push(pt/R),d.push(1-J/I),X+=1}}for(let J=0;J<I;J++)for(let ct=0;ct<R;ct++){let pt=u+ct+H*J,Et=u+ct+H*(J+1),V=u+(ct+1)+H*(J+1),Z=u+(ct+1)+H*J;l.push(pt,Et,Z),l.push(Et,V,Z),F+=6}a.addGroup(f,F,S),f+=F,u+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function As(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Be(i){let t={};for(let e=0;e<i.length;e++){let n=As(i[e]);for(let s in n)t[s]=n[s]}return t}function m0(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function cp(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}var g0={clone:As,merge:Be},_0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,x0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,bn=class extends Hn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_0,this.fragmentShader=x0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=As(t.uniforms),this.uniformsGroups=m0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Zo=class extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=kn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},si=new B,cf=new It,hf=new It,Ve=class extends Zo{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=_r*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(xs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return _r*2*Math.atan(Math.tan(xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(si.x,si.y).multiplyScalar(-t/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(si.x,si.y).multiplyScalar(-t/si.z)}getViewSize(t,e){return this.getViewBounds(t,cf,hf),e.subVectors(hf,cf)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(xs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},hs=-90,us=1,eh=class extends ke{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ve(hs,us,t,e);s.layers=this.layers,this.add(s);let r=new Ve(hs,us,t,e);r.layers=this.layers,this.add(r);let o=new Ve(hs,us,t,e);o.layers=this.layers,this.add(o);let a=new Ve(hs,us,t,e);a.layers=this.layers,this.add(a);let l=new Ve(hs,us,t,e);l.layers=this.layers,this.add(l);let c=new Ve(hs,us,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===kn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ho)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ko=class extends Je{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Ms,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},nh=class extends Bn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ko(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Gn(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:As(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xe,blending:ai});r.uniforms.tEquirect.value=e;let o=new Ee(s,r),a=e.minFilter;return e.minFilter===Li&&(e.minFilter=gn),new eh(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},nc=new B,v0=new B,y0=new Ot,hn=class{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=nc.subVectors(n,e).cross(v0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(nc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||y0.getNormalMatrix(t),s=this.coplanarPoint(nc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ai=new $n,So=new B,vr=class{constructor(t=new hn,e=new hn,n=new hn,s=new hn,r=new hn,o=new hn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=kn){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],b=s[13],x=s[14],v=s[15];if(n[0].setComponents(l-r,u-c,m-f,v-p).normalize(),n[1].setComponents(l+r,u+c,m+f,v+p).normalize(),n[2].setComponents(l+o,u+h,m+g,v+b).normalize(),n[3].setComponents(l-o,u-h,m-g,v-b).normalize(),n[4].setComponents(l-a,u-d,m-_,v-x).normalize(),e===kn)n[5].setComponents(l+a,u+d,m+_,v+x).normalize();else if(e===Ho)n[5].setComponents(a,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(t){return Ai.center.set(0,0,0),Ai.radius=.7071067811865476,Ai.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(So.x=s.normal.x>0?t.max.x:t.min.x,So.y=s.normal.y>0?t.max.y:t.min.y,So.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(So)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function hp(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function b0(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let _=d[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Jo=class i extends Fe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,d=t/a,u=e/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let b=p*u-o;for(let x=0;x<c;x++){let v=x*d-r;g.push(v,-b,0),_.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){let x=b+c*p,v=b+c*(p+1),C=b+1+c*(p+1),T=b+1+c*p;f.push(x,v,T),f.push(v,C,T)}this.setIndex(f),this.setAttribute("position",new $e(g,3)),this.setAttribute("normal",new $e(_,3)),this.setAttribute("uv",new $e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},M0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,w0=`#ifdef USE_ALPHAHASH
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
#endif`,S0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,E0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,A0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,T0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,R0=`#ifdef USE_AOMAP
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
#endif`,C0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,P0=`#ifdef USE_BATCHING
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
#endif`,I0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,D0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,L0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,U0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,N0=`#ifdef USE_IRIDESCENCE
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
#endif`,O0=`#ifdef USE_BUMPMAP
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
#endif`,k0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,F0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,z0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,B0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,V0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,H0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,G0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,W0=`#define PI 3.141592653589793
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
} // validated`,X0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,q0=`vec3 transformedNormal = objectNormal;
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
#endif`,Y0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Z0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,K0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,J0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,j0="gl_FragColor = linearToOutputTexel( gl_FragColor );",Q0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tx=`#ifdef USE_ENVMAP
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
#endif`,ex=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nx=`#ifdef USE_ENVMAP
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
#endif`,ix=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sx=`#ifdef USE_ENVMAP
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
#endif`,rx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ox=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ax=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cx=`#ifdef USE_GRADIENTMAP
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
}`,hx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ux=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fx=`uniform bool receiveShadow;
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
#endif`,px=`#ifdef USE_ENVMAP
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
#endif`,mx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_x=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vx=`PhysicalMaterial material;
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
#endif`,yx=`struct PhysicalMaterial {
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
}`,bx=`
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
#endif`,Mx=`#if defined( RE_IndirectDiffuse )
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
#endif`,wx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ex=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ax=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tx=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Px=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ix=`#if defined( USE_POINTS_UV )
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
#endif`,Dx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ux=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ox=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kx=`#ifdef USE_MORPHTARGETS
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
#endif`,Fx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Bx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Vx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$x=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gx=`#ifdef USE_NORMALMAP
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
#endif`,Wx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Jx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ev=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,iv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ov=`float getShadowMask() {
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
}`,av=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lv=`#ifdef USE_SKINNING
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
#endif`,cv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hv=`#ifdef USE_SKINNING
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
#endif`,uv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mv=`#ifdef USE_TRANSMISSION
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
#endif`,gv=`#ifdef USE_TRANSMISSION
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
#endif`,_v=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,bv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mv=`uniform sampler2D t2D;
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
}`,wv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ev=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Av=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tv=`#include <common>
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
}`,Rv=`#if DEPTH_PACKING == 3200
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
}`,Cv=`#define DISTANCE
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
}`,Pv=`#define DISTANCE
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
}`,Iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lv=`uniform float scale;
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
}`,Uv=`uniform vec3 diffuse;
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
}`,Nv=`#include <common>
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
}`,Ov=`uniform vec3 diffuse;
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
}`,kv=`#define LAMBERT
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
}`,Fv=`#define LAMBERT
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
}`,zv=`#define MATCAP
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
}`,Bv=`#define MATCAP
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
}`,Vv=`#define NORMAL
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
}`,$v=`#define NORMAL
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
}`,Hv=`#define PHONG
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
}`,Gv=`#define PHONG
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
}`,Wv=`#define STANDARD
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
}`,Xv=`#define STANDARD
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
}`,qv=`#define TOON
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
}`,Yv=`#define TOON
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
}`,Zv=`uniform float size;
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
}`,Kv=`uniform vec3 diffuse;
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
}`,Jv=`#include <common>
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
}`,jv=`uniform vec3 color;
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
}`,Qv=`uniform float rotation;
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
}`,ty=`uniform vec3 diffuse;
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
}`,zt={alphahash_fragment:M0,alphahash_pars_fragment:w0,alphamap_fragment:S0,alphamap_pars_fragment:E0,alphatest_fragment:A0,alphatest_pars_fragment:T0,aomap_fragment:R0,aomap_pars_fragment:C0,batching_pars_vertex:P0,batching_vertex:I0,begin_vertex:D0,beginnormal_vertex:L0,bsdfs:U0,iridescence_fragment:N0,bumpmap_pars_fragment:O0,clipping_planes_fragment:k0,clipping_planes_pars_fragment:F0,clipping_planes_pars_vertex:z0,clipping_planes_vertex:B0,color_fragment:V0,color_pars_fragment:$0,color_pars_vertex:H0,color_vertex:G0,common:W0,cube_uv_reflection_fragment:X0,defaultnormal_vertex:q0,displacementmap_pars_vertex:Y0,displacementmap_vertex:Z0,emissivemap_fragment:K0,emissivemap_pars_fragment:J0,colorspace_fragment:j0,colorspace_pars_fragment:Q0,envmap_fragment:tx,envmap_common_pars_fragment:ex,envmap_pars_fragment:nx,envmap_pars_vertex:ix,envmap_physical_pars_fragment:px,envmap_vertex:sx,fog_vertex:rx,fog_pars_vertex:ox,fog_fragment:ax,fog_pars_fragment:lx,gradientmap_pars_fragment:cx,lightmap_pars_fragment:hx,lights_lambert_fragment:ux,lights_lambert_pars_fragment:dx,lights_pars_begin:fx,lights_toon_fragment:mx,lights_toon_pars_fragment:gx,lights_phong_fragment:_x,lights_phong_pars_fragment:xx,lights_physical_fragment:vx,lights_physical_pars_fragment:yx,lights_fragment_begin:bx,lights_fragment_maps:Mx,lights_fragment_end:wx,logdepthbuf_fragment:Sx,logdepthbuf_pars_fragment:Ex,logdepthbuf_pars_vertex:Ax,logdepthbuf_vertex:Tx,map_fragment:Rx,map_pars_fragment:Cx,map_particle_fragment:Px,map_particle_pars_fragment:Ix,metalnessmap_fragment:Dx,metalnessmap_pars_fragment:Lx,morphinstance_vertex:Ux,morphcolor_vertex:Nx,morphnormal_vertex:Ox,morphtarget_pars_vertex:kx,morphtarget_vertex:Fx,normal_fragment_begin:zx,normal_fragment_maps:Bx,normal_pars_fragment:Vx,normal_pars_vertex:$x,normal_vertex:Hx,normalmap_pars_fragment:Gx,clearcoat_normal_fragment_begin:Wx,clearcoat_normal_fragment_maps:Xx,clearcoat_pars_fragment:qx,iridescence_pars_fragment:Yx,opaque_fragment:Zx,packing:Kx,premultiplied_alpha_fragment:Jx,project_vertex:jx,dithering_fragment:Qx,dithering_pars_fragment:tv,roughnessmap_fragment:ev,roughnessmap_pars_fragment:nv,shadowmap_pars_fragment:iv,shadowmap_pars_vertex:sv,shadowmap_vertex:rv,shadowmask_pars_fragment:ov,skinbase_vertex:av,skinning_pars_vertex:lv,skinning_vertex:cv,skinnormal_vertex:hv,specularmap_fragment:uv,specularmap_pars_fragment:dv,tonemapping_fragment:fv,tonemapping_pars_fragment:pv,transmission_fragment:mv,transmission_pars_fragment:gv,uv_pars_fragment:_v,uv_pars_vertex:xv,uv_vertex:vv,worldpos_vertex:yv,background_vert:bv,background_frag:Mv,backgroundCube_vert:wv,backgroundCube_frag:Sv,cube_vert:Ev,cube_frag:Av,depth_vert:Tv,depth_frag:Rv,distanceRGBA_vert:Cv,distanceRGBA_frag:Pv,equirect_vert:Iv,equirect_frag:Dv,linedashed_vert:Lv,linedashed_frag:Uv,meshbasic_vert:Nv,meshbasic_frag:Ov,meshlambert_vert:kv,meshlambert_frag:Fv,meshmatcap_vert:zv,meshmatcap_frag:Bv,meshnormal_vert:Vv,meshnormal_frag:$v,meshphong_vert:Hv,meshphong_frag:Gv,meshphysical_vert:Wv,meshphysical_frag:Xv,meshtoon_vert:qv,meshtoon_frag:Yv,points_vert:Zv,points_frag:Kv,shadow_vert:Jv,shadow_frag:jv,sprite_vert:Qv,sprite_frag:ty},ot={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},mn={basic:{uniforms:Be([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Be([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Vt(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Be([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Be([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Be([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new Vt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Be([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Be([ot.points,ot.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Be([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Be([ot.common,ot.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Be([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Be([ot.sprite,ot.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:Be([ot.common,ot.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:Be([ot.lights,ot.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};mn.physical={uniforms:Be([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};var Eo={r:0,b:0,g:0},Ti=new vn,ey=new Qt;function ny(i,t,e,n,s,r,o){let a=new Vt(0),l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(b){let x=b.isScene===!0?b.background:null;return x&&x.isTexture&&(x=(b.backgroundBlurriness>0?e:t).get(x)),x}function _(b){let x=!1,v=g(b);v===null?p(a,l):v&&v.isColor&&(p(v,1),x=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,x){let v=g(x);v&&(v.isCubeTexture||v.mapping===ga)?(h===void 0&&(h=new Ee(new Gn(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:As(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ti.copy(x.backgroundRotation),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ey.makeRotationFromEuler(Ti)),h.material.toneMapped=qt.getTransfer(v.colorSpace)!==ie,(d!==v||u!==v.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=v,u=v.version,f=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Ee(new Jo(2,2),new bn({name:"BackgroundMaterial",uniforms:As(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:ci,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=qt.getTransfer(v.colorSpace)!==ie,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||u!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=v,u=v.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,x){b.getRGB(Eo,cp(i)),n.buffers.color.setClear(Eo.r,Eo.g,Eo.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(b,x=1){a.set(b),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:_,addToRenderList:m}}function iy(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(M,P,L,E,z){let H=!1,N=d(E,L,P);r!==N&&(r=N,c(r.object)),H=f(M,E,L,z),H&&g(M,E,L,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,v(M,P,L,E),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function d(M,P,L){let E=L.wireframe===!0,z=n[M.id];z===void 0&&(z={},n[M.id]=z);let H=z[P.id];H===void 0&&(H={},z[P.id]=H);let N=H[E];return N===void 0&&(N=u(l()),H[E]=N),N}function u(M){let P=[],L=[],E=[];for(let z=0;z<e;z++)P[z]=0,L[z]=0,E[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:L,attributeDivisors:E,object:M,attributes:{},index:null}}function f(M,P,L,E){let z=r.attributes,H=P.attributes,N=0,X=L.getAttributes();for(let F in X)if(X[F].location>=0){let J=z[F],ct=H[F];if(ct===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(ct=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(ct=M.instanceColor)),J===void 0||J.attribute!==ct||ct&&J.data!==ct.data)return!0;N++}return r.attributesNum!==N||r.index!==E}function g(M,P,L,E){let z={},H=P.attributes,N=0,X=L.getAttributes();for(let F in X)if(X[F].location>=0){let J=H[F];J===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(J=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(J=M.instanceColor));let ct={};ct.attribute=J,J&&J.data&&(ct.data=J.data),z[F]=ct,N++}r.attributes=z,r.attributesNum=N,r.index=E}function _(){let M=r.newAttributes;for(let P=0,L=M.length;P<L;P++)M[P]=0}function m(M){p(M,0)}function p(M,P){let L=r.newAttributes,E=r.enabledAttributes,z=r.attributeDivisors;L[M]=1,E[M]===0&&(i.enableVertexAttribArray(M),E[M]=1),z[M]!==P&&(i.vertexAttribDivisor(M,P),z[M]=P)}function b(){let M=r.newAttributes,P=r.enabledAttributes;for(let L=0,E=P.length;L<E;L++)P[L]!==M[L]&&(i.disableVertexAttribArray(L),P[L]=0)}function x(M,P,L,E,z,H,N){N===!0?i.vertexAttribIPointer(M,P,L,z,H):i.vertexAttribPointer(M,P,L,E,z,H)}function v(M,P,L,E){_();let z=E.attributes,H=L.getAttributes(),N=P.defaultAttributeValues;for(let X in H){let F=H[X];if(F.location>=0){let tt=z[X];if(tt===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(tt=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(tt=M.instanceColor)),tt!==void 0){let J=tt.normalized,ct=tt.itemSize,pt=t.get(tt);if(pt===void 0)continue;let Et=pt.buffer,V=pt.type,Z=pt.bytesPerElement,rt=V===i.INT||V===i.UNSIGNED_INT||tt.gpuType===Ih;if(tt.isInterleavedBufferAttribute){let nt=tt.data,mt=nt.stride,St=tt.offset;if(nt.isInstancedInterleavedBuffer){for(let Lt=0;Lt<F.locationSize;Lt++)p(F.location+Lt,nt.meshPerAttribute);M.isInstancedMesh!==!0&&E._maxInstanceCount===void 0&&(E._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let Lt=0;Lt<F.locationSize;Lt++)m(F.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let Lt=0;Lt<F.locationSize;Lt++)x(F.location+Lt,ct/F.locationSize,V,J,mt*Z,(St+ct/F.locationSize*Lt)*Z,rt)}else{if(tt.isInstancedBufferAttribute){for(let nt=0;nt<F.locationSize;nt++)p(F.location+nt,tt.meshPerAttribute);M.isInstancedMesh!==!0&&E._maxInstanceCount===void 0&&(E._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let nt=0;nt<F.locationSize;nt++)m(F.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let nt=0;nt<F.locationSize;nt++)x(F.location+nt,ct/F.locationSize,V,J,ct*Z,ct/F.locationSize*nt*Z,rt)}}else if(N!==void 0){let J=N[X];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(F.location,J);break;case 3:i.vertexAttrib3fv(F.location,J);break;case 4:i.vertexAttrib4fv(F.location,J);break;default:i.vertexAttrib1fv(F.location,J)}}}}b()}function C(){I();for(let M in n){let P=n[M];for(let L in P){let E=P[L];for(let z in E)h(E[z].object),delete E[z];delete P[L]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;let P=n[M.id];for(let L in P){let E=P[L];for(let z in E)h(E[z].object),delete E[z];delete P[L]}delete n[M.id]}function R(M){for(let P in n){let L=n[P];if(L[M.id]===void 0)continue;let E=L[M.id];for(let z in E)h(E[z].object),delete E[z];delete L[M.id]}}function I(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function sy(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function ry(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==We&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let I=R===wr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==en&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==_n&&!I)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:C,maxSamples:T}}function oy(i){let t=this,e=null,n=0,s=!1,r=!1,o=new hn,a=new Ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let b=r?0:n,x=b*4,v=p.clippingState||null;l.value=v,v=h(g,u,x,f);for(let C=0;C!==x;++C)v[C]=e[C];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=f+_*4,b=u.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,v=f;x!==_;++x,v+=4)o.copy(d[x]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function ay(i){let t=new WeakMap;function e(o,a){return a===bc?o.mapping=Ms:a===Mc&&(o.mapping=ws),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===bc||a===Mc)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new nh(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var jo=class extends Zo{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ms=4,uf=[.125,.215,.35,.446,.526,.582],Ii=20,ic=new jo,df=new Vt,sc=null,rc=0,oc=0,ac=!1,Ci=(1+Math.sqrt(5))/2,ds=1/Ci,ff=[new B(-Ci,ds,0),new B(Ci,ds,0),new B(-ds,0,Ci),new B(ds,0,Ci),new B(0,Ci,-ds),new B(0,Ci,ds),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)],Qo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(sc,rc,oc),this._renderer.xr.enabled=ac,t.scissorTest=!1,Ao(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ms||t.mapping===ws?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:wr,format:We,colorSpace:Ps,depthBuffer:!1},s=pf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pf(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ly(r)),this._blurMaterial=cy(r,t,e)}return s}_compileMaterial(t){let e=new Ee(this._lodPlanes[0],t);this._renderer.compile(e,ic)}_sceneToCubeUV(t,e,n,s){let a=new Ve(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(df),h.toneMapping=li,h.autoClear=!1;let f=new yn({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1}),g=new Ee(new Gn,f),_=!1,m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(df),_=!0);for(let p=0;p<6;p++){let b=p%3;b===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):b===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));let x=this._cubeSize;Ao(s,b*x,p>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ms||t.mapping===ws;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mf());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ee(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Ao(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ic)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ff[(s-r-1)%ff.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new Ee(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ii-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Ii;m>Ii&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ii}`);let p=[],b=0;for(let R=0;R<Ii;++R){let I=R/_,S=Math.exp(-I*I/2);p.push(S),R===0?b+=S:R<m&&(b+=2*S)}for(let R=0;R<p.length;R++)p[R]=p[R]/b;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-n;let v=this._sizeLods[s],C=3*v*(s>x-ms?s-x+ms:0),T=4*(this._cubeSize-v);Ao(e,C,T,3*v,2*v),l.setRenderTarget(e),l.render(d,ic)}};function ly(i){let t=[],e=[],n=[],s=i,r=i-ms+1+uf.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>i-ms?l=uf[o-i+ms-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*f),x=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let T=0;T<f;T++){let R=T%3*2/3-1,I=T>2?0:-1,S=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];b.set(S,_*g*T),x.set(u,m*g*T);let M=[T,T,T,T,T,T];v.set(M,p*g*T)}let C=new Fe;C.setAttribute("position",new xe(b,_)),C.setAttribute("uv",new xe(x,m)),C.setAttribute("faceIndex",new xe(v,p)),t.push(C),s>ms&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function pf(i,t,e){let n=new Bn(i,t,e);return n.texture.mapping=ga,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ao(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function cy(i,t,e){let n=new Float32Array(Ii),s=new B(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:Ii,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:zh(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function mf(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zh(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function gf(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function zh(){return`

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
	`}function hy(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===bc||l===Mc,h=l===Ms||l===ws;if(c||h){let d=t.get(a),u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Qo(i)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Qo(i)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function uy(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&dr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function dy(i,t,e,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);for(let g in u.morphAttributes){let _=u.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let g in u)t.update(u[g],i.ARRAY_BUFFER);let f=d.morphAttributes;for(let g in f){let _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function c(d){let u=[],f=d.index,g=d.attributes.position,_=0;if(f!==null){let b=f.array;_=f.version;for(let x=0,v=b.length;x<v;x+=3){let C=b[x+0],T=b[x+1],R=b[x+2];u.push(C,T,T,R,R,C)}}else if(g!==void 0){let b=g.array;_=g.version;for(let x=0,v=b.length/3-1;x<v;x+=3){let C=x+0,T=x+1,R=x+2;u.push(C,T,T,R,R,C)}}else return;let m=new(ap(u)?Yo:qo)(u,1);m.version=_;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function fy(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*o),e.update(f,n,1)}function c(u,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,u*o,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(u,f,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=f[b]*_[b];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function py(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function my(i,t,e){let n=new WeakMap,s=new ge;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let S=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],x=0;f===!0&&(x=1),g===!0&&(x=2),_===!0&&(x=3);let v=a.attributes.position.count*x,C=1;v>t.maxTextureSize&&(C=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let T=new Float32Array(v*C*4*d),R=new Xo(T,v,C,d);R.type=_n,R.needsUpdate=!0;let I=x*4;for(let M=0;M<d;M++){let P=m[M],L=p[M],E=b[M],z=v*C*4*M;for(let H=0;H<P.count;H++){let N=H*I;f===!0&&(s.fromBufferAttribute(P,H),T[z+N+0]=s.x,T[z+N+1]=s.y,T[z+N+2]=s.z,T[z+N+3]=0),g===!0&&(s.fromBufferAttribute(L,H),T[z+N+4]=s.x,T[z+N+5]=s.y,T[z+N+6]=s.z,T[z+N+7]=0),_===!0&&(s.fromBufferAttribute(E,H),T[z+N+8]=s.x,T[z+N+9]=s.y,T[z+N+10]=s.z,T[z+N+11]=E.itemSize===4?s.w:1)}}u={count:d,texture:R,size:new It(v,C)},n.set(a,u),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function gy(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var ta=class extends Je{constructor(t,e,n,s,r,o,a,l,c,h=_s){if(h!==_s&&h!==Es)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===_s&&(n=Ui),n===void 0&&h===Es&&(n=Ss),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Oe,this.minFilter=l!==void 0?l:Oe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},up=new Je,_f=new ta(1,1),dp=new Xo,fp=new th,pp=new Ko,xf=[],vf=[],yf=new Float32Array(16),bf=new Float32Array(9),Mf=new Float32Array(4);function Ds(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=xf[s];if(r===void 0&&(r=new Float32Array(s),xf[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function xa(i,t){let e=vf[t];e===void 0&&(e=new Int32Array(t),vf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function _y(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function xy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function vy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function yy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function by(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ae(e,n))return;Mf.set(n),i.uniformMatrix2fv(this.addr,!1,Mf),Te(e,n)}}function My(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ae(e,n))return;bf.set(n),i.uniformMatrix3fv(this.addr,!1,bf),Te(e,n)}}function wy(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ae(e,n))return;yf.set(n),i.uniformMatrix4fv(this.addr,!1,yf),Te(e,n)}}function Sy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ey(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function Ay(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function Ty(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function Ry(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Cy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function Py(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function Iy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function Dy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(_f.compareFunction=rp,r=_f):r=up,e.setTexture2D(t||r,s)}function Ly(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||fp,s)}function Uy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||pp,s)}function Ny(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||dp,s)}function Oy(i){switch(i){case 5126:return _y;case 35664:return xy;case 35665:return vy;case 35666:return yy;case 35674:return by;case 35675:return My;case 35676:return wy;case 5124:case 35670:return Sy;case 35667:case 35671:return Ey;case 35668:case 35672:return Ay;case 35669:case 35673:return Ty;case 5125:return Ry;case 36294:return Cy;case 36295:return Py;case 36296:return Iy;case 35678:case 36198:case 36298:case 36306:case 35682:return Dy;case 35679:case 36299:case 36307:return Ly;case 35680:case 36300:case 36308:case 36293:return Uy;case 36289:case 36303:case 36311:case 36292:return Ny}}function ky(i,t){i.uniform1fv(this.addr,t)}function Fy(i,t){let e=Ds(t,this.size,2);i.uniform2fv(this.addr,e)}function zy(i,t){let e=Ds(t,this.size,3);i.uniform3fv(this.addr,e)}function By(i,t){let e=Ds(t,this.size,4);i.uniform4fv(this.addr,e)}function Vy(i,t){let e=Ds(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function $y(i,t){let e=Ds(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Hy(i,t){let e=Ds(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Gy(i,t){i.uniform1iv(this.addr,t)}function Wy(i,t){i.uniform2iv(this.addr,t)}function Xy(i,t){i.uniform3iv(this.addr,t)}function qy(i,t){i.uniform4iv(this.addr,t)}function Yy(i,t){i.uniform1uiv(this.addr,t)}function Zy(i,t){i.uniform2uiv(this.addr,t)}function Ky(i,t){i.uniform3uiv(this.addr,t)}function Jy(i,t){i.uniform4uiv(this.addr,t)}function jy(i,t,e){let n=this.cache,s=t.length,r=xa(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||up,r[o])}function Qy(i,t,e){let n=this.cache,s=t.length,r=xa(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||fp,r[o])}function tb(i,t,e){let n=this.cache,s=t.length,r=xa(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||pp,r[o])}function eb(i,t,e){let n=this.cache,s=t.length,r=xa(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||dp,r[o])}function nb(i){switch(i){case 5126:return ky;case 35664:return Fy;case 35665:return zy;case 35666:return By;case 35674:return Vy;case 35675:return $y;case 35676:return Hy;case 5124:case 35670:return Gy;case 35667:case 35671:return Wy;case 35668:case 35672:return Xy;case 35669:case 35673:return qy;case 5125:return Yy;case 36294:return Zy;case 36295:return Ky;case 36296:return Jy;case 35678:case 36198:case 36298:case 36306:case 35682:return jy;case 35679:case 36299:case 36307:return Qy;case 35680:case 36300:case 36308:case 36293:return tb;case 36289:case 36303:case 36311:case 36292:return eb}}var ih=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Oy(e.type)}},sh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=nb(e.type)}},rh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},lc=/(\w+)(\])?(\[|\.)?/g;function wf(i,t){i.seq.push(t),i.map[t.id]=t}function ib(i,t,e){let n=i.name,s=n.length;for(lc.lastIndex=0;;){let r=lc.exec(n),o=lc.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){wf(e,c===void 0?new ih(a,i,t):new sh(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new rh(a),wf(e,d)),e=d}}}var ys=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);ib(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Sf(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var sb=37297,rb=0;function ob(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Ef=new Ot;function ab(i){qt._getMatrix(Ef,qt.workingColorSpace,i);let t=`mat3( ${Ef.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case _a:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Af(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+ob(i.getShaderSource(t),o)}else return s}function lb(i,t){let e=ab(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function cb(i,t){let e;switch(t){case v_:e="Linear";break;case y_:e="Reinhard";break;case b_:e="Cineon";break;case M_:e="ACESFilmic";break;case S_:e="AgX";break;case E_:e="Neutral";break;case w_:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var To=new B;function hb(){qt.getLuminanceCoefficients(To);let i=To.x.toFixed(4),t=To.y.toFixed(4),e=To.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ub(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fr).join(`
`)}function db(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function fb(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function fr(i){return i!==""}function Tf(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Rf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var pb=/^[ \t]*#include +<([\w\d./]+)>/gm;function oh(i){return i.replace(pb,gb)}var mb=new Map;function gb(i,t){let e=zt[t];if(e===void 0){let n=mb.get(t);if(n!==void 0)e=zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return oh(e)}var _b=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cf(i){return i.replace(_b,xb)}function xb(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Pf(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function vb(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===qf?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===jg?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===On&&(t="SHADOWMAP_TYPE_VSM"),t}function yb(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ms:case ws:t="ENVMAP_TYPE_CUBE";break;case ga:t="ENVMAP_TYPE_CUBE_UV";break}return t}function bb(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ws:t="ENVMAP_MODE_REFRACTION";break}return t}function Mb(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ph:t="ENVMAP_BLENDING_MULTIPLY";break;case __:t="ENVMAP_BLENDING_MIX";break;case x_:t="ENVMAP_BLENDING_ADD";break}return t}function wb(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Sb(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=vb(e),c=yb(e),h=bb(e),d=Mb(e),u=wb(e),f=ub(e),g=db(r),_=s.createProgram(),m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fr).join(`
`),p.length>0&&(p+=`
`)):(m=[Pf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fr).join(`
`),p=[Pf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==li?"#define TONE_MAPPING":"",e.toneMapping!==li?zt.tonemapping_pars_fragment:"",e.toneMapping!==li?cb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,lb("linearToOutputTexel",e.outputColorSpace),hb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(fr).join(`
`)),o=oh(o),o=Tf(o,e),o=Rf(o,e),a=oh(a),a=Tf(a,e),a=Rf(a,e),o=Cf(o),a=Cf(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===$d?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$d?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let x=b+m+o,v=b+p+a,C=Sf(s,s.VERTEX_SHADER,x),T=Sf(s,s.FRAGMENT_SHADER,v);s.attachShader(_,C),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(P){if(i.debug.checkShaderErrors){let L=s.getProgramInfoLog(_).trim(),E=s.getShaderInfoLog(C).trim(),z=s.getShaderInfoLog(T).trim(),H=!0,N=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,C,T);else{let X=Af(s,C,"vertex"),F=Af(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+L+`
`+X+`
`+F)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(E===""||z==="")&&(N=!1);N&&(P.diagnostics={runnable:H,programLog:L,vertexShader:{log:E,prefix:m},fragmentShader:{log:z,prefix:p}})}s.deleteShader(C),s.deleteShader(T),I=new ys(s,_),S=fb(s,_)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,sb)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=rb++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=T,this}var Eb=0,ah=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new lh(t),e.set(t,n)),n}},lh=class{constructor(t){this.id=Eb++,this.code=t,this.usedTimes=0}};function Ab(i,t,e,n,s,r,o){let a=new xr,l=new ah,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,M,P,L,E){let z=L.fog,H=E.geometry,N=S.isMeshStandardMaterial?L.environment:null,X=(S.isMeshStandardMaterial?e:t).get(S.envMap||N),F=X&&X.mapping===ga?X.image.height:null,tt=g[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let J=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ct=J!==void 0?J.length:0,pt=0;H.morphAttributes.position!==void 0&&(pt=1),H.morphAttributes.normal!==void 0&&(pt=2),H.morphAttributes.color!==void 0&&(pt=3);let Et,V,Z,rt;if(tt){let ee=mn[tt];Et=ee.vertexShader,V=ee.fragmentShader}else Et=S.vertexShader,V=S.fragmentShader,l.update(S),Z=l.getVertexShaderID(S),rt=l.getFragmentShaderID(S);let nt=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),St=E.isInstancedMesh===!0,Lt=E.isBatchedMesh===!0,ne=!!S.map,Ht=!!S.matcap,fe=!!X,U=!!S.aoMap,_e=!!S.lightMap,kt=!!S.bumpMap,$t=!!S.normalMap,Tt=!!S.displacementMap,te=!!S.emissiveMap,At=!!S.metalnessMap,A=!!S.roughnessMap,y=S.anisotropy>0,$=S.clearcoat>0,j=S.dispersion>0,et=S.iridescence>0,K=S.sheen>0,Mt=S.transmission>0,lt=y&&!!S.anisotropyMap,gt=$&&!!S.clearcoatMap,Xt=$&&!!S.clearcoatNormalMap,it=$&&!!S.clearcoatRoughnessMap,_t=et&&!!S.iridescenceMap,Rt=et&&!!S.iridescenceThicknessMap,Ct=K&&!!S.sheenColorMap,xt=K&&!!S.sheenRoughnessMap,Gt=!!S.specularMap,Ft=!!S.specularColorMap,oe=!!S.specularIntensityMap,D=Mt&&!!S.transmissionMap,at=Mt&&!!S.thicknessMap,q=!!S.gradientMap,Q=!!S.alphaMap,dt=S.alphaTest>0,ht=!!S.alphaHash,Ut=!!S.extensions,me=li;S.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(me=i.toneMapping);let De={shaderID:tt,shaderType:S.type,shaderName:S.name,vertexShader:Et,fragmentShader:V,defines:S.defines,customVertexShaderID:Z,customFragmentShaderID:rt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Lt,batchingColor:Lt&&E._colorsTexture!==null,instancing:St,instancingColor:St&&E.instanceColor!==null,instancingMorph:St&&E.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Ps,alphaToCoverage:!!S.alphaToCoverage,map:ne,matcap:Ht,envMap:fe,envMapMode:fe&&X.mapping,envMapCubeUVHeight:F,aoMap:U,lightMap:_e,bumpMap:kt,normalMap:$t,displacementMap:u&&Tt,emissiveMap:te,normalMapObjectSpace:$t&&S.normalMapType===C_,normalMapTangentSpace:$t&&S.normalMapType===sp,metalnessMap:At,roughnessMap:A,anisotropy:y,anisotropyMap:lt,clearcoat:$,clearcoatMap:gt,clearcoatNormalMap:Xt,clearcoatRoughnessMap:it,dispersion:j,iridescence:et,iridescenceMap:_t,iridescenceThicknessMap:Rt,sheen:K,sheenColorMap:Ct,sheenRoughnessMap:xt,specularMap:Gt,specularColorMap:Ft,specularIntensityMap:oe,transmission:Mt,transmissionMap:D,thicknessMap:at,gradientMap:q,opaque:S.transparent===!1&&S.blending===gs&&S.alphaToCoverage===!1,alphaMap:Q,alphaTest:dt,alphaHash:ht,combine:S.combine,mapUv:ne&&_(S.map.channel),aoMapUv:U&&_(S.aoMap.channel),lightMapUv:_e&&_(S.lightMap.channel),bumpMapUv:kt&&_(S.bumpMap.channel),normalMapUv:$t&&_(S.normalMap.channel),displacementMapUv:Tt&&_(S.displacementMap.channel),emissiveMapUv:te&&_(S.emissiveMap.channel),metalnessMapUv:At&&_(S.metalnessMap.channel),roughnessMapUv:A&&_(S.roughnessMap.channel),anisotropyMapUv:lt&&_(S.anisotropyMap.channel),clearcoatMapUv:gt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Xt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:xt&&_(S.sheenRoughnessMap.channel),specularMapUv:Gt&&_(S.specularMap.channel),specularColorMapUv:Ft&&_(S.specularColorMap.channel),specularIntensityMapUv:oe&&_(S.specularIntensityMap.channel),transmissionMapUv:D&&_(S.transmissionMap.channel),thicknessMapUv:at&&_(S.thicknessMap.channel),alphaMapUv:Q&&_(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&($t||y),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:E.isPoints===!0&&!!H.attributes.uv&&(ne||Q),fog:!!z,useFog:S.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:mt,skinning:E.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ct,morphTextureStride:pt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:me,decodeVideoTexture:ne&&S.map.isVideoTexture===!0&&qt.getTransfer(S.map.colorSpace)===ie,decodeVideoTextureEmissive:te&&S.emissiveMap.isVideoTexture===!0&&qt.getTransfer(S.emissiveMap.colorSpace)===ie,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Se,flipSided:S.side===Xe,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ut&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&S.extensions.multiDraw===!0||Lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return De.vertexUv1s=c.has(1),De.vertexUv2s=c.has(2),De.vertexUv3s=c.has(3),c.clear(),De}function p(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(b(M,S),x(M,S),M.push(i.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function b(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function x(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){let M=g[S.type],P;if(M){let L=mn[M];P=g0.clone(L.uniforms)}else P=S.uniforms;return P}function C(S,M){let P;for(let L=0,E=h.length;L<E;L++){let z=h[L];if(z.cacheKey===M){P=z,++P.usedTimes;break}}return P===void 0&&(P=new Sb(i,M,S,r),h.push(P)),P}function T(S){if(--S.usedTimes===0){let M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function R(S){l.remove(S)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:C,releaseProgram:T,releaseShaderCache:R,programs:h,dispose:I}}function Tb(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Rb(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function If(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Df(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d,u,f,g,_,m){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},i[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),t++,p}function a(d,u,f,g,_,m){let p=o(d,u,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(d,u,f,g,_,m){let p=o(d,u,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||Rb),n.length>1&&n.sort(u||If),s.length>1&&s.sort(u||If)}function h(){for(let d=t,u=i.length;d<u;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Cb(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Df,i.set(n,[o])):s>=r.length?(o=new Df,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Pb(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new B,color:new Vt};break;case"SpotLight":e={position:new B,direction:new B,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new B,halfWidth:new B,halfHeight:new B};break}return i[t.id]=e,e}}}function Ib(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Db=0;function Lb(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Ub(i){let t=new Pb,e=Ib(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new B);let s=new B,r=new Qt,o=new Qt;function a(c){let h=0,d=0,u=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,b=0,x=0,v=0,C=0,T=0,R=0;c.sort(Lb);for(let S=0,M=c.length;S<M;S++){let P=c[S],L=P.color,E=P.intensity,z=P.distance,H=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=L.r*E,d+=L.g*E,u+=L.b*E;else if(P.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(P.sh.coefficients[N],E);R++}else if(P.isDirectionalLight){let N=t.get(P);if(N.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let X=P.shadow,F=e.get(P);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,n.directionalShadow[f]=F,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=P.shadow.matrix,b++}n.directional[f]=N,f++}else if(P.isSpotLight){let N=t.get(P);N.position.setFromMatrixPosition(P.matrixWorld),N.color.copy(L).multiplyScalar(E),N.distance=z,N.coneCos=Math.cos(P.angle),N.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),N.decay=P.decay,n.spot[_]=N;let X=P.shadow;if(P.map&&(n.spotLightMap[C]=P.map,C++,X.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[_]=X.matrix,P.castShadow){let F=e.get(P);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,n.spotShadow[_]=F,n.spotShadowMap[_]=H,v++}_++}else if(P.isRectAreaLight){let N=t.get(P);N.color.copy(L).multiplyScalar(E),N.halfWidth.set(P.width*.5,0,0),N.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=N,m++}else if(P.isPointLight){let N=t.get(P);if(N.color.copy(P.color).multiplyScalar(P.intensity),N.distance=P.distance,N.decay=P.decay,P.castShadow){let X=P.shadow,F=e.get(P);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,F.shadowCameraNear=X.camera.near,F.shadowCameraFar=X.camera.far,n.pointShadow[g]=F,n.pointShadowMap[g]=H,n.pointShadowMatrix[g]=P.shadow.matrix,x++}n.point[g]=N,g++}else if(P.isHemisphereLight){let N=t.get(P);N.skyColor.copy(P.color).multiplyScalar(E),N.groundColor.copy(P.groundColor).multiplyScalar(E),n.hemi[p]=N,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==b||I.numPointShadows!==x||I.numSpotShadows!==v||I.numSpotMaps!==C||I.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=R,I.directionalLength=f,I.pointLength=g,I.spotLength=_,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=b,I.numPointShadows=x,I.numSpotShadows=v,I.numSpotMaps=C,I.numLightProbes=R,n.version=Db++)}function l(c,h){let d=0,u=0,f=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){let x=c[p];if(x.isDirectionalLight){let v=n.directional[d];v.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(x.isSpotLight){let v=n.spot[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(x.isRectAreaLight){let v=n.rectArea[g];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(x.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){let v=n.point[u];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),u++}else if(x.isHemisphereLight){let v=n.hemi[_];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function Lf(i){let t=new Ub(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Nb(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Lf(i),t.set(s,[a])):r>=o.length?(a=new Lf(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var ch=class extends Hn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=T_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},hh=class extends Hn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Ob=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kb=`uniform sampler2D shadow_pass;
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
}`;function Fb(i,t,e){let n=new vr,s=new It,r=new It,o=new ge,a=new ch({depthPacking:R_}),l=new hh,c={},h=e.maxTextureSize,d={[ci]:Xe,[Xe]:ci,[Se]:Se},u=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:Ob,fragmentShader:kb}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new Fe;g.setAttribute("position",new xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ee(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qf;let p=this.type;this.render=function(T,R,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let S=i.getRenderTarget(),M=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),L=i.state;L.setBlending(ai),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let E=p!==On&&this.type===On,z=p===On&&this.type!==On;for(let H=0,N=T.length;H<N;H++){let X=T[H],F=X.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);let tt=F.getFrameExtents();if(s.multiply(tt),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/tt.x),s.x=r.x*tt.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/tt.y),s.y=r.y*tt.y,F.mapSize.y=r.y)),F.map===null||E===!0||z===!0){let ct=this.type!==On?{minFilter:Oe,magFilter:Oe}:{};F.map!==null&&F.map.dispose(),F.map=new Bn(s.x,s.y,ct),F.map.texture.name=X.name+".shadowMap",F.camera.updateProjectionMatrix()}i.setRenderTarget(F.map),i.clear();let J=F.getViewportCount();for(let ct=0;ct<J;ct++){let pt=F.getViewport(ct);o.set(r.x*pt.x,r.y*pt.y,r.x*pt.z,r.y*pt.w),L.viewport(o),F.updateMatrices(X,ct),n=F.getFrustum(),v(R,I,F.camera,X,this.type)}F.isPointLightShadow!==!0&&this.type===On&&b(F,I),F.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,M,P)};function b(T,R){let I=t.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Bn(s.x,s.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(R,null,I,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(R,null,I,f,_,null)}function x(T,R,I,S){let M=null,P=I.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)M=P;else if(M=I.isPointLight===!0?l:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let L=M.uuid,E=R.uuid,z=c[L];z===void 0&&(z={},c[L]=z);let H=z[E];H===void 0&&(H=M.clone(),z[E]=H,R.addEventListener("dispose",C)),M=H}if(M.visible=R.visible,M.wireframe=R.wireframe,S===On?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:d[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let L=i.properties.get(M);L.light=I}return M}function v(T,R,I,S,M){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===On)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,T.matrixWorld);let E=t.update(T),z=T.material;if(Array.isArray(z)){let H=E.groups;for(let N=0,X=H.length;N<X;N++){let F=H[N],tt=z[F.materialIndex];if(tt&&tt.visible){let J=x(T,tt,S,M);T.onBeforeShadow(i,T,R,I,E,J,F),i.renderBufferDirect(I,null,E,J,T,F),T.onAfterShadow(i,T,R,I,E,J,F)}}}else if(z.visible){let H=x(T,z,S,M);T.onBeforeShadow(i,T,R,I,E,H,null),i.renderBufferDirect(I,null,E,H,T,null),T.onAfterShadow(i,T,R,I,E,H,null)}}let L=T.children;for(let E=0,z=L.length;E<z;E++)v(L[E],R,I,S,M)}function C(T){T.target.removeEventListener("dispose",C);for(let I in c){let S=c[I],M=T.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}var zb={[pc]:mc,[gc]:vc,[_c]:yc,[bs]:xc,[mc]:pc,[vc]:gc,[yc]:_c,[xc]:bs};function Bb(i,t){function e(){let D=!1,at=new ge,q=null,Q=new ge(0,0,0,0);return{setMask:function(dt){q!==dt&&!D&&(i.colorMask(dt,dt,dt,dt),q=dt)},setLocked:function(dt){D=dt},setClear:function(dt,ht,Ut,me,De){De===!0&&(dt*=me,ht*=me,Ut*=me),at.set(dt,ht,Ut,me),Q.equals(at)===!1&&(i.clearColor(dt,ht,Ut,me),Q.copy(at))},reset:function(){D=!1,q=null,Q.set(-1,0,0,0)}}}function n(){let D=!1,at=!1,q=null,Q=null,dt=null;return{setReversed:function(ht){if(at!==ht){let Ut=t.get("EXT_clip_control");at?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT);let me=dt;dt=null,this.setClear(me)}at=ht},getReversed:function(){return at},setTest:function(ht){ht?nt(i.DEPTH_TEST):mt(i.DEPTH_TEST)},setMask:function(ht){q!==ht&&!D&&(i.depthMask(ht),q=ht)},setFunc:function(ht){if(at&&(ht=zb[ht]),Q!==ht){switch(ht){case pc:i.depthFunc(i.NEVER);break;case mc:i.depthFunc(i.ALWAYS);break;case gc:i.depthFunc(i.LESS);break;case bs:i.depthFunc(i.LEQUAL);break;case _c:i.depthFunc(i.EQUAL);break;case xc:i.depthFunc(i.GEQUAL);break;case vc:i.depthFunc(i.GREATER);break;case yc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=ht}},setLocked:function(ht){D=ht},setClear:function(ht){dt!==ht&&(at&&(ht=1-ht),i.clearDepth(ht),dt=ht)},reset:function(){D=!1,q=null,Q=null,dt=null,at=!1}}}function s(){let D=!1,at=null,q=null,Q=null,dt=null,ht=null,Ut=null,me=null,De=null;return{setTest:function(ee){D||(ee?nt(i.STENCIL_TEST):mt(i.STENCIL_TEST))},setMask:function(ee){at!==ee&&!D&&(i.stencilMask(ee),at=ee)},setFunc:function(ee,sn,En){(q!==ee||Q!==sn||dt!==En)&&(i.stencilFunc(ee,sn,En),q=ee,Q=sn,dt=En)},setOp:function(ee,sn,En){(ht!==ee||Ut!==sn||me!==En)&&(i.stencilOp(ee,sn,En),ht=ee,Ut=sn,me=En)},setLocked:function(ee){D=ee},setClear:function(ee){De!==ee&&(i.clearStencil(ee),De=ee)},reset:function(){D=!1,at=null,q=null,Q=null,dt=null,ht=null,Ut=null,me=null,De=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,b=null,x=null,v=null,C=null,T=null,R=new Vt(0,0,0),I=0,S=!1,M=null,P=null,L=null,E=null,z=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,X=0,F=i.getParameter(i.VERSION);F.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=X>=1):F.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=X>=2);let tt=null,J={},ct=i.getParameter(i.SCISSOR_BOX),pt=i.getParameter(i.VIEWPORT),Et=new ge().fromArray(ct),V=new ge().fromArray(pt);function Z(D,at,q,Q){let dt=new Uint8Array(4),ht=i.createTexture();i.bindTexture(D,ht),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<q;Ut++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(at,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(at+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return ht}let rt={};rt[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),rt[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),rt[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(i.DEPTH_TEST),o.setFunc(bs),kt(!1),$t(Ld),nt(i.CULL_FACE),U(ai);function nt(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function mt(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function St(D,at){return d[D]!==at?(i.bindFramebuffer(D,at),d[D]=at,D===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=at),D===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=at),!0):!1}function Lt(D,at){let q=f,Q=!1;if(D){q=u.get(at),q===void 0&&(q=[],u.set(at,q));let dt=D.textures;if(q.length!==dt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let ht=0,Ut=dt.length;ht<Ut;ht++)q[ht]=i.COLOR_ATTACHMENT0+ht;q.length=dt.length,Q=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,Q=!0);Q&&i.drawBuffers(q)}function ne(D){return g!==D?(i.useProgram(D),g=D,!0):!1}let Ht={[Pi]:i.FUNC_ADD,[t_]:i.FUNC_SUBTRACT,[e_]:i.FUNC_REVERSE_SUBTRACT};Ht[n_]=i.MIN,Ht[i_]=i.MAX;let fe={[s_]:i.ZERO,[r_]:i.ONE,[o_]:i.SRC_COLOR,[dc]:i.SRC_ALPHA,[d_]:i.SRC_ALPHA_SATURATE,[h_]:i.DST_COLOR,[l_]:i.DST_ALPHA,[a_]:i.ONE_MINUS_SRC_COLOR,[fc]:i.ONE_MINUS_SRC_ALPHA,[u_]:i.ONE_MINUS_DST_COLOR,[c_]:i.ONE_MINUS_DST_ALPHA,[f_]:i.CONSTANT_COLOR,[p_]:i.ONE_MINUS_CONSTANT_COLOR,[m_]:i.CONSTANT_ALPHA,[g_]:i.ONE_MINUS_CONSTANT_ALPHA};function U(D,at,q,Q,dt,ht,Ut,me,De,ee){if(D===ai){_===!0&&(mt(i.BLEND),_=!1);return}if(_===!1&&(nt(i.BLEND),_=!0),D!==Qg){if(D!==m||ee!==S){if((p!==Pi||v!==Pi)&&(i.blendEquation(i.FUNC_ADD),p=Pi,v=Pi),ee)switch(D){case gs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ud:i.blendFunc(i.ONE,i.ONE);break;case Nd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Od:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case gs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ud:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Nd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Od:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}b=null,x=null,C=null,T=null,R.set(0,0,0),I=0,m=D,S=ee}return}dt=dt||at,ht=ht||q,Ut=Ut||Q,(at!==p||dt!==v)&&(i.blendEquationSeparate(Ht[at],Ht[dt]),p=at,v=dt),(q!==b||Q!==x||ht!==C||Ut!==T)&&(i.blendFuncSeparate(fe[q],fe[Q],fe[ht],fe[Ut]),b=q,x=Q,C=ht,T=Ut),(me.equals(R)===!1||De!==I)&&(i.blendColor(me.r,me.g,me.b,De),R.copy(me),I=De),m=D,S=!1}function _e(D,at){D.side===Se?mt(i.CULL_FACE):nt(i.CULL_FACE);let q=D.side===Xe;at&&(q=!q),kt(q),D.blending===gs&&D.transparent===!1?U(ai):U(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let Q=D.stencilWrite;a.setTest(Q),Q&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),te(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function kt(D){M!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),M=D)}function $t(D){D!==Kg?(nt(i.CULL_FACE),D!==P&&(D===Ld?i.cullFace(i.BACK):D===Jg?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):mt(i.CULL_FACE),P=D}function Tt(D){D!==L&&(N&&i.lineWidth(D),L=D)}function te(D,at,q){D?(nt(i.POLYGON_OFFSET_FILL),(E!==at||z!==q)&&(i.polygonOffset(at,q),E=at,z=q)):mt(i.POLYGON_OFFSET_FILL)}function At(D){D?nt(i.SCISSOR_TEST):mt(i.SCISSOR_TEST)}function A(D){D===void 0&&(D=i.TEXTURE0+H-1),tt!==D&&(i.activeTexture(D),tt=D)}function y(D,at,q){q===void 0&&(tt===null?q=i.TEXTURE0+H-1:q=tt);let Q=J[q];Q===void 0&&(Q={type:void 0,texture:void 0},J[q]=Q),(Q.type!==D||Q.texture!==at)&&(tt!==q&&(i.activeTexture(q),tt=q),i.bindTexture(D,at||rt[D]),Q.type=D,Q.texture=at)}function $(){let D=J[tt];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function et(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Mt(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function lt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function gt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Xt(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _t(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Rt(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ct(D){Et.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Et.copy(D))}function xt(D){V.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),V.copy(D))}function Gt(D,at){let q=c.get(at);q===void 0&&(q=new WeakMap,c.set(at,q));let Q=q.get(D);Q===void 0&&(Q=i.getUniformBlockIndex(at,D.name),q.set(D,Q))}function Ft(D,at){let Q=c.get(at).get(D);l.get(at)!==Q&&(i.uniformBlockBinding(at,Q,D.__bindingPointIndex),l.set(at,Q))}function oe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},tt=null,J={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,b=null,x=null,v=null,C=null,T=null,R=new Vt(0,0,0),I=0,S=!1,M=null,P=null,L=null,E=null,z=null,Et.set(0,0,i.canvas.width,i.canvas.height),V.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:mt,bindFramebuffer:St,drawBuffers:Lt,useProgram:ne,setBlending:U,setMaterial:_e,setFlipSided:kt,setCullFace:$t,setLineWidth:Tt,setPolygonOffset:te,setScissorTest:At,activeTexture:A,bindTexture:y,unbindTexture:$,compressedTexImage2D:j,compressedTexImage3D:et,texImage2D:_t,texImage3D:Rt,updateUBOMapping:Gt,uniformBlockBinding:Ft,texStorage2D:Xt,texStorage3D:it,texSubImage2D:K,texSubImage3D:Mt,compressedTexSubImage2D:lt,compressedTexSubImage3D:gt,scissor:Ct,viewport:xt,reset:oe}}function Uf(i,t,e,n){let s=Vb(n);switch(e){case jf:return i*t;case tp:return i*t;case ep:return i*t*2;case Uh:return i*t/s.components*s.byteLength;case Nh:return i*t/s.components*s.byteLength;case np:return i*t*2/s.components*s.byteLength;case Oh:return i*t*2/s.components*s.byteLength;case Qf:return i*t*3/s.components*s.byteLength;case We:return i*t*4/s.components*s.byteLength;case kh:return i*t*4/s.components*s.byteLength;case ko:case Fo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case zo:case Bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ac:case Rc:return Math.max(i,16)*Math.max(t,8)/4;case Ec:case Tc:return Math.max(i,8)*Math.max(t,8)/2;case Cc:case Pc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ic:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Dc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Lc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Uc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Nc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Oc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case kc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Fc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case zc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Bc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Vc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case $c:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Hc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Gc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Wc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Vo:case Xc:case qc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ip:case Yc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Zc:case Kc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Vb(i){switch(i){case en:case Zf:return{byteLength:1,components:1};case gr:case Kf:case wr:return{byteLength:2,components:1};case Dh:case Lh:return{byteLength:2,components:4};case Ui:case Ih:case _n:return{byteLength:4,components:1};case Jf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function $b(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new It,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,y){return f?new OffscreenCanvas(A,y):Go("canvas")}function _(A,y,$){let j=1,et=At(A);if((et.width>$||et.height>$)&&(j=$/Math.max(et.width,et.height)),j<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let K=Math.floor(j*et.width),Mt=Math.floor(j*et.height);d===void 0&&(d=g(K,Mt));let lt=y?g(K,Mt):d;return lt.width=K,lt.height=Mt,lt.getContext("2d").drawImage(A,0,0,K,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+K+"x"+Mt+")."),lt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){i.generateMipmap(A)}function b(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(A,y,$,j,et=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=y;if(y===i.RED&&($===i.FLOAT&&(K=i.R32F),$===i.HALF_FLOAT&&(K=i.R16F),$===i.UNSIGNED_BYTE&&(K=i.R8)),y===i.RED_INTEGER&&($===i.UNSIGNED_BYTE&&(K=i.R8UI),$===i.UNSIGNED_SHORT&&(K=i.R16UI),$===i.UNSIGNED_INT&&(K=i.R32UI),$===i.BYTE&&(K=i.R8I),$===i.SHORT&&(K=i.R16I),$===i.INT&&(K=i.R32I)),y===i.RG&&($===i.FLOAT&&(K=i.RG32F),$===i.HALF_FLOAT&&(K=i.RG16F),$===i.UNSIGNED_BYTE&&(K=i.RG8)),y===i.RG_INTEGER&&($===i.UNSIGNED_BYTE&&(K=i.RG8UI),$===i.UNSIGNED_SHORT&&(K=i.RG16UI),$===i.UNSIGNED_INT&&(K=i.RG32UI),$===i.BYTE&&(K=i.RG8I),$===i.SHORT&&(K=i.RG16I),$===i.INT&&(K=i.RG32I)),y===i.RGB_INTEGER&&($===i.UNSIGNED_BYTE&&(K=i.RGB8UI),$===i.UNSIGNED_SHORT&&(K=i.RGB16UI),$===i.UNSIGNED_INT&&(K=i.RGB32UI),$===i.BYTE&&(K=i.RGB8I),$===i.SHORT&&(K=i.RGB16I),$===i.INT&&(K=i.RGB32I)),y===i.RGBA_INTEGER&&($===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),$===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),$===i.UNSIGNED_INT&&(K=i.RGBA32UI),$===i.BYTE&&(K=i.RGBA8I),$===i.SHORT&&(K=i.RGBA16I),$===i.INT&&(K=i.RGBA32I)),y===i.RGB&&$===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),y===i.RGBA){let Mt=et?_a:qt.getTransfer(j);$===i.FLOAT&&(K=i.RGBA32F),$===i.HALF_FLOAT&&(K=i.RGBA16F),$===i.UNSIGNED_BYTE&&(K=Mt===ie?i.SRGB8_ALPHA8:i.RGBA8),$===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),$===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function v(A,y){let $;return A?y===null||y===Ui||y===Ss?$=i.DEPTH24_STENCIL8:y===_n?$=i.DEPTH32F_STENCIL8:y===gr&&($=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Ui||y===Ss?$=i.DEPTH_COMPONENT24:y===_n?$=i.DEPTH_COMPONENT32F:y===gr&&($=i.DEPTH_COMPONENT16),$}function C(A,y){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Oe&&A.minFilter!==gn?Math.log2(Math.max(y.width,y.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?y.mipmaps.length:1}function T(A){let y=A.target;y.removeEventListener("dispose",T),I(y),y.isVideoTexture&&h.delete(y)}function R(A){let y=A.target;y.removeEventListener("dispose",R),M(y)}function I(A){let y=n.get(A);if(y.__webglInit===void 0)return;let $=A.source,j=u.get($);if(j){let et=j[y.__cacheKey];et.usedTimes--,et.usedTimes===0&&S(A),Object.keys(j).length===0&&u.delete($)}n.remove(A)}function S(A){let y=n.get(A);i.deleteTexture(y.__webglTexture);let $=A.source,j=u.get($);delete j[y.__cacheKey],o.memory.textures--}function M(A){let y=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(y.__webglFramebuffer[j]))for(let et=0;et<y.__webglFramebuffer[j].length;et++)i.deleteFramebuffer(y.__webglFramebuffer[j][et]);else i.deleteFramebuffer(y.__webglFramebuffer[j]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[j])}else{if(Array.isArray(y.__webglFramebuffer))for(let j=0;j<y.__webglFramebuffer.length;j++)i.deleteFramebuffer(y.__webglFramebuffer[j]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let j=0;j<y.__webglColorRenderbuffer.length;j++)y.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[j]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let $=A.textures;for(let j=0,et=$.length;j<et;j++){let K=n.get($[j]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove($[j])}n.remove(A)}let P=0;function L(){P=0}function E(){let A=P;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),P+=1,A}function z(A){let y=[];return y.push(A.wrapS),y.push(A.wrapT),y.push(A.wrapR||0),y.push(A.magFilter),y.push(A.minFilter),y.push(A.anisotropy),y.push(A.internalFormat),y.push(A.format),y.push(A.type),y.push(A.generateMipmaps),y.push(A.premultiplyAlpha),y.push(A.flipY),y.push(A.unpackAlignment),y.push(A.colorSpace),y.join()}function H(A,y){let $=n.get(A);if(A.isVideoTexture&&Tt(A),A.isRenderTargetTexture===!1&&A.version>0&&$.__version!==A.version){let j=A.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V($,A,y);return}}e.bindTexture(i.TEXTURE_2D,$.__webglTexture,i.TEXTURE0+y)}function N(A,y){let $=n.get(A);if(A.version>0&&$.__version!==A.version){V($,A,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,$.__webglTexture,i.TEXTURE0+y)}function X(A,y){let $=n.get(A);if(A.version>0&&$.__version!==A.version){V($,A,y);return}e.bindTexture(i.TEXTURE_3D,$.__webglTexture,i.TEXTURE0+y)}function F(A,y){let $=n.get(A);if(A.version>0&&$.__version!==A.version){Z($,A,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture,i.TEXTURE0+y)}let tt={[wc]:i.REPEAT,[Di]:i.CLAMP_TO_EDGE,[Sc]:i.MIRRORED_REPEAT},J={[Oe]:i.NEAREST,[A_]:i.NEAREST_MIPMAP_NEAREST,[oo]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[Nl]:i.LINEAR_MIPMAP_NEAREST,[Li]:i.LINEAR_MIPMAP_LINEAR},ct={[P_]:i.NEVER,[O_]:i.ALWAYS,[I_]:i.LESS,[rp]:i.LEQUAL,[D_]:i.EQUAL,[N_]:i.GEQUAL,[L_]:i.GREATER,[U_]:i.NOTEQUAL};function pt(A,y){if(y.type===_n&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===gn||y.magFilter===Nl||y.magFilter===oo||y.magFilter===Li||y.minFilter===gn||y.minFilter===Nl||y.minFilter===oo||y.minFilter===Li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,tt[y.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,tt[y.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,tt[y.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,J[y.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,J[y.minFilter]),y.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ct[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Oe||y.minFilter!==oo&&y.minFilter!==Li||y.type===_n&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let $=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Et(A,y){let $=!1;A.__webglInit===void 0&&(A.__webglInit=!0,y.addEventListener("dispose",T));let j=y.source,et=u.get(j);et===void 0&&(et={},u.set(j,et));let K=z(y);if(K!==A.__cacheKey){et[K]===void 0&&(et[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,$=!0),et[K].usedTimes++;let Mt=et[A.__cacheKey];Mt!==void 0&&(et[A.__cacheKey].usedTimes--,Mt.usedTimes===0&&S(y)),A.__cacheKey=K,A.__webglTexture=et[K].texture}return $}function V(A,y,$){let j=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(j=i.TEXTURE_3D);let et=Et(A,y),K=y.source;e.bindTexture(j,A.__webglTexture,i.TEXTURE0+$);let Mt=n.get(K);if(K.version!==Mt.__version||et===!0){e.activeTexture(i.TEXTURE0+$);let lt=qt.getPrimaries(qt.workingColorSpace),gt=y.colorSpace===ri?null:qt.getPrimaries(y.colorSpace),Xt=y.colorSpace===ri||lt===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xt);let it=_(y.image,!1,s.maxTextureSize);it=te(y,it);let _t=r.convert(y.format,y.colorSpace),Rt=r.convert(y.type),Ct=x(y.internalFormat,_t,Rt,y.colorSpace,y.isVideoTexture);pt(j,y);let xt,Gt=y.mipmaps,Ft=y.isVideoTexture!==!0,oe=Mt.__version===void 0||et===!0,D=K.dataReady,at=C(y,it);if(y.isDepthTexture)Ct=v(y.format===Es,y.type),oe&&(Ft?e.texStorage2D(i.TEXTURE_2D,1,Ct,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,Ct,it.width,it.height,0,_t,Rt,null));else if(y.isDataTexture)if(Gt.length>0){Ft&&oe&&e.texStorage2D(i.TEXTURE_2D,at,Ct,Gt[0].width,Gt[0].height);for(let q=0,Q=Gt.length;q<Q;q++)xt=Gt[q],Ft?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,xt.width,xt.height,_t,Rt,xt.data):e.texImage2D(i.TEXTURE_2D,q,Ct,xt.width,xt.height,0,_t,Rt,xt.data);y.generateMipmaps=!1}else Ft?(oe&&e.texStorage2D(i.TEXTURE_2D,at,Ct,it.width,it.height),D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,it.width,it.height,_t,Rt,it.data)):e.texImage2D(i.TEXTURE_2D,0,Ct,it.width,it.height,0,_t,Rt,it.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ft&&oe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,Ct,Gt[0].width,Gt[0].height,it.depth);for(let q=0,Q=Gt.length;q<Q;q++)if(xt=Gt[q],y.format!==We)if(_t!==null)if(Ft){if(D)if(y.layerUpdates.size>0){let dt=Uf(xt.width,xt.height,y.format,y.type);for(let ht of y.layerUpdates){let Ut=xt.data.subarray(ht*dt/xt.data.BYTES_PER_ELEMENT,(ht+1)*dt/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,ht,xt.width,xt.height,1,_t,Ut)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,xt.width,xt.height,it.depth,_t,xt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Ct,xt.width,xt.height,it.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,xt.width,xt.height,it.depth,_t,Rt,xt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Ct,xt.width,xt.height,it.depth,0,_t,Rt,xt.data)}else{Ft&&oe&&e.texStorage2D(i.TEXTURE_2D,at,Ct,Gt[0].width,Gt[0].height);for(let q=0,Q=Gt.length;q<Q;q++)xt=Gt[q],y.format!==We?_t!==null?Ft?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,xt.width,xt.height,_t,xt.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Ct,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,xt.width,xt.height,_t,Rt,xt.data):e.texImage2D(i.TEXTURE_2D,q,Ct,xt.width,xt.height,0,_t,Rt,xt.data)}else if(y.isDataArrayTexture)if(Ft){if(oe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,Ct,it.width,it.height,it.depth),D)if(y.layerUpdates.size>0){let q=Uf(it.width,it.height,y.format,y.type);for(let Q of y.layerUpdates){let dt=it.data.subarray(Q*q/it.data.BYTES_PER_ELEMENT,(Q+1)*q/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,it.width,it.height,1,_t,Rt,dt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,_t,Rt,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ct,it.width,it.height,it.depth,0,_t,Rt,it.data);else if(y.isData3DTexture)Ft?(oe&&e.texStorage3D(i.TEXTURE_3D,at,Ct,it.width,it.height,it.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,_t,Rt,it.data)):e.texImage3D(i.TEXTURE_3D,0,Ct,it.width,it.height,it.depth,0,_t,Rt,it.data);else if(y.isFramebufferTexture){if(oe)if(Ft)e.texStorage2D(i.TEXTURE_2D,at,Ct,it.width,it.height);else{let q=it.width,Q=it.height;for(let dt=0;dt<at;dt++)e.texImage2D(i.TEXTURE_2D,dt,Ct,q,Q,0,_t,Rt,null),q>>=1,Q>>=1}}else if(Gt.length>0){if(Ft&&oe){let q=At(Gt[0]);e.texStorage2D(i.TEXTURE_2D,at,Ct,q.width,q.height)}for(let q=0,Q=Gt.length;q<Q;q++)xt=Gt[q],Ft?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,_t,Rt,xt):e.texImage2D(i.TEXTURE_2D,q,Ct,_t,Rt,xt);y.generateMipmaps=!1}else if(Ft){if(oe){let q=At(it);e.texStorage2D(i.TEXTURE_2D,at,Ct,q.width,q.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t,Rt,it)}else e.texImage2D(i.TEXTURE_2D,0,Ct,_t,Rt,it);m(y)&&p(j),Mt.__version=K.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function Z(A,y,$){if(y.image.length!==6)return;let j=Et(A,y),et=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+$);let K=n.get(et);if(et.version!==K.__version||j===!0){e.activeTexture(i.TEXTURE0+$);let Mt=qt.getPrimaries(qt.workingColorSpace),lt=y.colorSpace===ri?null:qt.getPrimaries(y.colorSpace),gt=y.colorSpace===ri||Mt===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);let Xt=y.isCompressedTexture||y.image[0].isCompressedTexture,it=y.image[0]&&y.image[0].isDataTexture,_t=[];for(let Q=0;Q<6;Q++)!Xt&&!it?_t[Q]=_(y.image[Q],!0,s.maxCubemapSize):_t[Q]=it?y.image[Q].image:y.image[Q],_t[Q]=te(y,_t[Q]);let Rt=_t[0],Ct=r.convert(y.format,y.colorSpace),xt=r.convert(y.type),Gt=x(y.internalFormat,Ct,xt,y.colorSpace),Ft=y.isVideoTexture!==!0,oe=K.__version===void 0||j===!0,D=et.dataReady,at=C(y,Rt);pt(i.TEXTURE_CUBE_MAP,y);let q;if(Xt){Ft&&oe&&e.texStorage2D(i.TEXTURE_CUBE_MAP,at,Gt,Rt.width,Rt.height);for(let Q=0;Q<6;Q++){q=_t[Q].mipmaps;for(let dt=0;dt<q.length;dt++){let ht=q[dt];y.format!==We?Ct!==null?Ft?D&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,0,0,ht.width,ht.height,Ct,ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,Gt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,0,0,ht.width,ht.height,Ct,xt,ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,Gt,ht.width,ht.height,0,Ct,xt,ht.data)}}}else{if(q=y.mipmaps,Ft&&oe){q.length>0&&at++;let Q=At(_t[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,at,Gt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(it){Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,_t[Q].width,_t[Q].height,Ct,xt,_t[Q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Gt,_t[Q].width,_t[Q].height,0,Ct,xt,_t[Q].data);for(let dt=0;dt<q.length;dt++){let Ut=q[dt].image[Q].image;Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,0,0,Ut.width,Ut.height,Ct,xt,Ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,Gt,Ut.width,Ut.height,0,Ct,xt,Ut.data)}}else{Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ct,xt,_t[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Gt,Ct,xt,_t[Q]);for(let dt=0;dt<q.length;dt++){let ht=q[dt];Ft?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,0,0,Ct,xt,ht.image[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,Gt,Ct,xt,ht.image[Q])}}}m(y)&&p(i.TEXTURE_CUBE_MAP),K.__version=et.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function rt(A,y,$,j,et,K){let Mt=r.convert($.format,$.colorSpace),lt=r.convert($.type),gt=x($.internalFormat,Mt,lt,$.colorSpace),Xt=n.get(y),it=n.get($);if(it.__renderTarget=y,!Xt.__hasExternalTextures){let _t=Math.max(1,y.width>>K),Rt=Math.max(1,y.height>>K);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,K,gt,_t,Rt,y.depth,0,Mt,lt,null):e.texImage2D(et,K,gt,_t,Rt,0,Mt,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),$t(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,et,it.__webglTexture,0,kt(y)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,et,it.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function nt(A,y,$){if(i.bindRenderbuffer(i.RENDERBUFFER,A),y.depthBuffer){let j=y.depthTexture,et=j&&j.isDepthTexture?j.type:null,K=v(y.stencilBuffer,et),Mt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=kt(y);$t(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,K,y.width,y.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,K,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,K,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Mt,i.RENDERBUFFER,A)}else{let j=y.textures;for(let et=0;et<j.length;et++){let K=j[et],Mt=r.convert(K.format,K.colorSpace),lt=r.convert(K.type),gt=x(K.internalFormat,Mt,lt,K.colorSpace),Xt=kt(y);$&&$t(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Xt,gt,y.width,y.height):$t(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Xt,gt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,gt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function mt(A,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let j=n.get(y.depthTexture);j.__renderTarget=y,(!j.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),H(y.depthTexture,0);let et=j.__webglTexture,K=kt(y);if(y.depthTexture.format===_s)$t(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0);else if(y.depthTexture.format===Es)$t(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function St(A){let y=n.get(A),$=A.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==A.depthTexture){let j=A.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),j){let et=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,j.removeEventListener("dispose",et)};j.addEventListener("dispose",et),y.__depthDisposeCallback=et}y.__boundDepthTexture=j}if(A.depthTexture&&!y.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");mt(y.__webglFramebuffer,A)}else if($){y.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[j]),y.__webglDepthbuffer[j]===void 0)y.__webglDepthbuffer[j]=i.createRenderbuffer(),nt(y.__webglDepthbuffer[j],A,!1);else{let et=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=y.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),nt(y.__webglDepthbuffer,A,!1);else{let j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,et)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(A,y,$){let j=n.get(A);y!==void 0&&rt(j.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),$!==void 0&&St(A)}function ne(A){let y=A.texture,$=n.get(A),j=n.get(y);A.addEventListener("dispose",R);let et=A.textures,K=A.isWebGLCubeRenderTarget===!0,Mt=et.length>1;if(Mt||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=y.version,o.memory.textures++),K){$.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(y.mipmaps&&y.mipmaps.length>0){$.__webglFramebuffer[lt]=[];for(let gt=0;gt<y.mipmaps.length;gt++)$.__webglFramebuffer[lt][gt]=i.createFramebuffer()}else $.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){$.__webglFramebuffer=[];for(let lt=0;lt<y.mipmaps.length;lt++)$.__webglFramebuffer[lt]=i.createFramebuffer()}else $.__webglFramebuffer=i.createFramebuffer();if(Mt)for(let lt=0,gt=et.length;lt<gt;lt++){let Xt=n.get(et[lt]);Xt.__webglTexture===void 0&&(Xt.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&$t(A)===!1){$.__webglMultisampledFramebuffer=i.createFramebuffer(),$.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let lt=0;lt<et.length;lt++){let gt=et[lt];$.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,$.__webglColorRenderbuffer[lt]);let Xt=r.convert(gt.format,gt.colorSpace),it=r.convert(gt.type),_t=x(gt.internalFormat,Xt,it,gt.colorSpace,A.isXRRenderTarget===!0),Rt=kt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,_t,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,$.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&($.__webglDepthRenderbuffer=i.createRenderbuffer(),nt($.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),pt(i.TEXTURE_CUBE_MAP,y);for(let lt=0;lt<6;lt++)if(y.mipmaps&&y.mipmaps.length>0)for(let gt=0;gt<y.mipmaps.length;gt++)rt($.__webglFramebuffer[lt][gt],A,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,gt);else rt($.__webglFramebuffer[lt],A,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);m(y)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let lt=0,gt=et.length;lt<gt;lt++){let Xt=et[lt],it=n.get(Xt);e.bindTexture(i.TEXTURE_2D,it.__webglTexture),pt(i.TEXTURE_2D,Xt),rt($.__webglFramebuffer,A,Xt,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),m(Xt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(lt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,j.__webglTexture),pt(lt,y),y.mipmaps&&y.mipmaps.length>0)for(let gt=0;gt<y.mipmaps.length;gt++)rt($.__webglFramebuffer[gt],A,y,i.COLOR_ATTACHMENT0,lt,gt);else rt($.__webglFramebuffer,A,y,i.COLOR_ATTACHMENT0,lt,0);m(y)&&p(lt),e.unbindTexture()}A.depthBuffer&&St(A)}function Ht(A){let y=A.textures;for(let $=0,j=y.length;$<j;$++){let et=y[$];if(m(et)){let K=b(A),Mt=n.get(et).__webglTexture;e.bindTexture(K,Mt),p(K),e.unbindTexture()}}}let fe=[],U=[];function _e(A){if(A.samples>0){if($t(A)===!1){let y=A.textures,$=A.width,j=A.height,et=i.COLOR_BUFFER_BIT,K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Mt=n.get(A),lt=y.length>1;if(lt)for(let gt=0;gt<y.length;gt++)e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let gt=0;gt<y.length;gt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[gt]);let Xt=n.get(y[gt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Xt,0)}i.blitFramebuffer(0,0,$,j,0,0,$,j,et,i.NEAREST),l===!0&&(fe.length=0,U.length=0,fe.push(i.COLOR_ATTACHMENT0+gt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(fe.push(K),U.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,U)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,fe))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let gt=0;gt<y.length;gt++){e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[gt]);let Xt=n.get(y[gt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,Xt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let y=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function kt(A){return Math.min(s.maxSamples,A.samples)}function $t(A){let y=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Tt(A){let y=o.render.frame;h.get(A)!==y&&(h.set(A,y),A.update())}function te(A,y){let $=A.colorSpace,j=A.format,et=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||$!==Ps&&$!==ri&&(qt.getTransfer($)===ie?(j!==We||et!==en)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),y}function At(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=E,this.resetTextureUnits=L,this.setTexture2D=H,this.setTexture2DArray=N,this.setTexture3D=X,this.setTextureCube=F,this.rebindTextures=Lt,this.setupRenderTarget=ne,this.updateRenderTargetMipmap=Ht,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=$t}function Hb(i,t){function e(n,s=ri){let r,o=qt.getTransfer(s);if(n===en)return i.UNSIGNED_BYTE;if(n===Dh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Lh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Jf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Zf)return i.BYTE;if(n===Kf)return i.SHORT;if(n===gr)return i.UNSIGNED_SHORT;if(n===Ih)return i.INT;if(n===Ui)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===wr)return i.HALF_FLOAT;if(n===jf)return i.ALPHA;if(n===Qf)return i.RGB;if(n===We)return i.RGBA;if(n===tp)return i.LUMINANCE;if(n===ep)return i.LUMINANCE_ALPHA;if(n===_s)return i.DEPTH_COMPONENT;if(n===Es)return i.DEPTH_STENCIL;if(n===Uh)return i.RED;if(n===Nh)return i.RED_INTEGER;if(n===np)return i.RG;if(n===Oh)return i.RG_INTEGER;if(n===kh)return i.RGBA_INTEGER;if(n===ko||n===Fo||n===zo||n===Bo)if(o===ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ko)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ko)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Fo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Bo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ec||n===Ac||n===Tc||n===Rc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ec)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ac)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Tc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Rc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Cc||n===Pc||n===Ic)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Cc||n===Pc)return o===ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ic)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Dc||n===Lc||n===Uc||n===Nc||n===Oc||n===kc||n===Fc||n===zc||n===Bc||n===Vc||n===$c||n===Hc||n===Gc||n===Wc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Dc)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lc)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Uc)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Nc)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Oc)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===kc)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Fc)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===zc)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Bc)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Vc)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$c)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Hc)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Gc)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wc)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vo||n===Xc||n===qc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Vo)return o===ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Xc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ip||n===Yc||n===Zc||n===Kc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Vo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Yc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Zc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Kc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var uh=class extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},xn=class extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}},Gb={type:"move"},mr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Gb)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new xn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Wb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xb=`
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

}`,dh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new Je,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new bn({vertexShader:Wb,fragmentShader:Xb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ee(new Jo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},fh=class extends zn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,_=new dh,m=e.getContextAttributes(),p=null,b=null,x=[],v=[],C=new It,T=null,R=new Ve;R.viewport=new ge;let I=new Ve;I.viewport=new ge;let S=[R,I],M=new uh,P=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let Z=x[V];return Z===void 0&&(Z=new mr,x[V]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(V){let Z=x[V];return Z===void 0&&(Z=new mr,x[V]=Z),Z.getGripSpace()},this.getHand=function(V){let Z=x[V];return Z===void 0&&(Z=new mr,x[V]=Z),Z.getHandSpace()};function E(V){let Z=v.indexOf(V.inputSource);if(Z===-1)return;let rt=x[Z];rt!==void 0&&(rt.update(V.inputSource,V.frame,c||o),rt.dispatchEvent({type:V.type,data:V.inputSource}))}function z(){s.removeEventListener("select",E),s.removeEventListener("selectstart",E),s.removeEventListener("selectend",E),s.removeEventListener("squeeze",E),s.removeEventListener("squeezestart",E),s.removeEventListener("squeezeend",E),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",H);for(let V=0;V<x.length;V++){let Z=v[V];Z!==null&&(v[V]=null,x[V].disconnect(Z))}P=null,L=null,_.reset(),t.setRenderTarget(p),f=null,u=null,d=null,s=null,b=null,Et.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",E),s.addEventListener("selectstart",E),s.addEventListener("selectend",E),s.addEventListener("squeeze",E),s.addEventListener("squeezestart",E),s.addEventListener("squeezeend",E),s.addEventListener("end",z),s.addEventListener("inputsourceschange",H),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(C),s.renderState.layers===void 0){let Z={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,Z),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Bn(f.framebufferWidth,f.framebufferHeight,{format:We,type:en,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let Z=null,rt=null,nt=null;m.depth&&(nt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Z=m.stencil?Es:_s,rt=m.stencil?Ss:Ui);let mt={colorFormat:e.RGBA8,depthFormat:nt,scaleFactor:r};d=new XRWebGLBinding(s,e),u=d.createProjectionLayer(mt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new Bn(u.textureWidth,u.textureHeight,{format:We,type:en,depthTexture:new ta(u.textureWidth,u.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Et.setContext(s),Et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function H(V){for(let Z=0;Z<V.removed.length;Z++){let rt=V.removed[Z],nt=v.indexOf(rt);nt>=0&&(v[nt]=null,x[nt].disconnect(rt))}for(let Z=0;Z<V.added.length;Z++){let rt=V.added[Z],nt=v.indexOf(rt);if(nt===-1){for(let St=0;St<x.length;St++)if(St>=v.length){v.push(rt),nt=St;break}else if(v[St]===null){v[St]=rt,nt=St;break}if(nt===-1)break}let mt=x[nt];mt&&mt.connect(rt)}}let N=new B,X=new B;function F(V,Z,rt){N.setFromMatrixPosition(Z.matrixWorld),X.setFromMatrixPosition(rt.matrixWorld);let nt=N.distanceTo(X),mt=Z.projectionMatrix.elements,St=rt.projectionMatrix.elements,Lt=mt[14]/(mt[10]-1),ne=mt[14]/(mt[10]+1),Ht=(mt[9]+1)/mt[5],fe=(mt[9]-1)/mt[5],U=(mt[8]-1)/mt[0],_e=(St[8]+1)/St[0],kt=Lt*U,$t=Lt*_e,Tt=nt/(-U+_e),te=Tt*-U;if(Z.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(te),V.translateZ(Tt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),mt[10]===-1)V.projectionMatrix.copy(Z.projectionMatrix),V.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let At=Lt+Tt,A=ne+Tt,y=kt-te,$=$t+(nt-te),j=Ht*ne/A*At,et=fe*ne/A*At;V.projectionMatrix.makePerspective(y,$,j,et,At,A),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function tt(V,Z){Z===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(Z.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let Z=V.near,rt=V.far;_.texture!==null&&(_.depthNear>0&&(Z=_.depthNear),_.depthFar>0&&(rt=_.depthFar)),M.near=I.near=R.near=Z,M.far=I.far=R.far=rt,(P!==M.near||L!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,L=M.far),R.layers.mask=V.layers.mask|2,I.layers.mask=V.layers.mask|4,M.layers.mask=R.layers.mask|I.layers.mask;let nt=V.parent,mt=M.cameras;tt(M,nt);for(let St=0;St<mt.length;St++)tt(mt[St],nt);mt.length===2?F(M,R,I):M.projectionMatrix.copy(R.projectionMatrix),J(V,M,nt)};function J(V,Z,rt){rt===null?V.matrix.copy(Z.matrixWorld):(V.matrix.copy(rt.matrixWorld),V.matrix.invert(),V.matrix.multiply(Z.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(Z.projectionMatrix),V.projectionMatrixInverse.copy(Z.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=_r*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(V){l=V,u!==null&&(u.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let ct=null;function pt(V,Z){if(h=Z.getViewerPose(c||o),g=Z,h!==null){let rt=h.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let nt=!1;rt.length!==M.cameras.length&&(M.cameras.length=0,nt=!0);for(let St=0;St<rt.length;St++){let Lt=rt[St],ne=null;if(f!==null)ne=f.getViewport(Lt);else{let fe=d.getViewSubImage(u,Lt);ne=fe.viewport,St===0&&(t.setRenderTargetTextures(b,fe.colorTexture,u.ignoreDepthValues?void 0:fe.depthStencilTexture),t.setRenderTarget(b))}let Ht=S[St];Ht===void 0&&(Ht=new Ve,Ht.layers.enable(St),Ht.viewport=new ge,S[St]=Ht),Ht.matrix.fromArray(Lt.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray(Lt.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(ne.x,ne.y,ne.width,ne.height),St===0&&(M.matrix.copy(Ht.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),nt===!0&&M.cameras.push(Ht)}let mt=s.enabledFeatures;if(mt&&mt.includes("depth-sensing")){let St=d.getDepthInformation(rt[0]);St&&St.isValid&&St.texture&&_.init(t,St,s.renderState)}}for(let rt=0;rt<x.length;rt++){let nt=v[rt],mt=x[rt];nt!==null&&mt!==void 0&&mt.update(nt,Z,c||o)}ct&&ct(V,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}let Et=new hp;Et.setAnimationLoop(pt),this.setAnimationLoop=function(V){ct=V},this.dispose=function(){}}},Ri=new vn,qb=new Qt;function Yb(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,cp(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Xe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Xe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=t.get(p),x=b.envMap,v=b.envMapRotation;x&&(m.envMap.value=x,Ri.copy(v),Ri.x*=-1,Ri.y*=-1,Ri.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ri.y*=-1,Ri.z*=-1),m.envMapRotation.value.setFromMatrix4(qb.makeRotationFromEuler(Ri)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Zb(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,x){let v=x.program;n.uniformBlockBinding(b,v)}function c(b,x){let v=s[b.id];v===void 0&&(g(b),v=h(b),s[b.id]=v,b.addEventListener("dispose",m));let C=x.program;n.updateUBOMapping(b,C);let T=t.render.frame;r[b.id]!==T&&(u(b),r[b.id]=T)}function h(b){let x=d();b.__bindingPointIndex=x;let v=i.createBuffer(),C=b.__size,T=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,C,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,v),v}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(b){let x=s[b.id],v=b.uniforms,C=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let T=0,R=v.length;T<R;T++){let I=Array.isArray(v[T])?v[T]:[v[T]];for(let S=0,M=I.length;S<M;S++){let P=I[S];if(f(P,T,S,C)===!0){let L=P.__offset,E=Array.isArray(P.value)?P.value:[P.value],z=0;for(let H=0;H<E.length;H++){let N=E[H],X=_(N);typeof N=="number"||typeof N=="boolean"?(P.__data[0]=N,i.bufferSubData(i.UNIFORM_BUFFER,L+z,P.__data)):N.isMatrix3?(P.__data[0]=N.elements[0],P.__data[1]=N.elements[1],P.__data[2]=N.elements[2],P.__data[3]=0,P.__data[4]=N.elements[3],P.__data[5]=N.elements[4],P.__data[6]=N.elements[5],P.__data[7]=0,P.__data[8]=N.elements[6],P.__data[9]=N.elements[7],P.__data[10]=N.elements[8],P.__data[11]=0):(N.toArray(P.__data,z),z+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,x,v,C){let T=b.value,R=x+"_"+v;if(C[R]===void 0)return typeof T=="number"||typeof T=="boolean"?C[R]=T:C[R]=T.clone(),!0;{let I=C[R];if(typeof T=="number"||typeof T=="boolean"){if(I!==T)return C[R]=T,!0}else if(I.equals(T)===!1)return I.copy(T),!0}return!1}function g(b){let x=b.uniforms,v=0,C=16;for(let R=0,I=x.length;R<I;R++){let S=Array.isArray(x[R])?x[R]:[x[R]];for(let M=0,P=S.length;M<P;M++){let L=S[M],E=Array.isArray(L.value)?L.value:[L.value];for(let z=0,H=E.length;z<H;z++){let N=E[z],X=_(N),F=v%C,tt=F%X.boundary,J=F+tt;v+=tt,J!==0&&C-J<X.storage&&(v+=C-J),L.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=v,v+=X.storage}}}let T=v%C;return T>0&&(v+=C-T),b.__size=v,b.__cache={},this}function _(b){let x={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(x.boundary=4,x.storage=4):b.isVector2?(x.boundary=8,x.storage=8):b.isVector3||b.isColor?(x.boundary=16,x.storage=12):b.isVector4?(x.boundary=16,x.storage=16):b.isMatrix3?(x.boundary=48,x.storage=48):b.isMatrix4?(x.boundary=64,x.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),x}function m(b){let x=b.target;x.removeEventListener("dispose",m);let v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(let b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}var ea=class{constructor(t={}){let{canvas:e=Q_(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,b=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Pe,this.toneMapping=li,this.toneMappingExposure=1;let v=this,C=!1,T=0,R=0,I=null,S=-1,M=null,P=new ge,L=new ge,E=null,z=new Vt(0),H=0,N=e.width,X=e.height,F=1,tt=null,J=null,ct=new ge(0,0,N,X),pt=new ge(0,0,N,X),Et=!1,V=new vr,Z=!1,rt=!1,nt=new Qt,mt=new Qt,St=new B,Lt=new ge,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ht=!1;function fe(){return I===null?F:1}let U=n;function _e(w,O){return e.getContext(w,O)}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ch}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ht,!1),U===null){let O="webgl2";if(U=_e(O,w),U===null)throw _e(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let kt,$t,Tt,te,At,A,y,$,j,et,K,Mt,lt,gt,Xt,it,_t,Rt,Ct,xt,Gt,Ft,oe,D;function at(){kt=new uy(U),kt.init(),Ft=new Hb(U,kt),$t=new ry(U,kt,t,Ft),Tt=new Bb(U,kt),$t.reverseDepthBuffer&&u&&Tt.buffers.depth.setReversed(!0),te=new py(U),At=new Tb,A=new $b(U,kt,Tt,At,$t,Ft,te),y=new ay(v),$=new hy(v),j=new b0(U),oe=new iy(U,j),et=new dy(U,j,te,oe),K=new gy(U,et,j,te),Ct=new my(U,$t,A),it=new oy(At),Mt=new Ab(v,y,$,kt,$t,oe,it),lt=new Yb(v,At),gt=new Cb,Xt=new Nb(kt),Rt=new ny(v,y,$,Tt,K,f,l),_t=new Fb(v,K,$t),D=new Zb(U,te,$t,Tt),xt=new sy(U,kt,te),Gt=new fy(U,kt,te),te.programs=Mt.programs,v.capabilities=$t,v.extensions=kt,v.properties=At,v.renderLists=gt,v.shadowMap=_t,v.state=Tt,v.info=te}at();let q=new fh(v,U);this.xr=q,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let w=kt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=kt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(w){w!==void 0&&(F=w,this.setSize(N,X,!1))},this.getSize=function(w){return w.set(N,X)},this.setSize=function(w,O,G=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=w,X=O,e.width=Math.floor(w*F),e.height=Math.floor(O*F),G===!0&&(e.style.width=w+"px",e.style.height=O+"px"),this.setViewport(0,0,w,O)},this.getDrawingBufferSize=function(w){return w.set(N*F,X*F).floor()},this.setDrawingBufferSize=function(w,O,G){N=w,X=O,F=G,e.width=Math.floor(w*G),e.height=Math.floor(O*G),this.setViewport(0,0,w,O)},this.getCurrentViewport=function(w){return w.copy(P)},this.getViewport=function(w){return w.copy(ct)},this.setViewport=function(w,O,G,W){w.isVector4?ct.set(w.x,w.y,w.z,w.w):ct.set(w,O,G,W),Tt.viewport(P.copy(ct).multiplyScalar(F).round())},this.getScissor=function(w){return w.copy(pt)},this.setScissor=function(w,O,G,W){w.isVector4?pt.set(w.x,w.y,w.z,w.w):pt.set(w,O,G,W),Tt.scissor(L.copy(pt).multiplyScalar(F).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(w){Tt.setScissorTest(Et=w)},this.setOpaqueSort=function(w){tt=w},this.setTransparentSort=function(w){J=w},this.getClearColor=function(w){return w.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(w=!0,O=!0,G=!0){let W=0;if(w){let k=!1;if(I!==null){let st=I.texture.format;k=st===kh||st===Oh||st===Nh}if(k){let st=I.texture.type,ut=st===en||st===Ui||st===gr||st===Ss||st===Dh||st===Lh,vt=Rt.getClearColor(),yt=Rt.getClearAlpha(),Pt=vt.r,Nt=vt.g,bt=vt.b;ut?(g[0]=Pt,g[1]=Nt,g[2]=bt,g[3]=yt,U.clearBufferuiv(U.COLOR,0,g)):(_[0]=Pt,_[1]=Nt,_[2]=bt,_[3]=yt,U.clearBufferiv(U.COLOR,0,_))}else W|=U.COLOR_BUFFER_BIT}O&&(W|=U.DEPTH_BUFFER_BIT),G&&(W|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),gt.dispose(),Xt.dispose(),At.dispose(),y.dispose(),$.dispose(),K.dispose(),oe.dispose(),D.dispose(),Mt.dispose(),q.dispose(),q.removeEventListener("sessionstart",Cu),q.removeEventListener("sessionend",Pu),mi.stop()};function Q(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let w=te.autoReset,O=_t.enabled,G=_t.autoUpdate,W=_t.needsUpdate,k=_t.type;at(),te.autoReset=w,_t.enabled=O,_t.autoUpdate=G,_t.needsUpdate=W,_t.type=k}function ht(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Ut(w){let O=w.target;O.removeEventListener("dispose",Ut),me(O)}function me(w){De(w),At.remove(w)}function De(w){let O=At.get(w).programs;O!==void 0&&(O.forEach(function(G){Mt.releaseProgram(G)}),w.isShaderMaterial&&Mt.releaseShaderCache(w))}this.renderBufferDirect=function(w,O,G,W,k,st){O===null&&(O=ne);let ut=k.isMesh&&k.matrixWorld.determinant()<0,vt=tg(w,O,G,W,k);Tt.setMaterial(W,ut);let yt=G.index,Pt=1;if(W.wireframe===!0){if(yt=et.getWireframeAttribute(G),yt===void 0)return;Pt=2}let Nt=G.drawRange,bt=G.attributes.position,Kt=Nt.start*Pt,ae=(Nt.start+Nt.count)*Pt;st!==null&&(Kt=Math.max(Kt,st.start*Pt),ae=Math.min(ae,(st.start+st.count)*Pt)),yt!==null?(Kt=Math.max(Kt,0),ae=Math.min(ae,yt.count)):bt!=null&&(Kt=Math.max(Kt,0),ae=Math.min(ae,bt.count));let le=ae-Kt;if(le<0||le===1/0)return;oe.setup(k,W,vt,G,yt);let He,Jt=xt;if(yt!==null&&(He=j.get(yt),Jt=Gt,Jt.setIndex(He)),k.isMesh)W.wireframe===!0?(Tt.setLineWidth(W.wireframeLinewidth*fe()),Jt.setMode(U.LINES)):Jt.setMode(U.TRIANGLES);else if(k.isLine){let wt=W.linewidth;wt===void 0&&(wt=1),Tt.setLineWidth(wt*fe()),k.isLineSegments?Jt.setMode(U.LINES):k.isLineLoop?Jt.setMode(U.LINE_LOOP):Jt.setMode(U.LINE_STRIP)}else k.isPoints?Jt.setMode(U.POINTS):k.isSprite&&Jt.setMode(U.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Jt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(kt.get("WEBGL_multi_draw"))Jt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let wt=k._multiDrawStarts,An=k._multiDrawCounts,jt=k._multiDrawCount,rn=yt?j.get(yt).bytesPerElement:1,Xi=At.get(W).currentProgram.getUniforms();for(let Ye=0;Ye<jt;Ye++)Xi.setValue(U,"_gl_DrawID",Ye),Jt.render(wt[Ye]/rn,An[Ye])}else if(k.isInstancedMesh)Jt.renderInstances(Kt,le,k.count);else if(G.isInstancedBufferGeometry){let wt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,An=Math.min(G.instanceCount,wt);Jt.renderInstances(Kt,le,An)}else Jt.render(Kt,le)};function ee(w,O,G){w.transparent===!0&&w.side===Se&&w.forceSinglePass===!1?(w.side=Xe,w.needsUpdate=!0,zr(w,O,G),w.side=ci,w.needsUpdate=!0,zr(w,O,G),w.side=Se):zr(w,O,G)}this.compile=function(w,O,G=null){G===null&&(G=w),p=Xt.get(G),p.init(O),x.push(p),G.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),w!==G&&w.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let W=new Set;return w.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let st=k.material;if(st)if(Array.isArray(st))for(let ut=0;ut<st.length;ut++){let vt=st[ut];ee(vt,G,k),W.add(vt)}else ee(st,G,k),W.add(st)}),x.pop(),p=null,W},this.compileAsync=function(w,O,G=null){let W=this.compile(w,O,G);return new Promise(k=>{function st(){if(W.forEach(function(ut){At.get(ut).currentProgram.isReady()&&W.delete(ut)}),W.size===0){k(w);return}setTimeout(st,10)}kt.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let sn=null;function En(w){sn&&sn(w)}function Cu(){mi.stop()}function Pu(){mi.start()}let mi=new hp;mi.setAnimationLoop(En),typeof self<"u"&&mi.setContext(self),this.setAnimationLoop=function(w){sn=w,q.setAnimationLoop(w),w===null?mi.stop():mi.start()},q.addEventListener("sessionstart",Cu),q.addEventListener("sessionend",Pu),this.render=function(w,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(O),O=q.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,O,I),p=Xt.get(w,x.length),p.init(O),x.push(p),mt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),V.setFromProjectionMatrix(mt),rt=this.localClippingEnabled,Z=it.init(this.clippingPlanes,rt),m=gt.get(w,b.length),m.init(),b.push(m),q.enabled===!0&&q.isPresenting===!0){let st=v.xr.getDepthSensingMesh();st!==null&&nl(st,O,-1/0,v.sortObjects)}nl(w,O,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(tt,J),Ht=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Ht&&Rt.addToRenderList(m,w),this.info.render.frame++,Z===!0&&it.beginShadows();let G=p.state.shadowsArray;_t.render(G,w,O),Z===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=m.opaque,k=m.transmissive;if(p.setupLights(),O.isArrayCamera){let st=O.cameras;if(k.length>0)for(let ut=0,vt=st.length;ut<vt;ut++){let yt=st[ut];Du(W,k,w,yt)}Ht&&Rt.render(w);for(let ut=0,vt=st.length;ut<vt;ut++){let yt=st[ut];Iu(m,w,yt,yt.viewport)}}else k.length>0&&Du(W,k,w,O),Ht&&Rt.render(w),Iu(m,w,O);I!==null&&(A.updateMultisampleRenderTarget(I),A.updateRenderTargetMipmap(I)),w.isScene===!0&&w.onAfterRender(v,w,O),oe.resetDefaultState(),S=-1,M=null,x.pop(),x.length>0?(p=x[x.length-1],Z===!0&&it.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function nl(w,O,G,W){if(w.visible===!1)return;if(w.layers.test(O.layers)){if(w.isGroup)G=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(O);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||V.intersectsSprite(w)){W&&Lt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(mt);let ut=K.update(w),vt=w.material;vt.visible&&m.push(w,ut,vt,G,Lt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||V.intersectsObject(w))){let ut=K.update(w),vt=w.material;if(W&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Lt.copy(w.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Lt.copy(ut.boundingSphere.center)),Lt.applyMatrix4(w.matrixWorld).applyMatrix4(mt)),Array.isArray(vt)){let yt=ut.groups;for(let Pt=0,Nt=yt.length;Pt<Nt;Pt++){let bt=yt[Pt],Kt=vt[bt.materialIndex];Kt&&Kt.visible&&m.push(w,ut,Kt,G,Lt.z,bt)}}else vt.visible&&m.push(w,ut,vt,G,Lt.z,null)}}let st=w.children;for(let ut=0,vt=st.length;ut<vt;ut++)nl(st[ut],O,G,W)}function Iu(w,O,G,W){let k=w.opaque,st=w.transmissive,ut=w.transparent;p.setupLightsView(G),Z===!0&&it.setGlobalState(v.clippingPlanes,G),W&&Tt.viewport(P.copy(W)),k.length>0&&Fr(k,O,G),st.length>0&&Fr(st,O,G),ut.length>0&&Fr(ut,O,G),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function Du(w,O,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Bn(1,1,{generateMipmaps:!0,type:kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float")?wr:en,minFilter:Li,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));let st=p.state.transmissionRenderTarget[W.id],ut=W.viewport||P;st.setSize(ut.z,ut.w);let vt=v.getRenderTarget();v.setRenderTarget(st),v.getClearColor(z),H=v.getClearAlpha(),H<1&&v.setClearColor(16777215,.5),v.clear(),Ht&&Rt.render(G);let yt=v.toneMapping;v.toneMapping=li;let Pt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),Z===!0&&it.setGlobalState(v.clippingPlanes,W),Fr(w,G,W),A.updateMultisampleRenderTarget(st),A.updateRenderTargetMipmap(st),kt.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let bt=0,Kt=O.length;bt<Kt;bt++){let ae=O[bt],le=ae.object,He=ae.geometry,Jt=ae.material,wt=ae.group;if(Jt.side===Se&&le.layers.test(W.layers)){let An=Jt.side;Jt.side=Xe,Jt.needsUpdate=!0,Lu(le,G,W,He,Jt,wt),Jt.side=An,Jt.needsUpdate=!0,Nt=!0}}Nt===!0&&(A.updateMultisampleRenderTarget(st),A.updateRenderTargetMipmap(st))}v.setRenderTarget(vt),v.setClearColor(z,H),Pt!==void 0&&(W.viewport=Pt),v.toneMapping=yt}function Fr(w,O,G){let W=O.isScene===!0?O.overrideMaterial:null;for(let k=0,st=w.length;k<st;k++){let ut=w[k],vt=ut.object,yt=ut.geometry,Pt=W===null?ut.material:W,Nt=ut.group;vt.layers.test(G.layers)&&Lu(vt,O,G,yt,Pt,Nt)}}function Lu(w,O,G,W,k,st){w.onBeforeRender(v,O,G,W,k,st),w.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),k.onBeforeRender(v,O,G,W,w,st),k.transparent===!0&&k.side===Se&&k.forceSinglePass===!1?(k.side=Xe,k.needsUpdate=!0,v.renderBufferDirect(G,O,W,k,w,st),k.side=ci,k.needsUpdate=!0,v.renderBufferDirect(G,O,W,k,w,st),k.side=Se):v.renderBufferDirect(G,O,W,k,w,st),w.onAfterRender(v,O,G,W,k,st)}function zr(w,O,G){O.isScene!==!0&&(O=ne);let W=At.get(w),k=p.state.lights,st=p.state.shadowsArray,ut=k.state.version,vt=Mt.getParameters(w,k.state,st,O,G),yt=Mt.getProgramCacheKey(vt),Pt=W.programs;W.environment=w.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(w.isMeshStandardMaterial?$:y).get(w.envMap||W.environment),W.envMapRotation=W.environment!==null&&w.envMap===null?O.environmentRotation:w.envMapRotation,Pt===void 0&&(w.addEventListener("dispose",Ut),Pt=new Map,W.programs=Pt);let Nt=Pt.get(yt);if(Nt!==void 0){if(W.currentProgram===Nt&&W.lightsStateVersion===ut)return Nu(w,vt),Nt}else vt.uniforms=Mt.getUniforms(w),w.onBeforeCompile(vt,v),Nt=Mt.acquireProgram(vt,yt),Pt.set(yt,Nt),W.uniforms=vt.uniforms;let bt=W.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(bt.clippingPlanes=it.uniform),Nu(w,vt),W.needsLights=ng(w),W.lightsStateVersion=ut,W.needsLights&&(bt.ambientLightColor.value=k.state.ambient,bt.lightProbe.value=k.state.probe,bt.directionalLights.value=k.state.directional,bt.directionalLightShadows.value=k.state.directionalShadow,bt.spotLights.value=k.state.spot,bt.spotLightShadows.value=k.state.spotShadow,bt.rectAreaLights.value=k.state.rectArea,bt.ltc_1.value=k.state.rectAreaLTC1,bt.ltc_2.value=k.state.rectAreaLTC2,bt.pointLights.value=k.state.point,bt.pointLightShadows.value=k.state.pointShadow,bt.hemisphereLights.value=k.state.hemi,bt.directionalShadowMap.value=k.state.directionalShadowMap,bt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,bt.spotShadowMap.value=k.state.spotShadowMap,bt.spotLightMatrix.value=k.state.spotLightMatrix,bt.spotLightMap.value=k.state.spotLightMap,bt.pointShadowMap.value=k.state.pointShadowMap,bt.pointShadowMatrix.value=k.state.pointShadowMatrix),W.currentProgram=Nt,W.uniformsList=null,Nt}function Uu(w){if(w.uniformsList===null){let O=w.currentProgram.getUniforms();w.uniformsList=ys.seqWithValue(O.seq,w.uniforms)}return w.uniformsList}function Nu(w,O){let G=At.get(w);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function tg(w,O,G,W,k){O.isScene!==!0&&(O=ne),A.resetTextureUnits();let st=O.fog,ut=W.isMeshStandardMaterial?O.environment:null,vt=I===null?v.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ps,yt=(W.isMeshStandardMaterial?$:y).get(W.envMap||ut),Pt=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Nt=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),bt=!!G.morphAttributes.position,Kt=!!G.morphAttributes.normal,ae=!!G.morphAttributes.color,le=li;W.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(le=v.toneMapping);let He=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Jt=He!==void 0?He.length:0,wt=At.get(W),An=p.state.lights;if(Z===!0&&(rt===!0||w!==M)){let je=w===M&&W.id===S;it.setState(W,w,je)}let jt=!1;W.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==An.state.version||wt.outputColorSpace!==vt||k.isBatchedMesh&&wt.batching===!1||!k.isBatchedMesh&&wt.batching===!0||k.isBatchedMesh&&wt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&wt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&wt.instancing===!1||!k.isInstancedMesh&&wt.instancing===!0||k.isSkinnedMesh&&wt.skinning===!1||!k.isSkinnedMesh&&wt.skinning===!0||k.isInstancedMesh&&wt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&wt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&wt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&wt.instancingMorph===!1&&k.morphTexture!==null||wt.envMap!==yt||W.fog===!0&&wt.fog!==st||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==it.numPlanes||wt.numIntersection!==it.numIntersection)||wt.vertexAlphas!==Pt||wt.vertexTangents!==Nt||wt.morphTargets!==bt||wt.morphNormals!==Kt||wt.morphColors!==ae||wt.toneMapping!==le||wt.morphTargetsCount!==Jt)&&(jt=!0):(jt=!0,wt.__version=W.version);let rn=wt.currentProgram;jt===!0&&(rn=zr(W,O,k));let Xi=!1,Ye=!1,Hs=!1,ce=rn.getUniforms(),fn=wt.uniforms;if(Tt.useProgram(rn.program)&&(Xi=!0,Ye=!0,Hs=!0),W.id!==S&&(S=W.id,Ye=!0),Xi||M!==w){Tt.buffers.depth.getReversed()?(nt.copy(w.projectionMatrix),e0(nt),n0(nt),ce.setValue(U,"projectionMatrix",nt)):ce.setValue(U,"projectionMatrix",w.projectionMatrix),ce.setValue(U,"viewMatrix",w.matrixWorldInverse);let Yn=ce.map.cameraPosition;Yn!==void 0&&Yn.setValue(U,St.setFromMatrixPosition(w.matrixWorld)),$t.logarithmicDepthBuffer&&ce.setValue(U,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ce.setValue(U,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,Ye=!0,Hs=!0)}if(k.isSkinnedMesh){ce.setOptional(U,k,"bindMatrix"),ce.setOptional(U,k,"bindMatrixInverse");let je=k.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),ce.setValue(U,"boneTexture",je.boneTexture,A))}k.isBatchedMesh&&(ce.setOptional(U,k,"batchingTexture"),ce.setValue(U,"batchingTexture",k._matricesTexture,A),ce.setOptional(U,k,"batchingIdTexture"),ce.setValue(U,"batchingIdTexture",k._indirectTexture,A),ce.setOptional(U,k,"batchingColorTexture"),k._colorsTexture!==null&&ce.setValue(U,"batchingColorTexture",k._colorsTexture,A));let Gs=G.morphAttributes;if((Gs.position!==void 0||Gs.normal!==void 0||Gs.color!==void 0)&&Ct.update(k,G,rn),(Ye||wt.receiveShadow!==k.receiveShadow)&&(wt.receiveShadow=k.receiveShadow,ce.setValue(U,"receiveShadow",k.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(fn.envMap.value=yt,fn.flipEnvMap.value=yt.isCubeTexture&&yt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&O.environment!==null&&(fn.envMapIntensity.value=O.environmentIntensity),Ye&&(ce.setValue(U,"toneMappingExposure",v.toneMappingExposure),wt.needsLights&&eg(fn,Hs),st&&W.fog===!0&&lt.refreshFogUniforms(fn,st),lt.refreshMaterialUniforms(fn,W,F,X,p.state.transmissionRenderTarget[w.id]),ys.upload(U,Uu(wt),fn,A)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(ys.upload(U,Uu(wt),fn,A),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ce.setValue(U,"center",k.center),ce.setValue(U,"modelViewMatrix",k.modelViewMatrix),ce.setValue(U,"normalMatrix",k.normalMatrix),ce.setValue(U,"modelMatrix",k.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let je=W.uniformsGroups;for(let Yn=0,Zn=je.length;Yn<Zn;Yn++){let Ou=je[Yn];D.update(Ou,rn),D.bind(Ou,rn)}}return rn}function eg(w,O){w.ambientLightColor.needsUpdate=O,w.lightProbe.needsUpdate=O,w.directionalLights.needsUpdate=O,w.directionalLightShadows.needsUpdate=O,w.pointLights.needsUpdate=O,w.pointLightShadows.needsUpdate=O,w.spotLights.needsUpdate=O,w.spotLightShadows.needsUpdate=O,w.rectAreaLights.needsUpdate=O,w.hemisphereLights.needsUpdate=O}function ng(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(w,O,G){At.get(w.texture).__webglTexture=O,At.get(w.depthTexture).__webglTexture=G;let W=At.get(w);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||kt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,O){let G=At.get(w);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(w,O=0,G=0){I=w,T=O,R=G;let W=!0,k=null,st=!1,ut=!1;if(w){let yt=At.get(w);if(yt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(U.FRAMEBUFFER,null),W=!1;else if(yt.__webglFramebuffer===void 0)A.setupRenderTarget(w);else if(yt.__hasExternalTextures)A.rebindTextures(w,At.get(w.texture).__webglTexture,At.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let bt=w.depthTexture;if(yt.__boundDepthTexture!==bt){if(bt!==null&&At.has(bt)&&(w.width!==bt.image.width||w.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(w)}}let Pt=w.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(ut=!0);let Nt=At.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Nt[O])?k=Nt[O][G]:k=Nt[O],st=!0):w.samples>0&&A.useMultisampledRTT(w)===!1?k=At.get(w).__webglMultisampledFramebuffer:Array.isArray(Nt)?k=Nt[G]:k=Nt,P.copy(w.viewport),L.copy(w.scissor),E=w.scissorTest}else P.copy(ct).multiplyScalar(F).floor(),L.copy(pt).multiplyScalar(F).floor(),E=Et;if(Tt.bindFramebuffer(U.FRAMEBUFFER,k)&&W&&Tt.drawBuffers(w,k),Tt.viewport(P),Tt.scissor(L),Tt.setScissorTest(E),st){let yt=At.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+O,yt.__webglTexture,G)}else if(ut){let yt=At.get(w.texture),Pt=O||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,yt.__webglTexture,G||0,Pt)}S=-1},this.readRenderTargetPixels=function(w,O,G,W,k,st,ut){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=At.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ut!==void 0&&(vt=vt[ut]),vt){Tt.bindFramebuffer(U.FRAMEBUFFER,vt);try{let yt=w.texture,Pt=yt.format,Nt=yt.type;if(!$t.textureFormatReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$t.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=w.width-W&&G>=0&&G<=w.height-k&&U.readPixels(O,G,W,k,Ft.convert(Pt),Ft.convert(Nt),st)}finally{let yt=I!==null?At.get(I).__webglFramebuffer:null;Tt.bindFramebuffer(U.FRAMEBUFFER,yt)}}},this.readRenderTargetPixelsAsync=async function(w,O,G,W,k,st,ut){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=At.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ut!==void 0&&(vt=vt[ut]),vt){let yt=w.texture,Pt=yt.format,Nt=yt.type;if(!$t.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$t.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=w.width-W&&G>=0&&G<=w.height-k){Tt.bindFramebuffer(U.FRAMEBUFFER,vt);let bt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,bt),U.bufferData(U.PIXEL_PACK_BUFFER,st.byteLength,U.STREAM_READ),U.readPixels(O,G,W,k,Ft.convert(Pt),Ft.convert(Nt),0);let Kt=I!==null?At.get(I).__webglFramebuffer:null;Tt.bindFramebuffer(U.FRAMEBUFFER,Kt);let ae=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await t0(U,ae,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,bt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,st),U.deleteBuffer(bt),U.deleteSync(ae),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,O=null,G=0){w.isTexture!==!0&&(dr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,w=arguments[1]);let W=Math.pow(2,-G),k=Math.floor(w.image.width*W),st=Math.floor(w.image.height*W),ut=O!==null?O.x:0,vt=O!==null?O.y:0;A.setTexture2D(w,0),U.copyTexSubImage2D(U.TEXTURE_2D,G,0,0,ut,vt,k,st),Tt.unbindTexture()},this.copyTextureToTexture=function(w,O,G=null,W=null,k=0){w.isTexture!==!0&&(dr("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,w=arguments[1],O=arguments[2],k=arguments[3]||0,G=null);let st,ut,vt,yt,Pt,Nt,bt,Kt,ae,le=w.isCompressedTexture?w.mipmaps[k]:w.image;G!==null?(st=G.max.x-G.min.x,ut=G.max.y-G.min.y,vt=G.isBox3?G.max.z-G.min.z:1,yt=G.min.x,Pt=G.min.y,Nt=G.isBox3?G.min.z:0):(st=le.width,ut=le.height,vt=le.depth||1,yt=0,Pt=0,Nt=0),W!==null?(bt=W.x,Kt=W.y,ae=W.z):(bt=0,Kt=0,ae=0);let He=Ft.convert(O.format),Jt=Ft.convert(O.type),wt;O.isData3DTexture?(A.setTexture3D(O,0),wt=U.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(A.setTexture2DArray(O,0),wt=U.TEXTURE_2D_ARRAY):(A.setTexture2D(O,0),wt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment);let An=U.getParameter(U.UNPACK_ROW_LENGTH),jt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),rn=U.getParameter(U.UNPACK_SKIP_PIXELS),Xi=U.getParameter(U.UNPACK_SKIP_ROWS),Ye=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,le.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,le.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,yt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Pt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Nt);let Hs=w.isDataArrayTexture||w.isData3DTexture,ce=O.isDataArrayTexture||O.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){let fn=At.get(w),Gs=At.get(O),je=At.get(fn.__renderTarget),Yn=At.get(Gs.__renderTarget);Tt.bindFramebuffer(U.READ_FRAMEBUFFER,je.__webglFramebuffer),Tt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Yn.__webglFramebuffer);for(let Zn=0;Zn<vt;Zn++)Hs&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,At.get(w).__webglTexture,k,Nt+Zn),w.isDepthTexture?(ce&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,At.get(O).__webglTexture,k,ae+Zn),U.blitFramebuffer(yt,Pt,st,ut,bt,Kt,st,ut,U.DEPTH_BUFFER_BIT,U.NEAREST)):ce?U.copyTexSubImage3D(wt,k,bt,Kt,ae+Zn,yt,Pt,st,ut):U.copyTexSubImage2D(wt,k,bt,Kt,ae+Zn,yt,Pt,st,ut);Tt.bindFramebuffer(U.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ce?w.isDataTexture||w.isData3DTexture?U.texSubImage3D(wt,k,bt,Kt,ae,st,ut,vt,He,Jt,le.data):O.isCompressedArrayTexture?U.compressedTexSubImage3D(wt,k,bt,Kt,ae,st,ut,vt,He,le.data):U.texSubImage3D(wt,k,bt,Kt,ae,st,ut,vt,He,Jt,le):w.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,k,bt,Kt,st,ut,He,Jt,le.data):w.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,k,bt,Kt,le.width,le.height,He,le.data):U.texSubImage2D(U.TEXTURE_2D,k,bt,Kt,st,ut,He,Jt,le);U.pixelStorei(U.UNPACK_ROW_LENGTH,An),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,jt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,rn),U.pixelStorei(U.UNPACK_SKIP_ROWS,Xi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ye),k===0&&O.generateMipmaps&&U.generateMipmap(wt),Tt.unbindTexture()},this.copyTextureToTexture3D=function(w,O,G=null,W=null,k=0){return w.isTexture!==!0&&(dr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,W=arguments[1]||null,w=arguments[2],O=arguments[3],k=arguments[4]||0),dr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,O,G,W,k)},this.initRenderTarget=function(w){At.get(w).__webglFramebuffer===void 0&&A.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?A.setTextureCube(w,0):w.isData3DTexture?A.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?A.setTexture2DArray(w,0):A.setTexture2D(w,0),Tt.unbindTexture()},this.resetState=function(){T=0,R=0,I=null,Tt.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}};var na=class extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Ts=class extends Je{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Oe,h=Oe,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ia=class extends xe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},fs=new Qt,Nf=new Qt,Ro=[],Of=new Vn,Kb=new Qt,cr=new Ee,hr=new $n,sa=class extends Ee{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ia(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Kb)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Vn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,fs),Of.copy(t.boundingBox).applyMatrix4(fs),this.boundingBox.union(Of)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new $n),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,fs),hr.copy(t.boundingSphere).applyMatrix4(fs),this.boundingSphere.union(hr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(cr.geometry=this.geometry,cr.material=this.material,cr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hr.copy(this.boundingSphere),hr.applyMatrix4(n),t.ray.intersectsSphere(hr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,fs),Nf.multiplyMatrices(n,fs),cr.matrixWorld=Nf,cr.raycast(t,Ro);for(let o=0,a=Ro.length;o<a;o++){let l=Ro[o];l.instanceId=r,l.object=this,e.push(l)}Ro.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ia(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ts(new Float32Array(s*this.count),s,this.count,Uh,_n));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Rs=class extends Hn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Vt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},ra=new B,oa=new B,kf=new Qt,ur=new hi,Co=new $n,cc=new B,Ff=new B,ph=class extends ke{constructor(t=new Fe,e=new Rs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ra.fromBufferAttribute(e,s-1),oa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ra.distanceTo(oa);t.setAttribute("lineDistance",new $e(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Co.copy(n.boundingSphere),Co.applyMatrix4(s),Co.radius+=r,t.ray.intersectsSphere(Co)===!1)return;kf.copy(s).invert(),ur.copy(t.ray).applyMatrix4(kf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){let p=h.getX(_),b=h.getX(_+1),x=Po(this,t,ur,l,p,b);x&&e.push(x)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(f),p=Po(this,t,ur,l,_,m);p&&e.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){let p=Po(this,t,ur,l,_,_+1);p&&e.push(p)}if(this.isLineLoop){let _=Po(this,t,ur,l,g-1,f);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Po(i,t,e,n,s,r){let o=i.geometry.attributes.position;if(ra.fromBufferAttribute(o,s),oa.fromBufferAttribute(o,r),e.distanceSqToSegment(ra,oa,cc,Ff)>n)return;cc.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(cc);if(!(l<t.near||l>t.far))return{distance:l,point:Ff.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var zf=new B,Bf=new B,yr=class extends ph{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)zf.fromBufferAttribute(e,s),Bf.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+zf.distanceTo(Bf);t.setAttribute("lineDistance",new $e(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var br=class extends Hn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Vf=new Qt,mh=new hi,Io=new $n,Do=new B,aa=class extends ke{constructor(t=new Fe,e=new br){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(s),Io.radius+=r,t.ray.intersectsSphere(Io)===!1)return;Vf.copy(s).invert(),mh.copy(t.ray).applyMatrix4(Vf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=u,_=f;g<_;g++){let m=c.getX(g);Do.fromBufferAttribute(d,m),$f(Do,m,l,s,t,e,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,_=f;g<_;g++)Do.fromBufferAttribute(d,g),$f(Do,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function $f(i,t,e,n,s,r,o){let a=mh.distanceSqToPoint(i);if(a<e){let l=new B;mh.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Lo=new B,Uo=new B,hc=new B,No=new oi,la=class extends Fe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(xs*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:_,b:m,c:p}=No;if(_.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),No.getNormal(hc),d[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,d[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,d[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let b=0;b<3;b++){let x=(b+1)%3,v=d[b],C=d[x],T=No[h[b]],R=No[h[x]],I=`${v}_${C}`,S=`${C}_${v}`;S in u&&u[S]?(hc.dot(u[S].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(R.x,R.y,R.z)),u[S]=null):I in u||(u[I]={index0:c[b],index1:c[x],normal:hc.clone()})}}for(let g in u)if(u[g]){let{index0:_,index1:m}=u[g];Lo.fromBufferAttribute(a,_),Uo.fromBufferAttribute(a,m),f.push(Lo.x,Lo.y,Lo.z),f.push(Uo.x,Uo.y,Uo.z)}this.setAttribute("position",new $e(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var ca=class i extends Fe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new B,u=new B,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let b=[],x=p/n,v=0;p===0&&o===0?v=.5/e:p===n&&l===Math.PI&&(v=-.5/e);for(let C=0;C<=e;C++){let T=C/e;d.x=-t*Math.cos(s+T*r)*Math.sin(o+x*a),d.y=t*Math.cos(o+x*a),d.z=t*Math.sin(s+T*r)*Math.sin(o+x*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(T+v,1-x),b.push(c++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<e;b++){let x=h[p][b+1],v=h[p][b],C=h[p+1][b],T=h[p+1][b+1];(p!==0||o>0)&&f.push(x,v,T),(p!==n-1||l<Math.PI)&&f.push(v,C,T)}this.setIndex(f),this.setAttribute("position",new $e(g,3)),this.setAttribute("normal",new $e(_,3)),this.setAttribute("uv",new $e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Mn=class extends Hn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sp,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Ph,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Oo(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Jb(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Cs=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},gh=class extends Cs{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:kd,endingEnd:kd}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Fd:r=t,a=2*e-n;break;case zd:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Fd:o=t,l=2*n-e;break;case zd:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,p=-u*m+2*u*_-u*g,b=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*g+1,x=(-1-f)*m+(1.5+f)*_+.5*g,v=f*m-f*_;for(let C=0;C!==a;++C)r[C]=p*o[h+C]+b*o[c+C]+x*o[l+C]+v*o[d+C];return r}},_h=class extends Cs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},xh=class extends Cs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},dn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Oo(e,this.TimeBufferType),this.values=Oo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Oo(t.times,Array),values:Oo(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new xh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new _h(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new gh(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case $o:e=this.InterpolantFactoryMethodDiscrete;break;case Jc:e=this.InterpolantFactoryMethodLinear;break;case Ol:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $o;case this.InterpolantFactoryMethodLinear:return Jc;case this.InterpolantFactoryMethodSmooth:return Ol}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Jb(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ol,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let _=e[d+g];if(_!==e[u+g]||_!==e[f+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};dn.prototype.TimeBufferType=Float32Array;dn.prototype.ValueBufferType=Float32Array;dn.prototype.DefaultInterpolation=Jc;var Ni=class extends dn{constructor(t,e,n){super(t,e,n)}};Ni.prototype.ValueTypeName="bool";Ni.prototype.ValueBufferType=Array;Ni.prototype.DefaultInterpolation=$o;Ni.prototype.InterpolantFactoryMethodLinear=void 0;Ni.prototype.InterpolantFactoryMethodSmooth=void 0;var vh=class extends dn{};vh.prototype.ValueTypeName="color";var yh=class extends dn{};yh.prototype.ValueTypeName="number";var bh=class extends Cs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)un.slerpFlat(r,0,o,c-a,o,c,l);return r}},ha=class extends dn{InterpolantFactoryMethodLinear(t){return new bh(this.times,this.values,this.getValueSize(),t)}};ha.prototype.ValueTypeName="quaternion";ha.prototype.InterpolantFactoryMethodSmooth=void 0;var Oi=class extends dn{constructor(t,e,n){super(t,e,n)}};Oi.prototype.ValueTypeName="string";Oi.prototype.ValueBufferType=Array;Oi.prototype.DefaultInterpolation=$o;Oi.prototype.InterpolantFactoryMethodLinear=void 0;Oi.prototype.InterpolantFactoryMethodSmooth=void 0;var Mh=class extends dn{};Mh.prototype.ValueTypeName="vector";var wh=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},jb=new wh,Sh=class{constructor(t){this.manager=t!==void 0?t:jb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Sh.DEFAULT_MATERIAL_NAME="__DEFAULT";var ua=class extends ke{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var uc=new Qt,Hf=new B,Gf=new B,Eh=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new It(512,512),this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vr,this._frameExtents=new It(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Hf.setFromMatrixPosition(t.matrixWorld),e.position.copy(Hf),Gf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Gf),e.updateMatrixWorld(),uc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(uc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Ah=class extends Eh{constructor(){super(new jo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},da=class extends ua{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.target=new ke,this.shadow=new Ah}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},fa=class extends ua{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Bh="\\[\\]\\.:\\/",Qb=new RegExp("["+Bh+"]","g"),Vh="[^"+Bh+"]",tM="[^"+Bh.replace("\\.","")+"]",eM=/((?:WC+[\/:])*)/.source.replace("WC",Vh),nM=/(WCOD+)?/.source.replace("WCOD",tM),iM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Vh),sM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Vh),rM=new RegExp("^"+eM+nM+iM+sM+"$"),oM=["material","materials","bones","map"],Th=class{constructor(t,e,n){let s=n||he.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},he=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Qb,"")}static parseTrackName(t){let e=rM.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);oM.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};he.Composite=Th;he.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};he.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};he.prototype.GetterByBindingType=[he.prototype._getValue_direct,he.prototype._getValue_array,he.prototype._getValue_arrayElement,he.prototype._getValue_toArray];he.prototype.SetterByBindingTypeAndVersioning=[[he.prototype._setValue_direct,he.prototype._setValue_direct_setNeedsUpdate,he.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[he.prototype._setValue_array,he.prototype._setValue_array_setNeedsUpdate,he.prototype._setValue_array_setMatrixWorldNeedsUpdate],[he.prototype._setValue_arrayElement,he.prototype._setValue_arrayElement_setNeedsUpdate,he.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[he.prototype._setValue_fromArray,he.prototype._setValue_fromArray_setNeedsUpdate,he.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Kw=new Float32Array(1);var Wf=new Qt,pa=class{constructor(t,e,n=0,s=1/0){this.ray=new hi(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new xr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Wf.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Wf),this}intersectObject(t,e=!0,n=[]){return Rh(t,this,n,e),n.sort(Xf),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Rh(t[s],this,n,e);return n.sort(Xf),n}};function Xf(i,t){return i.distance-t.distance}function Rh(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Rh(r[o],t,e,!0)}}var Mr=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ne(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var ma=class extends zn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ch}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ch);var mp={type:"change"},Hh={type:"start"},_p={type:"end"},va=new hi,gp=new hn,aM=Math.cos(70*op.DEG2RAD),Re=new B,qe=2*Math.PI,se={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},$h=1e-6,ya=class extends ma{constructor(t,e=null){super(t,e),this.state=se.NONE,this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ki.ROTATE,MIDDLE:ki.DOLLY,RIGHT:ki.PAN},this.touches={ONE:Fi.ROTATE,TWO:Fi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new un,this._lastTargetPosition=new B,this._quat=new un().setFromUnitVectors(t.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Mr,this._sphericalDelta=new Mr,this._scale=1,this._panOffset=new B,this._rotateStart=new It,this._rotateEnd=new It,this._rotateDelta=new It,this._panStart=new It,this._panEnd=new It,this._panDelta=new It,this._dollyStart=new It,this._dollyEnd=new It,this._dollyDelta=new It,this._dollyDirection=new B,this._mouse=new It,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=cM.bind(this),this._onPointerDown=lM.bind(this),this._onPointerUp=hM.bind(this),this._onContextMenu=_M.bind(this),this._onMouseWheel=fM.bind(this),this._onKeyDown=pM.bind(this),this._onTouchStart=mM.bind(this),this._onTouchMove=gM.bind(this),this._onMouseDown=uM.bind(this),this._onMouseMove=dM.bind(this),this._interceptControlDown=xM.bind(this),this._interceptControlUp=vM.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(mp),this.update(),this.state=se.NONE}update(t=null){let e=this.object.position;Re.copy(e).sub(this.target),Re.applyQuaternion(this._quat),this._spherical.setFromVector3(Re),this.autoRotate&&this.state===se.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=qe:n>Math.PI&&(n-=qe),s<-Math.PI?s+=qe:s>Math.PI&&(s-=qe),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Re.setFromSpherical(this._spherical),Re.applyQuaternion(this._quatInverse),e.copy(this.target).add(Re),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Re.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new B(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new B(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Re.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(va.origin.copy(this.object.position),va.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(va.direction))<aM?this.object.lookAt(this.target):(gp.setFromNormalAndCoplanarPoint(this.object.up,this.target),va.intersectPlane(gp,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>$h||8*(1-this._lastQuaternion.dot(this.object.quaternion))>$h||this._lastTargetPosition.distanceToSquared(this.target)>$h?(this.dispatchEvent(mp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?qe/60*this.autoRotateSpeed*t:qe/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Re.setFromMatrixColumn(e,0),Re.multiplyScalar(-t),this._panOffset.add(Re)}_panUp(t,e){this.screenSpacePanning===!0?Re.setFromMatrixColumn(e,1):(Re.setFromMatrixColumn(e,0),Re.crossVectors(this.object.up,Re)),Re.multiplyScalar(t),this._panOffset.add(Re)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Re.copy(s).sub(this.target);let r=Re.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new It,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function lM(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function cM(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function hM(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(_p),this.state=se.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function uM(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ki.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=se.DOLLY;break;case ki.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=se.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=se.ROTATE}break;case ki.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=se.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=se.PAN}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(Hh)}function dM(i){switch(this.state){case se.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case se.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case se.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function fM(i){this.enabled===!1||this.enableZoom===!1||this.state!==se.NONE||(i.preventDefault(),this.dispatchEvent(Hh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(_p))}function pM(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function mM(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Fi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=se.TOUCH_ROTATE;break;case Fi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=se.TOUCH_PAN;break;default:this.state=se.NONE}break;case 2:switch(this.touches.TWO){case Fi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=se.TOUCH_DOLLY_PAN;break;case Fi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=se.TOUCH_DOLLY_ROTATE;break;default:this.state=se.NONE}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(Hh)}function gM(i){switch(this._trackPointer(i),this.state){case se.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case se.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case se.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case se.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=se.NONE}}function _M(i){this.enabled!==!1&&i.preventDefault()}function xM(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function vM(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var xp=40,yM=.02,vp=new Set(["voxels","points"]);function bM(){let t=new Uint8Array(4096);for(let n=0;n<32;n++)for(let s=0;s<32;s++){let r=Math.hypot(s+.5-16,n+.5-16)/16,o=(n*32+s)*4;t[o]=t[o+1]=t[o+2]=255,t[o+3]=r<=1?255:0}let e=new Ts(t,32,32,We,en);return e.needsUpdate=!0,e}function yp(i){let t=new Fe;return t.setAttribute("position",new xe(new Float32Array(i.positions),3)),t.setIndex(new xe(new Uint32Array(i.indices),1)),t.computeVertexNormals(),t}function wn(i,t="#808080"){let e=jn(i)||jn(t);return new Vt().setRGB(e[0]/255,e[1]/255,e[2]/255,Pe)}function bp(i){i.traverse(t=>{t.geometry&&t.geometry.dispose();let e=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(let n of e)n.map&&n.map.dispose(),n.dispose()})}function Gh(i,t=!1){for(let e of[...i.children])i.remove(e),t?e.traverse(n=>n.geometry&&n.geometry.dispose()):bp(e)}var ba=class{constructor(t,{onSelect:e}={}){this.container=t,this.onSelect=e||(()=>{}),this.state={},this._raf=0,this._disposed=!1,this._framedBounds=null,this._hover=null,this._down=null;let n=document.createElement("canvas");n.style.cssText="display:block;width:100%;height:100%;touch-action:none;outline:none",t.appendChild(n),this.canvas=n,this.renderer=new ea({canvas:n,antialias:!0,alpha:!1,powerPreference:"low-power"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.scene=new na,this.camera=new Ve(xp,1.5,.1,200),this.scene.add(new fa(16777215,1.7));let s=new da(16777215,1.6);s.position.set(-4,10,6),this.scene.add(s),this.staticGroup=new xn,this.sensorGroup=new xn,this.overlayGroup=new xn,this.scene.add(this.staticGroup,this.overlayGroup,this.sensorGroup),this.mats={floor:new Mn({side:Se}),wall:new Mn({side:Se}),freeWall:new Mn({side:Se}),furniture:new Mn({transparent:!0,opacity:.42,depthWrite:!1,side:Se}),obstacle:new Mn({transparent:!0,opacity:.55,depthWrite:!1,side:Se}),window:new yn({transparent:!0,opacity:.35,depthWrite:!1,side:Se}),door:new yn({side:Se})},this.controls=new ya(this.camera,n),this.controls.screenSpacePanning=!0,this.controls.maxPolarAngle=Math.PI/2-.02,this.controls.addEventListener("change",()=>this._request()),this._userMoved=!1,this._lastView="iso",this.controls.addEventListener("start",()=>{this._userMoved=!0}),this.raycaster=new pa,this._onPointerDown=r=>this._pointerDown(r),this._onPointerUp=r=>this._pointerUp(r),this._onPointerMove=r=>this._pointerMove(r),n.addEventListener("pointerdown",this._onPointerDown),n.addEventListener("pointerup",this._onPointerUp),n.addEventListener("pointermove",this._onPointerMove),this._motionQuery=window.matchMedia?window.matchMedia("(prefers-reduced-motion: reduce)"):null,this._onMotion=()=>this._applyMotion(),this._motionQuery&&this._motionQuery.addEventListener?.("change",this._onMotion),this._applyMotion(),this._resizeObserver=new ResizeObserver(()=>this.resize()),this._resizeObserver.observe(t),this.resize()}setState(t){if(this._disposed)return;let e=this.state,n={dark:!1,height:.9,mode:"flat",...t};this.state=n;let s=n.model!==e.model,r=n.dark!==e.dark||!e.palette,o=n.mode!==e.mode;r&&(this.palette=Cd(n.dark),this._applyPalette()),(s||o||n.mode==="voxels"&&n.height!==e.height)&&this._buildStatic();let a=s||r||o||n.sensors!==e.sensors||n.colors!==e.colors||n.selected!==e.selected;a&&this._buildSensors(),(a||n.evaluation!==e.evaluation||n.volume!==e.volume||n.height!==e.height)&&this._buildOverlay(),this.state.palette=this.palette,this._request()}resetView(){this._frame("iso")}topView(){this._frame("top")}resize(){if(this._disposed)return;let t=this.container.clientWidth,e=this.container.clientHeight;t<2||e<2||(this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.state.model&&(!this._sized||!this._userMoved)&&(this._sized=!0,this._frame(this._lastView)),this._request())}dispose(){if(!this._disposed){this._disposed=!0,this._raf&&cancelAnimationFrame(this._raf),this._raf=0,this._resizeObserver.disconnect(),this._motionQuery&&this._motionQuery.removeEventListener?.("change",this._onMotion),this.canvas.removeEventListener("pointerdown",this._onPointerDown),this.canvas.removeEventListener("pointerup",this._onPointerUp),this.canvas.removeEventListener("pointermove",this._onPointerMove),this.controls.dispose(),bp(this.scene);for(let t of Object.values(this.mats))t.dispose();this.renderer.dispose(),this.renderer.forceContextLoss(),this.canvas.remove()}}_request(){this._raf||this._disposed||(this._raf=requestAnimationFrame(()=>{if(this._raf=0,this._disposed)return;let t=this.controls.update();this.renderer.render(this.scene,this.camera),t&&this._request()}))}_applyMotion(){this.controls.enableDamping=!(this._motionQuery&&this._motionQuery.matches)}_frame(t){this._lastView=t,this._userMoved=!1;let e=this.state.model?.bounds,n=Td(e,{fov:xp,aspect:this.camera.aspect,height:this.state.model?.floor?.height,inset:.35,view:t});this.camera.near=n.near,this.camera.far=n.far,this.camera.updateProjectionMatrix(),this.camera.position.set(...n.position),this.controls.target.set(...n.target),this.controls.minDistance=n.minDistance,this.controls.maxDistance=n.maxDistance,this.controls.update(),this._request()}_applyPalette(){let t=this.palette;this.scene.background=wn(t.background),this.mats.floor.color=wn(t.floor),this.mats.wall.color=wn(t.wall),this.mats.freeWall.color=wn(t.freeWall),this.mats.furniture.color=wn(t.furniture),this.mats.obstacle.color=wn(t.obstacle),this.mats.window.color=wn(t.window),this.mats.door.color=wn(t.door);for(let e of Object.values(this.mats))e.needsUpdate=!0}_buildStatic(){Gh(this.staticGroup,!0);let t=this.state.model;if(!t)return;let e=this.state.mode==="voxels"?(this.state.height??.9)+.12:void 0,n=Ad(t,{cutY:e});this._wallHeight=n.wallHeight;let s=(r,o,a=0)=>{if(!r.indices.length)return;let l=new Ee(yp(r),o);l.renderOrder=a,this.staticGroup.add(l)};s(n.floors,this.mats.floor),s(n.thresholds,this.mats.door),s(n.walls,this.mats.wall),s(n.freeWalls,this.mats.freeWall),s(n.furniture,this.mats.furniture,2),s(n.obstacles,this.mats.obstacle,2),s(n.windows,this.mats.window,3),Rd(this._framedBounds,t.bounds)&&(this._framedBounds=t.bounds?{...t.bounds}:null,this._frame("iso"))}_buildSensors(){Gh(this.sensorGroup);let{sensors:t,colors:e,selected:n}=this.state,s=this.palette,r=this._wallHeight??2.6,o=!!n&&(t||[]).some(l=>l.entity_id===n);this._hitMeshes=[];let a=vp.has(this.state.mode);(t||[]).forEach((l,c)=>{if(!Number.isFinite(l.x)||!Number.isFinite(l.z))return;let h=Ll(e,l,c),d=new Vt().setRGB(h[0]/255,h[1]/255,h[2]/255,Pe),u=l.entity_id===n,f=l.active!==!1,g=Pl(l),_=wd(l),m=new Qt().makeBasis(new B(..._.x),new B(..._.y),new B(..._.z));m.setPosition(...g);let p=new Ee(new Gn(.1,.1,.05),new Mn({color:f?d:wn(s.inactive),transparent:!f,opacity:f?1:.6}));p.matrixAutoUpdate=!1,p.matrix.copy(m),p.renderOrder=4,this.sensorGroup.add(p);let b=new la(new Gn(.16,.16,.09)),x=new yr(b,new Rs({color:u?wn(s.selected):d,depthTest:!1}));x.matrixAutoUpdate=!1,x.matrix.copy(m),x.renderOrder=5,this.sensorGroup.add(x);let v=new Ee(new ca(.22,8,6),new yn({visible:!1}));if(v.position.set(...g),v.userData.entityId=l.entity_id,this.sensorGroup.add(v),this._hitMeshes.push(v),!f)return;let C=Sd(a?{...l,reach:Math.min(l.reach||5,.9)}:l,{yMin:0,yMax:r});if(!a){let T=u?.24:o?.04:.09,R=new Ee(yp({positions:C.positions,indices:C.indices}),new yn({color:d,transparent:!0,opacity:T,depthWrite:!1,side:Se}));R.renderOrder=6+c*.01,this.sensorGroup.add(R)}if(u){let T=new Fe;T.setAttribute("position",new xe(new Float32Array(C.edges),3));let R=new yr(T,new Rs({color:d,transparent:!0,opacity:.85}));R.renderOrder=7,this.sensorGroup.add(R)}})}_buildOverlay(){if(Gh(this.overlayGroup),vp.has(this.state.mode)){this._buildVolume();return}let{evaluation:t,model:e,height:n,sensors:s,colors:r,selected:o}=this.state,a=t?.grid?.[n]??t?.grid?.[String(n)];if(!e?.bounds||!a||!a.length)return;let l=Ul(s,r),c=Dd(a,{bounds:e.bounds,colorFor:g=>l.get(g)||Dl(r,0),spillColor:jn(this.palette.spill),selected:o||null}),h=new Ts(c.data,c.width,c.height,We,en);h.colorSpace=Pe,h.magFilter=Oe,h.minFilter=Oe,h.generateMipmaps=!1,h.needsUpdate=!0;let d=n+yM,u=new Fe;u.setAttribute("position",new xe(new Float32Array([c.x0,d,c.z0,c.x1,d,c.z0,c.x1,d,c.z1,c.x0,d,c.z1]),3)),u.setAttribute("uv",new xe(new Float32Array([0,0,1,0,1,1,0,1]),2)),u.setIndex([0,2,1,0,3,2]);let f=new Ee(u,new yn({map:h,transparent:!0,depthWrite:!1,side:Se}));f.renderOrder=1,this.overlayGroup.add(f)}_buildVolume(){let{volume:t,height:e,sensors:n,colors:s,selected:r,mode:o,dark:a}=this.state;if(!t?.grid)return;let l=Ul(n,s),c=Id(t,{maxY:o==="voxels"?e+1e-6:1/0,colorFor:m=>l.get(m)||[31,95,153],spillColor:jn(this.palette.spill),fadeColor:a?[70,74,80]:[255,255,255],selected:r||null});if(!c.count)return;let h=new Vt;if(o==="voxels"){let m=new Gn(c.cell*.82,c.step*.82,c.cell*.82),p=new sa(m,new Mn,c.count),b=new Qt;for(let x=0;x<c.count;x++)b.makeTranslation(c.positions[x*3],c.positions[x*3+1],c.positions[x*3+2]),p.setMatrixAt(x,b),h.setRGB(c.colors[x*3]/255,c.colors[x*3+1]/255,c.colors[x*3+2]/255,Pe),p.setColorAt(x,h);p.instanceMatrix.needsUpdate=!0,p.instanceColor&&(p.instanceColor.needsUpdate=!0),this.overlayGroup.add(p);return}let d=new Fe,u=new Float32Array(c.positions),f=m=>{let p=Math.sin(m*12.9898)*43758.5453;return p-Math.floor(p)-.5};for(let m=0;m<c.count;m++)u[m*3]+=f(m*3+1)*c.cell*.7,u[m*3+1]+=f(m*3+2)*c.step*.7,u[m*3+2]+=f(m*3+3)*c.cell*.7;d.setAttribute("position",new xe(u,3));let g=new Float32Array(c.count*3);for(let m=0;m<c.count;m++)h.setRGB(c.colors[m*3]/255,c.colors[m*3+1]/255,c.colors[m*3+2]/255,Pe),g[m*3]=h.r,g[m*3+1]=h.g,g[m*3+2]=h.b;d.setAttribute("color",new xe(g,3));let _=new br({size:c.cell*.8,sizeAttenuation:!0,vertexColors:!0,map:bM(),alphaTest:.5});this.overlayGroup.add(new aa(d,_))}_pick(t){if(!this._hitMeshes?.length)return null;let e=this.canvas.getBoundingClientRect(),n=new It((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1);this.raycaster.setFromCamera(n,this.camera);let s=this.raycaster.intersectObjects(this._hitMeshes,!1)[0];return s?s.object.userData.entityId:null}_pointerDown(t){this._down={x:t.clientX,y:t.clientY,t:performance.now()}}_pointerUp(t){let e=this._down;if(this._down=null,!e||t.button>0||Math.hypot(t.clientX-e.x,t.clientY-e.y)>5||performance.now()-e.t>600)return;let n=this._pick(t);n&&this.onSelect(n)}_pointerMove(t){if(t.buttons)return;let e=this._pick(t);e!==this._hover&&(this._hover=e,this.canvas.style.cursor=e?"pointer":"")}};var Wh=["flat","voxels","points"],Mp="pp-view3d-mode",Ma=.2;function MM(){try{let i=localStorage.getItem(Mp);return Wh.includes(i)?i:"voxels"}catch{return"voxels"}}var Xh=class extends Ge{static properties={model:{attribute:!1},sensors:{attribute:!1},evaluation:{attribute:!1},height:{type:Number},selected:{type:String},dark:{type:Boolean},colors:{attribute:!1},labels:{attribute:!1},coreOpts:{attribute:!1},_mode:{state:!0}};static styles=Tn`
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
  `;constructor(){super(),this.height=.9,this.dark=!1,this.labels={},this._ctl=null,this._mode=MM(),this._volume=null,this._volumeKey=null,this._volumeTimer=0}render(){let t={reset:"Reset view",top:"Top view",mode:"Display",flat:"Plane",voxels:"Voxels",points:"Point cloud",...this.labels||{}};return Y`
      <div class="stage"></div>
      <div class="bar">
        <div class="seg" role="group" aria-label=${t.mode}>
          ${Wh.map(e=>Y`<button type="button" aria-pressed=${this._mode===e?"true":"false"} @click=${()=>this.setMode(e)}>${t[e]}</button>`)}
        </div>
        <button type="button" @click=${()=>this.resetView()}>${t.reset}</button>
        <button type="button" @click=${()=>this.topView()}>${t.top}</button>
      </div>
    `}setMode(t){if(!(!Wh.includes(t)||t===this._mode)){this._mode=t;try{localStorage.setItem(Mp,t)}catch{}}}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this._setup()}firstUpdated(){this._setup()}disconnectedCallback(){super.disconnectedCallback(),this._teardown()}updated(){this._scheduleVolume(),this._push()}_volumeInputs(){if(!this.model)return null;this._keyModel!==this.model&&(this._keyModel=this.model,this._modelSeq=(this._modelSeq||0)+1);let t=(this.sensors||[]).map(s=>[s.entity_id,s.x,s.z,s.height,s.phi,s.tilt,s.fov_h,s.fov_v,s.reach,s.mount,s.active,s.profile]),{doors:e,thin_db:n}=this.coreOpts||{};return{key:JSON.stringify([this._modelSeq,t,e??null,n??null]),doors:e,thin_db:n}}_scheduleVolume(){if(this._mode==="flat")return;let t=this._volumeInputs();!t||t.key===this._volumeKey||t.key===this._pendingKey||(this._pendingKey=t.key,clearTimeout(this._volumeTimer),this._volumeTimer=setTimeout(()=>this._computeVolume(t),120))}_computeVolume(t){if(this._pendingKey=null,!this.model)return;let e=Pd(this.model.floor?.height,Ma);try{let n={...this.coreOpts||{},heights:e,cell:Ma,grid:!0};t.doors!==void 0&&(n.doors=t.doors),t.thin_db!==void 0&&(n.thin_db=t.thin_db);let s=nr(this.model,this.sensors||[],n);this._volume={grid:s.grid,heights:e,cell:Ma,step:Ma}}catch(n){console.warn("pp-view3d: volume evaluation failed",n),this._volume=null}this._volumeKey=t.key,this._push()}resetView(){this._ctl?.resetView()}topView(){this._ctl?.topView()}_setup(){if(this._ctl)return;let t=this.renderRoot.querySelector(".stage");if(t){try{this._ctl=new ba(t,{onSelect:e=>this.dispatchEvent(new CustomEvent("select",{detail:{entityId:e},bubbles:!0,composed:!0}))})}catch(e){console.warn("pp-view3d: WebGL unavailable",e),this._ctl=null;return}this._push(!0)}}_teardown(){clearTimeout(this._volumeTimer),this._pendingKey=null,this._ctl?.dispose(),this._ctl=null}_push(){this._ctl?.setState({model:this.model,sensors:this.sensors,evaluation:this.evaluation,height:this.height,selected:this.selected,dark:this.dark,colors:this.colors,mode:this._mode,volume:this._mode==="flat"?null:this._volume})}};typeof customElements<"u"&&!customElements.get("pp-view3d")&&customElements.define("pp-view3d",Xh);var zi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},wp=i=>(...t)=>({_$litDirective$:i,values:t}),wa=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,n){this._$Ct=t,this._$AM=e,this._$Ci=n}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:u1}=td;var Sp=i=>i.strings===void 0;var wM={},Ep=(i,t=wM)=>i._$AH=t;var ve=wp(class extends wa{constructor(i){if(super(i),i.type!==zi.PROPERTY&&i.type!==zi.ATTRIBUTE&&i.type!==zi.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Sp(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===Qe||t===ft)return t;let e=i.element,n=i.name;if(i.type===zi.PROPERTY){if(t===e[n])return Qe}else if(i.type===zi.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(n))return Qe}else if(i.type===zi.ATTRIBUTE&&e.getAttribute(n)===t+"")return Qe;return Ep(i),t}});var Ap=Tn`
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
`;var SM={select:"M6 3l12 7-5.5 1.6L15 18l-2.4 1.2-2.6-6.3L6 16.5z",room:"M4 5h10l6 5v9H4z",wall:"M3 6h18v12H3z M3 12h18 M9 6v6 M15 12v6",door:"M5 20h14 M7 20V4h8 M15 4a12 12 0 0 1 3 16 M7 4l8 16",window:"M4 5h16v14H4z M12 5v14 M4 12h16",freewall:"M5 18L18 5 M8 21L21 8 M5 18l3 3 M18 5l3 3",furniture:"M4 11v7h16v-7 M6 11V7h12v4 M4 18v2 M20 18v2 M4 11h3v3h10v-3h3",background:"M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6 M15.5 9.5a1 1 0 1 0 0.01 0",measure:"M3 16.5L16.5 3l4.5 4.5L7.5 21z M7 12.5l2 2 M10 9.5l2 2 M13 6.5l2 2",undo:"M9 15L4 10l5-5 M4 10h10a5 5 0 0 1 0 10h-3",redo:"M15 15l5-5-5-5 M20 10H10a5 5 0 0 0 0 10h3",zoomIn:"M10.5 4a6.5 6.5 0 1 0 0.01 0 M15.5 15.5L21 21 M10.5 7.5v6 M7.5 10.5h6",zoomOut:"M10.5 4a6.5 6.5 0 1 0 0.01 0 M15.5 15.5L21 21 M7.5 10.5h6",fit:"M4 9V4h5 M15 4h5v5 M20 15v5h-5 M9 20H4v-5",plus:"M12 5v14 M5 12h14",trash:"M5 7h14 M10 7V4h4v3 M7 7l1 13h8l1-13",rotateLeft:"M4 4v5h5 M4.5 9A8 8 0 1 1 6 17",rotateRight:"M20 4v5h-5 M19.5 9A8 8 0 1 0 18 17",upload:"M12 16V4 M7 9l5-5 5 5 M5 20h14",ruler:"M4 18L18 4 M4 18l-1-3 M4 18l3 1 M18 4l3 1 M18 4l-1-3",check:"M5 12l5 5 9-10",close:"M6 6l12 12 M18 6L6 18"};function pe(i){return Y`<svg class="icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"
    fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d=${SM[i]||""}></path></svg>`}var qh={editor_label:"Floor plan editor",canvas_label:"Floor plan. Arrow keys move the selection, Delete removes it.",toolbar_label:"Editor tools",tool_select:"Select and move",tool_select_short:"Select",tool_room:"Draw room",tool_room_short:"Room",tool_wall:"Walls",tool_wall_short:"Walls",tool_door:"Door",tool_door_short:"Door",tool_window:"Window",tool_window_short:"Window",tool_freewall:"Free wall",tool_freewall_short:"Free wall",tool_furniture:"Furniture",tool_furniture_short:"Furniture",tool_background:"Background image",tool_background_short:"Image",tool_measure:"Show lengths and areas",tool_measure_short:"Sizes",undo:"Undo",redo:"Redo",zoom_in:"Zoom in",zoom_out:"Zoom out",zoom_fit:"Show everything",shortcut:"{label} ({key})",floor:"Floor",floor_add:"Add floor",floor_default_name:"Floor {n}",floor_settings:"Floor",floor_name:"Name",floor_ha:"Home Assistant floor",floor_height:"Storey height (m)",floor_elevation:"Floor level (m)",floor_delete:"Delete floor",floor_delete_confirm:"Delete this floor with all its rooms?",no_floor:"No floor yet. Add one to start drawing.",none:"None",delete:"Delete",keep:"Keep",cancel:"Cancel",room:"Room",room_default_name:"Room {n}",room_name:"Name",room_area_ha:"Home Assistant area",room_size:"Floor area",room_ceiling:"Ceiling height (m, empty = storey height)",room_delete:"Delete room",room_finish:"Close room",room_undo_point:"Remove last corner",corner:"Corner {n}",corner_delete:"Delete corner",corner_min:"A room needs at least three corners.",pos_x:"X (m)",pos_z:"Z (m)",hint_select:"Click a room, corner, opening or piece of furniture and drag it. Drag a + on an edge to add a corner. Drag empty space to pan.",hint_room:"Click the corners of the room one after another. Click the first corner or press Enter to close it. Corners snap to the 5 cm grid and to existing walls.",hint_wall:"Click an edge to set its wall.",hint_door:"Click a wall to place a door. Drag a door to slide it along its wall.",hint_window:"Click a wall to place a window. Drag a window to slide it along its wall.",hint_freewall:"Click the start and the end of the wall, for example a chimney or a partition.",hint_freewall_second:"Now click the end of the wall. Esc cancels.",hint_furniture:"Choose a type, then click where it goes. Drag the round handle to rotate.",hint_background:"Upload an image of your floor plan, then set its scale with two points of known distance.",wall:"Wall",wall_length:"Length",wall_interior:"Interior wall, shared with {rooms}. It is centred on the edge and uses the larger thickness of both rooms.",wall_exterior:"Exterior wall. It is drawn outside the room.",wall_partial:"{rooms} shares only part of its edge with this wall and keeps its own thickness there. Add a corner in that room to split its edge.",wall_thickness:"Wall thickness (m)",wall_default:"Default: {v} m",wall_reset:"Use default",wall_none:"No wall here (open passage)",opening_door:"Door",opening_window:"Window",opening_type:"Type",opening_room:"Belongs to",opening_offset:"Centre from edge start (m)",width:"Width (m)",height:"Height (m)",depth:"Depth (m)",thickness:"Thickness (m)",sill:"Sill height (m)",hinge:"Hinge",hinge_left:"Left (edge start)",hinge_right:"Right (edge end)",swing:"Opens",swing_in:"Into the room",swing_out:"Out of the room",contact:"Contact sensor (entity id)",contact_hint:"A binary sensor that is on while the door is open. Optional.",opening_delete:"Delete opening",freewall:"Free wall",freewall_height:"Height (m, empty = full height)",freewall_delete:"Delete wall",furniture:"Furniture",furniture_type:"Type",furniture_new_type:"Type for new furniture",rotation:"Rotation (\xB0)",rotate_left:"Rotate 90\xB0 anticlockwise",rotate_right:"Rotate 90\xB0 clockwise",furniture_delete:"Delete furniture",rotate_handle:"Drag to rotate",bg_upload:"Upload image",bg_replace:"Replace image",bg_remove:"Remove image",bg_none:"No background image on this floor.",bg_opacity:"Opacity",bg_rotation:"Rotation (\xB0)",bg_width:"Width (m)",bg_calibrate:"Set scale",bg_calib_first:"Click the first point of a distance you know.",bg_calib_second:"Click the second point.",bg_calib_length:"Real distance (m)",bg_calib_measured:"Measured on the image: {v} m",bg_calib_apply:"Apply scale",bg_move_hint:"Drag the image to move it.",bg_error:"The image could not be read.",area_value:"{v} m\xB2",length_value:"{v} m",nothing_selected:"Nothing selected.",group_lights:"Lights",group_living:"Living",group_dining:"Dining",group_kitchen:"Kitchen",group_sleeping:"Sleeping",group_bath:"Bath and laundry",group_work:"Work and other",group_household:"Household and installations",group_outdoor:"Outdoor",furn_lamp_ceiling:"Ceiling light",furn_lamp_downlight:"Downlight",furn_lamp_spot:"Surface spot",furn_lamp_panel:"LED panel",furn_lamp_pendant:"Pendant light",furn_lamp_fan:"Ceiling fan with light",furn_lamp_floor:"Floor lamp",furn_lamp_uplight:"Floor uplight",furn_lamp_table:"Table lamp",furn_lamp_wall:"Wall light",furn_led_strip:"LED strip",furn_lamp_bollard:"Path light",furn_lamp_garden:"Garden spot",furn_sofa:"Sofa",furn_sofa_l:"Corner sofa (L-shaped)",furn_sofa_u:"U-shaped sofa",furn_armchair:"Armchair",furn_stool:"Stool",furn_coffee_table:"Coffee table",furn_tv_board:"TV board",furn_tv_wall:"TV (wall)",furn_sideboard:"Sideboard",furn_shelf:"Shelf",furn_plant:"Plant",furn_rug:"Rug",furn_table:"Table",furn_table_round:"Round table",furn_chair:"Chair",furn_bench:"Bench",furn_corner_bench:"Corner bench",furn_bar_stool:"Bar stool",furn_kitchen:"Kitchen unit",furn_kitchen_wall:"Wall cabinet",furn_kitchen_tall:"Tall unit with oven",furn_island:"Kitchen island",furn_worktop:"Worktop",furn_sink:"Sink",furn_stove:"Stove",furn_dishwasher:"Dishwasher",furn_fridge:"Fridge",furn_bed:"Bed",furn_bunk_bed:"Bunk bed",furn_nightstand:"Nightstand",furn_wardrobe:"Wardrobe",furn_dresser:"Dresser",furn_bathtub:"Bathtub",furn_shower:"Shower",furn_wc:"WC",furn_washbasin:"Washbasin",furn_washer:"Washing machine",furn_dryer:"Dryer",furn_desk:"Desk",furn_office_chair:"Office chair",furn_tall_cabinet:"Tall cabinet",furn_coat_rack:"Coat rack",furn_radiator:"Radiator",furn_ac_unit:"Air conditioner (wall)",furn_stairs:"Stairs",furn_stairs_u:"U-shaped stairs with landing",furn_robot_vacuum:"Robot vacuum",furn_waste_bin:"Waste bin",furn_mailbox:"Mailbox",furn_wall_switch:"Light switch",furn_wall_socket:"Socket",furn_wifi_ap:"Wi-Fi access point",furn_water_heater:"Hot water tank",furn_parking:"Parking space",furn_awning:"Awning"},EM={editor_label:"Grundriss-Editor",canvas_label:"Grundriss. Pfeiltasten verschieben die Auswahl, Entf l\xF6scht sie.",toolbar_label:"Werkzeuge",tool_select:"Ausw\xE4hlen und verschieben",tool_select_short:"Auswahl",tool_room:"Raum zeichnen",tool_room_short:"Raum",tool_wall:"W\xE4nde",tool_wall_short:"W\xE4nde",tool_door:"T\xFCr",tool_door_short:"T\xFCr",tool_window:"Fenster",tool_window_short:"Fenster",tool_freewall:"Freistehende Wand",tool_freewall_short:"Einzelwand",tool_furniture:"M\xF6bel",tool_furniture_short:"M\xF6bel",tool_background:"Hintergrundbild",tool_background_short:"Bild",tool_measure:"L\xE4ngen und Fl\xE4chen zeigen",tool_measure_short:"Ma\xDFe",undo:"R\xFCckg\xE4ngig",redo:"Wiederholen",zoom_in:"Vergr\xF6\xDFern",zoom_out:"Verkleinern",zoom_fit:"Alles zeigen",shortcut:"{label} ({key})",floor:"Etage",floor_add:"Etage hinzuf\xFCgen",floor_default_name:"Etage {n}",floor_settings:"Etage",floor_name:"Name",floor_ha:"Etage in Home Assistant",floor_height:"Geschossh\xF6he (m)",floor_elevation:"Fu\xDFbodenh\xF6he (m)",floor_delete:"Etage l\xF6schen",floor_delete_confirm:"Diese Etage mit allen R\xE4umen l\xF6schen?",no_floor:"Noch keine Etage. Lege eine an, um zu zeichnen.",none:"Keine",delete:"L\xF6schen",keep:"Behalten",cancel:"Abbrechen",room:"Raum",room_default_name:"Raum {n}",room_name:"Name",room_area_ha:"Bereich in Home Assistant",room_size:"Grundfl\xE4che",room_ceiling:"Raumh\xF6he (m, leer = Geschossh\xF6he)",room_delete:"Raum l\xF6schen",room_finish:"Raum schlie\xDFen",room_undo_point:"Letzte Ecke entfernen",corner:"Ecke {n}",corner_delete:"Ecke l\xF6schen",corner_min:"Ein Raum braucht mindestens drei Ecken.",pos_x:"X (m)",pos_z:"Z (m)",hint_select:"Klicke auf einen Raum, eine Ecke, eine \xD6ffnung oder ein M\xF6bel und ziehe es an die neue Stelle. Ziehst du ein + auf einer Kante, entsteht dort eine neue Ecke. Auf leerer Fl\xE4che verschiebt Ziehen die Ansicht.",hint_room:"Klicke die Ecken des Raums nacheinander an. Ein Klick auf die erste Ecke oder Enter schlie\xDFt den Raum. Die Ecken rasten im 5-cm-Raster und an vorhandenen W\xE4nden ein.",hint_wall:"Klicke auf eine Kante, um ihre Wand einzustellen.",hint_door:"Klicke auf eine Wand, um eine T\xFCr zu setzen. Eine T\xFCr l\xE4sst sich entlang ihrer Wand ziehen.",hint_window:"Klicke auf eine Wand, um ein Fenster zu setzen. Ein Fenster l\xE4sst sich entlang seiner Wand ziehen.",hint_freewall:"Klicke Anfang und Ende der Wand an, zum Beispiel f\xFCr einen Kamin oder eine Trennwand.",hint_freewall_second:"Klicke jetzt das Ende der Wand an. Esc bricht ab.",hint_furniture:"W\xE4hle eine Art und klicke an die Stelle, an die das M\xF6bel soll. Am runden Griff l\xE4sst es sich drehen.",hint_background:"Lade ein Bild deines Grundrisses hoch und lege den Ma\xDFstab \xFCber zwei Punkte mit bekanntem Abstand fest.",wall:"Wand",wall_length:"L\xE4nge",wall_interior:"Innenwand, gemeinsam mit {rooms}. Sie liegt mittig auf der Kante und nimmt die gr\xF6\xDFere St\xE4rke beider R\xE4ume.",wall_exterior:"Au\xDFenwand. Sie liegt au\xDFerhalb des Raums.",wall_partial:"{rooms} teilt nur einen Teil seiner Kante mit dieser Wand und beh\xE4lt dort die eigene St\xE4rke. Setze in diesem Raum eine Ecke, um seine Kante zu teilen.",wall_thickness:"Wandst\xE4rke (m)",wall_default:"Standard: {v} m",wall_reset:"Standard verwenden",wall_none:"Keine Wand (offener Durchgang)",opening_door:"T\xFCr",opening_window:"Fenster",opening_type:"Art",opening_room:"Geh\xF6rt zu",opening_offset:"Mitte ab Kantenanfang (m)",width:"Breite (m)",height:"H\xF6he (m)",depth:"Tiefe (m)",thickness:"St\xE4rke (m)",sill:"Br\xFCstungsh\xF6he (m)",hinge:"Anschlag",hinge_left:"Links (Kantenanfang)",hinge_right:"Rechts (Kantenende)",swing:"\xD6ffnet",swing_in:"In den Raum",swing_out:"Aus dem Raum heraus",contact:"Kontaktsensor (Entit\xE4ts-ID)",contact_hint:"Ein Bin\xE4rsensor, der an ist, solange die T\xFCr offen steht. Optional.",opening_delete:"\xD6ffnung l\xF6schen",freewall:"Freistehende Wand",freewall_height:"H\xF6he (m, leer = raumhoch)",freewall_delete:"Wand l\xF6schen",furniture:"M\xF6bel",furniture_type:"Art",furniture_new_type:"Art f\xFCr neue M\xF6bel",rotation:"Drehung (\xB0)",rotate_left:"90\xB0 gegen den Uhrzeigersinn drehen",rotate_right:"90\xB0 im Uhrzeigersinn drehen",furniture_delete:"M\xF6bel l\xF6schen",rotate_handle:"Zum Drehen ziehen",bg_upload:"Bild hochladen",bg_replace:"Bild ersetzen",bg_remove:"Bild entfernen",bg_none:"Diese Etage hat kein Hintergrundbild.",bg_opacity:"Deckkraft",bg_rotation:"Drehung (\xB0)",bg_width:"Breite (m)",bg_calibrate:"Ma\xDFstab festlegen",bg_calib_first:"Klicke den ersten Punkt einer Strecke an, deren L\xE4nge du kennst.",bg_calib_second:"Klicke den zweiten Punkt an.",bg_calib_length:"Tats\xE4chlicher Abstand (m)",bg_calib_measured:"Auf dem Bild gemessen: {v} m",bg_calib_apply:"Ma\xDFstab \xFCbernehmen",bg_move_hint:"Ziehe das Bild, um es zu verschieben.",bg_error:"Das Bild lie\xDF sich nicht lesen.",area_value:"{v} m\xB2",length_value:"{v} m",nothing_selected:"Nichts ausgew\xE4hlt.",group_lights:"Leuchten",group_living:"Wohnen",group_dining:"Essen",group_kitchen:"K\xFCche",group_sleeping:"Schlafen",group_bath:"Bad und Hauswirtschaft",group_work:"Arbeiten und Sonstiges",group_household:"Haushalt und Haustechnik",group_outdoor:"Au\xDFen",furn_lamp_ceiling:"Deckenleuchte",furn_lamp_downlight:"Einbauspot",furn_lamp_spot:"Aufbauspot",furn_lamp_panel:"LED-Panel",furn_lamp_pendant:"Pendelleuchte",furn_lamp_fan:"Deckenventilator mit Licht",furn_lamp_floor:"Stehlampe",furn_lamp_uplight:"Deckenfluter",furn_lamp_table:"Tischlampe",furn_lamp_wall:"Wandleuchte",furn_led_strip:"LED-Streifen",furn_lamp_bollard:"Wegleuchte",furn_lamp_garden:"Gartenstrahler",furn_sofa:"Sofa",furn_sofa_l:"Ecksofa (L-Form)",furn_sofa_u:"Wohnlandschaft (U-Form)",furn_armchair:"Sessel",furn_stool:"Hocker",furn_coffee_table:"Couchtisch",furn_tv_board:"TV-Board",furn_tv_wall:"Fernseher (Wand)",furn_sideboard:"Sideboard",furn_shelf:"Regal",furn_plant:"Pflanze",furn_rug:"Teppich",furn_table:"Tisch",furn_table_round:"Runder Tisch",furn_chair:"Stuhl",furn_bench:"Sitzbank",furn_corner_bench:"Eckbank",furn_bar_stool:"Barhocker",furn_kitchen:"K\xFCchenzeile",furn_kitchen_wall:"Oberschrank",furn_kitchen_tall:"Hochschrank mit Backofen",furn_island:"Kochinsel",furn_worktop:"Arbeitsplatte",furn_sink:"Sp\xFCle",furn_stove:"Herd",furn_dishwasher:"Sp\xFClmaschine",furn_fridge:"K\xFChlschrank",furn_bed:"Bett",furn_bunk_bed:"Etagenbett",furn_nightstand:"Nachttisch",furn_wardrobe:"Kleiderschrank",furn_dresser:"Kommode",furn_bathtub:"Badewanne",furn_shower:"Dusche",furn_wc:"WC",furn_washbasin:"Waschtisch",furn_washer:"Waschmaschine",furn_dryer:"Trockner",furn_desk:"Schreibtisch",furn_office_chair:"B\xFCrostuhl",furn_tall_cabinet:"Hochschrank",furn_coat_rack:"Garderobe",furn_radiator:"Heizk\xF6rper",furn_ac_unit:"Klimager\xE4t (Wand)",furn_stairs:"Treppe",furn_stairs_u:"U-Treppe mit Podest",furn_robot_vacuum:"Saugroboter",furn_waste_bin:"M\xFClltonne",furn_mailbox:"Briefkasten",furn_wall_switch:"Lichtschalter",furn_wall_socket:"Steckdose",furn_wifi_ap:"WLAN-Access-Point",furn_water_heater:"Warmwasserspeicher",furn_parking:"Stellplatz",furn_awning:"Markise"},Tp={en:qh,de:EM};function Rp(i,t,e){let n=String(i||"en").toLowerCase().split(/[-_]/)[0],r=(Tp[n]||qh)[t]??qh[t]??t;if(e)for(let[o,a]of Object.entries(e))r=r.split(`{${o}}`).join(String(a));return r}function Cp(i,t,e=2){let n=String(i||"en").toLowerCase().split(/[-_]/)[0];return t==null||!Number.isFinite(t)?"":new Intl.NumberFormat(n==="de"?"de-DE":"en-GB",{minimumFractionDigits:0,maximumFractionDigits:e,useGrouping:!1}).format(t)}function Sa(i){let t=String(i??"").trim().replace(",",".");if(t==="")return null;let e=Number(t);return Number.isFinite(e)?e:NaN}function Dt(i){let t=Math.round(i*1e3)/1e3;return Object.is(t,-0)?0:t}function nn(i){return[Dt(i[0]),Dt(i[1])]}function Bt(i,t){return[i[0]+t[0],i[1]+t[1]]}function re(i,t){return[i[0]-t[0],i[1]-t[1]]}function Zt(i,t){return[i[0]*t,i[1]*t]}function Sr(i,t){return i[0]*t[0]+i[1]*t[1]}function Ea(i,t){return i[0]*t[1]-i[1]*t[0]}function Pp(i){return Math.hypot(i[0],i[1])}function Yt(i,t){return Math.hypot(i[0]-t[0],i[1]-t[1])}function Er(i){let t=Pp(i);return t<1e-9?[0,0]:[i[0]/t,i[1]/t]}function ui(i,t,e){return[i[0]+(t[0]-i[0])*e,i[1]+(t[1]-i[1])*e]}function Ns(i,t,e){return Math.min(e,Math.max(t,i))}function Ip(i){return i*Math.PI/180}function AM(i){return i*180/Math.PI}function Aa(i){let t=(i%360+360)%360;return Dt(t)===360?0:Dt(t)}function Ls(i,t){let e=Ip(t),n=Math.cos(e),s=Math.sin(e);return[i[0]*n-i[1]*s,i[0]*s+i[1]*n]}function di(i){let t=0,e=i.length;for(let n=0;n<e;n++){let s=i[n],r=i[(n+1)%e];t+=s[0]*r[1]-r[0]*s[1]}return t/2}function Yh(i){return Math.abs(di(i))}function Dp(i){let t=i.length;if(!t)return[0,0];let e=di(i);if(Math.abs(e)<1e-9){let r=0,o=0;for(let a of i)r+=a[0],o+=a[1];return[r/t,o/t]}let n=0,s=0;for(let r=0;r<t;r++){let o=i[r],a=i[(r+1)%t],l=o[0]*a[1]-a[0]*o[1];n+=(o[0]+a[0])*l,s+=(o[1]+a[1])*l}return[n/(6*e),s/(6*e)]}function Ta(i,t){let e=!1,n=t.length;for(let s=0,r=n-1;s<n;r=s++){let[o,a]=t[s],[l,c]=t[r];a>i[1]!=c>i[1]&&i[0]<(l-o)*(i[1]-a)/(c-a)+o&&(e=!e)}return e}function ue(i,t){let e=i.length;return[i[(t%e+e)%e],i[((t+1)%e+e)%e]]}function Bi(i,t,e){let n=re(e,t),s=Sr(n,n),r=Math.sqrt(s),o=s<1e-9?0:Sr(re(i,t),n)/s;o=Ns(o,0,1);let a=ui(t,e,o);return{t:o,point:a,dist:Yt(i,a),along:o*r,length:r}}function Zh(i,t,e){let n=re(e,t),s=Pp(n);return s<1e-9?Yt(i,t):Math.abs(Ea(n,re(i,t)))/s}function Ar(i,t,e){let n=Er(re(t,i));return e>=0?[-n[1],n[0]]:[n[1],-n[0]]}function Kh(i,t){let e=i.length,n=i[(t-1+e)%e],s=i[t],r=i[(t+1)%e],o=Ea(re(s,n),re(r,s));return di(i)>=0?o>1e-9:o<-1e-9}function Lp(i,t=1e-4){let e=[];for(let n of i)(!e.length||Yt(e[e.length-1],n)>t)&&e.push(n);for(;e.length>1&&Yt(e[0],e[e.length-1])<=t;)e.pop();return e}function Us(i,t){return t?Dt(Math.round(i/t)*t):i}function Ra(i,t){return[Us(i[0],t),Us(i[1],t)]}function Up(i,t={}){let{grid:e=.05,tol:n=.15,vertices:s=[],segments:r=[]}=t,o=null;for(let a=0;a<s.length;a++){let l=Yt(i,s[a]);l<=n&&(!o||l<o.d)&&(o={d:l,point:s[a],ref:a})}if(o)return{point:nn(o.point),kind:"vertex",ref:o.ref};for(let a=0;a<r.length;a++){let[l,c]=r[a],h=Bi(i,l,c);h.dist<=n&&(!o||h.dist<o.d)&&(o={d:h.dist,pr:h,a:l,b:c,ref:a})}if(o){let{pr:a,a:l,b:c}=o,h=a.point;if(e&&a.length>1e-9){let d=Ns(Math.round(a.along/e)*e,0,a.length);h=ui(l,c,d/a.length)}return{point:nn(h),kind:"edge",ref:o.ref}}return e?{point:Ra(i,e),kind:"grid",ref:null}:{point:nn(i),kind:"none",ref:null}}function Jh(i,t,e={}){let{grid:n=.05,tol:s=.15,targets:r=[]}=e,o=null;for(let c of i){let h=Bt(c,t);for(let d of r){let u=Yt(h,d);u<=s&&(!o||u<o.d)&&(o={d:u,corr:re(d,h)})}}if(o)return[Dt(t[0]+o.corr[0]),Dt(t[1]+o.corr[1])];if(!i.length||!n)return[Dt(t[0]),Dt(t[1])];let a=Bt(i[0],t),l=Ra(a,n);return[Dt(l[0]-i[0][0]),Dt(l[1]-i[0][1])]}function Ca(i){let t=(i.w||0)/2,e=(i.d||0)/2,n=Ip(i.rotation||0),s=Math.cos(n),r=Math.sin(n);return[[-t,-e],[t,-e],[t,e],[-t,e]].map(([o,a])=>[i.x+o*s-a*r,i.z+o*r+a*s])}function Np(i,t){let e=re(t,i);return Aa(AM(Math.atan2(e[0],-e[1])))}function jh(i){if(!i.length)return null;let t=1/0,e=-1/0,n=1/0,s=-1/0;for(let[r,o]of i)r<t&&(t=r),r>e&&(e=r),o<n&&(n=o),o>s&&(s=o);return{x0:t,x1:e,z0:n,z1:s}}function Op(i,t,e,n){let s=Yt(t,e);if(!(s>1e-9)||!(n>0))return i;let r=n/s,o=[i.x||0,i.z||0],a=i.rotation||0,l=Ls(re(t,o),-a),c=Zt(l,r),h=re(t,Ls(c,a));return{...i,x:Dt(h[0]),z:Dt(h[1]),width:Dt((i.width||0)*r)}}function kp(i,t){let e=i.width||0,n=e*(t||1),s=[i.x||0,i.z||0];return[[0,0],[e,0],[e,n],[0,n]].map(r=>Bt(s,Ls(r,i.rotation||0)))}var Ia=.01,Da={wall_exterior:.24,wall_interior:.12};function Qh(i){return{...Da,...i&&i.settings}}function zp(i,t,e,n,s=Ia){let r=Yt(i,t);if(r<1e-9||Zh(e,i,t)>s||Zh(n,i,t)>s)return null;let o=re(t,i),a=Sr(re(e,i),o)/(r*r),l=Sr(re(n,i),o)/(r*r),c=Math.max(0,Math.min(a,l)),h=Math.min(1,Math.max(a,l));return(h-c)*r<=s?null:[c,h]}function Bp(i,t,e,n=Ia){let s=i.rooms.find(l=>l.id===t);if(!s)return[];let[r,o]=ue(s.points,e),a=[];for(let l of i.rooms){if(l.id===t)continue;let c=l.points.length;for(let h=0;h<c;h++){let[d,u]=ue(l.points,h),f=zp(r,o,d,u,n);f&&a.push({room_id:l.id,edge:h,t0:f[0],t1:f[1]})}}return a}function tu(i,t,e,n=Ia){let s=[{room_id:t,edge:e}],r=[],o=i.rooms.find(c=>c.id===t);if(!o)return{targets:s,partial:r};let[a,l]=ue(o.points,e);for(let c of Bp(i,t,e,n)){let h=i.rooms.find(_=>_.id===c.room_id),[d,u]=ue(h.points,c.edge),f=zp(d,u,a,l,n),g=Yt(d,u);f&&(f[1]-f[0])*g>=g-2*n?s.push({room_id:c.room_id,edge:c.edge}):r.push(c.room_id)}return{targets:s,partial:r}}function Vp(i,t,e,n=Ia){let s=i.rooms.find(u=>u.id===t);if(!s)return[];let[r,o]=ue(s.points,e),a=Bp(i,t,e,n),l=[0,1];for(let u of a)l.push(u.t0,u.t1);l.sort((u,f)=>u-f);let c=Yt(r,o),h=[];for(let u of l)(!h.length||(u-h[h.length-1])*c>n/2)&&h.push(u);h[h.length-1]<1&&(h[h.length-1]=1);let d=[];for(let u=0;u<h.length-1;u++){let f=h[u],g=h[u+1],_=(f+g)/2,m=a.filter(p=>p.t0<=_&&p.t1>=_).map(p=>({room_id:p.room_id,edge:p.edge}));d.push({t0:f,t1:g,a:Bt(r,Zt(re(o,r),f)),b:Bt(r,Zt(re(o,r),g)),neighbours:m})}return d}function Vi(i,t){let e=i.wall_thickness&&i.wall_thickness[t];return typeof e=="number"&&e>0?e:null}function Pa(i,t){return!!(i.wall_heights&&i.wall_heights[t]===0)}function eu(i,t,e,n){let s=Qh(i),r=t.rooms.find(g=>g.id===e);if(!r)return null;let o=Vp(t,e,n),a=[...new Set(o.flatMap(g=>g.neighbours.map(_=>_.room_id)))],l=a.length>0,c=Vi(r,n),h=c??(l?s.wall_interior:s.wall_exterior);if(l)for(let g of o)for(let _ of g.neighbours){let m=t.rooms.find(b=>b.id===_.room_id),p=(m&&Vi(m,_.edge))??s.wall_interior;h=Math.max(h,p)}let[d,u]=ue(r.points,n),f=l?tu(t,e,n).partial:[];return{length:Yt(d,u),shared:l,neighbours:a,partial:f,thickness:h,stored:c,noWall:Pa(r,n),pieces:o}}function $p(i,t){let e=Qh(i),n=t.rooms||[],s=new Map(n.map((o,a)=>[o.id,a])),r=[];for(let o=0;o<n.length;o++){let a=n[o],l=a.points||[];if(l.length<3)continue;let c=di(l);for(let h=0;h<l.length;h++){let[d,u]=ue(l,h);if(Yt(d,u)<1e-9)continue;let f=Ar(d,u,c),g=Vp(t,a.id,h);for(let _ of g)if(_.neighbours.length>0){if(_.neighbours.some(v=>s.get(v.room_id)<o)||Pa(a,h)||_.neighbours.some(v=>Pa(n[s.get(v.room_id)],v.edge)))continue;let p=Vi(a,h)??e.wall_interior;for(let v of _.neighbours)p=Math.max(p,Vi(n[s.get(v.room_id)],v.edge)??e.wall_interior);let b=_.t0===0?p/2:0,x=_.t1===1?p/2:0;r.push(Fp(a.id,h,_.a,_.b,"interior",p,f,-p/2,p/2,b,x))}else{if(Pa(a,h))continue;let p=Vi(a,h)??e.wall_exterior,b=l.length,x=Vi(a,(h-1+b)%b)??e.wall_exterior,v=Vi(a,(h+1)%b)??e.wall_exterior,C=_.t0===0&&Kh(l,h)?x:0,T=_.t1===1&&Kh(l,(h+1)%b)?v:0;r.push(Fp(a.id,h,_.a,_.b,"exterior",p,f,-p,0,C,T))}}}return r}function Fp(i,t,e,n,s,r,o,a,l,c,h){let d=Er(re(n,e)),u=re(e,Zt(d,c)),f=Bt(n,Zt(d,h)),g=[Bt(u,Zt(o,a)),Bt(f,Zt(o,a)),Bt(f,Zt(o,l)),Bt(u,Zt(o,l))];return{room_id:i,edge:t,a:e,b:n,kind:s,thickness:r,poly:g,n0:a,n1:l,normal:o}}function Hp(i){let t=i.thickness||.1,e=Er(re(i.b,i.a)),n=[-e[1],e[0]],s=t/2;return[Bt(i.a,Zt(n,-s)),Bt(i.b,Zt(n,-s)),Bt(i.b,Zt(n,s)),Bt(i.a,Zt(n,s))]}function Gp(i,t,e){let n=t.rooms.find(I=>I.id===e.room_id);if(!n||!n.points||n.points.length<3)return null;let s=n.points.length;if(!(e.edge>=0&&e.edge<s))return null;let[r,o]=ue(n.points,e.edge),a=Yt(r,o);if(a<1e-9)return null;let l=Er(re(o,r)),c=Ar(r,o,di(n.points)),h=Math.min(e.width||.8,a),d=Ns(e.offset??a/2,h/2,a-h/2),u=Bt(r,Zt(l,d)),f=eu(i,t,n.id,e.edge),g=f?f.thickness:Qh(i).wall_exterior,_=d/a,m=f?f.pieces.find(I=>I.t0<=_&&I.t1>=_):null,p=!!(m&&m.neighbours.length),b=p?-g/2:-g,x=p?g/2:0,v=re(u,Zt(l,h/2)),C=Bt(u,Zt(l,h/2)),T=[Bt(v,Zt(c,b)),Bt(C,Zt(c,b)),Bt(C,Zt(c,x)),Bt(v,Zt(c,x))],R={a:v,b:C,centre:u,dir:l,normal:c,n0:b,n1:x,poly:T,width:h,offset:d,edgeLength:a,shared:p};if(e.type==="door"){let I=e.hinge==="right",S=e.swing==="out"?-1:1,M=S>0?x:b,P=Bt(I?C:v,Zt(c,M)),L=Bt(I?v:C,Zt(c,M)),E=Bt(P,Zt(c,S*h));R.hinge=P,R.closed=L,R.tip=E}return R}function La(i,t,e){let n=null;for(let s of i.rooms||[]){let r=s.points||[];if(r.length<3)continue;let o=Ta(t,r);for(let a=0;a<r.length;a++){let[l,c]=ue(r,a),h=Bi(t,l,c);if(h.dist>e)continue;let d={room_id:s.id,edge:a,t:h.t,along:h.along,length:h.length,dist:h.dist,point:h.point,inside:o};(!n||d.dist<n.dist-.001||Math.abs(d.dist-n.dist)<=.001&&d.inside&&!n.inside)&&(n=d)}}return n&&delete n.inside,n}var Ua={lights:["lamp_ceiling","lamp_downlight","lamp_spot","lamp_panel","lamp_pendant","lamp_fan","lamp_floor","lamp_uplight","lamp_table","lamp_wall","led_strip","lamp_bollard","lamp_garden"],living:["sofa","sofa_l","sofa_u","armchair","stool","coffee_table","tv_board","tv_wall","sideboard","shelf","plant","rug"],dining:["table","table_round","chair","bench","corner_bench","bar_stool"],kitchen:["kitchen","kitchen_wall","kitchen_tall","island","worktop","sink","stove","dishwasher","fridge"],sleeping:["bed","bunk_bed","nightstand","wardrobe","dresser"],bath:["bathtub","shower","wc","washbasin","washer","dryer"],work:["desk","office_chair","tall_cabinet","coat_rack","radiator","ac_unit","stairs","stairs_u","robot_vacuum"],household:["waste_bin","mailbox","wall_switch","wall_socket","wifi_ap","water_heater"],outdoor:["parking","awning"]},TM=[...new Set(Object.values(Ua).flat())],nu={lamp_ceiling:[.4,.4,.08],lamp_downlight:[.1,.1,.02],lamp_spot:[.1,.1,.14],lamp_panel:[.6,.6,.03],lamp_pendant:[.4,.4,.8],lamp_fan:[1.3,1.3,.45],lamp_floor:[.4,.4,1.7],lamp_uplight:[.35,.35,1.8],lamp_table:[.28,.28,.45],lamp_wall:[.22,.12,.2],led_strip:[2,.04,.03],lamp_bollard:[.16,.16,.8],lamp_garden:[.12,.12,.3],sofa:[2.2,.9,.82],sofa_l:[2.6,1.8,.82],sofa_u:[3,2.2,.82],armchair:[.85,.85,.8],stool:[.55,.55,.42],coffee_table:[1.1,.6,.42],tv_board:[1.8,.42,.5],tv_wall:[1.3,.08,.75],sideboard:[1.6,.45,.8],shelf:[.9,.35,1.9],plant:[.45,.45,1.1],rug:[2,1.4,.01],table:[1.6,.9,.75],table_round:[1.1,1.1,.75],chair:[.46,.5,.9],bench:[1.4,.45,.85],corner_bench:[2,1.6,.9],bar_stool:[.42,.42,.75],kitchen:[2.4,.62,.92],kitchen_wall:[.8,.35,.7],kitchen_tall:[.6,.62,2.1],island:[1.8,.9,.92],worktop:[1.2,.62,.91],sink:[.9,.62,.92],stove:[.6,.62,.92],dishwasher:[.6,.62,.92],fridge:[.6,.65,1.8],bed:[1.6,2.05,.9],bunk_bed:[1,2.05,1.65],nightstand:[.45,.4,.5],wardrobe:[1.8,.6,2.1],dresser:[1,.5,.9],bathtub:[1.7,.75,.58],shower:[.9,.9,2],wc:[.38,.6,.8],washbasin:[.6,.46,.85],washer:[.6,.6,.85],dryer:[.6,.6,.85],desk:[1.4,.7,.75],office_chair:[.65,.65,1.1],tall_cabinet:[.6,.6,2.1],coat_rack:[1,.35,1.9],radiator:[1,.1,.6],ac_unit:[.85,.22,.3],stairs:[1,3.2,2.75],stairs_u:[2.1,2.7,2.75],robot_vacuum:[.36,.5,.1],waste_bin:[.58,.73,1.07],mailbox:[.38,.14,.34],wall_switch:[.085,.012,.085],wall_socket:[.085,.014,.085],wifi_ap:[.2,.2,.04],water_heater:[.56,.56,1.5],parking:[2.6,5.2,.02],awning:[3,2.5,.22]},RM=new Set(["led_strip","shower","plant","rug","coat_rack"]);function Wp(i){return(i.h||0)>=1.5&&!String(i.type).startsWith("lamp_")&&!RM.has(i.type)}var ks=2.6,Na={door:{width:.9,sill:0,height:2,hinge:"left",swing:"in"},window:{width:1.2,sill:.9,height:1.3,hinge:"left",swing:"in"}};function iu(){return{version:1,settings:{...Da},floors:[]}}function su(i){return!i||typeof i!="object"?iu():Array.isArray(i.floors)&&i.settings&&i.version?i:{version:1,...i,settings:{...Da,...i.settings||{}},floors:i.floors||[]}}function de(i,t){return i&&i.floors&&i.floors.find(e=>e.id===t)||null}function fi(i){return{rooms:[],openings:[],walls:[],furniture:[],outdoor:[],background:null,...i}}function ye(i,t,e){let n=!1,s=i.floors.map(r=>r.id!==t?r:(n=!0,e(fi(r))));return n?{...i,floors:s}:i}function Tr(i,t){let e=new Set(t),n=1;for(;e.has(`${i}_${n}`);)n++;return`${i}_${n}`}function Oa(i){return[...(i.rooms||[]).map(t=>t.id),...(i.openings||[]).map(t=>t.id),...(i.walls||[]).map(t=>t.id),...(i.furniture||[]).map(t=>t.id)]}function qp(i,t={}){let e=su(i),n=t.id||Tr("floor",e.floors.map(o=>o.id)),s=0;for(let o of e.floors)s=Math.max(s,(o.elevation||0)+(o.height||ks));let r=fi({id:n,name:t.name||n,ha_floor:t.ha_floor??null,elevation:t.elevation??Dt(s),height:t.height??ks});return{...e,floors:[...e.floors,r]}}function Yp(i,t,e){let n={};for(let s of["name","ha_floor","height","elevation"])s in e&&(n[s]=e[s]);return ye(i,t,s=>({...s,...n}))}function Zp(i,t){return{...i,floors:i.floors.filter(e=>e.id!==t)}}function Ie(i,t){return i&&i.rooms.find(e=>e.id===t)||null}function CM(i,t,e,n){return ye(i,t,s=>({...s,rooms:s.rooms.map(r=>r.id===e?n(r):r)}))}function Kp(i,t,e,n={}){let s=de(i,t);if(!s)return{plan:i,id:null};let r=Lp(e.map(nn));if(r.length<3)return{plan:i,id:null};let o=n.id||Tr("room",Oa(fi(s))),a={id:o,name:n.name||o,area_id:n.area_id??null,points:r,ceiling_height:null};return{plan:ye(i,t,l=>({...l,rooms:[...l.rooms,a]})),id:o}}function Jp(i,t,e,n){let s={};for(let r of["name","area_id","ceiling_height"])r in n&&(s[r]=n[r]);return CM(i,t,e,r=>({...r,...s}))}function ru(i,t,e){return ye(i,t,n=>({...n,rooms:n.rooms.filter(s=>s.id!==e),openings:n.openings.filter(s=>s.room_id!==e)}))}function Fs(i,t,e){return t>=e?Dt(e/2):Dt(Ns(i,t/2,e-t/2))}function PM(i,t){let[e,n]=ue(i,t.edge),s=Yt(e,n);return s<1e-9?e:Bt(e,[(n[0]-e[0])*t.offset/s,(n[1]-e[1])*t.offset/s])}function jp(i,t,e,n,s){return i.map(r=>{if(r.room_id!==t)return r;let o=s(r.edge),a=PM(e,r),[l,c]=ue(n,o),h=Bi(a,l,c),d=Fs(h.along,r.width||0,h.length);return o===r.edge&&d===r.offset?r:{...r,edge:o,offset:d}})}function Xp(i,t,e){if(!Array.isArray(i))return i;let n=i.slice();for(;n.length<e;)n.push(null);return n.splice(t+1,0,n[t]??null),n}function Rr(i,t,e,n,s){let r=de(i,t),o=Ie(r,e);if(!o||n<0||n>=o.points.length)return i;let a=nn(s),l=o.points.map((c,h)=>h===n?a:c);return ye(i,t,c=>({...c,rooms:c.rooms.map(h=>h.id===e?{...h,points:l}:h),openings:jp(c.openings,e,o.points,l,h=>h)}))}function ou(i,t,e,n,s){let r=de(i,t),o=Ie(r,e);if(!o)return{plan:i,index:null};let a=o.points.length,[l,c]=ue(o.points,n),h=Bi(s,l,c);if(h.along<.01||h.length-h.along<.01)return{plan:i,index:null};let d=nn(h.point),u=Yt(l,d),f=Yt(d,c),g=o.points.slice();g.splice(n+1,0,d);let _={...o,points:g};Array.isArray(o.wall_thickness)&&(_.wall_thickness=Xp(o.wall_thickness,n,a)),Array.isArray(o.wall_heights)&&(_.wall_heights=Xp(o.wall_heights,n,a));let m=p=>p.openings.map(b=>b.room_id!==e?b:b.edge>n?{...b,edge:b.edge+1}:b.edge<n?b:b.offset<=u?{...b,offset:Fs(b.offset,b.width||0,u)}:{...b,edge:n+1,offset:Fs(b.offset-u,b.width||0,f)});return{plan:ye(i,t,p=>({...p,rooms:p.rooms.map(b=>b.id===e?_:b),openings:m(p)})),index:n+1}}function IM(i,t,e,n){let s=de(i,t),r=Ie(s,e);if(!r)return i;let o=r.points.length;if(o<=3||n<0||n>=o)return i;let a=r.points.filter((u,f)=>f!==n),l=(n-1+o)%o,c=u=>n===0?u===0||u===o-1?o-2:u-1:u===n?n-1:u<n?u:u-1,h=u=>{if(!Array.isArray(u))return u;let f=u.slice();for(;f.length<o;)f.push(null);let g=new Array(o-1).fill(null);for(let _=0;_<o;_++)_===n&&_!==l||(g[c(_)]=f[_]);return g[c(l)]=f[l],g},d={...r,points:a};return Array.isArray(r.wall_thickness)&&(d.wall_thickness=h(r.wall_thickness)),Array.isArray(r.wall_heights)&&(d.wall_heights=h(r.wall_heights)),ye(i,t,u=>({...u,rooms:u.rooms.map(f=>f.id===e?d:f),openings:jp(u.openings,e,r.points,a,c)}))}function au(i,t,e,n,s={}){let{withFurniture:r=!0}=s,o=de(i,t),a=Ie(o,e);if(!a||!n[0]&&!n[1])return i;let l=a.points.map(c=>nn(Bt(c,n)));return ye(i,t,c=>({...c,rooms:c.rooms.map(h=>h.id===e?{...h,points:l}:h),furniture:r?c.furniture.map(h=>Ta([h.x,h.z],a.points)?{...h,x:Dt(h.x+n[0]),z:Dt(h.z+n[1])}:h):c.furniture}))}function Qp(i,t,e,n){let s=i.points.length,r=Array.isArray(i[t])?i[t].slice():new Array(s).fill(null);for(;r.length<s;)r.push(null);return r.length=s,r[e]=n,{...i,[t]:r}}function tm(i,t,e){return tu(i,t,e).targets}function lu(i,t,e,n,s){let r=de(i,t);if(!Ie(r,e))return i;let o=s==null||!(s>0)?null:Dt(s),a=tm(fi(r),e,n);return ye(i,t,l=>({...l,rooms:l.rooms.map(c=>{let h=c;for(let d of a)d.room_id===c.id&&(h=Qp(h,"wall_thickness",d.edge,o));return h})}))}function em(i,t,e,n,s){let r=de(i,t);if(!Ie(r,e))return i;let o=tm(fi(r),e,n);return ye(i,t,a=>({...a,rooms:a.rooms.map(l=>{let c=l;for(let h of o)if(h.room_id===l.id&&(c=Qp(c,"wall_heights",h.edge,s?0:null),c.wall_heights.every(d=>d==null))){let{wall_heights:d,...u}=c;c=u}return c})}))}function nm(i,t,e,n,s,r="door",o={}){let a=de(i,t),l=Ie(a,e);if(!l)return{plan:i,id:null};let c=Yt(...ue(l.points,n)),h=Na[r]||Na.door,d=o.width??h.width;d>c-.1&&(d=Dt(Math.max(.3,c-.1)));let u=o.id||Tr(r,Oa(fi(a))),f={id:u,room_id:e,edge:n,offset:Fs(s,d,c),width:d,type:r,sill:o.sill??h.sill,height:o.height??h.height,hinge:o.hinge??h.hinge,swing:o.swing??h.swing,contact:o.contact??null};return{plan:ye(i,t,g=>({...g,openings:[...g.openings,f]})),id:u}}function ka(i,t,e,n){return de(i,t)?ye(i,t,r=>({...r,openings:r.openings.map(o=>{if(o.id!==e)return o;let a={...o,...n};a.contact===""&&(a.contact=null);let l=Ie(r,a.room_id);if(l){let c=Yt(...ue(l.points,a.edge));a.width>c&&(a.width=Dt(c)),a.offset=Fs(a.offset,a.width,c)}return a})})):i}function im(i,t,e,n,s=.05){let r=de(i,t),o=r&&r.openings.find(u=>u.id===e),a=o&&Ie(r,o.room_id);if(!a)return i;let[l,c]=ue(a.points,o.edge),h=Bi(n,l,c),d=h.along;return s&&(d=Math.round(d/s)*s),ka(i,t,e,{offset:Fs(d,o.width,h.length)})}function cu(i,t,e){return ye(i,t,n=>({...n,openings:n.openings.filter(s=>s.id!==e)}))}function sm(i,t,e,n,s={}){let r=de(i,t);if(!r||Yt(e,n)<.02)return{plan:i,id:null};let o=s.id||Tr("wall",Oa(fi(r))),a={id:o,a:nn(e),b:nn(n),thickness:s.thickness??.24,height:s.height??null};return{plan:ye(i,t,l=>({...l,walls:[...l.walls,a]})),id:o}}function Fa(i,t,e,n){return ye(i,t,s=>({...s,walls:s.walls.map(r=>{if(r.id!==e)return r;let o={...r,...n};return n.a&&(o.a=nn(n.a)),n.b&&(o.b=nn(n.b)),o})}))}function hu(i,t,e,n){let s=de(i,t),r=s&&s.walls.find(o=>o.id===e);return r?Fa(i,t,e,{a:Bt(r.a,n),b:Bt(r.b,n)}):i}function uu(i,t,e){return ye(i,t,n=>({...n,walls:n.walls.filter(s=>s.id!==e)}))}function rm(i,t,e,n,s,r={}){let o=de(i,t);if(!o)return{plan:i,id:null};let a=nu[e]||[1,1,1],l=r.id||Tr(e,Oa(fi(o))),c={id:l,type:e,x:Dt(n),z:Dt(s),w:r.w??a[0],d:r.d??a[1],h:r.h??a[2],rotation:Aa(r.rotation??0)};return{plan:ye(i,t,h=>({...h,furniture:[...h.furniture,c]})),id:l}}function Cr(i,t,e,n){return ye(i,t,s=>({...s,furniture:s.furniture.map(r=>{if(r.id!==e)return r;let o={...r,...n};"rotation"in n&&(o.rotation=Aa(n.rotation||0));for(let a of["x","z","w","d","h"])a in n&&(o[a]=Dt(Number(n[a])||0));return o})}))}function du(i,t,e){return ye(i,t,n=>({...n,furniture:n.furniture.filter(s=>s.id!==e)}))}function Pr(i,t,e){return ye(i,t,n=>({...n,background:e?{...e}:null}))}function Ir(i,t,e){return ye(i,t,n=>n.background?{...n,background:{...n.background,...e}}:n)}function om(i,t,e){if(!e)return i;switch(e.kind){case"room":return ru(i,t,e.id);case"corner":return IM(i,t,e.id,e.index);case"opening":return cu(i,t,e.id);case"wall":return uu(i,t,e.id);case"furniture":return du(i,t,e.id);case"background":return Pr(i,t,null);default:return i}}function am(i,t,e,n){if(!e)return i;let s=de(i,t);if(!s)return i;switch(e.kind){case"room":return au(i,t,e.id,n);case"corner":{let r=Ie(s,e.id);return r?Rr(i,t,e.id,e.index,Bt(r.points[e.index],n)):i}case"wall":return hu(i,t,e.id,n);case"furniture":{let r=s.furniture.find(o=>o.id===e.id);return r?Cr(i,t,e.id,{x:r.x+n[0],z:r.z+n[1]}):i}case"opening":{let r=s.openings.find(u=>u.id===e.id),o=r&&Ie(s,r.room_id);if(!o)return i;let[a,l]=ue(o.points,r.edge),c=Yt(a,l),h=re(l,a),d=c>1e-9?(n[0]*h[0]+n[1]*h[1])/c:0;return ka(i,t,e.id,{offset:r.offset+d})}case"background":{let r=s.background;return r?Ir(i,t,{x:Dt((r.x||0)+n[0]),z:Dt((r.z||0)+n[1])}):i}default:return i}}function za(i,t=null){let e=[],n=[];for(let s of i&&i.rooms||[]){if(s.id===t)continue;let r=s.points||[];for(let o=0;o<r.length;o++)e.push(r[o]),n.push(ue(r,o))}for(let s of i&&i.walls||[])e.push(s.a,s.b),n.push([s.a,s.b]);return{vertices:e,segments:n}}function fu(i,t=100){return{past:[],present:i,future:[],limit:t}}function lm(i,t){if(t===i.present)return i;let e=[...i.past,i.present];for(;e.length>i.limit;)e.shift();return{...i,past:e,present:t,future:[]}}function Ba(i){return i.past.length>0}function Va(i){return i.future.length>0}function cm(i){if(!Ba(i))return i;let t=i.past.slice(0,-1);return{...i,past:t,present:i.past[i.past.length-1],future:[i.present,...i.future]}}function hm(i){if(!Va(i))return i;let[t,...e]=i.future;return{...i,past:[...i.past,i.present],present:t,future:e}}function um(i,t){return{...i,present:t}}function pu(i){return Math.min(800,Math.max(8,i))}function $i(i,t){return[(t[0]-i.tx)/i.scale,(t[1]-i.ty)/i.scale]}function mu(i,t,e){let n=pu(i.scale*e),s=$i(i,t);return{scale:n,tx:t[0]-s[0]*n,ty:t[1]-s[1]*n}}function dm(i,t,e,n=24){let s=i||{x0:0,x1:10,z0:0,z1:8},r=Math.max(1,s.x1-s.x0),o=Math.max(1,s.z1-s.z0),a=Math.max(1,t-2*n),l=Math.max(1,e-2*n),c=pu(Math.min(a/r,l/o));return{scale:c,tx:t/2-(s.x0+s.x1)/2*c,ty:e/2-(s.z0+s.z1)/2*c}}function fm(i,t,e){let n=(u,f)=>[(u[0]+f[0])/2,(u[1]+f[1])/2],s=(u,f)=>Math.hypot(u[0]-f[0],u[1]-f[1]),r=s(t[0],t[1]),o=s(e[0],e[1]),a=r>1?o/r:1,l=n(t[0],t[1]),c=n(e[0],e[1]),h=$i(i,l),d=pu(i.scale*a);return{scale:d,tx:c[0]-h[0]*d,ty:c[1]-h[1]*d}}var Wn=.05,LM=10,UM=4,NM=6,pm=14,OM=.3,mm=[{id:"select",key:"V",icon:"select"},{id:"room",key:"R",icon:"room"},{id:"wall",key:"W",icon:"wall"},{id:"door",key:"D",icon:"door"},{id:"window",key:"N",icon:"window"},{id:"freewall",key:"F",icon:"freewall"},{id:"furniture",key:"M",icon:"furniture"},{id:"background",key:"B",icon:"background"}],kM={select:["room","corner","opening","wall","furniture"],room:["room","corner"],wall:["edge"],door:["opening"],window:["opening"],freewall:["wall"],furniture:["furniture"],background:["background"]},Dr=typeof navigator<"u"&&/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent||"");function Hi(i){return!i||!i.length?"":"M"+i.map(t=>`${t[0]} ${t[1]}`).join("L")+"Z"}function FM(i,t){try{return JSON.stringify(i)===JSON.stringify(t)}catch{return!1}}function gm(i){return new Promise((t,e)=>{let n=new Image;n.onload=()=>t(n),n.onerror=()=>e(new Error("image")),n.src=i})}function zM(i){return new Promise((t,e)=>{let n=new FileReader;n.onload=()=>t(n.result),n.onerror=()=>e(n.error),n.readAsDataURL(i)})}var $a=class extends Ge{static properties={plan:{attribute:!1},floorId:{attribute:"floor-id"},lang:{type:String},dark:{type:Boolean,reflect:!0},areas:{attribute:!1},floors:{attribute:!1},_history:{state:!0},_draft:{state:!0},_floor:{state:!0},_tool:{state:!0},_sel:{state:!0},_view:{state:!0},_measure:{state:!0},_draw:{state:!0},_hover:{state:!0},_hoverEdge:{state:!0},_wallStart:{state:!0},_calib:{state:!0},_furnType:{state:!0},_confirmDelete:{state:!0},_panning:{state:!0},_bgError:{state:!0},_size:{state:!0}};static styles=Ap;constructor(){super(),this.plan=null,this.floorId=null,this.lang="en",this.dark=!1,this.areas=[],this.floors=[],this._history=fu(iu()),this._draft=null,this._floor=null,this._tool="select",this._sel=null,this._view={scale:50,tx:24,ty:24},this._measure=!0,this._draw=[],this._hover=null,this._hoverEdge=null,this._wallStart=null,this._calib=null,this._furnType="sofa",this._confirmDelete=!1,this._panning=!1,this._bgError=!1,this._size=null,this._emitted=void 0,this._needFit=!0,this._userView=!1,this._pointers=new Map,this._gesture=null,this._drag=null,this._aspects=new Map,this.addEventListener("keydown",t=>this._onKey(t))}get _plan(){return this._history.present}get _shown(){return this._draft||this._plan}get _floorObj(){return de(this._shown,this._floor)}_t(t,e){return Rp(this.lang,t,e)}_n(t,e=2){return Cp(this.lang,t,e)}willUpdate(t){t.has("plan")&&this._syncPlan(),t.has("floorId")&&this.floorId&&this.floorId!==this._floor&&(this._floor=this.floorId,this._resetInteraction(),this._sel=null,this._needFit=!0);let e=this._plan.floors||[];e.some(n=>n.id===this._floor)||(this._floor=e.length?e[0].id:null,this._needFit=!0)}_syncPlan(){let t=this.plan;if(t===this._emitted)return;this._emitted=t;let e=su(t);if(e!==this._plan){if(FM(e,this._plan)){this._history=um(this._history,e);return}this._history=fu(e),this._resetInteraction(),this._sel=null,this._needFit=!0}}firstUpdated(){let t=this.renderRoot.querySelector(".canvas");t&&typeof ResizeObserver<"u"&&(this._ro=new ResizeObserver(e=>{let n=e[0].contentRect;n.width>0&&n.height>0&&(this._size={w:n.width,h:n.height},this._userView||(this._needFit=!0))}),this._ro.observe(t))}updated(){this._needFit&&this._size&&this._floorObj&&this._fit()}disconnectedCallback(){super.disconnectedCallback(),this._ro&&this._ro.disconnect(),this._ro=null}connectedCallback(){super.connectedCallback(),this.hasUpdated&&!this._ro&&this.firstUpdated()}_resetInteraction(){this._draft=null,this._drag=null,this._draw=[],this._hover=null,this._hoverEdge=null,this._wallStart=null,this._calib=null,this._confirmDelete=!1}_commit(t,e){return this._draft=null,e!==void 0&&(this._sel=e),!t||t===this._plan?!1:(this._history=lm(this._history,t),this._emit(),!0)}_emit(){let t=this._plan;this._emitted=t,this.dispatchEvent(new CustomEvent("plan-changed",{detail:{plan:t},bubbles:!0,composed:!0}))}_undo(){Ba(this._history)&&(this._resetInteraction(),this._history=cm(this._history),this._afterHistoryMove())}_redo(){Va(this._history)&&(this._resetInteraction(),this._history=hm(this._history),this._afterHistoryMove())}_afterHistoryMove(){if(!de(this._plan,this._floor)){let t=this._plan.floors[0];this._floor=t?t.id:null}this._validateSelection(),this._emit()}_validateSelection(){let t=this._sel,e=de(this._plan,this._floor);if(!t||!e){this._sel=null;return}let n=r=>e.rooms.find(o=>o.id===r),s=!0;t.kind==="room"?s=!!n(t.id):t.kind==="corner"||t.kind==="edge"?s=!!n(t.id)&&t.index<n(t.id).points.length:t.kind==="opening"?s=e.openings.some(r=>r.id===t.id):t.kind==="wall"?s=e.walls.some(r=>r.id===t.id):t.kind==="furniture"?s=e.furniture.some(r=>r.id===t.id):t.kind==="background"&&(s=!!e.background),s||(this._sel=null)}_selectFloor(t){t!==this._floor&&(this._floor=t,this._resetInteraction(),this._sel=null,this._needFit=!0,this.dispatchEvent(new CustomEvent("floor-selected",{detail:{floorId:t},bubbles:!0,composed:!0})))}_addFloor(){let t=(this._plan.floors||[]).length+1,e=qp(this._plan,{name:this._t("floor_default_name",{n:t})}),n=e.floors[e.floors.length-1].id;this._commit(e,null),this._selectFloor(n)}_deleteFloor(){let t=Zp(this._plan,this._floor);this._confirmDelete=!1,this._commit(t,null);let e=t.floors[0];this._selectFloor(e?e.id:null)}_fit(){let t=this._floorObj,e=[];if(t){for(let l of t.rooms)e.push(...l.points);for(let l of t.walls)e.push(l.a,l.b);for(let l of t.furniture)e.push(...Ca(l));t.background&&t.background.image&&e.push(...kp(t.background,this._aspect(t.background.image)))}let n=jh(e),s=.4,r=n?{x0:n.x0-s,x1:n.x1+s,z0:n.z0-s,z1:n.z1+s}:null,{w:o,h:a}=this._size||{w:800,h:600};this._view=dm(r,o,a,24),this._needFit=!1,this._userView=!1}_zoom(t){this._userView=!0;let{w:e,h:n}=this._size||{w:800,h:600};this._view=mu(this._view,[e/2,n/2],t)}_aspect(t){return this._aspects.has(t)?this._aspects.get(t):(this._aspects.set(t,.75),gm(t).then(e=>{e.naturalWidth>0&&e.naturalHeight>0&&(this._aspects.set(t,e.naturalHeight/e.naturalWidth),this.requestUpdate())}).catch(()=>{}),.75)}_setTool(t){if(t!==this._tool&&(this._tool=t,this._resetInteraction(),this._sel&&!kM[t].includes(this._sel.kind)&&(this._sel=null),t==="background")){let e=this._floorObj;this._sel=e&&e.background?{kind:"background"}:null}}_tolerance(){return LM/this._view.scale}_edgeTolerance(){return Math.max(pm/this._view.scale,OM)}_snap(t,e={}){let n=de(this._plan,this._floor),s=za(n,e.exceptRoom||null),r=s.vertices,o=s.segments;if(e.exceptWall){let l=n.walls.find(c=>c.id===e.exceptWall);l&&(r=r.filter(c=>c!==l.a&&c!==l.b),o=o.filter(c=>c[0]!==l.a||c[1]!==l.b))}let a=e.extra||[];if(a.length){r=[...r,...a];let l=[];for(let c=0;c+1<a.length;c++)l.push([a[c],a[c+1]]);o=[...o,...l]}return Up(t,{grid:Wn,tol:this._tolerance(),vertices:r,segments:o})}_svgEl(){return this.renderRoot.querySelector("svg.plan")}_local(t){let e=this._svgEl(),n=e?e.getBoundingClientRect():{left:0,top:0};return[t.clientX-n.left,t.clientY-n.top]}_onPointerDown(t){if(!this._floorObj||t.pointerType==="mouse"&&t.button!==0&&t.button!==1)return;let e=t.currentTarget;try{e.setPointerCapture(t.pointerId)}catch{}let n=this.renderRoot.querySelector(".canvas");n&&this.shadowRoot.activeElement!==n&&n.focus({preventScroll:!0});let s=this._local(t);if(t.isPrimary&&(this._pointers.clear(),this._gesture=null),this._pointers.set(t.pointerId,s),this._pointers.size>=2){this._draft=null,this._drag=null;let c=[...this._pointers.values()].slice(0,2);this._gesture={startView:this._view,start:c};return}let r=$i(this._view,s),o=t.target&&t.target.closest?t.target.closest("[data-hit]"):null,a=o?{kind:o.dataset.hit,id:o.dataset.id||null,index:o.dataset.index!=null?Number(o.dataset.index):null}:null,l=t.button===1?"pan":this._modeFor(a);this._drag={mode:l,hit:a,startS:s,startP:r,startView:this._view,base:this._plan,moved:!1},t.preventDefault()}_modeFor(t){let e=this._tool,n=t&&t.kind;if(e==="select")return n==="corner"?(this._sel={kind:"corner",id:t.id,index:t.index},"corner"):n==="mid"?"insert":n==="rot"?"rotate":n==="wallend"?"wallend":n==="opening"?(this._sel={kind:"opening",id:t.id},"opening"):n==="furniture"?(this._sel={kind:"furniture",id:t.id},"furniture"):n==="freewall"?(this._sel={kind:"wall",id:t.id},"freewall"):n==="room"?(this._sel={kind:"room",id:t.id},"room"):"pan";if((e==="door"||e==="window")&&n==="opening")return this._sel={kind:"opening",id:t.id},"opening";if(e==="furniture"){if(n==="furniture")return this._sel={kind:"furniture",id:t.id},"furniture";if(n==="rot")return"rotate"}return e==="freewall"&&n==="wallend"&&!this._wallStart?"wallend":e==="background"?this._calib?"click":n==="bg"?(this._sel={kind:"background"},"bg"):"pan":"click"}_onPointerMove(t){let e=this._local(t);if(this._pointers.has(t.pointerId)&&this._pointers.set(t.pointerId,e),this._gesture){if(this._pointers.size>=2){let r=[...this._pointers.values()].slice(0,2);this._view=fm(this._gesture.startView,this._gesture.start,r),this._userView=!0}return}let n=$i(this._view,e),s=this._drag;if(!s){(t.pointerType==="mouse"||t.pointerType==="pen")&&this._updateHover(n);return}if(!(!s.moved&&Math.hypot(e[0]-s.startS[0],e[1]-s.startS[1])<UM)){if(s.moved=!0,s.mode==="pan"||s.mode==="click"){this._panning=!0,this._userView=!0,this._view={...s.startView,tx:s.startView.tx+e[0]-s.startS[0],ty:s.startView.ty+e[1]-s.startS[1]};return}this._dragEdit(s,n,t)}}_dragEdit(t,e,n){let s=this._floor,r=de(t.base,s),o=re(e,t.startP),a=t.hit&&t.hit.id,l=null;switch(t.mode){case"insert":{let c=ou(t.base,s,a,t.hit.index,t.startP);if(c.index==null)return;t.base=c.plan,t.mode="corner",t.hit={kind:"corner",id:a,index:c.index},this._sel={kind:"corner",id:a,index:c.index},this._dragEdit(t,e,n);return}case"corner":{let c=this._snap(e,{exceptRoom:a});this._hover=c,l=Rr(t.base,s,a,t.hit.index,c.point);break}case"room":{let c=Ie(r,a);if(!c)return;let h=za(r,a).vertices,d=Jh(c.points,o,{grid:Wn,tol:this._tolerance(),targets:h});l=au(t.base,s,a,d);break}case"furniture":{let c=r.furniture.find(h=>h.id===a);if(!c)return;l=Cr(t.base,s,a,{x:Us(c.x+o[0],Wn),z:Us(c.z+o[1],Wn)});break}case"rotate":{let c=r.furniture.find(d=>d.id===a);if(!c)return;let h=Np([c.x,c.z],e);n.shiftKey||(h=Math.round(h/15)*15),l=Cr(t.base,s,a,{rotation:h});break}case"freewall":{let c=r.walls.find(u=>u.id===a);if(!c)return;let h=za(r).vertices.filter(u=>u!==c.a&&u!==c.b),d=Jh([c.a,c.b],o,{grid:Wn,tol:this._tolerance(),targets:h});l=hu(t.base,s,a,d);break}case"wallend":{let c=this._snap(e,{exceptWall:a});this._hover=c,l=Fa(t.base,s,a,{[t.hit.index?"b":"a"]:c.point});break}case"opening":l=im(t.base,s,a,e,Wn);break;case"bg":{let c=r.background;if(!c)return;l=Ir(t.base,s,{x:Dt((c.x||0)+o[0]),z:Dt((c.z||0)+o[1])});break}default:return}this._draft=l}_onPointerUp(t){let e=this._pointers.delete(t.pointerId);if(this._gesture){this._pointers.size<2&&(this._gesture=null),this._drag=null;return}let n=this._drag;if(this._drag=null,this._panning=!1,!(!n||!e)){if(n.moved){n.mode!=="pan"&&n.mode!=="click"&&(this._hover=null,this._draft?this._commit(this._draft):this._draft=null);return}this._click(n)}}_onPointerCancel(t){this._pointers.delete(t.pointerId),this._pointers.size<2&&(this._gesture=null),this._drag=null,this._draft=null,this._panning=!1}_onPointerLeave(){this._drag||(this._hover=null,this._hoverEdge=null)}_onWheel(t){t.preventDefault();let e=this._local(t);this._userView=!0;let n=t.deltaMode===1?.05:t.deltaMode===2?1:.0015;this._view=mu(this._view,e,Math.exp(-t.deltaY*n))}_onDblClick(){this._tool==="room"&&this._draw.length>=3&&this._finishRoom()}_updateHover(t){let e=this._tool;if(e==="room"||e==="freewall"){this._hover=this._snap(t,{extra:e==="room"?this._draw:[]});return}if(e==="wall"||e==="door"||e==="window"){let n=this._floorObj,s=n?La(n,t,this._edgeTolerance()):null,r=this._hoverEdge;if(!s&&!r||s&&r&&s.room_id===r.room_id&&s.edge===r.edge)return;this._hoverEdge=s}}_click(t){let e=this._floor,n=t.startP,s=t.hit,r=this._plan,o=de(r,e);switch(this._tool){case"select":if(s&&s.kind==="mid"){let a=ou(r,e,s.id,s.index,n);a.index!=null&&this._commit(a.plan,{kind:"corner",id:s.id,index:a.index})}else s||(this._sel=null);break;case"room":this._addDrawPoint(n);break;case"wall":{let a=La(o,n,this._edgeTolerance());this._sel=a?{kind:"edge",id:a.room_id,index:a.edge}:null;break}case"door":case"window":{if(s&&s.kind==="opening")break;let a=La(o,n,this._edgeTolerance());if(!a)break;let l=nm(r,e,a.room_id,a.edge,Us(a.along,Wn),this._tool);l.id&&this._commit(l.plan,{kind:"opening",id:l.id});break}case"freewall":{let a=this._snap(n);if(!this._wallStart)this._wallStart=a.point,this._sel=null;else{let l=sm(r,e,this._wallStart,a.point);this._wallStart=null,l.id&&this._commit(l.plan,{kind:"wall",id:l.id})}break}case"furniture":{if(s&&(s.kind==="furniture"||s.kind==="rot"))break;let a=Ra(n,Wn),l=rm(r,e,this._furnType,a[0],a[1]);l.id&&this._commit(l.plan,{kind:"furniture",id:l.id});break}case"background":{let a=this._calib;a&&(!a.p1||a.p2?this._calib={p1:n,p2:null,length:""}:this._calib={...a,p2:n});break}default:break}}_addDrawPoint(t){let e=this._draw,n=this._snap(t,{extra:e});if(e.length>=3&&(Yt(n.point,e[0])<.005||Yt(t,e[0])<=this._tolerance()*1.2)){this._finishRoom();return}e.length&&Yt(n.point,e[e.length-1])<.01||(this._draw=[...e,n.point])}_finishRoom(){let t=this._draw;if(t.length<3)return;let e=de(this._plan,this._floor),n=this._t("room_default_name",{n:e.rooms.length+1}),s=Kp(this._plan,this._floor,t,{name:n});this._draw=[],this._hover=null,s.id&&this._commit(s.plan,{kind:"room",id:s.id})}_onKey(t){let e=t.composedPath()[0],n=e&&e.tagName;if(n==="INPUT"||n==="SELECT"||n==="TEXTAREA"){t.key==="Escape"&&e.blur&&e.blur();return}let s=t.ctrlKey||t.metaKey,r=t.key.length===1?t.key.toLowerCase():t.key;if(s&&r==="z"){t.shiftKey?this._redo():this._undo(),t.preventDefault();return}if(s&&r==="y"){this._redo(),t.preventDefault();return}if(s||t.altKey)return;let o=n==="BUTTON"||n==="LABEL";switch(r){case"Escape":this._escape(),t.preventDefault();return;case"Enter":!o&&this._tool==="room"&&this._draw.length>=3&&(this._finishRoom(),t.preventDefault());return;case"Delete":case"Backspace":this._tool==="room"&&this._draw.length?this._draw=this._draw.slice(0,-1):this._deleteSelection(),t.preventDefault();return;case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"ArrowDown":{if(o)return;let a=t.shiftKey?.01:Wn,l={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[r];this._sel&&this._sel.kind!=="edge"?this._commit(am(this._plan,this._floor,this._sel,Zt(l,a))):(this._view={...this._view,tx:this._view.tx-l[0]*40,ty:this._view.ty-l[1]*40},this._userView=!0),t.preventDefault();return}case"+":case"=":this._zoom(1.25);return;case"-":this._zoom(.8);return;case"0":this._fit();return;case"l":this._measure=!this._measure;return;default:{let a=mm.find(l=>l.key.toLowerCase()===r);a&&(this._setTool(a.id),t.preventDefault())}}}_escape(){if(this._drag){this._drag=null,this._draft=null,this._panning=!1;return}if(this._draw.length){this._draw=[];return}if(this._wallStart){this._wallStart=null;return}if(this._calib){this._calib=null;return}this._sel=null}_deleteSelection(){let t=this._sel;if(!t||t.kind==="edge")return;let e=om(this._plan,this._floor,t);if(e===this._plan)return;let n=t.kind==="corner"?{kind:"room",id:t.id}:null;this._commit(e,n)}async _onUpload(t){let e=t.target,n=e.files&&e.files[0];if(e.value="",!!n)try{let s=await zM(n),r=await gm(s),o=s,a=r.naturalWidth||1e3,l=r.naturalHeight||750,c=3e3;if(r.naturalWidth&&(a>c||l>c||n.size>2e6)){let g=Math.min(1,c/Math.max(a,l)),_=document.createElement("canvas");_.width=Math.round(a*g),_.height=Math.round(l*g);let m=_.getContext("2d");m.fillStyle="#ffffff",m.fillRect(0,0,_.width,_.height),m.drawImage(r,0,0,_.width,_.height),o=_.toDataURL("image/jpeg",.85)}this._aspects.set(o,l/a);let h=de(this._plan,this._floor),d=h.background,u=jh(h.rooms.flatMap(g=>g.points)),f=d?{...d,image:o}:{image:o,x:u?u.x0:0,z:u?u.z0:0,width:u?Dt(Math.max(4,u.x1-u.x0)+1):10,rotation:0,opacity:.5};this._bgError=!1,this._commit(Pr(this._plan,this._floor,f),{kind:"background"}),u||(this._needFit=!0)}catch{this._bgError=!0}}render(){let t=this._floorObj,e=["canvas",`tool-${this._tool}`,this._calib?"calib":"",this._panning?"panning":""].join(" ");return Y`
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
    </div>`}_renderToolbar(){let t=Dr?"\u2318":"Ctrl+",e=Dr?"\u2318Z":"Ctrl+Z",n=Dr?"\u21E7\u2318Z":"Shift+Ctrl+Z",s=!this._floor;return Y`<div class="toolbar" role="toolbar" aria-label=${this._t("toolbar_label")}>
      ${mm.map(r=>Y`<button
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
        ?disabled=${!Ba(this._history)}
        title=${this._t("shortcut",{label:this._t("undo"),key:e})}
        aria-keyshortcuts=${Dr?"Meta+Z":"Control+Z"}
        @click=${()=>this._undo()}
      >
        ${pe("undo")}<span>${this._t("undo")}</span>
      </button>
      <button
        class="tool"
        ?disabled=${!Va(this._history)}
        title=${this._t("shortcut",{label:this._t("redo"),key:n})}
        aria-keyshortcuts=${Dr?"Shift+Meta+Z":"Shift+Control+Z"}
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
    </svg>`}_renderGrid(t){let{w:e,h:n}=this._size||{w:800,h:600},s=this._view,[r,o]=$i(s,[0,0]),[a,l]=$i(s,[e,n]),c=s.scale>=40?.25:s.scale>=12?1:5,h=c<1?1:5,d="",u="",f=(g,_)=>{let m="",p=Math.floor(r/g)*g,b=Math.floor(o/g)*g,x=0;for(let v=p;v<=a&&x<600;v+=g,x++){let C=Math.abs(v/h-Math.round(v/h))<1e-6;_===C&&(m+=`M${v} ${o}V${l}`)}x=0;for(let v=b;v<=l&&x<600;v+=g,x++){let C=Math.abs(v/h-Math.round(v/h))<1e-6;_===C&&(m+=`M${r} ${v}H${a}`)}return m};return d=f(c,!1),u=f(h,!0),Wt`<path class="grid-line" d=${d} stroke-width=${t} fill="none" pointer-events="none"></path>
      <path class="grid-major" d=${u} stroke-width=${t} fill="none" pointer-events="none"></path>`}_renderBackground(t,e){let n=t.background;if(!n||!n.image)return ft;let s=this._aspect(n.image),r=n.width||10,o=this._tool==="background"&&!this._calib;return Wt`<g transform="translate(${n.x||0} ${n.z||0}) rotate(${n.rotation||0})">
      <image class="bg-image ${o?"movable":""}" href=${n.image} x="0" y="0" width=${r} height=${r*s}
        opacity=${n.opacity??.5} preserveAspectRatio="none" pointer-events=${o?"all":"none"}
        data-hit=${o?"bg":ft}></image>
      ${this._tool==="background"?Wt`<rect class="bg-outline" x="0" y="0" width=${r} height=${r*s} pointer-events="none"></rect>`:ft}
    </g>`}_renderRooms(t){let e=this._sel;return t.rooms.map(n=>{let s=e&&(e.kind==="room"||e.kind==="corner"||e.kind==="edge")&&e.id===n.id;return Wt`<path class="room ${s?"selected":""}" d=${Hi(n.points)} data-hit="room" data-id=${n.id}></path>`})}_renderWalls(t,e){let n=$p(t,e),s=this._sel;return Wt`${n.map(r=>Wt`<path class="band ${r.kind}" d=${Hi(r.poly)} pointer-events="none"></path>`)}
      ${e.walls.map(r=>Wt`<path class="free-wall ${s&&s.kind==="wall"&&s.id===r.id?"selected":""}" d=${Hi(Hp(r))}
          data-hit="freewall" data-id=${r.id}></path>`)}`}_renderOpenings(t,e,n){let s=this._sel;return e.openings.map(r=>{let o=Gp(t,e,r);if(!o)return ft;let a=(u,f)=>[Bt(o.a,Zt(o.normal,u)),Bt(o.b,Zt(o.normal,u)),Bt(o.b,Zt(o.normal,f)),Bt(o.a,Zt(o.normal,f))],l=a(o.n0-n,o.n1+n),c=a(o.n0-6*n,o.n1+6*n),h=s&&s.kind==="opening"&&s.id===r.id,d;if(r.type==="door"){let u=Ea(re(o.closed,o.hinge),re(o.tip,o.hinge))>0?1:0;d=Wt`<line class="opening-line" x1=${o.hinge[0]} y1=${o.hinge[1]} x2=${o.tip[0]} y2=${o.tip[1]}></line>
          <path class="opening-arc" d="M${o.closed[0]} ${o.closed[1]}A${o.width} ${o.width} 0 0 ${u} ${o.tip[0]} ${o.tip[1]}"></path>`}else{let u=(o.n0+o.n1)/2,f=Bt(o.a,Zt(o.normal,u)),g=Bt(o.b,Zt(o.normal,u));d=Wt`<path class="window-pane" d=${Hi(a(o.n0,o.n1))}></path>
          <line class="opening-line" x1=${f[0]} y1=${f[1]} x2=${g[0]} y2=${g[1]}></line>`}return Wt`<g>
        <path class="opening-gap" d=${Hi(l)} pointer-events="none"></path>
        <g pointer-events="none">${d}</g>
        <path class="opening-hit ${h?"selected":""}" d=${Hi(c)} data-hit="opening" data-id=${r.id}></path>
      </g>`})}_renderFurniture(t,e){let n=this._sel;return t.furniture.map(s=>{let r=Ca(s),o=n&&n.kind==="furniture"&&n.id===s.id,a=this._t(`furn_${s.type}`),l=10*e,c=Math.min(s.w,s.d)/e>22&&Math.max(s.w,s.d)/e>a.length*6;return Wt`<g>
        <path class="item ${Wp(s)?"obstacle":""} ${o?"selected":""}" d=${Hi(r)} data-hit="furniture" data-id=${s.id}>
          <title>${a}</title>
        </path>
        ${c?Wt`<text class="label muted" x=${s.x} y=${s.z} font-size=${l} stroke-width=${2*e} text-anchor="middle" dominant-baseline="central">${a}</text>`:ft}
      </g>`})}_renderLabels(t,e){let n=[],s=12*e;for(let r of t.rooms){if(r.points.length<3)continue;let o=Dp(r.points);if(n.push(Wt`<text class="label" x=${o[0]} y=${o[1]} font-size=${s} stroke-width=${3*e} text-anchor="middle" font-weight="600">${r.name||r.id}</text>`),this._measure){n.push(Wt`<text class="label muted" x=${o[0]} y=${o[1]+s*1.3} font-size=${s*.9} stroke-width=${3*e} text-anchor="middle">${this._t("area_value",{v:this._n(Yh(r.points),2)})}</text>`);let a=di(r.points);for(let l=0;l<r.points.length;l++){let[c,h]=ue(r.points,l),d=Yt(c,h);if(d/e<36)continue;let u=Ar(c,h,a),f=Bt(ui(c,h,.5),Zt(u,11*e));n.push(Wt`<text class="label dim" x=${f[0]} y=${f[1]} font-size=${10*e} stroke-width=${3*e} text-anchor="middle" dominant-baseline="central">${this._n(d,2)}</text>`)}}}if(this._measure)for(let r of t.walls){let o=Yt(r.a,r.b);if(o/e<36)continue;let a=ui(r.a,r.b,.5);n.push(Wt`<text class="label dim" x=${a[0]} y=${a[1]-(r.thickness/2+8*e)} font-size=${10*e} stroke-width=${3*e} text-anchor="middle">${this._n(o,2)}</text>`)}return n}_handle(t,e,n,s="",r=ft){return Wt`<g>
      <circle class="handle ${s}" cx=${t[0]} cy=${t[1]} r=${NM*e} pointer-events="none"></circle>
      ${r}
      <circle class="handle-hit" cx=${t[0]} cy=${t[1]} r=${pm*e} data-hit=${n.kind} data-id=${n.id} data-index=${n.index??ft}></circle>
    </g>`}_renderSelection(t,e,n){let s=this._sel,r=[],o=this._tool;if(this._hoverEdge&&(o==="wall"||o==="door"||o==="window")){let a=e.rooms.find(l=>l.id===this._hoverEdge.room_id);if(a){let[l,c]=ue(a.points,this._hoverEdge.edge);r.push(Wt`<line class="edge-hover" x1=${l[0]} y1=${l[1]} x2=${c[0]} y2=${c[1]} pointer-events="none"></line>`)}}if(!s)return r;if(s.kind==="edge"){let a=e.rooms.find(l=>l.id===s.id);if(a){let[l,c]=ue(a.points,s.index);r.push(Wt`<line class="edge-selected" x1=${l[0]} y1=${l[1]} x2=${c[0]} y2=${c[1]} pointer-events="none"></line>`)}}if((s.kind==="room"||s.kind==="corner")&&o==="select"){let a=e.rooms.find(l=>l.id===s.id);if(a){for(let l=0;l<a.points.length;l++){let[c,h]=ue(a.points,l);if(Yt(c,h)/n<44)continue;let d=ui(c,h,.5),u=3*n,f=Wt`<path class="handle-plus" d="M${d[0]-u} ${d[1]}H${d[0]+u}M${d[0]} ${d[1]-u}V${d[1]+u}"></path>`;r.push(this._handle(d,n,{kind:"mid",id:a.id,index:l},"add",f))}a.points.forEach((l,c)=>{let h=s.kind==="corner"&&s.index===c;r.push(this._handle(l,n,{kind:"corner",id:a.id,index:c},h?"active":""))})}}if(s.kind==="furniture"&&(o==="select"||o==="furniture")){let a=e.furniture.find(l=>l.id===s.id);if(a){let l=[a.x,a.z],c=Bt(l,Ls([0,-a.d/2],a.rotation||0)),h=Bt(l,Ls([0,-a.d/2-24*n],a.rotation||0));r.push(Wt`<line class="rot-line" x1=${c[0]} y1=${c[1]} x2=${h[0]} y2=${h[1]} pointer-events="none"></line>`),r.push(this._handle(h,n,{kind:"rot",id:a.id},"",Wt`<title>${this._t("rotate_handle")}</title>`))}}if(s.kind==="wall"&&(o==="select"||o==="freewall")){let a=e.walls.find(l=>l.id===s.id);a&&(r.push(this._handle(a.a,n,{kind:"wallend",id:a.id,index:0})),r.push(this._handle(a.b,n,{kind:"wallend",id:a.id,index:1})))}return r}_renderPreview(t){let e=[],n=this._hover;if(n&&n.kind!=="grid"&&n.kind!=="none"){let r=7*t,o=n.point;e.push(n.kind==="vertex"?Wt`<rect class="snap-mark" x=${o[0]-r} y=${o[1]-r} width=${2*r} height=${2*r}></rect>`:Wt`<path class="snap-mark" d="M${o[0]} ${o[1]-r}L${o[0]+r} ${o[1]}L${o[0]} ${o[1]+r}L${o[0]-r} ${o[1]}Z"></path>`)}if(this._tool==="room"&&this._draw.length){let r=this._draw,o=n?n.point:null,a=o?[...r,o]:r;if(e.push(Wt`<path class="draft-line" d=${"M"+a.map(l=>`${l[0]} ${l[1]}`).join("L")} pointer-events="none"></path>`),r.forEach((l,c)=>e.push(Wt`<circle class="draft-point" cx=${l[0]} cy=${l[1]} r=${(c===0?6:4)*t} pointer-events="none"></circle>`)),o){let l=r[r.length-1],c=ui(l,o,.5);e.push(Wt`<text class="label dim" x=${c[0]} y=${c[1]-8*t} font-size=${11*t} stroke-width=${3*t} text-anchor="middle">${this._t("length_value",{v:this._n(Yt(l,o),2)})}</text>`)}}if(this._tool==="freewall"&&this._wallStart){let r=this._wallStart;if(e.push(Wt`<circle class="draft-point" cx=${r[0]} cy=${r[1]} r=${4*t} pointer-events="none"></circle>`),n){let o=n.point;e.push(Wt`<path class="draft-line" d="M${r[0]} ${r[1]}L${o[0]} ${o[1]}" pointer-events="none"></path>`);let a=ui(r,o,.5);e.push(Wt`<text class="label dim" x=${a[0]} y=${a[1]-8*t} font-size=${11*t} stroke-width=${3*t} text-anchor="middle">${this._t("length_value",{v:this._n(Yt(r,o),2)})}</text>`)}}let s=this._calib;return s&&s.p1&&(e.push(Wt`<circle class="calib-point" cx=${s.p1[0]} cy=${s.p1[1]} r=${5*t} pointer-events="none"></circle>`),s.p2&&(e.push(Wt`<line class="calib-line" x1=${s.p1[0]} y1=${s.p1[1]} x2=${s.p2[0]} y2=${s.p2[1]} pointer-events="none"></line>`),e.push(Wt`<circle class="calib-point" cx=${s.p2[0]} cy=${s.p2[1]} r=${5*t} pointer-events="none"></circle>`))),e}_hint(){switch(this._tool){case"room":return this._t("hint_room");case"wall":return this._t("hint_wall");case"door":return this._t("hint_door");case"window":return this._t("hint_window");case"freewall":return this._t(this._wallStart?"hint_freewall_second":"hint_freewall");case"furniture":return this._t("hint_furniture");case"background":return this._calib?this._t(this._calib.p1&&!this._calib.p2?"bg_calib_second":this._calib.p2?"bg_calib_length":"bg_calib_first"):this._t("hint_background");default:return this._t("hint_select")}}_renderPanel(t,e){if(!e)return Y`<p class="hint">${this._t("no_floor")}</p>`;let n=this._sel,s=[Y`<p class="hint">${this._hint()}</p>`];if(this._tool==="room"&&this._draw.length&&s.push(Y`<div class="actions">
        <button class="primary" ?disabled=${this._draw.length<3} @click=${()=>this._finishRoom()}>${pe("check")}<span>${this._t("room_finish")}</span></button>
        <button @click=${()=>this._draw=this._draw.slice(0,-1)}>${this._t("room_undo_point")}</button>
        <button @click=${()=>this._draw=[]}>${this._t("cancel")}</button>
      </div>`),this._tool==="freewall"&&this._wallStart&&s.push(Y`<div class="actions"><button @click=${()=>this._wallStart=null}>${this._t("cancel")}</button></div>`),this._tool==="furniture"&&s.push(this._furnitureTypeSelect(this._t("furniture_new_type"),this._furnType,r=>this._furnType=r)),this._tool==="background")return s.push(this._renderBackgroundPanel(e)),s;if(!n)return this._tool==="select"&&s.push(this._renderFloorPanel(e)),s;switch(n.kind){case"room":case"corner":s.push(this._renderRoomPanel(e,n));break;case"edge":s.push(this._renderEdgePanel(t,e,n));break;case"opening":s.push(this._renderOpeningPanel(e,n));break;case"wall":s.push(this._renderFreeWallPanel(e,n));break;case"furniture":s.push(this._renderFurniturePanel(e,n));break;default:break}return s}_num(t,e,n,s={}){let{digits:r=2,allowEmpty:o=!1,min:a=null,max:l=null,placeholder:c=""}=s,h=e==null?"":this._n(e,r);return Y`<label class="field"
      ><span>${t}</span>
      <input
        type="text"
        inputmode="decimal"
        autocomplete="off"
        .value=${ve(h)}
        placeholder=${c}
        @keydown=${d=>d.key==="Enter"&&d.target.blur()}
        @change=${d=>{let u=Sa(d.target.value);u===null&&o?n(null):u!==null&&Number.isFinite(u)&&(a==null||u>=a)&&(l==null||u<=l)&&n(u),d.target.value=h,this.requestUpdate()}}
    /></label>`}_text(t,e,n,s=""){return Y`<label class="field"
      ><span>${t}</span>
      <input
        type="text"
        autocomplete="off"
        spellcheck="false"
        .value=${ve(e||"")}
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
        ${Object.entries(Ua).map(([s,r])=>Y`<optgroup label=${this._t(`group_${s}`)}>
            ${r.map(o=>Y`<option value=${o} ?selected=${o===e}>${this._t(`furn_${o}`)}</option>`)}
          </optgroup>`)}
      </select></label
    >`}_renderFloorPanel(t){let e=t.id,n=this.floors||[],s=r=>this._commit(Yp(this._plan,e,r));return Y`<h3>${this._t("floor_settings")}</h3>
      ${this._text(this._t("floor_name"),t.name,r=>s({name:r||t.id}))}
      ${this._select(this._t("floor_ha"),t.ha_floor||"",[{value:"",label:this._t("none")},...n.map(r=>({value:r.floor_id,label:r.name||r.floor_id}))],r=>{let o={ha_floor:r||null},a=n.find(c=>c.floor_id===r),l=!t.name||t.name===t.id||/^(Floor|Etage) \d+$/.test(t.name);a&&l&&(o.name=a.name),s(o)})}
      <div class="row">
        ${this._num(this._t("floor_height"),t.height??ks,r=>s({height:Dt(r)}),{min:1,max:20})}
        ${this._num(this._t("floor_elevation"),t.elevation??0,r=>s({elevation:Dt(r)}),{min:-50,max:500})}
      </div>
      ${this._confirmDelete?Y`<p class="hint">${this._t("floor_delete_confirm")}</p>
            <div class="actions">
              <button class="danger" @click=${()=>this._deleteFloor()}>${pe("trash")}<span>${this._t("delete")}</span></button>
              <button @click=${()=>this._confirmDelete=!1}>${this._t("keep")}</button>
            </div>`:Y`<div class="actions">
            <button class="danger" @click=${()=>this._confirmDelete=!0}>${pe("trash")}<span>${this._t("floor_delete")}</span></button>
          </div>`}`}_renderRoomPanel(t,e){let n=t.id,s=Ie(t,e.id);if(!s)return ft;let r=this.areas||[],o=l=>this._commit(Jp(this._plan,n,s.id,l)),a=e.kind==="corner"?s.points[e.index]:null;return Y`<h3>${this._t("room")}</h3>
      ${this._text(this._t("room_name"),s.name,l=>o({name:l||s.id}))}
      ${this._select(this._t("room_area_ha"),s.area_id||"",[{value:"",label:this._t("none")},...r.map(l=>({value:l.area_id,label:l.name||l.area_id}))],l=>{let c={area_id:l||null},h=r.find(u=>u.area_id===l),d=!s.name||s.name===s.id||/^(Room|Raum) \d+$/.test(s.name);h&&d&&(c.name=h.name),o(c)})}
      ${this._num(this._t("room_ceiling"),s.ceiling_height??null,l=>o({ceiling_height:l==null?null:Dt(l)}),{allowEmpty:!0,min:1,max:20,placeholder:this._n(t.height??ks,2)})}
      <div class="field">
        <span>${this._t("room_size")}</span>
        <span class="value">${this._t("area_value",{v:this._n(Yh(s.points),2)})}</span>
      </div>
      ${a?Y`<h3>${this._t("corner",{n:e.index+1})}</h3>
            <div class="row">
              ${this._num(this._t("pos_x"),a[0],l=>this._commit(Rr(this._plan,n,s.id,e.index,[l,a[1]])),{digits:3})}
              ${this._num(this._t("pos_z"),a[1],l=>this._commit(Rr(this._plan,n,s.id,e.index,[a[0],l])),{digits:3})}
            </div>
            <div class="actions">
              <button ?disabled=${s.points.length<=3} @click=${()=>this._deleteSelection()}>${pe("trash")}<span>${this._t("corner_delete")}</span></button>
            </div>
            ${s.points.length<=3?Y`<p class="hint">${this._t("corner_min")}</p>`:ft}`:ft}
      <div class="actions">
        <button class="danger" @click=${()=>this._commit(ru(this._plan,n,s.id),null)}>${pe("trash")}<span>${this._t("room_delete")}</span></button>
      </div>`}_renderEdgePanel(t,e,n){let s=e.id,r=Ie(e,n.id),o=r&&eu(t,e,r.id,n.index);if(!o)return ft;let a=o.neighbours.map(h=>(Ie(e,h)||{}).name||h).join(", "),l={wall_exterior:.24,wall_interior:.12,...t.settings||{}},c=o.shared?l.wall_interior:l.wall_exterior;return Y`<h3>${this._t("wall")} · ${r.name||r.id}</h3>
      <div class="field">
        <span>${this._t("wall_length")}</span><span class="value">${this._t("length_value",{v:this._n(o.length,2)})}</span>
      </div>
      <p class="hint">${o.shared?this._t("wall_interior",{rooms:a}):this._t("wall_exterior")}</p>
      ${o.partial.length?Y`<p class="hint">${this._t("wall_partial",{rooms:o.partial.map(h=>(Ie(e,h)||{}).name||h).join(", ")})}</p>`:ft}
      ${this._num(this._t("wall_thickness"),o.thickness,h=>this._commit(lu(this._plan,s,r.id,n.index,h)),{digits:3,min:.01,max:2,allowEmpty:!0})}
      <div class="actions">
        <button ?disabled=${o.stored==null} @click=${()=>this._commit(lu(this._plan,s,r.id,n.index,null))}>
          ${this._t("wall_reset")}
        </button>
        <span class="hint">${this._t("wall_default",{v:this._n(c,3)})}</span>
      </div>
      <label class="check">
        <input type="checkbox" .checked=${ve(o.noWall)} @change=${h=>this._commit(em(this._plan,s,r.id,n.index,h.target.checked))} />
        <span>${this._t("wall_none")}</span>
      </label>`}_renderOpeningPanel(t,e){let n=t.id,s=t.openings.find(l=>l.id===e.id);if(!s)return ft;let r=Ie(t,s.room_id),o=l=>this._commit(ka(this._plan,n,s.id,l)),a=s.type==="door";return Y`<h3>${this._t(a?"opening_door":"opening_window")}</h3>
      ${this._select(this._t("opening_type"),s.type,[{value:"door",label:this._t("opening_door")},{value:"window",label:this._t("opening_window")}],l=>o({type:l,...Na[l],width:s.width,hinge:s.hinge,swing:s.swing}))}
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
        <button class="danger" @click=${()=>this._commit(cu(this._plan,n,s.id),null)}>${pe("trash")}<span>${this._t("opening_delete")}</span></button>
      </div>`}_renderFreeWallPanel(t,e){let n=t.id,s=t.walls.find(o=>o.id===e.id);if(!s)return ft;let r=o=>this._commit(Fa(this._plan,n,s.id,o));return Y`<h3>${this._t("freewall")}</h3>
      <div class="field">
        <span>${this._t("wall_length")}</span><span class="value">${this._t("length_value",{v:this._n(Yt(s.a,s.b),2)})}</span>
      </div>
      <div class="row">
        ${this._num(this._t("thickness"),s.thickness,o=>r({thickness:Dt(o)}),{digits:3,min:.01,max:5})}
        ${this._num(this._t("freewall_height"),s.height??null,o=>r({height:o==null?null:Dt(o)}),{allowEmpty:!0,min:.05,max:20,placeholder:this._n(t.height??ks,2)})}
      </div>
      <div class="actions">
        <button class="danger" @click=${()=>this._commit(uu(this._plan,n,s.id),null)}>${pe("trash")}<span>${this._t("freewall_delete")}</span></button>
      </div>`}_renderFurniturePanel(t,e){let n=t.id,s=t.furniture.find(o=>o.id===e.id);if(!s)return ft;let r=o=>this._commit(Cr(this._plan,n,s.id,o));return Y`<h3>${this._t("furniture")}</h3>
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
        <button class="danger" @click=${()=>this._commit(du(this._plan,n,s.id),null)}>${pe("trash")}<span>${this._t("furniture_delete")}</span></button>
      </div>`}_renderBackgroundPanel(t){let e=t.id,n=t.background,s=Y`<label class="file">
      ${pe("upload")}<span>${this._t(n?"bg_replace":"bg_upload")}</span>
      <input class="visually-hidden" type="file" accept="image/*" @change=${c=>this._onUpload(c)} />
    </label>`,r=this._bgError?Y`<p class="hint" role="alert">${this._t("bg_error")}</p>`:ft;if(!n)return Y`<p class="hint">${this._t("bg_none")}</p><div class="actions">${s}</div>${r}`;let o=c=>this._commit(Ir(this._plan,e,c)),a=this._calib,l;if(!a)l=Y`<button @click=${()=>this._calib={p1:null,p2:null,length:""}}>${pe("ruler")}<span>${this._t("bg_calibrate")}</span></button>`;else if(a.p1&&a.p2){let c=Yt(a.p1,a.p2);l=Y`<p class="hint">${this._t("bg_calib_measured",{v:this._n(c,2)})}</p>
        <label class="field"
          ><span>${this._t("bg_calib_length")}</span>
          <input
            type="text"
            inputmode="decimal"
            autocomplete="off"
            .value=${ve(a.length)}
            @input=${h=>this._calib={...this._calib,length:h.target.value}}
            @keydown=${h=>h.key==="Enter"&&this._applyCalibration()}
        /></label>
        <div class="actions">
          <button class="primary" ?disabled=${!(Sa(a.length)>0)} @click=${()=>this._applyCalibration()}>${this._t("bg_calib_apply")}</button>
          <button @click=${()=>this._calib=null}>${this._t("cancel")}</button>
        </div>`}else l=Y`<div class="actions"><button @click=${()=>this._calib=null}>${this._t("cancel")}</button></div>`;return Y`<p class="hint">${this._t("bg_move_hint")}</p>
      <label class="field"
        ><span>${this._t("bg_opacity")} · ${Math.round((n.opacity??.5)*100)} %</span>
        <input
          type="range"
          min="0.05"
          max="1"
          step="0.05"
          .value=${ve(String(n.opacity??.5))}
          @input=${c=>this._draft=Ir(this._plan,e,{opacity:Number(c.target.value)})}
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
        <button class="danger" @click=${()=>this._commit(Pr(this._plan,e,null),null)}>${pe("trash")}<span>${this._t("bg_remove")}</span></button>
      </div>
      ${r}`}_applyCalibration(){let t=this._calib,e=Sa(t&&t.length),n=de(this._plan,this._floor);if(!t||!t.p1||!t.p2||!(e>0)||!n.background)return;let s=Op(n.background,t.p1,t.p2,e);this._calib=null,this._commit(Pr(this._plan,this._floor,s),{kind:"background"})}};customElements.get("pp-editor")||customElements.define("pp-editor",$a);var zs=Math.PI/180;function _m(i,t){let e=!1;for(let n=0,s=t.length-1;n<t.length;s=n++){let[r,o]=t[n],[a,l]=t[s];o>i[1]!=l>i[1]&&i[0]<(a-r)*(i[1]-o)/(l-o)+r&&(e=!e)}return e}function gu(i,t,e){let n=(i&&i.rooms||[]).find(s=>_m([t,e],s.points));return n?n.id:null}function BM(i,t,e){let n=e[0]-t[0],s=e[1]-t[1],r=n*n+s*s;if(r<1e-12)return{d:Math.hypot(i[0]-t[0],i[1]-t[1]),t:0};let o=Math.max(0,Math.min(1,((i[0]-t[0])*n+(i[1]-t[1])*s)/r));return{d:Math.hypot(i[0]-t[0]-n*o,i[1]-t[1]-s*o),t:o}}function xm(i,t,{maxDist:e=.4,inset:n=.03,endGap:s=.04}={}){let r=null;for(let o of i||[]){let a=o.b[0]-o.a[0],l=o.b[1]-o.a[1],c=Math.hypot(a,l);if(c<1e-6)continue;let h=((t[0]-o.a[0])*a+(t[1]-o.a[1])*l)/(c*c),d=Math.min(.5,s/c);h=Math.max(d,Math.min(1-d,h));let u=o.a[0]+a*h,f=o.a[1]+l*h,g=Math.hypot(t[0]-u,t[1]-f);if(!r||g<r.d){let _=o.n||[0,0];r={d:g,x:u+_[0]*n,z:f+_[1]*n,along:[h*c,(1-h)*c],phi:vm(Math.atan2(_[1],_[0])/zs),room:o.room}}}return r&&r.d<=e?r:null}var vm=i=>(i%360+360)%360;function ym(i,t,e,n,s=0){let r=Math.atan2(n-t,e-i)/zs;return s&&(r=Math.round(r/s)*s),vm(Math.round(r*10)/10)}function bm(i,t,e,n=8){let s=Math.max(.1,i.x1-i.x0),r=Math.max(.1,i.z1-i.z0),o=Math.max(1,Math.min((t-2*n)/s,(e-2*n)/r)),a=(t-s*o)/2-i.x0*o,l=(e-r*o)/2-i.z0*o;return{scale:o,ox:a,oy:l,sx:c=>c*o+a,sz:c=>c*o+l,wx:c=>(c-a)/o,wz:c=>(c-l)/o}}var VM=.75;function _u(i,t){let e=t.phi*zs,n=Math.max(28,VM*i.scale);return[i.sx(t.x)+Math.cos(e)*n,i.sz(t.z)+Math.sin(e)*n]}function xu(i,t,e,n,{handleR:s=12,dotR:r=15}={}){let o=[...t||[]].reverse();for(let a of o){if(a.mount==="ceiling")continue;let[l,c]=_u(i,a);if(Math.hypot(e-l,n-c)<=s)return{entity_id:a.entity_id,mode:"rotate"}}for(let a of o)if(Math.hypot(e-i.sx(a.x),n-i.sz(a.z))<=r)return{entity_id:a.entity_id,mode:"move"};return null}function Mm(i,t=24){let e=i.reach||0;if(i.mount==="ceiling"){let o=Math.min(89,(i.fov_h||120)/2)*zs,a=Math.min(e,Math.max(.2,(i.height||2.5)*Math.tan(o))),l=[];for(let c=0;c<t*2;c++){let h=c/(t*2)*2*Math.PI;l.push([i.x+Math.cos(h)*a,i.z+Math.sin(h)*a])}return l}let n=e*Math.cos(Math.min(80,i.tilt||0)*zs),s=Math.min(180,(i.fov_h||120)/2),r=s>=180?[]:[[i.x,i.z]];for(let o=0;o<=t;o++){let a=(i.phi-s+2*s*o/t)*zs;r.push([i.x+Math.cos(a)*n,i.z+Math.sin(a)*n])}return r}function Ha(i,t=.2){let e=i.map(h=>h[0]),n=i.map(h=>h[1]),s=Math.min(...e),r=Math.max(...e),o=Math.min(...n),a=Math.max(...n),l=Math.max(t,Math.min(r-s,a-o)/40),c=null;for(let h=s+l/2;h<r;h+=l)for(let d=o+l/2;d<a;d+=l){if(!_m([h,d],i))continue;let u=1/0;for(let f=0;f<i.length;f++)u=Math.min(u,BM([h,d],i[f],i[(f+1)%i.length]).d);(!c||u>c.m)&&(c={x:h,z:d,m:u})}return c||{x:e.reduce((h,d)=>h+d,0)/e.length,z:n.reduce((h,d)=>h+d,0)/n.length,m:0}}function wm(i){if(i&&i.bounds)return i.bounds;let t=(i&&i.rooms||[]).flatMap(s=>s.points);if(!t.length)return{x0:0,x1:1,z0:0,z1:1};let e=t.map(s=>s[0]),n=t.map(s=>s[1]);return{x0:Math.min(...e)-.4,x1:Math.max(...e)+.4,z0:Math.min(...n)-.4,z1:Math.max(...n)+.4}}function vu(i,t,e){let n=Math.hypot(t[0]-i[0],t[1]-i[1])||1,s=-(t[1]-i[1])/n*e,r=(t[0]-i[0])/n*e;return[[i[0]+s,i[1]+r],[t[0]+s,t[1]+r],[t[0]-s,t[1]-r],[i[0]-s,i[1]-r]]}function yu(i,t,e){return gu(i,t,e)!==null}var bu={light:["#1f7a4d","#1f5f99","#8a4b9c","#c06a14","#56616b","#b23a6f","#2f7f8f","#7a6a12"],dark:["#43b37b","#5a9be0","#c08bd2","#eb9a45","#9aa6b1","#e07aa8","#5cc3d3","#d4c04a"]};function Sm(i,t){let e=bu[t?"dark":"light"],n={};return(i||[]).forEach((s,r)=>{n[s.entity_id]=e[r%e.length]}),n}function Mu(i,t){let e=String(i||"").trim(),n=e.match(/^#([0-9a-f]{3})$/i);if(n){let[s,r,o]=n[1].split("").map(a=>parseInt(a+a,16));return`rgba(${s},${r},${o},${t})`}if(n=e.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i),n){let s=parseInt(n[1],16);return`rgba(${s>>16&255},${s>>8&255},${s&255},${t})`}return n=e.match(/^rgba?\(([^)]+)\)$/i),n?`rgba(${n[1].split(/[\s,/]+/).filter(Boolean).slice(0,3).join(",")},${t})`:e}var Bs=[.5,.9,1.3],$M=["occupancy","presence","motion"],Xa=["wall","corner","ceiling"],Em=["open","closed","live"],Am=["2d","3d","split"],qa=90,wu=.15,Ur={height:[.2,4,2],tilt:[0,90,0],phi:[0,359,0],fov_h:[10,360,0],fov_v:[10,180,0],reach:[.5,15,1],x:[-1e3,1e3,3],z:[-1e3,1e3,3]},Ga={wall:{height:1.9,tilt:10},corner:{height:1.9,tilt:10},ceiling:{height:2.5,tilt:90}},Gi=(i,t)=>{let e=10**t;return Math.round(i*e)/e},HM=(i,t,e)=>Math.min(e,Math.max(t,i)),Wa=i=>(Math.round(+i||0)%360+360)%360;function Tm(i,t){if(i==="phi")return Number.isFinite(+t)?Wa(t):void 0;let e=Ur[i];if(!e)return t;let n=+t;if(!(t===""||t===null||!Number.isFinite(n)))return Gi(HM(n,e[0],e[1]),e[2])}function Nr(i){return i?Array.isArray(i)?i:Array.isArray(i.profiles)?i.profiles:Object.entries(i).filter(([,t])=>t&&typeof t=="object"&&t.name).map(([t,e])=>({id:t,...e})):[]}function Or(i){let t=Nr(i);return{version:1,default_fov_v:i&&!Array.isArray(i)&&i.default_fov_v?i.default_fov_v:qa,profiles:t}}function Vs(i,t){let e=Nr(i);return e.find(n=>n.id===t)||e.find(n=>n.id==="custom")||null}function Su(i,t,e=qa){return i?t==="ceiling"&&i.ceiling?{fov_h:i.ceiling.fov,fov_v:i.ceiling.fov,reach:i.ceiling.reach}:{fov_h:i.fov_h,fov_v:i.fov_v==null?e:i.fov_v,reach:i.reach}:{fov_h:120,fov_v:e,reach:6}}function Rm(){return{loading:!0,error:null,source:null,revision:null,plan:null,editPlan:null,planDirty:!1,savedSensors:[],sensors:[],profiles:null,options:{},neonplan:{installed:!1,version:null,linked:!1},deviceProfiles:{},floorId:null,selected:null,dirty:!1,remoteChanged:!1,height:1.3,doorsMode:"open",thinDb:10,weight:1,snap:!0,cones:!0,view:"split",tab:"planner"}}var Lr=i=>i===void 0?i:JSON.parse(JSON.stringify(i));function Cm(i,t){let e=t.plan||null,n=e&&e.floors||[],s=n.some(l=>l.id===i.floorId)?i.floorId:n[0]?n[0].id:null,r=(t.sensors||[]).map(l=>({...l})),o=t.options||{},a=r.some(l=>l.entity_id===i.selected)?i.selected:(r.find(l=>l.floor_id===s)||{}).entity_id||null;return{...i,loading:!1,error:null,source:t.source||"own",revision:t.revision===void 0?null:t.revision,plan:e,editPlan:Lr(e),planDirty:!1,savedSensors:Lr(r),sensors:r,profiles:t.profiles||i.profiles,options:o,neonplan:{installed:!1,version:null,linked:!1,...t.neonplan||{}},floorId:s,selected:a,dirty:!1,remoteChanged:!1,thinDb:typeof o.thin_db=="number"&&!i.thinTouched?o.thin_db:i.thinDb,tab:t.source==="neonplan"&&i.tab==="editor"?"planner":i.tab}}function Pm(i,t){return t!==void 0&&t===i.revision?{state:i,reload:!1}:i.dirty||i.planDirty?{state:{...i,remoteChanged:!0},reload:!1}:{state:i,reload:!0}}var $s=i=>(i.plan&&i.plan.floors||[]).find(t=>t.id===i.floorId)||null,Xn=i=>i.sensors.filter(t=>t.floor_id===i.floorId),qn=(i,t)=>i.sensors.find(e=>e.entity_id===t)||null;function kr(i,t,e){let n=!1,s=i.sensors.map(r=>{if(r.entity_id!==t)return r;let o={...r};for(let[a,l]of Object.entries(e)){let c=a in Ur?Tm(a,l):l;c!==void 0&&o[a]!==c&&(o[a]=c,n=!0)}return o});return n?{...i,sensors:s,dirty:!0}:i}function Im(i,t,e){let n=qn(i,t),s=Vs(i.profiles,e);if(!n||!s)return i;let r=s.mounts&&s.mounts.length&&!s.mounts.includes(n.mount)?s.mounts[0]:n.mount,o=Or(i.profiles).default_fov_v;return kr(i,t,{profile:s.id,mount:r,...Su(s,r,o)})}function Dm(i,t,e,n){let s=qn(i,t);if(!s||!Xa.includes(e))return i;let r=Vs(i.profiles,s.profile),o=Or(i.profiles).default_fov_v,a=e==="ceiling"?{height:n||Ga.ceiling.height,tilt:90}:s.mount==="ceiling"?{...Ga[e]}:{},l=e==="ceiling"!=(s.mount==="ceiling")?Su(r,e,o):{};return kr(i,t,{mount:e,...a,...l})}function Lm(i,{floorId:t,x:e,z:n,profileId:s,profiles:r,phi:o=0}){let a=Vs(r,s),l=a&&a.mounts&&a.mounts.length?a.mounts[0]:"wall";return{entity_id:i,floor_id:t,x:Gi(e,3),z:Gi(n,3),height:Ga[l].height,phi:Wa(o),tilt:Ga[l].tilt,mount:l,profile:a?a.id:"custom",...Su(a,l,Or(r).default_fov_v),active:!0}}function Um(i,t){return qn(i,t.entity_id)?i:{...i,sensors:[...i.sensors,t],selected:t.entity_id,dirty:!0}}function Nm(i,t){if(!qn(i,t))return i;let e=i.sensors.filter(s=>s.entity_id!==t),n=i.selected===t?(e.find(s=>s.floor_id===i.floorId)||{}).entity_id||null:i.selected;return{...i,sensors:e,selected:n,dirty:!0}}function Om(i){let t=Lr(i.savedSensors),e=t.some(n=>n.entity_id===i.selected)?i.selected:null;return{...i,sensors:t,editPlan:Lr(i.plan),dirty:!1,planDirty:!1,selected:e}}function km(i,t){return{...i,editPlan:t,planDirty:!0}}function Fm(i,t){return{...i,savedSensors:Lr(i.sensors),dirty:!1,revision:t===void 0?i.revision:t}}function zm(i){return i.sensors.map(t=>{let e={...t};for(let n of Object.keys(Ur))typeof e[n]=="number"&&(e[n]=Tm(n,e[n]));return delete e.fov_v_assumed,e})}function GM(i,t,e){if(i!=="live")return i==="closed"?"closed":"open";let n={};for(let s of t&&t.openings||[]){if(s.type==="window")continue;let r=s.contact&&e?e[s.contact]:null;n[s.id]=!(r&&r.state==="off")}return n}function Ya(i,t,{fast:e=!1,grid:n=!0}={}){return{heights:e?[i.height]:Bs.slice(),doors:GM(i.doorsMode,$s(i),t),thin_db:i.thinDb,cell:e?.2:.1,grid:n}}function Za(i,t){let e=new Set((t||[]).map(n=>typeof n=="string"?n:n.entity_id));return Object.entries(i||{}).filter(([n,s])=>n.startsWith("binary_sensor.")&&!e.has(n)&&s&&s.attributes&&$M.includes(s.attributes.device_class)).map(([n,s])=>({entity_id:n,name:s.attributes.friendly_name||n})).sort((n,s)=>n.name.localeCompare(s.name))}function Bm(i,t,e=!1){if(!i)return null;let n=e?.01:.05,s=e?1:5;switch(t){case"ArrowLeft":return{x:Gi(i.x-n,3)};case"ArrowRight":return{x:Gi(i.x+n,3)};case"ArrowUp":return{z:Gi(i.z-n,3)};case"ArrowDown":return{z:Gi(i.z+n,3)};case"q":case"Q":return{phi:Wa(i.phi-s)};case"e":case"E":return{phi:Wa(i.phi+s)};default:return null}}function Vm(i,t,e){return e?kr(i,t,{x:e.x,z:e.z,height:e.height,phi:e.phi,tilt:e.tilt,mount:e.mount||"wall"}):i}var $m=i=>!!(i.neonplan&&i.neonplan.installed&&!i.neonplan.linked),Ka=i=>i.source==="own";function Ja(i,t,e){let n=Xn(i),s=n.find(o=>o.entity_id===i.selected);if(s&&e(s)===t)return s.entity_id;let r=n.find(o=>e(o)===t);return r?r.entity_id:s?s.entity_id:null}var Eu=class extends Ge{static properties={model:{attribute:!1},sensors:{attribute:!1},evaluation:{attribute:!1},colors:{attribute:!1},names:{attribute:!1},height:{type:Number},cell:{type:Number},selected:{type:String},dark:{type:Boolean},cones:{type:Boolean},snap:{type:Boolean},readonly:{type:Boolean},t:{attribute:!1}};static styles=Tn`
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
    </div>`}firstUpdated(){this._canvas=this.renderRoot.querySelector("canvas"),this._ro=new ResizeObserver(()=>this._resize()),this._ro.observe(this.renderRoot.querySelector(".wrap")),this._resize()}disconnectedCallback(){super.disconnectedCallback(),this._ro&&this._ro.disconnect(),cancelAnimationFrame(this._raf)}connectedCallback(){super.connectedCallback(),this._ro&&this.renderRoot.querySelector(".wrap")&&this._ro.observe(this.renderRoot.querySelector(".wrap"))}updated(){this._schedule()}_schedule(){cancelAnimationFrame(this._raf),this._raf=requestAnimationFrame(()=>this._draw())}_resize(){let t=this.renderRoot.querySelector(".wrap");if(!t||!this._canvas)return;let e=Math.max(200,t.clientWidth),n=Math.max(200,t.clientHeight),s=window.devicePixelRatio||1;e===this._w&&n===this._h&&s===this._dpr||(this._w=e,this._h=n,this._dpr=s,this._canvas.width=Math.round(e*s),this._canvas.height=Math.round(n*s),this._draw())}get _vp(){return bm(wm(this.model),this._w,this._h,12)}_palette(){let t=getComputedStyle(this),e=(n,s)=>(t.getPropertyValue(n)||"").trim()||s;return{ink:e("--primary-text-color",this.dark?"#e1e1e1":"#212121"),muted:e("--secondary-text-color",this.dark?"#9b9b9b":"#727272"),floor:e("--card-background-color",this.dark?"#1c1c1c":"#ffffff"),line:e("--divider-color",this.dark?"#3a3a3a":"#cccccc"),spill:e("--error-color","#db4437"),accent:e("--primary-color","#03a9f4"),glass:this.dark?"#62a9ee":"#3b86cf"}}_rgba(t,e){let n=Mu(t,e);if(n.startsWith("rgba"))return n;let s=this._cc||(this._cc=document.createElement("canvas").getContext("2d"));return s.fillStyle="#000",s.fillStyle=t,Mu(s.fillStyle,e)}_path(t,e,n){t.beginPath(),n.forEach((s,r)=>r?t.lineTo(e.sx(s[0]),e.sz(s[1])):t.moveTo(e.sx(s[0]),e.sz(s[1]))),t.closePath()}_poly(t,e,n,s,r,o=1){this._path(t,e,n),s&&(t.fillStyle=s,t.fill()),r&&(t.strokeStyle=r,t.lineWidth=o,t.stroke())}_roomLabels(){if(this._labelModel!==this.model){this._labelModel=this.model,this._labels={};for(let t of this.model&&this.model.rooms||[])this._labels[t.id]=Ha(t.points)}return this._labels}_draw(){let t=this._canvas&&this._canvas.getContext("2d");if(!t||!this._w)return;let e=this._palette();t.setTransform(this._dpr,0,0,this._dpr,0,0),t.clearRect(0,0,this._w,this._h);let n=this.model;if(!n)return;let s=this._vp,r=s.scale;for(let u of n.rooms||[])this._poly(t,s,u.points,this._rgba(e.ink,.03));let o=this.evaluation&&this.evaluation.grid?this.evaluation.grid[String(this.height)]:null;if(o){let u=(this.cell||.1)/2;for(let f of o){let g=f.own>0&&f.own_sensor,_=f.spill&&f.spill.length;if(!g&&!_)continue;let m=Math.round(s.sx(f.x-u)),p=Math.round(s.sz(f.z-u)),b=Math.round(s.sx(f.x+u))-m,x=Math.round(s.sz(f.z+u))-p;g&&(t.fillStyle=this._rgba(this.colors[f.own_sensor]||e.accent,.14+.22*f.own),t.fillRect(m,p,b,x)),_&&(t.fillStyle=this._rgba(e.spill,.5),t.fillRect(m,p,b,x))}}for(let u of n.furniture||[])this._poly(t,s,u.poly,this._rgba(e.line,u.obstacle?.75:.45),this._rgba(e.muted,.6),.7);for(let u of n.bands||[])this._poly(t,s,u,e.ink);for(let u of n.freeWalls||[])this._poly(t,s,u.poly,this._rgba(e.ink,u.block?.65:.3));let a=[...(n.doors||[]).filter(u=>u.a&&u.b).map(u=>[vu(u.a,u.b,.45),e.floor,null]),...(n.windows||[]).filter(u=>u.a&&u.b).map(u=>[vu(u.a,u.b,.45),e.floor,this._rgba(e.glass,.45)])];if(a.length)for(let u of n.bands||[]){t.save(),this._path(t,s,u),t.clip();for(let[f,g,_]of a)this._poly(t,s,f,g),_&&this._poly(t,s,f,_);t.restore()}t.strokeStyle=e.glass,t.lineWidth=2;for(let u of n.windows||[])t.beginPath(),t.moveTo(s.sx(u.a[0]),s.sz(u.a[1])),t.lineTo(s.sx(u.b[0]),s.sz(u.b[1])),t.stroke();t.lineWidth=1.3;for(let u of n.doors||[])if(!(!u.hinge||!u.tip)&&(t.strokeStyle=e.muted,t.beginPath(),t.moveTo(s.sx(u.hinge[0]),s.sz(u.hinge[1])),t.lineTo(s.sx(u.tip[0]),s.sz(u.tip[1])),t.stroke(),u.other)){let f=Math.atan2(u.tip[1]-u.hinge[1],u.tip[0]-u.hinge[0]),_=(Math.atan2(u.other[1]-u.hinge[1],u.other[0]-u.hinge[0])-f+3*Math.PI)%(2*Math.PI)-Math.PI,m=(u.w||Math.hypot(u.tip[0]-u.hinge[0],u.tip[1]-u.hinge[1]))*r;t.setLineDash([3,3]),t.beginPath(),t.arc(s.sx(u.hinge[0]),s.sz(u.hinge[1]),m,f,f+_,_<0),t.stroke(),t.setLineDash([])}let l=this._roomLabels(),c=getComputedStyle(this).fontFamily||"Roboto, sans-serif";t.fillStyle=e.ink,t.font=`500 ${Math.max(11,Math.min(15,r*.26))}px ${c}`,t.textAlign="center",t.textBaseline="middle";for(let u of n.rooms||[]){let f=l[u.id];f&&t.fillText(String(u.name||u.id).toUpperCase(),s.sx(f.x),s.sz(f.z))}let h=12,d=this._h-12;if(t.strokeStyle=e.muted,t.lineWidth=2,t.beginPath(),t.moveTo(h,d),t.lineTo(h+r,d),t.stroke(),t.fillStyle=e.muted,t.font=`11px ${c}`,t.textAlign="left",t.textBaseline="alphabetic",t.fillText("1 m",h,d-5),(this.sensors||[]).forEach((u,f)=>{let g=u.active===!1?e.muted:this.colors[u.entity_id]||e.accent,_=s.sx(u.x),m=s.sz(u.z),p=u.entity_id===this.selected;if(this.cones&&u.active!==!1&&(this._path(t,s,Mm(u)),t.strokeStyle=this._rgba(g,p?.95:.5),t.lineWidth=p?1.6:1,t.setLineDash([5,4]),t.stroke(),t.setLineDash([])),u.mount!=="ceiling"){let[b,x]=_u(s,u);t.strokeStyle=g,t.lineWidth=3,t.beginPath(),t.moveTo(_,m),t.lineTo(b,x),t.stroke(),t.beginPath(),t.arc(b,x,p?7:5,0,2*Math.PI),t.fillStyle=e.floor,t.fill(),t.strokeStyle=g,t.lineWidth=2,t.stroke()}t.beginPath(),t.arc(_,m,p?12:10,0,2*Math.PI),t.fillStyle=u.active===!1?e.floor:g,t.fill(),t.strokeStyle=p?e.accent:u.active===!1?g:e.floor,t.lineWidth=p?3:2,t.stroke(),t.fillStyle=u.active===!1?g:"#fff",t.font=`600 11px ${c}`,t.textAlign="center",t.textBaseline="middle",t.fillText(String(f+1),_,m+.5),t.textBaseline="alphabetic"}),this._drag&&this._drag.snapInfo){let u=(this.sensors||[]).find(f=>f.entity_id===this._drag.entity_id);if(u){let[f,g]=this._drag.snapInfo.along,_=this.t("map.snap_readout",{a:Math.round(f*100),b:Math.round(g*100)});t.font=`12px ${c}`,t.textAlign="left";let m=t.measureText(_).width,p=Math.max(4,Math.min(this._w-m-8,s.sx(u.x)+16)),b=Math.max(16,s.sz(u.z)-16);t.fillStyle=this._rgba(e.floor,.92),t.fillRect(p-4,b-13,m+8,18),t.fillStyle=e.ink,t.fillText(_,p,b)}}}_pos(t){let e=this._canvas.getBoundingClientRect();return[t.clientX-e.left,t.clientY-e.top]}_emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}_down(t){if(!this.model)return;let[e,n]=this._pos(t),s=xu(this._vp,this.sensors,e,n);s&&(s.entity_id!==this.selected&&this._emit("select",{entity_id:s.entity_id}),!this.readonly&&(this._drag={...s,snapInfo:null,moved:!1},this._canvas.setPointerCapture(t.pointerId),this._canvas.focus({preventScroll:!0}),t.preventDefault()))}_move(t){if(!this.model)return;let[e,n]=this._pos(t),s=this._vp;if(!this._drag){this._canvas.style.cursor=xu(s,this.sensors,e,n)?"grab":"default";return}let r=(this.sensors||[]).find(a=>a.entity_id===this._drag.entity_id);if(!r)return;let o;if(this._drag.mode==="rotate")o={phi:Math.round(ym(r.x,r.z,s.wx(e),s.wz(n),t.shiftKey?0:5))%360};else{let a=[s.wx(e),s.wz(n)];if(this._drag.snapInfo=null,this.snap&&r.mount!=="ceiling"&&!t.altKey){let l=xm(this.model.faces,a,{maxDist:.4});l&&(a=[l.x,l.z],this._drag.snapInfo=l)}if(!yu(this.model,a[0],a[1]))return;o={x:Math.round(a[0]*1e3)/1e3,z:Math.round(a[1]*1e3)/1e3}}this._drag.moved=!0,this._drag.last=o,this._canvas.style.cursor="grabbing",this._emit("sensor-move",{entity_id:r.entity_id,patch:o,final:!1})}_up(){if(!this._drag)return;let t=this._drag;this._drag=null,this._canvas.style.cursor="default",t.moved&&this._emit("sensor-move",{entity_id:t.entity_id,patch:t.last||{},final:!0}),this._schedule()}_key(t){let e=this.sensors||[];if((t.key==="n"||t.key==="p"||t.key==="N"||t.key==="P")&&e.length){let a=e.findIndex(c=>c.entity_id===this.selected),l=t.key.toLowerCase()==="n"?1:-1;this._emit("select",{entity_id:e[(a+l+e.length)%e.length].entity_id}),t.preventDefault();return}if(this.readonly)return;let n=e.find(a=>a.entity_id===this.selected),s=Bm(n,t.key,t.shiftKey);if(!s)return;t.preventDefault();let r=s.x===void 0?n.x:s.x,o=s.z===void 0?n.z:s.z;yu(this.model,r,o)&&this._emit("sensor-move",{entity_id:n.entity_id,patch:s,final:!0})}};customElements.get("pp-map2d")||customElements.define("pp-map2d",Eu);var Gm="presence_planner",pi=class extends Error{constructor(t,e,n){super(e||t),this.name="PlannerError",this.code=t,this.i18nKey=n}},Au={unauthorized:"error.unauthorized",neonplan_incompatible:"error.neonplan_incompatible",unknown_command:"error.not_loaded",not_loaded:"error.not_loaded",neonplan_error:"error.neonplan_error",neonplan_unavailable:"error.neonplan_unavailable",neonplan_rejected:"error.neonplan_rejected",no_plan:"error.no_plan",not_found:"error.not_found",not_supported:"error.not_supported",invalid_format:"error.invalid_format",timeout:"error.timeout"};function Sn(i){if(i instanceof pi)return i;let t=i&&(i.code||i.error&&i.error.code)||"unknown",e=i&&(i.message||i.error&&i.error.message)||String(i),n=Au[t];return!n&&/neonplan_incompatible/.test(e)?new pi("neonplan_incompatible",e,Au.neonplan_incompatible):!n&&/unauthori[sz]ed|admin/i.test(e)?new pi("unauthorized",e,Au.unauthorized):new pi(t,e,n||"error.generic")}function WM(i){if(!i)return{};let t=i;!Array.isArray(t)&&typeof t=="object"&&(t=t.suggestions||t.devices||t.profiles||t);let e={};if(Array.isArray(t)){for(let n of t){if(!n||!n.entity_id)continue;let s=n.profile_id||n.profile||n.suggestion&&n.suggestion.id;s&&(e[n.entity_id]=typeof s=="object"?s.id:s)}return e}for(let[n,s]of Object.entries(t))s&&(e[n]=typeof s=="object"?s.profile_id||s.profile||s.id:s);return e}var ja=class{constructor(t){this.connection=t}async _call(t,e={}){if(!this.connection)throw new pi("no_connection","No connection","error.generic");try{return await this.connection.sendMessagePromise({type:`${Gm}/${t}`,...e})}catch(n){throw Sn(n)}}get(){return this._call("get")}async subscribe(t){if(!this.connection)throw new pi("no_connection","No connection","error.generic");try{return await this.connection.subscribeMessage(e=>t(e||{}),{type:`${Gm}/subscribe`})}catch(e){throw Sn(e)}}saveSensors(t){return this._call("save_sensors",{sensors:t})}savePlan(t){return this._call("save_plan",{plan:t})}exportPlan(){return this._call("export")}importPlan(t){return this._call("import",{data:t})}linkNeonplan(){return this._call("link_neonplan")}async deviceProfiles(){return WM(await this._call("device_profiles"))}};var Qa={title:"Presence Planner","source.neonplan":"NeonPlan","source.own":"Own plan","floor.select":"Floor","floor.default_name":"Ground floor","action.save":"Save","action.reset":"Reset","action.export":"Export","action.import":"Import","action.link_neonplan":"Link in NeonPlan","action.reload":"Reload","action.cancel":"Cancel","status.loading":"Loading plan\u2026","status.saving":"Saving\u2026","status.saved":"Saved.","status.exported":"Export downloaded.","status.imported":"Plan imported.","status.linked":"Button added to the NeonPlan menu.","status.revision":"Revision {revision}","status.sensors":"{count} sensors on this floor","status.unsaved":"unsaved changes","banner.remote_changed":"The plan or the sensors were changed elsewhere. Reload to see the new version; your unsaved changes will be lost.","banner.read_only":"You can look at the plan, but saving needs an administrator account.","error.generic":"Something went wrong: {detail}","error.unauthorized":"Not allowed. Saving and importing need an administrator account in Home Assistant.","error.neonplan_incompatible":"This NeonPlan 3D version is not supported yet. Presence Planner uses its own plan until an update is available.","error.not_loaded":"The Presence Planner integration is not loaded. Add it under Settings > Devices & services.","error.not_found":"Not found: {detail}","error.not_supported":"Not possible with the current plan source: {detail}","error.invalid_format":"The file is not in a supported format: {detail}","error.invalid_json":"The file is not valid JSON.","error.timeout":"Home Assistant did not answer in time.","error.neonplan_error":"NeonPlan reported an error: {detail}","error.neonplan_unavailable":"NeonPlan 3D is not available right now. Presence Planner uses its own plan.","error.neonplan_rejected":"NeonPlan did not accept the change: {detail}","error.no_plan":"There is no plan to export yet.","error.model":"The plan could not be calculated: {detail}","empty.no_plan":"There is no floor plan yet. Import a NeonPlan export or draw your own plan.","empty.start_editor":"Draw a plan","empty.no_floor":"This floor has no rooms yet.","import.confirm":"Importing replaces your own plan. Continue?","tabs.label":"Views","tabs.planner":"Planner","tabs.editor":"Editor","stage.label":"Floor plan","view.label":"Display","view.2d":"2D","view.3d":"3D","view.split":"Split","height.label":"Height for the coverage map","height.h05":"Lying, 0.5 m above the floor","height.h09":"Sitting, 0.9 m above the floor","height.h13":"Standing, 1.3 m above the floor","height.short05":"Lying","height.short09":"Sitting","height.short13":"Standing","legend.own":"seen by the room's own sensor","legend.spill":"seen from another room","map.aria":"Floor plan with sensors. Select a sensor, move it with the arrow keys, rotate it with Q and E, switch with N and P.","map.help":"Drag a sensor to move it, drag the small handle to turn it. Sensors snap to wall faces; hold Alt to place freely. Keyboard: arrow keys move by 5 cm (Shift 1 cm), Q and E turn by 5\xB0, N and P select the next or previous sensor.","map.selected":"Selected: {name}, x {x} m, z {z} m, direction {phi}\xB0","map.none_selected":"No sensor selected","map.snap_readout":"{a} cm | {b} cm to the end of the wall","sensors.title":"Sensors","sensors.empty":"No sensor placed on this floor yet.","sensors.select":"Select {name}","sensors.add_select":"Sensor to add","sensors.add":"Add sensor","sensors.no_candidates":"All presence and motion sensors from Home Assistant are placed.","sensors.suggested_profile":"Suggested profile from the device: {profile}","sensor.active":"include","sensor.profile":"Profile","sensor.mount":"Mount","sensor.phi":"Direction","sensor.height":"Height","sensor.tilt":"Tilt","sensor.fov_h":"Field of view, horizontal","sensor.fov_v":"Field of view, vertical","sensor.reach":"Reach","sensor.x":"Position x","sensor.z":"Position z","sensor.glass_warning":"A window is in view. Reflections can cause false detections.","sensor.remove":"Remove from plan","profile.custom":"Custom","profile.unverified":"not verified by the manufacturer","profile.unverified_hint":"The values come from community sources, not from the manufacturer's datasheet.","profile.fov_v_assumed":"The manufacturer gives no vertical field of view; {fov}\xB0 is assumed.","mount.wall":"Wall","mount.corner":"Corner","mount.ceiling":"Ceiling","results.title":"Results","results.none":"No results yet.","results.room":"Room","results.misfire":"Misfire risk","results.misfire_hint":"Share of the room that sensors from other rooms see at 1.3 m, with all doors open","results.seen_from":"Seen from","results.no_sensor":"no sensor","results.spill_list":"Sensors that see into other rooms","results.spill_line":"{sensor} sees {share} of {room}","results.no_spill":"No sensor sees noticeably into another room.","results.glass_title":"Windows in view","results.glass_line":"{sensor}: window in view, reflections possible","results.zones":"Zones","zone.bed":"Bed","zone.sofa":"Sofa","zone.desk":"Desk","zone.dining":"Dining table","zone.kitchen":"Kitchen counter","zone.wc":"Toilet","zone.shower":"Shower","zone.bathtub":"Bathtub","zone.washbasin":"Washbasin","zone.entry":"Entrance","optimizer.title":"Best spot","optimizer.room":"Room","optimizer.profile":"Profile","optimizer.target":"Apply to","optimizer.target_none":"no sensor","optimizer.weight":"Balance ({value})","optimizer.weight_coverage":"Coverage","optimizer.weight_misfire":"Avoid misfires","optimizer.run_room":"Suggest best spot","optimizer.run_all":"All rooms","optimizer.progress":"Optimizer progress","optimizer.running":"Calculating {room}\u2026 {pct}","optimizer.error":"The optimizer stopped: {detail}","optimizer.intro":"Finds the mount points with the best coverage and the least view into other rooms.","optimizer.no_result":"No suitable mount point found.","optimizer.coverage":"Coverage","optimizer.spill":"Spill","optimizer.glass":"window in view","optimizer.score":"Score","optimizer.apply":"Apply","optimizer.apply_to":"Move {name} here","optimizer.no_target":"Choose a sensor to apply this to","assume.title":"Assumptions","assume.doors":"Doors","assume.doors_open":"open","assume.doors_closed":"closed","assume.doors_live":"live","assume.doors_live_none":"No door on this floor has a contact sensor.","assume.thin":"Thin walls (under 10 cm)","assume.snap":"Snap to walls","assume.cones":"Show fields of view","assume.how_title":"How the planner calculates","assume.how_text":"Each sensor sees within its horizontal and vertical field of view up to its reach; the reach shrinks towards the edge of the view. Exterior walls and walls from 20 cm block. Walls from 10 to 19 cm damp by 25 dB, thinner ones by the value of the slider. Tall furniture damps by 10 dB, closed doors by 6 dB. This is a model, not a measurement.","view3d.reset":"Reset view","view3d.top":"Top view","view3d.mode":"Display","view3d.mode_flat":"Plane","view3d.mode_voxels":"Voxels","view3d.mode_points":"Point cloud","room.outside":"outside"};var Wm={title:"Presence Planner","source.neonplan":"NeonPlan","source.own":"Eigener Plan","floor.select":"Etage","floor.default_name":"Erdgeschoss","action.save":"Speichern","action.reset":"Zur\xFCcksetzen","action.export":"Exportieren","action.import":"Importieren","action.link_neonplan":"In NeonPlan verlinken","action.reload":"Neu laden","action.cancel":"Abbrechen","status.loading":"Plan wird geladen \u2026","status.saving":"Wird gespeichert \u2026","status.saved":"Gespeichert.","status.exported":"Export heruntergeladen.","status.imported":"Plan importiert.","status.linked":"Knopf im NeonPlan-Men\xFC erg\xE4nzt.","status.revision":"Revision {revision}","status.sensors":"{count} Sensoren auf dieser Etage","status.unsaved":"nicht gespeichert","banner.remote_changed":"Plan oder Sensoren wurden an anderer Stelle ge\xE4ndert. Lade neu, um den neuen Stand zu sehen. Deine ungespeicherten \xC4nderungen gehen dabei verloren.","banner.read_only":"Du kannst dir den Plan ansehen. Zum Speichern brauchst du ein Administratorkonto.","error.generic":"Da ist etwas schiefgegangen: {detail}","error.unauthorized":"Keine Berechtigung. Speichern und Importieren gehen nur mit einem Administratorkonto in Home Assistant.","error.neonplan_incompatible":"Diese Version von NeonPlan 3D wird noch nicht unterst\xFCtzt. Bis zu einem Update nutzt Presence Planner den eigenen Plan.","error.not_loaded":"Die Integration Presence Planner ist nicht geladen. Richte sie unter Einstellungen > Ger\xE4te & Dienste ein.","error.not_found":"Nicht gefunden: {detail}","error.not_supported":"Mit der aktuellen Planquelle nicht m\xF6glich: {detail}","error.invalid_format":"Das Dateiformat wird nicht unterst\xFCtzt: {detail}","error.invalid_json":"Die Datei ist kein g\xFCltiges JSON.","error.timeout":"Home Assistant hat nicht rechtzeitig geantwortet.","error.neonplan_error":"NeonPlan meldet einen Fehler: {detail}","error.neonplan_unavailable":"NeonPlan 3D ist gerade nicht erreichbar. Presence Planner nutzt den eigenen Plan.","error.neonplan_rejected":"NeonPlan hat die \xC4nderung nicht \xFCbernommen: {detail}","error.no_plan":"Es gibt noch keinen Plan zum Exportieren.","error.model":"Der Plan l\xE4sst sich nicht berechnen: {detail}","empty.no_plan":"Es gibt noch keinen Grundriss. Importiere einen NeonPlan-Export oder zeichne deinen eigenen Plan.","empty.start_editor":"Plan zeichnen","empty.no_floor":"Auf dieser Etage gibt es noch keine R\xE4ume.","import.confirm":"Der Import ersetzt deinen eigenen Plan. Weiter?","tabs.label":"Ansichten","tabs.planner":"Planer","tabs.editor":"Editor","stage.label":"Grundriss","view.label":"Darstellung","view.2d":"2D","view.3d":"3D","view.split":"Geteilt","height.label":"H\xF6he f\xFCr die Abdeckungskarte","height.h05":"Liegen, 0,5 m \xFCber dem Boden","height.h09":"Sitzen, 0,9 m \xFCber dem Boden","height.h13":"Stehen, 1,3 m \xFCber dem Boden","height.short05":"Liegen","height.short09":"Sitzen","height.short13":"Stehen","legend.own":"vom Sensor des Raums erfasst","legend.spill":"aus einem anderen Raum erfasst","map.aria":"Grundriss mit Sensoren. Sensor w\xE4hlen, mit den Pfeiltasten verschieben, mit Q und E drehen, mit N und P wechseln.","map.help":"Zieh einen Sensor, um ihn zu verschieben, und den kleinen Griff, um ihn zu drehen. Sensoren rasten an Wandfl\xE4chen ein, mit gedr\xFCckter Alt-Taste platzierst du frei. Tastatur: Pfeiltasten verschieben um 5 cm (mit Umschalt 1 cm), Q und E drehen um 5\xB0, N und P w\xE4hlen den n\xE4chsten oder vorherigen Sensor.","map.selected":"Gew\xE4hlt: {name}, x {x} m, z {z} m, Richtung {phi}\xB0","map.none_selected":"Kein Sensor gew\xE4hlt","map.snap_readout":"{a} cm | {b} cm bis zum Wandende","sensors.title":"Sensoren","sensors.empty":"Auf dieser Etage ist noch kein Sensor platziert.","sensors.select":"{name} w\xE4hlen","sensors.add_select":"Sensor zum Hinzuf\xFCgen","sensors.add":"Sensor hinzuf\xFCgen","sensors.no_candidates":"Alle Pr\xE4senz- und Bewegungsmelder aus Home Assistant sind platziert.","sensors.suggested_profile":"Vorgeschlagenes Profil laut Ger\xE4t: {profile}","sensor.active":"einrechnen","sensor.profile":"Profil","sensor.mount":"Montage","sensor.phi":"Richtung","sensor.height":"H\xF6he","sensor.tilt":"Neigung","sensor.fov_h":"Sichtfeld waagerecht","sensor.fov_v":"Sichtfeld senkrecht","sensor.reach":"Reichweite","sensor.x":"Position x","sensor.z":"Position z","sensor.glass_warning":"Ein Fenster ist im Blickfeld. Spiegelungen k\xF6nnen Fehlschaltungen verursachen.","sensor.remove":"Aus dem Plan entfernen","profile.custom":"Eigene Werte","profile.unverified":"nicht vom Hersteller best\xE4tigt","profile.unverified_hint":"Die Werte stammen aus Quellen der Community, nicht aus dem Datenblatt des Herstellers.","profile.fov_v_assumed":"Der Hersteller nennt kein senkrechtes Sichtfeld, angenommen werden {fov}\xB0.","mount.wall":"Wand","mount.corner":"Ecke","mount.ceiling":"Decke","results.title":"Auswertung","results.none":"Noch keine Ergebnisse.","results.room":"Raum","results.misfire":"Fehlschalt-Risiko","results.misfire_hint":"Anteil des Raums, den Sensoren aus anderen R\xE4umen in 1,3 m H\xF6he sehen, bei offenen T\xFCren","results.seen_from":"Blick hinein von","results.no_sensor":"kein Sensor","results.spill_list":"Sensoren, die in andere R\xE4ume sehen","results.spill_line":"{sensor} sieht {share} von {room}","results.no_spill":"Kein Sensor schaut sp\xFCrbar in einen anderen Raum.","results.glass_title":"Fenster im Blickfeld","results.glass_line":"{sensor}: Fenster im Blickfeld, Spiegelungen m\xF6glich","results.zones":"Zonen","zone.bed":"Bett","zone.sofa":"Sofa","zone.desk":"Schreibtisch","zone.dining":"Esstisch","zone.kitchen":"K\xFCchenzeile","zone.wc":"WC","zone.shower":"Dusche","zone.bathtub":"Badewanne","zone.washbasin":"Waschtisch","zone.entry":"Eingang","optimizer.title":"Bester Platz","optimizer.room":"Raum","optimizer.profile":"Profil","optimizer.target":"\xDCbernehmen f\xFCr","optimizer.target_none":"keinen Sensor","optimizer.weight":"Gewichtung ({value})","optimizer.weight_coverage":"Abdeckung","optimizer.weight_misfire":"Fehlschaltungen vermeiden","optimizer.run_room":"Besten Platz vorschlagen","optimizer.run_all":"Alle R\xE4ume","optimizer.progress":"Fortschritt der Optimierung","optimizer.running":"Berechne {room} \u2026 {pct}","optimizer.error":"Die Optimierung wurde abgebrochen: {detail}","optimizer.intro":"Sucht die Montagepunkte mit der besten Abdeckung und dem geringsten Blick in andere R\xE4ume.","optimizer.no_result":"Kein passender Montagepunkt gefunden.","optimizer.coverage":"Abdeckung","optimizer.spill":"\xDCberstrahlung","optimizer.glass":"Fenster im Blickfeld","optimizer.score":"Wertung","optimizer.apply":"\xDCbernehmen","optimizer.apply_to":"{name} hierher setzen","optimizer.no_target":"W\xE4hle einen Sensor, f\xFCr den der Vorschlag gelten soll","assume.title":"Annahmen","assume.doors":"T\xFCren","assume.doors_open":"offen","assume.doors_closed":"zu","assume.doors_live":"live","assume.doors_live_none":"Keine T\xFCr auf dieser Etage hat einen Kontaktsensor.","assume.thin":"D\xFCnne W\xE4nde (unter 10 cm)","assume.snap":"An W\xE4nden einrasten","assume.cones":"Sichtfelder zeigen","assume.how_title":"So rechnet der Planer","assume.how_text":"Jeder Sensor sieht in seinem waagerechten und senkrechten Sichtfeld bis zu seiner Reichweite, zum Rand hin nimmt die Reichweite ab. Au\xDFenw\xE4nde und W\xE4nde ab 20 cm blocken. W\xE4nde von 10 bis 19 cm d\xE4mpfen um 25 dB, d\xFCnnere um den Wert des Reglers. Hohe M\xF6bel d\xE4mpfen um 10 dB, geschlossene T\xFCren um 6 dB. Das ist ein Modell, keine Messung.","view3d.reset":"Ansicht zur\xFCcksetzen","view3d.top":"Draufsicht","view3d.mode":"Darstellung","view3d.mode_flat":"Fl\xE4che","view3d.mode_voxels":"Voxel","view3d.mode_points":"Punktwolke","room.outside":"au\xDFerhalb"};var Xm={en:Qa,de:Wm};function qm(i){let t=String(i||"en").toLowerCase().split(/[-_]/)[0];return Xm[t]?t:"en"}function tl(i){let t=qm(i),e=Xm[t],n=(s,r)=>{let o=e[s];return o===void 0&&(o=Qa[s]),o===void 0?s:(r&&(o=o.replace(/\{(\w+)\}/g,(a,l)=>r[l]===void 0||r[l]===null?a:String(r[l]))),o)};return n.lang=t,n.has=s=>e[s]!==void 0||Qa[s]!==void 0,n}function Tu(i){let t=qm(i),e=new Map,n=o=>(e.has(o)||e.set(o,new Intl.NumberFormat(t,{minimumFractionDigits:o,maximumFractionDigits:o})),e.get(o)),s=(o,a)=>{let l=10**a,c=Math.round(o*l)/l;return n(a).format(c===0?0:c)},r=o=>o==null||Number.isNaN(+o);return{num:(o,a=0)=>r(o)?"\u2013":s(+o,a),pct:(o,a=0)=>r(o)?"\u2013":`${s(+o*100,a)} %`}}var YM="presence-planner-worker.js",ZM="/presence_planner/frontend/presence-planner-worker.js";function Ym(i){try{if(i&&/^https?:/.test(i)){let t=new URL(YM,i),e=new URL(i).search;return e&&(t.search=e),t.href}}catch{}return ZM}var KM=i=>typeof i.value=="number"?i.value:typeof i.progress=="number"?i.progress:i.total?(i.done||0)/i.total:null,JM=i=>i.result||i.results||i.candidates||[],el=class{constructor({createWorker:t,fallback:e}={}){this.createWorker=t,this.fallback=e,this.worker=null,this.nextId=1,this.pending=new Map,this.cancelled=!1,this.running=!1}_ensureWorker(){if(this.worker||!this.createWorker)return this.worker;try{this.worker=this.createWorker()}catch{return this.createWorker=null,null}return this.worker.onmessage=t=>this._onMessage(t.data||{}),this.worker.onerror=t=>{let e=new Error(t&&t.message||"worker error");for(let n of this.pending.values())n.reject(e);this.pending.clear(),this._dropWorker()},this.worker}_dropWorker(){if(this.worker)try{this.worker.terminate()}catch{}this.worker=null}_onMessage(t){let e=this.pending.get(t.id);if(e)if(t.type==="error"||t.error!==void 0)this.pending.delete(t.id),e.reject(new Error(t.message||t.error||"optimizer error"));else if(t.type==="result"||t.result!==void 0||t.results!==void 0||t.candidates!==void 0)this.pending.delete(t.id),e.resolve(JM(t));else{let n=KM(t);n!==null&&e.onProgress(Math.max(0,Math.min(1,n)))}}_runOne(t,e){let n=this._ensureWorker();if(!n)return this.fallback?Promise.resolve().then(()=>this.fallback(t)):Promise.reject(new Error("no optimizer available"));let s=this.nextId++;return new Promise((r,o)=>{this.pending.set(s,{resolve:r,reject:o,onProgress:e}),n.postMessage({id:s,type:"optimize",...t})})}async run({plan:t,floorId:e,roomIds:n,profileId:s,opts:r,weight:o,profiles:a},l=()=>{}){this.cancelled=!1,this.running=!0;let c={},h=n.length||1;try{for(let d=0;d<n.length&&!this.cancelled;d++){let u=n[d];l(d/h,u);let f={plan:t,floorId:e,roomId:u,profileId:s,opts:r,weight:o,profiles:a};try{c[u]=await this._runOne(f,g=>l((d+g)/h,u))}catch(g){if(this.cancelled)break;c[u]={error:g.message||String(g)}}}return this.cancelled||l(1,null),c}finally{this.running=!1}}cancel(){this.cancelled=!0;let t=new Error("cancelled");for(let e of this.pending.values())e.reject(t);this.pending.clear(),this._dropWorker()}dispose(){this.cancel(),this.createWorker=null}};var Zm=Tn`
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
`;var jM=(i,t)=>i.t.has(`zone.${t}`)?i.t(`zone.${t}`):t;function Wi(i,t,e,{step:n=1,label:s,unit:r=""}){let o=Ur[e];return Y`<label for="f-${e}">${s}${r?Y` <span class="muted">${r}</span>`:ft}</label>
    <span></span>
    <input id="f-${e}" type="number" min=${o[0]} max=${o[1]} step=${n} .value=${ve(String(t[e]??""))}
      @change=${a=>i.patchSensor(t.entity_id,{[e]:a.target.value})} />`}function QM(i,t){let e=i.t,n=Nr(i.profiles),s=Vs(i.profiles,t.profile),r=s&&s.mounts||Xa,o=i._stats&&i._stats.sensors&&i._stats.sensors[t.entity_id],a=t.active!==!1&&o&&o.glass>wu;return Y`<div class="fields" @click=${l=>l.stopPropagation()}>
    <label for="f-profile">${e("sensor.profile")}</label>
    <div class="wide">
      <select id="f-profile" style="width:100%" .value=${ve(t.profile||"custom")} @change=${l=>i.setProfile(t.entity_id,l.target.value)}>
        ${n.map(l=>Y`<option value=${l.id} ?selected=${l.id===t.profile}>${l.id==="custom"?e("profile.custom"):l.name}</option>`)}
      </select>
      ${s&&!s.verified?Y`<span class="unverified" title=${e("profile.unverified_hint")}>${e("profile.unverified")}</span>`:ft}
      ${s&&s.fov_v==null&&t.mount!=="ceiling"?Y`<div class="muted">${e("profile.fov_v_assumed",{fov:i.profiles.default_fov_v||qa})}</div>`:ft}
    </div>

    <label for="f-mount">${e("sensor.mount")}</label>
    <select id="f-mount" class="wide" .value=${ve(t.mount||"wall")} @change=${l=>i.setMount(t.entity_id,l.target.value)}>
      ${Xa.map(l=>Y`<option value=${l} ?selected=${l===t.mount} ?disabled=${!r.includes(l)}>${e(`mount.${l}`)}</option>`)}
    </select>

    <label for="f-phi">${e("sensor.phi")} <span class="muted">°</span></label>
    <input type="range" min="0" max="359" step="1" aria-label=${e("sensor.phi")} .value=${ve(String(Math.round(t.phi||0)))} ?disabled=${t.mount==="ceiling"}
      @input=${l=>i.patchSensor(t.entity_id,{phi:l.target.value},!0)} @change=${l=>i.patchSensor(t.entity_id,{phi:l.target.value})} />
    <input id="f-phi" type="number" min="0" max="359" step="1" .value=${ve(String(Math.round(t.phi||0)))} ?disabled=${t.mount==="ceiling"}
      @change=${l=>i.patchSensor(t.entity_id,{phi:l.target.value})} />

    ${Wi(i,t,"height",{step:.05,label:e("sensor.height"),unit:"m"})}
    ${Wi(i,t,"tilt",{step:1,label:e("sensor.tilt"),unit:"\xB0"})}
    ${Wi(i,t,"fov_h",{step:5,label:e("sensor.fov_h"),unit:"\xB0"})}
    ${Wi(i,t,"fov_v",{step:5,label:e("sensor.fov_v"),unit:"\xB0"})}
    ${Wi(i,t,"reach",{step:.1,label:e("sensor.reach"),unit:"m"})}
    ${Wi(i,t,"x",{step:.01,label:e("sensor.x"),unit:"m"})}
    ${Wi(i,t,"z",{step:.01,label:e("sensor.z"),unit:"m"})}

    ${a?Y`<div class="full warn">${e("sensor.glass_warning")}</div>`:ft}
    ${i._s.source==="own"&&i.isAdmin?Y`<div class="full"><button @click=${()=>i.removeSensor(t.entity_id)}>${e("sensor.remove")}</button></div>`:ft}
  </div>`}function Km(i,t){let e=i.t,n=i._s,s=i.colors,r=i.hass?Za(i.hass.states,n.sensors):[],o=i._addEntity||r[0]&&r[0].entity_id||"",a=o&&n.deviceProfiles[o]?Vs(i.profiles,n.deviceProfiles[o]):null;return Y`<section class="box" aria-labelledby="h-sensors">
    <h2 id="h-sensors">${e("sensors.title")}</h2>
    ${t.length?ft:Y`<p class="muted">${e("sensors.empty")}</p>`}
    <div class="cards">
      ${t.map((l,c)=>{let h=l.entity_id===n.selected,d=i.roomOf(l);return Y`<div class="card ${h?"sel":""} ${l.active===!1?"off":""}" @click=${()=>i.select(l.entity_id)}>
          <span class="dot" style="background:${s[l.entity_id]}"></span>
          <button class="namebtn" aria-pressed=${h?"true":"false"} aria-label=${e("sensors.select",{name:i.name(l.entity_id)})}
            @click=${u=>{u.stopPropagation(),i.select(l.entity_id)}}>${c+1}. ${i.name(l.entity_id)}</button>
          <label class="chk" @click=${u=>u.stopPropagation()}>
            <input type="checkbox" .checked=${ve(l.active!==!1)} @change=${u=>i.patchSensor(l.entity_id,{active:u.target.checked})} />
            ${e("sensor.active")}
          </label>
          <span class="meta">${i.roomName(d)} · ${e(`mount.${l.mount||"wall"}`)} · ${i.fmt.num(l.height,2)} m · ${Math.round(l.phi||0)}°</span>
          ${h?QM(i,l):ft}
        </div>`})}
    </div>
    ${r.length?Y`<div class="row">
          <select aria-label=${e("sensors.add_select")} .value=${ve(o)} @change=${l=>i._addEntity=l.target.value}>
            ${r.map(l=>Y`<option value=${l.entity_id} ?selected=${l.entity_id===o}>${l.name}</option>`)}
          </select>
          <button ?disabled=${!i._model||!i.isAdmin} @click=${()=>i.addSensor()}>${e("sensors.add")}</button>
        </div>
        ${a?Y`<div class="muted">${e("sensors.suggested_profile",{profile:a.name})}</div>`:ft}`:Y`<p class="muted">${e("sensors.no_candidates")}</p>`}
  </section>`}function Jm(i){let t=i.t,e=i.fmt,n=i._stats,s=i._model&&i._model.rooms||[];if(!n||!n.rooms)return Y`<section class="box"><h2>${t("results.title")}</h2><p class="muted">${t("results.none")}</p></section>`;let r=[],o=[];for(let l of Xn(i._s)){let c=n.sensors&&n.sensors[l.entity_id];if(!(!c||l.active===!1)){for(let[h,d]of Object.entries(c.spill||{}))d>=.01&&r.push({s:l,rid:h,share:d});c.glass>wu&&o.push(l)}}r.sort((l,c)=>c.share-l.share);let a=[...n.zones||[]].sort((l,c)=>i.roomName(l.room).localeCompare(i.roomName(c.room))||l.name.localeCompare(c.name));return Y`<section class="box" aria-labelledby="h-results">
    <h2 id="h-results">${t("results.title")}</h2>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th scope="col">${t("results.room")}</th>
          ${Bs.map(l=>Y`<th scope="col" class="num" title=${t(`height.h${String(l).replace(".","")}`)}>${e.num(l,1)} m</th>`)}
          <th scope="col" class="num" title=${t("results.misfire_hint")}>${t("results.misfire")}</th>
        </tr></thead>
        <tbody>
          ${s.map(l=>{let c=n.rooms[l.id];if(!c)return ft;let h=(c.own_sensors||[]).length>0,d=Object.entries(c.from||{}).filter(([,u])=>u>=.01).sort((u,f)=>f[1]-u[1]);return Y`<tr class=${d.length?"has-from":""}>
              <th scope="row" style="font-weight:500;color:inherit">${l.name||l.id}
                <div class="bar" aria-hidden="true"><i style="width:${Math.round((h?c.coverage_mean:0)*100)}%"></i></div></th>
              ${h?Bs.map(u=>Y`<td class="num">${e.pct(c.coverage[String(u)])}</td>`):Y`<td class="num muted" colspan="3">${t("results.no_sensor")}</td>`}
              <td class="num ${c.misfire_risk>=.05?"spill":""}">${e.pct(c.misfire_risk)}</td>
            </tr>
            ${d.length?Y`<tr class="from"><td colspan="5" class="spill">${t("results.seen_from")}: ${d.map(([u,f],g)=>Y`${g?", ":""}${i.name(u)} <span style="white-space:nowrap">${e.pct(f)}</span>`)}</td></tr>`:ft}`})}
        </tbody>
      </table>
    </div>
    ${r.length?Y`<ul class="spill" aria-label=${t("results.spill_list")}>${r.map(l=>Y`<li>${t("results.spill_line",{sensor:i.name(l.s.entity_id),share:e.pct(l.share),room:i.roomName(l.rid)})}</li>`)}</ul>`:Y`<p class="muted">${t("results.no_spill")}</p>`}
    ${o.length?Y`<div class="warn" role="note"><strong>${t("results.glass_title")}</strong><ul>${o.map(l=>Y`<li>${t("results.glass_line",{sensor:i.name(l.entity_id)})}</li>`)}</ul></div>`:ft}
    ${a.length?Y`<h2>${t("results.zones")}</h2>
          <div class="kv">${a.map(l=>{let c=n.rooms[l.room]&&(n.rooms[l.room].own_sensors||[]).length;return Y`<span>${jM(i,l.name)} <span class="muted">(${i.roomName(l.room)}, ${e.num(l.height,1)} m)</span></span><span class="v">${c?e.pct(l.share):"\u2013"}</span>`})}</div>`:ft}
  </section>`}function tw(i,t,e,n,s){let r=i.t,o=i.fmt,a=Object.values(e.spill||{}).reduce((l,c)=>l+c,0);return Y`<div class="result">
    <span><strong>${n+1}.</strong> ${r("optimizer.coverage")} ${o.pct(e.coverage)} · ${r("optimizer.spill")} ${o.pct(a)}${e.glass>.05?Y` · <span class="warn">${r("optimizer.glass")}</span>`:ft}</span>
    <button ?disabled=${!s} title=${s?r("optimizer.apply_to",{name:i.name(s)}):r("optimizer.no_target")}
      aria-label=${s?r("optimizer.apply_to",{name:i.name(s)}):r("optimizer.no_target")}
      @click=${()=>i.applyCandidate(s,e)}>${r("optimizer.apply")}</button>
    <span class="meta">${r(`mount.${e.mount||"wall"}`)} · x ${o.num(e.x,2)} · z ${o.num(e.z,2)} · ${o.num(e.height,2)} m${e.mount==="ceiling"?ft:Y` · ${Math.round(e.phi)}° · ${r("sensor.tilt")} ${Math.round(e.tilt)}°`} · ${r("optimizer.score")} ${o.num(e.score,3)}</span>
  </div>`}function jm(i){let t=i.t,e=i._opt,n=i._model&&i._model.rooms||[],s=i.optimizerRoom(),r=i.optimizerProfile(),o=Xn(i._s),a=i.optimizerTarget(s),l=e.results;return Y`<section class="box" aria-labelledby="h-opt">
    <h2 id="h-opt">${t("optimizer.title")}</h2>
    <div class="row">
      <label for="o-room" class="muted">${t("optimizer.room")}</label>
      <select id="o-room" .value=${ve(s||"")} @change=${c=>i.setOpt({roomId:c.target.value,target:null})}>
        ${n.map(c=>Y`<option value=${c.id} ?selected=${c.id===s}>${c.name||c.id}</option>`)}
      </select>
    </div>
    <div class="row">
      <label for="o-profile" class="muted">${t("optimizer.profile")}</label>
      <select id="o-profile" .value=${ve(r)} @change=${c=>i.setOpt({profileId:c.target.value})}>
        ${Nr(i.profiles).map(c=>Y`<option value=${c.id} ?selected=${c.id===r}>${c.id==="custom"?t("profile.custom"):c.name}</option>`)}
      </select>
    </div>
    <div class="row">
      <label for="o-target" class="muted">${t("optimizer.target")}</label>
      <select id="o-target" .value=${ve(a||"-")} @change=${c=>i.setOpt({target:c.target.value})}>
        <option value="-">${t("optimizer.target_none")}</option>
        ${o.map(c=>Y`<option value=${c.entity_id} ?selected=${c.entity_id===a}>${i.name(c.entity_id)}</option>`)}
      </select>
    </div>
    <div>
      <label for="o-weight" class="muted">${t("optimizer.weight",{value:i.fmt.num(i._s.weight,1)})}</label>
      <div class="slider">
        <span>${t("optimizer.weight_coverage")}</span>
        <input id="o-weight" type="range" min="0" max="2" step="0.1" .value=${ve(String(i._s.weight))} @input=${c=>i.setOption("weight",+c.target.value)} />
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
          ${Object.entries(l).map(([c,h],d)=>{let u=e.scope==="all"?Ja(i._s,c,f=>i.roomOf(f)):a;return Array.isArray(h)?Y`<details ?open=${e.scope!=="all"||d===0}>
              <summary>${i.roomName(c)}${h[0]?Y` · ${t("optimizer.coverage")} ${i.fmt.pct(h[0].coverage)}`:ft}</summary>
              <div class="results">
                ${h.length?h.map((f,g)=>tw(i,c,f,g,u)):Y`<p class="muted">${t("optimizer.no_result")}</p>`}
              </div>
            </details>`:Y`<p class="spill">${i.roomName(c)}: ${t("optimizer.error",{detail:h.error})}</p>`})}
        </div>`:Y`<p class="muted">${t("optimizer.intro")}</p>`}
  </section>`}function Qm(i){let t=i.t,e=i._s,n=$s(e),s=(n&&n.openings||[]).some(r=>r.type!=="window"&&r.contact);return Y`<section class="box" aria-labelledby="h-assume">
    <h2 id="h-assume">${t("assume.title")}</h2>
    <div class="row">
      <span class="muted">${t("assume.doors")}</span>
      <div class="seg" role="group" aria-label=${t("assume.doors")}>
        ${Em.map(r=>Y`<button aria-pressed=${e.doorsMode===r?"true":"false"} ?disabled=${r==="live"&&!s}
          title=${r==="live"&&!s?t("assume.doors_live_none"):""} @click=${()=>i.setOption("doorsMode",r)}>${t(`assume.doors_${r}`)}</button>`)}
      </div>
    </div>
    <div class="kv"><label for="a-thin">${t("assume.thin")}</label><span class="v">${e.thinDb} dB</span></div>
    <input id="a-thin" type="range" min="4" max="18" step="1" .value=${ve(String(e.thinDb))}
      @input=${r=>i.setOption("thinDb",+r.target.value,!0)} @change=${r=>i.setOption("thinDb",+r.target.value)} />
    <label class="chk"><input type="checkbox" .checked=${ve(e.snap)} @change=${r=>i.setOption("snap",r.target.checked)} /> ${t("assume.snap")}</label>
    <label class="chk"><input type="checkbox" .checked=${ve(e.cones)} @change=${r=>i.setOption("cones",r.target.checked)} /> ${t("assume.cones")}</label>
    <details><summary>${t("assume.how_title")}</summary><p>${t("assume.how_text")}</p></details>
  </section>`}var ew=.2,Ru=class extends Ge{static properties={hass:{attribute:!1},narrow:{type:Boolean,reflect:!0},route:{attribute:!1},panel:{attribute:!1},_s:{state:!0},_eval:{state:!0},_stats:{state:!0},_model:{state:!0},_status:{state:!0},_busy:{state:!0},_opt:{state:!0},_addEntity:{state:!0}};static styles=Zm;constructor(){super(),this._s=Rm(),this._eval=null,this._stats=null,this._model=null,this._status=null,this._busy=!1,this._opt={roomId:null,profileId:null,target:null,running:!1,progress:0,results:null,error:null,scope:null},this._addEntity="",this._client=null,this._unsub=null,this._evalFast=!1,this._contactSig="",this._runner=new el({createWorker:()=>new Worker(Ym(import.meta.url),{type:"module"}),fallback:t=>Al(this._modelFor(t.plan,t.floorId),t.roomId,t.profileId,t.opts,t.weight,t.profiles)})}connectedCallback(){super.connectedCallback(),this._client&&!this._unsub&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe(),this._runner.cancel(),cancelAnimationFrame(this._evalRaf)}willUpdate(t){if(t.has("hass")&&this.hass){(!this._t||this._t.lang!==tl(this.hass.language).lang)&&(this._t=tl(this.hass.language),this._f=Tu(this.hass.language));let e=!!(this.hass.themes&&this.hass.themes.darkMode);if(e!==this._dark&&(this._dark=e,this.toggleAttribute("dark",e)),(!this._client||this._client.connection!==this.hass.connection)&&(this._client=new ja(this.hass.connection),this._unsubscribe(),this._load(),this._subscribe(),this._loadDeviceProfiles()),this._s.doorsMode==="live"){let n=this._contactSignature();n!==this._contactSig&&(this._contactSig=n,this._scheduleEval(!1))}}}get t(){return this._t||(this._t=tl("en"))}get fmt(){return this._f||(this._f=Tu("en"))}async _load(){if(!this._client)return!1;this._busy=!0,this._status={key:"status.loading"};try{let t;for(let n=0;;n++)try{t=await this._client.get();break}catch(s){if(Sn(s).code!=="not_loaded"||n>=3)throw s;await new Promise(r=>setTimeout(r,1e3))}this._setState(Cm(this._s,t)),this._status=null;let e=t.neonplan&&(t.neonplan.error||t.neonplan.incompatible&&"neonplan_incompatible");return e&&(this._status={key:Sn({code:e,message:e}).i18nKey,error:!0,detail:e}),!0}catch(t){let e=Sn(t);return this._s={...this._s,loading:!1,error:e},this._status={key:e.i18nKey,error:!0,detail:e.message},!1}finally{this._busy=!1}}async _loadDeviceProfiles(){try{let t=await this._client.deviceProfiles();this._s={...this._s,deviceProfiles:t}}catch{}}async _subscribe(){if(!(!this._client||this._unsub))try{this._unsub=await this._client.subscribe(t=>{if(this._saving)return;let{state:e,reload:n}=Pm(this._s,t.revision);this._s=e,n&&this._load()})}catch{}}_unsubscribe(){if(this._unsub)try{this._unsub()}catch{}this._unsub=null}_setState(t,{fast:e=!1}={}){let n=this._s;this._s=t,(t.editPlan!==n.editPlan||t.floorId!==n.floorId||!this._model)&&this._rebuildModel(),t.profiles!==n.profiles&&(this._profilesDict=null),t.doorsMode==="live"&&n.doorsMode!=="live"&&(this._contactSig=this._contactSignature()),this._scheduleEval(e)}get profiles(){return this._profilesDict||(this._profilesDict=Or(this._s.profiles||Pn)),this._profilesDict}_modelFor(t,e){return t===this._s.editPlan&&e===this._s.floorId&&this._model?this._model:Kr(t,e)}_rebuildModel(){let t=this._s.editPlan,e=this._s.floorId;if(!t||!e){this._model=null;return}try{this._model=Kr(t,e),this._modelError=null}catch(n){this._model=null,this._modelError=n,this._status={key:"error.model",error:!0,detail:n.message}}}_resolved(t){return t.map(e=>{try{return Ki(e,this.profiles)}catch{return e}})}_scheduleEval(t){this._evalFast=t,cancelAnimationFrame(this._evalRaf),clearTimeout(this._evalTimer);let e=()=>this._runEval(t);t?this._evalRaf=requestAnimationFrame(e):this._evalTimer=setTimeout(e,0)}_coreOpts3d(){let t=Ya(this._s,this.hass&&this.hass.states,{fast:!1}),e=JSON.stringify([t.doors,t.thin_db]);return this._opts3dKey!==e&&(this._opts3dKey=e,this._opts3d={doors:t.doors,thin_db:t.thin_db}),this._opts3d}_runEval(t){if(!this._model){this._eval=null,this._stats=null;return}let e=Ya(this._s,this.hass&&this.hass.states,{fast:t});try{let n=nr(this._model,this._resolved(Xn(this._s)),e);this._eval={...n,cell:e.cell,fast:t},t||(this._stats=this._eval)}catch(n){this._eval=null,this._status={key:"error.model",error:!0,detail:n.message}}}_contactSignature(){let t=$s(this._s),e=this.hass&&this.hass.states||{};return(t&&t.openings||[]).filter(n=>n.contact).map(n=>`${n.id}:${(e[n.contact]||{}).state}`).join("|")}name(t){let e=this.hass&&this.hass.states[t];return e&&e.attributes&&e.attributes.friendly_name||t}roomName(t){let e=this._model&&(this._model.rooms||[]).find(n=>n.id===t);return e?e.name||e.id:this.t("room.outside")}roomOf(t){return gu(this._model,t.x,t.z)}roomHeight(t){let e=this._model&&(this._model.rooms||[]).find(s=>s.id===t),n=$s(this._s);return e&&e.height||n&&n.height||2.5}get colors(){return Sm(this._s.sensors,this._dark)}get isAdmin(){return!this.hass||!this.hass.user||this.hass.user.is_admin!==!1}_selectId(t){return typeof t=="string"?t:t&&(t.entityId||t.entity_id)||null}select(t){!t||t===this._s.selected||(this._s={...this._s,selected:t})}patchSensor(t,e,n=!1){this._setState(kr(this._s,t,e),{fast:n})}setProfile(t,e){this._setState(Im(this._s,t,e))}setMount(t,e){let n=qn(this._s,t);this._setState(Dm(this._s,t,e,n?this.roomHeight(this.roomOf(n)):void 0))}removeSensor(t){this._setState(Nm(this._s,t))}setOption(t,e,n=!1){let s={...this._s,[t]:e};t==="thinDb"&&(s.thinTouched=!0),["height","doorsMode","thinDb"].includes(t)?this._setState(s,{fast:n}):this._s=s}addSensor(){let t=this._addEntity||(Za(this.hass.states,this._s.sensors)[0]||{}).entity_id;if(!t||!this._model)return;let e=this._model.rooms||[],n=new Set(Xn(this._s).map(a=>this.roomOf(a))),s=e.find(a=>!n.has(a.id))||e[0],r=s?Ha(s.points):{x:0,z:0},o=Lm(t,{floorId:this._s.floorId,x:r.x,z:r.z,profileId:this._s.deviceProfiles[t]||"custom",profiles:this.profiles});this._addEntity="",this._setState(Um(this._s,o))}async save(){if(this._client){this._busy=!0,this._saving=!0,this._status={key:"status.saving"};try{this._s.planDirty&&Ka(this._s)&&await this._client.savePlan(this._s.editPlan);let t;if(this._s.dirty){let e=await this._client.saveSensors(zm(this._s));t=e&&e.revision,this._s=Fm(this._s,t)}await this._load()&&(this._status={key:"status.saved"})}catch(t){let e=Sn(t);this._status={key:e.i18nKey,error:!0,detail:e.message}}finally{this._busy=!1,this._saving=!1}}}reset(){if(this._s.remoteChanged){this._load();return}this._setState(Om(this._s)),this._status=null}async exportPlan(){try{let t=await this._client.exportPlan(),e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(e),n.download="presence-planner-neonplan-import.json",document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3),this._status={key:"status.exported"}}catch(t){let e=Sn(t);this._status={key:e.i18nKey,error:!0,detail:e.message}}}_pickImport(){this.renderRoot.querySelector("#import-file").click()}async _importFile(t){let e=t.target.files&&t.target.files[0];if(t.target.value="",!e)return;let n;try{n=JSON.parse(await e.text())}catch{this._status={key:"error.invalid_json",error:!0};return}if(!((this._s.dirty||this._s.planDirty||this._s.plan)&&!window.confirm(this.t("import.confirm")))){this._busy=!0;try{await this._client.importPlan(n),await this._load(),this._status={key:"status.imported"}}catch(s){let r=Sn(s);this._status={key:r.i18nKey,error:!0,detail:r.message}}finally{this._busy=!1}}}async linkNeonplan(){try{await this._client.linkNeonplan(),this._status={key:"status.linked"},await this._load()}catch(t){let e=Sn(t);this._status={key:e.i18nKey,error:!0,detail:e.message}}}setOpt(t){this._opt={...this._opt,...t}}optimizerRoom(){let t=this._model&&this._model.rooms||[];if(t.some(s=>s.id===this._opt.roomId))return this._opt.roomId;let e=qn(this._s,this._s.selected);return(e?this.roomOf(e):null)||t[0]&&t[0].id||null}optimizerProfile(){if(this._opt.profileId)return this._opt.profileId;let t=qn(this._s,this._s.selected);return t&&t.profile||"aqara_fp300"}optimizerTarget(t){if(this._opt.target&&this._opt.scope!=="all"){if(this._opt.target==="-")return null;if(qn(this._s,this._opt.target))return this._opt.target}return Ja(this._s,t,e=>this.roomOf(e))}async runOptimizer(t){if(!this._model||this._opt.running)return;let e=t?(this._model.rooms||[]).map(s=>s.id):[this.optimizerRoom()].filter(Boolean);if(!e.length)return;let n={...Ya(this._s,this.hass&&this.hass.states,{grid:!1}),cell:ew};this.setOpt({running:!0,progress:0,results:null,error:null,scope:t?"all":"room",currentRoom:e[0]});try{let s=await this._runner.run({plan:this._s.editPlan,floorId:this._s.floorId,roomIds:e,profileId:this.optimizerProfile(),opts:n,weight:this._s.weight,profiles:this.profiles},(r,o)=>this.setOpt({progress:r,currentRoom:o}));this.setOpt({running:!1,results:s,progress:1})}catch(s){this.setOpt({running:!1,error:s.message||String(s)})}}cancelOptimizer(){this._runner.cancel(),this.setOpt({running:!1,progress:0})}applyCandidate(t,e){t&&this._setState({...Vm(this._s,t,e),selected:t})}render(){let t=this.t,e=this._s;if(!this.hass)return Y``;let n=e.plan&&e.plan.floors||[],s=e.dirty||e.planDirty;return Y`<div class="app">
      ${this._renderTop(n,s)}
      ${e.remoteChanged?Y`<div class="banner" role="alert"><span>${t("banner.remote_changed")}</span><button @click=${()=>this._load()}>${t("action.reload")}</button></div>`:ft}
      ${this.isAdmin?ft:Y`<div class="banner" role="note"><span>${t("banner.read_only")}</span></div>`}
      ${e.loading&&!e.plan?Y`<div class="empty">${t("status.loading")}</div>`:e.error&&!e.plan?this._renderError():e.plan?this._renderBody():this._renderNoPlan()}
    </div>`}_renderTop(t,e){let n=this.t,s=this._s,r=this._status,o=r?n(r.key,{detail:r.detail||""})+(r.error&&r.detail&&!n(r.key).includes("{detail}")?` (${r.detail})`:""):s.plan?[s.revision!==null?n("status.revision",{revision:s.revision}):null,n("status.sensors",{count:Xn(s).length}),e?n("status.unsaved"):null].filter(Boolean).join(" \xB7 "):"";return Y`<header class="top">
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
        ${$m(s)?Y`<button ?disabled=${this._busy||!this.isAdmin} @click=${()=>this.linkNeonplan()}>${n("action.link_neonplan")}</button>`:ft}
      </div>
    </header>`}_renderError(){let t=this.t;return Y`<div class="empty"><p>${t(this._s.error.i18nKey||"error.generic",{detail:this._s.error.message})}</p><button @click=${()=>this._load()}>${t("action.reload")}</button></div>`}_renderNoPlan(){let t=this.t;return Y`<div class="empty">
      <p>${t("empty.no_plan")}</p>
      <div class="row" style="justify-content:center">
        <button @click=${()=>this._pickImport()} ?disabled=${!this.isAdmin}>${t("action.import")}</button>
        ${Ka(this._s)?Y`<button class="primary" @click=${()=>this._startOwnPlan()}>${t("empty.start_editor")}</button>`:ft}
      </div>
    </div>`}_startOwnPlan(){let t={version:1,settings:{wall_exterior:.24,wall_interior:.12},floors:[{id:"f1",name:this.t("floor.default_name"),ha_floor:null,elevation:0,height:2.5,rooms:[],openings:[],walls:[],furniture:[],outdoor:[],background:null}]};this._setState({...this._s,plan:t,editPlan:t,floorId:"f1",planDirty:!0,tab:"editor"})}_renderBody(){let t=this.t,e=this._s,n=Ka(e),s=n?e.tab:"planner";return Y`
      <nav class="tabs" role="tablist" aria-label=${t("tabs.label")} @keydown=${r=>this._tabKey(r,n)}>
        <button role="tab" id="tab-planner" aria-controls="tp-planner" aria-selected=${s==="planner"?"true":"false"} tabindex=${s==="planner"?0:-1} @click=${()=>this.setOption("tab","planner")}>${t("tabs.planner")}</button>
        ${n?Y`<button role="tab" id="tab-editor" aria-controls="tp-editor" aria-selected=${s==="editor"?"true":"false"} tabindex=${s==="editor"?0:-1} @click=${()=>this.setOption("tab","editor")}>${t("tabs.editor")}</button>`:ft}
      </nav>
      ${s==="editor"?this._renderEditor():this._renderPlanner()}`}_tabKey(t,e){if(!e||t.key!=="ArrowLeft"&&t.key!=="ArrowRight")return;let n=this._s.tab==="planner"?"editor":"planner";this.setOption("tab",n),this.updateComplete.then(()=>{let s=this.renderRoot.querySelector(`#tab-${n}`);s&&s.focus()})}_haRegistries(){let t=this.hass?.areas,e=this.hass?.floors;if(this._regCache&&this._regCache.areas===t&&this._regCache.floors===e)return this._regCache;let n=(s,r)=>String(s.name||"").localeCompare(String(r.name||""));return this._regCache={areas:t,floors:e,areaList:Object.values(t||{}).sort(n),floorList:Object.values(e||{}).sort((s,r)=>(s.level??0)-(r.level??0)||n(s,r))},this._regCache}_renderEditor(){let t=this._haRegistries();return Y`<section id="tp-editor" role="tabpanel" aria-labelledby="tab-editor" class="editor">
      <pp-editor .plan=${this._s.editPlan} .floorId=${this._s.floorId} .hass=${this.hass} .dark=${!!this._dark}
        .lang=${this.hass?.language||"en"} .areas=${t.areaList} .floors=${t.floorList}
        @plan-changed=${e=>this._onPlanChanged(e)}></pp-editor>
    </section>`}_onPlanChanged(t){let e=t.detail,n=e&&e.plan?e.plan:e;if(!n||!n.floors)return;let s=this._s.floorId;e&&e.floorId&&(s=e.floorId),n.floors.some(r=>r.id===s)||(s=n.floors[0]?n.floors[0].id:null),this._setState({...km(this._s,n),floorId:s})}_renderPlanner(){let t=this.t,e=this._s,n=Xn(e),s=this._resolved(n),r=this.colors,o=Object.fromEntries(n.map(c=>[c.entity_id,this.name(c.entity_id)])),a=e.view,l=bu[this._dark?"dark":"light"];return Y`<div id="tp-planner" role="tabpanel" aria-labelledby="tab-planner" class="planner">
      <section class="stage" aria-label=${t("stage.label")}>
        <div class="toolbar">
          <div class="seg" role="group" aria-label=${t("view.label")}>
            ${Am.map(c=>Y`<button aria-pressed=${a===c?"true":"false"} @click=${()=>this.setOption("view",c)}>${t(`view.${c}`)}</button>`)}
          </div>
          <div class="seg" role="group" aria-label=${t("height.label")}>
            ${Bs.map(c=>Y`<button aria-pressed=${e.height===c?"true":"false"} title=${t(`height.h${String(c).replace(".","")}`)} @click=${()=>this.setOption("height",c)}>${t(`height.short${String(c).replace(".","")}`)}</button>`)}
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
                    .selected=${e.selected} .dark=${!!this._dark} .colors=${r} .coreOpts=${this._coreOpts3d()}
                    .labels=${{reset:t("view3d.reset"),top:t("view3d.top"),mode:t("view3d.mode"),flat:t("view3d.mode_flat"),voxels:t("view3d.mode_voxels"),points:t("view3d.mode_points")}}
                    @select=${c=>this.select(this._selectId(c.detail))}></pp-view3d></div>`:ft}
            </div>
            <p class="hint">${t("map.help")}</p>`:Y`<div class="empty">${this._modelError?t("error.model",{detail:this._modelError.message}):t("empty.no_floor")}</div>`}
      </section>
      <aside class="side">
        ${Km(this,n)}
        ${Jm(this)}
        ${jm(this)}
        ${Qm(this)}
      </aside>
    </div>`}};customElements.get("presence-planner-panel")||customElements.define("presence-planner-panel",Ru);export{Ru as PresencePlannerPanel};
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
