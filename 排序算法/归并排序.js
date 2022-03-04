/*
 * @Author: your name
 * @Date: 2021-11-17 14:24:28
 * @LastEditTime: 2021-11-17 14:25:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\排序\归并排序.js
 */
var arr = [1, 5, 3, 5, 9, 6, 11, 8, 1, 88];
/**
 * 归并排序就是递归地将原始数列递归对半分隔，直到不能再分（只剩下一个元素）后，开始从最小的数组向上归并排序
 * 向上归并排序的时候，需要一个暂存数组用来排序，
 * 将待合并的两个数组，从第一位开始比较，小的放到暂存数组，指针向后移，
 * 直到一个数组空，这时，不用判断哪个数组空了，直接将两个数组剩下的元素追加到暂存数组里，
 * 再将暂存数组排序后的元素放到原数组里，两个数组合成一个，这一趟结束。
 */
/**
 * 归并排序核心方法
 * @param left
 * @param right
 * @returns {[]}
 */
let merge = (left, right) => {
  let result = [];
  // 这里进行首次排序
  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  console.log("result", result);
  // 当左右数组长度不等.将比较完后剩下的元素链接起来即可
  return result.concat(left).concat(right);
};

let mergeSort = (arr) => {
  let len = arr.length;
  if (len < 2) {
    // 递归分隔结束处，也是归并排序开始处
    return arr;
  }
  let middle = Math.ceil(len / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  console.log("left", left, "right", right);
  // 这里是递归和归并的核心，先递归分隔，后归并排序
  return merge(mergeSort(left), mergeSort(right));
};

console.log(mergeSort(arr));