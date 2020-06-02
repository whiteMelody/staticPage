

$(function(){
	
	$(".btn-login").unbind("click").click(function(){
		baseAjax.userLogin($("input[name=userName]").val(),$("input[name=userPwd]").val(),"wap",callBackForUserLogin);
	})
})

function callBackForUserLogin(data){
	if(data.code == 200 || data.code == "200"){
		baseAjax.getUserDetail(data.user_id,callBackForGetUser);
	}else{
		$(".reg-msg").text(data.msg);
		$("#loginMsg").popup('open');
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
	
				