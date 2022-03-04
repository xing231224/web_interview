/*
 * @Author: your name
 * @Date: 2021-11-17 14:53:46
 * @LastEditTime: 2021-11-17 14:55:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\排序算法\基数排序.js
 */
var arr = [1, 5, 6, 8, 7, 4, 9, 12, 77, 7];
/**
 * 将整数按位数切割成不同的数字，按每位分别分组即完成排序。不只是适用整数，也适用于字符串和特定格式的浮点数等
 * 算法思想：
 *         取得数组中的最大位数；
 *         在循环中按照个/十/百等基数位进行分组，最后依次按当前基数位从0到9遍历到原数组中，即利用LSD(次位优先)进行基数排序
 *         每个基数位如此循环一次即排好序
 */
let radixSort = (arr) => {
  let mod = 10; // 进制/基数，常见还有以radix为变量名
  let dev = 1; // 用来取进制位数据
  let maxDigit = 0; // 最大位数
  let counter = [];
  // 获取最大位数
  arr.forEach((item) => {
    let digit = item.toString().split("").length;
    maxDigit = digit > maxDigit ? digit : maxDigit;
  });
  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (let j = 0; j < arr.length; j++) {
      // 提取相应进制位的数据（个位/十位/百位...），相当于桶排序的桶的编号
      let bucket = Math.floor((arr[j] % mod) / dev);
      // 初始化统计数组
      if (counter[bucket] == null) {
        counter[bucket] = [];
      }
      // 对应入组（这步相当于排序），利用LSD(次位优先)进行基数排序
      counter[bucket].push(arr[j]);
    }
    let pos = 0;
    for (let j = 0; j < counter.length; j++) {
      let value = null;
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value;
        }
      }
    }
    // console.log('arr', arr) // 这里可以得到按个位、十位...排序结果
  }
  return arr;
};
