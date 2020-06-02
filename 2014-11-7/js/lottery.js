const API_URL_PREFIX = "http://apptest.game.zhaopian.com/";	

var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var halfamonth = day * 15;
var month = day * 30;
function getDateDiff(dateTimeStamp){
var now = new Date().getTime();
var diffValue = now - dateTimeStamp;
if(diffValue < 0){
 //若日期不符则弹出窗口告之
 //alert("结束日期不能小于开始日期！");
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
}
function toLocalTime (nS) {     
	var date = new Date(parseInt(nS) * 1000);
	var str =  date.getFullYear().toString().substring(2,4) ;
	var myDate = str + "-" + addZero(date.getMonth()+1) + "-" + addZero(date.getDate()) + " " + addZero(date.getHours()) + ":" + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds());
	return myDate; 
};

function addZero (num){
	var str = num.toString();
	if(str.length == 1) return "0" + num;
	else return num;
}

function userAuth(url) {
  var success = function (callbackId, params) { 
	Lottery_param.token = params.token;
	login_callback(params.token);
  }
  var fail = function (callbackId, params) {}
  window.ov_gap.invoke("userAuth", {url : url} , success, fail);
}

function login_andorid_callback(token){
	Lottery_param.token = token;
	login_callback(token);
}

function login_callback(token){

	showLoading(true);
	$.ajax({
		type: "post",
		url: API_URL_PREFIX + "wydlz/user/dologin",
		dataType: "json",
		data: {token : token},
		success: function(data) {
			showLoading(false);
			Lottery.getUserinfo();
		},error: function(){
			
		}
	});
	
}

function checkMobile(str) {
    var re = /^1\d{10}$/;
    if (re.test(str)) return true;
    else return false;
}

function scrollleft(){
	var id=$('.lottery_btn_div >div:last-child');
	if(scrollwidth-id.scrollLeft()<=0){
		id.scrollLeft(0);
		scrollIndex=0;
	}else{
	  scrollIndex++;
	  id.scrollLeft(scrollIndex);
	}
}

function toGet(a, b, c){
	Lottery_param.draw_no = b;
	Lottery_param.reward = c;
	if(a==0){
		
		$("#my_mobile").text(Lottery_param.mobile);
		$("#get_desc").html("获得<span>"+ Lottery_param.reward +"元</span>话费");
		$("#get_img").attr("src","images/"+Lottery_param.reward +".png");
		$("#get_mobile").html("手机号：<span>"+ Lottery_param.mobile +"</span>");
		$.mobile.changePage( "#lingqu_hf_page", {transition:"slide", changeHash:true});	
	}else{
		
		$("#my_name").text(Lottery_param.user_name);
		$("#my_get_ld").text(c + "擂豆");
		$("#get_desc").html("获得<span>"+ Lottery_param.reward +"</span>擂豆");
		$("#get_img").attr("src","images/doudou.png");
		$("#get_mobile").html("获奖人：<span>"+ Lottery_param.user_name +"</span>");
		$.mobile.changePage( "#lingqu_page", {transition:"slide", changeHash:true});	
	}
}

function showLoading(flag){

	if(flag){
		 $.mobile.loading('show', {  
			text: '加载中...', //加载器中显示的文字  
			textVisible: true, //是否显示文字  
			theme: 'a',        //加载器主题样式a-e  
			textonly: false,   //是否只显示文字  
			html: ""           //要显示的html内容，如图片等  
		});  	
	}else
		 $.mobile.loading('hide');  
}

