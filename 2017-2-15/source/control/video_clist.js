
function getData(){

	var _channelID = base.getParmar("channelID");
	var _channelType = base.getParmar("channelType");
	var _channelName = base.getParmar("channelName");

	$(".text_name").text(decodeURI(_channelName));

	baseAjax.getLessonsByChannelID(_channelID,function(data){
		var $target = $(".video-list-data-area");
		var _html = "";
		if(data) {
			var _data = data.returnJSON;
			for(var i=0; i<_data.length; i++){
				var _this = _data[i];
				var _url = "video_play.html?lessonID=" + _this.lessonID;

				var _imgUrl = _this.iconURL;
				if(base.isNull(_imgUrl)){
					_imgUrl = "source/images/img-1.png";
				}
				_html += '<a href="'+_url+'" data-ajax="false" data-rel="external" data-role="none"><div class="wb100 h80px pat15 pab15 bor-gray bor-solid-1b"><div class="fl img-area h80px w80px video-area"> <div class="videos"> <img src="source/images/icon-video.png"> </div>  <img src="'+_imgUrl+'"> </div> <div class=" Fgray-3"> <p class="h55px lh25px over-hidden F18 pal15 Fgray-3 Fb mat5">'+_this.lessonName+' </p> <p class="h40px lh20px over-hidden F16 pal15 mat5 Fgray-2">'+_this.subtitle+' </p> </div> </div></a>';

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
