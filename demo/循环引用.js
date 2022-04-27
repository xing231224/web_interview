/*
 * @Author: your name
 * @Date: 2022-04-27 11:17:04
 * @LastEditTime: 2022-04-27 11:18:57
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\demo\循环引用.js
 */
function dd(obj, p) {
    //数组中保存上一级对象或当前对象
    let parr = p || [obj];
    //遍历当前对象的属性
    for (let key in obj) {
        //属性是对象才需要处理
        if (typeof obj[key] === "object") {
            let flag = false;
            //遍历父级的对象
            parr.forEach((item) => {
                //如果地址相等，则为循环调用
                if (item === obj[key]) {
                    flag = true;
                }
            });
            if (flag) return true;
            //递归处理
            flag = dd(obj[key], [...parr, obj[key]]);
            if (flag) return true;
        }
    }
    return false;
}
const a = {};
a.b = a;

console.log(dd(a));
