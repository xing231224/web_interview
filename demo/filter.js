Array.prototype.filter1=function(callback,thisarg){
    if(this==null){
        throw TypeError('cc')
    }
    if(typeof callback!=='function'){
        throw TypeError('cc')
    }
    const o=Object(this)
    const len=o.length>>>0
    let k=0
    let res=[]
    while(k<len){
        if(k in o){
            if(callback.call(thisarg,o[k],k,o)){
                res.push(o[k])
            }
        }
        k++
    }
    return res
}