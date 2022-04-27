let arr=['a','b','c','d']

function dd(arr,index){
    if(index==arr.length-1){
        return arr[index]
    }else{
        return {[arr[index]]:dd(arr,index+1)}
    }
}
console.log(JSON.stringify(dd(arr,0)))
