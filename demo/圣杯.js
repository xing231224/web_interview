<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        
      
        .mid{
            float:left;
            height:300px;
            width:100%;
            background-color: aqua;
        }
        .hz{
            margin:0 200px;
        }
        .left{
            float:left;
            height:300px;
            width:200px;
            background-color: plum;
            margin-left:-100%;
            
        }
        .right{
            float:left;
            height:300px;
            width:200px;
            background-color: plum;
            margin-left:-200px;
            
        }
        
    </style>
</head>
<body>
    <div id="outer">
        <div class="hh mid">
            <div class="hz">中间</div>
        </div>
        <div class="hh left">左</div>
        <div class="hh right">右</div>
    </div>
</body>
</html>
