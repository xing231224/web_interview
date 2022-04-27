/*
 * @Author: your name
 * @Date: 2022-03-08 10:26:52
 * @LastEditTime: 2022-03-08 11:15:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\设计模式\4、发布-订阅模式.js
 */

// 发布-订阅是一种消息范式，消息的发布者，不会将消息直接发送给特定的订阅者，而是通过消息通道广播出去，然后呢，订阅者通过订阅获取到想要的消息。
/**
 * 实现思路
 * 创建一个对象
 * 在该对象上创建一个缓存列表（调度中心）
 * on 方法用来把函数 fn 都加到缓存列表中（订阅者注册事件到调度中心）
 * emit 方法取到 arguments 里第一个当做 event，根据 event 值去执行对应缓存列表中的函数（发布者发布事件到调度中心，调度中心处理代码）
 * off 方法可以根据 event 值取消订阅（取消订阅）
 * once 方法只监听一次，调用完毕后删除缓存函数（订阅一次）
 */
// 公众号对象
class EventEmitter {
    constructor() {
        // 缓存列表，存放event及fn
        this.events = {}
    }
    // 订阅
    on(event, fn) {
        // 如果对象中没有对应的event值，也就是说明没有订阅过，就给event 创建个缓存列表
        // 如果对象中有相应的event值，把fn添加到对应event的缓存列表里
        (this.events[event] || (this.events[event] = [])).push(fn);
        // return this
    }
    // 发布
    emit() {
        // 第一个参数是对应的event值,直接用数组的shift方法取出
        let event = [].shift.call(arguments),
            fns = [...this.events[event]];
        // 如果缓存列表里没有fn就返回false
        if (!fns || fns.length === 0) return false
        // 遍历event 值对应的缓存列表,移除执行fn
        fns.forEach(fn => {
            fn.apply(this, arguments)
        });
    }
}
function user1(content) {

}
let eventEm = new EventEmitter()
eventEm







const EventEmit = function () {
    this.events = {}
    this.on = function (name, cb) {
        if (this.events[name]) {
            this.events[name].push(cb)
        } else {
            this.events[name] = [cb]
        }
    };
    this.trigger = function (name, ...args) {
        if (this.events[name]) {
            this.events.forEach(eventListener => {
                eventListener(...args)
            })
        }
    }
}
let event1 = new EventEmit();
event1.trigger('success');
event1.on('success', () => {
    console.log('更新通知');
})
console.log(event1);