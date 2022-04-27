Promise.reject1=function(value){
    return new Promise((resolve,reject)=>reject(value))
}


Promise.reject1(1).then(null,reason=>{
    console.log(reason)
})