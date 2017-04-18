var unwritable = require('./unwritable')
var writable = require('./writable')
var write = require('./write')

unwritable.unwritable = unwritable
unwritable.writable = writable
unwritable.write = write

module.exports = unwritable
