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
