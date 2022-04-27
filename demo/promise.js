class Promise{
    //接收一个函数（执行者）
    constructor(executor){
        //参数校验
        if(typeof executor!=='function'){
            throw new TypeError(`${executor} is not a function`)
        }
        this.initValue()
        this.initbind()

        try{
            //执行者接收两个参数执行
            executor(this.resolve,this.reject)
        }catch(e){
            //捕获错误传递给reject函数
            this.reject(e)
        }
    }
    //绑定this
    initbind(){
        this.resolve=this.resolve.bind(this)
        this.reject=this.reject.bind(this)
    }
    initValue(){
        //初始化
        this.value=null
        this.reason=null
        this.state=Promise.PENDING
        this.onFulfilledCallbacks=[]  //成功回调
        this.onRejectedCallbacks=[]   //失败回调
    }
    resolve(value){
        //状态不可逆
        if(this.state===Promise.PENDING){
            this.state=Promise.FULFILLED
            this.value=value
            //状态改变再执行then中的onFulfilled函数（在此执行onFulfilled函数）
            this.onFulfilledCallbacks.forEach((fn)=>fn(this.value))
        }
    }
    reject(reason){
        if(this.state===Promise.PENDING){
            this.state=Promise.REJECTED
            this.reason=reason
            //状态改变再执行then中的onRejected函数（在此执行onRejected函数）
            this.onRejectedCallbacks.forEach((fn)=>fn(this.reason))
        }
    }
    then(onFulfilled,onRejected){
        //检验参数
        if(typeof onFulfilled !=='function'){
            onFulfilled=function(value){
                return value
            }
        }
        if(typeof onRejected !=='function'){
            onRejected=function(reason){
                throw reason
            }
        }
        //链式调用
        let promise2=new Promise((resolve,reject)=>{
            //如果状态为成功，执行onFulfilled函数
            if(this.state===Promise.FULFILLED){
                //实现异步
                setTimeout(()=>{
                    try{
                        const x=onFulfilled(this.value)
                        Promise.resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            }
            //如果状态为失败，执行onRejected函数
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
            //如果状态为等待，需要状态改变之后再执行
            if(this.state===Promise.PENDING){
                //onFulfilled函数添加到队列中
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
//用于解决如果then中返回的是一个新的promise函数
Promise.resolvePromise = function(promise2,x,resolve,reject){
    //x 与 promise 相等
    if(promise2===x){
        reject(new TypeError('Chaining cycle detected for promise'))
    }
    let called=false
    
    if(x instanceof Promise){
        //x 为 Promise
        x.then(
            value=>{
                Promise.resolvePromise(promise2,value,resolve,reject)
            },reason=>{
                reject(reason)
        })
    
    }else if(x!==null &&(typeof x==='object'||typeof x==='function')){
        //x 为对象或函数
        try{
            const then=x.then
            if(typeof then ==='function'){
                then.call(
                    x,
                    value=>{
                    //优先采用首次调用并忽略剩下的调用
                    if(called) return
                    called=true
                    Promise.resolvePromise(promise2,value,resolve,reject)
                },reason=>{
                    //优先采用首次调用并忽略剩下的调用
                    if(called) return
                    called=true
                    reject(reason)
                })
            }else{
                //优先采用首次调用并忽略剩下的调用
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
        //普通类型
        resolve(x)
    }

}

Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }
  module.exports = Promise;
  


