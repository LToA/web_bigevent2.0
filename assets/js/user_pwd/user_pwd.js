$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
        ],
        newpwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能与原密码相同'
            }
        },
        repwd: function (value) {
            if (value !== $('[name = newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                } else {
                    layer.msg('更新成功')
                    $('.layui-form')[0].reset()
                }
            }
        })
    })



})