# 工厂方法模式

> 工厂方法模式(`Factory Method`): 通过对产品类的抽象，使其创建业务主要负责用于创建多类产品的实例。


之前使用**简单工厂模式**，每当需求变更新增一种类型时，那么，就要更改两处代码。如果需要扩展到 `N` 方法的话，那么项目的体积将变大非常庞大，不利于维护！！


此时，可以借助上一节的简单工厂模式进行改造一下：

```javascript
const Factory = function (type, msg) {
  // 异常检测
  if (!(this instanceof Factory)) {
    return new Factory(type, msg)
  } else {
    this[type](msg)
  }
}

Factory.prototype.info = function (text) {
  console.log(text)
}

Factory.prototype.success = function (text) {
  console.log(text)
}

Factory.prototype.warn = function (text) {
  console.log(text)
}

Factory.prototype.error = function (text) {
  console.log(text)
}

/** 
 * 另一种写法：
*
Factory.prototype = {
  info (text) {
    console.log(text)
  },
  success (text) {
    console.log(text)
  },
  warn (text) {
    console.log(text)
  },
  error (text) {
    console.log(text)
  }
}
*
**/
let info = new Factory('info', '111') // info
let success = new Factory('success', '222') // success
let warn = new Factory('warn', '333') // warn
let error = new Factory('error', '444') // error

```

批量调用工厂方法：

```javascript

const data = [{
    type: 'info',
    msg: '111'
  }, {
    type: 'success',
    msg: '222'
  }, {
    type: 'warn',
    msg: '333'
  }, {
    type: 'error',
    msg: '444'
  }
]

data.forEach(item => {
  new Factory(item.type, item.msg) // eslint-disable-line
})

```

