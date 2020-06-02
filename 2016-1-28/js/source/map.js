
var map = new BMap.Map("my-map");           
var point = new BMap.Point(116.331398,39.897445);
map.centerAndZoom(point,15);
map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));        
map.addControl(new BMap.NavigationControl());     
map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));

var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r){
	if(this.getStatus() == BMAP_STATUS_SUCCESS){
		var mk = new BMap.Marker(r.point);
		map.addOverlay(mk);
		map.panTo(r.point);
		callBack(r.point);
		
	}
	else {
		alert('failed'+this.getStatus());
	}        
},{enableHighAccuracy: true})

var tempContent = new Array();
var tempPoint = new Array();

function callBack(point){
	
	baseAjax.nearby("","",point.lng,point.lat,1000000,1,callBackForGetData);
	
}

function callBackForGetData(data){
	
	var myData = data;
	tempContent = new Array();
	if(base.isNull(myData)){
		return false;
	}
	
	for(var i=0; i<myData.length; i++){
		var _this = myData[i];
		var p1 = _this.longitude;
		var p2 = _this.latitude;
		
		//标注
		var pt = new BMap.Point(p1,p2);
		
		var myIcon = new BMap.Icon("/html/images/icon-point-"+ _this.sales_type +".png", new BMap.Size(27,37));
		
		var marker2 = new BMap.Marker(pt,{icon:myIcon});
		map.addOverlay(marker2);
		
		tempPoint.push(marker2);
		
		var sContent =
		'<div class="w200px h50px F75em"><div class="wb40 fl h80px img-area"><img src="/Uploads'+_this.goods_img+'"></div><div class="wb55 fr h80px Fgray-3 lh20px"><p class="Fb">'+ _this.goods_name +'</p><p>商家地址：'+_this.shop_address+'</p><p>距离：'+ _this.distance +'km</p></div></div>'; 
		tempContent.push(sContent);
	
	}
	
	for(var i=0; i<tempPoint.length; i++){
		var _current = tempPoint[i];
		creatInfo(_current,tempContent[i]);
	}
	
}

function creatInfo(point,content){
	point.addEventListener("click", function(){   
	   this.openInfoWindow(new BMap.InfoWindow(content));
	});
}
   
   
 
