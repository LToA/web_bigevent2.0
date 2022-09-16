$(function () {
    getUserInfo()

    $('#btn-out').on('click', function () {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // console.log('ok')
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        })
    })
})

function getUserInfo() {
    var layer = layui.layer
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res)
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            } else {
                renderAvatar(res.data)
            }
        }
    })
}
function renderAvatar(user) {
    var name = user.username || user.nickname
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}