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

module.exports = init
