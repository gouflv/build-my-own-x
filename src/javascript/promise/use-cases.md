# Promise 用例

```javascript
new Promise(resolve => {
  console.log('p1 init')
  resolve()
})
.then(() => {
  console.log('p1 thenA')

  return new Promise(resolve => {
    console.log('p2 init')
    resolve()
  })
  .then(() => {
    console.log('p2 thenA')
  })
  .then(() => {
    console.log('p2 thenB')
  })

})
.then(() => {
  console.log('p1 thenB')
})

console.log('end')
```

output:

```
p1 init
end
p1 thenA
p2 init
p2 thenA
p2 thenB
p1 thenB
```