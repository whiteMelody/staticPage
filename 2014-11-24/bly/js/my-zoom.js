	
$(function(){
	
	var left	= 0,
		top		= 0,
		webpage	= $('#zoom-area'),
		offset	= { left: webpage.offset().left, top: webpage.offset().top },
		retina	= $('#retina')
		;
		
		retina.css({
			background : "url('"+ webpage.find("img").attr("src") +"') no-repeat center center white"
		});
	
	webpage.mousemove(function(e){

		left = (e.pageX-offset.left);
		top = (e.pageY-offset.top);
		img = $(this).find("img")
		src = img.attr("src");
		width_ratio =  img.attr("data-width") / img.width() ;
		height_ratio = img.attr("data-height") / img.height() ;
		
		sizes	= { retina: { width:retina.width(), height:retina.height() }, webpage:{ width:webpage.width(), height:webpage.height() } };
		
		if(retina.is(':not(:animated):hidden')){
			webpage.trigger('mouseenter');
		}

		if(left<0 || top<0 || left > sizes.webpage.width || top > sizes.webpage.height)
		{
			if(!retina.is(':animated')){
				webpage.trigger('mouseleave');
			}
			return false;
		}

		retina.css({
			left				: left - sizes.retina.width/2,
			top					: top - sizes.retina.height/2,
			backgroundPosition	: '-'+(left * width_ratio)+'px -'+(top * height_ratio)+'px'
		});
		
	}).mouseleave(function(){
		retina.stop(true,true).fadeOut('fast');
	}).mouseenter(function(){
		retina.stop(true,true).fadeIn('fast');
	});
	
	$("#zoom-page li").click(function(){
		
		var img = $(this).find("img");
		
		webpage.find("img").attr("src",img.attr("src")).attr("data-height",img.attr("data-height")).attr("data-width",img.attr("data-width"));
		
		retina.css({
			background : "url('"+ img.attr("src") +"') no-repeat center center white"
		});
		
		
	});
	
});