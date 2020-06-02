Vue.component('ticket-header', {
    props: ['title', 'back', 'back_url', 'home'],
    template: `<div class="wb100 h50px relative warpper-red" style="z-index: 99999;">
                    <div class="w50px h50px fl" v-if="back" @click="myBack(back_url)">
                        <div style="height: 18px; width:10px; float: left; margin-left: 15px; margin-top: 16px;" class="img-area"><img src="images/icon-back.png"></div>
                    </div>
                    <p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fwhite" style="top: 0; left: 0; right: 0; margin: 0 auto;">{{title}}</p>
                </div>`,
    methods: {
        myBack(url){
            if (base.isNull(url)) {
                window.history.go(-1);
            } else {
                window.location.href = url;
            }
        }
    }
})

Vue.component('ticket-pay', {
    props: ['show'],
    data(){
        return{
            user : {
                nickName : '',
                accountBalance : 0,
            },
            input:"",
            radio: '1',
            money : '',
            current: 0,
            moneys: [50,100,200,500]
        }
    },
    template: `
        <div class="wb100 pay" v-show="show == true">
        
        
        
        <div class="dialogBg" @click="rechargeCall('cancel')"></div>
        
        <div class="Fgray-3  fixed warpper-white wb80" style="margin:auto; left: 0; right: 0; bottom:0; top: 0; z-index: 99;height: 380px">
        
                
                
                <div class="pa15">
                    <p class="F14 h25px lh25px">充值账户：{{user.nickName}}</p>               
        
                    <p class="F14 h25px lh25px">账户余额：<span class="Fred">{{user.accountBalance}}</span></p>
        
                 <div class="clear h5px"></div>
              
                    <el-row :gutter="15">
                        <el-col :span="6" v-for="(item,key) in moneys">
                            <div class="wb100 h30px lh30px text-center F14 radius5" @click="selectMoney(key)" :class="key == current ? 'warpper-red Fwhite pa1' : 'bor-gray bor-solid-1a Fgray-3'">
                                {{item}}元
                            </div>
                        </el-col>
        
                    </el-row>
                    
                    <div class="clear1"></div>
        
                    <div class="wb100">
                        <el-input v-model="money" type="tel" placeholder="请输入金额"></el-input>                  
                    </div>
                                                                                        
                    <div class=" Fgray-3 F14 lh40px warpper-white">
                    <p>选择支付方式</p>
                    <div class="wb100">
                    <span class="fl h30px lh30px"> <img src="images/alipay.png" class="h30px fl mar5">支付宝 </span>
                    <el-radio class="radio fr " v-model="radio" label="1">&nbsp;</el-radio>
                    <div class="clear h5px bor-gray bor-solid-1b"></div>
                    <div class="clear1"></div>
                    <span class="fl h30px lh30px"> <img src="images/wxpay.png" class="h30px fl mar5">微信 </span>
                    <el-radio class="radio fr " v-model="radio" label="2">&nbsp;</el-radio>
                    <div class="clear"></div>
                    </div>
                    </div>
                    
                    <div class="clear1"></div>
                    
                    <div class="">
                        <div class="wb100 warpper-red Fwhite h45px lh45px text-center radius5 F16" @click="recharge">
                            立即充值
                        </div>
                    </div>
            </div>
        
        </div>

    </div>`,
    methods: {

        selectMoney(key){
            this.current = key;
        },

        rechargeCall(val){
            this.$emit('callback',val);
        },

        recharge(){

            let _this = this;

            let userInfo = window.sessionStorage.getItem("userInfo");
            _this.user = JSON.parse(userInfo);

            baseAjax.recharge(function(data){
                if(data){

                    //判断档位

                    let _money = _this.moneys[_this.current];

                    let user = window.sessionStorage.getItem('userInfo');

                    user = JSON.parse(user);

                    user.accountBalance += _money;

                    window.sessionStorage.setItem('userInfo',JSON.stringify(user));

                    _this.$emit('callback','success');
                }
            })
        }
    }

})

