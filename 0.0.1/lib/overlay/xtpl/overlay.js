/*compiled by xtemplate#3.7.1*/
var ret = module.exports = function overlay(undefined){
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
function func1(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\n        <a href="javascript:void(\'close\')"\n           aria-label="Close"\n           class="';
pos.line = 5;
var callRet2
callRet2 = callFnUtil(tpl, scope, {escape:1,params:['close']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet2);
buffer.data += '"\n           role=\'button\'>\n            <span class="';
pos.line = 7;
var callRet3
callRet3 = callFnUtil(tpl, scope, {escape:1,params:['close-x']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet3);
buffer.data += '">';
var id4 = ((t=(affix.closeText)) !== undefined ? t:((t = data.closeText) !== undefined ? t :scope.resolveLooseUp(["closeText"])));
buffer = buffer.write(id4);
buffer.data += '</span>\n        </a>\n    ';
return buffer;
}
function func0(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\n    ';
pos.line = 2;
pos.line = 2;
var id5 = ((t=(affix.closable)) !== undefined ? t:((t = data.closable) !== undefined ? t :scope.resolveLooseUp(["closable"])));
buffer = ifCommand.call(tpl, scope, {params:[id5],fn: func1}, buffer);
buffer.data += '\n';
return buffer;
}
function func7(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\n        ';
pos.line = 14;
var id8 = ((t=(affix.content)) !== undefined ? t:((t = data.content) !== undefined ? t :scope.resolveLooseUp(["content"])));
buffer = buffer.write(id8);
buffer.data += '\n    ';
return buffer;
}


buffer.data += '';
pos.line = 1;
buffer = blockCommand.call(tpl, scope, {params:['ks-overlay-closable'],fn: func0}, buffer);
buffer.data += '\n\n<div class="';
pos.line = 12;
var callRet6
callRet6 = callFnUtil(tpl, scope, {escape:1,params:['content']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet6);
buffer.data += '">\n    ';
pos.line = 13;
buffer = blockCommand.call(tpl, scope, {params:['ks-overlay-content'],fn: func7}, buffer);
buffer.data += '\n</div>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;