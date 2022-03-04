/*
 * @Author: your name
 * @Date: 2021-11-16 11:39:52
 * @LastEditTime: 2021-11-16 18:01:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\排序\插入排序.js
 */
var arr = [1, 5, 3, 5, 9, 6, 11, 8, 1, 88];
/**
 * @description:直接插入排序：将第一个数和第二个数排序，然后构成一个有序序列；将第三个数插入进去，构成一个新的有序序列；对第四个数、第五个数......直到最后一个数，重复第二步
 * @param {Array<number>}arr
 * @return {Array<number>}
 */

function insertSort(arr) {
  if (arr.length <= 1) return arr;
  for (var i = 1; i < arr.length; i++) {
    var nowdata = arr[i];
    while (nowdata > arr[i - 1] && i - 1 >= 0) {
      arr[i] = arr[i - 1];
      i--;
    }
    arr[i] = nowdata;
  }
  return arr;
}


// 二分插入排序
/**
 * @description:1，从第一个元素开始，认为该元素已排序。
 *              2，取出下一个元素，在已排序序列中二分查找到第一个比它大的数的位置
 *              3，将元素插入到该位置后
 *              4，重复上述两步
 * @param {Array<number>}arr
 * @return {Array<number>}
 */
function twoInsertSort(arr) {
  if (arr.length <= 1) return arr;
  for (var i = 1; i < arr.length; i++) {
    var currentData = arr[i],
      left = 0,
      right = i - 1;
    while (left <= right) {
      var middle = parseInt((left + right) / 2);
      if (currentData < arr[middle]) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    for (var j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }
    arr[left] = currentData;
  }
  return arr;
}
console.log(twoInsertSort(arr));
