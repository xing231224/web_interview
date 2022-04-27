//浅拷贝
let obj={
    "hh":"hhh",
    d:{
        "k":"kk"
    }
}

function scopy(obj){
    //创建一个新对象
    let newobj={}
    //遍历所有属性，赋值给新对象
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            newobj[key]=obj[key]
        }
    }
    return newobj
}
let obj1=scopy(obj)
console.log(obj.d===obj1.d)   



