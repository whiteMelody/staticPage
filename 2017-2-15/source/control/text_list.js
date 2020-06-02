//
// var loading = false,
// 	page = 1,
// 	pageSize = 20;
//
// $(document.body).pullToRefresh().on("pull-to-refresh", function() {
// 	clearData();
// 	getData();
// 	$(document.body).pullToRefreshDone();
//
// });
//
// $(document).on("scrollstop",function(){
// 	if($(document).height() > $(window).height()) {
// 		if($(window).scrollTop() == $(document).height() - $(window).height()){
// 			if(loading) return;
// 			loading = true;
// 			page ++;
// 			getData();
// 		}
// 	}
// });
//
// function clearData(){
// 	$(".weui-infinite-scroll").text("正在加载");
// 	$(".infinite-preloader").show(0);
// 	page = 1;
// 	$(".channel-list-data-area").empty();
// }

function getData(){

	var _channelID = base.getParmar("channelID");
	var _channelType = base.getParmar("channelType");
	var _channelName = base.getParmar("channelName");

	$(".text_name").text(decodeURI(_channelName));

	baseAjax.getLessonsByChannelID(_channelID,function(data){
		var $target = $(".text-list-data-area");
		var _html = "";
		if(data) {
			var _data = data.returnJSON;

			if(base.isNull(_data))
				return false;
            //
			// if(_data.length != pageSize){
			// 	$(".weui-infinite-scroll").text("已经到底了");
			// 	$(".infinite-preloader").hide(0);
			// }

			if(_data.length == 1){

				if(_channelType == 1 || _channelType == "1")
					$.mobile.changePage("voice_play.html?lessonID=" + _data[0].lessonID, "pop", false, false);
				if(_channelType == 2 || _channelType == "2")
					$.mobile.changePage("video_play.html?lessonID=" + _data[0].lessonID, "pop", false, false);
			}

			for(var i=0; i<_data.length; i++){
				var _this = _data[i];
				var _url = "voice_play.html?lessonID=" + _this.lessonID;
				var _flag = "";
				var _fileSize = "";

				if(_channelType == 2 || _channelType == "2")
					_url = "video_play.html?lessonID=" + _this.lessonID;

				_html += ' <div class="weui_cell">  <div class="weui_cell_bd weui_cell_primary"><a href="'+_url+'" data-ajax="false" data-rel="external" data-role="none"> <p class="Fgray-3">' + _this.lessonName + ' </p> </a> </div> <div class="weui_cell_ft"> <span class="F14">'+_fileSize +' ' + _flag+'</span> </div> </div>';

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
