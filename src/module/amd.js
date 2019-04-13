
(function (global) {
  let AMD = {}
  // 模块缓存池
  let moduleStorage = {}
  /**
   * 定义模块
   * @param {name} args[0] 模块名称
   * @param {dependencies} args[1] 模块依赖
   * @param {factory} args[2] 模块定义的工厂函数
   */
  AMD.defineM = function (args) {
    let _name, _dependencies, _factory
    _name = args[0]
    _dependencies = args[1]
    _factory = args[2]
    if (!moduleStorage.hasOwnProperty(_name)) {
      // 缓存未定义模块
      let _module = {
        name: _name,
        dependencies: _dependencies,
        factory: _factory
      }
      moduleStorage[_name] = _module
    }
  }
  /**
   * 加载模块
   * @param {name} args[0] 模块名称
   * @param {factory} args[2] 工厂函数
   */
  AMD.requireM = function (args) {
    return this.emit(args)
  }
  AMD.emit = function (args) {
    let name = args[0]
    let module = moduleStorage[name]
    if (typeof module.entity === 'undefined') {
      let _args = []
      // 执行工厂函数
      module.entity = module.factory.apply(function () {}, _args)
    }
    return module.entity
  }
  global.defineM = function (...args) {
    AMD.defineM(args)
  }
  global.requireM = function (...args) {
    return AMD.requireM(args)
  }
})(window)

defineM('module1', [], function () {
  console.log('module1 exec')
})

requireM('module1')
