
var startTime = new Date().getTime();  //开始时间
var count = 0
var interval = 1000    //间隔时间为1s
var currentInterval = interval   //下次循环间隔
 
console.log('开始时间：' + startTime) // 打印开始时间
 
function loop() {
  count++
  var offset = new Date().getTime() - (startTime + count * interval); // 代码执行到现在所消耗的时间
  currentInterval = interval - offset // 下次循环间隔
 
  // 放大主线程代码执行时间
  var j = 0
  while (j<100000000) { 
    j++
  }
 
  console.log('代码执行时间：'+offset+'ms', '下次循环间隔'+currentInterval+'ms') // 打印 代码执行时间 下次循环间隔

  setTimeout(loop, currentInterval)
}
 
setTimeout(loop, currentInterval)