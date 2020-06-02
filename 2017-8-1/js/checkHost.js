/**
 * 判断与客户端交互的SDK
 */
(function () {

    window.h5_check = {
        isApp : false,                                      //app内置页面
        isH5 : false,                                       //H5页面
        isIphone : false,                                   //是否是苹果
        isLogin :　false,
        userInfo : {},
        isFullscreen : false,
        leftIcon : false,
        rightIcon : false,
        title : false,
        theme : false,
    };

    var _ua = navigator.userAgent;
    var client_tool = {
        // 是否是Android
        isAndroid: _ua.toLowerCase().indexOf("android") > -1 || _ua.toLowerCase().indexOf("linux") > -1,
        // 是否是iPad
        isIpad: _ua.indexOf("iPad") > -1,
        // 是否是iPhone
        isIphone: _ua.indexOf("iPhone") > -1,
        // 是否在苹果设备
        isApple: false
    };
    client_tool.isApple = (client_tool.isIphone === true || client_tool.isIpad === true);

    if(base.getParmar("_app")){
        window.h5_check.isApp = true;
    }
    if(base.getParmar("from")){
        window.h5_check.isH5 = true;
    }
    if(client_tool.isApple){
        window.h5_check.isIphone = true;
    }



})();