
$.fn.slider = function (options) {
    var opt = $.extend($.fn.slider.defaults, options);
    return this.each(function () {
        var base = new $.fn.slider.base();
        var wrapper = $(opt.wrapper);
        var tot = 0;
        wrapper.on("mouseenter mouseleave", function (e) {
            if (e.type == "mouseleave") {
                tot = setTimeout(function () {
                    base.autoPlayFlag = true;
                }, opt.ticker);
            }
            else {
                if (tot) {
                    clearTimeout(tot);
                }
                base.autoPlayFlag = false;
            }
        });
        var $this = $(this);
        var aLeft = $(opt.arrowLeft);
        var aRight = $(opt.arrowRight);
        aLeft.on("click", function () {
            base.showPrev();
        });
        aRight.on("click", function () {
            base.showNext();
        });
        wrapper.append(aLeft);
        wrapper.append(aRight);

        var imgs = $(opt.imgs);
        var nav = $(opt.nav);
        var cur = 0;
        var max = 1000;
        $this.find("a").each(function () {
            var dot = $(opt.dot);
            $(this).find("img").attr("tag", cur).css("z-index", max--);
            dot.attr("tag", cur++);
            dot.on("mouseenter", function () {
                var tag = parseInt($(this).attr("tag"));
                base.show(tag);
            });
            nav.append(dot);
            imgs.append(this);
        });
        base.count = cur;
        if (opt.effect == "fadein") {
            imgs.attr("class", "bn-img-fade");
        }
        wrapper.append(nav);
        wrapper.append(imgs);
        base.ctrl = wrapper;
        base.opt = opt;
        base.colorDot();
        setInterval(function () {
            base.autoPlay();
        }, opt.ticker);
        $this.replaceWith(wrapper);
    });
};

$.fn.slider.defaults = {
    showDots: true,
    ticker: 3200,
    aTicker: 500,
    effect: "slider", //slider,fadein
    wrapper: '<div class="bn-all"></div>',
    arrowLeft: '<div class="left anim">&lt;</div>',
    arrowRight: '<div class="right anim">&gt;</div>',
    nav: '<div class="nav"></div>',
    dot: '<em></em>',
    imgs: '<div class="bn-img"></div>'
};

$.fn.slider.base = function () {
    return {
        opt: {},
        ctrl: {},
        cur: 0,
        count: 0,
        showNav: false,
        first: null,
        autoPlayFlag: true,
        offset: 0,
        dir: true,
        max: 1000,
        autoPlay: function () {
            if (this.autoPlayFlag) {
                if (this.dir) {
                    this.showNext(true);
                }
                else {
                    this.showPrev(true);
                }
            }
        },
        showSlider: function (tag) {
            if (!this.first) {
                this.first = this.ctrl.find(".bn-img").find("img").eq(0);
                this.offset = 0 - this.first.width();
                this.ctrl.find(".bn-img").css("width", this.offset * this.count);
            }
            var calLeft = this.offset * this.cur;
            this.ctrl.find(".bn-img").stop().animate({
                marginLeft: calLeft
            }, this.opt.aTicker);
        },
        getFadeinEl: function (tag) {
            return this.ctrl.find(".bn-img-fade img[tag=" + tag + "]");
        },
        bring: function (tag, idx) {
            this.getFadeinEl(tag).css({ zIndex: idx, opacity: 0 });
        },
        showFadein: function (tag) {
            this.bring(tag, this.max++);
            $(this.getFadeinEl(tag)).stop().animate({
                opacity: 1
            }, this.opt.aTicker);
        },
        show: function (tag) {
            this.cur = tag;
            if (this.opt.showDots) {
                this.colorDot();
            }
            if (this.opt.effect == "fadein") {
                this.showFadein(tag);
            }
            else {
                this.showSlider(tag);
            }
        },
        colorDot: function () {
            this.ctrl.find(".ehover").removeClass("ehover");
            this.ctrl.find("em[tag=" + this.cur + "]").addClass("ehover");
        },
        showNext: function (flag) {
            this.cur++;
            if (this.cur > this.count - 1) {
                if (flag) {
                    this.cur = this.count - 2;
                    this.dir = false;
                }
                else {
                    this.cur = 0;
                }
            }
            this.show(this.cur);
        },
        showPrev: function (flag) {
            this.cur--;
            if (this.cur < 0) {
                if (flag) {
                    this.cur = 1;
                    this.dir = true;
                }
                else {
                    this.cur = this.count - 1;
                }
            }
            this.show(this.cur);
        }
    }
};
//window.onerror = function () { return true; };
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', value, expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
var base = (function ($) {
    return {
        ok: "ok",
        err: "error",
        cartName: "ShoppingCart",
        loginStatus: false,

        loadLoginStatus: function () {
            $.getJSON("json/wks-c.ashx?c=User&f=LoginStatus", { chk: $.now(), p: "{}" }, function (data) {
                if (data.status == base.ok) {
                    $("#zoneLogin [for=logout]").show();
                    $("#zoneLogin [for=login]").hide();
                    $("#loginText").text("娆㈣繋" + data.msg + "鏉ュ埌鍗℃€濆铔嬬硶");
                    base.loginStatus = true;
                }
                else {
                    $("#zoneLogin [for=logout]").hide();
                    $("#zoneLogin [for=login]").show();
                }
            });
        },
        cartCount: function () {
            var cookie = $.cookie(this.cartName) || "";
            var arr = cookie.split(",");
            var count = 0;
            for (var i = 0; i < arr.length; i++) {
                var tmp = arr[i].split("_");
                if (tmp.length > 1) {
                    count += parseInt(tmp[1]);
                }
            }
            return count;
        },
        showCartNum: function () {
            var count = this.cartCount();
            $(".cart-number").html(count);
        },
        logout: function () {
            $("#tw").show();
            $.getJSON("json/wks-c.ashx?c=User&f=Logout", { chk: $.now(), p: "{}" }, function (data) {
                $("#tw").hide();
                if (data.status == base.ok) {
                    //base.loadLoginStatus();
                    base.loginStatus = false;
                    $(window.location).attr("href", "login.htm?url=/" + window.location.pathname.toString().substring(1));
                }
            });
        },
        isLogin: function (obj) {
            if (!this.loginStatus) {
                $(window.location).attr("href", "login.htm?url=/" + $(obj).attr("href"));
                return false;
            }
            return true;
        }
    };
})($);

