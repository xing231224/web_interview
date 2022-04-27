var start=new Date().getTime()
var count=0
var intver=1000
var cur=intver

console.log("开始时间：",start)

function loop(){
    count++
    var offset=new Date().getTime()-(start+count*intver)
    cur=intver-offset
    console.log("代码执行时间：",offset,"下次间隔时间：",cur)
    setTimeout(loop,cur)
}
setTimeout(loop,cur)