# 代理模式

> 代理模式(`Proxy`): 由于一个对象不能直接引用另一个对象，所以需要通过**代理对象**,起到桥接的作用。

在使用 `Vue` 的时候，通常可以这样访问数据：

```javascript
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
console.log(vm.data.age) // throw error
```