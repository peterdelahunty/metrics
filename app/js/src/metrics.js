define(['math', 'purl', 'ua-parser', 'metrics-impl'], function (math, purl, UAParser, metricsImpl) {


    var MODULE = (function () {

        function readCookies() {
            var cookieStr = document.cookie,list = cookieStr.split('; '),i, nv,  cookies = {};

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
            if (domain !== undefined) {
                c.push("; domain=" + domain)
            }
            c = c.join('');
            document.cookie = c;
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

        function parseURLS() {

            var obj = {};

            var parsedUrl = purl(window.location.href);

            obj.url = {
                src: parsedUrl.attr("source"),
                pro: parsedUrl.attr("protocol"),
                domain: parsedUrl.attr("host"),
                port: parsedUrl.attr("port") || "",
                path: parsedUrl.attr("path") || "",
                query: parsedUrl.param() || {},
                hash: parsedUrl.attr("anchor") || ""
            };

            var referrer = document.referrer;
            if (referrer !== undefined && referrer != "") {
                parsedUrl = purl(referrer);
                obj.ref = {
                    src: parsedUrl.attr("source"),
                    pro: parsedUrl.attr("protocol"),
                    domain: parsedUrl.attr("host"),
                    port: parsedUrl.attr("port") || "",
                    path: parsedUrl.attr("path") || "",
                    query: parsedUrl.param() || {},
                    hash: parsedUrl.attr("anchor") || ""
                };
            }

            return obj;
        }

        var my = {},
            sid = "",
            cid = "",
            uid = "",
            domain = "",

            cookies = readCookies(),
            sessionExpiry = getSessionExpiry(),
            clientExpiry = getClientExpiry(),
            urlObj = parseURLS(),

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

            env = new UAParser().getResult();
        env.screen = window.screen.width + "x" + window.screen.height;
        env.tz = new Date().getTimezoneOffset() / 60;


        my.identify = function identify(newUid) {
            uid = newUid;
            writeCookie(MetricsCookieNames.USER_COOKIE_NAME, uid, sessionExpiry, domain);
        };

        my.unidentify = function unidentify() {
            var expireTime = new Date();
            expireTime.setSeconds(expireTime.getSeconds() + 10);
            uid = "";
            writeCookie(MetricsCookieNames.USER_COOKIE_NAME, "", expireTime, domain);
        };

        my.recordPageView = function recordPageView(data) {
            this.record(MetricsEventNames.PAGE_VIEW, data);
        };

        my.record = function record(name, data) {

            var event = {
                url: urlObj.url,
                usr: {
                    uid: uid || "",
                    cid: cid || "",
                    sid: sid || ""
                },
                env: env,
                data: data
            }

            if (data) {
                event.data = data;
            }

            if (urlObj.ref !== undefined) {
                event.ref = urlObj.ref;
            }

            metricsImpl.record(name, event);

        };

        my.init = function init(newDomain) {

            domain = newDomain;

            var visitCookie = cookies[MetricsCookieNames.VISITOR_COOKIE_NAME],
                cidCookie = cookies[MetricsCookieNames.CLIENT_COOKIE_NAME],
                sidCookie = cookies[MetricsCookieNames.SESSION_COOKIE_NAME],
                uidCookie = cookies[MetricsCookieNames.USER_COOKIE_NAME];

            if (uidCookie !== undefined) {
                uid = uidCookie;
            }

            if (sidCookie === undefined) {
                sid = math.uuid();
            } else {
                sid = sidCookie;
            }
            writeCookie(MetricsCookieNames.SESSION_COOKIE_NAME, sid, sessionExpiry, domain);

            if (cidCookie === undefined) {
                cid = math.uuid();
                writeCookie(MetricsCookieNames.CLIENT_COOKIE_NAME, cid, clientExpiry, domain);
                this.record(MetricsEventNames.NEW_VISITOR);
            } else {
                cid = cidCookie;
                if (visitCookie === undefined) {
                    this.record(MetricsEventNames.RETURNING_VISITOR);
                }
            }

            if (visitCookie === undefined) {
                this.record(MetricsEventNames.VISITED_SITE);
                writeCookie(MetricsCookieNames.VISITOR_COOKIE_NAME, "1", sessionExpiry, domain);
            }

        };

        return my;
    }());


    window.Metrics = MODULE;
    return MODULE;

});