Vue.component('ticket-login', {
    props: ['show'],
    data(){
        return{
            mobile : "",
            code : "",
            resultCode : "123456",
            call : "",
            codeText : "获取验证码",
            timeID : 0,
            timer : 60,
            lock : true,
        }
    },
    template: `<div class="wb100" v-show="show == true">
                    
        <div class="dialogBg" @click="loginCall('cancel')"></div>
                
        <div class="Fgray-3 h240px fixed warpper-white wb80" style="margin:auto; left: 0; right: 0; bottom:0; top: 0; z-index: 99;">

                <div class="wb100 h45px lh45px F18 relative warpper-red text-center Fwhite">登录</div>
                
                <div class="pal15 par15 relative F14">
                    <div style="padding-left: 60px;">
                        <div class="w50px absolute" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                            手机号
                        </div>
                        <input type="tel" class="bor-none wb100 h45px lh45px phone-num" v-model="mobile" placeholder="输入手机号" @change="phone" data-role="none">
                    </div>
                </div>
                
                <div class="pal15 par15 relative F14">
                    <div style="padding-left: 60px;">
                        <div class="w50px absolute" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                            验证码
                        </div>
                        <input type="tel" class="bor-none wb50 h45px lh45px fl code-num" v-model="code" placeholder="输入验证码" data-role="none">
                        <input type="button" data-role="none" class="warpper-none bor-none h45px lh45px wb45 fr code-btn" v-bind:class="lock ? 'Fgray-2' : 'Fblue'" :disabled="lock" @click="sendCode" :value="codeText">
                    </div>
                </div>
                    
                <div class="clear h40px"></div>
                
                <div class="pal15 par15">
                    <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5 btn-login" :class="mobile.length>0 && code.length>0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="login">立即登录</div>
                </div>
                
            </div>
            
        </div>`,
    methods: {

        loginCall(val){
            this.$emit('callback',val);
        },

        sendCode(){

            let _this = this;

            if(this.lock){
                return false;
            }else{
                this.lock = true;
                baseAjax.sendLoginInCode(_this.mobile, 0, function (data) {
                    if(data){
                        _this.resultCode = data.returnJSON;
                        _this.code = data.returnJSON;
                        _this.timeID = setInterval(_this.clock,1000);
                    }
                })

            }
        },
        phone(e){

            if(e.target.value.length == 11)
                this.lock = false;
            else
                this.lock = true;

        },
        clock(){
            this.timer -- ;
            this.codeText = this.timer+"秒后重发";

            if(this.timer <= 0){
                clearInterval(this.timeID);
                this.timer = 60;
                this.codeText = "重发验证码";
            }
        },
        login(){

            let _this = this;

            if(_this.resultCode == _this.code){
                _this.$emit('callback',{
                    state : 'success',
                    msg : '登录成功',
                    data : {
                        code : _this.code
                    }
                });
            }else{
                _this.$emit('callback',{
                    state : 'error',
                    msg : '验证码错误',
                    data : {}
                });
                _this.$message({
                    type: 'error',
                    message: '验证码错误'
                });
            }

            baseAjax.phoneLoginIn(_this.mobile, _this.code, function(data){
                if(data){
                    let _user = data.returnJSON;
                    window.sessionStorage.setItem('userInfo',JSON.stringify(_user));
                    _this.$emit('callback','success');
                }
            })
        }
    }

})


Vue.component('ticket-input-code', {
    props: ['input_name','code_name','btn_name','show','ajax_type'],
    data(){
        return{
            mobile : "",
            code : "",
            resultCode : "123456",
            call : "",
            codeText : "获取验证码",
            timeID : 0,
            timer : 60,
            lock : true,
        }
    },
    template: `
        <div class="Fgray-3 wb100" v-if="show">
                
            <div class="pal15 par15 relative F14 warpper-white">
                <div style="padding-left: 60px;">
                    <div class="w50px absolute" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                        {{input_name}}
                    </div>
                    <input type="tel" class="bor-none wb100 h45px lh45px phone-num" v-model="mobile" :placeholder="'输入'+input_name" @change="phone" data-role="none">
                </div>
                <div class="clear"></div>
            </div>
            
            <div class="pal15">
                <div class="clear bor-gray bor-solid-1b"></div>
            </div>
            
            <div class="pal15 par15 relative F14 warpper-white">
                <div style="padding-left: 60px;">
                    <div class="w50px absolute" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                        {{code_name}}
                    </div>
                    <input type="tel" class="bor-none wb50 h45px lh45px fl code-num" v-model="code" :placeholder="'输入'+code_name" data-role="none">
                    <input type="button" data-role="none" class="warpper-none bor-none h45px lh45px wb45 fr code-btn" v-bind:class="lock ? 'Fgray-2' : 'Fblue'" :disabled="lock" @click="sendCode" :value="codeText">
                </div>
                <div class="clear"></div>
            </div>
                
            <div class="clear1"></div>
            <div class="clear1"></div>
            <div class="clear1"></div>
            <div class="pa15">
                <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5 btn-login" :class="mobile.length>0 && code.length>0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="checkBtn">{{btn_name}}</div>
            </div>
             
            <div class="clear1"></div>
       
        </div>`,
    methods: {

        sendCode(){

            let _this = this;

            if(this.lock){
                return false;
            }else{
                this.lock = true;
                baseAjax.sendLoginInCode(_this.mobile, 0, function (data) {
                    if(data){
                        _this.resultCode = data.returnJSON;
                        _this.code = data.returnJSON;
                        _this.timeID = setInterval(_this.clock,1000);
                    }
                })

            }
        },
        phone(e){

            if(e.target.value.length == 11)
                this.lock = false;
            else
                this.lock = true;

        },
        clock(){
            this.timer -- ;
            this.codeText = this.timer+"秒后重发";

            if(this.timer <= 0){
                clearInterval(this.timeID);
                this.timer = 60;
                this.codeText = "重发验证码";
            }
        },
        checkBtn(){
            let _this = this;

            if(_this.resultCode == _this.code){

                //无类型
                if(base.isNull(_this.ajax_type)){
                    _this.$emit('callback',{
                        state : 'success',
                        msg : '',
                        data : {
                            code : _this.code
                        }
                    });
                }else{
                    //登录
                    if(_this.ajax_type == 'login'){
                        baseAjax.phoneLoginIn(_this.mobile, _this.code, function(data){
                            if(data){
                                let _user = data.returnJSON;
                                window.sessionStorage.setItem('userInfo',JSON.stringify(_user));
                                _this.$emit('callback',{
                                    state : 'success',
                                    msg : '登录成功',
                                    data : {}
                                });
                            }
                        })
                    }
                    //绑定手机号
                    if(_this.ajax_type == 'bind_mobile'){
                        baseAjax.bindMobilePhone(_this.mobile, _this.code, function(data){
                            if(data){
                                _this.$emit('callback',{
                                    state : 'success',
                                    msg : '绑定手机号成功',
                                    data : {}
                                });
                            }else{
                                _this.$emit('callback',{
                                    state : 'error',
                                    msg : data.message,
                                    data : {}
                                });
                            }
                        })
                    }

                    //更改绑定的手机号
                    if(_this.ajax_type == 'update_mobile'){
                        baseAjax.smsUpPhoneCode( _this.code, function(data){
                            if(data){
                                _this.$emit('callback',{
                                    state : 'success',
                                    msg : '更改手机号成功',
                                    data : {}
                                });
                            }else{
                                _this.$emit('callback',{
                                    state : 'error',
                                    msg : data.message,
                                    data : {}
                                });
                            }
                        })
                    }

                }

            }else{
                _this.$emit('callback',{
                    state : 'error',
                    msg : '验证码错误',
                    data : {}
                });
                _this.$message({
                    type: 'error',
                    message: '验证码错误'
                });
            }
            //取消
            //_this.$emit('callback','cancel');
        }
    }

})

