/*
 * @Author: your name
 * @Date: 2022-03-04 17:23:21
 * @LastEditTime: 2022-03-07 11:09:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\实现数组扁平化.js
 */

// 1、递归实现
/**
 * @description: 普通的递归思路很容易理解，就是通过循环递归的方式，一项一项地去遍历，如果每一项还是一个数组，那么就继续往下遍历，利用递归程序的方法，来实现数组的每一项的连接：
 * @param {Array} arr
 * @return {*}
 */
function flatten(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result
}


// 2、reduce 函数迭代
/**
 * @description: 从上面普通的递归函数中可以看出，其实就是对数组的每一项进行处理，那么其实也可以用reduce 来实现数组的拼接，从而简化第一种方法的代码，改造后的代码如下所示
 * @param {Array} arr
 * @return {*}
 */
function flatten(arr) {
    return arr.reduce((pre, next) => {
        return pre.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}

// 3、扩展运算符实现
/**
 * @description: 这个方法的实现，采用了扩展运算符和 some 的方法，两者共同使用，达到数组扁平化的目的：
 * @param {Array} arr
 * @return {*}
 */
function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}
