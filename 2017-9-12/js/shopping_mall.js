'use strict';

/**
 * 接口配置
 * @type {{server_url: string, time_out: number}}
 */

var AjaxConfig = {
    server_url: 'http://api.31un.com/',
    time_out: 3000,
    lazy: 1000,
    source: 'wap',
    type: '1',
    debug: false
};

if (AjaxConfig.debug == true) {
    AjaxConfig.server_url = 'http://api.31un.com/';
} else if (AjaxConfig.debug == false) {
    AjaxConfig.server_url = 'http://192.168.8.161/caipiao/index.php/';
}

var BaseAjax = {

    /**
     * 商品列表
     * @param page
     * @param pageSize
     * @param bigtype
     * @param category_id
     * @param callback
     */

    goodsList: function goodsList(page,pageSize, bigtype, category_id, callback) {
        $.ajax({
            type: "post",
            url: AjaxConfig.server_url + "goods/goodsList",
            data: { page: page, pageSize: pageSize, bigtype: bigtype, category_id: category_id },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },

    /**
     * 商品详情
     * @param id
     * @param callback
     */

    detail: function detail(id, callback) {
        $.ajax({
            type: "post",
            url: AjaxConfig.server_url + "goods/detail",
            data: { id: id },
            dataType: "json",
            success: function success(data) {
                if (data.code == 4000) {
                    callback(data);
                } else {
                    callback(false, data.message);
                }
            }
        });
    },



};