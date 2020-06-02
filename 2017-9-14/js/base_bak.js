"use strict";

/*
 | ------------------------------------------
 | 公用函数
 | @by chenjun
 | 创建时间：2016-1-10
 | 最后更新时间：2017年9月25日15:47:11
 | ------------------------------------------
 | 函数目的：
 |	处理时间，字符串，数字，非空，页面传值等js未扩展的一些函数
 | ------------------------------------------
 |	调用方式：
 |	使用base对象访问
 | ------------------------------------------
 */

var base = {

    /**
     * 通过key获取浏览器的参数
     * @param paras 	参数名
     * @param _url		浏览器地址（可选参数）
     * @returns {*}	参数值
     */
    getParmar: function getParmar(paras, _url) {
        var url = location.href;
        if (_url) url = _url;
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {};
        for (var i = 0, j = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        var returnValue = paraObj[paras.toLowerCase()];

        return returnValue;
    },

    /**
     * 获取string的长度，可以传中文
     * @param val			字符串
     * @returns {number}	长度
     */
    getByteLen: function getByteLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            if (val[i].match(/[^\x00-\xff]/ig) != null) //全角
                len += 2;else len += 1;
        };
        return len;
    },

    /**
     * 截取string，超出省略，可以传中文
     * @param str		字符串
     * @param num		截取长度
     * @returns {*}	截取后字符串
     */
    cutStrForNum: function cutStrForNum(str, num) {
        var len = 0;
        var index = 0;
        var newStr = "";
        for (var i = 0; i < str.length; i++) {
            if (str[i].match(/[^\x00-\xff]/ig) != null) //全角
                len += 2;else len += 1;
            index++;
            if (len >= num) {
                break;
            }
        }
        if (len >= num) newStr = str.substring(0, index) + "...";else newStr = str;
        return newStr;
    },

    /**
     * 判断中文
     * @param str
     * @returns {boolean}
     */
    isChinese: function isChinese(str) {
        var reg = /^[\u4E00-\u9FA5]+$/;
        if (!reg.test(str)) {
            // console.log("不是中文");
            return false;
        }
        // console.log("中文");
        return true;
    },

    /**
     * 随机任意位数的值
     * @param length		位数
     * @returns {number}	随机数
     */
    mathRandom: function mathRandom(length) {
        var num = 0;
        for (var i = 0; i < length; i++) {
            num += Math.floor(Math.random() * 10);
        }
        return num;
    },

    /**
     * 保留2位小数
     * @param oNum			原始数值 {number}
     * @returns {number}	新数值
     */
    twoDecimal: function twoDecimal(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    },

    /**
     * 通过name删除本地cookie
     * @param name		cookie名
     */
    delCookie: function delCookie(name) {
        document.cookie = name + "=;expires=" + new Date(0).toGMTString();
    },

    /**
     * 通过name获取本地cookie
     * @param objName	cookie名
     */
    getCookie: function getCookie(objName) {
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == objName) return unescape(temp[1]);
        }
    },

    /**
     * 设置本地cookie
     * @param name		cookie名
     * @param value		cookie值
     * @param day		cookie保存天数
     */
    setCookie: function setCookie(name, value, day) {
        if (day == null || day == "" || day == undefined) day = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },

    /**
     * 生成一个UUID
     * @returns {string}
     */
    getUuid: function getUuid() {
        var len = 32; //32长度
        var radix = 16; //16进制
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');var uuid = [],
            i;radix = radix || chars.length;if (len) {
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            var r;uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';uuid[14] = '4';for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    },

    /**
     * 时间戳格式化函数
     * @param nS	秒数时间戳（非js时间戳，js时间戳是毫秒数，需要/=1000
     * @returns {string}
     */
    toLocalTime: function toLocalTime(nS) {
        var date = new Date(parseInt(nS) * 1000);
        var myDate = base.addZero(date.getMonth() + 1) + "月" + base.addZero(date.getDate()) + "日";
        var _linkDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return [myDate, date, _linkDate];
    },

    /**
     * 小于9补0函数
     * @param num		原始数值
     * @returns {*}	新数值
     */
    addZero: function addZero(num) {
        var str = num.toString();
        if (str.length == 1) return "0" + num;else return num;
    },

    /**
     * 去0函数
     * @param num	原始数值
     * @returns {*}	新数值
     */
    splitZero: function splitZero(num) {
        var str = num.toString();
        if (str.length >= 2) {
            if (str.substring(0, 1) == '0') {
                return str.substring(1);
            } else {
                return num;
            }
        } else return num;
    },

    /**
     * 随机数 传数字区间
     * @param smin		最小值
     * @param smax		最大值
     * @returns {*}	随机值
     */
    random_num: function random_num(smin, smax) {
        var Range = smax - smin;
        var Rand = Math.random();
        return smin + Math.round(Rand * Range);
    },

    /**
     * unicode转码
     * @param str
     * @returns {string}
     */
    encodeUnicode: function encodeUnicode(str) {
        var res = [];
        for (var i = 0; i < str.length; i++) {
            res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
        }
        return "\\u" + res.join("\\u");
    },

    /**
     * unicode解码
     * @param str
     */
    decodeUnicode: function decodeUnicode(str) {
        str = str.replace(/\\/g, "%");
        return unescape(str);
    },

    /**
     * 金额格式化
     * @param number
     * @param places
     * @param symbol
     * @param thousand
     * @param decimal
     * @returns {string}
     */
    formatMoney: function formatMoney(number, places, symbol, thousand, decimal) {
        number = number || 0;
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "$";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var j;
        var negative = number < 0 ? "-" : "",
            i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    },

    /**
     * 阶层
     * @param n			值
     * @returns {number}
     */
    factorial: function factorial(n) {
        return n > 1 ? n * this.factorial(n - 1) : 1;
    },

    /**
     * 组合数
     * @param nu
     * @param groupl
     * @param result
     * @returns {*}
     */
    group: function group(nu, groupl, result) {

        var result = result ? result : [];
        var nul = nu.length;
        var outloopl = nul - groupl;

        var nuc = nu.slice(0);

        var item = nuc.shift();
        item = item.constructor === Array ? item : [item];

        (function func(item, nuc) {
            var itemc;
            var nucc = nuc.slice(0);
            var margin = groupl - item.length;

            if (margin == 0) {
                result.push(item);
                return;
            }
            if (margin == 1) {
                for (var j in nuc) {
                    itemc = item.slice(0);
                    itemc.push(nuc[j]);
                    result.push(itemc);
                }
            }
            if (margin > 1) {
                itemc = item.slice(0);
                itemc.push(nucc.shift());
                func(itemc, nucc);

                if (item.length + nucc.length >= groupl) {
                    func(item, nucc);
                }
            }
        })(item, nuc);

        if (nuc.length >= groupl) {
            return this.group(nuc, groupl, result);
        } else {
            return result;
        }
    },

    getLotType: function getLotType(type) {
        if(type == 0){
            return '胜平负';
        }else if(type == 1){
            return '让球胜平负';
        }else if(type == 2){
            return '比分';
        }else if(type == 3){
            return '总进球数';
        }
    },
    
    getLotValue: function getLotValue(type,val) {

        if(type == 0 || type == 1){
            if(val == 0){
                return '主胜';
            }else if(val == 1){
                return '平';
            }else if(val == 2){
                return '客胜';
            }
        }else if(type == 2){
            if(val == 0){
                return '1:0';
            }else if(val == 1){
                return '2:0';
            }else if(val == 2){
                return '2:1';
            }else if(val == 3){
                return '3:0';
            }else if(val == 4){
                return '3:1';
            }else if(val == 5){
                return '3:2';
            }else if(val == 6){
                return '4:0';
            }else if(val == 7){
                return '4:1';
            }else if(val == 8){
                return '4:2';
            }else if(val == 9){
                return '5:0';
            }else if(val == 10){
                return '5:1';
            }else if(val == 11){
                return '5:2';
            }else if(val == 12){
                return '胜其它';
            }else if(val == 13){
                return '0:0';
            }else if(val == 14){
                return '1:1';
            }else if(val == 15){
                return '2:2';
            }else if(val == 16){
                return '3:3';
            }else if(val == 17){
                return '平其它';
            }else if(val == 18){
                return '0:1';
            }else if(val == 19){
                return '0:2';
            }else if(val == 20){
                return '1:2';
            }else if(val == 21){
                return '0:3';
            }else if(val == 22){
                return '1:3';
            }else if(val == 23){
                return '2:3';
            }else if(val == 24){
                return '0:4';
            }else if(val == 25){
                return '1:4';
            }else if(val == 26){
                return '2:4';
            }else if(val == 27){
                return '0:5';
            }else if(val == 28){
                return '1:5';
            }else if(val == 29){
                return '2:5';
            }else if(val == 30){
                return '负其它';
            }
        }else if(type == 3){
            if(val == 0){
                return '进0球';
            }if(val == 1){
                return '进1球';
            }if(val == 2){
                return '进2球';
            }if(val == 3){
                return '进3球';
            }if(val == 4){
                return '进4球';
            }if(val == 5){
                return '进5球';
            }if(val == 6){
                return '进6球';
            }if(val == 7){
                return '进7+球';
            }
        }

    },

    get_unix_time: function get_unix_time(dateStr) {
        var newstr = dateStr.replace(/-/g, '/');
        var date = new Date(newstr);
        var time_str = date.getTime().toString();
        return time_str;
    },

    /**
     * 判断一个值是否为空
     * @param obj			任意类型
     * @returns {boolean}	是否为空
     */
    isNull: function isNull(obj) {
        if (obj == undefined || obj == 'undefined' || obj == null || obj == 'null' || obj == "" || obj.length == 0) return true;else return false;
    },

    /**
     * 通过时间戳获取离现在的时间（几天前，几分钟前，几小时前）
     * @param dateTimeStamp				时间戳
     * @returns {string|*|string}		（几天前，几分钟前，几小时前）
     */
    getDateDiff: function getDateDiff(dateTimeStamp) {
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
            //若日期不符则弹出窗口告之
            console.log("结束日期不能小于开始日期！");
        }
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        var result = "";
        if (monthC >= 1) {
            result = parseInt(monthC) + "个月前";
        } else if (weekC >= 1) {
            result = parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
            result = parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            result = parseInt(hourC) + "个小时前";
        } else if (minC >= 1) {
            result = parseInt(minC) + "分钟前";
        } else result = "刚刚";
        return result;
    },

    /**
     * 获取浏览器信息
     * 取值方式versions.isType(*) == true/false
     */
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            isTrident: u.indexOf('Trident') > -1, //IE内核
            isPresto: u.indexOf('Presto') > -1, //opera内核
            isWebKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            isGecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            isMobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            isAndroid: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            isIPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            isIPad: u.indexOf('iPad') > -1, //是否iPad
            isWebApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            isWeiXin: u.match(/MicroMessenger/i) == 'MicroMessenger' || u.match(/MicroMessenger/i) == 'micromessenger', //微信浏览器
            isIosApp : u.indexOf('ticket_ios') > -1, //ios客户端版本
            isAndroidApp : u.indexOf('ticket_android') > -1 //安卓客户端版本
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};