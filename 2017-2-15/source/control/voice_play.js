
var myPlayer = {
	lrc : "",
	audio : "",
	_height : "",
	_loop : false,
	startY : 0,
	moveY : 0,
	endY : 0,
	init : function(){

		var _lessonID = base.getParmar("lessonID");

		baseAjax.getLessonByID(_lessonID,function(data){

			if(data) {
				var _data = data.returnJSON;

				if (base.isNull(_data))
					return false;

				// ?response-content-type=application/octet-stream

				if (myPlayer.audio == "")
					myPlayer.creatAudio(_data.mp3URL+"?response-content-type=MIME TYPE");

				if (myPlayer.lrc == "")
					myPlayer.creatLrc(_data.lrcURL);


			}
		})

	},
	creatLrc : function(url){


		$.ajax({
//                url:url,
//                headers:{
//                    contentType:"application/x-www-form-urlencoded"
//                },
			type: "get",
			url: url,
			success:function(lrc){

				var lyric = myPlayer.parseLyric(lrc);
				myPlayer.lrc = lyric;
				var _temp = '<ul class="lrcs">';


				for(var i=0;i<lyric.length; i++){

					if(lyric[i][0] == 0)
						continue;

					_temp += '<li data-time="'+ lyric[i][0] +'">'+lyric[i][1]+'</li>';

				}
//                    $.each(lyric,function(i,e){
//                        _temp += '<li data-time="'+i+'">'+e+'</li>';
//                    })
				_temp += '</ul>';
				$(".lrc-area").append(_temp);

				$(".active-time").text(myPlayer.parseMins(0));
				$(".all-time").text(myPlayer.parseMins($(".lrcs li").last().attr("data-time")));

				myPlayer.lrcEvents();
			},
			error:function(e){
				console.log(e)
			}
		});

	},
	creatAudio : function(url){

		var _temp = '<div id="slider" data-role="none"> <div class="speed" data-type="speed">1x</div> <img src="source/images/icon-setting.png" data-type="setting" class="setting"> </div>  <audio id="myAudio" src="'+url+'" ></audio> <div class="audio-controls"> <div class="clear"></div> <div class="wb100"> <div class="wb19 text-center fl"> <img src="source/images/icon-playtype.png" class="h30px loop-btn"> </div> <div class="wb19 text-center fl"> <img src="source/images/icon-prev.png" class="h30px prev-btn"> </div> <div class="wb24 text-center fl"> <img src="source/images/icon-play.png" class="play-btn h50px" style="margin-top:-10px; "> </div> <div class="wb19 text-center fl"> <img src="source/images/icon-next.png" class="h30px next-btn"> </div> <div class="wb19 text-center fl"> <img src="source/images/icon-voice.png" class="h30px"> </div> </div> </div>';

		$(".audio-area").append(_temp);

		myPlayer.listenLrc();
	},
	parseLyric : function (text) {
		lyric = text.split('\r\n'); //先按行分割
		var _l = lyric.length; //获取歌词行数
		lrc = new Array(); //新建一个数组存放最后结果
		for(var i=0;i<_l;i++) {
			var d = lyric[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g);  //正则匹配播放时间
			var t = lyric[i].split(d); //以时间为分割点分割每行歌词，数组最后一个为歌词正文
			if (d != null) { //过滤掉空行等非歌词正文部分
				//换算时间，保留两位小数
				var dt = String(d).split(':');
				var _t = Math.round(parseInt(dt[0].split('[')[1]) * 60 + parseFloat(dt[1].split(']')[0])) * 100 / 100;
				lrc.push([_t, t[1]]);
			}
		}
		return lrc;
	},

//        parseLyric : function(lrc) {
//            var lyrics = lrc.split("\n");
//            var lrcObj = {};
//            for(var i=0;i<lyrics.length;i++){
//                var lyric = decodeURIComponent(lyrics[i]);
//                var timeReg = /\[\d{2}:\d{2}((\.|\:)\d{2})\]/g;
//                var timeRegExpArr = lyric.match(timeReg);
//                if(!timeRegExpArr)continue;
//                var clause = lyric.replace(timeReg,'');
//
//                for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
//                    var t = timeRegExpArr[k];
//                    var min = Number(String(t.match(/\[\d*/i)).slice(1)),
//                            sec = Number(String(t.match(/\:\d*/i)).slice(1));
//                    var time = min * 60 + sec;
//                    lrcObj[time] = clause;
//                }
//            }
//            return lrcObj;
//        }
	//转换分钟数 s：秒数
	parseMins : function(s){
		var m1 = Math.floor(s/60);
		var m2 = s%60;
		if(m1 <10){
			m1 = "0" + m1;
		}
		if(m2 <10){
			m2 = "0" + m2;
		}
		return m1 + ":" + m2;
	},
	//转换秒数 t:时间
	parseSecond : function(t){
		var t1 = parseInt(t.split(":")[0]);
		var t2 = parseInt(t.split(":")[1]);
		return t1 * 60 + t2;
	},
	lrcEvents : function(){

		var _min = $("body").height() / 2 - $(".audio-area").height() / 2;

		var _max = ($(".lrcs").height() - _min) * -1;

		$(".time-line").css({
			"top" : _min + "px"
		})

		$(".lrcs").css(
			"transform","translate3d(0px, "+ _min +"px, 0px)"
		)

		document.addEventListener("touchstart", function(ev){
			if(ev){
				var _ev = ev.changedTouches[0];
				myPlayer.startY = _ev.clientY || _ev.pageY;
			}
		}, false);

		document.addEventListener("touchmove", function(ev){
			if(ev){
				var _ev = ev.changedTouches[0];
				myPlayer.moveY = _ev.clientY || _ev.pageY;

				var _y =  parseFloat(myPlayer.moveY) - parseFloat(myPlayer.startY) + parseFloat(myPlayer.getPageY());

				if(_y > _min)
					return false;

				if(_y < _max)
					return false;

				$(".lrcs").css(
					"transform","translate3d(0px, "+ _y +"px, 0px)"
				)

			}
		}, false);

		document.addEventListener("touchend", function(ev){
			if(ev){
				var _ev = ev.changedTouches[0];
				myPlayer.endY = _ev.clientY || _ev.pageY;

				var _y =  parseFloat(myPlayer.endY) - parseFloat(myPlayer.startY) + parseFloat(myPlayer.getPageY());

				if(_y > _min)
					return false;

				if(_y < _max)
					return false;

				$(".lrcs").css(
					"transform","translate3d(0px, "+ _y +"px, 0px)"
				)
			}
		}, false);

	},
	getLrcByTime : function(time){

		var temp = {
			lrc : "",
			index : ""
		}

		for(var i=0; i<myPlayer.lrc.length; i++){
			if(Math.round(myPlayer.lrc[i][0]) == time){
				temp.lrc = myPlayer.lrc[i];
				$(".lrcs li").each(function(){
					if( $(this).text() == myPlayer.lrc[i][1]){
						temp.index = $(this).index();
					}
				})
				return temp;
			}
		}

		return null;

	},
	//改变歌词，主要用于监听函数
	listenLrc : function(){
		myPlayer.audio = document.getElementById("myAudio");
		//默认启用第一个audio标签
		var _audio = $("audio").eq(0);

		_audio.unbind("timeupdate").bind("timeupdate",function(){

			var _currentTime = Math.round($(this).context.currentTime);

//                $(this).context.playbackRate = 10;

			var lrc =  myPlayer.getLrcByTime(_currentTime);

			var _current = $(".lrcs li[data-time="+_currentTime+"]").last();

			if(!base.isNull(lrc)){

				$(".lrcs li").removeClass("active");
				_current.addClass("active");
				myPlayer.changeLrc(_current.index());
			}

			var _current2 = $(".lrcs li[data-time="+_currentTime+"]").first();

			if(_current2.prev().length >0 && myPlayer._loop){
				//返回上一个时间节点
				myPlayer.changeTimer( parseFloat(_current2.prev().attr("data-time")) );
			}

			$(".lrcs li").removeClass("current");
			_current.addClass("current");

			var _t = _currentTime / $(".lrc-area li").last().attr("data-time") * 100;

			$(".ui-slider-handle").css({
				"left" : _t + "%"
			})
			$(".ui-btn-active").css({
				"width" : _t + "%"
			})

			$(".active-time").text(myPlayer.parseMins(_currentTime));

		})

		$(".play-btn").unbind("click").click(function(){
			if(myPlayer.audio.paused){
				myPlayer.audio.play();
				$(this).text("暂停");
				$(this).attr("src","source/images/icon-pause.png");
			}else{
				myPlayer.audio.pause();
				$(this).text("播放");
				$(this).attr("src","source/images/icon-play.png");
			}
		})

		$(".prev-btn").unbind("click").click(function(){

			var _temp = $(".lrcs .active").prev();
			if(_temp.length == 0){
				_temp = $(".lrcs li").eq(0);
			}

			$(".lrcs li").removeClass("active");
			_temp.addClass("active");
			var _t = _temp.attr("data-time");
			myPlayer.changeTimer(_t);

		})

		$(".next-btn").unbind("click").click(function(){

			var _temp = $(".lrcs .active").next();

			if(_temp.length == 0){
				_temp = $(".lrcs li").eq(0);
			}

			$(".lrcs li").removeClass("active");
			_temp.addClass("active");
			var _t = _temp.attr("data-time");
			myPlayer.changeTimer(_t);

		})

		$(".dialogBg,.sound-close").unbind("click").click(function(){
			closeDialog();
		})

		$(".speed,.setting").unbind("click").click(function(){
			openDialog($(this).attr("data-type"));
		})

		$(".loop-btn").unbind("click").click(function(){

			myPlayer.changePlayType();
		})

		$(".sound-speed").unbind("click").click(function(){
			$(".sound-speed").removeClass("sound-speed-active");
			myPlayer.audio.playbackRate = $(this).attr("data-value");
			$(this).addClass("sound-speed-active");
			closeDialog();
			$(".speed").text($(this).attr("data-value") + "x");
		})

		$( "#slider" ).slider({
			highlight: true,
			stop: function( event, ui ) {
				var _t = $(".ui-btn-active").width() / $(".ui-slider-track").width() * $(".lrc-area li").last().attr("data-time");
				myPlayer.changeTimer(_t);

			}
		});

		$(".ui-btn-active").css({
			"width" : 0
		})

	},
	getLrc : function(i,type){

		var _temp = $(".lrcs li[data-time="+i+"]");

		if(_temp.length == 0){
			if(type = "prev")
				myPlayer.getLrc(--i,type);
			else
				myPlayer.getLrc(++i,type);
		}else{
			return _temp;
		}

	},
	//改变播放时间 t:time
	changeTimer : function(t){
		var _t = t;

		myPlayer.audio.fastSeek(_t);

		_t /= parseFloat($(".lrcs li").last().attr("data-time"));

		_t *=  $(".lrcs li").length;

		myPlayer.changeLrc(Math.round(_t));
	},
	//改变歌词 i:歌词索引
	changeLrc : function(i){

		if( myPlayer._height == "")
			myPlayer._height = $("body").height() / 2;

		var prevAll = $(".lrcs li").eq(i).prevAll();

		var prevHeight = 0,allHeight = 0;

		if(i<0)
			return false;

		prevAll.each(function(){
			prevHeight += $(this).height();
			prevHeight += 20;
		})
		$(".lrcs li").each(function(){
			allHeight += $(this).height();
			allHeight += 20;
		})

		prevHeight += $(".lrcs li").eq(i).height();
		prevHeight += 20;

		var _h = prevHeight * -1 + myPlayer._height;

		$(".lrcs").css(
			"transform","translate3d(0px, "+ _h +"px, 0px)"
		)
	},
	getPageY : function(){
		var temp = $(".lrcs").css("transform");
		temp = temp.substring(temp.indexOf("(")+1,temp.length-1);
		return temp = temp.split(",")[5];
	},
	changePlayType : function(){
		myPlayer._loop = !myPlayer._loop;
	}

}

$(function(){
	myPlayer.init();
})

function openDialog(type){
	$(".dialogBg").show(0);
	if(type == "speed")
		$(".dialog-sound-speed").show(0);
	if(type == "setting")
		$(".dialog-sound-setting").show(0);
}

function closeDialog(){
	$(".dialogBg").hide(0);
	$(".dialog-sound").hide(0);
}

