(function($){
	$.extend($.fn,{
		shoping:function(options){
			var self=this,
				$shop=$('#cart');
			var S={
				init:function(){
					$(self).data('click',true).live('click',this.addShoping);
				},
				addShoping:function(e){
					
					e.stopPropagation();
					var $target=$(e.target),
						id=$target.attr('id'),
						dis=$target.data('click'),
					    x = $target.offset().left + 30,
						y = $target.offset().top + 10,
						X = $shop.offset().left+$shop.width()/2-$target.width()/2+10,
						Y = $shop.offset().top;
					$('body').append('<div class="floatOrder"><img src="'+$(this).attr("data-img")+'" width="50" height="50" /></div');
				
			
					var $obj=$('.floatOrder');
						
					if(!$obj.is(':animated')){
						$obj.css({'left': x,'top': y}).animate({'left': X-6,'top': Y-80},300,function() {
							$obj.stop(false, false).animate({'top': Y-20,'opacity':0},200,function(){
								$(".floatOrder").remove();
							});
						});	
					};
					if($(this).attr("data-value")!=''){
						
						$.ajax({ 
							url: "/Cart/",
							type : "post",
							dataType: "json",
							data : {specif:"",amount:1,ac:"ajaxcart",hw_id:$(this).attr("data-value")} ,
							success : function(data){
								if(parseFloat(data)!=0)
									ref(data);
							}
						});	
						
					};
				}
				
			};
			S.init(); 
		}
	});	
})(jQuery); 

function del(id){
	$.ajax({ 
		url: "/Cart",
		type : "get",
		dataType: "json",
		data : {ajax : "del" , id : id } ,
		success : function(data){
			ref(data);
		}
	});	

}	

function ref(param){
	var data = param.Cartlist;
	var _item,_current,totleNum=0;
	var $target = $(".cart-area2");
	$target.html("");
	if(data == null || data.length==0 || data==undefined){
		_item = '<p style="color:#666;text-align:center;height:50px;font-size:18px;">购物车没有商品，<a href="/default" style="color:#666;">前去挑选</a></p>';
		$target.append(_item);
		$(".cart-count").text(0);
		return false;
	}
	
	for(var i=0;i<data.length;i++){
		_current = data[i];
		var tempNum = parseFloat(_current.amount);
		totleNum += tempNum;
		
		_item = '<li class="mab10"><div class="fl wb33"><a href="/Goods?id='+_current.hw_id+'"><img src="'+_current.bigpic+'" height="50" width="85"></a> </div><div class="fl wb55 mal5"><p class="h30px lh30px over-hidden"><a class="F12 gray" href="/Goods?id='+_current.hw_id+'">'+_current.title+'</a></p><p class="h20px lh20px over-hidden"><span class="F12 Fred">￥'+_current.price+'/'+_current.danwei+'</span></p></div><div class="fr wb5"><a href="javascript:void(0)" style="font-size:12px; color:#666;" onclick="del('+_current.id+')">X</a></div><div class="clear"></div> </li>';
		$target.append(_item);
	}
	
	$(".cart-count").text(totleNum);
	
}