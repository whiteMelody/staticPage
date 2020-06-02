/**
 * 接口配置
 * @type {{server_url: string, time_out: number}}
 */
ajaxConfig = {
	server_url : "http://192.168.8.150/",
	time_out : 3000,
	lazy : 500,
	channel : 'english',
	type : 4,
	debug : false,
}

if(ajaxConfig.debug == true){
	ajaxConfig.server_url = "http://192.168.8.150/";
}else if(ajaxConfig.debug == false){
	ajaxConfig.server_url = "https://api.7english.cn/";
}else if(ajaxConfig.debug == 'test'){
	ajaxConfig.server_url = "http://devapi.7english.cn/";
}

baseAjax = {

	/**
	 * 获取用户ID
	 * @returns {number}
	 */
	getUserId(){
		if(ajaxConfig.debug == true){
			return 10005;
		}else{
			let userInfo = window.sessionStorage.getItem("userInfo");
			return userInfo ? JSON.parse(userInfo).userID : 0;
		}
	},

	getOpenID(){
		let userInfo = window.sessionStorage.getItem("userInfo");
		return userInfo ? JSON.parse(userInfo).openID : 0;
	},

	getUnionID(){
		let userInfo = window.sessionStorage.getItem("userInfo");
		return userInfo ? JSON.parse(userInfo).unionID : 0;
	},

	getHeadImg(){
		let userInfo = window.sessionStorage.getItem("userInfo");
		return userInfo ? JSON.parse(userInfo).userIconURL : 0;
	},

	getNickName(){
		let userInfo = window.sessionStorage.getItem("userInfo");
		return userInfo ? JSON.parse(userInfo).nickName : 0;
	},

	getVip(){
        let userInfo = window.sessionStorage.getItem("userInfo");
        return userInfo ? JSON.parse(userInfo).vip : 0;
	},

	/**
	 * 获取设备ID
	 * @returns {string}
	 */
	getDeviceID(){
		return "wap";
	},

	download(check){

		if(check){
			if (base.versions.isMobile) {
				if (base.versions.isWeiXin) {
                    window.location.href = "https://itunes.apple.com/us/app/feng-kuang-ying-yu-ying-yu/id455568840?l=zh&ls=1&mt=8";
				}
				if (base.versions.isWeiBo) {
                    window.location.href = "https://itunes.apple.com/us/app/feng-kuang-ying-yu-ying-yu/id455568840?l=zh&ls=1&mt=8";
				}
				if (base.versions.isAndroid) {
					window.location.href = "http://mzaudio.7english.cn/android/SevenDayEnglish-v1.2.apk";
				} else {
					window.location.href = "https://itunes.apple.com/us/app/feng-kuang-ying-yu-ying-yu/id455568840?l=zh&ls=1&mt=8";
				}
			}
		}else{
			window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.mizao.sevendayenglish";
		}

	},

	/**
	 * 获取JS API 票据
	 * @param callback
	 */
	getTicket(callback){
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"wx/getTicket",
			data: { channel : ajaxConfig.channel, type : ajaxConfig.type},
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
	 * 获取学习目标列表
	 * @param callback
	 */
	getLearningList(callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"user/learningList",
			data: { userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 *	获取推荐列表
	 * @param pageSize			每页显示条数
	 * @param pageIndex			页码
	 * @param learningType		学习目标
	 * @param callback
	 */
	getCustomChannel(pageSize,pageIndex,learningType,callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"hot/customChannel",
			data: { pageSize: pageSize, pageIndex: pageIndex, learningType: learningType, userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 *
	 * @param learningType				学习目标
	 * @param callback
	 */
	getHotChannel(learningType,callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"hot/hotChannelEx",
			data: { learningType:learningType, userID : _this.getUserId(), rating : 0, deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 *
	 * @param learningType				学习目标
	 * @param callback
	 */
	getHotChannelV3(learningType,callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"/hot/v3/hotChannel",
			data: { learningType:learningType, userID : _this.getUserId(), rating : 0, deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 *	获取首页幻灯片
	 * @param callback
	 */
	getFocusConfig(callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"focus/getFocusConfig",
			data: {},
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
	 * 获取最近更新
	 * @param callback
	 */
	getLatestChannelV2(pageSize, pageIndex, callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"hot/getLatestChannelV2",
			data: { pageSize : pageSize ,pageIndex : pageIndex },
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
	 * 获取热门关键词
	 * @param callback
	 */
	getHotKeywords(callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"search/hotKeywords",
			data: {},
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
	 * 搜索
	 * @param keyword
	 */
	searchChannelKeyword(keyword,pageIndex,pageSize,callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"search/searchChannelKeyword",
			data: {keyword : keyword, pageIndex: pageIndex, pageSize : pageSize, userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 获取每日一句
	 * @param callback
	 */
	getEveryDay(callback){
		let _this = this;
		let date = new Date();
		//未传递参数
		let _date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

		//--暂时没有新的数据
		// _date = '2017-03-30';

		$.ajax({
			type: "post",
			url: ajaxConfig.server_url + "hot/getEveryDayEnglishByDateV2",
			data: {
				date: _date,
				learningType: 0,
				userID: _this.getUserId(),
				rating: 0,
				deviceID: _this.getDeviceID(),
				type: 1
			},
			dataType: "json",
			success(data) {
				let _arr = [];
				let _tmp = {};

				if(data.status == 1){
					let _data = data.returnJSON;
					for(let i=0; i<_data.length; i++){
						let _item = _data[i];
						let __date = base.toLocalTime(_item.belongsTimestamp)[2];
						if(__date == _date){
							if(_item.newsType == 1){
								_tmp = _item;
							}else{
								_arr.push(_item);
							}
						}
					}
					callback([_tmp,_arr]);
				}else{
					callback(false,data.message);
				}
			}
		})
	},

	/**
	 * 获取每日推荐
	 * @param callback
	 */
	getEveryDayList(callback){
		let _mthis = this;
		let date = new Date();
		//未传递参数
		let _date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

		//--暂时没有新的数据
		// _date = '2017-03-30';

		$.ajax({
			type: "post",
			url: ajaxConfig.server_url + "hot/getEveryDayEnglishByDateV2",
			data: {
				date: _date,
				learningType: 0,
				userID: _mthis.getUserId(),
				rating: 0,
				deviceID: _mthis.getDeviceID(),
				type: 1
			},
			dataType: "json",
			success(data) {

				var _arr = [];

				if(data.status == 1){

					var _data = data.returnJSON;

					for(var i=0; i<_data.length; i++){
						var _this = _data[i];
						var __date = base.toLocalTime(_this.belongsTimestamp)[0];
						if(_arr.length == 0){
							_arr.push({
								date : __date,
								date2 :  base.toLocalTime(_this.belongsTimestamp)[2],
								datas : []
							})
						}
						var _flag = true;
						for(var j=0; j<_arr.length; j++){
							if(_arr[j].date == __date){
								_flag = false;
								break;
							}
						}
						if(_flag){
							_arr.push({
								date : __date,
								date2 :  base.toLocalTime(_this.belongsTimestamp)[2],
								datas : []
							})
						}

					}

					for(var i=0; i<_data.length; i++){
						var _this = _data[i];
						var __date = base.toLocalTime(_this.belongsTimestamp)[0];

						var _flag = false,_index = 0;
						for(var j=0; j<_arr.length; j++){
							if(_arr[j].date == __date){
								_flag = true;
								_index = j;
								break;
							}
						}
						if(_flag){
							_arr[_index].datas.push(_this);
						}

					}

					callback(_arr);
				}else{
					callback(false,data.message);
				}

			}
		})
	},

	/**
	 * 获取每日一句数据
	 * @param date					日期
	 * @param callback
	 */
	getEveryDayEnglishByDate(date, callback){
		let _this = this;
		let mydate = new Date();
		let _date = "";
		//未传递参数

		if(date == 'today'){
			_date = mydate.getFullYear() + "-" + (mydate.getMonth() + 1) + "-" + mydate.getDate();
		}else{
			_date = date;
		}

		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"hot/getEveryDayEnglishByDate",
			data: { date : _date, userID : _this.getUserId(), rating : 0, deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 获取热门音频
	 * @param pageSize			每页条数
	 * @param pageIndex			页码
	 * @param callback
	 */
	getHotAudioList(pageSize, pageIndex ,callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"hot/getHotAudioChannelV2",
			data: { pageSize:pageSize, pageIndex:pageIndex, userID : _this.getUserId(), rating : 0, deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 获取热门视频
	 * @param pageSize			每页条数
	 * @param pageIndex			页码
	 * @param callback
	 */
	getHotVideoList(pageSize, pageIndex ,callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"hot/getHotVideoChannelV2",
			data: { pageSize:pageSize, pageIndex:pageIndex, userID : _this.getUserId(), rating : 0, deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 获取分类列表
	 * @param callback
	 */
	getCategory(callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"category/getCategorys",
			data: { userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 根据课文ID获取课文
	 * @param lessonID			课文ID
	 * @param callback
	 */
	getLessonByID(lessonID, callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"lesson/getLessonByID",
			data: { lessonID: lessonID, userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type , learningType:0, rating: 0},
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
	 * 根据频道ID获取课文
	 * @param channelID			频道ID
	 * @param callback
	 */
	getLessonsByChannelID(channelID, callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"lesson/getLessonsByChannelID",
			data: { channelID: channelID, userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type , learningType:0, rating: 0},
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
	 * 根据分类ID获取频道信息
	 * @param categoryID		分类ID
	 * @param callback
	 */
	getAudioChannelsByCategoryIDV2(categoryID, callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"channel/getAudioChannelsByCategoryIDV2",
			data: { categoryID: categoryID, userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 *	微信下单
	 * @param payableAmount
	 * @param goldCoinsQty
	 * @param giftQty
	 * @param callback
	 */
	getWxOrder(payableAmount, goldCoinsQty, giftQty, callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"order/wxJSPay",
			data: { payableAmount: payableAmount, goldCoinsQty : goldCoinsQty, giftQty : giftQty, channel : ajaxConfig.channel, openID :  _this.getOpenID(), userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 获取购买金币微信支付订单
	 * @param product				产品ID
	 * @param callback
	 */
	getWxPayNew(product, callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"order/wxJSPayNew",
			data: { product: product, channel : ajaxConfig.channel, openID : _this.getOpenID(), userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 获取充值的金币数额
	 * @param callback
	 */
	getProductList(callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"order/productList",
			data: { userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 获取用户信息
	 * @param callback
	 */
	getUserInfoByID(userID, callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"user/getUserInfoByID",
			data: { userID : userID, deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 微信授权登录
	 * @param code				code
	 * @returns {boolean}
	 */
	getUser(code,call){
		let _this = this;

		if(code  == 'login'){
			let appid = 'wx484ec69840157a5a';
			let redirect_uri = encodeURI(window.location.href);
			let response_type = 'code';
			let scope = 'snsapi_userinfo';
//        var scope = 'snsapi_base';
			let state = '';
			if(call){
				state = call;
			}

			var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid +
				'&redirect_uri=' + redirect_uri +
				'&response_type=' + response_type +
				'&scope=' + scope +
				'&state=' + state +
				'#wechat_redirect';
			window.location.href =  url;
		}else{

			$.ajax({
				type: "post",
				url: ajaxConfig.server_url+"wx/UserInfo",
				data: { code: code, channel : ajaxConfig.channel},
				dataType: "json",
				success(data){

					// alert(JSON.stringify(data));

					if(data.status == 1){
						window.sessionStorage.setItem("userInfo",JSON.stringify(data.returnJSON));
						let _state = base.getParmar("state");
						if(!base.isNull(_state)){
							window.location.href = call;
							return false;
						}
					}else{
						alert("获取用户数据失败");
					}
				},
				error(e){
					alert(JSON.stringify(e));
				}
			});
		}
	},

	/**
	 * 获取用户购买列表
	 * @param userID				用户ID
	 * @param callback
	 */
	getBuyList(userID, callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"channel/buyList",
			data: { userID : base.isNull(userID) ? _this.getUserId() : userID, deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 获取用户购买列表详细数据
	 * @param userID				用户ID
	 * @param callback
	 */
	getUserBuyList(userID, callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"channel/buyChannelInfoList",
			data: { userID : base.isNull(userID) ? _this.getUserId() : userID, deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 付费频道下单
	 * @param productID					产品ID
	 * @param productType				产品类型
	 * @param timestemp					时间戳
	 * @param sign						签名
	 * @param userID					用户ID
	 * @param callback
	 */
	getChannelOrder(productID, productType, timestemp, sign, userID, callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"channel/channelOrder",
			data: { productID : productID, productType : productType, timestemp : timestemp, sign : sign, userID : base.isNull(userID) ? _this.getUserId() : userID, deviceID : _this.getDeviceID(), type : ajaxConfig.type},
			dataType: "json",
			success(data){
				//- 2017年4月27日13:40:35
				// alert(JSON.stringify(data));
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},

	/**
	 * 金币购买频道
	 * @param productID					产品ID
	 * @param productType				产品类型
	 * @param timestemp					时间戳
	 * @param sign						签名
	 * @param userID					用户ID
	 * @param callback
	 */
	goldBuyChannel(productID, productType, timestemp, sign, userID, callback){
		let _this = this;
		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"channel/buyChannel",
			data: { productID : productID, productType : productType, timestemp : timestemp, sign : sign, userID : base.isNull(userID) ? _this.getUserId() : userID, deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 微信支付购买付费频道
	 * @param orderNo						订单号
	 * @param desc							描述
	 * @param userName						购买用户姓名
	 * @param phoneNumber					购买用户联系方式
	 */
	wxJSPayChannel(orderNo, channel, desc, userName, phoneNumber, callback){

		let _this = this;

		$.ajax({
			type: "post",
			url: ajaxConfig.server_url+"order/wxJSPayChannel",
			data: { orderNo : orderNo, channel : channel, openID : _this.getOpenID(), desc : desc, userName : userName, phoneNumber : phoneNumber, userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
			dataType: "json",
			success(data){

				//- 2017年4月27日13:40:53
				alert(JSON.stringify(data));

				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});

	},

    /**
	 * 用户评论
     * @param channelID				频道ID
     * @param lessonID				课程ID
     * @param comment				评论内容
     * @param callback
     */
    commentChannel(channelID, lessonID, comment, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"channel/commentChannel",
            data: { channelID : channelID, lessonID : lessonID, comment : comment, userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 评论点赞
     * @param commentID				评论编号
     * @param callback
     */
    commentPraise(commentID, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"channel/commentPraise",
            data: { commentID : commentID, userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 获取频道的评论
     * @param pageIndex					页码
     * @param pageSize					每页条数
     * @param channelID					频道ID
     * @param callback
     */
    commentListByID(pageIndex, pageSize, channelID, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"channel/commentListByID",
            data: { pageIndex : pageIndex, pageSize : pageSize, channelID : channelID, userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * VIP包含的课程
     * @param callback
     */
    productVIP(callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/productVIP",
            data: { userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 金币购买VIP
     * @param VIPNum				VIP编号
     * @param timestemp				时间戳
     * @param sign					签名
     * @param callback
     */
    productCoinsBuy(VIPNum, timestemp, sign, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/productCoinsBuy",
            data: { VIPNum : VIPNum, timestemp : timestemp, sign : sign, userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 人民币购买VIP
     * @param productID					产品ID
     * @param timestemp					时间戳
     * @param sign						签名
     * @param callback
     */
    productRmbBuy(productID, timestemp, sign, callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/productRmbBuy",
            data: { productID : productID, timestemp : timestemp, sign : sign, userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 获取用户的VIP信息
     * @param callback
     */
    userVipInfo(callback){
        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/userVipInfo",
            data: { userID : _this.getUserId(), deviceID : _this.getDeviceID(), type : ajaxConfig.type},
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
	 * 获取验证码
     * @param mobilePhone			手机号
     * @param codeType				code
     * @param callback
     */
    sendCode(mobilePhone, codeType, callback){

        let _this = this;
        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"sms/sendCode",
            data: { mobilePhone : mobilePhone, codeType : codeType, userID : "", deviceID : "", type : ajaxConfig.type},
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
	 * 手机号登录、注册
     * @param mobilePhone		手机号
     * @param codeType			验证码
     * @param callback
     */
    phoneLoginIn(phone, checkCode, callback){
        let _this = this;

        let deviceID = window.localStorage.getItem("deviceID");

        if(base.isNull(deviceID)){
            deviceID = base.getUuid();
            window.localStorage.setItem("deviceID",deviceID);
        }

        $.ajax({
            type: "post",
            url: ajaxConfig.server_url+"user/phoneLoginIn",
            data: { phone : phone, checkCode : checkCode, userID : "", deviceID : deviceID, type : ajaxConfig.type},
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