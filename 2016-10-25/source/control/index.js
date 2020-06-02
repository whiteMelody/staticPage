
$(function(){

	base.showLoader("加载中...");

	//请求精选（首页）数据
	baseAjax.getHotChannel(function(data){
		if(data){

			var _data = data.returnJSON;

			//if data is array

			var $target = $(".index-data-area");
			var _html = "";

			for(var i=0; i<_data.length; i++){
				var _this = _data[i];
				var _url = "";

				//预留groupType参数，在使用路由器时采用
				if(_this.groupType == 1){
					//今日更新
					_url = "today.html?groupType=" + _this.groupType;
				}
				if(_this.groupType == 2){
					//每日一句
					_url = "today.html?groupType=" + _this.groupType;
				}
				if(_this.groupType == 3){
					//精选音频
					_url = "voice_list.html?groupType=" + _this.groupType;
				}
				if(_this.groupType == 4){
					//精选视频
					_url = "video_list.html?groupType=" + _this.groupType;
				}

				var _list = _this.details;

				if( _this.groupType == 2){
					_html +='<div class="wb100"><div class="wb100 h35px lh35px"> <img src="source/images/icon-c1.png" class="fl ma5"> <span class="fl display-inline F17 Fb">'+_this.groupName+'</span> </div> <div class="clear1"></div>';
				}else{
					_html +='<div class="wb100"><div class="wb100 h35px lh35px"> <img src="source/images/icon-c1.png" class="fl ma5"> <span class="fl display-inline F17 Fb">'+_this.groupName+'</span> <a href="'+_url+'" class="fr" data-role="none" data-ajax="false" data-rel="external"> <span class="Fblue F17 Fb">更多 ></span> </a> </div> <div class="clear1"></div>';
				}

				if(_list.length > 0 ){
					_html +=' <div class="wb100">';

					for(var j=0; j<_list.length; j++){
						var _item = _list[j];
						var _imgUrl = _item.iconURL;
						var _itemUrl = "";

						if(_item.channelType == 1){
							//音频
							_itemUrl = "voice_play.html?id=" + _item.ID;
						}
						if(_item.channelType == 2){
							//视频
							_itemUrl = "video_play.html?id=" + _item.ID;
						}

						if( _this.groupType == 2){
							//每日一句
							if(base.isNull(_imgUrl)){
								_imgUrl = config.load_img;
							}

							config.timer ++;
							base.pushLoader(config.timer,_imgUrl);

							//每次追加图片时，放入预加载的函数里
							_html += '<a href="'+_itemUrl+'" data-role="none" data-ajax="false" data-rel="external"> <div class="wb100 img-Warea relative"> <img src="'+config.load_img+'" class="img-load" data-time="'+config.timer+'"> <p style="background: rgba(0,0,0,.5); height: 30px; line-height: 30px; overflow: hidden; position: absolute; bottom: 8px; color: #fff; width: 90%; padding: 0 5%;">'+ _item.languageEN +'</p></div> </a> </div>';


						}else if(_this.groupType == 4){
							//精选视频

							if(base.isNull(_imgUrl)){
								_imgUrl = config.load_img;
							}

							_html += '<a href="'+_itemUrl+'" data-role="none" data-ajax="false" data-rel="external ">';

							if(j%2 == 0 ){
								_html += '<div class="wb48 fl">';
							}else{
								_html += '<div class="wb48 fr">';
							}


							config.timer ++;
							base.pushLoader(config.timer,_imgUrl);

							_html +='<a href="'+_itemUrl+'" data-role="none" data-ajax="false" data-rel="external "> <div > <div class="wb100 img-Warea"> <img src="'+config.load_img+'" class="load-img" data-time="'+config.timer+'"> </div> <div class="clear"></div> <p class="text-left h20px lh20px Fgray-3 F14 over-hidden">'+_item.channelName +'</p> <p class="text-left h20px lh20px Fgray-2 F12 over-hidden">'+_item.languageCN+'</p> </div> </a></div>';

							if(j%2 == 1 ){
								_html += '<div class="clear1"></div>';
							}

						}else{

							if(base.isNull(_imgUrl)){
								_imgUrl = config.load_img;
							}

							_html += '<a href="'+_itemUrl+'" data-role="none" data-ajax="false" data-rel="external ">';

							if(j%3 == 1 ){
								_html += '<div class="wb30 fl mal5per mar5per">';
							}else{
								_html += '<div class="wb30 fl">';
							}

							config.timer ++;
							base.pushLoader(config.timer,_imgUrl);

							_html += '<div class="wb100 img-Warea"><img src="'+config.load_img+'" class="load-img" data-time="'+config.timer+'"> </div> <div class="clear"></div> <p class="text-center h20px lh20px Fgray-3 F14 over-hidden">'+_item.channelName+'</p> </div> </a>';

							if(j%3 == 2 ){
								_html += '<div class="clear1"></div>';
							}

						}

					}

					_html += '</div><div class="clear1"></div>';

				}

			}

			$target.append(_html);

			base.loadImgs();

		}


	});

	//请求banner

	baseAjax.getFocusConfig(function(data){

		if(data){
			var _data = data.returnJSON;
			var $target = $(".banner-data-area");
			var _html = '<div class="swiper-container pab30"><div class="swiper-wrapper">';

			for(var i=0; i<_data.length; i++){

				var _imgUrl = _data[i].imageURL;

				if(base.isNull(_imgUrl)){
					_imgUrl = config.load_img;
				}

				config.timer ++;
				base.pushLoader(config.timer,_imgUrl);

				_html += '<div class="swiper-slide"><img src="'+ config.load_img +'" class="load-img" data-time="'+config.timer+'" /></div>'

			}

			_html += '</div> <div class="swiper-pagination"></div> </div>';

			$target.append(_html);

			$(".swiper-container").swiper({
				loop: true,
				autoplay: 3000
			});

		}

	});

	base.hideLoader();

})
