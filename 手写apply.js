/*
 * @Author: your name
 * @Date: 2021-09-22 09:10:32
 * @LastEditTime: 2021-11-30 14:53:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web面试题手写\手写apply.js
 */
Function.prototype.myApply = function (context) {
  // 判断this 是不是函数
  if (typeof this !== "function") {
    throw new TypeError("Not a Function");
  }
  let result;
  // 默认是window
  context = context || window;
  //保存this
  context.fn = this;
  //   是否传参
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn();

  return result;
};
