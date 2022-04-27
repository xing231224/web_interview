function dd(things){
  //初始化
  let promise=Promise.resolve()
  things.forEach(thing => {
    promise=promise.then(()=>{
      //返回promise对象
      return new Promise(resolve=>{
        setTimeout(()=>{
          console.log(thing)
          //状态
          resolve()
        },1000)
      })
    })
  });
  return promise
}
dd([1,2,3,4])

function dd(arr){
  let p=Promise.resolve()
  arr.reduce((a,b)=>{
      return a.then(res=>{
          return new Promise(resolve=>{
              setTimeout(()=>{
                  console.log(b)
                  resolve()
              },1000)
          })
      })
  },p)
  
}
dd([1,2,3])