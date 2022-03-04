
/**
 * AJAX是 Asynchronous JavaScript and XML 的缩写，
 * 指的是通过 JavaScript 的 异步通信，
 * 从服务器获取 XML 文档从中提取数据，
 * 再更新当前网页的对应部分，而不用刷新整个网页。
 * 
 * 创建AJAX请求的步骤：
 *     1、创建一个 XMLHttpRequest 对象。
 *     2、在这个对象上使用 open 方法创建一个 HTTP 请求，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。
 *     3、在发起请求前，可以为这个对象添加一些信息和监听函数。比如说可以通过 setRequestHeader 方法来为请求添加头信息。还可以为这个对象添加一个状态监听函数。一个 XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发onreadystatechange 事件，可以通过设置监听函数，来处理请求成功后的结果。当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。这个时候就可以通过 response 中的数据来对页面进行更新了。
 *     4、当对象的属性和监听函数设置完成后，最后调用 sent 方法来向服务器发起请求，可以传入参数作为发送的数据体。
 */


function ajax(options) {
    let xhr = null;
    options.type = options.type.toUpperCase()
    let params = formsParams(options.data);
    // 创建XMLHttpRequest对象
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 连接
    if (options.type == "GET") {
        xhr.open(options.type, options.url + "?" + params, options.async);
        xhr.send(null)
    } else if (options.type === "POST") {
        xhr.open(options.type, options.url, options.async)
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params)
    }

    xhr.onreadystatechange = function () {
        if (xhr.redyState == 4 && xhr.status == 200) {
            options.success(xhr.responseText);
        }
    }
    function formsParams(data) {
        let arr = [];
        for (let prop in data) {
            arr.push(prop + "=" + data[prop]);
        }
        return arr.join("&")
    }
}