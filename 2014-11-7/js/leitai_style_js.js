//style_js
$(window).bind("orientationchange resize pageshow",function(){
	var describe_div_w=parseFloat($('.describe_div').width());
	var des_top=parseFloat($(".styleimgs").height());
  	$('.describe_div').css('left',(parseFloat($(document.body).width())-describe_div_w)/2);
	$('.describe_div').css('top',(des_top/5)*3);
	$('.baolei_describe_div').css('top',(des_top/2));
	$('.describe_div').css('display','block');
});