
const lazySingleton = (function () {
  let _install = null
  function Singleton () {
    return {
      privateProps: 1,
      privateMethods () {}
    }
  }
  return function () {
    if (!_install) {
      _install = new Singleton()
    }
    return _install
  }
})()

console.log(lazySingleton()) // Singleton {a: 1, b: ƒ}
