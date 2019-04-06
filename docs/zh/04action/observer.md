# 观察者模式

> 观察者模式(`Observer`): 又称作**发布-订阅者模式**。定义了一种依赖关系，解决了主体对象与观察者之间功能的耦合。

以实际生活为例，我们国家不断研发和发射卫星，但是发射这些卫星有什么作用呢?

目的就是为了**监控**，比如监控气象信息，以及飞机地理位置信息等。

## 现实意义

在现实场景中，卫星就是指**观察者**，观察飞机的信息。而飞机就是被观察的对象，也就是**主体对象**。主体对象的信息是可以实时变化的，因此，飞机经常需要发送位置信息给卫星，表明当前飞机的地理位置。当然，只有卫星知道当前飞机的位置是不够的，还需要**广播**给需要知道该飞机位置的中转站。因此，还需要不同的中转站去**订阅**当前飞机的信息，然后，才能接受到卫星的广播通知。


## 创建一个观察者

通过对上述例子的理解，我们知道一个观察者，它必须具备两种功能: **消息订阅(`register`)**、**消息派发(`notify`)**。

先实现一个简单的观察者框架:

```javascript
const Observer = (function () {
  // 消息主体
  let _message = {}
  return {
    // 消息订阅
    register () {},
    // 消息派发
    notify () {}
  }
})()

```


然后，分别实现消息订阅和消息派发功能:

- 消息订阅

```javascript
register (type, cb) {
  // 放入消息队列
  if (!_message[type]) {
    // 首次订阅
    _message[type] = [cb]
  } else {
    // 消息排队
    _message[type].push(cb)
  }
}
```

- 消息派发

```javascript
notify (type) {
  _message[type].forEach(cb => {
    cb()
  })
}
```

功能测试

```javascript

Observer.register('success', function (args) {
  console.log('success1', args)
})
Observer.register('success', function (args) {
  console.log('success2', args)
})

Observer.notify('success')
// success1 {type: "success", args: {…}}
// success2 {type: "success", args: {…}}
```