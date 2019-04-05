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
    throw new Error('abstract method cannot be called')
  },
  speed () {
    throw new Error('abstract method cannot be called')
  }
}

let car = new Car()
car.money() // Uncaught Error: abstract method cannot be called
car.speed() // Uncaught Error: abstract method cannot be called

```

定义好抽象类之后，然后就可以继承该抽象类，覆写父类的方法:

```javascript
function Car (args) {
  // ...
}
Car.prototype = {
  money () {
    throw new Error('abstract method cannot be called')
  },
  speed () {
    throw new Error('abstract method cannot be called')
  }
}

// 子类继承抽象类
;(function () {
  let F = Object.create(Car.prototype)
  BMW.prototype = F
  BMW.prototype.constructor = BMW
})()

function BMW (...args) {
  Car.call(this,args)
}
BMW.prototype = {
  money () {
    console.log('$100.0')
  },
  speed () {
    console.log('200km/h')
  }
}
let bmw = new BMW()
bmw.money() // $100.0
bmw.speed() // 200km/h

```

## 抽象工厂

有了初步的实现，我们再结合之前的工厂方法模式，实现一个生成多个工厂方法的抽象工厂。

```javascript
function AbstractFactory (subType, superType) {
  if (typeof subType !== 'function') return new Error('subType is not defined')
  let F = Object.create(AbstractFactory[superType].prototype)
  AbstractFactory[superType].call(subType)
  subType.prototype = F
  subType.prototype.constructor = subType
}
// 定义抽象工厂静态方法
// 定义汽车抽象类
AbstractFactory.Car = function () {
  this.type = 'Car'
}
AbstractFactory.Car.prototype = {
  speed () {
    throw new Error('abstract method cannot be called')
  },
  money () {
    throw new Error('abstract method cannot be called')
  }
}

// 定义飞机抽象类
AbstractFactory.aricraft = function () {
  this.type = 'aricraft'
}
AbstractFactory.aricraft.prototype = {
  speed () {
    throw new Error('abstract method cannot be called')
  },
  money () {
    throw new Error('abstract method cannot be called')
  }
}
function BMW (money, speed) {
  AbstractFactory.Car.call(this)
  this.m = money
  this.s = speed
}
// 继承Car
AbstractFactory(BMW, 'Car')
BMW.prototype = {
  money () {
    console.log('$' + this.m)
  },
  speed () {
    console.log(this.s + 'km/h')
  }
}
let bmw = new BMW(100, 200)
bmw.money() // $100
bmw.speed() // 200km/h
console.log(bmw.type) // Car
console.log(bmw instanceof AbstractFactory.Car) // false
console.log(bmw instanceof BMW) // true

```