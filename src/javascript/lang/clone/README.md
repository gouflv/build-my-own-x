# 对象拷贝

lodash 对 `clone` 的定义

> 这个方法参考自structured clone algorithm 以及支持 arrays、array buffers、 booleans、 date objects、maps、 numbers， Object 对象, regexes, sets, strings, symbols, 以及 typed arrays。 arguments对象的可枚举属性会拷贝为普通对象。 一些不可拷贝的对象，例如error objects、functions, DOM nodes, 以及 WeakMaps 会返回空对象。

## 具体实现

浅拷贝 `clone`

1. 对非 `object` 类型
   
   直接返回原始值，如 `undefined, null, number, boolean, string, `

2. 对包装类型和预设的对象
   
    1. 先判断对象具体类型 `T`
    2. 然后 `new` 出匹配的空对象 `O`
    3. 用原始对象的值 `TVal` 来赋值 `O` 
       
   目前支持的类型: 
   `Number, Boolean, String, NaN, Infinity, Array, Arguments, Date, Set, Map`
    
3. 自定义对象
   
    1. 根据对象 `O` 的 `[[prototype]]` 构造出对象 `V`
       
         `V = Object.create(prototypeOf(O))`       

    2. 将原始对象的成员变量逐个赋值到新的对象
   
         `for(ownProp in V)  V[ownProp] = O[ownProp]`
   
深拷贝 `cloneDeep`

1. 在浅拷贝的基础上，在每次赋值前，对值本身做一次拷贝，也就是递归拷贝
   
   `V[ownProp] = clone( O[ownProp] )`
   
2. 解决循环引用
   
    一些复杂的对象，在内部会有相互引用的关系，为了能在拷贝的对象中保持应用关系，我们需要:
      
   1. 缓存拷贝前后的对象 `OC = Map{O -> V}`
   2. 在递归拷贝每个对象之前，判断原始对象是否存在于缓存中 `OC.has(O)`
      1. 如果存在，择使用 `V` 赋值给新对象

         `V[ownProp] = oc.get(O)`         

      2. 如果不存在
         ```
         N = clone( O[ownProp] )
         OC.add(N)
         V[ownProp] = N 
         ```

3. 关于缓存对象 `OC`
   
   `lodash` 的缓存实现是 `Map`, 这里替换成了性能更好的 `WeakMap`

EOF