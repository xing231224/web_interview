var dd=item=>{
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve(item)
    },2000)
  }).then(res=>{
    console.log(`${res}完成`)
  })
}

async function fn(){
  let arr=[1,2,3,4,5]  //任务队列
  let pool=[]   //并发池
  let max=2
  for(let i=0;i<arr.length;i++){
    let task=dd(arr[i])
    pool.push(task)
    task.then(res=>{
      pool.splice(pool.indexOf(task),1)
      console.log(`${arr[i]}结束，当前并发数：${pool.length}`)
    })
    if(pool.length===max){
      await Promise.race(pool)
    }
  }
}
fn()