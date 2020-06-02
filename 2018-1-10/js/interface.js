"use strict";

const ajaxConfig = {
    server_url: 'http://192.168.8.169/PhpstormProjects/Ball/index.php',
    time_out: 3000,
    lazy: 200,
    source: 'wap',
    type: '1',
    debug: false
};

if (ajaxConfig.debug == true) {
    ajaxConfig.server_url = 'http://192.168.8.169/PhpstormProjects/Ball/index.php';
} else if (ajaxConfig.debug == false) {
    ajaxConfig.server_url = 'https://www.31un.com';
}

var baseAjax = {

    /**
     * 获取用户ID
     * @returns {number}
     */
    getUserId: function getUserId() {
        var userInfo = base.getCookie("userInfo");
        if (base.isNull(userInfo)) {
            return 0;
        } else {
            return JSON.parse(userInfo).user_id;
        }
        // var userInfo = window.sessionStorage.getItem("userInfo");
        // return userInfo ? JSON.parse(userInfo).uuid : 0;
    },

    /**
     * 获取通用签名
     * @returns {string}
     */
    getSign: function getAjaxSign(params) {
        var arr = [];

        var str = '';

        if (base.isNull(params)) {
            params = {};
        }

        $.each(params, function (key, value) {
            arr.push(key);
        });

        arr = arr.sort();

        for (var i = 0; i < arr.length; i++) {
            str += params[arr[i]];
        }

        str += 'key=lottery@213cbs!';

        params.s = md5(str);

        return params;
    },

    /**
     * 获取用户作品
     * @param callback
     */
    getUserVideo: function getUserVideo(callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Ks/Hutui/getUserVideo",
            data: { userid: this.getUserId() },
            dataType: "json",
            success: function success(data) {
                if (data.code == 1) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取云端刷量类型
     * @param callback
     */
    getType: function getType(callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Ks/Yun/type",
            data: {},
            dataType: "json",
            success: function success(data) {
                if (data.code == 1) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },


    /**
     * 获取互推列表
     * @param userid
     * @param type
     * @param page
     * @param count
     * @param callback
     */
    getList: function getList(type, page, count, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Ks/Hutui/getList",
            data: { userid: this.getUserId(), type: type, page: page, count: count },
            dataType: "json",
            success: function success(data) {
                if (data.code == 1) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 登录
     * @param userid
     * @param callback
     */
    login: function login(userid, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Ks/User/login",
            data: { userid: userid },
            dataType: "json",
            success: function success(data) {
                if (data.code == 1) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 绑定用户数字id
     * @param name
     * @param callback
     */
    getKsUserByName: function getKsUserByName(name, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Ks/User/getKsUserByName",
            data: { name: name },
            dataType: "json",
            success: function success(data) {
                if (data.code == 1) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取当前用户
     * @param callback
     */
    getInfo: function getInfo(callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Ks/User/getInfo",
            data: { userid: this.getUserId() },
            dataType: "json",
            success: function success(data) {
                if (data.code == 1) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取指定用户信息
     * @param userid
     * @param callback
     */
    getInfoByID: function getInfoByID(userid, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Ks/User/getInfo",
            data: { userid: userid },
            dataType: "json",
            success: function success(data) {
                if (data.code == 1) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 积分商品列表
     * @param callback
     */
    scoreList: function scoreList(callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Ks/Score/scoreList",
            data: {},
            dataType: "json",
            success: function success(data) {
                if (data.code == 1) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 积分购买下单
     * @param goods_id
     * @param pay_type
     * @param callback
     */
    buyScore: function buyScore(goods_id, pay_type, callback) {

        var sign = this.getSign({
            userid: this.getUserId(),
            goods_id: goods_id,
            pay_type: pay_type
        });

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Ks/Score/buyScore",
            data: { userid: sign.userid, goods_id: sign.goods_id, pay_type: sign.pay_type, sign: sign.s },
            dataType: "json",
            success: function success(data) {
                if (data.code == 1) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 刷量所需积分列表
     * @param type_id
     * @param callback
     */
    numScore: function numScore(type_id, callback) {

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Ks/Yun/numScore",
            data: { type_id: type_id, userid: this.getUserId() },
            dataType: "json",
            success: function success(data) {
                if (data.code == 1) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },


    /**
     * 刷量任务添加
     * @param id
     * @param photo_id
     * @param c_type
     * @param callback
     */
    cloudAddTask: function cloudAddTask(id, photo_id, c_type, callback) {

        var data = {
            userid: this.getUserId(),
            id: id,
            photo_id: photo_id
        };

        if(!base.isNull(c_type)){
            data.c_type = c_type;
        }

        var sign = this.getSign(data);

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Ks/Yun/addTask",
            data: {  userid: sign.userid, id: sign.id, photo_id: sign.photo_id, c_type: c_type, sign: sign.s },
            dataType: "json",
            success: function success(data) {
                if (data.code == 1) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取文章列表
     * @param type              文章类型
     * @param count             每页条数
     * @param page              页码
     * @param callback
     */
    getArticleList: function getArticleList(type, count, page, callback) {

        $.ajax({
            type: "post",
            // url: ajaxConfig.server_url + "/Ks/Article/getList",
            url: "http://192.168.8.169/PhpstormProjects/Ball/index.php/Ks/Article/getList",
            data: { type: type, count: count, page: page },
            dataType: "json",
            success: function success(data) {
                if (data.code == 1) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取
     * @param atc_id
     * @param callback
     */
    getContent: function getContent(atc_id, callback) {

        $.ajax({
            type: "post",
            // url: ajaxConfig.server_url + "/Ks/Article/getContent",
            url: "http://192.168.8.169/PhpstormProjects/Ball/index.php/Ks/Article/getContent",
            data: { atc_id: atc_id },
            dataType: "json",
            success: function success(data) {
                if (data.code == 1) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },


}