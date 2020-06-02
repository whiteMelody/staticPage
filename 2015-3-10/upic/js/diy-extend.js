var th_index=0;
var my_index=0;
function initExtend(){
	(function($){
		$.fn.moveStopEvent=function(callback){
			return this.each(function(){
				var x=0,y=0,x1=0,y1=0,isRun=false,si,self=this;
				var sif=function(){
					si=setInterval(function(){
						if(x==x1&&y==y1){
							clearInterval(si);
							isRun=false;
							callback&&callback.call(self)
						};
						x=x1;
						y=y1
					}
					,500)
				};
				$(this).mousemove(function(e){
					x1=e.pageX;
					y1=e.pageY;
					!isRun&&sif(),isRun=true
				}).mouseout(function(){
					clearInterval(si);
					isRun=false
				})
			})
		}
	})(jQuery);
	
	$(function(){
		
		var temp = parseInt(Math.random() * 73)+1 +"";
		var num = "";
		if(temp.length == 1){
			num = "00" + temp;	
		}else if(temp.length == 2){
			num = "0" + temp;
		}
		$(".content-warpper").css("backgroundImage","url(images/backgrounds/clipart_"+num+".png)");
		
		
		$(".Sbtn img").click(function(){
				if($(this).parent().next().css("display")!="block")
					$(this).parent().next().slideDown();
				else
					$(this).parent().next().slideUp();
			});
		$(".my-option").click(function(){
			$(this).parent().slideUp();
			var input = $(this).parent().parent().find("input");
			input.val($(this).html());
			input.attr("data",$(this).attr("data"));
			input.change();
		});
		
	});
};
function start(){
	$(".lineX").css("backgroundPosition",-my_index+"px 0px");
	$(".lineY").css("backgroundPosition","0px "+ -my_index+"px");
	my_index++;
	th_index++
}