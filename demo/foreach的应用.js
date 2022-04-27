const list=[1,2,3]
const dd=num=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(num*num)
        },1000)
    })
}
function test(){
    list.forEach(async x=>{
        //统计数组长度，通过while循环，把所有元素放入回调函数中
        //一下子把数组中的所有元素添加到当前函数中，
        //相当于一下子执行了多个dd(x)
        const res=await dd(x)
        console.log(res)
    })
}
//foreach中根据数组长度，连续的把数组中的元素添加到返回函数中（添加完）
//test()   //一秒之后连续输出1，4，9

//实现每隔一秒输出一个结果

//for循环，每次判断当前下标，进行逐个运行
async function test1(){
    for(let i=0;i<list.length;i++){
        const res=await dd(list[i])
        console.log(res)
    }
}
//test1()

//  for ..of..
async function test2(){
    for(let x of list){
        const res=await dd(x)
        console.log(res)
    }
}
//test2()

//promise
