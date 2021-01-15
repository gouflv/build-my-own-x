# 响应式数据最简实现

## API

```javascript
const target = { a: {b: {c: 1 } } }

const observable = singleObserver(target)

console.log(isObservable(observable)) // T

observable.subscribe(() => {
  console.log('changed')
})

observable.a.b.c = 1
// print changed

observable.a.b = { d: 'foo' }
// print changed
```