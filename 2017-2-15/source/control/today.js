
var loading = false,
	page = 1,
	pageSize = 20;

$(document.body).pullToRefresh().on("pull-to-refresh", function() {
	clearData();
	getData();
	$(document.body).pullToRefreshDone();

});

$(document).on("scrollstop",function(){
	if($(document).height() > $(window).height()) {
		if($(window).scrollTop() == $(document).height() - $(window).height()){
			if(loading) return;
			loading = true;
			page ++;
			getData();
		}
	}
});

function clearData(){
	$(".weui-infinite-scroll").text("正在加载");
	$(".infinite-preloader").show(0);
	page = 1;
	$(".today-data-area").empty();
}

function getData(){
	baseAjax.getLatestChannel(pageSize,page,function(data){
		var $target = $(".today-data-area");
		var _html = "";
		if(data) {
			var _data = data.returnJSON;

			if(_data.length != pageSize){
				$(".weui-infinite-scroll").text("已经到底了");
				$(".infinite-preloader").hide(0);
			}

			for(var i=0; i<_data.length; i++){
				var _this = _data[i];
				var _url = "";

				if(_this.channelType == 1){
					//音频
					_url = "voice_play.html?channelID=" + _this.channelID;
				}
				if(_this.channelType == 2){
					//视频
					_url = "video_play.html?channelID=" + _this.channelID;
				}

				var _imgUrl = _this.iconURL;
				if(base.isNull(_imgUrl)){
					_imgUrl = "source/images/img-1.png";
				}
				_html += '<a href="'+_url+'" data-ajax="false" data-rel="external" data-role="none"><div class="wb100 h80px pat15 pab15 bor-gray bor-solid-1b"> <div class="fl img-area h80px w80px"> <img src="'+_imgUrl+'"> </div> <div class=" Fgray-3"> <p class="h25px lh25px over-hidden F18 pal15 Fgray-3 Fb mat5">'+_this.channelName+' </p> <p class="h40px lh20px over-hidden F16 pal15 mat5 Fgray-2"> '+_this.subtitle+' </p> </div> </div></a> ';
			}
			$target.append(_html);
			loading = false;
			return true;
		}

	})
}

$(function(){
	getData();
})
