'use strict';

/**
 * 接口配置
 * @type {{server_url: string, time_out: number}}
 */

var ajaxConfig = {
    server_url: 'http://192.168.8.150:8087/',
    time_out: 3000,
    lazy: 1000,
    source: 'wnl',
    type: '1',
    debug: true
};

if (ajaxConfig.debug == true) {
    ajaxConfig.server_url = 'http://192.168.8.150:8081/';
} else if (ajaxConfig.debug == false) {
    ajaxConfig.server_url = 'http://api.pwabc.cn/';
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
     * 联赛信息列表信息(无编号时返回热门联赛信息)
     * @param code
     * @param callback
     */
    leagueList: function leagueList(code, callback) {
        var _sign = baseAjax.getAjaxSign({
            code: code
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "match/leagueList",
            data: { code: _sign.code, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 赛事列表（赛事ID小于等于0返回热门赛事）
     * @param pageIndex                 页码
     * @param pageSize                  每页条数
     * @param leagueType                类型
     * @param callback
     */
    matchListByHot: function matchListByHot(pageIndex, pageSize, queryType, callback) {
        var _sign = baseAjax.getAjaxSign({
            pageIndex: pageIndex,
            pageSize: pageSize,
            queryType: queryType
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "match/matchListByHot",
            data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, queryType: _sign.queryType, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 获取推荐赛事
     * @param callback
     */
    recommendMatchInfo: function recommendMatchInfo(callback) {
        var _sign = baseAjax.getAjaxSign();

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "match/recommendMatchInfo",
            data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 赛事赔率
     * @param matchID
     * @param callback
     */
    matchRate: function matchRate(matchID, callback) {
        var _sign = baseAjax.getAjaxSign({
            matchID: matchID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "match/matchRate",
            data: { matchID: _sign.matchID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 获取比赛详细信息
     * @param matchID
     * @param callback
     */
    matchInfo: function matchInfo(matchID, callback) {
        var _sign = baseAjax.getAjaxSign({
            matchID: matchID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "match/matchInfo",
            data: { matchID: _sign.matchID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 投注
     * @param matchID               比赛ID
     *
     * @param lotType               投注类型
     * lotType = 0 胜平负
     * lotType = 1 让球胜平负
     * lotType = 2 比分
     * lotType = 3 总进球数
     *
     * @param anteValue             投注的值
     *
     * @param couponNumber          红包编号
     * @param money                 投注金额
     * @param callback
     */
    payMatch: function payMatch(couponNumber, money, matchList, callback) {

        var data = {
            money: money
        }

        if(!base.isNull(couponNumber)){
            data.couponNumber = couponNumber;
        }

        var _sign = baseAjax.getAjaxSign(data);

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "p/payMatch",
            data: { couponNumber: _sign.couponNumber, money: _sign.money, matchList: matchList, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     *
     * @param couponNumber
     * @param money
     * @param matchList
     * @param callback
     */
    createMatchOrder: function createMatchOrder(couponNumber, money, matchList, callback) {

        var data = {
            money: money
        }

        if(!base.isNull(couponNumber)){
            data.couponNumber = couponNumber;
        }

        var _sign = baseAjax.getAjaxSign(data);

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "p/createMatchOrder",
            data: { couponNumber: _sign.couponNumber, money: _sign.money, matchList: matchList, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 获取达人推荐列表
     * @param pageIndex                 页码
     * @param pageSize                  每页条数
     * @param matchID                   比赛ID
     * @param callback
     */
    newsListByMatch: function newsListByMatch(pageIndex, pageSize, matchID, callback) {
        var _sign = baseAjax.getAjaxSign({
            pageIndex: pageIndex,
            pageSize: pageSize,
            matchID: matchID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "match/newsListByMatch",
            data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, matchID: _sign.matchID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 获取赛事推荐/文章详情
     * @param newsID                文章ID
     * @param callback
     */
    newsInfo: function newsInfo(newsID, callback) {
        var _sign = baseAjax.getAjaxSign({
            newsID: newsID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "match/newsInfo",
            data: { newsID: _sign.newsID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 获取赛事列表详情
     * @param newsID
     * @param callback
     */
    newsMatchInfo: function newsMatchInfo(newsID, callback) {
        var _sign = baseAjax.getAjaxSign({
            newsID: newsID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "match/newsMatchInfo",
            data: { newsID: _sign.newsID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 获取banner
     * @param callback
     */
    bannerList: function bannerList(callback) {
        var _sign = baseAjax.getAjaxSign();

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "race/bannerList",
            data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 手机号登录（未注册时自动注册）
     * @param phoneNumber
     * @param code
     * @param couponNo
     * @param callback
     */
    loginInPhone: function loginInPhone(phoneNumber, code, couponNo, callback) {

        var data = {
            phoneNumber: phoneNumber,
            code: code
        }

        if(!base.isNull(couponNo)){
            data.couponNo = couponNo;
        }

        var _sign = baseAjax.getAjaxSign(data);

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/loginInPhone",
            data: { phoneNumber: _sign.phoneNumber, code: _sign.code, couponNo: _sign.couponNo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 第三方登录
     * @param openid
     * @param nickname
     * @param iconUrl
     * @param gender
     * @param signInfo
     * @param openType
     * @param couponNo
     * @param callback
     */
    loginInOpen: function loginInOpen(openid, nickname, iconUrl, gender, signInfo, openType, couponNo, callback) {
        var _sign = baseAjax.getAjaxSign({
            openid: openid,
            nickname: nickname,
            iconUrl: iconUrl,
            gender: gender,
            signInfo: signInfo,
            openType: openType,
            couponNo: couponNo
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/loginInOpen",
            data: { openid: _sign.openid, nickname: _sign.nickname, iconUrl: _sign.iconUrl, gender: _sign.gender, signInfo: _sign.signInfo, openType: _sign.openType, couponNo: _sign.couponNo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 获取当前用户信息
     * @param callback
     */
    userInfo: function userInfo(callback) {
        var _sign = baseAjax.getAjaxSign();

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/userInfo",
            data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                    base.setCookie('userInfo', JSON.stringify(data.returnJSON));
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 微信登录
     * @param code
     * @param call
     */
    wxLogin: function wxLogin(code, callback){

        if(code  == 'login'){
            var appid = 'wx652688d775b8a865';
            var redirect_uri = encodeURI('http://h5.pwabc.cn/baopu/login.html');
            var response_type = 'code';
            var scope = 'snsapi_userinfo';
//        var scope = 'snsapi_base';
            var state = '';
//                if(_this.call){
//                    state = 'http';
//                }

            var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid +
                '&redirect_uri=' + redirect_uri +
                '&response_type=' + response_type +
                '&scope=' + scope +
                '&state=' + state +
                '#wechat_redirect';

            window.location.href =  url;
        }else{
            var _sign = baseAjax.getAjaxSign({
                code: code
            });
            $.ajax({
                type: "post",
                url: ajaxConfig.server_url + "user/loginInWxServer",
                data: { code: _sign.code, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
                dataType: "json",
                success: function success(data) {

                    if (data.status == 1) {
                        callback(data);
                    } else {
                        callback(false, data.message);
                    }
                }
            });
        }
    },


    /**
     * 微信公众号支付
     * @param totalFee
     * @param attType
     * @param attInfo
     * @param callback
     */
    wxJsPay: function wxJsPay(totalFee, attType, attInfo, callback) {

        //获取openID

        var token = base.getCookie('tokenDetail');

        if(!base.isNull(token)){
            token = JSON.parse(token);
        }else{
            callback(false, '缺少openID');
        }

        var data = {
            totalFee: totalFee,
            openID: token.openid
        }

        if(!base.isNull(attType)){
            data.attType = attType;
        }

        if(!base.isNull(attInfo)){
            data.attInfo = attInfo;
        }

        var _sign = baseAjax.getAjaxSign(data);

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "p/wxJsPay",
            data: { totalFee: _sign.totalFee, attType: _sign.attType, attInfo: _sign.attInfo, openID: _sign.openID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {

                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 上传头像
     * @param callback
     */
    uploadPhoto: function uploadPhoto(callback) {
        var _sign = baseAjax.getAjaxSign();

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/uploadPhoto",
            data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, sign: _sign.sign, timestemp: _sign.timestemp },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 修改用户信息
     * @param nickName                      昵称
     * @param customSigna                   签名
     * @param email                         邮箱
     * @param gender                        性别
     * @param dateOfBirth
     * @param callback
     */
    updateUserInfo: function updateUserInfo(nickName, customSigna, email, gender, dateOfBirth, callback) {
        var _sign = baseAjax.getAjaxSign({
            nickName: nickName,
            customSigna: customSigna,
            email: email,
            gender: gender,
            dateOfBirth: dateOfBirth
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/updateUserInfo",
            data: { nickName: _sign.nickName, customSigna: _sign.customSigna, email: _sign.email, gender: _sign.gender, dateOfBirth: _sign.dateOfBirth, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 关注用户
     * @param focusUUID
     * @param callback
     */
    focusUser: function focusUser(focusUUID, callback) {
        var _sign = baseAjax.getAjaxSign({
            focusUUID: focusUUID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/focusUser",
            data: { focusUUID: _sign.focusUUID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 取消关注
     * @param focusUUID
     * @param callback
     */
    cancelFocusUser: function cancelFocusUser(focusUUID, callback) {
        var _sign = baseAjax.getAjaxSign({
            focusUUID: focusUUID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/cancelFocusUser",
            data: { focusUUID: _sign.focusUUID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 关注列表
     * @param pageIndex
     * @param pageSize
     * @param callback
     */
    focusUserList: function focusUserList(pageIndex, pageSize, callback) {
        var _sign = baseAjax.getAjaxSign({
            pageIndex: pageIndex,
            pageSize: pageSize
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/focusUserList",
            data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 粉丝列表
     * @param callback
     */
    fansList: function fansList(callback) {
        var _sign = baseAjax.getAjaxSign();

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/fansList",
            data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 关注赛事
     * @param matchID
     * @param callback
     */
    foucsMatch: function foucsMatch(matchID, callback) {
        var _sign = baseAjax.getAjaxSign({
            matchID: matchID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/foucsMatch",
            data: { matchID: _sign.matchID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 取消关注赛事
     * @param matchID
     * @param callback
     */
    cancelFoucsMatch: function cancelFoucsMatch(matchID, callback) {
        var _sign = baseAjax.getAjaxSign({
            matchID: matchID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/cancelFoucsMatch",
            data: { matchID: _sign.matchID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 关注的赛事
     * @param pageIndex
     * @param pageSize
     * @param callback
     */
    focusMatchList: function focusMatchList(pageIndex, pageSize, callback) {
        var _sign = baseAjax.getAjaxSign({
            pageIndex: pageIndex,
            pageSize: pageSize
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/focusMatchList",
            data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 达人推荐信息列表
     * @param pageIndex
     * @param pageSize
     */
    newsList: function newsList(pageIndex, pageSize, callback) {
        var _sign = baseAjax.getAjaxSign({
            pageIndex: pageIndex,
            pageSize: pageSize
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "news/newsList",
            data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 推荐的达人
     * @param callback
     */
    topNewsUser: function topNewsUser(callback) {
        var _sign = baseAjax.getAjaxSign();

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "news/topNewsUser",
            data: { uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 达人基本信息
     * @param newsUserID
     * @param callback
     */
    newsUserInfo: function newsUserInfo(newsUserID, callback) {
        var _sign = baseAjax.getAjaxSign({
            newsUserID: newsUserID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "news/newsUserInfo",
            data: { newsUserID: _sign.newsUserID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 获取达人的推荐赛事
     * @param pageIndex
     * @param pageSize
     * @param newsUserID
     * @param callback
     */
    newsListByUser: function newsListByUser(pageIndex, pageSize, newsUserID, callback) {
        var _sign = baseAjax.getAjaxSign({
            pageIndex: pageIndex,
            pageSize: pageSize,
            newsUserID: newsUserID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "news/newsListByUser",
            data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, newsUserID: _sign.newsUserID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 用户流水
     * @param pageIndex
     * @param pageSize
     * @param queryType
     * @param callback
     */
    userAccountFlow: function userAccountFlow(pageIndex, pageSize, queryType, callback) {
        var _sign = baseAjax.getAjaxSign({
            pageIndex: pageIndex,
            pageSize: pageSize,
            queryType: queryType
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/userAccountFlow",
            data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, queryType: _sign.queryType, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 红包列表
     * @param couponStatus
     * @param callback
     */
    couponList: function couponList(page, pageSize, couponStatus, callback) {
        var _sign = baseAjax.getAjaxSign({
            couponStatus: couponStatus
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/couponList",
            data: { couponStatus: _sign.couponStatus, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 获取可用的红包
     * @param lotMoney
     * @param callback
     */
    usableCouponList: function usableCouponList(lotMoney, callback) {
        var _sign = baseAjax.getAjaxSign({
            lotMoney: lotMoney
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/usableCouponList",
            data: { lotMoney: _sign.lotMoney, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 用户投注列表
     * @param pageIndex
     * @param pageSize
     * @param queryType
     * @param callback
     */
    matchOrderList: function matchOrderList(pageIndex, pageSize, queryType, callback) {
        var _sign = baseAjax.getAjaxSign({
            pageIndex: pageIndex,
            pageSize: pageSize,
            queryType: queryType
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/matchOrderList",
            data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, queryType: _sign.queryType, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 查询单个投注信息
     * @param orderID
     * @param callback
     */
    matchOrderByOrderID: function matchOrderByOrderID(orderID, callback) {
        var _sign = baseAjax.getAjaxSign({
            orderID: orderID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/matchOrderByOrderID",
            data: { orderID: _sign.orderID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 登录验证码
     * @param mobilePhone
     * @param callback
     */
    loginCode: function loginCode(mobilePhone, callback) {
        var _sign = baseAjax.getAjaxSign({
            mobilePhone: mobilePhone
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "msg/loginCode",
            data: { mobilePhone: _sign.mobilePhone, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 用户地址列表
     * @param pageIndex
     * @param pageSize
     * @param callback
     */
    addressList: function addressList(pageIndex, pageSize, callback) {
        var _sign = baseAjax.getAjaxSign({
            pageIndex: pageIndex,
            pageSize: pageSize
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/addressList",
            data: { pageIndex: _sign.pageIndex, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 新增收货地址
     * @param recipients
     * @param mobilePhone
     * @param address
     * @param callback
     */
    addAddress: function addAddress(recipients, mobilePhone, address, callback) {
        var _sign = baseAjax.getAjaxSign({
            recipients: recipients,
            mobilePhone: mobilePhone,
            address: address
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/addAddress",
            data: { recipients: _sign.recipients, mobilePhone: _sign.mobilePhone, address: _sign.address, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 修改收货地址
     * @param addressID
     * @param recipients
     * @param mobilePhone
     * @param address
     * @param callback
     */
    editAddress: function editAddress(addressID, recipients, mobilePhone, address, callback) {
        var _sign = baseAjax.getAjaxSign({
            addressID: addressID,
            recipients: recipients,
            mobilePhone: mobilePhone,
            address: address
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/editAddress",
            data: { addressID: _sign.addressID, recipients: _sign.recipients, mobilePhone: _sign.mobilePhone, address: _sign.address, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 删除收货地址
     * @param addressID
     * @param callback
     */
    delAddress: function delAddress(addressID, callback) {
        var _sign = baseAjax.getAjaxSign({
            addressID: addressID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/delAddress",
            data: { addressID: _sign.addressID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 默认地址设置
     * @param addressID
     * @param callback
     */
    defaultAddress: function defaultAddress(addressID, callback) {
        var _sign = baseAjax.getAjaxSign({
            addressID: addressID
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "user/defaultAddress",
            data: { addressID: _sign.addressID, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 兑换商品
     * @param goodsid
     * @param username
     * @param telephone
     * @param address
     * @param callback
     */

    createOrder: function createOrder(goodsid, username, telephone, address, callback) {
        var _sign = baseAjax.getAjaxSign({
            goodsid: goodsid,
            username: username,
            telephone: telephone,
            address: address
        });

        $.ajax({
            type: "post",
            // url: "http://192.168.8.161/caipiao/index.php/order/createOrder",
            url: "http://api.31un.com/order/createOrder",
            data: { goodsid: _sign.goodsid, username: _sign.username, telephone: _sign.telephone, address: _sign.address, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t},
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },



    /**
     * 获取订单信息
     * @param bigtype
     * @param ordernum
     * @param callback
     */
    showOrder: function showOrder(bigtype, ordernum, callback) {
        var _sign = baseAjax.getAjaxSign({
            bigtype: bigtype,
            ordernum: ordernum
        });

        $.ajax({
            type: "post",
            // url: "http://192.168.8.161/caipiao/index.php/order/showOrder",
            url: "http://api.31un.com/order/showOrder",
            data: { bigtype: _sign.bigtype, ordernum: _sign.ordernum, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },


    /**
     * 订单列表
     * @param page
     * @param pageSize
     * @param callback
     */
    orderList: function orderList(page, pageSize, callback) {
        var _sign = baseAjax.getAjaxSign({
            page: page,
            pageSize: pageSize
        });

        $.ajax({
            type: "post",
            // url: "http://192.168.8.161/caipiao/index.php/order/orderList",
            url: "http://api.31un.com/order/orderList",
            data: { page: _sign.page, pageSize: _sign.pageSize, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },


    /**
     * 支付宝wap支付
     * @param totalFee
     * @param returnUrl
     * @param attType
     * @param attInfo
     * @param callback
     */
    alipayWap: function alipayWap(totalFee, returnUrl, attType, attInfo, callback) {

        var data = {
            totalFee: totalFee,
            returnUrl: returnUrl
        }

        if(!base.isNull(attType)){
            data.attType = attType;
        }
        if(!base.isNull(attInfo)){
            data.attInfo = attInfo;
        }

        var _sign = baseAjax.getAjaxSign(data);

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "p/alipayWap",
            data: { totalFee: _sign.totalFee, returnUrl: _sign.returnUrl, attType: _sign.attType, attInfo: _sign.attInfo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            success: function success(data) {
                callback(data);
            }
        });
    },

    /**
     * 支付宝wap支付，客户端调用
     * @param totalFee
     * @param returnUrl
     * @param attType
     * @param attInfo
     * @param uuid
     * @param deviceID
     * @param source
     * @param deviceType
     * @param callback
     */
    alipayWapForApp: function alipayWapForApp(totalFee, returnUrl, attType, attInfo, uuid, deviceID, source, deviceType, callback) {
        var _sign = baseAjax.getAjaxSign({
            totalFee: totalFee,
            returnUrl: returnUrl,
            attType: attType,
            attInfo: attInfo,
            uuid: uuid,
            deviceID: deviceID,
            source: source,
            deviceType: deviceType
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "p/alipayWap",
            data: { totalFee: _sign.totalFee, returnUrl: _sign.returnUrl, attType: _sign.attType, attInfo: _sign.attInfo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            success: function success(data) {
                callback(data);
            }
        });
    },

    /**
     * 微信wap支付
     * @param totalFee
     * @param attType
     * @param attInfo
     * @param callback
     */
    wxWebPay: function wxWebPay(totalFee, attType, attInfo, callback) {

        var data = {
            totalFee: totalFee
        }

        if(!base.isNull(attType)){
            data.attType = attType;
        }
        if(!base.isNull(attInfo)){
            data.attInfo = attInfo;
        }

        var _sign = baseAjax.getAjaxSign(data);

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "p/wxWebPay",
            data: { totalFee: _sign.totalFee, attType: _sign.attType, attInfo: _sign.attInfo, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            success: function success(data) {
                callback(data);
            }
        });
    },

    /**
     * 支付结果查询
     * @param orderNo                   订单号
     * @param queryType                 支付类型
     * @param callback
     */
    payResultQuery: function payResultQuery(orderNo, queryType, callback) {

        var data = {
            queryType: queryType
        }

        if(!base.isNull(orderNo)){
            data.orderNo = orderNo;
        }

        var _sign = baseAjax.getAjaxSign(data);

        // $("p").eq(0).append(JSON.stringify({ orderNo: _sign.orderNo, queryType: _sign.queryType, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t }));

        // alert( JSON.stringify({ orderNo: _sign.orderNo, queryType: _sign.queryType, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t }));

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "p/payResultQuery",
            data: { orderNo: _sign.orderNo, queryType: _sign.queryType, uuid: _sign.uuid, deviceID: _sign.deviceID, source: _sign.source, deviceType: _sign.deviceType, s: _sign.s, t: _sign.t },
            dataType: "json",
            success: function success(data) {

                // alert(JSON.stringify(data));

                // $("p").eq(1).append(JSON.stringify(data));

                if (data.status == 1) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    }

};