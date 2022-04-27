Promise.resolve1=function(value){
    //如果是promise直接返回
    if(value instanceof Promise){
        return value
    }
    //resolve(value)
    return new Promise(resolve=>resolve(value))
}

let d=Promise.resolve1(1)
console.log(d)