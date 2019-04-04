## 组合继承

依照惯例，实现一个父类的构造函数。

```javascript

// 父类构造函数
function Parent (args) {
  this.value1 = args[0]
  this.value2 = args[1]
  this.func = function () {
    console.log(this.value1, this.value2)
  }
}
Parent.prototype.value3 = 3

```

子类构造函数中调用父类的构造函数，并且将子类的原型对象指向父类的实例

```javascript

function Child (...args) {
  // 调用父类的构造函数
  Parent.call(this, args)
}
// 此处注意，子类原型对象不能指向父类的原型对象
// Child.prototype = Parent.prototype
Child.prototype = new Parent()
Child.prototype.constructor = Child

```

可以看到，在 `new Parent()` 时调用一次父类的构造，在子类构造函数中 `Parent.call` 也调用了一次父类的构造。因此，父类构造函数会被执行两次。

```javascript

let child1 = new Child(1, 2)
console.log(child1 instanceof Child) // true
console.log(child1 instanceof Parent) // true
console.log(child1.value1) // 1
console.log(child1.value2) // 2
console.log(child1.value3) // 3
// 修改父类原型对象上的属性值
child1.value3 = 4

let child2 = new Child(1, 2)
console.log(child2 instanceof Child) // true
console.log(child2 instanceof Parent) // true
console.log(child2.value1) // 1
console.log(child2.value2) // 2
console.log(child2.value3) // 3  -> 没有被修改

```

总结：

- 优点：
  1. 可以通过`Parent.call`方法,向父类传参
  2. 不存在引用属性值共享的问题