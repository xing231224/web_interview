Array.prototype.indexof = function (value, index) {
    //引用者不能为空
    if (this == null) {
        throw new TypeError('kkkk')
    }
    //保存该数组
    var o = Object(this)
    var len = o.length >>> 0
    //数组长度为0
    if (len === 0) {
        return -1
    }
    //开始的位置
    var n = index || 0

    //如果传入的起始位置无穷大
    if (Math.abs(n) === Infinity) {
        n = 0
    }
    //起始位置大于数组长度
    if (n >= len) {
        return -1
    }
    //传入的起始位置可以是正数，也可以是负数（如果负数超出长度取0）
    var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)
    //从起始位置开始查找
    while (k < len) {
        if (k in o && o[k] === value) {
            return k
        }
        k++
    }
    //如果找不到
    return -1

}

let arr = [1, 2, 3, 4, 5]
console.log(arr.indexof(3, 3)) //2