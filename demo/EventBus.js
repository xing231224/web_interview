//仓库
class EventBus{
    constructor(){
        this.events={}
    }
    //添加
    on(name,fn){
        //有这个属性则添加，没有则赋值
        if(this.events[name]){
            this.events[name].push(fn)
        }else{
            this.events[name]=[fn]
        }
    }
    //移除(事件名下的某个fn)
    off(name,fn){
        //获得事件数组
        let tasks=this.events[name]
        if(tasks){
            //找到fn(函数名或者匿名函数),找不到返回-1
            const index=tasks.findIndex(f=>f===fn||f.callback===fn)
            if(index>=0){
                //删除
                tasks.splice(index,1)
            }
        }
    }
    //触发,once只触发一次
    emit(name,once=false,...args){
        if(this.events[name]){
            //触发的事件里如果又添加了相同的事件名，会陷入死循环
            let tasks=this.events[name].slice()
            for(let fn of tasks){
                //执行
                fn(...args)
            }
            if(once){
                delete this.events[name]
            }
        }
    }
}
let eventBus = new EventBus()
let fn1 = function(name, age) {
	console.log(`${name} ${age}`)
}
let fn2 = function(name, age) {
	console.log(`hello, ${name} ${age}`)
}
eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)

eventBus.off("aaa",fn1)
eventBus.emit('aaa', false, '布兰', 12)