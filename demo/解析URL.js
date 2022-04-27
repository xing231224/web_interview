function parseParam(url) {
    //截取
    const str=/.+\?(.+)$/.exec(url)[1]
    //保存到数组
    const arr=str.split('&')
    //新对象
    let obj={}
    //遍历数组
    arr.forEach(item => {
        //等号
        if(/=/.test(item)){
            let [key,val]=item.split('=')
            //解码
            val=decodeURIComponent(val)
            //数字
            val=/^\d+$/.test(val)? parseFloat(val):val
            //存到obj中
            if(obj.hasOwnProperty(key)){
                obj[key]=[].concat(obj[key],val)
            }else{
                obj[key]=val
            }
        }else{
            obj[item]=true
        }
    });
    return obj
}
url="https://blg.csdn.net/?name=pp&hh=oo&uu"
console.log(parseParam(url))

