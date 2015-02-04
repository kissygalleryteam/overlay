/**
 * test cases for dialog
 * @author yiminghe@gmail.com
 */
/*jshint quotmark:false*/

var $ = require('node');
var UA = require('ua');
var ie = require('ua').ieMode;
var Dom = require('dom');
var Overlay = require('overlay');
var Dialog = Overlay.Dialog;
var ConstrainPlugin = require('dd/plugin/constrain');
var DragPlugin = require('component/plugin/drag');
describe("dialog", function () {
    it("头体尾已经渲染完毕", function () {
        var srcNode = $('<div class="ks-overlay ks-dialog"' +
            ' style="width:200px">' +
            '<div class="ks-dialog-content">' +
            '<div class="ks-dialog-header">header</div>' +
            '<div class="ks-dialog-body">body</div>' +
            '<div class="ks-dialog-footer">footer</div>' +
            '</div>' +
            '</div>').prependTo('body');

        var d = new Dialog({
            srcNode: srcNode
        });

        d.plug(new DragPlugin({
            handlers: ['.ks-dialog-header']
        }).plug(new ConstrainPlugin({
                constrain: window
            })));

        d.render();
        d.center();
        d.show();

        expect(d.get("header").html()).to.be("header");
        expect(d.get('body').html()).to.be('body');
        expect(d.get("footer").html()).to.be("footer");
        expect(d.get("headerContent")).to.be("header");
        expect(d.get("bodyContent")).to.be('body');
        expect(d.get("footerContent")).to.be("footer");
        d.destroy();
    });

    describe("完全由 javascript 创建", function () {
        var d;

        it("create works", function () {
            var d = new Dialog({
                width: 200,
                closable: true,
                bodyContent: "1",
                headerContent: "2"
            });
            d.create();
            expect(d.get("header")).not.to.be(undefined);
            if (d.get("header")) {
                expect(d.get("header").nodeName()).to.be('div');
            }
            expect(d.get('el').one(".ks-overlay-close")).not.to.be(undefined);
            d.destroy();
        });

        it("头体尾已经渲染完毕", function () {
            d = new Dialog({
                headerContent: "头",
                bodyContent: "体",
                footerContent: "尾",
                width: 200,
                plugins: [
                    new DragPlugin({
                        handlers: ['.ks-dialog-header'],
                        plugins: [new ConstrainPlugin({
                            constrain: true
                        })]
                    })
                ]
            });

            d.render();
            d.center();
            d.show();
            expect(d.get("header").html()).to.be("头");
            expect(d.get('body').html()).to.be("体");
            expect(d.get("footer").html()).to.be("尾");
        });

        it("应该可以拖动", function (done) {
            if (ie === 9 || ie === 11 || window.callPhantom) {
                done();
                return;
            }
            var xy = [d.get('x'), d.get('y')];

            window.simulateEvent(d.get("header")[0], 'mousedown', {
                clientX: xy[0] + 10,
                clientY: xy[1] + 10
            });

            async.series([
                waits(100),

                runs(function () {
                    window.simulateEvent(document, 'mousemove', {
                        clientX: xy[0] + 150,
                        clientY: xy[1] + 150
                    });
                }),

                waits(100),

                runs(function () {
                    window.simulateEvent(document, 'mousemove', {
                        clientX: xy[0] + 100,
                        clientY: xy[1] + 100
                    });
                }),

                waits(100),

                runs(function () {
                    window.simulateEvent(document, 'mouseup', {
                        clientX: xy[0] + 100,
                        clientY: xy[1] + 100
                    });
                }),

                runs(function () {
                    var dxy = [d.get('x'), d.get('y')];
                    expect(dxy[0] - xy[0] - 90).to.within(-5, 5);
                    expect(dxy[1] - xy[1] - 90).to.within(-5, 5);
                })], done);
        });

        if ((UA.ieMode === 7 || UA.ieMode === 8) && window.frameElement) {
            return;
        }

        if (ie === 9 || ie === 11) {
            return;
        }

        it("只能在当前视窗范围拖动", function (done) {

            var xy = d.get("xy");

            window.simulateEvent(d.get("header")[0], 'mousedown', {
                clientX: xy[0] + 10,
                clientY: xy[1] + 10
            });

            async.series([
                waits(100),
                runs(function () {
                    window.simulateEvent(document, 'mousemove', {
                        clientX: xy[0] + 15,
                        clientY: xy[1] + 15
                    });
                }),
                waits(100),
                runs(function () {
                    window.simulateEvent(document, 'mousemove', {
                        clientX: xy[0] + Dom.viewportWidth(),
                        clientY: xy[1] + Dom.viewportHeight()
                    });
                }),
                waits(100),
                runs(function () {
                    window.simulateEvent(document, 'mouseup', {

                        clientX: xy[0] + Dom.viewportWidth(),
                        clientY: xy[1] + Dom.viewportHeight()
                    });
                }),
                waits(100),

                runs(function () {
                    var dxy = [d.get('x'), d.get('y')],
                        width = d.get('el').outerWidth(),
                        height = d.get('el').outerHeight();

                    expect(Dom.viewportWidth() - width - dxy[0]).to.within(-5, 5)
                    expect(Dom.viewportHeight() - height - dxy[1]).to.within(-5, 5)
                }),

                runs(function () {
                    d.destroy();
                })], done);
        });
    });
});