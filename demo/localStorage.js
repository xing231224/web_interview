/*
 * @Author: your name
 * @Date: 2022-04-27 11:17:00
 * @LastEditTime: 2022-04-27 11:19:46
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\demo\localStorage.js
 */
class xstorage {
    constructor() {
        this.source = window.localStorage;
    }
    set(key, value, expires) {
        var source = this.source;
        //保存
        source[key] = JSON.stringify(value);
        //设置了时间
        if (expires) {
            source[`${key}__expires__`] = Date.now() + expires;
        }
        return value;
    }
    get(key) {
        var source = this.source;
        //获得上次的时间
        var expired = source[`${key}__expires__`] || Date.now() + 1;
        //获得当前时间
        var now = Date.now();
        //对比
        if (now >= expired) {
            this.remove(key);
            return;
        }
        const value = source[key] ? JSON.parse(source[key]) : source[key];
        return value;
    }
    remove(key) {
        var source = this.source;
        var value = source[key];
        //删除两个key
        delete source[key];
        delete source[`${key}__expires__`];
        return value;
    }
}
var ls = new xstorage();
ls.set("userId", "zhangsan", 10000);
window.setInterval(() => {
    console.log(ls.get("userId"));
}, 1000);
