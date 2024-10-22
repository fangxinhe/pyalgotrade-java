function dhtmlXWindowsSngl() {
}
function dhtmlXWindowsBtn() {
}
function dhtmlXWindows() {
    if (!window.dhtmlXContainer) {
        alert(this.i18n.dhx);
        return
    }
    this.engine = "dhx";
    var d = "_" + this.engine + "_Engine";
    if (!this[d]) {
        alert(this.i18n.noenginealert);
        return
    } else {
        this[d]()
    }
    this._isIPad = (navigator.userAgent.search(/iPad/gi) >= 0);
    var c = this;
    this.pathPrefix = "dhxwins_";
    this.imagePath = dhtmlx.image_path || "codebase/imgs/";
    this.setImagePath = function (a) {
        this.imagePath = a
    };
    this.skin = (typeof(dhtmlx) != "undefined" && typeof(dhtmlx.skin) == "string" ? dhtmlx.skin : "dhx_skyblue");
    this.skinParams = {
        dhx_black: {
            header_height: 21,
            border_left_width: 2,
            border_right_width: 2,
            border_bottom_height: 2
        },
        dhx_blue: {header_height: 21, border_left_width: 2, border_right_width: 2, border_bottom_height: 2},
        dhx_skyblue: {header_height: 21, border_left_width: 2, border_right_width: 2, border_bottom_height: 2}
    };
    this.setSkin = function (a) {
        this.skin = a;
        this._engineRedrawSkin()
    };
    this.isWindow = function (e) {
        var a = (this.wins[e] != null);
        return a
    };
    this.findByText = function (g) {
        var f = new Array();
        for (var e in this.wins) {
            if (this.wins[e].getText().search(g, "gi") >= 0) {
                f[f.length] = this.wins[e]
            }
        }
        return f
    };
    this.window = function (e) {
        var a = null;
        if (this.wins[e] != null) {
            a = this.wins[e]
        }
        return a
    };
    this.forEachWindow = function (f) {
        for (var e in this.wins) {
            f(this.wins[e])
        }
    };
    this.getBottommostWindow = function () {
        var e = this.getTopmostWindow();
        for (var f in this.wins) {
            if (this.wins[f].zi < e.zi) {
                e = this.wins[f]
            }
        }
        return (e.zi != 0 ? e : null)
    };
    this.getTopmostWindow = function (g) {
        var f = {zi: 0};
        for (var e in this.wins) {
            if (this.wins[e].zi > f.zi) {
                if (g == true && !this._isWindowHidden(this.wins[e])) {
                    f = this.wins[e]
                }
                if (g != true) {
                    f = this.wins[e]
                }
            }
        }
        return (f.zi != 0 ? f : null)
    };
    this.wins = {};
    for (var b in this.wins) {
        delete this.wins[b]
    }
    this.autoViewport = true;
    this._createViewport = function () {
        this.vp = document.body;
        this._clearVPCss();
        this.vp._css = (String(this.vp.className).length > 0 ? this.vp.className : "");
        this.vp.className += " dhtmlx_skin_" + this.skin + (this._r ? " dhx_wins_rtl" : "");
        this.modalCoverI = document.createElement("IFRAME");
        this.modalCoverI.frameBorder = "0";
        this.modalCoverI.className = "dhx_modal_cover_ifr";
        this.modalCoverI.setAttribute("src", "javascript:false;");
        this.modalCoverI.style.display = "none";
        this.modalCoverI.style.zIndex = 0;
        this.vp.appendChild(this.modalCoverI);
        this.modalCoverD = document.createElement("DIV");
        this.modalCoverD.className = "dhx_modal_cover_dv";
        this.modalCoverD.style.display = "none";
        this.modalCoverD.style.zIndex = 0;
        this.vp.appendChild(this.modalCoverD);
        this._vpcover = document.createElement("DIV");
        this._vpcover.className = "dhx_content_vp_cover";
        this._vpcover.style.display = "none";
        this.vp.appendChild(this._vpcover);
        this._carcass = document.createElement("DIV");
        this._carcass.className = "dhx_carcass_resmove";
        this._carcass.style.display = "none";
        if (_isIE) {
            this._carcass.innerHTML = "<iframe border=0 frameborder=0 style='filter: alpha(opacity=0); width: 100%; height:100%; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index:1;'></iframe><div style='position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;z-index:2;background:white;filter:alpha(opacity=0);opacity:0;'></div>";
            if (navigator.userAgent.indexOf("MSIE 10") >= 0) {
            } else {
                this._carcass.childNodes[0].setAttribute("src", "javascript:false;")
            }
        }
        this._carcass.onselectstart = function (a) {
            a = a || event;
            a.returnValue = false
        };
        this.vp.appendChild(this._carcass)
    };
    this._clearVPCss = function (a) {
        this.vp.className = String(this.vp.className).replace(/[a-z_]{1,}/gi, function (e) {
            return ({
                dhtmlx_skin_dhx_skyblue: 1,
                dhtmlx_skin_dhx_blue: 1,
                dhtmlx_skin_dhx_black: 1,
                dhtmlx_skin_dhx_web: 1,
                dhtmlx_skin_dhx_terrace: 1
            }[e] == 1 ? "" : e)
        })
    };
    this._autoResizeViewport = function () {
        for (var e in this.wins) {
            if (this.wins[e]._isFullScreened) {
                this.wins[e].adjustContent(document.body, 0, 0, false, 0);
                this.wins[e].updateNestedObjects()
            }
            if (this.wins[e]._isMaximized && this.wins[e].style.display != "none") {
                this._restoreWindow(e);
                this._maximizeWindow(e)
            }
        }
        if (this.vp == document.body) {
            return
        }
        if (this.autoViewport == false) {
            return
        }
        this.vp.style.width = (_isIE ? document.body.offsetWidth - 4 : window.innerWidth) + "px";
        this.vp.style.height = (_isIE ? document.body.offsetHeight - 4 : window.innerHeight) + "px";
        for (var e in this.wins) {
            var i = this.wins[e];
            var h = false;
            var f = false;
            if (i.x > this.vp.offsetWidth - 10) {
                i.x = this.vp.offsetWidth - 10;
                h = true
            }
            var g = (i._skinParams != null ? i._skinParams : this.skinParams[this.skin]);
            if (i.y + g.header_height > this.vp.offsetHeight) {
                i.y = this.vp.offsetHeight - g.header_height;
                f = true
            }
            if (h || f) {
                this._engineRedrawWindowPos(i)
            }
        }
    };
    this.enableAutoViewport = function (a) {
        if (this.vp != document.body) {
            return
        }
        this.autoViewport = a;
        if (a == false) {
            if (this.vp == document.body) {
                document.body.className = this.vp._css
            }
            this.vp.removeChild(this.modalCoverI);
            this.vp.removeChild(this.modalCoverD);
            this.vp.removeChild(this._vpcover);
            this.vp.removeChild(this._carcass);
            this.vp = null;
            this.vp = document.createElement("DIV");
            this.vp.autocreated = true;
            this.vp.className = "dhtmlx_winviewport dhtmlx_skin_" + this.skin + (this._r ? " dhx_wins_rtl" : "");
            this.vp.style.left = "0px";
            this.vp.style.top = "0px";
            document.body.appendChild(this.vp);
            this.vp.ax = 0;
            this.vp.ay = 0;
            this._autoResizeViewport();
            this.vp.appendChild(this.modalCoverI);
            this.vp.appendChild(this.modalCoverD);
            this.vp.appendChild(this._vpcover);
            this.vp.appendChild(this._carcass)
        }
    };
    this.attachViewportTo = function (a) {
        if (this.autoViewport == false) {
            this.vp.removeChild(this.modalCoverI);
            this.vp.removeChild(this.modalCoverD);
            this.vp.removeChild(this._vpcover);
            this.vp.removeChild(this._carcass);
            if (this.vp != document.body) {
                this.vp.parentNode.removeChild(this.vp)
            }
            this.vp = null;
            this.vp = (typeof(a) == "string" ? document.getElementById(a) : a);
            this.vp.autocreated = false;
            this._clearVPCss();
            this.vp.className += " dhtmlx_skin_" + this.skin + (this._r ? " dhx_wins_rtl" : "");
            this.vp.style.position = "relative";
            this.vp.style.overflow = "hidden";
            this.vp.ax = 0;
            this.vp.ay = 0;
            this.vp.appendChild(this.modalCoverI);
            this.vp.appendChild(this.modalCoverD);
            this.vp.appendChild(this._vpcover);
            this.vp.appendChild(this._carcass)
        }
    };
    this.setViewport = function (e, h, f, a, g) {
        if (this.autoViewport == false) {
            this.vp.style.left = e + "px";
            this.vp.style.top = h + "px";
            this.vp.style.width = f + "px";
            this.vp.style.height = a + "px";
            if (g != null) {
                g.appendChild(this.vp)
            }
            this.vp.ax = getAbsoluteLeft(this.vp);
            this.vp.ay = getAbsoluteTop(this.vp)
        }
    };
    this._effects = {move: false, resize: false};
    this.setEffect = function (e, a) {
        if ((this._effects[e] != null) && (typeof(a) == "boolean")) {
            this._effects[e] = a
        }
    };
    this.getEffect = function (a) {
        return this._effects[a]
    };
    this.createWindow = function (l, f, k, h, e) {
        var j = document.createElement("DIV");
        j.className = "dhtmlx_window_inactive";
        j.dir = "ltr";
        for (var g in this.wins) {
            this.wins[g].zi += this.zIndexStep;
            this.wins[g].style.zIndex = this.wins[g].zi;
            if (this.iframeMode && this.wins[g].ifr) {
                this.wins[g].ifr.style.zIndex = this.wins[g].style.zIndex - 1
            }
        }
        j.zi = this.zIndexStep;
        j.style.zIndex = j.zi;
        j.active = false;
        j._isWindow = true;
        j.isWindow = true;
        j.w = Number(h);
        j.h = Number(e);
        j.x = f;
        j.y = k;
        this._engineFixWindowPosInViewport(j);
        j._isModal = false;
        j._allowResize = true;
        j.maxW = "auto";
        j.maxH = "auto";
        j.minW = 200;
        j.minH = 140;
        j.iconsPresent = true;
        j.icons = new Array(this.imagePath + this.pathPrefix + this.skin + "/active/icon_normal.gif", this.imagePath + this.pathPrefix + this.skin + "/inactive/icon_normal.gif");
        j._allowMove = true;
        j._allowMoveGlobal = true;
        j._allowResizeGlobal = true;
        j._keepInViewport = false;
        var i = this.skinParams[this.skin];
        j.idd = l;
        this.vp.appendChild(j);
        this._engineSetWindowBody(j);
        this._engineRedrawWindowPos(j);
        this._engineRedrawWindowSize(j);
        this._engineUpdateWindowIcon(j, j.icons[0]);
        this._engineDiableOnSelectInWindow(j, true);
        this.wins[l] = j;
        dhtmlxEventable(j);
        this._engineGetWindowHeader(j)[this._isIPad ? "ontouchstart" : "onmousedown"] = function (m) {
            m = m || event;
            var a = c.wins[this.idd];
            if (!a.isOnTop()) {
                a.bringToTop()
            }
            if (c._engineGetWindowHeaderState(a)) {
                return
            }
            if (!c._engineCheckHeaderMouseDown(a, m)) {
                return
            }
            if (!a._allowMove || !a._allowMoveGlobal) {
                return
            }
            c._wasMoved = false;
            a.moveOffsetX = a.x - (c._isIPad ? m.touches[0].clientX : m.clientX);
            a.moveOffsetY = a.y - (c._isIPad ? m.touches[0].clientY : m.clientY);
            c.movingWin = a;
            if (c._effects.move == false) {
                c._carcass.x = c.movingWin.x;
                c._carcass.y = c.movingWin.y;
                c._carcass.w = parseInt(c.movingWin.style.width) + (_isIE ? 0 : -2);
                c._carcass.h = parseInt(c.movingWin.style.height) + (_isIE ? 0 : -2);
                c._carcass.style.left = c._carcass.x + "px";
                c._carcass.style.top = c._carcass.y + "px";
                c._carcass.style.width = c._carcass.w + "px";
                c._carcass.style.height = c._carcass.h + "px";
                c._carcass.style.zIndex = c._getTopZIndex(true) + 1;
                c._carcass._keepInViewport = j._keepInViewport
            }
            c._blockSwitcher(true);
            c._vpcover.style.zIndex = c.movingWin.style.zIndex - 1;
            c._vpcover.style.display = "";
            m.returnValue = false;
            m.cancelBubble = true;
            return false
        };
        this._engineGetWindowHeader(j).ondblclick = function (m) {
            var a = c.wins[this.idd];
            if (!c._engineCheckHeaderMouseDown(a, m || event)) {
                return
            }
            if (a._allowResizeGlobal && !a._isParked) {
                if (a._isMaximized == true) {
                    c._restoreWindow(a.idd)
                } else {
                    c._maximizeWindow(a.idd)
                }
            }
            a = null
        };
        j.setText = function (a) {
            c._engineGetWindowLabel(this).innerHTML = a
        };
        j.getText = function () {
            return c._engineGetWindowLabel(this).innerHTML
        };
        j.getId = function () {
            return this.idd
        };
        j.show = function () {
            c._showWindow(this)
        };
        j.hide = function () {
            c._hideWindow(this)
        };
        j.minimize = function () {
            c._restoreWindow(this.idd)
        };
        j.maximize = function () {
            c._maximizeWindow(this.idd)
        };
        j.close = function () {
            c._closeWindow(this.idd)
        };
        j.park = function () {
            if (this._isParkedAllowed) {
                c._parkWindow(this.idd)
            }
        };
        j.stick = function () {
            c._stickWindow(this.idd)
        };
        j.unstick = function () {
            c._unstickWindow(this.idd)
        };
        j.isSticked = function () {
            return this._isSticked
        };
        j.setIcon = function (m, a) {
            c._setWindowIcon(j, m, a)
        };
        j.getIcon = function () {
            return c._getWindowIcon(this)
        };
        j.clearIcon = function () {
            c._clearWindowIcons(this)
        };
        j.restoreIcon = function () {
            c._restoreWindowIcons(this)
        };
        j.keepInViewport = function (a) {
            this._keepInViewport = a
        };
        j.setModal = function (a) {
            if (a == true) {
                if (c.modalWin != null || c.modalWin == this) {
                    return
                }
                c._setWindowModal(this, true)
            } else {
                if (c.modalWin != this) {
                    return
                }
                c._setWindowModal(this, false)
            }
        };
        j.isModal = function () {
            return this._isModal
        };
        j.isHidden = function () {
            return c._isWindowHidden(this)
        };
        j.isMaximized = function () {
            return this._isMaximized
        };
        j.isParked = function () {
            return this._isParked
        };
        j.allowPark = function () {
            c._allowParking(this)
        };
        j.denyPark = function () {
            c._denyParking(this)
        };
        j.isParkable = function () {
            return this._isParkedAllowed
        };
        j.allowResize = function () {
            c._allowReszieGlob(this)
        };
        j.denyResize = function () {
            c._denyResize(this)
        };
        j.isResizable = function () {
            return this._allowResizeGlobal
        };
        j.allowMove = function () {
            if (!this._isMaximized) {
                this._allowMove = true
            }
            this._allowMoveGlobal = true
        };
        j.denyMove = function () {
            this._allowMoveGlobal = false
        };
        j.isMovable = function () {
            return this._allowMoveGlobal
        };
        j.bringToTop = function () {
            c._bringOnTop(this);
            c._makeActive(this)
        };
        j.bringToBottom = function () {
            c._bringOnBottom(this)
        };
        j.isOnTop = function () {
            return c._isWindowOnTop(this)
        };
        j.isOnBottom = function () {
            return c._isWindowOnBottom(this)
        };
        j.setPosition = function (a, m) {
            this.x = a;
            this.y = m;
            c._engineFixWindowPosInViewport(this);
            c._engineRedrawWindowPos(this)
        };
        j.getPosition = function () {
            return new Array(this.x, this.y)
        };
        j.setDimension = function (m, a) {
            if (m != null) {
                if (this.maxW != "auto") {
                    if (m > this.maxW) {
                        m = this.maxW
                    }
                }
                if (m < this.minW) {
                    m = this.minW
                }
                this.w = m
            }
            if (a != null) {
                if (this.maxH != "auto") {
                    if (a > this.maxH) {
                        a = this.maxH
                    }
                }
                if (a < this.minH) {
                    a = this.minH
                }
                this.h = a
            }
            c._fixWindowDimensionInViewport(this);
            c._engineFixWindowPosInViewport(this);
            c._engineRedrawWindowSize(this);
            this.updateNestedObjects()
        };
        j.getDimension = function () {
            return new Array(this.w, this.h)
        };
        j.setMaxDimension = function (m, a) {
            this.maxW = (isNaN(m) ? "auto" : m);
            this.maxH = (isNaN(a) ? "auto" : a);
            c._engineRedrawWindowSize(this)
        };
        j.getMaxDimension = function () {
            return new Array(this.maxW, this.maxH)
        };
        j.setMinDimension = function (a, m) {
            if (a != null) {
                this.minW = a
            }
            if (m != null) {
                this.minH = m
            }
            c._fixWindowDimensionInViewport(this);
            c._engineRedrawWindowPos(this)
        };
        j.getMinDimension = function () {
            return new Array(this.minW, this.minH)
        };
        j._adjustToContent = function (a, m) {
            c._engineAdjustWindowToContent(this, a, m)
        };
        j._doOnAttachMenu = function () {
            c._engineRedrawWindowSize(this);
            this.updateNestedObjects()
        };
        j._doOnAttachToolbar = function () {
            c._engineRedrawWindowSize(this);
            this.updateNestedObjects()
        };
        j._doOnAttachStatusBar = function () {
            c._engineRedrawWindowSize(this);
            this.updateNestedObjects()
        };
        j._doOnFrameMouseDown = function () {
            this.bringToTop()
        };
        j._doOnFrameContentLoaded = function () {
            c.callEvent("onContentLoaded", [this])
        };
        j.addUserButton = function (p, o, n, a) {
            var m = c._addUserButton(this, p, o, n, a);
            return m
        };
        j.removeUserButton = function (a) {
            a = String(a).toLowerCase();
            if (!((a == "minmax1") || (a == "minmax2") || (a == "park") || (a == "close") || (a == "stick") || (a == "unstick") || (a == "help"))) {
                if (btn != null) {
                    c._removeUserButton(this, a)
                }
            }
        };
        j.progressOn = function () {
            c._engineSwitchWindowProgress(this, true)
        };
        j.progressOff = function () {
            c._engineSwitchWindowProgress(this, false)
        };
        j.setToFullScreen = function (a) {
            c._setWindowToFullScreen(this, a)
        };
        j.showHeader = function () {
            c._engineSwitchWindowHeader(this, true)
        };
        j.hideHeader = function () {
            c._engineSwitchWindowHeader(this, false)
        };
        j.progressOff();
        j.canStartResize = false;
        j.onmousemove = function (q) {
            if (_isIE && this._isMaximized) {
                return true
            }
            q = q || event;
            var n = q.target || q.srcElement;
            if (String(n.className).search("dhtmlx_wins_resizer") < 0) {
                n = null
            }
            if (!this._allowResize || this._allowResizeGlobal == false || !n) {
                if (n) {
                    if (n.style.cursor != "default") {
                        n.style.cursor = "default"
                    }
                }
                if (this.style.cursor != "default") {
                    this.style.cursor = "default"
                }
                this.canStartResize = false;
                return true
            }
            if (c.resizingWin != null) {
                return
            }
            if (c.movingWin != null) {
                return
            }
            if (this._isParked) {
                return
            }
            if (c._isIPad) {
                var m = q.touches[0].clientX;
                var a = q.touches[0].clientY
            } else {
                var m = (_isIE || _isOpera ? q.offsetX : q.layerX);
                var a = (_isIE || _isOpera ? q.offsetY : q.layerY)
            }
            var o = c._engineAllowWindowResize(j, n, m, a);
            if (o == null) {
                this.canStartResize = false;
                if (n.style.cursor != "default") {
                    n.style.cursor = "default"
                }
                if (this.style.cursor != "default") {
                    this.style.cursor = "default"
                }
                return
            }
            c.resizingDirs = o;
            var p = {x: q.clientX, y: q.clientY};
            switch (c.resizingDirs) {
                case"border_left":
                    n.style.cursor = "w-resize";
                    this.resizeOffsetX = this.x - p.x;
                    break;
                case"border_right":
                    n.style.cursor = "e-resize";
                    this.resizeOffsetXW = this.x + this.w - p.x;
                    break;
                case"border_top":
                    n.style.cursor = "n-resize";
                    this.resizeOffsetY = this.y - p.y;
                    break;
                case"border_bottom":
                    n.style.cursor = "n-resize";
                    this.resizeOffsetYH = this.y + this.h - p.y;
                    break;
                case"corner_left":
                    n.style.cursor = "sw-resize";
                    this.resizeOffsetX = this.x - q.clientX;
                    this.resizeOffsetYH = this.y + this.h - p.y;
                    break;
                case"corner_up_left":
                    n.style.cursor = "nw-resize";
                    this.resizeOffsetY = this.y - p.y;
                    this.resizeOffsetX = this.x - p.x;
                    break;
                case"corner_right":
                    n.style.cursor = "nw-resize";
                    this.resizeOffsetXW = this.x + this.w - p.x;
                    this.resizeOffsetYH = this.y + this.h - p.y;
                    break;
                case"corner_up_right":
                    n.style.cursor = "sw-resize";
                    this.resizeOffsetY = this.y - p.y;
                    this.resizeOffsetXW = this.x + this.w - p.x;
                    break
            }
            this.canStartResize = true;
            this.style.cursor = n.style.cursor;
            q.cancelBubble = true;
            q.returnValue = false;
            return false
        };
        j.onmousedown = function (a) {
            if (c._getActive() != this) {
                c._makeActive(this)
            }
            c._bringOnTop(this);
            if (this.canStartResize) {
                c._blockSwitcher(true);
                c.resizingWin = this;
                if (!c._effects.resize) {
                    c._carcass.x = c.resizingWin.x;
                    c._carcass.y = c.resizingWin.y;
                    c._carcass.w = Number(c.resizingWin.w) + (_isIE ? 0 : -2);
                    c._carcass.h = Number(c.resizingWin.h) + (_isIE ? 0 : -2);
                    c._carcass.style.left = c._carcass.x + "px";
                    c._carcass.style.top = c._carcass.y + "px";
                    c._carcass.style.width = c._carcass.w + "px";
                    c._carcass.style.height = c._carcass.h + "px";
                    c._carcass.style.zIndex = c._getTopZIndex(true) + 1;
                    c._carcass.style.cursor = this.style.cursor;
                    c._carcass._keepInViewport = this._keepInViewport;
                    c._carcass.style.display = ""
                }
                c._vpcover.style.zIndex = c.resizingWin.style.zIndex - 1;
                c._vpcover.style.display = "";
                if (this.vs[this.av].layout) {
                    this.callEvent("_onBeforeTryResize", [this])
                }
                a = a || event
            }
        };
        this._addDefaultButtons(j.idd);
        j.button = function (m) {
            m = String(m).toLowerCase();
            var a = null;
            if (this.btns[m] != null) {
                a = this.btns[m]
            }
            return a
        };
        j.center = function () {
            c._centerWindow(this, false)
        };
        j.centerOnScreen = function () {
            c._centerWindow(this, true)
        };
        j._attachContent("empty", null);
        j._redraw = function () {
            c._engineRedrawWindowSize(this)
        };
        j.bringToTop();
        this._engineRedrawWindowSize(j);
        return this.wins[l]
    };
    this.zIndexStep = 2000;
    this._getTopZIndex = function (f) {
        var g = 0;
        for (var e in this.wins) {
            if (f == true) {
                if (this.wins[e].zi > g) {
                    g = this.wins[e].zi
                }
            } else {
                if (this.wins[e].zi > g && !this.wins[e]._isSticked) {
                    g = this.wins[e].zi
                }
            }
        }
        return g
    };
    this.movingWin = null;
    this._moveWindow = function (h) {
        if (this.movingWin != null) {
            if (!this.movingWin._allowMove || !this.movingWin._allowMoveGlobal) {
                return
            }
            if (this._effects.move == true) {
                if (this._engineGetWindowHeader(this.movingWin).style.cursor != "move") {
                    this._engineGetWindowHeader(this.movingWin).style.cursor = "move"
                }
                this._wasMoved = true;
                this.movingWin.x = (this._isIPad ? h.touches[0].clientX : h.clientX) + this.movingWin.moveOffsetX;
                this.movingWin.y = (this._isIPad ? h.touches[0].clientY : h.clientY) + this.movingWin.moveOffsetY;
                this._engineFixWindowPosInViewport(this.movingWin);
                this._engineRedrawWindowPos(this.movingWin)
            } else {
                if (this._carcass.style.display != "") {
                    this._carcass.style.display = ""
                }
                if (this._carcass.style.cursor != "move") {
                    this._carcass.style.cursor = "move"
                }
                if (this._engineGetWindowHeader(this.movingWin).style.cursor != "move") {
                    this._engineGetWindowHeader(this.movingWin).style.cursor = "move"
                }
                this._carcass.x = (this._isIPad ? h.touches[0].clientX : h.clientX) + this.movingWin.moveOffsetX;
                this._carcass.y = (this._isIPad ? h.touches[0].clientY : h.clientY) + this.movingWin.moveOffsetY;
                this._wasMoved = true;
                this._engineFixWindowPosInViewport(this._carcass);
                this._carcass.style.left = this._carcass.x + "px";
                this._carcass.style.top = this._carcass.y + "px"
            }
        }
        if (this.resizingWin != null) {
            if (!this.resizingWin._allowResize) {
                return
            }
            var g = {x: h.clientX, y: h.clientY};
            if (this.resizingDirs == "border_left" || this.resizingDirs == "corner_left" || this.resizingDirs == "corner_up_left") {
                if (this._effects.resize) {
                    var f = g.x + this.resizingWin.resizeOffsetX;
                    var a = (f > this.resizingWin.x ? -1 : 1);
                    newW = this.resizingWin.w + Math.abs(f - this.resizingWin.x) * a;
                    if ((newW < this.resizingWin.minW) && (a < 0)) {
                        this.resizingWin.x = this.resizingWin.x + this.resizingWin.w - this.resizingWin.minW;
                        this.resizingWin.w = this.resizingWin.minW
                    } else {
                        this.resizingWin.w = newW;
                        this.resizingWin.x = f
                    }
                    this._engineRedrawWindowPos(this.resizingWin);
                    this._engineRedrawWindowSize(this.resizingWin)
                } else {
                    var f = g.x + this.resizingWin.resizeOffsetX;
                    var a = (f > this._carcass.x ? -1 : 1);
                    newW = this._carcass.w + Math.abs(f - this._carcass.x) * a;
                    if (newW > this.resizingWin.maxW) {
                        newW = this.resizingWin.maxW;
                        f = this._carcass.x + this._carcass.w - this.resizingWin.maxW
                    }
                    if ((newW < this.resizingWin.minW) && (a < 0)) {
                        this._carcass.x = this._carcass.x + this._carcass.w - this.resizingWin.minW;
                        this._carcass.w = this.resizingWin.minW
                    } else {
                        this._carcass.w = newW;
                        this._carcass.x = f
                    }
                    this._carcass.style.left = this._carcass.x + "px";
                    this._carcass.style.width = this._carcass.w + "px"
                }
            }
            if (this.resizingDirs == "border_right" || this.resizingDirs == "corner_right" || this.resizingDirs == "corner_up_right") {
                if (this._effects.resize) {
                    var f = g.x - (this.resizingWin.x + this.resizingWin.w) + this.resizingWin.resizeOffsetXW;
                    newW = this.resizingWin.w + f;
                    if (newW < this.resizingWin.minW) {
                        newW = this.resizingWin.minW
                    }
                    this.resizingWin.w = newW;
                    this._engineRedrawWindowPos(this.resizingWin);
                    this._engineRedrawWindowSize(this.resizingWin)
                } else {
                    var f = g.x - (this._carcass.x + this._carcass.w) + this.resizingWin.resizeOffsetXW;
                    newW = this._carcass.w + f;
                    if (newW < this.resizingWin.minW) {
                        newW = this.resizingWin.minW
                    }
                    if (this.resizingWin.maxW != "auto") {
                        if (newW > this.resizingWin.maxW) {
                            newW = this.resizingWin.maxW
                        }
                    }
                    this._carcass.w = newW;
                    this._carcass.style.width = this._carcass.w + "px"
                }
            }
            if (this.resizingDirs == "border_bottom" || this.resizingDirs == "corner_left" || this.resizingDirs == "corner_right") {
                if (this._effects.resize) {
                    var f = g.y - (this.resizingWin.y + this.resizingWin.h) + this.resizingWin.resizeOffsetYH;
                    newH = this.resizingWin.h + f;
                    if (newH < this.resizingWin.minH) {
                        newH = this.resizingWin.minH
                    }
                    this.resizingWin.h = newH;
                    this._engineRedrawWindowPos(this.resizingWin);
                    this._engineRedrawWindowSize(this.resizingWin)
                } else {
                    var f = g.y - (this._carcass.y + this._carcass.h) + this.resizingWin.resizeOffsetYH;
                    newH = this._carcass.h + f;
                    if (newH < this.resizingWin.minH) {
                        newH = this.resizingWin.minH
                    }
                    if (newH > this.resizingWin.maxH) {
                        newH = this.resizingWin.maxH
                    }
                    this._carcass.h = newH;
                    this._carcass.style.height = this._carcass.h + "px"
                }
            }
            if (this.resizingDirs == "border_top" || this.resizingDirs == "corner_up_right" || this.resizingDirs == "corner_up_left") {
                if (this._effects.resize) {
                } else {
                    var f = g.y + this.resizingWin.resizeOffsetY;
                    var a = (f > this.resizingWin.y ? -1 : 1);
                    newH = this.resizingWin.h + Math.abs(f - this.resizingWin.y) * a;
                    if (newH > this.resizingWin.maxH) {
                        newH = this.resizingWin.maxH;
                        f = this.resizingWin.y + this.resizingWin.h - this.resizingWin.maxH
                    }
                    if ((newH < this.resizingWin.minH) && (a < 0)) {
                        this._carcass.y = this._carcass.y + this._carcass.h - this.resizingWin.minH;
                        this._carcass.h = this.resizingWin.minH
                    } else {
                        this._carcass.h = newH + (_isIE ? 0 : -2);
                        this._carcass.y = f
                    }
                    this._carcass.style.top = this._carcass.y + "px";
                    this._carcass.style.height = this._carcass.h + "px"
                }
            }
        }
    };
    this._stopMove = function () {
        if (this.movingWin != null) {
            if (this._effects.move) {
                var a = this.movingWin;
                this.movingWin = null;
                this._blockSwitcher(false);
                this._engineGetWindowHeader(a).style.cursor = "";
                if (_isFF) {
                    a.h++;
                    c._engineRedrawWindowPos(a);
                    a.h--;
                    c._engineRedrawWindowPos(a)
                }
            } else {
                this._carcass.style.cursor = "";
                this._carcass.style.display = "none";
                var a = this.movingWin;
                this._engineGetWindowHeader(a).style.cursor = "";
                this.movingWin = null;
                this._blockSwitcher(false);
                a.setPosition(parseInt(this._carcass.style.left), parseInt(this._carcass.style.top))
            }
            this._vpcover.style.display = "none";
            if (this._wasMoved) {
                if (a.checkEvent("onMoveFinish")) {
                    a.callEvent("onMoveFinish", [a])
                } else {
                    this.callEvent("onMoveFinish", [a])
                }
            }
            this._wasMoved = false
        }
        if (this.resizingWin != null) {
            var a = this.resizingWin;
            this.resizingWin = null;
            this._blockSwitcher(false);
            if (!this._effects.resize) {
                this._carcass.style.display = "none";
                a.setDimension(this._carcass.w + (_isIE ? 0 : 2), this._carcass.h + (_isIE ? 0 : 2));
                a.setPosition(this._carcass.x, this._carcass.y)
            } else {
                a.updateNestedObjects()
            }
            if (a.vs[a.av].layout) {
                a.vs[a.av].layout.callEvent("onResize", [])
            }
            this._vpcover.style.display = "none";
            if (a.checkEvent("onResizeFinish")) {
                a.callEvent("onResizeFinish", [a])
            } else {
                this.callEvent("onResizeFinish", [a])
            }
        }
    };
    this._fixWindowDimensionInViewport = function (a) {
        if (a.w < a.minW) {
            a.w = a.minW
        }
        if (a._isParked) {
            return
        }
        if (a.h < a.minH) {
            a.h = a.minH
        }
    };
    this._bringOnTop = function (h) {
        var f = h.zi;
        var g = this._getTopZIndex(h._isSticked);
        for (var e in this.wins) {
            if (this.wins[e] != h) {
                if (h._isSticked || (!h._isSticked && !this.wins[e]._isSticked)) {
                    if (this.wins[e].zi > f) {
                        this.wins[e].zi = this.wins[e].zi - this.zIndexStep;
                        this.wins[e].style.zIndex = this.wins[e].zi;
                        if (this.iframeMode && this.wins[e].ifr) {
                            this.wins[e].ifr.style.zIndex = this.wins[e].style.zIndex - 1
                        }
                    }
                }
            }
        }
        h.zi = g;
        h.style.zIndex = h.zi;
        if (this.iframeMode && h.ifr) {
            h.ifr.style.zIndex = g - 1
        }
    };
    this._makeActive = function (g, f) {
        for (var e in this.wins) {
            if (this.wins[e] == g) {
                var h = false;
                if (this.wins[e].className != "dhtmlx_window_active" && !f) {
                    h = true
                }
                this.wins[e].className = "dhtmlx_window_active";
                this._engineUpdateWindowIcon(this.wins[e], this.wins[e].icons[0]);
                if (h == true) {
                    if (g.checkEvent("onFocus")) {
                        g.callEvent("onFocus", [g])
                    } else {
                        this.callEvent("onFocus", [g])
                    }
                }
            } else {
                this.wins[e].className = "dhtmlx_window_inactive";
                this._engineUpdateWindowIcon(this.wins[e], this.wins[e].icons[1])
            }
        }
    };
    this._getActive = function () {
        var f = null;
        for (var e in this.wins) {
            if (this.wins[e].className == "dhtmlx_window_active") {
                f = this.wins[e]
            }
        }
        return f
    };
    this._centerWindow = function (g, a) {
        if (g._isMaximized == true) {
            return
        }
        if (a == true) {
            var e = (_isIE ? document.body.offsetWidth : window.innerWidth);
            var i = (_isIE ? document.body.offsetHeight : window.innerHeight)
        } else {
            var e = (this.vp == document.body ? document.body.offsetWidth : (Number(parseInt(this.vp.style.width)) && String(this.vp.style.width).search("%") == -1 ? parseInt(this.vp.style.width) : this.vp.offsetWidth));
            var i = (this.vp == document.body ? document.body.offsetHeight : (Number(parseInt(this.vp.style.height)) && String(this.vp.style.height).search("%") == -1 ? parseInt(this.vp.style.height) : this.vp.offsetHeight))
        }
        var h = Math.round((e / 2) - (g.w / 2));
        var f = Math.round((i / 2) - (g.h / 2));
        g.x = h;
        g.y = f;
        this._engineFixWindowPosInViewport(g);
        this._engineRedrawWindowPos(g)
    };
    this._addDefaultButtons = function (k) {
        var l = this.wins[k];
        var j = this._engineGetWindowButton(l, "stick");
        j.title = this.i18n.stick;
        j.isVisible = false;
        j.style.display = "none";
        j._isEnabled = true;
        j.isPressed = false;
        j.label = "stick";
        j._doOnClick = function () {
            this.isPressed = true;
            c._stickWindow(this.winId)
        };
        var g = this._engineGetWindowButton(l, "sticked");
        g.title = this.i18n.unstick;
        g.isVisible = false;
        g.style.display = "none";
        g._isEnabled = true;
        g.isPressed = false;
        g.label = "sticked";
        g._doOnClick = function () {
            this.isPressed = false;
            c._unstickWindow(this.winId)
        };
        var e = this._engineGetWindowButton(l, "help");
        e.title = this.i18n.help;
        e.isVisible = false;
        e.style.display = "none";
        e._isEnabled = true;
        e.isPressed = false;
        e.label = "help";
        e._doOnClick = function () {
            c._needHelp(this.winId)
        };
        var i = this._engineGetWindowButton(l, "park");
        i.titleIfParked = this.i18n.parkdown;
        i.titleIfNotParked = this.i18n.parkup;
        i.title = i.titleIfNotParked;
        i.isVisible = true;
        i._isEnabled = true;
        i.isPressed = false;
        i.label = "park";
        i._doOnClick = function () {
            c._parkWindow(this.winId)
        };
        var h = this._engineGetWindowButton(l, "minmax1");
        h.title = this.i18n.maximize;
        h.isVisible = true;
        h._isEnabled = true;
        h.isPressed = false;
        h.label = "minmax1";
        h._doOnClick = function () {
            c._maximizeWindow(this.winId)
        };
        var f = this._engineGetWindowButton(l, "minmax2");
        f.title = this.i18n.restore;
        f.isVisible = false;
        f.style.display = "none";
        f._isEnabled = true;
        f.isPressed = false;
        f.label = "minmax2";
        f._doOnClick = function () {
            c._restoreWindow(this.winId)
        };
        var n = this._engineGetWindowButton(l, "close");
        n.title = this.i18n.close;
        n.isVisible = true;
        n._isEnabled = true;
        n.isPressed = false;
        n.label = "close";
        n._doOnClick = function () {
            c._closeWindow(this.winId)
        };
        var m = this._engineGetWindowButton(l, "dock");
        m.title = this.i18n.dock;
        m.style.display = "none";
        m.isVisible = false;
        m._isEnabled = true;
        m.isPressed = false;
        m.label = "dock";
        m._doOnClick = function () {
        };
        l._isSticked = false;
        l._isParked = false;
        l._isParkedAllowed = true;
        l._isMaximized = false;
        l._isDocked = false;
        l.btns = {};
        l.btns.stick = j;
        l.btns.sticked = g;
        l.btns.help = e;
        l.btns.park = i;
        l.btns.minmax1 = h;
        l.btns.minmax2 = f;
        l.btns.close = n;
        l.btns.dock = m;
        for (var o in l.btns) {
            l.btns[o].winId = l.idd;
            this._attachEventsOnButton(l.idd, o)
        }
        l = j = g = e = i = h = f = n = m = null
    };
    this._attachEventsOnButton = function (e, f) {
        var a = this.wins[e].btns[f];
        if (!this._isIPad) {
            a.onmouseover = function () {
                if (this._isEnabled) {
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_over_" + (this.isPressed ? "pressed" : "default")
                } else {
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_disabled"
                }
            };
            a.onmouseout = function () {
                if (this._isEnabled) {
                    this.isPressed = false;
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_default"
                } else {
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_disabled"
                }
            };
            a.onmousedown = function () {
                if (this._isEnabled) {
                    this.isPressed = true;
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_over_pressed"
                } else {
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_disabled"
                }
            };
            a.onmouseup = function () {
                if (this._isEnabled) {
                    var g = this.isPressed;
                    this.isPressed = false;
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_over_default";
                    if (g) {
                        if (this.checkEvent("onClick")) {
                            this.callEvent("onClick", [c.wins[this.winId], this])
                        } else {
                            this._doOnClick()
                        }
                    }
                } else {
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_disabled"
                }
            }
        } else {
            a.ontouchstart = function (g) {
                g.cancelBubble = true;
                g.returnValue = false;
                return false
            };
            a.ontouchend = function (g) {
                g.cancelBubble = true;
                g.returnValue = false;
                if (!this._isEnabled) {
                    return false
                }
                if (this.checkEvent("onClick")) {
                    this.callEvent("onClick", [c.wins[this.winId], this])
                } else {
                    this._doOnClick()
                }
                return false
            }
        }
        a.show = function () {
            c._showButton(c.wins[this.winId], this.label, true)
        };
        a.hide = function () {
            c._hideButton(c.wins[this.winId], this.label, true)
        };
        a.enable = function () {
            c._enableButton(c.wins[this.winId], this.label)
        };
        a.disable = function () {
            c._disableButton(c.wins[this.winId], this.label)
        };
        a.isEnabled = function () {
            return this._isEnabled
        };
        a.isHidden = function () {
            return (!this.isVisible)
        };
        dhtmlxEventable(a);
        a = null
    };
    this._parkWindow = function (e, g) {
        var f = this.wins[e];
        if (!f._isParkedAllowed && !g) {
            return
        }
        if (this.enableParkEffect && f.parkBusy) {
            return
        }
        if (f._isParked) {
            if (this.enableParkEffect && !g) {
                f.parkBusy = true;
                this._doParkDown(f)
            } else {
                f.h = f.lastParkH;
                this._engineRedrawWindowSize(f);
                this._engineDoOnWindowParkDown(f);
                f.updateNestedObjects();
                f.btns.park.title = f.btns.park.titleIfNotParked;
                if (f._allowResizeGlobal == true) {
                    this._enableButton(f, "minmax1");
                    this._enableButton(f, "minmax2")
                }
                f._isParked = false;
                if (!g) {
                    if (f.checkEvent("onParkDown")) {
                        f.callEvent("onParkDown", [f])
                    } else {
                        this.callEvent("onParkDown", [f])
                    }
                }
            }
        } else {
            if (this.enableParkEffect && !g) {
                f.lastParkH = (String(f.h).search(/\%$/) == -1 ? f.h : f.offsetHeight);
                if (f._allowResizeGlobal == true) {
                    this._disableButton(f, "minmax1");
                    this._disableButton(f, "minmax2")
                }
                if (this.enableParkEffect) {
                    f.parkBusy = true;
                    this._doParkUp(f)
                } else {
                    var a = (f._skinParams != null ? f._skinParams : this.skinParams[this.skin]);
                    f.h = a.header_height + a.border_bottom_height;
                    f.btns.park.title = f.btns.park.titleIfParked
                }
            } else {
                f.lastParkH = (String(f.h).search(/\%$/) == -1 ? f.h : f.offsetHeight);
                f.h = this._engineGetWindowParkedHeight(f);
                this._engineRedrawWindowSize(f);
                this._engineDoOnWindowParkUp(f);
                f.btns.park.title = f.btns.park.titleIfParked;
                f._isParked = true;
                if (!g) {
                    if (f.checkEvent("onParkUp")) {
                        f.callEvent("onParkUp", [f])
                    } else {
                        this.callEvent("onParkUp", [f])
                    }
                }
            }
        }
        f = null
    };
    this._allowParking = function (a) {
        a._isParkedAllowed = true;
        this._enableButton(a, "park")
    };
    this._denyParking = function (a) {
        a._isParkedAllowed = false;
        this._disableButton(a, "park")
    };
    this.enableParkEffect = false;
    this.parkStartSpeed = 80;
    this.parkSpeed = this.parkStartSpeed;
    this.parkTM = null;
    this.parkTMTime = 5;
    this._doParkUp = function (e) {
        if (String(e.h).search(/\%$/) != -1) {
            e.h = e.offsetHeight
        }
        e.h -= this.parkSpeed;
        var a = this._engineGetWindowParkedHeight(e);
        if (e.h <= a) {
            e.h = a;
            this._engineGetWindowButton(e, "park").title = this._engineGetWindowButton(e, "park").titleIfParked;
            e._isParked = true;
            e.parkBusy = false;
            this._engineRedrawWindowSize(e);
            this._engineDoOnWindowParkUp(e);
            if (e.checkEvent("onParkUp")) {
                e.callEvent("onParkUp", [e])
            } else {
                this.callEvent("onParkUp", [e])
            }
        } else {
            this._engineRedrawWindowSize(e);
            this.parkTM = window.setTimeout(function () {
                c._doParkUp(e)
            }, this.parkTMTime)
        }
    };
    this._doParkDown = function (a) {
        a.h += this.parkSpeed;
        if (a.h >= a.lastParkH) {
            a.h = a.lastParkH;
            this._engineGetWindowButton(a, "park").title = this._engineGetWindowButton(a, "park").titleIfNotParked;
            if (a._allowResizeGlobal == true) {
                this._enableButton(a, "minmax1");
                this._enableButton(a, "minmax2")
            }
            a._isParked = false;
            a.parkBusy = false;
            this._engineRedrawWindowSize(a);
            a.updateNestedObjects();
            this._engineDoOnWindowParkDown(a);
            if (a.checkEvent("onParkDown")) {
                a.callEvent("onParkDown", [a])
            } else {
                this.callEvent("onParkDown", [a])
            }
        } else {
            this._engineRedrawWindowSize(a);
            this.parkTM = window.setTimeout(function () {
                c._doParkDown(a)
            }, this.parkTMTime)
        }
    };
    this._enableButton = function (f, e) {
        var a = this._engineGetWindowButton(f, e);
        if (!a) {
            return
        }
        a._isEnabled = true;
        a.className = "dhtmlx_wins_btns_button dhtmlx_button_" + a.label + "_default";
        a = null
    };
    this._disableButton = function (f, e) {
        var a = this._engineGetWindowButton(f, e);
        if (!a) {
            return
        }
        a._isEnabled = false;
        a.className = "dhtmlx_wins_btns_button dhtmlx_button_" + f.btns[e].label + "_disabled";
        a = null
    };
    this._allowReszieGlob = function (a) {
        a._allowResizeGlobal = true;
        this._enableButton(a, "minmax1");
        this._enableButton(a, "minmax2")
    };
    this._denyResize = function (a) {
        a._allowResizeGlobal = false;
        this._disableButton(a, "minmax1");
        this._disableButton(a, "minmax2")
    };
    this._maximizeWindow = function (a) {
        var f = this.wins[a];
        if (f._allowResizeGlobal == false) {
            return
        }
        var e = f._isParked;
        if (e) {
            this._parkWindow(f.idd, true)
        }
        f.lastMaximizeX = f.x;
        f.lastMaximizeY = f.y;
        f.lastMaximizeW = f.w;
        f.lastMaximizeH = f.h;
        if (f.maxW != "auto" && f.maxW != "auto") {
            f.x = Math.round(f.x + (f.w - f.maxW) / 2);
            f.y = Math.round(f.y + (f.h - f.maxH) / 2);
            f._allowMove = true
        } else {
            f.x = 0;
            f.y = 0;
            f._allowMove = false
        }
        f._isMaximized = true;
        f._allowResize = false;
        f.w = (f.maxW == "auto" ? (this.vp == document.body ? "100%" : (this.vp.style.width != "" && String(this.vp.style.width).search("%") == -1 ? parseInt(this.vp.style.width) : this.vp.offsetWidth)) : f.maxW);
        f.h = (f.maxH == "auto" ? (this.vp == document.body ? "100%" : (this.vp.style.height != "" && String(this.vp.style.width).search("%") == -1 ? parseInt(this.vp.style.height) : this.vp.offsetHeight)) : f.maxH);
        this._hideButton(f, "minmax1");
        this._showButton(f, "minmax2");
        this._engineRedrawWindowPos(f);
        if (e) {
            this._parkWindow(f.idd, true)
        } else {
            this._engineRedrawWindowSize(f);
            f.updateNestedObjects()
        }
        if (f.checkEvent("onMaximize")) {
            f.callEvent("onMaximize", [f])
        } else {
            this.callEvent("onMaximize", [f])
        }
        f = null
    };
    this._restoreWindow = function (a) {
        var f = this.wins[a];
        if (f._allowResizeGlobal == false) {
            return
        }
        if (f.layout) {
            f.layout._defineWindowMinDimension(f)
        }
        var e = f._isParked;
        if (e) {
            this._parkWindow(f.idd, true)
        }
        if (f.maxW != "auto" && f.maxW != "auto") {
            f.x = Math.round(f.x + (f.w - f.lastMaximizeW) / 2);
            f.y = Math.round(f.y + (f.h - f.lastMaximizeH) / 2)
        } else {
            f.x = f.lastMaximizeX;
            f.y = f.lastMaximizeY
        }
        f.w = f.lastMaximizeW;
        f.h = f.lastMaximizeH;
        f._isMaximized = false;
        f._allowMove = f._allowMoveGlobal;
        f._allowResize = true;
        this._fixWindowDimensionInViewport(f);
        this._hideButton(f, "minmax2");
        this._showButton(f, "minmax1");
        this._engineRedrawWindowPos(f);
        if (e) {
            this._parkWindow(f.idd, true)
        } else {
            this._engineRedrawWindowSize(f);
            f.updateNestedObjects()
        }
        if (f.checkEvent("onMinimize")) {
            f.callEvent("onMinimize", [f])
        } else {
            this.callEvent("onMinimize", [f])
        }
        f = null
    };
    this._showButton = function (g, e, f) {
        var a = this._engineGetWindowButton(g, e);
        if (!a) {
            return
        }
        if ((!f && a._userHide) || a.isVisible === true) {
            return
        }
        a.isVisible = true;
        a.style.display = "";
        a.style.visibility = "visible";
        a._userHide = !(f == true);
        this._engineRedrawWindowTitle(g);
        a = null
    };
    this._hideButton = function (g, e, f) {
        var a = this._engineGetWindowButton(g, e);
        if (!a || (!f && a.isVisible === false)) {
            return
        }
        a.isVisible = false;
        a.style.display = "none";
        a.style.visibility = "hidden";
        a._userHide = (f == true);
        this._engineRedrawWindowTitle(g);
        a = null
    };
    this._showWindow = function (e) {
        e.style.display = "";
        if (e.checkEvent("onShow")) {
            e.callEvent("onShow", [e])
        } else {
            this.callEvent("onShow", [e])
        }
        var a = this._getActive();
        if (a == null) {
            this._bringOnTop(e);
            this._makeActive(e)
        } else {
            if (this._isWindowHidden(a)) {
                this._bringOnTop(e);
                this._makeActive(e)
            }
        }
        if (this.iframeMode && e.ifr) {
            e.ifr.style.display = ""
        }
    };
    this._hideWindow = function (e) {
        e.style.display = "none";
        if (e.checkEvent("onHide")) {
            e.callEvent("onHide", [e])
        } else {
            this.callEvent("onHide", [e])
        }
        var a = this.getTopmostWindow(true);
        if (a != null) {
            this._bringOnTop(a);
            this._makeActive(a)
        }
        if (this.iframeMode && e.ifr) {
            e.ifr.style.display = "none"
        }
    };
    this._isWindowHidden = function (e) {
        var a = (e.style.display == "none");
        return a
    };
    this._closeWindow = function (g) {
        var h = this.wins[g];
        if (this._focusFixIE) {
            this._focusFixIE.style.top = (this.vp == document.body ? 0 : getAbsoluteTop(this.vp)) + Number(h.y) + "px";
            this._focusFixIE.focus()
        }
        if (h.checkEvent("onClose")) {
            if (!h.callEvent("onClose", [h])) {
                return
            }
        } else {
            if (!this.callEvent("onClose", [h])) {
                return
            }
        }
        h = null;
        this._removeWindowGlobal(g);
        var f = {zi: 0};
        for (var e in this.wins) {
            if (this.wins[e].zi > f.zi) {
                f = this.wins[e]
            }
        }
        if (f != null) {
            this._makeActive(f)
        }
    };
    this._needHelp = function (a) {
        var e = this.wins[a];
        if (e.checkEvent("onHelp")) {
            e.callEvent("onHelp", [e])
        } else {
            this.callEvent("onHelp", [e])
        }
        e = null
    };
    this._setWindowIcon = function (f, e, a) {
        f.iconsPresent = true;
        f.icons[0] = this.imagePath + e;
        f.icons[1] = this.imagePath + a;
        this._engineUpdateWindowIcon(f, f.icons[f.isOnTop() ? 0 : 1])
    };
    this._getWindowIcon = function (a) {
        if (a.iconsPresent) {
            return new Array(a.icons[0], a.icons[1])
        } else {
            return new Array(null, null)
        }
    };
    this._clearWindowIcons = function (a) {
        a.iconsPresent = false;
        a.icons[0] = this.imagePath + this.pathPrefix + this.skin + "/active/icon_blank.gif";
        a.icons[1] = this.imagePath + this.pathPrefix + this.skin + "/inactive/icon_blank.gif";
        this._engineUpdateWindowIcon(a, a.icons[a.isOnTop() ? 0 : 1])
    };
    this._restoreWindowIcons = function (a) {
        a.iconsPresent = true;
        a.icons[0] = this.imagePath + this.pathPrefix + this.skin + "/active/icon_normal.gif";
        a.icons[1] = this.imagePath + this.pathPrefix + this.skin + "/inactive/icon_normal.gif";
        this._engineUpdateWindowIcon(a, a.icons[a.className == "dhtmlx_window_active" ? 0 : 1])
    };
    this._attachWindowContentTo = function (i, g, a, e) {
        var f = this._engineGetWindowContent(i).parentNode;
        f.parentNode.removeChild(f);
        i.hide();
        f.style.left = "0px";
        f.style.top = "0px";
        f.style.width = (a != null ? a : g.offsetWidth) + "px";
        f.style.height = (e != null ? e : g.offsetHeight) + "px";
        f.style.position = "relative";
        g.appendChild(f);
        this._engineGetWindowContent(i).style.width = f.style.width;
        this._engineGetWindowContent(i).style.height = f.style.height
    };
    this._setWindowToFullScreen = function (e, a) {
        if (a == true && !e._isFullScreened) {
            e._p1 = e.vs[e.av].dhxcont.nextSibling;
            e._p1.parentNode.removeChild(e.vs[e.av].dhxcont);
            e.hide();
            e._isFullScreened = true;
            e._FSoffsetHeight = e._offsetHeight;
            e._FSoffsetHeightSaved = e._offsetHeightSaved;
            e._FSoffsetLeft = e._offsetLeft;
            e._FSoffsetWidth = e._offsetWidth;
            e._offsetHeight = 0;
            e._offsetHeightSaved = 0;
            e._offsetLeft = 0;
            e._offsetWidth = 0;
            e.vs[e.av].dhxcont.style.position = "absolute";
            document.body.appendChild(e.vs[e.av].dhxcont);
            e.adjustContent(document.body, 0, 0, false, 0);
            e.updateNestedObjects()
        }
        if (a == false && e._isFullScreened) {
            e._p1.parentNode.insertBefore(e.vs[e.av].dhxcont, e._p1);
            e._p1 = null;
            e._isFullScreened = false;
            e._offsetHeight = e._FSoffsetHeight;
            e._offsetHeightSaved = e._FSoffsetHeightSaved;
            e._offsetLeft = e._FSoffsetLeft;
            e._offsetWidth = e._FSoffsetWidth;
            e._FSoffsetHeight = e._FSoffsetHeightSaved = e._FSoffsetLeft = e._FSoffsetWidth = null;
            e.show();
            e.setDimension(e.w, e.h);
            e.bringToTop()
        }
    };
    this._isWindowOnTop = function (e) {
        var a = (this.getTopmostWindow() == e);
        return a
    };
    this._bringOnBottom = function (f) {
        for (var e in this.wins) {
            if (this.wins[e].zi < f.zi) {
                this.wins[e].zi += this.zIndexStep;
                this.wins[e].style.zIndex = this.wins[e].zi
            }
        }
        f.zi = 50;
        f.style.zIndex = f.zi;
        this._makeActive(this.getTopmostWindow())
    };
    this._isWindowOnBottom = function (g) {
        var f = true;
        for (var e in this.wins) {
            if (this.wins[e] != g) {
                f = f && (this.wins[e].zi > g.zi)
            }
        }
        return f
    };
    this._stickWindow = function (a) {
        var e = this.wins[a];
        e._isSticked = true;
        this._hideButton(e, "stick");
        this._showButton(e, "sticked");
        this._bringOnTop(e);
        e = null
    };
    this._unstickWindow = function (a) {
        var e = this.wins[a];
        e._isSticked = false;
        this._hideButton(e, "sticked");
        this._showButton(e, "stick");
        this._bringOnTopAnyStickedWindows();
        e = null
    };
    this._addUserButton = function (e, h, g, f) {
        h = String(h).toLowerCase();
        var a = this._engineAddUserButton(e, h, g);
        a.title = f;
        a.isVisible = true;
        a._isEnabled = true;
        a.isPressed = false;
        a.label = h;
        e.btns[h] = a;
        e.btns[h].winId = e.idd;
        e.btns[h]._doOnClick = function () {
        };
        this._attachEventsOnButton(e.idd, h);
        a = null
    };
    this._removeUserButton = function (e, a) {
        this._removeButtonGlobal(e, a)
    };
    this._blockSwitcher = function (f) {
        for (var e in this.wins) {
            if (f == true) {
                this.wins[e].showCoverBlocker()
            } else {
                this.wins[e].hideCoverBlocker()
            }
        }
    };
    this.resizingWin = null;
    this.modalWin = null;
    this.resizingDirs = "none";
    if (_isIE) {
        this._focusFixIE = document.createElement("INPUT");
        this._focusFixIE.className = "dhx_windows_ieonclosefocusfix";
        this._focusFixIE.style.position = "absolute";
        this._focusFixIE.style.width = "1px";
        this._focusFixIE.style.height = "1px";
        this._focusFixIE.style.border = "none";
        this._focusFixIE.style.background = "none";
        this._focusFixIE.style.left = "-10px";
        this._focusFixIE.style.fontSize = "1px";
        document.body.appendChild(this._focusFixIE)
    }
    this._createViewport();
    this._doOnMouseUp = function () {
        if (c != null) {
            c._stopMove()
        }
    };
    this._doOnMoseMove = function (a) {
        a = a || event;
        if (c != null) {
            c._moveWindow(a)
        }
    };
    this._resizeTM = null;
    this._resizeTMTime = 200;
    this._lw = null;
    this._doOnResize = function () {
        if (c._lw != document.documentElement.clientHeight) {
            window.clearTimeout(c._resizeTM);
            c._resizeTM = window.setTimeout(function () {
                c._autoResizeViewport()
            }, c._resizeTMTime)
        }
        c._lw = document.documentElement.clientHeight
    };
    this._doOnUnload = function () {
        c.unload()
    };
    this._doOnSelectStart = function (a) {
        a = a || event;
        if (c.movingWin != null || c.resizingWin != null) {
            a.returnValue = false
        }
    };
    if (_isIE) {
        document.body.attachEvent("onselectstart", this._doOnSelectStart)
    }
    dhtmlxEvent(window, "resize", this._doOnResize);
    dhtmlxEvent(document.body, "unload", this._doOnUnload);
    if (this._isIPad) {
        document.addEventListener("touchmove", this._doOnMoseMove, false);
        document.addEventListener("touchend", this._doOnMouseUp, false)
    } else {
        dhtmlxEvent(document.body, "mouseup", this._doOnMouseUp);
        dhtmlxEvent(this.vp, "mousemove", this._doOnMoseMove);
        dhtmlxEvent(this.vp, "mouseup", this._doOnMouseUp)
    }
    this._setWindowModal = function (e, a) {
        if (a == true) {
            this._makeActive(e);
            this._bringOnTop(e);
            this.modalWin = e;
            e._isModal = true;
            this.modalCoverI.style.zIndex = e.zi - 2;
            this.modalCoverI.style.display = "";
            this.modalCoverD.style.zIndex = e.zi - 2;
            this.modalCoverD.style.display = ""
        } else {
            this.modalWin = null;
            e._isModal = false;
            this.modalCoverI.style.zIndex = 0;
            this.modalCoverI.style.display = "none";
            this.modalCoverD.style.zIndex = 0;
            this.modalCoverD.style.display = "none"
        }
    };
    this._bringOnTopAnyStickedWindows = function () {
        var g = new Array();
        for (var e in this.wins) {
            if (this.wins[e]._isSticked) {
                g[g.length] = this.wins[e]
            }
        }
        for (var f = 0; f < g.length; f++) {
            this._bringOnTop(g[f])
        }
        if (g.length == 0) {
            for (var e in this.wins) {
                if (this.wins[e].className == "dhtmlx_window_active") {
                    this._bringOnTop(this.wins[e])
                }
            }
        }
    };
    this.unload = function () {
        this._clearAll()
    };
    this._removeButtonGlobal = function (e, f) {
        if (!this.wins[e]) {
            return
        }
        if (!this.wins[e].btns[f]) {
            return
        }
        var a = this.wins[e].btns[f];
        a.title = null;
        a.isVisible = null;
        a._isEnabled = null;
        a.isPressed = null;
        a.label = null;
        a._doOnClick = null;
        a.detachAllEvents();
        a.attachEvent = null;
        a.callEvent = null;
        a.checkEvent = null;
        a.detachEvent = null;
        a.detachAllEvents = null;
        a.disable = null;
        a.enable = null;
        a.eventCatcher = null;
        a.hide = null;
        a.isEnabled = null;
        a.isHidden = null;
        a.show = null;
        a.onmousedown = null;
        a.onmouseout = null;
        a.onmouseover = null;
        a.onmouseup = null;
        a.ontouchstart = null;
        a.ontouchend = null;
        if (a.parentNode) {
            a.parentNode.removeChild(a)
        }
        a = null;
        this.wins[e].btns[f] = null;
        delete this.wins[e].btns[f]
    };
    this._removeWindowGlobal = function (g) {
        var h = this.wins[g];
        if (this.modalWin == h) {
            this._setWindowModal(h, false)
        }
        if (this.iframeMode && h.ifr) {
            h.ifr.parentNode.removeChild(h.ifr);
            h.ifr = null
        }
        var f = h.coverBlocker();
        f.onselectstart = null;
        f = null;
        this._engineDiableOnSelectInWindow(h, false);
        h._dhxContDestruct();
        this._engineGetWindowHeader(h).onmousedown = null;
        this._engineGetWindowHeader(h).ondblclick = null;
        this.movingWin = null;
        this.resizingWin = null;
        for (var e in h.btns) {
            this._removeButtonGlobal(h, e)
        }
        h.btns = null;
        h.detachAllEvents();
        h._adjustToContent = null;
        h._doOnAttachMenu = null;
        h._doOnAttachStatusBar = null;
        h._doOnAttachToolbar = null;
        h._doOnFrameMouseDown = null;
        h._doOnFrameContentLoaded = null;
        h._redraw = null;
        h.addUserButton = null;
        h.allowMove = null;
        h.allowPark = null;
        h.allowResize = null;
        h.attachEvent = null;
        h.bringToBottom = null;
        h.bringToTop = null;
        h.callEvent = null;
        h.center = null;
        h.centerOnScreen = null;
        h.checkEvent = null;
        h.clearIcon = null;
        h.close = null;
        h.denyMove = null;
        h.denyPark = null;
        h.denyResize = null;
        h.detachEvent = null;
        h.detachAllEvents = null;
        h.eventCatcher = null;
        h.getDimension = null;
        h.getIcon = null;
        h.getId = null;
        h.getMaxDimension = null;
        h.getMinDimension = null;
        h.getPosition = null;
        h.getText = null;
        h.hide = null;
        h.hideHeader = null;
        h.isHidden = null;
        h.isMaximized = null;
        h.isModal = null;
        h.isMovable = null;
        h.isOnBottom = null;
        h.isOnTop = null;
        h.isParkable = null;
        h.isParked = null;
        h.isResizable = null;
        h.isSticked = null;
        h.keepInViewport = null;
        h.maximize = null;
        h.minimize = null;
        h.park = null;
        h.progressOff = null;
        h.progressOn = null;
        h.removeUserButton = null;
        h.restoreIcon = null;
        h.setDimension = null;
        h.setIcon = null;
        h.setMaxDimension = null;
        h.setMinDimension = null;
        h.setModal = null;
        h.setPosition = null;
        h.setText = null;
        h.setToFullScreen = null;
        h.show = null;
        h.showHeader = null;
        h.stick = null;
        h.unstick = null;
        h.onmousemove = null;
        h.onmousedown = null;
        h.icons = null;
        h.button = null;
        h._dhxContDestruct = null;
        h.dhxContGlobal.obj = null;
        h.dhxContGlobal.setContent = null;
        h.dhxContGlobal.dhxcont = null;
        h.dhxContGlobal = null;
        if (h._frame) {
            while (h._frame.childNodes.length > 0) {
                h._frame.removeChild(h._frame.childNodes[0])
            }
            h._frame = null
        }
        this._parseNestedForEvents(h);
        h._content = null;
        h.innerHTML = "";
        h.parentNode.removeChild(h);
        h = null;
        this.wins[g] = null;
        delete this.wins[g]
    };
    this._removeEvents = function (a) {
        a.onmouseover = null;
        a.onmouseout = null;
        a.onmousemove = null;
        a.onclick = null;
        a.ondblclick = null;
        a.onmouseenter = null;
        a.onmouseleave = null;
        a.onmouseup = null;
        a.onmousewheel = null;
        a.onmousedown = null;
        a.onselectstart = null;
        a.onfocus = null;
        a.style.display = "";
        a = null
    };
    this._parseNestedForEvents = function (e) {
        this._removeEvents(e);
        for (var a = 0; a < e.childNodes.length; a++) {
            if (e.childNodes[a].tagName != null) {
                this._parseNestedForEvents(e.childNodes[a])
            }
        }
        e = null
    };
    this._clearAll = function () {
        this._clearDocumentEvents();
        for (var e in this.wins) {
            this._removeWindowGlobal(e)
        }
        this.wins = null;
        this._parseNestedForEvents(this._carcass);
        while (this._carcass.childNodes.length > 0) {
            this._carcass.removeChild(this._carcass.childNodes[0])
        }
        this._carcass.onselectstart = null;
        this._carcass.parentNode.removeChild(this._carcass);
        this._carcass = null;
        this._parseNestedForEvents(this._vpcover);
        this._vpcover.parentNode.removeChild(this._vpcover);
        this._vpcover = null;
        this._parseNestedForEvents(this.modalCoverD);
        this.modalCoverD.parentNode.removeChild(this.modalCoverD);
        this.modalCoverD = null;
        this._parseNestedForEvents(this.modalCoverI);
        this.modalCoverI.parentNode.removeChild(this.modalCoverI);
        this.modalCoverI = null;
        if (this.vp.autocreated == true) {
            this.vp.parentNode.removeChild(this.vp)
        }
        this.vp = null;
        for (var e in this.skinParams) {
            delete this.skinParams[e]
        }
        this.skinParams = null;
        this._effects = null;
        this._engineSkinParams = null;
        this._addDefaultButtons = null;
        this._addUserButton = null;
        this._allowParking = null;
        this._allowReszieGlob = null;
        this._attachEventsOnButton = null;
        this._attachWindowContentTo = null;
        this._autoResizeViewport = null;
        this._blockSwitcher = null;
        this._bringOnBottom = null;
        this._bringOnTop = null;
        this._bringOnTopAnyStickedWindows = null;
        this._centerWindow = null;
        this._clearAll = null;
        this._clearDocumentEvents = null;
        this._clearWindowIcons = null;
        this._closeWindow = null;
        this._createViewport = null;
        this._denyParking = null;
        this._denyResize = null;
        this._dhx_Engine = null;
        this._disableButton = null;
        this._doOnMoseMove = null;
        this._doOnMouseUp = null;
        this._doOnResize = null;
        this._doOnSelectStart = null;
        this._doOnUnload = null;
        this._doParkDown = null;
        this._doParkUp = null;
        this._enableButton = null;
        this._engineAddUserButton = null;
        this._engineAdjustWindowToContent = null;
        this._engineAllowWindowResize = null;
        this._engineCheckHeaderMouseDown = null;
        this._engineDiableOnSelectInWindow = null;
        this._engineDoOnWindowParkDown = null;
        this._engineDoOnWindowParkUp = null;
        this._engineFixWindowPosInViewport = null;
        this._engineGetWindowButton = null;
        this._engineGetWindowContent = null;
        this._engineGetWindowHeader = null;
        this._engineGetWindowHeaderState = null;
        this._engineGetWindowLabel = null;
        this._engineGetWindowParkedHeight = null;
        this._engineRedrawSkin = null;
        this._engineRedrawWindowPos = null;
        this._engineRedrawWindowSize = null;
        this._engineRedrawWindowTitle = null;
        this._engineSetWindowBody = null;
        this._engineSwitchWindowHeader = null;
        this._engineSwitchWindowProgress = null;
        this._engineUpdateWindowIcon = null;
        this._fixWindowDimensionInViewport = null;
        this._genStr = null;
        this._getActive = null;
        this._getTopZIndex = null;
        this._getWindowIcon = null;
        this._hideButton = null;
        this._hideWindow = null;
        this._isWindowHidden = null;
        this._isWindowOnBottom = null;
        this._isWindowOnTop = null;
        this._makeActive = null;
        this._maximizeWindow = null;
        this._moveWindow = null;
        this._needHelp = null;
        this._parkWindow = null;
        this._parseNestedForEvents = null;
        this._removeButtonGlobal = null;
        this._removeEvents = null;
        this._removeUserButton = null;
        this._removeWindowGlobal = null;
        this._restoreWindow = null;
        this._restoreWindowIcons = null;
        this._setWindowIcon = null;
        this._setWindowModal = null;
        this._setWindowToFullScreen = null;
        this._showButton = null;
        this._showWindow = null;
        this._stickWindow = null;
        this._stopMove = null;
        this._unstickWindow = null;
        this.attachEvent = null;
        this.attachViewportTo = null;
        this.callEvent = null;
        this.checkEvent = null;
        this.createWindow = null;
        this.detachEvent = null;
        this.enableAutoViewport = null;
        this.eventCatcher = null;
        this.findByText = null;
        this.forEachWindow = null;
        this.getBottommostWindow = null;
        this.getEffect = null;
        this.getTopmostWindow = null;
        this.isWindow = null;
        this.setEffect = null;
        this.setImagePath = null;
        this.setSkin = null;
        this.setViewport = null;
        this.unload = null;
        this.window = null;
        c = null
    };
    this._clearDocumentEvents = function () {
        if (_isIE) {
            window.detachEvent("onresize", this._doOnResize);
            document.body.detachEvent("onselectstart", this._doOnSelectStart);
            document.body.detachEvent("onmouseup", this._doOnMouseUp);
            document.body.detachEvent("onunload", this._doOnUnload);
            this.vp.detachEvent("onmousemove", this._doOnMoseMove);
            this.vp.detachEvent("onmouseup", this._doOnMouseUp)
        } else {
            window.removeEventListener("resize", this._doOnResize, false);
            document.body.removeEventListener("mouseup", this._doOnMouseUp, false);
            document.body.removeEventListener("unload", this._doOnUnload, false);
            this.vp.removeEventListener("mousemove", this._doOnMoseMove, false);
            this.vp.removeEventListener("mouseup", this._doOnMouseUp, false)
        }
    };
    this._genStr = function (a) {
        var e = "";
        var g = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var f = 0; f < a; f++) {
            e += g.charAt(Math.round(Math.random() * (g.length - 1)))
        }
        return e
    };
    dhtmlxEventable(this);
    return this
}
dhtmlXWindows.prototype._dhx_Engine = function () {
    this._engineEnabled = true;
    this._engineName = "dhx";
    this._engineSkinParams = {
        dhx_blue: {
            hh: 21,
            lbw: 2,
            rbw: 2,
            lch: 2,
            lcw: 14,
            rch: 14,
            rcw: 14,
            bbh: 2,
            mnh: 23,
            tbh: 25,
            sbh: 20,
            noh_t: null,
            noh_h: null
        },
        dhx_black: {
            hh: 21,
            lbw: 2,
            rbw: 2,
            lch: 2,
            lcw: 14,
            rch: 14,
            rcw: 14,
            bbh: 2,
            mnh: 23,
            tbh: 25,
            sbh: 20,
            noh_t: null,
            noh_h: null
        },
        dhx_skyblue: {
            hh: 29,
            lbw: 2,
            rbw: 2,
            lch: 2,
            lcw: 14,
            rch: 14,
            rcw: 14,
            bbh: 2,
            mnh: 23,
            tbh: 25,
            sbh: 20,
            noh_t: 5,
            noh_h: -10
        },
        dhx_web: {
            hh: 27,
            lbw: 5,
            rbw: 5,
            lch: 5,
            lcw: 14,
            rch: 14,
            rcw: 14,
            bbh: 5,
            mnh: 23,
            tbh: 25,
            sbh: 20,
            noh_t: 5,
            noh_h: -10
        },
        dhx_terrace: {
            hh: 37,
            lbw: 5,
            rbw: 5,
            lch: 5,
            lcw: 14,
            rch: 14,
            rcw: 14,
            bbh: 5,
            mnh: 23,
            tbh: 25,
            sbh: 20,
            noh_t: 0,
            noh_h: -10
        }
    };
    this._isIE6 = false;
    if (_isIE) {
        this._isIE6 = (window.XMLHttpRequest == null ? true : false)
    }
    this._engineSetWindowBody = function (b) {
        b.innerHTML = "<div iswin='1' class='dhtmlx_wins_body_outer' style='position: relative;'>" + (this._isIE6 ? "<iframe src='javascript:false;' frameborder='0' class='dhtmlx_wins_ie6_cover_fix' onload='this.contentWindow.document.body.style.overflow=\"hidden\";'></iframe>" : "") + "<div class='dhtmlx_wins_icon'></div><div class='dhtmlx_wins_progress'></div><div class='dhtmlx_wins_title'>dhtmlxWindow</div><div class='dhtmlx_wins_btns'><div class='dhtmlx_wins_btns_button dhtmlx_button_sticked_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_stick_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_help_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_park_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_minmax2_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_minmax1_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_close_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_dock_default'></div></div><div class='dhtmlx_wins_body_inner'></div><div winResT='yes' class='dhtmlx_wins_resizer_t' style='display:none;'></div><div winResL='yes' class='dhtmlx_wins_resizer_l'></div><div winResR='yes' class='dhtmlx_wins_resizer_r'></div><div winResB='yes' class='dhtmlx_wins_resizer_b'></div><div class='white_line'></div><div class='white_line2'></div></div>";
        b.dhxContGlobal = new dhtmlXContainer(b);
        if (this.skin == "dhx_skyblue") {
            b.dhxContGlobal.obj._offsetWidth = -10;
            b.dhxContGlobal.obj._offsetHeight = -5;
            b.dhxContGlobal.obj._offsetLeft = 5;
            b.dhxContGlobal.obj._offsetHeightSaved = b.dhxContGlobal.obj._offsetHeight
        }
        if (this.skin == "dhx_web") {
            b.dhxContGlobal.obj._offsetWidth = -10;
            b.dhxContGlobal.obj._offsetHeight = -5;
            b.dhxContGlobal.obj._offsetLeft = 5;
            b.dhxContGlobal.obj._offsetHeightSaved = b.dhxContGlobal.obj._offsetHeight
        }
        b.skin = this.skin;
        b.dhxContGlobal.setContent(b.childNodes[0].childNodes[(this._isIE6 ? 5 : 4)]);
        var a = b.coverBlocker();
        a.onselectstart = function (c) {
            c = c || event;
            c.returnValue = false;
            c.cancelBubble = true
        };
        a = null;
        if (this.iframeMode) {
            b.ifr = document.createElement("IFRAME");
            b.ifr.style.position = "absolute";
            b.ifr.style.left = b.style.left;
            b.ifr.style.top = b.style.top;
            b.ifr.style.width = b.style.width;
            b.ifr.style.height = b.style.height;
            b.ifr.style.zIndex = b.style.zIndex - 1;
            b.ifr.style.backgroundColor = "white";
            b.ifr.frameBorder = 0;
            b.ifr.setAttribute("src", "javascript:false;");
            b.parentNode.appendChild(b.ifr)
        }
    };
    this._engineDiableOnSelectInWindow = function (d, c) {
        var b = new Array();
        b[0] = d.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)];
        b[1] = d.childNodes[0].childNodes[(this._isIE6 ? 2 : 1)];
        b[2] = d.childNodes[0].childNodes[(this._isIE6 ? 3 : 2)];
        b[3] = d.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)];
        b[4] = d.childNodes[0].childNodes[(this._isIE6 ? 6 : 5)];
        b[5] = d.childNodes[0].childNodes[(this._isIE6 ? 7 : 6)];
        b[6] = d.childNodes[0].childNodes[(this._isIE6 ? 8 : 7)];
        b[7] = d.childNodes[0].childNodes[(this._isIE6 ? 9 : 8)];
        for (var a = 0; a < b.length; a++) {
            b[a].onselectstart = (c ? function (f) {
                f = f || event;
                f.returnValue = false;
                return false
            } : null);
            b[a] = null
        }
        b = null
    };
    this._engineGetWindowHeader = function (a) {
        a.childNodes[0].idd = a.idd;
        return a.childNodes[0]
    };
    this._engineRedrawWindowSize = function (d) {
        d.style.width = (String(d.w).search("%") == -1 ? d.w + "px" : d.w);
        d.style.height = (String(d.h).search("%") == -1 ? d.h + "px" : d.h);
        var a = d.childNodes[0];
        a.style.width = d.clientWidth + "px";
        a.style.height = d.clientHeight + "px";
        if (a.offsetWidth > d.clientWidth) {
            a.style.width = d.clientWidth * 2 - a.offsetWidth + "px"
        }
        if (a.offsetHeight > d.clientHeight) {
            var c = d.clientHeight * 2 - a.offsetHeight;
            if (c < 0) {
                c = 0
            }
            a.style.height = c + "px"
        }
        var b = (d._noHeader == true ? d._hdrSize : this._engineSkinParams[this.skin]["hh"]);
        if (this.iframeMode && d.ifr) {
            d.ifr.style.width = d.style.width;
            d.ifr.style.height = d.style.height
        }
        this._engineRedrawWindowTitle(d);
        d.adjustContent(a, b)
    };
    this._engineRedrawWindowPos = function (a) {
        if (a._isFullScreened) {
            return
        }
        a.style.left = a.x + "px";
        a.style.top = a.y + "px";
        if (this.iframeMode && a.ifr) {
            a.ifr.style.top = a.style.top;
            a.ifr.style.left = a.style.left
        }
    };
    this._engineFixWindowPosInViewport = function (b) {
        var a = (b._noHeader == true ? b._hdrSize : this._engineSkinParams[this.skin]["hh"]);
        if (b._keepInViewport) {
            if (b.x < 0) {
                b.x = 0
            }
            if (b.x + b.w > this.vp.offsetWidth) {
                b.x = this.vp.offsetWidth - b.w
            }
            if (b.y + b.h > this.vp.offsetHeight) {
                b.y = this.vp.offsetHeight - b.h
            }
            if (b.y < 0) {
                b.y = 0
            }
        } else {
            if (b.y + a > this.vp.offsetHeight) {
                b.y = this.vp.offsetHeight - a
            }
            if (b.y < 0) {
                b.y = 0
            }
            if (b.x + b.w - 10 < 0) {
                b.x = 10 - b.w
            }
            if (b.x > this.vp.offsetWidth - 10) {
                b.x = this.vp.offsetWidth - 10
            }
        }
    };
    this._engineCheckHeaderMouseDown = function (e, c) {
        if (this._isIPad) {
            var a = c.touches[0].clientX;
            var f = c.touches[0].clientY;
            var d = c.target || c.srcElement;
            if (d == e.childNodes[0] || d == e.childNodes[0].childNodes[0] || d == e.childNodes[0].childNodes[2] || d == e.childNodes[0].childNodes[3]) {
                return true
            }
            return false
        } else {
            var a = (_isIE || _isOpera ? c.offsetX : c.layerX);
            var f = (_isIE || _isOpera ? c.offsetY : c.layerY);
            var d = c.target || c.srcElement
        }
        var b = (e._noHeader == true ? e._hdrSize : this._engineSkinParams[this.skin]["hh"]);
        if (f <= b && (d == e.childNodes[0] || d == e.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)] || d == e.childNodes[0].childNodes[(this._isIE6 ? 3 : 2)] || d == e.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)])) {
            return true
        }
        return false
    };
    this._engineGetWindowContent = function (a) {
        alert("_engineGetWindowContent")
    };
    this._engineGetWindowButton = function (d, a) {
        a = String(a).toLowerCase();
        var b = null;
        var f = "dhtmlx_button_" + a + "_";
        for (var c = 0; c < d.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)].childNodes.length; c++) {
            var e = d.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)].childNodes[c];
            if (String(e.className).search(f) != -1) {
                b = e
            }
            e = null
        }
        return b
    };
    this._engineAddUserButton = function (e, a, d) {
        if (isNaN(d)) {
            d = 0
        }
        var c = document.createElement("DIV");
        c.className = "dhtmlx_wins_btns_button dhtmlx_button_" + a + "_default";
        var b = e.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)];
        d = b.childNodes.length - d;
        if (d < 0) {
            d = 0
        }
        if (d >= b.childNodes.length) {
            b.appendChild(c)
        } else {
            b.insertBefore(c, b.childNodes[d])
        }
        this._engineRedrawWindowTitle(e);
        return c
    };
    this._engineGetWindowParkedHeight = function (a) {
        return this._engineSkinParams[this.skin]["hh"] + 1
    };
    this._engineDoOnWindowParkDown = function (a) {
        a.childNodes[0].childNodes[(this._isIE6 ? 6 : 5)].style.display = (a._noHeader == true ? "" : "none");
        a.childNodes[0].childNodes[(this._isIE6 ? 7 : 6)].style.display = "";
        a.childNodes[0].childNodes[(this._isIE6 ? 8 : 7)].style.display = "";
        a.childNodes[0].childNodes[(this._isIE6 ? 9 : 8)].style.display = ""
    };
    this._engineDoOnWindowParkUp = function (a) {
        a.childNodes[0].childNodes[(this._isIE6 ? 6 : 5)].style.display = "none";
        a.childNodes[0].childNodes[(this._isIE6 ? 7 : 6)].style.display = "none";
        a.childNodes[0].childNodes[(this._isIE6 ? 8 : 7)].style.display = "none";
        a.childNodes[0].childNodes[(this._isIE6 ? 9 : 8)].style.display = "none"
    };
    this._engineUpdateWindowIcon = function (b, a) {
        b.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)].style.backgroundImage = "url('" + a + "')"
    };
    this._engineAllowWindowResize = function (f, e, d, b) {
        if (!e.getAttribute) {
            return
        }
        var a = this._engineSkinParams[this.skin];
        var c = (f._noHeader == true ? f._hdrSize : this._engineSkinParams[this.skin]["hh"]);
        if (e.getAttribute("winResL") != null) {
            if (e.getAttribute("winResL") == "yes") {
                if (b >= c) {
                    if (b >= f.h - a.lch) {
                        return "corner_left"
                    }
                    if (b <= a.lch && f._noHeader == true) {
                        return "corner_up_left"
                    }
                    return "border_left"
                }
            }
        }
        if (e.getAttribute("winResR") != null) {
            if (e.getAttribute("winResR") == "yes") {
                if (b >= c) {
                    if (b >= f.h - a.rch) {
                        return "corner_right"
                    }
                    if (b <= a.rch && f._noHeader == true) {
                        return "corner_up_right"
                    }
                    return "border_right"
                }
            }
        }
        if (e.getAttribute("winResT") != null) {
            if (e.getAttribute("winResT") == "yes" && f._noHeader == true) {
                if (d <= a.lcw) {
                    return "corner_up_left"
                }
                if (d >= f.w - a.rcw) {
                    return "corner_up_right"
                }
                return "border_top"
            }
        }
        if (e.getAttribute("winResB") != null) {
            if (e.getAttribute("winResB") == "yes") {
                if (d <= a.lcw) {
                    return "corner_left"
                }
                if (d >= f.w - a.rcw) {
                    return "corner_right"
                }
                return "border_bottom"
            }
        }
        return null
    };
    this._engineAdjustWindowToContent = function (d, a, c) {
        var e = a + d.w - d.vs[d.av].dhxcont.clientWidth;
        var b = c + d.h - d.vs[d.av].dhxcont.clientHeight;
        d.setDimension(e, b)
    };
    this._engineRedrawSkin = function () {
        this.vp.className = (this.vp == document.body && this.vp._css ? this.vp._css + " " : "") + "dhtmlx_winviewport dhtmlx_skin_" + this.skin + (this._r ? " dhx_wins_rtl" : "");
        var c = this._engineSkinParams[this.skin];
        for (var b in this.wins) {
            if (this.skin == "dhx_skyblue") {
                this.wins[b].dhxContGlobal.obj._offsetTop = (this.wins[b]._noHeader ? c.noh_t : null);
                this.wins[b].dhxContGlobal.obj._offsetWidth = -10;
                this.wins[b].dhxContGlobal.obj._offsetHeight = (this.wins[b]._noHeader ? c.noh_h : -5);
                this.wins[b].dhxContGlobal.obj._offsetLeft = 5;
                this.wins[b].dhxContGlobal.obj._offsetHeightSaved = -5
            } else {
                this.wins[b].dhxContGlobal.obj._offsetWidth = null;
                this.wins[b].dhxContGlobal.obj._offsetHeight = null;
                this.wins[b].dhxContGlobal.obj._offsetLeft = null;
                this.wins[b].dhxContGlobal.obj._offsetTop = null;
                this.wins[b].dhxContGlobal.obj._offsetHeightSaved = null
            }
            this.wins[b].skin = this.skin;
            this._restoreWindowIcons(this.wins[b]);
            this._engineRedrawWindowSize(this.wins[b])
        }
    };
    this._engineSwitchWindowProgress = function (b, a) {
        if (a == true) {
            b.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)].style.display = "none";
            b.childNodes[0].childNodes[(this._isIE6 ? 2 : 1)].style.display = ""
        } else {
            b.childNodes[0].childNodes[(this._isIE6 ? 2 : 1)].style.display = "none";
            b.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)].style.display = ""
        }
    };
    this._engineSwitchWindowHeader = function (c, b) {
        if (!c._noHeader) {
            c._noHeader = false
        }
        if (b != c._noHeader) {
            return
        }
        c._noHeader = (b == true ? false : true);
        c._hdrSize = 0;
        c.childNodes[0].childNodes[(this._isIE6 ? 5 : 4)].className = "dhtmlx_wins_body_inner" + (c._noHeader ? " dhtmlx_wins_no_header" : "");
        c.childNodes[0].childNodes[(this._isIE6 ? 6 : 5)].style.display = (c._noHeader ? "" : "none");
        c.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)].style.display = (c._noHeader ? "none" : "");
        c.childNodes[0].childNodes[(this._isIE6 ? 3 : 2)].style.display = (c._noHeader ? "none" : "");
        c.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)].style.display = (c._noHeader ? "none" : "");
        var a = this._engineSkinParams[this.skin];
        if (c._noHeader) {
            c.dhxContGlobal.obj._offsetHeightSaved = c.dhxContGlobal.obj._offsetHeight;
            c.dhxContGlobal.obj._offsetHeight = a.noh_h;
            c.dhxContGlobal.obj._offsetTop = a.noh_t
        } else {
            c.dhxContGlobal.obj._offsetHeight = c.dhxContGlobal.obj._offsetHeightSaved;
            c.dhxContGlobal.obj._offsetTop = null
        }
        this._engineRedrawWindowSize(c)
    };
    this._engineGetWindowHeaderState = function (a) {
        return (a._noHeader ? true : false)
    };
    this._engineGetWindowLabel = function (a) {
        return a.childNodes[0].childNodes[(this._isIE6 ? 3 : 2)]
    };
    this._engineRedrawWindowTitle = function (c) {
        if (c._noHeader !== true) {
            var b = c.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)].offsetWidth;
            var a = c.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)].offsetWidth;
            var d = c.offsetWidth - b - a - 24;
            if (d < 0) {
                d = "100%"
            } else {
                d += "px"
            }
            c.childNodes[0].childNodes[(this._isIE6 ? 3 : 2)].style.width = d
        }
    }
};
dhtmlXWindows.prototype.i18n = {
    dhxcontaler: "dhtmlxcontainer.js is missed on the page",
    noenginealert: "No dhtmlxWindows engine was found.",
    stick: "Stick",
    unstick: "Unstick",
    help: "Help",
    parkdown: "Park Down",
    parkup: "Park Up",
    maximize: "Maximize",
    restore: "Restore",
    close: "Close",
    dock: "Dock"
};
(function () {
    dhtmlx.extend_api("dhtmlXWindows", {
        _init: function (b) {
            return []
        }, _patch: function (b) {
            b.old_createWindow = b.createWindow;
            b.createWindow = function (e) {
                if (arguments.length > 1) {
                    return this.old_createWindow.apply(this, arguments)
                }
                var d = this.old_createWindow(e.id, (e.x || e.left), (e.y || e.top), e.width, e.height);
                d.allowMoveA = function (f) {
                    if (f) {
                        this.allowMove()
                    } else {
                        this.denyMove()
                    }
                };
                d.allowParkA = function (f) {
                    if (f) {
                        this.allowPark()
                    } else {
                        this.denyPark()
                    }
                };
                d.allowResizeA = function (f) {
                    if (f) {
                        this.allowResize()
                    } else {
                        this.denyResize()
                    }
                };
                for (var c in e) {
                    if (a[c]) {
                        d[a[c]](e[c])
                    } else {
                        if (c.indexOf("on") == 0) {
                            d.attachEvent(c, e[c])
                        }
                    }
                }
                return d
            }
        }, animation: "setEffect", image_path: "setImagePath", skin: "setSkin", viewport: "_viewport", wins: "_wins"
    }, {
        _viewport: function (b) {
            if (b.object) {
                this.enableAutoViewport(false);
                this.attachViewportTo(b.object)
            } else {
                this.enableAutoViewport(false);
                this.setViewport(b.left, b.top, b.width, b.height, b.parent)
            }
        }, _wins: function (b) {
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                this.createWindow(d.id, d.left, d.top, d.width, d.height);
                if (d.text) {
                    this.window(d.id).setText(d.text)
                }
                if (d.keep_in_viewport) {
                    this.window(d.id).keepInViewport(true)
                }
                if (d.deny_resize) {
                    this.window(d.id).denyResize()
                }
                if (d.deny_park) {
                    this.window(d.id).denyPark()
                }
                if (d.deny_move) {
                    this.window(d.id).denyMove()
                }
            }
        }
    });
    var a = {
        move: "allowMoveA",
        park: "allowParkA",
        resize: "allowResizeA",
        center: "center",
        modal: "setModal",
        caption: "setText",
        header: "showHeader"
    }
})();
function dhtmlXContainer(i) {
    var g = this;
    this.obj = i;
    i = null;
    this.obj._padding = !0;
    this.dhxcont = null;
    this.st = document.createElement("DIV");
    this.st.style.position = "absolute";
    this.st.style.left = "-200px";
    this.st.style.top = "0px";
    this.st.style.width = "100px";
    this.st.style.height = "1px";
    this.st.style.visibility = "hidden";
    this.st.style.overflow = "hidden";
    document.body.insertBefore(this.st, document.body.childNodes[0]);
    this.obj._getSt = function () {
        return g.st
    };
    this.obj.dv = "def";
    this.obj.av = this.obj.dv;
    this.obj.cv = this.obj.av;
    this.obj.vs = {};
    this.obj.vs[this.obj.av] = {};
    this.obj.view = function (b) {
        if (!this.vs[b]) {
            this.vs[b] = {};
            this.vs[b].dhxcont = this.vs[this.dv].dhxcont;
            var a = document.createElement("DIV");
            a.style.position = "relative";
            a.style.left = "0px";
            a.style.width = "200px";
            a.style.height = "200px";
            a.style.overflow = "hidden";
            a.style.visibility = "";
            g.st.appendChild(a);
            this.vs[b].dhxcont.mainCont[b] = a;
            a = null
        }
        this.avt = this.av;
        this.av = b;
        return this
    };
    this.obj.setActive = function () {
        if (this.vs[this.av]) {
            this.cv = this.av, this.vs[this.avt].dhxcont == this.vs[this.avt].dhxcont.mainCont[this.avt].parentNode && (g.st.appendChild(this.vs[this.avt].dhxcont.mainCont[this.avt]), this.vs[this.avt].menu && g.st.appendChild(document.getElementById(this.vs[this.avt].menuId)), this.vs[this.avt].toolbar && g.st.appendChild(document.getElementById(this.vs[this.avt].toolbarId)), this.vs[this.avt].sb && g.st.appendChild(document.getElementById(this.vs[this.avt].sbId))), this.vs[this.av].dhxcont != this.vs[this.av].dhxcont.mainCont[this.av].parentNode && (this.vs[this.av].dhxcont.insertBefore(this.vs[this.av].dhxcont.mainCont[this.av], this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length - 1]), this.vs[this.av].menu && this.vs[this.av].dhxcont.insertBefore(document.getElementById(this.vs[this.av].menuId), this.vs[this.av].dhxcont.childNodes[0]), this.vs[this.av].toolbar && this.vs[this.av].dhxcont.insertBefore(document.getElementById(this.vs[this.av].toolbarId), this.vs[this.av].dhxcont.childNodes[this.vs[this.av].menu ? 1 : 0]), this.vs[this.av].sb && this.vs[this.av].dhxcont.insertBefore(document.getElementById(this.vs[this.av].sbId), this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length - 1])), this._doOnResize && this._doOnResize(), this._isWindow && this.updateNestedObjects(), this.avt = null
        }
    };
    this.obj._viewRestore = function () {
        var b = this.av;
        if (this.avt) {
            this.av = this.avt, this.avt = null
        }
        return b
    };
    this.setContent = function (b) {
        this.obj.vs[this.obj.av].dhxcont = b;
        this.obj._init();
        b = null
    };
    this.obj._init = function () {
        this.vs[this.av].dhxcont.innerHTML = "<div ida='dhxMainCont' style='position: relative; left: 0px; top: 0px; overflow: hidden;'></div><div class='dhxcont_content_blocker' style='display: none;'></div>";
        this.vs[this.av].dhxcont.mainCont = {};
        this.vs[this.av].dhxcont.mainCont[this.av] = this.vs[this.av].dhxcont.childNodes[0]
    };
    this.obj._genStr = function (b) {
        for (var a = "", c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", d = 0; d < b; d++) {
            a += c.charAt(Math.round(Math.random() * (c.length - 1)))
        }
        return a
    };
    this.obj.setMinContentSize = function (b, a) {
        this.vs[this.av]._minDataSizeW = b;
        this.vs[this.av]._minDataSizeH = a
    };
    this.obj._setPadding = function (b, a) {
        typeof b == "object" ? (this._offsetTop = b[0], this._offsetLeft = b[1], this._offsetWidth = b[2], this._offsetHeight = b[3], b = null) : (this._offsetLeft = this._offsetTop = b, this._offsetWidth = -b * 2, this._offsetHeight = -b * 2);
        this.vs[this.av].dhxcont.className = "dhxcont_global_content_area " + (a || "")
    };
    this.obj.moveContentTo = function (b) {
        for (var a in this.vs) {
            b.view(a).setActive();
            var c = null;
            this.vs[a].grid && (c = "grid");
            this.vs[a].tree && (c = "tree");
            this.vs[a].tabbar && (c = "tabbar");
            this.vs[a].folders && (c = "folders");
            this.vs[a].layout && (c = "layout");
            c != null && (b.view(a).attachObject(this.vs[a][c + "Id"], !1, !0, !1), b.vs[a][c] = this.vs[a][c], b.vs[a][c + "Id"] = this.vs[a][c + "Id"], b.vs[a][c + "Obj"] = this.vs[a][c + "Obj"], this.vs[a][c] = null, this.vs[a][c + "Id"] = null, this.vs[a][c + "Obj"] = null);
            if (this.vs[a]._frame) {
                b.vs[a]._frame = this.vs[a]._frame, this.vs[a]._frame = null
            }
            if (this.vs[a].menu != null) {
                if (b.cv == b.av) {
                    b.vs[b.av].dhxcont.insertBefore(document.getElementById(this.vs[a].menuId), b.vs[b.av].dhxcont.childNodes[0])
                } else {
                    var d = b._getSt();
                    d.appendChild(document.getElementById(this.vs[a].menuId));
                    d = null
                }
                b.vs[a].menu = this.vs[a].menu;
                b.vs[a].menuId = this.vs[a].menuId;
                b.vs[a].menuHeight = this.vs[a].menuHeight;
                this.vs[a].menu = null;
                this.vs[a].menuId = null;
                this.vs[a].menuHeight = null;
                this.cv == this.av && this._doOnAttachMenu && this._doOnAttachMenu("unload");
                b.cv == b.av && b._doOnAttachMenu && b._doOnAttachMenu("move")
            }
            if (this.vs[a].toolbar != null) {
                b.cv == b.av ? b.vs[b.av].dhxcont.insertBefore(document.getElementById(this.vs[a].toolbarId), b.vs[b.av].dhxcont.childNodes[b.vs[b.av].menu != null ? 1 : 0]) : (d = b._getSt(), d.appendChild(document.getElementById(this.vs[a].toolbarId)), d = null), b.vs[a].toolbar = this.vs[a].toolbar, b.vs[a].toolbarId = this.vs[a].toolbarId, b.vs[a].toolbarHeight = this.vs[a].toolbarHeight, this.vs[a].toolbar = null, this.vs[a].toolbarId = null, this.vs[a].toolbarHeight = null, this.cv == this.av && this._doOnAttachToolbar && this._doOnAttachToolbar("unload"), b.cv == b.av && b._doOnAttachToolbar && b._doOnAttachToolbar("move")
            }
            if (this.vs[a].sb != null) {
                if (b.cv == b.av) {
                    b.vs[b.av].dhxcont.insertBefore(document.getElementById(this.vs[a].sbId), b.vs[b.av].dhxcont.childNodes[b.vs[b.av].dhxcont.childNodes.length - 1])
                } else {
                    return d = b._getSt(), d.appendChild(document.getElementById(this.vs[a].sbId)), d
                }
                b.vs[a].sb = this.vs[a].sb;
                b.vs[a].sbId = this.vs[a].sbId;
                b.vs[a].sbHeight = this.vs[a].sbHeight;
                this.vs[a].sb = null;
                this.vs[a].sbId = null;
                this.vs[a].sbHeight = null;
                this.cv == this.av && this._doOnAttachStatusBar && this._doOnAttachStatusBar("unload");
                b.cv == b.av && b._doOnAttachStatusBar && b._doOnAttachStatusBar("move")
            }
            for (var e = this.vs[a].dhxcont.mainCont[a], f = b.vs[a].dhxcont.mainCont[a]; e.childNodes.length > 0;) {
                f.appendChild(e.childNodes[0])
            }
        }
        b.view(this.av).setActive();
        b = null
    };
    this.obj.adjustContent = function (b, a, c, d, e) {
        var f = this.vs[this.av].dhxcont, h = f.mainCont[this.av];
        f.style.left = (this._offsetLeft || 0) + "px";
        f.style.top = (this._offsetTop || 0) + a + "px";
        var g = b.clientWidth + (this._offsetWidth || 0);
        if (d !== !0) {
            f.style.width = Math.max(0, g) + "px"
        }
        if (d !== !0 && f.offsetWidth > g) {
            f.style.width = Math.max(0, g * 2 - f.offsetWidth) + "px"
        }
        var k = b.clientHeight + (this._offsetHeight || 0);
        f.style.height = Math.max(0, k - a) + (c != null ? c : 0) + "px";
        if (f.offsetHeight > k - a) {
            f.style.height = Math.max(0, (k - a) * 2 - f.offsetHeight) + "px"
        }
        if (e && !isNaN(e)) {
            f.style.height = Math.max(0, parseInt(f.style.height) - e) + "px"
        }
        if (this.vs[this.av]._minDataSizeH != null && parseInt(f.style.height) < this.vs[this.av]._minDataSizeH) {
            f.style.height = this.vs[this.av]._minDataSizeH + "px"
        }
        if (this.vs[this.av]._minDataSizeW != null && parseInt(f.style.width) < this.vs[this.av]._minDataSizeW) {
            f.style.width = this.vs[this.av]._minDataSizeW + "px"
        }
        if (d !== !0 && (h.style.width = f.clientWidth + "px", h.offsetWidth > f.clientWidth)) {
            h.style.width = Math.max(0, f.clientWidth * 2 - h.offsetWidth) + "px"
        }
        var i = this.vs[this.av].menu != null ? !this.vs[this.av].menuHidden ? this.vs[this.av].menuHeight : 0 : 0, j = this.vs[this.av].toolbar != null ? !this.vs[this.av].toolbarHidden ? this.vs[this.av].toolbarHeight : 0 : 0, l = this.vs[this.av].sb != null ? !this.vs[this.av].sbHidden ? this.vs[this.av].sbHeight : 0 : 0;
        h.style.height = f.clientHeight + "px";
        if (h.offsetHeight > f.clientHeight) {
            h.style.height = Math.max(0, f.clientHeight * 2 - h.offsetHeight) + "px"
        }
        h.style.height = Math.max(0, parseInt(h.style.height) - i - j - l) + "px";
        b = f = h = null
    };
    this.obj.coverBlocker = function () {
        return this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length - 1]
    };
    this.obj.showCoverBlocker = function () {
        var b = this.coverBlocker();
        b.style.display = "";
        b = null
    };
    this.obj.hideCoverBlocker = function () {
        var b = this.coverBlocker();
        b.style.display = "none";
        b = null
    };
    this.obj.updateNestedObjects = function (b) {
        if (this.skin == "dhx_terrace") {
            var a = this.vs[this.av].menu != null || this.vs[this.av].toolbar != null;
            if (this.vs[this.av].grid) {
                var c = a || this._isWindow ? 14 : 0, d = this._isWindow ? 14 : 0, e = this._isWindow ? 14 : 0;
                if (b) {
                    if (!this._isWindow) {
                        this.vs[this.av].grid.entBox.style.border = "0px solid white", this.vs[this.av].grid.skin_h_correction = -2
                    }
                    this.vs[this.av].grid.dontSetSizes = !0;
                    this.vs[this.av].gridObj.style.position = "absolute"
                }
                this.vs[this.av].gridObj.style.top = c + "px";
                this.vs[this.av].gridObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - c - d + "px";
                this.vs[this.av].gridObj.style.left = e + "px";
                this.vs[this.av].gridObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px";
                this.vs[this.av].grid.setSizes()
            }
            if (this.vs[this.av].tree) {
                c = a || this._isWindow ? 14 : 0;
                d = this._isWindow ? 14 : 0;
                e = this._isWindow ? 14 : 0;
                if (b) {
                    this.vs[this.av].treeObj.style.position = "absolute"
                }
                this.vs[this.av].treeObj.style.top = c + "px";
                this.vs[this.av].treeObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - c - d + "px";
                this.vs[this.av].treeObj.style.left = e + "px";
                this.vs[this.av].treeObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px"
            }
            if (this.vs[this.av].form) {
                c = a || this._isWindow ? 14 : 0;
                d = this._isWindow ? 14 : 0;
                e = this._isWindow ? 14 : 0;
                if (b) {
                    this.vs[this.av].formObj.style.position = "absolute"
                }
                this.vs[this.av].formObj.style.top = c + "px";
                this.vs[this.av].formObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - c - d + "px";
                this.vs[this.av].formObj.style.left = e + "px";
                this.vs[this.av].formObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px";
                this.vs[this.av].form.setSizes()
            }
            if (this.vs[this.av].layout) {
                b && !this._isWindow && !this._isCell && this.vs[this.av].layout._hideBorders(), c = this._isCell && this._noHeader && !a ? 0 : 14, d = this._isCell && this._noHeader ? 0 : 14, e = this._isCell && this._noHeader ? 0 : 14, this.vs[this.av].layoutObj.style.top = c + "px", this.vs[this.av].layoutObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - c - d + "px", this.vs[this.av].layoutObj.style.left = e + "px", this.vs[this.av].layoutObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px", this.vs[this.av].layout.setSizes()
            }
            if (this.vs[this.av].accordion) {
                if (b) {
                    this.vs[this.av].accordion._hideBorders = !0
                }
                c = this._isCell && this._noHeader && !a ? 0 : 14;
                d = this._isCell && this._noHeader ? 0 : 14;
                e = this._isCell && this._noHeader ? 0 : 14;
                this.vs[this.av].accordionObj.style.top = c + "px";
                this.vs[this.av].accordionObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - c - d + "px";
                this.vs[this.av].accordionObj.style.left = e + "px";
                this.vs[this.av].accordionObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px";
                this.vs[this.av].accordion.setSizes()
            }
            if (this.vs[this.av].tabbar != null) {
                c = !a && this._isCell && this._noHeader ? 0 : 14, d = this._isCell && this._noHeader ? c : 28, e = this._isCell && this._noHeader ? 0 : 14, this.vs[this.av].tabbarObj.style.top = c + "px", this.vs[this.av].tabbarObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - d + "px", this.vs[this.av].tabbarObj.style.left = e + "px", this.vs[this.av].tabbarObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px", this.vs[this.av].tabbar.adjustOuterSize()
            }
            if (this.vs[this.av].editor) {
                e = c = 14, this.vs[this.av].editorObj.style.top = c + "px", this.vs[this.av].editorObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - c * 2 + "px", this.vs[this.av].editorObj.style.left = e + "px", this.vs[this.av].editorObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px", _isIE || this.vs[this.av].editor._prepareContent(!0), this.vs[this.av].editor.setSizes()
            }
            this.vs[this.av].sched && this.vs[this.av].sched.setSizes();
            this.vs[this.av].dockedCell && this.vs[this.av].dockedCell.updateNestedObjects()
        } else {
            this.vs[this.av].grid && this.vs[this.av].grid.setSizes();
            this.vs[this.av].sched && this.vs[this.av].sched.setSizes();
            this.vs[this.av].tabbar && this.vs[this.av].tabbar.adjustOuterSize();
            this.vs[this.av].folders && this.vs[this.av].folders.setSizes();
            this.vs[this.av].editor && (_isIE || this.vs[this.av].editor._prepareContent(!0), this.vs[this.av].editor.setSizes());
            if (this.vs[this.av].layout) {
                (this._isAcc || this._isTabbarCell) && this.skin == "dhx_skyblue" ? (this.vs[this.av].layoutObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + 2 + "px", this.vs[this.av].layoutObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + 2 + "px") : (this.vs[this.av].layoutObj.style.width = this.vs[this.av].dhxcont.mainCont[this.av].style.width, this.vs[this.av].layoutObj.style.height = this.vs[this.av].dhxcont.mainCont[this.av].style.height), this.vs[this.av].layout.setSizes()
            }
            if (this.vs[this.av].accordion != null) {
                this.skin == "dhx_web" ? (this.vs[this.av].accordionObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + "px", this.vs[this.av].accordionObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + "px") : (this.vs[this.av].accordionObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + 2 + "px", this.vs[this.av].accordionObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + 2 + "px"), this.vs[this.av].accordion.setSizes()
            }
            this.vs[this.av].dockedCell && this.vs[this.av].dockedCell.updateNestedObjects();
            this.vs[this.av].form && this.vs[this.av].form.setSizes();
            this.vs[this.av].carousel && this.vs[this.av].carousel.setSizes()
        }
    };
    this.obj.attachStatusBar = function () {
        if (!this.vs[this.av].sb) {
            var b = document.createElement("DIV");
            b.className = this._isCell ? "dhxcont_sb_container_layoutcell" : "dhxcont_sb_container";
            b.id = "sbobj_" + this._genStr(12);
            b.innerHTML = "<div class='dhxcont_statusbar'></div>";
            this.cv == this.av ? this.vs[this.av].dhxcont.insertBefore(b, this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length - 1]) : g.st.appendChild(b);
            b.setText = function (a) {
                this.childNodes[0].innerHTML = a
            };
            b.getText = function () {
                return this.childNodes[0].innerHTML
            };
            b.onselectstart = function (a) {
                a = a || event;
                return a.returnValue = !1
            };
            this.vs[this.av].sb = b;
            this.vs[this.av].sbHeight = this.skin == "dhx_web" ? 41 : this.skin == "dhx_skyblue" ? 23 : b.offsetHeight;
            this.vs[this.av].sbId = b.id;
            this._doOnAttachStatusBar && this._doOnAttachStatusBar("init");
            this.adjust();
            return this.vs[this._viewRestore()].sb
        }
    };
    this.obj.detachStatusBar = function (b) {
        if (this.vs[this.av].sb) {
            this.vs[this.av].sb.setText = null, this.vs[this.av].sb.getText = null, this.vs[this.av].sb.onselectstart = null, this.vs[this.av].sb.parentNode.removeChild(this.vs[this.av].sb), this.vs[this.av].sb = null, this.vs[this.av].sbHeight = null, this.vs[this.av].sbId = null, this._viewRestore(), this._doOnAttachStatusBar && !b && this._doOnAttachStatusBar("unload")
        }
    };
    this.obj.getFrame = function () {
        return this.getView()._frame
    };
    this.obj.getView = function (b) {
        return this.vs[b || this.av]
    };
    this.obj.attachMenu = function (b) {
        if (!this.vs[this.av].menu) {
            var a = document.createElement("DIV");
            a.style.position = "relative";
            a.style.overflow = "hidden";
            a.id = "dhxmenu_" + this._genStr(12);
            this.cv == this.av ? this.vs[this.av].dhxcont.insertBefore(a, this.vs[this.av].dhxcont.childNodes[0]) : g.st.appendChild(a);
            typeof b != "object" ? this.vs[this.av].menu = new dhtmlXMenuObject(a.id, b || this.skin) : (b.parent = a.id, this.vs[this.av].menu = new dhtmlXMenuObject(b));
            this.vs[this.av].menuHeight = this.skin == "dhx_web" ? 29 : a.offsetHeight;
            this.vs[this.av].menuId = a.id;
            this._doOnAttachMenu && this._doOnAttachMenu("init");
            this.adjust();
            return this.vs[this._viewRestore()].menu
        }
    };
    this.obj.detachMenu = function (b) {
        if (this.vs[this.av].menu) {
            var a = document.getElementById(this.vs[this.av].menuId);
            this.vs[this.av].menu.unload();
            this.vs[this.av].menu = null;
            this.vs[this.av].menuId = null;
            this.vs[this.av].menuHeight = null;
            a && a.parentNode.removeChild(a);
            a = null;
            this._viewRestore();
            this._doOnAttachMenu && !b && this._doOnAttachMenu("unload")
        }
    };
    this.obj.attachToolbar = function (b) {
        if (!this.vs[this.av].toolbar) {
            var a = document.createElement("DIV");
            a.style.position = "relative";
            a.style.overflow = "hidden";
            a.id = "dhxtoolbar_" + this._genStr(12);
            this.cv == this.av ? this.vs[this.av].dhxcont.insertBefore(a, this.vs[this.av].dhxcont.childNodes[this.vs[this.av].menu != null ? 1 : 0]) : g.st.appendChild(a);
            typeof b != "object" ? this.vs[this.av].toolbar = new dhtmlXToolbarObject(a.id, b || this.skin) : (b.parent = a.id, this.vs[this.av].toolbar = new dhtmlXToolbarObject(b));
            this.vs[this.av].toolbarHeight = a.offsetHeight;
            this.vs[this.av].toolbarId = a.id;
            this._doOnAttachToolbar && this._doOnAttachToolbar("init");
            this.adjust();
            var c = this;
            this.vs[this.av].toolbar.attachEvent("_onIconSizeChange", function () {
                c.vs[c.av].toolbarHeight = this.cont.offsetHeight;
                c.vs[c.av].toolbarId = this.cont.id;
                c.adjust();
                c._doOnAttachToolbar && c._doOnAttachToolbar("iconSizeChange")
            });
            this.skin != "dhx_terrace" && this.vs[this.av].toolbar.callEvent("_onIconSizeChange", []);
            return this.vs[this._viewRestore()].toolbar
        }
    };
    this.obj.detachToolbar = function (b) {
        if (this.vs[this.av].toolbar) {
            var a = document.getElementById(this.vs[this.av].toolbarId);
            this.vs[this.av].toolbar.unload();
            this.vs[this.av].toolbar = null;
            this.vs[this.av].toolbarId = null;
            this.vs[this.av].toolbarHeight = null;
            a && a.parentNode.removeChild(a);
            a = null;
            this._viewRestore();
            this._doOnAttachToolbar && !b && this._doOnAttachToolbar("unload")
        }
    };
    this.obj.attachGrid = function () {
        if (this._isWindow && this.skin == "dhx_skyblue") {
            this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid", this._redraw()
        }
        var b = document.createElement("DIV");
        b.id = "dhxGridObj_" + this._genStr(12);
        b.style.width = "100%";
        b.style.height = "100%";
        b.cmp = "grid";
        document.body.appendChild(b);
        this.attachObject(b.id, !1, !0, !1);
        this.vs[this.av].grid = new dhtmlXGridObject(b.id);
        this.vs[this.av].grid.setSkin(this.skin);
        if (this.skin == "dhx_skyblue" || this.skin == "dhx_black" || this.skin == "dhx_blue") {
            this.vs[this.av].grid.entBox.style.border = "0px solid white", this.vs[this.av].grid._sizeFix = 2
        }
        this.vs[this.av].gridId = b.id;
        this.vs[this.av].gridObj = b;
        this.skin == "dhx_terrace" && (this.adjust(), this.updateNestedObjects(!0));
        return this.vs[this._viewRestore()].grid
    };
    this.obj.attachScheduler = function (b, a, c, d) {
        var d = d || window.scheduler, e = 0;
        c && (h = document.getElementById(c)) && (e = 1);
        if (!e) {
            var f = c || '<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>', h = document.createElement("DIV");
            h.id = "dhxSchedObj_" + this._genStr(12);
            h.innerHTML = '<div id="' + h.id + '" class="dhx_cal_container" style="width:100%; height:100%;"><div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>' + f + '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div></div>';
            document.body.appendChild(h.firstChild)
        }
        this.attachObject(h.id, !1, !0, !1);
        this.vs[this.av].sched = d;
        this.vs[this.av].schedId = h.id;
        d.setSizes = d.update_view;
        d.destructor = function () {
        };
        d.init(h.id, b, a);
        return this.vs[this._viewRestore()].sched
    };
    this.obj.attachTree = function (b) {
        if (this._isWindow && this.skin == "dhx_skyblue") {
            this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid", this._redraw()
        }
        var a = document.createElement("DIV");
        a.id = "dhxTreeObj_" + this._genStr(12);
        a.style.width = "100%";
        a.style.height = "100%";
        a.cmp = "tree";
        document.body.appendChild(a);
        this.attachObject(a.id, !1, !0, !1);
        this.vs[this.av].tree = new dhtmlXTreeObject(a.id, "100%", "100%", b || 0);
        this.vs[this.av].tree.setSkin(this.skin);
        this.vs[this.av].tree.allTree.childNodes[0].style.marginTop = "2px";
        this.vs[this.av].tree.allTree.childNodes[0].style.marginBottom = "2px";
        this.vs[this.av].treeId = a.id;
        this.vs[this.av].treeObj = a;
        this.skin == "dhx_terrace" && (this.adjust(), this.updateNestedObjects(!0));
        return this.vs[this._viewRestore()].tree
    };
    this.obj.attachTabbar = function (b) {
        if (this._isWindow && this.skin == "dhx_skyblue") {
            this.vs[this.av].dhxcont.style.border = "none", this.setDimension(this.w, this.h)
        }
        var a = document.createElement("DIV");
        a.id = "dhxTabbarObj_" + this._genStr(12);
        a.style.width = "100%";
        a.style.height = "100%";
        a.style.overflow = "hidden";
        a.cmp = "tabbar";
        if (!this._isWindow) {
            a._hideBorders = !0
        }
        document.body.appendChild(a);
        this.attachObject(a.id, !1, !0, !1);
        if (this._isCell) {
            this.hideHeader(), this._padding = a._hideBorders = !1
        }
        this.vs[this.av].tabbar = new dhtmlXTabBar(a.id, b || "top", this.skin == "dhx_terrace" ? null : 20);
        if (!this._isWindow && this.skin != "dhx_terrace") {
            this.vs[this.av].tabbar._s.expand = !0
        }
        this.vs[this.av].tabbar.setSkin(this.skin);
        this.vs[this.av].tabbar.adjustOuterSize();
        this.vs[this.av].tabbarId = a.id;
        this.vs[this.av].tabbarObj = a;
        this.skin == "dhx_terrace" && (this.adjust(), this.updateNestedObjects(!0));
        return this.vs[this._viewRestore()].tabbar
    };
    this.obj.attachFolders = function () {
        if (this._isWindow && this.skin == "dhx_skyblue") {
            this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid", this._redraw()
        }
        var b = document.createElement("DIV");
        b.id = "dhxFoldersObj_" + this._genStr(12);
        b.style.width = "100%";
        b.style.height = "100%";
        b.style.overflow = "hidden";
        b.cmp = "folders";
        document.body.appendChild(b);
        this.attachObject(b.id, !1, !0, !1);
        this.vs[this.av].folders = new dhtmlxFolders(b.id);
        this.vs[this.av].folders.setSizes();
        this.vs[this.av].foldersId = b.id;
        this.vs[this.av].foldersObj = b;
        return this.vs[this._viewRestore()].folders
    };
    this.obj.attachAccordion = function () {
        if (this._isWindow && this.skin == "dhx_skyblue") {
            this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid", this._redraw()
        }
        var b = document.createElement("DIV");
        b.id = "dhxAccordionObj_" + this._genStr(12);
        this._padding = !0;
        if (this.skin == "dhx_web") {
            b.style.left = "0px", b.style.top = "0px", b.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + "px", b.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + "px"
        } else {
            if (this.skin != "dhx_terrace") {
                b.style.left = "-1px", b.style.top = "-1px", b.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + 2 + "px", b.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + 2 + "px"
            }
        }
        b.style.position = "relative";
        b.cmp = "accordion";
        document.body.appendChild(b);
        this.attachObject(b.id, !1, !0, !1);
        this.vs[this.av].accordion = new dhtmlXAccordion(b.id, this.skin);
        this.vs[this.av].accordion.setSizes();
        this.vs[this.av].accordionId = b.id;
        this.vs[this.av].accordionObj = b;
        this.skin == "dhx_terrace" && (this.adjust(), this.updateNestedObjects(!0));
        return this.vs[this._viewRestore()].accordion
    };
    this.obj.attachLayout = function (b, a) {
        if (this._isCell && this.skin == "dhx_skyblue") {
            this.hideHeader(), this.vs[this.av].dhxcont.style.border = "0px solid white", this.adjustContent(this.childNodes[0], 0)
        }
        this._isCell && this.skin == "dhx_web" && this.hideHeader();
        this._padding = !0;
        var c = document.createElement("DIV");
        c.id = "dhxLayoutObj_" + this._genStr(12);
        c.style.overflow = "hidden";
        c.style.position = "absolute";
        c.style.left = "0px";
        c.style.top = "0px";
        c.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + "px";
        c.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + "px";
        if ((this._isTabbarCell || this._isAcc) && this.skin == "dhx_skyblue") {
            c.style.left = "-1px", c.style.top = "-1px", c.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + 2 + "px", c.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + 2 + "px"
        }
        c.dhxContExists = !0;
        c.cmp = "layout";
        document.body.appendChild(c);
        this.attachObject(c.id, !1, !0, !1);
        this.vs[this.av].layout = new dhtmlXLayoutObject(c, b, a || this.skin);
        this._isWindow && this.attachEvent("_onBeforeTryResize", this.vs[this.av].layout._defineWindowMinDimension);
        this.vs[this.av].layoutId = c.id;
        this.vs[this.av].layoutObj = c;
        if (this.skin == "dhx_terrace") {
            if (this._isCell) {
                this.style.backgroundColor = "transparent", this.vs[this.av].dhxcont.style.backgroundColor = "transparent", this.hideHeader()
            }
            this.adjust();
            this.updateNestedObjects(!0)
        }
        return this.vs[this._viewRestore()].layout
    };
    this.obj.attachEditor = function (b) {
        if (this._isWindow && this.skin == "dhx_skyblue") {
            this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid", this._redraw()
        }
        var a = document.createElement("DIV");
        a.id = "dhxEditorObj_" + this._genStr(12);
        a.style.position = "relative";
        a.style.display = "none";
        a.style.overflow = "hidden";
        a.style.width = "100%";
        a.style.height = "100%";
        a.cmp = "editor";
        document.body.appendChild(a);
        if (this.skin == "dhx_terrace") {
            a._attached = !0
        }
        this.attachObject(a.id, !1, !0, !1);
        this.vs[this.av].editor = new dhtmlXEditor(a.id, b || this.skin);
        this.vs[this.av].editorId = a.id;
        this.vs[this.av].editorObj = a;
        this.skin == "dhx_terrace" && (this.adjust(), this.updateNestedObjects(!0));
        return this.vs[this._viewRestore()].editor
    };
    this.obj.attachMap = function (b) {
        var a = document.createElement("DIV");
        a.id = "GMapsObj_" + this._genStr(12);
        a.style.position = "relative";
        a.style.display = "none";
        a.style.overflow = "hidden";
        a.style.width = "100%";
        a.style.height = "100%";
        a.cmp = "gmaps";
        document.body.appendChild(a);
        this.attachObject(a.id, !1, !0, !0);
        b || (b = {
            center: new google.maps.LatLng(40.719837, -73.992348),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this.vs[this.av].gmaps = new google.maps.Map(a, b);
        return this.vs[this.av].gmaps
    };
    this.obj.attachObject = function (b, a, c, d) {
        typeof b == "string" && (b = document.getElementById(b));
        if (a) {
            b.style.visibility = "hidden";
            b.style.display = "";
            var e = b.offsetWidth, f = b.offsetHeight
        }
        this._attachContent("obj", b);
        if (a && this._isWindow) {
            b.style.visibility = "", this._adjustToContent(e, f)
        }
        if (this.skin == "dhx_terrace" && (this.vs[this.av].menu != null || this.vs[this.av].toolbar != null)) {
            this.adjust(typeof d == "undefined" || d == !0), this.updateNestedObjects(!0)
        }
        c || this._viewRestore()
    };
    this.obj.detachObject = function (b, a) {
        for (var c = null, d = null, e = "tree,grid,layout,tabbar,accordion,folders,form".split(","), f = 0; f < e.length; f++) {
            if (this.vs[this.av][e[f]]) {
                c = this.vs[this.av][e[f]];
                d = this.vs[this.av][e[f] + "Obj"];
                if (b) {
                    c.unload && c.unload();
                    for (c.destructor && c.destructor(); d.childNodes.length > 0;) {
                        d.removeChild(d.childNodes[0])
                    }
                    d.parentNode.removeChild(d);
                    c = d = null
                } else {
                    document.body.appendChild(d), d.style.display = "none"
                }
                this.vs[this.av][e[f]] = null;
                this.vs[this.av][e[f] + "Id"] = null;
                this.vs[this.av][e[f] + "Obj"] = null
            }
        }
        if (c != null && d != null) {
            return [c, d]
        }
        if (b && this.vs[this.av]._frame) {
            this._detachURLEvents(), this.vs[this.av]._frame = null
        }
        for (var h = this.vs[this.av].dhxcont.mainCont[this.av]; h.childNodes.length > 0;) {
            if (b == !0) {
                h.removeChild(h.childNodes[0])
            } else {
                var g = h.childNodes[0];
                a != null ? (typeof a != "object" && (a = document.getElementById(a)), a.appendChild(g)) : document.body.appendChild(g);
                g.style.display = "none"
            }
        }
        h = a = null
    };
    this.obj.appendObject = function (b) {
        typeof b == "string" && (b = document.getElementById(b));
        this._attachContent("obj", b, !0)
    };
    this.obj.attachHTMLString = function (b) {
        this._attachContent("str", b);
        for (var a = b.match(/<script[^>]*>[^\f]*?<\/script>/g) || [], c = 0; c < a.length; c++) {
            var d = a[c].replace(/<([\/]{0,1})script[^>]*>/g, "");
            d && (window.execScript ? window.execScript(d) : window.eval(d))
        }
    };
    this.obj.attachURL = function (b, a) {
        this._attachContent(a == !0 ? "urlajax" : "url", b, !1);
        if (this.skin == "dhx_terrace" && (this.vs[this.av].menu != null || this.vs[this.av].toolbar != null)) {
            this.adjust(!0), this.updateNestedObjects(!0)
        }
        this._viewRestore()
    };
    this.obj.adjust = function (b) {
        if (this.skin == "dhx_skyblue") {
            if (this.vs[this.av].menu) {
                if (this._isWindow || this._isLayout) {
                    this.vs[this.av].menu._topLevelOffsetLeft = 0, document.getElementById(this.vs[this.av].menuId).style.height = "26px", this.vs[this.av].menuHeight = document.getElementById(this.vs[this.av].menuId).offsetHeight, this._doOnAttachMenu && this._doOnAttachMenu("show")
                }
                if (this._isCell) {
                    document.getElementById(this.vs[this.av].menuId).className += " in_layoutcell", this.vs[this.av].menuHeight = 25
                }
                if (this._isAcc) {
                    document.getElementById(this.vs[this.av].menuId).className += " in_acccell", this.vs[this.av].menuHeight = 25
                }
                this._doOnAttachMenu && this._doOnAttachMenu("adjust")
            }
            this.vs[this.av].toolbar && (this._isWindow && (document.getElementById(this.vs[this.av].toolbarId).className += " in_window"), this._isLayout && (document.getElementById(this.vs[this.av].toolbarId).className += " in_layout"), this._isCell && (document.getElementById(this.vs[this.av].toolbarId).className += " in_layoutcell"), this._isAcc && (document.getElementById(this.vs[this.av].toolbarId).className += " in_acccell"), this._isTabbarCell && (document.getElementById(this.vs[this.av].toolbarId).className += " in_tabbarcell"))
        }
        this.skin == "dhx_web" && this.vs[this.av].toolbar && (this._isWindow && (document.getElementById(this.vs[this.av].toolbarId).className += " in_window"), this._isLayout && (document.getElementById(this.vs[this.av].toolbarId).className += " in_layout"), this._isCell && (document.getElementById(this.vs[this.av].toolbarId).className += " in_layoutcell"), this._isAcc && (document.getElementById(this.vs[this.av].toolbarId).className += " in_acccell"), this._isTabbarCell && (document.getElementById(this.vs[this.av].toolbarId).className += " in_tabbarcell"));
        if (this.skin == "dhx_terrace") {
            var a = 0;
            if (this._isWindow || this._isCell || this._isAcc || this._isTabbarCell) {
                a = 14
            }
            this._isCell && this._noHeader && (a = 0);
            var c = 0;
            if (this._isWindow || this._isCell || this._isAcc || this._isTabbarCell) {
                c = 14
            }
            this._isCell && this._noHeader && (c = 0);
            var d = b == !0 && !this.vs[this.av].toolbar || this._isLayout ? 14 : 0, e = b == !0 || this._isLayout ? 14 : 0, f = !1;
            if (this.vs[this.av].menu) {
                document.getElementById(this.vs[this.av].menuId).style.marginLeft = a + "px", document.getElementById(this.vs[this.av].menuId).style.marginRight = a + "px", document.getElementById(this.vs[this.av].menuId).style.marginTop = c + "px", document.getElementById(this.vs[this.av].menuId).style.marginBottom = d + "px", this.vs[this.av].menuHeight = 32 + c + d, this._doOnAttachMenu && this._doOnAttachMenu("show"), f = !0
            }
            if (this.vs[this.av].toolbar) {
                c == 0 && this.vs[this.av].menu != null & this._isCell && (c = 14), document.getElementById(this.vs[this.av].toolbarId).style.marginLeft = a + "px", document.getElementById(this.vs[this.av].toolbarId).style.marginRight = a + "px", document.getElementById(this.vs[this.av].toolbarId).style.marginTop = c + "px", document.getElementById(this.vs[this.av].toolbarId).style.marginBottom = e + "px", this.vs[this.av].toolbarHeight = this.vs[this.av].toolbar.cont.offsetHeight + c + e, this._doOnAttachToolbar && this._doOnAttachToolbar("show"), f = !0
            }
        }
    };
    this.obj._attachContent = function (b, a, c) {
        if (c !== !0) {
            if (this.vs[this.av]._frame) {
                this._detachURLEvents(), this.vs[this.av]._frame = null
            }
            for (; this.vs[this.av].dhxcont.mainCont[this.av].childNodes.length > 0;) {
                this.vs[this.av].dhxcont.mainCont[this.av].removeChild(this.vs[this.av].dhxcont.mainCont[this.av].childNodes[0])
            }
        }
        if (b == "url") {
            if (this._isWindow && a.cmp == null && this.skin == "dhx_skyblue") {
                this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid", this._redraw()
            }
            var d = document.createElement("IFRAME");
            d.frameBorder = 0;
            d.border = 0;
            d.style.width = "100%";
            d.style.height = "100%";
            d.setAttribute("src", "javascript:false;");
            this.vs[this.av].dhxcont.mainCont[this.av].appendChild(d);
            d.src = a;
            this.vs[this.av]._frame = d;
            this._attachURLEvents()
        } else {
            if (b == "urlajax") {
                if (this._isWindow && a.cmp == null && this.skin == "dhx_skyblue") {
                    this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid", this.vs[this.av].dhxcont.mainCont[this.av].style.backgroundColor = "#FFFFFF", this._redraw()
                }
                var e = this, f = String(this.av).valueOf(), h = function () {
                    var a = e.av;
                    e.av = f;
                    e.attachHTMLString(this.xmlDoc.responseText, this);
                    e.av = a;
                    e._doOnFrameContentLoaded && e._doOnFrameContentLoaded();
                    this.destructor()
                }, g = new dtmlXMLLoaderObject(h, window);
                g.dhxWindowObject = this;
                g.loadXML(a)
            } else {
                if (b == "obj") {
                    if (this._isWindow && a.cmp == null && this.skin == "dhx_skyblue") {
                        this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid", this.vs[this.av].dhxcont.mainCont[this.av].style.backgroundColor = "#FFFFFF", this._redraw()
                    }
                    this.vs[this.av].dhxcont._frame = null;
                    this.vs[this.av].dhxcont.mainCont[this.av].appendChild(a);
                    this.vs[this.av].dhxcont.mainCont[this.av].style.overflow = c === !0 ? "auto" : "hidden";
                    a.style.display = ""
                } else {
                    if (b == "str") {
                        if (this._isWindow && a.cmp == null && this.skin == "dhx_skyblue") {
                            this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid", this.vs[this.av].dhxcont.mainCont[this.av].style.backgroundColor = "#FFFFFF", this._redraw()
                        }
                        this.vs[this.av].dhxcont._frame = null;
                        this.vs[this.av].dhxcont.mainCont[this.av].innerHTML = a
                    }
                }
            }
        }
    };
    this.obj._attachURLEvents = function () {
        var b = this, a = this.vs[this.av]._frame;
        _isIE ? a.onreadystatechange = function () {
            if (a.readyState == "complete") {
                try {
                    a.contentWindow.document.body.onmousedown = function () {
                        b._doOnFrameMouseDown && b._doOnFrameMouseDown()
                    }
                } catch (c) {
                }
                try {
                    b._doOnFrameContentLoaded && b._doOnFrameContentLoaded()
                } catch (d) {
                }
            }
        } : a.onload = function () {
            try {
                a.contentWindow.onmousedown = function () {
                    b._doOnFrameMouseDown && b._doOnFrameMouseDown()
                }
            } catch (c) {
            }
            try {
                b._doOnFrameContentLoaded && b._doOnFrameContentLoaded()
            } catch (d) {
            }
        }
    };
    this.obj._detachURLEvents = function () {
        if (_isIE) {
            try {
                this.vs[this.av]._frame.onreadystatechange = null, this.vs[this.av]._frame.contentWindow.document.body.onmousedown = null, this.vs[this.av]._frame.onload = null
            } catch (b) {
            }
        } else {
            try {
                this.vs[this.av]._frame.contentWindow.onmousedown = null, this.vs[this.av]._frame.onload = null
            } catch (a) {
            }
        }
    };
    this.obj.showMenu = function () {
        if (this.vs[this.av].menu && this.vs[this.av].menuId && document.getElementById(this.vs[this.av].menuId).style.display == "none") {
            this.vs[this.av].menuHidden = !1, this._doOnAttachMenu && this._doOnAttachMenu("show"), document.getElementById(this.vs[this.av].menuId).style.display = "", this._viewRestore()
        }
    };
    this.obj.hideMenu = function () {
        if (this.vs[this.av].menu && this.vs[this.av].menuId && document.getElementById(this.vs[this.av].menuId).style.display != "none") {
            document.getElementById(this.vs[this.av].menuId).style.display = "none", this.vs[this.av].menuHidden = !0, this._doOnAttachMenu && this._doOnAttachMenu("hide"), this._viewRestore()
        }
    };
    this.obj.showToolbar = function () {
        if (this.vs[this.av].toolbar && this.vs[this.av].toolbarId && document.getElementById(this.vs[this.av].toolbarId).style.display == "none") {
            this.vs[this.av].toolbarHidden = !1, this._doOnAttachToolbar && this._doOnAttachToolbar("show"), document.getElementById(this.vs[this.av].toolbarId).style.display = "", this._viewRestore()
        }
    };
    this.obj.hideToolbar = function () {
        if (this.vs[this.av].toolbar && this.vs[this.av].toolbarId && document.getElementById(this.vs[this.av].toolbarId).style.display != "none") {
            this.vs[this.av].toolbarHidden = !0, document.getElementById(this.vs[this.av].toolbarId).style.display = "none", this._doOnAttachToolbar && this._doOnAttachToolbar("hide"), this._viewRestore()
        }
    };
    this.obj.showStatusBar = function () {
        if (this.vs[this.av].sb && this.vs[this.av].sbId && document.getElementById(this.vs[this.av].sbId).style.display == "none") {
            this.vs[this.av].sbHidden = !1, this._doOnAttachStatusBar && this._doOnAttachStatusBar("show"), document.getElementById(this.vs[this.av].sbId).style.display = "", this._viewRestore()
        }
    };
    this.obj.hideStatusBar = function () {
        if (this.vs[this.av].sb && this.vs[this.av].sbId && document.getElementById(this.vs[this.av].sbId).style.display != "none") {
            this.vs[this.av].sbHidden = !0, document.getElementById(this.vs[this.av].sbId).style.display = "none", this._doOnAttachStatusBar && this._doOnAttachStatusBar("hide"), this._viewRestore()
        }
    };
    this.obj._dhxContDestruct = function () {
        var b = this.av, a;
        for (a in this.vs) {
            this.av = a, this.detachMenu(!0), this.detachToolbar(!0), this.detachStatusBar(!0), this.detachObject(!0), this.vs[a].dhxcont.mainCont[a] = null
        }
        for (a in this.vs) {
            this.vs[a].dhxcont.mainCont = null, this.vs[a].dhxcont.innerHTML = "", this.vs[a].dhxcont = null, this.vs[a] = null
        }
        this.setActive = this.getView = this.getFrame = this._getSt = this._dhxContDestruct = this._genStr = this._init = this._setPadding = this._viewRestore = this._detachURLEvents = this._attachURLEvents = this._attachContent = this.updateNestedObjects = this.hideCoverBlocker = this.showCoverBlocker = this.coverBlocker = this.adjustContent = this.moveContentTo = this.setMinContentSize = this.adjust = this.show = this.view = this.attachMap = this.attachURL = this.attachHTMLString = this.appendObject = this.detachObject = this.attachObject = this.attachEditor = this.attachLayout = this.attachAccordion = this.attachFolders = this.attachTabbar = this.attachTree = this.attachScheduler = this.attachGrid = this.hideStatusBar = this.hideToolbar = this.hideMenu = this.showStatusBar = this.showToolbar = this.showMenu = this.detachStatusBar = this.detachToolbar = this.detachMenu = this.attachStatusBar = this.attachToolbar = this.attachMenu = this.vs = null;
        g.st.innerHTML = "";
        g.st.parentNode.removeChild(g.st);
        g.st = null;
        g.setContent = null;
        g.dhxcont = null;
        g = g.obj = null;
        if (dhtmlx.detaches) {
            for (a in dhtmlx.detaches) {
                dhtmlx.detaches[a](this)
            }
        }
    };
    if (dhtmlx.attaches) {
        for (var j in dhtmlx.attaches) {
            this.obj[j] = dhtmlx.attaches[j]
        }
    }
    return this
};
var ins_total_fee = new Number(0);
var ins_fee_category = new Array("0.0", "1.0", "3.0");
var ins_compensation_category = new Array("", "", "");
minors_sel_default = "请选择被保险人";
var sel_psgs = new Array();
var insMinors_selOP = "";
var insChildren_selOP = "";
(function () {
    $(document).ready(function () {
        if (canInsurance && (tour_flag == "dc" || tour_flag == "fc")) {
            $.init_insuranceData();
            $.initInsuranceTickets(insInfos);
            if (boughtIns) {
                $.handleBoughtInsTickets(boughtIns)
            }
            $.initInsuranceClick();
            if (boughtIns) {
                $("#insurance_buy_and_agree").click()
            }
            $.calTotalFee()
        }
    });
    jQuery.extend({
        sel_psg: function (a, b) {
            this.key = a;
            this.value = b
        }, handleBoughtInsTickets: function (k) {
            var j = "", c = "", g = "", d = "", l = "";
            var f, b, h = 0;
            var a = "N";
            for (var e = 0; e < k.length; e++) {
                j = k[e].batch_no + "_" + k[e].coach_no + "_" + k[e].seat_no;
                f = $("#insurance_table").find("tr[trainInfo=" + j + "]");
                if (f) {
                    c = $(f).attr("attri");
                    b = $(f).attr("id");
                    g = c.split("_")[3];
                    l = c.split("_")[0];
                    $("#" + b).find("input:checkbox").click();
                    if (g == "Y") {
                        d = k[e].passenger_id_no + "_" + k[e].passenger_id_type + "_" + k[e].passenger_name;
                        $option = $("#" + b).find("select option");
                        $option.each(function (i) {
                            if (d == $(this).val()) {
                                a = "Y";
                                h = i;
                                return
                            }
                        });
                        if (a == "N") {
                            h = 0
                        }
                        $("#" + b).find("select").get(0).selectedIndex = h
                    } else {
                        if (l != "1") {
                            if (k[e].insure_type == "0") {
                                $("#" + b).find("input:radio[value=teenager]").click()
                            } else {
                                if (k[e].insure_type == "1") {
                                    $("#" + b).find("input:radio[value=adult]").click()
                                }
                            }
                        }
                    }
                }
            }
        }, init_insuranceData: function () {
            var a = -1;
            if (insMinors && (a = insMinors.length) > -1) {
                for (var b = 0; b < a; b++) {
                    insMinors_selOP += "<option value=" + insMinors[b].passenger_id_no + "_" + insMinors[b].passenger_id_type_code + "_" + insMinors[b].passenger_name + ">" + insMinors[b].passenger_name + " (" + insMinors[b].passenger_id_no + ")</option>"
                }
            } else {
                minors_sel_default = "没有符合条件的被保险人";
                insMinors_selOP = ""
            }
        }, initInsuranceTickets: function (d) {
            if (d && (size = d.length) > 0) {
                var c = [];
                for (var b = 0; b < size; b++) {
                    insurance = d[b];
                    c[b] = $.initInsurancePage(insurance, b)
                }
                $tr = $("#insurance_table").find("tr:eq(0)");
                var a = c.join("");
                $tr.after(a)
            }
        }, initInsurancePage: function (c, n) {
            var t, v;
            var b;
            var j, a;
            var m, d, e, p;
            var u = "", s = "", r = "", q = "";
            var i = "", l;
            var h = c;
            hasFcFlag = h.hasFcFlag;
            m = h.ageStatus;
            d = h.ticket_type;
            e = h.useParentId;
            p = h.id_type;
            t = h.wcTicket;
            b = t.passengerDTO;
            j = t.stationTrainDTO;
            var f = n + 1;
            l = "ins_tr_" + f;
            attri = p + "_" + d + "_" + m + "_" + e;
            var o = t.batch_no + "_" + t.coach_no + "_" + t.seat_no;
            var g = b.passenger_id_type_code + "_" + b.passenger_id_no + "_" + b.passenger_name;
            if (hasFcFlag == "Y") {
                u = " <tr id=" + l + " attri=" + attri + " traininfo=" + o + " psginfo=" + g + ' ><td rowspan="2">' + (n + 1) + "</td>";
                s = ' <td rowspan="2">' + b.passenger_name
            } else {
                u = " <tr id=" + l + " attri=" + attri + " traininfo=" + o + " psginfo=" + g + "><td>" + f + "</td>";
                s = " <td>" + b.passenger_name
            }
            if (d == "2") {
                s += "(孩)"
            }
            s += "<br />" + b.passenger_id_no + "</td>";
            r = ' <td><strong class="mr5">' + j.station_train_code + "</strong>" + j.from_station_name + "--" + j.to_station_name + "</td>";
            q = $.createTd4Ins(f, m, d, e, p);
            q += "</<tr>";
            if (hasFcFlag == "Y") {
                v = h.fcTicket;
                a = v.stationTrainDTO;
                f = n + 11;
                l = "ins_tr_" + f;
                o = v.batch_no + "_" + v.coach_no + "_" + v.seat_no;
                i = "<tr id=" + l + " attri=" + attri + " traininfo=" + o + " psginfo=" + g + ">";
                i += ' <td><strong class="mr5">' + a.station_train_code + "</strong>" + a.from_station_name + "--" + a.to_station_name + "</td>";
                i += $.createTd4Ins(f, m, d, e, p);
                i += "</<tr>"
            }
            return u + s + r + q + i
        }, createTd4Ins: function (b, d, a, g, c) {
            var e, f;
            f = "isu_radio_name_" + b;
            e = '<td class="bx-info">';
            e += ' <div><span>  <input type="checkbox" name="ins_checkbox" class="check"  onclick="$.choseIns(this)"/><span class="cyx">乘意险</span>';
            if (c == "1") {
                if (d == "GE") {
                    if (a == "2") {
                        e += ' <span>￥<strong class="colorA">' + ins_fee_category[1] + '</strong>元×1份</span><span class="color999 ml10">' + ins_compensation_category[1] + "</span></label></div>";
                        e += '<div><select  class="select-mini"><option value="' + minors_sel_default + '">' + minors_sel_default + "</option>" + insMinors_selOP + '</select><span style="margin-left:10px;">或去<a shape="rect" href="../passengers/init">我的常用联系人</a>中添加</span></div>'
                    } else {
                        e += ' <span>￥<strong class="colorA">' + ins_fee_category[2] + '</strong>元×1份</span><span class="color999 ml10">' + ins_compensation_category[2] + "</span></label></div>"
                    }
                } else {
                    if (g == "N") {
                        e += ' <span>￥<strong class="colorA">' + ins_fee_category[1] + '</strong>元×1份</span><span class="color999 ml10">' + ins_compensation_category[1] + "</span></label></div>"
                    }
                }
            } else {
                if (a == "2") {
                    e += ' <span><span>￥<strong class="colorA">' + ins_fee_category[1] + '</strong>元×1份</span><span class="color999 ml10">' + ins_compensation_category[1] + "</span></span> </span></div>"
                } else {
                    e += ' <span><span class="mr5"><input type="radio"  class="radio" name=' + f + '  value="adult" onclick="$.choseRadio(this)" /> ≥18岁</span>   <span class="mr5"><input type="radio" class="radio" name=' + f + '  value="teenager" onclick="$.choseRadio(this)"/><18岁</span></span>';
                    e += ' <span><span>￥<strong class="colorA">' + ins_fee_category[2] + '</strong>元×1份</span><span class="color999 ml10">' + ins_compensation_category[2] + "</span></span> </span></div>"
                }
                if (g == "Y") {
                    e += '<div><select  class="select-mini"><option value="' + minors_sel_default + '">' + minors_sel_default + "</option>" + insMinors_selOP + '</select><span style="margin-left:10px;">或去<a shape="rect" href="../passengers/init">我的常用联系人</a>中添加</span></div>'
                }
            }
            e += " </td>";
            return e
        }, alertError: function (a) {
            alertFlag = true;
            dhtmlx.alert({
                title: "错误提示", ok: "确认", text: a, type: "alert-error", callback: function () {
                }
            });
            $("#defaultwarningAlert_id").css("top", "280px")
        }, getToday: function () {
            var b = new Date();
            var a = b.getFullYear();
            var d = (b.getMonth() + 1) < 10 ? "0" + (b.getMonth() + 1) : (b.getMonth() + 1);
            var c = b.getDate() < 10 ? "0" + b.getDate() : b.getDate();
            return a + "/" + d + "/" + c
        }, initInsuranceClick: function () {
            $("#insurance_buy_and_agree").attr("checked", false)
        }, clickInsBuyAndAgree: function (a) {
            if ($(a).is(":checked")) {
                if (born_date && born_date == "19000101") {
                    var b = '<P>购买保险前，请正确填写您的出生日期，</br></br>去<a href="' + ctx + 'modifyUser/initQueryUserInfo">个人信息</a>中修改。</P>';
                    dhtmlx.alert({
                        title: "提示", ok: "取消", text: b, type: "alert-error", callback: function () {
                            $("#insurance_buy_and_agree").attr("checked", false)
                        }
                    });
                    return
                }
                $("#insurance_tips").show();
                $("#insurance_table").show();
                $("#total_all_price").parent().show();
                $("#total_ins_price").parent(".item").show();
                if ($("#integrationPayButton")[0]) {
                    $("#integrationPayButton").hide()
                }
            } else {
                $("#insurance_tips").hide();
                $("#insurance_table").hide();
                if ($("#total_wl_price").is(":visible") == false) {
                    $("#total_all_price").parent().hide()
                }
                $("#total_ins_price").html("").parent(".item").hide();
                if ($("#qpfs_zq").is(":checked")) {
                    $("#integrationPayButton").show()
                }
            }
            if (boughtIns) {
            } else {
                $("#ins_select_all").click()
            }
        }, choseIns: function (g) {
            var a = $(g).parent().parent().parent().parent();
            var b = $(a).attr("attri");
            var i, c, h, f;
            i = b.split("_")[0];
            c = b.split("_")[1];
            h = b.split("_")[2];
            f = b.split("_")[3];
            if ($(g).is(":checked")) {
                if (i != "1" && c == "1") {
                    $(a).find(":radio").first().click()
                }
                if (i == "1") {
                    if (h == "GE") {
                        if (c == "2") {
                            $(a).attr("fee", (new Number(ins_fee_category[1])) * 100)
                        } else {
                            $(a).attr("fee", (new Number(ins_fee_category[2])) * 100)
                        }
                    } else {
                        if (f == "N") {
                            $(a).attr("fee", (new Number(ins_fee_category[1])) * 100)
                        }
                    }
                } else {
                    if (c == "2") {
                        $(a).attr("fee", (new Number(ins_fee_category[1])) * 100)
                    } else {
                        $(a).attr("fee", (new Number(ins_fee_category[2])) * 100)
                    }
                }
            } else {
                if (i != "1" && c == "1") {
                    $(a).find(":radio").removeAttr("checked")
                }
                $(a).removeAttr("fee")
            }
            $.calculateIsuFee();
            var e = $('input:checkbox[name="ins_checkbox"]').length;
            var d = $('input:checkbox[name="ins_checkbox"]:checked').length;
            if (e == d) {
                if ($("#ins_select_all").is(":checked")) {
                } else {
                    $("#ins_select_all")[0]["checked"] = "checked"
                }
            } else {
                if ($("#ins_select_all").is(":checked")) {
                    $("#ins_select_all").removeAttr("checked")
                }
            }
        }, changeSelect: function (e) {
            var d = $(e).parent().parent().parent().attr("id");
            if ($("#" + d).find("input[name='ins_checkbox'][type='checkbox']").is(":checked")) {
                var a = $(e).val();
                if (minors_sel_default.indexOf(a) > -1) {
                    for (var c = 0; c < sel_psgs.length; c++) {
                        if (sel_psgs[c].key == d) {
                            sel_psgs[c].value = a;
                            break
                        }
                    }
                    return
                }
                if (sel_psgs.length == 0) {
                    sel_psgs.push(new $.sel_psg(d, a));
                    return
                }
                var f;
                var b;
                for (var c = 0; c < sel_psgs.length; c++) {
                    if (sel_psgs[c].key != d && sel_psgs[c].value == a) {
                        f = a + "已添加,请重新选择！";
                        break
                    }
                }
                if (f) {
                    $.alertError(a + "已添加,请重新选择！");
                    $(e).get(0).selectedIndex = 0;
                    for (var c = 0; c < sel_psgs.length; c++) {
                        if (sel_psgs[c].key == d) {
                            sel_psgs[c].value = minors_sel_default;
                            break
                        }
                    }
                    return
                }
                for (var c = 0; c < sel_psgs.length; c++) {
                    if (sel_psgs[c].key == d) {
                        sel_psgs[c].value = a;
                        b = "Y";
                        break
                    }
                }
                if (b && b == "Y") {
                    return
                } else {
                    sel_psgs.push(new $.sel_psg(d, a))
                }
            } else {
                for (var c = 0; c < sel_psgs.length; c++) {
                    if (sel_psgs[c].key == d) {
                        sel_psgs[c].value = minors_sel_default;
                        break
                    }
                }
            }
        }, choseRadio: function (e) {
            var d = $(e).attr("name").split("_");
            var c = d[d.length - 1];
            var a = 0;
            var b = "";
            $(e).attr("checked", true);
            $(e).parent().siblings().first().find("input:radio").removeAttr("checked");
            if ($(e).val() == "adult") {
                a = ins_fee_category[2];
                b = ins_compensation_category[2]
            } else {
                if ($(e).val() == "teenager") {
                    a = ins_fee_category[1];
                    b = ins_compensation_category[1]
                } else {
                    return
                }
            }
            $(e).parent().parent().next().find("strong[class=colorA]").html(a);
            $(e).parent().parent().next().find("span:eq(1)").html(b);
            $(e).parent().parent().next().show();
            $("#ins_tr_" + c).attr("fee", (new Number(a)) * 100);
            $.calculateIsuFee()
        }, choseInsAll: function (a) {
            if ($(a).is(":checked")) {
                $("#insurance_table").find(":checkbox").each(function (b) {
                    if ($(this).is(":checked")) {
                    } else {
                        this.click()
                    }
                })
            } else {
                $("#insurance_table").find(":checkbox").each(function (b) {
                    if ($(this).is(":checked")) {
                        this.click()
                    }
                })
            }
            $.calculateIsuFee()
        }, calculateIsuFee: function () {
            var a = new Number(0);
            var b;
            $("#insurance_table").find("tr[id]").each(function (c) {
                if ($(this).attr("fee") != null) {
                    a += new Number($(this).attr("fee"))
                }
            });
            a = a / 100;
            if (a.toString().indexOf(".") > -1) {
                b = a.toString()
            } else {
                b = a + ".0"
            }
            $("#ins_fee_total").html(b + "元");
            $("#total_ins_price").html(b + "元");
            $.calTotalFee()
        }, calTotalFee: function () {
            var g = $("#total_ticket_price").html();
            g = g.substring(0, g.length - 1);
            var c = (new Number(g)) * 100;
            var e = $("#total_ins_price").html();
            e = e.substring(0, e.length - 1);
            var b = (new Number(e)) * 100;
            var f = $("#total_wl_price").html();
            var d = 0;
            if (f && f != "-") {
                f = f.substring(0, f.length - 1);
                d = (new Number(f)) * 100
            }
            var a = c + b + d;
            a = a / 100;
            if (a.toString().indexOf(".") > -1) {
                a = a.toString()
            } else {
                a = a + ".0"
            }
            $("#total_all_price").html(a + "元")
        }, showInsContract: function () {
            dhtmlx.createWin({
                winId: "insurance_contract_div",
                closeWinId: ["ins_cntract_div_cancel", "ins_cntract_div_close"]
            });
            $("#insurance_contract_div").css("top", "100px")
        }, showInsNeed2Know: function () {
            dhtmlx.createWin({
                winId: "insurance_need2know_div",
                closeWinId: ["ins_need2know_div_cancel", "ins_need2know_div_close"]
            });
            $("#insurance_need2know_div").css("top", "100px")
        }
    })
})();
(function () {
    var showTicket;
    var fcshowTicket;
    var insuranceList;
    $(document).ready(function () {
        initbeforeButton();
        showTicket = new Array();
        fcshowTicket = new Array();
        insuranceList = new Array();
        initPageTitle(1);
        cancelOrderInit();
        integrationPayInit();
        cancelReginInit();
        queryLeftTicketInit();
        $.reginOnlineInit();
        renderTitleTicketInfo();
        renderCheckTicketInfoInit();
        fcRenderCheckTicketInfoInit();
        ticketAlertInit();
        payOnlineInit();
        if (canInsurance && (tour_flag == "dc" || tour_flag == "fc")) {
            showIns()
        }
    });
    function showZtkyts() {
        var flag = $.jc_getcookie("_jc_save_showZtkyts");
        if (!flag) {
            $("#ztky_mask").height($(document).height()).show();
            var $left = $("#qpfs_sp").offset().left - 160;
            var $top = $("#main_content").offset().top + $("#qp_info").offset().top - 12;
            $("#ztky_f_content").css({left: $left, top: $top}).show();
            $("#ztky_f_close").click(function () {
                $("#ztky_f_content").hide();
                $("#ztky_mask").hide()
            });
            $.jc_setcookie("_jc_save_showZtkyts", "true", 365 * 24 * 60 * 60);
            window.setTimeout(function () {
                $("#ztky_f_content").hide();
                $("#ztky_mask").hide()
            }, 5000)
        }
    }

    function showIns() {
        var flag = $.jc_getcookie("_jc_save_showIns");
        if (!flag) {
            $("#ins_mask").height($(document).height()).show();
            var $left = $("#insurance_buy_and_agree").offset().left + 56;
            var $top = $("#main_content").offset().top + $("#insurance_renderTicket_div").offset().top - 30;
            $("#ins_f_content").css({left: $left, top: $top}).show();
            $("#ins_f_close").click(function () {
                $("#ins_f_content").hide();
                $("#ins_mask").hide()
            });
            $.jc_setcookie("_jc_save_showIns", "true", 2 * 24 * 60 * 60);
            window.setTimeout(function () {
                $("#ins_f_content").hide();
                $("#ins_mask").hide()
            }, 5000)
        }
    }

    function checkPartSuc() {
        if (parOrderDTOJson && parOrderDTOJson != "") {
            var jsonDto = eval("(" + parOrderDTOJson + ")");
            var failMessages = jsonDto.failMessages;
            var size = 0;
            if (failMessages && (size = failMessages.length) > 0) {
                var html = [];
                for (var k = 0; k < size; k++) {
                    html[k] = failMessages[k] + "<br></br>"
                }
                dhtmlx.alert({
                    title: "提示", ok: "确定", text: html.join(""), type: "alert-error", callback: function () {
                        alertDiffC()
                    }
                })
            } else {
                alertDiffC()
            }
        }
    }

    function alertDiffC() {
        var msg = "本次列车已无满足您需求的集中席位，系统为您自动分配了不同车厢席位，您可在列车上联系列车员，在征得其他旅客同意后，调换座/铺位，请确认后继续支付或取消订单。";
        var trs = $("#show_ticket_message tr");
        var tmp = "";
        var num = 0;
        for (var k = 0, size = trs.length; k < size; k++) {
            var tdobj = trs.eq(k).find("td").eq(6);
            if (tmp != tdobj.html()) {
                tmp = tdobj.html();
                num++
            }
        }
        if (num > 1) {
            dhtmlx.alert({title: "提示", ok: "确定", text: msg, type: "alert-error"});
            return
        }
        if (tour_flag == "fc") {
            trs = $("#show_ticket_message_fc tr");
            tmp = "";
            num = 0;
            for (var k = 0, size = trs.length; k < size; k++) {
                var tdobj = trs.eq(k).find("td").eq(6);
                if (tmp != tdobj.html()) {
                    tmp = tdobj.html();
                    num++
                }
            }
            if (num > 1) {
                dhtmlx.alert({title: "提示", ok: "确定", text: msg, type: "alert-error"});
                return
            }
        }
    }

    function initbeforeButton() {
        $("#payButton").removeClass().addClass("btn92")
    }

    function renderCheckTicketInfoInit() {
        function ticketPassenger(num_id, passenger_name, passenger_id_type_name, passenger_id_no, ticket_type_name, seat_type_name, coach_name, seat_name, ticket_price) {
            this.num_id = num_id;
            this.passenger_name = passenger_name;
            this.passenger_id_type_name = passenger_id_type_name;
            this.passenger_id_no = passenger_id_no;
            this.ticket_type_name = ticket_type_name;
            this.seat_type_name = seat_type_name;
            this.coach_name = coach_name;
            this.seat_name = seat_name;
            this.ticket_price = ticket_price
        }

        for (var i = 0; i < passangerTicketList.length; i++) {
            var ticketDTO = passangerTicketList[i];
            var ticketPrice = (ticketDTO.ticket_price / 100) + "";
            if (ticketPrice.indexOf(".") == -1) {
                ticketPrice = ticketPrice + ".0"
            }
            var sequence = i + 1;
            showTicket.push(new ticketPassenger(sequence, ticketDTO.passengerDTO.passenger_name, ticketDTO.passengerDTO.passenger_id_type_name, ticketDTO.passengerDTO.passenger_id_no, ticketDTO.ticket_type_name, ticketDTO.seat_type_name, ticketDTO.coach_name, ticketDTO.seat_name, ticketPrice))
        }
        if (showTicket != "" && showTicket != null && showTicket.length > 0) {
            renderCheckTicketInfo(showTicket)
        }
    }

    function renderCheckTicketInfo(data) {
        var tmpl = $("#checkTicketTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({leftTableTemplate: tmpl});
        $("#show_ticket_message").html($.render.leftTableTemplate(showTicket))
    }

    function fcRenderCheckTicketInfoInit() {
        function fcTicketPassenger(num_id, passenger_name, passenger_id_type_name, passenger_id_no, ticket_type_name, seat_type_name, coach_name, seat_name, ticket_price) {
            this.num_id = num_id;
            this.passenger_name = passenger_name;
            this.passenger_id_type_name = passenger_id_type_name;
            this.passenger_id_no = passenger_id_no;
            this.ticket_type_name = ticket_type_name;
            this.seat_type_name = seat_type_name;
            this.coach_name = coach_name;
            this.seat_name = seat_name;
            this.ticket_price = ticket_price
        }

        if (fcPassangerTicketList != null) {
            for (var i = 0; i < fcPassangerTicketList.length; i++) {
                var ticketDTO = fcPassangerTicketList[i];
                var ticketPrice = (ticketDTO.ticket_price / 100) + "";
                if (ticketPrice.indexOf(".") == -1) {
                    ticketPrice = ticketPrice + ".0"
                }
                var sequence = i + 1;
                fcshowTicket.push(new fcTicketPassenger(sequence, ticketDTO.passengerDTO.passenger_name, ticketDTO.passengerDTO.passenger_id_type_name, ticketDTO.passengerDTO.passenger_id_no, ticketDTO.ticket_type_name, ticketDTO.seat_type_name, ticketDTO.coach_name, ticketDTO.seat_name, ticketPrice))
            }
        }
        if (tour_flag == "fc" && fcshowTicket != "" && fcshowTicket != null && fcshowTicket.length > 0) {
            fcRenderCheckTicketInfo(fcshowTicket);
            fcRenderTitleTicketInfo()
        } else {
            $("#show_title_ticket_fc").hide();
            $("#show_table_fc").hide()
        }
    }

    function fcRenderCheckTicketInfo(data) {
        var tmpl = $("#fcCheckTicketTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({leftTableTemplate: tmpl});
        $("#show_ticket_message_fc").html($.render.leftTableTemplate(fcshowTicket))
    }

    function renderTitleTicketInfo() {
        var tmpl = $("#showTitleTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({leftTableTemplate: tmpl});
        $("#show_title_ticket").html($.render.leftTableTemplate(ticketTitleForm))
    }

    function fcRenderTitleTicketInfo() {
        var tmpl = $("#fcShowTitleTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({leftTableTemplate: tmpl});
        $("#show_title_ticket_fc").html($.render.leftTableTemplate(fcTicketTitleForm))
    }

    function cancelOrderInit() {
        $("#cancelButton").bind("click", function () {
            dhtmlx.createWin({
                winId: "cancel_order_id",
                closeWinId: ["cancel_order_close", "cancel_order_co"],
                okId: "cancel_order_ok",
                okCallBack: function () {
                    $.submitCancel()
                },
                callback: function () {
                    delId = null;
                    _passengerInfor = null
                }
            });
            $("#cancel_order_id").css("top", "300px")
        })
    }

    function integrationPayInit() {
        $("#integrationPayButton").bind("click", function () {
            if (ticket_price_fifty) {
                    dhtmlx.createWin({
                    winId: "confirmPrice",
                    closeWinId: ["close_conifrmdialog_id", "cancel_dialog"],
                    okId: "goto_integration",
                    okCallBack: function () {
                        $.integration_agree()
                    },
                    callback: function () {
                        delId = null;
                        _passengerInfor = null
                    }
                })
            } else {
                $.integration_agree()
            }
        })
    }

    function toPay() {
        var modalbox = dhtmlx.modalbox({
            targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
            callback: function () {
            }
        });
        var batch_nos = "", coach_nos = "", seat_nos = "", passenger_id_types = "", passenger_id_nos = "", passenger_names = "", insure_price_all = "", insure_types = "", if_buy_insure_only = "N";
        if (canInsurance && (tour_flag == "dc" || tour_flag == "fc") && $("#insurance_buy_and_agree").is(":checked")) {
            var sel_mins = "";
            var psgIdType, psgIdNo, psgName;
            var sel_mins_array = new Array();
            var sel_mins_value = "", msg = "", index, train_code;
            var size = 0;
            $("#insurance_table").find(":checkbox:checked").each(function () {
                size += 1;
                tr_id = $(this).parent().parent().parent().parent().attr("id");
                sel_mins_value = $("#" + tr_id + " option:selected").val();
                if (sel_mins_value) {
                    if (minors_sel_default == sel_mins_value) {
                        msg = minors_sel_default;
                        return
                    } else {
                        index = tr_id.split("_")[2];
                        if (index > 10) {
                            train_code = $("#" + tr_id).find("td:eq(0)").find("strong").html()
                        } else {
                            train_code = $("#" + tr_id).find("td:eq(2)").find("strong").html()
                        }
                        sel_mins_array.push(sel_mins_value + "_" + train_code)
                    }
                }
            });
            if (size == 0) {
                $.alertError("请选择您的投保信息！");
                dhtmlx.modalbox.hide(modalbox);
                return
            }
            if (msg) {
                $.alertError(msg);
                dhtmlx.modalbox.hide(modalbox);
                return
            }
            for (var i = 0; i < sel_mins_array.length; i++) {
                sel_mins = sel_mins_array[i];
                for (var j = i + 1; j < sel_mins_array.length; j++) {
                    if (sel_mins == sel_mins_array[j]) {
                        psgIdNo = sel_mins.split("_")[0];
                        psgName = sel_mins.split("_")[2];
                        msg = "被投保人：" + psgName + "(" + psgIdNo + ")信息重复，请重新选择！";
                        break
                    }
                }
                if (msg) {
                    break
                }
            }
            if (msg) {
                $.alertError(msg);
                dhtmlx.modalbox.hide(modalbox);
                return
            }
            var attr, useParentId, tr_id, ticket_type, id_type, psginfo, traininfo, ageStatus;
            $("#insurance_table").find("td[class=bx-info] :checkbox:checked").each(function () {
                tr_id = $(this).parent().parent().parent().parent().attr("id");
                attr = $("#" + tr_id).attr("attri");
                useParentId = attr.split("_")[3];
                ticket_type = attr.split("_")[1];
                id_type = attr.split("_")[0];
                ageStatus = attr.split("_")[2];
                if (useParentId == "Y") {
                    psgIdType = $("#" + tr_id + " option:selected").val().split("_")[1];
                    psgIdNo = $("#" + tr_id + " option:selected").val().split("_")[0];
                    psgName = $("#" + tr_id + " option:selected").val().split("_")[2];
                    insure_types += "0"
                } else {
                    psginfo = $("#" + tr_id).attr("psginfo");
                    psgIdType = psginfo.split("_")[0];
                    psgIdNo = psginfo.split("_")[1];
                    psgName = psginfo.split("_")[2];
                    if (ticket_type == "2") {
                        insure_types += "0"
                    } else {
                        if (id_type == "1") {
                            if (ageStatus == "GE") {
                                insure_types += "1"
                            } else {
                                insure_types += "0"
                            }
                        } else {
                            $radio = $("#" + tr_id).find(":radio:checked");
                            var dd = $($radio).val();
                            if ($($radio).val() == "adult") {
                                insure_types += "1"
                            } else {
                                if ($($radio).val() == "teenager") {
                                    insure_types += "0"
                                }
                            }
                        }
                    }
                }
                traininfo = psginfo = $("#" + tr_id).attr("traininfo");
                passenger_id_types += psgIdType;
                passenger_id_nos += psgIdNo + "#";
                passenger_names += psgName + "#";
                batch_nos += traininfo.split("_")[0] + "#";
                coach_nos += traininfo.split("_")[1];
                seat_nos += traininfo.split("_")[2]
            });
            insure_price_all = $("#ins_fee_total").text()
        }
        $.ajax({
            url: ctx + "payOrder/paycheckNew",
            async: false,
            type: "post",
            dataType: "json",
            data: {
                batch_nos: batch_nos,
                coach_nos: coach_nos,
                seat_nos: seat_nos,
                passenger_id_types: passenger_id_types,
                passenger_id_nos: passenger_id_nos,
                passenger_names: passenger_names,
                insure_price_all: insure_price_all,
                insure_types: insure_types,
                if_buy_insure_only: if_buy_insure_only,
                hasBoughtIns: hasBoughtIns
            },
            success: function (response) {
                dhtmlx.modalbox.hide(modalbox);
                if (response.data.flag) {
                    dhtmlx.createWin({
                        winId: "waitpay_online",
                        closeWinId: ["online_have_question"],
                        okId: "finish_pay_order",
                        okCallBack: function () {
                            otsRedirect("post", ctx + "payfinish/init", {get_ticket_pass: "pay_success"}, "_self")
                        },
                        callback: function () {
                            otsRedirect("post", ctx + "payfinish/init", {get_ticket_pass: "pay_question"}, "_self")
                        }
                    });
                    $("#waitpay_online").css("top", "300px");
                    $("#payButton").removeClass().addClass("btn92");
                    $("#payButton").unbind("click");
                    var data = response.data.payForm;
                    $(".dhx_modal_cover").removeClass().addClass("dhx_modal_cover_dv");
                    otsRedirect("post", data.epayurl, {
                        interfaceName: data.interfaceName,
                        interfaceVersion: data.interfaceVersion,
                        tranData: data.tranData,
                        merSignMsg: data.merSignMsg,
                        appId: data.appId,
                        transType: data.transType
                    }, "_blank")
                } else {
                    dhtmlx.alert({
                        title: "提示",
                        ok: "确定",
                        text: response.data.message,
                        type: "alert-error",
                        callback: function () {
                        }
                    })
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                dhtmlx.modalbox.hide(modalbox)
            }
        })
    }

    function payOnlineInit() {
        $("#payButton").removeClass().addClass("btn92s");
        $("#payButton").bind("click", function () {
            if ((tour_flag == "dc" || tour_flag == "fc") && $("#qpfs_sp").is(":checked")) {
                var ps_body_trs = $("#ps_body tr[id]");
                var tflag = true;
                for (var i = 0, size = ps_body_trs.length; i < size; i++) {
                    var trObj = ps_body_trs.eq(i);
                    if ((trObj.attr("chooseest") || trObj.attr("chooseesa")) && (!trObj.attr("trackingno") || trObj.attr("trackingno") == "")) {
                        tflag = false;
                        break
                    }
                    var td = trObj.find("td:last");
                    if (td.html().indexOf("保存修改") >= 0) {
                        tflag = false;
                        break
                    }
                }
                if (tflag) {
                    toPay()
                } else {
                    return
                }
            } else {
                toPay()
            }
        })
    }

    function cancelReginInit() {
        $("#cancelResign").bind("click", function () {
            dhtmlx.createWin({
                winId: "cancel_resign_id",
                closeWinId: ["cancel_resign_close", "cancel_resign_cr"],
                okId: "cancel_resign_ok",
                okCallBack: function () {
                    $.submitResign()
                },
                callback: function () {
                    delId = null;
                    _passengerInfor = null
                }
            })
        })
    }

    function queryLeftTicketInit() {
        $("#backButton").bind("click", function () {
            otsRedirect("post", ctx + "leftTicket/init", {pre_step_flag: "fcInit"});
            return false
        })
    }

    function ticketAlertInit() {
        var errMsg = "";
        var isNoSeat = false;
        if (tour_flag == "wc" || tour_flag == "dc" || tour_flag == "gc") {
            $("#show_ticket_message tr").each(function () {
                var seatno = $(this).children().eq(7).text();
                var seatname = $(this).children().eq(5).text();
                if (seatno == "无座" && !isNoSeat) {
                    errMsg = "您所购车次的" + seatname + "已售完，系统自动为您分配了无座票。";
                    isNoSeat = true
                }
                if (seatname.indexOf("代") >= 0 && !isNoSeat) {
                    errMsg = "您申请的" + seatname.substring(seatname.indexOf("代") + 1, seatname.length) + "为" + seatname + "。"
                }
            })
        } else {
            if (tour_flag == "fc") {
                $("#show_ticket_message_fc tr").each(function () {
                    var seatno = $(this).children().eq(7).text();
                    var seatname = $(this).children().eq(5).text();
                    if (seatno == "无座" && !isNoSeat) {
                        errMsg = "您所购车次的" + seatname + "已售完，系统自动为您分配了无座票。";
                        isNoSeat = true
                    }
                    if (seatname.indexOf("代") >= 0 && !isNoSeat) {
                        errMsg = "您申请的" + seatname.substring(seatname.indexOf("代") + 1, seatname.length) + "为" + seatname + "。"
                    }
                })
            }
        }
        if (errMsg != "") {
            dhtmlx.alert({
                title: "提示", ok: "确定", text: errMsg, type: "alert-error", callback: function () {
                    checkPartSuc()
                }
            })
        } else {
            checkPartSuc()
        }
    }

    jQuery.extend({
        submitCancel: function () {
            $.ajax({
                url: ctx + "payOrder/cancel",
                async: false,
                data: {
                    sequence_no: sequence_no,
                    parOrderDTOJson: parOrderDTOJson,
                    orderRequestDTOJson: orderRequestDTOJson
                },
                type: "post",
                dataType: "json",
                success: function (response) {
                    if (response.data.cancelStatus) {
                        otsRedirect("post", ctx + "leftTicket/init", {})
                    } else {
                        dhtmlx.alert({
                            title: "提示",
                            ok: "确定",
                            text: response.data.errorMessage,
                            type: "alert-error",
                            callback: function () {
                            }
                        })
                    }
                }
            })
        }, submitResign: function () {
            $.ajax({
                url: ctx + "payOrder/cancelResign",
                async: false,
                data: {
                    sequence_no: sequence_no,
                    parOrderDTOJson: parOrderDTOJson,
                    orderRequestDTOJson: orderRequestDTOJson
                },
                type: "post",
                dataType: "json",
                success: function (response) {
                    if (response.data.cancelStatus) {
                        otsRedirect("post", ctx + "queryOrder/init", {})
                    } else {
                        dhtmlx.alert({
                            title: "提示",
                            ok: "确定",
                            text: response.data.errorMessage,
                            type: "alert-error",
                            callback: function () {
                            }
                        })
                    }
                }
            })
        }, integration_agree: function () {
            $.ajax({
                url: ctx + "payOrder/integrationInit",
                data: {parOrderDTOJson: parOrderDTOJson},
                type: "post",
                dataType: "json",
                success: function (response) {
                    if (response.data.integrationPayStatus) {
                        otsRedirect("post", ctx + "payOrder/gotoIntegrationPay", {
                            need_points: response.data.webIntegrationPayDTO.need_points + "",
                            available_points: response.data.webIntegrationPayDTO.available_points + "",
                            price_list: response.data.webIntegrationPayDTO.price_list
                        })
                    } else {
                        dhtmlx.alert({
                            title: "提示",
                            ok: "确定",
                            text: response.data.errorMessage,
                            type: "alert-error",
                            callback: function () {
                            }
                        })
                    }
                }
            })
        }, reginOnlineInit: function () {
            $("#resignButtonN").bind("click", function () {
                $.ajax({
                    url: ctx + "pay/payConfirmN",
                    data: {
                        parOrderDTOJson: parOrderDTOJson,
                        oldTicketDTOJson: oldTicketDTOJson,
                        sequence_no: sequence_no,
                        batch_no: batch_no
                    },
                    type: "post",
                    dataType: "json",
                    success: function (response) {
                        var get_ticket_pass;
                        if (response.data.resignStatus) {
                            get_ticket_pass = "pay_success";
                            otsRedirect("post", ctx + "payfinish/init", {get_ticket_pass: get_ticket_pass})
                        } else {
                            get_ticket_pass = "pay_question";
                            dhtmlx.alert({
                                title: "提示",
                                ok: "确定",
                                text: response.data.errorMessage,
                                type: "alert-error",
                                callback: function () {
                                }
                            })
                        }
                    }
                })
            });
            $("#resignButtonT").bind("click", function () {
                $.ajax({
                    url: ctx + "pay/payConfirmT",
                    data: {
                        parOrderDTOJson: parOrderDTOJson,
                        oldTicketDTOJson: oldTicketDTOJson,
                        sequence_no: sequence_no,
                        batch_no: batch_no
                    },
                    type: "post",
                    dataType: "json",
                    success: function (response) {
                        var get_ticket_pass;
                        if (response.data.resignStatus) {
                            get_ticket_pass = "pay_success";
                            otsRedirect("post", ctx + "payfinish/init", {get_ticket_pass: get_ticket_pass})
                        } else {
                            get_ticket_pass = "pay_question";
                            dhtmlx.alert({
                                title: "提示",
                                ok: "确定",
                                text: response.data.errorMessage,
                                type: "alert-error",
                                callback: function () {
                                }
                            })
                        }
                    }
                })
            })
        }
    })
})();
if (typeof JSON !== "object") {
    JSON = {}
}
(function () {
    function f(n) {
        return n < 10 ? "0" + n : n
    }

    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf()
        }
    }
    var cx, escapable, gap, indent, meta, rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case"string":
                return quote(value);
            case"number":
                return isFinite(value) ? String(value) : "null";
            case"boolean":
            case"null":
                return String(value);
            case"object":
                if (!value) {
                    return "null"
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null"
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v
        }
    }

    if (typeof JSON.stringify !== "function") {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {"": value})
        }
    }
    if (typeof JSON.parse !== "function") {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({"": j}, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());
var newpassangerTicketList = [];
var addressAttr = [];
var epayOrder = new Object();
var expressOrders = new Object();
var isallts = true;
var hasTS = false;
var zq_sp_click = "0";
var chooseTickets = [false, false, false, false, false, false, false, false, false, false];
Function.prototype.method = function (a, b) {
    this.prototype[a] = b;
    return this
};
String.method("trim", function () {
    return this.replace(/^\s+|\s+$/g, "")
});
function AutoScroll(a) {
    $(a).find("ul:first").animate({marginTop: "-22px"}, 500, function () {
        $(this).css({marginTop: "0px"}).find("li:first").appendTo(this)
    })
}
function checkeCanPay() {
    var e = $("#ps_body tr[id]");
    var c = true;
    if ($("#qpfs_zq").is(":checked")) {
        return true
    }
    for (var b = 0, a = e.length; b < a; b++) {
        var d = e.eq(b);
        if ((d.attr("chooseest") || d.attr("chooseesa")) && (!d.attr("trackingno") || d.attr("trackingno") == "")) {
            c = false;
            break
        }
        var f = d.find("td:last");
        if (f.html().indexOf("保存修改") >= 0) {
            c = false;
            break
        }
    }
    if (c) {
        $("#payButton").removeClass("btn92").addClass("btn92s").removeAttr("title")
    } else {
        $("#payButton").addClass("btn92").removeClass("btn92s").attr("title", "您有未保存的物流配送信息，请先保存再支付")
    }
}
(function () {
    var a = [false, false, false, false, false, false, false, false, false, false];
    $(document).ready(function () {
        if (tour_flag == "dc" || tour_flag == "fc") {
            $(function () {
                setInterval('AutoScroll("#scroll")', 3000)
            });
            $("#main_content").css("min-height", "830px");
            $.init_ticketData();
            if (!canchooseTicket) {
                canchooseTicket = new Object()
            }
            for (var c = 0, b = newpassangerTicketList.length; c < b; c++) {
                var f = newpassangerTicketList[c];
                var d = f.batch_no + f.coach_no + f.seat_no + f.stationTrainDTO.from_station_telecode + f.stationTrainDTO.to_station_telecode;
                if (canchooseTicket[d]) {
                    var e = f.start_train_date_page.toDate().getTime();
                    if (e >= ts_minDate && e <= ts_maxDate) {
                        hasTS = true;
                        break
                    }
                }
            }
            $.bindIsSend();
            if (maxDate.toDate().getTime() < minDate.toDate().getTime()) {
                for (var c = 0, b = newpassangerTicketList.length; c < b; c++) {
                    var f = newpassangerTicketList[c];
                    var d = f.batch_no + f.coach_no + f.seat_no + f.stationTrainDTO.from_station_telecode + f.stationTrainDTO.to_station_telecode;
                    if (canchooseTicket[d]) {
                        var e = f.start_train_date_page.toDate().getTime();
                        if (!(e >= ts_minDate && e <= ts_maxDate)) {
                            isallts = false;
                            break
                        }
                    }
                }
            } else {
                isallts = false
            }
        }
    });
    jQuery.extend({
        preCancel: function (g) {
            var h = $("#ps_body tr[id]");
            var e = h.length;
            var d = $(g).parent().parent().parent();
            if (d.attr("chooseesa")) {
                chooseAddress[Number(d.attr("chooseesa"))] = false
            }
            d.remove();
            if (e <= 1) {
                $.addPSXX(true)
            } else {
                var b = $("#ps_body tr");
                for (var c = 1; c < b.length - 1; c++) {
                    var f = b.eq(c);
                    f.find("td:first").html("第" + c + "件");
                    f.attr("id", "wl_tr_" + c);
                    f.find("td[id^=addTicket_]").attr("id", "addTicket_" + c);
                    f.find("td[id^=addAddress_]").attr("id", "addAddress_" + c);
                    f.find("td[id^=price_]").attr("id", "price_" + c);
                    f.find("td[id^=operate_]").attr("id", "operate_" + c)
                }
            }
            $.renderAllPrice();
            checkeCanPay()
        }, init_ticketData: function () {
            var c = -1;
            if (passangerTicketList && (c = passangerTicketList.length) > -1) {
                for (var b = 0; b < c; b++) {
                    newpassangerTicketList.push(passangerTicketList[b])
                }
            }
            if (tour_flag == "fc") {
                c = -1;
                if (fcPassangerTicketList && (c = fcPassangerTicketList.length) > -1) {
                    for (var b = 0; b < c; b++) {
                        newpassangerTicketList.push(fcPassangerTicketList[b])
                    }
                }
            }
        }, renderSavedExpress: function (v, H, k) {
            var m = [];
            var D = v.ticket_message.split("#");
            var E = "";
            var z = [];
            var I = 0;
            var f = 0;
            if (null != D && D.length != 0) {
                $("#detail_logistics").show();
                $("#deliver_msg").show();
                $("#total_wl_price").parent().show();
                $("#total_all_price").parent().show()
            }
            for (var A = 0; A < D.length - 1; A++) {
                var q = D[A].split("+");
                var G = -1;
                if (newpassangerTicketList && (G = newpassangerTicketList.length) > -1) {
                    for (var C = 0; C < G; C++) {
                        var d = newpassangerTicketList[C];
                        var x = d.passengerDTO;
                        if (d.sequence_no == q[0] && d.batch_no == q[1] && d.coach_no == q[2] && d.seat_no == q[3] && x.passenger_id_type_code == q[4] && x.passenger_id_no == q[5] && x.passenger_name == q[6]) {
                            chooseTickets[C] = true;
                            E += C + ",";
                            var c = x.passenger_id_no;
                            if (x.passenger_id_type_code == "1") {
                                c = c.substr(0, 6) + "***" + c.substr(14)
                            }
                            var b = "";
                            if (d.ticket_type_code == "2") {
                                b = "(孩票)"
                            }
                            var r = ' title="' + x.passenger_name + b + " (" + x.passenger_id_no + ')" ';
                            var o = x.passenger_name;
                            if (o.length > 3) {
                                o = o.substr(0, 3) + "…"
                            }
                            z[I++] = "<span " + r + ' class="seled-tic">' + o + b + " (" + c + ")";
                            z[I++] = " <strong>" + d.stationTrainDTO.station_train_code + "</strong>";
                            z[I++] = "(" + d.stationTrainDTO.from_station_name + "--" + d.stationTrainDTO.to_station_name;
                            z[I++] = ')<a style="display:none;" href="javascript:void(0);" onclick="$.delTicket(\'' + C + "','" + (H) + '\',this)" class="i-del" title="删除">删除</a>';
                            z[I++] = "</span><br/>";
                            if (A == (D.length - 2)) {
                                z[I++] = '<span style="display:none;" class="sel-sp sel-add" onclick="$.renderTicket(this)">请点击选择需要快递的车票</span>'
                            }
                        }
                    }
                    if ($("#integrationPayButton")[0]) {
                        $("#integrationPayButton").hide()
                    }
                }
            }
            var u = addressAttr.length;
            var t = "";
            var l = [];
            for (var C = 0; C < u; C++) {
                var n = addressAttr[C];
                if (n.addressee_name == v.addressee_name && n.mobile_no == v.mobile_no && n.addressee_province == v.addressee_province && n.addressee_city == v.addressee_city && n.addressee_county == v.addressee_county && n.addressee_town == v.addressee_town && n.addressee_street == v.addressee_street && n.detail_address == v.detail_address) {
                    chooseAddress[C] = true;
                    t = C;
                    break
                }
            }
            var h = v.addressee_city;
            if (h != v.addressee_province) {
                h = v.addressee_province + h
            }
            var e = h + v.addressee_county + (v.addressee_town ? v.addressee_town : "") + (v.addressee_street ? v.addressee_street : "");
            var B = n.addressee_name + "（收）(" + n.mobile_no + ")" + e + n.detail_address;
            var g = v.addressee_name;
            if (g.length > 5) {
                g = g.substr(0, 5) + "…"
            }
            if (e.length > 18) {
                e = e.substr(0, 18) + "…"
            }
            var w = v.detail_address;
            if (w.length > 18) {
                w = w.substr(0, 18) + "…"
            }
            var y = 0;
            l[y++] = '<div class="seled-piace td-pos-rel" title="' + B + '">';
            l[y++] = "<p><span>" + g + "（收）</span>" + v.mobile_no + "</p>";
            l[y++] = "<p>" + e + "</p>";
            l[y++] = "<p>" + w + "</p>";
            l[y++] = '<a style="display:none;"  href="javascript:void(0);" onclick="$.checkHasLoad(this,false,false,true)" class="edit" title="修改"></a></div>';
            var F = Number(epayOrder[v.tracking_no]) / 100;
            if (isNaN(F)) {
                F = 17
            }
            if (("" + F).indexOf(".") < 0) {
                F = F + ".0"
            }
            if (!k) {
                m[f++] = '<tr id="wl_tr_' + H + '" chooseest="' + E + '" chooseesa="' + t + '" ';
                m[f++] = ' chooseesp="' + Number(epayOrder[v.tracking_no]) + '" ';
                m[f++] = ' trackingno="' + v.tracking_no + '"  >'
            }
            m[f++] = "<td>第" + H + "件</td>";
            m[f++] = '<td id="addTicket_' + H + '">' + z.join("") + "</td>";
            m[f++] = '<td id="addAddress_' + H + '"  valign="middle">' + l.join("") + "</td>";
            var s = v.deliver_company;
            m[f++] = '<td id="price_' + H + '">' + s + '<div class="colorA">￥' + F + "元</div></td>";
            if (s == "京铁物流" || s == "1000000001") {
                m[f++] = '<td id="rule_' + H + '" style="text-align:left;padding-left:5px;">1、开车时间为第三日0:00-12:00间的车票，于第二日20:00以前送达；<br/>2、开车时间为第三日12:01-24:00间的车票，于开车前5小时送达；<br/>3、开车时间为第四日0:00-12:00之间开车的车票，于第三日20:00前送达；<br/>4、其他车票，自购票日三日内送达；</td>'
            } else {
                m[f++] = '<td id="rule_' + H + '" style="text-align:left;padding-left:5px;">订单日期的次日送达<br/></td>'
            }
            m[f++] = '<td id="operate_' + H + '"><a href="javascript:void(0);" onclick="$.cancelInfo(this)" class="btn72" style="width:55px;">取消配送</a>';
            m[f++] = '<br/><a href="javascript:void(0);" onclick="$.preUpdate(this)" class="btn72" style="width:55px;margin-top: 10px;">修改配送</a></td>';
            if (!k) {
                m[f++] = "</tr>"
            }
            return m.join("")
        }, bindIsSend: function () {
            if (savedExpress && savedExpress.length > 0) {
                zq_sp_click = "1";
                $.ajax({
                    type: "get", isTakeParam: false, async: false, beforeSend: function (k) {
                        k.setRequestHeader("If-Modified-Since", "0");
                        k.setRequestHeader("Cache-Control", "no-cache")
                    }, url: ctx + "logistics/address", timeout: 50000, error: function (k, m, l) {
                        dhtmlx.modalbox.hide(modalbox)
                    }, success: function (k) {
                        if (k.status) {
                            var l = k.data;
                            if (l && l.length > 0) {
                                addressAttr = l
                            }
                        }
                    }
                });
                $("#qpfs_zq")[0]["checked"] = false;
                $("#qpfs_sp")[0]["checked"] = true;
                $("#contract_agree_id").show();
                $("#_agree_id").prop("checked", true);
                $("#_agree_id").attr("disabled", true);
                $("#scroll").hide();
                $("#dcfc_wxts_1").hide();
                $("#dcfc_wxts_2").show();
                $("#detail_logistics").show();
                var f = $("#ps_body tr");
                f.eq(1).remove();
                if (queryEpayOrder.deliver_fee_info) {
                    var i = queryEpayOrder.deliver_fee_info.split("#");
                    for (var d = 0; d < i.length; d++) {
                        if (i[d] && i[d] != "") {
                            var c = i[d].split("+");
                            epayOrder[c[0].trim()] = c[1].trim()
                        }
                    }
                }
                for (var d = 0; d < savedExpress.length; d++) {
                    var j = savedExpress[d];
                    j.deliverAddress["update_time"] = "";
                    j.deliverAddress["create_time"] = "";
                    expressOrders[j.tracking_no] = j;
                    f = $("#ps_body tr");
                    var g = f.length - 1;
                    $("#ps_body tr:eq(" + (g - 1) + ")").after($.renderSavedExpress(j, g, false))
                }
                $.renderAllPrice()
            } else {
                if (tour_flag == "dc") {
                    $.renderDefaultTickets("1")
                } else {
                    if (newpassangerTicketList && (size = newpassangerTicketList.length) > 0) {
                        var e = 0;
                        for (var d = 0; d < size; d++) {
                            var h = newpassangerTicketList[d];
                            var b = h.batch_no + h.coach_no + h.seat_no + h.stationTrainDTO.from_station_telecode + h.stationTrainDTO.to_station_telecode;
                            if (h.ticket_type_code != "3" && canchooseTicket[b]) {
                                e++
                            }
                        }
                        if (e <= 5) {
                            $.renderDefaultTickets("1")
                        }
                    }
                }
            }
            $.bindRadioClick()
        }, renderDefaultAddress: function (m) {
            if (!$("#wl_tr_" + m).attr("chooseesa")) {
                if (addressAttr) {
                    var g = addressAttr.length;
                    for (var c = 0; c < g; c++) {
                        var e = addressAttr[c];
                        if (e.default_address == "0") {
                            var h = $("#ps_body tr[chooseesa='" + c + "']");
                            if (h && h.length > 0) {
                                var l = false;
                                for (var d = 0, i = h.length; d < i; d++) {
                                    var f = h.eq(d);
                                    var b = f.find("td:eq(1) span[title]").length;
                                    if (b < 5) {
                                        l = false;
                                        break
                                    } else {
                                        l = true
                                    }
                                }
                                if (!l) {
                                    return
                                }
                            }
                            $.renderOnePrice(m, c);
                            break
                        }
                    }
                }
            }
        }, renderDefaultTickets: function (b) {
            if (newpassangerTicketList && (size = newpassangerTicketList.length) > 0) {
                var x = "";
                var z = 0;
                var s = [];
                var g = $("#addTicket_" + b);
                var l = g.find(">span:last");
                var p = $("#ps_body tr");
                var y = [];
                if (p && p.length > 0) {
                    for (var v = 1; v < p.length - 1; v++) {
                        var t = p.eq(v).attr("chooseest");
                        if (t && t.indexOf(",") > 0) {
                            var o = t.split(",");
                            for (var w = 0; w < o.length; w++) {
                                if (o[w] != "") {
                                    y.push(Number(o[w]))
                                }
                            }
                        }
                    }
                }
                var m = 0;
                for (var u = 0; u < size; u++) {
                    var r = newpassangerTicketList[u];
                    var e = r.batch_no + r.coach_no + r.seat_no + r.stationTrainDTO.from_station_telecode + r.stationTrainDTO.to_station_telecode;
                    if (canchooseTicket && !canchooseTicket[e]) {
                        continue
                    }
                    if (r.ticket_type_code == "3") {
                        continue
                    }
                    var h = false;
                    for (var v = 0, f = y.length; v < f; v++) {
                        if (u == y[v]) {
                            h = true;
                            break
                        }
                    }
                    if (h) {
                        continue
                    }
                    m++;
                    chooseTickets[u] = true;
                    x += u + ",";
                    var d = r.passengerDTO.passenger_id_no;
                    if (r.passengerDTO.passenger_id_type_code == "1") {
                        d = d.substr(0, 6) + "***" + d.substr(14)
                    }
                    var c = "";
                    if (r.ticket_type_code == "2") {
                        c = "(孩票)"
                    }
                    var n = r.passengerDTO.passenger_name;
                    if (n.length > 3) {
                        n = n.substr(0, 3) + "…"
                    }
                    var q = ' title="' + r.passengerDTO.passenger_name + " (" + r.passengerDTO.passenger_id_no + ')" ';
                    s[z++] = "<span " + q + ' class="seled seled-tic">' + n + c + " (" + d + ")";
                    s[z++] = " <strong>" + r.stationTrainDTO.station_train_code + "</strong>";
                    s[z++] = "(" + r.stationTrainDTO.from_station_name + "--" + r.stationTrainDTO.to_station_name;
                    s[z++] = ')<a href="javascript:void(0);" onclick="$.delTicket(\'' + u + "','" + b + '\',this)" class="i-del" title="删除">删除</a></span><br/>'
                }
                if (m <= 5) {
                    g.empty();
                    g.append(s.join(""));
                    g.append(l);
                    $("#wl_tr_" + b).attr("chooseest", x)
                } else {
                    x = "";
                    $("#wl_tr_" + b).attr("chooseest", x)
                }
            }
        }, renderTicket: function (h) {
            var b = -1;
            if (typeof(h) == "string") {
                b = h
            } else {
                b = $(h).parent().parent().attr("id").split("_")[2]
            }
            var r = -1;
            var m = 0;
            var v = [];
            if (newpassangerTicketList && (r = newpassangerTicketList.length) > 0) {
                chooseTickets = [];
                var E = $("#ps_body tr[chooseest]");
                if (E) {
                    for (var A = 0, z = E.length; A < z; A++) {
                        var G = E.eq(A).attr("chooseest");
                        if (G) {
                            var F = G.split(",");
                            if (F && F.length > 0) {
                                for (var x = 0; x < F.length; x++) {
                                    if (("wl_tr_" + b) == E.eq(A).attr("id")) {
                                        a[F[x]] = true
                                    }
                                    if (F[x] != "") {
                                        chooseTickets[F[x]] = true
                                    }
                                }
                            }
                        }
                    }
                }
                var i = 0;
                var w = [];
                for (var x = 0; x < r; x++) {
                    var t = newpassangerTicketList[x];
                    for (var y in expressOrders) {
                        if (y && (typeof y != "undefined")) {
                            if (y == $("#wl_tr_" + b).attr("trackingno")) {
                                continue
                            }
                            var s = expressOrders[y];
                            if (s && (typeof s.ticket_message != "undefined")) {
                                var D = s.ticket_message.split("#");
                                for (var j = 0; j < D.length - 1; j++) {
                                    var o = D[j].split("+");
                                    var u = t.passengerDTO;
                                    if (t.sequence_no == o[0] && t.batch_no == o[1] && t.coach_no == o[2] && t.seat_no == o[3] && u.passenger_id_type_code == o[4] && u.passenger_id_no == o[5] && u.passenger_name == o[6]) {
                                        chooseTickets[x] = true
                                    }
                                }
                            }
                        } else {
                            continue
                        }
                    }
                    var f = t.batch_no + t.coach_no + t.seat_no + t.stationTrainDTO.from_station_telecode + t.stationTrainDTO.to_station_telecode;
                    if (canchooseTicket && !canchooseTicket[f]) {
                        v.push(t);
                        continue
                    }
                    if (t.ticket_type_code == "3") {
                        v.push(t);
                        continue
                    }
                    m++;
                    var e = "";
                    var g = " onclick=\"$.clickTicket('" + x + "');\" ";
                    if (a[x]) {
                        e += " selected "
                    } else {
                        if (chooseTickets[x]) {
                            e += " no-sel ";
                            g = ""
                        }
                    }
                    if (m % 3 == 0) {
                        e += " mr0 "
                    }
                    if (e.length > 0) {
                        e = ' class="' + e + '" '
                    }
                    var d = t.passengerDTO.passenger_id_no;
                    if (t.passengerDTO.passenger_id_type_code == "1") {
                        d = d.substr(0, 6) + "***" + d.substr(14)
                    }
                    var c = "";
                    if (t.ticket_type_code == "2") {
                        c = "(孩票)"
                    }
                    var n = t.passengerDTO.passenger_name;
                    if (n.length > 3) {
                        n = n.substr(0, 3) + "…"
                    }
                    var C = t.stationTrainDTO.from_station_name;
                    if (C.length > 4) {
                        C = C.substr(0, 4) + "…"
                    }
                    var l = t.stationTrainDTO.to_station_name;
                    if (l.length > 4) {
                        l = l.substr(0, 4) + "…"
                    }
                    var q = ' title="' + t.passengerDTO.passenger_name + c + " (" + t.passengerDTO.passenger_id_no + ')" ';
                    w[i++] = "<li " + q + g + '  index="' + x + '" ' + e + ' ><div class="sel-ticket-in"><div class="passenger"><strong>';
                    w[i++] = n + "</strong>" + d + "</div>";
                    w[i++] = '<div class="sel-ticket-sta"><span class="cz">' + C + "</span>";
                    w[i++] = "<strong>" + t.stationTrainDTO.station_train_code + '</strong><span class="dz">' + l + "</span></div>";
                    if (t.ticket_type_code == "2") {
                        w[i++] = '<i class="child" title="儿童票">儿童票</i>'
                    }
                    w[i++] = '</div><div class="arrow-mark"></div></li>'
                }
                for (var x = 0, B = v.length; x < B; x++) {
                    m++;
                    var e = "";
                    if (m % 3 == 0) {
                        e += " mr0 "
                    }
                    e += " no-sel ";
                    if (e.length > 0) {
                        e = ' class="' + e + '" '
                    }
                    var t = v[x];
                    var d = t.passengerDTO.passenger_id_no;
                    if (t.passengerDTO.passenger_id_type_code == "1") {
                        d = d.substr(0, 6) + "***" + d.substr(14)
                    }
                    var c = "";
                    if (t.ticket_type_code == "2") {
                        c = "(孩票)"
                    }
                    var n = t.passengerDTO.passenger_name;
                    if (n.length > 3) {
                        n = n.substr(0, 3) + "…"
                    }
                    var C = t.stationTrainDTO.from_station_name;
                    if (C.length > 4) {
                        C = C.substr(0, 4) + "…"
                    }
                    var l = t.stationTrainDTO.to_station_name;
                    if (l.length > 4) {
                        l = l.substr(0, 4) + "…"
                    }
                    var q = ' title="' + t.passengerDTO.passenger_name + c + " (" + t.passengerDTO.passenger_id_no + ')(不满足配送)" ';
                    w[i++] = "<li " + q + "  " + e + ' ><div class="sel-ticket-in"><div class="passenger"><strong>';
                    w[i++] = n + "</strong>" + d + "</div>";
                    w[i++] = '<div class="sel-ticket-sta"><span class="cz">' + C + "</span>";
                    w[i++] = "<strong>" + t.stationTrainDTO.station_train_code + '</strong><span class="dz">' + l + "</span></div>";
                    if (t.ticket_type_code == "2") {
                        w[i++] = '<i class="child" title="儿童票">儿童票</i>'
                    }
                    w[i++] = '</div><div class="arrow-mark"></div></li>'
                }
                $("#sel_ticket_ul").html(w.join(""))
            }
            dhtmlx.createWin({
                winId: "renderTicket_div",
                closeWinId: ["renderTicket_close_id", "renderTicket_cancel_id"],
                okId: "renderTicket_conf_id",
                okCallBack: function () {
                    var Q = "";
                    var U = 0;
                    var V = [];
                    var J = $("#addTicket_" + b);
                    var P = J.find(">span:last");
                    var T = $("#wl_tr_" + b).attr("chooseest");
                    var H = false;
                    var M = 0;
                    for (var K = 0; K < r; K++) {
                        if (a[K]) {
                            H = true;
                            a[K] = false;
                            chooseTickets[K] = true;
                            M++;
                            Q += K + ",";
                            var S = newpassangerTicketList[K];
                            var L = S.passengerDTO.passenger_id_no;
                            if (S.passengerDTO.passenger_id_type_code == "1") {
                                L = L.substr(0, 6) + "***" + L.substr(14)
                            }
                            var p = "";
                            if (S.ticket_type_code == "2") {
                                p = "(孩票)"
                            }
                            var R = S.passengerDTO.passenger_name;
                            if (R.length > 3) {
                                R = R.substr(0, 3) + "…"
                            }
                            var O = ' title="' + S.passengerDTO.passenger_name + " (" + S.passengerDTO.passenger_id_no + ')" ';
                            V[U++] = "<span " + O + ' class="seled seled-tic">' + R + p + " (" + L + ")";
                            V[U++] = " <strong>" + S.stationTrainDTO.station_train_code + "</strong>";
                            V[U++] = "(" + S.stationTrainDTO.from_station_name + "--" + S.stationTrainDTO.to_station_name;
                            V[U++] = ')<a href="javascript:void(0);" onclick="$.delTicket(\'' + K + "','" + b + '\',this)" class="i-del" title="删除">删除</a></span><br/>'
                        } else {
                            if (T) {
                                var I = T.split(",");
                                if (I && I.length > 0) {
                                    for (var N = 0; N < I.length; N++) {
                                        if (K == I[N]) {
                                            chooseTickets[K] = false
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (M > 5) {
                        $.alertError("一个配送地址最多只可选择5张车票");
                        return false
                    } else {
                        J.empty();
                        J.append(V.join(""));
                        J.append(P);
                        $("#wl_tr_" + b).attr("chooseest", Q)
                    }
                    checkeCanPay()
                },
                callback: function () {
                    for (var p = 0; p < r; p++) {
                        a[p] = false
                    }
                }
            });
            $("#renderTicket_div").css("top", "100px")
        }, clickTicket: function (c) {
            var e = c;
            var g = [];
            var j = newpassangerTicketList[e].passengerDTO;
            var k = newpassangerTicketList[e].stationTrainDTO.from_station_telecode;
            for (var d = 0, n = newpassangerTicketList.length; d < n; d++) {
                var f = newpassangerTicketList[d];
                var b = f.passengerDTO;
                if (k == f.stationTrainDTO.from_station_telecode && j.passenger_id_type_code == b.passenger_id_type_code && j.passenger_id_no == b.passenger_id_no && j.passenger_name == b.passenger_name) {
                    g.push(d)
                }
            }
            for (var d = 0, m = g.length; d < m; d++) {
                var h = $("#sel_ticket_ul li[index='" + g[d] + "']");
                if (a[g[d]]) {
                    h.removeClass("selected");
                    a[g[d]] = false
                } else {
                    h.addClass("selected");
                    a[g[d]] = true
                }
            }
            var l = 0;
            for (var d = 0, m = a.length; d < m; d++) {
                if (a[d]) {
                    l++
                }
            }
            if (l > 5) {
                $.alertError("一个配送地址最多只可选择5张车票")
            }
        }, delTicket: function (l, b, n) {
            var t = $("#wl_tr_" + b).attr("chooseest");
            var z = "";
            if (t && t.indexOf(",") > 0) {
                var A = t.split(",");
                if (A && A.length > 0) {
                    var d = [];
                    var m = newpassangerTicketList[l].passengerDTO;
                    var w = newpassangerTicketList[l].stationTrainDTO.from_station_telecode;
                    for (var y = 0, o = newpassangerTicketList.length; y < o; y++) {
                        var e = newpassangerTicketList[y];
                        var q = e.passengerDTO;
                        if (w == e.stationTrainDTO.from_station_telecode && m.passenger_id_type_code == q.passenger_id_type_code && m.passenger_id_no == q.passenger_id_no && m.passenger_name == q.passenger_name) {
                            d.push(y)
                        }
                    }
                    var c = [];
                    var u = [];
                    for (var x = 0; x < A.length; x++) {
                        if (A[x] != "") {
                            var s = true;
                            for (var v = 0, h = d.length; v < h; v++) {
                                if (d[v] == A[x]) {
                                    u.push(x);
                                    chooseTickets[d[v]] = false;
                                    s = false;
                                    break
                                }
                            }
                            if (s) {
                                c.push(A[x])
                            }
                        }
                    }
                    for (var x = 0; x < c.length; x++) {
                        z += c[x] + ","
                    }
                    if (z.length > 0) {
                        $("#wl_tr_" + b).attr("chooseest", z)
                    } else {
                        $("#wl_tr_" + b).removeAttr("chooseest")
                    }
                }
            } else {
                $("#wl_tr_" + b).removeAttr("chooseest")
            }
            var g = $("#addTicket_" + b + " span[title]");
            for (var v = 0, h = u.length; v < h; v++) {
                var r = g.eq(u[v]);
                var f = r.next("br");
                if (f[0]) {
                    f.remove()
                }
                r.remove()
            }
            checkeCanPay()
        }, addPSXX: function (f) {
            var h = $("#ps_body tr");
            var b = $.getMaxTicketNum();
            if (b <= 0) {
                $.alertError("已没有符合配送条件的车票，不可再添加");
                return
            }
            var e = [];
            var g = 0;
            var i = h.length - 1;
            e[g++] = '<tr id="wl_tr_' + i + '"><td>第' + i + "件</td>";
            e[g++] = '<td id="addTicket_' + i + '"><span class="sel-sp sel-add" onclick="$.renderTicket(this)">请点击选择需要快递的车票</span></td>';
            e[g++] = '<td id="addAddress_' + i + '"><span class="sel-sp sel-add" onclick="$.checkHasLoad(this,false,false,false)">选择收件地址</span></td>';
            e[g++] = '<td id="price_' + i + '"></td>';
            e[g++] = '<td id="rule_' + i + '" style="text-align:left;padding-left:5px;"></td>';
            e[g++] = '<td id="operate_' + i + '"><div><a href="javascript:void(0);" onclick="$.preCancel(this)" class="btn72" style="width:55px;">取消</a></div>';
            e[g++] = '<div><a href="javascript:void(0);" onclick="$.saveInfo(this,true)" class="btn72" style="width:55px;margin-top: 10px;">保存</a></div></td></tr>';
            $("#ps_body tr:eq(" + (i - 1) + ")").after(e.join(""));
            if (f) {
                return
            }
            var h = $("#ps_body tr");
            var j = 0;
            if (h && (j = h.length) > 0) {
                for (var c = 1; c < j - 1; c++) {
                    var d = h.eq(c).attr("chooseest");
                    if (!(d && d.indexOf(",") > 0)) {
                        b++
                    }
                }
            }
            b = b - 1;
            if (b <= 5) {
                $.renderDefaultTickets(i)
            }
            $.renderDefaultAddress(i)
        }, getMaxTicketNum: function () {
            var e = -1;
            if (newpassangerTicketList && (e = newpassangerTicketList.length) > 0) {
                var d = 0;
                for (var c = 0; c < e; c++) {
                    var h = newpassangerTicketList[c];
                    var f = h.batch_no + h.coach_no + h.seat_no + h.stationTrainDTO.from_station_telecode + h.stationTrainDTO.to_station_telecode;
                    if (h.ticket_type_code != "3" && canchooseTicket[f]) {
                        d++
                    }
                }
            }
            var b = $("#ps_body tr");
            if (b && (e = b.length) > 0) {
                for (var c = 1; c < e - 1; c++) {
                    var g = b.eq(c).attr("chooseest");
                    if (g && g.indexOf(",") > 0) {
                        d = d - (g.split(",").length - 1)
                    } else {
                        d--
                    }
                }
            }
            return d
        }, bindRadioClick: function () {
            $("#qpfs_zq").click(function () {
                if (zq_sp_click == "0") {
                    $("#_agree_id").removeAttr("disabled");
                    $("#_agree_id").attr("checked", false);
                    $("#contract_agree_id").hide();
                    return
                }
                if ($(this).is(":checked")) {
                    var b = $("#ps_body tr[trackingno]");
                    if (b.length > 0) {
                        $.alertError("您存在未支付的配送信息，请先取消");
                        $("#qpfs_zq")[0]["checked"] = false;
                        $("#qpfs_sp")[0]["checked"] = "checked";
                        return
                    }
                    $("#_agree_id").removeAttr("disabled");
                    $("#_agree_id").attr("checked", false);
                    $("#contract_agree_id").hide();
                    zq_sp_click = "0";
                    $("#payButton").removeClass("btn92").addClass("btn92s").removeAttr("title");
                    if (!$("#insurance_buy_and_agree").is(":checked") && $("#integrationPayButton")[0]) {
                        $("#integrationPayButton").show()
                    }
                    $("#total_wl_price").parent().hide();
                    if ($("#total_ins_price").is(":visible") == false) {
                        $("#total_all_price").parent().hide()
                    }
                    $("#detail_logistics").hide();
                    $("#deliver_msg").hide();
                    $("#scroll").show();
                    $("#dcfc_wxts_2").hide();
                    $("#dcfc_wxts_1").show()
                }
            });
            $("#qpfs_sp").click(function () {
                if (zq_sp_click == "1") {
                    return
                }
                if ($(this).is(":checked")) {
                    if ($("#_agree_id").is(":checked")) {
                        $("#_agree_id").attr("disabled", true);
                        $("#contract_agree_id").show();
                        $.showExpress($(this))
                    } else {
                        $("#contract_agree_id").show()
                    }
                }
            });
            $("#_agree_id").click(function () {
                if ($(this).is(":checked")) {
                    $("#qpfs_sp").prop("checked", true);
                    $(this).attr("disabled", true);
                    $.showExpress($("#qpfs_sp"))
                }
            })
        }, showExpress: function (b) {
            if (canExpress) {
                if (addressAttr.length == 0) {
                    $.ajax({
                        type: "get", isTakeParam: false, async: false, beforeSend: function (c) {
                            c.setRequestHeader("If-Modified-Since", "0");
                            c.setRequestHeader("Cache-Control", "no-cache")
                        }, url: ctx + "logistics/address", timeout: 50000, error: function (c, e, d) {
                            dhtmlx.modalbox.hide(modalbox)
                        }, success: function (c) {
                            if (c.status) {
                                var d = c.data;
                                if (d && d.length > 0) {
                                    addressAttr = d
                                }
                                $("#detail_logistics").show();
                                $("#total_wl_price").parent().show();
                                $("#total_all_price").parent().show();
                                if ($("#integrationPayButton")[0]) {
                                    $("#integrationPayButton").hide()
                                }
                                $("#deliver_msg").show();
                                $("#scroll").hide();
                                $("#dcfc_wxts_1").hide();
                                $("#dcfc_wxts_2").show();
                                zq_sp_click = "1"
                            }
                        }
                    })
                } else {
                    zq_sp_click = "1";
                    $("#detail_logistics").show();
                    $("#total_wl_price").parent().show();
                    $("#total_all_price").parent().show();
                    if ($("#integrationPayButton")[0]) {
                        $("#integrationPayButton").hide()
                    }
                    $("#deliver_msg").show();
                    $("#scroll").hide();
                    $("#dcfc_wxts_1").hide();
                    $("#dcfc_wxts_2").show()
                }
            } else {
                canExpressStr = (canExpressStr.length > 0) ? canExpressStr : "对不起，您没有符合可配送的车票";
                $.alertError(canExpressStr);
                $("#qpfs_sp").attr("checked", false);
                $("#qpfs_zq")[0]["checked"] = "checked";
                zq_sp_click = "0";
                $("#dcfc_wxts_2").hide();
                $("#dcfc_wxts_1").show();
                $("#_agree_id").removeAttr("disabled");
                $("#_agree_id").attr("checked", false);
                $("#contract_agree_id").hide()
            }
            $.renderExpress()
        }, renderExpress: function () {
            var g = $("#ps_body tr[id^=wl_tr_]");
            var j = g.length;
            var c = false;
            for (var d = 0; d < j; d++) {
                if (g.eq(d).attr("trackingno")) {
                    c = true;
                    break
                }
            }
            if (!c) {
                if (j > 1) {
                    for (var d = 1; d < j; d++) {
                        g.eq(d).remove()
                    }
                }
                chooseAddress = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
                chooseTickets = [false, false, false, false, false, false, false, false, false, false];
                $("#wl_tr_1").removeAttr("chooseest");
                $("#addTicket_1").html('<span class="sel-sp sel-add" onclick="$.renderTicket(this)">请点击选择需要快递的车票</span>');
                var f = 0;
                for (var b = 0; b < size; b++) {
                    var h = newpassangerTicketList[b];
                    var e = h.batch_no + h.coach_no + h.seat_no + h.stationTrainDTO.from_station_telecode + h.stationTrainDTO.to_station_telecode;
                    if (h.passengerDTO.passenger_id_type_code == "1" && (h.ticket_type_code == "1" || h.ticket_type_code == "2") && canchooseTicket[e]) {
                        f++
                    }
                }
                if (f <= 5) {
                    $.renderDefaultTickets("1")
                }
                $.renderDefaultAddress("1")
            }
            checkeCanPay()
        }, showCntract: function (b) {
            if (b == "b") {
                dhtmlx.createWin({winId: "cntract_div_b", closeWinId: ["cntract_div_cancel_b", "cntract_div_close_b"]});
                $("#cntract_div_b").css("top", "100px")
            } else {
                dhtmlx.createWin({winId: "cntract_div", closeWinId: ["cntract_div_cancel", "cntract_div_close"]});
                $("#cntract_div").css("top", "100px")
            }
        }, alertError: function (b) {
            alertFlag = true;
            dhtmlx.alert({
                title: "错误提示", ok: "确认", text: b, type: "alert-error", callback: function () {
                }
            });
            $("#defaultwarningAlert_id").css("top", "280px")
        }, yyyy_MM_dd2Date: function (b) {
            var f = b.split("-");
            var e = f[1];
            var d = f[2];
            var c = f[0];
            return Date.parse(e + "/" + d + "/" + c)
        }, yyyyMMdd2Date: function (b) {
            var e = b.substr(4, 2);
            var d = b.substr(6, 2);
            var c = b.substr(0, 4);
            return Date.parse(e + "/" + d + "/" + c)
        }, getWeek: function (b) {
            b = new Date(b);
            var c = "周一";
            if (b.getDay() == 0) {
                c = "周日"
            }
            if (b.getDay() == 1) {
                c = "周一"
            }
            if (b.getDay() == 2) {
                c = "周二"
            }
            if (b.getDay() == 3) {
                c = "周三"
            }
            if (b.getDay() == 4) {
                c = "周四"
            }
            if (b.getDay() == 5) {
                c = "周五"
            }
            if (b.getDay() == 6) {
                c = "周六"
            }
            return c
        }
    })
})();
String.prototype.toDate = function () {
    style = "yyyy-MM-dd hh:mm";
    var d = {"y+": "y", "M+": "M", "d+": "d", "h+": "h", "m+": "m"};
    var a = {y: "", M: "", d: "", h: "00", m: "00"};
    var c = style;
    for (var b in d) {
        if (new RegExp("(" + b + ")").test(style)) {
            a[d[b]] = this.substring(c.indexOf(RegExp.$1), c.indexOf(RegExp.$1) + RegExp.$1.length)
        }
    }
    return new Date(a.y, a.M - 1, a.d, a.h, a.m)
};
var chooseAddress = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
(function () {
    var tempAttr = false;
    var disAll = false;
    var sfAttr = [];
    var _now_tr = 0;
    var nowPage = 0;
    var pageSize = 8;
    $(document).ready(function () {
        if (tour_flag == "dc" || tour_flag == "fc") {
            $.bindSF_QS_XC();
            $.bind_addadress_event()
        }
        $("#edit_place input[type='text']").css("color", "#333");
        $("#edit_place label[for='default_address']").css("color", "#333");
        initAddressNotice()
    });
    function initAddressNotice() {
        $("#name_rule").mouseenter(function (ev) {
            var Top = getTop(this) + 11;
            var Left = 590 - 320 - 10;
            $("#address_tips").css({top: Top, left: Left});
            $("#address_tips").show()
        });
        $("#name_rule").mouseleave(function () {
            $("#address_tips").hide()
        })
    }

    function getTop(e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) {
            offset += getTop(e.offsetParent)
        }
        return offset
    }

    jQuery.extend({
        page: function (flag) {
            var size = addressAttr.length;
            if (flag == "a") {
                if ((nowPage + 1) * pageSize >= size) {
                    return
                }
                $("#a_show_b").css("color", "#0077FF");
                nowPage++;
                if ((nowPage + 1) * pageSize >= size) {
                    $("#a_show_a").css("color", "#999")
                }
            } else {
                if (nowPage == 0) {
                    return
                }
                nowPage--;
                if (nowPage == 0) {
                    $("#a_show_b").css("color", "#999")
                }
                if (size != pageSize && nowPage < (parseInt(size / pageSize))) {
                    $("#a_show_a").css("color", "#0077FF")
                }
            }
            $.renderAddressDatas()
        }, renderAddressDatas: function () {
            var size = addressAttr.length;
            var index = 0;
            var htmlArr = [];
            tempAttr = $("#wl_tr_" + _now_tr).attr("chooseesa");
            var addSize = 0;
            var oda = 0;
            if (size > 0) {
                if (size == 20) {
                    pageSize = 9
                }
                var tempSize = (nowPage + 1) * pageSize < size ? (nowPage + 1) * pageSize : size;
                for (var k = nowPage * pageSize; k < tempSize; k++) {
                    var obj = addressAttr[k];
                    if (obj.original_default_address == "9") {
                        oda++;
                        continue
                    }
                    addSize++;
                    var liClass = "";
                    var clickStr = " onclick=\"$.clickAddress('" + k + "');\" ";
                    if (disAll) {
                        liClass += " no-sel ";
                        clickStr = ""
                    } else {
                        if (tempAttr && tempAttr == k) {
                            liClass += " selected "
                        } else {
                            if (chooseAddress[k]) {
                                var _c_addresses = $("#ps_body tr[chooseesa='" + k + "']");
                                var f_flag = false;
                                if (_c_addresses) {
                                    for (var j = 0, nowSize = _c_addresses.length; j < nowSize; j++) {
                                        var c_tr = _c_addresses.eq(j);
                                        var c_t_size = c_tr.find("td:eq(1) span[title]").length;
                                        if (c_t_size < 5) {
                                            f_flag = false;
                                            break
                                        } else {
                                            f_flag = true
                                        }
                                    }
                                }
                                if (!f_flag) {
                                    liClass += " no-sel ";
                                    clickStr = ""
                                }
                            } else {
                                if (savedExpress) {
                                    var a_obj = obj;
                                    for (var _se_i = 0; _se_i < savedExpress.length; _se_i++) {
                                        var expressOrder = savedExpress[_se_i];
                                        if (!expressOrder.tracking_no || expressOrder.tracking_no == $("#wl_tr_" + _now_tr).attr("trackingno")) {
                                            continue
                                        }
                                        var ticketStrs = expressOrder.ticket_message.split("#");
                                        if (a_obj.addressee_name == expressOrder.addressee_name && a_obj.mobile_no == expressOrder.mobile_no && a_obj.addressee_province == expressOrder.addressee_province && a_obj.addressee_city == expressOrder.addressee_city && a_obj.addressee_county == expressOrder.addressee_county && a_obj.addressee_town == expressOrder.addressee_town && a_obj.detail_address == expressOrder.detail_address) {
                                            if (ticketStrs && ticketStrs.length < 6) {
                                                liClass += " no-sel ";
                                                clickStr = "";
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if ((k + 1) % 3 == 0) {
                        liClass += " mr0 "
                    }
                    if (liClass.length > 0) {
                        liClass = ' class="' + liClass + '" '
                    }
                    var _city = obj.addressee_city;
                    if (_city != obj.addressee_province) {
                        _city = obj.addressee_province + _city
                    }
                    var showCity = _city + obj.addressee_county + (obj.addressee_town ? obj.addressee_town : "") + (obj.addressee_street ? obj.addressee_street : "");
                    var _title = obj.addressee_name + "（收）(" + obj.mobile_no + ")" + showCity + obj.detail_address;
                    htmlArr[index++] = ' <li title="' + _title + '"' + liClass + clickStr + '><div class="sel-place-in">';
                    var showName = obj.addressee_name;
                    if (showName.length > 3) {
                        showName = showName.substr(0, 3) + "…"
                    }
                    htmlArr[index++] = "<p><strong>" + showName + "（收）</strong>" + obj.mobile_no + "</p>";
                    htmlArr[index++] = '<p class="place">' + showCity + "</p>";
                    htmlArr[index++] = "<p>" + obj.detail_address + "</p>";
                    htmlArr[index++] = '</div><div class="arrow-mark"></div></li>'
                }
            }
            if (size < 20) {
                var c_mr = "";
                if ((addSize + 1) % 3 == 0) {
                    c_mr = "mr0 "
                }
                htmlArr[index++] = '<li class="' + c_mr + ' add-place"><a href="javascript:void(0);" onclick="$.toShowAddAress();">添加配送地址</a></li>'
            }
            $("#ul_address").html(htmlArr.join(""))
        }, renderAddress: function (witchT) {
            disAll = false;
            nowPage = 0;
            _now_tr = witchT;
            $("#close_add_a").attr("index", _now_tr);
            var size = addressAttr.length;
            if (size == 20) {
                pageSize = 9
            }
            $("#a_show_b").css("color", "#999");
            $("#a_show_a").css("color", "#0077FF");
            if (size <= pageSize) {
                $("#a_show_a").css("color", "#999")
            }
            if ($("#wl_tr_" + _now_tr).attr("chooseesa") && (Number($("#wl_tr_" + _now_tr).attr("chooseesa")) + 1) > pageSize) {
                var n_size = Number($("#wl_tr_" + _now_tr).attr("chooseesa")) + 1;
                nowPage = parseInt(n_size / pageSize);
                $("#a_show_b").css("color", "#0077FF");
                if (nowPage == parseInt(size / pageSize)) {
                    $("#a_show_a").css("color", "#999")
                } else {
                    $("#a_show_a").css("color", "#0077FF")
                }
            }
            $.renderAddressDatas();
            dhtmlx.createWin({
                winId: "renderAddress_div",
                closeWinId: ["renderAddress_close_id"],
                okId: "renderAddress_conf_id",
                okCallBack: function () {
                    if ($("#renderAddress_conf_id").html() == "确定") {
                        if (!tempAttr) {
                            $("#a_show_mor").attr("showmor", "0").html("显示全部");
                            return
                        }
                        $.renderOnePrice(witchT, tempAttr)
                    } else {
                        $.ajax({
                            url: ctx + "logistics/addAddress",
                            type: "post",
                            data: {
                                addressee_province: $("#select_sf").val(),
                                addressee_city: $("#select_sq").val(),
                                addressee_county: $("#select_xc").val(),
                                addressee_town: $("#select_town").val(),
                                addressee_street: $("#select_area").val(),
                                detail_address: $("#detail_address").val(),
                                addressee_name: $("#user_name").val(),
                                mobile_no: $("#user_tel").val(),
                                default_address: $("#default_address").is(":checked") ? "0" : "1"
                            },
                            success: function (response) {
                                if (response.status) {
                                    if (response.data.flag) {
                                        addressAttr.unshift(response.data.data);
                                        if (response.data.data["tracking_no"] && (typeof response.data.data["tracking_no"] != "undefined")) {
                                            expressOrders[response.data.data["tracking_no"]] = response.data.data
                                        }
                                        chooseAddress.unshift(true);
                                        tempAttr = 0;
                                        var h_a_trs = $("#ps_body tr[chooseesa]");
                                        for (var k = 0; k < h_a_trs.length; k++) {
                                            h_a_trs.eq(k).attr("chooseesa", (Number(h_a_trs.eq(k).attr("chooseesa")) + 1))
                                        }
                                        $.renderOnePrice(witchT, 0)
                                    } else {
                                        $.alertError(response.data.message)
                                    }
                                }
                            }
                        })
                    }
                },
                callback: function () {
                    tempAttr = false;
                    $("#renderAddress_conf_id").html("确定")
                },
                checkConfirm: function () {
                    if ($("#renderAddress_conf_id").html() == "确定") {
                        return true
                    } else {
                        return $.check_before_add()
                    }
                }
            });
            $("#renderAddress_div").css("top", "100px")
        }, renderOnePrice: function (witchT, nowWitch) {
            var size = addressAttr.length;
            var modalbox = dhtmlx.modalbox({
                targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
                callback: function () {
                }
            });
            var postData = new Object();
            postData.addressStr = JSON.stringify(addressAttr[nowWitch]);
            $.ajax({
                type: "POST",
                isTakeParam: false,
                beforeSend: function (request) {
                    request.setRequestHeader("If-Modified-Since", "0");
                    request.setRequestHeader("Cache-Control", "no-cache")
                },
                data: postData,
                url: ctx + "logistics/fee",
                timeout: 10000,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    dhtmlx.modalbox.hide(modalbox);
                    return false
                },
                success: function (response) {
                    dhtmlx.modalbox.hide(modalbox);
                    if (response.status && response.data.flag) {
                        var price = response.data.dfree;
                        $("#wl_tr_" + witchT).attr("chooseesp", price);
                        var p_str = price / 100;
                        if (("" + p_str).indexOf(".") < 0) {
                            p_str = p_str + ".0"
                        }
                        var company = response.data.dcompany;
                        if (!company) {
                            company = ""
                        }
                        $("#price_" + witchT).html(company + '<div class="colorA">￥' + p_str + "元</div>");
                        $.renderAllPrice();
                        var _rulehtml = "";
                        if (company == "京铁物流" || company == "1000000001") {
                            _rulehtml = "1、开车时间为第三日0:00-12:00间的车票，于第二日20:00以前送达；<br/>2、开车时间为第三日12:01-24:00间的车票，于开车前5小时送达；<br/>3、开车时间为第四日0:00-12:00之间开车的车票，于第三日20:00前送达；<br/>4、其他车票，自购票日三日内送达；"
                        } else {
                            _rulehtml = "订单日期的次日送达<br/>"
                        }
                        $("#rule_" + witchT).html(_rulehtml);
                        var choosees = "";
                        var tdObj = $("#addAddress_" + witchT);
                        tdObj.empty();
                        if ($("#wl_tr_" + witchT).attr("chooseesa")) {
                            chooseAddress[$("#wl_tr_" + witchT).attr("chooseesa")] = false
                        }
                        size = addressAttr.length;
                        for (var k = 0; k < size; k++) {
                            if (nowWitch == k) {
                                chooseAddress[k] = true;
                                choosees = nowWitch;
                                tdObj.append($.renderCheckedAddress(addressAttr[k], witchT));
                                tdObj.attr("valign", "middle");
                                break
                            }
                        }
                        $("#wl_tr_" + witchT).attr("chooseesa", choosees);
                        $("#renderAddress_conf_id").html("确定");
                        checkeCanPay();
                        return true
                    } else {
                        $.alertError(response.data.message);
                        return false
                    }
                }
            })
        }, renderAllPrice: function () {
            var trs = $("#ps_body tr[chooseesp]");
            var size = -1;
            if (trs && (size = trs.length) >= 0) {
                var totalNum = 0;
                var total_a_Num = 0;
                for (var k = 0; k < size; k++) {
                    totalNum += Number(trs.eq(k).attr("chooseesp"));
                    if (trs.eq(k).attr("trackingno")) {
                        total_a_Num += Number(trs.eq(k).attr("chooseesp"))
                    }
                }
                var t_order = eval("(" + parOrderDTOJson + ")");
                var sum_p = total_a_Num + Number(t_order.ticket_price_all);
                var insu_fee = $("#total_ins_price").html();
                var num_insu_fee = 0;
                if (insu_fee) {
                    insu_fee = insu_fee.substring(0, insu_fee.length - 1);
                    num_insu_fee = (new Number(insu_fee)) * 100;
                    sum_p = sum_p + num_insu_fee
                }
                sum_p = sum_p / 100;
                if (total_a_Num > 0) {
                    total_a_Num = total_a_Num / 100;
                    if (("" + total_a_Num).indexOf(".") < 0) {
                        total_a_Num = total_a_Num + ".0"
                    }
                    $("#total_wl_price").html(total_a_Num + "元")
                } else {
                    $("#total_wl_price").html("-")
                }
                if (totalNum > 0) {
                    totalNum = totalNum / 100;
                    if (("" + totalNum).indexOf(".") < 0) {
                        totalNum = totalNum + ".0"
                    }
                    $("#total_kdf").html(totalNum + "元")
                } else {
                    $("#total_kdf").html("-")
                }
                if (("" + sum_p).indexOf(".") < 0) {
                    sum_p = sum_p + ".0"
                }
                $("#total_all_price").html(sum_p + "元")
            }
        }, renderCheckedAddress: function (a_obj, witchT) {
            var s_index = 0;
            var spanHtml = [];
            var _city = a_obj.addressee_city;
            if (_city != a_obj.addressee_province) {
                _city = a_obj.addressee_province + _city
            }
            var showCity = _city + a_obj.addressee_county + (a_obj.addressee_town ? a_obj.addressee_town : "") + (a_obj.addressee_street ? a_obj.addressee_street : "");
            var _title = a_obj.addressee_name + "（收）(" + a_obj.mobile_no + ")" + showCity + a_obj.detail_address;
            var showName = a_obj.addressee_name;
            if (showName.length > 5) {
                showName = showName.substr(0, 5) + "…"
            }
            spanHtml[s_index++] = '<div class="seled-piace td-pos-rel" title="' + _title + '">';
            spanHtml[s_index++] = "<p><span>" + showName + "（收）</span>" + a_obj.mobile_no + "</p>";
            if (showCity.length > 12) {
                showCity = showCity.substr(0, 12) + "…"
            }
            spanHtml[s_index++] = "<p>" + showCity + "</p>";
            var show_detail_a = a_obj.detail_address;
            if (show_detail_a.length > 12) {
                show_detail_a = show_detail_a.substr(0, 12) + "…"
            }
            spanHtml[s_index++] = "<p>" + show_detail_a + "</p>";
            spanHtml[s_index++] = '<a href="javascript:void(0);" onclick="$.checkHasLoad(this,false,false,true)" class="edit" title="修改"></a></div>';
            return spanHtml.join("")
        }, checkHasLoad: function ($this, disAll, r_flag, initFlag) {
            var witchT = -1;
            if ($this == "reload") {
                witchT = _now_tr
            } else {
                if (typeof($this) == "string") {
                    witchT = $this
                } else {
                    if ($($this).attr("href")) {
                        witchT = $($this).parent().parent().parent().attr("id").split("_")[2]
                    } else {
                        witchT = $($this).parent().parent().attr("id").split("_")[2]
                    }
                }
            }
            $("#edit_place").hide();
            if (r_flag || (!r_flag && addressAttr.length == 0)) {
                var modalbox = dhtmlx.modalbox({
                    targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
                    callback: function () {
                    }
                });
                $.ajax({
                    type: "get",
                    isTakeParam: false,
                    beforeSend: function (request) {
                        request.setRequestHeader("If-Modified-Since", "0");
                        request.setRequestHeader("Cache-Control", "no-cache")
                    },
                    url: ctx + "logistics/address",
                    timeout: 10000,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        dhtmlx.modalbox.hide(modalbox);
                        $.renderAddress(witchT, disAll, "1" == $("#a_show_mor").attr("showmor"), initFlag)
                    },
                    success: function (response) {
                        dhtmlx.modalbox.hide(modalbox);
                        if (response.status) {
                            var data = response.data;
                            if (data && data.length > 0) {
                                if (data.length == 1 && data[0].default_address == "9") {
                                    addressAttr = []
                                } else {
                                    addressAttr = data
                                }
                            }
                        }
                        $.renderAddress(witchT, disAll, "1" == $("#a_show_mor").attr("showmor"), initFlag)
                    }
                })
            } else {
                $.renderAddress(witchT, disAll, "1" == $("#a_show_mor").attr("showmor"), initFlag)
            }
        }, toShowAddAress: function () {
            $("#detail_address").val("");
            $("#user_name").val("");
            $("#user_tel").val("");
            $("#user_tel_err").html("").hide();
            $("#user_name_err").html("").hide();
            $("#detail_address_err").html("").parent().hide();
            $("#select_sf_err").html("").parent().hide();
            $("#default_address")[0]["checked"] = false;
            $("#select_sq").append("<option value='' selected='selected'>请选择市</option>");
            $("#select_xc").empty();
            $("#select_xc").append("<option value='' selected='selected'>请选择区/县</option>");
            $("#select_town").empty();
            $("#select_town").append("<option value='' selected='selected'>请选择乡镇（周边地区）</option>");
            $("#select_town").attr("disabled", true);
            $("#select_town").css("color", "#999");
            $("#select_area").empty();
            $("#select_area").append("<option value='' selected='selected'>请选择附近区域</option>");
            $("#select_area").attr("disabled", true);
            $("#select_area").css("color", "#999");
            $("#detail_address").val("不需要重复填写省市区等信息");
            $("#detail_address").css("color", "#999");
            $("#detail_address").click(function () {
                var d_address_de = $("#detail_address").val();
                if (d_address_de == "不需要重复填写省市区等信息") {
                    $("#detail_address").val("");
                    $("#detail_address").css("color", "#333")
                }
            });
            if ($("#edit_place").is(":hidden")) {
                $("#default_address")[0]["checked"] = false;
                disAll = true;
                nowPage++;
                $.page("b");
                $.checkIsLoadSF();
                $("#edit_place").show();
                $("#renderAddress_conf_id").html("确认添加")
            }
            $("#renderAddress_div").css("top", "10px")
        }, clickAddress: function (witchT) {
            var liObj = $("#ul_address li").eq(witchT - nowPage * pageSize);
            if (tempAttr) {
                chooseAddress[witchT] = false
            }
            if (liObj.hasClass("selected")) {
                $("#ul_address li").removeClass("selected");
                tempAttr = false
            } else {
                $("#ul_address li").removeClass("selected");
                liObj.addClass("selected");
                tempAttr = witchT
            }
        }, checkIsLoadSF: function () {
            $("#select_sf").empty();
            if (sfAttr.length == 0) {
                $.ajax({
                    url: ctx + "address/getProvince", type: "get", success: function (response) {
                        if (response.data && response.data.data && response.data.data.length > 0) {
                            sfAttr = response.data.data
                        }
                        $("#select_sf").append("<option value='' selected='selected'>请选择省</option>");
                        $.each(sfAttr, function (n, value) {
                            $("#select_sf").append("<option value='" + value + "'>" + value + "</option>")
                        })
                    }, error: function (e) {
                    }
                })
            } else {
                $("#select_sf").append("<option value='' selected='selected'>请选择省</option>");
                $.each(sfAttr, function (n, value) {
                    $("#select_sf").append("<option value='" + value + "'>" + value + "</option>")
                })
            }
        }, bindSF_QS_XC: function () {
            $("#select_sf").on("change", function () {
                $("#select_sq").empty();
                $("#select_sq").append("<option value='' selected='selected'>请选择市</option>");
                $("#select_xc").empty();
                $("#select_xc").append("<option value='' selected='selected'>请选择区/县</option>");
                $("#select_town").empty();
                $("#select_town").append("<option value='' selected='selected'>请选择乡镇（周边地区）</option>");
                $("#select_town").attr("disabled", true);
                $("#select_town").css("color", "#999");
                $("#select_area").empty();
                $("#select_area").append("<option value='' selected='selected'>请选择附近区域</option>");
                $("#select_area").attr("disabled", true);
                $("#select_area").css("color", "#999");
                if ($(this).val() != "") {
                    $.ajax({
                        url: ctx + "address/getCity", type: "get", beforeSend: function (request) {
                            request.setRequestHeader("If-Modified-Since", "0");
                            request.setRequestHeader("Cache-Control", "no-cache")
                        }, data: {provincename: $("#select_sf").val()}, success: function (response) {
                            if (response.data && response.data.data && response.data.data.length > 0) {
                                $.each(response.data.data, function (n, value) {
                                    if (value[0] != "") {
                                        $("#select_sq").append("<option value='" + value + "'>" + value + "</option>")
                                    }
                                })
                            }
                        }
                    })
                }
            });
            $("#select_sq").on("change", function () {
                $("#select_xc").empty();
                $("#select_xc").append("<option value='' selected='selected'>请选择区/县</option>");
                $("#select_town").empty();
                $("#select_town").append("<option value='' selected='selected'>请选择乡镇（周边地区）</option>");
                $("#select_town").attr("disabled", true);
                $("#select_town").css("color", "#999");
                $("#select_area").empty();
                $("#select_area").append("<option value='' selected='selected'>请选择附近区域</option>");
                $("#select_area").attr("disabled", true);
                $("#select_area").css("color", "#999");
                if ($(this).val() != "") {
                    $.ajax({
                        url: ctx + "address/getCountry", type: "get", beforeSend: function (request) {
                            request.setRequestHeader("If-Modified-Since", "0");
                            request.setRequestHeader("Cache-Control", "no-cache")
                        }, data: {cityname: $("#select_sq").val()}, success: function (response) {
                            if (response.data && response.data.data && response.data.data.length > 0) {
                                $.each(response.data.data, function (n, value) {
                                    if (value != "") {
                                        $("#select_xc").append("<option value='" + value + "'>" + value + "</option>")
                                    }
                                })
                            }
                        }
                    })
                }
            });
            $("#select_xc").on("change", function () {
                $("#select_town").empty();
                $("#select_town").append("<option value='' selected='selected'>请选择乡镇（周边地区）</option>");
                $("#select_town").attr("disabled", true);
                $("#select_town").css("color", "#999");
                $("#select_area").empty();
                $("#select_area").append("<option value='' selected='selected'>请选择附近区域</option>");
                $("#select_area").attr("disabled", true);
                $("#select_area").css("color", "#999");
                if ($(this).val() != "") {
                    $.ajax({
                        url: ctx + "address/getTown",
                        type: "post",
                        data: {country_name: $("#select_xc").val()},
                        success: function (response) {
                            if (response.status) {
                                if (response.data.flag) {
                                    var _html = "";
                                    _html += '<option value="" selected="selected">请选择</option>';
                                    var data = response.data.data;
                                    if (data && data.length > 0) {
                                        $("#select_town").attr("disabled", false);
                                        $("#select_town").css("color", "#333");
                                        $.each(data, function (n, value) {
                                            if (value != "") {
                                                $("#select_town").append("<option value='" + value + "'>" + value + "</option>")
                                            }
                                        })
                                    }
                                    if (data && data.length == 1 && data[0] == "") {
                                        _html = "";
                                        $("#select_town").attr("disabled", true);
                                        $("#select_town").css("color", "#999")
                                    }
                                }
                            }
                        }
                    })
                }
            });
            $("#select_town").on("change", function () {
                var _html = '<option value="" selected="selected">请选择附近区域</option>';
                $("#select_area").empty();
                $("#select_area").append(_html);
                $("#select_area").attr("disabled", true);
                $("#select_area").css("color", "#999");
                if ($(this).val() != "") {
                    $.ajax({
                        url: ctx + "address/getStreet",
                        type: "post",
                        data: {town_name: $("#select_town").val()},
                        success: function (response) {
                            if (response.status) {
                                if (response.data.flag) {
                                    var data = response.data.data;
                                    if (data && data.length > 0) {
                                        $("#select_area").attr("disabled", false);
                                        $("#select_area").css("color", "#333");
                                        $.each(data, function (n, value) {
                                            if (value != "") {
                                                $("#select_area").append("<option value='" + value + "'>" + value + "</option>")
                                            }
                                        })
                                    }
                                    if (data && data.length == 1 && data[0] == "") {
                                        _html = "";
                                        $("#select_area").attr("disabled", true);
                                        $("#select_area").css("color", "#999")
                                    }
                                }
                            }
                        }
                    })
                }
            })
        }, showMore: function (obj) {
            var s_flag = $(obj).attr("showmor");
            if ("0" == s_flag) {
                $(obj).attr("showmor", "1").html("收起部分")
            } else {
                $(obj).attr("showmor", "0").html("显示全部")
            }
            $.renderAddress($("#close_add_a").attr("index"), false, "0" == s_flag, false)
        }, close_a_add: function () {
            $("#edit_place").hide();
            $("#renderAddress_conf_id").html("确定");
            disAll = false;
            nowPage++;
            $.page("b")
        }, check_before_add: function () {
            if ($("#select_sf").val() == "") {
                $("#select_sf_err").html("请选择省份").parent().show();
                return false
            }
            if ($("#select_sq").val() == "") {
                $("#select_sf_err").html("请选择市").parent().show();
                return false
            }
            if ($("#select_xc").val() == "") {
                $("#select_sf_err").html("请选择区/县").parent().show();
                return false
            }
            if ($("#select_town option").length > 1 && $("#select_town").val() == "") {
                $("#select_sf_err").html("请选择乡镇（周边地区）").parent().show();
                return false
            }
            if ($("#select_area option").length > 1 && $("#select_area").val() == "") {
                $("#select_sf_err").html("请选择附近区域").parent().show();
                return false
            }
            $("#select_sf_err").html("").parent().hide();
            if (trim($("#detail_address").val()) == "") {
                $("#detail_address_err").html("请输入详细地址").parent().show();
                return false
            } else {
                if ($("#detail_address").val().length > 100) {
                    $("#detail_address_err").html("详细地址过长，小于100字符").parent().show();
                    return false
                } else {
                    if (!$.illegalChar($("#detail_address").val())) {
                        $("#detail_address_err").html("您输入的地址中含有非法字符！").parent().show();
                        return false
                    }
                }
            }
            $("#detail_address_err").html("").parent().hide();
            if ($("#user_name").val() == "") {
                $("#user_name_err").html("请输入收件人").show();
                return false
            } else {
                if ($("#user_name").val().length > 30) {
                    $("#user_name_err").html("您输入的收件人名字太长,小于30字符").show();
                    return false
                } else {
                    if (!(/^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test($("#user_name").val()) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test($("#user_name").val()))) {
                        $("#user_name_err").html("只能包含中文或者英文").show();
                        return false
                    }
                }
            }
            $("#user_name_err").html("").hide();
            if ($("#user_tel").val() == "") {
                $("#user_tel_err").html("请输入收件人手机号码").show();
                return false
            } else {
                if (!($("#user_tel").val().length == 11 && /^[0-9]+$/.test($("#user_tel").val()))) {
                    $("#user_tel_err").html("请输入正确的收件人手机号码").show();
                    return false
                }
            }
            $("#user_tel_err").html("").hide();
            return true
        }, sf_change: function () {
            if ($("#select_sf").val() != "" && $("#select_sq").val() != "" && $("#select_xc").val() != "") {
                $("#select_sf_err").html("").parent().hide()
            }
        }, bind_addadress_event: function () {
            $("#select_sf").on("change", function () {
                $.sf_change()
            });
            $("#select_sq").on("change", function () {
                $.sf_change()
            });
            $("#select_xc").on("change", function () {
                $.sf_change()
            });
            $("#detail_address").on("change", function () {
                if (trim($("#detail_address").val()) != "" && $("#detail_address").val().length <= 100 && $.illegalChar($("#detail_address").val())) {
                    $("#detail_address_err").html("").parent().hide()
                }
            });
            $("#user_name").on("change", function () {
                if ($("#user_name").val() != "" && $("#user_name").val().length <= 30 && (/^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test($("#user_name").val()) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test($("#user_name").val()))) {
                    $("#user_name_err").html("").hide()
                }
            });
            $("#user_tel").on("change", function () {
                if ($("#user_tel").val() != "" && ($("#user_tel").val().length == 11 && /^[0-9]+$/.test($("#user_tel").val()))) {
                    $("#user_tel_err").html("").hide()
                }
            })
        }, illegalChar: function (value) {
            return /^[0-9a-zA-Z\u3400-\u9FFF\#]+$/.test(value)
        }
    })
})();
var addressAttr = [];
var tempMax;
var tempMin;
var temp_pred_date;
(function () {
    var b = 0;
    var a = false;
    $(document).ready(function () {
        tempMax = maxDate;
        tempMin = minDate;
        temp_pred_date = pred_date;
        if (tour_flag == "dc" || tour_flag == "fc") {
            $.date_init()
        }
    });
    jQuery.extend({
        date_init: function () {
            if ("" == minDate) {
                var c = new Date();
                var d = c.getFullYear();
                var f = c.getMonth() + 1;
                var e = c.getDate();
                minDate = d + "年" + f + "月" + e
            }
            if (minDate && maxDate) {
                if (minDate.substr(5, 2) != maxDate.substr(5, 2)) {
                    a = true
                }
            }
            $(".sel-time>li").hover(function () {
                $(this).toggleClass("hover")
            });
            $(".sel-time>li>.ico").click(function (h) {
                $("#head_hour").addClass("on");
                $("#head_time").removeClass("on");
                var g = $(this).parent().index();
                $(this).parents(".bd-item").children().eq(g + 1).show().siblings().hide();
                h.stopPropagation()
            })
        }, chooseDate: function (i, f) {
            $("#datetime_div").hide();
            var j = "-1";
            if (typeof(i) == "string") {
                j = i
            } else {
                if ($(i).parent().parent().attr("id")) {
                    j = $(i).parent().parent().attr("id").split("_")[2]
                }
            }
            var m = $("#wl_tr_" + j).attr("chooseest");
            var d;
            var h = false;
            if (m) {
                d = m.split(",")
            }
            if (d && d.length > 0) {
                for (var e = 0; e < d.length; e++) {
                    if (d[e] != "") {
                        var l = newpassangerTicketList[Number(d[e])];
                        var c = l.start_train_date_page.toDate().getTime();
                        if (c >= ts_minDate && c <= ts_maxDate) {
                            h = true;
                            break
                        }
                    }
                }
            }
            if (h) {
                tempMax = now_date;
                tempMin = now_date;
                temp_pred_date = "o"
            } else {
                tempMin = minDate;
                var g = false;
                if (tour_flag == "fc") {
                    if (d && d.length > 0) {
                        for (var e = 0; e < d.length; e++) {
                            if (d[e] != "") {
                                var l = newpassangerTicketList[Number(d[e])];
                                if (l.start_train_date_page == maxStr2) {
                                    g = true;
                                    break
                                }
                            }
                        }
                    }
                }
                if (g) {
                    tempMax = maxDate2;
                    temp_pred_date = pred_date2
                } else {
                    tempMax = maxDate;
                    temp_pred_date = pred_date
                }
            }
            if (tempMax.toDate().getTime() < tempMin.toDate().getTime()) {
                if (isallts) {
                    tempMin = tempMax
                } else {
                    tempMax = tempMin
                }
            }
            if ("-1" != j) {
                b = j;
                WdatePicker({
                    doubleCalendar: a,
                    "class": "Wdate",
                    minDate: tempMin,
                    maxDate: tempMax,
                    isShowClear: false,
                    readOnly: true,
                    isShowToday: false,
                    qsEnabled: false,
                    dateFmt: "MM月dd日  D",
                    errDealMode: 3,
                    onpicked: function (r) {
                        var n = r.cal.date.M;
                        var k = r.cal.date.d;
                        if (Number(n) < 10) {
                            n = "0" + n
                        }
                        if (Number(k) < 10) {
                            k = "0" + k
                        }
                        var p = r.cal.getDateStr().split(" ");
                        $("#addDate_" + b).html(n + "月" + k + "日 (周" + p[2] + ")");
                        var o = $("#addDate_" + b).html();
                        var q = $("#addTime_" + b).html();
                        if (temp_pred_date == "o") {
                            $("#addTime_" + b).html("下午 13:00~18:00")
                        } else {
                            if (o.substr(0, 2) == tempMax.substr(5, 2) && o.substr(3, 2) == tempMax.substr(8, 2)) {
                                if (q.indexOf("晚上") >= 0) {
                                    $("#addTime_" + b).html("上午 08:00~12:00");
                                    return
                                }
                                if (temp_pred_date == "1") {
                                    if (q.indexOf("下午") >= 0) {
                                        $("#addTime_" + b).html("上午 08:00~12:00");
                                        return
                                    }
                                }
                            }
                        }
                    }
                })
            }
        }, chooseTime: function (i, f) {
            $("#head_time").addClass("on");
            $("#head_hour").removeClass("on");
            var j = -1;
            if (typeof(i) == "string") {
                j = i
            } else {
                j = $(i).parent().parent().attr("id").split("_")[2]
            }
            b = j;
            if (isallts) {
                $("#hour_choose").html("").append('<li onclick="$.chooseHour(this);" cvalue="下午 13:00~18:00">下午（13:00~18:00）</li>')
            } else {
                var m = $("#wl_tr_" + j).attr("chooseest");
                var d;
                var h = false;
                if (m) {
                    d = m.split(",")
                }
                if (d && d.length > 0) {
                    for (var e = 0; e < d.length; e++) {
                        if (d[e] != "") {
                            var l = newpassangerTicketList[Number(d[e])];
                            var c = l.start_train_date_page.toDate();
                            if (c >= ts_minDate && c <= ts_maxDate) {
                                h = true;
                                break
                            }
                        }
                    }
                }
                if (h) {
                    tempMax = now_date;
                    tempMin = now_date;
                    temp_pred_date = "o"
                } else {
                    var g = false;
                    if (tour_flag == "fc") {
                        var m = $("#wl_tr_" + j).attr("chooseest");
                        if (m) {
                            var d = m.split(",");
                            if (d && d.length > 0) {
                                for (var e = 0; e < d.length; e++) {
                                    if (d[e] != "") {
                                        var l = newpassangerTicketList[Number(d[e])];
                                        if (l.start_train_date_page == maxStr2) {
                                            g = true;
                                            break
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (g) {
                        tempMax = maxDate2;
                        temp_pred_date = pred_date2
                    } else {
                        tempMax = maxDate;
                        temp_pred_date = pred_date
                    }
                }
                var n = $("#addDate_" + b).html();
                if (temp_pred_date == "o") {
                    $("#hour_choose").html("").append('<li onclick="$.chooseHour(this);" cvalue="下午 13:00~18:00">下午（13:00~18:00）</li>')
                } else {
                    $("#hour_choose").html("").append('<li onclick="$.chooseHour(this);" class="odd" cvalue="上午 08:00~12:00">上午（08:00~12:00）</li>');
                    if (n.substr(0, 2) == tempMax.substr(5, 2) && n.substr(3, 2) == tempMax.substr(8, 2) && temp_pred_date != "0") {
                        if (temp_pred_date == "2") {
                            $("#hour_choose").append('<li onclick="$.chooseHour(this);" cvalue="下午 13:00~18:00">下午（13:00~18:00）</li>')
                        } else {
                            if (temp_pred_date == "3") {
                                $("#hour_choose").append('<li onclick="$.chooseHour(this);" cvalue="下午 13:00~18:00">下午（13:00~18:00）</li>');
                                $("#hour_choose").append('<li onclick="$.chooseHour(this);" cvalue="晚上 18:00~20:00" class="odd">晚上（18:00~20:00）</li>')
                            }
                        }
                    } else {
                        $("#hour_choose").append('<li onclick="$.chooseHour(this);" cvalue="下午 13:00~18:00">下午（13:00~18:00）</li>');
                        $("#hour_choose").append('<li onclick="$.chooseHour(this);" cvalue="晚上 18:00~20:00" class="odd">晚上（18:00~20:00）</li>')
                    }
                }
            }
            $(".sel-hour").hide();
            $("#hour_choose").show();
            $("#datetime_div").css("left", $(f).position().left).css("top", $(f).position().top + $(f).height() + 12);
            $("#datetime_div").show()
        }, switch_time_hour: function (d, c) {
            if (d) {
                $(".sel-hour").hide();
                $("#hour_choose").show();
                $("#head_time").addClass("on");
                $("#head_hour").removeClass("on")
            } else {
                $.showHour(c)
            }
        }, showHour: function (c) {
            $("#head_hour").addClass("on");
            $("#head_time").removeClass("on");
            $(".sel-hour").hide();
            $("#hour_choose").hide();
            $("#date_ul_" + c).show()
        }, chooseHour: function (c) {
            var d = $(c).attr("cvalue");
            var e = $("#addTime_" + b);
            e.html(d);
            $("#datetime_div").hide()
        }
    })
})();
(function () {
    jQuery.extend({
        saveInfo: function (d, c) {
            $("#datetime_div").hide();
            var a = -1;
            if (typeof(d) == "string") {
                a = d
            } else {
                a = $(d).parent().parent().parent().attr("id").split("_")[2]
            }
            if ($.checkOrder(a)) {
                var e = dhtmlx.modalbox({
                    targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
                    callback: function () {
                    }
                });
                var b = $.create_conf_data(a, c);
                $.ajax({
                    url: ctx + "logistics/" + (c ? "add" : "edit"),
                    type: "POST",
                    async: false,
                    data: b,
                    timeout: 50000,
                    error: function (f, h, g) {
                        dhtmlx.modalbox.hide(e)
                    },
                    success: function (f) {
                        dhtmlx.modalbox.hide(e);
                        if (c) {
                            if (!savedExpress) {
                                savedExpress = []
                            }
                            if (f.data.flag && f.data.expressOrder && f.data.expressOrder.tracking_no) {
                                savedExpress.push(f.data.expressOrder)
                            }
                        } else {
                            if (f.data.flag) {
                                for (var g = 0; g < savedExpress.length; g++) {
                                    var h = savedExpress[g];
                                    if (f.data.expressOrder.tracking_no && h.tracking_no == f.data.expressOrder.tracking_no) {
                                        h = f.data.expressOrder
                                    }
                                }
                            }
                        }
                        if (f.status && f.data.flag) {
                            $.save_suc(a, f.data.expressOrder)
                        } else {
                            $.alertError(f.data.message)
                        }
                    }
                })
            }
        }, create_conf_data: function (a, c) {
            var f = $("#wl_tr_" + a);
            var e = new Object();
            var d = $.get_checked_ticket(a, e);
            e.ticketsStr = d[0];
            e.train_time_info = d[1];
            e.addressStr = JSON.stringify(addressAttr[f.attr("chooseesa")]);
            var b = defaultDate.split(" ")[0] + " 全天 08:00~20:00";
            e.express_date = $.getConfirmTime(b);
            if (!c) {
                e.expressOrder = JSON.stringify(jQuery.extend(true, {}, expressOrders[f.attr("trackingno")]))
            }
            return e
        }, checkOrder: function (j) {
            var d = $("#wl_tr_" + j);
            var e = d.attr("chooseest");
            var c = d.attr("chooseesa");
            if (!e) {
                $.alertError("请选择需要配送的车票信息");
                return false
            } else {
                if (e.split(",").length > 6) {
                    $.alertError("一个配送地址最多只可选择5张车票");
                    return false
                }
            }
            var b = e.split(",");
            var a = false;
            var g = false;
            for (var f = 0, k = b.length; f < k; f++) {
                if (b[f] != "") {
                    var h = newpassangerTicketList[Number(b[f])];
                    if (h.ticket_type_code == "2") {
                        a = true
                    }
                    if (h.ticket_type_code == "1") {
                        g = true
                    }
                }
            }
            if (a && (!g)) {
                $.alertError("儿童票不能单独配送");
                return false
            }
            if (!c) {
                $.alertError("请选择配送地址信息");
                return false
            }
            return true
        }, getConfirmTime: function (a) {
            var f = a.split(" ");
            var d = f[2].split("~");
            var c = Number(f[0].substr(0, f[0].indexOf("月")));
            var b = f[0].substr(f[0].indexOf("月") + 1, 2);
            var g = Number(minDate.substr(minDate.indexOf("年") + 1, 2));
            var e = Number(minDate.substr(0, minDate.indexOf("年")));
            var h = (c < g);
            if (h) {
                e++
            }
            return (e + ((c >= 10) ? c : ("0" + c)) + b + " " + f[2])
        }, checkChooseTime: function (h, a, j) {
            var d = a.html().split(" ")[0] + " " + j.html();
            var e = d.split(" ");
            var k = e[2].split("~");
            var l = Number(e[0].substr(0, e[0].indexOf("月")));
            var b = e[0].substr(e[0].indexOf("月") + 1, 2);
            var m = Number(minDate.substr(minDate.indexOf("年") + 1, 2));
            var g = Number(minDate.substr(0, minDate.indexOf("年")));
            var i = (l < m);
            if (i) {
                g++
            }
            var c = h.split(",");
            var f = g + "-" + ((l >= 10) ? l : ("0" + l)) + "-" + b;
            return true
        }, createTicketStr: function (a) {
            var b = "车票信息:";
            return b
        }, save_suc: function (a, c) {
            expressOrders[c.tracking_no] = c;
            $("#wl_tr_" + a).attr("trackingno", c.tracking_no);
            $.renderAllPrice();
            $("#addTicket_" + a + " span:last").hide();
            $("#addTicket_" + a + " span>a[class='i-del']").hide();
            $("#addTicket_" + a + " span").removeClass("seled");
            $("#addAddress_" + a + " a[class='edit']").hide();
            var b = '<a href="javascript:void(0);" onclick="$.cancelInfo(this)" class="btn72" style="width:55px;">取消配送</a>';
            b += '<br/><a href="javascript:void(0);" onclick="$.preUpdate(this)" class="btn72" style="width:55px;margin-top: 10px;">修改配送</a>';
            $("#operate_" + a).html(b);
            checkeCanPay()
        }, preUpdate: function (a) {
            witchT = $(a).parent().parent().attr("id").split("_")[2];
            $("#addTicket_" + witchT + " span:last").show();
            $("#addTicket_" + witchT + " span>a[class='i-del']").show();
            $("#addTicket_" + witchT + " span[class='seled-tic']").addClass("seled");
            $("#addAddress_" + witchT + " a[class='edit']").show();
            $(a).parent().find("a:first").attr("onclick", "").on("click", function () {
                $.cancelUpdate($(this)[0])
            }).html("取消修改");
            $(a).html("保存修改");
            $(a).attr("onclick", "");
            window.setTimeout(function () {
                $(a).on("click", function () {
                    $.save_express($(this)[0], false)
                })
            }, 100);
            checkeCanPay()
        }, cancelUpdate: function (j) {
            var i = $(j).parent().parent();
            var m = i.attr("id").split("_")[2];
            var h = i.attr("trackingno");
            var r = expressOrders[h];
            if (r) {
                var a = r.ticket_message.split("#");
                var o = "";
                for (var l = 0; l < a.length - 1; l++) {
                    var q = a[l].split("+");
                    for (var e = 0, s = newpassangerTicketList.length; e < s; e++) {
                        var n = newpassangerTicketList[e];
                        var b = n.passengerDTO;
                        if (n.sequence_no == q[0] && n.batch_no == q[1] && n.coach_no == q[2] && n.seat_no == q[3] && b.passenger_id_type_code == q[4] && b.passenger_id_no == q[5] && b.passenger_name == q[6]) {
                            o += e + ","
                        }
                    }
                }
                var d = "";
                chooseAddress[Number(i.attr("chooseesa"))] = false;
                for (var f = 0, g = addressAttr.length; f < g; f++) {
                    var c = addressAttr[f];
                    if (c.addressee_name == r.addressee_name && c.mobile_no == r.mobile_no && c.addressee_province == r.addressee_province && c.addressee_city == r.addressee_city && c.addressee_county == r.addressee_county && c.addressee_town == r.addressee_town && c.detail_address == r.detail_address) {
                        chooseAddress[f] = true;
                        d = f;
                        break
                    }
                }
                i.attr("chooseesa", d);
                i.attr("chooseest", o)
            }
            $(j).parent().parent().html($.renderSavedExpress(expressOrders[h], m, true));
            checkeCanPay()
        }, save_express: function (c, b) {
            var a = -1;
            if (typeof(c) == "string") {
                a = c
            } else {
                a = ($(c).parent().parent().attr("id") + "").split("_")[2]
            }
            $.saveInfo(a, b)
        }, get_checked_ticket: function (l, e) {
            var c = $("#wl_tr_" + l);
            var f = c.attr("chooseest");
            var g = [];
            var j = [];
            var m = "";
            var i = 0;
            if (f) {
                var b = f.split(",");
                if (b && b.length > 0) {
                    for (var d = 0; d < b.length; d++) {
                        if (b[d] != "") {
                            var h = newpassangerTicketList[b[d]];
                            m = m + (h.start_train_date_page.replace(" ", "").replace(":", "").replace("-", "").replace("-", "")) + "#";
                            if (!e.start_station_telecode) {
                                e.start_station_telecode = h.stationTrainDTO.from_station_telecode
                            }
                            j[i++] = h.sequence_no + "+" + h.batch_no + "+" + h.coach_no + "+" + h.seat_no + "+";
                            var a = h.passengerDTO;
                            j[i++] = a.passenger_id_type_code + "+" + a.passenger_id_no + "+" + a.passenger_name + "+";
                            j[i++] = h.ticket_type_code + "#"
                        }
                    }
                }
            }
            g[0] = j.join("");
            g[1] = m;
            return g
        }, cancel_suc: function (i) {
            var d = $("#wl_tr_" + i);
            var f = d.attr("chooseest");
            var c = d.attr("chooseesa");
            if (f) {
                var b = f.split(",");
                if (b && b.length > 0) {
                    for (var e = 0; e < b.length; e++) {
                        chooseTickets[b[e]] = false
                    }
                }
            }
            if (c) {
                chooseAddress[c] = false
            }
            d.remove();
            $.renderAllPrice();
            var g = $("#ps_body tr");
            if (g.length <= 2) {
                $.addPSXX()
            } else {
                for (var e = 1; e < g.length - 1; e++) {
                    var h = g.eq(e);
                    var a = h.attr("id").split("_")[2];
                    h.find("td:first").html("第" + e + "件");
                    h.attr("id", "wl_tr_" + e);
                    h.find("td[id^=addTicket_]").attr("id", "addTicket_" + e);
                    h.find("td[id^=addAddress_]").attr("id", "addAddress_" + e);
                    h.find("td[id^=price_]").attr("id", "price_" + e);
                    h.find("span[id^=addDate_]").attr("id", "addDate_" + e);
                    h.find("span[id^=addTime_]").attr("id", "addTime_" + e);
                    h.find("td[id^=operate_]").attr("id", "operate_" + e)
                }
            }
            checkeCanPay()
        }, cancelInfo: function (b) {
            $("#datetime_div").hide();
            var a = -1;
            if (typeof(b) == "string") {
                a = b
            } else {
                a = $(b).parent().parent().attr("id").split("_")[2]
            }
            dhtmlx.createWin({
                winId: "dialog_prompt_ps",
                closeWinId: ["dialog_prompt_ps_close", "dialog_prompt_ps_cancel"],
                okId: "dialog_prompt_ps_ok",
                okCallBack: function () {
                    var d = $(b).parent().parent().attr("trackingno");
                    var e = dhtmlx.modalbox({
                        targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
                        callback: function () {
                        }
                    });
                    var c = new Object();
                    c.expressOrder = JSON.stringify(expressOrders[d]);
                    $.ajax({
                        url: ctx + "logistics/cancel",
                        type: "POST",
                        async: false,
                        data: c,
                        timeout: 50000,
                        error: function (f, h, g) {
                            dhtmlx.modalbox.hide(e)
                        },
                        success: function (f) {
                            dhtmlx.modalbox.hide(e);
                            if (f.status && f.data.flag) {
                                var h = [];
                                if (savedExpress) {
                                    for (var g = 0; g < savedExpress.length; g++) {
                                        var i = savedExpress[g];
                                        if (i.tracking_no != d) {
                                            h.push(i)
                                        }
                                    }
                                    savedExpress = h
                                }
                                expressOrders[d] = null;
                                $.cancel_suc(a)
                            } else {
                                $.alertError(f.data.message)
                            }
                        }
                    })
                }
            });
            $("#dialog_prompt_ps").css("top", "200px")
        }
    })
})();
var timeMsg = "";
function TimeClose(a, d) {
    if (d == null || d == "") {
        d = ""
    }
    try {
        var f = Math.floor(a / (1000 * 60));
        var b = Math.floor(a / 1000) % 60;
        if (f < 10) {
            f = "0" + f
        }
        if (b < 10) {
            b = "0" + b
        }
        if (a > 0) {
            timeMsg = d + "<strong>" + f + "分" + b + "秒</strong>"
        } else {
            timeMsg = d + '<strong><font color="#FF0000">00秒</font></strong>';
            disabledBtn()
        }
        $("#ShowTime").html(timeMsg);
        a = a - 1 * 1000;
        if (a >= 0) {
            window.setTimeout('TimeClose("' + a + '","' + d + '")', 1000)
        } else {
            timeMsg = d + '<strong><font color="#FF0000">00秒</font></strong>';
            disabledBtn()
        }
    } catch (c) {
        $("#ShowTime").hide()
    } finally {
    }
}
function timeCountDown(d) {
    var c = "";
    if (d == "N" || d == "T") {
        c = ""
    } else {
        if (tour_flag == "wc") {
            c = ""
        } else {
            c = ""
        }
    }
    try {
        if (residueTime == 0) {
            if (beginTime < loseTime) {
                TimeClose(loseTime - beginTime, c)
            } else {
                disabledBtn()
            }
        } else {
            var a = residueTime * 60 * 1000;
            TimeClose(a, c)
        }
    } catch (b) {
        $("#ShowTime").hide()
    } finally {
    }
}
function disabledBtn() {
    if ((tour_flag != null && tour_flag == "dc") || (tour_flag != null && tour_flag == "fc")) {
        $("#cancelButton").attr("class", "btn92").unbind("click");
        $("#payButton").attr("class", "btn92").unbind("click");
        if (integration != null && integration == "show") {
            $("#integrationPayButton").attr("class", "btn92").unbind("click")
        }
    }
    if (tour_flag != null && tour_flag == "wc") {
        $("#cancelButton").attr("class", "btn92").unbind("click");
        $("#backButton").attr("class", "btn92").unbind("click")
    }
    if (tour_flag != null && tour_flag == "gc") {
        $("#cancelResign").attr("class", "btn92").unbind("click");
        if (pay_mode != null && pay_mode == "T") {
            $("#resignButtonT").attrattr("class", "btn92").unbind("click")
        } else {
            if (pay_mode != null && pay_mode == "N") {
                $("#resignButtonN").attrattr("class", "btn92").unbind("click")
            } else {
                if (pay_mode != null && pay_mode == "Y") {
                    $("#cancelResign").attrattr("class", "btn92").unbind("click")
                }
            }
        }
    }
}
$(document).ready(function () {
    timeCountDown(pay_mode)
});
jQuery.validator.addMethod("checkLoginUserName", function (f, d) {
    var a = false;
    var c = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])\d{8}$/;
    var b = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/;
    var e = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    if (b.test(f) || e.test(f) || c.test(f)) {
        a = true
    }
    return this.optional(d) || a
}, "wrong username.");
jQuery.validator.addMethod("requiredUserName", function (b, a) {
    if ("用户名／邮箱／手机号" == b) {
        return false
    }
    if (b == null || "" == b) {
        return false
    }
    return true
}, "wrong username.");
jQuery.validator.addMethod("requiredSchoolName", function (b, a) {
    if ("简码／汉字" == b) {
        return false
    }
    if (b == null || "" == b) {
        return false
    }
    return true
}, "wrong schoolname.");
jQuery.validator.addMethod("randCodeRequired", function (b, a) {
    $("#i-ok").css("display", "none");
    return b.length > 0
}, "验证码错误!");
jQuery.validator.addMethod("randCodeFormat", function (c, b) {
    $("#i-ok").css("display", "none");
    var a = /^[a-zA-Z0-9]+$/;
    return this.optional(b) || a.test(c)
}, "验证码错误!");
jQuery.validator.addMethod("randCodeLength", function (b, a) {
    $("#i-ok").css("display", "none");
    return b.length == 4
}, "验证码错误!.");
jQuery.validator.addMethod("integrationCheck", function (b, a) {
    var c = /^\d{6}$/;
    return this.optional(a) || c.test(b)
}, "wrong integrationpassword");
jQuery.validator.addMethod("integrationPwdCheck", function (b, a, c) {
    if ($("#" + c[0]).val() == $("#" + c[1]).val()) {
        return true
    }
    return false
}, "两次输入密码不一致!.");
jQuery.validator.addMethod("checkRandCode", function (c, b, d) {
    var a = true;
    if (c && c.length == 4) {
        $.ajax({
            url: ctx + "passcodeNew/checkRandCodeAnsyn",
            type: "post",
            data: {randCode: c, rand: d},
            async: false,
            success: function (e) {
                if (e.data == "N") {
                    a = false;
                    $("#i-ok").css("display", "none")
                } else {
                    a = true;
                    $("#i-ok").css("display", "block")
                }
            }
        })
    } else {
        a = false;
        $("#i-ok").css("display", "none")
    }
    return a
}, "验证码错误!.");
jQuery.validator.addMethod("validateUsersName", function (b, a) {
    return this.optional(a) || /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/.test(b)
}, "用户名只能由字母、数字或_组成");
jQuery.validator.addMethod("checkWriteSpace", function (c, b) {
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 32) {
            return false
        }
    }
    return true
}, "contain writespace");
jQuery.validator.addMethod("validateRandCode", function (b, a) {
    return this.optional(a) || /^[a-zA-Z0-9]+$/.test(b)
}, "验证码错误!.");
jQuery.validator.addMethod("checkPassward", function (c, b, e) {
    var d = true;
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60 || c.charCodeAt(a) == 62) {
            d = false
        }
        if (!d) {
            break
        }
    }
    return this.optional(b) || d
}, "Passward wrong");
function validateSecIdCard(g) {
    var f = 0;
    var a = g;
    var e = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙",
        21: "辽宁",
        22: "吉林",
        23: "黑龙",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    if (!/^\d{17}(\d|x)$/i.test(a)) {
        return false
    }
    a = a.replace(/x$/i, "a");
    if (e[parseInt(a.substr(0, 2))] == null) {
        return false
    }
    var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
    var h = new Date(c.replace(/-/g, "/"));
    if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
        return false
    }
    for (var b = 17; b >= 0; b--) {
        f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
    }
    if (f % 11 != 1) {
        return false
    }
    return true
}
function validateFirIdCard(g) {
    var f = 0;
    var a;
    var e = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙",
        21: "辽宁",
        22: "吉林",
        23: "黑龙",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    if (g.length == 15) {
        a = idCardUpdate(g)
    } else {
        a = g
    }
    if (!/^\d{17}(\d|x)$/i.test(a)) {
        return false
    }
    a = a.replace(/x$/i, "a");
    if (e[parseInt(a.substr(0, 2))] == null) {
        return false
    }
    var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
    var h = new Date(c.replace(/-/g, "/"));
    if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
        return false
    }
    for (var b = 17; b >= 0; b--) {
        f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
    }
    if (f % 11 != 1) {
        return false
    }
    return true
}
function idCardUpdate(g) {
    var b;
    var f = /^(\d){15}$/;
    if (f.test(g)) {
        var e = 0;
        var a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var d = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
        g = g.substr(0, 6) + "19" + g.substr(6, g.length - 6);
        for (var c = 0; c < g.length; c++) {
            e += parseInt(g.substr(c, 1)) * a[c]
        }
        g += d[e % 11];
        b = g
    } else {
        b = "#"
    }
    return b
}
jQuery.validator.addMethod("checkBorth", function (e, c) {
    var b = e;
    if (b == "") {
        return true
    } else {
        var a = b.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (a == null) {
            return false
        }
        var f = new Date(a[1], a[3] - 1, a[4]);
        return (f.getFullYear() == a[1] && (f.getMonth() + 1) == a[3] && f.getDate() == a[4])
    }
}, "日期格式不合法");
jQuery.validator.addMethod("byteRangeLength", function (d, b, e) {
    var c = d.length;
    for (var a = 0; a < d.length; a++) {
        if (d.charCodeAt(a) > 127) {
            c++
        }
    }
    return this.optional(b) || (c >= e[0] && c <= e[1])
}, "length wrong");
jQuery.validator.addMethod("checkNameCharBlank", function (c, b, d) {
    var a = d.split("@");
    if ($("#" + a[1]).val() == "") {
        return true
    } else {
        if ($("#" + a[0]).val() == "1" || $("#" + a[0]).val() == "2") {
            return this.optional(b) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(c)
        } else {
            if ($("#" + a[0]).val() == "B") {
                if (/^[-]+$/.test(c)) {
                    return false
                }
                return this.optional(b) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(c)
            } else {
                if ($("#" + a[0]).val() == "H") {
                    if (/^[-]+$/.test(c)) {
                        return false
                    }
                    return this.optional(b) || /^[a-z A-Z·。.．\u3400-\u9FFF-]+$/.test(c)
                } else {
                    return this.optional(b) || /^[a-z A-Z·.．\u3400-\u9FFF]+$/.test(c)
                }
            }
        }
    }
}, "wrong name.");
jQuery.validator.addMethod("checkIdValidStr", function (c, b) {
    var a = /^[a-zA-Z0-9\_\-\(\)]+$/;
    return this.optional(b) || (a.test(c))
}, "wrong id");
jQuery.validator.addMethod("isSecIDCard", function (b, a, c) {
    if (!checkIfSecIdCard($(c).val())) {
        return true
    }
    return validateSecIdCard(b)
}, "wrong");
function checkIfSecIdCard(a) {
    if (a == "1") {
        return true
    }
    return false
}
function checkIfFirIdCard(a) {
    if (a == "2") {
        return true
    }
    return false
}
function checkCardForHKorTW(a) {
    if (a == "C" || a == "G") {
        return true
    }
    return false
}
jQuery.validator.addMethod("isFirIDCard", function (b, a, c) {
    if (!checkIfFirIdCard($(c).val())) {
        return true
    }
    return validateFirIdCard(b)
}, "wrong");
jQuery.validator.addMethod("checkHkongMacao", function (c, b, d) {
    if ($(d).val() == "C") {
        var a = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
        return this.optional(b) || (a.test(c))
    } else {
        return true
    }
}, "wrong format.");
jQuery.validator.addMethod("checkTaiw", function (c, a, e) {
    if ($(e).val() == "G") {
        var d = /^[0-9]{8}$/;
        var b = /^[0-9]{10}$/;
        return this.optional(a) || (d.test(c)) || (b.test(c))
    } else {
        return true
    }
}, "wrong format.");
jQuery.validator.addMethod("checkPassport", function (d, b, e) {
    if ($(e).val() == "B") {
        var c = /^[a-zA-Z]{5,17}$/;
        var a = /^[a-zA-Z0-9]{5,17}$/;
        return this.optional(b) || (a.test(d)) || c.test(d)
    } else {
        return true
    }
}, "wrong format.");
jQuery.validator.addMethod("checkWork", function (c, b, d) {
    if ($(d).val() == "H") {
        var a = /^[a-zA-Z]{3}[0-9]{12}$/;
        return this.optional(b) || (a.test(c))
    } else {
        return true
    }
}, "wrong format.");
jQuery.validator.addMethod("isMobile", function (d, b) {
    var c = d.length;
    var a = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])\d{8}$/;
    return this.optional(b) || (c == 11 && a.test(d))
}, "wrong mobile phone ");
jQuery.validator.addMethod("isTelePhone", function (b, a) {
    var c = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}#)/;
    return this.optional(a) || (c.test(b))
}, "wrong telePhone ");
jQuery.validator.addMethod("illegalChar", function (c, b, e) {
    var d = true;
    if (c.indexOf("$") >= 0) {
        return false
    }
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60 || c.charCodeAt(a) == 62 || c.charCodeAt(a) == 34 || c.charCodeAt(a) == 63) {
            d = false
        }
        if (!d) {
            break
        }
    }
    return this.optional(b) || d
}, "Illegal char wrong");
jQuery.validator.addMethod("isZipCode", function (c, b) {
    var a = /^[0-9]{6}$/;
    return this.optional(b) || (a.test(c))
}, "wrong zipcode");
jQuery.validator.addMethod("isEmail", function (c, a) {
    var b = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return this.optional(a) || (b.test(trim(c)))
}, "wrong email");
function replaceChar(b) {
    var a = b.value.replace(/['"<> ?]/g, "");
    b.value = a
}
function checkNameChar1(a) {
    return /^[a-zA-Z0-9\u3400-\u9FFF]+$/.test(a)
}
function trim(a) {
    return a.replace(/(^\s*)|(\s*$)/g, "")
}
function ltrim(a) {
    return a.replace(/(^\s*)/g, "")
}
function rtrim(a) {
    return a.replace(/(\s*$)/g, "")
}
jQuery.validator.addMethod("validateName", function (b, a) {
    return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
}, "wrong username.");
jQuery.validator.addMethod("studentRequired", function (b, a, c) {
    if ($(c).val() == "3") {
        return b && trim(b) != ""
    }
    return true
}, "wrong studentRequired.");
jQuery.validator.addMethod("studentStationRequired", function (b, a, c) {
    if ($(c).val() == "3") {
        return b && trim(b) != "简拼/全拼/汉字" && trim(b) != ""
    }
    return true
}, "wrong studentStationRequired.");
jQuery.validator.addMethod("studentValidateName", function (b, a, c) {
    if ($(c).val() == "3") {
        return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
    }
    return true
}, "wrong username.");
jQuery.validator.addMethod("checkStudentName", function (b, a, c) {
    if ($(c).val() == "3") {
        if ((!b || trim(b) == "" || trim(b) == "简码/汉字")) {
            return false
        }
    }
    return true
}, "wrong username.");
jQuery.validator.addMethod("isQuestionNull", function (b, a, c) {
    if (jQuery.trim(b) != "") {
        if (jQuery.trim($(c[0]).val()) == "customQuestion" && jQuery.trim($(c[1]).val()) == "" || jQuery.trim($(c[0]).val()) == "") {
            return false
        }
    }
    return true
}, "you should input the question");
jQuery.validator.addMethod("isAnswerNull", function (b, a, c) {
    if ((jQuery.trim($(c[0]).val()) == "customQuestion" && jQuery.trim($(c[1]).val()) != "") || (jQuery.trim($(c[0]).val()) != "")) {
        if (jQuery.trim(b) == "") {
            return false
        }
    }
    return true
}, "you should input the answer");
function checkSex(c, b, a) {
    if (!checkSexByCardId(c, b, a)) {
        if (!confirm("性别与身份证中的性别不符，是否继续?")) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
function checkSexByCardId(c, e, a) {
    function b(h, i) {
        var g = null;
        if (i.length == 15) {
            g = i.substring(14, 15)
        } else {
            if (i.length == 18) {
                g = i.substring(16, 17)
            } else {
                return true
            }
        }
        if (g == "x" || g == "X") {
            g = "10"
        }
        var f = parseInt(g);
        var j = f % 2;
        if (j === 0 && h === "F") {
            return true
        } else {
            if (j === 1 && h === "M") {
                return true
            } else {
                return false
            }
        }
    }

    var d = $(a).val();
    if (checkIfSecIdCard($(e).val()) && validateSecIdCard(d)) {
        if (d !== "") {
            return b(c, d)
        } else {
            return true
        }
    } else {
        if (checkIfFirIdCard($(e).val()) && validateFirIdCard(d)) {
            if (d !== "") {
                return b(c, d)
            } else {
                return true
            }
        } else {
            return true
        }
    }
}
function checkBirdDateByCardId(c, e, b) {
    var a = null;
    var d = $(b).val();
    if (checkIfSecIdCard($(e).val()) && d !== "" && validateSecIdCard(d)) {
        a = d.substring(6, 14)
    } else {
        if (checkIfFirIdCard($(e).val()) && d !== "" && validateFirIdCard(d)) {
            if (d.length == 15) {
                a = "19" + d.substring(6, 12)
            } else {
                if (d.length == 18) {
                    a = d.substring(6, 14)
                }
            }
        } else {
            return true
        }
    }
    if (c !== "") {
        c = c.replace(/-/g, "");
        if (c != a) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
function checkBirdate(c, b, a) {
    if (!checkBirdDateByCardId(c, b, a)) {
        if (!confirm("出生日期与身份证中的出生日期不符，是否继续?")) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
jQuery.validator.addMethod("checkPwdValidate", function (b, a) {
    return this.optional(a) || /(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]{6,}$/.test(b)
}, "contain writespace");
jQuery.validator.addMethod("checkConfirmPassWard", function (b, a, c) {
    if ($(c).val() != null) {
        return $(c).val() == b
    }
    return true
}, "contain writespace");
jQuery.validator.addMethod("IVR_passwd_format", function (b, a) {
    var c = /^[0-9]{6}$/;
    return this.optional(a) || c.test(b)
}, "验证码错误!.");
jQuery.validator.addMethod("checkStation", function (b, a) {
    if ((!b || trim(b) == "" || trim(b) == "简拼/全拼/汉字" || trim(b) == "简拼/全拼/汉字或↑↓")) {
        return false
    }
    return true
}, "wrong username.");
jQuery.validator.addMethod("checkAnsyUserName", function (e, c, f) {
    var b = f[0];
    var d = $("#" + f[1]).val();
    var a = true;
    $.ajax({
        url: b + "?user_name=" + e, type: "get", async: false, success: function (g, h) {
            if (g.data == true) {
                a = false
            } else {
                a = true
            }
        }, error: function (g, i, h) {
            a = false
        }
    });
    return a
}, "wrong cardNo");
function checkPwdRank(e, a, d) {
    var b = $(e);
    var c = b.val();
    if (c.length <= 6 || new RegExp("^[a-zA-Z]{6,}$").test(c) || new RegExp("^[0-9]{6,}$").test(c) || new RegExp("^[_]{6,}$").test(c)) {
        $("#" + a).attr("title", "危险");
        $("#" + d).html("危险");
        $("#" + a).removeClass("rank-a");
        $("#" + a).removeClass("rank-b");
        $("#" + a).removeClass("rank-c");
        $("#" + a).addClass("rank-a")
    } else {
        if (c.length > 6 && new RegExp("[a-zA-Z]").test(c) && new RegExp("[0-9]").test(c) && new RegExp("[_]").test(c)) {
            $("#" + a).attr("title", "安全");
            $("#" + d).html("安全");
            $("#" + a).removeClass("rank-a");
            $("#" + a).removeClass("rank-b");
            $("#" + a).removeClass("rank-c");
            $("#" + a).addClass("rank-c")
        } else {
            $("#" + a).attr("title", "一般");
            $("#" + d).html("一般");
            $("#" + a).removeClass("rank-a");
            $("#" + a).removeClass("rank-b");
            $("#" + a).removeClass("rank-c");
            $("#" + a).addClass("rank-b")
        }
    }
}
Array.prototype.unique = function () {
    var b = {}, a = this.length;
    for (var c = 0; c < a; c++) {
        if (typeof b[this[c]] == "undefined") {
            b[this[c]] = 1
        }
    }
    this.length = 0;
    a = 0;
    for (var c in b) {
        this[a++] = c
    }
    return this
};
function checkSearchPwdRank(h, c, g) {
    var e = $(h);
    var f = e.val();
    if (f.length < 6) {
        $("#" + c).attr("title", "危险");
        $("#" + g).html("危险");
        $("#" + c).removeClass("rank-a");
        $("#" + c).removeClass("rank-b");
        $("#" + c).removeClass("rank-c");
        $("#" + c).addClass("rank-a")
    } else {
        var a = [];
        for (var b = 0; b < 6; b++) {
            a.push(f.charAt(b))
        }
        a = a.unique();
        var d = a.length;
        if (d == 1) {
            $("#" + c).attr("title", "危险");
            $("#" + g).html("危险");
            $("#" + c).removeClass("rank-a");
            $("#" + c).removeClass("rank-b");
            $("#" + c).removeClass("rank-c");
            $("#" + c).addClass("rank-a")
        } else {
            if (d > 1 && d < 5) {
                $("#" + c).attr("title", "一般");
                $("#" + g).html("一般");
                $("#" + c).removeClass("rank-a");
                $("#" + c).removeClass("rank-b");
                $("#" + c).removeClass("rank-c");
                $("#" + c).addClass("rank-b")
            } else {
                $("#" + c).attr("title", "安全");
                $("#" + g).html("安全");
                $("#" + c).removeClass("rank-a");
                $("#" + c).removeClass("rank-b");
                $("#" + c).removeClass("rank-c");
                $("#" + c).addClass("rank-c")
            }
        }
    }
}
jQuery.validator.addMethod("checkDetailAddress", function (b, a) {
    return this.optional(a) || /^[0-9a-zA-Z\u3400-\u9FFF\#]+$/.test(b)
}, "wrong name.");
jQuery.validator.addMethod("checkAddressName", function (b, a) {
    if (/^[-]+$/.test(b)) {
        return false
    }
    return this.optional(a) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(b) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(b)
}, "wrong name.");
jQuery.validator.addMethod("checkAddressSelect", function (b, a) {
    if ("" == b) {
        return false
    }
    if (b) {
        return true
    }
    return this.optional(a)
}, "wrong name.");
var parorder_messages = {
    randCodeError: "验证码错误!",
    randCodeLentgh: "验证码长度为4位!",
    randCodeFormat: "验证码只能由数字或字母组成!",
    randCodeEmpty: "验证码不能为空!",
    integrationPwdEmpty: "积分支付密码不能为空！",
    integrationCheck: "积分支付密码为6位数字组成！"
};
