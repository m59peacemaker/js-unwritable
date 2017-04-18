# unwritable

Convenience for working with `writable: false` object properties.

[Read about the `writable` attribute here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Writable_attribute).

## install

```sh
# npm install unwritable
```

## example

```js
const { unwritable, writable, write } = require('unwritable')

const obj = { foo: 123 }

unwritable(obj, 'foo')

obj.foo = 456 // does nothing
obj.foo // => 123

write(obj, 'foo', 456)
obj.foo // => 456

writable(obj, 'foo')
obj.foo = 123
obj.foo // => 123
```

```js
const unwritable = require('unwritable')

const obj = { foo: 123 }

unwritable(obj, 'foo')

obj.foo = 456 // does nothing
obj.foo // => 123

unwritable.write(obj, 'foo', 456)
obj.foo // => 456

unwritable.writable(obj, 'foo')
obj.foo = 123
obj.foo // => 123
```

## api

These functions will throw if given a property that has an accessor (get/set). This gives you added confidence that your code is doing what you expect.

### `unwritable(obj, prop)`

Make `prop` of `obj` unwritable. It will assign `prop` to object with a value of `undefined` if `obj` does not already have `prop`.

### `writable(obj, prop)`

Make `prop` of `obj` writable. It will assign `prop` to object with a value of `undefined` if `obj` does not already have `prop`.

### `write(obj, prop, value)`

Assigns `value` to `prop` of `obj`. It is essentially `obj[prop] = value`, but works on properties whether they are writable or not.
