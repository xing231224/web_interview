/**
 *  reduce数组的方法，
 *      可以对数组中的每个元素依次执行一个回调函数，
 *      从左到右依次累积计算出一个最终的值
 *  arr:reduce(callback(accumulator,currentValue[,index[,array]])[,initialValue])
 *  
 * 其中，callback 是每个元素执行的回调函数，其包含4个参数：
 *  · accumulator: 累积器，即上一次回调函数执行的返回值
 *  · currentValue: 当前元素的值
 *  · index: 当前元素的下标
 *  · array: 原始数组
 * initialValue 是可选的，表示累积器的初始值
 * reduce 函数的执行过程如下：
 *   1、如果没有提供initialValue，则将数组的第一个元素作为累积器的初始值，否则将initialValue作为累积器的初始值
 *   2、从数组的第二个元素开始，依次对数组中的每个元素执行回调函数
 *   3、回调函数的返回值作为下一次回调函数执行的累积器的值
 *   4、对数组中的每个元素执行完回调函数后，reduce函数返回最后一次回调函数的返回值，即最终的累积值
 * 
 */


/** 计算数组中每个元素出现的次数 */
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']
const count = fruits.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = (accumulator[currentValue] || 0) + 1
    return accumulator
}, {})

/** 拍平嵌套数组（数组扁平化） */
const nestedArray = [[1, 2], [3, 4], [5, 6]]
const flattenedArray = nestedArray.reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])

/** 按条件分组 */
const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 25 },
    { name: "Emily", age: 30 },
]
const groupedPeople = people.reduce((accumulator, currentValue) => {
    const key = currentValue.age
    if (!accumulator[key]) {
        accumulator[key] = []
    }
    accumulator[key].push(currentValue)
    return accumulator
}, {})

/** 将多个数组合并为一个对象 */
const keys = ['name', 'age', 'gender'];
const values = ['Alice', 25, 'female']
const person = keys.reduce((accumulator, currentValue, index) => {
    accumulator[currentValue] = values[index]
    return accumulator
}, {})

/** 将字符串转换成对象 */
const str = 'key1=value1&key2=value2&key3=value3';
const obj = str.split(',').reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split('=');
    accumulator[key] = value
    return accumulator
}, {})

/** 将对象转换为查询字符串 */
const params = { foo: 'bar', baz: 42 };
const queryString = Object.entries(params).reduce((accumulator, [key, value]) => `${accumulator}${key}=${value}&`, '?').slice(0, -1)
