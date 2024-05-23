const eventBus = {
    // 存放事件名称和事件回调的map
    _events: {},
    // 订阅事件
    on(eventName, callback) {
        // 获取当前事件名称对应的事件回调数组
        const callbacks = this._events[eventName] || [];
        // 将事件回调添加到数组中
        callbacks.push(callback);
        // 将事件名称和事件回调数组重新赋值给_events
        this._events[eventName] = callbacks;
    },
    emit(eventName, ...args) {
        const callbacks = this._events[eventName];
        if (callbacks) {
            callbacks.forEach(callback => {
                callback(...args);
            });
        }
    }
}