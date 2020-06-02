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


var baseAjax = {
//	$.ajax({
//		 type: "GET",
//		 url: "/Sign",
//		 data: {ac:"sings",day:day,option:option},
//		 dataType: "json",
//		 success: function(data){
//			 update(data);
//		 }
//	});	
	queryHomeData : function(){
		
	},	
}


var baseMobile = {
	getLocation : function(){
		return location.GetLocation();	
	},
	invokeAlbum : function(){
		return true;
	},
	invokeCamera : function(){
		
	},
	share : function(){
		
	},
	toHome : function(){
		
	},
	toPrev : function(){
		
	}
}