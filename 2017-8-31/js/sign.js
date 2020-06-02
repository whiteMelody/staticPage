'use strict';

var signs = {

    privateKey: '7englishSplit6year',
    privateKey2: '7english@6year',

    getUrlSign: function getUrlSign(uri, type) {

        uri = encodeURI(uri);

        var fileName = uri.substring(uri.indexOf("/", 9));
        var _server = uri.substring(0, uri.indexOf("/", 9));
        var _timestamp = Math.round(new Date().getTime() / 1000) + 1800;
        var _rand = 0;
        var _uid = 0;
        var _PrivateKey = this.privateKey;

        if (type == 'A') {
            var _str = fileName + '-' + _timestamp + '-' + _rand + '-' + _uid + '-' + _PrivateKey;
            var _md5hash = hex_md5(_str);
            var _str2 = _timestamp + '-' + _rand + '-' + _uid + '-' + _md5hash;
            var uri2 = _server + fileName + '?auth_key=' + _str2;
            return uri2;
        } else if (type == 'B') {

            _timestamp = Math.round(new Date().setSeconds(0).getTime() / 1000) + 1800;
            var _md5hash2 = hex_md5(_PrivateKey + _timestamp + fileName);
            var _uri = _server + _timestamp + '/' + _md5hash2 + fileName;
            return _uri;
        } else if (type == 'C') {

            _timestamp = _timestamp.toString(16);
            var _md5hash3 = hex_md5(_PrivateKey + fileName);
            var _uri2 = _server + _md5hash3 + '/' + _timestamp + fileName;
            return _uri2;
        } else if (type == 'D') {

            _timestamp = _timestamp.toString(16);
            var _md5hash4 = hex_md5(_PrivateKey + fileName);
            var _uri3 = _server + fileName + '?KEY1=' + _md5hash4 + '&KEY2=' + _timestamp;
            return _uri3;
        }

        return null;
    },
    getOrderSign: function getOrderSign() {}
};