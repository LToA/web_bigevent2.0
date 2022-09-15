$.ajaxPrefilter(function (options) {
    console.log(options.url)
    options.url = 'http://big-event-api-t.itheima.net' + options.url

})