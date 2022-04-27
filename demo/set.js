function set (target, key, val) {

    //1,开发环境target 没定义或者是基础类型报错
    if (process.env.NODE_ENV !== 'production' &&
      (isUndef(target) || isPrimitive(target))
    ) {
      warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
    }

    // 2，如果是数组，就用splice()重写数组
    if (Array.isArray(target) && isValidArrayIndex(key)) {// 对比数组的key值和数组长度，取较大值设置为数组的长度
      target.length = Math.max(target.length, key)// 替换目标值
      target.splice(key, 1, val)
      return val
    }
    
    // 3,如果是对象本身的属性，则直接添加
    if (key in target && !(key in Object.prototype)) {
      target[key] = val
      return val
    }

     // 判断目标值是否为响应式的
    const ob = (target: any).__ob__

    // 4,如果是vue实例，或者是根数据data 就警告
    if (target._isVue || (ob && ob.vmCount)) { 
      process.env.NODE_ENV !== 'production' && warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
        'at runtime - declare it upfront in the data option.'
      )
      return val
    }
    // 如果目标值不是响应式的，不需要将其定义成响应式
    if (!ob) { 
      target[key] = val
      return val
    }
    // 其他情况，目标值是响应式的，就通过Object.defineProperty进行数据监听
    defineReactive(ob.value, key, val)
    // 通知更新dom操作
    ob.dep.notify()
    return val
  }