/*
 * @Author: your name
 * @Date: 2022-03-04 11:16:02
 * @LastEditTime: 2022-03-04 11:31:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\手写类型判断函数.js
 */

function getType(value) {
    // 判断数据是null的情况
    if (value === null) return value + ""
    // 判断数据类型是基本数据类型的情况和函数的情况
    if (typeof value !== "object") return typeof value
    // 判断数据类型是引用类型的情况
    let valueClass = Object.prototype.toString.call(value),
        type = valueClass.split(" ")[1].split("");
    type.pop();
    return type.join("").toLowerCase();

}