Object.create1=function(proto,p=undefined){
    if(typeof proto !=='object'&&typeof proto!=='function'){
        throw new TypeError('cc')
    }
    if(p===null){
        throw new TypeError('cc')
    }
    //创建对象
    function F(){}
    F.prototype=proto
    const obj=new F()
    //传入参数
    if(p!==undefined){
        Object.defineProperties(obj,p)
    }
    //没有传入对象
    if(proto==null){
        obj.__proto__=null
    }
    return obj
}