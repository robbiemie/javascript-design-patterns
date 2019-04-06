# 委托模式

> 委托模式(`Delegate`): 多个对象接受并处理处理同一个请求，他们将请求委托给另一个对象统一处理。

假如有这么一个 `Dom` 结构：

```html
<ul id="eul">
  <li></li>
  <li></li>
  <li></li>
  <!-- ... -->
</ul>
```

我们需要为每一个 `li` 元素注册一个 `click` 事件，这无形之中就增加了很多事件，事件多了就会损耗内存。

```javascript
let ul = document.querySelector('#eul')
let li = document.getElementByTagName('li')
for(let i = 0; i < li.length; i++) {
  li[i].onclick = function () {
    this.style.color = `#ff0`
  }
}
```

可以对上述代码进行修改，可使用委托模式：

```javascript
let ul = document.querySelector('#eul')
ul.onclick = function (e) {
  let e = e || window.event
  tag = e.target || {}
  if(tag.nodeName.toLowerCase() === 'li') {
    tag.style.color = `#ff0
  }
}
```

这样，通过父节点(`ul`)统一接受所有子节点(`li`)中的点击事件，这样统一管理的方式节省了事件注册所带来的开销。