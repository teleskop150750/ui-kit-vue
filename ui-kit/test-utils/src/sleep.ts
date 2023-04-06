/* eslint-disable no-promise-executor-return */
export function sleep(time = 0) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
