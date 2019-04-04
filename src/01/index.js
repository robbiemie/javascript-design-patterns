// import jquery from './jquery' // eslint-disable-line
// class Part1 {
//   init () {
//     console.log('jquery(p)', $('p'))
//   }
// }

// export default new Part1()

function Parent (args) {
  this.value1 = args[0]
  this.value2 = args[1]
  this.func = function () {
    console.log(this.value1, this.value2)
  }
}

function Child (...args) {
  let p = new Parent(args)
  for (let item in p) {
    Child.prototype[item] = p[item]
  }
}

let child1 = new Child(1, 2)
console.log(child1 instanceof Child) // true
console.log(child1 instanceof Parent) // false
console.log(child1.value1) // 1
console.log(child1.value2) // 2
