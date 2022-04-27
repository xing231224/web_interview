const express=require('express')
//创建实例
const app=express()
//监听端口
app.listen(3000)
//使用路由
const router=express.Router()
router.post('/home',(req,res)=>{
    res.send('post')
})
router.get('/about',(req,res)=>{
    res.send('get')
})
//中间件
const dd=function(request,response,next){
    if(request.url==='/'){
        response.writeHead(200,{"Content-Type": "text/plain;charset=UTF8" })
    }
    next()
}
app.use('/',dd,router)


