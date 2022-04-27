<!--<!DOCTYPE html>
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

        let imgList = [...document.querySelectorAll('img')]
        let length = imgList.length


 const imgLazyLoad = (function() {
    let count = 0
    
    return function() {
        let deleteIndexList = []
        //遍历图片
        imgList.forEach((img, index) => {
            let rect = img.getBoundingClientRect()
            //出现在可视窗口时，开始加载
            if (rect.top < window.innerHeight) {
                //更改地址
                img.src=img.getAttribute('data-src')
                //设置透明度
                img.onload=()=>{
                    img.style.opacity=1
                }  
                deleteIndexList.push(index)
                count++
                //加载完所有图片之后，移除滚动条的监听事件
                if (count === length) {
                    document.removeEventListener('scroll', imgLazyLoad)
                }
            }
        })
        //加载过的图片从列表中移除
        imgList = imgList.filter((img, index) => !deleteIndexList.includes(index))
   }

})()

//监听滚动事件
document.addEventListener('scroll', imgLazyLoad)


    </script>
</body>
</html>-->
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
        const imglist=document.querySelectorAll('img')
       const dd=arr=>{
           arr.forEach(entry=>{
               if(entry.isIntersecting){
                   const img=entry.target
                   img.src=img.getAttribute('data-src')
                   img.onload=()=>{
                       img.style.opacity=1
                   }
                   //取消观察
                   observe.unobserve(img)
               }
           })
       }
        const observe=new IntersectionObserver(dd)
        imglist.forEach(img=>{
            //观察
            observe.observe(img)
        })
        
    </script>
</body>
</html>