Vue.component('ticket-footer', {
    props: ['active'],
    data(){
        return{

        }
    },
    template: `<div class="wb100">
        <div class="clear h70px"></div>
       <div class="wb100 fixed pat10 pab10 warpper-white bor-gray bor-solid-1t" style="bottom: 0;">        
       <a href="index.html">
       <div class="wb33333 fl text-center">
            <img src="images/icon-main1.png" v-if="active != 1" class="h25px">
            <img src="images/icon-main-active.png" v-if="active == 1" class="h25px">
            <p class="F12 lh20px" :class="active == 1 ? 'Fred ' : 'Fgray-3'">购彩大厅</p>
        </div>
        </a>
         <a href="notice.html">
        <div class="wb33333 fl text-center">
            <img src="images/icon-main2.png" v-if="active != 2" class="h25px">
            <img src="images/icon-main2-active.png" v-if="active == 2" class="h25px">
            <p class="F12 lh20px" :class="active == 2 ? 'Fred ' : 'Fgray-3'">开奖公告</p>
        </div>
        </a>
        <a href="user.html">
        <div class="wb33333 fl text-center">
            <img src="images/icon-main3.png" v-if="active != 3" class="h25px">
            <img src="images/icon-main3-active.png" v-if="active == 3" class="h25px">
            <p class="F12 lh20px" :class="active == 3 ? 'Fred ' : 'Fgray-3'">我的彩票</p>
        </div>
        </a>
        <div class="clear"></div>
    </div>
</div>`,
    methods: {

    }

})

