let all1=function(arr){
    let index=0,result=[]
    return new Promise((resolve,reject)=>{
        arr.forEach((p,i)=>{
            //普通值返回成功状态，promise直接返回(不改变成功或者失败状态)
            Promise.resolve(p).then(
                //成功
                val=>{
                index++
                result[i]=val
                if(index===arr.length){
                    //返回全部成功的数组
                    resolve(result)
                }
            },err=>{
                //失败
                reject(err)
            })
        })
    })
}
let p1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1)
    }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(2)
    }, 2000)
})
let p3 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(3)
    }, 3000)
})
all1([p3, p1, p2]).then(res => {
    console.log(res) // [3, 1, 2]
})