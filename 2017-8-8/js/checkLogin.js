let userInfo = window.sessionStorage.getItem("userInfo");
//微信自动登录
if(base.versions.isWeiXin){
	if(base.isNull(userInfo)){
		let call = window.location.href;
		window.location.href = 'wx_login.html?call='+call;
	}else{
		console.log('login ed');
	}
}
