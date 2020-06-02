Vue.component('en-header', {

    data() {
        return {
            isWeixin : true,
            call: window.location.href,
            noLogin: this.noLogin,
            show: false,
        };
    },

    template: `<div><div class="En_header En_header-fixed warpper-white">
  <div class="pa15 box-shadow-gray2">
  <el-row type="flex" justify="space-between">
  <el-col :span="8"><a href="index.html"><img src="images/icon-logo.png" class="h30px fl"><span class="fl mal5 lh30px display-inline Fblue"> 7天英语</span></a></el-col>
  <el-col :span="8">
  <el-col :span="16">
  <div class="wb100 h30px lh30px Fblue F14 bor-solid-1a bor-blue radius15 text-center download-btn" @click="download">下载APP</div>
  </el-col>
  <el-col :span="8"><img src="images/icon-main-menu.png" @click="showMenu" class="h20px fr ma5"></el-col>
  </el-col>
  </el-row>
  </div>
  </div>
  <div class="clear h65px"></div>
  <div class="dialogBg" id="downloadBg" @click="hideBg"> <img src="images/info-download2.png" class="fr w280px ma15"> </div>
  <div class="nav-menu-bg" v-show="show" @click="hideMeun"> </div>
  <div class="nav-menu lh30px" v-show="show">
  <img src="images/menu-right.png" style="position: absolute; top: -10px; right: -1px; height: 10px; z-index:999999;">
  <!--<a href="search.html"><p class="pal15 par15 bor-gray bor-solid-1b h35px lh35px Fgray-3"><img src="images/icon-main-search.png" class="h15px fl mat10 mar10"> <span class="fl F14">搜索</span> </p></a>-->
  <a href="index.html"><p class="pal15 par15 bor-gray bor-solid-1b h35px lh35px Fgray-3"><img src="images/icon-main-home.png" class="h15px fl mat10 mar10"> <span class="fl F14">主页</span> </p></a>
  <a href="classify.html"><p class="pal15 par15 bor-gray bor-solid-1b h35px lh35px Fgray-3"><img src="images/icon-main-classify.png" class="h15px fl mat10 mar10"> <span class="fl F14">分类</span> </p></a>
  <a :href="noLogin ? 'login.html?call='+call : 'user.html'" v-if="isWeixin"><p class="pal15 par15 h35px lh35px Fgray-3"><img src="images/icon-main-user.png" class="h15px fl mat10 mar10"> <span class="fl F14">个人中心</span> </p></a>
  </div>
  </div>`,

    methods: {
        showMenu(){
            this.show = true;
        },
        hideMeun(){
            this.show = false;
        },
        download(e){
           baseAjax.download();
        },
        hideBg(e){
            $("#downloadBg").hide(0);
        }
    },
    created(){
        let userInfo = window.sessionStorage.getItem("userInfo");

        if (base.isNull(userInfo)) {
            this.noLogin = true;
        } else {
            this.noLogin = false;
        }

        if(base.versions.isWeiXin){
            this.isWeixin = true;
        }else{
            this.isWeixin = false;
        }
    }

})


Vue.component('en-head', {
    data() {
        return {
            currentNav : 0,
            navText : ['精选','分类','我的','搜索']
        };
    },
    template: `<div class="wb100 h30px pat5 pab5">
       <div class="head-nav" v-for="(item,index) in navText" @click="changeNav(index)">
            <span :class="index == currentNav ? 'head-nav-active' : ''">{{item}}</span>
       </div>
       
    </div>`,

    methods: {
        changeNav(i){
            if(i==0){
                window.location.href = "index.html?nav=0";
            } else if(i==1){
                window.location.href = "classify.html?nav=1";
            } else if(i==2){
                window.location.href = "user.html?nav=2&check=false";
            } else if(i==3){
                window.location.href = "search.html?nav=3";
            }
        }
    },
    created(){
        let _nav = base.getParmar("nav");

        if(_nav){
            this.currentNav = _nav;
        }else{
            this.currentNav = 0;
        }

    }

})



