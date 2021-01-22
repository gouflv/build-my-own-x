# ES5 Function.prototype.bind 方法的模拟

## 初步实现

返回一个内部方法提供下次调用，在内部方法调用时，将闭包保存的 context 注入到 fn 后，返回 fn 的执行结果。   

```javascript
const bind = (fn, context, ...initialArgs) => 
  (...args) => 
    fn.apply(context, [...initialArgs, ...args])

// Test
const bound = bind(
  function() { return this.name},
  { name: 'a' }
)
console.log(bound()) //a
```

## 第二版

处理被 bind 包装的方法，被当作构造方法进行 new 的问题。

由于刚才我们返回的时一个内部方法，所以通过内部方法构造出的对象，不具备原始方法 fn 的任何属性和方法（原型）。

### 解决方案1

参考 underscore 的实现，用 fn.prototype 构造出新对象，执行 fn 初始化对象属性，最后更具构造函数内部的返回值，返回结果。

代码如下:

```javascript
const bind = (fn, context, ...initialArgs) => {
  const boundFn = function (...args) {
    if (this instanceof boundFn) {
      const self = Object.create(fn.prototype)
      const result = fn.apply(self, args)
      return isObject(result) ? result : self
    }
    return fn.apply(context, [...initialArgs, ...args])
  }
  return boundFn
}
```

### 解决方案2

另一种解决方案来自 [es5-shim.js#L203](https://github.com/es-shims/es5-shim/blob/master/es5-shim.js#L203) ，它直接将 boundFn 方法模拟成构造函数，自身挂载 fn 的原型。
这里就先不做实现了。