Vue.component('ticket-notice', {
    props: ['lottery_type'],
    data(){
        return{
            notices : [],
            page : 1,
            pageSize : 20,
            loading : true,
            width : 0,
            _width : 0,
            _width2 : 0,
            height : 0,
            _height : 0,
            width_ball : 0,
        }
    },
    template: `<div class="wb100">

            <div class="pal15" v-loading.body="loading">

                <template v-for="item in notices">

                    <div class="clear1"></div>
                    <p class="h20px lh20px Fgray-2 F14">第{{item.number}}期 | {{item.officialStopTime}}</p>
                    <div class="clear1"></div>
                    <div class="wb100" v-if="lottery_type=='ssq' ||lottery_type=='dlt'">

                        <template v-for="(item2,key2) in item.balls">
                            <div class="Fwhite radius50per text-center fl mar10" v-if="item.lotteryType=='ssq'" :class="item2.type == 'red' ? 'warpper-red' : 'warpper-blue'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                                {{item2.num}}
                            </div>
                            <div class="Fwhite radius50per text-center fl mar10" :class="item2.type == 'red' ? 'warpper-red' : 'warpper-blue'" v-if="item.lotteryType=='dlt'" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                                {{item2.num}}
                            </div>
                        </template>
                        <!--<div class="fr" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
                            <!--<img src="images/arrow-down.png" class="fr mar15" :style="'height:'+ (width_ball/2) +'px; margin-top: '+ (width_ball/4) +'px;'">-->
                        <!--</div>-->
                        <div class="clear"></div>
                    </div>

                    <div class="wb100" v-if="lottery_type=='dlc' || lottery_type=='D11'">
                        <template v-for="(item2,key2) in item.balls">
                            <div class="Fwhite radius50per text-center fl mar10 warpper-red" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                                {{item2.num}}
                            </div>
                        </template>
                        <!--<div class="fr" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
                            <!--<img src="images/arrow-down.png" class="fr mar15" :style="'height:'+ (width_ball/2) +'px; margin-top: '+ (width_ball/4) +'px;'">-->
                        <!--</div>-->
                        <div class="clear"></div>
                    </div>

                    <div class="wb100" v-if="lottery_type=='JXK3'">
                        <div class="warpper-green fl pal20 radius20 par10">
                            <template v-for="(item2,key2) in item.balls">
                                <div class="fl mar10 mat5" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">
                                    <img :src="'images/sz_'+item2+'.png'" :style="'width:'+ (width_ball-5) +'px; height:'+(width_ball-5)+'px;'">
                                </div>
                            </template>
                        </div>
                        
                        <div class="fl w80px lh40px h40px mal20 F16 Fgray-3">
                                和值：<span class="Fred">{{item.sum}}</span>
                        </div>
                        
                        <!--<div class="fr" :style="'width:'+width_ball+'px; height:'+width_ball+'px; line-height: '+width_ball+'px;'">-->
                            <!--<img src="images/arrow-down.png" class="fr mar15" :style="'height:'+ (width_ball/2) +'px; margin-top: '+ (width_ball/4) +'px;'">-->
                        <!--</div>-->
                        <div class="clear"></div>
                    </div>

                    <div class="clear1 bor-gray bor-solid-1b"></div>

                </template>

            </div>

            <div class="clear1"></div>


        </div>`,
    methods: {
        getData(){

            let _this = this;

            // console.log('getData');

            baseAjax.openAwardListByLotteryType(_this.lottery_type, _this.page, _this.pageSize, function(data){
                if(data){

                    let _tmp = data.returnJSON.indexData;

                    // console.log(_tmp);

                    for(let i=0; i<_tmp.length; i++){

                        if(_tmp[i].lotteryType == 'ssq'){
                            //双色球
                            let _bonus = _tmp[i].bonusCode;
                            let reds = _bonus.split('#')[0].split(',');
                            let blue = _bonus.split('#')[1];

                            let _balls = [];

                            for(let i=0; i<reds.length; i++){
                                _balls.push({
                                    type : 'red',
                                    num : reds[i]
                                })
                            }
                            _balls.push({
                                type : 'blue',
                                num : blue
                            })

                            _tmp[i].balls = _balls;

                        }
                        if(_tmp[i].lotteryType == 'dlt'){
                            //大乐透
                            let _bonus = _tmp[i].bonusCode;

                            let reds = _bonus.split('#')[0].split(',');
                            let blue = _bonus.split('#')[1].split(',');;

                            let _balls = [];

                            for(let i=0; i<reds.length; i++){
                                _balls.push({
                                    type : 'red',
                                    num : reds[i]
                                })
                            }
                            _balls.push({
                                type : 'blue',
                                num : blue[0]
                            })
                            _balls.push({
                                type : 'blue',
                                num : blue[1]
                            })

                            _tmp[i].balls = _balls;

                        }
                        if(_tmp[i].lotteryType == 'D11'){
                            //11选5
                            let _bonus = _tmp[i].bonusCode;
                            let reds = _bonus.split(',');
                            let _balls = [];
                            for(let i=0; i<reds.length; i++){
                                _balls.push({
                                    type : 'red',
                                    num : reds[i]
                                })
                            }
                            _tmp[i].balls = _balls;
                        }
                        if(_tmp[i].lotteryType == 'JXK3'){
                            //快三
                            let _balls = _tmp[i].bonusCode.split(',');

                            let _sum = 0;

                            for(let i=0; i<_balls.length; i++){
                                _sum += parseInt(_balls[i]);
                            }

                            _tmp[i].sum = _sum;

                            _tmp[i].balls = _balls;

                        }
                    }

                    _this.loading = false;

                    _this.notices = _tmp;

                }
            })
        },
    },
    created(){

        let _this = this;

        _this.width = $(window).width();
        _this.height = $(window).height();
        _this._width = parseInt($(window).width());
        _this._width2 = parseInt($(window).width());
        _this._height = parseInt((_this._width + 30) * 160 / 375);

        _this.width_ball = Math.floor((_this.width - 7 * 12 - 35) / 7);
        _this.getData();
    }

})


