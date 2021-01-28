// https://bigfrontend.dev/zh/problem/implement-debounce-with-leading-and-trailing-option/discuss/1788

const debounce = (func, wait, option = { leading: false, trailing: true }) => {
  const { leading, trailing } = option

  let timer, stashed

  const runTimer = () => {
    timer = setTimeout(() => {
      if (stashed) {
        func.apply(stashed[0], stashed[1])
        stashed = null
      }
      timer = null
    }, wait)
  }

  return function (...args) {
    // 时间片运行中调用
    // 仅 trailing 时，记录时间片结束数据
    // 每次重新开始计时
    if (timer) {
      if (trailing) {
        stashed = [this, args]
      }
      clearTimeout(timer)
      runTimer()
      return
    }

    // 首次调用，leading 时，主动触发一次调用，启动计时
    if (leading) {
      func.apply(this, args)
      runTimer()
      return
    }

    // 首次调用，tailing 时，记录时间片结束所需数据，启动计时
    if (trailing) {
      stashed = [this, args]
      runTimer()
    }
  }
}
