class JQuery {
  constructor (selector) {
    return this.render(selector)
  }
  render (selector) {
    let slice = Array.prototype.slice
    let doms = slice.call(document.querySelectorAll(selector))
    let lens = doms ? doms.length : 0
    if (lens > 0) {
      doms.forEach((el, index) => {
        this[`_${index}`] = el
      })
    }
  }
  append (node) {}
  html (data) {}
  addClass (className) {}
}

const jquery = window.$ = function (selector) {
  return new JQuery(selector)
}

export default jquery
