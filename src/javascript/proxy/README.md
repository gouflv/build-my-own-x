# Proxy

## Proxy type

```javascript
const target = {
  a: 1
}
const handler = {}

const proxy = new Proxy(target, handler)

console.log(target === proxy) //F
console.log(proxy.a) // 1
proxy.a = 2
console.log(proxy.a) // 2

console.log(typeof target.__proto__ === 'object') // T
console.log(proxy.__proto__ === target.__proto__) // T
```

## Handler

```javascript
const target = {
  a: 1
}
const handler = {
  get(target, key) {
    console.debug(`get key ${key}`)
    return Reflect.get(...arguments)
  },
  set(target, key, value) {
    console.debug(`set ${key}=${value}`)
    return Reflect.set(...arguments)
  },
  has(target, key) {
    console.debug(`check has ${key}`)
    return Reflect.has(...arguments)
  },
  deleteProperty(target, key) {
    console.debug(`delete ${key}`)
    return Reflect.deleteProperty(...arguments)
  },
  ownKeys() {
    console.debug('ownKeys')
    return Reflect.ownKeys(...arguments)
  }
}

const proxy = new Proxy(target, handler)

console.log(proxy.a)      //1
console.log(proxy.a = 2)  //2
console.log('a' in proxy) //true
console.log(Object.keys(proxy)) // ['a']
delete proxy.a
console.log(proxy, target) //{}
```