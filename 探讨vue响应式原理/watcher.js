/*
 * @Author: your name
 * @Date: 2021-09-27 11:18:20
 * @LastEditTime: 2021-09-27 14:12:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web面试题手写\探讨vue响应式原理\watcher.js
 */
export default class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.cb = cb;
    this.getter = parsePath(exp);
    this.value = this.get()
  }
  get(){
    window.target = this 
    const vm  = this.vm
    let value = this.getter.call(vm,vm)
    window.target = undefined;
    return value
  }
  update(){
      const oldValue = this.value
      this.value = this.get()
      this.cb.call(this.vm,this.value,oldValue)
  }
}

/**
 * 解析路径
 * 把一个形如 'data.a.b.c' 的字符串路径所表示的值，从真实的data对象提取出来
 * 例如：
 * data = {a:{b:{c:2}}}
 * parsePath("a.b.c")(data) //2
 * **/
const bailRE = /[^\w.$]/;
export function parsePath(path) {
  if (bailRE.test(path)) return;
  const segments = path.split(".");
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
