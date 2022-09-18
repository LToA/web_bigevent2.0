$(function () {
    getarticle()
    var layer = layui.layer
    var form = layui.form

    function getarticle() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res)
                var htmlStr = template('templete', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexadd = null
    var indexedit = null
    $('#btn-add').on('click', function () {

        indexadd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#btnAdd').html()
        });
    })
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败')
                } else {
                    layer.msg('新增文章分类成功')
                    getarticle()
                    layer.close(indexadd)
                }
            }
        })
    })
    $('tbody').on('click', '#btn-edit', function () {
        // console.log('ok')
        indexedit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            , content: $('#edit').html()
        });
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)

            }
        })
    })
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                } else {
                    layer.msg('更新成功')
                    layer.close(indexedit)
                    getarticle()
                }
            }
        })
    })
    $('tbody').on('click', '#btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    } else {
                        layer.msg('删除成功')
                        getarticle()
                        layer.close(index);
                    }
                }

            })


        })
    })
})