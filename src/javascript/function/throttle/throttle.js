export const throttle = (
  func,
  wait,
  option = { leading: true, trailing: true }
) => {
  const { leading, trailing } = option

  let waiting = false,
    stashed = null

  function startTimer() {
    waiting = true
    setTimeout(() => {
      waiting = false
      // 时间片结束时
      // 根据 stashed 触发 trailing
      // 否则结束
      if (stashed) {
        func.apply(stashed[0], stashed[1])
        stashed = null
        startTimer()
      }
    }, wait)
  }

  return function (...args) {
    // 时间片运行过程中，再次调用
    // 仅 trailing 时，记录时间片结束时需要的数据
    if (waiting) {
      if (trailing) stashed = [this, args]
      return
    }

    // 首次调用: leading 时，主动触发一次调用，启动计时
    if (leading) {
      func.apply(this, args)
      startTimer()
      return
    }

    // 首次调用: trailing 时，记录时间片结束时需要的数据，启动计时
    if (trailing) {
      stashed = [this, args]
      startTimer()
    }
  }
}
