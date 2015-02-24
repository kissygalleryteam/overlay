/**
 * testcases for overlay
 * @author yiminghe@gmail.com
 */
/*jshint quotmark:false*/
var $ = require('node');
var util = require('util');
var Dom = require('dom');
var UA = require('ua');
var ie = UA.ieMode;
var Overlay = require('overlay');
var ResizePlugin = require('component/plugin/resize');

describe("overlay", function () {
    describe("从页面中取得已渲染元素", function () {
        var o;

        beforeEach(function () {
            var render = $('<div class="popup ks-overlay" style="width:400px">' +
                '<div class="ks-overlay-content"><p>pre-render</p>' +
                '<div class="popup"></div></dov></div>' +
                '</div>').prependTo('body');

            o = new Overlay({
                srcNode: render
            });
        });

        afterEach(function () {
            o.destroy();
        });

        it('children works', function () {
            o.render();
            var childrenContainerEl = o.getChildrenContainerEl()[0];
            expect(o.get('children').length).to.be(2);
            expect(o.get('children')[0][0]).to.be(childrenContainerEl.childNodes[0]);
            expect(o.get('children')[1][0]).to.be(childrenContainerEl.childNodes[1]);
        });

//           srcNode 情况下可以了，恰好只能 el
        it("渲染前取不到 el 元素", function () {
            expect(o.get('el')).to.be(undefined);
            expect(o.get('content')).not.to.ok();
        });

        it("渲染后可以取到元素", function () {
            o.render();
            expect(o.get('el')[0].nodeType).to.be(1);
            expect(o.get('content').toLowerCase()).to.be('<p>pre-render</p><div class="popup"></div>');
        });

        it("渲染后元素会正确配置", function () {
            o.render();
            expect(o.get('el').css('left')).to.be("-9999px");
            expect(o.get('el').css("top")).to.be("-9999px");
            expect(o.get('el').css('width')).to.be("400px");
        });

        it("对齐居中有效", function () {
            o.set("align", {
                points: ['cc', 'cc']
            });

            o.show();

            expect(parseInt(o.get('el').css('left'), 10) - (Math.ceil((Dom.viewportWidth() - o.get('el').outerWidth()) / 2)))
                .to.within(-5, 5);

            expect(parseInt(o.get('el').css("top"), 10) - (Math.ceil((Dom.viewportHeight() - o.get('el').outerHeight()) / 2)))
                .to.within(-5, 5);
        });

        it("show/hide 事件顺利触发", function () {

            var hideCall = 0,
                showCall = 0;

            o.on('hide', function () {
                hideCall = 1;
            });
            o.on('show', function () {
                showCall = 1;
            });

            o.render();

            expect(o.get('visible')).not.to.ok();

            expect(hideCall).to.be(0);
            expect(showCall).to.be(0);

            o.show();

            expect(hideCall).to.be(0);
            expect(showCall).to.be(1);

            showCall = 0;

            o.hide();
            expect(hideCall).to.be(1);
            expect(showCall).to.be(0);
        });

        it("应该能够设置坐标", function () {
            o.move(100, 150);

            o.show();

            expect(parseInt(o.get('el').css('left'), 10) - 100).to.within(-5, 5);
            expect(Math.ceil(parseFloat(o.get('el').css("top")) - 150)).to.within(-5, 5);
        });
    });

    describe("完全由 javascript 渲染弹层", function () {
        var o = new Overlay({
            width: 400,
            elCls: "popup",
            plugins: [
                new ResizePlugin({
                    handlers: ["t"]
                })
            ],
            content: "render by javascript"
        });

        it("渲染前取不到 el 元素", function () {
            expect(o.get('el')).to.be(undefined);
        });

        it("渲染后可以取到元素", function () {
            o.render();
            expect(util.trim(o.get('contentEl').html())).to.be("render by javascript");
        });

        it("渲染后元素会正确配置", function () {
            expect(o.get('el').css('left')).to.be("-9999px");
            expect(o.get('el').css("top")).to.be("-9999px");
            expect(o.get('el').css('width')).to.be("400px");
        });

        it("show/hide 事件顺利触发", function () {
            var hideCall = 0,
                showCall = 0;

            o.show();

            o.on('hide', function () {
                hideCall = 1;
            });
            o.on('show', function () {
                showCall = 1;
            });

            o.hide();
            o.show();
            expect(hideCall).to.be(1);
            expect(showCall).to.be(1);
            o.detach("show hide");
        });

        it("应该能够设置坐标", function () {
            o.move(300, 350);

            expect(parseInt(o.get('el').css('left'), 10) - 300).to.within(-5, 5);
            expect(Math.ceil(parseFloat(o.get('el').css("top")) - 350)).to.within(-5, 5);
        });

        it("应该能够调节大小", function (done) {
            this.timeout(40000);
            // ie9 测试不了
            if (ie === 9 || ie === 11) {
                done();
                return;
            }

            var h = o.get('el').one(".ks-resizable-handler-t"),
                height = o.get('el').outerHeight(),
                hxy = h.offset();
            window.simulateEvent(h[0], 'mousedown', {
                clientX: hxy.left - 2,
                clientY: hxy.top - 2
            });

            async.series([
                runs(function () {
                    window.simulateEvent(document, 'mousemove', {
                        clientX: hxy.left - 25,
                        clientY: hxy.top - 25
                    });
                }),

                waits(300),

                runs(function () {
                    window.simulateEvent(document, 'mousemove', {
                        clientX: hxy.left - 100,
                        clientY: hxy.top - 100
                    });
                }),

                waits(100),

                runs(function () {
                    window.simulateEvent(document, 'mouseup', {
                        clientX: hxy.left - 100,
                        clientY: hxy.top - 100
                    });
                }),

                waits(300),

                runs(function () {
                    var elHeight = o.get('el').outerHeight();
                    // phantomjs emulation not accurate！
                    if (!UA.phantomjs) {
                        expect(elHeight - height - 98).to.within(-5, 5);
                    }
                }),

                runs(function () {
                    o.destroy();
                })
            ], done);
        });
    });

    describe("方位能够自由指定", function () {
        it("render works", function () {
            var div = $("<div/>").appendTo('body');
            var o = new Overlay({
                width: 400,
                render: div,
                elCls: "popup",
                resize: {
                    handlers: ["t"]
                },
                content: "render by javascript"
            });
            o.render();
            expect(div.first().equals(o.get('el'))).to.be(true);
            o.destroy();
            expect(div.children().length).to.be(0);
            div.remove();
        });


        it("no render works", function () {
            var div = $("<div/>").appendTo('body');
            var o = new Overlay({
                width: 400,
                elCls: "popup",
                resize: {
                    handlers: ["t"]
                },
                content: "render by javascript"
            });
            o.render();
            expect(o.get('el').parent().equals($('body'))).to.be(true);
            o.destroy();
            div.remove();
        });


        it("elBefore works", function () {
            var div = $("<div/>").appendTo('body');
            var o = new Overlay({
                width: 400,
                // 同时指定优先 elBefore
                elBefore: div,
                render: div,
                elCls: "popup",
                resize: {
                    handlers: ["t"]
                },
                content: "render by javascript"
            });
            o.render();
            expect(o.get('el').next().equals(div)).to.be(true);
            o.destroy();
            expect(div.prev().equals(o.get('el').next())).to.be(false);
            div.remove();
        });
    });

    describe("align works", function () {
        it("对齐居中有效", function () {
            var o = new Overlay({
                width: 400,
                elCls: "popup",
                resize: {
                    handlers: ["t"]
                },
                content: "render by javascript"
            });

            o.set("align", {
                points: ['cc', 'cc']
            });
            o.show();

            expect(parseInt(o.get('el').css('left'), 10) - (Math.ceil((Dom.viewportWidth() - o.get('el').outerWidth()) / 2))).to.within(-5, 5);

            expect(parseInt(o.get('el').css("top"), 10) - (Math.ceil((Dom.viewportHeight() - o.get('el').outerHeight()) / 2))).to.within(-5, 5);

            o.destroy();
        });

        // https://github.com/kissyteam/kissy/issues/190
        it("align node works", function () {
            var node = $("<div style='position: absolute;left:0;top:0;width:600px;" +
                "height: 200px;overflow: hidden;'>" +
                "<div style='height: 1000px'></div>" +
                "</div>").appendTo('body');

            var o = new Overlay.Dialog({
                headerContent: "哈哈",
                bodyContent: "嘿嘿",
                elStyle: {
                    // ie6...
                    overflow: 'hidden'
                },
                render: node,
                width: 300,
                height: 18
            });

            o.center(node);
            o.show();

            var oel = o.get('el');

            expect(o.get('y') - 90).to.within(-5, 5);

            expect(parseInt(oel.css("top"), 10) - 90).to.within(-5, 5);

            node[0].scrollTop = 20;

            o.center(node);

            expect(o.get('y')).to.be(90);

            expect(parseInt(oel.css("top"), 10) - 110).to.within(-5, 5);

            node.remove();

            o.destroy();
        });

        it('attribute has order', function () {
            Dom.addStyleSheet('.overlay1522 {position:absolute;}');
            var o = new Overlay({
                prefixCls: 'kk-',
                elCls: 'overlay1522'
            });
            o.render();
            expect(o.get('el').css('position')).to.be('absolute');
            o.destroy();
        });
    });
});
