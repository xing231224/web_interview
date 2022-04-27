/*
 * @Author: your name
 * @Date: 2022-03-07 17:49:55
 * @LastEditTime: 2022-03-08 09:56:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web面试题手写\设计模式\2、工厂模式.js
 * 
 * 
 * 对于工厂来说，我们的印象可能是里面具有各种各样的模具，根据你想要的产品的模型，生产你需要的产品。
 *      比如说你请工厂帮你加工一个产品，你只需要告诉工厂你这个产品的结构，
 *      工厂就会有对应的模型帮你生产，你不需要去关心它具体是怎么加工的。
 *      同样工厂模式也是这样，(工厂模式也是创建型设计模式，用于创建实例对象的)你不需要自己去找对应的类来创建实例，
 *      你只需要告诉工厂类你要创建什么实例，他就会返回你需要的实例对象。
 * 工厂模式根据抽象程度的不同，分为三种：
 *          1、简单工厂模式
 *          2、工厂方法模式
 *          3、抽象工厂模式
 */

// 简单工厂模式
// 定义一个工厂类，通过工厂函数，根据传入的参数不同，返回不同的实例

//学生类
class Student {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    showName() {
        console.log(this.name);
    }
}
// 老师类
class Teacher {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    showName() {
        console.log(this.name);
    }
}
// 警察类
class Policeman {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    showName() {
        console.log(this.name);
    }
}
// 根据类创建对象
const s1 = new Student('王德发', 20);
const t1 = new Teacher("王德发老师", 30)
const p1 = new Policeman("王德发警官", 35)

// 我们可以看到，上面代码中定义了三个类，学生类，老师类和警察类。
// 而且它们具有相同的属性和方法。当我们需要创建学生实例时，我们调用学生类。
// 当我们需要创建老师实例时，我们调用老师类，当我们需要创建警察实例，我们调用警察类。
// 假设我们有更多的人物类，它们具有相同的功能，那么当我们需要创建实例的时候，我们同样需要调用相对应的类。
// 事实上，这些类实现的都是相同的功能，那么我们可不可以把所有的创建这些人物实例都通过一个类来实现了。
// 我们尝试将代码修改为如下:


// 工厂类
class Factory {
    // 工厂函数
    constructor(role, name, age) {
        switch (role) {
            case 'student':
                return new Student(name, age)
            case 'teacher':
                return new Teacher(name, age)
            case 'policeman':
                return new Policeman(name, age)
            default:
                break;
        }
    }
    showName() {
        console.log(this.name);
    }

}
const f = new Factory('student', '喜羊羊', 20)
const f1 = new Factory('teacher', '喜羊羊老师', 30)
const f2 = new Factory('policeman', '喜羊羊警官', 35)


// 工厂方法模式

// 工厂方法模式是对简单工厂的进一步优化， 在工厂方法模式中，我们不再提供一个统一的工厂类来创建所有的对象，而是针对不同的对象提供不同的工厂。
// 也就是说每个对象都有一个与之对应的工厂。说的好像挺复杂，其实在我看来他就是解决简单工厂模式存在的不方便添加新的类，因为添加新的类以后需要修改工厂函数。
// 而工厂方法模式就是解决这个问题，看下面的代码：

let Factory_1 = (function () {
    let s = {
        Student(name, age) {
            this.name = name
            this.age = age
            return this
        },
        Teacher(name, age) {
            this.name = name
            this.age = age
            return this
        },
        Policeman(name, age) {
            this.name = name
            this.age = age
            return this
        },
        //在这里添加新的类
        Doctor(name, age) {
            this.name = name;
            this.age = age;
            return this;
        }
    }

    return class {
        constructor(type, name, age) {
            this.type = type
            if (s.hasOwnProperty(type)) {
                return s[type].call(this, name, age)
            } else {
                throw new Error(`不存在${type}类`)
            }
        }
        showName() {
            console.log(`我叫${this.name},今年${this.age}岁,是一名${this.type}`);
        }
    }
})()
let s3 = new Factory_1('Policeman', '喜羊羊', 20)

console.log(s3.showName());