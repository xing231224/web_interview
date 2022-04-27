Array.prototype.reduce1=function(callback,init){
    if (this == null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    const o=Object(this)
    const len=o.length>>>0
    let k=0
    
    let acc   //初始值
    if(arguments.length>1){
        acc=init
    }else{
        //没传入初始值，则数组中第一个非空元素为初始值
        while(k<len&& !(k in o)){
            k++
        }
        if(k>len){
            throw new TypeError('no init value')
        }
        acc=o[k++]
    }
    while(k<len){
        if(k in o){
            acc=callback(acc,o[k],k,o)
        }
        k++
    }
    return acc
}
arr=[1,2,3,4,5]
console.log(arr.reduce1((a,b)=>a+b))