# 数据类型和检测

## 数据类型

### 原始类型
- Undefined
- Null
- Boolean
- Number
- String
- Symbol
- NaN
- Infinity
  
### 对象引用类型
- Object
- Arguments
- Date
- RegExp
- Error
- 原始包装

- Array
- Map
- Set

- Function
- Promise
- Proxy

### 特殊类型

- 包装类型: 对原始类型的对象包装
- PlainObject: 纯对象，类似于 Java 的 POJO，[[prototype]] 为 `null` 或者 `object`
- ArrayLike: Arguments、NodeList、string


## typeof 检测

`typeof` 用于对简单类型的判断

```javascript
console.log(typeof undefined) // "undefined"
console.log(typeof null)      // "object"
console.log(typeof true)      // "boolean"
console.log(typeof 1)         // "number"
console.log(typeof NaN)       // "number"
console.log(typeof 'foo')     // "string"
console.log(typeof Symbol('bar')) // "symbol"
```

`typeof` 对复杂类型的判断, 只能区分出 `object` 或者 `function`

```javascript
console.log(typeof new Number(1))  // "object"
console.log(typeof {})  // "object"
console.log(typeof [])  // "object"
console.log(typeof (new Date))  // "object"
console.log(typeof (new Proxy({}, () => {})))  // "object"
console.log(typeof (function() {}))  // "function"
```

## toString 检测

`Object.prototype.toString` 可用于对象类型检测

简单类型

```javascript
const toString = Object.prototype.toString
console.log(toString.call(undefined)) // "[object Undefined]"
console.log(toString.call(null)) // "[object Null]"
console.log(toString.call(true)) // "[object Boolean]"
console.log(toString.call(1)) // "[object Number]"
console.log(toString.call('')) // "[object String]"
```

包装类型

```javascript
console.log(toString.call(new Boolean(true))) // "[object Boolean]"
console.log(toString.call(new Number(1))) // "[object Number]"
console.log(toString.call(new String(''))) // "[object String]"
```

复杂类型

```javascript
console.log(toString.call({})) // "[object Object]"
console.log(toString.call(new Date)) // "[object Date]"
console.log(toString.call(new Array)) // "[object Array]"
console.log(toString.call(new Error(''))) // "[object Error]"
```

## 其他检测

isNaN

```javascript
console.log(isNaN(undefined)) //T
console.log(isNaN(null))
console.log(isNaN(1))
console.log(isNaN(true))
console.log(isNaN('1'))
console.log(isNaN('foo'))  //T
console.log(isNaN({}))  //T
```


## 类型转化

通过调用 Number()、String()、Boolean() 方法，或者使用运算符操作，都会执行隐式转化

> 详细逻辑参考 ecma-262 定义

### [ToBoolean](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-toboolean)

```javascript
console.log(Boolean(undefined))
console.log(Boolean(null))
console.log(Boolean(true)) //T
console.log(Boolean(0))
console.log(Boolean(1))  //T
console.log(Boolean(NaN))
console.log(Boolean(''))
console.log(Boolean('1')) //T
console.log(Boolean({})) //T
console.log(Boolean([])) //T
```

### [ToNumber](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-tonumber)

```javascript
console.log(Number(undefined)) // NaN
console.log(Number(null))  // 0
console.log(Number(true))  // 1
console.log(Number(false)) // 0
console.log(Number(1))     // 1
console.log(Number('1'))   // 1
console.log(Number(''))   // 0
console.log(Number('foo'))   // NaN
console.log(Number({}))    // NaN
console.log(Number([]))    // 0
console.log(Number([1]))    // 1
console.log(Number([1, 2]))    // NaN ?
```

### [ToString](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-tostring)

```javascript
console.log(String(undefined))
console.log(String(null))
console.log(String(1))
console.log(String(true))
console.log(String({})) // [object Object]
console.log(String([])) // ""
console.log(String([1])) // "1"
console.log(String([1, 2])) // "1,2"
```

### [ToPrimitive](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-toprimitive)

上面几个将引用类型转基础类型的方法，内部都依赖了 ToPrimitive 操作，对引用做求值

> ToPrimitive(A)通过尝试调用 A 的A.toString() 和 A.valueOf() 方法，将参数 A 转换为原始值（Primitive）

因此，上面三个隐式转化规则中，参数为对象的情况，可以解释为：

1. ToBoolean, 遇到引用类型都返回 `true`

```javascript
console.log(Boolean({})) //T
console.log(Boolean([])) //T
```

2. ToNumber, 使用 ToPrimitive(input,'number') 模式，简单理解就是先后调用 `valueOf` 和 `toString`, 直到返回值为非对象

```javascript
console.log(Number({}))  // NaN
// 1. ({}).valueOf() 返回 {}，所以继续尝试 toString
// 2. ({}).toString() 返回 ‘[object Object]’
// 3. 将 ‘[object Object]’ 作为参数，执行 ToNumber() 转换，所以最终结果为 NaN

console.log(Number([]))    // 0
// 1. 调用 valueOf 返回 []，所以尝试 toString
// 2. ([]).toString() 返回 ‘’
// 3. ToNumber('')，结果 0

console.log(Number([1]))    // 1
// ([1]).toString() 返回 '1'


console.log(Number([1, 2]))    // NaN
// ([1,2]).toString() 返回 '1,2', Number('1,2') 返回 NaN
```

3. ToString, 使用 ToPrimitive(input,'string') 模式，先后调用 `toString` 和 `valueOf`，直到返回值为非对象

```javascript
console.log(String({})) // [object Object]
console.log(String([])) // ""
console.log(String([1, 2])) // "1,2"
```

## 思考

```javascript
console.log([] == "")
console.log({} == "[object Object]")
console.log([]+[])
console.log({}+[])
console.log([]+{})
console.log({}+{})
console.log(+undefined)
console.log(undefined+undefined)
```

## 参考

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
