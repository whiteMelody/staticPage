
$(function(){
	
	baseAjax.getCollect(1,CallBackForGetCollect);	
	
})

function CallBackForGetCollect(data){
	
	var _target = $(".fav-data");
	var myData = data;
	_target.html("");
	if(base.isNull(myData)){
		_target.append('<div class="text-center mat50 wb100"><img src="/html/images/undefined.jpg"></div>');
		return false;
	}
	var temp = "";
	
	for(var i=0; i<myData.length; i++){
		var _this = myData[i];
		temp+='<div class="slide-areas"><div class="wb90 pal5per par5per h60px lh60px pat10 pab10 text-left bor-gray bor-solid-1b Fgray-3 slide-btn pointer"><div class="wb20 fl h60px img-area"><img src="/Uploads"'+_this.shop_logo+'></div><p class="wb40 fl mal5per mar5per">'+_this.shop_name+'</p><p class="wb20 fl Fgray-2 F90em">上新(7)</p><img src="images/arrow-down.png" class="fr mat25 slide-arrow"></div>';
		
		var goods = _this.goods;
		if(base.isNull(myData)){
		}else{
			for(var j=0;j<goods.length;j++){
			
				temp+='<div class="wb100 warpper-gray-1 bor-gray bor-solid-1b silde-area hidden"><a href="detail-store.html" data-transition="slide" data-role="none"><div class="wb29 ma2per fl h90px img-area relative"><img src="images/product-13.jpg"><div class="my-gray-50per Fwhite text-center h30px lh30px">￥111.00</div></div></a><div class="clear"></div></div>';
			}
		}
		temp+='</div>';	
	}
	
	_target.append(temp);
	
	bindEvent();
}

function bindEvent(){
	$(".slide-btn").unbind("click").click(function(){
		$(this).next().slideToggle();
		
		if($(this).find(".slide-arrow").css("transform")!="none"){
			$(this).find(".slide-arrow").removeAttr("style");	
		}else{
			$(this).find(".slide-arrow").css({
				transform : "rotate(180deg)" 	
			})	
		}
	})	

}
			
			