Vue.component('ticket-rule', {
    props: ['lottery'],
    data(){
        return{
            tableData : [],
        }
    },
    template: `<div class="wb100 Fgray-3 F14">
         <div class="pa15" >
         <div class="wb100" v-if="lottery == 1">
         <p class="lh30px">开奖时间：10分钟一期，每天84期</p>
         <p class="lh30px">玩法规则：每期开出3个号作为开奖号码，数字取值范围1-6</p>
     
         </div>
         
         <div class="wb100" v-if="lottery == 2">
         <p class="lh30px">开奖时间：10分钟开奖，每天97期</p>
         <p class="lh30px">玩法规则：每期从01-11开出5个号码作为中奖号码</p>
      
         </div>
        
         <div class="wb100" v-if="lottery == 3">
         <p class="lh30px">开奖时间：每周二、四、日21:30开奖</p>
         <p class="lh30px">玩法规则：<span class="Fred">6个红球</span>＋<span class="Fblue">1个蓝球</span>=1注（<span class="Fred">2元</span>）</p>
         </div>
        
         <div class="wb100" v-if="lottery == 4">
         <p class="lh30px">开奖时间：每周二、四、日21:30开奖</p>
         <p class="lh30px">玩法规则：<span class="Fred">5个前区</span>＋<span class="Fblue">2个后区</span>=1注（<span class="Fred">2元</span>）</p>
         </div>
         
         <p class="lh30px">奖项设置:</p>
        
         <div class="clear1"></div>
 
         <div class="wb100" v-if="lottery == 1 || lottery == 2">
         <el-table :data="tableData" border style="width: 100%">
         <el-table-column prop="method" label="玩法" align="center" width="80">
         </el-table-column>
         <el-table-column prop="condition" label="中奖条件" align="center" >
         </el-table-column>
         <el-table-column prop="bonus" label="奖金(元)" align="center" width="80">
         </el-table-column>
         </el-table>
         </div>
         
         <div class="wb100" v-if="lottery == 3 || lottery == 4">
         <el-table :data="tableData" border style="width: 100%">
         <el-table-column prop="method" label="玩法" align="center"  width="70">
         </el-table-column>
         <el-table-column prop="" label="中奖条件" align="center" >
         <template scope="scope">
         
         <img :src="scope.row.condition" class="wb90 pat5 pab5" v-if="scope.row.condition=='images/ssq_rule1.png'">
         <img :src="scope.row.condition" class="wb75 pat5 pab5" v-if="scope.row.condition=='images/ssq_rule2.png'">
         <img :src="scope.row.condition" class="wb80 pat5 pab5" v-if="scope.row.condition=='images/ssq_rule3.png'">
         <img :src="scope.row.condition" class="wb75 pat5 pab5" v-if="scope.row.condition=='images/ssq_rule4.png'">
         <img :src="scope.row.condition" class="wb60 pat5 pab5" v-if="scope.row.condition=='images/ssq_rule5.png'">
         <img :src="scope.row.condition" class="wb40 pat5 pab5" v-if="scope.row.condition=='images/ssq_rule6.png'">
         
         <img :src="scope.row.condition" class="wb95 pat5 pab5" v-if="scope.row.condition=='images/dlt_rule1.png'">
         <img :src="scope.row.condition" class="wb85 pat5 pab5" v-if="scope.row.condition=='images/dlt_rule2.png'">
         <img :src="scope.row.condition" class="wb90 pat5 pab5" v-if="scope.row.condition=='images/dlt_rule3.png'">
         <img :src="scope.row.condition" class="wb80 pat5 pab5" v-if="scope.row.condition=='images/dlt_rule4.png'">
         <img :src="scope.row.condition" class="wb65 pat5 pab5" v-if="scope.row.condition=='images/dlt_rule5.png'">
         <img :src="scope.row.condition" class="wb45 pat5 pab5" v-if="scope.row.condition=='images/dlt_rule6.png'">
         
         
         
          </template>
          </el-table-column>
          <el-table-column prop="explain" label="中奖说明" align="center" >
          <template scope="scope">
          <p>{{scope.row.explain}}</p>
          <p v-if="scope.row.explain2">{{scope.row.explain2}}</p>
          <p v-if="scope.row.explain3">{{scope.row.explain3}}</p>
          <p v-if="scope.row.explain4">{{scope.row.explain4}}</p>
          
          </template>
         </el-table-column>
         </el-table-column>
         <el-table-column prop="bonus" label="奖金(元)" align="center" width="70">
         </el-table-column>
         </el-table>
         </div>
         
         </div>
 
     
</div>`,
    methods: {

    },
    created(){
        let _this = this;

        if( _this.lottery == 1){
            _this.tableData = [{
               method: '和值',
               condition: '开奖号码之和',
               bonus: '9-240'
           }, {
               method: '二不同号',
               condition: '不定位中2个号码',
               bonus: '8'
           }, {
               method: '二同号单选',
               condition: '中开奖号码',
               bonus: '80'
           }, {
               method: '二同号复选',
               condition: '中开奖号码中的对子',
               bonus: '15'
           }, {
               method: '三不同号',
               condition: '中开奖号码',
               bonus: '40'
           }, {
               method: '三同号单选',
               condition: '中开奖号码',
               bonus: '240'
           }, {
               method: '三同号通选',
               condition: '中开奖号码三同号中任一组',
               bonus: '40'
           }, {
               method: '三连号通选',
               condition: '中开奖号码三连号中任一组',
               bonus: '10'
           }];
        }
        if( _this.lottery == 2){
            _this.tableData = [{
                method: '任选二',
                condition: '选2个号，猜中开奖任意2个号',
                bonus: '6'
            }, {
                method: '任选三',
                condition: '选3个号，猜中开奖任意3个号',
                bonus: '19'
            }, {
                method: '任选四',
                condition: '选4个号，猜中开奖任意4个号',
                bonus: '78'
            }, {
                method: '任选五',
                condition: '选5个号，猜中开奖任意5个号',
                bonus: '540'
            }, {
                method: '任选六',
                condition: '选6个号，猜中开奖任意5个号',
                bonus: '90'
            }, {
                method: '任选七',
                condition: '选7个号，猜中开奖任意5个号',
                bonus: '26'
            }, {
                method: '任选八',
                condition: '选8个号，猜中开奖任意5个号',
                bonus: '9'
            }, {
                method: '前一',
                condition: '选1个号,猜中开奖第1个号',
                bonus: '13'
            }, {
                method: '前二直选',
                condition: '选2个号与开奖前2个号相同且顺序一致',
                bonus: '130'
            }, {
                method: '前二组选',
                condition: '选2个号与开奖前2个号相同',
                bonus: '65'
            }, {
                method: '前三直选',
                condition: '选3个号与开奖前3个号相同且顺序一致',
                bonus: '1170'
            }, {
                method: '前三组选',
                condition: '选3个号与开奖前3个号相同',
                bonus: '195'
            }];
        }

        if( _this.lottery == 3){
            _this.tableData = [{
                method: '一等奖',
                condition: 'images/ssq_rule1.png',
                explain:'中6红＋1蓝',
                bonus: '浮动'
            }, {
                method: '二等奖',
                condition: 'images/ssq_rule2.png',
                explain:'中6红',
                bonus: '浮动'
            }, {
                method: '三等奖',
                condition: 'images/ssq_rule3.png',
                explain:'中5红＋1蓝',
                bonus: '3000'
            }, {
                method: '四等奖',
                condition: 'images/ssq_rule4.png',
                explain:'中5红',
                explain2:'中4红＋1蓝',
                bonus: '200'
            }, {
                method: '五等奖',
                condition: 'images/ssq_rule5.png',
                explain:'中4红',
                explain2:'中3红＋1蓝',
                bonus: '10'
            }, {
                method: '六等奖',
                condition: 'images/ssq_rule6.png',
                explain:'中2红＋1蓝',
                explain2:'中1红＋1蓝',
                explain3:'中1蓝',
                bonus: '5'
            }];
        }

        if( _this.lottery == 4){
            _this.tableData = [{
                method: '一等奖',
                condition: 'images/dlt_rule1.png',
                explain:'中5前＋2后',
                bonus: '浮动'
            }, {
                method: '二等奖',
                condition: 'images/dlt_rule2.png',
                explain:'中5前＋1后',
                bonus: '浮动'
            }, {
                method: '三等奖',
                condition: 'images/dlt_rule3.png',
                explain:'中5前',
                explain2:'中4前＋2后',
                bonus: '浮动'
            }, {
                method: '四等奖',
                condition: 'images/dlt_rule4.png',
                explain:'中4前＋1后',
                explain2:'中3前＋2后',
                bonus: '200'
            }, {
                method: '五等奖',
                condition: 'images/dlt_rule5.png',
                explain:'中4前',
                explain2:'中3前＋1后',
                explain3:'中2前＋2后',
                bonus: '10'
            }, {
                method: '六等奖',
                condition: 'images/dlt_rule6.png',
                explain:'中3前',
                explain2:'中1前＋2后',
                explain3:'中2前＋1后',
                explain4:'中2后',
                bonus: '5'
            }];
        }

    }

})


