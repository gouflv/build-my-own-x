# Build my own X

![Test](https://github.com/gouflv/build-my-own-x/workflows/Test/badge.svg)
![Coverage](https://img.shields.io/codecov/c/github/gouflv/build-my-own-x)

> 再次发明轮子

## Javascript

### Lang

- [is](src/javascript/lang/is)
    
    > _[JavaScript 基础之数据类型和检测](src/javascript/lang/is/types.md)_
    
    > _[JavaScript 基础之类型转化](src/javascript/lang/is/type-conversion.md)_

- [clone](src/javascript/lang/clone) / [cloneDeep](src/javascript/lang/clone)
  
    > _[JavaScript 基础之拷贝/深拷贝, 解决循环引用](src/javascript/lang/clone/README.md)_
  
- [isEqual](src/javascript/lang/isEqual)

    > _[JavaScript 基础之数据相等性判断](src/javascript/lang/isEqual/README.md)_

- [isEqualDeep](src/javascript/lang/isEqualDeep)

- [typeOf](src/javascript/lang/typeof)

### Object

- [assign](src/javascript/object/assign)
- [defaults](src/javascript/object/defaults)
- [keys](src/javascript/object/keys)
- [keysIn](src/javascript/object/keysIn)
- [values](src/javascript/object/values)
- [get](src/javascript/object/get)
  
  > _[pathParser](src/javascript/_/pathParser)_ 词法解析 accessor-style 字符串

- [pick](src/javascript/object/pick)

### Function

- [partial](src/javascript/function/partial)
- [curry (with placeholder)](src/javascript/function/curry)
- [compose](src/javascript/function/compose)
- [memo](src/javascript/function/memo)
- [flow](src/javascript/function/flow)
- [bind](src/javascript/function/bind)
  
  > [JavaScript 基础之 bind 方法模拟](src/javascript/function/bind/README.md)  

- [apply / call](src/javascript/function/apply)
- [debounce](src/javascript/function/debounce)
- [throttle](src/javascript/function/throttle)

### Array

- [flatten](src/javascript/array/flatten)
- [reduce](src/javascript/array/reduce)
- [reduceRight](src/javascript/array/reduceRight)
- [shuffle](src/javascript/array/shuffle)

### Promise

- [promise](src/javascript/promise/promise)
- [sequence](src/javascript/promise/sequence)
- [parallel](src/javascript/promise/parallel)
- [all](src/javascript/promise/all)
- [any](src/javascript/promise/any)
- [race](src/javascript/promise/race)

### Reactive

- [single-object-observer](src/javascript/proxy/single-observer)

  > _[响应式数据最简实现](src/javascript/proxy/single-observer/README.md)_

- [reactive](src/javascript/proxy/reactive)
  / [effect](src/javascript/proxy/effect)

  > _参考 [@vue/reactivity]() 和 [observer-util](https://github.com/nx-js/observer-util) 的实现_


## Data Structures and Algorithms

### Data Structures

- [stack](src/data-structure/stack)
- [queue](src/data-structure/queue)
- [priority-queue](src/data-structure/priority-queue)
- [linked-list](src/data-structure/linked-list)
- [hash-table](src/data-structure/hash-table)
- [binary-search-tree](src/data-structure/tree/binary-search-tree)
- [heap](src/data-structure/tree/heap)
- [trie](src/data-structure/tree/trie)
- [graph](src/data-structure/graph)

### Sorting

- [bubble](src/algorithms/sort/bubble.ts)
- [select](src/algorithms/sort/select.ts)
- [insertion](src/algorithms/sort/insertion.ts)
- [merge](src/algorithms/sort/merge.ts)
- [quick](src/algorithms/sort/quick.ts)
- [heap](src/algorithms/sort/heap.ts)

### Search

- [binary-search](src/algorithms/binary-search)


## Web

### Framework

- [axios-ts](src/framework/axios-ts)


### MVVM

- [virtual-dom](src/web/virtual-dom)

