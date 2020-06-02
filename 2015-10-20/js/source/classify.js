

var page = 1;
var distance = 100000;

$(function(){
	
	var sales_type = cache.param.sales_type;
	var type_id = cache.param.type_id;
	
	baseAjax.getCategory(sales_type,type_id,callBackForCategory);
	
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
	
})

function callBackForCategory(data){

	var _target = $(".classify-list");
	
	var myData = data;
	if(base.isNull(myData)){
		_target.append('<div class="text-center mat50 wb100"><img src="/html/images/undefined.jpg"></div>');
		return false;
	}
	var temp = "";
	for(var i=0; i<myData.length; i++){
		var _this = myData[i];
		var tId = _this.trade_id;
		
		if(tId == base.getParmar("type_id")){
			
			if(base.isNull(_this.childs))
				continue;
			for(j=0; j<_this.childs.length; j++){
				var _current = _this.childs[j];
				temp += '<a href="javascript:void(0)" data-value="" data-transition="slide" data-role="none" class="display-inline ma10 pal10 par10 pat5 pab5 bor-gray bor-solid-1a F90em fl to-list"><span class="Fgray-3">川菜</span></a>';
				
			}	
		}
		
	}
	
	_target.html("");
	_target.append(temp);
	
}

function callBackForHot(data){

	var _target = $(".hot-list");
	
	var myData = data;
	if(base.isNull(myData))
		return false;
	var temp = "";
	for(var i=0; i<myData.length; i++){
		var _this = myData[i];
		var tId = _this.trade_id;
		
		if(tId == base.getParmar("type_id")){
			
			if(base.isNull(_this.childs))
				continue;
			for(j=0; j<_this.childs.length; j++){
				var _current = _this.childs[j];
				temp += '<a href="javascript:void(0)" data-value="" data-transition="slide" data-role="none" class="display-inline ma10 pal10 par10 pat5 pab5 bor-gray bor-solid-1a F90em fl to-list"><span class="Fgray-3">川菜</span></a>';
				
			}	
		}
		
	}
	
	_target.html("");
	_target.append(temp);
	
}


