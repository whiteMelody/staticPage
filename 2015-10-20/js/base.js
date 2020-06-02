//日志数组
var loger = new Array();
//配置文件
var config = {
	ajaxUrl : "/api.php/"	
}
//缓存参数
var cache = {
	_longitude : "",			//经度
	_latitude : "",				//纬度
	_pid : "",					//所在城市
	_user_id : "",				//当前用户编号（更新session时缓存
	_shop_id : "",				//店铺编号（商家用户登录后缓存
	_phone : "",				//用户手机号（通过手机号登录后缓存
	_tokes : "",				//tokes（第三方登录唯一标识
	_did : "",					//设备编号（网页版使用wap或者null
	_shakey : "",				//登录唯一标识
	param : new Object()		//缓存参数
}

//公用函数
var base = {
	getAttrData : function(target,name){
		return target.attr("data-"+name);
	},
	getParmar : function(paras){ 
		var url = location.href; 
		var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
		var paraObj = {}; 
		for (i=0; j=paraString[i]; i++){ 
			paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
		} 
		var returnValue = paraObj[paras.toLowerCase()]; 
		if(typeof(returnValue)=="undefined"){ 
			return ""; 
		}else{ 
			returnValue = returnValue.split("#")[0];
			return returnValue; 
		} 
	},
	getByteLen : function (val) {
		var len = 0;
		for (var i = 0; i < val.length; i++) {
			if (val[i].match(/[^\x00-\xff]/ig) != null) //全角
				len += 2;
			else
				len += 1;
		};
		return len;
	},
	cutStrForNum : function (str, num) {
		var len = 0;
		var index = 0;
		for (var i = 0; i < str.length; i++) {
			if (str[i].match(/[^\x00-\xff]/ig) != null) //全角
				len += 2;
			else
				len += 1;
			index++;
			if (len >= num) {
				break;
			}
		}
		if (len >= num) 
			newStr = str.substring(0, index) + "...";
		else
			newStr = str;
    	return newStr;
	},
	mathRandom : function(length){
		var num=""; 
		for(var i=0;i<length;i++) 
		{ 
			num+=Math.floor(Math.random()*10); 
		}
		return num; 	
	},
	twoDecimal : function(oNum){
		var num = parseFloat(oNum);
		if (isNaN(length)) return false;
		
		var num = Math.round(oNum*100)/100;
		return num;
	},
	delCookie : function(name){
		document.cookie = name+"=;expires="+(new Date(0)).toGMTString();
	},
	getCookie : function(objName){
		var arrStr = document.cookie.split("; ");
		for(var i = 0;i < arrStr.length;i ++){
			var temp = arrStr[i].split("=");
			if(temp[0] == objName) return unescape(temp[1]);
		}
	},
	setCookie : function(name,value,day){
		if(day==null || day=="" || day==undefined)
			day = 30; 
		var exp = new Date();
		exp.setTime(exp.getTime() + day*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},
	importJS : function(src, callback){
		var script = document.createElement("SCRIPT"), done = false;
		script.type = "text/javascript";
		script.src = src;
		script.charset = "GB2312";
		script.onload = script.onreadystatechange = function(){
			if ( !done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") ) {
				done = true;
				callback();
			}
		};
		document.getElementsByTagName("HEAD")[0].appendChild(script);
	},
	toLocalTime : function(nS) {     
		var date = new Date(parseInt(nS) * 1000);
		var str =  date.getFullYear().toString().substring(2,4) ;
		var myDate = str + "-" + base.addZero(date.getMonth()+1) + "-" + base.addZero(date.getDate()) + " " + base.addZero(date.getHours()) + ":" + base.addZero(date.getMinutes()) + ":" + base.addZero(date.getSeconds());
		return myDate; 
	},
	addZero : function(num){
		var str = num.toString();
		if(str.length == 1) return "0" + num;
		else return num;
	},
	random_num : function(smin, smax) {
		var Range = smax - smin;
		var Rand = Math.random();
		return (smin + Math.round(Rand * Range));
  	},
	saveLoger : function(msg){
		loger.push(msg+new Date().now());	
	},
	openLoader : function(){
		$(".loader").show(0);	
	},
	closeLoader : function(){
		$(".loader").hide(0);
		
	},
	isNull : function(obj){
		if(obj == undefined || obj == null || obj == "" || obj.length == 0)
			return true;
		else
			return false;
	},
	location : function(callback){
		// 百度地图API功能
		var map = new BMap.Map("commMap");
		var point = new BMap.Point(116.331398,39.897445);
		map.centerAndZoom(point,12);
	
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				var mk = new BMap.Marker(r.point);
				map.addOverlay(mk);
				map.panTo(r.point);
				callback(r.point.lng+','+r.point.lat);
			}
			else {
				callback('failed'+this.getStatus());
			}        
		},{enableHighAccuracy: true})
		
	},
	
	getDateDiff : function(dateTimeStamp){
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var halfamonth = day * 15;
		var month = day * 30;
		var now = new Date().getTime();
		var diffValue = now - dateTimeStamp;
		if(diffValue < 0){
		//若日期不符则弹出窗口告之
		//console.log("结束日期不能小于开始日期！");
		}
		var monthC =diffValue/month;
		var weekC =diffValue/(7*day);
		var dayC =diffValue/day;
		var hourC =diffValue/hour;
		var minC =diffValue/minute;
		if(monthC>=1){
		result= parseInt(monthC) + "个月前";
		}
		else if(weekC>=1){
		result= parseInt(weekC) + "周前";
		}
		else if(dayC>=1){
		result= parseInt(dayC) +"天前";
		}
		else if(hourC>=1){
		result= parseInt(hourC) +"个小时前";
		}
		else if(minC>=1){
		result= parseInt(minC) +"分钟前";
		}else
		result="刚刚";
		return result;
	},
	
	versions:function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {         //移动终端浏览器版本信息
			isTrident: u.indexOf('Trident') > -1, //IE内核
			isPresto: u.indexOf('Presto') > -1, //opera内核
			isWebKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			isGecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			isMobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			isAndroid: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			isIPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			isIPad: u.indexOf('iPad') > -1, //是否iPad
			isWebApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			isWeiXin: (u.match(/MicroMessenger/i) == 'MicroMessenger' || u.match(/MicroMessenger/i) == 'micromessenger')	//微信浏览器
		};
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()	
}

