/* @update: 2016-8-24 10:45:45 */
!function () {
    $(function () {
        var t, o, i, n, a, e = $(window), s = $(document), c = $("#j_leftCon"), l = $("#j_sidebar"), d = !1;
        l.on("mousedown", function (i) {
            return d = !0, t = i.pageX, o = l.offset().left, n = e.width(), a = o - t, !1
        }), s.on("mousemove", function (t) {
            d && (i = 100 * (t.pageX + a + 8) / n + "%", t.pageX < 500 ? i = 100 * (500 + a + 8) / n + "%" : t.pageX > 1100 && (i = 100 * (1200 + a + 8) / n + "%"), c.css("width", i))
        }), s.on("mouseup", function (t) {
            d = !1, t.cancelBubble = !0
        })
    });
    var t = $(".write-eidit .tool .shezhi"), o = $(".copy-cun .tool");
    t.on("click", function (t) {
        t || t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0;
        var o = $(this).parent().find(".tool-list");
        o.show()
    }), $(".tool-list li").on("click", function (t) {
        t || t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0, $(this).parents(".tool-list").hide()
    }), o.on("click", function (t) {
        t || t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0;
        var o = $(this).find(".tool-list");
        o.show()
    }), $(".second").on("click", function (t) {
        t || t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0, $(".date-list").show()
    }), $(".date-list li").on("click", function (t) {
        t || t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0;
        var o = $(this).text();
        $(this).parents(".second").find(".sec-text").text(o), $(this).parents(".second").find(".date-list").hide()
    }), $(".ce-lv").on("click", function (t) {
        t || t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0, $(".day-m-list").show()
    }), $(".ce-lv .day-m-list li").on("click", function (t) {
        t || t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0;
        var o = $(this).text();
        $(this).parents(".ce-lv").find(".day-m").text(o), $(this).parents(".ce-lv").find(".day-m-list").hide()
    }), $(document).on("click", function (t) {
        t || t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0, $(".tool-list").hide(), $(".date-list").hide(), $(".day-m-list").hide(), $(".select-list").hide()
    })
}();
var jzq = {};
jzq.animation = function () {
    function t() {
        var t = {top: $(window).scrollTop(), bottom: $(window).scrollTop() + $(window).height()};
        o.each(function () {
            var o = $(this).attr("data-animationType"), i = $(this).attr("data-animationOffset") || 100;
            t.top <= $(this).offset().top + $(this).height() && t.bottom >= $(this).offset().top + i && !$(this).data("start") && ($(this).data("start", !0), $(this).css("visibility", "visible"), $(this).addClass(o))
        })
    }

    var o = $(".animation");
    t(), $(window).bind("scroll", function () {
        t()
    })
}, jzq.init = function () {
    this.animation()
}, $(function () {
    jzq.init()
});