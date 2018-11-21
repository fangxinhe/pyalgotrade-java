/* @update: 2016-4-25 17:53:53 */
if (!function (e, r) {
        function t(e) {
            return function (r) {
                return {}.toString.call(r) == "[object " + e + "]"
            }
        }

        function n() {
            return S++
        }

        function a(e) {
            return e.match(A)[0]
        }

        function o(e) {
            for (e = e.replace(C, "/"), e = e.replace(O, "$1/"); e.match(I);)e = e.replace(I, "/");
            return e
        }

        function s(e) {
            var r = e.length - 1, t = e.charAt(r);
            return "#" === t ? e.substring(0, r) : ".js" === e.substring(r - 2) || e.indexOf("?") > 0 || "/" === t ? e : e + ".js"
        }

        function i(e) {
            var r = y.alias;
            return r && E(r[e]) ? r[e] : e
        }

        function c(e) {
            var r, t = y.paths;
            return t && (r = e.match(U)) && E(t[r[1]]) && (e = t[r[1]] + r[2]), e
        }

        function u(e) {
            var r = y.vars;
            return r && e.indexOf("{") > -1 && (e = e.replace(N, function (e, t) {
                return E(r[t]) ? r[t] : e
            })), e
        }

        function f(e) {
            var r = y.map, t = e;
            if (r)for (var n = 0, a = r.length; a > n; n++) {
                var o = r[n];
                if (t = _(o) ? o(e) || e : e.replace(o[0], o[1]), t !== e)break
            }
            return t
        }

        function l(e, r) {
            var t, n = e.charAt(0);
            if (P.test(e))t = e; else if ("." === n)t = o((r ? a(r) : y.cwd) + e); else if ("/" === n) {
                var s = y.cwd.match(D);
                t = s ? s[0] + e.substring(1) : e
            } else t = y.base + e;
            return 0 === t.indexOf("//") && (t = location.protocol + t), t
        }

        function d(e, r) {
            if (!e)return "";
            e = i(e), e = c(e), e = u(e), e = s(e);
            var t = l(e, r);
            return t = f(t)
        }

        function g(e) {
            return e.hasAttribute ? e.src : e.getAttribute("src", 4)
        }

        function p(e, r, t) {
            var n = k.createElement("script");
            if (t) {
                var a = _(t) ? t(e) : t;
                a && (n.charset = a)
            }
            h(n, r, e), n.async = !0, n.src = e, G = n, H ? K.insertBefore(n, H) : K.appendChild(n), G = null
        }

        function h(e, r, t) {
            function n() {
                e.onload = e.onerror = e.onreadystatechange = null, y.debug || K.removeChild(e), e = null, r()
            }

            var a = "onload" in e;
            a ? (e.onload = n, e.onerror = function () {
                T("error", {uri: t, node: e}), n()
            }) : e.onreadystatechange = function () {
                /loaded|complete/.test(e.readyState) && n()
            }
        }

        function v() {
            if (G)return G;
            if (R && "interactive" === R.readyState)return R;
            for (var e = K.getElementsByTagName("script"), r = e.length - 1; r >= 0; r--) {
                var t = e[r];
                if ("interactive" === t.readyState)return R = t
            }
        }

        function j(e) {
            var r = [];
            return e.replace(V, "").replace(X, function (e, t, n) {
                n && r.push(n)
            }), r
        }

        function m(e, r) {
            this.uri = e, this.dependencies = r || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0
        }

        if (!e.seajs) {
            var b = e.seajs = {version: "2.3.0"}, y = b.data = {}, x = t("Object"), E = t("String"), B = Array.isArray || t("Array"), _ = t("Function"), S = 0, w = y.events = {};
            b.on = function (e, r) {
                var t = w[e] || (w[e] = []);
                return t.push(r), b
            }, b.off = function (e, r) {
                if (!e && !r)return w = y.events = {}, b;
                var t = w[e];
                if (t)if (r)for (var n = t.length - 1; n >= 0; n--)t[n] === r && t.splice(n, 1); else delete w[e];
                return b
            };
            var T = b.emit = function (e, r) {
                var t = w[e];
                if (t) {
                    t = t.slice();
                    for (var n = 0, a = t.length; a > n; n++)t[n](r)
                }
                return b
            }, A = /[^?#]*\//, C = /\/\.\//g, I = /\/[^/]+\/\.\.\//, O = /([^:/])\/+\//g, U = /^([^/:]+)(\/.+)$/, N = /{([^{]+)}/g, P = /^\/\/.|:\//, D = /^.*?\/\/.*?\//, k = document, q = location.href && 0 !== location.href.indexOf("about:") ? a(location.href) : "", L = k.scripts, F = k.getElementById("seajsnode") || L[L.length - 1], M = a(g(F) || q);
            b.resolve = d;
            var G, R, K = k.head || k.getElementsByTagName("head")[0] || k.documentElement, H = K.getElementsByTagName("base")[0];
            b.request = p;
            var Y, X = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, V = /\\\\/g, z = b.cache = {}, J = {}, Q = {}, W = {}, $ = m.STATUS = {
                FETCHING: 1,
                SAVED: 2,
                LOADING: 3,
                LOADED: 4,
                EXECUTING: 5,
                EXECUTED: 6
            };
            m.prototype.resolve = function () {
                for (var e = this, r = e.dependencies, t = [], n = 0, a = r.length; a > n; n++)t[n] = m.resolve(r[n], e.uri);
                return t
            }, m.prototype.load = function () {
                var e = this;
                if (!(e.status >= $.LOADING)) {
                    e.status = $.LOADING;
                    var t = e.resolve();
                    T("load", t);
                    for (var n, a = e._remain = t.length, o = 0; a > o; o++)n = m.get(t[o]), n.status < $.LOADED ? n._waitings[e.uri] = (n._waitings[e.uri] || 0) + 1 : e._remain--;
                    if (0 === e._remain)return e.onload(), r;
                    var s = {};
                    for (o = 0; a > o; o++)n = z[t[o]], n.status < $.FETCHING ? n.fetch(s) : n.status === $.SAVED && n.load();
                    for (var i in s)s.hasOwnProperty(i) && s[i]()
                }
            }, m.prototype.onload = function () {
                var e = this;
                e.status = $.LOADED, e.callback && e.callback();
                var r, t, n = e._waitings;
                for (r in n)n.hasOwnProperty(r) && (t = z[r], t._remain -= n[r], 0 === t._remain && t.onload());
                delete e._waitings, delete e._remain
            }, m.prototype.fetch = function (e) {
                function t() {
                    b.request(s.requestUri, s.onRequest, s.charset)
                }

                function n() {
                    delete J[i], Q[i] = !0, Y && (m.save(o, Y), Y = null);
                    var e, r = W[i];
                    for (delete W[i]; e = r.shift();)e.load()
                }

                var a = this, o = a.uri;
                a.status = $.FETCHING;
                var s = {uri: o};
                T("fetch", s);
                var i = s.requestUri || o;
                return !i || Q[i] ? (a.load(), r) : J[i] ? (W[i].push(a), r) : (J[i] = !0, W[i] = [a], T("request", s = {
                    uri: o,
                    requestUri: i,
                    onRequest: n,
                    charset: y.charset
                }), s.requested || (e ? e[s.requestUri] = t : t()), r)
            }, m.prototype.exec = function () {
                function e(r) {
                    return m.get(e.resolve(r)).exec()
                }

                var t = this;
                if (t.status >= $.EXECUTING)return t.exports;
                t.status = $.EXECUTING;
                var a = t.uri;
                e.resolve = function (e) {
                    return m.resolve(e, a)
                }, e.async = function (r, t) {
                    return m.use(r, t, a + "_async_" + n()), e
                };
                var o = t.factory, s = _(o) ? o(e, t.exports = {}, t) : o;
                return s === r && (s = t.exports), delete t.factory, t.exports = s, t.status = $.EXECUTED, T("exec", t), s
            }, m.resolve = function (e, r) {
                var t = {id: e, refUri: r};
                return T("resolve", t), t.uri || b.resolve(t.id, r)
            }, m.define = function (e, t, n) {
                var a = arguments.length;
                1 === a ? (n = e, e = r) : 2 === a && (n = t, B(e) ? (t = e, e = r) : t = r), !B(t) && _(n) && (t = j("" + n));
                var o = {id: e, uri: m.resolve(e), deps: t, factory: n};
                if (!o.uri && k.attachEvent) {
                    var s = v();
                    s && (o.uri = s.src)
                }
                T("define", o), o.uri ? m.save(o.uri, o) : Y = o
            }, m.save = function (e, r) {
                var t = m.get(e);
                t.status < $.SAVED && (t.id = r.id || e, t.dependencies = r.deps || [], t.factory = r.factory, t.status = $.SAVED, T("save", t))
            }, m.get = function (e, r) {
                return z[e] || (z[e] = new m(e, r))
            }, m.use = function (r, t, n) {
                var a = m.get(n, B(r) ? r : [r]);
                a.callback = function () {
                    for (var r = [], n = a.resolve(), o = 0, s = n.length; s > o; o++)r[o] = z[n[o]].exec();
                    t && t.apply(e, r), delete a.callback
                }, a.load()
            }, b.use = function (e, r) {
                return m.use(e, r, y.cwd + "_use_" + n()), b
            }, m.define.cmd = {}, e.define = m.define, b.Module = m, y.fetchedList = Q, y.cid = n, b.require = function (e) {
                var r = m.get(m.resolve(e));
                return r.status < $.EXECUTING && (r.onload(), r.exec()), r.exports
            }, y.base = M, y.dir = M, y.cwd = q, y.charset = "utf-8", b.config = function (e) {
                for (var r in e) {
                    var t = e[r], n = y[r];
                    if (n && x(n))for (var a in t)n[a] = t[a]; else B(n) ? t = n.concat(t) : "base" === r && ("/" !== t.slice(-1) && (t += "/"), t = l(t)), y[r] = t
                }
                return T("config", e), b
            }
        }
    }(this), !function () {
        function e(e) {
            var r = e.length;
            if (!(2 > r)) {
                j.comboSyntax && (b = j.comboSyntax), j.comboMaxLength && (y = j.comboMaxLength), j.comboSuffix && (p = j.comboSuffix), g = j.comboExcludes;
                for (var n = [], a = 0; r > a; a++) {
                    var o = e[a];
                    if (!m[o]) {
                        var i = h.get(o);
                        i.status < v && !l(o) && !d(o) && n.push(o)
                    }
                }
                n.length > 1 && s(t(n))
            }
        }

        function r(e) {
            e.requestUri = m[e.uri] || e.uri
        }

        function t(e) {
            return a(n(e))
        }

        function n(e) {
            for (var r = {__KEYS: []}, t = 0, n = e.length; n > t; t++)for (var a = e[t].replace("://", "__").split("/"), o = r, s = 0, i = a.length; i > s; s++) {
                var c = a[s];
                o[c] || (o[c] = {__KEYS: []}, o.__KEYS.push(c)), o = o[c]
            }
            return r
        }

        function a(e) {
            for (var r = [], t = e.__KEYS, n = 0, a = t.length; a > n; n++) {
                for (var s = t[n], i = s, c = e[s], u = c.__KEYS; 1 === u.length;)i += "/" + u[0], c = c[u[0]], u = c.__KEYS;
                u.length && r.push([i.replace("__", "://"), o(c)])
            }
            return r
        }

        function o(e) {
            for (var r = [], t = e.__KEYS, n = 0, a = t.length; a > n; n++) {
                var s = t[n], i = o(e[s]), c = i.length;
                if (c)for (var u = 0; c > u; u++)r.push(s + "/" + i[u]); else r.push(s)
            }
            return r
        }

        function s(e) {
            for (var r = 0, t = e.length; t > r; r++)for (var n = e[r], a = n[0] + "/", o = u(n[1]), s = 0, c = o.length; c > s; s++)i(a, o[s]);
            return m
        }

        function i(e, r) {
            for (var t = [], n = 0, a = r.length; a > n; n++)t[n] = r[n].replace(/\?.*$/, "");
            var o = e + b[0] + t.join(b[1]);
            p && (o += p);
            var s = o.length > y;
            if (r.length > 1 && s) {
                var u = c(r, y - (e + b[0]).length);
                i(e, u[0]), i(e, u[1])
            } else {
                if (s)throw new Error("The combo url is too long: " + o);
                for (var n = 0, a = r.length; a > n; n++)m[e + r[n]] = o
            }
        }

        function c(e, r) {
            for (var t = b[1], n = e[0], a = 1, o = e.length; o > a; a++)if (n += t + e[a], n.length > r)return [e.splice(0, a), e]
        }

        function u(e) {
            for (var r = [], t = {}, n = 0, a = e.length; a > n; n++) {
                var o = e[n], s = f(o);
                s && (t[s] || (t[s] = [])).push(o)
            }
            for (var i in t)t.hasOwnProperty(i) && r.push(t[i]);
            return r
        }

        function f(e) {
            var r = e.lastIndexOf(".");
            return r >= 0 ? e.substring(r) : ""
        }

        function l(e) {
            return g ? g.test ? g.test(e) : g(e) : void 0
        }

        function d(e) {
            var r = j.comboSyntax || ["??", ","], t = r[0], n = r[1];
            return t && e.indexOf(t) > 0 || n && e.indexOf(n) > 0
        }

        var g, p, h = seajs.Module, v = h.STATUS.FETCHING, j = seajs.data, m = j.comboHash = {}, b = ["??", ","], y = 2e3;
        if (seajs.on("load", e), seajs.on("fetch", r), j.test) {
            var x = seajs.test || (seajs.test = {});
            x.uris2paths = t, x.paths2hash = s
        }
        define("seajs/seajs-combo/1.0.1/seajs-combo", [], {})
    }(), !function () {
        function e(e) {
            return function (r) {
                return {}.toString.call(r) == "[object " + e + "]"
            }
        }

        function r(e) {
            return "[object Function]" == {}.toString.call(e)
        }

        function t(e, t, a) {
            var o = y.test(e), s = j.createElement(o ? "link" : "script");
            if (a) {
                var i = r(a) ? a(e) : a;
                i && (s.charset = i)
            }
            n(s, t, o, e), o ? (s.rel = "stylesheet", s.href = e) : (s.async = !0, s.src = e), h = s, b ? m.insertBefore(s, b) : m.appendChild(s), h = null
        }

        function n(e, r, t, n) {
            function o() {
                e.onload = e.onerror = e.onreadystatechange = null, t || seajs.data.debug || m.removeChild(e), e = null, r()
            }

            var s = "onload" in e;
            return !t || !x && s ? void(s ? (e.onload = o, e.onerror = function () {
                seajs.emit("error", {uri: n, node: e}), o()
            }) : e.onreadystatechange = function () {
                /loaded|complete/.test(e.readyState) && o()
            }) : void setTimeout(function () {
                a(e, r)
            }, 1)
        }

        function a(e, r) {
            var t, n = e.sheet;
            if (x)n && (t = !0); else if (n)try {
                n.cssRules && (t = !0)
            } catch (o) {
                "NS_ERROR_DOM_SECURITY_ERR" === o.name && (t = !0)
            }
            setTimeout(function () {
                t ? r() : a(e, r)
            }, 20)
        }

        function o(e) {
            return e.match(B)[0]
        }

        function s(e) {
            for (e = e.replace(_, "/"), e = e.replace(w, "$1/"); e.match(S);)e = e.replace(S, "/");
            return e
        }

        function i(e) {
            var r = e.length - 1, t = e.charAt(r);
            return "#" === t ? e.substring(0, r) : ".js" === e.substring(r - 2) || e.indexOf("?") > 0 || ".css" === e.substring(r - 3) || "/" === t ? e : e + ".js"
        }

        function c(e) {
            var r = E.alias;
            return r && v(r[e]) ? r[e] : e
        }

        function u(e) {
            var r, t = E.paths;
            return t && (r = e.match(T)) && v(t[r[1]]) && (e = t[r[1]] + r[2]), e
        }

        function f(e) {
            var r = E.vars;
            return r && e.indexOf("{") > -1 && (e = e.replace(A, function (e, t) {
                return v(r[t]) ? r[t] : e
            })), e
        }

        function l(e) {
            var t = E.map, n = e;
            if (t)for (var a = 0, o = t.length; o > a; a++) {
                var s = t[a];
                if (n = r(s) ? s(e) || e : e.replace(s[0], s[1]), n !== e)break
            }
            return n
        }

        function d(e, r) {
            var t, n = e.charAt(0);
            if (C.test(e))t = e; else if ("." === n)t = s((r ? o(r) : E.cwd) + e); else if ("/" === n) {
                var a = E.cwd.match(I);
                t = a ? a[0] + e.substring(1) : e
            } else t = E.base + e;
            return 0 === t.indexOf("//") && (t = location.protocol + t), t
        }

        function g(e, r) {
            if (!e)return "";
            e = c(e), e = u(e), e = f(e), e = i(e);
            var t = d(e, r);
            return t = l(t)
        }

        function p(e) {
            return e.hasAttribute ? e.src : e.getAttribute("src", 4)
        }

        var h, v = e("String"), j = document, m = j.head || j.getElementsByTagName("head")[0] || j.documentElement, b = m.getElementsByTagName("base")[0], y = /\.css(?:\?|$)/i, x = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536;
        seajs.request = t;
        var E = seajs.data, B = /[^?#]*\//, _ = /\/\.\//g, S = /\/[^/]+\/\.\.\//, w = /([^:/])\/+\//g, T = /^([^/:]+)(\/.+)$/, A = /{([^{]+)}/g, C = /^\/\/.|:\//, I = /^.*?\/\/.*?\//, j = document, O = location.href && 0 !== location.href.indexOf("about:") ? o(location.href) : "", U = j.scripts, N = j.getElementById("seajsnode") || U[U.length - 1];
        o(p(N) || O), seajs.resolve = g, define("seajs/seajs-css/1.0.4/seajs-css", [], {})
    }(), !function () {
        var e = seajs.data, r = document;
        seajs.Module.preload = function (r) {
            var t = e.preload, n = t.length;
            n ? seajs.Module.use(t, function () {
                t.splice(0, n), seajs.Module.preload(r)
            }, e.cwd + "_preload_" + e.cid()) : r()
        }, seajs.use = function (r, t) {
            return seajs.Module.preload(function () {
                seajs.Module.use(r, t, e.cwd + "_use_" + e.cid())
            }), seajs
        }, e.preload = function () {
            var e = [], t = location.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2");
            return t += " " + r.cookie, t.replace(/(seajs-\w+)=1/g, function (r, t) {
                e.push(t)
            }), e
        }(), define("seajs/seajs-preload/1.0.0/seajs-preload", [], {})
    }(), "undefined" == typeof window.jrBase && (window.jrBase = {}), "undefined" == typeof jrBase.autoSeajsConfig && (jrBase.autoSeajsConfig = !0), jrBase.getProtocol = function () {
        var e = "https:" === window.location.protocol ? "https:" : "http:";
        return e
    }, jrBase.autoSeajsConfig) {
    var seajsConfig = {
        base: jrBase.getProtocol() + "//static.360buyimg.com/finance/",
        paths: {baseProject: "//static.360buyimg.com/finance/base/1.2.0/js"},
        map: [],
        debug: 0,
        comboExcludes: /.css/
    };
    /seajsDebug/.test(location.search) && (seajsConfig.comboExcludes = /.*/), seajs.config(seajsConfig)
}
jrBase.userLogIn = !1, jrBase.loginCallBack = null, jrBase.footerFix = "undefined" != typeof jrBase.footerFix ? jrBase.footerFix : !0, jrBase.headerFix = "undefined" != typeof jrBase.headerFix ? jrBase.headerFix : !1;
var login = function () {
    return location.href = "https://passport.jd.com/new/login.aspx?ReturnUrl=" + escape(location.href).replace(/\//g, "%2F"), !1
}, regist = function () {
    return location.href = "https://reg.jd.com/reg/person?ReturnUrl=" + escape(location.href), !1
}, createCookie = function (e, r, t, n) {
    var n = n ? n : "/";
    if (t) {
        var a = new Date;
        a.setTime(a.getTime() + 24 * t * 60 * 60 * 1e3);
        var o = "; expires=" + a.toGMTString()
    } else var o = "";
    document.cookie = e + "=" + r + o + "; path=" + n
}, readCookie = function (e) {
    for (var r = e + "=", t = document.cookie.split(";"), n = 0; n < t.length; n++) {
        for (var a = t[n]; " " == a.charAt(0);)a = a.substring(1, a.length);
        if (0 == a.indexOf(r))return a.substring(r.length, a.length)
    }
    return null
}, checkLogin = function () {
    var e = jrBase.getProtocol() + "//passport.jd.com/call/getHelloJson?m=ls";
    jQuery.ajax({
        url: e, dataType: "jsonp", scriptCharset: "gb2312", success: function (e) {
            e && e.info && (e.info = e.info.replace("\u4eac\u4e1c", "\u4eac\u4e1c\u91d1\u878d"), $("#loginbar").html(e.info)), e && e.sso && $.each(e.sso, function () {
                jQuery.getJSON(this)
            })
        }
    })
};
jrBase.getUserLogin = function (e) {
    var r = jrBase.getProtocol() + "//passport.jd.com/loginservice.aspx?method=Login";
    $.ajax({
        url: r, type: "get", dataType: "jsonp", success: function (r) {
            e({isLogin: r.Identity.IsAuthenticated, pin: r.Identity.Name, unick: r.Identity.Unick})
        }
    })
}, jrBase.getUserInfo = function (e) {
    var r = jrBase.getProtocol() + "//jrvip.jd.com/async/trade/info";
    $.ajax({
        url: r, type: "get", dataType: "jsonp", success: function (r) {
            e(r)
        }
    })
}, jrBase.getUserNotification = function (e) {
    if ("https:" !== jrBase.getProtocol()) {
        var r = "//courier.jr.jd.com/mc/unreadSize";
        $.ajax({
            url: r, type: "get", dataType: "jsonp", success: function (r) {
                e(r)
            }
        })
    }
}, jrBase.parseParameter = function (e) {
    for (var r = 0, t = jrBase.getParameters(e).split("&"), n = {}; r < t.length; r++) {
        var a = t[r].split("=");
        n[a[0]] = a[1]
    }
    return n
}, jrBase.getParameters = function (e) {
    if ("undefined" == typeof e)return window.location.search.substring(1);
    if ("string" == $.type(e)) {
        var r = e.indexOf("?");
        return r >= 0 ? e.substring(r + 1) : e
    }
    return ""
}, jrBase.getParameter = function (e) {
    var r = window.location.search.substring(1);
    if (r)for (var t = 0, n = r.split("&"); t < n.length; t++) {
        var a = n[t].split("=");
        if (a[0] == e)return a[1]
    }
    return ""
}, jrBase.encodeHTML = function (e) {
    return e && "string" == typeof e ? e.replace(/\&/g, "&amp;").replace(/"/g, "&quot;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\u00A0/g, "&nbsp;").replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g, " ") : ""
}, jrBase.decodeHTML = function (e) {
    return e && "string" == typeof e ? e.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39/g, "'").replace(/&nbsp;/g, "\xa0").replace(/&#32/g, " ").replace(/&amp;/g, "&") : ""
}, jrBase.zIndex = 2e3, jrBase.getZIndex = function () {
    return jrBase.zIndex += 1
}, seajs.use(["baseProject/easing", "baseProject/nav", "baseProject/userCenter", "baseProject/search", "baseProject/headerFix", "baseProject/sidebar"], function (e, r, t, n, a, o) {
    $(document).ready(function () {
        checkLogin(), r(), t(), n(), a(), o();
        var e = ["index"];
        void 0 !== jrBase && void 0 !== jrBase.assetsId && e.toString().match(jrBase.assetsId) && seajs.use("common/unit/grapevine/1.0.0/grapevine", function (e) {
            new e
        }), seajs.use("//misc.360buyimg.com/jdf/1.0.0/unit/log/1.0.0/log.js")
    })
});