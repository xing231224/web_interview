Promise.race1=function(arr){
    return new Promise((resolve,reject)=>{
        arr.forEach((item,i) => {
            Promise.resolve(item).then(val=>{
                resolve(val)
            },err=>{
                reject(err)
            })
        });
    })
}