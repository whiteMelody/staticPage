

$(function(){
	
	$("input[name=userName]").unbind("blur").blur(function(){
		var val = $(this).val();
		if(!isNaN(val) && val.length==11){
			$(".btn-send-code").removeAttr("disabled");
		}else{
			$(".btn-send-code").attr("disabled","disabled");	
		}
	})
	
	$(".btn-send-code").unbind("click").click(function(){
		baseAjax.getCode($("input[name=userName]").val(),openTimer);
	})
	
	$(".btn-register").unbind("click").click(function(){
		baseAjax.userReg($("input[name=userName]").val(),$("input[name=userCode]").val(),$("input[name=userPwd]").val(),"wap",callBackForUserReg);
	})

})

function callBackForUserReg(data){
	
	if(data.code == 200 || data.code == "200"){
		baseAjax.userLogin($("input[name=userName]").val(),$("input[name=userPwd]").val(),"wap",callBackForUserLogin);	
	}else{
		$(".reg-msg").text(data.msg);
		$("#regMsg").popup('open');
	}
	
}

function callBackForUserLogin(data){
	if(data.code == 200 || data.code == "200"){
		baseAjax.getUserDetail(data.user_id,callBackForGetUser);
	}else{
		$(".reg-msg").text(data.msg);
		$("#regMsg").popup('open');
	}
}

function callBackForGetUser(data){
	if(data.is_shop == 0 || data.is_shop == "0"){
		$.mobile.changePage("user.html", {
			transition: "slide",
			reverse: false,
			changeHash: true
		});
	}else if(data.is_shop == 1 || data.is_shop == "1"){
		$.mobile.changePage("business.html", {
			transition: "slide",
			reverse: false,
			changeHash: true
		});
	}else if(data.is_shop == 2 || data.is_shop == "2"){
		$.mobile.changePage("logistics.html", {
			transition: "slide",
			reverse: false,
			changeHash: true
		});
	}	
}


var time = 60,timerId = 0;

function openTimer(data){
	
	timerId = window.setInterval(timer,1000);	
	
	//-- 这里是测试短信接口
	$("input[name=userCode]").val(data);
	
}

function timer(){
	time--;
	$(".btn-send-code").attr("disabled","disabled").val(time+"秒后可重发");
	if(time<=0){
		time = 60;
		window.clearInterval(timerId);
		$(".btn-send-code").removeAttr("disabled").val("重新发送");
	}
}

