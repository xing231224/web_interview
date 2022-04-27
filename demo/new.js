//构造函数，参数
function newn(Fc,...args){
    //建立空对象
    const obj={}
    //把空对象指向构造函数的原型
    obj.__proto__=Fc.prototype
    
    //如果构造函数存在返回值对象，则把对象返回
    let result=Fc.apply(obj,args)
    return result instanceof Object ? result:obj

}
//构造函数
function Fc(name,age){
    this.name=name
    this.age=age
}
Fc.prototype.getname=function(){
    console.log(this.name)
}

let p=newn(Fc,'pp',19)
p.getname()

