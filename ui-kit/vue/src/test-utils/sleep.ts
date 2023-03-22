/* eslint-disable no-promise-executor-return */
const sleep = (time = 0) => new Promise((resolve) => setTimeout(resolve, time))

export default sleep
