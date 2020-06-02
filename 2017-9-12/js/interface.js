'use strict';

/**
 * 接口配置
 * @type {{server_url: string, time_out: number}}
 */

var ajaxConfig = {
    server_url: 'http://reptile.fantrol.com/',
    server_url2: 'http://www.fantrol.com/',
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

    registered: function registered(mobile, password, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url2 + 'index.php?m=Api&c=User&a=registered',
            data: { mobile: mobile, password: password },
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

    login: function login(mobile, password, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url2 + 'index.php?m=Api&c=User&a=login',
            data: { mobile: mobile, password: password },
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

    signOut: function signOut(callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url2 + 'index.php?m=Api&c=User&a=sign_out',
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

    updateUser: function updateUser(id, mobile, password, name, birthday, sex, picture, summary, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url2 + 'index.php?m=Api&c=User&a=update_user',
            data: { id: id, mobile: mobile, password: password, name: name, birthday: birthday, sex: sex, picture: picture, summary: summary},
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

    getUser: function getUser(id, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url2 + 'index.php?m=Api&c=User&a=get_user',
            data: { id: id },
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
     * 关注/取消关注
     * @param user          当前用户ID
     * @param uid           被关注用户ID
     * @param type          1/关注,0/取消关注
     * @param callback
     */
    setAttention: function setAttention(user, uid, type, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url2 + 'index.php?m=Api&c=User&a=set_attention',
            data: { user: user, uid: uid, type: type},
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
     *
     * @param user
     * @param uid
     * @param type
     * @param callback
     */
    getRecord: function getRecord(uid, type, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url2 + 'index.php?m=Api&c=User&a=get_record',
            data: { user: user, uid: uid, type: type,},
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

    getAddress: function getAddress(uid, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url2 + 'index.php?m=Api&c=User&a=get_address',
            data: { uid: uid },
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

    addAddress: function addAddress(user_id, city, county, address, name, phone, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url2 + 'index.php?m=Api&c=User&a=add_address',
            data: { user_id: user_id, city: city, county: county, address: address, name: name, phone: phone },
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

    updateAddress: function updateAddress(id, city, county, address, name, phone, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url2 + 'index.php?m=Api&c=User&a=update_address',
            data: { id: id, city: city, county: county, address: address, name: name, phone: phone },
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

    delAddress: function delAddress(id, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url2 + 'index.php?m=Api&c=User&a=del_address',
            data: { id: id},
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

};