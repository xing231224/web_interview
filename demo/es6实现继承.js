class p{
    constructor(name){
        this.name=name
    }
    say(){
        console.log(this.name)
    }
}
class s extends p{
    constructor(name,age){
        super(name)
        this.age=age
    }
    sayy(){
        console.log(this.name,this.age)
    }
}