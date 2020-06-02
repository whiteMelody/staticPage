"use strict";

/**
 * 与客户端交互的SDK
 */
(function () {
    // 判断平台的工具方法
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

    client_tool.isApple = client_tool.isIphone === true || client_tool.isIpad === true;

    // 苹果客户端jbridge
    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe);
        }, 0);
    }
    setupWebViewJavascriptBridge(function (bridge) {
        window.ios_hostsdk = bridge;
    });

    // 客户端回调
    window.host_sdk = {
        // 生命周期方法，初始化
        onInit: function onInit() {
            if (hostsdk && hostsdk.onInit) hostsdk.onInit();
        },

        // 生命周期方法，暂停执行
        onPause: function onPause() {
            if (hostsdk && hostsdk.onPause) hostsdk.onPause();
        },

        // 生命周期方法，恢复执行
        onResume: function onResume() {
            if (hostsdk && hostsdk.onResume) hostsdk.onResume();
        },

        // 生命周期方法，结束执行
        onStop: function onStop() {
            if (hostsdk && hostsdk.onStop) hostsdk.onStop();
        },

        // 发生错误的回调
        errorCallback: function errorCallback(errorMsg) {},

        // 取消操作后的回调
        cancelCallback: function cancelCallback() {},

        // 操作成功后回调
        successCallback: function successCallback(data) {},

        // 左侧按钮点击触发事件前
        leftClickBeforEvent: function leftClickedEvent(data) {},

        // 左侧按钮点击触发事件时
        leftClickedEvent: function leftClickedEvent(data) {},

        // 右侧按钮点击触发事件前
        rightClickBeforEvent: function rightClickedEvent(data) {},

        // 右侧按钮点击触发事件时
        rightClickedEvent: function rightClickedEvent(data) {},

        // 右侧按钮点击触发事件后
        rightClickAfterEvent: function rightClickedEvent(data) {}

    };

    // 封装SDK
    window.hostsdk = {
        //分享
        share: function share(options) {
            // alert("调用分享");
            if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
            if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
            if (options.cancelCallback) window.host_sdk.cancelCallback = options.cancelCallback;
            if (client_tool.isApple) {
                ios_hostsdk.callHandler("share", { "title": options.title, "desc": options.description, "url": options.url, "icon": options.icon, "platforms": options.platforms });
            } else {
                android_hostsdk.share(options.title, options.description, options.url, options.icon, options.platforms);
            }
        },

        //获取环境变量
        getInfo: function getInfo(options) {
            if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
            if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
            if (client_tool.isApple) {
                ios_hostsdk.callHandler("getInfo");
            } else {
                android_hostsdk.getInfo();
            }
        },

        //获取当前用户
        getUser: function getUser(options) {
            if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
            if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
            if (client_tool.isApple) {
                ios_hostsdk.callHandler("getUser");
            } else {
                android_hostsdk.getUser();
            }
        },

        //用户登录
        login: function login(options) {
            if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
            if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
            if (options.cancelCallback) window.host_sdk.cancelCallback = options.cancelCallback;
            if (client_tool.isApple) {
                ios_hostsdk.callHandler("login");
            } else {
                android_hostsdk.login(options.msg);
            }
        },

        //设置全屏
        setFullScreen: function setFullScreen(options) {
            if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
            if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
            if (client_tool.isApple) {
                ios_hostsdk.callHandler("setFullScreen");
            } else {
                android_hostsdk.setFullScreen();
            }
        },

        //设置左侧按钮
        setLeftIcon: function setLeftIcon(options) {
            if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
            if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
            if (options.leftClicked) window.host_sdk.leftClickedEvent = options.leftClicked;

            if (client_tool.isApple) {
                ios_hostsdk.callHandler("setLeftIcon",{"params": options.params,"icon":options.icon,"text":options.text});
            } else {
                android_hostsdk.setLeftIcon(options.params,options.icon,options.text);
            }
        },

        //设置右侧按钮
        setRightIcon: function setRightIcon(options) {
            if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
            if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
            if (options.rightClicked) window.host_sdk.rightClickedEvent = options.rightClicked;

            if (client_tool.isApple) {
                ios_hostsdk.callHandler("setRightIcon",{"params": options.params,"icon":options.icon,"text":options.text});
            } else {
                android_hostsdk.setRightIcon(options.params,options.icon,options.text);
            }
        },

        //手动关闭
        exit: function exit(options) {
            if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
            if (client_tool.isApple) {
                ios_hostsdk.callHandler("exit");
            } else {
                android_hostsdk.exit();
            }
        },

        //跳转到指定原生APP页面
        openUrl: function openUrl(options) {
            if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
            if (client_tool.isApple) {
                ios_hostsdk.callHandler("openUrl", {"type":options.type, "url":options.url,"params":options.params});
            } else {
                android_hostsdk.openUrl(options.type, options.url, JSON.stringify(options.params));
            }
        },

        //跳转到H5页面
        openLink: function openLink(options) {
            if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
            if (client_tool.isApple) {
                ios_hostsdk.callHandler("openLink", {"type":options.type, "url":options.url,"params":options.params});
            } else {
                android_hostsdk.openLink(options.type, options.url, options.params);
            }
        },

        //FocusUser关注
        FocusUser: function FocusUser(options) {

            if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
            if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
            if (client_tool.isApple) {
                ios_hostsdk.callHandler("FocusUser", options.uuId);
            } else {
                android_hostsdk.FocusUser(options.uuId);
            }
        },

        //FocusUser取消关注
        CancelFocusUser: function CancelFocusUser(options) {

            if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
            if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
            if (client_tool.isApple) {
                ios_hostsdk.callHandler("CancelFocusUser",  options.uuId );
            } else {
                android_hostsdk.CancelFocusUser(options.uuId);
            }
        },

        //设置导航的title
        setViewTitle: function (options) {
            if (options.successCallback) window.host_sdk.successCallback = options.successCallback;
            if (options.errorCallback) window.host_sdk.errorCallback = options.errorCallback;
            if (client_tool.isApple) {
                ios_hostsdk.callHandler("setViewTitle", options.title);
            } else {
                android_hostsdk.setViewTitle(options.title);
            }
        }
    };
})();