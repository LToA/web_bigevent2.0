$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在6以内'
            }
        }
    })


    Inuserinfo()
    function Inuserinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                } else {
                    form.val('demo', res.data)
                }
            }
        })
    }

    $('#reset').on('click', function (e) {
        e.preventDefault()
        Inuserinfo()
    })
    $('.layui-form').on('submit', function (e) {

        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                } else {
                    layer.msg('更新成功')
                    window.parent.getUserInfo()
                }


            }
        })
    })
})