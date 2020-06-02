'use strict';

/**
 * 接口配置
 * @type {{server_url: string, time_out: number}}
 */

var ajaxConfig = {
    server_url: 'http://reptile.fantrol.com/',
    time_out: 3000,
    lazy: 1000,
    source: 'wap',
    type: '1',
    debug: true
};

if (ajaxConfig.debug == true) {
    ajaxConfig.server_url = 'http://reptile.fantrol.com/';
} else if (ajaxConfig.debug == false) {
    ajaxConfig.server_url = 'http://reptile.fantrol.com/';
}

var baseAjax = {

    /**
     * 获取用户ID
     * @returns {number}
     */
    getUserId: function getUserId() {

        // return '09081d3e210e4bfebd59ff2c33b6f559';

        var userInfo = base.getCookie("userInfo");
        if (base.isNull(userInfo)) {
            return 0;
        } else {
            return JSON.parse(userInfo).uuid;
        }
    },

    /**
     * 获取设备ID
     */
    getDeviceID: function getDeviceID() {

        var deviceID = base.getCookie('deviceID');
        if (base.isNull(deviceID)) {
            deviceID = base.getUuid();
            base.setCookie('deviceID', deviceID);
        }
        return deviceID;
    },

    /**
     * 获取用户余额
     */
    getBalance: function getBalance() {

        var userInfo = base.getCookie("userInfo");
        if (base.isNull(userInfo)) {
            return 0;
        } else {
            return JSON.parse(userInfo).accountBalance;
        }
    },

    /**
     * 获取通用签名
     * @returns {string}
     */
    getAjaxSign: function getAjaxSign(params) {
        var _this = this;
        var _timestamp = Math.round(new Date().getTime() / 1000);

        var arr = [];

        var str = '';

        if (base.isNull(params)) {
            params = {};
        }

        if(base.isNull(params.uuid)){
            params.uuid = _this.getUserId();
        }
        if(base.isNull(params.deviceID)){
            params.deviceID = _this.getDeviceID();
        }
        if(base.isNull(params.source)){
            params.source = ajaxConfig.source;
        }
        if(base.isNull(params.deviceType)){
            params.deviceType = ajaxConfig.type;
        }
        if(base.isNull(params.t)){
            params.t = _timestamp;
        }

        $.each(params, function (key, value) {
            arr.push(key);
        });

        arr = arr.sort();

        for (var i = 0; i < arr.length; i++) {
            var _tmp = arr[i] + '=' + params[arr[i]] + '&';
            str += _tmp;
        }

        str += 'key=lottery@213cbs!';

        // console.log(str);

        params.s = md5(str);

        // console.log(params.sign)

        params.key = 'lottery@213cbs!';

        return params;
    },

    /**
     * 获取赛事列表
     * @param callback
     */
    getEventList: function getEventList(callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + 'index.php?m=api&c=v1',
            data: { str: '{"method":"sync/getEventList", "param": {"mid": 97263} }' },
            dataType: "json",
            success: function success(data) {
                if (data.code == 200) {
                    callback(data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取比赛类型
     * @param callback
     */
    getEventType: function getEventType(callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + 'index.php?m=api&c=v1&str={"method":"sync/getEventType"}',
            data: {},
            dataType: "json",
            success: function success(data) {
                if (data.code == 200) {
                    callback(data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取赛事推荐
     * @param callback
     */
    getEventRecommend: function getEventRecommend(callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + 'index.php?m=api&c=v1&str={"method":"sync/getEventRecommend"}',
            data: {},
            dataType: "json",
            success: function success(data) {
                if (data.code == 200) {
                    callback(data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取比赛信息
     * @param callback
     */
    getEventInfo: function getEventInfo(mid, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + 'index.php?m=api&c=v1',
            data: { str: '{"method":"sync/getEventInfo", "param": {"mid": '+ mid +'} }' },
            dataType: "json",
            success: function success(data) {
                if (data.code == 200) {
                    callback(data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取赛事比分
     * @param callback
     */
    getEventScore: function getEventScore(mid, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + 'index.php?m=api&c=v1',
            data: { str: '{"method":"sync/getEventScore", "param": {"mid": '+ mid +'} }' },
            dataType: "json",
            success: function success(data) {
                if (data.code == 200) {
                    callback(data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 竞猜胜平负固定奖金
     * @param callback
     */
    getEventMoneyAward: function getEventMoneyAward(mid, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + 'index.php?m=api&c=v1',
            data: { str: '{"method":"sync/getEventMoneyAward", "param": {"mid": '+ mid +'} }' },
            dataType: "json",
            success: function success(data) {
                if (data.code == 200) {
                    callback(data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 竞猜总进球数
     * @param callback
     */
    getEventGoalsFor: function getEventGoalsFor(mid, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + 'index.php?m=api&c=v1',
            data: { str: '{"method":"sync/getEventGoalsFor", "param": {"mid": '+ mid +'} }' },
            dataType: "json",
            success: function success(data) {
                if (data.code == 200) {
                    callback(data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

// 1 	赛事列表 	http://reptile.fantrol.com/index.php?m=api&c=v1&str={"method":"sync/getEventList"} 	无 	2017-08-24 22:58
//     2 	比赛类型 	http://reptile.fantrol.com/index.php?m=api&c=v1&str={"method":"sync/getEventType"} 	无 	2017-08-26 17:54
//     3 	比赛信息 	http://reptile.fantrol.com/index.php?m=api&c=v1&str={"method":"sync/getEventInfo", "param": {"mid": 97263}} 	mid 	2017-08-26 17:55
//     4 	赛事比分 	http://reptile.fantrol.com/index.php?m=api&c=v1&str={"method":"sync/getEventScore", "param": {"mid": 97263}} 	mid 	2017-08-26 17:56
//     5 	竞彩胜平负固定奖金 	http://reptile.fantrol.com/index.php?m=api&c=v1&str={"method":"sync/getEventMoneyAward", "param": {"mid": 97263}} 	mid 	2017-08-26 17:56
//     6 	竞猜总进球数 	http://reptile.fantrol.com/index.php?m=api&c=v1&str={"method":"sync/getEventGoalsFor", "param": {"mid": 97263}} 	mid 	2017-08-26 17:56
//     7 	赛事推荐 	http://reptile.fantrol.com/index.php?m=api&c=v1&str={"method":"sync/getEventRecommend"}


};