

var page = 1;
var distance = 100000;

$(function(){
	
	var type_id = cache.param.type_id;
	
	if(cache._longitude == "" || cache._latitude == ""){
		base.openLoader();
		base.location(callBackGetPoint);	
	}
		
	baseAjax.supplyList(type_id,page,cache._longitude,cache._latitude,distance,callBackForGetTrade);
	
})

function callBackGetPoint(point){
	
	cache._longitude = point.split(",")[0];
	cache._latitude = point.split(",")[1];
	
	base.closeLoader();
	
}

function callBackForGetTrade(data){

	var nav = $(".issue-list-data");
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
				temp += '<div class="wb90 pal5per par5per pat10 pab15 Fgray-3 lh25px bor-gray bor-solid-1t F90em"><p class="F125em">前台/接待/行政</p><p class="Fgray-2">[观音桥] 重庆禾歌商贸有限公司</p><p><span class="Forange fl F125em">2000-3000<span class="Fgray-2 F75em">元/月</span></span><span class="Fgary-2 fr">今天</span></p><div class="clear"></div></div>';
				
			}	
		}
		
	}
	
	nav.html("");
	nav.append(temp);
	
}
