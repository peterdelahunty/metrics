require(['math','purl','ua-parser','metrics-impl'],function(math,purl,UAParser,metricsImpl){

    function readCookies(){
        var i,nv,list = document.cookie.split('; '),cookies = {};
        for(i=list.length-1; i>=0; i--){
            nv = list[i].split('=');
            if(nv.length > 1){
                var n = nv[0];
                var v = nv[1];
                cookies[n] = decodeURIComponent(v.replace(/\+/g, ' '));
            }
        }
        return cookies;
    }

    function writeCookie(key,value,expires){
        var c = [encodeURIComponent(key),"=",encodeURIComponent(value),"; expires=" + expires.toUTCString(),"; path=/"].join('');
        document.cookie = c;
    }

    function getSessionExpiry(){
        var expireTime = new Date()
        expireTime.setMinutes(expireTime.getMinutes()+30);
        return expireTime;
    }

    function getClientExpiry(){
        var expireTime = new Date()
        expireTime.setDate(expireTime.getDate() + 3650);
        return expireTime;
    }

    var cookies = readCookies(),
        cookie,
        sessionExpiry = getSessionExpiry(),
        clientExpiry = getClientExpiry(),

    Metrics = {
        sid:"",
        cid:"",
        uid:"",

        init: function(){
            this.env = new UAParser().getResult();
            this.env.screen = window.screen.width + "x" + window.screen.height;
            this.env.tz = new Date().getTimezoneOffset() / 60;
            var parsedUrl = purl(window.location.href);

            this.url = {
                src: parsedUrl.attr("source"),
                https: !!(parsedUrl.attr("protocol") == 'https'),
                domain: parsedUrl.attr("host"),
                port: parsedUrl.attr("port") || "",
                path: parsedUrl.attr("path") || "",
                query: parsedUrl.param() || {},
                hash: parsedUrl.attr("anchor") || ""
            };

            var referrer = document.referrer;
            if(typeof(referrer) !== 'undefined' && referrer !== ""){
                parsedUrl = purl(referrer);
                this.refurl = {
                    src: parsedUrl.attr("source"),
                    https: !!(parsedUrl.attr("protocol") == 'https'),
                    domain: parsedUrl.attr("host"),
                    port: parsedUrl.attr("port") || "",
                    path: parsedUrl.attr("path") || "",
                    query: parsedUrl.param() || {},
                    hash: parsedUrl.attr("anchor") || ""
                };
            }

        },

        getUser: function(){
            return {
                uid: this.uid || "",
                cid: this.cid || "",
                sid: this.sid || ""
            };
        },


        record: function (name,data) {

            var event = {
                url : this.url,
                usr : this.getUser(),
                env : this.env,
                data: data
            }

            if(data){
                event.data = data;
            }

            if(this.refurl){
                event.ref = this.refurl;
            }

            metricsImpl.record(name,event);

        }
    };
    Metrics.init();

    cookie = cookies["cid"];
    if(cookie == undefined){
        Metrics.cid = math.uuid();
        writeCookie("cid", Metrics.cid,clientExpiry);
    }else{
        Metrics.cid = cookie;
    }

    cookie = cookies["sid"];
    if(cookie == undefined){
        Metrics.sid = math.uuid();
    }else{
        Metrics.sid = cookie;
    }
    writeCookie("sid", Metrics.sid,sessionExpiry);

    var vs = cookies["vs"];
    if(vs == undefined){
        Metrics.record('Visited Site');
        writeCookie("vs", "1",sessionExpiry);
    }

    window.Metrics = Metrics;
    return Metrics;

});