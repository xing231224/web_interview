/*
 * @Author: your name
 * @Date: 2021-09-22 09:15:32
 * @LastEditTime: 2021-09-22 09:23:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web面试题手写\手写bind.js
 */
Function.prototype.myBind = function (context) {
    //  判断是否是一个函数
    if (typeof this !== "function") {
        throw new TypeError("Not a Function")
    }
    // 保存调用bind的函数
    const _this = this
    // 保存 参数
    const args = Array.prototype.slice.call(arguments, 1)
    // 返回一个函数
    return function F() {
        // 判断是不是new 出来的
        if (this instanceof F) {
            // 如果是new出来的
            // 返回一个空对象,且使创建出来的实例的_proto_指向_this的prototype,且完成函数的柯里化
            return new _this(...args, ...arguments)
        } else {
            // 如果不是new出来的改变this指向，且完成函数科里化
            return _this.apply(context, args.concat(...arguments))
        }
    }
}