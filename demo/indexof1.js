String.prototype.indexof=function(value,index=0){
    
    //没有传入value,强制转换
    if(value==null){
        value="undefined" 
    }
    //小于0
    if(index<0){
        index=0
    }
    //value为空
    if (value == '') {
        return index >= this.length ? this.length : index;
    }
    //大于等于长度
    if(index>=this.length){
        return -1
    }

    var k = index;
    var l = 0;
    while (k < this.length) {
        //对比起始位置是否相同
        if (this.charAt(k) == value.charAt(l)) {
            var i = l++;
            var j = k++;
            //起始位置相同，则比较之后的字符串
            while (i < value.length) {
                //如果不等，
                if (this.charAt(j) != value.charAt(i)) {
                    l = 0;
                    break;
                }
                i++;
                j++;
            }
            if (i == value.length) {
                //对比全部，返回起始下标
                return k-1;
            }
        }
        k++;
    }
    return -1;
}

let str='zxcvbnm'
console.log(str.indexof('',4))//4
console.log(str.indexof('',10))//7
console.log(str.indexof('z',23))  //-1
console.log(str.indexof('z',-4)) //0
console.log(str.indexof())  //-1