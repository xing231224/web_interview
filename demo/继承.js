
//寄生式继承
function Animal(name) {
    this.name = name
    this.colors = ['black', 'white']
}
Animal.prototype.getName = function() {
    return this.name
}

function aa(name){
    //构造函数继承
    Animal.call(this,name)
}

//原型链jicheng
aa.prototype=Object.create(Animal.prototype)
aa.prototype.constructor=aa

let dog=new aa("hhh")
console.log(dog.getName())

//class继承
class ff{
    constructor(name){
        this.name=name
    }
    getname(){
        return this.name
    }
}
class dd extends ff{
    constructor(name,age){
        super(name)
        this.age=age
    }
}
let a=new dd('hh',12)
console.log(a)

