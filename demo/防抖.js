var count=1
var container=document.getElementById('container')

//触发的函数
function addcount(e){
    container.innerHTML=count++
}
//鼠标移动,300ms后触发
let action=fd(addcount,1000,true)
container.onmousemove=action

//取消按钮
let btn=document.getElementById('btn')
btn.onclick=function(){
    action.cancel()
}
//防抖函数
function fd(func,wait,immediate){
    //定时器，返回值
    let t,result

    let callfunc=function(){
        //this
        const athis=this
        //e
        const args=arguments
         //清除上轮的定时器
        if(t){
            clearTimeout(t)
        }
        //是否立即执行
        if(immediate){
            let call=!t
            //置空定时器
            t=setTimeout(function(){
                t=null
            },wait)
            if(call){
                func.apply(athis,args)
            }
        }else{
            t=setTimeout(function(){
                func.apply(athis,args)
            },wait)
        }
    }
    //清除定时器
    callfunc.cancel=function(){
        clearTimeout(t)
        t=null
    }
    return callfunc 
}