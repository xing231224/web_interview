/**
 * 该方法的参数是promise实例数组，
 * 然后其then注册的回调方法时数组中的某个promise的状态变为fulfilled的时候就执行
 * 因为promise的状态只能改变一次，那么我们只需要把promise.race中产生的promise对象的resolve方法，
 * 注入到数组中的每一个promise实例中的回调函数中即可
*/

const promiseRace = function (args) {
    return new Promise((resolve, reject) => {
        for (let i = 0, len = args.length; i < len; i++) {
            args[i].then(resolve, reject)
        }
    })
}
let a = new Promise(resolve => resolve(1))
let b = new Promise((resolve, reject) => reject(2))
let c = new Promise(resolve => resolve(3))
let p = promiseRace([b])
console.log(p);