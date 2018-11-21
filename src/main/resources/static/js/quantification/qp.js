/* @update: 2016-9-9 10:34:34 */
!function () {
    $(document).keyup(function () {
        $(".edit-container-leftbar").removeClass("edit-con-gai")
    });
    var e = document.getElementById("x-quan");
    e && e.addEventListener("click", function () {
        $(".edit-container-leftbar").addClass("edit-con-gai");
        var e = document.documentElement;
        e.requestFullscreen ? e.requestFullscreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullScreen && e.webkitRequestFullScreen()
    }, !1);
    var n = document.getElementById("ad-bian");
    n && (document.addEventListener("eidit-container", function () {
        n.innerHTML = document.fullscreenElement ? "" : "\u7f16\u8bd1"
    }, !1), document.addEventListener("msfullscreenchange", function () {
        n.innerHTML = document.msFullscreenElement ? "" : "\u7f16\u8bd1"
    }, !1), document.addEventListener("mozfullscreenchange", function () {
        n.innerHTML = document.mozFullScreen ? "" : "\u7f16\u8bd1"
    }, !1), document.addEventListener("webkitfullscreenchange", function () {
        n.innerHTML = document.webkitIsFullScreen ? "" : "\u7f16\u8bd1"
    }, !1))
}();