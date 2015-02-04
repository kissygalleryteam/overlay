KISSY.add("kg/overlay/0.0.1/extension/loading",["node"],function(c,b){var a=b("node");function d(){}d.prototype={loading:function(){var e=this;if(!e._loadingExtEl){e._loadingExtEl=(new a('<div class="'+e.get("prefixCls")+'ext-loading" style="position: absolute;border: none;width: 100%;top: 0;left: 0;z-index: 99999;height:100%;*height: expression(this.parentNode.offsetHeight);"/>')).appendTo(e.$el)}e._loadingExtEl.show()},unloading:function(){var e=this._loadingExtEl;if(e){e.hide()}}};return d});KISSY.add("kg/overlay/0.0.1/extension/mask",["node"],function(h,b){var k=h.UA,l=b("node"),f=k.ie===6,i=l.all;function j(){return f?"expression(KISSY.DOM.docWidth())":"100%"}function o(){return f?"expression(KISSY.DOM.docHeight())":"100%"}function g(q,r){var s=q.view.getBaseCssClasses("mask"),p=i('<div  style="width:'+j()+";left:0;top:0;height:"+o()+";position:"+(f?"absolute":"fixed")+';" class="'+s+" "+r+'">'+(f?'<iframe style="position:absolute;left:0;top:0;background:red;width: expression(this.parentNode.offsetWidth);height: expression(this.parentNode.offsetHeight);filter:alpha(opacity=0);z-index:-1;"></iframe>':"")+"</div>").prependTo("body");p.unselectable();p.on("mousedown",function(t){t.preventDefault()});return p}function e(){}e.ATTRS={mask:{value:false},maskNode:{}};var m="none",a={fade:["Out","In"],slide:["Up","Down"]};function d(p,r){var s=p.get("maskNode"),q=p.view.getBaseCssClasses("mask-hidden");if(r){s.removeClass(q)}else{s.addClass(q)}}function c(x,p,u,v){var w=x.effect||m;d(v,u);if(w===m){return}var r=x.duration,t=x.easing,q,s=u?1:0;p.stop(1,1);p.css("display",u?m:"block");q=w+a[w][s];p[q](r,function(){p.css("display","")},t)}function n(t){var r,q=this,s=q.get("maskNode");if(r=t.newVal){var p=Number(q.$el.css("z-index"));if(!isNaN(p)){s.css("z-index",p)}}c(q.get("mask"),s,r,q)}e.prototype={__renderUI:function(){var p=this;if(p.get("mask")){p.set("maskNode",g(p,p.get("visible")?"":p.view.getBaseCssClasses("mask-hidden")))}},__bindUI:function(){var q=this,r,p;if(p=q.get("mask")){r=q.get("maskNode");if(p.closeOnClick){r.on(l.Gesture.tap,q.close,q)}q.on("afterVisibleChange",n)}},__destructor:function(){var p;if(p=this.get("maskNode")){p.remove()}}};return e});KISSY.add("kg/overlay/0.0.1/close-xtpl",[],function(d,b,a,c){return function(t,i,g){var j="",f=this.config,n=this,e,q=f.utils;if(typeof c!=="undefined"&&c.kissy){e=c}var o=q.runBlockCommand,m=q.renderOutput,l=q.getProperty,s=q.runInlineCommand,h=q.getPropertyOrRunCommand;j+="";var k={};var p=[];var r=l(n,t,"closable",0,1);p.push(r);k.params=p;k.fn=function(C){var w="";w+='\n<a href="javascript:void(\'close\')"\n   id="ks-overlay-close-';var B=h(n,C,{},"id",0,3);w+=m(B,true);w+='"\n   class="';var v={};var y=[];y.push("close");v.params=y;var A=s(n,C,v,"getBaseCssClasses",4);w+=m(A,true);w+="\"\n   role='button'>\n    <span class=\"";var u={};var x=[];x.push("close-x");u.params=x;var z=s(n,C,u,"getBaseCssClasses",6);w+=m(z,true);w+='">close</span>\n</a>\n';return w};j+=o(n,t,k,"if",1);j+="\n";return j}});KISSY.add("kg/overlay/0.0.1/overlay-xtpl",["kg/overlay/0.0.1/close-xtpl","component/extension/content-xtpl"],function(d,b,a,c){return function(f,i,j){var q="",w=this.config,v=this,g,t=w.utils;if(typeof c!=="undefined"&&c.kissy){g=c}var m=t.runBlockCommand,n=t.renderOutput,o=t.getProperty,l=t.runInlineCommand,k=t.getPropertyOrRunCommand;q+="";var u={};var r=[];r.push("kg/overlay/0.0.1/close-xtpl");u.params=r;if(g){b("kg/overlay/0.0.1/close-xtpl");u.params[0]=g.resolveByName(u.params[0])}var h=l(v,f,u,"include",1);q+=n(h,false);q+="\n";var s={};var p=[];p.push("component/extension/content-xtpl");s.params=p;if(g){b("component/extension/content-xtpl");s.params[0]=g.resolveByName(s.params[0])}var e=l(v,f,s,"include",2);q+=n(e,false);return q}});KISSY.add("kg/overlay/0.0.1/overlay-render",["component/container","./overlay-xtpl","component/extension/content-render"],function(c,b){var a=b("component/container");var e=b("./overlay-xtpl");var d=b("component/extension/content-render");return a.getDefaultRender().extend([d],{createDom:function(){this.fillChildrenElsBySelectors({closeBtn:"#ks-overlay-close-{id}"})}},{ATTRS:{contentTpl:{value:e}},HTML_PARSER:{closeBtn:function(f){return f.one("."+this.getBaseCssClass("close"))}}})});KISSY.add("kg/overlay/0.0.1/extension/overlay-effect",[],function(c){var d={fade:["Out","In"],slide:["Up","Down"]};function b(g){var h=g.$el,i=h.clone(true);i.css({visibility:"visible",overflow:"hidden"}).addClass(g.get("prefixCls")+"overlay-ghost");return g.__afterCreateEffectGhost(i)}function a(u,r){if(u.__effectGhost){u.__effectGhost.stop(1,1)}var h=u.$el,j=c.all,k=u.get("effect"),m=j(k.target),i=k.duration,o={width:m.width(),height:m.height()},w=m.offset(),l={width:h.width(),height:h.height()},t=h.offset(),q,p,s,g,v=b(u),n=k.easing;v.insertAfter(h);if(r){q=o;s=w;p=l;g=t}else{q=l;s=t;p=o;g=w}v.offset(g);c.mix(p,{left:v.css("left"),top:v.css("top")});h.css("visibility","hidden");v.css(q);v.offset(s);u.__effectGhost=v;v.css("visibility","visible");v.animate(p,{Anim:k.Anim,duration:i,easing:n,complete:function(){u.__effectGhost=null;v.remove();h.css("visibility","")}})}function e(q,o,p){var g=q.$el,j=q.get("effect"),r=j.effect||"none",l=j.target;if(r==="none"&&!l){p();return}if(l){a(q,o,p);return}var i=j.duration,n=j.easing,k=o?1:0;g.stop(1,1);g.css({visibility:"visible",display:o?"none":"block"});var h=r+d[r][k];g[h](i,function(){g.css({display:"block",visibility:""});p()},n)}function f(){}f.ATTRS={effect:{value:{effect:"",target:null,duration:0.5,easing:"easeOut"},setter:function(g){var h=g.effect;if(typeof h==="string"&&!d[h]){g.effect=""}}}};f.prototype={__afterCreateEffectGhost:function(g){return g},_onSetVisible:function(h){var g=this;e(g,h,function(){g.fire(h?"show":"hide")})}};return f});KISSY.add("kg/overlay/0.0.1/control",["component/container","component/extension/shim","component/extension/align","./extension/loading","./extension/mask","./overlay-render","./extension/overlay-effect"],function(f,b){var c=b("component/container");var h=b("component/extension/shim");var j=b("component/extension/align");var i=b("./extension/loading");var d=b("./extension/mask");var a=b("./overlay-render");var k=b("./extension/overlay-effect");var g="hide",e={hide:g,destroy:"destroy"};return c.extend([h,i,j,d,k],{bindUI:function(){var l=this,m=l.get("closeBtn");if(m){m.on("click",function(n){l.close();n.preventDefault()})}},close:function(){var l=this;l[e[l.get("closeAction")]||g]();return l}},{ATTRS:{contentEl:{},closable:{value:false,view:1},closeBtn:{view:1},closeAction:{value:g},focusable:{value:false},allowTextSelection:{value:true},handleMouseEvents:{value:false},visible:{value:false},xrender:{value:a}},xclass:"overlay"})});KISSY.add("kg/overlay/0.0.1/dialog-xtpl",["kg/overlay/0.0.1/close-xtpl"],function(d,b,a,c){return function(J,g,q){var w="",K=this.config,k=this,M,W=K.utils;if(typeof c!=="undefined"&&c.kissy){M=c}var n=W.runBlockCommand,j=W.renderOutput,D=W.getProperty,v=W.runInlineCommand,N=W.getPropertyOrRunCommand;w+="";var f={};var r=[];r.push("kg/overlay/0.0.1/close-xtpl");f.params=r;if(M){b("kg/overlay/0.0.1/close-xtpl");f.params[0]=M.resolveByName(f.params[0])}var I=v(k,J,f,"include",1);w+=j(I,false);w+='\n<div id="ks-content-';var G=N(k,J,{},"id",0,2);w+=j(G,true);w+='"\n     class="';var U={};var p=[];p.push("content");U.params=p;var F=v(k,J,U,"getBaseCssClasses",3);w+=j(F,true);w+='">\n    <div class="';var Q={};var l=[];l.push("header");Q.params=l;var B=v(k,J,Q,"getBaseCssClasses",4);w+=j(B,true);w+='"\n         style="\n';var y={};var m=[];var e=D(k,J,"headerStyle",0,6);m.push(e);y.params=m;y.fn=function(Z){var X="";X+=" \n ";var Y=N(k,Z,{},"xindex",0,7);X+=j(Y,true);X+=":";var S=N(k,Z,{},".",0,7);X+=j(S,true);X+=";\n";return X};w+=n(k,J,y,"each",6);w+='\n"\n         id="ks-stdmod-header-';var V=N(k,J,{},"id",0,10);w+=j(V,true);w+='">';var T=N(k,J,{},"headerContent",0,10);w+=j(T,false);w+='</div>\n\n    <div class="';var x={};var h=[];h.push("body");x.params=h;var R=v(k,J,x,"getBaseCssClasses",12);w+=j(R,true);w+='"\n         style="\n';var o={};var O=[];var H=D(k,J,"bodyStyle",0,14);O.push(H);o.params=O;o.fn=function(Z){var S="";S+=" \n ";var Y=N(k,Z,{},"xindex",0,15);S+=j(Y,true);S+=":";var X=N(k,Z,{},".",0,15);S+=j(X,true);S+=";\n";return S};w+=n(k,J,o,"each",14);w+='\n"\n         id="ks-stdmod-body-';var E=N(k,J,{},"id",0,18);w+=j(E,true);w+='">';var C=N(k,J,{},"bodyContent",0,18);w+=j(C,false);w+='</div>\n\n    <div class="';var i={};var L=[];L.push("footer");i.params=L;var A=v(k,J,i,"getBaseCssClasses",20);w+=j(A,true);w+='"\n         style="\n';var P={};var z=[];var u=D(k,J,"footerStyle",0,22);z.push(u);P.params=z;P.fn=function(Y){var S="";S+=" \n ";var Z=N(k,Y,{},"xindex",0,23);S+=j(Z,true);S+=":";var X=N(k,Y,{},".",0,23);S+=j(X,true);S+=";\n";return S};w+=n(k,J,P,"each",22);w+='\n"\n         id="ks-stdmod-footer-';var t=N(k,J,{},"id",0,26);w+=j(t,true);w+='">';var s=N(k,J,{},"footerContent",0,26);w+=j(s,false);w+='</div>\n</div>\n<div tabindex="0"></div>';return w}});KISSY.add("kg/overlay/0.0.1/dialog-render",["./overlay-render","./dialog-xtpl"],function(b,a){var e=a("./overlay-render");var d=a("./dialog-xtpl");function c(g,h,f){h=g.control.get(h);h.html(f)}return e.extend({beforeCreateDom:function(f){b.mix(f.elAttrs,{role:"dialog","aria-labelledby":"ks-stdmod-header-"+this.control.get("id")})},createDom:function(){this.fillChildrenElsBySelectors({header:"#ks-stdmod-header-{id}",body:"#ks-stdmod-body-{id}",footer:"#ks-stdmod-footer-{id}"})},getChildrenContainerEl:function(){return this.control.get("body")},_onSetBodyStyle:function(f){this.control.get("body").css(f)},_onSetHeaderStyle:function(f){this.control.get("header").css(f)},_onSetFooterStyle:function(f){this.control.get("footer").css(f)},_onSetBodyContent:function(f){c(this,"body",f)},_onSetHeaderContent:function(f){c(this,"header",f)},_onSetFooterContent:function(f){c(this,"footer",f)}},{ATTRS:{contentTpl:{value:d}},HTML_PARSER:{header:function(f){return f.one("."+this.getBaseCssClass("header"))},body:function(f){return f.one("."+this.getBaseCssClass("body"))},footer:function(f){return f.one("."+this.getBaseCssClass("footer"))},headerContent:function(f){return f.one("."+this.getBaseCssClass("header")).html()},bodyContent:function(f){return f.one("."+this.getBaseCssClass("body")).html()},footerContent:function(f){var g=f.one("."+this.getBaseCssClass("footer"));return g&&g.html()}}})});KISSY.add("kg/overlay/0.0.1/dialog",["./control","./dialog-render","node"],function(e,d){var b=d("./control");var g=d("./dialog-render");var c=d("node");var a=b.extend({__afterCreateEffectGhost:function(k){var i=this,j=i.get("body");k.all("."+i.get("prefixCls")+"stdmod-body").css({height:j.height(),width:j.width()}).html("");return k},handleKeyDownInternal:function(i){if(this.get("escapeToClose")&&i.keyCode===c.KeyCode.ESC){if(!(i.target.nodeName.toLowerCase()==="select"&&!i.target.disabled)){this.close();i.halt()}return}f.call(this,i)},_onSetVisible:function(k,m){var j=this,l=j.el;if(k){j.__lastActive=l.ownerDocument.activeElement;j.focus();l.setAttribute("aria-hidden","false")}else{l.setAttribute("aria-hidden","true");try{if(j.__lastActive){j.__lastActive.focus()}}catch(i){}}j.callSuper(k,m)}},{ATTRS:{header:{view:1},body:{view:1},footer:{view:1},bodyStyle:{value:{},view:1},footerStyle:{value:{},view:1},headerStyle:{value:{},view:1},headerContent:{value:"",view:1},bodyContent:{value:"",view:1},footerContent:{value:"",view:1},closable:{value:true},xrender:{value:g},focusable:{value:true},escapeToClose:{value:true}},xclass:"dialog"});var h=c.KeyCode.TAB;function f(n){var i=this,m=n.keyCode;if(m!==h){return}var j=i.$el;var l=c.all(n.target);var k=j.last();if(l.equals(j)&&n.shiftKey){k[0].focus();n.halt()}else{if(l.equals(k)&&!n.shiftKey){i.focus();n.halt()}else{if(l.equals(j)||j.contains(l)){return}}}n.halt()}return a});KISSY.add("kg/overlay/0.0.1/popup",["./control"],function(c,b){var a=b("./control");return a.extend({initializer:function(){var d=this,e=d.get("trigger");if(e){if(d.get("triggerType")==="mouse"){d._bindTriggerMouse();d.on("afterRenderUI",function(){d._bindContainerMouse()})}else{d._bindTriggerClick()}}},_bindTriggerMouse:function(){var d=this,e=d.get("trigger"),f;d.__mouseEnterPopup=function(g){d._clearHiddenTimer();f=c.later(function(){d._showing(g);f=undefined},d.get("mouseDelay")*1000)};e.on("mouseenter",d.__mouseEnterPopup);d._mouseLeavePopup=function(){if(f){f.cancel();f=undefined}d._setHiddenTimer()};e.on("mouseleave",d._mouseLeavePopup)},_bindContainerMouse:function(){var d=this;d.$el.on("mouseleave",d._setHiddenTimer,d).on("mouseenter",d._clearHiddenTimer,d)},_setHiddenTimer:function(){var d=this;d._hiddenTimer=c.later(function(){d._hiding()},d.get("mouseDelay")*1000)},_clearHiddenTimer:function(){var d=this;if(d._hiddenTimer){d._hiddenTimer.cancel();d._hiddenTimer=undefined}},_bindTriggerClick:function(){var d=this;d.__clickPopup=function(e){e.preventDefault();if(d.get("toggle")){d[d.get("visible")?"_hiding":"_showing"](e)}else{d._showing(e)}};d.get("trigger").on("click",d.__clickPopup)},_showing:function(e){var d=this;d.set("currentTrigger",c.one(e.target));d.show()},_hiding:function(){this.set("currentTrigger",undefined);this.hide()},destructor:function(){var d=this,f=d.$el,e=d.get("trigger");if(e){if(d.__clickPopup){e.detach("click",d.__clickPopup)}if(d.__mouseEnterPopup){e.detach("mouseenter",d.__mouseEnterPopup)}if(d._mouseLeavePopup){e.detach("mouseleave",d._mouseLeavePopup)}}f.detach("mouseleave",d._setHiddenTimer,d).detach("mouseenter",d._clearHiddenTimer,d)}},{ATTRS:{trigger:{setter:function(d){return c.all(d)}},triggerType:{value:"click"},currentTrigger:{},mouseDelay:{value:0.1},toggle:{value:false}},xclass:"popup"})});KISSY.add("kg/overlay/0.0.1/index",["kg/overlay/0.0.1/control","kg/overlay/0.0.1/dialog","kg/overlay/0.0.1/popup"],function(b,a){var e=a("kg/overlay/0.0.1/control");var d=a("kg/overlay/0.0.1/dialog");var c=a("kg/overlay/0.0.1/popup");e.Dialog=d;b.Dialog=d;e.Popup=c;b.Overlay=e;return e});