/*
 * @Author: your name
 * @Date: 2021-09-22 14:43:39
 * @LastEditTime: 2021-11-04 11:38:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web面试题手写\手写浅拷贝和深拷贝.js
 */

//  -----------------------浅拷贝
// 只是把对象的属性和属性值拷贝到另一个对象中

// 方式一
function shallowCopy1(o) {
  let obj = {};
  for (let i in o) {
    obj[i] = o[i];
  }
  return obj;
}
// 方式二
function shallowCopy2(o) {
  return { ...o };
}
// 方式三
function shallowCopy3(o) {
  return Object.assign({}, o);
}

// -----------------------------深拷贝
function deepClone(o) {
  if (!isObject(o)) return o;
  // 检测是否为对象或者数组
  let objArr = Array.isArray(o) ? [] : {};
  if (Object.prototype.toString.call(o) === "[object Object]") {
    for (let i in o) {
      if (typeof o[i] == "object") {
        objArr[i] = deepClone(o[i]);
      } else {
        objArr[i] = o[i];
      }
    }
  } else {
    o.forEach((item, index) => {
      if (isObject(item)) {
        objArr[index] = deepClone(item);
      } else {
        objArr.push(item);
      }
    });
  }
  return objArr;
}

function deepCopy(o, hash = new Map()) {
  if (!isObject(o)) return o;
  if (hash.has(0)) return hash.get(o);
  let objArr = Array.isArray(o) ? [] : {};
  hash.set(o, objArr);
  for (let i in o) {
    if (isObject(o[i])) {
      objArr[i] = deepCopy(o[i]);
    } else {
      objArr[i] = o[i];
    }
  }
  return objArr;
}

function deepCopyT(o) {
  let result = {};
  let loopList = [
    {
      parent: result,
      key: undefined,
      data: o,
    },
  ];
  while (loopList.length) {
    let node = loopList.pop();
    let { parent, key, data } = node;
    let anoPar = parent;
    if (typeof key !== "undefined") {
      anoPar = parent[key] = {};
    }
    for (let i in data) {
      if (typeof data[i] === "object") {
        loopList.push({
          parent: anoPar,
          key: i,
          data: data[i],
        });
      } else {
        anoPar[i] = data[i];
      }
    }
  }
  return result;
}

function isObject(o) {
  return (
    Object.prototype.toString.call(o) === "[object Object]" ||
    Object.prototype.toString.call(o) === "[object Array]"
  );
}

let a = {
  a: 1,
  b: [
    {
      a: 1,
      b: 2,
    },
  ],
};

var b = deepCopy(a)
b.a = 15
console.log(a);
console.log(b);