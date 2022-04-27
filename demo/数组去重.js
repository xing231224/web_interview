function dd(arr){
    let res=arr.filter((item,index,array)=>{
        return array.indexOf(item)===index
    })
    return res
}
let arr=[1,1,2,3,3,4]

console.log(dd(arr))

arr=[...new Set(arr)]
console.log(arr)