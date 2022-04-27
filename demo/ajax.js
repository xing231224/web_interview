const getJson=function(url){
    return new Promise((resolve,reject)=>{
        //创建对象
        const xhr=XMLHttpRequest ? new XMLHttpRequest() :new ActiveXObject('Mscrosoft.XMLHttp')
        //指定服务器端处理页面(请求类型，地址，同步)
        xhr.open('GET',url,false)
        //设置请求头信息
        xhr.setRequestHeader('Accept','application/json')
        //接收响应结果
        xhr.onreadystatechange=function(){
            //4：读取服务器响应结束
            if(xhr.readyState !==4 ) return
            if(xhr.status==200||xhr.status==304){
                resolve(xhr.responseText)
            }else{
                reject(new Error(xhr.responseText))
            }
        }
        //发送请求
        xhr.send()
    })
}