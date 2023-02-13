Object.assign1 = function (t, ...s) {
    if (t === null) {
        throw new TypeError('cc')
    }
    let ret = Object(t)  //当前对象
    //枚举源对象的每个对象
    s.forEach(function (obj) {
        if (obj !== null) {
            //把对象中的属性复制到目标对象中
            for (let key in obj) {
                //obj自身中有该属性
                if (obj.hasOwnProperty(key)) {
                    ret[key] = obj[key]
                }
            }
        }
    })
    return ret
}
let obj = {}
let obj1 = {
    a: 'hhhh'
}
let a = obj.assign1({}, obj1)
console.log(a)