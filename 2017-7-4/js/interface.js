/**
 * 接口配置
 * @type {{server_url: string, time_out: number}}
 */
ajaxConfig = {
    server_url : 'http://192.168.8.150:8087/',
	time_out : 3000,
	lazy : 1000,
    source : 'wap',
	type : '1',
    debug : false,
}

const lotteryType = {
    SSQ : 'ssq',        //双色球
    FC3D : '3d',        //福彩3d
    QLC : '307',        //七乐彩
    JXK3 : 'JXK3',      //江西快3
    PL3 : 'p3',         //排列3
    PL5 : 'p5',         //排列5
    QXC : 'p7',         //七星彩
    SJDLT : 'dlt',      //超级大乐透
    ZQSFC : 'sfc',      //足彩胜负彩
    ZC6CBQC : 'bqc',    //足彩六场半全场
    ZQ4CJQ : '4jq',     //足彩四场进球
    YDJ11X5 : 'D11',    //十一运夺金11选5
    KL123 : 'H123',     //快乐123
    DLCJX11X5 : 'dlc',  //多乐彩江西11选5
    SH11X5 : 'C511',    //上海11选5
    JSK3 : 'JSK3',      //江苏快3
    SDKLPK : 'HPoker',  //山东快乐扑克
    AHK3 : 'AHK3',      //安徽快3
    ZJFY : 'ZJFish',    //浙江飞鱼
    CQ11X5 : 'CQD11',   //重庆11选5
    ZJ11X5 : 'ZJC511',  //浙江11选5
    GD11X5 : 'GDD11',   //广东11选5
    HLXYSC : 'XYSC',    //湖南幸运赛车
}

if(ajaxConfig.debug == true){
    ajaxConfig.server_url = 'http://192.168.8.150:8087/';
}else if(ajaxConfig.debug == false){
    ajaxConfig.server_url = 'http://192.168.8.150:8087/';
}

