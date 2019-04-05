# 单例模式

> 单例模式(`Singleton`): 只允许实例化一次的对象类。

单例模式也可以理解为提供了一种命名空间，避免污染全局变量。如我们常见的`JQuery`库，以及`Vue` 提供的[插件功能](https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6)(通过 `this.$xxx` 访问)。

## 基础用法

```javascript
// 使用原型对象方法共享
function Utils () {}
Utils.prototype.noop = function () {}
Utils.prototype.sleep = function () {} // ...
Utils.prototype.getParams = function () {} // ...

// 或者使用对象形式：
let config = {
  noop () {},
  sleep () {},
  getParams () {}
}

// 更加高级一些，通过自执行函数：
let getConfig = ((...args) => {
  // 执行其他逻辑
  // ...
  // 复制原始配置 config
  config = Object.assign({}, config)
  // 返回配置
  return config
})({...})

```

## 惰性单例

> 有时候，需要对单例对象**延迟创建**，那么如何延迟创建呢？

我们可以借助闭包的概念，返回的类型一个函数，当需要调用的时候，执行改函数即可。

```javascript
const lazySingleton = (function () {
  let _install = null
  function Singleton () {
    // 定义私有属性和方法
    return {
      privateProps: 1,
      privateMethods () {}
    }
  }
  return function () {
    if (!_install) {
      _install = new Singleton()
    }
    return _install
  }
})()

console.log(lazySingleton()) // {privateProps: 1, privateMethods: ƒ}

```