Vue.component('en-footer', {
    template: `<div class="wb100 footer-download">
        <div class="img-area fixed" style="bottom: -5px; left: 0; z-index: 9999999;">
            <img src="images/download-footer.png" @click="download">
            <div style="width: 40px; height: 40px; position: absolute; right: 0; top: 0; z-index: 99999;" @click="closeDownload"></div>
        </div>
        <div class="clear h60px"></div>
    </div>`,

    methods: {
        download(e){
            baseAjax.download();
        },
        hideBg(e){
            $("#downloadBg2").hide(0);
        },
        closeDownload(){
            $(".footer-download").hide(0);
        }
    },
    created(){
    }

})

Vue.component('en-diy', {
    props: ['user_target'],
    data() {
        return {
            width : 0,
            width2 : 0,
            height : 0,
            height2 : 0,
            datas: []
        };
    },
    template: `<el-row :gutter="15">
        
        <div class="pal15 par15" style="z-index: 8;" v-if="user_target == -1">
            <div class="wb100 img-filter5">
                <el-col :span="8">
                      <div class="wb100 img-area">
                      <img src="images/lesson1.png">
                      </div>
                      <p class="F14 lh30px h30px text-over-hidden1 Fgray-3 par5 text-center">出国旅行</p>
                </el-col>
                <el-col :span="8">
                      <div class="wb100 img-area">
                      <img src="images/lesson2.png">
                      </div>
                      <p class="F14 lh30px h30px text-over-hidden1 Fgray-3 par5 text-center">出国旅行</p>
                </el-col>
                <el-col :span="8">
                      <div class="wb100 img-area">
                      <img src="images/lesson3.png">
                      </div>
                      <p class="F14 lh30px h30px text-over-hidden1 Fgray-3 par5 text-center">出国旅行</p>
                </el-col>
            </div>
            <p class="text-center absolute wb100 Fgray-3 F14" style="left:0; top: 20px; z-index: 15;">设置好学习目标可以量身为您定制课程哦～</p>
            
            <a href="diy_select.html">
                <div class="wb30 warpper-blue radius5 h35px lh35px text-center Fwhite absolute F14" style="left:0; right: 0; bottom:40px; margin: 0 auto; z-index: 15;">立即设置 </div>
            </a>
        </div>
        
    <div class="pal15 par15 over-scroll" v-else>
        <div :style="'width:'+width2+'px'">
        
            <div class="warpper-white radius5 over-hidden fl mar15 mab5" v-for="item in datas" :style="'width:'+height2+'px'">
                <a :href="'lesson_detail.html?channelID='+item.channelID">
                    <div class="relative">
                        <img :src="item.iconURL + '?x-oss-process=image/resize,m_fill,h_'+height2+',w_'+height2" />
                    </div>
                    <p class="F16 h30px lh30px text-over-hidden1 Fgray-3 pal15 par15">{{item.channelName}}</p>
                    <!--<p class="F14 h30px lh30px text-over-hidden1 Fgray-2 pal15 par15 pab5">{{item.subtitle}}</p>-->
                </a>
            </div>
            
        </div>
    </div>
  </el-row>`,

    created(){
        let _this = this;
        baseAjax.getCustomChannel(20, 1, _this.user_target, function (data) {
            _this.datas = data.returnJSON;
            _this.width = $(window).width();
            _this.height = $(window).height();
            _this.height2 = Math.ceil(($(window).width() - 45) * 0.3);
            _this.width2 = (_this.height2 +15) * _this.datas.length + 30;
        })

    }
})

