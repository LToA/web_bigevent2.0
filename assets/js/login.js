$(function () {
    $('#link_reg').on('click', function () {
        $('.regbox').show()
        $('.loginbox').hide()
    })
    $('#link_login').on('click', function () {
        $('.loginbox').show()
        $('.regbox').hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位,且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.regbox [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 注册
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=repassword]').val() }
        $.post('/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    layer.msg('注册成功,请登录')
                    $('#link_login').click()
                }
            })
    })
    // 登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        var data = { username: $('#form_login [name= username]').val(), password: $('#form_login [name= password]').val() }
        $.ajax({
            method: 'post',
            url: '/api/login',
            // 这是快速获取表单数据的写法
            // data: $(this).serialize()
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    layer.msg('登录成功')
                    // console.log(res.token)
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                }
            }


        })
    })
})