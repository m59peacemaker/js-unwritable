var test = require('tape')
var tryCatch = require('try_catch')
var unwritable = require('./')
var writable = unwritable.writable
var write = unwritable.write

test('unwritable', function (t) {
  var obj = { foo: 123 }
  unwritable(obj, 'foo')

  obj.foo = 'abc'
  t.equal(obj.foo, 123, 'unwritable() makes existing property unwritable')

  write(obj, 'foo', 456)
  t.equal(obj.foo, 456, 'write() writes to an unwritable property')
  obj.foo = 'abc'
  t.equal(obj.foo, 456, 'property is still unwritable after calling write()')

  writable(obj, 'foo')
  obj.foo = 'abc'
  t.equal(obj.foo, 'abc', 'writable() makes property writable')

  write(obj, 'bar', 1)
  t.equal(obj.bar, 1, 'write() writes new property')

  obj.bar = 2
  t.equal(obj.bar, 2, 'property created by write() is writable')

  Object.defineProperty(obj, 'qux', { configurable: true, get: function () {} })
  t.true(
    tryCatch(function () {
      unwritable(obj, 'qux')
      return false
    }, function (err) {
      return err.name === 'TypeError'
    }),
    'unwritable() throws on property with accessors'
  )

  t.true(
    tryCatch(function () {
      writable(obj, 'qux')
      return false
    }, function (err) {
      return err.name === 'TypeError'
    }),
    'writable() throws on property with accessors'
  )

  t.true(
    tryCatch(function () {
      write(obj, 'qux', 123)
      return false
    }, function (err) {
      return err.name === 'TypeError'
    }),
    'write() throws on property with accessors'
  )

  t.end()
})

test('write() affects only `value`', function (t) {
  var obj = {}
  Object.defineProperty(obj, 'foo', { writable: false, enumerable: false, configurable: true })
  write(obj, 'foo', 123)
  t.deepEqual(
    Object.getOwnPropertyDescriptor(obj, 'foo'),
    { value: 123, writable: false, enumerable: false, configurable: true }
  )

  Object.defineProperty(obj, 'bar', { writable: true, enumerable: true, configurable: true })
  write(obj, 'bar', 123)
  t.deepEqual(
    Object.getOwnPropertyDescriptor(obj, 'bar'),
    { value: 123, writable: true, enumerable: true, configurable: true }
  )

  t.end()
})

test('unwritable() affects only `writable`', function (t) {
  var obj = {}
  Object.defineProperty(obj, 'foo', {
    value: 'abc', writable: true, enumerable: false, configurable: true
  })
  unwritable(obj, 'foo')
  t.deepEqual(
    Object.getOwnPropertyDescriptor(obj, 'foo'),
    { value: 'abc', writable: false, enumerable: false, configurable: true }
  )

  unwritable(obj, 'bar')
  t.deepEqual(
    Object.getOwnPropertyDescriptor(obj, 'bar'),
    { value: undefined, writable: false, enumerable: true, configurable: true }
  )

  t.end()
})

test('writable() affects only `writable`', function (t) {
  var obj = {}
  Object.defineProperty(obj, 'foo', {
    value: 'abc', writable: false, enumerable: false, configurable: true
  })
  writable(obj, 'foo')
  t.deepEqual(
    Object.getOwnPropertyDescriptor(obj, 'foo'),
    { value: 'abc', writable: true, enumerable: false, configurable: true }
  )

  writable(obj, 'bar')
  t.deepEqual(
    Object.getOwnPropertyDescriptor(obj, 'bar'),
    { value: undefined, writable: true, enumerable: true, configurable: true }
  )

  t.end()
})
