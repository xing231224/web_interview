Array.prototype.foreach1 = function (callback, thisa) {
    //谁调用foreach1,this就指向谁
    if (this == null) {
        throw new TypeError('this is null or not defined')
    }
    //判断是否为函数
    if (typeof callback !== 'function') {
        throw TypeError(callback + 'is not a function')
    }
    const o = Object(this)  //当前数组
    const len = o.length >>> 0   //保证转换后的值为正整数(获取数组的长度)
    let k = 0
    while (k < len) {
        if (k in o) {  //k是下标
            //callback的this，当前元素，下标，当前数组
            //call方法中说明，如果没有传入this，则指向window
            callback.call(thisa, o[k], k, o)
        }
        k++
    }

}
let arr = [1, 2]

arr.foreach1(function (item) {
    console.log(item)
})

