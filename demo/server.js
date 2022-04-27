//建立服务器端
let express=require('express')
let app=express()
app.get('/',(req,res)=>{
    /*let {wd ,callback}=req.query
    res.end(`${callback}("${wd}")`)*/
    res.header("Access-Control-Allow-Origin", "*");
    res.end('11111111')
})
app.use(require('cors')())
app.listen(3000)