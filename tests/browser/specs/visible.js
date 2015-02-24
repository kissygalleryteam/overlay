/*jshint quotmark:false*/

var Overlay = require('overlay');
describe('visible', function () {
    it("should not fire hide on show", function () {
        var overlay = new Overlay({
            content: "haha"
        });
        var show = 0, hide = 0;
        overlay.on('show', function () {
            show = 1;
        });
        overlay.on('hide', function () {
            hide++;
        });
        overlay.hide();
        expect(show).to.be(0);
        expect(hide).to.be(0);
        overlay.show();
        expect(show).to.be(1);
        expect(hide).to.be(0);
        overlay.destroy();
    });

    it("should not fire show on render", function () {
        var overlay = new Overlay({
            content: "haha"
        });
        var show = 0, hide = 0;
        overlay.on('show', function () {
            show = 1;
        });
        overlay.on('hide', function () {
            hide++;
        });
        overlay.render();
        expect(show).to.be(0);
        expect(hide).to.be(0);
        overlay.destroy();
    });

    it("should fire show on show", function () {
        var overlay = new Overlay({
                content: "haha"
            }),
            show = 0,
            hide = 0;
        overlay.on('show', function () {
            show = 1;
        });
        overlay.on('hide', function () {
            hide++;
        });
        overlay.show();
        expect(show).to.be(1);
        expect(hide).to.be(0);
        overlay.destroy();
    });
});