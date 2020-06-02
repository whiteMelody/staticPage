

$(function(){
	baseAjax.getTrade(callBackForGetTrade);
})

function callBackForGetTrade(data){

	var nav = $(".issue-list");
	var myData = data;
	if(base.isNull(myData)){
		_target.append('<div class="text-center mat50 wb100"><img src="/html/images/undefined.jpg"></div>');
		return false;
	}
	var temp = "";
	for(var i=0; i<myData.length; i++){
		var _this = myData[i];
		
		temp += '<div class="ma2per wb29 relative text-center fl"><div class="wb60 center img-Warea"><img class="to-issue-list" src="/Uploads/'+ _this.trade_img +'" data-value="'+ _this.type_id +'"></div><p>'+ _this.trade_name +'</p></div>';
	}
	
	nav.html("");
	nav.append(temp);
	bindEvent();
}

function bindEvent(){
	$(".to-issue-list").click(function(){
		$.mobile.changePage("/html/issue-list.html", {
			transition: "slide",
			reverse: false,
			changeHash: true
		});
		cache.param.type_id = $(this).attr("data-value");
	})	
}


   
