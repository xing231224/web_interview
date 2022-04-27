var http=require('http')

function express(){
    //中间件数组
    var func=[]

    var app=function(req,res){
        var i=0
        //在next函数（递归）里执行所有中间件事件
        function next(){
            var task=func[i++]
            if(!task){   //函数不存在
                return
            }
            task(req,res,next)   //执行函数
        }
        next()
    }
    //调用app.use添加中间件，就是往数组里添加事件
    app.use=function(task){
        func.push(task)
    }
    return app
}
var app=express()
http.createServer(app).listen(3000)

//中间件
function dd(req,res,next){
    console.log('中间件')
    next()  //执行next函数
}
app.use(dd)