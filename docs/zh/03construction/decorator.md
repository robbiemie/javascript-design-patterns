# 1. 装饰器模式

> 装饰器模式(`Decorator`): 在不改变原对象的基础上，通过对其进行包装扩展(添加属性和方法)使原有属性可以满足用户更复杂的需求。


装饰器模式可以简单描述为：你买了一件毛坯房，这明显是不能满足我们对美好生活的诉求。因此，我们要给这间房子不断添加新的家具(属性或方法),让他满足我们对生活的憧憬!!!


下面的例子，为 `input` 插入了不同的方法：

## 实例一

```javascript
let el = document.createElement('input')
el.setAttribute('id', 'input_a')
el.placeholder = '请点我'
document.body.appendChild(el)
let el2 = document.createElement('input')
el2.setAttribute('id', 'input_b')
el2.placeholder = '点我'
document.body.appendChild(el2)

const decorator = function (target, cb) {
  // 获取目标元素
  const input = document.querySelector(target)
  if (typeof input.oninput === 'function') {
    // 缓存该事件
    let oldInput = input.oninput
    // 覆写oninput事件
    input.oninput = function () {
      // 执行原有逻辑
      oldInput()
      // 执行回调
      cb()
    }
  } else {
    // 未绑定事件源
    input.oninput = cb
  }
}
decorator('#input_a', _ => {
  // 执行 a 逻辑
  console.log('123')
})

decorator('#input_b', _ => {
  // 执行 a 逻辑
  console.log('456')
})


```

## 示例二

Mockjs 拦截 XHR 请求,请参考:

```javascript
(function(){
  var oXMLHttpRequest = window.XMLHttpRequest;
  // ...
  window.XMLHttpRequest = xxx;
})()
```



## 源码参考

- [vue 监听数组](https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js)
- [Mockjs 实现参考](https://github.com/nuysoft/Mock/blob/refactoring/src/mock/xhr/xhr.js#L27)
- [覆写 window.XMLHttpRequest](https://github.com/ilinsky/xmlhttprequest/blob/master/XMLHttpRequest.js#L534)