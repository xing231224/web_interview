/*
 * @Author: your name
 * @Date: 2022-04-27 11:17:00
 * @LastEditTime: 2022-04-27 11:19:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\demo\jsonp.js
 */

function jsonp({ url, params, callback }) {
    return new Promise((resolve, reject) => {
        //创建script标签
        let script = document.createElement("script");
        //定义函数
        //服务端返回的语句会在script中执行`${callback}('服务端的数据')`
        window[callback] = function (data) {
            resolve(data);
            //从body上删除标签
            document.body.removeChild(script);
        };
        //解析参数
        params = { ...params, callback }; //{ wd: '客户端的参数', callback: 'show' }
        let arr = [];
        for (let key in params) {
            //遍历属性
            arr.push(`${key}=${params[key]}`); //[ 'wd=客户端的参数', 'callback=show' ]
        }
        //拼接src
        script.src = `${url}?${arr.join("&")}`; //url?wd=客户端的参数&callback=show
        //把标签添加到body上(发送请求)
        document.body.appendChild(script);
    });
}
//执行函数
jsonp({
    url: "http://localhost:3000/",
    params: { wd: "客户端的参数" },
    callback: "show",
}).then((data) => {
    console.log(data);
});
