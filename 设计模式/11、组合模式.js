// 将对象组合成树形结构，以表示'整体-部分'的层次结构
// 通过对象的多态表现，使得用户对单个对象和组合对象的使用具有一致性


class TrainOrder {
    create() {
        console.log('创建火车票订单');
    }
}

class HotelOrder {
    create() {
        console.log('创建酒店订单');
    }
}

class TotalOrder {
    constructor() {
        this.orderList = []
    }
    addOrder(order) {
        this.orderList.push(order)
        return this
    }
    create() {
        this.orderList.forEach(item => {
            item.create()
        })
        return this
    }
}
// 可以在购票网站车票的同时也订购房间
let train = new TrainOrder()
let hotel = new HotelOrder()
let total = new TotalOrder()
total.addOrder(train).addOrder(hotel).create()

// 场景
// 表示对象 - 整体层次结构
// 希望用户忽略组合对象和单个对象的不同，用户将统一地使用组合结构中的所有对象（方法）