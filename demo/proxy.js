let person={
    name:'pwww',
    age:18
}

let obj=new Proxy(person,{
    get(target,pname){
        return Reflect.get(target,pname)
    },
    set(target,pname){
         Reflect.set(target,pname)
    },
    deleteProperty(){
        return Reflect.deleteProperty(target,pname)
    }
})
console.log(person.name)
person.name="zzj"
person.hh="hhhh"
console.log(person)