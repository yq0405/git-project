$(function () {
    $.ajaxPrefilter(function (options) {
        options.url = 'http://ajax.frontend.itheima.net' + options.url;

        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }

        options.complete = function (res) {
            if (res.responseJSON) {
                let jsondata = JSON.parse(res.responseText);
                if (jsondata.status === 1 && jsondata.message === '身份认证失败！') {
                    //强制清空token
                    localStorage.removeItem('token');
                    location.href = '/login.html';
                }
                if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                    //强制清空token
                    localStorage.removeItem('token');
                    location.href = '/login.html';
                }
            }
        }

    })
})
