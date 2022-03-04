/*
 * @Author: your name
 * @Date: 2021-11-16 10:11:45
 * @LastEditTime: 2021-11-16 11:36:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\冒泡排序.js
 */
var arr = [1, 5, 3, 5, 9, 6, 11, 8, 1, 88];

/**
 * @description: 冒泡排序 -比较两个相邻的项 如果前项大于后项 则交换位置 否则不
 * @param {Array<number>} arr
 * @return {Array<number>}
 */
function bubbleSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var num = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = num;
      }
    }
  }
  return arr;
}
console.log(bubbleSort(arr));
