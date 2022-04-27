let count=1
let container=document.getElementById('container')
let btn=document.getElementById('btn')
function addcount(){
    container.innerHTML=count++
}
let action=dd(addcount,1000,{a:true,b:false})
container.onmousemove=action
//删除
btn.onclick=function(){
    action.cancel()
}

//节流函数
//第一次立即触发，之后每隔一段时间触发
/*
function dd1(func,wait){
    const athis,args
    let old=0
    return function(){
        athis=this
        args=arguments
        //当前时间戳
        let now=+new Date()
        if(now-old>wait){
            //执行
            func.apply(athis,args)
            old=now
        }
    }
}
//最后一次触发
function dd(func,wait){
    let athis,args
    let t
    return function(){
        athis=this
        args=arguments
        //定时器存在不执行
        if(!t){
           t=setTimeout(()=>{
                t=null
                func.apply(athis,args)
            },wait)
        }
    }
}*/

function dd(func,wait,options){
    let t,athis,args
    let old=0
    if(!options) options={}

    let callfunc=function(){
        athis=this
        args=arguments

        //时间戳
        let now=+new Date()
        //old为0，第一次调用，但是false禁止第一次调用
        //如果为false,不进入时间戳的处理
        if(!old && options.a===false){
            old=now
        }
        let rema=wait-(now-old)  //下次触发剩余时间
        if(rema<=0 || rema>wait){
            //清除定时器
            if(t){
                clearTimeout(t)
                t=null
            }

            old=now
            func.apply(athis,args)
            if (!timeout) context = args = null;

        //定时器
        //只有定时器为null,上一次执行完才可以再次进入
        //如果为false,不进入定时器的处理
        }else if(!t && options.b !== false){    
            t=setTimeout(()=>{

                //处理old
                old=options.a===false?0:new Date().getTime()

                t=null
                func.apply(athis,args)
                if (!timeout) context = args = null;
            },rema) //时间戳触发后的剩余时间（触发定时器）
        }

    }
    callfunc.cancel=function(){
        clearTimeout(t)
        old=0
        t=null
    }
    return callfunc
}