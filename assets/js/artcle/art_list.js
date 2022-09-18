$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    ininTable()
    classify()

    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date()
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + 'd' + ' ' + hh + ':' + mm + ':' + ss

    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }


    function ininTable() {
        $.ajax({
            method: 'GET',
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                } else {
                    var htmlStr = template('tpl-table', res)
                    $('tbody').html(htmlStr)
                    paging(res.total)
                }
            }
        })
    }
    function classify() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败')
                } else {
                    var htmlStr = template('classify-table', res)
                    $('[ name=cate_id]').html(htmlStr)
                    // console.log(htmlStr)
                    form.render()
                }
            }
        })
    }
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        state = $('[name=state]').val()
        cate_id = $('[name=cate_id]').val()
        q.cate_id = cate_id
        q.state = state
        ininTable()

    })


    function paging(num) {
        laypage.render({
            elem: 'page',
            count: num,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 4, 6, 8, 10],
            jump: function (obj, first) {
                // console.log(obj.curr)
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                // console.log(first)
                if (!first) {
                    ininTable()
                }

            }
        })
    }

    $('tbody').on('click', '.btn-delete', function () {
        var len = $('.btn-delete').length
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            var id = $(this).attr('data-id')
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    } else {
                        layer.msg('删除文章成功')
                        if (len == 1) {
                            q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1

                        }
                        ininTable()
                        layer.close(index)
                    }
                }
            })


        })
    })

})