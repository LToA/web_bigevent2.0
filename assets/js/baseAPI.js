$.ajaxPrefilter(function (options) {
    console.log(options.url)
    options.url = 'http://big-event-api-t.itheima.net' + options.url

    // 统一为有权限的接口,设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.message = "身份认证失败！" && res.responseJSON.status == 1) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})