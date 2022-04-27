Object.assign1=function(t,...s){
    if(t==null){
        throw new TypeError('cc')
    }
    //获得目标对象
    let ret=Object(t)
    //遍历源对象
    s.forEach(function(obj){
        if(obj!==null){
            //遍历属性
            for(let key in obj){
                if(obj.hasOwnProperty(key)){
                    ret[key]=obj[key]
                }
            }
        }
    })
    return ret
}
let obj={}
let obj1={a:'111'}

let a=Object.assign1(obj,obj1)
console.log(a)