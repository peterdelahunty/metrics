define(['math', 'purl', 'ua-parser', 'metrics-impl'], function (math, purl, UAParser, metricsImpl) {

    function readCookies() {
        var i, nv, list = document.cookie.split('; '), cookies = {};
        for (i = list.length - 1; i >= 0; i--) {
            nv = list[i].split('=');
            if (nv.length > 1) {
                var n = nv[0];
                var v = nv[1];
                cookies[n] = decodeURIComponent(v.replace(/\+/g, ' '));
            }
        }
        return cookies;
    }

    function writeCookie(key, value, expires, domain) {
        //var c = [encodeURIComponent(key),"=",encodeURIComponent(value),"; domain=" + domain,"; expires=" + expires.toUTCString(),"; path=/"].join('');
        var c = [encodeURIComponent(key), "=", encodeURIComponent(value), "; expires=" + expires.toUTCString(), "; path=/"]
        if (domain) {
            c.push("; domain=" + domain)
        }
        c = c.join('');
        document.cookie = c;
    }

    function getDomain() {
        var full = document.location.host.toLowerCase().split(":")[0];
        var parts = full.split(".");
        var part = parts.shift();
        if (parts.length === 0) {
            return "";
        }
        return parts.join(".");
    }

    function getSessionExpiry() {
        var expireTime = new Date()
        expireTime.setMinutes(expireTime.getMinutes() + 30);
        return expireTime;
    }

    function getClientExpiry() {
        var expireTime = new Date()
        expireTime.setDate(expireTime.getDate() + 3650);
        return expireTime;
    }

    var cookies = readCookies(),
        sidCookie,
        cidCookie,
        uidCookie,
        visitCookie,
        domain = getDomain(),
        sessionExpiry = getSessionExpiry(),
        clientExpiry = getClientExpiry(),

        MetricsEventNames = {
            VISITED_SITE: 'visited site',
            NEW_VISITOR: 'new visitor',
            RETURNING_VISITOR: 'returning visitor',
            PAGE_VIEW: 'page view'
        },

        MetricsCookieNames = {
            USER_COOKIE_NAME: 'm_uid',
            CLIENT_COOKIE_NAME: 'm_cid',
            SESSION_COOKIE_NAME: 'm_sid',
            VISITOR_COOKIE_NAME: 'm_vs'
        },

        Metrics = {
            sid: "",
            cid: "",
            uid: "",

            init: function () {
                this.env = new UAParser().getResult();
                this.env.screen = window.screen.width + "x" + window.screen.height;
                this.env.tz = new Date().getTimezoneOffset() / 60;
                var parsedUrl = purl(window.location.href);

                this.url = {
                    src: parsedUrl.attr("source"),
                    pro: parsedUrl.attr("protocol"),
                    domain: parsedUrl.attr("host"),
                    port: parsedUrl.attr("port") || "",
                    path: parsedUrl.attr("path") || "",
                    query: parsedUrl.param() || {},
                    hash: parsedUrl.attr("anchor") || ""
                };

                var referrer = document.referrer;
                if (typeof(referrer) !== 'undefined' && referrer !== "") {
                    parsedUrl = purl(referrer);
                    this.refurl = {
                        src: parsedUrl.attr("source"),
                        pro: parsedUrl.attr("protocol"),
                        domain: parsedUrl.attr("host"),
                        port: parsedUrl.attr("port") || "",
                        path: parsedUrl.attr("path") || "",
                        query: parsedUrl.param() || {},
                        hash: parsedUrl.attr("anchor") || ""
                    };
                }

            },

            getUser: function () {
                return {
                    uid: this.uid || "",
                    cid: this.cid || "",
                    sid: this.sid || ""
                };
            },

            identify: function (uid) {
                Metrics.uid = uid;
                writeCookie(MetricsCookieNames.USER_COOKIE_NAME, Metrics.uid, sessionExpiry, domain);
            },

            unidentify: function () {
                var expireTime = new Date()
                expireTime.setSeconds(expireTime.getSeconds() + 10);
                Metrics.uid = "";
                writeCookie(MetricsCookieNames.USER_COOKIE_NAME, "", expireTime, domain);
            },

            recordPageView: function (data) {
                this.record(MetricsEventNames.PAGE_VIEW, data);
            },

            record: function (name, data) {

                var event = {
                    url: this.url,
                    usr: this.getUser(),
                    env: this.env,
                    data: data
                }

                if (data) {
                    event.data = data;
                }

                if (this.refurl) {
                    event.ref = this.refurl;
                }

                metricsImpl.record(name, event);

            }
        };
    Metrics.init();

    cidCookie = cookies[MetricsCookieNames.CLIENT_COOKIE_NAME];
    sidCookie = cookies[MetricsCookieNames.SESSION_COOKIE_NAME];
    uidCookie = cookies[MetricsCookieNames.USER_COOKIE_NAME];
    visitCookie = cookies[MetricsEventNames.VISITED_SITE];

    if (uidCookie !== undefined) {
        Metrics.uid = uidCookie;
    }

    if (sidCookie == undefined) {
        Metrics.sid = math.uuid();
    } else {
        Metrics.sid = sidCookie;
    }
    writeCookie(MetricsCookieNames.SESSION_COOKIE_NAME, Metrics.sid, sessionExpiry, domain);

    if (cidCookie == undefined) {
        Metrics.cid = math.uuid();
        writeCookie(MetricsCookieNames.CLIENT_COOKIE_NAME, Metrics.cid, clientExpiry, domain);
        Metrics.record(MetricsEventNames.NEW_VISITOR);
    } else {
        Metrics.cid = cidCookie;
        if (visitCookie == undefined) {
            Metrics.record(MetricsEventNames.RETURNING_VISITOR);
        }
    }

    if (visitCookie == undefined) {
        Metrics.record(MetricsEventNames.VISITED_SITE);
        writeCookie(MetricsCookieNames.VISITOR_COOKIE_NAME, "1", sessionExpiry, domain);
    }

    window.Metrics = Metrics;
    return Metrics;

});