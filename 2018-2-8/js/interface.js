"use strict";

const ajaxConfig = {
    server_url: '192.168.8.169/PhpstormProjects/ball',
    time_out: 3000,
    lazy: 200,
    source: 'wap',
    type: '1',
    debug: true
};

if (ajaxConfig.debug == true) {
    ajaxConfig.server_url = 'http://192.168.8.169/PhpstormProjects/ball';
} else if (ajaxConfig.debug == false) {
    ajaxConfig.server_url = 'http://119.23.41.193';
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
            return JSON.parse(userInfo).id;
        }
        // var userInfo = window.sessionStorage.getItem("userInfo");
        // return userInfo ? JSON.parse(userInfo).uuid : 0;
    },

    /**
     * 获取用户秋秋号
     * @returns {number}
     */
    getUserQQ: function getUserQQ() {
        var userInfo = base.getCookie("userInfo");
        if (base.isNull(userInfo)) {
            return 0;
        } else {
            return JSON.parse(userInfo).qq;
        }
        // var userInfo = window.sessionStorage.getItem("userInfo");
        // return userInfo ? JSON.parse(userInfo).uuid : 0;
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

        str += 'asdvpijncxoizhvnaubwsdvswd';

        params.s = md5(str);

        return params;
    },

    /**
     * 获取充值商品列表
     * @param type              列表类型(1:金币商品 2:VIP商品)
     * @param callback
     */
    getGoods: function getGoods(type, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/Order/goods",
            data: { user_id: this.getUserId(), type: type },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取首充商品
     * @param callback
     */
    getFirstGoods: function getFirstGoods(callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/Order/firstGoods",
            data: { },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 下单
     * @param goods_id
     * @param pay_type
     * @param sign
     * @param callback
     */
    giveOrder: function giveOrder(goods_id, pay_type, sign, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/Order/giveOrder",
            data: { },
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
     * 获取云端刷赞类型
     * @param callback
     */
    getType: function getType(callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/Yun/type",
            data: { },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取刷量的购买列表
     * @param type_id
     * @param callback
     */
    numScore: function numScore(type_id, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/Yun/numScore",
            data: { user_id: this.getUserId(), type_id: type_id },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取用户信息
     * @param qq                秋秋号
     * @param callback
     */
    login: function login(qq, callback) {

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/User/getInfo",
            data: { qq: qq, device: this.getDeviceID() },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取当前用户信息
     * @param callback
     */
    getInfo: function getInfo(callback) {

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/User/getInfo",
            data: { device: this.getDeviceID() },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取说说
     * @param qq
     * @param callback
     */
    getSay: function getSay(callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/App/Say/index",
            data: { qq: this.getUserQQ() },
            dataType: "json",
            success: function success(data) {

                if (data.code == 400 || data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 云端刷量
     * @param id
     * @param qq
     * @param pkid
     * @param pktitle
     * @param sign
     * @param callback
     */
    addTask: function addTask(id, pkid, pktitle, callback) {

        var data = {
            userid: this.getUserId(),
            id: id,
            qq: this.getUserQQ(),
        };

        if(!base.isNull(pkid)){
            data.pkid = pkid;
        }

        if(!base.isNull(pktitle)){
            data.pktitle = pktitle;
        }

        var sign = this.getSign(data).s;

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/Yun/addTask",
            data: { user_id: this.getUserId(), id: id, qq: this.getUserQQ(), pkid: pkid, pktitle: pktitle, sign: sign },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 订单状态(接口A)
     * @param page
     * @param count
     * @param callback
     */
    orderStatusA: function orderStatusA(page, count, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/Yun/orderStatusA",
            data: { userid: this.getUserId(), page: page, count: count },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 订单状态(接口B)
     * @param task_id
     * @param callback
     */
    orderStatusB: function orderStatusB(task_id, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/Yun/orderStatusB",
            data: { task_id: task_id },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 退款
     * @param task_id           退款任务号
     * @param pay_type          支付类型(1支付宝 2QQ 3微信 4金币)
     * @param reason            退款理由(【支付类型不为4时必传】)
     * @param account           退款账户(支付宝账号或者QQ号 或者微信号 【支付类型不为4时必传】)
     * @param contact           联系方式(需要标明电话或者qq 【支付类型不为4时必传】)
     * @param callback
     */
    chargeBack: function chargeBack(task_id, pay_type, reason, account, contact, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/Yun/orderStatusB",
            data: { task_id: task_id, pay_type: pay_type, reason: reason, account: account, contact: contact },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取待点赞QQ[需签名]
     * @param qq                秋秋号
     * @param device            设备号
     * @param count             获取数量
     * @param sign              签名
     * @param callback
     */
    getQQs: function getQQs(qq, device, count, sign, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/Yun/orderStatusB",
            data: { qq: qq, device: device, count: count, sign: sign },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 回赞记录
     * @param qq            秋秋号
     * @param callback
     */
    zanDetail: function zanDetail(qq, callback) {
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/Yun/orderStatusB",
            data: { qq: qq },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 空间背景图片
     * @param pageNO                页码
     * @param type                  0为名片1为空间【须传1】
     * @param count                 每页条数
     * @param callback
     */
    getBg: function getBg(pageNO, type, count, callback) {
        $.ajax({
            type: "post",
            url: "https://www.31un.com/Elf/Img/set",
            data: { pageNO: pageNO, type: type, count: count },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 头像、壁纸图片
     * @param pageNO            第几页
     * @param type              0为壁纸1为头像
     * @param callback
     */
    getHeadIcon: function getHeadIcon(pageNO, type, count, callback) {
        $.ajax({
            type: "post",
            url: "https://www.31un.com/Elf/Img/imagesMix",
            data: { pageNO: pageNO, type: type, count: count },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 获取图片分类信息
     * @param type                  0壁纸 1头像
     * @param callback
     */
    getImgType: function getImg(type, callback) {
        $.ajax({
            type: "post",
            url: "https://www.31un.com/Elf/Img/imageCol",
            data: { type: type },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 头像分类
     * @param pageNO                页码
     * @param aid                   头像分类ID
     * @param callback
     */
    getHeads: function getHeads(pageNO, aid, count, callback) {
        $.ajax({
            type: "post",
            url: "https://www.31un.com/Elf/Img/headCol",
            data: { pageNO: pageNO, aid: aid, count: count },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    /**
     * 壁纸分类
     * @param pageNO                页码
     * @param aid                   头像分类ID
     * @param callback
     */
    getBgs: function getBgs(pageNO, aid, count, callback) {
        $.ajax({
            type: "post",
            url: "https://www.31un.com/Elf/Img/backCol",
            data: { pageNO: pageNO, aid: aid, count: count },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data.data);
                } else {
                    callback(false, data.msg);
                }
            }
        });
    },

    getArticleList: function getArticleList(type, count, page, callback) {

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/Qcelf/Article/getList",
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
            url: ajaxConfig.server_url + "/Qcelf/Article/getContent",
            // url: "http://192.168.8.169/PhpstormProjects/Ball/index.php/Ks/Article/getContent",
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