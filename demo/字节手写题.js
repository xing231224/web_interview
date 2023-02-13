const obj = {
  data: [
    ['xiaoming', 'male', '18', 'beijing', '2020-01-02'],
    ['xiaofang', 'female', '18', 'shanghai', '2020-03-02']
  ],
  columns: [
    { name: 'name', note: '' },
    { name: 'gender', note: '' },
    { name: 'age', note: '' },
    { name: 'address', note: '' },
    { name: 'registerTime', note: '' },
  ]
}


function dd(obj) {
  let map = []
  let res = []
  for (let item of obj.columns) {
    map.push(item.name)
  }
  for (let i = 0; i < obj.data.length; i++) {
    let newobj = {}
    for (let j = 0; j < map.length; j++) {
      newobj[map[j]] = obj.data[i][j]
    }
    res.push(newobj)
  }
  return res
}
console.log(dd(obj))