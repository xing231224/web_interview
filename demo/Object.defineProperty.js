let person={name:'pwww',age:18}
let obj={}

function dd(obj,name,val){
    
    Object.defineProperty(obj,name,{
        get(){
            return val
        },
        set(newval){
            return val=newval
        }
    })
}
function ff(obj){
 
    for(let key in obj){
        dd(obj,key,obj[key])
    }
}

ff(person)
console.log(person.name)
person.age=11
console.log(person.age)