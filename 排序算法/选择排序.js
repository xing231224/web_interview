/*
 * @Author: your name
 * @Date: 2021-11-16 09:19:37
 * @LastEditTime: 2021-11-16 10:27:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\快速排序.js
 */
var arr = [1, 5, 6, 8, 7, 4, 9, 12, 77, 7];
/**
 * @description: 选择排序 - 从第一项开始 依次拿出后面的项与第一项对比,如果比第一项小 则互换位置 否则不变
 * @param {Array<number>} arr
 * @return {Array<number>}
 */
function selectionSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        var num = arr[i];
        arr[i] = arr[j];
        arr[j] = num;
      }
    }
  }

  return arr;
}
console.log(selectionSort(arr));
