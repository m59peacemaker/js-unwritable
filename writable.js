var init = require('./init')

var writable = function (obj, prop) {
  init(obj, prop)
  Object.defineProperty(obj, prop, { writable: true })
}

module.exports = writable
