/*
 * @Author: your name
 * @Date: 2022-03-04 15:41:53
 * @LastEditTime: 2022-03-04 15:47:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\手写promise封装ajax.js
 */
/**
 * @description: 
 * @param {*} url  url---->地址
 * @param {*} type type ---> 请求方式
 * @param {*} data async----> 同步：false，异步：true
 * @param {*} async
 * @return {*}
 */
function request({ url, type, data, async }) {
    return new Promise((resolve, reject) => {
        let xhr = null;
        type = type.toUpperCase()
        let params = formsParams(data);
        // 创建XMLHttpRequest对象
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        // 连接
        if (type == "GET") {
            xhr.open(type, url + "?" + params, async);
            xhr.send(null)
        } else if (type === "POST") {
            xhr.open(type, url, async)
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params)
        }

        xhr.onreadystatechange = function () {
            if (xhr.redyState == 4 && xhr.status == 200) {
                resolve(xhr.responseText);
            }
        }
        // 设置错误监听函数
        xhr.onerror = function () {
            reject(new Error(this.statusText));
        };

    })
    function formsParams(data) {
        let arr = [];
        for (let prop in data) {
            arr.push(prop + "=" + data[prop]);
        }
        return arr.join("&")
    }
}