## 拷贝继承


继续按照之前的写法，先实现一个父类的构造函数。

```javascript
// 父类构造函数
function Parent (args) {
  this.value1 = args[0]
  this.value2 = args[1]
  this.func = function () {
    console.log(this.value1, this.value2)
  }
}
```

子类构造函数中，通过`for...in`遍历父类实例对象的属性和方法，赋值给子类的原型对象(`Child.prototype`)上

```javascript
// 子类构造函数
function Child (...args) {
  let p = new Parent(args)
  for (let item in p) {
    Child.prototype[item] = p[item]
  }
}

```

```javascript
// 子类实例
let child1 = new Child(1, 2)
console.log(child1 instanceof Child) // true
console.log(child1 instanceof Parent) // false
console.log(child1.value1) // 1
console.log(child1.value2) // 2

```


总结：

- 缺点：
  1. 遍历所有父类原型属性和方法，效率慢
  2. 无法访问不可枚举属性值