# Javascript 常见继承方式

> 常见的继承方式有: 

1. **原型继承**
2. **构造函数继承**
3. **实例继承**
4. **拷贝继承**
5. **组合继承**
6. **寄生组合继承**



## 1. 原型继承

首先定义一个父类(基类)，并为父类定义其属性和方法。

```javascript
// 定义父类
function Parent () {}
// 挂载原型对象的属性和方法
Parent.prototype.value1 = 1
Parent.prototype.value2 = 2
Parent.prototype.func = function () {
  console.log(this.value1, this.value2)
}

```
实现继承只需要两步即可，根据原型链继承的关系，我们可以得出：

- 1. 将子类的原型对象(`Child.prototype`)指向父类的原型对象(`Parent.prototype`)
- 2. 将子类的原型对象的构造函数(`Child.prototype.constructor`)指向子类本身(`Child`)



```javascript
// 定义子类
function Child () {}

Child.prototype = Parent.prototype // 将子类的原型指向父类的原型对象
Child.prototype.constructor = Child // 将子类的原型对象的构造函数指向子类本身

```
实例化子类，并访问父类的**属性**和**方法**。

```javascript
// 创建实例对象 child1
console.log('child v1', child1 instanceof Child) // true
console.log('child v1', child1 instanceof Parent) // true
// 访问父类原型对象上的属性
console.log('child v1', child1.value1) // 1
console.log('child v2', child1.value2) // 2
// 访问父类原型对象上的方法
child1.func() // 1,2

```

总结：

- 优点： 实现简单

- 缺点：
  1. 当创建多个实例对象时，父类的**构造函数**被执行多次。
  2. 无法向父类传递参数
  3. 所有子类实例**共享**父类的属性和方法，导致父类属性被修改，会影响所有子类属性改变。


## 2. 构造函数继承

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
  1. 父类与子类实例无关
  2. 子类无法访问父类原型对象上的属性
  3. 每个子类实例都会有父类的副本。因此，每当 `new` 一个子类实例之后，都会调用父类构造函数，重新创建父类所有属性和方法。


## 3. 实例继承

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

## 4. 拷贝继承


继续按照之前的写法，先实现一个父类的构造函数。

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

子类构造函数中，通过`for...in`遍历父类实例对象的属性和方法，赋值给子类的原型对象(`Child.prototype`)上

```javascript
// 子类构造函数
function Child (...args) {
  let p = new Parent(args)
  for (let item in p) {
    Child.prototype[item] = p[item]
  }
}

```

```javascript
// 子类实例
let child1 = new Child(1, 2)
console.log(child1 instanceof Child) // true
console.log(child1 instanceof Parent) // false
console.log(child1.value1) // 1
console.log(child1.value2) // 2

```


总结：

- 缺点：
  1. 遍历所有父类原型属性和方法，效率慢
  2. 无法访问不可枚举属性值


## 5. 组合继承

依照惯例，实现一个父类的构造函数。

```javascript

// 父类构造函数
function Parent (args) {
  console.log('constructor', args)
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



## 6. 寄生组合继承

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