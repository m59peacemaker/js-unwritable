var init = require('./init')

var unwritable = function (obj, prop) {
  init(obj, prop)
  Object.defineProperty(obj, prop, { writable: false })
}

module.exports = unwritable
