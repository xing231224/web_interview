/*
 * @Author: your name
 * @Date: 2021-09-27 10:54:04
 * @LastEditTime: 2021-09-27 11:05:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web面试题手写\探讨vue响应式原理\dep.js
 */
/***
 * Dep类依赖管理器
 * */
export default class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  // 删除一个依赖
  removeSub(sub) {
    remove(this.subs, sub);
  }
  // 添加一个依赖
  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }
  // 通知所有依赖更新
  notify() {
    const subs = this.subs.slice();
    for (let i = 0;  i < subs.length; i++) {
        subs[i].update()
    }
  }
}

/**
 * 从数组中删除一个项
 * **/
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) return arr.splice(index, 1);
  }
}
