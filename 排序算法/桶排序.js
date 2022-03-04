/*
 * @Author: your name
 * @Date: 2021-11-17 14:32:13
 * @LastEditTime: 2021-11-17 14:49:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\排序算法\桶排序.js
 */
var arr = [1, 5, 3, 5, 9, 6, 11, 8, 1, 88];
/**
 * 将值为i的元素放入i号桶，最后依次把桶里的元素倒出来。
 * 算法思想：
 *      设置一个定量的数组当作空桶子。
 *      寻访序列，并且把项目一个一个放到对应的桶子去。
 *      对每个不是空的桶子进行排序。
 *      从不是空的桶子里把项目再放回原来的序列中
 */
// let bucketSort = (arr) => {
//   // 声明一个空桶, 将数据压入桶中
//   const bucket = [];
//   // 统计每种数的个数
//   arr.forEach((item) => {
//     if (bucket[item] !== undefined) {
//       bucket[item]++;
//     } else {
//       bucket[item] = 1;
//     }
//   });
//   arr.length = 0;
//   console.log(bucket); // 统计（标注）完成，有必要查看一下
//   bucket.forEach((item, index) => {
//     if (item) {
//       for (let i = 0; i < item; i++) {
//         arr.push(index);
//       }
//     }
//   });
//   return arr;
// };

let insertionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    // i：未排序部分的当前位置
    let value = arr[i]; // 准备插入的值（新牌）
    // j：已排序部分的当前位置
    let j = i - 1; // 已经排好序最后一个元素位置
    // 如果当已排序部分的当前元素大于value
    while (j >= 0 && arr[j] > value) {
      arr[j + 1] = arr[j]; // 将当前元素向后移一位，再将前一位与value比较
      j--;
    }
    // 否则直接插入，新牌落位
    arr[j + 1] = value;
  }
  return arr;
};

let bucketSort = (arr) => {
  let maxValue = arr[0]; // 数组中最大值
  // 求数组中最大值
  arr.forEach((item) => {
    maxValue = maxValue > item ? maxValue : item;
  });
  // 创建桶数组（桶的个数是数组最大值开方向下取整+1，与桶容量对应，桶容量与桶的乘积必须大于等于数组最大元素值）
  const buckets = Array.from({ length: ~~Math.sqrt(maxValue) + 1 }, () => []);
  // 把元素放入对应桶子
  for (let i = 0; i < arr.length; i++) {
    // 计算需要放入的桶的序号（元素值除以桶容量）
    const index = ~~(arr[i] / ~~Math.sqrt(maxValue));
    buckets[index].push(arr[i]);
  }
  // 对每个桶内的元素进行排序
  for (let i = 0; i < buckets.length; i++) {
    // 此处选取插入排序, 空间消耗少,元素少常数时间消耗短
    insertionSort(buckets[i]);
  }
  // 使用rest参数把每个桶子数据合并
  return [].concat(...buckets);
};

console.log(bucketSort(arr));
