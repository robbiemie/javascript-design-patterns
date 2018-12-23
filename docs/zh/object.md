# 什么是面向对象(Object Oriented)

> 面向对象是一种程序设计思想。其中，对象是最小的程序单元，包含有**属性(`props`)**和**方法(`methods`)**。

## 类和实例

> 面向对象编程，其实目的就是为了降低代码耦合性。其中，有两个重要的概念: **类(`class`)**、**实例(`instance`)**。

- `class`: 是实例的抽象，是从实例中提取出公共的**属性**和**方法**的集合。
- `instance`: 是类的具象化，它拥有类的所有公共属性和方法。

### 简单的例子


```javascript
/**
 * 定义Parent类
 */
class Parent {
  constructor (name, age) {
    this.name = name // 定义 name 属性
    this.age = age // 定义 age 属性
  }
  say () { // 定义 say 方法
    console.log(`${this.name}'s age is ${this.age}`)
  }
}

let p1 = new Parent('p1', 2)
p1.say() // p1's age is 2

let p2 = new Parent('p2', 18)
p2.say() // p2's age is 18

```

示例中，定义了一个`Parent`类，以及两个`p1`、`p2`实例。其中，`p1`、`p2`都有同一个`say`方法

可以看出，`Parent`将`p1`、`p2`两个的公共属性(`name`,`age`)以及公共方法(`say`)提取出来，这就是类是实例的抽象。



## 继承

> 当定义的基类无法满足我们的业务需求之后，那么就需要根据基类扩展相应的子类。

```javascript
/**
 * 定义Animal类
 */
class Animal {
  constructor (name, age) {
    this.name = name // 定义 name 属性
    this.age = age // 定义 age 属性
  }
  say () { // 定义 say 方法
    console.log(`${this.name}'s age is ${this.age}`)
  }
}

/**
 * 定义People类,继承自Animal类
 */
class People extends Animal {
  constructor (name, age, where) {
    super(name, age)
    this.where = where
  }
  sleep () {
    console.log(`${this.name} sleep in ${this.where}`)
  }
}

/**
 * 定义Monkey类,继承自Animal类
 */
class Monkey extends Animal {
  constructor (name, age, food) {
    super(name, age)
    this.food = food
  }
  eat () {
    console.log(`${this.name} love ${this.food}`)
  }
}

let p1 = new People('p1', 10, 'male')
p1.sleep() // p1 sleep in male

let m1 = new Monkey('mk', 4, 'banana')
m1.eat() // mk love banana

```

## 封装

```javascript

/**
 * 定义Parent类
 */
const getters = function (key) {
  return this._data[key]
}

const setters = function (key, val) {
  this._data[key] = val
}

class Parent {
  constructor () {
    this._data = {} // 定义一个伪私有变量
  }
  set (key, val) {
    setters.call(this, key, val)
  }
  get (key) {
    if (key === '_data') {
      return undefined // 阻止外部访问私有变量
    }
    return getters.call(this, key)
  }
}

let p1 = new Parent()
p1.set('name', 'p1')
console.log('name', p1.get('name')) // name p1
console.log('name', p1.get('_data')) // name undefined
console.log('name', p1._data) // name {name: "p1"} 

```

我们这种设计私有变量有一个缺陷，细心的童鞋应该能够察觉到。我们只能过滤通过`get`方式获取`_data`，但是无法过滤直接通过实例去调用`_data`这种途径。

我们可以使用`ES6`中的`Proxy`实现上面的缺陷，具体可以参考`Vue2.0`的设计源码。

[ES6中 class私有属性和私有方法](https://segmentfault.com/a/1190000008606016)

## 多态

> 多态在`Java`中的应用就是面向接口编程。在`Java`中含有`Interface`接口的概念，这是在`Javascaript`中是没有相关概念的。

多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来。。因为`javascript`是弱类型语言，这样传入参数无需进行类型判断，实现多态就会方便许多。

```javascript
/**
 * say实现多态
 * @param {*} ins 传入的任意类型，无需类型判断
 */
const say = function (ins) {
  ins.speak()
}
class Dog {
  speak () {
    console.log('wowowow')
  }
}
class Duck {
  speak () {
    console.log('gagaga')
  }
}

say(new Dog())
say(new Duck())

```

[javascript设计模式与开发实践（一）- 多态](https://segmentfault.com/a/1190000013510949)