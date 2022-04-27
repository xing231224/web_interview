/*
 * @Author: your name
 * @Date: 2022-03-07 11:10:39
 * @LastEditTime: 2022-03-07 17:47:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\设计模式\1、单例模式.js
 */
// 单例：指的是创建的总是同一个实例。也就是使用类创建的实例始终是相同的。

const Proson = (function () {
    let instance = null
    return class {
        constructor(a, b) {
            this.a = a
            this.b = b
            if (!instance) {
                instance = this
            } else {
                return instance
            }
        }
    }
})()

let p = new Proson(1, 2)
let p2 = new Proson()

console.log(p);
console.log(p2);
console.log(p === p2);

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            this.name = null
            Singleton.instance = this
        }
        return Singleton.instance
    }
    static getInstance() {
        if (!this.instance) {
            return this.instance = new Singleton()
        }
        return this.instance
    }
}

let s = new Singleton()
let s2 = new Singleton()
console.log(s === s2);