function add1 (...args) {
    //求和
    return args.reduce((a, b) => a + b)
}
function currying (fn,...args) {
    return function(...rest) {
        if (rest.length) {
            return currying(fn,...args,...rest)
        } else {
            return fn.call(this,...args)
        }
    }
}
let add = currying(add1)
console.log(add(1)(2)(3)(4, 5)())  //15
console.log(add(1)(2)(3, 4, 5)())  //15
console.log(add(1)(2, 3, 4, 5)())  //15