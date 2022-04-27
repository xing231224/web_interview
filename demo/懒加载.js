<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <style>
        .box{
            background-color: #DDD;
            width:200px;
            height:100px;
        }
        .box img{
            opacity: 0;
            transition: opacity 2s;
        }
        
    </style>
        <p>hhhhhhhhhhhhhh</p>
        <br><br><br><br><br><br><br>
        <div class="box">
            <img src='' data-src="./1.jpg"/ style="width:200px; height:100px;">
        </div><br><br><br><br><br><br><br>
        <div class="box">
            <img src='' data-src="./1.jpg"/ style="width:200px; height:100px;">
        </div><br><br><br><br><br><br><br>
        <div class="box">
            <img src='' data-src="./1.jpg"/ style="width:200px; height:100px;">
        </div><br><br><br><br><br><br><br>
        <div class="box">
            <img src='' data-src="./1.jpg"/ style="width:200px; height:100px;">
        </div><br><br><br><br><br><br><br>
        <div class="box">
            <img src='' data-src="./1.jpg"/ style="width:200px; height:100px;">
        </div><br><br><br><br><br><br><br>

        <script type="text/javascript">
            let imglist=[...document.querySelectorAll('img')]
            let len=imglist.length

            const dd=(function(){
                let count=0
                return function(){
                    let dlist=[]
                    imglist.forEach((img,index)=>{
                        let rect=img.getBoundingClientRect()
                        //可视
                        if(rect.top<window.innerHeight){
                            img.src=img.getAttribute('data-src')
                            img.onload=()=>{
                                img.style.opacity=1
                            }
                            count++
                            dlist.push(index)
                            //移除监听
                            if(count===len){
                                document.removeEventListener('scroll',dd)
                            }
                        }
                        
                    })
                    imglist=imglist.filter((img,index)=>{
                        return !dlist.includes(index)
                    })
                }
            })()//自执行

            //监听
            document.addEventListener('scroll',dd)
           
        </script>
    
</body>
</html>
