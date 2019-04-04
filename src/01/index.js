function Parent (args = []) {
  console.log('constructor', args)
  this.value1 = args[0]
  this.value2 = args[1]
  this.func = function () {
    console.log(this.value1, this.value2)
  }
}
Parent.prototype.value3 = 3

function Child (...args) {
  Parent.call(this, args)
}

(function () {
  let ParentCopy = Object.create(Parent.prototype)
  Child.prototype = ParentCopy
  Child.prototype.constructor = Child
})()

let child1 = new Child(1, 2)
console.log(child1 instanceof Child) // true
console.log(child1 instanceof Parent) // true
console.log(child1.value1) // 1
console.log(child1.value2) // 2
console.log(child1.value3) // 3

child1.value3 = 4

let child2 = new Child(1, 2)
console.log(child2 instanceof Child) // true
console.log(child2 instanceof Parent) // true
console.log(child2.value1) // 1
console.log(child2.value2) // 2
console.log(child2.value3) // 3
