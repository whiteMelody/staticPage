

$(function(){
	
	base.openLoader();
	$('.banner').slick({ 
		accessibility : false,
		arrows : false,
		dots: false, 
		infinite: true, 
		speed: 100, 
		fade: false, 
		slide: 'div', 
		cssEase: 'linear' 
	}); 
	
	//-- 渲染源代码 2015/7/16
	$('.nav-menu').slick({ 
		accessibility : false,
		arrows : false,
		dots: false, 
		infinite: true, 
		speed: 100, 
		fade: false, 
		slide: 'div', 
		cssEase: 'linear' 
	});
	
	//初始化 pid
	//var pid = baseAjax.indexInit();
	var pid = 20;
	baseAjax.index(pid,callBackForIndex);
	
	//定位通用类
	
	base.location(callBackGetPoint);
	
})

function callBackGetPoint(point){
	
	cache._longitude = point.split(",")[0];
	cache._latitude = point.split(",")[1];
	
	base.closeLoader();
	
}

function callBackForIndex(data){
	initNav(data);
	initLeftNav(data);
	initShopProduct(data);
	initRecommend(data);
	bindEvent();
}

function initShopProduct(data){
	var products = $(".index-shop-product");
	var myData = data.recommend_shop;
	if(base.isNull(myData))
		return false;
	
	products.find(".wb33333").each(function(i, e) {
        var _this = $(this);
		
		if(base.isNull(myData[i]))
			return true;
		
		var name = myData[i].shop_name;
		
		if(name == "" || name == undefined || name == null)
			name = "&nbsp;";
		else
			name = base.cutStrForNum(myData[i].shop_name,12);
			
		_this.find("p").html(name);
		_this.find("img").removeAttr("style");
		_this.find("img").attr("src","/Uploads/"+myData[i].shop_logo);
		_this.find("img").addClass("to-shop-detail");
		_this.find("img").attr("data-shop-id",myData[i].shop_id);
		_this.find("img").attr("data-bg-id",myData[i].bg_id);
		_this.find("img").attr("data-sales-type",myData[i].sales_type);
		_this.find("img").attr("data-is-shop",myData[i].is_shop);
    });
	
}

function initLeftNav(data){
	var nav = $(".index-left-nav");
	var myData = data.trade;
	if(base.isNull(myData))
		return false;
	var temp = "";
	for(var i=0; i<myData.length; i++){
		var _this = myData[i];
		
		temp += '<a href="javascript:void(0)" class="to-classify" data-value="'+_this.type_id+'" data-transition="slide" data-role="none"><p class="h50px lh50px wb90 pal5per par5per Fgray-3"><img src="/Uploads'+ _this.type_img +'" height="30" width="30" class="middle"><span class="wb60 fr">'+ _this.type_title +'</span></p><div class="clear"></div></a>';
		
	}
	nav.html("");
	nav.append(temp);
}

function initNav(data){
	var nav = $(".index-nav");
	var myData = data.trade;
	if(base.isNull(myData))
		return false;
	var temp = "";
	for(var i=0; i<myData.length; i++){
		var _this = myData[i];
		
		temp += '<div class="ma2per wb21 relative text-center fl"><div class="wb60 center img-Warea"><a href="javascript:void(0)" data-value="'+_this.type_id+'" class="to-classify" data-transition="slide" data-role="none"> <img src="/Uploads'+ _this.type_img +'"></a></div><p>'+ _this.type_title +'</p></div>';
	}
	nav.html("");
	nav.append(temp);
}

function initRecommend(data){
	var recommend = $(".index-recommend-product");
	var myData = data.recommend_goods;
	if(base.isNull(myData))
		return false;
	var temp = "";
	for(var i=0; i<myData.length; i++){
		var _this = myData[i];
		var info = _this.info;
		
		if(base.isNull(info))
			info = "";
			
		var sales_type = _this.sales_type;
		var isOrder = "";
		
		if(sales_type == 3 || sales_type == "3")
			isOrder = '';
		else
			isOrder = '<div class="my-tip-no-order"></div>';
		
		temp += '<div class="clear1"></div><div class="wb95 center"><a href="javascript:void(0)"><div class="wb43 fl h130px img-area relative"><img src="/Uploads/'+_this.goods_img+'">'+isOrder+'</div></a><div class="wb55 fr"><p class="wb100 fl text-left lh20px" data-sales-type="'+_this.sales_type+'" data-goods-id='+ _this.goods_id +'" data-transition="slide" data-role="none" class="to-detail">'+ base.cutStrForNum(_this.goods_name,35)+'</p><div class="clear h5px"></div><p class="Fgray-2 F80em lh20px">'+info+'</p><div class="clear1"></div><p class="wb100 Fgray-2 text-left lh25px"><span class="F150em Forange">'+ _this.goods_price +'</span> 元</p><p class="wb100 fl Fgray-2 text-left F80em lh25px">地址：'+_this.shop_address+'</p><div class="clear"></div><p class="wb45 fl Fgray-2 text-left F80em lh25px">'+_this.comment_num+'条评论</p><p class="wb45 fr Fgray-2 text-right F80em lh25px">已售'+_this.goods_sales+'</p></div></div><div class="clear1 bor-gray bor-solid-1b"></div>';
	}
	recommend.html("");
	recommend.append(temp);
}

function bindEvent(){
	$(".to-classify").unbind("click").click(function(){
		$.mobile.changePage("/html/classify.html", {
			transition: "slide",
			reverse: false,
			changeHash: true
		});
		cache.param.type_id = $(this).attr("data-value");
	});	
	
	$(".to-detail").unbind("click").click(function(){
		
		var sales_type = $(this).attr("data-sales-type");
		
		cache.param.sales_type = sales_type;
		cache.param.goods_id = $(this).attr("data-goods-id");;
		
		if(sales_type == 0){
			$.mobile.changePage("/html/detail-store.html", {
				transition: "slide",
				reverse: false,
				changeHash: true
			});	
		}else if(sales_type == 1){
			$.mobile.changePage("/html/detail-food.html", {
				transition: "slide",
				reverse: false,
				changeHash: true
			});	
		}
		
	});	
	
	$(".search-input").unbind("change").change(function(){

		var keyword = $(this).val();
		
		if(keyword!=undefined && keyword!="" && keyword!=null){
			$.mobile.changePage("/html/list.html", {
				transition: "slide",
				reverse: false,
				changeHash: true
			});
			cache.param.keyword = keyword;
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
}