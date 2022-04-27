var arr = [1,2,3,4,5,6,7,8,9,10];
let len=arr.length
while(len){
    let i=Math.floor(Math.random()*len--)
    let temp=arr[len]
    arr[len]=arr[i]
    arr[i]=temp
}
console.log(arr)