## 构造函数继承

与原型继承一样，首先定义一个父类(基类)，并为父类定义其属性和方法。

```javascript
// 定义父类
function Parent (args) {
  this.value1 = 1 // 属性 value1
  this.value2 = 2 // 属性 value2
  this.func = function ( // 方法 func
    cosnole.log('exec parent function')
  )
}

```

需要注意的是: 与原型继承不同的是，这里只需要调用(`call`)父类的构造函数。


```javascript
function Child (...args) {
  // 调用父类的构造函数
  Parent.call(this, args)
}

```

创建实例对象，通过 `call` 方法，将父类中的 `this` 执行 `Child`,并且可传入参数

```javascript
// 创建实例对象 child1
let child1 = new Child(1, 2) // 传参


console.log(child1 instanceof Child) // true
console.log(child1 instanceof Parent) // false <-- 注意：父类与子类实例无关

console.log(child1.value1) // 1
console.log(child1.value2) // 2
child1.func() // 1,2
// 创建实例对象 child2
let child2 = new Child(3, 4) // 传参
console.log(child2.value1) // 1
console.log(child2.value2) // 2
child2.func() // 1,2

```


总结：

- 优点：可以通过 `call` 方法，向父类传入参数

- 缺点
  1. 父类与子类实例无关，即**子类无法访问父类原型对象上的属性**
  2. 无法共享公共属性和方法，因此，每当 `new` 一个子类实例之后，都会调用父类构造函数，重新初始化所有属性和方法。