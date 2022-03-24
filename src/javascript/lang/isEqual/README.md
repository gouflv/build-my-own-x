# 数据相等性判断

## 抽象比较 `==`

执行类型转换之后进行比较，参照算法 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using_)

执行顺序
1. 等式的左右值进行类型转换，获得相同类型
2. 值比较

以下等式均成立

```javascript
console.log(undefined == null)
console.log(1 == '1')
console.log(1 == true)
console.log('1' == 1)
console.log('1' == true)
console.log([] == 0)
console.log([] == '')
console.log([1] == 1)
console.log([1] == '1')
console.log({} == '[object Object]')
```

## 严格比较 `===`

不进行隐式转换的比较，参照算法 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Strict_equality_using_)

执行顺序
1. 值的类型比较
2. 值比较
3. 例外：针对 number 类型的值比较，都是 NaN 时不相等，不区分 +0 和 -0

以下等式均成立

```javascript
console.log(undefined !== null)
console.log(true !== 1)
console.log('1' !== 1)
console.log([] !== '')
console.log([1] !== 1)
console.log(NaN !== NaN)
console.log(+0 === -0)
```

## 同值相等 SameValue

> Object.is

与严格比较的差异：
1. 区分 +0 和 -0
2. NaN 与 NaN 视为相等

## 零值相等 SameValueZero

同值相等的差异
1. 不区分 +0 和 -0

## 小结

`===`、`SameValueZero`、`SameValue` 的差异其实比较小，这里 `isEqual` 使用 `SameValueZero` 作为默认比较算法

## 参考

[Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
