//日志数组
var loger = new Array();
//配置文件
var config = {
	ajaxUrl : "http://192.168.3.225",
	load_img : "source/images/default-load.png",
	timer : new Date().getTime(),
	loadArr : new Array()
}

/*
	//--channelId
 *  0 频道
 *  1 课文
 *  2 外部url

 *  //--channelType
 *  1 音频
 *  2 视频
 *
 *
 * */

//缓存参数
var cache = {
	_appid : "",				//app唯一标识
	_token : "",				//用户唯一标识
	params : new Object()		//其他缓存参数
}

//公用函数
var base = {
	getAttrData : function(target,name){
		return target.attr("data-"+name);
	},
	pushLoader : function(_timerID,_imgUrl){
		var loader = {
			url : _imgUrl,
			timer : _timerID,
			status : "wait" //状态 wait,loading，loaded，fail
		}
		config.loadArr.push(loader);
	},
	loadImgs : function(){

		for(var i=0; i<config.loadArr.length; i++){
			var loader = config.loadArr[i];
			loader.status = "loading";
			var img = new Image();
			img.src = loader.url;

			if (img.complete) {
				$("img[data-time="+loader.timer+"]").attr("src",loader.url);
				loader.status = "loaded";
				img.onload = null;
				config.loadArr.splice(i,1);
			} else {
				img.onload = function () {
					$("img[data-time="+loader.timer+"]").attr("src",loader.url);
					loader.status = "loaded";
					img.onload = null;
					config.loadArr.splice(i,1);
				};
			};
		}
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
	//依赖于jquery mobile
	showLoader : function(text) {
		$.mobile.loading('show', {
			text: text, //加载器中显示的文字
			textVisible: true, //是否显示文字
			theme: 'a',        //加载器主题样式a-e
			textonly: false,   //是否只显示文字
			html: ""           //要显示的html内容，如图片等
		});
	},
	//依赖于jquery mobile
	hideLoader : function (){
		$.mobile.loading('hide');
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

//ajax配置函数
var baseAjax = {
	
	/*
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| ajax config codes
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| Here ajax config codes
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	| 2016年10月20日16:26:56
	| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	|
	 */

	/*
	| ------------------------------------------
	| 获取分类
	| ------------------------------------------
	| 请求类型：get
	| ------------------------------------------
	| 所需参数：
	| ------------------------------------------
	| 必须参数：
	|	callback 回调函数
	| ------------------------------------------
	| 返回参数：
	|	data
	|
	*/
	getCategorys : function(callback){
		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/category/getCategorys",
			data: null,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},
	/*
	 | ------------------------------------------
	 | 根据分类ID获取频道列表
	 | ------------------------------------------
	 | 请求类型：get
	 | ------------------------------------------
	 | 所需参数：
	 | 	categoryID int 分类编号
	 | ------------------------------------------
	 | 必须参数：
	 | 	categoryID int 分类编号
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	getCategoryById : function(id, callback){
		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/channel/getAudioChannelsByCategoryID",
			data: {categoryID : id},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},
	/*
	 | ------------------------------------------
	 | 获取最近更新频道
	 | ------------------------------------------
	 | 请求类型：get
	 | ------------------------------------------
	 | 所需参数：
	 | 	pageSize int 每页条数
	 |	pageIndex int 页码
	 | ------------------------------------------
	 | 必须参数：
	 | 	pageSize int 每页条数
	 |	pageIndex int 页码
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	getLatestChannel : function(pageSize, pageIndex, callback){
		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/hot/getLatestChannel",
			data: {pageSize:pageSize, pageIndex:pageIndex},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			},
			error : function(data){
				callback(data);
			}
		});
	},
	/*
	 | ------------------------------------------
	 | 根据日期获取之前若干条
	 | ------------------------------------------
	 | 请求类型：get
	 | ------------------------------------------
	 | 所需参数：
	 | 	date XX-XX-XX string 日期
	 | ------------------------------------------
	 | 必须参数：
	 | 	date XX-XX-XX string 日期
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	getEveryDayEnglishByDate : function(date, callback){
		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/hot/getEveryDayEnglishByDate",
			data: {date:date},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},
	/*
	 | ------------------------------------------
	 | 获取热门音频列表
	 | ------------------------------------------
	 | 请求类型：get
	 | ------------------------------------------
	 | 所需参数：
	 | 	pageSize int 每页条数
	 |	pageIndex int 页码
	 | ------------------------------------------
	 | 必须参数：
	 | 	pageSize int 每页条数
	 |	pageIndex int 页码
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	getHotAudioChannel : function(pageSize, pageIndex, callback){
		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/hot/getHotAudioChannel",
			data: {pageSize:pageSize, pageIndex:pageIndex},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},
	/*
	 | ------------------------------------------
	 | 获取热门视频列表
	 | ------------------------------------------
	 | 请求类型：get
	 | ------------------------------------------
	 | 所需参数：
	 | 	pageSize int 每页条数
	 |	pageIndex int 页码
	 | ------------------------------------------
	 | 必须参数：
	 | 	pageSize int 每页条数
	 |	pageIndex int 页码
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	getHotVideoChannel : function(pageSize, pageIndex, callback){
		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/hot/getHotVideoChannel",
			data: {pageSize:pageSize, pageIndex:pageIndex},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},
	/*
	 | ------------------------------------------
	 | 获取首页banner图
	 | ------------------------------------------
	 | 请求类型：get
	 | ------------------------------------------
	 | 所需参数：
	 | ------------------------------------------
	 | 必须参数：
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	getFocusConfig : function(callback){
		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/focus/getFocusConfig",
			data: null,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},
	/*
	 | ------------------------------------------
	 | 根据频道ID获取课文列表
	 | ------------------------------------------
	 | 请求类型：get
	 | ------------------------------------------
	 | 所需参数：
	 | 	channelID int 频道编号
	 | ------------------------------------------
	 | 必须参数：
	 | 	channelID int 频道编号
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	getLessonsByChannelID : function(channelID, callback){
		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/lesson/getLessonsByChannelID",
			data: {channelID:channelID},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},
	/*
	 | ------------------------------------------
	 | 获取课文信息
	 | ------------------------------------------
	 | 请求类型：get
	 | ------------------------------------------
	 | 所需参数：
	 | 	lessonID int 课文编号
	 | ------------------------------------------
	 | 必须参数：
	 | 	lessonID int 频道编号
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	getLessonByID : function(lessonID, callback){
		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/lesson/getLessonByID",
			data: {lessonID:lessonID},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},
	/*
	 | ------------------------------------------
	 | 获取精选（首页）数据
	 | ------------------------------------------
	 | 请求类型：get
	 | ------------------------------------------
	 | 所需参数：
	 | ------------------------------------------
	 | 必须参数：
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	getHotChannel : function(callback){

		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/hot/hotChannel",
			data: null,
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},
	/*
	 | ------------------------------------------
	 | 发送验证码
	 | ------------------------------------------
	 | 请求类型：post
	 | ------------------------------------------
	 | 所需参数：
	 |	mobilePhone int 手机号
	 |	codeType int 类型
	 | ------------------------------------------
	 | 必须参数：
	 |	mobilePhone int 手机号
	 |	codeType int 类型
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	sendCode : function(mobilePhone, codeType, callback){

		$.ajax({
			type: "post",
			url: config.ajaxUrl+"/sms/sendCode",
			data: {mobilePhone:mobilePhone, codeType:codeType},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},

	/*
	 | ------------------------------------------
	 | 验证短信验证码
	 | ------------------------------------------
	 | 请求类型：post
	 | ------------------------------------------
	 | 所需参数：
	 |	mobilePhone int 手机号
	 |	code int 验证码
	 | ------------------------------------------
	 | 必须参数：
	 |	mobilePhone int 手机号
	 |	code int 验证码
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	checkCode : function(mobilePhone, code, callback){

		$.ajax({
			type: "post",
			url: config.ajaxUrl+"/sms/checkCode",
			data: {mobilePhone:mobilePhone, code:code},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},

	/*
	 | ------------------------------------------
	 | 赞美句子
	 | ------------------------------------------
	 | 请求类型：get
	 | ------------------------------------------
	 | 所需参数：
	 |	id int 编号
	 | ------------------------------------------
	 | 必须参数：
	 |	id int 编号
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	praiseSentence : function(id, callback){

		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/hot/praiseSentence",
			data: {id:id},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},

	/*
	 | ------------------------------------------
	 | 取消句子的赞美
	 | ------------------------------------------
	 | 请求类型：get
	 | ------------------------------------------
	 | 所需参数：
	 |	id int 编号
	 | ------------------------------------------
	 | 必须参数：
	 |	id int 编号
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	unPraiseSentence : function(id, callback){

		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/hot/unPraiseSentence",
			data: {id:id},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},

	/*
	 | ------------------------------------------
	 | 频道订阅
	 | ------------------------------------------
	 | 请求类型：post
	 | ------------------------------------------
	 | 所需参数：
	 |	userID int 用户ID
	 |	channelID int 频道ID
	 | ------------------------------------------
	 | 必须参数：
	 |	userID int 用户ID
	 |	channelID int 频道ID
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	subscribe : function(userID, channelID, callback){
		$.ajax({
			type: "post",
			url: config.ajaxUrl+"/user/Subscribe",
			data: {userID:userID, channelID:channelID},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},

	/*
	 | ------------------------------------------
	 | 取消频道订阅
	 | ------------------------------------------
	 | 请求类型：post
	 | ------------------------------------------
	 | 所需参数：
	 |	userID int 用户ID
	 |	channelID int 频道ID
	 | ------------------------------------------
	 | 必须参数：
	 |	userID int 用户ID
	 |	channelID int 频道ID
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	unSsubscribe : function(userID, channelID, callback){
		$.ajax({
			type: "post",
			url: config.ajaxUrl+"/user/UnSsubscribe",
			data: {userID:userID, channelID:channelID},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},

	/*
	 | ------------------------------------------
	 | 匿名注册
	 | ------------------------------------------
	 | 请求类型：post
	 | ------------------------------------------
	 | 所需参数：
	 |	deviceID int 设备ID
	 | ------------------------------------------
	 | 必须参数：
	 |	deviceID int 设备ID
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	anonymousRegistered : function(deviceID, callback){
		$.ajax({
			type: "post",
			url: config.ajaxUrl+"/user/anonymousRegistered",
			data: {deviceID:deviceID},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},

	/*
	 | ------------------------------------------
	 | 手机注册
	 | ------------------------------------------
	 | 请求类型：post
	 | ------------------------------------------
	 | 所需参数：
	 |	deviceID int 设备ID
	 |	phone int 手机号
	 |	checkCode int 短信验证码
	 | ------------------------------------------
	 | 必须参数：
	 |	deviceID int 设备ID
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	phoneRegistered : function(deviceID, phone, checkCode, callback){
		$.ajax({
			type: "post",
			url: config.ajaxUrl+"/user/phoneRegistered",
			data: {deviceID:deviceID, phone:phone, checkCode:checkCode},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},

	/*
	 | ------------------------------------------
	 | 获取用户订阅频道列表
	 | ------------------------------------------
	 | 请求类型：get
	 | ------------------------------------------
	 | 所需参数：
	 |	userID int 用户ID
	 | ------------------------------------------
	 | 必须参数：
	 |	userID int 用户ID
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */
	getSubscribeListByUserID : function(userID, callback){
		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/user/getSubscribeListByUserID",
			data: {userID:userID},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},

	/*
	 | ------------------------------------------
	 | 根据用户ID获取用户信息
	 | ------------------------------------------
	 | 请求类型：get
	 | ------------------------------------------
	 | 所需参数：
	 |	userID int 用户ID
	 | ------------------------------------------
	 | 必须参数：
	 |	userID int 用户ID
	 |	callback 回调函数
	 | ------------------------------------------
	 | 返回参数：
	 |	data
	 |
	 */

	getUserInfoByID : function(userID, callback){
		$.ajax({
			type: "get",
			url: config.ajaxUrl+"/user/getUserInfoByID",
			data: {userID:userID},
			dataType: "json",
			success: function(data){
				if(data.status == 1){
					callback(data);
				}else{
					callback(false,data.message);
				}
			}
		});
	},

}
