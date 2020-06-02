'use strict';

var _isLoaded = false;

var timer = 0;

function initHostSdk(call){
    timer = setInterval(function () {
        //安卓app内
        if(base.versions.isAndroidApp){
            if(android_hostsdk){
                _isLoaded = true;
                if(_isLoaded){
                    clearInterval(timer);
                    hostsdk.getInfo({
                        successCallback : function(res){
                            res = JSON.parse(res);
                            ajaxConfig.uuid = res.uuid;
                            ajaxConfig.deviceID = res.deviceID;
                            ajaxConfig.source = res.source;
                            ajaxConfig.deviceType = res.deviceType;
                            call(res);
                        },
                        errorCallback : function(res){
                            call(false,res);
                        }
                    });
                }
            }
        }
        //iosApp内
        if(base.versions.isIosApp){
            if(window.ios_hostsdk){
                _isLoaded = true;
                clearInterval(timer);
                if(_isLoaded){
                    hostsdk.getInfo({
                        successCallback : function(res){
                            res = JSON.parse(res);
                            ajaxConfig.uuid = res.uuid;
                            ajaxConfig.deviceID = res.deviceID;
                            ajaxConfig.source = res.source;
                            ajaxConfig.deviceType = res.deviceType;
                            call(res);
                        },
                        errorCallback : function(res){
                            call(false,res);
                        }
                    });
                }

            }
        }

    },167);
}