//	$.ajax({
//		 type: "GET",
//		 url: "/Sign",
//		 data: {ac:"sings",day:day,option:option},
//		 dataType: "json",
//		 success: function(data){
//			 update(data);
//		 }
//	});

//ajax配置函数
var baseAjax = {
	
	/*
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| comm ajax
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| Here are comm ajax js
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| 公用接口类
	|
	*/
	
	/*
	| ------------------------------------------
	| 验证用户登录
	| ------------------------------------------
	| 所需参数：null
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	checkUserLogin : function(callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/login",
			data: null,
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});
	},
	
	/*
	| ------------------------------------------
	| 验证用户登录
	| ------------------------------------------
	| 所需参数：null
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	int 
	|
	*/
	getUserId : function(callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/getsessionuserid",
			data: null,
			dataType: "json",
			success: function(data){
				callback(data.user_id);
			}
		});
	},
	
	/*
	| ------------------------------------------
	| 验证商家登录
	| ------------------------------------------
	| 所需参数：null
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	int 
	|
	*/
	getShopId : function(callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/getsessionuserid",
			data: null,
			dataType: "json",
			success: function(data){
				callback(data.shop_id);
			}
		});
	},
	
	/*
	| ------------------------------------------
	| 验证用户登录
	| ------------------------------------------
	| 所需参数：
	|	did	int 设备唯一标识
	|	longitude double 经度
	|	latitude double 纬度
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Object 城市对象 
	|
	*/
	indexInit : function(did,longitude,latitude,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/init",
			data: {did:did,longitude:longitude,latitude:latitude},
			dataType: "json",
			success: function(data){
				callback(data);
			}
		});
	},
	
	
	/*
	| ------------------------------------------
	| 获取短信验证码
	| ------------------------------------------
	| 所需参数：
	|	phone int 手机号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	int 验证码
	|
	*/
	getCode : function(phone,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/verify",
			data: {phone:phone},
			dataType: "json",
			success: function(data){
				callback(data.verify);
			}
		});		
	},
	/*
	| ------------------------------------------
	| 获取全国省市县
	| ------------------------------------------
	| 所需参数：
	|	id int 查询区域id
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 区域数组
	|
	*/
	getArea : function(id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/getRegion",
			data: {id:id},
			dataType: "json",
			success: function(data){
				return data.list;
			}
		});	
	},
	/*
	| ------------------------------------------
	| 获取版本号
	| ------------------------------------------
	| 所需参数：
	|	暂无
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	暂无
	|
	*/
	getVersions : function(app_id,version_num,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/getRegion",
			data: {app_id:app_id,version_num:version_num},
			dataType: "json",
			success: function(data){
				if(data.verify == 301 || data.code == "301")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 获取行业分类
	| ------------------------------------------
	| 所需参数：null
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 行业数组
	|
	*/
	getTrade : function(callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/getTrade",
			data: null,
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 获取地区详情
	| ------------------------------------------
	| 所需参数：
	|	int pid 地区编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Object 地区详情
	|
	*/
	getCityCent : function(pid,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/city_cent",
			data: {pid:pid},
			dataType: "json",
			success: function(data){
				callback(data.info);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 获取热门搜索
	| ------------------------------------------
	| 所需参数： null
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Array 热门搜索
	|
	*/
	getHotKey : function(callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/get_hot_key",
			data: null,
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 获取运费
	| ------------------------------------------
	| 所需参数： 
	|	pay_price 订单价格
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	double 运费价格
	|
	*/
	getFreight : function(pay_price,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/cart_freight",
			data: {pay_price:pay_price},
			dataType: "json",
			success: function(data){
				callback(data.freight);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 验证登录
	| ------------------------------------------
	| 所需参数： 
	|	string shakey sessionId
	|	int did			
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	int 登录状态
	|
	*/
	isLogin : function(shakey,did,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/is_logo",
			data: {shakey:shakey,did:did},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 注销登录
	| ------------------------------------------
	| 所需参数： 
	|	string shakey sessionId
	|	int did			
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	int 登录状态
	|
	*/
	loginOut : function(shakey,did,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/logo_out",
			data: {shakey:shakey,did:did},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 网站信息
	| ------------------------------------------
	| 所需参数： 
	|	id	编号			
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Array 信息数组
	|
	*/
	getWebInfo : function(id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/web_info",
			data: {id:id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 生成订单--购物
	| ------------------------------------------
	| 所需参数： 
	|	user_id		用户编号
	|	message		备注
	|	add_id		添加编号
	|	sales_type	购买类型
	|	pid			pid
	|	cart_json	购物车参数
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回结果
	|
	*/
	createOrderShopping : function(user_id,message,add_id,sales_type,pid,cart_json,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/createorder_shopping",
			data: {user_id:user_id,message:message,add_id:add_id,sales_type:sales_type,pid:pid,cart_json:cart_json},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 生成订单--餐饮
	| ------------------------------------------
	| 所需参数： 
	|	user_id		用户编号
	|	shop_id		店铺编号
	|	message		备注
	|	add_id		添加编号
	|	sales_type	购买类型
	|	pid			pid
	|	shopping	编号
	|	cart_json	购物车参数
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回结果
	|
	*/
	createOrderCatering : function(user_id,shop_id,message,add_id,sales_type,pid,shopping,cart_json,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/createorder",
			data: {user_id:user_id,shop_id:shop_id,message:message,add_id:add_id,sales_type:sales_type,pid:pid,shopping:shopping,cart_json:cart_json},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 生成订单--预约
	| ------------------------------------------
	| 所需参数： 
	|	user_id		用户编号
	|	shop_id		店铺编号
	|	message		备注
	|	sales_type	购买类型
	|	pid			pid
	|	start_time	预约时间
	|	c_phone		预约电话
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回结果
	|
	*/
	createOrderMakean : function(user_id,shop_id,message,sales_type,pid,start_time,c_phone,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/createorder_makean",
			data: {user_id:user_id,shop_id:shop_id,message:message,sales_type:sales_type,pid:pid,start_time:start_time,c_phone:c_phone},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 生成订单--信息
	| ------------------------------------------
	| 所需参数： 
	|	user_id		用户编号
	|	shop_id		店铺编号
	|	message		备注
	|	sales_type	购买类型
	|	pid			pid
	|	c_phone		预约电话
	|	job_id		招聘编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回结果
	|
	*/
	createOrderInfo : function(user_id,shop_id,message,sales_type,pid,c_phone,job_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/createorder_info",
			data: {user_id:user_id,shop_id:shop_id,message:message,sales_type:sales_type,pid:pid,c_phone:c_phone,job_id:job_id},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 生成订单--信息
	| ------------------------------------------
	| 所需参数： 
	|	user_id		用户编号
	|	shop_id		店铺编号
	|	message		备注
	|	sales_type	购买类型
	|	start_time	开始时间
	|	end_time	结束时间
	|	people_num	入住人数
	|	price		价格
	|	contacts	联系人
	|	c_phone		联系电话
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回结果
	|
	*/
	createOrderHotel : function(user_id,shop_id,message,sales_type,start_time,end_time,people_num,price,contacts,c_phone,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/createorder_hotel",
			data: {user_id:user_id,shop_id:shop_id,message:message,sales_type:sales_type,start_time:start_time,end_time:end_time,people_num:people_num,price:price,contacts:contacts,c_phone:c_phone},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	
	/*
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| user ajax
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| Here are user ajax js
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| 用户接口类
	|
	*/
	
	/*
	| ------------------------------------------
	| 用户注册
	| ------------------------------------------
	| 所需参数：
	|	user_phon int 手机号
	|	verify int 验证码
	|	password string 密码
	|	did string 设备号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	userReg : function(user_phone,verify,password,did,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/register",
			data: {user_phone:user_phone,verify:verify,password:password,did:did},
			dataType: "json",
			success: function(data){
				callback(data);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 忘记密码
	| ------------------------------------------
	| 所需参数：
	|	user_phon int 手机号
	|	verify int 验证码
	|	password string 密码
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	findPassword : function(user_phone,verify,password,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/findPassword",
			data: {user_phone:user_phone,verify:verify,password:password},
			dataType: "json",
			success: function(data){
				if(data.code == 301 || data.code == "301")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 用户登录
	| ------------------------------------------
	| 所需参数：
	|	user_phon int 手机号
	|	password string 密码
	|	did string 设备标识
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Object 用户对象
	|
	*/
	userLogin : function(user_phone,password,did,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"public/login",
			data: {user_phone:user_phone,password:password,did:did},
			dataType: "json",
			success: function(data){
				callback(data);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 获取用户评论
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 评论数组
	|
	*/
	getComment : function(user_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/getComment",
			data: {user_id:user_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 修改用户资料
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	user_name int 用户名
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	editUser : function(user_id,user_name,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/editUser",
			data: {user_id:user_id,user_name:user_name},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 用户详细信息
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Object 资料数组
	|
	*/
	getUserDetail : function(user_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/getUser",
			data: {user_id:user_id},
			dataType: "json",
			success: function(data){
				callback(data.info);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 获取用户收藏
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	type int 收藏类型
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 收藏数组
	|
	*/
	getCollect : function(type,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/getCollect",
			data: {type:type},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 加入收藏
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	goods_id int 商品编号
	|	type int 收藏类型
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	addCollect : function(user_id,goods_id,type,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/addCollect",
			data: {user_id:user_id,goods_id:goods_id,type:type},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 删除用户收藏
	| ------------------------------------------
	| 所需参数：
	|	collect_id int 收藏编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 收藏数组
	|
	*/
	delCollect : function(collect_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/delCollect",
			data: {collect_id:collect_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 修改密码
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	oldpassword string 旧密码
	|	password string 新密码
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	editPassword : function(user_id,oldpassword,password,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/editPassword",
			data: {user_id:user_id,oldpassword:oldpassword,password:password},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 加入购物车
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	goods_id int 商品编号
	|	goods_num string 商品数量
	|	goods_attr string 商品属性
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	addCart : function(user_id,goods_id,goods_num,goods_attr,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/addCart",
			data: {user_id:user_id,goods_id:goods_id,goods_num:goods_num,goods_attr:goods_attr},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 删除购物车
	| ------------------------------------------
	| 所需参数：
	|	cart_id int 购物车编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	返回参数：true/false
	|
	*/
	getAddress : function(cart_id){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/delCart",
			data: {cart_id:cart_id},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 添加评论
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	com_contents string 评论内容
	|	com_star int 评论星级
	|	og_id int og_id
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	返回参数：true/false
	|
	*/
	addComment : function(user_id,com_contents,com_star,og_id){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/addComment",
			data: {user_id:user_id,com_contents:com_contents,com_star:com_star,og_id:og_id},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 我要评论
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	返回参数：true/false
	|
	*/
	canComment : function(user_id){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/canComment",
			data: {user_id:user_id},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 获取地址
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 地址数组
	|
	*/
	getAddress : function(user_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/getAddress",
			data: {user_id:user_id},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 编辑地址
	| ------------------------------------------
	| 所需参数：
	|	add_id int 地址编号
	|	add_province int 省
	|	add_city int 市
	|	add_district int 县
	|	add_address int 详细地址
	|	add_phone int 联系方式
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	editAddress : function(add_id,add_province,add_city,add_district,add_address,add_phone,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/editAddress",
			data: {add_id:add_id,add_province:add_province,add_city:add_city,add_district:add_district,add_address:add_address,add_phone:add_phone},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	
	
	/*
	| ------------------------------------------
	| 删除地址
	| ------------------------------------------
	| 所需参数：
	|	add_id int 地址编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数:
	|	code 返回码
	|
	*/
	delAddress : function(add_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/delAddress",
			data: {add_id:add_id},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 设为默认地址
	| ------------------------------------------
	| 所需参数：
	|	add_id int 地址编号
	|	user_id int 用户编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数:
	|	code 返回码
	|
	*/
	setDefault : function(add_id,user_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/default_Address",
			data: {add_id:add_id,user_id:user_id},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 新增地址
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	add_province string 省
	|	add_city string 市
	|	add_district string 县
	|	add_address string 详细地址
	|	add_phone int 联系方式
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	addAddress : function(add_id,add_province,add_city,add_district,add_address,add_phone,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/addAddress",
			data: {add_id:add_id,add_province:add_province,add_city:add_city,add_district:add_district,add_address:add_address,add_phone:add_phone},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 查询购物车
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 购物车数组
	|
	*/
	getCart : function(user_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/getCart",
			data: {user_id:user_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 删出某个购物流程的购物车产品
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	sales_type	int 购买类型
	|	type	int 其他类型
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	delStype : function(user_id,sales_type,type,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/del_stype",
			data: {user_id:user_id,sales_type:sales_type,type:type},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 查询购物车产品
	| ------------------------------------------
	| 所需参数：
	|	cart_json json 查询参数
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Array 购物车数组
	|
	*/
	getCartData : function(cart_json,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/get_cart_json",
			data: {cart_json:cart_json},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 库存检查
	| ------------------------------------------
	| 所需参数：
	|	goods_id int 产品编号
	|	goods_num int 产品数量
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	checkStock : function(goods_id,goods_num,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/check_stock",
			data: {goods_id:goods_id,goods_num:goods_num},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	
	/*
	| ------------------------------------------
	| 新增银行卡
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	card_number int 银行卡号
	|	card_name string 卡主
	|	bank string 银行名称
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	addBank : function(user_id,card_number,card_name,bank,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/addbank",
			data: {user_id:user_id,card_number:card_number,card_name:card_name,bank:bank},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 删除银行卡
	| ------------------------------------------
	| 所需参数：
	|	id int 绑定编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	delbank : function(id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/delbank",
			data: {id:id},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 获取银行卡
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Array 银行卡数组
	|
	*/
	getbank : function(user_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/bank_list",
			data: {user_id:user_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 获取足迹
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Array 足迹数组
	|
	*/
	getBrowse : function(user_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/footprint_list",
			data: {user_id:user_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 删除足迹
	| ------------------------------------------
	| 所需参数：
	|	id int 足迹编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	delBrowse : function(id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/del_footprint",
			data: {id:id},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	
	/*
	| ------------------------------------------
	| 我的发布（供求信息）
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	page int 页码
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Array 信息数组
	|
	*/
	mySupply : function(user_id,page,state,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/supply_user_list",
			data: {user_id:user_id,page:page,state:state},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 列表页（供求信息）
	| ------------------------------------------
	| 所需参数：
	|	type_id int 分类编号
	|	page int 页码
	|	longitude double 经度
	|	latitude double	纬度
	|	distance int 距离（米）
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Array 信息数组
	|
	*/
	supplyList : function(type_id,page,longitude,latitude,distance,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/supply_list",
			data: {type_id:type_id,page:page,longitude:longitude,latitude:latitude,distance:distance},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	
	/*
	| ------------------------------------------
	| 添加发布
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	type int 发布类型
	|	title string 标题
	|	price double 价格
	|	describet string 描述
	|	c_phone	int	联系方式
	|	bus_area string 发布区域 
	|	is_ind_shop int 店铺状态
	|	contact string 联系人
	|	type_id	int 类型
	|	longitude double 经度
	|	latitude double 纬度
	|	img file 图片文件流
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	supplyAdd : function(user_id,type,title,price,describet,c_phone,bus_area,is_ind_shop,contact,type_id,longitude,latitude,img,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/supply_add",
			data: {user_id:user_id,type:type,title:title,price:price,describet:describet,c_phone:c_phone,bus_area:bus_area,is_ind_shop:is_ind_shop,contact:contact,type_id:type_id,longitude:longitude,latitude:latitude,img:img},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	
	/*
	| ------------------------------------------
	| 修改发布
	| ------------------------------------------
	| 所需参数：
	|	id int 发布编号
	|	type int 发布类型
	|	title string 标题
	|	price double 价格
	|	describet string 描述
	|	c_phone	int	联系方式
	|	bus_area string 发布区域 
	|	is_ind_shop int 店铺状态
	|	contact string 联系人
	|	type_id	int 类型
	|	longitude double 经度
	|	latitude double 纬度
	|	img file 图片文件流
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	supplyUpdate : function(id,type,title,price,describet,c_phone,bus_area,is_ind_shop,contact,type_id,longitude,latitude,img,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/supply_edit",
			data: {id:id,type:type,title:title,price:price,describet:describet,c_phone:c_phone,bus_area:bus_area,is_ind_shop:is_ind_shop,contact:contact,type_id:type_id,longitude:longitude,latitude:latitude,img:img},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	
	/*
	| ------------------------------------------
	| 获取发布的图片
	| ------------------------------------------
	| 所需参数：
	|	supply_id int 发布编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Array 图片数组
	|
	*/
	getSupplyImgs : function(supply_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/supply_imglist",
			data: {supply_id:supply_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 删除发布的图片
	| ------------------------------------------
	| 所需参数：
	|	id int 图片编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	delSupplyImg : function(id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/supply_imglist",
			data: {id:id},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 我的收支
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	shop_id int 店铺编号
	|	type int 支付类型
	|	page int 页码
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Array 收支数组
	|
	*/
	myIstatement : function(user_id,shop_id,type,page,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/my_istatement",
			data: {user_id:user_id,shop_id:shop_id,type:type,page:page},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 添加收支
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	shop_id int 店铺编号
	|	type int 支付类型
	|	explain
	|	t_price
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	addIstatement : function(user_id,shop_id,type,explain,t_price,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/istatement_add",
			data: {user_id:user_id,shop_id:shop_id,type:type,page:page,explain:explain,t_price:t_price},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 删除收支
	| ------------------------------------------
	| 所需参数：
	|	id int 收支编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	delIstatement : function(id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/istatement_del",
			data: {id:id},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| goods ajax
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| Here are goods ajax js
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| 商品接口类
	|
	*/
	
	/*
	| ------------------------------------------
	| 获取商品
	| ------------------------------------------
	| 所需参数：
	|	shop_id int 店铺编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 商品数组
	|
	*/
	getGoods : function(shop_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Goods/getGoods",
			data: {shop_id:shop_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 删除商品
	| ------------------------------------------
	| 所需参数：
	|	goods_id int 商品编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	delGoods : function(goods_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Goods/delGoods",
			data: {goods_id:goods_id},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	
	
	/*
	| ------------------------------------------
	| 商品图文信息
	| ------------------------------------------
	| 所需参数：
	|	goods_id int 商品编号
	|	imgasd file 图片文件流
	|	imgvvv file 图片文件流
	|	text string 商品描述
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	goodsPictext : function(goods_id,imgasd,imgvvv,text,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Goods/good_pictext",
			data: {goods_id:goods_id,imgasd:imgasd,imgvvv:imgvvv,text:text},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 获取店铺的商品
	| ------------------------------------------
	| 所需参数：
	|	shop_id int 商家编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 商品数组
	|
	*/
	shopGoodsList : function(shop_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Goods/shopGoodsList",
			data: {shop_id:shop_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 商品详细信息
	| ------------------------------------------
	| 所需参数：
	|	goods_id int 商品编号
	|	longitude double 经度
	|	latitude double 纬度
	|	user_id int 用户编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Json 商品大对象
	|
	*/
	goodsDetail : function(goods_id,longitude,latitude,user_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Goods/goodsDetail",
			data: {goods_id:goods_id,longitude:longitude,latitude:latitude,user_id:user_id},
			dataType: "json",
			success: function(data){
				callback(data);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 修改商品详情图片
	| ------------------------------------------
	| 所需参数：
	|	graphic_id int 图片编号
	|	img file 图片文件流
	|	ac action 操作类型
	|	goods_id int 产品编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	updateGoodsImg : function(graphic_id,img,ac,goods_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Goods/editGoodsGraphic",
			data: {graphic_id:graphic_id,img:img,ac:ac,goods_id:goods_id},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 新增商品
	| ------------------------------------------
	| 所需参数：
	|	shop_id int 店铺编号
	|	goods_indeximg string 商品大图
	|	goods_graphic array 商品组图[]
	|	goods_name string 商品名称
	|	goods_price double 商品价格
	|	goods_type string/array/json 商品属性
	|	goods_stock int 商品库存
	|	sales_type int 销售方式
	|	goods_parameter string 其他参数
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Object 商品对象
	|
	*/
	addGoods : function(shop_id,goods_indeximg,goods_graphic,goods_name,goods_price,goods_type,goods_stock,sales_type,goods_parameter,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Goods/addGoods",
			data: {shop_id:shop_id,goods_indeximg:goods_indeximg,goods_graphic:goods_graphic,goods_name:goods_name,goods_type:goods_type,goods_stock:goods_stock,sales_type:sales_type,goods_parameter:goods_parameter},
			dataType: "json",
			success: function(data){
				callback(data.info);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 修改商品
	| ------------------------------------------
	| 所需参数：
	|	goods_id int 商品编号
	|	goods_indeximg string 商品大图
	|	goods_name string 商品名称
	|	goods_price double 商品价格
	|	goods_type string/array/json 商品属性
	|	goods_stock int 商品库存
	|	sales_type int 销售方式
	|	goods_parameter string 其他参数
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Object 商品对象
	|
	*/
	editGoods : function(goods_id,goods_indeximg,goods_name,goods_price,goods_type,goods_stock,sales_type,goods_parameter,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Goods/editGoods",
			data: {goods_id:goods_id,goods_indeximg:goods_indeximg,goods_name:goods_name,goods_type:goods_type,goods_stock:goods_stock,sales_type:sales_type,goods_parameter:goods_parameter},
			dataType: "json",
			success: function(data){
				callback(data.info);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 添加商品初始化
	| ------------------------------------------
	| 所需参数：
	|	shop_id int 商品编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	addInit : function(shop_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Goods/addGoodsInit",
			data: {shop_id:shop_id},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 获取该商品的评论
	| ------------------------------------------
	| 所需参数：
	|	goods_id int 商品编号
	|	com_star int 评论星级
	|	page int 页码
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Array 评论数组
	|
	*/
	getGoodsComm : function(shop_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Goods/comGoodslist",
			data: {shop_id:shop_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 添加招聘
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	shop_id int 店铺编号
	|	longitude double 经度
	|	latitude double 纬度
	|	title string 标题
	|	business_area string 营业区域
	|	address string 详细地址
	|	number int 招聘人数
	|	education string 学历
	|	working_years string 工作年限
	|	is_fresh int 是否刷新
	|	monthly_salary double 月薪
	|	gender int 性别 
	|	job_description 招聘详细介绍
	|	contact string 联系人
	|	m_phone int 联系方式
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	addJob : function(user_id,shop_id,longitude,latitude,title,business_area,address,number,education,working_years,is_fresh,monthly_salary,gender,job_description,contact,m_phone,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Goods/add_job",
			data: {user_id:user_id,shop_id:shop_id,longitude:longitude,latitude:latitude,title:title,business_area:business_area,address:address,number:number,education:education,working_years:working_years,is_fresh:is_fresh,monthly_salary:monthly_salary,gender:gender,job_description:job_description,contact:contact,m_phone:m_phone},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 修改招聘
	| ------------------------------------------
	| 所需参数：
	|	user_id int 用户编号
	|	shop_id int 店铺编号
	|	longitude double 经度
	|	latitude double 纬度
	|	title string 标题
	|	business_area string 营业区域
	|	address string 详细地址
	|	number int 招聘人数
	|	education string 学历
	|	working_years string 工作年限
	|	is_fresh int 是否刷新
	|	monthly_salary double 月薪
	|	gender int 性别 
	|	job_description 招聘详细介绍
	|	contact string 联系人
	|	m_phone int 联系方式
	|	job_id int 招聘信息编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	updateJob : function(user_id,shop_id,longitude,latitude,title,business_area,address,number,education,working_years,is_fresh,monthly_salary,gender,job_description,contact,m_phone,job_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Goods/edit_job",
			data: {user_id:user_id,shop_id:shop_id,longitude:longitude,latitude:latitude,title:title,business_area:business_area,address:address,number:number,education:education,working_years:working_years,is_fresh:is_fresh,monthly_salary:monthly_salary,gender:gender,job_description:job_description,contact:contact,m_phone:m_phone,job_id:job_id},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 删除招聘
	| ------------------------------------------
	| 所需参数：
	|	job_id int 招聘信息编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	delJob : function(job_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Goods/del_job",
			data: {job_id:job_id},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| shop ajax
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| Here are shop ajax js
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| 商家接口类
	|
	*/
	
	/*
	| ------------------------------------------
	| 商家回复（评论）
	| ------------------------------------------
	| 所需参数：
	|	com_id int 评论编号
	|	reply_contents int 商品编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	replyComment : function(com_id,reply_contents,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Shop/replyComment",
			data: {com_id:com_id,reply_contents:reply_contents},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 删除店铺大图
	| ------------------------------------------
	| 所需参数：
	|	id int 店铺编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	delShopImg : function(id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Shop/delShopImg",
			data: {id:id},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 申请开店
	| ------------------------------------------
	| 所需参数：
	|	shop_name int 店铺名称
	|	user_id int 用户编号
	|	trade_id int 行业类型
	|	registernum int 申请编号
	|	ids_a string 店铺大图
	|	ids_b string 店铺logo
	|	shop_address string 店铺地址
	|	shop_proposer string 申请人姓名
	|	shop_phone int 申请人电话
	|	longitude double 店铺经度
	|	latitude double 店铺纬度
	|	send_region_id int 注册编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Object 店铺对象
	|
	*/
	addShop : function(shop_name,user_id,trade_id,registernum,bus_license,shop_address,shop_proposer,shop_phone,longitude,latitude,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Shop/addShop",
			data: {shop_name:shop_name,user_id:user_id,trade_id:trade_id,registernum:registernum,bus_license:bus_license,shop_address:shop_address,shop_proposer:shop_proposer,shop_phone:shop_phone,longitude:longitude,latitude:latitude},
			dataType: "json",
			success: function(data){
				callback(data);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 我的收入
	| ------------------------------------------
	| 所需参数：
	|	shop_id int 商家编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	object 收入对象
	|
	*/
	shopIncome : function(shop_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Shop/my_shop_income",
			data: {shop_id:shop_id},
			dataType: "json",
			success: function(data){
				callback(data);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 我的银行卡
	| ------------------------------------------
	| 所需参数：
	|	shop_id int 商家编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 银行卡数组
	|
	*/
	bankList : function(shop_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"User/bank_list",
			data: {shop_id:shop_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 获取我的店铺商品
	| ------------------------------------------
	| 所需参数：
	|	shop_id int 店铺编号
	|	type int 行业类型
	|	page int 页码
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 商品数组
	|
	*/
	getGoods : function(id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Shop/getGoods",
			data: {shop_id:shop_id,type:type,page:page},
			dataType: "json",
			success: function(data){
				callback(data.other_list);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 获取商家信息
	| ------------------------------------------
	| 所需参数：
	|	shop_id int 店铺编号
	|	field int 所在地区
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Object 商家信息
	|
	*/
	getShop : function(id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Shop/getShop",
			data: {shop_id:shop_id,field:field},
			dataType: "json",
			success: function(data){
				callback(data.info);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 修改商家信息
	| ------------------------------------------
	| 所需参数：
	|	shop_id int 店铺编号
	|	shop_logo file 图片文件流
	|	shop_indeximg file 图片文件流
	|	img1 file 图片文件流
	|	img2 file 图片文件流
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	|
	*/
	updateShop : function(shop_id,shop_logo,shop_indeximg,img1,img2,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Shop/editShop",
			data: {shop_id:shop_id,shop_logo:shop_logo,shop_indeximg:shop_indeximg,img1:img1,img2:img2},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	
	/*
	| ------------------------------------------
	| 商家详情
	| ------------------------------------------
	| 所需参数：
	|	shop_id int 店铺编号
	|	longitude double 经度
	|	latitude double 纬度
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Object 商家对象
	|
	*/
	shopDetail : function(shop_id,longitude,latitude,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Shop/ShopDetail",
			data: {shop_id:shop_id,longitude:longitude,latitude:latitude},
			dataType: "json",
			success: function(data){
				callback(data.info);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 店铺收支明细
	| ------------------------------------------
	| 所需参数：
	|	shop_id int 店铺编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Array 收支数组
	|
	*/
	shopIstatement : function(shop_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Shop/shop_istatement",
			data: {shop_id:shop_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| show ajax
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| Here are show ajax js
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| 展示接口类
	|
	*/
	
	/*
	| ------------------------------------------
	| 获取首页信息
	| ------------------------------------------
	| 所需参数：
	|	pid int 城市编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 首页信息数组
	|
	*/
	index : function(pid,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Show/index",
			data: {pid:pid},
			dataType: "json",
			success: function(data){
				callback(data);
			}
		});	
	},
	/*
	| ------------------------------------------
	| 获取附近信息
	| ------------------------------------------
	| 所需参数：
	|	search	关键字
	|	trade_id	行业编号
	|	longitude	经度
	|	latitude	纬度
	|	distance	距离
	|	type_id		分类
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 附近信息数组
	|
	*/
	nearby : function(search,sales_type,longitude,latitude,distance,type_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Show/nearby",
			data: {search:search,sales_type:sales_type,longitude:longitude,latitude:latitude,distance:distance,type_id:type_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 获取附近信息
	| ------------------------------------------
	| 所需参数：
	|	longitude	经度
	|	latitude	纬度
	|	distance	距离
	|	sales_type	销售类型
	|	type_id		分类
	|	page		页码
	|	city_id		城市编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 附近信息数组
	|
	*/
	nearbyShop : function(longitude,latitude,distance,sales_type,type_id,page,city_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Show/nearbyshop",
			data: {longitude:longitude,latitude:latitude,distance:distance,sales_type:sales_type,type_id:type_id,page:page,city_id:city_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 获取商品分类
	| ------------------------------------------
	| 所需参数：
	|	sales_type	购买类型
	|	type_id 分类编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 商品分类数组
	|
	*/
	getCategory : function(sales_type,type_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Show/getCategory",
			data: {sales_type:sales_type,type_id:type_id},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| pay ajax
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| Here are pay ajax js
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| 支付接口类
	|
	*/
	
	/*
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| order ajax
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| Here are order ajax js
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| 支付接口类
	|
	*/
	
	
	/*
	| ------------------------------------------
	| 商家发货
	| ------------------------------------------
	| 所需参数：
	|	order_id 订单编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	sendOrderGoods : function(order_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Order/sendOrderGoods",
			data: {order_id:order_id},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 查询商家订单
	| ------------------------------------------
	| 所需参数：
	|	shop_id 商家编号
	|	status 订单状态
	|	sales_type 购买类型
	|	type 类型
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 订单数组
	|
	*/
	getShopOrder : function(order_id,sales_type,type,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Order/getShopOrder",
			data: {shop_id:shop_id,status:status,sales_type:sales_type,type:type},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 查询用户订单
	| ------------------------------------------
	| 所需参数：
	|	user_id 用户编号
	|	status 订单状态
	|	sales_type 购买类型
	|	type 类型
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	array 订单数组
	|
	*/
	getUserOrder : function(user_id,sales_type,type,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Order/getuserorder",
			data: {user_id:user_id,status:status,sales_type:sales_type,type:type},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 用户下单
	| ------------------------------------------
	| 所需参数：
	|	shop_id 商家编号
	|	status 订单状态
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	addOrder : function(order_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Order/addOrder",
			data: {shop_id:shop_id,status:status},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	
	
	/*
	| ------------------------------------------
	| 确认收货
	| ------------------------------------------
	| 所需参数：
	|	order_id 订单编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：true/false
	|
	*/
	confirmOrder : function(order_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Order/addOrder",
			data: {order_id:order_id},
			dataType: "json",
			success: function(data){
				if(data.code == 200 || data.code == "200")
					callback(true);
				else
					callback(false);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 订单详情
	| ------------------------------------------
	| 所需参数：
	|	order_id 订单编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Object 订单对象
	*/
	orderDetails : function(order_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Order/order_details",
			data: {order_id:order_id},
			dataType: "json",
			success: function(data){
				callback(data.info);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 订单统计
	| ------------------------------------------
	| 所需参数：
	|	shop_id 店铺编号
	|	user_id 用户编号
	|	status 订单状态
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Object 订单对象
	*/
	orderDetails : function(shop_id,user_id,status,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Order/order_details",
			data: {shop_id:shop_id,user_id:user_id,status:status},
			dataType: "json",
			success: function(data){
				callback(data);
			}
		});	
	},
	
	/*
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| buy ajax
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| Here are buy ajax js
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| 购物接口类
	|
	*/
	
	/*
	| ------------------------------------------
	| 酒店 第一步
	| ------------------------------------------
	| 所需参数：
	|	user_id 用户编号
	|	pid pid
	|	start_time 入住时间
	|	end_time 退房时间
	|	is_hour 订房类型
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	code 返回码
	*/
	hotelOne : function(user_id,pid,start_time,end_time,is_hour,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Catering/hotel_one",
			data: {user_id:user_id,pid:pid,start_time:start_time,end_time:end_time,is_hour:is_hour},
			dataType: "json",
			success: function(data){
				callback(data.code);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 获取酒店第一步数据
	| ------------------------------------------
	| 所需参数：
	|	user_id 用户编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Object 酒店信息对象
	*/
	getHotelOne : function(user_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Catering/hotel_one_find",
			data: {user_id:user_id},
			dataType: "json",
			success: function(data){
				callback(data.info);
			}
		});	
	},
	
	/*
	| ------------------------------------------
	| 获取招聘信息
	| ------------------------------------------
	| 所需参数：
	|	longitude 经度
	|	latitude 纬度
	|	distance 距离
	|	page 页码
	|	goods_type 商品类型
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Array 招聘信息数组
	*/
	getJobs : function(longitude,latitude,distance,page,goods_type,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Catering/job_list",
			data: {longitude:longitude,latitude:latitude,distance:distance,page:page,goods_type:goods_type},
			dataType: "json",
			success: function(data){
				callback(data.list);
			}
		});	
	},
	
	
	/*
	| ------------------------------------------
	| 招聘详细信息
	| ------------------------------------------
	| 所需参数：
	|	job_id 招聘编号
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	Object 招聘信息对象
	*/
	getJobDetail : function(job_id,callback){
		$.ajax({
			type: "POST",
			url: config.ajaxUrl+"Catering/job_detail",
			data: {job_id:job_id},
			dataType: "json",
			success: function(data){
				callback(data.info);
			}
		});	
	}
	
}
