<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <style type="text/css">
            .warp {
                display: inline-block;
                vertical-align: bottom;
                position: relative;

            }

            .warp-content {
                border: 1px solid red;
                width: 150px;
                height: 150px;
                line-height: 150px;
                text-align: center;
            }

            input {
                position: absolute;
                top: 0;
                left: 0;
                border: 1px solid red;
                width: 150px;
                height: 150px;
                opacity: 0;
                cursor: pointer;
            }

            img {
                width: 300px;
                height: 300px;
                border: 1px solid red;
                margin-top: 50px;
                vertical-align: bottom;
            }
        </style>
    </head>
    <body>
        <div class="fileBox">
            
            <div class="warp">
                <div class="warp-content">点击上传</div>
                <input type="file" id="file" />
            </div>

            <img src="" />
        </div>
        <script type="text/javascript">
            var file = document.getElementById('file');
            var image = document.querySelector("img");
            
            file.onchange = function() {
                //获取上传的文件
                var fileData = this.files[0];
                
                //判断文件的类型是否为图片
                var pettern = /^image/;
                if (!pettern.test(fileData.type)) {
                    alert("图片格式不正确");
                    return;
                }

                //把上传的文件转化格式：data:url的字符串形式表示
                var reader = new FileReader();
                reader.readAsDataURL(fileData);

                //可以在此进行axios请求，发送数据到后端
                reader.onload = function(e) {
                    image.setAttribute("src", this.result)
                }
            }
        </script>
    </body>
</html>