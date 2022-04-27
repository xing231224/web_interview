<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
        <div class="boxs">
            <ul>
                <li><input type="checkbox"/>梅西</li>
                <li><input type="checkbox"/>内马尔</li>
                <li><input type="checkbox"/>苏亚雷斯</li>
                <li><input type="checkbox"/>伊列斯塔</li>
                <li><input type="checkbox"/>罗伯托</li>
                <li><input type="checkbox"/>拉基蒂奇</li>
             </ul>
        </div>   
      <div class="choice">
         <button onclick="select(1)">全选</button>
         <button onclick="select(2)">全不选</button>
        <button onclick="select(3)">反选</button>
     </div>
        <script type="text/javascript">
            function select(n){
                //获得所有元素
                var items=document.getElementsByTagName('input')
                //遍历
                for(var i=0;i<items.length;i++){
                    switch(n){
                        case 1:items[i].checked=true;break
                        case 2:items[i].checked=false;break
                        case 3:items[i].checked=!items[i].checked;break
                    }
                }
            }
        </script>
</body>
</html>
