// 桥接模式将抽象部分与它的实现部分分离，使它们都可以独立地变化

class Color {
    constructor(name) {
        this.name = name
    }
}
class Shape {
    constructor(name, color) {
        this.name = name
        this.color = color
    }
    draw() {
        console.log(`${this.color.name}  ${this.name}`);
    }

}
// test 
let red = new Color('red')
let yellow = new Color('yellow')
let circle = new Shape('circle', red)
circle.draw()
let triangle = new Shape('triangle', yellow)
triangle.draw()


// 优点
// · 有助于独立地管理各组成部分，把抽象化与实现化解耦
// · 提高可扩充性