class Sub{
    constructor(){
        this.state=0
        this.arr=[]
    }
    add(ob){
        this.arr.push(ob)
    }
    get(){
        return this.state
    }
    set(val){
        this.state=val
        //通知观察者队列
        this.notify()
    }
    notify(){
        this.arr.forEach(item=>{
            item.update()
        })
    }

}

//创建观察者，传入观察者名字和观察对象
class Ob{
    constructor(name,sub){
        this.name=name
        this.sub=sub
        //往sub的观察者队列中加入自己
        this.sub.add(this)
    }
    update(){
        console.log(this.name+`观察到数据变化为：${this.sub.get()}`)
    }
}

		// 实例化一个主题
		let s = new Sub()
		// 添加观察者实例
		let o1 = new Ob('o1',s)
       
        let o2 = new Ob('o2',s)
		// 设置状态
		s.set(2)
        s.set(3)