Vue.component('ticket-agreement', {
    props: ['show'],
    data(){
        return{
            _width: 0,
            _height: 0,
            contents: `<div class="F15 lh25px">
<p class="text-center">彩票通服务协议</p>
<p>2016年06月16日</p>
<p>一、相关定义</p>
<p>1、用户：指在彩票通注册登记，并得到彩票通在线认可，有资格享受彩票通服务的注册会员。</p>
<p>2、代购：指用户以注册的用户名单独委托购买某彩种，用户对所购买的彩票拥有完整的奖金获得权利。</p>
<p>3、合买：指不同的用户合作购买某彩种，各用户按购买金额按份额拥有所购买彩票的奖金获得权利。</p>
<p>4、预付款账户：指用户按彩票通的要求，在网站上设立的账户，专门用于存放预付款。</p>
<p>5、预付款：指用户存放在预付款账户中的款项，专门用于委托彩票通购买用户指定的彩票，以及彩票通提供的其他服务和产品。</p>
<p>6、用户资料：指用户在注册时提供的个人信息，包括但不限于：用户名、注册账户密码、银行卡账户及密码、用户真实姓名、身份证号码等。</p>
<p>二、本协议服务范围</p>
<p>本协议服务范围包括：提供代购和合买平台；提供彩票相关资讯；提供彩票信息交互平台；提供在线预付支付结算服务。</p>
<p>三、用户的权利</p>
<p>1、账户管理权。用户有权随时查询用户资料，并可对用户名、用户真实姓名、身份证号码以外的信息进行修改。</p>
<p>2、免费使用权。用户有权免费使用彩票通的彩票投注委托系统以及免费获得彩票资讯。</p>
<p>3、彩票查询权。用户通过彩票通委托彩票代购、合买成功后，有权免费在彩票通查询所代购、合买彩票的状态。</p>
<p>4、奖金获得权。用户通过彩票通委托代购、合买彩票成功的，若彩票中奖，用户有权获得相应奖金。</p>
<p>5、预付款账户核查权。用户可以随时对预付款账户进行资金余额核查。</p>
<p>6、申请提款权。用户在任何时间都可对自己的预付款余额申请提款，彩票通在核对用户资金来源正常的情况下，在收到提款请求3个工作日内将用户预付款中需提取的款项转账到用户注册的银行账户上。用户提款转账所产生的银行费用由用户承担。
<p>四、用户的义务</p>
<p>1、全面遵守本协议的义务。在注册登记成为彩票通用户之前，须认真阅读、理解本协议各条款，一经注册成功即视为同意本协议全部条款。
<p>2、如实提供用户资料义务。为保障用户的合法权益，避免在中奖时出现用户注册资料与真实情况不符导致兑奖不能等情况，请用户按照真实、全面、准确的原则提供用户资料。因用户资料不真实、不全面、不准确造成不能兑奖、不能提款、不能注销等情况，由用户承担全部责任。
<p>3、对应注册义务。一个用户名、一个身份证号、一个用户的真实姓名只能有效注册一次，且三者之间必须一一对应。严禁任何形式的重复注册及多次恶意注册，因此而造成的一切后果，由用户自行承担。 同时，为保证用户操作预付款账户的安全性，用户应以一个银行卡账户对应一个用户真实姓名名，因银行卡账户与用户真实姓名不能一一对应而产生的不利后果，由用户自行承担。
<p>4、保持用户名义务。为保护用户账户和预付款账户的安全性，用户名、用户真实姓名、身份证号码一经注册确认后，不得再行更改。
<p>5、保护账户资料义务。用户账户资料包括用户密码、个人账户以及用户账户操作所需的资料。用户务必对其账户资料自行保密，以免账户资料被盗用或篡改。因用户保护不周导致账户资料被盗用或篡改而给用户造成的任何损失及法律责任由用户自行承担。
<p>6、遵守网络安全管理的义务。用户不得利用彩票通危害国家安全及侵犯公民的合法权益，不得利用彩票通制作、复制和传播法规规定的有害信息。
<p>7、承担银行费用的义务。在申请提取预付款或因合同终止返还预付款的情况下，款项从预付款账户转账至用户银行卡的银行费用由用户承担。
<p>五、彩票通的权利</p>
<p>1、管理用户账户的权利。如果用户提供的资料包含有第四条第3款多次恶意注册信息或第6款所列信息，彩票通保留注销其用户账户或者限制其使用全部或部分服务内容的权利。一经发现用户利用彩票通制作、复制和传播的信息明显属于第三条第6款所列信息之一的，彩票通将立即采取屏蔽信息、发出警告、直至关闭用户账户等措施。彩票通将保存有关记录，并向国家有关机关报告，用户的的系统记录将作为用户违反法律法规的证据。
<p>2、修改本协议条款的权利。彩票通有权在必要时修改协议条款，协议条款一旦发生变动，将会在彩票通相关页面上提示或公告修改内容。如果不同意所改动的内容，用户可以主动取消获得的服务或注销用户身份。如果用户继续享用服务，则视为接受服务条款的变动。彩票通保留随时修改或中断服务而不需知会用户的权利。主要包括以下情况：
<p>（1）增加或减少彩票品种。彩票通代购和合买的彩票品种以当期可以实现购买的品种为准，长期或临时增加或减少彩票品种均不需事先告知用户。
<p>（2）调整彩票销售截止时间的权利。彩票通代购和合买服务截止时间一般为当期官方彩票销售截止时间前2小时，彩票通有权根据彩票种类和当期销售情况调整彩票销售截止时间，而不需事先告知用户。
<p>3、以预付款代购彩票的权利和义务。在用户向彩票通提出代购请求后，彩票通有权从其预付款账户提取请求代购所需的款项金额，代为向彩票发行和销售机构申购用户指定的彩票。
<p>4、代为兑奖、领取奖金、分配奖金的权利和义务。在彩票中奖情况下，由彩票通负责代理兑奖、领取奖金事宜，并在开奖后的3个工作日内把税后奖金按比例进行分配，直接汇入中奖用户之预付款账户。
<p>5、制止恶意提款或转账的权利。彩票通有权拒绝预付款账户资金通过彩票通提现或转至其他非注册银行账户的行为，一旦发现恶意提现或转账行为，彩票通有权制止并将款项退回原账户。
<p>6、制止未满18周岁的未成年人购买彩票的权利。</p>
<p>六、彩票通的义务</p>
<p>1、用户账户资料保护义务。彩票通对用户账户资料提供最大限度的安全保护。当彩票通用户涉嫌盗用他人第三方支付渠道（如：银联、财付通、支付宝等）账户资金，或涉嫌其第三方支付渠道账户被盗用的，应涉嫌被盗用人或第三方支付公司的要求，在其承诺仅将用户资料用于涉嫌盗用事件并予以保密的前提下，彩票通将向请求方提供涉嫌盗用人的用户资料。彩票通用户同意放弃在此情况下向彩票通追究任何责任的权利。</p>
<p>2、公布中奖情况的义务。在官方彩票发行和销售机构发布中奖结果后七个工作日内，彩票通在网站中公布中奖号码及奖金分配情况，并以官方彩票发行机构和销售机构公布的中奖情况为准。</p>
<p>3、提供预付款对账单的义务。在网站上向用户提供预付款对账单。</p>
<p>4、预付款转账义务。用户在任何时间都可对自己的预付款余额申请提款，彩票通在核对用户资金来源正常的情况下，在收到提款请求3个工作日内将用户预付款中需提取的款项转账到用户注册的银行账户上。</p>
<p>七、大额奖金税票开具</p>
<p>用户在彩票通代购或合买彩票获得中心兑奖的大额奖金的，由彩票通代为兑奖。根据各彩票中心与彩票通的协议，奖金税票只能开具至在各彩票中心备案的彩票通兑奖人员名下，而无法直接开具至具体获奖人名下。彩票通可出具公函为获奖人提供奖金来源证明。</p>
<p>八、协议成立、变更和终止</p>
<p>1、因网络故障、超过指定购买时间、预付款金额不足等原因，未能完成代购出票的，视为本次代购或合买委托未成立。彩票通与用户取得联系后，以双方确认的方式，返还预付资金。</p>
<p>2、彩票通有权对本协议条款进行变更而无需事先通知用户。</p>
<p>3、任何一方未能履行本协议规定的任何义务，且在收到另一方发出更正通知15日内未能改正错误的，均被视为自动放弃本协议，协议同时终止。</p>
<p>九、违约责任</p>
<p>1、任何一方未能履行本协议规定的任何义务，且在收到另一方发出更正通知15日内未能改正错误的，均被视为自动放弃本协议，协议同时终止。另一方将有权就因对方放弃协议而造成的经济损失进行追偿。</p>
<p>2、因任何一方出现违反法律的行为或本协议约定的违约行为，都应由责任方自行负责并补偿由此给对方造成的损失。</p>
<p>十、免责条款</p>
<p>发生下列情况时，彩票通不予承担任何法律责任：</p>
<p>1、用户资料泄露。由于用户将密码告知他人或与他人共享注册账户，或由于用户的疏忽，由此导致的任何个人资料泄露，以及由此产生的纠纷。无论何种原因导致的用户资料未授权使用、修改，用户密码、个人账户或注册信息被未授权篡改、盗用而产生的一切后果。</p>
<p>2、不可抗力及不可预见的情势发生。不可抗力和不可预见情势包括：自然灾害、政府行为、罢工、战争等；黑客攻击、计算机病毒侵入或发作、政府管制、彩票发行和销售机构的原因、彩票出票机或服务的故障、网络故障、国家政策变化、法律法规之变化等。因不可抗力和不可预见情势造成：暂时性关闭，用户资料或代购、合买委托指令泄露、丢失、被盗用、被篡改，委托代购、合买失败，彩票通未能收到委托指令等，以及由此产生的纠纷。因不可抗力和不可预见的情势造成本协议不能履行的。</p>
<p>3、用户原因或第三方原因造成损失。由于用户自身原因、或违反法律法规，以及第三方的原因，造成用户无法使用彩票通服务或产生其他损失的。</p>
<p>4、用户代购、合买的彩票而产生的损失。用户根据本协议进行代购、合买委托投注而发生的直接、间接、偶然、特殊及继起的损害。</p>
<p>5、用户使用链接或下载资料产生的损害。由于使用与彩票通链接的其它网站，或者使用通过彩票通下载或取得的资料，造成用户资料泄露、用户电脑系统损坏等情况及由此而导致的任何争议和后果。</p>
<p>十一、法律适用和管辖</p>
<p>本协议适用中华人民共和国法律，发生的争议提交重庆市仲裁委员会，其仲裁裁决是终局的。</p>
<p>十二、在法律允许范围内，本协议最终解释权归彩票通所有。</p>
</div>`
        }
    },
    template: `
    <div class="agreement">
         <el-dialog
                    :visible.sync="show"
                    :show-close="false"
                    size="large"
                   >
                <div class="fr" style="margin-top: -20px" @click="back"><img class="w20px"src="images/close.png"></div>
                <div class="clear1 h5px"></div>
                <div v-html="contents" style="height: 320px; overflow-y: auto;"></div>
            </el-dialog>
        </div>
`,
    methods: {

        back(){
            this.$emit('closecall','close');
        },

    },
    created(){
        let _this = this;

        _this.width = $(window).width();
        _this.height = $(window).height();

    }

})


