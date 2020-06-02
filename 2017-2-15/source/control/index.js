
$(function(){

	//请求精选（首页）数据
	baseAjax.getHotChannel(function(data){

		if(data){
			var _data = data.returnJSON;

			var _html = "";

			for(var i=0; i<_data.length; i++){

				var _this = _data[i];
				var _url = "";

				var $target = $(".data-area[data-id="+ _this.groupType +"]");

				var _list = _this.details;

				if(_list.length > 0 ){
					_html +=' <div class="wb100">';

					for(var j=0; j<_list.length; j++){
						var _item = _list[j];
						var _imgUrl = _item.iconURL;
						var _itemUrl = "";

						if(_item.channelType == 1){
							//音频
							_itemUrl = "text_list.html?channelID=" + _item.ID+"&channelType="+ _item.channelType +"&channelName="+ _item.channelName;
						}
						if(_item.channelType == 2){
							//视频
							_itemUrl = "video_clist.html?channelID=" + _item.ID+"&channelType="+ _item.channelType +"&channelName="+ _item.channelName;
						}

						if(_this.groupType == 2){
							_itemUrl = "user_sign.html";
						}

						if(base.isNull(_imgUrl)){
							_imgUrl = config.load_img;
						}

						$target.find(".img-area").eq(j).find("img").attr("src",_imgUrl);
						$target.find(".link-area").eq(j).attr("href",_itemUrl);
						$target.find(".text-area").eq(j).text(_item.channelName);

					}

					_html += '</div><div class="clear1"></div>';

				}

			}

			$target.append(_html);

			//启用图片延迟加载
			// base.loadImgs();

		}


	});

	//请求banner

	baseAjax.getFocusConfig(function(data){
		if(data){
			var _data = data.returnJSON;
			var $target = $(".banner-data-area");
			for(var i=0; i<_data.length; i++){
				var _imgUrl = _data[i].imageURL;
				if(base.isNull(_imgUrl))
					_imgUrl = config.load_img;
				$target.find(".swiper-slide img").eq(i).attr("src",_imgUrl);
			}
			$(".swiper-container").swiper({
				loop: true,
				autoplay: 3000
			});
		}
	});

})
