$(function () {
    var layer = layui.layer
    var $image = $('#image')
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options)
    $('#btn-shangchuan').on('click', function () {
        $('#file').click()
    })
    $('#file').on('change', function (e) {
        // console.log(e)
        var files = e.target.files
        if (files.length == 0) {
            return layer.msg('请选择图片')
        } else {
            var first = e.target.files[0]
            var newImgURL = URL.createObjectURL(first)
            $image
                .cropper('destroy')
                .attr('src', newImgURL)
                .cropper(options)
        }
    })
    $('#sure').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                width: 100, height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像成功')
                } else {
                    layer.msg('更新头像成功')
                    window.parent.getUserInfo()
                }
            }
        })
    })
})