# 输出类型名称

## 原始类型的名称

基于 `typeof`

```javascript
console.log(typeof 1) // number
console.log(typeof '1') // string
```

## 内置对象

基于 `Object.prototype.toString`

```javascript
const toString = Object.prototype.toString
console.log(toString.call([])) // [object Array]
console.log(toString.call({})) // [object Object]
```

## 自定义对象

基于 `constructor.name`

```javascript
function Foo() {}
console.log((new Foo).constructor.name) // "Foo"
```