baseAjax = {

    /**
     * 获取用户ID
     * @returns {number}
     */
    getUserId(){
        if (ajaxConfig.debug == true) {
            return 1002;
        } else {
            let userInfo = window.sessionStorage.getItem("userInfo");
            return userInfo ? JSON.parse(userInfo).uuid : 0;
        }
    },

    /**
     * 获取设备ID
     */
    getDeviceID(){
        let deviceID = window.localStorage.getItem("deviceID");
        if(base.isNull(deviceID)){
            let _uuid = base.getUuid();
            window.localStorage.setItem("deviceID",_uuid);
        }
        return deviceID;
    },

    /**
     * 获取用户余额
     */
    getBalance(){
        if (ajaxConfig.debug == true) {
            return 1000;
        } else {
            let userInfo = window.sessionStorage.getItem("userInfo");
            return userInfo ? JSON.parse(userInfo).accountBalance : 0;
        }
    },

    /**
     * 获取通用签名
     * @returns {string}
     */
    getAjaxSign(){
        let _timestamp = Math.round(new Date().getTime()/1000);
        let _sign = '';
        return {
            sign : _sign,
            timestemp : _timestamp
        }
    },

    /**
     * 获取验证码
     * @param mobilePhone			手机号
     * @param codeType				code
     * @param callback
     */
    sendLoginInCode(mobilePhone, codeType, callback){

        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"sms/sendLoginInCode",
            data: { mobilePhone : mobilePhone, codeType : codeType, uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 获取用户资料
     * @param callback
     */
    userInfo(callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/userInfo",
            data: { uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 获取用户数据
     * @param callback
     */
    userBaseInfo(callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/userBaseInfo",
            data: { uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },


    /**
     * 实名认证
     * @param mobilePhone
     * @param code
     * @param realName
     * @param identityCard
     * @param callback
     */
    realNameAuth(mobilePhone, code, realName, identityCard, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/realNameAuth",
            data: { mobilePhone: mobilePhone, code: code, realName: realName, identityCard: identityCard, uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 获取用户已绑定的信息
     * @param callback
     */
    securityInfo(callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/securityInfo",
            data: { uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 手机号注册、登录
     * @param phoneNumber
     * @param code
     * @param source
     * @param callback
     */
    phoneLoginIn(phoneNumber, code, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/loginInPhone",
            data: { phoneNumber : phoneNumber, code : code, source: ajaxConfig.source, uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },


    /**
     * 绑定手机
     * @param mobilePhone
     * @param code
     * @param callback
     */
    bindMobilePhone(mobilePhone, code, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/bindMobilePhone",
            data: { mobilePhone : mobilePhone, code : code, uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 绑定手机号修改前原手机验证，验证成功返回变更的编码
     * @param code
     * @param callback
     */
    smsUpPhoneCode(code, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/smsUpPhoneCode",
            data: { code : code, uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 修改绑定手机号，根据变更的编码及手机验证码验证
     * @param changeCode
     * @param newMobilePhone
     * @param newCode
     * @param callback
     */
    smsUpMobilePhone(changeCode, newMobilePhone, newCode, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/smsUpMobilePhone",
            data: { changeCode : changeCode, newMobilePhone: newMobilePhone, newCode: newCode, uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 绑定银行卡
     * @param realName
     * @param bankCard
     * @param callback
     */
    bankCard(realName, bankCard, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/bankCard",
            data: { realName : realName, bankCard: bankCard, uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 移除银行卡绑定
     * @param cardID
     * @param callback
     */
    removeBankCard(cardID, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/removeBankCard",
            data: { cardID : cardID, uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 获取已绑定的银行卡
     * @param callback
     */
    bankCardList(callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/bankCardList",
            data: { uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 设置默认银行卡
     * @param cardID
     * @param callback
     */
    defaultBankCard(cardID, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/defaultBankCard",
            data: { cardID : cardID, uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 设置支付密码
     * @param oldPwd
     * @param newPwd
     * @param callback
     */
    outPwd(oldPwd, newPwd, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/outPwd",
            data: { oldPwd : oldPwd, newPwd: newPwd, uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 忘记支付密码重置
     * @param code
     * @param password
     * @param callback
     */
    resetOutPwd(code, password, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/resetOutPwd",
            data: { code : code, password: password, uuid : baseAjax.getUserId(), deviceID : baseAjax.getDeviceID(), deviceType : ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 用户充值
     * @param call
     */
    recharge(callback){
        callback(true);
    },

    /**
     * 双色球投注
     * @param anteCodeList
     * @param number
     * @param lotMulti
     * @param callback
     */
    ssqTicket(anteCodeList, number, lotMulti, callback){
    	let _this = this;

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/lottery/ssqTicket",
            data: {anteCodeList: anteCodeList, number: number, lotMulti: lotMulti, uuid: _this.getUserId(), deviceID: _this.getDeviceID(), deviceType: ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 快3投注
      * @param lotteryType
     * @param number
     * @param lotMulti
     * @param anteCodeList
     * @param callback
     */
    k3Ticket(lotteryType, number, lotMulti, anteCodeList, callback){
    	let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/lottery/k3Ticket",
            data: {lotteryType: lotteryType, number: number, lotMulti: lotMulti, anteCodeList: anteCodeList, uuid: _this.getUserId(), deviceID: _this.getDeviceID(), deviceType: ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 11选5投注
     * @param lotteryType
     * @param playType
     * @param number
     * @param lotMulti
     * @param anteCodeList
     * @param callback
     */

    d11Ticket(ticketList, lotteryType, number, lotMulti, callback){
        let _this = this;

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/lottery/d11Ticket",
            data: {ticketList: ticketList, lotteryType: lotteryType, number: number, lotMulti: lotMulti, uuid: _this.getUserId(), deviceID: _this.getDeviceID(), deviceType: ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 大乐透投注
     * @param number
     * @param lotMulti
     * @param anteCodeList
     * @param callback
     */
    dltTicket(number, lotMulti, anteCodeList, callback){
    	let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/lottery/dltTicket",
            data: {number: number, lotMulti: lotMulti, anteCodeList: anteCodeList, uuid: _this.getUserId(), deviceID: _this.getDeviceID(), deviceType: ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 获取彩种奖期
     * @param lotteryType       彩种
     * @param callback
     */
    awardPeriod(lotteryType, callback){
    	let _this = this;

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/lottery/awardPeriod",
            data: {lotteryType: lotteryType, uuid: _this.getUserId(), deviceID: _this.getDeviceID(), deviceType: ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 获取开奖公告
     * @param lotteryType
     * @param callback
     */
    openAwardList(callback){
    	let _this = this;

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/lottery/openAwardList",
            data: { uuid: _this.getUserId(), deviceID: _this.getDeviceID(), deviceType: ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },


    /**
     * 获取指定的开奖信息
     * @param lotteryType               彩票彩种
     * @param pageIndex                 页码
     * @param pageSize                  每页显示条数
     * @param callback
     */
    openAwardListByLotteryType(lotteryType, pageIndex, pageSize, callback){
    	let _this = this;

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/lottery/openAwardListByLotteryType",
            data: { lotteryType: lotteryType, pageIndex: pageIndex, pageSize: pageSize, uuid: _this.getUserId(), deviceID: _this.getDeviceID(), deviceType: ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 获取订单详情
     * @param status
     * @param pageIndex
     * @param pageSize
     * @param callback
     */
    ticketList(status, pageIndex, pageSize, callback){
    	let _this = this;

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/lottery/ticketList",
            data: { status: status, pageIndex: pageIndex, pageSize: pageSize, uuid: _this.getUserId(), deviceID: _this.getDeviceID(), deviceType: ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },


    /**
     * 查询订单详情
     * @param ticketID
     * @param callback
     */
    ticketDetails(ticketID, callback){
    	let _this = this;

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/lottery/ticketDetails",
            data: { ticketID: ticketID, uuid: _this.getUserId(), deviceID: _this.getDeviceID(), deviceType: ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },

    /**
     * 账户明细
     * @param queryType
     * @param pageIndex
     * @param pageSize
     * @param callback
     */
    userAccountFlow(queryType, pageIndex, pageSize, callback){
        let _this = this;

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url + "/user/userAccountFlow",
            data: { queryType: queryType, pageIndex: pageIndex, pageSize: pageSize, uuid: _this.getUserId(), deviceID: _this.getDeviceID(), deviceType: ajaxConfig.type, sign: baseAjax.getAjaxSign().sign, timestemp : baseAjax.getAjaxSign().timestemp},
            dataType: "json",
            success(data){
                if(data.status == 1){
                    callback(data);
                }else{
                    callback(false,data.message);
                }
            }
        });
    },


}