# 类型转化

## 几种转化算法

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

## 运算符

```javascript
console.log([] == "")
console.log({} == "[object Object]")
console.log(+undefined)
console.log(+null)
console.log(+{})
console.log(+'')
console.log(undefined + '')
console.log('' + undefined)
console.log([]+[])
console.log({}+[])
console.log([]+{})
console.log({}+{})
console.log(undefined+undefined)
```

## 参考

[ECMA](https://www.ecma-international.org/ecma-262/11.0/index.html)

JavaScript深入之头疼的类型转换 [link](https://github.com/mqyqingfeng/Blog/issues/164)