Vue.component('ticket-dialog', {
    props: ['show','type','state','btn_text'],
    data(){
        return{
            // 'recharge','identity','phone','bank'
        }
    },
    template: `<div class="wb100">
        
        <el-dialog 
                :visible.sync="show"
                :show-close="false"
                size="large">
     
            <div class="text-center">
                <img class="w50px" src="images/true.png" v-if="state == '成功'"> 
                <img class="w50px" src="images/false.png" v-if="state != '成功'">
            </div>  
                               
            <p class="text-center F24" v-if="type == 'recharge'">充值{{state}}</p>  
            <p class="text-center F24" v-if="type == 'identity'">绑定身份{{state}}</p>  
            <p class="text-center F24" v-if="type == 'phone'">绑定手机{{state}}</p>  
            <p class="text-center F24" v-if="type == 'bank'">绑定银行卡{{state}}</p>  
              
            <div class="clear1"></div>

            <div class="clear1"></div>

            <div class="wb100 text-center">
                <div class=" text-center radius5 h38px lh38px pa1  warpper-red Fwhite F16">
                <span v-if="btn_text">{{btn_text}}</span>
                <span v-else>确定</span>
                </div>
            </div>

        </el-dialog>
   
</div>`,
    methods: {

    }

})


Vue.component('ticket-conserve', {
    props: ['show'],
    data(){
        return{

        }
    },
    template: `<div class="wb100" v-show="show == true">

        <div class="dialogBg"></div>
 
        <div class="wb100 absolute" style="bottom: 10px;z-index: 99" >
        
        <div class="text-center warpper-white radius10 mal15 mar15 ">
        <p class="F14 Fgray-3 h50px lh50px bor-solid-1b bor-gray">是否保存本次选号？</p>
        
        <p class="Fred h50px lh50px F18 bor-solid-1b bor-gray" @click="conserve('success')">保存</p>
        
        <p class="Fblue h50px lh50px F18" @click="clear('fail')">不保存</p>     
        </div>
        
        <div class="clear1"></div>
        
        <div class="text-center Fblue warpper-white radius10 mal15 mar15 h50px lh50px F18" @click="conserveCall('cancel')">取消</div>

    
        </div>
      
   
</div>`,
    methods: {

        conserveCall(val){
            this.$emit('callback',val);
        },

        conserve(val){
            this.$emit('callback',val);
        },

        clear(val){
            this.$emit('callback',val);
        },
    }

})

