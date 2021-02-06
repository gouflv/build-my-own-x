export const expectFnCalledWith = (fn, params) => {
  expect(fn).toBeCalledTimes(params.length)
  params.forEach((param, i) => expect(fn).nthCalledWith(i + 1, param))
}
