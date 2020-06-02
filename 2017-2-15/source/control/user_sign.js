
function mySign(type,date){

	var signs = base.getCookie("signs");

	var isExist = false;

	if(base.isNull(signs)){
		signs = new Array();
	}

	signs = eval("(" + signs + ")");

	for(var i=0; i<signs.length; i++){
		if(signs[i].date == date){
			if(type == "get"){
				return signs[i];
			}if(type == "switch"){
				signs[i].isFav = !signs[i].isFav;
				base.setCookie("signs", JSON.stringify(signs));
				return signs[i];
			}
			isExist = true;
		}

	}

	if(isExist == false){
		var temp = {
			date : date,
			isFav : false,
			id : $(".day-img").attr("data-id")
		}
		signs.push(temp);
		base.setCookie("signs", JSON.stringify(signs));
		return temp;
	}

	if(type = "del"){
		base.delCookie(date);
		return null;
	}

}

function getData(date){

	baseAjax.getEveryDayEnglishByDate(date,function(data){
		var $target = $(".text-list-data-area");
		var _html = "";
		if(data) {
			var _data = data.returnJSON;

			if(base.isNull(_data))
				return false;

			var _item = _data[0];

			$(".day-img").attr("data-id",_item.id);
			$(".day-img").empty();

			$(".day-img").append("<img src="+_item.imageURL+">");

			$(".day-en").text(_item.languageEN);
			$(".day-cn").text(_item.languageCN);
			$(".day-count").text(_item.praiseCount);

			var sign = mySign("get",date);

			if(sign.isFav){
				$(".fav-btn img").attr("src","source/images/icon-heart-blue.png");
			}else{
				$(".fav-btn img").attr("src","source/images/icon-heart.png");
			}

		}

	})
}

$(function(){

	var date = new Date();
	date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

	getData(date);

	$(".dialogBg,.sign-close").click(function(){
		$(".dialog-sign").hide(0);
		$(".dialogBg").hide(0);
	})

	$(".dialog-sign").show(0);
	$(".dialogBg").show(0);


	$(".sign-btn").click(function(){
		$(".dialog-sign").show(0);
		$(".dialogBg").show(0);
	})

	$(".fav-btn").click(function(){
		var _this = $(this);
		var s = _this.find("img").attr("src");

		if(s == "source/images/icon-heart-blue.png"){

			baseAjax.unPraiseSentence($(".day-img").attr("data-id"),function(data){
				if(data) {
					var count = data.returnJSON;
					_this.find("img").attr("src","source/images/icon-heart.png");
					_this.find("span").text(count);
					mySign("switch",date);
				}
			})

		}else{

			baseAjax.praiseSentence($(".day-img").attr("data-id"),function(data){
				if(data) {
					var count = data.returnJSON;
					_this.find("img").attr("src","source/images/icon-heart-blue.png");
					_this.find("span").text(count);
					mySign("switch",date);
				}
			})

		}


	})

	$(".sign-btn").click(function(){

	})


})
