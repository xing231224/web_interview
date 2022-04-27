const http=require('http')

http.createServer((req,res)=>{
    /*
    if(req.url==='/'){
        res.writeHead(200,{'Content-Type':'text/html;charset=UTF8'})
        res.write('第一个页面')
        res.end()
    }
    else if(req.url==='/about'){
        res.writeHead(200,{'content-Type':'text/html;charset=UTF8'})
        res.end('about')
    }
    else{
        res.writeHead(400,{'content-Type':'text/plain;charset=UTF8'})
        res.end('404')
    }*/
    var content=''
    //接收数据
    req.on('data',function(chunk){
        content+=chunk
    })
    req.on('end',function(){
        res.writeHead(200,{'content-Type':'text/html;charset=UTF8'})
        res.write('数据'+content)
        res.end()
    })

}).listen(3000)
