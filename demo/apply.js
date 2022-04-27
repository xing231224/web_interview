function person(a,b,c){
    return {
        name:this.name,
        a,b,c
    }
}
let dd={name:'hhhhh'}

Function.prototype.newapply=function(obj,arr){
    var obj=obj||window 
    var result
    obj.b=this
    //判断是否有参数
    if(!arr){
        //如果没有直接执行
        result=obj.b()
    }else{
        var newarguments=[]
        for(let i=0;i<arr.length;i++){
            newarguments.push('arr['+i+']')
        }
        result=eval('obj.b('+newarguments+')')
    }   
    delete obj.b
    return result
}

let ff=person.newapply(dd,[1,2,3])
console.log(ff)
