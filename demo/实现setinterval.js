function mySetInterval(fn, timeout) {
    var t = { flag: true }
    //递归
    function dd() {
        if (t.flag) {
            fn()
            setTimeout(dd, timeout)
        }
    }
    //触发
    setTimeout(dd, timeout)
    return t
}

let i = 0
let t = mySetInterval(function () {
    console.log(i++)
}, 500)

