<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
       
        
    </style>
</head>
<body>
    
   

        

    <input type="button" name="" id="btn" value="添加" />
    <ul id="ul1">
        <li>111</li>
        <li>222</li>
        <li>333</li>
        <li>444</li>
    </ul>




    <script type="text/javascript">
       window.onload = function(){
            var oBtn = document.getElementById("btn");
            var oUl = document.getElementById("ul1");
            
            var num = 4;
            
            oUl.onmouseover=function(ev){
                var ev=ev || window.event
                var target=ev.target ||ev.srcElement
                if(target.nodeName.toLowerCase()=='li'){
                    target.style.background="pink"
                }
            }
            oUl.onmouseout=function(ev){
                var ev=ev || window.event
                var target=ev.target || ev.srcElement
                if(target.nodeName.toLowerCase()=='li'){
                    target.style.background="#fff"
                }
            }
            oBtn.onclick = function(){
                num++;
                var oLi = document.createElement('li');
                oLi.innerHTML = 111*num;
                oUl.appendChild(oLi);
            };
            
        }
    </script>
</body>
</html>