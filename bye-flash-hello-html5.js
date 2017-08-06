﻿// ==UserScript==
// @name        bye-flash-hello-html5 | 再见flash 你好html5
// @namespace   https://greasyfork.org/en/users/131965-levinit
// @author      levinit
// @description 某些网站啊，明明有html5视频播放，就是不提供给你用呢，mac就可以是几个意思？对，说的就是你！flash?手动再见!支持优酷-乐视-爱奇艺等
// @include     *://*le.com/*
// @include     *://*iqiyi.com/*html*
// @include     *://*youku.com/*
// @include     *://*qq.com/*
// @include     *://*cctv.com/*
// @include     *://*mgtv.com/*
// @include     *://*icourse163.org/*
// @include     *://*open.163.com/movie*
// @include     *://*study.163.com/course/*
// @run-at      document-start
// @version     1.5
// @grant       none
// ==/UserScript==
//'use strict';
var siteNow = location.host; //获取当前的主机名
var ua = null; //user-agent取值
var isPhone = false; //是否使用移动ua

function changeUA(ua) { //更改ua的方法
    Object.defineProperty(navigator, 'userAgent', {
        value: ua,
        writable: false,
        configurable: false,
        enumerable: true
    });
}

(function () { //判断移动ua相关信息
    //不会使用移动ua的页面url的正则
    var urlReg = /(www.mgtv.com\/\w+\/$|www.mgtv.com\/$)/;
    if (location.href.match(urlReg) !== null) {
        return null; //能够匹配urlReg的页面，禁止使用移动ua
    } else {
        //不满足if中的条件，并且url中包含这些关键字的页面会被使用移动ua
        var phone = [
            'cctv',
            '.163',
            'mgtv',
            'iqiyi'
        ];
        for (var i = 0; i < phone.length; i++) {
            if (siteNow.indexOf(phone[i]) >= 0) {
                isPhone = true;
            }
        }
    }
})();
if (siteNow.indexOf('youku') >= 0) { //优酷youku
    (function () {
        window.sessionStorage.setItem('P_l_h5', true);
    })();
} else if (isPhone) { //使用移动ua 默认用android
    ua = 'Mozilla/5.0 (Linux; U; Android 4.0.4; GT-I9300 Build/IMM76D) AppleWebKit/601.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/601.1.46';
    changeUA(ua);
} else { //使用chrome、mac、safari等ua
    if (siteNow.indexOf('le.com') >= 0) { //le.com乐视网对mac+safari情有独钟
        ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.7';
    } else { //使用mac ua
        ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.7 (KHTML, like Gecko) Chrome/59.0.3071.109 Safari/601.2.7';
    }
    changeUA(ua);
}
window.onload = function () {
    var videoElement = document.querySelector('video');
    if (location.href.search('study.163') >= 0 && !!videoElement === true) {
        videoElement.setAttribute('controls', 'controls');//添加播放控制条
    }
};