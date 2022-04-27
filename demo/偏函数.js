function dd(fn,...args){
    return (...arg)=>{
        return fn(...args,...arg)
    }
}

function add(x,y,z){
    console.log(x,y,z)
}

dd(add,1,2)(3)