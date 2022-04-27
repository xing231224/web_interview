/*
 * @Author: your name
 * @Date: 2022-04-27 11:17:04
 * @LastEditTime: 2022-04-27 11:22:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\demo\次数最多的单词.js
 */
function dd(str){
    if(!str){
        return
    }
    let arr=str.trim().toLowerCase().match(/[a-z]+/g)
    let result=[]
    let maxnum=0
    let maxstr=''

    //模板
    let str2=" "+arr.join(" ")+" "

    arr.forEach(item=>{
        if(result.indexOf(item)<0){
            result.push(item)
            let word=new RegExp(" "+item+" ","g")
            let num=str2.match(word).length
            if(num>maxnum){
                maxnum=num
                maxstr=item
            }
        }
    })
    return maxstr+":"+maxnum

}
    
  article= "Age has reached the end of the beginning of a word. May be guilty in his seems to passing a lot of different life became the appearance of the same day;"
  
console.log(dd(article))