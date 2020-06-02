
$(function(){
	
	baseAjax.getUserId(callBackGetUserId);
	
})

function callBackGetUserId(data){
	baseAjax.shopIncome(data,callBackGetComment);	
	baseAjax.bankList(data,callBackGetComment);	
}

function callBackGetComment(data){	

	var _target = $(".review-data");
	var myData = data;
	_target.html("");
	if(base.isNull(myData)){
		_target.append('<div class="text-center mat50 wb100"><img src="/html/images/undefined.jpg"></div>');
		return false;
	}
		
	var temp = "";
	
	for(var i=0; i<myData.length; i++){
		var _this = myData[i];
		temp+='<div class="wb90 center"><a href="detail-store.html" data-transition="slide" data-role="none"><div class="wb30 fl h90px img-area relative"><img src="/Uploads'+_this.goods_indeximg+'"><div class="my-gray-50per Fwhite text-center h30px lh30px">￥'+_this.goods_price+'</div></div></a><div class="wb65 mar1per fr lh30px"><p class="lh20px Fgray-3">'+_this.goods_name+'</p><div class="clear1"></div><p class="Fgray-2 wb65 F90em">'+_this.time+'</p></div></div><div class="clear1"></div><div class="clear1 warpper-gray-1"></div><div class="clear1"></div>';	
	}
	
	_target.append(temp);
	
	bindEvent();
}

function bindEvent(){
	
}

