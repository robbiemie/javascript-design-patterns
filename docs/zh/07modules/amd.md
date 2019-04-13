# AMD(Asynchronous Module Definition)

> 异步模块定义(`AMD`): 采用异步的方式加载模块，模块的加载不影响后面语句的执行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会执行。

## 为什么需要异步加载模块？

在浏览器环境下，如果模块存放在服务端的话，如果以**同步**的方式读取模块的话，等待模块加载的时间取决于网络环境，如果网络较差，浏览器将处于假死状态。因此，浏览器端的模块只能以**异步**的方式读取。

目前有两种主流的`Javascript`库实现了`AMD`规范: [requireJs](https://requirejs.org/docs/start.html#add)、[curlJs](http://cujojs.com/#get)


## AMD 的常见用法

### 定义模块


1. **无依赖模块**

> 定义一个 `A` 模块，且不依赖其他模块:

```javascript
// define A module
define('A', [], function(){
  // 定义属性、方法
  let notify = function () {
    // ...
  }
  return {
    notify
  }
})
// 可以简写为:
define('A', function(){
  // ...
})
```

2. **有依赖模块**

> 定义一个 `A` 模块，且依赖B模块:

```javascript
// 第二个参数值为数组类型
// 可以加载多个依赖
define('A',['B'],function(B){
  let notify = function () {
    B.doSomething()
  }
  return {
    notify
  }
})
```

3. **自执行模块**

```javascript
define(function(){
  // ...
})

```