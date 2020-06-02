let userInfo = window.sessionStorage.getItem("userInfo");
if(base.isNull(userInfo)){
	let _call = window.location.href;
	window.location.href = 'login.html?call='+_call;
}else{
	console.log('login ed');
}

