
var userId;

$(function(){
	
	$(".file-btn").unbind("click").click(function(){
		$(".shop-img").click();
	})
	
	baseAjax.getUserId(callBackGetUserId);
	
	checkForm();
	
	baseAjax.getCategory("","",callBackGetCategory);
	
})

function callBackGetCategory(data){
	var myData = data;
	var _target = $("#class-1");
	
	_target.html("");
	if(base.isNull(myData)){
		_target.prepend('<option value="" selected="selected">请选择</option>');
		return false;
	}
	var temp = "";
	for(var i=0;i<myData.length;i++){
		
		var _this = myData[i];
		
		temp +='<option value="'+_this.type_id+'">'+_this.map_title+'</option>';
	}
	_target.append(temp);
	_target.prepend('<option value="" selected="selected">请选择</option>');
	bindEvent();
}

function callBackGetUserId(data){
	userId = data;
}

function openMsg(msg){
	$(".check-msg").text(msg);
	$("#checkMsg").popup('open');
}

function addShopCallBack(data){

	$(".check-msg").text(data.msg);
	$("#checkMsg").popup('open');
}

function bindEvent(){
	
	$("#class-1").unbind("change").change(function(){

		baseAjax.getCategory($(this).val(),"",callBackGetCategory2);
	})	
}

function callBackGetCategory2(data){
	var myData = data.list;
	var _target = $("#class-2");
	_target.html("");
	if(base.isNull(myData)){
		
		_target.prepend('<option value="" selected="selected">请选择</option>');
		return false;
	}
	var temp = "";
	for(var i=0;i<myData.length;i++){
		var _this = myData[i];
		temp +='<option value="'+_this.type_id+'">'+_this.map_title+'</option>';
	}
	_target.append(temp);
	_target.prepend('<option value="" selected="selected">请选择</option>');
}
	
function checkForm(){
	
	$(".open-shop-btn").unbind("click").click(function(){
		
		var shop_name = $("input[name=shop-name]").val();
		var registernum = $("input[name=reg-num]").val();
		var shop_address = $("input[name=shop-address]").val();
		var shop_proposer = $("input[name=shop-proposer]").val();
		var shop_phone = $("input[name=shop-phone]").val();
		var trade_id = $("input[name=class-1]").val();
		var bus_license = "";
		
		if(userId == "" || userId == null || userId == undefined){
			openMsg("请先登录");	
			return false;
		}
		if(cache._longitude == "" || cache._longitude == null || cache._longitude == undefined){
			openMsg("未获取到定位信息，请先定位");	
			return false;
		}
		if(cache._latitude == "" || cache._latitude == null || cache._latitude == undefined){
			openMsg("未获取到定位信息，请先定位");	
			return false;
		}
		if(shop_name == "" || shop_name == null || shop_name == undefined){
			openMsg("请输入店铺名称");	
			return false;
		}if(registernum == "" || registernum == null || registernum == undefined){
			openMsg("请输入注册号");
			return false;	
		}if(shop_address == "" || shop_address == null || shop_address == undefined){
			openMsg("请输入店铺地址");
			return false;	
		}if(shop_proposer == "" || shop_proposer == null || shop_proposer == undefined){
			openMsg("请输入联系人");
			return false;	
		}if(shop_phone == "" || shop_phone == null || shop_phone == undefined){
			openMsg("请输入联系方式");
			return false;	
		}
		
		baseAjax.addShop(shop_name,userId,trade_id,registernum,bus_license,shop_address,shop_proposer,shop_phone,cache._longitude,cache._latitude,addShopCallBack);
		
	})
	
	
}


