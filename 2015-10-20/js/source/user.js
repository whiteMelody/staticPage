

$(function(){
	
		baseAjax.getUserId(callBackGetUserId);
		bindEvent();
	
})

function callBackGetUserId(data){
	
	if(data == null || data == undefined){
		$.mobile.changePage("/html/login.html", {
			transition: "slide",
			reverse: false,
			changeHash: true
		});	
		return false;	
	}else{
		baseAjax.getUserDetail(data,callBackForGetUser);
	}
		
}

function callBackForGetUser(data){
	var userType = data.is_shop;
	if(userType == 0 || userType == "0"){
		if(data.user_name == null || data.user_name == ""){
			$(".user-name").html("暂未设置昵称");
		}else{
			$(".user-name").html(data.user_name);	
		}
	}
}

function bindEvent(){
	$(".to-order-list").unbind("click").click(function(){
		$.mobile.changePage("/html/user-order-list.html", {
			transition: "slide",
			reverse: false,
			changeHash: true
		});
		cache.param.orderType = $(this).attr("data-value");
	});	
}