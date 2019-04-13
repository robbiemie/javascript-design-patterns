# AMD(Asynchronous Module Definition)

> 异步模块定义(`AMD`): 采用异步的方式加载模块，模块的加载不影响后面语句的执行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会执行。

## 为什么需要异步加载模块？

在浏览器环境下，如果模块存放在服务端的话，如果以**同步**的方式读取模块的话，等待模块加载的时间取决于网络环境，如果网络较差，浏览器将处于假死状态。因此，浏览器端的模块只能以**异步**的方式读取。

目前有两种主流的`Javascript`库实现了`AMD`规范: [requireJs](https://requirejs.org/docs/start.html#add)、[curlJs](http://cujojs.com/#get)


## AMD 的常见用法

### 定义模块

`define` 函数接受三个参数:

- `name`: 定义模块名称 [可选]
- `dependencies`: 定义模块依赖的其他模块 [可选]
- `factory`: 定义模块的工厂函数

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

### 加载模块


`require` 函数接受三个参数:

- `dependencies`: 依赖的模块数组
- `success`: 加载成功的回调。其中，参数为对应加载的模块
- `fail`: 加载失败的回调。任意一个模块加载失败都会触发

```javascript
// 加载 A,B 模块
require(['A'.'B'], function(A,B){

},function(){
  // catch error
})
```

## 源码实现

利用**自执行函数**的特性,可以将定义在模块内的方法属性进行私有化。

- 首先，准备定义 `require` 和 `define` 两个**全局**方法。
- 其次，需要定义一个**模块缓存器**，将定义好的模块进行缓存。


### 1. 框架结构设计

```javascript
(function(global) {
  // 定义模块缓存器
  let moduleStorage = {}
  // 定义 AMD 模块
  let AMD = {}
  // 挂载 require 方法
  AMD.require = function () {}
  // 挂载 define 方法
  AMD.define = function () {}

  // require 挂载到全局
  global.require = function () {
    AMD.require()
  }
  // define 挂载到全局
  global.define = function () {
    AMD.define()
  }
})(window)

```

### 2. define 方法设计


`define` 函数接受三个参数:

- `name`: 定义模块名称 [可选]
- `dependencies`: 定义模块依赖的其他模块 [可选]
- `factory`: 定义模块的工厂函数

`define` 实际上就是将定义好的模块存储到缓存器中(形式类似于 `Map`)。


```javascript
// 定义模块缓存器
let moduleStorage = {}
// 定义 AMD 模块
let AMD = {}
AMD.define = function (name, dependencies, factory) {
  if(!moduleStorage[name]) {
    // 定义模块对象
    let _module = {
      name: name,
      dependencies: dependencies,
      factory: factory
    }
    // 缓存该模块
    moduleStorage[name] = _module
  }
}
```

### 3. require 方式设计


`require` 函数接受三个参数:

- `dependencies`: 依赖的模块数组
- `success`: 加载成功的回调。其中，参数为对应加载的模块
- `fail`: 加载失败的回调。任意一个模块加载失败都会触发

```javascript
// 定义模块缓存器
let moduleStorage = {}
// 定义 AMD 模块
let AMD = {}
// 定义空函数
let noop = function() {}
...
AMD.require = function (name, success, fail) {
  // 获取模块对象
  let module = moduleStorage[name]
  if(!module.entity) {
    // 获取依赖
    let _args = []
    let dependencies = module.dependencies
    dependencies.forEach((item, index) => {
      // 递归加载依赖模块对象
      _args.push(this.require(item))
    })
    
    // 构建模块实体资源
    module.entity = module.facotry.apply(noop, _args)
  }
  return module.entity
}
```

### 3. 简化后实现

```javascript

(function (global) {
  let AMD = {}
  // 模块缓存池
  let moduleStorage = {}
  /**
   * 定义模块
   * @param {name} args[0] 模块名称
   * @param {dependencies} args[1] 模块依赖
   * @param {factory} args[2] 模块定义的工厂函数
   */
  AMD.defineM = function (args) {
    let _name, _dependencies, _factory
    _name = args[0]
    _dependencies = args[1]
    _factory = args[2]
    if (!moduleStorage.hasOwnProperty(_name)) {
      // 缓存未定义模块
      let _module = {
        name: _name,
        dependencies: _dependencies,
        factory: _factory
      }
      moduleStorage[_name] = _module
    }
  }
  /**
   * 加载模块
   * @param {name} args[0] 模块名称
   * @param {factory} args[2] 工厂函数
   */
  AMD.requireM = function (args) {
    return this.emit(args)
  }
  AMD.emit = function (args) {
    let name = args[0]
    let module = moduleStorage[name]
    if (typeof module.entity === 'undefined') {
      let _args = []
      // 执行工厂函数
      module.entity = module.factory.apply(function () {}, _args)
    }
    return module.entity
  }
  global.defineM = function (...args) {
    AMD.defineM(args)
  }
  global.requireM = function (...args) {
    return AMD.requireM(args)
  }
})(window)

defineM('module1', [], function () {
  console.log('module1 exec')
})

requireM('module1')

```