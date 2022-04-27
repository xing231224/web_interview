function curry(fn,...args){
    //如果参数够了，直接返回
    if(args.length>=fn.length){
        return fn(...args)
    }
    //参数不够，则进行拼接(返回一个函数，接收下一个括号内的数据)
    return (...rest)=>{
        return curry(fn,...args,...rest)
    }
}

function add(x,y,z){
    return x+y+z
}

console.log(curry(add)(1,2,3))