
$(function(){
	
	baseAjax.getUserId(callBackGetUserId);
	
})

function callBackGetUserId(data){
	baseAjax.shopIncome(data,callBackGetIncome);	
	baseAjax.bankList(data,callBackGetBank);	
}

function callBackGetIncome(data){	
	if(base.isNull(data.sum_t_price)){
		$(".user-income").text("￥0");
		return false;
	}
	$(".user-income").text("￥"+data.sum_t_price);
}

function callBackGetBank(data){	

	if(base.isNull(data)){
		$(".user-card").text("0张");
		return false;
	}
	$(".user-card").text(data.length+"张");

}
