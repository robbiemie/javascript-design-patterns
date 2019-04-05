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
