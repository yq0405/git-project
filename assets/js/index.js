$(function () {
    getUserInfo();

    var layer = layui.layer;

    //实现退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录？', { icon: 3, title: '提示' }),
            function (index) {
                localStorage.removeItem('token');
                location.href = '/login.html';
                layer.close(index);
            }
    })

    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            header: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function (res) {
                // if (res.status !== 0) {
                //     return layui.layer.msg('获取用户信息失败！')
                // }
                //调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data);
            },
            // complete: function (res) {
            //     if (res.responseJson) {
            //         let jsondata = JSON.parse(res.responseText);
            //         if (jsondata.status === 1 && jsondata.message === '身份认证失败！') {
            //             //强制清空token
            //             localStorage.removeItem('token');
            //             location.href = '/login.html';
            //         }
            //         if (res.responseJson.status === 1 && res.responseJson.message === '身份认证失败！') {
            //             //强制清空token
            //             localStorage.removeItem('token');
            //             location.href = '/login.html';
            //         }
            //     }
            // }
        })
    };

    //渲染用户的头像
    function renderAvatar(user) {
        var name = user.nickname || user.username;
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        if (user.user_pic !== null) {
            //渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {
            //渲染文本头像
            $('.layui-nav-img').hide();
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first).show();
        }
    }
})