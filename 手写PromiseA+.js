// 地址 https://juejin.cn/post/6844904096525189128

//  promise/A+ 规范的三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    // 构造方法接收一个回调
    constructor(executor) {
        this._status = PENDING   // promise 状态
        this._value = undefined // 存储then回调return的值
        this._resolveQueue = [] // 成功队列，resolve时触发
        this._rejectQueue = []   // 失败队列，reject时触发

        // 由于resolve/reject是在executor内部调用，因此需要使用箭头函数固定this指向，否则找不到this._resolveQueue
        let _resolve = val => {
            // 把resolve 执行回调的操作封装成一个函数，放进settimeout里，以兼容executor是同步代码的情况
            const run = () => {
                if (this._status !== PENDING) return;  //对应规范中的状态只能由pending到fulfilled或rejected
                this._status = FULFILLED;   // 变更状态
                this._value = val    // 存储当前value
                // 这里之所以使用一个队列来存储回调，是为了实现规范要求的‘then方法可以被同一个promise调用多次’
                // 如果使用一个变量而非队列来存储回调，那么即使多次p1.then() 也只会执行一次回调
                while (this._resolveQueue.length) {
                    const callback = this._resolveQueue.shift()
                    callback(val)
                }
            }
            setTimeout(run)
        }
        // 实现同resolve
        let _reject = val => {
            const run = () => {
                if (this._status !== PENDING) return;
                this._status = REJECTED;
                this._value = val
                while (this._rejectQueue.length) {
                    const callback = this._rejectQueue.shift()
                    callback(val)
                }
            }
            setTimeout(run)
        }
        // new Promise()时立即执行executor，并传入resolve和reject
        executor(_resolve, _reject)
    }
    // then 方法
    then(resolveFn, rejectFn) {
        // 根据规范，如果then的参数不是function，则我们需要忽略它，让链式调用继续往下执行
        typeof resolveFn !== 'function' ? resolveFn = value => value : null
        typeof rejectFn !== 'function' ? rejectFn = reason => {
            throw new Error(reason instanceof Error ? reason.message : reason)
        } : null
        // return 一个新的promise
        return new MyPromise((resolve, reject) => {
            // 把resolveFn 重新包装一下，再push进resolve执行队列，这是为了能够获取回调的返回值进行分类讨论
            const fulfilledFn = value => {
                try {
                    // 执行第一个（当前的）promise的成功回调，并获取返回值
                    let x = resolveFn(value)
                    // 分类讨论返回值，如果是promise，那么等待promise状态变更，否则直接resolve
                    // 这里resolve之后，就能被下一个.then()的回调获取到返回值，从而实现链式调用
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
                } catch (error) {
                    reject(error)
                }
            }
            // reject 同理
            const rejectedFn = error => {
                try {
                    let x = rejectFn(error)
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
                } catch (error) {
                    reject(error)
                }
            }
            switch (this._status) {
                // 当状态为pending时，把then回调push进resolve/reject执行队列，等待执行
                case PENDING:
                    // 把后续then收集的依赖都push进当前的promise的成功回调队列中(_resolveQueue),这是为了保证顺序调用
                    this._resolveQueue.push(fulfilledFn)
                    this._rejectQueue.push(rejectedFn)
                    break;
                case FULFILLED:
                    fulfilledFn(this._value)
                    break;
                case REJECTED:
                    rejectedFn(this._value)
                    break;
            }

        })
    }
    // catch() 方法返回一个promise，并且处理拒绝的情况。
    //         它的行为与调用promise.prototype.then(undefined,onRejected)相同
    //  catch 方法其实就是执行then的第二个回调
    catch(rejectFn) {
        return this.then(undefined, rejectFn)
    }
    // finally()方法 返回一个promise。在promise结束时，无论结果是fulfilled或者是rejected,都会执行指定的回调函数。
    //              在finally之后，还可以继续then。并且会将值原封不动的传递给后面的then
    finally(callback) {
        return this.then(
            value => MyPromise.resolve(callback()).then(() => value),     // MyPromise.resolve执行回调,并在then中return结果传递给后面的Promise
            reason => MyPromise.reject(callback()).then(() => { throw reason }) // reject 同理 
        )
    }
    // 静态的resolve 方法
    static resolve(value) {
        if (value instanceof MyPromise) return value //根据规范，如果参数是promise实例，直接return这个实例
        return new MyPromise(resolve => resolve(value))
    }
    // 静态的reject 方法    返回一个带有拒绝原因的promise 的对象
    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason))
    }

    //  静态的 all 方法   
    //  返回一个promise实例，此实例在iterable 参数内所有的promise都‘完成（resolved）’或参数中不包含promise时回调完成（resolve）
    //  如果参数中promise有一个失败(rejected)，此实例回调失败(reject),失败原因是一个失败promise的结果
    static all(promiseArr) {
        let index = 0
        let result = []
        return new MyPromise((resolve, reject) => {
            promiseArr.forEach((p, i) => {
                MyPromise.resolve(p).then(
                    val => {
                        index++;
                        result[i] = val
                        // 所有then执行后，resolve 结果
                        if (index === promiseArr.length) {
                            resolve(result)
                        }
                    },
                    err => {
                        // 有一个promise被reject时，MyPromise的状态变为reject
                        reject(err)
                    }
                )
            })
        })
    }
    // race 方法返回一个promise，一旦迭代器中的某个promise解决或者拒绝，返回的promise就会解决或者拒绝
    static race(promiseArr) {
        return new MyPromise((resolve, reject) => {
            // 同时执行promise，如果有一个promise的状态发生改变，就变更更新MyPromise的状态
            for (let p of promiseArr) {
                MyPromise.resolve(p).then( // promise.resolve(p)用于处理传入值不为promise的情况
                    value => {
                        resolve(value) // 注意这个是上边 new MyPromise的
                    },
                    err => {
                        reject(err)
                    }
                )
            }
        })
    }
}


