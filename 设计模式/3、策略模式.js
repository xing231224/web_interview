/*
 * @Author: your name
 * @Date: 2022-03-08 09:58:15
 * @LastEditTime: 2022-03-08 10:18:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\设计模式\3、策略模式.js
 */
function checkAuth(data) {
    if (data.role !== 'juejin') {
        console.log('不是掘金用户');
        return false;
    }
    if (data.grade < 1) {
        console.log('掘金等级小于 1 级');
        return false;
    }
    if (data.job !== 'FE') {
        console.log('不是前端开发');
        return false;
    }
    if (data.type !== 'eat melons') {
        console.log('不是吃瓜群众');
        return false;
    }
}
// 定义 : 要实现某一个功能，有多种方案可以选择。我们定义策略，把它们一个个封装起来，并且使它们可以相互转换
// 使用场景
/**
 * 当你负责的模块，基本满足以下情况时
 * · 各判断条件下的策略相互独立且可复用
 * · 策略内部逻辑相对复杂
 * · 策略需要灵活组合
*/

// 使用策略模式改造
const jobList = ['FE', 'BE'];

// 策略
let strategies = {
    checkRole: function (value) {
        return value === 'juejin'
    },
    checkGrade: function (value) {
        return value > 1
    },
    checkJob: function (value) {
        return jobList.indexOf(value) > 1
    },
    checkEatType: function (value) {
        return value === 'eat melons'
    }
}
// 校验规则
var Validator = function () {
    this.cache = [];

    // 添加策略事件
    this.add = function (value, method) {
        this.cache.push(function () {
            return strategies[method](value)
        })
    }
    // 检查
    this.check = function () {
        for (let i = 0; i < this.cache.length; i++) {
            let vailFn = this.cache[i];
            let data = vailFn();
            if (!data) {
                return false
            }
        }
        return true
    }
}

// 使用策略模式进行操作
let compose = function () {
    var vaildator = new Validator();
    const data = {
        role: "juejin",
        grade: 3
    }
    vaildator.add(data.role, 'checkRole');
    vaildator.add(data.grade, 'checkGrade');
    return vaildator.check()
}

console.log(compose());