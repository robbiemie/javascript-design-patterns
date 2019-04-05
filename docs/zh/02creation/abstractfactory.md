# 抽象工厂模式

> 抽象工厂模式(`Abstract Factory`): 通过对类的工厂抽象，使其业务用于对产品类的创建，不负责创建某一产品类的实例。

如果要理解抽象工厂模式，可以先了解一下抽象类的概念。

## 抽象类

抽象类：抽象类不能被实例化，如果被实例化，就会报错。由于抽象类不能实例化对象，所以抽象类必须被继承，才能被使用。


我们知道 [abstract](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Reserved_words) 在 `Javascript` 中还是保留字。那么如何做到像 `Java` 那样实现一个抽象类呢？

根据抽象类的特性，我们可以模拟一个抽象类：

如果实例对象调用抽象类的方法，我们就抛出一个 `Error`。

```javascript
function Car () {}
Car.prototype = {
  money () {
    throw Error('abstract method cannot be called')
  },
  speed () {
    throw Error('abstract method cannot be called')
  }
}

let car = new Car()
car.money() // Uncaught Error: abstract method cannot be called
car.speed() // Uncaught Error: abstract method cannot be called

```