
//  将一个类的接口转化为另外一个接口，以满足用户需求，使类之间接口不兼容问题通过适配器得以解决
class Plug {
    getName() {
        return 'iphone充电头'
    }
}

class Target {
    constructor() {
        this.plug = new Plug();
    }
    getName() {
        return this.plug.getName() + '适配器type-c充电头'
    }
}
let target = new Target()
console.log(target.getName());