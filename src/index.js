/**
 *
 * @param {*} ins 传入的任意类型
 */
const say = function (ins) {
  ins.speak()
}
class Dog {
  speak () {
    console.log('wowowow')
  }
}
class Duck {
  speak () {
    console.log('gagaga')
  }
}

say(new Dog())
say(new Duck())
