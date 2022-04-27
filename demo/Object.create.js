Object.create1=function(proto,propertyObject=undefined){
    //如果proto参数不是 null 或非原始包装对象
    if(typeof proto !=='object' && typeof proto !=='function'){
        throw new TypeError('Object prototype may only be an Object or null.')
    }
    //属性不可以传入null
    if(propertyObject==null){
        throw new TypeError('无法将未定义或null转换为对象')
    }
    //创建函数
    function F(){}
    //函数的原型，指向传入的构造函数
    F.prototype=proto
    //创建实例
    const obj=new F()
    if(propertyObject!==undefined){
        //往obj上添加属性
        Object.defineProperties(obj,propertyObject)
    }
    if(proto==null){
        //创建一个没有原型的对象
        obj.__proto__=null
    }
    return obj
}