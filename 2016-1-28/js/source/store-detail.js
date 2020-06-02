
$(function(){
	var shop_id = cache.param.shop_id;
	var bg_id = "",sales_type = "";
	if(base.isNull(cache.param.bg_id))
		bg_id = "";
	else
		bg_id = cache.param.bg_id;
	
	if(base.isNull(cache.param.sales_type))
		sales_type = "";
	else
		sales_type = cache.param.sales_type;
		
	baseAjax.shopDetail(shop_id,cache._longitude,cache._latitude,callBackForShopDetail);
	 
})

function callBackForShopDetail(data){

	var myData = data;
	if(base.isNull(myData))
		return false;
	var banner = myData.shop_indeximg;
	
	$(".shop-name").text(myData.shop_name);
	if(!base.isNull(banner))
		$(".shop-banner").attr("src",banner);
	
	var star = myData.star;
	
	if(star == 0 || star == "0"){
		$(".shop-star-img").addClass("hidden");	
		$(".shop-star-count").text("未评分");	
	}else{
		$(".shop-star-img").attr("src","/html/images/star-"+ star +"-big.png");
		$(".shop-star-count").text(star+"分");	
	}
	$(".shop-address").text(myData.shop_address);
	$(".shop-distance").text(base.twoDecimal(myData.distance) + "km");
	
	var goods = myData.wlist;
	
	if(base.isNull(goods))
		return false;
	
	var _target = $(".shop-goods-list");
	var temp = "";
	_target.html("");
	for(var i=0; i<goods.length; i++){
		
		var _current = goods[i];
		
		temp+= '<div class="wb50 fl mab10"><div class="wb90 center lh30px"><div class="wb100 h250px img-area to-goods-detail" data-value="'+ _current.goods_id +'"><img src="/Uploads/'+ _current.goods_img +'"></div><p class="Fgray-3">'+ base.cutStrForNum(_current.goods_name,14) +'</p><p><span class="fl Forange">￥'+ _current.goods_price +'</span></p></div></div>';
		
	}
	_target.append(temp);
	
	bindEvent();
}

function bindEvent(){
	$(".to-goods-detail").unbind("click").click(function(){
		$.mobile.changePage("/html/detail-store.html", {
			transition: "slide",
			reverse: false,
			changeHash: true
		});
		cache.param.goods_id = $(this).attr("data-value");
	})		
}

