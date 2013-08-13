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
        expireTime.setMinutes(expireTime.getDate() + 3650);
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
        referrer: document.referrer,
        env:{},
        url:{},

        init: function(){
            this.env = new UAParser().getResult();
            this.env.screen = window.screen.width + "x" + window.screen.height;
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
        },

        getVisitor: function(){
            return {
                uid: this.uid || "",
                cid: this.cid || "",
                sid: this.sid || ""
            };
        },

        record: function (name,data) {

            var event = {
                url : this.url,
                ref : this.referrer || "Direct",
                vid : this.getVisitor(),
                env : this.env,
                data: data
            }

            metricsImpl.record(name,event);


        }
    };
    Metrics.init();

    cookie = cookies["cid"];
    if(cookie == undefined){
        console.log("new cid");
        Metrics.cid = math.uuid();
        writeCookie("cid", Metrics.cid,clientExpiry);
    }else{
        Metrics.cid = cookie;
    }

    cookie = cookies["sid"];
    if(cookie == undefined){
        console.log("new sid");
        Metrics.sid = math.uuid();
    }else{
        console.log("renew sid expiry");
        Metrics.sid = cookie;
    }
    writeCookie("sid", Metrics.sid,sessionExpiry);

    var vs = cookies["vs"];
    if(vs == undefined){
        Metrics.record('Visited Site',{});
        writeCookie("vs", "1",sessionExpiry);
    }

    window.Metrics = Metrics;
    return Metrics;

});