// 获取2个值之间的随机数
function random_num(smin, smax) {
	var Range = smax - smin;
	var Rand = Math.random();
	return (smin + Math.round(Rand * Range));
}
// angle:奖项对应的角度，text:提示文字
function rotate(angle, text){  
	$('#imgs').stopRotate();
	$("#imgs").rotate({
		angle: 0, 
		duration: 5000, 
		animateTo: angle + 360 * 5, // angle是图片上各奖项对应的角度，7是我要让指针旋转6圈。所以最后的结束的角度就是 angle + 360 * 圈数
		callback:function(){
			if(Lottery_param.txt == null)
				Lottery_param.txt = "您还未登录";

			$("#msg_dialog .msg").text(Lottery_param.txt);
//			$("#msg_dialog").popup("open");
			if(Lottery_param.type == "擂豆"){
				setTimeout(toGet(1,Lottery_param.draw_no,Lottery_param.reward ),500);
			}else{
				setTimeout(toGet(0,Lottery_param.draw_no,Lottery_param.reward ),500);
			}
			
			$('.zp_bg_img').attr('src','images/quan_1.png');
			$(".lot-btn button").removeAttr("disabled");
			Lottery_param.page = 1;
			Lottery_param.page2 = 1;
		}
	}); 
}

var browser={
	versions:function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {         //移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: (u.match(/MicroMessenger/i) == 'MicroMessenger' || u.match(/MicroMessenger/i) == 'micromessenger')	//微信浏览器
		};
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
};

function callbackForToken(token){
	$.post(API_URL_PREFIX + "wydlz/user/dologin",{token : token},function(){
		Lottery.getUserinfo();
	});
}


var Request = {
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
	}
	
};

function myShare(){
	showLoading(true);
	$.ajax({
		type: "post",
		url: API_URL_PREFIX + "wydlz_game/activity/"+ Lottery_param.draw_no +".json",
		dataType: "json",
		data: {draw_no : Lottery_param.draw_no , mobile :Lottery_param.mobile},
		success: function(data) {
			showLoading(false);
			
			var temp1,temp2,temp3;
			if(data.meta.code != 200){
				temp1 = "领取失败";
				temp2 = data.meta.errorDetail;
				temp3 = "images/fail.png";
			}else{
				temp1 = "领取成功";
				temp2 = "恭喜你完成抽奖，可以在【我的中奖纪录】里面查看领奖状态";
				temp3 = "images/success.png";
			}
			$("#lottery_title").text(temp1);
			$("#lottery_desc").text(temp2);
			$("#result_img").attr("src",temp3);
			$.mobile.changePage( "#lq_success_page", {transition:"slide", changeHash:true});	
		}
	});

}

function callbackForShare(){
	setTimeout(myShare,1000);
}

