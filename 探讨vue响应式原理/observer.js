/*
 * @Author: your name
 * @Date: 2021-09-27 10:40:05
 * @LastEditTime: 2021-09-27 15:31:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web面试题手写\探讨vue响应式原理\observer.js
 */
import { arrayMethods } from "./array";
import Dep from "./dep";
/**
 * Observer类会通过递归的方式把一个对象的所有属性都转化成可观测对象
 * **/
export class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep(); //实例化一个依赖管理器，用来收集数组依赖
    // 给value新增一个__ob__属性，值为该value的Observer实例
    // 相当于为value打上标记，表示他已经被转化为响应式了，避免重复操作
    def(value, "__ob__", this);
    if (Array.isArray(value)) {
      // 当前value为数组的逻辑
      const augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      def(obj, keys[i]);
    }
  }
}

/**
 * @description: 数据劫持
 * @param {object} obj 目标对象
 * @param {string} key 目标对象的key
 * @param {object} value 目标对象的某个key的值
 */
function def(obj, key, value) {
  //  如果值传了obj和key，那么value = obj[key]
  if (arguments.length === 2) {
    value = obj[key];
  }
  if (typeof value === "object") {
    new Observer(value);
  }
  let childOb = observe(value)
  const dep = new Dep(); // 实例化一个依赖管理器，生成依赖管理数组dep
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`${key}被读取了`);
      dep.depend(); // 在getter 中收集依赖
      if(childOb){
          childOb.dep.depend()
      }
      return value;
    },
    set(newVal) {
      if (value === newVal) return;
      console.log(`${key}被修改成了${newVal}`);
      value = newVal;
      dep.notify(); // 在setter中通知依赖更新
    },
  });
}


/***
 * 尝试为value创建一个Observer实例，如果创建成功，直接返回新创建的Observer实例
 * 如果value 已经存在一个Observer实例，则直返回它
*/
export function observe(value,asRootData){
    if(!isObject(value) || value instanceof VNode)return;
    let ob 
    if(hasOwn(value,'__ob__')&& value.__ob__ instanceof Observer){
        ob = value.__ob__

    }else{
        ob = new Observer(value)
    }
    return ob
}


// 能力检测：判断__proto__是否可用，因为有浏览器不支持该属性
export const hasProto = "__proto__" in {};

const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/***
 * 通过拦截增加目标对象或者数组
 * 原型链使用__proto__
 * */
function protoAugment(target, src, keys) {
  target.__proto__ = src;
}

/**
 * 通过定义来扩充目标对象或者数组
 */
function copyAugment(target, src, keys) {
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
}
