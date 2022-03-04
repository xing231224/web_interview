/*
 * @Author: your name
 * @Date: 2021-11-17 11:56:48
 * @LastEditTime: 2021-11-17 11:59:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\排序\堆排序.js
 */

/**
 *
 * 算法思想：将待排序序列构造成一个大顶堆（一般升序采用大顶堆，降序采用小顶堆)，此时，整个序列的最大值就是堆顶的根节点。
 *          将其与末尾元素进行交换，此时末尾就为最大值。然后将剩余n-1个元素重新构造成一个堆，这样会得到n个元素的次小值。
 *          如此反复执行，便能得到一个有序序列了
 */
var arr = [1, 5, 6, 8, 7, 4, 9, 12, 77, 7];
let len; // 因为声明的多个函数都需要数列长度，所以把len设置成为全局变量
/**
 * 堆调整
 * @param arr 需要调整的数组
 * @param i 预调整元素下标
 */
let adjustHeap = (arr, i) => {
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  // arr[i]预调整元素
  let max = i;
  // 下面两步找到左右子树中最大的一个的下标
  if (left < len && arr[left] > arr[max]) {
    max = left;
  }
  if (right < len && arr[right] > arr[max]) {
    max = right;
  }
  // 将左右子树的最大值赋给父节点（里面执行说明min有变动）
  if (max !== i) {
    [arr[max], arr[i]] = [arr[i], arr[max]];
    adjustHeap(arr, max); // 这步递归为确保本枝杈下端的最大值提到当前父端（arr[max]）
    // console.log('调整结果', arr) // 调试代码时，这里打一个输出，每次排序结果都抓的死死的
  }
};

let heapSort = (arr) => {
  len = arr.length;
  // 构建大顶堆
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    adjustHeap(arr, i);
  }
  // console.log('大顶堆：', arr) // 调试时这里也是一个关键点
  // 堆排序
  for (let i = len - 1; i > 0; i--) {
    // 将堆顶（树根）置换到相应位置
    [arr[0], arr[i]] = [arr[i], arr[0]];
    len--; // 此时len表示的是未排序的arr长度
    adjustHeap(arr, 0);
  }
  return arr;
};
console.log(heapSort(arr));
