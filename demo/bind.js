function person(x){
    console.log(this.name)

}
//原型链上的属性
person.prototype.rrr='rrr'

let dd={name:"hhhhhh"}

Function.prototype.newbind=function(obj){
    //that为person函数
    var that=this
    //截取参数(除去this)
    var arr=Array.prototype.slice.call(arguments,1)
    var o=function(){}

    let callfn= function(){
        //柯里化的应用（获取第二个括号的参数）
        var arr1=Array.prototype.slice.call(arguments)
        arrsum=arr.concat(arr1)
       
        //this指向实例化对象b
        if(this instanceof o){
            //person的this指向实例化对象
            //实现new操作符，this的绑定
            that.apply(this,arrsum)
        }else{
            that.apply(obj,arrsum)
        } 
    }
    //把person的原型对象赋值给实例对象（b）的原型对象
    o.prototype=that.prototype
    callfn.prototype=new o

    return callfn
}

//gg为newbind中返回的函数callfn
var gg=person.newbind(dd,1)

//new callfn的this会指向实例化对象b
var b= new gg('bbbb实例')
console.log(b.rrr)