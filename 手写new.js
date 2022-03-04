/*
 * @Author: your name
 * @Date: 2021-09-22 14:23:46
 * @LastEditTime: 2021-09-22 14:28:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web面试题手写\手写new.js
 */
function myNew (fn,...args){
    // 创建一个空对象
    let obj = { }
    // 使空对象的隐式原型指向原函数的显式原型
    obj.__proto__ = fn.prototype
    // this 指向 obj
    let result = fn.apply(obj,args)
    //返回
    return result instanceof Object ? result : obj
    
}