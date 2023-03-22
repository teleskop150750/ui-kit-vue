/* eslint-disable unicorn/no-null */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable promise/param-names */
import { nextTick } from 'vue'

const tick = async (times: number) => {
  while (times--) {
    await nextTick()
  }
}

export default tick

// in order to test transitions, we need to use
// await rAF() after firing transition events.
export const rAF = async () =>
  new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
