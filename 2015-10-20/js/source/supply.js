
$(function(){
	baseAjax.getUserId(callBackGetUserId);
})

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
		baseAjax.mySupply(data,"","",CallBackForGetSupply);
	}
		
}

function CallBackForGetSupply(data){
	
	var _target = $(".supply-data");
	var myData = data;
	_target.html("");
	if(base.isNull(myData)){
		_target.append('<div class="text-center mat50 wb100"><img src="/html/images/undefined.jpg"></div>');
		return false;
	}
		
	var temp = "";
	
	for(var i=0; i<myData.length; i++){
		var _this = myData[i];
		temp += '<div class="wb95 center"><a href="#detail-page" data-transition="slide" data-role="none"><div class="wb50 fl h110px img-area relative"><img src="/Uploads'+_this.goods_img+'"><div class="my-tip-no-order"></div></div></a><div class="wb43 mal3per fl lh20px"><p class="text-left Fgray-3">'+ _this.goods_name +'</p><div class="clear1"></div><p class="Fgray-2 F80em">'+_this.goods_notice+'</p><div class="clear1"></div><p class="wb45 fl Fgray-2 text-left F90em"><span class="F150em Forange">'+_this.goods_price+'</span> 元</p></div></div><div class="clear1 bor-gray bor-solid-1b"></div><div class="clear1"></div>';
	}
	
	_target.append(temp);
	
	bindEvent();
}

