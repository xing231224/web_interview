
Promise.allSettled1=function(arr){
    let result=[]
    return new Promise((resolve,reject)=>{
        arr.forEach((item,i)=>{
            Promise.resolve(item).then(
                val=>{
                    result[i]={
                        status:'fulfilled',
                        value:val
                    }
                    if(result.length===arr.length){
                        resolve(result)
                    }
                },err=>{
                    result[i]={
                        status:'rejected',
                        reason:err
                    }
                    if(result.length===arr.length){
                        resolve(result)
                    }
                }
            )
        })
    })
}