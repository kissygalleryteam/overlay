/*compiled by xtemplate#3.7.1*/
var ret = module.exports = function dialog(undefined){
var t;
var t0;
var t1;
var t2;
var t3;
var t4;
var t5;
var t6;
var t7;
var t8;
var t9;
var tpl = this;
var root = tpl.root;
var buffer = tpl.buffer;
var scope = tpl.scope;
var runtime = tpl.runtime;
var name = tpl.name;
var pos = tpl.pos;
var data = scope.data;
var affix = scope.affix;
var nativeCommands = root.nativeCommands;
var utils = root.utils;
var callFnUtil = utils["callFn"];
var callCommandUtil = utils["callCommand"];
var rangeCommand = nativeCommands["range"];
var foreachCommand = nativeCommands["foreach"];
var forinCommand = nativeCommands["forin"];
var eachCommand = nativeCommands["each"];
var withCommand = nativeCommands["with"];
var ifCommand = nativeCommands["if"];
var setCommand = nativeCommands["set"];
var includeCommand = nativeCommands["include"];
var parseCommand = nativeCommands["parse"];
var extendCommand = nativeCommands["extend"];
var blockCommand = nativeCommands["block"];
var macroCommand = nativeCommands["macro"];
var debuggerCommand = nativeCommands["debugger"];
function func3(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\n ';
pos.line = 6;
var id4 = ((t=(affix.xindex)) !== undefined ? t:((t = data.xindex) !== undefined ? t :scope.resolveLooseUp(["xindex"])));
buffer = buffer.writeEscaped(id4);
buffer.data += ':';
var id5 = data;
buffer = buffer.writeEscaped(id5);
buffer.data += ';\n';
return buffer;
}
function func9(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\n ';
pos.line = 13;
var id10 = ((t=(affix.xindex)) !== undefined ? t:((t = data.xindex) !== undefined ? t :scope.resolveLooseUp(["xindex"])));
buffer = buffer.writeEscaped(id10);
buffer.data += ':';
var id11 = data;
buffer = buffer.writeEscaped(id11);
buffer.data += ';\n';
return buffer;
}
function func15(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\n ';
pos.line = 20;
var id16 = ((t=(affix.xindex)) !== undefined ? t:((t = data.xindex) !== undefined ? t :scope.resolveLooseUp(["xindex"])));
buffer = buffer.writeEscaped(id16);
buffer.data += ':';
var id17 = data;
buffer = buffer.writeEscaped(id17);
buffer.data += ';\n';
return buffer;
}
function func1(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\n    <div class="';
pos.line = 3;
var callRet2
callRet2 = callFnUtil(tpl, scope, {escape:1,params:['header']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet2);
buffer.data += '"\n         style="\n';
pos.line = 5;
pos.line = 5;
var id6 = ((t=(affix.headerStyle)) !== undefined ? t:((t = data.headerStyle) !== undefined ? t :scope.resolveLooseUp(["headerStyle"])));
buffer = eachCommand.call(tpl, scope, {params:[id6],fn: func3}, buffer);
buffer.data += '\n">';
pos.line = 8;
var id7 = ((t=(affix.headerContent)) !== undefined ? t:((t = data.headerContent) !== undefined ? t :scope.resolveLooseUp(["headerContent"])));
buffer = buffer.write(id7);
buffer.data += '</div>\n\n    <div class="';
pos.line = 10;
var callRet8
callRet8 = callFnUtil(tpl, scope, {escape:1,params:['body']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet8);
buffer.data += '"\n         style="\n';
pos.line = 12;
pos.line = 12;
var id12 = ((t=(affix.bodyStyle)) !== undefined ? t:((t = data.bodyStyle) !== undefined ? t :scope.resolveLooseUp(["bodyStyle"])));
buffer = eachCommand.call(tpl, scope, {params:[id12],fn: func9}, buffer);
buffer.data += '\n">';
pos.line = 15;
var id13 = ((t=(affix.bodyContent)) !== undefined ? t:((t = data.bodyContent) !== undefined ? t :scope.resolveLooseUp(["bodyContent"])));
buffer = buffer.write(id13);
buffer.data += '</div>\n\n    <div class="';
pos.line = 17;
var callRet14
callRet14 = callFnUtil(tpl, scope, {escape:1,params:['footer']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet14);
buffer.data += '"\n         style="\n';
pos.line = 19;
pos.line = 19;
var id18 = ((t=(affix.footerStyle)) !== undefined ? t:((t = data.footerStyle) !== undefined ? t :scope.resolveLooseUp(["footerStyle"])));
buffer = eachCommand.call(tpl, scope, {params:[id18],fn: func15}, buffer);
buffer.data += '\n">';
pos.line = 22;
var id19 = ((t=(affix.footerContent)) !== undefined ? t:((t = data.footerContent) !== undefined ? t :scope.resolveLooseUp(["footerContent"])));
buffer = buffer.write(id19);
buffer.data += '</div>\n    <div tabindex="0"></div>\n';
return buffer;
}


buffer.data += '';
var callRet0
runtime.extendTpl = {params:['./overlay']}
buffer = buffer.async(function(newBuffer){runtime.extendTplBuffer = newBuffer;});
runtime.extendTplFn = require({params:['./overlay']}.params[0])
buffer = buffer.write(callRet0);
buffer.data += '\n';
pos.line = 2;
buffer = blockCommand.call(tpl, scope, {params:['ks-overlay-content'],fn: func1}, buffer);
return buffer;
};
ret.TPL_NAME = module.id || module.name;