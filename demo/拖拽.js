<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .hh{
            position:absolute;
            display: block;
            width: 200px;
            height: 200px;
            background-color: pink;
            cursor:move;
        }
    </style>
</head>
<body>
    <div class="hh" id="drag">hhhhh</div>
    <script>
        window.onload=function(){
            var drag=document.getElementById('drag')
            drag.onmousedown=function(e){
                e=e||window.event
                //点击位置距离浏览器左边的距离-物体边框距离浏览器的距离
                var diffx=e.clientX-drag.offsetLeft
                var diffy=e.clientY-drag.offsetTop

                
                document.onmousemove=function(e){
                e=e||window.event
                var left=e.clientX-diffx
                var top=e.clientY-diffy

                //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
                if(left<0){
                    left=0
                }else if(left>window.innerWidth-drag.offsetWidth){
                    left=window.innerWidth-drag.offsetWidth
                }
                if(top<0){
                    top=0
                }else if(top>window.innerHeight-drag.offsetHeight){
                    top=window.innerHeight-drag.offsetHeight
                }

                //
                drag.style.left=left+'px'
                drag.style.top=top+'px'

            }
            document.onmouseup=function(e){
                this.onmousemove=null
                this.onmousedown=null

            }
            }
            
        }
    </script>
</body>
</html>