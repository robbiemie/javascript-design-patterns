## 寄生组合继承

> 为了解决组合继承中，父类构造函数被调用两次的问题，因此采用寄生组合继承方式来解决上述问题。

依照惯例，实现一个父类的构造函数。

```javascript

// 父类构造函数
function Parent (args = []) {
  console.log('constructor', args)
  this.value1 = args[0]
  this.value2 = args[1]
  this.func = function () {
    console.log(this.value1, this.value2)
  }
}
// 定义父类原型对象上的属性
Parent.prototype.value3 = 3

```
该方式解决了组合继承中，将子类原型对象(`Child.prototype`)指向父类的实例(`new Parent()`)。此处也会调用父类的构造函数。

因此，采用 `Object.create` 函数，将父类的原型对象复制一份(`ParentCopy`)，然后将子类的原型对象(`Child.prototype`)指向父类的拷贝原型对象(`ParentCopy`)。

```javascript

function Child (...args) {
  // 调用父类的构造函数
  Parent.call(this, args)
}

(function () {
  // 复制父类的原型对象
  let ParentCopy = Object.create(Parent.prototype)
  // 将子类原型对象指向该拷贝对象上
  Child.prototype = ParentCopy
  // 将原型对象的构造函数执行自身
  Child.prototype.constructor = Child
})()

```

可以看到，子类实例(`child1`)修改父类的原型对象属性(`Parent.prototype.value3`)时，并不会影响其他子类对应的属性值。而且父类构造函数也只被执行了一次。

```javascript
// 实例化对象

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

```

总结：

- 优点：
  1. 只调用一次父类的构造函数
  2. 不会存在引用属性共享问题
  3. 支持给父类传递参数
- 缺点：
  2. 太复杂，不易理解