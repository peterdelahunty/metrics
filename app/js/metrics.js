/*!
 Math.uuid.js (v1.4)
 http://www.broofa.com
 mailto:robert@broofa.com

 Copyright (c) 2010 Robert Kieffer
 Dual licensed under the MIT and GPL licenses.
 */

/*
 * Purl (A JavaScript URL parser) v2.3.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */

// UAParser.js v0.6.2
// Lightweight JavaScript-based User-Agent string parser
// https://github.com/faisalman/ua-parser-js
//
// Copyright © 2012-2013 Faisalman <fyzlman@gmail.com>
// Dual licensed under GPLv2 & MIT

(function(){var e="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");Math.uuid=function(t,n){var r=e,i=[],s;n=n||r.length;if(t)for(s=0;s<t;s++)i[s]=r[0|Math.random()*n];else{var o;i[8]=i[13]=i[18]=i[23]="-",i[14]="4";for(s=0;s<36;s++)i[s]||(o=0|Math.random()*16,i[s]=r[s==19?o&3|8:o])}return i.join("")},Math.uuidFast=function(){var t=e,n=new Array(36),r=0,i;for(var s=0;s<36;s++)s==8||s==13||s==18||s==23?n[s]="-":s==14?n[s]="4":(r<=2&&(r=33554432+Math.random()*16777216|0),i=r&15,r>>=4,n[s]=t[s==19?i&3|8:i]);return n.join("")},Math.uuidCompact=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=Math.random()*16|0,n=e=="x"?t:t&3|8;return n.toString(16)})}})(),define("math",function(e){return function(){var t,n;return t||e.Math}}(this)),function(e){typeof define=="function"&&define.amd?define("purl",e):window.purl=e()}(function(){function s(e,n){var i=decodeURI(e),s=r[n||!1?"strict":"loose"].exec(i),o={attr:{},param:{},seg:{}},u=14;while(u--)o.attr[t[u]]=s[u]||"";return o.param.query=l(o.attr.query),o.param.fragment=l(o.attr.fragment),o.seg.path=o.attr.path.replace(/^\/+|\/+$/g,"").split("/"),o.seg.fragment=o.attr.fragment.replace(/^\/+|\/+$/g,"").split("/"),o.attr.base=o.attr.host?(o.attr.protocol?o.attr.protocol+"://"+o.attr.host:o.attr.host)+(o.attr.port?":"+o.attr.port:""):"",o}function o(t){var n=t.tagName;return typeof n!="undefined"?e[n.toLowerCase()]:n}function u(e,t){if(e[t].length===0)return e[t]={};var n={};for(var r in e[t])n[r]=e[t][r];return e[t]=n,n}function a(e,t,n,r){var s=e.shift();if(!s)d(t[n])?t[n].push(r):"object"==typeof t[n]?t[n]=r:"undefined"==typeof t[n]?t[n]=r:t[n]=[t[n],r];else{var o=t[n]=t[n]||[];"]"==s?d(o)?""!==r&&o.push(r):"object"==typeof o?o[v(o).length]=r:o=t[n]=[t[n],r]:~s.indexOf("]")?(s=s.substr(0,s.length-1),!i.test(s)&&d(o)&&(o=u(t,n)),a(e,o,s,r)):(!i.test(s)&&d(o)&&(o=u(t,n)),a(e,o,s,r))}}function f(e,t,n){if(~t.indexOf("]")){var r=t.split("[");a(r,e,"base",n)}else{if(!i.test(t)&&d(e.base)){var s={};for(var o in e.base)s[o]=e.base[o];e.base=s}t!==""&&c(e.base,t,n)}return e}function l(e){return p(String(e).split(/&|;/),function(e,t){try{t=decodeURIComponent(t.replace(/\+/g," "))}catch(n){}var r=t.indexOf("="),i=h(t),s=t.substr(0,i||r),o=t.substr(i||r,t.length);return o=o.substr(o.indexOf("=")+1,o.length),s===""&&(s=t,o=""),f(e,s,o)},{base:{}}).base}function c(e,t,n){var r=e[t];typeof r=="undefined"?e[t]=n:d(r)?r.push(n):e[t]=[r,n]}function h(e){var t=e.length,n,r;for(var i=0;i<t;++i){r=e[i],"]"==r&&(n=!1),"["==r&&(n=!0);if("="==r&&!n)return i}}function p(e,t){var n=0,r=e.length>>0,i=arguments[2];while(n<r)n in e&&(i=t.call(undefined,i,e[n],n,e)),++n;return i}function d(e){return Object.prototype.toString.call(e)==="[object Array]"}function v(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t}function m(e,t){return arguments.length===1&&e===!0&&(t=!0,e=undefined),t=t||!1,e=e||window.location.toString(),{data:s(e,t),attr:function(e){return e=n[e]||e,typeof e!="undefined"?this.data.attr[e]:this.data.attr},param:function(e){return typeof e!="undefined"?this.data.param.query[e]:this.data.param.query},fparam:function(e){return typeof e!="undefined"?this.data.param.fragment[e]:this.data.param.fragment},segment:function(e){return typeof e=="undefined"?this.data.seg.path:(e=e<0?this.data.seg.path.length+e:e-1,this.data.seg.path[e])},fsegment:function(e){return typeof e=="undefined"?this.data.seg.fragment:(e=e<0?this.data.seg.fragment.length+e:e-1,this.data.seg.fragment[e])}}}var e={a:"href",img:"src",form:"action",base:"href",script:"src",iframe:"src",link:"href"},t=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","fragment"],n={anchor:"fragment"},r={strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},i=/^[0-9]+$/;return m.jQuery=function(e){e!=null&&(e.fn.url=function(t){var n="";return this.length&&(n=e(this).attr(o(this[0]))||""),m(n,t)},e.url=m)},m.jQuery(window.jQuery),m}),function(e,t){var n="",r="?",i="function",s="undefined",o="object",u="major",a="model",f="name",l="type",c="vendor",h="version",p="architecture",d="console",v="mobile",m="tablet",g={has:function(e,t){return t.toLowerCase().indexOf(e.toLowerCase())!==-1},lowerize:function(e){return e.toLowerCase()}},y={rgx:function(){for(var e,n=0,r,u,a,f,l,c,h=arguments;n<h.length;n+=2){var p=h[n],d=h[n+1];if(typeof e===s){e={};for(a in d)f=d[a],typeof f===o?e[f[0]]=t:e[f]=t}for(r=u=0;r<p.length;r++){l=p[r].exec(this.getUA());if(!!l){for(a in d)c=l[++u],f=d[a],typeof f===o&&f.length>0?f.length==2?typeof f[1]==i?e[f[0]]=f[1].call(this,c):e[f[0]]=f[1]:f.length==3?typeof f[1]===i&&(!f[1].exec||!f[1].test)?e[f[0]]=c?f[1].call(this,c,f[2]):t:e[f[0]]=c?c.replace(f[1],f[2]):t:f.length==4&&(e[f[0]]=c?f[3].call(this,c.replace(f[1],f[2])):t):e[f]=c?c:t;break}}if(!!l)break}return e},str:function(e,n){for(var i in n)if(typeof n[i]===o&&n[i].length>0){for(var s=0;s<n[i].length;s++)if(g.has(n[i][s],e))return i===r?t:i}else if(g.has(n[i],e))return i===r?t:i;return e}},b={browser:{oldsafari:{major:{1:["/8","/1","/3"],2:"/4","?":"/"},version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",RT:"ARM"}}}},w={browser:[[/(opera\smini)\/((\d+)?[\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i,/(opera).+version\/((\d+)?[\w\.]+)/i,/(opera)[\/\s]+((\d+)?[\w\.]+)/i],[f,h,u],[/\s(opr)\/((\d+)?[\w\.]+)/i],[[f,"Opera"],h,u],[/(kindle)\/((\d+)?[\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i,/(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i,/(rekonq)((?:\/)[\w\.]+)*/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\/((\d+)?[\w\.-]+)/i],[f,h,u],[/(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i],[[f,"IE"],h,u],[/(yabrowser)\/((\d+)?[\w\.]+)/i],[[f,"Yandex"],h,u],[/(comodo_dragon)\/((\d+)?[\w\.]+)/i],[[f,/_/g," "],h,u],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i],[f,h,u],[/(dolfin)\/((\d+)?[\w\.]+)/i],[[f,"Dolphin"],h,u],[/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i],[[f,"Chrome"],h,u],[/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i],[h,u,[f,"Mobile Safari"]],[/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i],[h,u,f],[/webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i],[f,[u,y.str,b.browser.oldsafari.major],[h,y.str,b.browser.oldsafari.version]],[/(konqueror)\/((\d+)?[\w\.]+)/i,/(webkit|khtml)\/((\d+)?[\w\.]+)/i],[f,h,u],[/(navigator|netscape)\/((\d+)?[\w\.-]+)/i],[[f,"Netscape"],h,u],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i,/(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i,/(uc\s?browser|polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i,/(links)\s\(((\d+)?[\w\.]+)/i,/(gobrowser)\/?((\d+)?[\w\.]+)*/i,/(ice\s?browser)\/v?((\d+)?[\w\._]+)/i,/(mosaic)[\/\s]((\d+)?[\w\.]+)/i],[f,h,u]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[p,"amd64"]],[/((?:i[346]|x)86)[;\)]/i],[[p,"ia32"]],[/windows\s(ce|mobile);\sppc;/i],[[p,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[p,/ower/,"",g.lowerize]],[/(sun4\w)[;\)]/i],[[p,"sparc"]],[/(ia64(?=;)|68k(?=\))|arm(?=v\d+;)|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[p,g.lowerize]],device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],[a,c,[l,m]],[/(hp).+(touchpad)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[c,a,[l,m]],[/\((ip[honed]+);.+(apple)/i],[a,c,[l,v]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola)[\s_-]?([\w-]+)*/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[c,a,[l,v]],[/\((bb10);\s(\w+)/i],[[c,"BlackBerry"],a,[l,v]],[/android.+((transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+))/i],[[c,"Asus"],a,[l,m]],[/(sony)\s(tablet\s[ps])/i],[c,a,[l,m]],[/(nintendo)\s([wids3u]+)/i],[c,a,[l,d]],[/((playstation)\s[3portablevi]+)/i],[[c,"Sony"],a,[l,d]],[/(sprint\s(\w+))/i],[[c,y.str,b.device.sprint.vendor],[a,y.str,b.device.sprint.model],[l,v]],[/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,/(zte)-(\w+)*/i,/(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],[c,[a,/_/g," "],[l,v]],[/\s((milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?))[\w\s]+build\//i,/(mot)[\s-]?(\w+)*/i],[[c,"Motorola"],a,[l,v]],[/android.+\s((mz60\d|xoom[\s2]{0,2}))\sbuild\//i],[[c,"Motorola"],a,[l,m]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9))/i],[[c,"Samsung"],a,[l,m]],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,/sec-((sgh\w+))/i],[[c,"Samsung"],a,[l,v]],[/(sie)-(\w+)*/i],[[c,"Siemens"],a,[l,v]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]+)*/i],[[c,"Nokia"],a,[l,v]],[/android\s3\.[\s\w-;]{10}((a\d{3}))/i],[[c,"Acer"],a,[l,m]],[/android\s3\.[\s\w-;]{10}(lg?)-([06cv9]{3,4})/i],[[c,"LG"],a,[l,m]],[/((nexus\s4))/i,/(lg)[e;\s-\/]+(\w+)*/i],[[c,"LG"],a,[l,v]],[/(mobile|tablet);.+rv\:.+gecko\//i],[l,c,a]],engine:[[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[f,h],[/rv\:([\w\.]+).*(gecko)/i],[h,f]],os:[[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[f,[h,y.str,b.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[f,"Windows"],[h,y.str,b.os.windows.version]],[/\((bb)(10);/i],[[f,"BlackBerry"],h],[/(blackberry)\w*\/?([\w\.]+)*/i,/(tizen)\/([\w\.]+)/i,/(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i],[f,h],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],[[f,"Symbian"],h],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[f,"Firefox OS"],h],[/(nintendo|playstation)\s([wids3portablevu]+)/i,/(mint)[\/\s\(]?(\w+)*/i,/(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i,/(hurd|linux)\s?([\w\.]+)*/i,/(gnu)\s?([\w\.]+)*/i],[f,h],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[f,"Chromium OS"],h],[/(sunos)\s?([\w\.]+\d)*/i],[[f,"Solaris"],h],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],[f,h],[/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],[[f,"iOS"],[h,/_/g,"."]],[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i],[f,[h,/_/g,"."]],[/(haiku)\s(\w+)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,/(macintosh|mac(?=_powerpc)|plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos)/i,/(unix)\s?([\w\.]+)*/i],[f,h]]},E=function(t){var r=t||(e&&e.navigator&&e.navigator.userAgent?e.navigator.userAgent:n);if(!(this instanceof E))return(new E(t)).getResult();this.getBrowser=function(){return y.rgx.apply(this,w.browser)},this.getCPU=function(){return y.rgx.apply(this,w.cpu)},this.getDevice=function(){return y.rgx.apply(this,w.device)},this.getEngine=function(){return y.rgx.apply(this,w.engine)},this.getOS=function(){return y.rgx.apply(this,w.os)},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return r},this.setUA=function(e){return r=e,this},this.setUA(r)};if(typeof exports!==s)typeof module!==s&&module.exports&&(exports=module.exports=E),exports.UAParser=E;else{e.UAParser=E,typeof define===i&&define.amd&&define("ua-parser",[],function(){return E});if(typeof e.jQuery!==s){var S=e.jQuery,x=new E;S.ua=x.getResult(),S.ua.get=function(){return x.getUA()},S.ua.set=function(e){x.setUA(e);var t=x.getResult();for(var n in t)S.ua[n]=t[n]}}}}(this),define("metrics-impl",[],function(){return{record:function(e,t){console&&console.log(e+" : "+JSON.stringify(t)),typeof Keen!="undefined"&&Keen.addEvent(e,t)}}}),define("metrics",["math","purl","ua-parser","metrics-impl"],function(e,t,n,r){var i=function(){function i(){var e,t,n=document.cookie.split("; "),r={};for(e=n.length-1;e>=0;e--){t=n[e].split("=");if(t.length>1){var i=t[0],s=t[1];r[i]=decodeURIComponent(s.replace(/\+/g," "))}}return r}function s(e,t,n,r){var i=[encodeURIComponent(e),"=",encodeURIComponent(t),"; expires="+n.toUTCString(),"; path=/"];r&&i.push("; domain="+r),i=i.join(""),document.cookie=i}function o(){var e=new Date;return e.setMinutes(e.getMinutes()+30),e}function u(){var e=new Date;return e.setDate(e.getDate()+3650),e}function a(){var e={},n=t(window.location.href);e.url={src:n.attr("source"),pro:n.attr("protocol"),domain:n.attr("host"),port:n.attr("port")||"",path:n.attr("path")||"",query:n.param()||{},hash:n.attr("anchor")||""};var r=document.referrer;return typeof r!="undefined"&&r!==""&&(n=t(r),e.ref={src:n.attr("source"),pro:n.attr("protocol"),domain:n.attr("host"),port:n.attr("port")||"",path:n.attr("path")||"",query:n.param()||{},hash:n.attr("anchor")||""}),e}var f={},l="",c="",h="",p="",d=i(),v=o(),m=u(),g=a(),y={VISITED_SITE:"visited site",NEW_VISITOR:"new visitor",RETURNING_VISITOR:"returning visitor",PAGE_VIEW:"page view"},b={USER_COOKIE_NAME:"m_uid",CLIENT_COOKIE_NAME:"m_cid",SESSION_COOKIE_NAME:"m_sid",VISITOR_COOKIE_NAME:"m_vs"},w=(new n).getResult();return w.screen=window.screen.width+"x"+window.screen.height,w.tz=(new Date).getTimezoneOffset()/60,f.identify=function(t){h=t,s(b.USER_COOKIE_NAME,h,v,p)},f.unidentify=function(){var t=new Date;t.setSeconds(t.getSeconds()+10),h="",s(b.USER_COOKIE_NAME,"",t,p)},f.recordPageView=function(t){this.record(y.PAGE_VIEW,t)},f.record=function(t,n){var i={url:g.url,usr:{uid:h||"",cid:c||"",sid:l||""},env:w,data:n};n&&(i.data=n),this.refurl&&(i.ref=g.ref),r.record(t,i)},f.init=function(n){p=n;var r=d[b.VISITOR_COOKIE_NAME],i=d[b.CLIENT_COOKIE_NAME],o=d[b.SESSION_COOKIE_NAME],u=d[b.USER_COOKIE_NAME];u!==undefined&&(h=u),o==undefined?l=e.uuid():l=o,s(b.SESSION_COOKIE_NAME,l,v,p),console&&console.log("writing session cookie"),i==undefined?(c=e.uuid(),s(b.CLIENT_COOKIE_NAME,c,m,p),this.record(y.NEW_VISITOR),console&&console.log("writing client cookie")):(c=i,r==undefined&&this.record(y.RETURNING_VISITOR)),r==undefined&&(this.record(y.VISITED_SITE),s(b.VISITOR_COOKIE_NAME,"1",v,p),console&&console.log("writing visit cookie"))},f}();return window.Metrics=i,i});