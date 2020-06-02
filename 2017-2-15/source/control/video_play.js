
function getData(){

	var _lessonID = base.getParmar("lessonID");

	baseAjax.getLessonByID(_lessonID,function(data){

		if(data) {
			var _data = data.returnJSON;

			if (base.isNull(_data))
				return false;

			$(".video-name").text(_data.lessonName);

			var _video = _data.shareVideoURL;

			$(".video-area").append(_video);

			var _o = $(".video-area").find("object");
			var _e = $(".video-area").find("embed");
			_o.attr("width","100%");
			_o.removeAttr("height");
			_e.attr("width","100%");
			_e.removeAttr("height");

		}
	})
}

$(function(){
	getData();
})
