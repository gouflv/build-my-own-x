# Build my own X

![Test](https://github.com/gouflv/build-my-own-x/workflows/Test/badge.svg)
![Coverage](https://img.shields.io/codecov/c/github/gouflv/build-my-own-x)

> 再次发明轮子

## Javascript

### Lang

<details>

<summary>实现语言特性和基础工具</summary>

<p>

- [is](src/javascript/lang/is)
    
    > _[数据类型和检测](src/javascript/lang/is/types.md)_
    
    > _[类型转化](src/javascript/lang/is/type-conversion.md)_

- [clone](src/javascript/lang/clone) / [cloneDeep](src/javascript/lang/clone)
  
    > _[拷贝/深拷贝, 解决循环引用](src/javascript/lang/clone/README.md)_
  
- [isEqual](src/javascript/lang/isEqual)

    > _[数据相等性判断](src/javascript/lang/isEqual/README.md)_

- [isEqualDeep](src/javascript/lang/isEqualDeep)

     > _[深度相等检测](src/javascript/lang/isEqualDeep/README.md)_

- [typeOf](src/javascript/lang/typeof)

</p>

</details>

### Object

<details>

<summary>对象相关</summary>

<p>

- [assign](src/javascript/object/assign)
- [defaults](src/javascript/object/defaults)
- [keys](src/javascript/object/keys)
- [keysIn](src/javascript/object/keysIn)
- [values](src/javascript/object/values)
- [get](src/javascript/object/get)
- [pick](src/javascript/object/pick)

</p>

</details>

### Function

<details>

<summary>函数相关</summary>

<p>

- [partial](src/javascript/function/partial)
- [curry](src/javascript/function/curry)
- [compose](src/javascript/function/compose)
- [flow](src/javascript/function/flow)

</p>

</details>

### Reactive

基于 Proxy 的响应式

- [reactive](src/javascript/proxy/reactive)


### Array

数组集合相关

- [flatten](src/javascript/array/flatten)

### Util

- [pathParser](src/javascript/_/pathParser)  
    > _词法解析 accessor-style 字符串_
