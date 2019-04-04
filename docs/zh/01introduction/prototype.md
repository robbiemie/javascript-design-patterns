
## 原型继承

首先定义一个父类(基类)，并为父类定义其属性和方法。

```javascript
// 定义父类
function Parent () {
  this.value1 = 1 // 属性 value1
  this.value2 = 2 // 属性 value2
  this.func = function ( // 方法 func
    cosnole.log('exec parent function')
  )
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
let child1 = new Child()
child.value1 // 1
child.value2 // 2
child.func() // exec parent function
// 注意： 覆盖父类属性值
child.value2 = 200
// 创建实例对象 child2
let child2 = new Child()
child.value1 // 1
child.value2 // 200
child.func() // exec parent function
```

总结：

- 优点： 实现简单

- 缺点：
  1. 当创建多个实例对象时，父类的**构造函数**被执行多次。
  2. 无法向父类传递参数
  3. 所有子类实例**共享**父类的属性和方法，导致父类属性被修改，会影响所有子类属性改变。