var Lottery = {
	//获取抽奖奖项
    getLottery : function() {
		showLoading(true);
		$.ajax({
			type: "get",
			url: API_URL_PREFIX + "wydlz_game/activity/prize_draw.json",
			dataType: "json",
			success: function(data) {
				showLoading(false);
				if(data.response.prize){
					Lottery_param.draw_no = data.response.prize.draw_no;
					Lottery_param.type = data.response.prize.type;
					Lottery_param.reward = data.response.prize.reward;
					Lottery_param.txt = data.response.prize.txt;
					Lottery_param.ext = data.response.prize.ext;
					$("#msg_dialog .msg_code").text(200);	
					
					switch (data.response.prize.order) {
						case 1: Lottery_param.order = 4;break;
						case 2: Lottery_param.order = 1;break;
						case 3: Lottery_param.order = 2;break;
						case 4: Lottery_param.order = 5;break;
						case 5: Lottery_param.order = 0;break;
						case 6: Lottery_param.order = 3;break;
					} 
			
					var angle = 0;
					switch (Lottery_param.order) {
						case 0: angle = random_num(-15,15); break;
						case 1: angle = random_num(285,315); break;
						case 2: angle = random_num(225,255); break;
						case 3: angle = random_num(165,195); break;
						case 4: angle = random_num(105,135); break;	
						case 5: angle = random_num(45,75); break;
					}
					rotate(angle);
				}
				else{
					Lottery_param.ajax_error = data.meta.errorDetail
					Lottery_param.ajax_code = data.meta.code;
					$(".lot-btn button").removeAttr("disabled");
					$("#msg_dialog .msg").text(Lottery_param.ajax_error);
					$("#msg_dialog").popup("open");	
					$("#msg_dialog .msg_code").text(Lottery_param.ajax_code);	
				}
				
			}
		});

	},
	//获取中奖名单
	getList : function(){
		$.ajax({
			type: "get",
			url: API_URL_PREFIX + "wydlz_game/activity/all/results.json",
			dataType: "json",
			success: function(data) {
				Lottery_param.drawrecords = data.response.drawrecords;
				Lottery.loadLottery();
			}
		});

	},
	getMyList : function(){
		showLoading(true);
		$.ajax({
			type: "get",
			url: API_URL_PREFIX + "wydlz_game/user/mine/activity.json?pagesize="+ Lottery_param.pagesize +"&page=" + Lottery_param.page2,
			dataType: "json",
			success: function(data) {
				showLoading(false);
				Lottery_param.my_pageinfo = data.response.pageinfo;
				Lottery_param.my_drawrecords = data.response.drawrecords;
				Lottery.loadMyLottery();
			}
		});

		
	},
	//加载获奖名单
	loadLottery : function() {
		var $item,head,name,desc,time;
		
		if(!Lottery_param.drawrecords){
			showLoading(false);
			return false;	
		}
		$("#lottery_data").html("");
		window.clearInterval(Lottery_param.timer);
		for(var i = 0 ; i < Lottery_param.drawrecords.length ; i ++){
			if(Lottery_param.drawrecords[i].avatar == "" || Lottery_param.drawrecords[i].avatar == undefined || Lottery_param.drawrecords[i].avatar == null)
				head = "images/default-avatar@2x.png";
			else
				head = Lottery_param.drawrecords[i].avatar;
			name = Lottery_param.drawrecords[i].nick;
			desc = "获得了<span>"+ Lottery_param.drawrecords[i].reward + Lottery_param.drawrecords[i].unit + "</span>" + Lottery_param.drawrecords[i].type;
			time = getDateDiff(Lottery_param.drawrecords[i].create_time * 1000);
			$item = '&nbsp;&nbsp;&nbsp;&nbsp;'+ name + desc +'&nbsp;&nbsp;&nbsp;&nbsp;';
			$("#lottery_data").append($item);
		}
		
		$('.lottery_btn_div >div:last-child').width(window.innerWidth-86);
		scrollwidth=$('.lottery_btn_div >div:last-child div').width()-(windowWdith-86);
		Lottery_param.timer = setInterval(scrollleft,40);
		
	},
	//加载自己名单
	loadMyLottery : function() {
		showLoading(true);
		if(Lottery_param.my_drawrecords == null || Lottery_param.my_drawrecords == "" || Lottery_param.my_drawrecords == undefined ){
			$(".nomessage").show();	
			$(".record_table tbody").hide();
			$("#load_btn2").find("img").hide();
			$("#load_btn2").text("已经到底啦");
			$("#load_btn2").attr("disabled","disabled");
			showLoading(false);
			return false;
		}else{
			$(".nomessage").hide();	
			$(".record_table tbody").show();	
		}
		
		var $item,draw_no,type,reward,create_time,status,send_status,temp,temp2,temp3;
		
		for(var i = 0 ; i < Lottery_param.my_drawrecords.length ; i ++){
			
			draw_no = Lottery_param.my_drawrecords[i].draw_no;
			type = Lottery_param.my_drawrecords[i].type;
			reward = Lottery_param.my_drawrecords[i].reward;
			create_time = toLocalTime(Lottery_param.my_drawrecords[i].create_time);
			status = Lottery_param.my_drawrecords[i].status;
			send_status = Lottery_param.my_drawrecords[i].send_status;
			
			if(status == 0){

				if(type == "擂豆"){
					temp = "<button  onClick='toGet(1,"+ draw_no +","+ reward +")'>领取</button>";
				}else{
					temp = "<button  onClick='toGet(0,"+ draw_no +","+ reward +")'>领取</button>";
				}
					
			}
			else{
				if(send_status == 0) temp = "处理中";
				else temp = "已领奖";
			}
			
			if(type == "擂豆"){
				temp2 = "擂豆";
				temp3 = "images/jl_d.png"
			}else{
				temp2 = "元话费";
				temp3 = "images/jl_m.png"
			}
			$item = '<tr><td><img src="'+ temp3 +'" align="absmiddle">'+ reward + temp2 +'</td><td>'+ create_time +'</td><td>'+ temp +'</td></tr>';
			$(".record_table tbody").append($item);
		}
		
		if(Lottery_param.page2 >= Lottery_param.my_pageinfo.totalpage ){
			$("#load_btn2").find("img").hide();
			$("#load_btn2").text("已经到底啦");
			$("#load_btn2").attr("disabled","disabled");
		}else{
			$("#load_btn2").text("点击加载");
			$("#load_btn2").removeAttr("disabled");
			$("#load_btn2").find("img").hide();	
		}
		showLoading(false);
	},
	//获取用户信息
	getUserinfo : function(){
		showLoading(true);

		$.ajax({
			type: "get",
			url: API_URL_PREFIX + "wydlz/user/getinfo.json",
			dataType: "json",
			success: function(data) {

				showLoading(false);
				if( data.response.user == undefined || data.response.user == "" || data.response.user == null  ){
					
					if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios ){
						userAuth("url");		
					}else if (browser.versions.android){

						window.kuping_android.userLogin();
					}
				}
				else{
					
					Lottery_param.user_name = data.response.user.nick;
					Lottery_param.user_integral = data.response.user.integral;
					
					if(data.response.user.avatar == null || data.response.user.avatar == "" || data.response.user.avatar == undefined)
						Lottery_param.user_head = API_URL_PREFIX + "mobile/images/default-avatar@2x.png";
					else	
						Lottery_param.user_head = data.response.user.avatar;
						
					if(Lottery_param.user_head !=null && Lottery_param.user_head !="" && Lottery_param.user_head !=undefined)
						$("#my_head").attr("src",Lottery_param.user_head);	
					if(Lottery_param.user_integral !=null && Lottery_param.user_integral !="" && Lottery_param.user_integral !=undefined)
						$("#my_ld").text(Lottery_param.user_integral);	
					

					$.mobile.changePage( "#lottery_page", {transition:"slidefade", changeHash:true});	
				}
			},error: function(){
					
			}
		});

	},
	//加载用户信息
	loadUserInfo : function(){
		
		$.ajax({
			type: "get",
			url: API_URL_PREFIX + "wydlz/user/getinfo.json",
			dataType: "json",
			success: function(data) {

				if( data.response.user == undefined || data.response.user == "" || data.response.user == null  ){
					
					if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios ){
						userAuth("url");		
					}else if (browser.versions.android){

						window.kuping_android.userLogin();
					}
				}
				else{
					
					Lottery_param.user_name = data.response.user.nick;
					Lottery_param.user_integral = data.response.user.integral;
					
					if(data.response.user.avatar == null || data.response.user.avatar == "" || data.response.user.avatar == undefined)
						Lottery_param.user_head = API_URL_PREFIX + "mobile/images/default-avatar@2x.png";
					else	
						Lottery_param.user_head = data.response.user.avatar;
						
					if(Lottery_param.user_head !=null && Lottery_param.user_head !="" && Lottery_param.user_head !=undefined)
						$("#my_head").attr("src",Lottery_param.user_head);	
					if(Lottery_param.user_integral !=null && Lottery_param.user_integral !="" && Lottery_param.user_integral !=undefined)
						$("#my_ld").text(Lottery_param.user_integral);	
					

					$.mobile.changePage( "#lottery_page", {transition:"slidefade", changeHash:true});	
				}
			},error: function(){
					
			}
		});
	}
};

var Lottery_param = {
	draw_no : -1,
	order : -1,
	type : -1,
	reward : -1,
	txt : null,
	ext : null,
	pageinfo : null,
	drawrecords : null,
	my_pageinfo : null,
	my_drawrecords : null,
	page : 1,
	page2 : 1,
	pagesize : 10,
	is_login : false,
	ajax_code : 200,
	ajax_error : null,
	token : null,
	mobile : -1,
	user_name : null,
	user_head : null,
	user_integral : null,
	timer : null
}
