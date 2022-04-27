function person(a,b,c){
    return {
        name:this.name,
        a,b,c
    }
}
var egg = {name:'hhhh'}

Function.prototype.newcall=function(obj){
    var obj=obj||window
    obj.b=this

    var newarguments=[]
    for(var i=1;i<arguments.length;i++){
        newarguments.push('arguments['+i+']')
    }
    var result=eval('obj.b('+newarguments+')')
    delete obj.b

    //返回参数
    return result
}
//把person的this指向egg对象
let dd=person.newcall(egg,1,2,3)
console.log(dd)