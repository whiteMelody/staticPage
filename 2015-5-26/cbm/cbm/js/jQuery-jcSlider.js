/*
 * jQuery - jcSlider v2.4
 * Copyright(c) 2012 by Adam’
 * Date: 2012-08-27
 * qq : 1741498
 */
 /* 代码整理：懒人之家 www.lanrenzhijia.com */
;(function($){
	$.fn.jcSlider = function(options) {
		var defaults = {
			speed:300,                     //图片切换速度设置，提供easing值 或 数值(mm)
			Default : 1,                   //设置默认显示图片
			setMode:'x',                   //设置slider显示模式，提供fade,x,y
			loadPath:'img/loading.gif',    //预加载loading图片路径，相对定位,如../img/gif
			setloadSize : {
				loadWidth : 32,		       //设置loading图片宽度(px)
				loadHeight : 32            //设置loading图片高度(px)
			},
			autoPlay:false,                 //是否开起自动播放功能，提供true,false
			autoTime:2000,                 //自动播放间隔时间(mm)
			arrow : true,                  //左右按钮开关，提供true,false
			arrowOffsetX : 40,              //设置左右按钮X偏移(px)
			subtle: {
				prev : 6,
				next : 10
			},
			numBtn:true,                   //数字按钮开关，提供true,false
			numBtnEvent:'click',           //数字按钮事件设置，提供click,mouseover等
			numBtnPos:'center',            //数字按钮位置，提供left,center,right
			setNumBtn : {
			    x : 0,					   //设置数字按钮的X偏移(px)
				y : 330	                   //设置数字按钮的Y偏移(px)
			},
			scaling:true,                  //是否设置图片大小，提供true,false
			setScaling : {
				width:956,                 //设置图片宽度单位(px)
				height:300                 //设置图片高度单位(px)
			}
		};
		var options = $.extend(defaults,options);
		return this.each(function() {
			var $this = $(this),
			    _self = this,
			    $list = $this.find("ul"),
				Public = new function(){
					this.hideDiv = "<div class='imgHide' style=\"position:relative;\"></div>";
					this.imgNum = function(list){
						return "<dl class=\"imgNum\" style=\"position:absolute;left:-200px;top:-200px;z-index:2;display:none; \" >" + list + "</dl>";
					};
					this.arrow = "<samp class='imgPrev' style=\"display:none;\"></samp><samp class='imgNext' style=\"display:none;\" ></samp>"
				},
				$imgs = $(this).find("img"),
				imgsLen = $imgs.length,
				_idx = options.Default-1,
			    arrNumBtn = [],
				thisWidth = $this.width(),
				thisHeight = $this.height(),
				$firstLi =  $this.find("li:first"),
				firstWidth = $firstLi.width(),
				firstHeight = $firstLi.height();
			$this.css({"position":"relative"}).find("ul").wrapAll(Public.hideDiv);;
			$list.css({"width":"9999%","position":"absolute","top":0,"left":0,"z-index":1});
			// 左右按钮 开关
			if(options.arrow){
				$this.prepend(Public.arrow);
				var $prev = $("samp:eq(0)",$this),
					$next = $("samp:eq(1)",$this),
					nSampWidth = $prev.width();
				$prev.css("left",0 - options.arrowOffsetX + options.subtle.prev)
				     .show()
				     .next("samp")
					 .css("left",(thisWidth - nSampWidth ) + options.arrowOffsetX + options.subtle.next)
					 .show();
				$prev.click(function(){
					if(_idx <= 0 ){
						_idx = imgsLen - 1;
					} else {
						_idx -= 1;
					};
					//console.log(_idx)
					sliderMode($this.find("dd:eq(" +_idx+ ")"));
					return false;
				});
				$next.click(function(){
					if(_idx >= imgsLen - 1 ){
						_idx = 0;
					} else {
						_idx += 1;
					};
					//console.log(_idx)
					sliderMode($this.find("dd:eq(" +_idx+ ")"));
					return false;
				});
			};
			//初始化列表
			var loadingX = (thisWidth-options.setloadSize.loadWidth)/2,
			    loadingY = (thisHeight-options.setloadSize.loadHeight)/2,
				preSrcArr = [];
			for(var m = 0; m < imgsLen; m++){
				var $thisImg = $imgs.eq(m),
					oNumList = m == _idx?"<dd class='select' style=\"cursor:pointer;float:left;\"><a>"+(m+1)+"</a></dd>":"<dd style=\"cursor:pointer;float:left;\"><a>"+(m+1)+"</a></dd>";
				preSrcArr.push($thisImg.attr("src"));
				arrNumBtn.push(oNumList);
				$thisImg.attr({"src":options.loadPath,
				               "width":options.setloadSize.loadWidth,
							   "height":options.setloadSize.loadHeight,
							   })
						.css({"left":loadingX,"top":loadingY,"position":"absolute","z-index":0});
				$thisImg.parents("li")
				        .css({"position":"absolute","left":0,"top":0,"display":"none"});
				// loading 效果
				publicMode(options.setMode,$imgs,m,firstWidth,firstHeight);
			};
			// 数字按钮 开关
			if(options.numBtn){
				$this.append(Public.imgNum(arrNumBtn.join("")));
				var $NumList = $this.find("dl"),
					NumWidth = $NumList.width(),
					NumHeight = $NumList.height(),
					NumLeft = 0;
				switch(options.numBtnPos){
					case "left" : 
						 NumLeft = 0;
						 break;
					case "center" : 
						 NumLeft = (firstWidth-NumWidth)/2;
						 break;
					case "right" : 
						 NumLeft = firstWidth-NumWidth;
						 break;
				};
				$NumList.css({"width":NumWidth,"height":NumHeight,"left":NumLeft+options.setNumBtn.x,"top":options.setNumBtn.y})
				        .show()
						.find("dd")
						.bind(options.numBtnEvent,function(){
							_idx = $(this).index();
							sliderMode($(this));
						});
			};
			// 自动播放 开关
			if(options.autoPlay){
				var play =  setInterval(function(){
					if(_idx >= imgsLen - 1 ){
						_idx = 0;
					} else {
						_idx += 1;
					};
					//console.log(_idx)
					sliderMode($this.find("dd:eq(" +_idx+ ")"));
				},options.autoTime);
				$this.hover(function(){
					clearInterval(play);
				},function(){
					play =  setInterval(function(){
						if(_idx >= imgsLen - 1 ){
							_idx = 0;
						} else {
							_idx += 1;
						};
						sliderMode($this.find("dd:eq(" +_idx+ ")"));
					},options.autoTime);
				});
			};
			//预加载图片
			var objImgArr = preLoadImg(preSrcArr);
			for(var b in objImgArr){
				objImgArr[b].tmp = b;
				objImgArr[b].onload = function(){
					var idx = this.tmp,
					    $thisImg = $imgs.eq(idx);
					$thisImg.parent().hide().html($(objImgArr[idx])).fadeIn(400);
					if(options.scaling){
						$thisImg.parents("li").css({"height":options.setScaling.height,"width":options.setScaling.width})
					};
				};
			};
			// 功能方法
			function preLoadImg(arrUrl){
				var arrImg = [];
				for(var d = 0; d < arrUrl.length; d++){
					var oImg = new Image();
					oImg.src = arrUrl[d];
					oImg.width = options.setScaling.width;
					oImg.height = options.setScaling.height;
					arrImg.push(oImg);
				};
				return arrImg;
			};

			function sliderMode(_this){
				switch(options.setMode){
					case "fade":
						 NumFadeMode($list.find("li"),_idx);
						 break;
					case "x":
						 NumXMode($list,_idx);
						 break;
					case "y":
						 NumYMode($list,_idx);
						 break;
					default :
						 alert("setMode error!")
				};
				if(options.numBtn){
					_this.addClass("select").siblings().removeClass("select");
				};
				return false;
			}
			function NumFadeMode(Dom,index){
				Dom.eq(index).fadeIn(options.speed).siblings().fadeOut(200);
				return false;
			};
			function NumXMode(Dom,index){
				Dom.stop().animate({"left":-index*firstWidth},options.speed);
				return false;
			};
			function NumYMode(Dom,index){
				Dom.find("li").show()
				Dom.stop().animate({"top":index*firstHeight},options.speed);
				return false;
			};
			
			function publicMode(mode,Dom,index,width,height){
				var $thisImg = Dom.eq(index);
				switch(mode){
					case "fade":
						 if(index == _idx){
							$thisImg.parents("li").fadeIn("fast");
						 };
						 break;
					case "x":
					     $thisImg.parents("li").css("left",index*width).fadeIn("fast");
						 break;
					case "y":
					     $thisImg.parents("li").css("top",-index*height).fadeIn("fast");
						 break;
					default :
						 alert("setMode error!")
				};
				return false;
			};
		});
	};
})(jQuery)
/* 代码整理：懒人之家 www.lanrenzhijia.com */