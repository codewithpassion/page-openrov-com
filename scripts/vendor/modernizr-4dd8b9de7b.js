'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(b){return typeof b}:function(b){return b&&'function'==typeof Symbol&&b.constructor===Symbol&&b!==Symbol.prototype?'symbol':typeof b};window.Modernizr=function(b,c,d){function f(S){w.cssText=S}function g(S,T){return f(A.join(S+';')+(T||''))}function h(S,T){return('undefined'==typeof S?'undefined':_typeof(S))===T}function j(S,T){return!!~(''+S).indexOf(T)}function k(S,T){for(var U in S){var V=S[U];if(!j(V,'-')&&w[V]!==d)return'pfx'!=T||V}return!1}function m(S,T,U){for(var V in S){var W=T[S[V]];if(W!==d)return!1===U?S[V]:h(W,'function')?W.bind(U||T):W}return!1}function n(S,T,U){var V=S.charAt(0).toUpperCase()+S.slice(1),W=(S+' '+C.join(V+' ')+V).split(' ');return h(T,'string')||h(T,'undefined')?k(W,T):(W=(S+' '+D.join(V+' ')+V).split(' '),m(W,T,U))}var L,Q,r={},t=c.documentElement,u='modernizr',v=c.createElement(u),w=v.style,x=c.createElement('input'),y=':)',z={}.toString,A=' -webkit- -moz- -o- -ms- '.split(' '),B='Webkit Moz O ms',C=B.split(' '),D=B.toLowerCase().split(' '),E={svg:'http://www.w3.org/2000/svg'},G={},H={},I={},J=[],K=J.slice,M=function injectElementWithStyles(S,T,U,V){var W,X,Y,Z,$=c.createElement('div'),_=c.body,aa=_||c.createElement('body');if(parseInt(U,10))for(;U--;)Y=c.createElement('div'),Y.id=V?V[U]:u+(U+1),$.appendChild(Y);return W=['&#173;','<style id="s',u,'">',S,'</style>'].join(''),$.id=u,(_?$:aa).innerHTML+=W,aa.appendChild($),_||(aa.style.background='',aa.style.overflow='hidden',Z=t.style.overflow,t.style.overflow='hidden',t.appendChild(aa)),X=T($,S),_?$.parentNode.removeChild($):(aa.parentNode.removeChild(aa),t.style.overflow=Z),!!X},O=function(){var T={select:'input',change:'input',submit:'form',reset:'form',error:'img',load:'img',abort:'img'};return function(U,V){V=V||c.createElement(T[U]||'div'),U='on'+U;var W=U in V;return W||(!V.setAttribute&&(V=c.createElement('div')),V.setAttribute&&V.removeAttribute&&(V.setAttribute(U,''),W=h(V[U],'function'),!h(V[U],'undefined')&&(V[U]=d),V.removeAttribute(U))),V=null,W}}(),P={}.hasOwnProperty;for(var R in Q=h(P,'undefined')||h(P.call,'undefined')?function hasOwnProp(S,T){return T in S&&h(S.constructor.prototype[T],'undefined')}:function hasOwnProp(S,T){return P.call(S,T)},Function.prototype.bind||(Function.prototype.bind=function(T){var U=this;if('function'!=typeof U)throw new TypeError;var V=K.call(arguments,1),W=function bound(){if(this instanceof W){var X=function F(){};X.prototype=U.prototype;var Y=new X,Z=U.apply(Y,V.concat(K.call(arguments)));return Object(Z)===Z?Z:Y}return U.apply(T,V.concat(K.call(arguments)))};return W}),G.flexbox=function(){return n('flexWrap')},G.flexboxlegacy=function(){return n('boxDirection')},G.canvas=function(){var S=c.createElement('canvas');return!!(S.getContext&&S.getContext('2d'))},G.canvastext=function(){return!!(r.canvas&&h(c.createElement('canvas').getContext('2d').fillText,'function'))},G.webgl=function(){return!!b.WebGLRenderingContext},G.touch=function(){var S;return'ontouchstart'in b||b.DocumentTouch&&c instanceof DocumentTouch?S=!0:M(['@media (',A.join('touch-enabled),('),u,')','{#modernizr{top:9px;position:absolute}}'].join(''),function(T){S=9===T.offsetTop}),S},G.geolocation=function(){return'geolocation'in navigator},G.postmessage=function(){return!!b.postMessage},G.websqldatabase=function(){return!!b.openDatabase},G.indexedDB=function(){return!!n('indexedDB',b)},G.hashchange=function(){return O('hashchange',b)&&(c.documentMode===d||7<c.documentMode)},G.history=function(){return!!(b.history&&history.pushState)},G.draganddrop=function(){var S=c.createElement('div');return'draggable'in S||'ondragstart'in S&&'ondrop'in S},G.websockets=function(){return'WebSocket'in b||'MozWebSocket'in b},G.rgba=function(){return f('background-color:rgba(150,255,150,.5)'),j(w.backgroundColor,'rgba')},G.hsla=function(){return f('background-color:hsla(120,40%,100%,.5)'),j(w.backgroundColor,'rgba')||j(w.backgroundColor,'hsla')},G.multiplebgs=function(){return f('background:url(https://),url(https://),red url(https://)'),/(url\s*\(.*?){3}/.test(w.background)},G.backgroundsize=function(){return n('backgroundSize')},G.borderimage=function(){return n('borderImage')},G.borderradius=function(){return n('borderRadius')},G.boxshadow=function(){return n('boxShadow')},G.textshadow=function(){return''===c.createElement('div').style.textShadow},G.opacity=function(){return g('opacity:.55'),/^0.55$/.test(w.opacity)},G.cssanimations=function(){return n('animationName')},G.csscolumns=function(){return n('columnCount')},G.cssgradients=function(){var S='background-image:';return f((S+'-webkit- '.split(' ').join('gradient(linear,left top,right bottom,from(#9f9),to(white));'+S)+A.join('linear-gradient(left top,#9f9, white);'+S)).slice(0,-S.length)),j(w.backgroundImage,'gradient')},G.cssreflections=function(){return n('boxReflect')},G.csstransforms=function(){return!!n('transform')},G.csstransforms3d=function(){var S=!!n('perspective');return S&&'webkitPerspective'in t.style&&M('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}',function(T){S=9===T.offsetLeft&&3===T.offsetHeight}),S},G.csstransitions=function(){return n('transition')},G.fontface=function(){var S;return M('@font-face {font-family:"font";src:url("https://")}',function(T,U){var V=c.getElementById('smodernizr'),W=V.sheet||V.styleSheet,X=W?W.cssRules&&W.cssRules[0]?W.cssRules[0].cssText:W.cssText||'':'';S=/src/i.test(X)&&0===X.indexOf(U.split(' ')[0])}),S},G.generatedcontent=function(){var S;return M(['#',u,'{font:0/0 a}#',u,':after{content:"',y,'";visibility:hidden;font:3px/1 a}'].join(''),function(T){S=3<=T.offsetHeight}),S},G.video=function(){var S=c.createElement('video'),T=!1;try{(T=!!S.canPlayType)&&(T=new Boolean(T),T.ogg=S.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,''),T.h264=S.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,''),T.webm=S.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,''))}catch(U){}return T},G.audio=function(){var S=c.createElement('audio'),T=!1;try{(T=!!S.canPlayType)&&(T=new Boolean(T),T.ogg=S.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,''),T.mp3=S.canPlayType('audio/mpeg;').replace(/^no$/,''),T.wav=S.canPlayType('audio/wav; codecs="1"').replace(/^no$/,''),T.m4a=(S.canPlayType('audio/x-m4a;')||S.canPlayType('audio/aac;')).replace(/^no$/,''))}catch(U){}return T},G.localstorage=function(){try{return localStorage.setItem(u,u),localStorage.removeItem(u),!0}catch(S){return!1}},G.sessionstorage=function(){try{return sessionStorage.setItem(u,u),sessionStorage.removeItem(u),!0}catch(S){return!1}},G.webworkers=function(){return!!b.Worker},G.applicationcache=function(){return!!b.applicationCache},G.svg=function(){return!!c.createElementNS&&!!c.createElementNS(E.svg,'svg').createSVGRect},G.inlinesvg=function(){var S=c.createElement('div');return S.innerHTML='<svg/>',(S.firstChild&&S.firstChild.namespaceURI)==E.svg},G.smil=function(){return!!c.createElementNS&&/SVGAnimate/.test(z.call(c.createElementNS(E.svg,'animate')))},G.svgclippaths=function(){return!!c.createElementNS&&/SVGClipPath/.test(z.call(c.createElementNS(E.svg,'clipPath')))},G)Q(G,R)&&(L=R.toLowerCase(),r[L]=G[R](),J.push((r[L]?'':'no-')+L));return r.input||function(){r.input=function(S){for(var T=0,U=S.length;T<U;T++)I[S[T]]=!!(S[T]in x);return I.list&&(I.list=!!(c.createElement('datalist')&&b.HTMLDataListElement)),I}('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' ')),r.inputtypes=function(S){for(var U,V,W,T=0,X=S.length;T<X;T++)x.setAttribute('type',V=S[T]),U='text'!==x.type,U&&(x.value=y,x.style.cssText='position:absolute;visibility:hidden;',/^range$/.test(V)&&x.style.WebkitAppearance!==d?(t.appendChild(x),W=c.defaultView,U=W.getComputedStyle&&'textfield'!==W.getComputedStyle(x,null).WebkitAppearance&&0!==x.offsetHeight,t.removeChild(x)):/^(search|tel)$/.test(V)||(/^(url|email)$/.test(V)?U=x.checkValidity&&!1===x.checkValidity():U=x.value!=y)),H[S[T]]=!!U;return H}('search tel url email datetime date month week time datetime-local number range color'.split(' '))}(),r.addTest=function(S,T){if('object'==('undefined'==typeof S?'undefined':_typeof(S)))for(var U in S)Q(S,U)&&r.addTest(U,S[U]);else{if(S=S.toLowerCase(),r[S]!==d)return r;T='function'==typeof T?T():T,t.className+=' '+(T?'':'no-')+S,r[S]=T}return r},f(''),v=x=null,(function(S,T){function U(ja,ka){var la=ja.createElement('p'),ma=ja.getElementsByTagName('head')[0]||ja.documentElement;return la.innerHTML='x<style>'+ka+'</style>',ma.insertBefore(la.lastChild,ma.firstChild)}function V(){var ja=ia.elements;return'string'==typeof ja?ja.split(' '):ja}function W(ja){var ka=ga[ja[ea]];return ka||(ka={},fa++,ja[ea]=fa,ga[fa]=ka),ka}function X(ja,ka,la){if(ka||(ka=T),ha)return ka.createElement(ja);la||(la=W(ka));var ma;return ma=la.cache[ja]?la.cache[ja].cloneNode():ca.test(ja)?(la.cache[ja]=la.createElem(ja)).cloneNode():la.createElem(ja),!ma.canHaveChildren||ba.test(ja)||ma.tagUrn?ma:la.frag.appendChild(ma)}function Z(ja,ka){ka.cache||(ka.cache={},ka.createElem=ja.createElement,ka.createFrag=ja.createDocumentFragment,ka.frag=ka.createFrag()),ja.createElement=function(la){return ia.shivMethods?X(la,ja,ka):ka.createElem(la)},ja.createDocumentFragment=Function('h,f','return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&('+V().join().replace(/[\w\-]+/g,function(la){return ka.createElem(la),ka.frag.createElement(la),'c("'+la+'")'})+');return n}')(ia,ka.frag)}function $(ja){ja||(ja=T);var ka=W(ja);return!ia.shivCSS||da||ka.hasCSS||(ka.hasCSS=!!U(ja,'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}')),ha||Z(ja,ka),ja}var da,ha,aa=S.html5||{},ba=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,ca=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,ea='_html5shiv',fa=0,ga={};(function(){try{var ja=T.createElement('a');ja.innerHTML='<xyz></xyz>',da='hidden'in ja,ha=1==ja.childNodes.length||function(){T.createElement('a');var ka=T.createDocumentFragment();return'undefined'==typeof ka.cloneNode||'undefined'==typeof ka.createDocumentFragment||'undefined'==typeof ka.createElement}()}catch(ka){da=!0,ha=!0}})();var ia={elements:aa.elements||'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',version:'3.7.0',shivCSS:!1!==aa.shivCSS,supportsUnknownElements:ha,shivMethods:!1!==aa.shivMethods,type:'default',shivDocument:$,createElement:X,createDocumentFragment:function(ja,ka){if(ja||(ja=T),ha)return ja.createDocumentFragment();ka=ka||W(ja);for(var la=ka.frag.cloneNode(),ma=0,na=V(),oa=na.length;ma<oa;ma++)la.createElement(na[ma]);return la}};S.html5=ia,$(T)}(this,c),r._version='2.8.3',r._prefixes=A,r._domPrefixes=D,r._cssomPrefixes=C,r.mq=function testMediaQuery(S){var T=b.matchMedia||b.msMatchMedia;if(T)return T(S)&&T(S).matches||!1;var U;return M('@media '+S+' { #'+u+' { position: absolute; } }',function(V){U='absolute'==(b.getComputedStyle?getComputedStyle(V,null):V.currentStyle).position}),U},r.hasEvent=O,r.testProp=function(S){return k([S])},r.testAllProps=n,r.testStyles=M,r.prefixed=function(S,T,U){return T?n(S,T,U):n(S,'pfx')},t.className=t.className.replace(/(^|\s)no-js(\s|$)/,'$1$2')+(' js '+J.join(' ')),r)}(void 0,(void 0).document);