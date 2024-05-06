function dd(target, map = new WeakMap()) {
    //循环
    if (map.get(target)) {
        return map.get(target)
    }
    if (target instanceof Object) {
        let newobj;
        if (target instanceof Array) {
            newobj = []
        } else if (target instanceof Function) {
            newobj = function () {
                return target.call(this, ...arguments)
            }
        } else if (target instanceof RegExp) {
            newobj = new RegExp(target.source, target.flags)
        } else if (target instanceof Date) {
            newobj = new Date(target)
        } else {
            newobj = {}
        }
        //标记
        map.set(target, newobj)
        for (let key in target) {
            if (target.hasOwnProperty(key)) {
                newobj[key] = dd(target[key], map)
            }
        }
        return newobj
    } else {
        return target
    }

}
let obj = {
    a: function () {
        console.log('a')
    },
    b: {
        c: 'd'
    },
    d: [1, 2, 3, 4]
}
let r = dd(obj)
console.log(obj.a())
console.log(r)