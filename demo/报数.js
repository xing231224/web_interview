function dd(){
let arr=[]
for(let i=0;i<30;i++){
    arr[i]=i+1
}
console.log(arr)

let leave=0  //离开人数
let count=0  //报数
let index=0  //数组下标

while(leave<29){
    if(arr[index]!==0){
        count++
    }
    if(count==3){
        leave++
        arr[index]=0
        count=0
    }
    index++
    if(index==arr.length){
        index=0
    }
}
for(let i=0;i<30;i++){
    if(arr[i]!==0){
        return arr[i]
    }
}
}
console.log(dd())