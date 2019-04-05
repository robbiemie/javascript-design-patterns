# 简单工厂模式

> 简单工厂模式(`Simple Factory Pattern`), 它属于**创建型设计模式**。是由工厂函数(`Factory`)根据参数不同返回相应类的实例。简单工厂模式是专门定义一个工厂函数负责创建其他类的实例的，被创建的实例通常都具有共同的父类。

## 结构分析

在简单工厂模式中包含以下几个角色：

- Factory (工厂角色)： 即工厂类，它是简单工厂的核心，负责实现创建所有产品实例的内部逻辑；工厂类可以被外界直接调用，创建所需的产品对象。
- Product (抽象产品角色)： 它是工厂类创建的所有对象的父类
- ConcreteProduct (具体产品角色)： 它是工厂类所创建的所有对象，每创建一个具体产品角色都继承了抽象产品角色。



## 应用示例

假设要实现一个`iview`的 `Message` 组件。其语法为：

```javascript
message.info('info')
message.success('success')
message.warn('warn')
message.error('error')
```

先来实现一种最简单的方式：

```javascript
const InfoType = function (text) {
  console.log(text)
}
const SuccessType = function (text) {
  console.log(text)
}
const WarnType = function (text) {
  console.log(text)
}
const ErrorType = function (text) {
  console.log(text)
}
let info = new InfoType('info') // info
let success = new SuccessType('success') // success
let warn = new WarnType('warn') // warn
let error = new ErrorType('error') // error
```

可以看到，这种写法虽然简单实现，但是有一个缺陷：每创建一个新类，就要 `new` 一个相应类的实例。

## 问题？
> 是否可以减少调用频率？通过创建一个工厂类，自动根据类型的不同，创建对应类的实例。

接下来，通过**简单工厂设计模式**来实现一下：

```javascript

const InfoType = function (text) {
  console.log(text)
}
const SuccessType = function (text) {
  console.log(text)
}
const WarnType = function (text) {
  console.log(text)
}
const ErrorType = function (text) {
  console.log(text)
}
// 简单工厂函数
const FactoryType = function (type) {
  switch (type) {
    case 'info':
      return new InfoType('info') // info
    case 'success':
      return new SuccessType('success') // info
    case 'warn':
      return new WarnType('warn') // info
    case 'error':
      return new ErrorType('error') // info
    default:
      throw new Error('Unrecognized type')
  }
}

let info = FactoryType('info') // info
let success = FactoryType('success') // success
let warn = FactoryType('warn') // warn
let error = FactoryType('error') // error

```

用简单工厂设计模式实现之后，可以想想这种写法有什么优化空间？

> 如果后期需要扩展多个功能方法，那么都要创建对应的全局函数，这种就会污染全局变量！！因此，我们可以考虑将功能方法挂载到工厂函数的原型对象上，类似于 `JQuery`。

```javascript
const FactoryType = function (type) {
  // 判断是否通过 new 调用 
  if(!this instanceof FactoryType) {
    return new FactoryType(type)
  }
  switch (type) {
    case 'info':
      // 指向原型方法
      return this.InfoType('info')
    case 'success':
      return this.SuccessType('success')
    case 'warn':
      return this.WarnType('warn')
    case 'error':
      return this.ErrorType('error')
    default:
      throw new Error('Unrecognized type')
  }
}

FactoryType.prototype.InfoType = function (text) {
  console.log(text)
}

FactoryType.prototype.SuccessType = function (text) {
  console.log(text)
}

FactoryType.prototype.WarnType = function (text) {
  console.log(text)
}

FactoryType.prototype.ErrorType = function (text) {
  console.log(text)
}

let info = new FactoryType('info') // info
let success = new FactoryType('success') // success
let warn = new FactoryType('warn') // warn
let error = new FactoryType('error') // error

```


## 总结

对于大型项目，尤其是多人开发的时候，要尽可能的减少全局变量的使用。而且实现一些公共模块的时候，为了同伴使用方便，尽可能的优化自己的配置，让他们减少使用学习的成本。

## 思考一下

1. 文中最后一种实现方法，还有没有优化空间
2. 想想最后一种写法，如果用 `ES6` 类(`class`)去实现，那么该如何实现呢？


