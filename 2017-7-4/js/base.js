"use strict";

/*
 | ------------------------------------------
 | 公用函数
 | @by chenjun
 | 创建时间：2016-1-10
 | 最后更新时间：2016-12-7 13:34:26
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
        for (i = 0; j = paraString[i]; i++) {
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
        var newStr = '';
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
    twoDecimal: function twoDecimal(oNum) {
        var num = parseFloat(oNum);
        if (isNaN(length)) return false;

        var num = Math.round(oNum * 100) / 100;
        return num;
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


    /**
     * 判断一个值是否为空
     * @param obj			任意类型
     * @returns {boolean}	是否为空
     */
    isNull: function isNull(obj) {
        if (obj == undefined || obj == null || obj == "" || obj.length == 0) return true;else return false;
    },


    /**
     * 获取session中的指定类型票
     * @param type
     */
    getTickets: function getTickets(type) {
        var _ticket = '';

        if (type == 'ssq') {
            _ticket = sessionStorage.getItem('ssq_ticket');
        }
        if (type == 'dlt') {
            _ticket = sessionStorage.getItem('dlt_ticket');
        }
        if (type == 'd11') {
            _ticket = sessionStorage.getItem('d11_ticket');
        }
        if (type == 'q3') {
            _ticket = sessionStorage.getItem('q3_ticket');
        }
        if (base.isNull(_ticket)) {
            return null;
        } else {
            return JSON.parse(_ticket);
        }
    },


    /**
     * 根据ID获取session中的票
     * @param ticketID
     */
    getTicketByID: function getTicketByID(ticketID, type) {

        var _ticket = base.getTickets(type);

        if (base.isNull(_ticket)) {
            return null;
        } else {
            for (var _i = 0; _i < _ticket.length; _i++) {
                if (ticketID == _ticket[_i].id) {
                    _ticket[_i].index = _i;
                    return _ticket[_i];
                }
            }
            return null;
        }
    },


    /**
     * 根据ID删除session中的票
     * @param ticketID
     * @param type
     */
    delTicketByID: function delTicketByID(ticketID, type) {

        var _tickets = base.getTickets(type);

        var _index = base.getTicketByID(ticketID, type).index;

        if (base.isNull(_tickets)) {
            return false;
        }

        _tickets.splice(_index, 1);

        _tickets = JSON.stringify(_tickets);

        if (type == 'ssq') {
            sessionStorage.setItem('ssq_ticket', _tickets);
        }
        if (type == 'dlt') {
            sessionStorage.setItem('dlt_ticket', _tickets);
        }
        if (type == 'd11') {
            sessionStorage.setItem('d11_ticket', _tickets);
        }
        if (type == 'q3') {
            sessionStorage.setItem('q3_ticket', _tickets);
        }

        return true;
    },


    /**
     * 根据ID修改session中的票
     * @param ticketID
     * @param type
     */
    editTicketByID: function editTicketByID(ticketID, type, ticket) {
        var _tickets = base.getTickets(type);
        var _index = base.getTicketByID(ticketID, type).index;

        if (base.isNull(_tickets)) {
            return false;
        }

        ticket.id = _tickets[_index].id;
        _tickets[_index] = ticket;

        _tickets = JSON.stringify(_tickets);

        if (type == 'ssq') {
            sessionStorage.setItem('ssq_ticket', _tickets);
        }
        if (type == 'dlt') {
            sessionStorage.setItem('dlt_ticket', _tickets);
        }
        if (type == 'd11') {
            sessionStorage.setItem('d11_ticket', _tickets);
        }
        if (type == 'q3') {
            sessionStorage.setItem('q3_ticket', _tickets);
        }

        return true;
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
            isWeiXin: u.match(/MicroMessenger/i) == 'MicroMessenger' || u.match(/MicroMessenger/i) == 'micromessenger' //微信浏览器
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};