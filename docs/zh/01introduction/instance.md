## 实例继承

按照之前的写法，先实现一个父类的构造函数。

```javascript
// 父类构造函数
function Parent (args) {
  this.value1 = args[0]
  this.value2 = args[1]
  this.func = function () {
    console.log(this.value1, this.value2)
  }
}
```

在子类构造函数中，创建父类的实例对象，并返回该对象。

```javascript

function Child (...args) {
  let p = new Parent(args)
  return p
}

```

`Child` 类似于一个对象工厂的概念，无需使用 `new` 操作符。

```javascript
// 实例化对象，此处不需要用 new
let child1 = Child(1, 2)

console.log(child1 instanceof Child) // false <- 注意： 返回的实例对象与子类无关
console.log(child1 instanceof Parent) // true  返回的实例对象是父类的实例

console.log(child1.value1) // 1
console.log(child1.value2) // 2
```

总结：

- 优点：可以访问到父类的原型对象的属性和方法

- 缺点：
  1. 实例对象是父类的实例，与子类无关
  2. 无法实现多继承
