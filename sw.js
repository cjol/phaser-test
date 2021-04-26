(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.1.5"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.1.5"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.1.5"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.1.5"]&&_()}catch(e){}}},t={};function s(a){var r=t[a];if(void 0!==r)return r.exports;var n=t[a]={exports:{}};return e[a](n,n.exports,s),n.exports}(()=>{s(913);class e extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}const t={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},a=e=>[t.prefix,e,t.suffix].filter((e=>e&&e.length>0)).join("-"),r=e=>e||a(t.precache);function n(e,t){const s=t();return e.waitUntil(s),s}function i(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:s,url:a}=t;if(!a)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const r=new URL(a,location.href),n=new URL(a,location.href);return r.searchParams.set("__WB_REVISION__",s),{cacheKey:r.href,url:n.href}}s(977);class c{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class o{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=t&&t.cacheKey||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s):e},this._precacheController=e}}let h;function l(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class u{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const d=new Set;function f(e){return"string"==typeof e?new Request(e):e}s(873);class p{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new u,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(t){const{event:s}=this;let a=f(t);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const r=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(t){throw new e("plugin-error-request-will-fetch",{thrownError:t})}const n=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:n,response:e});return e}catch(e){throw r&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:r.clone(),request:n.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=f(e);let s;const{cacheName:a,matchOptions:r}=this._strategy,n=await this.getCacheKey(t,"read"),i={...r,cacheName:a};s=await caches.match(n,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:r,cachedResponse:s,request:n,event:this.event})||void 0;return s}async cachePut(t,s){const a=f(t);await(0,new Promise((e=>setTimeout(e,0))));const r=await this.getCacheKey(a,"write");if(!s)throw new e("cache-put-with-no-response",{url:(n=r.url,new URL(String(n),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var n;const i=await this._ensureResponseSafeToCache(s);if(!i)return!1;const{cacheName:c,matchOptions:o}=this._strategy,h=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),p=u?await async function(e,t,s,a){const r=l(t.url,s);if(t.url===r)return e.match(t,a);const n={...a,ignoreSearch:!0},i=await e.keys(t,n);for(const t of i)if(r===l(t.url,s))return e.match(t,a)}(h,r.clone(),["__WB_REVISION__"],o):null;try{await h.put(r,u?i.clone():i)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of d)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:p,newResponse:i.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=f(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const r={...a,state:s};return t[e](r)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve()}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class y extends class{constructor(e={}){this.cacheName=e.cacheName||a(t.runtime),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,r=new p(this,{event:t,request:s,params:a}),n=this._getResponse(r,s,t);return[n,this._awaitComplete(n,r,s,t)]}async _getResponse(t,s,a){let r;await t.runCallbacks("handlerWillStart",{event:a,request:s});try{if(r=await this._handle(s,t),!r||"error"===r.type)throw new e("no-response",{url:s.url})}catch(e){for(const n of t.iterateCallbacks("handlerDidError"))if(r=await n({error:e,event:a,request:s}),r)break;if(!r)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))r=await e({event:a,request:s,response:r});return r}async _awaitComplete(e,t,s,a){let r,n;try{r=await e}catch(n){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:r}),await t.doneWaiting()}catch(e){n=e}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:r,error:n}),t.destroy(),n)throw n}}{constructor(e={}){e.cacheName=r(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(y.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(t,s){let a;if(!this._fallbackToNetwork)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});return a=await s.fetch(t),a}async _handleInstall(t,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(t);if(!await s.cachePut(t,a.clone()))throw new e("bad-precaching-response",{url:t.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==y.copyRedirectedCacheableResponsesPlugin&&(a===y.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(y.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}y.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},y.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await async function(t,s){let a=null;if(t.url&&(a=new URL(t.url).origin),a!==self.location.origin)throw new e("cross-origin-copy-response",{origin:a});const r=t.clone(),n={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},i=s?s(n):n,c=function(){if(void 0===h){const e=new Response("");if("body"in e)try{new Response(e.body),h=!0}catch(e){h=!1}h=!1}return h}()?r.body:await r.blob();return new Response(c,i)}(t):t};class w{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new y({cacheName:r(e),plugins:[...t,new o({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(t){const s=[];for(const a of t){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:t,url:r}=i(a),n="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:t});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(t)&&this._cacheKeysToIntegrities.get(t)!==a.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(t,a.integrity)}if(this._urlsToCacheKeys.set(r,t),this._urlsToCacheModes.set(r,n),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return n(e,(async()=>{const t=new c;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),r=this._urlsToCacheModes.get(t),n=new Request(t,{integrity:a,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:n,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return n(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const r of t)s.has(r.url)||(await e.delete(r),a.push(r.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(!s)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params={cacheKey:s,...e.params},this.strategy.handle(e))}}let g;const m=()=>(g||(g=new w),g);s(80);const _=e=>e&&"object"==typeof e?e:{handle:e};class R{constructor(e,t,s="GET"){this.handler=_(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=_(e)}}class v extends R{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class C{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const a=s.origin===location.origin,{params:r,route:n}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:s});let i=n&&n.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:r})}catch(e){o=Promise.reject(e)}const h=n&&n.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async a=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:r})}catch(e){a=e}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw a}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){const r=this._routes.get(s.method)||[];for(const n of r){let r;const i=n.match({url:e,sameOrigin:t,request:s,event:a});if(i)return r=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(r=void 0),{route:n,params:r}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,_(e))}setCatchHandler(e){this._catchHandler=_(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this._routes.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(s,1)}}let b;class U extends R{constructor(e,t){super((({request:s})=>{const a=e.getURLsToCacheKeys();for(const e of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:r}={}){const n=new URL(e,location.href);n.hash="",yield n.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(n,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:n});for(const t of e)yield t.href}}(s.url,t)){const t=a.get(e);if(t)return{cacheKey:t}}}),e.strategy)}}var L;L=[{'revision':'3c4303b4fd0cf1aed32621ff59b175c6','url':'assets/img/Fishing_vessel_1.png'},{'revision':'f34cb8635f622824124d8c85057d9dfa','url':'assets/img/chain.png'},{'revision':'ba79c0c2a936809be13ea7e99b8dbdf7','url':'assets/img/claw.png'},{'revision':'8079f0cceebac295192293b106e265ab','url':'assets/img/fish.png'},{'revision':'c47fb610e006ac3a9134451509e26026','url':'assets/img/fish/fish1/fish.png'},{'revision':'9b927dd428f7c1c8bf81f138aa5528f3','url':'assets/img/fish/fish1/layer1.png'},{'revision':'1bb3f51208a74efb5273f46e37506d65','url':'assets/img/fish/fish1/layer2.png'},{'revision':'5e7c2e53ae9316ee7fda883d6d7728e0','url':'assets/img/fish/fish2/fish.png'},{'revision':'efa9de2badffc5b2187e245b07982b73','url':'assets/img/fish/fish2/layer1.png'},{'revision':'b06630d02a76a3bde08d78856e3ec503','url':'assets/img/fish/fish2/layer2.png'},{'revision':'124dc11553d56fb234a011abf5f2e40e','url':'assets/img/fish/fish3/fish.png'},{'revision':'8619aa2fd861dfdfcf971eb55d27624f','url':'assets/img/fish/fish3/layer1.png'},{'revision':'1070a693cbe2483ae9cd46931b44f547','url':'assets/img/fish/fish3/layer2.png'},{'revision':'e571d530523f97004311bc3b29807d13','url':'assets/img/fish/fish4/fish.png'},{'revision':'0ca1887df2f4afb24dbf3787673fbcf3','url':'assets/img/fish/fish4/layer1.png'},{'revision':'545c488f87078820a2e911b5edab547e','url':'assets/img/fish/fish4/layer2.png'},{'revision':'acd5d870f29ea691bd8ea60f794fdb4b','url':'assets/img/mine.png'},{'revision':'f2bd5f6fa45611bbc89f6dc5e6d111a2','url':'assets/img/shark.png'},{'revision':'1ec459c0c89875aab77927f7c06a248f','url':'assets/img/submarine.png'},{'revision':'f77c639d4c1574ab460627b1b1108f33','url':'assets/img/tiles/wall.png'},{'revision':'f7117db8c3e7551f653338c522d7d629','url':'assets/img/ui/Big_Button.png'},{'revision':'e75d5d9aa1d621ace64c7db5268849c9','url':'assets/img/ui/Button_Blue.png'},{'revision':'9ab2433d9d9ab265ca82dda9ed402c51','url':'assets/img/ui/Little_Button.png'},{'revision':'7c715782ff6d2b4e5bfc56216e7977e5','url':'assets/img/ui/Main_Menu.png'},{'revision':'ea88288a8a7d935a8170ebf1ac563c44','url':'assets/img/ui/Menu_Panel.png'},{'revision':'3faaa349f2920dffa2edbc8e56bf8ebf','url':'assets/img/ui/Play_Button.png'},{'revision':'b649ab6cd4819fad4285c30ab1785eca','url':'assets/img/ui/button_background.png'},{'revision':'ed4c74414c5f932db258b1b324f7b84e','url':'assets/img/ui/button_background_2.png'},{'revision':'9649a26a70286917ba77b15b842c7522','url':'assets/img/ui/menu_background.png'},{'revision':'246589a4a293b2d355a2902290f8f8fd','url':'assets/img/ui/prompts/A_Key_Light.png'},{'revision':'15ac24dc46fa84248be322e2893295a3','url':'assets/img/ui/prompts/D_Key_Light.png'},{'revision':'27339720a66e5a559fd4bdce1cbab1a7','url':'assets/img/ui/prompts/Mouse_Simple_Key_Light.png'},{'revision':'f3c7db8439b3fde7db078cc8598ba338','url':'assets/img/ui/prompts/S_Key_Light.png'},{'revision':'6b7869f34cceed2802851ae5714ee181','url':'assets/img/ui/prompts/W_Key_Light.png'},{'revision':'e087074bf874b21074ba30dfc4ef526b','url':'assets/img/ui/prompts/credits.txt'},{'revision':'5fb0d959f13d744a88d080b6b855fbc6','url':'assets/img/ui/sell_fish_button.png'},{'revision':'f117e5f446ea8f6370519af40b02b817','url':'assets/json/collision.json'},{'revision':'e2c2ee5db566415c530f07ad36020053','url':'assets/pes/collision-data.pes'},{'revision':'57040e5677322118f6d56a1d9e43c5c6','url':'favicon.ico'},{'revision':'2ffbc23293ee8a797bc61e9c02534206','url':'icons/icons-192.png'},{'revision':'8bdcc486cda9b423f50e886f2ddb6604','url':'icons/icons-512.png'},{'revision':'536df3190a5c5b36b601657ed23addec','url':'index.html'},{'revision':null,'url':'main.5e171b77432b17b2dab5.bundle.js'},{'revision':'bce522c56cb3f14ea2e70f00ad566f9d','url':'main.5e171b77432b17b2dab5.bundle.js.LICENSE.txt'},{'revision':'bf38d0c9760162342f12cd9b44fbf4ef','url':'manifest.json'},{'revision':null,'url':'vendors.a2dadd2b2fd8c9d9643a.bundle.js'},{'revision':'fbc1173afdd4de88faa77d1382453c93','url':'vendors.a2dadd2b2fd8c9d9643a.bundle.js.LICENSE.txt'}],m().precache(L),function(t){const s=m();!function(t,s,a){let r;if("string"==typeof t){const e=new URL(t,location.href);r=new R((({url:t})=>t.href===e.href),s,a)}else if(t instanceof RegExp)r=new v(t,s,a);else if("function"==typeof t)r=new R(t,s,a);else{if(!(t instanceof R))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=t}(b||(b=new C,b.addFetchListener(),b.addCacheListener()),b).registerRoute(r)}(new U(s,t))}(undefined)})()})();