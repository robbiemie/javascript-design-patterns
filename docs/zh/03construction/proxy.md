# 代理模式

> 代理模式(`Proxy`): 由于一个对象不能直接引用另一个对象，所以需要通过**代理对象**,起到桥接的作用。

在使用 `Vue` 的时候，通常可以这样访问数据：

```javascript
import Vue from 'vue'
let data = {
  age: 12,
  name: 'yang'
}
// 实例化Vue对象
let vm = new Vue({
  data
})

// 输出
console.log(vm.age) // 12
console.log(vm.name) // yang
console.log(vm.data) // undefined

```


我们发现，我们访问vm实例的对象属性时，是直接通过 `vm.age` 访问,而访问 `vm.data` 则显示 `undefined`。

![](https://makefriends.bs2dl.yy.com/bm1554456509719.png)

可以看到，`vm` 实例对象中包含有 `age`、 `name`、 `_data`,这三个属性。 

## 原理分析

那么，我们可以通过源码进行分析：

1. 合并 `options` [源码参考](https://github.com/vuejs/vue/blob/2.6/src/core/instance/init.js#L38)

```javascript
export function initMixin (Vue: Class<Component>) {
  // 省略其他逻辑..
  vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
  )
}
```

2. 挂载 `_data` [源码参考](https://github.com/vuejs/vue/blob/2.6/src/core/instance/state.js#L114)

```javascript
function initData (vm: Component) {
  // 省略其他逻辑..
  let data = vm.$options.data
  // 判断 data 是否为函数形式
  data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {}
}
```

3. 代理 `vm._data` ，将 `_data` 中的值全部代理到 `vm` 上 [源码参考](https://github.com/vuejs/vue/blob/2.6/src/core/instance/state.js#L147)

```javascript
function initData (vm: Component) {
  // 省略其他逻辑..
  proxy(vm, `_data`, key)
}
```

4. 代理 `vm` 中的属性值 [源码参考](https://github.com/vuejs/vue/blob/2.6/src/core/instance/state.js#L147)

```javascript
export function proxy (target: Object, sourceKey: string, key: string) {
  // 省略其他逻辑..
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

## 动手实践

看完之后，我们可以自己 `DIY` 数据代理：


- 首先，定义一个 `Vue` 构造函数

```javascript
// 定义 Vue 构造函数
function Vue (options) {
  this.$options = options
}
// 实例对象
const vm = new Vue({
  data: {
    age: 12,
    name: 'yang'
  }
})

console.log(vm) // Vue {options: {…}}
console.log(vm.$options) // {data: {…}}
console.log(vm.data) // undefined
console.log(vm.age) // undefined
console.log(vm.name) // undefined

```

- 接着，开始挂载我们的 `_data`

```javascript
function Vue (options) {
  this.$options = options
  // 挂载_data
  this._data = this.$options.data
}
```

- 最后，代理 `vm._data` 所有可枚举的值:

```javascript
// 定义空函数
const noop = function () {}
// 定义默认属性配置
let descriptor = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

// 创建 Vue 构造函数
function Vue (options) {
  this.$options = options
  // 挂载_data
  this._data = this.$options.data
  // 代理_data属性
  Object.keys(this._data).forEach(key => {
    descriptor.get = function () {
      return this._data[key]
    }
    descriptor.set = function (value) {
      this._data[key] = value
    }
    Object.defineProperty(this, key, descriptor)
  })
}

const vm = new Vue({
  data: {
    age: 12,
    name: 'yang'
  }
})

console.log(vm) // Vue {options: {…}}
console.log(vm.$options) // {data: {…}}
console.log(vm._data) // {age: 12, name: "yang"}
console.log(vm.age) // 12
console.log(vm.name) // yang

```
 

## 通过 `ES6` 的 `Proxy` 实现

[Proxy 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

```javascript
/**
 * @prams target
 * 用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
 * @prarams handler
 * 一个对象，其属性是当执行一个操作时定义代理的行为的函数。
 **/
let p = new Proxy(target, handler);
```

```javascript
// 创建 Vue 构造函数
function Vue (options) {
  this.$options = options
  // 挂载_data
  this._data = this.$options.data
  return new Proxy(this, {
    get: (target, key) => this._data[key],
    set: (target, key, value) => this._data[key] = value // eslint-disable-line
  })
}

const vm = new Vue({
  data: {
    age: 12,
    name: 'yang'
  }
})

console.log(vm) // Proxy {$options: {…}, _data: {…}}
console.log(vm.$options) // undefined
console.log(vm._data) // undefined
console.log(vm.age) // 12
console.log(vm.name) // yang

```