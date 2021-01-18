# Proxy

## Features

- 只能代理对象第一层，需手动实现深度代理

- 数组方法会触发内部的多次操作


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

## Array Operation

```javascript
const proxy = new Proxy([1], {
  set(target, key, value) {
    console.log(`Set [${key}]=${value}`)
    return Reflect.set(...arguments)
  },
  get(target, key) {
    console.log(`Get [${key}]`)
    return Reflect.get(...arguments)
  }
})

proxy.push(2)
// Get [push]
// Get [length]
// Set [1]=2
// Set [length]=2

proxy.unshift(1)
// Get [unshift]
// Get [length]
// Get [1]
// Set [2]=2
// Get [0]
// Set [1]=1
// Set [0]=1
// Set [length]=3

proxy.join(',')
// Get [join]
// Get [length]
// Get [0]
// Get [1]
// Get [2]

```