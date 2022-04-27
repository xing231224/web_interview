class Promise{
    constructor(executor){
        //校验参数
        if(typeof executor!=='function'){
            throw new TypeError(`Promise resolver ${executor} is not a function`)
        }
        //初始化
        this.initValue()
        this.initBind()

        try{
            executor(this.resolve,this.reject)
        }catch(e){
            this.reject(e)
        }
        

    }
    initValue(){
        this.value=null
        this.reason=null
        this.state=Promise.PENDING
        //等待返回的promise执行结束，再执行then
        this.onFulfilledCallbacks=[]
        this.onRejectedCallbacks=[]
    }
    initBind(){
        this.resolve=this.resolve.bind(this)
        this.reject=this.reject.bind(this)
    }
    resolve(value){
        if(this.state===Promise.PENDING){
            this.state=Promise.FULFILLED
            this.value=value
            //执行队列
            this.onFulfilledCallbacks.forEach(fn=>fn(this.value))
        }
    }
    reject(reason){
        if(this.state===Promise.PENDING){
            this.state=Promise.REJECTED
            this.reason=reason
            //执行队列
            this.onRejectedCallbacks.forEach(fn=>fn(this.reason))
        }
    }
    then(onFulfilled,onRejected){
        //校验参数
        if(typeof onFulfilled !== 'function'){
            onFulfilled=function(value){
                return value
            }
        }
        if(typeof onRejected !== 'function'){
            onRejected=function(reason){
               throw reason
            }
        }
        //链式
        let promise2=new Promise((resolve,reject)=>{
            if(this.state===Promise.FULFILLED){
                setTimeout(()=>{
                    try{
                        const x=onFulfilled(this.value)
                        Promise.resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.state===Promise.REJECTED){
                setTimeout(()=>{
                    try{
                        const x=onRejected(this.reason)
                        Promise.resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.state===Promise.PENDING){
                //加入队列
                this.onFulfilledCallbacks.push(value=>{
                    setTimeout(()=>{
                        try{
                            const x=onFulfilled(this.value)
                            Promise.resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
                this.onRejectedCallbacks.push(reason=>{
                    setTimeout(()=>{
                        try{
                            const x=onRejected(this.reason)
                            Promise.resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            }
        })
        return promise2
    }
}
Promise.PENDING='pending'
Promise.FULFILLED='fulfilled'
Promise.REJECTED='rejected'

Promise.resolvePromise=function(promise2,x,resolve,reject){
    //x=promise2
    if(x===promise2){
        reject(new TypeError('Chaining cycle detected for promise'))
    }
    let called=false
    if(x instanceof Promise){
        x.then(value=>{
            Promise.resolvePromise(promise2,value,resolve,reject)
        },reason=>{
            reject(reason)
        })
    }else if(x!==null &&(typeof x==='object'||typeof x==='function')){
        try{
            const then=x.then
            if(typeof then==='function'){  //判断then是不是函数
                then.call(x,value=>{
                    if(called) return
                    called=true
                    Promise.resolvePromise(promise2,value,resolve,reject)
                },reason=>{
                    if(called) return
                    called=true
                    reject(reason)
                })
            }else{   //不是函数
                if(called) return
                called=true
                resolve(x)
            }
        }catch(e){
            if(called) return
            called=true
            reject(e)
        }
    }else{
        resolve(x)
    }
}
Promise.defer = Promise.deferred = function() {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
  }
  module.exports = Promise