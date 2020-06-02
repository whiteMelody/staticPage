
$(function(){
	baseAjax.getCategorys(function(data){

		var $target = $(".data-list-data-area");
		var _html = "";
		if(data) {
			var _data = data.returnJSON;

			for(var i=0; i<_data.length; i++){
				var _list = _data[i].categoryList;

				var cateUrl = _data[i].categoryID;
				var cateImg = _data[i].imageURL;

				if(base.isNull(cateImg))
					cateImg = "source/images/data-bg1.png";

				_html += '<a href="javascript:;" data-ajax="false" data-rel="external" data-role="none"> <div class="wb100 img-area relative"> <img src="'+cateImg+'"> <p class="Fwhite absolute text-center wb100 F16" style="bottom:50%;">'+ _data[i].categoryName +'</p> <p class="Fwhite absolute text-center wb100 F14" style="bottom:20%;">'+ _data[i].categoryName_EN +'</p> </div></a> <div class="clear h5px"></div>';

				if(_list.length > 0){

					_html += '<div class="wb100 Fgray-3">';

					for(var j=0; j<_list.length; j++){
						var _item = _list[j];

						var _itemUrl = 'channel_list.html?categoryID=' + _item.categoryID;

						_html += ' <a href="'+_itemUrl+'" data-ajax="false" data-rel="external" data-role="none">';

						if(j%3 == 0){
							_html += '<p class="wb33 fl h30px lh30px text-center Fgray-3">'+_item.categoryName+'</p></a>';
						}if(j%3 == 1){
							_html += '<p class="wb33 fl h30px lh30px text-center Fgray-3 bor-gray bor-solid-1l bor-solid-1r">'+_item.categoryName+'</p></a>';
						}if(j%3 == 2){
							_html += '<p class="wb33 fl h30px lh30px text-center Fgray-3">'+_item.categoryName+'</p></a><div class="clear1"></div>';
						}

					}

					_html += '<div class="clear1"></div> <div class="clear1 warpper-gray-1"></div>';
				}

			}

			$target.append(_html);

		}
	})
})
