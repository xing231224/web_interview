

Promise.any1=function(arr){
    let index=0
    return new Promise((resolve,reject)=>{
        //如果为空数组，直接返回
        if(arr.length===0) return
        arr.forEach((item,i)=>{
            Promise.resolve(item).then(
                val=>{
                    resolve(val)
                },err=>{
                    index++
                    if(index===arr.length){
                        reject(new AggregateError('All promises were rejected'))
                    }
                }
            )
        })
    })
}
let p1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        reject(1)
    }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        reject(2)
    }, 2000)
})
let p3 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        reject(3)
    }, 3000)
})
Promise.any([p3,p1,p2]).then(res=>console.log(res))