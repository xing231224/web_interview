Array.prototype.map1 = function (callback, thisarg) {
    if (this == null) {
        throw TypeError('cc')
    }
    if (typeof callback !== 'function') {
        throw TypeError('cc')
    }

    const o = Object(this)
    const len = o.length >>> 0
    //用于接收返回值
    let res = []
    let k = 0
    while (k < len) {
        if (k in o) {
            res[k] = callback.call(thisarg, o[k], k, o)
        }
        k++
    }
    return res
}
let arr = [1, 2]

arr = arr.map1(function (item) {
    item + 1
})
console.log(arr)