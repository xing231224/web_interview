/*
 * @Author: your name
 * @Date: 2022-03-04 10:32:19
 * @LastEditTime: 2023-06-16 14:46:06
 * @LastEditors: xing 1981193009@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\手写防抖函数.js
 */
// 函数防抖的实现
function debounce(fn, wait) {
    let timer = null
    return function () {
        let _this = this,
            args = arguments;
        // 如果此时存在定时器的话，则取消之前的定时器重新记时
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        // 设置定时器，使事件间隔指定事件后执行
        timer = setTimeout(() => {
            fn.apply(_this, args)
        }, wait)
    }
}

// 函数节流的实现
function throttle(fn, delay) {
    let curTime = Date.now();
    return function () {
        let _this = this,
            args = arguments,
            nowTime = Date.now();
        // 如果两次的时间间隔超过了指定时间，则执行函数
        if (nowTime - curTime >= delay) {
            curTime = Date.now();
            return fn.apply(_this, args)
        }
    }
}