$(function () {
    $("#banner").slider({ effect: (Math.random() > 0.5 ? "fadein" : "slider") });
});

$(function () {
	$(".menu .menu-li").each(function(index){
	var width = parseInt($(this).css("width"));
		$(this).hover(function(){
			$(".menu-li-box").stop().animate({marginLeft:index * (width + 2 ) + "px"});	
			$(".menu-li-box").parent().attr("href",$(this).find("a").attr("href"));
		},function(){
			$(".menu-li-box").stop().animate({marginLeft:index * (width + 2 ) + "px"});	
			$(".menu-li-box").parent().attr("href",$(this).find("a").attr("href"));
		});
	});
	
	$(".menu-warpper").mouseleave(function(){
		$(".menu-li-box").stop().animate({marginLeft:0});	
		
		$(".menu-li-box").parent().attr("href",$(".menu .menu-li:eq(0)").find("a").attr("href"));
	});
	
	$(".why-box-ul").hide();
	$("div.why-icon .why-ul li").mouseover(function () {
		var index = $(this).index();
		$(".why-box-ul").stop(true, true).slideDown();
		$(".why-box-ul li").eq(index).show().siblings().hide();
	});
	$("div.why-icon").on("mouseleave", function () {
		$(".why-box-ul").stop(true, true).slideUp();
	});
	$(".hot-cake-change").each(function(index){
		$(this).click(function(){
			var hot = $(".hot-cake-img").eq(index);
			var current = hot.find(".current");
			current.fadeTo(400,0,function(){
				var _this = $(this)
				_this.hide(400,function(){
					hot.find(".hot-cake-link").removeClass("current");
					current.next().addClass("current");
					_this.remove();	
					hot.append(current);
					current.fadeTo(0,1);
				});
			});	
		});
	});
	
	
	$(".top-location").click(function(e){
		
		if($(this).attr("css") != "top-location"){
			$(this).addClass("top-location-hover");
			
			var obj = $(".top-location-warpper");
			
			obj.css("top",e.pageY - 10);
			obj.css("left",e.pageX - 10); 
			obj.show();
		}else{
			$(this).removeClass("top-location-hover");
			$(".top-location-warpper").hide();
		}
	});
	$(".top-location-warpper").mouseleave(function(){
		$(".top-location").removeClass("top-location-hover");
		$(this).hide();
	})
});

