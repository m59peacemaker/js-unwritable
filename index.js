var has = function (obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop) }

// ensure property initialized so that it has a descriptor
var init = function (obj, prop) {
  var desc = Object.getOwnPropertyDescriptor(obj, prop)
  if (!desc) {
    obj[prop] = undefined  // easiest way to set a normal descriptor
  } else if (has(desc, 'get')) {
    throw new TypeError('properties with accessors (get/set) not supported')
  }
}

var unwritable = function (obj, prop) {
  init(obj, prop)
  Object.defineProperty(obj, prop, { writable: false })
}

var writable = function (obj, prop) {
  init(obj, prop)
  Object.defineProperty(obj, prop, { writable: true })
}

var write = function (obj, prop, value) {
  init(obj, prop)
  Object.defineProperty(obj, prop, { value: value })
}

unwritable.write = write
unwritable.writable = writable
unwritable.unwritable = unwritable

module.exports = unwritable
