/*
 * @Author: your name
 * @Date: 2021-11-17 09:58:50
 * @LastEditTime: 2021-11-17 10:47:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\排序\希尔排序.js
 */
var arr = [1, 5, 3, 5, 9, 6, 11, 8, 1, 88];
/**
 * @description: 希尔排序的实质是分组插入排序，该方法又称缩小增量排序。
 * 该方法的基本思想是：
 *              先将整个待排元素序列分割为若干个子序列（由相隔某个‘增量’的元素组成的）分别进行直接插入排序，
 *              然后依次缩减增量再进行排序，带这个序列中的元素基本有序（增量足够小）时，再对全体元素进行一次直接插入排序。
 *              因为直接插入排序在元素基本有序的情况下（接近最好情况）效率是很高的，因此希尔排序在时间效率上有较大的提高
 * @param {Array<number>}arr
 * @return {Array<number>}
 */
function shellSort(arr) {
  var len = arr.length;
  var temp; //暂存
  do {
    //   设置增量
    len = Math.floor(len / 3) + 1;
    for (var i = len; i < arr.length; i++) {
      if (arr[i] < arr[i - len]) {
        temp = arr[i];
        for (j = i - len; j >= 0 && temp < arr[j]; j -= len) {
          arr[j + len] = arr[j];
        }
        arr[j + len] = temp;
      }
    }
  } while (len > 1);
  return arr;
}

shellSort(arr);
