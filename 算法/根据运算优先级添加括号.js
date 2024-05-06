/*
 * @Author: xing 1981193009@qq.com
 * @Date: 2022-07-04 11:47:41
 * @LastEditors: xing 1981193009@qq.com
 * @LastEditTime: 2024-03-20 14:47:16
 * @FilePath: \web面试题手写\算法\根据运算优先级添加括号.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 现已知一个字符串是由正整数和加减乘除四个运算符(+ - * /)组成。
// 例如存在字符串 const str = '11+2-3*4+5/2*4+10/5'，现在需要将高优先级运算，用小括号包裹起来，例如结果为 '11+2-(3*4)+(5/2*4)+(10/5)'。注意可能会出现连续的乘除运算，需要包裹到一起。
// 请用 javascript 实现这一过程
/**
 * @description: 
 * @param {string} expression
 * @return {*}
 */
function addBrackets(expression) {
    const highOperator = ['*', '/']
    const lowOperator = ['+', '-']
    const numberRegexp = new RegExp(/[0-9]/)
    let i = 0, j = 1, newStr = '', isHighStr = false, storageJ = 0;
    while (j < expression.length) {
        if (lowOperator.includes(expression[j]) && isHighStr) {
            console.log(expression.substring(i, j));
            newStr += `(${expression.substring(i, j)})`;
            i = storageJ;
            isHighStr = false;
        } else if (highOperator.includes(expression[j]) && !isHighStr) {
            while (numberRegexp.test(expression[--storageJ]));
            newStr += expression.substring(i, storageJ + 1)
            i = storageJ + 1;
            isHighStr = true;
        }

        j++;
        storageJ = j;
    }
    newStr += isHighStr ? `(${expression.substring(i, j)})` : expression.substring(i, j);
    return newStr
}

console.log(addBrackets('11+2-3*4+5/2*4+100000/5+10'))