/*
 * @Author: your name
 * @Date: 2021-09-27 14:46:06
 * @LastEditTime: 2021-09-28 09:17:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web面试题手写\探讨vue响应式原理\array.js
 */
const arrayProto = Array.prototype;
// 创建一个对象作为拦截器
export const arrayMethods = Object.create(arrayProto);
// 改变数组自身的内容的7个方法
const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

/**
 * 拦截变异方法并触发事件
 * */
methodsToPatch.forEach((method) => {
  const original = arrayProto[method]; //缓存原生方法
  Object.defineProperty(arrayMethods, method, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function mutator(...args) {
      const result = original.apply(this, args);
      const ob = this.__ob__;
      ob.dep.notify();
      return result;
    },
  });
});