Vue.component('en-header-new', {
    props: ['title', 'back', 'back_url', 'home', 'white'],
    template: `<div class="wb100 h50px relative" style="z-index: 99999;">
                    <div v-if="white" style="height: 24px; padding: 13px 15px;">
                        
                        <div style="height: 24px; width:24px; float: left;" class="img-area"><img src="images/icon-back1.png" v-if="back" @click="myBack(back_url)"></div>
                        <a href="index.html" v-if="home" class="fr"><div style="height: 24px; width:24px;" class="img-area"><img src="images/icon-home1.png"></div></a>
                        
                        <p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fgray-4" style="top: 0; left: 0; right: 0; margin: 0 auto;">{{title}}</p>
                    </div>
                    <div v-else style="height: 24px; padding: 13px 15px;">
                    
                        <div style="height: 24px; width:24px; float: left;" class="img-area"><img src="images/icon-back2.png" v-if="back" @click="myBack(back_url)"></div>
                        <a href="index.html" v-if="home" class="fr"><div style="height: 24px; width:24px;" class="img-area"><img src="images/icon-home2.png"></div></a>
                    
                        <p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16" style="top: 0; left: 0; right: 0; margin: 0 auto; color: #fff;">{{title}}</p>
                    </div>
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

Vue.component('layout-header', {
    props: ['title', 'back', 'back_url', 'right_icon', 'black'],

    data() {
        return {
            classs: {
                edit: {
                    icon: 'en-edit',
                    event: "edit",
                },
                share: {
                    icon: 'en-share',
                    event: "share",
                },
            }
        };
    },

    template: `<div class="wb100">
            <div class="wb100 text-center relative h50px lh50px F18 Fwhite" v-if="black">
                <div class="en-back2" v-show="back == true" @click="myBack(back_url)"></div>
                {{title}}
                <div v-if="right_icon">
                    <div v-bind:class="classs[right_icon].icon" @click="rightEvent(classs[right_icon].event)"></div>
                </div>
            </div>
            <div class="wb100 text-center relative h50px lh50px F18" v-else>
                    <div class="en-back" v-show="back == true" @click="myBack(back_url)"></div>
                    {{title}}
                    
                    <div v-if="right_icon">
                        <div v-bind:class="classs[right_icon].icon" @click="rightEvent(classs[right_icon].event)"></div>
                    </div>
                </div>
            </div>`,

    methods: {
        myBack(url){
            if (base.isNull(url)) {
                window.history.go(-1);
            } else {
                window.location.href = url;
            }
        },
        edit(){

        },
        share(){
            console.log('share');
        },
        rightEvent(type){
            if (type == 'edit') {
                this.$emit('edit');
            }
            if (type == 'share') {
                console.log('share');
            }

        }

    }

})

Vue.component('layout-loader', {
    props: ['show', 'black'],
    template: `<div class="cs-loader" v-bind:style="black ? ' background: rgba(0,0,0,.5)' :  'background: rgba(255,255,255,1)'  " v-show="show == true">
        <div class="cs-loader-inner">
            <label>	●</label>
            <label>	●</label>
            <label>	●</label>
            <label>	●</label>
            <label>	●</label>
            <label>	●</label>
        </div>
    </div>`,
})

Vue.component('layout-loader-black', {
    props: ['show'],
    template: `<div class="cs-loader" style="background: rgba(0,0,0,.8)" v-show="show == true">
        <img src="images/loading-2.gif" style="position: absolute; top: 0; left: 0; right: 0; bottom:0; margin: auto;">
    </div>`,
})

Vue.component('layout-lesson', {
    props: ['item', 'size'],
    template: ` <div class="pa15">
        <div class="wb100">
            <div class="fl">
                <img :src="item.iconURL +'?x-oss-process=image/resize,m_fixed,h_'+size+',w_'+size" class="radius5" />
            </div>
            <div class="Fgray-3">
                <p class="Fgray-3 lh30px over-hidden pal15">{{item.channelName}}</p>
                <p class="F13 lh20px h40px text-over-hidden2 pal15 pat15">{{item.channelName}}</p>
                <p class="F13 lh20px h20px text-over-hidden2 pal15 pat15 Fblue">{{item.channelName}}</p>
            </div>
        </div>
    </div>`,
})

Vue.component('layout-lesson-en', {
    props: ['item'],
    template: ` <div class="pa15">
        <a :href="'every_day.html?date='+ item.date">
          <div class="wb100">
              <div class="fl img-area" style="height: 75px; width: 75px;">
                  <img :src=" item.iconURL ? item.iconURL +'?x-oss-process=image/resize,m_fixed,h_150,w_150' : item.imageURL +'?x-oss-process=image/resize,m_fixed,h_150,w_150'" class="radius5" />
              </div>
              <div class="Fgray-3">
                  <p class="lh35px h35px over-hidden pal15 F14 Fblack">每日一句</p>
                  <p class="F12 lh20px h40px text-over-hidden2 pal15">{{item.languageEN}} {{item.languageCN}}</p>
              </div>
          </div>
        </a>
        
    </div>`,
})

Vue.component('layout-lesson-col', {
    props: ['datas', 'size'],
    template: `<div class="pal15 par15">
        <el-row :gutter="15">
            <el-col :span="6" v-for="item in datas">
                <div class="wb100 img-area">
                    <img :src="item.iconURL +'?x-oss-process=image/resize,m_fill,h_'+size+',w_'+size" class="radius5" />
                </div>
                <p class="F14 h20px lh20px text-over-hidden1 par5">{{item.subtitle}}</p>
            </el-col>
        </el-row>
    </div>`,
})


Vue.component('layout-lesson-list', {
    props: ['datas', 'size'],
    template: `<div class="wb100">
            <div class="wb100" v-for="item in datas">
            <div class="pal15">
              <a :href="'lesson_detail.html?channelID='+item.channelID">
                <div class="fl img-area" :style="'width: '+size+'px; height: '+size+'px;'">
                    <img :src="item.iconURL +'?x-oss-process=image/resize,m_fixed,h_'+size *2  +',w_'+size *2 " class="radius5" />
                </div>
                <div class="Fgray-3">
                    <p class="lh25px h25px text-over-hidden1 pal15 Fblack F14">{{item.channelName}}</p>
                    <p class="F12 lh25px h25px text-over-hidden1 pal15 Fgray-3">{{item.subtitle}}</p>
                </div>
              </a>
              <div class="clear1 bor-gray bor-solid-1b"></div>

            </div>
            <div class="clear1"></div>
        </div>
        </div>`,
})

Vue.component('layout-lesson-text', {
    props: ['datas'],
    template: `<div class="pal15 lh45px F14">
       
          <el-row v-for="item in datas" class="bor-gray bor-solid-1t">
          
          <a v-if="item.newsType == 2" :href="item.newsUrl">
                       <el-col :span="22">
                <p class="F14 lh45px h45px text-over-hidden1 Fgray-3 par10">
                    {{item.languageCN}}
                </p>
              </el-col>
              <el-col :span="2">
                  <img src="images/icon-arrow-right.png" class="h15px mat15 fr mar15">
              </el-col>
                    </a>
                    
                    <a v-if="item.newsType == 3" :href="'lesson_detail.html?channelID='+item.newsUrl">
                        <el-col :span="22">
                <p class="F14 lh45px h45px text-over-hidden1 Fgray-3 par10">
                    {{item.languageCN}}
                </p>
              </el-col>
              <el-col :span="2">
                  <img src="images/icon-arrow-right.png" class="h15px mat15 fr mar15">
              </el-col>
                    </a>
          
         
          <div class="wb100 bor-gray bor-solid-1b" style="height: 1px;"></div>
    </div>`,
})

Vue.component('en-everyday-list', {
    props: ['datas'],
    template: `<div class=" lh45px F14">
        <div class="wb100" v-for="item in datas">
            <p class="pal15 h40px lh40px F14 warpper-gray-3 Fgray-3 Fb">{{item.date}}</p>
            <div class="clear1"></div>
            <div class="pal15">
                <el-row v-for="(item2,index) in item.datas">
                    <a v-if="item2.newsType == 1" :href="'every_day.html?date='+ item.date2">
                      <div class="wb100">
                          <div class="fl img-area" style="height: 75px; width: 75px;">
                              <img :src=" item2.iconURL ? item2.iconURL +'?x-oss-process=image/resize,m_fixed,h_150,w_150' : item2.imageURL +'?x-oss-process=image/resize,m_fixed,h_150,w_150'" class="radius5" />
                          </div>
                          <div class="Fgray-3">
                              <p class="lh35px h35px over-hidden pal15 F14 Fblack">每日一句</p>
                              <p class="F12 lh20px h40px text-over-hidden2 pal15 par10">{{item2.languageEN}}{{item2.languageCN}}</p>
                          </div>
                      </div>
                      <div class="clear1"></div>
                    </a>
                
                    <a v-if="item2.newsType == 2" :href="item2.newsUrl">
                        <div class="wb100 bor-gray bor-solid-1t">
                          <el-col :span="22">
                           <p class="F14 lh45px h45px text-over-hidden1 Fgray-3 par10">
                              {{item2.languageCN}}
                           </p>
                          </el-col>
                          <el-col :span="2">
                              <img src="images/icon-arrow-right.png" class="h15px mat15 fr mar15">
                          </el-col>
                        </div>
                    </a>
                    
                    <a v-if="item2.newsType == 3" :href="'lesson_detail.html?channelID='+item2.newsUrl">
                        <div class="wb100 bor-gray bor-solid-1t">
                          <el-col :span="22">
                           <p class="F14 lh45px h45px text-over-hidden1 Fgray-3 par10">
                              {{item2.languageCN}}
                           </p>
                          </el-col>
                          <el-col :span="2">
                              <img src="images/icon-arrow-right.png" class="h15px mat15 fr mar15">
                          </el-col>
                        </div>
                    </a>
                </el-row>
          </div>
     </div>
    </div>`,
})

Vue.component('en-statistics', {
    template: `<div class="wb100"></div>`,
    created(){
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?02656d3a262742fe6567cff6f33b6aa7";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }
})

Vue.component('en-pay', {
    props: ['item', 'gold','phone'],
    data() {
        return {
            name: "",
            phoneNum: "",
            user : {},
            current : 0,
            golds : [],
            recharge : false,
            showBg : false,
            isVip : false,
            vipData : {},
            payStyle: {
                position: 'fixed',
                bottom: '-600px',
                left: 0,
                zIndex: 99999999,
                background: 'rgba(255,255,255,1)',
                width: '100%',
                overflow: 'hidden',
                transition: "all .5s"
            },
        };
    },
    template: `<div class="wb100">
                <template v-if="recharge">
                    <div style="background: #fff; width: 100%; height: 100%; position: fixed; z-index: 999999999; display: none; top:0; left:0;">
                        <div class="wb100 h50px relative" style="z-index: 99999;">
                            <div style="height: 24px; width:24px; float: left; margin-top: 13px;" class="img-area mal15"><img src="images/icon-back1.png" @click="closeRecharge"></div>
                            <p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fgray-4" style="top: 0; left: 0; right: 0; margin: 0 auto;">充值</p>
                        </div>
                        <div class="pa15">
                        <p class="h20px lh20px pat10 pab10 mab15 radius5" v-bind:class="current == key ? 'gold-buy-active' : 'gold-buy'" v-for="(item,key) in golds" @click="selectPrice(key)">
                      
                            <span class="fl mal15">{{item.coinQty}}金币</span>
                            <span class="Fyellow2 fl" v-if="item.giftCoinQty>0">+{{item.giftCoinQty}}金币</span>
                            <span class="fr w80px text-center" style="border-left: 1px solid #e8e8e8; ">{{item.price}}元</span>
                        </p>    
                    </div>
                    </div>
                </template>
                <template v-else>
                <div class="cs-loader" v-show="showBg" style="background: rgba(0,0,0,.8); z-index: 9999999" @click="closePay"></div>
                    <div :style="payStyle">
                        <div class="pa15">
                            
                            <template v-if="isVip == true">
                                
                                <div class="wb100">
                                    <div class="clear1"></div>
                                    
                                    <p style="color:#f6a623;" class="text-center">每天三角钱，英语轻松学</p>
                                    
                                    <div class="clear1"></div>
                                    
                                    <div class="wb100 pat15 pab15 lh25px text-center" style="color:#925421; background:#ffd7bf;">
                                        <p>付费精品课程全场免费</p>
                                        <p class="F12 lh20px">课程价值上万元，优质课程持续更新中</p>
                                    </div>
                                   
                                    <div class="clear1"></div>
                                    
                                    <div class="wb100 pat15 pab15 lh25px text-center" style="color:#a47e3f; background:#feebca;">
                                        <p>直播课程无限畅学</p>
                                    </div>
                                   
                                    <div class="clear1"></div>
                                    
                                    <div class="wb100 pat15 pab15 lh25px text-center" style="color:#83a78b; background:#d3f1d9;">
                                        <p>VIP高速下载通道</p>
                                    </div>
                                    
                                    <div class="clear1"></div>
                                    
                                    
                                    <div class="clear1"></div>
                                    
                                    <div class="wb100" v-if="vipData.currencyType == 0">
                                    
                                        <p>超值特价：{{vipData.salesAmount}}金币/年，原价{{vipData.marketAmount}}金币/年
                                        
                                        <p class="h30px lh30px text-over-hidden1">余额：{{ user.goldCoinsQty ? user.goldCoinsQty : 0}} 金币</p>
                                        
                                        <div class="clear1"></div>
                                    
                                         <a href="javascript:void(0)" v-if="user.goldCoinsQty && user.goldCoinsQty > vipData.salesAmount" @click="buyVip('gold')" class="display-inline h45px lh45px text-center Fwhite warpper-blue wb100 F16 radius5">
                                            <span class="Fwhite">确认支付</span>
                                        </a>
                                        <a href="javascript:void(0)" @click="openRecharge" v-else class="display-inline h45px lh45px text-center Fwhite warpper-blue wb100 F16 radius5">
                                            <span class="Fwhite">余额不足，请充值</span>
                                        </a>
            
                                    </div>
                                    
                                    <div class="wb100" v-else>
                                    
                                         <p>超值特价：{{ twoDecimal(vipData.salesAmount)}}元/年，原价{{ twoDecimal(vipData.marketAmount)}}元/年
                                         
                                        <div class="clear1"></div>
                                    
                                         <a href="javascript:void(0)" @click="buyVip" class="display-inline h45px lh45px text-center Fwhite warpper-blue wb100 F16 radius5">
                                                <span class="Fwhite">确认支付</span>
                                         </a>
                                    </div>
                                    
                                </div>
                            
                            </template>
                            
                            <template v-else>
                            
                            <div class="wb100 Fgray-4" v-if="gold">
                                <p class="h30px lh30px text-over-hidden1">频道名：{{item.channelName}}</p>
                                <p class="h30px lh30px text-over-hidden1">价格：<span class="Forange">{{item.payGoldCoins}}</span> 金币</p>
                                <p class="h30px lh30px text-over-hidden1">余额：{{ user.goldCoinsQty ? user.goldCoinsQty : 0}} 金币</p>
                                <div class="clear1"></div>
                                <template v-if="phone">
                                    <el-input v-model="phoneNum" placeholder="请输入手机号"></el-input>
                                    <div class="clear1"></div>
                                </template>
                                <a href="javascript:void(0)" v-if="user.goldCoinsQty && user.goldCoinsQty > item.payGoldCoins" @click="goldPay" class="display-inline h45px lh45px text-center Fwhite warpper-blue wb100 F16 radius5">
                                    <span class="Fwhite">确认支付</span>
                                </a>
                                <a href="javascript:void(0)" @click="openRecharge" v-else class="display-inline h45px lh45px text-center Fwhite warpper-blue wb100 F16 radius5">
                                    <span class="Fwhite">余额不足，请充值</span>
                                </a>
                            </div>
                            <div class="wb100" v-else>
                                <p class="h30px lh30px text-over-hidden1">频道名：{{item.channelName}}</p>
                                <p class="h30px lh30px text-over-hidden1">价格：¥<span class="Forange">{{item.salesPrice / 100}}</span> 元</p>
                                <div class="clear1"></div>
                                <template v-if="phone">
                                    <el-input v-model="name" placeholder="请输入姓名"></el-input>
                                    <div class="clear1"></div>
                                    <el-input v-model="phoneNum" placeholder="请输入手机号"></el-input>
                                    <div class="clear1"></div>
                                </template>
                                <a href="javascript:void(0)" @click="wxPay" class="display-inline h45px lh45px text-center Fwhite warpper-blue wb100 F16 radius5" data-role="none">
                                    <span class="Fwhite">确认支付</span>
                                </a>
                            </div>
                            
                            </template>
                            
                        </div>
                    </div>
                </template>
    </div> `,
    methods: {
        closeRecharge(){
            this.recharge = false;
        },
        openRecharge(){
            this.recharge = true;
        },
        selectPrice(key){
            this.current = key;
            this.pay();
        },
        twoDecimal(oNum){
            var num = parseFloat(oNum);
            if (isNaN(length)) return false;

            var num = Math.round(oNum*100)/100;
            return num;
        },
        pay(){
            let _this = this;

            _this.loading = true;
            baseAjax.getWxPayNew(_this.golds[_this.current].productID,function (data) {
                _this.loading = false;
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    JSON.parse(data.returnJSON),
                    function(res){
                        if(res.err_msg == "get_brand_wcpay_request:ok") {
                            if(_this.isVip){
                                _this.buyVip('gold');
                            }else{
                                _this.goldPay();
                            }
                            _this.closeRecharge();
                        }else{
                            layer.alert("支付失败");
                        }
                    }
                );
            })
        },
        closePay(){
            this.payStyle.bottom = '-600px';
            this.showBg = false;
            var bus = new Vue();
            bus.$emit('payCallback', true);
        },
        openPay(vip){

            let _this = this;

            let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));

            if(base.isNull(userInfo)){
                if(base.versions.isWeiXin){
                    layer.confirm('您还没有登录，前去登录吗？', {
                        btn: ['好的','取消'] //按钮
                    }, function(){
                        //前去登录
                        let call = window.location.href;
                        window.location.href = 'wx_login.html?call='+call;
                    }, function(){
                        //取消登录
                    });
                }else{
                    layer.alert("请在微信里打开，使用付费功能");
                }
                return false;
            }

            if(vip == 'vip'){
                baseAjax.productVIP(function(data){
                    _this.isVip = true;
                    _this.vipData = data.returnJSON[0];
                    console.log(data);
                })
            }

            baseAjax.getProductList(function (data) {
                _this.golds = data.returnJSON;
            })

            //获取用户数据和用户购买记录
            baseAjax.getUserInfoByID(userInfo.userID, function (data) {
                _this.user = data.returnJSON;
                _this.showBg = true;
                _this.payStyle.bottom = '0';
            })

        },

        goldPay(){

            let _this = this;
            // //验证
            // if(base.isNull(_this.name)){
            //     layer.alert("名字不能为空");
            //     return false;
            // }

            _this.$watch('phone', function(newVal){
                if(newVal){
                    if(base.isNull(_this.phoneNum)){
                        layer.alert("手机号不能为空");
                        return false;
                    }
                }
            });

            let _timestamp = Math.round(new Date().getTime() / 1000);

            let _tmp = 'deviceID=' + baseAjax.getDeviceID() + '&timestemp=' + _timestamp + '&type=' + ajaxConfig.type + '&userID=' + baseAjax.getUserId() + '&key=' + signs.privateKey2;

            let _sign = hex_md5(_tmp);

            _sign = _sign.toUpperCase();

            _this.$emit('payload');

            baseAjax.goldBuyChannel(_this.item.channelID, 1, _timestamp, _sign, baseAjax.getUserId(), function (data) {

                if(data){
                    _this.$emit('callback');
                }else{
                    _this.$emit('callbackfail');
                }

            })

        },

        buyVip(gold){

            let _this = this;

            if(gold == 'gold'){
                //金币购买
                let _timestamp = Math.round(new Date().getTime() / 1000);

                let _tmp = 'deviceID=' + baseAjax.getDeviceID() + '&timestemp=' + _timestamp + '&type=' + ajaxConfig.type + '&userID=' + baseAjax.getUserId() + '&key=' + signs.privateKey2;

                let _sign = hex_md5(_tmp);

                _sign = _sign.toUpperCase();

                _this.$emit('payload');

                baseAjax.productCoinsBuy(_this.vipData.VIPNum, _timestamp, _sign, function(data){

                    if(data){
                        _this.$emit('callback');
                    }else{
                        _this.$emit('callbackfail');
                    }
                })

            }else{
                //人民币购买


                let _timestamp = Math.round(new Date().getTime() / 1000);

                let _tmp = 'deviceID=' + baseAjax.getDeviceID() + '&timestemp=' + _timestamp + '&type=' + ajaxConfig.type + '&userID=' + baseAjax.getUserId() + '&key=' + signs.privateKey2;

                let _sign = hex_md5(_tmp);

                _sign = _sign.toUpperCase();

                _this.$emit('payload');

                baseAjax.productRmbBuy(_this.vipData.VIPNum, _timestamp, _sign, function (data) {

                    //获取订单号
                    let _orderID = data.returnJSON.transNum;

                    baseAjax.wxJSPayChannel(_orderID, ajaxConfig.channel, _this.item.channelName, _this.name, _this.phone, function (data2) {

                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest',
                            JSON.parse(data2.returnJSON),
                            function (res) {
                                if (res.err_msg == "get_brand_wcpay_request:ok") {
                                    //设置付费内容
                                    _this.$emit('callback');
                                } else {
                                    _this.$emit('callbackfail');
                                }
                            }
                        );
                    })

                })


            }
        },

        wxPay(){

            let _this = this;

            // //验证
            // if(base.isNull(_this.name)){
            //     layer.alert("名字不能为空");
            //     return false;
            // }
            if(base.isNull(_this.phone)){
                layer.alert("手机号不能为空");
                return false;
            }

            let _timestamp = Math.round(new Date().getTime() / 1000);

            let _tmp = 'deviceID=' + baseAjax.getDeviceID() + '&timestemp=' + _timestamp + '&type=' + ajaxConfig.type + '&userID=' + baseAjax.getUserId() + '&key=' + signs.privateKey2;

            let _sign = hex_md5(_tmp);

            _sign = _sign.toUpperCase();

            _this.$emit('payload');

            baseAjax.getChannelOrder(_this.item.channelID, 1, _timestamp, _sign, baseAjax.getUserId(), function (data) {

                //获取订单号
                let _orderID = data.returnJSON.transNum;

                baseAjax.wxJSPayChannel(_orderID, ajaxConfig.channel, _this.item.channelName, _this.name, _this.phone, function (data2) {
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest',
                        JSON.parse(data2.returnJSON),
                        function (res) {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                //设置付费内容
                                _this.$emit('callback');
                            } else {
                                _this.$emit('callbackfail');
                            }
                        }
                    );
                })

            })
        },
    },
    created(){


    }
})



