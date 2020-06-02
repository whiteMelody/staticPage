/*
		miku
		2014年6月14日 11:42:41
	*/
	function createTool(){
		var tool = new Object();tool.data1 = null;tool.data2 = null;tool.events = new Array();tool.target = new Array();tool.recycle = new Array();tool.hand = new Array();tool.pointer = new Array();tool.timer = null;tool.no = null;

		/*****************************************************获取数据*****************************************************/
		tool.getData = function(type,no){
			tool.no = no;
			tool.pointer = new Array();
			tool.pointer.push(0);
			$(".templateNo").text(tool.no);
			if(type == "diy-front"){
			
				tool.data1 = {"box1":[{"datacontent":"网甲","datafamily":"黑体","datasize":"38px","datab":1,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"39px","dataleft":"230px"}],
				"box2":[{"datacontent":"Web前端工程师","datafamily":"宋体","datasize":"13px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"85px","dataleft":"224px"}],
				"box3":[{"datacontent":"地址：重庆市南坪金信大厦29-7","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"120px","dataleft":"184px"}],
				"box4":[{"datacontent":"电话：11111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"135px","dataleft":"184px"}],
				"box5":[{"datacontent":"传真：11111111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"150px","dataleft":"184px"}],
				"box6":[{"datacontent":"E-mali：wangjia@wj.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"165px","dataleft":"184px"}],
				"box7":[{"datacontent":"http://wangjia.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"180px","dataleft":"184px"}],"template":"template/OS201205230929406491.png"}
				
				if(no == "100000001"){
					tool.data1 = {"box1":[{"datacontent":"网甲","datafamily":"黑体","datasize":"38px","datab":1,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"9px","dataleft":"230px"}],
					"box2":[{"datacontent":"Web前端工程师","datafamily":"宋体","datasize":"13px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"55px","dataleft":"224px"}],
					"box3":[{"datacontent":"地址：重庆市南坪金信大厦29-7","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"80px","dataleft":"184px"}],
					"box4":[{"datacontent":"电话：11111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"95px","dataleft":"184px"}],
					"box5":[{"datacontent":"传真：11111111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"110px","dataleft":"184px"}],
					"box6":[{"datacontent":"E-mali：wangjia@wj.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"125px","dataleft":"184px"}],
					"box7":[{"datacontent":"http://wangjia.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"140px","dataleft":"184px"}],"template":"template/OS200908300957050000.png"}
				}if(no == "100000002"){
					tool.data1 = {"box1":[{"datacontent":"网甲","datafamily":"黑体","datasize":"38px","datab":1,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"39px","dataleft":"130px"}],
					"box2":[{"datacontent":"Web前端工程师","datafamily":"宋体","datasize":"13px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"85px","dataleft":"124px"}],
					"box3":[{"datacontent":"地址：重庆市南坪金信大厦29-7","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"120px","dataleft":"84px"}],
					"box4":[{"datacontent":"电话：11111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"135px","dataleft":"84px"}],
					"box5":[{"datacontent":"传真：11111111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"150px","dataleft":"84px"}],
					"box6":[{"datacontent":"E-mali：wangjia@wj.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"165px","dataleft":"84px"}],
					"box7":[{"datacontent":"http://wangjia.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"180px","dataleft":"84px"}],"template":"template/OS200909041135586718.png"}
				}if(no == "100000003"){
					tool.data1 = {"box1":[{"datacontent":"网甲","datafamily":"黑体","datasize":"38px","datab":1,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"39px","dataleft":"185px"}],
					"box2":[{"datacontent":"Web前端工程师","datafamily":"宋体","datasize":"13px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"85px","dataleft":"175px"}],
					"box3":[{"datacontent":"地址：重庆市南坪金信大厦29-7","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"120px","dataleft":"150px"}],
					"box4":[{"datacontent":"电话：11111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"135px","dataleft":"150px"}],
					"box5":[{"datacontent":"传真：11111111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"150px","dataleft":"150px"}],
					"box6":[{"datacontent":"E-mali：wangjia@wj.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"165px","dataleft":"150px"}],
					"box7":[{"datacontent":"http://wangjia.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"180px","dataleft":"150px"}],"template":"template/OS201109160410048756.png"}
				}if(no == "100000004"){
					tool.data1 = {"box1":[{"datacontent":"网甲","datafamily":"黑体","datasize":"38px","datab":1,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"39px","dataleft":"40px"}],
					"box2":[{"datacontent":"Web前端工程师","datafamily":"宋体","datasize":"13px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"85px","dataleft":"74px"}],
					"box3":[{"datacontent":"地址：重庆市南坪金信大厦29-7","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"120px","dataleft":"54px"}],
					"box4":[{"datacontent":"电话：11111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"135px","dataleft":"34px"}],
					"box5":[{"datacontent":"传真：11111111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"150px","dataleft":"54px"}],
					"box6":[{"datacontent":"E-mali：wangjia@wj.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"165px","dataleft":"34px"}],
					"box7":[{"datacontent":"http://wangjia.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"180px","dataleft":"54px"}],"template":"template/OS201109160956214531.png"}
				}if(no == "100000005"){
					tool.data1 = {"box1":[{"datacontent":"网甲","datafamily":"黑体","datasize":"38px","datab":1,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"39px","dataleft":"230px"}],
					"box2":[{"datacontent":"Web前端工程师","datafamily":"宋体","datasize":"13px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"85px","dataleft":"224px"}],
					"box3":[{"datacontent":"地址：重庆市南坪金信大厦29-7","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"120px","dataleft":"184px"}],
					"box4":[{"datacontent":"电话：11111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"135px","dataleft":"184px"}],
					"box5":[{"datacontent":"传真：11111111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"150px","dataleft":"184px"}],
					"box6":[{"datacontent":"E-mali：wangjia@wj.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"165px","dataleft":"184px"}],
					"box7":[{"datacontent":"http://wangjia.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"180px","dataleft":"184px"}],"template":"template/OS201109161000210625.png"}
				}if(no == "100000006"){
					tool.data1 = {"box1":[{"datacontent":"网甲","datafamily":"黑体","datasize":"38px","datab":1,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"39px","dataleft":"230px"}],
					"box2":[{"datacontent":"Web前端工程师","datafamily":"宋体","datasize":"13px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"85px","dataleft":"224px"}],
					"box3":[{"datacontent":"地址：重庆市南坪金信大厦29-7","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"120px","dataleft":"194px"}],
					"box4":[{"datacontent":"电话：11111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"135px","dataleft":"194px"}],
					"box5":[{"datacontent":"传真：11111111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"150px","dataleft":"194px"}],
					"box6":[{"datacontent":"E-mali：wangjia@wj.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"165px","dataleft":"194px"}],
					"box7":[{"datacontent":"http://wangjia.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"180px","dataleft":"194px"}],"template":"template/OS201110171004027073.png"}
				}if(no == "100000007"){
					tool.data1 = {"box1":[{"datacontent":"网甲","datafamily":"黑体","datasize":"38px","datab":1,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"39px","dataleft":"230px"}],
					"box2":[{"datacontent":"Web前端工程师","datafamily":"宋体","datasize":"13px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"85px","dataleft":"224px"}],
					"box3":[{"datacontent":"地址：重庆市南坪金信大厦29-7","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"120px","dataleft":"184px"}],
					"box4":[{"datacontent":"电话：11111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"135px","dataleft":"184px"}],
					"box5":[{"datacontent":"传真：11111111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"150px","dataleft":"184px"}],
					"box6":[{"datacontent":"E-mali：wangjia@wj.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"165px","dataleft":"184px"}],
					"box7":[{"datacontent":"http://wangjia.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"180px","dataleft":"184px"}],"template":"template/OS201110280940417343.png"}
				}if(no == "100000008"){
					tool.data1 = {"box1":[{"datacontent":"网甲","datafamily":"黑体","datasize":"38px","datab":1,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"39px","dataleft":"230px"}],
				"box2":[{"datacontent":"Web前端工程师","datafamily":"宋体","datasize":"13px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"85px","dataleft":"224px"}],
				"box3":[{"datacontent":"地址：重庆市南坪金信大厦29-7","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"120px","dataleft":"184px"}],
				"box4":[{"datacontent":"电话：11111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"135px","dataleft":"184px"}],
				"box5":[{"datacontent":"传真：11111111111","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"150px","dataleft":"184px"}],
				"box6":[{"datacontent":"E-mali：wangjia@wj.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"165px","dataleft":"184px"}],
				"box7":[{"datacontent":"http://wangjia.com","datafamily":"宋体","datasize":"11px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"180px","dataleft":"184px"}],"template":"template/OS201205230929406491.png"}
				}
				
			}
			if(type == "diy-reverse"){
				tool.data2 = {"box8":[{"datacontent":"重庆网甲科技有限公司","datafamily":"黑体","datasize":"24px","datab":1,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"90px","dataleft":"30px"}],
				"box9":[{"datacontent":"人工改图 智能改图 创意石板画","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"130px","dataleft":"10px"}],
				"box10":[{"datacontent":"标志设计 名片设计 照片处理","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"130px","dataleft":"170px"}],"template":"template/OS201205230929266714.png"}
				
				if(no == "100000001"){
					tool.data2 = {"box8":[{"datacontent":"网甲科技","datafamily":"黑体","datasize":"24px","datab":1,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"135px","dataleft":"90px"}],
					"box9":[{"datacontent":"人工改图 智能改图 创意石板画","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"175px","dataleft":"35px"}],
					"box10":[{"datacontent":"标志设计 名片设计 照片处理","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#666","dataalign":"left","datatop":"195px","dataleft":"110px"}],"template":"template/OS200908300957358750.png"}
				}if(no == "100000002"){
					tool.data2 = {"box8":[{"datacontent":"重庆网甲科技有限公司","datafamily":"黑体","datasize":"24px","datab":1,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"90px","dataleft":"130px"}],
					"box9":[{"datacontent":"人工改图 智能改图 创意石板画","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"130px","dataleft":"110px"}],
					"box10":[{"datacontent":"标志设计 名片设计 照片处理","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"130px","dataleft":"270px"}],"template":"template/OS200909041136340781.png"}
				}if(no == "100000003"){
					tool.data2 = {"box8":[{"datacontent":"重庆网甲科技有限公司","datafamily":"黑体","datasize":"24px","datab":1,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"90px","dataleft":"120px"}],
					"box9":[{"datacontent":"人工改图 智能改图 创意石板画","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"130px","dataleft":"100px"}],
					"box10":[{"datacontent":"标志设计 名片设计 照片处理","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"130px","dataleft":"260px"}],"template":"template/OS201109160410209866.png"}
				}if(no == "100000004"){
					tool.data2 = {"box8":[{"datacontent":"重庆网甲科技有限公司","datafamily":"黑体","datasize":"24px","datab":1,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"50px","dataleft":"30px"}],
					"box9":[{"datacontent":"人工改图 智能改图 创意石板画","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"100px","dataleft":"15px"}],
					"box10":[{"datacontent":"标志设计 名片设计 照片处理","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"130px","dataleft":"85px"}],"template":"template/OS201109160956214531.png"}
				}if(no == "100000005"){
					tool.data2 = {"box8":[{"datacontent":"重庆网甲科技","datafamily":"黑体","datasize":"24px","datab":1,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"90px","dataleft":"200px"}],
					"box9":[{"datacontent":"人工改图 智能改图 创意石板画","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"140px","dataleft":"150px"}],
					"box10":[{"datacontent":"标志设计 名片设计 照片处理","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"155px","dataleft":"250px"}],"template":"template/OS201109161000210625.png"}
				}if(no == "100000006"){
					tool.data2 = {"box8":[{"datacontent":"网甲科技","datafamily":"黑体","datasize":"24px","datab":1,"datai":0,"datau":0,"datacolor":"#00","dataalign":"left","datatop":"90px","dataleft":"70px"}],
					"box9":[{"datacontent":"人工改图 智能改图","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"130px","dataleft":"70px"}],
					"box10":[{"datacontent":"标志设计 名片设计 照片处理  创意石板画","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#000","dataalign":"left","datatop":"150px","dataleft":"20px"}],"template":"template/OS201110171009321916.png"}
				}if(no == "100000007"){
					tool.data2 = {"box8":[{"datacontent":"重庆网甲科技有限公司","datafamily":"黑体","datasize":"24px","datab":1,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"90px","dataleft":"80px"}],
					"box9":[{"datacontent":"人工改图 智能改图 创意石板画","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"130px","dataleft":"60px"}],
					"box10":[{"datacontent":"标志设计 名片设计 照片处理","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"130px","dataleft":"220px"}],"template":"template/OS201110280943269843.png"}
				}if(no == "100000008"){
					tool.data2 = {"box8":[{"datacontent":"重庆网甲科技有限公司","datafamily":"黑体","datasize":"24px","datab":1,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"90px","dataleft":"30px"}],
				"box9":[{"datacontent":"人工改图 智能改图 创意石板画","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"130px","dataleft":"10px"}],
				"box10":[{"datacontent":"标志设计 名片设计 照片处理","datafamily":"微软雅黑","datasize":"10px","datab":0,"datai":0,"datau":0,"datacolor":"#fff","dataalign":"left","datatop":"130px","dataleft":"170px"}],"template":"template/OS201205230929266714.png"}
				}
				
				
			}
		};
		/*****************************************************保存数据*****************************************************/
		tool.saveData = function(type){
			
			$("#save").click(function(){
				tool.data1 = "";
				tool.data2 = "";
				var _front = $(".diy-front");
				var _reverse = $(".diy-reverse");
				var f_box = _front.find(".diy-box");
				var r_box = _reverse.find(".diy-box");	

				tool.data1+="{";
				tool.data2+="{";
				f_box.each(function(i){
					var _this = $(this);
					var _box = $(this).find(".box-content");
					tool.data1 +="'"+_box.attr("dataname")+"':[{'datacontent':'"+_box.html()+"','datafamily':'"+_box.attr("datafamily")+"','datasize':'"+_box.attr("datasize")+"','datab':"+_box.attr("datab")+",'datai':"+_box.attr("datai")+",'datau':"+_box.attr("datau")+",'datacolor':'"+_box.attr("datacolor")+"','dataalign':'"+_box.attr("dataalign")+"','datatop':'"+_box.attr("datatop")+"','dataleft':'"+_box.attr("dataleft")+"'}],";
				});
				r_box.each(function(i){
					var _this = $(this);
					var _box = $(this).find(".box-content");
					tool.data2 +="{'"+_box.attr("dataname")+"':[{'datacontent':'"+_box.html()+"','datafamily':'"+_box.attr("datafamily")+"','datasize':'"+_box.attr("datasize")+"','datab':"+_box.attr("datab")+",'datai':"+_box.attr("datai")+",'datau':"+_box.attr("datau")+",'datacolor':'"+_box.attr("datacolor")+"','dataalign':'"+_box.attr("dataalign")+"','datatop':'"+_box.attr("datatop")+"','dataleft':'"+_box.attr("dataleft")+"'}],";
				});
				var front_bg = _front.css("backgroundImage");
				var reverse_bg = _reverse.css("backgroundImage");
				front_bg = front_bg.substring(front_bg.indexOf('images/')+7,front_bg.indexOf('")'));
				reverse_bg = reverse_bg.substring(reverse_bg.indexOf('images/')+7,reverse_bg.indexOf('")'));
				
				if(front_bg =="" || front_bg ==null || front_bg==undefined)
					front_bg = _front.css("backgroundColor");
				if(reverse_bg =="" || reverse_bg ==null || reverse_bg==undefined)
					reverse_bg = _reverse.css("backgroundColor");
				
				tool.data1 += "'template':'";
				tool.data1 += front_bg;
				tool.data1 +="'}";
				tool.data2 += "'template':'";
				tool.data2 += front_bg;
				tool.data2 +="'}";

			});
			
		};
		/*****************************************************加载数据*****************************************************/
		tool.loadBox = function(){
			var $lineX ="<div class='lineX'></div>";
			var $lineY ="<div class='lineY'></div>";
			var _reverse = $(".diy-reverse");
			var _front = $(".diy-front");
			_reverse.html(""); _front.html("");
			_reverse.append($lineX).append($lineY);
			_front.append($lineX).append($lineY);
			tool.analysis(tool.data1,_front);
			tool.analysis(tool.data2,_reverse);
		};
		/*****************************************************解析数据*****************************************************/
		tool.analysis = function(_data,obj){
			$.each(_data,function(name,data){
				//template			
				if(name=="template"){
					if(data.indexOf("#")==-1) 
						obj.css("backgroundImage","url(images/"+data+")");
					else
						obj.css("backgroundColor",data);
				}else{
					//box
					$.each(data,function(key,value){
						var draggable = $("<div class='diy-box draggable'></div>");
						var box = $("<div class='box-content'></div>");
						box.attr("dataName",name);
						for(var key in value){
							//alert("name:"+name+" key:"+key+" value:"+value[key]);
							if(key === "datacontent" ){
								box.attr("datacontent",value[key]);
								box.html(value[key]);
							}
							if(key === "datafamily" ){
								box.attr("datafamily",value[key]);
								box.css("fontFamily",value[key]);
							}
							if(key === "datasize" ){
								box.attr("datasize",value[key]);
								box.css("fontSize",value[key]);
							}
							if(key === "datab" ){
								box.attr("datab",value[key]);
								if(value[key] == 0) box.css("fontWeight","normal");
								else box.css("fontWeight","800");
							}
							if(key === "datai" ){
								box.attr("datai",value[key]);
								if(value[key] == 0) box.css("fontStyle","normal");
								else box.css("fontStyle","italic");
							}
							if(key === "datau" ){
								box.attr("datau",value[key]);
								if(value[key] == 0) box.css("textDecoration","none");
								else box.css("textDecoration","underline");	
							}
							if(key === "datacolor" ){
								box.attr("datacolor",value[key]);
								box.css("color",value[key]);
							}
							if(key === "dataalign" ){
								box.attr("dataalign",value[key]);
								box.css("textAlign",value[key]);
							}
							if(key === "datatop" ){
								box.attr("datatop",value[key]);
								draggable.css("position","absolute");
								draggable.css("top",value[key]);
							}
							if(key === "dataleft" ){
								box.attr("dataleft",value[key]);
								draggable.css("left",value[key])
							}
						}
						draggable.append(box);
						obj.append(draggable);
					});
				}
			});
		};
		/*****************************************************绑定box*****************************************************/
		tool.bindBox = function(){
			
			var boxs = $(".diy-box");
			var target = null;
			boxs.eq(tool.pointer[tool.pointer.length-1]).addClass("box-hover");
			boxs.mousedown(function(){
				boxs.removeClass("box-hover");
				$(this).addClass("box-hover");
				init();
				target = $(".box-hover").find(".box-content").parent().parent().attr("class");
			}).mouseup(function(){
				tool.bindEdit();
				tool._changeEvent(tool.saveEvent(target),null,"push",target);
			});
			boxs.attr("datatop",boxs.parent().attr("top"));
			boxs.attr("dataleft",boxs.parent().attr("left"));
		};
		/*****************************************************绑定edit*****************************************************/
		tool.bindEdit = function(current){

			var edit = $(".edit").find(".edit-contents");
			var current = $(".box-hover").find(".box-content");
			var btns = edit.find(".btn");
			var tabs = $(".edit").find(".edit-tabs li");
			var nav = $(".diy-title").find(".title-right li");
			var adds = $(".edit").find(".li-btns p");
			var target = current.parent().parent().attr("class");
			var txt_area = $(".li-areas").eq(0);
			var pic_area = $(".li-areas").eq(1);
			//current box
			current.attr("dataleft",current.parent().css("left"));
			current.attr("datatop",current.parent().css("top"));
			edit.find("#content").val(current.attr("datacontent").replace(/<br>/g,"\n").replace(/&nbsp;/g," "));
			edit.find("#family").val(current.attr("datafamily"));
			edit.find("#size").val(current.attr("datasize"));
			btns.removeClass("btn-hover");
			if(current.attr("datab")== 1)btns.eq(0).addClass("btn-hover");
			if(current.attr("datai")== 1)btns.eq(1).addClass("btn-hover");
			if(current.attr("datau")== 1)btns.eq(2).addClass("btn-hover");
			if(current.attr("dataalign")=== "left")btns.eq(3).addClass("btn-hover");
			else if(current.attr("dataalign")=== "center")btns.eq(4).addClass("btn-hover");
			else if(current.attr("dataalign")=== "right")btns.eq(5).addClass("btn-hover");	
			edit.find("#box-left").val(current.attr("dataleft"));
			edit.find("#box-top").val(current.attr("datatop"));
			edit.find("#fontcolor").val(current.attr("datacolor"));
			edit.find("#fontcolor").css("backgroundColor",current.attr("datacolor"));
			//edit box
			edit.find("#content").unbind("blur");
			edit.find("#content").blur(function(){
				var val = $(this).val();
				val = val.replace(/\n/g,"<br>").replace(/[ ]/g,"&nbsp;");
				current.attr("datacontent",val);
				current.html(val);
				tool._changeEvent(tool.saveEvent(target),null,"push",target);
			});
			edit.find("#family").unbind("change");
			edit.find("#family").change(function(){
				var val = $(this).val();
				current.attr("datafamily",val);
				current.css("fontFamily",val);
				tool._changeEvent(tool.saveEvent(target),null,"push",target);
			});
			edit.find("#size").unbind("change");
			edit.find("#size").change(function(){
				var val = $(this).val();
				current.attr("datasize",val);
				current.css("fontSize",val);
				tool._changeEvent(tool.saveEvent(target),null,"push",target);
			});
			edit.find("#color").unbind("change");
			edit.find("#color").change(function(){
				var val = $(this).val();
				current.attr("datacolor",val);
				current.css("color",val);
				tool._changeEvent(tool.saveEvent(target),null,"push",target);
			});
			edit.find("#box-left").unbind("blur");
			edit.find("#box-left").blur(function(){
				var val = $(this).val();
				current.attr("dataleft",val);
				current.parent().css("left",val);
				tool._changeEvent(tool.saveEvent(target),null,"push",target);
			});
			edit.find("#box-top").unbind("blur");
			edit.find("#box-top").blur(function(){
				var val = $(this).val();
				current.attr("datatop",val);
				current.parent().css("top",val);
				tool._changeEvent(tool.saveEvent(target),null,"push",target);
			});
			$("#fontcolor").unbind("change");
			$("#fontcolor").change(function(){
				var val = $(this).val();
				current.attr("datacolor",val);
				current.css("color",val);
				tool._changeEvent(tool.saveEvent(target),null,"push",target);
			});
			$("#bgcolor").unbind("change");
			$("#bgcolor").change(function(){
				var val = $(this).val();
				$(".diy-reverse").css("background",val);
				$(".diy-front").css("background",val);
				tool._changeEvent(tool.saveEvent(target),null,"push",target);
			});
			btns.each(function(i){
				$(this).unbind("click");
				$(this).click(function(){
					var hover = $(this).attr("class") == "btn btn-hover" ? true : false;
					if(i == 0){
						if(hover){
							$(this).removeClass("btn-hover");
							current.attr("datab",0);
							current.css("fontWeight","400");
						}else{
							$(this).addClass("btn-hover");
							current.attr("datab",1);
							current.css("fontWeight","800");
						}
					}
					if(i == 1){
						if(hover){
							$(this).removeClass("btn-hover");
							current.attr("datai",0);
							current.css("fontStyle","normal");
						}else{
							$(this).addClass("btn-hover");
							current.attr("datai",1);
							current.css("fontStyle","italic");
						}
					}
					if(i == 2){
						if(hover){
							$(this).removeClass("btn-hover");
							current.attr("datau",0);
							current.css("textDecoration","none");
						}else{
							$(this).addClass("btn-hover");
							current.attr("datau",1);
							current.css("textDecoration","underline");
						}
					}
					if(i == 3){
						 if(!hover){
							$(this).addClass("btn-hover");
							btns.eq(4).removeClass("btn-hover");
							btns.eq(5).removeClass("btn-hover");
							current.css("textAlign","left");
							current.attr("dataalign","left");
						}
					}
					if(i == 4){
						 if(!hover){
							$(this).addClass("btn-hover");
							btns.eq(3).removeClass("btn-hover");
							btns.eq(5).removeClass("btn-hover");
							current.css("textAlign","center");
							current.attr("dataalign","center");
						}
					}
					if(i == 5){
						 if(!hover){
							$(this).addClass("btn-hover");
							btns.eq(3).removeClass("btn-hover");
							btns.eq(4).removeClass("btn-hover");
							current.css("textAlign","right");
							current.attr("dataalign","right");
						}
					}
					if(i == 6){
						//初始化
						tool.initDiy();
					}
					tool._changeEvent(tool.saveEvent(target),null,"push",target);
				});
			});
			//tabs
			tabs.each(function(i){
				$(this).unbind("click");
				if(i==0){
					$(this).click(function(){
						tabs.removeClass("tabs-hover");
						$(".edit-contents ul:eq(0)").animate({"marginLeft":"0px"});
						$(this).addClass("tabs-hover");
					});	
				}if(i==1){
					$(this).click(function(){
						tabs.removeClass("tabs-hover");
						$(".edit-contents ul:eq(0)").animate({"marginLeft":"-460px"});
						$(this).addClass("tabs-hover");
					});	
				}
			});
			//nav
			nav.each(function(i){
				$(this).unbind("click");
				if(i==0){
					$(this).click(function(){
						//撤销
						var target = "";
						if(tool.events.length==0)
							return false;
						
						if(tool.events.length==1){
							target = tool.target[tool.target.length-1];
							tool._changeEvent(null,null,"pop",target);
							if(target == "diy-front"){
								var str = tool.events[tool.events.length-1];
								var str2 = tool.saveEvent("diy-reverse");
								tool.getData("diy-front",tool.no);
								tool.data2 = eval("("+str2+")");
								tool.initBox();
							}else if(target == "diy-reverse"){
								var str = tool.events[tool.events.length-1];
								var str2 = tool.saveEvent("diy-front");
								tool.getData("diy-reverse",tool.no);
								tool.data1 = eval("("+str2+")");	
								tool.initBox();
							}
						}
						
						//if(tool.events.length==1){
//							tool._changeEvent(null,null,"clear",target);
//							tool.initDiy();
//							return false;
//						}
						
						
						target = tool.target[tool.target.length-2];
						if(tool.target[tool.target.length-1] == tool.target[tool.target.length-2]){
							tool._changeEvent(null,null,"pop",target);
							if(target == "diy-front"){
								var str = tool.events[tool.events.length-1];
								var str2 = tool.saveEvent("diy-reverse");
								tool.data1 = eval("("+str+")");
								tool.data2 = eval("("+str2+")");
								tool.initBox();
							}else if(target == "diy-reverse"){
								var str = tool.events[tool.events.length-1];
								var str2 = tool.saveEvent("diy-front");
								tool.data2 = eval("("+str+")");
								tool.data1 = eval("("+str2+")");	
								tool.initBox();
							}
						}else{
							target = tool.target[tool.target.length-1];
							tool._changeEvent(null,null,"pop",target);
							if(target == "diy-front"){
								var flag = true;
								for(var t=tool.events.length-2;t>=0;t--){
									if(tool.target[t] == "diy-front"){
										flag = false;
										str2 = tool.events[t];
										break;
									}	
								}
								var str = tool.saveEvent("diy-reverse");
								tool.data2 = eval("("+str+")");
								
								if(flag)
									tool.getData("diy-front",tool.no);
								else
									tool.data1 = eval("("+str2+")");
								tool.initBox();
							}else if(target == "diy-reverse"){
								var flag = true;
								for(var t=tool.events.length-2;t>=0;t--){
									if(tool.target[t] == "diy-reverse"){
										flag = false;
										str2 = tool.events[t];
										break;
									}	
								}
								var str = tool.saveEvent("diy-front");
								tool.data1 = eval("("+str+")");
								
								if(flag)
									tool.getData("diy-reverse",tool.no);
								else
									tool.data2 = eval("("+str2+")");	
								tool.initBox();
							}
						}
					});
				}if(i==1){
					$(this).click(function(){
						var hand = tool.hand[tool.hand.length-1];
						if(tool.recycle.length==0)
							return false;
						if(tool.recycle.length==1){
							if(hand == "diy-front"){
								var str = tool.recycle[tool.recycle.length-1];
								var str2 = tool.saveEvent("diy-reverse");
								tool.data1 = eval("("+str+")");
								tool.data2 = eval("("+str2+")");
								tool.initBox();
							}else if(target == "diy-reverse"){
								var str = tool.recycle[tool.recycle.length-1];
								var str2 = tool.saveEvent("diy-front");
								tool.data2 = eval("("+str+")");
								tool.data1 = eval("("+str2+")");	
								tool.initBox();
							}
							tool._changeEvent(null,null,"recover",target);
						}else if(tool.recycle.length>1){
							if(tool.hand[tool.hand.length-1] == tool.hand[tool.hand.length-2]){					
								if(hand == "diy-front"){
									var str = tool.recycle[tool.recycle.length-1];
									var str2 = tool.saveEvent("diy-reverse");
									tool.data1 = eval("("+str+")");
									tool.data2 = eval("("+str2+")");
									tool.initBox();
								}else if(target == "diy-reverse"){
									var str = tool.recycle[tool.recycle.length-1];
									var str2 = tool.saveEvent("diy-front");
									tool.data2 = eval("("+str+")");
									tool.data1 = eval("("+str2+")");	
									tool.initBox();
								}
								tool._changeEvent(null,null,"recover",target);
							}else{
								if(hand == "diy-front"){
									var str = tool.recycle[tool.recycle.length-1];
									var str2 = tool.saveEvent("diy-reverse");
									tool.data1 = eval("("+str+")");
									tool.data2 = eval("("+str2+")");
									tool.initBox();
								}else if(hand == "diy-reverse"){
									var str = tool.recycle[tool.recycle.length-1];
									var str2 = tool.saveEvent("diy-front");
									tool.data2 = eval("("+str+")");
									tool.data1 = eval("("+str2+")");	
									tool.initBox();
								}
								tool._changeEvent(null,null,"recover",hand);
							}
						}
						
					});
				}if(i==2){
					$(this).click(function(){
						tool.initDiy(); 
					});
				}if(i==3){
					$(this).click(function(){
						//$(this).find("img").click();
					});
				}
			});
			adds.each(function(i){
				$(this).unbind("click");
				$(this).click(function(){
					adds.removeClass("p-hover");
					$(this).addClass("p-hover");
					$(".li-areas").css("display","none");
					$(".li-areas").eq(i).css("display","block");
				});	
			});
			$("#add-txt").unbind("click");
			$("#add-txt").click(function(){
				//txt_area
				var box = new Object();
				var target = txt_area.find("input[name=area-txt]:checked").val() == 0 ? "diy-front" : "diy-reverse";
				var content  = txt_area.find("textarea").val();
				box.target = target;
				box.content = content;
				box.family = "";
				box.size = "16px";
				box.b = 0;
				box.i = 0;
				box.u = 0;
				box.color = "#fff";
				box.align = "";
				box.top = "0";
				box.left = "0";
				tool.addBox(box);
			});
			$("#add-pic").unbind("click");
			$("#add-pic").click(function(){
				//pic_area
			});

		};
		/*****************************************************新增box*****************************************************/
		tool.addBox = function(box){
			var target = null;
			if(box.target == "diy-front") target = $(".diy-front");
			else if(box.target == "diy-reverse") target = $(".diy-reverse");
			else return false;
			var draggable = $("<div class='diy-box draggable'></div>");
			var _box = $("<div class='box-content'></div>");
			_box.attr("dataName",box.name);
			_box.attr("datacontent",box.content);
			_box.html(box.content);
			_box.attr("datafamily",box.family);
			_box.css("fontFamily",box.family);
			_box.attr("datasize",box.size);
			_box.css("fontSize",box.size);
			_box.attr("datab",box.b);
			if(box.weight == 0) _box.css("fontWeight","normal");
			else _box.css("fontWeight","800");
			_box.attr("datai",box.i);
			if(box.i == 0) _box.css("fontStyle","normal");
			else _box.css("fontStyle","italic");
			_box.attr("datau",box.u);
			if(box.u == 0) _box.css("textDecoration","none");
			else _box.css("textDecoration","underline");	
			_box.attr("datacolor",box.color);
			_box.css("color",box.color);
			_box.attr("dataalign",box.align);
			_box.css("textAlign",box.align);
			_box.attr("datatop",box.top);
			draggable.css("position","absolute");
			draggable.css("top",box.top);
			_box.attr("dataleft",box.left);
			draggable.css("left",box.left);
			//draggable.addClass("box-hover");
			draggable.append(_box);
			target.append(draggable);
			tool.initBind();
			//tool.pointer.push(tool.getPointer());
			return draggable;
		};
		/*****************************************************删除box*****************************************************/
		tool.delBox = function(id){
			$(".diy-box").eq(id).remove();
		};
		
		/*****************************************************改变事件链*****************************************************/
		tool._changeEvent = function(str,index,type,target){
			
			//返回所有事件的字符串，用“|||”隔开
			if(type == "all") return tool.events.join("|||");
			//删除最后一个事件（并放入回收站
			if(type == "pop"){
				tool.pointer.pop();
				tool.target.pop();
				tool.hand.push(target);
				return tool.recycle.push(tool.events.pop());	
			} 
			//添加事件到末尾
			if(type == "push"){
				tool.pointer.push(tool.getPointer());
				tool.target.push(target);
				return tool.events.push(str);	
			} 
			//倒序事件链
			if(type == "reverse"){
				return tool.events.reverse();	
			} 
			//删除第一个事件
			if(type == "shift"){
				tool.target.shift();
				return tool.events.shift();	
			} 
			//选择指定数组
			if(type == "slice"){
				return tool.events.slice(index,index);	
			}
			//在指定位置删除事件
			if(type == "delete"){
				tool.target.splice(index,1);	
				return tool.events.splice(index,1);	
			}
			//在指定位置添加事件
			if(type == "insert"){
				tool.target.splice(index,0,target);
				return tool.events.splice(index,0,str);
			}
			//在指定位置替换事件
			if(type == "insert"){
				tool.target.splice(index,1,target);
				return tool.events.splice(index,1,str);	
			}
			//在事件链首位添加事件
			if(type == "unshift"){
				tool.target.unshift(target);
				return tool.events.unshift(str);
			}
			//恢复事件链
			if(type == "recover"){
				tool.pointer.push(tool.getPointer());
				tool.target.push(target);
				tool.hand.pop();
				return tool.events.push(tool.recycle.pop());
			}
			//清空事件链
			if(type == "clear"){
				tool.events = new Array();
				tool.target = new Array();
				tool.recycle = new Array();
				tool.hand = new Array();
				tool.pointer = new Array();
				return false;
			}
	  
		};
		/*****************************************************获取指针*****************************************************/
		tool.getPointer = function(){
			var temp = 0;
			$(".box-content").each(function(i) {
                if($(this).parent().attr("class").indexOf("box-hover")!=-1) temp = i;	
            });
			return temp;
		};
		/*****************************************************保存事件*****************************************************/
		tool.saveEvent = function(type){
			var data = "";
			var _front = $(".diy-front");
			var _reverse = $(".diy-reverse");
			var f_box = _front.find(".diy-box");
			var r_box = _reverse.find(".diy-box");	
			var front_bg = _front.css("backgroundImage");
			var reverse_bg = _reverse.css("backgroundImage");
			front_bg = front_bg.substring(front_bg.indexOf('images/')+7,front_bg.indexOf('")'));
			reverse_bg = reverse_bg.substring(reverse_bg.indexOf('images/')+7,reverse_bg.indexOf('")'));
			if(front_bg =="" || front_bg ==null || front_bg==undefined) front_bg = _front.css("backgroundColor");
			if(reverse_bg =="" || reverse_bg ==null || reverse_bg==undefined) reverse_bg = _reverse.css("backgroundColor");
			
			if(type == "diy-front"){
				data +="{";
				f_box.each(function(i){
					var _this = $(this);
					var _box = $(this).find(".box-content");
					data +="'"+_box.attr("dataname")+"':[{'datacontent':'"+_box.html()+"','datafamily':'"+_box.attr("datafamily")+"','datasize':'"+_box.attr("datasize")+"','datab':"+_box.attr("datab")+",'datai':"+_box.attr("datai")+",'datau':"+_box.attr("datau")+",'datacolor':'"+_box.attr("datacolor")+"','dataalign':'"+_box.attr("dataalign")+"','datatop':'"+_box.attr("datatop")+"','dataleft':'"+_box.attr("dataleft")+"'}],";
				});	
				data += "'template':'";
				data += front_bg;
				data +="'}";
				return data;
			}else if(type == "diy-reverse"){
				data +="{";
				r_box.each(function(i){
					var _this = $(this);
					var _box = $(this).find(".box-content");
					data +="'"+_box.attr("dataname")+"':[{'datacontent':'"+_box.html()+"','datafamily':'"+_box.attr("datafamily")+"','datasize':'"+_box.attr("datasize")+"','datab':"+_box.attr("datab")+",'datai':"+_box.attr("datai")+",'datau':"+_box.attr("datau")+",'datacolor':'"+_box.attr("datacolor")+"','dataalign':'"+_box.attr("dataalign")+"','datatop':'"+_box.attr("datatop")+"','dataleft':'"+_box.attr("dataleft")+"'}],";
				});	
				data += "'template':'";
				data += reverse_bg;
				data +="'}";
				return data;
			}

			return null;
		};
		
		/*****************************************************拖拽参考线*****************************************************/
		tool.line = function(){
			$(".diy .diy-front").mousemove(function(e){
				var lineX = $(this).find(".lineX");
				var lineY = $(this).find(".lineY");
				lineX.show(0);lineY.show(0);
				var x = parseFloat(parseFloat(e.pageX) - $(this).offset().left) + "px";
				var y = parseFloat(parseFloat(e.pageY) - $(this).offset().top) + "px";
				lineX.css("top",y);
				lineY.css("left",x);
			}).mouseleave(function(e){
				var lineX = $(this).find(".lineX");
				var lineY = $(this).find(".lineY");
				lineX.hide(0);lineY.hide(0);
			});
			$(".diy .diy-reverse").mousemove(function(e){
				var lineX = $(this).find(".lineX");
				var lineY = $(this).find(".lineY")
				lineX.show(0);lineY.show(0);
				var x = parseFloat(parseFloat(e.pageX) - $(this).offset().left) + "px";
				var y = parseFloat(parseFloat(e.pageY) - $(this).offset().top) + "px";
				$(this).find(".lineX").css("top",y);
				$(this).find(".lineY").css("left",x);
			}).mouseleave(function(e){
				var lineX = $(this).find(".lineX");
				var lineY = $(this).find(".lineY")
				lineX.hide(0);lineY.hide(0);
			});
			tool.timer = setInterval("start()",75);
		};
		/*****************************************************切换模板*****************************************************/
		tool.template = function(){
			$("#thumbContainter img").unbind("click");
			$("#thumbContainter img").click(function(){
				tool.initDiy($(this).attr("data"));
				tool.events = new Array();tool.target = new Array();tool.recycle = new Array();tool.hand = new Array();tool.pointer = new Array();
			});
		};
		
		/*****************************************************清空事件*****************************************************/
		tool.clear = function(){
			$(".diy .diy-box").remove();
			$(".edit").find(".edit-contents").unbind();
			$(".box-hover").find(".box-content").unbind();
			$(".edit").find(".btn").unbind();
			$(".diy .diy-front").unbind();
			$(".diy .diy-reverse").unbind();
			$(".diy-box").unbind();
			$(".edit").find(".li-btns p").unbind();
			$(".edit").find(".li-areas input[type=button]").unbind();
			$("#thumbContainter img").unbind("click");
			tool.timer = clearInterval(tool.timer);
		};
		/*****************************************************初始化diy*****************************************************/
		tool.initDiy = function(no){
			tool.clear();
			tool.getData("diy-front",no);
			tool.getData("diy-reverse",no);
			tool.saveData();
			tool.loadBox(); 
			tool.bindBox();
			tool.bindEdit();
			tool.line();
			tool.template();
			init();
		};
		/*****************************************************初始化box*****************************************************/
		tool.initBox = function(){
			tool.clear();
			tool.saveData();
			tool.loadBox(); 
			tool.bindBox();
			tool.bindEdit();
			tool.line();
			tool.template();
			init();
		};
		/*****************************************************初始化Bind*****************************************************/
		tool.initBind = function(){
			$(".edit").find(".edit-contents").unbind();
			$(".edit").find(".btn").unbind();
			$(".edit").find(".li-btns p").unbind();
			$(".edit").find(".li-areas input[type=button]").unbind();
			tool.timer = clearInterval(tool.timer);
			tool.bindBox();
			tool.bindEdit();
			tool.line();
			init();
		};
		
		return tool;
	}