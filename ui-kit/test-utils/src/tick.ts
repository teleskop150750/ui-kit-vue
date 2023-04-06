/* eslint-disable unicorn/no-null */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable promise/param-names */
import { nextTick } from 'vue'

export async function tick(times: number) {
  while (times--) {
    await nextTick()
  }
}

// in order to test transitions, we need to use
// await rAF() after firing transition events.
export async function rAF() {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}
