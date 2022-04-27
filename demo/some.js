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
    
    while(k<len){
        if(k in o){
            if(callback.call(thisarg,o[k],k,o)){
                return true
            }
        }
        k++
    }
    return false
}