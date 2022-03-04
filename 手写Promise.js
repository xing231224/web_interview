/*
 * @Author: your name
 * @Date: 2022-03-02 10:15:33
 * @LastEditTime: 2022-03-02 11:55:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\手写Promise.js
 */
class myPromise {
    constructor(fn) {
        // 定义三个状态
        this.PENDING = 'pending'  // 进行中
        this.RESOLVED = "resolved" // 已成功
        this.REJECTED = 'rejected' // 已失败
        this.state = this.PENDING // 初始化状态
        this.value = null //用于保存 resolve 或者reject 传入的值
        this.resolvedCallbacks = [] //用于保存 resolve的回调函数
        this.rejectedCallbacks = [] //用于保存 reject 的回调函数
        try {
            fn(this.resolve, this.reject)
        } catch (e) {
            // 遇到错误时，捕获错误，执行reject函数
            this.reject(e);
        }
    }
    // 状态转变为resolved 方法
    resolve = (value) => {
        // 判断传入元素是否为promise 值，如果是，则状态改变必须等待前一个状态改变后再进行改变
        if (value instanceof myPromise) {
            return value.then(this.resolve, this.reject)
        }
        // 保证代码的执行顺序为本轮事件循环的末尾
        setTimeout(() => {
            // 只有状态为pending是才能改变
            console.log(this);
            if (this.state === this.PENDING) {
                // 修改状态
                this.state = this.RESOLVED
                // 设置传入的值
                this.value = value

                // 执行回调函数
                this.resolvedCallbacks.forEach(cb => {
                    cb(value)
                })
            }
        }, 0)

    }
    // 状态转变为reject方法
    reject = (value) => {
        // 保证代码的执行顺序为本轮事件循环的末尾
        setTimeout(() => {
            // 只有状态为pending时才能改变
            if (this.state === this.PENDING) {
                // 修改状态
                this.state = this.REJECTED
                // 设置传入的值
                this.value = value

                // 执行回调函数
                this.rejectedCallbacks.forEach(cb => {
                    cb(value)
                })
            }
        }, 0)
    }
}
myPromise.prototype.then = function (onResolved, onRejected) {
    // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
    onResolved =
        typeof onResolved === 'function' ? onResolved : (value) => value
    onRejected =
        typeof onRejected === 'function' ? onRejected : error => { throw error }
    // 如果是等待状态，则将函数加入对应列表中
    if (this.state === this.PENDING) {
        this.resolvedCallbacks.push(onResolved)
        this.rejectedCallbacks.push(onRejected)
    }
    // 如果状态已经凝固，则直接执行对应状态的函数
    if (this.state === this.RESOLVED) return onResolved(this.value)
    if (this.state === this.REJECTED) return onRejected(this.value)

}


let a = new myPromise((resolve, reject) => {
    resolve('成功')
})
a.then((res, err) => {
    console.log(res, err);
})
console.log(a);


