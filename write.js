var init = require('./init')

var write = function (obj, prop, value) {
  init(obj, prop)
  Object.defineProperty(obj, prop, { value: value })
}

module.exports = write
