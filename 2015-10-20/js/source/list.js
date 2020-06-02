

$(function(){
	
	baseAjax.nearbyShop(cache._longitude,cache._latitude,1000000,0,"","","", callBackNearbyShop);
	

})

function callBackNearbyShop(data){
	var target = $(".list-data-area");
	
	var myData = data;
	if(base.isNull(myData)){
		_target.append('<div class="text-center mat50 wb100"><img src="/html/images/undefined.jpg"></div>');
		return false;
	}
	var temp = "";
	for(var i=0; i<myData.length; i++){
		var _this = myData[i];
		
		temp += '<div class="wb95 center"><a href="javascript:void(0)" class="to-shop-detail" data-shop-id="'+_this.shop_id+'" data-bg-id="'+_this.bg_id+'" data-sales-type="'+_this.sales_type+'" data-is-shop="'+_this.is_shop+'" data-transition="slide" data-role="none"><div class="wb50 fl h130px img-area relative"><img src="/Uploads/"'+_this.shop_logo+'><div class="my-tip-no-order"></div></div></a><div class="wb43 mal3per fl"><p class="wb80 fl text-left lh40px">'+base.cutStrForNum(_this.shop_name,8)+'</p><p class="wb15 fr Fgray-2 text-right lh40px">'+_this.distance+'1km</p><div class="cle ar"></div><p class="Fgray-2 F80em lh20px">地址：'+_this.shop_address+'</p><div class="clear1"></div><p class="wb45 fl Fgray-2 text-left lh25px"><span class="F150em Forange">'+_this.fc_money+'</span> 元</p><p class="wb50 fr Fgray-2 text-right F80em lh25px">已售'+_this.goods_sales+'</p></div></div><div class="clear1 bor-gray bor-solid-1b"></div><div class="clear1"></div>';
	}
	

	target.html("");
	target.append(temp);
	bindEvent();
	
}

function bindEvent(){
	$(".ul-nav-second li").unbind("hover").hover(function(){
		var _this = $(this);
		$(".ul-nav-second li").removeClass("li-hover");
		_this.addClass("li-hover");
		var temp = _this.find("img").attr("src");
		_this.find("img").attr("src",_this.find("img").attr("data-value")).attr("data-value",temp);
	},function(){
		var _this = $(this);
		$(".ul-nav-second li").removeClass("li-hover");
		var temp = _this.find("img").attr("src");
		_this.find("img").attr("src",_this.find("img").attr("data-value")).attr("data-value",temp);	
	});
	
	$(".li-ext").each(function(i, e) {
		if(i>=0){
			$(this).css({
				top : -( i * 51) + "px"
			})	
		}
	});
	
	$(".my-warpper-dialog").unbind("click").click(function(){
		$(".my-warpper-dialog").fadeOut();
		$(".my-nav-area").fadeOut();
	})
	
	$(".my-nav-btn").each(function(i, e) {
		$(this).unbind("click").click(function(){
			$(".my-warpper-dialog").fadeIn();
			$(".my-nav-area").fadeOut(0);
			$(".my-nav-area").eq(i).fadeIn();
		})
	});
	
	$(".otherProduct").unbind("click").click(function(){
		
		var data = {
			url : $(this).attr("data-url"),
			title : $(this).attr("data-title")	
		}
		
		outerUrl = $(this).attr("data-url");
		outerTitle = $(this).attr("data-title");
		
		
		$.mobile.changePage("iframe.html","slide",data);
	})
	
	$(".search-btn").unbind("click").click(function(){
		if($(".search-area").hasClass("hidden")){
			$(".search-area").removeClass("hidden");
			$(".search-text").addClass("hidden");
		}else{
			$(".search-area").addClass("hidden");
			$(".search-text").removeClass("hidden");	
		}
	})
	
	$(".to-shop-detail").unbind("click").click(function(){
		
		var isShop = $(this).attr("data-is-shop");
		
		cache.param.shop_id = $(this).attr("data-shop-id");
		cache.param.bg_id = $(this).attr("data-bg-id");
		cache.param.sales_type = $(this).attr("data-sales-type");
		
		if(isShop == 1){			
			$.mobile.changePage("/html/store-detail.html", {
				transition: "slide",
				reverse: false,
				changeHash: true
			});
		}else{
			$.mobile.changePage("/html/food-store-detail.html", {
				transition: "slide",
				reverse: false,
				changeHash: true
			});	
		}
		
	});	
	
	$(".list-more-btn").unbind("click").click(function(){
		
		$.ajax({
			type: "GET",
			url: "/Sign",
			data: param,
			dataType: "json",
			success: function(data){
				callBackNearbyShop(data);
			}
		});
		
	})
	
}

				
				