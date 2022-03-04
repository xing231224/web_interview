/*
 * @Author: your name
 * @Date: 2021-09-22 09:03:28
 * @LastEditTime: 2021-09-22 09:09:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web面试题手写\手写call.js
 */
Function.prototype.myCall = function (context) {
    // 先判断调用myCall是不是一个函数
    // 这里的this就是调用myCall的
    if(typeof this !== "function"){
        throw new TypeError("Not a Function")
    }
    // 不传参数默认为window
    content = context || window
    // 保存this
    context.fn = this
    // 保存参数
    let args = Array.from(arguments).slice(1)  // Array.from 把伪数组对象转化为数组
    // 调用函数
    let result = context.fn(...args)

    delete context.fn

    return result
};
