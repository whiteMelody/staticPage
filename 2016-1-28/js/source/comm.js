

$(function(){
	
	//底部个人中心按钮 click
	$(".btn-user-center").unbind("click").click(function(){
		baseAjax.getUserId(callBackGetUserId);
	})
	
})

/*
	| ------------------------------------------
	| 验证用户登录
	| ------------------------------------------
	| 所需参数：data
	| ------------------------------------------
	| 必须参数：
	| ------------------------------------------
	| 返回参数：data
*/

function callBackGetUserId(data){
	//-- 判断用户是否登录
	
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

/*
	| ------------------------------------------
	| 验证用户角色
	| ------------------------------------------
	| 所需参数：data
	| ------------------------------------------
	| 必须参数：
	| ------------------------------------------
	| 返回参数：int/string 角色类型
*/

function callBackForGetUser(data){
	var userType = data.is_shop;
	
	if(userType == 0 || userType == "0"){
		$.mobile.changePage("/html/user.html", {
			transition: "slide",
			reverse: false,
			changeHash: true
		});
	}else if(userType == 1 || userType == "1"){
		$.mobile.changePage("/html/business.html", {
			transition: "slide",
			reverse: false,
			changeHash: true
		});
	}else if(userType == 2 || userType == "2"){
		$.mobile.changePage("/html/logistics.html", {
			transition: "slide",
			reverse: false,
			changeHash: true
		});
	}
}
