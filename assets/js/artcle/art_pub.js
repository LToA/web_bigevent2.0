$(function () {
    var layer = layui.layer
    var form = layui.form
    category()
    initEditor()


    function category() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('失败')
                } else {
                    layer.msg('成功')
                    var htmlStr = template('tpl_category', res)
                    $('[name=cate_id]').html(htmlStr)
                    form.render()
                }
            }
        })
    }
    var $image = $('#image')
    var options = { aspectRatio: 400 / 280, preview: '.img-preview' }
    $image.cropper(options)

    $('#btn-choose').on('click', function () {
        $('#File').click()
    })
    $('#File').on('change', function (e) {
        var files = e.target.files
        if (files.length == 0) {
            return layer.msg('请选择文件')
        } else {
            var newImgURL = URL.createObjectURL(files[0])
            $image
                .cropper('destroy')
                .attr('src', newImgURL)
                .cropper(options)

        }
    })
    var art_state = '已发布'
    $('#btn-draft').on('click', function () {
        art_state = '草稿'
    })
    $('#form-add').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)
        // fd.forEach(function (v, k) {
        //     console.log(v, k)
        // })
        $image
            .cropper('getCroppedCanvas', {
                width: 400, height: 280
            })
            .toBlob(function (blob) {
                fd.append('cover_img', blob)
                publishart(fd)
            })

    })

    function publishart(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布失败')
                } else {
                    layer.msg('发布成功')
                    location.href = '/article/art_list.html'
                }
            }
        })
    }
})