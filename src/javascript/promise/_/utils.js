export const task = id =>
  new Promise(resolve => {
    setTimeout(() => resolve(id), id * 100)
  })

export const errorTask = id =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(id), 100)
  })