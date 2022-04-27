function person(){
    console.log(this.name)
}
person.prototype.hh="hhhhhh"

let obj={name:'obj的name'}

Function.prototype.newbind=function(obj){
    //person对象
    var that=this
    var arr=Array.prototype.slice.call(arguments,1)
    //用于实现原型链继承
    let o=function(){}

    var callfn=function(){
        var arr1=Array.prototype.slice.call(arguments)
        var arrsum=arr.concat(arr1)

        if(this instanceof o){
            //this指向实例对象
            that.apply(this,arrsum)
        }else{
            that.apply(obj,arrsum)
        }
    }
    //实现原型链的连接
    o.prototype=that.prototype
    callfn.prototype=new o

    return callfn
}


let tt=person.newbind(obj)
tt()
