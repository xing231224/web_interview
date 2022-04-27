source = [{
    id: 1,
    pid: 0,
    name: 'body'
  }, {
    id: 2,
    pid: 1,
    name: 'title'
  }, {
    id: 3,
    pid: 2,
    name: 'div'
  }]

  function dd(data){
      if(!Array.isArray(data)){
        return data
      }
      let result=[]
      let map={}
      data.forEach(item=>{
          map[item.id]=item
      })
      console.log(map)
      data.forEach(item=>{
          let p=map[item.pid]
          if(p){
            (p.children||(p.children=[])).push(item)
          }else{
              result.push(item)
          }
      })
      return result
  }
  console.log(dd(source))