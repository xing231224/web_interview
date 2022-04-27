<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
   input:<input type="text" name="fname" /><br/>
   数据：<span></span>
   <script type="text/javascript">
       let obj={}
       let input = document.getElementsByTagName('input')[0]
       let span = document.getElementsByTagName('span')[0]

       Object.defineProperty(obj,'b',{
           get(){
               console.log('获取数据')
           },
           set(val){
               console.log('修改数据')
               input.value=val
               span.innerHTML=val
           }
       })

       window.addEventListener('keyup',function(e){
        obj.b=e.target.value
       })
   </script>
   
</body>
</html>