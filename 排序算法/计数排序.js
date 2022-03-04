/*
 * @Author: your name
 * @Date: 2021-11-17 14:27:54
 * @LastEditTime: 2021-11-17 14:29:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\排序\计数排序.js
 */
var arr = [1, 5, 3, 5, 9, 6, 11, 8, 1, 88];
/**
 * 算法思想：
 * 找出待排序的数组中最大和最小的元素；
 * 统计数组中每个值为 i 的元素出现的次数，存入临时数组的第 i 项；
 * 统计完毕后，对次数不为0的元素进行遍历，遍历区间即 [ min <= j <= max ]；
 * 将统计的下标j作为填充元素，j对应的元素（值为 i 的元素出现的次数）作为元素的个数填充到目标数组，这样即完成排序
 *
 */
let countingSort = (arr) => {
  let maxValue = arr[0]; // 数组中最大值
  let minValue = arr[0]; // 数组中最小值
  // 求数组中最大值
  arr.forEach((item) => {
    maxValue = maxValue > item ? maxValue : item;
  });
  // 求数组中最小值
  arr.forEach((item) => {
    minValue = minValue < item ? minValue : item;
  });

  let sortedIndex = 0; // 遍历排序时的数组下标
  let bucket = []; // 临时用来标注的’桶‘（元素存在标注1，否则0）
  // 统计每种数的个数
  for (let i = 0; i < arr.length; i++) {
    if (!bucket[arr[i]]) bucket[arr[i]] = 0;
    bucket[arr[i]]++;
  }
  // console.log(bucket) // 统计（标注）完成，有必要查看一下
  // 从最小下标开始到最大下标，遍历赋值完成排序
  for (let j = minValue; j <= maxValue; j++) {
    while (bucket[j] > 0) {
      arr[sortedIndex] = j;
      sortedIndex++;
      bucket[j]--; // 1 => 0
    }
  }
  return arr;
};
console.log(countingSort(arr));
