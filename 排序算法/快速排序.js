/*
 * @Author: your name
 * @Date: 2021-11-17 09:33:51
 * @LastEditTime: 2021-11-17 09:51:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\排序\快速排序.js
 */
var arr = [1, 5, 3, 5, 9, 6, 11, 8, 1, 88];

/**
 * @description: （1）在数据集之中，选择一个元素作为”基准”（pivot）。
 * （2）所有小于”基准”的元素，都移到”基准”的左边；所有大于”基准”的元素，都移到”基准”的右边。
 * （3）对”基准”左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
 * @param {Array<number>}arr
 * @return {Array<number>}
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  var middle = arr.splice(Math.ceil(arr.length / 2), 1)[0],
    left = [],
    right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= middle) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(middle, quickSort(right));
}
console.log(quickSort(arr));
