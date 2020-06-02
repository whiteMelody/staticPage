
$(function(){
	var goods_id = cache.param.goods_id;												
	baseAjax.goodsDetail(goods_id,cache._longitude,cache._latitude,cache._user_id,callBackForGoodsDetail);
})

function callBackForGoodsDetail(data){

	var myData = data.info;
	if(base.isNull(myData))
		return false;
		
	var banner = myData.goods_indeximg;
	$(".goods-name").eq(0).text(base.cutStrForNum(myData.goods_name,10));
	$(".goods-name").eq(1).text(myData.goods_name);
	
	if(!base.isNull(banner))
		$(".goods-banner").attr("src","/Uploads/"+banner);
	
	$(".goods-sales-count").text(myData.goods_sales);
	$(".goods-comm-count").text(myData.comment_num);
	$(".goods-price").text("￥"+myData.goods_price);
	
	var colors = myData.goods_color.split(",");
	
	var temp = "";
	if(colors.length == 1 && colors[0] == ""){
		temp = "";		
		$(".goods-color-area").addClass("hidden");
	}else{
		for(var i=0; i<colors.length; i++){
			
			if(colors.length == 1)
				temp +='<p class="my-tip my-tip-hover">'+ colors[i] +'</p>';
			else
				temp +='<p class="my-tip">'+ colors[i] +'</p>';
		}	 
		
		$(".goods-color-area").removeClass("hidden");
		$(".goods-color-area").prepend('<p class="F125em">颜色</p>');
		$(".goods-color-area").append(temp);
	}
	
	var sizes = myData.goods_size.split(",");
	
	temp = "";
	if(sizes.length == 1 && sizes[0] == ""){
		temp = "";		
		$(".goods-size-area").addClass("hidden");
	}else{
		for(var i=0; i<sizes.length; i++){
			
			if(sizes.length == 1)
				temp +='<p class="my-tip my-tip-hover">'+ sizes[i] +'</p>';
			else
				temp +='<p class="my-tip">'+ sizes[i] +'</p>';
		}	 
		
		$(".goods-size-area").removeClass("hidden");
		$(".goods-size-area").prepend('<p class="F125em">尺码</p>');
		$(".goods-size-area").append(temp);
	}
	
	var commList = myData.comlist; 
	
	if(!base.isNull(myData)){
		
		var _target = $(".goods-comm-list");
		var tempComm = "";
		
		for(i=0; i<commList.length; i++){
			var _comm = commList[i];
			var commCount = _comm.com_star;
			
			tempComm += '<div class="wb100 bor-gray bor-solid-1t F90em"><div class="wb90 center"><p class="wb70 fl h50px lh50px text-left Fgray-2"><span class="fl">'+_comm.user_name+'</span> <img src="/html/images/star-'+ commCount +'.png" class="fl mal10 mat20"></p><span class="fr Fgray-2 h50px lh50px">'+_comm.time+'</span><div class="clear"></div><p class=" lh25px Fgray-3">'+_comm.com_contents+'</p><div class="clear1"></div></div></div>';
				
		}
		_target.html("");
		_target.append(tempComm);	
		
		$(".goods-comm-count").eq(0).text("("+myData.comment_num+"人评论)");
		
		$(".goods-comm-count").eq(1).text("查看全部"+myData.comment_num+"条评价");
		
		if(myData.comment_sum_score == 0 || myData.comment_sum_score == "0")
			$(".goods-comm-img").addClass("hidden");
		else{
			$(".goods-comm-img").attr("src","images/star-"+myData.comment_sum_score+"-big.png)");
			$(".goods-comm-img").removeClass("hidden");
		}
	}
	
	$(".shop-name").text(myData.shop.shop_name);
	$(".shop-logo").attr("src","/Uploads/"+myData.shop.shop_logo);
	
	bindEvent();
}

function bindEvent(){
	$(".to-goods-detail").unbind("click").click(function(){
		$.mobile.changePage("/html/detail-store.html", {
			transition: "slide",
			reverse: false,
			changeHash: true
		});
		cache.param.type_id = $(this).attr("data-value");
	})	
	
	$(".select-type").unbind("click").click(function(){
		$(".select-type-area").slideToggle();
		
		if($(this).css("transform")!="none"){
			$(this).removeAttr("style");	
		}else{
			$(this).css({
				transform : "rotate(180deg)" 	
			})	
		}
	})
	
	$(".product-info").unbind("click").click(function(){
		$(".product-info-area").slideToggle();
		
		if($(this).css("transform")!="none"){
			$(this).removeAttr("style");	
		}else{
			$(this).css({
				transform : "rotate(180deg)" 	
			})	
		}
	})
	
	$(".tip-area").each(function(i, e) {
		var _thisTip = $(this).find(".my-tip");
		
		_thisTip.unbind("click").click(function(){
			_thisTip.removeClass("my-tip-hover");
			$(this).addClass("my-tip-hover");
		})
	});
	
	$(".msg-btn").unbind("click").click(function(){
		
		if($(".msg-area").css("right")!="0px"){				
			$(".msg-area").animate({
				right:"0"	
			})
		}else{
			$(".msg-area").animate({
				right:"-50%"	
			})	
		}
	});	
}

